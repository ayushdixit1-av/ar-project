export type ComponentCategory =
  | 'Microcontroller'
  | 'Breadboard'
  | 'Display'
  | 'Indicator & Discrete'
  | 'Sensor'
  | 'Actuator'
  | 'Module & Power'
  | 'Logic & IC';

export type PinType = 'VCC' | 'GND' | 'DIGITAL' | 'ANALOG' | 'PWM' | 'I2C' | 'SPI' | 'POWER' | 'OUT' | 'IN' | 'PASSIVE';

export interface ComponentPin {
  id: string;
  name: string;
  type: PinType;
  relativePos: [number, number, number];
  description: string;
  maxVoltage?: number;
  maxCurrent?: number;
  gateNumber?: number;
  gateRole?: 'A' | 'B' | 'Y' | 'VCC' | 'GND' | 'NC';
}

export interface ElectronicComponentMeta {
  id: string;
  name: string;
  category: ComponentCategory;
  tagline: string;
  description: string;
  workingPrinciple: string;
  operatingVoltage: string;
  operatingCurrent: string;
  icSeries?: string;
  gateName?: string;
  gateFunction?: string;
  gateCountText?: string;
  logicExpressionDisplay?: string;
  logicSymbolType?: 'AND' | 'OR' | 'NAND' | 'NOR' | 'NOT' | 'XOR';
  booleanEquation?: string;
  truthTableData?: { a: number; b?: number; out: number }[];
  datasheetSummary: {
    manufacturer?: string;
    icChip?: string;
    clockSpeed?: string;
    flashMemory?: string;
    interface?: string;
    logicLevels?: string;
    operatingTemp?: string;
    propagationDelay?: string;
  };
  pins: ComponentPin[];
  applications: string[];
  advantages: string[];
  disadvantages: string[];
  commonMistakes: string[];
  defaultScale?: [number, number, number];
  colorAccent?: string;
  dimensions: { x: number; y: number; z: number };
}

export interface PlacedComponent {
  id: string;
  componentMetaId: string;
  label: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  explodedOffset?: number;
  interactiveState?: {
    potentiometerVal?: number;
    buttonPressed?: boolean;
    switchAOn?: boolean;
    switchBOn?: boolean;
    ledLit?: boolean;
    ledColor?: string;
    servoAngle?: number;
    motorSpeed?: number;
    lcdTextLine1?: string;
    lcdTextLine2?: string;
    oledText?: string;
    segmentDigit?: string;
    sensorDistance?: number;
    sensorTemp?: number;
    sensorLight?: number;
  };
}

export interface JumperWire {
  id: string;
  fromComponentId: string;
  fromPinId: string;
  toComponentId: string;
  toPinId: string;
  color: string;
  gauge?: number;
  isEnergized?: boolean;
  logicState?: 0 | 1 | 'FLOAT';
  voltage?: number;
  hasError?: boolean;
  errorMessage?: string;
}

export type ViewRenderMode = 'pbr' | 'wireframe' | 'transparent' | 'explode' | 'xray';
export type CameraPreset = 'default' | 'top' | 'iso' | 'front' | 'side' | 'close' | 'ic-focus';
export type AppViewMode = 'studio' | 'circuit' | 'truth-table' | 'learning' | 'quiz' | 'assessment' | 'docs' | 'ar';

export interface TutorialStep {
  stepNumber: number;
  title: string;
  instruction: string;
  highlightComponentIds: string[];
  suggestedConnections?: { fromCompId: string; fromPin: string; toCompId: string; toPin: string; color: string }[];
  expectedOutput: string;
  codeSnippet?: string;
}

export interface InteractiveTutorial {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  icTarget?: string;
  requiredComponents: string[];
  steps: TutorialStep[];
  expectedResultDescription: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  type: 'identify-component' | 'identify-pin' | 'find-vcc-gnd' | 'multiple-choice';
  question: string;
  options?: string[];
  targetMetaId?: string;
  targetPinId?: string;
  correctAnswer: string;
  explanation: string;
  points: number;
}

export interface AssessmentTask {
  id: string;
  title: string;
  description: string;
  targetCircuitName: string;
  targetIC?: string;
  requiredComponents: string[];
  requiredConnections: { fromMeta: string; fromPin: string; toMeta: string; toPin: string }[];
  expectedTruthTable?: { a: number; b?: number; expectedOut: number }[];
  maxPoints: number;
}

export interface MultimeterState {
  mode: 'DCV' | 'LOGIC' | 'CONTINUITY';
  redProbeAttachedTo?: { componentId: string; pinId: string } | null;
  blackProbeAttachedTo?: { componentId: string; pinId: string } | null;
  displayValue: string;
  isBeeping: boolean;
}

export interface SimulationState {
  isPowered: boolean;
  systemVoltage: number;
  totalCurrentmA: number;
  hasShortCircuit: boolean;
  shortCircuitMsg?: string;
  internalState?: Record<string, any>;
  
  // Logic Inputs (10 Input Switches SW1 - SW10)
  inputs: boolean[];
  switchAOn: boolean;
  switchBOn: boolean;

  // Logic Outputs (10 Output LEDs OUT1 - OUT10)
  outputs: boolean[];
  
  // Environment inputs
  ambientTempC: number;
  distanceCm: number;
  lightLux: number;
  potentiometerVal: number;
  button1Pressed: boolean;
  autoClockPulse?: boolean;
  
  // Serial console output
  serialMonitorLog: string[];
  
  // Outputs & Evaluated States
  pinVoltages: Record<string, number>;
  evaluatedGates: Record<
    string,
    {
      gateId: string;
      icType: string;
      isPowered: boolean;
      inputA: number;
      inputB?: number;
      outputY: number;
      errorMsg?: string;
      gates?: Record<
        number,
        {
          gateNumber: number;
          inputA: number;
          inputB?: number;
          outputY: number;
          pinAId?: string;
          pinBId?: string;
          pinYId?: string;
        }
      >;
    }
  >;
  ledStates: Record<string, { lit: boolean; color?: string; brightness?: number }>;
  buzzerToneFreq: number;
  servoAngle: number;
  dcMotorRPM: number;
  lcdLine1: string;
  lcdLine2: string;
  oledText: string;
  sevenSegmentVal: string;
  
  // Multimeter
  multimeter: MultimeterState;
}
