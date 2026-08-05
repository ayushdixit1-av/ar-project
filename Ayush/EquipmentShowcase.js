/**
 * EquipmentShowcase.js
 *
 * "Equipments" gallery: a full-width grid of rotating, labeled 3D models for
 * every IC part the lab supports plus the power supply, switch, LED and
 * resistor. A single WebGL canvas renders one item per grid cell using
 * scissor/viewport subdivision, so only one renderer/context is needed.
 *
 * Purely additive: runs only when a DOM is present (initEquipment()) and
 * never touches the lab or the scroll-driven showcase.
 */
import * as THREE from 'three';

const FOV = 38;
const FILL = 0.55;
const SPACING = 1000;
const CAM_ELEV = 0.42;
const SPEED = 0.8;

const metal = (hex, rough = 0.4) =>
  new THREE.MeshStandardMaterial({ color: hex, roughness: rough, metalness: 0.7 });
const plastic = (hex, rough = 0.55) =>
  new THREE.MeshStandardMaterial({ color: hex, roughness: rough, metalness: 0.05 });

function makeBodyLabel(text, width) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#f5f5f5';
  ctx.font = '700 46px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -2,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, 3.75), mat);
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
}

function buildDIP(numPins, labelText) {
  const g = new THREE.Group();
  const pinsPerSide = numPins / 2;
  const span = (pinsPerSide - 1) * 2.54; // 15.24 for 14-pin, 17.78 for 16-pin
  const bodyLen = span + 4.6;
  const bodyW = 6.35;
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(bodyLen, 3.2, bodyW),
    plastic(0x1b1e26, 0.42)
  );
  body.position.set(span / 2, 2.2, bodyW / 2);
  g.add(body);

  const pinGeo = new THREE.BoxGeometry(0.6, 5.6, 0.6);
  const pinMat = metal(0xb8bdc6, 0.35);
  for (let i = 0; i < pinsPerSide; i++) {
    const x = i * 2.54;
    const lp = new THREE.Mesh(pinGeo, pinMat);
    lp.position.set(x, 1.15, 0);
    g.add(lp);
    const rp = new THREE.Mesh(pinGeo, pinMat);
    rp.position.set(x, 1.15, bodyW + 1.27);
    g.add(rp);
  }

  const notch = new THREE.Mesh(new THREE.CircleGeometry(0.7, 16), plastic(0xf8f8f6));
  notch.rotation.x = -Math.PI / 2;
  notch.position.set(0.4, 3.9, bodyW / 2);
  g.add(notch);

  const label = makeBodyLabel(labelText, 11);
  label.position.set(span / 2, 3.82, bodyW / 2);
  g.add(label);
  return g;
}

function buildPowerSupply() {
  const g = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(24, 12, 15), plastic(0x2a3139, 0.5));
  box.position.set(0, 6, 0);
  g.add(box);

  const led = new THREE.Mesh(new THREE.SphereGeometry(1.1, 12, 10), plastic(0x34c759, 0.4));
  led.position.set(6, 12.6, 0);
  g.add(led);

  const wireGeo = new THREE.CylinderGeometry(0.7, 0.7, 7, 8);
  const black = new THREE.Mesh(wireGeo, plastic(0x2f343b));
  black.rotation.x = Math.PI / 2;
  black.position.set(-3, 2.5, -11);
  g.add(black);
  const red = new THREE.Mesh(wireGeo, plastic(0xe53935));
  red.rotation.x = Math.PI / 2;
  red.position.set(3, 2.5, -11);
  g.add(red);

  const front = makeBodyLabel('5V DC', 12);
  front.rotation.x = 0;
  front.rotation.y = Math.PI;
  front.position.set(0, 6, -7.55);
  g.add(front);
  return g;
}

