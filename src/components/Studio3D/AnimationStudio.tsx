import React from 'react';
import { Play, Pause, RotateCw, Sparkles, Activity, Clock } from 'lucide-react';
import { AnimationSettings } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

interface AnimationStudioProps {
  animation: AnimationSettings;
  setAnimation: React.Dispatch<React.SetStateAction<AnimationSettings>>;
}

export const AnimationStudio: React.FC<AnimationStudioProps> = ({ animation, setAnimation }) => {
  const { t } = useLanguage();

  const togglePlay = () => {
    setAnimation(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="font-heading font-semibold text-white text-base flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold-300" /> {t('animationStudioTitle')}
        </h3>
        <span className="text-[10px] font-mono-code text-gold-300 bg-gold-950 px-2 py-0.5 rounded border border-gold-800">
          {t('aiAnimatorBadge')}
        </span>
      </div>

      <div className="space-y-3">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-200 font-semibold flex items-center gap-2">
              <RotateCw className="w-4 h-4 text-gold-300" /> {t('autoSpinToggle')}
            </span>
            <button
              onClick={() => setAnimation(prev => ({ ...prev, autoSpin: !prev.autoSpin }))}
              className={`w-10 h-6 rounded-full p-1 transition-colors ${animation.autoSpin ? 'bg-gold-400' : 'bg-slate-800'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${animation.autoSpin ? 'translate-x-4' : ''}`} />
            </button>
          </div>

          {animation.autoSpin && (
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>{t('spinSpeedLabel')}</span>
                <span className="font-mono-code text-gold-300">{animation.spinSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={animation.spinSpeed}
                onChange={e => setAnimation(prev => ({ ...prev, spinSpeed: parseFloat(e.target.value) }))}
                className="w-full h-1.5 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>
          )}
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-200 font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-300" /> {t('floatingToggle')}
            </span>
            <button
              onClick={() => setAnimation(prev => ({ ...prev, floating: !prev.floating }))}
              className={`w-10 h-6 rounded-full p-1 transition-colors ${animation.floating ? 'bg-gold-600' : 'bg-slate-800'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${animation.floating ? 'translate-x-4' : ''}`} />
            </button>
          </div>

          {animation.floating && (
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>{t('floatAmpLabel')}</span>
                <span className="font-mono-code text-gold-300">{(animation.floatAmplitude * 100).toFixed(0)}cm</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.4"
                step="0.01"
                value={animation.floatAmplitude}
                onChange={e => setAnimation(prev => ({ ...prev, floatAmplitude: parseFloat(e.target.value) }))}
                className="w-full h-1.5 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-200 font-semibold flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> {t('breathingToggle')}
          </span>
          <button
            onClick={() => setAnimation(prev => ({ ...prev, breathing: !prev.breathing }))}
            className={`w-10 h-6 rounded-full p-1 transition-colors ${animation.breathing ? 'bg-emerald-500' : 'bg-slate-800'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${animation.breathing ? 'translate-x-4' : ''}`} />
          </button>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2 rounded-xl bg-gold-400 text-[#141008] font-bold"
            >
              {animation.isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
            </button>
            <span className="text-xs font-mono-code font-bold text-slate-200">
              {animation.isPlaying ? t('playingStatus') : t('pauseStatus')}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-code text-gold-300">
            <Clock className="w-3.5 h-3.5" /> 00:0{Math.floor((animation.timelineProgress / 100) * 15)} / 00:15
          </div>
        </div>

        <div className="space-y-1">
          <input
            type="range"
            min="0"
            max="100"
            value={animation.timelineProgress}
            onChange={e => setAnimation(prev => ({ ...prev, timelineProgress: parseInt(e.target.value) }))}
            className="w-full h-2 rounded-lg bg-slate-900 cursor-pointer accent-gold-300"
          />
          <div className="flex justify-between text-[10px] font-mono-code text-slate-500 pt-1">
            <span>00:00 (Cam In)</span>
            <span>00:05 (Orbit)</span>
            <span>00:10 (Zoom)</span>
            <span>00:15 (WebAR Out)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
