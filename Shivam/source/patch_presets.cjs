const fs = require('fs');

const code = `import { PlacedComponent, JumperWire } from '../types';
import { COMPONENTS_LIBRARY } from './componentsLibrary';

export interface CircuitPreset {
  id: string;
  name: string;
  description: string;
  components: PlacedComponent[];
  wires: Omit<JumperWire, 'isEnergized' | 'logicState' | 'voltage'>[];
  inputs: boolean[];
}

const baseComponents: PlacedComponent[] = [
  { id: 'comp-base', componentMetaId: 'trainer-board-base', label: 'Trainer Board Base Platform', position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
  { id: 'comp-bb', componentMetaId: 'breadboard-830', label: 'Solderless Breadboard', position: [1.3, 0.22, 0.35], rotation: [0, 0, 0], scale: [1, 1, 1] }
];

export const CIRCUIT_PRESETS: CircuitPreset[] = [
  {
    id: 'jk-flip-flop',
    name: 'JK Flip-Flop',
    description: 'A JK Flip-Flop using the custom Dual JK-FF IC. SW1 = J, SW2 = K. CLK is the Clock Pulse button. CLR is connected to VCC (Inactive).',
    inputs: [true, true, false, false, false, false, false, false, false, false],
    components: [
      ...baseComponents,
      { id: 'comp-ic-jk', componentMetaId: 'ic-jk-ff', label: 'Dual JK Flip-Flop (DIP-14)', position: [-2.63, 0.47, 0.35], rotation: [0, 0, 0], scale: [1, 1, 1] }
    ],
    wires: [
      { id: 'w-vcc', fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a', toComponentId: 'comp-bb', toPinId: 'bb-top-vcc', color: '#ef4444' },
      { id: 'w-gnd', fromComponentId: 'comp-base', fromPinId: 'tb-gnd1', toComponentId: 'comp-bb', toPinId: 'bb-top-gnd', color: '#1e293b' },
      { id: 'w-ic-vcc', fromComponentId: 'comp-bb', fromPinId: 'bb-top-vcc', toComponentId: 'comp-ic-jk', toPinId: 'pin-14', color: '#ef4444' },
      { id: 'w-ic-gnd', fromComponentId: 'comp-bb', fromPinId: 'bb-top-gnd', toComponentId: 'comp-ic-jk', toPinId: 'pin-7', color: '#1e293b' },
      { id: 'w-clr', fromComponentId: 'comp-bb', fromPinId: 'bb-top-vcc', toComponentId: 'comp-ic-jk', toPinId: 'pin-6', color: '#ef4444' },
      { id: 'w-j', fromComponentId: 'comp-base', fromPinId: 'tb-in1', toComponentId: 'comp-ic-jk', toPinId: 'pin-1', color: '#3b82f6' },
      { id: 'w-k', fromComponentId: 'comp-base', fromPinId: 'tb-in2', toComponentId: 'comp-ic-jk', toPinId: 'pin-2', color: '#eab308' },
      { id: 'w-clk', fromComponentId: 'comp-base', fromPinId: 'tb-clk', toComponentId: 'comp-ic-jk', toPinId: 'pin-3', color: '#ec4899' },
      { id: 'w-q', fromComponentId: 'comp-ic-jk', fromPinId: 'pin-4', toComponentId: 'comp-base', toPinId: 'tb-out1', color: '#22c55e' },
      { id: 'w-q-inv', fromComponentId: 'comp-ic-jk', fromPinId: 'pin-5', toComponentId: 'comp-base', toPinId: 'tb-out2', color: '#8b5cf6' }
    ]
  },
  {
    id: 'd-flip-flop',
    name: 'D Flip-Flop',
    description: 'A D Flip-Flop using the 7474 IC. SW1 = D. CLK is the Clock Pulse button. CLR and PR are connected to VCC (Inactive).',
    inputs: [true, false, false, false, false, false, false, false, false, false],
    components: [
      ...baseComponents,
      { id: 'comp-ic-d', componentMetaId: 'ic-7474-d', label: '7474 Dual D Flip-Flop', position: [-2.63, 0.47, 0.35], rotation: [0, 0, 0], scale: [1, 1, 1] }
    ],
    wires: [
      { id: 'w-vcc', fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a', toComponentId: 'comp-bb', toPinId: 'bb-top-vcc', color: '#ef4444' },
      { id: 'w-gnd', fromComponentId: 'comp-base', fromPinId: 'tb-gnd1', toComponentId: 'comp-bb', toPinId: 'bb-top-gnd', color: '#1e293b' },
      { id: 'w-ic-vcc', fromComponentId: 'comp-bb', fromPinId: 'bb-top-vcc', toComponentId: 'comp-ic-d', toPinId: 'pin-14', color: '#ef4444' },
      { id: 'w-ic-gnd', fromComponentId: 'comp-bb', fromPinId: 'bb-top-gnd', toComponentId: 'comp-ic-d', toPinId: 'pin-7', color: '#1e293b' },
      { id: 'w-clr', fromComponentId: 'comp-bb', fromPinId: 'bb-top-vcc', toComponentId: 'comp-ic-d', toPinId: 'pin-1', color: '#ef4444' },
      { id: 'w-pr', fromComponentId: 'comp-bb', fromPinId: 'bb-top-vcc', toComponentId: 'comp-ic-d', toPinId: 'pin-4', color: '#ef4444' },
      { id: 'w-d', fromComponentId: 'comp-base', fromPinId: 'tb-in1', toComponentId: 'comp-ic-d', toPinId: 'pin-2', color: '#3b82f6' },
      { id: 'w-clk', fromComponentId: 'comp-base', fromPinId: 'tb-clk', toComponentId: 'comp-ic-d', toPinId: 'pin-3', color: '#ec4899' },
      { id: 'w-q', fromComponentId: 'comp-ic-d', fromPinId: 'pin-5', toComponentId: 'comp-base', toPinId: 'tb-out1', color: '#22c55e' },
      { id: 'w-q-inv', fromComponentId: 'comp-ic-d', fromPinId: 'pin-6', toComponentId: 'comp-base', toPinId: 'tb-out2', color: '#8b5cf6' }
    ]
  },
  {
    id: 'sr-flip-flop',
    name: 'SR Flip-Flop',
    description: 'An SR Flip-Flop. SW1 = S, SW2 = R. CLK is the Clock Pulse button.',
    inputs: [true, false, false, false, false, false, false, false, false, false],
    components: [
      ...baseComponents,
      { id: 'comp-ic-sr', componentMetaId: 'ic-sr-ff', label: 'Dual SR Flip-Flop', position: [-2.63, 0.47, 0.35], rotation: [0, 0, 0], scale: [1, 1, 1] }
    ],
    wires: [
      { id: 'w-vcc', fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a', toComponentId: 'comp-bb', toPinId: 'bb-top-vcc', color: '#ef4444' },
      { id: 'w-gnd', fromComponentId: 'comp-base', fromPinId: 'tb-gnd1', toComponentId: 'comp-bb', toPinId: 'bb-top-gnd', color: '#1e293b' },
      { id: 'w-ic-vcc', fromComponentId: 'comp-bb', fromPinId: 'bb-top-vcc', toComponentId: 'comp-ic-sr', toPinId: 'pin-14', color: '#ef4444' },
      { id: 'w-ic-gnd', fromComponentId: 'comp-bb', fromPinId: 'bb-top-gnd', toComponentId: 'comp-ic-sr', toPinId: 'pin-7', color: '#1e293b' },
      { id: 'w-s', fromComponentId: 'comp-base', fromPinId: 'tb-in1', toComponentId: 'comp-ic-sr', toPinId: 'pin-1', color: '#3b82f6' },
      { id: 'w-r', fromComponentId: 'comp-base', fromPinId: 'tb-in2', toComponentId: 'comp-ic-sr', toPinId: 'pin-2', color: '#eab308' },
      { id: 'w-clk', fromComponentId: 'comp-base', fromPinId: 'tb-clk', toComponentId: 'comp-ic-sr', toPinId: 'pin-3', color: '#ec4899' },
      { id: 'w-q', fromComponentId: 'comp-ic-sr', fromPinId: 'pin-4', toComponentId: 'comp-base', toPinId: 'tb-out1', color: '#22c55e' },
      { id: 'w-q-inv', fromComponentId: 'comp-ic-sr', fromPinId: 'pin-5', toComponentId: 'comp-base', toPinId: 'tb-out2', color: '#8b5cf6' }
    ]
  },
  {
    id: 't-flip-flop',
    name: 'T Flip-Flop',
    description: 'A T Flip-Flop. SW1 = T. CLK is the Clock Pulse button. CLR is connected to VCC (Inactive).',
    inputs: [true, false, false, false, false, false, false, false, false, false],
    components: [
      ...baseComponents,
      { id: 'comp-ic-t', componentMetaId: 'ic-t-ff', label: 'Dual T Flip-Flop', position: [-2.63, 0.47, 0.35], rotation: [0, 0, 0], scale: [1, 1, 1] }
    ],
    wires: [
      { id: 'w-vcc', fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a', toComponentId: 'comp-bb', toPinId: 'bb-top-vcc', color: '#ef4444' },
      { id: 'w-gnd', fromComponentId: 'comp-base', fromPinId: 'tb-gnd1', toComponentId: 'comp-bb', toPinId: 'bb-top-gnd', color: '#1e293b' },
      { id: 'w-ic-vcc', fromComponentId: 'comp-bb', fromPinId: 'bb-top-vcc', toComponentId: 'comp-ic-t', toPinId: 'pin-14', color: '#ef4444' },
      { id: 'w-ic-gnd', fromComponentId: 'comp-bb', fromPinId: 'bb-top-gnd', toComponentId: 'comp-ic-t', toPinId: 'pin-7', color: '#1e293b' },
      { id: 'w-clr', fromComponentId: 'comp-bb', fromPinId: 'bb-top-vcc', toComponentId: 'comp-ic-t', toPinId: 'pin-3', color: '#ef4444' },
      { id: 'w-t', fromComponentId: 'comp-base', fromPinId: 'tb-in1', toComponentId: 'comp-ic-t', toPinId: 'pin-1', color: '#3b82f6' },
      { id: 'w-clk', fromComponentId: 'comp-base', fromPinId: 'tb-clk', toComponentId: 'comp-ic-t', toPinId: 'pin-2', color: '#ec4899' },
      { id: 'w-q', fromComponentId: 'comp-ic-t', fromPinId: 'pin-4', toComponentId: 'comp-base', toPinId: 'tb-out1', color: '#22c55e' },
      { id: 'w-q-inv', fromComponentId: 'comp-ic-t', fromPinId: 'pin-5', toComponentId: 'comp-base', toPinId: 'tb-out2', color: '#8b5cf6' }
    ]
  }
];
`;

fs.writeFileSync('src/data/presets.ts', code);
