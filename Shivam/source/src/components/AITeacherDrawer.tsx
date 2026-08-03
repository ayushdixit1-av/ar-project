import React, { useState } from 'react';
import { SimulationState, PlacedComponent, JumperWire, ElectronicComponentMeta } from '../types';
import { COMPONENTS_LIBRARY } from '../data/componentsLibrary';
import {
  Bot,
  Sparkles,
  Zap,
  Power,
  ToggleLeft,
  Trash2,
  RefreshCw,
  Send,
  PlusCircle,
  Cpu,
  Terminal,
  Activity,
  CheckCircle2,
  X,
  PanelRightClose,
} from 'lucide-react';

interface AITeacherDrawerProps {
  onClose?: () => void;
  simState: SimulationState;
  setSimState: React.Dispatch<React.SetStateAction<SimulationState>>;
  placedComponents: PlacedComponent[];
  setPlacedComponents: React.Dispatch<React.SetStateAction<PlacedComponent[]>>;
  wires: JumperWire[];
  setWires: React.Dispatch<React.SetStateAction<JumperWire[]>>;
  selectedIC?: PlacedComponent | null;
  onAddComponent: (meta: ElectronicComponentMeta) => void;
  onRemoveComponent: (id: string) => void;
  onAddWire: (fromCompId: string, fromPinId: string, toCompId: string, toPinId: string, color?: string) => void;
  onRemoveWire: (wireId: string) => void;
  onClearAllWires: () => void;
}

