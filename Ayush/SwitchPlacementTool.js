/**
 * SwitchPlacementTool.js
 *
 * Browser interaction for placing SPST toggle switches on the breadboard:
 *   1. activate() enables placement mode
 *   2. hovering a hole highlights it
 *   3. first click stores the terminal1 hole (highlighted yellow) and a
 *      translucent "imaginary" ghost switch follows the cursor
 *   4. second click (1-2 hole pitches away) turns the ghost into a real
 *      switch and stays in placement mode so more can be placed back to back
 *   5. clicking an already-placed switch body toggles it open/closed (lamp
 *      glows green when closed) - this also works in any mode via toggleAt()
 *   6. ESC clears the pending terminal1 selection, or exits if none pending
 *   7. Backspace / Delete undoes the last placed switch
 *
 * Hole picking uses a hidden pick-plane (one raycast, fast) plus a nearest-
 * hole lookup, so it stays cheap with many switches on screen.
 */
import * as THREE from 'three';

import { SwitchRenderer } from './SwitchRenderer.js';

const SNAP_RADIUS = 1.5;    // mm - half pitch + a little slack
const HOLE_PITCH = 2.54;    // mm
const MIN_SPAN = HOLE_PITCH * 0.5;   // reject accidental self-touch
const MAX_SPAN = HOLE_PITCH * 2.2;   // switch leads span 1-2 holes
const HOVER_COLOR = 0xffffff;
const START_COLOR = 0xffd700;

export class SwitchPlacementTool {
  constructor({ domElement, camera, scene, field, manager, onStatus, onModeChange }) {
    this.domElement = domElement;
    this.camera = camera;
    this.scene = scene;
    this.manager = manager;
    this.onStatus = onStatus || (() => {});
    this.onModeChange = onModeChange || (() => {});

    this._active = false;
    this.term1Id = null;
    this.term1Mesh = null;
    this.term1Color = null;
    this.hoverId = null;
    this.hoverMesh = null;
    this.hoverColor = null;
    this.ghostGroup = null;
    this.switchGroups = [];   // every placed switch group (for click-to-toggle)

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
    this.domElement.addEventListener('pointermove', this.onPointerMove);
    this.domElement.addEventListener('click', this.onClick);
    document.addEventListener('keydown', this.onKeyDown);
    this.onModeChange(true);
    this.onStatus('Click a hole for switch terminal 1, then a second hole 1-2 pitches away', 'info');
  }

  deactivate() {
    if (!this._active) return;
    this._active = false;
    this.domElement.removeEventListener('pointermove', this.onPointerMove);
    this.domElement.removeEventListener('click', this.onClick);
    document.removeEventListener('keydown', this.onKeyDown);
    this.clearTerm1();
    this.clearHover();
    this.removeGhost();
    this.onModeChange(false);
  }

  toggle() {
    if (this._active) this.deactivate();
    else this.activate();
  }

  /** ESC: clear the pending terminal1 hole, otherwise exit placement mode. */
  cancel() {
    if (this.term1Id) this.clearTerm1();
    else this.deactivate();
  }

  /** Undo the most recently placed switch. Returns true if one was removed. */
  undoLast() {
    const sw = this.manager.last();
    if (!sw) {
      this.onStatus('No switch to undo', 'info');
      return false;
    }
    this.manager.remove(sw.id);
    this.onStatus(`Undid ${sw.id} (${sw.terminal1} <-> ${sw.terminal2})`, 'info');
    return true;
  }

  /** Remove every placed switch. Returns how many were removed. */
  resetAll() {
    const total = this.manager.count();
    this.manager.clear();
    this.switchGroups = [];
    this.onStatus(total > 0 ? `Cleared all ${total} switch(es)` : 'No switches to clear', 'info');
    return total;
  }

