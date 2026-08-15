const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

code = code.replace(/button1Pressed: boolean;/, "button1Pressed: boolean;\n  autoClockPulse?: boolean;");

fs.writeFileSync('src/types.ts', code);
