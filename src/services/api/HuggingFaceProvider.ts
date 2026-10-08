import { Client } from '@gradio/client';
import { IReconstructionProvider, ReconstructionTask, APIProviderName } from './types';

export class HuggingFaceProvider implements IReconstructionProvider {
  name: APIProviderName = 'huggingface' as any;
  private hfToken?: string;
  private currentResultUrl?: string;

  constructor(hfToken?: string) {
    this.hfToken = hfToken;
  }

  async generateFromImage(imageFile: File): Promise<string> {
    const taskId = `hf-${Date.now()}`;

    // Connect to Hugging Face Space (Trellis or TripoSR)
    try {
      const clientOptions: any = {};
      if (this.hfToken && this.hfToken.startsWith('hf_')) {
        clientOptions.token = this.hfToken;
      }

      // Try connecting to TRELLIS or TripoSR
      const client = await Client.connect("JeffreyXiang/TRELLIS", clientOptions);

      // Convert image file to Blob
      const result: any = await client.predict("/preprocess_image", {
        image: imageFile
      });

      // Execute 3D generation
      const genResult: any = await client.predict("/image_to_3d", {
        image: result.data[0],
        seed: 0,
        ss_sampling_steps: 12,
        slat_sampling_steps: 12
      });

      if (genResult && genResult.data) {
        // Extract output GLB url / path
        const glbData = genResult.data[0];
        if (typeof glbData === 'string') {
          this.currentResultUrl = glbData;
        } else if (glbData && glbData.url) {
          this.currentResultUrl = glbData.url;
        }
      }

      return taskId;
    } catch (err: any) {
      console.warn("Hugging Face Space generation error:", err);
      throw new Error(`Hugging Face 3D Error: ${err.message || 'Space busy or requires token'}`);
    }
  }

  async checkStatus(taskId: string): Promise<ReconstructionTask> {
    if (this.currentResultUrl) {
      return {
        id: taskId,
        status: 'completed',
        progress: 100,
        modelUrl: this.currentResultUrl
      };
    }

    return {
      id: taskId,
      status: 'processing',
      progress: 50
    };
  }
}
