import * as THREE from 'three';

export class Multimeter3DMesh {
  public group: THREE.Group;
  private displayMesh!: THREE.Mesh;
  private canvasCtx!: CanvasRenderingContext2D | null;
  private canvasTex!: THREE.CanvasTexture;

  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(7.5, 0, -2.2); // Right side of workbench
    this.buildMultimeter();
  }

  private buildMultimeter() {
    // Yellow Rubberized Case Body
    const bodyGeo = new THREE.BoxGeometry(1.8, 2.4, 0.7);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.35;
    body.rotation.x = -0.3; // Angled display for easy viewing
    body.castShadow = true;
    this.group.add(body);

    // Inner Dark Facia
    const faciaMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5 });
    const facia = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, 0.05), faciaMat);
    facia.position.set(0, 0.37, 0.33);
    facia.rotation.x = -0.3;
    this.group.add(facia);

    // LCD Display Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    this.canvasCtx = canvas.getContext('2d');
    if (this.canvasCtx) {
      this.canvasCtx.fillStyle = '#84cc16';
      this.canvasCtx.fillRect(0, 0, 256, 128);
      this.canvasCtx.fillStyle = '#0f172a';
      this.canvasCtx.font = 'bold 36px monospace';
      this.canvasCtx.fillText('0.00 V', 20, 70);
    }
    this.canvasTex = new THREE.CanvasTexture(canvas);
    this.displayMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.3, 0.65),
      new THREE.MeshBasicMaterial({ map: this.canvasTex })
    );
    this.displayMesh.position.set(0, 0.8, 0.36);
    this.displayMesh.rotation.x = -0.3;
    this.group.add(this.displayMesh);

    // Rotary Mode Dial Knob
    const dialMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.3 });
    const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.15, 16), dialMat);
    dial.position.set(0, 0.1, 0.38);
    dial.rotation.x = -0.3 + Math.PI / 2;
    this.group.add(dial);
  }

  public updateDisplay(text: string, subtext: string = 'DC VOLTS') {
    if (!this.canvasCtx) return;
    this.canvasCtx.fillStyle = '#84cc16';
    this.canvasCtx.fillRect(0, 0, 256, 128);
    this.canvasCtx.fillStyle = '#0f172a';
    this.canvasCtx.font = 'bold 32px monospace';
    this.canvasCtx.fillText(text, 15, 60);
    this.canvasCtx.font = '18px sans-serif';
    this.canvasCtx.fillText(subtext, 15, 105);
    this.canvasTex.needsUpdate = true;
  }
}
