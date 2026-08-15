const fs = require('fs');
let code = fs.readFileSync('src/components/ActiveItemsMenu.tsx', 'utf8');

const newQuickIcs = `
  { id: 'ic-jk-ff', label: 'JK FF', color: 'border-blue-500/50 bg-blue-950/40 text-blue-300' },
  { id: 'ic-7474-d', label: 'D FF', color: 'border-indigo-500/50 bg-indigo-950/40 text-indigo-300' },
  { id: 'ic-sr-ff', label: 'SR FF', color: 'border-teal-500/50 bg-teal-950/40 text-teal-300' },
  { id: 'ic-t-ff', label: 'T FF', color: 'border-fuchsia-500/50 bg-fuchsia-950/40 text-fuchsia-300' },
`;

code = code.replace(/\{ id: 'ic-7486-xor', label: '7486 \(XOR\)', color: 'border-emerald-500\/50 bg-emerald-950\/40 text-emerald-300' \},/, "{ id: 'ic-7486-xor', label: '7486 (XOR)', color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300' },\n" + newQuickIcs);

fs.writeFileSync('src/components/ActiveItemsMenu.tsx', code);
