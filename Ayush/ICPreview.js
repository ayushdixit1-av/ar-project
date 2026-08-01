/**
 * ICPreview.js
 *
 * Live placement preview:
 *   - semi-transparent IC body rectangle
 *   - exactly 14 highlight spheres on the holes that would be occupied
 *   - GREEN when the placement is valid, RED when invalid
 */
import * as THREE from 'three';

import { IC } from './IC.js';
import { HoleGenerator } from './HoleGenerator.js';

const PREVIEW_GREEN = 0x22cc55;
const PREVIEW_RED = 0xff4444;

export class ICPreview {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.body = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: PREVIEW_GREEN,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      })
    );
    this.group.add(this.body);

    this.highlightGeometry = new THREE.SphereGeometry(0.5, 12, 8);
    this.validMaterial = new THREE.MeshBasicMaterial({
      color: PREVIEW_GREEN,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    this.invalidMaterial = new THREE.MeshBasicMaterial({
      color: PREVIEW_RED,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    this.highlights = [];

    this.group.visible = false;
  }

  show(pins, valid) {
    const bounds = IC.bounds(pins);
    const margin = 0.5;

    this.body.scale.set(bounds.width + margin, 1.5, bounds.height + margin);
    this.body.position.set(bounds.centerX, 0.75, bounds.centerY);
    this.body.material.color.set(valid ? PREVIEW_GREEN : PREVIEW_RED);

    for (let i = 0; i < pins.length; i++) {
      let sphere = this.highlights[i];
      if (!sphere) {
        sphere = new THREE.Mesh(this.highlightGeometry, this.validMaterial);
        this.group.add(sphere);
        this.highlights.push(sphere);
      }
      const pin = pins[i];
      const pos = HoleGenerator.positionOf(pin.row, pin.column);
      sphere.position.set(pos.x, 0.45, pos.y);
      sphere.material = valid ? this.validMaterial : this.invalidMaterial;
      sphere.visible = true;
    }
    // Hide any leftover highlight spheres from a larger previous footprint.
    for (let i = pins.length; i < this.highlights.length; i++) {
      this.highlights[i].visible = false;
    }

    this.group.visible = true;
  }

  hide() {
    this.group.visible = false;
  }
}
