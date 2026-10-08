export type Language = 'fr' | 'en' | 'ar' | 'nl';

export interface TranslationDictionary {
  // Brand & Subtitle
  logoSub: string;
  brandTag: string;

  // Header
  navHero: string;
  navUpload: string;
  navReconstruct: string;
  navStudio: string;
  navWebAR: string;
  navProductAR: string;
  navDigitalTwin: string;
  navGallery: string;
  privacyDefault: string;
  gpuAccelerated: string;
  tryDemo: string;
  magic3DBtn: string;

  // Hero
  heroPill: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  btnCreate3D: string;
  btnTryWebAR: string;
  btnWatchDemo: string;
  badgeFPS: string;
  badgePrivacy: string;
  badgeExport: string;
  liveViewport: string;
  meshPolyCount: string;
  presetHollywood: string;
  openStudioBtn: string;
  fpsLabel: string;
  dragRotate: string;
  pipelineTitle: string;
  pipelineSubtitle: string;
  step01Title: string; step01Desc: string;
  step02Title: string; step02Desc: string;
  step03Title: string; step03Desc: string;
  step04Title: string; step04Desc: string;
  step05Title: string; step05Desc: string;

  // Photo Uploader
  uploadHeaderTag: string;
  uploadHeaderTitle: string;
  uploadHeaderSubtitle: string;
  loadDemoPhotos: string;
  modeMagic3D: string;
  dropzoneTitle: string;
  dropzoneSubtitle: string;
  takeWithCamera: string;
  capturing: string;
  importedPhotos: string;
  deleteAll: string;
  launchReconstructBtn: string;
  aiDiagnostic: string;
  photoQuality: string;
  qualityPending: string;
  qualitySufficient: string;
  qualityExcellent: string;
  guideTitle: string;
  guide1: string;
  guide2: string;
  guide3: string;
  guide4: string;

  // Reconstruction
  reconstructHeaderTag: string;
  reconstructTitle: string;
  reconstructSubtitle: string;
  modeFastTitle: string; modeFastDesc: string;
  modeStandardTitle: string; modeStandardDesc: string;
  modeProTitle: string; modeProDesc: string;
  modeCinematicTitle: string; modeCinematicDesc: string;
  modeObjectTitle: string; modeObjectDesc: string;
  modeCharacterTitle: string; modeCharacterDesc: string;
  badge1Photo: string; badge5_20Photos: string; badge20_80Photos: string;
  badgeUltraRealism: string; badgeECommerce: string; badgeAvatar3D: string;
  synthesisTitle: string;
  globalProgress: string;
  launchReconstructAction: string;
  processingAI: string;
  executionLogs: string;
  disclaimer: string;
  completedStatus: string;
  calculatingStatus: string;
  waitingStatus: string;
  step06Title: string; step06Desc: string;
  step07Title: string; step07Desc: string;

  // Studio 3D Main
  studioTitleTag: string;
  aiAssistantBtn: string;
  webOptimizerBtn: string;
  viewInWebARBtn: string;
  exportBtn: string;
  renderedPBR: string;
  wireframeMode: string;
  solidMode: string;
  tabMaterials: string;
  tabLighting: string;
  tabCamera: string;
  tabAnimation: string;
  presetLabel: string;

  // Material Studio
  materialStudioTitle: string;
  aiTextureBadge: string;
  presetMaterials: string;
  matRealistic: string;
  matCinematic: string;
  matDarkCinema: string;
  matSciFi: string;
  matLuxury: string;
  matStudio: string;
  matCartoon: string;
  matHolographic: string;
  metallicSlider: string;
  roughnessSlider: string;
  normalMapSlider: string;
  mainColorTint: string;
  wireframeToggle: string;

  // Cinematic Engine
  cinematicEngineTitle: string;
  studioLightingBadge: string;
  presetLighting: string;
  lightHollywood: string;
  lightCyberpunk: string;
  lightLuxury: string;
  lightDarkCinema: string;
  lightSciFi: string;
  lightGoldenHour: string;
  lightStudio: string;
  lightDocumentary: string;
  keyLightLabel: string;
  fillLightLabel: string;
  rimLightLabel: string;
  softShadowsToggle: string;

  // Camera Director
  cameraDirectorTitle: string;
  hollywoodCamBadge: string;
  presetCameraMoves: string;
  moveOrbit: string; moveOrbitDesc: string;
  moveHero: string; moveHeroDesc: string;
  moveProduct: string; moveProductDesc: string;
  moveDramatic: string; moveDramaticDesc: string;
  moveShowcase: string; moveShowcaseDesc: string;
  moveManual: string; moveManualDesc: string;
  focalLengthLabel: string;
  focal24: string;
  focal35: string;
  focal50: string;
  focal85: string;
  focal135: string;
  dofLabel: string;
  apertureLabel: string;
  focusDistLabel: string;

  // Animation Studio
  animationStudioTitle: string;
  aiAnimatorBadge: string;
  autoSpinToggle: string;
  spinSpeedLabel: string;
  floatingToggle: string;
  floatAmpLabel: string;
  breathingToggle: string;
  playingStatus: string;
  pauseStatus: string;

  // WebAR
  webarHeaderTag: string;
  webarTitle: string;
  webarSubtitle: string;
  viewInSpaceBtn: string;
  capturePhotoAR: string;
  recordVideoAR: string;
  scanToTest: string;
  scanInstructions: string;
  instantARUrl: string;
  copyBtn: string;
  copiedBtn: string;
  iframeEmbed: string;

  // Product AR
  productARHeaderTag: string;
  productARTitle: string;
  productARSubtitle: string;
  previewWidgetTitle: string;
  skuLabel: string;
  colorVariantsLabel: string;
  buyNowBtn: string;
  integrationTitle: string;
  integrationSubtitle: string;
  copyScriptBtn: string;
  platformsLabel: string;
  viewInYourRoom: string;
  jsCodeIntegration: string;

  // Digital Twin
  digitalTwinHeaderTag: string;
  digitalTwinTitle: string;
  digitalTwinSubtitle: string;
  passportTag: string;
  verifiedAsset: string;
  assetIDLabel: string;
  categoryLabel: string;
  dimensionsLabel: string;
  weightLabel: string;
  materialsLabel: string;
  createdAtLabel: string;
  authorLabel: string;
  auditTitle: string;
  printTagBtn: string;
  dtHistory1: string; dtHistory2: string; dtHistory3: string;
  qrPhysicalTitle: string; qrPhysicalDesc: string;

  // Gallery
  galleryHeaderTag: string;
  galleryTitle: string;
  gallerySubtitle: string;
  newModelBtn: string;
  modelsCreatedStat: string;
  webarExpStat: string;
  totalViewsStat: string;
  glbDownloadsStat: string;
  modify3DBtn: string;

