export type LogicState = 'HIGH' | 'LOW' | 'FLOATING' | 'SHORT_CIRCUIT';

export type ICType = '7400' | '7402' | '7404' | '7408' | '7432' | '7486';

export interface ICPin {
  pinNumber: number; // 1 to 14
  name: string; // e.g. "1A", "1B", "1Y", "VCC", "GND"
  type: 'INPUT' | 'OUTPUT' | 'POWER' | 'GROUND' | 'NC';
  gateIndex?: number;
}

export interface ICDef {
  type: ICType;
  name: string;
  fullName: string;
  description: string;
  pinCount: number; // 14
  vccPin: number; // 14
  gndPin: number; // 7
  pins: Record<number, ICPin>;
  logicFunction: (inputs: Record<string, LogicState>) => LogicState;
}

export type WireColor = 'red' | 'black' | 'yellow' | 'green' | 'blue' | 'white' | 'orange' | 'purple';

export interface BreadboardHoleId {
  type: 'rail' | 'terminal';
  railId?: 'TOP_POS' | 'TOP_NEG' | 'BOTTOM_POS' | 'BOTTOM_NEG';
  col?: number; // 1 to 30 (or 63)
  row?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
}

export interface Wire {
  id: string;
  fromHoleKey: string;
  toHoleKey: string;
  color: WireColor;
}

export interface PlacedIC {
  id: string;
  type: ICType;
  startCol: number; // IC occupies cols startCol to startCol + 6 (for 14 pins, 7 pins on top F..J, 7 on bottom A..E)
  // Pin 1 is at (startCol, 'J')
  // Pin 7 is at (startCol + 6, 'J')
  // Pin 8 is at (startCol + 6, 'F')
  // Pin 14 is at (startCol, 'F')
}

export interface PlacedSwitch {
  id: string;
  label: string; // "Input A", "Input B"
  state: LogicState; // 'HIGH' | 'LOW'
  outputHoleKey: string;
}

export interface PlacedLED {
  id: string;
  color: 'red' | 'green' | 'yellow' | 'blue';
  anodeHoleKey: string;
  cathodeHoleKey: string;
  isOn: boolean;
  isBurnt?: boolean;
}

export interface PlacedResistor {
  id: string;
  resistance: number; // 330
  fromHoleKey: string;
  toHoleKey: string;
}

export interface MultimeterProbe {
  redHoleKey: string | null;
  blackHoleKey: string | null;
  mode: 'VOLTAGE' | 'CONTINUITY' | 'LOGIC';
}

export interface DiagnosticError {
  id: string;
  severity: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  componentId?: string;
}

export interface CircuitState {
  powerSupplyOn: boolean;
  powerSupplyVoltage: number;
  ics: PlacedIC[];
  wires: Wire[];
  switches: PlacedSwitch[];
  leds: PlacedLED[];
  resistors: PlacedResistor[];
}

export interface TruthTableRow {
  inputs: Record<string, number>; // e.g. { A: 0, B: 0 }
  expectedOutput: number; // 0 or 1
  observedOutput: number | null; // 0 or 1 or null
  verified: boolean;
}
