/**
 * ProbeManager.js
 *
 * Owns the logic-probe measurement state: which hole is currently being
 * probed. A probe is a single measurement instrument (like a real multimeter
 * lead), so only one hole can be probed at a time.
 *
 * Pure data layer - the visual marker and the live readout panel are handled
 * by ProbeRenderer / ProbeTool / ProbePanel.
 */
export class ProbeManager {
  /**
   * @param {Set<string>} [validHoleIds] ids accepted as probe targets
   */
  constructor(validHoleIds = null) {
    this.validHoleIds = validHoleIds;
    this.holeId = null;      // currently probed hole id, or null
    this.marker = null;      // THREE.Mesh owned by the renderer
  }

  _validate(holeId) {
    if (!holeId || typeof holeId !== 'string') {
      throw new Error('Probe needs a valid hole.');
    }
    if (this.validHoleIds && !this.validHoleIds.has(holeId)) {
      throw new Error(`Invalid hole: ${holeId}.`);
    }
  }

  /**
   * Attach the probe to a hole. Re-probing the same hole is allowed (no-op).
   * @returns {string|null} the probed hole id, or null if cleared
   */
  setHole(holeId) {
    if (holeId === null || holeId === undefined) {
      this.holeId = null;
      return null;
    }
    this._validate(holeId);
    this.holeId = holeId;
    return holeId;
  }

  /** Detach the probe. Returns the hole that was probed, or null. */
  clear() {
    const prev = this.holeId;
    this.holeId = null;
    return prev;
  }

  /** True when a hole is currently being probed. */
  get active() {
    return this.holeId !== null;
  }

  /**
   * Headless self-review of the probe state rules.
   */
  static validate() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    const ids = new Set(['A1', 'A2', 'B3', 'F18', 'J63', 'PT5', 'BN60']);
    const manager = new ProbeManager(ids);

    add('Starts with no probe attached', !manager.active && manager.holeId === null);

    manager.setHole('A1');
    add('Probe attaches to a hole', manager.active && manager.holeId === 'A1', `A1`);

    manager.setHole('B3');
    add('Only one hole probed at a time', manager.holeId === 'B3', `B3`);

    let invalidBlocked = false;
    try {
      manager.setHole('ZZ99');
    } catch (error) {
      invalidBlocked = error.message.includes('Invalid hole');
    }
    add('Invalid holes rejected', invalidBlocked);

    const cleared = manager.setHole(null);
    add('setHole(null) clears the probe', cleared === null && !manager.active);

    manager.setHole('B3');
    const prev = manager.clear();
    add('clear() detaches the probe', !manager.active && prev === 'B3', `${prev}`);

    manager.setHole('PT5');
    add('Probe can be re-attached after clearing', manager.active && manager.holeId === 'PT5');

    return checks;
  }
}
