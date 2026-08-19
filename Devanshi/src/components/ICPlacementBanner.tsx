import React from 'react';
import { Cpu, X, Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface ICPlacementBannerProps {
  isPlacingIC: boolean;
  icCode: string;
  icName?: string;
  column: number;
  onSetColumn: (col: number) => void;
  onConfirmPlace: () => void;
  onCancel: () => void;
  isMovingExisting?: boolean;
}

export const ICPlacementBanner: React.FC<ICPlacementBannerProps> = ({
  isPlacingIC,
  icCode,
  icName = 'DIP-14 Logic IC',
  column,
  onSetColumn,
  onConfirmPlace,
  onCancel,
  isMovingExisting = false,
}) => {
  if (!isPlacingIC) return null;

  const minCol = 1;
  const maxCol = 24; // 30 - 6 = 24 for 7-pin DIP

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-3 animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-auto">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-sky-500/70 rounded-2xl p-3 shadow-2xl ring-2 ring-sky-500/30 text-slate-200 space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/40 flex items-center justify-center shadow-inner animate-pulse shrink-0">
              <Cpu className="w-4 h-4" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-100">
                <span className="text-sky-400">
                  {isMovingExisting ? 'Repositioning IC:' : 'Mounting IC (Ghost Preview):'}
                </span>
                <span className="font-mono bg-sky-950 text-sky-300 border border-sky-500/30 px-1.5 py-0.5 rounded text-[11px]">
                  74HC{icCode}
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Faded chip moves parallel in trough. Move mouse or use stepper.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={onConfirmPlace}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-lg shadow-sky-500/25 transition-all"
              title="Place IC at current column"
            >
              <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
              <span>Mount Here</span>
            </button>

            <button
              onClick={onCancel}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors"
              title="Cancel placement (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Column Position Adjuster */}
        <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">Breadboard Span:</span>
            <div className="flex items-center gap-1 font-mono font-bold text-sky-300 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800 text-[11px]">
              <span>Cols {column}</span>
              <span className="text-slate-500">→</span>
              <span>{column + 6}</span>
              <span className="text-[10px] font-normal text-slate-400 ml-1">(Pins 1-14)</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onSetColumn(Math.max(minCol, column - 1))}
              disabled={column <= minCol}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
              title="Move 1 column left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] text-slate-300 px-1 font-semibold">Col {column}</span>
            <button
              onClick={() => onSetColumn(Math.min(maxCol, column + 1))}
              disabled={column >= maxCol}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
              title="Move 1 column right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
