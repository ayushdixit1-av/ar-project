import React, { useState } from 'react';
import { ConverterMode, TruthTableRow } from '../types';
import { Table, Check, Search, Sparkles, HelpCircle } from 'lucide-react';

interface TruthTableProps {
  mode: ConverterMode;
  rows: TruthTableRow[];
  onSelectRow: (decimal: number) => void;
}

export const TruthTable: React.FC<TruthTableProps> = ({ mode, rows, onSelectRow }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const isBin2Gray = mode === 'bin2gray';

  const filteredRows = rows.filter((r) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      r.decimal.toString().includes(term) ||
      r.binaryStr.includes(term) ||
      r.grayStr.includes(term)
    );
  });

  return (
    <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-xl flex flex-col h-full text-slate-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-semibold text-slate-100">
            Full 4-Bit Truth Table (16 States)
          </h3>
        </div>

        {/* Quick Filter */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search bit / dec..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-36 pl-8 pr-2.5 py-1 text-xs bg-slate-950 rounded-lg border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Unit Distance Educational Banner */}
      <div className="mb-3 px-3 py-2 rounded-xl bg-sky-950/40 border border-sky-800/40 text-xs text-sky-200 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
          <span>
            <strong>Unit Distance Property:</strong> In Gray code, exactly <strong>1 bit</strong> changes between any two consecutive values!
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">Click any row to test</span>
      </div>

      {/* Table Container with Scroll */}
      <div className="overflow-x-auto overflow-y-auto max-h-[480px] rounded-xl border border-slate-800/80 bg-slate-950/70">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead className="bg-slate-900/90 sticky top-0 z-10 text-[11px] text-slate-400 uppercase border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Dec</th>
              <th className="py-2.5 px-3">
                <span className={isBin2Gray ? 'text-sky-400 font-bold' : 'text-slate-300'}>
                  Binary (B₃B₂B₁B₀) {isBin2Gray && '← IN'}
                </span>
              </th>
              <th className="py-2.5 px-3">
                <span className={!isBin2Gray ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                  Gray Code (G₃G₂G₁G₀) {!isBin2Gray && '← IN'}
                </span>
              </th>
              <th className="py-2.5 px-3 text-center">Δ Bits</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredRows.map((row) => {
              const isSelected = row.isCurrent;

              return (
                <tr
                  key={row.decimal}
                  onClick={() => onSelectRow(row.decimal)}
                  className={`cursor-pointer transition-all duration-150 group ${
                    isSelected
                      ? 'bg-sky-500/20 text-white font-bold border-l-4 border-l-sky-400'
                      : 'hover:bg-slate-900/70 text-slate-300'
                  }`}
                >
                  <td className="py-2 px-3">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[11px] ${
                        isSelected ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      {row.decimal.toString().padStart(2, '0')}
                    </span>
                  </td>

                  {/* Binary Column */}
                  <td className="py-2 px-3 font-mono tracking-widest">
                    <span className="space-x-1">
                      <span className={row.b3 === 1 ? 'text-sky-400 font-bold' : 'text-slate-500'}>
                        {row.b3}
                      </span>
                      <span className={row.b2 === 1 ? 'text-sky-400 font-bold' : 'text-slate-500'}>
                        {row.b2}
                      </span>
                      <span className={row.b1 === 1 ? 'text-sky-400 font-bold' : 'text-slate-500'}>
                        {row.b1}
                      </span>
                      <span className={row.b0 === 1 ? 'text-sky-400 font-bold' : 'text-slate-500'}>
                        {row.b0}
                      </span>
                    </span>
                  </td>

                  {/* Gray Code Column */}
                  <td className="py-2 px-3 font-mono tracking-widest">
                    <span className="space-x-1">
                      <span className={row.g3 === 1 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                        {row.g3}
                      </span>
                      <span className={row.g2 === 1 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                        {row.g2}
                      </span>
                      <span className={row.g1 === 1 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                        {row.g1}
                      </span>
                      <span className={row.g0 === 1 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                        {row.g0}
                      </span>
                    </span>
                  </td>

                  {/* Bit changes count (Unit distance) */}
                  <td className="py-2 px-3 text-center">
                    {row.decimal === 0 ? (
                      <span className="text-slate-600">-</span>
                    ) : (
                      <span
                        className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          row.bitChanges === 1
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {row.bitChanges} {row.bitChanges === 1 ? 'bit' : 'bits'}
                      </span>
                    )}
                  </td>

                  {/* Load Row Action */}
                  <td className="py-2 px-3 text-right">
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-sky-400 text-slate-950 font-bold">
                        <Check className="w-3 h-3" /> ACTIVE
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 group-hover:text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Load →
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
