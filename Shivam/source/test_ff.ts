import { evaluateDigitalCircuit } from './src/utils/logicEngine.js';
import { COMPONENTS_LIBRARY } from './src/data/componentsLibrary.js';

const jk = COMPONENTS_LIBRARY.find(c => c.id === 'ic-jk-ff');
const dff = COMPONENTS_LIBRARY.find(c => c.id === 'ic-7474-d');
const sr = COMPONENTS_LIBRARY.find(c => c.id === 'ic-sr-ff');
const tff = COMPONENTS_LIBRARY.find(c => c.id === 'ic-t-ff');

const placedComponents = [
  { id: 'comp-base', componentMetaId: 'trainer-board-base', position: [0,0,0] as any, rotation: [0,0,0] as any, scale: [1,1,1] as any },
  { id: 'comp-jk', componentMetaId: 'ic-jk-ff', position: [0,0,0] as any, rotation: [0,0,0] as any, scale: [1,1,1] as any },
  { id: 'comp-d', componentMetaId: 'ic-7474-d', position: [0,0,0] as any, rotation: [0,0,0] as any, scale: [1,1,1] as any },
  { id: 'comp-sr', componentMetaId: 'ic-sr-ff', position: [0,0,0] as any, rotation: [0,0,0] as any, scale: [1,1,1] as any },
  { id: 'comp-t', componentMetaId: 'ic-t-ff', position: [0,0,0] as any, rotation: [0,0,0] as any, scale: [1,1,1] as any }
];

const wires = [
  // Power
  { id: 'w1', fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a', toComponentId: 'comp-jk', toPinId: 'pin-14' },
  { id: 'w2', fromComponentId: 'comp-base', fromPinId: 'tb-gnd1', toComponentId: 'comp-jk', toPinId: 'pin-7' },
  { id: 'w3', fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a', toComponentId: 'comp-d', toPinId: 'pin-14' },
  { id: 'w4', fromComponentId: 'comp-base', fromPinId: 'tb-gnd1', toComponentId: 'comp-d', toPinId: 'pin-7' },
  { id: 'w5', fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a', toComponentId: 'comp-sr', toPinId: 'pin-14' },
  { id: 'w6', fromComponentId: 'comp-base', fromPinId: 'tb-gnd1', toComponentId: 'comp-sr', toPinId: 'pin-7' },
  { id: 'w7', fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a', toComponentId: 'comp-t', toPinId: 'pin-14' },
  { id: 'w8', fromComponentId: 'comp-base', fromPinId: 'tb-gnd1', toComponentId: 'comp-t', toPinId: 'pin-7' },
  
  // JK Toggle
  { id: 'w9', fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a', toComponentId: 'comp-jk', toPinId: 'pin-1' },
  { id: 'w10', fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a', toComponentId: 'comp-jk', toPinId: 'pin-2' },
  { id: 'w11', fromComponentId: 'comp-base', fromPinId: 'tb-swA', toComponentId: 'comp-jk', toPinId: 'pin-3' },

  // D (D = VCC)
  { id: 'w12', fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a', toComponentId: 'comp-d', toPinId: 'pin-2' },
  { id: 'w13', fromComponentId: 'comp-base', fromPinId: 'tb-swA', toComponentId: 'comp-d', toPinId: 'pin-3' },

  // SR (S = VCC, R = GND)
  { id: 'w14', fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a', toComponentId: 'comp-sr', toPinId: 'pin-1' },
  { id: 'w15', fromComponentId: 'comp-base', fromPinId: 'tb-gnd1', toComponentId: 'comp-sr', toPinId: 'pin-2' },
  { id: 'w16', fromComponentId: 'comp-base', fromPinId: 'tb-swA', toComponentId: 'comp-sr', toPinId: 'pin-3' },

  // T Toggle
  { id: 'w17', fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a', toComponentId: 'comp-t', toPinId: 'pin-1' },
  { id: 'w18', fromComponentId: 'comp-base', fromPinId: 'tb-swA', toComponentId: 'comp-t', toPinId: 'pin-2' }
] as any;

let state: any = {
  isPowered: true,
  switchAOn: false,
  inputs: [false, false, false, false, false, false, false, false, false, false],
  internalState: {},
  ledStates: {},
  multimeter: { mode: 'DCV', displayValue: '', isBeeping: false },
  pinVoltages: {},
  evaluatedGates: {},
  outputs: [],
};

let res = evaluateDigitalCircuit(placedComponents, wires, state);
state = res.updatedSimState;
console.log("Initial state (CLK=0):");
console.log("JK Q1:", res.gateOutputs['comp-jk']?.gates[1]?.outputY);
console.log("D  Q1:", res.gateOutputs['comp-d']?.gates[1]?.outputY);
console.log("SR Q1:", res.gateOutputs['comp-sr']?.gates[1]?.outputY);
console.log("T  Q1:", res.gateOutputs['comp-t']?.gates[1]?.outputY);

console.log("\nSetting CLK High (Edge)");
state.inputs[0] = true;
state.switchAOn = true;
res = evaluateDigitalCircuit(placedComponents, wires, state);
state = res.updatedSimState;
console.log("JK Q1:", res.gateOutputs['comp-jk']?.gates[1]?.outputY);
console.log("D  Q1:", res.gateOutputs['comp-d']?.gates[1]?.outputY);
console.log("SR Q1:", res.gateOutputs['comp-sr']?.gates[1]?.outputY);
console.log("T  Q1:", res.gateOutputs['comp-t']?.gates[1]?.outputY);

console.log("\nSetting CLK Low");
state.inputs[0] = false;
state.switchAOn = false;
res = evaluateDigitalCircuit(placedComponents, wires, state);
state = res.updatedSimState;
console.log("JK Q1:", res.gateOutputs['comp-jk']?.gates[1]?.outputY);
console.log("D  Q1:", res.gateOutputs['comp-d']?.gates[1]?.outputY);
console.log("SR Q1:", res.gateOutputs['comp-sr']?.gates[1]?.outputY);
console.log("T  Q1:", res.gateOutputs['comp-t']?.gates[1]?.outputY);

console.log("\nSetting CLK High (Edge)");
state.inputs[0] = true; // swA on
state.switchAOn = true;
res = evaluateDigitalCircuit(placedComponents, wires, state);
state = res.updatedSimState;
console.log("Q1 Output (should be 1):", res.gateOutputs['comp-jk']?.gates[1]?.outputY);

console.log("\nSetting CLK Low");
state.inputs[0] = false;
state.switchAOn = false;
res = evaluateDigitalCircuit(placedComponents, wires, state);
state = res.updatedSimState;
console.log("Q1 Output (should be 1):", res.gateOutputs['comp-jk']?.gates[1]?.outputY);

console.log("\nSetting CLK High (Edge 2)");
state.inputs[0] = true;
state.switchAOn = true;
res = evaluateDigitalCircuit(placedComponents, wires, state);
state = res.updatedSimState;
console.log("Q1 Output (should be 0):", res.gateOutputs['comp-jk']?.gates[1]?.outputY);

