import { PlacedComponent, JumperWire, SimulationState, MultimeterState } from '../types';
import { COMPONENTS_LIBRARY } from '../data/componentsLibrary';

export interface EvaluatedCircuit {
  updatedSimState: SimulationState;
  updatedWires: JumperWire[];
  shortCircuitDetected: boolean;
  shortCircuitMsg?: string;
  gateOutputs: Record<
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
}

/**
 * Real-Time Digital Logic & Pin Level Circuit Engine
 */
export function evaluateDigitalCircuit(
  placedComponents: PlacedComponent[],
  wires: JumperWire[],
  currentSimState: SimulationState
): EvaluatedCircuit {
  const simState: SimulationState = { ...currentSimState };
  const updatedWires: JumperWire[] = wires.map((w) => ({ ...w, isEnergized: false, logicState: 0, voltage: 0 }));
  const pinVoltages: Record<string, number> = {};
  const gateOutputs: EvaluatedCircuit['gateOutputs'] = {};

  if (!simState.isPowered) {
    simState.hasShortCircuit = false;
    simState.shortCircuitMsg = undefined;
    simState.totalCurrentmA = 0;
    simState.evaluatedGates = {};
    return { updatedSimState: simState, updatedWires, shortCircuitDetected: false, gateOutputs };
  }

  // Ensure inputs and outputs arrays exist with length 10
  if (!simState.inputs || simState.inputs.length < 10) {
    const defaultInputs = [simState.switchAOn ?? false, simState.switchBOn ?? false, false, false, false, false, false, false, false, false];
    simState.inputs = defaultInputs;
  }
  if (!simState.outputs || simState.outputs.length < 10) {
    simState.outputs = new Array(10).fill(false);
  }

  // Sync switchAOn and switchBOn with inputs[0] and inputs[1]
  simState.switchAOn = simState.inputs[0];
  simState.switchBOn = simState.inputs[1];

  // 1. Identify Power Terminals on Main Board
  const trainerBoard = placedComponents.find((c) => c.componentMetaId === 'trainer-board-base');
  
  // Power voltages
  const VCC_VOLTAGE = 5.0;
  const GND_VOLTAGE = 0.0;

  // Initialize fixed source pin voltages for Trainer Board
  if (trainerBoard) {
    pinVoltages[`${trainerBoard.id}:tb-vcc1`] = VCC_VOLTAGE;
    pinVoltages[`${trainerBoard.id}:tb-vcc2`] = VCC_VOLTAGE;
    pinVoltages[`${trainerBoard.id}:tb-vcc5a`] = VCC_VOLTAGE;
    pinVoltages[`${trainerBoard.id}:tb-vcc5b`] = VCC_VOLTAGE;
    pinVoltages[`${trainerBoard.id}:tb-gnd1`] = GND_VOLTAGE;
    pinVoltages[`${trainerBoard.id}:tb-gnd2`] = GND_VOLTAGE;

    // Apply voltages for 10 Input Switches SW1 - SW10
    for (let i = 0; i < 10; i++) {
      const isHigh = simState.inputs[i];
      const volt = isHigh ? VCC_VOLTAGE : GND_VOLTAGE;
      pinVoltages[`${trainerBoard.id}:tb-in${i + 1}`] = volt;
    }
    pinVoltages[`${trainerBoard.id}:tb-swA`] = simState.inputs[0] ? VCC_VOLTAGE : GND_VOLTAGE;
    pinVoltages[`${trainerBoard.id}:tb-swB`] = simState.inputs[1] ? VCC_VOLTAGE : GND_VOLTAGE;
  }

  // Check Breadboard connections
  const breadboard = placedComponents.find((c) => c.componentMetaId === 'breadboard-830');
  if (breadboard) {
    // Breadboard internal buses transmit voltage along rows
  }

  // Check for Short Circuits (+5V direct to GND)
  let shortCircuit = false;
  let shortMsg = '';

  wires.forEach((w) => {
    const fromKey = `${w.fromComponentId}:${w.fromPinId}`;
    const toKey = `${w.toComponentId}:${w.toPinId}`;

    const vFrom = pinVoltages[fromKey];
    const vTo = pinVoltages[toKey];

    if (vFrom !== undefined && vTo !== undefined && Math.abs(vFrom - vTo) > 4.0) {
      if ((vFrom === VCC_VOLTAGE && vTo === GND_VOLTAGE) || (vFrom === GND_VOLTAGE && vTo === VCC_VOLTAGE)) {
        shortCircuit = true;
        shortMsg = `SHORT CIRCUIT DETECTED between ${w.fromPinId} and ${w.toPinId}! Power safety trip activated.`;
      }
    }
  });

  if (shortCircuit) {
    simState.hasShortCircuit = true;
    simState.shortCircuitMsg = shortMsg;
    simState.totalCurrentmA = 1800; // Overcurrent trip
    return { updatedSimState: simState, updatedWires, shortCircuitDetected: true, shortCircuitMsg: shortMsg, gateOutputs };
  } else {
    simState.hasShortCircuit = false;
    simState.shortCircuitMsg = undefined;
  }

  // 2. Multi-Pass Wire Propagation & Complete Multi-Gate IC Evaluation Loop
  let passes = 0;
  let voltagesChanged = true;

  while (voltagesChanged && passes < 10) {
    voltagesChanged = false;
    passes++;

    // A. Propagate Voltages across all connected wires
    wires.forEach((w) => {
      const fromKey = `${w.fromComponentId}:${w.fromPinId}`;
      const toKey = `${w.toComponentId}:${w.toPinId}`;

      const vFrom = pinVoltages[fromKey];
      const vTo = pinVoltages[toKey];

      if (vFrom !== undefined && vTo === undefined) {
        pinVoltages[toKey] = vFrom;
        w.isEnergized = vFrom > 2.0;
        w.voltage = vFrom;
        w.logicState = vFrom > 2.0 ? 1 : 0;
        voltagesChanged = true;
      } else if (vTo !== undefined && vFrom === undefined) {
        pinVoltages[fromKey] = vTo;
        w.isEnergized = vTo > 2.0;
        w.voltage = vTo;
        w.logicState = vTo > 2.0 ? 1 : 0;
        voltagesChanged = true;
      } else if (vFrom !== undefined && vTo !== undefined) {
        const vMax = Math.max(vFrom, vTo);
        if (pinVoltages[fromKey] !== vMax || pinVoltages[toKey] !== vMax) {
          pinVoltages[fromKey] = vMax;
          pinVoltages[toKey] = vMax;
          voltagesChanged = true;
        }
        w.isEnergized = vMax > 2.0;
        w.voltage = vMax;
        w.logicState = vMax > 2.0 ? 1 : 0;
      }
    });

    // B. Evaluate ALL IC Gates on every placed IC component
    placedComponents.forEach((comp) => {
      const meta = COMPONENTS_LIBRARY.find((c) => c.id === comp.componentMetaId);
      if (!meta || meta.category !== 'Logic & IC') return;

      // Find VCC and GND pins for chip power evaluation
      const vccPin = meta.pins.find((p) => p.gateRole === 'VCC' || p.type === 'VCC' || p.id === 'pin-14');
      const gndPin = meta.pins.find((p) => p.gateRole === 'GND' || p.type === 'GND' || p.id === 'pin-7');

      const vccVal = vccPin ? pinVoltages[`${comp.id}:${vccPin.id}`] : undefined;
      const gndVal = gndPin ? pinVoltages[`${comp.id}:${gndPin.id}`] : undefined;

      const isChipPowered = vccVal !== undefined && vccVal > 4.0 && gndVal !== undefined && gndVal < 0.8;

      // Get all gate numbers defined in pins (e.g. 1, 2, 3, 4 for Quad; 1..6 for Hex 7404)
      const gateNumbers = Array.from(
        new Set(meta.pins.map((p) => p.gateNumber).filter((gn): gn is number => gn !== undefined))
      ).sort((a, b) => a - b);

      const gatesMap: Record<
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
      > = {};

      let errStr: string | undefined = undefined;
      if (!isChipPowered) {
        errStr = `IC ${meta.icSeries || meta.name} is UNPOWERED. Connect Pin 14 to +5V and Pin 7 to GND!`;
      }

      gateNumbers.forEach((gNum) => {
        const pinA = meta.pins.find((p) => p.gateNumber === gNum && p.gateRole === 'A');
        const pinB = meta.pins.find((p) => p.gateNumber === gNum && p.gateRole === 'B');
        const pinY = meta.pins.find((p) => p.gateNumber === gNum && p.gateRole === 'Y');

        if (!pinA || !pinY) return;

        const pinAKey = `${comp.id}:${pinA.id}`;
        const pinBKey = pinB ? `${comp.id}:${pinB.id}` : undefined;
        const pinYKey = `${comp.id}:${pinY.id}`;

        // Get pin voltage readings
        let valA = pinVoltages[pinAKey];
        let valB = pinBKey ? pinVoltages[pinBKey] : undefined;

        // Convenience fallback for Gate 1 if un-wired (default to SW1 and SW2 for instant demo)
        if (gNum === 1 && valA === undefined) {
          valA = simState.switchAOn ? VCC_VOLTAGE : GND_VOLTAGE;
        }
        if (gNum === 1 && pinBKey && valB === undefined) {
          valB = simState.switchBOn ? VCC_VOLTAGE : GND_VOLTAGE;
        }

        const bitA = (valA ?? 0) > 2.0 ? 1 : 0;
        const bitB = (valB ?? 0) > 2.0 ? 1 : 0;

        let bitOut = 0;
        if (isChipPowered) {
          switch (meta.icSeries) {
            case '7408': // AND Gate: Y = A • B
              bitOut = bitA & bitB;
              break;
            case '7400': // NAND Gate: Y = (A • B)'
              bitOut = (bitA & bitB) === 1 ? 0 : 1;
              break;
            case '7432': // OR Gate: Y = A + B
              bitOut = bitA | bitB;
              break;
            case '7402': // NOR Gate: Y = (A + B)'
              bitOut = (bitA | bitB) === 1 ? 0 : 1;
              break;
            case '7404': // NOT Gate: Y = A'
              bitOut = bitA === 1 ? 0 : 1;
              break;
            case '7486': // XOR Gate: Y = A ⊕ B
              bitOut = bitA ^ bitB;
              break;
            case '74266': // XNOR Gate: Y = (A ⊕ B)'
              bitOut = (bitA ^ bitB) === 0 ? 1 : 0;
              break;
            case '74151': { // 8:1 Multiplexer
              const strobeVal = pinVoltages[`${comp.id}:pin-7`] ?? 0;
              const enableOk = strobeVal < 1.0; // Active LOW G'
              if (!enableOk) {
                bitOut = 0;
              } else {
                const s0 = (pinVoltages[`${comp.id}:pin-11`] ?? 0) > 2.0 ? 1 : 0;
                const s1 = (pinVoltages[`${comp.id}:pin-10`] ?? 0) > 2.0 ? 1 : 0;
                const s2 = (pinVoltages[`${comp.id}:pin-9`] ?? 0) > 2.0 ? 1 : 0;
                const sel = (s2 << 2) | (s1 << 1) | s0;
                const dPinIds = ['pin-4', 'pin-3', 'pin-2', 'pin-1', 'pin-15', 'pin-14', 'pin-13', 'pin-12'];
                const selectedVal = pinVoltages[`${comp.id}:${dPinIds[sel]}`] ?? (sel === 0 ? (simState.switchAOn ? 5 : 0) : 0);
                bitOut = selectedVal > 2.0 ? 1 : 0;
              }
              break;
            }
            case '74138': { // 3:8 Line Decoder
              const g1 = (pinVoltages[`${comp.id}:pin-6`] ?? 5.0) > 2.0; // Default enabled
              const g2a = (pinVoltages[`${comp.id}:pin-4`] ?? 0.0) < 1.0;
              const g2b = (pinVoltages[`${comp.id}:pin-5`] ?? 0.0) < 1.0;
              if (g1 && g2a && g2b) {
                const a0 = bitA;
                const a1 = bitB;
                const a2 = (pinVoltages[`${comp.id}:pin-3`] ?? 0) > 2.0 ? 1 : 0;
                const addr = (a2 << 2) | (a1 << 1) | a0;
                bitOut = addr; // Output address indicator
              } else {
                bitOut = 0;
              }
              break;
            }
            case '7474': { // Dual D Flip-Flop
              const clr = (pinVoltages[`${comp.id}:pin-1`] ?? 5.0) < 1.0;
              const pre = (pinVoltages[`${comp.id}:pin-4`] ?? 5.0) < 1.0;
              if (clr) bitOut = 0;
              else if (pre) bitOut = 1;
              else bitOut = bitA; // Q tracks D input
              break;
            }
            case '7483': { // 4-Bit Binary Full Adder
              const a1 = (pinVoltages[`${comp.id}:pin-10`] ?? (simState.switchAOn ? 5 : 0)) > 2.0 ? 1 : 0;
              const b1 = (pinVoltages[`${comp.id}:pin-11`] ?? (simState.switchBOn ? 5 : 0)) > 2.0 ? 1 : 0;
              const cin = (pinVoltages[`${comp.id}:pin-13`] ?? 0) > 2.0 ? 1 : 0;
              const sum = a1 + b1 + cin;
              bitOut = sum & 1; // LSB Sum bit
              break;
            }
            case '7490': { // Decade Counter
              const clkA = bitA;
              bitOut = clkA === 1 ? 1 : 0;
              break;
            }
            default:
              bitOut = bitA & bitB;
          }
        }

        const newOutVolts = isChipPowered && bitOut === 1 ? VCC_VOLTAGE : GND_VOLTAGE;
        if (pinVoltages[pinYKey] !== newOutVolts) {
          pinVoltages[pinYKey] = newOutVolts;
          voltagesChanged = true;
        }

        gatesMap[gNum] = {
          gateNumber: gNum,
          inputA: bitA,
          inputB: pinB ? bitB : undefined,
          outputY: bitOut,
          pinAId: pinA.id,
          pinBId: pinB?.id,
          pinYId: pinY.id,
        };
      });

      const gate1 = gatesMap[1];
      gateOutputs[comp.id] = {
        gateId: comp.id,
        icType: meta.icSeries || meta.name,
        isPowered: isChipPowered,
        inputA: gate1 ? gate1.inputA : 0,
        inputB: gate1 ? gate1.inputB : undefined,
        outputY: gate1 ? gate1.outputY : 0,
        errorMsg: errStr,
        gates: gatesMap,
      };
    });
  }

  // Second pass: Propagate gate output voltages to connected LEDs or Multimeter
  wires.forEach((w) => {
    const fromKey = `${w.fromComponentId}:${w.fromPinId}`;
    const toKey = `${w.toComponentId}:${w.toPinId}`;

    if (pinVoltages[fromKey] !== undefined && pinVoltages[toKey] === undefined) {
      pinVoltages[toKey] = pinVoltages[fromKey];
      w.isEnergized = pinVoltages[fromKey] > 2.0;
      w.voltage = pinVoltages[fromKey];
    } else if (pinVoltages[toKey] !== undefined && pinVoltages[fromKey] === undefined) {
      pinVoltages[fromKey] = pinVoltages[toKey];
      w.isEnergized = pinVoltages[toKey] > 2.0;
      w.voltage = pinVoltages[toKey];
    }
  });

  // 4. Update LEDs and Peripherals based on evaluated voltages
  placedComponents.forEach((comp) => {
    const meta = COMPONENTS_LIBRARY.find((c) => c.id === comp.componentMetaId);
    if (!meta) return;

    if (meta.id.startsWith('led-')) {
      const anodeVolts = pinVoltages[`${comp.id}:led-a`];
      const cathodeVolts = pinVoltages[`${comp.id}:led-k`];

      // LED lights up if Anode is HIGH (>2.0V) and Cathode is GND (<1.0V) or connected to GND
      const isLit = anodeVolts !== undefined && anodeVolts > 2.0 && (cathodeVolts === undefined || cathodeVolts < 1.0);
      simState.ledStates[comp.id] = { lit: isLit, color: meta.id.includes('green') ? 'green' : 'red' };
    }

    if (comp.componentMetaId === 'trainer-board-base') {
      const outputs: boolean[] = [];
      for (let i = 0; i < 10; i++) {
        const pinKey = `${comp.id}:tb-out${i + 1}`;
        const volt = pinVoltages[pinKey];
        const isLit = volt !== undefined && volt > 2.0;
        outputs.push(isLit);
        simState.ledStates[`tb-out${i + 1}`] = { lit: isLit, color: i % 2 === 0 ? 'red' : 'green' };
      }
      simState.outputs = outputs;

      // Backward compatibility aliases
      simState.ledStates['tb-led1'] = simState.ledStates['tb-out1'];
      simState.ledStates['tb-led2'] = simState.ledStates['tb-out2'];
    }
  });

  // 5. Evaluate Multimeter Probes Readout
  const multimeter = evaluateMultimeterReadout(simState.multimeter, pinVoltages);
  simState.multimeter = multimeter;

  simState.pinVoltages = pinVoltages;
  simState.evaluatedGates = gateOutputs;
  simState.totalCurrentmA = simState.isPowered ? 35 + Object.keys(gateOutputs).length * 8 : 0;

  return {
    updatedSimState: simState,
    updatedWires,
    shortCircuitDetected: false,
    gateOutputs,
  };
}

