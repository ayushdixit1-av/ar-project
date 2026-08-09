import { CircuitState, DiagnosticError, LogicState, PlacedIC, Wire } from '../types/electronics';
import { IC_DEFINITIONS } from './icDefinitions';

export function getNetIdForHoleKey(holeKey: string): string {
  // holeKey format examples:
  // "terminal_15_A", "rail_TOP_POS_10"
  if (holeKey.startsWith('rail_')) {
    const parts = holeKey.split('_'); // ['rail', 'TOP', 'POS', '10']
    return `net_rail_${parts[1]}_${parts[2]}`;
  }
  if (holeKey.startsWith('terminal_')) {
    const parts = holeKey.split('_'); // ['terminal', '15', 'A']
    const col = parts[1];
    const row = parts[2];
    if (['A', 'B', 'C', 'D', 'E'].includes(row)) {
      return `net_top_${col}`;
    } else {
      return `net_bottom_${col}`;
    }
  }
  return `net_custom_${holeKey}`;
}

export function getHoleKeyForICPin(ic: PlacedIC, pinNumber: number): string {
  // DIP-14 pin positions:
  // Pins 1..7 are plugged into Row E (net_top_${col}), columns startCol .. startCol + 6
  // Pins 8..14 are plugged into Row F (net_bottom_${col}), columns startCol + 6 .. startCol
  if (pinNumber >= 1 && pinNumber <= 7) {
    const col = ic.startCol + (pinNumber - 1);
    return `terminal_${col}_E`;
  } else if (pinNumber >= 8 && pinNumber <= 14) {
    const col = ic.startCol + (14 - pinNumber);
    return `terminal_${col}_F`;
  }
  return '';
}

export interface SimulationResult {
  netStates: Record<string, LogicState>;
  netVoltages: Record<string, number>; // in Volts
  diagnostics: DiagnosticError[];
  isShortCircuit: boolean;
  icPowerStatus: Record<string, { powered: boolean; vccOk: boolean; gndOk: boolean }>;
  ledStates: Record<string, { isOn: boolean; isBurnt: boolean }>;
}

