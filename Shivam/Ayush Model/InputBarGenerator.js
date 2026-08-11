import * as THREE from 'three';
import { BreadboardConfig } from './BreadboardConfig.js';
import { Hole } from './Hole.js';

export class InputBarGenerator {
  /**
   * Generate 10 logical holes for the input switch connections.
   */
  static generateHoles() {
    const holes = [];
    const pitch = BreadboardConfig.hole.pitch * 3; // 7.62mm pitch
    const numInputs = 10;
    const startX = -((numInputs - 1) * pitch) / 2; // Center horizontally
    
    // Position the connection ports at the bottom edge
    const yPos = 27; 

    for (let i = 0; i < numInputs; i++) {
      holes.push(new Hole({
        id: `INPUT_${i + 1}`,
        row: 'INPUT',
        column: i + 1,
        position: { x: startX + i * pitch, y: yPos, z: 0 },
      }));
    }
    

    return holes;
  }

  /**
   * Build the 3D visual panel with 10 switches mounted on it.
   */
  static buildVisuals(holes) {
    const group = new THREE.Group();
    group.name = 'input_bar_panel';

    const panelWidth = 84;
    const panelDepth = 24;
    
    const startX = holes[0].position.x;
    const endX = holes[9].position.x;
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
    // Position panel center such that holes are at the top edge of the panel
    // The holes are at holeY (27). We place the switches further down (e.g. z = 40)
    panel.position.set(centerX, -1.5, holeY + 9);
    group.add(panel);

    // Add 10 static switches onto the panel
    for (let i = 0; i < 10; i++) {
      const h = holes[i];
      const switchGroup = new THREE.Group();
      switchGroup.position.set(h.position.x, 2, holeY + 13);
      
      // Switch base
      const baseGeom = new THREE.BoxGeometry(4, 4, 5);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x444444 });
      const baseMesh = new THREE.Mesh(baseGeom, baseMat);
      
      // Switch toggle (metal stick)
      const toggleGeom = new THREE.CylinderGeometry(0.5, 0.5, 5);
      const toggleMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.8, roughness: 0.2 });
      const toggleMesh = new THREE.Mesh(toggleGeom, toggleMat);
      
      // LED indicator
      const ledGeom = new THREE.SphereGeometry(1.2, 16, 16);
      const ledMat = new THREE.MeshStandardMaterial({
        color: 0x550000,
        emissive: 0x000000,
        roughness: 0.2,
        metalness: 0.1
      });
      const ledMesh = new THREE.Mesh(ledGeom, ledMat);
      ledMesh.position.set(0, -1, -4.5); // Global Z=35.5, nicely between hole (31) and switch (37.5)
      
      switchGroup.add(baseMesh, toggleMesh, ledMesh);
      
      switchGroup.userData = { 
        isSwitch: true, 
        inputId: h.id, 
        state: false,
        toggle: () => {
          switchGroup.userData.state = !switchGroup.userData.state;
          if (switchGroup.userData.state) {
            // ON state (toggled away from user)
            toggleMesh.rotation.x = -Math.PI / 6;
            toggleMesh.position.set(0, 3.5, -1);
            ledMat.color.setHex(0xff0000);
            ledMat.emissive.setHex(0xaa0000);
          } else {
            // OFF state (toggled towards user)
            toggleMesh.rotation.x = Math.PI / 6;
            toggleMesh.position.set(0, 3.5, 1);
            ledMat.color.setHex(0x550000);
            ledMat.emissive.setHex(0x000000);
          }
        }
      };
      
      // Initialize to OFF state (state=false)
      // Call toggle twice to set initial positions properly while keeping state false
      switchGroup.userData.toggle();
      switchGroup.userData.toggle();
      
      baseMesh.userData = { parentSwitch: switchGroup };
      toggleMesh.userData = { parentSwitch: switchGroup };
      ledMesh.userData = { parentSwitch: switchGroup };

      group.add(switchGroup);
    }
    
    return group;
  }
}
