import { IReconstructionProvider, ReconstructionTask, APIProviderName } from './types';

export class TripoProvider implements IReconstructionProvider {
  name: APIProviderName = 'tripo';
  private apiKey: string;
  private baseUrl = '/api/tripo';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private get headers() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  async generateFromImage(imageFile: File): Promise<string> {
    // 1. Upload de l'image sur les serveurs de Tripo
    const formData = new FormData();
    formData.append('file', imageFile);

    const uploadResponse = await fetch(`${this.baseUrl}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
        // Ne pas mettre de Content-Type ici, fetch gère le multipart boundary automatiquement
      },
      body: formData
    });

    if (!uploadResponse.ok) {
      let errorBody = '';
      try { errorBody = await uploadResponse.text(); } catch(e) {}
      throw new Error(`Tripo Upload Error (${uploadResponse.status}): ${errorBody}`);
    }

    const uploadData = await uploadResponse.json();
    if (uploadData.code !== 0) {
       throw new Error(`Tripo Upload Error: ${uploadData.message}`);
    }
    
    // Le token de l'image généré par Tripo
    const imageToken = uploadData.data.image_token;

    // 2. Lancement de la tâche de génération 3D avec ce token
    let fileType = imageFile.type.split('/')[1] || "jpg";
    if (fileType === "jpeg") fileType = "jpg";

    const response = await fetch(`${this.baseUrl}/task`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        type: "image_to_model",
        file: {
          type: fileType,
          file_token: imageToken
        }
      })
    });

    if (!response.ok) {
      let errorBody = '';
      try { errorBody = await response.text(); } catch(e) {}
      throw new Error(`Tripo API Error (${response.status}): ${errorBody}`);
    }

    const data = await response.json();
    if (data.code !== 0) {
       throw new Error(`Tripo API Error: ${data.message}`);
    }
    
    return data.data.task_id;
  }

  async checkStatus(taskId: string): Promise<ReconstructionTask> {
    const response = await fetch(`${this.baseUrl}/task/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      let errorBody = '';
      try { errorBody = await response.text(); } catch(e) {}
      throw new Error(`Tripo API Error (${response.status}): ${errorBody}`);
    }

    const data = await response.json();
    const taskInfo = data.data;

    let mappedStatus: ReconstructionTask['status'] = 'pending';
    if (taskInfo.status === 'running' || taskInfo.status === 'queued') mappedStatus = 'processing';
    if (taskInfo.status === 'success') mappedStatus = 'completed';
    if (taskInfo.status === 'failed') mappedStatus = 'failed';

    const modelUrl = 
      taskInfo.output?.pbr_model || 
      taskInfo.output?.model || 
      taskInfo.output?.glb || 
      taskInfo.result?.model?.url || 
      taskInfo.result?.glb ||
      taskInfo.result?.model;

    const thumbnailUrl = 
      taskInfo.output?.rendered_image || 
      taskInfo.result?.rendered_image?.url ||
      taskInfo.output?.image;

    return {
      id: taskId,
      status: mappedStatus,
      progress: taskInfo.progress || 0,
      modelUrl: typeof modelUrl === 'string' ? modelUrl : undefined,
      thumbnailUrl: typeof thumbnailUrl === 'string' ? thumbnailUrl : undefined,
      error: taskInfo.status === 'failed' ? (taskInfo.error || "Tripo generation failed") : undefined
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