export class CircuitSimulator {
  static simulate(state: CircuitState): SimulationResult {
    const diagnostics: DiagnosticError[] = [];
    const netStates: Record<string, LogicState> = {};
    const vccVoltage = state.powerSupplyVoltage !== undefined ? state.powerSupplyVoltage : 5.0;
    const netVoltages: Record<string, number> = {};
    const icPowerStatus: Record<string, { powered: boolean; vccOk: boolean; gndOk: boolean }> = {};
    const ledStates: Record<string, { isOn: boolean; isBurnt: boolean }> = {};

    // 1. Build Disjoint Set (Union-Find) for connected electrical nets
    const parent: Record<string, string> = {};

    function find(i: string): string {
      if (!parent[i]) parent[i] = i;
      if (parent[i] === i) return i;
      parent[i] = find(parent[i]);
      return parent[i];
    }

    function union(i: string, j: string) {
      const rootI = find(i);
      const rootJ = find(j);
      if (rootI !== rootJ) {
        parent[rootI] = rootJ;
      }
    }

    // Connect power supply terminals to active VCC/GND source nets if power supply is ON
    if (state.powerSupplyOn) {
      union('net_custom_supply_VCC', 'net_supply_vcc');
      union('net_custom_supply_GND', 'net_supply_gnd');
    }

    // Connect wires
    state.wires.forEach((wire) => {
      const net1 = getNetIdForHoleKey(wire.fromHoleKey);
      const net2 = getNetIdForHoleKey(wire.toHoleKey);
      union(net1, net2);
    });

    // Connect resistors (pass logic through directly)
    state.resistors.forEach((res) => {
      const net1 = getNetIdForHoleKey(res.fromHoleKey);
      const net2 = getNetIdForHoleKey(res.toHoleKey);
      union(net1, net2);
    });

    // Determine drivers for each root net
    const netDrivers: Record<string, Set<LogicState>> = {};

    function addDriver(holeKey: string, val: LogicState) {
      const netId = getNetIdForHoleKey(holeKey);
      const root = find(netId);
      if (!netDrivers[root]) netDrivers[root] = new Set();
      netDrivers[root].add(val);
    }

    // Power supply drivers
    if (state.powerSupplyOn) {
      const vccRoot = find('net_supply_vcc');
      const gndRoot = find('net_supply_gnd');

      if (!netDrivers[vccRoot]) netDrivers[vccRoot] = new Set();
      netDrivers[vccRoot].add('HIGH');

      if (!netDrivers[gndRoot]) netDrivers[gndRoot] = new Set();
      netDrivers[gndRoot].add('LOW');

      if (vccRoot === gndRoot) {
        diagnostics.push({
          id: 'short_circuit',
          severity: 'error',
          title: 'SHORT CIRCUIT DETECTED!',
          message: '+5V Power Supply is connected directly to Ground! Turn off power or check wiring.',
        });
        return {
          netStates: {},
          netVoltages: {},
          diagnostics,
          isShortCircuit: true,
          icPowerStatus: {},
          ledStates: {},
        };
      }
    }

    // Switches drivers
    state.switches.forEach((sw) => {
      addDriver(sw.outputHoleKey, sw.state);
    });

    // Iterative logic solving (up to 5 passes for IC gate propagation)
    for (let pass = 0; pass < 5; pass++) {
      state.ics.forEach((ic) => {
        const icDef = IC_DEFINITIONS[ic.type];
        if (!icDef) return;

        // Check Power Pins
        const vccHole = getHoleKeyForICPin(ic, icDef.vccPin);
        const gndHole = getHoleKeyForICPin(ic, icDef.gndPin);

        const vccRoot = find(getNetIdForHoleKey(vccHole));
        const gndRoot = find(getNetIdForHoleKey(gndHole));

        const vccDrivers = netDrivers[vccRoot];
        const gndDrivers = netDrivers[gndRoot];

        const vccOk = !!(vccDrivers && vccDrivers.has('HIGH'));
        const gndOk = !!(gndDrivers && gndDrivers.has('LOW'));
        const isPowered = vccOk && gndOk;

        icPowerStatus[ic.id] = { powered: isPowered, vccOk, gndOk };

        if (!isPowered && pass === 0) {
          let msg = `${icDef.name} is not powered. `;
          if (!vccOk) msg += `Pin ${icDef.vccPin} (VCC) needs +5V. `;
          if (!gndOk) msg += `Pin ${icDef.gndPin} (GND) needs Ground.`;
          diagnostics.push({
            id: `ic_unpowered_${ic.id}`,
            severity: 'warning',
            title: `${icDef.name} Unpowered`,
            message: msg,
            componentId: ic.id,
          });
        }

        if (isPowered) {
          // Process gates
          const gateCount = ic.type === '7404' ? 6 : 4;
          for (let g = 1; g <= gateCount; g++) {
            if (ic.type === '7404') {
              // 1 -> 2, 3 -> 4, etc.
              const inputPin = g * 2 - 1;
              const outputPin = g * 2;
              const inHole = getHoleKeyForICPin(ic, inputPin);
              const outHole = getHoleKeyForICPin(ic, outputPin);

              const inRoot = find(getNetIdForHoleKey(inHole));
              const inDrivers = netDrivers[inRoot];

              let inState: LogicState = 'FLOATING';
              if (inDrivers && inDrivers.has('HIGH')) inState = 'HIGH';
              else if (inDrivers && inDrivers.has('LOW')) inState = 'LOW';

              const outState = icDef.logicFunction({ A: inState });
              if (outState !== 'FLOATING') {
                addDriver(outHole, outState);
              }
            } else {
              // 2-input logic gates
              const pinA = g === 1 ? 1 : g === 2 ? 4 : g === 3 ? 9 : 12;
              const pinB = g === 1 ? 2 : g === 2 ? 5 : g === 3 ? 10 : 13;
              const pinY = g === 1 ? 3 : g === 2 ? 6 : g === 3 ? 8 : 11;

              const holeA = getHoleKeyForICPin(ic, pinA);
              const holeB = getHoleKeyForICPin(ic, pinB);
              const holeY = getHoleKeyForICPin(ic, pinY);

              const rootA = find(getNetIdForHoleKey(holeA));
              const rootB = find(getNetIdForHoleKey(holeB));

              const driversA = netDrivers[rootA];
              const driversB = netDrivers[rootB];

              let stateA: LogicState = 'FLOATING';
              if (driversA && driversA.has('HIGH')) stateA = 'HIGH';
              else if (driversA && driversA.has('LOW')) stateA = 'LOW';

              let stateB: LogicState = 'FLOATING';
              if (driversB && driversB.has('HIGH')) stateB = 'HIGH';
              else if (driversB && driversB.has('LOW')) stateB = 'LOW';

              const outState = icDef.logicFunction({ A: stateA, B: stateB });
              if (outState !== 'FLOATING') {
                addDriver(holeY, outState);
              }
            }
          }
        }
      });
    }

    // Resolve final net logic states and voltages
    const allKnownNets = new Set<string>();
    Object.keys(parent).forEach((k) => allKnownNets.add(find(k)));

    // Map all holes to their net state
    for (let col = 1; col <= 30; col++) {
      ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].forEach((row) => {
        const holeKey = `terminal_${col}_${row}`;
        const root = find(getNetIdForHoleKey(holeKey));
        const drivers = netDrivers[root];
        if (drivers && drivers.has('HIGH') && drivers.has('LOW')) {
          netStates[holeKey] = 'SHORT_CIRCUIT';
          netVoltages[holeKey] = vccVoltage / 2;
        } else if (drivers && drivers.has('HIGH')) {
          netStates[holeKey] = 'HIGH';
          netVoltages[holeKey] = vccVoltage;
        } else if (drivers && drivers.has('LOW')) {
          netStates[holeKey] = 'LOW';
          netVoltages[holeKey] = 0.0;
        } else {
          netStates[holeKey] = 'FLOATING';
          netVoltages[holeKey] = NaN;
        }
      });
    }

