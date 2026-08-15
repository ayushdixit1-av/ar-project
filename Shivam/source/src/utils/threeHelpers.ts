function create7SegmentTexture(val: string, isPowered: boolean): THREE.CanvasTexture {
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
  } else if (meta.id.startsWith('ic-')) {
    bodyMesh = createLogicIC3D(meta.icSeries || '7408', meta.name, renderMode === 'xray', simState);
  } else if (meta.id.startsWith('led-')) {
    bodyMesh = createLED3D(meta.id, placed.id, simState);
  } else {
    bodyMesh = createGenericModule3D(meta.name, meta.dimensions);
  }

  group.add(bodyMesh);

  // Add 3D Pin Sockets & Snap Markers
  if (meta.category === 'Logic & IC' || meta.id.startsWith('ic-')) {
    // Breadboard Sockets: 4 physical tie-point holes ABOVE and 4 tie-point holes BELOW the IC
    // Direct connection to IC body is removed; connections plug directly into the breadboard tie holes.
    const socketHousingMat = new THREE.MeshStandardMaterial({ color: 0xf5f3ee, roughness: 0.4, metalness: 0.05 });
    const holeInteriorMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });

    // Bottom Pins 1..7 (Rows g, h, i, j below the IC)
    for (let c = 0; c < 7; c++) {
      const pin = meta.pins[c];
      if (!pin) continue;
      const colX = -0.72 + c * 0.24;
      const rowZOffsets = [0.62, 0.78, 0.94, 1.10]; // Rows g, h, i, j
      const rowLabels = ['Row g', 'Row h', 'Row i', 'Row j'];

      rowZOffsets.forEach((zPos, rIdx) => {
        // Socket outer frame
        const socketHousing = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.12), socketHousingMat);
        socketHousing.position.set(colX, -0.22, zPos);
        group.add(socketHousing);

        // Recessed square hole
        const holeRecess = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.022, 0.06), holeInteriorMat);
        holeRecess.position.set(colX, -0.218, zPos);
        group.add(holeRecess);

        // Interactive Pin Target for Jumper Wire Snap
        const pinMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(0.035, 0.035, 0.08, 10),
          pin.type === 'VCC'
            ? new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.6, roughness: 0.3 })
            : pin.type === 'GND'
            ? new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.3 })
            : goldPinMat
        );
        pinMesh.position.set(colX, -0.21, zPos);
        pinMesh.name = rIdx === 0 ? `pin-${placed.id}-${pin.id}` : `pin-${placed.id}-${pin.id}-r${rIdx}`;
        pinMesh.userData = {
          componentId: placed.id,
          pinId: pin.id,
          pinMeta: {
            ...pin,
            name: `${pin.name} • ${rowLabels[rIdx]} (Breadboard Socket)`,
          },
          holeRow: rowLabels[rIdx],
          holeIndex: rIdx,
        };
        group.add(pinMesh);
      });
    }

    // Top Pins 14..8 (Rows d, c, b, a above the IC)
    for (let c = 0; c < 7; c++) {
      const pinIndex = 13 - c;
      const pin = meta.pins[pinIndex];
      if (!pin) continue;
      const colX = -0.72 + c * 0.24;
      const rowZOffsets = [-0.62, -0.78, -0.94, -1.10]; // Rows d, c, b, a
      const rowLabels = ['Row d', 'Row c', 'Row b', 'Row a'];

      rowZOffsets.forEach((zPos, rIdx) => {
        // Socket outer frame
        const socketHousing = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.12), socketHousingMat);
        socketHousing.position.set(colX, -0.22, zPos);
        group.add(socketHousing);

        // Recessed square hole
        const holeRecess = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.022, 0.06), holeInteriorMat);
        holeRecess.position.set(colX, -0.218, zPos);
        group.add(holeRecess);

        // Interactive Pin Target for Jumper Wire Snap
        const pinMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(0.035, 0.035, 0.08, 10),
          pin.type === 'VCC'
            ? new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.6, roughness: 0.3 })
            : pin.type === 'GND'
            ? new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.3 })
            : goldPinMat
        );
        pinMesh.position.set(colX, -0.21, zPos);
        pinMesh.name = rIdx === 0 ? `pin-${placed.id}-${pin.id}` : `pin-${placed.id}-${pin.id}-r${rIdx}`;
        pinMesh.userData = {
          componentId: placed.id,
          pinId: pin.id,
          pinMeta: {
            ...pin,
            name: `${pin.name} • ${rowLabels[rIdx]} (Breadboard Socket)`,
          },
          holeRow: rowLabels[rIdx],
          holeIndex: rIdx,
        };
        group.add(pinMesh);
      });
    }
  } else if (meta.id !== 'breadboard-830') {
    // Non-IC components (Base trainer board terminals, etc.)
    meta.pins.forEach((pin) => {
      const pinMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.045, 0.14, 10),
        pin.type === 'VCC' || pin.type === 'POWER'
          ? new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.6, roughness: 0.3 })
          : pin.type === 'GND'
          ? new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.3 })
          : goldPinMat
      );
      pinMesh.position.set(pin.relativePos[0], pin.relativePos[1], pin.relativePos[2]);
      pinMesh.name = `pin-${placed.id}-${pin.id}`;
      pinMesh.userData = { componentId: placed.id, pinId: pin.id, pinMeta: pin };
      group.add(pinMesh);
    });
  }

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

  // Dimensions
  const boardWidth = 15.4;
  const boardDepth = 11.9;
  const plateWidth = 15.0;
  const plateDepth = 11.5;
  const plateY = 0.2;

  // Blue Wooden/Plastic Frame Base
  const baseGeo = new THREE.BoxGeometry(boardWidth, 0.4, boardDepth);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x0277bd, roughness: 0.6, metalness: 0.1 });
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.receiveShadow = true;
  baseMesh.castShadow = true;
  boardGroup.add(baseMesh);

  // White Faceplate
  const plateGeo = new THREE.BoxGeometry(plateWidth, 0.02, plateDepth);
  // We'll create a CanvasTexture for the silkscreen
  const canvas = document.createElement('canvas');
  const pxPerUnit = 100;
  canvas.width = plateWidth * pxPerUnit; // 1500
  canvas.height = plateDepth * pxPerUnit; // 1150
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Fill background
    ctx.fillStyle = '#f4f4f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Helpers
    const toCX = (x: number) => (x + plateWidth / 2) * pxPerUnit;
    const toCY = (z: number) => (z + plateDepth / 2) * pxPerUnit;

    const drawRoundRect = (x: number, z: number, w: number, d: number, radius: number) => {
      const cx = toCX(x);
      const cy = toCY(z);
      const cw = w * pxPerUnit;
      const cd = d * pxPerUnit;
      const cr = radius * pxPerUnit;
      ctx.beginPath();
      ctx.moveTo(cx + cr, cy);
      ctx.lineTo(cx + cw - cr, cy);
      ctx.quadraticCurveTo(cx + cw, cy, cx + cw, cy + cr);
      ctx.lineTo(cx + cw, cy + cd - cr);
      ctx.quadraticCurveTo(cx + cw, cy + cd, cx + cw - cr, cy + cd);
      ctx.lineTo(cx + cr, cy + cd);
      ctx.quadraticCurveTo(cx, cy + cd, cx, cy + cd - cr);
      ctx.lineTo(cx, cy + cr);
      ctx.quadraticCurveTo(cx, cy, cx + cr, cy);
      ctx.closePath();
      ctx.stroke();
    };

    ctx.strokeStyle = '#18181b';
    ctx.lineWidth = 4;
    ctx.fillStyle = '#18181b';

    // Title
    ctx.font = 'bold 52px "Trebuchet MS", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('DIGITAL IC TRAINER', toCX(0), toCY(-5.0));

    // Section Rectangles
    // LOGIC INPUTS
    drawRoundRect(-7.2, -4.5, 2.7, 7.0, 0.2);
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('LOGIC INPUTS', toCX(-5.85), toCY(-4.2));
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('0        1', toCX(-6.8), toCY(-3.9));

    // POWER (Bottom Left)
    drawRoundRect(-7.2, 2.8, 3.2, 2.4, 0.2);
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('POWER', toCX(-5.6), toCY(4.9));
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('OFF', toCX(-6.6), toCY(4.1));
    ctx.fillText('ON', toCX(-4.6), toCY(4.1));

    // DC POWER SUPPLY
    drawRoundRect(-3.6, 2.8, 3.2, 2.4, 0.2);
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('DC POWER SUPPLY', toCX(-2.0), toCY(4.9));
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('+5V', toCX(-2.6), toCY(3.6));
    ctx.fillText('GND', toCX(-1.4), toCY(3.6));

    // LOGIC OUTPUTS
    drawRoundRect(0.0, 2.8, 7.2, 2.4, 0.2);
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('LOGIC OUTPUTS', toCX(3.6), toCY(4.9));

    // 7-SEGMENT DECODER
    drawRoundRect(-4.0, -4.5, 6.0, 2.4, 0.2);
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('7-SEGEMENT DECODER', toCX(-1.0), toCY(-4.2));
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('A            B            C            D', toCX(-1.5), toCY(-2.5));

    // CLOCK PULSE
    drawRoundRect(2.4, -4.5, 4.8, 2.4, 0.2);
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('CLOCK', toCX(4.8), toCY(-4.2));
    ctx.fillText('PULSE', toCX(4.8), toCY(-3.9));
    ctx.fillText('OUTPUT', toCX(6.0), toCY(-4.2));
    ctx.fillText('1Hz', toCX(6.0), toCY(-3.9));
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('CLOCK PULSE', toCX(4.8), toCY(-2.8));

    // Draw lines from inputs/outputs
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
       // logic inputs line
       const z = -3.5 + i * 2.0;
       ctx.beginPath(); ctx.moveTo(toCX(-6.2), toCY(z)); ctx.lineTo(toCX(-5.8), toCY(z)); ctx.stroke();
    }
    // clock pulse line
    ctx.beginPath(); ctx.moveTo(toCX(4.8), toCY(-3.5)); ctx.lineTo(toCX(6.0), toCY(-3.5)); ctx.stroke();
    // logic outputs lines
    for (let i = 0; i < 4; i++) {
       const x = 1.0 + i * 1.8;
       ctx.beginPath(); ctx.moveTo(toCX(x), toCY(3.8)); ctx.lineTo(toCX(x), toCY(4.5)); ctx.stroke();
    }
  }

  const plateTex = new THREE.CanvasTexture(canvas);
  plateTex.anisotropy = 16;
  const plateMat = new THREE.MeshStandardMaterial({ map: plateTex, roughness: 0.4, metalness: 0.1 });
  const plateMesh = new THREE.Mesh(plateGeo, plateMat);
  plateMesh.position.y = plateY + 0.01;
  plateMesh.receiveShadow = true;
  boardGroup.add(plateMesh);

  // Screws
  const screwPos = [
    [-plateWidth/2 + 0.3, plateY + 0.02, -plateDepth/2 + 0.3],
    [plateWidth/2 - 0.3, plateY + 0.02, -plateDepth/2 + 0.3],
    [-plateWidth/2 + 0.3, plateY + 0.02, plateDepth/2 - 0.3],
    [plateWidth/2 - 0.3, plateY + 0.02, plateDepth/2 - 0.3],
  ];
  screwPos.forEach(([sx, sy, sz]) => {
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 12), silverMetalMat);
    screw.position.set(sx, sy, sz);
    boardGroup.add(screw);
  });

  // LOGIC INPUTS (Buttons & LEDs)
  for (let i = 0; i < 4; i++) {
    const z = -3.5 + i * 2.0;
    
    // Switch Base
    const swBase = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.5), new THREE.MeshStandardMaterial({color: 0x94a3b8}));
    swBase.position.set(-6.8, plateY + 0.06, z);
    boardGroup.add(swBase);

    // Switch Button (White)
    const isActive = simState.isPowered && (simState.inputs ? simState.inputs[i] : false);
    const swBtn = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.15, 0.25), new THREE.MeshStandardMaterial({color: 0xf8fafc}));
    // offset left if 0, right if 1
    const sliderOffset = isActive ? 0.12 : -0.12;
    swBtn.position.set(-6.8 + sliderOffset, plateY + 0.12, z);
    swBtn.name = `switch-lever-${i}`;
    boardGroup.add(swBtn);

    // Hitbox for clicking the switch
    const swHitbox = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.3, 0.6), new THREE.MeshBasicMaterial({visible: false}));
    swHitbox.position.set(-6.8, plateY + 0.15, z);
    swHitbox.name = `switch-box-${i}`;
    boardGroup.add(swHitbox);

    // Green LED
    const ledMat = new THREE.MeshStandardMaterial({
      color: isActive ? 0x22c55e : 0x064e3b,
      emissive: isActive ? 0x22c55e : 0x000000,
      emissiveIntensity: isActive ? 1.5 : 0,
    });
    const led = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.15, 16), ledMat);
    led.position.set(-6.2, plateY + 0.08, z);
    boardGroup.add(led);
  }

  // POWER SWITCH
  const pwrHousing = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.1, 0.8), new THREE.MeshStandardMaterial({color: 0x18181b}));
  pwrHousing.position.set(-5.6, plateY + 0.06, 4.1);
  pwrHousing.name = 'power-switch-box';
  boardGroup.add(pwrHousing);

  const pwrRocker = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.15, 0.5), new THREE.MeshStandardMaterial({
    color: simState.isPowered ? 0xef4444 : 0x991b1b,
    emissive: simState.isPowered ? 0xef4444 : 0x000000,
    emissiveIntensity: simState.isPowered ? 0.4 : 0
  }));
  pwrRocker.position.set(-5.6, plateY + 0.12, 4.1);
  pwrRocker.rotation.z = simState.isPowered ? -0.15 : 0.15;
  pwrRocker.name = 'power-switch-rocker';
  boardGroup.add(pwrRocker);

  // LOGIC OUTPUTS (Red LEDs)
  for (let i = 0; i < 4; i++) {
    const x = 1.0 + i * 1.8;
    const isLit = simState.isPowered && (simState.outputs ? simState.outputs[i] : false);
    
    const ledMat = new THREE.MeshStandardMaterial({
      color: isLit ? 0xef4444 : 0x7f1d1d,
      emissive: isLit ? 0xef4444 : 0x000000,
      emissiveIntensity: isLit ? 1.5 : 0,
    });
    const led = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.2, 16), ledMat);
    led.position.set(x, plateY + 0.1, 4.5);
    boardGroup.add(led);
  }

  // 7-SEGMENT DISPLAY
  const segHousing = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 1.6), new THREE.MeshStandardMaterial({color: 0x94a3b8}));
  segHousing.position.set(-1.5, plateY + 0.11, -4.0);
  boardGroup.add(segHousing);
  
  const segFace = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.22, 1.3), new THREE.MeshStandardMaterial({color: 0x1e293b}));
  segFace.position.set(-1.5, plateY + 0.11, -4.0);
  boardGroup.add(segFace);
  
  const segTex = create7SegmentTexture(simState.sevenSegmentVal || '0', simState.isPowered);
  const segMat = new THREE.MeshStandardMaterial({map: segTex});
  const segDisplay = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 1.25), segMat);
  segDisplay.rotation.x = -Math.PI / 2;
  segDisplay.position.set(-1.5, plateY + 0.221, -4.0);
  boardGroup.add(segDisplay);

  // Decoder IC
  const icBody = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.1, 0.6), new THREE.MeshStandardMaterial({color: 0x0f172a}));
  icBody.position.set(0.0, plateY + 0.06, -4.0);
  boardGroup.add(icBody);
  const icLegs = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.05, 0.8), silverMetalMat);
  icLegs.position.set(0.0, plateY + 0.03, -4.0);
  boardGroup.add(icLegs);

  // CLOCK PULSE BUTTON
  const clkRing = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.05, 16), silverMetalMat);
  clkRing.position.set(4.8, plateY + 0.03, -3.5);
  boardGroup.add(clkRing);

  const clkBtnMat = new THREE.MeshStandardMaterial({
    color: simState.button1Pressed ? 0xb91c1c : 0xef4444,
    emissive: (simState.button1Pressed || simState.autoClockPulse) ? 0xef4444 : 0x000000,
    emissiveIntensity: (simState.button1Pressed || simState.autoClockPulse) ? 0.5 : 0
  });
  const clkBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.15, 16), clkBtnMat);
  clkBtn.position.set(4.8, plateY + ((simState.button1Pressed || simState.autoClockPulse) ? 0.05 : 0.08), -3.5);
  clkBtn.name = 'clock-pulse-btn';
  boardGroup.add(clkBtn);

  
  // Combine breadboard visually into the trainer board
  const builtInBreadboard = createBreadboard3D();
  builtInBreadboard.position.set(1.3, 0.22, 0.35);
  boardGroup.add(builtInBreadboard);
  return boardGroup;
}

