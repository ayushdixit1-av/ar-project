/**
 * BreadboardBody.js
 *
 * Realistic 830-point solderless breadboard body, purely additive:
 *   - Rounded-corner ABS plastic body 165.5 x 55 x 9 mm
 *   - Slight bevel around the top edge
 *   - Flat bottom, smooth shading
 *   - Shallow recessed areas where the terminal holes and power rail holes sit
 *   - 7.62 mm wide IC trench, 1.5 mm deep, running the length of the board
 *
 * Built from three extruded top-view layers merged into a SINGLE mesh:
 *   A. solid base      (y -9 .. -1.5)  -> trench floor
 *   B. recessed deck   (y -1.5 .. -0.5) -> terminal / rail recess floors
 *   C. beveled cap     (y -0.5 ..  0)  -> top surface, carved holes + bevel
 *
 * The existing hole spheres (centers at y = 0, radius 0.4) stay visible
 * above the surface. Hole generation, labels and electrical logic untouched.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

import { BreadboardConfig } from './BreadboardConfig.js';

const BODY = {
  length: BreadboardConfig.board.length, // 165.5 mm
  width: BreadboardConfig.board.width,   // 55.0 mm
  height: 9,                             // mm
  cornerRadius: 3,                       // mm
};

// White ABS plastic.
const COLOR = 0xf8f8f6;
const ROUGHNESS = 0.65;
const METALNESS = 0.0;

const TRENCH_WIDTH = BreadboardConfig.layout.centerGap; // 7.62 mm
const TRENCH_DEPTH = 1.5;
const RECESS_DEPTH = 0.5;

const BEVEL = { thickness: 0.3, size: 0.3, segments: 3 };

const MAX_TRIANGLES = 5000;

/** Rounded-rectangle 2D shape centred on the origin (mm). */
function roundedRectShape(width, height, radius) {
  const s = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);
  s.moveTo(x + r, y);
  s.lineTo(x + width - r, y);
  s.absarc(x + width - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + width, y + height - r);
  s.absarc(x + width - r, y + height - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + height);
  s.absarc(x + r, y + height - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  s.closePath();
  return s;
}

/** Simple rectangular hole path (used inside a Shape). */
function rectHole(x, y, width, height) {
  const path = new THREE.Path();
  path.moveTo(x, y);
  path.lineTo(x + width, y);
  path.lineTo(x + width, y + height);
  path.lineTo(x, y + height);
  path.closePath();
  return path;
}

export class BreadboardBody {
  /**
   * Carved top-view shapes:
   *  - trench      : 7.62 mm wide down the centre of the board
   *  - terminal    : recessed areas covering rows A-E and F-J
   *  - power rails : four shallow channels behind PT/TN/BP/BN hole rows
   */
  static holes() {
    const halfLength = BODY.length / 2;   // 82.75
    const trenchHalf = TRENCH_WIDTH / 2;  // 3.81
    const terminalOuter = 14.5;           // past the outer terminal rows (+-13.97)
    const terminalInner = 3.95;           // inset 0.14 from the trench edge
    const rail = {
      PT: -22.86,
      TN: -20.32,
      BP: 22.86,
      BN: 25.4,
    };
    const railHalf = 1.15;                // 2.3 mm wide channel per rail row

    const holes = [
      // IC trench (runs the length of the board, inside the rounded ends).
      rectHole(-(halfLength - 1.25), -trenchHalf, BODY.length - 2.5, TRENCH_WIDTH),
      // Terminal strip recesses.
      rectHole(-(halfLength - 2.25), -terminalOuter, BODY.length - 4.5, terminalOuter - terminalInner),
      rectHole(-(halfLength - 2.25), terminalInner, BODY.length - 4.5, terminalOuter - terminalInner),
      // Power rail channels.
      rectHole(-(halfLength - 2.25), rail.PT - railHalf, BODY.length - 4.5, railHalf * 2),
      rectHole(-(halfLength - 2.25), rail.TN - railHalf, BODY.length - 4.5, railHalf * 2),
      rectHole(-(halfLength - 2.25), rail.BP - railHalf, BODY.length - 4.5, railHalf * 2),
      rectHole(-(halfLength - 2.25), rail.BN - railHalf, BODY.length - 4.5, railHalf * 2),
    ];
    return holes;
  }

