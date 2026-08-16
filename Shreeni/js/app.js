/**
 * Main Application Orchestrator & UI Handler
 * Connects User Interactions, Circuit Solver, Breadboard Canvas, and Gamification Engine.
 */
class AppManager {
  constructor() {
    this.simulation = new SimulationEngine();
    this.breadboard = new BreadboardEngine('workbench-canvas', 'workbench-container');
    this.gamification = new GamificationEngine();

    window.appEngine = this;
  }

  init() {
    this.breadboard.resizeCanvas();
    this.gamification.setMode('4x1_MUX');

    // Place default 74153 IC on breadboard DIP slot for instant interactivity
    this.breadboard.placeIC('74153', 25);

    this.bindUIEvents();
    this.stepSimulation();
  }

  stepSimulation() {
    // 1. Solve voltage propagation & logic nets
    this.simulation.evaluateCircuit(
      this.breadboard.wires,
      this.breadboard.placedICs,
      (union) => this.breadboard.getBreadboardHoleNet(union)
    );

    // 2. Evaluate Gamification & Truth Table checklist
    this.gamification.evaluateTruthTable(this.simulation, this.breadboard);

    // 3. Render Canvas
    this.breadboard.requestRender();
  }

  bindUIEvents() {
    // 1. Power Supply Switch Toggle
    const pwrBtn = document.getElementById('btn-power');
    if (pwrBtn) {
      pwrBtn.addEventListener('click', () => {
        const isOn = !this.simulation.powerOn;
        this.simulation.setPower(isOn);
        pwrBtn.classList.toggle('active', isOn);
        pwrBtn.innerHTML = isOn ? '⚡ POWER: ON' : '⭕ POWER: OFF';
        if (window.soundFx) window.soundFx.playSwitch();
        this.stepSimulation();
      });
    }

    // 2. Audio Toggle Button
    const audioBtn = document.getElementById('btn-audio');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const enabled = window.soundFx.toggleSound();
        audioBtn.innerHTML = enabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
      });
    }

    // 3. Mode Tabs Switcher (4x1 MUX, 8x1 MUX, Challenge, Sandbox)
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');

        const mode = e.target.dataset.mode;
        this.gamification.setMode(mode);

        // Place default appropriate IC chip for selected mode
        if (mode === '4x1_MUX') {
          this.breadboard.placeIC('74153', 25);
        } else if (mode === '8x1_MUX' || mode === 'CHALLENGE') {
          this.breadboard.placeIC('74151', 25);
        }

        if (window.soundFx) window.soundFx.playClick();
        this.stepSimulation();
      });
    });

    // 4. IC Drawer Click / Drag Placement
    document.querySelectorAll('.ic-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const chipType = e.currentTarget.dataset.chip;
        this.breadboard.setDraggedIC(chipType);
        if (window.soundFx) window.soundFx.playClick();
      });

      btn.addEventListener('dragstart', (e) => {
        const chipType = e.currentTarget.dataset.chip;
        e.dataTransfer.setData('text/plain', chipType);
        this.breadboard.setDraggedIC(chipType);
      });
    });

    // Allow dropping IC directly on canvas container
    const container = document.getElementById('workbench-container');
    if (container) {
      container.addEventListener('dragover', (e) => e.preventDefault());
      container.addEventListener('drop', (e) => {
        e.preventDefault();
        const chipType = e.dataTransfer.getData('text/plain') || this.breadboard.draggedICType;
        if (chipType) {
          const rect = this.breadboard.canvas.getBoundingClientRect();
          const dropX = e.clientX - rect.left;
          const col = this.breadboard.getColFromX(dropX);
          if (col >= 1 && col <= this.breadboard.cols - 8) {
            this.breadboard.placeIC(chipType, col);
          }
          this.breadboard.setDraggedIC(null);
        }
      });
    }

    // 5. Wire Color Palette Selection
    document.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        e.target.classList.add('active');
        const color = e.target.dataset.color;
        this.breadboard.setWireColor(color);
        this.breadboard.setProbeMode(false);
      });
    });

    // 6. Action Tools: Logic Probe, Clear Wires, Auto-Wire Preset
    const probeBtn = document.getElementById('btn-probe');
    if (probeBtn) {
      probeBtn.addEventListener('click', () => {
        const active = !this.breadboard.probeActive;
        this.breadboard.setProbeMode(active);
        probeBtn.classList.toggle('active', active);
        probeBtn.innerHTML = active ? '🔍 Probe: ACTIVE' : '🔍 Logic Probe';
      });
    }

    const clearWiresBtn = document.getElementById('btn-clear-wires');
    if (clearWiresBtn) {
      clearWiresBtn.addEventListener('click', () => {
        this.breadboard.clearWires();
      });
    }

    const autoWireBtn = document.getElementById('btn-auto-wire');
    if (autoWireBtn) {
      autoWireBtn.addEventListener('click', () => {
        this.applyAutoWirePreset();
      });
    }

    // 7. Modals: Datasheet popup
    const dsBtn = document.getElementById('btn-datasheet');
    const dsModal = document.getElementById('modal-datasheet');
    const closeDs = document.getElementById('close-datasheet');

    if (dsBtn && dsModal) {
      dsBtn.addEventListener('click', () => {
        this.updateDatasheetModal();
        dsModal.classList.add('open');
      });
    }
    if (closeDs && dsModal) {
      closeDs.addEventListener('click', () => dsModal.classList.remove('open'));
    }

    // 8. Trainer Switch Clicks
    this.breadboard.canvas.addEventListener('click', (e) => {
      const rect = this.breadboard.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      this.handleTrainerSwitchClicks(clickX, clickY);
    });
  }

  handleTrainerSwitchClicks(x, y) {
    const pwrY = 15 + 50;
    const swY = pwrY + 25;

    // Check Data Input Switches (I0 to I7)
    const swX = 220;
    for (let i = 0; i < 8; i++) {
      const posX = swX + i * 40;
      if (Math.abs(x - posX) < 18 && Math.abs(y - swY) < 24) {
        const swKey = `I${i}`;
        const curVal = this.simulation.trainerSwitches[swKey];
        this.simulation.setSwitch(swKey, curVal ? 0 : 1);
        if (window.soundFx) window.soundFx.playSwitch();
        this.stepSimulation();
        return;
      }
    }

    // Check Select Switches (S0, S1, S2, E_BAR)
    const selX = 580;
    const selSwitches = ['S0', 'S1', 'S2', 'E_BAR'];
    selSwitches.forEach((key, idx) => {
      const posX = selX + idx * 45;
      if (Math.abs(x - posX) < 18 && Math.abs(y - swY) < 24) {
        const curVal = this.simulation.trainerSwitches[key];
        this.simulation.setSwitch(key, curVal ? 0 : 1);
        if (window.soundFx) window.soundFx.playSwitch();
        this.stepSimulation();
        return;
      }
    });
  }

  applyAutoWirePreset() {
    this.breadboard.clearWires();
    const mode = this.gamification.currentMode;

    if (mode === '4x1_MUX') {
      this.breadboard.placeIC('74153', 25);
      const ic = this.breadboard.placedICs[0];

      // VCC & GND & Strobe
      this.breadboard.addWire({ type: 'trainer', id: 'VCC' }, { type: 'ic', id: ic.id, pin: 16 }, '#ef4444');
      this.breadboard.addWire({ type: 'trainer', id: 'GND' }, { type: 'ic', id: ic.id, pin: 8 }, '#3b82f6');
      this.breadboard.addWire({ type: 'trainer', id: 'GND' }, { type: 'ic', id: ic.id, pin: 1 }, '#3b82f6');

      // Selects
      this.breadboard.addWire({ type: 'trainer', id: 'S0' }, { type: 'ic', id: ic.id, pin: 14 }, '#f59e0b');
      this.breadboard.addWire({ type: 'trainer', id: 'S1' }, { type: 'ic', id: ic.id, pin: 2 }, '#f59e0b');

      // Data Inputs
      this.breadboard.addWire({ type: 'trainer', id: 'I0' }, { type: 'ic', id: ic.id, pin: 6 }, '#10b981');
      this.breadboard.addWire({ type: 'trainer', id: 'I1' }, { type: 'ic', id: ic.id, pin: 5 }, '#10b981');
      this.breadboard.addWire({ type: 'trainer', id: 'I2' }, { type: 'ic', id: ic.id, pin: 4 }, '#10b981');
      this.breadboard.addWire({ type: 'trainer', id: 'I3' }, { type: 'ic', id: ic.id, pin: 3 }, '#10b981');

      // Output Y1
      this.breadboard.addWire({ type: 'ic', id: ic.id, pin: 7 }, { type: 'trainer', id: 'Y1' }, '#a855f7');

      this.gamification.showNotification('⚡ Auto-Wired 4x1 Multiplexer (74153 IC) Setup!');

    } else if (mode === '8x1_MUX' || mode === 'CHALLENGE') {
      this.breadboard.placeIC('74151', 25);
      const ic = this.breadboard.placedICs[0];

      this.breadboard.addWire({ type: 'trainer', id: 'VCC' }, { type: 'ic', id: ic.id, pin: 16 }, '#ef4444');
      this.breadboard.addWire({ type: 'trainer', id: 'GND' }, { type: 'ic', id: ic.id, pin: 8 }, '#3b82f6');
      this.breadboard.addWire({ type: 'trainer', id: 'GND' }, { type: 'ic', id: ic.id, pin: 7 }, '#3b82f6');

      this.breadboard.addWire({ type: 'trainer', id: 'S0' }, { type: 'ic', id: ic.id, pin: 15 }, '#f59e0b');
      this.breadboard.addWire({ type: 'trainer', id: 'S1' }, { type: 'ic', id: ic.id, pin: 14 }, '#f59e0b');
      this.breadboard.addWire({ type: 'trainer', id: 'S2' }, { type: 'ic', id: ic.id, pin: 13 }, '#f59e0b');

      if (mode === '8x1_MUX') {
        const pinMap = [4, 3, 2, 1, 12, 11, 10, 9];
        pinMap.forEach((pin, i) => {
          this.breadboard.addWire({ type: 'trainer', id: `I${i}` }, { type: 'ic', id: ic.id, pin: pin }, '#10b981');
        });
      } else {
        const vccPins = [3, 1, 10, 9];
        const gndPins = [4, 2, 12, 11];
        vccPins.forEach(p => this.breadboard.addWire({ type: 'trainer', id: 'VCC' }, { type: 'ic', id: ic.id, pin: p }, '#ef4444'));
        gndPins.forEach(p => this.breadboard.addWire({ type: 'trainer', id: 'GND' }, { type: 'ic', id: ic.id, pin: p }, '#3b82f6'));
      }

      this.breadboard.addWire({ type: 'ic', id: ic.id, pin: 5 }, { type: 'trainer', id: 'Y1' }, '#a855f7');
      this.breadboard.addWire({ type: 'ic', id: ic.id, pin: 6 }, { type: 'trainer', id: 'Y1_BAR' }, '#ec4899');

      this.gamification.showNotification('⚡ Auto-Wired 8x1 Multiplexer (74151 IC) Setup!');
    }
  }

  updateDatasheetModal() {
    const mode = this.gamification.currentMode;
    const body = document.getElementById('datasheet-content');
    if (!body) return;

    if (mode === '4x1_MUX') {
      body.innerHTML = `
        <h3>74153 Dual 4-to-1 Multiplexer Datasheet</h3>
        <p>The 74153 contains two independent 4-to-1 multiplexers with common select inputs (A, B) and individual active-LOW strobe inputs (1Ḡ, 2Ḡ).</p>
        <div class="pinout-grid">
          <div><strong>Pin 1:</strong> 1Ḡ (Strobe 1)</div>
          <div><strong>Pin 2:</strong> B (Select 1 / S1)</div>
          <div><strong>Pin 3:</strong> 1I3 (Input 3)</div>
          <div><strong>Pin 4:</strong> 1I2 (Input 2)</div>
          <div><strong>Pin 5:</strong> 1I1 (Input 1)</div>
          <div><strong>Pin 6:</strong> 1I0 (Input 0)</div>
          <div><strong>Pin 7:</strong> 1Y (Output 1)</div>
          <div><strong>Pin 8:</strong> GND</div>
          <div><strong>Pin 9:</strong> 2Y (Output 2)</div>
          <div><strong>Pin 10:</strong> 2I0 (Input 0)</div>
          <div><strong>Pin 11:</strong> 2I1 (Input 1)</div>
          <div><strong>Pin 12:</strong> 2I2 (Input 2)</div>
          <div><strong>Pin 13:</strong> 2I3 (Input 3)</div>
          <div><strong>Pin 14:</strong> A (Select 0 / S0)</div>
          <div><strong>Pin 15:</strong> 2Ḡ (Strobe 2)</div>
          <div><strong>Pin 16:</strong> VCC (+5V)</div>
        </div>
        <h4>Boolean Logic Equation:</h4>
        <code>1Y = 1Ḡ' · (1I0·B'A' + 1I1·B'A + 1I2·BA' + 1I3·BA)</code>
      `;
    } else {
      body.innerHTML = `
        <h3>74151 8-to-1 Multiplexer Datasheet</h3>
        <p>The 74151 selects one of eight binary data sources under control of 3 Select inputs (A, B, C) and an active-LOW Enable input (Ē). Provides complementary outputs Y and W (Ȳ).</p>
        <div class="pinout-grid">
          <div><strong>Pin 1:</strong> D3</div><div><strong>Pin 2:</strong> D2</div>
          <div><strong>Pin 3:</strong> D1</div><div><strong>Pin 4:</strong> D0</div>
          <div><strong>Pin 5:</strong> Y (Output)</div><div><strong>Pin 6:</strong> W (Ȳ Output)</div>
          <div><strong>Pin 7:</strong> Ē (Enable)</div><div><strong>Pin 8:</strong> GND</div>
          <div><strong>Pin 9:</strong> D7</div><div><strong>Pin 10:</strong> D6</div>
          <div><strong>Pin 11:</strong> D5</div><div><strong>Pin 12:</strong> D4</div>
          <div><strong>Pin 13:</strong> C (Select 2 / S2)</div><div><strong>Pin 14:</strong> B (Select 1 / S1)</div>
          <div><strong>Pin 15:</strong> A (Select 0 / S0)</div><div><strong>Pin 16:</strong> VCC (+5V)</div>
        </div>
        <h4>Boolean Logic Equation:</h4>
        <code>Y = Ē' · ∑ (D_k · m_k)</code>
      `;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new AppManager();
  app.init();
});
