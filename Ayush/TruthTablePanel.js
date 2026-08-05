/**
 * TruthTablePanel.js
 *
 * Browser UI for running the prompt.md experiment: pick a placed IC + gate,
 * set the gate inputs with virtual HIGH/LOW switches, and verify against a
 * live truth table. The switches drive the actual input-pin nets in the
 * Simulator, so a real LED wired to the output hole glows along with it.
 */
import { GateCatalog } from './GateCatalog.js';

export class TruthTablePanel {
  constructor({ simulator, onStatus }) {
    this.simulator = simulator;
    this.onStatus = onStatus || (() => {});

    this.root = document.getElementById('ttPanel');
    this.icSelect = document.getElementById('ttIc');
    this.gateSelect = document.getElementById('ttGate');
    this.inputsEl = document.getElementById('ttInputs');
    this.outputEl = document.getElementById('ttOutput');
    this.tableEl = document.getElementById('ttTable');
    this.statusEl = document.getElementById('ttStatus');
    this.openBtn = document.getElementById('ttBtn');
    this.closeBtn = document.getElementById('ttClose');

    this.selectedIcId = null;
    this.gateId = null;
    this.varValues = {};   // var label -> 'H' | 'L' | null
    this._lastIcSig = '';

    this.openBtn.addEventListener('click', () => this.root.classList.add('open'));
    this.closeBtn.addEventListener('click', () => this.root.classList.remove('open'));
    this.icSelect.addEventListener('change', () => this.selectIc(this.icSelect.value));
    this.gateSelect.addEventListener('change', () => {
      this.gateId = this.gateSelect.value;
      this.varValues = {};
      this.update();
    });
  }

  icById() {
    const snap = this.simulator.snapshot;
    return snap ? snap.ics.find((entry) => entry.ic.id === this.selectedIcId) || null : null;
  }

  selectedIc() {
    const entry = this.icById();
    return entry ? entry.ic : null;
  }

  selectedGate() {
    const entry = this.icById();
    if (!entry) return null;
    const info = GateCatalog.info(entry.ic.name);
    return info ? info.gates.find((g) => g.id === this.gateId) || null : null;
  }

  pinToHole(ic, pin) {
    const p = ic.pins.find((x) => x.pin === pin);
    return p ? `${p.row}${p.column}` : null;
  }

  /** Rebuild the IC dropdown only when the placed-IC set actually changed. */
  refresh() {
    if (!this.simulator.snapshot) this.simulator.recompute();
    const ics = this.simulator.ics;
    const sig = ics.map((ic) => ic.id).join(',');
    if (sig !== this._lastIcSig) {
      this._lastIcSig = sig;
      this.populateIcs();
    }
    if (this.selectedIcId && !ics.some((ic) => ic.id === this.selectedIcId)) {
      this.selectIc(this.icSelect.value || '');
      return;
    }
    if (this.selectedIcId) this.render();
  }

  populateIcs() {
    const ics = this.simulator.ics;
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
    const keep = previous && ics.some((ic) => ic.id === previous) ? previous : (ics[0] ? ics[0].id : '');
    this.selectIc(keep);
  }

  selectIc(icId) {
    this.selectedIcId = icId;
    this.gateId = null;
    this.varValues = {};
    this.populateGates();
    this.update();
  }

