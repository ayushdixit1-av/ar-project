import * as THREE from 'three';

export class PowerSupply3DMesh {
  public group: THREE.Group;
  private powerBtnMesh!: THREE.Mesh;
  private displayMesh!: THREE.Mesh;
  public redPostMesh!: THREE.Mesh;
  public blackPostMesh!: THREE.Mesh;
  public displayCtx: CanvasRenderingContext2D | null = null;
  public displayTex!: THREE.CanvasTexture;

  constructor(public isOn: boolean = true) {
    this.group = new THREE.Group();
    this.group.position.set(-7.5, 0, -2.2); // Left side of workbench
    this.buildPowerSupply();
    this.updateState();
  }

  private buildPowerSupply() {
    // Metal Casing
    const bodyGeo = new THREE.BoxGeometry(2.4, 1.8, 2.2);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.8, roughness: 0.3 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.9;
    body.castShadow = true;
    this.group.add(body);

    // Front Panel Aluminum Accent
    const panelGeo = new THREE.BoxGeometry(2.3, 1.7, 0.05);
    const panelMat = new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.5, roughness: 0.4 });
    const panel = new THREE.Mesh(panelGeo, panelMat);
    panel.position.set(0, 0.9, 1.12);
    this.group.add(panel);

    // LCD Display Screen
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    this.displayCtx = canvas.getContext('2d');
    if (this.displayCtx) {
      this.displayCtx.fillStyle = '#09090b';
      this.displayCtx.fillRect(0, 0, 256, 128);
      this.displayCtx.fillStyle = '#22c55e';
      this.displayCtx.font = 'bold 44px monospace';
      this.displayCtx.fillText('5.00 V', 20, 60);
      this.displayCtx.fillStyle = '#38bdf8';
      this.displayCtx.font = '24px monospace';
      this.displayCtx.fillText('0.25 A  [DC]', 20, 105);
    }
    this.displayTex = new THREE.CanvasTexture(canvas);
    this.displayMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.2, 0.6),
      new THREE.MeshBasicMaterial({ map: this.displayTex })
    );
    this.displayMesh.position.set(-0.4, 1.2, 1.15);
    this.group.add(this.displayMesh);

    // Red Binding Post (+5V)
    const postGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.25, 12);
    const redPostMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.6 });
    this.redPostMesh = new THREE.Mesh(postGeo, redPostMat);
    this.redPostMesh.rotation.x = Math.PI / 2;
    this.redPostMesh.position.set(0.6, 0.6, 1.2);
    this.group.add(this.redPostMesh);

    // Black Binding Post (GND)
    const blackPostMat = new THREE.MeshStandardMaterial({ color: 0x09090b, metalness: 0.6 });
    this.blackPostMesh = new THREE.Mesh(postGeo, blackPostMat);
    this.blackPostMesh.rotation.x = Math.PI / 2;
    this.blackPostMesh.position.set(0.6, 1.0, 1.2);
    this.group.add(this.blackPostMesh);

    // Power Rocker Button
    const btnMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
    this.powerBtnMesh = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.35, 0.1), btnMat);
    this.powerBtnMesh.position.set(-0.8, 0.5, 1.15);
    this.group.add(this.powerBtnMesh);
  }

  public updateState() {
    (this.powerBtnMesh.material as THREE.MeshStandardMaterial).color.setHex(this.isOn ? 0x22c55e : 0xef4444);
  }

  public updateDisplayVoltage(voltage: number) {
    if (!this.displayCtx) return;
    this.displayCtx.fillStyle = '#09090b';
    this.displayCtx.fillRect(0, 0, 256, 128);
    this.displayCtx.fillStyle = '#22c55e';
    this.displayCtx.font = 'bold 44px monospace';
    this.displayCtx.fillText(`${voltage.toFixed(2)} V`, 20, 60);
    this.displayCtx.fillStyle = '#38bdf8';
    this.displayCtx.font = '24px monospace';
    const current = this.isOn ? voltage * 0.05 : 0;
    this.displayCtx.fillText(`${current.toFixed(2)} A  [DC]`, 20, 105);
    this.displayTex.needsUpdate = true;
  }

  public highlightPost(postType: 'VCC' | 'GND' | null) {
    (this.redPostMesh.material as THREE.MeshStandardMaterial).emissive.setHex(postType === 'VCC' ? 0x441111 : 0x000000);
    (this.blackPostMesh.material as THREE.MeshStandardMaterial).emissive.setHex(postType === 'GND' ? 0x222222 : 0x000000);
  }
}
