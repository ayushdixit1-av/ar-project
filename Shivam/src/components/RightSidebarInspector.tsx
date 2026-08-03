import React, { useState } from 'react';
import {
  PlacedComponent,
  ElectronicComponentMeta,
  SimulationState,
  AppViewMode,
  InteractiveTutorial,
  QuizQuestion,
  AssessmentTask,
  JumperWire,
} from '../types';
import { COMPONENTS_LIBRARY } from '../data/componentsLibrary';
import { GUIDED_TUTORIALS } from '../data/tutorialsData';
import { QUIZ_QUESTIONS, ASSESSMENT_TASKS } from '../data/quizzesData';
import { audioSynth } from '../utils/audioSynth';
import {
  Info,
  Sliders,
  GraduationCap,
  HelpCircle,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  BookOpen,
  Award,
  Layers,
  Activity,
  Cpu,
  PanelRightClose,
  PanelRightOpen,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface RightSidebarInspectorProps {
  selectedComponent: PlacedComponent | null;
  placedComponents: PlacedComponent[];
  wires: JumperWire[];
  simState: SimulationState;
  setSimState: React.Dispatch<React.SetStateAction<SimulationState>>;
  activeView: AppViewMode;
  setActiveView: (view: AppViewMode) => void;
  onAutoWireTutorial: (tutorial: InteractiveTutorial) => void;
  onRemoveComponent?: (id: string) => void;
  onRemoveWire?: (wireId: string) => void;
}

export const RightSidebarInspector: React.FC<RightSidebarInspectorProps> = ({
  selectedComponent,
  placedComponents,
  wires,
  simState,
  setSimState,
  activeView,
  setActiveView,
  onAutoWireTutorial,
  onRemoveComponent,
  onRemoveWire,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 1024 : false;
  });
  const [inspectorTab, setInspectorTab] = useState<'info' | 'sim' | 'labs' | 'quiz'>('info');

  // Active Tutorial State
  const [activeTutorialIndex, setActiveTutorialIndex] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Active Quiz State
  const [activeQuizIndex, setActiveQuizIndex] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Assessment State
  const [activeAssessmentIndex, setActiveAssessmentIndex] = useState<number>(0);
  const [assessmentResult, setAssessmentResult] = useState<{ score: number; passed: boolean; details: string[] } | null>(null);

  // Get selected component meta data
  const meta: ElectronicComponentMeta | null = selectedComponent
    ? COMPONENTS_LIBRARY.find((c) => c.id === selectedComponent.componentMetaId) || null
    : COMPONENTS_LIBRARY[0];

  // Handle Simulation Inputs change
  const handleSimInputChange = (key: keyof SimulationState, val: any) => {
    setSimState((prev) => {
      const updated = { ...prev, [key]: val };

      // Trigger Web Audio synth feedback
      if (key === 'potentiometerVal') {
        const angle = Math.round((val / 100) * 180);
        updated.servoAngle = angle;
        audioSynth.playServoSound();
      }
      if (key === 'button1Pressed') {
        if (val) {
          updated.buzzerToneFreq = 2300;
          audioSynth.setBuzzerTone(2300);
        } else {
          updated.buzzerToneFreq = 0;
          audioSynth.setBuzzerTone(0);
        }
      }
      if (key === 'ambientTempC') {
        updated.lcdLine1 = `Temp: ${val.toFixed(1)} C`;
        updated.lcdLine2 = `Humidity: ${Math.round(45 + val * 0.3)}%`;
      }

      return updated;
    });
  };

  // Grade Assessment Task
  const evaluateAssessment = () => {
    const task = ASSESSMENT_TASKS[activeAssessmentIndex];
    let matchedConnections = 0;
    const details: string[] = [];

    task.requiredConnections.forEach((req) => {
      // Find wire connecting fromMeta to toMeta
      const isMatched = wires.some((w) => {
        const fromComp = placedComponents.find((c) => c.id === w.fromComponentId);
        const toComp = placedComponents.find((c) => c.id === w.toComponentId);
        return (
          (fromComp?.componentMetaId === req.fromMeta &&
            w.fromPinId === req.fromPin &&
            toComp?.componentMetaId === req.toMeta &&
            w.toPinId === req.toPin) ||
          (fromComp?.componentMetaId === req.toMeta &&
            w.fromPinId === req.toPin &&
            toComp?.componentMetaId === req.fromMeta &&
            w.toPinId === req.fromPin)
        );
      });

      if (isMatched) {
        matchedConnections++;
        details.push(`✓ Connection ${req.fromPin} ➔ ${req.toPin} verified.`);
      } else {
        details.push(`✗ Missing wire from ${req.fromMeta} (${req.fromPin}) to ${req.toMeta} (${req.toPin})`);
      }
    });

    const score = Math.round((matchedConnections / task.requiredConnections.length) * task.maxPoints);
    const passed = score >= 80;

    audioSynth.playChime(passed);
    setAssessmentResult({ score, passed, details });
  };

  // COLLAPSED SIDEBAR VIEW
  if (isCollapsed) {
    return (
      <aside className="w-14 h-full bg-[#0a0a0a] border-l border-white/10 flex flex-col items-center py-3 gap-4 z-20 shrink-0 transition-all duration-300 select-none">
        {/* Expand Toggle Button */}
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all shadow-lg group relative"
          title="Expand Inspector Panel"
        >
          <PanelRightOpen className="w-5 h-5" />
          <span className="absolute right-full mr-2 px-2 py-1 bg-black text-white text-[10px] font-mono rounded border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
            Expand Inspector
          </span>
        </button>

        <div className="w-8 h-[1px] bg-white/10 my-1" />

        {/* Tab Shortcut Icons when Collapsed */}
        <div className="flex flex-col gap-2 items-center">
          <button
            onClick={() => {
              setInspectorTab('info');
              setIsCollapsed(false);
            }}
            className={`p-2.5 rounded-xl border transition-all relative group shadow-md ${
              inspectorTab === 'info'
                ? 'bg-blue-600 text-white border-blue-400'
                : 'bg-slate-900 text-gray-400 hover:text-white border-white/10'
            }`}
            title="Datasheet / Info"
          >
            <Info className="w-4 h-4" />
            <span className="absolute right-full mr-2 px-2 py-1 bg-slate-900 text-blue-300 text-[10px] font-mono rounded border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
              Datasheet
            </span>
          </button>

          <button
            onClick={() => {
              setInspectorTab('sim');
              setIsCollapsed(false);
            }}
            className={`p-2.5 rounded-xl border transition-all relative group shadow-md ${
              inspectorTab === 'sim'
                ? 'bg-blue-600 text-white border-blue-400'
                : 'bg-slate-900 text-gray-400 hover:text-white border-white/10'
            }`}
            title="Simulation Controls"
          >
            <Sliders className="w-4 h-4" />
            <span className="absolute right-full mr-2 px-2 py-1 bg-slate-900 text-blue-300 text-[10px] font-mono rounded border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
              Simulation
            </span>
          </button>

          <button
            onClick={() => {
              setInspectorTab('labs');
              setIsCollapsed(false);
            }}
            className={`p-2.5 rounded-xl border transition-all relative group shadow-md ${
              inspectorTab === 'labs'
                ? 'bg-blue-600 text-white border-blue-400'
                : 'bg-slate-900 text-gray-400 hover:text-white border-white/10'
            }`}
            title="Guided Labs"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="absolute right-full mr-2 px-2 py-1 bg-slate-900 text-blue-300 text-[10px] font-mono rounded border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
              Labs
            </span>
          </button>

          <button
            onClick={() => {
              setInspectorTab('quiz');
              setIsCollapsed(false);
            }}
            className={`p-2.5 rounded-xl border transition-all relative group shadow-md ${
              inspectorTab === 'quiz'
                ? 'bg-blue-600 text-white border-blue-400'
                : 'bg-slate-900 text-gray-400 hover:text-white border-white/10'
            }`}
            title="Grading & Quizzes"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="absolute right-full mr-2 px-2 py-1 bg-slate-900 text-blue-300 text-[10px] font-mono rounded border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
              Grading
            </span>
          </button>
        </div>
      </aside>
    );
  }

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      <div
        onClick={() => setIsCollapsed(true)}
        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity"
      />
      <aside className="w-96 h-full bg-[#0a0a0a] border-l border-white/10 flex flex-col selection:bg-blue-500 selection:text-white z-40 shrink-0 transition-all duration-300 max-lg:fixed max-lg:right-0 max-lg:top-14 max-lg:bottom-0 max-lg:w-80 max-sm:w-[85vw] max-lg:shadow-2xl">
      {/* Top Header Strip with Collapse Toggle */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#08080d] border-b border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-gray-300 font-bold uppercase tracking-wider text-[11px]">
            Inspector Panel
          </span>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition-all text-[11px] font-mono"
          title="Collapse Inspector Panel"
        >
          <PanelRightClose className="w-3.5 h-3.5 text-blue-400" />
          <span>Collapse</span>
        </button>
      </div>

      {/* Tab Navigation Header */}
      <div className="grid grid-cols-4 bg-[#0e0e14] border-b border-white/10 p-1">
        <button
          onClick={() => setInspectorTab('info')}
          className={`flex flex-col items-center py-2 rounded-lg text-[10px] font-mono transition-all ${
            inspectorTab === 'info'
              ? 'bg-blue-600 text-white font-bold shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Info className="w-3.5 h-3.5 mb-0.5" />
          <span>Datasheet</span>
        </button>

        <button
          onClick={() => setInspectorTab('sim')}
          className={`flex flex-col items-center py-2 rounded-lg text-[10px] font-mono transition-all ${
            inspectorTab === 'sim'
              ? 'bg-blue-600 text-white font-bold shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 mb-0.5" />
          <span>Simulation</span>
        </button>

        <button
          onClick={() => setInspectorTab('labs')}
          className={`flex flex-col items-center py-2 rounded-lg text-[10px] font-mono transition-all ${
            inspectorTab === 'labs'
              ? 'bg-blue-600 text-white font-bold shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 mb-0.5" />
          <span>Labs</span>
        </button>

        <button
          onClick={() => setInspectorTab('quiz')}
          className={`flex flex-col items-center py-2 rounded-lg text-[10px] font-mono transition-all ${
            inspectorTab === 'quiz'
              ? 'bg-blue-600 text-white font-bold shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 mb-0.5" />
          <span>Grading</span>
        </button>
      </div>

      {/* Main Tab Body Content */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
        {/* TAB 1: DATASHEET & EDUCATIONAL MODE */}
        {inspectorTab === 'info' && meta && (
          <div className="space-y-4">
            {/* Component Name & Category Badge */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {meta.category}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {meta.dimensions.x} x {meta.dimensions.z} cm
                  </span>
                </div>

                {selectedComponent &&
                  selectedComponent.id !== 'comp-base' &&
                  selectedComponent.id !== 'comp-bb' &&
                  onRemoveComponent && (
                    <button
                      onClick={() => onRemoveComponent(selectedComponent.id)}
                      className="px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500/25 text-xs font-mono font-semibold flex items-center gap-1 transition-all"
                      title="Remove selected component from workspace"
                    >
                      <RotateCcw className="w-3.5 h-3.5 rotate-45" />
                      <span>Remove Object</span>
                    </button>
                  )}
              </div>
              <h2 className="text-base font-bold text-white tracking-wide">{meta.name}</h2>
              <p className="text-xs text-blue-400 mt-0.5 font-medium">{meta.tagline}</p>
            </div>

            {/* Description & Working Principle */}
            <div className="p-3 bg-[#111116] rounded-xl border border-white/5 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-mono font-semibold">
                Working Principle
              </span>
              <p className="text-xs text-gray-300 leading-relaxed">{meta.workingPrinciple}</p>
            </div>

            {/* Specifications Cards Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-[#111116] rounded-lg border border-white/5">
                <span className="text-[10px] text-gray-500 font-mono">Operating Voltage</span>
                <p className="text-xs font-mono font-semibold text-emerald-400">{meta.operatingVoltage}</p>
              </div>
              <div className="p-2.5 bg-[#111116] rounded-lg border border-white/5">
                <span className="text-[10px] text-gray-500 font-mono">Max Current Draw</span>
                <p className="text-xs font-mono font-semibold text-blue-400">{meta.operatingCurrent}</p>
              </div>
            </div>

            {/* Pinout Table */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-mono font-semibold">
                Pinout Function Diagram ({meta.pins.length} Pins)
              </span>
              <div className="border border-white/10 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#14141d] text-gray-400 font-mono text-[10px] uppercase border-b border-white/10">
                    <tr>
                      <th className="p-2">Pin Name</th>
                      <th className="p-2">Type</th>
                      <th className="p-2">Function</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 bg-[#0f0f14]">
                    {meta.pins.map((pin) => (
                      <tr key={pin.id} className="hover:bg-white/5 font-mono">
                        <td className="p-2 font-semibold text-white">{pin.name}</td>
                        <td className="p-2">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] ${
                              pin.type === 'VCC' || pin.type === 'POWER'
                                ? 'bg-rose-500/20 text-rose-400'
                                : pin.type === 'GND'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-emerald-500/20 text-emerald-400'
                            }`}
                          >
                            {pin.type}
                          </span>
                        </td>
                        <td className="p-2 text-gray-400 text-[11px]">{pin.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Applications & Common Mistakes */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-mono font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Common Engineering Mistakes
              </span>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {meta.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-amber-500/5 p-2 rounded-lg border border-amber-500/20">
                    <span className="text-amber-400 text-xs">!</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Active Jumper Wires List */}
            <div className="space-y-2 border-t border-white/10 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-mono font-semibold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  Active Jumper Wires ({wires.length})
                </span>
              </div>

              {wires.length === 0 ? (
                <p className="text-xs text-gray-500 font-mono p-2 bg-[#111] rounded-lg">No jumper wires currently connected.</p>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
                  {wires.map((w) => (
                    <div
                      key={w.id}
                      className="p-2 bg-[#111118] border border-white/5 rounded-lg flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: w.color }}
                        />
                        <span className="text-gray-300">
                          {w.fromPinId} ➔ {w.toPinId}
                        </span>
                      </div>

                      {onRemoveWire && (
                        <button
                          onClick={() => onRemoveWire(w.id)}
                          className="text-rose-400 hover:text-rose-300 p-1 hover:bg-rose-500/10 rounded transition-all text-[11px]"
                          title="Remove this wire"
                        >
                          Delete Wire
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: REAL-TIME SIMULATION CONTROL */}
        {inspectorTab === 'sim' && (
          <div className="space-y-4">
            {/* Trainer Board 10-Channel I/O Control Console */}
            <div className="p-3 bg-[#111116] rounded-xl border border-blue-500/30 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-mono font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  10-Channel Logic Inputs (SW1–SW10)
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  {simState.isPowered ? '5.0V POWERED' : 'OFF'}
                </span>
              </div>

              {/* 10 Input Toggle Switches Grid */}
              <div className="grid grid-cols-5 gap-1.5">
                {(simState.inputs || new Array(10).fill(false)).map((isHigh, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSimState((prev) => {
                        const nextInputs = [...(prev.inputs || new Array(10).fill(false))];
                        nextInputs[idx] = !nextInputs[idx];
                        return {
                          ...prev,
                          inputs: nextInputs,
                          switchAOn: nextInputs[0],
                          switchBOn: nextInputs[1],
                        };
                      });
                    }}
                    className={`py-2 px-1 rounded-lg border text-[10px] font-mono font-bold flex flex-col items-center justify-center gap-0.5 transition-all ${
                      isHigh
                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-md shadow-emerald-600/30'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>SW{idx + 1}</span>
                    <span className="text-[9px]">{isHigh ? '1 (HIGH)' : '0 (LOW)'}</span>
                  </button>
                ))}
              </div>

              {/* 10 Output Indicators Grid */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-mono font-semibold block mb-2">
                  10-Channel Output Status LEDs (OUT1–OUT10)
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {(simState.outputs || new Array(10).fill(false)).map((isLit, idx) => (
                    <div
                      key={idx}
                      className={`py-2 px-1 rounded-lg border text-[10px] font-mono font-bold flex flex-col items-center justify-center gap-0.5 ${
                        isLit
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                          : 'bg-slate-950 border-slate-800 text-slate-600'
                      }`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          isLit ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-slate-700'
                        }`}
                      />
                      <span>OUT{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Interactive Sensor Inputs */}
            <div className="p-3 bg-[#111116] rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-mono font-semibold">
                  Interactive Sensor Controls
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  {simState.isPowered ? 'LIVE SIGNAL RUNNING' : 'POWER STANDBY'}
                </span>
              </div>

              {/* Potentiometer Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-300 font-mono">
                  <span>10kΩ Potentiometer Dial</span>
                  <span className="text-blue-400">{simState.potentiometerVal}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={simState.potentiometerVal}
                  onChange={(e) => handleSimInputChange('potentiometerVal', Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              {/* Temperature Sensor Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-300 font-mono">
                  <span>DHT11 Temperature (°C)</span>
                  <span className="text-amber-400">{simState.ambientTempC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.5"
                  value={simState.ambientTempC}
                  onChange={(e) => handleSimInputChange('ambientTempC', Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Distance Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-300 font-mono">
                  <span>Ultrasonic Distance (cm)</span>
                  <span className="text-emerald-400">{simState.distanceCm} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="400"
                  value={simState.distanceCm}
                  onChange={(e) => handleSimInputChange('distanceCm', Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Push Button Toggle */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-gray-300 font-mono">Tactile Push Button 1</span>
                <button
                  onMouseDown={() => handleSimInputChange('button1Pressed', true)}
                  onMouseUp={() => handleSimInputChange('button1Pressed', false)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                    simState.button1Pressed
                      ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {simState.button1Pressed ? 'PRESSED (Buzzer ON)' : 'PRESS & HOLD'}
                </button>
              </div>
            </div>

            {/* Simulated Display Outputs */}
            <div className="p-3 bg-[#0d1117] rounded-xl border border-blue-500/20 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-mono font-semibold">
                I2C LCD 16x2 Real-Time Display
              </span>
              <div className="bg-[#002244] p-3 rounded-lg border border-blue-500/40 font-mono text-cyan-300 text-xs shadow-inner">
                <div>{simState.lcdLine1}</div>
                <div>{simState.lcdLine2}</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GUIDED LABS / TUTORIALS */}
        {inspectorTab === 'labs' && (
          <div className="space-y-4">
            {/* Tutorial Select Box */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-mono font-semibold">
                Select Guided Practical Lab
              </span>
              <div className="space-y-1.5">
                {GUIDED_TUTORIALS.map((tut, idx) => (
                  <button
                    key={tut.id}
                    onClick={() => {
                      setActiveTutorialIndex(idx);
                      setCurrentStepIndex(0);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      activeTutorialIndex === idx
                        ? 'bg-blue-600/20 border-blue-500/50 text-white'
                        : 'bg-[#111116] border-white/5 text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{tut.title}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">
                        {tut.difficulty}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 line-clamp-1">{tut.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Tutorial Steps */}
            {GUIDED_TUTORIALS[activeTutorialIndex] && (
              <div className="p-3 bg-[#111116] rounded-xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-xs font-bold text-blue-400 font-mono">
                    Step {currentStepIndex + 1} of {GUIDED_TUTORIALS[activeTutorialIndex].steps.length}
                  </span>
                  <button
                    onClick={() => onAutoWireTutorial(GUIDED_TUTORIALS[activeTutorialIndex])}
                    className="px-2.5 py-1 rounded bg-blue-600 text-white text-[10px] font-mono font-semibold hover:bg-blue-500 transition-all"
                  >
                    Auto-Wire Circuit
                  </button>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">
                    {GUIDED_TUTORIALS[activeTutorialIndex].steps[currentStepIndex].title}
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {GUIDED_TUTORIALS[activeTutorialIndex].steps[currentStepIndex].instruction}
                  </p>
                </div>

                {/* Step Navigation Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <button
                    disabled={currentStepIndex === 0}
                    onClick={() => setCurrentStepIndex((p) => p - 1)}
                    className="px-3 py-1 rounded bg-white/5 text-xs text-gray-300 disabled:opacity-30"
                  >
                    Previous
                  </button>
                  <button
                    disabled={currentStepIndex === GUIDED_TUTORIALS[activeTutorialIndex].steps.length - 1}
                    onClick={() => setCurrentStepIndex((p) => p + 1)}
                    className="px-3 py-1 rounded bg-blue-600 text-xs text-white disabled:opacity-30"
                  >
                    Next Step ➔
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: QUIZZES & TEACHER ASSESSMENT */}
        {inspectorTab === 'quiz' && (
          <div className="space-y-4">
            {/* Quiz Mode Header */}
            <div className="p-3 bg-[#111116] rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-mono font-semibold">
                  Interactive Quiz
                </span>
                <span className="text-xs font-mono text-emerald-400">Score: {quizScore} Pts</span>
              </div>

              {QUIZ_QUESTIONS[activeQuizIndex] && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-white">
                    {QUIZ_QUESTIONS[activeQuizIndex].question}
                  </h3>

                  {QUIZ_QUESTIONS[activeQuizIndex].options && (
                    <div className="space-y-1.5">
                      {QUIZ_QUESTIONS[activeQuizIndex].options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedQuizOption(opt);
                            const isCorrect = opt === QUIZ_QUESTIONS[activeQuizIndex].correctAnswer;
                            if (isCorrect) setQuizScore((s) => s + QUIZ_QUESTIONS[activeQuizIndex].points);
                            setQuizFeedback({
                              isCorrect,
                              text: QUIZ_QUESTIONS[activeQuizIndex].explanation,
                            });
                          }}
                          className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-all ${
                            selectedQuizOption === opt
                              ? 'bg-blue-600 text-white border-blue-400'
                              : 'bg-white/5 text-gray-300 border-white/5 hover:bg-white/10'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {quizFeedback && (
                    <div
                      className={`p-2.5 rounded-lg border text-xs leading-relaxed ${
                        quizFeedback.isCorrect
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      }`}
                    >
                      <div className="font-bold mb-1">
                        {quizFeedback.isCorrect ? '✓ Correct Answer!' : '✗ Incorrect'}
                      </div>
                      <div>{quizFeedback.text}</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Practical Assessment Mode Grading */}
            <div className="p-3 bg-[#111116] rounded-xl border border-white/10 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-mono font-semibold">
                Auto-Grading Practical Assessment
              </span>

              <button
                onClick={evaluateAssessment}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono rounded-lg transition-all shadow-lg"
              >
                Grade Circuit Connections Now
              </button>

              {assessmentResult && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span>Grade Score:</span>
                    <span className={assessmentResult.passed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {assessmentResult.score} / 100 PTS ({assessmentResult.passed ? 'PASSED' : 'RETRY'})
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px] font-mono">
                    {assessmentResult.details.map((line, idx) => (
                      <div key={idx} className={line.startsWith('✓') ? 'text-emerald-400' : 'text-rose-400'}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
    </>
  );
};
