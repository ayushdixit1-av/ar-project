/**
 * Validator.js
 *
 * Verifies the generated hole field:
 *   - total hole count
 *   - hole spacing (column pitch)
 *   - row spacing (row pitch within a bank)
 *   - center gap (row E -> row F)
 *   - duplicate IDs
 *   - duplicate positions
 *   - invalid coordinates / out of board bounds
 *   - bounding box size
 *
 * If any check fails, `validateAndFix` automatically rebuilds the hole
 * field from the canonical math and re-validates before returning.
 */
import { BreadboardConfig } from './BreadboardConfig.js';
import { HoleGenerator } from './HoleGenerator.js';

export class Validator {
  static runChecks(holes) {
    const { rows, columns, rowsPerBank, rowPitch, columnPitch, centerGap } =
      BreadboardConfig.layout;
    const { length, width } = BreadboardConfig.board;
    const eps = BreadboardConfig.epsilon;

    const checks = [];
    const add = (name, pass, detail = '') => checks.push({ name, pass, detail });

    const total = rows.length * columns;
    add('Total hole count', holes.length === total, `${holes.length} / ${total}`);

    const dist = (a, b) =>
      Math.hypot(b.position.x - a.position.x, b.position.y - a.position.y);

    // Column pitch: consecutive columns within the same row.
    let colPitchOk = true;
    for (const row of rows) {
      const inRow = holes
        .filter((h) => h.row === row)
        .sort((a, b) => a.column - b.column);
      for (let i = 1; i < inRow.length; i++) {
        if (Math.abs(inRow[i].position.x - inRow[i - 1].position.x - columnPitch) > eps) {
          colPitchOk = false;
          break;
        }
      }
      if (!colPitchOk) break;
    }
    add('Hole spacing (column pitch 2.54)', colPitchOk);

    // Row pitch: consecutive rows inside the same bank.
    let rowPitchOk = true;
    const probeCol = holes.find((h) => h.column === 1);
    for (let bank = 0; bank < rows.length / rowsPerBank; bank++) {
      const bankRows = rows.slice(bank * rowsPerBank, (bank + 1) * rowsPerBank);
      for (let i = 1; i < bankRows.length; i++) {
        const a = holes.find((h) => h.row === bankRows[i - 1] && h.column === probeCol.column);
        const b = holes.find((h) => h.row === bankRows[i] && h.column === probeCol.column);
        if (a && b && Math.abs(b.position.y - a.position.y - rowPitch) > eps) {
          rowPitchOk = false;
          break;
        }
      }
      if (!rowPitchOk) break;
    }
    add('Row spacing within bank (2.54)', rowPitchOk);

    // Center gap between row E and row F.
    const e = holes.find((h) => h.row === 'E' && h.column === probeCol.column);
    const f = holes.find((h) => h.row === 'F' && h.column === probeCol.column);
    const gap = e && f ? dist(e, f) : NaN;
    add('Center gap E-F (7.62)', e && f && Math.abs(gap - centerGap) <= eps, gap ? `${gap.toFixed(3)} mm` : 'missing rows');

    // Duplicate IDs.
    const ids = holes.map((h) => h.id);
    add('No duplicate IDs', new Set(ids).size === ids.length);

    // Duplicate positions.
    const pos = holes.map((h) => `${h.position.x},${h.position.y},${h.position.z}`);
    add('No duplicate positions', new Set(pos).size === pos.length);

    // Invalid coordinates / board bounds.
    const halfLen = length / 2;
    const halfW = width / 2;
    let coordOk = holes.length === total;
    for (const h of holes) {
      const { x, y, z } = h.position;
      if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z) ||
          Math.abs(x) > halfLen || Math.abs(y) > halfW || z !== 0) {
        coordOk = false;
        break;
      }
    }
    add('Invalid coordinates / within board bounds', coordOk);

    // Bounding box size.
    const xs = holes.map((h) => h.position.x);
    const ys = holes.map((h) => h.position.y);
    const spanX = Math.max(...xs) - Math.min(...xs);
    const spanY = Math.max(...ys) - Math.min(...ys);
    const expSpanX = (columns - 1) * columnPitch;
    const expSpanY = (rows.length - 1) * rowPitch + (rows.length / rowsPerBank - 1) * (centerGap - rowPitch);
    const boxOk = Math.abs(spanX - expSpanX) <= eps && Math.abs(spanY - expSpanY) <= eps;
    add('Bounding box size', boxOk, `${spanX.toFixed(3)} x ${spanY.toFixed(3)} mm`);

    return checks;
  }

  /**
   * Rebuild every hole's id/row/column/position from the canonical math.
   * The Hole instances are preserved (occupied/component/voltage kept).
   */
  static fix(holes) {
    const { rows, columns } = BreadboardConfig.layout;
    const yPos = HoleGenerator.rowPositions();
    const xPos = HoleGenerator.columnPositions();
    const total = rows.length * columns;

    if (holes.length > total) {
      holes.length = total;
    }
    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < columns; c++) {
        const idx = r * columns + c;
        if (!holes[idx]) {
          holes[idx] = new Hole({});
        }
        holes[idx].id = HoleGenerator.id(rows[r], c + 1);
        holes[idx].row = rows[r];
        holes[idx].column = c + 1;
        holes[idx].position = { x: xPos[c], y: yPos[r], z: 0 };
      }
    }
    return holes;
  }

  static validate(holes) {
    const checks = this.runChecks(holes);
    return { pass: checks.every((c) => c.pass), checks };
  }

  /**
   * Validate, and if anything fails, auto-fix and re-validate.
   */
  static validateAndFix(holes) {
    let report = this.validate(holes);
    let fixed = false;
    if (!report.pass) {
      this.fix(holes);
      report = this.validate(holes);
      fixed = true;
    }
    return { ...report, fixed };
  }
}
