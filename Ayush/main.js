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
import { SwitchManager } from './SwitchManager.js';
import { SwitchRenderer } from './SwitchRenderer.js';
import { SwitchPlacementTool } from './SwitchPlacementTool.js';
import { ProbeManager } from './ProbeManager.js';
import { ProbeRenderer } from './ProbeRenderer.js';
import { ProbeTool } from './ProbeTool.js';
import { ProbePanel } from './ProbePanel.js';
import { GateCatalog } from './GateCatalog.js';
import { Simulator } from './Simulator.js';
import { TruthTablePanel } from './TruthTablePanel.js';
import { ExperimentGuide, ExperimentGuidePanel } from './ExperimentGuide.js';
import { initShowcase } from './BreadboardShowcase.js';
import { initEquipment } from './EquipmentShowcase.js';
import { launchExperiment1AR } from './ARMode.js';

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
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(0, 100, 100);
  scene.add(dirLight);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
  );
  camera.position.set(0, 110, 195);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  const canvasContainer = document.getElementById('canvasContainer');
  if (canvasContainer) {
    canvasContainer.appendChild(renderer.domElement);
  } else {
    document.body.appendChild(renderer.domElement);
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.target.set(0, 0, 0);
  controls.update();

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

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

function setupSwitchTool(viewer, field, allHoles, statusEl) {
  const { renderer, camera, scene } = viewer;
  const swBtn = document.getElementById('swBtn');

  const manager = new SwitchManager(new Set(allHoles.map((h) => h.id)));
  const tool = new SwitchPlacementTool({
    domElement: renderer.domElement,
    camera,
    scene,
    field,
    manager,
    onStatus: (message, kind) => showStatus(statusEl, message, kind),
    onModeChange: (active) => swBtn.classList.toggle('active', active),
  });

  return { manager, tool };
}

function setupProbeTool(viewer, field, allHoles, statusEl) {
  const { renderer, camera, scene } = viewer;
  const probeBtn = document.getElementById('probeBtn');

  const manager = new ProbeManager(new Set(allHoles.map((h) => h.id)));
  const tool = new ProbeTool({
    domElement: renderer.domElement,
    camera,
    scene,
    field,
    manager,
    onStatus: (message, kind) => showStatus(statusEl, message, kind),
    onModeChange: (active) => probeBtn.classList.toggle('active', active),
  });

  return { manager, tool };
}

function setupVideoModal() {
  const modal = document.getElementById('videoModal');
  const closeBtn = document.getElementById('videoClose');
  const watchBtn = document.getElementById('watchExp1Btn');
  const video = document.getElementById('expVideo');
  if (!modal || !closeBtn || !watchBtn || !video) return;

  watchBtn.addEventListener('click', () => {
    modal.classList.add('open');
    const promise = video.play();
    if (promise) promise.catch(() => {});
  });

  const close = () => {
    video.pause();
    modal.classList.remove('open');
  };
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });

  const speedButtons = modal.querySelectorAll('.video-controls button[data-speed]');
  for (const btn of speedButtons) {
    btn.addEventListener('click', () => {
      video.playbackRate = Number(btn.dataset.speed);
      for (const other of speedButtons) other.classList.toggle('active', other === btn);
    });
  }
}

