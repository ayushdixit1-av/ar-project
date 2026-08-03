import * as THREE from 'three';
import { PlacedComponent, JumperWire, ViewRenderMode, SimulationState } from '../types';
import { COMPONENTS_LIBRARY } from '../data/componentsLibrary';

// Reuse materials for performance & memory efficiency
const pcbBlackMat = new THREE.MeshStandardMaterial({ color: 0x07080c, roughness: 0.3, metalness: 0.2 });
const pcbBlueMat = new THREE.MeshStandardMaterial({ color: 0x004488, roughness: 0.35, metalness: 0.1 });
const pcbGreenMat = new THREE.MeshStandardMaterial({ color: 0x0b6623, roughness: 0.3, metalness: 0.1 });
const plasticWhiteMat = new THREE.MeshStandardMaterial({ color: 0xebf0f5, roughness: 0.4, metalness: 0.05 });
const plasticDarkMat = new THREE.MeshStandardMaterial({ color: 0x181a20, roughness: 0.5, metalness: 0.1 });
const goldPinMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.2, metalness: 0.9 });
const silverMetalMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.25, metalness: 0.85 });
const wireframeMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true });
const glassTransparentMat = new THREE.MeshPhysicalMaterial({
  color: 0x3b82f6,
  transmission: 0.85,
  opacity: 0.35,
  transparent: true,
  roughness: 0.1,
  ior: 1.5,
});

/**
 * Procedurally creates 3D object for a placed component
 */
export function createComponentMesh(
  placed: PlacedComponent,
  renderMode: ViewRenderMode,
  simState: SimulationState
): THREE.Group {
  const meta = COMPONENTS_LIBRARY.find((c) => c.id === placed.componentMetaId) || COMPONENTS_LIBRARY[0];
  const group = new THREE.Group();
  group.name = `component-${placed.id}`;

  let bodyMesh: THREE.Object3D;

  if (meta.id === 'trainer-board-base') {
    bodyMesh = createTrainerBoard3D(simState);
  } else if (meta.id === 'breadboard-830') {
    bodyMesh = createBreadboard3D();
  } else if (meta.id === 'arduino-nano') {
    bodyMesh = createArduinoNano3D(simState);
  } else if (meta.id.startsWith('ic-74')) {
    bodyMesh = createLogicIC3D(meta.icSeries || '7408', meta.name, renderMode === 'xray', simState);
  } else if (meta.id === 'multimeter-virtual') {
    bodyMesh = createMultimeter3D(simState);
  } else if (meta.id.startsWith('led-')) {
    bodyMesh = createLED3D(meta.id, placed.id, simState);
  } else if (meta.id.startsWith('resistor-')) {
    bodyMesh = createResistor3D(meta.id);
  } else {
    bodyMesh = createGenericModule3D(meta.name, meta.dimensions);
  }

  group.add(bodyMesh);

  // Add 3D Pin Sockets & Snap Markers
  meta.pins.forEach((pin) => {
    const pinMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.15, 8),
      pin.type === 'VCC' || pin.type === 'POWER'
        ? new THREE.MeshStandardMaterial({ color: 0xef4444 })
        : pin.type === 'GND'
        ? new THREE.MeshStandardMaterial({ color: 0x3b82f6 })
        : goldPinMat
    );
    pinMesh.position.set(pin.relativePos[0], pin.relativePos[1], pin.relativePos[2]);
    pinMesh.name = `pin-${placed.id}-${pin.id}`;
    pinMesh.userData = { componentId: placed.id, pinId: pin.id, pinMeta: pin };
    group.add(pinMesh);
  });

  // Apply Render Modes
  if (renderMode === 'wireframe') {
    group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = wireframeMat;
      }
    });
  } else if (renderMode === 'transparent') {
    group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = glassTransparentMat;
      }
    });
  } else if (renderMode === 'explode') {
    const explosionFactor = placed.explodedOffset || 1.2;
    bodyMesh.position.y += 0.5 * explosionFactor;
  }

  return group;
}

// ==================== PROCEDURAL 3D MODULE CREATORS ====================

