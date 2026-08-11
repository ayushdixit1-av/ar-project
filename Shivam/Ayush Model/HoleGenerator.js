/**
 * HoleGenerator.js
 *
 * Generates every hole purely mathematically using loops.
 * No hardcoded positions. Board-centred coordinate system:
 *   - X : along the board length  (columns 1..63)
 *   - Y : along the board width   (rows A..J)
 *   - Z : hole plane (0)
 */
import { BreadboardConfig } from './BreadboardConfig.js';
import { Hole } from './Hole.js';

export class HoleGenerator {
  /**
   * Row Y positions (mm), centered on the board width.
   * Two banks of 5 rows, separated by the 7.62 mm center gap.
   */
  static rowPositions() {
    const { rows, rowsPerBank, centerGap, rowPitch } = BreadboardConfig.layout;
    const raw = rows.map((_, r) =>
      r * rowPitch + (r >= rowsPerBank ? centerGap - rowPitch : 0)
    );
    const shift = (raw[raw.length - 1] - raw[0]) / 2;
    return raw.map((y) => y - shift);
  }

  /**
   * Column X positions (mm), centered on the board length.
   */
  static columnPositions() {
    const { columns, columnPitch } = BreadboardConfig.layout;
    const span = (columns - 1) * columnPitch;
    const shift = span / 2;
    return Array.from({ length: columns }, (_, c) => c * columnPitch - shift);
  }

  static id(row, column) {
    return `${row}${column}`;
  }

  /**
   * World-space position (mm) of a single hole by row/column name.
   * Out-of-range values are clamped to the valid grid so downstream
   * geometry never produces NaN (validation still sees the real values).
   */
  static positionOf(row, column) {
    const { rows, columns } = BreadboardConfig.layout;
    const r = Math.min(Math.max(rows.indexOf(row), 0), rows.length - 1);
    const c = Math.min(Math.max(column, 1), columns);
    const yPos = this.rowPositions();
    const xPos = this.columnPositions();
    return { x: xPos[c - 1], y: yPos[r], z: 0 };
  }

  /**
   * Generate the full Hole[] field (10 rows x 63 columns = 630 holes).
   */
  static generate() {
    const { rows, columns } = BreadboardConfig.layout;
    const yPos = this.rowPositions();
    const xPos = this.columnPositions();

    const holes = [];
    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < columns; c++) {
        const column = c + 1;
        holes.push(
          new Hole({
            id: this.id(rows[r], column),
            row: rows[r],
            column,
            position: { x: xPos[c], y: yPos[r], z: 0 },
          })
        );
      }
    }
    return holes;
  }
}
