'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AlgorithmVisualizerProps, VisualizationStep } from './types';
import { getAlgorithmMeta } from './registry';
import { SceneManager } from './core/SceneManager';
import {
  generateSortingAndSearchingSteps,
  renderSortingAndSearching,
} from './modules/sortingAndSearching';
import {
  generateDataStructureSteps,
  renderDataStructure,
} from './modules/dataStructures';
import { generateMath3DSteps, renderMath3D } from './modules/math3d';
import {
  generateMachineLearningSteps,
  renderMachineLearning,
} from './modules/machineLearning';

function generateStepsForAlgorithm(
  algorithm: string,
  data: number[]
): VisualizationStep[] {
  const meta = getAlgorithmMeta(algorithm);
  switch (meta.category) {
    case '排序算法':
    case '查找算法':
      return generateSortingAndSearchingSteps(algorithm, data);
    case '数据结构':
      return generateDataStructureSteps(algorithm);
    case '数学可视化':
      return generateMath3DSteps(algorithm, data);
    case '机器学习':
      return generateMachineLearningSteps(algorithm);
    default:
      return generateSortingAndSearchingSteps(algorithm, data);
  }
}

function renderStepToGroup(
  algorithm: string,
  sceneManager: SceneManager,
  step: VisualizationStep
) {
  sceneManager.clearContent();
  const meta = getAlgorithmMeta(algorithm);
  switch (meta.category) {
    case '排序算法':
    case '查找算法':
      renderSortingAndSearching(sceneManager.contentGroup, step);
      break;
    case '数据结构':
      renderDataStructure(sceneManager.contentGroup, step);
      break;
    case '数学可视化':
      renderMath3D(sceneManager.contentGroup, step);
      break;
    case '机器学习':
      renderMachineLearning(sceneManager.contentGroup, step);
      break;
    default:
      renderSortingAndSearching(sceneManager.contentGroup, step);
  }
}

