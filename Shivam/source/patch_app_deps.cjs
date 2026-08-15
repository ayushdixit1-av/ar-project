const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexEffect = /\}, \[simState\.isPowered, simState\.switchAOn, simState\.switchBOn, placedComponents, wires\]\);/;
const newEffect = `}, [simState.isPowered, simState.switchAOn, simState.switchBOn, simState.button1Pressed, simState.inputs?.join(','), placedComponents, wires]);`;

code = code.replace(regexEffect, newEffect);
fs.writeFileSync('src/App.tsx', code);
