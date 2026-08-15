const fs = require('fs');
let code = fs.readFileSync('src/utils/logicEngine.ts', 'utf8');

const injection = `
    // Evaluate Clock Pulse (Button 1 or automatic 1Hz)
    pinVoltages[\`\${trainerBoard.id}:tb-clk\`] = (simState.button1Pressed || simState.autoClockPulse) ? VCC_VOLTAGE : GND_VOLTAGE;
`;

code = code.replace(/\/\/ Evaluate Clock Pulse \(Button 1 or automatic\)\n    pinVoltages\[\`\$\{trainerBoard\.id\}:tb-clk\`\] = simState\.button1Pressed \? VCC_VOLTAGE : GND_VOLTAGE;/, injection);

fs.writeFileSync('src/utils/logicEngine.ts', code);
