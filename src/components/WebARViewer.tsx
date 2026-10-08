import React, { useState } from 'react';
import { QrCode, Smartphone, Copy, Check, Camera, ShieldCheck, Video } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Model3DData } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface WebARViewerProps {
  modelData: Model3DData;
}

export const WebARViewer: React.FC<WebARViewerProps> = ({ modelData }) => {
  const [copied, setCopied] = useState(false);
  const [capturingScreen, setCapturingScreen] = useState(false);
  const [recordingVideo, setRecordingVideo] = useState(false);
  const [capturedMessage, setCapturedMessage] = useState<string | null>(null);
  const { t } = useLanguage();

  const arShareUrl = `https://photo2cine3d.app/ar/${modelData.id.replace('cine-', '')}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(arShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateScreenCapture = () => {
    setCapturingScreen(true);
    setTimeout(() => {
      setCapturingScreen(false);
      setCapturedMessage('AR Screenshot saved! (4K PNG)');
      setTimeout(() => setCapturedMessage(null), 3000);
    }, 800);
  };

  const simulateVideoRecord = () => {
    setRecordingVideo(true);
    setTimeout(() => {
      setRecordingVideo(false);
      setCapturedMessage('AR Video sequence saved! (MP4 60 FPS HD)');
      setTimeout(() => setCapturedMessage(null), 3000);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono-code text-xs font-bold uppercase tracking-wider mb-1">
            <QrCode className="w-4 h-4" /> {t('webarHeaderTag')}
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            {t('webarTitle')}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {t('webarSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950 border border-emerald-800 text-xs text-emerald-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>WebXR & Apple QuickLook Ready</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel-glow rounded-3xl p-4 border border-cyan-500/30 relative overflow-hidden shadow-2xl space-y-4">
            <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono-code text-slate-300">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>AIR-PLACEMENT (Surface Mapping)</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] font-mono-code border border-cyan-800">
                AUTO OCCLUSION ON
              </span>
            </div>

            <div className="w-full h-[420px] sm:h-[480px] rounded-2xl overflow-hidden bg-slate-950 relative flex items-center justify-center border border-slate-800">
              {/* @ts-ignore */}
              <model-viewer
                src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
                ios-src="https://modelviewer.dev/shared-assets/models/Astronaut.usdz"
                alt={modelData.title}
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                auto-rotate
                shadow-intensity="1.5"
                style={{ width: '100%', height: '100%', backgroundColor: '#07090e' }}
              >
                <button
                  slot="ar-button"
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 text-white shadow-xl hover:scale-105 transition-all z-30"
                >
                  <Smartphone className="w-5 h-5" />
                  <span>{t('viewInSpaceBtn')}</span>
                </button>
              {/* @ts-ignore */}
              </model-viewer>

              {capturedMessage && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-cyan-950 text-cyan-300 px-4 py-2 rounded-xl border border-cyan-500 text-xs font-bold shadow-2xl">
                  {capturedMessage}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={simulateScreenCapture}
                disabled={capturingScreen}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold"
              >
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>{t('capturePhotoAR')}</span>
              </button>

              <button
                onClick={simulateVideoRecord}
                disabled={recordingVideo}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold"
              >
                <Video className="w-4 h-4 text-fuchsia-400" />
                <span>{t('recordVideoAR')}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 text-center space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-mono-code font-bold border border-cyan-800">
                AR LINK
              </span>
              <h3 className="text-xl font-bold text-white mt-2">{t('scanToTest')}</h3>
              <p className="text-xs text-slate-400 mt-1">{t('scanInstructions')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white w-fit mx-auto shadow-2xl border-4 border-slate-900">
              <QRCodeSVG value={arShareUrl} size={180} />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-mono-code block text-left rtl:text-right">{t('instantARUrl')}</label>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
                <input
                  type="text"
                  readOnly
                  value={arShareUrl}
                  className="w-full bg-transparent text-xs font-mono-code text-cyan-300 outline-none px-2"
                />
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-black text-xs font-bold"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t('copiedBtn') : t('copyBtn')}</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-left rtl:text-right space-y-2">
              <span className="text-xs font-bold text-white block">{t('iframeEmbed')}</span>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono-code text-slate-400 overflow-x-auto">
                {`<iframe src="${arShareUrl}" width="100%" height="600" allow="ar"></iframe>`}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
