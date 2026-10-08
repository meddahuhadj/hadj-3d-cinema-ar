import React, { useState, useRef } from 'react';
import { Upload, Camera, Trash2, CheckCircle2, AlertCircle, Info, Sparkles, Image as ImageIcon, RotateCw, ArrowRight, Wand2, Box, Cpu } from 'lucide-react';
import { PhotoItem, Model3DData } from '../types';
import { INITIAL_DEMO_MODELS } from '../data/demoModels';
import { useLanguage } from '../i18n/LanguageContext';

interface PhotoUploaderProps {
  photos: PhotoItem[];
  setPhotos: React.Dispatch<React.SetStateAction<PhotoItem[]>>;
  onProceedToReconstruction: (targetModel?: Model3DData) => void;
  onOpenMagic3D: () => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photos,
  setPhotos,
  onProceedToReconstruction,
  onOpenMagic3D,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('chest_freezer');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const targetCategories = [
    {
      id: 'rolls_royce',
      title: 'Rolls-Royce Cullinan Black Badge',
      subtitle: 'Automobile & Véhicule de Luxe 3D',
      icon: '🚗',
      modelPreset: INITIAL_DEMO_MODELS[0]
    },
    {
      id: 'chest_freezer',
      title: 'Congélateur Horizontal Sharbo 150L Blanc',
      subtitle: 'Électroménager / Froid (Fidélité 100%)',
      icon: '🧊',
      modelPreset: INITIAL_DEMO_MODELS[1]
    },
    {
      id: 'executive_chair',
      title: 'Chaise Opérateur Ergonomique Cuir',
      subtitle: 'Mobilier / Bureau Pro',
      icon: '💺',
      modelPreset: INITIAL_DEMO_MODELS[2]
    },
    {
      id: 'sneaker',
      title: 'Baskets Cyberpunk Horizon 3D',
      subtitle: 'Mode / E-Commerce',
      icon: '👟',
      modelPreset: INITIAL_DEMO_MODELS[3]
    },
    {
      id: 'camera',
      title: 'Appareil Photo Rétro Studio 1974',
      subtitle: 'Technologie & High-Tech',
      icon: '📷',
      modelPreset: INITIAL_DEMO_MODELS[4]
    },
    {
      id: 'drone',
      title: 'Drone de Reconnaissance Tactique X-9',
      subtitle: 'Industriel & Aéronautique',
      icon: '🚁',
      modelPreset: INITIAL_DEMO_MODELS[5]
    }
  ];

  const qualityScore = Math.min(
    98,
    photos.length === 0
      ? 0
      : Math.min(95, Math.floor(45 + photos.length * 1.25))
  );

