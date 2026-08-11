/**
 * PowerSupplyRenderer.js
 *
 * Builds the visual of the bench power supply and its two connecting wires:
 *   - a two-tone body sitting on the desk just off the board (z = +46 mm)
 *   - a red (+) and a black (-) banana terminal sticking out of the top
 *   - a small green power-on indicator
 *   - red / black wires as TubeGeometry along an arched CatmullRomCurve3 from
 *     each terminal down to the connected breadboard hole
 *
 * Pass { ghost: true } for the translucent "imaginary" preview wire.
 * Materials are cached so only one body set and two wire colors ever exist.
 */
import * as THREE from 'three';

const WIRE_RADIUS = 0.35;   // mm
const HOLE_Y = 0.45;        // just above the hole sphere tops (0.4)

const WIRE_COLORS = { red: 0xe53935, black: 0x1a1a1a };

// Supply sits on the desk behind the top power rails (z = +46).
const BODY_CENTER = new THREE.Vector3(0, 8.5, 46);
const POSITIVE_TIP = new THREE.Vector3(-6, 17.5, 46);
const NEGATIVE_TIP = new THREE.Vector3(6, 17.5, 46);

const _wireMaterials = new Map();
const _ghostMaterials = new Map();

export class PowerSupplyRenderer {
  /** Build the power supply group. Pass scene (or null) to also add it. */
  static buildSupply(scene = null) {
    const group = new THREE.Group();
    group.name = 'power_supply';

    const base = new THREE.Mesh(
      new THREE.BoxGeometry(34, 3, 18),
      this._standardMaterial(0x3a3f4a, 0.7, 0.1)
    );
    base.name = 'ps_base';
    base.position.set(0, 1.5, 46);

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(28, 11, 14),
      this._standardMaterial(0x22262e, 0.6, 0.1)
    );
    body.name = 'ps_body';
    body.position.copy(BODY_CENTER);

