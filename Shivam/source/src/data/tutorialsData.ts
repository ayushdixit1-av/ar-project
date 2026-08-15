import { InteractiveTutorial } from '../types';

export const GUIDED_TUTORIALS: InteractiveTutorial[] = [
  {
    id: 'lab-01-and-gate',
    title: 'Lab 1: 7408 Quad 2-Input AND Gate Verification',
    category: 'Basic Logic Gates',
    difficulty: 'Beginner',
    description: 'Learn how to power a standard 7408 TTL DIP IC on the breadboard, connect inputs to toggle switches SW1/SW2, and route the output to the logic LED monitor.',
    requiredComponents: ['trainer-board-base', 'breadboard-830', 'ic-7408-and'],
    steps: [
      {
        stepNumber: 1,
        title: 'Power Rails (VCC & GND)',
        instruction: 'Connect +5V (tb-vcc1) to Pin 14 of the 7408 IC, and GND (tb-gnd1) to Pin 7.',
        highlightComponentIds: ['trainer-board-base', 'ic-7408-and'],
        suggestedConnections: [
          { fromCompId: 'comp-base', fromPin: 'tb-vcc1', toCompId: 'comp-ic-7408', toPin: 'pin-14', color: '#ef4444' },
          { fromCompId: 'comp-base', fromPin: 'tb-gnd1', toCompId: 'comp-ic-7408', toPin: 'pin-7', color: '#3b82f6' },
        ],
        expectedOutput: '7408 DIP IC energized with regulated 5.0V DC.',
      },
      {
        stepNumber: 2,
        title: 'Wire Logic Input Switches (SW1 & SW2)',
        instruction: 'Connect Switch 1 (tb-in1) to Gate 1 Input A (Pin 1), and Switch 2 (tb-in2) to Gate 1 Input B (Pin 2).',
        highlightComponentIds: ['trainer-board-base', 'ic-7408-and'],
        suggestedConnections: [
          { fromCompId: 'comp-base', fromPin: 'tb-in1', toCompId: 'comp-ic-7408', toPin: 'pin-1', color: '#eab308' },
          { fromCompId: 'comp-base', fromPin: 'tb-in2', toCompId: 'comp-ic-7408', toPin: 'pin-2', color: '#22c55e' },
        ],
        expectedOutput: 'Binary input test signals routed from trainer board toggle switches.',
      },
      {
        stepNumber: 3,
        title: 'Connect Output Indicator LED',
        instruction: 'Connect Gate 1 Output Y (Pin 3) to LED OUT1 (tb-out1) on the top monitor panel.',
        highlightComponentIds: ['ic-7408-and', 'trainer-board-base'],
        suggestedConnections: [
          { fromCompId: 'comp-ic-7408', fromPin: 'pin-3', toCompId: 'comp-base', toPin: 'tb-out1', color: '#ef4444' },
        ],
        expectedOutput: 'LED OUT1 lights up ONLY when both SW1=1 and SW2=1 (Truth Table: 00=0, 01=0, 10=0, 11=1).',
      },
    ],
    expectedResultDescription: 'The 7408 AND gate satisfies the Boolean equation Y = A · B. Output Pin 3 drives LED OUT1 HIGH when both inputs are active.',
  },
  {
    id: 'lab-02-nand-gate',
    title: 'Lab 2: 7400 Quad 2-Input NAND Gate (Universal Gate)',
    category: 'Universal Logic',
    difficulty: 'Beginner',
    description: 'Verify the inverted AND response of the 7400 NAND gate. Observe that the output is HIGH (1) for all input combinations except when both inputs are HIGH (11 -> 0).',
    requiredComponents: ['trainer-board-base', 'breadboard-830', 'ic-7400-nand'],
    steps: [
      {
        stepNumber: 1,
        title: 'Power the 7400 IC',
        instruction: 'Connect +5V (tb-vcc1) to Pin 14 and GND (tb-gnd1) to Pin 7 of the 7400 IC.',
        highlightComponentIds: ['trainer-board-base', 'ic-7400-nand'],
        suggestedConnections: [
          { fromCompId: 'comp-base', fromPin: 'tb-vcc1', toCompId: 'comp-ic-7400', toPin: 'pin-14', color: '#ef4444' },
          { fromCompId: 'comp-base', fromPin: 'tb-gnd1', toCompId: 'comp-ic-7400', toPin: 'pin-7', color: '#3b82f6' },
        ],
        expectedOutput: '7400 NAND Gate IC powered.',
      },
      {
        stepNumber: 2,
        title: 'Connect Inputs and Output',
        instruction: 'Connect SW1 (tb-in1) to Pin 1, SW2 (tb-in2) to Pin 2, and Output Pin 3 to LED OUT1 (tb-out1).',
        highlightComponentIds: ['trainer-board-base', 'ic-7400-nand'],
        suggestedConnections: [
          { fromCompId: 'comp-base', fromPin: 'tb-in1', toCompId: 'comp-ic-7400', toPin: 'pin-1', color: '#eab308' },
          { fromCompId: 'comp-base', fromPin: 'tb-in2', toCompId: 'comp-ic-7400', toPin: 'pin-2', color: '#22c55e' },
          { fromCompId: 'comp-ic-7400', fromPin: 'pin-3', toCompId: 'comp-base', toPin: 'tb-out1', color: '#ef4444' },
        ],
        expectedOutput: 'LED OUT1 is ON for (0,0), (0,1), (1,0) and turns OFF only when (1,1).',
      },
    ],
    expectedResultDescription: 'NAND truth table verified: Y = (A · B)’.',
  },
  {
    id: 'lab-03-xor-gate',
    title: 'Lab 3: 7486 Quad 2-Input Exclusive-OR (XOR) Gate',
    category: 'Arithmetic & Parity',
    difficulty: 'Intermediate',
    description: 'Explore the modulo-2 adder gate essential for binary half-adders, full-adders, and parity checking.',
    requiredComponents: ['trainer-board-base', 'breadboard-830', 'ic-7486-xor'],
    steps: [
      {
        stepNumber: 1,
        title: 'Power & Grounding',
        instruction: 'Connect +5V to Pin 14 and GND to Pin 7 of the 7486 IC.',
        highlightComponentIds: ['trainer-board-base', 'ic-7486-xor'],
        suggestedConnections: [
          { fromCompId: 'comp-base', fromPin: 'tb-vcc1', toCompId: 'comp-ic-7486', toPin: 'pin-14', color: '#ef4444' },
          { fromCompId: 'comp-base', fromPin: 'tb-gnd1', toCompId: 'comp-ic-7486', toPin: 'pin-7', color: '#3b82f6' },
        ],
        expectedOutput: '7486 IC powered.',
      },
      {
        stepNumber: 2,
        title: 'Wire XOR Inputs and Output Monitor',
        instruction: 'Connect SW1 to Pin 1, SW2 to Pin 2, and Pin 3 to LED OUT1.',
        highlightComponentIds: ['trainer-board-base', 'ic-7486-xor'],
        suggestedConnections: [
          { fromCompId: 'comp-base', fromPin: 'tb-in1', toCompId: 'comp-ic-7486', toPin: 'pin-1', color: '#eab308' },
          { fromCompId: 'comp-base', fromPin: 'tb-in2', toCompId: 'comp-ic-7486', toPin: 'pin-2', color: '#22c55e' },
          { fromCompId: 'comp-ic-7486', fromPin: 'pin-3', toCompId: 'comp-base', toPin: 'tb-out1', color: '#ef4444' },
        ],
        expectedOutput: 'LED OUT1 lights up when inputs are DIFFERENT (01 or 10), and stays OFF when inputs are identical (00 or 11).',
      },
    ],
    expectedResultDescription: 'XOR truth table verified: Y = A ⊕ B.',
  },
];
