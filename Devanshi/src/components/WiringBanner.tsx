import React from 'react';
import { BreadboardNode } from '../types';
import { Cable, X, Check, ArrowRight } from 'lucide-react';

interface WiringBannerProps {
  activeStartNode: BreadboardNode | null;
  onCancel: () => void;
  wireColor: string;
}

export const WiringBanner: React.FC<WiringBannerProps> = ({
  activeStartNode,
  onCancel,
  wireColor,
}) => {
  if (!activeStartNode) return null;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-3 animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-auto">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-sky-500/60 rounded-2xl p-3 shadow-2xl ring-2 ring-sky-500/30 flex items-center justify-between text-slate-200">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center border shadow-inner animate-pulse"
            style={{ backgroundColor: `${wireColor}33`, borderColor: wireColor }}
          >
            <Cable className="w-4 h-4" style={{ color: wireColor }} />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-100">
              <span className="text-sky-400">Wiring Mode:</span>
              <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sky-300">
                {activeStartNode.label}
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <span className="text-amber-300 animate-pulse">Click 2nd Hole</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Click any destination socket hole to mount jumper wire
            </p>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors border border-slate-700"
          title="Cancel wiring (Esc)"
        >
          <X className="w-3.5 h-3.5" />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
};
