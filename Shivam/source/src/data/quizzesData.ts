import { QuizQuestion, AssessmentTask } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    title: 'Question 1: Component Identification',
    type: 'identify-component',
    question: 'Click on the component that performs logical AND operation on two binary input signals.',
    targetMetaId: 'ic-7408-and',
    correctAnswer: '7408 Quad 2-Input AND Gate IC',
    explanation: 'The 7408 IC contains 4 independent 2-input AND gates in a 14-pin DIP package. Output Pin 3 is HIGH (1) only when Pin 1 AND Pin 2 are both HIGH (1).',
    points: 10,
  },
  {
    id: 'q2',
    title: 'Question 2: Power Pin Identification',
    type: 'identify-pin',
    question: 'Identify the VCC Power Supply Pin on a standard 14-pin DIP logic IC.',
    targetMetaId: 'ic-7408-and',
    targetPinId: 'pin-14',
    correctAnswer: 'Pin 14 (VCC)',
    explanation: 'Pin 14 on standard 74xx series logic chips (7400, 7402, 7404, 7408, 7432, 7486) connects to +5.0V DC VCC power rail. Pin 7 connects to Ground (0V).',
    points: 10,
  },
  {
    id: 'q3',
    title: 'Question 3: Universal Logic Gate',
    type: 'multiple-choice',
    question: 'Why is the 7400 NAND gate referred to as a "Universal Logic Gate" in digital electronics design?',
    options: [
      'Because it operates from any voltage between 0V and 24V',
      'Because any boolean logic function (AND, OR, NOT, XOR) can be constructed exclusively using NAND gates',
      'Because it connects directly to USB ports without power regulation',
      'Because it has 14 input pins'
    ],
    correctAnswer: 'Because any boolean logic function (AND, OR, NOT, XOR) can be constructed exclusively using NAND gates',
    explanation: 'NAND logic is functionally complete. A NOT gate is formed by tying both NAND inputs together. An AND gate is formed by inverting a NAND output, and an OR gate is formed using De Morgan’s laws.',
    points: 15,
  },
];

export const ASSESSMENT_TASKS: AssessmentTask[] = [
  {
    id: 'task-01-and',
    title: 'Practical Lab 1: 7408 AND Gate Truth Table Verification',
    description: 'Wire Pin 14 of 7408 IC to +5V VCC, Pin 7 to GND, Pin 1 to Switch A, Pin 2 to Switch B, and Pin 3 to LED Anode.',
    targetCircuitName: '7408 Logic AND Verification Circuit',
    targetIC: 'ic-7408-and',
    requiredComponents: ['trainer-board-base', 'ic-7408-and', 'led-red-5mm'],
    requiredConnections: [
      { fromMeta: 'trainer-board-base', fromPin: 'tb-vcc5a', toMeta: 'ic-7408-and', toPin: 'pin-14' },
      { fromMeta: 'trainer-board-base', fromPin: 'tb-gnd1', toMeta: 'ic-7408-and', toPin: 'pin-7' },
      { fromMeta: 'trainer-board-base', fromPin: 'tb-swA', toMeta: 'ic-7408-and', toPin: 'pin-1' },
      { fromMeta: 'trainer-board-base', fromPin: 'tb-swB', toMeta: 'ic-7408-and', toPin: 'pin-2' },
      { fromMeta: 'ic-7408-and', fromPin: 'pin-3', toMeta: 'led-red-5mm', toPin: 'led-a' },
    ],
    expectedTruthTable: [
      { a: 0, b: 0, expectedOut: 0 },
      { a: 0, b: 1, expectedOut: 0 },
      { a: 1, b: 0, expectedOut: 0 },
      { a: 1, b: 1, expectedOut: 1 },
    ],
    maxPoints: 100,
  },
  {
    id: 'task-02-nand',
    title: 'Practical Lab 2: 7400 NAND Gate Universal Logic Test',
    description: 'Wire Pin 14 of 7400 IC to +5V VCC, Pin 7 to GND, Pin 1 to Switch A, Pin 2 to Switch B, and Pin 3 to LED Anode.',
    targetCircuitName: '7400 Universal NAND Circuit',
    targetIC: 'ic-7400-nand',
    requiredComponents: ['trainer-board-base', 'ic-7400-nand', 'led-red-5mm'],
    requiredConnections: [
      { fromMeta: 'trainer-board-base', fromPin: 'tb-vcc5a', toMeta: 'ic-7400-nand', toPin: 'pin-14' },
      { fromMeta: 'trainer-board-base', fromPin: 'tb-gnd1', toMeta: 'ic-7400-nand', toPin: 'pin-7' },
      { fromMeta: 'trainer-board-base', fromPin: 'tb-swA', toMeta: 'ic-7400-nand', toPin: 'pin-1' },
      { fromMeta: 'trainer-board-base', fromPin: 'tb-swB', toMeta: 'ic-7400-nand', toPin: 'pin-2' },
      { fromMeta: 'ic-7400-nand', fromPin: 'pin-3', toMeta: 'led-red-5mm', toPin: 'led-a' },
    ],
    expectedTruthTable: [
      { a: 0, b: 0, expectedOut: 1 },
      { a: 0, b: 1, expectedOut: 1 },
      { a: 1, b: 0, expectedOut: 1 },
      { a: 1, b: 1, expectedOut: 0 },
    ],
    maxPoints: 100,
  },
];
