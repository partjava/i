'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { buildSpaceCapsuleRoom } from '../SpaceCapsuleRoom3D';
import {
  SITTING_CAT_PROFILE,
  UPRIGHT_CAT_PROFILE,
  CatFaceTuning
} from '../cat/catProfiles';
import { buildRiggedCatFromGLB, RiggedCatController } from '../cat/catShaderAndRig';
import styles from '../AI3DRobot.module.css';
import type { CatPosture, StageMood, ThoughtBubbleState } from './types';

export interface CatStageProps {
  /** 舞台根容器（父持有，供飞行动画起点定位） */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** ChatPanel 气泡 DOM（SVG 全息引线终点 + 飞行动画落点） */
  bubbleBoxRef: React.RefObject<HTMLDivElement | null>;
  // 3D 挂载点与猫控制器（父持有，供姿态切换与神态指令）
  robotAnchorRef: React.MutableRefObject<THREE.Group | undefined>;
  virtualPropsRef: React.MutableRefObject<THREE.Group | undefined>;
  riggedCatsRef: React.MutableRefObject<{
    standing?: RiggedCatController;
    crouching?: RiggedCatController;
    custom?: RiggedCatController;
  }>;
  activeCatRef: React.MutableRefObject<RiggedCatController | undefined>;
  activatePostureModel: (p: CatPosture) => void;

  // 状态驱动（注意力 / 灯光 / 思维气泡 / 灵气）
  isLoading: boolean;
  loadingProgress: number;
  isTyping: boolean;
  userTyping: boolean;
  micListening: boolean;
  stageMood: StageMood;
  thought: ThoughtBubbleState | null;
  affection: number; // 0-100，越高猫越活泼
  bubbleSide: 'right' | 'left';
  onCatClick: () => void;
  onPetRegion: (region: 'head' | 'body') => void;
  /** GLB 加载进度（0-88）与就绪回调（父组件据此结束加载态） */
  onProgress?: (pct: number) => void;
  onModelReady?: () => void;

  // 毛色五官微调面板
  showTuningPanel: boolean;
  rimStrength: number;
  whiteTipStrength: number;
  faceTuning: CatFaceTuning;
  showFurTufts: boolean;
  onShaderChange: (opts: { rim?: number; whiteTip?: number; tufts?: boolean }) => void;
  onFaceTuningChange: (patch: Partial<CatFaceTuning>) => void;
  onCloseTuning: () => void;

  // 覆盖层
  isDraggingOver: boolean;
  errorBanner: string | null;
}

/** 灯光情绪预设：环境光随对话状态变化（B8） */
const MOOD_PRESETS: Record<StageMood, { c1: number; c2: number; i1: number; i2: number; exp: number }> = {
  idle:      { c1: 0xeef6ff, c2: 0xfff2e2, i1: 18, i2: 16, exp: 1.18 },
  thinking:  { c1: 0xdfe8ff, c2: 0xffe9c4, i1: 21, i2: 15, exp: 1.12 },
  searching: { c1: 0x9fd8ff, c2: 0x7fe0e8, i1: 24, i2: 22, exp: 1.15 },
  speaking:  { c1: 0xfff0d8, c2: 0xffd9a8, i1: 20, i2: 18, exp: 1.2 },
  celebrate: { c1: 0xffe9b8, c2: 0xffc98a, i1: 26, i2: 24, exp: 1.32 },
};

/**
 * 3D 舞台：温暖书房场景 + 禾桔黑猫 + 全息引线 + 灵气系统
 * - A1 空闲微动作池（张望 / 轻跳 / 好奇 / 偶尔换姿势）
 * - A2 注意力状态机（看鼠标 / 看输入框 / 侧耳倾听 / 打瞌睡与惊醒）
 * - A3 摸猫反馈（悬停头部→开心；连摸三下→雀跃）
 * - B5 思维气泡（跟随猫头实时定位，思考/工具/说话三态）
 * - B8 灯光情绪（双侧轮廓光 + 曝光随 stageMood 平滑过渡）
 */
