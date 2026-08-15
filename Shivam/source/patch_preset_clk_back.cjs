const fs = require('fs');
let code = fs.readFileSync('src/data/presets.ts', 'utf8');

code = code.replace(/fromPinId: 'tb-in3'/g, "fromPinId: 'tb-clk'");

fs.writeFileSync('src/data/presets.ts', code);
