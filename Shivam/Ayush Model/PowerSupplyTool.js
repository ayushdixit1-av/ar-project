/**
 * PowerSupplyTool.js
 *
 * Browser interaction for connecting a bench power supply to the breadboard:
 *   1. activate() places the supply (once) and opens connection mode
 *   2. hover a hole -> highlight + translucent ghost wire from the pending
 *      terminal (+ red first, then - black)
 *   3. click a free hole -> connect the pending wire there
 *   4. click a hole that already holds a wire -> disconnect that wire
 *   5. ESC exits; Backspace / Delete undo the last connection
 *
 * Hole picking uses a hidden pick-plane (one raycast, fast) plus a nearest-
 * hole lookup, so it stays cheap with other components on screen.
 */
import * as THREE from 'three';

import { PowerSupplyRenderer } from './PowerSupplyRenderer.js';

const SNAP_RADIUS = 1.5;   // mm - half pitch + a little slack
const HOVER_COLOR = 0xffffff;

export class PowerSupplyTool {
  constructor({ domElement, camera, scene, field, manager, terminals, onStatus, onModeChange }) {
    this.domElement = domElement;
    this.camera = camera;
    this.scene = scene;
    this.manager = manager;
    this.onStatus = onStatus || (() => {});
    this.onModeChange = onModeChange || (() => {});

    this._active = false;
    this._supplyGroup = null;
    this._terminals = terminals || null;
    this._positiveMesh = null;
    this._negativeMesh = null;
    this._ghostMesh = null;
    this._ghostKey = null;

    this.hoverId = null;
    this.hoverMesh = null;
    this.hoverColor = null;

    this.raycaster = new THREE.Raycaster();
    this.pickPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(220, 130),
      new THREE.MeshBasicMaterial()
    );
    this.pickPlane.rotation.x = -Math.PI / 2;
    this.pickPlane.visible = false;
    this.scene.add(this.pickPlane);

    this.holes = [];
    for (const child of field.children) {
      if (!child.name) continue;
      this.holes.push({
        id: child.name,
        x: child.position.x,
        z: child.position.z,
        mesh: child,
      });
    }

    this.onPointerMove = this.onPointerMove.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  isActive() {
    return this._active;
  }

  activate() {
    if (this._active) return;
    this._active = true;
    if (!this._terminals) {
      const built = PowerSupplyRenderer.buildSupply(this.scene);
      this._supplyGroup = built.group;
      this._terminals = built.terminals;
    }
    this.domElement.addEventListener('pointermove', this.onPointerMove);
    this.domElement.addEventListener('click', this.onClick);
    document.addEventListener('keydown', this.onKeyDown);
    this.onModeChange(true);
    this._statusHint();
  }

  deactivate() {
    if (!this._active) return;
    this._active = false;
    this.domElement.removeEventListener('pointermove', this.onPointerMove);
    this.domElement.removeEventListener('click', this.onClick);
    document.removeEventListener('keydown', this.onKeyDown);
    this.removeGhost();
    this.clearHover();
    this.onModeChange(false);
  }

  toggle() {
    if (this._active) this.deactivate();
    else this.activate();
  }

  cancel() {
    if (this._active) this.deactivate();
  }

  /** Backspace / Delete undo the most recent connection. */
  onKeyDown(event) {
    if (!this._active) return;
    if (event.key === 'Backspace' || event.key === 'Delete') this.undoLast();
  }

  _statusHint() {
    if (this.manager.positive.connected && this.manager.negative.connected) {
      this.onStatus(
        `Power: + ${this.manager.positive.holeId} | - ${this.manager.negative.holeId} - click a wire hole to disconnect`,
        'success'
      );
    } else if (this.manager.positive.connected) {
      this.onStatus('Power: click a hole to connect the - (black) wire', 'info');
    } else {
      this.onStatus('Power: click a hole to connect the + (red) wire', 'info');
    }
  }

  /** Undo the most recent connection. Returns true if one was removed. */
  undoLast() {
    const last = this.manager.last();
    if (!last) {
      this.onStatus('No power connection to undo', 'info');
      return false;
    }
    const prev = this._removeWire(last.terminal);
    this.onStatus(`Undid the ${last.terminal === 'positive' ? '+' : '-'} wire from ${prev}`, 'info');
    return true;
  }

  /** Disconnect both wires. Returns how many were disconnected. */
  resetAll() {
    const total = (this.manager.positive.connected ? 1 : 0) + (this.manager.negative.connected ? 1 : 0);
    this._removeWire('positive');
    this._removeWire('negative');
    this.onStatus(total > 0 ? 'Disconnected the power supply' : 'Power supply is not connected', 'info');
    return total;
  }

