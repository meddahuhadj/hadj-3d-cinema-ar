import React from 'react';
import { Camera, Video, Eye, Check } from 'lucide-react';
import { CameraSettings } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

interface CameraDirectorProps {
  camera: CameraSettings;
  setCamera: React.Dispatch<React.SetStateAction<CameraSettings>>;
}

export const CameraDirector: React.FC<CameraDirectorProps> = ({ camera, setCamera }) => {
  const { t } = useLanguage();

  const cameraMoves = [
    { id: 'orbit', label: t('moveOrbit'), desc: t('moveOrbitDesc') },
    { id: 'hero', label: t('moveHero'), desc: t('moveHeroDesc') },
    { id: 'product', label: t('moveProduct'), desc: t('moveProductDesc') },
    { id: 'dramatic', label: t('moveDramatic'), desc: t('moveDramaticDesc') },
    { id: 'showcase', label: t('moveShowcase'), desc: t('moveShowcaseDesc') },
    { id: 'none', label: t('moveManual'), desc: t('moveManualDesc') },
  ];

  const focalLengths = [
    { mm: 24, label: '24mm' },
    { mm: 35, label: '35mm' },
    { mm: 50, label: '50mm' },
    { mm: 85, label: '85mm' },
    { mm: 135, label: '135mm' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="font-heading font-semibold text-white text-base flex items-center gap-2">
          <Video className="w-4 h-4 text-gold-300" /> {t('cameraDirectorTitle')}
        </h3>
        <span className="text-[10px] font-mono-code text-gold-300 bg-gold-950 px-2 py-0.5 rounded border border-gold-800">
          {t('hollywoodCamBadge')}
        </span>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">{t('presetCameraMoves')}</label>
        <div className="space-y-2">
          {cameraMoves.map(m => (
            <button
              key={m.id}
              onClick={() => setCamera(prev => ({ ...prev, activePresetMove: m.id }))}
              className={`w-full p-2.5 rounded-xl border text-left rtl:text-right transition-all flex items-center justify-between ${
                camera.activePresetMove === m.id ? 'bg-gold-950/60 border-gold-300 text-gold-200' : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
            >
              <div>
                <div className="text-xs font-bold text-white">{m.label}</div>
                <div className="text-[11px] text-slate-400">{m.desc}</div>
              </div>
              {camera.activePresetMove === m.id && <Check className="w-4 h-4 text-gold-300" />}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-800">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-gold-300" /> {t('focalLengthLabel')}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {focalLengths.map(f => (
            <button
              key={f.mm}
              onClick={() => setCamera(prev => ({ ...prev, focalLength: f.mm }))}
              className={`p-2 rounded-xl text-xs font-mono-code border transition-all ${
                camera.focalLength === f.mm ? 'bg-gold-950 text-gold-200 border-gold-300 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-300 flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-gold-300" /> {t('dofLabel')}
          </span>
          <button
            onClick={() => setCamera(prev => ({ ...prev, dofEnabled: !prev.dofEnabled }))}
            className={`w-10 h-6 rounded-full p-1 transition-colors ${camera.dofEnabled ? 'bg-gold-400' : 'bg-slate-800'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${camera.dofEnabled ? 'translate-x-4' : ''}`} />
          </button>
        </div>

        {camera.dofEnabled && (
          <div className="space-y-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>{t('apertureLabel')}</span>
                <span className="font-mono-code text-gold-300">f/{camera.aperture}</span>
              </div>
              <input
                type="range"
                min="1.2"
                max="16"
                step="0.2"
                value={camera.aperture}
                onChange={e => setCamera(prev => ({ ...prev, aperture: parseFloat(e.target.value) }))}
                className="w-full h-1.5 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>{t('focusDistLabel')}</span>
                <span className="font-mono-code text-gold-300">{camera.focusDistance.toFixed(1)}m</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={camera.focusDistance}
                onChange={e => setCamera(prev => ({ ...prev, focusDistance: parseFloat(e.target.value) }))}
                className="w-full h-1.5 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
