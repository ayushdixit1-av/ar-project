/**
 * ARMode.js
 *
 * "Experiment 1 in AR" — puts the 7408 AND-gate breadboard demo into the
 * real world on a phone. Picks the best render path automatically:
 *
 *   1. WebXR immersive-ar  (Android Chrome + ARCore / Google Play Services
 *      for AR): the board is placed on a real surface via hit-testing.
 *      Tap the floor/table to drop it, tap again to move it.
 *
 *   2. Gyro "magic window" (iPhone / everything else): a fullscreen 3D scene
 *      you look around with the phone's orientation sensors, plus touch drag.
 *
 * In both modes the demo auto-cycles the AND truth table
 * (00 -> 01 -> 10 -> 11) every 2.5 s: the output LED lights only when
 * A=1 AND B=1, and the floating readout above the board updates.
 *
 * Everything lives in a self-contained fullscreen overlay so the module
 * never touches the main lab renderer or scene.
 */
import * as THREE from 'three';
import { XREstimatedLight } from 'three/addons/webxr/XREstimatedLight.js';

import { BreadboardBody } from './BreadboardBody.js';
import { BreadboardConfig } from './BreadboardConfig.js';
import { HoleGenerator } from './HoleGenerator.js';
import { PowerRailGenerator } from './PowerRailGenerator.js';
import { IC } from './IC.js';
import { LEDRenderer } from './LEDRenderer.js';

const MODELS = {
  xrScale: 3,        // WebXR: 1 three-unit = 1 m, so a 165.5 mm board * 3 ~= 0.5 m
  gyroScale: 2,
  minScale: 1.2,
  maxScale: 6,
  cycleMs: 2500,
};

let overlay = null;
let ctx = null;

/* ------------------------------------------------------------------ *
 * 3D demo model (Experiment 1: 7408 AND gate circuit)
 * ------------------------------------------------------------------ */

function makeCanvasTexture(text, opts = {}) {
  const canvas = document.createElement('canvas');
  const c2d = canvas.getContext('2d');
  const fontSize = opts.fontSize || 44;
  const font = `700 ${fontSize}px Inter, system-ui, sans-serif`;
  const lines = opts.lines || [text];
  c2d.font = font;
  const lineW = Math.max(...lines.map((l) => c2d.measureText(l).width));
  const lineH = fontSize * 1.3;
  const padX = opts.padX || 22;
  const padY = opts.padY || 14;
  canvas.width = Math.ceil(lineW) + padX * 2;
  canvas.height = Math.ceil(lineH * lines.length) + padY * 2;

  c2d.font = font;
  const r = 12;
  c2d.beginPath();
  c2d.moveTo(r, 0);
  c2d.lineTo(canvas.width - r, 0);
  c2d.arc(canvas.width - r, r, r, -Math.PI / 2, 0);
  c2d.lineTo(canvas.width, canvas.height - r);
  c2d.arc(canvas.width - r, canvas.height - r, r, 0, Math.PI / 2);
  c2d.lineTo(r, canvas.height);
  c2d.arc(r, canvas.height - r, r, Math.PI / 2, Math.PI);
  c2d.lineTo(0, r);
  c2d.arc(r, r, r, Math.PI, Math.PI * 1.5);
  c2d.closePath();
  c2d.fillStyle = opts.bg || 'rgba(10, 15, 25, 0.82)';
  c2d.fill();
  c2d.strokeStyle = opts.border || '#8b5cf6';
  c2d.lineWidth = 2;
  c2d.stroke();

  c2d.fillStyle = opts.fontColor || '#eaf2ff';
  c2d.textAlign = 'center';
  c2d.textBaseline = 'middle';
  lines.forEach((l, i) => c2d.fillText(l, canvas.width / 2, padY + lineH * i + lineH / 2));
  return new THREE.CanvasTexture(canvas);
}

function makeSprite(text, opts = {}) {
  const tex = makeCanvasTexture(text, opts);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  const h = opts.height || 14;
  sprite.scale.set((tex.image.width / tex.image.height) * h, h, 1);
  return sprite;
}

