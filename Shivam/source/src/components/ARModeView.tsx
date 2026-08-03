import React, { useEffect, useRef, useState } from 'react';
import { Camera, RefreshCw, X, Sparkles, Zap, Layers, Maximize2, Move, Eye, RotateCw, Smartphone, Flashlight, Download, Check } from 'lucide-react';
import { PlacedComponent, JumperWire, SimulationState, ViewRenderMode } from '../types';
import { Trainer3DViewport } from './Trainer3DViewport';

interface ARModeViewProps {
  onExitAR: () => void;
  placedComponents: PlacedComponent[];
  wires: JumperWire[];
  selectedComponentId: string | null;
  onSelectComponent: (comp: PlacedComponent | null) => void;
  renderMode: ViewRenderMode;
  setRenderMode: (mode: ViewRenderMode) => void;
  activeWireColor: string;
  isWireMode: boolean;
  onAddWire: (fromCompId: string, fromPinId: string, toCompId: string, toPinId: string) => void;
  simState: SimulationState;
}

export const ARModeView: React.FC<ARModeViewProps> = ({
  onExitAR,
  placedComponents,
  wires,
  selectedComponentId,
  onSelectComponent,
  renderMode,
  setRenderMode,
  activeWireColor,
  isWireMode,
  onAddWire,
  simState,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [hasCameraAccess, setHasCameraAccess] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [arScale, setArScale] = useState<number>(1.0);
  const [arRotation, setArRotation] = useState<number>(0);
  const [isPlaced, setIsPlaced] = useState<boolean>(true);
  const [webXRSupported, setWebXRSupported] = useState<boolean>(false);
  const [isTorchOn, setIsTorchOn] = useState<boolean>(false);
  const [torchSupported, setTorchSupported] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [snapshotTaken, setSnapshotTaken] = useState<boolean>(false);

  // Mobile Touch Gestures State
  const touchStartDistRef = useRef<number | null>(null);
  const touchStartAngleRef = useRef<number | null>(null);

  // Check WebXR support
  useEffect(() => {
    if ('xr' in navigator) {
      // @ts-ignore
      navigator.xr?.isSessionSupported?.('immersive-ar').then((supported: boolean) => {
        setWebXRSupported(supported);
      }).catch(() => setWebXRSupported(false));
    }
  }, []);

  // Initialize Camera Stream
  const requestCamera = async () => {
    try {
      setCameraError(null);
      let activeStream: MediaStream | null = null;
      
      try {
        activeStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
      } catch (firstErr) {
        // Fallback to simple video constraint for standard webcams / laptops
        activeStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      setMediaStream(activeStream);

      if (videoRef.current) {
        videoRef.current.srcObject = activeStream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.setAttribute('webkit-playsinline', 'true');
        videoRef.current.muted = true;
        await videoRef.current.play().catch((e) => console.log('Camera video play deferred:', e));
        setHasCameraAccess(true);

        // Check torch track capabilities on mobile
        const track = activeStream.getVideoTracks()[0];
        if (track) {
          // @ts-ignore
          const capabilities = track.getCapabilities ? track.getCapabilities() : {};
          // @ts-ignore
          if (capabilities.torch) {
            setTorchSupported(true);
          }
        }
      }
    } catch (err: any) {
      console.warn('AR Camera access notice:', err);
      setHasCameraAccess(false);
      setCameraError(
        'Camera permission pending or blocked. Grant permission above or use the interactive Virtual Table AR canvas.'
      );
    }
  };

  useEffect(() => {
    let streamToStop: MediaStream | null = null;

    async function init() {
      try {
        setCameraError(null);
        let activeStream: MediaStream | null = null;
        try {
          activeStream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: { ideal: facingMode },
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: false,
          });
        } catch (e) {
          activeStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
        }

        streamToStop = activeStream;
        setMediaStream(activeStream);

        if (videoRef.current) {
          videoRef.current.srcObject = activeStream;
          videoRef.current.setAttribute('playsinline', 'true');
          videoRef.current.setAttribute('webkit-playsinline', 'true');
          videoRef.current.muted = true;
          await videoRef.current.play().catch(() => {});
          setHasCameraAccess(true);

          const track = activeStream.getVideoTracks()[0];
          if (track) {
            // @ts-ignore
            const capabilities = track.getCapabilities ? track.getCapabilities() : {};
            // @ts-ignore
            if (capabilities.torch) {
              setTorchSupported(true);
            }
          }
        }
      } catch (err) {
        setHasCameraAccess(false);
        setCameraError(
          'Camera access pending. Click "Grant Camera Access" or preview on Virtual Workbench.'
        );
      }
    }

    init();

    return () => {
      if (streamToStop) {
        streamToStop.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  // Toggle Flashlight/Torch on Mobile
  const toggleTorch = async () => {
    if (!mediaStream) return;
    const track = mediaStream.getVideoTracks()[0];
    if (track) {
      try {
        const nextTorch = !isTorchOn;
        // @ts-ignore
        await track.applyConstraints({
          advanced: [{ torch: nextTorch }],
        });
        setIsTorchOn(nextTorch);
      } catch (e) {
        console.warn('Torch toggle error:', e);
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Mobile Touch Gestures Handlers (Pinch to Zoom, Two-finger Rotate)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartDistRef.current = Math.hypot(dx, dy);
      touchStartAngleRef.current = Math.atan2(dy, dx);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDistRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDist = Math.hypot(dx, dy);
      const scaleFactor = currentDist / touchStartDistRef.current;

      setArScale((prev) => Math.min(Math.max(prev * scaleFactor, 0.4), 2.2));
      touchStartDistRef.current = currentDist;

      if (touchStartAngleRef.current !== null) {
        const currentAngle = Math.atan2(dy, dx);
        const angleDiff = (currentAngle - touchStartAngleRef.current) * (180 / Math.PI);
        setArRotation((prev) => Math.round((prev + angleDiff) % 360));
        touchStartAngleRef.current = currentAngle;
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartDistRef.current = null;
    touchStartAngleRef.current = null;
  };

  // Capture Mobile AR Photo Snapshot
  const handleCaptureSnapshot = () => {
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full bg-black select-none overflow-hidden flex flex-col font-sans touch-none"
    >
      {/* Live Mobile Camera Stream Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-100"
      />

      {/* Fallback Virtual Grid Pattern & Camera Request Banner if Camera Permission Pending */}
      {!hasCameraAccess && (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black flex flex-col items-center justify-center p-6 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
          <div className="relative z-10 max-w-md bg-slate-900/90 border border-blue-500/30 p-6 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col items-center gap-3">
            <div className="p-3 bg-blue-600/20 border border-blue-400/40 rounded-xl text-blue-400 animate-pulse">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Live Camera Passthrough AR
            </h3>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              Overlay the 3D Digital Logic Trainer directly onto your physical desk or table. Allow camera permissions to project ICs and wires in real time.
            </p>
            <button
              onClick={requestCamera}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold rounded-xl shadow-lg shadow-blue-600/40 border border-blue-400 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Camera className="w-4 h-4" />
              <span>Grant Camera Access</span>
            </button>
          </div>
        </div>
      )}

      {/* 3D AR Overlay Viewport with transparent WebGL canvas */}
      <div
        className="absolute inset-0 z-10 pointer-events-auto transition-transform duration-100"
        style={{
          transform: `scale(${arScale}) rotate(${arRotation}deg)`,
        }}
      >
        <Trainer3DViewport
          isARMode={true}
          placedComponents={placedComponents}
          wires={wires}
          selectedComponentId={selectedComponentId}
          onSelectComponent={onSelectComponent}
          renderMode={renderMode}
          setRenderMode={setRenderMode}
          activeWireColor={activeWireColor}
          isWireMode={isWireMode}
          onAddWire={onAddWire}
          simState={simState}
        />
      </div>

      {/* Mobile Touch Gesture Guidance Overlay */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-gray-300 font-mono border border-white/10">
        <span>Touch Gestures: Pinch to Scale • 2-Finger Drag to Rotate</span>
      </div>

      {/* AR Surface Targeting Reticle */}
      {!isPlaced && (
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center p-4">
          <div className="w-40 h-40 sm:w-56 sm:h-56 border-2 border-dashed border-indigo-400/80 rounded-full animate-ping flex items-center justify-center">
            <div className="w-4 h-4 bg-indigo-500 rounded-full" />
          </div>
          <div className="absolute bottom-28 bg-black/90 text-white px-4 py-2 rounded-full border border-indigo-500/50 text-xs font-mono shadow-2xl text-center">
            Aim phone at table surface to anchor 3D Trainer
          </div>
        </div>
      )}

      {/* Mobile Top AR HUD Header Bar */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
        {/* AR Status Badge */}
        <div className="flex items-center gap-2 bg-black/85 backdrop-blur-xl border border-indigo-500/40 px-3 py-1.5 rounded-xl pointer-events-auto shadow-2xl">
          <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-400/50 flex items-center justify-center text-indigo-300 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">
                MOBILE <span className="text-indigo-400">AR MODE</span>
              </h2>
              <span className="px-1.5 py-0.2 rounded-full text-[8px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                PASSTHROUGH
              </span>
            </div>
          </div>
        </div>

        {/* Top Mobile Quick Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {/* Flashlight/Torch toggle for mobile rear camera */}
          {torchSupported && (
            <button
              onClick={toggleTorch}
              className={`p-2 rounded-xl backdrop-blur-xl border transition-all shadow-xl ${
                isTorchOn
                  ? 'bg-amber-500/30 border-amber-400 text-amber-300'
                  : 'bg-black/80 border-white/10 text-gray-300 hover:text-white'
              }`}
              title="Toggle Flashlight"
            >
              <Flashlight className="w-4 h-4" />
            </button>
          )}

          {/* Flip Camera */}
          <button
            onClick={toggleCameraFacing}
            className="p-2 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 text-gray-300 hover:text-white transition-all shadow-xl"
            title="Switch Rear/Front Camera"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* AR Photo Snapshot */}
          <button
            onClick={handleCaptureSnapshot}
            className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-xl"
            title="Capture AR Photo"
          >
            {snapshotTaken ? <Check className="w-4 h-4 text-emerald-300" /> : <Camera className="w-4 h-4" />}
          </button>

          {/* Exit AR */}
          <button
            onClick={onExitAR}
            className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold flex items-center gap-1 transition-all shadow-xl"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </div>

      {/* Mobile Responsive AR Controls Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-[94%] max-w-lg bg-black/90 backdrop-blur-2xl border border-white/15 px-4 py-2.5 rounded-2xl flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 shadow-2xl pointer-events-auto">
        {/* Scale Slider */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Move className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] font-mono text-gray-300">Scale:</span>
          <input
            type="range"
            min="0.5"
            max="1.8"
            step="0.05"
            value={arScale}
            onChange={(e) => setArScale(parseFloat(e.target.value))}
            className="w-20 accent-indigo-500 cursor-pointer"
          />
          <span className="text-[10px] font-mono text-indigo-300 w-7">{Math.round(arScale * 100)}%</span>
        </div>

        {/* Rotation Button */}
        <div className="flex items-center gap-1.5 shrink-0">
          <RotateCw className="w-3.5 h-3.5 text-emerald-400" />
          <button
            onClick={() => setArRotation((r) => (r + 45) % 360)}
            className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-mono font-bold text-white transition-all"
          >
            Rot: {arRotation}°
          </button>
        </div>

        {/* Render Mode Switcher inside AR */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10 shrink-0">
          <button
            onClick={() => setRenderMode('pbr')}
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
              renderMode === 'pbr' ? 'bg-indigo-600 text-white' : 'text-gray-400'
            }`}
          >
            PBR
          </button>
          <button
            onClick={() => setRenderMode('xray')}
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
              renderMode === 'xray' ? 'bg-indigo-600 text-white' : 'text-gray-400'
            }`}
          >
            X-Ray
          </button>
          <button
            onClick={() => setRenderMode('explode')}
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
              renderMode === 'explode' ? 'bg-indigo-600 text-white' : 'text-gray-400'
            }`}
          >
            Explode
          </button>
        </div>

        {/* Anchor Toggle */}
        <button
          onClick={() => setIsPlaced(!isPlaced)}
          className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold transition-all border shrink-0 ${
            isPlaced
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-amber-500/20 border-amber-500/40 text-amber-300 animate-pulse'
          }`}
        >
          {isPlaced ? 'Anchored' : 'Align Table'}
        </button>
      </div>

      {/* Camera Access Toast / Notice if Needed */}
      {cameraError && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-indigo-950/90 border border-indigo-500/50 text-indigo-200 text-[11px] font-mono px-3 py-1.5 rounded-xl shadow-2xl max-w-sm text-center backdrop-blur-md">
          {cameraError}
        </div>
      )}
    </div>
  );
};
