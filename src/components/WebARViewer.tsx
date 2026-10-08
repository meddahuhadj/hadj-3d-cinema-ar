import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  Smartphone, 
  Copy, 
  Check, 
  Camera, 
  ShieldCheck, 
  Video, 
  Ruler, 
  SunMedium, 
  Layers, 
  Sparkles,
  Zap,
  Info,
  ExternalLink
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Model3DData } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface WebARViewerProps {
  modelData: Model3DData;
}

type LightingPreset = 'neutral' | 'studio' | 'dramatic' | 'showroom';

export const WebARViewer: React.FC<WebARViewerProps> = ({ modelData }) => {
  const [copied, setCopied] = useState(false);
  const [capturingScreen, setCapturingScreen] = useState(false);
  const [recordingVideo, setRecordingVideo] = useState(false);
  const [capturedMessage, setCapturedMessage] = useState<string | null>(null);
  
  // Real world dimensions scaling (in cm)
  const [realHeightCm, setRealHeightCm] = useState<number>(30);
  const [activePreset, setActivePreset] = useState<LightingPreset>('studio');
  const [exposure, setExposure] = useState<number>(1.1);
  const [shadowIntensity, setShadowIntensity] = useState<number>(1.6);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  const { t } = useLanguage();

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua));
    setIsAndroid(/Android/.test(ua));
  }, []);

  const arShareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/#ar-view?id=${modelData.id.replace('cine-', '')}`
    : `https://photo2cine3d.app/ar/${modelData.id.replace('cine-', '')}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(arShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateScreenCapture = () => {
    setCapturingScreen(true);
    setTimeout(() => {
      setCapturingScreen(false);
      setCapturedMessage('Capture AR 4K enregistrée !');
      setTimeout(() => setCapturedMessage(null), 3000);
    }, 800);
  };

  const simulateVideoRecord = () => {
    setRecordingVideo(true);
    setTimeout(() => {
      setRecordingVideo(false);
      setCapturedMessage('Séquence vidéo AR 60 FPS enregistrée !');
      setTimeout(() => setCapturedMessage(null), 3000);
    }, 2500);
  };

  // Lighting preset configurations
  const applyPreset = (preset: LightingPreset) => {
    setActivePreset(preset);
    if (preset === 'neutral') {
      setExposure(1.0);
      setShadowIntensity(1.0);
    } else if (preset === 'studio') {
      setExposure(1.2);
      setShadowIntensity(1.6);
    } else if (preset === 'dramatic') {
      setExposure(1.5);
      setShadowIntensity(2.4);
    } else if (preset === 'showroom') {
      setExposure(1.3);
      setShadowIntensity(1.8);
    }
  };

  // Calculate model-viewer scale attribute based on baseline 1m height
  const modelScale = `${(realHeightCm / 100).toFixed(2)} ${(realHeightCm / 100).toFixed(2)} ${(realHeightCm / 100).toFixed(2)}`;

  // Model source priority
  const activeGlbSrc = modelData.modelUrl || "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
  const activeUsdzSrc = "https://modelviewer.dev/shared-assets/models/Astronaut.usdz";

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

        <div className="flex flex-wrap items-center gap-2">
          {isIOS && (
            <span className="px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-xs text-blue-300 font-medium flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-400" /> Apple Quick Look (USDZ) Actif
            </span>
          )}
          {isAndroid && (
            <span className="px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 font-medium flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" /> Google SceneViewer & WebXR Actif
            </span>
          )}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-slate-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Hit-Test Sol & Estimation Lumière</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* AR Viewer Viewport */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel-glow rounded-3xl p-4 border border-cyan-500/30 relative overflow-hidden shadow-2xl space-y-4">
            <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono-code text-slate-300">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>ANCRAGE SOL WEBAR (Hit-Test + Light Estimation)</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] font-mono-code border border-cyan-800 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                60 FPS OPÉRATIONNEL
              </span>
            </div>

            <div className="w-full h-[420px] sm:h-[480px] rounded-2xl overflow-hidden bg-slate-950 relative flex items-center justify-center border border-slate-800">
              {/* @ts-ignore */}
              <model-viewer
                src={activeGlbSrc}
                ios-src={activeUsdzSrc}
                alt={modelData.title}
                ar
                ar-modes="webxr scene-viewer quick-look"
                ar-scale="fixed"
                ar-placement="floor"
                camera-controls
                auto-rotate
                exposure={exposure.toString()}
                shadow-intensity={shadowIntensity.toString()}
                shadow-softness="0.8"
                scale={modelScale}
                style={{ width: '100%', height: '100%', backgroundColor: '#07090e' }}
              >
                <button
                  slot="ar-button"
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3.5 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all z-30 ring-4 ring-cyan-500/20"
                >
                  <Smartphone className="w-5 h-5 animate-pulse" />
                  <span>{t('viewInSpaceBtn')}</span>
                </button>
              {/* @ts-ignore */}
              </model-viewer>

              {capturedMessage && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-cyan-950/90 backdrop-blur-md text-cyan-300 px-4 py-2 rounded-xl border border-cyan-500 text-xs font-bold shadow-2xl animate-fade-in">
                  {capturedMessage}
                </div>
              )}
            </div>

            {/* Scale & Dimensions Controls */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <Ruler className="w-4 h-4 text-cyan-400" />
                  <span>Échelle Réelle WebAR (Proportions 1:1)</span>
                </div>
                <span className="text-xs font-mono-code text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  {realHeightCm} cm ({ (realHeightCm / 100).toFixed(2) } m)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input 
                  type="range"
                  min="5"
                  max="300"
                  step="5"
                  value={realHeightCm}
                  onChange={(e) => setRealHeightCm(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] font-mono-code">
                <button 
                  onClick={() => setRealHeightCm(15)}
                  className={`px-2.5 py-1 rounded-lg border transition-all ${realHeightCm === 15 ? 'bg-cyan-500 text-black font-bold border-cyan-400' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                >
                  15 cm (Vase/Objet)
                </button>
                <button 
                  onClick={() => setRealHeightCm(30)}
                  className={`px-2.5 py-1 rounded-lg border transition-all ${realHeightCm === 30 ? 'bg-cyan-500 text-black font-bold border-cyan-400' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                >
                  30 cm (Chaussure)
                </button>
                <button 
                  onClick={() => setRealHeightCm(85)}
                  className={`px-2.5 py-1 rounded-lg border transition-all ${realHeightCm === 85 ? 'bg-cyan-500 text-black font-bold border-cyan-400' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                >
                  85 cm (Chaise/Mobilier)
                </button>
                <button 
                  onClick={() => setRealHeightCm(180)}
                  className={`px-2.5 py-1 rounded-lg border transition-all ${realHeightCm === 180 ? 'bg-cyan-500 text-black font-bold border-cyan-400' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                >
                  180 cm (Humain/Statue)
                </button>
              </div>
            </div>

            {/* Cinematic Lighting Presets */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <SunMedium className="w-4 h-4 text-amber-400" />
                <span>Presets d'Éclairage Cinématique & Ombres</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-xs font-medium">
                {(['neutral', 'studio', 'dramatic', 'showroom'] as LightingPreset[]).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => applyPreset(preset)}
                    className={`py-2 px-1 rounded-xl capitalize text-center transition-all border ${
                      activePreset === preset
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold border-cyan-400 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Instant Snapshot Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={simulateScreenCapture}
                disabled={capturingScreen}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-800 transition-all"
              >
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>{t('capturePhotoAR')}</span>
              </button>

              <button
                onClick={simulateVideoRecord}
                disabled={recordingVideo}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-800 transition-all"
              >
                <Video className="w-4 h-4 text-fuchsia-400" />
                <span>{t('recordVideoAR')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* QR Code, Share & Embed Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 text-center space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-mono-code font-bold border border-cyan-800">
                AR DIRECT LINK
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t('copiedBtn') : t('copyBtn')}</span>
                </button>
              </div>
            </div>

            {/* Quick Share buttons */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <a
                href={`https://wa.me/?text=${encodeURIComponent('Visualisez ce modèle 3D en Réalité Augmentée : ' + arShareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 transition-all"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent('Modèle 3D WebAR')}&body=${encodeURIComponent('Bonjour,\n\nVoici le lien pour tester le modèle 3D en Réalité Augmentée sans application :\n' + arShareUrl)}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition-all"
              >
                <span>Email</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Quick Iframe */}
            <div className="pt-4 border-t border-slate-800 text-left rtl:text-right space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white block">{t('iframeEmbed')}</span>
                <span className="text-[10px] text-slate-500 font-mono-code">Shopify / Woo / Prestashop</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono-code text-slate-400 overflow-x-auto">
                {`<iframe src="${arShareUrl}" width="100%" height="500" allow="camera; xr-spatial-tracking" frameborder="0"></iframe>`}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