function createTrainerBoard3D(simState: SimulationState): THREE.Group {
  const boardGroup = new THREE.Group();

  // PCB / ABS Plastic Console Main Base Plate (Dimensions: 12 x 0.6 x 8)
  const pcbGeo = new THREE.BoxGeometry(12, 0.6, 8);
  const pcbMesh = new THREE.Mesh(pcbGeo, pcbBlackMat);
  pcbMesh.receiveShadow = true;
  pcbMesh.castShadow = true;
  boardGroup.add(pcbMesh);

  // Clean White Top Base Plate Sheet for High Visibility
  const faceplateGeo = new THREE.BoxGeometry(11.8, 0.02, 7.8);
  const faceplateMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.25,
    metalness: 0.05,
  });
  const faceplateMesh = new THREE.Mesh(faceplateGeo, faceplateMat);
  faceplateMesh.position.y = 0.301;
  faceplateMesh.receiveShadow = true;
  boardGroup.add(faceplateMesh);

  // Rubber Feet on 4 Bottom Corners
  const feetMat = plasticDarkMat;
  const feetPos = [
    [-5.5, -0.35, -3.5],
    [5.5, -0.35, -3.5],
    [-5.5, -0.35, 3.5],
    [5.5, -0.35, 3.5],
  ];
  feetPos.forEach(([fx, fy, fz]) => {
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 0.15, 16), feetMat);
    foot.position.set(fx, fy, fz);
    boardGroup.add(foot);
  });

  // Corner Bevel Mounting Screws
  const screwPos = [
    [-5.6, 0.31, -3.6],
    [5.6, 0.31, -3.6],
    [-5.6, 0.31, 3.6],
    [5.6, 0.31, 3.6],
  ];
  screwPos.forEach(([sx, sy, sz]) => {
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 12), silverMetalMat);
    screw.position.set(sx, sy, sz);
    boardGroup.add(screw);
  });

  // Screen Printed Bezel Outline
  const borderGeo = new THREE.BoxGeometry(11.6, 0.02, 7.6);
  const borderMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true });
  const borderMesh = new THREE.Mesh(borderGeo, borderMat);
  borderMesh.position.y = 0.31;
  boardGroup.add(borderMesh);

  // Power Supply Status Panel (+5V, GND, VCC Terminals)
  const powerBoxGeo = new THREE.BoxGeometry(2.0, 0.4, 2.2);
  const powerBox = new THREE.Mesh(powerBoxGeo, plasticDarkMat);
  powerBox.position.set(-5.2, 0.3, 0);
  boardGroup.add(powerBox);

  // High-contrast White Top Panel for Power Box
  const pwrPlate = new THREE.Mesh(
    new THREE.BoxGeometry(1.9, 0.02, 2.1),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
  );
  pwrPlate.position.set(-5.2, 0.51, 0);
  boardGroup.add(pwrPlate);

  // Red +5V VCC Color Block Marker
  const vccBlock = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.03, 0.8),
    new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 })
  );
  vccBlock.position.set(-5.2, 0.52, -0.6);
  boardGroup.add(vccBlock);

  // Blue GND Color Block Marker
  const gndBlock = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.03, 0.8),
    new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3 })
  );
  gndBlock.position.set(-5.2, 0.52, 0.6);
  boardGroup.add(gndBlock);

  // Power Switch LED
  const pwrLedMat = new THREE.MeshStandardMaterial({
    color: simState.isPowered ? 0x22c55e : 0xef4444,
    emissive: simState.isPowered ? 0x22c55e : 0x000000,
    emissiveIntensity: simState.isPowered ? 1.5 : 0,
  });
  const pwrLed = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16), pwrLedMat);
  pwrLed.position.set(-5.2, 0.52, -1.6);
  boardGroup.add(pwrLed);

  // 10 LOGIC OUTPUT STATUS LEDs (OUT1 - OUT10) ALONG TOP PANEL
  for (let i = 0; i < 10; i++) {
    const xPos = -4.5 + i * 1.0;
    const isLit = simState.isPowered && (simState.outputs ? simState.outputs[i] : false);

    // Bezel collar
    const bezel = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.1, 16), plasticDarkMat);
    bezel.position.set(xPos, 0.35, -2.8);
    boardGroup.add(bezel);

    // LED Bulb dome
    const ledColor = i % 2 === 0 ? 0xef4444 : 0x22c55e;
    const ledMat = new THREE.MeshStandardMaterial({
      color: ledColor,
      emissive: isLit ? ledColor : 0x000000,
      emissiveIntensity: isLit ? 3.0 : 0,
      roughness: 0.2,
    });
    const ledDome = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.16, 16), ledMat);
    ledDome.position.set(xPos, 0.42, -2.8);
    boardGroup.add(ledDome);

    // Terminal Pin socket base
    const pinBase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 12), silverMetalMat);
    pinBase.position.set(xPos, 0.35, -2.2);
    boardGroup.add(pinBase);
  }

  // 10 LOGIC INPUT TOGGLE SWITCHES (SW1 - SW10) ALONG BOTTOM PANEL
  for (let i = 0; i < 10; i++) {
    const xPos = -4.5 + i * 1.0;
    const isOn = simState.inputs ? simState.inputs[i] : false;

    // Switch Box
    const swBox = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.22, 0.5), plasticDarkMat);
    swBox.position.set(xPos, 0.35, 2.6);
    swBox.name = `switch-box-${i}`;
    boardGroup.add(swBox);

    // Toggle Lever
    const leverMat = new THREE.MeshStandardMaterial({
      color: isOn ? 0x22c55e : 0x64748b,
      metalness: 0.5,
      roughness: 0.3,
    });
    const lever = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.28, 12), leverMat);
    lever.position.set(xPos, 0.48, 2.6);
    lever.rotation.x = isOn ? -0.3 : 0.3;
    lever.name = `switch-lever-${i}`;
    boardGroup.add(lever);

    // Mini indicator LED above switch
    const swLedMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: isOn ? 0x22c55e : 0x000000,
      emissiveIntensity: isOn ? 2.5 : 0,
    });
    const swLed = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.04, 12), swLedMat);
    swLed.position.set(xPos, 0.38, 2.25);
    boardGroup.add(swLed);

    // Terminal Pin socket base
    const pinBase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 12), silverMetalMat);
    pinBase.position.set(xPos, 0.35, 3.2);
    boardGroup.add(pinBase);
  }

  return boardGroup;
}

