import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from './ui/Navbar';
import { ComponentLibrary } from './ui/ComponentLibrary';
import { TruthTablePanel } from './ui/TruthTablePanel';
import { ExperimentGuide } from './ui/ExperimentGuide';
import { DiagnosticsPanel } from './ui/DiagnosticsPanel';
import { AROverlayModal } from './ui/AROverlayModal';
import { LaboratorySceneManager } from './components3d/LaboratorySceneManager';
import { CircuitSimulator, SimulationResult } from './electronics/circuitSimulator';
import { createPresetCircuit } from './electronics/experiments';
import { CircuitState, ICType, MultimeterProbe, WireColor } from './types/electronics';
import { soundFx } from './electronics/soundEffects';
import { arManager } from './ar/ARManager';
import { Trash2, Undo2, Zap } from 'lucide-react';

export default function App() {
  // 1. Initial State: Load preset 7408 AND Gate experiment circuit
  const [circuitState, setCircuitState] = useState<CircuitState>(() => createPresetCircuit('7408'));
  const [activeICType, setActiveICType] = useState<ICType>('7408');

  const [selectedWireColor, setSelectedWireColor] = useState<WireColor>('yellow');
  const [multimeterMode, setMultimeterMode] = useState<'VOLTAGE' | 'CONTINUITY' | 'LOGIC'>('VOLTAGE');
  const [multimeterProbe, setMultimeterProbe] = useState<MultimeterProbe>({
    redHoleKey: null,
    blackHoleKey: null,
    mode: 'VOLTAGE',
  });

  const [selectedElement, setSelectedElement] = useState<{ type: string; id: string } | null>(null);
  const [isARModalOpen, setIsARModalOpen] = useState(false);
  const [isARSupported, setIsARSupported] = useState(false);
  const [placingIC, setPlacingIC] = useState<ICType | null>(null);
  const [placingResistor, setPlacingResistor] = useState(false);

  // 2. 3D Laboratory Canvas Reference
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const sceneManagerRef = useRef<LaboratorySceneManager | null>(null);

  // 3. Compute Electrical Logic Simulation
  const simResult: SimulationResult = CircuitSimulator.simulate(circuitState);

  // Check AR support
  useEffect(() => {
    arManager.checkSupport().then((supp) => setIsARSupported(supp));
  }, []);

  // Initialize Three.js Scene (Mount/Unmount only)
  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const manager = new LaboratorySceneManager(canvasContainerRef.current);
    sceneManagerRef.current = manager;

    return () => {
      manager.destroy();
      sceneManagerRef.current = null;
    };
  }, []);

  // Update scene manager callback references to prevent stale closures
  useEffect(() => {
    const manager = sceneManagerRef.current;
    if (!manager) return;

    manager.onHoleClick = (holeKey) => {
      // If placing resistor
      if (placingResistor) {
        if (!manager.activeWireStartHole) {
          manager.activeWireStartHole = holeKey;
          setMultimeterProbe((p) => ({ ...p, redHoleKey: holeKey }));
        } else {
          const fromHole = manager.activeWireStartHole;
          const toHole = holeKey;
          manager.cancelWireCreation();

          if (fromHole !== toHole) {
            const newResistor = {
              id: `res_${Date.now()}`,
              resistance: 330,
              fromHoleKey: fromHole,
              toHoleKey: toHole,
            };
            setCircuitState((prev) => ({
              ...prev,
              resistors: [...prev.resistors, newResistor],
            }));
            setPlacingResistor(false);
            soundFx.playWirePlug();
          }
        }
        return;
      }

      // Wire creation state machine
      if (!manager.activeWireStartHole) {
        manager.activeWireStartHole = holeKey;
        setMultimeterProbe((p) => ({ ...p, redHoleKey: holeKey }));
        if (multimeterMode === 'CONTINUITY') {
          soundFx.playMultimeterBeep();
        }
      } else {
        const fromHole = manager.activeWireStartHole;
        const toHole = holeKey;
        manager.cancelWireCreation();

        if (fromHole !== toHole) {
          const newWire = {
            id: `w_${Date.now()}`,
            fromHoleKey: fromHole,
            toHoleKey: toHole,
            color: selectedWireColor,
          };
          setCircuitState((prev) => ({
            ...prev,
            wires: [...prev.wires, newWire],
          }));
          soundFx.playWirePlug();
        }
      }
    };

    manager.onElementSelect = (el) => {
      setSelectedElement(el);
      if (el && el.type === 'SWITCH') {
        handleToggleSwitch(el.id);
      }
    };

    manager.onICPositionChange = (icId, newStartCol) => {
      setCircuitState((prev) => ({
        ...prev,
        ics: prev.ics.map((ic) => (ic.id === icId ? { ...ic, startCol: newStartCol } : ic)),
      }));
    };

    manager.onICPlaced = (type, startCol) => {
      setActiveICType(type);
      const newIC = {
        id: `ic_${type}_${Date.now()}`,
        type,
        startCol,
      };
      setCircuitState((prev) => ({
        ...prev,
        ics: [...prev.ics.filter((i) => i.type !== type), newIC],
      }));
      setPlacingIC(null);
      soundFx.playWirePlug();
    };
  }, [placingResistor, placingIC, selectedWireColor, multimeterMode, circuitState]);

  // Sync 3D Scene whenever state or simulation updates
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.selectedWireColor = selectedWireColor;
      sceneManagerRef.current.setPlacingIC(placingIC);
      sceneManagerRef.current.syncCircuitState(circuitState, simResult, multimeterProbe);
      sceneManagerRef.current.updateSelectionVisuals(selectedElement);
    }
  }, [circuitState, simResult, selectedWireColor, multimeterProbe, placingIC, selectedElement]);

  // Handle keys to cancel placing modes or delete selected component
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (placingIC) {
          setPlacingIC(null);
        }
        if (placingResistor) {
          setPlacingResistor(false);
        }
        if (sceneManagerRef.current) {
          sceneManagerRef.current.cancelWireCreation();
        }
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        const activeEl = document.activeElement;
        const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.getAttribute('contenteditable') === 'true');
        if (!isInput && selectedElement) {
          e.preventDefault();
          handleDeleteSelectedElement();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [placingIC, placingResistor, selectedElement]);

  // Handlers
  const handleTogglePower = () => {
    setCircuitState((prev) => ({ ...prev, powerSupplyOn: !prev.powerSupplyOn }));
  };

  const handleResetCircuit = () => {
    setCircuitState({
      powerSupplyOn: true,
      powerSupplyVoltage: 5.0,
      ics: [],
      wires: [],
      switches: [],
      leds: [],
      resistors: [],
    });
  };

  const handleSaveCircuit = () => {
    try {
      localStorage.setItem('virtual_lab_circuit', JSON.stringify(circuitState));
      alert('Circuit successfully saved to local storage!');
    } catch {
      alert('Failed to save circuit.');
    }
  };

  const handleLoadCircuit = () => {
    try {
      const saved = localStorage.getItem('virtual_lab_circuit');
      if (saved) {
        setCircuitState(JSON.parse(saved));
      } else {
        alert('No saved circuit found.');
      }
    } catch {
      alert('Failed to load saved circuit.');
    }
  };

  const handleLoadPreset = (icType: ICType) => {
    setActiveICType(icType);
    setCircuitState(createPresetCircuit(icType));
  };

  const handleAddIC = (type: ICType) => {
    setPlacingIC(type);
  };

  const handleAddSwitch = (label: string) => {
    const swId = `sw_${Date.now()}`;
    const nextCol = 2 + circuitState.switches.length * 2;
    setCircuitState((prev) => ({
      ...prev,
      switches: [
        ...prev.switches,
        { id: swId, label, state: 'LOW', outputHoleKey: `terminal_${nextCol}_J` },
      ],
    }));
  };

  const handleAddLED = (color: 'red' | 'green' | 'yellow' | 'blue') => {
    setCircuitState((prev) => ({
      ...prev,
      leds: [
        ...prev.leds,
        {
          id: `led_${Date.now()}`,
          color,
          anodeHoleKey: 'terminal_22_J',
          cathodeHoleKey: 'rail_BOTTOM_NEG_22',
          isOn: false,
        },
      ],
    }));
  };

  const handleAddResistor = () => {
    setPlacingResistor(true);
  };

  const handleToggleSwitch = (switchId: string) => {
    soundFx.playSwitchClick();
    setCircuitState((prev) => ({
      ...prev,
      switches: prev.switches.map((sw) =>
        sw.id === switchId ? { ...sw, state: sw.state === 'HIGH' ? 'LOW' : 'HIGH' } : sw
      ),
    }));
  };

  const handleDeleteSelectedElement = () => {
    if (!selectedElement) return;
    const { type, id } = selectedElement;
    if (type === 'WIRE') {
      setCircuitState((prev) => ({ ...prev, wires: prev.wires.filter((w) => w.id !== id) }));
    } else if (type === 'IC') {
      setCircuitState((prev) => ({ ...prev, ics: prev.ics.filter((i) => i.id !== id) }));
    } else if (type === 'SWITCH') {
      setCircuitState((prev) => ({ ...prev, switches: prev.switches.filter((s) => s.id !== id) }));
    } else if (type === 'LED') {
      setCircuitState((prev) => ({ ...prev, leds: prev.leds.filter((l) => l.id !== id) }));
    } else if (type === 'RESISTOR') {
      setCircuitState((prev) => ({ ...prev, resistors: prev.resistors.filter((r) => r.id !== id) }));
    }
    setSelectedElement(null);
  };

  const handleShiftICColumn = (icId: string, delta: number) => {
    setCircuitState((prev) => ({
      ...prev,
      ics: prev.ics.map((ic) =>
        ic.id === icId ? { ...ic, startCol: Math.max(1, Math.min(23, ic.startCol + delta)) } : ic
      ),
    }));
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0A0B0E] font-sans select-none text-slate-200">
      {/* Top Navigation */}
      <Navbar
        powerOn={circuitState.powerSupplyOn}
        voltage={circuitState.powerSupplyVoltage !== undefined ? circuitState.powerSupplyVoltage : 5.0}
        onTogglePower={handleTogglePower}
        onChangeVoltage={(v) => setCircuitState(prev => ({ ...prev, powerSupplyVoltage: v }))}
        onResetCircuit={handleResetCircuit}
        onSaveCircuit={handleSaveCircuit}
        onLoadCircuit={handleLoadCircuit}
        onLoadPreset={handleLoadPreset}
        onOpenAR={() => setIsARModalOpen(true)}
        activeICType={activeICType}
      />

      {/* Main Workspace Grid */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Component Library Sidebar */}
        <ComponentLibrary
          onAddIC={handleAddIC}
          onAddSwitch={handleAddSwitch}
          onAddLED={handleAddLED}
          onAddResistor={handleAddResistor}
          selectedWireColor={selectedWireColor}
          onSelectWireColor={setSelectedWireColor}
          multimeterMode={multimeterMode}
          onSelectMultimeterMode={(mode) => {
            setMultimeterMode(mode);
            setMultimeterProbe((p) => ({ ...p, mode }));
          }}
          activeICType={activeICType}
        />

        {/* 3D WebGL Workbench Viewport */}
        <div className="flex-1 relative bg-[#0A0B0E]">
          <div ref={canvasContainerRef} className="w-full h-full cursor-crosshair" />

          {/* IC Placement Mode Overlay Banner */}
          {placingIC && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-600 border border-blue-400/50 text-white font-mono text-[11px] font-bold uppercase rounded p-2.5 px-4 shadow-2xl z-30 flex items-center gap-2.5 animate-pulse">
              <span>Placing SN74HC{placingIC}N... Click on any hole to position IC. Press ESC to cancel.</span>
            </div>
          )}

          {/* Resistor Placement Mode Overlay Banner */}
          {placingResistor && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-600 border border-amber-400/50 text-white font-mono text-[11px] font-bold uppercase rounded p-2.5 px-4 shadow-2xl z-30 flex items-center gap-2.5 animate-pulse">
              <span>{sceneManagerRef.current?.activeWireStartHole ? "Resistor Mode: Click 2nd hole to drop." : "Resistor Mode: Click 1st hole to start."} (Press ESC to cancel)</span>
            </div>
          )}

          {/* Canvas Floating Instructions Overlay */}
          <div className="absolute top-4 left-4 bg-[#12151B]/90 backdrop-blur-md border border-white/10 rounded-lg p-3 text-xs text-slate-300 shadow-2xl pointer-events-none space-y-1 max-w-sm">
            <div className="flex items-center gap-1.5 font-bold text-white uppercase text-[10px] tracking-wider">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>Breadboard Controls & Interactive Wiring</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
              • <strong className="text-blue-300">Put Wires:</strong> Click 1st hole on breadboard, then click 2nd hole to attach wire.<br />
              • <strong className="text-blue-300">Move ICs:</strong> Click & drag any IC in 3D across columns (or select IC below).<br />
              • <strong className="text-blue-300">Camera:</strong> Drag mouse to rotate • Right-click or scroll to zoom.
            </p>
          </div>

          {/* Selected Element Quick Action floating bar */}
          {selectedElement && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#12151B] backdrop-blur-md border border-white/10 rounded-lg p-2.5 px-4 text-xs text-slate-200 shadow-2xl flex items-center gap-3 z-20">
              <span className="font-mono text-xs text-blue-400 font-bold uppercase">
                Selected: {selectedElement.type} ({selectedElement.id})
              </span>

              {selectedElement.type === 'IC' && (
                <div className="flex items-center gap-1.5 border-l border-r border-white/10 px-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Column:</span>
                  <button
                    onClick={() => handleShiftICColumn(selectedElement.id, -1)}
                    className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold rounded border border-white/10"
                    title="Shift IC Left 1 Column"
                  >
                    ← Left
                  </button>
                  <button
                    onClick={() => handleShiftICColumn(selectedElement.id, 1)}
                    className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold rounded border border-white/10"
                    title="Shift IC Right 1 Column"
                  >
                    Right →
                  </button>
                </div>
              )}

              <button
                onClick={handleDeleteSelectedElement}
                className="flex items-center gap-1 px-2.5 py-1 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white font-bold rounded text-xs uppercase tracking-wider transition-all border border-red-500/30"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Floating Guidance & Truth Table Stack */}
        <div className="absolute top-4 right-4 z-10 flex flex-col space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto pr-1">
          <TruthTablePanel icType={activeICType} circuitState={circuitState} simResult={simResult} />
          <ExperimentGuide icType={activeICType} circuitState={circuitState} simResult={simResult} />
        </div>
      </div>

      {/* Floating Diagnostics Panel */}
      <DiagnosticsPanel diagnostics={simResult.diagnostics} isShortCircuit={simResult.isShortCircuit} />

      {/* Footer matching Immersive UI theme */}
      <footer className="h-8 bg-[#0F1115] border-t border-white/5 px-4 flex items-center justify-between shrink-0 text-[10px] font-mono text-slate-500 z-10">
        <div className="flex gap-4">
          <span>IC: SN74HC{activeICType}N</span>
          <span>PINS: 14/14</span>
          <span>NODE: 0x2A4F</span>
        </div>
        <div className="hidden sm:block uppercase">
          COMPONENT: IC {activeICType} • PIN 14 (VCC) - 5.04V
        </div>
      </footer>

      {/* AR View Modal */}
      <AROverlayModal
        isOpen={isARModalOpen}
        onClose={() => setIsARModalOpen(false)}
        circuitState={circuitState}
        simResult={simResult}
        isARSupported={isARSupported}
        onLaunchWebXR={() => {
          if (sceneManagerRef.current) {
            sceneManagerRef.current.enterARMode();
            setIsARModalOpen(false); // Hide overlay modal so it doesn't block the AR screen feed
            arManager.startARSession(sceneManagerRef.current.renderer, {
              onSessionEnd: () => {
                if (sceneManagerRef.current) {
                  sceneManagerRef.current.exitARMode();
                }
                setIsARModalOpen(true); // Re-open the modal when user exits AR session
              },
              onError: (err) => {
                alert(err);
                if (sceneManagerRef.current) {
                  sceneManagerRef.current.exitARMode();
                }
                setIsARModalOpen(true);
              },
            });
          }
        }}
        onToggleSwitchState={handleToggleSwitch}
        activeICType={activeICType}
      />
    </div>
  );
}
