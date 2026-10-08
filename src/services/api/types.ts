export type APIProviderName = 'meshy' | 'luma' | 'tripo' | 'csm' | 'huggingface';

export interface ReconstructionTask {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number; // 0 to 100
  modelUrl?: string; // The URL of the .glb/.gltf file
  thumbnailUrl?: string;
  error?: string;
}

export interface IReconstructionProvider {
  name: APIProviderName;
  
  /**
   * Initialise the generation process with an image file
   * @param imageFile The image to convert
   * @returns The Task ID
   */
  generateFromImage(imageFile: File): Promise<string>;
  
  /**
   * Poll the status of a given task ID
   * @param taskId The task ID returned by generateFromImage
   * @returns The current state of the reconstruction task
   */
  checkStatus(taskId: string): Promise<ReconstructionTask>;
}
