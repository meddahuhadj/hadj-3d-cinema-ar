import React from 'react';
import { Layers, ShieldCheck, QrCode, FileText, Calendar, User, Tag, Scale, CheckCircle2, History, Share2 } from 'lucide-react';
import { DEMO_DIGITAL_TWIN } from '../../data/demoModels';
import { QRCodeSVG } from 'qrcode.react';
import { useLanguage } from '../../i18n/LanguageContext';

export const DigitalTwinMode: React.FC = () => {
  const twin = DEMO_DIGITAL_TWIN;
  const twinUrl = `https://photo2cine3d.app/twin/${twin.id}`;
  const { t } = useLanguage();

  const historyLogs = [
    { date: '2026-10-07 18:45', action: t('dtHistory1') },
    { date: '2026-10-07 18:40', action: t('dtHistory2') },
    { date: '2026-10-07 18:32', action: t('dtHistory3') }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 font-mono-code text-xs font-bold uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4" /> {t('digitalTwinHeaderTag')}
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          {t('digitalTwinTitle')}
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          {t('digitalTwinSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Certified Digital Passport Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-cyan-500/30 space-y-6 relative overflow-hidden">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t('passportTag')}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-mono-code font-bold border border-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {t('verifiedAsset')}
              </span>
            </div>

            {/* Title & ID */}
            <div>
              <span className="text-xs font-mono-code text-slate-500">{t('assetIDLabel')} {twin.id}</span>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">{twin.name}</h3>
            </div>

            {/* Passport Grid Data */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-cyan-400" /> {t('categoryLabel')}
                </span>
                <p className="text-xs font-bold text-white truncate">{twin.category}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Scale className="w-3 h-3 text-cyan-400" /> {t('dimensionsLabel')}
                </span>
                <p className="text-xs font-mono-code font-bold text-cyan-300">
                  {twin.dimensions.widthCm} x {twin.dimensions.heightCm} x {twin.dimensions.depthCm} cm
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Scale className="w-3 h-3 text-cyan-400" /> {t('weightLabel')}
                </span>
                <p className="text-xs font-mono-code font-bold text-white">{twin.weightKg} kg</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <FileText className="w-3 h-3 text-cyan-400" /> {t('materialsLabel')}
                </span>
                <p className="text-xs font-bold text-slate-200 truncate">{twin.primaryMaterial}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-cyan-400" /> {t('createdAtLabel')}
                </span>
                <p className="text-xs font-mono-code font-bold text-slate-200 truncate">{twin.createdAt}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <User className="w-3 h-3 text-cyan-400" /> {t('authorLabel')}
                </span>
                <p className="text-xs font-bold text-slate-200 truncate">{twin.author}</p>
              </div>
            </div>

            {/* History Logs */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <History className="w-4 h-4 text-cyan-400" /> {t('auditTitle')}
              </span>
              <div className="space-y-2">
                {historyLogs.map((log, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-300">{log.action}</span>
                    <span className="text-[10px] font-mono-code text-cyan-400">{log.date}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: QR Passport Label (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 text-center space-y-6">
            <h3 className="text-lg font-bold text-white">{t('qrPhysicalTitle')}</h3>
            <p className="text-xs text-slate-400">
              {t('qrPhysicalDesc')}
            </p>

            <div className="p-5 rounded-2xl bg-white w-fit mx-auto shadow-2xl border-4 border-slate-900">
              <QRCodeSVG value={twinUrl} size={160} />
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono-code text-cyan-300">
              {twinUrl}
            </div>

            <button className="w-full py-3 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-black shadow-md transition-all">
              {t('printTagBtn')}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
