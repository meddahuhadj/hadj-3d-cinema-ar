import React, { useState } from 'react';
import { ShoppingBag, QrCode, Smartphone, Sparkles, Check, Code, ExternalLink, Tag, Box, ArrowRight } from 'lucide-react';
import { Model3DData } from '../../types';
import { DEMO_PRODUCT_CONFIG } from '../../data/demoModels';
import { useLanguage } from '../../i18n/LanguageContext';

interface ProductARModeProps {
  modelData: Model3DData;
  onOpenAR: () => void;
}

export const ProductARMode: React.FC<ProductARModeProps> = ({ modelData, onOpenAR }) => {
  const [config, setConfig] = useState(DEMO_PRODUCT_CONFIG);
  const [copiedCode, setCopiedCode] = useState(false);
  const { t } = useLanguage();

  const embedScript = `<script src="https://photo2cine3d.app/sdk/webar-button.js" 
  data-model-id="${modelData.id}" 
  data-btn-text="${t('viewInYourRoom')}" 
  data-theme="dark">
</script>`;

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedScript);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 font-mono-code text-xs font-bold uppercase tracking-wider mb-1">
          <ShoppingBag className="w-4 h-4" /> {t('productARHeaderTag')}
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          {t('productARTitle')}
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          {t('productARSubtitle')}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Product Card Simulator (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="glass-panel-glow rounded-3xl p-6 border border-cyan-500/30 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-mono-code text-cyan-400 uppercase font-bold">{t('previewWidgetTitle')}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 text-[10px] font-bold border border-rose-800">
                {config.badge}
              </span>
            </div>

            {/* Product Card Container */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
              <div className="h-72 relative bg-slate-950 flex items-center justify-center p-4">
                <img
                  src={modelData.thumbnail}
                  alt={modelData.title}
                  className="max-h-full object-contain drop-shadow-2xl"
                />

                <button
                  onClick={onOpenAR}
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-black transition-all shadow-lg shadow-cyan-500/30"
                >
                  <Smartphone className="w-4 h-4" /> {t('viewInYourRoom')}
                </button>
              </div>

              <div className="p-6 space-y-4 bg-slate-900">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{config.productName}</h3>
                    <p className="text-xs text-slate-400 font-mono-code">{t('skuLabel')} {config.sku}</p>
                  </div>
                  <span className="text-2xl font-extrabold text-cyan-400 font-mono-code">{config.price}</span>
                </div>

                {/* Color Variants Simulation */}
                {config.enableColorVariants && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-300">{t('colorVariantsLabel')}</span>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-cyan-500 ring-2 ring-cyan-300 cursor-pointer" />
                      <span className="w-6 h-6 rounded-full bg-indigo-500 cursor-pointer" />
                      <span className="w-6 h-6 rounded-full bg-fuchsia-500 cursor-pointer" />
                      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-600 cursor-pointer" />
                    </div>
                  </div>
                )}

                {/* Buy Button */}
                <button className="w-full py-3.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('buyNowBtn')}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: E-Commerce Integrations & Embed (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-cyan-400" /> {t('integrationTitle')}
            </h3>
            <p className="text-xs text-slate-400">
              {t('integrationSubtitle')}
            </p>

            {/* Script Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono-code">
                <span>{t('jsCodeIntegration')}</span>
                <button
                  onClick={copyEmbed}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? t('copiedBtn') : t('copyScriptBtn')}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono-code text-cyan-300/90 leading-relaxed overflow-x-auto">
                {embedScript}
              </div>
            </div>

            {/* Supported Platforms */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-300">{t('platformsLabel')}</span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono-code">Shopify</span>
                <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono-code">WooCommerce</span>
                <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono-code">PrestaShop</span>
                <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono-code">Wix / Webflow</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