/**
 * Generates dynamic ultra-high-resolution Canvas texture for Solderless Breadboard
 * Matching realistic breadboard layout with Power Rails, Circuit Areas (a-e, f-j), numbers, and 4 IC slots
 */
function createBreadboardTopCanvasTexture(): THREE.CanvasTexture {
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
        ctx.fillText(`— [ IC SOCKET ${idx + 1} ] —`, sc, y + 130);
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
          ctx.fillText(`${col}`, cx, y - 18);
          ctx.fillText(`${col}`, cx, y + 278);
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
}

function createBreadboard3D(): THREE.Group {
  const group = new THREE.Group();

  // Expanded ABS cream plastic breadboard body (11.6 x 0.42 x 2.6) to easily hold 4 DIP-14 ICs simultaneously
  const breadboardMat = new THREE.MeshStandardMaterial({
    color: 0xfcfbfa,
    roughness: 0.35,
    metalness: 0.05,
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.42, 2.6), breadboardMat);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Top Face Silk-Screen Print Texture Plate
  const topTex = createBreadboardTopCanvasTexture();
  const topPlateMat = new THREE.MeshStandardMaterial({
    map: topTex,
    roughness: 0.4,
    metalness: 0.05,
  });
  const topPlate = new THREE.Mesh(new THREE.PlaneGeometry(11.56, 2.56), topPlateMat);
  topPlate.rotation.x = -Math.PI / 2;
  topPlate.position.set(0, 0.211, 0);
  topPlate.receiveShadow = true;
  group.add(topPlate);

  // Physical 3D Center Divider Trough Channel for DIP IC Straddling
  const trough = new THREE.Mesh(
    new THREE.BoxGeometry(11.2, 0.12, 0.24),
    new THREE.MeshStandardMaterial({ color: 0xcfc8b8, roughness: 0.7 })
  );
  trough.position.set(0, 0.18, 0);
  group.add(trough);

  // Molded Dovetail Interlocking Tabs on Right (+X) and Front (+Z) edges (matching the photo)
  const tabMat = breadboardMat;
  const tabGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.24, 16);

  // Right Edge Tabs
  const tabR1 = new THREE.Mesh(tabGeo, tabMat);
  tabR1.position.set(5.86, 0, -0.6);
  group.add(tabR1);
  const tabR2 = new THREE.Mesh(tabGeo, tabMat);
  tabR2.position.set(5.86, 0, 0.6);
  group.add(tabR2);

  // Front Edge Tabs
  const tabF1 = new THREE.Mesh(tabGeo, tabMat);
  tabF1.position.set(-3.0, 0, 1.36);
  group.add(tabF1);
  const tabF2 = new THREE.Mesh(tabGeo, tabMat);
  tabF2.position.set(3.0, 0, 1.36);
  group.add(tabF2);

  return group;
}

