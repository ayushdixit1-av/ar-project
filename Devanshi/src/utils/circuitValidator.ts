import { WireConnection, ConverterMode, CircuitCheckResult, BreadboardNode } from '../types';
import { getBreadboardNodes } from './threeHelpers';

export function getDefaultPresetWires(mode: ConverterMode): WireConnection[] {
  const nodes = getBreadboardNodes();
  const nodeMap = new Map<string, BreadboardNode>(nodes.map((n) => [n.id, n]));

  const getPos = (id: string): [number, number, number] => {
    return nodeMap.get(id)?.position || [0, 0.32, 0];
  };

  if (mode === 'bin2gray') {
    return [
      {
        id: 'wire-vcc',
        fromNodeId: 'vcc-top-2',
        toNodeId: 'ic-pin-14',
        fromName: 'Top +5V VCC Rail',
        toName: 'IC Pin 14 (VCC)',
        fromPos: getPos('vcc-top-2'),
        toPos: getPos('ic-pin-14'),
        color: '#ef4444', // Red
        logicState: 1,
        label: '+5V VCC Supply',
        description: 'Supplies regulated +5V power to Pin 14 of the IC.',
        category: 'power',
      },
      {
        id: 'wire-gnd',
        fromNodeId: 'gnd-bot-2',
        toNodeId: 'ic-pin-7',
        fromName: 'Bottom GND Rail',
        toName: 'IC Pin 7 (GND)',
        fromPos: getPos('gnd-bot-2'),
        toPos: getPos('ic-pin-7'),
        color: '#1e293b', // Black / Dark Slate
        logicState: 0,
        label: '0V Ground',
        description: 'Connects Pin 7 of the IC to common ground (0V).',
        category: 'ground',
      },
      {
        id: 'wire-b3-direct',
        fromNodeId: 'sw-3',
        toNodeId: 'led-3-anode',
        fromName: 'Switch SW3 (B3)',
        toName: 'LED 3 (G3 Anode)',
        fromPos: getPos('sw-3'),
        toPos: getPos('led-3-anode'),
        color: '#eab308', // Yellow
        logicState: 1,
        label: 'G3 = B3 (Direct MSB)',
        description: 'Direct MSB pass-through from Input B3 to Output G3.',
        category: 'input',
      },
      {
        id: 'wire-b3-to-gate1',
        fromNodeId: 'sw-3',
        toNodeId: 'ic-pin-1',
        fromName: 'Switch SW3 (B3)',
        toName: 'IC Pin 1 (1A)',
        fromPos: getPos('sw-3'),
        toPos: getPos('ic-pin-1'),
        color: '#eab308',
        logicState: 1,
        label: 'B3 → Gate 1 Input A',
        description: 'Feeds Input B3 to Gate 1 Input A (Pin 1).',
        category: 'input',
      },
      {
        id: 'wire-b2-to-gate1',
        fromNodeId: 'sw-2',
        toNodeId: 'ic-pin-2',
        fromName: 'Switch SW2 (B2)',
        toName: 'IC Pin 2 (1B)',
        fromPos: getPos('sw-2'),
        toPos: getPos('ic-pin-2'),
        color: '#3b82f6', // Blue
        logicState: 0,
        label: 'B2 → Gate 1 Input B',
        description: 'Feeds Input B2 to Gate 1 Input B (Pin 2).',
        category: 'input',
      },
      {
        id: 'wire-gate1-to-g2',
        fromNodeId: 'ic-pin-3',
        toNodeId: 'led-2-anode',
        fromName: 'IC Pin 3 (1Y)',
        toName: 'LED 2 (G2 Anode)',
        fromPos: getPos('ic-pin-3'),
        toPos: getPos('led-2-anode'),
        color: '#06b6d4', // Cyan
        logicState: 1,
        label: 'G2 = B3 ⊕ B2 (Output)',
        description: 'Connects Gate 1 XOR output (Pin 3) to LED G2 Anode.',
        category: 'output',
      },
      {
        id: 'wire-b2-to-gate2',
        fromNodeId: 'sw-2',
        toNodeId: 'ic-pin-4',
        fromName: 'Switch SW2 (B2)',
        toName: 'IC Pin 4 (2A)',
        fromPos: getPos('sw-2'),
        toPos: getPos('ic-pin-4'),
        color: '#3b82f6',
        logicState: 0,
        label: 'B2 → Gate 2 Input A',
        description: 'Feeds Input B2 to Gate 2 Input A (Pin 4).',
        category: 'input',
      },
      {
        id: 'wire-b1-to-gate2',
        fromNodeId: 'sw-1',
        toNodeId: 'ic-pin-5',
        fromName: 'Switch SW1 (B1)',
        toName: 'IC Pin 5 (2B)',
        fromPos: getPos('sw-1'),
        toPos: getPos('ic-pin-5'),
        color: '#22c55e', // Green
        logicState: 1,
        label: 'B1 → Gate 2 Input B',
        description: 'Feeds Input B1 to Gate 2 Input B (Pin 5).',
        category: 'input',
      },
      {
        id: 'wire-gate2-to-g1',
        fromNodeId: 'ic-pin-6',
        toNodeId: 'led-1-anode',
        fromName: 'IC Pin 6 (2Y)',
        toName: 'LED 1 (G1 Anode)',
        fromPos: getPos('ic-pin-6'),
        toPos: getPos('led-1-anode'),
        color: '#a855f7', // Purple
        logicState: 1,
        label: 'G1 = B2 ⊕ B1 (Output)',
        description: 'Connects Gate 2 XOR output (Pin 6) to LED G1 Anode.',
        category: 'output',
      },
      {
        id: 'wire-b1-to-gate3',
        fromNodeId: 'sw-1',
        toNodeId: 'ic-pin-9',
        fromName: 'Switch SW1 (B1)',
        toName: 'IC Pin 9 (3A)',
        fromPos: getPos('sw-1'),
        toPos: getPos('ic-pin-9'),
        color: '#22c55e',
        logicState: 1,
        label: 'B1 → Gate 3 Input A',
        description: 'Feeds Input B1 to Gate 3 Input A (Pin 9).',
        category: 'input',
      },
      {
        id: 'wire-b0-to-gate3',
        fromNodeId: 'sw-0',
        toNodeId: 'ic-pin-10',
        fromName: 'Switch SW0 (B0)',
        toName: 'IC Pin 10 (3B)',
        fromPos: getPos('sw-0'),
        toPos: getPos('ic-pin-10'),
        color: '#f97316', // Orange
        logicState: 0,
        label: 'B0 → Gate 3 Input B',
        description: 'Feeds Input B0 to Gate 3 Input B (Pin 10).',
        category: 'input',
      },
      {
        id: 'wire-gate3-to-g0',
        fromNodeId: 'ic-pin-8',
        toNodeId: 'led-0-anode',
        fromName: 'IC Pin 8 (3Y)',
        toName: 'LED 0 (G0 Anode)',
        fromPos: getPos('ic-pin-8'),
        toPos: getPos('led-0-anode'),
        color: '#10b981', // Emerald
        logicState: 1,
        label: 'G0 = B1 ⊕ B0 (Output)',
        description: 'Connects Gate 3 XOR output (Pin 8) to LED G0 Anode.',
        category: 'output',
      },
    ];
  }

  // Gray to Binary preset wiring
  return [
    {
      id: 'wire-vcc',
      fromNodeId: 'vcc-top-2',
      toNodeId: 'ic-pin-14',
      fromName: 'Top +5V VCC Rail',
      toName: 'IC Pin 14 (VCC)',
      fromPos: getPos('vcc-top-2'),
      toPos: getPos('ic-pin-14'),
      color: '#ef4444',
      logicState: 1,
      label: '+5V VCC Supply',
      description: 'Supplies regulated +5V power to Pin 14 of the IC.',
      category: 'power',
    },
    {
      id: 'wire-gnd',
      fromNodeId: 'gnd-bot-2',
      toNodeId: 'ic-pin-7',
      fromName: 'Bottom GND Rail',
      toName: 'IC Pin 7 (GND)',
      fromPos: getPos('gnd-bot-2'),
      toPos: getPos('ic-pin-7'),
      color: '#1e293b',
      logicState: 0,
      label: '0V Ground',
      description: 'Connects Pin 7 of the IC to common ground (0V).',
      category: 'ground',
    },
    {
      id: 'wire-g3-direct',
      fromNodeId: 'sw-3',
      toNodeId: 'led-3-anode',
      fromName: 'Switch SW3 (G3)',
      toName: 'LED 3 (B3 Anode)',
      fromPos: getPos('sw-3'),
      toPos: getPos('led-3-anode'),
      color: '#eab308',
      logicState: 1,
      label: 'B3 = G3 (Direct MSB)',
      description: 'Direct MSB pass-through from Input G3 to Output B3.',
      category: 'input',
    },
    {
      id: 'wire-g3-to-gate1',
      fromNodeId: 'sw-3',
      toNodeId: 'ic-pin-1',
      fromName: 'Switch SW3 (G3)',
      toName: 'IC Pin 1 (1A)',
      fromPos: getPos('sw-3'),
      toPos: getPos('ic-pin-1'),
      color: '#eab308',
      logicState: 1,
      label: 'B3 (G3) → Gate 1 Input A',
      description: 'Feeds MSB B3 into Gate 1 Input A (Pin 1).',
      category: 'input',
    },
    {
      id: 'wire-g2-to-gate1',
      fromNodeId: 'sw-2',
      toNodeId: 'ic-pin-2',
      fromName: 'Switch SW2 (G2)',
      toName: 'IC Pin 2 (1B)',
      fromPos: getPos('sw-2'),
      toPos: getPos('ic-pin-2'),
      color: '#3b82f6',
      logicState: 0,
      label: 'G2 → Gate 1 Input B',
      description: 'Feeds Input G2 into Gate 1 Input B (Pin 2).',
      category: 'input',
    },
    {
      id: 'wire-gate1-to-b2',
      fromNodeId: 'ic-pin-3',
      toNodeId: 'led-2-anode',
      fromName: 'IC Pin 3 (1Y)',
      toName: 'LED 2 (B2 Anode)',
      fromPos: getPos('ic-pin-3'),
      toPos: getPos('led-2-anode'),
      color: '#06b6d4',
      logicState: 1,
      label: 'B2 = B3 ⊕ G2 (Output)',
      description: 'Connects Gate 1 output to LED B2 Anode.',
      category: 'output',
    },
    {
      id: 'wire-cascade-b2-to-gate2',
      fromNodeId: 'ic-pin-3',
      toNodeId: 'ic-pin-4',
      fromName: 'IC Pin 3 (1Y)',
      toName: 'IC Pin 4 (2A)',
      fromPos: getPos('ic-pin-3'),
      toPos: getPos('ic-pin-4'),
      color: '#06b6d4',
      logicState: 1,
      label: 'Cascade B2 → Gate 2 Input A',
      description: 'Cascades computed output B2 from Pin 3 into Gate 2 Pin 4.',
      category: 'internal',
    },
    {
      id: 'wire-g1-to-gate2',
      fromNodeId: 'sw-1',
      toNodeId: 'ic-pin-5',
      fromName: 'Switch SW1 (G1)',
      toName: 'IC Pin 5 (2B)',
      fromPos: getPos('sw-1'),
      toPos: getPos('ic-pin-5'),
      color: '#22c55e',
      logicState: 1,
      label: 'G1 → Gate 2 Input B',
      description: 'Feeds Input G1 into Gate 2 Input B (Pin 5).',
      category: 'input',
    },
    {
      id: 'wire-gate2-to-b1',
      fromNodeId: 'ic-pin-6',
      toNodeId: 'led-1-anode',
      fromName: 'IC Pin 6 (2Y)',
      toName: 'LED 1 (B1 Anode)',
      fromPos: getPos('ic-pin-6'),
      toPos: getPos('led-1-anode'),
      color: '#a855f7',
      logicState: 1,
      label: 'B1 = B2 ⊕ G1 (Output)',
      description: 'Connects Gate 2 output to LED B1 Anode.',
      category: 'output',
    },
    {
      id: 'wire-cascade-b1-to-gate3',
      fromNodeId: 'ic-pin-6',
      toNodeId: 'ic-pin-9',
      fromName: 'IC Pin 6 (2Y)',
      toName: 'IC Pin 9 (3A)',
      fromPos: getPos('ic-pin-6'),
      toPos: getPos('ic-pin-9'),
      color: '#a855f7',
      logicState: 1,
      label: 'Cascade B1 → Gate 3 Input A',
      description: 'Cascades computed output B1 from Pin 6 into Gate 3 Pin 9.',
      category: 'internal',
    },
    {
      id: 'wire-g0-to-gate3',
      fromNodeId: 'sw-0',
      toNodeId: 'ic-pin-10',
      fromName: 'Switch SW0 (G0)',
      toName: 'IC Pin 10 (3B)',
      fromPos: getPos('sw-0'),
      toPos: getPos('ic-pin-10'),
      color: '#f97316',
      logicState: 0,
      label: 'G0 → Gate 3 Input B',
      description: 'Feeds Input G0 into Gate 3 Input B (Pin 10).',
      category: 'input',
    },
    {
      id: 'wire-gate3-to-b0',
      fromNodeId: 'ic-pin-8',
      toNodeId: 'led-0-anode',
      fromName: 'IC Pin 8 (3Y)',
      toName: 'LED 0 (B0 Anode)',
      fromPos: getPos('ic-pin-8'),
      toPos: getPos('led-0-anode'),
      color: '#10b981',
      logicState: 1,
      label: 'B0 = B1 ⊕ G0 (Output)',
      description: 'Connects Gate 3 output to LED B0 Anode.',
      category: 'output',
    },
  ];
}

