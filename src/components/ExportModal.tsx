import React, { useState } from 'react';
import { Download, X, CheckCircle2, Box, Sparkles } from 'lucide-react';
import { Model3DData } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelData: Model3DData;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, modelData }) => {
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const { t } = useLanguage();

  if (!isOpen) return null;

  const formats = [
    { format: 'GLB', desc: 'Standard binary Web3D & WebAR format', badge: t('exportRecommended'), size: `${modelData.optimizedSizeMB} MB` },
    { format: 'USDZ', desc: 'Apple iOS AR QuickLook native format (iPhone / iPad / Vision Pro)', badge: t('exportAppleAR'), size: `${(modelData.optimizedSizeMB * 1.1).toFixed(1)} MB` },
    { format: 'gLTF', desc: 'Decoupled JSON format with separate PBR textures', badge: t('exportWeb'), size: `${(modelData.optimizedSizeMB * 1.2).toFixed(1)} MB` },
    { format: 'OBJ + MTL', desc: 'Universal 3D mesh with MTL material maps', badge: t('exportCAD'), size: `${(modelData.optimizedSizeMB * 2.4).toFixed(1)} MB` },
    { format: 'FBX', desc: 'Autodesk format with rig, skeleton and animations', badge: t('exportBlender'), size: `${(modelData.optimizedSizeMB * 3.1).toFixed(1)} MB` },
    { format: 'STL', desc: 'Solid geometry for physical 3D printing', badge: t('export3DPrint'), size: `${(modelData.optimizedSizeMB * 1.8).toFixed(1)} MB` },
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
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel-glow rounded-3xl max-w-lg w-full p-6 border border-cyan-500/40 shadow-2xl space-y-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-white text-lg">{t('exportModalTitle')}</h3>
              <p className="text-xs text-slate-400">{t('exportModalSubtitle')}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format List */}
        <div className="space-y-3">
          {formats.map((f) => (
            <div
              key={f.format}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-cyan-500/40 transition-all"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-white text-sm">{f.format}</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] font-mono-code font-bold border border-cyan-800">
                    {f.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{f.desc}</p>
                <span className="text-[10px] font-mono-code text-slate-500">{f.size}</span>
              </div>

              <button
                onClick={() => handleDownload(f.format)}
                disabled={downloadingFormat === f.format}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-black shadow-md transition-all flex-shrink-0"
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

      </div>
    </div>
  );
};
