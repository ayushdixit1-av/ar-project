import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ConverterMode, BitVector4, BitValue, IC7486Pin, WireConnection } from '../types';
import { createBreadboardLabelTexture, createICTexture, createWirePath } from '../utils/threeHelpers';
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
} from 'lucide-react';

interface Breadboard3DProps {
  mode: ConverterMode;
  setMode: (mode: ConverterMode) => void;
  inputBits: BitVector4;
  outputBits: BitVector4;
  pins: IC7486Pin[];
  toggleBit: (bit: keyof BitVector4) => void;
  onSelectPin?: (pin: IC7486Pin | null) => void;
  onSelectWire?: (wire: WireConnection | null) => void;
  isARModeActive?: boolean;
  setIsARModeActive?: (active: boolean) => void;
}

export const Breadboard3D: React.FC<Breadboard3DProps> = ({
  mode,
  setMode,
  inputBits,
  outputBits,
  pins,
  toggleBit,
  onSelectPin,
  onSelectWire,
  isARModeActive,
  setIsARModeActive,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const benchMeshRef = useRef<THREE.Mesh | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);
  const shadowPlaneRef = useRef<THREE.Mesh | null>(null);
  const reticleRef = useRef<THREE.Mesh | null>(null);

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
  const [wirePulseEnabled, setWirePulseEnabled] = useState(true);

  // Dynamic references for meshes that need state updates
  const ledMeshesRef = useRef<{ [key: string]: { dome: THREE.Mesh; light: THREE.PointLight; halo: THREE.Mesh } }>({});
  const switchLeversRef = useRef<{ [key: string]: { lever: THREE.Mesh; indicator: THREE.Mesh } }>({});
  const wireMeshesRef = useRef<{ mesh: THREE.Mesh; connection: WireConnection; originalMaterial: THREE.Material }[]>([]);
  const pinHitboxesRef = useRef<{ mesh: THREE.Mesh; pin: IC7486Pin }[]>([]);

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
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const videoDevices = devices.filter((d) => d.kind === 'videoinput');
        setHasMultipleCameras(videoDevices.length > 1);
      }).catch(() => {});
    }
  }, []);

  // Handle AR Camera Video Stream
  useEffect(() => {
    let currentStream: MediaStream | null = null;

    if (isAR) {
      setCameraError(null);
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: cameraFacing,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      navigator.mediaDevices
        ?.getUserMedia(constraints)
        .then((stream) => {
          currentStream = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(() => {});
          }

          // Switch Three.js scene to transparent for AR
          if (rendererRef.current && sceneRef.current) {
            rendererRef.current.setClearColor(0x000000, 0);
            sceneRef.current.background = null;
            if (sceneRef.current.fog) sceneRef.current.fog = null;
          }
          if (benchMeshRef.current) benchMeshRef.current.visible = false;
          if (gridHelperRef.current) gridHelperRef.current.visible = false;
          if (shadowPlaneRef.current) shadowPlaneRef.current.visible = true;
          if (reticleRef.current) reticleRef.current.visible = true;
        })
        .catch((err) => {
          console.warn('Camera access error:', err);
          setCameraError('Camera access required for AR view. Please allow camera permissions.');
        });
    } else {
      // Restore standard 3D studio background
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }
      if (rendererRef.current && sceneRef.current) {
        rendererRef.current.setClearColor(0x0f172a, 1);
        sceneRef.current.background = new THREE.Color(0x0f172a);
        sceneRef.current.fog = new THREE.FogExp2(0x0f172a, 0.035);
      }
      if (benchMeshRef.current) benchMeshRef.current.visible = true;
      if (gridHelperRef.current) gridHelperRef.current.visible = true;
      if (shadowPlaneRef.current) shadowPlaneRef.current.visible = false;
      if (reticleRef.current) reticleRef.current.visible = false;
    }

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [isAR, cameraFacing]);

  // Update AR root group transformation
  useEffect(() => {
    if (rootGroupRef.current) {
      rootGroupRef.current.scale.set(arScale, arScale, arScale);
      rootGroupRef.current.rotation.y = (arRotation * Math.PI) / 180;
    }
  }, [arScale, arRotation]);

  // Setup Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0f172a);
    scene.fog = new THREE.FogExp2(0x0f172a, 0.035);

    // 2. Camera setup
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 11, 12);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
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
    controls.maxDistance = 28;
    controls.target.set(0, 0.2, 0);
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const mainSpot = new THREE.DirectionalLight(0xf8fafc, 2.2);
    mainSpot.position.set(5, 14, 8);
    mainSpot.castShadow = true;
    mainSpot.shadow.mapSize.width = 2048;
    mainSpot.shadow.mapSize.height = 2048;
    mainSpot.shadow.bias = -0.0001;
    mainSpot.shadow.camera.near = 1;
    mainSpot.shadow.camera.far = 30;
    mainSpot.shadow.camera.left = -12;
    mainSpot.shadow.camera.right = 12;
    mainSpot.shadow.camera.top = 8;
    mainSpot.shadow.camera.bottom = -8;
    scene.add(mainSpot);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
    rimLight.position.set(-8, 6, -6);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xe0e7ff, 0.6, 20);
    fillLight.position.set(0, 4, 0);
    scene.add(fillLight);

    // 6. Workbench Surface (for Studio 3D mode)
    const benchGeo = new THREE.PlaneGeometry(36, 28);
    const benchMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
      metalness: 0.2,
    });
    const bench = new THREE.Mesh(benchGeo, benchMat);
    bench.rotation.x = -Math.PI / 2;
    bench.position.y = -0.26;
    bench.receiveShadow = true;
    scene.add(bench);
    benchMeshRef.current = bench;

    const grid = new THREE.GridHelper(30, 60, 0x334155, 0x1e293b);
    grid.position.y = -0.25;
    scene.add(grid);
    gridHelperRef.current = grid;

    // 7. AR Shadow Catcher Plane (for AR Camera Passthrough mode)
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.45 });
    const shadowPlane = new THREE.Mesh(benchGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.25;
    shadowPlane.receiveShadow = true;
    shadowPlane.visible = false;
    scene.add(shadowPlane);
    shadowPlaneRef.current = shadowPlane;

    // 8. AR Surface Placement Reticle
    const reticleGeo = new THREE.RingGeometry(0.6, 0.75, 32);
    const reticleMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });
    const reticle = new THREE.Mesh(reticleGeo, reticleMat);
    reticle.rotation.x = -Math.PI / 2;
    reticle.position.set(0, -0.24, 0);
    reticle.visible = false;
    scene.add(reticle);
    reticleRef.current = reticle;

    // 9. Root Transform Model Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    rootGroupRef.current = rootGroup;

    // 10. Breadboard Base Assembly
    const bbGroup = new THREE.Group();
    rootGroup.add(bbGroup);

    const bbWidth = 17.2;
    const bbDepth = 6.4;
    const bbHeight = 0.5;

    const bbBodyGeo = new THREE.BoxGeometry(bbWidth, bbHeight, bbDepth);
    const bbBodyMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.45,
      metalness: 0.05,
    });
    const bbBody = new THREE.Mesh(bbBodyGeo, bbBodyMat);
    bbBody.castShadow = true;
    bbBody.receiveShadow = true;
    bbGroup.add(bbBody);

    const labelTex = createBreadboardLabelTexture();
    const plateGeo = new THREE.PlaneGeometry(bbWidth - 0.2, bbDepth - 0.2);
    const plateMat = new THREE.MeshBasicMaterial({
      map: labelTex,
      transparent: true,
      opacity: 0.95,
    });
    const labelPlate = new THREE.Mesh(plateGeo, plateMat);
    labelPlate.rotation.x = -Math.PI / 2;
    labelPlate.position.y = bbHeight / 2 + 0.002;
    bbGroup.add(labelPlate);

    const troughGeo = new THREE.BoxGeometry(bbWidth - 0.6, 0.12, 0.4);
    const troughMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      roughness: 0.6,
    });
    const trough = new THREE.Mesh(troughGeo, troughMat);
    trough.position.set(0, bbHeight / 2 - 0.05, 0);
    bbGroup.add(trough);

    // Holes instancing
    const holeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.08, 8);
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const holeCount = 30 * 10 + 30 * 4;
    const instancedHoles = new THREE.InstancedMesh(holeGeo, holeMat, holeCount);
    let holeIdx = 0;
    const dummy = new THREE.Object3D();

    const startX = -7.25;
    const stepX = 0.5;

    for (let col = 0; col < 30; col++) {
      const x = startX + col * stepX;

      for (let r = 0; r < 5; r++) {
        const z = -0.65 - r * 0.3;
        dummy.position.set(x, bbHeight / 2 + 0.005, z);
        dummy.updateMatrix();
        instancedHoles.setMatrixAt(holeIdx++, dummy.matrix);
      }

      for (let r = 0; r < 5; r++) {
        const z = 0.65 + r * 0.3;
        dummy.position.set(x, bbHeight / 2 + 0.005, z);
        dummy.updateMatrix();
        instancedHoles.setMatrixAt(holeIdx++, dummy.matrix);
      }

      dummy.position.set(x, bbHeight / 2 + 0.005, -2.5);
      dummy.updateMatrix();
      instancedHoles.setMatrixAt(holeIdx++, dummy.matrix);

      dummy.position.set(x, bbHeight / 2 + 0.005, -2.8);
      dummy.updateMatrix();
      instancedHoles.setMatrixAt(holeIdx++, dummy.matrix);

      dummy.position.set(x, bbHeight / 2 + 0.005, 2.5);
      dummy.updateMatrix();
      instancedHoles.setMatrixAt(holeIdx++, dummy.matrix);

      dummy.position.set(x, bbHeight / 2 + 0.005, 2.8);
      dummy.updateMatrix();
      instancedHoles.setMatrixAt(holeIdx++, dummy.matrix);
    }
    instancedHoles.instanceMatrix.needsUpdate = true;
    bbGroup.add(instancedHoles);

    // 11. DIP-14 IC Chip
    const icGroup = new THREE.Group();
    icGroup.position.set(0, bbHeight / 2 + 0.18, 0);
    rootGroup.add(icGroup);

    const icLength = 3.6;
    const icWidth = 0.95;
    const icHeight = 0.32;

    const icBodyGeo = new THREE.BoxGeometry(icLength, icHeight, icWidth);
    const icBodyMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.4,
      metalness: 0.1,
    });
    const icBody = new THREE.Mesh(icBodyGeo, icBodyMat);
    icBody.castShadow = true;
    icBody.receiveShadow = true;
    icGroup.add(icBody);

    const icTex = createICTexture();
    const icTopGeo = new THREE.PlaneGeometry(icLength - 0.05, icWidth - 0.05);
    const icTopMat = new THREE.MeshBasicMaterial({
      map: icTex,
      transparent: true,
    });
    const icTopPlate = new THREE.Mesh(icTopGeo, icTopMat);
    icTopPlate.rotation.x = -Math.PI / 2;
    icTopPlate.position.y = icHeight / 2 + 0.002;
    icGroup.add(icTopPlate);

    // 14 Metallic Pins & Hitboxes
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.9,
      roughness: 0.2,
    });

    const pinHitboxes: { mesh: THREE.Mesh; pin: IC7486Pin }[] = [];
    const pinXStart = -1.5;
    const pinXStep = 0.5;

    for (let i = 0; i < 7; i++) {
      const pinNum = i + 1;
      const px = pinXStart + i * pinXStep;
      const pz = 0.55;

      const pinGeo = new THREE.BoxGeometry(0.08, 0.45, 0.2);
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.set(px, -0.15, pz);
      pinMesh.castShadow = true;
      icGroup.add(pinMesh);

      const hitGeo = new THREE.BoxGeometry(0.3, 0.6, 0.4);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.set(px, bbHeight / 2 + 0.15, 0.65);
      hitMesh.userData = { type: 'pin', pinNumber: pinNum };
      rootGroup.add(hitMesh);

      const targetPin = pins.find((p) => p.pinNumber === pinNum) || {
        pinNumber: pinNum,
        name: `Pin ${pinNum}`,
        type: 'input',
        voltage: 0,
        logicLevel: 0,
        description: `Pin ${pinNum}`,
        connectedTo: 'Breadboard',
      };
      pinHitboxes.push({ mesh: hitMesh, pin: targetPin });
    }

    for (let i = 0; i < 7; i++) {
      const pinNum = 8 + i;
      const px = 1.5 - i * pinXStep;
      const pz = -0.55;

      const pinGeo = new THREE.BoxGeometry(0.08, 0.45, 0.2);
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.set(px, -0.15, pz);
      pinMesh.castShadow = true;
      icGroup.add(pinMesh);

      const hitGeo = new THREE.BoxGeometry(0.3, 0.6, 0.4);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.set(px, bbHeight / 2 + 0.15, -0.65);
      hitMesh.userData = { type: 'pin', pinNumber: pinNum };
      rootGroup.add(hitMesh);

      const targetPin = pins.find((p) => p.pinNumber === pinNum) || {
        pinNumber: pinNum,
        name: `Pin ${pinNum}`,
        type: 'input',
        voltage: 0,
        logicLevel: 0,
        description: `Pin ${pinNum}`,
        connectedTo: 'Breadboard',
      };
      pinHitboxes.push({ mesh: hitMesh, pin: targetPin });
    }
    pinHitboxesRef.current = pinHitboxes;

    // 12. Input Switch Breakout Module
    const switchGroup = new THREE.Group();
    switchGroup.position.set(-5.0, bbHeight / 2, 1.8);
    rootGroup.add(switchGroup);

    const pcbGeo = new THREE.BoxGeometry(4.2, 0.08, 1.6);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.3,
      metalness: 0.2,
    });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    pcb.position.y = 0.04;
    pcb.castShadow = true;
    switchGroup.add(pcb);

    const swXPositions = [-1.5, -0.5, 0.5, 1.5];
    const swKeys: (keyof BitVector4)[] = ['b3', 'b2', 'b1', 'b0'];

    swXPositions.forEach((sx, idx) => {
      const bitKey = swKeys[idx];

      const baseGeo = new THREE.BoxGeometry(0.65, 0.4, 0.65);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.8,
        roughness: 0.3,
      });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.set(sx, 0.24, 0);
      base.castShadow = true;
      switchGroup.add(base);

      const leverGeo = new THREE.CylinderGeometry(0.04, 0.07, 0.6, 12);
      const leverMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.95,
        roughness: 0.15,
      });
      const lever = new THREE.Mesh(leverGeo, leverMat);
      lever.position.set(sx, 0.6, 0);
      lever.castShadow = true;
      switchGroup.add(lever);

      const indGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.06, 12);
      const indMat = new THREE.MeshStandardMaterial({
        color: 0x22c55e,
        emissive: 0x22c55e,
        emissiveIntensity: 0.8,
      });
      const indicator = new THREE.Mesh(indGeo, indMat);
      indicator.position.set(sx, 0.1, -0.55);
      switchGroup.add(indicator);

      const swHitGeo = new THREE.BoxGeometry(0.8, 1.0, 0.8);
      const swHitMat = new THREE.MeshBasicMaterial({ visible: false });
      const swHit = new THREE.Mesh(swHitGeo, swHitMat);
      swHit.position.set(sx, 0.5, 0);
      swHit.userData = { type: 'switch', bitKey };
      switchGroup.add(swHit);

      switchLeversRef.current[bitKey] = { lever, indicator };
    });

    // 13. Output LEDs Breakout Module
    const ledGroup = new THREE.Group();
    ledGroup.position.set(4.5, bbHeight / 2, -1.5);
    rootGroup.add(ledGroup);

    const ledPcbGeo = new THREE.BoxGeometry(4.2, 0.08, 1.6);
    const ledPcbMat = new THREE.MeshStandardMaterial({
      color: 0x4c1d95,
      roughness: 0.3,
      metalness: 0.2,
    });
    const ledPcb = new THREE.Mesh(ledPcbGeo, ledPcbMat);
    ledPcb.position.y = 0.04;
    ledPcb.castShadow = true;
    ledGroup.add(ledPcb);

    const ledXPositions = [-1.5, -0.5, 0.5, 1.5];
    const ledKeys: (keyof BitVector4)[] = ['b3', 'b2', 'b1', 'b0'];
    const ledColors = [0x22c55e, 0x38bdf8, 0xf59e0b, 0xef4444];

    ledXPositions.forEach((lx, idx) => {
      const bitKey = ledKeys[idx];
      const color = ledColors[idx];

      const collarGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.1, 16);
      const collarMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
      const collar = new THREE.Mesh(collarGeo, collarMat);
      collar.position.set(lx, 0.1, 0);
      ledGroup.add(collar);

      const domeGeo = new THREE.SphereGeometry(0.22, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const domeMat = new THREE.MeshPhysicalMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.2,
        roughness: 0.2,
        transmission: 0.6,
        thickness: 0.5,
        transparent: true,
        opacity: 0.9,
      });
      const dome = new THREE.Mesh(domeGeo, domeMat);
      dome.position.set(lx, 0.15, 0);
      dome.castShadow = true;
      ledGroup.add(dome);

      const haloGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.set(lx, 0.25, 0);
      ledGroup.add(halo);

      const light = new THREE.PointLight(color, 0, 4);
      light.position.set(lx, 0.4, 0);
      ledGroup.add(light);

      const ledHitGeo = new THREE.BoxGeometry(0.7, 0.9, 0.7);
      const ledHitMat = new THREE.MeshBasicMaterial({ visible: false });
      const ledHit = new THREE.Mesh(ledHitGeo, ledHitMat);
      ledHit.position.set(lx, 0.4, 0);
      ledHit.userData = { type: 'led', bitKey, index: 3 - idx };
      ledGroup.add(ledHit);

      ledMeshesRef.current[bitKey] = { dome, light, halo };
    });

    // 14. Raycasting & Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      let found = false;
      for (const hit of intersects) {
        const obj = hit.object;
        if (obj.userData && obj.userData.type) {
          found = true;
          container.style.cursor = 'pointer';

          if (obj.userData.type === 'switch') {
            const key = obj.userData.bitKey as keyof BitVector4;
            const bitName = mode === 'bin2gray' ? `Binary Input Bit B${key.charAt(1)}` : `Gray Input Bit G${key.charAt(1)}`;
            setHoveredInfo({
              title: bitName,
              description: `Click in 3D or toggle switch in panel to invert state.`,
              stateText: `Logic: ${inputBits[key]} (${inputBits[key] === 1 ? '+5.0V HIGH' : '0.0V LOW'})`,
              x: event.clientX - rect.left,
              y: event.clientY - rect.top,
            });
          } else if (obj.userData.type === 'led') {
            const key = obj.userData.bitKey as keyof BitVector4;
            const bitIdx = key.charAt(1);
            const outName = mode === 'bin2gray' ? `Gray Output LED G${bitIdx}` : `Binary Output LED B${bitIdx}`;
            setHoveredInfo({
              title: outName,
              description: `Visual output indicator connected to IC 7486 logic circuit.`,
              stateText: `State: ${outputBits[key] === 1 ? 'ON (1) - Lit' : 'OFF (0) - Dim'}`,
              x: event.clientX - rect.left,
              y: event.clientY - rect.top,
            });
          } else if (obj.userData.type === 'pin') {
            const pinNum = obj.userData.pinNumber as number;
            const pin = pins.find((p) => p.pinNumber === pinNum);
            if (pin) {
              setHoveredInfo({
                title: `IC 7486 Pin ${pin.pinNumber} (${pin.name})`,
                description: `${pin.description} → Connected to ${pin.connectedTo}`,
                stateText: `Level: ${pin.logicLevel !== null ? pin.logicLevel : 'N/A'}`,
                voltageText: `${pin.voltage.toFixed(1)}V`,
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
              });
              if (onSelectPin) onSelectPin(pin);
            }
          } else if (obj.userData.type === 'wire') {
            const conn = obj.userData.connection as WireConnection;
            if (conn) {
              setHoveredInfo({
                title: `Jumper Wire: ${conn.label}`,
                description: `${conn.fromName} → ${conn.toName} (${conn.description})`,
                stateText: `Signal: ${conn.logicState === 1 ? 'HIGH (1 / +5V)' : 'LOW (0 / 0V)'}`,
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
              });
              if (onSelectWire) onSelectWire(conn);
            }
          }
          break;
        }
      }

      if (!found) {
        container.style.cursor = 'default';
        setHoveredInfo(null);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;

      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      for (const hit of intersects) {
        const obj = hit.object;
        if (obj.userData && obj.userData.type === 'switch') {
          const bitKey = obj.userData.bitKey as keyof BitVector4;
          toggleBit(bitKey);
          break;
        } else if (obj.userData && obj.userData.type === 'pin') {
          const pinNum = obj.userData.pinNumber as number;
          const pin = pins.find((p) => p.pinNumber === pinNum);
          if (pin && onSelectPin) {
            onSelectPin(pin);
          }
          break;
        }
      }
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);

    // 15. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      controls.update();

      // Animate active wire pulse signals
      if (wireMeshesRef.current.length > 0 && wirePulseEnabled) {
        wireMeshesRef.current.forEach(({ mesh, connection }) => {
          if (connection.logicState === 1 && mesh.material instanceof THREE.MeshStandardMaterial) {
            const pulse = (Math.sin(elapsedTime * 6) + 1) * 0.5;
            mesh.material.emissiveIntensity = 0.4 + pulse * 0.5;
          } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.emissiveIntensity = 0.05;
          }
        });
      }

      // Animate AR reticle pulse
      if (reticleRef.current && reticleRef.current.visible) {
        const pulse = (Math.sin(elapsedTime * 4) + 1) * 0.5;
        if (reticleRef.current.material instanceof THREE.MeshBasicMaterial) {
          reticleRef.current.material.opacity = 0.3 + pulse * 0.4;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0 && rendererRef.current && cameraRef.current) {
          cameraRef.current.aspect = w / h;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(w, h);
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Update Wires when mode or inputs change
  useEffect(() => {
    const rootGroup = rootGroupRef.current;
    if (!rootGroup) return;

    wireMeshesRef.current.forEach(({ mesh }) => {
      rootGroup.remove(mesh);
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => m.dispose());
      } else {
        mesh.material.dispose();
      }
    });
    wireMeshesRef.current = [];

    const connections: WireConnection[] = [];

    // Fixed Power and Ground Wires
    connections.push({
      id: 'w-vcc',
      fromName: 'VCC (+5V Power Rail)',
      toName: 'IC 7486 Pin 14 (VCC)',
      color: '#ef4444',
      logicState: 1,
      label: 'VCC (+5V Power)',
      description: 'Supplies +5.0V DC operating voltage to IC 7486',
      category: 'power',
    });

    connections.push({
      id: 'w-gnd',
      fromName: 'IC 7486 Pin 7 (GND)',
      toName: 'Ground Rail (0V)',
      color: '#18181b',
      logicState: 0,
      label: 'GND (0V Ground)',
      description: 'Connects IC 7486 Pin 7 to circuit common ground reference',
      category: 'ground',
    });

    connections.push({
      id: 'w-gnd-leds',
      fromName: 'LED Cathodes',
      toName: 'Ground Rail (-)',
      color: '#334155',
      logicState: 0,
      label: 'LED Cathode Return',
      description: '330Ω Current limiting return path to ground',
      category: 'ground',
    });

    if (mode === 'bin2gray') {
      connections.push({
        id: 'w-b3-led',
        fromName: 'Switch B3',
        toName: 'LED G3 (MSB)',
        color: '#06b6d4',
        logicState: inputBits.b3,
        label: 'G3 = B3 (Direct Pass-Through)',
        description: 'Binary MSB B3 directly becomes Gray MSB G3',
        category: 'output',
      });
      connections.push({
        id: 'w-b3-pin1',
        fromName: 'Switch B3',
        toName: 'IC Pin 1 (Gate 1 Input A)',
        color: '#06b6d4',
        logicState: inputBits.b3,
        label: 'B3 → Gate 1 Pin 1',
        description: 'Feeds Bit B3 into Gate 1 to XOR with B2',
        category: 'input',
      });

      connections.push({
        id: 'w-b2-pin2',
        fromName: 'Switch B2',
        toName: 'IC Pin 2 (Gate 1 Input B)',
        color: '#eab308',
        logicState: inputBits.b2,
        label: 'B2 → Gate 1 Pin 2',
        description: 'Feeds Bit B2 into Gate 1',
        category: 'input',
      });
      connections.push({
        id: 'w-b2-pin4',
        fromName: 'Switch B2 Jumper',
        toName: 'IC Pin 4 (Gate 2 Input A)',
        color: '#eab308',
        logicState: inputBits.b2,
        label: 'B2 → Gate 2 Pin 4',
        description: 'Branches Bit B2 into Gate 2 to XOR with B1',
        category: 'input',
      });

      connections.push({
        id: 'w-g2-led',
        fromName: 'IC Pin 3 (Gate 1 Output)',
        toName: 'LED G2',
        color: '#a855f7',
        logicState: outputBits.b2,
        label: 'G2 = B3 ⊕ B2 → LED G2',
        description: 'Gate 1 output drives Gray code Bit G2 LED',
        category: 'output',
      });

      connections.push({
        id: 'w-b1-pin5',
        fromName: 'Switch B1',
        toName: 'IC Pin 5 (Gate 2 Input B)',
        color: '#f97316',
        logicState: inputBits.b1,
        label: 'B1 → Gate 2 Pin 5',
        description: 'Feeds Bit B1 into Gate 2',
        category: 'input',
      });
      connections.push({
        id: 'w-b1-pin8',
        fromName: 'Switch B1 Jumper',
        toName: 'IC Pin 8 (Gate 3 Input A)',
        color: '#f97316',
        logicState: inputBits.b1,
        label: 'B1 → Gate 3 Pin 8',
        description: 'Branches Bit B1 into Gate 3 to XOR with B0',
        category: 'input',
      });

      connections.push({
        id: 'w-g1-led',
        fromName: 'IC Pin 6 (Gate 2 Output)',
        toName: 'LED G1',
        color: '#22c55e',
        logicState: outputBits.b1,
        label: 'G1 = B2 ⊕ B1 → LED G1',
        description: 'Gate 2 output drives Gray code Bit G1 LED',
        category: 'output',
      });

      connections.push({
        id: 'w-b0-pin9',
        fromName: 'Switch B0',
        toName: 'IC Pin 9 (Gate 3 Input B)',
        color: '#3b82f6',
        logicState: inputBits.b0,
        label: 'B0 → Gate 3 Pin 9',
        description: 'Feeds Bit B0 into Gate 3',
        category: 'input',
      });

      connections.push({
        id: 'w-g0-led',
        fromName: 'IC Pin 10 (Gate 3 Output)',
        toName: 'LED G0 (LSB)',
        color: '#ec4899',
        logicState: outputBits.b0,
        label: 'G0 = B1 ⊕ B0 → LED G0',
        description: 'Gate 3 output drives Gray code Bit G0 LED',
        category: 'output',
      });
    } else {
      connections.push({
        id: 'w-g3-led',
        fromName: 'Switch G3',
        toName: 'LED B3 (MSB)',
        color: '#06b6d4',
        logicState: inputBits.b3,
        label: 'B3 = G3 (Direct Pass-Through)',
        description: 'Gray MSB G3 directly becomes Binary MSB B3',
        category: 'output',
      });
      connections.push({
        id: 'w-g3-pin1',
        fromName: 'Switch G3',
        toName: 'IC Pin 1 (Gate 1 Input A)',
        color: '#06b6d4',
        logicState: inputBits.b3,
        label: 'G3 (B3) → Gate 1 Pin 1',
        description: 'Feeds MSB B3 into Gate 1 to XOR with G2',
        category: 'input',
      });

      connections.push({
        id: 'w-g2-pin2',
        fromName: 'Switch G2',
        toName: 'IC Pin 2 (Gate 1 Input B)',
        color: '#eab308',
        logicState: inputBits.b2,
        label: 'G2 → Gate 1 Pin 2',
        description: 'Feeds Gray Bit G2 into Gate 1',
        category: 'input',
      });

      connections.push({
        id: 'w-b2-led',
        fromName: 'IC Pin 3 (Gate 1 Output)',
        toName: 'LED B2',
        color: '#a855f7',
        logicState: outputBits.b2,
        label: 'B2 = B3 ⊕ G2 → LED B2',
        description: 'Gate 1 output drives Binary Bit B2 LED',
        category: 'output',
      });
      connections.push({
        id: 'w-cascade-b2',
        fromName: 'IC Pin 3 (Output B2)',
        toName: 'IC Pin 4 (Gate 2 Input A)',
        color: '#a855f7',
        logicState: outputBits.b2,
        label: 'Cascade: B2 → Gate 2 Pin 4',
        description: 'Cascades calculated Binary Bit B2 into next XOR stage',
        category: 'internal',
      });

      connections.push({
        id: 'w-g1-pin5',
        fromName: 'Switch G1',
        toName: 'IC Pin 5 (Gate 2 Input B)',
        color: '#f97316',
        logicState: inputBits.b1,
        label: 'G1 → Gate 2 Pin 5',
        description: 'Feeds Gray Bit G1 into Gate 2',
        category: 'input',
      });

      connections.push({
        id: 'w-b1-led',
        fromName: 'IC Pin 6 (Gate 2 Output)',
        toName: 'LED B1',
        color: '#22c55e',
        logicState: outputBits.b1,
        label: 'B1 = B2 ⊕ G1 → LED B1',
        description: 'Gate 2 output drives Binary Bit B1 LED',
        category: 'output',
      });
      connections.push({
        id: 'w-cascade-b1',
        fromName: 'IC Pin 6 (Output B1)',
        toName: 'IC Pin 8 (Gate 3 Input A)',
        color: '#22c55e',
        logicState: outputBits.b1,
        label: 'Cascade: B1 → Gate 3 Pin 8',
        description: 'Cascades calculated Binary Bit B1 into next XOR stage',
        category: 'internal',
      });

      connections.push({
        id: 'w-g0-pin9',
        fromName: 'Switch G0',
        toName: 'IC Pin 9 (Gate 3 Input B)',
        color: '#3b82f6',
        logicState: inputBits.b0,
        label: 'G0 → Gate 3 Pin 9',
        description: 'Feeds Gray Bit G0 into Gate 3',
        category: 'input',
      });

      connections.push({
        id: 'w-b0-led',
        fromName: 'IC Pin 10 (Gate 3 Output)',
        toName: 'LED B0 (LSB)',
        color: '#ec4899',
        logicState: outputBits.b0,
        label: 'B0 = B1 ⊕ G0 → LED B0',
        description: 'Gate 3 output drives Binary Bit B0 LED',
        category: 'output',
      });
    }

    const swCoords = {
      b3: new THREE.Vector3(-6.5, 0.35, 1.8),
      b2: new THREE.Vector3(-5.5, 0.35, 1.8),
      b1: new THREE.Vector3(-4.5, 0.35, 1.8),
      b0: new THREE.Vector3(-3.5, 0.35, 1.8),
    };

    const ledCoords = {
      b3: new THREE.Vector3(3.0, 0.35, -1.5),
      b2: new THREE.Vector3(4.0, 0.35, -1.5),
      b1: new THREE.Vector3(5.0, 0.35, -1.5),
      b0: new THREE.Vector3(6.0, 0.35, -1.5),
    };

    const pinCoords: { [key: number]: THREE.Vector3 } = {
      1: new THREE.Vector3(-1.5, 0.35, 0.65),
      2: new THREE.Vector3(-1.0, 0.35, 0.65),
      3: new THREE.Vector3(-0.5, 0.35, 0.65),
      4: new THREE.Vector3(0.0, 0.35, 0.65),
      5: new THREE.Vector3(0.5, 0.35, 0.65),
      6: new THREE.Vector3(1.0, 0.35, 0.65),
      7: new THREE.Vector3(1.5, 0.35, 0.65),
      8: new THREE.Vector3(1.5, 0.35, -0.65),
      9: new THREE.Vector3(1.0, 0.35, -0.65),
      10: new THREE.Vector3(0.5, 0.35, -0.65),
      11: new THREE.Vector3(0.0, 0.35, -0.65),
      12: new THREE.Vector3(-0.5, 0.35, -0.65),
      13: new THREE.Vector3(-1.0, 0.35, -0.65),
      14: new THREE.Vector3(-1.5, 0.35, -0.65),
    };

    const vccRail = new THREE.Vector3(-1.5, 0.28, -2.5);
    const gndRail = new THREE.Vector3(1.5, 0.28, 2.8);

    connections.forEach((conn, index) => {
      let start = new THREE.Vector3();
      let end = new THREE.Vector3();
      let arcHeight = 0.8 + (index % 4) * 0.25;

      if (conn.id === 'w-vcc') {
        start = vccRail;
        end = pinCoords[14];
        arcHeight = 0.7;
      } else if (conn.id === 'w-gnd') {
        start = pinCoords[7];
        end = gndRail;
        arcHeight = 0.7;
      } else if (conn.id === 'w-b3-led' || conn.id === 'w-g3-led') {
        start = swCoords.b3;
        end = ledCoords.b3;
        arcHeight = 1.6;
      } else if (conn.id === 'w-b3-pin1' || conn.id === 'w-g3-pin1') {
        start = swCoords.b3;
        end = pinCoords[1];
        arcHeight = 0.9;
      } else if (conn.id === 'w-b2-pin2' || conn.id === 'w-g2-pin2') {
        start = swCoords.b2;
        end = pinCoords[2];
        arcHeight = 0.8;
      } else if (conn.id === 'w-b2-pin4') {
        start = swCoords.b2;
        end = pinCoords[4];
        arcHeight = 1.1;
      } else if (conn.id === 'w-g2-led' || conn.id === 'w-b2-led') {
        start = pinCoords[3];
        end = ledCoords.b2;
        arcHeight = 1.2;
      } else if (conn.id === 'w-cascade-b2') {
        start = pinCoords[3];
        end = pinCoords[4];
        arcHeight = 0.6;
      } else if (conn.id === 'w-b1-pin5' || conn.id === 'w-g1-pin5') {
        start = swCoords.b1;
        end = pinCoords[5];
        arcHeight = 0.9;
      } else if (conn.id === 'w-b1-pin8') {
        start = swCoords.b1;
        end = pinCoords[8];
        arcHeight = 1.3;
      } else if (conn.id === 'w-g1-led' || conn.id === 'w-b1-led') {
        start = pinCoords[6];
        end = ledCoords.b1;
        arcHeight = 1.1;
      } else if (conn.id === 'w-cascade-b1') {
        start = pinCoords[6];
        end = pinCoords[8];
        arcHeight = 0.85;
      } else if (conn.id === 'w-b0-pin9' || conn.id === 'w-g0-pin9') {
        start = swCoords.b0;
        end = pinCoords[9];
        arcHeight = 1.0;
      } else if (conn.id === 'w-g0-led' || conn.id === 'w-b0-led') {
        start = pinCoords[10];
        end = ledCoords.b0;
        arcHeight = 1.0;
      } else {
        return;
      }

      const curve = createWirePath(start, end, arcHeight);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.055, 8, false);

      const isHigh = conn.logicState === 1;
      const wireMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(conn.color),
        emissive: new THREE.Color(conn.color),
        emissiveIntensity: isHigh ? 0.6 : 0.05,
        roughness: 0.35,
        metalness: 0.1,
      });

      const wireMesh = new THREE.Mesh(tubeGeo, wireMat);
      wireMesh.castShadow = true;
      wireMesh.userData = { type: 'wire', connection: conn };
      rootGroup.add(wireMesh);

      const capMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5 });
      const capGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.25, 8);

      const cap1 = new THREE.Mesh(capGeo, capMat);
      cap1.position.copy(start);
      cap1.position.y += 0.1;
      rootGroup.add(cap1);

      const cap2 = new THREE.Mesh(capGeo, capMat);
      cap2.position.copy(end);
      cap2.position.y += 0.1;
      rootGroup.add(cap2);

      wireMeshesRef.current.push({
        mesh: wireMesh,
        connection: conn,
        originalMaterial: wireMat,
      });
    });
  }, [mode, inputBits, outputBits]);

  // Update Switch & LED hardware states in 3D
  useEffect(() => {
    const keys: (keyof BitVector4)[] = ['b3', 'b2', 'b1', 'b0'];
    keys.forEach((k) => {
      const sw = switchLeversRef.current[k];
      if (sw) {
        const val = inputBits[k];
        sw.lever.rotation.x = val === 1 ? 0.38 : -0.38;
        if (sw.indicator.material instanceof THREE.MeshStandardMaterial) {
          sw.indicator.material.emissiveIntensity = val === 1 ? 1.0 : 0.1;
          sw.indicator.material.color.setHex(val === 1 ? 0x22c55e : 0x334155);
        }
      }
    });

    keys.forEach((k) => {
      const led = ledMeshesRef.current[k];
      if (led) {
        const val = outputBits[k];
        if (led.dome.material instanceof THREE.MeshPhysicalMaterial) {
          led.dome.material.emissiveIntensity = val === 1 ? 1.4 : 0.05;
        }
        if (led.halo.material instanceof THREE.MeshBasicMaterial) {
          led.halo.material.opacity = val === 1 ? 0.35 : 0.0;
        }
        led.light.intensity = val === 1 ? 2.5 : 0.0;
      }
    });
  }, [inputBits, outputBits]);

  // Camera preset transitions
  const setPresetView = useCallback((preset: 'iso' | 'top' | 'ic' | 'switches') => {
    setCameraView(preset);
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (preset === 'iso') {
      camera.position.set(0, 11, 12);
      controls.target.set(0, 0.2, 0);
    } else if (preset === 'top') {
      camera.position.set(0, 14, 0.01);
      controls.target.set(0, 0, 0);
    } else if (preset === 'ic') {
      camera.position.set(0, 3.5, 3.5);
      controls.target.set(0, 0.3, 0);
    } else if (preset === 'switches') {
      camera.position.set(-4.5, 4.0, 4.5);
      controls.target.set(-4.5, 0.2, 1.5);
    }
    controls.update();
  }, []);

  // Take High-Res AR Snapshot
  const handleTakeSnapshot = useCallback(() => {
    const renderer = rendererRef.current;
    const video = videoRef.current;
    if (!renderer) return;

    const snapshotCanvas = document.createElement('canvas');
    const width = renderer.domElement.width;
    const height = renderer.domElement.height;
    snapshotCanvas.width = width;
    snapshotCanvas.height = height;
    const ctx = snapshotCanvas.getContext('2d');
    if (!ctx) return;

    // 1. Draw video background if in AR
    if (isAR && video && video.readyState >= 2) {
      ctx.drawImage(video, 0, 0, width, height);
    } else {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Overlay 3D breadboard canvas
    ctx.drawImage(renderer.domElement, 0, 0, width, height);

    // 3. Add lab watermark
    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    ctx.fillRect(20, height - 60, 420, 40);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('IC 7486 CONVERTER • AR VIRTUAL LAB', 35, height - 35);

    // 4. Download snapshot
    const link = document.createElement('a');
    link.download = `IC7486_AR_Experiment_${Date.now()}.png`;
    link.href = snapshotCanvas.toDataURL('image/png');
    link.click();
  }, [isAR]);

  const handleSwitchCamera = useCallback(() => {
    setCameraFacing((prev) => (prev === 'environment' ? 'user' : 'environment'));
  }, []);

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 select-none">
      {/* Background Video for AR Camera Passthrough */}
      <video
        ref={videoRef}
        playsInline
        autoPlay
        muted
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300 ${
          isAR ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="relative z-10 w-full h-full" />

      {/* Floating 3D Toolbar (when NOT in AR HUD) */}
      {!isAR && (
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700/60 shadow-lg text-xs font-medium text-slate-200">
          <div className="flex items-center gap-1.5 border-r border-slate-700 pr-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-slate-300">Virtual Lab</span>
          </div>

          {/* View Presets */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPresetView('iso')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                cameraView === 'iso'
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
              title="Isometric 3D Perspective"
            >
              Perspective
            </button>
            <button
              onClick={() => setPresetView('top')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                cameraView === 'top'
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
              title="Direct Overhead Breadboard View"
            >
              Top-Down
            </button>
            <button
              onClick={() => setPresetView('ic')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                cameraView === 'ic'
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
              title="Focus on IC 7486 14-Pin Package"
            >
              IC 7486
            </button>
          </div>

          {/* Action Toggles & AR Switch */}
          <div className="flex items-center gap-1 border-l border-slate-700 pl-2">
            <button
              onClick={() => setWirePulseEnabled(!wirePulseEnabled)}
              className={`p-1.5 rounded-lg transition-all ${
                wirePulseEnabled ? 'text-amber-400 bg-amber-500/10' : 'text-slate-500 hover:bg-slate-800'
              }`}
              title="Toggle Live Current Flow Animation"
            >
              <Zap className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPresetView('iso')}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all"
              title="Reset Camera View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleSetAR(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 font-bold hover:brightness-110 shadow-md shadow-sky-500/20 transition-all"
              title="Switch to Augmented Reality (AR) Table Mode"
            >
              <Glasses className="w-3.5 h-3.5" />
              <span>AR Mode</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating 3D Interaction Badge & Mode Indicator (when not in AR) */}
      {!isAR && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-lg text-xs flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-slate-400">Mode:</span>
              <span className="font-semibold text-emerald-400">
                {mode === 'bin2gray' ? 'Binary → Gray' : 'Gray → Binary'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated AR Mode HUD & Camera Controls */}
      {isAR && (
        <AROverlay
          mode={mode}
          setMode={setMode}
          inputBits={inputBits}
          outputBits={outputBits}
          toggleBit={toggleBit}
          onExitAR={() => handleSetAR(false)}
          onSwitchCamera={handleSwitchCamera}
          onTakeSnapshot={handleTakeSnapshot}
          arScale={arScale}
          setArScale={setArScale}
          arRotation={arRotation}
          setArRotation={setArRotation}
          hasMultipleCameras={hasMultipleCameras}
          cameraFacing={cameraFacing}
        />
      )}

      {/* Camera Permission Error Notice */}
      {cameraError && isAR && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-rose-950/90 border border-rose-600 text-rose-200 px-4 py-2.5 rounded-xl text-xs shadow-2xl backdrop-blur-md flex items-center gap-2">
          <span>{cameraError}</span>
          <button
            onClick={() => setCameraFacing((prev) => (prev === 'environment' ? 'user' : 'environment'))}
            className="underline font-bold text-white hover:text-rose-100 ml-2"
          >
            Retry
          </button>
        </div>
      )}

      {/* Breadboard Live Pin / Wire / Component Hover Tooltip */}
      {hoveredInfo && !isAR && (
        <div
          className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 bg-slate-950/95 backdrop-blur-lg px-3.5 py-2.5 rounded-xl border border-slate-700 shadow-2xl text-xs max-w-xs transition-all duration-75"
          style={{
            left: `${hoveredInfo.x}px`,
            top: `${hoveredInfo.y}px`,
          }}
        >
          <div className="font-semibold text-sky-400 text-sm">{hoveredInfo.title}</div>
          <div className="text-slate-300 mt-0.5 leading-relaxed">{hoveredInfo.description}</div>
          {hoveredInfo.stateText && (
            <div className="mt-1.5 flex items-center gap-2 font-mono text-[11px] bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
              <span className="text-emerald-400 font-bold">{hoveredInfo.stateText}</span>
              {hoveredInfo.voltageText && (
                <span className="text-amber-400 font-bold ml-auto">{hoveredInfo.voltageText}</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bottom 3D Scene Hints */}
      {!isAR && (
        <div className="absolute bottom-3 left-4 z-20 pointer-events-none text-[11px] text-slate-400/80 flex items-center gap-3">
          <span>Left Drag: Rotate</span>
          <span>•</span>
          <span>Right Drag: Pan</span>
          <span>•</span>
          <span>Scroll: Zoom</span>
          <span>•</span>
          <span className="text-sky-400">Click Switches in 3D to Toggle</span>
        </div>
      )}
    </div>
  );
};
