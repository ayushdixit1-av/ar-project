const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/1000\);\n    return \(\) => clearInterval\(interval\);/, '500);\n    return () => clearInterval(interval);');

fs.writeFileSync('src/App.tsx', code);
