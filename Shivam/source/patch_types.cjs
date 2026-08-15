const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

const regexSimState = /hasShortCircuit: boolean;\n  shortCircuitMsg\?: string;/;
const newSimState = `hasShortCircuit: boolean;
  shortCircuitMsg?: string;
  internalState?: Record<string, any>;`;

code = code.replace(regexSimState, newSimState);
fs.writeFileSync('src/types.ts', code);
