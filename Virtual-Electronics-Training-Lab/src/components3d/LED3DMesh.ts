import * as THREE from 'three';
import { getHolePosition3D } from './breadboardCoordinates';
import { PlacedLED } from '../types/electronics';

const LED_HEX_COLORS = {
  red: { off: 0x991b1b, on: 0xef4444, light: 0xff0000 },
  green: { off: 0x166534, on: 0x22c55e, light: 0x00ff00 },
  yellow: { off: 0x854d0e, on: 0xeab308, light: 0xffff00 },
  blue: { off: 0x1e40af, on: 0x3b82f6, light: 0x0000ff },
};

export class LED3DMesh {
  public group: THREE.Group;
  public ledData: PlacedLED;
  private bulbMesh!: THREE.Mesh;
  private bulbMaterial!: THREE.MeshPhysicalMaterial;
  private lightSource!: THREE.PointLight;

  constructor(ledData: PlacedLED) {
    this.ledData = ledData;
    this.group = new THREE.Group();
    this.group.userData = { type: 'LED', ledId: ledData.id };
    this.buildLED();
    this.updateState();
  }

  private buildLED() {
    const posAnode = getHolePosition3D(this.ledData.anodeHoleKey);
    const posCathode = getHolePosition3D(this.ledData.cathodeHoleKey);

    const centerPos = new THREE.Vector3(
      (posAnode.x + posCathode.x) / 2,
      0.8,
      (posAnode.z + posCathode.z) / 2
    );

    // LED Bulb Geometry (5mm LED style)
    const bulbGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.35, 16);
    const domeGeo = new THREE.SphereGeometry(0.18, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);

    const colors = LED_HEX_COLORS[this.ledData.color] || LED_HEX_COLORS.red;

    this.bulbMaterial = new THREE.MeshPhysicalMaterial({
      color: colors.off,
      emissive: colors.off,
      emissiveIntensity: 0.1,
      roughness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: 0.9,
    });

    const body = new THREE.Mesh(bulbGeo, this.bulbMaterial);
    body.position.set(centerPos.x, centerPos.y, centerPos.z);

    const dome = new THREE.Mesh(domeGeo, this.bulbMaterial);
    dome.position.set(centerPos.x, centerPos.y + 0.175, centerPos.z);

    this.group.add(body);
    this.group.add(dome);

    // PointLight inside LED
    this.lightSource = new THREE.PointLight(colors.light, 0, 3);
    this.lightSource.position.set(centerPos.x, centerPos.y + 0.1, centerPos.z);
    this.group.add(this.lightSource);

    // Metallic Pin Leads
    const pinMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.9, roughness: 0.2 });

    const createPin = (pos: THREE.Vector3) => {
      const curve = new THREE.LineCurve3(
        new THREE.Vector3(pos.x, pos.y, pos.z),
        new THREE.Vector3(centerPos.x, centerPos.y - 0.175, centerPos.z)
      );
      const pinMesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 8, 0.02, 6, false), pinMat);
      this.group.add(pinMesh);
    };

    createPin(posAnode);
    createPin(posCathode);
  }

  public updateState() {
    const colors = LED_HEX_COLORS[this.ledData.color] || LED_HEX_COLORS.red;
    if (this.ledData.isOn) {
      this.bulbMaterial.color.setHex(colors.on);
      this.bulbMaterial.emissive.setHex(colors.on);
      this.bulbMaterial.emissiveIntensity = 2.5;
      this.lightSource.intensity = 3.0;
    } else {
      this.bulbMaterial.color.setHex(colors.off);
      this.bulbMaterial.emissive.setHex(colors.off);
      this.bulbMaterial.emissiveIntensity = 0.1;
      this.lightSource.intensity = 0;
    }
  }
}
