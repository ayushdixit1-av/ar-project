import React, { useState } from 'react';
import { Cpu, ToggleLeft, Lightbulb, Activity, Palette, Plus, HelpCircle } from 'lucide-react';
import { ICType, WireColor } from '../types/electronics';
import { IC_DEFINITIONS } from '../electronics/icDefinitions';

interface ComponentLibraryProps {
  onAddIC: (type: ICType) => void;
  onAddSwitch: (label: string) => void;
  onAddLED: (color: 'red' | 'green' | 'yellow' | 'blue') => void;
  onAddResistor: () => void;
  selectedWireColor: WireColor;
  onSelectWireColor: (color: WireColor) => void;
  multimeterMode: 'VOLTAGE' | 'CONTINUITY' | 'LOGIC';
  onSelectMultimeterMode: (mode: 'VOLTAGE' | 'CONTINUITY' | 'LOGIC') => void;
  activeICType: ICType;
}

const WIRE_COLORS: { color: WireColor; label: string; hex: string }[] = [
  { color: 'red', label: '+5V Power', hex: '#ef4444' },
  { color: 'black', label: 'GND Ground', hex: '#18181b' },
  { color: 'yellow', label: 'Input A', hex: '#eab308' },
  { color: 'green', label: 'Input B', hex: '#22c55e' },
  { color: 'blue', label: 'Output Y', hex: '#3b82f6' },
  { color: 'white', label: 'Signal', hex: '#f8fafc' },
];

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({
  onAddIC,
  onAddSwitch,
  onAddLED,
  onAddResistor,
  selectedWireColor,
  onSelectWireColor,
  multimeterMode,
  onSelectMultimeterMode,
  activeICType,
}) => {
  const [activeTab, setActiveTab] = useState<'ics' | 'inputs' | 'wires' | 'meter'>('ics');

  return (
    <aside className="w-72 bg-[#12151B] border-r border-white/5 text-slate-200 flex flex-col h-[calc(100vh-56px-32px)] z-10 shrink-0 select-none">
      {/* Category Tabs */}
      <div className="grid grid-cols-4 bg-[#0A0B0E] p-1.5 border-b border-white/5 gap-1 text-xs font-medium">
        <button
          onClick={() => setActiveTab('ics')}
          className={`flex flex-col items-center py-2 rounded transition-all text-[11px] ${
            activeTab === 'ics' ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 mb-1" />
          ICs
        </button>
        <button
          onClick={() => setActiveTab('inputs')}
          className={`flex flex-col items-center py-2 rounded transition-all text-[11px] ${
            activeTab === 'inputs' ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ToggleLeft className="w-3.5 h-3.5 mb-1" />
          I/O
        </button>
        <button
          onClick={() => setActiveTab('wires')}
          className={`flex flex-col items-center py-2 rounded transition-all text-[11px] ${
            activeTab === 'wires' ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5 mb-1" />
          Wires
        </button>
        <button
          onClick={() => setActiveTab('meter')}
          className={`flex flex-col items-center py-2 rounded transition-all text-[11px] ${
            activeTab === 'meter' ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5 mb-1" />
          Meter
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-slate-800">
        {/* ICs Tab */}
        {activeTab === 'ics' && (
          <div>
            <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
              Component Library
            </h2>
            <div className="space-y-2.5">
              {(Object.keys(IC_DEFINITIONS) as ICType[]).map((type) => {
                const def = IC_DEFINITIONS[type];
                const isActive = activeICType === type;
                return (
                  <div
                    key={type}
                    onClick={() => onAddIC(type)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-blue-500/10 border-blue-500/50 text-white'
                        : 'bg-white/5 border-white/10 hover:border-blue-500/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-xs font-bold ${isActive ? 'text-blue-400' : 'text-white group-hover:text-blue-400'}`}>
                        IC {def.name}
                      </span>
                      <span className="text-[9px] px-1 bg-blue-500/20 text-blue-400 rounded border border-blue-500/20 font-mono">
                        {def.fullName.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500">{def.fullName} / DIP-14</p>
                    <div className="mt-2 text-[9px] font-mono text-slate-400 bg-black/40 p-1.5 rounded border border-white/5 flex justify-between">
                      <span>VCC: Pin 14</span>
                      <span>GND: Pin 7</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* I/O Components Tab */}
        {activeTab === 'inputs' && (
          <div className="space-y-5">
            {/* Input Switches */}
            <div>
              <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
                Input Switches
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onAddSwitch('Input A')}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left hover:border-blue-500/50 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white group-hover:text-blue-400">Switch A</span>
                    <Plus className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">SPST Toggle</span>
                </button>
                <button
                  onClick={() => onAddSwitch('Input B')}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left hover:border-blue-500/50 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white group-hover:text-blue-400">Switch B</span>
                    <Plus className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">SPST Toggle</span>
                </button>
              </div>
            </div>

            {/* Output LEDs & Resistors */}
            <div>
              <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
                Outputs & Resistors
              </h2>
              <div className="space-y-2">
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Output LED</span>
                    <span className="text-[10px] text-slate-500">Select Color</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['red', 'green', 'yellow', 'blue'] as const).map((c) => (
                      <button
                        key={c}
                        onClick={() => onAddLED(c)}
                        className="py-1.5 rounded text-[10px] font-mono font-bold capitalize border border-white/10 hover:border-white transition-all uppercase"
                        style={{
                          backgroundColor:
                            c === 'red' ? '#ef444420' : c === 'green' ? '#22c55e20' : c === 'yellow' ? '#eab30820' : '#3b82f620',
                          color: c === 'red' ? '#ef4444' : c === 'green' ? '#22c55e' : c === 'yellow' ? '#eab308' : '#3b82f6',
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onAddResistor}
                  className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left hover:border-blue-500/50 transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="font-bold text-xs text-white group-hover:text-blue-400">330Ω Resistor</span>
                    <span className="text-[10px] text-slate-500 block">LED Overcurrent Protection</span>
                  </div>
                  <Plus className="w-4 h-4 text-blue-400" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Wires Tab */}
        {activeTab === 'wires' && (
          <div>
            <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
              Hookup Wires
            </h2>
            <p className="text-[10px] text-slate-500 mb-3 leading-relaxed">
              Select wire color, then click 2 holes on the breadboard to place wire.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {WIRE_COLORS.map((wc) => (
                <div
                  key={wc.color}
                  onClick={() => onSelectWireColor(wc.color)}
                  className={`p-3 rounded-lg border flex flex-col justify-between cursor-pointer transition-all ${
                    selectedWireColor === wc.color
                      ? 'bg-blue-500/20 border-blue-500 text-white shadow-md'
                      : 'bg-white/5 border-white/10 hover:border-white/30 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold font-mono uppercase">{wc.label.split(' ')[0]}</span>
                    <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: wc.hex }} />
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono">{wc.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Multimeter Tab */}
        {activeTab === 'meter' && (
          <div>
            <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
              Multimeter Probe Mode
            </h2>
            <div className="space-y-2">
              {[
                { mode: 'VOLTAGE', name: 'DC Voltage Probe', desc: 'Measure 0.00V to 5.04V logic level' },
                { mode: 'CONTINUITY', name: 'Continuity Test', desc: 'Audio beep test for connections' },
                { mode: 'LOGIC', name: 'Logic Probe', desc: 'Instant HIGH (1) / LOW (0) status' },
              ].map((m) => (
                <div
                  key={m.mode}
                  onClick={() => onSelectMultimeterMode(m.mode as any)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    multimeterMode === m.mode
                      ? 'bg-blue-500/20 border-blue-500 text-white shadow-md'
                      : 'bg-white/5 border-white/10 hover:border-white/30 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{m.name}</span>
                    {multimeterMode === m.mode && (
                      <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/20 px-1.5 py-0.5 rounded border border-blue-500/20">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Multimeter / Logic Probe Box matching design HTML */}
      <div className="p-4 bg-blue-500/5 border-t border-white/5 border-b-0 shrink-0">
        <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">
          Logic Probe Display
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-mono text-white font-bold">5.04</span>
          <span className="text-xs font-mono text-blue-400">VDC</span>
        </div>
        <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 w-[98%]" />
        </div>
      </div>
    </aside>
  );
};
