/**
 * PowerSupplyRenderer.js
 *
 * Builds the visual of the GND and VCC power module:
 *   - a dark module sitting on the desk to the left of the board
 *   - text labels for GND and VCC
 *   - two black terminal jacks for each
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

// Supply sits on the desk to the left of the board.
const MODULE_X = -105;
const MODULE_Y = 0;
const MODULE_Z = 0;

// Right-side jacks are used as the active terminals for wires
const POSITIVE_TIP = new THREE.Vector3(MODULE_X + 5, 0.5, 12);
const NEGATIVE_TIP = new THREE.Vector3(MODULE_X + 5, 0.5, -8);

const _wireMaterials = new Map();
const _ghostMaterials = new Map();

export class PowerSupplyRenderer {
  /** Build the power supply group. Pass scene (or null) to also add it. */
  static buildSupply(scene = null) {
    const group = new THREE.Group();
    group.name = 'power_supply';

    // Main body (dark plastic)
    const bodyGeom = new THREE.BoxGeometry(26, 2, 48);
    const bodyMat = this._standardMaterial(0x22262e, 0.8, 0.1);
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    body.name = 'ps_body';
    body.position.set(MODULE_X, MODULE_Y - 0.5, MODULE_Z);
    group.add(body);

    // Thick black border (slightly larger, sitting just below/around the body)
    const borderGeom = new THREE.BoxGeometry(28, 1.8, 50);
    const borderMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const border = new THREE.Mesh(borderGeom, borderMat);
    border.position.set(MODULE_X, MODULE_Y - 0.6, MODULE_Z);
    group.add(border);

    // Terminal jacks (black rings with dark holes)
    const jackOuterMat = this._standardMaterial(0x111111, 0.6, 0.2);
    const jackInnerMat = new THREE.MeshBasicMaterial({ color: 0x000000 });

    const createJack = (name, x, z) => {
      const jGroup = new THREE.Group();
      jGroup.name = name;
      const outer = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 0.5, 16), jackOuterMat);
      outer.position.y = 0.25;
      const inner = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.6, 16), jackInnerMat);
      inner.position.y = 0.25;
      jGroup.add(outer, inner);
      jGroup.position.set(x, MODULE_Y + 0.5, z);
      return jGroup;
    };

    // GND jacks
    group.add(createJack('ps_terminal_negative_left', MODULE_X - 5, -8));
    const gndRight = createJack('ps_terminal_negative', MODULE_X + 5, -8);
    group.add(gndRight);

    // VCC jacks
    group.add(createJack('ps_terminal_positive_left', MODULE_X - 5, 12));
    const vccRight = createJack('ps_terminal_positive', MODULE_X + 5, 12);
    group.add(vccRight);

    // Text Labels (only created in browser environment)
    if (typeof document !== 'undefined') {
      const createText = (text, x, z) => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#666666'; // Dimmed text color matching image
        ctx.font = 'bold 36px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 64, 32);

        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
        // Plane scaled to fit nicely (12 x 6 mm)
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(16, 8), mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(x, MODULE_Y + 0.6, z);
        return mesh;
      };

      group.add(createText('GND', MODULE_X, -16));
      group.add(createText('VCC', MODULE_X, 4));
    }

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
    add('Positive (VCC) terminal present', this._find(group, 'ps_terminal_positive') !== null);
    add('Negative (GND) terminal present', this._find(group, 'ps_terminal_negative') !== null);

    let nan = false;
    group.traverse((o) => {
      if (o.isMesh && o.geometry.getAttribute('position')) {
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
