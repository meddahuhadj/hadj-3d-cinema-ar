import React, { useState } from 'react';
import { Wand2, X, Send, Sparkles, Check, Terminal, Cpu } from 'lucide-react';
import { AIPromptAction } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPrompt: (command: string) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose, onApplyPrompt }) => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [logs, setLogs] = useState<AIPromptAction[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useLanguage();

  if (!isOpen) return null;

  const samplePrompts = [
    t('aiPromptSample1'),
    t('aiPromptSample2'),
    t('aiPromptSample3'),
    t('aiPromptSample4')
  ];

  const handleSend = (textToSend?: string) => {
    const cmd = textToSend || inputPrompt;
    if (!cmd.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      onApplyPrompt(cmd);
      setLogs(prev => [
        {
          command: cmd,
          executedAt: new Date().toLocaleTimeString(),
          appliedChanges: 'PBR Material Updated • Lighting Presets Adjusted • Camera Configured.'
        },
        ...prev
      ]);
      setInputPrompt('');
      setIsProcessing(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel-glow rounded-3xl max-w-xl w-full p-6 border border-cyan-500/40 shadow-2xl space-y-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Wand2 className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-white text-lg">{t('aiAssistantModalTitle')}</h3>
              <p className="text-xs text-slate-400">{t('aiAssistantSubtitle')}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Box */}
        <div className="space-y-3">
          <label className="text-xs text-slate-300 font-semibold">{t('aiPromptLabel')}</label>
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-950 border border-slate-800 focus-within:border-cyan-500">
            <input
              type="text"
              value={inputPrompt}
              onChange={e => setInputPrompt(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder={t('aiInputPlaceholder')}
              className="w-full bg-transparent text-sm text-slate-100 outline-none px-3"
            />
            <button
              onClick={() => handleSend()}
              disabled={isProcessing}
              className="p-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono-code text-slate-400">{t('suggestionsTitle')}</span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="text-xs p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 text-left rtl:text-right transition-all"
              >
                ⚡ {p}
              </button>
            ))}
          </div>
        </div>

        {/* Applied History */}
        {logs.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" /> {t('appliedHistoryTitle')}
            </span>
            <div className="space-y-2 max-h-36 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-900 text-xs space-y-1">
                  <div className="flex justify-between font-mono-code text-cyan-400">
                    <span>"{log.command}"</span>
                    <span className="text-[10px] text-slate-500">{log.executedAt}</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> {log.appliedChanges}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
