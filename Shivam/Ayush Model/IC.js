/**
 * IC.js
 *
 * Represents a placed DIP-14 IC and owns the single source of truth for
 * computing its 14-pin footprint from a starting hole.
 *
 * A DIP-14 straddles the breadboard center gap:
 *   - pins 1..7   -> 7 consecutive columns in one row (E or F)
 *   - pins 8..14  -> the mirrored 7 columns in the opposite row
 *   - NORMAL  orientation: pin 1 in row F (notch left, bottom bank)
 *   - FLIPPED orientation: pin 1 in row E (notch right, top bank)
 */
import { HoleGenerator } from './HoleGenerator.js';

export class IC {
  static get ROW() {
    return { E: 'E', F: 'F' };
  }

  static get ORIENTATION() {
    return { NORMAL: 'NORMAL', FLIPPED: 'FLIPPED' };
  }

  /**
   * Catalog of selectable TTL IC parts. `pins` drives the footprint size:
   * 14 -> DIP-14 (7 columns per bank), 16 -> DIP-16 (8 columns per bank).
   */
  static get CATALOG() {
    return {
      '7400': { pins: 14, label: 'Quad 2-Input NAND' },
      '7402': { pins: 14, label: 'Quad 2-Input NOR' },
      '7404': { pins: 14, label: 'Hex Inverter' },
      '7408': { pins: 14, label: 'Quad 2-Input AND' },
      '7432': { pins: 14, label: 'Quad 2-Input OR' },
      '7411': { pins: 14, label: 'Triple 3-Input AND' },
      '74151': { pins: 16, label: '8-to-1 Multiplexer' },
      '7486': { pins: 14, label: 'Quad 2-Input XOR' },
    };
  }

  /** Number of pins for a catalog part (DIP-14 fallback for unknown parts). */
  static pinCountFor(part) {
    const entry = IC.CATALOG[part];
    return entry ? entry.pins : 14;
  }

  /**
   * Compute the occupied holes for a DIP IC whose pin 1 sits at
   * `startRow` / `startColumn`. Returns pin descriptors:
   *   { pin, row, column }
   *
   * Any even pin count is supported - it always straddles the center gap:
   *   - pins 1..half      -> half consecutive columns in one row (E or F)
   *   - pins half+1..max  -> the mirrored columns in the opposite row
   */
  static dipFootprint(startRow, startColumn, orientation = IC.ORIENTATION.NORMAL, pinCount = 14) {
    const half = Math.floor(pinCount / 2);
    const pin1Row = orientation === IC.ORIENTATION.NORMAL ? IC.ROW.F : IC.ROW.E;
    const pin2Row = pin1Row === IC.ROW.E ? IC.ROW.F : IC.ROW.E;
    const pins = [];

    for (let i = 0; i < half; i++) {
      pins.push({ pin: i + 1, row: pin1Row, column: startColumn + i });
    }
    for (let i = 0; i < half; i++) {
      pins.push({ pin: half + 1 + i, row: pin2Row, column: startColumn + half - 1 - i });
    }
    return pins;
  }

  /**
   * Compute the footprint for a named catalog part (e.g. "7408" or "74151").
   */
  static footprintFor(part, startRow, startColumn, orientation = IC.ORIENTATION.NORMAL) {
    return this.dipFootprint(startRow, startColumn, orientation, this.pinCountFor(part));
  }

  /**
   * Compute the 14 occupied holes for a DIP-14 whose pin 1 sits at
   * `startRow` / `startColumn`. Returns pin descriptors:
   *   { pin, row, column }
   */
  static dip14Footprint(startRow, startColumn, orientation = IC.ORIENTATION.NORMAL) {
    return this.dipFootprint(startRow, startColumn, orientation, 14);
  }

  /**
   * Axis-aligned footprint bounds (mm, board-centered) used to position
   * both the preview and the placed-body mesh.
   */
  static bounds(pins) {
    const positions = pins.map((p) => HoleGenerator.positionOf(p.row, p.column));
    const xs = positions.map((p) => p.x);
    const ys = positions.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    return {
      minX,
      maxX,
      minY,
      maxY,
      width: maxX - minX,
      height: maxY - minY,
      centerX: (minX + maxX) / 2,
      centerY: (minY + maxY) / 2,
    };
  }

  constructor({ id, type, name, pins, position }) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.pins = pins;            // [{ pin, row, column }]
    this.position = position;    // { row, column, orientation } of pin 1
  }

  get footprint() {
    return this.pins.map(({ row, column }) => ({ row, column }));
  }

  /**
   * Headless self-review of the IC catalog and DIP footprints.
   */
  static validate() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    const parts = Object.keys(this.CATALOG);
    const expected = ['7400', '7402', '7404', '7408', '7432', '7411', '74151', '7486'];
    add(
      'Catalog has all 8 TTL parts',
      parts.length === expected.length && expected.every((p) => parts.includes(p)),
      parts.join(',')
    );

    const pinCounts = parts.map((p) => this.pinCountFor(p));
    add('Parts are DIP-14 or DIP-16', pinCounts.every((c) => c === 14 || c === 16), pinCounts.join(','));

    let allStraddle = true;
    let allMirrored = true;
    for (const part of parts) {
      const pins = this.footprintFor(part, 'F', 10, 'NORMAL');
      const half = pins.length / 2;
      if (pins.length !== this.pinCountFor(part)) allStraddle = false;
      if (!pins.slice(0, half).every((p) => p.row === 'F')) allStraddle = false;
      if (!pins.slice(half).every((p) => p.row === 'E')) allStraddle = false;
      if (pins[0].column !== pins[pins.length - 1].column) allMirrored = false;
      if (pins[half - 1].column !== pins[half].column) allMirrored = false;
      if (pins[0].column >= pins[half].column) allMirrored = false;
    }
    add('All footprints straddle the center gap', allStraddle);
    add('Pin pairs mirror across the gap', allMirrored);

    const p16 = this.footprintFor('74151', 'F', 10, 'NORMAL');
    add('74151 uses a DIP-16 footprint (16 pins)', p16.length === 16, `${p16.length} pins`);

    const flipped = this.footprintFor('7408', 'E', 20, 'FLIPPED');
    add(
      'FLIPPED orientation anchored in row E',
      flipped[0].row === 'E' && flipped[0].pin === 1,
      `pin 1 @ ${flipped[0].row}${flipped[0].column}`
    );

    add(
      'DIP-16 fits within 63 columns',
      this.footprintFor('74151', 'F', 56, 'NORMAL').every((p) => p.column <= 63)
    );
    add(
      'Out-of-range start column exceeds boundary',
      this.footprintFor('74151', 'F', 57, 'NORMAL').some((p) => p.column > 63)
    );

    return checks;
  }
}