function createBreadboard3D(): THREE.Group {
  const group = new THREE.Group();

  // Enlarge white plastic breadboard body (9.6 x 0.4 x 2.2) to fit 3 ICs with >= 4 pin spacing
  const body = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.4, 2.2), plasticWhiteMat);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Center divider trough channel for DIP IC alignment
  const trough = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.1, 0.22), plasticDarkMat);
  trough.position.set(0, 0.18, 0);
  group.add(trough);

  // Power distribution bus lines (Red +5V, Blue GND)
  const redStrip1 = new THREE.Mesh(new THREE.BoxGeometry(9.0, 0.02, 0.04), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
  redStrip1.position.set(0, 0.205, -0.92);
  group.add(redStrip1);

  const blueStrip1 = new THREE.Mesh(new THREE.BoxGeometry(9.0, 0.02, 0.04), new THREE.MeshBasicMaterial({ color: 0x3b82f6 }));
  blueStrip1.position.set(0, 0.205, -0.78);
  group.add(blueStrip1);

  const redStrip2 = new THREE.Mesh(new THREE.BoxGeometry(9.0, 0.02, 0.04), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
  redStrip2.position.set(0, 0.205, 0.78);
  group.add(redStrip2);

  const blueStrip2 = new THREE.Mesh(new THREE.BoxGeometry(9.0, 0.02, 0.04), new THREE.MeshBasicMaterial({ color: 0x3b82f6 }));
  blueStrip2.position.set(0, 0.205, 0.92);
  group.add(blueStrip2);

  // Grid of socket terminal contact holes across enlarged breadboard (-18 to +18 col)
  const holeMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
  const holeGeo = new THREE.BoxGeometry(0.06, 0.02, 0.06);

  // Render socket holes array for high visual precision across enlarged breadboard
  for (let col = -18; col <= 18; col++) {
    const x = col * 0.24;
    // Top terminal strips (rows a-e)
    for (let row = 0; row < 5; row++) {
      const z = -0.62 + row * 0.1;
      const hole = new THREE.Mesh(holeGeo, holeMat);
      hole.position.set(x, 0.201, z);
      group.add(hole);
    }
    // Bottom terminal strips (rows f-j)
    for (let row = 0; row < 5; row++) {
      const z = 0.22 + row * 0.1;
      const hole = new THREE.Mesh(holeGeo, holeMat);
      hole.position.set(x, 0.201, z);
      group.add(hole);
    }
  }

  return group;
}

/**
 * Generates dynamic Canvas texture for top face silk-screen printing on DIP ICs
 */
function createICTopCanvasTexture(icSeries: string, fullName: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Matte dark epoxy IC surface
    ctx.fillStyle = '#161822';
    ctx.fillRect(0, 0, 512, 200);

    // Bevel outer border
    ctx.strokeStyle = '#2e3648';
    ctx.lineWidth = 6;
    ctx.strokeRect(6, 6, 500, 188);

    // Semicircular orientation notch on left
    ctx.beginPath();
    ctx.arc(0, 100, 26, -Math.PI / 2, Math.PI / 2);
    ctx.fillStyle = '#0a0a0f';
    ctx.fill();

    // Pin 1 Indicator Circle
    ctx.beginPath();
    ctx.arc(38, 152, 9, 0, Math.PI * 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fill();

    // Manufacturer / Brand Logo
    ctx.font = 'bold 22px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('⚡ SN74LS CHIP', 65, 48);

    // Main Part Number Title (e.g. SN74LS08N / SN74LS00N)
    ctx.font = 'bold 44px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`SN74LS${icSeries}N`, 65, 102);

    // Full Gate Function Description Subtitle
    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = '#38bdf8';
    const cleanName = fullName.replace(/IC \(DIP-14\)/g, '').toUpperCase();
    ctx.fillText(cleanName, 65, 142);

    // Pin numbers along bottom edge (Pins 1 - 7)
    ctx.font = 'bold 18px monospace';
    ctx.fillStyle = '#cbd5e1';
    const bPins = ['1', '2', '3', '4', '5', '6', '7:GND'];
    bPins.forEach((p, idx) => {
      ctx.fillText(p, 55 + idx * 64, 182);
    });

    // Pin numbers along top edge (Pins 14 - 8)
    const tPins = ['14:VCC', '13', '12', '11', '10', '9', '8'];
    tPins.forEach((p, idx) => {
      ctx.fillText(p, 50 + idx * 64, 28);
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Procedurally creates 3D DIP-14 logic gate IC with X-Ray option (Internal silicon die & gold bond wires)
 */
function createLogicIC3D(icSeries: string, fullName: string, isXRay: boolean, simState: SimulationState): THREE.Group {
  const group = new THREE.Group();

  // Main Black Epoxy Package or X-Ray Translucent Package
  const bodyMat = isXRay
    ? new THREE.MeshPhysicalMaterial({
        color: 0x2563eb,
        transmission: 0.85,
        opacity: 0.4,
        transparent: true,
        roughness: 0.1,
        ior: 1.5,
      })
    : plasticDarkMat;

  // Main IC Body (DIP-14)
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.35, 0.8), bodyMat);
  body.position.y = 0.22;
  body.castShadow = true;
  group.add(body);

  // Top Face Silk-Screen Print Label with IC part number, gate type & pin numbers
  if (!isXRay) {
    const labelTex = createICTopCanvasTexture(icSeries, fullName);
    const labelMat = new THREE.MeshStandardMaterial({
      map: labelTex,
      roughness: 0.4,
      metalness: 0.1,
    });
    const labelMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.92, 0.76), labelMat);
    labelMesh.rotation.x = -Math.PI / 2;
    labelMesh.position.set(0, 0.398, 0);
    group.add(labelMesh);
  }

  // Floating 3D Badge Tag Plate above IC
  const tagBgMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 });
  const tagMesh = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.22, 0.05), tagBgMat);
  tagMesh.position.set(0, 0.8, 0);

  const tagCanvas = document.createElement('canvas');
  tagCanvas.width = 256;
  tagCanvas.height = 64;
  const tagCtx = tagCanvas.getContext('2d');
  if (tagCtx) {
    tagCtx.fillStyle = '#0f172a';
    tagCtx.fillRect(0, 0, 256, 64);
    tagCtx.fillStyle = '#38bdf8';
    tagCtx.font = 'bold 24px monospace';
    tagCtx.textAlign = 'center';
    tagCtx.fillText(`SN74LS${icSeries}N GATE`, 128, 40);
  }
  const tagTex = new THREE.CanvasTexture(tagCanvas);
  const tagFrontMat = new THREE.MeshBasicMaterial({ map: tagTex });
  const tagFront = new THREE.Mesh(new THREE.PlaneGeometry(1.58, 0.2), tagFrontMat);
  tagFront.position.set(0, 0.8, 0.03);
  group.add(tagMesh);
  group.add(tagFront);

  // Semicircular orientation notch on Pin 1 side
  const notchGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.36, 16, 1, false, Math.PI / 2, Math.PI);
  const notch = new THREE.Mesh(notchGeo, plasticDarkMat);
  notch.position.set(-1.0, 0.22, 0);
  notch.rotation.y = Math.PI / 2;
  group.add(notch);

  // Pin 1 Indicator Circle Marker
  const pin1Dot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.02, 16),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.5 })
  );
  pin1Dot.position.set(-0.8, 0.401, 0.28);
  group.add(pin1Dot);

  // 14 Metallic Dual In-line Lead Pins (Gull-wing DIP pins)
  const pinMat = silverMetalMat;
  const pinGeo = new THREE.BoxGeometry(0.06, 0.3, 0.08);

  for (let i = 0; i < 7; i++) {
    const x = -0.72 + i * 0.24;

    // Pin Left Side (Pins 1-7)
    const pinL = new THREE.Mesh(pinGeo, pinMat);
    pinL.position.set(x, 0.1, 0.44);
    group.add(pinL);

    // Pin Right Side (Pins 14-8)
    const pinR = new THREE.Mesh(pinGeo, pinMat);
    pinR.position.set(x, 0.1, -0.44);
    group.add(pinR);
  }

  // X-RAY MODE: Render Internal Silicon Die & Gold Bond Wires
  if (isXRay) {
    // Silicon Chip Die
    const siliconMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.1 });
    const die = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.08, 0.4), siliconMat);
    die.position.set(0, 0.22, 0);
    group.add(die);

    // Glowing Logic Micro-Circuit Patterns
    const dieGlowMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 2.5,
    });
    const microTrace = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.09, 0.25), dieGlowMat);
    microTrace.position.set(0, 0.22, 0);
    group.add(microTrace);

    // Gold Bond Wires connecting silicon die to 14 lead frame pins
    for (let i = 0; i < 7; i++) {
      const x = -0.72 + i * 0.24;
      // Wire left
      const wireL = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.35, 6), goldPinMat);
      wireL.position.set(x * 0.5, 0.22, -0.2);
      wireL.rotation.x = Math.PI / 4;
      group.add(wireL);

      // Wire right
      const wireR = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.35, 6), goldPinMat);
      wireR.position.set(x * 0.5, 0.22, 0.2);
      wireR.rotation.x = -Math.PI / 4;
      group.add(wireR);
    }
  }

  return group;
}

