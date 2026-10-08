import React, { useState } from 'react';
import { Wand2, X, CheckCircle2, Sparkles, ArrowRight, Play, RefreshCw, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n/LanguageContext';

interface Magic3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinishMagic3D: () => void;
}

export const Magic3DModal: React.FC<Magic3DModalProps> = ({ isOpen, onClose, onFinishMagic3D }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const { t } = useLanguage();

  if (!isOpen) return null;

  const magicSteps = [
    t('magicStep1'),
    t('magicStep2'),
    t('magicStep3'),
    t('magicStep4'),
    t('magicStep5'),
    t('magicStep6'),
    t('magicStep7'),
    t('magicStep8'),
    t('magicStep9')
  ];

  const runMagicProcess = () => {
    setIsRunning(true);
    setIsDone(false);
    setCurrentStepIdx(0);

    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx < magicSteps.length) {
        setCurrentStepIdx(idx);
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setIsDone(true);
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
    }, 450);
  };

  const handleComplete = () => {
    onClose();
    onFinishMagic3D();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel-glow rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-cyan-500/40 shadow-2xl space-y-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-cyan-500/30">
              <Wand2 className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-white text-xl">{t('magicModalTitle')}</h3>
              <p className="text-xs text-slate-400">{t('magicModalSubtitle')}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps List */}
        <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
          {magicSteps.map((stepText, i) => {
            const isFinished = i < currentStepIdx || isDone;
            const isCurrent = i === currentStepIdx && isRunning;
            return (
              <div
                key={i}
                className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                  isFinished
                    ? 'bg-cyan-950/40 border-cyan-800 text-cyan-300'
                    : isCurrent
                    ? 'bg-fuchsia-950/40 border-fuchsia-500/60 text-fuchsia-300 font-bold animate-pulse'
                    : 'bg-slate-950/30 border-slate-900 text-slate-600'
                }`}
              >
                <span>{stepText}</span>
                {isFinished && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                {isCurrent && <RefreshCw className="w-4 h-4 text-fuchsia-400 animate-spin flex-shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* Status result */}
        {isDone && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950 to-indigo-950 border border-cyan-500/40 text-center space-y-2 animate-in zoom-in-95">
            <Sparkles className="w-6 h-6 text-cyan-400 mx-auto animate-bounce" />
            <h4 className="text-base font-extrabold text-white">{t('magicSuccessTitle')}</h4>
            <p className="text-xs text-slate-300">{t('magicSuccessSubtitle')}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          {!isDone ? (
            <button
              onClick={runMagicProcess}
              disabled={isRunning}
              className="w-full py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 text-white shadow-xl shadow-cyan-500/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>{t('magicProcessing')}</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>{t('modeMagic3D')}</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="w-full py-4 rounded-2xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-black shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              <span>{t('magicOpenStudio')}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
