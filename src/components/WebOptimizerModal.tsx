import React, { useState } from 'react';
import { Cpu, X, Zap } from 'lucide-react';
import { Model3DData } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface WebOptimizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelData: Model3DData;
}

export const WebOptimizerModal: React.FC<WebOptimizerModalProps> = ({ isOpen, onClose }) => {
  const [lodLevel, setLodLevel] = useState<'high' | 'medium' | 'low'>('medium');
  const [optimized, setOptimized] = useState(false);
  const { t } = useLanguage();

  if (!isOpen) return null;

  const runOptimization = () => {
    setOptimized(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel-glow rounded-3xl max-w-lg w-full p-6 border border-gold-400/40 shadow-2xl space-y-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold-950 text-gold-300 border border-gold-800">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-white text-lg">{t('webOptimizerTitle')}</h3>
              <p className="text-xs text-slate-400">{t('webOptimizerSubtitle')}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Comparison Card */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="space-y-1">
            <span className="text-[11px] font-mono-code text-slate-500 uppercase">{t('originalModelLabel')}</span>
            <p className="text-xl font-mono-code font-bold text-slate-300">12.4 M <span className="text-xs text-slate-500">poly</span></p>
            <p className="text-xs font-mono-code text-slate-400">Texture: 4K (4096px)</p>
            <p className="text-xs font-mono-code text-rose-400 font-bold">Size: 86.4 MB</p>
          </div>

          <div className="space-y-1 border-l rtl:border-l-0 rtl:border-r border-slate-800 pl-4 rtl:pl-0 rtl:pr-4">
            <span className="text-[11px] font-mono-code text-gold-300 uppercase font-bold">{t('optimizedModelLabel')}</span>
            <p className="text-xl font-mono-code font-bold text-gold-200">145 K <span className="text-xs text-gold-400">poly</span></p>
            <p className="text-xs font-mono-code text-slate-400">Texture: 2K WebP</p>
            <p className="text-xs font-mono-code text-emerald-400 font-bold">Size: 7.2 MB (-92%)</p>
          </div>
        </div>

        {/* LOD Level Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">{t('lodLevelLabel')}</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setLodLevel('high')}
              className={`p-3 rounded-xl border text-xs font-mono-code transition-all ${
                lodLevel === 'high' ? 'bg-gold-950 text-gold-200 border-gold-300 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {t('lod0')}
            </button>
            <button
              onClick={() => setLodLevel('medium')}
              className={`p-3 rounded-xl border text-xs font-mono-code transition-all ${
                lodLevel === 'medium' ? 'bg-gold-950 text-gold-200 border-gold-300 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {t('lod1')}
            </button>
            <button
              onClick={() => setLodLevel('low')}
              className={`p-3 rounded-xl border text-xs font-mono-code transition-all ${
                lodLevel === 'low' ? 'bg-gold-950 text-gold-200 border-gold-300 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {t('lod2')}
            </button>
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={runOptimization}
          className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-gold-300 to-gold-500 text-[#141008] shadow-lg shadow-gold-400/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" />
          <span>{optimized ? t('optApplied') : t('applyOptBtn')}</span>
        </button>

      </div>
    </div>
  );
};
