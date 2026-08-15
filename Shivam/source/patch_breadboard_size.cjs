const fs = require('fs');
let code = fs.readFileSync('src/utils/threeHelpers.ts', 'utf8');

const regexTex = /function createBreadboardTopCanvasTexture\(\)[\s\S]*?return texture;\n}/;
const newTex = `function createBreadboardTopCanvasTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#faf8f3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#e2dfd5';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

    const drawHole = (hx: number, hy: number) => {
      ctx.fillStyle = '#dcd8cc';
      ctx.fillRect(hx - 6, hy - 6, 12, 12);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(hx - 4, hy - 4, 8, 8);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(hx - 2, hy - 2, 4, 4);
    };

    const drawPowerStrip = (y: number, isTop: boolean) => {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(70, y);
      ctx.lineTo(1980, y);
      ctx.stroke();

      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(70, y + 56);
      ctx.lineTo(1980, y + 56);
      ctx.stroke();

      ctx.font = 'bold 26px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ef4444';
      ctx.fillText('+', 42, y);
      ctx.fillText('+', 1024, y);
      ctx.fillText('+', 2006, y);
      ctx.fillStyle = '#3b82f6';
      ctx.fillText('−', 42, y + 56);
      ctx.fillText('−', 1024, y + 56);
      ctx.fillText('−', 2006, y + 56);

      for (let col = 1; col <= 60; col++) {
        const hx = 84 + (col - 1) * 31.8;
        drawHole(hx, y);
        drawHole(hx, y + 56);
      }
    };

    const drawTerminalStrip = (y: number) => {
      ctx.fillStyle = '#dfdbce';
      ctx.fillRect(40, y + 118, 1968, 24);
      ctx.fillStyle = '#cac4b4';
      ctx.fillRect(40, y + 126, 1968, 8);

      const slotCenters = [330, 790, 1250, 1710];
      slotCenters.forEach((sc, idx) => {
        ctx.fillStyle = '#8b8474';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(\`— [ IC SOCKET \${idx + 1} ] —\`, sc, y + 130);
      });

      ctx.fillStyle = '#475569';
      ctx.font = 'bold 16px sans-serif';
      const topLetters = ['a', 'b', 'c', 'd', 'e'];
      const botLetters = ['f', 'g', 'h', 'i', 'j'];
      const letterXPositions = [48, 512, 1024, 1536, 2000];
      letterXPositions.forEach((lx) => {
        topLetters.forEach((letStr, rowIdx) => {
          ctx.fillText(letStr, lx, y + rowIdx * 23);
        });
        botLetters.forEach((letStr, rowIdx) => {
          ctx.fillText(letStr, lx, y + 170 + rowIdx * 23);
        });
      });

      ctx.font = 'bold 12px monospace';
      ctx.fillStyle = '#64748b';
      for (let col = 1; col <= 60; col++) {
        const cx = 84 + (col - 1) * 31.8;
        if (col === 1 || col % 5 === 0) {
          ctx.fillText(\`\${col}\`, cx, y - 18);
          ctx.fillText(\`\${col}\`, cx, y + 278);
        }
      }

      for (let col = 1; col <= 60; col++) {
        const hx = 84 + (col - 1) * 31.8;
        for (let r = 0; r < 5; r++) drawHole(hx, y + r * 23);
        for (let r = 0; r < 5; r++) drawHole(hx, y + 170 + r * 23);
      }
    };

    drawPowerStrip(32, true);
    drawTerminalStrip(126);
    drawPowerStrip(424, false);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}`;
code = code.replace(regexTex, newTex);

const regexBody = /const body = new THREE.Mesh\(new THREE.BoxGeometry\(11\.6, 0\.42, 7\.2\), breadboardMat\);/;
const newBody = `const body = new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.42, 2.6), breadboardMat);`;
code = code.replace(regexBody, newBody);

const regexTopPlate = /const topPlate = new THREE.Mesh\(new THREE.PlaneGeometry\(11\.56, 7\.16\), topPlateMat\);/;
const newTopPlate = `const topPlate = new THREE.Mesh(new THREE.PlaneGeometry(11.56, 2.56), topPlateMat);`;
code = code.replace(regexTopPlate, newTopPlate);

const regexTrough = /\[0, 1, 2\]\.forEach\(block => \{[\s\S]*?group\.add\(trough\);\n  \}\);/;
const newTrough = `const trough = new THREE.Mesh(
    new THREE.BoxGeometry(11.2, 0.12, 0.24),
    new THREE.MeshStandardMaterial({ color: 0xcfc8b8, roughness: 0.7 })
  );
  trough.position.set(0, 0.18, 0);
  group.add(trough);`;
code = code.replace(regexTrough, newTrough);

fs.writeFileSync('src/utils/threeHelpers.ts', code);