function createArduinoNano3D(simState: SimulationState): THREE.Group {
  const group = new THREE.Group();

  const pcb = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.15, 1.8), pcbBlueMat);
  pcb.castShadow = true;
  group.add(pcb);

  const chip = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.1, 0.8), plasticDarkMat);
  chip.position.set(0, 0.12, 0);
  group.add(chip);

  const usb = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.3, 0.7), silverMetalMat);
  usb.position.set(-1.8, 0.18, 0);
  group.add(usb);

  return group;
}

function createMultimeter3D(simState: SimulationState): THREE.Group {
  const group = new THREE.Group();

  // Yellow Rubberized Body
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.3 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.2, 2.2), bodyMat);
  body.position.y = 0.6;
  group.add(body);

  // Digital LCD Display Glass
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x022c22,
    emissive: 0x065f46,
    emissiveIntensity: 0.6,
  });
  const screen = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 1.0), screenMat);
  screen.position.set(0, 1.21, -0.4);
  group.add(screen);

  // Rotary Selector Dial
  const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16), plasticDarkMat);
  dial.position.set(0, 1.22, 0.4);
  group.add(dial);

  return group;
}

function createLED3D(id: string, compId: string, simState: SimulationState): THREE.Group {
  const group = new THREE.Group();

  let colorHex = 0xef4444; // Red
  if (id.includes('green')) colorHex = 0x22c55e;
  if (id.includes('blue')) colorHex = 0x3b82f6;

  const isLit = simState.isPowered && simState.ledStates[compId]?.lit === true;

  const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.32, 0.1, 16), silverMetalMat);
  rim.position.y = 0.05;
  group.add(rim);

  const domeMat = new THREE.MeshPhysicalMaterial({
    color: colorHex,
    emissive: isLit ? colorHex : 0x000000,
    emissiveIntensity: isLit ? 3.5 : 0,
    transmission: 0.8,
    opacity: 0.9,
    transparent: true,
    roughness: 0.1,
  });
  const dome = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.6, 16), domeMat);
  dome.position.y = 0.4;
  group.add(dome);

  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
  cap.position.y = 0.7;
  group.add(cap);

  if (isLit) {
    const light = new THREE.PointLight(colorHex, 2.5, 4);
    light.position.y = 0.8;
    group.add(light);
  }

  return group;
}