function buildSwitch() {
  const g = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(8, 5, 6), plastic(0x31383f));
  box.position.set(0, 2.9, 1.27);
  g.add(box);

  const lever = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.55, 6, 8),
    metal(0xe8eaed, 0.3)
  );
  lever.position.set(0, 6.6, 1.27);
  lever.rotation.z = 0.45;
  g.add(lever);

  const legGeo = new THREE.CylinderGeometry(0.28, 0.28, 6, 8);
  const legMat = metal(0xcdd1d8, 0.35);
  for (const z of [0, 2.54]) {
    const l = new THREE.Mesh(legGeo, legMat);
    l.position.set(0, 0.6, z);
    g.add(l);
  }
  return g;
}

function buildLED(colorHex) {
  const g = new THREE.Group();
  const c = new THREE.Color(colorHex);
  const mat = new THREE.MeshStandardMaterial({
    color: c,
    roughness: 0.25,
    metalness: 0.05,
    emissive: c,
    emissiveIntensity: 0.25,
  });

  const bodyCx = 1.27;
  const dome = new THREE.Mesh(new THREE.SphereGeometry(2.3, 20, 16), mat);
  dome.position.set(0, 4.6, bodyCx);
  const cyl = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.3, 3.2, 20), mat);
  cyl.position.set(0, 3.1, bodyCx);
  g.add(cyl, dome);

  const legGeo = new THREE.CylinderGeometry(0.28, 0.28, 6, 8);
  const legMat = metal(0xcdd1d8, 0.35);
  for (const z of [0, 2.54]) {
    const l = new THREE.Mesh(legGeo, legMat);
    l.position.set(0, 0.6, z);
    g.add(l);
  }
  return g;
}

function buildResistor() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(1.4, 1.4, 5.5, 16),
    plastic(0xdbc8a3)
  );
  body.rotation.x = Math.PI / 2;
  body.position.set(0, 2.6, 1.27);
  g.add(body);

  const capMat = plastic(0x7a6350);
  const capGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.9, 16);
  for (const z of [-0.7, 3.24]) {
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.rotation.x = Math.PI / 2;
    cap.position.set(0, 2.6, z);
    g.add(cap);
  }

  const bandGeo = new THREE.TorusGeometry(1.42, 0.14, 8, 16);
  const bandColors = [0xff8f00, 0xff8f00, 0x6d4c41, 0xf2c14e];
  bandColors.forEach((hex, i) => {
    const band = new THREE.Mesh(bandGeo, plastic(hex, 0.7));
    band.position.set(0, 2.6, -0.5 + i * 0.42);
    g.add(band);
  });

  const legGeo = new THREE.CylinderGeometry(0.28, 0.28, 5, 8);
  const legMat = metal(0xcdd1d8, 0.35);
  for (const z of [0, 2.54]) {
    const l = new THREE.Mesh(legGeo, legMat);
    l.position.set(0, 1.4, z);
    g.add(l);
  }
  return g;
}

const ITEMS = [
  { name: 'IC 7400 — Quad NAND', build: () => buildDIP(14, '7400') },
  { name: 'IC 7402 — Quad NOR', build: () => buildDIP(14, '7402') },
  { name: 'IC 7404 — Hex Inverter', build: () => buildDIP(14, '7404') },
  { name: 'IC 7408 — Quad AND', build: () => buildDIP(14, '7408') },
  { name: 'IC 7411 — Triple AND', build: () => buildDIP(14, '7411') },
  { name: 'IC 7432 — Quad OR', build: () => buildDIP(14, '7432') },
  { name: 'IC 7486 — Quad XOR', build: () => buildDIP(14, '7486') },
  { name: 'IC 74151 — 8:1 MUX', build: () => buildDIP(16, '74151') },
  { name: '5V Power Supply', build: buildPowerSupply },
  { name: 'SPST Toggle Switch', build: buildSwitch },
  { name: 'LED Indicator', build: () => buildLED(0xff3b30) },
  { name: 'Resistor 330Ω', build: buildResistor },
];

