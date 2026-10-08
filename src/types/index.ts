export type ReconstructionMode = 'fast' | 'standard' | 'pro' | 'cinematic' | 'object' | 'character';

export interface PhotoItem {
  id: string;
  url: string;
  name: string;
  size: number;
  quality: number; // 0 to 100
  status: 'uploaded' | 'analyzing' | 'ready';
  file?: File;
}

export interface MaterialSettings {
  metallic: number; // 0 to 1
  roughness: number; // 0 to 1
  normalMapIntensity: number; // 0 to 2
  brightness: number; // 0 to 2
  contrast: number; // 0 to 2
  saturation: number; // 0 to 2
  ambientOcclusion: number; // 0 to 1
  preset: string;
  wireframe: boolean;
  textureEnhanceAI: boolean;
  colorTint: string;
}

export interface LightingSettings {
  preset: string;
  keyLightColor: string;
  keyLightIntensity: number;
  fillLightColor: string;
  fillLightIntensity: number;
  rimLightColor: string;
  rimLightIntensity: number;
  hdriPreset: string;
  hdriIntensity: number;
  environmentBlur: number;
  shadows: boolean;
}

export interface CameraSettings {
  dofEnabled: boolean;
  focalLength: number; // mm e.g. 24, 35, 50, 85, 135
  aperture: number; // f-stop e.g. 1.4, 2.8, 5.6
  focusDistance: number;
  motionBlur: number;
  cameraShake: number;
  activePresetMove: string; // 'none' | 'orbit' | 'product' | 'hero' | 'dramatic' | 'showcase'
  projection: 'perspective' | 'orthographic';
}

export interface AnimationSettings {
  autoSpin: boolean;
  spinSpeed: number;
  floating: boolean;
  floatAmplitude: number;
  floatSpeed: number;
  breathing: boolean;
  idlePose: string;
  timelineProgress: number; // 0 to 100%
  isPlaying: boolean;
  durationSeconds: number;
}

export interface Model3DData {
  id: string;
  title: string;
  category: 'object' | 'product' | 'character' | 'sculpture' | 'furniture' | 'vehicle';
  thumbnail: string;
  photoCount: number;
  polygonCount: number;
  optimizedPolyCount: number;
  originalSizeMB: number;
  optimizedSizeMB: number;
  createdAt: string;
  arUrl: string;
  qrCodeUrl: string;
  materials: MaterialSettings;
  lighting: LightingSettings;
  camera: CameraSettings;
  animation: AnimationSettings;
  modelUrl?: string; // GLB or procedural fallback mesh descriptor
  userImageUrl?: string; // Uploaded user photo for neural depth reconstruction
  proceduralType?: 'sneaker' | 'camera' | 'chair' | 'executive_chair' | 'freezer' | 'chest_freezer' | 'sculpture' | 'drone' | 'cyberhead' | 'car' | 'vehicle' | 'rolls_royce' | 'suv' | 'neural_depth';
}

export interface DigitalTwinPassport {
  id: string;
  name: string;
  category: string;
  dimensions: { widthCm: number; heightCm: number; depthCm: number };
  weightKg: number;
  primaryMaterial: string;
  author: string;
  createdAt: string;
  version: string;
  arCode: string;
  certified: boolean;
}

export interface ProductARConfig {
  productName: string;
  price: string;
  sku: string;
  storeUrl: string;
  buyButtonText: string;
  enableDimensionsOverlay: boolean;
  enableColorVariants: boolean;
  badge: string;
}

export interface AIPromptAction {
  command: string;
  executedAt: string;
  appliedChanges: string;
}