export default function AlgorithmVisualizer({
  algorithm,
  data,
  speed = 1000,
}: AlgorithmVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<VisualizationStep[]>([]);
  const [autoOrbit, setAutoOrbit] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const managerRef = useRef<SceneManager | null>(null);

  const meta = getAlgorithmMeta(algorithm);

  // 1. Initialize 3D SceneManager once
  useEffect(() => {
    if (!canvasRef.current) return;
    const manager = new SceneManager(canvasRef.current);
    managerRef.current = manager;
    return () => {
      manager.dispose();
      managerRef.current = null;
    };
  }, []);

  // 2. Apply optimal camera preset & generate steps when algorithm or data changes
  useEffect(() => {
    setIsPlaying(false);
    const nextSteps = generateStepsForAlgorithm(algorithm, [...data]);
    setSteps(nextSteps);
    setCurrentStep(0);

    if (managerRef.current) {
      managerRef.current.applyCameraPreset(meta.cameraPreset, false);
    }
  }, [algorithm, data, meta.cameraPreset]);

  // 3. Render current step into 3D scene
  useEffect(() => {
    if (!managerRef.current || steps.length === 0) return;
    const step = steps[Math.min(currentStep, steps.length - 1)];
    if (step) {
      renderStepToGroup(algorithm, managerRef.current, step);
    }
  }, [algorithm, currentStep, steps]);

  // 4. Auto playback timer
  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentStep >= steps.length - 1) {
        setCurrentStep(0);
      }
      setIsPlaying(true);
    }
  };

  const handleToggleAutoOrbit = () => {
    const next = !autoOrbit;
    setAutoOrbit(next);
    if (managerRef.current) {
      managerRef.current.autoOrbitEnabled = next;
    }
  };

  const activeStep = steps[currentStep];
  const progressPercent =
    steps.length > 1 ? Math.round((currentStep / (steps.length - 1)) * 100) : 0;

  return (
    <div className="space-y-3">
      {/* 顶部算法专属图例栏 + 实时指标徽章 */}
      <div
        className="flex flex-wrap items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs"
        style={{
          background: 'rgba(15, 23, 42, 0.82)',
          borderColor: 'rgba(148, 163, 184, 0.16)',
        }}
      >
        <div className="flex flex-wrap items-center gap-3.5 text-slate-300">
          {meta.legends.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                style={{
                  backgroundColor: item.color,
                  boxShadow: item.glow ? `0 0 8px ${item.color}` : undefined,
                }}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* 实时遥测指标胶囊 */}
        {activeStep?.metrics && (
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(activeStep.metrics).map(([k, v]) => (
              <span
                key={k}
                className="px-2.5 py-0.5 rounded-md font-mono text-[11px] bg-indigo-500/15 text-indigo-200 border border-indigo-400/25"
              >
                <span className="text-slate-400 mr-1">{k}:</span>
                <strong className="text-sky-300">{v}</strong>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 3D 交互式主画布舞台 */}
      <div
        className="relative rounded-2xl overflow-hidden border shadow-2xl select-none"
        style={{
          background:
            'radial-gradient(circle at 50% 32%, #131f3a 0%, #070c18 100%)',
          borderColor: 'rgba(99, 102, 241, 0.28)',
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-[380px] sm:h-[460px] md:h-[520px] block cursor-grab active:cursor-grabbing"
        />

        {/* 右上角 3D 摄像机交互悬浮工具条 */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-950/75 backdrop-blur-md border border-white/10 rounded-xl p-1.5 shadow-lg">
          <button
            onClick={handleToggleAutoOrbit}
            title="开启/关闭镜头自动环绕"
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              autoOrbit
                ? 'bg-sky-500/25 text-sky-300 border border-sky-400/40'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {autoOrbit ? '🔄 环绕中' : '⏸️ 固定视角'}
          </button>
          <button
            onClick={() => managerRef.current?.zoomBy(0.85)}
            title="拉近镜头"
            className="w-7 h-7 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all"
          >
            ➕
          </button>
          <button
            onClick={() => managerRef.current?.zoomBy(1.18)}
            title="拉远镜头"
            className="w-7 h-7 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all"
          >
            ➖
          </button>
          <button
            onClick={() => managerRef.current?.resetCamera()}
            title="复位当前算法最佳视角"
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-indigo-200 bg-indigo-500/20 hover:bg-indigo-500/35 border border-indigo-400/30 transition-all"
          >
            🎥 复位视角
          </button>
        </div>

        {/* 左下角交互提示 */}
        <div className="hidden sm:flex absolute bottom-3 left-3 items-center gap-2 px-3 py-1 rounded-lg bg-slate-950/65 backdrop-blur-md border border-white/10 text-[11px] text-slate-400 pointer-events-none">
          <span>🖱️ 左键拖拽 360° 旋转</span>
          <span>·</span>
          <span>滚轮缩放</span>
          <span>·</span>
          <span>右键/Shift 平移</span>
        </div>
      </div>

      {/* 底部一体化暗曜蓝播控与解说台 */}
      <div
        className="rounded-2xl p-4 border shadow-xl space-y-3.5"
        style={{
          background:
            'linear-gradient(180deg, rgba(15, 23, 42, 0.94) 0%, rgba(9, 14, 26, 0.98) 100%)',
          borderColor: 'rgba(99, 102, 241, 0.24)',
        }}
      >
        {/* 当前步骤实时解说 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 shrink-0">
              STEP {String(currentStep + 1).padStart(2, '0')} /{' '}
              {String(Math.max(steps.length, 1)).padStart(2, '0')}
            </span>
            <p className="text-slate-100 text-xs sm:text-sm font-medium truncate">
              {activeStep?.description || '正在初始化三维算法空间...'}
            </p>
          </div>
          <span className="text-xs font-mono text-sky-400 shrink-0">
            推演进度 {progressPercent}%
          </span>
        </div>

        {/* 可拖拽步骤时间轴滑块 */}
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={Math.max(steps.length - 1, 0)}
            value={currentStep}
            onChange={(e) => {
              setIsPlaying(false);
              setCurrentStep(Number(e.target.value));
            }}
            className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-sky-400"
          />
        </div>

        {/* 播放控制按钮组 */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStep(0);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-medium transition-all"
            >
              ⏮ 重置
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStep((prev) => Math.max(0, prev - 1));
              }}
              disabled={currentStep === 0}
              className="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 border border-white/10 text-xs font-medium transition-all"
            >
              ◀ 上一步
            </button>

            <button
              onClick={handlePlayToggle}
              className="px-5 py-1.5 rounded-xl text-white text-xs sm:text-sm font-bold shadow-lg transition-all hover:brightness-110"
              style={{
                background: isPlaying
                  ? 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)'
                  : 'linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%)',
              }}
            >
              {isPlaying
                ? '⏸ 暂停演示'
                : currentStep >= steps.length - 1 && steps.length > 0
                ? '↻ 重新播放'
                : '▶ 自动推演'}
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
              }}
              disabled={currentStep >= steps.length - 1}
              className="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 border border-white/10 text-xs font-medium transition-all"
            >
              下一步 ▶
            </button>
          </div>

          <div className="text-[11px] text-slate-400 font-mono hidden md:block">
            分类: <span className="text-slate-200">{meta.category}</span> · 难度:{' '}
            <span className="text-sky-300">{meta.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
