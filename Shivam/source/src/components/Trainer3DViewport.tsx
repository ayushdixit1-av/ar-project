import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  PlacedComponent,
  JumperWire,
  ViewRenderMode,
  CameraPreset,
  SimulationState,
  ComponentPin,
} from '../types';
import { createComponentMesh, createJumperWire3DMesh } from '../utils/threeHelpers';
import { COMPONENTS_LIBRARY } from '../data/componentsLibrary';
import {
  Eye,
  Box,
  Layers,
  Sparkles,
  Maximize2,
  RotateCcw,
  Camera,
  Zap,
  Info,
} from 'lucide-react';

interface Trainer3DViewportProps {
  placedComponents: PlacedComponent[];
  wires: JumperWire[];
  selectedComponentId: string | null;
  onSelectComponent: (comp: PlacedComponent | null) => void;
  renderMode: ViewRenderMode;
  setRenderMode: (mode: ViewRenderMode) => void;
  activeWireColor: string;
  isWireMode: boolean;
  onAddWire: (fromCompId: string, fromPinId: string, toCompId: string, toPinId: string) => void;
  simState: SimulationState;
  onToggleInput?: (index: number) => void;
  onTogglePower?: () => void;
  onToggleClock?: () => void;
  onShiftToAR?: () => void;
  isARMode?: boolean;
}

