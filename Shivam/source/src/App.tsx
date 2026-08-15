import React, { useState, useEffect } from 'react';
import {
  PlacedComponent,
  JumperWire,
  SimulationState,
  AppViewMode,
  ViewRenderMode,
  ElectronicComponentMeta,
  InteractiveTutorial,
} from './types';
import { COMPONENTS_LIBRARY } from './data/componentsLibrary';
import { evaluateDigitalCircuit } from './utils/logicEngine';
import { audioSynth } from './utils/audioSynth';
import { HeaderNav } from './components/HeaderNav';
import { CIRCUIT_PRESETS } from './data/presets';
import { Trainer3DViewport } from './components/Trainer3DViewport';
import { LeftSidebarLibrary } from './components/LeftSidebarLibrary';
import { RightSidebarInspector } from './components/RightSidebarInspector';
import { BottomConsoleToolbar } from './components/BottomConsoleToolbar';
import { TruthTableVerificationView } from './components/TruthTableVerificationView';
import { InternalICXRayModal } from './components/InternalICXRayModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { SyncMobileModal } from './components/SyncMobileModal';
import { ActiveItemsMenu } from './components/ActiveItemsMenu';
import { ARModeView } from './components/ARModeView';
import { Eye, Activity, Zap, ShieldAlert, Sparkles, RefreshCw, Layers, Camera, Play, Square } from 'lucide-react';

