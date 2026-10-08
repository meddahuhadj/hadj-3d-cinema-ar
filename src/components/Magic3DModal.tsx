import React, { useState } from 'react';
import { Wand2, X, CheckCircle2, Sparkles, RefreshCw, QrCode } from 'lucide-react';
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
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#f5e2a8', '#d4af37', '#a8842c', '#8a6a1f', '#f6f1e7'] });
      }
    }, 450);
  };

  const handleComplete = () => {
    onClose();
    onFinishMagic3D();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel-glow rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-gold-400/40 shadow-2xl space-y-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-gold-300 via-gold-400 to-gold-600 text-[#141008] shadow-lg shadow-gold-400/30">
              <Wand2 className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-white text-xl">{t('magicModalTitle')}</h3>
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
                    ? 'bg-gold-950/40 border-gold-800 text-gold-200'
                    : isCurrent
                    ? 'bg-gold-950/40 border-gold-600/60 text-gold-200 font-bold animate-pulse'
                    : 'bg-slate-950/30 border-slate-900 text-slate-600'
                }`}
              >
                <span>{stepText}</span>
                {isFinished && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                {isCurrent && <RefreshCw className="w-4 h-4 text-gold-300 animate-spin flex-shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* Status result */}
        {isDone && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-gold-950/70 to-slate-900/70 border border-gold-400/40 text-center space-y-2 animate-in zoom-in-95">
            <Sparkles className="w-6 h-6 text-gold-300 mx-auto animate-bounce" />
            <h4 className="text-lg font-semibold text-white">{t('magicSuccessTitle')}</h4>
            <p className="text-xs text-slate-300">{t('magicSuccessSubtitle')}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          {!isDone ? (
            <button
              onClick={runMagicProcess}
              disabled={isRunning}
              className="w-full py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-[#141008] shadow-xl shadow-gold-400/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#141008]" />
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
              className="w-full py-4 rounded-2xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-[#0a0908] shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
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