export const AITeacherDrawer: React.FC<AITeacherDrawerProps> = ({
  onClose,
  simState,
  setSimState,
  placedComponents,
  setPlacedComponents,
  wires,
  setWires,
  selectedIC,
  onAddComponent,
  onRemoveComponent,
  onAddWire,
  onRemoveWire,
  onClearAllWires,
}) => {
  const [userQuery, setUserQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'Hello! I am your AI Electronics Professor. I have FULL DIRECT CONTROL over your 3D laboratory workbench. Tell me what to build, wire, or modify in plain English (e.g., "Build AND gate experiment", "Power on bench", "Wire switch A to pin 1", "Clear all wires")!',
      time: 'Just now',
    },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Professor Execute Preset Circuit Experiment Setup
  const executePresetExperiment = (gateType: 'AND' | 'NAND' | 'OR' | 'NOT') => {
    let metaId = 'ic-7408-and';
    let gateName = '7408 AND Gate';
    if (gateType === 'NAND') {
      metaId = 'ic-7400-nand';
      gateName = '7400 NAND Gate';
    } else if (gateType === 'OR') {
      metaId = 'ic-7432-or';
      gateName = '7432 OR Gate';
    } else if (gateType === 'NOT') {
      metaId = 'ic-7404-not';
      gateName = '7404 NOT Gate';
    }

    const targetMeta = COMPONENTS_LIBRARY.find((m) => m.id === metaId);
    if (!targetMeta) return;

    // 1. Keep base trainer board & main breadboard, remove all other ICs/components
    const icId = `ic-${Math.random().toString(36).substring(2, 6)}`;
    const newPlaced: PlacedComponent = {
      id: icId,
      componentMetaId: targetMeta.id,
      label: targetMeta.name,
      position: [0, 0.5, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    };

    setPlacedComponents((prev) => [
      ...prev.filter((c) => c.id === 'comp-base' || c.id === 'comp-bb'),
      newPlaced,
    ]);

    // 2. Clear old wires
    onClearAllWires();

    // 3. Build new wires for full experiment
    setTimeout(() => {
      const newWires: JumperWire[] = [];

      // Power +5V: Trainer VCC -> IC Pin 14 (Red)
      newWires.push({
        id: `wire-vcc-${Math.random().toString(36).substring(2, 5)}`,
        fromComponentId: 'comp-base',
        fromPinId: 'tb-vcc5a',
        toComponentId: icId,
        toPinId: 'pin-14',
        color: '#ef4444',
        isEnergized: true,
      });

      // Ground GND: Trainer GND -> IC Pin 7 (Blue)
      newWires.push({
        id: `wire-gnd-${Math.random().toString(36).substring(2, 5)}`,
        fromComponentId: 'comp-base',
        fromPinId: 'tb-gnd1',
        toComponentId: icId,
        toPinId: 'pin-7',
        color: '#3b82f6',
        isEnergized: true,
      });

      // Switch A -> IC Pin 1 (Green)
      newWires.push({
        id: `wire-swA-${Math.random().toString(36).substring(2, 5)}`,
        fromComponentId: 'comp-base',
        fromPinId: 'tb-swA',
        toComponentId: icId,
        toPinId: 'pin-1',
        color: '#22c55e',
        isEnergized: true,
      });

      if (gateType !== 'NOT') {
        // Switch B -> IC Pin 2 (Yellow)
        newWires.push({
          id: `wire-swB-${Math.random().toString(36).substring(2, 5)}`,
          fromComponentId: 'comp-base',
          fromPinId: 'tb-swB',
          toComponentId: icId,
          toPinId: 'pin-2',
          color: '#eab308',
          isEnergized: true,
        });

        // Output Pin 3 -> Trainer LED 1 (Purple)
        newWires.push({
          id: `wire-out-${Math.random().toString(36).substring(2, 5)}`,
          fromComponentId: icId,
          fromPinId: 'pin-3',
          toComponentId: 'comp-base',
          toPinId: 'tb-led1',
          color: '#a855f7',
          isEnergized: true,
        });
      } else {
        // Output Pin 2 -> Trainer LED 1 (Purple) for NOT Gate
        newWires.push({
          id: `wire-out-${Math.random().toString(36).substring(2, 5)}`,
          fromComponentId: icId,
          fromPinId: 'pin-2',
          toComponentId: 'comp-base',
          toPinId: 'tb-led1',
          color: '#a855f7',
          isEnergized: true,
        });
      }

      setWires(newWires);

      // 4. Power ON Bench & Set Inputs HIGH
      setSimState((prev) => ({
        ...prev,
        isPowered: true,
        switchAOn: true,
        switchBOn: true,
        serialMonitorLog: [
          `[AI Professor] Auto-wired full ${gateName} experiment! VCC (+5V), GND, Switch A & B, and LED Output connected. Bench power energized.`,
          ...prev.serialMonitorLog,
        ],
      }));
    }, 50);

    const confirmationMsg = `⚡ COMMAND EXECUTED: Configured ${gateName} Experiment!\n` +
      `• Placed ${gateName} IC on breadboard center\n` +
      `• Connected VCC (+5V) to Pin 14 (Red Wire)\n` +
      `• Connected GND (0V) to Pin 7 (Blue Wire)\n` +
      `• Connected Logic Switch A to Pin 1 (Green Wire)\n` +
      `${gateType !== 'NOT' ? '• Connected Logic Switch B to Pin 2 (Yellow Wire)\n' : ''}` +
      `• Connected Gate Output to Status LED 1 (Purple Wire)\n` +
      `• Bench Power: ENERGIZED (+5.0V DC)`;

    setChatHistory((prev) => [
      ...prev,
      {
        sender: 'ai',
        text: confirmationMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Process Circuit Actions array returned by AI
  const executeCircuitActions = (actions: any[]) => {
    let logSummary: string[] = [];

    actions.forEach((act) => {
      if (!act || !act.type) return;

      switch (act.type) {
        case 'POWER':
          setSimState((prev) => ({ ...prev, isPowered: !!act.value }));
          logSummary.push(`• Bench Power: ${act.value ? 'ON (+5V DC)' : 'OFF'}`);
          break;

        case 'SWITCH_A':
          setSimState((prev) => ({ ...prev, switchAOn: !!act.value }));
          logSummary.push(`• Logic Switch A: ${act.value ? 'HIGH (1)' : 'LOW (0)'}`);
          break;

        case 'SWITCH_B':
          setSimState((prev) => ({ ...prev, switchBOn: !!act.value }));
          logSummary.push(`• Logic Switch B: ${act.value ? 'HIGH (1)' : 'LOW (0)'}`);
          break;

        case 'CLEAR_WIRES':
          onClearAllWires();
          logSummary.push('• Cleared all jumper wires');
          break;

        case 'REMOVE_COMPONENT':
          if (act.id === 'all') {
            setPlacedComponents((prev) => prev.filter((c) => c.id === 'comp-base' || c.id === 'comp-bb'));
            onClearAllWires();
            logSummary.push('• Removed all placed IC objects');
          } else if (act.id) {
            onRemoveComponent(act.id);
            logSummary.push(`• Removed object ${act.id}`);
          }
          break;

        case 'ADD_COMPONENT': {
          const meta = COMPONENTS_LIBRARY.find((m) => m.id === act.metaId || m.id.includes(act.metaId));
          if (meta) {
            onAddComponent(meta);
            logSummary.push(`• Added ${meta.name} to 3D board`);
          }
          break;
        }

        case 'ADD_WIRE': {
          let fromComp = act.fromCompId || 'comp-base';
          let toComp = act.toCompId;

          // Resolve IC target if vague
          if (!toComp || toComp === 'target-ic' || toComp === 'ic') {
            const firstIC = placedComponents.find((c) => c.componentMetaId.startsWith('ic-74'));
            if (firstIC) toComp = firstIC.id;
          }

          if (fromComp && toComp && act.fromPinId && act.toPinId) {
            onAddWire(fromComp, act.fromPinId, toComp, act.toPinId, act.color || '#3b82f6');
            logSummary.push(`• Wired ${act.fromPinId} ➔ ${act.toPinId}`);
          }
          break;
        }

        case 'PRESET_EXPERIMENT':
          if (act.gateType) {
            executePresetExperiment(act.gateType.toUpperCase() as any);
          }
          break;

        default:
          break;
      }
    });

    return logSummary;
  };

  // Local Fast Command Interpreter
  const tryLocalCommandInterpreter = (query: string): { handled: boolean; reply: string } => {
    const lower = query.toLowerCase().trim();

    // Power commands
    if (lower === 'power on' || lower === 'turn on power' || lower === 'enable power' || lower === 'power up') {
      setSimState((prev) => ({ ...prev, isPowered: true }));
      return { handled: true, reply: '⚡ Bench Power ENERGIZED (+5.0V DC Regulated Rail Active).' };
    }
    if (lower === 'power off' || lower === 'turn off power' || lower === 'disable power' || lower === 'shutdown power') {
      setSimState((prev) => ({ ...prev, isPowered: false }));
      return { handled: true, reply: '🔴 Bench Power DISCONNECTED (0.0V DC).' };
    }

    // Toggle switch commands
    if (lower.includes('toggle switch a') || lower === 'switch a') {
      setSimState((prev) => ({ ...prev, switchAOn: !prev.switchAOn }));
      return { handled: true, reply: '🔀 Toggled Logic Switch A output state.' };
    }
    if (lower.includes('toggle switch b') || lower === 'switch b') {
      setSimState((prev) => ({ ...prev, switchBOn: !prev.switchBOn }));
      return { handled: true, reply: '🔀 Toggled Logic Switch B output state.' };
    }

    // Preset experiment shortcuts
    if (lower.includes('and gate') && (lower.includes('build') || lower.includes('setup') || lower.includes('create') || lower.includes('wire') || lower.includes('preset'))) {
      executePresetExperiment('AND');
      return { handled: true, reply: '' };
    }
    if (lower.includes('nand gate') && (lower.includes('build') || lower.includes('setup') || lower.includes('create') || lower.includes('wire') || lower.includes('preset'))) {
      executePresetExperiment('NAND');
      return { handled: true, reply: '' };
    }
    if (lower.includes('or gate') && (lower.includes('build') || lower.includes('setup') || lower.includes('create') || lower.includes('wire') || lower.includes('preset'))) {
      executePresetExperiment('OR');
      return { handled: true, reply: '' };
    }
    if (lower.includes('not gate') && (lower.includes('build') || lower.includes('setup') || lower.includes('create') || lower.includes('wire') || lower.includes('preset'))) {
      executePresetExperiment('NOT');
      return { handled: true, reply: '' };
    }

    // Clear wires or board
    if (lower.includes('clear wires') || lower.includes('remove wires')) {
      onClearAllWires();
      return { handled: true, reply: '🧹 Removed all jumper wires from trainer workspace.' };
    }
    if (lower.includes('clear board') || lower.includes('clear all') || lower.includes('reset board')) {
      setPlacedComponents((prev) => prev.filter((c) => c.id === 'comp-base' || c.id === 'comp-bb'));
      onClearAllWires();
      return { handled: true, reply: '🧹 Workspace reset to fresh empty breadboard.' };
    }

    // Add component shortcuts
    if (lower.includes('add 7408') || lower.includes('add and gate')) {
      const m = COMPONENTS_LIBRARY.find((c) => c.id === 'ic-7408-and');
      if (m) onAddComponent(m);
      return { handled: true, reply: '➕ Added 7408 Quad 2-Input AND Gate IC to breadboard.' };
    }
    if (lower.includes('add 7400') || lower.includes('add nand gate')) {
      const m = COMPONENTS_LIBRARY.find((c) => c.id === 'ic-7400-nand');
      if (m) onAddComponent(m);
      return { handled: true, reply: '➕ Added 7400 Quad 2-Input NAND Gate IC to breadboard.' };
    }
    if (lower.includes('add 7432') || lower.includes('add or gate')) {
      const m = COMPONENTS_LIBRARY.find((c) => c.id === 'ic-7432-or');
      if (m) onAddComponent(m);
      return { handled: true, reply: '➕ Added 7432 Quad 2-Input OR Gate IC to breadboard.' };
    }
    if (lower.includes('add 7404') || lower.includes('add not gate')) {
      const m = COMPONENTS_LIBRARY.find((c) => c.id === 'ic-7404-not');
      if (m) onAddComponent(m);
      return { handled: true, reply: '➕ Added 7404 Hex Inverter NOT Gate IC to breadboard.' };
    }
    if (lower.includes('add led')) {
      const m = COMPONENTS_LIBRARY.find((c) => c.id === 'out-led-red');
      if (m) onAddComponent(m);
      return { handled: true, reply: '➕ Added Red Indicator LED module.' };
    }

    return { handled: false, reply: '' };
  };

  // Handle Natural Language Message Submit to AI Professor
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const q = userQuery.trim();
    setUserQuery('');

    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: q, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);

    setIsAnalyzing(true);

    // 1. Check local fast shortcut first
    const localRes = tryLocalCommandInterpreter(q);
    if (localRes.handled) {
      setIsAnalyzing(false);
      if (localRes.reply) {
        setChatHistory((prev) => [
          ...prev,
          { sender: 'ai', text: localRes.reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        ]);
      }
      return;
    }

    // 2. Call AI Professor Backend Circuit Interpreter API
    try {
      const res = await fetch('/api/ai/circuit-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: q,
          circuitState: {
            isPowered: simState.isPowered,
            switchAOn: simState.switchAOn,
            switchBOn: simState.switchBOn,
            placedComponentsCount: placedComponents.length,
            wiresCount: wires.length,
          },
        }),
      });

      const json = await res.json();
      setIsAnalyzing(false);

      if (json.success && json.data) {
        const { explanation, actions } = json.data;
        let logs: string[] = [];

        if (actions && Array.isArray(actions) && actions.length > 0) {
          logs = executeCircuitActions(actions);
        }

        let fullText = explanation || `Executed command: "${q}".`;
        if (logs.length > 0) {
          fullText += '\n\n⚡ Circuit Actions Applied:\n' + logs.join('\n');
        }

        setChatHistory((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: fullText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        // Fallback explanation if Gemini is unavailable
        setChatHistory((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: `I understood "${q}". To perform manual pin wiring, select pins on the 3D board directly, or use the quick command preset buttons above!`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (err) {
      setIsAnalyzing(false);
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Processed "${q}". Use the ⚡ Quick Experiment Presets panel above to instantly wire full circuits!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  // Analyze Circuit State for automated intelligent diagnosis
  const generateAutoDiagnosis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      let aiResponse = '';

      if (!simState.isPowered) {
        aiResponse = '⚠️ Main Bench Power is OFF. Say "Power on" or click the power toggle button to energize the circuit.';
      } else if (simState.hasShortCircuit) {
        aiResponse = `🚨 CRITICAL SAFETY ALERT: ${simState.shortCircuitMsg || 'A short circuit exists between +5V VCC and GND'}. Disconnect the faulty jumper wire immediately.`;
      } else {
        const icComps = placedComponents.filter((c) => c.componentMetaId.startsWith('ic-74'));
        if (icComps.length === 0) {
          aiResponse = '💡 No logic IC chips detected on the breadboard. Use the "Build Experiment" buttons above or tell me "Build AND gate" to auto-wire the full circuit!';
        } else {
          const target = selectedIC || icComps[0];
          const meta = COMPONENTS_LIBRARY.find((m) => m.id === target.componentMetaId);
          const evalState = simState.evaluatedGates[target.id];

          if (evalState && !evalState.isPowered) {
            aiResponse = `⚠️ DIAGNOSIS FOR ${meta?.name || 'IC'}: Unpowered IC. Make sure Pin 14 is wired to +5V VCC and Pin 7 is wired to Ground (GND)!`;
          } else if (evalState) {
            aiResponse = `✅ CIRCUIT DIAGNOSIS FOR ${meta?.name}:\n` +
              `• Chip Power: OK (+5.0V on Pin 14, 0V on Pin 7)\n` +
              `• Gate 1 Input A (Pin 1): Logic ${evalState.inputA} (${evalState.inputA === 1 ? '5.0V' : '0.0V'})\n` +
              `• Gate 1 Input B (Pin 2): Logic ${evalState.inputB ?? 'N/A'}\n` +
              `• Gate 1 Output Y (Pin 3): Logic ${evalState.outputY} (${evalState.outputY === 1 ? '5.0V HIGH - LED LIT' : '0.0V LOW'})\n` +
              `• Boolean Equation: ${meta?.booleanEquation || 'Y = A • B'}`;
          } else {
            aiResponse = `ℹ️ Selected ${meta?.name}. Wire Pin 1 to Switch A and Pin 2 to Switch B to test outputs.`;
          }
        }
      }

      setChatHistory((prev) => [
        ...prev,
        { sender: 'ai', text: aiResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
      setIsAnalyzing(false);
    }, 300);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 text-slate-200 selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <div className="p-3 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-slate-100 flex items-center gap-1.5 font-mono">
              AI Professor Command Core
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                Direct Board Control
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">Natural Language 3D Circuit Controller</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={generateAutoDiagnosis}
            disabled={isAnalyzing}
            className="p-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-1 transition-all shadow-md shadow-indigo-600/20"
            title="Run diagnostic scan"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Diagnose</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
              title="Close AI Assistant Window"
            >
              <PanelRightClose className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Professor Direct Command Presets Toolbar */}
      <div className="p-2.5 bg-[#0b0f19] border-b border-slate-800/80 space-y-2">
        <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-indigo-400">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" />
            1-Touch Experiment Presets
          </span>
          <span className="text-slate-500">Live 3D Wiring</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => executePresetExperiment('AND')}
            className="px-2 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 text-xs font-mono font-semibold flex items-center justify-center gap-1 transition-all"
          >
            <Cpu className="w-3 h-3 text-indigo-400" />
            <span>Wire AND Gate</span>
          </button>

          <button
            onClick={() => executePresetExperiment('NAND')}
            className="px-2 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 text-xs font-mono font-semibold flex items-center justify-center gap-1 transition-all"
          >
            <Cpu className="w-3 h-3 text-indigo-400" />
            <span>Wire NAND Gate</span>
          </button>

          <button
            onClick={() => executePresetExperiment('OR')}
            className="px-2 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 text-xs font-mono font-semibold flex items-center justify-center gap-1 transition-all"
          >
            <Cpu className="w-3 h-3 text-indigo-400" />
            <span>Wire OR Gate</span>
          </button>

          <button
            onClick={() => executePresetExperiment('NOT')}
            className="px-2 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 text-xs font-mono font-semibold flex items-center justify-center gap-1 transition-all"
          >
            <Cpu className="w-3 h-3 text-indigo-400" />
            <span>Wire NOT Gate</span>
          </button>
        </div>

        {/* Quick Workbench Power & Inputs Controls */}
        <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-slate-800/60 text-xs font-mono">
          <button
            onClick={() => setSimState((prev) => ({ ...prev, isPowered: !prev.isPowered }))}
            className={`flex-1 py-1 px-2 rounded-lg border flex items-center justify-center gap-1 transition-all ${
              simState.isPowered
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : 'bg-rose-500/20 border-rose-500/50 text-rose-300'
            }`}
          >
            <Power className="w-3 h-3" />
            <span>Power: {simState.isPowered ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setSimState((prev) => ({ ...prev, switchAOn: !prev.switchAOn }))}
            className="py-1 px-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300 flex items-center gap-1 transition-all"
          >
            <ToggleLeft className="w-3 h-3 text-indigo-400" />
            <span>SwA: {simState.switchAOn ? '1' : '0'}</span>
          </button>

          <button
            onClick={() => setSimState((prev) => ({ ...prev, switchBOn: !prev.switchBOn }))}
            className="py-1 px-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300 flex items-center gap-1 transition-all"
          >
            <ToggleLeft className="w-3 h-3 text-indigo-400" />
            <span>SwB: {simState.switchBOn ? '1' : '0'}</span>
          </button>

          <button
            onClick={onClearAllWires}
            className="py-1 px-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-rose-500 text-rose-400 flex items-center gap-1 transition-all"
            title="Clear all wires"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Chat History List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-1 font-mono">
              <span>{msg.sender === 'user' ? 'You (Command)' : 'AI Professor'}</span>
              <span>•</span>
              <span>{msg.time}</span>
            </div>
            <div
              className={`max-w-[92%] p-3 rounded-xl text-xs leading-relaxed whitespace-pre-line font-sans ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-md font-mono'
                  : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isAnalyzing && (
          <div className="flex items-center gap-2 text-xs text-indigo-400 p-2.5 bg-indigo-500/10 rounded-xl animate-pulse border border-indigo-500/20 font-mono">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
            <span>Executing command & manipulating 3D circuit mesh...</span>
          </div>
        )}
      </div>

      {/* Command Prompt Input Form */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-900/95 flex gap-2">
        <div className="relative flex-1">
          <Terminal className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder='Type command e.g. "Build AND gate", "Power on"...'
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all font-mono"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center transition-all shadow-md shadow-indigo-600/20 font-mono gap-1"
        >
          <span>Run</span>
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};

