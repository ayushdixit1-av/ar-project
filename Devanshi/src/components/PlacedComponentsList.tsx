import React, { useState } from 'react';
import {
  PlacedIC,
  PlacedSwitch,
  PlacedLED,
  PlacedResistor,
  WireConnection,
  ICComponentInfo,
  BreadboardNode,
} from '../types';
import { IC_COMPONENTS } from '../data/componentsList';
import {
  Cpu,
  Sliders,
  Zap,
  Trash2,
  Plus,
  Cable,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Layers,
  HelpCircle,
  Eye,
  SlidersHorizontal,
  Move,
} from 'lucide-react';

interface PlacedComponentsListProps {
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
  wires: WireConnection[];
  selectedWire: WireConnection | null;
  onSelectWire: (wire: WireConnection | null) => void;
  onDeleteWire: (wireId: string) => void;
  onClearWires: () => void;
  onAutoWire: () => void;
  onOpenAddWireModal?: () => void;
  activeStartNode: BreadboardNode | null;
  onCancelWiring: () => void;
  availableNodes?: BreadboardNode[];
  onConnectCustomHoles?: (fromNodeId: string, toNodeId: string, color: string) => void;
}

export const PlacedComponentsList: React.FC<PlacedComponentsListProps> = ({
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
  wires,
  selectedWire,
  onSelectWire,
  onDeleteWire,
  onClearWires,
  onAutoWire,
  activeStartNode,
  onCancelWiring,
  availableNodes = [],
  onConnectCustomHoles,
}) => {
  const [isAddingIC, setIsAddingIC] = useState(false);
  const [selectedICCodeToAdd, setSelectedICCodeToAdd] = useState('7408');
  const [selectedColToAdd, setSelectedColToAdd] = useState(14);

  const [isAddingLED, setIsAddingLED] = useState(false);
  const [ledColorToAdd, setLedColorToAdd] = useState<'red' | 'green' | 'yellow' | 'blue' | 'purple'>('red');
  const [ledColToAdd, setLedColToAdd] = useState(24);

  const [isManualWireOpen, setIsManualWireOpen] = useState(false);
  const [manualFromId, setManualFromId] = useState('');
  const [manualToId, setManualToId] = useState('');
  const [manualWireColor, setManualWireColor] = useState('#38bdf8');

  const totalComponents = placedICs.length + placedSwitches.length + placedLEDs.length + placedResistors.length + wires.length;

  const handleCreateIC = () => {
    onAddIC(selectedICCodeToAdd, selectedColToAdd);
    setIsAddingIC(false);
  };

  const handleStartInteractivePlace = () => {
    if (onStartPlacingIC) {
      onStartPlacingIC(selectedICCodeToAdd);
    } else {
      handleCreateIC();
    }
  };

  const handleCreateLED = () => {
    onAddLED(ledColorToAdd, ledColToAdd);
    setIsAddingLED(false);
  };

  const handleCreateManualWire = () => {
    if (manualFromId && manualToId && onConnectCustomHoles) {
      onConnectCustomHoles(manualFromId, manualToId, manualWireColor);
      setIsManualWireOpen(false);
      setManualFromId('');
      setManualToId('');
    }
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Summary Pill */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase font-bold text-sky-400 block">
            Mounted Elements
          </span>
          <span className="text-slate-300 font-medium text-[11px]">
            {totalComponents} elements on workbench
          </span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={onAutoWire}
            title="Auto-wire standard circuit"
            className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 hover:bg-sky-500/30 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClearWires}
            title="Clear all wires"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Active Wiring in progress banner */}
      {activeStartNode && (
        <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-200 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <div>
              <div className="font-bold text-[11px]">Wiring Mode Active</div>
              <div className="text-[10px] text-amber-300">Start: {activeStartNode.label}</div>
            </div>
          </div>
          <button
            onClick={onCancelWiring}
            className="px-2 py-1 bg-amber-500/30 hover:bg-amber-500/50 rounded-lg text-[10px] font-bold border border-amber-400"
          >
            Cancel
          </button>
        </div>
      )}

      {/* ================= 1. MOUNTED ICs ================= */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-300 font-bold text-[11px] uppercase tracking-wider font-mono">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>Mounted IC Chips ({placedICs.length})</span>
          </div>
          <button
            onClick={() => setIsAddingIC(!isAddingIC)}
            className="px-2 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 border border-sky-500/40 font-bold flex items-center gap-1 text-[10px] transition-all"
          >
            <Plus className="w-3 h-3" />
            <span>Add IC</span>
          </button>
        </div>

        {/* Add IC Drawer */}
        {isAddingIC && (
          <div className="p-3 rounded-xl bg-slate-950 border border-sky-500/50 space-y-2.5 shadow-lg">
            <div className="font-bold text-sky-300 text-[11px] flex items-center justify-between">
              <span>Mount New IC Chip</span>
              <span className="text-[10px] text-slate-400">14-Pin DIP</span>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Select IC Type:</label>
              <select
                value={selectedICCodeToAdd}
                onChange={(e) => setSelectedICCodeToAdd(e.target.value)}
                className="w-full p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono"
              >
                {IC_COMPONENTS.map((ic) => (
                  <option key={ic.id} value={ic.code}>
                    IC {ic.code} - {ic.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">
                Placement Column (1 to 24):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={selectedColToAdd}
                  onChange={(e) => setSelectedColToAdd(parseInt(e.target.value))}
                  className="flex-1 accent-sky-500"
                />
                <span className="font-mono font-bold text-sky-400 w-12 text-right">
                  Col {selectedColToAdd}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => setIsAddingIC(false)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 text-[11px]"
              >
                Cancel
              </button>
              <button
                onClick={handleStartInteractivePlace}
                className="px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-[11px] shadow-sm flex items-center gap-1"
              >
                <Move className="w-3 h-3" />
                <span>Place Parallel (Ghost)</span>
              </button>
            </div>
          </div>
        )}

        {/* Placed ICs List */}
        {placedICs.length === 0 ? (
          <div className="p-2.5 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-slate-500 text-center text-[11px]">
            No ICs mounted. Click &quot;+ Add IC&quot; to place one.
          </div>
        ) : (
          <div className="space-y-1.5">
            {placedICs.map((ic) => {
              const matchedIC = IC_COMPONENTS.find((item) => item.code === ic.icCode);
              return (
                <div
                  key={ic.id}
                  className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex items-center justify-between group transition-all"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-100 font-mono text-[11px]">
                        IC {ic.icCode}
                      </span>
                      <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800 text-sky-300 border border-slate-700">
                        Col {ic.columnStart}–{ic.columnStart + 6}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">
                      {matchedIC?.name || ic.name || 'DIP-14 Logic IC'}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        if (onStartMoveIC) {
                          onStartMoveIC(ic.id);
                        } else if (onStartPlacingIC) {
                          onStartPlacingIC(ic.icCode);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-sky-500/20 text-slate-400 hover:text-sky-400 border border-slate-800 hover:border-sky-500/40 transition-colors"
                      title="Slide / Reposition IC parallel on breadboard"
                    >
                      <Move className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onRemoveIC(ic.id)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 transition-colors"
                      title="Remove IC from breadboard"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= 2. MOUNTED SWITCHES ================= */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-300 font-bold text-[11px] uppercase tracking-wider font-mono">
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mounted Switches ({placedSwitches.length})</span>
          </div>
          <button
            onClick={() => onAddSwitch()}
            className="px-2 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 font-bold flex items-center gap-1 text-[10px] transition-all"
          >
            <Plus className="w-3 h-3" />
            <span>Add Switch</span>
          </button>
        </div>

        {placedSwitches.length === 0 ? (
          <div className="p-2.5 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-slate-500 text-center text-[11px]">
            No switches mounted. Click &quot;+ Add Switch&quot; to place one.
          </div>
        ) : (
          <div className="space-y-1.5">
            {placedSwitches.map((sw) => (
              <div
                key={sw.id}
                className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleSwitch(sw.id)}
                    className={`px-2 py-1 rounded-lg font-mono font-bold text-[10px] border transition-all ${
                      sw.state === 1
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-sm'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {sw.state === 1 ? 'HIGH (1)' : 'LOW (0)'}
                  </button>
                  <span className="font-semibold text-slate-200 text-[11px]">{sw.label}</span>
                </div>

                <button
                  onClick={() => onRemoveSwitch(sw.id)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= 3. MOUNTED LEDs & RESISTORS ================= */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-300 font-bold text-[11px] uppercase tracking-wider font-mono">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Mounted LEDs & 330Ω ({placedLEDs.length})</span>
          </div>
          <div className="flex items-center gap-1">
            {placedLEDs.length > 1 && (
              <button
                onClick={() => {
                  placedLEDs.forEach((led) => onRemoveLED(led.id));
                }}
                className="px-2 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-semibold flex items-center gap-1 text-[10px] transition-all"
                title="Remove all mounted LEDs"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove All</span>
              </button>
            )}
            <button
              onClick={() => setIsAddingLED(!isAddingLED)}
              className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1 text-[10px] transition-all"
            >
              <Plus className="w-3 h-3" />
              <span>Add LED</span>
            </button>
          </div>
        </div>

        {/* Add LED Drawer */}
        {isAddingLED && (
          <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/50 space-y-2.5 shadow-lg">
            <span className="font-bold text-amber-300 text-[11px] block">
              Mount 5mm Discrete LED
            </span>
            <div className="grid grid-cols-5 gap-1">
              {(['red', 'green', 'yellow', 'blue', 'purple'] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => setLedColorToAdd(color)}
                  className={`py-1 rounded text-[9px] font-bold uppercase transition-all border ${
                    ledColorToAdd === color
                      ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                      : 'border-slate-800 bg-slate-900 text-slate-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => setIsAddingLED(false)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 text-[11px]"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateLED}
                className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px]"
              >
                Mount LED
              </button>
            </div>
          </div>
        )}

        {placedLEDs.length === 0 ? (
          <div className="p-2.5 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-slate-500 text-center text-[11px]">
            No LEDs mounted. Click &quot;+ Add LED&quot; to place one.
          </div>
        ) : (
          <div className="space-y-1.5">
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
                  className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-all"
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
        )}
      </div>

      {/* ================= 4. JUMPER WIRES ================= */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-300 font-bold text-[11px] uppercase tracking-wider font-mono">
            <Cable className="w-3.5 h-3.5 text-sky-400" />
            <span>Jumper Wires ({wires.length})</span>
          </div>
          <button
            onClick={() => setIsManualWireOpen(!isManualWireOpen)}
            className="px-2 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 border border-sky-500/40 font-bold flex items-center gap-1 text-[10px] transition-all"
          >
            <Plus className="w-3 h-3" />
            <span>Connect Holes</span>
          </button>
        </div>

        {/* Connect Holes Drawer */}
        {isManualWireOpen && (
          <div className="p-3 rounded-xl bg-slate-950 border border-sky-500/50 space-y-2 shadow-lg">
            <span className="font-bold text-sky-300 text-[11px] block">
              Connect Any 2 Holes / Pins
            </span>

            <div>
              <label className="text-[10px] text-slate-400 block mb-0.5">From Hole / Pin:</label>
              <select
                value={manualFromId}
                onChange={(e) => setManualFromId(e.target.value)}
                className="w-full p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono"
              >
                <option value="">Select Origin Hole...</option>
                {availableNodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.label} ({node.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-0.5">To Hole / Pin:</label>
              <select
                value={manualToId}
                onChange={(e) => setManualToId(e.target.value)}
                className="w-full p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono"
              >
                <option value="">Select Destination Hole...</option>
                {availableNodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.label} ({node.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => setIsManualWireOpen(false)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 text-[11px]"
              >
                Cancel
              </button>
              <button
                disabled={!manualFromId || !manualToId}
                onClick={handleCreateManualWire}
                className="px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-[11px]"
              >
                Connect Wire
              </button>
            </div>
          </div>
        )}

        {/* Wires List */}
        {wires.length === 0 ? (
          <div className="p-2.5 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-slate-500 text-center text-[11px]">
            No wires connected. Click holes on 3D breadboard or &quot;Auto-Wire&quot;.
          </div>
        ) : (
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {wires.map((w) => {
              const isSelected = selectedWire?.id === w.id;
              return (
                <div
                  key={w.id}
                  onClick={() => onSelectWire(isSelected ? null : w)}
                  className={`p-2 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 shadow-sm'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <div
                      className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: w.color }}
                    />
                    <div className="truncate">
                      <div className="font-semibold text-slate-200 text-[10px] truncate">
                        {w.fromName} ➔ {w.toName}
                      </div>
                      <div className="text-[9px] font-mono text-slate-500">
                        {w.category || 'signal'} • {w.logicState === 1 ? 'HIGH (1)' : 'LOW (0)'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteWire(w.id);
                    }}
                    className="p-1 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 border border-slate-800 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
