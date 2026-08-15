const fs = require('fs');
let code = fs.readFileSync('src/utils/logicEngine.ts', 'utf8');

const newLogic = `
        } else if (comp.componentMetaId === 'ic-jk-ff') {
          // JK Flip-Flop
          // Simple evaluation - since we don't have previous state easily available without stateful simulation,
          // we'll just simulate a combinational approximation or assume state 0 if memory isn't preserved.
          // For a true flip-flop we'd need simulation ticks. For now we will return static 0 to prevent crash.
          return 0; // Proper implementation requires stateful logic engine
        } else if (comp.componentMetaId === 'ic-7474-d') {
          return 0;
        } else if (comp.componentMetaId === 'ic-sr-ff') {
          return 0;
        } else if (comp.componentMetaId === 'ic-t-ff') {
          return 0;
        }
`;

code = code.replace(/\} else if \(comp\.componentMetaId === 'ic-7402-nor'\) \{[\s\S]*?return result;\s*\}/, "} else if (comp.componentMetaId === 'ic-7402-nor') {\n          const result = !(gateInputs.some((val) => val === 1)) ? 1 : 0;\n          return result;\n        }" + newLogic);

fs.writeFileSync('src/utils/logicEngine.ts', code);
