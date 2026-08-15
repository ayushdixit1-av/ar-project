const fs = require('fs');
let code = fs.readFileSync('src/utils/logicEngine.ts', 'utf8');

const replacement = `
      // Check if it's a flip-flop
      const isJK = meta.id === 'ic-jk-ff';
      const isD = meta.id === 'ic-7474-d';
      const isSR = meta.id === 'ic-sr-ff';
      const isT = meta.id === 'ic-t-ff';

      if (isJK || isD || isSR || isT) {
        let errStr = undefined;
        if (!isChipPowered) {
          errStr = \`IC \${meta.name} is UNPOWERED. Connect Pin 14 to +5V and Pin 7 to GND!\`;
        }
        if (!simState.internalState) simState.internalState = {};

        gateNumbers.forEach((gNum) => {
          const pinQ = meta.pins.find((p) => p.gateNumber === gNum && p.gateRole === 'Q');
          const pinQInv = meta.pins.find((p) => p.gateNumber === gNum && p.gateRole === 'Q_INV');
          const pinClk = meta.pins.find((p) => p.gateNumber === gNum && p.gateRole === 'CLK');
          const pinClr = meta.pins.find((p) => p.gateNumber === gNum && p.gateRole === 'CLR');
          const pinPr = meta.pins.find((p) => p.gateNumber === gNum && p.gateRole === 'PR');
          if (!pinQ || !pinClk) return;

          const clkVolts = pinVoltages[\`\${comp.id}:\${pinClk.id}\`] ?? 0;
          const clkState = clkVolts > 2.0 ? 1 : 0;
          const clrState = pinClr ? ((pinVoltages[\`\${comp.id}:\${pinClr.id}\`] ?? 5.0) > 2.0 ? 1 : 0) : 1; // Default High (inactive)
          const prState = pinPr ? ((pinVoltages[\`\${comp.id}:\${pinPr.id}\`] ?? 5.0) > 2.0 ? 1 : 0) : 1; // Default High (inactive)

          const stateKey = \`\${comp.id}:gate\${gNum}\`;
          const prevClk = simState.internalState[stateKey + '_clk'] ?? 0;
          let qState = simState.internalState[stateKey + '_q'] ?? 0;

          // Positive edge trigger
          const isEdge = prevClk === 0 && clkState === 1;

          if (isChipPowered) {
            // Asynchronous Clear/Preset (Active Low)
            if (clrState === 0) {
              qState = 0;
            } else if (prState === 0) {
              qState = 1;
            } else if (isEdge) {
              if (isJK) {
                const pinJ = meta.pins.find((p) => p.gateNumber === gNum && p.gateRole === 'J');
                const pinK = meta.pins.find((p) => p.gateNumber === gNum && p.gateRole === 'K');
                const j = (pinVoltages[\`\${comp.id}:\${pinJ?.id}\`] ?? 0) > 2.0 ? 1 : 0;
                const k = (pinVoltages[\`\${comp.id}:\${pinK?.id}\`] ?? 0) > 2.0 ? 1 : 0;
                if (j && k) qState = 1 - qState; // Toggle
                else if (j && !k) qState = 1; // Set
                else if (!j && k) qState = 0; // Reset
              } else if (isD) {
                const pinD = meta.pins.find((p) => p.gateNumber === gNum && p.gateRole === 'D');
                const d = (pinVoltages[\`\${comp.id}:\${pinD?.id}\`] ?? 0) > 2.0 ? 1 : 0;
                qState = d;
              } else if (isSR) {
                const pinS = meta.pins.find((p) => p.gateNumber === gNum && p.gateRole === 'S');
                const pinR = meta.pins.find((p) => p.gateNumber === gNum && p.gateRole === 'R');
                const s = (pinVoltages[\`\${comp.id}:\${pinS?.id}\`] ?? 0) > 2.0 ? 1 : 0;
                const r = (pinVoltages[\`\${comp.id}:\${pinR?.id}\`] ?? 0) > 2.0 ? 1 : 0;
                if (s && !r) qState = 1; // Set
                else if (!s && r) qState = 0; // Reset
                else if (s && r) qState = 0; // Invalid, assume reset or 0
              } else if (isT) {
                const pinT = meta.pins.find((p) => p.gateNumber === gNum && p.gateRole === 'T');
                const t = (pinVoltages[\`\${comp.id}:\${pinT?.id}\`] ?? 0) > 2.0 ? 1 : 0;
                if (t) qState = 1 - qState; // Toggle
              }
            }
          } else {
            qState = 0; // Unpowered
          }

          simState.internalState[stateKey + '_clk'] = clkState;
          simState.internalState[stateKey + '_q'] = qState;

          // Write output voltages
          if (isChipPowered) {
            pinVoltages[\`\${comp.id}:\${pinQ.id}\`] = qState === 1 ? VCC_VOLTAGE : GND_VOLTAGE;
            if (pinQInv) pinVoltages[\`\${comp.id}:\${pinQInv.id}\`] = qState === 0 ? VCC_VOLTAGE : GND_VOLTAGE;
          } else {
            pinVoltages[\`\${comp.id}:\${pinQ.id}\`] = GND_VOLTAGE;
            if (pinQInv) pinVoltages[\`\${comp.id}:\${pinQInv.id}\`] = GND_VOLTAGE;
          }

          gatesMap[gNum] = {
            gateNumber: gNum,
            inputA: clkState, // Abusing inputA to show clock for debug
            outputY: qState,
            pinYId: pinQ.id,
          };
        });

        gateOutputs[comp.id] = {
          gateId: comp.id,
          icType: meta.name,
          isPowered: isChipPowered,
          inputA: 0,
          outputY: 0,
          errorMsg: errStr,
          gates: gatesMap,
        };
        return;
      }
`;

const searchStr = "gateNumbers.forEach((gNum) => {";
const replaceIndex = code.indexOf(searchStr);

if (replaceIndex > -1) {
  code = code.substring(0, replaceIndex) + replacement + "\n      " + code.substring(replaceIndex);
}

fs.writeFileSync('src/utils/logicEngine.ts', code);
