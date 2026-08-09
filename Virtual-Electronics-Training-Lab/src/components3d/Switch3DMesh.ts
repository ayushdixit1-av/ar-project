import * as THREE from 'three';
import { getHolePosition3D } from './breadboardCoordinates';
import { PlacedSwitch } from '../types/electronics';

export class Switch3DMesh {
  public group: THREE.Group;
  public switchData: PlacedSwitch;
  private leverMesh!: THREE.Mesh;
  private statusLedMesh!: THREE.Mesh;

  constructor(switchData: PlacedSwitch) {
    this.switchData = switchData;
    this.group = new THREE.Group();
    this.group.userData = { type: 'SWITCH', switchId: switchData.id };
    this.buildSwitch();
    this.updateState();
  }

  private buildSwitch() {
    const pos = getHolePosition3D(this.switchData.outputHoleKey);

    // Switch Base Box
    const boxMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.5 });
    const boxMesh = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.35, 0.45), boxMat);
    boxMesh.position.set(pos.x, 0.52, pos.z);
    boxMesh.castShadow = true;
    this.group.add(boxMesh);

    // Metal Toggle Lever
    const leverMat = new THREE.MeshStandardMaterial({ color: 0xe4e4e7, metalness: 0.9, roughness: 0.2 });
    this.leverMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.4, 12), leverMat);
    this.leverMesh.position.set(pos.x, 0.8, pos.z);
    this.group.add(this.leverMesh);

    // Status Indicator LED on switch top
    this.statusLedMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    this.statusLedMesh.position.set(pos.x + 0.12, 0.71, pos.z);
    this.group.add(this.statusLedMesh);
  }

  public updateState() {
    const pos = getHolePosition3D(this.switchData.outputHoleKey);
    const isHigh = this.switchData.state === 'HIGH';

    // Tilt lever
    this.leverMesh.rotation.z = isHigh ? -0.4 : 0.4;
    (this.statusLedMesh.material as THREE.MeshBasicMaterial).color.setHex(isHigh ? 0x22c55e : 0xef4444);
    this.group.position.set(0, 0, 0);
  }
}
