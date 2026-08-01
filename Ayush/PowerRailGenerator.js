/**
 * PowerRailGenerator.js
 *
 * Generates ONLY the four power rail hole rows of an 830-point breadboard:
 *   PT (top positive), TN (top negative), BP (bottom positive), BN (bottom negative).
 *
 * Each rail holds 63 holes on the standard 2.54 mm pitch, aligned with the
 * terminal strip columns (parallel), and separated from the terminal strips
 * by `gapFromTerminalStrip` (7.62 mm). Reuses the existing Hole class and
 * the terminal grid's column math; does NOT touch the terminal holes.
 */
import { BreadboardConfig } from './BreadboardConfig.js';
import { Hole } from './Hole.js';
import { HoleGenerator } from './HoleGenerator.js';

export class PowerRailGenerator {
  /**
   * Y position (mm) of every rail, derived from the terminal strip rows:
   *   TN = rowA - gap, PT = TN - rowPitch (top pair)
   *   BP = rowJ + gap, BN = BP + rowPitch (bottom pair)
   */
  static railYPositions() {
    const { rowPitch } = BreadboardConfig.layout;
    const { gapFromTerminalStrip } = BreadboardConfig.powerRail;
    const terminalY = HoleGenerator.rowPositions();
    const rowA = terminalY[0];
    const rowJ = terminalY[terminalY.length - 1];
    return {
      PT: rowA - gapFromTerminalStrip - rowPitch,
      TN: rowA - gapFromTerminalStrip,
      BP: rowJ + gapFromTerminalStrip,
      BN: rowJ + gapFromTerminalStrip + rowPitch,
    };
  }

  /**
   * Generate all 252 power rail holes (4 rails x 63 columns) using loops.
   */
  static generate() {
    const { rails, holesPerRail } = BreadboardConfig.powerRail;
    const xPos = HoleGenerator.columnPositions();
    const yPos = this.railYPositions();

    const holes = [];
    for (const rail of rails) {
      for (let c = 1; c <= holesPerRail; c++) {
        holes.push(
          new Hole({
            id: `${rail}${c}`,
            row: rail,
            column: c,
            position: { x: xPos[c - 1], y: yPos[rail], z: 0 },
          })
        );
      }
    }
    return holes;
  }

  /**
   * Automatic verification of the generated power rails.
   */
  static validate(holes) {
    const eps = BreadboardConfig.epsilon;
    const { rails, holesPerRail, gapFromTerminalStrip } = BreadboardConfig.powerRail;
    const { rowPitch } = BreadboardConfig.layout;
    const total = rails.length * holesPerRail;
    const yPos = this.railYPositions();
    const xPos = HoleGenerator.columnPositions();
    const terminalY = HoleGenerator.rowPositions();
    const rowA = terminalY[0];
    const rowJ = terminalY[terminalY.length - 1];
    const halfWidth = BreadboardConfig.board.width / 2;

    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    const railHoles = (rail) =>
      holes.filter((h) => h.row === rail).sort((a, b) => a.column - b.column);

    add('Exactly 252 new holes', holes.length === total, `${holes.length} / ${total}`);

    let spacingOk = true;
    for (const rail of rails) {
      const inRail = railHoles(rail);
      for (let i = 1; i < inRail.length; i++) {
        if (Math.abs(inRail[i].position.x - inRail[i - 1].position.x - 2.54) > eps) {
          spacingOk = false;
          break;
        }
      }
    }
    add('Hole spacing exactly 2.54 mm', spacingOk);

    const ids = holes.map((h) => h.id);
    add('Hole IDs unique', new Set(ids).size === ids.length);

    const positions = holes.map((h) => `${h.position.x},${h.position.y},${h.position.z}`);
    add('No overlapping holes', new Set(positions).size === positions.length);

    const parallel = (rail) => {
      const inRail = railHoles(rail);
      if (inRail.length !== holesPerRail) return false;
      const ys = inRail.map((h) => h.position.y);
      const xs = inRail.map((h) => h.position.x);
      const xAligned =
        Math.abs(Math.min(...xs) - xPos[0]) <= eps &&
        Math.abs(Math.max(...xs) - xPos[xPos.length - 1]) <= eps;
      return Math.max(...ys) - Math.min(...ys) <= eps && xAligned;
    };

    add('Top rails parallel to terminal strips', ['PT', 'TN'].every(parallel));
    add('Bottom rails parallel to terminal strips', ['BP', 'BN'].every(parallel));

    const distanceOk = ['PT', 'TN', 'BP', 'BN'].every((rail) => {
      const inRail = railHoles(rail);
      return inRail.every((h) => Math.abs(h.position.y - yPos[rail]) <= eps);
    });
    add(
      'Correct distance from terminal strips',
      distanceOk,
      `TN->A ${Math.abs(yPos.TN - rowA).toFixed(2)} | PT->TN ${Math.abs(yPos.PT - yPos.TN).toFixed(2)} | BP->J ${Math.abs(yPos.BP - rowJ).toFixed(2)} | BN->BP ${Math.abs(yPos.BN - yPos.BP).toFixed(2)} mm`
    );

    add('Rails within board width', holes.every((h) => Math.abs(h.position.y) <= halfWidth));

    return checks;
  }

  /**
   * Generate, verify, and if anything fails regenerate from the canonical
   * math and re-verify before returning.
   */
  static validateAndFix() {
    let holes = this.generate();
    let checks = this.validate(holes);
    let fixed = false;
    if (!checks.every((c) => c.ok)) {
      holes = this.generate();
      checks = this.validate(holes);
      fixed = true;
    }
    return { holes, pass: checks.every((c) => c.ok), checks, fixed };
  }
}