function resizeSprite(sprite, height) {
  const img = sprite.material.map.image;
  sprite.scale.set((img.width / img.height) * height, height, 1);
}

function makeWire(a, b, color, radius = 0.5) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const length = dir.length();
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, length, 8),
    new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.15 })
  );
  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return mesh;
}

function makePin(v, color, height = 3.2, radius = 0.45) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, height, 12),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.4, roughness: 0.4 })
  );
  mesh.position.set(v.x, height / 2, v.z);
  return mesh;
}

/** All 882 holes as a single instanced draw call (mobile-friendly). */
function buildHoleField(holes) {
  const geo = new THREE.SphereGeometry(BreadboardConfig.hole.sphereRadius, 6, 5);
  const mat = new THREE.MeshStandardMaterial({ color: 0x9aa3af, roughness: 0.65, metalness: 0.15 });
  const mesh = new THREE.InstancedMesh(geo, mat, holes.length);
  const m = new THREE.Matrix4();
  for (let i = 0; i < holes.length; i++) {
    m.makeTranslation(holes[i].position.x, 0, holes[i].position.y);
    mesh.setMatrixAt(i, m);
  }
  mesh.instanceMatrix.needsUpdate = true;
  return mesh;
}

/**
 * Build the Experiment 1 demo: 830-point breadboard with a 7408 AND IC,
 * +5V/GND power wires, red output LED, colored input pins and a floating
 * truth-table readout. Returns a THREE.Group whose userData.advance()
 * cycles the input combination and updates the visuals.
 */
export function buildExperiment1Group() {
  const group = new THREE.Group();
  group.name = 'experiment1_ar';

  const holes = [...HoleGenerator.generate(), ...PowerRailGenerator.generate()];
  const pos = new Map(holes.map((h) => [h.id, new THREE.Vector3(h.position.x, 0, h.position.y)]));

  group.add(BreadboardBody.build());
  group.add(buildHoleField(holes));

  // 7408 AND gate straddling the center gap, pin 1 at E24.
  const pins = IC.footprintFor('7408', 'E', 24, 'NORMAL');
  const bounds = IC.bounds(pins);

  const icBody = new THREE.Mesh(
    new THREE.BoxGeometry(bounds.width + 0.75, 2.4, bounds.height + 0.75),
    new THREE.MeshStandardMaterial({ color: 0x15171c, roughness: 0.5 })
  );
  icBody.position.set(bounds.centerX, 1.2, bounds.centerY);
  group.add(icBody);

  const pinMat = new THREE.MeshStandardMaterial({ color: 0xc9ced6, metalness: 0.85, roughness: 0.35 });
  for (const p of pins) {
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 1.1, 8), pinMat);
    const v = pos.get(`${p.row}${p.column}`);
    pin.position.set(v.x, 0.95, v.z);
    group.add(pin);
  }

  const icLabel = makeSprite('7408 AND', { height: 9, fontSize: 34 });
  icLabel.position.set(bounds.centerX, 6, bounds.centerY);
  group.add(icLabel);

  // Power wires: +5V rail -> pin 14 (F24), GND rail -> pin 7 (E30).
  const railRed = pos.get('PT30').clone();
  const railBlack = pos.get('TN30').clone();
  const vcc = pos.get('F24').clone();
  const gnd = pos.get('E30').clone();
  railRed.y = railBlack.y = 1.6;
  vcc.y = gnd.y = 1.2;
  group.add(makeWire(railRed, vcc, 0xff4444, 0.5));
  group.add(makeWire(railBlack, gnd, 0x22262c, 0.5));

  // Input toggle pins on A (E24) and B (E25) + output LED on column 26.
  const inputA = makePin(pos.get('E24'), 0x22cc55);
  const inputB = makePin(pos.get('E25'), 0x22cc55);
  group.add(inputA, inputB);

  const led = LEDRenderer.build(pos.get('D26'), pos.get('D25'), 'red').group;
  group.add(led);
  LEDRenderer.setGlow(led, false, 'red');

  const status = makeSprite('', {
    lines: ['Experiment 1 · 7408 AND', 'A=0  B=0  \u2192  OUT=0'],
    height: 16,
    fontSize: 30,
  });
  status.position.set(0, 42, 0);
  group.add(status);

  const combos = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ];
  let step = 0;

  function renderState() {
    const [a, b] = combos[step];
    const out = a && b ? 1 : 0;
    LEDRenderer.setGlow(led, out === 1, 'red');
    for (const pin of [inputA, inputB]) {
      const level = pin === inputA ? a : b;
      const color = level ? 0x22cc55 : 0xff5555;
      pin.material.color.set(color);
      pin.material.emissive.set(color);
    }
    status.material.map = makeCanvasTexture('', {
      lines: ['Experiment 1 · 7408 AND', `A=${a}  B=${b}  \u2192  OUT=${out}`],
      height: 16,
      fontSize: 30,
    });
    resizeSprite(status, 16);
  }

  renderState();
  group.userData.advance = () => {
    step = (step + 1) % combos.length;
    renderState();
  };
  group.userData.reset = () => {
    step = 0;
    renderState();
  };
  return group;
}

