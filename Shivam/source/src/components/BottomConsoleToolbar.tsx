import React, { useState } from 'react';
import { SimulationState } from '../types';
import { Terminal, ShieldAlert, Cpu, Download, RefreshCw, Trash2, Layers, Sparkles, Camera } from 'lucide-react';

interface BottomConsoleToolbarProps {
  simState: SimulationState;
  wireCount: number;
  placedCount: number;
  onResetView: () => void;
  onClearWires: () => void;
  onDownloadConfig: () => void;
  onShiftToAR?: () => void;
}

export const BottomConsoleToolbar: React.FC<BottomConsoleToolbarProps> = ({
  simState,
  wireCount,
  placedCount,
  onResetView,
  onClearWires,
  onDownloadConfig,
  onShiftToAR,
}) => {
  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(true);

  return (
    <div className="h-12 bg-[#0a0a0a] border-t border-white/10 px-4 flex items-center justify-between z-30 selection:bg-blue-500 selection:text-white font-mono text-xs">
      {/* Console Stream Log Preview */}
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex items-center gap-1.5 text-blue-400 font-bold shrink-0">
          <Terminal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">SERIAL LOG</span>
        </div>

        <div className="text-gray-400 text-[11px] truncate max-w-xl bg-[#111] px-2.5 py-1 rounded border border-white/5">
          {simState.serialMonitorLog[0] || '[115200 Baud] Serial Monitor initialized and ready.'}
        </div>
      </div>

      {/* System Metrics & Quick Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Short Circuit Warning Alert */}
        {simState.hasShortCircuit && (
          <div className="flex items-center gap-1 text-rose-400 font-bold animate-pulse bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SHORT CIRCUIT DETECTED</span>
          </div>
        )}

        {/* Component Stats */}
        <div className="hidden sm:block text-gray-400 text-[11px]">
          Modules: <span className="text-white font-bold">{placedCount}</span> | Wires:{' '}
          <span className="text-blue-400 font-bold">{wireCount}</span>
        </div>

        {/* Quick Toolbar Actions */}
        <div className="flex items-center gap-1.5 border-l border-white/10 pl-2 sm:pl-3">
          {/* Mobile Direct Shift to AR Button */}
          {onShiftToAR && (
            <button
              onClick={onShiftToAR}
              className="px-2.5 py-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-[11px] flex items-center gap-1 font-bold shadow-lg shadow-purple-600/30 border border-purple-400/40 transition-all shrink-0 animate-pulse"
              title="Launch Mobile AR Mode"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>AR Mode</span>
            </button>
          )}

          <button
            onClick={onResetView}
            className="px-2 py-1 bg-white/5 hover:bg-white/10 text-gray-300 rounded text-[11px] transition-all"
            title="Reset 3D View"
          >
            <RefreshCw className="w-3 h-3" />
          </button>

          <button
            onClick={onDownloadConfig}
            className="hidden sm:flex px-2.5 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded text-[11px] items-center gap-1 font-semibold transition-all"
            title="Export Circuit Config JSON"
          >
            <Download className="w-3 h-3" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};