// Check whether a set of user custom wires matches the required schematic
export function validateCircuitWiring(
  wires: WireConnection[],
  mode: ConverterMode,
  icCode = '7486'
): CircuitCheckResult {
  // Check if any wire connects between two endpoints (unordered pair check)
  const hasConnection = (a: string, b: string): boolean => {
    return wires.some((w) => {
      const from = w.fromNodeId || '';
      const to = w.toNodeId || '';
      // Support matching generalized node prefixes for power/gnd rails
      const matchA =
        from === a ||
        (a === 'vcc' && from.startsWith('vcc')) ||
        (a === 'gnd' && from.startsWith('gnd'));
      const matchB =
        to === b || (b === 'vcc' && to.startsWith('vcc')) || (b === 'gnd' && to.startsWith('gnd'));
      const matchARev =
        to === a ||
        (a === 'vcc' && to.startsWith('vcc')) ||
        (a === 'gnd' && to.startsWith('gnd'));
      const matchBRev =
        from === b ||
        (b === 'vcc' && from.startsWith('vcc')) ||
        (b === 'gnd' && from.startsWith('gnd'));

      return (matchA && matchB) || (matchARev && matchBRev);
    });
  };

  const requirements =
    mode === 'bin2gray'
      ? [
          {
            id: 'req-vcc',
            requirement: 'Power Supply (+5V VCC)',
            fromId: 'vcc',
            toId: 'ic-pin-14',
            fromLabel: '+5V Power Rail',
            toLabel: 'IC Pin 14 (VCC)',
            hint: 'Connect +5V Rail to Pin 14 of the IC',
          },
          {
            id: 'req-gnd',
            requirement: 'Ground Connection (0V GND)',
            fromId: 'gnd',
            toId: 'ic-pin-7',
            fromLabel: 'Ground Rail',
            toLabel: 'IC Pin 7 (GND)',
            hint: 'Connect Ground Rail to Pin 7 of the IC',
          },
          {
            id: 'req-msb-direct',
            requirement: 'MSB Pass-Through (G3 = B3)',
            fromId: 'sw-3',
            toId: 'led-3-anode',
            fromLabel: 'Switch SW3 (B3)',
            toLabel: 'LED 3 (G3 Anode)',
            hint: 'Connect Switch SW3 directly to LED 3 Anode',
          },
          {
            id: 'req-gate1-a',
            requirement: 'Gate 1 Input A (B3)',
            fromId: 'sw-3',
            toId: 'ic-pin-1',
            fromLabel: 'Switch SW3 (B3)',
            toLabel: 'IC Pin 1 (1A)',
            hint: 'Connect Switch SW3 to IC Pin 1',
          },
          {
            id: 'req-gate1-b',
            requirement: 'Gate 1 Input B (B2)',
            fromId: 'sw-2',
            toId: 'ic-pin-2',
            fromLabel: 'Switch SW2 (B2)',
            toLabel: 'IC Pin 2 (1B)',
            hint: 'Connect Switch SW2 to IC Pin 2',
          },
          {
            id: 'req-gate1-out',
            requirement: 'Gate 1 Output G2 (Pin 3 → LED 2)',
            fromId: 'ic-pin-3',
            toId: 'led-2-anode',
            fromLabel: 'IC Pin 3 (1Y)',
            toLabel: 'LED 2 (G2 Anode)',
            hint: 'Connect IC Pin 3 to LED 2 Anode',
          },
          {
            id: 'req-gate2-a',
            requirement: 'Gate 2 Input A (B2)',
            fromId: 'sw-2',
            toId: 'ic-pin-4',
            fromLabel: 'Switch SW2 (B2)',
            toLabel: 'IC Pin 4 (2A)',
            hint: 'Connect Switch SW2 to IC Pin 4',
          },
          {
            id: 'req-gate2-b',
            requirement: 'Gate 2 Input B (B1)',
            fromId: 'sw-1',
            toId: 'ic-pin-5',
            fromLabel: 'Switch SW1 (B1)',
            toLabel: 'IC Pin 5 (2B)',
            hint: 'Connect Switch SW1 to IC Pin 5',
          },
          {
            id: 'req-gate2-out',
            requirement: 'Gate 2 Output G1 (Pin 6 → LED 1)',
            fromId: 'ic-pin-6',
            toId: 'led-1-anode',
            fromLabel: 'IC Pin 6 (2Y)',
            toLabel: 'LED 1 (G1 Anode)',
            hint: 'Connect IC Pin 6 to LED 1 Anode',
          },
          {
            id: 'req-gate3-a',
            requirement: 'Gate 3 Input A (B1)',
            fromId: 'sw-1',
            toId: 'ic-pin-9',
            fromLabel: 'Switch SW1 (B1)',
            toLabel: 'IC Pin 9 (3A)',
            hint: 'Connect Switch SW1 to IC Pin 9',
          },
          {
            id: 'req-gate3-b',
            requirement: 'Gate 3 Input B (B0)',
            fromId: 'sw-0',
            toId: 'ic-pin-10',
            fromLabel: 'Switch SW0 (B0)',
            toLabel: 'IC Pin 10 (3B)',
            hint: 'Connect Switch SW0 to IC Pin 10',
          },
          {
            id: 'req-gate3-out',
            requirement: 'Gate 3 Output G0 (Pin 8 → LED 0)',
            fromId: 'ic-pin-8',
            toId: 'led-0-anode',
            fromLabel: 'IC Pin 8 (3Y)',
            toLabel: 'LED 0 (G0 Anode)',
            hint: 'Connect IC Pin 8 to LED 0 Anode',
          },
        ]
      : [
          {
            id: 'req-vcc',
            requirement: 'Power Supply (+5V VCC)',
            fromId: 'vcc',
            toId: 'ic-pin-14',
            fromLabel: '+5V Power Rail',
            toLabel: 'IC Pin 14 (VCC)',
            hint: 'Connect +5V Rail to Pin 14 of the IC',
          },
          {
            id: 'req-gnd',
            requirement: 'Ground Connection (0V GND)',
            fromId: 'gnd',
            toId: 'ic-pin-7',
            fromLabel: 'Ground Rail',
            toLabel: 'IC Pin 7 (GND)',
            hint: 'Connect Ground Rail to Pin 7 of the IC',
          },
          {
            id: 'req-msb-direct',
            requirement: 'MSB Pass-Through (B3 = G3)',
            fromId: 'sw-3',
            toId: 'led-3-anode',
            fromLabel: 'Switch SW3 (G3)',
            toLabel: 'LED 3 (B3 Anode)',
            hint: 'Connect Switch SW3 directly to LED 3 Anode',
          },
          {
            id: 'req-gate1-a',
            requirement: 'Gate 1 Input A (B3)',
            fromId: 'sw-3',
            toId: 'ic-pin-1',
            fromLabel: 'Switch SW3 (G3)',
            toLabel: 'IC Pin 1 (1A)',
            hint: 'Connect Switch SW3 (G3) to IC Pin 1',
          },
          {
            id: 'req-gate1-b',
            requirement: 'Gate 1 Input B (G2)',
            fromId: 'sw-2',
            toId: 'ic-pin-2',
            fromLabel: 'Switch SW2 (G2)',
            toLabel: 'IC Pin 2 (1B)',
            hint: 'Connect Switch SW2 (G2) to IC Pin 2',
          },
          {
            id: 'req-gate1-out',
            requirement: 'Gate 1 Output B2 (Pin 3 → LED 2)',
            fromId: 'ic-pin-3',
            toId: 'led-2-anode',
            fromLabel: 'IC Pin 3 (1Y)',
            toLabel: 'LED 2 (B2 Anode)',
            hint: 'Connect IC Pin 3 to LED 2 Anode',
          },
          {
            id: 'req-cascade-1',
            requirement: 'Cascade Output B2 to Gate 2',
            fromId: 'ic-pin-3',
            toId: 'ic-pin-4',
            fromLabel: 'IC Pin 3 (1Y)',
            toLabel: 'IC Pin 4 (2A)',
            hint: 'Connect IC Pin 3 (Output B2) to IC Pin 4 (Gate 2 Input)',
          },
          {
            id: 'req-gate2-b',
            requirement: 'Gate 2 Input B (G1)',
            fromId: 'sw-1',
            toId: 'ic-pin-5',
            fromLabel: 'Switch SW1 (G1)',
            toLabel: 'IC Pin 5 (2B)',
            hint: 'Connect Switch SW1 (G1) to IC Pin 5',
          },
          {
            id: 'req-gate2-out',
            requirement: 'Gate 2 Output B1 (Pin 6 → LED 1)',
            fromId: 'ic-pin-6',
            toId: 'led-1-anode',
            fromLabel: 'IC Pin 6 (2Y)',
            toLabel: 'LED 1 (B1 Anode)',
            hint: 'Connect IC Pin 6 to LED 1 Anode',
          },
          {
            id: 'req-cascade-2',
            requirement: 'Cascade Output B1 to Gate 3',
            fromId: 'ic-pin-6',
            toId: 'ic-pin-9',
            fromLabel: 'IC Pin 6 (2Y)',
            toLabel: 'IC Pin 9 (3A)',
            hint: 'Connect IC Pin 6 (Output B1) to IC Pin 9 (Gate 3 Input)',
          },
          {
            id: 'req-gate3-b',
            requirement: 'Gate 3 Input B (G0)',
            fromId: 'sw-0',
            toId: 'ic-pin-10',
            fromLabel: 'Switch SW0 (G0)',
            toLabel: 'IC Pin 10 (3B)',
            hint: 'Connect Switch SW0 (G0) to IC Pin 10',
          },
          {
            id: 'req-gate3-out',
            requirement: 'Gate 3 Output B0 (Pin 8 → LED 0)',
            fromId: 'ic-pin-8',
            toId: 'led-0-anode',
            fromLabel: 'IC Pin 8 (3Y)',
            toLabel: 'LED 0 (B0 Anode)',
            hint: 'Connect IC Pin 8 to LED 0 Anode',
          },
        ];

  let matchedCount = 0;
  const details = requirements.map((req) => {
    const isConnected = hasConnection(req.fromId, req.toId);
    if (isConnected) matchedCount++;
    return {
      id: req.id,
      requirement: req.requirement,
      status: isConnected ? ('connected' as const) : ('missing' as const),
      fromLabel: req.fromLabel,
      toLabel: req.toLabel,
      hint: req.hint,
    };
  });

  const accuracyPercent = Math.round((matchedCount / requirements.length) * 100);

  return {
    isFullyWired: matchedCount === requirements.length && icCode === '7486',
    accuracyPercent,
    matchedConnections: matchedCount,
    totalRequired: requirements.length,
    details,
  };
}
