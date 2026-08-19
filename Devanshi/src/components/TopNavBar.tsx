import React, { useState } from 'react';
import { ExperimentId, ICComponentInfo } from '../types';
import { EXPERIMENTS_LIST } from '../data/experimentsList';
import { IC_COMPONENTS } from '../data/componentsList';
import {
  Zap,
  ChevronDown,
  Download,
  RotateCcw,
  Save,
  Glasses,
  Plus,
  Minus,
  Check,
} from 'lucide-react';

interface TopNavBarProps {
  currentExperiment: ExperimentId;
  onSelectExperiment: (expId: ExperimentId) => void;
  selectedIC: ICComponentInfo;
  onSelectICCode: (code: string) => void;
  psuVoltage: number;
  setPsuVoltage: (val: number | ((prev: number) => number)) => void;
  isSimulationActive: boolean;
  setIsSimulationActive: (active: boolean | ((prev: boolean) => boolean)) => void;
  onSaveCircuit: () => void;
  onDownloadReport: () => void;
  onResetLab: () => void;
  isARModeActive: boolean;
  setIsARModeActive: (active: boolean) => void;
}

const IC_PRESETS = ['7408', '7400', '7432', '7402', '7486', '7404'];

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentExperiment,
  onSelectExperiment,
  selectedIC,
  onSelectICCode,
  psuVoltage,
  setPsuVoltage,
  isSimulationActive,
  setIsSimulationActive,
  onSaveCircuit,
  onDownloadReport,
  onResetLab,
  isARModeActive,
  setIsARModeActive,
}) => {
  const [isExpDropdownOpen, setIsExpDropdownOpen] = useState(false);
  const activeExp = EXPERIMENTS_LIST.find((e) => e.id === currentExperiment) || EXPERIMENTS_LIST[0];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-3 lg:px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Left: Logo & Experiment Dropdown */}
      <div className="flex items-center gap-3">
        {/* Virtual Lab Brand Badge */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center shadow-md">
            <Zap className="w-4 h-4 text-sky-400 fill-sky-400/20" />
          </div>
          <span className="font-extrabold tracking-wider text-slate-100 uppercase text-sm font-mono hidden sm:inline">
            Virtual Lab
          </span>
        </div>

        {/* Experiment Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsExpDropdownOpen(!isExpDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 font-bold transition-colors"
          >
            <span>{activeExp.title}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isExpDropdownOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-72 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 space-y-1">
              {EXPERIMENTS_LIST.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => {
                    onSelectExperiment(exp.id);
                    setIsExpDropdownOpen(false);
                  }}
                  className={`p-2.5 rounded-xl cursor-pointer transition-all ${
                    currentExperiment === exp.id
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs">{exp.title}</div>
                  <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center: IC Quick Presets Bar & Voltage Adjuster */}
      <div className="flex items-center gap-3 overflow-x-auto">
        {/* IC Presets Bar */}
        <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
          <span className="text-[10px] font-mono font-bold text-slate-500 px-1.5 uppercase hidden md:inline">
            Presets:
          </span>
          {IC_PRESETS.map((code) => {
            const isSelected = selectedIC?.code === code;
            return (
              <button
                key={code}
                onClick={() => onSelectICCode(code)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {code}
              </button>
            );
          })}
        </div>

        {/* Voltage Adjuster */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-xl border border-slate-800/80 font-mono">
          <span className="text-[10px] text-slate-400 font-bold">V-ADJ:</span>
          <button
            onClick={() => setPsuVoltage((v) => Math.max(0.0, Number((v - 0.5).toFixed(1))))}
            className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-xs font-bold text-sky-400 min-w-[36px] text-center">
            {psuVoltage.toFixed(1)}V
          </span>
          <button
            onClick={() => setPsuVoltage((v) => Math.min(12.0, Number((v + 0.5).toFixed(1))))}
            className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        {/* Simulation Active Pill */}
        <button
          onClick={() => setIsSimulationActive((prev) => !prev)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] font-bold font-mono transition-all ${
            isSimulationActive
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-sm'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isSimulationActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`}
          />
          <span className="hidden sm:inline">
            {isSimulationActive ? 'SIMULATION ACTIVE' : 'SIMULATION PAUSED'}
          </span>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        {/* Save */}
        <button
          onClick={onSaveCircuit}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-colors shadow-sm"
          title="Save circuit to memory"
        >
          <Save className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">SAVE</span>
        </button>

        {/* Download Snapshot / Report */}
        <button
          onClick={onDownloadReport}
          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          title="Download Lab Report"
        >
          <Download className="w-3.5 h-3.5" />
        </button>

        {/* Reset */}
        <button
          onClick={onResetLab}
          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          title="Reset Workbench"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* View in AR */}
        <button
          onClick={() => setIsARModeActive(!isARModeActive)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
            isARModeActive
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
          }`}
          title="View in Augmented Reality"
        >
          <Glasses className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{isARModeActive ? 'EXIT AR' : 'VIEW IN AR'}</span>
        </button>
      </div>
    </header>
  );
};