/* ------------------------------------------------------------------ *
 * Overlay UI
 * ------------------------------------------------------------------ */

function ensureStyles() {
  if (document.getElementById('vetArStyles')) return;
  const style = document.createElement('style');
  style.id = 'vetArStyles';
  style.textContent = `
    #vetArOverlay {
      position: fixed; inset: 0; z-index: 200;
      background: #05070c; display: flex; flex-direction: column;
      font-family: system-ui, sans-serif;
    }
    #vetArOverlay .vet-ar-bar {
      display: flex; align-items: center; justify-content: space-between; gap: 10px;
      padding: 10px 14px; background: rgba(10, 14, 22, 0.88); color: #fff;
      font-size: 14px; font-weight: 600; z-index: 3;
    }
    #vetArOverlay .vet-ar-bar .vet-ar-size { display: flex; align-items: center; gap: 6px; color: #b8c2d9; font-weight: 500; }
    #vetArOverlay .vet-ar-bar button {
      background: rgba(255, 255, 255, 0.12); color: #fff; border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px; padding: 6px 12px; font-size: 13px; font-weight: 600; cursor: pointer;
    }
    #vetArOverlay .vet-ar-bar button:hover { background: rgba(255, 255, 255, 0.24); }
    #vetArOverlay .vet-ar-bar #vetArClose { border-color: rgba(229, 57, 53, 0.6); color: #ff8a80; }
    #vetArOverlay #vetArStage { flex: 1; position: relative; min-height: 0; }
    #vetArOverlay #vetArStage canvas { display: block; width: 100%; height: 100%; touch-action: none; }
    #vetArOverlay .vet-ar-hint {
      position: absolute; left: 50%; bottom: 16px; transform: translateX(-50%);
      background: rgba(10, 14, 22, 0.82); border: 1px solid rgba(255, 255, 255, 0.16);
      color: #dbe6ff; padding: 8px 18px; border-radius: 999px; font-size: 13px; font-weight: 600;
      white-space: nowrap; z-index: 3; pointer-events: none; text-align: center; max-width: 92vw;
    }
  `;
  document.head.appendChild(style);
}

function buildOverlay() {
  const el = document.createElement('div');
  el.id = 'vetArOverlay';
  el.innerHTML = `
    <div class="vet-ar-bar">
      <span>Experiment 1 · 7408 AND gate</span>
      <span class="vet-ar-size">Size
        <button id="vetArMinus" title="Smaller">-</button>
        <button id="vetArPlus" title="Bigger">+</button>
      </span>
      <button id="vetArClose" title="Exit AR">Exit</button>
    </div>
    <div id="vetArStage"></div>
    <div id="vetArHint" class="vet-ar-hint"></div>`;
  document.body.appendChild(el);
  return el;
}