/**
 * Calculates Multimeter readout based on probe locations
 */
function evaluateMultimeterReadout(
  dmm: MultimeterState,
  pinVoltages: Record<string, number>
): MultimeterState {
  const redTarget = dmm.redProbeAttachedTo;
  const blackTarget = dmm.blackProbeAttachedTo;

  let displayValue = '0.00 V';
  let isBeeping = false;

  const redVolt = redTarget ? pinVoltages[`${redTarget.componentId}:${redTarget.pinId}`] ?? 0 : 0;
  const blackVolt = blackTarget ? pinVoltages[`${blackTarget.componentId}:${blackTarget.pinId}`] ?? 0 : 0;

  const deltaV = redVolt - blackVolt;

  if (dmm.mode === 'DCV') {
    if (!redTarget) {
      displayValue = '0.00 V';
    } else {
      displayValue = `${Math.max(0, deltaV).toFixed(2)} V`;
    }
  } else if (dmm.mode === 'LOGIC') {
    if (!redTarget) {
      displayValue = 'OPEN';
    } else if (redVolt > 2.0) {
      displayValue = 'HIGH (1)';
    } else {
      displayValue = 'LOW (0)';
    }
  } else if (dmm.mode === 'CONTINUITY') {
    if (redTarget && blackTarget) {
      const isConnected = Math.abs(deltaV) < 0.2;
      if (isConnected) {
        displayValue = 'SHORT / 0.1 Ω';
        isBeeping = true;
      } else {
        displayValue = 'OPEN (∞ Ω)';
        isBeeping = false;
      }
    } else {
      displayValue = 'OPEN (∞ Ω)';
      isBeeping = false;
    }
  }

  return { ...dmm, displayValue, isBeeping };
}
