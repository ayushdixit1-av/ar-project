import React, { useState } from 'react';
import { Play, RotateCcw, Save, Download, Sparkles, Camera, Zap, Power, ChevronDown } from 'lucide-react';
import { soundFx } from '../electronics/soundEffects';

interface NavbarProps {
  powerOn: boolean;
  voltage: number;
  activeExperiment: string;
  onSelectExperiment: (exp: any) => void;
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
  activeExperiment,
  onSelectExperiment,
  onTogglePower,
  onChangeVoltage,
  onResetCircuit,
  onSaveCircuit,
  onLoadCircuit,
  onLoadPreset,
  onOpenAR,
  activeICType,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const EXPERIMENTS = [
    { id: 'GATES', label: 'Exp 1: Logic Gates' },
    { id: 'SOP_POS', label: 'Exp 2: SOP & POS Forms' },
    { id: 'ADDERS', label: 'Exp 3: Adders' },
    { id: 'BIN_TO_GRAY', label: 'Exp 4: Code Converters' },
    { id: 'DECODER_2X4', label: 'Exp 5: 2x4 Decoder' },
    { id: 'MUX_4X1', label: 'Exp 6: 4x1 Multiplexer' },
    { id: 'COMPARATOR_1BIT', label: 'Exp 7: Comparator' },
    { id: 'FF_SR', label: 'Exp 8: Flip-Flops' },
    { id: 'COUNTER_ASYNC', label: 'Exp 9: Ripple Counter' },
    { id: 'REG_PIPO', label: 'Exp 10: Shift Register' },
  ] as const;

  const currentExpLabel = EXPERIMENTS.find(e => e.id === activeExperiment)?.label || 'Select Lab';
  return (
    <header className="h-14 bg-[#161920] border-b border-white/5 text-slate-200 px-6 flex items-center justify-between gap-4 z-20 sticky top-0 shrink-0 shadow-2xl">
      {/* Title & Experiment Selection */}
      <div className="flex items-center gap-6 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500/20 border border-blue-400/50 rounded flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h1 className="font-bold tracking-tight text-sm uppercase italic text-white flex items-center gap-2">
              Virtual Lab
            </h1>
          </div>
        </div>

        {/* Experiment Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#0A0B0E] hover:bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-200 transition-all uppercase tracking-wider shadow-lg"
          >
            <span>{currentExpLabel}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-64 bg-[#12151B]/95 border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 z-50 backdrop-blur-md">
              {EXPERIMENTS.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => {
                    onSelectExperiment(exp.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium transition-all ${
                    activeExperiment === exp.id
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {exp.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preset Gate / Form Selector */}
      {activeExperiment === 'GATES' && (
        <div className="hidden lg:flex items-center gap-1.5 bg-[#0A0B0E] px-2 py-1 rounded-lg border border-white/5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] px-1">Presets:</span>
          {(['7408', '7400', '7432', '7402', '7486', '7404'] as const).map((gate) => (
            <button
              key={gate}
              onClick={() => onLoadPreset(gate)}
              className={`px-2.5 py-1 text-xs font-mono font-bold rounded uppercase tracking-wider transition-all ${
                activeICType === gate
                  ? 'bg-blue-600 text-white shadow-md border border-blue-400/50'
                  : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5'
              }`}
            >
              {gate}
            </button>
          ))}
        </div>
      )}
      {activeExperiment === 'SOP_POS' && (
        <div className="hidden lg:flex items-center gap-1.5 bg-[#0A0B0E] px-2 py-1 rounded-lg border border-white/5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] px-1">Active Form:</span>
          {(['SOP', 'POS'] as const).map((form) => (
            <button
              key={form}
              onClick={() => onLoadPreset(form)}
              className={`px-2.5 py-1 text-xs font-mono font-bold rounded uppercase tracking-wider transition-all ${
                activeICType === form
                  ? 'bg-blue-600 text-white shadow-md border border-blue-400/50'
                  : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5'
              }`}
            >
              {form}
            </button>
          ))}
        </div>
      )}
      {activeExperiment === 'ADDERS' && (
        <div className="hidden lg:flex items-center gap-1.5 bg-[#0A0B0E] px-2 py-1 rounded-lg border border-white/5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] px-1">Adder Mode:</span>
          {(['HALF_ADDER', 'FULL_ADDER'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => onLoadPreset(mode)}
              className={`px-2.5 py-1 text-xs font-mono font-bold rounded uppercase tracking-wider transition-all ${
                activeICType === mode
                  ? 'bg-blue-600 text-white shadow-md border border-blue-400/50'
                  : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5'
              }`}
            >
              {mode === 'HALF_ADDER' ? 'Half' : 'Full'}
            </button>
          ))}
        </div>
      )}

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