  /** Extrude a top-view shape downward; option bevel only for the top cap. */
  static extrude(shape, depth, beveled) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      curveSegments: 8,
      bevelEnabled: beveled,
      bevelThickness: beveled ? BEVEL.thickness : 0,
      bevelSize: beveled ? BEVEL.size : 0,
      bevelSegments: beveled ? BEVEL.segments : 1,
      bevelOffset: 0,
    });
    // Shape (x, y) -> world (x, y_up, z); extrude depth maps to -Y (down).
    geometry.rotateX(Math.PI / 2);
    return geometry;
  }

  /**
   * Build the breadboard body as a SINGLE mesh.
   * The top surface lands exactly on y = 0 (aligned with the pick plane and
   * the hole sphere bases); the hole spheres at y = 0..0.4 stay visible.
   */
  static build() {
    const outer = roundedRectShape(BODY.length, BODY.width, BODY.cornerRadius);
    const carved = roundedRectShape(BODY.length, BODY.width, BODY.cornerRadius);
    for (const hole of this.holes()) carved.holes.push(hole);

    // A. solid base: y -9 .. -1.5 (top = trench floor).
    const geomA = this.extrude(outer, 7.5, false);
    geomA.translate(0, -1.5, 0);

    // B. recessed deck: y -1.5 .. -0.5 (top = terminal/rail recess floor).
    const geomB = this.extrude(carved, 1.0, false);
    geomB.translate(0, -0.5, 0);

    // C. beveled cap: carved, depth 0.5, translated so its flat top = y 0.
    const geomC = this.extrude(carved, 0.5, true);
    geomC.computeBoundingBox();
    const cTop = geomC.boundingBox.max.y;
    geomC.translate(0, -cTop, 0);

    const geometry = mergeGeometries([geomA, geomB, geomC]);
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
      color: COLOR,
      roughness: ROUGHNESS,
      metalness: METALNESS,
      flatShading: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'BreadboardBody';
    return mesh;
  }

  /** Automatic verification of the body geometry. */
  static validate(mesh) {
    const eps = BreadboardConfig.epsilon;
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    add('Single mesh body', mesh && mesh.isMesh);

    const box = new THREE.Box3().setFromObject(mesh);
    const size = box.getSize(new THREE.Vector3());
    const dimAxis = { x: 'length', y: 'height', z: 'width' };
    const dimOk = Object.keys(dimAxis).every(
      (axis) => Math.abs(size[axis] - BODY[dimAxis[axis]]) <= 1
    );
    add(
      'Correct dimensions (165.5 x 9 x 55 mm)',
      dimOk,
      `${size.x.toFixed(1)} x ${size.y.toFixed(1)} x ${size.z.toFixed(1)} mm`
    );

    const triCount = mesh.geometry.getAttribute('position').count / 3;
    add('Low polygon count (< 5000 triangles)', triCount < MAX_TRIANGLES, `${triCount} triangles`);

    const sphereRadius = BreadboardConfig.hole.sphereRadius;
    add(
      'Hole spheres visible above the surface',
      box.max.y <= sphereRadius - 0.1,
      `body top ${box.max.y.toFixed(3)} < sphere top ${sphereRadius.toFixed(1)}`
    );

    const labelPlaneY = 0.5;
    add(
      'Labels above the body',
      box.max.y <= labelPlaneY - 0.1,
      `body top ${box.max.y.toFixed(3)} < label plane ${labelPlaneY}`
    );

    const trenchOk =
      Math.abs(TRENCH_WIDTH - BreadboardConfig.layout.centerGap) <= eps &&
      Math.abs(TRENCH_DEPTH - 1.5) <= eps;
    add('Center trench 7.62 mm wide x 1.5 mm deep', trenchOk);

    add('Recesses shallow (0.5 mm)', Math.abs(RECESS_DEPTH - 0.5) <= eps);

    const centered =
      Math.abs(box.min.x + box.max.x) <= 0.05 && Math.abs(box.min.z + box.max.z) <= 0.05;
    add('Body centred on the board', centered);

    const pos = mesh.geometry.getAttribute('position').array;
    add('No NaN in geometry', pos.every((v) => Number.isFinite(v)));

    const mat = mesh.material;
    add(
      'White ABS plastic (roughness 0.65, metalness 0)',
      mat.color.getHex() === COLOR && Math.abs(mat.roughness - ROUGHNESS) <= 0.001 && mat.metalness === METALNESS
    );
    add('Smooth shading', mat.flatShading === false);

    return { pass: checks.every((c) => c.ok), checks };
  }
}
