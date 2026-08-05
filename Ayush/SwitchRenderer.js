/**
 * SwitchRenderer.js
 *
 * Builds the visual of one SPST toggle switch:
 *   - two straight metal leads dropping into the terminal holes
 *   - a small rectangular body (blue-gray) centered between the leads
 *   - a sliding actuator on top that moves toward terminal2 (closed) or
 *     terminal1 (open)
 *   - a lamp dot that glows green when the switch is closed
 *
 * Pass { ghost: true } for the translucent "imaginary" preview switch.
 * Materials are cached so many switches stay cheap to draw.
 */
import * as THREE from 'three';

import { LEDRenderer } from './LEDRenderer.js';

const LEAD_RADIUS = 0.3;     // lead thickness, mm
const LEAD_BOTTOM = 0.45;    // lead tips sit just above the hole spheres (0.4)
const BODY_Y = 3.9;          // body center height above the board
const BODY_HEIGHT = 2.4;     // body thickness
const BODY_WIDTH = 3.4;      // body width across the leads
const BODY_PAD = 1.8;        // body overhangs the leads by this much (mm)
const ACT_SIZE = 1.7;        // actuator box size
const ACT_OFFSET = 1.15;     // actuator travel from body center, mm
const LAMP_RADIUS = 0.42;    // state lamp on top of the body

const BODY_COLOR = 0x2e3a56;
const ACT_COLOR = 0xd8dee9;
const LAMP_OFF = 0x2a2a2a;
const LAMP_ON = 0x34c759;

let _bodyMaterial = null;
let _actMaterial = null;
let _lampMaterial = null;
const _ghostMaterials = new Map();
const _lampClones = new Map();

export class SwitchRenderer {
  /** Shared blue-gray switch body material. */
  static bodyMaterial() {
    if (!_bodyMaterial) {
      _bodyMaterial = new THREE.MeshStandardMaterial({
        color: BODY_COLOR,
        roughness: 0.55,
        metalness: 0.1,
      });
    }
    return _bodyMaterial;
  }

  /** Shared light actuator material. */
  static actMaterial() {
    if (!_actMaterial) {
      _actMaterial = new THREE.MeshStandardMaterial({
        color: ACT_COLOR,
        roughness: 0.45,
        metalness: 0.15,
      });
    }
    return _actMaterial;
  }

  /** Shared dark lamp material (cloned per switch so each can glow). */
  static lampMaterial() {
    if (!_lampMaterial) {
      _lampMaterial = new THREE.MeshStandardMaterial({
        color: LAMP_OFF,
        roughness: 0.5,
        emissive: LAMP_ON,
        emissiveIntensity: 0,
      });
    }
    return _lampMaterial;
  }

  /** Translucent "imaginary" ghost material for the preview switch. */
  static ghostMaterialFor(color) {
    const key = color || 'default';
    if (!_ghostMaterials.has(key)) {
      _ghostMaterials.set(
        key,
        new THREE.MeshBasicMaterial({
          color: 0x6aa5ff,
          transparent: true,
          opacity: 0.4,
          depthWrite: false,
          side: THREE.DoubleSide,
        })
      );
    }
    return _ghostMaterials.get(key);
  }

