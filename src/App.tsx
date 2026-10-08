import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PhotoUploader } from './components/PhotoUploader';
import { ReconstructionPipeline } from './components/ReconstructionPipeline';
import { Studio3DMain } from './components/Studio3D/Studio3DMain';
import { WebARViewer } from './components/WebARViewer';
import { ProductARMode } from './components/InnovativeFeatures/ProductARMode';
import { DigitalTwinMode } from './components/InnovativeFeatures/DigitalTwinMode';
import { Gallery3D } from './components/Gallery3D';
import { PrivacyBanner } from './components/PrivacyBanner';
import { Magic3DModal } from './components/Magic3DModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { WebOptimizerModal } from './components/WebOptimizerModal';
import { ExportModal } from './components/ExportModal';

import { INITIAL_DEMO_MODELS } from './data/demoModels';
import { Model3DData, PhotoItem } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState('hero');
  const [models, setModels] = useState<Model3DData[]>(INITIAL_DEMO_MODELS);
  const [activeModel, setActiveModel] = useState<Model3DData>(INITIAL_DEMO_MODELS[0]);
  const [userPhotos, setUserPhotos] = useState<PhotoItem[]>([]);

  // Modals state
  const [isMagic3DOpen, setIsMagic3DOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isOptimizerOpen, setIsOptimizerOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Tab Handlers
  const handleStartUpload = () => setActiveTab('upload');
  const handleTryWebAR = () => setActiveTab('webar');
  const handleWatchDemo = () => {
    setActiveModel(INITIAL_DEMO_MODELS[0]);
    setActiveTab('studio');
  };
  const handleOpenStudio = () => setActiveTab('studio');

  const handleApplyAIPrompt = (command: string) => {
    const cmdLower = command.toLowerCase();
    setActiveModel(prev => {
      const updatedMat = { ...prev.materials };
      const updatedLight = { ...prev.lighting };

      if (cmdLower.includes('métallique') || cmdLower.includes('or') || cmdLower.includes('gold')) {
        updatedMat.metallic = 0.95;
        updatedMat.colorTint = '#fbbf24';
      }
      if (cmdLower.includes('cyberpunk') || cmdLower.includes('néon')) {
        updatedLight.preset = 'Cyberpunk';
        updatedLight.keyLightColor = '#06b6d4';
        updatedLight.rimLightColor = '#ec4899';
      }
      return { ...prev, materials: updatedMat, lighting: updatedLight };
    });
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMagic3D={() => setIsMagic3DOpen(true)}
        onOpenDemo={handleWatchDemo}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'hero' && (
          <Hero
            onStartUpload={handleStartUpload}
            onTryWebAR={handleTryWebAR}
            onWatchDemo={handleWatchDemo}
            onOpenStudio={handleOpenStudio}
          />
        )}

        {activeTab === 'upload' && (
          <PhotoUploader
            photos={userPhotos}
            setPhotos={setUserPhotos}
            onProceedToReconstruction={(targetModel) => {
              if (targetModel) {
                setActiveModel(targetModel);
                setModels(prev => [targetModel, ...prev.filter(m => m.id !== targetModel.id)]);
              }
              setActiveTab('reconstruct');
            }}
            onOpenMagic3D={() => setIsMagic3DOpen(true)}
          />
        )}

        {activeTab === 'reconstruct' && (
          <ReconstructionPipeline
            photoCount={userPhotos.length}
            photos={userPhotos}
            activeModel={activeModel}
            onComplete={(completedModel) => {
              if (completedModel) {
                setActiveModel(completedModel);
              }
              setActiveTab('studio');
            }}
          />
        )}

        {activeTab === 'studio' && (
          <Studio3DMain
            modelData={activeModel}
            onOpenAR={() => setActiveTab('webar')}
            onOpenExport={() => setIsExportOpen(true)}
            onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
            onOpenOptimizer={() => setIsOptimizerOpen(true)}
          />
        )}

        {activeTab === 'webar' && (
          <WebARViewer modelData={activeModel} />
        )}

        {activeTab === 'product-ar' && (
          <ProductARMode
            modelData={activeModel}
            onOpenAR={() => setActiveTab('webar')}
          />
        )}

        {activeTab === 'digital-twin' && (
          <DigitalTwinMode />
        )}

        {activeTab === 'gallery' && (
          <Gallery3D
            models={models}
            onSelectModel={(model) => {
              setActiveModel(model);
              setActiveTab('studio');
            }}
            onOpenAR={(model) => {
              setActiveModel(model);
              setActiveTab('webar');
            }}
            onStartUpload={handleStartUpload}
          />
        )}
      </main>

      {/* Global Privacy Assurance Banner */}
      <PrivacyBanner />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 space-y-2">
          <p className="font-heading font-bold text-slate-300">
            PHOTO2CINE3D — AI Photo → Cinematic 3D → Instant WebAR
          </p>
          <p>© 2026 PHOTO2CINE3D Inc. Tous droits réservés. Propulsé par Three.js & WebXR Engine.</p>
        </div>
      </footer>

      {/* Interactive Modals */}
      <Magic3DModal
        isOpen={isMagic3DOpen}
        onClose={() => setIsMagic3DOpen(false)}
        onFinishMagic3D={() => setActiveTab('studio')}
      />

      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        onApplyPrompt={handleApplyAIPrompt}
      />

      <WebOptimizerModal
        isOpen={isOptimizerOpen}
        onClose={() => setIsOptimizerOpen(false)}
        modelData={activeModel}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        modelData={activeModel}
      />

    </div>
  );
}

export default App;
