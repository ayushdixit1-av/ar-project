/**
 * Simulator.js
 *
 * Electrical / logic-level simulation for the placed circuit:
 *   - real breadboard connectivity:
 *       * each terminal COLUMN is a 5-hole bus (A-E / F-J on the two banks)
 *       * each power rail (PT/TN/BP/BN) is one continuous conductor
 *       * jumper wires short the holes they connect
 *   - net state resolution: HIGH / LOW / FLOAT / CONFLICT
 *   - gate evaluation from the GateCatalog, gated on Vcc/GND power
 *   - LED on/off from anode/cathode net states
 *
 * Read-only over the managers. `recompute()` cheaply re-solves the whole
 * netlist every time anything changes (a few hundred nodes, runs in <1ms).
 */
import { GateCatalog } from './GateCatalog.js';
import { LEDRenderer } from './LEDRenderer.js';
import { ICManager } from './ICManager.js';
import { WireManager } from './WireManager.js';
import { LEDManager } from './LEDManager.js';
import { PowerSupplyManager } from './PowerSupplyManager.js';
import { SwitchManager } from './SwitchManager.js';
import { Hole } from './Hole.js';

class UnionFind {
  constructor() {
    this.parent = new Map();
  }
  find(x) {
    if (!this.parent.has(x)) this.parent.set(x, x);
    let root = x;
    while (this.parent.get(root) !== root) root = this.parent.get(root);
    while (this.parent.get(x) !== x) {
      const next = this.parent.get(x);
      this.parent.set(x, root);
      x = next;
    }
    return root;
  }
  union(a, b) {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra !== rb) this.parent.set(rb, ra);
  }
}

/** Merge a driver map (rep -> { H, L }) into per-net states. */
function resolveStates(drivers) {
  const states = new Map();
  for (const [rep, d] of drivers) {
    if (d.H && d.L) states.set(rep, 'X');
    else if (d.H) states.set(rep, 'H');
    else if (d.L) states.set(rep, 'L');
    else states.set(rep, null);
  }
  return states;
}

function statesEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const [k, v] of a) if (b.get(k) !== v) return false;
  return true;
}

export class Simulator {
  /**
   * @param {{ holes: Hole[], icManager, wireManager, ledManager, powerManager, switchManager }} deps
   */
  constructor({ holes, icManager, wireManager, ledManager, powerManager, switchManager }) {
    this.holes = holes;
    this.icManager = icManager;
    this.wireManager = wireManager;
    this.ledManager = ledManager;
    this.powerManager = powerManager;
    this.switchManager = switchManager || { all: () => [] };

    this.holeById = new Map(holes.map((h) => [h.id, h]));
    this.inputs = new Map(); // holeId -> 'H' | 'L'  (truth-table driven inputs)
    this.netStates = new Map();
    this.snapshot = null;
    this._uf = new UnionFind();
    this._built = false;
  }

  get ics() {
    return this.icManager.ics;
  }

  /** Drive one hole HIGH/LOW (or null to stop driving it). */
  setInput(holeId, level) {
    if (level === null || level === undefined) this.inputs.delete(holeId);
    else this.inputs.set(holeId, level);
  }

  clearInputs() {
    this.inputs.clear();
  }

  /** Union-find representative for a hole id. */
  repOf(holeId) {
    return this._uf.find(holeId);
  }

  /** Resolved net state of any hole: 'H' | 'L' | 'X' | null. */
  stateOfHole(holeId) {
    if (this._built === false) this.buildNets();
    return this.netStates.get(this.repOf(holeId)) || null;
  }

