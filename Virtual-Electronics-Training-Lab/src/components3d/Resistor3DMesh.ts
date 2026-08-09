import * as THREE from 'three';
import { getHolePosition3D } from './breadboardCoordinates';
import { PlacedResistor } from '../types/electronics';

export class Resistor3DMesh {
  public group: THREE.Group;
  public resistorData: PlacedResistor;

  constructor(resistorData: PlacedResistor) {
    this.resistorData = resistorData;
    this.group = new THREE.Group();
    this.group.userData = { type: 'RESISTOR', resistorId: resistorData.id };
    this.buildResistor();
  }

  private buildResistor() {
    const posA = getHolePosition3D(this.resistorData.fromHoleKey);
    const posB = getHolePosition3D(this.resistorData.toHoleKey);

    const mid = new THREE.Vector3().addVectors(posA, posB).multiplyScalar(0.5);
    mid.y = 0.6; // elevated bridge body

    // Resistor Body (Tan Ceramic)
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.4 });
    const bodyGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.45, 12);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.z = Math.PI / 2;
    body.position.copy(mid);
    body.castShadow = true;
    this.group.add(body);

    // Color Bands for 330 Ohm (Orange, Orange, Brown, Gold)
    const bandMatOrange = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    const bandMatBrown = new THREE.MeshBasicMaterial({ color: 0x78350f });
    const bandMatGold = new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.8 });

    const bandGeo = new THREE.CylinderGeometry(0.125, 0.125, 0.04, 12);

    const band1 = new THREE.Mesh(bandGeo, bandMatOrange);
    band1.rotation.z = Math.PI / 2;
    band1.position.set(mid.x - 0.12, mid.y, mid.z);
    this.group.add(band1);

    const band2 = new THREE.Mesh(bandGeo, bandMatOrange);
    band2.rotation.z = Math.PI / 2;
    band2.position.set(mid.x - 0.04, mid.y, mid.z);
    this.group.add(band2);

    const band3 = new THREE.Mesh(bandGeo, bandMatBrown);
    band3.rotation.z = Math.PI / 2;
    band3.position.set(mid.x + 0.04, mid.y, mid.z);
    this.group.add(band3);

    const band4 = new THREE.Mesh(bandGeo, bandMatGold);
    band4.rotation.z = Math.PI / 2;
    band4.position.set(mid.x + 0.12, mid.y, mid.z);
    this.group.add(band4);

    // Wire Leads
    const leadMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.9, roughness: 0.2 });

    const createLead = (fromPos: THREE.Vector3, toPos: THREE.Vector3) => {
      const curve = new THREE.CubicBezierCurve3(
        fromPos,
        new THREE.Vector3(fromPos.x, mid.y, fromPos.z),
        new THREE.Vector3(toPos.x, mid.y, toPos.z),
        toPos
      );
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 8, 0.02, 6, false), leadMat);
      this.group.add(tube);
    };

    createLead(posA, new THREE.Vector3(mid.x - 0.22, mid.y, mid.z));
    createLead(posB, new THREE.Vector3(mid.x + 0.22, mid.y, mid.z));
  }
}
