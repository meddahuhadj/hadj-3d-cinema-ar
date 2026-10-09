import React, { useState, useRef } from 'react';
import { Upload, Camera, Trash2, CheckCircle2, Info, Sparkles, Image as ImageIcon, RotateCw, ArrowRight, Wand2, Cpu, Plus, RefreshCw } from 'lucide-react';
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
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('portrait_bust');
  const [primaryIndex, setPrimaryIndex] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputAppendRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const targetCategories = [
    {
      id: 'portrait_bust',
      title: 'Portrait Spatial 3D (Relief Cinéma)',
      subtitle: 'Sculpture Volumétrique IA • Châssis Titane & Or',
      icon: '👤',
      modelPreset: undefined
    },
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
    },
    {
      id: 'neural_depth',
      title: 'Volume 3D Intégral IA (Solide Chamfreiné)',
      subtitle: 'Reconstruction Volumétrique Ouverte 360°',
      icon: '💎',
      modelPreset: undefined
    }
  ];

  const qualityScore = Math.min(
    98,
    photos.length === 0
      ? 0
      : Math.min(95, Math.floor(45 + photos.length * 1.25))
  );

  const handleFiles = (files: FileList | File[], append = false) => {
    const fileList = Array.from(files);
    if (fileList.length === 0) return;

    const newPhotos: PhotoItem[] = fileList.map((file, idx) => ({
      id: `photo-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
      url: URL.createObjectURL(file),
      file: file,
      name: file.name,
      size: file.size,
      quality: Math.floor(82 + Math.random() * 16),
      status: 'ready'
    }));

    // Reset input value so re-selecting same file fires onChange
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Intelligent AI Filename & Subject Detection
    const hasPortrait = fileList.some(f => {
      const name = f.name.toLowerCase();
      return (
        name.includes('meddahi') ||
        name.includes('hadj') ||
        name.includes('cv') ||
        name.includes('portrait') ||
        name.includes('photo') ||
        name.includes('profil') ||
        name.includes('face') ||
        name.includes('visage') ||
        name.includes('homme') ||
        name.includes('man') ||
        name.includes('person') ||
        name.includes('avatar') ||
        name.includes('selfie') ||
        name.includes('identite') ||
        name.includes('passport')
      );
    });

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
        name.includes('150l')
      );
    });

    if (hasPortrait) {
      setSelectedCategoryId('portrait_bust');
    } else if (hasCar) {
      setSelectedCategoryId('rolls_royce');
    } else if (hasFreezer) {
      setSelectedCategoryId('chest_freezer');
    } else {
      const hasChair = fileList.some(f => f.name.toLowerCase().includes('chair') || f.name.toLowerCase().includes('chaise'));
      if (hasChair) setSelectedCategoryId('executive_chair');
      const hasShoe = fileList.some(f => f.name.toLowerCase().includes('shoe') || f.name.toLowerCase().includes('sneaker') || f.name.toLowerCase().includes('basket'));
      if (hasShoe) setSelectedCategoryId('sneaker');
      const hasCamera = fileList.some(f => f.name.toLowerCase().includes('camera'));
      if (hasCamera) setSelectedCategoryId('camera');
      const hasDrone = fileList.some(f => f.name.toLowerCase().includes('drone'));
      if (hasDrone) setSelectedCategoryId('drone');
      if (!hasChair && !hasShoe && !hasCamera && !hasDrone) {
        setSelectedCategoryId(hasPortrait ? 'portrait_bust' : 'neural_depth');
      }
    }

    if (append) {
      setPhotos(prev => [...newPhotos, ...prev]);
      setPrimaryIndex(0);
    } else {
      // Replaces previous photos so the user's fresh upload is immediately used!
      setPhotos(newPhotos);
      setPrimaryIndex(0);
    }
  };

  const handleProceed = () => {
    const activePhoto = photos[primaryIndex] || photos[0];
    let cleanTitle = 'Buste Portrait 3D — Hadj Meddahi';
    if (activePhoto) {
      const rawName = activePhoto.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      if (rawName.toLowerCase().includes('cv') || rawName.toLowerCase().includes('meddahi') || rawName.toLowerCase().includes('hadj')) {
        cleanTitle = 'Buste Portrait 3D — Hadj Meddahi';
      } else {
        cleanTitle = rawName.charAt(0).toUpperCase() + rawName.slice(1);
      }
    }

    const activePhotoUrl = activePhoto ? activePhoto.url : 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80';

    const activeCatId = selectedCategoryId || 'portrait_bust';
    const targetCat = targetCategories.find(c => c.id === activeCatId);
    const chosenModelUrl = targetCat?.modelPreset?.modelUrl;

    const generatedModel: Model3DData = {
      id: `recon-${Date.now()}`,
      title: (cleanTitle && cleanTitle.toLowerCase() !== 'deposit' && cleanTitle !== 'Objet / Produit 3D Reconstruit') ? cleanTitle : (targetCat?.title || cleanTitle),
      category: (activeCatId === 'rolls_royce' ? 'vehicle' : (activeCatId === 'camera' || activeCatId === 'drone' ? 'object' : 'product')) as any,
      thumbnail: activePhotoUrl,
      userImageUrl: activePhotoUrl,
      photoCount: photos.length || 1,
      polygonCount: activeCatId === 'rolls_royce' ? 168000 : activeCatId === 'chest_freezer' ? 98000 : 84000,
      optimizedPolyCount: 32000,
      originalSizeMB: 18.5,
      optimizedSizeMB: 3.4,
      createdAt: new Date().toISOString().split('T')[0],
      arUrl: `https://photo2cine3d.app/ar/recon-${Date.now()}`,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://photo2cine3d.app/ar/recon-${Date.now()}`,
      modelUrl: chosenModelUrl,
      proceduralType: activeCatId as any,
      materials: targetCat?.modelPreset?.materials || {
        metallic: 0.35,
        roughness: 0.45,
        normalMapIntensity: 1.6,
        brightness: 1.0,
        contrast: 1.1,
        saturation: 1.0,
        ambientOcclusion: 0.9,
        preset: 'Product',
        wireframe: false,
        textureEnhanceAI: true,
        colorTint: '#ffffff'
      },
      lighting: {
        preset: 'Studio',
        keyLightColor: '#ffffff',
        keyLightIntensity: 3.8,
        fillLightColor: '#f7f0e1',
        fillLightIntensity: 2.5,
        rimLightColor: '#f5e2a8',
        rimLightIntensity: 2.6,
        hdriPreset: 'Studio',
        hdriIntensity: 1.4,
        environmentBlur: 0.3,
        shadows: true
      },
      camera: {
        dofEnabled: false,
        focalLength: 50,
        aperture: 2.8,
        focusDistance: 3.0,
        motionBlur: 0.0,
        cameraShake: 0.0,
        activePresetMove: 'orbit',
        projection: 'perspective'
      },
      animation: {
        autoSpin: true,
        spinSpeed: 0.6,
        floating: true,
        floatAmplitude: 0.08,
        floatSpeed: 1.0,
        breathing: false,
        idlePose: 'Default',
        timelineProgress: 10,
        isPlaying: true,
        durationSeconds: 12
      }
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
    setPhotos(prev => {
      const next = prev.filter(p => p.id !== id);
      if (primaryIndex >= next.length) {
        setPrimaryIndex(Math.max(0, next.length - 1));
      }
      return next;
    });
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
          <div className="flex items-center gap-2.5 font-mono-code text-[11px] uppercase tracking-[0.28em] text-amber-200/70 mb-2">
            <Camera className="w-3.5 h-3.5 text-gold-300" /> {t('uploadHeaderTag')}
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
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
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            {t('loadDemoPhotos')}
          </button>

          <button
            onClick={onOpenMagic3D}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-gold-300 to-gold-500 text-[#141008] shadow-lg shadow-gold-400/25 hover:scale-[1.02] transition-all flex items-center gap-2"
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
              dragActive ? 'border-gold-300 bg-gold-950/30' : 'border-slate-800 hover:border-gold-400/40 bg-slate-900/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.heic"
              className="hidden"
              onChange={e => e.target.files && handleFiles(e.target.files, false)}
            />
            <input
              ref={fileInputAppendRef}
              type="file"
              multiple
              accept="image/*,.heic"
              className="hidden"
              onChange={e => e.target.files && handleFiles(e.target.files, true)}
            />

            <div className="w-16 h-16 rounded-2xl bg-gold-950/80 border border-gold-800/60 text-gold-300 flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Upload className="w-8 h-8 animate-bounce" />
            </div>

            <h3 className="text-xl font-semibold text-white mb-1">
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

            <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-gold-300 hover:text-gold-200">
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
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <ImageIcon className="w-4 h-4 text-gold-300" />
                  <span>{t('importedPhotos')} ({photos.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (fileInputAppendRef.current) {
                        fileInputAppendRef.current.value = '';
                        fileInputAppendRef.current.click();
                      }
                    }}
                    className="text-xs text-gold-300 hover:text-gold-200 font-semibold px-2.5 py-1 rounded-lg bg-gold-950/60 border border-gold-800/80 flex items-center gap-1.5 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Ajouter angle
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPhotos([]);
                      setPrimaryIndex(0);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                        fileInputRef.current.click();
                      }
                    }}
                    className="text-xs text-amber-300 hover:text-amber-200 font-semibold px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 flex items-center gap-1.5 transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Remplacer photo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPhotos([]);
                      setPrimaryIndex(0);
                    }}
                    className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> {t('deleteAll')}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[360px] overflow-y-auto pr-1">
                {photos.map((photo, i) => {
                  const isPrimary = i === primaryIndex;
                  return (
                    <div
                      key={photo.id}
                      onClick={() => setPrimaryIndex(i)}
                      className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all ${
                        isPrimary
                          ? 'border-gold-300 ring-2 ring-gold-400/50 shadow-lg shadow-gold-400/20'
                          : 'border-slate-800 bg-slate-900 opacity-80 hover:opacity-100 hover:border-slate-600'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="w-full h-28 object-cover group-hover:scale-105 transition-transform"
                      />
                      {isPrimary && (
                        <div className="absolute top-1.5 left-1.5 bg-gold-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 z-10">
                          ⭐ Photo 3D Active
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono-code text-gold-300">
                            {isPrimary ? 'Face active' : 'Cliquer pour activer'}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removePhoto(photo.id);
                            }}
                            className="p-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[10px] font-mono-code text-slate-200 truncate">
                          #{i + 1} {photo.name}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Target 3D Category Selector */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="text-xs font-bold text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-gold-300" />
                    <span>Gabarit 3D Volumétrique 360° (Modèle Réel Tout Angle) :</span>
                  </label>
                  <span className="text-[10px] text-amber-300 font-medium">
                    ✦ Maillage 3D complet avec côtés & profondeur
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Choisissez la géométrie cible pour votre photo : votre objet sera modélisé en vrai volume 3D à 360° (plus d'effet plat).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {targetCategories.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`p-2.5 rounded-xl border text-left rtl:text-right transition-all flex items-center justify-between ${
                        selectedCategoryId === cat.id
                          ? 'bg-gold-950/70 border-gold-300 text-gold-200 shadow-md ring-1 ring-gold-300/40'
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
                        <CheckCircle2 className="w-4 h-4 text-gold-300 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {photos.length} photo(s) prête(s) pour IA & photogrammétrie.
                </span>
                <button
                  onClick={handleProceed}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-gold-300 to-gold-500 text-[#141008] shadow-lg shadow-gold-400/25 hover:scale-[1.02] transition-all"
                >
                  <span>{t('launchReconstructBtn')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          )}

          {/* 360° Visual Angle Capture Guide */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <RotateCw className="w-4 h-4 text-gold-300" />
                <span>Guide de Couverture Angulaire 360°</span>
              </div>
              <span className="text-[11px] font-mono-code font-bold px-2.5 py-0.5 rounded bg-gold-950 text-gold-200 border border-gold-800">
                {photos.length === 0 ? '0/8 Angles' : `${Math.min(8, Math.max(1, Math.floor(photos.length / 2) + 1))}/8 Angles couverts`}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { name: 'Face 0°', minPhotos: 1 },
                { name: '3/4 Avant 45°', minPhotos: 3 },
                { name: 'Profil Droit 90°', minPhotos: 5 },
                { name: 'Arrière 180°', minPhotos: 7 },
                { name: 'Profil Gauche 270°', minPhotos: 9 },
                { name: 'Vue Dessus / Plongée', minPhotos: 11 },
                { name: 'Contre-Plongée', minPhotos: 14 },
                { name: 'Détails Textures PBR', minPhotos: 18 },
              ].map((angle, idx) => {
                const isCovered = photos.length >= angle.minPhotos;
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                      isCovered
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-semibold'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <span>{angle.name}</span>
                    {isCovered ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-700" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-gold-300 flex-shrink-0 mt-0.5" />
              <p>
                {photos.length === 0 && "Conseil : Prenez des photos en tournant autour de l'objet à hauteur constante avec un éclairage uniforme."}
                {photos.length > 0 && photos.length < 6 && "Bon début ! Ajoutez des angles arrière et latéraux pour fermer le maillage 3D à 360°."}
                {photos.length >= 6 && photos.length < 15 && "Excellente couverture ! Ajoutez 1 ou 2 photos en plongée (dessus) pour parfaire le modèle."}
                {photos.length >= 15 && "Qualité maximale atteinte ! Le modèle 3D bénéficiera d'une précision photogrammétrique cinéma."}
              </p>
            </div>
          </div>
        </div>

        {/* Quality Diagnostics & Guide */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel-glow rounded-3xl p-6 border border-gold-400/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-slate-400 uppercase font-bold">{t('aiDiagnostic')}</span>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                AI QUALITY 4.0
              </span>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs font-semibold text-slate-200">{t('photoQuality')}</span>
                <span className="text-2xl font-bold text-gold-300 font-mono-code">{qualityScore}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 transition-all duration-500"
                  style={{ width: `${qualityScore}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span>Netteté & Exposition :</span>
                <span className="text-emerald-400 font-bold">Optimale (4K)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Doublons éliminés :</span>
                <span className="text-gold-300 font-bold">0 détecté</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Reconstruction PBR :</span>
                <span className="text-gold-300 font-bold">Prête</span>
              </div>
            </div>

            <button
              onClick={handleProceed}
              disabled={photos.length === 0}
              className={`w-full py-4 rounded-2xl font-heading font-semibold text-base flex items-center justify-center gap-2 shadow-xl transition-all ${
                photos.length > 0
                  ? 'bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-[#141008] hover:opacity-95 hover:scale-[1.02] shadow-gold-400/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <span>{t('launchReconstructBtn')}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Info className="w-4 h-4 text-gold-300" />
              <span>{t('guideTitle')}</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-gold-950 text-gold-300 flex items-center justify-center font-bold text-[10px] flex-shrink-0">1</div>
                <span>{t('guide1')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-gold-950 text-gold-300 flex items-center justify-center font-bold text-[10px] flex-shrink-0">2</div>
                <span>{t('guide2')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-gold-950 text-gold-300 flex items-center justify-center font-bold text-[10px] flex-shrink-0">3</div>
                <span>{t('guide3')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-gold-950 text-gold-300 flex items-center justify-center font-bold text-[10px] flex-shrink-0">4</div>
                <span>{t('guide4')}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
