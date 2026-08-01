/**
 * LabelGenerator.js
 *
 * Realistic 830-point breadboard labels, purely additive (holes untouched):
 *   - Row labels  : A..J, placed beside their row
 *   - Column nums : every 5th column (5, 10 .. 60) in the center gap
 *   - Rail symbols: '+' / '-' for the top and bottom power rails
 *
 * Colors: positive = red, negative = blue, row labels = light,
 * numbers = light gray (chosen for visibility on the dark scene).
 *
 * Rendering: every label is drawn synchronously to a 2D canvas (native
 * browser text rasterizer) and applied as a CanvasTexture on a small plane.
 * Planes lie flat on the board surface (face upward, +Y), centered on their
 * anchor. This avoids any async/worker/WebGL-fallback failure modes and
 * guarantees visible text. The pure `labels()`/`validate()` math runs
 * headless; `build()` creates the live scene objects in the browser.
 */
import * as THREE from 'three';

import { BreadboardConfig } from './BreadboardConfig.js';
import { HoleGenerator } from './HoleGenerator.js';
import { PowerRailGenerator } from './PowerRailGenerator.js';

const COLORS = {
  positive: 0xff5555,   // red   - power rail '+'
  negative: 0x4a9eff,   // blue  - power rail '-'
  row: 0xf2f2f2,        // light - row letters (readable on the dark scene)
  number: 0xb8b8b8,     // light gray - column numbers
};

// Canvas text is resolution-independent; these constants control the source
// bitmap. The plane is then scaled so glyph height ~= `size` in mm.
const FONT_PX = 96;
const FONT_FAMILY = '"Segoe UI", Arial, sans-serif';
const PAD_RATIO = 0.6;      // horizontal canvas padding as fraction of font size
const HEIGHT_RATIO = 1.3;   // canvas height as fraction of font size

// Rotating -90deg about X lays a +Z-facing plane flat and faces it upward.
const FLAT_ROTATION = -Math.PI / 2;

// X position of the label column (left side of the board), in mm.
const LABEL_X = -80.5;

// Height of the label plane above the board (mm). Slightly above the hole
// sphere tops (y = 0.4) so labels are always visible and never occluded.
const LABEL_Y = 0.5;

// Readable-but-realistic breadboard label sizes (mm). Row letters and rail
// symbols must stay under the 2.54 mm row pitch so adjacent rows never crowd.
const SIZES = { row: 2.2, number: 2.0, railSymbol: 2.2 };

// Numbers sit in the center gap, nudged slightly toward the trench line.
const NUMBER_Y = 0.8;

function colorToCss(hex) {
  return `#${hex.toString(16).padStart(6, '0')}`;
}

export class LabelGenerator {
  /** A..J, each beside its row. */
  static rowLabels() {
    const { rows } = BreadboardConfig.layout;
    const yPos = HoleGenerator.rowPositions();
    return rows.map((row, i) => ({
      kind: 'row',
      text: row,
      x: LABEL_X,
      y: yPos[i],
      z: 0,
      color: COLORS.row,
      size: SIZES.row,
      weight: 'bold',
    }));
  }

  /** Every 5th column number, displayed in the center gap (y = 0). */
  static columnNumbers() {
    const { columns } = BreadboardConfig.layout;
    const xPos = HoleGenerator.columnPositions();
    const numbers = [];
    for (let c = 5; c <= columns; c += 5) {
      numbers.push(c);
    }
    return numbers.map((c) => ({
      kind: 'number',
      text: String(c),
      x: xPos[c - 1],
      y: NUMBER_Y,
      z: 0,
      color: COLORS.number,
      size: SIZES.number,
      weight: 'normal',
    }));
  }

  /** '+' / '-' symbols aligned with the four power rails. */
  static railSymbols() {
    const yPos = PowerRailGenerator.railYPositions();
    return [
      { kind: 'railSymbol', text: '+', x: LABEL_X, y: yPos.PT, z: 0, color: COLORS.positive, size: SIZES.railSymbol, weight: 'bold' },
      { kind: 'railSymbol', text: '-', x: LABEL_X, y: yPos.TN, z: 0, color: COLORS.negative, size: SIZES.railSymbol, weight: 'bold' },
      { kind: 'railSymbol', text: '+', x: LABEL_X, y: yPos.BP, z: 0, color: COLORS.positive, size: SIZES.railSymbol, weight: 'bold' },
      { kind: 'railSymbol', text: '-', x: LABEL_X, y: yPos.BN, z: 0, color: COLORS.negative, size: SIZES.railSymbol, weight: 'bold' },
    ];
  }

  /** Full label set (10 rows + 12 numbers + 4 symbols = 26). */
  static labels() {
    return [...this.rowLabels(), ...this.columnNumbers(), ...this.railSymbols()];
  }

  /**
   * Draw one label into a canvas and return a plane mesh carrying it as a
   * CanvasTexture. The plane is centered on the anchor, lies flat (XZ plane)
   * and faces upward (+Y). Fully synchronous - nothing async to fail.
   */
  static makeLabelMesh(label) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const weight = label.weight || 'bold';
    const font = `${weight} ${FONT_PX}px ${FONT_FAMILY}`;

