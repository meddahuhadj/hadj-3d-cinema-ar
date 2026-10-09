import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { processNeuralImage } from '../../utils/neuralDepth';
import { Model3DData, MaterialSettings, LightingSettings, CameraSettings, AnimationSettings } from '../../types';
import { useTheme } from '../../i18n/ThemeContext';

interface Viewport3DProps {
  modelData: Model3DData;
  material: MaterialSettings;
  lighting: LightingSettings;
  cameraSettings: CameraSettings;
  animation: AnimationSettings;
  viewMode: 'rendered' | 'wireframe' | 'solid' | 'depth' | 'pointcloud';
  studioBackdrop?: 'light' | 'neutral' | 'dark';
  brightnessBoost?: boolean;
}

export const Viewport3D: React.FC<Viewport3DProps> = ({
  modelData,
  material,
  lighting,
  cameraSettings,
  animation,
  viewMode,
  studioBackdrop,
  brightnessBoost = true,
}) => {
  const { isDark } = useTheme();
  const effectiveBackdrop = studioBackdrop || (isDark ? 'dark' : 'light');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const gridRef = useRef<THREE.GridHelper | null>(null);
  const meshRef = useRef<THREE.Group | null>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const width = canvas.parentElement?.clientWidth || 800;
    const height = canvas.parentElement?.clientHeight || 600;

    // 1. Scene Setup
    let bgColor = 0x14120f;
    let gridMain = 0xd4af37;
    let gridSub = 0x30271b;
    if (effectiveBackdrop === 'light') {
      bgColor = 0xf4f0e6;
      gridMain = 0xbda052;
      gridSub = 0xd6cfbf;
    } else if (effectiveBackdrop === 'neutral') {
      bgColor = 0x2e2922;
      gridMain = 0xd4af37;
      gridSub = 0x4f4637;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);
    sceneRef.current = scene;

    // Grid Floor
    const gridHelper = new THREE.GridHelper(20, 20, gridMain, gridSub);
    gridHelper.position.y = -1.5;
    scene.add(gridHelper);
    gridRef.current = gridHelper;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(cameraSettings.focalLength, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 4.5);

    // 3. Renderer Setup with ACES Tone Mapping & sRGB Color Space
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = lighting.shadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = brightnessBoost ? 1.55 : 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    // Room Environment for rich photorealistic PBR lighting & reflections
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      const roomEnvironment = new RoomEnvironment();
      const envTexture = pmremGenerator.fromScene(roomEnvironment, 0.04).texture;
      scene.environment = envTexture;
      scene.environmentIntensity = brightnessBoost ? 1.4 : 1.1;
      roomEnvironment.dispose();
      pmremGenerator.dispose();
    } catch (e) {
      console.warn('Could not initialize RoomEnvironment:', e);
    }

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't go far below floor

    // 5. Lighting Setup Group (Multi-directional cinematic studio rig)
    const lightsGroup = new THREE.Group();
    scene.add(lightsGroup);
    lightsGroupRef.current = lightsGroup;

    const mult = brightnessBoost ? 1.35 : 1.0;

    // [0] Hemisphere Ambient Sky & Ground Light (prevents any dark pitch-black shadows)
    const hemiLight = new THREE.HemisphereLight(0xfffbf0, 0x473d2f, (brightnessBoost ? 1.8 : 1.4));
    lightsGroup.add(hemiLight);

    // [1] Key Directional Light
    const keyLight = new THREE.DirectionalLight(
      lighting.keyLightColor || '#ffffff',
      Math.max(lighting.keyLightIntensity || 3.5, 3.2) * mult
    );
    keyLight.position.set(5, 7, 5);
    keyLight.castShadow = lighting.shadows;
    lightsGroup.add(keyLight);

    // [2] Fill Directional Light
    const fillLight = new THREE.DirectionalLight(
      lighting.fillLightColor || '#faeed8',
      Math.max(lighting.fillLightIntensity || 2.2, 2.0) * mult
    );
    fillLight.position.set(-5, 4, -3);
    lightsGroup.add(fillLight);

    // [3] Rim / Backlight
    const rimLight = new THREE.DirectionalLight(
      lighting.rimLightColor || '#f5dfa8',
      Math.max(lighting.rimLightIntensity || 2.4, 2.2) * mult
    );
    rimLight.position.set(0, 6, -6);
    lightsGroup.add(rimLight);

    // [4] Front Fill Light (Direct camera-facing illumination for photos and frontal textures)
    const frontFill = new THREE.DirectionalLight(0xffffff, (brightnessBoost ? 2.2 : 1.6));
    frontFill.position.set(0, 2, 7);
    lightsGroup.add(frontFill);

    // [5] Ambient Baseline Light
    const ambientLight = new THREE.AmbientLight(0xffffff, (brightnessBoost ? 1.6 : 1.2));
    lightsGroup.add(ambientLight);

    // 6. Build High Quality 3D Mesh
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    meshRef.current = mainGroup;

    // Create custom mesh material
    const meshMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(material.colorTint || '#d4af37'),
      metalness: material.metallic,
      roughness: material.roughness,
      wireframe: viewMode === 'wireframe' || material.wireframe,
    });
    materialRef.current = meshMaterial;

    const isRealGlbUrl = !!(modelData.modelUrl && 
      (modelData.modelUrl.startsWith('http://') || 
       modelData.modelUrl.startsWith('https://') || 
       modelData.modelUrl.startsWith('blob:') || 
       modelData.modelUrl.startsWith('data:') ||
       (modelData.modelUrl.endsWith('.glb') && !modelData.modelUrl.includes('default.glb'))));

    if (isRealGlbUrl && modelData.modelUrl) {
      // 1. Primary Priority: Real 360° Volumetric GLB 3D Model from Tripo / AI API
      const loader = new GLTFLoader();
      loader.load(
        modelData.modelUrl,
        (gltf) => {
          while (mainGroup.children.length > 0) {
            mainGroup.remove(mainGroup.children[0]);
          }
          const loadedModel = gltf.scene;
          const box = new THREE.Box3().setFromObject(loadedModel);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2.4 / (maxDim || 1);
          loadedModel.scale.setScalar(scale);
          loadedModel.position.sub(center.multiplyScalar(scale));
          loadedModel.position.y += (size.y * scale) / 2 - 0.5;

          loadedModel.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              const m = (child as THREE.Mesh).material;
              if (m && (m as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
                (m as THREE.MeshStandardMaterial).envMapIntensity = 1.35;
              }
            }
          });

          mainGroup.add(loadedModel);
        },
        undefined,
        (err) => {
          console.error('Failed to load GLTF model:', err);
        }
      );
    } else {
      // Neural Depth Reconstruction branch for uploaded user photos (if no GLB available)
      const userImg = modelData.userImageUrl || (modelData.proceduralType === 'neural_depth' ? modelData.thumbnail : null);

      if (userImg && modelData.proceduralType === 'neural_depth') {
        processNeuralImage(userImg).then((neural) => {
          while (mainGroup.children.length > 0) {
            mainGroup.remove(mainGroup.children[0]);
          }

          const aspect = neural.aspectRatio || 1.33;
          const baseWidth = aspect >= 1 ? 3.0 : 3.0 * aspect;
          const baseHeight = aspect >= 1 ? 3.0 / aspect : 3.0;
          const volumetricDepth = 0.85; // True 3D Volumetric Depth (85cm solid volume)

          // 1. Front 3D Relief Mesh with True Photo PBR Texture & Neural Displacement
          const frontGeo = new THREE.PlaneGeometry(baseWidth, baseHeight, 180, 180);
          const neuralFrontMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0xffffff), // Pure white so photo texture colors are 100% vibrant & bright
            map: neural.diffuseTexture,
            displacementMap: neural.depthTexture,
            displacementScale: 0.38,
            displacementBias: -0.04,
            normalMap: neural.normalTexture,
            normalScale: new THREE.Vector2(material.normalMapIntensity || 1.2, material.normalMapIntensity || 1.2),
            roughnessMap: neural.roughnessTexture,
            metalness: Math.min(0.2, material.metallic),
            roughness: Math.max(0.25, material.roughness),
            wireframe: viewMode === 'wireframe' || material.wireframe,
            side: THREE.FrontSide
          });
          materialRef.current = neuralFrontMat;

          const frontMesh = new THREE.Mesh(frontGeo, neuralFrontMat);
          frontMesh.position.set(0, 0, volumetricDepth / 2);
          frontMesh.castShadow = true;
          frontMesh.receiveShadow = true;
          mainGroup.add(frontMesh);

          // 2. Back Volumetric Hull with Inverse Organic Displacement
          const backGeo = new THREE.PlaneGeometry(baseWidth, baseHeight, 180, 180);
          backGeo.rotateY(Math.PI);
          const neuralBackMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0xf4f0e6),
            map: neural.diffuseTexture,
            displacementMap: neural.depthTexture,
            displacementScale: 0.28,
            displacementBias: -0.03,
            normalMap: neural.normalTexture,
            normalScale: new THREE.Vector2(material.normalMapIntensity || 1.0, material.normalMapIntensity || 1.0),
            roughnessMap: neural.roughnessTexture,
            metalness: Math.min(0.2, material.metallic),
            roughness: Math.max(0.35, material.roughness),
            wireframe: viewMode === 'wireframe' || material.wireframe,
            side: THREE.FrontSide
          });

          const backMesh = new THREE.Mesh(backGeo, neuralBackMat);
          backMesh.position.set(0, 0, -volumetricDepth / 2);
          backMesh.castShadow = true;
          backMesh.receiveShadow = true;
          mainGroup.add(backMesh);

          // 3. Continuous 3D Solid Casing (Chamfered Beveled Frame - seals all 4 sides with no gap)
          const casingMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0x28231a),
            metalness: 0.75,
            roughness: 0.25,
            wireframe: viewMode === 'wireframe' || material.wireframe,
          });

          // Left Wall
          const leftWallGeo = new THREE.BoxGeometry(0.05, baseHeight, volumetricDepth);
          const leftWall = new THREE.Mesh(leftWallGeo, casingMat);
          leftWall.position.set(-baseWidth / 2, 0, 0);
          leftWall.castShadow = true;
          mainGroup.add(leftWall);

          // Right Wall
          const rightWallGeo = new THREE.BoxGeometry(0.05, baseHeight, volumetricDepth);
          const rightWall = new THREE.Mesh(rightWallGeo, casingMat);
          rightWall.position.set(baseWidth / 2, 0, 0);
          rightWall.castShadow = true;
          mainGroup.add(rightWall);

          // Top Wall
          const topWallGeo = new THREE.BoxGeometry(baseWidth, 0.05, volumetricDepth);
          const topWall = new THREE.Mesh(topWallGeo, casingMat);
          topWall.position.set(0, baseHeight / 2, 0);
          topWall.castShadow = true;
          mainGroup.add(topWall);

          // Bottom Wall
          const bottomWallGeo = new THREE.BoxGeometry(baseWidth, 0.05, volumetricDepth);
          const bottomWall = new THREE.Mesh(bottomWallGeo, casingMat);
          bottomWall.position.set(0, -baseHeight / 2, 0);
          bottomWall.castShadow = true;
          mainGroup.add(bottomWall);

          // 4 Rounded Corner Trim Pillars
          [
            [-baseWidth / 2, baseHeight / 2],
            [baseWidth / 2, baseHeight / 2],
            [-baseWidth / 2, -baseHeight / 2],
            [baseWidth / 2, -baseHeight / 2],
          ].forEach(([cx, cy]) => {
            const pillarGeo = new THREE.CylinderGeometry(0.06, 0.06, volumetricDepth, 16);
            pillarGeo.rotateX(Math.PI / 2);
            const pillar = new THREE.Mesh(pillarGeo, casingMat);
            pillar.position.set(cx, cy, 0);
            mainGroup.add(pillar);
          });

        }).catch(err => {
          console.error('Error creating neural depth 3D model:', err);
        });
      } else {
        // Build procedural 3D model according to model category / type
        const type = modelData.proceduralType || 'portrait_bust';
        
        if (type === 'portrait_bust' || type === 'avatar' || type === 'sculpture' || type === 'cyberhead') {
          // ==========================================================
          // BUSTE 3D PORTRAIT & AVATAR STUDIO HAUTE FIDÉLITÉ (VIP / PRO)
          // ==========================================================
          const suitMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(material.colorTint && material.colorTint !== '#ffffff' && material.colorTint !== '#d4af37' ? material.colorTint : '#18243b'),
            roughness: 0.75,
            metalness: 0.1,
            wireframe: viewMode === 'wireframe' || material.wireframe
          });

          const shirtMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.35,
            metalness: 0.05
          });

          const tieMat = new THREE.MeshStandardMaterial({
            color: 0x1d3557,
            roughness: 0.3,
            metalness: 0.25
          });

          const marblePedestalMat = new THREE.MeshStandardMaterial({
            color: 0x181512,
            roughness: 0.2,
            metalness: 0.4
          });

          const goldTrimMat = new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            roughness: 0.25,
            metalness: 0.85
          });

          const skinMat = new THREE.MeshStandardMaterial({
            color: 0xe0c8b0,
            roughness: 0.55,
            metalness: 0.05
          });

          // 1. Socle Piédestal de Musée Contemporain (Base)
          const baseGeo = new THREE.CylinderGeometry(0.85, 0.95, 0.22, 32);
          const baseMesh = new THREE.Mesh(baseGeo, marblePedestalMat);
          baseMesh.position.set(0, -1.35, 0);
          baseMesh.castShadow = true;
          mainGroup.add(baseMesh);

          // Bague Dorée de transition
          const goldRingGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.06, 32);
          const goldRing = new THREE.Mesh(goldRingGeo, goldTrimMat);
          goldRing.position.set(0, -1.21, 0);
          mainGroup.add(goldRing);

          // Colonne Piédestal
          const stemGeo = new THREE.CylinderGeometry(0.35, 0.42, 0.35, 32);
          const stemMesh = new THREE.Mesh(stemGeo, marblePedestalMat);
          stemMesh.position.set(0, -1.02, 0);
          stemMesh.castShadow = true;
          mainGroup.add(stemMesh);

          // Plaque Nominative Dorée
          const plaqueGeo = new THREE.BoxGeometry(0.72, 0.14, 0.04);
          const plaqueMesh = new THREE.Mesh(plaqueGeo, goldTrimMat);
          plaqueMesh.position.set(0, -1.35, 0.91);
          mainGroup.add(plaqueMesh);

          // 2. Torse en Veste de Costume Bleu Marine (Buste)
          const torsoGeo = new THREE.BoxGeometry(2.0, 0.85, 0.95);
          const torsoMesh = new THREE.Mesh(torsoGeo, suitMat);
          torsoMesh.position.set(0, -0.5, 0);
          torsoMesh.castShadow = true;
          mainGroup.add(torsoMesh);

          // Revers de veste gauche et droit (Lapels)
          [-0.32, 0.32].forEach((xPos, idx) => {
            const lapelGeo = new THREE.BoxGeometry(0.26, 0.68, 0.08);
            lapelGeo.rotateZ(idx === 0 ? Math.PI / 16 : -Math.PI / 16);
            const lapelMesh = new THREE.Mesh(lapelGeo, suitMat);
            lapelMesh.position.set(xPos, -0.42, 0.51);
            mainGroup.add(lapelMesh);
          });

          // Col de chemise blanche
          const shirtGeo = new THREE.BoxGeometry(0.55, 0.28, 0.15);
          const shirtMesh = new THREE.Mesh(shirtGeo, shirtMat);
          shirtMesh.position.set(0, -0.22, 0.46);
          mainGroup.add(shirtMesh);

          // Cravate bleue
          const tieGeo = new THREE.BoxGeometry(0.18, 0.62, 0.06);
          const tieMesh = new THREE.Mesh(tieGeo, tieMat);
          tieMesh.position.set(0, -0.5, 0.52);
          mainGroup.add(tieMesh);

          // 3. Cou Anatomique
          const neckGeo = new THREE.CylinderGeometry(0.28, 0.34, 0.4, 32);
          const neckMesh = new THREE.Mesh(neckGeo, skinMat);
          neckMesh.position.set(0, -0.05, 0);
          neckMesh.castShadow = true;
          mainGroup.add(neckMesh);

          // 4. Crâne & Tête Anatomique 3D
          const headGeo = new THREE.SphereGeometry(0.62, 32, 32);
          headGeo.scale(0.92, 1.15, 1.05);
          const headMesh = new THREE.Mesh(headGeo, skinMat);
          headMesh.position.set(0, 0.52, 0);
          headMesh.castShadow = true;
          mainGroup.add(headMesh);

          // Menton et Mâchoire
          const jawGeo = new THREE.BoxGeometry(0.52, 0.32, 0.48);
          const jawMesh = new THREE.Mesh(jawGeo, skinMat);
          jawMesh.position.set(0, 0.22, 0.18);
          mainGroup.add(jawMesh);

          // 5. Masque Facial & Portrait Photo HD en Relief
          const userPhoto = modelData.userImageUrl || modelData.thumbnail;
          if (userPhoto) {
            const texLoader = new THREE.TextureLoader();
            texLoader.load(userPhoto, (tex) => {
              tex.colorSpace = THREE.SRGBColorSpace;
              const faceGeo = new THREE.PlaneGeometry(1.22, 1.62, 64, 64);
              const faceMat = new THREE.MeshStandardMaterial({
                map: tex,
                roughness: 0.4,
                metalness: 0.1,
                bumpMap: tex,
                bumpScale: 0.04,
                side: THREE.FrontSide
              });
              const faceMesh = new THREE.Mesh(faceGeo, faceMat);
              faceMesh.position.set(0, 0.35, 0.52);
              faceMesh.castShadow = true;
              mainGroup.add(faceMesh);
            });
          }
        } else if (type === 'sneaker') {
      // High-Fidelity Cyberpunk Sneaker 3D Assembly
      const soleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.15, metalness: 0.1 });
      const upperMat = meshMaterial;
      const stripeMat = new THREE.MeshStandardMaterial({ color: 0xcf9b4a, roughness: 0.1, metalness: 0.8 });

      // Curved Sole (Semelle)
      const soleGeo = new THREE.BoxGeometry(2.6, 0.35, 1.1);
      const soleMesh = new THREE.Mesh(soleGeo, soleMat);
      soleMesh.position.set(0, -0.2, 0);
      soleMesh.castShadow = true;
      mainGroup.add(soleMesh);

      // Front Toe Cap (Bout avant)
      const toeGeo = new THREE.SphereGeometry(0.55, 16, 16);
      toeGeo.scale(1.2, 0.7, 0.95);
      const toeMesh = new THREE.Mesh(toeGeo, upperMat);
      toeMesh.position.set(0.7, 0.05, 0);
      toeMesh.castShadow = true;
      mainGroup.add(toeMesh);

      // Heel Counter & Ankle Collar (Talon et col)
      const heelGeo = new THREE.CylinderGeometry(0.5, 0.55, 0.85, 16);
      const heelMesh = new THREE.Mesh(heelGeo, upperMat);
      heelMesh.position.set(-0.6, 0.35, 0);
      heelMesh.castShadow = true;
      mainGroup.add(heelMesh);

      // Tongue (Languette)
      const tongueGeo = new THREE.BoxGeometry(0.8, 0.7, 0.6);
      tongueGeo.rotateZ(-Math.PI / 8);
      const tongueMesh = new THREE.Mesh(tongueGeo, stripeMat);
      tongueMesh.position.set(0.0, 0.45, 0);
      mainGroup.add(tongueMesh);

      // Side Racing Stripes (Bandes Cyberpunk)
      [-0.56, 0.56].forEach(zPos => {
        const stripeGeo = new THREE.BoxGeometry(1.2, 0.12, 0.04);
        stripeGeo.rotateZ(Math.PI / 12);
        const stripeMesh = new THREE.Mesh(stripeGeo, stripeMat);
        stripeMesh.position.set(0.0, 0.15, zPos);
        mainGroup.add(stripeMesh);
      });
    } else if (type === 'camera') {
      // Build Retro Camera 3D Assembly
      const bodyGeo = new THREE.BoxGeometry(2.2, 1.3, 0.9);
      const bodyMesh = new THREE.Mesh(bodyGeo, meshMaterial);
      bodyMesh.castShadow = true;
      mainGroup.add(bodyMesh);

      const lensOuterGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.6, 32);
      lensOuterGeo.rotateX(Math.PI / 2);
      const lensMesh = new THREE.Mesh(lensOuterGeo, new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9, roughness: 0.1 }));
      lensMesh.position.set(0, 0, 0.6);
      lensMesh.castShadow = true;
      mainGroup.add(lensMesh);

      const glassGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.1, 32);
      glassGeo.rotateX(Math.PI / 2);
      const glassMesh = new THREE.Mesh(glassGeo, new THREE.MeshPhysicalMaterial({ color: 0xe8c87a, transmission: 0.9, roughness: 0.05, metalness: 0.1 }));
      glassMesh.position.set(0, 0, 0.9);
      mainGroup.add(glassMesh);
    } else if (type === 'chair' || type === 'executive_chair') {
      // Build Ergonomic Executive Office Chair (Matching user photo)
      // Leather Material for Cushions
      const leatherMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(material.colorTint || '#241f16'),
        roughness: 0.3,
        metalness: 0.15,
        wireframe: viewMode === 'wireframe' || material.wireframe
      });

      // Chrome Material for Armrests and Base
      const chromeMat = new THREE.MeshStandardMaterial({
        color: 0xddd4c0,
        metalness: 0.9,
        roughness: 0.1
      });

      // 1. Seat Cushion
      const seatGeo = new THREE.BoxGeometry(1.4, 0.22, 1.4);
      const seatMesh = new THREE.Mesh(seatGeo, leatherMat);
      seatMesh.position.set(0, 0.1, 0);
      seatMesh.castShadow = true;
      mainGroup.add(seatMesh);

      // 2. High Backrest (Ergonomic tufted padded back)
      const backGeo = new THREE.BoxGeometry(1.3, 1.6, 0.2);
      const backMesh = new THREE.Mesh(backGeo, leatherMat);
      backMesh.position.set(0, 1.0, -0.6);
      backMesh.castShadow = true;
      mainGroup.add(backMesh);

      // 3. Adjustable Headrest (Appui-tête)
      const headrestGeo = new THREE.BoxGeometry(0.8, 0.45, 0.22);
      const headrestMesh = new THREE.Mesh(headrestGeo, leatherMat);
      headrestMesh.position.set(0, 1.95, -0.6);
      headrestMesh.castShadow = true;
      mainGroup.add(headrestMesh);

      // Headrest Support Bar
      const headBarGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3);
      const headBarMesh = new THREE.Mesh(headBarGeo, chromeMat);
      headBarMesh.position.set(0, 1.7, -0.6);
      mainGroup.add(headBarMesh);

      // 4. Chrome Armrests (Accoudoirs)
      [-0.72, 0.72].forEach(xPos => {
        const armBarGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.6);
        const armBar = new THREE.Mesh(armBarGeo, chromeMat);
        armBar.position.set(xPos, 0.4, -0.1);
        mainGroup.add(armBar);

        const padGeo = new THREE.BoxGeometry(0.18, 0.08, 0.8);
        const padMesh = new THREE.Mesh(padGeo, leatherMat);
        padMesh.position.set(xPos, 0.7, -0.1);
        mainGroup.add(padMesh);
      });

      // 5. Central Gas Lift Cylinder Column
      const cylinderGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.7);
      const cylinderMesh = new THREE.Mesh(cylinderGeo, chromeMat);
      cylinderMesh.position.set(0, -0.35, 0);
      mainGroup.add(cylinderMesh);

      // 6. 5-Star Metallic Base & Swivel Wheels (Roulettes)
      const starCenterGeo = new THREE.CylinderGeometry(0.2, 0.25, 0.15, 12);
      const starCenterMesh = new THREE.Mesh(starCenterGeo, chromeMat);
      starCenterMesh.position.set(0, -0.7, 0);
      mainGroup.add(starCenterMesh);

      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        const armGeo = new THREE.BoxGeometry(0.1, 0.08, 1.1);
        armGeo.rotateY(angle);
        const armMesh = new THREE.Mesh(armGeo, chromeMat);
        armMesh.position.set(Math.sin(angle) * 0.55, -0.72, Math.cos(angle) * 0.55);
        mainGroup.add(armMesh);

        // Wheel
        const wheelGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 16);
        wheelGeo.rotateZ(Math.PI / 2);
        const wheelMesh = new THREE.Mesh(wheelGeo, new THREE.MeshStandardMaterial({ color: 0x16130c, roughness: 0.5 }));
        wheelMesh.position.set(Math.sin(angle) * 1.05, -0.82, Math.cos(angle) * 1.05);
        mainGroup.add(wheelMesh);
      }

      // Map user photo texture to high backrest cushion if provided
      if (modelData.userImageUrl) {
        const texLoader = new THREE.TextureLoader();
        texLoader.load(modelData.userImageUrl, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          const chairPhotoGeo = new THREE.PlaneGeometry(1.18, 1.48);
          const chairPhotoMat = new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.35,
            metalness: 0.1,
          });
          const chairPhotoMesh = new THREE.Mesh(chairPhotoGeo, chairPhotoMat);
          chairPhotoMesh.position.set(0, 1.0, -0.49);
          mainGroup.add(chairPhotoMesh);
        });
      }
    } else if (type === 'freezer' || type === 'chest_freezer') {
      // Build Congélateur Horizontal Sharbo 150L 3D Assembly (Matching user photo)
      const freezerBodyMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(material.colorTint || '#f6f1e7'),
        roughness: 0.25,
        metalness: 0.1,
        wireframe: viewMode === 'wireframe' || material.wireframe
      });

      const handleMat = new THREE.MeshStandardMaterial({
        color: 0xcfc5ae,
        metalness: 0.8,
        roughness: 0.2
      });

      const badgeMat = new THREE.MeshStandardMaterial({
        color: 0xea580c, // Sharbo Orange Badge
        roughness: 0.2
      });

      // 1. Main Freezer Cabinet Body (Corps rectangulaire blanc 150L)
      const bodyGeo = new THREE.BoxGeometry(2.4, 1.35, 1.3);
      const bodyMesh = new THREE.Mesh(bodyGeo, freezerBodyMat);
      bodyMesh.position.set(0, 0, 0);
      bodyMesh.castShadow = true;
      mainGroup.add(bodyMesh);

      // 2. Top Opening Lid (Couvercle supérieur avec joint chromé)
      const lidGeo = new THREE.BoxGeometry(2.44, 0.14, 1.34);
      const lidMesh = new THREE.Mesh(lidGeo, freezerBodyMat);
      lidMesh.position.set(0, 0.74, 0);
      lidMesh.castShadow = true;
      mainGroup.add(lidMesh);

      // 3. Integrated Top Door Handle & Key Lock (Poignée et Serrure Clé)
      const handleGeo = new THREE.BoxGeometry(0.48, 0.12, 0.12);
      const handleMesh = new THREE.Mesh(handleGeo, handleMat);
      handleMesh.position.set(0, 0.68, 0.68);
      handleMesh.castShadow = true;
      mainGroup.add(handleMesh);

      // Keyhole detail
      const keyholeGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.04, 12);
      keyholeGeo.rotateX(Math.PI / 2);
      const keyholeMesh = new THREE.Mesh(keyholeGeo, new THREE.MeshBasicMaterial({ color: 0x16130c }));
      keyholeMesh.position.set(0, 0.68, 0.75);
      mainGroup.add(keyholeMesh);

      // 4. Sharbo Brand Logo Badge Top Left
      const logoGeo = new THREE.BoxGeometry(0.45, 0.12, 0.02);
      const logoMesh = new THREE.Mesh(logoGeo, badgeMat);
      logoMesh.position.set(-0.85, 0.52, 0.66);
      mainGroup.add(logoMesh);

      // 5. Front Control Panel Display & Energy Label (Termostat & LED Keep Fresh)
      const panelGeo = new THREE.BoxGeometry(0.7, 0.45, 0.02);
      const panelMat = new THREE.MeshStandardMaterial({ color: 0x8a6a1f, roughness: 0.1 });
      const panelMesh = new THREE.Mesh(panelGeo, panelMat);
      panelMesh.position.set(0.4, 0.1, 0.66);
      mainGroup.add(panelMesh);

      // 6. Bottom Rubber Corner Feet (Pieds de soutien)
      [[-1.05, 1.05], [1.05, 1.05], [-1.05, -1.05], [1.05, -1.05]].forEach(pos => {
        const footGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.1, 16);
        const footMesh = new THREE.Mesh(footGeo, new THREE.MeshStandardMaterial({ color: 0x16130c, roughness: 0.6 }));
        footMesh.position.set(pos[0], -0.72, pos[1] * 0.55);
        mainGroup.add(footMesh);
      });
    } else if (type === 'car' || type === 'vehicle' || type === 'rolls_royce' || type === 'suv') {
      // High-Fidelity Rolls-Royce Cullinan / Luxury SUV 3D Assembly
      const carPaintMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(material.colorTint || '#241f16'),
        metalness: material.metallic || 0.85,
        roughness: material.roughness || 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        reflectivity: 0.9,
        wireframe: viewMode === 'wireframe' || material.wireframe
      });

      const chromeMat = new THREE.MeshStandardMaterial({
        color: 0xf6f1e7,
        metalness: 0.95,
        roughness: 0.05
      });

      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x16130c,
        transmission: 0.85,
        roughness: 0.05,
        metalness: 0.1,
        transparent: true,
        opacity: 0.92
      });

      const tireMat = new THREE.MeshStandardMaterial({
        color: 0x17140e,
        roughness: 0.7,
        metalness: 0.1
      });

      const headlightMat = new THREE.MeshStandardMaterial({
        color: 0xf5e2a8,
        emissive: 0xe8c87a,
        emissiveIntensity: 0.8,
        roughness: 0.1
      });

      const taillightMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        emissive: 0xdc2626,
        emissiveIntensity: 0.9,
        roughness: 0.1
      });

      // 1. Main Lower Body (Châssis et Bas de caisse)
      const lowerBodyGeo = new THREE.BoxGeometry(3.6, 0.6, 1.6);
      const lowerBody = new THREE.Mesh(lowerBodyGeo, carPaintMat);
      lowerBody.position.set(0, 0.1, 0);
      lowerBody.castShadow = true;
      mainGroup.add(lowerBody);

      // 2. Imposing Long Hood (Capot majestueux Cullinan)
      const hoodGeo = new THREE.BoxGeometry(1.3, 0.35, 1.56);
      const hood = new THREE.Mesh(hoodGeo, carPaintMat);
      hood.position.set(1.15, 0.45, 0);
      hood.castShadow = true;
      mainGroup.add(hood);

      // 3. Cabin & Greenhouse (Habitacle et Toit flottant)
      const cabinGeo = new THREE.BoxGeometry(2.0, 0.65, 1.48);
      const cabin = new THREE.Mesh(cabinGeo, carPaintMat);
      cabin.position.set(-0.4, 0.65, 0);
      cabin.castShadow = true;
      mainGroup.add(cabin);

      // 4. Front Windshield (Pare-brise incliné)
      const frontGlassGeo = new THREE.BoxGeometry(0.1, 0.6, 1.4);
      frontGlassGeo.rotateZ(-Math.PI / 6);
      const frontGlass = new THREE.Mesh(frontGlassGeo, glassMat);
      frontGlass.position.set(0.62, 0.68, 0);
      mainGroup.add(frontGlass);

      // Rear Windshield (Lunette arrière)
      const rearGlassGeo = new THREE.BoxGeometry(0.1, 0.58, 1.4);
      rearGlassGeo.rotateZ(Math.PI / 8);
      const rearGlass = new THREE.Mesh(rearGlassGeo, glassMat);
      rearGlass.position.set(-1.42, 0.65, 0);
      mainGroup.add(rearGlass);

      // Side Windows (Vitres latérales teintées)
      [-0.75, 0.75].forEach(zPos => {
        const sideGlassGeo = new THREE.BoxGeometry(1.85, 0.45, 0.04);
        const sideGlass = new THREE.Mesh(sideGlassGeo, glassMat);
        sideGlass.position.set(-0.4, 0.68, zPos);
        mainGroup.add(sideGlass);
      });

      // 5. Iconic Pantheon Grille (Calandre Panthéon Rolls-Royce en chrome poli)
      const grilleFrameGeo = new THREE.BoxGeometry(0.12, 0.65, 0.82);
      const grilleFrame = new THREE.Mesh(grilleFrameGeo, chromeMat);
      grilleFrame.position.set(1.82, 0.35, 0);
      mainGroup.add(grilleFrame);

      // Vertical Grille Slats (Lamelles chromées)
      for (let i = -4; i <= 4; i++) {
        const slatGeo = new THREE.BoxGeometry(0.08, 0.55, 0.03);
        const slat = new THREE.Mesh(slatGeo, chromeMat);
        slat.position.set(1.86, 0.35, i * 0.08);
        mainGroup.add(slat);
      }

      // Spirit of Ecstasy Emblem (Statue emblématique de proue)
      const mascotGeo = new THREE.ConeGeometry(0.04, 0.12, 8);
      mascotGeo.rotateX(Math.PI / 4);
      const mascot = new THREE.Mesh(mascotGeo, chromeMat);
      mascot.position.set(1.78, 0.72, 0);
      mainGroup.add(mascot);

      // 6. Signature Laser/LED Headlights (Optiques avant)
      [-0.55, 0.55].forEach(zPos => {
        const hlGeo = new THREE.BoxGeometry(0.12, 0.16, 0.28);
        const hl = new THREE.Mesh(hlGeo, headlightMat);
        hl.position.set(1.81, 0.42, zPos);
        mainGroup.add(hl);
      });

      // 7. Elegant Vertical Taillights (Feux arrière verticaux)
      [-0.62, 0.62].forEach(zPos => {
        const tlGeo = new THREE.BoxGeometry(0.08, 0.4, 0.12);
        const tl = new THREE.Mesh(tlGeo, taillightMat);
        tl.position.set(-1.81, 0.42, zPos);
        mainGroup.add(tl);
      });

      // 8. Chrome Door Handles (Poignées antagonistes Coach Doors) & Mirrors
      [-0.82, 0.82].forEach(zPos => {
        // Coach door center-meeting handles
        const handleGeo = new THREE.BoxGeometry(0.35, 0.04, 0.05);
        const handle = new THREE.Mesh(handleGeo, chromeMat);
        handle.position.set(-0.4, 0.38, zPos);
        mainGroup.add(handle);

        // Side Mirrors (Rétroviseurs extérieurs)
        const mirrorGeo = new THREE.BoxGeometry(0.18, 0.1, 0.14);
        const mirror = new THREE.Mesh(mirrorGeo, carPaintMat);
        mirror.position.set(0.6, 0.6, zPos + (zPos > 0 ? 0.12 : -0.12));
        mainGroup.add(mirror);
      });

      // 9. 4 Luxury 22-Inch Wheels & Tires with Floating RR Center Caps
      const wheelPositions = [
        [1.15, -0.15, 0.88],
        [1.15, -0.15, -0.88],
        [-1.15, -0.15, 0.88],
        [-1.15, -0.15, -0.88],
      ];

      wheelPositions.forEach(([wx, wy, wz]) => {
        // Tire (Pneu)
        const tireGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.24, 28);
        tireGeo.rotateX(Math.PI / 2);
        const tire = new THREE.Mesh(tireGeo, tireMat);
        tire.position.set(wx, wy, wz);
        tire.castShadow = true;
        mainGroup.add(tire);

        // Chrome Rim (Jante en alliage poli)
        const rimGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.26, 20);
        rimGeo.rotateX(Math.PI / 2);
        const rim = new THREE.Mesh(rimGeo, chromeMat);
        rim.position.set(wx, wy, wz);
        mainGroup.add(rim);

        // Floating Center Hub (Centre de roue RR)
        const hubGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.28, 16);
        hubGeo.rotateX(Math.PI / 2);
        const hub = new THREE.Mesh(hubGeo, new THREE.MeshStandardMaterial({ color: 0x16130c, metalness: 0.9 }));
        hub.position.set(wx, wy, wz);
        mainGroup.add(hub);
      });

      // 10. Dual Chrome Exhaust Pipes (Échappements arrière)
      [-0.45, 0.45].forEach(zPos => {
        const exhaustGeo = new THREE.BoxGeometry(0.12, 0.08, 0.18);
        const exhaust = new THREE.Mesh(exhaustGeo, chromeMat);
        exhaust.position.set(-1.82, -0.12, zPos);
        mainGroup.add(exhaust);
      });
    } else {
      // Tactical Reconnaissance Drone 3D Assembly (Drone X-9)
      const podGeo = new THREE.SphereGeometry(0.8, 24, 24);
      podGeo.scale(1.4, 0.5, 1.1);
      const podMesh = new THREE.Mesh(podGeo, meshMaterial);
      podMesh.castShadow = true;
      mainGroup.add(podMesh);

      // Camera Eye Lens
      const camEyeGeo = new THREE.SphereGeometry(0.3, 16, 16);
      const camEyeMesh = new THREE.Mesh(camEyeGeo, new THREE.MeshPhysicalMaterial({ color: 0xd4af37, roughness: 0.0, metalness: 0.9, emissive: 0x8a6a1f, emissiveIntensity: 0.6 }));
      camEyeMesh.position.set(0.8, -0.1, 0);
      mainGroup.add(camEyeMesh);

      // 4 Carbon Rotor Arms and Propeller Blades
      [[-0.9, 0.9], [0.9, 0.9], [-0.9, -0.9], [0.9, -0.9]].forEach(pos => {
        const armGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.4);
        armGeo.rotateZ(Math.PI / 4);
        const armMesh = new THREE.Mesh(armGeo, new THREE.MeshStandardMaterial({ color: 0x241f16, metalness: 0.8, roughness: 0.2 }));
        armMesh.position.set(pos[0] * 0.7, 0, pos[1] * 0.7);
        mainGroup.add(armMesh);

        // Rotor Motor Engine Pod
        const motorGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.25, 16);
        const motorMesh = new THREE.Mesh(motorGeo, new THREE.MeshStandardMaterial({ color: 0xa8842c, metalness: 0.9, roughness: 0.1 }));
        motorMesh.position.set(pos[0] * 1.1, 0.1, pos[1] * 1.1);
        mainGroup.add(motorMesh);

        // Spinning Propellor Blade
        const propGeo = new THREE.BoxGeometry(0.9, 0.02, 0.1);
        const propMesh = new THREE.Mesh(propGeo, new THREE.MeshStandardMaterial({ color: 0xe8c87a, transparent: true, opacity: 0.85 }));
        propMesh.position.set(pos[0] * 1.1, 0.24, pos[1] * 1.1);
        mainGroup.add(propMesh);
      });
    }
   }
  }

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Handle Animation spin & floating
      if (mainGroup) {
        if (animation.autoSpin || animation.isPlaying) {
          mainGroup.rotation.y += delta * (animation.spinSpeed || 0.8);
        }

        if (animation.floating) {
          mainGroup.position.y = Math.sin(elapsedTime * (animation.floatSpeed || 1.2)) * (animation.floatAmplitude || 0.15);
        } else {
          mainGroup.position.y = 0;
        }
      }

      // Handle Camera movement presets
      if (cameraSettings.activePresetMove === 'orbit') {
        camera.position.x = Math.sin(elapsedTime * 0.5) * 4.5;
        camera.position.z = Math.cos(elapsedTime * 0.5) * 4.5;
      } else if (cameraSettings.activePresetMove === 'hero') {
        camera.position.y = 1.0 + Math.sin(elapsedTime * 0.3) * 0.8;
      }

      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const newW = canvas.parentElement.clientWidth;
      const newH = canvas.parentElement.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [modelData, viewMode]);

  // Update material properties dynamically without recreating scene
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.metalness = material.metallic;
      materialRef.current.roughness = material.roughness;
      materialRef.current.wireframe = viewMode === 'wireframe' || material.wireframe;
      // Do NOT overwrite photo texture with dark tint for photo models!
      if (material.colorTint && !modelData.userImageUrl && modelData.proceduralType !== 'neural_depth') {
        materialRef.current.color.set(material.colorTint);
      }
    }
  }, [material, viewMode, modelData]);

  // Update background and grid dynamically when backdrop changes
  useEffect(() => {
    if (sceneRef.current) {
      let bgColor = 0x14120f;
      let gridMain = 0xd4af37;
      let gridSub = 0x30271b;
      if (effectiveBackdrop === 'light') {
        bgColor = 0xf4f0e6;
        gridMain = 0xbda052;
        gridSub = 0xd6cfbf;
      } else if (effectiveBackdrop === 'neutral') {
        bgColor = 0x2e2922;
        gridMain = 0xd4af37;
        gridSub = 0x4f4637;
      }
      sceneRef.current.background = new THREE.Color(bgColor);

      if (gridRef.current) {
        sceneRef.current.remove(gridRef.current);
        gridRef.current.geometry.dispose();
        (gridRef.current.material as THREE.Material).dispose();
        const newGrid = new THREE.GridHelper(20, 20, gridMain, gridSub);
        newGrid.position.y = -1.5;
        sceneRef.current.add(newGrid);
        gridRef.current = newGrid;
      }
    }
  }, [effectiveBackdrop]);

  // Update exposure and environment intensity dynamically
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.toneMappingExposure = brightnessBoost ? 1.55 : 1.35;
    }
    if (sceneRef.current) {
      sceneRef.current.environmentIntensity = brightnessBoost ? 1.4 : 1.1;
    }
  }, [brightnessBoost]);

  // Update lighting dynamically
  useEffect(() => {
    if (lightsGroupRef.current) {
      const mult = brightnessBoost ? 1.35 : 1.0;
      const lights = lightsGroupRef.current.children;
      // [0] hemiLight
      if (lights[0] && lights[0] instanceof THREE.HemisphereLight) {
        lights[0].intensity = brightnessBoost ? 1.8 : 1.4;
      }
      // [1] keyLight
      if (lights[1] && lights[1] instanceof THREE.DirectionalLight) {
        lights[1].color.set(lighting.keyLightColor || '#ffffff');
        lights[1].intensity = Math.max(lighting.keyLightIntensity || 3.5, 3.2) * mult;
      }
      // [2] fillLight
      if (lights[2] && lights[2] instanceof THREE.DirectionalLight) {
        lights[2].color.set(lighting.fillLightColor || '#faeed8');
        lights[2].intensity = Math.max(lighting.fillLightIntensity || 2.2, 2.0) * mult;
      }
      // [3] rimLight
      if (lights[3] && lights[3] instanceof THREE.DirectionalLight) {
        lights[3].color.set(lighting.rimLightColor || '#f5dfa8');
        lights[3].intensity = Math.max(lighting.rimLightIntensity || 2.4, 2.2) * mult;
      }
      // [4] frontFill
      if (lights[4] && lights[4] instanceof THREE.DirectionalLight) {
        lights[4].intensity = brightnessBoost ? 2.2 : 1.6;
      }
      // [5] ambientLight
      if (lights[5] && lights[5] instanceof THREE.AmbientLight) {
        lights[5].intensity = brightnessBoost ? 1.6 : 1.2;
      }
    }
  }, [lighting, brightnessBoost]);

  return (
    <div
      className={`w-full h-full relative overflow-hidden flex items-center justify-center transition-colors duration-300 ${
        effectiveBackdrop === 'light'
          ? 'bg-[#f4f0e6]'
          : effectiveBackdrop === 'neutral'
          ? 'bg-[#2e2922]'
          : 'bg-[#14120f]'
      }`}
    >
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