  /** Disconnect a terminal's wire (manager + scene mesh). */
  _removeWire(terminal) {
    const prev = this.manager[terminal].holeId;
    this.manager.disconnect(terminal);
    const key = terminal === 'positive' ? '_positiveMesh' : '_negativeMesh';
    if (this[key]) {
      this.scene.remove(this[key]);
      PowerSupplyRenderer.disposeWire(this[key]);
      this[key] = null;
    }
    return prev;
  }

  raycast(event) {
    const rect = this.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    const hits = this.raycaster.intersectObject(this.pickPlane);
    return hits.length ? hits[0].point : null;
  }

  /** Nearest hole within SNAP_RADIUS of a board-plane point. */
  holeAt(point) {
    if (!point) return null;
    let best = null;
    let bestDist = SNAP_RADIUS;
    for (const hole of this.holes) {
      const d = Math.hypot(hole.x - point.x, hole.z - point.z);
      if (d < bestDist) {
        bestDist = d;
        best = hole;
      }
    }
    return best;
  }

  onPointerMove(event) {
    if (!this._active) return;
    const point = this.raycast(event);
    const hole = this.holeAt(point);
    this.setHover(hole);
    this.updateGhost(hole);
  }

  /** Translucent ghost wire from the pending terminal to the hovered hole. */
  updateGhost(hole) {
    if (!hole || !this._terminals) {
      this.removeGhost();
      return;
    }
    // No ghost when the click would disconnect an existing wire instead.
    if (
      (this.manager.positive.connected && this.manager.positive.holeId === hole.id) ||
      (this.manager.negative.connected && this.manager.negative.holeId === hole.id)
    ) {
      this.removeGhost();
      return;
    }
    const target = !this.manager.positive.connected ? 'positive' : !this.manager.negative.connected ? 'negative' : null;
    if (!target) {
      this.removeGhost();
      return;
    }

    const key = `${target}:${hole.id}`;
    if (key === this._ghostKey) return;
    this._ghostKey = key;

    this.removeGhost();
    const from = this._terminals[target];
    const to = new THREE.Vector3(hole.x, 0.45, hole.z);
    const { mesh } = PowerSupplyRenderer.buildWire(
      from,
      to,
      target === 'positive' ? 'red' : 'black',
      { ghost: true }
    );
    this.scene.add(mesh);
    this._ghostMesh = mesh;
  }

  removeGhost() {
    if (this._ghostMesh) {
      this.scene.remove(this._ghostMesh);
      PowerSupplyRenderer.disposeWire(this._ghostMesh);
      this._ghostMesh = null;
    }
    this._ghostKey = null;
  }

  setHover(hole) {
    const id = hole ? hole.id : null;
    if (id === this.hoverId) return;
    this.clearHover();
    if (hole) {
      this.hoverMesh = hole.mesh;
      this.hoverColor = hole.mesh.material.color.getHex();
      this.hoverMesh.material.color.set(HOVER_COLOR);
      this.hoverId = hole.id;
    }
  }

  clearHover() {
    if (this.hoverMesh) {
      this.hoverMesh.material.color.set(this.hoverColor != null ? this.hoverColor : 0x808080);
    }
    this.hoverMesh = null;
    this.hoverColor = null;
    this.hoverId = null;
  }

  onClick(event) {
    if (!this._active) return;
    const hole = this.holeAt(this.raycast(event));
    if (!hole) {
      if (this.manager.positive.connected || this.manager.negative.connected) {
        this.onStatus('Invalid hole - try again', 'error');
      }
      return;
    }

    this.removeGhost();
    this.clearHover();

    // Clicking a hole that already holds a wire disconnects it.
    if (this.manager.positive.connected && this.manager.positive.holeId === hole.id) {
      const prev = this._removeWire('positive');
      this.onStatus(`Disconnected the + wire from ${prev}`, 'info');
      return;
    }
    if (this.manager.negative.connected && this.manager.negative.holeId === hole.id) {
      const prev = this._removeWire('negative');
      this.onStatus(`Disconnected the - wire from ${prev}`, 'info');
      return;
    }

    const target = !this.manager.positive.connected ? 'positive' : !this.manager.negative.connected ? 'negative' : null;
    if (!target) {
      this._statusHint();
      return;
    }

    let result;
    try {
      result = this.manager.connect(target, hole.id);
    } catch (error) {
      this.onStatus(error.message, 'error');
      return;
    }

    if (result.action === 'connect') {
      const from = this._terminals[target];
      const to = new THREE.Vector3(hole.x, 0.45, hole.z);
      const { mesh } = PowerSupplyRenderer.buildWire(from, to, target === 'positive' ? 'red' : 'black');
      mesh.name = `ps_wire_${target}`;
      this.scene.add(mesh);
      if (target === 'positive') this._positiveMesh = mesh;
      else this._negativeMesh = mesh;
      this.onStatus(
        `Power ${target === 'positive' ? '+' : '-'} wire connected to ${hole.id}`,
        'success'
      );
      this._statusHint();
    }
  }
}
