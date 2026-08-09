import { ICDef, ICType, LogicState } from '../types/electronics';

export const IC_DEFINITIONS: Record<ICType, ICDef> = {
  '7408': {
    type: '7408',
    name: 'IC 7408',
    fullName: 'Quad 2-Input AND Gate',
    description: 'Contains four independent 2-input AND logic gates. Output is HIGH only if both inputs are HIGH.',
    pinCount: 14,
    vccPin: 14,
    gndPin: 7,
    pins: {
      1: { pinNumber: 1, name: '1A', type: 'INPUT', gateIndex: 1 },
      2: { pinNumber: 2, name: '1B', type: 'INPUT', gateIndex: 1 },
      3: { pinNumber: 3, name: '1Y', type: 'OUTPUT', gateIndex: 1 },
      4: { pinNumber: 4, name: '2A', type: 'INPUT', gateIndex: 2 },
      5: { pinNumber: 5, name: '2B', type: 'INPUT', gateIndex: 2 },
      6: { pinNumber: 6, name: '2Y', type: 'OUTPUT', gateIndex: 2 },
      7: { pinNumber: 7, name: 'GND', type: 'GROUND' },
      8: { pinNumber: 8, name: '3Y', type: 'OUTPUT', gateIndex: 3 },
      9: { pinNumber: 9, name: '3A', type: 'INPUT', gateIndex: 3 },
      10: { pinNumber: 10, name: '3B', type: 'INPUT', gateIndex: 3 },
      11: { pinNumber: 11, name: '4Y', type: 'OUTPUT', gateIndex: 4 },
      12: { pinNumber: 12, name: '4A', type: 'INPUT', gateIndex: 4 },
      13: { pinNumber: 13, name: '4B', type: 'INPUT', gateIndex: 4 },
      14: { pinNumber: 14, name: 'VCC', type: 'POWER' },
    },
    logicFunction: (inputs) => {
      const a = inputs['A'];
      const b = inputs['B'];
      if (a === 'FLOATING' || b === 'FLOATING') return 'FLOATING';
      return (a === 'HIGH' && b === 'HIGH') ? 'HIGH' : 'LOW';
    },
  },
  '7400': {
    type: '7400',
    name: 'IC 7400',
    fullName: 'Quad 2-Input NAND Gate',
    description: 'Contains four independent 2-input NAND logic gates. Output is LOW only if both inputs are HIGH.',
    pinCount: 14,
    vccPin: 14,
    gndPin: 7,
    pins: {
      1: { pinNumber: 1, name: '1A', type: 'INPUT', gateIndex: 1 },
      2: { pinNumber: 2, name: '1B', type: 'INPUT', gateIndex: 1 },
      3: { pinNumber: 3, name: '1Y', type: 'OUTPUT', gateIndex: 1 },
      4: { pinNumber: 4, name: '2A', type: 'INPUT', gateIndex: 2 },
      5: { pinNumber: 5, name: '2B', type: 'INPUT', gateIndex: 2 },
      6: { pinNumber: 6, name: '2Y', type: 'OUTPUT', gateIndex: 2 },
      7: { pinNumber: 7, name: 'GND', type: 'GROUND' },
      8: { pinNumber: 8, name: '3Y', type: 'OUTPUT', gateIndex: 3 },
      9: { pinNumber: 9, name: '3A', type: 'INPUT', gateIndex: 3 },
      10: { pinNumber: 10, name: '3B', type: 'INPUT', gateIndex: 3 },
      11: { pinNumber: 11, name: '4Y', type: 'OUTPUT', gateIndex: 4 },
      12: { pinNumber: 12, name: '4A', type: 'INPUT', gateIndex: 4 },
      13: { pinNumber: 13, name: '4B', type: 'INPUT', gateIndex: 4 },
      14: { pinNumber: 14, name: 'VCC', type: 'POWER' },
    },
    logicFunction: (inputs) => {
      const a = inputs['A'];
      const b = inputs['B'];
      if (a === 'FLOATING' || b === 'FLOATING') return 'FLOATING';
      return (a === 'HIGH' && b === 'HIGH') ? 'LOW' : 'HIGH';
    },
  },
  '7432': {
    type: '7432',
    name: 'IC 7432',
    fullName: 'Quad 2-Input OR Gate',
    description: 'Contains four independent 2-input OR logic gates. Output is HIGH if at least one input is HIGH.',
    pinCount: 14,
    vccPin: 14,
    gndPin: 7,
    pins: {
      1: { pinNumber: 1, name: '1A', type: 'INPUT', gateIndex: 1 },
      2: { pinNumber: 2, name: '1B', type: 'INPUT', gateIndex: 1 },
      3: { pinNumber: 3, name: '1Y', type: 'OUTPUT', gateIndex: 1 },
      4: { pinNumber: 4, name: '2A', type: 'INPUT', gateIndex: 2 },
      5: { pinNumber: 5, name: '2B', type: 'INPUT', gateIndex: 2 },
      6: { pinNumber: 6, name: '2Y', type: 'OUTPUT', gateIndex: 2 },
      7: { pinNumber: 7, name: 'GND', type: 'GROUND' },
      8: { pinNumber: 8, name: '3Y', type: 'OUTPUT', gateIndex: 3 },
      9: { pinNumber: 9, name: '3A', type: 'INPUT', gateIndex: 3 },
      10: { pinNumber: 10, name: '3B', type: 'INPUT', gateIndex: 3 },
      11: { pinNumber: 11, name: '4Y', type: 'OUTPUT', gateIndex: 4 },
      12: { pinNumber: 12, name: '4A', type: 'INPUT', gateIndex: 4 },
      13: { pinNumber: 13, name: '4B', type: 'INPUT', gateIndex: 4 },
      14: { pinNumber: 14, name: 'VCC', type: 'POWER' },
    },
    logicFunction: (inputs) => {
      const a = inputs['A'];
      const b = inputs['B'];
      if (a === 'FLOATING' || b === 'FLOATING') return 'FLOATING';
      return (a === 'HIGH' || b === 'HIGH') ? 'HIGH' : 'LOW';
    },
  },
  '7402': {
    type: '7402',
    name: 'IC 7402',
    fullName: 'Quad 2-Input NOR Gate',
    description: 'Contains four independent 2-input NOR logic gates. Output is HIGH only if both inputs are LOW.',
    pinCount: 14,
    vccPin: 14,
    gndPin: 7,
    pins: {
      1: { pinNumber: 1, name: '1A', type: 'INPUT', gateIndex: 1 },
      2: { pinNumber: 2, name: '1B', type: 'INPUT', gateIndex: 1 },
      3: { pinNumber: 3, name: '1Y', type: 'OUTPUT', gateIndex: 1 },
      4: { pinNumber: 4, name: '2A', type: 'INPUT', gateIndex: 2 },
      5: { pinNumber: 5, name: '2B', type: 'INPUT', gateIndex: 2 },
      6: { pinNumber: 6, name: '2Y', type: 'OUTPUT', gateIndex: 2 },
      7: { pinNumber: 7, name: 'GND', type: 'GROUND' },
      8: { pinNumber: 8, name: '3Y', type: 'OUTPUT', gateIndex: 3 },
      9: { pinNumber: 9, name: '3A', type: 'INPUT', gateIndex: 3 },
      10: { pinNumber: 10, name: '3B', type: 'INPUT', gateIndex: 3 },
      11: { pinNumber: 11, name: '4Y', type: 'OUTPUT', gateIndex: 4 },
      12: { pinNumber: 12, name: '4A', type: 'INPUT', gateIndex: 4 },
      13: { pinNumber: 13, name: '4B', type: 'INPUT', gateIndex: 4 },
      14: { pinNumber: 14, name: 'VCC', type: 'POWER' },
    },
    logicFunction: (inputs) => {
      const a = inputs['A'];
      const b = inputs['B'];
      if (a === 'FLOATING' || b === 'FLOATING') return 'FLOATING';
      return (a === 'LOW' && b === 'LOW') ? 'HIGH' : 'LOW';
    },
  },
  '7486': {
    type: '7486',
    name: 'IC 7486',
    fullName: 'Quad 2-Input Exclusive-OR (XOR) Gate',
    description: 'Contains four independent 2-input XOR logic gates. Output is HIGH when inputs differ.',
    pinCount: 14,
    vccPin: 14,
    gndPin: 7,
    pins: {
      1: { pinNumber: 1, name: '1A', type: 'INPUT', gateIndex: 1 },
      2: { pinNumber: 2, name: '1B', type: 'INPUT', gateIndex: 1 },
      3: { pinNumber: 3, name: '1Y', type: 'OUTPUT', gateIndex: 1 },
      4: { pinNumber: 4, name: '2A', type: 'INPUT', gateIndex: 2 },
      5: { pinNumber: 5, name: '2B', type: 'INPUT', gateIndex: 2 },
      6: { pinNumber: 6, name: '2Y', type: 'OUTPUT', gateIndex: 2 },
      7: { pinNumber: 7, name: 'GND', type: 'GROUND' },
      8: { pinNumber: 8, name: '3Y', type: 'OUTPUT', gateIndex: 3 },
      9: { pinNumber: 9, name: '3A', type: 'INPUT', gateIndex: 3 },
      10: { pinNumber: 10, name: '3B', type: 'INPUT', gateIndex: 3 },
      11: { pinNumber: 11, name: '4Y', type: 'OUTPUT', gateIndex: 4 },
      12: { pinNumber: 12, name: '4A', type: 'INPUT', gateIndex: 4 },
      13: { pinNumber: 13, name: '4B', type: 'INPUT', gateIndex: 4 },
      14: { pinNumber: 14, name: 'VCC', type: 'POWER' },
    },
    logicFunction: (inputs) => {
      const a = inputs['A'];
      const b = inputs['B'];
      if (a === 'FLOATING' || b === 'FLOATING') return 'FLOATING';
      return (a !== b) ? 'HIGH' : 'LOW';
    },
  },
  '7404': {
    type: '7404',
    name: 'IC 7404',
    fullName: 'Hex Inverter (NOT Gate)',
    description: 'Contains six independent NOT logic gates. Inverts the input signal.',
    pinCount: 14,
    vccPin: 14,
    gndPin: 7,
    pins: {
      1: { pinNumber: 1, name: '1A', type: 'INPUT', gateIndex: 1 },
      2: { pinNumber: 2, name: '1Y', type: 'OUTPUT', gateIndex: 1 },
      3: { pinNumber: 3, name: '2A', type: 'INPUT', gateIndex: 2 },
      4: { pinNumber: 4, name: '2Y', type: 'OUTPUT', gateIndex: 2 },
      5: { pinNumber: 5, name: '3A', type: 'INPUT', gateIndex: 3 },
      6: { pinNumber: 6, name: '3Y', type: 'OUTPUT', gateIndex: 3 },
      7: { pinNumber: 7, name: 'GND', type: 'GROUND' },
      8: { pinNumber: 8, name: '4Y', type: 'OUTPUT', gateIndex: 4 },
      9: { pinNumber: 9, name: '4A', type: 'INPUT', gateIndex: 4 },
      10: { pinNumber: 10, name: '5Y', type: 'OUTPUT', gateIndex: 5 },
      11: { pinNumber: 11, name: '5A', type: 'INPUT', gateIndex: 5 },
      12: { pinNumber: 12, name: '6Y', type: 'OUTPUT', gateIndex: 6 },
      13: { pinNumber: 13, name: '6A', type: 'INPUT', gateIndex: 6 },
      14: { pinNumber: 14, name: 'VCC', type: 'POWER' },
    },
    logicFunction: (inputs) => {
      const a = inputs['A'];
      if (a === 'FLOATING') return 'FLOATING';
      return a === 'HIGH' ? 'LOW' : 'HIGH';
    },
  },
};
