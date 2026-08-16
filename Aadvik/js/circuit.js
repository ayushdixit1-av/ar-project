/**
 * Logic Circuit Engine for Half & Full Adder Simulation
 */
class LogicCircuitEngine {
    constructor() {
        this.power = true; // Main 5V power supply
        this.mode = 'half'; // 'half' or 'full'
        
        // Input switch states (0 or 1)
        this.inputs = {
            A: 0,
            B: 0,
            Cin: 0
        };

        // Computed logic state
        this.outputs = {
            sum: 0,
            carry: 0,
            S1: 0,
            C1: 0,
            C2: 0
        };

        // Pin level details for tooltips & interactive wire tracing
        this.pinStates = {};
        this.evaluate();
    }

    setPower(state) {
        this.power = state;
        this.evaluate();
    }

    setMode(mode) {
        this.mode = mode;
        this.evaluate();
    }

    setInput(key, value) {
        if (this.inputs.hasOwnProperty(key)) {
            this.inputs[key] = value ? 1 : 0;
            this.evaluate();
        }
    }

    toggleInput(key) {
        if (this.inputs.hasOwnProperty(key)) {
            this.inputs[key] = this.inputs[key] === 1 ? 0 : 1;
            this.evaluate();
        }
    }

    evaluate() {
        if (!this.power) {
            this.outputs.sum = 0;
            this.outputs.carry = 0;
            this.outputs.S1 = 0;
            this.outputs.C1 = 0;
            this.outputs.C2 = 0;
            this.updatePinStatesOff();
            return this.outputs;
        }

        const A = this.inputs.A;
        const B = this.inputs.B;
        const Cin = this.inputs.Cin;

        if (this.mode === 'half') {
            // Half Adder: Sum = A ⊕ B, Carry = A · B
            this.outputs.S1 = A ^ B;
            this.outputs.C1 = A & B;
            this.outputs.sum = this.outputs.S1;
            this.outputs.carry = this.outputs.C1;
            this.outputs.C2 = 0;
        } else {
            // Full Adder:
            // HA 1: S1 = A ⊕ B, C1 = A · B
            // HA 2: Sum = S1 ⊕ Cin, C2 = S1 · Cin
            // OR Gate: Carry = C1 + C2
            this.outputs.S1 = A ^ B;
            this.outputs.C1 = A & B;
            this.outputs.sum = this.outputs.S1 ^ Cin;
            this.outputs.C2 = this.outputs.S1 & Cin;
            this.outputs.carry = this.outputs.C1 | this.outputs.C2;
        }

        this.updatePinStates();
        return this.outputs;
    }

    updatePinStatesOff() {
        this.pinStates = {
            '7486_14': { name: 'IC 7486 Pin 14 (VCC)', voltage: 0, label: '0V (Power OFF)' },
            '7486_7':  { name: 'IC 7486 Pin 7 (GND)', voltage: 0, label: '0V (GND)' },
            '7408_14': { name: 'IC 7408 Pin 14 (VCC)', voltage: 0, label: '0V (Power OFF)' },
            '7408_7':  { name: 'IC 7408 Pin 7 (GND)', voltage: 0, label: '0V (GND)' },
            '7432_14': { name: 'IC 7432 Pin 14 (VCC)', voltage: 0, label: '0V (Power OFF)' },
            '7432_7':  { name: 'IC 7432 Pin 7 (GND)', voltage: 0, label: '0V (GND)' },
        };
    }

    updatePinStates() {
        const A = this.inputs.A;
        const B = this.inputs.B;
        const Cin = this.inputs.Cin;
        const { sum, carry, S1, C1, C2 } = this.outputs;

        this.pinStates = {
            // Power pins
            '7486_14': { name: 'IC 7486 Pin 14 (VCC)', voltage: 5, label: '+5V Power HIGH' },
            '7486_7':  { name: 'IC 7486 Pin 7 (GND)', voltage: 0, label: '0V Ground' },
            '7408_14': { name: 'IC 7408 Pin 14 (VCC)', voltage: 5, label: '+5V Power HIGH' },
            '7408_7':  { name: 'IC 7408 Pin 7 (GND)', voltage: 0, label: '0V Ground' },

            // 7486 XOR IC Gate 1
            '7486_1': { name: 'IC 7486 Pin 1 (1A)', voltage: A * 5, label: `Input A = ${A}` },
            '7486_2': { name: 'IC 7486 Pin 2 (1B)', voltage: B * 5, label: `Input B = ${B}` },
            '7486_3': { name: 'IC 7486 Pin 3 (1Y)', voltage: S1 * 5, label: `S1 (A ⊕ B) = ${S1}` },

            // 7408 AND IC Gate 1
            '7408_1': { name: 'IC 7408 Pin 1 (1A)', voltage: A * 5, label: `Input A = ${A}` },
            '7408_2': { name: 'IC 7408 Pin 2 (1B)', voltage: B * 5, label: `Input B = ${B}` },
            '7408_3': { name: 'IC 7408 Pin 3 (1Y)', voltage: C1 * 5, label: `C1 (A · B) = ${C1}` }
        };

        if (this.mode === 'full') {
            this.pinStates['7432_14'] = { name: 'IC 7432 Pin 14 (VCC)', voltage: 5, label: '+5V Power HIGH' };
            this.pinStates['7432_7'] = { name: 'IC 7432 Pin 7 (GND)', voltage: 0, label: '0V Ground' };

            // 7486 XOR IC Gate 2 (Full Adder)
            this.pinStates['7486_4'] = { name: 'IC 7486 Pin 4 (2A)', voltage: S1 * 5, label: `S1 = ${S1}` };
            this.pinStates['7486_5'] = { name: 'IC 7486 Pin 5 (2B)', voltage: Cin * 5, label: `Input Cin = ${Cin}` };
            this.pinStates['7486_6'] = { name: 'IC 7486 Pin 6 (2Y)', voltage: sum * 5, label: `SUM = ${sum}` };

            // 7408 AND IC Gate 2 (Full Adder)
            this.pinStates['7408_4'] = { name: 'IC 7408 Pin 4 (2A)', voltage: S1 * 5, label: `S1 = ${S1}` };
            this.pinStates['7408_5'] = { name: 'IC 7408 Pin 5 (2B)', voltage: Cin * 5, label: `Input Cin = ${Cin}` };
            this.pinStates['7408_6'] = { name: 'IC 7408 Pin 6 (2Y)', voltage: C2 * 5, label: `C2 = ${C2}` };

            // 7432 OR IC Gate 1 (Full Adder)
            this.pinStates['7432_1'] = { name: 'IC 7432 Pin 1 (1A)', voltage: C1 * 5, label: `C1 = ${C1}` };
            this.pinStates['7432_2'] = { name: 'IC 7432 Pin 2 (1B)', voltage: C2 * 5, label: `C2 = ${C2}` };
            this.pinStates['7432_3'] = { name: 'IC 7432 Pin 3 (1Y)', voltage: carry * 5, label: `CARRY = ${carry}` };
        }
    }
}