/**
 * Generates clean, high-precision Canvas texture for top face silk-screen printing on DIP ICs
 * Only displays the clean IC number (e.g. 7408) and IC Name (e.g. AND GATE) without clutter
 */
function createICTopCanvasTexture(icSeries: string, fullName: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Matte dark epoxy IC surface
    ctx.fillStyle = '#14161d';
    ctx.fillRect(0, 0, 512, 200);

    // Subtle edge bevel
    ctx.strokeStyle = '#272b36';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, 504, 192);

    // Semicircular orientation notch on left
    ctx.beginPath();
    ctx.arc(0, 100, 22, -Math.PI / 2, Math.PI / 2);
    ctx.fillStyle = '#0a0a0f';
    ctx.fill();

    // Pin 1 Index Dot
    ctx.beginPath();
    ctx.arc(36, 150, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#64748b';
    ctx.fill();

    // Clean IC Number: e.g. "7408", "7400", "7432"
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 56px monospace, sans-serif';
    ctx.fillStyle = '#ffffff';

    // Format clean part number: if it doesn't start with 74, prefix it
    const cleanNumber = icSeries.startsWith('74') ? icSeries : `74${icSeries}`;
    ctx.fillText(cleanNumber, 260, 78);

    // Clean IC Name: e.g. "AND GATE", "OR GATE", "NAND GATE"
    ctx.font = 'bold 22px sans-serif';
    ctx.fillStyle = '#cbd5e1';

    let cleanName = fullName
      .replace(/IC\s*\(DIP-14\)/gi, '')
      .replace(/Quad\s*2-Input\s*/gi, '')
      .replace(/Dual\s*4-Input\s*/gi, '')
      .replace(/Hex\s*/gi, '')
      .replace(/74\d+\s*/gi, '')
      .trim();

    if (!cleanName) cleanName = 'LOGIC GATE';
    ctx.fillText(cleanName.toUpperCase(), 260, 134);
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

  // Top Face Silk-Screen Print Label with clean IC number and name only
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

  // Semicircular orientation notch on Pin 1 side
  const notchGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.36, 16, 1, false, Math.PI / 2, Math.PI);
  const notch = new THREE.Mesh(notchGeo, plasticDarkMat);
  notch.position.set(-1.0, 0.22, 0);
  notch.rotation.y = Math.PI / 2;
  group.add(notch);

  // Pin 1 Indicator Circle Marker
  const pin1Dot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.02, 16),
    new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.5 })
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
