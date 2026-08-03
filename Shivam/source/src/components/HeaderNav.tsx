import React from 'react';
import { Cpu, Zap, GraduationCap, HelpCircle, Code2, QrCode, Play, Square, Layers, Bot, Sparkles, Camera } from 'lucide-react';
import { AppViewMode, SimulationState } from '../types';

interface HeaderNavProps {
  activeView: AppViewMode;
  setActiveView: (view: AppViewMode) => void;
  simState: SimulationState;
  setSimState: React.Dispatch<React.SetStateAction<SimulationState>>;
  placedCount: number;
  wireCount: number;
  onOpenDocs: () => void;
  onOpenMobileSync: () => void;
  onOpenActiveItemsMenu?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeView,
  setActiveView,
  simState,
  setSimState,
  placedCount,
  wireCount,
  onOpenDocs,
  onOpenMobileSync,
  onOpenActiveItemsMenu,
}) => {
  const togglePower = () => {
    setSimState((prev) => ({
      ...prev,
      isPowered: !prev.isPowered,
      serialMonitorLog: [
        `[${new Date().toLocaleTimeString()}] System Power ${!prev.isPowered ? 'ENABLED (5.0V DC Rail Active)' : 'DISABLED'}`,
        ...prev.serialMonitorLog,
      ],
    }));
  };

  return (
    <header className="h-14 bg-[#0a0a0a] border-b border-white/10 px-4 flex items-center justify-between selection:bg-blue-500 selection:text-white z-30 relative">
      {/* Brand & Status */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <Cpu className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase font-mono">
              DIGITAL <span className="text-indigo-400">LOGIC DESIGN</span>
            </h1>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Trainer Kit v3.5
            </span>
          </div>
          <p className="text-[10px] text-gray-400 tracking-wider hidden md:block">Virtual Digital Electronics Laboratory</p>
        </div>
      </div>

      {/* Mobile Compact View Selector */}
      <div className="lg:hidden flex items-center bg-[#111] px-2 py-1 rounded-lg border border-white/10">
        <select
          value={activeView}
          onChange={(e) => setActiveView(e.target.value as AppViewMode)}
          className="bg-transparent text-xs text-indigo-300 font-mono font-bold focus:outline-none cursor-pointer"
        >
          <option value="studio" className="bg-[#111] text-white">3D Lab Bench</option>
          <option value="truth-table" className="bg-[#111] text-white">Truth Table</option>
          <option value="learning" className="bg-[#111] text-white">Guided Labs</option>
          <option value="quiz" className="bg-[#111] text-white">Lab Quiz</option>
          <option value="ar" className="bg-[#111] text-white">AR Camera Mode</option>
        </select>
      </div>

      {/* Main View Mode Selector (Desktop & Tablet) */}
      <nav className="hidden lg:flex items-center gap-1 bg-[#111] p-1 rounded-lg border border-white/10">
        <button
          onClick={() => setActiveView('studio')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            activeView === 'studio'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>3D Lab Bench</span>
        </button>

        <button
          onClick={() => setActiveView('truth-table')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            activeView === 'truth-table'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Truth Table Verification</span>
        </button>

        <button
          onClick={() => setActiveView('learning')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            activeView === 'learning'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Guided Labs</span>
        </button>

        <button
          onClick={() => setActiveView('quiz')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            activeView === 'quiz' || activeView === 'assessment'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Lab Assessment</span>
        </button>

        <button
          onClick={() => setActiveView('ar')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
            activeView === 'ar'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/40 border border-purple-400/50'
              : 'text-purple-400 hover:text-white hover:bg-purple-600/20 border border-purple-500/20'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>AR Mode</span>
        </button>
      </nav>

      {/* Power Control & System Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Active Items & Wires Inventory Menu Button */}
        {onOpenActiveItemsMenu && (
          <button
            onClick={onOpenActiveItemsMenu}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 text-xs font-mono font-bold transition-all shadow-md"
            title="Open Active Items Menu (ICs & Wires)"
          >
            <Layers className="w-4 h-4 text-blue-400" />
            <span className="hidden sm:inline">Items Menu</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-500/30 text-white text-[10px]">
              {placedCount + wireCount}
            </span>
          </button>
        )}

        {/* Power Toggle Switch */}
        <button
          onClick={togglePower}
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs font-bold transition-all shadow-md ${
            simState.isPowered
              ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
          }`}
        >
          {simState.isPowered ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>POWER ON</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>POWER OFF</span>
            </>
          )}
        </button>

        {/* Direct Shift to AR Mode Button (Always visible on mobile & desktop) */}
        <button
          onClick={() => setActiveView('ar')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-purple-600/30 border border-purple-400/40 shrink-0"
          title="Directly shift to Augmented Reality (AR) Mode"
        >
          <Camera className="w-4 h-4 text-purple-200 animate-pulse" />
          <span className="font-bold">AR Mode</span>
        </button>

        {/* Blender/Architecture Specs */}
        <button
          onClick={onOpenDocs}
          className="hidden sm:block p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 transition-all"
          title="View Blender Python Scripts & Architecture Specs"
        >
          <Code2 className="w-4 h-4" />
        </button>

        {/* Mobile WebXR / AR Sync */}
        <button
          onClick={onOpenMobileSync}
          className="hidden sm:block p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-indigo-400 transition-all"
          title="Scan QR for WebXR Mobile AR Mode"
        >
          <QrCode className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
