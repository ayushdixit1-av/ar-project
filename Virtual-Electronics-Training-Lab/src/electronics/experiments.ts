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
};

export interface GuidedStep {
  stepNumber: number;
  title: string;
  instruction: string;
  hint: string;
  isCompleted: (state: CircuitState, simResult?: any) => boolean;
}

export function getGuidedStepsForIC(icType: ICType): GuidedStep[] {
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
