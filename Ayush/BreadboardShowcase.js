/**
 * BreadboardShowcase.js
 *
 * Scroll-driven 3D showcase of a realistic breadboard built from the SAME
 * canonical generators used by the lab (HoleGenerator / PowerRailGenerator /
 * BreadboardBody). A sticky full-screen stage pins the board while the user
 * scrolls; as scroll progress grows the components disintegrate (fly outward,
 * spin, rise) and each component's name fades in as an HTML label projected
 * from its 3D position.
 *
 * Purely additive: runs only when a DOM is present (initShowcase()), keeps the
 * lab untouched, and adds no new dependencies beyond the existing three.js.
 */
import * as THREE from 'three';

import { BreadboardConfig } from './BreadboardConfig.js';
import { BreadboardBody } from './BreadboardBody.js';
import { HoleGenerator } from './HoleGenerator.js';
import { PowerRailGenerator } from './PowerRailGenerator.js';

const HOLE_Y = 0.4;
const MODEL_SCALE = 1.8;
const FOV = 42;
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

function holePos(row, col) {
  const p = HoleGenerator.positionOf(row, col);
  return new THREE.Vector3(p.x, HOLE_Y, p.y);
}

function railPos(rail, col) {
  const x = HoleGenerator.columnPositions()[col - 1];
  const y = PowerRailGenerator.railYPositions()[rail];
  return new THREE.Vector3(x, HOLE_Y, y);
}

function makeHoleField() {
  const terminal = HoleGenerator.generate();
  const rails = PowerRailGenerator.generate();

  const geometry = new THREE.SphereGeometry(
    BreadboardConfig.hole.sphereRadius,
    8,
    6
  );
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.7,
    metalness: 0.15,
  });

  const mesh = new THREE.InstancedMesh(geometry, material, terminal.length + rails.length);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const TERMINAL = 0x9aa0a8;
  const RAIL_COLOR = { PT: 0xff5252, TN: 0x4d9fff, BP: 0xff5252, BN: 0x4d9fff };

  let i = 0;
  for (const h of terminal) {
    dummy.position.set(h.position.x, HOLE_Y, h.position.y);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    mesh.setColorAt(i, color.setHex(TERMINAL));
    i++;
  }
  for (const h of rails) {
    dummy.position.set(h.position.x, HOLE_Y, h.position.y);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    mesh.setColorAt(i, color.setHex(RAIL_COLOR[h.row] || TERMINAL));
    i++;
  }
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  return mesh;
}

const metal = (hex, rough = 0.4) =>
  new THREE.MeshStandardMaterial({ color: hex, roughness: rough, metalness: 0.7 });
const plastic = (hex, rough = 0.55) =>
  new THREE.MeshStandardMaterial({ color: hex, roughness: rough, metalness: 0.05 });

function buildIC7408() {
  const g = new THREE.Group();
  const body = plastic(0x15181e, 0.35);
  const pin = metal(0xb8bdc6, 0.35);

  const bodyMesh = new THREE.Mesh(new THREE.BoxGeometry(19.05, 3.2, 6.35), body);
  bodyMesh.position.set(7.62, 2.2, 3.81);
  g.add(bodyMesh);

  const pinGeo = new THREE.BoxGeometry(0.55, 5.4, 0.55);
  for (let i = 0; i < 7; i++) {
    const x = i * 2.54;
    const lp = new THREE.Mesh(pinGeo, pin);
    lp.position.set(x, 1.15, 0);
    g.add(lp);
    const rp = new THREE.Mesh(pinGeo, pin);
    rp.position.set(x, 1.15, 7.62);
    g.add(rp);
  }

  const notch = new THREE.Mesh(new THREE.CircleGeometry(0.7, 16), plastic(0xf8f8f6));
  notch.rotation.x = -Math.PI / 2;
  notch.position.set(0.4, 3.9, 3.81);
  g.add(notch);

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

  const dome = new THREE.Mesh(new THREE.SphereGeometry(2.3, 20, 16), mat);
  dome.position.set(0, 4.6, 0);
  const cyl = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.3, 3.2, 20), mat);
  cyl.position.set(0, 3.1, 0);
  g.add(cyl, dome);

  const leg = metal(0xcdd1d8, 0.35);
  const legGeo = new THREE.CylinderGeometry(0.28, 0.28, 6, 8);
  for (const z of [0, 2.54]) {
    const l = new THREE.Mesh(legGeo, leg);
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

  const leg = metal(0xcdd1d8, 0.35);
  const legGeo = new THREE.CylinderGeometry(0.28, 0.28, 5, 8);
  for (const z of [0, 2.54]) {
    const l = new THREE.Mesh(legGeo, leg);
    l.position.set(0, 1.4, z);
    g.add(l);
  }
  return g;
}

