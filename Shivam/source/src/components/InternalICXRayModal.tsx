import React from 'react';
import { ElectronicComponentMeta, SimulationState, PlacedComponent } from '../types';
import { COMPONENTS_LIBRARY } from '../data/componentsLibrary';
import { X, Cpu, Eye, Zap, ShieldCheck } from 'lucide-react';

interface InternalICXRayModalProps {
  icMeta: ElectronicComponentMeta;
  placedIC?: PlacedComponent | null;
  simState: SimulationState;
  onClose: () => void;
}

export const InternalICXRayModal: React.FC<InternalICXRayModalProps> = ({
  icMeta,
  placedIC,
  simState,
  onClose,
}) => {
  const evalState = placedIC ? simState.evaluatedGates[placedIC.id] : null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl text-slate-100 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">{icMeta.name} - Internal X-Ray Silicon Diagram</h2>
              <p className="text-xs text-slate-400">14-Pin DIP Package Silicon Die & Logic Gate Architecture</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2D Interactive Silicon Die & Gate Layout Diagram */}
        <div className="bg-slate-950 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center">
          {/* Chip Label Header */}
          <div className="text-center mb-6">
            <span className="bg-indigo-500/20 text-indigo-300 font-mono text-xs px-3 py-1 rounded-full border border-indigo-500/30">
              {icMeta.icSeries} SILICON DIE REVISION 2.0
            </span>
            <div className="text-2xl font-bold font-mono text-amber-400 mt-2">{icMeta.booleanEquation}</div>
          </div>

          {/* DIP-14 Package Visualizer */}
          <div className="relative w-full max-w-lg bg-slate-900/90 border-2 border-slate-700 rounded-xl p-8 my-2 shadow-2xl">
            {/* Notch */}
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-8 bg-slate-950 border-r-2 border-slate-700 rounded-r-full"></div>

            {/* Pins Left Side (1 to 7) */}
            <div className="absolute -top-3 left-6 right-6 flex justify-between text-[10px] font-mono text-slate-400">
              <span>P1 (1A)</span>
              <span>P2 (1B)</span>
              <span>P3 (1Y)</span>
              <span>P4 (2A)</span>
              <span>P5 (2B)</span>
              <span>P6 (2Y)</span>
              <span className="text-blue-400 font-bold">P7 (GND)</span>
            </div>

            {/* Internal Gate Blocks */}
            <div className={`grid gap-4 my-4 ${icMeta.icSeries === '7404' ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {(icMeta.icSeries === '7404' ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4]).map((gateNum) => {
                const gateData = evalState?.gates?.[gateNum];
                const isActive = evalState?.isPowered && (gateData ? gateData.outputY === 1 : (gateNum === 1 && evalState.outputY === 1));

                return (
                  <div
                    key={gateNum}
                    className={`border-2 rounded-xl p-3 flex flex-col items-center justify-center gap-1 transition-all ${
                      isActive
                        ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/20'
                        : 'bg-slate-950/80 border-slate-800'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-mono text-slate-400">Gate {gateNum}</div>
                    <div className="text-base font-bold font-mono text-amber-400">[{icMeta.logicSymbolType}]</div>
                    {gateData && (
                      <div className="text-[9px] font-mono text-slate-400">
                        In: A={gateData.inputA}{gateData.inputB !== undefined ? `, B=${gateData.inputB}` : ''}
                      </div>
                    )}
                    <div className="text-[10px] font-mono text-slate-300 font-semibold">
                      Out Y: {isActive ? <span className="text-emerald-400 font-bold">1 (5.0V)</span> : <span className="text-slate-400">0 (0.0V)</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pins Right Side (14 down to 8) */}
            <div className="absolute -bottom-3 left-6 right-6 flex justify-between text-[10px] font-mono text-slate-400">
              <span className="text-red-400 font-bold">P14 (VCC)</span>
              <span>P13 (4B)</span>
              <span>P12 (4A)</span>
              <span>P11 (4Y)</span>
              <span>P10 (3B)</span>
              <span>P9 (3A)</span>
              <span>P8 (3Y)</span>
            </div>
          </div>
        </div>

        {/* Detailed Datasheet Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <h4 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Power Supply Rails
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Pin 14 (VCC) powers the internal multi-emitter bipolar junction transistors (BJTs) with +5.0V DC. Pin 7 (GND) provides the reference return ground path.
            </p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <h4 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Totem-Pole Output Stage
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Provides active pull-up and pull-down transistor pairs for ultra-fast switching speed (~8 ns propagation delay) driving external breadboard LED indicators.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
