import { useState, useMemo, useEffect, useCallback } from 'react';
import { ConverterMode, BitValue, BitVector4, GateState, IC7486Pin, TruthTableRow } from '../types';

export function useConverterLogic() {
  const [mode, setMode] = useState<ConverterMode>('bin2gray');
  const [inputBits, setInputBits] = useState<BitVector4>({
    b3: 1,
    b2: 0,
    b1: 1,
    b0: 0,
  });
  const [isAutoSequencing, setIsAutoSequencing] = useState(false);
  const [sequenceSpeedMs, setSequenceSpeedMs] = useState(1200);

  // Toggle single input bit
  const toggleBit = useCallback((bitKey: keyof BitVector4) => {
    setInputBits((prev) => ({
      ...prev,
      [bitKey]: (prev[bitKey] === 1 ? 0 : 1) as BitValue,
    }));
  }, []);

  // Set all 4 bits directly from number or updater function
  const setInputDecimal = useCallback((valueOrUpdater: number | ((prev: number) => number)) => {
    setInputBits((prevBits) => {
      const currentDec = (prevBits.b3 << 3) | (prevBits.b2 << 2) | (prevBits.b1 << 1) | prevBits.b0;
      const dec = typeof valueOrUpdater === 'function' ? valueOrUpdater(currentDec) : valueOrUpdater;
      const clamped = ((Math.floor(dec) % 16) + 16) % 16;
      const b3 = ((clamped >> 3) & 1) as BitValue;
      const b2 = ((clamped >> 2) & 1) as BitValue;
      const b1 = ((clamped >> 1) & 1) as BitValue;
      const b0 = (clamped & 1) as BitValue;
      return { b3, b2, b1, b0 };
    });
  }, []);

  const inputDecimal = useMemo(() => {
    return (inputBits.b3 << 3) | (inputBits.b2 << 2) | (inputBits.b1 << 1) | inputBits.b0;
  }, [inputBits]);

  // Next & Previous integer steps
  const stepIncrement = useCallback(() => {
    setInputDecimal((inputDecimal + 1) % 16);
  }, [inputDecimal, setInputDecimal]);

  const stepDecrement = useCallback(() => {
    setInputDecimal((inputDecimal - 1 + 16) % 16);
  }, [inputDecimal, setInputDecimal]);

  // Auto-sequencer clock ticker
  useEffect(() => {
    if (!isAutoSequencing) return;
    const timer = setInterval(() => {
      setInputDecimal((prev) => (prev + 1) % 16);
    }, sequenceSpeedMs);
    return () => clearInterval(timer);
  }, [isAutoSequencing, sequenceSpeedMs, setInputDecimal]);

  // Compute outputs and gate states based on Mode
  const { outputBits, gateStates, formulaSteps, pins } = useMemo(() => {
    let out3: BitValue;
    let out2: BitValue;
    let out1: BitValue;
    let out0: BitValue;

    let gate1: GateState;
    let gate2: GateState;
    let gate3: GateState;
    let gate4: GateState;

    let steps: string[] = [];

    if (mode === 'bin2gray') {
      const b3 = inputBits.b3;
      const b2 = inputBits.b2;
      const b1 = inputBits.b1;
      const b0 = inputBits.b0;

      // Binary -> Gray logic:
      // G3 = B3
      // G2 = B3 ^ B2
      // G1 = B2 ^ B1
      // G0 = B1 ^ B0
      out3 = b3;
      out2 = (b3 ^ b2) as BitValue;
      out1 = (b2 ^ b1) as BitValue;
      out0 = (b1 ^ b0) as BitValue;

      gate1 = {
        gateId: 1,
        pinA: 1,
        pinB: 2,
        pinOut: 3,
        inputA: b3,
        inputB: b2,
        output: out2,
        expression: `G2 = B3 ⊕ B2 = ${b3} ⊕ ${b2} = ${out2}`,
        isActive: true,
      };

      gate2 = {
        gateId: 2,
        pinA: 4,
        pinB: 5,
        pinOut: 6,
        inputA: b2,
        inputB: b1,
        output: out1,
        expression: `G1 = B2 ⊕ B1 = ${b2} ⊕ ${b1} = ${out1}`,
        isActive: true,
      };

      gate3 = {
        gateId: 3,
        pinA: 8,
        pinB: 9,
        pinOut: 10,
        inputA: b1,
        inputB: b0,
        output: out0,
        expression: `G0 = B1 ⊕ B0 = ${b1} ⊕ ${b0} = ${out0}`,
        isActive: true,
      };

      gate4 = {
        gateId: 4,
        pinA: 11,
        pinB: 12,
        pinOut: 13,
        inputA: 0,
        inputB: 0,
        output: 0,
        expression: 'Gate 4 (Pins 11, 12, 13) Unused / Idle',
        isActive: false,
      };

      steps = [
        `G3 = B3 = ${b3} (Direct MSB pass-through, no gate used)`,
        `G2 = B3 ⊕ B2 = ${b3} ⊕ ${b2} = ${out2} (Gate 1: Pins 1 & 2 → Pin 3)`,
        `G1 = B2 ⊕ B1 = ${b2} ⊕ ${b1} = ${out1} (Gate 2: Pins 4 & 5 → Pin 6)`,
        `G0 = B1 ⊕ B0 = ${b1} ⊕ ${b0} = ${out0} (Gate 3: Pins 8 & 9 → Pin 10)`,
      ];
    } else {
      // Gray -> Binary logic:
      // B3 = G3
      // B2 = B3 ^ G2
      // B1 = B2 ^ G1
      // B0 = B1 ^ G0
      const g3 = inputBits.b3;
      const g2 = inputBits.b2;
      const g1 = inputBits.b1;
      const g0 = inputBits.b0;

      out3 = g3;
      out2 = (out3 ^ g2) as BitValue;
      out1 = (out2 ^ g1) as BitValue;
      out0 = (out1 ^ g0) as BitValue;

      gate1 = {
        gateId: 1,
        pinA: 1,
        pinB: 2,
        pinOut: 3,
        inputA: out3,
        inputB: g2,
        output: out2,
        expression: `B2 = B3 ⊕ G2 = ${out3} ⊕ ${g2} = ${out2}`,
        isActive: true,
      };

      gate2 = {
        gateId: 2,
        pinA: 4,
        pinB: 5,
        pinOut: 6,
        inputA: out2,
        inputB: g1,
        output: out1,
        expression: `B1 = B2 ⊕ G1 = ${out2} ⊕ ${g1} = ${out1} (Cascaded from Gate 1)`,
        isActive: true,
      };

      gate3 = {
        gateId: 3,
        pinA: 8,
        pinB: 9,
        pinOut: 10,
        inputA: out1,
        inputB: g0,
        output: out0,
        expression: `B0 = B1 ⊕ G0 = ${out1} ⊕ ${g0} = ${out0} (Cascaded from Gate 2)`,
        isActive: true,
      };

      gate4 = {
        gateId: 4,
        pinA: 11,
        pinB: 12,
        pinOut: 13,
        inputA: 0,
        inputB: 0,
        output: 0,
        expression: 'Gate 4 (Pins 11, 12, 13) Unused / Idle',
        isActive: false,
      };

      steps = [
        `B3 = G3 = ${g3} (Direct MSB pass-through)`,
        `B2 = B3 ⊕ G2 = ${out3} ⊕ ${g2} = ${out2} (Gate 1: Pins 1 & 2 → Pin 3)`,
        `B1 = B2 ⊕ G1 = ${out2} ⊕ ${g1} = ${out1} (Gate 2: Cascades Output B2 to Pin 4)`,
        `B0 = B1 ⊕ G0 = ${out1} ⊕ ${g0} = ${out0} (Gate 3: Cascades Output B1 to Pin 8)`,
      ];
    }

    const outputVector: BitVector4 = {
      b3: out3,
      b2: out2,
      b1: out1,
      b0: out0,
    };

    // Calculate all 14 pins voltages and descriptions
    const pinDetails: IC7486Pin[] = [
      {
        pinNumber: 1,
        name: '1A',
        type: 'input',
        voltage: gate1.inputA === 1 ? 5.0 : 0.0,
        logicLevel: gate1.inputA,
        description: `Gate 1 Input A (${mode === 'bin2gray' ? 'Bit B3' : 'Cascaded B3'})`,
        connectedTo: mode === 'bin2gray' ? 'Input Switch B3' : 'Pass-through B3 (G3)',
      },
      {
        pinNumber: 2,
        name: '1B',
        type: 'input',
        voltage: gate1.inputB === 1 ? 5.0 : 0.0,
        logicLevel: gate1.inputB,
        description: `Gate 1 Input B (${mode === 'bin2gray' ? 'Bit B2' : 'Input G2'})`,
        connectedTo: mode === 'bin2gray' ? 'Input Switch B2' : 'Input Switch G2',
      },
      {
        pinNumber: 3,
        name: '1Y',
        type: 'output',
        voltage: gate1.output === 1 ? 5.0 : 0.0,
        logicLevel: gate1.output,
        description: `Gate 1 Output (${mode === 'bin2gray' ? 'Bit G2' : 'Bit B2'})`,
        connectedTo: mode === 'bin2gray' ? 'LED G2' : 'LED B2 & Gate 2 Pin 4',
      },
      {
        pinNumber: 4,
        name: '2A',
        type: 'input',
        voltage: gate2.inputA === 1 ? 5.0 : 0.0,
        logicLevel: gate2.inputA,
        description: `Gate 2 Input A (${mode === 'bin2gray' ? 'Bit B2' : 'Feedback B2'})`,
        connectedTo: mode === 'bin2gray' ? 'Input Switch B2' : 'Pin 3 Output (B2)',
      },
      {
        pinNumber: 5,
        name: '2B',
        type: 'input',
        voltage: gate2.inputB === 1 ? 5.0 : 0.0,
        logicLevel: gate2.inputB,
        description: `Gate 2 Input B (${mode === 'bin2gray' ? 'Bit B1' : 'Input G1'})`,
        connectedTo: mode === 'bin2gray' ? 'Input Switch B1' : 'Input Switch G1',
      },
      {
        pinNumber: 6,
        name: '2Y',
        type: 'output',
        voltage: gate2.output === 1 ? 5.0 : 0.0,
        logicLevel: gate2.output,
        description: `Gate 2 Output (${mode === 'bin2gray' ? 'Bit G1' : 'Bit B1'})`,
        connectedTo: mode === 'bin2gray' ? 'LED G1' : 'LED B1 & Gate 3 Pin 8',
      },
      {
        pinNumber: 7,
        name: 'GND',
        type: 'ground',
        voltage: 0.0,
        logicLevel: 0,
        description: 'Ground Reference (0V)',
        connectedTo: 'Breadboard Bottom Ground Rail (-)',
      },
      {
        pinNumber: 8,
        name: '3A',
        type: 'input',
        voltage: gate3.inputA === 1 ? 5.0 : 0.0,
        logicLevel: gate3.inputA,
        description: `Gate 3 Input A (${mode === 'bin2gray' ? 'Bit B1' : 'Feedback B1'})`,
        connectedTo: mode === 'bin2gray' ? 'Input Switch B1' : 'Pin 6 Output (B1)',
      },
      {
        pinNumber: 9,
        name: '3B',
        type: 'input',
        voltage: gate3.inputB === 1 ? 5.0 : 0.0,
        logicLevel: gate3.inputB,
        description: `Gate 3 Input B (${mode === 'bin2gray' ? 'Bit B0' : 'Input G0'})`,
        connectedTo: mode === 'bin2gray' ? 'Input Switch B0' : 'Input Switch G0',
      },
      {
        pinNumber: 10,
        name: '3Y',
        type: 'output',
        voltage: gate3.output === 1 ? 5.0 : 0.0,
        logicLevel: gate3.output,
        description: `Gate 3 Output (${mode === 'bin2gray' ? 'Bit G0' : 'Bit B0'})`,
        connectedTo: mode === 'bin2gray' ? 'LED G0' : 'LED B0',
      },
      {
        pinNumber: 11,
        name: '4A',
        type: 'unused',
        voltage: 0.0,
        logicLevel: 0,
        description: 'Gate 4 Input A (Unused / Tied Low)',
        connectedTo: 'Ground Rail',
      },
      {
        pinNumber: 12,
        name: '4B',
        type: 'unused',
        voltage: 0.0,
        logicLevel: 0,
        description: 'Gate 4 Input B (Unused / Tied Low)',
        connectedTo: 'Ground Rail',
      },
      {
        pinNumber: 13,
        name: '4Y',
        type: 'unused',
        voltage: 0.0,
        logicLevel: 0,
        description: 'Gate 4 Output (Unconnected)',
        connectedTo: 'Floating / Open',
      },
      {
        pinNumber: 14,
        name: 'VCC',
        type: 'power',
        voltage: 5.0,
        logicLevel: 1,
        description: 'Supply Voltage (+5.0V DC)',
        connectedTo: 'Breadboard Top Power Rail (+5V)',
      },
    ];

    return {
      outputBits: outputVector,
      gateStates: [gate1, gate2, gate3, gate4],
      formulaSteps: steps,
      pins: pinDetails,
    };
  }, [mode, inputBits]);

  const outputDecimal = useMemo(() => {
    return (outputBits.b3 << 3) | (outputBits.b2 << 2) | (outputBits.b1 << 1) | outputBits.b0;
  }, [outputBits]);

  // Full 16-row Truth Table for the current mode
  const truthTableData = useMemo<TruthTableRow[]>(() => {
    const rows: TruthTableRow[] = [];

    for (let i = 0; i < 16; i++) {
      const b3 = ((i >> 3) & 1) as BitValue;
      const b2 = ((i >> 2) & 1) as BitValue;
      const b1 = ((i >> 1) & 1) as BitValue;
      const b0 = (i & 1) as BitValue;

      // Calculate Gray code for binary i
      const g3 = b3;
      const g2 = (b3 ^ b2) as BitValue;
      const g1 = (b2 ^ b1) as BitValue;
      const g0 = (b1 ^ b0) as BitValue;

      const binaryStr = `${b3}${b2}${b1}${b0}`;
      const grayStr = `${g3}${g2}${g1}${g0}`;

      // In bin2gray mode, input is Binary (i)
      // In gray2bin mode, input is Gray (represented by the gray value matching current input)
      let isCurrent = false;
      if (mode === 'bin2gray') {
        isCurrent = i === inputDecimal;
      } else {
        const currentInputGrayStr = `${inputBits.b3}${inputBits.b2}${inputBits.b1}${inputBits.b0}`;
        isCurrent = grayStr === currentInputGrayStr;
      }

      // Bit change count from previous gray code (to show Unit Distance property = exactly 1 bit changes!)
      let bitChanges = 0;
      if (i > 0) {
        const prevB3 = ((i - 1) >> 3) & 1;
        const prevB2 = ((i - 1) >> 2) & 1;
        const prevB1 = ((i - 1) >> 1) & 1;
        const prevB0 = (i - 1) & 1;
        const prevG3 = prevB3;
        const prevG2 = prevB3 ^ prevB2;
        const prevG1 = prevB2 ^ prevB1;
        const prevG0 = prevB1 ^ prevB0;
        bitChanges = (g3 ^ prevG3) + (g2 ^ prevG2) + (g1 ^ prevG1) + (g0 ^ prevG0);
      }

      rows.push({
        decimal: i,
        binaryStr,
        grayStr,
        b3,
        b2,
        b1,
        b0,
        g3,
        g2,
        g1,
        g0,
        isCurrent,
        bitChanges,
      });
    }

    return rows;
  }, [mode, inputDecimal, inputBits]);

  return {
    mode,
    setMode,
    inputBits,
    setInputBits,
    toggleBit,
    setInputDecimal,
    inputDecimal,
    outputBits,
    outputDecimal,
    gateStates,
    formulaSteps,
    pins,
    truthTableData,
    stepIncrement,
    stepDecrement,
    isAutoSequencing,
    setIsAutoSequencing,
    sequenceSpeedMs,
    setSequenceSpeedMs,
  };
}
