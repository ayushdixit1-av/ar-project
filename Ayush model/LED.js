/**
 * LED.js
 *
 * One placed LED on the breadboard. Pure data model.
 *
 * {
 *   id:      "led_001",   // unique id assigned by the LEDManager
 *   color:   "red",       // color name from the picker
 *   anode:   "E12",       // hole id of the anode pin (pin 1)
 *   cathode: "F12",       // hole id of the cathode pin (pin 2)
 *   type:    "led-5mm"    // component type
 * }
 */
export class LED {
  constructor({ id, color, anode, cathode, type = 'led-5mm' }) {
    this.id = id;
    this.color = color;
    this.anode = anode;
    this.cathode = cathode;
    this.type = type;
  }

  toJSON() {
    return { id: this.id, color: this.color, anode: this.anode, cathode: this.cathode, type: this.type };
  }
}
