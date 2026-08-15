const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexSimState2 = /switchAOn: true,\n    switchBOn: true,/;
const newSimState2 = `switchAOn: CIRCUIT_PRESETS[0].inputs[0],
    switchBOn: CIRCUIT_PRESETS[0].inputs[1],`;
code = code.replace(regexSimState2, newSimState2);

fs.writeFileSync('src/App.tsx', code);
