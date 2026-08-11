/**
 * PowerSupply.js
 *
 * A bench power supply connected to the breadboard by two wires. Pure data
 * model - no rendering, no simulation.
 *
 * {
 *   id:       "PS1",
 *   voltage:  5,
 *   positive: { connected, holeId },  // red wire
 *   negative: { connected, holeId }   // black wire
 * }
 */
export class PowerSupply {
  constructor({ id, voltage = 5 }) {
    this.id = id;
    this.voltage = voltage;
    this.positive = { connected: false, holeId: null };
    this.negative = { connected: false, holeId: null };
  }

  toJSON() {
    return {
      id: this.id,
      voltage: this.voltage,
      positive: { ...this.positive },
      negative: { ...this.negative },
    };
  }
}
