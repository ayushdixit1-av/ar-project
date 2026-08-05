/**
 * ProbeTool.js
 *
 * Browser interaction for the logic probe:
 *   1. activate() enables probe mode
 *   2. hovering a hole highlights it
 *   3. click a hole -> attach the probe marker there; the readout panel
 *      shows its live net state
 *   4. click the same hole again -> detach the probe
 *   5. click another hole -> move the probe there
 *   6. ESC exits; Backspace / Delete detach the probe
 *
 * Hole picking uses a hidden pick-plane (one raycast, fast) plus a nearest-
 * hole lookup, so it stays cheap with other components on screen.
 */
import * as THREE from 'three';

import { ProbeRenderer } from './ProbeRenderer.js';

const SNAP_RADIUS = 1.5;   // mm - half pitch + a little slack
const HOVER_COLOR = 0xffffff;

export class ProbeTool {
  constructor({ domElement, camera, scene, field, manager, onStatus, onModeChange }) {
    this.domElement = domElement;
    this.camera = camera;
    this.scene = scene;
    this.manager = manager;
    this.onStatus = onStatus || (() => {});
    this.onModeChange = onModeChange || (() => {});

    this._active = false;
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
    this.clearHover();
    this.onModeChange(false);
  }

  toggle() {
    if (this._active) this.deactivate();
    else this.activate();
  }

  cancel() {
    if (this.manager.active) this._removeMarker();
    else this.deactivate();
  }

  /** Backspace / Delete detach the probe. */
  onKeyDown(event) {
    if (!this._active) return;
    if (event.key === 'Escape') {
      this.cancel();
      return;
    }
    if (event.key === 'Backspace' || event.key === 'Delete') {
      if (this.manager.active) this._removeMarker();
      else this.deactivate();
    }
  }

  _statusHint() {
    if (this.manager.active) {
      this.onStatus(
        `Probe on ${this.manager.holeId} - click it again to detach, another hole to move it`,
        'success'
      );
    } else {
      this.onStatus('Probe: click any hole to measure its logic state', 'info');
    }
  }

  /** Detach the probe (manager + marker mesh). */
  _removeMarker() {
    this.manager.clear();
    if (this.manager.marker) {
      this.scene.remove(this.manager.marker);
      ProbeRenderer.dispose(this.manager.marker);
      this.manager.marker = null;
    }
    this.onStatus('Probe detached', 'info');
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
    this.setHover(this.holeAt(point));
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
      if (this.manager.active) this.onStatus('Invalid hole - try again', 'error');
      return;
    }

    this.clearHover();

    // Clicking the probed hole detaches the probe.
    if (this.manager.active && this.manager.holeId === hole.id) {
      this._removeMarker();
      this.onStatus('Probe detached', 'info');
      return;
    }

    // Attach (or move) the probe.
    if (this.manager.marker) {
      this.scene.remove(this.manager.marker);
      ProbeRenderer.dispose(this.manager.marker);
      this.manager.marker = null;
    }

    this.manager.setHole(hole.id);
    const { marker } = ProbeRenderer.build(
      new THREE.Vector3(hole.x, 0, hole.z)
    );
    this.scene.add(marker);
    this.manager.marker = marker;
    this.onStatus(`Probe on ${hole.id} - see the readout panel`, 'success');
    this._statusHint();
  }
}
