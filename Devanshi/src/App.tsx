import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useConverterLogic } from './hooks/useConverterLogic';
import { Breadboard3D } from './components/Breadboard3D';
import { TopNavBar } from './components/TopNavBar';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { TruthTable } from './components/TruthTable';
import { SchematicView } from './components/SchematicView';
import { TheoryManual } from './components/TheoryManual';
import { PinInspector } from './components/PinInspector';
import { ComponentActionCard } from './components/ComponentActionCard';
import { WiringBanner } from './components/WiringBanner';
import { ICPlacementBanner } from './components/ICPlacementBanner';
import { QuizModal } from './components/QuizModal';
import { ComponentLibraryModal } from './components/ComponentLibraryModal';
import { IC_COMPONENTS } from './data/componentsList';
import { getDefaultPresetWires, validateCircuitWiring } from './utils/circuitValidator';
import { getBreadboardNodes, getColumnX } from './utils/threeHelpers';
import {
  IC7486Pin,
  WireConnection,
  BreadboardNode,
  ICComponentInfo,
  ExperimentId,
  ToolTab,
  ProbeMode,
  PlacedIC,
  PlacedSwitch,
  PlacedLED,
  PlacedResistor,
  BitVector4,
  SelectedComponent,
} from './types';
import {
  Table,
  Cpu,
  BookOpen,
  Award,
} from 'lucide-react';

