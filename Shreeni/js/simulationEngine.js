/**
 * Digital Circuit Simulation Engine
 * Resolves node nets, VCC/GND propagation, IC internal logic, and output state evaluation.
 */
class SimulationEngine {
  constructor() {
    this.powerOn = true;
    this.trainerSwitches = {
      // Data Inputs I0 - I7
      I0: 0, I1: 0, I2: 0, I3: 0, I4: 0, I5: 0, I6: 0, I7: 0,
      // Select Switches S0, S1, S2
      S0: 0, S1: 0, S2: 0,
      // Strobe / Enable Switch E_BAR (Active LOW, default 0 for enabled)
      E_BAR: 0,
      // Clock switch
      CLK: 0
    };
    this.clockInterval = null;
    this.clockFrequency = 1; // 1Hz
    this.clockState = 0;

    // Outputs from LEDs
    this.ledOutputs = {
      Y1: 0,
      Y1_BAR: 0,
      Y2: 0,
      Y2_BAR: 0,
      LED0: 0, LED1: 0, LED2: 0, LED3: 0
    };

    // Net values map: nodeId -> 0 | 1 | 'Z'
    this.netStates = {};
  }

  setPower(on) {
    this.powerOn = on;
  }

  setSwitch(name, value) {
    if (this.trainerSwitches.hasOwnProperty(name)) {
      this.trainerSwitches[name] = value ? 1 : 0;
    }
  }

