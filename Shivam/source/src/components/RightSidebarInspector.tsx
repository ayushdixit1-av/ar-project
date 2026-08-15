import React, { useState } from 'react';
import {
  PlacedComponent,
  ElectronicComponentMeta,
  SimulationState,
  AppViewMode,
  InteractiveTutorial,
  JumperWire,
} from '../types';
import { COMPONENTS_LIBRARY } from '../data/componentsLibrary';
import { audioSynth } from '../utils/audioSynth';
import {
  Info,
  Zap,
  Activity,
  Cpu,
  PanelRightClose,
  PanelRightOpen,
  Trash2,
  CheckCircle2,
  Sliders,
  Play,
  Sparkles,
} from 'lucide-react';

interface RightSidebarInspectorProps {
  selectedComponent: PlacedComponent | null;
  placedComponents: PlacedComponent[];
  wires: JumperWire[];
  simState: SimulationState;
  setSimState: React.Dispatch<React.SetStateAction<SimulationState>>;
  activeView: AppViewMode;
  setActiveView: (view: AppViewMode) => void;
  onAutoWireTutorial: (tutorial: InteractiveTutorial) => void;
  onRemoveComponent?: (id: string) => void;
  onRemoveWire?: (wireId: string) => void;
}

export const RightSidebarInspector: React.FC<RightSidebarInspectorProps> = ({
  selectedComponent,
  placedComponents,
  wires,
  simState,
  setSimState,
  onRemoveComponent,
  onRemoveWire,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 1024 : false;
  });

  // Get selected component meta data
  const meta: ElectronicComponentMeta | null = selectedComponent
    ? COMPONENTS_LIBRARY.find((c) => c.id === selectedComponent.componentMetaId) || null
    : COMPONENTS_LIBRARY[0];

  // COLLAPSED SIDEBAR VIEW
  if (isCollapsed) {
    return (
      <aside className="w-12 h-full bg-[#0a0a0a] border-l border-white/10 flex flex-col items-center py-3 gap-4 z-20 shrink-0 transition-all duration-300 select-none">
        {/* Expand Toggle Button */}
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all shadow-lg group relative"
          title="Expand Component Inspector"
        >
          <PanelRightOpen className="w-4 h-4" />
          <span className="absolute right-full mr-2 px-2 py-1 bg-black text-white text-[10px] font-mono rounded border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
            Expand Inspector
          </span>
        </button>
      </aside>
    );
  }

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      <div
        onClick={() => setIsCollapsed(true)}
        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity"
      />
      <aside className="w-80 sm:w-88 md:w-96 h-full bg-[#090a0f] border-l border-white/10 flex flex-col selection:bg-blue-500 selection:text-white z-40 shrink-0 transition-all duration-300 max-lg:fixed max-lg:right-0 max-lg:top-14 max-lg:bottom-0 max-sm:w-[85vw] max-lg:shadow-2xl">
        {/* Top Header Strip with Collapse Toggle */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#0d0e14] border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${simState.isPowered ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-600'}`} />
            <span className="text-gray-200 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Component Inspector</span>
            </span>
          </div>
          <button
            onClick={() => setIsCollapsed(true)}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition-all text-[11px] font-mono"
            title="Collapse Inspector Panel"
          >
            <PanelRightClose className="w-3.5 h-3.5 text-blue-400" />
            <span>Collapse</span>
          </button>
        </div>

        {/* Main Body Content */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4 text-xs font-sans">
          {meta && (
            <div className="space-y-4">
              {/* Component Name & Category Badge */}
              <div className="bg-[#11131a] p-3.5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-500/15 text-blue-400 border border-blue-500/30 font-semibold">
                      {meta.category}
                    </span>
                    {meta.icSeries && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                        {meta.icSeries}
                      </span>
                    )}
                  </div>

                  {selectedComponent &&
                    selectedComponent.id !== 'comp-base' &&
                    selectedComponent.id !== 'comp-bb' &&
                    onRemoveComponent && (
                      <button
                        onClick={() => onRemoveComponent(selectedComponent.id)}
                        className="px-2 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 text-[11px] font-mono font-semibold flex items-center gap-1 transition-all"
                        title="Remove selected component from workspace"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    )}
                </div>
                <h2 className="text-sm font-bold text-white tracking-wide">{meta.name}</h2>
                <p className="text-xs text-blue-300/90 mt-1 font-medium">{meta.tagline}</p>
              </div>

              {/* Logic Expression & Gate Details if IC */}
              {meta.logicExpressionDisplay && (
                <div className="p-3 bg-[#11131a] rounded-xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono font-semibold">
                      Boolean Expression
                    </span>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] border border-indigo-500/30 font-bold">
                      {meta.gateFunction || 'LOGIC'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-[#0a0c12] rounded-lg border border-indigo-500/30 text-center">
                    <span className="text-lg font-mono font-bold text-indigo-300 tracking-wider">
                      {meta.logicExpressionDisplay}
                    </span>
                  </div>
                </div>
              )}

              {/* Interactive Truth Table for Logic ICs */}
              {meta.truthTableData && meta.truthTableData.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>Logic Truth Table</span>
                  </span>
                  <div className="border border-white/10 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-center">
                      <thead className="bg-[#141622] text-gray-400 font-mono text-[10px] uppercase border-b border-white/10">
                        <tr>
                          <th className="py-1.5 px-2">Input A</th>
                          {meta.truthTableData[0].b !== undefined && <th className="py-1.5 px-2">Input B</th>}
                          <th className="py-1.5 px-2 text-indigo-400">Output (Y)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 bg-[#0b0d14] font-mono text-[11px]">
                        {meta.truthTableData.map((row, idx) => {
                          const isActiveRow =
                            simState.isPowered &&
                            (simState.inputs ? simState.inputs[0] : false) === (row.a === 1) &&
                            (row.b === undefined ||
                              (simState.inputs ? simState.inputs[1] : false) === (row.b === 1));

                          return (
                            <tr
                              key={idx}
                              className={`transition-colors ${
                                isActiveRow
                                  ? 'bg-indigo-600/30 font-bold text-white shadow-inner'
                                  : 'hover:bg-white/5 text-gray-300'
                              }`}
                            >
                              <td className="py-1.5 px-2">
                                <span className={row.a === 1 ? 'text-emerald-400' : 'text-slate-400'}>
                                  {row.a}
                                </span>
                              </td>
                              {row.b !== undefined && (
                                <td className="py-1.5 px-2">
                                  <span className={row.b === 1 ? 'text-emerald-400' : 'text-slate-400'}>
                                    {row.b}
                                  </span>
                                </td>
                              )}
                              <td className="py-1.5 px-2">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                    row.out === 1
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                      : 'bg-slate-800 text-slate-400'
                                  }`}
                                >
                                  {row.out}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Specifications Cards Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-[#11131a] rounded-lg border border-white/5">
                  <span className="text-[10px] text-gray-400 font-mono block mb-0.5">Supply Voltage</span>
                  <p className="text-xs font-mono font-bold text-emerald-400">{meta.operatingVoltage || '5.0V DC'}</p>
                </div>
                <div className="p-2.5 bg-[#11131a] rounded-lg border border-white/5">
                  <span className="text-[10px] text-gray-400 font-mono block mb-0.5">Logic Levels</span>
                  <p className="text-xs font-mono font-bold text-blue-400">
                    {meta.datasheetSummary?.logicLevels || 'TTL 5V'}
                  </p>
                </div>
              </div>

              {/* Pinout Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono font-semibold">
                    Pinout Diagram ({meta.pins.length} Pins)
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">DIP Package</span>
                </div>
                <div className="border border-white/10 rounded-xl overflow-hidden text-xs max-h-56 overflow-y-auto custom-scrollbar">
                  <table className="w-full text-left">
                    <thead className="bg-[#141622] text-gray-400 font-mono text-[10px] uppercase border-b border-white/10 sticky top-0">
                      <tr>
                        <th className="p-2">Pin</th>
                        <th className="p-2">Type</th>
                        <th className="p-2">Function</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-[#0b0d14]">
                      {meta.pins.map((pin) => (
                        <tr key={pin.id} className="hover:bg-white/5 font-mono">
                          <td className="p-2 font-semibold text-white">{pin.name}</td>
                          <td className="p-2">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                pin.type === 'VCC' || pin.type === 'POWER'
                                  ? 'bg-rose-500/20 text-rose-400'
                                  : pin.type === 'GND'
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : pin.type === 'IN'
                                  ? 'bg-amber-500/20 text-amber-400'
                                  : 'bg-emerald-500/20 text-emerald-400'
                              }`}
                            >
                              {pin.type}
                            </span>
                          </td>
                          <td className="p-2 text-gray-400 text-[11px]">{pin.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Connected Wires Summary */}
              <div className="space-y-2 border-t border-white/10 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono font-semibold flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-blue-400" />
                    <span>Jumper Wires ({wires.length})</span>
                  </span>
                </div>

                {wires.length === 0 ? (
                  <p className="text-xs text-gray-500 font-mono p-2.5 bg-[#0b0d14] rounded-lg border border-white/5">
                    No jumper wires connected yet. Click any terminal to place wires.
                  </p>
                ) : (
                  <div className="space-y-1.5 max-h-40 overflow-y-auto custom-scrollbar">
                    {wires.map((w) => (
                      <div
                        key={w.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#11131a] border border-white/5 text-[11px] font-mono"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                            style={{ backgroundColor: w.color }}
                          />
                          <span className="text-gray-300 truncate">
                            {w.fromPinId} ➔ {w.toPinId}
                          </span>
                        </div>
                        {onRemoveWire && (
                          <button
                            onClick={() => onRemoveWire(w.id)}
                            className="text-gray-500 hover:text-rose-400 p-1 rounded transition-colors shrink-0"
                            title="Remove wire"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