export default function App() {
  const {
    mode,
    setMode,
    inputBits,
    setInputBits,
    toggleBit,
    setInputDecimal,
    inputDecimal,
    outputBits,
    outputDecimal,
    gateStates,
    pins,
    truthTableData,
    setIsAutoSequencing,
  } = useConverterLogic();

  // Active Experiment - Default to Binary to Gray (IC 7486)
  const [currentExperiment, setCurrentExperiment] = useState<ExperimentId>('exp-bin2gray');

  // Active Tool Tab in Left Sidebar
  const [activeToolTab, setActiveToolTab] = useState<ToolTab>('placed');

  // Secondary Tab for Below-Bench Tools
  const [secondaryTab, setSecondaryTab] = useState<'schematic' | 'theory' | 'detailed-table' | null>(null);

  // Selected Pin and Wire
  const [selectedPin, setSelectedPin] = useState<IC7486Pin | null>(null);
  const [selectedWire, setSelectedWire] = useState<WireConnection | null>(null);

  // Modals & Overlay States
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isARModeActive, setIsARModeActive] = useState(false);
  const [isComponentLibraryOpen, setIsComponentLibraryOpen] = useState(false);

  // Dynamic IC Component Selection
  const [selectedIC, setSelectedIC] = useState<ICComponentInfo>(() => {
    return IC_COMPONENTS.find((ic) => ic.code === '7486') || IC_COMPONENTS[0];
  });

  // Benchtop Power Supply & Multimeter Measurements
  const [psuVoltage, setPsuVoltage] = useState<number>(5.0);
  const [probedVoltage, setProbedVoltage] = useState<number>(5.04);
  const [probedNodeLabel, setProbedNodeLabel] = useState<string>('VCC (Pin 14)');
  const [probeMode, setProbeMode] = useState<ProbeMode>('voltage');
  const [isSimulationActive, setIsSimulationActive] = useState<boolean>(true);

  // Faded Ghost IC Placement State (Sliding parallel to other ICs)
  const [isPlacingIC, setIsPlacingIC] = useState<boolean>(false);
  const [placingICCode, setPlacingICCode] = useState<string>('7408');
  const [placingHoverColumn, setPlacingHoverColumn] = useState<number>(10);
  const [activeMovingICId, setActiveMovingICId] = useState<string | null>(null);

  // Dynamic Mounted Components State (Multi-IC, Switches, LEDs, Resistors matching user reference image)
  const [placedICs, setPlacedICs] = useState<PlacedIC[]>([
    {
      id: 'ic-1',
      icCode: '7408',
      name: 'SN74HC7408N Quad 2-Input AND Gate',
      columnStart: 8,
      position: [getColumnX(8) + 1.5, 0.65, 0],
    },
    {
      id: 'ic-2',
      icCode: '7400',
      name: 'SN74HC7400N Quad 2-Input NAND Gate',
      columnStart: 18,
      position: [getColumnX(18) + 1.5, 0.65, 0],
    },
  ]);

  const [placedSwitches, setPlacedSwitches] = useState<PlacedSwitch[]>([
    { id: 'sw-1', label: 'Switch A', bitKey: 'b3', state: 0, column: 2, position: [getColumnX(2), 0.55, 1.2] },
    { id: 'sw-2', label: 'Switch B', bitKey: 'b2', state: 0, column: 4, position: [getColumnX(4), 0.55, 1.2] },
    { id: 'sw-3', label: 'Switch C', bitKey: 'b1', state: 0, column: 6, position: [getColumnX(6), 0.55, 1.2] },
  ]);

  const [placedLEDs, setPlacedLEDs] = useState<PlacedLED[]>([
    { id: 'led-1', label: 'LED Y1', color: 'red', state: 0, column: 24, position: [getColumnX(24), 0.55, 1.2] },
    { id: 'led-2', label: 'LED Y2', color: 'green', state: 0, column: 26, position: [getColumnX(26), 0.55, 1.2] },
  ]);

  const [placedResistors, setPlacedResistors] = useState<PlacedResistor[]>([
    { id: 'res-1', value: '330Ω', fromNodeId: 'led-1-cathode', toNodeId: 'gnd-bot-24', column: 24, position: [getColumnX(24), 0.58, 1.7] },
    { id: 'res-2', value: '330Ω', fromNodeId: 'led-2-cathode', toNodeId: 'gnd-bot-26', column: 26, position: [getColumnX(26), 0.58, 1.7] },
  ]);

  const [selectedLEDColor, setSelectedLEDColor] = useState<'red' | 'green' | 'yellow' | 'blue' | 'purple'>('red');

  // Dynamic Customizable Wiring System
  const [wires, setWires] = useState<WireConnection[]>(() => getDefaultPresetWires('bin2gray'));
  const [activeStartNode, setActiveStartNode] = useState<BreadboardNode | null>(null);
  const [wireColor, setWireColor] = useState<string>('#38bdf8');
  const [selectedComponent, setSelectedComponent] = useState<SelectedComponent>(null);

  // Track verified truth table rows
  const [verifiedRows, setVerifiedRows] = useState<Set<number>>(new Set([0]));

  // Generate all available breadboard nodes for manual wire picker
  const availableNodes = useMemo(() => {
    return getBreadboardNodes(placedICs, placedSwitches, placedLEDs);
  }, [placedICs, placedSwitches, placedLEDs]);

  useEffect(() => {
    setVerifiedRows((prev) => new Set([...prev, inputDecimal]));
  }, [inputDecimal]);

  // Sync Switch states with InputBits
  useEffect(() => {
    setPlacedSwitches((prev) =>
      prev.map((sw, idx) => {
        const bitKey = sw.bitKey || (['b3', 'b2', 'b1', 'b0'][idx] as keyof typeof inputBits);
        return { ...sw, state: inputBits[bitKey] || 0 };
      })
    );
  }, [inputBits]);

  // Sync LED states with OutputBits
  useEffect(() => {
    setPlacedLEDs((prev) =>
      prev.map((led, idx) => {
        const bitKey = (['b3', 'b2', 'b1', 'b0'][idx] || 'b3') as keyof typeof outputBits;
        return { ...led, state: outputBits[bitKey] || 0 };
      })
    );
  }, [outputBits]);

  // Handle Switch Toggle
  const handleTogglePlacedSwitch = useCallback(
    (switchId: string) => {
      const sw = placedSwitches.find((s) => s.id === switchId);
      if (sw && sw.bitKey) {
        toggleBit(sw.bitKey);
      } else {
        setPlacedSwitches((prev) =>
          prev.map((s) => (s.id === switchId ? { ...s, state: s.state === 1 ? 0 : 1 } : s))
        );
      }
    },
    [placedSwitches, toggleBit]
  );

  // Start Faded Ghost IC placement
  const handleStartPlacingIC = useCallback((code: string) => {
    setPlacingICCode(code);
    setActiveMovingICId(null);
    setIsPlacingIC(true);
  }, []);

  const handleStartMoveIC = useCallback((id: string) => {
    const found = placedICs.find((ic) => ic.id === id);
    if (found) {
      setPlacingICCode(found.icCode);
      setPlacingHoverColumn(found.columnStart || 10);
      setActiveMovingICId(id);
      setIsPlacingIC(true);
    }
  }, [placedICs]);

  const handleCancelPlacingIC = useCallback(() => {
    setIsPlacingIC(false);
    setActiveMovingICId(null);
  }, []);

  // Add Component Handlers
  const handleAddIC = useCallback((icCode: string, column: number) => {
    const matched = IC_COMPONENTS.find((ic) => ic.code === icCode) || IC_COMPONENTS[0];
    const newIC: PlacedIC = {
      id: `ic-${Date.now()}`,
      icCode,
      name: `SN74HC${icCode}N ${matched.name}`,
      columnStart: column,
      position: [getColumnX(column) + 1.5, 0.65, 0],
    };
    setPlacedICs((prev) => [...prev, newIC]);
    setSelectedIC(matched);
    setIsPlacingIC(false);
    setActiveMovingICId(null);
  }, []);

  // Move / Reposition Existing IC
  const handleMoveIC = useCallback((icId: string, newColumn: number) => {
    setPlacedICs((prev) =>
      prev.map((ic) =>
        ic.id === icId
          ? {
              ...ic,
              columnStart: newColumn,
              position: [getColumnX(newColumn) + 1.5, 0.65, 0],
            }
          : ic
      )
    );
    setIsPlacingIC(false);
    setActiveMovingICId(null);
  }, []);

  const handleRemoveIC = useCallback((icId: string) => {
    setPlacedICs((prev) => prev.filter((ic) => ic.id !== icId));
    setWires((prev) => prev.filter((w) => !w.fromNodeId?.includes(icId) && !w.toNodeId?.includes(icId)));
    setSelectedComponent((prev) => (prev && prev.type === 'ic' && prev.data.id === icId ? null : prev));
  }, []);

  const handleAddSwitch = useCallback((label?: string, column?: number) => {
    const nextIdx = placedSwitches.length;
    const col = column || (nextIdx * 2 + 2);
    const bitKeys: (keyof BitVector4)[] = ['b3', 'b2', 'b1', 'b0'];
    const assignedBitKey = bitKeys[nextIdx % bitKeys.length];

    const newSwitch: PlacedSwitch = {
      id: `sw-${Date.now()}`,
      label: label || `Switch ${String.fromCharCode(65 + nextIdx)}`,
      bitKey: assignedBitKey,
      state: 0,
      column: Math.min(30, col),
      position: [getColumnX(col), 0.55, 1.2],
    };
    setPlacedSwitches((prev) => [...prev, newSwitch]);
  }, [placedSwitches.length, inputBits]);

  const handleRemoveSwitch = useCallback((switchId: string) => {
    setPlacedSwitches((prev) => prev.filter((sw) => sw.id !== switchId));
    setWires((prev) => prev.filter((w) => !w.fromNodeId?.includes(switchId) && !w.toNodeId?.includes(switchId)));
    setSelectedComponent((prev) => (prev && prev.type === 'switch' && prev.data.id === switchId ? null : prev));
  }, []);

  const handleAddLED = useCallback(
    (color: 'red' | 'green' | 'yellow' | 'blue' | 'purple', column?: number) => {
      const nextIdx = placedLEDs.length;
      const col = column || (22 + nextIdx * 2);

      const newLED: PlacedLED = {
        id: `led-${Date.now()}`,
        label: `LED Y${nextIdx + 1}`,
        color,
        state: 0,
        column: Math.min(30, col),
        position: [getColumnX(col), 0.55, 1.2],
      };
      setPlacedLEDs((prev) => [...prev, newLED]);
    },
    [placedLEDs.length]
  );

  const handleRemoveLED = useCallback((ledId: string) => {
    setPlacedLEDs((prev) => prev.filter((led) => led.id !== ledId));
    setWires((prev) => prev.filter((w) => !w.fromNodeId?.includes(ledId) && !w.toNodeId?.includes(ledId)));
    setSelectedComponent((prev) => (prev && prev.type === 'led' && prev.data.id === ledId ? null : prev));
  }, []);

  const handleAddResistor = useCallback((value = '330Ω') => {
    const nextIdx = placedResistors.length;
    const col = 22 + nextIdx * 2;
    const newResistor: PlacedResistor = {
      id: `res-${Date.now()}`,
      value,
      fromNodeId: `led-${nextIdx + 1}-cathode`,
      toNodeId: `gnd-bot-${col}`,
      column: Math.min(30, col),
      position: [getColumnX(col), 0.58, 1.7],
    };
    setPlacedResistors((prev) => [...prev, newResistor]);
  }, [placedResistors.length]);

  const handleRemoveResistor = useCallback((resistorId: string) => {
    setPlacedResistors((prev) => prev.filter((r) => r.id !== resistorId));
    setSelectedComponent((prev) => (prev && prev.type === 'resistor' && prev.data.id === resistorId ? null : prev));
  }, []);

  // When experiment changes, update mode and IC appropriately
  const handleSelectExperiment = useCallback((expId: ExperimentId) => {
    setCurrentExperiment(expId);
    if (expId === 'exp-bin2gray') {
      setMode('bin2gray');
      const ic7486 = IC_COMPONENTS.find((ic) => ic.code === '7486') || IC_COMPONENTS[0];
      setSelectedIC(ic7486);
      setWires(getDefaultPresetWires('bin2gray'));
    } else if (expId === 'exp-gray2bin') {
      setMode('gray2bin');
      const ic7486 = IC_COMPONENTS.find((ic) => ic.code === '7486') || IC_COMPONENTS[0];
      setSelectedIC(ic7486);
      setWires(getDefaultPresetWires('gray2bin'));
    } else if (expId === 'exp-custom-sandbox') {
      setWires([]);
    }
  }, [setMode]);

  // Quick IC Preset Selection from Navbar
  const handleSelectICCode = useCallback((code: string) => {
    const found = IC_COMPONENTS.find((ic) => ic.code === code);
    if (found) {
      setSelectedIC(found);
      handleStartPlacingIC(code);
    }
  }, [handleStartPlacingIC]);

  // Update wire logic signal states whenever inputBits / outputBits change
  useEffect(() => {
    if (!isSimulationActive) return;
    setWires((prevWires) =>
      prevWires.map((w) => {
        let signal: 0 | 1 = 0;
        const from = w.fromNodeId || '';
        const to = w.toNodeId || '';

        if (from === 'sw-3' || to === 'sw-3' || from.includes('sw-node') || to.includes('sw-node')) {
          signal = inputBits.b3;
        } else if (from.startsWith('vcc') || to.startsWith('vcc')) {
          signal = 1;
        } else if (from.startsWith('gnd') || to.startsWith('gnd')) {
          signal = 0;
        } else if (from.includes('led') || to.includes('led')) {
          signal = outputBits.b3;
        }

        return { ...w, logicState: signal };
      })
    );
  }, [inputBits, outputBits, isSimulationActive]);

  // Circuit Verification Diagnostics
  const circuitCheck = useMemo(() => {
    return validateCircuitWiring(wires, mode, selectedIC.code);
  }, [wires, mode, selectedIC.code]);

  // Check if primary IC is powered
  const isICPowered = useMemo(() => {
    const hasVCC = wires.some(
      (w) =>
        (w.fromNodeId?.includes('pin-14') || w.toNodeId?.includes('pin-14')) &&
        (w.fromNodeId?.startsWith('vcc') || w.toNodeId?.startsWith('vcc'))
    );
    const hasGND = wires.some(
      (w) =>
        (w.fromNodeId?.includes('pin-7') || w.toNodeId?.includes('pin-7')) &&
        (w.fromNodeId?.startsWith('gnd') || w.toNodeId?.startsWith('gnd'))
    );
    return hasVCC && hasGND;
  }, [wires]);

  // Handle 2-Step Tap-to-Connect Node Wiring Interaction
  const handleSelectNode = useCallback(
    (node: BreadboardNode) => {
      if (!activeStartNode) {
        // Step 1: Select start node
        setActiveStartNode(node);
      } else {
        // Step 2: Complete wire to target node
        if (activeStartNode.id === node.id) {
          setActiveStartNode(null);
          return;
        }

        const newWire: WireConnection = {
          id: `custom-wire-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          fromNodeId: activeStartNode.id,
          toNodeId: node.id,
          fromName: activeStartNode.label,
          toName: node.label,
          fromPos: activeStartNode.position,
          toPos: node.position,
          color: wireColor,
          logicState: 0,
          label: `${activeStartNode.label} ⇄ ${node.label}`,
          description: `Jumper wire between ${activeStartNode.label} and ${node.label}.`,
          category: activeStartNode.id.startsWith('vcc')
            ? 'power'
            : activeStartNode.id.startsWith('gnd')
            ? 'ground'
            : 'custom',
        };

        setWires((prev) => [...prev, newWire]);
        setActiveStartNode(null);
      }
    },
    [activeStartNode, wireColor]
  );

  // Connect custom holes via UI picker
  const handleConnectCustomHoles = useCallback(
    (fromNodeId: string, toNodeId: string, customColor: string) => {
      const fromNode = availableNodes.find((n) => n.id === fromNodeId);
      const toNode = availableNodes.find((n) => n.id === toNodeId);
      if (!fromNode || !toNode) return;

      const newWire: WireConnection = {
        id: `custom-wire-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        fromNodeId,
        toNodeId,
        fromName: fromNode.label,
        toName: toNode.label,
        fromPos: fromNode.position,
        toPos: toNode.position,
        color: customColor,
        logicState: 0,
        label: `${fromNode.label} ⇄ ${toNode.label}`,
        description: `Custom jumper wire between ${fromNode.label} and ${toNode.label}.`,
        category: fromNodeId.startsWith('vcc')
          ? 'power'
          : fromNodeId.startsWith('gnd')
          ? 'ground'
          : 'custom',
      };

      setWires((prev) => [...prev, newWire]);
    },
    [availableNodes]
  );

  // Auto-Wire Preset Circuit
  const handleAutoWire = useCallback(() => {
    setWires(getDefaultPresetWires(mode));
    setActiveStartNode(null);
    setSelectedWire(null);
  }, [mode]);

  // Clear All Wires
  const handleClearWires = useCallback(() => {
    setWires([]);
    setActiveStartNode(null);
    setSelectedWire(null);
  }, []);

  // Delete Individual Wire
  const handleDeleteWire = useCallback((wireId: string) => {
    setWires((prev) => prev.filter((w) => w.id !== wireId));
    setSelectedWire(null);
    setSelectedComponent((prev) => (prev && prev.type === 'wire' && prev.data.id === wireId ? null : prev));
  }, []);

  // Save Circuit to LocalStorage
  const handleSaveCircuit = useCallback(() => {
    const circuitState = {
      wires,
      placedICs,
      placedSwitches,
      placedLEDs,
      placedResistors,
      mode,
      psuVoltage,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('virtual_lab_saved_circuit', JSON.stringify(circuitState));
    alert('Circuit configuration saved successfully to browser storage!');
  }, [wires, placedICs, placedSwitches, placedLEDs, placedResistors, mode, psuVoltage]);

  // Download Lab Report
  const handleDownloadReport = useCallback(() => {
    const reportContent = `=====================================================
DIGITAL ELECTRONICS VIRTUAL LAB REPORT
Mounted ICs: ${placedICs.map((i) => `IC ${i.icCode}`).join(', ')}
Mode: ${mode === 'bin2gray' ? 'Binary to Gray' : 'Gray to Binary'}
PSU Voltage: ${psuVoltage}V DC
DMM Probed: ${probedVoltage}V (${probedNodeLabel})
Date: ${new Date().toLocaleString()}
=====================================================
PLACED COMPONENTS INVENTORY:
- ICs (${placedICs.length}): ${placedICs.map((i) => `[${i.name} @ Col ${i.columnStart}]`).join(', ')}
- Switches (${placedSwitches.length}): ${placedSwitches.map((s) => `[${s.label}: ${s.state ? 'HIGH' : 'LOW'}]`).join(', ')}
- LEDs (${placedLEDs.length}): ${placedLEDs.map((l) => `[${l.label} (${l.color}): ${l.state ? 'ON' : 'OFF'}]`).join(', ')}

CIRCUIT JUMPER WIRES (${wires.length} wires):
${wires.map((w, idx) => `${idx + 1}. ${w.fromName} -> ${w.toName} [${w.color}] (Signal: ${w.logicState})`).join('\n')}
=====================================================`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `VirtualLab_Report_${Date.now()}.txt`;
    link.click();
  }, [placedICs, placedSwitches, placedLEDs, mode, psuVoltage, probedVoltage, probedNodeLabel, wires]);

  // Reset Workbench
  const handleResetLab = useCallback(() => {
    if (window.confirm('Reset the virtual lab workbench to default settings?')) {
      setWires(getDefaultPresetWires(mode));
      setInputDecimal(0);
      setPsuVoltage(5.0);
      setActiveStartNode(null);
      setSelectedWire(null);
      setSelectedPin(null);
      setVerifiedRows(new Set([0]));
    }
  }, [mode, setInputDecimal]);

  // Multimeter probe callback
  const handleProbeNode = useCallback((voltage: number, label: string) => {
    setProbedVoltage(voltage);
    setProbedNodeLabel(label);
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === '3') toggleBit('b3');
      else if (e.key === '2') toggleBit('b2');
      else if (e.key === '1') toggleBit('b1');
      else if (e.key === '0') toggleBit('b0');
      else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsAutoSequencing((prev) => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        setMode(mode === 'bin2gray' ? 'gray2bin' : 'bin2gray');
      } else if (e.key === 'r' || e.key === 'R') {
        setInputDecimal(0);
      } else if (e.key === 'a' || e.key === 'A') {
        setIsARModeActive((prev) => !prev);
      } else if (e.key === 'c' || e.key === 'C') {
        setIsComponentLibraryOpen(true);
      } else if (e.key === 'Escape') {
        setActiveStartNode(null);
        setSelectedWire(null);
        setSelectedPin(null);
        setSelectedComponent(null);
        setIsPlacingIC(false);
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedWire) {
          handleDeleteWire(selectedWire.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleBit, mode, setMode, setInputDecimal, setIsAutoSequencing, selectedWire, handleDeleteWire]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-slate-950">
      {/* Top Navigation Bar with Clean Binary/Gray Selector, Presets & Controls */}
      <TopNavBar
        currentExperiment={currentExperiment}
        onSelectExperiment={handleSelectExperiment}
        selectedIC={selectedIC}
        onSelectICCode={handleSelectICCode}
        psuVoltage={psuVoltage}
        setPsuVoltage={setPsuVoltage}
        isSimulationActive={isSimulationActive}
        setIsSimulationActive={setIsSimulationActive}
        onSaveCircuit={handleSaveCircuit}
        onDownloadReport={handleDownloadReport}
        onResetLab={handleResetLab}
        isARModeActive={isARModeActive}
        setIsARModeActive={setIsARModeActive}
      />

      {/* Main 3-Column Studio Workbench Layout */}
      <main className="flex-1 w-full max-w-[1850px] mx-auto p-3 lg:p-5 flex flex-col lg:flex-row items-start gap-4">
        {/* Left Column: Multi-tab Tool Suite with PLACED COMPONENTS List & Custom Positioning */}
        <LeftSidebar
          activeTab={activeToolTab}
          setActiveTab={setActiveToolTab}
          selectedIC={selectedIC}
          onSelectIC={(ic) => setSelectedIC(ic)}
          inputBits={inputBits}
          toggleBit={toggleBit}
          wires={wires}
          selectedWire={selectedWire}
          onSelectWire={(w) => setSelectedWire(w)}
          activeStartNode={activeStartNode}
          wireColor={wireColor}
          setWireColor={setWireColor}
          onAutoWire={handleAutoWire}
          onClearWires={handleClearWires}
          onDeleteWire={handleDeleteWire}
          onCancelWiring={() => setActiveStartNode(null)}
          probedVoltage={probedVoltage}
          probedNodeLabel={probedNodeLabel}
          probeMode={probeMode}
          setProbeMode={setProbeMode}
          selectedLEDColor={selectedLEDColor}
          setSelectedLEDColor={setSelectedLEDColor}
          // Placed Components Management
          placedICs={placedICs}
          onAddIC={handleAddIC}
          onRemoveIC={handleRemoveIC}
          onMoveIC={handleMoveIC}
          onStartMoveIC={handleStartMoveIC}
          onStartPlacingIC={handleStartPlacingIC}
          placedSwitches={placedSwitches}
          onAddSwitch={handleAddSwitch}
          onRemoveSwitch={handleRemoveSwitch}
          onToggleSwitch={handleTogglePlacedSwitch}
          placedLEDs={placedLEDs}
          onAddLED={handleAddLED}
          onRemoveLED={handleRemoveLED}
          placedResistors={placedResistors}
          onAddResistor={handleAddResistor}
          onRemoveResistor={handleRemoveResistor}
          availableNodes={availableNodes}
          onConnectCustomHoles={handleConnectCustomHoles}
        />

        {/* Center Column: 3D Breadboard Simulator Viewport & Bottom Tool Drawer */}
        <section className="flex-1 w-full flex flex-col gap-3 min-w-0">
          {/* 3D Breadboard Viewport */}
          <div className="w-full h-[520px] lg:h-[620px] relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
            <Breadboard3D
              mode={mode}
              setMode={setMode}
              inputBits={inputBits}
              outputBits={outputBits}
              pins={pins}
              selectedIC={selectedIC}
              wires={wires}
              selectedWire={selectedWire}
              activeStartNode={activeStartNode}
              wireColor={wireColor}
              onSelectNode={handleSelectNode}
              onSelectWire={(wire) => {
                setSelectedWire(wire);
                setSelectedPin(null);
                if (wire) {
                  setSelectedComponent({ type: 'wire', data: wire });
                }
              }}
              onSelectPin={(pin) => {
                setSelectedPin(pin);
                setSelectedWire(null);
              }}
              toggleBit={toggleBit}
              isARModeActive={isARModeActive}
              setIsARModeActive={setIsARModeActive}
              onOpenComponentLibrary={() => setIsComponentLibraryOpen(true)}
              psuVoltage={psuVoltage}
              probedVoltage={probedVoltage}
              onProbeNode={handleProbeNode}
              probeMode={probeMode}
              isICPowered={isICPowered}
              onDeleteWire={handleDeleteWire}
              selectedComponent={selectedComponent}
              onSelectComponent={setSelectedComponent}
              // Placed Multi-Components
              placedICs={placedICs}
              onAddIC={handleAddIC}
              onRemoveIC={handleRemoveIC}
              onMoveIC={handleMoveIC}
              placedSwitches={placedSwitches}
              onToggleSwitch={handleTogglePlacedSwitch}
              placedLEDs={placedLEDs}
              placedResistors={placedResistors}
              // Faded Ghost IC Preview
              isPlacingIC={isPlacingIC}
              placingICCode={placingICCode}
              onCancelPlacingIC={handleCancelPlacingIC}
              hoverColumn={placingHoverColumn}
              onHoverColumnChange={setPlacingHoverColumn}
              activeMovingICId={activeMovingICId}
            />

            {/* Floating IC Placement & Parallel Repositioning Banner */}
            <ICPlacementBanner
              isPlacingIC={isPlacingIC}
              icCode={placingICCode}
              column={placingHoverColumn}
              onSetColumn={setPlacingHoverColumn}
              onConfirmPlace={() => {
                if (activeMovingICId) {
                  handleMoveIC(activeMovingICId, placingHoverColumn);
                } else {
                  handleAddIC(placingICCode, placingHoverColumn);
                }
              }}
              onCancel={handleCancelPlacingIC}
              isMovingExisting={activeMovingICId !== null}
            />

            {/* Floating Wiring Feedback Banner (When hole is selected) */}
            <WiringBanner
              activeStartNode={activeStartNode}
              onCancel={() => setActiveStartNode(null)}
              wireColor={wireColor}
            />

            {/* Floating Component Action Card (Delete, Toggle, Color, Info) */}
            <ComponentActionCard
              selectedComponent={selectedComponent}
              onClose={() => setSelectedComponent(null)}
              onDeleteIC={handleRemoveIC}
              onDeleteSwitch={handleRemoveSwitch}
              onDeleteLED={handleRemoveLED}
              onDeleteResistor={handleRemoveResistor}
              onDeleteWire={handleDeleteWire}
              onToggleSwitch={handleTogglePlacedSwitch}
              onStartMoveIC={(id) => handleStartMoveIC(id)}
              onChangeLEDColor={(id, color) => {
                setPlacedLEDs((prev) => prev.map((l) => (l.id === id ? { ...l, color } : l)));
                setSelectedComponent((prev) =>
                  prev && prev.type === 'led' && prev.data.id === id
                    ? { ...prev, data: { ...prev.data, color } }
                    : prev
                );
              }}
            />
          </div>

          {/* Quick Inspector Bar if pin or wire is clicked */}
          {(selectedPin || (selectedWire && !selectedComponent)) && !isARModeActive && (
            <PinInspector
              selectedPin={selectedPin}
              selectedWire={selectedWire}
              onClose={() => {
                setSelectedPin(null);
                setSelectedWire(null);
              }}
            />
          )}

          {/* Secondary Tools Drawer Bar (Schematic, Theory Manual, Detailed 16-Row Table) */}
          <div className="bg-slate-900/90 rounded-2xl p-2 border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-500 px-2">
                Workbench Tools:
              </span>
              <button
                onClick={() => setSecondaryTab(secondaryTab === 'schematic' ? null : 'schematic')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                  secondaryTab === 'schematic'
                    ? 'bg-sky-500 text-slate-950 shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Schematic Circuit</span>
              </button>

              <button
                onClick={() => setSecondaryTab(secondaryTab === 'detailed-table' ? null : 'detailed-table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                  secondaryTab === 'detailed-table'
                    ? 'bg-sky-500 text-slate-950 shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Full Truth Table</span>
              </button>

              <button
                onClick={() => setSecondaryTab(secondaryTab === 'theory' ? null : 'theory')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                  secondaryTab === 'theory'
                    ? 'bg-sky-500 text-slate-950 shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Theory & Datasheets</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsQuizOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold transition-all"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Viva Lab Quiz</span>
              </button>
            </div>
          </div>

          {/* Collapsible Tool View Panes */}
          {secondaryTab === 'schematic' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl">
              <SchematicView
                mode={mode}
                inputBits={inputBits}
                outputBits={outputBits}
                gateStates={gateStates}
              />
            </div>
          )}

          {secondaryTab === 'detailed-table' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl">
              <TruthTable
                mode={mode}
                inputDecimal={inputDecimal}
                truthTableData={truthTableData}
                verifiedRows={verifiedRows}
              />
            </div>
          )}

          {secondaryTab === 'theory' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl">
              <TheoryManual mode={mode} selectedIC={selectedIC} />
            </div>
          )}
        </section>

        {/* Right Column: Live Logic State Dashboard & Verification */}
        <RightSidebar
          mode={mode}
          setMode={setMode}
          inputBits={inputBits}
          toggleBit={toggleBit}
          inputDecimal={inputDecimal}
          outputBits={outputBits}
          outputDecimal={outputDecimal}
          circuitCheck={circuitCheck}
          gateStates={gateStates}
          selectedIC={selectedIC}
          truthTableRows={truthTableData}
          verifiedRowsCount={verifiedRows.size}
          totalRowsCount={truthTableData.length || 16}
          onSelectRow={(dec) => setInputDecimal(dec)}
          isICPowered={isICPowered}
          wiresCount={wires.length}
        />
      </main>

      {/* Lab Quiz Dialog Modal */}
      {isQuizOpen && <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />}

      {/* IC Component Catalog Modal */}
      {isComponentLibraryOpen && (
        <ComponentLibraryModal
          isOpen={isComponentLibraryOpen}
          onClose={() => setIsComponentLibraryOpen(false)}
          selectedIC={selectedIC}
          onSelectIC={(ic) => {
            setSelectedIC(ic);
            handleStartPlacingIC(ic.code);
            setIsComponentLibraryOpen(false);
          }}
        />
      )}
    </div>
  );
}
