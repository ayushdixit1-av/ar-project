const fs = require('fs');
let code = fs.readFileSync('src/utils/threeHelpers.ts', 'utf8');

const regexBtn = /const clkBtn = new THREE\.Mesh\(new THREE\.CylinderGeometry\(0\.18, 0\.18, 0\.15, 16\), new THREE\.MeshStandardMaterial\(\{color: 0xef4444\}\)\);\n  clkBtn\.position\.set\(4\.8, plateY \+ 0\.08, -3\.5\);/;
const newBtn = `const clkBtnMat = new THREE.MeshStandardMaterial({
    color: simState.button1Pressed ? 0xb91c1c : 0xef4444,
    emissive: simState.button1Pressed ? 0xef4444 : 0x000000,
    emissiveIntensity: simState.button1Pressed ? 0.5 : 0
  });
  const clkBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.15, 16), clkBtnMat);
  clkBtn.position.set(4.8, plateY + (simState.button1Pressed ? 0.05 : 0.08), -3.5);`;
code = code.replace(regexBtn, newBtn);

fs.writeFileSync('src/utils/threeHelpers.ts', code);
