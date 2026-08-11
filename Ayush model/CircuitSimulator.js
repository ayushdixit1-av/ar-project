/**
 * CircuitSimulator.js
 *
 * Turns the placed components (breadboard holes, wires, ICs, LEDs, power
 * supply) into an electrical circuit and resolves it:
 *   1. Union-find every hole into "nets" (electrically identical points) -
 *      terminal-strip columns within a bank, whole power-rail rows, and
 *      every placed wire.
 *   2. Seed HIGH/LOW into the nets touched by the power supply's + / - wires.
 *   3. Evaluate each placed IC's logic gates (from a real 74xx pinout table)
 *      whenever both its VCC and GND pins land on a driven net and every
 *      input net is resolved; drive the gate's output pin's net with the
 *      result. Repeats to a fixpoint so chips can feed one another.
 *   4. An LED is lit only if its anode net is HIGH and its cathode net is LOW.
 *
 * Pure data/logic - no Three.js, so it can run headlessly (see validate()).
 */
import { BreadboardConfig } from './BreadboardConfig.js';

/** Union-find over hole ID strings. */
class UnionFind {
  constructor() {
    this._parent = new Map();
  }

  find(x) {
    if (!this._parent.has(x)) this._parent.set(x, x);
    const p = this._parent.get(x);
    if (p === x) return x;
    const root = this.find(p);
    this._parent.set(x, root);
    return root;
  }

  union(a, b) {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra !== rb) this._parent.set(ra, rb);
  }
}

// Standard 74xx TTL pinouts. Every gate table shares the shape:
//   { vcc, gnd, gates: [{ inputs: [pin,...], output: pin, fn: (...bool) => bool }] }
const QUAD_2IN = (fn) => ({
  vcc: 14,
  gnd: 7,
  gates: [
    { inputs: [1, 2], output: 3, fn },
    { inputs: [4, 5], output: 6, fn },
    { inputs: [9, 10], output: 8, fn },
    { inputs: [12, 13], output: 11, fn },
  ],
});

const AND = (a, b) => a && b;
const OR = (a, b) => a || b;
const NAND = (a, b) => !(a && b);
const NOR = (a, b) => !(a || b);
const XOR = (a, b) => a !== b;

const GATE_TABLE = {
  '7400': QUAD_2IN(NAND),
  '7402': QUAD_2IN(NOR),
  '7408': QUAD_2IN(AND),
  '7432': QUAD_2IN(OR),
  '7486': QUAD_2IN(XOR),
  '7404': {
    vcc: 14,
    gnd: 7,
    gates: [
      { inputs: [1], output: 2, fn: (a) => !a },
      { inputs: [3], output: 4, fn: (a) => !a },
      { inputs: [5], output: 6, fn: (a) => !a },
      { inputs: [9], output: 8, fn: (a) => !a },
      { inputs: [11], output: 10, fn: (a) => !a },
      { inputs: [13], output: 12, fn: (a) => !a },
    ],
  },
  '7411': {
    vcc: 14,
    gnd: 7,
    gates: [
      { inputs: [1, 2, 13], output: 12, fn: (a, b, c) => a && b && c },
      { inputs: [3, 4, 5], output: 6, fn: (a, b, c) => a && b && c },
      { inputs: [9, 10, 11], output: 8, fn: (a, b, c) => a && b && c },
    ],
  },
};

export class CircuitSimulator {
  static get GATE_TABLE() {
    return GATE_TABLE;
  }

  /** Bank ('top' | 'bottom') a terminal-strip row belongs to, or null for rails. */
  static bankOf(row) {
    const { rows, rowsPerBank } = BreadboardConfig.layout;
    const idx = rows.indexOf(row);
    if (idx === -1) return null;
    return idx < rowsPerBank ? 'top' : 'bottom';
  }

