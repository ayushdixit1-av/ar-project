/**
 * LEDPlacementTool.js
 *
 * Browser interaction for placing 5mm LEDs on the breadboard:
 *   1. activate() opens the LED color toolbar
 *   2. hovering a hole highlights it
 *   3. first click stores the anode hole (highlighted yellow) and an
 *      "imaginary" ghost LED follows the cursor from that hole
 *   4. second click (1-2 hole pitches away) turns the ghost into a real LED
 *      and stays in placement mode so more LEDs can be placed back to back
 *   5. ESC clears the current anode selection, or exits if none is pending
 *   6. Backspace / Delete undoes the last placed LED
 *
 * Hole picking uses a hidden pick-plane (one raycast, fast) plus a nearest-
 * hole lookup, so it stays cheap with many LEDs on screen.
 */
import * as THREE from 'three';

import { LEDRenderer } from './LEDRenderer.js';

const SNAP_RADIUS = 1.5;    // mm - half pitch + a little slack
const HOLE_PITCH = 2.54;    // mm
const MIN_SPAN = HOLE_PITCH * 0.5;   // reject accidental self-touch
const MAX_SPAN = HOLE_PITCH * 2.2;   // 5mm LED leads span 1-2 holes
const HOVER_COLOR = 0xffffff;
const START_COLOR = 0xffd700;

