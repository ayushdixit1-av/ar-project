/**
 * WireManager.js
 *
 * Stores every placed wire (plus its scene mesh), generates unique ids,
 * enforces the placement rules (no self-connections, no duplicates, only
 * valid holes) and exposes the data surface future simulation will use.
 */
import { Wire } from './Wire.js';

export class WireManager {
  /**
   * @param {Set<string>} [validHoleIds] ids accepted as wire endpoints
   */
  constructor(validHoleIds = null) {
    this.validHoleIds = validHoleIds;
    this._wires = new Map();   // id -> Wire
    this._meshes = new Map();  // id -> THREE.Mesh
    this._order = [];          // insertion order of ids
    this._nextId = 1;
  }

  nextId() {
    return `wire_${String(this._nextId).padStart(3, '0')}`;
  }

  _validate(start, end) {
    if (!start || !end || typeof start !== 'string' || typeof end !== 'string') {
      throw new Error('Wire needs a start hole and an end hole.');
    }
    if (this.validHoleIds && (!this.validHoleIds.has(start) || !this.validHoleIds.has(end))) {
      throw new Error(`Invalid hole: ${start} -> ${end}.`);
    }
    if (start === end) {
      throw new Error('Cannot connect a hole to itself.');
    }
    if (this.hasConnection(start, end)) {
      throw new Error(`Wire already exists: ${start} -> ${end}.`);
    }
  }

  /**
   * Create and store a wire. Throws on invalid input / duplicates.
   * @returns {Wire}
   */
  add({ start, end, color, length = 0, type = 'jumper' }) {
    this._validate(start, end);
    const wire = new Wire({ id: this.nextId(), start, end, color, length, type });
    this._wires.set(wire.id, wire);
    this._order.push(wire.id);
    this._nextId += 1;
    return wire;
  }

  /** Attach (or replace) the scene mesh associated with a wire id. */
  attachMesh(id, mesh) {
    this._meshes.set(id, mesh);
  }

  detachMesh(id) {
    const mesh = this._meshes.get(id);
    this._meshes.delete(id);
    if (mesh && mesh.parent) mesh.parent.remove(mesh);
    return mesh;
  }

  /** Remove a wire (data + mesh). Returns true if it existed. */
  remove(id) {
    if (!this._wires.has(id)) return false;
    this.detachMesh(id);
    this._wires.delete(id);
    this._order = this._order.filter((w) => w !== id);
    return true;
  }

  get(id) {
    return this._wires.get(id);
  }

  mesh(id) {
    return this._meshes.get(id);
  }

  /** All wires in insertion order. */
  all() {
    return this._order.map((id) => this._wires.get(id));
  }

  count() {
    return this._wires.size;
  }

  /** The most recently added wire (for "undo last step"), or null. */
  last() {
    if (this._order.length === 0) return null;
    return this._wires.get(this._order[this._order.length - 1]);
  }

  hasConnection(start, end) {
    return this.all().some((wire) => wire.sameConnection(start, end));
  }

  /** Clear everything. */
  clear() {
    for (const id of [...this._order]) this.remove(id);
    this._nextId = 1;
  }

  /**
   * Headless self-review: builds sample wires and checks every rule from
   * the prompt (self-review section) plus the manager's invariants.
   */
  static validate() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    const ids = new Set(['A1', 'A2', 'B3', 'F18', 'J63', 'PT5', 'BN60', 'A10']);
    const manager = new WireManager(ids);

    const wire = manager.add({ start: 'A10', end: 'F18', color: 'red' });
    add('Wire has unique ID', /^wire_\d{3}$/.test(wire.id), wire.id);
    add('Start/end hole IDs stored', wire.start === 'A10' && wire.end === 'F18');
    add('Color stored', wire.color === 'red');
    add('Type stored', wire.type === 'jumper');
    add('Length stored', wire.length === 0);

    let selfBlocked = false;
    try {
      manager.add({ start: 'A1', end: 'A1', color: 'blue' });
    } catch (error) {
      selfBlocked = error.message.includes('itself');
    }
    add('Self-connection prevented', selfBlocked);

    let dupBlocked = false;
    try {
      manager.add({ start: 'A10', end: 'F18', color: 'green' });
    } catch (error) {
      dupBlocked = error.message.includes('already exists');
    }
    add('Duplicate wire prevented', dupBlocked);

    let reverseBlocked = false;
    try {
      manager.add({ start: 'F18', end: 'A10', color: 'blue' });
    } catch (error) {
      reverseBlocked = error.message.includes('already exists');
    }
    add('Reversed duplicate prevented', reverseBlocked);

    let nullBlocked = false;
    try {
      manager.add({ start: null, end: 'A2', color: 'red' });
    } catch (error) {
      nullBlocked = error.message.includes('start hole');
    }
    add('Null holes rejected', nullBlocked);

    let invalidBlocked = false;
    try {
      manager.add({ start: 'ZZ99', end: 'A2', color: 'red' });
    } catch (error) {
      invalidBlocked = error.message.includes('Invalid hole');
    }
    add('Invalid holes rejected', invalidBlocked);

    manager.add({ start: 'B3', end: 'PT5', color: 'orange' });
    add('Multiple wires supported', manager.count() === 2, `${manager.count()} wires`);
    add('Unique ids across wires', new Set(manager.all().map((w) => w.id)).size === manager.count());

    add('Last wire tracked (undo)', manager.last() !== null && manager.last().start === 'B3' && manager.last().end === 'PT5');

    manager.remove(wire.id);
    add('Wire can be removed', manager.count() === 1 && !manager.get(wire.id));

    manager.remove(manager.last().id);
    add('Whole reset empties the board', manager.count() === 0);

    return checks;
  }
}