function cleanupRenderer(renderer) {
  if (!renderer || renderer._vetCleaned) return;
  renderer._vetCleaned = true;
  renderer.setAnimationLoop(null);
  if (renderer.domElement && renderer.domElement.parentNode) {
    renderer.domElement.parentNode.removeChild(renderer.domElement);
  }
  renderer.dispose();
}

function close() {
  if (ctx) {
    ctx.stop();
    ctx = null;
  }
  if (overlay) {
    overlay.remove();
    overlay = null;
  }
}

/* ------------------------------------------------------------------ *
 * WebXR immersive-ar path
 * ------------------------------------------------------------------ */

function makeReticle() {
  const g = new THREE.Group();
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.06, 0.11, 32),
    new THREE.MeshBasicMaterial({ color: 0x4dabff, transparent: true, opacity: 0.9, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  g.add(ring);
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(0.06, 24),
    new THREE.MeshBasicMaterial({ color: 0x4dabff, transparent: true, opacity: 0.22 })
  );
  disc.rotation.x = -Math.PI / 2;
  g.add(disc);
  return g;
}

async function startXR({ overlay, stage, model, hint }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType('local-floor');
  stage.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 50);

  // Soft base light plus real AR light estimation when the session provides it.
  const ambient = new THREE.AmbientLight(0xffffff, 1.1);
  scene.add(ambient);
  const xrLight = new XREstimatedLight(renderer);
  scene.add(xrLight);
  const onEstimation = () => {
    if (xrLight.environment) scene.environment = xrLight.environment;
    if (xrLight.directionalLight) scene.add(xrLight.directionalLight);
    ambient.intensity = 0.4;
  };
  xrLight.addEventListener('estimationstart', onEstimation);
  let xrDisposed = false;

  let scaleVal = MODELS.xrScale;
  let surfaceY = 0;
  let placed = false;
  let stopped = false;
  let session = null;
  let hitSource = null;
  const timer = setInterval(() => {
    if (!stopped) model.userData.advance();
  }, MODELS.cycleMs);

  const reticle = makeReticle();
  reticle.visible = false;
  scene.add(reticle);

  model.scale.setScalar(scaleVal);
  model.visible = false; // hidden until the user places it on a surface
  scene.add(model);

  const lift = () => (9 / 1000) * scaleVal;

  function placeOnSurface(matrix) {
    const cam = renderer.xr.getCamera();
    model.position.setFromMatrixPosition(matrix);
    surfaceY = model.position.y;
    model.position.y = surfaceY + lift();
    model.rotation.set(0, Math.atan2(cam.position.x - model.position.x, cam.position.z - model.position.z), 0);
    model.visible = true;
    placed = true;
    reticle.visible = false;
    hint.textContent = 'Tap anywhere to move the board.';
  }

  function placeInFront() {
    const cam = renderer.xr.getCamera();
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
    model.position.copy(cam.position).addScaledVector(forward, 0.8);
    model.position.y = Math.max(model.position.y - 0.15, 0.02) + lift();
    surfaceY = model.position.y - lift();
    model.rotation.set(0, Math.atan2(forward.x, forward.z), 0);
    model.visible = true;
    placed = true;
    reticle.visible = false;
    hint.textContent = 'Tap anywhere to move the board.';
  }

  function tryPlace() {
    if (reticle.visible) placeOnSurface(reticle.matrix);
    else if (placed) placeInFront();
  }
  const onOverlayTap = (e) => {
    if (e.target.closest('button')) return;
    tryPlace();
  };

  const sessionInit = {
    optionalFeatures: ['hit-test', 'local-floor', 'dom-overlay', 'light-estimation'],
    domOverlay: { root: overlay },
  };

  let autoTimer = null;

  function onSessionEnd() {
    clearTimeout(autoTimer);
    clearInterval(timer);
    session.removeEventListener('select', tryPlace);
    overlay.removeEventListener('click', onOverlayTap);
    cleanupRenderer(renderer);
    if (!xrDisposed) {
      xrDisposed = true;
      xrLight.dispose();
    }
    if (stopped) return;
    stopped = true;
    close();
  }

  try {
    session = await navigator.xr.requestSession('immersive-ar', sessionInit);
    await renderer.xr.setSession(session);

    // dom-overlay shows our DOM over the passthrough camera, so the dark
    // page background must not block the real world.
    overlay.style.background = 'transparent';
    stage.style.display = 'none';
    hint.textContent = 'Aim your phone at a flat surface, then tap to place the board.';

    session.addEventListener('select', tryPlace);
    overlay.addEventListener('click', onOverlayTap);

    const viewer = await session.requestReferenceSpace('viewer');
    try {
      hitSource = await session.requestHitTestSource({ space: viewer });
    } catch (err) {
      hitSource = null;
    }

    if (!hitSource) {
      hint.textContent = 'No surface detection - the board appears in front of you. Tap to move it.';
    }

    autoTimer = setTimeout(() => {
      if (stopped || placed) return;
      placeInFront();
      hint.textContent = 'Tap anywhere to move the board.';
    }, 3500);

    session.addEventListener('end', onSessionEnd);
  } catch (err) {
    clearInterval(timer);
    hint.textContent = 'AR not available on this device - switching to gyro view.';
    overlay.style.background = '';
    stage.style.display = 'block';
    cleanupRenderer(renderer);
    if (!xrDisposed) {
      xrDisposed = true;
      xrLight.dispose();
    }
    return startGyro({ overlay, stage, model, hint });
  }

  const stop = () => {
    if (stopped) return;
    stopped = true;
    clearInterval(timer);
    if (session && session.end) session.end().catch(() => {});
    cleanupRenderer(renderer);
    if (!xrDisposed) {
      xrDisposed = true;
      xrLight.dispose();
    }
  };

  renderer.setAnimationLoop((time, frame) => {
    if (frame && hitSource && !placed) {
      const results = frame.getHitTestResults(hitSource);
      if (results && results.length) {
        const pose = results[0].getPose(renderer.xr.getReferenceSpace());
        if (pose) {
          reticle.visible = true;
          reticle.matrix.fromArray(pose.transform.matrix);
        } else {
          reticle.visible = false;
        }
      }
    }
    renderer.render(scene, camera);
  });

  return {
    mode: 'xr',
    resize(delta) {
      const next = THREE.MathUtils.clamp(scaleVal + delta, MODELS.minScale, MODELS.maxScale);
      if (next === scaleVal) return;
      scaleVal = next;
      model.scale.setScalar(scaleVal);
      if (placed) model.position.y = surfaceY + lift();
    },
    stop,
  };
}

