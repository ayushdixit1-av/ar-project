import * as THREE from 'three';
import { COL_COUNT, COL_SPACING, getColX, getRailZ, getRowZ } from './breadboardCoordinates';

export class Breadboard3DMesh {
  public group: THREE.Group;
  public holeMeshMap: Map<string, THREE.Mesh> = new Map();
  public holeHitBoxes: THREE.Mesh[] = [];

  constructor() {
    this.group = new THREE.Group();
    this.buildBreadboard();
  }

  private buildBreadboard() {
    // Breadboard dimensions
    const width = COL_COUNT * COL_SPACING + 0.8; // ~10.4 units
    const depth = 4.6; // ~4.6 units
    const height = 0.35;

    // Plastic Body Material (Cream/Off-White ABS Plastic)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4f1ea,
      roughness: 0.3,
      metalness: 0.05,
    });

    const bodyGeometry = new THREE.BoxGeometry(width, height, depth);
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bodyMesh.position.y = height / 2;
    bodyMesh.receiveShadow = true;
    bodyMesh.castShadow = true;
    this.group.add(bodyMesh);

    // Center Divider Trough/Gap
    const gapMaterial = new THREE.MeshStandardMaterial({ color: 0xd6d0c4, roughness: 0.6 });
    const gapMesh = new THREE.Mesh(new THREE.BoxGeometry(width, 0.1, 0.2), gapMaterial);
    gapMesh.position.set(0, height + 0.01, 0);
    this.group.add(gapMesh);

    // Power Rail Colored Lines (Red for +5V, Blue for GND)
    const redLineMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const blueLineMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });

    const redLineTop = new THREE.Mesh(new THREE.BoxGeometry(width - 0.4, 0.01, 0.04), redLineMat);
    redLineTop.position.set(0, height + 0.005, getRailZ('TOP_POS') - 0.15);
    this.group.add(redLineTop);

    const blueLineTop = new THREE.Mesh(new THREE.BoxGeometry(width - 0.4, 0.01, 0.04), blueLineMat);
    blueLineTop.position.set(0, height + 0.005, getRailZ('TOP_NEG') + 0.15);
    this.group.add(blueLineTop);

    const redLineBottom = new THREE.Mesh(new THREE.BoxGeometry(width - 0.4, 0.01, 0.04), redLineMat);
    redLineBottom.position.set(0, height + 0.005, getRailZ('BOTTOM_POS') - 0.15);
    this.group.add(redLineBottom);

    const blueLineBottom = new THREE.Mesh(new THREE.BoxGeometry(width - 0.4, 0.01, 0.04), blueLineMat);
    blueLineBottom.position.set(0, height + 0.005, getRailZ('BOTTOM_NEG') + 0.15);
    this.group.add(blueLineBottom);

    // Create high-resolution text label overlay (A..J, 1..30)
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 1024;
    labelCanvas.height = 512;
    const labelCtx = labelCanvas.getContext('2d');
    if (labelCtx) {
      labelCtx.clearRect(0, 0, 1024, 512);
      labelCtx.fillStyle = '#475569'; // slate-600 text
      labelCtx.font = 'bold 18px monospace';
      labelCtx.textAlign = 'center';
      labelCtx.textBaseline = 'middle';

      const toCanvasX = (x: number) => (x / width + 0.5) * 1024;
      const toCanvasY = (z: number) => (z / depth + 0.5) * 512;

      // Draw Column Numbers (1, 5, 10, 15, 20, 25, 30)
      for (let col = 1; col <= COL_COUNT; col++) {
        if (col === 1 || col % 5 === 0) {
          const xPos = toCanvasX(getColX(col));
          labelCtx.fillText(col.toString(), xPos, toCanvasY(getRowZ('A') - 0.28));
          labelCtx.fillText(col.toString(), xPos, toCanvasY(getRowZ('J') + 0.28));
          labelCtx.fillText(col.toString(), xPos, toCanvasY(getRowZ('E') - 0.16));
          labelCtx.fillText(col.toString(), xPos, toCanvasY(getRowZ('F') + 0.16));
        }
      }

      // Draw Row Letters (A..J)
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      const leftX = toCanvasX(getColX(1) - 0.4);
      const rightX = toCanvasX(getColX(COL_COUNT) + 0.4);

      rows.forEach((row) => {
        const yPos = toCanvasY(getRowZ(row));
        labelCtx.fillText(row, leftX, yPos);
        labelCtx.fillText(row, rightX, yPos);
      });
    }

    const labelTex = new THREE.CanvasTexture(labelCanvas);
    labelTex.anisotropy = 4;
    const labelMaterial = new THREE.MeshBasicMaterial({
      map: labelTex,
      transparent: true,
      depthWrite: false,
    });

    const overlayGeo = new THREE.PlaneGeometry(width, depth);
    const overlayMesh = new THREE.Mesh(overlayGeo, labelMaterial);
    overlayMesh.rotation.x = -Math.PI / 2;
    overlayMesh.position.set(0, height + 0.006, 0);
    this.group.add(overlayMesh);

    // Holes (metallic inner cylinder + black aperture)
    const holeGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.02, 12);
    const defaultHoleMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
      metalness: 0.2,
    });

    const createHole = (key: string, x: number, z: number) => {
      const hole = new THREE.Mesh(holeGeo, defaultHoleMat.clone());
      hole.position.set(x, height + 0.002, z);
      hole.userData = { holeKey: key };
      this.group.add(hole);
      this.holeMeshMap.set(key, hole);
      this.holeHitBoxes.push(hole);
    };

    // Terminal Holes (A..J for Cols 1..30)
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    for (let col = 1; col <= COL_COUNT; col++) {
      const x = getColX(col);
      rows.forEach((row) => {
        const z = getRowZ(row);
        createHole(`terminal_${col}_${row}`, x, z);
      });
    }

    // Power Rail Holes
    const rails = ['TOP_POS', 'TOP_NEG', 'BOTTOM_POS', 'BOTTOM_NEG'] as const;
    for (let col = 1; col <= COL_COUNT; col++) {
      const x = getColX(col);
      rails.forEach((rail) => {
        const z = getRailZ(rail);
        createHole(`rail_${rail}_${col}`, x, z);
      });
    }
  }

  public highlightHole(holeKey: string | null, colorHex: number = 0x38bdf8) {
    if (!holeKey) {
      this.holeMeshMap.forEach((mesh) => {
        (mesh.material as THREE.MeshStandardMaterial).color.setHex(0x1e293b);
        mesh.scale.set(1.0, 1.0, 1.0);
      });
      return;
    }

    // Get connected holes in the same net
    const connected: string[] = [];
    if (holeKey.startsWith('rail_')) {
      const parts = holeKey.split('_'); // ['rail', 'TOP', 'POS', '10']
      const prefix = `rail_${parts[1]}_${parts[2]}_`;
      for (let col = 1; col <= COL_COUNT; col++) {
        connected.push(prefix + col);
      }
    } else if (holeKey.startsWith('terminal_')) {
      const parts = holeKey.split('_'); // ['terminal', '15', 'A']
      const col = parts[1];
      const row = parts[2];
      const group = ['A', 'B', 'C', 'D', 'E'].includes(row)
        ? ['A', 'B', 'C', 'D', 'E']
        : ['F', 'G', 'H', 'I', 'J'];
      group.forEach((r) => {
        connected.push(`terminal_${col}_${r}`);
      });
    }

    const connectedSet = new Set(connected);

    this.holeMeshMap.forEach((mesh, key) => {
      if (key === holeKey) {
        // Direct hover is highlighted in bright color
        (mesh.material as THREE.MeshStandardMaterial).color.setHex(colorHex);
        mesh.scale.set(1.4, 1.4, 1.4);
      } else if (connectedSet.has(key)) {
        // Connected holes in the same strip are highlighted in a slightly softer color
        (mesh.material as THREE.MeshStandardMaterial).color.setHex(0x1e3a8a); // Soft blue
        mesh.scale.set(1.2, 1.2, 1.2);
      } else {
        (mesh.material as THREE.MeshStandardMaterial).color.setHex(0x1e293b);
        mesh.scale.set(1.0, 1.0, 1.0);
      }
    });
  }

  public highlightNetNodes(holeKeys: string[], colorHex: number = 0xf59e0b) {
    const keySet = new Set(holeKeys);
    this.holeMeshMap.forEach((mesh, key) => {
      if (keySet.has(key)) {
        (mesh.material as THREE.MeshStandardMaterial).color.setHex(colorHex);
        mesh.scale.set(1.3, 1.3, 1.3);
      }
    });
  }
}
