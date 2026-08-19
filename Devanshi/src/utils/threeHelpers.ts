import * as THREE from 'three';
import { BreadboardNode, ICComponentInfo, PlacedIC, PlacedSwitch, PlacedLED } from '../types';

// Breadboard geometry parameters
export const BB_WIDTH = 17.2;
export const BB_DEPTH = 6.2;
export const BB_HEIGHT = 0.55;

export const START_COL_X = -7.5;
export const COL_STEP_X = 0.515; // 30 columns across 15 units

// Convert column number (1-30) to 3D X-coordinate
export function getColumnX(col: number): number {
  const c = Math.max(1, Math.min(30, col));
  return START_COL_X + (c - 1) * COL_STEP_X;
}

// Convert 3D X-coordinate to nearest valid breadboard column (1-30)
export function getColumnFromX(x: number): number {
  const col = Math.round((x - START_COL_X) / COL_STEP_X) + 1;
  return Math.max(1, Math.min(30, col));
}

// High-detail procedural texture for Breadboard face (Matching User Image)
export function createBreadboardLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background: Clean matte lab breadboard off-white / light silver
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Power Rail Lines (Red for +, Blue for -)
  ctx.lineWidth = 8;

  // Top Red Rail (+)
  ctx.strokeStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(70, 75);
  ctx.lineTo(1978, 75);
  ctx.stroke();

  // Top Blue Rail (-)
  ctx.strokeStyle = '#3b82f6';
  ctx.beginPath();
  ctx.moveTo(70, 155);
  ctx.lineTo(1978, 155);
  ctx.stroke();

  // Bottom Red Rail (+)
  ctx.strokeStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(70, 865);
  ctx.lineTo(1978, 865);
  ctx.stroke();

  // Bottom Blue Rail (-)
  ctx.strokeStyle = '#3b82f6';
  ctx.beginPath();
  ctx.moveTo(70, 945);
  ctx.lineTo(1978, 945);
  ctx.stroke();

  // Central Divider Channel Background
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(40, 485, canvas.width - 80, 54);

  // Vertical section dividers
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(1024, 210);
  ctx.lineTo(1024, 810);
  ctx.stroke();

  // +/- Symbols on power rails
  ctx.font = 'bold 44px sans-serif';
  ctx.fillStyle = '#ef4444';
  ctx.fillText('+', 32, 88);
  ctx.fillText('+', 1988, 88);
  ctx.fillText('+', 32, 878);
  ctx.fillText('+', 1988, 878);

  ctx.fillStyle = '#3b82f6';
  ctx.fillText('−', 32, 168);
  ctx.fillText('−', 1988, 168);
  ctx.fillText('−', 32, 958);
  ctx.fillText('−', 1988, 958);

  // Column numbers (1 to 30)
  ctx.font = 'bold 22px monospace';
  ctx.fillStyle = '#64748b';
  ctx.textAlign = 'center';

  const startX = 130;
  const stepX = (1920 - 130) / 29;

  for (let i = 1; i <= 30; i++) {
    const x = startX + (i - 1) * stepX;
    if (i === 1 || i % 5 === 0 || i === 30) {
      ctx.fillText(i.toString(), x, 225);
      ctx.fillText(i.toString(), x, 800);
    }
  }

  // Row Letters: a, b, c, d, e (Top) and f, g, h, i, j (Bottom)
  const lettersTop = ['A', 'B', 'C', 'D', 'E'];
  const lettersBottom = ['F', 'G', 'H', 'I', 'J'];

  ctx.font = 'bold 24px monospace';
  ctx.fillStyle = '#64748b';

  lettersTop.forEach((letter, idx) => {
    const y = 285 + idx * 38;
    ctx.fillText(letter, 75, y);
    ctx.fillText(letter, 1970, y);
  });

  lettersBottom.forEach((letter, idx) => {
    const y = 580 + idx * 38;
    ctx.fillText(letter, 75, y);
    ctx.fillText(letter, 1970, y);
  });

  // DRAW CLEAN HOLE CIRCLES (Matching User Image)
  const holeRadius = 9;

  // 1. Power rail holes (Top 2 rows, Bottom 2 rows)
  const powerY = [75, 155, 865, 945];
  powerY.forEach((py) => {
    for (let c = 1; c <= 30; c++) {
      const hx = startX + (c - 1) * stepX;
      // Dark socket
      ctx.beginPath();
      ctx.arc(hx, py, holeRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      // Metallic rim
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });

  // 2. Terminal strip holes (Rows A-E, F-J)
  const terminalRowsY = [
    275, 313, 351, 389, 427, // A B C D E
    570, 608, 646, 684, 722, // F G H I J
  ];

  terminalRowsY.forEach((ry) => {
    for (let c = 1; c <= 30; c++) {
      const hx = startX + (c - 1) * stepX;
      // Dark circular hole socket
      ctx.beginPath();
      ctx.arc(hx, ry, holeRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      // Subtle rim
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

// Procedural texture for IC Chip Top Face (Matching user image: SN74HC7408N / SN74HC7400N in crisp white font)
export function createDynamicICTexture(ic: {
  code: string;
  name: string;
  family?: string;
  formula?: string;
  description?: string;
}): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Matte dark charcoal package surface
  ctx.fillStyle = '#18181b';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle perimeter bevel border
  ctx.strokeStyle = '#27272a';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

  // Notch circle at left end
  ctx.beginPath();
  ctx.arc(36, canvas.height / 2, 28, 0, Math.PI * 2);
  ctx.fillStyle = '#09090b';
  ctx.fill();
  ctx.strokeStyle = '#3f3f46';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Pin 1 orientation dot
  ctx.beginPath();
  ctx.arc(80, canvas.height - 60, 10, 0, Math.PI * 2);
  ctx.fillStyle = '#71717a';
  ctx.fill();

  // Clean laser etched title: e.g. SN74HC7408N
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 56px monospace';
  ctx.textAlign = 'center';
  const icFullName = `SN74HC${ic.code}N`;
  ctx.fillText(icFullName, canvas.width / 2 + 15, 120);

  // Subtitle: e.g. Quad 2-Input AND Gate
  ctx.font = 'bold 30px sans-serif';
  ctx.fillStyle = '#94a3b8';
  let subtitle = ic.name;
  if (ic.code === '7408') subtitle = 'Quad 2-Input AND Gate';
  else if (ic.code === '7400') subtitle = 'Quad 2-Input NAND Gate';
  else if (ic.code === '7486') subtitle = 'Quad 2-Input XOR Gate';
  else if (ic.code === '7404') subtitle = 'Hex Inverter (NOT) Gate';
  else if (ic.code === '7432') subtitle = 'Quad 2-Input OR Gate';
  else if (ic.code === '7402') subtitle = 'Quad 2-Input NOR Gate';
  ctx.fillText(subtitle, canvas.width / 2 + 15, 185);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

// Power Supply LCD Screen Texture
export function createPSUDisplayTexture(voltage = 5.0, current = 0.25): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#09090b';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0284c7';
  ctx.fillRect(12, 12, canvas.width - 24, canvas.height - 24);

  ctx.fillStyle = '#0369a1';
  ctx.fillRect(16, 16, canvas.width - 32, canvas.height - 32);

  ctx.font = 'bold 20px monospace';
  ctx.fillStyle = '#e0f2fe';
  ctx.fillText('DC REGULATED BENCHTOP PSU', 32, 45);

  ctx.font = 'bold 64px monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${voltage.toFixed(2)} V`, 32, 125);

  ctx.font = 'bold 44px monospace';
  ctx.fillStyle = '#bae6fd';
  ctx.fillText(`${current.toFixed(2)} A`, 32, 195);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  return texture;
}

// Multimeter LCD Screen Texture
export function createMultimeterDisplayTexture(value = 5.04, mode = 'DC V'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#1c1917';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#84cc16';
  ctx.fillRect(16, 16, canvas.width - 32, canvas.height - 32);

  ctx.fillStyle = '#65a30d';
  ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);

  ctx.font = 'bold 22px monospace';
  ctx.fillStyle = '#1e293b';
  ctx.fillText(`DIGITAL MULTIMETER [${mode}]`, 35, 52);

  ctx.font = 'bold 84px monospace';
  ctx.fillStyle = '#0f172a';
  ctx.fillText(value.toFixed(2), 40, 150);

  ctx.font = 'bold 36px monospace';
  ctx.fillStyle = '#1e293b';
  ctx.fillText(mode, 360, 210);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  return texture;
}

// Catmull-Rom 3D Spline Jumper Wire Arc
export function createWirePath(
  startPos: THREE.Vector3,
  endPos: THREE.Vector3,
  heightMultiplier = 1.0
): THREE.CatmullRomCurve3 {
  const dist = startPos.distanceTo(endPos);
  const arcHeight = Math.max(0.6, Math.min(2.5, dist * 0.38)) * heightMultiplier;

  const mid1 = new THREE.Vector3().lerpVectors(startPos, endPos, 0.25);
  mid1.y += arcHeight * 0.85;

  const mid2 = new THREE.Vector3().lerpVectors(startPos, endPos, 0.5);
  mid2.y += arcHeight;

  const mid3 = new THREE.Vector3().lerpVectors(startPos, endPos, 0.75);
  mid3.y += arcHeight * 0.85;

  const pStart = new THREE.Vector3(startPos.x, startPos.y + 0.05, startPos.z);
  const pEnd = new THREE.Vector3(endPos.x, endPos.y + 0.05, endPos.z);

  return new THREE.CatmullRomCurve3([pStart, mid1, mid2, mid3, pEnd], false, 'catmullrom', 0.5);
}

// Generate all Breadboard interactive tie points (Holes, Rails, IC pins, Switches, LEDs)
export function getBreadboardNodes(
  placedICs: PlacedIC[] = [],
  placedSwitches: PlacedSwitch[] = [],
  placedLEDs: PlacedLED[] = []
): BreadboardNode[] {
  const nodes: BreadboardNode[] = [];

  // 1. Power Rails (+5V Top, GND Top, +5V Bottom, GND Bottom)
  for (let col = 1; col <= 30; col++) {
    const x = getColumnX(col);
    // VCC Top Rail (Row +)
    nodes.push({
      id: `vcc-top-${col}`,
      label: `+5V Rail (Top Col ${col})`,
      position: [x, 0.55, -2.4],
      category: 'power',
      rowName: '+',
      columnNumber: col,
      description: 'Top VCC Power Rail (+5.0V DC)',
    });
    // GND Top Rail (Row -)
    nodes.push({
      id: `gnd-top-${col}`,
      label: `GND Rail (Top Col ${col})`,
      position: [x, 0.55, -1.95],
      category: 'ground',
      rowName: '−',
      columnNumber: col,
      description: 'Top Ground Reference (0.0V DC)',
    });
    // VCC Bottom Rail (Row +)
    nodes.push({
      id: `vcc-bot-${col}`,
      label: `+5V Rail (Bottom Col ${col})`,
      position: [x, 0.55, 1.95],
      category: 'power',
      rowName: '+',
      columnNumber: col,
      description: 'Bottom VCC Power Rail (+5.0V DC)',
    });
    // GND Bottom Rail (Row -)
    nodes.push({
      id: `gnd-bot-${col}`,
      label: `GND Rail (Bottom Col ${col})`,
      position: [x, 0.55, 2.4],
      category: 'ground',
      rowName: '−',
      columnNumber: col,
      description: 'Bottom Ground Reference (0.0V DC)',
    });
  }

  // 2. Terminal Strip Holes (Rows A-E above divider, Rows F-J below divider)
  const rowsTop = [
    { name: 'A', z: -1.45 },
    { name: 'B', z: -1.2 },
    { name: 'C', z: -0.95 },
    { name: 'D', z: -0.7 },
    { name: 'E', z: -0.45 },
  ];
  const rowsBottom = [
    { name: 'F', z: 0.45 },
    { name: 'G', z: 0.7 },
    { name: 'H', z: 0.95 },
    { name: 'I', z: 1.2 },
    { name: 'J', z: 1.45 },
  ];

  for (let col = 1; col <= 30; col++) {
    const x = getColumnX(col);
    rowsTop.forEach((r) => {
      nodes.push({
        id: `hole-${r.name.toLowerCase()}-${col}`,
        label: `Tie-Point ${r.name}${col}`,
        position: [x, 0.55, r.z],
        category: 'custom',
        rowName: r.name,
        columnNumber: col,
        description: `Breadboard Tie Point Row ${r.name}, Column ${col}`,
      });
    });
    rowsBottom.forEach((r) => {
      nodes.push({
        id: `hole-${r.name.toLowerCase()}-${col}`,
        label: `Tie-Point ${r.name}${col}`,
        position: [x, 0.55, r.z],
        category: 'custom',
        rowName: r.name,
        columnNumber: col,
        description: `Breadboard Tie Point Row ${r.name}, Column ${col}`,
      });
    });
  }

  // 3. Dynamic IC Pin Nodes for each mounted IC
  placedICs.forEach((ic) => {
    const startCol = ic.columnStart || 12;
    for (let p = 0; p < 7; p++) {
      const pinNum = p + 1; // Pins 1..7 (Bottom row F)
      const col = startCol + p;
      const x = getColumnX(col);
      nodes.push({
        id: `ic-${ic.id}-pin-${pinNum}`,
        label: `${ic.name.split(' ')[0]} Pin ${pinNum}`,
        position: [x, 0.72, 0.55],
        category: pinNum === 7 ? 'ground' : 'custom',
        description: `IC ${ic.icCode} Pin ${pinNum} at Column ${col}`,
      });
    }
    for (let p = 0; p < 7; p++) {
      const pinNum = 14 - p; // Pins 14..8 (Top row E)
      const col = startCol + p;
      const x = getColumnX(col);
      nodes.push({
        id: `ic-${ic.id}-pin-${pinNum}`,
        label: `${ic.name.split(' ')[0]} Pin ${pinNum}`,
        position: [x, 0.72, -0.55],
        category: pinNum === 14 ? 'power' : 'custom',
        description: `IC ${ic.icCode} Pin ${pinNum} at Column ${col}`,
      });
    }
  });

  // 4. Dynamic Switch Terminal Nodes
  placedSwitches.forEach((sw) => {
    const col = sw.column || 2;
    const x = getColumnX(col);
    nodes.push({
      id: `sw-${sw.id}-out`,
      label: `${sw.label} Output Terminal`,
      position: [x, 0.65, 0.7],
      category: 'input',
      description: `Output terminal of ${sw.label} (Column ${col})`,
    });
  });

  // 5. Dynamic LED Anode/Cathode Nodes
  placedLEDs.forEach((led) => {
    const col = led.column || 24;
    const x = getColumnX(col);
    nodes.push({
      id: `led-${led.id}-anode`,
      label: `${led.label} Anode (+)`,
      position: [x - 0.1, 0.65, 0.95],
      category: 'output',
      description: `Anode terminal (+) of ${led.label} (${led.color})`,
    });
    nodes.push({
      id: `led-${led.id}-cathode`,
      label: `${led.label} Cathode (−)`,
      position: [x + 0.1, 0.65, 0.95],
      category: 'ground',
      description: `Cathode terminal (−) of ${led.label}`,
    });
  });

  return nodes;
}
