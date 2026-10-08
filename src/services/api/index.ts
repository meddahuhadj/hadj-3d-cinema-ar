import { IReconstructionProvider, APIProviderName } from './types';
import { MeshyProvider } from './MeshyProvider';
import { TripoProvider } from './TripoProvider';
import { HuggingFaceProvider } from './HuggingFaceProvider';

export const getReconstructionProvider = (providerName: APIProviderName): IReconstructionProvider => {
  switch (providerName) {
    case 'huggingface': {
      const hfToken = import.meta.env.VITE_HF_TOKEN;
      return new HuggingFaceProvider(hfToken);
    }

    case 'meshy': {
      const meshyKey = import.meta.env.VITE_MESHY_API_KEY;
      if (!meshyKey || meshyKey.includes('*')) {
        console.warn('VITE_MESHY_API_KEY is missing or invalid in .env. Using mock mode.');
        return new MockProvider('meshy');
      }
      return new MeshyProvider(meshyKey);
    }

    case 'tripo': {
      const tripoKey = import.meta.env.VITE_TRIPO_API_KEY;
      if (!tripoKey || tripoKey.includes('*') || tripoKey.includes('votre_cle')) {
        console.warn('VITE_TRIPO_API_KEY is missing or invalid. Using mock mode.');
        return new MockProvider('tripo');
      }
      return new TripoProvider(tripoKey);
    }
      
    default:
      return new HuggingFaceProvider(import.meta.env.VITE_HF_TOKEN);
  }
};

// Mock provider for development when no API key is present
class MockProvider implements IReconstructionProvider {
  name: APIProviderName;
  
  constructor(name: APIProviderName) {
    this.name = name;
  }

  async generateFromImage(imageFile: File): Promise<string> {
    console.log(`Mock ${this.name}: Generating from image ${imageFile.name}`);
    return `mock-task-${Date.now()}`;
  }

  async checkStatus(taskId: string): Promise<any> {
    // Simulate progression
    return {
      id: taskId,
      status: 'completed',
      progress: 100,
      // Default to one of the demo models if it's a mock
      modelUrl: '/models/default.glb' 
    };
  }
}
