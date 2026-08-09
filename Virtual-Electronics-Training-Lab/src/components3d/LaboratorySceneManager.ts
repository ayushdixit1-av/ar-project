import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CircuitState, MultimeterProbe, WireColor, ICType } from '../types/electronics';
import { Breadboard3DMesh } from './Breadboard3DMesh';
import { IC3DMesh } from './IC3DMesh';
import { Wire3DMesh } from './Wire3DMesh';
import { Switch3DMesh } from './Switch3DMesh';
import { LED3DMesh } from './LED3DMesh';
import { Resistor3DMesh } from './Resistor3DMesh';
import { PowerSupply3DMesh } from './PowerSupply3DMesh';
import { Multimeter3DMesh } from './Multimeter3DMesh';
import { getHolePosition3D, getNearestHoleKey } from './breadboardCoordinates';
import { SimulationResult } from '../electronics/circuitSimulator';

export class LaboratorySceneManager {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public controls: OrbitControls;

  private breadboard3D!: Breadboard3DMesh;
  private powerSupply3D!: PowerSupply3DMesh;
  private multimeter3D!: Multimeter3DMesh;
  private workbenchGroup: THREE.Group = new THREE.Group();

  private icMeshMap: Map<string, IC3DMesh> = new Map();
  private wireMeshMap: Map<string, Wire3DMesh> = new Map();
  private switchMeshMap: Map<string, Switch3DMesh> = new Map();
  private ledMeshMap: Map<string, LED3DMesh> = new Map();
  private resistorMeshMap: Map<string, Resistor3DMesh> = new Map();

  // Temporary wire creation guide
  private tempWireMesh: THREE.Line | null = null;
  public activeWireStartHole: string | null = null;
  public selectedWireColor: WireColor = 'red';

  // Hover/Selection state
  public hoveredHoleKey: string | null = null;
  public selectedElement: { type: string; id: string } | null = null;

  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private container: HTMLElement;
  private resizeObserver: ResizeObserver | null = null;

  // Callbacks to UI
  public onHoleClick?: (holeKey: string) => void;
  public onElementSelect?: (element: { type: string; id: string } | null) => void;
  public onICPositionChange?: (icId: string, newStartCol: number) => void;
  public onICPlaced?: (type: ICType, startCol: number) => void;

  public placingICType: ICType | null = null;
  private tempICMesh: IC3DMesh | null = null;
  private isDraggingIC = false;
  private draggedICId: string | null = null;

  constructor(container: HTMLElement) {
    this.container = container;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0b0e); // Dark obsidian laboratory background
    this.scene.fog = new THREE.FogExp2(0x0a0b0e, 0.02);

    // 2. Camera
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    this.camera.position.set(0, 8, 9);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(this.renderer.domElement);

    // 4. Orbit Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent camera below table ground
    this.controls.minDistance = 3;
    this.controls.maxDistance = 25;
    this.controls.target.set(0, 0.4, 0);

    // 5. Lighting
    this.setupLighting();

    // 6. Workbench Environment
    this.setupWorkbench();

    // 7. Event listeners
    this.addEventListeners();

