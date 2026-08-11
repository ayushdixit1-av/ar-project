/**
 * Wire.js
 *
 * One jumper wire connecting two breadboard holes.
 * Pure data model - no rendering, no simulation.
 *
 * {
 *   id:     "wire_001",   // unique id assigned by the WireManager
 *   start:  "A10",        // hole id of the start end
 *   end:    "F18",        // hole id of the end
 *   color:  "red",        // color name from the picker
 *   length: 12.4,         // mm, curve length (set by the renderer)
 *   type:   "jumper"      // wire type
 * }
 */
export class Wire {
  constructor({ id, start, end, color, length = 0, type = 'jumper' }) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.color = color;
    this.length = length;
    this.type = type;
  }

  /** Does this wire connect the same two holes (order-insensitive)? */
  sameConnection(start, end) {
    return (
      (this.start === start && this.end === end) ||
      (this.start === end && this.end === start)
    );
  }

  toJSON() {
    return {
      id: this.id,
      start: this.start,
      end: this.end,
      color: this.color,
      length: this.length,
      type: this.type,
    };
  }
}
