const fs = require('fs');
let code = fs.readFileSync('src/utils/logicEngine.ts', 'utf8');

const injection = `
    pinVoltages[\`\${trainerBoard.id}:tb-swB\`] = simState.inputs[1] ? VCC_VOLTAGE : GND_VOLTAGE;
    
    // Evaluate Clock Pulse (Button 1 or automatic)
    pinVoltages[\`\${trainerBoard.id}:tb-clk\`] = simState.button1Pressed ? VCC_VOLTAGE : GND_VOLTAGE;
`;

code = code.replace(/pinVoltages\[\`\$\{trainerBoard\.id\}:tb-swB\`\] = simState\.inputs\[1\] \? VCC_VOLTAGE : GND_VOLTAGE;/, injection);

fs.writeFileSync('src/utils/logicEngine.ts', code);
