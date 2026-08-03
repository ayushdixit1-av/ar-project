import React, { useState } from 'react';
import { SimulationState, PlacedComponent, JumperWire } from '../types';
import { COMPONENTS_LIBRARY } from '../data/componentsLibrary';
import { CheckCircle2, XCircle, Play, Download, Sparkles, RefreshCw, Layers, ShieldCheck } from 'lucide-react';

interface TruthTableVerificationViewProps {
  simState: SimulationState;
  placedComponents: PlacedComponent[];
  wires: JumperWire[];
  onSetSwitches: (swA: boolean, swB: boolean) => void;
}

export const TruthTableVerificationView: React.FC<TruthTableVerificationViewProps> = ({
  simState,
  placedComponents,
  wires,
  onSetSwitches,
}) => {
  const [selectedIcId, setSelectedIcId] = useState<string>('ic-7408-and');
  const [isAutoTesting, setIsAutoTesting] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, { expected: number; measured: number; pass: boolean }>>({});

  const meta = COMPONENTS_LIBRARY.find((c) => c.id === selectedIcId) || COMPONENTS_LIBRARY[1];

  // Logic Gate Truth Table Rows (e.g. 00, 01, 10, 11)
  const rows = meta.truthTableData || [
    { a: 0, b: 0, out: 0 },
    { a: 0, b: 1, out: 0 },
    { a: 1, b: 0, out: 0 },
    { a: 1, b: 1, out: 1 },
  ];

  // Find active placed component matching selected IC
  const activePlacedIC = placedComponents.find((c) => c.componentMetaId === selectedIcId);
  const evaluatedGate = activePlacedIC ? simState.evaluatedGates[activePlacedIC.id] : null;

  // Run automated input sweep
  const handleRunAutoSweep = () => {
    setIsAutoTesting(true);
    let step = 0;
    const totalSteps = rows.length;

    const interval = setInterval(() => {
      if (step >= totalSteps) {
        clearInterval(interval);
        setIsAutoTesting(false);
        return;
      }

      const row = rows[step];
      onSetSwitches(row.a === 1, (row.b ?? 0) === 1);

      // Measure current output
      const measuredOut = evaluatedGate?.outputY ?? 0;
      const pass = measuredOut === row.out && evaluatedGate?.isPowered === true;

      setTestResults((prev) => ({
        ...prev,
        [`row-${step}`]: { expected: row.out, measured: measuredOut, pass },
      }));

      step++;
    }, 800);
  };

  return (
    <div className="flex-1 bg-slate-950 p-6 overflow-y-auto text-slate-100 flex flex-col gap-6">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2.5 py-1 rounded-full border border-indigo-500/30 font-medium">
              Experiment 1 Verification
            </span>
            <span className="text-slate-400 text-xs">• Digital Logic Design Laboratory</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            Logic Gate Truth Table Verification Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Automatically applies Boolean test vectors (00, 01, 10, 11) to the 3D trainer board inputs (Switch A & B), evaluates output voltage on Pin 3 of the logic gate, and verifies truth table accuracy.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAutoSweep}
            disabled={isAutoTesting || !activePlacedIC}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg transition-all ${
              isAutoTesting
                ? 'bg-amber-600 text-white animate-pulse'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isAutoTesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            <span>{isAutoTesting ? 'Sweeping Vectors...' : 'Auto Sweep Test Vectors'}</span>
          </button>
        </div>
      </div>

      {/* Logic IC Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        {[
          { id: 'ic-7408-and', label: '7408 AND' },
          { id: 'ic-7400-nand', label: '7400 NAND' },
          { id: 'ic-7432-or', label: '7432 OR' },
          { id: 'ic-7402-nor', label: '7402 NOR' },
          { id: 'ic-7404-not', label: '7404 NOT' },
          { id: 'ic-7486-xor', label: '7486 XOR' },
          { id: 'ic-74266-xnor', label: '74266 XNOR' },
          { id: 'ic-74151-mux', label: '74151 MUX' },
          { id: 'ic-74138-decoder', label: '74138 Decoder' },
          { id: 'ic-7474-flipflop', label: '7474 Flip-Flop' },
          { id: 'ic-7483-adder', label: '7483 Adder' },
          { id: 'ic-7490-counter', label: '7490 Counter' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedIcId(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
              selectedIcId === tab.id
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Truth Table Matrix */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-100">{meta.name}</h2>
              <p className="text-xs text-slate-400">
                Boolean Equation: <span className="text-amber-400 font-mono font-bold">{meta.booleanEquation}</span>
              </p>
            </div>
            {!activePlacedIC && (
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs px-3 py-1 rounded-lg">
                ⚠️ IC chip not on breadboard yet
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono tracking-wider">
                  <th className="p-3">Input A (Switch A)</th>
                  {meta.truthTableData?.[0].b !== undefined && <th className="p-3">Input B (Switch B)</th>}
                  <th className="p-3 text-amber-400">Expected Output (Y)</th>
                  <th className="p-3 text-indigo-400">Measured 3D Output</th>
                  <th className="p-3 text-right">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {rows.map((row, idx) => {
                  const isCurrentActive =
                    simState.switchAOn === (row.a === 1) &&
                    (row.b === undefined || simState.switchBOn === (row.b === 1));

                  const testRes = testResults[`row-${idx}`];

                  return (
                    <tr
                      key={idx}
                      className={`transition-colors ${
                        isCurrentActive ? 'bg-indigo-950/60 font-semibold' : 'hover:bg-slate-800/50'
                      }`}
                    >
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded font-mono ${
                            row.a === 1 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {row.a} ({row.a === 1 ? 'HIGH / 5V' : 'LOW / 0V'})
                        </span>
                      </td>
                      {row.b !== undefined && (
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded font-mono ${
                              row.b === 1 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {row.b} ({row.b === 1 ? 'HIGH / 5V' : 'LOW / 0V'})
                          </span>
                        </td>
                      )}
                      <td className="p-3 font-mono font-bold text-amber-400">{row.out}</td>
                      <td className="p-3 font-mono font-bold">
                        {isCurrentActive && evaluatedGate ? (
                          <span
                            className={
                              evaluatedGate.outputY === row.out ? 'text-emerald-400' : 'text-red-400'
                            }
                          >
                            {evaluatedGate.outputY} ({evaluatedGate.outputY === 1 ? '5.0V' : '0.0V'})
                          </span>
                        ) : testRes ? (
                          <span className={testRes.pass ? 'text-emerald-400' : 'text-red-400'}>
                            {testRes.measured}
                          </span>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        {isCurrentActive && evaluatedGate ? (
                          evaluatedGate.outputY === row.out && evaluatedGate.isPowered ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20 text-[11px]">
                              <XCircle className="w-3.5 h-3.5" /> MISMATCH
                            </span>
                          )
                        ) : testRes ? (
                          testRes.pass ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                              <CheckCircle2 className="w-3 h-3" /> PASS
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                              <XCircle className="w-3 h-3" /> FAIL
                            </span>
                          )
                        ) : (
                          <button
                            onClick={() => onSetSwitches(row.a === 1, (row.b ?? 0) === 1)}
                            className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700"
                          >
                            Apply Test
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Gate Properties & Datasheet Summary */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h3 className="font-semibold text-sm text-slate-100">IC Specifications & Symbol</h3>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
            <div className="text-xs text-slate-400 mb-2">Logic Symbol</div>
            <div className="text-3xl font-bold text-amber-400 font-mono tracking-wider py-2">
              [{meta.logicSymbolType}] GATE
            </div>
            <div className="text-xs font-mono text-indigo-300 mt-1">{meta.booleanEquation}</div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">IC Series Number:</span>
              <span className="font-mono font-semibold text-slate-200">{meta.icSeries}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Operating Voltage:</span>
              <span className="font-mono text-emerald-400">{meta.operatingVoltage}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Propagation Delay:</span>
              <span className="font-mono text-indigo-300">{meta.datasheetSummary.propagationDelay || '8 ns'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Package Type:</span>
              <span className="font-mono text-slate-200">DIP-14 Dual In-Line</span>
            </div>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 text-xs text-slate-300 leading-relaxed">
            <div className="font-semibold text-slate-100 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Working Principle
            </div>
            {meta.workingPrinciple}
          </div>
        </div>
      </div>
    </div>
  );
};
