const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexSwitches = /\(simState\.inputs \|\| new Array\(10\)\.fill\(false\)\)\.map\(\(isHigh, idx\) => \(/;
const newSwitches = `(simState.inputs || new Array(10).fill(false)).slice(0, 4).map((isHigh, idx) => (`
code = code.replace(regexSwitches, newSwitches);

// Fix the array of slotted components to match the new X positions
const regexSlotPositions = /const IC_SLOT_X_POSITIONS = \[\-2\.8, \-0\.1, 2\.6, 5\.3\];/g;
const newSlotPositions = `const IC_SLOT_X_POSITIONS = [-2.63, -0.02, 2.58, 5.18];`;
code = code.replace(regexSlotPositions, newSlotPositions);

const regexTarget = /position: \[targetX, 0\.47, 0\.35\],/g;
const newTarget = `position: [targetX, 0.47, 0.25],`;
code = code.replace(regexTarget, newTarget);

// Wait, the initial component placement in App.tsx might also need fixing
const regexInitPos = /id: 'comp-ic-7408',[\s\S]*?position: \[\-2\.8, 0\.47, 0\.35\],/g;
const newInitPos = `id: 'comp-ic-7408',
      componentMetaId: 'ic-7408-and',
      label: '7408 Quad 2-Input AND Gate IC',
      position: [-2.63, 0.47, 0.25],`;
code = code.replace(regexInitPos, newInitPos);

fs.writeFileSync('src/App.tsx', code);
