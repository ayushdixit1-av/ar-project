/**
 * LEDManager.js
 *
 * Stores every placed LED (plus its scene mesh), generates unique ids and
 * enforces the placement rules (valid holes, anode != cathode, no duplicate
 * LEDs on the same hole pair). Pure data layer - no rendering, no simulation.
 */
import { LED } from './LED.js';

export class LEDManager {
  /**
   * @param {Set<string>} [validHoleIds] ids accepted as LED pin holes
   */
  constructor(validHoleIds = null) {
    this.validHoleIds = validHoleIds;
    this._leds = new Map();   // id -> LED
    this._meshes = new Map(); // id -> THREE.Group
    this._order = [];         // insertion order of ids
    this._nextId = 1;
  }

  nextId() {
    return `led_${String(this._nextId).padStart(3, '0')}`;
  }

  _validate(anode, cathode) {
    if (!anode || !cathode || typeof anode !== 'string' || typeof cathode !== 'string') {
      throw new Error('LED needs an anode hole and a cathode hole.');
    }
    if (this.validHoleIds && (!this.validHoleIds.has(anode) || !this.validHoleIds.has(cathode))) {
      throw new Error(`Invalid hole: ${anode} -> ${cathode}.`);
    }
    if (anode === cathode) {
      throw new Error('Cannot connect an LED to the same hole.');
    }
    if (this.hasPair(anode, cathode)) {
      throw new Error(`LED already exists: ${anode} -> ${cathode}.`);
    }
  }

  /**
   * Create and store an LED. Throws on invalid input / duplicates.
   * @returns {LED}
   */
  add({ anode, cathode, color, type = 'led-5mm' }) {
    this._validate(anode, cathode);
    const led = new LED({ id: this.nextId(), color, anode, cathode, type });
    this._leds.set(led.id, led);
    this._order.push(led.id);
    this._nextId += 1;
    return led;
  }

  /** Attach (or replace) the scene group associated with an LED id. */
  attachMesh(id, group) {
    this._meshes.set(id, group);
  }

  detachMesh(id) {
    const group = this._meshes.get(id);
    this._meshes.delete(id);
    if (group && group.parent) group.parent.remove(group);
    return group;
  }

  /** Remove an LED (data + mesh). Returns true if it existed. */
  remove(id) {
    if (!this._leds.has(id)) return false;
    this.detachMesh(id);
    this._leds.delete(id);
    this._order = this._order.filter((l) => l !== id);
    return true;
  }

  get(id) {
    return this._leds.get(id);
  }

  mesh(id) {
    return this._meshes.get(id);
  }

  /** All LEDs in insertion order. */
  all() {
    return this._order.map((id) => this._leds.get(id));
  }

  count() {
    return this._leds.size;
  }

  /** The most recently added LED (for "undo last step"), or null. */
  last() {
    if (this._order.length === 0) return null;
    return this._leds.get(this._order[this._order.length - 1]);
  }

  /** Does an LED already occupy this anode/cathode pair (either order)? */
  hasPair(anode, cathode) {
    return this.all().some(
      (led) =>
        (led.anode === anode && led.cathode === cathode) ||
        (led.anode === cathode && led.cathode === anode)
    );
  }

  /** Clear everything. */
  clear() {
    for (const id of [...this._order]) this.remove(id);
    this._nextId = 1;
  }

  /**
   * Headless self-review: builds sample LEDs and checks every rule plus the
   * manager's invariants.
   */
  static validate() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    const ids = new Set(['A1', 'A2', 'B3', 'F18', 'J63', 'PT5', 'BN60', 'A10']);
    const manager = new LEDManager(ids);

    const led = manager.add({ anode: 'A10', cathode: 'F18', color: 'red' });
    add('LED has unique ID', /^led_\d{3}$/.test(led.id), led.id);
    add('Anode/cathode hole IDs stored', led.anode === 'A10' && led.cathode === 'F18');
    add('Color stored', led.color === 'red');
    add('Type stored', led.type === 'led-5mm');

    let selfBlocked = false;
    try {
      manager.add({ anode: 'A1', cathode: 'A1', color: 'blue' });
    } catch (error) {
      selfBlocked = error.message.includes('same hole');
    }
    add('Self-connection prevented', selfBlocked);

    let dupBlocked = false;
    try {
      manager.add({ anode: 'A10', cathode: 'F18', color: 'green' });
    } catch (error) {
      dupBlocked = error.message.includes('already exists');
    }
    add('Duplicate LED prevented', dupBlocked);

    let reverseBlocked = false;
    try {
      manager.add({ anode: 'F18', cathode: 'A10', color: 'blue' });
    } catch (error) {
      reverseBlocked = error.message.includes('already exists');
    }
    add('Reversed duplicate prevented', reverseBlocked);

    let nullBlocked = false;
    try {
      manager.add({ anode: null, cathode: 'A2', color: 'red' });
    } catch (error) {
      nullBlocked = error.message.includes('anode hole');
    }
    add('Null holes rejected', nullBlocked);

    let invalidBlocked = false;
    try {
      manager.add({ anode: 'ZZ99', cathode: 'A2', color: 'red' });
    } catch (error) {
      invalidBlocked = error.message.includes('Invalid hole');
    }
    add('Invalid holes rejected', invalidBlocked);

    manager.add({ anode: 'B3', cathode: 'PT5', color: 'yellow' });
    add('Multiple LEDs supported', manager.count() === 2, `${manager.count()} LEDs`);
    add('Unique ids across LEDs', new Set(manager.all().map((l) => l.id)).size === manager.count());

    add(
      'Last LED tracked (undo)',
      manager.last() !== null && manager.last().anode === 'B3' && manager.last().cathode === 'PT5'
    );

    manager.remove(led.id);
    add('LED can be removed', manager.count() === 1 && !manager.get(led.id));

    manager.remove(manager.last().id);
    add('Whole reset empties the board', manager.count() === 0);

    return checks;
  }
}
