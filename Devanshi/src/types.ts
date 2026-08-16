export type ConverterMode = 'bin2gray' | 'gray2bin';

export type BitValue = 0 | 1;

export interface BitVector4 {
  b3: BitValue;
  b2: BitValue;
  b1: BitValue;
  b0: BitValue;
}

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

export interface WireConnection {
  id: string;
  fromName: string;
  toName: string;
  color: string;
  logicState: BitValue;
  label: string;
  description: string;
  category: 'input' | 'output' | 'internal' | 'power' | 'ground';
}

export interface TruthTableRow {
  decimal: number;
  binaryStr: string;
  grayStr: string;
  b3: BitValue;
  b2: BitValue;
  b1: BitValue;
  b0: BitValue;
  g3: BitValue;
  g2: BitValue;
  g1: BitValue;
  g0: BitValue;
  isCurrent: boolean;
  bitChanges: number; // Number of bits changed from previous row
}

export interface QuizQuestion {
  id: number;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  mode: ConverterMode;
}
