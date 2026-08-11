/**
 * ICPlacementTool.js
 *
 * Handles the IC placement mode lifecycle and mouse interaction:
 *   - a hidden pick-plane raycast finds the cursor position on the board
 *   - the IC footprint snaps to the nearest column / center-gap rows
 *   - the preview follows the mouse and shows validity in real time
 *   - a single click on a valid starting position places the whole IC
 */
import * as THREE from 'three';

import { BreadboardConfig } from './BreadboardConfig.js';
import { IC } from './IC.js';
import { ICValidator } from './ICValidator.js';
import { ICLabel } from './ICLabel.js';

export class ICPlacementTool {
  constructor({ domElement, camera, scene, holes, preview, manager, onStatus, onModeChange, onICPlaced, onICRemoved }) {
    this.domElement = domElement;
    this.camera = camera;
    this.scene = scene;
    this.holes = holes;
    this.preview = preview;
    this.manager = manager;
    this.onStatus = onStatus || (() => {});
    this.onModeChange = onModeChange || (() => {});
    this.onICPlaced = onICPlaced || (() => {});
    this.onICRemoved = onICRemoved || (() => {});

    this._active = false;
    this.part = '7400';
    this._lastPoint = null;

    this.placedGroups = new Map();    // ic.id -> THREE.Group
    this.holeBaseColor = new Map();   // hole id -> original color hex

    this.raycaster = new THREE.Raycaster();
    this.pickPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 120),
      new THREE.MeshBasicMaterial()
    );
    this.pickPlane.rotation.x = -Math.PI / 2;
    this.pickPlane.visible = false;
    this.scene.add(this.pickPlane);

    this.holeMeshById = new Map();

    this.onPointerMove = this.onPointerMove.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  setHoleMesh(id, mesh) {
    this.holeMeshById.set(id, mesh);
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
  }

  deactivate() {
    if (!this._active) return;
    this._active = false;
    this.domElement.removeEventListener('pointermove', this.onPointerMove);
    this.domElement.removeEventListener('click', this.onClick);
    document.removeEventListener('keydown', this.onKeyDown);
    this.preview.hide();
    this.onModeChange(false);
  }

  toggle() {
    if (this._active) this.deactivate();
    else this.activate();
  }

  /** Select which catalog part to place (e.g. "7408"). */
  setPart(part) {
    if (!IC.CATALOG[part]) return;
    this.part = part;
    this.onStatus(`IC ${part} (${IC.CATALOG[part].label}) - click to place`, 'info');
    if (this._active && this._lastPoint) this.updatePreview(this._lastPoint);
  }

  cancel() {
    if (this._active) this.deactivate();
  }

  /** Backspace / Delete undo the most recently placed IC. */
  onKeyDown(event) {
    if (!this._active) return;
    if (event.key === 'Backspace' || event.key === 'Delete') this.undoLast();
  }

  /** Undo the most recently placed IC. Returns true if one was removed. */
  undoLast() {
    const ic = this.manager.last();
    if (!ic) {
      this.onStatus('No IC to undo', 'info');
      return false;
    }
    this._removeIC(ic);
    this.onStatus(`Undid ${ic.id} (${ic.name})`, 'info');
    return true;
  }

  /** Remove every placed IC. Returns how many were removed. */
  resetAll() {
    const total = this.manager.ics.length;
    for (const ic of [...this.manager.ics]) this._removeIC(ic);
    this.onStatus(total > 0 ? `Cleared all ${total} IC(s)` : 'No ICs to clear', 'info');
    return total;
  }

  /** Remove one IC: scene mesh, hole colors, and occupied-hole state. */
  _removeIC(ic) {
    const group = this.placedGroups.get(ic.id);
    if (group) {
      this.scene.remove(group);
      this.placedGroups.delete(ic.id);
    }
    for (const pin of ic.pins) {
      const mesh = this.holeMeshById.get(`${pin.row}${pin.column}`);
      if (mesh && this.holeBaseColor.has(`${pin.row}${pin.column}`)) {
        mesh.material.color.set(this.holeBaseColor.get(`${pin.row}${pin.column}`));
        this.holeBaseColor.delete(`${pin.row}${pin.column}`);
      }
    }
    this.manager.remove(ic.id);
    this.onICRemoved(ic);
  }

  onPointerMove(event) {
    if (!this._active) return;
    const point = this.raycast(event);
    if (point) {
      this._lastPoint = point;
      this.updatePreview(point);
    }
  }

  onClick(event) {
    if (!this._active) return;
    const point = this.raycast(event);
    if (point) this.tryPlaceAt(point);
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

  /**
   * Snap a board-space point to the nearest DIP-14 anchor position.
   * The anchor is the pin-1 hole: row E (NORMAL) or row F (FLIPPED),
   * depending on which side of the center gap the cursor is on.
   */
  computeAnchor(point) {
    const { columnPitch, columns } = BreadboardConfig.layout;
    const spanX = (columns - 1) * columnPitch;
    const col = Math.round((point.x + spanX / 2) / columnPitch);
    const startColumn = Math.min(Math.max(col, 1), columns);
    const orientation = point.z < 0 ? IC.ORIENTATION.NORMAL : IC.ORIENTATION.FLIPPED;
    const startRow = orientation === IC.ORIENTATION.NORMAL ? IC.ROW.F : IC.ROW.E;
    return { startRow, startColumn, orientation };
  }

  updatePreview(point) {
    const anchor = this.computeAnchor(point);
    const pins = IC.footprintFor(this.part, anchor.startRow, anchor.startColumn, anchor.orientation);
    const result = ICValidator.validate(pins, this.manager.occupiedIds(), anchor.orientation);
    this.preview.show(pins, result.valid);
  }

  tryPlaceAt(point) {
    const anchor = this.computeAnchor(point);
    const pins = IC.footprintFor(this.part, anchor.startRow, anchor.startColumn, anchor.orientation);
    const result = ICValidator.validate(pins, this.manager.occupiedIds(), anchor.orientation);

    if (result.valid) {
      const ic = this.manager.place({ holes: this.holes, ...anchor, part: this.part });
      this.createPlacedMesh(ic);
      this.markOccupiedHoles(ic);
      this.onStatus(`IC ${ic.name} Placed Successfully`, 'success');
      this.onICPlaced(ic);
      this.deactivate();
    } else {
      this.onStatus(result.issues.join(' '), 'error');
    }
  }

  markOccupiedHoles(ic) {
    for (const pin of ic.pins) {
      const id = `${pin.row}${pin.column}`;
      const mesh = this.holeMeshById.get(id);
      if (mesh) {
        if (!this.holeBaseColor.has(id)) {
          this.holeBaseColor.set(id, mesh.material.color.getHex());
        }
        mesh.material.color.set(0x3a3f4a);
      }
    }
  }

  createPlacedMesh(ic) {
    const bounds = IC.bounds(ic.pins);
    const group = new THREE.Group();
    group.name = ic.id;

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(bounds.width + 0.75, 2.4, bounds.height + 0.75),
      new THREE.MeshStandardMaterial({ color: 0x2266ff, roughness: 0.6 })
    );
    body.position.set(bounds.centerX, 1.2, bounds.centerY);
    group.add(body);

    const label = ICLabel.makeLabelMesh(ic.name, bounds);
    label.name = `${ic.id}_label`;
    group.add(label);

    this.scene.add(group);
    this.placedGroups.set(ic.id, group);
  }
}
