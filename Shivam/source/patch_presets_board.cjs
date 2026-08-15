const fs = require('fs');
let code = fs.readFileSync('src/data/presets.ts', 'utf8');

// Remove comp-bb from baseComponents
const regexBB = /,\s*\{\s*id:\s*'comp-bb'[^}]+\}/;
code = code.replace(regexBB, '');

// Update wires: replace comp-bb with comp-base
// For VCC:
// Replace '{ id: 'w-vcc', ... }' and '{ id: 'w-gnd', ... }'
// And replace '{ id: 'w-ic-vcc', fromComponentId: 'comp-bb', fromPinId: 'bb-top-vcc', ... }' with '{ id: 'w-ic-vcc', fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a', ... }'
// And replace '{ id: 'w-ic-gnd', fromComponentId: 'comp-bb', fromPinId: 'bb-top-gnd', ... }' with '{ id: 'w-ic-gnd', fromComponentId: 'comp-base', fromPinId: 'tb-gnd1', ... }'

code = code.replace(/\{ id: 'w-vcc', fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a', toComponentId: 'comp-bb', toPinId: 'bb-top-vcc', color: '#ef4444' \},\n\s*/g, '');
code = code.replace(/\{ id: 'w-gnd', fromComponentId: 'comp-base', fromPinId: 'tb-gnd1', toComponentId: 'comp-bb', toPinId: 'bb-top-gnd', color: '#1e293b' \},\n\s*/g, '');

code = code.replace(/fromComponentId: 'comp-bb', fromPinId: 'bb-top-vcc'/g, "fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a'");
code = code.replace(/fromComponentId: 'comp-bb', fromPinId: 'bb-top-gnd'/g, "fromComponentId: 'comp-base', fromPinId: 'tb-gnd1'");
code = code.replace(/fromComponentId: 'comp-bb', fromPinId: 'bb-top-vcc'/g, "fromComponentId: 'comp-base', fromPinId: 'tb-vcc5a'"); // In case clr, pr also used it
code = code.replace(/fromComponentId: 'comp-bb', fromPinId: 'bb-top-gnd'/g, "fromComponentId: 'comp-base', fromPinId: 'tb-gnd1'");

fs.writeFileSync('src/data/presets.ts', code);
