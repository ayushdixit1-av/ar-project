import React from 'react';
import { PlacedComponent, JumperWire, ElectronicComponentMeta } from '../types';
import { COMPONENTS_LIBRARY } from '../data/componentsLibrary';
import { Cpu, Trash2, Plus, Zap, Layers, X, Sparkles, AlertCircle } from 'lucide-react';

interface ActiveItemsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  placedComponents: PlacedComponent[];
  wires: JumperWire[];
  onAddComponent: (meta: ElectronicComponentMeta) => void;
  onRemoveComponent: (id: string) => void;
  onRemoveWire: (wireId: string) => void;
  onClearAllWires: () => void;
}

// Popular IC quick add options
const QUICK_ICS = [
  { id: 'ic-7408-and', label: '7408 (AND)', color: 'border-blue-500/50 bg-blue-950/40 text-blue-300' },
  { id: 'ic-7400-nand', label: '7400 (NAND)', color: 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300' },
  { id: 'ic-7432-or', label: '7432 (OR)', color: 'border-purple-500/50 bg-purple-950/40 text-purple-300' },
  { id: 'ic-7404-not', label: '7404 (NOT)', color: 'border-amber-500/50 bg-amber-950/40 text-amber-300' },
  { id: 'ic-7486-xor', label: '7486 (XOR)', color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300' },
  { id: 'ic-7402-nor', label: '7402 (NOR)', color: 'border-rose-500/50 bg-rose-950/40 text-rose-300' },
  { id: 'ic-555-timer', label: '555 Timer', color: 'border-indigo-500/50 bg-indigo-950/40 text-indigo-300' },
];

export const ActiveItemsMenu: React.FC<ActiveItemsMenuProps> = ({
  isOpen,
  onClose,
  placedComponents,
  wires,
  onAddComponent,
  onRemoveComponent,
  onRemoveWire,
  onClearAllWires,
}) => {
  if (!isOpen) return null;

  // Filter out the base platform and breadboard
  const removableComponents = placedComponents.filter(
    (c) => c.id !== 'comp-base' && c.id !== 'comp-bb'
  );

  // Helper to resolve pin human names
  const resolvePinName = (compId: string, pinId: string) => {
    if (compId === 'comp-base' || compId === 'trainer-board-base') {
      if (pinId.startsWith('tb-in')) {
        const swNum = pinId.replace('tb-in', '');
        return `SW${swNum} (Switch ${swNum})`;
      }
      if (pinId.startsWith('tb-out')) {
        const outNum = pinId.replace('tb-out', '');
        return `OUT${outNum} (LED ${outNum})`;
      }
      if (pinId.includes('vcc')) return '+5V Rail';
      if (pinId.includes('gnd')) return 'GND Rail';
      return pinId;
    }

    const comp = placedComponents.find((c) => c.id === compId);
    if (!comp) return `${compId}:${pinId}`;
    const meta = COMPONENTS_LIBRARY.find((m) => m.id === comp.componentMetaId);
    const pinMeta = meta?.pins.find((p) => p.id === pinId);
    
    const compShortName = comp.label.split(' ')[0] || 'IC';
    if (pinMeta) {
      return `${compShortName} (${pinMeta.name.replace(/Pin \d+ \((.*)\)/, '$1')})`;
    }
    return `${compShortName} (${pinId})`;
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#0e0e14] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-[#13131c]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                Active Items & Wiring Inventory
              </h2>
              <p className="text-xs text-gray-400">
                Manage ICs, components, and jumper wires currently placed on the trainer board
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Add IC Bar */}
        <div className="p-4 bg-[#111118] border-b border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-amber-400 font-mono font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              1-Click Quick Add IC to Middle of Breadboard:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {QUICK_ICS.map((ic) => {
              const meta = COMPONENTS_LIBRARY.find((m) => m.id === ic.id);
              if (!meta) return null;

              return (
                <button
                  key={ic.id}
                  onClick={() => onAddComponent(meta)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 shadow-md ${ic.color}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{ic.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
          
          {/* SECTION 1: INSTALLED ICs & COMPONENTS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs uppercase tracking-wider text-blue-400 font-mono font-bold flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                Active IC Chips & Components ({removableComponents.length})
              </span>
            </div>

            {removableComponents.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-white/10 rounded-xl bg-slate-950/40 text-xs text-gray-400 font-mono space-y-1">
                <p className="text-gray-300 font-semibold">No IC chips placed yet.</p>
                <p className="text-gray-500">Click any IC button above or select from the left catalog to add an IC to the middle of the breadboard.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {removableComponents.map((comp) => {
                  const meta = COMPONENTS_LIBRARY.find((m) => m.id === comp.componentMetaId);

                  return (
                    <div
                      key={comp.id}
                      className="p-3 bg-[#161622] border border-white/10 rounded-xl flex items-center justify-between gap-3 hover:border-blue-500/40 transition-all shadow-md group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-xs shrink-0">
                          DIP
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                            {comp.label}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono mt-0.5">
                            <span>Pins: {meta?.pins.length || 14}</span>
                            <span>•</span>
                            <span className="text-blue-400">Centered</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveComponent(comp.id)}
                        className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-all flex items-center gap-1 text-xs font-mono font-semibold shrink-0"
                        title="Delete IC and detach all wires"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* SECTION 2: CONNECTED JUMPER WIRES */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-bold flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                Active Connected Jumper Wires ({wires.length})
              </span>

              {wires.length > 0 && (
                <button
                  onClick={onClearAllWires}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-mono font-semibold flex items-center gap-1 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All Wires</span>
                </button>
              )}
            </div>

            {wires.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-white/10 rounded-xl bg-slate-950/40 text-xs text-gray-400 font-mono space-y-1">
                <p className="text-gray-300 font-semibold">No jumper wires connected.</p>
                <p className="text-gray-500">
                  To connect wires: Click <span className="text-blue-400">Point 1</span> (e.g. SW1), then click <span className="text-blue-400">Point 2</span> (e.g. IC Pin 1).
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {wires.map((wire, idx) => {
                  const fromLabel = resolvePinName(wire.fromComponentId, wire.fromPinId);
                  const toLabel = resolvePinName(wire.toComponentId, wire.toPinId);

                  return (
                    <div
                      key={wire.id}
                      className="p-3 bg-[#161622] border border-white/10 rounded-xl flex items-center justify-between gap-3 hover:border-emerald-500/40 transition-all shadow-md"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        {/* Wire Color Badge */}
                        <div
                          className="w-4 h-4 rounded-full border border-white/40 shrink-0 shadow-sm"
                          style={{ backgroundColor: wire.color }}
                        />

                        <div className="font-mono text-xs text-white truncate flex items-center gap-2">
                          <span className="text-emerald-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-white/10">
                            {fromLabel}
                          </span>
                          <span className="text-gray-400 font-bold">➔</span>
                          <span className="text-blue-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-white/10">
                            {toLabel}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveWire(wire.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-all text-xs font-mono flex items-center gap-1 shrink-0"
                        title="Delete this wire"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#13131c] border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Real-time Digital Circuit Simulator</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all shadow-lg"
          >
            Close Menu
          </button>
        </div>

      </div>
    </div>
  );
};
