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

  // Get current switch states for all inputs in the truth table
  const currentInputs: Record<string, number> = {};
  truthTableDef.inputNames.forEach((name) => {
    const sw = circuitState.switches.find((s) => s.label.toUpperCase().includes(name.toUpperCase()));
    currentInputs[name] = sw?.state === 'HIGH' ? 1 : 0;
  });

  const serializedInputs = JSON.stringify(currentInputs);

  // Find up to 4 LEDs dynamically from the circuitState
  const sumLed = circuitState.leds[0];
  const carryLed = circuitState.leds[1];
  const out3Led = circuitState.leds[2];
  const out4Led = circuitState.leds[3];

  const observed1 = sumLed ? (simResult?.ledStates[sumLed.id]?.isOn ? 1 : 0) : 0;
  const observed2 = carryLed ? (simResult?.ledStates[carryLed.id]?.isOn ? 1 : 0) : 0;
  const observed3 = out3Led ? (simResult?.ledStates[out3Led.id]?.isOn ? 1 : 0) : 0;
  const observed4 = out4Led ? (simResult?.ledStates[out4Led.id]?.isOn ? 1 : 0) : 0;

  useEffect(() => {
    setVerifiedRows({});
  }, [icType]);

  useEffect(() => {
    // Check if current input state matches any row in the truth table
    truthTableDef.rows.forEach((row, idx) => {
      let isMatch = true;
      for (const name of truthTableDef.inputNames) {
        if (row.inputs[name] !== currentInputs[name]) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        const out1Ok = observed1 === row.expectedOutput;
        const out2Ok = row.expectedCarry === undefined || observed2 === row.expectedCarry;
        const out3Ok = row.expectedOut3 === undefined || observed3 === row.expectedOut3;
        const out4Ok = row.expectedOut4 === undefined || observed4 === row.expectedOut4;

        if (out1Ok && out2Ok && out3Ok && out4Ok) {
          setVerifiedRows((prev) => {
            if (prev[idx]) return prev;
            return { ...prev, [idx]: true };
          });
        }
      }
    });
  }, [serializedInputs, observed1, observed2, observed3, observed4, icType]);

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

  const hasCarryColumn = truthTableDef.rows[0]?.expectedCarry !== undefined;
  const hasOut3Column = truthTableDef.rows[0]?.expectedOut3 !== undefined;
  const hasOut4Column = truthTableDef.rows[0]?.expectedOut4 !== undefined;

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
              {icType.includes('ADDER') ? 'Sum' : (icType.includes('GRAY') ? 'Out2' : (icType.includes('DECODER') ? 'Y0' : (icType.includes('COMPARATOR') ? 'A>B' : truthTableDef.outputName)))}
            </th>
            {hasCarryColumn && (
              <th className="py-2 text-[10px] font-mono text-emerald-400 uppercase">
                {icType.includes('ADDER') ? 'Carry' : (icType.includes('GRAY') ? 'Out1' : (icType.includes('DECODER') ? 'Y1' : (icType.includes('COMPARATOR') ? 'A<B' : 'Out2')))}
              </th>
            )}
            {hasOut3Column && (
              <th className="py-2 text-[10px] font-mono text-amber-400 uppercase">
                {icType.includes('GRAY') ? 'Out0' : (icType.includes('DECODER') ? 'Y2' : (icType.includes('COMPARATOR') ? 'A=B' : 'Out3'))}
              </th>
            )}
            {hasOut4Column && (
              <th className="py-2 text-[10px] font-mono text-blue-400 uppercase">
                {icType.includes('DECODER') ? 'Y3' : 'Out4'}
              </th>
            )}
            <th className="py-2 text-[10px] font-mono text-slate-500 uppercase text-right">Status</th>
          </tr>
        </thead>
        <tbody className="text-xs font-mono">
          {truthTableDef.rows.map((row, idx) => {
            let isCurrentRow = true;
            for (const name of truthTableDef.inputNames) {
              if (row.inputs[name] !== currentInputs[name]) {
                isCurrentRow = false;
                break;
              }
            }
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
                {truthTableDef.inputNames.map((name, i) => (
                  <td key={name} className={`py-2 ${i === 0 ? 'pl-2' : ''}`}>
                    {row.inputs[name]}
                  </td>
                ))}
                <td className="py-2 font-bold text-white">{row.expectedOutput}</td>
                {hasCarryColumn && (
                  <td className="py-2 font-bold text-emerald-400">{row.expectedCarry}</td>
                )}
                {hasOut3Column && (
                  <td className="py-2 font-bold text-amber-400">{row.expectedOut3}</td>
                )}
                {hasOut4Column && (
                  <td className="py-2 font-bold text-blue-400">{row.expectedOut4}</td>
                )}
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