export default function CatStage(props: CatStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const thoughtRef = useRef<HTMLDivElement>(null);

  // SVG 嘴巴放射线 DOM 引用（60FPS 直接改属性，绕过 React 渲染）
  const mouthDotRef = useRef<SVGCircleElement>(null);
  const mouthPulseRef = useRef<SVGCircleElement>(null);
  const calloutPathRef = useRef<SVGPathElement>(null);
  const calloutGlowPathRef = useRef<SVGPathElement>(null);
  const bubbleAnchorDotRef = useRef<SVGCircleElement>(null);
  const bubbleSideRef = useRef<'right' | 'left'>('right');

  // 灵气系统的内部状态（放 ref 里避免重渲染，全部在动画循环里消费）
  const livePropsRef = useRef(props);
  livePropsRef.current = props;
  const mouseNDCRef = useRef({ x: 0, y: 0 });
  const effectiveNDCRef = useRef({ x: 0, y: 0 });
  const attentionTargetRef = useRef<{ x: number; y: number } | null>(null);
  const glanceUntilRef = useRef(0);
  const dozingRef = useRef(false);
  const lastActivityRef = useRef(Date.now());
  const nextIdleActionRef = useRef(Date.now() + 9000);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const hoverStateRef = useRef<{ region: string | null; streak: number; lastPetAt: number; lastRayAt: number }>({
    region: null, streak: 0, lastPetAt: 0, lastRayAt: 0,
  });

  // 同步气泡方向到循环用的 ref
  useEffect(() => {
    bubbleSideRef.current = props.bubbleSide;
  }, [props.bubbleSide]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const container = canvasRef.current.parentElement;
    if (!container) return;

    const getContainerSize = () => {
      const rect = container.getBoundingClientRect();
      return { width: Math.max(rect.width, 300), height: Math.max(rect.height, 300) };
    };
    const { width, height } = getContainerSize();

    // ============ 1. 场景、相机与渲染器 ============
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(width < 760 ? 45 : 34, width / height, 0.1, 80);
    camera.position.set(0, 3.08, 12.2);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.target.set(0, 1.55, -2.0);
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.045;
    orbit.enablePan = false;
    orbit.minDistance = 8.2;
    orbit.maxDistance = 14.2;
    orbit.minPolarAngle = 1.02;
    orbit.maxPolarAngle = 1.44;
    orbit.minAzimuthAngle = -0.26;
    orbit.maxAzimuthAngle = 0.26;
    orbit.update();

    // 温暖书房 + 环绕虚拟配饰
    const warmStudyRoom = buildSpaceCapsuleRoom(scene);
    props.robotAnchorRef.current = warmStudyRoom.robotAnchor;
    props.virtualPropsRef.current = warmStudyRoom.virtualPropsGroup;
    (window as any).robotAnchor = warmStudyRoom.robotAnchor;

    // 双侧背光轮廓聚光灯（灯光情绪的执行器）
    const rimSpotL = new THREE.SpotLight(0xeef6ff, 18, 8.5, Math.PI / 3, 0.65, 1.6);
    rimSpotL.position.set(-1.6, 3.4, -3.2);
    rimSpotL.target.position.set(0, 1.1, -1.55);
    scene.add(rimSpotL, rimSpotL.target);

    const rimSpotR = new THREE.SpotLight(0xfff2e2, 16, 8.5, Math.PI / 3, 0.65, 1.6);
    rimSpotR.position.set(1.6, 3.4, -3.2);
    rimSpotR.target.position.set(0, 1.1, -1.55);
    scene.add(rimSpotR, rimSpotR.target);

    // 灯光当前值（向预设平滑插值）
    const lightState = {
      c1: new THREE.Color(0xeef6ff),
      c2: new THREE.Color(0xfff2e2),
      i1: 18,
      i2: 16,
      exp: 1.18,
    };

    // ============ 2. 指针交互（眼神跟随 / 点击雀跃 / 悬停摸猫） ============
    const raycaster = new THREE.Raycaster();
    const pointerVec = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseNDCRef.current = { x: nx, y: ny };
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    };
    const markActivity = () => {
      lastActivityRef.current = Date.now();
      if (dozingRef.current) {
        // 惊醒：好奇抬头 + 雀跃
        dozingRef.current = false;
        const cat = props.activeCatRef.current;
        cat?.setMood('curious');
        cat?.triggerHappyJump();
        nextIdleActionRef.current = Date.now() + 6000;
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
      markActivity();
    };
    const onPointerUp = (e: PointerEvent) => {
      const moveDist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (moveDist > 6 || !warmStudyRoom.robotAnchor) return;
      const rect = container.getBoundingClientRect();
      pointerVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerVec.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      raycaster.setFromCamera(pointerVec, camera);
      const hits = raycaster.intersectObjects(warmStudyRoom.robotAnchor.children, true);
      if (hits.length > 0) {
        props.activeCatRef.current?.triggerHappyJump();
        livePropsRef.current.onCatClick();
      }
    };
    const onGlobalActivity = () => markActivity();

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointerup', onPointerUp);
    window.addEventListener('keydown', onGlobalActivity);

    // ============ 3. 加载双形态猫模型 ============
    const loader = new GLTFLoader();
    let standingReady = false;
    const updateProgress = (prog: number) => {
      // 经由回调上抛进度
      livePropsRef.current.onProgress?.(prog);
    };

    loader.load(
      '/models/cat-standing.glb',
      gltf => {
        const rigged = buildRiggedCatFromGLB(gltf.scene, SITTING_CAT_PROFILE, 2.18);
        props.riggedCatsRef.current.standing = rigged;
        standingReady = true;
        props.activatePostureModel('standing');
        livePropsRef.current.onModelReady?.();
      },
      xhr => {
        if (xhr.total > 0) updateProgress((xhr.loaded / xhr.total) * 88);
      },
      err => {
        console.error('加载坐姿黑猫 GLB 失败:', err);
        livePropsRef.current.onModelReady?.();
      }
    );
    loader.load(
      '/models/cat-crouching.glb',
      gltf => {
        const rigged = buildRiggedCatFromGLB(gltf.scene, UPRIGHT_CAT_PROFILE, 2.18);
        props.riggedCatsRef.current.crouching = rigged;
        if (!standingReady) {
          props.activatePostureModel('crouching');
          livePropsRef.current.onModelReady?.();
        }
      },
      undefined,
      err => console.error('加载站起黑猫 GLB 失败:', err)
    );

    (window as any).loadRobotFromURL = (url: string) => {
      loader.load(
        url,
        g => {
          const rigged = buildRiggedCatFromGLB(g.scene, undefined, 2.18);
          props.riggedCatsRef.current.custom = rigged;
          props.activatePostureModel('custom');
        },
        undefined,
        console.error
      );
    };

    // ============ 4. 渲染主循环（含注意力/灵气/灯光/全息引线/思维气泡） ============
    const clock = new THREE.Clock();
    const tmpColor = new THREE.Color();

    const animate = () => {
      requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();
      const live = livePropsRef.current;
      const cat = props.activeCatRef.current;

      orbit.update();
      warmStudyRoom.update(elapsed);

      // ---- A2 注意力状态机：决定本帧眼神/头部的目标 NDC ----
      let target: { x: number; y: number } | null = null;
      let followSpeed = 0.12;
      if (dozingRef.current) {
        target = { x: 0.12, y: -0.82 }; // 打瞌睡：头垂下
        followSpeed = 0.012;
      } else if (live.micListening) {
        target = { x: -0.52, y: -0.34 }; // 侧耳倾听：凑向麦克风方向
        followSpeed = 0.05;
      } else if (live.userTyping && !live.isTyping) {
        target = { x: 0.0, y: -0.74 }; // 看着输入框等你说完
        followSpeed = 0.04;
      } else if (Date.now() < glanceUntilRef.current) {
        target = attentionTargetRef.current; // 空闲张望
        followSpeed = 0.03;
      }
      if (target) {
        effectiveNDCRef.current.x += (target.x - effectiveNDCRef.current.x) * followSpeed;
        effectiveNDCRef.current.y += (target.y - effectiveNDCRef.current.y) * followSpeed;
      } else {
        effectiveNDCRef.current.x += (mouseNDCRef.current.x - effectiveNDCRef.current.x) * 0.14;
        effectiveNDCRef.current.y += (mouseNDCRef.current.y - effectiveNDCRef.current.y) * 0.14;
      }

      if (cat) {
        cat.update(dt, elapsed, effectiveNDCRef.current);

        // ---- A3 悬停摸猫（节流射线检测）----
        const hover = hoverStateRef.current;
        const now = Date.now();
        if (lastPointerRef.current && warmStudyRoom.robotAnchor && now - hover.lastRayAt > 90 && !live.isTyping) {
          hover.lastRayAt = now;
          const rect = container.getBoundingClientRect();
          pointerVec.x = ((lastPointerRef.current.x - rect.left) / rect.width) * 2 - 1;
          pointerVec.y = -(((lastPointerRef.current.y - rect.top) / rect.height) * 2 - 1);
          raycaster.setFromCamera(pointerVec, camera);
          const hits = raycaster.intersectObjects(warmStudyRoom.robotAnchor.children, true);
          if (hits.length > 0 && cat.root) {
            const catWorldY = new THREE.Vector3();
            cat.root.getWorldPosition(catWorldY);
            const region = hits[0].point.y - catWorldY.y > 1.02 ? 'head' : 'body';
            if (hover.region !== region) {
              hover.region = region;
              if (region === 'head') {
                cat.setMood('happy'); // 摸头：眯眼开心
                hover.streak = now - hover.lastPetAt < 4000 ? hover.streak + 1 : 1;
                hover.lastPetAt = now;
                if (hover.streak >= 3) {
                  // 连摸三下：雀跃 + 通知父组件增加亲密度
                  cat.triggerHappyJump();
                  live.onPetRegion('head');
                  hover.streak = 0;
                }
              } else {
                cat.setMood('curious'); // 碰身子：好奇回头
              }
            }
          } else if (hover.region !== null) {
            hover.region = null;
            cat.setMood('normal');
          }
        }
      }

      // ---- A1 空闲微动作导演（打瞌睡判定也在这里）----
      const now2 = Date.now();
      const idleOk =
        !live.isTyping && !live.micListening &&
        typeof document !== 'undefined' && document.visibilityState === 'visible';
      if (idleOk && !dozingRef.current && now2 - lastActivityRef.current > 22000) {
        dozingRef.current = true;
        cat?.setMood('normal');
      }
      if (idleOk && !dozingRef.current && now2 > nextIdleActionRef.current) {
        const affection = live.affection || 50;
        const roll = Math.random();
        if (roll < 0.38) {
          // 张望别处再回头
          attentionTargetRef.current = {
            x: (Math.random() - 0.5) * 1.5,
            y: (Math.random() - 0.4) * 0.8,
          };
          glanceUntilRef.current = now2 + 1600;
        } else if (roll < 0.62) {
          cat?.triggerHappyJump(); // 原地轻跳
        } else if (roll < 0.84) {
          cat?.setMood('curious'); // 好奇歪头
          setTimeout(() => {
            if (!dozingRef.current) props.activeCatRef.current?.setMood('normal');
          }, 1900);
        } else {
          // 偶尔起身/坐下换个姿势
          const cats = props.riggedCatsRef.current;
          if (cats.standing && cats.crouching) {
            props.activatePostureModel(
              props.activeCatRef.current === cats.standing ? 'crouching' : 'standing'
            );
          }
        }
        // 亲密度越高，小动作越频繁（间隔越短）
        const scale = 1.35 - (affection / 100) * 0.65;
        nextIdleActionRef.current = now2 + (7000 + Math.random() * 8000) * scale;
      }

      // ---- B8 灯光情绪插值 ----
      const preset = MOOD_PRESETS[live.stageMood] || MOOD_PRESETS.idle;
      lightState.c1.lerp(tmpColor.setHex(preset.c1), 0.05);
      lightState.c2.lerp(tmpColor.setHex(preset.c2), 0.05);
      lightState.i1 += (preset.i1 - lightState.i1) * 0.05;
      lightState.i2 += (preset.i2 - lightState.i2) * 0.05;
      lightState.exp += (preset.exp - lightState.exp) * 0.06;
      let breathe = 1;
      if (live.stageMood === 'thinking') breathe = 0.85 + 0.25 * Math.sin(elapsed * 2.4);
      if (live.stageMood === 'searching') breathe = 0.9 + 0.18 * Math.sin(elapsed * 3.2);
      rimSpotL.color.copy(lightState.c1);
      rimSpotR.color.copy(lightState.c2);
      rimSpotL.intensity = lightState.i1 * breathe;
      rimSpotR.intensity = lightState.i2 * breathe;
      renderer.toneMappingExposure = lightState.exp;

      renderer.render(scene, camera);

      // ---- 全息引线：嘴巴 2D 坐标 → 气泡边缘 ----
      const bubbleBox = livePropsRef.current.bubbleBoxRef.current;
      if (
        cat && viewportRef.current && bubbleBox &&
        calloutPathRef.current && calloutGlowPathRef.current &&
        mouthDotRef.current && mouthPulseRef.current && bubbleAnchorDotRef.current
      ) {
        const vRect = viewportRef.current.getBoundingClientRect();
        const bRect = bubbleBox.getBoundingClientRect();
        if (vRect.width > 0 && vRect.height > 0 && bRect.width > 0) {
          const mouthCoord = cat.getMouthScreenCoord(camera, vRect.width, vRect.height);
          const mx = mouthCoord.x;
          const my = mouthCoord.y;
          const side = bubbleSideRef.current;
          const targetX = side === 'right' ? bRect.left - vRect.left : bRect.right - vRect.left;
          const targetY = bRect.top - vRect.top + Math.min(82, bRect.height * 0.28);
          const dir = side === 'right' ? 1 : -1;
          const elbowX = mx + dir * Math.min(75, Math.abs(targetX - mx) * 0.42);
          const elbowY = targetY;
          const dPath = `M ${mx.toFixed(1)} ${my.toFixed(1)} L ${elbowX.toFixed(1)} ${elbowY.toFixed(1)} L ${targetX.toFixed(1)} ${targetY.toFixed(1)}`;
          calloutPathRef.current.setAttribute('d', dPath);
          calloutGlowPathRef.current.setAttribute('d', dPath);
          mouthDotRef.current.setAttribute('cx', mx.toFixed(1));
          mouthDotRef.current.setAttribute('cy', my.toFixed(1));
          mouthPulseRef.current.setAttribute('cx', mx.toFixed(1));
          mouthPulseRef.current.setAttribute('cy', my.toFixed(1));
          bubbleAnchorDotRef.current.setAttribute('cx', targetX.toFixed(1));
          bubbleAnchorDotRef.current.setAttribute('cy', targetY.toFixed(1));
        }

        // ---- B5 思维气泡：锁定猫头上方（直接改 transform，零重渲染） ----
        const thoughtEl = thoughtRef.current;
        if (thoughtEl) {
          const coord = cat.getMouthScreenCoord(camera, vRect.width, vRect.height);
          const tx = Math.max(8, Math.min(vRect.width - 96, coord.x - 42));
          const ty = Math.max(8, coord.y - 118);
          thoughtEl.style.transform = `translate(${tx.toFixed(0)}px, ${ty.toFixed(0)}px)`;
        }
      }
    };
    animate();

    // ============ 5. 响应式适配与清理 ============
    const handleResize = () => {
      if (!canvasRef.current) return;
      const { width: w, height: h } = getContainerSize();
      camera.aspect = w / h;
      camera.fov = w < 760 ? 45 : 34;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', onGlobalActivity);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointerup', onPointerUp);
      resizeObserver.disconnect();
      orbit.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isLoading, loadingProgress, isTyping,
    showTuningPanel, rimStrength, whiteTipStrength, faceTuning, showFurTufts,
    onShaderChange, onFaceTuningChange, onCloseTuning,
    isDraggingOver, errorBanner, thought,
  } = props;

  return (
    <div ref={viewportRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* 电影感柔光暗角 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(14, 13, 12, 0.32) 0%, rgba(14, 13, 12, 0.04) 18%, transparent 32%, transparent 78%, rgba(12, 11, 10, 0.48) 100%), radial-gradient(ellipse at 50% 52%, transparent 50%, rgba(10, 9, 8, 0.32) 100%)'
        }}
      />

      {/* 全息引线 SVG 层（起点锁定猫嘴，终点连接气泡） */}
      {!isLoading && (
        <svg
          aria-hidden="true"
          className={`${styles.connector} pointer-events-none absolute inset-0 w-full h-full z-10 overflow-visible hidden sm:block`}
          style={{ opacity: isTyping ? 0.35 : 0 }}
        >
          <defs>
            <linearGradient id="catMouthBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#f3d19c" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#d4a36a" stopOpacity="0.75" />
            </linearGradient>
            <filter id="catBeamGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path ref={calloutGlowPathRef} d="M 0 0 L 0 0" fill="none" stroke="#d4a36a" strokeWidth="1.8" strokeOpacity="0.10" />
          <path ref={calloutPathRef} d="M 0 0 L 0 0" fill="none" stroke="url(#catMouthBeamGrad)" strokeWidth="1" strokeDasharray="3 4" />
          <circle ref={mouthPulseRef} cx="0" cy="0" r="3" fill="none" stroke="#f5d5a3" strokeWidth="1.5" strokeOpacity="0.65" />
          <circle ref={mouthDotRef} cx="0" cy="0" r="2" fill="#ffffff" stroke="#d4a36a" strokeWidth="2" />
          <circle ref={bubbleAnchorDotRef} cx="0" cy="0" r="2" fill="#d4a36a" stroke="#fff8ee" strokeWidth="1.5" />
        </svg>
      )}

      {/* B5 思维气泡：猫头顶的思考/工具/说话状态 */}
      {thought && !isLoading && (
        <div
          ref={thoughtRef}
          key={`${thought.phase}-${thought.icon}-${thought.label || ''}`}
          className={`${styles.thoughtBubble} pointer-events-none absolute top-0 left-0 z-20`}
        >
          <span className={styles.thoughtIcon}>{thought.icon}</span>
          {thought.label && <span className={styles.thoughtLabel}>{thought.label}</span>}
          <span className={styles.thoughtTail} aria-hidden="true" />
        </div>
      )}

      {/* 毛色逆光 & 像素五官微调面板 */}
      {showTuningPanel && (
        <div className="absolute top-3 left-3 z-20 w-72 bg-[#161412]/92 backdrop-blur-md border border-[#d4a36a]/35 rounded-xl p-3.5 text-xs text-[#f4eadc] shadow-2xl space-y-2.5">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-semibold text-[#d4a36a]">五官与毛色微调</span>
            <button onClick={onCloseTuning} className="text-[#e9dac3]/60 hover:text-white">✕</button>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Fresnel 逆光银边强度</span>
              <span className="font-mono text-[#d4a36a]">{rimStrength.toFixed(2)}</span>
            </div>
            <input type="range" min={0.2} max={2.6} step={0.05} value={rimStrength}
              onChange={e => onShaderChange({ rim: parseFloat(e.target.value) })}
              className="w-full accent-[#d4a36a]" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>耳缘 & 尾尖银白毛浓度</span>
              <span className="font-mono text-[#d4a36a]">{whiteTipStrength.toFixed(2)}</span>
            </div>
            <input type="range" min={0} max={1.6} step={0.05} value={whiteTipStrength}
              onChange={e => onShaderChange({ whiteTip: parseFloat(e.target.value) })}
              className="w-full accent-[#d4a36a]" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>像素眼高度 (Eye Y)</span>
              <span className="font-mono text-[#d4a36a]">{faceTuning.eyeY.toFixed(3)}</span>
            </div>
            <input type="range" min={0.48} max={0.82} step={0.004} value={faceTuning.eyeY}
              onChange={e => onFaceTuningChange({ eyeY: parseFloat(e.target.value) })}
              className="w-full accent-[#d4a36a]" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>两眼间距 (Spacing)</span>
              <span className="font-mono text-[#d4a36a]">{faceTuning.eyeSpacing.toFixed(3)}</span>
            </div>
            <input type="range" min={0.1} max={0.34} step={0.004} value={faceTuning.eyeSpacing}
              onChange={e => onFaceTuningChange({ eyeSpacing: parseFloat(e.target.value) })}
              className="w-full accent-[#d4a36a]" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>品字嘴高度 (Mouth Y)</span>
              <span className="font-mono text-[#d4a36a]">{faceTuning.mouthY.toFixed(3)}</span>
            </div>
            <input type="range" min={0.42} max={0.72} step={0.004} value={faceTuning.mouthY}
              onChange={e => onFaceTuningChange({ mouthY: parseFloat(e.target.value) })}
              className="w-full accent-[#d4a36a]" />
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-white/10">
            <span>3D 表面立体绒毛簇</span>
            <input type="checkbox" checked={showFurTufts}
              onChange={e => onShaderChange({ tufts: e.target.checked })}
              className="accent-[#d4a36a] w-4 h-4" />
          </div>
        </div>
      )}

      {/* GLB 拖拽覆盖层 */}
      {isDraggingOver && (
        <div className="absolute inset-5 z-20 border-2 border-dashed border-[#ddb982]/80 rounded-2xl grid place-items-center text-[#f7efe4] bg-[#141210]/70 backdrop-blur-md text-base sm:text-lg tracking-wider">
          释放鼠标，将 GLB 模型放入书房中央并自动注入炭黑绒毛与像素五官
        </div>
      )}

      {/* 错误提示条 */}
      {errorBanner && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30 bg-[#301816]/90 border border-[#d68273]/40 backdrop-blur-md text-[#fcebe8] px-5 py-2.5 rounded-xl text-xs tracking-wide shadow-xl">
          {errorBanner}
        </div>
      )}

      {/* 加载进度覆盖层（人格化：禾桔正在醒来） */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#1c1a17]/90 flex items-center justify-center backdrop-blur-sm z-20">
          <div className="text-center text-[#f4eadc] max-w-sm px-4">
            <div className="text-5xl mb-5 animate-bounce">🐱</div>
            <div className="text-lg sm:text-xl font-serif font-semibold mb-4 tracking-wider text-[#f7efe4]">
              禾桔正在醒来…
            </div>
            <div className="w-64 bg-[#2c2723] rounded-full h-2.5 mb-3 overflow-hidden border border-[#d4a36a]/30 mx-auto">
              <div
                className="bg-gradient-to-r from-[#b8935c] to-[#e5c07b] h-full rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="text-sm font-mono text-[#d4a36a]">{loadingProgress}%</div>
          </div>
        </div>
      )}
    </div>
  );
}
