/**
 * WirePlacementTool.js
 *
 * Browser interaction for placing jumper wires:
 *   1. activate() opens the color toolbar
 *   2. hovering a hole highlights it
 *   3. first click stores the start hole (highlighted yellow) and an
 *      "imaginary" ghost wire follows the cursor from that hole
 *   4. second click turns the ghost into a real wire and stays in placement
 *      mode so multiple wires can be laid back to back
 *   5. ESC clears the current start selection, or exits if none is pending
 *   6. Backspace / Delete undoes the last placed wire
 *
 * Hole picking uses a hidden pick-plane (one raycast, fast) plus a nearest-
 * hole lookup, so it stays cheap with 200+ wires on screen.
 */
import * as THREE from 'three';

import { WireRenderer } from './WireRenderer.js';

const SNAP_RADIUS = 1.5;   // mm - half pitch + a little slack
const HOVER_COLOR = 0xffffff;
const START_COLOR = 0xffd700;

export class WirePlacementTool {
  constructor({ domElement, camera, scene, field, manager, colorToolbar, onStatus, onModeChange }) {
    this.domElement = domElement;
    this.camera = camera;
    this.scene = scene;
    this.manager = manager;
    this.colorToolbar = colorToolbar;
    this.onStatus = onStatus || (() => {});
    this.onModeChange = onModeChange || (() => {});

    this._active = false;
    this.color = 'red';
    this.startId = null;
    this.startMesh = null;
    this.startColor = null;
    this.hoverId = null;
    this.hoverMesh = null;
    this.hoverColor = null;
    this.ghostMesh = null;
    this.ghostTarget = null;

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

  setColor(color) {
    this.color = color;
    this.onStatus(`Color: ${color} - click the start hole`, 'info');
  }

  activate() {
    if (this._active) return;
    this._active = true;
    this.domElement.addEventListener('pointermove', this.onPointerMove);
    this.domElement.addEventListener('click', this.onClick);
    document.addEventListener('keydown', this.onKeyDown);
    if (this.colorToolbar) this.colorToolbar.style.display = 'flex';
    this.onModeChange(true);
    this.onStatus(`Color: ${this.color} - click the start hole`, 'info');
  }

  deactivate() {
    if (!this._active) return;
    this._active = false;
    this.domElement.removeEventListener('pointermove', this.onPointerMove);
    this.domElement.removeEventListener('click', this.onClick);
    document.removeEventListener('keydown', this.onKeyDown);
    this.clearStart();
    this.clearHover();
    this.removeGhost();
    if (this.colorToolbar) this.colorToolbar.style.display = 'none';
    this.onModeChange(false);
  }

  toggle() {
    if (this._active) this.deactivate();
    else this.activate();
  }

  /** ESC: clear the pending start hole, otherwise exit placement mode. */
  cancel() {
    if (this.startId) this.clearStart();
    else this.deactivate();
  }

  /** Undo the most recently placed wire. Returns true if one was removed. */
  undoLast() {
    const wire = this.manager.last();
    if (!wire) {
      this.onStatus('No wire to undo', 'info');
      return false;
    }
    this.manager.remove(wire.id);
    this.onStatus(`Undid ${wire.id} (${wire.start} -> ${wire.end})`, 'info');
    return true;
  }

  /** Remove every placed wire. Returns how many were removed. */
  resetAll() {
    const total = this.manager.count();
    this.manager.clear();
    this.onStatus(total > 0 ? `Cleared all ${total} wire(s)` : 'No wires to clear', 'info');
    return total;
  }

  onKeyDown(event) {
    if (!this._active) return;
    if (event.key === 'Escape') {
      this.cancel();
      return;
    }
    // Backspace / Delete = undo the last placed wire.
    if (event.key === 'Backspace' || event.key === 'Delete') {
      if (this.startId) this.clearStart();
      else this.undoLast();
    }
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
    if (this.startId) {
      const target = hole
        ? new THREE.Vector3(hole.x, 0, hole.z)
        : point
          ? new THREE.Vector3(point.x, 0, point.z)
          : null;
      this.updateGhost(target);
    }
  }

  /**
   * "Imaginary" preview wire: follows the cursor from the start hole. It is
   * translucent (ghost material) and becomes a real opaque wire on placement.
   */
  updateGhost(target) {
    if (!target) {
      this.removeGhost();
      return;
    }
    // Snap previews onto the hovered hole so the ghost matches the click.
    const key = `${target.x.toFixed(2)},${target.z.toFixed(2)}`;
    if (key === this.ghostTarget) return;
    this.ghostTarget = key;

    if (!this.startMesh) return;
    const startPos = new THREE.Vector3(this.startMesh.position.x, 0, this.startMesh.position.z);
    if (startPos.distanceTo(target) < 0.2) {
      // Degenerate (e.g. hovering the start hole itself) - no ghost.
      this.removeGhost();
      return;
    }

    this.removeGhost();
    const { mesh } = WireRenderer.build(startPos, target, this.color, { ghost: true });
    mesh.name = 'wire_ghost';
    this.scene.add(mesh);
    this.ghostMesh = mesh;
  }

  removeGhost() {
    if (this.ghostMesh) {
      this.scene.remove(this.ghostMesh);
      this.ghostMesh.geometry.dispose();
      this.ghostMesh = null;
    }
    this.ghostTarget = null;
  }

  setHover(hole) {
    const id = hole ? hole.id : null;
    if (id === this.hoverId) return;
    this.clearHover();
    if (hole && hole.id !== this.startId) {
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

  clearStart() {
    if (this.startMesh) {
      this.startMesh.material.color.set(this.startColor != null ? this.startColor : 0x808080);
    }
    this.startMesh = null;
    this.startColor = null;
    this.startId = null;
  }

  onClick(event) {
    if (!this._active) return;
    const hole = this.holeAt(this.raycast(event));
    if (!hole) {
      if (this.startId) this.onStatus('Invalid hole - try again', 'error');
      return;
    }

    if (!this.startId) {
      // First click: store the start hole and highlight it yellow.
      this.startMesh = hole.mesh;
      this.startColor = hole.mesh.material.color.getHex();
      this.startMesh.material.color.set(START_COLOR);
      this.startId = hole.id;
      this.onStatus(`Start hole ${hole.id} - click the end hole`, 'info');
      return;
    }

    if (hole.id === this.startId) {
      this.onStatus('Cannot connect a hole to itself.', 'error');
      return;
    }

    const startId = this.startId;
    const startPos = new THREE.Vector3(this.startMesh.position.x, 0, this.startMesh.position.z);
    const endPos = new THREE.Vector3(hole.mesh.position.x, 0, hole.mesh.position.z);

    let wire;
    try {
      wire = this.manager.add({ start: startId, end: hole.id, color: this.color });
    } catch (error) {
      this.onStatus(error.message, 'error');
      this.removeGhost();
      this.clearStart();
      this.clearHover();
      return;
    }

    const { mesh } = WireRenderer.build(startPos, endPos, this.color);
    mesh.name = wire.id;
    mesh.userData.wireId = wire.id;
    this.scene.add(mesh);
    this.manager.attachMesh(wire.id, mesh);

    this.removeGhost();
    this.clearStart();
    this.clearHover();
    this.onStatus(`Wire placed: ${wire.start} -> ${wire.end} (${wire.color}) - click another start hole`, 'success');
  }
}