  /** Build the union-find of every hole, grouped by real breadboard connectivity. */
  static buildNets(holes, wires) {
    const uf = new UnionFind();
    const groups = new Map(); // groupKey -> [holeId,...]

    for (const hole of holes) {
      const bank = this.bankOf(hole.row);
      // Terminal strip: 5 rows in the same bank + column are one net.
      // Power rail row (PT/TN/BP/BN): the whole row is one continuous net.
      const key = bank ? `strip-${bank}-${hole.column}` : `rail-${hole.row}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(hole.id);
    }

    for (const ids of groups.values()) {
      for (let i = 1; i < ids.length; i++) uf.union(ids[0], ids[i]);
    }

    for (const wire of wires) {
      uf.union(wire.start, wire.end);
    }

    return uf;
  }

  /**
   * Resolve the full circuit.
   * @param {{holes:Array, wires:Array, ics:Array, leds:Array, powerSupply:Object}} input
   * @returns {{netState:Map, icOutputs:Map, ledStates:Map, uf:UnionFind}}
   */
  static evaluate({ holes, wires, ics, leds, powerSupply }) {
    const uf = this.buildNets(holes, wires);
    const netState = new Map(); // net root -> 'HIGH' | 'LOW' | 'CONFLICT'

    const drive = (holeId, state) => {
      if (!holeId) return;
      const root = uf.find(holeId);
      const cur = netState.get(root);
      if (cur === undefined) netState.set(root, state);
      else if (cur !== state) netState.set(root, 'CONFLICT');
    };

    if (powerSupply && powerSupply.positive && powerSupply.positive.connected) {
      drive(powerSupply.positive.holeId, 'HIGH');
    }
    if (powerSupply && powerSupply.negative && powerSupply.negative.connected) {
      drive(powerSupply.negative.holeId, 'LOW');
    }

    const icOutputs = new Map(); // icId -> { pin: 'HIGH'|'LOW' }
    const pinHoleId = (ic, pin) => {
      const p = ic.pins.find((pp) => pp.pin === pin);
      return p ? `${p.row}${p.column}` : null;
    };

    let changed = true;
    let guard = 0;
    while (changed && guard < 12) {
      changed = false;
      guard += 1;
      for (const ic of ics) {
        const table = GATE_TABLE[ic.name];
        if (!table) continue;

        const vccState = netState.get(uf.find(pinHoleId(ic, table.vcc)));
        const gndState = netState.get(uf.find(pinHoleId(ic, table.gnd)));
        const powered = vccState === 'HIGH' && gndState === 'LOW';

        const outputs = icOutputs.get(ic.id) || {};
        for (const gate of table.gates) {
          const outHole = pinHoleId(ic, gate.output);
          if (!outHole) continue;
          const outRoot = uf.find(outHole);

          if (!powered) {
            outputs[gate.output] = undefined;
            continue;
          }

          const inputStates = gate.inputs.map((pin) => netState.get(uf.find(pinHoleId(ic, pin))));
          if (inputStates.some((s) => s === undefined || s === 'CONFLICT')) {
            outputs[gate.output] = undefined;
            continue;
          }

          const bools = inputStates.map((s) => s === 'HIGH');
          const result = gate.fn(...bools) ? 'HIGH' : 'LOW';
          const prev = netState.get(outRoot);
          if (prev === undefined) {
            netState.set(outRoot, result);
            changed = true;
          } else if (prev !== result) {
            netState.set(outRoot, 'CONFLICT');
          }
          outputs[gate.output] = result;
        }
        icOutputs.set(ic.id, outputs);
      }
    }

    const ledStates = new Map();
    for (const led of leds) {
      const anodeState = netState.get(uf.find(led.anode));
      const cathodeState = netState.get(uf.find(led.cathode));
      ledStates.set(led.id, anodeState === 'HIGH' && cathodeState === 'LOW');
    }

    return { netState, icOutputs, ledStates, uf };
  }

  /**
   * Headless self-review: builds tiny synthetic boards and checks the wiring,
   * gate logic and LED-lighting rules end to end.
   */
  static validate() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    // Minimal fake hole field: rows A-J, columns 1-3, plus PT/BN rails.
    const holes = [];
    for (const row of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']) {
      for (let c = 1; c <= 20; c++) holes.push({ id: `${row}${c}`, row, column: c });
    }
    for (let c = 1; c <= 20; c++) {
      holes.push({ id: `PT${c}`, row: 'PT', column: c });
      holes.push({ id: `BN${c}`, row: 'BN', column: c });
    }

    const powerSupply = {
      positive: { connected: true, holeId: 'PT1' },
      negative: { connected: true, holeId: 'BN1' },
    };

    // --- AND gate (7408): power the chip, tie both inputs of gate 1 HIGH.
    const andIc = {
      id: 'IC1',
      name: '7408',
      pins: [
        { pin: 1, row: 'E', column: 5 }, { pin: 2, row: 'E', column: 6 }, { pin: 3, row: 'E', column: 7 },
        { pin: 4, row: 'E', column: 8 }, { pin: 5, row: 'E', column: 9 }, { pin: 6, row: 'E', column: 10 },
        { pin: 7, row: 'E', column: 11 },
        { pin: 8, row: 'F', column: 11 }, { pin: 9, row: 'F', column: 10 }, { pin: 10, row: 'F', column: 9 },
        { pin: 11, row: 'F', column: 8 }, { pin: 12, row: 'F', column: 7 }, { pin: 13, row: 'F', column: 6 },
        { pin: 14, row: 'F', column: 5 },
      ],
    };
    const wiresAnd = [
      { start: 'PT1', end: 'F5' },   // VCC (pin 14)
      { start: 'BN1', end: 'E11' },  // GND (pin 7)
      { start: 'PT2', end: 'E5' },   // input pin 1 -> HIGH
      { start: 'PT3', end: 'E6' },   // input pin 2 -> HIGH
      { start: 'A7', end: 'E7' },    // output pin 3 wired out to A7
    ];
    const ledAnd = { id: 'led_and', anode: 'A7', cathode: 'BN2' };
    const resultAnd = this.evaluate({ holes, wires: wiresAnd, ics: [andIc], leds: [ledAnd], powerSupply });
    add('AND gate: HIGH & HIGH -> HIGH output', resultAnd.icOutputs.get('IC1')[3] === 'HIGH');
    add('AND gate LED lights when output HIGH and cathode grounded', resultAnd.ledStates.get('led_and') === true);

    const wiresAndLow = wiresAnd.filter((w) => w.start !== 'PT3').concat([{ start: 'BN3', end: 'E6' }]);
    const resultAndLow = this.evaluate({ holes, wires: wiresAndLow, ics: [andIc], leds: [ledAnd], powerSupply });
    add('AND gate: HIGH & LOW -> LOW output', resultAndLow.icOutputs.get('IC1')[3] === 'LOW');
    add('LED stays dark when output LOW', resultAndLow.ledStates.get('led_and') === false);

    // --- NOT gate (7404): pin 1 input -> pin 2 output.
    const notIc = {
      id: 'IC2',
      name: '7404',
      pins: andIc.pins, // same DIP-14 footprint shape, different logic
    };
    const wiresNot = [
      { start: 'PT4', end: 'F5' },  // VCC
      { start: 'BN4', end: 'E11' }, // GND
      { start: 'BN5', end: 'E5' },  // input pin 1 -> LOW
      { start: 'A8', end: 'E6' },   // output pin 2 -> A8
    ];
    const ledNot = { id: 'led_not', anode: 'A8', cathode: 'BN6' };
    const resultNot = this.evaluate({ holes, wires: wiresNot, ics: [notIc], leds: [ledNot], powerSupply });
    add('NOT gate: LOW input -> HIGH output', resultNot.icOutputs.get('IC2')[2] === 'HIGH');
    add('NOT gate LED lights on HIGH output', resultNot.ledStates.get('led_not') === true);

    // --- Unpowered chip: no VCC/GND wired -> output must stay undriven.
    const resultUnpowered = this.evaluate({
      holes,
      wires: [{ start: 'PT7', end: 'E5' }, { start: 'PT8', end: 'E6' }],
      ics: [andIc],
      leds: [],
      powerSupply,
    });
    add('Unpowered IC drives nothing', resultUnpowered.icOutputs.get('IC1')[3] === undefined);

    // --- Floating input: only one input tied HIGH, the other left floating.
    const resultFloating = this.evaluate({
      holes,
      wires: [{ start: 'PT9', end: 'F5' }, { start: 'BN9', end: 'E11' }, { start: 'PT10', end: 'E5' }],
      ics: [andIc],
      leds: [],
      powerSupply,
    });
    add('Floating input leaves gate undriven', resultFloating.icOutputs.get('IC1')[3] === undefined);

    // --- Plain LED test without any IC: straight from + rail to - rail.
    const directLed = { id: 'led_direct', anode: 'PT11', cathode: 'BN11' };
    const resultDirect = this.evaluate({ holes, wires: [], ics: [], leds: [directLed], powerSupply });
    add('LED wired straight across supply lights up', resultDirect.ledStates.get('led_direct') === true);

    // --- Reversed LED (cathode on +, anode on -) must stay dark.
    const reversedLed = { id: 'led_reversed', anode: 'BN12', cathode: 'PT12' };
    const resultReversed = this.evaluate({ holes, wires: [], ics: [], leds: [reversedLed], powerSupply });
    add('Reverse-biased LED stays dark', resultReversed.ledStates.get('led_reversed') === false);

    // --- Net grouping sanity: same-bank column holes share a net; banks don't merge.
    const uf = this.buildNets(holes, []);
    add('Same-bank column holes share a net', uf.find('A5') === uf.find('E5'));
    add('Top and bottom banks stay separate without a wire', uf.find('A5') !== uf.find('F5'));
    add('Power rail is one continuous net', uf.find('PT1') === uf.find('PT20'));

    return checks;
  }
}
