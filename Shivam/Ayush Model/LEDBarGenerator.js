import * as THREE from 'three';
import { BreadboardConfig } from './BreadboardConfig.js';
import { Hole } from './Hole.js';
import { LEDRenderer } from './LEDRenderer.js';

export class LEDBarGenerator {
  /**
   * Generate 10 logical holes for the LED bar input connections.
   */
  static generateHoles() {
    const holes = [];
    const pitch = BreadboardConfig.hole.pitch * 4.5; // Wider pitch for a bigger bar (11.43mm)
    const numLeds = 10;
    const startX = -((numLeds - 1) * pitch) / 2; // Center horizontally
    
    // Position the connection ports closer to the panel edge for clean spacing
    const yPos = -34; 

    for (let i = 0; i < numLeds; i++) {
      holes.push(new Hole({
        id: `LEDBAR_${i + 1}`,
        row: 'LEDBAR',
        column: i + 1,
        position: { x: startX + i * pitch, y: yPos, z: 0 },
      }));
    }
    return holes;
  }

  /**
   * Build the 3D visual panel with 10 red LEDs mounted on it.
   */
  static buildVisuals(holes) {
    const group = new THREE.Group();
    group.name = 'led_bar_panel';

    const panelWidth = 124;
    const panelDepth = 24; // Matched depth with input bar
    
    const startX = holes[0].position.x;
    const endX = holes[holes.length - 1].position.x;
    const centerX = (startX + endX) / 2;
    const holeY = holes[0].position.y;
    
    // Create the dark plastic panel background
    const panelGeometry = new THREE.BoxGeometry(panelWidth, 3, panelDepth);
    const panelMat = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a1a, 
      roughness: 0.9, 
      metalness: 0.2 
    });
    const panel = new THREE.Mesh(panelGeometry, panelMat);
    // Position panel center so holes are nicely spaced from the edge
    panel.position.set(centerX, -1.5, holeY - 8);
    group.add(panel);

    // Add 10 big static red LEDs onto the panel
    for (let i = 0; i < 10; i++) {
      const h = holes[i];
      // Mount the LEDs spaced cleanly behind the connection holes
      const anodePos = new THREE.Vector3(h.position.x, 0, holeY - 8);
      const cathodePos = new THREE.Vector3(h.position.x, 0, holeY - 10.54);
      
      const { group: ledMesh, mid } = LEDRenderer.build(anodePos, cathodePos, 'red');
      
      // Scale the LED to make it big
      ledMesh.children.forEach(child => child.position.sub(mid));
      ledMesh.position.copy(mid);
      ledMesh.scale.set(1.7, 1.7, 1.7);
      
      group.add(ledMesh);
    }
    
    return group;
  }
}
