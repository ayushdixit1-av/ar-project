import React, { useState } from 'react';
import { BLENDER_PYTHON_SCRIPT_CODE } from '../data/blenderPythonScript';
import { X, Copy, Check, FileCode, Layers, Database, Cpu, Server, Terminal } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'blender' | 'arch' | 'api' | 'db'>('blender');

  if (!isOpen) return null;

  const copyScript = () => {
    navigator.clipboard.writeText(BLENDER_PYTHON_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 selection:bg-blue-500 selection:text-white">
      <div className="bg-[#0a0a0d] border border-white/10 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0e0e14]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide font-mono">
                Digital Logic Trainer Architecture & Blender Automation
              </h2>
              <p className="text-[11px] text-gray-400">Technical Specifications & Python 3D Asset Generators</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Nav Tabs */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-[#08080c] font-mono text-xs">
          <button
            onClick={() => setActiveTab('blender')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
              activeTab === 'blender' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Blender Python Automation</span>
          </button>

          <button
            onClick={() => setActiveTab('arch')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
              activeTab === 'arch' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>System Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('api')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
              activeTab === 'api' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>API Specs & WebGPU</span>
          </button>

          <button
            onClick={() => setActiveTab('db')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
              activeTab === 'db' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Database Schema</span>
          </button>
        </div>

        {/* Modal Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-[#050508]">
          {/* TAB: BLENDER PYTHON SCRIPT */}
          {activeTab === 'blender' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400">
                  Executable Python script for Blender 3.x / 4.x (Generates GLTF 2.0 PBR Assets)
                </span>
                <button
                  onClick={copyScript}
                  className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Script!' : 'Copy Script'}</span>
                </button>
              </div>

              <pre className="p-4 bg-[#0a0a0f] border border-white/10 rounded-xl font-mono text-[11px] text-emerald-400 overflow-x-auto leading-relaxed">
                {BLENDER_PYTHON_SCRIPT_CODE}
              </pre>
            </div>
          )}

          {/* TAB: SYSTEM ARCHITECTURE */}
          {activeTab === 'arch' && (
            <div className="space-y-4 font-mono text-xs text-gray-300">
              <div className="p-4 bg-[#0a0a0f] border border-white/10 rounded-xl space-y-2">
                <h3 className="text-sm font-bold text-blue-400">Project Directory Layout</h3>
                <pre className="text-[11px] text-gray-400 leading-relaxed">
                  {`digital-logic-trainer/
├── src/
│   ├── components/
│   │   ├── HeaderNav.tsx              # Top navigation & system power switch
│   │   ├── Trainer3DViewport.tsx      # Three.js 3D Viewport with OrbitControls & Raycasting
│   │   ├── LeftSidebarLibrary.tsx     # 30+ Component Library search & wire swatches
│   │   ├── RightSidebarInspector.tsx  # Datasheet Inspector, Labs & Auto-Grading Quiz
│   │   └── BottomConsoleToolbar.tsx   # Serial Monitor & System Metrics
│   ├── data/
│   │   ├── componentsLibrary.ts       # Detailed PBR metadata & pin coordinates
│   │   ├── tutorialsData.ts           # Guided hands-on practical labs
│   │   └── quizzesData.ts             # Quizzes & auto-grading assessment tasks
│   ├── utils/
│   │   ├── threeHelpers.ts            # Procedural 3D mesh generators & wire catenary curves
│   │   └── audioSynth.ts              # Web Audio API sound synthesizer
│   └── types.ts                       # Shared TypeScript interface declarations
├── scripts/
│   └── generate_3d_assets.py         # Blender automation Python asset exporter
├── server.ts                          # Full-stack Express backend server
└── package.json`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB: API SPECS */}
          {activeTab === 'api' && (
            <div className="space-y-3 font-mono text-xs text-gray-300">
              <div className="p-3 bg-[#0a0a0f] border border-white/10 rounded-xl space-y-2">
                <h4 className="text-blue-400 font-bold">GET /api/components</h4>
                <p className="text-[11px] text-gray-400">Returns list of electronic component metadata and pin definitions.</p>
              </div>

              <div className="p-3 bg-[#0a0a0f] border border-white/10 rounded-xl space-y-2">
                <h4 className="text-blue-400 font-bold">POST /api/assessment/submit</h4>
                <p className="text-[11px] text-gray-400">Submits student wire connection graph for automated server-side grading.</p>
              </div>
            </div>
          )}

          {/* TAB: DATABASE SCHEMA */}
          {activeTab === 'db' && (
            <div className="space-y-3 font-mono text-xs text-gray-300">
              <div className="p-3 bg-[#0a0a0f] border border-white/10 rounded-xl space-y-2">
                <h4 className="text-emerald-400 font-bold">Firestore / Relational Schema</h4>
                <pre className="text-[11px] text-gray-400">
                  {`users {
  uid: string
  name: string
  role: "student" | "teacher"
}

circuit_configs {
  configId: string
  userId: string
  placedComponents: Array<PlacedComponent>
  jumperWires: Array<JumperWire>
  createdAt: timestamp
}

assessment_submissions {
  submissionId: string
  studentId: string
  taskId: string
  score: number
  passed: boolean
  evaluatedAt: timestamp
}`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
