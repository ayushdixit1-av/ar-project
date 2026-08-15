const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/simState\.button1Pressed\n\s+\? 'bg-red-500/, "(simState.button1Pressed || simState.autoClockPulse)\n                      ? 'bg-red-500");

fs.writeFileSync('src/App.tsx', code);
