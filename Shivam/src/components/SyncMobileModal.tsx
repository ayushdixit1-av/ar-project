import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, QrCode, Smartphone, Sparkles } from 'lucide-react';

interface SyncMobileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SyncMobileModal: React.FC<SyncMobileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const currentUrl = window.location.href;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 selection:bg-blue-500 selection:text-white">
      <div className="bg-[#0a0a0d] border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-5 text-center shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto">
          <Smartphone className="w-6 h-6 animate-pulse" />
        </div>

        <div>
          <h2 className="text-base font-bold text-white tracking-wide font-mono">
            WebXR Mobile AR Sync
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Scan QR code with your Android or iOS device to inspect the 3D Electronics Trainer Kit in Augmented Reality.
          </p>
        </div>

        {/* QR Code */}
        <div className="p-4 bg-white rounded-xl inline-block border border-blue-500/30 shadow-2xl">
          <QRCodeSVG value={currentUrl} size={180} level="H" />
        </div>

        <div className="text-[11px] font-mono text-gray-500 break-all bg-[#111] p-2.5 rounded-lg border border-white/5">
          {currentUrl}
        </div>
      </div>
    </div>
  );
};