export function initEquipment() {
  if (typeof document === 'undefined') return;
  const stage = document.getElementById('equipmentStage');
  const canvas = document.getElementById('equipmentCanvas');
  const labelLayer = document.getElementById('equipmentLabels');
  const backdropLayer = document.getElementById('equipmentBackdrop');
  if (!stage || !canvas || !labelLayer || !backdropLayer) return;

  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff, 1.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.0);
  key.position.set(120, 220, 180);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x7db4ff, 0.8);
  fill.position.set(-140, 80, -120);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffb37d, 0.5);
  rim.position.set(-80, 60, 200);
  scene.add(rim);

  const camera = new THREE.PerspectiveCamera(FOV, 1, 1, 6000);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.autoClear = false;

  const items = ITEMS.map((spec, i) => {
    const holder = new THREE.Group();
    const spin = new THREE.Group();
    spin.add(spec.build());
    holder.add(spin);
    holder.position.x = i * SPACING;
    scene.add(holder);

    const box = new THREE.Box3().setFromObject(spin);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const radius = Math.max(size.x, size.y, size.z) / 2;
    const halfTan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const axisDist = Math.hypot(CAM_ELEV, 1);

    const el = document.createElement('div');
    el.className = 'e-label';
    el.textContent = spec.name;
    labelLayer.appendChild(el);

    return {
      spec,
      holder,
      spin,
      center,
      fitDist: radius / (axisDist * halfTan * FILL),
      speed: SPEED,
      el,
    };
  });

  const cells = [];
  let stageW = 0;
  let stageH = 0;
  const backdrops = [];

  function relayout() {
    const w = stage.clientWidth || window.innerWidth;
    const cols = w >= 1400 ? 6 : w >= 1000 ? 5 : w >= 720 ? 4 : w >= 480 ? 3 : 2;
    const rows = Math.ceil(ITEMS.length / cols);
    const cellH = 175;
    const gapX = 14;
    const gapY = 62;
    const padTop = 20;
    const padBottom = 26;
    const cellW = (w - (cols - 1) * gapX) / cols;

    stageW = w;
    stageH = padTop + rows * cellH + (rows - 1) * gapY + padBottom;
    stage.style.height = `${stageH}px`;
    renderer.setSize(w, stageH, false);
    renderer.setClearColor(0x000000, 0);

    cells.length = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        if (idx >= items.length) break;
        cells[idx] = {
          x: c * (cellW + gapX),
          y: padTop + r * (cellH + gapY),
          w: cellW,
          h: cellH,
        };
      }
    }

    items.forEach((item, i) => {
      const cell = cells[i];
      let bd = backdrops[i];
      if (!bd) {
        bd = document.createElement('div');
        bd.className = 'e-backdrop';
        backdropLayer.appendChild(bd);
        backdrops[i] = bd;
      }
      bd.style.left = `${cell.x}px`;
      bd.style.top = `${cell.y}px`;
      bd.style.width = `${cell.w}px`;
      bd.style.height = `${cell.h}px`;
      item.el.style.left = `${cell.x + cell.w / 2}px`;
      item.el.style.top = `${cell.y + cell.h + 4}px`;
    });
  }
  window.addEventListener('resize', relayout);
  relayout();

  function tick() {
    requestAnimationFrame(tick);
    const landing = document.getElementById('landingPage');
    if (landing && landing.style.display === 'none') return;

    const t = performance.now() * 0.001;
    for (const item of items) item.spin.rotation.y = t * item.speed;

    renderer.setScissorTest(false);
    renderer.setViewport(0, 0, stageW, stageH);
    renderer.clear(true, true, true);

    renderer.setScissorTest(true);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const cell = cells[i];
      const aspect = cell.w / cell.h;
      const lim = aspect >= 1 ? 1 : aspect;
      const dist = item.fitDist / lim;

      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      camera.position.set(
        i * SPACING,
        item.center.y + dist * CAM_ELEV,
        dist
      );
      camera.lookAt(i * SPACING, item.center.y, 0);

      const glY = stageH - (cell.y + cell.h);
      renderer.setViewport(cell.x, glY, cell.w, cell.h);
      renderer.setScissor(cell.x, glY, cell.w, cell.h);
      renderer.render(scene, camera);
    }
  }
  tick();

  return { renderer, scene, camera, items };
}
