'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export interface HomeIntroSplashProps {
  mode: 'auto' | 'replay';
  onFinish: () => void;
}

export type ZoneId = 'paddy' | 'mill' | 'mountain' | 'summit';

interface ZonePreset {
  id: ZoneId;
  label: string;
  caption: string;
  lookAt: [number, number, number];
  yaw: number;
  pitch: number;
  dist: number;
}

const OVERVIEW_CAMERA = {
  lookAt: [0, 4.6, -5.0] as [number, number, number],
  yaw: 0.14,
  pitch: 0.29,
  dist: 27.2,
};

const ZONE_PRESETS: Record<ZoneId, ZonePreset> = {
  paddy: {
    id: 'paddy',
    label: '禾田 · 代码育苗',
    caption: '代码化雨浇灌 224 株金穗 · 点击其他区域切换特写，拖拽旋转，滚轮缩放',
    lookAt: [-7.6, 1.1, 5.4],
    yaw: -0.28,
    pitch: 0.34,
    dist: 8.6,
  },
  mill: {
    id: 'mill',
    label: '硙坊 · 石磨淬炼',
    caption: '开发者与石磨淬炼百工工具 · 拖拽旋转 360°，滚轮可继续拉近细节',
    lookAt: [8.2, 1.9, 4.2],
    yaw: 0.28,
    pitch: 0.25,
    dist: 8.6,
  },
  mountain: {
    id: 'mountain',
    label: '学山 · 拾级登峰',
    caption: '56 级石阶与 44 项技术体系 · 滚轮缩放查看栈上词云与登山开发者',
    lookAt: [0.0, 7.6, -12.5],
    yaw: 0.08,
    pitch: 0.22,
    dist: 20.5,
  },
  summit: {
    id: 'summit',
    label: '云巅 · 智能晶体',
    caption: 'AI 晶核与钛金人形机器人观测站 · 拖拽环视巅峰光环，点击还原全景',
    lookAt: [0.0, 14.2, -16.5],
    yaw: 0.24,
    pitch: 0.24,
    dist: 8.8,
  },
};

interface LogoPoint {
  nx: number;
  ny: number;
  isGold: boolean;
}

interface FinaleParticle {
  nx: number;
  ny: number;
  isGold: boolean;
  startAngle: number;
  startDist: number;
  size: number;
  delay: number;
  phase: number;
}

interface ActInfo {
  id: number;
  badge: string;
  caption: string;
  tabLabel: string;
  jumpSec: number;
}

const ACTS: ActInfo[] = [
  { id: 1, badge: '第一幕 · 禾田', caption: '代码化雨，浇灌金穗初生', tabLabel: '01 禾田', jumpSec: 0.25 },
  { id: 2, badge: '第二幕 · 硙坊', caption: '百工入磨，淬炼工程锋芒', tabLabel: '02 硙坊', jumpSec: 1.95 },
  { id: 3, badge: '第三幕 · 问智', caption: '拾级登峰，云巅对话智能', tabLabel: '03 登峰', jumpSec: 3.45 },
  { id: 4, badge: '终幕 · 禾硙', caption: '田 · 坊 · 山 · 智　代码环抱合一', tabLabel: '04 合一', jumpSec: 4.7 },
];

const TOTAL_DURATION_MS = 7000;
const ACT4_START_SEC = 4.7;
const FADE_OUT_MS = 750;

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function drawRoundedRect(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radii: number | [number, number, number, number]
) {
  if (typeof g.roundRect === 'function') {
    g.roundRect(x, y, w, h, radii);
    return;
  }
  const [tl, tr, br, bl] = typeof radii === 'number' ? [radii, radii, radii, radii] : radii;
  g.moveTo(x + tl, y);
  g.lineTo(x + w - tr, y);
  g.quadraticCurveTo(x + w, y, x + w, y + tr);
  g.lineTo(x + w, y + h - br);
  g.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
  g.lineTo(x + bl, y + h);
  g.quadraticCurveTo(x, y + h, x, y + h - bl);
  g.lineTo(x, y + tl);
  g.quadraticCurveTo(x, y, x + tl, y);
  g.closePath();
}

/**
 * Fallback geometric point cloud approximating the left golden grain arc + right mountain & millstone silhouette
 * so Act 4 synthesis works instantaneously even before /images/heauio/logo-mark.png decodes.
 */
function buildFallbackLogoPoints(count = 1250): LogoPoint[] {
  const pts: LogoPoint[] = [];
  const grainCount = Math.floor(count * 0.42);
  for (let i = 0; i < grainCount; i++) {
    const u = i / grainCount;
    const angle = Math.PI * (0.58 + u * 0.92);
    const r = 0.36 + Math.sin(u * Math.PI * 10) * 0.035;
    pts.push({
      nx: Math.cos(angle) * r - 0.04,
      ny: Math.sin(angle) * r,
      isGold: true,
    });
  }
  const inkCount = count - grainCount;
  for (let i = 0; i < inkCount; i++) {
    const u = i / inkCount;
    if (u < 0.45) {
      // Mountain peaks
      const mu = u / 0.45;
      const nx = -0.15 + mu * 0.56;
      const ny = -0.05 - Math.abs(Math.sin(mu * Math.PI * 2.2)) * 0.32;
      pts.push({ nx, ny, isGold: false });
    } else {
      // Millstone cylinder rings
      const angle = ((u - 0.45) / 0.55) * Math.PI * 2 * 3;
      const ring = i % 2 === 0 ? 0.22 : 0.14;
      pts.push({
        nx: 0.08 + Math.cos(angle) * ring,
        ny: 0.16 + Math.sin(angle) * ring * 0.48 + ((i % 3) - 1) * 0.04,
        isGold: false,
      });
    }
  }
  return pts;
}

/**
 * Loads /images/heauio/logo-mark.png onto an offscreen canvas to:
 * 1) Sample ~1,250 pixel coordinates split between gold wheat grain & silver mountain/mill ink
 * 2) Generate a crisp luminous dark-background emblem dataURL (white silver lines + radiant gold grain)
 */
function loadLogoAssets(
  onReady: (pts: LogoPoint[], darkEmblemDataUrl: string) => void
): () => void {
  let cancelled = false;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    if (cancelled) return;
    try {
      // 1) Sample ~1,250 particle coordinates at 220x220
      const sw = 220;
      const sh = 220;
      const sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = sw;
      sampleCanvas.height = sh;
      const sctx = sampleCanvas.getContext('2d');
      const sampled: LogoPoint[] = [];

      if (sctx) {
        sctx.clearRect(0, 0, sw, sh);
        sctx.drawImage(img, 0, 0, sw, sh);
        const { data } = sctx.getImageData(0, 0, sw, sh);
        const candidates: LogoPoint[] = [];
        for (let y = 0; y < sh; y += 2) {
          for (let x = 0; x < sw; x += 2) {
            const idx = (y * sw + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];
            if (a > 75) {
              const isGold = r > 140 && g > 95 && r - b > 35;
              const isDarkInk = r < 145 && g < 145 && b < 145;
              if (isGold || isDarkInk) {
                candidates.push({
                  nx: x / sw - 0.5,
                  ny: y / sh - 0.5,
                  isGold,
                });
              }
            }
          }
        }

        if (candidates.length > 0) {
          const target = 1250;
          const step = Math.max(1, candidates.length / target);
          for (let i = 0; i < target; i++) {
            const picked = candidates[Math.min(candidates.length - 1, Math.floor(i * step))];
            sampled.push(picked);
          }
        }
      }

      // 2) Render high-resolution luminous white-and-gold emblem for dark backgrounds (512x512)
      const ew = 512;
      const eh = 512;
      const emblemCanvas = document.createElement('canvas');
      emblemCanvas.width = ew;
      emblemCanvas.height = eh;
      const ectx = emblemCanvas.getContext('2d');
      let dataUrl = '/images/heauio/logo-mark.png';

      if (ectx) {
        ectx.clearRect(0, 0, ew, eh);
        ectx.drawImage(img, 0, 0, ew, eh);
        const imgData = ectx.getImageData(0, 0, ew, eh);
        const px = imgData.data;
        for (let i = 0; i < px.length; i += 4) {
          const r = px[i];
          const g = px[i + 1];
          const b = px[i + 2];
          const a = px[i + 3];
          if (a < 8) continue;

          const isGold = r - b > 32 && g > 85;
          if (isGold) {
            // Radiant warm gold boost
            px[i] = Math.min(255, Math.round(r * 1.12 + 12));
            px[i + 1] = Math.min(255, Math.round(g * 1.16 + 10));
            px[i + 2] = Math.min(255, Math.round(b * 1.1 + 14));
          } else {
            // Invert dark ink lines cleanly to luminous silver-white while suppressing white outline halo
            const lum = (r + g + b) / 3;
            if (lum < 195) {
              const whiteness = clamp01((195 - lum) / 145);
              px[i] = 248;
              px[i + 1] = 250;
              px[i + 2] = 252;
              px[i + 3] = Math.round(a * Math.pow(whiteness, 0.72));
            } else {
              px[i + 3] = 0;
            }
          }
        }
        ectx.putImageData(imgData, 0, 0);
        dataUrl = emblemCanvas.toDataURL('image/png');
      }

      onReady(sampled.length > 0 ? sampled : buildFallbackLogoPoints(), dataUrl);
    } catch {
      onReady(buildFallbackLogoPoints(), '/images/heauio/logo-mark.png');
    }
  };
  img.onerror = () => {
    if (!cancelled) {
      onReady(buildFallbackLogoPoints(), '/images/heauio/logo-mark.png');
    }
  };
  img.src = '/images/heauio/logo-mark.png';

  return () => {
    cancelled = true;
  };
}

