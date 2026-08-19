import React, { useState } from 'react';
import {
  ToolTab,
  ProbeMode,
  ICComponentInfo,
  WireConnection,
  BitVector4,
  PlacedIC,
  PlacedSwitch,
  PlacedLED,
  PlacedResistor,
  BreadboardNode,
} from '../types';
import { IC_COMPONENTS } from '../data/componentsList';
import { PlacedComponentsList } from './PlacedComponentsList';
import {
  Cpu,
  Sliders,
  Cable,
  Activity,
  Plus,
  Trash2,
  CheckCircle2,
  Zap,
  Sparkles,
  RotateCcw,
  Layers,
  ArrowRight,
  SlidersHorizontal,
} from 'lucide-react';

interface LeftSidebarProps {
  activeTab: ToolTab;
  setActiveTab: (tab: ToolTab) => void;
  selectedIC: ICComponentInfo;
  onSelectIC: (ic: ICComponentInfo) => void;
  probeMode: ProbeMode;
  setProbeMode: (mode: ProbeMode) => void;
  wireColor: string;
  setWireColor: (color: string) => void;
  wires: WireConnection[];
  selectedWire: WireConnection | null;
  onSelectWire: (wire: WireConnection | null) => void;
  onAutoWire: () => void;
  onClearWires: () => void;
  onDeleteWire: (wireId: string) => void;
  inputBits: BitVector4;
  toggleBit: (bitKey: keyof BitVector4) => void;
  probedVoltage: number;
  probedNodeLabel?: string;
  selectedLEDColor: 'red' | 'green' | 'yellow' | 'blue' | 'purple';
  setSelectedLEDColor: (color: 'red' | 'green' | 'yellow' | 'blue' | 'purple') => void;
  // Placed components state & handlers
  placedICs: PlacedIC[];
  onAddIC: (icCode: string, column: number) => void;
  onRemoveIC: (icId: string) => void;
  onMoveIC?: (icId: string, newColumn: number) => void;
  onStartMoveIC?: (icId: string) => void;
  onStartPlacingIC?: (icCode: string) => void;
  placedSwitches: PlacedSwitch[];
  onAddSwitch: (label?: string, column?: number) => void;
  onRemoveSwitch: (switchId: string) => void;
  onToggleSwitch: (switchId: string) => void;
  placedLEDs: PlacedLED[];
  onAddLED: (color: 'red' | 'green' | 'yellow' | 'blue' | 'purple', column?: number) => void;
  onRemoveLED: (ledId: string) => void;
  placedResistors: PlacedResistor[];
  onAddResistor: (value?: string) => void;
  onRemoveResistor: (resistorId: string) => void;
  activeStartNode: BreadboardNode | null;
  onCancelWiring: () => void;
  availableNodes?: BreadboardNode[];
  onConnectCustomHoles?: (fromNodeId: string, toNodeId: string, color: string) => void;
}