function createResistor3D(id: string): THREE.Group {
  const group = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xdec69a, roughness: 0.4 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.8, 16), bodyMat);
  body.rotation.z = Math.PI / 2;
  group.add(body);

  const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.155, 0.155, 0.08, 16), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
  b1.rotation.z = Math.PI / 2;
  b1.position.x = -0.22;
  group.add(b1);

  const b2 = new THREE.Mesh(new THREE.CylinderGeometry(0.155, 0.155, 0.08, 16), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
  b2.rotation.z = Math.PI / 2;
  b2.position.x = -0.08;
  group.add(b2);

  const b3 = new THREE.Mesh(new THREE.CylinderGeometry(0.155, 0.155, 0.08, 16), new THREE.MeshBasicMaterial({ color: 0x78350f }));
  b3.rotation.z = Math.PI / 2;
  b3.position.x = 0.06;
  group.add(b3);

  const bGold = new THREE.Mesh(new THREE.CylinderGeometry(0.155, 0.155, 0.08, 16), goldPinMat);
  bGold.rotation.z = Math.PI / 2;
  bGold.position.x = 0.22;
  group.add(bGold);

  return group;
}

function createGenericModule3D(name: string, dims: { x: number; y: number; z: number }): THREE.Group {
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(dims.x, dims.y, dims.z),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 })
  );
  body.position.y = dims.y / 2;
  group.add(body);

  return group;
}