  // Modals
  magicModalTitle: string;
  magicModalSubtitle: string;
  magicSuccessTitle: string;
  magicSuccessSubtitle: string;
  magicProcessing: string;
  magicOpenStudio: string;
  magicStep1: string; magicStep2: string; magicStep3: string;
  magicStep4: string; magicStep5: string; magicStep6: string;
  magicStep7: string; magicStep8: string; magicStep9: string;
  aiAssistantModalTitle: string;
  aiAssistantSubtitle: string;
  aiInputPlaceholder: string;
  aiPromptLabel: string;
  suggestionsTitle: string;
  appliedHistoryTitle: string;
  aiPromptSample1: string; aiPromptSample2: string; aiPromptSample3: string; aiPromptSample4: string;
  webOptimizerTitle: string;
  webOptimizerSubtitle: string;
  originalModelLabel: string;
  optimizedModelLabel: string;
  lodLevelLabel: string;
  lod0: string; lod1: string; lod2: string;
  applyOptBtn: string;
  optApplied: string;
  exportModalTitle: string;
  exportModalSubtitle: string;
  downloadBtn: string;
  exportRecommended: string; exportAppleAR: string; exportWeb: string;
  exportCAD: string; exportBlender: string; export3DPrint: string;
  exportGenerating: string; exportAction: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  fr: {
    logoSub: 'IA Photo → 3D Cinématique → Instant WebAR',
    brandTag: 'WEBAR',

    navHero: 'Accueil',
    navUpload: 'Import Photos',
    navReconstruct: 'Reconstruction IA',
    navStudio: 'Studio 3D & Cinema',
    navWebAR: 'WebAR Instant',
    navProductAR: 'Mode Produit AR',
    navDigitalTwin: 'Jumeau Numérique',
    navGallery: 'Galerie',
    privacyDefault: 'Privé par défaut',
    gpuAccelerated: 'GPU Accéléré',
    tryDemo: 'Essayer Démo',
    magic3DBtn: 'MAGIC 3D',

    heroPill: 'Studio IA Tout-en-un • Photo → 3D → Cinema → WebAR',
    heroTitle1: 'Transformez vos photos en',
    heroTitleHighlight: 'modèles 3D cinématographiques.',
    heroSubtitle: 'Créez, animez et placez vos modèles 3D dans le monde réel grâce au WebAR instantané, directement depuis votre navigateur sans aucune application à installer.',
    btnCreate3D: 'Créer mon modèle 3D',
    btnTryWebAR: 'Essayer le WebAR',
    btnWatchDemo: 'Voir une démonstration',
    badgeFPS: 'Rendu 60 FPS WebGL & WebXR',
    badgePrivacy: '100% Confidentialité Vos fichiers protégés',
    badgeExport: 'Export GLB/USDZ E-Commerce ready',
    liveViewport: 'Live Viewport',
    meshPolyCount: 'Maillage PBR 145K poly',
    presetHollywood: 'Preset: Hollywood Cinema',
    openStudioBtn: 'Ouvrir Studio',
    fpsLabel: 'FPS: 60 | Shaders: WebGL 2.0',
    dragRotate: 'Glissez pour pivoter 360°',
    pipelineTitle: 'Le Parcours Ultra-Simple : Photo → WebAR',
    pipelineSubtitle: 'Aucune compétence 3D requise. L\'intelligence artificielle gère tout.',
    step01Title: 'Photo', step01Desc: 'Prenez 5 à 80 photos de votre objet sous tous ses angles.',
    step02Title: 'Reconstruction 3D', step02Desc: 'L\'IA analyse la profondeur et génère un maillage 3D précis.',
    step03Title: 'Texture Réaliste', step03Desc: 'Cartographie PBR automatique, normal map & metallic.',
    step04Title: 'Animation & Cinema', step04Desc: 'Éclairage Hollywood & mouvements de caméra cinématiques.',
    step05Title: 'WebAR Instantané', step05Desc: 'Visualisez le modèle 3D dans le monde réel via votre smartphone.',

    uploadHeaderTag: 'Étape 1 : Acquisition d\'images',
    uploadHeaderTitle: 'Importez vos photos pour la 3D',
    uploadHeaderSubtitle: 'Glissez vos clichés ou utilisez la caméra de votre appareil (Support JPG, PNG, WEBP, HEIC).',
    loadDemoPhotos: 'Charger Démo (6 Photos)',
    modeMagic3D: 'Mode Magic 3D',
    dropzoneTitle: 'Glissez-déposez vos photos ici',
    dropzoneSubtitle: 'Ou cliquez pour parcourir les fichiers de votre appareil. Recommandé : 20 à 80 photos à 360° pour un maillage ultra-précis.',
    takeWithCamera: 'Prendre directement avec la caméra smartphone',
    capturing: 'Capture en cours...',
    importedPhotos: 'Photos importées',
    deleteAll: 'Tout supprimer',
    launchReconstructBtn: 'Lancer la Reconstruction 3D IA',
    aiDiagnostic: 'Diagnostique IA',
    photoQuality: 'Qualité des photos',
    qualityPending: 'Importez au moins 5 photos pour lancer la reconstruction.',
    qualitySufficient: 'Qualité suffisante pour le Mode Rapide / Standard.',
    qualityExcellent: 'Qualité Excellente ! Couverture 360° optimale détectée.',
    guideTitle: 'Guide pour un modèle 3D parfait',
    guide1: 'Prendre 20 à 80 photos en tournant progressivement autour de l\'objet à 360°.',
    guide2: 'Distance constante : conservez la même distance entre votre appareil et le sujet.',
    guide3: 'Lumière homogène : évitez les ombres projetées trop dures ou le contre-jour direct.',
    guide4: 'Stabilité : évitez que l\'objet ne bouge ou ne se déforme entre deux clichés.',

    // Reconstruction
    reconstructHeaderTag: 'Étape 2 : Reconstruction 3D IA',
    reconstructTitle: 'Moteur de Reconstruction Tridimensionnelle IA',
    reconstructSubtitle: 'Sélectionnez le mode de traitement adapté à vos photos.',
    modeFastTitle: 'Mode Rapide', modeFastDesc: 'Génération instantanée 3D rapide',
    modeStandardTitle: 'Mode Standard', modeStandardDesc: 'Équilibre parfait vitesse / précision',
    modeProTitle: 'Mode Pro', modeProDesc: 'Haute fidélité géométrique & maillage dense',
    modeCinematicTitle: 'Mode Cinématique', modeCinematicDesc: 'Priorité aux textures PBR et reflets',
    modeObjectTitle: 'Mode Objet', modeObjectDesc: 'Optimisé produits, meubles et prototypes',
    modeCharacterTitle: 'Mode Personnage', modeCharacterDesc: 'Optimisé vêtements, silhouettes et corps',
    badge1Photo: '1 Photo', badge5_20Photos: '5-20 Photos', badge20_80Photos: '20-80 Photos',
    badgeUltraRealism: 'Ultra Réalisme', badgeECommerce: 'E-Commerce', badgeAvatar3D: 'Avatar 3D',
    synthesisTitle: 'Pipeline de Synthèse Néurale',
    globalProgress: 'Progression globale',
    launchReconstructAction: 'Lancer la Reconstruction 3D',
    processingAI: 'Traitement IA en cours...',
    executionLogs: 'LOGS D\'EXÉCUTION DU CALCULATEUR NEURAL',
    disclaimer: 'Avertissement : La reconstruction 3D IA est optimisée pour le rendu visuel, le marketing, le e-commerce et l\'animation cinématique. Elle ne doit pas être présentée comme une numérisation médicalement ou scientifiquement exacte.',
    completedStatus: 'Terminé',
    calculatingStatus: 'Calcul en cours...',
    waitingStatus: 'En attente',
    step06Title: 'Optimisation WebAR LOD', step06Desc: 'Réduction des mضلعات Draco',
    step07Title: 'Exportation GLB / USDZ', step07Desc: 'Intégration du moteur cinématique',

    // Studio 3D Main
    studioTitleTag: 'PRO 3D STUDIO',
    aiAssistantBtn: 'Assistant IA',
    webOptimizerBtn: 'Optimiseur Web',
    viewInWebARBtn: 'VOIR EN WEBAR',
    exportBtn: 'Exporter',
    renderedPBR: 'Rendu PBR',
    wireframeMode: 'Wireframe',
    solidMode: 'Solide',
    tabMaterials: 'Matériaux',
    tabLighting: 'Éclairage',
    tabCamera: 'Caméra',
    tabAnimation: 'Animation',
    presetLabel: 'Préréglage',

    // Material Studio
    materialStudioTitle: 'Material Studio & Textures PBR',
    aiTextureBadge: 'IA TEXTURE 4K',
    presetMaterials: 'Presets de Matériaux',
    matRealistic: 'Réaliste PBR',
    matCinematic: 'Cinématique',
    matDarkCinema: 'Dark Cinema',
    matSciFi: 'Sci-Fi Néon',
    matLuxury: 'Or & Luxe',
    matStudio: 'Studio Produit',
    matCartoon: 'Toon Shading',
    matHolographic: 'Hologramme',
    metallicSlider: 'Métallique',
    roughnessSlider: 'Rugosité',
    normalMapSlider: 'Intensité Normal Map',
    mainColorTint: 'Teinte Principale',
    wireframeToggle: 'Mode Fil de Fer (Wireframe)',

    // Cinematic Engine
    cinematicEngineTitle: 'Cinematic Engine & Éclairage',
    studioLightingBadge: 'ÉCLAIRAGE STUDIO',
    presetLighting: 'Presets d\'Éclairage Cinématographique',
    lightHollywood: 'Hollywood Cinema',
    lightCyberpunk: 'Cyberpunk Néon',
    lightLuxury: 'Luxury Warm',
    lightDarkCinema: 'Dark Cinema',
    lightSciFi: 'Sci-Fi Hangar',
    lightGoldenHour: 'Golden Hour Sunset',
    lightStudio: 'Soft Studio Clean',
    lightDocumentary: 'Documentaire HD',
    keyLightLabel: 'Key Light (Lumière Principale)',
    fillLightLabel: 'Fill Light (Lumière d\'Appoint)',
    rimLightLabel: 'Rim Light (Contre-Jour Silhouetté)',
    softShadowsToggle: 'Ombre Adoucie PCF Soft Shadows',

    // Camera Director
    cameraDirectorTitle: 'Camera Director & Mouvements',
    hollywoodCamBadge: 'CAMÉRA HOLLYWOOD',
    presetCameraMoves: 'Mouvements de Caméra Prédéfinis',
    moveOrbit: 'Cinematic Orbit', moveOrbitDesc: 'Rotation fluide à 360° autour du sujet',
    moveHero: 'Hero Upward Shot', moveHeroDesc: 'Montée dramatique avec contre-plongée',
    moveProduct: 'Product Focus Zoom', moveProductDesc: 'Zoom lent commercial sur les détails',
    moveDramatic: 'Dramatic Push-In', moveDramaticDesc: 'Avancée constante avec flou d\'arrière-plan',
    moveShowcase: '360° Showcase', moveShowcaseDesc: 'Présentation complète 3D pour e-commerce',
    moveManual: 'Caméra Manuelle', moveManualDesc: 'Contrôle utilisateur libre au pointeur',
    focalLengthLabel: 'Focale de l\'Objectif',
    focal24: '24mm (Grand Angle)',
    focal35: '35mm (Documentaire)',
    focal50: '50mm (Perspective Humaine)',
    focal85: '85mm (Portrait & Hero)',
    focal135: '135mm (Téléobjectif Cinema)',
    dofLabel: 'Profondeur de Champ (DOF)',
    apertureLabel: 'Ouverture (Aperture)',
    focusDistLabel: 'Distance de Mise au Point',

    // Animation Studio
    animationStudioTitle: 'Animation IA & Timeline Cinématique',
    aiAnimatorBadge: 'AI ANIMATION',
    autoSpinToggle: 'Rotation Automatique 360°',
    spinSpeedLabel: 'Vitesse de rotation',
    floatingToggle: 'Animation de Flottement Levitation',
    floatAmpLabel: 'Amplitude de Lévitation',
    breathingToggle: 'Animation Respiratoire (Breathing Avatar)',
    playingStatus: 'LECTURE EN COURS',
    pauseStatus: 'TIMELINE PAUSE',

    // WebAR
    webarHeaderTag: 'Section WebAR Instantané',
    webarTitle: 'Visualisez dans votre Environnement Réel',
    webarSubtitle: 'WebAR instantané sans aucune application. Scannez le QR Code depuis votre smartphone (iOS / Android).',
    viewInSpaceBtn: 'VOIR DANS VOTRE ESPACE (AR)',
    capturePhotoAR: 'Capture Photo AR',
    recordVideoAR: 'Enregistrer Vidéo AR',
    scanToTest: 'Scannez pour tester le WebAR',
    scanInstructions: 'Pointez la caméra de votre smartphone iOS ou Android sur le QR Code pour placer l\'objet dans votre pièce.',
    instantARUrl: 'URL AR Instantanée :',
    copyBtn: 'Copier',
    copiedBtn: 'Copié !',
    iframeEmbed: 'Intégration Iframe Site / E-Commerce :',

    // Product AR
    productARHeaderTag: 'Mode AR Product (E-Commerce Studio)',
    productARTitle: 'Transformez votre Produit en Expérience d\'Achat WebAR',
    productARSubtitle: 'Permettez à vos clients d\'essayer vos meubles, chaussures et équipements chez eux avant d\'acheter.',
    previewWidgetTitle: 'Aperçu Widget E-Commerce Client',
    skuLabel: 'Réf SKU:',
    colorVariantsLabel: 'Variantes de Couleur PBR :',
    buyNowBtn: 'Acheter maintenant — Livré avec AR',
    integrationTitle: 'Intégration Boutique en 1-Clic',
    integrationSubtitle: 'Copiez ce snippet d\'intégration pour ajouter le bouton WebAR instantané sur Shopify, WooCommerce ou PrestaShop.',
    copyScriptBtn: 'Copier Script',
    platformsLabel: 'Compatible Plateformes :',
    viewInYourRoom: 'Voir chez vous (WebAR)',
    jsCodeIntegration: 'Code d\'intégration JavaScript / Web Component',

    // Digital Twin
    digitalTwinHeaderTag: 'Mode Digital Twin (Jumeau Numérique Certifié)',
    digitalTwinTitle: 'Passeport 3D & Métadonnées d\'Actif Réel',
    digitalTwinSubtitle: 'Associez à chaque objet physique son double numérique complet certifié avec historique et dimensions.',
    passportTag: 'PASSEPORT NUMÉRIQUE CERTIFIÉ',
    verifiedAsset: 'ACTIF VÉRIFIÉ',
    assetIDLabel: 'ID ACTIF:',
    categoryLabel: 'Catégorie',
    dimensionsLabel: 'Dimensions (W x H x D)',
    weightLabel: 'Poids Réel',
    materialsLabel: 'Matériaux Principaux',
    createdAtLabel: 'Date de Synthèse',
    authorLabel: 'Auteur & Editeur',
    auditTitle: 'Historique d\'Audit & Modifications',
    printTagBtn: 'Imprimer Étiquette Jumeau Numérique (PDF)',
    dtHistory1: 'Création du Passeport Jumeau Numérique 3D v2.4',
    dtHistory2: 'Scan NeRF & Cartographie des textures PBR 4K',
    dtHistory3: 'Maillage validé & Optimisation WebAR mobile',
    qrPhysicalTitle: 'Étiquette Physique QR Jumeau Numérique',
    qrPhysicalDesc: 'Imprimez cette étiquette et collez-la sur le produit réel pour accéder instantanément au modèle 3D et WebAR.',

    // Gallery
    galleryHeaderTag: 'Bibliotèque Personnelle',
    galleryTitle: 'MY 3D MODELS — Tableau de Bord',
    gallerySubtitle: 'Gérez, prévisualisez, exportez et partagez vos créations 3D cinématographiques.',
    newModelBtn: 'Nouveau Modèle 3D',
    modelsCreatedStat: 'Modèles Créés',
    webarExpStat: 'Expériences WebAR',
    totalViewsStat: 'Vues WebAR Totales',
    glbDownloadsStat: 'Téléchargements GLB',
    modify3DBtn: 'Modifier 3D',

    // Modals
    magicModalTitle: 'MODE MAGIC 3D AUTOMATIQUE',
    magicModalSubtitle: '1-Clic : Photos → Reconstruction → Cinema → WebAR',
    magicSuccessTitle: '"Votre modèle 3D cinématographique est prêt."',
    magicSuccessSubtitle: 'Toutes les étapes ont été exécutées avec succès.',
    magicProcessing: 'Traitement IA Magique en cours...',
    magicOpenStudio: 'Ouvrir dans le Studio & Voir en WebAR',
    magicStep1: '01. Importation & Anonymisation des photos',
    magicStep2: '02. Détection IA du sujet & Masque de profondeur',
    magicStep3: '03. Reconstruction 3D du maillage haute fidélité',
    magicStep4: '04. Cartographie des textures PBR 4K',
    magicStep5: '05. Génération de l\'éclairage cinématographique Studio',
    magicStep6: '06. Configuration des mouvements de caméra Hollywood',
    magicStep7: '07. Animation de lévitation & Spin 360°',
    magicStep8: '08. Optimisation WebAR (Draco Mesh Compression)',
    magicStep9: '09. Génération du QR Code & URL de partage WebAR',
    aiAssistantModalTitle: 'PHOTO2CINE AI Assistant',
    aiAssistantSubtitle: 'Assistant vocal et textuel pour le studio 3D',
    aiInputPlaceholder: 'Ex: "Rends la texture dorée et ajoute un éclairage Hollywood"...',
    aiPromptLabel: 'Exprimez votre intention en langage naturel :',
    suggestionsTitle: 'Suggestions de Commandes IA :',
    appliedHistoryTitle: 'Historique des Instructions Appliquées :',
    aiPromptSample1: 'Transforme ce modèle en objet métallique avec éclairage Cyberpunk.',
    aiPromptSample2: 'Fais une scène cinématique sombre avec lumière rim rose néon.',
    aiPromptSample3: 'Prépare et optimise ce modèle pour le WebAR mobile.',
    aiPromptSample4: 'Fais une présentation produit de 10 secondes avec rotation orbitale.',
    webOptimizerTitle: 'WEB OPTIMIZER 3D',
    webOptimizerSubtitle: 'Optimisation automatique des polymères et textures WebAR',
    originalModelLabel: 'Modèle Original',
    optimizedModelLabel: 'Optimisé WebAR (Draco)',
    lodLevelLabel: 'Niveau de Détail (LOD) :',
    lod0: 'LOD 0 (Haute Définition)',
    lod1: 'LOD 1 (Web & 4G)',
    lod2: 'LOD 2 (Mobile 3G / Low GPU)',
    applyOptBtn: 'Appliquer l\'Optimisation Draco & Compression',
    optApplied: 'Optimisation Appliquée !',
    exportModalTitle: 'EXPORTATION DU MODÈLE 3D',
    exportModalSubtitle: 'Téléchargez dans tous les formats standards de l\'industrie',
    downloadBtn: 'Exporter',
    exportRecommended: 'RECOMMANDÉ',
    exportAppleAR: 'APPLE AR',
    exportWeb: 'WEB',
    exportCAD: 'CAD / 3D',
    exportBlender: 'BLENDER / UNITY',
    export3DPrint: 'IMPRESSION 3D',
    exportGenerating: 'Génération...',
    exportAction: 'Exporter'
  },

