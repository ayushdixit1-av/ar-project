/**
 * ProbePanel.js
 *
 * Browser readout for the logic probe. Shows the live state of the probed
 * hole (HIGH / LOW / CONFLICT / FLOATING) and recolors the probe marker to
 * match. refresh() is driven by the 200ms simulator loop.
 */
import { ProbeRenderer } from './ProbeRenderer.js';

function stateLabel(state) {
  if (state === 'H') return 'HIGH';
  if (state === 'L') return 'LOW';
  if (state === 'X') return 'CONFLICT';
  return 'FLOATING';
}

function stateClass(state) {
  if (state === 'H') return 'high';
  if (state === 'L') return 'low';
  if (state === 'X') return 'conflict';
  return 'float';
}

function stateDetail(state) {
  if (state === 'H') return '5 V — driven high';
  if (state === 'L') return '0 V — driven low';
  if (state === 'X') return 'driven high AND low (short)';
  return 'no driver — not connected';
}

export class ProbePanel {
  constructor({ simulator, probeManager }) {
    this.simulator = simulator;
    this.probeManager = probeManager;

    this.root = document.getElementById('probePanel');
    this.holeEl = document.getElementById('probeHole');
    this.stateEl = document.getElementById('probeState');
    this.detailEl = document.getElementById('probeDetail');
  }

  /** Refresh the readout from the latest simulator state. */
  refresh() {
    const probe = this.probeManager;
    if (!probe || !probe.active || !probe.holeId) {
      if (this.root) this.root.classList.remove('active');
      return;
    }
    if (!this.root) return;

    const state = this.simulator.stateOfHole(probe.holeId);
    this.root.classList.add('active');
    this.holeEl.textContent = probe.holeId;
    this.stateEl.textContent = stateLabel(state);
    this.stateEl.className = `probe-state ${stateClass(state)}`;
    this.detailEl.textContent = stateDetail(state);

    if (probe.marker) ProbeRenderer.setState(probe.marker, state);
  }

  /** Hide the panel entirely (e.g. leaving the lab). */
  hide() {
    if (this.root) this.root.classList.remove('active');
  }
}
