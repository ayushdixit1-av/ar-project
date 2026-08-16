import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ConverterMode, BitVector4, BitValue } from '../types';
import {
  ArrowRightLeft,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Zap,
  Sliders,
  Cpu,
  Hash,
} from 'lucide-react';

interface ControlPanelProps {
  mode: ConverterMode;
  setMode: (mode: ConverterMode) => void;
  inputBits: BitVector4;
  outputBits: BitVector4;
  inputDecimal: number;
  outputDecimal: number;
  toggleBit: (bit: keyof BitVector4) => void;
  setInputDecimal: (dec: number) => void;
  stepIncrement: () => void;
  stepDecrement: () => void;
  isAutoSequencing: boolean;
  setIsAutoSequencing: (active: boolean | ((prev: boolean) => boolean)) => void;
  sequenceSpeedMs: number;
  setSequenceSpeedMs: (speed: number) => void;
  formulaSteps: string[];
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  mode,
  setMode,
  inputBits,
  outputBits,
  inputDecimal,
  outputDecimal,
  toggleBit,
  setInputDecimal,
  stepIncrement,
  stepDecrement,
  isAutoSequencing,
  setIsAutoSequencing,
  sequenceSpeedMs,
  setSequenceSpeedMs,
  formulaSteps,
}) => {
  const isBin2Gray = mode === 'bin2gray';
  const inputLabelPrefix = isBin2Gray ? 'B' : 'G';
  const outputLabelPrefix = isBin2Gray ? 'G' : 'B';

  const bitKeys: (keyof BitVector4)[] = ['b3', 'b2', 'b1', 'b0'];
  const bitIndices = [3, 2, 1, 0];

  return (
    <div className="flex flex-col gap-4 w-full text-slate-200">
      {/* Mode Switcher */}
      <div className="bg-slate-900/90 rounded-2xl p-3 border border-slate-800 shadow-lg">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ArrowRightLeft className="w-3.5 h-3.5 text-sky-400" />
            Conversion Mode
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
            IC 7486 XOR
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
          <button
            onClick={() => setMode('bin2gray')}
            className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
              isBin2Gray
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span className="text-sm font-bold">Binary → Gray</span>
            <span className={`text-[10px] ${isBin2Gray ? 'text-sky-100' : 'text-slate-500'}`}>
              Parallel XOR Logic
            </span>
          </button>

          <button
            onClick={() => setMode('gray2bin')}
            className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
              !isBin2Gray
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span className="text-sm font-bold">Gray → Binary</span>
            <span className={`text-[10px] ${!isBin2Gray ? 'text-emerald-100' : 'text-slate-500'}`}>
              Cascaded Ripple XOR
            </span>
          </button>
        </div>
      </div>

      {/* 4-Bit Inputs Control */}
      <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-semibold text-slate-100">
              4-Bit Input Switches ({isBin2Gray ? 'Binary B₃..B₀' : 'Gray G₃..G₀'})
            </h3>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="text-slate-400">Dec:</span>
            <span className="text-sky-400 font-bold">{inputDecimal}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Hex:</span>
            <span className="text-sky-400 font-bold">0x{inputDecimal.toString(16).toUpperCase()}</span>
          </div>
        </div>

        {/* 4 Large Tactile Toggle Switches */}
        <div className="grid grid-cols-4 gap-2.5 mb-3">
          {bitKeys.map((key, idx) => {
            const bitIdx = bitIndices[idx];
            const isHigh = inputBits[key] === 1;
            const bitLabel = `${inputLabelPrefix}${bitIdx}`;

            return (
              <button
                key={key}
                onClick={() => toggleBit(key)}
                className={`group relative flex flex-col items-center justify-between p-3 rounded-xl border transition-all ${
                  isHigh
                    ? 'bg-slate-800/90 border-sky-500/60 shadow-lg shadow-sky-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full text-[11px] font-mono text-slate-400">
                  <span className="font-bold text-slate-300">{bitLabel}</span>
                  <span className="text-[10px] text-slate-500">2^{bitIdx}</span>
                </div>

                {/* Visual Toggle Switch Component */}
                <div className="my-2 flex flex-col items-center">
                  <div
                    className={`w-10 h-16 rounded-full p-1 flex flex-col justify-between items-center transition-colors ${
                      isHigh ? 'bg-sky-500/30 border border-sky-400' : 'bg-slate-800 border border-slate-700'
                    }`}
                  >
                    <motion.div
                      animate={{ y: isHigh ? 0 : 28 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center font-mono font-bold text-xs ${
                        isHigh
                          ? 'bg-sky-400 text-slate-950 shadow-sky-400/50'
                          : 'bg-slate-600 text-slate-300'
                      }`}
                    >
                      {inputBits[key]}
                    </motion.div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isHigh ? 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]' : 'bg-slate-700'
                    }`}
                  />
                  <span className={isHigh ? 'text-sky-300 font-semibold' : 'text-slate-500'}>
                    {isHigh ? 'HIGH (1)' : 'LOW (0)'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Step & Sequencer Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={stepDecrement}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Previous Input (Decrement)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={stepIncrement}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Next Input (Increment)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setInputDecimal(0)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition-colors"
              title="Reset Input to 0000"
            >
              Clear (0)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoSequencing((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                isAutoSequencing
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30 animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isAutoSequencing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoSequencing ? 'Pause Clock' : 'Auto Clock (0..15)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4-Bit Live Output Display */}
      <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-slate-100">
              Live Converter Output ({isBin2Gray ? 'Gray Code G₃..G₀' : 'Binary B₃..B₀'})
            </h3>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="text-slate-400">Dec:</span>
            <span className="text-emerald-400 font-bold">{outputDecimal}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Hex:</span>
            <span className="text-emerald-400 font-bold">0x{outputDecimal.toString(16).toUpperCase()}</span>
          </div>
        </div>

        {/* Output LED Status Cards */}
        <div className="grid grid-cols-4 gap-2.5">
          {bitKeys.map((key, idx) => {
            const bitIdx = bitIndices[idx];
            const isHigh = outputBits[key] === 1;
            const bitLabel = `${outputLabelPrefix}${bitIdx}`;

            return (
              <div
                key={key}
                className={`flex flex-col items-center justify-between p-3 rounded-xl border transition-all ${
                  isHigh
                    ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between w-full text-[11px] font-mono text-slate-400">
                  <span className="font-bold text-slate-300">{bitLabel}</span>
                  <span className="text-[10px] text-slate-500">{bitIdx === 3 ? 'MSB' : bitIdx === 0 ? 'LSB' : ''}</span>
                </div>

                {/* Glowing LED Output Dome Visual */}
                <div className="my-2.5 relative flex items-center justify-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm transition-all duration-200 ${
                      isHigh
                        ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.8)] scale-105'
                        : 'bg-slate-800 text-slate-500 shadow-none'
                    }`}
                  >
                    {outputBits[key]}
                  </div>
                  {isHigh && (
                    <span className="absolute w-12 h-12 rounded-full border border-emerald-400/50 animate-ping pointer-events-none" />
                  )}
                </div>

                <div className="text-[11px] font-mono">
                  <span className={isHigh ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
                    {isHigh ? '5.0V (HIGH)' : '0.0V (LOW)'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time XOR Logic Derivation Steps */}
      <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-lg">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-sky-400" />
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              XOR Gate Execution Logic
            </h4>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
            {isBin2Gray ? 'G[i] = B[i+1] ⊕ B[i]' : 'B[i] = B[i+1] ⊕ G[i]'}
          </span>
        </div>

        <div className="space-y-1.5 font-mono text-xs">
          {formulaSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 text-slate-300 flex items-center justify-between"
            >
              <span className="text-sky-300 font-medium">{step.split('(')[0]}</span>
              {step.includes('(') && (
                <span className="text-[11px] text-slate-500">({step.split('(')[1]}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