  en: {
    logoSub: 'AI Photo → Cinematic 3D → Instant WebAR',
    brandTag: 'WEBAR',

    navHero: 'Home',
    navUpload: 'Upload Photos',
    navReconstruct: 'AI Reconstruction',
    navStudio: '3D Studio & Cinema',
    navWebAR: 'Instant WebAR',
    navProductAR: 'AR Product Mode',
    navDigitalTwin: 'Digital Twin',
    navGallery: 'Gallery',
    privacyDefault: 'Private by default',
    gpuAccelerated: 'GPU Accelerated',
    tryDemo: 'Try Demo',
    magic3DBtn: 'MAGIC 3D',

    heroPill: 'All-in-one AI Studio • Photo → 3D → Cinema → WebAR',
    heroTitle1: 'Transform your photos into',
    heroTitleHighlight: 'cinematic 3D models.',
    heroSubtitle: 'Create, animate and place your 3D models into the real world with instant WebAR, straight from your browser without installing any mobile app.',
    btnCreate3D: 'Create My 3D Model',
    btnTryWebAR: 'Try WebAR',
    btnWatchDemo: 'Watch Demo',
    badgeFPS: '60 FPS Rendering WebGL & WebXR',
    badgePrivacy: '100% Privacy Your Files Protected',
    badgeExport: 'GLB/USDZ Export E-Commerce ready',
    liveViewport: 'Live Viewport',
    meshPolyCount: 'PBR Mesh 145K poly',
    presetHollywood: 'Preset: Hollywood Cinema',
    openStudioBtn: 'Open Studio',
    fpsLabel: 'FPS: 60 | Shaders: WebGL 2.0',
    dragRotate: 'Drag to rotate 360°',
    pipelineTitle: 'Ultra-Simple Pipeline: Photo → WebAR',
    pipelineSubtitle: 'No 3D skills required. Artificial intelligence handles everything.',
    step01Title: 'Photo', step01Desc: 'Take 5 to 80 photos of your object from all angles.',
    step02Title: '3D Reconstruction', step02Desc: 'AI analyzes depth and generates an accurate 3D mesh.',
    step03Title: 'Realistic Texture', step03Desc: 'Automatic PBR mapping, normal map & metallic.',
    step04Title: 'Animation & Cinema', step04Desc: 'Hollywood lighting & cinematic camera moves.',
    step05Title: 'Instant WebAR', step05Desc: 'View your 3D model in the real world on your smartphone.',

    uploadHeaderTag: 'Step 1: Image Acquisition',
    uploadHeaderTitle: 'Upload Your Photos for 3D',
    uploadHeaderSubtitle: 'Drag your shots or use your device camera (Supports JPG, PNG, WEBP, HEIC).',
    loadDemoPhotos: 'Load Demo (6 Photos)',
    modeMagic3D: 'Magic 3D Mode',
    dropzoneTitle: 'Drag & Drop Your Photos Here',
    dropzoneSubtitle: 'Or click to browse files on your device. Recommended: 20 to 80 photos at 360° for an ultra-precise mesh.',
    takeWithCamera: 'Take photos directly with smartphone camera',
    capturing: 'Capturing...',
    importedPhotos: 'Imported Photos',
    deleteAll: 'Delete All',
    launchReconstructBtn: 'Launch AI 3D Reconstruction',
    aiDiagnostic: 'AI Diagnostics',
    photoQuality: 'Photo Quality',
    qualityPending: 'Upload at least 5 photos to start reconstruction.',
    qualitySufficient: 'Sufficient quality for Fast / Standard Mode.',
    qualityExcellent: 'Excellent Quality! Optimal 360° coverage detected.',
    guideTitle: 'Guide for a Perfect 3D Model',
    guide1: 'Take 20 to 80 photos while rotating around the object 360°.',
    guide2: 'Constant distance: maintain uniform distance between camera and subject.',
    guide3: 'Homogeneous light: avoid harsh shadows or direct backlighting.',
    guide4: 'Stability: prevent object movement or deformation between shots.',

    reconstructHeaderTag: 'Step 2: AI 3D Reconstruction',
    reconstructTitle: 'AI Tridimensional Reconstruction Engine',
    reconstructSubtitle: 'Select the processing mode suited to your photos.',
    modeFastTitle: 'Fast Mode', modeFastDesc: 'Instant fast 3D generation',
    modeStandardTitle: 'Standard Mode', modeStandardDesc: 'Perfect speed / precision balance',
    modeProTitle: 'Pro Mode', modeProDesc: 'High geometric fidelity & dense mesh',
    modeCinematicTitle: 'Cinematic Mode', modeCinematicDesc: 'Priority on PBR textures and reflections',
    modeObjectTitle: 'Object Mode', modeObjectDesc: 'Optimized for products, furniture and prototypes',
    modeCharacterTitle: 'Character Mode', modeCharacterDesc: 'Optimized for clothes, silhouettes and avatars',
    badge1Photo: '1 Photo', badge5_20Photos: '5-20 Photos', badge20_80Photos: '20-80 Photos',
    badgeUltraRealism: 'Ultra Realism', badgeECommerce: 'E-Commerce', badgeAvatar3D: '3D Avatar',
    synthesisTitle: 'Neural Synthesis Pipeline',
    globalProgress: 'Global progress',
    launchReconstructAction: 'Launch 3D Reconstruction',
    processingAI: 'Processing AI...',
    executionLogs: 'NEURAL COMPUTER EXECUTION LOGS',
    disclaimer: 'Warning: AI 3D reconstruction is optimized for visual rendering, marketing, e-commerce, and cinematic animation. It should not be presented as a medical or scientific scan.',
    completedStatus: 'Completed',
    calculatingStatus: 'Calculating...',
    waitingStatus: 'Waiting',
    step06Title: 'WebAR LOD Optimization', step06Desc: 'Draco mesh decimation',
    step07Title: 'GLB / USDZ Export Finalization', step07Desc: 'Cinematic engine integration',

    // Studio 3D Main
    studioTitleTag: 'PRO 3D STUDIO',
    aiAssistantBtn: 'AI Assistant',
    webOptimizerBtn: 'Web Optimizer',
    viewInWebARBtn: 'VIEW IN WEBAR',
    exportBtn: 'Export',
    renderedPBR: 'PBR Render',
    wireframeMode: 'Wireframe',
    solidMode: 'Solid',
    tabMaterials: 'Materials',
    tabLighting: 'Lighting',
    tabCamera: 'Camera',
    tabAnimation: 'Animation',
    presetLabel: 'Preset',

    // Material Studio
    materialStudioTitle: 'Material Studio & PBR Textures',
    aiTextureBadge: 'AI 4K TEXTURE',
    presetMaterials: 'Material Presets',
    matRealistic: 'Realistic PBR',
    matCinematic: 'Cinematic',
    matDarkCinema: 'Dark Cinema',
    matSciFi: 'Sci-Fi Neon',
    matLuxury: 'Gold & Luxury',
    matStudio: 'Product Studio',
    matCartoon: 'Toon Shading',
    matHolographic: 'Hologram',
    metallicSlider: 'Metallic',
    roughnessSlider: 'Roughness',
    normalMapSlider: 'Normal Map Intensity',
    mainColorTint: 'Main Color Tint',
    wireframeToggle: 'Wireframe Mode',

    // Cinematic Engine
    cinematicEngineTitle: 'Cinematic Engine & Lighting',
    studioLightingBadge: 'STUDIO LIGHTING',
    presetLighting: 'Cinematic Lighting Presets',
    lightHollywood: 'Hollywood Cinema',
    lightCyberpunk: 'Cyberpunk Neon',
    lightLuxury: 'Luxury Warm',
    lightDarkCinema: 'Dark Cinema',
    lightSciFi: 'Sci-Fi Hangar',
    lightGoldenHour: 'Golden Hour Sunset',
    lightStudio: 'Soft Studio Clean',
    lightDocumentary: 'Documentary HD',
    keyLightLabel: 'Key Light',
    fillLightLabel: 'Fill Light',
    rimLightLabel: 'Rim Light (Silhouette)',
    softShadowsToggle: 'Soft PCF Shadows',

    // Camera Director
    cameraDirectorTitle: 'Camera Director & Moves',
    hollywoodCamBadge: 'HOLLYWOOD CAM',
    presetCameraMoves: 'Predefined Camera Movements',
    moveOrbit: 'Cinematic Orbit', moveOrbitDesc: 'Smooth 360° rotation around subject',
    moveHero: 'Hero Upward Shot', moveHeroDesc: 'Dramatic low-angle rise move',
    moveProduct: 'Product Focus Zoom', moveProductDesc: 'Slow commercial detail zoom',
    moveDramatic: 'Dramatic Push-In', moveDramaticDesc: 'Steady camera advancement with blur',
    moveShowcase: '360° Showcase', moveShowcaseDesc: 'Full 3D showcase for e-commerce',
    moveManual: 'Manual Control', moveManualDesc: 'Free orbit camera pointer navigation',
    focalLengthLabel: 'Focal Length',
    focal24: '24mm (Wide Angle)',
    focal35: '35mm (Documentary)',
    focal50: '50mm (Human Eye)',
    focal85: '85mm (Portrait & Hero)',
    focal135: '135mm (Cinema Telephoto)',
    dofLabel: 'Depth of Field (DOF)',
    apertureLabel: 'Aperture (f-stop)',
    focusDistLabel: 'Focus Distance',

    // Animation Studio
    animationStudioTitle: 'AI Animation & Timeline',
    aiAnimatorBadge: 'AI ANIMATION',
    autoSpinToggle: 'Auto 360° Spin',
    spinSpeedLabel: 'Spin speed',
    floatingToggle: 'Levitation Hover Animation',
    floatAmpLabel: 'Levitation Amplitude',
    breathingToggle: 'Breathing Avatar Animation',
    playingStatus: 'PLAYING',
    pauseStatus: 'TIMELINE PAUSED',

    // WebAR
    webarHeaderTag: 'Instant WebAR Section',
    webarTitle: 'View in Your Real Environment',
    webarSubtitle: 'Instant WebAR without installing any app. Scan the QR Code from your smartphone (iOS / Android).',
    viewInSpaceBtn: 'VIEW IN YOUR SPACE (AR)',
    capturePhotoAR: 'Capture AR Photo',
    recordVideoAR: 'Record AR Video',
    scanToTest: 'Scan to Test WebAR',
    scanInstructions: 'Point your iOS or Android smartphone camera at the QR Code to place the object in your room.',
    instantARUrl: 'Instant AR URL:',
    copyBtn: 'Copy',
    copiedBtn: 'Copied!',
    iframeEmbed: 'Embed Iframe Snippet:',

    // Product AR
    productARHeaderTag: 'AR Product Mode (E-Commerce Studio)',
    productARTitle: 'Turn Your Product Into an AR Shopping Experience',
    productARSubtitle: 'Allow customers to try furniture, shoes and equipment at home before buying.',
    previewWidgetTitle: 'E-Commerce Widget Customer Preview',
    skuLabel: 'SKU Ref:',
    colorVariantsLabel: 'PBR Color Variants:',
    buyNowBtn: 'Buy Now — Delivered with AR',
    integrationTitle: '1-Click Store Integration',
    integrationSubtitle: 'Copy this snippet to add the instant WebAR button to Shopify, WooCommerce or PrestaShop.',
    copyScriptBtn: 'Copy Script',
    platformsLabel: 'Compatible Platforms:',
    viewInYourRoom: 'View in your room (WebAR)',
    jsCodeIntegration: 'JavaScript / Web Component Integration Snippet',

    // Digital Twin
    digitalTwinHeaderTag: 'Digital Twin Mode (Certified 3D Passport)',
    digitalTwinTitle: '3D Passport & Real Asset Metadata',
    digitalTwinSubtitle: 'Associate each physical object with its complete certified digital twin, history and dimensions.',
    passportTag: 'CERTIFIED DIGITAL PASSPORT',
    verifiedAsset: 'VERIFIED ASSET',
    assetIDLabel: 'ASSET ID:',
    categoryLabel: 'Category',
    dimensionsLabel: 'Dimensions (W x H x D)',
    weightLabel: 'Real Weight',
    materialsLabel: 'Primary Materials',
    createdAtLabel: 'Synthesis Date',
    authorLabel: 'Author & Publisher',
    auditTitle: 'Audit Trail & Change History',
    printTagBtn: 'Print Digital Twin Label (PDF)',
    dtHistory1: '3D Digital Twin Passport creation v2.4',
    dtHistory2: 'NeRF Scan & 4K PBR texture mapping',
    dtHistory3: 'Mesh validated & Mobile WebAR optimization',
    qrPhysicalTitle: 'Digital Twin Physical QR Label',
    qrPhysicalDesc: 'Print this label and attach it to the physical product for instant 3D & WebAR access.',

    // Gallery
    galleryHeaderTag: 'Personal Library',
    galleryTitle: 'MY 3D MODELS — Dashboard',
    gallerySubtitle: 'Manage, preview, export and share your cinematic 3D creations.',
    newModelBtn: 'New 3D Model',
    modelsCreatedStat: 'Models Created',
    webarExpStat: 'WebAR Experiences',
    totalViewsStat: 'Total WebAR Views',
    glbDownloadsStat: 'GLB Downloads',
    modify3DBtn: 'Edit 3D',

    // Modals
    magicModalTitle: 'AUTOMATED MAGIC 3D MODE',
    magicModalSubtitle: '1-Click: Photos → Reconstruction → Cinema → WebAR',
    magicSuccessTitle: '"Your cinematic 3D model is ready."',
    magicSuccessSubtitle: 'All steps executed successfully.',
    magicProcessing: 'Magic AI Processing in progress...',
    magicOpenStudio: 'Open in Studio & View in WebAR',
    magicStep1: '01. Photo import & anonymization',
    magicStep2: '02. AI Subject detection & depth mask',
    magicStep3: '03. High-fidelity 3D mesh reconstruction',
    magicStep4: '04. 4K PBR texture mapping',
    magicStep5: '05. Studio cinematic lighting generation',
    magicStep6: '06. Hollywood camera move setup',
    magicStep7: '07. Levitation animation & 360° spin',
    magicStep8: '08. WebAR optimization (Draco Compression)',
    magicStep9: '09. QR Code & WebAR share URL generation',
    aiAssistantModalTitle: 'PHOTO2CINE AI Assistant',
    aiAssistantSubtitle: 'Voice and text assistant for 3D studio',
    aiInputPlaceholder: 'Ex: "Make texture gold and add Hollywood lighting"...',
    aiPromptLabel: 'Express your intention in natural language:',
    suggestionsTitle: 'AI Command Suggestions:',
    appliedHistoryTitle: 'Applied Instructions History:',
    aiPromptSample1: 'Turn this model into a metallic object with Cyberpunk lighting.',
    aiPromptSample2: 'Create a moody cinematic scene with neon pink rim light.',
    aiPromptSample3: 'Prepare and optimize this model for mobile WebAR.',
    aiPromptSample4: 'Create a 10-second product showcase with orbit spin.',
    webOptimizerTitle: 'WEB OPTIMIZER 3D',
    webOptimizerSubtitle: 'Automatic Draco polygon reduction and WebAR texture compression',
    originalModelLabel: 'Original Model',
    optimizedModelLabel: 'WebAR Optimized (Draco)',
    lodLevelLabel: 'Level of Detail (LOD):',
    lod0: 'LOD 0 (High Definition)',
    lod1: 'LOD 1 (Web & 4G)',
    lod2: 'LOD 2 (Mobile 3G / Low GPU)',
    applyOptBtn: 'Apply Draco & Compression Optimization',
    optApplied: 'Optimization Applied!',
    exportModalTitle: '3D MODEL EXPORT',
    exportModalSubtitle: 'Download in all industry standard formats',
    downloadBtn: 'Export',
    exportRecommended: 'RECOMMENDED',
    exportAppleAR: 'APPLE AR',
    exportWeb: 'WEB',
    exportCAD: 'CAD / 3D',
    exportBlender: 'BLENDER / UNITY',
    export3DPrint: '3D PRINT',
    exportGenerating: 'Generating...',
    exportAction: 'Export'
  },

