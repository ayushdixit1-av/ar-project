/**
 * ICValidator.js
 *
 * Pure validation of a DIP-14 footprint against the current occupancy.
 * Every check is independent and the combined result carries the exact
 * reason strings shown to the user.
 */
import { BreadboardConfig } from './BreadboardConfig.js';
import { HoleGenerator } from './HoleGenerator.js';
import { IC } from './IC.js';

export class ICValidator {
  /**
   * @param {Array<{pin:number,row:string,column:number}>} pins
   * @param {Set<string>} occupiedIds occupied hole IDs (e.g. "A1")
   * @param {string} orientation IC.ORIENTATION.NORMAL | FLIPPED
   * @returns {{valid:boolean, issues:string[]}}
   */
  static validate(pins, occupiedIds, orientation) {
    const issues = [];

    if (!this.checkBoundary(pins)) {
      issues.push('IC exceeds breadboard boundary.');
    }
    if (!this.checkOverlap(pins, occupiedIds)) {
      issues.push('IC overlaps another component.');
    }
    if (!this.checkBreadboardSide(pins)) {
      issues.push('IC must straddle the center gap.');
    }
    if (!this.checkCenterGap(pins)) {
      issues.push('Incorrect center gap.');
    }
    if (!this.checkOrientation(pins, orientation)) {
      issues.push('Incorrect orientation.');
    }

    return { valid: issues.length === 0, issues };
  }

  static checkBoundary(pins) {
    const { columns } = BreadboardConfig.layout;
    return pins.every((p) => p.column >= 1 && p.column <= columns);
  }

  static checkOverlap(pins, occupiedIds) {
    return pins.every((p) => !occupiedIds.has(`${p.row}${p.column}`));
  }

  static checkBreadboardSide(pins) {
    const { rows, rowsPerBank } = BreadboardConfig.layout;
    const topBank = new Set(rows.slice(0, rowsPerBank));
    const banks = new Set();
    for (const p of pins) {
      banks.add(topBank.has(p.row) ? 'top' : 'bottom');
    }
    return banks.size === 2;
  }

  static checkCenterGap(pins) {
    const rowSet = new Set(pins.map((p) => p.row));
    if (rowSet.size !== 2) return false;
    const [a, b] = [...rowSet];
    const ya = HoleGenerator.positionOf(a, 1).y;
    const yb = HoleGenerator.positionOf(b, 1).y;
    return Math.abs(Math.abs(yb - ya) - BreadboardConfig.layout.centerGap) <= 1e-6;
  }

  static checkOrientation(pins, orientation) {
    const half = pins.length / 2;
    if (half < 2 || half !== Math.floor(half)) return false;

    const expectedRow = orientation === IC.ORIENTATION.NORMAL ? IC.ROW.E : IC.ROW.F;
    const row1 = pins.slice(0, half);
    const row2 = pins.slice(half);

    if (!row1.every((p) => p.row === expectedRow)) return false;
    if (!row2.every((p) => p.row !== expectedRow)) return false;
    if (row1[0].column !== row2[row2.length - 1].column) return false;      // pin 1 mirrors pin max
    if (row1[row1.length - 1].column !== row2[0].column) return false;      // mirrored pair across the gap
    return row1[0].column < row2[0].column;                                 // ascending columns
  }

  /**
   * Headless self-review: validates DIP-14 and DIP-16 placements against
   * every rule plus a few negative cases.
   */
  static checks() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    const part14 = '7400';
    const part16 = '74151';
    const pins14 = IC.footprintFor(part14, 'E', 10, IC.ORIENTATION.NORMAL);
    const pins16 = IC.footprintFor(part16, 'E', 10, IC.ORIENTATION.NORMAL);

    const valid14 = this.validate(pins14, new Set(), IC.ORIENTATION.NORMAL);
    add('DIP-14 valid placement accepted', valid14.valid, valid14.issues.join(' ') || 'ok');

    const valid16 = this.validate(pins16, new Set(), IC.ORIENTATION.NORMAL);
    add('DIP-16 valid placement accepted', valid16.valid, valid16.issues.join(' ') || 'ok');

    const occ = new Set(pins14.map((p) => `${p.row}${p.column}`));
    const overlap = this.validate(pins14, occ, IC.ORIENTATION.NORMAL);
    add('Overlap with occupied holes rejected', !overlap.valid && overlap.issues.some((i) => i.includes('overlap')));

    const out = IC.footprintFor(part14, 'E', 60, IC.ORIENTATION.NORMAL);
    const boundary = this.validate(out, new Set(), IC.ORIENTATION.NORMAL);
    add('Out-of-boundary footprint rejected', !boundary.valid && boundary.issues.some((i) => i.includes('boundary')));

    const pinsFlip = IC.footprintFor(part14, 'F', 10, IC.ORIENTATION.FLIPPED);
    const flipped = this.validate(pinsFlip, new Set(), IC.ORIENTATION.FLIPPED);
    add('FLIPPED DIP-14 accepted', flipped.valid);

    const topOnly = pins14.map((p) => ({ ...p, row: 'E' }));
    const side = this.validate(topOnly, new Set(), IC.ORIENTATION.NORMAL);
    add('IC must straddle both banks', !side.valid && side.issues.some((i) => i.includes('center gap')));

    return checks;
  }
}
