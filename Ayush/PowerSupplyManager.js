/**
 * PowerSupplyManager.js
 *
 * Owns the power supply connection state and the connect / disconnect rules:
 *   - a wire can only attach to a valid hole
 *   - the + and - wires can never share a hole
 *   - connecting the same terminal to its current hole disconnects it
 * Exposes last() / undoLast() / clear() so the Undo and Clear buttons work.
 */
import { PowerSupply } from './PowerSupply.js';

export class PowerSupplyManager {
  /**
   * @param {Set<string>} [validHoleIds] ids accepted as wire endpoints
   */
  constructor(validHoleIds = null) {
    this.validHoleIds = validHoleIds;
    this.supply = new PowerSupply({ id: 'PS1', voltage: 5 });
    this._order = [];   // connection order: 'positive' | 'negative'
  }

  get positive() {
    return this.supply.positive;
  }

  get negative() {
    return this.supply.negative;
  }

  _validateHole(holeId) {
    if (!holeId || typeof holeId !== 'string') {
      throw new Error('Power supply wire needs a valid hole.');
    }
    if (this.validHoleIds && !this.validHoleIds.has(holeId)) {
      throw new Error(`Invalid hole: ${holeId}.`);
    }
  }

  /**
   * Connect (or disconnect) a terminal's wire to a hole.
   * Connecting a terminal to the hole it is already on disconnects it.
   * @returns {{ terminal: string, holeId: string|null, connected: boolean, action: string }}
   */
  connect(terminal, holeId) {
    this._validateHole(holeId);
    const t = this[terminal];
    const other = terminal === 'positive' ? this.negative : this.positive;

    if (t.connected && t.holeId === holeId) {
      this.disconnect(terminal);
      return { terminal, holeId: null, connected: false, action: 'disconnect' };
    }
    if (other.connected && other.holeId === holeId) {
      throw new Error(`Cannot connect + and - to the same hole (${holeId}).`);
    }

    t.connected = true;
    t.holeId = holeId;
    this._order = this._order.filter((x) => x !== terminal);
    this._order.push(terminal);
    return { terminal, holeId, connected: true, action: 'connect' };
  }

  /** Disconnect one terminal's wire. Returns true if it was connected. */
  disconnect(terminal) {
    const t = this[terminal];
    if (!t.connected) return false;
    t.connected = false;
    t.holeId = null;
    this._order = this._order.filter((x) => x !== terminal);
    return true;
  }

  /** The most recently connected terminal (for "undo last step"), or null. */
  last() {
    if (!this._order.length) return null;
    const terminal = this._order[this._order.length - 1];
    return { terminal, holeId: this[terminal].holeId };
  }

  /** Undo the most recent connection (disconnect it). */
  undoLast() {
    const last = this.last();
    if (!last) return null;
    this.disconnect(last.terminal);
    return last;
  }

  /** Disconnect both wires. */
  clear() {
    this.disconnect('positive');
    this.disconnect('negative');
  }

  /**
   * Headless self-review of the connect / disconnect rules.
   */
  static validate() {
    const checks = [];
    const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

    const ids = new Set(['A1', 'A2', 'B3', 'F18', 'J63', 'PT5', 'BN60']);
    const manager = new PowerSupplyManager(ids);

    add('Starts fully disconnected', !manager.positive.connected && !manager.negative.connected);

    const pos = manager.connect('positive', 'A1');
    add('Positive wire connects to a hole', pos.connected && manager.positive.holeId === 'A1', `A1`);

    const neg = manager.connect('negative', 'B3');
    add('Negative wire connects to a hole', neg.connected && manager.negative.holeId === 'B3', `B3`);
    add('Both wires tracked independently', manager.positive.holeId === 'A1' && manager.negative.holeId === 'B3');

    let sameBlocked = false;
    try {
      manager.connect('positive', 'B3');
    } catch (error) {
      sameBlocked = error.message.includes('same hole');
    }
    add('+ and - cannot share a hole', sameBlocked);

    let invalidBlocked = false;
    try {
      manager.connect('negative', 'ZZ99');
    } catch (error) {
      invalidBlocked = error.message.includes('Invalid hole');
    }
    add('Invalid holes rejected', invalidBlocked);

    add('Last connection tracked (undo)', manager.last() !== null && manager.last().terminal === 'negative');

    manager.undoLast();
    add('Undo disconnects the last wire', !manager.negative.connected && manager.positive.connected);

    const again = manager.connect('positive', 'A1');
    add('Clicking the connected hole disconnects it', again.action === 'disconnect' && !manager.positive.connected);

    manager.connect('positive', 'F18');
    manager.clear();
    add('Whole reset disconnects both wires', !manager.positive.connected && !manager.negative.connected);

    return checks;
  }
}
