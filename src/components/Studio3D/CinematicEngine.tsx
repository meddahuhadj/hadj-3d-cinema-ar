import React from 'react';
import { Film, Sun, Sparkles, Flame, Moon, Check } from 'lucide-react';
import { LightingSettings } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

interface CinematicEngineProps {
  lighting: LightingSettings;
  setLighting: React.Dispatch<React.SetStateAction<LightingSettings>>;
}

export const CinematicEngine: React.FC<CinematicEngineProps> = ({ lighting, setLighting }) => {
  const { t } = useLanguage();

  const lightingPresets = [
    { id: 'Hollywood', label: t('lightHollywood'), key: '#ffffff', fill: '#94a3b8', rim: '#f59e0b', hdri: 'Studio Neutral' },
    { id: 'Cyberpunk', label: t('lightCyberpunk'), key: '#06b6d4', fill: '#ec4899', rim: '#38bdf8', hdri: 'Neon City Night' },
    { id: 'Luxury', label: t('lightLuxury'), key: '#fbbf24', fill: '#f59e0b', rim: '#d97706', hdri: 'Golden Hour' },
    { id: 'Dark Cinema', label: t('lightDarkCinema'), key: '#38bdf8', fill: '#1e293b', rim: '#8b5cf6', hdri: 'Moody Dark' },
    { id: 'Sci-Fi', label: t('lightSciFi'), key: '#3b82f6', fill: '#6366f1', rim: '#60a5fa', hdri: 'Hangar Blue' },
    { id: 'Golden Hour', label: t('lightGoldenHour'), key: '#f97316', fill: '#fbbf24', rim: '#ea580c', hdri: 'Outdoor Sunset' },
    { id: 'Studio', label: t('lightStudio'), key: '#ffffff', fill: '#cbd5e1', rim: '#ffffff', hdri: 'Soft Studio' },
    { id: 'Documentary', label: t('lightDocumentary'), key: '#fef08a', fill: '#94a3b8', rim: '#e2e8f0', hdri: 'Natural Daylight' },
  ];

  const applyLightingPreset = (presetObj: typeof lightingPresets[0]) => {
    setLighting(prev => ({
      ...prev,
      preset: presetObj.id,
      keyLightColor: presetObj.key,
      fillLightColor: presetObj.fill,
      rimLightColor: presetObj.rim,
      hdriPreset: presetObj.hdri
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="font-heading font-bold text-white text-sm flex items-center gap-2">
          <Film className="w-4 h-4 text-fuchsia-400" /> {t('cinematicEngineTitle')}
        </h3>
        <span className="text-[10px] font-mono-code text-fuchsia-400 bg-fuchsia-950 px-2 py-0.5 rounded border border-fuchsia-800">
          {t('studioLightingBadge')}
        </span>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">{t('presetLighting')}</label>
        <div className="grid grid-cols-2 gap-2">
          {lightingPresets.map(p => (
            <button
              key={p.id}
              onClick={() => applyLightingPreset(p)}
              className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                lighting.preset === p.id ? 'bg-fuchsia-950/60 border-fuchsia-400 text-fuchsia-300' : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: p.key }} />
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: p.fill }} />
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: p.rim }} />
                </div>
                <span className="text-xs font-semibold truncate">{p.label}</span>
              </div>
              {lighting.preset === p.id && <Check className="w-3.5 h-3.5 text-fuchsia-400" />}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-slate-800">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-amber-400" /> {t('keyLightLabel')}</span>
            <span className="font-mono-code text-fuchsia-400">{lighting.keyLightIntensity.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0"
            max="6"
            step="0.1"
            value={lighting.keyLightIntensity}
            onChange={e => setLighting(prev => ({ ...prev, keyLightIntensity: parseFloat(e.target.value) }))}
            className="w-full h-1.5 rounded-lg bg-slate-800 appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-cyan-400" /> {t('fillLightLabel')}</span>
            <span className="font-mono-code text-fuchsia-400">{lighting.fillLightIntensity.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={lighting.fillLightIntensity}
            onChange={e => setLighting(prev => ({ ...prev, fillLightIntensity: parseFloat(e.target.value) }))}
            className="w-full h-1.5 rounded-lg bg-slate-800 appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-pink-400" /> {t('rimLightLabel')}</span>
            <span className="font-mono-code text-fuchsia-400">{lighting.rimLightIntensity.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0"
            max="6"
            step="0.1"
            value={lighting.rimLightIntensity}
            onChange={e => setLighting(prev => ({ ...prev, rimLightIntensity: parseFloat(e.target.value) }))}
            className="w-full h-1.5 rounded-lg bg-slate-800 appearance-none cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-300 flex items-center gap-2">
            <Moon className="w-3.5 h-3.5 text-indigo-400" /> {t('softShadowsToggle')}
          </span>
          <button
            onClick={() => setLighting(prev => ({ ...prev, shadows: !prev.shadows }))}
            className={`w-10 h-6 rounded-full p-1 transition-colors ${lighting.shadows ? 'bg-fuchsia-500' : 'bg-slate-800'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${lighting.shadows ? 'translate-x-4' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
