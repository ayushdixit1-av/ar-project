/**
 * LEDRenderer.js
 *
 * Builds the visual of one 5mm through-hole LED:
 *   - epoxy body (cylinder + dome + bottom lip) centered between the two pins
 *   - a colored glow "die" inside the body
 *   - two straight metal leads dropping into the anode/cathode holes
 *   - a color band on the anode lead (long lead) and a flat mark on the
 *     cathode side of the body (short lead / cathode marking)
 *
 * Pass { ghost: true } for the translucent "imaginary" preview LED. Materials
 * are cached per color so dozens of LEDs stay cheap to draw.
 */
import * as THREE from 'three';

const LEAD_RADIUS = 0.3;    // lead thickness, mm
const LEAD_BOTTOM = 0.45;   // lead tips sit just above the hole spheres (0.4)
const BODY_RADIUS = 2.4;    // 5mm class LED body
const BODY_CENTER_Y = 5;    // how high the body floats above the board

const LED_COLORS = {
  red: 0xff3b30,
  yellow: 0xffd60a,
  green: 0x34c759,
  blue: 0x2979ff,
  white: 0xffffff,
};

const _bodyMaterials = new Map();
const _glowMaterials = new Map();
const _bandMaterials = new Map();
const _ghostMaterials = new Map();
let _leadMaterial = null;
let _flatMaterial = null;

export class LEDRenderer {
  /** Hex for a color name (falls back to red). */
  static colorHex(color) {
    return LED_COLORS[color] !== undefined ? LED_COLORS[color] : LED_COLORS.red;
  }

  /** Translucent epoxy body, tinted with the LED color. */
  static bodyMaterialFor(color) {
    if (!_bodyMaterials.has(color)) {
      _bodyMaterials.set(
        color,
        new THREE.MeshPhysicalMaterial({
          color: this.colorHex(color),
          transparent: true,
          opacity: 0.85,
          roughness: 0.12,
          metalness: 0,
          clearcoat: 0.8,
          clearcoatRoughness: 0.3,
        })
      );
    }
    return _bodyMaterials.get(color);
  }

  /** Small emissive die inside the body. */
  static glowMaterialFor(color) {
    if (!_glowMaterials.has(color)) {
      const hex = this.colorHex(color);
      _glowMaterials.set(
        color,
        new THREE.MeshStandardMaterial({
          color: hex,
          emissive: hex,
          emissiveIntensity: 0.9,
          roughness: 0.4,
        })
      );
    }
    return _glowMaterials.get(color);
  }

  /** Shared silver lead material. */
  static leadMaterial() {
    if (!_leadMaterial) {
      _leadMaterial = new THREE.MeshStandardMaterial({
        color: 0xc9ced6,
        metalness: 0.85,
        roughness: 0.35,
      });
    }
    return _leadMaterial;
  }

  /** Color band wrapped around the anode lead. */
  static bandMaterialFor(color) {
    if (!_bandMaterials.has(color)) {
      const hex = this.colorHex(color);
      _bandMaterials.set(
        color,
        new THREE.MeshStandardMaterial({
          color: hex,
          emissive: hex,
          emissiveIntensity: 0.35,
          roughness: 0.4,
        })
      );
    }
    return _bandMaterials.get(color);
  }

