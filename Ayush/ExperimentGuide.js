/**
 * ExperimentGuide.js
 *
 * A sliding drawer that turns a placed IC into an exact, step-by-step lab
 * procedure (the prompt.md experiment) using REAL hole names:
 *   - equipment checklist
 *   - numbered steps with exact wire endpoints (e.g. "PT2 -> F10")
 *   - a wiring summary table
 *
 * `buildGuide(ic)` is pure data (headless-testable); the panel class renders
 * it in the browser and re-renders as the circuit changes.
 */
import { GateCatalog } from './GateCatalog.js';
import { ICManager } from './ICManager.js';
import { WireManager } from './WireManager.js';
import { LEDManager } from './LEDManager.js';
import { PowerSupplyManager } from './PowerSupplyManager.js';
import { Hole } from './Hole.js';

const SUPPLY = Object.freeze({ plus: 'PT1', minus: 'TN1' });
const RAIL_HIGH = 'PT';   // +5 V rail (use any PT / BP hole)
const RAIL_LOW = 'TN';    // 0 V rail (use any TN / BN hole)
// Suggested free rail columns for the patch cords (avoid the supply pair).
const HIGH_COL = 2, LOW_COL = 2, IN_HIGH_COL = 3, IN_LOW_COL = 3, LED_GND_COL = 4;

export class ExperimentGuide {
  /**
   * Pure data generation for one placed IC. Returns the full guide object.
   */
  static buildGuide(ic) {
    const info = GateCatalog.info(ic.name);
    if (!info) return null;

    const hole = (pin) => {
      const p = ic.pins.find((x) => x.pin === pin);
      return p ? `${p.row}${p.column}` : null;
    };
    const colOf = (holeId) => (holeId ? holeId.replace(/^[A-Z]+/, '') : null);

    const gate = info.gates[0];
    const vccHole = hole(info.vcc);
    const gndHole = hole(info.gnd);
    const outHole = hole(gate.outputs[0]);
    const outCol = colOf(outHole);

    const inputSteps = gate.truth.map((v, i) => {
      const gi = gate.vars.indexOf(v);
      const pin = gate.inputs[gi];
      const h = hole(pin);
      return {
        variable: v,
        pin,
        hole: h,
        highWire: `${RAIL_HIGH}${IN_HIGH_COL} -> ${h}`,
        lowWire: `${RAIL_LOW}${IN_LOW_COL} -> ${h}`,
      };
    });

    const wires = [
      { name: 'Power + (red)', path: `${SUPPLY.plus} (red + wire)` },
      { name: 'Power - (black)', path: `${SUPPLY.minus} (black - wire)` },
      { name: `Vcc (pin ${info.vcc})`, path: `${RAIL_HIGH}${HIGH_COL} -> ${vccHole}` },
      { name: `GND (pin ${info.gnd})`, path: `${RAIL_LOW}${LOW_COL} -> ${gndHole}` },
    ];
    for (const s of inputSteps) {
      wires.push({ name: `${s.variable} high (pin ${s.pin})`, path: s.highWire });
      wires.push({ name: `${s.variable} low (pin ${s.pin})`, path: s.lowWire });
    }
    if (outCol) wires.push({ name: 'LED (anode->cathode)', path: `B${outCol} -> ${RAIL_LOW}${LED_GND_COL}` });

    const equipment = [
      { name: 'Breadboard', note: '630 terminal + 252 rail holes' },
      { name: `IC ${ic.name}`, note: info.name },
      { name: 'Bench power supply', note: '5 V DC - red + wire, black - wire' },
      { name: 'Jumper wires / patch cords', note: 'Wire tool (any colour)' },
      { name: '5 mm LED', note: 'one for the output' },
      { name: 'Truth Table panel', note: 'toggle inputs + verify output' },
    ];

    const steps = [
      {
        title: `Place the ${ic.name} IC`,
        detail: `IC tool, part ${ic.name}. Click on the ${ic.position.row} side so pin 1 lands at ${ic.position.row}${ic.position.column} (columns ${ic.position.column}..${ic.position.column + Math.floor(ic.pins.length / 2) - 1}).`,
      },
      {
        title: 'Connect the power supply',
        detail: `Power tool: red + wire to ${SUPPLY.plus}, black - wire to ${SUPPLY.minus}.`,
      },
      {
        title: `Wire Vcc (pin ${info.vcc})`,
        detail: `Wire ${RAIL_HIGH}${HIGH_COL} -> ${vccHole}. The ${RAIL_HIGH} rail is now +5 V.`,
      },
      {
        title: `Wire GND (pin ${info.gnd})`,
        detail: `Wire ${RAIL_LOW}${LOW_COL} -> ${gndHole}. The ${RAIL_LOW} rail is now 0 V.`,
      },
      ...inputSteps.map((s) => ({
        title: `Drive input ${s.variable} (pin ${s.pin})`,
        detail:
          `Option 1 (quick): in the Truth Table panel click "${s.variable}" to cycle 1 / 0 / off. ` +
          `Option 2 (physical): wire ${s.highWire} for HIGH, or ${s.lowWire} for LOW - rewire to flip.`,
      })),
      {
        title: `Observe the output (pin ${gate.outputs[0]})`,
        detail:
          outCol
            ? `Place the LED with anode on B${outCol} (same column bus as pin ${gate.outputs[0]}, hole ${outHole}) and cathode on ${RAIL_LOW}${LED_GND_COL}. The LED lights when ${(gate.outLabels || ['Y'])[0]} = 1.`
            : `Place the LED with its anode on the column of pin ${gate.outputs[0]} and cathode on a GND rail hole.`,
      },
      {
        title: 'Verify with the truth table',
        detail: `Open Truth Table, select ${ic.id} / ${gate.label}, toggle the inputs, and check each row against the LED + Y badge.`,
      },
    ];

    return {
      ic,
      part: ic.name,
      label: info.name,
      power: SUPPLY,
      anodeHole: outCol ? `B${outCol}` : null,
      outHole,
      vccHole,
      gndHole,
      inputSteps,
      wires,
      equipment,
      steps,
    };
  }

