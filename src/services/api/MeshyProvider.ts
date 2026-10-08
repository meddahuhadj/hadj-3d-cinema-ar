import { IReconstructionProvider, ReconstructionTask, APIProviderName } from './types';

export class MeshyProvider implements IReconstructionProvider {
  name: APIProviderName = 'meshy';
  private apiKey: string;
  private baseUrl = 'https://api.meshy.ai/openapi/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private get headers() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
    };
  }

  async generateFromImage(imageFile: File): Promise<string> {
    // 1. Convert File to Base64 (or use form-data depending on Meshy's specific endpoint requirements)
    // For Meshy image-to-3d, we usually need an image URL, or base64 data URL.
    const base64Image = await this.fileToBase64(imageFile);

    const response = await fetch(`${this.baseUrl}/image-to-3d`, {
      method: 'POST',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: base64Image,
        enable_pbr: true,
        // other config...
      }),
    });

    if (!response.ok) {
      let errorBody = '';
      try { errorBody = await response.text(); } catch(e) {}
      throw new Error(`Meshy API Error (${response.status}): ${response.statusText} - ${errorBody}`);
    }

    const data = await response.json();
    return data.result; // Returns the task ID
  }

  async checkStatus(taskId: string): Promise<ReconstructionTask> {
    const response = await fetch(`${this.baseUrl}/image-to-3d/${taskId}`, {
      headers: this.headers,
    });

    if (!response.ok) {
      let errorBody = '';
      try { errorBody = await response.text(); } catch(e) {}
      throw new Error(`Meshy API Error (${response.status}): ${response.statusText} - ${errorBody}`);
    }

    const data = await response.json();
    
    let mappedStatus: ReconstructionTask['status'] = 'pending';
    if (data.status === 'IN_PROGRESS' || data.status === 'PENDING') mappedStatus = 'processing';
    if (data.status === 'SUCCEEDED') mappedStatus = 'completed';
    if (data.status === 'FAILED') mappedStatus = 'failed';

    return {
      id: taskId,
      status: mappedStatus,
      progress: data.progress || 0,
      modelUrl: data.model_urls?.glb,
      thumbnailUrl: data.thumbnail_url,
      error: data.task_error?.message
    };
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}
