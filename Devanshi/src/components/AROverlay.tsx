import React from 'react';
import { ConverterMode, BitVector4, BitValue } from '../types';
import {
  Camera,
  RefreshCw,
  X,
  Maximize,
  Sliders,
  Move,
  RotateCw,
  Sparkles,
  Zap,
  ArrowRightLeft,
  Download,
} from 'lucide-react';

interface AROverlayProps {
  mode: ConverterMode;
  setMode: (mode: ConverterMode) => void;
  inputBits: BitVector4;
  outputBits: BitVector4;
  toggleBit: (bit: keyof BitVector4) => void;
  onExitAR: () => void;
  onSwitchCamera: () => void;
  onTakeSnapshot: () => void;
  arScale: number;
  setArScale: (scale: number) => void;
  arRotation: number;
  setArRotation: (rot: number) => void;
  hasMultipleCameras: boolean;
  cameraFacing: 'environment' | 'user';
  isWebXRActive?: boolean;
}

export const AROverlay: React.FC<AROverlayProps> = ({
  mode,
  setMode,
  inputBits,
  outputBits,
  toggleBit,
  onExitAR,
  onSwitchCamera,
  onTakeSnapshot,
  arScale,
  setArScale,
  arRotation,
  setArRotation,
  hasMultipleCameras,
  cameraFacing,
  isWebXRActive,
}) => {
  const isBin2Gray = mode === 'bin2gray';
  const bitKeys: (keyof BitVector4)[] = ['b3', 'b2', 'b1', 'b0'];

  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-3 sm:p-4">
      {/* Top AR Header Bar */}
      <div className="flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700/80 shadow-2xl text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-slate-100 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            AR Lab Mode Active
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 font-mono text-[11px]">Table Pass-Through</span>
        </div>

        {/* Top Right AR Actions */}
        <div className="flex items-center gap-2">
          {hasMultipleCameras && (
            <button
              onClick={onSwitchCamera}
              className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md border border-slate-700/80 text-slate-200 shadow-xl transition-all"
              title={`Switch Camera (Currently ${cameraFacing === 'environment' ? 'Rear' : 'Front'})`}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onTakeSnapshot}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-500/90 hover:bg-sky-400 text-slate-950 font-bold text-xs backdrop-blur-md shadow-xl transition-all"
            title="Take High-Res AR Photo"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Snapshot</span>
          </button>

          <button
            onClick={onExitAR}
            className="p-2.5 rounded-xl bg-rose-950/80 hover:bg-rose-900/90 backdrop-blur-md border border-rose-700/80 text-rose-200 shadow-xl transition-all"
            title="Exit Augmented Reality"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* AR Surface Tap Placement Helper Badge */}
      <div className="self-center bg-slate-950/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-700/60 shadow-xl text-xs text-slate-300 flex items-center gap-2">
        <Move className="w-3.5 h-3.5 text-sky-400 animate-bounce" />
        <span>Drag / Rotate to align breadboard with your real table surface</span>
      </div>

      {/* Bottom AR Control HUD */}
      <div className="flex flex-col gap-2 pointer-events-auto max-w-xl mx-auto w-full">
        {/* AR Scale & Rotation Adjustment Bar */}
        <div className="bg-slate-950/85 backdrop-blur-md p-2.5 rounded-2xl border border-slate-800 shadow-2xl flex items-center justify-between gap-3 text-xs">
          {/* Scale slider */}
          <div className="flex items-center gap-2 flex-1">
            <span className="text-[11px] text-slate-400 font-mono">Scale:</span>
            <input
              type="range"
              min="0.3"
              max="1.8"
              step="0.05"
              value={arScale}
              onChange={(e) => setArScale(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
            <span className="text-[11px] font-mono text-sky-400 w-8 text-right">
              {arScale.toFixed(1)}x
            </span>
          </div>

          {/* Rotation slider */}
          <div className="flex items-center gap-2 flex-1 border-l border-slate-800 pl-3">
            <RotateCw className="w-3 h-3 text-slate-400" />
            <input
              type="range"
              min="0"
              max="360"
              step="5"
              value={arRotation}
              onChange={(e) => setArRotation(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <span className="text-[11px] font-mono text-emerald-400 w-9 text-right">
              {arRotation}°
            </span>
          </div>

          {/* Quick Mode Toggle */}
          <button
            onClick={() => setMode(isBin2Gray ? 'gray2bin' : 'bin2gray')}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 font-mono text-[11px] border border-slate-700 flex items-center gap-1"
          >
            <ArrowRightLeft className="w-3 h-3" />
            <span>{isBin2Gray ? 'Bin➔Gray' : 'Gray➔Bin'}</span>
          </button>
        </div>

        {/* Live Input Bits Floating Controls */}
        <div className="bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 shadow-2xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-200">
              {isBin2Gray ? 'Inputs (B₃..B₀):' : 'Inputs (G₃..G₀):'}
            </span>
          </div>

          {/* 4 Quick Toggle Buttons */}
          <div className="grid grid-cols-4 gap-2 flex-1 max-w-xs">
            {bitKeys.map((k, idx) => {
              const bitIdx = 3 - idx;
              const isHigh = inputBits[k] === 1;
              const label = `${isBin2Gray ? 'B' : 'G'}${bitIdx}`;

              return (
                <button
                  key={k}
                  onClick={() => toggleBit(k)}
                  className={`py-1.5 px-2 rounded-xl font-mono text-xs font-bold transition-all border flex items-center justify-center gap-1 ${
                    isHigh
                      ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/30 scale-105'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span>{label}:</span>
                  <span>{inputBits[k]}</span>
                </button>
              );
            })}
          </div>

          {/* Output Mini Summary Pill */}
          <div className="bg-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              OUT: {outputBits.b3}
              {outputBits.b2}
              {outputBits.b1}
              {outputBits.b0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
