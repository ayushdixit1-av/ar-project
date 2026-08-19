import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  ConverterMode,
  BitVector4,
  IC7486Pin,
  WireConnection,
  BreadboardNode,
  ICComponentInfo,
  ProbeMode,
  PlacedIC,
  PlacedSwitch,
  PlacedLED,
  PlacedResistor,
  SelectedComponent,
} from '../types';
import {
  createBreadboardLabelTexture,
  createDynamicICTexture,
  createPSUDisplayTexture,
  createMultimeterDisplayTexture,
  createWirePath,
  getBreadboardNodes,
  getColumnX,
  getColumnFromX,
  BB_WIDTH,
  BB_DEPTH,
  BB_HEIGHT,
} from '../utils/threeHelpers';
import { AROverlay } from './AROverlay';
import {
  RotateCcw,
  Zap,
  Sparkles,
  Camera,
  Maximize2,
  Minimize2,
  Glasses,
  Eye,
  Layers,
  Cpu,
  Cable,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Plus,
  Move,
  Check,
} from 'lucide-react';

interface Breadboard3DProps {
  mode: ConverterMode;
  setMode: (mode: ConverterMode) => void;
  inputBits: BitVector4;
  outputBits: BitVector4;
  pins: IC7486Pin[];
  selectedIC: ICComponentInfo;
  wires: WireConnection[];
  selectedWire: WireConnection | null;
  activeStartNode: BreadboardNode | null;
  wireColor: string;
  onSelectNode: (node: BreadboardNode) => void;
  onSelectWire: (wire: WireConnection | null) => void;
  onSelectPin?: (pin: IC7486Pin | null) => void;
  toggleBit: (bit: keyof BitVector4) => void;
  isARModeActive?: boolean;
  setIsARModeActive?: (active: boolean) => void;
  onOpenComponentLibrary: () => void;
  psuVoltage?: number;
  probedVoltage?: number;
  onProbeNode?: (voltage: number, label: string) => void;
  probeMode?: ProbeMode;
  isICPowered?: boolean;
  onDeleteWire?: (id: string) => void;
  selectedComponent?: SelectedComponent;
  onSelectComponent?: (comp: SelectedComponent) => void;
  // Multi-component mounted elements
  placedICs?: PlacedIC[];
  onAddIC?: (icCode: string, column: number) => void;
  onRemoveIC?: (id: string) => void;
  onMoveIC?: (id: string, newColumn: number) => void;
  placedSwitches?: PlacedSwitch[];
  onToggleSwitch?: (id: string) => void;
  placedLEDs?: PlacedLED[];
  placedResistors?: PlacedResistor[];
  // IC Placement Mode (for faded ghost IC movement)
  isPlacingIC?: boolean;
  placingICCode?: string;
  onCancelPlacingIC?: () => void;
  hoverColumn?: number;
  onHoverColumnChange?: (col: number) => void;
  activeMovingICId?: string | null;
}

