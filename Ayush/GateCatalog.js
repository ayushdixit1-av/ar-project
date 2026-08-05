/**
 * GateCatalog.js
 *
 * Single source of truth for every TTL IC in the placement catalog:
 *   - power pins (vcc / gnd) per part
 *   - gate pin maps (standard TTL pin numbers)
 *   - pure-logic functions per gate
 *   - truth-table metadata (variable labels + which vars form the table)
 *
 * State convention: inputs arrive as net states ('H' | 'L' | null) OR raw
 * bits (1 | 0) - `toBit` normalizes both. Gate functions return a single
 * bit / null for 1-output gates, or { Y, W } for the 74151 mux.
 */
import { IC } from './IC.js';

function toBit(v) {
  if (v === 1 || v === 0) return v;
  if (v === 'H') return 1;
  if (v === 'L') return 0;
  return null;
}

/** Lift a pure 2-input boolean function into the gate signature. */
function twoInput(f) {
  return (values) => {
    const a = toBit(values[0]);
    const b = toBit(values[1]);
    if (a === null || b === null) return null;
    return f(a, b) ? 1 : 0;
  };
}

const nand2 = twoInput((a, b) => !(a && b));
const nor2 = twoInput((a, b) => !(a || b));
const and2 = twoInput((a, b) => a && b);
const or2 = twoInput((a, b) => a || b);
const xor2 = twoInput((a, b) => a !== b);

function not1(values) {
  const a = toBit(values[0]);
  return a === null ? null : (a ? 0 : 1);
}

function and3(values) {
  const bits = values.map(toBit);
  if (bits.some((b) => b === null)) return null;
  return bits.every((b) => b === 1) ? 1 : 0;
}

/**
 * 74151 8-to-1 multiplexer. Inputs arrive in gate.inputs order:
 *   [G, S0, S1, S2, D0..D7]
 * G is the active-low enable. Returns { Y, W }.
 */
function mux(values) {
  const g = toBit(values[0]);
  if (g === null) return { Y: null, W: null };
  if (g === 1) return { Y: 0, W: 1 };
  const selects = values.slice(1, 4).map(toBit);
  if (selects.some((b) => b === null)) return { Y: null, W: null };
  const n = selects[0] + selects[1] * 2 + selects[2] * 4;
  const data = values.slice(4, 12).map(toBit);
  const d = data[n];
  if (d === null) return { Y: null, W: null };
  return { Y: d, W: d ? 0 : 1 };
}

/** Shared Quad 2-input gate pin map (7408 AND, 7432 OR, 7486 XOR). */
const QUAD_2INPUT = (fn) => [
  { id: 'g1', label: 'Gate 1', inputs: [1, 2], outputs: [3], vars: ['A', 'B'], truth: ['A', 'B'], fn },
  { id: 'g2', label: 'Gate 2', inputs: [4, 5], outputs: [6], vars: ['A', 'B'], truth: ['A', 'B'], fn },
  { id: 'g3', label: 'Gate 3', inputs: [9, 10], outputs: [8], vars: ['A', 'B'], truth: ['A', 'B'], fn },
  { id: 'g4', label: 'Gate 4', inputs: [12, 13], outputs: [11], vars: ['A', 'B'], truth: ['A', 'B'], fn },
];