    // Power rails net states
    ['TOP_POS', 'TOP_NEG', 'BOTTOM_POS', 'BOTTOM_NEG'].forEach((rail) => {
      for (let col = 1; col <= 30; col++) {
        const holeKey = `rail_${rail}_${col}`;
        const root = find(getNetIdForHoleKey(holeKey));
        const drivers = netDrivers[root];
        if (drivers && drivers.has('HIGH')) {
          netStates[holeKey] = 'HIGH';
          netVoltages[holeKey] = vccVoltage;
        } else if (drivers && drivers.has('LOW')) {
          netStates[holeKey] = 'LOW';
          netVoltages[holeKey] = 0.0;
        } else {
          netStates[holeKey] = 'FLOATING';
          netVoltages[holeKey] = NaN;
        }
      }
    });

    // Evaluate LEDs
    state.leds.forEach((led) => {
      const anodeState = netStates[led.anodeHoleKey] || 'FLOATING';
      const cathodeState = netStates[led.cathodeHoleKey] || 'FLOATING';

      const isOn = anodeState === 'HIGH' && cathodeState === 'LOW';

      // Check if LED is connected across VCC and GND without a resistor
      let hasResistor = false;
      state.resistors.forEach((res) => {
        const r1 = getNetIdForHoleKey(res.fromHoleKey);
        const r2 = getNetIdForHoleKey(res.toHoleKey);
        const aNet = getNetIdForHoleKey(led.anodeHoleKey);
        const cNet = getNetIdForHoleKey(led.cathodeHoleKey);
        if (r1 === aNet || r2 === aNet || r1 === cNet || r2 === cNet) {
          hasResistor = true;
        }
      });

      if (isOn && !hasResistor) {
        diagnostics.push({
          id: `led_no_resistor_${led.id}`,
          severity: 'warning',
          title: 'Missing Resistor Warning',
          message: 'LED is powered directly without a 330Ω current-limiting resistor!',
          componentId: led.id,
        });
      }

      ledStates[led.id] = { isOn, isBurnt: false };
    });

    return {
      netStates,
      netVoltages,
      diagnostics,
      isShortCircuit: false,
      icPowerStatus,
      ledStates,
    };
  }
}
