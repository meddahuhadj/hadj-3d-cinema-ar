import React, { useState } from 'react';
import { Sparkles, Box, Camera, QrCode, Layers, Cpu, ShieldCheck, ShoppingBag, Radio, Wand2, Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../i18n/ThemeContext';
import { Language } from '../i18n/translations';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMagic3D: () => void;
  onOpenDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenMagic3D, onOpenDemo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { id: 'hero', label: t('navHero'), icon: Sparkles },
    { id: 'upload', label: t('navUpload'), icon: Camera },
    { id: 'reconstruct', label: t('navReconstruct'), icon: Cpu },
    { id: 'studio', label: t('navStudio'), icon: Box },
    { id: 'webar', label: t('navWebAR'), icon: QrCode },
    { id: 'product-ar', label: t('navProductAR'), icon: ShoppingBag },
    { id: 'digital-twin', label: t('navDigitalTwin'), icon: Layers },
    { id: 'gallery', label: t('navGallery'), icon: Radio },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('hero')}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Box className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                  PHOTO<span className="text-cyan-400">2</span>CINE<span className="text-fuchsia-400">3D</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono-code font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 rounded">
                  WEBAR
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">AI Photo → Cinematic 3D → Instant WebAR</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Section: Language Selector, Badges & Actions */}
          <div className="hidden xl:flex items-center gap-2.5">
            
            {/* Language Switcher Dropdown */}
            <div className="relative flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800">
              <Globe className="w-3.5 h-3.5 text-cyan-400 mx-1.5" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-xs font-bold text-slate-200 outline-none cursor-pointer pr-1"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-slate-950 text-slate-100">
                    {l.flag} {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-all duration-300 ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-amber-400 hover:bg-slate-800'
                  : 'bg-amber-50 border-amber-200 text-amber-500 hover:bg-amber-100'
              }`}
              title={isDark ? 'Mode Clair' : 'Mode Sombre'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Status Pills */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-medium text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('privacyDefault')}</span>
            </div>

            {/* Quick Demo Button */}
            <button
              onClick={onOpenDemo}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all shadow-sm"
            >
              {t('tryDemo')}
            </button>

            {/* Magic 3D Button */}
            <button
              onClick={onOpenMagic3D}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.02] transition-all"
            >
              <Wand2 className="w-4 h-4 animate-spin-slow" />
              {t('magic3DBtn')}
            </button>
          </div>

          {/* Mobile Navigation controls */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Language selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 p-1.5 rounded-lg"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-slate-950 text-slate-100">
                  {l.flag} {l.code.toUpperCase()}
                </option>
              ))}
            </select>

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-lg border transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-amber-400'
                  : 'bg-amber-50 border-amber-200 text-amber-500'
              }`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onOpenMagic3D}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-500 text-white"
            >
              <Wand2 className="w-3.5 h-3.5" />
              3D
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 pt-2 border-t border-slate-800/80 animate-in fade-in">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold ${
                      isActive ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-900/60 text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-cyan-400" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