  ar: {
    logoSub: 'الذكاء الاصطناعي ← 3D سينمائي ← واقع معزز فوري',
    brandTag: 'واقع معزز',

    navHero: 'الرئيسية',
    navUpload: 'استيراد الصور',
    navReconstruct: 'إعادة البناء بالذكاء الاصطناعي',
    navStudio: 'استوديو السينما والـ 3D',
    navWebAR: 'واقع معزز فوري',
    navProductAR: 'وضع منتجات AR',
    navDigitalTwin: 'التوأم الرقمي',
    navGallery: 'المعرض',
    privacyDefault: 'خاص افتراضياً',
    gpuAccelerated: 'تسريع كرت الشاشة',
    tryDemo: 'تجربة العرض',
    magic3DBtn: 'النمذجة السحرية',

    heroPill: 'منصة الذكاء الاصطناعي الشاملة • صورة ← 3D ← سينما ← واقع معزز',
    heroTitle1: 'حوّل صورك إلى',
    heroTitleHighlight: 'نماذج ثلاثية الأبعاد سينمائية.',
    heroSubtitle: 'أنشئ، وحرّك، واعرض مجسماتك الـ 3D في العالم الحقيقي عبر الـ WebAR مباشرة من متصفحك دون الحاجة لتثبيت أي تطبيق.',
    btnCreate3D: 'إنشاء مجسم 3D',
    btnTryWebAR: 'تجربة الـ WebAR',
    btnWatchDemo: 'مشاهدة العرض التوضيحي',
    badgeFPS: 'عرض 60 إطار/ثانية WebGL & WebXR',
    badgePrivacy: 'خصوصية 100% ملفاتك محمية',
    badgeExport: 'تصدير جاهز للمتاجر GLB/USDZ',
    liveViewport: 'منفذ العرض المباشر',
    meshPolyCount: 'مجسم PBR بدقة 145 ألف مضلع',
    presetHollywood: 'إعداد سينما هوليوود',
    openStudioBtn: 'فتح الاستوديو',
    fpsLabel: 'إطار/ثانية: 60 | الشيدر: WebGL 2.0',
    dragRotate: 'اسحب للتدوير 360 درجة',
    pipelineTitle: 'مسار العمل البسيط: صورة ← واقع معزز',
    pipelineSubtitle: 'لا تتطلب مهارات 3D. الذكاء الاصطناعي يتكفل بكافة العمليات.',
    step01Title: 'التقاط الصور', step01Desc: 'التقط من 5 إلى 80 صورة للشيء من جميع الزوايا.',
    step02Title: 'إعادة البناء 3D', step02Desc: 'يحلل الذكاء الاصطناعي العمق وينشئ مجسماً دقيقاً.',
    step03Title: 'خامات واقعية', step03Desc: 'تطبيق خامات PBR وانعكاسات معدنية تلقائية.',
    step04Title: 'تحريك وسينما', step04Desc: 'إضاءة هوليوود وحركات كاميرا سينمائية.',
    step05Title: 'واقع معزز فوري', step05Desc: 'شاهد المجسم في العالم الحقيقي عبر هاتفك الذكي.',

    uploadHeaderTag: 'الخطوة 1 : التقاط الصور',
    uploadHeaderTitle: 'استورد صورك للتحويل إلى 3D',
    uploadHeaderSubtitle: 'اسحب الصور أو استخدم كاميرا جهازك (يدعم JPG, PNG, WEBP, HEIC).',
    loadDemoPhotos: 'تحميل صور تجريبية (6 صور)',
    modeMagic3D: 'الوضع السحري Magic 3D',
    dropzoneTitle: 'اسحب وأسقط صورك هنا',
    dropzoneSubtitle: 'أو انقر لتصفح الملفات على جهازك. الموصى به: 20 إلى 80 صورة بدائرة 360 درجة.',
    takeWithCamera: 'التقط مباشرة بكاميرا الهاتف',
    capturing: 'جاري الالتقاط...',
    importedPhotos: 'الصور المستوردة',
    deleteAll: 'حذف الكل',
    launchReconstructBtn: 'بدء إعادة البناء 3D بالذكاء الاصطناعي',
    aiDiagnostic: 'تشخيص الذكاء الاصطناعي',
    photoQuality: 'جودة الصور',
    qualityPending: 'استورد 5 صور على الأقل لبدء التوليد.',
    qualitySufficient: 'الجودة كافية للوضع السريع / القياسي.',
    qualityExcellent: 'جودة ممتازة! تم اكتشاف تغطية 360 درجة مثالية.',
    guideTitle: 'دليل النمذجة المثالية',
    guide1: 'التقط من 20 إلى 80 صورة أثناء الدوران حول الشيء بزاوية 360 درجة.',
    guide2: 'مسافة ثابتة: حافظ على نفس المسافة بين الكاميرا والشيء.',
    guide3: 'إضاءة متناسقة: تجنب الظلال الحادة أو الإضاءة الخلفية المباشرة.',
    guide4: 'الثبات: تجنب تحريك الشيء أو تغيير شكله بين اللقطات.',

    reconstructHeaderTag: 'الخطوة 2 : إعادة البناء الذكية',
    reconstructTitle: 'محرك إعادة البناء ثلاثي الأبعاد بالذكاء الاصطناعي',
    reconstructSubtitle: 'حدد وضع المعالجة المناسب لصورك.',
    modeFastTitle: 'الوضع السريع', modeFastDesc: 'توليد 3D سوري فوري',
    modeStandardTitle: 'الوضع القياسي', modeStandardDesc: 'توازن مثالي بين السرعة والدقة',
    modeProTitle: 'الوضع الاحترافي', modeProDesc: 'دقة هندسية عالية ومضلعات كثيفة',
    modeCinematicTitle: 'الوضع السينمائي', modeCinematicDesc: 'أولوية للخامات والانعكاسات',
    modeObjectTitle: 'وضع المنتجات', modeObjectDesc: 'مخصص للمنتجات والأثاث والنماذج',
    modeCharacterTitle: 'وضع الشخصيات', modeCharacterDesc: 'مخصص للملابس والأشخاص والمجسمات البشرية',
    badge1Photo: 'صورة واحدة', badge5_20Photos: '5-20 صورة', badge20_80Photos: '20-80 صورة',
    badgeUltraRealism: 'واقعية فائقة', badgeECommerce: 'تجارة إلكترونية', badgeAvatar3D: 'مجسم 3D',
    synthesisTitle: 'مسار التوليد العصبي',
    globalProgress: 'التقدم الإجمالي',
    launchReconstructAction: 'بدء التوليد ثلاثي الأبعاد',
    processingAI: 'جاري المعالجة الذكية...',
    executionLogs: 'سجلات معالجة الحساب العصبي',
    disclaimer: 'تنبيه: نمذجة الـ 3D بالذكاء الاصطناعي مخصصة للعرض البصري والتسويق والتجارة الإلكترونية والسينما. ولا يجب تقديمها كفحص طبي أو علمي دقيق.',
    completedStatus: 'اكتمل',
    calculatingStatus: 'جاري الحساب...',
    waitingStatus: 'في الانتظار',
    step06Title: 'تحسين تفاصيل WebAR', step06Desc: 'تقليل مضلعات شبكة Draco',
    step07Title: 'إنهاء تصدير GLB / USDZ', step07Desc: 'دمج المحرك السينمائي',

    // Studio 3D Main
    studioTitleTag: 'استوديو 3D الاحترافي',
    aiAssistantBtn: 'مساعد الذكاء الاصطناعي',
    webOptimizerBtn: 'محسن الويب',
    viewInWebARBtn: 'عرض بالواقع المعزز',
    exportBtn: 'تصدير',
    renderedPBR: 'عرض الخامات PBR',
    wireframeMode: 'الهيكل الشبكي',
    solidMode: 'صلب',
    tabMaterials: 'الخامات',
    tabLighting: 'الإضاءة',
    tabCamera: 'الكاميرا',
    tabAnimation: 'التحريك',
    presetLabel: 'الإعداد',

    // Material Studio
    materialStudioTitle: 'استوديو الخامات والـ PBR',
    aiTextureBadge: 'خامات 4K ذكية',
    presetMaterials: 'إعدادات الخامات الجاهزة',
    matRealistic: 'واقعي PBR',
    matCinematic: 'سينمائي',
    matDarkCinema: 'سينما داكنة',
    matSciFi: 'نيون الخيال العلمي',
    matLuxury: 'ذهب وفخامة',
    matStudio: 'استوديو المنتجات',
    matCartoon: 'كرتوني',
    matHolographic: 'هولوغرام',
    metallicSlider: 'المعدنية',
    roughnessSlider: 'الخشونة',
    normalMapSlider: 'شدة الخريطة العادية',
    mainColorTint: 'اللون الرئيسي',
    wireframeToggle: 'وضع الهيكل الشبكي Wireframe',

    // Cinematic Engine
    cinematicEngineTitle: 'المحرك السينمائي والإضاءة',
    studioLightingBadge: 'إضاءة الاستوديو',
    presetLighting: 'إعدادات الإضاءة السينمائية',
    lightHollywood: 'سينما هوليوود',
    lightCyberpunk: 'نيون سايببربانك',
    lightLuxury: 'فخامة دافئة',
    lightDarkCinema: 'سينما داكنة',
    lightSciFi: 'حظيرة الخيال العلمي',
    lightGoldenHour: 'غروب الشمس الذهبي',
    lightStudio: 'استوديو ناعم ونظيف',
    lightDocumentary: 'وثائقي عال الدقة',
    keyLightLabel: 'الإضاءة الرئيسية',
    fillLightLabel: 'الإضاءة التكميلية',
    rimLightLabel: 'إضاءة الحواف',
    softShadowsToggle: 'ظلال ناعمة PCF Soft Shadows',

    // Camera Director
    cameraDirectorTitle: 'مخرج الكاميرا والحركات',
    hollywoodCamBadge: 'كاميرا هوليوود',
    presetCameraMoves: 'حركات الكاميرا الجاهزة',
    moveOrbit: 'دوران سينمائي', moveOrbitDesc: 'دوران سلس 360 درجة حول المجسم',
    moveHero: 'لقطة بطولية تصاعدية', moveHeroDesc: 'صعود درامي بزاوي منخفضة',
    moveProduct: 'تركيز على تفاصيل المنتج', moveProductDesc: 'تقريب تجاري بطيء للتفاصيل',
    moveDramatic: 'اندفاع درامي', moveDramaticDesc: 'تقدم مستمر مع ضبابية الخلفية',
    moveShowcase: 'استعراض 360 درجة', moveShowcaseDesc: 'عرض شامل للمتاجر الإلكترونية',
    moveManual: 'تحكم يدوي', moveManualDesc: 'تحكم حر بالكاميرا عبر المؤشر',
    focalLengthLabel: 'البعد البؤري',
    focal24: '24 ملم (زاوية عريضة)',
    focal35: '35 ملم (وثائقي)',
    focal50: '50 ملم (رؤية بشرية)',
    focal85: '85 ملم (بورتريه)',
    focal135: '135 ملم (سينمائي بعيد)',
    dofLabel: 'عمق الميدان',
    apertureLabel: 'فتحة العدسة',
    focusDistLabel: 'مسافة التركيز البؤري',

    // Animation Studio
    animationStudioTitle: 'تحريك الذكاء الاصطناعي والجدول الزمني',
    aiAnimatorBadge: 'تحريك ذكي',
    autoSpinToggle: 'تدوير تلقائي 360 درجة',
    spinSpeedLabel: 'سرعة الدوران',
    floatingToggle: 'تأثير الطفو والرفع',
    floatAmpLabel: 'سعة الطفو',
    breathingToggle: 'تحريك التنفس الشخصي',
    playingStatus: 'جاري التشغيل',
    pauseStatus: 'موقف مؤقتاً',

    // WebAR
    webarHeaderTag: 'قسم الواقع المعزز الفوري',
    webarTitle: 'اعرض المجسم في بيئتك الحقيقية',
    webarSubtitle: 'واقع معزز فوري دون الحاجة لتطبيقات. امسح رمز الـ QR عبر هاتفك الذكي (iOS / Android).',
    viewInSpaceBtn: 'مشاهدة في مساحتك الحقيقية (AR)',
    capturePhotoAR: 'التقاط صورة AR',
    recordVideoAR: 'تسجيل فيديو AR',
    scanToTest: 'امسح الرمز للتجربة',
    scanInstructions: 'وجه كاميرا هاتفك الذكي نحو رمز الـ QR لوضع المنتج في غرفتك.',
    instantARUrl: 'رابط الـ AR الفوري:',
    copyBtn: 'نسخ',
    copiedBtn: 'تم النسخ!',
    iframeEmbed: 'كود التضمين للمواقع والمتاجر:',

    // Product AR
    productARHeaderTag: 'وضع منتجات AR (استوديو المتاجر)',
    productARTitle: 'حوّل منتجك إلى تجربة تسوق بالواقع المعزز',
    productARSubtitle: 'اسمك لعملائك بتجربة الأثاث والأحذية والمنتجات في منازلهم قبل الشراء.',
    previewWidgetTitle: 'معاينة أداة التجارة الإلكترونية للعميل',
    skuLabel: 'رمز المنتج SKU:',
    colorVariantsLabel: 'خيارات الألوان PBR:',
    buyNowBtn: 'شراء الآن — التوصيل مع AR',
    integrationTitle: 'ربط المتجر بنقرة واحدة',
    integrationSubtitle: 'انسخ هذا الكود لإضافة زر الواقع المعزز إلى منصة Shopify أو WooCommerce.',
    copyScriptBtn: 'نسخ الكود',
    platformsLabel: 'المنصات المدعومة:',
    viewInYourRoom: 'عرض في غرفتك (واقع معزز)',
    jsCodeIntegration: 'كود ربط جافاسكريبت / عنصر الويب',

    // Digital Twin
    digitalTwinHeaderTag: 'وضع التوأم الرقمي المعتمد',
    digitalTwinTitle: 'جواز السفر 3D وبيانات الأصل الحقيقي',
    digitalTwinSubtitle: 'أرفق بكل منتج حقيقي نسخته الرقمية المعتمدة مع السجل والأبعاد.',
    passportTag: 'جواز سفر رقمي معتمد',
    verifiedAsset: 'أصل موثق',
    assetIDLabel: 'معرف الأصل:',
    categoryLabel: 'الفئة',
    dimensionsLabel: 'الأبعاد (عرض × ارتفاع × عمق)',
    weightLabel: 'الوزن الحقيقي',
    materialsLabel: 'المواد الرئيسية',
    createdAtLabel: 'تاريخ التوليد',
    authorLabel: 'المؤلف والناشر',
    auditTitle: 'سجل التعديلات والتوافق',
    printTagBtn: 'طباعة بطاقة التوأم الرقمي (PDF)',
    dtHistory1: 'إنشاء جواز السفر الرقمي 3D الإصدار 2.4',
    dtHistory2: 'مسح NeRF ورسم خامات PBR 4K',
    dtHistory3: 'اعتماد الشبكة وتحسين الـ WebAR للهواتف',
    qrPhysicalTitle: 'بطاقة رمز الـ QR الفيزيائية للتوأم الرقمي',
    qrPhysicalDesc: 'اطبع هذه البطاقة وألصقها على المنتج الحقيقي للوصول الفوري للمجسم والواقع المعزز.',

    // Gallery
    galleryHeaderTag: 'المكتبة الشخصية',
    galleryTitle: 'نماذجي 3D — لوحة التحكم',
    gallerySubtitle: 'إدارة ومعاينة وتصدير ومشاركة إبداعاتك ثلاثية الأبعاد.',
    newModelBtn: 'نموذج 3D جديد',
    modelsCreatedStat: 'النماذج المنشأة',
    webarExpStat: 'تجارب WebAR',
    totalViewsStat: 'إجمالي المشاهدات',
    glbDownloadsStat: 'تنزيلات GLB',
    modify3DBtn: 'تعديل 3D',

    // Modals
    magicModalTitle: 'النمذجة السحرية التلقائية MAGIC 3D',
    magicModalSubtitle: 'نقرة واحدة: صور ← توليد ← سينما ← واقع معزز',
    magicSuccessTitle: '"نموذجك الثلاثي الأبعاد السينمائي جاهز."',
    magicSuccessSubtitle: 'تمت كافة الخطوات بنجاح تام.',
    magicProcessing: 'جاري المعالجة السحرية بالذكاء الاصطناعي...',
    magicOpenStudio: 'فتح في الاستوديو والعرض بالواقع المعزز',
    magicStep1: '01. استيراد وتأمين الصور',
    magicStep2: '02. كشف الموضوع وتحديد العمق',
    magicStep3: '03. إعادة بناء مجسم 3D عال الدقة',
    magicStep4: '04. رسم خامات PBR 4K',
    magicStep5: '05. توليد الإضاءة السينمائية',
    magicStep6: '06. ضبط حركات كاميرا هوليوود',
    magicStep7: '07. تحريك الطفو والدوران 360 درجة',
    magicStep8: '08. تحسين الواقع المعزز (ضغط Draco)',
    magicStep9: '09. إنشاء رمز الـ QR ورابط المشاركة',
    aiAssistantModalTitle: 'مساعد PHOTO2CINE الذكي',
    aiAssistantSubtitle: 'مساعد صوتی ونصي لاستوديو ה-3D',
    aiInputPlaceholder: 'مثال: "اجعل الخامة ذهبية وأضف إضاءة هوليوود"...',
    aiPromptLabel: 'عبّر عن طلبك باللغة الطبيعية:',
    suggestionsTitle: 'اقتراحات الأوامر الذكية:',
    appliedHistoryTitle: 'سجل التعليمات المنفذة:',
    aiPromptSample1: 'حوّل هذا المجسم إلى معدني مع إضاءة سايببربانك.',
    aiPromptSample2: 'أنشئ مشهداً سينمائياً داكناً مع إضاءة حواف وردية.',
    aiPromptSample3: 'جهز وحسّن هذا المجسم للواقع المعزز للهواتف.',
    aiPromptSample4: 'أنشئ عرضاً تجارياً للمنتج مدته 10 ثوانٍ مع دوران.',
    webOptimizerTitle: 'محسن الويب 3D',
    webOptimizerSubtitle: 'تحسين تلقائي للمضلعات وضغط الخامات للواقع المعزز',
    originalModelLabel: 'النموذج الأصلي',
    optimizedModelLabel: 'محسن للـ WebAR (Draco)',
    lodLevelLabel: 'مستوى التفاصيل (LOD):',
    lod0: 'LOD 0 (دقة عالية)',
    lod1: 'LOD 1 (ويب و 4G)',
    lod2: 'LOD 2 (جوال 3G / كرت ضعيف)',
    applyOptBtn: 'تطبيق ضغط Draco والتحسين',
    optApplied: 'تم تطبيق التحسين!',
    exportModalTitle: 'تصدير النموذج ثلاثي الأبعاد',
    exportModalSubtitle: 'تنزيل بكافة الصيغ القياسية في الصناعة',
    downloadBtn: 'تصدير',
    exportRecommended: 'موصى به',
    exportAppleAR: 'واقع معزز أبل',
    exportWeb: 'ويب',
    exportCAD: 'تصميم هندسي / 3D',
    exportBlender: 'بلندر / يونيتي',
    export3DPrint: 'طباعة 3D',
    exportGenerating: 'جاري التوليد...',
    exportAction: 'تصدير'
  },