    ctx.font = font;
    const textWidth = ctx.measureText(label.text).width;
    const canvasWidth = Math.ceil(textWidth + FONT_PX * PAD_RATIO * 2);
    const canvasHeight = Math.ceil(FONT_PX * HEIGHT_RATIO);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Setting canvas size resets the context state - re-apply font settings.
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = colorToCss(label.color);
    ctx.fillText(label.text, canvasWidth / 2, canvasHeight / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;

    // Scale so glyph height ~= label.size (mm): 1 mm per FONT_PX px.
    const scale = label.size / FONT_PX;
    const planeWidth = canvasWidth * scale;
    const planeHeight = canvasHeight * scale;

    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(label.x, LABEL_Y, label.y);
    mesh.rotation.x = FLAT_ROTATION;
    mesh.renderOrder = 10;
    mesh.name = `Label_${label.kind}_${label.text}`;
    return mesh;
  }

  /**
   * Build all label meshes and add them to the scene.
   */
  static build(scene) {
    const group = new THREE.Group();
    for (const label of this.labels()) {
      group.add(this.makeLabelMesh(label));
    }
    scene.add(group);
    return group;
  }

  /** Automatic verification of label placement and orientation. */
  static validate() {
    const eps = BreadboardConfig.epsilon;
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    const labels = this.labels();
    const { rows, columns } = BreadboardConfig.layout;
    const yPos = HoleGenerator.rowPositions();
    const xPos = HoleGenerator.columnPositions();

    add('Label count (10 rows + 12 numbers + 4 symbols)', labels.length === 26, `${labels.length} / 26`);

    let rowsOk = rows.length === 10;
    for (const [i, row] of rows.entries()) {
      const lbl = labels.find((l) => l.kind === 'row' && l.text === row);
      if (!lbl || Math.abs(lbl.y - yPos[i]) > eps) {
        rowsOk = false;
        break;
      }
    }
    add('Row labels align with rows', rowsOk);

    const expected = [];
    for (let c = 5; c <= columns; c += 5) expected.push(c);
    const numberLabels = labels.filter((l) => l.kind === 'number');
    let numOk = numberLabels.length === expected.length;
    for (const c of expected) {
      const lbl = numberLabels.find((l) => Number(l.text) === c);
      if (!lbl || Math.abs(lbl.x - xPos[c - 1]) > eps || Math.abs(lbl.y - NUMBER_Y) > eps) {
        numOk = false;
        break;
      }
    }
    add('Numbers align with columns', numOk);
    add('Every displayed number correctly positioned', numOk, numberLabels.map((l) => l.text).join(','));

    const railY = PowerRailGenerator.railYPositions();
    const railOk = [
      ['+', railY.PT],
      ['-', railY.TN],
      ['+', railY.BP],
      ['-', railY.BN],
    ].every(([text, y]) => {
      const lbl = labels.find((l) => l.kind === 'railSymbol' && l.text === text && Math.abs(l.y - y) <= eps);
      return !!lbl;
    });
    add('Power rail symbols align with rails', railOk);

    const anchors = labels.map((l) => `${l.x.toFixed(3)},${l.y.toFixed(3)}`);
    add('No overlapping text', new Set(anchors).size === anchors.length);

    // Row letters/rail symbols must stay within the 2.54 mm row pitch so
    // A-E and F-J never crowd one another (prompt: letters too close).
    const pitch = BreadboardConfig.layout.rowPitch;
    add(
      'Row letters fit within row pitch',
      labels.every((l) => l.size < pitch),
      `size <= ${pitch.toFixed(2)} mm`
    );

    // Real breadboards: row letters slightly larger & bold, numbers smaller.
    const rowSizes = labels.filter((l) => l.kind === 'row').map((l) => l.size);
    const numberSizes = labels.filter((l) => l.kind === 'number').map((l) => l.size);
    add(
      'Row letters larger than numbers',
      rowSizes.length > 0 && numberSizes.length > 0 && Math.min(...rowSizes) > Math.max(...numberSizes),
      `rows ${Math.min(...rowSizes).toFixed(2)} > numbers ${Math.max(...numberSizes).toFixed(2)} mm`
    );

    // Structural flatness check: the +Z text normal under FLAT_ROTATION must
    // map to the board up direction (+Y in three.js), i.e. labels lie flat.
    const normal = new THREE.Vector3(0, 0, 1).applyEuler(new THREE.Euler(FLAT_ROTATION, 0, 0));
    add(
      'Labels lie flat (face upward)',
      Math.abs(normal.x) <= eps && normal.y > 0 && Math.abs(normal.z) <= eps,
      `text normal -> (${normal.x.toFixed(3)}, ${normal.y.toFixed(3)}, ${normal.z.toFixed(3)})`
    );

    add('Labels readable from default camera', labels.every((l) => l.size >= 2));

    const halfLen = BreadboardConfig.board.length / 2;
    add('Labels within board bounds', labels.every((l) => Math.abs(l.x) <= halfLen + 4));

    return { pass: checks.every((c) => c.ok), checks };
  }
}