export class LEDPlacementTool {
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
    this.anodeId = null;
    this.anodeMesh = null;
    this.anodeColor = null;
    this.hoverId = null;
    this.hoverMesh = null;
    this.hoverColor = null;
    this.ghostGroup = null;

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
    this.onStatus(`Color: ${color} - click the anode (start) hole`, 'info');
  }

  activate() {
    if (this._active) return;
    this._active = true;
    this.domElement.addEventListener('pointermove', this.onPointerMove);
    this.domElement.addEventListener('click', this.onClick);
    document.addEventListener('keydown', this.onKeyDown);
    if (this.colorToolbar) this.colorToolbar.style.display = 'flex';
    this.onModeChange(true);
    this.onStatus(`Color: ${this.color} - click the anode (start) hole`, 'info');
  }

  deactivate() {
    if (!this._active) return;
    this._active = false;
    this.domElement.removeEventListener('pointermove', this.onPointerMove);
    this.domElement.removeEventListener('click', this.onClick);
    document.removeEventListener('keydown', this.onKeyDown);
    this.clearAnode();
    this.clearHover();
    this.removeGhost();
    if (this.colorToolbar) this.colorToolbar.style.display = 'none';
    this.onModeChange(false);
  }

  toggle() {
    if (this._active) this.deactivate();
    else this.activate();
  }

  /** ESC: clear the pending anode hole, otherwise exit placement mode. */
  cancel() {
    if (this.anodeId) this.clearAnode();
    else this.deactivate();
  }

  /** Undo the most recently placed LED. Returns true if one was removed. */
  undoLast() {
    const led = this.manager.last();
    if (!led) {
      this.onStatus('No LED to undo', 'info');
      return false;
    }
    this.manager.remove(led.id);
    this.onStatus(`Undid ${led.id} (${led.anode} -> ${led.cathode})`, 'info');
    return true;
  }

  /** Remove every placed LED. Returns how many were removed. */
  resetAll() {
    const total = this.manager.count();
    this.manager.clear();
    this.onStatus(total > 0 ? `Cleared all ${total} LED(s)` : 'No LEDs to clear', 'info');
    return total;
  }

  onKeyDown(event) {
    if (!this._active) return;
    if (event.key === 'Escape') {
      this.cancel();
      return;
    }
    if (event.key === 'Backspace' || event.key === 'Delete') {
      if (this.anodeId) this.clearAnode();
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

  /** Distance (mm) between two board-plane holes. */
  _span(a, b) {
    return Math.hypot(a.x - b.x, a.z - b.z);
  }

  onPointerMove(event) {
    if (!this._active) return;
    const point = this.raycast(event);
    const hole = this.holeAt(point);
    this.setHover(hole);
    if (this.anodeId) this.updateGhost(hole);
  }

  /**
   * "Imaginary" preview LED: hovers a translucent LED between the anode and
   * the candidate cathode hole. Only shown when the hole is a valid span so
   * the preview always matches the click.
   */
  updateGhost(hole) {
    if (!hole || hole.id === this.anodeId) {
      this.removeGhost();
      return;
    }
    const anodePos = new THREE.Vector3(this.anodeMesh.position.x, 0, this.anodeMesh.position.z);
    const span = this._span(hole, anodePos);
    if (span <= MIN_SPAN || span > MAX_SPAN) {
      this.removeGhost();
      return;
    }
    const cathodePos = new THREE.Vector3(hole.x, 0, hole.z);
    const key = hole.id;
    if (key === this.ghostTarget) return;
    this.ghostTarget = key;

    this.removeGhost();
    const { group } = LEDRenderer.build(anodePos, cathodePos, this.color, { ghost: true });
    this.scene.add(group);
    this.ghostGroup = group;
  }

  removeGhost() {
    if (this.ghostGroup) {
      this.scene.remove(this.ghostGroup);
      LEDRenderer.disposeGroup(this.ghostGroup);
      this.ghostGroup = null;
    }
    this.ghostTarget = null;
  }

  setHover(hole) {
    const id = hole ? hole.id : null;
    if (id === this.hoverId) return;
    this.clearHover();
    if (hole && hole.id !== this.anodeId) {
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

  clearAnode() {
    if (this.anodeMesh) {
      this.anodeMesh.material.color.set(this.anodeColor != null ? this.anodeColor : 0x808080);
    }
    this.anodeMesh = null;
    this.anodeColor = null;
    this.anodeId = null;
  }

  onClick(event) {
    if (!this._active) return;
    const hole = this.holeAt(this.raycast(event));
    if (!hole) {
      if (this.anodeId) this.onStatus('Invalid hole - try again', 'error');
      return;
    }

    if (!this.anodeId) {
      // First click: store the anode hole and highlight it yellow.
      this.anodeMesh = hole.mesh;
      this.anodeColor = hole.mesh.material.color.getHex();
      this.anodeMesh.material.color.set(START_COLOR);
      this.anodeId = hole.id;
      this.onStatus(`Anode ${hole.id} - click the cathode hole (1-2 holes away)`, 'info');
      return;
    }

    if (hole.id === this.anodeId) {
      this.onStatus('Cannot place an LED on the same hole.', 'error');
      return;
    }

    const anodePos = new THREE.Vector3(this.anodeMesh.position.x, 0, this.anodeMesh.position.z);
    const cathodePos = new THREE.Vector3(hole.x, 0, hole.z);
    const span = this._span(cathodePos, anodePos);
    if (span > MAX_SPAN) {
      this.onStatus(`LED pins too far apart (${span.toFixed(1)} mm, max ${MAX_SPAN.toFixed(1)})`, 'error');
      return;
    }

    const anodeId = this.anodeId;
    let led;
    try {
      led = this.manager.add({ anode: anodeId, cathode: hole.id, color: this.color });
    } catch (error) {
      this.onStatus(error.message, 'error');
      this.removeGhost();
      this.clearAnode();
      this.clearHover();
      return;
    }

    const { group } = LEDRenderer.build(anodePos, cathodePos, this.color);
    group.name = led.id;
    group.userData.ledId = led.id;
    this.scene.add(group);
    this.manager.attachMesh(led.id, group);

    this.removeGhost();
    this.clearAnode();
    this.clearHover();
    this.onStatus(
      `LED placed: ${led.anode} (anode) -> ${led.cathode} (cathode) ${led.color} - click another anode hole`,
      'success'
    );
  }
}
