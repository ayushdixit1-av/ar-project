import React, { useState } from 'react';
import { BookOpen, CheckCircle, Cpu, Sparkles, Layers, ArrowRight, ShieldCheck } from 'lucide-react';

export const TheoryManual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'formulas' | 'ic7486' | 'applications'>('overview');

  return (
    <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl text-slate-200 flex flex-col gap-4">
      {/* Header with Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-semibold text-slate-100">
            Virtual Lab Manual & Engineering Theory
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Concept
          </button>
          <button
            onClick={() => setActiveTab('formulas')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeTab === 'formulas'
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Circuit Logic
          </button>
          <button
            onClick={() => setActiveTab('ic7486')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeTab === 'ic7486'
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            IC 7486 Pinout
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeTab === 'applications'
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Real Applications
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="text-xs space-y-4 leading-relaxed text-slate-300">
        {activeTab === 'overview' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-sky-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                What is Gray Code (Reflected Binary Code)?
              </h4>
              <p>
                Gray code, named after Frank Gray (Bell Labs, 1953), is an unweighted, non-arithmetic binary numeral system where <strong>two successive values differ in only one bit position</strong>.
              </p>
              <p>
                This single-bit transition property is known in computer science and digital electronics as the <strong>Unit Distance Property</strong>.
              </p>
            </div>

            {/* Why standard binary causes glitches */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-rose-400">
                The Critical Problem with Standard Binary: Transition Glitches
              </h4>
              <p>
                Consider transitioning from decimal <strong>7 (0111₂)</strong> to <strong>8 (1000₂)</strong> in standard binary. All 4 bits must change state simultaneously.
              </p>
              <p>
                In real-world physical devices (mechanical switches, optical shaft encoders, asynchronous flip-flops), slight propagation delays and switch bounce make it impossible for all 4 bits to flip at the exact same picosecond.
              </p>
              <div className="p-3 bg-rose-950/30 border border-rose-800/40 rounded-lg text-rose-200 font-mono text-[11px]">
                Standard Binary: 0111 ➔ [0110, 0000, 1111, 1010...] ➔ 1000 (Spurious Glitches!)
                <br />
                Gray Code: 0100 ➔ 1100 (Only 1 bit flips: Guaranteed Glitch-Free!)
              </div>
            </div>
          </div>
        )}

        {activeTab === 'formulas' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Binary to Gray Formulas */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-sky-400">1. Binary to Gray Code Conversion</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                  Parallel Structure
                </span>
              </div>
              <p className="text-slate-400">
                The MSB is directly copied. Each subsequent Gray bit is obtained by XORing adjacent binary bits:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-sky-300">
                  G₃ = B₃ (Direct pass)
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-sky-300">
                  G₂ = B₃ ⊕ B₂ (Gate 1)
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-sky-300">
                  G₁ = B₂ ⊕ B₁ (Gate 2)
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-sky-300">
                  G₀ = B₁ ⊕ B₀ (Gate 3)
                </div>
              </div>
            </div>

            {/* Gray to Binary Formulas */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-emerald-400">2. Gray to Binary Code Conversion</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Cascaded Feedback Structure
                </span>
              </div>
              <p className="text-slate-400">
                The MSB is directly copied. Each subsequent binary bit is obtained by XORing the previously computed binary bit with the current Gray bit:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-emerald-300">
                  B₃ = G₃ (Direct pass)
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-emerald-300">
                  B₂ = B₃ ⊕ G₂ (Gate 1)
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-emerald-300">
                  B₁ = B₂ ⊕ G₁ (Gate 2 cascaded)
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-emerald-300">
                  B₀ = B₁ ⊕ G₀ (Gate 3 cascaded)
                </div>
              </div>
            </div>

            {/* XOR Truth Table */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400 font-bold">XOR Truth Table:</span>
              <span>0 ⊕ 0 = 0</span>
              <span>0 ⊕ 1 = 1</span>
              <span>1 ⊕ 0 = 1</span>
              <span>1 ⊕ 1 = 0</span>
            </div>
          </div>
        )}

        {activeTab === 'ic7486' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-sky-400">IC 7486 (74HC86 / 74LS86) 14-Pin DIP Package</h4>
              <p className="text-slate-400">
                The 7486 contains <strong>four independent 2-input Exclusive-OR gates</strong>. It utilizes advanced silicon-gate CMOS / TTL technology operating typically at +5V DC.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-1.5 px-2">Pin #</th>
                      <th className="py-1.5 px-2">Designation</th>
                      <th className="py-1.5 px-2">Function in this Experiment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="py-1.5 px-2 font-bold text-sky-400">1, 2</td>
                      <td className="py-1.5 px-2">1A, 1B</td>
                      <td className="py-1.5 px-2">Gate 1 Inputs (XOR MSB with Bit 2)</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2 font-bold text-emerald-400">3</td>
                      <td className="py-1.5 px-2">1Y</td>
                      <td className="py-1.5 px-2">Gate 1 Output (Bit 2 Result)</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2 font-bold text-sky-400">4, 5</td>
                      <td className="py-1.5 px-2">2A, 2B</td>
                      <td className="py-1.5 px-2">Gate 2 Inputs (Bit 2 with Bit 1)</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2 font-bold text-emerald-400">6</td>
                      <td className="py-1.5 px-2">2Y</td>
                      <td className="py-1.5 px-2">Gate 2 Output (Bit 1 Result)</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2 font-bold text-slate-400">7</td>
                      <td className="py-1.5 px-2">GND</td>
                      <td className="py-1.5 px-2">Ground Reference (0.0V)</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2 font-bold text-sky-400">8, 9</td>
                      <td className="py-1.5 px-2">3A, 3B</td>
                      <td className="py-1.5 px-2">Gate 3 Inputs (Bit 1 with Bit 0)</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2 font-bold text-emerald-400">10</td>
                      <td className="py-1.5 px-2">3Y</td>
                      <td className="py-1.5 px-2">Gate 3 Output (Bit 0 LSB Result)</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2 font-bold text-slate-500">11, 12, 13</td>
                      <td className="py-1.5 px-2">4A, 4B, 4Y</td>
                      <td className="py-1.5 px-2 text-slate-500">Gate 4 (Unused / Idle for 4-bit converter)</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2 font-bold text-rose-400">14</td>
                      <td className="py-1.5 px-2">VCC</td>
                      <td className="py-1.5 px-2 text-rose-300">Positive Supply Voltage (+5.0V DC)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-sky-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Optical Rotary Shaft Encoders
              </div>
              <p className="text-slate-400">
                Robotics, CNC machinery, and aerospace gyroscopes use Gray-coded optical discs. Because only 1 track changes at any boundary angle, reading errors during rotation are eliminated.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-sky-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Flash Analog-to-Digital Converters (ADCs)
              </div>
              <p className="text-slate-400">
                High-speed ADCs first convert comparator thermometer codes into Gray code before binary to minimize metastable state sampling errors.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-sky-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Asynchronous FIFO Memory Pointers
              </div>
              <p className="text-slate-400">
                In multi-clock digital ASICs and FPGAs, FIFO read/write address pointers are passed across clock domains in Gray code to avoid clock domain crossing (CDC) metastability.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
