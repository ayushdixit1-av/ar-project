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
import { HeaderNav } from './components/HeaderNav';
import { Trainer3DViewport } from './components/Trainer3DViewport';
import { LeftSidebarLibrary } from './components/LeftSidebarLibrary';
import { RightSidebarInspector } from './components/RightSidebarInspector';
import { BottomConsoleToolbar } from './components/BottomConsoleToolbar';
import { MultimeterOverlay } from './components/MultimeterOverlay';
import { AITeacherDrawer } from './components/AITeacherDrawer';
import { TruthTableVerificationView } from './components/TruthTableVerificationView';
import { InternalICXRayModal } from './components/InternalICXRayModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { SyncMobileModal } from './components/SyncMobileModal';
import { ActiveItemsMenu } from './components/ActiveItemsMenu';
import { ARModeView } from './components/ARModeView';
import { Activity, Bot, Eye, Zap, ShieldAlert, Sparkles, RefreshCw, Layers, Camera } from 'lucide-react';

export default function App() {
  // Initial Placed Components (Includes Trainer Base, Breadboard, and 7408 AND Gate IC)
  const [placedComponents, setPlacedComponents] = useState<PlacedComponent[]>([
    {
      id: 'comp-base',
      componentMetaId: 'trainer-board-base',
      label: 'Trainer Board Base Platform',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
    {
      id: 'comp-bb',
      componentMetaId: 'breadboard-830',
      label: 'Solderless Breadboard',
      position: [0, 0.4, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
    {
      id: 'comp-ic-7408',
      componentMetaId: 'ic-7408-and',
      label: '7408 Quad 2-Input AND Gate IC',
      position: [0, 0.65, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
  ]);

  // Initial Demonstration Wires: Pin 14 (+5V), Pin 7 (GND), SW1 -> Pin 1, SW2 -> Pin 2, Pin 3 -> OUT1 LED
  const [wires, setWires] = useState<JumperWire[]>([
    {
      id: 'wire-vcc',
      fromComponentId: 'comp-base',
      fromPinId: 'tb-vcc1',
      toComponentId: 'comp-ic-7408',
      toPinId: 'pin-14',
      color: '#ef4444',
      isEnergized: true,
    },
    {
      id: 'wire-gnd',
      fromComponentId: 'comp-base',
      fromPinId: 'tb-gnd1',
      toComponentId: 'comp-ic-7408',
      toPinId: 'pin-7',
      color: '#3b82f6',
      isEnergized: false,
    },
    {
      id: 'wire-in1',
      fromComponentId: 'comp-base',
      fromPinId: 'tb-in1',
      toComponentId: 'comp-ic-7408',
      toPinId: 'pin-1',
      color: '#eab308',
      isEnergized: true,
    },
    {
      id: 'wire-in2',
      fromComponentId: 'comp-base',
      fromPinId: 'tb-in2',
      toComponentId: 'comp-ic-7408',
      toPinId: 'pin-2',
      color: '#22c55e',
      isEnergized: true,
    },
    {
      id: 'wire-out1',
      fromComponentId: 'comp-ic-7408',
      fromPinId: 'pin-3',
      toComponentId: 'comp-base',
      toPinId: 'tb-out1',
      color: '#ef4444',
      isEnergized: true,
    },
  ]);

  // Central Simulation State
  const [simState, setSimState] = useState<SimulationState>({
    isPowered: true,
    systemVoltage: 5.0,
    totalCurrentmA: 48,
    hasShortCircuit: false,
    inputs: [true, true, false, false, false, false, false, false, false, false],
    switchAOn: true,
    switchBOn: true,
    outputs: [true, false, false, false, false, false, false, false, false, false],
    ambientTempC: 24.5,
    distanceCm: 15,
    lightLux: 350,
    potentiometerVal: 50,
    button1Pressed: false,
    serialMonitorLog: [
      '[AETHER Digital Logic Engine v3.5] Power On Self-Test Complete.',
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
  const [showMultimeterOverlay, setShowMultimeterOverlay] = useState<boolean>(false);
  const [showAITeacherDrawer, setShowAITeacherDrawer] = useState<boolean>(false);
  const [showXRayModal, setShowXRayModal] = useState<boolean>(false);
  const [showActiveItemsMenu, setShowActiveItemsMenu] = useState<boolean>(false);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [isMobileSyncOpen, setIsMobileSyncOpen] = useState<boolean>(false);

  // REAL-TIME DIGITAL LOGIC SIMULATION EVALUATION LOOP
  useEffect(() => {
    const evaluated = evaluateDigitalCircuit(placedComponents, wires, simState);
    setSimState(evaluated.updatedSimState);
  }, [simState.isPowered, simState.switchAOn, simState.switchBOn, placedComponents, wires]);

  // Toggle Input Switches 1 - 10
  const handleToggleInputIndex = (index: number) => {
    setSimState((prev) => {
      const currentInputs = prev.inputs || new Array(10).fill(false);
      const nextInputs = [...currentInputs];
      nextInputs[index] = !nextInputs[index];
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

  const handleToggleSwitch = (sw: 'A' | 'B') => {
    handleToggleInputIndex(sw === 'A' ? 0 : 1);
  };

  // Add Component onto Breadboard
  const handleAddComponent = (meta: ElectronicComponentMeta) => {
    // Count existing ICs/modules on breadboard
    const existingICs = placedComponents.filter((c) => c.id !== 'comp-base' && c.id !== 'comp-bb');
    const icCount = existingICs.length;

    // Position 3 ICs on breadboard with min 4 pin spacing (2.88 units step = 5 pin hole gap)
    let posX = 0;
    if (icCount === 1) {
      posX = -2.88; // 2nd IC on Left
    } else if (icCount === 2) {
      posX = 2.88; // 3rd IC on Right
    } else if (icCount > 2) {
      const stepIndex = Math.floor(icCount / 2);
      const side = icCount % 2 === 1 ? -1 : 1;
      posX = side * stepIndex * 2.88;
      if (Math.abs(posX) > 4.2) posX = (Math.random() - 0.5) * 2;
    }

    const newPlaced: PlacedComponent = {
      id: `comp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      componentMetaId: meta.id,
      label: meta.name,
      position: [posX, 0.65, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    };
    setPlacedComponents((prev) => [...prev, newPlaced]);
    setSelectedComponent(newPlaced);
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

  // Multimeter Probe Handlers
  const handleAttachMultimeterProbe = (probe: 'red' | 'black', componentId: string, pinId: string) => {
    setSimState((prev) => ({
      ...prev,
      multimeter: {
        ...prev.multimeter,
        [probe === 'red' ? 'redProbeAttachedTo' : 'blackProbeAttachedTo']: { componentId, pinId },
      },
    }));
  };

  const handleDetachMultimeterProbe = (probe: 'red' | 'black') => {
    setSimState((prev) => ({
      ...prev,
      multimeter: {
        ...prev.multimeter,
        [probe === 'red' ? 'redProbeAttachedTo' : 'blackProbeAttachedTo']: null,
      },
    }));
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
      {/* Top Navigation Header */}
      <HeaderNav
        activeView={activeView}
        setActiveView={setActiveView}
        simState={simState}
        setSimState={setSimState}
        placedCount={placedComponents.length}
        wireCount={wires.length}
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenMobileSync={() => setIsMobileSyncOpen(true)}
        onOpenActiveItemsMenu={() => setShowActiveItemsMenu(true)}
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
                onShiftToAR={() => setActiveView('ar')}
              />

              {/* Floating Quick Logic Switch Injector Panel */}
              <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2 shadow-2xl flex items-center gap-2 sm:gap-3 z-10 text-[11px] sm:text-xs max-w-[95vw] sm:max-w-4xl overflow-x-auto custom-scrollbar">
                <div className="flex items-center gap-1.5 font-semibold text-slate-200 shrink-0">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>10 Inputs:</span>
                </div>

                <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                  {(simState.inputs || new Array(10).fill(false)).map((isHigh, idx) => (
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
                    className="ml-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
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
                      className="ml-1 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all shadow-md"
                      title="Remove selected object from board"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Delete Object</span>
                    </button>
                  )}
              </div>

              {/* Floating Toggle Buttons for Multimeter & AI Assistant */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
                <button
                  onClick={() => setShowMultimeterOverlay(!showMultimeterOverlay)}
                  className={`p-2.5 rounded-xl border font-semibold text-xs flex items-center gap-2 transition-all shadow-xl ${
                    showMultimeterOverlay
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/20'
                      : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  <span>{showMultimeterOverlay ? 'Hide Multimeter' : 'Multimeter Probe'}</span>
                </button>

                <button
                  onClick={() => setShowAITeacherDrawer(!showAITeacherDrawer)}
                  className={`p-2.5 rounded-xl border font-semibold text-xs flex items-center gap-2 transition-all shadow-xl ${
                    showAITeacherDrawer
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-600/30'
                      : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <Bot className="w-4 h-4" />
                  <span>AI Professor</span>
                </button>
              </div>

              {/* Multimeter Overlay Floating Window */}
              {showMultimeterOverlay && (
                <div className="absolute bottom-16 right-2 sm:right-4 max-w-[92vw] z-20">
                  <MultimeterOverlay
                    multimeter={simState.multimeter}
                    placedComponents={placedComponents}
                    onChangeMode={(mode) =>
                      setSimState((prev) => ({ ...prev, multimeter: { ...prev.multimeter, mode } }))
                    }
                    onAttachProbe={handleAttachMultimeterProbe}
                    onDetachProbe={handleDetachMultimeterProbe}
                  />
                </div>
              )}
            </main>

            {/* AI Teacher Sidebar or Right Inspector Sidebar */}
            {showAITeacherDrawer ? (
              <div className="w-96 max-lg:fixed max-lg:right-0 max-lg:top-14 max-lg:bottom-0 max-lg:w-80 max-sm:w-[85vw] max-lg:z-40 h-full max-lg:shadow-2xl">
                <AITeacherDrawer
                  onClose={() => setShowAITeacherDrawer(false)}
                  simState={simState}
                  setSimState={setSimState}
                  placedComponents={placedComponents}
                  setPlacedComponents={setPlacedComponents}
                  wires={wires}
                  setWires={setWires}
                  selectedIC={selectedComponent}
                  onAddComponent={handleAddComponent}
                  onRemoveComponent={handleRemoveComponent}
                  onAddWire={handleAddWire}
                  onRemoveWire={handleRemoveWire}
                  onClearAllWires={handleClearAllWires}
                />
              </div>
            ) : (
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
            )}
          </>
        )}
      </div>

      {/* Dedicated Mobile Floating Action Button for AR Mode */}
      {activeView !== 'ar' && (
        <button
          onClick={() => setActiveView('ar')}
          className="lg:hidden fixed bottom-16 right-4 z-40 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white font-mono text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl shadow-purple-600/50 border-2 border-purple-300/50 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all animate-bounce"
          title="Directly shift to Augmented Reality (AR) Camera Mode"
        >
          <Camera className="w-4 h-4 text-purple-200" />
          <span>AR MODE</span>
        </button>
      )}

      {/* Bottom Console Toolbar */}
      <BottomConsoleToolbar
        simState={simState}
        wireCount={wires.length}
        placedCount={placedComponents.length}
        onResetView={() => setSelectedComponent(null)}
        onClearWires={handleClearAllWires}
        onDownloadConfig={() => {}}
        onShiftToAR={() => setActiveView('ar')}
      />

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
