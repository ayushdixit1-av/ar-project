const fs = require('fs');
let code = fs.readFileSync('src/utils/logicEngine.ts', 'utf8');

code = code.replace(/const simState: SimulationState = \{ \.\.\.currentSimState \};/, 'const simState: SimulationState = { ...currentSimState, internalState: { ...(currentSimState.internalState || {}) } };');

fs.writeFileSync('src/utils/logicEngine.ts', code);
