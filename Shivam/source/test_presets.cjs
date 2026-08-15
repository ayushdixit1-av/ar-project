const { readFileSync } = require('fs');
const content = readFileSync('src/data/presets.ts', 'utf8');
const match = content.match(/components:\s*\[([\s\S]*?)\]/);
console.log(match[1]);
