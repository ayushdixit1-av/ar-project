/**
 * SwitchManager.js
 *
 * Stores every placed toggle switch (plus its scene group), generates unique
 * ids, enforces the placement rules (valid holes, t1 != t2, no duplicate
 * pairs) and exposes toggle()/last()/clear() for the lab controls. Pure data
 * layer - no rendering, no simulation.
 */
import { Switch } from './Switch.js';

export class SwitchManager {
  /**
   * @param {Set<string>} [validHoleIds] ids accepted as switch terminal holes
   */
  constructor(validHoleIds = null) {
    this.validHoleIds = validHoleIds;
    this._switches = new Map(); // id -> Switch
    this._groups = new Map();   // id -> THREE.Group
    this._order = [];           // insertion order of ids
    this._nextId = 1;
  }

  nextId() {
    return `sw_${String(this._nextId).padStart(3, '0')}`;
  }

  _validate(terminal1, terminal2) {
    if (!terminal1 || !terminal2 || typeof terminal1 !== 'string' || typeof terminal2 !== 'string') {
      throw new Error('Switch needs a terminal1 hole and a terminal2 hole.');
    }
    if (this.validHoleIds && (!this.validHoleIds.has(terminal1) || !this.validHoleIds.has(terminal2))) {
      throw new Error(`Invalid hole: ${terminal1} -> ${terminal2}.`);
    }
    if (terminal1 === terminal2) {
      throw new Error('Cannot place a switch on the same hole.');
    }
    if (this.hasPair(terminal1, terminal2)) {
      throw new Error(`Switch already exists: ${terminal1} -> ${terminal2}.`);
    }
  }

  /**
   * Create and store a switch. Throws on invalid input / duplicates.
   * @returns {Switch}
   */
  add({ terminal1, terminal2, on = false, type = 'spst-toggle' }) {
    this._validate(terminal1, terminal2);
    const sw = new Switch({ id: this.nextId(), terminal1, terminal2, on, type });
    this._switches.set(sw.id, sw);
    this._order.push(sw.id);
    this._nextId += 1;
    return sw;
  }

  /** Attach (or replace) the scene group associated with a switch id. */
  attachGroup(id, group) {
    this._groups.set(id, group);
  }

  detachGroup(id) {
    const group = this._groups.get(id);
    this._groups.delete(id);
    if (group && group.parent) group.parent.remove(group);
    return group;
  }

  /** Remove a switch (data + mesh). Returns true if it existed. */
  remove(id) {
    if (!this._switches.has(id)) return false;
    this.detachGroup(id);
    this._switches.delete(id);
    this._order = this._order.filter((s) => s !== id);
    return true;
  }

  get(id) {
    return this._switches.get(id);
  }

  group(id) {
    return this._groups.get(id);
  }

  /** All switches in insertion order. */
  all() {
    return this._order.map((id) => this._switches.get(id));
  }

  count() {
    return this._switches.size;
  }

  /** The most recently added switch (for "undo last step"), or null. */
  last() {
    if (this._order.length === 0) return null;
    return this._switches.get(this._order[this._order.length - 1]);
  }

  /** Does a switch already occupy this terminal pair (either order)? */
  hasPair(terminal1, terminal2) {
    return this.all().some(
      (sw) =>
        (sw.terminal1 === terminal1 && sw.terminal2 === terminal2) ||
        (sw.terminal1 === terminal2 && sw.terminal2 === terminal1)
    );
  }

  /** Flip a switch open/closed. Returns the updated switch, or null. */
  toggle(id) {
    const sw = this._switches.get(id);
    if (!sw) return null;
    sw.on = !sw.on;
    return sw;
  }

  /** Set a switch to a specific state. Returns the updated switch, or null. */
  setState(id, on) {
    const sw = this._switches.get(id);
    if (!sw) return null;
    sw.on = on === true;
    return sw;
  }

  /** Clear everything. */
  clear() {
    for (const id of [...this._order]) this.remove(id);
    this._nextId = 1;
  }

  /**
   * Headless self-review: builds sample switches and checks every rule plus
   * the manager's invariants.
   */
  static validate() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    const ids = new Set(['A1', 'A2', 'B3', 'F18', 'J63', 'PT5', 'BN60', 'A10']);
    const manager = new SwitchManager(ids);

    const sw = manager.add({ terminal1: 'A10', terminal2: 'F18' });
    add('Switch has unique ID', /^sw_\d{3}$/.test(sw.id), sw.id);
    add('Start/end hole IDs stored', sw.terminal1 === 'A10' && sw.terminal2 === 'F18');
    add('Type stored', sw.type === 'spst-toggle');
    add('Starts open (off)', sw.on === false);

    manager.toggle(sw.id);
    add('toggle() closes the switch', sw.on === true);
    manager.toggle(sw.id);
    add('toggle() opens the switch again', sw.on === false);
    manager.setState(sw.id, true);
    add('setState(true) closes the switch', sw.on === true);

    let selfBlocked = false;
    try {
      manager.add({ terminal1: 'A1', terminal2: 'A1' });
    } catch (error) {
      selfBlocked = error.message.includes('same hole');
    }
    add('Self-connection prevented', selfBlocked);

    let dupBlocked = false;
    try {
      manager.add({ terminal1: 'A10', terminal2: 'F18' });
    } catch (error) {
      dupBlocked = error.message.includes('already exists');
    }
    add('Duplicate switch prevented', dupBlocked);

    let reverseBlocked = false;
    try {
      manager.add({ terminal1: 'F18', terminal2: 'A10' });
    } catch (error) {
      reverseBlocked = error.message.includes('already exists');
    }
    add('Reversed duplicate prevented', reverseBlocked);

    let nullBlocked = false;
    try {
      manager.add({ terminal1: null, terminal2: 'A2' });
    } catch (error) {
      nullBlocked = error.message.includes('terminal1 hole');
    }
    add('Null holes rejected', nullBlocked);

    let invalidBlocked = false;
    try {
      manager.add({ terminal1: 'ZZ99', terminal2: 'A2' });
    } catch (error) {
      invalidBlocked = error.message.includes('Invalid hole');
    }
    add('Invalid holes rejected', invalidBlocked);

    manager.add({ terminal1: 'B3', terminal2: 'PT5' });
    add('Multiple switches supported', manager.count() === 2, `${manager.count()} switches`);
    add('Unique ids across switches', new Set(manager.all().map((s) => s.id)).size === manager.count());

    add(
      'Last switch tracked (undo)',
      manager.last() !== null && manager.last().terminal1 === 'B3' && manager.last().terminal2 === 'PT5'
    );

    manager.remove(sw.id);
    add('Switch can be removed', manager.count() === 1 && !manager.get(sw.id));

    manager.remove(manager.last().id);
    add('Whole reset empties the board', manager.count() === 0);

    add('toggle() on a removed switch returns null', manager.toggle('sw_001') === null);

    return checks;
  }
}
