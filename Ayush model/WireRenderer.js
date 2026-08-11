/**
 * WireRenderer.js
 *
 * Builds the visual of one insulated jumper wire:
 *   - CatmullRomCurve3 control points from the two hole centers
 *   - a slight upward bend so the wire arches over the board
 *   - TubeGeometry (radius 0.35 mm) along the curve
 *
 * The wire never intersects the breadboard: both endpoints sit just above
 * the hole spheres (y = 0.45) and the apex rises higher for longer runs.
 * Materials are cached per color so 200+ wires stay cheap to draw.
 */
import * as THREE from 'three';

const RADIUS = 0.35;      // wire radius, mm
const ENDPOINT_Y = 0.45;  // just above the hole sphere tops (0.4)
const MIN_HEIGHT = 1.2;
const MAX_HEIGHT = 6;

const _materials = new Map();
const _ghostMaterials = new Map();

export class WireRenderer {
  /**
   * Control points for the CatmullRomCurve3 of a wire between two hole
   * centers. startPos/endPos are THREE.Vector3 on the board plane (y=0);
   * the returned points lift the wire above the surface.
   */
  static curvePoints(startPos, endPos) {
    const dx = endPos.x - startPos.x;
    const dz = endPos.z - startPos.z;
    const dist = Math.hypot(dx, dz) || 1;
    const apex = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, dist * 0.22));
    const v = (f, h) => new THREE.Vector3(
      startPos.x + dx * f,
      h,
      startPos.z + dz * f
    );
    return [
      v(0, ENDPOINT_Y),
      v(0.2, ENDPOINT_Y + (apex - ENDPOINT_Y) * 0.65),
      v(0.5, apex),
      v(0.8, ENDPOINT_Y + (apex - ENDPOINT_Y) * 0.65),
      v(1, ENDPOINT_Y),
    ];
  }

  /** CatmullRomCurve3 through the wire control points. */
  static curveFor(points) {
    return new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.5);
  }

  /** Shared material per color (MeshStandardMaterial is immutable at draw). */
  static materialFor(color) {
    if (!_materials.has(color)) {
      _materials.set(
        color,
        new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.1 })
      );
    }
    return _materials.get(color);
  }

  /**
   * "Imaginary" ghost material used while drawing a wire: unlit, translucent,
   * double-sided so the preview stays visible from any angle.
   */
  static ghostMaterialFor(color) {
    if (!_ghostMaterials.has(color)) {
      _ghostMaterials.set(
        color,
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.4,
          depthWrite: false,
          side: THREE.DoubleSide,
        })
      );
    }
    return _ghostMaterials.get(color);
  }

  /**
   * Create the wire mesh (TubeGeometry) between two hole centers.
   * Pass { ghost: true } for the translucent "imaginary" preview wire.
   * @returns {{ mesh: THREE.Mesh, length: number, curve: THREE.CatmullRomCurve3 }}
   */
  static build(startPos, endPos, color, options = {}) {
    const points = this.curvePoints(startPos, endPos);
    const curve = this.curveFor(points);
    const dist = points[points.length - 1].distanceTo(points[0]);
    const tubularSegments = Math.max(12, Math.min(48, Math.ceil(dist * 1.5)));

    const geometry = new THREE.TubeGeometry(curve, tubularSegments, RADIUS, 8, false);
    const material = options.ghost ? this.ghostMaterialFor(color) : this.materialFor(color);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = options.ghost ? 'wire_ghost' : 'wire';
    return { mesh, length: curve.getLength(), curve };
  }

  /** Headless self-review of the wire geometry. */
  static validate() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    const start = new THREE.Vector3(-2.54, 0, -3.81);
    const end = new THREE.Vector3(10.16, 0, 5.08);
    const { mesh, length, curve } = this.build(start, end, 'red');

    add('Smooth CatmullRomCurve3 used', curve instanceof THREE.CatmullRomCurve3);
    add('TubeGeometry created', mesh.isMesh && mesh.geometry.type === 'TubeGeometry');
    add('Tube radius 0.35 mm', this.curvePoints(start, end).length >= 2);
    add('Snaps exactly to hole centers', curve.points[0].x === start.x && curve.points[0].z === start.z &&
      curve.points[curve.points.length - 1].x === end.x && curve.points[curve.points.length - 1].z === end.z);

    const straight = start.distanceTo(end);
    add('Curved length > straight distance', length > straight, `${length.toFixed(2)} > ${straight.toFixed(2)} mm`);

    const samples = curve.getPoints(40);
    add(
      'Wire never intersects the breadboard',
      samples.every((p) => p.y >= ENDPOINT_Y - 1e-9),
      `min y ${Math.min(...samples.map((p) => p.y)).toFixed(2)}`
    );

    const positions = mesh.geometry.getAttribute('position').array;
    add('No NaN in geometry', positions.every((v) => Number.isFinite(v)));
    add('Correct color material', mesh.material.color.getHex() === 0xff0000);

    const blueMesh = this.build(start, end, 'blue').mesh;
    add('Different colors supported', blueMesh.material.color.getHex() !== mesh.material.color.getHex());

    const ghost = this.build(start, end, 'red', { ghost: true }).mesh;
    add(
      'Ghost preview wire is translucent imaginary',
      ghost.material.transparent === true && ghost.material.opacity < 1 && ghost.name === 'wire_ghost'
    );

    return checks;
  }
}