/* ------------------------------------------------------------------ *
 * Gyro "magic window" path (iPhone / no WebXR)
 * ------------------------------------------------------------------ */

async function requestGyroPermission() {
  const DEO = window.DeviceOrientationEvent;
  if (DEO && typeof DEO.requestPermission === 'function') {
    try {
      return (await DEO.requestPermission()) === 'granted';
    } catch (err) {
      return false;
    }
  }
  return true;
}

function startGyro({ overlay, stage, model, hint }) {
  stage.style.display = 'block';
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const w = overlay.clientWidth || window.innerWidth;
  const h = overlay.clientHeight || window.innerHeight;
  renderer.setSize(w, h);
  stage.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0d14);
  scene.add(new THREE.GridHelper(1200, 24, 0x2c3a52, 0x1a2332));
  scene.add(new THREE.AmbientLight(0xffffff, 1.5));
  const dir = new THREE.DirectionalLight(0xffffff, 1.2);
  dir.position.set(200, 400, 300);
  scene.add(dir);
  scene.add(new THREE.HemisphereLight(0xbfd0ff, 0x20242c, 0.6));

  let scaleVal = MODELS.gyroScale;
  model.scale.setScalar(scaleVal);
  model.visible = true;
  model.position.set(0, 9 * scaleVal, 0); // board bottom sits exactly on the grid
  scene.add(model);

  const camera = new THREE.PerspectiveCamera(70, w / h, 1, 6000);
  let yaw = Math.PI / 6;
  let pitch = 0.12;
  let gyroActive = false;
  let baseAlpha = null;
  let baseBeta = null;

  function updateCamera() {
    const R = 460 * scaleVal;
    const target = new THREE.Vector3(0, 40 * scaleVal, 0);
    camera.position.set(
      R * Math.cos(pitch) * Math.sin(yaw),
      target.y + R * Math.sin(pitch),
      R * Math.cos(pitch) * Math.cos(yaw)
    );
    camera.lookAt(target);
  }

  function onOrientation(e) {
    if (e.alpha == null || e.beta == null) return;
    if (baseAlpha === null) {
      baseAlpha = e.alpha;
      baseBeta = e.beta;
      return;
    }
    gyroActive = true;
    yaw = Math.PI / 6 - THREE.MathUtils.degToRad(e.alpha - baseAlpha);
    pitch = THREE.MathUtils.clamp(0.12 + THREE.MathUtils.degToRad(e.beta - baseBeta), -1.2, 1.2);
    updateCamera();
  }
  window.addEventListener('deviceorientation', onOrientation);

  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  function onDown(e) {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
  }
  function onMove(e) {
    if (!dragging) return;
    yaw -= (e.clientX - lastX) * 0.005;
    pitch = THREE.MathUtils.clamp(pitch + (e.clientY - lastY) * 0.005, -1.2, 1.2);
    lastX = e.clientX;
    lastY = e.clientY;
    updateCamera();
  }
  function onUp() {
    dragging = false;
  }
  renderer.domElement.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);

  function onResize() {
    const nw = overlay.clientWidth || window.innerWidth;
    const nh = overlay.clientHeight || window.innerHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  }
  window.addEventListener('resize', onResize);

  const timer = setInterval(() => model.userData.advance(), MODELS.cycleMs);
  updateCamera();

  const stop = () => {
    clearInterval(timer);
    window.removeEventListener('deviceorientation', onOrientation);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    renderer.domElement.removeEventListener('pointerdown', onDown);
    cleanupRenderer(renderer);
  };

  renderer.setAnimationLoop(() => {
    if (!dragging && !gyroActive) {
      yaw += 0.0018; // gentle auto-rotate while the user is not interacting
      updateCamera();
    }
    renderer.render(scene, camera);
  });

  return {
    mode: 'gyro',
    resize(delta) {
      const next = THREE.MathUtils.clamp(scaleVal + delta, MODELS.minScale, MODELS.maxScale);
      if (next === scaleVal) return;
      scaleVal = next;
      model.scale.setScalar(scaleVal);
      model.position.y = 9 * scaleVal;
      updateCamera();
    },
    stop,
  };
}

