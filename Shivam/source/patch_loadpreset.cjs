const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexPreset = /isPowered: false,\n    \}\)\);/;
const newPreset = `isPowered: false,
      internalState: {},
    }));`;
code = code.replace(regexPreset, newPreset);
fs.writeFileSync('src/App.tsx', code);
