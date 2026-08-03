import React from 'react';
import { MultimeterState, PlacedComponent } from '../types';
import { COMPONENTS_LIBRARY } from '../data/componentsLibrary';
import { Activity, Zap, Volume2, ShieldAlert, Target } from 'lucide-react';

interface MultimeterOverlayProps {
  multimeter: MultimeterState;
  placedComponents: PlacedComponent[];
  onChangeMode: (mode: 'DCV' | 'LOGIC' | 'CONTINUITY') => void;
  onAttachProbe: (probe: 'red' | 'black', componentId: string, pinId: string) => void;
  onDetachProbe: (probe: 'red' | 'black') => void;
}

export const MultimeterOverlay: React.FC<MultimeterOverlayProps> = ({
  multimeter,
  placedComponents,
  onChangeMode,
  onAttachProbe,
  onDetachProbe,
}) => {
  return (
    <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-4 shadow-2xl text-slate-100 max-w-sm w-full">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-100">Virtual Digital Multimeter</h3>
            <p className="text-[11px] text-slate-400">Benchtop Probe & Meter Unit</p>
          </div>
        </div>
        {multimeter.isBeeping && (
          <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 animate-pulse">
            <Volume2 className="w-3 h-3" />
            <span>BEEP</span>
          </div>
        )}
      </div>

      {/* Digital LCD Screen */}
      <div className="bg-emerald-950/80 border-2 border-emerald-500/40 rounded-lg p-3 text-center mb-4 shadow-inner relative overflow-hidden">
        <div className="text-[10px] uppercase font-mono tracking-widest text-emerald-400/70 mb-0.5 flex justify-between px-1">
          <span>{multimeter.mode}</span>
          <span>{multimeter.isBeeping ? 'BUZZER ACTIVE' : 'MEASURING'}</span>
        </div>
        <div className="text-2xl font-mono font-bold text-emerald-400 tracking-wider font-mono drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
          {multimeter.displayValue}
        </div>
      </div>

      {/* Mode Dial Selector Buttons */}
      <div className="grid grid-cols-3 gap-1.5 mb-4">
        <button
          onClick={() => onChangeMode('DCV')}
          className={`py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all ${
            multimeter.mode === 'DCV'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Zap className="w-3 h-3" />
          DC Voltage
        </button>
        <button
          onClick={() => onChangeMode('LOGIC')}
          className={`py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all ${
            multimeter.mode === 'LOGIC'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Target className="w-3 h-3" />
          Logic Level
        </button>
        <button
          onClick={() => onChangeMode('CONTINUITY')}
          className={`py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all ${
            multimeter.mode === 'CONTINUITY'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Volume2 className="w-3 h-3" />
          Continuity
        </button>
      </div>

      {/* Probes Status & Target Attach Controls */}
      <div className="space-y-2 text-xs">
        {/* Red Probe (+ Positive) */}
        <div className="bg-slate-800/80 rounded-lg p-2.5 border border-red-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50 inline-block"></span>
            <div>
              <div className="font-semibold text-slate-200">Red Probe (+)</div>
              <div className="text-[11px] text-slate-400">
                {multimeter.redProbeAttachedTo
                  ? `${multimeter.redProbeAttachedTo.componentId} -> ${multimeter.redProbeAttachedTo.pinId}`
                  : 'Unattached (Click Pin in 3D or Select below)'}
              </div>
            </div>
          </div>
          {multimeter.redProbeAttachedTo ? (
            <button
              onClick={() => onDetachProbe('red')}
              className="text-[10px] text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-2 py-1 rounded"
            >
              Detach
            </button>
          ) : (
            <select
              onChange={(e) => {
                if (!e.target.value) return;
                const [cId, pId] = e.target.value.split(':');
                onAttachProbe('red', cId, pId);
              }}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-[11px] rounded px-1.5 py-1"
            >
              <option value="">Attach Pin...</option>
              {placedComponents.map((comp) => {
                const meta = COMPONENTS_LIBRARY.find((m) => m.id === comp.componentMetaId);
                return meta?.pins.map((p) => (
                  <option key={`red-${comp.id}-${p.id}`} value={`${comp.id}:${p.id}`}>
                    {comp.label || meta.name} - {p.name}
                  </option>
                ));
              })}
            </select>
          )}
        </div>

        {/* Black Probe (- Ground) */}
        <div className="bg-slate-800/80 rounded-lg p-2.5 border border-blue-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50 inline-block"></span>
            <div>
              <div className="font-semibold text-slate-200">Black Probe (-)</div>
              <div className="text-[11px] text-slate-400">
                {multimeter.blackProbeAttachedTo
                  ? `${multimeter.blackProbeAttachedTo.componentId} -> ${multimeter.blackProbeAttachedTo.pinId}`
                  : 'Unattached (Click Pin in 3D or Select below)'}
              </div>
            </div>
          </div>
          {multimeter.blackProbeAttachedTo ? (
            <button
              onClick={() => onDetachProbe('black')}
              className="text-[10px] text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-2 py-1 rounded"
            >
              Detach
            </button>
          ) : (
            <select
              onChange={(e) => {
                if (!e.target.value) return;
                const [cId, pId] = e.target.value.split(':');
                onAttachProbe('black', cId, pId);
              }}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-[11px] rounded px-1.5 py-1"
            >
              <option value="">Attach Pin...</option>
              {placedComponents.map((comp) => {
                const meta = COMPONENTS_LIBRARY.find((m) => m.id === comp.componentMetaId);
                return meta?.pins.map((p) => (
                  <option key={`black-${comp.id}-${p.id}`} value={`${comp.id}:${p.id}`}>
                    {comp.label || meta.name} - {p.name}
                  </option>
                ));
              })}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};
