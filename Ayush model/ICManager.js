/**
 * ICManager.js
 *
 * Stores every placed IC, derives the set of occupied hole IDs, and is the
 * only module that performs placement (marks holes as occupied).
 */
import { IC } from './IC.js';

export class ICManager {
  constructor() {
    this.ics = [];
    this.nextId = 1;
    this._holesById = new Map();
  }

  occupiedIds() {
    const ids = new Set();
    for (const ic of this.ics) {
      for (const pin of ic.pins) {
        ids.add(`${pin.row}${pin.column}`);
      }
    }
    return ids;
  }

  /**
   * Place an IC (from the catalog) anchored at (startRow, startColumn).
   * Marks the target holes occupied and stores the IC.
   */
  place({ holes, startRow, startColumn, orientation, part = '7400' }) {
    const id = `IC${this.nextId}`;
    const pins = IC.footprintFor(part, startRow, startColumn, orientation);
    const ic = new IC({
      id,
      type: pins.length === 16 ? 'DIP16' : 'DIP14',
      name: part,
      pins,
      position: { row: startRow, column: startColumn, orientation },
    });

    const holeById = new Map(holes.map((h) => [h.id, h]));
    for (const pin of pins) {
      const hole = holeById.get(`${pin.row}${pin.column}`);
      hole.occupy(ic);
    }
    this._holesById = holeById;

    this.nextId += 1;
    this.ics.push(ic);
    return ic;
  }

  /** The most recently placed IC (for "undo last step"), or null. */
  last() {
    return this.ics.length ? this.ics[this.ics.length - 1] : null;
  }

  /**
   * Remove an IC and release every hole it occupied.
   * Returns true if it existed.
   */
  remove(id) {
    const index = this.ics.findIndex((ic) => ic.id === id);
    if (index === -1) return false;
    const [ic] = this.ics.splice(index, 1);
    for (const pin of ic.pins) {
      const hole = this._holesById.get(`${pin.row}${pin.column}`);
      if (hole) hole.release();
    }
    return true;
  }

  /** Remove every placed IC. Returns how many were removed. */
  clear() {
    const total = this.ics.length;
    for (const ic of [...this.ics]) this.remove(ic.id);
    return total;
  }

  /**
   * Headless self-review of the manager lifecycle (place / undo / clear).
   */
  static validate() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    const manager = new ICManager();
    const pins = IC.footprintFor('7400', 'E', 10, 'NORMAL');
    const pins16 = IC.footprintFor('74151', 'E', 30, 'NORMAL');
    const holes = [];
    const holeById = new Map();
    for (const p of [...pins, ...pins16]) {
      if (holeById.has(`${p.row}${p.column}`)) continue;
      const hole = {
        id: `${p.row}${p.column}`,
        occupied: false,
        component: null,
        occupy(c) {
          if (this.occupied) throw new Error(`Hole ${this.id} is already occupied`);
          this.occupied = true;
          this.component = c;
          return this;
        },
        release() {
          this.occupied = false;
          this.component = null;
          return this;
        },
      };
      holes.push(hole);
      holeById.set(hole.id, hole);
    }

    const ic = manager.place({ holes, startRow: 'E', startColumn: 10, orientation: 'NORMAL', part: '7400' });
    add('IC placed with catalog name', ic.name === '7400' && manager.ics.length === 1, ic.name);
    add('IC occupies its holes', pins.every((p) => holeById.get(`${p.row}${p.column}`).occupied));
    add('Last IC tracked (undo)', manager.last() === ic);

    manager.place({ holes, startRow: 'E', startColumn: 30, orientation: 'NORMAL', part: '74151' });
    add('Multiple ICs supported', manager.ics.length === 2, `${manager.ics.length} ICs`);

    manager.remove(ic.id);
    add(
      'IC removal frees its holes',
      manager.ics.length === 1 && pins.every((p) => !holeById.get(`${p.row}${p.column}`).occupied)
    );

    const remaining = manager.last();
    add('Last IC tracked after undo', remaining && remaining.name === '74151', remaining.name);

    const cleared = manager.clear();
    add('Whole reset empties the board', cleared === 1 && manager.ics.length === 0);

    return checks;
  }
}