  /** One straight metal lead from a hole up into the body bottom. */
  static _lead(holePos, topY, name) {
    const height = topY - LEAD_BOTTOM;
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(LEAD_RADIUS, LEAD_RADIUS, height, 8),
      LEDRenderer.leadMaterial()
    );
    mesh.name = name;
    mesh.position.set(holePos.x, LEAD_BOTTOM + height / 2, holePos.z);
    return mesh;
  }

  /**
   * Build a toggle switch group. Pass { ghost: true } for the translucent
   * preview. @returns {{ group: THREE.Group, mid: THREE.Vector3 }}
   */
  static build(pos1, pos2, options = {}) {
    const ghost = options.ghost === true;
    const group = new THREE.Group();
    group.name = ghost ? 'sw_ghost' : 'switch';

    const mid = new THREE.Vector3((pos1.x + pos2.x) / 2, 0, (pos1.z + pos2.z) / 2);
    const dir = new THREE.Vector3(pos2.x - pos1.x, 0, pos2.z - pos1.z);
    const axis = dir.lengthSq() > 0 ? dir.normalize() : new THREE.Vector3(1, 0, 0);
    const span = dir.length() || 2.54;

    const bodyMat = ghost ? this.ghostMaterialFor() : this.bodyMaterial();

    // Body: box whose length runs along the lead axis.
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(BODY_WIDTH, BODY_HEIGHT, span + BODY_PAD),
      bodyMat
    );
    body.name = 'sw_body';
    body.position.set(mid.x, BODY_Y, mid.z);
    body.rotation.y = Math.atan2(axis.x, axis.z);

    // Sliding actuator on top of the body.
    const actMat = ghost ? this.ghostMaterialFor() : this.actMaterial();
    const act = new THREE.Mesh(new THREE.BoxGeometry(ACT_SIZE, 1.0, ACT_SIZE), actMat);
    act.name = 'sw_act';
    act.position.set(
      mid.x + axis.x * ACT_OFFSET,
      BODY_Y + BODY_HEIGHT / 2 + 0.5,
      mid.z + axis.z * ACT_OFFSET
    );

    // State lamp on the actuator.
    const lampMat = ghost ? this.ghostMaterialFor() : this.lampMaterial();
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(LAMP_RADIUS, 12, 10), lampMat);
    lamp.name = 'sw_lamp';
    lamp.position.set(
      mid.x + axis.x * ACT_OFFSET,
      BODY_Y + BODY_HEIGHT / 2 + 1.1,
      mid.z + axis.z * ACT_OFFSET
    );

    // Metal leads into the two terminal holes.
    const lead1 = this._lead(pos1, BODY_Y - BODY_HEIGHT / 2, 'sw_lead_t1');
    const lead2 = this._lead(pos2, BODY_Y - BODY_HEIGHT / 2, 'sw_lead_t2');

    group.add(body, act, lamp, lead1, lead2);
    group.userData.t1 = pos1.clone();
    group.userData.t2 = pos2.clone();
    group.userData.mid = mid.clone();
    group.userData.dir = axis.clone();
    return { group, mid };
  }

  /** Dispose all per-instance geometries inside a built switch group. */
  static disposeGroup(group) {
    if (!group) return;
    group.traverse((o) => {
      if (o.isMesh && o.geometry) o.geometry.dispose();
    });
  }

  static _find(group, name) {
    let found = null;
    group.traverse((o) => {
      if (!found && o.name === name) found = o;
    });
    return found;
  }

  /**
   * Visualize a switch's state: slide the actuator toward terminal2 when
   * closed (terminal1 when open) and glow the lamp when closed.
   */
  static setState(group, on) {
    if (!group) return;
    const act = this._find(group, 'sw_act');
    const lamp = this._find(group, 'sw_lamp');
    const { mid, dir } = group.userData;
    const side = on ? 1 : -1;

    if (act) {
      act.position.set(mid.x + dir.x * ACT_OFFSET * side, act.position.y, mid.z + dir.z * ACT_OFFSET * side);
    }
    if (lamp) {
      lamp.position.set(mid.x + dir.x * ACT_OFFSET * side, lamp.position.y, mid.z + dir.z * ACT_OFFSET * side);
      let mat = group.userData._lampMat;
      if (!mat) {
        mat = this.lampMaterial().clone();
        group.userData._lampMat = mat;
        lamp.material = mat;
      }
      mat.emissiveIntensity = on ? 1.8 : 0;
    }
  }

  /** Headless self-review of the switch geometry and state visuals. */
  static validate() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    const p1 = new THREE.Vector3(-1.27, 0, -3.81);
    const p2 = new THREE.Vector3(1.27, 0, -3.81);
    const { group, mid } = this.build(p1, p2);

    add('Group named switch', group.name === 'switch');
    add('Body mesh present', this._find(group, 'sw_body') !== null);
    add('Actuator present', this._find(group, 'sw_act') !== null);
    add('State lamp present', this._find(group, 'sw_lamp') !== null);
    add('Two terminal leads present',
      this._find(group, 'sw_lead_t1') !== null && this._find(group, 'sw_lead_t2') !== null);

    const lead1 = this._find(group, 'sw_lead_t1');
    const lead2 = this._find(group, 'sw_lead_t2');
    add('Leads snap to hole centers',
      lead1.position.x === p1.x && lead1.position.z === p1.z &&
      lead2.position.x === p2.x && lead2.position.z === p2.z);

    add('Body centered between terminals',
      mid.x === (p1.x + p2.x) / 2 && mid.z === (p1.z + p2.z) / 2);

    const act = this._find(group, 'sw_act');
    const lamp = this._find(group, 'sw_lamp');
    const yBefore = act.position.y;
    this.setState(group, false);
    const openX = act.position.x;
    const lampOpen = lamp.material.emissiveIntensity;
    this.setState(group, true);
    const closedX = act.position.x;
    add('Actuator slides when toggled', Math.abs(closedX - openX) > 0.1, `${openX.toFixed(2)} -> ${closedX.toFixed(2)}`);
    add('Actuator stays at the same height', act.position.y === yBefore);

    add('Lamp dark when open', lampOpen === 0);
    add('Lamp glows when closed', lamp.material.emissiveIntensity > 0);

    let nan = false;
    group.traverse((o) => {
      if (o.isMesh) {
        const p = o.geometry.getAttribute('position').array;
        if (p.some((v) => !Number.isFinite(v))) nan = true;
      }
    });
    add('No NaN in geometry', !nan);

    const ghost = this.build(p1, p2, { ghost: true }).group;
    const ghostBody = this._find(ghost, 'sw_body');
    add(
      'Ghost switch is translucent imaginary',
      ghost.name === 'sw_ghost' && ghostBody.material.transparent === true && ghostBody.material.opacity < 1
    );

    return checks;
  }
}
