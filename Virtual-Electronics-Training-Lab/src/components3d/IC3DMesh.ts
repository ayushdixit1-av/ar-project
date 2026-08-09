import * as THREE from 'three';
import { COL_SPACING, getColX, getRowZ } from './breadboardCoordinates';
import { PlacedIC } from '../types/electronics';
import { IC_DEFINITIONS } from '../electronics/icDefinitions';

export class IC3DMesh {
  public group: THREE.Group;
  public icData: PlacedIC;

  constructor(icData: PlacedIC) {
    this.icData = icData;
    this.group = new THREE.Group();
    this.group.userData = { type: 'IC', icId: icData.id, icType: icData.type };
    this.buildIC();
    this.updatePosition();
  }

  private buildIC() {
    const icDef = IC_DEFINITIONS[this.icData.type];
    const pinsPerRow = 7;
    const width = pinsPerRow * COL_SPACING; // 7 * 0.32 = 2.24
    const length = 0.52; // DIP body depth across center gap
    const bodyHeight = 0.26;

    // Body material (High-density Matte Epoxy Black Plastic)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x141417,
      roughness: 0.35,
      metalness: 0.15,
    });

    // Main DIP Plastic Body
    const bodyGeo = new THREE.BoxGeometry(width - 0.04, bodyHeight, length);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    // Position body above breadboard top (breadboard top is Y = 0.35)
    bodyMesh.position.y = 0.35 + 0.18 + bodyHeight / 2; // Y = 0.66
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    this.group.add(bodyMesh);

    // Pin 1 Semicircular Notch on Left (-X)
    const notchGeo = new THREE.CylinderGeometry(0.06, 0.06, bodyHeight + 0.01, 16, 1, false, Math.PI / 2, Math.PI);
    const notchMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0c, roughness: 0.5 });
    const notch = new THREE.Mesh(notchGeo, notchMat);
    notch.position.set(-width / 2 + 0.02, 0.35 + 0.18 + bodyHeight / 2, 0);
    this.group.add(notch);

    // Pin 1 Etched Dot (White circle top-left)
    const dotGeo = new THREE.CircleGeometry(0.035, 16);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.rotation.x = -Math.PI / 2;
    dot.position.set(-width / 2 + 0.18, 0.35 + 0.18 + bodyHeight + 0.002, -length / 2 + 0.12);
    this.group.add(dot);

    // Printed IC Markings Label on Top Surface
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#141417';
      ctx.fillRect(0, 0, 512, 128);

      // Silver IC model text
      ctx.fillStyle = '#d4d4d8';
      ctx.font = 'bold 44px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`SN74HC${this.icData.type}N`, 256, 44);

      ctx.font = '22px "Courier New", monospace';
      ctx.fillStyle = '#a1a1aa';
      ctx.fillText(icDef ? icDef.fullName : 'LOGIC IC', 256, 88);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;
    const labelMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.3,
      metalness: 0.2,
    });
    const labelMesh = new THREE.Mesh(new THREE.PlaneGeometry((width - 0.1) * 0.9, length * 0.75), labelMat);
    labelMesh.rotation.x = -Math.PI / 2;
    labelMesh.position.set(0.02, 0.35 + 0.18 + bodyHeight + 0.001, 0);
    this.group.add(labelMesh);

    // --- High-Detail Metallic Silver DIP Pins / Legs ---
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.92,
      roughness: 0.18,
    });

    const rowEZ = getRowZ('E'); // -0.12
    const rowFZ = getRowZ('F'); // +0.12

    // Build 14 individual metallic legs
    for (let p = 0; p < pinsPerRow; p++) {
      // Local X for this pin (aligned with breadboard columns)
      const pinX = -width / 2 + p * COL_SPACING + COL_SPACING / 2;

      // 1) Bottom Pins: Pins 1..7 -> plugged into Row E (Z = -0.12)
      this.createLeg(pinX, -length / 2, rowEZ, pinMat);

      // 2) Top Pins: Pins 14..8 -> plugged into Row F (Z = +0.12)
      this.createLeg(pinX, length / 2, rowFZ, pinMat);
    }
  }

  private createLeg(localX: number, bodySideZ: number, targetRowZ: number, mat: THREE.Material) {
    const legGroup = new THREE.Group();

    // Body attachment Y: 0.35 + 0.18 + 0.13 = 0.66
    const shoulderY = 0.62;
    const targetY = 0.22; // Tip goes down into hole

    // A) Horizontal Shoulder extending from body side to row Z
    const shoulderLen = Math.abs(targetRowZ - bodySideZ) + 0.02;
    const shoulderGeo = new THREE.BoxGeometry(0.08, 0.03, shoulderLen);
    const shoulderMesh = new THREE.Mesh(shoulderGeo, mat);
    shoulderMesh.position.set(localX, shoulderY, (bodySideZ + targetRowZ) / 2);
    legGroup.add(shoulderMesh);

    // B) Vertical Leg Pin going straight down into hole at targetRowZ
    const legHeight = shoulderY - targetY; // 0.40 units
    const pinGeo = new THREE.BoxGeometry(0.05, legHeight, 0.025);
    const pinMesh = new THREE.Mesh(pinGeo, mat);
    pinMesh.position.set(localX, shoulderY - legHeight / 2, targetRowZ);
    legGroup.add(pinMesh);

    // C) Tapered Tip inside hole
    const tipGeo = new THREE.ConeGeometry(0.025, 0.06, 4);
    const tipMesh = new THREE.Mesh(tipGeo, mat);
    tipMesh.rotation.x = Math.PI; // Pointing downwards
    tipMesh.position.set(localX, targetY - 0.03, targetRowZ);
    legGroup.add(tipMesh);

    this.group.add(legGroup);
  }

  public updatePosition() {
    // Position center of 7-col IC
    const startX = getColX(this.icData.startCol);
    const endX = getColX(this.icData.startCol + 6);
    const centerX = (startX + endX) / 2;
    this.group.position.set(centerX, 0, 0); // Z = 0 straddles center divider
  }
}
