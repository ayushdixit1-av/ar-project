import React, { useState } from 'react';
import { WireConnection, BreadboardNode, CircuitCheckResult, ConverterMode } from '../types';
import {
  Cable,
  Trash2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Palette,
  Info,
  HelpCircle,
} from 'lucide-react';

interface WiringToolbarProps {
  mode: ConverterMode;
  wires: WireConnection[];
  selectedWire: WireConnection | null;
  activeStartNode: BreadboardNode | null;
  wireColor: string;
  setWireColor: (color: string) => void;
  onAutoWire: () => void;
  onClearWires: () => void;
  onDeleteWire: (wireId: string) => void;
  onCancelWiring: () => void;
  circuitCheck: CircuitCheckResult;
}

const WIRE_COLORS = [
  { name: 'Red (+5V)', hex: '#ef4444' },
  { name: 'Black (GND)', hex: '#1e293b' },
  { name: 'Yellow (B3/G3)', hex: '#eab308' },
  { name: 'Blue (B2/G2)', hex: '#3b82f6' },
  { name: 'Green (B1/G1)', hex: '#22c55e' },
  { name: 'Orange (B0/G0)', hex: '#f97316' },
  { name: 'Cyan (Out 2)', hex: '#06b6d4' },
  { name: 'Purple (Out 1)', hex: '#a855f7' },
  { name: 'Emerald (Out 0)', hex: '#10b981' },
];

export const WiringToolbar: React.FC<WiringToolbarProps> = ({
  mode,
  wires,
  selectedWire,
  activeStartNode,
  wireColor,
  setWireColor,
  onAutoWire,
  onClearWires,
  onDeleteWire,
  onCancelWiring,
  circuitCheck,
}) => {
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  return (
    <div className="flex flex-col gap-2.5 bg-slate-900/90 rounded-2xl p-3 sm:p-4 border border-slate-800 shadow-md">
      {/* Top Row: Wiring Status & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
            <Cable className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 flex items-center gap-2">
              <span>Interactive Breadboard Wiring</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-sky-400 border border-slate-700">
                {wires.length} Wires Connected
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">
              {activeStartNode
                ? `Connecting from "${activeStartNode.label}"... Click target hole!`
                : 'Click any breadboard hole, then click a second hole to place a wire.'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          {activeStartNode && (
            <button
              onClick={onCancelWiring}
              className="px-2.5 py-1 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-medium hover:bg-rose-500/30 transition-colors"
            >
              Cancel
            </button>
          )}

          {selectedWire && (
            <button
              onClick={() => onDeleteWire(selectedWire.id)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-semibold hover:bg-rose-500/30 transition-colors"
              title="Delete Selected Wire"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Wire</span>
            </button>
          )}

          <button
            onClick={onAutoWire}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 font-bold text-xs hover:brightness-110 shadow-md shadow-sky-500/20 transition-all"
            title="Automatically place standard verified jumper wires for this conversion circuit"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auto-Wire</span>
          </button>

          <button
            onClick={onClearWires}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium hover:bg-slate-700 transition-colors"
            title="Remove all jumper wires"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Active Wiring In-Progress Banner */}
      {activeStartNode && (
        <div className="p-2 rounded-xl bg-sky-950/60 border border-sky-500/40 flex items-center justify-between text-xs text-sky-200 animate-pulse">
          <div className="flex items-center gap-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>
              <strong>Step 2 of 2:</strong> Tap target terminal to complete wire from{' '}
              <span className="text-sky-300 font-bold">{activeStartNode.label}</span>
            </span>
          </div>
          <button
            onClick={onCancelWiring}
            className="text-[10px] underline text-sky-400 hover:text-sky-200"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Bottom Controls Row: Color Picker & Circuit Verification Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
        {/* Wire Color Palette */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
            <Palette className="w-3 h-3 text-slate-400" />
            <span>Color:</span>
          </span>
          <div className="flex items-center gap-1">
            {WIRE_COLORS.map((c) => (
              <button
                key={c.hex}
                onClick={() => setWireColor(c.hex)}
                className={`w-5 h-5 rounded-full border transition-all ${
                  wireColor === c.hex
                    ? 'ring-2 ring-sky-400 ring-offset-1 ring-offset-slate-900 scale-110 border-white'
                    : 'border-slate-700 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Circuit Verification Accordion Toggle */}
        <button
          onClick={() => setShowDiagnostics(!showDiagnostics)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
            circuitCheck.isFullyWired
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
              : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
          }`}
        >
          {circuitCheck.isFullyWired ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          )}
          <span>
            Wiring: {circuitCheck.matchedConnections}/{circuitCheck.totalRequired} Connected (
            {circuitCheck.accuracyPercent}%)
          </span>
          {showDiagnostics ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Diagnostics / Guided Checklist Dropdown */}
      {showDiagnostics && (
        <div className="mt-1 p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-200">Circuit Wiring Checklist ({mode === 'bin2gray' ? 'Binary → Gray' : 'Gray → Binary'})</span>
            <span className="font-mono text-[10px] text-slate-400">
              {circuitCheck.matchedConnections} of {circuitCheck.totalRequired} Valid Connections
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                circuitCheck.accuracyPercent === 100
                  ? 'bg-emerald-400'
                  : circuitCheck.accuracyPercent > 50
                  ? 'bg-sky-400'
                  : 'bg-amber-400'
              }`}
              style={{ width: `${circuitCheck.accuracyPercent}%` }}
            />
          </div>

          {/* Checklist Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1 text-[11px]">
            {(circuitCheck?.details || []).map((item) => (
              <div
                key={item.id}
                className={`p-2 rounded-lg border flex items-start gap-2 ${
                  item.status === 'connected'
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                {item.status === 'connected' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0 mt-0.5" />
                )}
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-200">{item.requirement}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {item.fromLabel} ⇄ {item.toLabel}
                  </span>
                  {item.status !== 'connected' && (
                    <span className="text-[10px] text-amber-400/90 mt-0.5">Hint: {item.hint}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