  toggleClock() {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
      this.clockInterval = null;
    } else {
      this.clockInterval = setInterval(() => {
        this.clockState = this.clockState === 1 ? 0 : 1;
        this.trainerSwitches.CLK = this.clockState;
        if (window.appEngine) window.appEngine.stepSimulation();
      }, 500);
    }
    return !!this.clockInterval;
  }

  /**
   * Run one iteration of the circuit solver
   * @param {Array} wires List of wire objects: { id, from: {type, id, pin}, to: {type, id, pin}, color }
   * @param {Array} placedICs List of IC objects: { id, type, startCol, row }
   * @param {Function} getBreadboardHoleNet Helper to resolve breadboard hole connections
   */
  evaluateCircuit(wires, placedICs, getBreadboardHoleNet) {
    if (!this.powerOn) {
      // All nets off
      this.netStates = {};
      Object.keys(this.ledOutputs).forEach(k => this.ledOutputs[k] = 0);
      return;
    }

    // 1. Build Disjoint Set (Union-Find) of connected nodes
    const parent = {};

    function find(node) {
      if (!parent[node]) parent[node] = node;
      if (parent[node] !== node) parent[node] = find(parent[node]);
      return parent[node];
    }

    function union(n1, n2) {
      const root1 = find(n1);
      const root2 = find(n2);
      if (root1 !== root2) {
        parent[root1] = root2;
      }
    }

    // 2. Add Breadboard Internal Column / Rail Connections
    // Connect holes in same breadboard column or rail
    if (getBreadboardHoleNet) {
      getBreadboardHoleNet(union);
    }

    // 3. Add Wires Connections
    wires.forEach(w => {
      if (w.from && w.to) {
        const keyFrom = `${w.from.type}:${w.from.id}${w.from.pin !== undefined ? ':' + w.from.pin : ''}`;
        const keyTo = `${w.to.type}:${w.to.id}${w.to.pin !== undefined ? ':' + w.to.pin : ''}`;
        union(keyFrom, keyTo);
      }
    });

    // 4. Group all nodes by root
    const netGroups = {};
    Object.keys(parent).forEach(node => {
      const root = find(node);
      if (!netGroups[root]) netGroups[root] = [];
      netGroups[root].push(node);
    });

    // 5. Initialize Source Voltage Drivers
    const sourceVoltages = {}; // root -> 0 | 1

    // Driver: Trainer Kit Power Terminals
    const vccRoot = find('trainer:VCC');
    const gndRoot = find('trainer:GND');
    sourceVoltages[vccRoot] = 1;
    sourceVoltages[gndRoot] = 0;

    // Drivers: Trainer Kit Switches
    Object.keys(this.trainerSwitches).forEach(swKey => {
      const nodeKey = `trainer:${swKey}`;
      const root = find(nodeKey);
      sourceVoltages[root] = this.trainerSwitches[swKey];
    });

    // 6. Multi-pass Solver (to resolve IC input -> IC output propagation)
    const MAX_PASSES = 5;
    for (let pass = 0; pass < MAX_PASSES; pass++) {
      // Assign voltage to all nodes in each net from known driver sources
      const currentNetValues = {};
      Object.keys(netGroups).forEach(root => {
        const driverVal = sourceVoltages[root];
        const val = (driverVal !== undefined) ? driverVal : 0; // TTL default low if floating
        netGroups[root].forEach(node => {
          currentNetValues[node] = val;
        });
      });

      // Process each placed IC to generate output drivers
      placedICs.forEach(ic => {
        this.evaluateIC(ic, find, currentNetValues, sourceVoltages);
      });
    }

    // 7. Store final net states for wire rendering & logic probe
    this.netStates = {};
    Object.keys(parent).forEach(node => {
      const root = find(node);
      this.netStates[node] = (sourceVoltages[root] !== undefined) ? sourceVoltages[root] : 0;
    });

    // 8. Update Trainer Output LEDs
    Object.keys(this.ledOutputs).forEach(ledKey => {
      const ledNode = `trainer:${ledKey}`;
      const root = find(ledNode);
      this.ledOutputs[ledKey] = sourceVoltages[root] !== undefined ? sourceVoltages[root] : 0;
    });
  }

  /**
   * Evaluate digital logic inside a given IC and set output pin driver voltages
   */
  evaluateIC(ic, find, currentNetValues, sourceVoltages) {
    const getNodeVal = (pinNum) => {
      const nodeKey = `ic:${ic.id}:${pinNum}`;
      return currentNetValues[nodeKey] !== undefined ? currentNetValues[nodeKey] : 0;
    };

    const setOutputVal = (pinNum, val) => {
      const nodeKey = `ic:${ic.id}:${pinNum}`;
      const root = find(nodeKey);
      sourceVoltages[root] = val;
    };

    if (ic.type === '74153') {
      // Dual 4-to-1 Multiplexer (16 Pin DIP)
      // Pin 16: VCC, Pin 8: GND
      const vcc = getNodeVal(16);
      const gnd = getNodeVal(8);
      const powered = (vcc === 1 && gnd === 0);

      if (!powered) {
        setOutputVal(7, 0);
        setOutputVal(9, 0);
        return;
      }

      // Shared Select inputs: Pin 14 = A (S0, LSB), Pin 2 = B (S1, MSB)
      const A = getNodeVal(14);
      const B = getNodeVal(2);
      const select = (B << 1) | A;

      // MUX 1: Strobe Pin 1 (1G_bar - Active LOW), Outputs Pin 7 (1Y)
      // Data Inputs: Pin 6 (1I0), Pin 5 (1I1), Pin 4 (1I2), Pin 3 (1I3)
      const g1_bar = getNodeVal(1);
      const inputs1 = [getNodeVal(6), getNodeVal(5), getNodeVal(4), getNodeVal(3)];
      const y1 = (g1_bar === 0) ? inputs1[select] : 0;
      setOutputVal(7, y1);

      // MUX 2: Strobe Pin 15 (2G_bar - Active LOW), Outputs Pin 9 (2Y)
      // Data Inputs: Pin 10 (2I0), Pin 11 (2I1), Pin 12 (2I2), Pin 13 (2I3)
      const g2_bar = getNodeVal(15);
      const inputs2 = [getNodeVal(10), getNodeVal(11), getNodeVal(12), getNodeVal(13)];
      const y2 = (g2_bar === 0) ? inputs2[select] : 0;
      setOutputVal(9, y2);

    } else if (ic.type === '74151') {
      // 8-to-1 Multiplexer (16 Pin DIP)
      // Pin 16: VCC, Pin 8: GND
      const vcc = getNodeVal(16);
      const gnd = getNodeVal(8);
      const powered = (vcc === 1 && gnd === 0);

      if (!powered) {
        setOutputVal(5, 0);
        setOutputVal(6, 0);
        return;
      }

      // Select Inputs: Pin 15 = A (S0), Pin 14 = B (S1), Pin 13 = C (S2)
      const A = getNodeVal(15);
      const B = getNodeVal(14);
      const C = getNodeVal(13);
      const select = (C << 2) | (B << 1) | A;

      // Strobe / Enable: Pin 7 (E_bar - Active LOW)
      const e_bar = getNodeVal(7);

      // Data Inputs: D0(4), D1(3), D2(2), D3(1), D4(12), D5(11), D6(10), D7(9)
      const dataInputs = [
        getNodeVal(4),  // D0
        getNodeVal(3),  // D1
        getNodeVal(2),  // D2
        getNodeVal(1),  // D3
        getNodeVal(12), // D4
        getNodeVal(11), // D5
        getNodeVal(10), // D6
        getNodeVal(9)   // D7
      ];

      // Pin 5 = Y (Non-inverted Output), Pin 6 = W (Inverted Output)
      if (e_bar === 0) {
        const y = dataInputs[select];
        setOutputVal(5, y);
        setOutputVal(6, y === 1 ? 0 : 1);
      } else {
        setOutputVal(5, 0);
        setOutputVal(6, 1); // W is high when disabled
      }

    } else if (ic.type === '7404') {
      // Hex Inverter NOT Gates (14 Pin DIP)
      // Pin 14: VCC, Pin 7: GND
      const vcc = getNodeVal(14);
      const gnd = getNodeVal(7);
      if (vcc === 1 && gnd === 0) {
        setOutputVal(2, getNodeVal(1) === 1 ? 0 : 1);
        setOutputVal(4, getNodeVal(3) === 1 ? 0 : 1);
        setOutputVal(6, getNodeVal(5) === 1 ? 0 : 1);
        setOutputVal(8, getNodeVal(9) === 1 ? 0 : 1);
        setOutputVal(10, getNodeVal(11) === 1 ? 0 : 1);
        setOutputVal(12, getNodeVal(13) === 1 ? 0 : 1);
      }
    } else if (ic.type === '7408') {
      // Quad 2-Input AND Gates (14 Pin DIP)
      // Pin 14: VCC, Pin 7: GND
      const vcc = getNodeVal(14);
      const gnd = getNodeVal(7);
      if (vcc === 1 && gnd === 0) {
        setOutputVal(3, (getNodeVal(1) === 1 && getNodeVal(2) === 1) ? 1 : 0);
        setOutputVal(6, (getNodeVal(4) === 1 && getNodeVal(5) === 1) ? 1 : 0);
        setOutputVal(8, (getNodeVal(9) === 1 && getNodeVal(10) === 1) ? 1 : 0);
        setOutputVal(11, (getNodeVal(12) === 1 && getNodeVal(13) === 1) ? 1 : 0);
      }
    } else if (ic.type === '7432') {
      // Quad 2-Input OR Gates (14 Pin DIP)
      const vcc = getNodeVal(14);
      const gnd = getNodeVal(7);
      if (vcc === 1 && gnd === 0) {
        setOutputVal(3, (getNodeVal(1) === 1 || getNodeVal(2) === 1) ? 1 : 0);
        setOutputVal(6, (getNodeVal(4) === 1 || getNodeVal(5) === 1) ? 1 : 0);
        setOutputVal(8, (getNodeVal(9) === 1 || getNodeVal(10) === 1) ? 1 : 0);
        setOutputVal(11, (getNodeVal(12) === 1 || getNodeVal(13) === 1) ? 1 : 0);
      }
    }
  }

  getNodeState(nodeKey) {
    return this.netStates[nodeKey] !== undefined ? this.netStates[nodeKey] : 0;
  }
}

window.SimulationEngine = SimulationEngine;
