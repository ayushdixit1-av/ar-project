const fs = require('fs');
let code = fs.readFileSync('src/utils/logicEngine.ts', 'utf8');

const regexVars = /let errStr: string \| undefined = undefined;/;
const newVars = `let errStr: string | undefined = undefined;
      const istate = simState.internalState || {};`;
code = code.replace(regexVars, newVars);

const regexEval = /case '7486': \/\/ XOR Gate: Y = A ⊕ B\n              bitOut = bitA \^ bitB;\n              break;/;
const newEval = `case '7486': // XOR Gate: Y = A ⊕ B
              bitOut = bitA ^ bitB;
              break;
            case '7474': // D Flip-Flop
            case 'JK-FF': // JK Flip-Flop
            case 'SR-FF': // SR Flip-Flop
            case 'T-FF': // T Flip-Flop
              // Need to handle these below, outside this switch since they have multiple pins
              break;`;
code = code.replace(regexEval, newEval);

const regexEndSwitch = /gatesMap\[gNum\] = \{\n            gateNumber: gNum,\n            inputA: bitA,\n            inputB: bitB,\n            outputY: bitOut,\n            pinAId: pinAKey,\n            pinBId: pinBKey,\n            pinYId: pinYKey,\n          \};/;
const newEndSwitch = `
          // Handle complex sequential gates
          if (['7474', 'JK-FF', 'SR-FF', 'T-FF'].includes(meta.icSeries)) {
            const getBit = (role: string) => {
              const p = meta.pins.find(p => p.gateNumber === gNum && p.gateRole === role);
              return p && pinVoltages[\`\${comp.id}:\${p.id}\`] > 2.0 ? 1 : 0;
            };
            const clk = getBit('CLK');
            const clr = getBit('CLR'); // active low generally, wait, in 7474 it's active low, let's treat 1 as no-clear
            
            const prevClkKey = \`\${comp.id}:g\${gNum}:prevClk\`;
            const qKey = \`\${comp.id}:g\${gNum}:q\`;
            
            const prevClk = istate[prevClkKey] ?? 0;
            let currentQ = istate[qKey] ?? 0;
            const risingEdge = (prevClk === 0 && clk === 1);
            
            if (meta.icSeries === '7474') {
              const d = getBit('D');
              const pr = getBit('PR'); // active low
              
              if (clr === 0) { currentQ = 0; }
              else if (pr === 0) { currentQ = 1; }
              else if (risingEdge) {
                currentQ = d;
              }
            } else if (meta.icSeries === 'JK-FF') {
              const j = getBit('J');
              const k = getBit('K');
              if (clr === 0) { currentQ = 0; }
              else if (risingEdge) {
                if (j === 1 && k === 1) currentQ = currentQ ? 0 : 1;
                else if (j === 1 && k === 0) currentQ = 1;
                else if (j === 0 && k === 1) currentQ = 0;
              }
            } else if (meta.icSeries === 'SR-FF') {
              const s = getBit('S');
              const r = getBit('R');
              if (risingEdge) {
                if (s === 1 && r === 0) currentQ = 1;
                else if (s === 0 && r === 1) currentQ = 0;
                else if (s === 1 && r === 1) currentQ = 0; // Invalid, reset to 0
              }
            } else if (meta.icSeries === 'T-FF') {
              const t = getBit('T');
              if (clr === 0) { currentQ = 0; }
              else if (risingEdge) {
                if (t === 1) currentQ = currentQ ? 0 : 1;
              }
            }
            
            istate[prevClkKey] = clk;
            istate[qKey] = currentQ;
            
            const qPin = meta.pins.find(p => p.gateNumber === gNum && p.gateRole === 'Q');
            const qInvPin = meta.pins.find(p => p.gateNumber === gNum && p.gateRole === 'Q_INV');
            
            if (qPin) gateOutputs[\`\${comp.id}:\${qPin.id}\`] = currentQ;
            if (qInvPin) gateOutputs[\`\${comp.id}:\${qInvPin.id}\`] = currentQ ? 0 : 1;
            
            // Dummy bitOut for gatesMap
            bitOut = currentQ;
          } else {
            gateOutputs[pinYKey] = bitOut;
          }

          gatesMap[gNum] = {
            gateNumber: gNum,
            inputA: bitA,
            inputB: bitB,
            outputY: bitOut,
            pinAId: pinAKey,
            pinBId: pinBKey,
            pinYId: pinYKey,
          };`;

code = code.replace(regexEndSwitch, newEndSwitch);

const regexReturnSimState = /return \{ updatedSimState: simState, updatedWires, shortCircuitDetected: simState\.hasShortCircuit, gateOutputs \};/;
const newReturnSimState = `simState.internalState = istate;
  return { updatedSimState: simState, updatedWires, shortCircuitDetected: simState.hasShortCircuit, gateOutputs };`;

code = code.replace(regexReturnSimState, newReturnSimState);
fs.writeFileSync('src/utils/logicEngine.ts', code);
