const fs = require('fs');
let code = fs.readFileSync('src/utils/logicEngine.ts', 'utf8');

const regexClk = /pinVoltages\[\\\`\\\$\\{trainerBoard\.id\\}:tb-swA\\\`\] = simState\.inputs\[0\] \? VCC_VOLTAGE : GND_VOLTAGE;/;
const newClk = `pinVoltages[\`\${trainerBoard.id}:tb-clk\`] = simState.button1Pressed ? VCC_VOLTAGE : GND_VOLTAGE;
    pinVoltages[\`\${trainerBoard.id}:tb-swA\`] = simState.inputs[0] ? VCC_VOLTAGE : GND_VOLTAGE;`;
code = code.replace(regexClk, newClk);

fs.writeFileSync('src/utils/logicEngine.ts', code);
