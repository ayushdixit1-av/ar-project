const fs = require('fs');
let code = fs.readFileSync('src/utils/threeHelpers.ts', 'utf8');

const regex7Seg = /\/\/ 7-SEGMENT DISPLAY[\s\S]*?boardGroup\.add\(seg8\);/;
const new7Seg = `// 7-SEGMENT DISPLAY
  const segHousing = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 1.6), new THREE.MeshStandardMaterial({color: 0x94a3b8}));
  segHousing.position.set(-1.5, plateY + 0.11, -4.0);
  boardGroup.add(segHousing);
  
  const segFace = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.22, 1.3), new THREE.MeshStandardMaterial({color: 0x1e293b}));
  segFace.position.set(-1.5, plateY + 0.11, -4.0);
  boardGroup.add(segFace);
  
  // Segment shapes loosely drawn inside
  const seg8 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.225, 0.9), 
    new THREE.MeshStandardMaterial({color: 0x334155, wireframe: true})
  );
  seg8.position.set(-1.5, plateY + 0.11, -4.0);
  boardGroup.add(seg8);`;

code = code.replace(regex7Seg, new7Seg);

fs.writeFileSync('src/utils/threeHelpers.ts', code);