export const GateCatalog = Object.freeze({
  PARTS: {
    '7400': {
      name: 'Quad 2-Input NAND',
      vcc: 14,
      gnd: 7,
      gates: [
        { id: 'g1', label: 'Gate 1', inputs: [1, 2], outputs: [3], vars: ['A', 'B'], truth: ['A', 'B'], fn: nand2 },
        { id: 'g2', label: 'Gate 2', inputs: [4, 5], outputs: [6], vars: ['A', 'B'], truth: ['A', 'B'], fn: nand2 },
        { id: 'g3', label: 'Gate 3', inputs: [9, 10], outputs: [8], vars: ['A', 'B'], truth: ['A', 'B'], fn: nand2 },
        { id: 'g4', label: 'Gate 4', inputs: [12, 13], outputs: [11], vars: ['A', 'B'], truth: ['A', 'B'], fn: nand2 },
      ],
    },
    '7402': {
      name: 'Quad 2-Input NOR',
      vcc: 14,
      gnd: 7,
      gates: [
        { id: 'g1', label: 'Gate 1', inputs: [2, 3], outputs: [1], vars: ['A', 'B'], truth: ['A', 'B'], fn: nor2 },
        { id: 'g2', label: 'Gate 2', inputs: [5, 6], outputs: [4], vars: ['A', 'B'], truth: ['A', 'B'], fn: nor2 },
        { id: 'g3', label: 'Gate 3', inputs: [8, 9], outputs: [10], vars: ['A', 'B'], truth: ['A', 'B'], fn: nor2 },
        { id: 'g4', label: 'Gate 4', inputs: [11, 12], outputs: [13], vars: ['A', 'B'], truth: ['A', 'B'], fn: nor2 },
      ],
    },
    '7404': {
      name: 'Hex Inverter',
      vcc: 14,
      gnd: 7,
      gates: [
        { id: 'g1', label: 'Inverter 1', inputs: [1], outputs: [2], vars: ['A'], truth: ['A'], fn: not1 },
        { id: 'g2', label: 'Inverter 2', inputs: [3], outputs: [4], vars: ['A'], truth: ['A'], fn: not1 },
        { id: 'g3', label: 'Inverter 3', inputs: [5], outputs: [6], vars: ['A'], truth: ['A'], fn: not1 },
        { id: 'g4', label: 'Inverter 4', inputs: [9], outputs: [8], vars: ['A'], truth: ['A'], fn: not1 },
        { id: 'g5', label: 'Inverter 5', inputs: [11], outputs: [10], vars: ['A'], truth: ['A'], fn: not1 },
        { id: 'g6', label: 'Inverter 6', inputs: [13], outputs: [12], vars: ['A'], truth: ['A'], fn: not1 },
      ],
    },
    '7408': { name: 'Quad 2-Input AND', vcc: 14, gnd: 7, gates: QUAD_2INPUT(and2) },
    '7432': { name: 'Quad 2-Input OR', vcc: 14, gnd: 7, gates: QUAD_2INPUT(or2) },
    '7411': {
      name: 'Triple 3-Input AND',
      vcc: 14,
      gnd: 7,
      gates: [
        { id: 'g1', label: 'Gate 1', inputs: [1, 2, 13], outputs: [12], vars: ['A', 'B', 'C'], truth: ['A', 'B', 'C'], fn: and3 },
        { id: 'g2', label: 'Gate 2', inputs: [3, 4, 5], outputs: [6], vars: ['A', 'B', 'C'], truth: ['A', 'B', 'C'], fn: and3 },
        { id: 'g3', label: 'Gate 3', inputs: [9, 10, 11], outputs: [8], vars: ['A', 'B', 'C'], truth: ['A', 'B', 'C'], fn: and3 },
      ],
    },
    '74151': {
      name: '8-to-1 Multiplexer',
      vcc: 16,
      gnd: 8,
      gates: [
        {
          id: 'mux1',
          label: 'MUX 8-to-1',
          inputs: [7, 11, 10, 9, 4, 3, 2, 1, 15, 14, 13, 12],
          outputs: [5, 6],
          outLabels: ['Y', 'W'],
          vars: ['G', 'S0', 'S1', 'S2', 'D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'],
          truth: ['S0', 'S1', 'S2'],
          fn: mux,
        },
      ],
    },
    '7486': { name: 'Quad 2-Input XOR', vcc: 14, gnd: 7, gates: QUAD_2INPUT(xor2) },
  },

  /** Catalog info for a part (or null if unknown). */
  info(part) {
    return this.PARTS[part] || null;
  },

  /**
   * Enumerate the truth-table rows for a gate: every bit combination of the
   * gate's `truth` variables. Returns [{ values: number[], expected }].
   * `dataOverrides` supplies current bit values for non-truth vars (used by
   * the mux so its data/select toggles stay live).
   */
  truthRows(gate, dataOverrides = {}) {
    const truthIdx = gate.vars.map((v) => gate.truth.includes(v));
    const combos = [];
    const all = gate.vars.map((v, i) =>
      gate.truth.includes(v) ? undefined : dataOverrides[gate.inputs[i]] ?? 0
    );
    const count = gate.truth.length;
    for (let mask = 0; mask < 2 ** count; mask++) {
      const values = [...all];
      let ti = 0;
      for (let i = 0; i < gate.vars.length; i++) {
        if (truthIdx[i]) values[i] = (mask >> ti) & 1;
        if (truthIdx[i]) ti += 1;
      }
      const expected = gate.fn(values);
      combos.push({ values, expected });
    }
    return combos;
  },

  /**
   * Headless self-review of the pin maps and pure logic functions.
   */
  validate() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    const parts = Object.keys(this.PARTS);
    add('Catalog covers all 8 parts', parts.length === 8 && parts.every((p) => IC.CATALOG[p]), parts.join(','));

    const bit = (v) => (v === 1 || v === 'H' ? 1 : 0);
    const run = (gate, values) => {
      const r = gate.fn(values.map((v) => bit(v)));
      return r === null ? null : r;
    };

    add('NAND 00=1, 01=1, 10=1, 11=0', ['00', '01', '10', '11'].every((s, i) => {
      const exp = [1, 1, 1, 0];
      return run(this.PARTS['7400'].gates[0], s.split('').map(Number)) === exp[i];
    }));
    add('AND 00=0, 01=0, 10=0, 11=1', ['00', '01', '10', '11'].every((s, i) => {
      const exp = [0, 0, 0, 1];
      return run(this.PARTS['7408'].gates[0], s.split('').map(Number)) === exp[i];
    }));
    add('OR 00=0, 01=1, 10=1, 11=1', ['00', '01', '10', '11'].every((s, i) => {
      const exp = [0, 1, 1, 1];
      return run(this.PARTS['7432'].gates[0], s.split('').map(Number)) === exp[i];
    }));
    add('NOR 00=1, 01=0, 10=0, 11=0', ['00', '01', '10', '11'].every((s, i) => {
      const exp = [1, 0, 0, 0];
      return run(this.PARTS['7402'].gates[0], s.split('').map(Number)) === exp[i];
    }));
    add('XOR 00=0, 01=1, 10=1, 11=0', ['00', '01', '10', '11'].every((s, i) => {
      const exp = [0, 1, 1, 0];
      return run(this.PARTS['7486'].gates[0], s.split('').map(Number)) === exp[i];
    }));
    add('NOT 0->1, 1->0', run(this.PARTS['7404'].gates[0], [0]) === 1 && run(this.PARTS['7404'].gates[0], [1]) === 0);
    add('3-AND 111=1, 110=0', run(this.PARTS['7411'].gates[0], [1, 1, 1]) === 1 && run(this.PARTS['7411'].gates[0], [1, 1, 0]) === 0);

    const m = this.PARTS['74151'].gates[0];
    const muxRun = (g, s0, s1, s2, d) => {
      const r = m.fn([bit(g), bit(s0), bit(s1), bit(s2), ...d.map(bit)]);
      return r;
    };
    add('MUX enable high forces Y=0', muxRun(1, 0, 0, 0, [1, 0, 1, 0, 1, 0, 1, 0]).Y === 0);
    add('MUX select 0 passes D0', muxRun(0, 0, 0, 0, [1, 0, 0, 0, 0, 0, 0, 0]).Y === 1);
    add('MUX select 7 passes D7', muxRun(0, 1, 1, 1, [0, 0, 0, 0, 0, 0, 0, 1]).Y === 1);
    add('MUX Y and W are complements', muxRun(0, 1, 0, 1, [0, 0, 0, 0, 0, 1, 0, 0]).Y + muxRun(0, 1, 0, 1, [0, 0, 0, 0, 0, 1, 0, 0]).W === 1);

    const pinOk = parts.every((p) => {
      const info = this.PARTS[p];
      const max = IC.pinCountFor(p);
      const pins = info.gates.flatMap((g) => [...g.inputs, ...g.outputs, info.vcc, info.gnd]);
      return pins.every((n) => n >= 1 && n <= max);
    });
    add('All pin numbers within package', pinOk);

    add('Power pins correct', this.PARTS['7400'].vcc === 14 && this.PARTS['7400'].gnd === 7 && this.PARTS['74151'].vcc === 16 && this.PARTS['74151'].gnd === 8);

    const overlapOk = parts.every((p) =>
      this.PARTS[p].gates.every((g) => g.outputs.every((o) => !g.inputs.includes(o)))
    );
    add('No gate output doubles as its input', overlapOk);

    const truthRows = this.truthRows(this.PARTS['7408'].gates[0]);
    add('Truth rows = 2^inputs', truthRows.length === 4, `${truthRows.length} rows`);

    return checks;
  },
});
