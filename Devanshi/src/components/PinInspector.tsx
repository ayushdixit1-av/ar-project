import React from 'react';
import { IC7486Pin, WireConnection } from '../types';
import { Info, Zap, Link, X } from 'lucide-react';

interface PinInspectorProps {
  selectedPin: IC7486Pin | null;
  selectedWire: WireConnection | null;
  onClose: () => void;
}

export const PinInspector: React.FC<PinInspectorProps> = ({
  selectedPin,
  selectedWire,
  onClose,
}) => {
  if (!selectedPin && !selectedWire) return null;

  return (
    <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/80 shadow-2xl text-slate-200 w-full animate-in fade-in slide-in-from-bottom-2 duration-150">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-sky-400" />
          <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
            {selectedPin ? `IC 7486 Pin Inspector` : `Jumper Wire Inspector`}
          </h4>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {selectedPin && (
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <div>
              <span className="font-bold text-sky-400 text-sm">Pin {selectedPin.pinNumber}</span>
              <span className="text-slate-400 ml-2 font-mono">({selectedPin.name})</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <span
                className={`px-2 py-0.5 rounded font-bold ${
                  selectedPin.voltage > 2.5
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {selectedPin.voltage.toFixed(1)}V DC
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-sky-300 font-bold">
                {selectedPin.logicLevel !== null ? `Logic ${selectedPin.logicLevel}` : 'N/A'}
              </span>
            </div>
          </div>

          <div className="text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 font-medium">Function: </span>
            {selectedPin.description}
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[11px] px-1">
            <Link className="w-3 h-3 text-slate-500" />
            <span>Connection: {selectedPin.connectedTo}</span>
          </div>
        </div>
      )}

      {selectedWire && !selectedPin && (
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: selectedWire.color }}
              />
              <span className="font-bold text-slate-100">{selectedWire.label}</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded font-mono font-bold ${
                selectedWire.logicState === 1
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {selectedWire.logicState === 1 ? '5V HIGH' : '0V LOW'}
            </span>
          </div>

          <div className="text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-400">Path: </span>
            {selectedWire.fromName} ➔ {selectedWire.toName}
          </div>

          <div className="text-slate-400 text-[11px] px-1">
            {selectedWire.description}
          </div>
        </div>
      )}
    </div>
  );
};