function buildJumper(p1, p2, colorHex) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dz = p2.z - p1.z;
  const ctrl = new THREE.Vector3(dx / 2, Math.max(dy, 0) + 9, dz / 2);
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0, 0),
    ctrl,
    new THREE.Vector3(dx, dy, dz)
  );
  return new THREE.Mesh(
    new THREE.TubeGeometry(curve, 24, 0.38, 8, false),
    plastic(colorHex, 0.55)
  );
}

function buildSwitch() {
  const g = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(8, 5, 6), plastic(0x232a2e));
  box.position.set(0, 2.9, 1.27);
  g.add(box);

  const lever = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.55, 6, 8),
    metal(0xe8eaed, 0.3)
  );
  lever.position.set(0, 6.6, 1.27);
  lever.rotation.z = 0.45;
  g.add(lever);

  const leg = metal(0xcdd1d8, 0.35);
  const legGeo = new THREE.CylinderGeometry(0.28, 0.28, 6, 8);
  for (const z of [0, 2.54]) {
    const l = new THREE.Mesh(legGeo, leg);
    l.position.set(0, 0.6, z);
    g.add(l);
  }
  return g;
}

function straightTube(a, b, radius, colorHex) {
  return new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.LineCurve3(a, b), 1, radius, 8, false),
    plastic(colorHex, 0.55)
  );
}

function buildPowerSupply(base) {
  const g = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(24, 12, 15), plastic(0x1f2429, 0.5));
  box.position.set(0, 8, 0);
  g.add(box);

  const led = new THREE.Mesh(new THREE.SphereGeometry(1.1, 12, 10), plastic(0x34c759, 0.4));
  led.position.set(6, 13.4, 0);
  g.add(led);

  const redTo = railPos('PT', 60).sub(base);
  const blackTo = railPos('TN', 60).sub(base);
  const from = new THREE.Vector3(0, 2.5, 0);
  g.add(straightTube(from, redTo, 0.7, 0xe53935));
  g.add(straightTube(from, blackTo, 0.7, 0x222222));
  return g;
}

