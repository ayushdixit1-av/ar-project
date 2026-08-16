import React, { useState, useEffect } from 'react';
import { useConverterLogic } from './hooks/useConverterLogic';
import { Breadboard3D } from './components/Breadboard3D';
import { ControlPanel } from './components/ControlPanel';
import { TruthTable } from './components/TruthTable';
import { SchematicView } from './components/SchematicView';
import { TheoryManual } from './components/TheoryManual';
import { PinInspector } from './components/PinInspector';
import { QuizModal } from './components/QuizModal';
import { IC7486Pin, WireConnection } from './types';
import {
  Cpu,
  Layers,
  Table,
  BookOpen,
  HelpCircle,
  Sparkles,
  Zap,
  RotateCcw,
  Maximize2,
  Sliders,
  Award,
  Glasses,
} from 'lucide-react';

export default function App() {
  const {
    mode,
    setMode,
    inputBits,
    setInputBits,
    toggleBit,
    setInputDecimal,
    inputDecimal,
    outputBits,
    outputDecimal,
    gateStates,
    formulaSteps,
    pins,
    truthTableData,
    stepIncrement,
    stepDecrement,
    isAutoSequencing,
    setIsAutoSequencing,
    sequenceSpeedMs,
    setSequenceSpeedMs,
  } = useConverterLogic();

  const [activeTab, setActiveTab] = useState<'controls' | 'truthtable' | 'schematic' | 'theory'>('controls');
  const [selectedPin, setSelectedPin] = useState<IC7486Pin | null>(null);
  const [selectedWire, setSelectedWire] = useState<WireConnection | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isARModeActive, setIsARModeActive] = useState(false);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === '3') {
        toggleBit('b3');
      } else if (e.key === '2') {
        toggleBit('b2');
      } else if (e.key === '1') {
        toggleBit('b1');
      } else if (e.key === '0') {
        toggleBit('b0');
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsAutoSequencing((prev) => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        setMode(mode === 'bin2gray' ? 'gray2bin' : 'bin2gray');
      } else if (e.key === 'r' || e.key === 'R') {
        setInputDecimal(0);
      } else if (e.key === 'a' || e.key === 'A') {
        setIsARModeActive((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleBit, mode, setMode, setInputDecimal, setIsAutoSequencing]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-slate-950">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-emerald-400 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-sky-400" />
            </div>
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-100 flex items-center gap-2">
              <span>Binary ⇄ Gray Code Converter</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                IC 7486
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Virtual Electronics Lab • Quad 2-Input Exclusive-OR Gate Simulation
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Quick Mode Toggle */}
          <button
            onClick={() => setMode(mode === 'bin2gray' ? 'gray2bin' : 'bin2gray')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            title="Press 'M' on keyboard"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>{mode === 'bin2gray' ? 'Binary → Gray' : 'Gray → Binary'}</span>
          </button>

          {/* AR Mode Toggle */}
          <button
            onClick={() => setIsARModeActive(!isARModeActive)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-md ${
              isARModeActive
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-500/10'
                : 'bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 hover:brightness-110 shadow-sky-500/20'
            }`}
            title="Toggle Augmented Reality Mode (Press 'A')"
          >
            <Glasses className="w-3.5 h-3.5" />
            <span>{isARModeActive ? 'Exit AR' : 'AR Mode'}</span>
          </button>

          {/* Quiz Test */}
          <button
            onClick={() => setIsQuizOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-semibold transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Lab Quiz</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-3 sm:p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: 3D Breadboard Simulator (7 cols on large screens) */}
        <div className="lg:col-span-7 flex flex-col gap-4 h-full">
          {/* 3D Scene Viewport */}
          <div className="w-full h-[460px] sm:h-[540px] lg:h-[620px] relative">
            <Breadboard3D
              mode={mode}
              setMode={setMode}
              inputBits={inputBits}
              outputBits={outputBits}
              pins={pins}
              toggleBit={toggleBit}
              onSelectPin={(pin) => {
                setSelectedPin(pin);
                setSelectedWire(null);
              }}
              onSelectWire={(wire) => {
                setSelectedWire(wire);
                setSelectedPin(null);
              }}
              isARModeActive={isARModeActive}
              setIsARModeActive={setIsARModeActive}
            />
          </div>

          {/* Pin & Wire Inspector Bar when selected */}
          {(selectedPin || selectedWire) && !isARModeActive && (
            <PinInspector
              selectedPin={selectedPin}
              selectedWire={selectedWire}
              onClose={() => {
                setSelectedPin(null);
                setSelectedWire(null);
              }}
            />
          )}

          {/* Keyboard Shortcuts Hint Bar */}
          <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/80 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 font-mono">
              <span className="text-slate-300 font-bold">Shortcuts:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">3</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">2</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">1</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">0</kbd>
              <span>(Toggle Bits)</span>
            </div>
            <div className="flex items-center gap-2 font-mono">
              <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">A</kbd> AR Mode</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">Space</kbd> Auto Clock</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">M</kbd> Mode</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">R</kbd> Reset</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Panels & Tools (5 cols on large screens) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Panel Tab Navigation */}
          <div className="bg-slate-900/90 rounded-2xl p-1.5 border border-slate-800 shadow-md grid grid-cols-4 gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('controls')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl transition-all ${
                activeTab === 'controls'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Controls</span>
            </button>

            <button
              onClick={() => setActiveTab('truthtable')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl transition-all ${
                activeTab === 'truthtable'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Truth Table</span>
            </button>

            <button
              onClick={() => setActiveTab('schematic')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl transition-all ${
                activeTab === 'schematic'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Schematic</span>
            </button>

            <button
              onClick={() => setActiveTab('theory')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl transition-all ${
                activeTab === 'theory'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Theory</span>
            </button>
          </div>

          {/* Active Tab View */}
          <div className="w-full">
            {activeTab === 'controls' && (
              <ControlPanel
                mode={mode}
                setMode={setMode}
                inputBits={inputBits}
                outputBits={outputBits}
                inputDecimal={inputDecimal}
                outputDecimal={outputDecimal}
                toggleBit={toggleBit}
                setInputDecimal={setInputDecimal}
                stepIncrement={stepIncrement}
                stepDecrement={stepDecrement}
                isAutoSequencing={isAutoSequencing}
                setIsAutoSequencing={setIsAutoSequencing}
                sequenceSpeedMs={sequenceSpeedMs}
                setSequenceSpeedMs={setSequenceSpeedMs}
                formulaSteps={formulaSteps}
              />
            )}

            {activeTab === 'truthtable' && (
              <TruthTable
                mode={mode}
                rows={truthTableData}
                onSelectRow={(dec) => setInputDecimal(dec)}
              />
            )}

            {activeTab === 'schematic' && (
              <SchematicView
                mode={mode}
                inputBits={inputBits}
                outputBits={outputBits}
                gateStates={gateStates}
                pins={pins}
              />
            )}

            {activeTab === 'theory' && <TheoryManual />}
          </div>
        </div>
      </main>

      {/* Lab Assessment Quiz Modal */}
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}