  /**
   * Headless self-review of the guide generator.
   */
  static validate() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    // Small synthetic board.
    const holeIds = new Set();
    const holes = [];
    for (let c = 1; c <= 40; c++) {
      for (const row of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']) {
        holes.push(new Hole({ id: `${row}${c}`, row, column: c, position: { x: 0, y: 0, z: 0 } }));
        holeIds.add(`${row}${c}`);
      }
    }
    for (const rail of ['PT', 'TN', 'BP', 'BN']) {
      for (let c = 1; c <= 40; c++) {
        holes.push(new Hole({ id: `${rail}${c}`, row: rail, column: c, position: { x: 0, y: 0, z: 0 } }));
        holeIds.add(`${rail}${c}`);
      }
    }

    const manager = new ICManager();
    const ic = manager.place({ holes, startRow: 'E', startColumn: 10, orientation: 'NORMAL', part: '7408' });
    const guide = this.buildGuide(ic);

    add('Guide generated for 7408', !!guide && guide.part === '7408');
    add('6 equipment items', guide.equipment.length === 6, String(guide.equipment.length));
    add('Vcc hole = pin 14 (F10)', guide.vccHole === 'F10', guide.vccHole);
    add('GND hole = pin 7 (E16)', guide.gndHole === 'E16', guide.gndHole);
    add('Output hole = pin 3 (E12)', guide.outHole === 'E12', guide.outHole);
    add('Input A hole = pin 1 (E10)', guide.inputSteps[0].hole === 'E10', guide.inputSteps[0].hole);
    add('Input B hole = pin 2 (E11)', guide.inputSteps[1].hole === 'E11', guide.inputSteps[1].hole);
    add('LED anode on output column bus', guide.anodeHole === 'B12', guide.anodeHole);
    add('Wiring summary lists every named wire', guide.wires.length >= 6, String(guide.wires.length));
    add('Supply uses + PT / - TN', guide.power.plus === 'PT1' && guide.power.minus === 'TN1');
    add('Steps numbered 1..7', guide.steps.length >= 7, String(guide.steps.length));
    add('Wires all point at valid holes', guide.wires.every((w) => !w.path.includes('null')));

    const notIc = manager.place({ holes, startRow: 'E', startColumn: 20, orientation: 'NORMAL', part: '7404' });
    const notGuide = this.buildGuide(notIc);
    add('NOT guide has a single input step', notGuide.inputSteps.length === 1, String(notGuide.inputSteps.length));
    add('NOT truth variable is A', notGuide.inputSteps[0].variable === 'A');

    const mux = manager.place({ holes, startRow: 'E', startColumn: 30, orientation: 'NORMAL', part: '74151' });
    const muxGuide = this.buildGuide(mux);
    add('MUX guide covers the 3 selects', muxGuide.inputSteps.length === 3, String(muxGuide.inputSteps.length));
    add('MUX GND hole = pin 8', muxGuide.gndHole === 'E37', muxGuide.gndHole);
    add('MUX Vcc hole = pin 16', muxGuide.vccHole === 'F30', muxGuide.vccHole);

