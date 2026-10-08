import React, { useState } from 'react';
import { Viewport3D } from './Viewport3D';
import { MaterialStudio } from './MaterialStudio';
import { CinematicEngine } from './CinematicEngine';
import { CameraDirector } from './CameraDirector';
import { AnimationStudio } from './AnimationStudio';
import { Model3DData, MaterialSettings, LightingSettings, CameraSettings, AnimationSettings } from '../../types';
import { Sliders, Film, Camera, Sparkles, QrCode, Download, Eye, Box, Wand2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Studio3DMainProps {
  modelData: Model3DData;
  onOpenAR: () => void;
  onOpenExport: () => void;
  onOpenAIAssistant: () => void;
  onOpenOptimizer: () => void;
}

export const Studio3DMain: React.FC<Studio3DMainProps> = ({
  modelData,
  onOpenAR,
  onOpenExport,
  onOpenAIAssistant,
  onOpenOptimizer,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'materials' | 'lighting' | 'camera' | 'animation'>('materials');
  const [viewMode, setViewMode] = useState<'rendered' | 'wireframe' | 'solid'>('rendered');
  const { t } = useLanguage();

  const [material, setMaterial] = useState<MaterialSettings>(modelData.materials);
  const [lighting, setLighting] = useState<LightingSettings>(modelData.lighting);
  const [camera, setCamera] = useState<CameraSettings>(modelData.camera);
  const [animation, setAnimation] = useState<AnimationSettings>(modelData.animation);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Studio Header Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Model Title & Tag */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-400 to-gold-600 p-0.5 shadow-md">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Box className="w-5 h-5 text-gold-300" />
            </div>
          </div>
          <div>
            <h2 className="font-heading font-semibold text-white text-xl flex items-center gap-2">
              {modelData.title}
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-gold-950 text-gold-300 border border-gold-800">
                {t('studioTitleTag')}
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              {modelData.photoCount} photos • Mesh {modelData.polygonCount.toLocaleString()} poly • {modelData.optimizedSizeMB} MB GLB
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenAIAssistant}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-gold-200 border border-slate-700 transition-all"
          >
            <Wand2 className="w-4 h-4 text-gold-300" />
            <span>{t('aiAssistantBtn')}</span>
          </button>

          <button
            onClick={onOpenOptimizer}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            <span>{t('webOptimizerBtn')}</span>
          </button>

          <button
            onClick={onOpenAR}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-gold-300 to-gold-500 text-[#141008] shadow-lg shadow-gold-400/25 transition-all"
          >
            <QrCode className="w-4 h-4" />
            <span>{t('viewInWebARBtn')}</span>
          </button>

          <button
            onClick={onOpenExport}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-200 hover:text-white transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{t('exportBtn')}</span>
          </button>
        </div>

      </div>

      {/* Main Studio Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Viewport 3D */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-panel-glow rounded-3xl p-3 border border-slate-800 relative overflow-hidden shadow-2xl h-[520px] sm:h-[600px]">
            
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl">
              <button
                onClick={() => setViewMode('rendered')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === 'rendered' ? 'bg-gold-400 text-[#141008] font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t('renderedPBR')}
              </button>
              <button
                onClick={() => setViewMode('wireframe')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === 'wireframe' ? 'bg-gold-400 text-[#141008] font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t('wireframeMode')}
              </button>
              <button
                onClick={() => setViewMode('solid')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === 'solid' ? 'bg-gold-400 text-[#141008] font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t('solidMode')}
              </button>
            </div>

            <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] font-mono-code text-gold-200">
              <Eye className="w-3.5 h-3.5 text-gold-300" />
              <span>Three.js WebGL 2.0</span>
            </div>

            <Viewport3D
              modelData={modelData}
              material={material}
              lighting={lighting}
              cameraSettings={camera}
              animation={animation}
              viewMode={viewMode}
            />

            <div className="absolute bottom-6 left-6 z-20 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
              <span>{t('presetLabel')}: <strong className="text-gold-300 font-mono-code">{lighting.preset}</strong></span>
              <span>•</span>
              <span>cam: <strong className="text-gold-300 font-mono-code">{camera.focalLength}mm</strong></span>
            </div>

          </div>
        </div>

        {/* Right Column: Tools Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel rounded-3xl p-5 border border-slate-800 space-y-6">
            
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 rounded-2xl border border-slate-800 text-center">
              <button
                onClick={() => setActiveSubTab('materials')}
                className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 ${
                  activeSubTab === 'materials' ? 'bg-gold-400/20 text-gold-200 border border-gold-400/40' : 'text-slate-400'
                }`}
              >
                <Sliders className="w-4 h-4" /> {t('tabMaterials')}
              </button>

              <button
                onClick={() => setActiveSubTab('lighting')}
                className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 ${
                  activeSubTab === 'lighting' ? 'bg-gold-600/20 text-gold-200 border border-gold-600/40' : 'text-slate-400'
                }`}
              >
                <Film className="w-4 h-4" /> {t('tabLighting')}
              </button>

              <button
                onClick={() => setActiveSubTab('camera')}
                className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 ${
                  activeSubTab === 'camera' ? 'bg-gold-500/20 text-gold-200 border border-gold-500/40' : 'text-slate-400'
                }`}
              >
                <Camera className="w-4 h-4" /> {t('tabCamera')}
              </button>

              <button
                onClick={() => setActiveSubTab('animation')}
                className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 ${
                  activeSubTab === 'animation' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400'
                }`}
              >
                <Sparkles className="w-4 h-4" /> {t('tabAnimation')}
              </button>
            </div>

            <div className="max-h-[500px] overflow-y-auto pr-1">
              {activeSubTab === 'materials' && (
                <MaterialStudio material={material} setMaterial={setMaterial} />
              )}
              {activeSubTab === 'lighting' && (
                <CinematicEngine lighting={lighting} setLighting={setLighting} />
              )}
              {activeSubTab === 'camera' && (
                <CameraDirector camera={camera} setCamera={setCamera} />
              )}
              {activeSubTab === 'animation' && (
                <AnimationStudio animation={animation} setAnimation={setAnimation} />
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
