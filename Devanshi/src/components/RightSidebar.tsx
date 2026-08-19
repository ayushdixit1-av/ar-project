import React, { useState } from 'react';
import {
  TruthTableRow,
  GuidedStep,
  ICComponentInfo,
  BitVector4,
  ConverterMode,
  CircuitCheckResult,
  GateState,
} from '../types';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Check,
  AlertCircle,
  Activity,
  Zap,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface RightSidebarProps {
  mode: ConverterMode;
  setMode?: (mode: ConverterMode) => void;
  inputBits: BitVector4;
  toggleBit: (bit: keyof BitVector4) => void;
  inputDecimal: number;
  outputBits: BitVector4;
  outputDecimal: number;
  circuitCheck?: CircuitCheckResult;
  gateStates?: GateState[];
  selectedIC?: ICComponentInfo;
  truthTableRows?: TruthTableRow[];
  verifiedRowsCount?: number;
  totalRowsCount?: number;
  onSelectRow?: (dec: number) => void;
  isICPowered?: boolean;
  wiresCount?: number;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  mode,
  setMode,
  inputBits,
  toggleBit,
  inputDecimal,
  outputBits,
  outputDecimal,
  circuitCheck,
  gateStates,
  selectedIC,
  truthTableRows = [],
  verifiedRowsCount = 0,
  totalRowsCount = 16,
  onSelectRow,
  isICPowered = true,
  wiresCount = 0,
}) => {
  const [expandedStep, setExpandedStep] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'logic' | 'diagnostics' | 'guide'>('logic');

  const icCode = selectedIC?.code || (mode === 'bin2gray' || mode === 'gray2bin' ? '7486' : '7408');
  const icGateType = selectedIC?.gateType || 'XOR';

  // Calculate dynamic guided lab steps
  const steps: GuidedStep[] = [
    {
      id: 1,
      title: 'Power the Breadboard Rails',
      description: 'Connect +5V Red lead to top power rail (+) and Black Ground lead to bottom rail (-).',
      tip: 'Regulated 5.00V DC supplies active VCC and Ground reference rails.',
      isCompleted: isICPowered,
    },
    {
      id: 2,
      title: `Mount IC ${icCode} (${icGateType})`,
      description: `Ensure the 14-DIP package is securely seated across the central breadboard divider trough.`,
      tip: 'Pin 1 orientation notch faces left towards column 1.',
      isCompleted: true,
    },
    {
      id: 3,
      title: 'Connect VCC (Pin 14) & GND (Pin 7)',
      description: `Wire Pin 14 to +5V rail and Pin 7 to Ground rail for reliable logic gate operation.`,
      tip: 'Never power TTL logic ICs with reversed polarity!',
      isCompleted: isICPowered,
    },
    {
      id: 4,
      title: 'Wire 4-Bit Input Switches',
      description: `Connect toggle switches to input bit lines (${mode === 'bin2gray' ? 'B3..B0' : 'G3..G0'}).`,
      tip: 'Switches provide clean 5V (HIGH) or 0V (LOW) logic levels.',
      isCompleted: wiresCount >= 4,
    },
    {
      id: 5,
      title: 'Connect Output LEDs with Resistors',
      description: `Wire XOR gate outputs to LEDs (${mode === 'bin2gray' ? 'G3..G0' : 'B3..B0'}) through 330Ω current-limiting resistors to GND.`,
      tip: 'The 330Ω resistor protects LEDs from excessive current draw.',
      isCompleted: wiresCount >= 7,
    },
    {
      id: 6,
      title: 'Verify Converter Truth Table',
      description: 'Cycle switches through all 16 input combinations (0000 to 1111) to verify 100% logic operation.',
      tip: 'Notice that adjacent Gray codes differ by only 1 single bit transition!',
      isCompleted: verifiedRowsCount >= 16 || verifiedRowsCount === totalRowsCount,
    },
  ];

  const completedCount = steps.filter((s) => s.isCompleted).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const inputBitKeys: (keyof BitVector4)[] = ['b3', 'b2', 'b1', 'b0'];
  const inPrefix = mode === 'bin2gray' ? 'B' : 'G';
  const outPrefix = mode === 'bin2gray' ? 'G' : 'B';

  return (
    <aside className="w-full lg:w-80 flex flex-col gap-3">
      {/* Top Selector Tabs for Right Sidebar */}
      <div className="flex rounded-xl bg-slate-900/90 p-1 border border-slate-800 text-xs font-mono font-bold">
        <button
          onClick={() => setActiveTab('logic')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
            activeTab === 'logic'
              ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Live State
        </button>
        <button
          onClick={() => setActiveTab('diagnostics')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
            activeTab === 'diagnostics'
              ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Diagnostics
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
            activeTab === 'guide'
              ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Guide ({completedCount}/{steps.length})
        </button>
      </div>

      {/* TAB 1: LIVE LOGIC CONVERTER STATE */}
      {activeTab === 'logic' && (
        <div className="space-y-3">
          {/* Main I/O Converter Card */}
          <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-3.5 shadow-xl backdrop-blur-md flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-sky-400" />
                {mode === 'bin2gray' ? 'Binary ➔ Gray Converter' : 'Gray ➔ Binary Converter'}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold">
                IC {icCode}
              </span>
            </div>

            {/* Input Vector Controls */}
            <div className="bg-slate-950/70 rounded-xl p-2.5 border border-slate-800">
              <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                <span className="text-slate-400 font-bold">
                  Input ({inPrefix}3..{inPrefix}0):
                </span>
                <span className="font-bold text-sky-400">
                  Dec: {inputDecimal} (0b{inputBits.b3}
                  {inputBits.b2}
                  {inputBits.b1}
                  {inputBits.b0})
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {inputBitKeys.map((bitKey, idx) => {
                  const bitVal = inputBits[bitKey];
                  const bitNum = 3 - idx;
                  return (
                    <button
                      key={bitKey}
                      onClick={() => toggleBit(bitKey)}
                      className={`p-2 rounded-lg font-mono font-bold text-center border transition-all flex flex-col items-center justify-center ${
                        bitVal === 1
                          ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/20'
                          : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-[9px] opacity-75">
                        {inPrefix}
                        {bitNum}
                      </span>
                      <span className="text-sm font-extrabold">{bitVal}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Signal Flow Arrow */}
            <div className="flex items-center justify-center -my-1 text-slate-500 font-mono text-[10px] gap-2">
              <div className="h-[1px] flex-1 bg-slate-800" />
              <span className="flex items-center gap-1 text-sky-400 font-bold">
                Quad XOR Logic Gates <ArrowRight className="w-3 h-3" />
              </span>
              <div className="h-[1px] flex-1 bg-slate-800" />
            </div>

            {/* Output Vector Display */}
            <div className="bg-slate-950/70 rounded-xl p-2.5 border border-slate-800">
              <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                <span className="text-slate-400 font-bold">
                  Output ({outPrefix}3..{outPrefix}0):
                </span>
                <span className="font-bold text-emerald-400">
                  Dec: {outputDecimal} (0b{outputBits.b3}
                  {outputBits.b2}
                  {outputBits.b1}
                  {outputBits.b0})
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {inputBitKeys.map((bitKey, idx) => {
                  const bitVal = outputBits[bitKey];
                  const bitNum = 3 - idx;
                  return (
                    <div
                      key={bitKey}
                      className={`p-2 rounded-lg font-mono font-bold text-center border transition-all flex flex-col items-center justify-center ${
                        bitVal === 1
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                          : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}
                    >
                      <span className="text-[9px] opacity-75">
                        {outPrefix}
                        {bitNum}
                      </span>
                      <span className="text-sm font-extrabold">{bitVal}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Logic Boolean Equations */}
            <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/80 text-[10px] font-mono text-slate-400 space-y-1">
              <div className="text-[9px] uppercase font-bold text-slate-500">Logic Formula:</div>
              {mode === 'bin2gray' ? (
                <div className="grid grid-cols-2 gap-1 text-slate-300">
                  <div>G3 = B3 = {outputBits.b3}</div>
                  <div>G2 = B3 ⊕ B2 = {outputBits.b2}</div>
                  <div>G1 = B2 ⊕ B1 = {outputBits.b1}</div>
                  <div>G0 = B1 ⊕ B0 = {outputBits.b0}</div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1 text-slate-300">
                  <div>B3 = G3 = {outputBits.b3}</div>
                  <div>B2 = B3 ⊕ G2 = {outputBits.b2}</div>
                  <div>B1 = B2 ⊕ G1 = {outputBits.b1}</div>
                  <div>B0 = B1 ⊕ G0 = {outputBits.b0}</div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Truth Table Mini View */}
          <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-3 shadow-xl flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-300">
              <span>Truth Table Tracker</span>
              <span className="text-sky-400">
                Verified: {verifiedRowsCount} / {totalRowsCount}
              </span>
            </div>

            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/70">
              <div className="grid grid-cols-4 bg-slate-900/90 py-1 px-2 border-b border-slate-800 text-[10px] font-mono font-bold text-slate-400 text-center">
                <span>DEC</span>
                <span>IN</span>
                <span>OUT</span>
                <span className="text-right">STAT</span>
              </div>
              <div className="divide-y divide-slate-800/50 text-xs font-mono max-h-[140px] overflow-y-auto">
                {(truthTableRows || []).slice(0, 16).map((row, idx) => {
                  const isCurrent = row.decimal === inputDecimal;
                  return (
                    <div
                      key={idx}
                      onClick={() => onSelectRow && onSelectRow(row.decimal)}
                      className={`grid grid-cols-4 py-1 px-2 items-center text-center cursor-pointer transition-colors ${
                        isCurrent
                          ? 'bg-sky-500/20 text-sky-300 font-bold'
                          : 'text-slate-300 hover:bg-slate-800/40'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400">{row.decimal}</span>
                      <span className="text-[10px] font-mono">{row.binaryStr}</span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        {row.grayStr || `${row.g3 ?? 0}${row.g2 ?? 0}${row.g1 ?? 0}${row.g0 ?? 0}`}
                      </span>
                      <span className="flex justify-end">
                        {row.isVerified || isCurrent ? (
                          <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-[9px]">
                            ✓
                          </span>
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center text-[9px]">
                            -
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DIAGNOSTICS & WIRING HEALTH */}
      {activeTab === 'diagnostics' && (
        <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-3.5 shadow-xl backdrop-blur-md flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Circuit Diagnostics
            </span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                circuitCheck?.isFullyWired
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}
            >
              {circuitCheck ? `${circuitCheck.accuracyPercent}% Valid` : 'Testing...'}
            </span>
          </div>

          {/* Diagnostics Summary List */}
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">IC Power (VCC & GND):</span>
              <span
                className={`font-bold flex items-center gap-1 ${
                  isICPowered ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isICPowered ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                {isICPowered ? '5.0V Active' : 'Disconnected'}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Mounted ICs:</span>
              <span className="font-bold text-sky-400">IC {icCode} ({icGateType})</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Total Jumper Wires:</span>
              <span className="font-bold text-slate-200">{wiresCount} connections</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Logic Mode:</span>
              <span className="font-bold text-purple-400">
                {mode === 'bin2gray' ? 'Binary ➔ Gray' : 'Gray ➔ Binary'}
              </span>
            </div>
          </div>

          {/* Detailed Circuit Requirements */}
          {circuitCheck && circuitCheck.details && (
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] uppercase font-bold text-slate-500 font-mono">
                Connection Checkpoints:
              </div>
              <div className="space-y-1 max-h-[220px] overflow-y-auto pr-1">
                {circuitCheck.details.map((det) => (
                  <div
                    key={det.id}
                    className={`p-2 rounded-lg border text-[11px] flex items-start gap-2 ${
                      det.status === 'connected'
                        ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="mt-0.5">
                      {det.status === 'connected' ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-amber-400" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold">{det.requirement}</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        {det.hint}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: STEP-BY-STEP GUIDED LAB INSTRUCTIONS */}
      {activeTab === 'guide' && (
        <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-3.5 shadow-xl backdrop-blur-md flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              Guided Instructions
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
              {progressPercent}% Done
            </span>
          </div>

          {/* Overall Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Step Items List */}
          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {steps.map((step) => {
              const isExpanded = expandedStep === step.id;
              return (
                <div
                  key={step.id}
                  className={`rounded-xl border transition-all ${
                    isExpanded
                      ? 'bg-slate-950/70 border-sky-500/50 shadow-md'
                      : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {/* Step Header */}
                  <div
                    onClick={() => setExpandedStep(isExpanded ? 0 : step.id)}
                    className="p-2.5 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center font-mono ${
                          step.isCompleted
                            ? 'bg-emerald-500 text-slate-950'
                            : isExpanded
                            ? 'bg-sky-500 text-slate-950'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {step.isCompleted ? '✓' : step.id}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          isExpanded ? 'text-slate-100' : 'text-slate-300'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-3 pb-3 pt-1 text-[11px] text-slate-300 space-y-2 border-t border-slate-800/60">
                      <p className="leading-relaxed">{step.description}</p>

                      {step.tip && (
                        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-start gap-1.5 text-[10px]">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span>{step.tip}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
};
