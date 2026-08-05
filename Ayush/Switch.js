/**
 * Switch.js
 *
 * One placed toggle switch on the breadboard. Pure data model.
 *
 * A switch is a 2-terminal (SPST) device:
 *   - terminal1 / terminal2  hole ids the leads sit in
 *   - `on === true`  -> the two terminals are shorted together
 *   - `on === false` -> the two terminals are open (no connection)
 *
 * Clicking the switch body in the lab flips `on`, which re-drives the net
 * state: wire one terminal to +5V and the other to a gate input to make a
 * physical HIGH input, or wire one terminal to GND for a physical LOW input.
 */
export class Switch {
  constructor({ id, terminal1, terminal2, on = false, type = 'spst-toggle' }) {
    this.id = id;
    this.terminal1 = terminal1;
    this.terminal2 = terminal2;
    this.on = on;
    this.type = type;
  }

  toJSON() {
    return {
      id: this.id,
      terminal1: this.terminal1,
      terminal2: this.terminal2,
      on: this.on,
      type: this.type,
    };
  }
}
