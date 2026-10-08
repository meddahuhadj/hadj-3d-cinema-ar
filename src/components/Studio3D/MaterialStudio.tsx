import React from 'react';
import { Sliders, Check, Eye } from 'lucide-react';
import { MaterialSettings } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

interface MaterialStudioProps {
  material: MaterialSettings;
  setMaterial: React.Dispatch<React.SetStateAction<MaterialSettings>>;
}

export const MaterialStudio: React.FC<MaterialStudioProps> = ({ material, setMaterial }) => {
  const { t } = useLanguage();

  const presets = [
    { id: 'Realistic', label: t('matRealistic'), metallic: 0.2, roughness: 0.3, color: '#d4af37' },
    { id: 'Cinematic', label: t('matCinematic'), metallic: 0.65, roughness: 0.2, color: '#e8c87a' },
    { id: 'Dark Cinema', label: t('matDarkCinema'), metallic: 0.85, roughness: 0.15, color: '#2e2819' },
    { id: 'Sci-Fi', label: t('matSciFi'), metallic: 0.9, roughness: 0.1, color: '#cf9b4a' },
    { id: 'Luxury', label: t('matLuxury'), metallic: 0.95, roughness: 0.1, color: '#fbbf24' },
    { id: 'Studio', label: t('matStudio'), metallic: 0.1, roughness: 0.7, color: '#8f8874' },
    { id: 'Cartoon', label: t('matCartoon'), metallic: 0.0, roughness: 0.9, color: '#e15241' },
    { id: 'Holographic', label: t('matHolographic'), metallic: 0.5, roughness: 0.05, color: '#f5e2a8' },
  ];

  const applyPreset = (presetObj: typeof presets[0]) => {
    setMaterial(prev => ({
      ...prev,
      preset: presetObj.id,
      metallic: presetObj.metallic,
      roughness: presetObj.roughness,
      colorTint: presetObj.color
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="font-heading font-semibold text-white text-base flex items-center gap-2">
          <Sliders className="w-4 h-4 text-gold-300" /> {t('materialStudioTitle')}
        </h3>
        <span className="text-[10px] font-mono-code text-gold-300 bg-gold-950 px-2 py-0.5 rounded border border-gold-800">
          {t('aiTextureBadge')}
        </span>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">{t('presetMaterials')}</label>
        <div className="grid grid-cols-2 gap-2">
          {presets.map(p => (
            <button
              key={p.id}
              onClick={() => applyPreset(p)}
              className={`p-2.5 rounded-xl border text-left rtl:text-right transition-all flex items-center justify-between ${
                material.preset === p.id ? 'bg-gold-950/60 border-gold-300 text-gold-200' : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: p.color }} />
                <span className="text-xs font-semibold">{p.label}</span>
              </div>
              {material.preset === p.id && <Check className="w-3.5 h-3.5 text-gold-300" />}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-slate-800">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-300">
            <span>{t('metallicSlider')}</span>
            <span className="font-mono-code text-gold-300">{Math.round(material.metallic * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={material.metallic}
            onChange={e => setMaterial(prev => ({ ...prev, metallic: parseFloat(e.target.value) }))}
            className="w-full h-1.5 rounded-lg bg-slate-800 appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-300">
            <span>{t('roughnessSlider')}</span>
            <span className="font-mono-code text-gold-300">{Math.round(material.roughness * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={material.roughness}
            onChange={e => setMaterial(prev => ({ ...prev, roughness: parseFloat(e.target.value) }))}
            className="w-full h-1.5 rounded-lg bg-slate-800 appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-300">
            <span>{t('normalMapSlider')}</span>
            <span className="font-mono-code text-gold-300">{material.normalMapIntensity.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={material.normalMapIntensity}
            onChange={e => setMaterial(prev => ({ ...prev, normalMapIntensity: parseFloat(e.target.value) }))}
            className="w-full h-1.5 rounded-lg bg-slate-800 appearance-none cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-300">{t('mainColorTint')}</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={material.colorTint || '#d4af37'}
              onChange={e => setMaterial(prev => ({ ...prev, colorTint: e.target.value }))}
              className="w-8 h-8 rounded-lg border border-slate-700 bg-slate-900 cursor-pointer p-0.5"
            />
            <span className="text-xs font-mono-code text-slate-400">{material.colorTint || '#d4af37'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-300 flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-gold-300" /> {t('wireframeToggle')}
          </span>
          <button
            onClick={() => setMaterial(prev => ({ ...prev, wireframe: !prev.wireframe }))}
            className={`w-10 h-6 rounded-full p-1 transition-colors ${material.wireframe ? 'bg-gold-400' : 'bg-slate-800'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${material.wireframe ? 'translate-x-4' : ''}`} />
          </button>
        </div>

      </div>
    </div>
  );
};
