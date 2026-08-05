/**
 * ProbeRenderer.js
 *
 * Builds the visual marker for the logic probe: a slim ring + cone hovering
 * over the probed hole, colored by the live net state.
 *
 *   H (HIGH)  -> green
 *   L (LOW)   -> blue
 *   X (conflict) -> yellow
 *   float/null   -> gray
 */
import * as THREE from 'three';

const MARKER_RADIUS = 0.9;    // ring radius, mm (just larger than a hole)
const MARKER_Y = 1.2;         // ring height above the board
const CONE_HEIGHT = 0.9;      // pointer cone length
const CONE_RADIUS = 0.45;     // pointer cone radius

const STATE_COLORS = {
  H: 0x22cc55,
  L: 0x6aa5ff,
  X: 0xffcc66,
  float: 0x9ca3af,
};

let _markerMaterial = null;

export class ProbeRenderer {
  /** Hex color for a net state (gray fallback). */
  static colorFor(state) {
    const key = state === 'H' || state === 'L' || state === 'X' ? state : 'float';
    return STATE_COLORS[key];
  }

  /** Shared marker material (cloned per marker so each can recolor). */
  static markerMaterial() {
    if (!_markerMaterial) {
      _markerMaterial = new THREE.MeshStandardMaterial({
        color: STATE_COLORS.float,
        roughness: 0.4,
        emissive: STATE_COLORS.float,
        emissiveIntensity: 0.6,
      });
    }
    return _markerMaterial;
  }

  /**
   * Build the probe marker at a hole position.
   * @returns {{ marker: THREE.Group }}
   */
  static build(holePos) {
    const marker = new THREE.Group();
    marker.name = 'probe_marker';

    const mat = this.markerMaterial().clone();

    const ring = new THREE.Mesh(new THREE.TorusGeometry(MARKER_RADIUS, 0.18, 10, 24), mat);
    ring.name = 'probe_ring';
    ring.rotation.x = Math.PI / 2;
    ring.position.set(holePos.x, MARKER_Y, holePos.z);

    const cone = new THREE.Mesh(new THREE.ConeGeometry(CONE_RADIUS, CONE_HEIGHT, 12), mat);
    cone.name = 'probe_tip';
    cone.position.set(holePos.x, MARKER_Y - CONE_HEIGHT / 2 - 0.15, holePos.z);

    marker.add(ring, cone);
    marker.userData.pos = holePos.clone();
    return { marker };
  }

  /** Recolor the marker for a net state. */
  static setState(marker, state) {
    if (!marker) return;
    const color = this.colorFor(state);
    marker.traverse((o) => {
      if (o.isMesh && o.material && o.material.emissive) {
        o.material.color.set(color);
        o.material.emissive.set(color);
        o.material.emissiveIntensity = 0.6;
      }
    });
  }

  /** Dispose the marker's geometries and cloned material. */
  static dispose(marker) {
    if (!marker) return;
    marker.traverse((o) => {
      if (o.isMesh) {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      }
    });
  }

  /** Headless self-review of the probe marker geometry and coloring. */
  static validate() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    const pos = new THREE.Vector3(-1.27, 0, -3.81);
    const { marker } = this.build(pos);

    add('Marker group named probe_marker', marker.name === 'probe_marker');
    add('Ring mesh present', this._find(marker, 'probe_ring') !== null);
    add('Pointer cone present', this._find(marker, 'probe_tip') !== null);

    const ring = this._find(marker, 'probe_ring');
    add('Marker snaps to the hole center',
      ring.position.x === pos.x && ring.position.z === pos.z);

    add('Marker floats above the board', ring.position.y > 0);

    let nan = false;
    marker.traverse((o) => {
      if (o.isMesh) {
        const p = o.geometry.getAttribute('position').array;
        if (p.some((v) => !Number.isFinite(v))) nan = true;
      }
    });
    add('No NaN in geometry', !nan);

    this.setState(marker, 'H');
    const ringMat = ring.material;
    add('HIGH state colors the marker green', ringMat.color.getHex() === 0x22cc55);

    this.setState(marker, 'L');
    add('LOW state colors the marker blue', ring.material.color.getHex() === 0x6aa5ff);

    this.setState(marker, 'X');
    add('Conflict state colors the marker yellow', ring.material.color.getHex() === 0xffcc66);

    this.setState(marker, null);
    add('Float state colors the marker gray', ring.material.color.getHex() === 0x9ca3af);

    return checks;
  }

  static _find(group, name) {
    let found = null;
    group.traverse((o) => {
      if (!found && o.name === name) found = o;
    });
    return found;
  }
}
