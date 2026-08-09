import React from 'react';
import { Play, RotateCcw, Save, Download, Sparkles, Camera, Zap, Power } from 'lucide-react';
import { soundFx } from '../electronics/soundEffects';

interface NavbarProps {
  powerOn: boolean;
  voltage: number;
  onTogglePower: () => void;
  onChangeVoltage: (newVoltage: number) => void;
  onResetCircuit: () => void;
  onSaveCircuit: () => void;
  onLoadCircuit: () => void;
  onLoadPreset: (icType: any) => void;
  onOpenAR: () => void;
  activeICType: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  powerOn,
  voltage,
  onTogglePower,
  onChangeVoltage,
  onResetCircuit,
  onSaveCircuit,
  onLoadCircuit,
  onLoadPreset,
  onOpenAR,
  activeICType,
}) => {
  return (
    <header className="h-14 bg-[#161920] border-b border-white/5 text-slate-200 px-6 flex items-center justify-between gap-4 z-20 sticky top-0 shrink-0 shadow-2xl">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500/20 border border-blue-400/50 rounded flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <h1 className="font-bold tracking-tight text-base sm:text-lg uppercase italic text-white flex items-center gap-2">
            Virtual Electronics Training Lab
            <span className="text-[10px] bg-blue-500/20 text-blue-400 font-mono px-2 py-0.5 rounded border border-blue-500/30 not-italic uppercase tracking-widest">
              EXP-01
            </span>
          </h1>
        </div>
      </div>

      {/* Preset Gate Selector */}
      <div className="hidden lg:flex items-center gap-1.5 bg-[#0A0B0E] px-2 py-1 rounded-lg border border-white/5">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] px-1">IC Presets:</span>
        {(['7408', '7400', '7432', '7402', '7486', '7404'] as const).map((gate) => (
          <button
            key={gate}
            onClick={() => onLoadPreset(gate)}
            className={`px-2.5 py-1 text-xs font-mono font-bold rounded uppercase tracking-wider transition-all ${
              activeICType === gate
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 border border-blue-400/50'
                : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5'
            }`}
          >
            {gate}
          </button>
        ))}
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* Voltage Adjustment widget */}
        <div className="flex items-center gap-1.5 bg-[#0A0B0E] px-2 py-1 rounded-lg border border-white/5 font-mono text-xs">
          <span className="text-[10px] text-slate-500 uppercase font-bold">V-ADJ:</span>
          <button
            onClick={() => onChangeVoltage(Math.max(1.0, parseFloat((voltage - 0.5).toFixed(1))))}
            className="px-1.5 py-0.5 bg-white/5 hover:bg-white/10 text-white rounded border border-white/5 font-bold"
            title="Decrease voltage by 0.5V"
          >
            -
          </button>
          <span className="font-bold text-blue-400 w-12 text-center">{voltage.toFixed(1)}V</span>
          <button
            onClick={() => onChangeVoltage(Math.min(15.0, parseFloat((voltage + 0.5).toFixed(1))))}
            className="px-1.5 py-0.5 bg-white/5 hover:bg-white/10 text-white rounded border border-white/5 font-bold"
            title="Increase voltage by 0.5V"
          >
            +
          </button>
        </div>

        {/* Simulation Active / Power Pill */}
        <button
          onClick={() => {
            soundFx.playPowerToggle(!powerOn);
            onTogglePower();
          }}
          className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-widest transition-all ${
            powerOn
              ? 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20'
              : 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
          }`}
          title="Click to toggle power supply"
        >
          <div className={`w-2 h-2 rounded-full ${powerOn ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`} />
          <span className="font-bold">{powerOn ? 'SIMULATION ACTIVE' : 'POWER OFF'}</span>
        </button>

        <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSaveCircuit}
            title="Save Circuit"
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded uppercase tracking-wider transition-colors shadow-md shadow-blue-500/20 flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button
            onClick={onLoadCircuit}
            title="Load Saved Circuit"
            className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold rounded border border-white/10 uppercase transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onResetCircuit}
            title="Reset Circuit"
            className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded border border-red-500/20 uppercase transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenAR}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded border border-white/10 uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden md:inline">View in AR</span>
          </button>
        </div>
      </div>
    </header>
  );
};
