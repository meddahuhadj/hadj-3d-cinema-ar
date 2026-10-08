import * as THREE from 'three';

export interface NeuralTextures {
  diffuseTexture: THREE.CanvasTexture;
  depthTexture: THREE.CanvasTexture;
  normalTexture: THREE.CanvasTexture;
  aspectRatio: number;
}

export const processNeuralImage = (imageUrl: string): Promise<NeuralTextures> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        const aspect = width / height;

        // 1. Create Diffuse Canvas
        const diffuseCanvas = document.createElement('canvas');
        diffuseCanvas.width = width;
        diffuseCanvas.height = height;
        const diffCtx = diffuseCanvas.getContext('2d')!;
        diffCtx.drawImage(img, 0, 0, width, height);

        const imgData = diffCtx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // 2. Create Depth Map Canvas
        const depthCanvas = document.createElement('canvas');
        depthCanvas.width = width;
        depthCanvas.height = height;
        const depthCtx = depthCanvas.getContext('2d')!;
        const depthImgData = depthCtx.createImageData(width, height);
        const depthData = depthImgData.data;

        // 3. Create Normal Map Canvas
        const normalCanvas = document.createElement('canvas');
        normalCanvas.width = width;
        normalCanvas.height = height;
        const normCtx = normalCanvas.getContext('2d')!;
        const normImgData = normCtx.createImageData(width, height);
        const normData = normImgData.data;

        const grayBuffer = new Float32Array(width * height);

        // Compute Grayscale & Depth
        const centerX = width / 2;
        const centerY = height / 2;
        const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];

            // Luminance
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;

            // Vignette / Radial foreground weighting
            const distFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
            const radialWeight = Math.max(0, 1 - (distFromCenter / maxDist) * 0.7);

            // Combined depth estimation
            let depthVal = (lum / 255) * 0.5 + radialWeight * 0.5;
            if (a < 128) depthVal = 0; // Transparency handling

            grayBuffer[y * width + x] = depthVal;

            const byteVal = Math.floor(depthVal * 255);
            depthData[idx] = byteVal;
            depthData[idx + 1] = byteVal;
            depthData[idx + 2] = byteVal;
            depthData[idx + 3] = 255;
          }
        }
        depthCtx.putImageData(depthImgData, 0, 0);

        // Compute Sobel Normal Map from Depth Buffer
        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            const idx = (y * width + x) * 4;

            // Sobel kernels
            const dTL = grayBuffer[(y - 1) * width + (x - 1)];
            const dTC = grayBuffer[(y - 1) * width + x];
            const dTR = grayBuffer[(y - 1) * width + (x + 1)];
            const dML = grayBuffer[y * width + (x - 1)];
            const dMR = grayBuffer[y * width + (x + 1)];
            const dBL = grayBuffer[(y + 1) * width + (x - 1)];
            const dBC = grayBuffer[(y + 1) * width + x];
            const dBR = grayBuffer[(y + 1) * width + (x + 1)];

            const dX = (dTR + 2 * dMR + dBR) - (dTL + 2 * dML + dBL);
            const dY = (dBL + 2 * dBC + dBR) - (dTL + 2 * dTC + dTR);
            const dZ = 1.0 / 2.5; // Normal map strength

            const len = Math.sqrt(dX * dX + dY * dY + dZ * dZ);
            const nx = -dX / len;
            const ny = -dY / len;
            const nz = dZ / len;

            normData[idx] = Math.floor(((nx + 1) / 2) * 255);
            normData[idx + 1] = Math.floor(((ny + 1) / 2) * 255);
            normData[idx + 2] = Math.floor(((nz + 1) / 2) * 255);
            normData[idx + 3] = 255;
          }
        }
        normCtx.putImageData(normImgData, 0, 0);

        // Create Three.js Textures
        const diffuseTexture = new THREE.CanvasTexture(diffuseCanvas);
        diffuseTexture.colorSpace = THREE.SRGBColorSpace;
        diffuseTexture.minFilter = THREE.LinearMipmapLinearFilter;
        diffuseTexture.generateMipmaps = true;

        const depthTexture = new THREE.CanvasTexture(depthCanvas);
        depthTexture.colorSpace = THREE.NoColorSpace;

        const normalTexture = new THREE.CanvasTexture(normalCanvas);
        normalTexture.colorSpace = THREE.NoColorSpace;

        resolve({
          diffuseTexture,
          depthTexture,
          normalTexture,
          aspectRatio: aspect
        });
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = (err) => reject(err);
    img.src = imageUrl;
  });
};
