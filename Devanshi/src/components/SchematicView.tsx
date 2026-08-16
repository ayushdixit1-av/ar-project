import React from 'react';
import { ConverterMode, BitVector4, GateState, IC7486Pin } from '../types';
import { Cpu, Zap, Activity } from 'lucide-react';

interface SchematicViewProps {
  mode: ConverterMode;
  inputBits: BitVector4;
  outputBits: BitVector4;
  gateStates: GateState[];
  pins: IC7486Pin[];
}

export const SchematicView: React.FC<SchematicViewProps> = ({
  mode,
  inputBits,
  outputBits,
  gateStates,
  pins,
}) => {
  const isBin2Gray = mode === 'bin2gray';

  return (
    <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl text-slate-200 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-semibold text-slate-100">
            IC 7486 Gate-Level Logic Schematic
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-400">HIGH (1 / 5V)</span>
          </span>
          <span className="flex items-center gap-1 ml-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="text-slate-400">LOW (0 / 0V)</span>
          </span>
        </div>
      </div>

      {/* Schematic Canvas Container */}
      <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl">
          {/* IC 7486 Package Border Header */}
          <div className="flex items-center justify-between bg-slate-900/80 px-4 py-2 rounded-t-xl border border-slate-800 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sky-400">SN74HC86N</span>
              <span>• Quad 2-Input Exclusive-OR</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-rose-400 font-bold">Pin 14: VCC (+5V)</span>
              <span className="text-slate-400 font-bold">Pin 7: GND (0V)</span>
            </div>
          </div>

          {/* Logic Gates Diagram */}
          <div className="bg-slate-950 p-6 border-x border-b border-slate-800 rounded-b-xl space-y-6">
            {/* Bit 3: Direct MSB Pass-Through */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  className={`px-3 py-1.5 rounded-lg font-mono font-bold text-xs ${
                    inputBits.b3 === 1 ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isBin2Gray ? 'B3' : 'G3'}: {inputBits.b3}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  ─── Direct Buffer (No XOR Gate Required) ───▶
                </div>
              </div>
              <div
                className={`px-3 py-1.5 rounded-lg font-mono font-bold text-xs ${
                  outputBits.b3 === 1 ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isBin2Gray ? 'G3' : 'B3'}: {outputBits.b3}
              </div>
            </div>

            {/* Gate 1 (Pins 1, 2 -> Pin 3) */}
            <div className="relative p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 w-12">Pin 1:</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      gateStates[0].inputA === 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    1A ({isBin2Gray ? 'B3' : 'B3'}) = {gateStates[0].inputA}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 w-12">Pin 2:</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      gateStates[0].inputB === 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    1B ({isBin2Gray ? 'B2' : 'G2'}) = {gateStates[0].inputB}
                  </span>
                </div>
              </div>

              {/* XOR Gate Graphic */}
              <div className="flex flex-col items-center justify-center px-4">
                <div className="px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/40 text-sky-300 font-mono font-bold text-sm shadow-lg">
                  Gate 1 [ ⊕ ]
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-1">XOR 1</span>
              </div>

              <div className="space-y-1 text-right font-mono text-xs">
                <div className="text-slate-500">Pin 3 (1Y Output)</div>
                <div
                  className={`inline-block px-3 py-1.5 rounded-lg font-bold ${
                    outputBits.b2 === 1
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isBin2Gray ? 'G2' : 'B2'}: {outputBits.b2}
                </div>
                {!isBin2Gray && (
                  <div className="text-[10px] text-purple-400">↳ Cascades to Gate 2 (Pin 4)</div>
                )}
              </div>
            </div>

            {/* Gate 2 (Pins 4, 5 -> Pin 6) */}
            <div className="relative p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 w-12">Pin 4:</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      gateStates[1].inputA === 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    2A ({isBin2Gray ? 'B2' : 'B2 cascaded'}) = {gateStates[1].inputA}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 w-12">Pin 5:</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      gateStates[1].inputB === 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    2B ({isBin2Gray ? 'B1' : 'G1'}) = {gateStates[1].inputB}
                  </span>
                </div>
              </div>

              {/* XOR Gate Graphic */}
              <div className="flex flex-col items-center justify-center px-4">
                <div className="px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/40 text-sky-300 font-mono font-bold text-sm shadow-lg">
                  Gate 2 [ ⊕ ]
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-1">XOR 2</span>
              </div>

              <div className="space-y-1 text-right font-mono text-xs">
                <div className="text-slate-500">Pin 6 (2Y Output)</div>
                <div
                  className={`inline-block px-3 py-1.5 rounded-lg font-bold ${
                    outputBits.b1 === 1
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isBin2Gray ? 'G1' : 'B1'}: {outputBits.b1}
                </div>
                {!isBin2Gray && (
                  <div className="text-[10px] text-purple-400">↳ Cascades to Gate 3 (Pin 8)</div>
                )}
              </div>
            </div>

            {/* Gate 3 (Pins 8, 9 -> Pin 10) */}
            <div className="relative p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 w-12">Pin 8:</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      gateStates[2].inputA === 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    3A ({isBin2Gray ? 'B1' : 'B1 cascaded'}) = {gateStates[2].inputA}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 w-12">Pin 9:</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      gateStates[2].inputB === 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    3B ({isBin2Gray ? 'B0' : 'G0'}) = {gateStates[2].inputB}
                  </span>
                </div>
              </div>

              {/* XOR Gate Graphic */}
              <div className="flex flex-col items-center justify-center px-4">
                <div className="px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/40 text-sky-300 font-mono font-bold text-sm shadow-lg">
                  Gate 3 [ ⊕ ]
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-1">XOR 3</span>
              </div>

              <div className="space-y-1 text-right font-mono text-xs">
                <div className="text-slate-500">Pin 10 (3Y Output)</div>
                <div
                  className={`inline-block px-3 py-1.5 rounded-lg font-bold ${
                    outputBits.b0 === 1
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isBin2Gray ? 'G0' : 'B0'}: {outputBits.b0}
                </div>
              </div>
            </div>

            {/* Gate 4 (Unused / Idle) */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-mono">Gate 4 (Pins 11, 12 → Pin 13)</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] font-mono">
                  IDLE / UNCONNECTED
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                Only 3 XOR gates needed for 4-bit conversion
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