export const Breadboard3D: React.FC<Breadboard3DProps> = ({
  mode,
  setMode,
  inputBits,
  outputBits,
  pins,
  selectedIC,
  wires,
  selectedWire,
  activeStartNode,
  wireColor,
  onSelectNode,
  onSelectWire,
  onSelectPin,
  toggleBit,
  isARModeActive,
  setIsARModeActive,
  onOpenComponentLibrary,
  psuVoltage = 5.0,
  probedVoltage = 5.04,
  onProbeNode,
  probeMode = 'voltage',
  isICPowered = true,
  onDeleteWire,
  selectedComponent,
  onSelectComponent,
  placedICs = [],
  onAddIC,
  onRemoveIC,
  onMoveIC,
  placedSwitches = [],
  onToggleSwitch,
  placedLEDs = [],
  placedResistors = [],
  isPlacingIC = false,
  placingICCode = '7408',
  onCancelPlacingIC,
  hoverColumn: propHoverColumn,
  onHoverColumnChange,
  activeMovingICId: propActiveMovingICId,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const dynamicGroupRef = useRef<THREE.Group | null>(null);
  const ghostICGroupRef = useRef<THREE.Group | null>(null);
  const tableMeshRef = useRef<THREE.Mesh | null>(null);
  const bevelMeshRef = useRef<THREE.Mesh | null>(null);
  const gridMeshRef = useRef<THREE.GridHelper | null>(null);
  const psuDisplayPlateRef = useRef<THREE.Mesh | null>(null);
  const dmmDisplayPlateRef = useRef<THREE.Mesh | null>(null);
  const activeNodeMarkerRef = useRef<THREE.Mesh | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Moving / Placing state
  const [internalMovingICId, setInternalMovingICId] = useState<string | null>(null);
  const activeMovingICId = propActiveMovingICId !== undefined ? propActiveMovingICId : internalMovingICId;
  const setActiveMovingICId = setInternalMovingICId;
  const [internalHoverColumn, setInternalHoverColumn] = useState<number>(10);
  const hoverColumn = propHoverColumn !== undefined ? propHoverColumn : internalHoverColumn;

  const setHoverColumn = useCallback(
    (col: number) => {
      setInternalHoverColumn(col);
      if (onHoverColumnChange) {
        onHoverColumnChange(col);
      }
    },
    [onHoverColumnChange]
  );

  // Local AR state
  const [isAR, setIsAR] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [hasMultipleCameras, setHasMultipleCameras] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [arScale, setArScale] = useState(1.0);
  const [arRotation, setArRotation] = useState(0);

  const [hoveredInfo, setHoveredInfo] = useState<{
    title: string;
    description: string;
    stateText?: string;
    voltageText?: string;
    x: number;
    y: number;
  } | null>(null);

  const [cameraView, setCameraView] = useState<'iso' | 'top' | 'ic' | 'switches'>('iso');

  // Dynamic references for meshes
  const switchLeversRef = useRef<{
    [key: string]: { lever: THREE.Mesh; indicator: THREE.Mesh; id: string };
  }>({});
  const switchMeshesRef = useRef<{ mesh: THREE.Object3D; sw: PlacedSwitch }[]>([]);
  const ledMeshesRef = useRef<{ mesh: THREE.Object3D; led: PlacedLED }[]>([]);
  const resistorMeshesRef = useRef<{ mesh: THREE.Object3D; resistor: PlacedResistor }[]>([]);
  const wireMeshesRef = useRef<{
    mesh: THREE.Mesh;
    connection: WireConnection;
    originalMaterial: THREE.Material;
  }[]>([]);
  const nodeHitboxesRef = useRef<{ mesh: THREE.Mesh; node: BreadboardNode }[]>([]);
  const icMeshesRef = useRef<{ mesh: THREE.Mesh; ic: PlacedIC }[]>([]);

  // Calculate dynamic nodes based on placed ICs, switches, LEDs, tie-points
  const breadboardNodes = useMemo(() => {
    return getBreadboardNodes(placedICs, placedSwitches, placedLEDs);
  }, [placedICs, placedSwitches, placedLEDs]);

  // Sync external AR state if provided
  useEffect(() => {
    if (isARModeActive !== undefined && isARModeActive !== isAR) {
      setIsAR(isARModeActive);
    }
  }, [isARModeActive]);

  const handleSetAR = useCallback(
    (active: boolean) => {
      setIsAR(active);
      if (setIsARModeActive) setIsARModeActive(active);
    },
    [setIsARModeActive]
  );

  // Check camera devices
  useEffect(() => {
    if (!navigator.mediaDevices?.enumerateDevices) {
      setHasMultipleCameras(false);
      return;
    }

    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        if (Array.isArray(devices)) {
          const videoInputs = devices.filter((d) => d && d.kind === 'videoinput');
          setHasMultipleCameras(videoInputs.length > 1);
        } else {
          setHasMultipleCameras(false);
        }
      })
      .catch(() => setHasMultipleCameras(false));
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 11, 14);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.minDistance = 2.5;
    controls.maxDistance = 32;
    controls.target.set(0, 0.2, 0);
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.05);
    scene.add(ambientLight);

    const mainSpot = new THREE.DirectionalLight(0xf8fafc, 2.3);
    mainSpot.position.set(6, 16, 8);
    mainSpot.castShadow = true;
    mainSpot.shadow.mapSize.width = 2048;
    mainSpot.shadow.mapSize.height = 2048;
    mainSpot.shadow.bias = -0.0001;
    scene.add(mainSpot);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.85);
    rimLight.position.set(-10, 8, -6);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xe0e7ff, 0.6, 25);
    fillLight.position.set(0, 5, 0);
    scene.add(fillLight);

    // 6. Workbench Table Platform
    const platformWidth = 34;
    const platformDepth = 20;
    const platformHeight = 0.45;

    const platformGeo = new THREE.BoxGeometry(platformWidth, platformHeight, platformDepth);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.8,
      metalness: 0.2,
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -platformHeight / 2 - 0.01;
    platform.receiveShadow = true;
    scene.add(platform);
    tableMeshRef.current = platform;

    // Metallic Bevel Trim
    const bevelGeo = new THREE.BoxGeometry(platformWidth + 0.3, 0.08, platformDepth + 0.3);
    const bevelMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.8,
    });
    const bevel = new THREE.Mesh(bevelGeo, bevelMat);
    bevel.position.y = -0.04;
    scene.add(bevel);
    bevelMeshRef.current = bevel;

    const grid = new THREE.GridHelper(32, 48, 0x1e293b, 0x0f172a);
    grid.position.y = 0.001;
    scene.add(grid);
    gridMeshRef.current = grid;

    // 7. Root Transform Model Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    rootGroupRef.current = rootGroup;

    // Dynamic Components Container Group
    const dynamicGroup = new THREE.Group();
    rootGroup.add(dynamicGroup);
    dynamicGroupRef.current = dynamicGroup;

    // Ghost IC Group for Faded Moving Preview
    const ghostICGroup = new THREE.Group();
    ghostICGroup.position.set(0, 0.65, 0);
    ghostICGroup.visible = false;
    rootGroup.add(ghostICGroup);
    ghostICGroupRef.current = ghostICGroup;

    // 8. Benchtop DC Power Supply Unit (PSU) on Left Table
    const psuGroup = new THREE.Group();
    psuGroup.position.set(-11.2, 1.3, -1.0);
    rootGroup.add(psuGroup);

    const psuBodyGeo = new THREE.BoxGeometry(4.2, 2.6, 4.6);
    const psuBodyMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.4,
      roughness: 0.5,
    });
    const psuBody = new THREE.Mesh(psuBodyGeo, psuBodyMat);
    psuBody.castShadow = true;
    psuBody.receiveShadow = true;
    psuGroup.add(psuBody);

    const psuTex = createPSUDisplayTexture(psuVoltage, 0.25);
    const psuScreenGeo = new THREE.PlaneGeometry(2.4, 1.2);
    const psuScreenMat = new THREE.MeshBasicMaterial({ map: psuTex });
    const psuScreen = new THREE.Mesh(psuScreenGeo, psuScreenMat);
    psuScreen.position.set(0, 0.35, 2.31);
    psuGroup.add(psuScreen);
    psuDisplayPlateRef.current = psuScreen;

    const psuSwitchGeo = new THREE.BoxGeometry(0.5, 0.7, 0.2);
    const psuSwitchMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x22c55e,
      emissiveIntensity: 0.8,
    });
    const psuSwitch = new THREE.Mesh(psuSwitchGeo, psuSwitchMat);
    psuSwitch.position.set(-1.2, -0.6, 2.32);
    psuGroup.add(psuSwitch);

    const postGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.35, 16);
    const redPostMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.6 });
    const blackPostMat = new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.6 });

    const redPost = new THREE.Mesh(postGeo, redPostMat);
    redPost.rotation.x = Math.PI / 2;
    redPost.position.set(0.4, -0.6, 2.35);
    psuGroup.add(redPost);

    const blackPost = new THREE.Mesh(postGeo, blackPostMat);
    blackPost.rotation.x = Math.PI / 2;
    blackPost.position.set(1.2, -0.6, 2.35);
    psuGroup.add(blackPost);

    // 9. Digital Multimeter (DMM) on Right Table
    const dmmGroup = new THREE.Group();
    dmmGroup.position.set(11.2, 0.8, -1.0);
    dmmGroup.rotation.y = -0.3;
    rootGroup.add(dmmGroup);

    const dmmBodyGeo = new THREE.BoxGeometry(3.6, 1.6, 5.0);
    const dmmBodyMat = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      roughness: 0.4,
      metalness: 0.1,
    });
    const dmmBody = new THREE.Mesh(dmmBodyGeo, dmmBodyMat);
    dmmBody.castShadow = true;
    dmmGroup.add(dmmBody);

    const dmmTex = createMultimeterDisplayTexture(probedVoltage, 'DC V');
    const dmmScreenGeo = new THREE.PlaneGeometry(2.6, 1.5);
    const dmmScreenMat = new THREE.MeshBasicMaterial({ map: dmmTex });
    const dmmScreen = new THREE.Mesh(dmmScreenGeo, dmmScreenMat);
    dmmScreen.rotation.x = -Math.PI / 2 + 0.2;
    dmmScreen.position.set(0, 0.82, -0.8);
    dmmGroup.add(dmmScreen);
    dmmDisplayPlateRef.current = dmmScreen;

    // 10. Main Modular Breadboard (17.2cm × 6.2cm with printed holes matching user image)
    const bbGeo = new THREE.BoxGeometry(BB_WIDTH, BB_HEIGHT, BB_DEPTH);
    const bbLabelTex = createBreadboardLabelTexture();
    const bbFaceMat = new THREE.MeshStandardMaterial({
      map: bbLabelTex,
      roughness: 0.35,
      metalness: 0.05,
    });
    const bbSideMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.4,
      metalness: 0.05,
    });

    const bbMaterials = [
      bbSideMat,
      bbSideMat,
      bbFaceMat, // Top Face with printed holes and labels
      bbSideMat,
      bbSideMat,
      bbSideMat,
    ];
    const breadboard = new THREE.Mesh(bbGeo, bbMaterials);
    breadboard.position.y = BB_HEIGHT / 2;
    breadboard.castShadow = true;
    breadboard.receiveShadow = true;
    rootGroup.add(breadboard);

    // Center divider trough slot channel
    const troughGeo = new THREE.BoxGeometry(BB_WIDTH - 0.6, 0.12, 0.28);
    const troughMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.7 });
    const trough = new THREE.Mesh(troughGeo, troughMat);
    trough.position.y = BB_HEIGHT + 0.01;
    rootGroup.add(trough);

    // Active Node Indicator Ring Marker
    const markerGeo = new THREE.RingGeometry(0.18, 0.3, 24);
    const markerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const nodeMarker = new THREE.Mesh(markerGeo, markerMat);
    nodeMarker.rotation.x = -Math.PI / 2;
    nodeMarker.position.set(0, 0.6, 0);
    nodeMarker.visible = false;
    rootGroup.add(nodeMarker);
    activeNodeMarkerRef.current = nodeMarker;

    // Render Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      controls.update();

      // Pulse active node marker if wiring in progress
      if (nodeMarker.visible) {
        const pulse = 1 + Math.sin(elapsedTime * 6) * 0.15;
        nodeMarker.scale.set(pulse, pulse, pulse);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      renderer.dispose();
    };
  }, []);

  // Manage camera streaming for Augmented Reality (AR) mode
  const startCameraStream = useCallback(async () => {
    setCameraError(null);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera streaming is not supported on this browser or platform.');
      }

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: cameraFacing,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });
      } catch (e) {
        // Fallback to default video device
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch((playErr) => {
          console.warn('Video stream autoplay was interrupted:', playErr);
        });
      }
    } catch (err: any) {
      console.error('AR Camera Error:', err);
      const isDenied = err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError';
      const isNotFound = err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError';
      setCameraError(
        isDenied
          ? 'Camera permission denied. Please allow camera permissions in browser site settings to view the circuit overlaid on your desk.'
          : isNotFound
          ? 'No active camera hardware was detected on your device.'
          : err.message || 'Unable to open camera feed.'
      );
    }
  }, [cameraFacing]);

  const stopCameraStream = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Update Three.js scene background and shadow table for AR mode
  useEffect(() => {
    const scene = sceneRef.current;
    if (isAR) {
      if (scene) {
        scene.background = null;
      }
      if (tableMeshRef.current) {
        tableMeshRef.current.material = new THREE.ShadowMaterial({ opacity: 0.45 });
      }
      if (bevelMeshRef.current) bevelMeshRef.current.visible = false;
      if (gridMeshRef.current) gridMeshRef.current.visible = false;
      startCameraStream();
    } else {
      if (scene) {
        scene.background = new THREE.Color(0x020617);
      }
      if (tableMeshRef.current) {
        tableMeshRef.current.material = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          roughness: 0.8,
          metalness: 0.2,
        });
      }
      if (bevelMeshRef.current) bevelMeshRef.current.visible = true;
      if (gridMeshRef.current) gridMeshRef.current.visible = true;
      stopCameraStream();
    }

    return () => {
      stopCameraStream();
    };
  }, [isAR, startCameraStream, stopCameraStream]);

  // Transform AR scale and rotation
  useEffect(() => {
    if (rootGroupRef.current) {
      if (isAR) {
        rootGroupRef.current.scale.set(arScale, arScale, arScale);
        rootGroupRef.current.rotation.y = (arRotation * Math.PI) / 180;
      } else {
        rootGroupRef.current.scale.set(1, 1, 1);
        rootGroupRef.current.rotation.y = 0;
      }
    }
  }, [isAR, arScale, arRotation]);

  // Capture combined AR Snapshot (Camera feed + WebGL 3D circuit)
  const handleTakeSnapshot = useCallback(() => {
    const video = videoRef.current;
    const renderer = rendererRef.current;
    if (!renderer) return;

    const width = renderer.domElement.width;
    const height = renderer.domElement.height;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Draw video background if active
    if (video && video.readyState >= 2) {
      ctx.drawImage(video, 0, 0, width, height);
    } else {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Draw 3D WebGL Canvas
    ctx.drawImage(renderer.domElement, 0, 0, width, height);

    // 3. Trigger PNG Download
    const link = document.createElement('a');
    link.download = `AR_Electronics_Lab_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, []);

  // Update PSU and Multimeter LCD screen textures dynamically
  useEffect(() => {
    if (psuDisplayPlateRef.current) {
      const tex = createPSUDisplayTexture(psuVoltage, 0.25);
      (psuDisplayPlateRef.current.material as THREE.MeshBasicMaterial).map = tex;
      (psuDisplayPlateRef.current.material as THREE.MeshBasicMaterial).needsUpdate = true;
    }
    if (dmmDisplayPlateRef.current) {
      const unit = probeMode === 'continuity' ? 'BEEP ♫' : probeMode === 'logic' ? 'LOGIC' : 'DC V';
      const tex = createMultimeterDisplayTexture(probedVoltage, unit);
      (dmmDisplayPlateRef.current.material as THREE.MeshBasicMaterial).map = tex;
      (dmmDisplayPlateRef.current.material as THREE.MeshBasicMaterial).needsUpdate = true;
    }
  }, [psuVoltage, probedVoltage, probeMode]);

  // Update Active Node 3D Marker
  useEffect(() => {
    if (activeNodeMarkerRef.current) {
      if (activeStartNode) {
        activeNodeMarkerRef.current.position.set(
          activeStartNode.position[0],
          0.6,
          activeStartNode.position[2]
        );
        activeNodeMarkerRef.current.visible = true;
      } else {
        activeNodeMarkerRef.current.visible = false;
      }
    }
  }, [activeStartNode]);

  // Build Faded Ghost IC that moves parallel to other ICs along the central divider
  useEffect(() => {
    const ghostGroup = ghostICGroupRef.current;
    if (!ghostGroup) return;

    // Clear previous ghost
    while (ghostGroup.children.length > 0) {
      ghostGroup.remove(ghostGroup.children[0]);
    }

    const showGhost = isPlacingIC || activeMovingICId !== null;
    ghostGroup.visible = showGhost;

    if (showGhost) {
      const code = activeMovingICId
        ? placedICs.find((i) => i.id === activeMovingICId)?.icCode || '7408'
        : placingICCode;

      // Faded IC Body Package (DIP-14)
      const icBodyGeo = new THREE.BoxGeometry(3.4, 0.35, 1.2);
      const icTex = createDynamicICTexture({
        code,
        name: `SN74HC${code}N`,
        description: 'Position Preview',
      });

      const ghostTopMat = new THREE.MeshStandardMaterial({
        map: icTex,
        roughness: 0.35,
        metalness: 0.1,
        transparent: true,
        opacity: 0.65,
        emissive: new THREE.Color(0x38bdf8),
        emissiveIntensity: 0.35,
      });

      const ghostBody = new THREE.Mesh(icBodyGeo, ghostTopMat);
      ghostGroup.add(ghostBody);

      // Pin 1 indicator dot on top-left of IC
      const dotGeo = new THREE.CircleGeometry(0.08, 16);
      const dotMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.9,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.rotation.x = -Math.PI / 2;
      dot.position.set(-1.45, 0.18, 0.42);
      ghostGroup.add(dot);

      // Semi-circular notch on the left
      const notchGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.36, 16, 1, false, 0, Math.PI);
      const notchMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.8,
        transparent: true,
        opacity: 0.8,
      });
      const notch = new THREE.Mesh(notchGeo, notchMat);
      notch.rotation.y = -Math.PI / 2;
      notch.position.set(-1.7, 0, 0);
      ghostGroup.add(notch);

      // Faded pins
      const pinLegGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 12);
      const pinLegMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.7,
      });

      // Alignment Guide Rings on Breadboard Socket Holes
      const ringGeo = new THREE.RingGeometry(0.09, 0.18, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });

      for (let p = 0; p < 7; p++) {
        const px = -1.5 + p * 0.515;
        const legBot = new THREE.Mesh(pinLegGeo, pinLegMat);
        legBot.position.set(px, -0.18, 0.6);
        ghostGroup.add(legBot);

        const legTop = new THREE.Mesh(pinLegGeo, pinLegMat);
        legTop.position.set(px, -0.18, -0.6);
        ghostGroup.add(legTop);

        // Alignment rings under pins (Row F and Row E)
        const ringBot = new THREE.Mesh(ringGeo, ringMat);
        ringBot.rotation.x = -Math.PI / 2;
        ringBot.position.set(px, -0.32, 0.6);
        ghostGroup.add(ringBot);

        const ringTop = new THREE.Mesh(ringGeo, ringMat);
        ringTop.rotation.x = -Math.PI / 2;
        ringTop.position.set(px, -0.32, -0.6);
        ghostGroup.add(ringTop);
      }
    }
  }, [isPlacingIC, activeMovingICId, placingICCode, placedICs]);

  // Update Ghost IC position as hoverColumn changes (moves parallel across columns 1..24)
  useEffect(() => {
    if (ghostICGroupRef.current) {
      const startX = getColumnX(hoverColumn);
      const centerX = startX + 3 * 0.515;
      ghostICGroupRef.current.position.set(centerX, 0.65, 0);
    }
  }, [hoverColumn]);

  // RE-BUILD DYNAMIC 3D SCENE MESHES (ICs, Switches, LEDs, Resistors, Wires, Node Hitboxes)
  useEffect(() => {
    const dynamicGroup = dynamicGroupRef.current;
    if (!dynamicGroup) return;

    while (dynamicGroup.children.length > 0) {
      const child = dynamicGroup.children[0];
      dynamicGroup.remove(child);
    }
    nodeHitboxesRef.current = [];
    wireMeshesRef.current = [];
    switchLeversRef.current = {};
    switchMeshesRef.current = [];
    ledMeshesRef.current = [];
    resistorMeshesRef.current = [];
    icMeshesRef.current = [];

    // 1. Render all Placed ICs (Matching User Image: Black DIP-14 with white laser font)
    placedICs.forEach((ic, icIdx) => {
      // Don't render static mesh if this IC is currently being dragged/moved
      if (activeMovingICId === ic.id) return;

      const startCol = ic.columnStart || (icIdx === 0 ? 8 : 18);
      const centerX = getColumnX(startCol) + 3 * 0.515;

      const icGroup = new THREE.Group();
      icGroup.position.set(centerX, 0.65, 0);
      dynamicGroup.add(icGroup);

      // IC Body Package (DIP-14)
      const icBodyGeo = new THREE.BoxGeometry(3.4, 0.35, 1.2);
      const icTex = createDynamicICTexture({
        code: ic.icCode,
        name: `SN74HC${ic.icCode}N`,
        description: ic.name,
      });

      const icTopMat = new THREE.MeshStandardMaterial({
        map: icTex,
        roughness: 0.35,
        metalness: 0.1,
      });
      const icBlackMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        roughness: 0.5,
        metalness: 0.1,
      });

      const icMaterials = [
        icBlackMat,
        icBlackMat,
        icTopMat, // Top face with clean laser markings
        icBlackMat,
        icBlackMat,
        icBlackMat,
      ];
      const icBody = new THREE.Mesh(icBodyGeo, icMaterials);
      icBody.castShadow = true;
      icBody.userData = { ic };
      icGroup.add(icBody);
      icMeshesRef.current.push({ mesh: icBody, ic });

      // IC metallic legs (Pins 1..7 on bottom row F, Pins 14..8 on top row E)
      const pinLegGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 12);
      const pinLegMat = new THREE.MeshStandardMaterial({
        color: 0xd4d4d8,
        metalness: 0.9,
        roughness: 0.2,
      });

      for (let p = 0; p < 7; p++) {
        const px = -1.5 + p * 0.515;
        // Bottom row F leg
        const legBot = new THREE.Mesh(pinLegGeo, pinLegMat);
        legBot.position.set(px, -0.18, 0.6);
        icGroup.add(legBot);

        // Top row E leg
        const legTop = new THREE.Mesh(pinLegGeo, pinLegMat);
        legTop.position.set(px, -0.18, -0.6);
        icGroup.add(legTop);
      }
    });

    // 2. Render all Placed Switches (Matching User Image: Black square rocker/push base with red indicator dot, plus blue switch)
    placedSwitches.forEach((sw, idx) => {
      const xPos = sw.position ? sw.position[0] : getColumnX(sw.column);
      const zPos = sw.position ? sw.position[2] : 1.2;

      const swGroup = new THREE.Group();
      swGroup.position.set(xPos, 0.55, zPos);
      swGroup.userData = { sw };
      dynamicGroup.add(swGroup);

      // Black / Blue Square Housing Base (Matching image: first two black, third blue)
      const isBlueSwitch = idx === 2 || sw.id.includes('blue');
      const baseColor = isBlueSwitch ? 0x2563eb : 0x09090b;

      const swBaseGeo = new THREE.BoxGeometry(0.5, 0.28, 0.5);
      const swBaseMat = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: 0.4,
        metalness: 0.2,
      });
      const swBase = new THREE.Mesh(swBaseGeo, swBaseMat);
      swBase.castShadow = true;
      swBase.userData = { sw };
      swGroup.add(swBase);

      // Embedded Rocker lever
      const leverGeo = new THREE.BoxGeometry(0.32, 0.16, 0.32);
      const leverMat = new THREE.MeshStandardMaterial({
        color: isBlueSwitch ? 0x1d4ed8 : 0x18181b,
        roughness: 0.3,
      });
      const lever = new THREE.Mesh(leverGeo, leverMat);
      lever.position.set(0, 0.14, sw.state === 1 ? 0.05 : -0.05);
      lever.rotation.x = sw.state === 1 ? 0.2 : -0.2;
      lever.userData = { sw };
      swGroup.add(lever);

      // Embedded Bright Red Indicator Dot (Matching image: red dot on switch)
      const dotGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 16);
      const dotMat = new THREE.MeshBasicMaterial({
        color: sw.state === 1 ? 0xef4444 : 0x7f1d1d,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(0, 0.2, sw.state === 1 ? 0.06 : -0.06);
      dot.userData = { sw };
      swGroup.add(dot);

      switchLeversRef.current[sw.id] = { lever, indicator: dot, id: sw.id };
      switchMeshesRef.current.push({ mesh: swGroup, sw });
    });

    // 3. Render all Placed Discrete 5mm LEDs
    placedLEDs.forEach((led) => {
      const xPos = led.position ? led.position[0] : getColumnX(led.column);
      const zPos = led.position ? led.position[2] : 1.2;

      const ledGroup = new THREE.Group();
      ledGroup.position.set(xPos, 0.55, zPos);
      ledGroup.userData = { led };
      dynamicGroup.add(ledGroup);

      const colorHex =
        led.color === 'red'
          ? 0xef4444
          : led.color === 'green'
          ? 0x22c55e
          : led.color === 'yellow'
          ? 0xeab308
          : led.color === 'blue'
          ? 0x3b82f6
          : 0xa855f7;

      // Acrylic flanged dome
      const domeGeo = new THREE.CapsuleGeometry(0.2, 0.25, 12, 16);
      const domeMat = new THREE.MeshPhysicalMaterial({
        color: colorHex,
        emissive: led.state === 1 ? colorHex : 0x000000,
        emissiveIntensity: led.state === 1 ? 1.8 : 0.05,
        roughness: 0.1,
        transmission: 0.6,
        thickness: 0.5,
        transparent: true,
        opacity: 0.9,
      });
      const dome = new THREE.Mesh(domeGeo, domeMat);
      dome.position.y = 0.35;
      dome.castShadow = true;
      dome.userData = { led };
      ledGroup.add(dome);

      // Light & Glow halo
      const light = new THREE.PointLight(colorHex, led.state === 1 ? 1.6 : 0, 4);
      light.position.set(0, 0.4, 0);
      ledGroup.add(light);

      // Leads
      const leadGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.35, 8);
      const leadMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.9 });
      const anodeLead = new THREE.Mesh(leadGeo, leadMat);
      anodeLead.position.set(-0.1, 0.05, 0);
      ledGroup.add(anodeLead);
      const cathodeLead = new THREE.Mesh(leadGeo, leadMat);
      cathodeLead.position.set(0.1, 0.05, 0);
      ledGroup.add(cathodeLead);

      ledMeshesRef.current.push({ mesh: ledGroup, led });
    });

    // 4. Render all Placed Resistors (330Ω Axial)
    placedResistors.forEach((res) => {
      const xPos = res.position ? res.position[0] : getColumnX(res.column);
      const zPos = res.position ? res.position[2] : 1.7;

      const resGroup = new THREE.Group();
      resGroup.position.set(xPos, 0.58, zPos);
      resGroup.userData = { resistor: res };
      dynamicGroup.add(resGroup);

      const bodyGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0xd4b996, roughness: 0.5 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.rotation.z = Math.PI / 2;
      body.userData = { resistor: res };
      resGroup.add(body);

      // Bands (Orange Orange Brown Gold = 330Ω)
      const bandGeo = new THREE.CylinderGeometry(0.105, 0.105, 0.04, 16);
      const orangeMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
      const brownMat = new THREE.MeshBasicMaterial({ color: 0x78350f });
      const goldMat = new THREE.MeshBasicMaterial({ color: 0xeab308 });

      const b1 = new THREE.Mesh(bandGeo, orangeMat);
      b1.rotation.z = Math.PI / 2;
      b1.position.x = -0.15;
      resGroup.add(b1);

      const b2 = new THREE.Mesh(bandGeo, orangeMat);
      b2.rotation.z = Math.PI / 2;
      b2.position.x = -0.05;
      resGroup.add(b2);

      const b3 = new THREE.Mesh(bandGeo, brownMat);
      b3.rotation.z = Math.PI / 2;
      b3.position.x = 0.05;
      resGroup.add(b3);

      const b4 = new THREE.Mesh(bandGeo, goldMat);
      b4.rotation.z = Math.PI / 2;
      b4.position.x = 0.15;
      resGroup.add(b4);

      resistorMeshesRef.current.push({ mesh: resGroup, resistor: res });
    });

    // 5. Render all Jumper Wires
    wires.forEach((wire) => {
      let fromPos: THREE.Vector3 | null = null;
      let toPos: THREE.Vector3 | null = null;

      if (wire.fromPos && wire.toPos) {
        fromPos = new THREE.Vector3(...wire.fromPos);
        toPos = new THREE.Vector3(...wire.toPos);
      } else {
        const fromNode = breadboardNodes.find((n) => n.id === wire.fromNodeId);
        const toNode = breadboardNodes.find((n) => n.id === wire.toNodeId);
        if (fromNode) fromPos = new THREE.Vector3(...fromNode.position);
        if (toNode) toPos = new THREE.Vector3(...toNode.position);
      }

      if (!fromPos || !toPos) return;

      const curve = createWirePath(fromPos, toPos, 1.1);
      const wireGeo = new THREE.TubeGeometry(curve, 32, 0.065, 12, false);

      const isSelected = selectedWire?.id === wire.id;
      const wireMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(isSelected ? '#ffffff' : wire.color),
        roughness: 0.3,
        metalness: 0.15,
        emissive: new THREE.Color(isSelected ? '#38bdf8' : wire.color),
        emissiveIntensity: isSelected ? 0.6 : wire.logicState === 1 ? 0.25 : 0.02,
      });

      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      wireMesh.castShadow = true;
      wireMesh.userData = { wireId: wire.id, wire };
      dynamicGroup.add(wireMesh);

      wireMeshesRef.current.push({
        mesh: wireMesh,
        connection: wire,
        originalMaterial: wireMat,
      });
    });

    // 6. Interactive Click Hitboxes for Breadboard Nodes (Holes, Pins, Terminals)
    const hitboxGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.2, 12);
    const hitboxMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });

    breadboardNodes.forEach((node) => {
      const mesh = new THREE.Mesh(hitboxGeo, hitboxMat.clone());
      mesh.position.set(node.position[0], node.position[1], node.position[2]);
      mesh.userData = { node };
      dynamicGroup.add(mesh);
      nodeHitboxesRef.current.push({ mesh, node });
    });
  }, [placedICs, placedSwitches, placedLEDs, placedResistors, wires, selectedWire, breadboardNodes, activeMovingICId]);

  // Raycasting Click & Hover Handler
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const container = mountRef.current;
      const camera = cameraRef.current;
      const scene = sceneRef.current;
      if (!container || !camera || !scene) return;

      const rect = container.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      // If in Placed / Move IC Mode: clicking drops the IC at current hoverColumn!
      if (isPlacingIC) {
        if (onAddIC) {
          onAddIC(placingICCode, hoverColumn);
        }
        return;
      }
      if (activeMovingICId) {
        if (onMoveIC) {
          onMoveIC(activeMovingICId, hoverColumn);
        }
        setActiveMovingICId(null);
        return;
      }

      // 1. Check hit against Switch (Direct toggle on/off & select with delete option)
      const switchAllMeshes = switchMeshesRef.current.map((s) => s.mesh);
      const switchIntersects = raycaster.intersectObjects(switchAllMeshes, true);
      if (switchIntersects.length > 0) {
        const hit = switchIntersects[0];
        let obj: THREE.Object3D | null = hit.object;
        let sw: PlacedSwitch | null = null;
        while (obj && !sw) {
          if (obj.userData?.sw) sw = obj.userData.sw;
          obj = obj.parent;
        }
        if (sw) {
          if (onToggleSwitch) onToggleSwitch(sw.id);
          if (onSelectComponent) onSelectComponent({ type: 'switch', data: sw });
          return;
        }
      }

      // 2. Check hit against Breadboard Node / Hole Hitboxes (Connects wires only when clicking on a hole!)
      const hitboxMeshes = nodeHitboxesRef.current.map((n) => n.mesh);
      const nodeIntersects = raycaster.intersectObjects(hitboxMeshes, false);
      if (nodeIntersects.length > 0) {
        const hit = nodeIntersects[0];
        const node: BreadboardNode = hit.object.userData?.node;
        if (node) {
          onSelectNode(node);
          if (onProbeNode) {
            const v = node.category === 'power' ? 5.0 : node.category === 'ground' ? 0.0 : 4.98;
            onProbeNode(v, node.label);
          }
          return;
        }
      }

      // 3. Check hit against IC bodies (Select with delete and move options)
      const icMeshes = icMeshesRef.current.map((i) => i.mesh);
      const icIntersects = raycaster.intersectObjects(icMeshes, true);
      if (icIntersects.length > 0) {
        const hit = icIntersects[0];
        let obj: THREE.Object3D | null = hit.object;
        let ic: PlacedIC | null = null;
        while (obj && !ic) {
          if (obj.userData?.ic) ic = obj.userData.ic;
          obj = obj.parent;
        }
        if (ic) {
          if (onSelectComponent) onSelectComponent({ type: 'ic', data: ic });
          return;
        }
      }

      // 4. Check hit against LED bodies (Select with delete and color options)
      const ledMeshes = ledMeshesRef.current.map((l) => l.mesh);
      const ledIntersects = raycaster.intersectObjects(ledMeshes, true);
      if (ledIntersects.length > 0) {
        const hit = ledIntersects[0];
        let obj: THREE.Object3D | null = hit.object;
        let led: PlacedLED | null = null;
        while (obj && !led) {
          if (obj.userData?.led) led = obj.userData.led;
          obj = obj.parent;
        }
        if (led) {
          if (onSelectComponent) onSelectComponent({ type: 'led', data: led });
          return;
        }
      }

      // 5. Check hit against Resistor bodies (Select with delete option)
      const resMeshes = resistorMeshesRef.current.map((r) => r.mesh);
      const resIntersects = raycaster.intersectObjects(resMeshes, true);
      if (resIntersects.length > 0) {
        const hit = resIntersects[0];
        let obj: THREE.Object3D | null = hit.object;
        let res: PlacedResistor | null = null;
        while (obj && !res) {
          if (obj.userData?.resistor) res = obj.userData.resistor;
          obj = obj.parent;
        }
        if (res) {
          if (onSelectComponent) onSelectComponent({ type: 'resistor', data: res });
          return;
        }
      }

      // 6. Check hit against jumper wires (Select with delete option)
      const wireMeshes = wireMeshesRef.current.map((w) => w.mesh);
      const wireIntersects = raycaster.intersectObjects(wireMeshes, false);
      if (wireIntersects.length > 0) {
        const hit = wireIntersects[0];
        const wire: WireConnection = hit.object.userData?.wire;
        if (wire) {
          onSelectWire(wire);
          if (onSelectComponent) onSelectComponent({ type: 'wire', data: wire });
          return;
        }
      }

      // Background click: deselect
      if (onSelectComponent) onSelectComponent(null);
      onSelectWire(null);
    },
    [
      onSelectNode,
      onSelectWire,
      onProbeNode,
      onToggleSwitch,
      onSelectComponent,
      isPlacingIC,
      activeMovingICId,
      hoverColumn,
      onAddIC,
      onMoveIC,
      placingICCode,
    ]
  );

  // Mouse Move Hover & Faded IC Tracker
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const container = mountRef.current;
      const camera = cameraRef.current;
      if (!container || !camera) return;

      const rect = container.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      // Track cursor position on breadboard plane (y = 0.55) to update hoverColumn
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.55);
      const targetPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, targetPoint);

      if (targetPoint) {
        const col = Math.max(1, Math.min(24, getColumnFromX(targetPoint.x - 1.5)));
        setHoverColumn(col);
      }

      // Check hover info
      if (!isPlacingIC && !activeMovingICId) {
        const hitboxMeshes = nodeHitboxesRef.current.map((n) => n.mesh);
        const nodeIntersects = raycaster.intersectObjects(hitboxMeshes, false);

        if (nodeIntersects.length > 0) {
          const hit = nodeIntersects[0];
          const node: BreadboardNode = hit.object.userData.node;
          if (node) {
            setHoveredInfo({
              title: node.label,
              description: node.description || 'Interactive Breadboard Node',
              stateText: node.netName || 'TIE POINT',
              voltageText: node.category === 'power' ? '5.00V' : node.category === 'ground' ? '0.00V' : 'LOGIC',
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            });
            return;
          }
        }

        const icMeshes = icMeshesRef.current.map((i) => i.mesh);
        const icIntersects = raycaster.intersectObjects(icMeshes, false);
        if (icIntersects.length > 0) {
          const hit = icIntersects[0];
          const ic: PlacedIC = hit.object.userData.ic;
          if (ic) {
            setHoveredInfo({
              title: ic.name,
              description: `Mounted at Column ${ic.columnStart || 10}. Click to reposition/move.`,
              stateText: `IC ${ic.icCode}`,
              voltageText: 'VCC 5V',
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            });
            return;
          }
        }
      }

      setHoveredInfo(null);
    },
    [isPlacingIC, activeMovingICId]
  );

  // Camera Presets
  const handleSetCameraView = (view: 'iso' | 'top' | 'ic' | 'switches') => {
    setCameraView(view);
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (view === 'iso') {
      camera.position.set(0, 11, 14);
      controls.target.set(0, 0.2, 0);
    } else if (view === 'top') {
      camera.position.set(0, 18, 0.01);
      controls.target.set(0, 0, 0);
    } else if (view === 'ic') {
      camera.position.set(0, 5.5, 4.5);
      controls.target.set(0, 0.6, 0);
    } else if (view === 'switches') {
      camera.position.set(-6, 6, 6);
      controls.target.set(-4, 0.5, 1);
    }
  };

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 select-none shadow-2xl flex flex-col">
      {/* Real-time Video Stream Element for AR Passthrough (Placed behind WebGL canvas) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-0 ${
          isAR ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* 3D Canvas Mount Element */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="w-full h-full cursor-crosshair touch-none relative z-10"
      />

      {/* Floating Guidance Card for Moving/Placing IC */}
      {(isPlacingIC || activeMovingICId) && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 max-w-md w-full px-3 z-30 pointer-events-auto">
          <div className="bg-sky-950/95 border-2 border-sky-400 text-sky-200 rounded-2xl p-3 shadow-2xl backdrop-blur-md text-xs flex items-center justify-between gap-3 animate-pulse">
            <div className="flex items-center gap-2">
              <Move className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <span className="font-bold text-sky-100 block">
                  Move Cursor Parallel along Breadboard
                </span>
                <span className="text-[11px] text-sky-300">
                  Target: <strong className="text-white">Column {hoverColumn}</strong> (Pins spanning {hoverColumn} to {hoverColumn + 6})
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  if (activeMovingICId && onMoveIC) onMoveIC(activeMovingICId, hoverColumn);
                  else if (isPlacingIC && onAddIC) onAddIC(placingICCode, hoverColumn);
                  setActiveMovingICId(null);
                }}
                className="px-2.5 py-1 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold flex items-center gap-1 text-[11px] transition-all"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Snap Here</span>
              </button>
              {onCancelPlacingIC && (
                <button
                  onClick={() => {
                    setActiveMovingICId(null);
                    onCancelPlacingIC();
                  }}
                  className="px-2 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px]"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Wiring Guidance Banner */}
      {activeStartNode && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          <div className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce border-2 border-amber-300 text-xs">
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Step 2: Click TARGET hole to connect wire from {activeStartNode.label}</span>
          </div>
        </div>
      )}

      {/* Selected Wire Floating HUD Tooltip */}
      {selectedWire && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          <div className="bg-slate-900/95 border border-sky-400 rounded-2xl px-4 py-2.5 shadow-2xl flex items-center gap-3 backdrop-blur-md text-xs">
            <div
              className="w-3.5 h-3.5 rounded-full border border-white"
              style={{ backgroundColor: selectedWire.color }}
            />
            <div>
              <div className="font-bold text-slate-100">
                {selectedWire.fromName} ➔ {selectedWire.toName}
              </div>
              <div className="text-[10px] text-slate-400">
                Signal: {selectedWire.logicState === 1 ? 'HIGH (+5V)' : 'LOW (GND)'}
              </div>
            </div>
            {onDeleteWire && (
              <button
                onClick={() => onDeleteWire(selectedWire.id)}
                className="ml-2 px-2.5 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold flex items-center gap-1 transition-all shadow-md"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Wire</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Unpowered IC Alert Banner */}
      {!isICPowered && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div className="bg-amber-950/90 border border-amber-500/60 text-amber-200 rounded-2xl px-4 py-2 shadow-2xl backdrop-blur-md text-xs flex items-center gap-2.5 pointer-events-auto">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-amber-300 mr-1.5">IC UNPOWERED:</span>
              <span className="text-[11px] text-amber-200/90">
                IC requires +5V to Pin 14 (VCC) and Ground to Pin 7 (GND).
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Camera View Angle Selector Controls (Top Left) */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-1 shadow-md backdrop-blur-md flex flex-col gap-1 text-[10px] font-mono">
          <button
            onClick={() => handleSetCameraView('iso')}
            className={`px-2.5 py-1 rounded-lg transition-all font-bold ${
              cameraView === 'iso'
                ? 'bg-sky-500 text-slate-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Isometric
          </button>
          <button
            onClick={() => handleSetCameraView('top')}
            className={`px-2.5 py-1 rounded-lg transition-all font-bold ${
              cameraView === 'top'
                ? 'bg-sky-500 text-slate-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Top View
          </button>
          <button
            onClick={() => handleSetCameraView('ic')}
            className={`px-2.5 py-1 rounded-lg transition-all font-bold ${
              cameraView === 'ic'
                ? 'bg-sky-500 text-slate-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            IC Close-up
          </button>
        </div>
      </div>

      {/* Hover Info Tooltip */}
      {hoveredInfo && (
        <div
          className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-3"
          style={{ left: hoveredInfo.x, top: hoveredInfo.y }}
        >
          <div className="bg-slate-900/95 border border-sky-400/80 rounded-xl p-2 shadow-2xl backdrop-blur-md text-[11px] min-w-[160px] text-slate-200">
            <div className="font-bold text-sky-300 truncate">{hoveredInfo.title}</div>
            <div className="text-[10px] text-slate-400 line-clamp-2">{hoveredInfo.description}</div>
            {hoveredInfo.voltageText && (
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 pt-1 border-t border-slate-800 mt-1">
                <span>{hoveredInfo.stateText}</span>
                <span className="text-sky-400 font-bold">{hoveredInfo.voltageText}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AR Overlay if AR is active */}
      {isAR && (
        <AROverlay
          mode={mode}
          setMode={setMode}
          inputBits={inputBits}
          outputBits={outputBits}
          toggleBit={toggleBit}
          onExitAR={() => handleSetAR(false)}
          onSwitchCamera={() =>
            setCameraFacing((prev) => (prev === 'environment' ? 'user' : 'environment'))
          }
          onTakeSnapshot={handleTakeSnapshot}
          arScale={arScale}
          setArScale={setArScale}
          arRotation={arRotation}
          setArRotation={setArRotation}
          hasMultipleCameras={hasMultipleCameras}
          cameraFacing={cameraFacing}
          cameraError={cameraError}
          onRetryCamera={startCameraStream}
        />
      )}
    </div>
  );
};
