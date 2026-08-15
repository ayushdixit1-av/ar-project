const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexPlaced = /const \[placedComponents, setPlacedComponents\] = useState<PlacedComponent\[\]>\(\[[\s\S]*?\]\);/;
const newPlaced = `const [placedComponents, setPlacedComponents] = useState<PlacedComponent[]>(CIRCUIT_PRESETS[0].components);`;
code = code.replace(regexPlaced, newPlaced);

const regexWires = /const \[wires, setWires\] = useState<JumperWire\[\]>\(\[[\s\S]*?\]\);/;
const newWires = `const [wires, setWires] = useState<JumperWire[]>(CIRCUIT_PRESETS[0].wires.map(w => ({ ...w, isEnergized: false, logicState: 0, voltage: 0 })));`;
code = code.replace(regexWires, newWires);

const regexSimState = /inputs: \[false, false, false, false, false, false, false, false, false, false\],/;
const newSimState = `inputs: CIRCUIT_PRESETS[0].inputs,`;
code = code.replace(regexSimState, newSimState);

fs.writeFileSync('src/App.tsx', code);
