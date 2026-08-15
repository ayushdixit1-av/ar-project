import React, { useState } from 'react';
import { COMPONENTS_LIBRARY } from '../data/componentsLibrary';
import { ElectronicComponentMeta, PlacedComponent } from '../types';
import {
  Search,
  Plus,
  Trash2,
  Layers,
  Palette,
  Cpu,
  PanelLeftClose,
  PanelLeftOpen,
  Cable,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface LeftSidebarLibraryProps {
  onAddComponent: (meta: ElectronicComponentMeta) => void;
  activeWireColor: string;
  setActiveWireColor: (color: string) => void;
  onClearAllWires: () => void;
  wireCount: number;
  placedComponents?: PlacedComponent[];
  onRemoveComponent?: (id: string) => void;
}

const WIRE_COLORS = [
  { name: '+5V VCC', hex: '#ef4444', label: 'Red' },
  { name: 'GND (0V)', hex: '#3b82f6', label: 'Blue' },
  { name: 'Input A (SW1)', hex: '#eab308', label: 'Yellow' },
  { name: 'Input B (SW2)', hex: '#22c55e', label: 'Green' },
  { name: 'Output Y', hex: '#a855f7', label: 'Purple' },
  { name: 'Signal', hex: '#f97316', label: 'Orange' },
  { name: 'Clock/Test', hex: '#f8fafc', label: 'White' },
];

// Exact 6 ICs requested by the user
const IC_DEFINITIONS = [
  {
    id: 'ic-7400-nand',
    icNumber: '7400',
    gate: 'NAND Gate',
    functionName: 'NOT AND',
    numberOfGates: '4 NAND gates (2-input)',
    logicExpression: 'Y = A·B',
    renderExpression: () => (
      <span className="font-mono font-bold text-amber-300">
        Y = <span className="overline">A · B</span>
      </span>
    ),
    badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    description: 'Output is LOW (0) only when both inputs are HIGH (1). Universal logic gate.',
  },
  {
    id: 'ic-7402-nor',
    icNumber: '7402',
    gate: 'NOR Gate',
    functionName: 'NOT OR',
    numberOfGates: '4 NOR gates (2-input)',
    logicExpression: 'Y = A+B',
    renderExpression: () => (
      <span className="font-mono font-bold text-sky-300">
        Y = <span className="overline">A + B</span>
      </span>
    ),
    badgeColor: 'border-sky-500/40 bg-sky-500/10 text-sky-300',
    description: 'Output is HIGH (1) only when both inputs are LOW (0). Universal logic gate.',
  },
  {
    id: 'ic-7404-not',
    icNumber: '7404',
    gate: 'NOT Gate (Inverter)',
    functionName: 'Complement input',
    numberOfGates: '6 NOT gates',
    logicExpression: 'Y = A',
    renderExpression: () => (
      <span className="font-mono font-bold text-emerald-300">
        Y = <span className="overline">A</span>
      </span>
    ),
    badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    description: 'Inverts the binary logic level: 0 becomes 1, and 1 becomes 0.',
  },
  {
    id: 'ic-7408-and',
    icNumber: '7408',
    gate: 'AND Gate',
    functionName: 'AND operation',
    numberOfGates: '4 AND gates (2-input)',
    logicExpression: 'Y = A · B',
    renderExpression: () => (
      <span className="font-mono font-bold text-blue-300">
        Y = A · B
      </span>
    ),
    badgeColor: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
    description: 'Output is HIGH (1) only when both input A and input B are HIGH (1).',
  },
  {
    id: 'ic-7432-or',
    icNumber: '7432',
    gate: 'OR Gate',
    functionName: 'OR operation',
    numberOfGates: '4 OR gates (2-input)',
    logicExpression: 'Y = A + B',
    renderExpression: () => (
      <span className="font-mono font-bold text-purple-300">
        Y = A + B
      </span>
    ),
    badgeColor: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
    description: 'Output is HIGH (1) if at least one input (A or B) is HIGH (1).',
  },
  {
    id: 'ic-7486-xor',
    icNumber: '7486',
    gate: 'XOR Gate',
    functionName: 'Exclusive OR',
    numberOfGates: '4 XOR gates (2-input)',
    logicExpression: 'Y = A ⊕ B',
    renderExpression: () => (
      <span className="font-mono font-bold text-pink-300">
        Y = A ⊕ B
      </span>
    ),
    badgeColor: 'border-pink-500/40 bg-pink-500/10 text-pink-300',
    description: 'Output is HIGH (1) when inputs differ (01 or 10), LOW (0) when identical.',
  },
];

export const LeftSidebarLibrary: React.FC<LeftSidebarLibraryProps> = ({
  onAddComponent,
  activeWireColor,
  setActiveWireColor,
  onClearAllWires,
  wireCount,
  placedComponents = [],
  onRemoveComponent,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 1024 : false;
  });
  const [activeTab, setActiveTab] = useState<'catalog' | 'active'>('catalog');
  const [searchTerm, setSearchTerm] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const removableComponents = placedComponents.filter(
    (c) => c.id !== 'comp-base' && c.id !== 'comp-bb'
  );

  const filteredICs = IC_DEFINITIONS.filter((ic) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      ic.icNumber.toLowerCase().includes(q) ||
      ic.gate.toLowerCase().includes(q) ||
      ic.functionName.toLowerCase().includes(q) ||
      ic.numberOfGates.toLowerCase().includes(q) ||
      ic.logicExpression.toLowerCase().includes(q)
    );
  });

  const handleAddIC = (icDefId: string) => {
    const meta = COMPONENTS_LIBRARY.find((m) => m.id === icDefId);
    if (meta) {
      onAddComponent(meta);
      setRecentlyAddedId(icDefId);
      setTimeout(() => {
        setRecentlyAddedId(null);
      }, 1200);
    }
  };

  // ==========================================
  // COLLAPSED BAR VIEW
  // ==========================================
  if (isCollapsed) {
    return (
      <aside className="w-14 h-full bg-[#09090e] border-r border-white/10 flex flex-col items-center py-3 gap-4 z-20 shrink-0 transition-all duration-300 select-none">
        {/* Expand Toggle Button */}
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all shadow-lg group relative"
          title="Expand Assets Menu"
        >
          <PanelLeftOpen className="w-5 h-5" />
          <span className="absolute left-full ml-2 px-2.5 py-1 bg-black text-white text-[10px] font-mono rounded border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
            Expand Assets Menu
          </span>
        </button>

        <div className="w-8 h-[1px] bg-white/10" />

        {/* Quick Add ICs (6 ICs) */}
        <div className="flex flex-col gap-2 items-center">
          <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono rotate-[-90deg] my-2">
            Logic ICs
          </span>

          {IC_DEFINITIONS.map((ic) => (
            <button
              key={ic.id}
              onClick={() => handleAddIC(ic.id)}
              className="w-9 h-9 rounded-xl bg-[#111118] border border-white/10 hover:border-blue-500 hover:bg-blue-600/20 text-gray-300 hover:text-blue-300 flex flex-col items-center justify-center font-mono text-[10px] font-bold transition-all relative group shadow-md"
            >
              <span>{ic.icNumber}</span>
              <span className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-blue-300 text-[10px] font-mono rounded border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                Add {ic.icNumber} ({ic.gate})
              </span>
            </button>
          ))}
        </div>

        <div className="w-8 h-[1px] bg-white/10 my-1" />

        {/* Wire Color Selection Vertical Palette */}
        <div className="flex flex-col gap-1.5 items-center">
          <Cable className="w-4 h-4 text-gray-500 mb-1" />
          {WIRE_COLORS.map((color) => (
            <button
              key={color.hex}
              onClick={() => setActiveWireColor(color.hex)}
              className={`w-4 h-4 rounded-full transition-all relative group ${
                activeWireColor === color.hex ? 'ring-2 ring-white scale-125' : 'opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: color.hex }}
            >
              <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-[10px] font-mono rounded border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                Wire: {color.name}
              </span>
            </button>
          ))}
        </div>

        {/* Active Board Count Badge */}
        <div className="mt-auto flex flex-col items-center gap-2">
          <button
            onClick={() => {
              setIsCollapsed(false);
              setActiveTab('active');
            }}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-gray-400 hover:text-white transition-all relative group"
            title="View Active Placed Components"
          >
            <Layers className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-mono font-bold flex items-center justify-center">
              {removableComponents.length}
            </span>
          </button>
        </div>
      </aside>
    );
  }

  // ==========================================
  // EXPANDED FULL SIDEBAR VIEW
  // ==========================================
  return (
    <>
      {/* Mobile Drawer Backdrop */}
      <div
        onClick={() => setIsCollapsed(true)}
        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity"
      />
      <aside className="w-84 h-full bg-[#0a0a0f] border-r border-white/10 flex flex-col selection:bg-blue-500 selection:text-white z-40 shrink-0 transition-all duration-300 max-lg:fixed max-lg:left-0 max-lg:top-14 max-lg:bottom-0 max-lg:w-84 max-sm:w-[88vw] max-lg:shadow-2xl font-sans">
        {/* Header Bar with Mode Switcher & Collapse Toggle */}
        <div className="flex items-center bg-[#0d0d14] border-b border-white/10 p-1.5 gap-1.5">
          <div className="grid grid-cols-2 flex-1 gap-1">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'catalog'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Add Assets</span>
            </button>

            <button
              onClick={() => setActiveTab('active')}
              className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'active'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Active ({removableComponents.length})</span>
            </button>
          </div>

          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all shrink-0"
            title="Collapse Assets Menu"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {activeTab === 'catalog' ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* 1. WIRES MANAGEMENT SECTION */}
            <div className="p-3.5 bg-[#0e0e16] border-b border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-200">
                  <Cable className="w-4 h-4 text-blue-400" />
                  <span>Jumper Wires</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                    {wireCount} {wireCount === 1 ? 'Wire' : 'Wires'}
                  </span>
                  {wireCount > 0 && (
                    <button
                      onClick={onClearAllWires}
                      className="text-[10px] font-mono text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1"
                      title="Remove all wires"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Wire Color Selector Chips */}
              <div>
                <div className="text-[10px] text-gray-400 font-mono mb-1.5 flex items-center justify-between">
                  <span>Select Active Wire Color:</span>
                  <span
                    className="font-bold uppercase text-[9px] px-1.5 py-0.2 rounded"
                    style={{ color: activeWireColor }}
                  >
                    {WIRE_COLORS.find((w) => w.hex === activeWireColor)?.name || 'Active'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {WIRE_COLORS.map((color) => {
                    const isSelected = activeWireColor === color.hex;
                    return (
                      <button
                        key={color.hex}
                        onClick={() => setActiveWireColor(color.hex)}
                        className={`py-1 px-1.5 rounded-lg border text-[10px] font-mono flex items-center gap-1.5 transition-all text-left ${
                          isSelected
                            ? 'border-white bg-white/10 text-white font-bold ring-1 ring-white/50 shadow-sm'
                            : 'border-white/10 bg-[#12121c] text-gray-400 hover:border-white/30 hover:text-gray-200'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="truncate">{color.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Wiring Tip */}
              <div className="p-2 rounded-lg bg-blue-950/30 border border-blue-500/20 text-[10px] text-blue-300/90 font-mono flex items-start gap-1.5 leading-relaxed">
                <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Click a pin on the Trainer Board or Breadboard, then click a target IC pin to connect.
                </span>
              </div>
            </div>

            {/* 2. LOGIC ICs SECTION */}
            <div className="p-3 bg-[#0a0a0f] border-b border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-200">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>Logic Integrated Circuits (TTL)</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  4 IC Sockets
                </span>
              </div>

              {/* Breadboard 4-Socket Capacity Visual Indicator */}
              <div className="p-2 rounded-lg bg-[#141420] border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span>Breadboard Capacity:</span>
                  <span className="font-bold text-white">
                    {removableComponents.length} / 4 ICs Mounted
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {[0, 1, 2, 3].map((slotIdx) => {
                    const IC_SLOT_X_POSITIONS = [-4.05, -1.35, 1.35, 4.05];
                    const targetX = IC_SLOT_X_POSITIONS[slotIdx];
                    const placedInSlot = removableComponents.find(
                      (c) => Math.abs(c.position[0] - targetX) < 0.6
                    );
                    return (
                      <div
                        key={slotIdx}
                        className={`p-1 rounded text-center text-[9px] font-mono border transition-all ${
                          placedInSlot
                            ? 'bg-blue-950/60 border-blue-500/40 text-blue-300 font-bold'
                            : 'bg-black/40 border-white/5 text-gray-500'
                        }`}
                        title={
                          placedInSlot
                            ? `Socket ${slotIdx + 1}: ${placedInSlot.label}`
                            : `Socket ${slotIdx + 1}: Available`
                        }
                      >
                        <span className="block text-[8px] opacity-70">Slot {slotIdx + 1}</span>
                        <span className="truncate block">
                          {placedInSlot
                            ? placedInSlot.label.split(' ')[0]
                            : 'Empty'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Filter 7400, 7408, NAND, OR, XOR..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#12121a] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all font-mono"
                />
              </div>
            </div>

            {/* IC List (Exactly the 6 ICs from user table) */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
              {filteredICs.map((ic) => {
                const isJustAdded = recentlyAddedId === ic.id;
                return (
                  <div
                    key={ic.id}
                    className="p-3 bg-[#11111a] border border-white/10 rounded-xl hover:border-blue-500/40 transition-all flex flex-col gap-2.5 shadow-sm group hover:bg-[#13131e]"
                  >
                    {/* Top Row: IC Number, Gate Name, Add Button */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md font-mono text-xs font-extrabold border ${ic.badgeColor}`}>
                          {ic.icNumber}
                        </span>
                        <div>
                          <h3 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                            {ic.gate}
                          </h3>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddIC(ic.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 shrink-0 ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white shadow-lg'
                            : 'bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600 hover:text-white'
                        }`}
                        title={`Add ${ic.icNumber} (${ic.gate}) to Breadboard`}
                      >
                        {isJustAdded ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add IC</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Middle Info: Function & Gate Count */}
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                      <div className="p-1.5 rounded bg-black/40 border border-white/5">
                        <span className="text-gray-500 block text-[9px] uppercase">Function</span>
                        <span className="text-gray-300 font-semibold">{ic.functionName}</span>
                      </div>

                      <div className="p-1.5 rounded bg-black/40 border border-white/5">
                        <span className="text-gray-500 block text-[9px] uppercase">Number of Gates</span>
                        <span className="text-gray-300 font-semibold">{ic.numberOfGates}</span>
                      </div>
                    </div>

                    {/* Bottom Row: Logic Expression & Package */}
                    <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px]">
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="text-[9px] text-gray-500 uppercase font-semibold">Expression:</span>
                        <div className="px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-xs">
                          {ic.renderExpression()}
                        </div>
                      </div>

                      <span className="text-[10px] text-gray-500 font-mono">
                        DIP-14 • 5V TTL
                      </span>
                    </div>
                  </div>
                );
              })}

              {filteredICs.length === 0 && (
                <div className="text-center py-10 text-xs text-gray-500 font-mono">
                  No logic IC found matching "{searchTerm}".
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ==========================================
             ACTIVE PLACED OBJECTS MANAGEMENT TAB
             ========================================== */
          <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
            <div className="p-3 bg-[#111118] rounded-xl border border-white/10 text-xs text-gray-400 font-mono leading-relaxed">
              Manage ICs currently placed on the breadboard. Click <span className="text-rose-400 font-bold">Remove</span> to detach an IC and clear connected wires.
            </div>

            {removableComponents.length === 0 ? (
              <div className="text-center py-14 text-xs text-gray-500 font-mono space-y-2">
                <Cpu className="w-8 h-8 mx-auto text-gray-600 opacity-50" />
                <p>No ICs currently placed on the breadboard.</p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-mono hover:bg-blue-600 hover:text-white transition-all"
                >
                  Browse Logic ICs
                </button>
              </div>
            ) : (
              removableComponents.map((item) => {
                const icMeta = COMPONENTS_LIBRARY.find((m) => m.id === item.componentMetaId);
                const IC_SLOT_X_POSITIONS = [-4.05, -1.35, 1.35, 4.05];
                const slotIndex = IC_SLOT_X_POSITIONS.findIndex((sx) => Math.abs(sx - item.position[0]) < 0.6);
                const slotLabel = slotIndex !== -1 ? `Socket ${slotIndex + 1}` : 'Breadboard';

                return (
                  <div
                    key={item.id}
                    className="p-3 bg-[#111118] border border-white/10 rounded-xl flex items-center justify-between gap-3 hover:border-blue-500/30 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold">
                          {slotLabel}
                        </span>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-blue-400" />
                          <span>{item.label || icMeta?.name || 'Logic IC'}</span>
                        </h4>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">
                        DIP-14 Package • 5V TTL
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveComponent && onRemoveComponent(item.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-mono font-semibold flex items-center gap-1 transition-all shrink-0"
                      title="Remove IC from breadboard"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </aside>
    </>
  );
};
