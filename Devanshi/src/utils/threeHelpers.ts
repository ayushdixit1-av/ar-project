import * as THREE from 'three';

// Procedural texture generation for breadboard text & numbering
export function createBreadboardLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Transparent background
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Power rail lines
  ctx.lineWidth = 8;

  // Top power rail (+ Red, - Blue)
  ctx.strokeStyle = '#ef4444'; // + Red
  ctx.beginPath();
  ctx.moveTo(80, 80);
  ctx.lineTo(1968, 80);
  ctx.stroke();

  ctx.strokeStyle = '#3b82f6'; // - Blue
  ctx.beginPath();
  ctx.moveTo(80, 160);
  ctx.lineTo(1968, 160);
  ctx.stroke();

  // Bottom power rail
  ctx.strokeStyle = '#ef4444'; // + Red
  ctx.beginPath();
  ctx.moveTo(80, 864);
  ctx.lineTo(1968, 864);
  ctx.stroke();

  ctx.strokeStyle = '#3b82f6'; // - Blue
  ctx.beginPath();
  ctx.moveTo(80, 944);
  ctx.lineTo(1968, 944);
  ctx.stroke();

  // Draw +/- symbols
  ctx.font = 'bold 36px monospace';
  ctx.fillStyle = '#ef4444';
  ctx.fillText('+', 40, 92);
  ctx.fillText('+', 1980, 92);
  ctx.fillText('+', 40, 876);
  ctx.fillText('+', 1980, 876);

  ctx.fillStyle = '#3b82f6';
  ctx.fillText('-', 40, 170);
  ctx.fillText('-', 1980, 170);
  ctx.fillText('-', 40, 954);
  ctx.fillText('-', 1980, 954);

  // Column numbers (1 to 30)
  ctx.font = 'bold 24px monospace';
  ctx.fillStyle = '#64748b';
  ctx.textAlign = 'center';

  const startX = 140;
  const stepX = (1900 - 140) / 29;

  for (let i = 1; i <= 30; i++) {
    const x = startX + (i - 1) * stepX;
    if (i === 1 || i % 5 === 0 || i === 30) {
      ctx.fillText(i.toString(), x, 230);
      ctx.fillText(i.toString(), x, 790);
    }
  }

  // Row letters: a b c d e (top bank) / f g h i j (bottom bank)
  const lettersTop = ['a', 'b', 'c', 'd', 'e'];
  const lettersBottom = ['f', 'g', 'h', 'i', 'j'];

  ctx.font = 'bold 22px monospace';
  ctx.fillStyle = '#94a3b8';

  lettersTop.forEach((letter, idx) => {
    const y = 290 + idx * 38;
    ctx.fillText(letter, 100, y);
    ctx.fillText(letter, 1948, y);
  });

  lettersBottom.forEach((letter, idx) => {
    const y = 570 + idx * 38;
    ctx.fillText(letter, 100, y);
    ctx.fillText(letter, 1948, y);
  });

  // Breadboard Center divider label
  ctx.font = 'italic bold 26px sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('VIRTUAL ELECTRONICS LAB • IC 7486 XOR CONVERTER', 1024, 520);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

// Procedural texture for the 7486 IC chip top face
export function createICTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 340;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Matte dark charcoal package surface
  ctx.fillStyle = '#18181b';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Texture grain / subtle bevel
  ctx.strokeStyle = '#27272a';
  ctx.lineWidth = 4;
  ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

  // Notch circle at left end
  ctx.beginPath();
  ctx.arc(30, canvas.height / 2, 28, 0, Math.PI * 2);
  ctx.fillStyle = '#09090b';
  ctx.fill();
  ctx.strokeStyle = '#3f3f46';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Pin 1 dot
  ctx.beginPath();
  ctx.arc(75, canvas.height - 60, 10, 0, Math.PI * 2);
  ctx.fillStyle = '#52525b';
  ctx.fill();

  // Laser etched markings
  ctx.fillStyle = '#d4d4d8';
  ctx.font = 'bold 52px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SN74HC86N', canvas.width / 2 + 30, 120);

  ctx.font = 'bold 30px monospace';
  ctx.fillStyle = '#a1a1aa';
  ctx.fillText('QUAD 2-INPUT XOR GATE', canvas.width / 2 + 30, 175);

  ctx.font = '22px monospace';
  ctx.fillStyle = '#71717a';
  ctx.fillText('MALAYSIA • 2442AB • 14-DIP', canvas.width / 2 + 30, 230);

  // Logic Gate Symbol mini icon
  ctx.strokeStyle = '#a1a1aa';
  ctx.lineWidth = 2;
  ctx.strokeRect(canvas.width / 2 - 180, 260, 360, 32);
  ctx.font = '16px monospace';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('PIN 1..7: BOTTOM | PIN 8..14: TOP', canvas.width / 2, 282);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

// Generates smooth 3D Catmull-Rom Bezier curve points for jumper wires with elevation arc
export function createWirePath(
  start: THREE.Vector3,
  end: THREE.Vector3,
  arcHeight = 1.2,
  sagFactor = 0.0
): THREE.CatmullRomCurve3 {
  const mid = new THREE.Vector3()
    .addVectors(start, end)
    .multiplyScalar(0.5);

  const dist = start.distanceTo(end);
  const actualHeight = Math.max(0.4, arcHeight + dist * 0.15);

  const p1 = new THREE.Vector3(
    start.x,
    start.y + 0.35,
    start.z
  );

  const p2 = new THREE.Vector3(
    start.x * 0.7 + mid.x * 0.3,
    start.y + actualHeight * 0.85,
    start.z * 0.7 + mid.z * 0.3
  );

  const pMid = new THREE.Vector3(
    mid.x,
    mid.y + actualHeight,
    mid.z
  );

  const p3 = new THREE.Vector3(
    end.x * 0.7 + mid.x * 0.3,
    end.y + actualHeight * 0.85,
    end.z * 0.7 + mid.z * 0.3
  );

  const p4 = new THREE.Vector3(
    end.x,
    end.y + 0.35,
    end.z
  );

  return new THREE.CatmullRomCurve3([start, p1, p2, pMid, p3, p4, end]);
}