/* ------------------------------------------------------------------ *
 * Public entry point
 * ------------------------------------------------------------------ */

async function isXRSupported() {
  if (typeof navigator === 'undefined' || !('xr' in navigator)) return false;
  try {
    const result = await Promise.race([
      navigator.xr.isSessionSupported('immersive-ar'),
      new Promise((resolve) => setTimeout(() => resolve(false), 2500)),
    ]);
    return result === true;
  } catch (err) {
    return false;
  }
}

export async function launchExperiment1AR() {
  if (typeof document === 'undefined' || overlay) return;

  ensureStyles();
  overlay = buildOverlay();
  const stage = overlay.querySelector('#vetArStage');
  const hint = overlay.querySelector('#vetArHint');
  const model = buildExperiment1Group();

  overlay.querySelector('#vetArClose').addEventListener('click', close);
  overlay.querySelector('#vetArMinus').addEventListener('click', () => ctx && ctx.resize(-0.5));
  overlay.querySelector('#vetArPlus').addEventListener('click', () => ctx && ctx.resize(0.5));

  // iOS must see the permission prompt inside the user gesture, before awaits.
  await requestGyroPermission();

  if (await isXRSupported()) {
    hint.textContent = 'Starting AR...';
    ctx = await startXR({ overlay, stage, model, hint });
  } else {
    hint.textContent = 'Move your phone to look around - or drag to rotate';
    ctx = startGyro({ overlay, stage, model, hint });
  }
}