    const positiveTerminal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.3, 1.3, 3.5, 12),
      this._standardMaterial(0xff3b30, 0.4, 0.3)
    );
    positiveTerminal.name = 'ps_terminal_positive';
    positiveTerminal.position.set(-6, 15.75, 46);

    const negativeTerminal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.3, 1.3, 3.5, 12),
      this._standardMaterial(0x1a1a1a, 0.4, 0.3)
    );
    negativeTerminal.name = 'ps_terminal_negative';
    negativeTerminal.position.set(6, 15.75, 46);

    const indicator = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 12, 10),
      new THREE.MeshStandardMaterial({
        color: 0x22cc55,
        emissive: 0x22cc55,
        emissiveIntensity: 0.9,
        roughness: 0.4,
      })
    );
    indicator.name = 'ps_indicator';
    indicator.position.set(0, 12, 38.3);

    group.add(base, body, positiveTerminal, negativeTerminal, indicator);

    const terminals = { positive: POSITIVE_TIP.clone(), negative: NEGATIVE_TIP.clone() };
    if (scene) scene.add(group);
    return { group, terminals };
  }

  static _standardMaterial(color, roughness, metalness) {
    return new THREE.MeshStandardMaterial({ color, roughness, metalness });
  }

  static _wireMaterial(colorName) {
    if (!_wireMaterials.has(colorName)) {
      _wireMaterials.set(
        colorName,
        new THREE.MeshStandardMaterial({
          color: WIRE_COLORS[colorName],
          roughness: 0.6,
          metalness: 0.1,
        })
      );
    }
    return _wireMaterials.get(colorName);
  }

  /** Translucent "imaginary" ghost material for the preview wire. */
  static _ghostMaterial(colorName) {
    if (!_ghostMaterials.has(colorName)) {
      _ghostMaterials.set(
        colorName,
        new THREE.MeshBasicMaterial({
          color: WIRE_COLORS[colorName],
          transparent: true,
          opacity: 0.4,
          depthWrite: false,
          side: THREE.DoubleSide,
        })
      );
    }
    return _ghostMaterials.get(colorName);
  }

  /**
   * Arched control points from a high terminal down to a low board hole.
   * First point is exactly the terminal, last point is exactly the hole.
   */
  static wirePoints(from, to) {
    const dx = to.x - from.x;
    const dz = to.z - from.z;
    const dist = Math.hypot(dx, dz) || 1;
    const baseY = Math.max(from.y, to.y);
    const apex = Math.max(4, Math.min(20, 3 + dist * 0.14));
    const p = (f, h) => new THREE.Vector3(from.x + dx * f, h, from.z + dz * f);
    return [
      from.clone(),
      p(0.18, baseY + apex * 0.4),
      p(0.45, baseY + apex),
      p(0.78, to.y + apex * 0.45),
      to.clone(),
    ];
  }

  static curveFor(points) {
    return new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.5);
  }

  /**
   * Build one power wire. colorName is 'red' (positive) or 'black' (negative).
   * @returns {{ mesh: THREE.Mesh, curve: THREE.CatmullRomCurve3, length: number }}
   */
  static buildWire(from, to, colorName, options = {}) {
    const points = this.wirePoints(from, to);
    const curve = this.curveFor(points);
    const dist = points[points.length - 1].distanceTo(points[0]);
    const tubularSegments = Math.max(12, Math.min(48, Math.ceil(dist * 1.2)));

    const geometry = new THREE.TubeGeometry(curve, tubularSegments, WIRE_RADIUS, 8, false);
    const material = options.ghost ? this._ghostMaterial(colorName) : this._wireMaterial(colorName);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = options.ghost ? 'ps_wire_ghost' : 'ps_wire';
    return { mesh, curve, length: curve.getLength() };
  }

  static disposeWire(mesh) {
    if (mesh && mesh.geometry) mesh.geometry.dispose();
  }

  static _find(group, name) {
    let found = null;
    group.traverse((o) => {
      if (!found && o.name === name) found = o;
    });
    return found;
  }

  /** Headless self-review of the power supply geometry. */
  static validate() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    const { group, terminals } = this.buildSupply(null);

    add('Power supply group built', group.name === 'power_supply');
    add('Supply body present', this._find(group, 'ps_body') !== null);
    add('Positive (red) terminal present', this._find(group, 'ps_terminal_positive') !== null);
    add('Negative (black) terminal present', this._find(group, 'ps_terminal_negative') !== null);
    add('Power-on indicator present', this._find(group, 'ps_indicator') !== null);
    add(
      'Terminals sit above the body',
      terminals.positive.y > 14 && terminals.negative.y > 14,
      `tips at y = ${terminals.positive.y}`
    );
    add(
      'Terminal colors match polarity',
      this._find(group, 'ps_terminal_positive').material.color.getHex() === 0xff3b30 &&
        this._find(group, 'ps_terminal_negative').material.color.getHex() === 0x1a1a1a
    );

    let nan = false;
    group.traverse((o) => {
      if (o.isMesh) {
        const p = o.geometry.getAttribute('position').array;
        if (p.some((v) => !Number.isFinite(v))) nan = true;
      }
    });
    add('No NaN in supply geometry', !nan);

    const to = new THREE.Vector3(0, HOLE_Y, 0);
    const red = this.buildWire(terminals.positive, to, 'red');
    add('Red + wire uses TubeGeometry', red.mesh.geometry.type === 'TubeGeometry');
    add(
      'Wire snaps exactly to terminal and hole',
      red.curve.points[0].x === terminals.positive.x &&
        red.curve.points[0].y === terminals.positive.y &&
        red.curve.points[red.curve.points.length - 1].x === to.x &&
        red.curve.points[red.curve.points.length - 1].z === to.z
    );
    add('Positive wire is red', red.mesh.material.color.getHex() === 0xe53935);

    const black = this.buildWire(terminals.negative, to, 'black').mesh;
    add('Negative wire is black', black.material.color.getHex() === 0x1a1a1a);

    add('Wires arch above the board', red.curve.getPoints(30).every((p) => p.y >= HOLE_Y - 0.05));

    const ghost = this.buildWire(terminals.positive, to, 'red', { ghost: true }).mesh;
    add(
      'Ghost preview wire is translucent imaginary',
      ghost.material.transparent === true && ghost.material.opacity < 1 && ghost.name === 'ps_wire_ghost'
    );

    return checks;
  }
}
