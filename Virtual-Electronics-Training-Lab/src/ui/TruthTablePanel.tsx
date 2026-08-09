import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Table, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GATE_TRUTH_TABLES } from '../electronics/experiments';
import { ICType, CircuitState } from '../types/electronics';
import { SimulationResult } from '../electronics/circuitSimulator';

interface TruthTablePanelProps {
  icType: ICType;
  circuitState: CircuitState;
  simResult?: SimulationResult;
}

export const TruthTablePanel: React.FC<TruthTablePanelProps> = ({ icType, circuitState, simResult }) => {
  const truthTableDef = GATE_TRUTH_TABLES[icType] || GATE_TRUTH_TABLES['7408'];
  const [verifiedRows, setVerifiedRows] = useState<Record<number, boolean>>({});

  // Current switch state values
  const swA = circuitState.switches.find((s) => s.label.includes('A'))?.state === 'HIGH' ? 1 : 0;
  const swB = circuitState.switches.find((s) => s.label.includes('B'))?.state === 'HIGH' ? 1 : 0;

  // Current LED state
  const ledOn = circuitState.leds.some((l) => simResult?.ledStates[l.id]?.isOn);
  const observedOutput = ledOn ? 1 : 0;

  useEffect(() => {
    setVerifiedRows({});
  }, [icType]);

  useEffect(() => {
    // Check if current input state matches any row in the truth table
    truthTableDef.rows.forEach((row, idx) => {
      const matchA = row.inputs['A'] === swA;
      const matchB = row.inputs['B'] === undefined || row.inputs['B'] === swB;

      if (matchA && matchB) {
        if (observedOutput === row.expectedOutput) {
          setVerifiedRows((prev) => {
            if (prev[idx]) return prev;
            return { ...prev, [idx]: true };
          });
        }
      }
    });
  }, [swA, swB, observedOutput, icType]);

  const allVerified = truthTableDef.rows.every((_, idx) => verifiedRows[idx]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    if (allVerified) {
      triggerConfetti();
    }
  }, [allVerified]);

  return (
    <div className="bg-[#12151B] border border-white/5 rounded-xl p-4 text-slate-200 shadow-2xl space-y-3 w-72 shrink-0">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          Live Truth Table
        </h2>
        {allVerified && (
          <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20 uppercase">
            <Award className="w-3 h-3" />
            <span>VERIFIED</span>
          </span>
        )}
      </div>

      {/* Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5">
            {truthTableDef.inputNames.map((name) => (
              <th key={name} className="py-2 text-[10px] font-mono text-blue-400 uppercase">
                {name}
              </th>
            ))}
            <th className="py-2 text-[10px] font-mono text-white uppercase">
              {truthTableDef.outputName} (Out)
            </th>
            <th className="py-2 text-[10px] font-mono text-slate-500 uppercase text-right">Status</th>
          </tr>
        </thead>
        <tbody className="text-xs font-mono">
          {truthTableDef.rows.map((row, idx) => {
            const isCurrentRow =
              row.inputs['A'] === swA && (row.inputs['B'] === undefined || row.inputs['B'] === swB);
            const isVerified = verifiedRows[idx];

            return (
              <tr
                key={idx}
                className={`transition-colors ${
                  isCurrentRow
                    ? 'bg-blue-500/10 border-l-2 border-blue-500 text-blue-100 font-bold'
                    : 'text-slate-500 opacity-60 hover:opacity-100'
                }`}
              >
                <td className="py-2 pl-2">{row.inputs['A']}</td>
                {row.inputs['B'] !== undefined && <td className="py-2">{row.inputs['B']}</td>}
                <td className="py-2 font-bold text-white">{row.expectedOutput}</td>
                <td className="py-2 text-right">
                  {isVerified ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 inline" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-slate-600 inline" />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Completion status */}
      <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between pt-1 border-t border-white/5">
        <span>Verified Rows:</span>
        <span className="font-bold text-slate-300">
          {Object.keys(verifiedRows).length} / {truthTableDef.rows.length}
        </span>
      </div>

      {allVerified && (
        <button
          onClick={triggerConfetti}
          className="w-full py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase rounded transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Celebrate Victory!</span>
        </button>
      )}
    </div>
  );
};
