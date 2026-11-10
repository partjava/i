'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { CodeLanguage, resolveStepCodeTrace } from './codeTraceMap';
import MathFormulaBox from './MathFormulaBox';

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
  onOpenInEditor,
}: AlgorithmVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<VisualizationStep[]>([]);
  const [autoOrbit, setAutoOrbit] = useState(true);
  const [showCodeStudio, setShowCodeStudio] = useState(true);
  const [theaterZoom, setTheaterZoom] = useState(true);
  const [codeLang, setCodeLang] = useState<CodeLanguage>('cpp');
  const [showHudFormula, setShowHudFormula] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const managerRef = useRef<SceneManager | null>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);

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

  // Trigger resize on SceneManager when toggling split code studio or theater zoom
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('resize'));
      }
    }, 60);
    return () => clearTimeout(timer);
  }, [showCodeStudio, theaterZoom]);

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

  const activeStep = steps[currentStep];
  const progressPercent =
    steps.length > 1 ? Math.round((currentStep / (steps.length - 1)) * 100) : 0;

  // 5. Resolve synchronized live code lines & variables for current step
  const codeTrace = useMemo(
    () =>
      resolveStepCodeTrace(
        algorithm,
        activeStep,
        currentStep,
        steps.length,
        codeLang
      ),
    [algorithm, activeStep, currentStep, steps.length, codeLang]
  );

  // Smooth scroll active line into view inside the code container
  useEffect(() => {
    if (!showCodeStudio || !codeContainerRef.current) return;
    const targetLine = codeTrace.activeLines[0];
    if (!targetLine) return;
    const lineEl = codeContainerRef.current.querySelector(
      `[data-code-line="${targetLine}"]`
    ) as HTMLElement | null;
    if (lineEl) {
      const container = codeContainerRef.current;
      const targetScroll =
        lineEl.offsetTop - container.clientHeight / 2 + lineEl.clientHeight / 2;
      container.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
    }
  }, [codeTrace.activeLines, showCodeStudio, codeLang]);

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentStep >= steps.length - 1) {
        setCurrentStep(0);
      }
      // 开启自动推演时同步开启代码演示与双联放大视图
      setShowCodeStudio(true);
      setTheaterZoom(true);
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

  // 提取当前帧内高亮变量，用于激活代码行尾的内联调试胶囊展示
  const inlineActiveVarSummary = useMemo(() => {
    const highlighted = codeTrace.variables.filter((v) => v.highlight);
    const pick = highlighted.length > 0 ? highlighted.slice(0, 2) : codeTrace.variables.slice(0, 2);
    return pick.map((v) => `${v.name}=${v.value}`).join(' · ');
  }, [codeTrace.variables]);

  return (
    <div className="space-y-3">
      {/* 顶部算法专属图例栏 + 视图切换 + 实时指标徽章 */}
      <div
        className="flex flex-wrap items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs"
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          borderColor: 'rgba(148, 163, 184, 0.18)',
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

        {/* 右侧：实时遥测指标胶囊 + 双联放大 + 代码演示舱开关 */}
        <div className="flex flex-wrap items-center gap-2">
          {activeStep?.metrics &&
            Object.entries(activeStep.metrics).map(([k, v]) => (
              <span
                key={k}
                className="px-2.5 py-0.5 rounded-md font-mono text-[11px] bg-indigo-500/15 text-indigo-200 border border-indigo-400/25"
              >
                <span className="text-slate-400 mr-1">{k}:</span>
                <strong className="text-sky-300">{v}</strong>
              </span>
            ))}

          {showCodeStudio && (
            <button
              type="button"
              onClick={() => setTheaterZoom((v) => !v)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold border transition-all flex items-center gap-1 ${
                theaterZoom
                  ? 'bg-sky-500/20 text-sky-300 border-sky-400/40'
                  : 'bg-slate-800/80 text-slate-300 border-white/10 hover:bg-slate-700'
              }`}
              title="同时放大左侧 3D 舞台与右侧完整代码推演面板"
            >
              <span>{theaterZoom ? '🗖 双联放大: 开启' : '🗗 标准高度'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setShowCodeStudio((v) => {
                const next = !v;
                if (next) setTheaterZoom(true);
                return next;
              });
            }}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold border transition-all flex items-center gap-1.5 ${
              showCodeStudio
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                : 'bg-slate-800/80 text-slate-300 border-white/10 hover:bg-slate-700'
            }`}
          >
            <span>{showCodeStudio ? '⚡ 同步代码演示: 开启' : '💻 开启代码演示动画'}</span>
          </button>
        </div>
      </div>

      {/* 独立全宽核心数学律横幅（脱离 3D 画布遮挡区，彻底消除与右上角镜头按钮的重叠与小滚动条） */}
      {showHudFormula ? (
        <div
          className="px-3.5 py-2 rounded-xl border flex flex-wrap items-center justify-between gap-3"
          style={{
            background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.92) 0%, rgba(17, 24, 39, 0.88) 100%)',
            borderColor: 'rgba(56, 189, 248, 0.28)',
          }}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1 overflow-x-auto">
            <span className="shrink-0 px-2 py-0.5 rounded-md bg-sky-500/15 border border-sky-400/30 text-[11px] font-mono font-bold text-sky-300 flex items-center gap-1">
              <span>🧮</span>
              <span>核心数学律 (LaTeX)</span>
            </span>
            <div className="min-w-0 flex-1">
              <MathFormulaBox algorithmId={algorithm} compact={true} />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowHudFormula(false)}
            className="shrink-0 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded hover:bg-white/5 transition-colors"
            title="收起公式横幅"
          >
            收起 ✕
          </button>
        </div>
      ) : (
        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => setShowHudFormula(true)}
            className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-sky-500/30 text-[11px] font-mono text-sky-300 hover:bg-slate-800 transition-colors"
          >
            🧮 展开核心数学律 (LaTeX)
          </button>
        </div>
      )}

      {/* 主体核心区：左 3D 交互式巨幕舞台 (50%) + 右 完整代码推演与变量追踪舱 (50%) 同时放大 */}
      <div
        className={`grid grid-cols-1 ${
          showCodeStudio ? 'lg:grid-cols-12' : ''
        } gap-4 items-stretch`}
      >
        {/* 左侧：3D 交互式主画布舞台（随代码演示同步放大，自动撑满右侧完整代码高度） */}
        <div
          className={`${
            showCodeStudio ? 'lg:col-span-6' : 'w-full'
          } relative rounded-2xl overflow-hidden border shadow-2xl select-none flex flex-col`}
          style={{
            background:
              'radial-gradient(circle at 50% 32%, #131f3a 0%, #070c18 100%)',
            borderColor: 'rgba(99, 102, 241, 0.28)',
          }}
        >
          <canvas
            ref={canvasRef}
            className={`w-full flex-1 ${
              showCodeStudio && theaterZoom
                ? 'min-h-[480px] sm:min-h-[540px]'
                : 'min-h-[400px] sm:min-h-[460px]'
            } block cursor-grab active:cursor-grabbing`}
          />

          {/* 左上角：算法空间状态微标（不遮挡右上角镜头按钮） */}
          <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300 z-10">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>3D 空间流形舞台</span>
          </div>

          {/* 右上角 3D 摄像机交互悬浮工具条 */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-950/75 backdrop-blur-md border border-white/10 rounded-xl p-1.5 shadow-lg z-10">
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
              title="拉近放大 3D 图形"
              className="w-7 h-7 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all"
            >
              ➕
            </button>
            <button
              onClick={() => managerRef.current?.zoomBy(1.18)}
              title="拉远 3D 图形"
              className="w-7 h-7 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all"
            >
              ➖
            </button>
            <button
              onClick={() => managerRef.current?.resetCamera()}
              title="复位当前算法最佳视角"
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-indigo-200 bg-indigo-500/20 hover:bg-indigo-500/35 border border-indigo-400/30 transition-all"
            >
              🎥 复位
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

        {/* 右侧：⚡ 完整代码推演动画与帧内变量追踪舱（50% 对称宽屏，全量代码平铺零横拉条） */}
        {showCodeStudio && (
          <div
            className="lg:col-span-6 rounded-2xl border shadow-2xl flex flex-col overflow-hidden"
            style={{
              background:
                'linear-gradient(165deg, #090f1d 0%, #0d1629 100%)',
              borderColor: 'rgba(99, 102, 241, 0.34)',
            }}
          >
            {/* 顶部控制栏：标题 + 语言切换 (Java/Python/C++) + 一键载入 IDE */}
            <div className="px-3.5 py-2.5 border-b border-white/10 bg-slate-950/75 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs sm:text-[13px] font-bold text-slate-100">
                  ⚡ 同步代码推演动画
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border"
                  style={{
                    color: codeTrace.phaseColor,
                    borderColor: `${codeTrace.phaseColor}55`,
                    backgroundColor: `${codeTrace.phaseColor}1a`,
                  }}
                >
                  {codeTrace.phaseBadge}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-white/10">
                  {(['cpp', 'python', 'java'] as CodeLanguage[]).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setCodeLang(lang)}
                      className={`px-2.5 py-0.5 rounded-md text-[10.5px] font-mono font-bold uppercase transition-all ${
                        codeLang === lang
                          ? 'bg-indigo-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {lang === 'cpp' ? 'C++' : lang}
                    </button>
                  ))}
                </div>

                {onOpenInEditor && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenInEditor(codeTrace.runnableCode, codeLang)
                    }
                    className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold bg-gradient-to-r from-indigo-600 to-sky-500 text-white hover:brightness-110 transition-all shadow-sm"
                    title="将当前选中语言的可运行算法代码载入极客代码工坊 IDE 编译运行"
                  >
                    🚀 载入 IDE 运行 ({codeLang === 'cpp' ? 'C++' : codeLang.toUpperCase()})
                  </button>
                )}
              </div>
            </div>

            {/* 中部：完整平铺源码视窗（零横向滚动条 + 智能悬挂折行 + 行尾内联实时变量） */}
            <div
              ref={codeContainerRef}
              className="flex-1 flex flex-col justify-center font-mono text-[12px] sm:text-[12.5px] leading-[1.65] py-2.5 select-text overflow-x-hidden"
            >
              {codeTrace.lines.map((lineText, idx) => {
                const lineNum = idx + 1;
                const isActive = codeTrace.activeLines.includes(lineNum);
                const isFirstActive = codeTrace.activeLines[0] === lineNum;
                const leadingSpaces = lineText.match(/^\s*/)?.[0].length || 0;
                const trimmedCode = lineText.trimStart();
                const indentRem = Math.min(leadingSpaces * 0.46, 5.5);

                return (
                  <div
                    key={lineNum}
                    data-code-line={lineNum}
                    className={`relative flex items-start px-3 py-0.5 transition-all duration-300 border-l-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-500/30 via-sky-500/18 to-transparent text-white font-semibold border-sky-400'
                        : 'text-slate-300/90 hover:bg-white/[0.03] border-transparent'
                    }`}
                  >
                    {/* 左侧行号与动态执行指针箭头 */}
                    <div className="w-6 shrink-0 flex items-center justify-start pt-[1px] select-none">
                      {isActive ? (
                        <span
                          className="text-xs font-bold animate-pulse"
                          style={{ color: codeTrace.phaseColor }}
                        >
                          ▶
                        </span>
                      ) : (
                        <span className="text-[10.5px] text-slate-500">
                          {String(lineNum).padStart(2, '0')}
                        </span>
                      )}
                    </div>

                    {/* 代码文本内容：彻底移除单行 overflow-x-auto，采用悬挂缩进软折行保证 100% 完整展示 */}
                    <div
                      className="flex-1 min-w-0 whitespace-pre-wrap break-words font-mono"
                      style={{
                        paddingLeft: `${indentRem}rem`,
                      }}
                    >
                      <span>{trimmedCode || ' '}</span>
                      {isFirstActive && inlineActiveVarSummary && (
                        <span className="ml-2.5 inline-flex items-center px-1.5 py-0.2 rounded bg-sky-500/15 border border-sky-400/30 text-[10.5px] font-mono font-normal text-sky-300 align-baseline">
                          // {inlineActiveVarSummary}
                        </span>
                      )}
                    </div>

                    {/* 右侧当前执行行动态徽标 */}
                    {isActive && (
                      <span
                        className="ml-2 px-1.5 py-0.2 rounded text-[9.5px] font-mono font-bold shrink-0 border mt-[2px]"
                        style={{
                          color: codeTrace.phaseColor,
                          borderColor: `${codeTrace.phaseColor}66`,
                          backgroundColor: `${codeTrace.phaseColor}20`,
                        }}
                      >
                        L{lineNum}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 底部：实时帧内变量与寄存器快照面板 */}
            <div className="p-3 border-t border-white/10 bg-slate-950/90 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <span>📊</span>
                  <span>实时帧内变量与状态监视器 (Live Watch)</span>
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  帧 {currentStep + 1}/{Math.max(steps.length, 1)}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {codeTrace.variables.map((v, i) => (
                  <div
                    key={i}
                    className={`px-2.5 py-1.5 rounded-lg border font-mono text-[11px] transition-all duration-300 ${
                      v.highlight
                        ? 'bg-indigo-500/20 border-sky-400/50 text-sky-200 shadow-[0_0_10px_rgba(56,189,248,0.18)]'
                        : 'bg-slate-900/90 border-white/10 text-slate-300'
                    }`}
                  >
                    <div className="text-[9.5px] text-slate-400 truncate">
                      {v.name}
                    </div>
                    <div
                      className="font-bold truncate text-xs mt-0.5"
                      title={v.value}
                    >
                      {v.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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
                : '▶ 自动推演 (3D + 代码)'}
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
