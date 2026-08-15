const fs = require('fs');
let code = fs.readFileSync('src/utils/logicEngine.ts', 'utf8');

const regex7474 = /case '7474': \{\s*\/\/ Dual D Flip-Flop\s*const clr =[^}]*break;\s*\}/;
code = code.replace(regex7474, '');

fs.writeFileSync('src/utils/logicEngine.ts', code);
