import React, { useRef, useEffect } from 'react';
import { Wand2, QrCode, Play, Sparkles, ArrowRight, Shield, Zap, Eye, Smartphone, Box, Film, RefreshCw, Camera, Cpu } from 'lucide-react';
import * as THREE from 'three';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroProps {
  onStartUpload: () => void;
  onTryWebAR: () => void;
  onWatchDemo: () => void;
  onOpenStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartUpload, onTryWebAR, onWatchDemo, onOpenStudio }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const width = canvas.parentElement?.clientWidth || 600;
    const height = canvas.parentElement?.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0908, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1, 5);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();
    scene.add(group);

    const coreGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.15,
      metalness: 0.85,
      emissive: 0x8a6a1f,
      emissiveIntensity: 0.3
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    const ringGeo = new THREE.TorusGeometry(1.8, 0.04, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf5e2a8, wireframe: true });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    group.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xa8842c, wireframe: true }));
    ringMesh2.rotation.y = Math.PI / 4;
    group.add(ringMesh2);

    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 10;
      particlePos[i + 1] = (Math.random() - 0.5) * 10;
      particlePos[i + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xf0d78c,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const keyLight = new THREE.DirectionalLight(0xffe9b0, 3);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xcf9b4a, 2);
    fillLight.position.set(-5, -2, -3);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0x191408, 1.5);
    scene.add(ambientLight);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      group.rotation.y = time * 0.4;
      group.rotation.x = Math.sin(time * 0.2) * 0.2;
      ringMesh1.rotation.z = time * 0.5;
      ringMesh2.rotation.z = -time * 0.3;
      particles.rotation.y = time * 0.05;

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
  }, []);

  const pipelineSteps = [
    { num: '01', title: t('step01Title'), desc: t('step01Desc'), icon: Camera, color: 'from-gold-200 to-gold-400' },
    { num: '02', title: t('step02Title'), desc: t('step02Desc'), icon: Cpu, color: 'from-gold-300 to-gold-500' },
    { num: '03', title: t('step03Title'), desc: t('step03Desc'), icon: Sparkles, color: 'from-gold-400 to-gold-600' },
    { num: '04', title: t('step04Title'), desc: t('step04Desc'), icon: Film, color: 'from-gold-500 to-gold-700' },
    { num: '05', title: t('step05Title'), desc: t('step05Desc'), icon: Smartphone, color: 'from-gold-600 to-slate-700' },
  ];

  return (
    <div className="relative overflow-hidden pt-8 pb-20 lg:pt-12 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-8 text-center rtl:text-right ltr:text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-gold-400/30 font-mono-code text-[11px] uppercase tracking-[0.28em] text-amber-200/70">
              <Sparkles className="w-3.5 h-3.5 text-gold-300" />
              <span>{t('heroPill')}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.06]">
              {t('heroTitle1')} <br className="hidden sm:inline" />
              <span className="gradient-text-gold italic">{t('heroTitleHighlight')}</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartUpload}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-[#141008] shadow-xl shadow-gold-400/30 hover:scale-[1.02] hover:shadow-gold-400/40 transition-all"
              >
                <Wand2 className="w-5 h-5 text-[#141008]" />
                <span>{t('btnCreate3D')}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              <button
                onClick={onTryWebAR}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-semibold text-sm glass-panel border border-gold-400/25 text-slate-200 hover:text-white hover:border-gold-400/50 transition-all"
              >
                <QrCode className="w-5 h-5 text-gold-300" />
                <span>{t('btnTryWebAR')}</span>
              </button>

              <button
                onClick={onWatchDemo}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-semibold text-sm text-slate-400 hover:text-slate-200"
              >
                <Play className="w-4 h-4 text-gold-300 fill-gold-300" />
                <span>{t('btnWatchDemo')}</span>
              </button>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Zap className="w-4 h-4 text-gold-300 flex-shrink-0" />
                <span>{t('badgeFPS')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{t('badgePrivacy')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Box className="w-4 h-4 text-gold-300 flex-shrink-0" />
                <span>{t('badgeExport')}</span>
              </div>
            </div>

          </div>

          {/* Right 3D Canvas */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel-glow rounded-3xl p-4 border border-gold-400/30 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-2">
                <div className="flex items-center gap-2 font-mono-code text-[11px] uppercase tracking-[0.28em] text-amber-200/70">
                  <Eye className="w-3.5 h-3.5 text-gold-300" /> {t('liveViewport')}
                </div>
              </div>

              <div className="w-full h-[380px] sm:h-[440px] relative rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-full cursor-grab" />
                <div className="absolute top-4 left-4 bg-slate-900/80 px-3 py-1.5 rounded-xl text-[11px] text-slate-200 border border-slate-800">
                  {t('meshPolyCount')}
                </div>
                <button
                  onClick={onOpenStudio}
                  className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gold-400 text-[#141008] shadow-lg shadow-gold-400/30 hover:scale-[1.03] transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {t('openStudioBtn')}
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-2 font-mono-code">
                <span>{t('fpsLabel')}</span>
                <span className="text-gold-300">{t('dragRotate')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* 5-Step Pipeline */}
        <div className="mt-20 pt-12 border-t border-slate-800/80">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              {t('pipelineTitle')}
            </h2>
            <p className="text-sm text-slate-400 mt-3 max-w-xl mx-auto leading-relaxed">{t('pipelineSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pipelineSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="glass-card rounded-2xl p-5 relative overflow-hidden">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${step.color} p-0.5 mb-4 shadow-md`}>
                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-slate-100" />
                    </div>
                  </div>
                  <div className="font-mono-code text-[11px] uppercase tracking-[0.28em] text-amber-200/70 font-bold mb-2">STEP {step.num}</div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2 leading-snug">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
