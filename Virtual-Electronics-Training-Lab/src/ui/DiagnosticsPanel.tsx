import React from 'react';
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { DiagnosticError } from '../types/electronics';

interface DiagnosticsPanelProps {
  diagnostics: DiagnosticError[];
  isShortCircuit: boolean;
}

export const DiagnosticsPanel: React.FC<DiagnosticsPanelProps> = ({ diagnostics, isShortCircuit }) => {
  if (diagnostics.length === 0 && !isShortCircuit) return null;

  return (
    <div className="fixed bottom-12 left-80 right-80 max-w-lg mx-auto z-20 space-y-2 pointer-events-none">
      {isShortCircuit && (
        <div className="pointer-events-auto p-3 bg-red-500/10 border border-red-500/30 backdrop-blur-md rounded-lg shadow-2xl flex items-start gap-2.5 animate-bounce">
          <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-bold text-red-400 uppercase mb-0.5">SHORT CIRCUIT DETECTED!</p>
            <p className="text-[11px] text-red-200/80 leading-relaxed italic">
              +5V power supply is connected directly to Ground! Turn off power immediately and disconnect the shorting wire.
            </p>
          </div>
        </div>
      )}

      {diagnostics.map((diag) => (
        <div
          key={diag.id}
          className={`pointer-events-auto backdrop-blur-md border rounded-lg p-3 text-xs shadow-2xl flex items-start gap-2.5 transition-all ${
            diag.severity === 'error'
              ? 'bg-red-500/10 border-red-500/20 text-red-200'
              : diag.severity === 'warning'
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-200'
              : 'bg-blue-500/10 border-blue-500/20 text-blue-200'
          }`}
        >
          {diag.severity === 'error' ? (
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          ) : diag.severity === 'warning' ? (
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-[10px] font-bold text-red-400 uppercase mb-0.5">{diag.title}</p>
            <p className="text-[11px] text-red-200/70 leading-relaxed italic">{diag.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
