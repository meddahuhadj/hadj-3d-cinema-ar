import React, { useState } from 'react';
import { 
  Download, 
  X, 
  Box, 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  ShoppingCart, 
  MessageCircle, 
  Mail,
  Video,
  Film,
  Play
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Model3DData } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelData: Model3DData;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, modelData }) => {
  const [activeTab, setActiveTab] = useState<'3d' | 'ecommerce' | 'video' | 'share'>('3d');
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(6);
  const [videoRatio, setVideoRatio] = useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [renderingVideo, setRenderingVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  const { t } = useLanguage();

  if (!isOpen) return null;

  const modelGlbUrl = modelData.modelUrl || `https://photo2cine3d.app/models/${modelData.id}.glb`;
  const modelUsdzUrl = `https://photo2cine3d.app/models/${modelData.id}.usdz`;
  const arShareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/#ar-view?id=${modelData.id.replace('cine-', '')}`
    : `https://photo2cine3d.app/ar/${modelData.id.replace('cine-', '')}`;

  const formats = [
    { format: 'GLB', desc: 'Standard binaire Web3D & WebAR (Android / Chrome)', badge: t('exportRecommended'), size: `${modelData.optimizedSizeMB} MB` },
    { format: 'USDZ', desc: 'Format natif Apple iOS AR QuickLook (iPhone / iPad / Vision Pro)', badge: t('exportAppleAR'), size: `${(modelData.optimizedSizeMB * 1.1).toFixed(1)} MB` },
    { format: 'gLTF', desc: 'Format JSON découplé avec textures PBR séparées', badge: t('exportWeb'), size: `${(modelData.optimizedSizeMB * 1.2).toFixed(1)} MB` },
    { format: 'OBJ + MTL', desc: 'Maillage 3D universel avec cartes de matériaux MTL', badge: t('exportCAD'), size: `${(modelData.optimizedSizeMB * 2.4).toFixed(1)} MB` },
    { format: 'FBX', desc: 'Format Autodesk avec rig, squelette et animations', badge: t('exportBlender'), size: `${(modelData.optimizedSizeMB * 3.1).toFixed(1)} MB` },
    { format: 'STL', desc: 'Géométrie solide pour impression 3D physique', badge: t('export3DPrint'), size: `${(modelData.optimizedSizeMB * 1.8).toFixed(1)} MB` },
  ];

  const ecommerceSnippets = [
    {
      platform: 'Shopify (Liquid Snippet)',
      code: `<!-- PHOTO2CINE3D Shopify WebAR Viewer -->
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
<model-viewer
  src="${modelGlbUrl}"
  ios-src="${modelUsdzUrl}"
  alt="{{ product.title | escape }}"
  ar
  ar-modes="webxr scene-viewer quick-look"
  camera-controls
  auto-rotate
  shadow-intensity="1.5"
  style="width: 100%; height: 500px; background-color: #0a0908; border-radius: 16px;">
  <button slot="ar-button" style="background: linear-gradient(135deg, #d4af37, #a8842c); color: #141008; border: none; border-radius: 12px; padding: 12px 24px; font-weight: bold; position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); cursor: pointer;">
    📱 Voir en Réalité Augmentée dans votre pièce
  </button>
</model-viewer>`
    },
    {
      platform: 'WooCommerce / WordPress (HTML5 / Elementor)',
      code: `<div class="photo2cine3d-webar-container" style="position: relative; width: 100%; height: 480px; border-radius: 16px; overflow: hidden;">
  <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
  <model-viewer src="${modelGlbUrl}" ios-src="${modelUsdzUrl}" ar ar-modes="webxr scene-viewer quick-look" camera-controls auto-rotate style="width: 100%; height: 100%;">
  </model-viewer>
</div>`
    },
    {
      platform: 'Iframe Universel (PrestaShop / Webflow / Wix)',
      code: `<iframe 
  src="${arShareUrl}" 
  width="100%" 
  height="520" 
  frameborder="0" 
  allow="camera; accelerometer; vr; xr-spatial-tracking" 
  style="border-radius: 20px; border: 1px solid rgba(212, 175, 55, 0.3);">
</iframe>`
    }
  ];

  const handleDownload = (fmt: string) => {
    setDownloadingFormat(fmt);
    setTimeout(() => {
      const blob = new Blob([`PHOTO2CINE3D Export ${fmt} for ${modelData.title}`], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${modelData.title.replace(/\s+/g, '_')}.${fmt.toLowerCase().split(' ')[0]}`;
      a.click();
      setDownloadingFormat(null);
    }, 800);
  };

  const handleGenerateVideo = () => {
    setRenderingVideo(true);
    setVideoProgress(10);
    
    const interval = setInterval(() => {
      setVideoProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setRenderingVideo(false);
            setVideoProgress(100);
            // Simulate MP4 trigger
            const blob = new Blob(['PHOTO2CINE3D_MP4_60FPS_ROTATION_VIDEO'], { type: 'video/mp4' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${modelData.title.replace(/\s+/g, '_')}_360_Cinema.mp4`;
            a.click();
          }, 600);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`Découvrez le modèle 3D de ${modelData.title} en Réalité Augmentée WebAR : ${arShareUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Modèle 3D WebAR : ${modelData.title}`);
    const body = encodeURIComponent(`Bonjour,\n\nVoici le lien pour visualiser le modèle 3D en Réalité Augmentée dans votre espace :\n${arShareUrl}\n\nCréé avec PHOTO2CINE3D.`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel-glow rounded-3xl max-w-2xl w-full p-6 border border-gold-400/40 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold-950 text-gold-300 border border-gold-800">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-white text-lg">Hub d'Export & Intégration</h3>
              <p className="text-xs text-slate-400">{modelData.title} • {modelData.polygonCount.toLocaleString()} polygones</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveTab('3d')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === '3d' ? 'bg-gold-400 text-[#141008] shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Fichiers 3D</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'video' ? 'bg-gold-400 text-[#141008] shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Vidéo MP4</span>
          </button>

          <button
            onClick={() => setActiveTab('ecommerce')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ecommerce' ? 'bg-gold-400 text-[#141008] shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>E-Commerce</span>
          </button>

          <button
            onClick={() => setActiveTab('share')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'share' ? 'bg-gold-400 text-[#141008] shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Partage & QR</span>
          </button>
        </div>

        {/* Tab 1: 3D Formats */}
        {activeTab === '3d' && (
          <div className="space-y-3">
            {formats.map((f) => (
              <div
                key={f.format}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-gold-400/40 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-semibold text-white text-base">{f.format}</span>
                    <span className="px-2 py-0.5 rounded bg-gold-950 text-gold-300 text-[10px] font-mono-code font-bold border border-gold-800">
                      {f.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{f.desc}</p>
                  <span className="text-[10px] font-mono-code text-slate-500">{f.size}</span>
                </div>

                <button
                  onClick={() => handleDownload(f.format)}
                  disabled={downloadingFormat === f.format}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gold-400 hover:bg-gold-300 text-[#141008] shadow-md transition-all flex-shrink-0"
                >
                  {downloadingFormat === f.format ? (
                    <span>{t('exportGenerating')}</span>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>{t('downloadBtn')}</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Video MP4 Export */}
        {activeTab === 'video' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gold-950/40 border border-gold-800/50 space-y-2">
              <div className="flex items-center gap-2 text-gold-200 font-bold text-xs">
                <Film className="w-4 h-4" />
                <span>Générateur Vidéo Cinématique 360° (TikTok / Reels / Shorts)</span>
              </div>
              <p className="text-xs text-slate-300">
                Générez une animation vidéo fluide en 60 FPS avec éclairage studio et fond transparent ou neutre pour vos campagnes publicitaires.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-medium">Format d'affichage</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['9:16', '1:1', '16:9'] as const).map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setVideoRatio(ratio)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                        videoRatio === ratio
                          ? 'bg-gold-400 text-[#141008] border-gold-300'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-medium">Durée de la boucle</label>
                <div className="grid grid-cols-3 gap-2">
                  {[4, 6, 10].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => setVideoDuration(sec)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                        videoDuration === sec
                          ? 'bg-gold-400 text-[#141008] border-gold-300'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
              {renderingVideo ? (
                <div className="space-y-2 py-2">
                  <div className="flex items-center justify-between text-xs font-mono-code text-gold-300">
                    <span>Enregistrement du flux Three.js (60 FPS)...</span>
                    <span>{videoProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div className="bg-gradient-to-r from-gold-400 to-gold-600 h-full transition-all duration-300" style={{ width: `${videoProgress}%` }}></div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleGenerateVideo}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-600 text-[#141008] font-semibold text-sm shadow-xl shadow-gold-400/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-[#141008]" />
                  <span>Exporter la Vidéo MP4 (60 FPS HD)</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: E-Commerce Snippets */}
        {activeTab === 'ecommerce' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-gold-950/40 border border-gold-800/60 text-xs text-gold-200">
              <p className="font-bold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4 text-gold-300" /> Intégration E-Commerce Instantanée
              </p>
              <p className="text-[11px] text-slate-300">
                Copiez le snippet correspondant à votre CMS pour ajouter automatiquement le visualiseur 3D et le bouton Réalité Augmentée sur vos fiches produits.
              </p>
            </div>

            <div className="space-y-3">
              {ecommerceSnippets.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white font-mono-code">{item.platform}</span>
                    <button
                      onClick={() => copyToClipboard(item.code, `snippet-${idx}`)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-gold-300 border border-slate-700"
                    >
                      {copiedSnippet === `snippet-${idx}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copier le Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3 rounded-xl bg-slate-900/90 text-[11px] font-mono-code text-slate-300 overflow-x-auto border border-slate-800/80 max-h-32">
                    {item.code}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Share & QR */}
        {activeTab === 'share' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="p-3 bg-white rounded-2xl shadow-xl">
                <QRCodeSVG value={arShareUrl} size={140} level="H" />
              </div>
              <div className="space-y-3 flex-1">
                <h4 className="font-heading font-semibold text-white text-lg">QR Code WebAR Instantané</h4>
                <p className="text-xs text-slate-400">
                  Scannez avec un appareil photo iOS ou Android pour lancer la Réalité Augmentée dans votre pièce sans aucune application.
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={arShareUrl}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono-code text-gold-200"
                  />
                  <button
                    onClick={() => copyToClipboard(arShareUrl, 'share-url')}
                    className="p-2 rounded-xl bg-gold-400 text-[#141008] font-bold flex-shrink-0"
                    title="Copier le lien"
                  >
                    {copiedSnippet === 'share-url' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Social Share Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={shareViaWhatsApp}
                className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Partager sur WhatsApp</span>
              </button>

              <button
                onClick={shareViaEmail}
                className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-gold-500 hover:bg-gold-400 text-[#141008] font-bold text-xs shadow-lg transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Envoyer par Email</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
