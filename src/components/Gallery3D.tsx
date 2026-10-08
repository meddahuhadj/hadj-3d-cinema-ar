import React from 'react';
import { Model3DData } from '../types';
import { Box, QrCode, Eye, Plus, Share2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface Gallery3DProps {
  models: Model3DData[];
  onSelectModel: (model: Model3DData) => void;
  onOpenAR: (model: Model3DData) => void;
  onStartUpload: () => void;
}

export const Gallery3D: React.FC<Gallery3DProps> = ({
  models,
  onSelectModel,
  onOpenAR,
  onStartUpload,
}) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono-code text-xs font-bold uppercase tracking-wider mb-1">
              <Box className="w-4 h-4" /> {t('galleryHeaderTag')}
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {t('galleryTitle')}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {t('gallerySubtitle')}
            </p>
          </div>

          <button
            onClick={onStartUpload}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t('newModelBtn')}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-mono-code">{t('modelsCreatedStat')}</span>
            <p className="text-3xl font-extrabold text-white font-mono-code">{models.length}</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-mono-code">{t('webarExpStat')}</span>
            <p className="text-3xl font-extrabold text-cyan-400 font-mono-code">{models.length * 12}</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-mono-code">{t('totalViewsStat')}</span>
            <p className="text-3xl font-extrabold text-fuchsia-400 font-mono-code">1,842</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-mono-code">{t('glbDownloadsStat')}</span>
            <p className="text-3xl font-extrabold text-emerald-400 font-mono-code">349</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div
            key={model.id}
            className="glass-card rounded-3xl overflow-hidden border border-slate-800 group hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-56 relative bg-slate-950 overflow-hidden">
                <img
                  src={model.thumbnail}
                  alt={model.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 text-[10px] font-mono-code text-cyan-300 font-bold border border-slate-700 uppercase">
                  {model.category}
                </span>

                <button
                  onClick={() => onOpenAR(model)}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 text-black text-xs font-bold shadow-lg"
                >
                  <QrCode className="w-3.5 h-3.5" /> WebAR
                </button>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-heading text-lg font-bold text-white group-hover:text-cyan-300">
                  {model.title}
                </h3>

                <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 border-t border-b border-slate-800 py-2">
                  <span>{model.photoCount} photos</span>
                  <span>{model.optimizedPolyCount.toLocaleString()} poly</span>
                  <span className="text-cyan-400 font-bold">{model.optimizedSizeMB} MB</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center gap-2">
              <button
                onClick={() => onSelectModel(model)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700 text-center flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" /> {t('modify3DBtn')}
              </button>

              <button
                onClick={() => onOpenAR(model)}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
