import React from 'react';
import { ConverterMode, BitVector4 } from '../types';
import {
  Camera,
  RefreshCw,
  X,
  RotateCw,
  Sparkles,
  Zap,
  ArrowRightLeft,
  AlertCircle,
  HelpCircle,
  Move,
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
  cameraError?: string | null;
  onRetryCamera?: () => void;
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
  cameraError,
  onRetryCamera,
}) => {
  const isBin2Gray = mode === 'bin2gray';
  const bitKeys: (keyof BitVector4)[] = ['b3', 'b2', 'b1', 'b0'];

  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-3 sm:p-4">
      {/* Top AR Header Bar */}
      <div className="flex items-center justify-between pointer-events-auto gap-2">
        <div className="flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-sky-500/50 shadow-2xl text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-slate-100 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            AR Desk Passthrough
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-sky-300 font-mono text-[11px]">Live Camera</span>
        </div>

        {/* Top Right AR Actions */}
        <div className="flex items-center gap-2">
          {hasMultipleCameras && (
            <button
              onClick={onSwitchCamera}
              className="p-2.5 rounded-xl bg-slate-950/85 hover:bg-slate-900 backdrop-blur-md border border-slate-700/80 text-slate-200 shadow-xl transition-all flex items-center gap-1.5 text-xs font-semibold"
              title={`Switch Camera (Currently ${cameraFacing === 'environment' ? 'Rear' : 'Front'})`}
            >
              <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden md:inline">{cameraFacing === 'environment' ? 'Rear' : 'Front'}</span>
            </button>
          )}

          <button
            onClick={onTakeSnapshot}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-slate-950 font-bold text-xs backdrop-blur-md shadow-xl transition-all shadow-sky-500/20"
            title="Take High-Res AR Photo with Breadboard"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Snapshot</span>
          </button>

          <button
            onClick={onExitAR}
            className="p-2.5 rounded-xl bg-rose-950/90 hover:bg-rose-900 backdrop-blur-md border border-rose-700/80 text-rose-200 shadow-xl transition-all"
            title="Exit Augmented Reality"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Camera Error / Warning Banner */}
      {cameraError && (
        <div className="self-center bg-rose-950/95 border border-rose-500/80 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-2xl text-xs text-rose-200 flex items-center gap-2.5 pointer-events-auto max-w-md animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <div className="flex-1">
            <div className="font-bold text-rose-300">Camera Access Notice</div>
            <div className="text-[11px] text-rose-200/90">{cameraError}</div>
          </div>
          {onRetryCamera && (
            <button
              onClick={onRetryCamera}
              className="px-2.5 py-1 rounded-xl bg-rose-800 hover:bg-rose-700 text-white font-bold text-[11px] transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      )}

      {/* AR Surface Alignment Guidance Badge */}
      {!cameraError && (
        <div className="self-center bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-sky-500/40 shadow-xl text-xs text-slate-200 flex items-center gap-2 pointer-events-auto">
          <Move className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <span>Rotate or drag 3D view to place breadboard on your desk</span>
        </div>
      )}

      {/* Bottom AR Control HUD */}
      <div className="flex flex-col gap-2 pointer-events-auto max-w-xl mx-auto w-full">
        {/* AR Scale & Rotation Adjustment Bar */}
        <div className="bg-slate-950/90 backdrop-blur-md p-2.5 rounded-2xl border border-slate-800 shadow-2xl flex items-center justify-between gap-3 text-xs">
          {/* Scale slider */}
          <div className="flex items-center gap-2 flex-1">
            <span className="text-[11px] text-slate-400 font-mono">Scale:</span>
            <input
              type="range"
              min="0.3"
              max="2.0"
              step="0.05"
              value={arScale}
              onChange={(e) => setArScale(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
            <span className="text-[11px] font-mono text-sky-400 w-8 text-right font-bold">
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
            <span className="text-[11px] font-mono text-emerald-400 w-9 text-right font-bold">
              {arRotation}°
            </span>
          </div>

          {/* Quick Mode Toggle */}
          <button
            onClick={() => setMode(isBin2Gray ? 'gray2bin' : 'bin2gray')}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 font-mono text-[11px] border border-slate-700 flex items-center gap-1 transition-all"
          >
            <ArrowRightLeft className="w-3 h-3" />
            <span>{isBin2Gray ? 'Bin➔Gray' : 'Gray➔Bin'}</span>
          </button>
        </div>

        {/* Live Input Bits Floating Controls */}
        <div className="bg-slate-950/95 backdrop-blur-md p-3 rounded-2xl border border-slate-800 shadow-2xl flex items-center justify-between gap-2">
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
          <div className="bg-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 font-bold flex items-center gap-1 shadow-inner">
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