  /** Small dark flat mark on the cathode side of the body. */
  static flatMaterial() {
    if (!_flatMaterial) {
      _flatMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.6,
        metalness: 0.2,
      });
    }
    return _flatMaterial;
  }

  /** Translucent "imaginary" ghost material used for the preview LED. */
  static ghostMaterialFor(color) {
    if (!_ghostMaterials.has(color)) {
      _ghostMaterials.set(
        color,
        new THREE.MeshBasicMaterial({
          color: this.colorHex(color),
          transparent: true,
          opacity: 0.4,
          depthWrite: false,
          side: THREE.DoubleSide,
        })
      );
    }
    return _ghostMaterials.get(color);
  }

  /** One straight metal lead from a hole up into the body bottom. */
  static _lead(holePos, topY, name, material) {
    const height = topY - LEAD_BOTTOM;
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(LEAD_RADIUS, LEAD_RADIUS, height, 8),
      material
    );
    mesh.name = name;
    mesh.position.set(holePos.x, LEAD_BOTTOM + height / 2, holePos.z);
    return mesh;
  }

  /**
   * Build a 5mm LED group. Pass { ghost: true } for the translucent preview.
   * @returns {{ group: THREE.Group, mid: THREE.Vector3 }}
   */
  static build(anodePos, cathodePos, color, options = {}) {
    const ghost = options.ghost === true;
    const group = new THREE.Group();
    group.name = ghost ? 'led_ghost' : 'led';

    const mid = new THREE.Vector3(
      (anodePos.x + cathodePos.x) / 2,
      0,
      (anodePos.z + cathodePos.z) / 2
    );

    const bodyMat = ghost ? this.ghostMaterialFor(color) : this.bodyMaterialFor(color);

    // Epoxy body: bottom lip + cylinder + domed top.
    const lip = new THREE.Mesh(new THREE.CylinderGeometry(BODY_RADIUS + 0.15, BODY_RADIUS + 0.15, 0.3, 24), bodyMat);
    lip.name = 'led_lip';
    lip.position.set(mid.x, BODY_CENTER_Y - 0.7, mid.z);

    const body = new THREE.Mesh(new THREE.CylinderGeometry(BODY_RADIUS, BODY_RADIUS, 1.4, 24), bodyMat);
    body.name = 'led_body';
    body.position.set(mid.x, BODY_CENTER_Y, mid.z);

    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(BODY_RADIUS, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      bodyMat
    );
    dome.name = 'led_dome';
    dome.position.set(mid.x, BODY_CENTER_Y + 0.7, mid.z);

    // Glow die inside the body.
    const glowMat = ghost ? this.ghostMaterialFor(color) : this.glowMaterialFor(color);
    const glow = new THREE.Mesh(new THREE.SphereGeometry(1.1, 16, 12), glowMat);
    glow.name = 'led_glow';
    glow.position.set(mid.x, BODY_CENTER_Y + 0.1, mid.z);

    // Metal leads into the anode (long) and cathode (short) holes.
    const leadMat = ghost ? this.ghostMaterialFor(color) : this.leadMaterial();
    const anodeLead = this._lead(anodePos, BODY_CENTER_Y - 0.85, 'led_lead_anode', leadMat);
    const cathodeLead = this._lead(cathodePos, BODY_CENTER_Y - 1.7, 'led_lead_cathode', leadMat);

    // Color band around the anode lead.
    const bandMat = ghost ? this.ghostMaterialFor(color) : this.bandMaterialFor(color);
    const band = new THREE.Mesh(new THREE.TorusGeometry(LEAD_RADIUS + 0.22, 0.12, 8, 16), bandMat);
    band.name = 'led_band_anode';
    band.rotation.x = Math.PI / 2;
    band.position.set(anodePos.x, 2.6, anodePos.z);

    // Flat mark on the body rim pointing at the cathode side.
    const flatMat = ghost ? this.ghostMaterialFor(color) : this.flatMaterial();
    const dir = new THREE.Vector3(cathodePos.x - anodePos.x, 0, cathodePos.z - anodePos.z);
    const flatDir = dir.lengthSq() > 0 ? dir.normalize() : new THREE.Vector3(1, 0, 0);
    const flat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.4), flatMat);
    flat.name = 'led_flat_cathode';
    flat.position.set(
      mid.x + flatDir.x * (BODY_RADIUS + 0.15),
      BODY_CENTER_Y - 0.55,
      mid.z + flatDir.z * (BODY_RADIUS + 0.15)
    );
    flat.rotation.y = Math.atan2(flatDir.x, flatDir.z);

    group.add(lip, body, dome, glow, anodeLead, cathodeLead, band, flat);
    group.userData.anode = anodePos;
    group.userData.cathode = cathodePos;
    return { group, mid };
  }

  /** Dispose all per-instance geometries inside a built LED group. */
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
   * Turn a placed LED's glow die on/off for simulation. Each LED gets its own
   * cloned glow material so LEDs of the same color can differ.
   */
  static setGlow(group, on, color = 'red') {
    if (!group) return;
    const glow = this._find(group, 'led_glow');
    if (!glow) return;
    let mat = group.userData._glowMat;
    if (!mat) {
      mat = this.glowMaterialFor(color).clone();
      mat.color.set(this.colorHex(color));
      mat.emissive.set(this.colorHex(color));
      group.userData._glowMat = mat;
      glow.material = mat;
    }
    mat.emissiveIntensity = on ? 2.2 : 0;
  }

  /** Headless self-review of the LED geometry. */
  static validate() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    const anode = new THREE.Vector3(-1.27, 0, -3.81);
    const cathode = new THREE.Vector3(1.27, 0, -3.81);
    const { group, mid } = this.build(anode, cathode, 'red');

    add('Group named led', group.name === 'led');
    add('LED body mesh present', this._find(group, 'led_body') !== null);
    add('Domed top present', this._find(group, 'led_dome') !== null);
    add('Anode + cathode leads present',
      this._find(group, 'led_lead_anode') !== null && this._find(group, 'led_lead_cathode') !== null);

    const anodeLead = this._find(group, 'led_lead_anode');
    const cathodeLead = this._find(group, 'led_lead_cathode');
    add('Anode lead longer than cathode',
      anodeLead.geometry.parameters.height > cathodeLead.geometry.parameters.height,
      `${anodeLead.geometry.parameters.height.toFixed(2)} > ${cathodeLead.geometry.parameters.height.toFixed(2)}`);

    add('Leads snap to hole centers',
      anodeLead.position.x === anode.x && anodeLead.position.z === anode.z &&
      cathodeLead.position.x === cathode.x && cathodeLead.position.z === cathode.z);

    add('Body centered between pins',
      mid.x === (anode.x + cathode.x) / 2 && mid.z === (anode.z + cathode.z) / 2);

    add('Body tint matches LED color', this._find(group, 'led_body').material.color.getHex() === 0xff3b30);
    add('Glow die present', this._find(group, 'led_glow') !== null);
    add('Anode color band present', this._find(group, 'led_band_anode') !== null);
    add('Cathode flat mark present', this._find(group, 'led_flat_cathode') !== null);

    let nan = false;
    group.traverse((o) => {
      if (o.isMesh) {
        const p = o.geometry.getAttribute('position').array;
        if (p.some((v) => !Number.isFinite(v))) nan = true;
      }
    });
    add('No NaN in geometry', !nan);

    const blue = this.build(anode, cathode, 'blue').group;
    add('Different colors supported',
      this._find(blue, 'led_body').material.color.getHex() !== this._find(group, 'led_body').material.color.getHex());

    const ghost = this.build(anode, cathode, 'green', { ghost: true }).group;
    const ghostBody = this._find(ghost, 'led_body');
    add(
      'Ghost LED is translucent imaginary',
      ghost.name === 'led_ghost' && ghostBody.material.transparent === true && ghostBody.material.opacity < 1
    );

    this.setGlow(group, false, 'red');
    const glowOff = this._find(group, 'led_glow');
    add('setGlow can extinguish the die', glowOff.material.emissiveIntensity === 0);
    this.setGlow(group, true, 'red');
    add('setGlow can light the die', glowOff.material.emissiveIntensity > 0);

    return checks;
  }
}
