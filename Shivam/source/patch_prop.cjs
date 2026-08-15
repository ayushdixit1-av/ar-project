const fs = require('fs');
let code = fs.readFileSync('src/components/Trainer3DViewport.tsx', 'utf8');

const regexProp = /onToggleInput\?: \(index: number\) => void;\n  onTogglePower\?: \(\) => void;/;
const newProp = `onToggleInput?: (index: number) => void;
  onTogglePower?: () => void;
  onToggleClock?: () => void;`;
code = code.replace(regexProp, newProp);

fs.writeFileSync('src/components/Trainer3DViewport.tsx', code);
