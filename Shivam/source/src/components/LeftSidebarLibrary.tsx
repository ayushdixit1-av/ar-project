import React, { useState } from 'react';
import { COMPONENTS_LIBRARY } from '../data/componentsLibrary';
import { ComponentCategory, ElectronicComponentMeta, PlacedComponent } from '../types';
import { Search, Plus, Trash2, Layers, Palette, Cpu, Sparkles, Filter, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface LeftSidebarLibraryProps {
  onAddComponent: (meta: ElectronicComponentMeta) => void;
  activeWireColor: string;
  setActiveWireColor: (color: string) => void;
  onClearAllWires: () => void;
  wireCount: number;
  placedComponents?: PlacedComponent[];
  onRemoveComponent?: (id: string) => void;
}

const CATEGORIES: { label: string; value: ComponentCategory | 'All' }[] = [
  { label: 'All Assets', value: 'All' },
  { label: 'Microcontroller', value: 'Microcontroller' },
  { label: 'Breadboard', value: 'Breadboard' },
  { label: 'Displays', value: 'Display' },
  { label: 'Discretes', value: 'Indicator & Discrete' },
  { label: 'Sensors', value: 'Sensor' },
  { label: 'Actuators', value: 'Actuator' },
  { label: 'Power & Modules', value: 'Module & Power' },
  { label: 'Logic ICs', value: 'Logic & IC' },
];

const WIRE_COLORS = [
  { name: 'Red (+5V)', hex: '#ef4444' },
  { name: 'Blue (GND)', hex: '#3b82f6' },
  { name: 'Yellow (Signal)', hex: '#eab308' },
  { name: 'Green (Data)', hex: '#22c55e' },
  { name: 'Purple (I2C)', hex: '#a855f7' },
  { name: 'White', hex: '#f8fafc' },
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
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | 'All'>('All');

  const removableComponents = placedComponents.filter(
    (c) => c.id !== 'comp-base' && c.id !== 'comp-bb'
  );

  const filteredComponents = COMPONENTS_LIBRARY.filter((comp) => {
    const matchesSearch =
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || comp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // COLLAPSED BAR VIEW
  if (isCollapsed) {
    return (
      <aside className="w-14 h-full bg-[#09090e] border-r border-white/10 flex flex-col items-center py-3 gap-5 z-20 shrink-0 transition-all duration-300 select-none">
        {/* Expand Toggle Button */}
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all shadow-lg group relative"
          title="Expand Component Catalog Menu"
        >
          <PanelLeftOpen className="w-5 h-5" />
          <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-[10px] font-mono rounded border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
            Expand Menu
          </span>
        </button>

        <div className="w-8 h-[1px] bg-white/10 my-1" />

        {/* Quick Add Popular ICs */}
        <div className="flex flex-col gap-2 items-center">
          <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono rotate-[-90deg] my-2">
            Add IC
          </span>

          {[
            { id: 'ic-7408-and', label: '7408 AND' },
            { id: 'ic-7432-or', label: '7432 OR' },
            { id: 'ic-7404-not', label: '7404 NOT' },
            { id: 'ic-7486-xor', label: '7486 XOR' },
            { id: 'ic-7483-adder', label: '7483 Adder' },
            { id: 'ic-74151-mux', label: '74151 MUX' },
            { id: 'ic-7474-flipflop', label: '7474 D-FF' },
          ].map((ic) => {
            const meta = COMPONENTS_LIBRARY.find((m) => m.id === ic.id);
            if (!meta) return null;
            return (
              <button
                key={ic.id}
                onClick={() => onAddComponent(meta)}
                className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 hover:border-blue-500 hover:bg-blue-600/20 text-gray-300 hover:text-blue-300 flex items-center justify-center font-mono text-[10px] font-bold transition-all relative group shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-blue-300 text-[10px] font-mono rounded border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                  Add {ic.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-8 h-[1px] bg-white/10 my-1" />

        {/* Wire Color Selection Vertical Palette */}
        <div className="flex flex-col gap-1.5 items-center">
          <Palette className="w-4 h-4 text-gray-500 mb-1" />
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
                {color.name}
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

  // EXPANDED FULL SIDEBAR VIEW
  return (
    <>
      {/* Mobile Drawer Backdrop */}
      <div
        onClick={() => setIsCollapsed(true)}
        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity"
      />
      <aside className="w-80 h-full bg-[#0a0a0a] border-r border-white/10 flex flex-col selection:bg-blue-500 selection:text-white z-40 shrink-0 transition-all duration-300 max-lg:fixed max-lg:left-0 max-lg:top-14 max-lg:bottom-0 max-lg:w-80 max-sm:w-[85vw] max-lg:shadow-2xl">
      {/* Header Bar with Mode Switcher & Collapse Toggle */}
      <div className="flex items-center bg-[#0e0e14] border-b border-white/10 p-1 gap-1">
        <div className="grid grid-cols-2 flex-1 gap-1">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`py-2 rounded-lg text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'catalog'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Add Assets</span>
          </button>

          <button
            onClick={() => setActiveTab('active')}
            className={`py-2 rounded-lg text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'active'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
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
          title="Collapse Left Menu"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {activeTab === 'catalog' ? (
        <>
          {/* Search Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-mono font-semibold">
                Modular Component Library
              </span>
              <span className="text-[10px] text-blue-400 font-mono">
                {filteredComponents.length} Assets
              </span>
            </div>

            {/* Search Input Box */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
              <input
                type="text"
                placeholder="Search Arduino, LED, LCD, Servo, IC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all font-sans"
              />
            </div>
          </div>

          {/* Category Pills Slider */}
          <div className="px-3 py-2 border-b border-white/10 overflow-x-auto no-scrollbar flex items-center gap-1.5 bg-[#08080c]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono whitespace-nowrap transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-semibold'
                    : 'text-gray-400 hover:text-white border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Wire Palette Bar */}
          <div className="px-4 py-2 bg-[#0c0c12] border-b border-white/10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Palette className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[11px] text-gray-300">Wire Color:</span>
            </div>

            <div className="flex items-center gap-1.5">
              {WIRE_COLORS.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setActiveWireColor(color.hex)}
                  className={`w-4 h-4 rounded-full transition-all ${
                    activeWireColor === color.hex
                      ? 'ring-2 ring-white scale-125'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Component Catalog Grid */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
            {filteredComponents.map((comp) => (
              <div
                key={comp.id}
                className="p-3 bg-[#111118] border border-white/10 rounded-xl hover:border-blue-500/40 transition-all group flex flex-col justify-between gap-2 shadow-sm hover:shadow-blue-900/10"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                      {comp.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-2">{comp.tagline}</p>
                  </div>

                  <button
                    onClick={() => onAddComponent(comp)}
                    className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-all shrink-0 flex items-center gap-1 text-[11px] font-mono font-bold"
                    title={`Add ${comp.name} to Breadboard`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono pt-1 border-t border-white/5">
                  <span className="text-blue-400/80">{comp.category}</span>
                  <span>•</span>
                  <span>Pins: {comp.pins.length}</span>
                  <span>•</span>
                  <span>Rail: {comp.operatingVoltage}</span>
                </div>
              </div>
            ))}

            {filteredComponents.length === 0 && (
              <div className="text-center py-8 text-xs text-gray-500 font-mono">
                No modular components found for "{searchTerm}".
              </div>
            )}
          </div>
        </>
      ) : (
        /* ACTIVE PLACED OBJECTS MANAGEMENT TAB */
        <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
          <div className="p-3 bg-[#111] rounded-xl border border-white/10 text-xs text-gray-400 font-mono">
            Manage components currently installed on the trainer board. Click <span className="text-rose-400 font-bold">Remove</span> to detach an object and clear its wiring.
          </div>

          {removableComponents.length === 0 ? (
            <div className="text-center py-12 text-xs text-gray-500 font-mono">
              No removable components currently placed. Add assets from the library tab above.
            </div>
          ) : (
            removableComponents.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-[#111118] border border-white/10 rounded-xl flex items-center justify-between gap-3 hover:border-blue-500/30 transition-all"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{item.label}</h4>
                  <span className="text-[10px] text-gray-500 font-mono">ID: {item.id}</span>
                </div>

                <button
                  onClick={() => onRemoveComponent && onRemoveComponent(item.id)}
                  className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-mono font-semibold flex items-center gap-1 transition-all"
                  title="Remove component from breadboard"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </aside>
    </>
  );
};