const WIRE_PRESETS = [
  { label: '+5V', name: '+5V Power', color: '#ef4444', desc: 'VCC Power' },
  { label: 'GND', name: 'GND Ground', color: '#374151', desc: 'Ground Reference' },
  { label: 'INPUT', name: 'Input A', color: '#eab308', desc: 'Switch Input A' },
  { label: 'INPUT', name: 'Input B', color: '#22c55e', desc: 'Switch Input B' },
  { label: 'OUTPUT', name: 'Output Y', color: '#3b82f6', desc: 'Logic Output Y' },
  { label: 'SIGNAL', name: 'Signal (White)', color: '#f8fafc', desc: 'General Signal' },
  { label: 'BUS', name: 'Bus (Orange)', color: '#f97316', desc: 'Data Line' },
  { label: 'CLOCK', name: 'Clock (Purple)', color: '#a855f7', desc: 'Clock / Control' },
];

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedIC,
  onSelectIC,
  probeMode,
  setProbeMode,
  wireColor,
  setWireColor,
  wires,
  selectedWire,
  onSelectWire,
  onAutoWire,
  onClearWires,
  onDeleteWire,
  inputBits,
  toggleBit,
  probedVoltage,
  probedNodeLabel,
  selectedLEDColor,
  setSelectedLEDColor,
  placedICs,
  onAddIC,
  onRemoveIC,
  onMoveIC,
  onStartMoveIC,
  onStartPlacingIC,
  placedSwitches,
  onAddSwitch,
  onRemoveSwitch,
  onToggleSwitch,
  placedLEDs,
  onAddLED,
  onRemoveLED,
  placedResistors,
  onAddResistor,
  onRemoveResistor,
  activeStartNode,
  onCancelWiring,
  availableNodes = [],
  onConnectCustomHoles,
}) => {
  const [targetColumnForMount, setTargetColumnForMount] = useState<number>(14);

  return (
    <aside className="w-full lg:w-84 flex flex-col bg-slate-900/95 border border-slate-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md">
      {/* 5 Main Tool Tabs */}
      <div className="grid grid-cols-5 border-b border-slate-800 bg-slate-950/60 p-1.5 gap-1">
        <button
          onClick={() => setActiveTab('placed')}
          className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-xl text-[11px] font-semibold transition-all ${
            activeTab === 'placed'
              ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
          title="View and manage all mounted elements"
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span>Placed</span>
        </button>

        <button
          onClick={() => setActiveTab('ics')}
          className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-xl text-[11px] font-semibold transition-all ${
            activeTab === 'ics'
              ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
          title="Component IC Library"
        >
          <Cpu className="w-4 h-4 mb-0.5" />
          <span>ICs</span>
        </button>

        <button
          onClick={() => setActiveTab('io')}
          className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-xl text-[11px] font-semibold transition-all ${
            activeTab === 'io'
              ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
          title="Switches and Output LEDs"
        >
          <Sliders className="w-4 h-4 mb-0.5" />
          <span>I/O</span>
        </button>

        <button
          onClick={() => setActiveTab('wires')}
          className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-xl text-[11px] font-semibold transition-all ${
            activeTab === 'wires'
              ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
          title="Jumper Wires & Wiring Tools"
        >
          <Cable className="w-4 h-4 mb-0.5" />
          <span>Wires</span>
        </button>

        <button
          onClick={() => setActiveTab('meter')}
          className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-xl text-[11px] font-semibold transition-all ${
            activeTab === 'meter'
              ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
          title="Multimeter & Probe Instruments"
        >
          <Activity className="w-4 h-4 mb-0.5" />
          <span>Meter</span>
        </button>
      </div>

      {/* Main Drawer Content */}
      <div className="flex-1 p-3.5 overflow-y-auto max-h-[500px] lg:max-h-[580px] space-y-4 text-xs">
        {/* ================= TAB 0: PLACED COMPONENTS (NEW) ================= */}
        {activeTab === 'placed' && (
          <PlacedComponentsList
            placedICs={placedICs}
            onAddIC={onAddIC}
            onRemoveIC={onRemoveIC}
            onMoveIC={onMoveIC}
            onStartMoveIC={onStartMoveIC}
            onStartPlacingIC={onStartPlacingIC}
            placedSwitches={placedSwitches}
            onAddSwitch={onAddSwitch}
            onRemoveSwitch={onRemoveSwitch}
            onToggleSwitch={onToggleSwitch}
            placedLEDs={placedLEDs}
            onAddLED={onAddLED}
            onRemoveLED={onRemoveLED}
            placedResistors={placedResistors}
            onAddResistor={onAddResistor}
            onRemoveResistor={onRemoveResistor}
            wires={wires}
            selectedWire={selectedWire}
            onSelectWire={onSelectWire}
            onDeleteWire={onDeleteWire}
            onClearWires={onClearWires}
            onAutoWire={onAutoWire}
            activeStartNode={activeStartNode}
            onCancelWiring={onCancelWiring}
            availableNodes={availableNodes}
            onConnectCustomHoles={onConnectCustomHoles}
          />
        )}

        {/* ================= TAB 1: ICs (Component Library) ================= */}
        {activeTab === 'ics' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Component Catalog
              </span>
              <span className="text-[10px] text-sky-400 font-mono">Click to Mount/Inspect</span>
            </div>

            <div className="space-y-2.5">
              {IC_COMPONENTS.map((ic) => {
                const isSelected = selectedIC.id === ic.id;
                const isQuad = ic.code !== '7404' && ic.code !== '74151';
                const badgeLabel = ic.code === '7404' ? 'Hex' : ic.code === '74151' ? 'Mux' : 'Quad';
                const isMounted = placedICs.some((p) => p.icCode === ic.code);

                return (
                  <div
                    key={ic.id}
                    className={`p-3 rounded-xl border transition-all relative group ${
                      isSelected
                        ? 'bg-sky-950/40 border-sky-500/80 shadow-md shadow-sky-500/10'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div
                      onClick={() => onSelectIC(ic)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-slate-100 flex items-center gap-1.5 text-xs">
                          <span className={isSelected ? 'text-sky-400' : 'text-slate-200'}>
                            IC {ic.code}
                          </span>
                          {isMounted && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              MOUNTED
                            </span>
                          )}
                        </h4>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">
                          {badgeLabel}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                        {ic.name} / DIP-14
                      </p>

                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1.5 border-t border-slate-800/80 mb-2">
                        <span>VCC: Pin {ic.datasheet.vccPin}</span>
                        <span>GND: Pin {ic.datasheet.gndPin}</span>
                        <span className="text-sky-400">{ic.gateType} Gate</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        onClick={() => onAddIC(ic.code, targetColumnForMount)}
                        className="flex-1 py-1 px-2 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 font-bold flex items-center justify-center gap-1 text-[10px] transition-colors"
                      >
                        <Plus className="w-3 h-3 text-sky-400" />
                        <span>Mount onto Breadboard</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 2: I/O (Switches & LEDs) ================= */}
        {activeTab === 'io' && (
          <div className="space-y-4">
            {/* Input Switches */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Input Switches
                </span>
                <button
                  onClick={() => onAddSwitch()}
                  className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-[10px] flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Switch</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {placedSwitches.map((sw) => (
                  <div
                    key={sw.id}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-200 text-[11px]">{sw.label}</span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                          sw.state === 1
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {sw.state === 1 ? 'HIGH (1)' : 'LOW (0)'}
                      </span>
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => onToggleSwitch(sw.id)}
                        className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-semibold transition-all border ${
                          sw.state === 1
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-sm'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                        }`}
                      >
                        Toggle
                      </button>
                      <button
                        onClick={() => onRemoveSwitch(sw.id)}
                        className="p-1 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 border border-slate-800"
                        title="Remove switch"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outputs & Resistors */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Discrete 5mm LEDs
                </span>
                <span className="text-[10px] text-slate-500">{placedLEDs.length} mounted</span>
              </div>

              {/* Mount New LED Drawer */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Select LED Color</span>
                  <span className="text-[10px] text-slate-400">Anode/Cathode</span>
                </div>

                <div className="grid grid-cols-5 gap-1.5">
                  {(['red', 'green', 'yellow', 'blue', 'purple'] as const).map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedLEDColor(color)}
                      className={`py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all border ${
                        selectedLEDColor === color
                          ? 'border-sky-400 bg-sky-500/20 text-sky-300 shadow-sm'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => onAddLED(selectedLEDColor)}
                  className="w-full py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-semibold border border-sky-500/40 flex items-center justify-center gap-1 text-[11px] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-sky-400" />
                  <span>Mount {selectedLEDColor.toUpperCase()} LED on Breadboard</span>
                </button>
              </div>

              {/* Placed LEDs List with Remove Buttons */}
              {placedLEDs.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                      Mounted Output LEDs
                    </span>
                    {placedLEDs.length > 1 && (
                      <button
                        onClick={() => {
                          placedLEDs.forEach((led) => onRemoveLED(led.id));
                        }}
                        className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-0.5"
                        title="Remove all mounted LEDs"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove All</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-1">
                    {placedLEDs.map((led) => {
                      const colorHex =
                        led.color === 'red'
                          ? '#ef4444'
                          : led.color === 'green'
                          ? '#22c55e'
                          : led.color === 'yellow'
                          ? '#eab308'
                          : led.color === 'blue'
                          ? '#3b82f6'
                          : '#a855f7';

                      return (
                        <div
                          key={led.id}
                          className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between transition-all hover:border-slate-700"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm shrink-0"
                              style={{ backgroundColor: colorHex }}
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-slate-200 text-[11px]">{led.label}</span>
                                <span className="text-[9px] font-mono text-slate-400 bg-slate-900 px-1 py-0.2 rounded border border-slate-800">
                                  Col {led.column}
                                </span>
                              </div>
                              <span
                                className={`text-[9px] font-mono font-bold ${
                                  led.state === 1 ? 'text-amber-400' : 'text-slate-500'
                                }`}
                              >
                                {led.state === 1 ? '● LIT (HIGH)' : '○ OFF (LOW)'}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveLED(led.id)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 transition-colors flex items-center gap-1 text-[10px]"
                            title={`Remove ${led.label} from breadboard`}
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                            <span className="font-medium text-rose-400">Remove</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 330Ω Resistor */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-200 block">330Ω Resistor</span>
                  <span className="text-[10px] text-slate-400">LED Current Limiter</span>
                </div>
                <button
                  onClick={() => onAddResistor('330Ω')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 transition-colors"
                  title="Add 330Ω Resistor"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: Wires (Palette & Actions) ================= */}
        {activeTab === 'wires' && (
          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono block mb-1">
                Hookup Wires & Hole Connection
              </span>
              <p className="text-[11px] text-slate-400">
                Select wire color, then click 2 holes on the breadboard or IC pins to mount wire.
              </p>
            </div>

            {/* Wire Color Grid */}
            <div className="grid grid-cols-2 gap-2">
              {WIRE_PRESETS.map((preset) => {
                const isActive = wireColor.toLowerCase() === preset.color.toLowerCase();
                return (
                  <button
                    key={preset.name}
                    onClick={() => setWireColor(preset.color)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-slate-800/90 border-sky-400 ring-1 ring-sky-400 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                        {preset.label}
                      </div>
                      <div className="font-semibold text-slate-200 text-xs">{preset.name}</div>
                    </div>
                    <div
                      className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: preset.color }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <button
                onClick={onAutoWire}
                className="w-full py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-sky-500/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Wire Preset Circuit</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onClearWires}
                  className="py-1.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center gap-1 font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Clear All</span>
                </button>

                <button
                  disabled={!selectedWire}
                  onClick={() => selectedWire && onDeleteWire(selectedWire.id)}
                  className={`py-1.5 px-2 rounded-xl border flex items-center justify-center gap-1 font-semibold transition-colors ${
                    selectedWire
                      ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border-rose-500/40'
                      : 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Wire</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: Meter (Multimeter Probe Mode) ================= */}
        {activeTab === 'meter' && (
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
              Multimeter Probe Mode
            </span>

            <div className="space-y-2">
              {/* DC Voltage Probe */}
              <div
                onClick={() => setProbeMode('voltage')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  probeMode === 'voltage'
                    ? 'bg-sky-950/40 border-sky-500/80 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-100 text-xs">DC Voltage Probe</span>
                  {probeMode === 'voltage' && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/40">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">Measure 0.00V to 5.04V logic levels</p>
              </div>

              {/* Continuity Test */}
              <div
                onClick={() => setProbeMode('continuity')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  probeMode === 'continuity'
                    ? 'bg-sky-950/40 border-sky-500/80 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-100 text-xs">Continuity Test</span>
                  {probeMode === 'continuity' && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/40">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">Audio beep test for wiring continuity</p>
              </div>

              {/* Logic Probe */}
              <div
                onClick={() => setProbeMode('logic')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  probeMode === 'logic'
                    ? 'bg-sky-950/40 border-sky-500/80 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-100 text-xs">Logic Probe</span>
                  {probeMode === 'logic' && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/40">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">Instant HIGH (1) / LOW (0) status detector</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Logic Probe Display (Matching Screenshot Bottom Left) */}
      <div className="p-3.5 border-t border-slate-800 bg-slate-950/90 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400">
            Logic Probe Display
          </span>
          {probedNodeLabel && (
            <span className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]">
              {probedNodeLabel}
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold font-mono text-slate-100">
            {probedVoltage.toFixed(2)}
          </span>
          <span className="text-xs font-mono font-bold text-sky-400">VDC</span>
        </div>

        {/* Live Probe Gauge Bar */}
        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-sky-400 transition-all duration-150 rounded-full"
            style={{ width: `${Math.min(100, (probedVoltage / 5.5) * 100)}%` }}
          />
        </div>
      </div>
    </aside>
  );
};
