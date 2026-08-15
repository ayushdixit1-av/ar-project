const fs = require('fs');
let code = fs.readFileSync('src/data/presets.ts', 'utf8');

code = code.replace(/fromPinId: 'tb-clk'/g, "fromPinId: 'tb-in3'");

fs.writeFileSync('src/data/presets.ts', code);