  onKeyDown(event) {
    if (!this._active) return;
    if (event.key === 'Escape') {
      this.cancel();
      return;
    }
    if (event.key === 'Backspace' || event.key === 'Delete') {
      if (this.term1Id) this.clearTerm1();
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

  /**
   * Raycast the placed switch bodies. Returns the switch id under the cursor,
   * or null. Used both by this tool and by the passive lab toggle handler.
   */
  pickSwitch(event) {
    if (!this.switchGroups.length) return null;
    const rect = this.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    const hits = this.raycaster.intersectObjects(this.switchGroups, true);
    for (const hit of hits) {
      const id = hit.object.userData.swId;
      if (id) return id;
    }
    return null;
  }

  /**
   * Toggle the switch under the cursor (passive handler - works without the
   * tool being active). Returns true if a switch was toggled.
   */
  toggleAt(event) {
    const id = this.pickSwitch(event);
    if (!id) return false;
    this.flip(id);
    return true;
  }

  /** Flip one switch and refresh its visual. */
  flip(id) {
    const sw = this.manager.toggle(id);
    if (!sw) return;
    SwitchRenderer.setState(this.manager.group(id), sw.on);
    this.onStatus(
      `${sw.id} ${sw.on ? 'CLOSED' : 'OPEN'}: ${sw.terminal1} <-> ${sw.terminal2} now ${sw.on ? 'connected' : 'open'}`,
      sw.on ? 'success' : 'info'
    );
  }

  onPointerMove(event) {
    if (!this._active) return;
    const point = this.raycast(event);
    const hole = this.holeAt(point);
    this.setHover(hole);
    if (this.term1Id) this.updateGhost(hole);
  }

  /**
   * "Imaginary" preview switch: hovers a translucent switch between terminal1
   * and the candidate terminal2 hole. Only shown when the hole is valid.
   */
  updateGhost(hole) {
    if (!hole || hole.id === this.term1Id) {
      this.removeGhost();
      return;
    }
    const t1Pos = new THREE.Vector3(this.term1Mesh.position.x, 0, this.term1Mesh.position.z);
    const span = this._span(hole, t1Pos);
    if (span <= MIN_SPAN || span > MAX_SPAN) {
      this.removeGhost();
      return;
    }
    const t2Pos = new THREE.Vector3(hole.x, 0, hole.z);
    const key = hole.id;
    if (key === this.ghostTarget) return;
    this.ghostTarget = key;

    this.removeGhost();
    const { group } = SwitchRenderer.build(t1Pos, t2Pos, { ghost: true });
    this.scene.add(group);
    this.ghostGroup = group;
  }

  removeGhost() {
    if (this.ghostGroup) {
      this.scene.remove(this.ghostGroup);
      SwitchRenderer.disposeGroup(this.ghostGroup);
      this.ghostGroup = null;
    }
    this.ghostTarget = null;
  }

  setHover(hole) {
    const id = hole ? hole.id : null;
    if (id === this.hoverId) return;
    this.clearHover();
    if (hole && hole.id !== this.term1Id) {
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

  clearTerm1() {
    if (this.term1Mesh) {
      this.term1Mesh.material.color.set(this.term1Color != null ? this.term1Color : 0x808080);
    }
    this.term1Mesh = null;
    this.term1Color = null;
    this.term1Id = null;
  }

  onClick(event) {
    if (!this._active) return;

    // Clicking an existing switch body toggles it instead of placing.
    const swId = this.pickSwitch(event);
    if (swId) {
      this.flip(swId);
      this.removeGhost();
      this.clearTerm1();
      this.clearHover();
      return;
    }

    const hole = this.holeAt(this.raycast(event));
    if (!hole) {
      if (this.term1Id) this.onStatus('Invalid hole - try again', 'error');
      return;
    }

    if (!this.term1Id) {
      // First click: store the terminal1 hole and highlight it yellow.
      this.term1Mesh = hole.mesh;
      this.term1Color = hole.mesh.material.color.getHex();
      this.term1Mesh.material.color.set(START_COLOR);
      this.term1Id = hole.id;
      this.onStatus(`Terminal 1 ${hole.id} - click the second hole (1-2 holes away)`, 'info');
      return;
    }

    if (hole.id === this.term1Id) {
      this.onStatus('Cannot place a switch on the same hole.', 'error');
      return;
    }

    const t1Pos = new THREE.Vector3(this.term1Mesh.position.x, 0, this.term1Mesh.position.z);
    const t2Pos = new THREE.Vector3(hole.x, 0, hole.z);
    const span = this._span(t2Pos, t1Pos);
    if (span > MAX_SPAN) {
      this.onStatus(`Switch leads too far apart (${span.toFixed(1)} mm, max ${MAX_SPAN.toFixed(1)})`, 'error');
      return;
    }

    const term1Id = this.term1Id;
    let sw;
    try {
      sw = this.manager.add({ terminal1: term1Id, terminal2: hole.id });
    } catch (error) {
      this.onStatus(error.message, 'error');
      this.removeGhost();
      this.clearTerm1();
      this.clearHover();
      return;
    }

    const { group } = SwitchRenderer.build(t1Pos, t2Pos);
    group.name = sw.id;
    group.traverse((o) => {
      if (o.isMesh) o.userData.swId = sw.id;
    });
    this.scene.add(group);
    this.manager.attachGroup(sw.id, group);
    this.switchGroups.push(group);

    this.removeGhost();
    this.clearTerm1();
    this.clearHover();
    this.onStatus(
      `Switch placed: ${sw.terminal1} <-> ${sw.terminal2} (open) - click it to close, or place another`,
      'success'
    );
  }
}
