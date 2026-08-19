export type ConverterMode = 'bin2gray' | 'gray2bin';

export type BitValue = 0 | 1;

export interface BitVector4 {
  b3: BitValue;
  b2: BitValue;
  b1: BitValue;
  b0: BitValue;
}

export type ExperimentId =
  | 'exp-logic-gates'
  | 'exp-bin2gray'
  | 'exp-gray2bin'
  | 'exp-custom-sandbox';

export interface ExperimentInfo {
  id: ExperimentId;
  title: string;
  shortName: string;
  icPreset: string;
  description: string;
  defaultMode?: ConverterMode;
}

export type ToolTab = 'placed' | 'ics' | 'io' | 'wires' | 'meter';

export type ProbeMode = 'voltage' | 'continuity' | 'logic';

export interface GateState {
  gateId: 1 | 2 | 3 | 4;
  inputA: BitValue | null;
  inputB: BitValue | null;
  output: BitValue | null;
  pinA: number;
  pinB: number;
  pinOut: number;
  expression: string;
  isActive: boolean;
}

export interface IC7486Pin {
  pinNumber: number;
  name: string;
  type: 'input' | 'output' | 'power' | 'ground' | 'unused';
  voltage: number; // 5.0 or 0.0
  logicLevel: BitValue | null;
  description: string;
  connectedTo: string;
}

export type WireCategory = 'input' | 'output' | 'internal' | 'power' | 'ground' | 'custom';

export interface WireConnection {
  id: string;
  fromNodeId?: string;
  toNodeId?: string;
  fromName: string;
  toName: string;
  fromPos?: [number, number, number];
  toPos?: [number, number, number];
  color: string;
  logicState: BitValue;
  label: string;
  description: string;
  category: WireCategory;
  isCustom?: boolean;
}

export type NodeCategory =
  | 'ic_pin'
  | 'switch'
  | 'led_anode'
  | 'led_cathode'
  | 'power'
  | 'ground'
  | 'tie_point'
  | 'custom'
  | 'input'
  | 'output';

export interface BreadboardNode {
  id: string;
  label: string;
  category: NodeCategory;
  position: [number, number, number];
  colIndex?: number;
  columnNumber?: number;
  rowLetter?: string; // 'A'..'J' or 'T+' 'T-' 'B+' 'B-'
  rowName?: string;
  pinNumber?: number;
  icId?: string;
  switchId?: string;
  ledId?: string;
  bitKey?: keyof BitVector4;
  netName?: string;
  description?: string;
}

export interface PlacedIC {
  id: string;
  icCode: string;
  name: string;
  columnStart: number; // 1..24
  position: [number, number, number];
  isPowered?: boolean;
}

export interface PlacedSwitch {
  id: string;
  label: string; // 'Switch A', 'Switch B'
  bitKey?: keyof BitVector4;
  state: BitValue;
  column: number; // 1..30
  position: [number, number, number];
}

export interface PlacedLED {
  id: string;
  label: string;
  color: 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'amber';
  state: BitValue;
  column: number; // 1..30
  position: [number, number, number];
}

export interface PlacedResistor {
  id: string;
  value: string; // '330Ω', '1kΩ', '10kΩ'
  fromNodeId: string;
  toNodeId: string;
  column: number;
  position: [number, number, number];
}

export type SelectedComponent =
  | { type: 'ic'; data: PlacedIC }
  | { type: 'switch'; data: PlacedSwitch }
  | { type: 'led'; data: PlacedLED }
  | { type: 'resistor'; data: PlacedResistor }
  | { type: 'wire'; data: WireConnection }
  | null;

export interface ICComponentInfo {
  id: string;
  code: string;
  name: string;
  family: string;
  packageType: string;
  pinsCount: number;
  category: 'Logic Gates' | 'Multiplexers & Decoders' | 'Flip-Flops & Registers';
  description: string;
  gateType: 'XOR' | 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'MUX' | 'DECODER';
  formula: string;
  application: string;
  datasheet: {
    vccPin: number;
    gndPin: number;
    supplyVoltage: string;
    propDelay: string;
    gatesCount: number;
  };
  pins: {
    pinNumber: number;
    name: string;
    type: 'input' | 'output' | 'power' | 'ground' | 'enable' | 'select' | 'unused';
    description: string;
  }[];
}

export interface CircuitCheckResult {
  isFullyWired: boolean;
  accuracyPercent: number;
  matchedConnections: number;
  totalRequired: number;
  details: {
    id: string;
    requirement: string;
    status: 'connected' | 'missing' | 'incorrect';
    fromLabel: string;
    toLabel: string;
    hint: string;
  }[];
}

export interface TruthTableRow {
  decimal: number;
  binaryStr: string;
  grayStr?: string;
  a?: BitValue;
  b?: BitValue;
  y?: BitValue;
  b3?: BitValue;
  b2?: BitValue;
  b1?: BitValue;
  b0?: BitValue;
  g3?: BitValue;
  g2?: BitValue;
  g1?: BitValue;
  g0?: BitValue;
  isCurrent: boolean;
  isVerified?: boolean;
  bitChanges?: number;
}

export interface GuidedStep {
  id: number;
  title: string;
  description: string;
  tip?: string;
  isCompleted: boolean;
}

export interface QuizQuestion {
  id: number;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  mode: ConverterMode;
}
