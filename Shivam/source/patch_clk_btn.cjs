const fs = require('fs');
let code = fs.readFileSync('src/utils/threeHelpers.ts', 'utf8');

code = code.replace(/simState.button1Pressed \? 0xef4444 : 0x000000/g, "(simState.button1Pressed || simState.autoClockPulse) ? 0xef4444 : 0x000000");
code = code.replace(/simState.button1Pressed \? 0\.5 : 0/g, "(simState.button1Pressed || simState.autoClockPulse) ? 0.5 : 0");
code = code.replace(/simState.button1Pressed \? 0\.05 : 0\.08/g, "(simState.button1Pressed || simState.autoClockPulse) ? 0.05 : 0.08");

fs.writeFileSync('src/utils/threeHelpers.ts', code);
