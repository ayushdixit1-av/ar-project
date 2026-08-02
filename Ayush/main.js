/**
 * main.js
 *
 * Entry point: generates the hole field, auto-verifies it, builds the
 * Three.js visualization (one gray sphere per hole, r = 0.4 mm), and
 * wires up the DIP-14 IC placement toolbar.
 *
 * Runs headlessly in Node (logic + sphere field only) and in the browser
 * (adds a WebGL viewer + IC placement mode when a DOM is present).
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ARButton } from 'three/addons/webxr/ARButton.js';

import { BreadboardConfig } from './BreadboardConfig.js';
import { BreadboardBody } from './BreadboardBody.js';
import { HoleGenerator } from './HoleGenerator.js';
import { LabelGenerator } from './LabelGenerator.js';
import { PowerRailGenerator } from './PowerRailGenerator.js';
import { Validator } from './Validator.js';
import { IC } from './IC.js';
import { ICManager } from './ICManager.js';
import { ICPreview } from './ICPreview.js';
import { ICValidator } from './ICValidator.js';
import { ICPlacementTool } from './ICPlacementTool.js';
import { WireManager } from './WireManager.js';
import { WireRenderer } from './WireRenderer.js';
import { WirePlacementTool } from './WirePlacementTool.js';
import { LEDManager } from './LEDManager.js';
import { LEDRenderer } from './LEDRenderer.js';
import { LEDPlacementTool } from './LEDPlacementTool.js';
import { PowerSupplyManager } from './PowerSupplyManager.js';
import { PowerSupplyRenderer } from './PowerSupplyRenderer.js';
import { PowerSupplyTool } from './PowerSupplyTool.js';

export function buildSphereField(holes) {
  const group = new THREE.Group();
  const geometry = new THREE.SphereGeometry(
    BreadboardConfig.hole.sphereRadius,
    16,
    12
  );

  for (const hole of holes) {
    // One material per mesh so individual holes can be dimmed after use.
    const material = new THREE.MeshStandardMaterial({
      color: BreadboardConfig.hole.sphereColor,
      roughness: 0.8,
      metalness: 0.1,
    });
    const sphere = new THREE.Mesh(geometry, material);
    // Map board X/Y (flat) onto three.js X/Z, keeping Y up.
    sphere.position.set(hole.position.x, hole.position.z, hole.position.y);
    sphere.name = hole.id;
    group.add(sphere);
  }
  return group;
}

function attachViewer(group) {
  if (typeof document === 'undefined') {
    console.log('[VIEWER] Headless environment - WebGL viewer skipped.');
    return null;
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x3a414c);
  scene.add(group);
  scene.add(new THREE.AmbientLight(0xffffff, 1.6));
  scene.add(new THREE.DirectionalLight(0xffffff, 1.2, { position: (0, 1, 1) }));

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
  );
  camera.position.set(0, 220, 320);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.target.set(0, 0, 0);
  controls.update();

  renderer.setAnimationLoop(() => {
    if (!renderer.xr.isPresenting) {
      controls.update();
    }
    renderer.render(scene, camera);
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { renderer, controls, scene, camera, group };
}

function printReport(report, title) {
  const rule = '='.repeat(64);
  console.log(rule);
  console.log(title);
  console.log(rule);
  if (report.fixed) {
    console.log('[FIX] Invalid field detected - regenerated from canonical math.');
  }
  for (const check of report.checks) {
    const ok = check.pass !== undefined ? check.pass : check.ok;
    const status = ok ? 'PASS' : 'FAIL';
    const detail = check.detail ? `   (${check.detail})` : '';
    console.log(`[${status}] ${check.name}${detail}`);
  }
  console.log(rule);
  console.log('RESULT:', report.pass ? 'ALL CHECKS PASSED' : 'CHECKS FAILED');
  console.log(rule);
}

function showStatus(el, message, kind) {
  el.textContent = message;
  el.dataset.kind = kind;
}

function setupICPlacement(viewer, holes, field) {
  const { renderer, camera, scene } = viewer;
  const statusEl = document.getElementById('status');
  const icBtn = document.getElementById('icBtn');

  const preview = new ICPreview(scene);
  const manager = new ICManager();
  const tool = new ICPlacementTool({
    domElement: renderer.domElement,
    camera,
    scene,
    holes,
    preview,
    manager,
    onStatus: (message, kind) => showStatus(statusEl, message, kind),
    onModeChange: (active) => icBtn.classList.toggle('active', active),
  });

  for (const child of field.children) {
    tool.setHoleMesh(child.name, child);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') tool.cancel();
  });

  const partSelect = document.getElementById('icPartSelect');
  if (partSelect) {
    tool.setPart(partSelect.value);
    partSelect.addEventListener('change', () => tool.setPart(partSelect.value));
  }

  return tool;
}

function setupWireTool(viewer, field, allHoles, statusEl) {
  const { renderer, camera, scene } = viewer;
  const wireBtn = document.getElementById('wireBtn');
  const wireToolbar = document.getElementById('wireToolbar');

  const manager = new WireManager(new Set(allHoles.map((h) => h.id)));
  const tool = new WirePlacementTool({
    domElement: renderer.domElement,
    camera,
    scene,
    field,
    manager,
    colorToolbar: wireToolbar,
    onStatus: (message, kind) => showStatus(statusEl, message, kind),
    onModeChange: (active) => wireBtn.classList.toggle('active', active),
  });

  wireToolbar.addEventListener('click', (event) => {
    const swatch = event.target.closest('.swatch');
    if (!swatch) return;
    wireToolbar.querySelectorAll('.swatch').forEach((s) => s.classList.toggle('active', s === swatch));
    tool.setColor(swatch.dataset.color);
  });

  return { manager, tool };
}

function setupLEDTool(viewer, field, allHoles, statusEl) {
  const { renderer, camera, scene } = viewer;
  const ledBtn = document.getElementById('ledBtn');
  const ledToolbar = document.getElementById('ledToolbar');

  const manager = new LEDManager(new Set(allHoles.map((h) => h.id)));
  const tool = new LEDPlacementTool({
    domElement: renderer.domElement,
    camera,
    scene,
    field,
    manager,
    colorToolbar: ledToolbar,
    onStatus: (message, kind) => showStatus(statusEl, message, kind),
    onModeChange: (active) => ledBtn.classList.toggle('active', active),
  });

  ledToolbar.addEventListener('click', (event) => {
    const swatch = event.target.closest('.swatch');
    if (!swatch) return;
    ledToolbar.querySelectorAll('.swatch').forEach((s) => s.classList.toggle('active', s === swatch));
    tool.setColor(swatch.dataset.color);
  });

  return { manager, tool };
}

function setupPowerTool(viewer, field, allHoles, statusEl) {
  const { renderer, camera, scene } = viewer;
  const powerBtn = document.getElementById('powerBtn');

  const manager = new PowerSupplyManager(new Set(allHoles.map((h) => h.id)));
  const tool = new PowerSupplyTool({
    domElement: renderer.domElement,
    camera,
    scene,
    field,
    manager,
    onStatus: (message, kind) => showStatus(statusEl, message, kind),
    onModeChange: (active) => powerBtn.classList.toggle('active', active),
  });

  return { manager, tool };
}

function setupLabels(scene) {
  try {
    const group = LabelGenerator.build(scene);
    console.log(`[LABELS] Rendered ${group.children.length} label meshes.`);
    const statusEl = document.getElementById('status');
    if (statusEl) showStatus(statusEl, `Ready - ${group.children.length} labels rendered`, 'ok');
  } catch (error) {
    console.error('[LABELS] Failed to render labels:', error);
    const statusEl = document.getElementById('status');
    if (statusEl) showStatus(statusEl, `[LABELS] Error: ${error.message}`, 'error');
  }
}

function setupAR(viewer, boardContainer) {
  const { renderer, scene } = viewer;
  const arBtn = document.getElementById('arBtn');
  const statusEl = document.getElementById('status');

  if (!arBtn) return;

  if (typeof navigator !== 'undefined' && 'xr' in navigator) {
    navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
      if (supported) {
        const dummyARButton = ARButton.createButton(renderer, {
          optionalFeatures: ['dom-overlay'],
          domOverlay: { root: document.body }
        });
        dummyARButton.style.display = 'none';
        document.body.appendChild(dummyARButton);

        arBtn.addEventListener('click', () => {
          dummyARButton.click();
        });

        renderer.xr.addEventListener('sessionstart', () => {
          arBtn.classList.add('active');
          arBtn.textContent = '✕ Exit AR';
          scene.background = null;
          boardContainer.scale.set(0.001, 0.001, 0.001);
          boardContainer.position.set(0, -0.15, -0.4);
          if (statusEl) showStatus(statusEl, 'AR Session Active - View breadboard in real space', 'success');
        });

        renderer.xr.addEventListener('sessionend', () => {
          arBtn.classList.remove('active');
          arBtn.innerHTML = '✨ View in AR';
          scene.background = new THREE.Color(0x3a414c);
          boardContainer.scale.set(1, 1, 1);
          boardContainer.position.set(0, 0, 0);
          if (statusEl) showStatus(statusEl, 'Exited AR session', 'info');
        });
      } else {
        arBtn.addEventListener('click', () => {
          if (statusEl) showStatus(statusEl, 'WebXR AR is not supported on this device/browser (Try Chrome on Android with ARCore).', 'error');
        });
      }
    }).catch((err) => {
      arBtn.addEventListener('click', () => {
        if (statusEl) showStatus(statusEl, 'WebXR AR query error: ' + (err.message || err), 'error');
      });
    });
  } else {
    arBtn.addEventListener('click', () => {
      if (statusEl) showStatus(statusEl, 'WebXR is not supported by your browser.', 'error');
    });
  }
}

const holes = HoleGenerator.generate();
const report = Validator.validateAndFix(holes);
printReport(report, 'HOLE ENGINE VERIFICATION REPORT');

const power = PowerRailGenerator.validateAndFix();
printReport(power, 'POWER RAIL VERIFICATION REPORT');

const labelReport = LabelGenerator.validate();
printReport(labelReport, 'LABEL VERIFICATION REPORT');

const body = BreadboardBody.build();
const bodyReport = BreadboardBody.validate(body);
printReport(bodyReport, 'BREADBOARD BODY VERIFICATION REPORT');

const wireChecks = [...WireManager.validate(), ...WireRenderer.validate()];
printReport(
  { pass: wireChecks.every((c) => c.ok), checks: wireChecks },
  'WIRE SELF-REVIEW REPORT'
);

const icChecks = [...IC.validate(), ...ICValidator.checks(), ...ICManager.validate()];
printReport(
  { pass: icChecks.every((c) => c.ok), checks: icChecks },
  'IC SELF-REVIEW REPORT'
);

const ledChecks = [...LEDManager.validate(), ...LEDRenderer.validate()];
printReport(
  { pass: ledChecks.every((c) => c.ok), checks: ledChecks },
  'LED SELF-REVIEW REPORT'
);

const powerSupplyChecks = [...PowerSupplyManager.validate(), ...PowerSupplyRenderer.validate()];
printReport(
  { pass: powerSupplyChecks.every((c) => c.ok), checks: powerSupplyChecks },
  'POWER SUPPLY SELF-REVIEW REPORT'
);

const allHoles = [...holes, ...power.holes];
const field = buildSphereField(allHoles);

const boardContainer = new THREE.Group();
boardContainer.name = 'boardContainer';
boardContainer.add(field);
boardContainer.add(body);

console.log(
  `[OUTPUT] ${holes.length} terminal + ${power.holes.length} power-rail holes; ` +
  `sphere field contains ${field.children.length} meshes.`
);

const viewer = attachViewer(boardContainer);

let icTool = null;
let wireTool = null;
let ledTool = null;
let powerTool = null;
let lastActiveTool = null;
if (viewer) {
  const statusEl = document.getElementById('status');
  icTool = setupICPlacement(viewer, holes, field);
  setupLabels(boardContainer);
  setupAR(viewer, boardContainer);
  const wireSetup = setupWireTool(viewer, field, allHoles, statusEl);
  wireTool = wireSetup.tool;
  const ledSetup = setupLEDTool(viewer, field, allHoles, statusEl);
  ledTool = ledSetup.tool;
  const powerSetup = setupPowerTool(viewer, field, allHoles, statusEl);
  powerTool = powerSetup.tool;

  const icBtn = document.getElementById('icBtn');
  const wireBtn = document.getElementById('wireBtn');
  const ledBtn = document.getElementById('ledBtn');
  const powerBtn = document.getElementById('powerBtn');

  lastActiveTool = wireTool;

  function activePlacementTool() {
    if (icTool.isActive()) return icTool;
    if (wireTool.isActive()) return wireTool;
    if (ledTool.isActive()) return ledTool;
    if (powerTool.isActive()) return powerTool;
    return lastActiveTool || wireTool;
  }

  icBtn.addEventListener('click', () => {
    wireTool.deactivate();
    ledTool.deactivate();
    powerTool.deactivate();
    lastActiveTool = icTool;
    icTool.toggle();
  });
  wireBtn.addEventListener('click', () => {
    icTool.deactivate();
    ledTool.deactivate();
    powerTool.deactivate();
    lastActiveTool = wireTool;
    wireTool.toggle();
  });
  ledBtn.addEventListener('click', () => {
    icTool.deactivate();
    wireTool.deactivate();
    powerTool.deactivate();
    lastActiveTool = ledTool;
    ledTool.toggle();
  });
  powerBtn.addEventListener('click', () => {
    icTool.deactivate();
    wireTool.deactivate();
    ledTool.deactivate();
    lastActiveTool = powerTool;
    powerTool.toggle();
  });

  document.getElementById('undoBtn').addEventListener('click', () => activePlacementTool().undoLast());
  document.getElementById('clearBtn').addEventListener('click', () => activePlacementTool().resetAll());
}

export { holes, field, viewer, icTool, wireTool, ledTool, powerTool, body, boardContainer };
