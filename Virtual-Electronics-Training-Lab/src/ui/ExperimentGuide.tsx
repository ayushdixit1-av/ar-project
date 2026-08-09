import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronRight, BookOpen, Lightbulb } from 'lucide-react';
import { getGuidedStepsForIC } from '../electronics/experiments';
import { ICType, CircuitState } from '../types/electronics';
import { SimulationResult } from '../electronics/circuitSimulator';

interface ExperimentGuideProps {
  icType: ICType;
  circuitState: CircuitState;
  simResult?: SimulationResult;
}

export const ExperimentGuide: React.FC<ExperimentGuideProps> = ({ icType, circuitState, simResult }) => {
  const steps = getGuidedStepsForIC(icType);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const completedCount = steps.filter((st) => st.isCompleted(circuitState, simResult)).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="bg-[#12151B] border border-white/5 rounded-xl p-4 text-slate-200 shadow-2xl space-y-3 w-72 shrink-0">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          Guided Instructions
        </h2>
        <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
          {progressPercent}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
        <div
          className="bg-blue-500 h-1 rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="space-y-3 max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
        {steps.map((st, idx) => {
          const completed = st.isCompleted(circuitState, simResult);
          const isCurrent = idx === activeStepIndex;

          return (
            <div
              key={st.stepNumber}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                completed
                  ? 'bg-white/5 border-white/5 text-slate-300'
                  : isCurrent
                  ? 'bg-blue-500/10 border-blue-500/40 text-white font-medium'
                  : 'bg-white/5 border-white/5 text-slate-500 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border shrink-0 ${
                    completed
                      ? 'bg-green-500/20 text-green-500 border-green-500/30'
                      : isCurrent
                      ? 'bg-blue-500 text-white border-blue-500/30'
                      : 'bg-white/10 text-white/50 border-white/10'
                  }`}
                >
                  {st.stepNumber}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200 text-[11px]">{st.title}</span>
                    <ChevronRight
                      className={`w-3 h-3 transition-transform ${isCurrent ? 'rotate-90 text-blue-400' : 'text-slate-600'}`}
                    />
                  </div>

                  {isCurrent && (
                    <div className="mt-2 space-y-2 border-t border-white/5 pt-2 text-[11px] text-slate-300">
                      <p className="leading-relaxed">{st.instruction}</p>
                      <div className="flex items-start gap-1.5 text-[10px] text-amber-300/90 bg-amber-500/10 p-2 rounded border border-amber-500/20">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{st.hint}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