export function initShowcase() {
  if (typeof document === 'undefined') return;
  const section = document.getElementById('showcase');
  const stage = document.getElementById('showcaseStage');
  const canvas = document.getElementById('showcaseCanvas');
  const labelLayer = document.getElementById('showcaseLabels');
  if (!section || !stage || !canvas || !labelLayer) return;

  const scene = new THREE.Scene();
  scene.background = null;

  scene.add(new THREE.AmbientLight(0xffffff, 1.05));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(120, 220, 180);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x7db4ff, 0.5);
  fill.position.set(-140, 80, -120);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffb37d, 0.35);
  rim.position.set(-80, 60, 200);
  scene.add(rim);

  const camera = new THREE.PerspectiveCamera(FOV, 1, 1, 8000);
  const baseLookAt = new THREE.Vector3();
  let fitNear = 300;
  let fitFar = 500;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const rig = new THREE.Group();
  rig.scale.setScalar(MODEL_SCALE);
  scene.add(rig);

  rig.add(BreadboardBody.build());
  rig.add(makeHoleField());

  function frameCamera() {
    const w = stage.clientWidth || window.innerWidth;
    const h = stage.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);

    const halfTan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const len = BreadboardConfig.board.length * MODEL_SCALE;
    const wid = BreadboardConfig.board.width * MODEL_SCALE;
    const FILL = 0.5;

    fitNear =
      Math.max(
        len / (2 * halfTan * camera.aspect),
        wid / (2 * halfTan)
      ) / FILL;

    let maxR = 0;
    let maxY = 0;
    for (const piece of pieces) {
      const exploded = piece.base.clone().add(piece.burst).multiplyScalar(MODEL_SCALE);
      maxR = Math.max(maxR, Math.hypot(exploded.x, exploded.z));
      maxY = Math.max(maxY, exploded.y + piece.labelLift * MODEL_SCALE);
    }
    fitFar =
      Math.max(
        maxR / (2 * halfTan * camera.aspect),
        maxY / (2 * halfTan)
      ) / FILL;
    fitFar = Math.max(fitFar, fitNear);

    baseLookAt.set(0, 4 * MODEL_SCALE, 0);
  }
  window.addEventListener('resize', frameCamera);

  const pieces = [];
  const makePiece = (name, base, meshBuilder, labelLift, burst) => {
    const group = new THREE.Group();
    const mesh = meshBuilder(base);
    group.add(mesh);
    group.position.copy(base);
    rig.add(group);

    if (!burst) {
      const radial = new THREE.Vector3(base.x, 0, base.z).normalize();
      burst = radial
        .multiplyScalar(65 + Math.random() * 25)
        .add(new THREE.Vector3(0, 75 + Math.random() * 55, 0));
    }

    const el = document.createElement('div');
    el.className = 's-label';
    el.textContent = name;
    labelLayer.appendChild(el);

    const piece = {
      group,
      base: base.clone(),
      burst,
      spin: new THREE.Euler(
        (Math.random() - 0.5) * 5.5,
        (Math.random() - 0.5) * 5.5,
        (Math.random() - 0.5) * 5.5
      ),
      labelAt: 0,
      labelLift: labelLift || 14,
      el,
    };
    pieces.push(piece);
    return piece;
  };

  const icBase = holePos('E', 20);
  const ledBase = holePos('A', 30);
  const resBase = holePos('C', 40);
  const swBase = holePos('G', 50);
  const j1 = holePos('E', 21);
  const j2 = holePos('B', 30);
  const jumperMid = new THREE.Vector3((j1.x + j2.x) / 2, (j1.y + j2.y) / 2, (j1.z + j2.z) / 2);
  const supplyBase = new THREE.Vector3(62, HOLE_Y, 0);

  const piecesSpec = [
    ['Breadboard — 882 tie points', new THREE.Vector3(0, 15, 0), () => new THREE.Group(), 0, 0.02, new THREE.Vector3(0, 0, 0)],
    ['5V Power Supply', supplyBase, buildPowerSupply, 30, 0.1],
    ['IC 7408 — Quad AND Gate', icBase, () => buildIC7408(), 20, 0.18],
    ['Jumper Wire', jumperMid, () => buildJumper(j1, j2, 0xff9800), 14, 0.24],
    ['SPST Toggle Switch', swBase, () => buildSwitch(), 20, 0.3],
    ['Resistor — 330 Ω', resBase, () => buildResistor(), 18, 0.36],
    ['LED Indicator', ledBase, () => buildLED(0xff3b30), 18, 0.42],
  ];

  piecesSpec.forEach(([name, base, builder, lift, labelAt, burst]) => {
    const piece = makePiece(name, base, builder, lift, burst);
    piece.labelAt = labelAt;
  });

  frameCamera();

  function getProgress() {
    const total = section.offsetHeight - window.innerHeight;
    if (total <= 0) return 1;
    return clamp01(-section.getBoundingClientRect().top / total);
  }

  function placeLabel(el, world) {
    const v = world.clone().project(camera);
    if (v.z > 1 || v.z < -1) {
      el.style.opacity = '0';
      return;
    }
    el.style.left = `${(v.x * 0.5 + 0.5) * renderer.domElement.clientWidth}px`;
    el.style.top = `${(-v.y * 0.5 + 0.5) * renderer.domElement.clientHeight}px`;
  }

  const worldPos = new THREE.Vector3();
  function tick() {
    requestAnimationFrame(tick);
    const landing = document.getElementById('landingPage');
    if (landing && landing.style.display === 'none') return;

    rig.rotation.y = Math.sin(performance.now() * 0.00012) * 0.1;

    const progress = getProgress();
    const p = easeOut(progress);

    const dist = fitNear + (fitFar - fitNear) * p;
    camera.position.set(0, dist * 0.5, dist * 0.98);
    camera.lookAt(baseLookAt.x, baseLookAt.y - p * 10, baseLookAt.z);

    for (const piece of pieces) {
      piece.group.position.copy(piece.base).addScaledVector(piece.burst, p);
      piece.group.rotation.set(
        piece.spin.x * p,
        piece.spin.y * p,
        piece.spin.z * p
      );

      const fade = clamp01((progress - piece.labelAt) / 0.28);
      piece.group.getWorldPosition(worldPos);
      worldPos.y += piece.labelLift * MODEL_SCALE;
      placeLabel(piece.el, worldPos);
      piece.el.style.opacity = String(
        piece.burst.lengthSq() === 0 ? 1 : fade
      );
      piece.el.classList.toggle(
        'visible',
        piece.burst.lengthSq() === 0 || fade > 0
      );
    }

    renderer.render(scene, camera);
  }
  tick();

  return { renderer, scene, camera, rig, pieces };
}