  nl: {
    logoSub: 'AI Photo → Cinematic 3D → Instant WebAR',
    brandTag: 'WEBAR',

    navHero: 'Home',
    navUpload: 'Foto\'s Uploaden',
    navReconstruct: 'AI Reconstructie',
    navStudio: '3D Studio & Cinema',
    navWebAR: 'Directe WebAR',
    navProductAR: 'AR Product Modus',
    navDigitalTwin: 'Digitale Tweeling',
    navGallery: 'Bibliotheek',
    privacyDefault: 'Standaard privé',
    gpuAccelerated: 'GPU Versneld',
    tryDemo: 'Bekijk Demo',
    magic3DBtn: 'MAGIC 3D',

    heroPill: 'Alles-in-één AI Studio • Foto → 3D → Cinema → WebAR',
    heroTitle1: 'Transformeer je foto\'s in',
    heroTitleHighlight: 'cinematografische 3D-modellen.',
    heroSubtitle: 'Creëer, animeer en plaats je 3D-modellen in de echte wereld met directe WebAR, rechtstreeks vanuit je browser zonder app te installeren.',
    btnCreate3D: 'Maak Mijn 3D-Model',
    btnTryWebAR: 'Probeer WebAR',
    btnWatchDemo: 'Bekijk Video',
    badgeFPS: '60 FPS WebGL & WebXR Renders',
    badgePrivacy: '100% Privacy Je Bestanden Beveiligd',
    badgeExport: 'GLB/USDZ Export Klaar voor E-Commerce',
    liveViewport: 'Live Weergave',
    meshPolyCount: 'PBR Mesh 145K poly',
    presetHollywood: 'Preset: Hollywood Cinema',
    openStudioBtn: 'Open Studio',
    fpsLabel: 'FPS: 60 | Shaders: WebGL 2.0',
    dragRotate: 'Sleept om 360° te draaien',
    pipelineTitle: 'Ultra-Eenvoudige Pipeline: Foto → WebAR',
    pipelineSubtitle: 'Geen 3D-kennis vereist. Kunstmatige intelligentie regelt alles.',
    step01Title: 'Foto', step01Desc: 'Neem 5 tot 80 foto\'s van je object vanuit alle hoeken.',
    step02Title: '3D Reconstructie', step02Desc: 'AI analyseert diepte en genereert een nauwkeurige 3D mesh.',
    step03Title: 'Realistische Textuur', step03Desc: 'Automatische PBR mapping, normal map & metallic.',
    step04Title: 'Animatie & Cinema', step04Desc: 'Hollywood verlichting & cinematografische camerabewegingen.',
    step05Title: 'Directe WebAR', step05Desc: 'Bekijk je 3D-model in de echte wereld op je smartphone.',

    uploadHeaderTag: 'Stap 1: Afbeeldingen Verzamelen',
    uploadHeaderTitle: 'Upload Je Foto\'s voor 3D',
    uploadHeaderSubtitle: 'Sleep je foto\'s of gebruik de camera van je toestel (Ondersteunt JPG, PNG, WEBP, HEIC).',
    loadDemoPhotos: 'Laad Demo (6 Foto\'s)',
    modeMagic3D: 'Magic 3D Modus',
    dropzoneTitle: 'Sleep Je Foto\'s Hierheen',
    dropzoneSubtitle: 'Of klik om bestanden te selecteren. Aanbevolen: 20 tot 80 foto\'s 360° rondom.',
    takeWithCamera: 'Neem foto\'s rechtstreeks met je smartphone camera',
    capturing: 'Opnemen...',
    importedPhotos: 'Geïmporteerde Foto\'s',
    deleteAll: 'Alles Wisssen',
    launchReconstructBtn: 'Start AI 3D-Reconstructie',
    aiDiagnostic: 'AI Diagnose',
    photoQuality: 'Fotokwaliteit',
    qualityPending: 'Upload minimaal 5 foto\'s om de reconstructie te starten.',
    qualitySufficient: 'Voldoende kwaliteit voor Snelle / Standaard Modus.',
    qualityExcellent: 'Uitstekende Kwaliteit! Optimale 360° dekking gedetecteerd.',
    guideTitle: 'Gids voor een Perfect 3D-Model',
    guide1: 'Neem 20 tot 80 foto\'s terwijl je 360° rond het object draait.',
    guide2: 'Constante afstand: houd een gelijke afstand tussen camera en object.',
    guide3: 'Gelijkmatige belichting: vermijd harde schaduwen of fel tegenlicht.',
    guide4: 'Stabiliteit: voorkom dat het object beweegt of vervormt tussen foto\'s.',

    reconstructHeaderTag: 'Stap 2: AI Neurale Reconstructie',
    reconstructTitle: 'Neurale 3D Synthese Pipeline',
    reconstructSubtitle: 'AI converteert foto\'s vanuit meerdere hoeken naar hoogwaardige 3D geometrie en 4K PBR texturen.',

    modeFastTitle: 'Snelle Modus', modeFastDesc: 'Directe snelle 3D-generatie',
    modeStandardTitle: 'Standaard Modus', modeStandardDesc: 'Perfecte balans tussen snelheid en precisie',
    modeProTitle: 'Pro Modus', modeProDesc: 'Hoge geometrische precisie & dichte mesh',
    modeCinematicTitle: 'Cinematografische Modus', modeCinematicDesc: 'Prioriteit op PBR-texturen en reflecties',
    modeObjectTitle: 'Object Modus', modeObjectDesc: 'Gepersonaliseerd voor producten, meubels en prototypes',
    modeCharacterTitle: 'Karakter Modus', modeCharacterDesc: 'Gepersonaliseerd voor kleding, silhouetten en avatars',
    badge1Photo: '1 Foto', badge5_20Photos: '5-20 Foto\'s', badge20_80Photos: '20-80 Foto\'s',
    badgeUltraRealism: 'Ultra Realisme', badgeECommerce: 'E-Commerce', badgeAvatar3D: '3D Avatar',
    synthesisTitle: 'Neurale Synthese Pipeline',
    globalProgress: 'Totale voortgang',
    launchReconstructAction: 'Start 3D-Reconstructie',
    processingAI: 'AI Verwerking bezig...',
    executionLogs: 'LOGBOEK NEURALE COMPUTER',
    disclaimer: 'Waarschuwing: AI 3D-reconstructie is geoptimaliseerd voor visuele weergave, marketing, e-commerce en animatie. Het mag niet worden gepresenteerd als medische of wetenschappelijke scan.',
    completedStatus: 'Voltooid',
    calculatingStatus: 'Bezig met berekenen...',
    waitingStatus: 'Wachten',
    step06Title: 'WebAR LOD Optimalisatie', step06Desc: 'Draco mesh reductie',
    step07Title: 'GLB / USDZ Export Afronding', step07Desc: 'Integratie cinematografische engine',

    // Studio 3D Main
    studioTitleTag: 'PRO 3D STUDIO',
    aiAssistantBtn: 'AI Assistent',
    webOptimizerBtn: 'Web Optimalisator',
    viewInWebARBtn: 'BEKIJK IN WEBAR',
    exportBtn: 'Exporteren',
    renderedPBR: 'PBR Weergave',
    wireframeMode: 'Draadmodel',
    solidMode: 'Solide',
    tabMaterials: 'Materialen',
    tabLighting: 'Verlichting',
    tabCamera: 'Camera',
    tabAnimation: 'Animatie',
    presetLabel: 'Preset',

    // Material Studio
    materialStudioTitle: 'Material Studio & PBR Texturen',
    aiTextureBadge: 'AI 4K TEXTUUR',
    presetMaterials: 'Materiaal Presets',
    matRealistic: 'Realistisch PBR',
    matCinematic: 'Cinematografisch',
    matDarkCinema: 'Donkere Cinema',
    matSciFi: 'Sci-Fi Neon',
    matLuxury: 'Goud & Luxe',
    matStudio: 'Product Studio',
    matCartoon: 'Cartoon',
    matHolographic: 'Hologram',
    metallicSlider: 'Metaalglans',
    roughnessSlider: 'Ruwheid',
    normalMapSlider: 'Normal Map Intensiteit',
    mainColorTint: 'Hoofdkleur',
    wireframeToggle: 'Draadmodel Modus (Wireframe)',

    // Cinematic Engine
    cinematicEngineTitle: 'Cinematic Engine & Verlichting',
    studioLightingBadge: 'STUDIO VERLICHTING',
    presetLighting: 'Cinematografische Verlichting Presets',
    lightHollywood: 'Hollywood Cinema',
    lightCyberpunk: 'Cyberpunk Neon',
    lightLuxury: 'Luxe Warm',
    lightDarkCinema: 'Donkere Cinema',
    lightSciFi: 'Sci-Fi Hangar',
    lightGoldenHour: 'Gouden Uur Zonsondergang',
    lightStudio: 'Zachte Studio Schoon',
    lightDocumentary: 'Documentaire HD',
    keyLightLabel: 'Hoofdlicht',
    fillLightLabel: 'Invullicht',
    rimLightLabel: 'Tegenlicht',
    softShadowsToggle: 'Zachte Schaduwen PCF',

    // Camera Director
    cameraDirectorTitle: 'Camera Regisseur & Bewegingen',
    hollywoodCamBadge: 'HOLLYWOOD CAM',
    presetCameraMoves: 'Voorgedefinieerde Camerabewegingen',
    moveOrbit: 'Cinematic Orbit', moveOrbitDesc: 'Soepele 360° rotatie rond object',
    moveHero: 'Hero Opwaartse Shot', moveHeroDesc: 'Dramatische stijging vanuit lage hoek',
    moveProduct: 'Product Focus Zoom', moveProductDesc: 'Langzame detailzoom voor verkoop',
    moveDramatic: 'Dramatische Inzoom', moveDramaticDesc: 'Gestage camerabeweging met vervaging',
    moveShowcase: '360° Presentatie', moveShowcaseDesc: 'Volledige 3D-presentatie voor webshops',
    moveManual: 'Handmatige Besturing', moveManualDesc: 'Vrije camerabesturing met de muis',
    focalLengthLabel: 'Brandpuntsafstand',
    focal24: '24mm (Groothoek)',
    focal35: '35mm (Documentaire)',
    focal50: '50mm (Menselijk Oog)',
    focal85: '85mm (Portret & Hero)',
    focal135: '135mm (Cinema Telelens)',
    dofLabel: 'Scherptediepte (DOF)',
    apertureLabel: 'Diafragma',
    focusDistLabel: 'Focus Afstand',

    // Animation Studio
    animationStudioTitle: 'AI Animatie & Tijdlijn',
    aiAnimatorBadge: 'AI ANIMATIE',
    autoSpinToggle: 'Automatisch 360° Draaien',
    spinSpeedLabel: 'Draaisnelheid',
    floatingToggle: 'Zweefanimatie',
    floatAmpLabel: 'Zweef-amplitude',
    breathingToggle: 'Ademhalingsanimatie (Avatar)',
    playingStatus: 'AFSPELEN',
    pauseStatus: 'TIJDLIJN GEPAUSEERD',

    // WebAR
    webarHeaderTag: 'Directe WebAR Sectie',
    webarTitle: 'Bekijk in Je Echte Omgeving',
    webarSubtitle: 'Directe WebAR zonder app te installeren. Scan de QR-code met je smartphone (iOS / Android).',
    viewInSpaceBtn: 'BEKIJK IN JE RUIMTE (AR)',
    capturePhotoAR: 'Maak AR Foto',
    recordVideoAR: 'Neem AR Video Op',
    scanToTest: 'Scan om WebAR te Testen',
    scanInstructions: 'Richt de camera van je iOS of Android smartphone op de QR-code om het object in je kamer te plaatsen.',
    instantARUrl: 'Directe AR URL:',
    copyBtn: 'Kopiëren',
    copiedBtn: 'Gekopieerd!',
    iframeEmbed: 'Iframe Embed Code:',

    // Product AR
    productARHeaderTag: 'AR Product Modus (E-Commerce Studio)',
    productARTitle: 'Maak van Je Product een AR Winkelervaring',
    productARSubtitle: 'Laat klanten meubels, schoenen en apparaten thuis uitproberen voordat ze kopen.',
    previewWidgetTitle: 'E-Commerce Widget Klant Voorbeeld',
    skuLabel: 'SKU Ref:',
    colorVariantsLabel: 'PBR Kleurvarianten:',
    buyNowBtn: 'Nu Kopen — Geleverd met AR',
    integrationTitle: '1-Klik Winkel Integratie',
    integrationSubtitle: 'Kopieer deze code om de directe WebAR-knop toe te voegen aan Shopify, WooCommerce of PrestaShop.',
    copyScriptBtn: 'Kopieer Code',
    platformsLabel: 'Ondersteunde Platformen:',
    viewInYourRoom: 'Bekijk in je kamer (WebAR)',
    jsCodeIntegration: 'JavaScript / Web Component Integratiecode',

    // Digital Twin
    digitalTwinHeaderTag: 'Digitale Tweeling Modus (Gecertificeerd)',
    digitalTwinTitle: '3D Paspoort & Echte Asset Metadata',
    digitalTwinSubtitle: 'Koppel elk fysiek object aan zijn gecertificeerde digitale tweeling, historie en afmetingen.',
    passportTag: 'GECERTIFICEERD DIGITAAL PASPOORT',
    verifiedAsset: 'GECONTROLEERDE ASSET',
    assetIDLabel: 'ASSET ID:',
    categoryLabel: 'Categorie',
    dimensionsLabel: 'Afmetingen (B x H x D)',
    weightLabel: 'Echt Gewicht',
    materialsLabel: 'Belangrijkste Materialen',
    createdAtLabel: 'Synthese Datum',
    authorLabel: 'Auteur & Uitgever',
    auditTitle: 'Audit Log & Wijzigingshistorie',
    printTagBtn: 'Print Digitale Tweeling Label (PDF)',
    dtHistory1: 'Aanmaak 3D Digitale Tweeling Paspoort v2.4',
    dtHistory2: 'NeRF Scan & 4K PBR textuur mapping',
    dtHistory3: 'Mesh gevalideerd & Mobiele WebAR optimalisatie',
    qrPhysicalTitle: 'Fysiek QR-Label Digitale Tweeling',
    qrPhysicalDesc: 'Print dit label en plak het op het echte product voor directe toegang tot 3D en WebAR.',

    // Gallery
    galleryHeaderTag: 'Persoonlijke Bibliotheek',
    galleryTitle: 'MIJN 3D MODELLEN — Dashboard',
    gallerySubtitle: 'Beheer, bekijk, exporteer en deel je cinematografische 3D-creaties.',
    newModelBtn: 'Nieuw 3D-Model',
    modelsCreatedStat: 'Modellen Gemaakt',
    webarExpStat: 'WebAR Ervaringen',
    totalViewsStat: 'Totaal Weergaven',
    glbDownloadsStat: 'GLB Downloads',
    modify3DBtn: 'Bewerken 3D',

    // Modals
    magicModalTitle: 'AUTOMATISCHE MAGIC 3D MODUS',
    magicModalSubtitle: '1-Klik: Foto\'s → Reconstructie → Cinema → WebAR',
    magicSuccessTitle: '"Je cinematografische 3D-model is klaar."',
    magicSuccessSubtitle: 'Alle stappen zijn succesvol uitgevoerd.',
    magicProcessing: 'Magic AI-verwerking bezig...',
    magicOpenStudio: 'Open in Studio & Bekijk in WebAR',
    magicStep1: '01. Foto-import en anonimisering',
    magicStep2: '02. AI Objectdetectie & dieptemasker',
    magicStep3: '03. Hoge precisie 3D-mesh reconstructie',
    magicStep4: '04. 4K PBR textuur mapping',
    magicStep5: '05. Studio cinematografische verlichting',
    magicStep6: '06. Instellen Hollywood camerabewegingen',
    magicStep7: '07. Zweefanimatie & 360° draaien',
    magicStep8: '08. WebAR optimalisatie (Draco Compressie)',
    magicStep9: '09. QR-code & WebAR deel-URL genereren',
    aiAssistantModalTitle: 'PHOTO2CINE AI Assistent',
    aiAssistantSubtitle: 'Spraak- en tekstassistent voor 3D studio',
    aiInputPlaceholder: 'Bijv: "Maak textuur goud en voeg Hollywood verlichting toe"...',
    aiPromptLabel: 'Druk je intentie uit in natuurlijke taal:',
    suggestionsTitle: 'AI Commando Suggesties:',
    appliedHistoryTitle: 'Toegepaste Instructies Historie:',
    aiPromptSample1: 'Verander dit model in een metalen object met Cyberpunk-verlichting.',
    aiPromptSample2: 'Maak een donkere cinematografische scène met roze neon-tegenlicht.',
    aiPromptSample3: 'Prepareer en optimaliseer dit model voor mobiele WebAR.',
    aiPromptSample4: 'Maak een 10-seconden productpresentatie met rotatie.',
    webOptimizerTitle: 'WEB OPTIMALISATOR 3D',
    webOptimizerSubtitle: 'Automatische Draco polygoonreductie en WebAR textuurcompressie',
    originalModelLabel: 'Origineel Model',
    optimizedModelLabel: 'WebAR Geoptimaliseerd (Draco)',
    lodLevelLabel: 'Detailniveau (LOD):',
    lod0: 'LOD 0 (Hoge Definitie)',
    lod1: 'LOD 1 (Web & 4G)',
    lod2: 'LOD 2 (Mobiel 3G / Lage GPU)',
    applyOptBtn: 'Pas Draco & Compressie Optimalisatie Toe',
    optApplied: 'Optimalisatie Toegepast!',
    exportModalTitle: '3D-MODEL EXPORTEREN',
    exportModalSubtitle: 'Download in alle industrie-standaard formaten',
    downloadBtn: 'Exporteren',
    exportRecommended: 'AANBEVOLEN',
    exportAppleAR: 'APPLE AR',
    exportWeb: 'WEB',
    exportCAD: 'CAD / 3D',
    exportBlender: 'BLENDER / UNITY',
    export3DPrint: '3D PRINTER',
    exportGenerating: 'Genereren...',
    exportAction: 'Exporteren'
  }
};