export default function HomeIntroSplash({ mode, onFinish }: HomeIntroSplashProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const finaleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const lockupRef = useRef<HTMLDivElement | null>(null);
  const emblemBoxRef = useRef<HTMLDivElement | null>(null);
  const emblemRef = useRef<HTMLImageElement | null>(null);
  const wordmarkRef = useRef<SVGSVGElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const manifestoRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);

  const [darkEmblemUrl, setDarkEmblemUrl] = useState<string>('/images/heauio/logo-mark.png');
  const [isDark, setIsDark] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [holdMode, setHoldMode] = useState(mode === 'replay');
  const [freeOrbit, setFreeOrbit] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [focusedZone, setFocusedZone] = useState<ZoneId | null>(null);
  const [currentActIndex, setCurrentActIndex] = useState(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Mutable animation controller state read directly inside the 60fps Three.js loop
  const isDarkRef = useRef(false);
  const holdModeRef = useRef(mode === 'replay');
  const freeOrbitRef = useRef(false);
  const isPausedRef = useRef(false);
  const focusedZoneRef = useRef<ZoneId | null>(null);
  const enteredRef = useRef(false);
  const elapsedMsRef = useRef<number>(0);
  const ambientSecRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);
  const focusZoneFnRef = useRef<((zoneId: ZoneId) => void) | null>(null);
  const resetOverviewFnRef = useRef<(() => void) | null>(null);
  const logoPointsRef = useRef<LogoPoint[]>(buildFallbackLogoPoints());
  const fParticlesRef = useRef<FinaleParticle[]>([]);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMsg(null);
    }, 2200);
  }, []);

  const rebuildFinaleParticles = useCallback(() => {
    const pts = logoPointsRef.current;
    const next: FinaleParticle[] = [];
    for (let i = 0; i < pts.length; i++) {
      const { nx, ny, isGold } = pts[i];
      const ang = Math.atan2(ny, nx) + (isGold ? -2.4 : 2.4) + (Math.random() - 0.5) * 1.4;
      next.push({
        nx,
        ny,
        isGold,
        startAngle: ang,
        startDist: 280 + Math.random() * 540,
        size: 1.15 + Math.random() * 1.7,
        delay: Math.random() * 0.22,
        phase: Math.random() * Math.PI * 2,
      });
    }
    fParticlesRef.current = next;
  }, []);

  const triggerExit = useCallback(() => {
    if (enteredRef.current) return;
    enteredRef.current = true;
    setExiting(true);
    finishTimerRef.current = setTimeout(() => {
      onFinish();
    }, FADE_OUT_MS);
  }, [onFinish]);

  const handleReplay = useCallback(() => {
    enteredRef.current = false;
    setExiting(false);
    freeOrbitRef.current = false;
    setFreeOrbit(false);
    isPausedRef.current = false;
    setIsPaused(false);
    focusedZoneRef.current = null;
    setFocusedZone(null);
    setCurrentActIndex(0);
    rebuildFinaleParticles();
    elapsedMsRef.current = 0;
    lastTickRef.current = performance.now();
    showToast('正在重播 3D 四幕品牌开场大片');
  }, [rebuildFinaleParticles, showToast]);

  const handleTogglePause = useCallback(() => {
    if (isPausedRef.current) {
      isPausedRef.current = false;
      setIsPaused(false);
      freeOrbitRef.current = false;
      setFreeOrbit(false);
      focusedZoneRef.current = null;
      setFocusedZone(null);
      if (elapsedMsRef.current >= TOTAL_DURATION_MS + 1400) {
        elapsedMsRef.current = 0;
        setCurrentActIndex(0);
        rebuildFinaleParticles();
      }
      lastTickRef.current = performance.now();
      showToast('继续播放四幕品牌大片');
    } else {
      isPausedRef.current = true;
      setIsPaused(true);
      showToast('已暂停 · 点击任意 3D 区域放大特写，或按空格继续');
    }
  }, [rebuildFinaleParticles, showToast]);

  const handleResetView = useCallback(() => {
    resetOverviewFnRef.current?.();
  }, []);

  const handleToggleOrbit = useCallback(() => {
    const next = !freeOrbitRef.current;
    freeOrbitRef.current = next;
    setFreeOrbit(next);
    if (!next) {
      focusedZoneRef.current = null;
      setFocusedZone(null);
      isPausedRef.current = false;
      setIsPaused(false);
      lastTickRef.current = performance.now();
      showToast('已恢复电影级自动运镜');
    } else {
      resetOverviewFnRef.current?.();
    }
  }, [showToast]);

  const handleToggleHold = useCallback(() => {
    const next = !holdModeRef.current;
    holdModeRef.current = next;
    setHoldMode(next);
    if (next) {
      showToast('播放完成后将定格在「禾硙」粒子合成徽标页');
    } else {
      freeOrbitRef.current = false;
      setFreeOrbit(false);
      focusedZoneRef.current = null;
      setFocusedZone(null);
      isPausedRef.current = false;
      setIsPaused(false);
      elapsedMsRef.current = 0;
      lastTickRef.current = performance.now();
      showToast('将在播放完成后自动平滑进入官网');
    }
  }, [showToast]);

  const handleJumpAct = useCallback(
    (act: ActInfo, idx: number) => {
      freeOrbitRef.current = false;
      setFreeOrbit(false);
      focusedZoneRef.current = null;
      setFocusedZone(null);
      isPausedRef.current = false;
      setIsPaused(false);
      holdModeRef.current = true;
      setHoldMode(true);
      setCurrentActIndex(idx);
      if (idx === 3) {
        rebuildFinaleParticles();
      }
      elapsedMsRef.current = act.jumpSec * 1000;
      lastTickRef.current = performance.now();
      showToast(`已切换至：${act.badge}`);
    },
    [rebuildFinaleParticles, showToast]
  );

  // Keyboard Escape skip & Space pause/resume
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerExit();
      } else if (e.code === 'Space') {
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'BUTTON') {
          e.preventDefault();
          handleTogglePause();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleTogglePause, triggerExit]);

  // Sync light/dark theme automatically with site theme & boot attribute
  useEffect(() => {
    const readDark = () =>
      document.body.classList.contains('dark') ||
      document.documentElement.getAttribute('data-hewei-theme') === 'dark';
    const sync = () => {
      const next = readDark();
      isDarkRef.current = next;
      setIsDark(next);
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-hewei-theme'] });
    window.addEventListener('partjava-settings-change', sync);
    return () => {
      observer.disconnect();
      window.removeEventListener('partjava-settings-change', sync);
    };
  }, []);

  // Load real brand emblem pixel sampling & dark-bg luminous emblem texture
  useEffect(() => {
    rebuildFinaleParticles();
    const cancelLoad = loadLogoAssets((pts, darkUrl) => {
      logoPointsRef.current = pts;
      setDarkEmblemUrl(darkUrl);
      rebuildFinaleParticles();
    });
    return cancelLoad;
  }, [rebuildFinaleParticles]);

  // Main Three.js + 2D Particle Synthesis Animation Engine（首次绘制前同步渲染首帧并揭幕）
  useIsomorphicLayoutEffect(() => {
    if (typeof document !== 'undefined') {
      const bootDark =
        document.body.classList.contains('dark') ||
        document.documentElement.getAttribute('data-hewei-theme') === 'dark';
      isDarkRef.current = bootDark;
      setIsDark(bootDark);
    }

    const releaseBootCurtain = () => {
      if (typeof document === 'undefined') return;
      const root = document.documentElement;
      if (root.getAttribute('data-hewei-intro-boot') === '1') {
        root.setAttribute('data-hewei-intro-boot', 'fade');
        window.setTimeout(() => {
          if (root.getAttribute('data-hewei-intro-boot') === 'fade') {
            root.removeAttribute('data-hewei-intro-boot');
          }
        }, 260);
      }
    };

    const stageMaybe = stageRef.current;
    const finaleCanvasMaybe = finaleCanvasRef.current;
    if (!stageMaybe || !finaleCanvasMaybe) {
      releaseBootCurtain();
      return;
    }
    const stage: HTMLDivElement = stageMaybe;
    const finaleCanvas: HTMLCanvasElement = finaleCanvasMaybe;

    const fctxMaybe = finaleCanvas.getContext('2d');
    if (!fctxMaybe) {
      releaseBootCurtain();
      return;
    }
    const fctx: CanvasRenderingContext2D = fctxMaybe;

    const disposeTextures: THREE.Texture[] = [];

    function makeCodeGlyphTexture(symbol: string, color: string): THREE.CanvasTexture {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 64;
      const g = c.getContext('2d')!;
      g.clearRect(0, 0, 128, 64);
      g.font = 'bold 34px ui-monospace, Menlo, Consolas, monospace';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.shadowColor = color;
      g.shadowBlur = 14;
      g.fillStyle = color;
      g.fillText(symbol, 64, 34);
      const tex = new THREE.CanvasTexture(c);
      disposeTextures.push(tex);
      return tex;
    }

    function makeMountainKeywordTexture(label: string, color: string, glowColor: string): THREE.CanvasTexture {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 112;
      const g = c.getContext('2d')!;
      g.clearRect(0, 0, 512, 112);
      const fontSize = label.length > 10 ? 50 : label.length > 6 ? 56 : 64;
      g.font = `800 ${fontSize}px ui-monospace, Menlo, Consolas, monospace`;
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      // Crisp dark outline + neon glow keeps foreground keywords super readable on any backdrop
      g.lineJoin = 'round';
      g.strokeStyle = 'rgba(6, 12, 28, 0.84)';
      g.lineWidth = 7.5;
      g.strokeText(label, 256, 56);
      g.shadowColor = glowColor;
      g.shadowBlur = 20;
      g.fillStyle = color;
      g.fillText(label, 256, 56);
      const tex = new THREE.CanvasTexture(c);
      tex.anisotropy = 4;
      disposeTextures.push(tex);
      return tex;
    }

    function makeSoftwareIconTexture(kind: string): THREE.CanvasTexture {
      const c = document.createElement('canvas');
      c.width = 160;
      c.height = 160;
      const g = c.getContext('2d')!;
      g.clearRect(0, 0, 160, 160);

      const drawAppCard = (glow: string) => {
        g.shadowColor = glow;
        g.shadowBlur = 14;
      };

      if (kind === 'vscode') {
        drawAppCard('#0098ff');
        g.fillStyle = '#0065A9';
        g.beginPath();
        g.moveTo(40, 56);
        g.lineTo(108, 118);
        g.lineTo(122, 108);
        g.lineTo(52, 46);
        g.closePath();
        g.fill();
        g.fillStyle = '#007ACC';
        g.beginPath();
        g.moveTo(40, 104);
        g.lineTo(108, 42);
        g.lineTo(122, 52);
        g.lineTo(52, 114);
        g.closePath();
        g.fill();
        g.fillStyle = '#1F9CF0';
        g.beginPath();
        g.moveTo(104, 36);
        g.lineTo(124, 46);
        g.lineTo(124, 114);
        g.lineTo(104, 124);
        g.closePath();
        g.fill();
      } else if (kind === 'idea') {
        drawAppCard('#fe315d');
        const grad = g.createLinearGradient(28, 28, 132, 132);
        grad.addColorStop(0, '#FE315D');
        grad.addColorStop(0.5, '#8B5CF6');
        grad.addColorStop(1, '#087CFA');
        g.fillStyle = grad;
        g.fillRect(30, 30, 100, 100);
        g.fillStyle = '#0a0a0e';
        g.fillRect(44, 44, 72, 72);
        g.fillStyle = '#ffffff';
        g.font = 'bold 40px sans-serif';
        g.fillText('IJ', 52, 86);
        g.fillRect(52, 98, 34, 6);
      } else if (kind === 'python') {
        drawAppCard('#38bdf8');
        g.fillStyle = '#3776AB';
        g.beginPath();
        drawRoundedRect(g, 56, 34, 46, 42, 14);
        g.fill();
        g.beginPath();
        drawRoundedRect(g, 36, 56, 46, 36, 12);
        g.fill();
        g.fillStyle = '#FFD43B';
        g.beginPath();
        drawRoundedRect(g, 58, 84, 46, 42, 14);
        g.fill();
        g.beginPath();
        drawRoundedRect(g, 78, 68, 46, 36, 12);
        g.fill();
        g.fillStyle = '#ffffff';
        g.beginPath();
        g.arc(68, 46, 4.5, 0, Math.PI * 2);
        g.fill();
        g.beginPath();
        g.arc(92, 114, 4.5, 0, Math.PI * 2);
        g.fill();
      } else if (kind === 'java') {
        drawAppCard('#f97316');
        g.strokeStyle = '#f97316';
        g.lineWidth = 6;
        g.lineCap = 'round';
        g.beginPath();
        g.moveTo(74, 66);
        g.quadraticCurveTo(64, 52, 78, 38);
        g.stroke();
        g.beginPath();
        g.moveTo(92, 64);
        g.quadraticCurveTo(84, 50, 96, 38);
        g.stroke();
        g.fillStyle = '#e2e8f0';
        g.beginPath();
        drawRoundedRect(g, 50, 74, 54, 34, [4, 4, 16, 16]);
        g.fill();
        g.strokeStyle = '#e2e8f0';
        g.lineWidth = 6;
        g.beginPath();
        g.arc(106, 89, 10, -Math.PI / 2, Math.PI / 2);
        g.stroke();
        g.strokeStyle = '#38bdf8';
        g.lineWidth = 5;
        g.beginPath();
        g.ellipse(78, 118, 36, 8, 0, 0, Math.PI * 2);
        g.stroke();
      } else if (kind === 'git') {
        drawAppCard('#f05032');
        g.save();
        g.translate(80, 80);
        g.rotate(Math.PI / 4);
        g.fillStyle = '#F05032';
        g.beginPath();
        drawRoundedRect(g, -38, -38, 76, 76, 12);
        g.fill();
        g.restore();
        g.strokeStyle = '#ffffff';
        g.lineWidth = 6;
        g.beginPath();
        g.moveTo(80, 50);
        g.lineTo(80, 110);
        g.moveTo(80, 74);
        g.lineTo(102, 92);
        g.stroke();
        g.fillStyle = '#ffffff';
        [
          [80, 54],
          [80, 106],
          [102, 92],
        ].forEach(([x, y]) => {
          g.beginPath();
          g.arc(x, y, 7.5, 0, Math.PI * 2);
          g.fill();
        });
      } else {
        drawAppCard('#2496ed');
        g.fillStyle = '#2496ED';
        g.beginPath();
        g.ellipse(78, 98, 42, 20, 0, 0, Math.PI);
        g.fill();
        g.fillRect(36, 84, 78, 16);
        g.beginPath();
        g.moveTo(114, 92);
        g.lineTo(132, 76);
        g.lineTo(126, 98);
        g.closePath();
        g.fill();
        g.fillStyle = '#7dd3fc';
        [
          [46, 68],
          [62, 68],
          [78, 68],
          [94, 68],
          [62, 52],
          [78, 52],
        ].forEach(([x, y]) => {
          g.fillRect(x, y, 13, 13);
        });
        g.fillStyle = '#091122';
        g.beginPath();
        g.arc(54, 96, 3.5, 0, Math.PI * 2);
        g.fill();
      }

      const tex = new THREE.CanvasTexture(c);
      disposeTextures.push(tex);
      return tex;
    }

    function makeScrollingCodeRingTex(textStr: string, color: string): THREE.CanvasTexture {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 96;
      const g = c.getContext('2d')!;
      g.clearRect(0, 0, 1024, 96);
      g.strokeStyle = color;
      g.globalAlpha = 0.25;
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(0, 12);
      g.lineTo(1024, 12);
      g.moveTo(0, 84);
      g.lineTo(1024, 84);
      g.stroke();
      g.globalAlpha = 0.96;
      g.font = 'bold 32px ui-monospace, Menlo, Consolas, monospace';
      g.fillStyle = color;
      g.shadowColor = color;
      g.shadowBlur = 10;
      g.fillText(textStr, 14, 58);
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      disposeTextures.push(tex);
      return tex;
    }

    function makeLaptopScreenTex(): THREE.CanvasTexture {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 160;
      const g = c.getContext('2d')!;
      g.fillStyle = '#06152b';
      g.fillRect(0, 0, 256, 160);
      g.fillStyle = '#38bdf8';
      g.font = 'bold 18px monospace';
      g.fillText('const hewei = () => {', 12, 32);
      g.fillStyle = '#4ade80';
      g.fillText('  irrigate(code);', 12, 62);
      g.fillStyle = '#fbe296';
      g.fillText('  mill.compile(AI);', 12, 92);
      g.fillStyle = '#7dd3fc';
      g.fillText('  climb(SUMMIT);', 12, 122);
      g.fillStyle = '#38bdf8';
      g.fillText('};', 12, 148);
      const tex = new THREE.CanvasTexture(c);
      disposeTextures.push(tex);
      return tex;
    }

    const laptopTex = makeLaptopScreenTex();
    const ringTexCyan = makeScrollingCodeRingTex(
      '</>  const HEWEI = 0x7859;  //  AI_SUMMIT  ::  COMPILE(CODE)  =>  PEAK  //  010110  ',
      '#38bdf8'
    );
    const ringTexGold = makeScrollingCodeRingTex(
      '  HEWEI :: 禾硙  //  Java · Git · </> · AI  ->  mill.refine()  //  0x7859  ',
      '#fbe296'
    );

    // ===== Three.js Scene & Cinema-Grade Lighting =====
    const scene = new THREE.Scene();
    // 透明底：不加雾效，让首页透过 3D 场景可见
    scene.fog = null;

    const getFovForAspect = (aspect: number) => (aspect < 1 ? 58 : aspect < 1.35 ? 50 : 45);
    const initAspect = window.innerWidth / Math.max(1, window.innerHeight);
    const camera = new THREE.PerspectiveCamera(getFovForAspect(initAspect), initAspect, 0.1, 220);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      releaseBootCurtain();
      triggerExit();
      return () => {
        disposeTextures.forEach((tex) => tex.dispose());
      };
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.14;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    stage.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0x6082b6, 0x0b1326, 0.95));
    const moonSun = new THREE.DirectionalLight(0xffe6b3, 2.2);
    moonSun.position.set(18, 28, 16);
    scene.add(moonSun);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.25);
    rimLight.position.set(-20, 14, -18);
    scene.add(rimLight);

    const paddyGlowLight = new THREE.PointLight(0x4ade80, 1.5, 16);
    paddyGlowLight.position.set(-7.6, 3.2, 4.6);
    scene.add(paddyGlowLight);

    const aiSummitLight = new THREE.PointLight(0x38bdf8, 3.8, 32);
    aiSummitLight.position.set(0, 13.8, -16.5);
    scene.add(aiSummitLight);

    const millLanternLight = new THREE.PointLight(0xffb84d, 3.4, 18);
    millLanternLight.position.set(8.2, 3.2, 4.2);
    scene.add(millLanternLight);


    // Subtle starry night sky particles
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(460 * 3);
    for (let i = 0; i < 460; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 110;
      starPos[i * 3 + 1] = 8 + Math.random() * 40;
      starPos[i * 3 + 2] = -38 + (Math.random() - 0.5) * 70;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(
      new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({ color: 0xe2e8f0, size: 0.19, transparent: true, opacity: 0.78 })
      )
    );

    // =========================================================================
    // SCULPTED ARTICULATED HUMAN DEVELOPER BUILDER
    // =========================================================================
    const matSkin = new THREE.MeshStandardMaterial({ color: 0xf0be95, roughness: 0.6 });
    const matHair = new THREE.MeshStandardMaterial({ color: 0x1a2234, roughness: 0.8 });
    const matHoodieBlue = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.52 });
    const matHoodieSlate = new THREE.MeshStandardMaterial({ color: 0x24334d, roughness: 0.55 });
    const matHoodieTeal = new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.55 });
    const matPants = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.75 });
    const matShoe = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5 });
    const matLaptopBody = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.78, roughness: 0.22 });
    const matBund = new THREE.MeshStandardMaterial({ color: 0x3b2f26, roughness: 0.9, flatShading: true });

    interface HumanRig {
      group: THREE.Group;
      legLPivot: THREE.Group;
      legRPivot: THREE.Group;
      calfLPivot: THREE.Group;
      calfRPivot: THREE.Group;
      armLPivot: THREE.Group;
      armRPivot: THREE.Group;
      elbowLPivot: THREE.Group;
      elbowRPivot: THREE.Group;
    }

    function createRealisticHuman(opts: { typing?: boolean; backpack?: boolean; colorVariant: number }): HumanRig {
      const g = new THREE.Group();
      const topMat =
        opts.colorVariant === 1 ? matHoodieBlue : opts.colorVariant === 2 ? matHoodieTeal : matHoodieSlate;

      const hips = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.17, 0.16, 12), matPants);
      hips.position.y = 0.8;
      g.add(hips);

      function makeLeg(sideX: number) {
        const hipPivot = new THREE.Group();
        hipPivot.position.set(sideX, 0.76, 0);
        const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.06, 0.36, 10), matPants);
        thigh.position.y = -0.18;
        hipPivot.add(thigh);
        const knee = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), matPants);
        knee.position.y = -0.37;
        hipPivot.add(knee);
        const calfPivot = new THREE.Group();
        calfPivot.position.y = -0.37;
        const calf = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.048, 0.35, 10), matPants);
        calf.position.y = -0.18;
        calfPivot.add(calf);
        const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.075, 0.21), matShoe);
        shoe.position.set(0, -0.37, 0.045);
        calfPivot.add(shoe);
        hipPivot.add(calfPivot);
        return { hipPivot, calfPivot };
      }
      const legL = makeLeg(-0.105);
      const legR = makeLeg(0.105);
      g.add(legL.hipPivot, legR.hipPivot);

      const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.155, 0.48, 12), topMat);
      chest.scale.set(1.12, 1, 0.74);
      chest.position.y = 1.1;
      g.add(chest);
      const collar = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.042, 8, 16), topMat);
      collar.rotation.x = Math.PI / 2;
      collar.position.y = 1.35;
      g.add(collar);

      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.058, 0.11, 10), matSkin);
      neck.position.y = 1.4;
      g.add(neck);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.145, 16, 14), matSkin);
      head.scale.set(0.92, 1.06, 0.96);
      head.position.y = 1.54;
      g.add(head);
      const hairCap = new THREE.Mesh(
        new THREE.SphereGeometry(0.154, 14, 12, 0, Math.PI * 2, 0, Math.PI * 0.56),
        matHair
      );
      hairCap.scale.set(0.95, 1.05, 1.0);
      hairCap.position.set(0, 1.56, -0.015);
      g.add(hairCap);

      const glassMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const glassL = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.042, 0.025), glassMat);
      glassL.position.set(-0.048, 1.54, 0.132);
      g.add(glassL);
      const glassR = glassL.clone();
      glassR.position.x = 0.048;
      g.add(glassR);
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.012, 0.02), matHair);
      bridge.position.set(0, 1.545, 0.135);
      g.add(bridge);

      function makeArm(sideX: number) {
        const shPivot = new THREE.Group();
        shPivot.position.set(sideX, 1.3, 0);
        shPivot.add(new THREE.Mesh(new THREE.SphereGeometry(0.062, 10, 8), topMat));
        const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.045, 0.27, 10), topMat);
        upper.position.y = -0.14;
        shPivot.add(upper);
        const elbowPivot = new THREE.Group();
        elbowPivot.position.y = -0.28;
        const fore = new THREE.Mesh(new THREE.CylinderGeometry(0.044, 0.038, 0.25, 10), topMat);
        fore.position.y = -0.13;
        elbowPivot.add(fore);
        const hand = new THREE.Mesh(new THREE.SphereGeometry(0.042, 8, 8), matSkin);
        hand.position.y = -0.27;
        elbowPivot.add(hand);
        shPivot.add(elbowPivot);
        return { shPivot, elbowPivot };
      }
      const armL = makeArm(-0.24);
      const armR = makeArm(0.24);
      g.add(armL.shPivot, armR.shPivot);

      if (opts.backpack) {
        const pack = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.38, 0.14), matPants);
        pack.position.set(0, 1.12, -0.18);
        g.add(pack);
        const strip = new THREE.Mesh(
          new THREE.BoxGeometry(0.2, 0.032, 0.025),
          new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
        );
        strip.position.set(0, 1.22, -0.255);
        g.add(strip);
      }

      if (opts.typing) {
        legL.hipPivot.rotation.x = -1.35;
        legL.calfPivot.rotation.x = 1.35;
        legR.hipPivot.rotation.x = -1.35;
        legR.calfPivot.rotation.x = 1.35;
        armL.shPivot.rotation.x = -0.55;
        armL.elbowPivot.rotation.x = -0.95;
        armR.shPivot.rotation.x = -0.55;
        armR.elbowPivot.rotation.x = -0.95;

        const stool = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.44, 12), matBund);
        stool.position.set(0, 0.22, -0.04);
        g.add(stool);
        g.position.y = -0.26;

        const deskTop = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.055, 0.54), matBund);
        deskTop.position.set(0, 0.92, 0.5);
        g.add(deskTop);
        const deskLegL = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.66, 8), matBund);
        deskLegL.position.set(-0.4, 0.59, 0.5);
        g.add(deskLegL);
        const deskLegR = deskLegL.clone();
        deskLegR.position.x = 0.4;
        g.add(deskLegR);

        const lapBase = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.024, 0.32), matLaptopBody);
        lapBase.position.set(0, 0.96, 0.46);
        g.add(lapBase);
        const lapLid = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.3, 0.018), [
          matLaptopBody,
          matLaptopBody,
          matLaptopBody,
          matLaptopBody,
          matLaptopBody,
          new THREE.MeshBasicMaterial({ map: laptopTex }),
        ]);
        lapLid.position.set(0, 1.1, 0.6);
        lapLid.rotation.x = 0.26;
        g.add(lapLid);
      }

      return {
        group: g,
        legLPivot: legL.hipPivot,
        legRPivot: legR.hipPivot,
        calfLPivot: legL.calfPivot,
        calfRPivot: legR.calfPivot,
        armLPivot: armL.shPivot,
        armRPivot: armR.shPivot,
        elbowLPivot: armL.elbowPivot,
        elbowRPivot: armR.elbowPivot,
      };
    }

    // =========================================================================
    // ZONE 1 (LEFT): BORDERED PADDY FIELD + 224 STALKS + FLYING CODE GLYPHS
    // =========================================================================
    const fieldGroup = new THREE.Group();
    fieldGroup.userData.zoneId = 'paddy';
    fieldGroup.position.set(-7.6, 0, 4.6);
    scene.add(fieldGroup);

    const fieldW = 9.2;
    const fieldD = 7.2;
    const bundTop = new THREE.Mesh(new THREE.BoxGeometry(fieldW + 0.7, 0.34, 0.45), matBund);
    bundTop.position.set(0, 0.17, -fieldD / 2);
    fieldGroup.add(bundTop);
    const bundBot = bundTop.clone();
    bundBot.position.z = fieldD / 2;
    fieldGroup.add(bundBot);
    const bundL = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.34, fieldD + 0.4), matBund);
    bundL.position.set(-fieldW / 2, 0.17, 0);
    fieldGroup.add(bundL);
    const bundR = bundL.clone();
    bundR.position.x = fieldW / 2;
    fieldGroup.add(bundR);

    const paddyWater = new THREE.Mesh(
      new THREE.PlaneGeometry(fieldW - 0.1, fieldD - 0.1),
      new THREE.MeshStandardMaterial({ color: 0x102838, roughness: 0.2, metalness: 0.7 })
    );
    paddyWater.rotation.x = -Math.PI / 2;
    paddyWater.position.y = 0.08;
    fieldGroup.add(paddyWater);

    // Invisible forgiving hit-volume covering the 224 stalks for effortless clicking
    const paddyHitBox = new THREE.Mesh(
      new THREE.BoxGeometry(fieldW + 0.6, 1.85, fieldD + 0.6),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false })
    );
    paddyHitBox.position.y = 0.92;
    fieldGroup.add(paddyHitBox);

    for (let r = -3; r <= 3; r++) {
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(fieldW - 0.6, 0.12, 0.22), matBund);
      ridge.position.set(0, 0.12, r * 0.92);
      fieldGroup.add(ridge);
    }

    const colGreen = new THREE.Color(0x22c55e);
    const colGold = new THREE.Color(0xe5b543);
    const colEarGreen = new THREE.Color(0x86efac);
    const colEarGold = new THREE.Color(0xfbe296);
    const matStem = new THREE.MeshStandardMaterial({
      color: colGreen.clone(),
      emissive: 0x0d361c,
      emissiveIntensity: 0.45,
      roughness: 0.42,
    });
    const matEar = new THREE.MeshStandardMaterial({
      color: colEarGreen.clone(),
      emissive: 0x1a4d26,
      emissiveIntensity: 0.55,
      roughness: 0.28,
      metalness: 0.48,
      flatShading: true,
    });

    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.02, 0.42, 0.02),
      new THREE.Vector3(0.09, 0.84, 0.05),
      new THREE.Vector3(0.24, 1.12, 0.09),
    ]);
    const stemGeo = new THREE.TubeGeometry(stemCurve, 7, 0.022, 4, false);
    const leafCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.14, 0),
      new THREE.Vector3(-0.18, 0.44, 0.04),
      new THREE.Vector3(-0.38, 0.48, 0.06),
    ]);
    const leafGeo = new THREE.TubeGeometry(leafCurve, 5, 0.018, 4, false);
    const earGeo = new THREE.ConeGeometry(0.075, 0.34, 5);
    earGeo.rotateZ(-0.58);
    earGeo.translate(0.22, 1.08, 0.08);

    const ROWS = 14;
    const COLS = 16;
    const TOTAL_STALKS = ROWS * COLS;
    const instStems = new THREE.InstancedMesh(stemGeo, matStem, TOTAL_STALKS);
    const instLeaves = new THREE.InstancedMesh(leafGeo, matStem, TOTAL_STALKS);
    const instEars = new THREE.InstancedMesh(earGeo, matEar, TOTAL_STALKS);
    fieldGroup.add(instStems, instLeaves, instEars);

    const stalkMeta: { x: number; z: number; rotY: number; targetH: number; delay: number; phase: number }[] = [];
    const dummyObj = new THREE.Object3D();
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        stalkMeta.push({
          x: -fieldW * 0.43 + (c / (COLS - 1)) * (fieldW * 0.86) + (Math.random() - 0.5) * 0.16,
          z: -fieldD * 0.42 + (r / (ROWS - 1)) * (fieldD * 0.84) + (Math.random() - 0.5) * 0.16,
          rotY: Math.random() * Math.PI * 2,
          targetH: 0.78 + Math.random() * 0.42,
          delay: (c / COLS) * 0.85 + (r / ROWS) * 0.35,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    const fieldCoders: HumanRig[] = [];
    [
      [-4.0, 9.0, Math.PI],
      [-7.6, 9.2, Math.PI],
      [-11.2, 9.0, Math.PI],
    ].forEach(([cx, cz, ry], i) => {
      const c = createRealisticHuman({ typing: true, colorVariant: i });
      c.group.userData.zoneId = 'paddy';
      c.group.position.set(cx, -0.26, cz);
      c.group.rotation.y = ry;
      scene.add(c.group);
      fieldCoders.push(c);
    });

    const codeSymbols = ['</>', '01', 'fn()', '{ }', 'AI', '=>', 'if', '10', 'for', '禾'];
    const glyphMats = codeSymbols.map(
      (sym, idx) =>
        new THREE.SpriteMaterial({
          map: makeCodeGlyphTexture(sym, idx % 3 === 0 ? '#fbe296' : idx % 3 === 1 ? '#38bdf8' : '#4ade80'),
          transparent: true,
          opacity: 0.95,
          depthWrite: false,
        })
    );

    const flyingCodeSprites: {
      sprite: THREE.Sprite;
      srcX: number;
      srcZ: number;
      dstX: number;
      dstZ: number;
      t: number;
      speed: number;
      arcH: number;
    }[] = [];
    for (let i = 0; i < 40; i++) {
      const srcX = [-4.0, -7.6, -11.2][i % 3];
      const dstX = -7.6 + (Math.random() - 0.5) * 8.4;
      const dstZ = 4.6 + (Math.random() - 0.5) * 6.0;
      const sp = new THREE.Sprite(glyphMats[i % glyphMats.length]);
      sp.scale.set(0.72, 0.36, 1);
      scene.add(sp);
      flyingCodeSprites.push({
        sprite: sp,
        srcX,
        srcZ: 8.5,
        dstX,
        dstZ,
        t: Math.random(),
        speed: 0.28 + Math.random() * 0.26,
        arcH: 1.5 + Math.random() * 1.4,
      });
    }

    // =========================================================================
    // ZONE 2 (RIGHT): STONE MILL HOUSE + CODER TOSSING ICONS + ORBITING CODE
    // =========================================================================
    const millHouse = new THREE.Group();
    millHouse.userData.zoneId = 'mill';
    millHouse.position.set(8.2, 0, 4.2);
    scene.add(millHouse);

    const millHitBox = new THREE.Mesh(
      new THREE.BoxGeometry(6.8, 4.6, 5.8),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false })
    );
    millHitBox.position.set(0, 2.2, 0);
    millHouse.add(millHitBox);

    const matWood = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.8 });
    const matRoof = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.58,
      metalness: 0.28,
      flatShading: true,
    });
    const matStone = new THREE.MeshStandardMaterial({
      color: 0xdbe4f0,
      roughness: 0.52,
      metalness: 0.24,
      flatShading: true,
    });
    const matStoneDark = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.65, flatShading: true });
    const matGoldTrim = new THREE.MeshStandardMaterial({
      color: 0xe3b64f,
      emissive: 0x5c3c08,
      emissiveIntensity: 0.52,
      metalness: 0.68,
      roughness: 0.28,
    });

    const deck = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.36, 6.8), matStoneDark);
    deck.position.y = 0.18;
    millHouse.add(deck);
    const backWall = new THREE.Mesh(
      new THREE.BoxGeometry(7.0, 3.4, 0.28),
      new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.85 })
    );
    backWall.position.set(0, 2.0, -3.0);
    millHouse.add(backWall);

    [
      [-3.3, -2.8],
      [3.3, -2.8],
      [-3.3, 2.8],
      [3.3, 2.8],
    ].forEach(([px, pz]) => {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 3.6, 8), matWood);
      pillar.position.set(px, 2.15, pz);
      millHouse.add(pillar);
    });

    const roofGeo = new THREE.ConeGeometry(6.3, 2.2, 4);
    roofGeo.rotateY(Math.PI / 4);
    const roof = new THREE.Mesh(roofGeo, matRoof);
    roof.position.set(0, 5.0, 0);
    roof.scale.set(1.08, 1.0, 0.98);
    millHouse.add(roof);
    const roofRidge = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.16, 0.22), matGoldTrim);
    roofRidge.position.set(0, 6.06, 0);
    millHouse.add(roofRidge);

    const lantern = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 12, 10),
      new THREE.MeshBasicMaterial({ color: 0xffcc66 })
    );
    lantern.scale.set(1, 1.25, 1);
    lantern.position.set(-2.6, 3.35, 2.5);
    millHouse.add(lantern);

    const millUnit = new THREE.Group();
    millUnit.position.set(0.35, 0.36, 0.15);
    millHouse.add(millUnit);

    const mTray = new THREE.Mesh(new THREE.CylinderGeometry(1.58, 1.72, 0.32, 24), matStone);
    mTray.position.y = 0.16;
    millUnit.add(mTray);
    const mSpout = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.22, 0.72), matStone);
    mSpout.position.set(-0.72, 0.22, 1.48);
    mSpout.rotation.y = -0.4;
    millUnit.add(mSpout);
    const mStream = new THREE.Mesh(
      new THREE.BoxGeometry(0.26, 0.08, 0.75),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    mStream.position.set(-0.78, 0.32, 1.56);
    mStream.rotation.y = -0.4;
    millUnit.add(mStream);

    const mLower = new THREE.Mesh(new THREE.CylinderGeometry(1.14, 1.18, 0.44, 24), matStoneDark);
    mLower.position.y = 0.52;
    millUnit.add(mLower);

    const upperMillPivot = new THREE.Group();
    upperMillPivot.position.y = 0.98;
    millUnit.add(upperMillPivot);
    upperMillPivot.add(new THREE.Mesh(new THREE.CylinderGeometry(1.12, 1.14, 0.46, 24), matStone));
    upperMillPivot.add(new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.5, 16), matStoneDark));
    for (let g = 0; g < 10; g++) {
      const gr = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.04, 0.055), matStoneDark);
      const a = (g / 10) * Math.PI * 2;
      gr.position.set(Math.cos(a) * 0.65, 0.235, Math.sin(a) * 0.65);
      gr.rotation.y = -a + 0.35;
      upperMillPivot.add(gr);
    }
    const mBeam = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.13, 0.16), matGoldTrim);
    mBeam.position.set(1.3, 0.02, 0);
    upperMillPivot.add(mBeam);
    const mPost = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.07, 0.92, 10), matGoldTrim);
    mPost.position.set(1.52, 0.48, 0);
    upperMillPivot.add(mPost);

    const millCoder = createRealisticHuman({ typing: true, colorVariant: 1 });
    millCoder.group.position.set(-2.35, 0.1, 0.25);
    millCoder.group.rotation.y = Math.PI * 0.48;
    millHouse.add(millCoder.group);

    const softwareKinds = ['vscode', 'idea', 'java', 'python', 'git', 'docker'];
    const iconMaterials = softwareKinds.map(
      (kind) =>
        new THREE.SpriteMaterial({
          map: makeSoftwareIconTexture(kind),
          transparent: true,
          opacity: 0.98,
          depthWrite: false,
        })
    );
    const tossedIcons: { sprite: THREE.Sprite; t: number; speed: number }[] = [];
    for (let i = 0; i < 9; i++) {
      const sp = new THREE.Sprite(iconMaterials[i % iconMaterials.length]);
      sp.scale.set(0.76, 0.76, 1);
      millHouse.add(sp);
      tossedIcons.push({ sprite: sp, t: i / 9, speed: 0.42 });
    }

    const orbitSyms = ['</>', '01', 'AI', '{ }', 'fn()', '=>', '禾', '硙', 'int', '10', '++', '&&'];
    const millOrbitGlyphs: { sprite: THREE.Sprite; angle: number; yOff: number }[] = [];
    for (let i = 0; i < orbitSyms.length; i++) {
      const sp = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: makeCodeGlyphTexture(orbitSyms[i], i % 2 === 0 ? '#fbe296' : '#38bdf8'),
          transparent: true,
          opacity: 0.94,
          depthWrite: false,
        })
      );
      sp.scale.set(0.76, 0.38, 1);
      millUnit.add(sp);
      millOrbitGlyphs.push({
        sprite: sp,
        angle: (i / orbitSyms.length) * Math.PI * 2,
        yOff: 1.45 + (i % 3) * 0.42,
      });
    }

    const millCodeRing = new THREE.Mesh(
      new THREE.CylinderGeometry(4.65, 4.65, 0.68, 48, 1, true),
      new THREE.MeshBasicMaterial({
        map: ringTexGold,
        transparent: true,
        opacity: 0.78,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    millCodeRing.position.set(0, 2.35, 0);
    millCodeRing.userData.noRaycast = true;
    millHouse.add(millCodeRing);

    // =========================================================================
    // ZONE 3 (BACK): MULTI-LAYERED OVERLAPPING ALPINE MOUNTAINS
    // =========================================================================
    function ridgeNoise(x: number, z: number): number {
      const n1 = 1.0 - Math.abs(Math.sin(x * 0.28 + z * 0.18));
      const n2 = 1.0 - Math.abs(Math.cos(x * 0.55 - z * 0.42));
      return n1 * 0.7 + n2 * 0.3;
    }

    function mainMtnHeight(x: number, z: number): number {
      const peaks = [
        [0.0, -16.5, 11.4, 34.0],
        [-7.5, -14.2, 7.6, 24.0],
        [8.2, -14.8, 8.2, 26.0],
        [-14.5, -13.0, 6.2, 22.0],
        [15.2, -13.5, 6.5, 24.0],
        [-3.8, -11.5, 4.4, 16.0],
        [4.6, -11.8, 4.6, 16.0],
      ];
      let h = 0;
      for (let i = 0; i < peaks.length; i++) {
        const [px, pz, ph, spread] = peaks[i];
        const d2 = (x - px) * (x - px) + (z - pz) * (z - pz);
        h = Math.max(h, ph * Math.exp(-d2 / spread));
      }
      return Math.max(0, h * (0.86 + 0.24 * ridgeNoise(x, z)));
    }

    function farMtnHeight(x: number, z: number): number {
      const peaks = [
        [-16.0, -29.0, 15.5, 48.0],
        [-5.5, -31.0, 17.5, 56.0],
        [7.5, -30.5, 16.8, 54.0],
        [19.5, -28.5, 14.5, 46.0],
        [-26.0, -26.0, 11.5, 42.0],
        [28.0, -26.5, 12.0, 42.0],
      ];
      let h = 0;
      for (let i = 0; i < peaks.length; i++) {
        const [px, pz, ph, spread] = peaks[i];
        const d2 = (x - px) * (x - px) + (z - pz) * (z - pz);
        h = Math.max(h, ph * Math.exp(-d2 / spread));
      }
      return Math.max(0, h * (0.85 + 0.26 * ridgeNoise(x * 0.8, z * 0.8)));
    }

    function buildMountainLayer(
      widthM: number,
      depthM: number,
      segX: number,
      segZ: number,
      zOffset: number,
      heightFn: (x: number, z: number) => number,
      snowLine: number,
      tintHex: number
    ) {
      const geo = new THREE.PlaneGeometry(widthM, depthM, segX, segZ);
      geo.rotateX(-Math.PI / 2);
      const pos = geo.attributes.position;
      const cols = new Float32Array(pos.count * 3);
      const cBase = new THREE.Color(0x0b162c);
      const cMid = new THREE.Color(tintHex);
      const cGold = new THREE.Color(0x9e7a34);
      const cSnow = new THREE.Color(0xf1f5f9);
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i);
        const vz = pos.getZ(i) + zOffset;
        const vy = heightFn(vx, vz);
        pos.setY(i, vy);
        const c = new THREE.Color();
        if (vy < 1.8) c.copy(cBase).lerp(cMid, vy / 1.8);
        else if (vy < snowLine) c.copy(cMid).lerp(cGold, (vy - 1.8) / (snowLine - 1.8));
        else c.copy(cGold).lerp(cSnow, clamp01((vy - snowLine) / 3.4));
        cols[i * 3] = c.r;
        cols[i * 3 + 1] = c.g;
        cols[i * 3 + 2] = c.b;
      }
      geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      geo.computeVertexNormals();
      const mesh = new THREE.Mesh(
        geo,
        new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8, metalness: 0.15, flatShading: true })
      );
      mesh.position.z = zOffset;
      return mesh;
    }

    const mainMtnMesh = buildMountainLayer(48, 26, 80, 48, -14.8, mainMtnHeight, 7.6, 0x263b5c);
    mainMtnMesh.userData.zoneId = 'mountain';
    scene.add(mainMtnMesh);
    const farMtnMesh = buildMountainLayer(76, 26, 72, 32, -29.0, farMtnHeight, 11.8, 0x1a2a47);
    farMtnMesh.userData.zoneId = 'mountain';
    scene.add(farMtnMesh);

    // =========================================================================
    // 56 CARVED STONE STEPS + 4 CLIMBING CODERS
    // =========================================================================
    const trailWaypoints = [
      new THREE.Vector3(-1.8, 0.06, 4.4),
      new THREE.Vector3(1.6, 0.08, 2.2),
      new THREE.Vector3(2.8, mainMtnHeight(2.8, -2.0) + 0.06, -2.0),
      new THREE.Vector3(0.4, mainMtnHeight(0.4, -5.8) + 0.08, -5.8),
      new THREE.Vector3(-2.8, mainMtnHeight(-2.8, -9.2) + 0.08, -9.2),
      new THREE.Vector3(-1.4, mainMtnHeight(-1.4, -12.6) + 0.08, -12.6),
      new THREE.Vector3(0.0, mainMtnHeight(0.0, -15.6) + 0.1, -15.6),
    ];
    const trailCurve = new THREE.CatmullRomCurve3(trailWaypoints);

    const STEP_COUNT = 56;
    const stepGeo = new THREE.BoxGeometry(1.15, 0.16, 0.44);
    const stepMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.78, flatShading: true });
    const stepEdgeMat = new THREE.MeshBasicMaterial({ color: 0xfbe296 });

    for (let s = 0; s < STEP_COUNT; s++) {
      const u = s / (STEP_COUNT - 1);
      const pt = trailCurve.getPoint(u);
      const nxt = trailCurve.getPoint(Math.min(1, u + 0.015));
      const groundY = Math.max(0.06, mainMtnHeight(pt.x, pt.z) + 0.08);
      const step = new THREE.Mesh(stepGeo, stepMat);
      step.userData.zoneId = 'mountain';
      step.position.set(pt.x, groundY, pt.z);
      step.lookAt(nxt.x, groundY, nxt.z);
      scene.add(step);
      if (s % 4 === 0) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.62, 6), matWood);
        post.position.set(pt.x + 0.66, groundY + 0.31, pt.z);
        scene.add(post);
        const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), stepEdgeMat);
        lamp.position.set(pt.x + 0.66, groundY + 0.65, pt.z);
        scene.add(lamp);
      }
    }

    const climbers: { coder: HumanRig; baseU: number; speed: number }[] = [];
    [0.2, 0.4, 0.6, 0.78].forEach((startU, idx) => {
      const c = createRealisticHuman({ backpack: true, colorVariant: idx % 3 });
      c.group.userData.zoneId = 'mountain';
      c.group.scale.set(0.86, 0.86, 0.86);
      scene.add(c.group);
      climbers.push({ coder: c, baseU: startU, speed: 0.024 + idx * 0.0025 });
    });

    // =========================================================================
    // ZONE 4 (SUMMIT): ROCKY ALPINE CREST + GLASS-TITANIUM OBSERVATORY + AI ROBOT
    // =========================================================================
    const summitY = mainMtnHeight(0, -16.5);
    const summitGroup = new THREE.Group();
    summitGroup.userData.zoneId = 'summit';
    summitGroup.position.set(0, summitY - 0.15, -16.5);
    scene.add(summitGroup);

    const summitHitBox = new THREE.Mesh(
      new THREE.BoxGeometry(6.6, 4.4, 5.4),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false })
    );
    summitHitBox.position.set(0, 1.9, 0);
    summitGroup.add(summitHitBox);

    const matCrag = new THREE.MeshStandardMaterial({ color: 0x3b4c68, roughness: 0.85, flatShading: true });
    const matCragSnow = new THREE.MeshStandardMaterial({ color: 0xdbe6f2, roughness: 0.7, flatShading: true });
    [
      [-2.7, -0.3, -1.2, 1.35, 0.9, 1.1],
      [2.8, -0.25, -1.0, 1.45, 0.95, 1.2],
      [-1.8, -0.35, 2.2, 1.1, 0.7, 0.95],
      [2.2, -0.3, 1.9, 1.2, 0.75, 1.0],
      [0.0, -0.4, -2.9, 1.9, 1.15, 1.3],
    ].forEach(([bx, by, bz, sx, sy, sz], i) => {
      const b = new THREE.Mesh(new THREE.DodecahedronGeometry(1.0, 0), i % 2 === 0 ? matCrag : matCragSnow);
      b.position.set(bx, by, bz);
      b.scale.set(sx, sy, sz);
      b.rotation.set(i * 0.6, i * 1.1, i * 0.4);
      summitGroup.add(b);
    });

    const deckBase = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.6, 0.32, 32), matStoneDark);
    deckBase.position.y = 0.16;
    summitGroup.add(deckBase);
    const deckGlass = new THREE.Mesh(
      new THREE.CylinderGeometry(2.85, 2.85, 0.08, 32),
      new THREE.MeshStandardMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.28, metalness: 0.8, roughness: 0.12 })
    );
    deckGlass.position.y = 0.36;
    summitGroup.add(deckGlass);
    const padRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.9, 0.06, 8, 40),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    padRing.rotation.x = Math.PI / 2;
    padRing.position.y = 0.39;
    summitGroup.add(padRing);

    for (let p = 0; p < 4; p++) {
      const a = (p / 4) * Math.PI * 2 + Math.PI / 4;
      const py = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 1.25, 8), matStone);
      py.position.set(Math.cos(a) * 2.8, 0.95, Math.sin(a) * 2.8);
      summitGroup.add(py);
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
      cap.position.set(Math.cos(a) * 2.8, 1.62, Math.sin(a) * 2.8);
      summitGroup.add(cap);
    }

    const summitCodeRing = new THREE.Mesh(
      new THREE.CylinderGeometry(4.55, 4.55, 0.78, 48, 1, true),
      new THREE.MeshBasicMaterial({
        map: ringTexCyan,
        transparent: true,
        opacity: 0.86,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    summitCodeRing.position.set(0, 2.6, 0);
    summitCodeRing.userData.noRaycast = true;
    summitGroup.add(summitCodeRing);

    const aiCoreGroup = new THREE.Group();
    aiCoreGroup.position.set(-1.0, 2.55, -0.35);
    summitGroup.add(aiCoreGroup);
    const aiCrystal = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.72, 0),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0ea5e9,
        emissiveIntensity: 1.25,
        roughness: 0.1,
        metalness: 0.85,
        flatShading: true,
      })
    );
    aiCoreGroup.add(aiCrystal);
    const aiOrbit1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.22, 0.035, 8, 36),
      new THREE.MeshBasicMaterial({ color: 0x7dd3fc })
    );
    aiCoreGroup.add(aiOrbit1);
    const aiOrbit2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.48, 0.032, 8, 36),
      new THREE.MeshBasicMaterial({ color: 0xfbe296 })
    );
    aiOrbit2.rotation.x = Math.PI / 3;
    aiCoreGroup.add(aiOrbit2);

    const skyBeam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.68, 18, 16, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    skyBeam.position.set(-1.0, 9.4, -0.35);
    skyBeam.userData.noRaycast = true;
    summitGroup.add(skyBeam);

    // Humanoid Titanium AI Robot
    const robotGroup = new THREE.Group();
    robotGroup.position.set(1.12, 0.4, 0.35);
    robotGroup.rotation.y = -0.32;
    summitGroup.add(robotGroup);

    const matTiWhite = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.68, roughness: 0.18 });
    const matCarbon = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.55, roughness: 0.42 });
    const matVisorBlack = new THREE.MeshStandardMaterial({ color: 0x050b16, metalness: 0.92, roughness: 0.08 });
    const matRoboCyan = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    function makeRoboLeg(sx: number) {
      const lg = new THREE.Group();
      lg.position.set(sx, 0, 0);
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.09, 0.32), matTiWhite);
      foot.position.set(0, 0.045, 0.05);
      lg.add(foot);
      const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.075, 0.48, 12), matTiWhite);
      shin.position.y = 0.33;
      lg.add(shin);
      const knee = new THREE.Mesh(new THREE.SphereGeometry(0.092, 12, 10), matCarbon);
      knee.position.y = 0.59;
      lg.add(knee);
      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.46, 12), matTiWhite);
      thigh.position.y = 0.85;
      lg.add(thigh);
      return lg;
    }
    robotGroup.add(makeRoboLeg(-0.2), makeRoboLeg(0.2));

    const rPelvis = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.18, 12), matCarbon);
    rPelvis.position.y = 1.12;
    robotGroup.add(rPelvis);
    const rWaist = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.19, 0.22, 12), matCarbon);
    rWaist.position.y = 1.3;
    robotGroup.add(rWaist);
    const rChest = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.2, 0.48, 14), matTiWhite);
    rChest.scale.set(1.12, 1, 0.72);
    rChest.position.y = 1.62;
    robotGroup.add(rChest);

    const rCoreRing = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.025, 8, 24), matRoboCyan);
    rCoreRing.position.set(0, 1.66, 0.22);
    robotGroup.add(rCoreRing);
    const rCoreDot = new THREE.Mesh(new THREE.SphereGeometry(0.065, 10, 10), matRoboCyan);
    rCoreDot.position.set(0, 1.66, 0.22);
    robotGroup.add(rCoreDot);

    const rNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.14, 10), matCarbon);
    rNeck.position.y = 1.92;
    robotGroup.add(rNeck);
    const rHead = new THREE.Mesh(new THREE.SphereGeometry(0.21, 18, 16), matTiWhite);
    rHead.scale.set(0.92, 1.08, 1.0);
    rHead.position.y = 2.13;
    robotGroup.add(rHead);
    const rFaceplate = new THREE.Mesh(
      new THREE.SphereGeometry(0.195, 16, 14, -Math.PI * 0.36, Math.PI * 0.72, Math.PI * 0.26, Math.PI * 0.48),
      matVisorBlack
    );
    rFaceplate.rotation.y = Math.PI / 2;
    rFaceplate.position.set(0, 2.13, 0.035);
    robotGroup.add(rFaceplate);
    const rEyeL = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.026, 0.03), matRoboCyan);
    rEyeL.position.set(-0.068, 2.14, 0.205);
    robotGroup.add(rEyeL);
    const rEyeR = rEyeL.clone();
    rEyeR.position.x = 0.068;
    robotGroup.add(rEyeR);

    const rHalo = new THREE.Mesh(
      new THREE.TorusGeometry(0.48, 0.018, 8, 36),
      new THREE.MeshBasicMaterial({ color: 0xfbe296 })
    );
    rHalo.position.set(0, 1.85, -0.26);
    robotGroup.add(rHalo);

    const rArmL = new THREE.Group();
    rArmL.position.set(-0.4, 1.76, 0);
    rArmL.add(new THREE.Mesh(new THREE.SphereGeometry(0.095, 12, 10), matCarbon));
    const rUpL = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.36, 10), matTiWhite);
    rUpL.position.y = -0.2;
    rArmL.add(rUpL);
    const rElbL = new THREE.Mesh(new THREE.SphereGeometry(0.068, 10, 8), matCarbon);
    rElbL.position.y = -0.4;
    rArmL.add(rElbL);
    const rForL = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.052, 0.34, 10), matTiWhite);
    rForL.position.y = -0.58;
    rArmL.add(rForL);
    rArmL.rotation.z = 0.16;
    robotGroup.add(rArmL);

    const rArmRPivot = new THREE.Group();
    rArmRPivot.position.set(0.4, 1.76, 0);
    rArmRPivot.add(new THREE.Mesh(new THREE.SphereGeometry(0.095, 12, 10), matCarbon));
    const rUpR = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.36, 10), matTiWhite);
    rUpR.position.set(0.14, 0.12, 0.06);
    rUpR.rotation.z = -0.85;
    rArmRPivot.add(rUpR);
    const rElbR = new THREE.Mesh(new THREE.SphereGeometry(0.068, 10, 8), matCarbon);
    rElbR.position.set(0.28, 0.24, 0.1);
    rArmRPivot.add(rElbR);
    const rForR = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.052, 0.34, 10), matTiWhite);
    rForR.position.set(0.32, 0.44, 0.14);
    rForR.rotation.z = -0.18;
    rArmRPivot.add(rForR);
    robotGroup.add(rArmRPivot);

    // =========================================================================
    // ELEVATION-TIERED 3D TECH KEYWORD CLOUD OVER VISIBLE ALPINE SLOPES (44)
    // =========================================================================
    const mountainKeywordSpecs: [string, number, number, number, number, string, string, number][] = [
      // Left Far Slope (8)
      ['Linux', -12.6, -5.6, 1.0, 0, '#4ade80', '#22c55e', 0.9],
      ['NPU', -10.8, -4.4, 0.85, 0, '#4ade80', '#16a34a', 0.8],
      ['QLoRA', -16.4, -5.8, 0.95, 1, '#5eead4', '#14b8a6', 0.86],
      ['C++', -16.2, -8.4, 1.25, 0, '#34d399', '#10b981', 1.02],
      ['OS', -13.0, -9.2, 1.35, 0, '#60a5fa', '#3b82f6', 0.88],
      ['Docker', -17.4, -12.4, 1.7, 1, '#38bdf8', '#2563eb', 1.08],
      ['Reasoning', -14.5, -13.2, 3.25, 2, '#f472b6', '#db2777', 1.3],
      ['Reflection', -18.2, -9.2, 1.9, 2, '#a78bfa', '#7c3aed', 1.04],
      // Left Inner Golden Slope (10)
      ['Algo', -5.4, -5.0, 0.95, 0, '#5eead4', '#14b8a6', 0.92],
      ['Git', -8.8, -6.2, 1.1, 0, '#fb923c', '#f97316', 0.88],
      ['GPU', -6.4, -7.6, 1.15, 1, '#60a5fa', '#2563eb', 0.88],
      ['Python', -8.4, -9.6, 1.35, 0, '#facc15', '#eab308', 1.12],
      ['DL', -4.8, -9.6, 1.35, 1, '#38bdf8', '#0ea5e9', 1.0],
      ['ML', -11.8, -10.8, 1.45, 1, '#c084fc', '#a855f7', 1.02],
      ['Embedding', -9.4, -12.5, 1.6, 1, '#4ade80', '#22c55e', 1.26],
      ['NLP', -4.6, -12.4, 1.55, 1, '#fb7185', '#f43f5e', 0.96],
      ['SFT', -11.4, -13.8, 1.9, 1, '#67e8f9', '#06b6d4', 1.0],
      ['LLM', -7.6, -14.2, 3.25, 2, '#fbe296', '#f59e0b', 1.34],
      // Flanking Summit Peaks & Open Cloud Skyline (8)
      ['Prompt', -11.0, -15.6, 3.45, 2, '#fb7185', '#f43f5e', 1.24],
      ['ReAct', -16.2, -9.8, 3.45, 2, '#5eead4', '#0d9488', 1.02],
      ['CoT', -6.4, -16.8, 2.25, 2, '#fb923c', '#ea580c', 1.04],
      ['MoE', -3.9, -15.4, 3.55, 2, '#c084fc', '#9333ea', 1.1],
      ['AGI', 5.0, -16.8, 4.35, 2, '#fbe296', '#fbbf24', 1.36],
      ['Multi-Agent', 8.8, -14.8, 3.55, 2, '#34d399', '#10b981', 1.34],
      ['Function Call', 5.6, -12.0, 2.55, 2, '#38bdf8', '#0284c7', 1.26],
      ['Planning', 15.2, -13.5, 3.35, 2, '#f472b6', '#ec4899', 1.12],
      // Right Inner Golden Slope (8)
      ['SQL', 5.2, -6.8, 1.2, 0, '#38bdf8', '#0ea5e9', 0.9],
      ['Java', 8.4, -8.4, 1.45, 0, '#fb923c', '#f97316', 1.08],
      ['API', 4.5, -9.8, 1.35, 0, '#67e8f9', '#06b6d4', 0.88],
      ['Skill', 10.6, -9.8, 1.5, 1, '#c084fc', '#9333ea', 0.88],
      ['RAG', 8.0, -10.8, 1.3, 1, '#fbbf24', '#f59e0b', 1.1],
      ['DPO', 4.4, -12.8, 1.55, 1, '#fb7185', '#e11d48', 0.9],
      ['LoRA', 10.4, -12.8, 1.7, 1, '#f472b6', '#ec4899', 1.04],
      ['ToT', 9.2, -14.8, 2.1, 2, '#34d399', '#10b981', 0.98],
      // Right Outer Ridge (10)
      ['KB', 11.8, -8.8, 1.45, 0, '#fde047', '#ca8a04', 0.84],
      ['TCP/IP', 14.8, -8.2, 1.65, 0, '#7dd3fc', '#0284c7', 0.94],
      ['OCR', 17.4, -10.2, 1.55, 0, '#fb7185', '#f43f5e', 0.88],
      ['K8s', 13.8, -10.8, 1.75, 1, '#818cf8', '#6366f1', 1.08],
      ['ASR', 12.6, -12.8, 1.55, 1, '#a3e635', '#65a30d', 0.88],
      ['RL', 18.6, -12.2, 2.2, 2, '#a3e635', '#65a30d', 0.98],
      ['MLLM', 16.4, -13.8, 1.9, 1, '#facc15', '#eab308', 1.06],
      ['vLLM', 13.4, -14.8, 2.25, 2, '#2dd4bf', '#0d9488', 1.12],
      ['AIGC', 18.2, -15.0, 1.85, 2, '#c084fc', '#9333ea', 1.04],
      ['TPU', 17.4, -16.8, 1.55, 1, '#fb923c', '#ea580c', 0.84],
    ];

    const mountainKeywordSprites: {
      sprite: THREE.Sprite;
      baseY: number;
      tier: number;
      phase: number;
    }[] = mountainKeywordSpecs.map(([label, kx, kz, yOff, tier, color, glow, sc], idx) => {
      const mat = new THREE.SpriteMaterial({
        map: makeMountainKeywordTexture(label, color, glow),
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const sp = new THREE.Sprite(mat);
      const groundH = Math.max(mainMtnHeight(kx, kz), farMtnHeight(kx, kz));
      const baseY = groundH + yOff;
      sp.position.set(kx, baseY, kz);
      const heightScale = 1.48 * sc;
      const widthScale = heightScale * (512 / 112);
      sp.scale.set(widthScale, heightScale, 1);
      scene.add(sp);
      return {
        sprite: sp,
        baseY,
        tier,
        phase: idx * 0.73,
      };
    });

    // 60 rising multi-color stardust particles framing the alpine tech slopes
    const MTN_DUST_COUNT = 60;
    const mtnDustGeo = new THREE.BufferGeometry();
    const mtnDustPos = new Float32Array(MTN_DUST_COUNT * 3);
    const mtnDustCols = new Float32Array(MTN_DUST_COUNT * 3);
    const mtnDustMeta: { x: number; z: number; baseY: number; speed: number; phase: number }[] = [];
    const dustPalette = [
      new THREE.Color(0xfbe296),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0x4ade80),
      new THREE.Color(0xc084fc),
    ];
    for (let i = 0; i < MTN_DUST_COUNT; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const dx = side * (3.6 + Math.random() * 14.5);
      const dz = -5.5 - Math.random() * 15.0;
      const dy = Math.max(mainMtnHeight(dx, dz), farMtnHeight(dx, dz)) + 0.4 + Math.random() * 2.2;
      mtnDustPos[i * 3] = dx;
      mtnDustPos[i * 3 + 1] = dy;
      mtnDustPos[i * 3 + 2] = dz;
      const col = dustPalette[i % dustPalette.length];
      mtnDustCols[i * 3] = col.r;
      mtnDustCols[i * 3 + 1] = col.g;
      mtnDustCols[i * 3 + 2] = col.b;
      mtnDustMeta.push({ x: dx, z: dz, baseY: dy, speed: 0.35 + Math.random() * 0.45, phase: Math.random() * Math.PI * 2 });
    }
    mtnDustGeo.setAttribute('position', new THREE.BufferAttribute(mtnDustPos, 3));
    mtnDustGeo.setAttribute('color', new THREE.BufferAttribute(mtnDustCols, 3));
    const mtnDustPoints = new THREE.Points(
      mtnDustGeo,
      new THREE.PointsMaterial({
        size: 0.24,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    scene.add(mtnDustPoints);

    // ===== 2D Particle Canvas Resize & Synthesis Renderer =====
    let fw = window.innerWidth;
    let fh = window.innerHeight;
    let fdpr = Math.min(window.devicePixelRatio || 1, 2);
    let emblemCx = fw * 0.5;
    let emblemCy = fh * 0.38;
    let emblemSz = 210;

    function measureLockupBox() {
      const box = emblemBoxRef.current;
      if (box) {
        const r = box.getBoundingClientRect();
        if (r.width > 0) {
          emblemCx = r.left + r.width * 0.5;
          emblemCy = r.top + r.height * 0.5;
          emblemSz = r.width;
          return;
        }
      }
      emblemCx = fw * 0.5;
      emblemCy = fh * 0.36;
      emblemSz = Math.min(fw, fh) * 0.26;
    }

    function resizeAll() {
      fw = window.innerWidth;
      fh = window.innerHeight;
      fdpr = Math.min(window.devicePixelRatio || 1, 2);
      const aspect = fw / Math.max(1, fh);
      camera.fov = getFovForAspect(aspect);
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(fw, fh);

      finaleCanvas.width = Math.floor(fw * fdpr);
      finaleCanvas.height = Math.floor(fh * fdpr);
      fctx!.setTransform(fdpr, 0, 0, fdpr, 0, 0);
      measureLockupBox();
    }

    function renderFinaleSynthesis(localSec: number, now: number) {
      fctx!.clearRect(0, 0, fw, fh);
      const backdropEl = backdropRef.current;
      const lockupEl = lockupRef.current;
      const emblemEl = emblemRef.current;
      const wordmarkEl = wordmarkRef.current;
      const dividerEl = dividerRef.current;
      const subtitleEl = subtitleRef.current;
      const manifestoEl = manifestoRef.current;
      if (!lockupEl || !emblemEl || !wordmarkEl || !dividerEl || !subtitleEl) return;

      if (localSec < 0) {
        if (backdropEl) backdropEl.style.opacity = '0';
        lockupEl.style.opacity = '0';
        emblemEl.style.opacity = '0';
        wordmarkEl.style.opacity = '0';
        dividerEl.style.opacity = '0';
        dividerEl.style.width = '0px';
        subtitleEl.style.opacity = '0';
        if (manifestoEl) manifestoEl.style.opacity = '0';
        return;
      }

      if (backdropEl) {
        backdropEl.style.opacity = String(clamp01(localSec / 0.45));
      }
      lockupEl.style.opacity = '1';
      measureLockupBox();

      const darkNow = isDarkRef.current;
      const snapMoment = 1.08;
      const pFade = localSec < snapMoment ? 1.0 : Math.max(0, 1 - (localSec - snapMoment) / 0.42);
      const particles = fParticlesRef.current;

      if (pFade > 0.01 && particles.length > 0) {
        fctx!.save();
        fctx!.globalCompositeOperation = darkNow ? 'lighter' : 'source-over';
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const t = clamp01((localSec - p.delay) / 0.92);
          const e = easeOutExpo(t);
          const rem = 1 - e;
          const tx = emblemCx + p.nx * emblemSz;
          const ty = emblemCy + p.ny * emblemSz;
          const ang = p.startAngle + e * (p.isGold ? 2.5 : -2.5);
          const dist = p.startDist * rem * rem;
          const px = tx + Math.cos(ang) * dist;
          const py = ty + Math.sin(ang) * dist;
          const alpha = clamp01(t * 2.5) * pFade * (0.75 + 0.25 * Math.sin(now * 0.014 + p.phase));

          if (rem > 0.07) {
            const prevX = tx + Math.cos(ang - 0.14) * (dist * 1.14);
            const prevY = ty + Math.sin(ang - 0.14) * (dist * 1.14);
            fctx!.strokeStyle = p.isGold
              ? darkNow
                ? `rgba(245, 200, 96, ${(alpha * 0.6).toFixed(3)})`
                : `rgba(217, 154, 38, ${(alpha * 0.58).toFixed(3)})`
              : darkNow
                ? `rgba(186, 230, 253, ${(alpha * 0.5).toFixed(3)})`
                : `rgba(45, 78, 138, ${(alpha * 0.48).toFixed(3)})`;
            fctx!.lineWidth = p.size * 0.9;
            fctx!.beginPath();
            fctx!.moveTo(prevX, prevY);
            fctx!.lineTo(px, py);
            fctx!.stroke();
          }

          fctx!.fillStyle = p.isGold
            ? darkNow
              ? `rgba(251, 226, 150, ${alpha.toFixed(3)})`
              : `rgba(202, 138, 18, ${alpha.toFixed(3)})`
            : darkNow
              ? `rgba(232, 244, 255, ${alpha.toFixed(3)})`
              : `rgba(27, 59, 111, ${alpha.toFixed(3)})`;
          fctx!.beginPath();
          fctx!.arc(px, py, p.size * (0.75 + rem * 0.7), 0, Math.PI * 2);
          fctx!.fill();
        }
        fctx!.restore();
      }

      // Dual shockwave ring at snapMoment (1.08s)
      const shP = clamp01((localSec - snapMoment) / 0.75);
      if (shP > 0 && shP < 1) {
        const sr = emblemSz * (0.38 + easeOutExpo(shP) * 1.25);
        const sa = (1 - shP) * (1 - shP);
        fctx!.save();
        fctx!.beginPath();
        fctx!.arc(emblemCx, emblemCy, sr, 0, Math.PI * 2);
        fctx!.strokeStyle = darkNow
          ? `rgba(251, 226, 150, ${(sa * 0.9).toFixed(3)})`
          : `rgba(208, 146, 28, ${(sa * 0.85).toFixed(3)})`;
        fctx!.lineWidth = 3.2 * (1 - shP) + 0.6;
        fctx!.stroke();

        const sr2 = emblemSz * (0.3 + easeOutCubic(shP) * 0.95);
        fctx!.beginPath();
        fctx!.arc(emblemCx, emblemCy, sr2, 0, Math.PI * 2);
        fctx!.strokeStyle = darkNow
          ? `rgba(56, 189, 248, ${(sa * 0.7).toFixed(3)})`
          : `rgba(27, 59, 111, ${(sa * 0.62).toFixed(3)})`;
        fctx!.lineWidth = 2.0 * (1 - shP) + 0.4;
        fctx!.stroke();
        fctx!.restore();
      }

      const embP = clamp01((localSec - 0.88) / 0.38);
      const embE = easeOutCubic(embP);
      const popScale =
        localSec >= snapMoment
          ? 1 + Math.sin(clamp01((localSec - snapMoment) / 0.35) * Math.PI) * 0.05
          : 0.92 + 0.08 * embE;
      emblemEl.style.opacity = String(embE);
      emblemEl.style.transform = `scale(${popScale.toFixed(4)})`;

      const wP = clamp01((localSec - 1.05) / 0.42);
      const wE = easeOutExpo(wP);
      wordmarkEl.style.opacity = String(wE);
      wordmarkEl.style.transform = `translateY(${((1 - wE) * 16).toFixed(1)}px)`;

      const dP = clamp01((localSec - 1.15) / 0.4);
      const dE = easeOutExpo(dP);
      dividerEl.style.opacity = String(dE);
      dividerEl.style.width = `${(dE * Math.min(240, fw * 0.48)).toFixed(1)}px`;

      const sP = clamp01((localSec - 1.22) / 0.45);
      const sE = easeOutCubic(sP);
      subtitleEl.style.opacity = String(sE);
      subtitleEl.style.transform = `translateY(${((1 - sE) * 10).toFixed(1)}px)`;

      if (manifestoEl) {
        const mP = clamp01((localSec - 1.48) / 0.54);
        const mE = easeOutCubic(mP);
        manifestoEl.style.opacity = String(mE);
        manifestoEl.style.transform = `translateY(${((1 - mE) * 14).toFixed(1)}px)`;
      }
    }

    // ===== Pointer Drag 360 Orbit, Click-to-Zoom Raycaster & Wheel Zoom =====
    const raycaster = new THREE.Raycaster();
    const ndcPointer = new THREE.Vector2();

    let curYaw = OVERVIEW_CAMERA.yaw;
    let curPitch = OVERVIEW_CAMERA.pitch;
    let curDist = OVERVIEW_CAMERA.dist;
    let targetYaw = OVERVIEW_CAMERA.yaw;
    let targetPitch = OVERVIEW_CAMERA.pitch;
    let targetDist = OVERVIEW_CAMERA.dist;

    const curLookTarget = new THREE.Vector3(...OVERVIEW_CAMERA.lookAt);
    const targetLookAt = new THREE.Vector3(...OVERVIEW_CAMERA.lookAt);
    const lastCinPos = new THREE.Vector3(0, 10, 22);
    const lastCinLook = new THREE.Vector3(...OVERVIEW_CAMERA.lookAt);

    let dragging = false;
    let moved = false;
    let downX = 0;
    let downY = 0;
    let lastX = 0;
    let lastY = 0;

    const seedOrbitFromCinematic = () => {
      if (freeOrbitRef.current) return;
      const dx = lastCinPos.x - lastCinLook.x;
      const dy = lastCinPos.y - lastCinLook.y;
      const dz = lastCinPos.z - lastCinLook.z;
      const r = Math.max(5.5, Math.min(34.0, Math.hypot(dx, dy, dz)));
      curLookTarget.copy(lastCinLook);
      targetLookAt.copy(lastCinLook);
      curYaw = targetYaw = Math.atan2(dx, dz);
      curPitch = targetPitch = Math.max(0.08, Math.min(1.12, Math.asin(Math.max(-0.95, Math.min(0.95, dy / r)))));
      curDist = targetDist = r;
    };

    const getDynamicZoneLookAt = (zoneId: ZoneId): [number, number, number] => {
      if (zoneId === 'summit') {
        return [0.0, summitY + 1.45, -16.5];
      }
      return ZONE_PRESETS[zoneId].lookAt;
    };

    const focusZone = (zoneId: ZoneId) => {
      const preset = ZONE_PRESETS[zoneId];
      if (!freeOrbitRef.current) {
        curLookTarget.copy(lastCinLook);
        const dx = lastCinPos.x - lastCinLook.x;
        const dy = lastCinPos.y - lastCinLook.y;
        const dz = lastCinPos.z - lastCinLook.z;
        const r = Math.max(6.0, Math.min(34.0, Math.hypot(dx, dy, dz)));
        curYaw = Math.atan2(dx, dz);
        curPitch = Math.max(0.08, Math.min(1.12, Math.asin(Math.max(-0.95, Math.min(0.95, dy / r)))));
        curDist = r;
      }
      freeOrbitRef.current = true;
      setFreeOrbit(true);
      isPausedRef.current = true;
      setIsPaused(true);
      focusedZoneRef.current = zoneId;
      setFocusedZone(zoneId);
      const lk = getDynamicZoneLookAt(zoneId);
      targetLookAt.set(lk[0], lk[1], lk[2]);
      targetYaw = preset.yaw;
      targetPitch = preset.pitch;
      targetDist = preset.dist;
      showToast(`已放大特写：${preset.label}（滚轮缩放 · 拖拽环视）`);
    };

    const resetOverview = () => {
      if (!freeOrbitRef.current) {
        seedOrbitFromCinematic();
      }
      freeOrbitRef.current = true;
      setFreeOrbit(true);
      isPausedRef.current = true;
      setIsPaused(true);
      focusedZoneRef.current = null;
      setFocusedZone(null);
      targetLookAt.set(...OVERVIEW_CAMERA.lookAt);
      targetYaw = OVERVIEW_CAMERA.yaw;
      targetPitch = OVERVIEW_CAMERA.pitch;
      targetDist = OVERVIEW_CAMERA.dist;
      showToast('已还原 3D 全景视角（点击 ▶ 继续可恢复动画播放）');
    };

    focusZoneFnRef.current = focusZone;
    resetOverviewFnRef.current = resetOverview;

    const findHitZone = (clientX: number, clientY: number): ZoneId | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return null;
      ndcPointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      ndcPointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndcPointer, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      for (let i = 0; i < intersects.length; i++) {
        const hitObj = intersects[i].object;
        if (hitObj.type === 'Sprite' || hitObj.userData?.noRaycast) continue;
        let curr: THREE.Object3D | null = hitObj;
        while (curr) {
          if (curr.userData?.zoneId) {
            return curr.userData.zoneId as ZoneId;
          }
          curr = curr.parent;
        }
      }
      return null;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true;
      moved = false;
      downX = e.clientX;
      downY = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      if (!moved && Math.hypot(e.clientX - downX, e.clientY - downY) >= 6) {
        moved = true;
        if (!freeOrbitRef.current) {
          seedOrbitFromCinematic();
          freeOrbitRef.current = true;
          setFreeOrbit(true);
          isPausedRef.current = true;
          setIsPaused(true);
          showToast('已开启 360° 自由拖动视角');
        }
      }
      if (moved) {
        targetYaw -= (e.clientX - lastX) * 0.008;
        targetPitch = Math.max(0.06, Math.min(1.18, targetPitch + (e.clientY - lastY) * 0.006));
      }
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      const wasDrag = moved;
      dragging = false;
      moved = false;
      if (!wasDrag) {
        const hitZone = findHitZone(e.clientX, e.clientY);
        if (hitZone) {
          focusZone(hitZone);
        }
      }
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!freeOrbitRef.current) {
        seedOrbitFromCinematic();
        freeOrbitRef.current = true;
        setFreeOrbit(true);
        isPausedRef.current = true;
        setIsPaused(true);
      }
      targetDist = Math.max(4.5, Math.min(36.0, targetDist + e.deltaY * 0.012));
    };

    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('resize', resizeAll);
    resizeAll();

    elapsedMsRef.current = 0;
    ambientSecRef.current = 0;
    lastTickRef.current = performance.now();
    let lastReportedAct = 0;
    let rafId = 0;
    const lookTarget = new THREE.Vector3();
    const orbitTarget = new THREE.Vector3();

    const renderFrame = (now: number) => {
      const rawDt = lastTickRef.current > 0 ? now - lastTickRef.current : 16;
      const dt = Math.min(50, Math.max(0, rawDt));
      const camDt = Math.min(0.12, Math.max(0.008, rawDt / 1000));
      lastTickRef.current = now;
      ambientSecRef.current += dt / 1000;

      if (!isPausedRef.current && !freeOrbitRef.current && !enteredRef.current) {
        elapsedMsRef.current = Math.min(TOTAL_DURATION_MS + 4000, elapsedMsRef.current + dt);
      }

      const elapsed = elapsedMsRef.current;
      const storySec = elapsed / 1000;
      const ambientSec = ambientSecRef.current;
      const effectSec = freeOrbitRef.current ? Math.max(storySec, 4.8) : storySec;
      const totalP = clamp01(elapsed / TOTAL_DURATION_MS);

      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${(totalP * 100).toFixed(1)}%`;
      }

      const actIdx = storySec < 1.8 ? 0 : storySec < 3.3 ? 1 : storySec < ACT4_START_SEC ? 2 : 3;
      if (actIdx !== lastReportedAct) {
        lastReportedAct = actIdx;
        setCurrentActIndex(actIdx);
      }

      if (
        !isPausedRef.current &&
        !holdModeRef.current &&
        !enteredRef.current &&
        !freeOrbitRef.current &&
        elapsed >= TOTAL_DURATION_MS + 1800
      ) {
        triggerExit();
      }

      // 1. 224 Rice Stalks growing (by effectSec) & gentle wind sway (by ambientSec)
      const ripenP = clamp01((effectSec - 0.85) / 1.25);
      matStem.color.lerpColors(colGreen, colGold, ripenP);
      matEar.color.lerpColors(colEarGreen, colEarGold, ripenP);
      matStem.emissive.setHex(ripenP > 0.5 ? 0x5c3c08 : 0x0d361c);
      matEar.emissive.setHex(ripenP > 0.5 ? 0x8f6214 : 0x1a4d26);
      paddyGlowLight.color.setHex(ripenP > 0.5 ? 0xf5c85c : 0x4ade80);

      for (let i = 0; i < TOTAL_STALKS; i++) {
        const m = stalkMeta[i];
        const growP = clamp01((effectSec - m.delay * 0.45) / 0.85);
        const h = Math.max(0.02, easeOutCubic(growP) * m.targetH);
        dummyObj.position.set(m.x, 0.1, m.z);
        dummyObj.rotation.set(0, m.rotY, Math.sin(ambientSec * 2.6 + m.phase) * 0.07);
        dummyObj.scale.set(0.95, h, 0.95);
        dummyObj.updateMatrix();
        instStems.setMatrixAt(i, dummyObj.matrix);
        instLeaves.setMatrixAt(i, dummyObj.matrix);
        instEars.setMatrixAt(i, dummyObj.matrix);
      }
      instStems.instanceMatrix.needsUpdate = true;
      instLeaves.instanceMatrix.needsUpdate = true;
      instEars.instanceMatrix.needsUpdate = true;

      // 2. Typing coders + Flying code character glyphs into Paddy
      fieldCoders.forEach((c, i) => {
        c.elbowLPivot.rotation.x = -0.95 + Math.sin(ambientSec * 13 + i) * 0.1;
        c.elbowRPivot.rotation.x = -0.95 + Math.cos(ambientSec * 13 + i) * 0.1;
      });
      for (let i = 0; i < flyingCodeSprites.length; i++) {
        const f = flyingCodeSprites[i];
        const u = (f.t + ambientSec * f.speed) % 1.0;
        const x = f.srcX + (f.dstX - f.srcX) * u;
        const z = f.srcZ + (f.dstZ - f.srcZ) * u;
        const y = 1.05 * (1 - u) + 0.55 * u + Math.sin(u * Math.PI) * f.arcH;
        f.sprite.position.set(x, y, z);
        const s = 0.65 + Math.sin(u * Math.PI) * 0.45;
        f.sprite.scale.set(0.75 * s, 0.38 * s, 1);
      }

      // 3. Stone Mill House: Mill rotation, Coder tossing software icon badges, Orbiting code ring
      upperMillPivot.rotation.y = -ambientSec * 1.55;
      millCoder.elbowLPivot.rotation.x = -0.95 + Math.sin(ambientSec * 14) * 0.12;
      millCoder.elbowRPivot.rotation.x = -0.95 + Math.cos(ambientSec * 14) * 0.12;

      for (let i = 0; i < tossedIcons.length; i++) {
        const ti = tossedIcons[i];
        const u = (ti.t + ambientSec * ti.speed) % 1.0;
        const px = -1.75 * (1 - u) + 0.35 * u;
        const pz = 0.25 * (1 - u) + 0.15 * u + Math.sin(u * Math.PI * 2) * 0.15;
        const py = 1.22 * (1 - u) + 1.45 * u + Math.sin(u * Math.PI) * 1.65;
        ti.sprite.position.set(px, py, pz);
        const sc = 0.56 + Math.sin(u * Math.PI) * 0.44;
        ti.sprite.scale.set(sc, sc, 1);
      }
      for (let i = 0; i < millOrbitGlyphs.length; i++) {
        const og = millOrbitGlyphs[i];
        const a = og.angle + ambientSec * 0.9;
        og.sprite.position.set(
          Math.cos(a) * 2.15,
          og.yOff + Math.sin(ambientSec * 2.4 + i) * 0.14,
          Math.sin(a) * 2.15
        );
      }
      ringTexGold.offset.x = ambientSec * 0.14;
      ringTexCyan.offset.x = -ambientSec * 0.18;
      millCodeRing.rotation.y = ambientSec * 0.24;
      summitCodeRing.rotation.y = -ambientSec * 0.3;
      millLanternLight.intensity = 3.1 + Math.sin(ambientSec * 4.5) * 0.35;

      // 4. 4 Climbers walking up the 56 carved stone steps
      climbers.forEach((cl, idx) => {
        const u = (cl.baseU + ambientSec * cl.speed) % 0.94;
        const pos = trailCurve.getPoint(u);
        const nextPos = trailCurve.getPoint(Math.min(0.99, u + 0.02));
        const gy = Math.max(0.14, mainMtnHeight(pos.x, pos.z) + 0.16);
        cl.coder.group.position.set(pos.x, gy, pos.z);
        cl.coder.group.lookAt(nextPos.x, gy, nextPos.z);

        const stride = Math.sin(ambientSec * 7.2 + idx * 1.8) * 0.46;
        cl.coder.legLPivot.rotation.x = stride;
        cl.coder.legRPivot.rotation.x = -stride;
        cl.coder.calfLPivot.rotation.x = Math.max(0, -stride * 0.7);
        cl.coder.calfRPivot.rotation.x = Math.max(0, stride * 0.7);
        cl.coder.armLPivot.rotation.x = -stride * 0.65;
        cl.coder.armRPivot.rotation.x = stride * 0.65;
      });

      // 5. Summit AI Crystal, Titanium Humanoid Robot & Tiered Mountain Tech Keywords
      aiCrystal.rotation.y = ambientSec * 1.5;
      aiCrystal.position.y = Math.sin(ambientSec * 2.5) * 0.14;
      aiOrbit1.rotation.x = ambientSec * 1.2;
      aiOrbit1.rotation.y = ambientSec * 0.85;
      aiOrbit2.rotation.z = -ambientSec * 1.35;
      rArmRPivot.rotation.z = Math.sin(ambientSec * 3.8) * 0.18;
      rHalo.rotation.z = ambientSec * 0.85;

      for (let i = 0; i < mountainKeywordSprites.length; i++) {
        const kw = mountainKeywordSprites[i];
        kw.sprite.position.y = kw.baseY + Math.sin(ambientSec * 1.45 + kw.phase) * 0.16;
        const unlockStart = kw.tier === 0 ? 0.25 : kw.tier === 1 ? 2.2 : 3.25;
        const reveal = easeOutCubic(clamp01((effectSec - unlockStart) / 0.85));
        const pulse = 0.84 + 0.16 * Math.sin(ambientSec * 2.1 + kw.phase);
        kw.sprite.material.opacity = reveal * pulse * (kw.tier === 2 ? 0.96 : 0.88);
      }

      const dustPosAttr = mtnDustGeo.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < MTN_DUST_COUNT; i++) {
        const md = mtnDustMeta[i];
        const lift = (ambientSec * md.speed + md.phase) % 3.6;
        dustPosAttr.setXYZ(
          i,
          md.x + Math.sin(ambientSec * 1.2 + md.phase) * 0.28,
          md.baseY + lift,
          md.z
        );
      }
      dustPosAttr.needsUpdate = true;

      // 6. Act 4: 1250-Particle Synthesis Finale
      renderFinaleSynthesis(freeOrbitRef.current || focusedZoneRef.current ? -1 : storySec - ACT4_START_SEC, now);

      // 7. Compact 4-Act Cinematic Camera Choreography OR Free-Orbit / Zone Focus
      if (freeOrbitRef.current) {
        const camAlpha = 1 - Math.exp(-(moved ? 24 : 8.0) * camDt);
        curYaw += (targetYaw - curYaw) * camAlpha;
        curPitch += (targetPitch - curPitch) * camAlpha;
        curDist += (targetDist - curDist) * camAlpha;
        curLookTarget.lerp(targetLookAt, camAlpha);
        orbitTarget.set(
          curLookTarget.x + Math.sin(curYaw) * Math.cos(curPitch) * curDist,
          curLookTarget.y + Math.sin(curPitch) * curDist,
          curLookTarget.z + Math.cos(curYaw) * Math.cos(curPitch) * curDist
        );
        camera.position.lerp(orbitTarget, Math.min(1, camAlpha * 1.15));
        camera.lookAt(curLookTarget);
      } else {
        let cx: number, cy: number, cz: number, lx: number, ly: number, lz: number;
        if (storySec < 1.8) {
          const k = easeInOutCubic(clamp01(storySec / 1.8));
          cx = -12.0 + k * 7.5;
          cy = 3.6 + k * 1.0;
          cz = 12.6 - k * 1.0;
          lx = -7.6;
          ly = 1.2;
          lz = 4.8;
        } else if (storySec < 3.3) {
          const k = easeInOutCubic(clamp01((storySec - 1.8) / 1.5));
          cx = -4.5 + k * 14.2;
          cy = 4.6 - k * 0.8;
          cz = 11.6 - k * 0.6;
          lx = -7.6 + k * 15.8;
          ly = 1.2 + k * 1.1;
          lz = 4.8 - k * 0.6;
        } else if (storySec < ACT4_START_SEC) {
          const k = easeInOutCubic(clamp01((storySec - 3.3) / (ACT4_START_SEC - 3.3)));
          cx = 9.7 - k * 6.9;
          cy = 3.8 + k * 11.4;
          cz = 11.0 - k * 17.2;
          lx = 8.2 - k * 8.2;
          ly = 2.3 + k * 11.2;
          lz = 4.2 - k * 20.6;
        } else {
          // 顺滑过渡：从第三幕山巅视点沿正面平滑拉远至全景中心，消除 180° 甩头翻转
          const k = easeInOutCubic(clamp01((storySec - ACT4_START_SEC) / 1.35));
          const drift = (storySec - ACT4_START_SEC) * 0.08;
          cx = 2.8 * (1 - k) + Math.sin(drift) * 22.0 * k;
          cy = 15.2 * (1 - k) + 12.7 * k;
          cz = -6.2 * (1 - k) + Math.cos(drift) * 21.5 * k;
          lx = 0;
          ly = 13.5 * (1 - k) + 4.4 * k;
          lz = -16.4 * (1 - k) + -4.5 * k;
        }
        camera.position.set(cx, cy, cz);
        lookTarget.set(lx, ly, lz);
        lastCinPos.copy(camera.position);
        lastCinLook.copy(lookTarget);
        camera.lookAt(lookTarget);
      }

      renderer.render(scene, camera);
    };

    const animate = (now: number) => {
      renderFrame(now);
      rafId = requestAnimationFrame(animate);
    };

    // 先完成首帧 WebGL 着色器编译与画布上屏，再重置时钟从第一幕 0.00s 起播并同步揭开首屏幕布
    renderFrame(lastTickRef.current);
    elapsedMsRef.current = 0;
    lastTickRef.current = performance.now();
    renderFrame(lastTickRef.current);
    releaseBootCurtain();
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
      stage.removeEventListener('pointerdown', onPointerDown);
      stage.removeEventListener('wheel', onWheel);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', resizeAll);

      const disposedGeos = new Set<THREE.BufferGeometry>();
      const disposedMats = new Set<THREE.Material>();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry && !disposedGeos.has(mesh.geometry)) {
          mesh.geometry.dispose();
          disposedGeos.add(mesh.geometry);
        }
        const matOrArr = (mesh as unknown as { material?: THREE.Material | THREE.Material[] }).material;
        if (Array.isArray(matOrArr)) {
          matOrArr.forEach((m) => {
            if (m && !disposedMats.has(m)) {
              m.dispose();
              disposedMats.add(m);
            }
          });
        } else if (matOrArr && !disposedMats.has(matOrArr)) {
          matOrArr.dispose();
          disposedMats.add(matOrArr);
        }
      });
      disposeTextures.forEach((tex) => tex.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === stage) {
        stage.removeChild(renderer.domElement);
      }
    };
  }, [showToast, triggerExit]);

  const activeAct = ACTS[currentActIndex] || ACTS[0];
  const activeZonePreset = focusedZone ? ZONE_PRESETS[focusedZone] : null;
  const displayEmblemSrc = isDark ? darkEmblemUrl : '/images/heauio/logo-mark.png';

  return (
    <section
      id="hewei-intro-overlay"
      aria-label="禾硙 3D 品牌开场动画"
      className={`fixed inset-0 z-[120] overflow-hidden select-none ${isDark ? 'text-slate-50' : 'text-slate-900'}`}
      style={{
        background: 'transparent',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.04)' : 'scale(1)',
        transition: `opacity ${FADE_OUT_MS}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${FADE_OUT_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      {/* WebGL Three.js 4-Act Scene */}
      <div
        ref={stageRef}
        className="absolute inset-0 w-full h-full cursor-pointer active:cursor-grabbing"
      />

      {/* Act 4 Focused Cinematic Dimmer / Light Mist Veil Behind Particle Lockup */}
      <div
        ref={backdropRef}
        className="absolute inset-0 pointer-events-none z-[7]"
        style={{
          opacity: 0,
          background: isDark
            ? 'radial-gradient(circle at 50% 45%, rgba(4, 8, 22, 0.66) 0%, rgba(4, 8, 20, 0.46) 55%, rgba(3, 6, 16, 0.7) 100%)'
            : 'radial-gradient(circle at 50% 45%, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.74) 56%, rgba(226, 232, 240, 0.36) 100%)',
          backdropFilter: isDark ? 'blur(4px)' : 'blur(6px)',
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* 2D Particle Synthesis Canvas */}
      <canvas
        ref={finaleCanvasRef}
        className="absolute inset-0 w-full h-full z-[9] pointer-events-none"
      />

      {/* Act 4 Brand Emblem, Wordmark, Subtitle & Brand Manifesto Lockup */}
      <div
        ref={lockupRef}
        className="absolute inset-0 z-[11] flex flex-col items-center justify-center pointer-events-none px-4 pb-16 sm:pb-20"
        style={{ opacity: 0 }}
      >
        <div
          ref={emblemBoxRef}
          className="relative flex items-center justify-center mb-2.5"
          style={{
            width: 'clamp(132px, 22vmin, 204px)',
            height: 'clamp(132px, 22vmin, 204px)',
          }}
        >
          <img
            ref={emblemRef}
            src={displayEmblemSrc}
            alt="禾硙徽标"
            draggable={false}
            className="w-full h-full object-contain will-change-transform"
            style={{
              opacity: 0,
              transform: 'scale(0.92)',
              filter: isDark
                ? 'drop-shadow(0 0 28px rgba(216, 172, 75, 0.55)) drop-shadow(0 0 18px rgba(226, 232, 240, 0.42))'
                : 'drop-shadow(0 6px 20px rgba(27, 59, 111, 0.16)) drop-shadow(0 0 18px rgba(212, 173, 114, 0.38))',
            }}
          />
        </div>

        <svg
          ref={wordmarkRef}
          viewBox="0 0 2180 1040"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="禾硙"
          className="h-auto will-change-transform"
          style={{
            width: 'clamp(104px, 16.5vmin, 152px)',
            opacity: 0,
            transform: 'translateY(16px)',
            filter: isDark
              ? 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.92)) drop-shadow(0 0 14px rgba(255, 255, 255, 0.24))'
              : 'drop-shadow(0 3px 14px rgba(15, 23, 42, 0.14))',
          }}
        >
          <g fill={isDark ? '#f8fafc' : '#0f172a'}>
            <path
              d="M779 842C611 792 338 757 92 741C106 712 122 660 126 627C226 633 331 642 435 654V514H53V392H379C294 269 159 151 27 85C56 60 97 11 118 -21C234 49 347 157 435 280V-89H565V284C654 162 768 53 883 -16C905 17 947 66 976 91C846 157 710 272 624 392H950V514H565V672C677 689 785 710 878 736Z"
              transform="translate(20, 880) scale(1, -1)"
            />
            <path
              d="M410 510V398H788V324H420V83C420 -31 461 -63 599 -63C628 -63 777 -63 807 -63C927 -63 960 -24 976 127C945 134 895 152 871 170C864 60 856 43 799 43C763 43 637 43 609 43C544 43 532 50 532 86V211H898V510ZM405 790V575H904V790H800V673H706V825H596V673H506V790ZM40 805V697H150C125 564 84 441 21 358C37 323 59 247 63 216C77 233 91 252 104 272V-42H202V33H374V494H208C230 559 248 628 262 697H383V805ZM202 389H275V137H202Z"
              transform="translate(1160, 880) scale(1, -1)"
            />
          </g>
        </svg>

        <div
          ref={dividerRef}
          style={{
            width: 0,
            height: '1.5px',
            margin: '10px 0 9px',
            opacity: 0,
            background: isDark
              ? 'linear-gradient(90deg, rgba(216,172,75,0) 0%, #fbe296 35%, #ffffff 50%, #fbe296 65%, rgba(216,172,75,0) 100%)'
              : 'linear-gradient(90deg, rgba(212,173,114,0) 0%, #d4ad72 35%, #1b3b6f 50%, #d4ad72 65%, rgba(212,173,114,0) 100%)',
            boxShadow: isDark ? '0 0 12px rgba(251, 226, 150, 0.85)' : '0 0 10px rgba(212, 173, 114, 0.45)',
          }}
        />

        <div
          ref={subtitleRef}
          className={`font-semibold will-change-transform ${isDark ? 'text-slate-100' : 'text-slate-800'}`}
          style={{
            fontSize: 'clamp(13px, 1.85vmin, 16px)',
            letterSpacing: '0.22em',
            opacity: 0,
            transform: 'translateY(10px)',
            textShadow: isDark
              ? '0 2px 14px rgba(0, 0, 0, 0.95), 0 0 12px rgba(216, 172, 75, 0.35)'
              : '0 1px 10px rgba(255, 255, 255, 0.95)',
          }}
        >
          田 · 坊 · 山 · 智　代码环抱合一
        </div>

        {/* Brand Philosophy Manifesto */}
        <div
          ref={manifestoRef}
          className={`mt-3 sm:mt-3.5 max-w-[min(90vw,640px)] px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border backdrop-blur-md text-center leading-relaxed will-change-transform ${
            isDark
              ? 'bg-slate-950/60 border-amber-300/25 text-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.45)]'
              : 'bg-white/80 border-slate-300/70 text-slate-700 shadow-[0_10px_28px_rgba(15,23,42,0.08)]'
          }`}
          style={{
            fontSize: 'clamp(12px, 1.55vmin, 14px)',
            letterSpacing: '0.04em',
            opacity: 0,
            transform: 'translateY(14px)',
          }}
        >
          以耕耘种下创意与代码<span className={isDark ? 'text-[#fbe296] font-semibold' : 'text-amber-700 font-semibold'}>（禾）</span>
          ，经由工具与算法反复打磨淬炼<span className={isDark ? 'text-[#fbe296] font-semibold' : 'text-amber-700 font-semibold'}>（硙 · 石磨）</span>
          ，最终沉淀出真正硬核的作品与高度<span className={isDark ? 'text-[#fbe296] font-semibold' : 'text-amber-700 font-semibold'}>（硙 · 高峰）</span>
        </div>
      </div>

      {/* Director / Replay Toolbar (shown only in manual replay mode) */}
      {mode === 'replay' && (
        <div
          data-intro-toolbar
          className="fixed top-4 right-4 z-[130] flex flex-wrap items-center justify-end gap-2"
        >
          <button
            type="button"
            onClick={handleReplay}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium border backdrop-blur-md transition ${
              isDark
                ? 'text-slate-200 border-slate-200/20 bg-slate-950/75 hover:border-amber-300/70 hover:text-white hover:bg-amber-400/20'
                : 'text-slate-700 border-slate-300/80 bg-white/80 shadow-sm hover:border-amber-500/60 hover:text-slate-950 hover:bg-amber-50/90'
            }`}
          >
            重播大片
          </button>
          <button
            type="button"
            onClick={handleToggleOrbit}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium border backdrop-blur-md transition ${
              freeOrbit
                ? isDark
                  ? 'border-amber-300 text-amber-200 bg-amber-400/20'
                  : 'border-amber-500 text-amber-800 bg-amber-100/90 shadow-sm'
                : isDark
                  ? 'border-slate-200/20 text-slate-200 bg-slate-950/75 hover:border-amber-300/70 hover:text-white'
                  : 'border-slate-300/80 text-slate-700 bg-white/80 shadow-sm hover:border-amber-500/60 hover:text-slate-950'
            }`}
          >
            自由旋转 360°
          </button>
          <button
            type="button"
            onClick={handleToggleHold}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium border backdrop-blur-md transition ${
              holdMode
                ? isDark
                  ? 'border-amber-300 text-amber-200 bg-amber-400/20'
                  : 'border-amber-500 text-amber-800 bg-amber-100/90 shadow-sm'
                : isDark
                  ? 'border-slate-200/20 text-slate-200 bg-slate-950/75 hover:border-amber-300/70 hover:text-white'
                  : 'border-slate-300/80 text-slate-700 bg-white/80 shadow-sm hover:border-amber-500/60 hover:text-slate-950'
            }`}
          >
            播放后定格
          </button>
          <button
            type="button"
            data-intro-exit
            onClick={triggerExit}
            className="rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-950 bg-gradient-to-r from-[#d8ac4b] to-[#fbe296] hover:brightness-105 transition shadow-md shadow-amber-500/20"
          >
            返回官网
          </button>
        </div>
      )}

      {/* Minimalist Story Timeline HUD */}
      <div
        className={`fixed left-1/2 bottom-4 sm:bottom-6 -translate-x-1/2 z-[124] flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-2xl border backdrop-blur-xl text-center transition-colors ${
          isDark
            ? 'border-slate-200/15 bg-slate-950/75 shadow-[0_12px_32px_rgba(0,0,0,0.45)]'
            : 'border-white/80 bg-white/75 shadow-[0_10px_28px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.9)]'
        }`}
        style={{ width: 'min(94vw, 610px)' }}
      >
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span
            data-intro-active-badge
            className={`font-mono text-[11px] tracking-[0.14em] px-2.5 py-0.5 rounded-full border ${
              isDark
                ? 'text-[#fbe296] bg-slate-900/80 border-amber-400/35'
                : 'text-amber-800 bg-amber-50/90 border-amber-500/40'
            }`}
          >
            {activeZonePreset
              ? `特写 · ${activeZonePreset.label}`
              : freeOrbit
                ? '全景漫游 · 360°'
                : isPaused
                  ? `${activeAct.badge} · 已暂停`
                  : activeAct.badge}
          </span>
          <span className={`text-xs sm:text-[13px] font-medium tracking-[0.06em] ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
            {activeZonePreset
              ? activeZonePreset.caption
              : isPaused
                ? '已暂停 · 点击 3D 场景任意区域可放大特写，拖拽旋转或滚轮缩放'
                : activeAct.caption}
          </span>
          {(mode === 'auto' || freeOrbit || focusedZone) && (
            <div className="flex items-center gap-1.5 ml-0.5">
              {mode === 'auto' && (
                <button
                  type="button"
                  data-intro-pause
                  onClick={handleTogglePause}
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium border transition ${
                    isPaused
                      ? isDark
                        ? 'border-[#fbe296] text-[#fbe296] bg-amber-400/20'
                        : 'border-amber-600 text-amber-800 bg-amber-100/95'
                      : isDark
                        ? 'border-slate-400/30 text-slate-200 bg-slate-900/80 hover:border-amber-300/60'
                        : 'border-slate-300 text-slate-700 bg-white/85 hover:border-amber-500/60'
                  }`}
                >
                  {isPaused ? '▶ 继续' : '⏸ 暂停'}
                </button>
              )}
              {(freeOrbit || focusedZone) && (
                <button
                  type="button"
                  data-intro-reset-view
                  onClick={handleResetView}
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium border transition ${
                    isDark
                      ? 'border-sky-400/50 text-sky-200 bg-sky-500/15 hover:bg-sky-500/25'
                      : 'border-sky-600/45 text-sky-800 bg-sky-50/95 hover:bg-sky-100'
                  }`}
                >
                  ↺ 还原全景
                </button>
              )}
            </div>
          )}
        </div>

        <div className={`w-[min(400px,78vw)] h-[3px] rounded-full overflow-hidden mt-0.5 ${isDark ? 'bg-slate-400/20' : 'bg-slate-900/10'}`}>
          <div
            ref={progressFillRef}
            className="h-full w-0 rounded-full"
            style={{
              background: isDark
                ? 'linear-gradient(90deg, #4ade80, #fbe296, #38bdf8)'
                : 'linear-gradient(90deg, #16a34a, #d4ad72, #1b3b6f)',
              boxShadow: isDark ? '0 0 10px rgba(251, 226, 150, 0.85)' : '0 0 8px rgba(212, 173, 114, 0.55)',
            }}
          />
        </div>

        {mode === 'replay' && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-1">
            <button
              type="button"
              data-intro-pause
              onClick={handleTogglePause}
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium border transition ${
                isPaused
                  ? isDark
                    ? 'border-[#fbe296] text-[#fbe296] bg-amber-400/25 shadow-sm shadow-amber-400/15'
                    : 'border-amber-600 text-amber-800 bg-amber-100 font-semibold'
                  : isDark
                    ? 'border-slate-300/30 text-slate-100 bg-slate-800/85 hover:border-amber-300/70 hover:text-white'
                    : 'border-slate-300/90 text-slate-700 bg-white/90 hover:border-amber-500/60 hover:text-slate-950'
              }`}
            >
              {isPaused ? '▶ 继续' : '⏸ 暂停'}
            </button>
            {ACTS.map((act, idx) => (
              <button
                key={act.id}
                type="button"
                onClick={() => handleJumpAct(act, idx)}
                className={`rounded-full px-2.5 py-0.5 text-[11px] border transition ${
                  currentActIndex === idx && !freeOrbit
                    ? isDark
                      ? 'border-[#fbe296] text-[#fbe296] bg-amber-400/20'
                      : 'border-amber-600 text-amber-800 bg-amber-100/90 font-medium'
                    : isDark
                      ? 'border-slate-400/25 text-slate-300 bg-slate-900/75 hover:border-amber-200/60 hover:text-white'
                      : 'border-slate-300/80 text-slate-600 bg-white/75 hover:border-amber-500/60 hover:text-slate-900'
                }`}
              >
                {act.tabLabel}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Skip / Exit Pill Button */}
      <button
        type="button"
        data-intro-skip
        onClick={triggerExit}
        className={`fixed right-4 sm:right-7 bottom-4 sm:bottom-6 z-[126] rounded-full px-4 py-2 text-xs sm:text-[13px] font-medium border backdrop-blur-md transition ${
          isDark
            ? 'text-slate-200 border-slate-200/25 bg-slate-900/75 hover:bg-amber-400/20 hover:border-amber-300/65 hover:text-white'
            : 'text-slate-700 border-white/80 bg-white/80 shadow-[0_8px_22px_rgba(15,23,42,0.08)] hover:bg-amber-50 hover:border-amber-500/50 hover:text-slate-950'
        }`}
      >
        跳过 →
      </button>

      {/* Subtle Toast Notice */}
      {toastMsg && (
        <div
          className={`fixed left-1/2 top-16 -translate-x-1/2 z-[140] rounded-full px-4 py-1.5 text-xs font-medium border shadow-lg pointer-events-none ${
            isDark
              ? 'text-slate-50 bg-slate-950/90 border-amber-300/50'
              : 'text-slate-800 bg-white/95 border-amber-500/50'
          }`}
        >
          {toastMsg}
        </div>
      )}
    </section>
  );
}