    return checks;
  }
}

/**
 * Browser drawer. Requires DOM elements:
 *   #guidePanel, #guideBtn, #guideClose, #guideIc, #guidePower,
 *   #guideEquipment, #guideSteps, #guideWires
 */
export class ExperimentGuidePanel {
  constructor({ simulator, onStatus }) {
    this.simulator = simulator;
    this.onStatus = onStatus || (() => {});

    this.root = document.getElementById('guidePanel');
    this.icSelect = document.getElementById('guideIc');
    this.powerEl = document.getElementById('guidePower');
    this.equipmentEl = document.getElementById('guideEquipment');
    this.stepsEl = document.getElementById('guideSteps');
    this.wiresEl = document.getElementById('guideWires');
    this.openBtn = document.getElementById('guideBtn');
    this.closeBtn = document.getElementById('guideClose');

    this.selectedIcId = null;
    this._lastSig = '';

    this.openBtn.addEventListener('click', () => this.root.classList.add('open'));
    this.closeBtn.addEventListener('click', () => this.root.classList.remove('open'));
    this.icSelect.addEventListener('change', () => {
      this.selectedIcId = this.icSelect.value;
      this.render();
    });
  }

  selectedIc() {
    return this.simulator.ics.find((ic) => ic.id === this.selectedIcId) || null;
  }

  refresh() {
    const ics = this.simulator.ics;
    const sig = ics.map((ic) => ic.id).join(',');
    if (sig !== this._lastSig) {
      this._lastSig = sig;
      const previous = this.selectedIcId;
      this.icSelect.innerHTML = '';
      if (!ics.length) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = 'Place an IC first';
        this.icSelect.appendChild(opt);
      } else {
        for (const ic of ics) {
          const info = GateCatalog.info(ic.name);
          const opt = document.createElement('option');
          opt.value = ic.id;
          opt.textContent = `${ic.id} — ${ic.name}${info ? ' (' + info.name + ')' : ''}`;
          this.icSelect.appendChild(opt);
        }
      }
      this.selectedIcId =
        previous && ics.some((ic) => ic.id === previous) ? previous : (ics[0] ? ics[0].id : '');
    }
    this.render();
  }

  render() {
    const ic = this.selectedIc();
    if (!ic) {
      this.equipmentEl.innerHTML = '';
      this.stepsEl.innerHTML = '';
      this.wiresEl.innerHTML = '';
      this.powerEl.textContent = 'Place an IC to get its exact procedure.';
      this.powerEl.dataset.kind = 'info';
      return;
    }

    const guide = ExperimentGuide.buildGuide(ic);
    const entry = this.simulator.snapshot
      ? this.simulator.snapshot.ics.find((e) => e.ic.id === ic.id)
      : null;
    const powered = entry ? entry.powered : false;

    this.powerEl.textContent = powered
      ? `Power: Vcc (pin ${GateCatalog.info(ic.name).vcc} @ ${guide.vccHole}) and GND (pin ${GateCatalog.info(ic.name).gnd} @ ${guide.gndHole}) connected - ready.`
      : `Power: connect Vcc pin ${GateCatalog.info(ic.name).vcc} (${guide.vccHole}) to +5 V and GND pin ${GateCatalog.info(ic.name).gnd} (${guide.gndHole}) to 0 V first.`;
    this.powerEl.dataset.kind = powered ? 'success' : 'error';

    this.equipmentEl.innerHTML = '';
    for (const item of guide.equipment) {
      const li = document.createElement('li');
      li.textContent = `${item.name} — ${item.note}`;
      this.equipmentEl.appendChild(li);
    }

    this.stepsEl.innerHTML = '';
    guide.steps.forEach((step, i) => {
      const li = document.createElement('li');
      const title = document.createElement('div');
      title.className = 'guide-step-title';
      title.textContent = `Step ${i + 1}: ${step.title}`;
      const detail = document.createElement('div');
      detail.className = 'guide-step-detail';
      detail.textContent = step.detail;
      li.appendChild(title);
      li.appendChild(detail);
      this.stepsEl.appendChild(li);
    });

    this.wiresEl.innerHTML = '';
    for (const w of guide.wires) {
      const li = document.createElement('li');
      li.textContent = `${w.name}: ${w.path}`;
      this.wiresEl.appendChild(li);
    }
  }
}
