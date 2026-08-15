const fs = require('fs');
let code = fs.readFileSync('src/components/LeftSidebarLibrary.tsx', 'utf8');

const newICs = `
  {
    id: 'ic-jk-ff',
    icNumber: 'JK Flip-Flop',
    gate: 'JK Flip-Flop',
    functionName: 'JK',
    numberOfGates: 'Dual JK Flip-Flop',
    logicExpression: 'Q(t+1) = J·Q\\'(t) + K\\'·Q(t)',
    renderExpression: () => (
      <span className="font-mono font-bold text-blue-300">
        Q(next) = J<span className="overline">Q</span> + <span className="overline">K</span>Q
      </span>
    ),
    description: 'Set, Reset, Toggle based on JK at CLK edge.',
    color: 'border-blue-500/50 bg-blue-950/40 text-blue-300 hover:border-blue-400 hover:bg-blue-900/50',
    iconColor: 'text-blue-400',
  },
  {
    id: 'ic-7474-d',
    icNumber: 'D Flip-Flop',
    gate: 'D Flip-Flop',
    functionName: 'D',
    numberOfGates: 'Dual D Flip-Flop',
    logicExpression: 'Q(t+1) = D',
    renderExpression: () => (
      <span className="font-mono font-bold text-indigo-300">
        Q(next) = D
      </span>
    ),
    description: 'Captures Data at CLK edge.',
    color: 'border-indigo-500/50 bg-indigo-950/40 text-indigo-300 hover:border-indigo-400 hover:bg-indigo-900/50',
    iconColor: 'text-indigo-400',
  },
  {
    id: 'ic-sr-ff',
    icNumber: 'SR Flip-Flop',
    gate: 'SR Flip-Flop',
    functionName: 'SR',
    numberOfGates: 'Dual SR Flip-Flop',
    logicExpression: 'Q(t+1) = S + R\\'·Q(t)',
    renderExpression: () => (
      <span className="font-mono font-bold text-teal-300">
        Q(next) = S + <span className="overline">R</span>Q
      </span>
    ),
    description: 'Set or Reset based on SR at CLK edge.',
    color: 'border-teal-500/50 bg-teal-950/40 text-teal-300 hover:border-teal-400 hover:bg-teal-900/50',
    iconColor: 'text-teal-400',
  },
  {
    id: 'ic-t-ff',
    icNumber: 'T Flip-Flop',
    gate: 'T Flip-Flop',
    functionName: 'T',
    numberOfGates: 'Dual T Flip-Flop',
    logicExpression: 'Q(t+1) = T ⊕ Q(t)',
    renderExpression: () => (
      <span className="font-mono font-bold text-fuchsia-300">
        Q(next) = T ⊕ Q
      </span>
    ),
    description: 'Toggles output on CLK edge if T is high.',
    color: 'border-fuchsia-500/50 bg-fuchsia-950/40 text-fuchsia-300 hover:border-fuchsia-400 hover:bg-fuchsia-900/50',
    iconColor: 'text-fuchsia-400',
  },
];
`;

code = code.replace(/\];\s*export function LeftSidebarLibrary/, newICs + '\n\nexport function LeftSidebarLibrary');

fs.writeFileSync('src/components/LeftSidebarLibrary.tsx', code);
