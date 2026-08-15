const fs = require('fs');
let code = fs.readFileSync('src/utils/logicEngine.ts', 'utf8');

const regexBoard = /if \(comp\.componentMetaId === 'trainer-board-base'\) \{[\s\S]*?\n    \}/;
const newBoard = `if (comp.componentMetaId === 'trainer-board-base') {
      const outputs: boolean[] = [];
      for (let i = 0; i < 10; i++) {
        const pinKey = \`\${comp.id}:tb-out\${i + 1}\`;
        const volt = pinVoltages[pinKey];
        const isLit = volt !== undefined && volt > 2.0;
        outputs.push(isLit);
        simState.ledStates[\`tb-out\${i + 1}\`] = { lit: isLit, color: i % 2 === 0 ? 'red' : 'green' };
      }
      simState.outputs = outputs;

      // 7-segment
      const segA = (pinVoltages[\`\${comp.id}:tb-7seg-a\`] ?? 0) > 2.0 ? 1 : 0;
      const segB = (pinVoltages[\`\${comp.id}:tb-7seg-b\`] ?? 0) > 2.0 ? 1 : 0;
      const segC = (pinVoltages[\`\${comp.id}:tb-7seg-c\`] ?? 0) > 2.0 ? 1 : 0;
      const segD = (pinVoltages[\`\${comp.id}:tb-7seg-d\`] ?? 0) > 2.0 ? 1 : 0;
      const val = (segD << 3) | (segC << 2) | (segB << 1) | segA;
      simState.sevenSegmentVal = val.toString(16).toUpperCase();

      // Backward compatibility aliases
      simState.ledStates['tb-led1'] = simState.ledStates['tb-out1'];
      simState.ledStates['tb-led2'] = simState.ledStates['tb-out2'];
    }`;
code = code.replace(regexBoard, newBoard);
fs.writeFileSync('src/utils/logicEngine.ts', code);
