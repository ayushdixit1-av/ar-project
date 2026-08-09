import * as THREE from 'three';
import { getHolePosition3D } from './breadboardCoordinates';
import { Wire, WireColor } from '../types/electronics';

const WIRE_COLORS: Record<WireColor, number> = {
  red: 0xef4444,
  black: 0x18181b,
  yellow: 0xeab308,
  green: 0x22c55e,
  blue: 0x3b82f6,
  white: 0xf8fafc,
  orange: 0xf97316,
  purple: 0xa855f7,
};

export class Wire3DMesh {
  public group: THREE.Group;
  public wireData: Wire;

  constructor(wireData: Wire) {
    this.wireData = wireData;
    this.group = new THREE.Group();
    this.group.userData = { type: 'WIRE', wireId: wireData.id };
    this.buildWire();
  }

  public buildWire() {
    // Clear previous
    while (this.group.children.length > 0) {
      this.group.remove(this.group.children[0]);
    }

    const posA = getHolePosition3D(this.wireData.fromHoleKey);
    const posB = getHolePosition3D(this.wireData.toHoleKey);

    const dist = posA.distanceTo(posB);
    const arcHeight = Math.min(2.5, Math.max(0.4, dist * 0.35));

    // Calculate control points for Cubic Bezier Curve
    const midX = (posA.x + posB.x) / 2;
    const midZ = (posA.z + posB.z) / 2;

    const ctrlA = new THREE.Vector3(posA.x, posA.y + arcHeight, posA.z);
    const ctrlB = new THREE.Vector3(posB.x, posB.y + arcHeight, posB.z);

    const curve = new THREE.CubicBezierCurve3(posA, ctrlA, ctrlB, posB);
    const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.04, 8, false);

    const hexColor = WIRE_COLORS[this.wireData.color] || 0xef4444;
    const wireMat = new THREE.MeshStandardMaterial({
      color: hexColor,
      roughness: 0.3,
      metalness: 0.1,
    });

    const wireMesh = new THREE.Mesh(tubeGeo, wireMat);
    wireMesh.castShadow = true;
    this.group.add(wireMesh);

    // End terminal pin caps inserted into breadboard holes
    const pinGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.25, 8);
    const pinMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.9, roughness: 0.2 });

    const pinA = new THREE.Mesh(pinGeo, pinMat);
    pinA.position.set(posA.x, posA.y - 0.08, posA.z);
    this.group.add(pinA);

    const pinB = new THREE.Mesh(pinGeo, pinMat);
    pinB.position.set(posB.x, posB.y - 0.08, posB.z);
    this.group.add(pinB);
  }
}