/**
 * Creates 3D Tube Curve for interactive jumper wires
 */
export function createJumperWire3DMesh(
  wire: JumperWire,
  fromPos: THREE.Vector3,
  toPos: THREE.Vector3
): THREE.Group {
  const group = new THREE.Group();
  group.name = `wire-${wire.id}`;

  const midPoint = new THREE.Vector3().addVectors(fromPos, toPos).multiplyScalar(0.5);
  const distance = fromPos.distanceTo(toPos);
  const sag = Math.min(distance * 0.4, 1.8);
  midPoint.y += sag;

  const curve = new THREE.CatmullRomCurve3([fromPos, midPoint, toPos]);
  const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.04, 8, false);

  const colorHex = parseInt(wire.color.replace('#', '0x'), 16) || 0xef4444;
  const wireMat = new THREE.MeshStandardMaterial({
    color: colorHex,
    emissive: wire.isEnergized ? colorHex : 0x000000,
    emissiveIntensity: wire.isEnergized ? 0.6 : 0,
    roughness: 0.3,
  });

  const wireMesh = new THREE.Mesh(tubeGeo, wireMat);
  wireMesh.castShadow = true;
  group.add(wireMesh);

  const bootGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 12);
  const bootMat = new THREE.MeshStandardMaterial({ color: 0x111827 });

  const boot1 = new THREE.Mesh(bootGeo, bootMat);
  boot1.position.copy(fromPos);
  group.add(boot1);

  const boot2 = new THREE.Mesh(bootGeo, bootMat);
  boot2.position.copy(toPos);
  group.add(boot2);

  return group;
}
