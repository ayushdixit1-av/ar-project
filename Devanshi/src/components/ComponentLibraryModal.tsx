import React, { useState } from 'react';
import { IC_COMPONENTS } from '../data/componentsList';
import { ICComponentInfo } from '../types';
import { Cpu, X, Check, Search, ExternalLink, Zap, Layers, Sparkles } from 'lucide-react';

interface ComponentLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIC: ICComponentInfo;
  onSelectIC: (ic: ICComponentInfo) => void;
}

export const ComponentLibraryModal: React.FC<ComponentLibraryModalProps> = ({
  isOpen,
  onClose,
  selectedIC = IC_COMPONENTS[0],
  onSelectIC,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [inspectedIC, setInspectedIC] = useState<ICComponentInfo>(() => selectedIC || IC_COMPONENTS[0]);

  if (!isOpen) return null;

  const categories = ['All', 'Logic Gates', 'Multiplexers & Decoders'];

  const filteredComponents = IC_COMPONENTS.filter((ic) => {
    const matchesSearch =
      ic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ic.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>Integrated Circuit (IC) Component Library</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {IC_COMPONENTS.length} IC Models
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Browse, inspect pinouts, and swap IC chips on your virtual breadboard
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Left Column Component Browser, Right Column IC Datasheet/Pinout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left: Component List (5 cols) */}
          <div className="md:col-span-5 border-r border-slate-800 flex flex-col p-4 gap-3 bg-slate-950/40 overflow-y-auto">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search IC (e.g. 7486, 7408, XOR)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Component Cards */}
            <div className="flex flex-col gap-2 mt-1">
              {filteredComponents.map((ic) => {
                const isMounted = selectedIC?.id === ic.id;
                const isInspected = inspectedIC?.id === ic.id;

                return (
                  <div
                    key={ic.id}
                    onClick={() => setInspectedIC(ic)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isInspected
                        ? 'bg-sky-950/40 border-sky-500/60 shadow-md ring-1 ring-sky-500/30'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                          {ic.code}
                        </span>
                        <h4 className="text-xs font-semibold text-slate-200">{ic.name}</h4>
                      </div>
                      {isMounted && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Mounted
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{ic.description}</p>
                    <div className="flex items-center gap-2 mt-2 font-mono text-[10px] text-slate-400">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {ic.packageType}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-sky-300">
                        {ic.gateType} Logic
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed IC Pinout & Datasheet (7 cols) */}
          <div className="md:col-span-7 p-5 flex flex-col gap-4 overflow-y-auto bg-slate-900/60">
            {/* Header info */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-100">{inspectedIC?.name}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    {inspectedIC?.code}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{inspectedIC?.description}</p>
              </div>

              {/* Mount / Insert Button */}
              <button
                onClick={() => {
                  if (inspectedIC) onSelectIC(inspectedIC);
                  onClose();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 ${
                  selectedIC?.id === inspectedIC?.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : 'bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 hover:brightness-110 shadow-sky-500/20'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>
                  {selectedIC?.id === inspectedIC?.id
                    ? 'Currently on Breadboard'
                    : 'Insert onto Breadboard'}
                </span>
              </button>
            </div>

            {/* Quick Specs Cards */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Logic Formula</span>
                <span className="font-mono font-bold text-sky-400 text-xs mt-0.5 block truncate">
                  {inspectedIC.formula}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Supply Voltage</span>
                <span className="font-mono text-emerald-400 text-xs mt-0.5 block">
                  {inspectedIC.datasheet.supplyVoltage}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Propagation Delay</span>
                <span className="font-mono text-amber-400 text-xs mt-0.5 block">
                  {inspectedIC.datasheet.propDelay}
                </span>
              </div>
            </div>

            {/* 14-Pin / 16-Pin DIP Interactive Pinout Layout */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  <span>DIP-{inspectedIC.pinsCount} Pinout Configuration</span>
                </h4>
                <span className="text-[10px] text-slate-400 font-mono">
                  VCC: Pin {inspectedIC.datasheet.vccPin} • GND: Pin {inspectedIC.datasheet.gndPin}
                </span>
              </div>

              {/* Visual IC Chip Package Representation */}
              <div className="relative py-4 px-6 bg-slate-900/90 rounded-xl border border-slate-700/80 flex flex-col items-center">
                {/* Notch on left */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-6 rounded-r-full bg-slate-950 border-r border-slate-700" />

                {/* Top Row Pins */}
                <div className="w-full flex justify-between gap-1 mb-2">
                  {inspectedIC.pins
                    .slice(Math.floor(inspectedIC.pins.length / 2))
                    .reverse()
                    .map((pin) => (
                      <div
                        key={pin.pinNumber}
                        className="flex-1 flex flex-col items-center p-1 rounded bg-slate-800/80 border border-slate-700 text-center"
                        title={pin.description}
                      >
                        <span className="text-[9px] font-mono text-slate-400">P{pin.pinNumber}</span>
                        <span
                          className={`text-[10px] font-bold font-mono ${
                            pin.type === 'power'
                              ? 'text-rose-400'
                              : pin.type === 'ground'
                              ? 'text-slate-400'
                              : pin.type === 'output'
                              ? 'text-emerald-400'
                              : 'text-sky-400'
                          }`}
                        >
                          {pin.name}
                        </span>
                      </div>
                    ))}
                </div>

                {/* IC Chip Body label */}
                <div className="w-full py-1 text-center font-mono font-bold text-xs text-slate-300 border-y border-dashed border-slate-700/60 my-1">
                  {inspectedIC.name} • {inspectedIC.family}
                </div>

                {/* Bottom Row Pins */}
                <div className="w-full flex justify-between gap-1 mt-2">
                  {inspectedIC.pins.slice(0, Math.floor(inspectedIC.pins.length / 2)).map((pin) => (
                    <div
                      key={pin.pinNumber}
                      className="flex-1 flex flex-col items-center p-1 rounded bg-slate-800/80 border border-slate-700 text-center"
                      title={pin.description}
                    >
                      <span
                        className={`text-[10px] font-bold font-mono ${
                          pin.type === 'power'
                            ? 'text-rose-400'
                            : pin.type === 'ground'
                            ? 'text-slate-400'
                            : pin.type === 'output'
                            ? 'text-emerald-400'
                            : 'text-sky-400'
                        }`}
                      >
                        {pin.name}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">P{pin.pinNumber}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pin Detail Table */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] max-h-48 overflow-y-auto pr-1">
                {inspectedIC.pins.map((pin) => (
                  <div
                    key={pin.pinNumber}
                    className="flex items-center justify-between py-1 border-b border-slate-800/60"
                  >
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="text-slate-400">Pin {pin.pinNumber}:</span>
                      <span className="font-bold text-slate-200">{pin.name}</span>
                    </div>
                    <span className="text-slate-400 truncate max-w-[140px]" title={pin.description}>
                      {pin.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
