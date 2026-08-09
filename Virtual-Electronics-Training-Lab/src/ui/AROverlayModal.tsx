import React from 'react';
import { Camera, X, RotateCw, ZoomIn, Eye, Sparkles, AlertCircle } from 'lucide-react';
import { CircuitState, ICType } from '../types/electronics';
import { SimulationResult } from '../electronics/circuitSimulator';

interface AROverlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  circuitState: CircuitState;
  simResult?: SimulationResult;
  isARSupported: boolean;
  onLaunchWebXR: () => void;
  onToggleSwitchState: (switchId: string) => void;
  activeICType: ICType;
}

export const AROverlayModal: React.FC<AROverlayModalProps> = ({
  isOpen,
  onClose,
  circuitState,
  simResult,
  isARSupported,
  onLaunchWebXR,
  onToggleSwitchState,
  activeICType,
}) => {
  if (!isOpen) return null;

  const isLedOn = circuitState.leds.some((l) => simResult?.ledStates[l.id]?.isOn);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-[#12151B] border border-white/10 rounded-2xl max-w-xl w-full p-6 text-slate-100 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold uppercase tracking-tight text-white">Augmented Reality (AR) View</h2>
              <p className="text-xs text-slate-400">Place and inspect your virtual circuit in physical space</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Assembled Circuit Preview Banner */}
        <div className="bg-[#0A0B0E] rounded-xl p-4 border border-white/5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>ACTIVE IC: <strong className="text-blue-400 font-bold">IC {activeICType}</strong></span>
            <span>SIMULATED OUTPUT: <strong className={isLedOn ? 'text-green-400 font-bold' : 'text-slate-500'}>{isLedOn ? 'HIGH (LED ON)' : 'LOW (LED OFF)'}</strong></span>
          </div>

          {/* Interactive Switch Controls in AR */}
          <div className="flex items-center justify-between bg-[#161920] p-3 rounded-lg border border-white/5">
            <span className="text-xs font-bold text-white">Live Input Switch Controls:</span>
            <div className="flex items-center gap-2">
              {circuitState.switches.map((sw) => (
                <button
                  key={sw.id}
                  onClick={() => onToggleSwitchState(sw.id)}
                  className={`px-3 py-1 rounded font-mono text-xs font-bold transition-all uppercase ${
                    sw.state === 'HIGH'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 border border-blue-400/50'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {sw.label}: {sw.state === 'HIGH' ? '1 (HIGH)' : '0 (LOW)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AR Session Launch / Fallback Box */}
        {isARSupported ? (
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6 text-center space-y-4">
            <Sparkles className="w-8 h-8 text-blue-400 mx-auto animate-pulse" />
            <div>
              <h3 className="font-bold text-sm text-blue-300 uppercase tracking-wider">WebXR Immersive AR Available!</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
                Point your mobile/VR camera at a flat surface (table top) to position the 3D virtual breadboard and test logic gate operation live in AR.
              </p>
            </div>
            <button
              onClick={onLaunchWebXR}
              className="px-6 py-2.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/30 transition-all border border-blue-400/50"
            >
              LAUNCH WebXR CAMERA AR
            </button>
          </div>
        ) : (
          <div className="bg-[#0A0B0E] border border-white/5 rounded-xl p-4 space-y-3">
            <div className="flex items-start gap-3 text-amber-400">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-white block">WebXR Hardware AR Notice:</span>
                <p className="text-slate-400 leading-relaxed">
                  WebXR camera pass-through is not detected in this browser/container session. The system is operating in <strong className="text-blue-400">Interactive 3D AR Table View</strong> mode.
                </p>
              </div>
            </div>

            <div className="bg-[#161920] p-3 rounded-lg border border-white/5 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-400 font-bold">
                <Eye className="w-4 h-4" />
                <span>Real-Time 3D AR Simulation Active</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                You can rotate, orbit, and zoom around the workbench in the main laboratory screen while toggling switches live to observe real circuit logic updates!
              </p>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all border border-white/10"
          >
            Return to 3D Workbench
          </button>
        </div>
      </div>
    </div>
  );
};