export const Trainer3DViewport: React.FC<Trainer3DViewportProps> = ({
  placedComponents,
  wires,
  selectedComponentId,
  onSelectComponent,
  renderMode,
  setRenderMode,
  activeWireColor,
  isWireMode,
  onAddWire,
  simState,
  onToggleInput,
  onToggleClock,
  onTogglePower,
  onShiftToAR,
  isARMode = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  // Wire creation state: pin clicked first
  const [wireStartPin, setWireStartPin] = useState<{ compId: string; pinId: string; pinMeta: ComponentPin } | null>(null);
  const [hoveredPin, setHoveredPin] = useState<{ compId: string; pinId: string } | null>(null);
  const [hoveredPinInfo, setHoveredPinInfo] = useState<{ name: string; type: string; compName: string } | null>(null);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('default');
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [pinOverlays, setPinOverlays] = useState<Array<{
    compId: string;
    pinId: string;
    pinName: string;
    pinType: string;
    compName: string;
    screenX: number;
    screenY: number;
    pinMeta: ComponentPin;
  }>>([]);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    if (isARMode) {
      scene.background = null;
      scene.fog = null;
    } else {
      scene.background = new THREE.Color(0x0a0a0f);
      scene.fog = new THREE.FogExp2(0x0a0a0f, 0.02);
    }
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 10, 14);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    if (isARMode) {
      renderer.setClearColor(0x000000, 0);
    } else {
      renderer.setClearColor(0x0a0a0f, 1);
    }
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent camera going below floor
    controls.minDistance = 2;
    controls.maxDistance = 30;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(10, 15, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    const blueFill = new THREE.PointLight(0x3b82f6, 1.0, 15);
    blueFill.position.set(-10, 8, -10);
    scene.add(blueFill);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(30, 30, 0x3b82f6, 0x1f2937);
    gridHelper.position.y = -0.01;
    gridHelper.visible = !isARMode;
    scene.add(gridHelper);

    // Ground Shadow Plane for AR
    if (isARMode) {
      const shadowPlaneGeo = new THREE.PlaneGeometry(30, 30);
      const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.35 });
      const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
      shadowPlane.rotation.x = -Math.PI / 2;
      shadowPlane.position.y = -0.02;
      shadowPlane.receiveShadow = true;
      scene.add(shadowPlane);
    }

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();

      // Rotate motor propellers or servo arm if powered
      if (simState.isPowered) {
        scene.traverse((obj) => {
          if (obj.name.includes('servo-sg90')) {
            // Animating servo
          }
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Observer
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
    };
  }, []);

  // Update background transparent mode dynamically when isARMode changes
  useEffect(() => {
    if (!sceneRef.current || !rendererRef.current) return;
    if (isARMode) {
      sceneRef.current.background = null;
      sceneRef.current.fog = null;
      rendererRef.current.setClearColor(0x000000, 0);
    } else {
      sceneRef.current.background = new THREE.Color(0x0a0a0f);
      sceneRef.current.fog = new THREE.FogExp2(0x0a0a0f, 0.02);
      rendererRef.current.setClearColor(0x0a0a0f, 1);
    }
  }, [isARMode]);

  // Update 3D Scene Objects whenever placedComponents, wires, renderMode, or simState changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove existing component meshes and wire meshes
    const objectsToRemove: THREE.Object3D[] = [];
    scene.children.forEach((child) => {
      if (child.name.startsWith('component-') || child.name.startsWith('wire-')) {
        objectsToRemove.push(child);
      }
    });
    objectsToRemove.forEach((obj) => scene.remove(obj));

    // Render Placed Components
    placedComponents.forEach((placed) => {
      const group = createComponentMesh(placed, renderMode, simState);
      group.position.set(placed.position[0], placed.position[1], placed.position[2]);
      group.rotation.set(placed.rotation[0], placed.rotation[1], placed.rotation[2]);
      group.scale.set(placed.scale[0], placed.scale[1], placed.scale[2]);

      // Highlight selection ring
      if (placed.id === selectedComponentId) {
        const bbox = new THREE.BoxHelper(group, 0x3b82f6);
        group.add(bbox);
      }

      scene.add(group);
    });

    // Render Jumper Wires
    wires.forEach((wire) => {
      const fromPinMesh = scene.getObjectByName(`pin-${wire.fromComponentId}-${wire.fromPinId}`);
      const toPinMesh = scene.getObjectByName(`pin-${wire.toComponentId}-${wire.toPinId}`);

      let fromPos = new THREE.Vector3();
      let toPos = new THREE.Vector3();

      if (fromPinMesh && toPinMesh) {
        fromPinMesh.getWorldPosition(fromPos);
        toPinMesh.getWorldPosition(toPos);
        fromPos.y += 0.08;
        toPos.y += 0.08;
      } else {
        const fromComp = placedComponents.find((c) => c.id === wire.fromComponentId);
        const toComp = placedComponents.find((c) => c.id === wire.toComponentId);
        if (!fromComp || !toComp) return;

        const fromMeta = COMPONENTS_LIBRARY.find((m) => m.id === fromComp.componentMetaId);
        const toMeta = COMPONENTS_LIBRARY.find((m) => m.id === toComp.componentMetaId);
        const fromPin = fromMeta?.pins.find((p) => p.id === wire.fromPinId);
        const toPin = toMeta?.pins.find((p) => p.id === wire.toPinId);

        if (fromPin && toPin) {
          const fromMatrix = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(...fromComp.rotation));
          const localFrom = new THREE.Vector3(...fromPin.relativePos).applyMatrix4(fromMatrix);
          fromPos = new THREE.Vector3(...fromComp.position).add(localFrom);

          const toMatrix = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(...toComp.rotation));
          const localTo = new THREE.Vector3(...toPin.relativePos).applyMatrix4(toMatrix);
          toPos = new THREE.Vector3(...toComp.position).add(localTo);
        } else {
          return;
        }
      }

      const wireMesh = createJumperWire3DMesh(wire, fromPos, toPos);
      scene.add(wireMesh);
    });
  }, [placedComponents, wires, renderMode, selectedComponentId, simState]);

  // Project 3D Pin positions to 2D Screen Overlays for Pin Label HUD
  useEffect(() => {
    let frameId: number;

    const updatePinOverlayPositions = () => {
      frameId = requestAnimationFrame(updatePinOverlayPositions);

      if (!showLabels || !mountRef.current || !sceneRef.current || !cameraRef.current) {
        if (pinOverlays.length > 0) setPinOverlays([]);
        return;
      }

      const camera = cameraRef.current;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      const overlays: Array<any> = [];

      placedComponents.forEach((placed) => {
        const meta = COMPONENTS_LIBRARY.find((c) => c.id === placed.componentMetaId);
        if (!meta || meta.id.startsWith('led-') || meta.id === 'breadboard-830') return;

        // Display pins for ICs and Trainer Board Base
        meta.pins.forEach((pin) => {
          // For trainer board base, focus on 10 Inputs, 10 Outputs, and Power
          if (meta.id === 'trainer-board-base') {
            if (!pin.id.startsWith('tb-in') && !pin.id.startsWith('tb-out') && !pin.id.startsWith('tb-vcc') && !pin.id.startsWith('tb-gnd')) {
              return;
            }
          }

          const pinMesh = sceneRef.current?.getObjectByName(`pin-${placed.id}-${pin.id}`);
          if (!pinMesh) return;

          const worldPos = new THREE.Vector3();
          pinMesh.getWorldPosition(worldPos);

          const screenVec = worldPos.clone().project(camera);

          if (screenVec.z < 1) {
            const screenX = (screenVec.x * 0.5 + 0.5) * width;
            const screenY = (-screenVec.y * 0.5 + 0.5) * height;

            if (screenX >= 20 && screenX <= width - 20 && screenY >= 20 && screenY <= height - 20) {
              overlays.push({
                compId: placed.id,
                pinId: pin.id,
                pinName: pin.name,
                pinType: pin.type,
                compName: meta.name.split(' ')[0],
                screenX,
                screenY,
                pinMeta: pin,
              });
            }
          }
        });
      });

      setPinOverlays(overlays);
    };

    updatePinOverlayPositions();

    return () => cancelAnimationFrame(frameId);
  }, [placedComponents, showLabels]);

  // Raycasting Mouse Move for Pin Hover Tooltips
  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!mountRef.current || !sceneRef.current || !cameraRef.current) return;

    const rect = mountRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const intersects = raycaster.intersectObjects(sceneRef.current.children, true);

    if (intersects.length > 0) {
      let hitObj: THREE.Object3D | null = intersects[0].object;

      let pinData: any = null;
      hitObj.traverseAncestors((ancestor) => {
        if (ancestor.userData?.pinMeta) {
          pinData = ancestor.userData;
        }
      });
      if (hitObj.userData?.pinMeta) {
        pinData = hitObj.userData;
      }

      if (pinData) {
        setHoveredPin({ compId: pinData.componentId, pinId: pinData.pinId });
        const comp = placedComponents.find((c) => c.id === pinData.componentId);
        const meta = comp ? COMPONENTS_LIBRARY.find((m) => m.id === comp.componentMetaId) : null;
        setHoveredPinInfo({
          name: pinData.pinMeta.name,
          type: pinData.pinMeta.type,
          compName: meta ? meta.name.split(' ')[0] : 'Pin',
        });
        return;
      }
    }

    setHoveredPin(null);
    setHoveredPinInfo(null);
  };

  // Raycasting Click for Component Selection & Pin Snapping
  const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!mountRef.current || !sceneRef.current || !cameraRef.current) return;

    const rect = mountRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const intersects = raycaster.intersectObjects(sceneRef.current.children, true);

    if (intersects.length > 0) {
      let hitObj: THREE.Object3D | null = intersects[0].object;

      // 1. Check if 3D Rocker / Toggle Power Switch clicked
      if (hitObj.name && (hitObj.name.startsWith('power-switch') || hitObj.name === 'power-switch-rocker' || hitObj.name === 'power-switch-box' || hitObj.name === 'power-switch-lever')) {
        if (onTogglePower) {
          onTogglePower();
          return;
        }
      }

      // 2. Check if 3D Input Switch Lever or Box clicked
      if (hitObj.name && (hitObj.name.startsWith('switch-lever-') || hitObj.name.startsWith('switch-box-'))) {
        const swIndex = parseInt(hitObj.name.replace('switch-lever-', '').replace('switch-box-', ''), 10);
        if (!isNaN(swIndex) && onToggleInput) {
          onToggleInput(swIndex);
          return;
        }
      }

      // Clock Button
      if (hitObj.name === 'clock-pulse-btn') {
        if (onToggleClock) onToggleClock();
        return;
      }
      
      // 3. Check if pin clicked
      let pinData: any = null;
      hitObj.traverseAncestors((ancestor) => {
        if (ancestor.userData?.pinMeta) {
          pinData = ancestor.userData;
        }
      });
      if (hitObj.userData?.pinMeta) {
        pinData = hitObj.userData;
      }

      if (pinData) {
        const targetComp = placedComponents.find((c) => c.id === pinData.componentId);
        const targetMeta = targetComp ? COMPONENTS_LIBRARY.find((m) => m.id === targetComp.componentMetaId) : null;

        // RESTRICTION: Wires attachment feature ONLY for IC, inputs and outputs (ignore discrete LEDs)
        if (targetMeta && targetMeta.id.startsWith('led-')) {
          return;
        }

        if (!wireStartPin) {
          // Set first pin
          setWireStartPin({
            compId: pinData.componentId,
            pinId: pinData.pinId,
            pinMeta: pinData.pinMeta,
          });
        } else {
          // Connect to second pin
          if (wireStartPin.compId !== pinData.componentId || wireStartPin.pinId !== pinData.pinId) {
            onAddWire(wireStartPin.compId, wireStartPin.pinId, pinData.componentId, pinData.pinId);
          }
          setWireStartPin(null);
        }
        return;
      }

      // Find top parent component group
      let compGroup: THREE.Object3D | null = hitObj;
      while (compGroup && !compGroup.name.startsWith('component-')) {
        compGroup = compGroup.parent;
      }

      if (compGroup) {
        const compId = compGroup.name.replace('component-', '');
        const foundPlaced = placedComponents.find((c) => c.id === compId);
        if (foundPlaced) {
          onSelectComponent(foundPlaced);
          return;
        }
      }
    } else {
      onSelectComponent(null);
      setWireStartPin(null);
    }
  };

  // Camera Presets Smooth Transition
  const applyCameraPreset = (preset: CameraPreset) => {
    setCameraPreset(preset);
    if (!cameraRef.current || !controlsRef.current) return;

    const cam = cameraRef.current;
    const ctr = controlsRef.current;

    switch (preset) {
      case 'top':
        cam.position.set(0, 14, 0.1);
        ctr.target.set(0, 0, 0);
        break;
      case 'iso':
        cam.position.set(8, 8, 8);
        ctr.target.set(0, 0, 0);
        break;
      case 'front':
        cam.position.set(0, 3, 10);
        ctr.target.set(0, 0, 0);
        break;
      case 'close':
        cam.position.set(0, 2.5, 3.5);
        ctr.target.set(0, 0, 0);
        break;
      default:
        cam.position.set(0, 8, 12);
        ctr.target.set(0, 0, 0);
    }
  };

  return (
    <div className={`relative w-full h-full select-none overflow-hidden flex flex-col ${isARMode ? 'bg-transparent' : 'bg-[#08080a]'}`}>
      {/* 3D Viewport Canvas Container */}
      <div
        ref={mountRef}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={() => {
          setHoveredPin(null);
          setHoveredPinInfo(null);
        }}
        className="w-full h-full cursor-crosshair"
      />

      {/* Floating HUD Top Overlay Bar (Hidden in AR Mode to avoid UI clutter) */}
      {!isARMode && (
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          {/* Left Status Indicators */}
          <div className="flex items-center gap-2 bg-[#0a0a0a]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 pointer-events-auto shadow-xl">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>60 FPS</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="text-xs font-mono text-gray-300">
              Current Draw: <span className="text-blue-400">{simState.totalCurrentmA} mA</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="text-xs font-mono text-gray-300">
              Rail: <span className="text-emerald-400">{simState.systemVoltage}V</span>
            </div>
          </div>

          {/* View Render Mode Pills */}
          <div className="flex items-center gap-1 bg-[#0a0a0a]/80 backdrop-blur-md p-1 rounded-lg border border-white/10 pointer-events-auto shadow-xl">
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                showLabels ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Labels {showLabels ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => setRenderMode('pbr')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                renderMode === 'pbr' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              PBR Real
            </button>
            <button
              onClick={() => setRenderMode('wireframe')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                renderMode === 'wireframe' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Wireframe
            </button>
            <button
              onClick={() => setRenderMode('transparent')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                renderMode === 'transparent' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              X-Ray
            </button>
            <button
              onClick={() => setRenderMode('explode')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                renderMode === 'explode' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Explode
            </button>

            {onShiftToAR && (
              <button
                onClick={onShiftToAR}
                className="px-3 py-1 rounded text-[11px] font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center gap-1 shadow-md shadow-purple-600/30 border border-purple-400/40"
                title="Directly shift to AR Mode"
              >
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span>AR Mode</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Wire Creation Active Pin Banner */}
      {wireStartPin && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-xl border border-blue-400 shadow-2xl flex items-center gap-3 animate-bounce">
          <Zap className="w-4 h-4" />
          <span className="text-xs font-semibold">
            Pin Selected: <span className="underline font-mono">{wireStartPin.pinMeta.name}</span> — Click destination pin to attach jumper wire!
          </span>
          <button
            onClick={() => setWireStartPin(null)}
            className="text-xs underline text-blue-200 hover:text-white ml-2"
          >
            Cancel
          </button>
        </div>
      )}

      {/* 2D Pin Label Screen Overlays Layer (Hover-Only Label Reveal) */}
      {showLabels && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {pinOverlays.map((ov) => {
            const isSelected = wireStartPin?.compId === ov.compId && wireStartPin?.pinId === ov.pinId;
            const isHovered = (hoveredPin?.compId === ov.compId && hoveredPin?.pinId === ov.pinId) || isSelected;

            const isPower = ov.pinType === 'VCC' || ov.pinType === 'POWER';
            const isGnd = ov.pinType === 'GND';
            const isOut = ov.pinType === 'OUT';

            // Clean concise short label
            let shortName = ov.pinName;
            if (ov.pinName.startsWith('SW')) {
              shortName = ov.pinName.split(' ')[0]; // SW1..SW10
            } else if (ov.pinName.startsWith('OUT')) {
              shortName = ov.pinName.split(' ')[0]; // OUT1..OUT10
            } else if (ov.pinName.includes('+5V')) {
              shortName = '+5V';
            } else if (ov.pinName.includes('GND')) {
              shortName = 'GND';
            } else if (ov.pinName.startsWith('Pin')) {
              shortName = ov.pinName.replace(/Pin \d+ \((.*)\)/, '$1'); // 1A, 1B, 1Y, VCC, GND
              if (!shortName || shortName === ov.pinName) {
                shortName = ov.pinName;
              }
            }

            const activeColor = isSelected
              ? 'bg-amber-500 text-black font-bold ring-2 ring-white scale-110 z-30 shadow-lg'
              : isPower
              ? 'bg-red-950/90 text-red-300 border-red-500/70'
              : isGnd
              ? 'bg-blue-950/90 text-blue-300 border-blue-500/70'
              : isOut
              ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/70'
              : 'bg-slate-900/90 text-slate-200 border-slate-600';

            return (
              <div
                key={`${ov.compId}-${ov.pinId}`}
                style={{
                  left: `${ov.screenX}px`,
                  top: `${ov.screenY}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute pointer-events-auto transition-all"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!wireStartPin) {
                      setWireStartPin({ compId: ov.compId, pinId: ov.pinId, pinMeta: ov.pinMeta });
                    } else {
                      if (wireStartPin.compId !== ov.compId || wireStartPin.pinId !== ov.pinId) {
                        onAddWire(wireStartPin.compId, wireStartPin.pinId, ov.compId, ov.pinId);
                      }
                      setWireStartPin(null);
                    }
                  }}
                  onMouseEnter={() => setHoveredPin({ compId: ov.compId, pinId: ov.pinId })}
                  onMouseLeave={() => setHoveredPin(null)}
                  className={`flex items-center gap-1 transition-all cursor-pointer ${
                    isHovered
                      ? `px-2 py-0.5 rounded-md text-[10px] font-mono border backdrop-blur-md shadow-xl scale-110 z-20 ${activeColor}`
                      : 'w-3.5 h-3.5 rounded-full bg-transparent hover:bg-amber-400/60 z-10'
                  }`}
                  title={`${ov.compName} - ${ov.pinName}`}
                >
                  {isHovered && <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />}
                  {isHovered && <span className="whitespace-nowrap font-semibold">{shortName}</span>}
                </button>

                {/* Floating Tooltip Detail Card on Hover */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1 bg-black/95 text-white rounded-md text-[9px] font-mono whitespace-nowrap border border-white/20 pointer-events-none shadow-2xl z-30 flex items-center gap-1.5">
                    <span className="text-amber-400 font-bold">[{ov.compName}]</span>
                    <span>{ov.pinName}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Bottom Right Camera Preset Controls (Hidden in AR Mode) */}
      {!isARMode && (
        <div className="absolute bottom-4 left-4 flex items-center gap-2 pointer-events-auto">
          <div className="bg-[#0a0a0a]/90 backdrop-blur-md p-1.5 rounded-lg border border-white/10 flex items-center gap-1 shadow-2xl">
            <button
              onClick={() => applyCameraPreset('default')}
              className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase ${
                cameraPreset === 'default' ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40' : 'text-gray-400 hover:text-white'
              }`}
            >
              Reset
            </button>
            <button
              onClick={() => applyCameraPreset('top')}
              className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase ${
                cameraPreset === 'top' ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40' : 'text-gray-400 hover:text-white'
              }`}
            >
              Top View
            </button>
            <button
              onClick={() => applyCameraPreset('iso')}
              className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase ${
                cameraPreset === 'iso' ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40' : 'text-gray-400 hover:text-white'
              }`}
            >
              Isometric
            </button>
            <button
              onClick={() => applyCameraPreset('front')}
              className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase ${
                cameraPreset === 'front' ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40' : 'text-gray-400 hover:text-white'
              }`}
            >
              Front
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
