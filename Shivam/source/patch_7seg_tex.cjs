const fs = require('fs');
let code = fs.readFileSync('src/utils/threeHelpers.ts', 'utf8');

const newCode = `function create7SegmentTexture(val: string, isPowered: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 256, 512);

    const segments = {
      '0': [1,1,1,1,1,1,0],
      '1': [0,1,1,0,0,0,0],
      '2': [1,1,0,1,1,0,1],
      '3': [1,1,1,1,0,0,1],
      '4': [0,1,1,0,0,1,1],
      '5': [1,0,1,1,0,1,1],
      '6': [1,0,1,1,1,1,1],
      '7': [1,1,1,0,0,0,0],
      '8': [1,1,1,1,1,1,1],
      '9': [1,1,1,1,0,1,1],
      'A': [1,1,1,0,1,1,1],
      'B': [0,0,1,1,1,1,1],
      'C': [1,0,0,1,1,1,0],
      'D': [0,1,1,1,1,0,1],
      'E': [1,0,0,1,1,1,1],
      'F': [1,0,0,0,1,1,1]
    };
    
    const active = isPowered ? (segments[val as keyof typeof segments] || segments['0']) : [0,0,0,0,0,0,0];
    
    const drawSeg = (x: number, y: number, w: number, h: number, on: number) => {
      ctx.fillStyle = on ? '#ef4444' : '#334155';
      if (on) {
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 15;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.beginPath();
      // simplified polygon
      ctx.moveTo(x + h/2, y);
      ctx.lineTo(x + w - h/2, y);
      ctx.lineTo(x + w, y + h/2);
      ctx.lineTo(x + w - h/2, y + h);
      ctx.lineTo(x + h/2, y + h);
      ctx.lineTo(x, y + h/2);
      ctx.fill();
    };

    const drawSegV = (x: number, y: number, w: number, h: number, on: number) => {
      ctx.fillStyle = on ? '#ef4444' : '#334155';
      if (on) {
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 15;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.beginPath();
      ctx.moveTo(x, y + w/2);
      ctx.lineTo(x + w/2, y);
      ctx.lineTo(x + w, y + w/2);
      ctx.lineTo(x + w, y + h - w/2);
      ctx.lineTo(x + w/2, y + h);
      ctx.lineTo(x, y + h - w/2);
      ctx.fill();
    };

    // A
    drawSeg(60, 60, 136, 24, active[0]);
    // B
    drawSegV(200, 64, 24, 180, active[1]);
    // C
    drawSegV(200, 268, 24, 180, active[2]);
    // D
    drawSeg(60, 428, 136, 24, active[3]);
    // E
    drawSegV(32, 268, 24, 180, active[4]);
    // F
    drawSegV(32, 64, 24, 180, active[5]);
    // G
    drawSeg(60, 244, 136, 24, active[6]);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 16;
  return tex;
}
`;

code = newCode + code;

const regexSegReplace = /\/\/ Segment shapes loosely drawn inside[\s\S]*?boardGroup\.add\(seg8\);/;
const replaceSeg = `const segTex = create7SegmentTexture(simState.sevenSegmentVal || '0', simState.isPowered);
  const segMat = new THREE.MeshStandardMaterial({map: segTex});
  const segDisplay = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 1.25), segMat);
  segDisplay.rotation.x = -Math.PI / 2;
  segDisplay.position.set(-1.5, plateY + 0.221, -4.0);
  boardGroup.add(segDisplay);`;

code = code.replace(regexSegReplace, replaceSeg);

fs.writeFileSync('src/utils/threeHelpers.ts', code);
