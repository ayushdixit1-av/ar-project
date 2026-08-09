import { CircuitState, ICType, TruthTableRow } from '../types/electronics';

export interface GateTruthTable {
  icType: ICType;
  name: string;
  inputNames: string[];
  outputName: string;
  rows: TruthTableRow[];
}

export const GATE_TRUTH_TABLES: Record<ICType, GateTruthTable> = {
  '7408': {
    icType: '7408',
    name: 'AND Gate (IC 7408)',
    inputNames: ['A', 'B'],
    outputName: 'Y',
    rows: [
      { inputs: { A: 0, B: 0 }, expectedOutput: 0, observedOutput: null, verified: false },
      { inputs: { A: 0, B: 1 }, expectedOutput: 0, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 0 }, expectedOutput: 0, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 1 }, expectedOutput: 1, observedOutput: null, verified: false },
    ],
  },
  '7400': {
    icType: '7400',
    name: 'NAND Gate (IC 7400)',
    inputNames: ['A', 'B'],
    outputName: 'Y',
    rows: [
      { inputs: { A: 0, B: 0 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { A: 0, B: 1 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 0 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 1 }, expectedOutput: 0, observedOutput: null, verified: false },
    ],
  },
  '7432': {
    icType: '7432',
    name: 'OR Gate (IC 7432)',
    inputNames: ['A', 'B'],
    outputName: 'Y',
    rows: [
      { inputs: { A: 0, B: 0 }, expectedOutput: 0, observedOutput: null, verified: false },
      { inputs: { A: 0, B: 1 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 0 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 1 }, expectedOutput: 1, observedOutput: null, verified: false },
    ],
  },
  '7402': {
    icType: '7402',
    name: 'NOR Gate (IC 7402)',
    inputNames: ['A', 'B'],
    outputName: 'Y',
    rows: [
      { inputs: { A: 0, B: 0 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { A: 0, B: 1 }, expectedOutput: 0, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 0 }, expectedOutput: 0, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 1 }, expectedOutput: 0, observedOutput: null, verified: false },
    ],
  },
  '7486': {
    icType: '7486',
    name: 'XOR Gate (IC 7486)',
    inputNames: ['A', 'B'],
    outputName: 'Y',
    rows: [
      { inputs: { A: 0, B: 0 }, expectedOutput: 0, observedOutput: null, verified: false },
      { inputs: { A: 0, B: 1 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 0 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 1 }, expectedOutput: 0, observedOutput: null, verified: false },
    ],
  },
  '7404': {
    icType: '7404',
    name: 'NOT Gate (IC 7404)',
    inputNames: ['A'],
    outputName: 'Y',
    rows: [
      { inputs: { A: 0 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { A: 1 }, expectedOutput: 0, observedOutput: null, verified: false },
    ],
  },
  'SOP': {
    icType: 'SOP',
    name: "SOP Form: F = Y'Z + X'Y",
    inputNames: ['X', 'Y', 'Z'],
    outputName: 'F_SOP',
    rows: [
      { inputs: { X: 0, Y: 0, Z: 0 }, expectedOutput: 0, observedOutput: null, verified: false },
      { inputs: { X: 0, Y: 0, Z: 1 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { X: 0, Y: 1, Z: 0 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { X: 0, Y: 1, Z: 1 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { X: 1, Y: 0, Z: 0 }, expectedOutput: 0, observedOutput: null, verified: false },
      { inputs: { X: 1, Y: 0, Z: 1 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { X: 1, Y: 1, Z: 0 }, expectedOutput: 0, observedOutput: null, verified: false },
      { inputs: { X: 1, Y: 1, Z: 1 }, expectedOutput: 0, observedOutput: null, verified: false },
    ],
  },
  'POS': {
    icType: 'POS',
    name: "POS Form: F = (Y+Z)(X'+Y')",
    inputNames: ['X', 'Y', 'Z'],
    outputName: 'F_POS',
    rows: [
      { inputs: { X: 0, Y: 0, Z: 0 }, expectedOutput: 0, observedOutput: null, verified: false },
      { inputs: { X: 0, Y: 0, Z: 1 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { X: 0, Y: 1, Z: 0 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { X: 0, Y: 1, Z: 1 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { X: 1, Y: 0, Z: 0 }, expectedOutput: 0, observedOutput: null, verified: false },
      { inputs: { X: 1, Y: 0, Z: 1 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { X: 1, Y: 1, Z: 0 }, expectedOutput: 0, observedOutput: null, verified: false },
      { inputs: { X: 1, Y: 1, Z: 1 }, expectedOutput: 0, observedOutput: null, verified: false },
    ],
  },
  'HALF_ADDER': {
    icType: 'HALF_ADDER',
    name: 'Half Adder (Sum & Carry)',
    inputNames: ['A', 'B'],
    outputName: 'Sum',
    rows: [
      { inputs: { A: 0, B: 0 }, expectedOutput: 0, expectedCarry: 0, observedOutput: null, verified: false },
      { inputs: { A: 0, B: 1 }, expectedOutput: 1, expectedCarry: 0, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 0 }, expectedOutput: 1, expectedCarry: 0, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 1 }, expectedOutput: 0, expectedCarry: 1, observedOutput: null, verified: false },
    ],
  },
  'FULL_ADDER': {
    icType: 'FULL_ADDER',
    name: 'Full Adder (Sum & Carry)',
    inputNames: ['A', 'B', 'Cin'],
    outputName: 'Sum',
    rows: [
      { inputs: { A: 0, B: 0, Cin: 0 }, expectedOutput: 0, expectedCarry: 0, observedOutput: null, verified: false },
      { inputs: { A: 0, B: 0, Cin: 1 }, expectedOutput: 1, expectedCarry: 0, observedOutput: null, verified: false },
      { inputs: { A: 0, B: 1, Cin: 0 }, expectedOutput: 1, expectedCarry: 0, observedOutput: null, verified: false },
      { inputs: { A: 0, B: 1, Cin: 1 }, expectedOutput: 0, expectedCarry: 1, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 0, Cin: 0 }, expectedOutput: 1, expectedCarry: 0, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 0, Cin: 1 }, expectedOutput: 0, expectedCarry: 1, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 1, Cin: 0 }, expectedOutput: 0, expectedCarry: 1, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 1, Cin: 1 }, expectedOutput: 1, expectedCarry: 1, observedOutput: null, verified: false },
    ],
  },
  'BIN_TO_GRAY': {
    icType: 'BIN_TO_GRAY',
    name: 'Binary to Gray Converter',
    inputNames: ['B2', 'B1', 'B0'],
    outputName: 'G2',
    rows: [
      { inputs: { B2: 0, B1: 0, B0: 0 }, expectedOutput: 0, expectedCarry: 0, expectedOut3: 0, observedOutput: null, verified: false },
      { inputs: { B2: 0, B1: 0, B0: 1 }, expectedOutput: 0, expectedCarry: 0, expectedOut3: 1, observedOutput: null, verified: false },
      { inputs: { B2: 0, B1: 1, B0: 0 }, expectedOutput: 0, expectedCarry: 1, expectedOut3: 1, observedOutput: null, verified: false },
      { inputs: { B2: 0, B1: 1, B0: 1 }, expectedOutput: 0, expectedCarry: 1, expectedOut3: 0, observedOutput: null, verified: false },
      { inputs: { B2: 1, B1: 0, B0: 0 }, expectedOutput: 1, expectedCarry: 1, expectedOut3: 0, observedOutput: null, verified: false },
      { inputs: { B2: 1, B1: 0, B0: 1 }, expectedOutput: 1, expectedCarry: 1, expectedOut3: 1, observedOutput: null, verified: false },
      { inputs: { B2: 1, B1: 1, B0: 0 }, expectedOutput: 1, expectedCarry: 0, expectedOut3: 1, observedOutput: null, verified: false },
      { inputs: { B2: 1, B1: 1, B0: 1 }, expectedOutput: 1, expectedCarry: 0, expectedOut3: 0, observedOutput: null, verified: false },
    ],
  },
  'GRAY_TO_BIN': {
    icType: 'GRAY_TO_BIN',
    name: 'Gray to Binary Converter',
    inputNames: ['G2', 'G1', 'G0'],
    outputName: 'B2',
    rows: [
      { inputs: { G2: 0, G1: 0, G0: 0 }, expectedOutput: 0, expectedCarry: 0, expectedOut3: 0, observedOutput: null, verified: false },
      { inputs: { G2: 0, G1: 0, G0: 1 }, expectedOutput: 0, expectedCarry: 0, expectedOut3: 1, observedOutput: null, verified: false },
      { inputs: { G2: 0, G1: 1, G0: 0 }, expectedOutput: 0, expectedCarry: 1, expectedOut3: 1, observedOutput: null, verified: false },
      { inputs: { G2: 0, G1: 1, G0: 1 }, expectedOutput: 0, expectedCarry: 1, expectedOut3: 0, observedOutput: null, verified: false },
      { inputs: { G2: 1, G1: 1, G0: 0 }, expectedOutput: 1, expectedCarry: 0, expectedOut3: 0, observedOutput: null, verified: false },
      { inputs: { G2: 1, G1: 1, G0: 1 }, expectedOutput: 1, expectedCarry: 0, expectedOut3: 1, observedOutput: null, verified: false },
      { inputs: { G2: 1, G1: 0, G0: 0 }, expectedOutput: 1, expectedCarry: 1, expectedOut3: 1, observedOutput: null, verified: false },
      { inputs: { G2: 1, G1: 0, G0: 1 }, expectedOutput: 1, expectedCarry: 1, expectedOut3: 0, observedOutput: null, verified: false },
    ],
  },
  'DECODER_2X4': {
    icType: 'DECODER_2X4',
    name: '2 x 4 Line Decoder',
    inputNames: ['A', 'B'],
    outputName: 'Y0',
    rows: [
      { inputs: { A: 0, B: 0 }, expectedOutput: 1, expectedCarry: 0, expectedOut3: 0, expectedOut4: 0, observedOutput: null, verified: false },
      { inputs: { A: 0, B: 1 }, expectedOutput: 0, expectedCarry: 1, expectedOut3: 0, expectedOut4: 0, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 0 }, expectedOutput: 0, expectedCarry: 0, expectedOut3: 1, expectedOut4: 0, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 1 }, expectedOutput: 0, expectedCarry: 0, expectedOut3: 0, expectedOut4: 1, observedOutput: null, verified: false },
    ],
  },
  'MUX_4X1': {
    icType: 'MUX_4X1',
    name: '4 x 1 Multiplexer',
    inputNames: ['S1', 'S0'],
    outputName: 'Y',
    rows: [
      { inputs: { S1: 0, S0: 0 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { S1: 0, S0: 1 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { S1: 1, S0: 0 }, expectedOutput: 1, observedOutput: null, verified: false },
      { inputs: { S1: 1, S0: 1 }, expectedOutput: 1, observedOutput: null, verified: false },
    ],
  },
  'COMPARATOR_1BIT': {
    icType: 'COMPARATOR_1BIT',
    name: '1-Bit Magnitude Comparator',
    inputNames: ['A', 'B'],
    outputName: 'A>B',
    rows: [
      { inputs: { A: 0, B: 0 }, expectedOutput: 0, expectedCarry: 0, expectedOut3: 1, observedOutput: null, verified: false },
      { inputs: { A: 0, B: 1 }, expectedOutput: 0, expectedCarry: 1, expectedOut3: 0, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 0 }, expectedOutput: 1, expectedCarry: 0, expectedOut3: 0, observedOutput: null, verified: false },
      { inputs: { A: 1, B: 1 }, expectedOutput: 0, expectedCarry: 0, expectedOut3: 1, observedOutput: null, verified: false },
    ],
  },
  'FF_SR': {
    icType: 'FF_SR',
    name: 'SR Flip-Flop (NAND Latch)',
    inputNames: ['S', 'R'],
    outputName: 'Q',
    rows: [
      { inputs: { S: 0, R: 1 }, expectedOutput: 0, expectedCarry: 1, observedOutput: null, verified: false },
      { inputs: { S: 1, R: 0 }, expectedOutput: 1, expectedCarry: 0, observedOutput: null, verified: false },
    ],
  },
  'FF_D': {
    icType: 'FF_D',
    name: 'D Flip-Flop (Data Hold)',
    inputNames: ['D', 'CLK'],
    outputName: 'Q',
    rows: [
      { inputs: { D: 0, CLK: 1 }, expectedOutput: 0, expectedCarry: 1, observedOutput: null, verified: false },
      { inputs: { D: 1, CLK: 1 }, expectedOutput: 1, expectedCarry: 0, observedOutput: null, verified: false },
    ],
  },
  'COUNTER_ASYNC': {
    icType: 'COUNTER_ASYNC',
    name: '2-Bit Ripple Counter',
    inputNames: ['CLK'],
    outputName: 'Q0',
    rows: [
      { inputs: { CLK: 0 }, expectedOutput: 0, expectedCarry: 0, observedOutput: null, verified: false },
      { inputs: { CLK: 1 }, expectedOutput: 1, expectedCarry: 0, observedOutput: null, verified: false },
    ],
  },
  'REG_PIPO': {
    icType: 'REG_PIPO',
    name: '4-Bit Parallel Shift Register',
    inputNames: ['CLK'],
    outputName: 'Q0',
    rows: [
      { inputs: { CLK: 1 }, expectedOutput: 1, expectedCarry: 1, expectedOut3: 1, expectedOut4: 1, observedOutput: null, verified: false },
    ],
  },
};

export interface GuidedStep {
  stepNumber: number;
  title: string;
  instruction: string;
  hint: string;
  isCompleted: (state: CircuitState, simResult?: any) => boolean;
}

export function getGuidedStepsForIC(icType: ICType): GuidedStep[] {
  if (['BIN_TO_GRAY', 'GRAY_TO_BIN', 'DECODER_2X4', 'MUX_4X1', 'COMPARATOR_1BIT', 'FF_SR', 'FF_D', 'COUNTER_ASYNC', 'REG_PIPO'].includes(icType)) {
    return [
      {
        stepNumber: 1,
        title: 'Check Pre-wired Setup',
        instruction: `Verify the pre-wired logic circuit for ${icType} on the board.`,
        hint: 'The board is loaded with ICs, resistors, LEDs, and routing wires.',
        isCompleted: (s) => s.ics.length > 0,
      },
      {
        stepNumber: 2,
        title: 'Energize Board',
        instruction: 'Ensure the DC Power Supply is turned ON (rocker green).',
        hint: 'Toggle the green power button in the navbar or click the supply switch.',
        isCompleted: (s) => s.powerSupplyOn,
      },
      {
        stepNumber: 3,
        title: 'Toggle & Verify Inputs',
        instruction: 'Toggle inputs to verify all rows in the Live Truth Table!',
        hint: 'Change switch states and observe LED configurations.',
        isCompleted: (s) => s.powerSupplyOn,
      },
    ];
  }

  if (icType === 'HALF_ADDER') {
    return [
      {
        stepNumber: 1,
        title: 'Wire Power Supply',
        instruction: 'Connect VCC (+5V) to red rail and GND to blue/black rail.',
        hint: 'Use a red wire from supply_VCC to rail_TOP_POS_1, and black wire from supply_GND to rail_BOTTOM_NEG_1.',
        isCompleted: (s) => s.wires.some(w => w.fromHoleKey === 'supply_VCC') && s.wires.some(w => w.fromHoleKey === 'supply_GND'),
      },
      {
        stepNumber: 2,
        title: 'Place ICs 7486 & 7408',
        instruction: 'Ensure IC 7486 (XOR) and IC 7408 (AND) are placed on the board.',
        hint: 'XOR gate is used for Sum, AND gate is used for Carry.',
        isCompleted: (s) => s.ics.some(i => i.type === '7486') && s.ics.some(i => i.type === '7408'),
      },
      {
        stepNumber: 3,
        title: 'Power both ICs',
        instruction: 'Connect Pin 14 of both ICs to VCC rail, and Pin 7 of both ICs to GND rail.',
        hint: 'Power pins are top-left (VCC) and bottom-right (GND).',
        isCompleted: (s, sim) => {
          if (!sim) return false;
          const targetIcs = s.ics.filter(i => ['7486', '7408'].includes(i.type));
          if (targetIcs.length < 2) return false;
          return targetIcs.every(ic => sim.icPowerStatus[ic.id]?.powered === true);
        },
      },
      {
        stepNumber: 4,
        title: 'Wire Switch Inputs',
        instruction: 'Connect Switch A and Switch B to inputs of both XOR and AND gates.',
        hint: 'XOR inputs are Pin 1 & 2. AND inputs are Pin 1 & 2.',
        isCompleted: (s) => s.wires.length >= 6,
      },
      {
        stepNumber: 5,
        title: 'Wire Sum & Carry Outputs',
        instruction: 'Connect XOR output (Pin 3) to Sum LED (Red), and AND output (Pin 3) to Carry LED (Green).',
        hint: 'Make sure LEDs have current-limiting resistors connected to GND.',
        isCompleted: (s) => s.leds.some(l => l.id.includes('sum')) && s.leds.some(l => l.id.includes('carry')),
      },
      {
        stepNumber: 6,
        title: 'Verify Half Adder Truth Table',
        instruction: 'Turn on the power supply and verify all input combinations!',
        hint: 'Toggle A and B and verify outputs on LEDs.',
        isCompleted: (s) => s.powerSupplyOn,
      },
    ];
  }

  if (icType === 'FULL_ADDER') {
    return [
      {
        stepNumber: 1,
        title: 'Wire Power Supply',
        instruction: 'Connect VCC (+5V) to red rail and GND to blue/black rail.',
        hint: 'Use a red wire from supply_VCC to rail_TOP_POS_1, and black wire from supply_GND to rail_BOTTOM_NEG_1.',
        isCompleted: (s) => s.wires.some(w => w.fromHoleKey === 'supply_VCC') && s.wires.some(w => w.fromHoleKey === 'supply_GND'),
      },
      {
        stepNumber: 2,
        title: 'Place ICs 7486, 7408 & 7432',
        instruction: 'Ensure IC 7486 (XOR), IC 7408 (AND), and IC 7432 (OR) are placed on the board.',
        hint: 'Place them in separate columns across the center divider.',
        isCompleted: (s) => s.ics.some(i => i.type === '7486') && s.ics.some(i => i.type === '7408') && s.ics.some(i => i.type === '7432'),
      },
      {
        stepNumber: 3,
        title: 'Power all three ICs',
        instruction: 'Connect Pin 14 of all three ICs to VCC, and Pin 7 of all three ICs to GND.',
        hint: 'Ensure all three ICs have power and ground connections.',
        isCompleted: (s, sim) => {
          if (!sim) return false;
          const targetIcs = s.ics.filter(i => ['7486', '7408', '7432'].includes(i.type));
          if (targetIcs.length < 3) return false;
          return targetIcs.every(ic => sim.icPowerStatus[ic.id]?.powered === true);
        },
      },
      {
        stepNumber: 4,
        title: 'Wire sum: Cin ⊕ (A ⊕ B)',
        instruction: 'Connect Switch A and Switch B to XOR1 inputs. Connect XOR1 output (A ⊕ B) and Switch Cin to XOR2 inputs. XOR2 output is Sum.',
        hint: 'XOR gate 1 output (Pin 3) goes to XOR gate 2 input (Pin 4).',
        isCompleted: (s) => s.wires.length >= 8,
      },
      {
        stepNumber: 5,
        title: 'Wire carry logic',
        instruction: 'Connect XOR1 output (A ⊕ B) and Switch Cin to AND1. Connect Switch A and Switch B to AND2. Connect AND1 & AND2 outputs to OR gate.',
        hint: 'AND1 output (Pin 3) and AND2 output (Pin 6) go to OR inputs (Pin 1 & 2).',
        isCompleted: (s) => s.wires.length >= 12,
      },
      {
        stepNumber: 6,
        title: 'Connect outputs to LEDs',
        instruction: 'Connect OR output (Pin 3, Carry) to Carry LED, and XOR2 output (Pin 6, Sum) to Sum LED.',
        hint: 'Ensure red (Sum) and green (Carry) LEDs are connected.',
        isCompleted: (s) => s.leds.some(l => l.id.includes('sum')) && s.leds.some(l => l.id.includes('carry')),
      },
      {
        stepNumber: 7,
        title: 'Verify Full Adder Truth Table',
        instruction: 'Turn on the power supply and verify all 8 input combinations!',
        hint: 'Toggle A, B, and Cin to observe outputs.',
        isCompleted: (s) => s.powerSupplyOn,
      },
    ];
  }

  if (icType === 'SOP') {
    return [
      {
        stepNumber: 1,
        title: 'Wire Power Supply',
        instruction: 'Connect VCC (+5V) to red rail and GND to blue/black rail.',
        hint: 'Use a red wire from supply_VCC to rail_TOP_POS_1, and black wire from supply_GND to rail_BOTTOM_NEG_1.',
        isCompleted: (s) => s.wires.some(w => w.fromHoleKey === 'supply_VCC') && s.wires.some(w => w.fromHoleKey === 'supply_GND'),
      },
      {
        stepNumber: 2,
        title: 'Place All Three ICs',
        instruction: 'Ensure ICs 7404 (NOT), 7408 (AND), and 7432 (OR) are placed on the board.',
        hint: 'You can drag them across the center divider to snap them into columns.',
        isCompleted: (s) => s.ics.some(i => i.type === '7404') && s.ics.some(i => i.type === '7408') && s.ics.some(i => i.type === '7432'),
      },
      {
        stepNumber: 3,
        title: 'Power All Three ICs',
        instruction: 'Wire Pin 14 of all three ICs to VCC rail, and Pin 7 of all three ICs to GND rail.',
        hint: 'Pin 14 is top-left, Pin 7 is bottom-right on the breadboard layout.',
        isCompleted: (s, sim) => {
          if (!sim) return false;
          const targetIcs = s.ics.filter(i => ['7404', '7408', '7432'].includes(i.type));
          if (targetIcs.length < 3) return false;
          return targetIcs.every(ic => sim.icPowerStatus[ic.id]?.powered === true);
        },
      },
      {
        stepNumber: 4,
        title: 'Wire Terminals for Y\'Z',
        instruction: 'Connect Switch Y to 7404 input, 7404 output (Y\') to 7408 input, and Switch Z to the other 7408 input.',
        hint: 'Check gate pinouts: 7404 (In 1, Out 2), 7408 (In 1 & 2, Out 3).',
        isCompleted: (s) => s.wires.length >= 8,
      },
      {
        stepNumber: 5,
        title: 'Wire Terminals for X\'Y',
        instruction: 'Connect Switch X to 7404 input 2, 7404 output (X\') to 7408 input 2, and Switch Y to the other 7408 input 2.',
        hint: 'Use the second gate on the ICs (7404: Pin 3 In, Pin 4 Out; 7408: Pin 4 & 5 In, Pin 6 Out).',
        isCompleted: (s) => s.wires.length >= 12,
      },
      {
        stepNumber: 6,
        title: 'Connect to OR Gate & LED',
        instruction: 'Connect both AND gate outputs (Pin 3 and Pin 6) to 7432 inputs, and 7432 output (Pin 3) to the SOP LED (Red).',
        hint: 'Verify the Red LED lights up according to minterms 1, 2, 3, 5!',
        isCompleted: (s) => {
          const sopLed = s.leds.find(l => l.id === 'led_sop');
          return !!sopLed;
        },
      },
      {
        stepNumber: 7,
        title: 'Verify SOP Truth Table',
        instruction: 'Turn on the power supply and verify all rows in the Live Truth Table!',
        hint: 'Toggle X, Y, Z inputs to observe outputs.',
        isCompleted: (s) => s.powerSupplyOn,
      },
    ];
  }

  if (icType === 'POS') {
    return [
      {
        stepNumber: 1,
        title: 'Wire Power Supply',
        instruction: 'Connect VCC (+5V) to red rail and GND to blue/black rail.',
        hint: 'Use a red wire from supply_VCC to rail_TOP_POS_1, and black wire from supply_GND to rail_BOTTOM_NEG_1.',
        isCompleted: (s) => s.wires.some(w => w.fromHoleKey === 'supply_VCC') && s.wires.some(w => w.fromHoleKey === 'supply_GND'),
      },
      {
        stepNumber: 2,
        title: 'Place All Three ICs',
        instruction: 'Ensure ICs 7404 (NOT), 7408 (AND), and 7432 (OR) are placed on the board.',
        hint: 'Check that columns are distinct so pins don\'t overlap.',
        isCompleted: (s) => s.ics.some(i => i.type === '7404') && s.ics.some(i => i.type === '7408') && s.ics.some(i => i.type === '7432'),
      },
      {
        stepNumber: 3,
        title: 'Power All Three ICs',
        instruction: 'Wire Pin 14 of all three ICs to VCC, and Pin 7 of all three ICs to GND.',
        hint: 'Pin 14 is top-left, Pin 7 is bottom-right.',
        isCompleted: (s, sim) => {
          if (!sim) return false;
          const targetIcs = s.ics.filter(i => ['7404', '7408', '7432'].includes(i.type));
          if (targetIcs.length < 3) return false;
          return targetIcs.every(ic => sim.icPowerStatus[ic.id]?.powered === true);
        },
      },
      {
        stepNumber: 4,
        title: 'Wire Terminals for (Y+Z)',
        instruction: 'Connect Switch Y and Switch Z to OR gate 7432 inputs, and route the output (Pin 3) to AND gate 7408 input.',
        hint: '7432 inputs are Pin 1 & 2, output is Pin 3.',
        isCompleted: (s) => s.wires.length >= 8,
      },
      {
        stepNumber: 5,
        title: 'Wire Terminals for (X\'+Y\')',
        instruction: 'Connect Switch X and Switch Y to NOT inputs, NOT outputs to OR inputs, and the OR output to the other AND input.',
        hint: 'Verify gates: 7404 (NOT), 7432 (OR), 7408 (AND).',
        isCompleted: (s) => s.wires.length >= 12,
      },
      {
        stepNumber: 6,
        title: 'Connect to AND Output & LED',
        instruction: 'Connect the final AND gate output to the POS LED (Green).',
        hint: 'Verify the Green LED lights up according to maxterms 0, 4, 6, 7 (output is 0)!',
        isCompleted: (s) => {
          const posLed = s.leds.find(l => l.id === 'led_pos');
          return !!posLed;
        },
      },
      {
        stepNumber: 7,
        title: 'Verify POS Truth Table',
        instruction: 'Turn on the power supply and verify all rows in the Live Truth Table!',
        hint: 'Toggle X, Y, Z inputs to observe outputs.',
        isCompleted: (s) => s.powerSupplyOn,
      },
    ];
  }

  return [
    {
      stepNumber: 1,
      title: 'Select Component',
      instruction: `Select IC ${icType} from the Component Library on the left panel.`,
      hint: 'Click the IC card in the sidebar or drag it onto the breadboard.',
      isCompleted: (s) => s.ics.some((ic) => ic.type === icType),
    },
    {
      stepNumber: 2,
      title: 'Place IC across Center Gap',
      instruction: `Ensure IC ${icType} straddles the center divider gap of the breadboard.`,
      hint: 'The pins must sit cleanly on top row F and bottom row J.',
      isCompleted: (s) => s.ics.some((ic) => ic.type === icType),
    },
    {
      stepNumber: 3,
      title: 'Connect +5V Power to Pin 14',
      instruction: `Run a RED wire from the +5V power rail to Pin 14 of IC ${icType}.`,
      hint: 'Pin 14 is the top-left pin of the IC (Row F, starting column).',
      isCompleted: (s, sim) => {
        const ic = s.ics.find((i) => i.type === icType);
        if (!ic || !sim) return false;
        return sim.icPowerStatus[ic.id]?.vccOk || false;
      },
    },
    {
      stepNumber: 4,
      title: 'Connect Ground to Pin 7',
      instruction: `Run a BLACK wire from the GND rail to Pin 7 of IC ${icType}.`,
      hint: 'Pin 7 is the bottom-right pin of the IC (Row J, column + 6).',
      isCompleted: (s, sim) => {
        const ic = s.ics.find((i) => i.type === icType);
        if (!ic || !sim) return false;
        return sim.icPowerStatus[ic.id]?.gndOk || false;
      },
    },
    {
      stepNumber: 5,
      title: 'Connect Input Switches',
      instruction: `Connect Switch A to Pin 1 (and Switch B to Pin 2 for 2-input gates).`,
      hint: 'Use Yellow wire for Input A and Green wire for Input B.',
      isCompleted: (s) => s.switches.length > 0 && s.wires.length >= 4,
    },
    {
      stepNumber: 6,
      title: 'Connect Output LED & Resistor',
      instruction: `Wire Gate 1 Output (Pin 3) through a 330Ω Resistor to the LED Anode, and LED Cathode to GND.`,
      hint: 'The resistor limits current to protect the LED.',
      isCompleted: (s) => s.leds.length > 0 && s.resistors.length > 0,
    },
    {
      stepNumber: 7,
      title: 'Power ON & Verify Truth Table',
      instruction: 'Turn on the Power Supply and toggle inputs to measure and verify all rows in the Truth Table!',
      hint: 'Click the POWER button and toggle switches A and B.',
      isCompleted: (s) => s.powerSupplyOn,
    },
  ];
}

// Preset circuit generator for instant loading / auto-assembly
export function createPresetCircuit(icType: ICType): CircuitState {
  const startCol = 10;
  // Pin 14 (VCC) is at terminal_10_F
  // Pin 7 (GND) is at terminal_16_J
  // Pin 1 (Input A) is at terminal_10_J
  // Pin 2 (Input B) is at terminal_11_J
  // Pin 3 (Output Y) is at terminal_12_J

  return {
    powerSupplyOn: true,
    powerSupplyVoltage: 5.0,
    ics: [
      {
        id: `ic_preset_${icType}`,
        type: icType,
        startCol,
      },
    ],
    switches: [
      { id: 'sw_A', label: 'Input A', state: 'LOW', outputHoleKey: 'terminal_2_J' },
      { id: 'sw_B', label: 'Input B', state: 'LOW', outputHoleKey: 'terminal_4_J' },
    ],
    leds: [
      {
        id: 'led_out',
        color: 'red',
        anodeHoleKey: 'terminal_22_J',
        cathodeHoleKey: 'rail_BOTTOM_NEG_22',
        isOn: false,
      },
    ],
    resistors: [
      {
        id: 'res_out',
        resistance: 330,
        fromHoleKey: 'terminal_12_A', // Pin 3 output (net_top_12)
        toHoleKey: 'terminal_22_J', // LED Anode
      },
    ],
    wires: [
      // Power supply connections to breadboard rails
      { id: 'w_supply_vcc', fromHoleKey: 'supply_VCC', toHoleKey: 'rail_TOP_POS_1', color: 'red' },
      { id: 'w_supply_gnd', fromHoleKey: 'supply_GND', toHoleKey: 'rail_BOTTOM_NEG_1', color: 'black' },
      // VCC wire (Pin 14 at terminal_10_F to TOP_POS)
      { id: 'w_vcc', fromHoleKey: 'terminal_10_F', toHoleKey: 'rail_TOP_POS_10', color: 'red' },
      // GND wire (Pin 7 at terminal_16_E to BOTTOM_NEG via terminal_16_A)
      { id: 'w_gnd', fromHoleKey: 'terminal_16_A', toHoleKey: 'rail_BOTTOM_NEG_16', color: 'black' },
      // Switch A wire to Pin 1 (terminal_10_A)
      { id: 'w_inA', fromHoleKey: 'terminal_2_J', toHoleKey: 'terminal_10_A', color: 'yellow' },
      // Switch B wire to Pin 2 (terminal_11_A)
      { id: 'w_inB', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_11_A', color: 'green' },
    ],
  };
}

export function createSOPPOSPresetCircuit(): CircuitState {
  return {
    powerSupplyOn: true,
    powerSupplyVoltage: 5.0,
    ics: [
      { id: 'ic_7404_sop', type: '7404', startCol: 6 },
      { id: 'ic_7408_sop', type: '7408', startCol: 14 },
      { id: 'ic_7432_sop', type: '7432', startCol: 22 },
    ],
    switches: [
      { id: 'sw_X', label: 'Input X', state: 'LOW', outputHoleKey: 'terminal_2_J' },
      { id: 'sw_Y', label: 'Input Y', state: 'LOW', outputHoleKey: 'terminal_4_J' },
      { id: 'sw_Z', label: 'Input Z', state: 'LOW', outputHoleKey: 'terminal_6_J' },
    ],
    leds: [
      { id: 'led_sop', color: 'red', anodeHoleKey: 'terminal_28_J', cathodeHoleKey: 'rail_BOTTOM_NEG_28', isOn: false },
      { id: 'led_pos', color: 'green', anodeHoleKey: 'terminal_30_J', cathodeHoleKey: 'rail_BOTTOM_NEG_30', isOn: false },
    ],
    resistors: [
      { id: 'res_sop', resistance: 330, fromHoleKey: 'terminal_28_A', toHoleKey: 'terminal_28_J' },
      { id: 'res_pos', resistance: 330, fromHoleKey: 'terminal_30_A', toHoleKey: 'terminal_30_J' },
    ],
    wires: [
      // Pre-connect power supply terminals
      { id: 'w_supply_vcc', fromHoleKey: 'supply_VCC', toHoleKey: 'rail_TOP_POS_1', color: 'red' },
      { id: 'w_supply_gnd', fromHoleKey: 'supply_GND', toHoleKey: 'rail_BOTTOM_NEG_1', color: 'black' },

      // VCC lines for all three ICs
      { id: 'w_vcc_7404', fromHoleKey: 'terminal_6_F', toHoleKey: 'rail_TOP_POS_6', color: 'red' },
      { id: 'w_vcc_7408', fromHoleKey: 'terminal_14_F', toHoleKey: 'rail_TOP_POS_14', color: 'red' },
      { id: 'w_vcc_7432', fromHoleKey: 'terminal_22_F', toHoleKey: 'rail_TOP_POS_22', color: 'red' },

      // GND lines for all three ICs
      { id: 'w_gnd_7404', fromHoleKey: 'terminal_12_A', toHoleKey: 'rail_BOTTOM_NEG_12', color: 'black' },
      { id: 'w_gnd_7408', fromHoleKey: 'terminal_20_A', toHoleKey: 'rail_BOTTOM_NEG_20', color: 'black' },
      { id: 'w_gnd_7432', fromHoleKey: 'terminal_28_A', toHoleKey: 'rail_BOTTOM_NEG_28', color: 'black' },

      // --- SOP WIRING ---
      // Switch Y -> NOT 1A (Pin 1)
      { id: 'w_sop_y_not', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_6_J', color: 'yellow' },
      // NOT 1Y (Pin 2) -> AND 1A (Pin 1)
      { id: 'w_sop_noty_and', fromHoleKey: 'terminal_7_A', toHoleKey: 'terminal_14_J', color: 'blue' },
      // Switch Z -> AND 1B (Pin 2)
      { id: 'w_sop_z_and', fromHoleKey: 'terminal_6_J', toHoleKey: 'terminal_15_J', color: 'green' },

      // Switch X -> NOT 2A (Pin 3)
      { id: 'w_sop_x_not', fromHoleKey: 'terminal_2_J', toHoleKey: 'terminal_8_J', color: 'yellow' },
      // NOT 2Y (Pin 4) -> AND 2A (Pin 4)
      { id: 'w_sop_notx_and', fromHoleKey: 'terminal_9_A', toHoleKey: 'terminal_17_J', color: 'blue' },
      // Switch Y -> AND 2B (Pin 5)
      { id: 'w_sop_y_and2', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_18_J', color: 'green' },

      // AND 1Y (Pin 3) -> OR 1A (Pin 1)
      { id: 'w_sop_and1_or', fromHoleKey: 'terminal_16_A', toHoleKey: 'terminal_22_J', color: 'purple' },
      // AND 2Y (Pin 6) -> OR 1B (Pin 2)
      { id: 'w_sop_and2_or', fromHoleKey: 'terminal_19_A', toHoleKey: 'terminal_23_J', color: 'purple' },
      // OR 1Y (Pin 3) -> Resistor SOP input (terminal_28_A)
      { id: 'w_sop_or_led', fromHoleKey: 'terminal_24_A', toHoleKey: 'terminal_28_A', color: 'orange' },

      // --- POS WIRING ---
      // Switch Y -> OR 2A (Pin 4)
      { id: 'w_pos_y_or', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_25_J', color: 'yellow' },
      // Switch Z -> OR 2B (Pin 5)
      { id: 'w_pos_z_or', fromHoleKey: 'terminal_6_J', toHoleKey: 'terminal_26_J', color: 'green' },

      // NOT 2Y (Pin 4, X') -> OR 3A (Pin 13)
      { id: 'w_pos_notx_or3', fromHoleKey: 'terminal_9_A', toHoleKey: 'terminal_23_F', color: 'blue' },
      // NOT 1Y (Pin 2, Y') -> OR 3B (Pin 12)
      { id: 'w_pos_noty_or3', fromHoleKey: 'terminal_7_A', toHoleKey: 'terminal_24_F', color: 'blue' },

      // OR 2Y (Pin 6, Y+Z) -> AND 3A (Pin 13)
      { id: 'w_pos_or2_and3', fromHoleKey: 'terminal_27_A', toHoleKey: 'terminal_15_F', color: 'purple' },
      // OR 3Y (Pin 11, X'+Y') -> AND 3B (Pin 12)
      { id: 'w_pos_or3_and3', fromHoleKey: 'terminal_25_F', toHoleKey: 'terminal_16_F', color: 'purple' },

      // AND 3Y (Pin 11, Output) -> Resistor POS input (terminal_30_A)
      { id: 'w_pos_and3_led', fromHoleKey: 'terminal_17_F', toHoleKey: 'terminal_30_A', color: 'orange' }
    ],
  };
}

export function createAdderPresetCircuit(type: 'HALF_ADDER' | 'FULL_ADDER'): CircuitState {
  if (type === 'HALF_ADDER') {
    return {
      powerSupplyOn: true,
      powerSupplyVoltage: 5.0,
      ics: [
        { id: 'ic_7486_ha', type: '7486', startCol: 6 },
        { id: 'ic_7408_ha', type: '7408', startCol: 14 },
      ],
      switches: [
        { id: 'sw_A', label: 'Input A', state: 'LOW', outputHoleKey: 'terminal_2_J' },
        { id: 'sw_B', label: 'Input B', state: 'LOW', outputHoleKey: 'terminal_4_J' },
      ],
      leds: [
        { id: 'led_sum', color: 'red', anodeHoleKey: 'terminal_24_J', cathodeHoleKey: 'rail_BOTTOM_NEG_24', isOn: false },
        { id: 'led_carry', color: 'green', anodeHoleKey: 'terminal_26_J', cathodeHoleKey: 'rail_BOTTOM_NEG_26', isOn: false },
      ],
      resistors: [
        { id: 'res_sum', resistance: 330, fromHoleKey: 'terminal_24_A', toHoleKey: 'terminal_24_J' },
        { id: 'res_carry', resistance: 330, fromHoleKey: 'terminal_26_A', toHoleKey: 'terminal_26_J' },
      ],
      wires: [
        { id: 'w_supply_vcc', fromHoleKey: 'supply_VCC', toHoleKey: 'rail_TOP_POS_1', color: 'red' },
        { id: 'w_supply_gnd', fromHoleKey: 'supply_GND', toHoleKey: 'rail_BOTTOM_NEG_1', color: 'black' },
        
        // VCC for ICs
        { id: 'w_vcc_7486', fromHoleKey: 'terminal_6_F', toHoleKey: 'rail_TOP_POS_6', color: 'red' },
        { id: 'w_vcc_7408', fromHoleKey: 'terminal_14_F', toHoleKey: 'rail_TOP_POS_14', color: 'red' },

        // GND for ICs
        { id: 'w_gnd_7486', fromHoleKey: 'terminal_12_A', toHoleKey: 'rail_BOTTOM_NEG_12', color: 'black' },
        { id: 'w_gnd_7408', fromHoleKey: 'terminal_20_A', toHoleKey: 'rail_BOTTOM_NEG_20', color: 'black' },

        // Switch A to XOR 1A and AND 1A
        { id: 'w_ha_a_xor', fromHoleKey: 'terminal_2_J', toHoleKey: 'terminal_6_J', color: 'yellow' },
        { id: 'w_ha_a_and', fromHoleKey: 'terminal_2_J', toHoleKey: 'terminal_14_J', color: 'yellow' },

        // Switch B to XOR 1B and AND 1B
        { id: 'w_ha_b_xor', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_7_J', color: 'green' },
        { id: 'w_ha_b_and', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_15_J', color: 'green' },

        // XOR 1Y (Sum) -> Sum LED input
        { id: 'w_ha_sum', fromHoleKey: 'terminal_8_A', toHoleKey: 'terminal_24_A', color: 'blue' },
        // AND 1Y (Carry) -> Carry LED input
        { id: 'w_ha_carry', fromHoleKey: 'terminal_16_A', toHoleKey: 'terminal_26_A', color: 'blue' }
      ],
    };
  } else {
    return {
      powerSupplyOn: true,
      powerSupplyVoltage: 5.0,
      ics: [
        { id: 'ic_7486_fa', type: '7486', startCol: 6 },
        { id: 'ic_7408_fa', type: '7408', startCol: 14 },
        { id: 'ic_7432_fa', type: '7432', startCol: 22 },
      ],
      switches: [
        { id: 'sw_A', label: 'Input A', state: 'LOW', outputHoleKey: 'terminal_2_J' },
        { id: 'sw_B', label: 'Input B', state: 'LOW', outputHoleKey: 'terminal_4_J' },
        { id: 'sw_Cin', label: 'Input Cin', state: 'LOW', outputHoleKey: 'terminal_6_J' },
      ],
      leds: [
        { id: 'led_sum', color: 'red', anodeHoleKey: 'terminal_26_J', cathodeHoleKey: 'rail_BOTTOM_NEG_26', isOn: false },
        { id: 'led_carry', color: 'green', anodeHoleKey: 'terminal_28_J', cathodeHoleKey: 'rail_BOTTOM_NEG_28', isOn: false },
      ],
      resistors: [
        { id: 'res_sum', resistance: 330, fromHoleKey: 'terminal_26_A', toHoleKey: 'terminal_26_J' },
        { id: 'res_carry', resistance: 330, fromHoleKey: 'terminal_28_A', toHoleKey: 'terminal_28_J' },
      ],
      wires: [
        { id: 'w_supply_vcc', fromHoleKey: 'supply_VCC', toHoleKey: 'rail_TOP_POS_1', color: 'red' },
        { id: 'w_supply_gnd', fromHoleKey: 'supply_GND', toHoleKey: 'rail_BOTTOM_NEG_1', color: 'black' },

        // VCC for ICs
        { id: 'w_vcc_7486', fromHoleKey: 'terminal_6_F', toHoleKey: 'rail_TOP_POS_6', color: 'red' },
        { id: 'w_vcc_7408', fromHoleKey: 'terminal_14_F', toHoleKey: 'rail_TOP_POS_14', color: 'red' },
        { id: 'w_vcc_7432', fromHoleKey: 'terminal_22_F', toHoleKey: 'rail_TOP_POS_22', color: 'red' },

        // GND for ICs
        { id: 'w_gnd_7486', fromHoleKey: 'terminal_12_A', toHoleKey: 'rail_BOTTOM_NEG_12', color: 'black' },
        { id: 'w_gnd_7408', fromHoleKey: 'terminal_20_A', toHoleKey: 'rail_BOTTOM_NEG_20', color: 'black' },
        { id: 'w_gnd_7432', fromHoleKey: 'terminal_28_A', toHoleKey: 'rail_BOTTOM_NEG_28', color: 'black' },

        // --- SUM LOGIC ---
        // Switch A -> XOR1 Pin 1
        { id: 'w_fa_a_xor1', fromHoleKey: 'terminal_2_J', toHoleKey: 'terminal_6_J', color: 'yellow' },
        // Switch B -> XOR1 Pin 2
        { id: 'w_fa_b_xor1', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_7_J', color: 'green' },
        // XOR1 Pin 3 (A ⊕ B) -> XOR2 Pin 4
        { id: 'w_fa_xor1_xor2', fromHoleKey: 'terminal_8_A', toHoleKey: 'terminal_9_J', color: 'blue' },
        // Switch Cin -> XOR2 Pin 5
        { id: 'w_fa_cin_xor2', fromHoleKey: 'terminal_6_J', toHoleKey: 'terminal_10_J', color: 'white' },
        // XOR2 Pin 6 output (Sum) -> Sum LED
        { id: 'w_fa_sum_out', fromHoleKey: 'terminal_11_A', toHoleKey: 'terminal_26_A', color: 'orange' },

        // --- CARRY LOGIC ---
        // XOR1 Pin 3 (A ⊕ B) -> AND1 Pin 1
        { id: 'w_fa_xor1_and1', fromHoleKey: 'terminal_8_A', toHoleKey: 'terminal_14_J', color: 'blue' },
        // Switch Cin -> AND1 Pin 2
        { id: 'w_fa_cin_and1', fromHoleKey: 'terminal_6_J', toHoleKey: 'terminal_15_J', color: 'white' },
        // Switch A -> AND2 Pin 4
        { id: 'w_fa_a_and2', fromHoleKey: 'terminal_2_J', toHoleKey: 'terminal_17_J', color: 'yellow' },
        // Switch B -> AND2 Pin 5
        { id: 'w_fa_b_and2', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_18_J', color: 'green' },

        // AND1 Pin 3 -> OR1 Pin 1
        { id: 'w_fa_and1_or1', fromHoleKey: 'terminal_16_A', toHoleKey: 'terminal_22_J', color: 'purple' },
        // AND2 Pin 6 -> OR1 Pin 2
        { id: 'w_fa_and2_or1', fromHoleKey: 'terminal_19_A', toHoleKey: 'terminal_23_J', color: 'purple' },
        // OR1 Pin 3 output (Carry) -> Carry LED
        { id: 'w_fa_carry_out', fromHoleKey: 'terminal_24_A', toHoleKey: 'terminal_28_A', color: 'orange' }
      ],
    };
  }
}

export function createExtraPresetsCircuit(icType: ICType): CircuitState {
  const baseVccGnd = [
    { id: 'w_supply_vcc', fromHoleKey: 'supply_VCC', toHoleKey: 'rail_TOP_POS_1', color: 'red' },
    { id: 'w_supply_gnd', fromHoleKey: 'supply_GND', toHoleKey: 'rail_BOTTOM_NEG_1', color: 'black' }
  ] as Wire[];

  if (icType === 'BIN_TO_GRAY' || icType === 'GRAY_TO_BIN') {
    const isBinToGray = icType === 'BIN_TO_GRAY';
    return {
      powerSupplyOn: true,
      powerSupplyVoltage: 5.0,
      ics: [
        { id: 'ic_7486_code', type: '7486', startCol: 10 }
      ],
      switches: [
        { id: 'sw_in2', label: isBinToGray ? 'Input B2' : 'Input G2', state: 'LOW', outputHoleKey: 'terminal_2_J' },
        { id: 'sw_in1', label: isBinToGray ? 'Input B1' : 'Input G1', state: 'LOW', outputHoleKey: 'terminal_4_J' },
        { id: 'sw_in0', label: isBinToGray ? 'Input B0' : 'Input G0', state: 'LOW', outputHoleKey: 'terminal_6_J' }
      ],
      leds: [
        { id: 'led_out2', color: 'red', anodeHoleKey: 'terminal_24_J', cathodeHoleKey: 'rail_BOTTOM_NEG_24', isOn: false },
        { id: 'led_out1', color: 'green', anodeHoleKey: 'terminal_26_J', cathodeHoleKey: 'rail_BOTTOM_NEG_26', isOn: false },
        { id: 'led_out0', color: 'yellow', anodeHoleKey: 'terminal_28_J', cathodeHoleKey: 'rail_BOTTOM_NEG_28', isOn: false }
      ],
      resistors: [
        { id: 'res_out2', resistance: 330, fromHoleKey: 'terminal_24_A', toHoleKey: 'terminal_24_J' },
        { id: 'res_out1', resistance: 330, fromHoleKey: 'terminal_26_A', toHoleKey: 'terminal_26_J' },
        { id: 'res_out0', resistance: 330, fromHoleKey: 'terminal_28_A', toHoleKey: 'terminal_28_J' }
      ],
      wires: [
        ...baseVccGnd,
        { id: 'w_vcc_code', fromHoleKey: 'terminal_10_F', toHoleKey: 'rail_TOP_POS_10', color: 'red' },
        { id: 'w_gnd_code', fromHoleKey: 'terminal_16_A', toHoleKey: 'rail_BOTTOM_NEG_16', color: 'black' },
        
        // Output 2 = Input 2
        { id: 'w_code_out2', fromHoleKey: 'terminal_2_J', toHoleKey: 'terminal_24_A', color: 'yellow' },
        
        // Output 1 = Input 2 XOR Input 1
        { id: 'w_code_in2_xor1', fromHoleKey: 'terminal_2_J', toHoleKey: 'terminal_10_J', color: 'yellow' },
        { id: 'w_code_in1_xor1', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_11_J', color: 'green' },
        { id: 'w_code_out1', fromHoleKey: 'terminal_12_A', toHoleKey: 'terminal_26_A', color: 'blue' },

        // Output 0 = (Binary: B1 XOR B0, Gray: B1 XOR G0)
        isBinToGray 
          ? { id: 'w_code_in1_xor2', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_13_J', color: 'green' }
          : { id: 'w_code_in1_xor2', fromHoleKey: 'terminal_26_A', toHoleKey: 'terminal_13_J', color: 'blue' },
        { id: 'w_code_in0_xor2', fromHoleKey: 'terminal_6_J', toHoleKey: 'terminal_14_J', color: 'white' },
        { id: 'w_code_out0', fromHoleKey: 'terminal_15_A', toHoleKey: 'terminal_28_A', color: 'orange' }
      ]
    };
  }

  if (icType === 'DECODER_2X4') {
    return {
      powerSupplyOn: true,
      powerSupplyVoltage: 5.0,
      ics: [
        { id: 'ic_not', type: '7404', startCol: 6 },
        { id: 'ic_and', type: '7408', startCol: 14 }
      ],
      switches: [
        { id: 'sw_A', label: 'Input A', state: 'LOW', outputHoleKey: 'terminal_2_J' },
        { id: 'sw_B', label: 'Input B', state: 'LOW', outputHoleKey: 'terminal_4_J' }
      ],
      leds: [
        { id: 'led_y0', color: 'red', anodeHoleKey: 'terminal_24_J', cathodeHoleKey: 'rail_BOTTOM_NEG_24', isOn: false },
        { id: 'led_y1', color: 'green', anodeHoleKey: 'terminal_26_J', cathodeHoleKey: 'rail_BOTTOM_NEG_26', isOn: false },
        { id: 'led_y2', color: 'yellow', anodeHoleKey: 'terminal_28_J', cathodeHoleKey: 'rail_BOTTOM_NEG_28', isOn: false },
        { id: 'led_y3', color: 'blue', anodeHoleKey: 'terminal_30_J', cathodeHoleKey: 'rail_BOTTOM_NEG_30', isOn: false }
      ],
      resistors: [
        { id: 'res_y0', resistance: 330, fromHoleKey: 'terminal_24_A', toHoleKey: 'terminal_24_J' },
        { id: 'res_y1', resistance: 330, fromHoleKey: 'terminal_26_A', toHoleKey: 'terminal_26_J' },
        { id: 'res_y2', resistance: 330, fromHoleKey: 'terminal_28_A', toHoleKey: 'terminal_28_J' },
        { id: 'res_y3', resistance: 330, fromHoleKey: 'terminal_30_A', toHoleKey: 'terminal_30_J' }
      ],
      wires: [
        ...baseVccGnd,
        { id: 'w_vcc_not', fromHoleKey: 'terminal_6_F', toHoleKey: 'rail_TOP_POS_6', color: 'red' },
        { id: 'w_vcc_and', fromHoleKey: 'terminal_14_F', toHoleKey: 'rail_TOP_POS_14', color: 'red' },
        { id: 'w_gnd_not', fromHoleKey: 'terminal_12_A', toHoleKey: 'rail_BOTTOM_NEG_12', color: 'black' },
        { id: 'w_gnd_and', fromHoleKey: 'terminal_20_A', toHoleKey: 'rail_BOTTOM_NEG_20', color: 'black' },

        // A -> NOT 1A
        { id: 'w_dec_a_not', fromHoleKey: 'terminal_2_J', toHoleKey: 'terminal_6_J', color: 'yellow' },
        // B -> NOT 2A
        { id: 'w_dec_b_not', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_8_J', color: 'green' },

        // Y0 = A'B' (AND1)
        { id: 'w_dec_a_prime_and1', fromHoleKey: 'terminal_7_A', toHoleKey: 'terminal_14_J', color: 'blue' },
        { id: 'w_dec_b_prime_and1', fromHoleKey: 'terminal_9_A', toHoleKey: 'terminal_15_J', color: 'purple' },
        { id: 'w_dec_y0', fromHoleKey: 'terminal_16_A', toHoleKey: 'terminal_24_A', color: 'orange' },

        // Y1 = A'B (AND2)
        { id: 'w_dec_a_prime_and2', fromHoleKey: 'terminal_7_A', toHoleKey: 'terminal_17_J', color: 'blue' },
        { id: 'w_dec_b_and2', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_18_J', color: 'green' },
        { id: 'w_dec_y1', fromHoleKey: 'terminal_19_A', toHoleKey: 'terminal_26_A', color: 'orange' },

        // Y2 = AB' (AND3)
        { id: 'w_dec_a_and3', fromHoleKey: 'terminal_2_J', toHoleKey: 'terminal_15_F', color: 'yellow' },
        { id: 'w_dec_b_prime_and3', fromHoleKey: 'terminal_9_A', toHoleKey: 'terminal_16_F', color: 'purple' },
        { id: 'w_dec_y2', fromHoleKey: 'terminal_17_F', toHoleKey: 'terminal_28_A', color: 'orange' },

        // Y3 = AB (AND4)
        { id: 'w_dec_a_and4', fromHoleKey: 'terminal_2_J', toHoleKey: 'terminal_19_F', color: 'yellow' },
        { id: 'w_dec_b_and4', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_18_F', color: 'green' },
        { id: 'w_dec_y3', fromHoleKey: 'terminal_20_F', toHoleKey: 'terminal_30_A', color: 'orange' }
      ]
    };
  }

  if (icType === 'MUX_4X1') {
    return {
      powerSupplyOn: true,
      powerSupplyVoltage: 5.0,
      ics: [
        { id: 'ic_not_m', type: '7404', startCol: 4 },
        { id: 'ic_and_m1', type: '7408', startCol: 11 },
        { id: 'ic_or_m', type: '7432', startCol: 20 }
      ],
      switches: [
        { id: 'sw_s1', label: 'Select S1', state: 'LOW', outputHoleKey: 'terminal_2_J' },
        { id: 'sw_s0', label: 'Select S0', state: 'LOW', outputHoleKey: 'terminal_4_J' }
      ],
      leds: [
        { id: 'led_mux', color: 'red', anodeHoleKey: 'terminal_28_J', cathodeHoleKey: 'rail_BOTTOM_NEG_28', isOn: false }
      ],
      resistors: [
        { id: 'res_mux', resistance: 330, fromHoleKey: 'terminal_28_A', toHoleKey: 'terminal_28_J' }
      ],
      wires: [
        ...baseVccGnd,
        { id: 'w_vcc_not_m', fromHoleKey: 'terminal_4_F', toHoleKey: 'rail_TOP_POS_4', color: 'red' },
        { id: 'w_vcc_and_m', fromHoleKey: 'terminal_11_F', toHoleKey: 'rail_TOP_POS_11', color: 'red' },
        { id: 'w_vcc_or_m', fromHoleKey: 'terminal_20_F', toHoleKey: 'rail_TOP_POS_20', color: 'red' },
        { id: 'w_gnd_not_m', fromHoleKey: 'terminal_10_A', toHoleKey: 'rail_BOTTOM_NEG_10', color: 'black' },
        { id: 'w_gnd_and_m', fromHoleKey: 'terminal_17_A', toHoleKey: 'rail_BOTTOM_NEG_17', color: 'black' },
        { id: 'w_gnd_or_m', fromHoleKey: 'terminal_26_A', toHoleKey: 'rail_BOTTOM_NEG_26', color: 'black' },

        // Wire NOT lines
        { id: 'w_not_s1', fromHoleKey: 'terminal_2_J', toHoleKey: 'terminal_4_J', color: 'yellow' },
        { id: 'w_not_s0', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_6_J', color: 'green' },

        // AND1 (S1' S0') -> Selects D0
        { id: 'w_and1_a', fromHoleKey: 'terminal_5_A', toHoleKey: 'terminal_11_J', color: 'blue' },
        { id: 'w_and1_b', fromHoleKey: 'terminal_7_A', toHoleKey: 'terminal_12_J', color: 'purple' },
        
        { id: 'w_or1_a', fromHoleKey: 'terminal_13_A', toHoleKey: 'terminal_20_J', color: 'orange' },
        { id: 'w_or1_out', fromHoleKey: 'terminal_22_A', toHoleKey: 'terminal_28_A', color: 'red' }
      ]
    };
  }

  if (icType === 'COMPARATOR_1BIT') {
    return {
      powerSupplyOn: true,
      powerSupplyVoltage: 5.0,
      ics: [
        { id: 'ic_comp_not', type: '7404', startCol: 6 },
        { id: 'ic_comp_and', type: '7408', startCol: 14 },
        { id: 'ic_comp_xor', type: '7486', startCol: 22 }
      ],
      switches: [
        { id: 'sw_A', label: 'Input A', state: 'LOW', outputHoleKey: 'terminal_2_J' },
        { id: 'sw_B', label: 'Input B', state: 'LOW', outputHoleKey: 'terminal_4_J' }
      ],
      leds: [
        { id: 'led_gt', color: 'red', anodeHoleKey: 'terminal_26_J', cathodeHoleKey: 'rail_BOTTOM_NEG_26', isOn: false },
        { id: 'led_lt', color: 'green', anodeHoleKey: 'terminal_28_J', cathodeHoleKey: 'rail_BOTTOM_NEG_28', isOn: false },
        { id: 'led_eq', color: 'yellow', anodeHoleKey: 'terminal_30_J', cathodeHoleKey: 'rail_BOTTOM_NEG_30', isOn: false }
      ],
      resistors: [
        { id: 'res_gt', resistance: 330, fromHoleKey: 'terminal_26_A', toHoleKey: 'terminal_26_J' },
        { id: 'res_lt', resistance: 330, fromHoleKey: 'terminal_28_A', toHoleKey: 'terminal_28_J' },
        { id: 'res_eq', resistance: 330, fromHoleKey: 'terminal_30_A', toHoleKey: 'terminal_30_J' }
      ],
      wires: [
        ...baseVccGnd,
        { id: 'w_vcc_not_c', fromHoleKey: 'terminal_6_F', toHoleKey: 'rail_TOP_POS_6', color: 'red' },
        { id: 'w_vcc_and_c', fromHoleKey: 'terminal_14_F', toHoleKey: 'rail_TOP_POS_14', color: 'red' },
        { id: 'w_vcc_xor_c', fromHoleKey: 'terminal_22_F', toHoleKey: 'rail_TOP_POS_22', color: 'red' },
        { id: 'w_gnd_not_c', fromHoleKey: 'terminal_12_A', toHoleKey: 'rail_BOTTOM_NEG_12', color: 'black' },
        { id: 'w_gnd_and_c', fromHoleKey: 'terminal_20_A', toHoleKey: 'rail_BOTTOM_NEG_20', color: 'black' },
        { id: 'w_gnd_xor_c', fromHoleKey: 'terminal_28_A', toHoleKey: 'rail_BOTTOM_NEG_28', color: 'black' },

        // inputs to NOT
        { id: 'w_not_a', fromHoleKey: 'terminal_2_J', toHoleKey: 'terminal_6_J', color: 'yellow' },
        { id: 'w_not_b', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_8_J', color: 'green' },

        // A < B (A'B)
        { id: 'w_lt_a', fromHoleKey: 'terminal_7_A', toHoleKey: 'terminal_14_J', color: 'blue' },
        { id: 'w_lt_b', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_15_J', color: 'green' },
        { id: 'w_lt_out', fromHoleKey: 'terminal_16_A', toHoleKey: 'terminal_28_A', color: 'green' },

        // A > B (AB')
        { id: 'w_gt_a', fromHoleKey: 'terminal_2_J', toHoleKey: 'terminal_17_J', color: 'yellow' },
        { id: 'w_gt_b', fromHoleKey: 'terminal_9_A', toHoleKey: 'terminal_18_J', color: 'blue' },
        { id: 'w_gt_out', fromHoleKey: 'terminal_19_A', toHoleKey: 'terminal_26_A', color: 'red' },

        // A = B (A ⊕ B)'
        { id: 'w_eq_xor_a', fromHoleKey: 'terminal_2_J', toHoleKey: 'terminal_22_J', color: 'yellow' },
        { id: 'w_eq_xor_b', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_23_J', color: 'green' },
        { id: 'w_eq_xor_out', fromHoleKey: 'terminal_24_A', toHoleKey: 'terminal_10_J', color: 'blue' },
        { id: 'w_eq_not_out', fromHoleKey: 'terminal_11_A', toHoleKey: 'terminal_30_A', color: 'orange' }
      ]
    };
  }

  // Fallback / SR Flip-Flops & Counters/Registers templates
  return {
    powerSupplyOn: true,
    powerSupplyVoltage: 5.0,
    ics: [
      { id: 'ic_ff', type: '7400', startCol: 10 }
    ],
    switches: [
      { id: 'sw_s', label: icType.includes('FF_D') ? 'Input D' : (icType.includes('COUNTER') ? 'CLK Pulses' : 'Input S'), state: 'LOW', outputHoleKey: 'terminal_2_J' },
      { id: 'sw_r', label: icType.includes('FF_D') ? 'Input CLK' : (icType.includes('COUNTER') ? 'Reset' : 'Input R'), state: 'LOW', outputHoleKey: 'terminal_4_J' }
    ],
    leds: [
      { id: 'led_q', color: 'red', anodeHoleKey: 'terminal_26_J', cathodeHoleKey: 'rail_BOTTOM_NEG_26', isOn: false },
      { id: 'led_q_p', color: 'green', anodeHoleKey: 'terminal_28_J', cathodeHoleKey: 'rail_BOTTOM_NEG_28', isOn: false }
    ],
    resistors: [
      { id: 'res_q', resistance: 330, fromHoleKey: 'terminal_26_A', toHoleKey: 'terminal_26_J' },
      { id: 'res_qp', resistance: 330, fromHoleKey: 'terminal_28_A', toHoleKey: 'terminal_28_J' }
    ],
    wires: [
      ...baseVccGnd,
      { id: 'w_vcc_ff', fromHoleKey: 'terminal_10_F', toHoleKey: 'rail_TOP_POS_10', color: 'red' },
      { id: 'w_gnd_ff', fromHoleKey: 'terminal_16_A', toHoleKey: 'rail_BOTTOM_NEG_16', color: 'black' },
      
      // Simple latch wiring
      { id: 'w_ff_s_in', fromHoleKey: 'terminal_2_J', toHoleKey: 'terminal_10_J', color: 'yellow' },
      { id: 'w_ff_r_in', fromHoleKey: 'terminal_4_J', toHoleKey: 'terminal_13_J', color: 'green' },
      { id: 'w_ff_q_out', fromHoleKey: 'terminal_12_A', toHoleKey: 'terminal_26_A', color: 'red' },
      { id: 'w_ff_qp_out', fromHoleKey: 'terminal_15_A', toHoleKey: 'terminal_28_A', color: 'green' }
    ]
  };
}
