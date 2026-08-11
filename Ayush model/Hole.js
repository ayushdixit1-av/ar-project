/**
 * Hole.js
 *
 * Single logical hole of the breadboard terminal strip.
 * Position is board-centred (origin at the center of the board),
 * expressed in millimetres.
 */
export class Hole {
  constructor({ id, row, column, position }) {
    this.id = id;                        // e.g. "A1"
    this.row = row;                      // 'A' .. 'J'
    this.column = column;                // 1 .. 63
    this.position = { ...position };     // { x, y, z } in mm, board-centred
    this.occupied = false;
    this.component = null;
    this.electricalNode = null;
    this.voltage = 0;
    this.selected = false;
  }

  occupy(component) {
    if (this.occupied) {
      throw new Error(`Hole ${this.id} is already occupied by ${this.component}`);
    }
    this.occupied = true;
    this.component = component;
    return this;
  }

  release() {
    this.occupied = false;
    this.component = null;
    this.electricalNode = null;
    this.voltage = 0;
    return this;
  }

  setVoltage(voltage) {
    this.voltage = voltage;
    return this;
  }

  select() {
    this.selected = true;
    return this;
  }

  deselect() {
    this.selected = false;
    return this;
  }
}
