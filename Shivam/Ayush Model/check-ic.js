import { IC } from './IC.js';
import { ICManager } from './ICManager.js';
import { ICValidator } from './ICValidator.js';

function runChecks(name, checks) {
  console.log(`\n--- ${name} ---`);
  let allPass = true;
  for (const check of checks) {
    const status = check.ok ?? check.pass ?? check.valid ?? (check.hasOwnProperty('ok') ? check.ok : (check.hasOwnProperty('pass') ? check.pass : false));
    console.log(`${status ? '✅' : '❌'} ${check.name} ${check.detail ? '(' + check.detail + ')' : ''}`);
    if (!status) allPass = false;
  }
  if (allPass) console.log(`🎉 All ${name} checks passed!`);
}

runChecks('IC.validate()', IC.validate());
runChecks('ICManager.validate()', ICManager.validate());
runChecks('ICValidator.checks()', ICValidator.checks());
