const fs = require('fs');
let code = fs.readFileSync('src/utils/threeHelpers.ts', 'utf8');

// Inside createTrainerBoard3D, before return boardGroup;
const injectIndex = code.indexOf('return boardGroup;');
if (injectIndex > -1) {
  const injectCode = `
  // Combine breadboard visually into the trainer board
  const builtInBreadboard = createBreadboard3D();
  builtInBreadboard.position.set(1.3, 0.22, 0.35);
  boardGroup.add(builtInBreadboard);
  `;
  code = code.substring(0, injectIndex) + injectCode + code.substring(injectIndex);
}

fs.writeFileSync('src/utils/threeHelpers.ts', code);