    // 8. Animation loop
    this.renderer.setAnimationLoop(this.animate);
  }

  private setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(ambientLight);

    // Spotlight over breadboard
    const spotLight = new THREE.SpotLight(0xffffff, 2.5);
    spotLight.position.set(0, 15, 5);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.5;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    this.scene.add(spotLight);

    // Fill blueish lab backlight
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
    fillLight.position.set(-10, 8, -10);
    this.scene.add(fillLight);
  }

  private setupWorkbench() {
    this.scene.add(this.workbenchGroup);

    // Wooden Laboratory Table Surface
    const tableGeo = new THREE.BoxGeometry(22, 0.8, 14);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.6,
      metalness: 0.2,
    });
    const tableMesh = new THREE.Mesh(tableGeo, tableMat);
    tableMesh.position.y = -0.4;
    tableMesh.receiveShadow = true;
    this.workbenchGroup.add(tableMesh);

    // Add Breadboard
    this.breadboard3D = new Breadboard3DMesh();
    this.workbenchGroup.add(this.breadboard3D.group);

    // Add Power Supply
    this.powerSupply3D = new PowerSupply3DMesh();
    this.workbenchGroup.add(this.powerSupply3D.group);

    // Add Multimeter
    this.multimeter3D = new Multimeter3DMesh();
    this.workbenchGroup.add(this.multimeter3D.group);
  }

  private addEventListeners() {
    window.addEventListener('resize', this.onResize);
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.onResize();
      });
      this.resizeObserver.observe(this.container);
    }
    this.renderer.domElement.addEventListener('pointerdown', this.onPointerDown);
    this.renderer.domElement.addEventListener('pointermove', this.onPointerMove);
    this.renderer.domElement.addEventListener('pointerup', this.onPointerUp);
    this.renderer.domElement.addEventListener('click', this.onPointerClick);
  }

  private onResize = () => {
    if (!this.container) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  private onPointerDown = (e: PointerEvent) => {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    for (const hit of intersects) {
      let p: THREE.Object3D | null = hit.object;
      while (p && p !== this.scene) {
        if (p.userData && p.userData.type === 'IC' && p.userData.icId) {
          this.isDraggingIC = true;
          this.draggedICId = p.userData.icId;
          this.controls.enabled = false;
          return;
        }
        p = p.parent;
      }
    }
  };

  private onPointerUp = () => {
    if (this.isDraggingIC) {
      this.isDraggingIC = false;
      this.draggedICId = null;
      this.controls.enabled = true;
    }
  };

  private onPointerMove = (e: MouseEvent) => {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Raycast ground plane z=0, y=0.36
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.36);
    const targetPoint = new THREE.Vector3();
    this.raycaster.ray.intersectPlane(plane, targetPoint);

    if (targetPoint) {
      // Handle IC drag
      if (this.isDraggingIC && this.draggedICId) {
        const colSpacing = 0.32;
        const colCount = 30;
        const newCol = Math.max(1, Math.min(23, Math.round((targetPoint.x / colSpacing) + (colCount + 1) / 2)));
        if (this.onICPositionChange) {
          this.onICPositionChange(this.draggedICId, newCol);
        }
        return;
      }

      const nearest = getNearestHoleKey(targetPoint);
      const newHoleKey = nearest ? nearest.holeKey : null;

      if (newHoleKey !== this.hoveredHoleKey) {
        this.hoveredHoleKey = newHoleKey;
        this.breadboard3D.highlightHole(this.hoveredHoleKey);

        // Highlight power supply binding posts if hovered
        this.powerSupply3D.highlightPost(
          newHoleKey === 'supply_VCC' ? 'VCC' : newHoleKey === 'supply_GND' ? 'GND' : null
        );
      }

      // Handle IC placement preview
      if (this.placingICType) {
        let col = 10;
        if (newHoleKey) {
          const parts = newHoleKey.split('_');
          if (parts[0] === 'terminal') {
            col = parseInt(parts[1], 10);
          } else if (parts[0] === 'rail') {
            col = parseInt(parts[3], 10);
          }
        }
        // DIP-14 has 7 pins per row, center it around column by shifting col-3
        const startCol = Math.max(1, Math.min(23, col - 3));

        if (!this.tempICMesh) {
          this.tempICMesh = new IC3DMesh({
            id: 'temp_ic_placing',
            type: this.placingICType,
            startCol: startCol,
          });
          this.tempICMesh.group.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = child.material.clone();
              child.material.transparent = true;
              child.material.opacity = 0.55;
            }
          });
          this.workbenchGroup.add(this.tempICMesh.group);
        } else {
          this.tempICMesh.icData.startCol = startCol;
          this.tempICMesh.updatePosition();
        }
      } else {
        this.clearTempIC();
      }

      // Update temp wire guide if active
      if (this.activeWireStartHole) {
        const startPos = getHolePosition3D(this.activeWireStartHole);
        const endPos = targetPoint;

        if (this.tempWireMesh) {
          this.workbenchGroup.remove(this.tempWireMesh);
        }

        const points = [startPos, endPos];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineDashedMaterial({
          color: 0x38bdf8,
          dashSize: 0.1,
          gapSize: 0.05,
        });
        this.tempWireMesh = new THREE.Line(lineGeo, lineMat);
        this.tempWireMesh.computeLineDistances();
        this.workbenchGroup.add(this.tempWireMesh);
      }
    }
  };

  private onPointerClick = (e: MouseEvent) => {
    // If placing IC, intercept and trigger callback
    if (this.placingICType) {
      if (this.hoveredHoleKey) {
        let col = 10;
        const parts = this.hoveredHoleKey.split('_');
        if (parts[0] === 'terminal') {
          col = parseInt(parts[1], 10);
        } else if (parts[0] === 'rail') {
          col = parseInt(parts[3], 10);
        }
        const startCol = Math.max(1, Math.min(23, col - 3));
        if (this.onICPlaced) {
          this.onICPlaced(this.placingICType, startCol);
        }
      }
      return;
    }

    // 1. Raycast component objects (ICs, switches, LEDs, wires, resistors) first
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    let clickedEl: { type: string; id: string } | null = null;
    for (const hit of intersects) {
      let p: THREE.Object3D | null = hit.object;
      while (p && p !== this.scene) {
        if (p.userData && p.userData.type) {
          if (p.userData.type === 'IC') clickedEl = { type: 'IC', id: p.userData.icId };
          if (p.userData.type === 'SWITCH') clickedEl = { type: 'SWITCH', id: p.userData.switchId };
          if (p.userData.type === 'LED') clickedEl = { type: 'LED', id: p.userData.ledId };
          if (p.userData.type === 'WIRE') clickedEl = { type: 'WIRE', id: p.userData.wireId };
          if (p.userData.type === 'RESISTOR') clickedEl = { type: 'RESISTOR', id: p.userData.resistorId };
          break;
        }
        p = p.parent;
      }
      if (clickedEl) break;
    }

    if (clickedEl) {
      this.updateSelectionVisuals(clickedEl);
      if (this.onElementSelect) {
        this.onElementSelect(this.selectedElement);
      }
      return;
    }

    // 2. Otherwise fall back to click on hole (for wiring and resistors)
    if (this.hoveredHoleKey) {
      this.updateSelectionVisuals(null);
      if (this.onHoleClick) {
        this.onHoleClick(this.hoveredHoleKey);
      }
      return;
    }

    // Clicked empty space
    this.updateSelectionVisuals(null);
    if (this.onElementSelect) {
      this.onElementSelect(null);
    }
  };

  public cancelWireCreation() {
    this.activeWireStartHole = null;
    if (this.tempWireMesh) {
      this.workbenchGroup.remove(this.tempWireMesh);
      this.tempWireMesh = null;
    }
  }

  public syncCircuitState(state: CircuitState, simResult?: SimulationResult, multimeterProbe?: MultimeterProbe) {
    // 1. Sync ICs
    const activeIcIds = new Set(state.ics.map((i) => i.id));
    this.icMeshMap.forEach((mesh, id) => {
      if (!activeIcIds.has(id)) {
        this.workbenchGroup.remove(mesh.group);
        this.icMeshMap.delete(id);
      }
    });
    state.ics.forEach((ic) => {
      let mesh = this.icMeshMap.get(ic.id);
      if (!mesh) {
        mesh = new IC3DMesh(ic);
        this.workbenchGroup.add(mesh.group);
        this.icMeshMap.set(ic.id, mesh);
      } else {
        mesh.icData = ic;
        mesh.updatePosition();
      }
    });

    // 2. Sync Wires
    const activeWireIds = new Set(state.wires.map((w) => w.id));
    this.wireMeshMap.forEach((mesh, id) => {
      if (!activeWireIds.has(id)) {
        this.workbenchGroup.remove(mesh.group);
        this.wireMeshMap.delete(id);
      }
    });
    state.wires.forEach((w) => {
      let mesh = this.wireMeshMap.get(w.id);
      if (!mesh) {
        mesh = new Wire3DMesh(w);
        this.workbenchGroup.add(mesh.group);
        this.wireMeshMap.set(w.id, mesh);
      } else if (mesh.wireData.color !== w.color || mesh.wireData.fromHoleKey !== w.fromHoleKey || mesh.wireData.toHoleKey !== w.toHoleKey) {
        mesh.wireData = w;
        mesh.buildWire();
      }
    });

    // 3. Sync Switches
    const activeSwIds = new Set(state.switches.map((s) => s.id));
    this.switchMeshMap.forEach((mesh, id) => {
      if (!activeSwIds.has(id)) {
        this.workbenchGroup.remove(mesh.group);
        this.switchMeshMap.delete(id);
      }
    });
    state.switches.forEach((sw) => {
      let mesh = this.switchMeshMap.get(sw.id);
      if (!mesh) {
        mesh = new Switch3DMesh(sw);
        this.workbenchGroup.add(mesh.group);
        this.switchMeshMap.set(sw.id, mesh);
      } else {
        mesh.switchData = sw;
        mesh.updateState();
      }
    });

    // 4. Sync LEDs
    const activeLedIds = new Set(state.leds.map((l) => l.id));
    this.ledMeshMap.forEach((mesh, id) => {
      if (!activeLedIds.has(id)) {
        this.workbenchGroup.remove(mesh.group);
        this.ledMeshMap.delete(id);
      }
    });
    state.leds.forEach((led) => {
      let mesh = this.ledMeshMap.get(led.id);
      const isSimOn = simResult?.ledStates[led.id]?.isOn || false;
      const updatedLed = { ...led, isOn: isSimOn };

      if (!mesh) {
        mesh = new LED3DMesh(updatedLed);
        this.workbenchGroup.add(mesh.group);
        this.ledMeshMap.set(led.id, mesh);
      } else {
        mesh.ledData = updatedLed;
        mesh.updateState();
      }
    });

    // 5. Sync Resistors
    const activeResIds = new Set(state.resistors.map((r) => r.id));
    this.resistorMeshMap.forEach((mesh, id) => {
      if (!activeResIds.has(id)) {
        this.workbenchGroup.remove(mesh.group);
        this.resistorMeshMap.delete(id);
      }
    });
    state.resistors.forEach((res) => {
      let mesh = this.resistorMeshMap.get(res.id);
      if (!mesh) {
        mesh = new Resistor3DMesh(res);
        this.workbenchGroup.add(mesh.group);
        this.resistorMeshMap.set(res.id, mesh);
      }
    });

    // 6. Power Supply State
    this.powerSupply3D.isOn = state.powerSupplyOn;
    this.powerSupply3D.updateState();
    this.powerSupply3D.updateDisplayVoltage(state.powerSupplyVoltage !== undefined ? state.powerSupplyVoltage : 5.0);

    // 7. Multimeter Display update
    if (multimeterProbe && simResult) {
      if (multimeterProbe.redHoleKey) {
        const vRed = simResult.netVoltages[multimeterProbe.redHoleKey];
        const stateRed = simResult.netStates[multimeterProbe.redHoleKey];

        if (multimeterProbe.mode === 'VOLTAGE') {
          const valStr = isNaN(vRed) ? 'OL / Float' : `${vRed.toFixed(2)} V`;
          this.multimeter3D.updateDisplay(valStr, 'DC VOLTAGE');
        } else if (multimeterProbe.mode === 'LOGIC') {
          this.multimeter3D.updateDisplay(`LOGIC: ${stateRed || 'FLOAT'}`, 'LOGIC PROBE');
        } else if (multimeterProbe.mode === 'CONTINUITY' && multimeterProbe.blackHoleKey) {
          const sameNet = simResult.netStates[multimeterProbe.redHoleKey] === simResult.netStates[multimeterProbe.blackHoleKey];
          this.multimeter3D.updateDisplay(sameNet ? 'BEEP! 0.0 Ω' : 'OPEN CIRCUIT', 'CONTINUITY');
        }
      } else {
        this.multimeter3D.updateDisplay('0.00 V', 'DC VOLTS');
      }
    }
  }

  private animate = () => {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  public destroy() {
    window.removeEventListener('resize', this.onResize);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.renderer.domElement.removeEventListener('pointerdown', this.onPointerDown);
    this.renderer.domElement.removeEventListener('pointermove', this.onPointerMove);
    this.renderer.domElement.removeEventListener('pointerup', this.onPointerUp);
    this.renderer.domElement.removeEventListener('click', this.onPointerClick);
    this.renderer.dispose();
  }

  public setPlacingIC(type: ICType | null) {
    this.placingICType = type;
    if (!type) {
      this.clearTempIC();
    }
  }

  public clearTempIC() {
    if (this.tempICMesh) {
      this.scene.remove(this.tempICMesh.group);
      this.tempICMesh = null;
    }
  }

  public updateSelectionVisuals(selected: { type: string; id: string } | null) {
    this.selectedElement = selected;

    const highlightGroup = (group: THREE.Group, isSelected: boolean) => {
      group.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const mat = child.material as THREE.MeshStandardMaterial;
          if (isSelected) {
            if (mat.userData.origEmissive === undefined) {
              mat.userData.origEmissive = mat.emissive ? mat.emissive.getHex() : 0x000000;
            }
            if (mat.emissive) mat.emissive.setHex(0x0055ff);
          } else {
            if (mat.userData.origEmissive !== undefined && mat.emissive) {
              mat.emissive.setHex(mat.userData.origEmissive);
            }
          }
        }
      });
    };

    this.icMeshMap.forEach((mesh, id) => {
      highlightGroup(mesh.group, !!(selected && selected.type === 'IC' && selected.id === id));
    });
    this.wireMeshMap.forEach((mesh, id) => {
      highlightGroup(mesh.group, !!(selected && selected.type === 'WIRE' && selected.id === id));
    });
    this.switchMeshMap.forEach((mesh, id) => {
      highlightGroup(mesh.group, !!(selected && selected.type === 'SWITCH' && selected.id === id));
    });
    this.ledMeshMap.forEach((mesh, id) => {
      highlightGroup(mesh.group, !!(selected && selected.type === 'LED' && selected.id === id));
    });
    this.resistorMeshMap.forEach((mesh, id) => {
      highlightGroup(mesh.group, !!(selected && selected.type === 'RESISTOR' && selected.id === id));
    });
  }

  public enterARMode() {
    // 1. Clear background color and fog for pass-through transparency
    this.scene.background = null;
    this.scene.fog = null;

    // 2. Scale down the entire lab workbench to fit beautifully in physical room
    this.workbenchGroup.scale.set(0.12, 0.12, 0.12);

    // 3. Position the workbench relative to WebXR camera origin
    // 60cm down, 1.2 meters forward
    this.workbenchGroup.position.set(0, -0.6, -1.2);

    // Turn off desktop OrbitControls during AR
    this.controls.enabled = false;
  }

  public exitARMode() {
    // 1. Restore obsidian laboratory background and fog
    this.scene.background = new THREE.Color(0x0a0b0e);
    this.scene.fog = new THREE.FogExp2(0x0a0b0e, 0.02);

    // 2. Restore workbench scale and position to desktop layout
    this.workbenchGroup.scale.set(1, 1, 1);
    this.workbenchGroup.position.set(0, 0, 0);

    // Re-enable OrbitControls
    this.controls.enabled = true;
  }
}