function setupVideoHero() {
  const hero = document.getElementById('videoHero');
  const video = document.getElementById('heroVideo');
  const cta = document.getElementById('heroStartBtn');
  const expSection = document.getElementById('experiments');
  if (!hero || !video) return;

  const update = () => {
    const h = hero.offsetHeight || window.innerHeight;
    const y = Math.min(window.scrollY, h);
    const prog = h > 0 ? y / h : 0;
    video.style.transform =
      `translate3d(0, ${-y}px, 0) scale(${(1 + prog * 0.15).toFixed(4)})`;
    video.style.filter = `brightness(${(1 - prog * 0.22).toFixed(4)})`;
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  if (cta && expSection) {
    cta.addEventListener('click', () => {
      expSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

function setupLabels(scene) {  try {
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

const switchChecks = [...SwitchManager.validate(), ...SwitchRenderer.validate()];
printReport(
  { pass: switchChecks.every((c) => c.ok), checks: switchChecks },
  'SWITCH SELF-REVIEW REPORT'
);

const probeChecks = [...ProbeManager.validate(), ...ProbeRenderer.validate()];
printReport(
  { pass: probeChecks.every((c) => c.ok), checks: probeChecks },
  'PROBE SELF-REVIEW REPORT'
);

const gateChecks = GateCatalog.validate();
printReport(
  { pass: gateChecks.every((c) => c.ok), checks: gateChecks },
  'GATE CATALOG VERIFICATION REPORT'
);

const simChecks = Simulator.validate();
printReport(
  { pass: simChecks.every((c) => c.ok), checks: simChecks },
  'SIMULATOR SELF-REVIEW REPORT'
);

const guideChecks = ExperimentGuide.validate();
printReport(
  { pass: guideChecks.every((c) => c.ok), checks: guideChecks },
  'EXPERIMENT GUIDE VERIFICATION REPORT'
);

const allHoles = [...holes, ...power.holes];
const field = buildSphereField(allHoles);
console.log(
  `[OUTPUT] ${holes.length} terminal + ${power.holes.length} power-rail holes; ` +
  `sphere field contains ${field.children.length} meshes.`
);

const viewer = attachViewer(field);

if (typeof document !== 'undefined') {
  const landingPage = document.getElementById('landingPage');
  const labContainer = document.getElementById('labContainer');
  const startExp1 = document.getElementById('startExp1');
  const backToDashBtn = document.getElementById('backToDashBtn');

  setupVideoModal();
  setupVideoHero();
  initShowcase();
  initEquipment();

  const arExp1Btn = document.getElementById('arExp1Btn');
  if (arExp1Btn) arExp1Btn.addEventListener('click', launchExperiment1AR);

  if (landingPage && labContainer && startExp1 && backToDashBtn) {
    startExp1.addEventListener('click', () => {
      const modal = document.getElementById('videoModal');
      const video = document.getElementById('expVideo');
      if (modal && video) {
        video.pause();
        modal.classList.remove('open');
      }
      landingPage.style.display = 'none';
      labContainer.style.display = 'block';
      document.body.classList.add('in-lab');
      
      if (viewer && viewer.renderer && viewer.camera) {
        viewer.camera.aspect = window.innerWidth / window.innerHeight;
        viewer.camera.updateProjectionMatrix();
        viewer.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    });

    backToDashBtn.addEventListener('click', () => {
      labContainer.style.display = 'none';
      landingPage.style.display = 'flex';
      document.body.classList.remove('in-lab');
    });
  }
}

let icTool = null;
let wireTool = null;
let ledTool = null;
let powerTool = null;
let swTool = null;
let probeTool = null;
let lastActiveTool = null;
if (viewer) {
  const statusEl = document.getElementById('status');
  icTool = setupICPlacement(viewer, holes, field);
  setupLabels(viewer.scene);
  viewer.scene.add(body);
  const wireSetup = setupWireTool(viewer, field, allHoles, statusEl);
  wireTool = wireSetup.tool;
  const ledSetup = setupLEDTool(viewer, field, allHoles, statusEl);
  ledTool = ledSetup.tool;
  const powerSetup = setupPowerTool(viewer, field, allHoles, statusEl);
  powerTool = powerSetup.tool;
  const switchSetup = setupSwitchTool(viewer, field, allHoles, statusEl);
  swTool = switchSetup.tool;
  const probeSetup = setupProbeTool(viewer, field, allHoles, statusEl);
  probeTool = probeSetup.tool;

  const simulator = new Simulator({
    holes: allHoles,
    icManager: icTool.manager,
    wireManager: wireSetup.manager,
    ledManager: ledSetup.manager,
    powerManager: powerSetup.manager,
    switchManager: switchSetup.manager,
  });
  const probePanel = new ProbePanel({
    simulator,
    probeManager: probeSetup.manager,
  });
  const ttPanel = new TruthTablePanel({
    simulator,
    onStatus: (message, kind) => showStatus(statusEl, message, kind),
  });
  const guidePanel = new ExperimentGuidePanel({
    simulator,
    onStatus: (message, kind) => showStatus(statusEl, message, kind),
  });
  ttPanel.refresh();
  guidePanel.refresh();
  setInterval(() => {
    simulator.recompute();
    ttPanel.refresh();
    guidePanel.refresh();
    probePanel.refresh();
  }, 200);

  const icBtn = document.getElementById('icBtn');
  const wireBtn = document.getElementById('wireBtn');
  const ledBtn = document.getElementById('ledBtn');
  const powerBtn = document.getElementById('powerBtn');
  const swBtn = document.getElementById('swBtn');
  const probeBtn = document.getElementById('probeBtn');

  lastActiveTool = wireTool;

  function activePlacementTool() {
    if (icTool.isActive()) return icTool;
    if (wireTool.isActive()) return wireTool;
    if (ledTool.isActive()) return ledTool;
    if (powerTool.isActive()) return powerTool;
    if (swTool.isActive()) return swTool;
    if (probeTool.isActive()) return probeTool;
    return lastActiveTool || wireTool;
  }

  icBtn.addEventListener('click', () => {
    wireTool.deactivate();
    ledTool.deactivate();
    powerTool.deactivate();
    swTool.deactivate();
    probeTool.deactivate();
    lastActiveTool = icTool;
    icTool.toggle();
  });
  wireBtn.addEventListener('click', () => {
    icTool.deactivate();
    ledTool.deactivate();
    powerTool.deactivate();
    swTool.deactivate();
    probeTool.deactivate();
    lastActiveTool = wireTool;
    wireTool.toggle();
  });
  ledBtn.addEventListener('click', () => {
    icTool.deactivate();
    wireTool.deactivate();
    powerTool.deactivate();
    swTool.deactivate();
    probeTool.deactivate();
    lastActiveTool = ledTool;
    ledTool.toggle();
  });
  powerBtn.addEventListener('click', () => {
    icTool.deactivate();
    wireTool.deactivate();
    ledTool.deactivate();
    swTool.deactivate();
    probeTool.deactivate();
    lastActiveTool = powerTool;
    powerTool.toggle();
  });
  swBtn.addEventListener('click', () => {
    icTool.deactivate();
    wireTool.deactivate();
    ledTool.deactivate();
    powerTool.deactivate();
    probeTool.deactivate();
    lastActiveTool = swTool;
    swTool.toggle();
  });
  probeBtn.addEventListener('click', () => {
    icTool.deactivate();
    wireTool.deactivate();
    ledTool.deactivate();
    powerTool.deactivate();
    swTool.deactivate();
    lastActiveTool = probeTool;
    probeTool.toggle();
  });

  // Passive switch toggle: with no placement tool active, clicking a switch
  // body flips it open/closed (like a real lab switch).
  viewer.renderer.domElement.addEventListener('click', (event) => {
    if (activePlacementTool().isActive()) return;
    swTool.toggleAt(event);
  });

  document.getElementById('undoBtn').addEventListener('click', () => activePlacementTool().undoLast());
  document.getElementById('clearBtn').addEventListener('click', () => {
    icTool.resetAll();
    wireTool.resetAll();
    ledTool.resetAll();
    powerTool.resetAll();
    swTool.resetAll();
    probeTool.resetAll();
  });
}

export { holes, field, viewer, icTool, wireTool, ledTool, powerTool, swTool, probeTool, body };
