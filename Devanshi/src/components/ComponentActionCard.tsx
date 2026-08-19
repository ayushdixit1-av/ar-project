import React from 'react';
import { SelectedComponent, BitVector4 } from '../types';
import {
  Trash2,
  Power,
  Move,
  X,
  Cpu,
  ToggleLeft,
  ToggleRight,
  Lightbulb,
  Zap,
  Cable,
  Check,
} from 'lucide-react';

interface ComponentActionCardProps {
  selectedComponent: SelectedComponent;
  onClose: () => void;
  onDeleteIC: (id: string) => void;
  onDeleteSwitch: (id: string) => void;
  onDeleteLED: (id: string) => void;
  onDeleteResistor: (id: string) => void;
  onDeleteWire: (id: string) => void;
  onToggleSwitch: (id: string) => void;
  onStartMoveIC?: (id: string) => void;
  onChangeLEDColor?: (id: string, color: 'red' | 'green' | 'yellow' | 'blue' | 'purple') => void;
}

export const ComponentActionCard: React.FC<ComponentActionCardProps> = ({
  selectedComponent,
  onClose,
  onDeleteIC,
  onDeleteSwitch,
  onDeleteLED,
  onDeleteResistor,
  onDeleteWire,
  onToggleSwitch,
  onStartMoveIC,
  onChangeLEDColor,
}) => {
  if (!selectedComponent) return null;

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-3 animate-in fade-in slide-in-from-bottom-3 duration-200 pointer-events-auto">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-3.5 shadow-2xl ring-1 ring-slate-700/50 flex flex-col gap-2.5 text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            {selectedComponent.type === 'ic' && (
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
            )}
            {selectedComponent.type === 'switch' && (
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Power className="w-4 h-4" />
              </div>
            )}
            {selectedComponent.type === 'led' && (
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
            )}
            {selectedComponent.type === 'resistor' && (
              <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
            )}
            {selectedComponent.type === 'wire' && (
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                <Cable className="w-4 h-4" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {selectedComponent.type.toUpperCase()}
                </span>
                <h4 className="text-xs font-bold text-slate-100">
                  {selectedComponent.type === 'ic' && selectedComponent.data.name}
                  {selectedComponent.type === 'switch' && selectedComponent.data.label}
                  {selectedComponent.type === 'led' && selectedComponent.data.label}
                  {selectedComponent.type === 'resistor' && `330Ω Resistor (${selectedComponent.data.value})`}
                  {selectedComponent.type === 'wire' && `Jumper: ${selectedComponent.data.fromName} → ${selectedComponent.data.toName}`}
                </h4>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-6 h-6 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors"
            title="Close action card (Esc)"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content & Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Component Specific Details */}
          <div className="text-xs text-slate-300 flex items-center gap-3">
            {selectedComponent.type === 'ic' && (
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="text-slate-400">Position:</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-sky-300">
                  Cols {selectedComponent.data.columnStart}–{selectedComponent.data.columnStart + 6}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">DIP-14</span>
              </div>
            )}

            {selectedComponent.type === 'switch' && (
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Status:</span>
                <span
                  className={`px-2 py-0.5 rounded-full font-mono text-[11px] font-bold flex items-center gap-1 ${
                    selectedComponent.data.state === 1
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      selectedComponent.data.state === 1 ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                    }`}
                  />
                  {selectedComponent.data.state === 1 ? 'ON (HIGH / 5V)' : 'OFF (LOW / 0V)'}
                </span>
                {selectedComponent.data.bitKey && (
                  <span className="font-mono text-[11px] text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">
                    Bit {selectedComponent.data.bitKey.toUpperCase()}
                  </span>
                )}
              </div>
            )}

            {selectedComponent.type === 'led' && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-400 font-mono text-[11px]">
                  Col {selectedComponent.data.column}:
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full font-mono text-[11px] font-bold flex items-center gap-1 ${
                    selectedComponent.data.state === 1
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      selectedComponent.data.state === 1 ? 'bg-amber-400 animate-pulse' : 'bg-slate-500'
                    }`}
                  />
                  {selectedComponent.data.state === 1 ? 'LIT (HIGH)' : 'OFF (LOW)'}
                </span>

                {/* Color Selector */}
                {onChangeLEDColor && (
                  <div className="flex items-center gap-1 ml-1">
                    {(['red', 'green', 'yellow', 'blue', 'purple'] as const).map((color) => (
                      <button
                        key={color}
                        onClick={() => onChangeLEDColor(selectedComponent.data.id, color)}
                        className={`w-4 h-4 rounded-full border transition-transform ${
                          color === 'red'
                            ? 'bg-red-500'
                            : color === 'green'
                            ? 'bg-green-500'
                            : color === 'yellow'
                            ? 'bg-yellow-500'
                            : color === 'blue'
                            ? 'bg-blue-500'
                            : 'bg-purple-500'
                        } ${
                          selectedComponent.data.color === color
                            ? 'ring-2 ring-white scale-110 border-white'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                        title={`Set LED Color to ${color}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {selectedComponent.type === 'resistor' && (
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="text-slate-400">Resistance:</span>
                <span className="text-amber-300 font-bold">330 Ω (5% Tol.)</span>
                <span className="text-slate-400">Col {selectedComponent.data.column}</span>
              </div>
            )}

            {selectedComponent.type === 'wire' && (
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span
                  className="w-3 h-3 rounded-full border border-white/40 inline-block"
                  style={{ backgroundColor: selectedComponent.data.color }}
                />
                <span className="text-slate-300">
                  Signal:{' '}
                  <strong className={selectedComponent.data.logicState === 1 ? 'text-emerald-400' : 'text-slate-400'}>
                    {selectedComponent.data.logicState === 1 ? 'HIGH (1)' : 'LOW (0)'}
                  </strong>
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {selectedComponent.type === 'switch' && (
              <button
                onClick={() => onToggleSwitch(selectedComponent.data.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
                  selectedComponent.data.state === 1
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700'
                }`}
              >
                {selectedComponent.data.state === 1 ? (
                  <>
                    <ToggleRight className="w-4 h-4 text-slate-950" />
                    <span>Flip OFF</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-4 h-4 text-emerald-400" />
                    <span>Flip ON</span>
                  </>
                )}
              </button>
            )}

            {selectedComponent.type === 'ic' && onStartMoveIC && (
              <button
                onClick={() => {
                  onStartMoveIC(selectedComponent.data.id);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 flex items-center gap-1.5 transition-all"
              >
                <Move className="w-3.5 h-3.5" />
                <span>Move IC</span>
              </button>
            )}

            {/* Global Delete Button */}
            <button
              onClick={() => {
                if (selectedComponent.type === 'ic') onDeleteIC(selectedComponent.data.id);
                else if (selectedComponent.type === 'switch') onDeleteSwitch(selectedComponent.data.id);
                else if (selectedComponent.type === 'led') onDeleteLED(selectedComponent.data.id);
                else if (selectedComponent.type === 'resistor') onDeleteResistor(selectedComponent.data.id);
                else if (selectedComponent.type === 'wire') onDeleteWire(selectedComponent.data.id);
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500/20 hover:bg-rose-600 hover:text-white text-rose-300 border border-rose-500/40 hover:border-rose-600 flex items-center gap-1.5 transition-all shadow-md shadow-rose-950/30"
              title="Delete this component from breadboard"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete {selectedComponent.type.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