  /** Build the breadboard netlist once (column buses + rails + wires). */
  buildNets() {
    const uf = this._uf;
    uf.parent.clear();

    // Terminal column buses: A-E top bank, F-J bottom bank.
    const terminalBuses = new Map();
    for (const hole of this.holes) {
      const row = hole.row;
      if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].includes(row)) {
        const bus = `${row <= 'E' ? 'T' : 'B'}${hole.column}`;
        if (!terminalBuses.has(bus)) terminalBuses.set(bus, []);
        terminalBuses.get(bus).push(hole.id);
      }
    }
    for (const group of terminalBuses.values()) {
      for (let i = 1; i < group.length; i++) uf.union(group[0], group[i]);
    }

    // Power rails are continuous conductors.
    const railBuses = new Map();
    for (const hole of this.holes) {
      if (['PT', 'TN', 'BP', 'BN'].includes(hole.row)) {
        if (!railBuses.has(hole.row)) railBuses.set(hole.row, []);
        railBuses.get(hole.row).push(hole.id);
      }
    }
    for (const group of railBuses.values()) {
      for (let i = 1; i < group.length; i++) uf.union(group[0], group[i]);
    }

    // Jumper wires short their two endpoints.
    for (const wire of this.wireManager.all()) uf.union(wire.start, wire.end);

    // Closed switches short their two terminals; open switches add no edge.
    for (const sw of this.switchManager.all()) {
      if (sw.on) uf.union(sw.terminal1, sw.terminal2);
    }

    this._built = true;
    return uf;
  }

  /** Combine every driver (primary sources + IC outputs) into net states. */
  _merge(drivers) {
    return resolveStates(drivers);
  }

  _primaryDrivers() {
    const drivers = new Map();
    const drive = (holeId, level) => {
      const rep = this.repOf(holeId);
      if (!drivers.has(rep)) drivers.set(rep, { H: false, L: false });
      if (level === 'H') drivers.get(rep).H = true;
      if (level === 'L') drivers.get(rep).L = true;
    };
    const { positive, negative } = this.powerManager;
    if (positive.connected && positive.holeId) drive(positive.holeId, 'H');
    if (negative.connected && negative.holeId) drive(negative.holeId, 'L');
    for (const [holeId, level] of this.inputs) drive(holeId, level);
    return drivers;
  }

  /**
   * Re-solve the whole netlist and refresh the LED visuals.
   * @returns snapshot { ics, leds, nets }
   */
  recompute() {
    this.buildNets();

    const primary = this._primaryDrivers();
    let state = this._merge(primary);

    for (let pass = 0; pass < 12; pass++) {
      const drivers = new Map();
      for (const [rep, d] of primary) {
        drivers.set(rep, { H: d.H, L: d.L });
      }

      for (const ic of this.icManager.ics) {
        const info = GateCatalog.info(ic.name);
        if (!info) continue;
        const byPin = new Map(ic.pins.map((p) => [p.pin, `${p.row}${p.column}`]));

        const vccState = state.get(this.repOf(byPin.get(info.vcc)));
        const gndState = state.get(this.repOf(byPin.get(info.gnd)));
        const powered = vccState === 'H' && gndState === 'L';

        for (const gate of info.gates) {
          if (!powered) continue;
          const inputStates = gate.inputs.map((pin) => state.get(this.repOf(byPin.get(pin))) || null);
          const result = gate.fn(inputStates);

          if (gate.outputs.length === 2) {
            for (let i = 0; i < gate.outputs.length; i++) {
              const v = result[gate.outLabels[i]];
              if (v !== null && v !== undefined) {
                const rep = this.repOf(byPin.get(gate.outputs[i]));
                if (!drivers.has(rep)) drivers.set(rep, { H: false, L: false });
                if (v === 1) drivers.get(rep).H = true;
                else drivers.get(rep).L = true;
              }
            }
          } else {
            const v = result;
            if (v !== null && v !== undefined) {
              const rep = this.repOf(byPin.get(gate.outputs[0]));
              if (!drivers.has(rep)) drivers.set(rep, { H: false, L: false });
              if (v === 1) drivers.get(rep).H = true;
              else drivers.get(rep).L = true;
            }
          }
        }
      }

      const next = this._merge(drivers);
      if (statesEqual(state, next)) {
        state = next;
        break;
      }
      state = next;
    }

    this.netStates = state;
    this.snapshot = this._snapshot(state);
    this._updateLEDs(this.snapshot);
    return this.snapshot;
  }

  _snapshot(state) {
    const ics = [];
    for (const ic of this.icManager.ics) {
      const info = GateCatalog.info(ic.name);
      const byPin = new Map(ic.pins.map((p) => [p.pin, `${p.row}${p.column}`]));
      const powered =
        info &&
        state.get(this.repOf(byPin.get(info.vcc))) === 'H' &&
        state.get(this.repOf(byPin.get(info.gnd))) === 'L';
      const gates = info
        ? info.gates.map((g) => ({
            id: g.id,
            label: g.label,
            outLabels: g.outLabels || ['Y'],
            outputs: (g.outLabels || ['Y']).map((_, i) => {
              const holeId = byPin.get(g.outputs[i]);
              return state.get(this.repOf(holeId)) || null;
            }),
            vcc: info.vcc,
            gnd: info.gnd,
          }))
        : [];
      ics.push({ ic, powered, gates });
    }

    const leds = [];
    for (const led of this.ledManager.all()) {
      const anode = this.stateOfHole(led.anode);
      const cathode = this.stateOfHole(led.cathode);
      leds.push({ led, anode, cathode, on: anode === 'H' && cathode === 'L' });
    }

    const nets = new Map();
    for (const [rep, v] of state) nets.set(rep, v);
    return { ics, leds, nets };
  }

  _updateLEDs(snapshot) {
    for (const entry of snapshot.leds) {
      const group = this.ledManager.mesh(entry.led.id);
      if (group) LEDRenderer.setGlow(group, entry.on, entry.led.color);
    }
  }

  /**
   * Headless self-review: builds a powered 7408 AND circuit and verifies
   * net resolution, rail/column buses, gating and LED behavior.
   */
  static validate() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    // --- synthetic holes ------------------------------------------------
    const holeIds = new Set();
    const holes = [];
    for (let c = 1; c <= 20; c++) {
      for (const row of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']) {
        const h = new Hole({
          id: `${row}${c}`,
          row,
          column: c,
          position: { x: 0, y: 0, z: 0 },
        });
        holes.push(h);
        holeIds.add(h.id);
      }
    }
    for (const rail of ['PT', 'TN', 'BP', 'BN']) {
      for (let c = 1; c <= 20; c++) {
        const h = new Hole({
          id: `${rail}${c}`,
          row: rail,
          column: c,
          position: { x: 0, y: 0, z: 0 },
        });
        holes.push(h);
        holeIds.add(h.id);
      }
    }
    const holeById = new Map(holes.map((h) => [h.id, h]));

    const icManager = new ICManager();
    const wireManager = new WireManager(holeIds);
    const ledManager = new LEDManager(holeIds);
    const powerManager = new PowerSupplyManager(holeIds);
    const switchManager = new SwitchManager(holeIds);

    const sim = new Simulator({ holes, icManager, wireManager, ledManager, powerManager, switchManager });

    // Unpowered: gate output stays floating.
    icManager.place({ holes, startRow: 'E', startColumn: 10, orientation: 'NORMAL', part: '7408' });
    sim.setInput('E10', 'H');
    sim.setInput('E11', 'H');
    let snap = sim.recompute();
    const pin14 = holeById.get('F10');
    const pin7 = holeById.get('E16');
    add('No power -> output floats', snap.ics[0].gates[0].outputs[0] === null);

    // Power the IC: +5V on pin 14 (rail PT -> wire -> pin14), GND on pin 7.
    powerManager.connect('positive', 'PT1');
    powerManager.connect('negative', 'TN1');
    wireManager.add({ start: 'PT5', end: 'F10', color: 'red' });
    wireManager.add({ start: 'TN5', end: 'E16', color: 'black' });

    snap = sim.recompute();
    add('Rail bus is powered end-to-end', sim.stateOfHole('PT20') === 'H', `PT20=${sim.stateOfHole('PT20')}`);
    add('Wire carries rail power to pin 14', sim.stateOfHole('F10') === 'H');
    add('GND rail drives pin 7 low', sim.stateOfHole('E16') === 'L');
    add('IC reported powered', snap.ics[0].powered === true);

    // AND(1,1) = 1
    add('AND(1,1) = 1', snap.ics[0].gates[0].outputs[0] === 'H', `out=${snap.ics[0].gates[0].outputs[0]}`);

    // AND(1,0) = 0
    sim.setInput('E11', 'L');
    snap = sim.recompute();
    add('AND(1,0) = 0', snap.ics[0].gates[0].outputs[0] === 'L');

    // LED turns on only when the output is high.
    ledManager.add({ anode: 'D12', cathode: 'TN2', color: 'red' });
    snap = sim.recompute();
    add('LED off while output low', snap.leds[0].on === false);

    sim.setInput('E11', 'H');
    snap = sim.recompute();
    add('LED on while output high', snap.leds[0].on === true, `anode=${snap.leds[0].anode} cathode=${snap.leds[0].cathode}`);

    // Terminal column bus shares the same state (A-E bank).
    add('Column bus shares one state', sim.stateOfHole('C12') === sim.stateOfHole('E12'), `C12=${sim.stateOfHole('C12')}`);

    // Pin 7 and pin 14 sit on different column buses (no accidental short).
    add('Pin 7 / pin 14 on separate nets', sim.repOf('F10') !== sim.repOf('E16'));

    // Conflict: drive an input both high (panel) and low (GND wire).
    wireManager.add({ start: 'TN5', end: 'B10', color: 'blue' });
    snap = sim.recompute();
    add('High+low on one net = conflict', sim.stateOfHole('E10') === 'X', `E10=${sim.stateOfHole('E10')}`);

    // Removing the wire clears the conflict.
    const conflictWire = wireManager.all().find((w) => w.end === 'B10');
    wireManager.remove(conflictWire.id);
    snap = sim.recompute();
    add('Wire removal clears conflict', sim.stateOfHole('E10') === 'H');

    // Physical switch as an input source. B10 shares the E10 column bus;
    // closing a switch from the GND rail drives that bus low (overriding the
    // panel input makes a conflict first).
    const sw = switchManager.add({ terminal1: 'TN5', terminal2: 'B10' });
    add('Open switch adds no connection', sim.stateOfHole('E10') === 'H');
    switchManager.toggle(sw.id);
    snap = sim.recompute();
    add('Closed switch shorts rail to bus (H+L = conflict)', sim.stateOfHole('E10') === 'X', `E10=${sim.stateOfHole('E10')}`);
    sim.setInput('E10', null);
    snap = sim.recompute();
    add('Switch alone drives the input low', sim.stateOfHole('E10') === 'L');
    switchManager.toggle(sw.id);
    snap = sim.recompute();
    add('Opening the switch floats the input again', sim.stateOfHole('E10') === null);
    sim.setInput('E10', 'H');
    snap = sim.recompute();
    add('Inputs restore after switch tests', sim.stateOfHole('E10') === 'H');

    // Unpowered again after clearing everything.
    wireManager.clear();
    powerManager.clear();
    snap = sim.recompute();
    add('After clear, output floats again', snap.ics[0].gates[0].outputs[0] === null);

    return checks;
  }
}