  populateGates() {
    const ic = this.selectedIc();
    const info = ic ? GateCatalog.info(ic.name) : null;
    this.gateSelect.innerHTML = '';
    if (!info) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = 'No gate info';
      this.gateSelect.appendChild(opt);
      return;
    }
    for (const gate of info.gates) {
      const opt = document.createElement('option');
      opt.value = gate.id;
      opt.textContent = gate.label;
      this.gateSelect.appendChild(opt);
    }
    this.gateId = info.gates.length ? info.gates[0].id : null;
  }

  /** Apply the current toggle states to the simulator, re-solve, re-render. */
  update() {
    const ic = this.selectedIc();
    const gate = this.selectedGate();
    this.simulator.clearInputs();
    if (ic && gate) {
      for (let i = 0; i < gate.vars.length; i++) {
        const level = this.varValues[gate.vars[i]] || null;
        if (level) {
          const holeId = this.pinToHole(ic, gate.inputs[i]);
          if (holeId) this.simulator.setInput(holeId, level);
        }
      }
    }
    this.simulator.recompute();
    this.render();
  }

  render() {
    this.renderInputs();
    this.renderTable();
    this.renderOutput();
    this.renderStatus();
  }

  renderInputs() {
    this.inputsEl.innerHTML = '';
    const ic = this.selectedIc();
    const gate = this.selectedGate();
    if (!ic || !gate) return;

    for (let i = 0; i < gate.vars.length; i++) {
      const label = gate.vars[i];
      const value = this.varValues[label] || null;
      const chip = document.createElement('button');
      chip.className = 'tt-toggle';
      chip.dataset.kind = value || 'float';
      chip.textContent = `${label} = ${value === 'H' ? '1' : value === 'L' ? '0' : '·'}`;
      chip.title = `Pin ${gate.inputs[i]} (${this.pinToHole(ic, gate.inputs[i])}) - click to cycle 1 / 0 / off`;
      chip.addEventListener('click', () => {
        this.varValues[label] = value === 'H' ? 'L' : value === 'L' ? null : 'H';
        this.update();
        this.onStatus(`${ic.id} ${gate.label}: ${label} = ${this.varValues[label] === 'H' ? 1 : this.varValues[label] === 'L' ? 0 : 'floating'}`, 'info');
      });
      this.inputsEl.appendChild(chip);
    }
  }

  currentCombo(gate) {
    const combo = {};
    for (let i = 0; i < gate.vars.length; i++) {
      if (gate.truth.includes(gate.vars[i])) {
        combo[gate.inputs[i]] = this.varValues[gate.vars[i]] === 'H' ? 1 : 0;
      }
    }
    return combo;
  }

  renderTable() {
    this.tableEl.innerHTML = '';
    const ic = this.selectedIc();
    const gate = this.selectedGate();
    if (!ic || !gate) return;

    const outLabels = gate.outLabels || ['Y'];
    const head = document.createElement('tr');
    for (const v of gate.truth) {
      const th = document.createElement('th');
      th.textContent = v;
      head.appendChild(th);
    }
    for (const label of outLabels) {
      const th = document.createElement('th');
      th.textContent = `${label} (expected)`;
      head.appendChild(th);
    }
    const thead = document.createElement('thead');
    thead.appendChild(head);
    this.tableEl.appendChild(thead);

    const dataOverrides = {};
    for (let i = 0; i < gate.vars.length; i++) {
      if (!gate.truth.includes(gate.vars[i])) {
        dataOverrides[gate.inputs[i]] = this.varValues[gate.vars[i]] === 'H' ? 1 : 0;
      }
    }
    const rows = GateCatalog.truthRows(gate, dataOverrides);
    const combo = this.currentCombo(gate);

    const tbody = document.createElement('tbody');
    for (const row of rows) {
      const tr = document.createElement('tr');
      const varBits = {};
      for (let i = 0; i < gate.vars.length; i++) {
        if (gate.truth.includes(gate.vars[i])) varBits[gate.inputs[i]] = row.values[i];
      }
      const isCurrent =
        gate.truth.every((v, idx) => {
          const gi = gate.vars.findIndex((x) => x === v);
          return combo[gate.inputs[gi]] === row.values[gi];
        }) && Object.keys(combo).length > 0;

      if (isCurrent) tr.className = 'current';

      for (let i = 0; i < gate.vars.length; i++) {
        if (gate.truth.includes(gate.vars[i])) {
          const td = document.createElement('td');
          td.textContent = row.values[i];
          tr.appendChild(td);
        }
      }
      if (outLabels.length > 1) {
        for (const label of outLabels) {
          const td = document.createElement('td');
          td.textContent = row.expected && row.expected[label] !== undefined ? row.expected[label] : '–';
          tr.appendChild(td);
        }
      } else {
        const td = document.createElement('td');
        td.textContent = row.expected === null || row.expected === undefined ? '–' : row.expected;
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    this.tableEl.appendChild(tbody);
  }

  renderOutput() {
    this.outputEl.innerHTML = '';
    const entry = this.icById();
    const gate = this.selectedGate();
    if (!entry || !gate) return;

    const live = entry.gates.find((g) => g.id === gate.id);
    if (!live) return;
    const outLabels = live.outLabels || ['Y'];
    for (let i = 0; i < outLabels.length; i++) {
      const state = live.outputs[i];
      const badge = document.createElement('span');
      badge.className = `tt-badge ${state === 'H' ? 'on' : state === 'L' ? 'low' : state === 'X' ? 'conflict' : 'float'}`;
      badge.textContent = `${outLabels[i]} = ${state === 'H' ? '1' : state === 'L' ? '0' : state === 'X' ? 'X' : '–'}`;
      this.outputEl.appendChild(badge);
    }
  }

  renderStatus() {
    const ic = this.selectedIc();
    const gate = this.selectedGate();
    if (!ic) {
      this.statusEl.textContent = 'Place an IC, then wire pin GND + Vcc to power, and an LED to the output.';
      this.statusEl.dataset.kind = 'info';
      return;
    }
    const entry = this.icById();
    const info = GateCatalog.info(ic.name);
    const powered = entry && entry.powered;
    if (!powered) {
      this.statusEl.textContent = `Not powered. Connect pin ${info.gnd} (${this.pinToHole(ic, info.gnd)}) to GND and pin ${info.vcc} (${this.pinToHole(ic, info.vcc)}) to +5V via wires + the supply.`;
      this.statusEl.dataset.kind = 'error';
      return;
    }
    this.statusEl.textContent = `Powered. Toggle the inputs (or wire them to +5V / GND) and watch ${(gate.outLabels || ['Y']).join(' / ')}; an LED on the output hole lights when ${(gate.outLabels || ['Y'])[0]} = 1.`;
    this.statusEl.dataset.kind = 'success';
  }
}