  const handleFiles = (files: FileList | File[]) => {
    const fileList = Array.from(files);
    const newPhotos: PhotoItem[] = fileList.map((file, idx) => ({
      id: `photo-${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
      file: file,
      name: file.name,
      size: file.size,
      quality: Math.floor(80 + Math.random() * 18),
      status: 'ready'
    }));

    // Intelligent AI Filename Detection
    const hasCar = fileList.some(f => {
      const name = f.name.toLowerCase();
      return (
        name.includes('rolls') ||
        name.includes('cullinan') ||
        name.includes('car') ||
        name.includes('voiture') ||
        name.includes('suv') ||
        name.includes('auto') ||
        name.includes('vehicule') ||
        name.includes('vehicle') ||
        name.includes('rent-')
      );
    });

    const hasFreezer = fileList.some(f => {
      const name = f.name.toLowerCase();
      return (
        name.includes('sharbo') ||
        name.includes('congelateur') ||
        name.includes('freezer') ||
        name.includes('frigo') ||
        name.includes('refrigerator') ||
        name.includes('150l') ||
        name.includes('facilitedz') ||
        name.includes('adrar') ||
        name.includes('taksit') ||
        name.includes('dz')
      );
    });

    if (hasCar) {
      setSelectedCategoryId('rolls_royce');
    } else if (hasFreezer) {
      setSelectedCategoryId('chest_freezer');
    } else {
      const hasChair = fileList.some(f => f.name.toLowerCase().includes('chair') || f.name.toLowerCase().includes('chaise'));
      if (hasChair) setSelectedCategoryId('executive_chair');
      const hasShoe = fileList.some(f => f.name.toLowerCase().includes('shoe') || f.name.toLowerCase().includes('sneaker') || f.name.toLowerCase().includes('basket'));
      if (hasShoe) setSelectedCategoryId('sneaker');
      const hasCamera = fileList.some(f => f.name.toLowerCase().includes('camera') || f.name.toLowerCase().includes('photo'));
      if (hasCamera) setSelectedCategoryId('camera');
      const hasDrone = fileList.some(f => f.name.toLowerCase().includes('drone'));
      if (hasDrone) setSelectedCategoryId('drone');
    }

    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const handleProceed = () => {
    const matchedCategory = targetCategories.find(c => c.id === selectedCategoryId) || targetCategories[0];
    const basePreset = matchedCategory.modelPreset;

    const generatedModel: Model3DData = {
      ...basePreset,
      id: `recon-${Date.now()}`,
      title: photos.length > 0 ? `Modèle 3D Restitué — ${matchedCategory.title}` : basePreset.title,
      thumbnail: photos.length > 0 ? photos[0].url : basePreset.thumbnail,
      photoCount: photos.length > 0 ? photos.length : basePreset.photoCount,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onProceedToReconstruction(generatedModel);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const loadSamplePhotos = () => {
    const sampleUrls = [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80'
    ];

    const loadedSamples: PhotoItem[] = sampleUrls.map((url, i) => ({
      id: `sample-${Date.now()}-${i}`,
      url,
      name: `Photo_Angle_${(i * 60)}deg.jpg`,
      size: 2450000 + i * 150000,
      quality: 88 + (i % 5),
      status: 'ready'
    }));

    setPhotos(loadedSamples);
  };

  const simulateCameraCapture = () => {
    setCameraActive(true);
    setTimeout(() => {
      loadSamplePhotos();
      setCameraActive(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono-code text-xs font-bold uppercase tracking-wider mb-1">
            <Camera className="w-4 h-4" /> {t('uploadHeaderTag')}
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            {t('uploadHeaderTitle')}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {t('uploadHeaderSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadSamplePhotos}
            className="px-4 py-2 rounded-xl text-xs font-semibold glass-panel border border-slate-700 text-slate-200 hover:text-white transition-all flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            {t('loadDemoPhotos')}
          </button>

          <button
            onClick={onOpenMagic3D}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg transition-all flex items-center gap-2"
          >
            <Wand2 className="w-3.5 h-3.5" />
            {t('modeMagic3D')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 relative overflow-hidden ${
              dragActive ? 'border-cyan-400 bg-cyan-950/30' : 'border-slate-800 hover:border-cyan-500/40 bg-slate-900/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.heic"
              className="hidden"
              onChange={e => e.target.files && handleFiles(e.target.files)}
            />

            <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Upload className="w-8 h-8 animate-bounce" />
            </div>

            <h3 className="text-lg font-bold text-white mb-1">
              {t('dropzoneTitle')}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
              {t('dropzoneSubtitle')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[10px] font-mono-code text-slate-300">JPG / JPEG</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[10px] font-mono-code text-slate-300">PNG</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[10px] font-mono-code text-slate-300">WEBP</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[10px] font-mono-code text-slate-300">HEIC</span>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300">
              <Camera className="w-4 h-4" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  simulateCameraCapture();
                }}
              >
                {cameraActive ? t('capturing') : t('takeWithCamera')}
              </button>
            </div>
          </div>

          {photos.length > 0 && (
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>{t('importedPhotos')} ({photos.length})</span>
                </div>
                <button
                  onClick={() => setPhotos([])}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> {t('deleteAll')}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[360px] overflow-y-auto pr-1">
                {photos.map((photo, i) => (
                  <div key={photo.id} className="group relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-md">
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="w-full h-28 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
                      <button
                        onClick={() => removePhoto(photo.id)}
                        className="self-end p-1.5 rounded-lg bg-rose-500 text-white"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="text-[10px] font-mono-code text-slate-200 truncate">
                        #{i + 1} {photo.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Target 3D Category Selector */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Gabarit & Reconnaissance d'Objet IA (Fidélité 3D) :</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {targetCategories.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`p-2.5 rounded-xl border text-left rtl:text-right transition-all flex items-center justify-between ${
                        selectedCategoryId === cat.id
                          ? 'bg-cyan-950/70 border-cyan-400 text-cyan-300 shadow-md ring-1 ring-cyan-400/40'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-base">{cat.icon}</span>
                        <div className="truncate">
                          <p className="text-xs font-bold truncate text-white">{cat.title}</p>
                          <p className="text-[10px] text-slate-400 truncate">{cat.subtitle}</p>
                        </div>
                      </div>
                      {selectedCategoryId === cat.id && (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {photos.length} photo(s) prête(s) pour NeRF & photogrammétrie.
                </span>
                <button
                  onClick={handleProceed}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  <span>{t('launchReconstructBtn')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quality Diagnostics & Guide */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel-glow rounded-3xl p-6 border border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-slate-400 uppercase font-bold">{t('aiDiagnostic')}</span>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs font-semibold text-slate-200">{t('photoQuality')}</span>
                <span className="text-2xl font-extrabold text-cyan-400 font-mono-code">{qualityScore}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 transition-all duration-500"
                  style={{ width: `${qualityScore}%` }}
                />
              </div>
            </div>

            <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              {photos.length === 0 ? (
                <p className="flex items-center gap-2 text-slate-400">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  {t('qualityPending')}
                </p>
              ) : photos.length < 15 ? (
                <p className="flex items-center gap-2 text-cyan-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  {t('qualitySufficient')}
                </p>
              ) : (
                <p className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  {t('qualityExcellent')}
                </p>
              )}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>{t('guideTitle')}</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0">1</div>
                <span>{t('guide1')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0">2</div>
                <span>{t('guide2')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0">3</div>
                <span>{t('guide3')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0">4</div>
                <span>{t('guide4')}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