export default function App() {
  // Initial Placed Components (Includes Trainer Base, Breadboard, and 7408 AND Gate IC)
  const [placedComponents, setPlacedComponents] = useState<PlacedComponent[]>(CIRCUIT_PRESETS[0].components);

  // Initial Demonstration Wires: Pin 14 (+5V), Pin 7 (GND), SW1 -> Pin 1, SW2 -> Pin 2, Pin 3 -> OUT1 LED
  const [wires, setWires] = useState<JumperWire[]>(CIRCUIT_PRESETS[0].wires.map(w => ({ ...w, isEnergized: false, logicState: 0, voltage: 0 })));

  // Central Simulation State
  const [simState, setSimState] = useState<SimulationState>({
    isPowered: true,
    systemVoltage: 5.0,
    totalCurrentmA: 48,
    hasShortCircuit: false,
    inputs: [true, true, false, false, false, false, false, false, false, false],
    switchAOn: CIRCUIT_PRESETS[0].inputs[0],
    switchBOn: CIRCUIT_PRESETS[0].inputs[1],
    outputs: [true, false, false, false, false, false, false, false, false, false],
    ambientTempC: 24.5,
    distanceCm: 15,
    lightLux: 350,
    potentiometerVal: 50,
    button1Pressed: false,
    serialMonitorLog: [
      '[Digital Logic Engine v3.5] Power On Self-Test Complete.',
      '[Circuit Status] 7408 Quad 2-Input AND Gate IC detected on Breadboard.',
      '[Logic Inputs] Switch A = HIGH (1), Switch B = HIGH (1). Output Pin 3 = HIGH (1).',
    ],
    pinVoltages: {},
    evaluatedGates: {},
    ledStates: {},
    buzzerToneFreq: 0,
    servoAngle: 0,
    dcMotorRPM: 0,
    lcdLine1: 'AND Gate Test',
    lcdLine2: 'A=1 B=1 -> Y=1',
    oledText: '7408 AND Gate',
    sevenSegmentVal: '0001',
    multimeter: {
      mode: 'DCV',
      redProbeAttachedTo: { componentId: 'comp-ic-7408', pinId: 'pin-3' },
      blackProbeAttachedTo: { componentId: 'comp-ic-7408', pinId: 'pin-7' },
      displayValue: '5.00 V',
      isBeeping: false,
    },
  });

  // UI View & Tool State
  const [activeView, setActiveView] = useState<AppViewMode>('studio');
  const [renderMode, setRenderMode] = useState<ViewRenderMode>('pbr');
  const [activeWireColor, setActiveWireColor] = useState<string>('#ef4444');
  const [selectedComponent, setSelectedComponent] = useState<PlacedComponent | null>(placedComponents[2]);

  // Floating Overlays & Modals
  const [showXRayModal, setShowXRayModal] = useState<boolean>(false);
  const [showActiveItemsMenu, setShowActiveItemsMenu] = useState<boolean>(false);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [isMobileSyncOpen, setIsMobileSyncOpen] = useState<boolean>(false);

  // REAL-TIME DIGITAL LOGIC SIMULATION EVALUATION LOOP
  useEffect(() => {
    const evaluated = evaluateDigitalCircuit(placedComponents, wires, simState);
    setSimState(evaluated.updatedSimState);
  }, [simState.isPowered, simState.switchAOn, simState.switchBOn, simState.button1Pressed, simState.inputs?.join(','), placedComponents, wires]);

  // Toggle Input Switches 1 - 10
  const handleLoadPreset = (presetId: string) => {
    const preset = CIRCUIT_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    setPlacedComponents(preset.components);
    setWires(preset.wires.map((w: any) => ({ ...w, isEnergized: false, logicState: 0, voltage: 0 })));
    setSimState(prev => ({
      ...prev,
      inputs: [...preset.inputs],
      switchAOn: preset.inputs[0],
      switchBOn: preset.inputs[1],
      isPowered: false,
      internalState: {},
    }));
    audioSynth.playSwitchClick(true);
    setSelectedComponent(null);
  };

  const handleToggleInputIndex = (index: number) => {
    setSimState((prev) => {
      const currentInputs = prev.inputs || new Array(10).fill(false);
      const nextInputs = [...currentInputs];
      nextInputs[index] = !nextInputs[index];
      audioSynth.playSwitchClick(nextInputs[index]);
      return {
        ...prev,
        inputs: nextInputs,
        switchAOn: nextInputs[0],
        switchBOn: nextInputs[1],
        serialMonitorLog: [
          `[Input Switch] SW${index + 1} switched to ${nextInputs[index] ? 'HIGH (1)' : 'LOW (0)'}`,
          ...prev.serialMonitorLog,
        ],
      };
    });
  };

  // Toggle 5V DC Power Supply
  const handleToggleClock = () => {
    setSimState((prev) => {
      audioSynth.playSwitchClick(true);
      setTimeout(() => {
        setSimState(s => ({ ...s, button1Pressed: false }));
      }, 200);
      return { ...prev, button1Pressed: true };
    });
  };

  const handleTogglePower = () => {
    setSimState((prev) => {
      const nextPower = !prev.isPowered;
      audioSynth.playSwitchClick(nextPower);
      return {
        ...prev,
        isPowered: nextPower,
        serialMonitorLog: [
          `[${new Date().toLocaleTimeString()}] System Power ${nextPower ? 'ENABLED (5.0V DC Rail Active)' : 'DISABLED'}`,
          ...prev.serialMonitorLog,
        ],
      };
    });
  };

  const handleToggleSwitch = (sw: 'A' | 'B') => {
    handleToggleInputIndex(sw === 'A' ? 0 : 1);
  };

  // Add Component onto Breadboard (Capable of holding 4 ICs simultaneously)
  const handleAddComponent = (meta: ElectronicComponentMeta) => {
    // 4 Discrete Breadboard DIP IC Sockets along the central divider trough
    const IC_SLOT_X_POSITIONS = [-2.63, -0.02, 2.58, 5.18];

    // Filter existing placed ICs
    const existingICs = placedComponents.filter((c) => c.id !== 'comp-base' && c.id !== 'comp-bb');
    
    // Find occupied slot indices
    const occupiedPositions = existingICs.map((c) => c.position[0]);
    const vacantSlot = IC_SLOT_X_POSITIONS.find(
      (slotX) => !occupiedPositions.some((ox) => Math.abs(ox - slotX) < 0.6)
    );

    let targetX = 0;
    let updatedPlacedList = [...placedComponents];

    if (vacantSlot !== undefined) {
      targetX = vacantSlot;
    } else {
      // If 4 ICs already present, notify and return
      alert('Maximum of 4 ICs can be placed on the breadboard at once.');
      return;
    }

    const slotNum = IC_SLOT_X_POSITIONS.indexOf(targetX) + 1 || 1;

    const newPlaced: PlacedComponent = {
      id: `comp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      componentMetaId: meta.id,
      label: meta.name,
      position: [targetX, 0.47, 0.35],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    };

    setPlacedComponents([...updatedPlacedList, newPlaced]);
    setSelectedComponent(newPlaced);
    setSimState((prev) => ({
      ...prev,
      serialMonitorLog: [
        `[Breadboard Socket ${slotNum}] Mounted ${meta.name} on Breadboard (Slot ${slotNum} of 4).`,
        ...prev.serialMonitorLog,
      ],
    }));
  };

  // Remove Placed Component
  const handleRemoveComponent = (componentId: string) => {
    // Keep base trainer platform and main breadboard
    if (componentId === 'comp-base' || componentId === 'comp-bb') {
      return;
    }
    const target = placedComponents.find((c) => c.id === componentId);
    setPlacedComponents((prev) => prev.filter((c) => c.id !== componentId));
    // Remove all attached wires
    setWires((prev) => prev.filter((w) => w.fromComponentId !== componentId && w.toComponentId !== componentId));
    if (selectedComponent?.id === componentId) {
      setSelectedComponent(null);
    }
    setSimState((prev) => ({
      ...prev,
      serialMonitorLog: [
        `[Workspace] Removed ${target?.label || 'Component'} (ID: ${componentId}) from trainer board.`,
        ...prev.serialMonitorLog,
      ],
    }));
  };

  // Remove Single Jumper Wire
  const handleRemoveWire = (wireId: string) => {
    setWires((prev) => prev.filter((w) => w.id !== wireId));
    setSimState((prev) => ({
      ...prev,
      serialMonitorLog: [
        `[Workspace] Removed Jumper Wire (ID: ${wireId}).`,
        ...prev.serialMonitorLog,
      ],
    }));
  };

  // Add Jumper Wire
  const handleAddWire = (fromCompId: string, fromPinId: string, toCompId: string, toPinId: string) => {
    const newWire: JumperWire = {
      id: `wire-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      fromComponentId: fromCompId,
      fromPinId,
      toComponentId: toCompId,
      toPinId,
      color: activeWireColor,
      isEnergized: simState.isPowered,
    };
    setWires((prev) => [...prev, newWire]);
  };

  // Clear All Wires
  const handleClearAllWires = () => {
    setWires([]);
  };

  // Auto-Wire Tutorial Helper
  const handleAutoWireTutorial = (tutorial: InteractiveTutorial) => {
    const autoWires: JumperWire[] = [];
    tutorial.steps.forEach((step, idx) => {
      if (step.suggestedConnections) {
        step.suggestedConnections.forEach((conn) => {
          autoWires.push({
            id: `auto-wire-${idx}-${Math.random().toString(36).substring(2, 5)}`,
            fromComponentId: conn.fromCompId,
            fromPinId: conn.fromPin,
            toComponentId: conn.toCompId,
            toPinId: conn.toPin,
            color: conn.color,
            isEnergized: true,
          });
        });
      }
    });

    if (autoWires.length > 0) {
      setWires((prev) => [...prev, ...autoWires]);
    }
  };

  const selectedMeta = selectedComponent
    ? COMPONENTS_LIBRARY.find((m) => m.id === selectedComponent.componentMetaId)
    : null;

  return (
    <div className="w-screen h-screen bg-[#050505] text-white flex flex-col font-sans overflow-hidden select-none">
      <HeaderNav
        activeView={activeView}
        setActiveView={setActiveView}
        simState={simState}
        setSimState={setSimState}
        placedCount={placedComponents.length - 2}
        wireCount={wires.length}
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenMobileSync={() => setIsMobileSyncOpen(true)}
        onOpenActiveItemsMenu={() => setShowActiveItemsMenu(true)}
        presets={CIRCUIT_PRESETS}
        onLoadPreset={handleLoadPreset}
      />
      {/* Main View Container */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* VIEW MODE: DIRECT AUGMENTED REALITY (AR) PASSTHROUGH */}
        {activeView === 'ar' ? (
          <ARModeView
            onExitAR={() => setActiveView('studio')}
            placedComponents={placedComponents}
            wires={wires}
            selectedComponentId={selectedComponent?.id || null}
            onSelectComponent={setSelectedComponent}
            renderMode={renderMode}
            setRenderMode={setRenderMode}
            activeWireColor={activeWireColor}
            isWireMode={true}
            onAddWire={handleAddWire}
            simState={simState}
          />
        ) : activeView === 'truth-table' ? (
          /* VIEW MODE 1: TRUTH TABLE ENGINE */
          <TruthTableVerificationView
            simState={simState}
            placedComponents={placedComponents}
            wires={wires}
            onSetSwitches={(swA, swB) => {
              setSimState((prev) => ({ ...prev, switchAOn: swA, switchBOn: swB }));
            }}
          />
        ) : (
          /* VIEW MODE 2: 3D INTERACTIVE STUDIO & LOGIC TRAINER */
          <>
            {/* Left Library Sidebar */}
            <LeftSidebarLibrary
              onAddComponent={handleAddComponent}
              activeWireColor={activeWireColor}
              setActiveWireColor={setActiveWireColor}
              onClearAllWires={handleClearAllWires}
              wireCount={wires.length}
              placedComponents={placedComponents}
              onRemoveComponent={handleRemoveComponent}
            />

            {/* Center 3D Viewport */}
            <main className="flex-1 h-full relative">
              <Trainer3DViewport
                placedComponents={placedComponents}
                wires={wires}
                selectedComponentId={selectedComponent?.id || null}
                onSelectComponent={setSelectedComponent}
                renderMode={renderMode}
                setRenderMode={setRenderMode}
                activeWireColor={activeWireColor}
                isWireMode={true}
                onAddWire={handleAddWire}
                simState={simState}
                onToggleInput={handleToggleInputIndex}
                onTogglePower={handleTogglePower}
                onToggleClock={handleToggleClock}
                onShiftToAR={() => setActiveView('ar')}
              />

              {/* Floating Quick Logic Control & Switch Injector Panel */}
              <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2 shadow-2xl flex items-center gap-2 sm:gap-3 z-10 text-[11px] sm:text-xs max-w-[95vw] sm:max-w-5xl overflow-x-auto custom-scrollbar">
                {/* Clock Pulse */}
                <button
                  onMouseDown={handleToggleClock}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg font-bold transition-all border shrink-0 text-[10px] sm:text-xs ${
                    (simState.button1Pressed || simState.autoClockPulse)
                      ? 'bg-red-500 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                      : 'bg-slate-800 text-red-400 border-red-900/50 hover:bg-slate-700'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  CLOCK PULSE
                </button>
                <div className="w-px h-6 bg-slate-700 mx-0.5 sm:mx-1 shrink-0"></div>

                {/* Power Toggle Switch */}
                <button
                  onClick={handleTogglePower}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold transition-all shadow-md shrink-0 ${
                    simState.isPowered
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                  }`}
                  title="Toggle 5V DC Power Rail"
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${simState.isPowered ? 'hidden' : 'block'}`} />
                  <Square className={`w-3.5 h-3.5 fill-current ${simState.isPowered ? 'block' : 'hidden'}`} />
                  <span>{simState.isPowered ? 'POWER ON' : 'POWER OFF'}</span>
                </button>

                <div className="h-4 w-px bg-slate-700 shrink-0" />

                <div className="flex items-center gap-1.5 font-semibold text-slate-200 shrink-0">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>10 Inputs:</span>
                </div>

                <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                  {(simState.inputs || new Array(10).fill(false)).slice(0, 4).map((isHigh, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleToggleInputIndex(idx)}
                      className={`px-2 py-1 rounded-md font-mono text-[11px] font-bold transition-all shrink-0 ${
                        isHigh
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 border border-emerald-400'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                      }`}
                      title={`Toggle Switch ${idx + 1}`}
                    >
                      SW{idx + 1}: {isHigh ? '1' : '0'}
                    </button>
                  ))}
                </div>

                <div className="h-4 w-px bg-slate-700 shrink-0" />

                <div className="flex items-center gap-1.5 font-semibold text-slate-200 shrink-0">
                  <span>Outputs:</span>
                  <div className="flex items-center gap-1">
                    {(simState.outputs || new Array(10).fill(false)).map((isLit, idx) => (
                      <span
                        key={idx}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                          isLit
                            ? 'bg-amber-500/30 text-amber-300 border border-amber-400'
                            : 'bg-slate-950 text-slate-600 border border-slate-800'
                        }`}
                        title={`Output LED ${idx + 1}: ${isLit ? 'HIGH (Lit)' : 'LOW'}`}
                      >
                        O{idx + 1}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Active Items & Wires Menu Button */}
                <button
                  onClick={() => setShowActiveItemsMenu(true)}
                  className="bg-blue-600/90 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/30 border border-blue-400/50 shrink-0"
                  title="View and delete all active ICs and wires"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Items Menu ({placedComponents.length - 2} ICs, {wires.length} Wires)</span>
                </button>

                {/* X-Ray Silicon Diagram Modal Trigger */}
                {selectedMeta && selectedMeta.category === 'Logic & IC' && (
                  <button
                    onClick={() => setShowXRayModal(true)}
                    className="ml-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>IC X-Ray View</span>
                  </button>
                )}

                {/* Quick Remove Selected Component */}
                {selectedComponent &&
                  selectedComponent.id !== 'comp-base' &&
                  selectedComponent.id !== 'comp-bb' && (
                    <button
                      onClick={() => handleRemoveComponent(selectedComponent.id)}
                      className="ml-1 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all shadow-md shrink-0"
                      title="Remove selected object from board"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Delete Object</span>
                    </button>
                  )}
              </div>
            </main>

            {/* Right Inspector Sidebar */}
            <RightSidebarInspector
              selectedComponent={selectedComponent}
              placedComponents={placedComponents}
              wires={wires}
              simState={simState}
              setSimState={setSimState}
              activeView={activeView}
              setActiveView={setActiveView}
              onAutoWireTutorial={handleAutoWireTutorial}
              onRemoveComponent={handleRemoveComponent}
              onRemoveWire={handleRemoveWire}
            />
          </>
        )}
      </div>

      {/* Internal IC X-Ray Inspection Modal */}
      {showXRayModal && selectedMeta && (
        <InternalICXRayModal
          icMeta={selectedMeta}
          placedIC={selectedComponent}
          simState={simState}
          onClose={() => setShowXRayModal(false)}
        />
      )}

      {/* Technical Architecture Modal */}
      <ArchitectureModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />

      {/* Active Items & Wiring Inventory Menu Modal */}
      <ActiveItemsMenu
        isOpen={showActiveItemsMenu}
        onClose={() => setShowActiveItemsMenu(false)}
        placedComponents={placedComponents}
        wires={wires}
        onAddComponent={handleAddComponent}
        onRemoveComponent={handleRemoveComponent}
        onRemoveWire={handleRemoveWire}
        onClearAllWires={handleClearAllWires}
      />

      {/* WebXR Mobile AR Sync Modal */}
      <SyncMobileModal isOpen={isMobileSyncOpen} onClose={() => setIsMobileSyncOpen(false)} />
    </div>
  );
}
