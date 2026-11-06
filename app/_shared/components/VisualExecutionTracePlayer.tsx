'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Layers,
  Cpu,
  Table,
  Zap,
  Code2,
} from 'lucide-react';
import {
  CLASSIC_TRACE_SCENARIOS,
  TraceScenario,
  TraceStep,
  generateAdHocTraceFromCode,
} from '@shared/lib/visual-trace-engine';

interface VisualExecutionTracePlayerProps {
  currentCode: string;
  language: string;
  onLoadScenarioCode?: (code: string) => void;
  onHighlightLine?: (line: number) => void;
}

export default function VisualExecutionTracePlayer({
  currentCode,
  language,
  onLoadScenarioCode,
  onHighlightLine,
}: VisualExecutionTracePlayerProps) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('binary-search');
  const [activeScenario, setActiveScenario] = useState<TraceScenario>(CLASSIC_TRACE_SCENARIOS[0]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(1000); // 1秒/步

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 切换经典算法模板
  const handleSelectScenario = (scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    setIsPlaying(false);
    if (scenarioId === 'current-code') {
      const steps = generateAdHocTraceFromCode(currentCode, language);
      setActiveScenario({
        id: 'current-code',
        title: '当前编辑器代码实时推演',
        language,
        category: '用户自定义',
        description: '基于当前编辑器编写的代码进行内存变量与执行帧逐帧演化追踪。',
        code: currentCode,
        steps,
      });
      setStepIndex(0);
    } else {
      const found = CLASSIC_TRACE_SCENARIOS.find(s => s.id === scenarioId);
      if (found) {
        setActiveScenario(found);
        setStepIndex(0);
        if (onLoadScenarioCode) {
          onLoadScenarioCode(found.code);
        }
      }
    }
  };

  // 自动播放时钟
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStepIndex(prev => {
          if (prev >= activeScenario.steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speedMs, activeScenario.steps.length]);

  const currentStep: TraceStep =
    activeScenario.steps[stepIndex] || activeScenario.steps[0];

  // 同步高亮行
  useEffect(() => {
    if (onHighlightLine && currentStep?.line) {
      onHighlightLine(currentStep.line);
    }
  }, [currentStep?.line, onHighlightLine]);

  const arrayNames = Object.keys(currentStep.arrays || {});
  const variableEntries = Object.entries(currentStep.variables || {});

  return (
    <div className="flex flex-col h-full bg-[#080b14] text-slate-200 border-t border-slate-800/80 overflow-hidden font-sans">
      {/* 顶部场景选择胶囊 */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-indigo-500/20 text-indigo-400">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-100">经典算法内存回放场景：</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
          {CLASSIC_TRACE_SCENARIOS.map(s => (
            <button
              key={s.id}
              onClick={() => handleSelectScenario(s.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                selectedScenarioId === s.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {s.title.split(' ')[0]}
            </button>
          ))}
          <button
            onClick={() => handleSelectScenario('current-code')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
              selectedScenarioId === 'current-code'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20'
            }`}
          >
            ⚡ 追踪当前代码
          </button>
        </div>
      </div>

      {/* 步进播放控制面板 */}
      <div className="px-4 py-2 bg-slate-950 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* 播放控制按钮 */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setIsPlaying(false);
              setStepIndex(0);
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="跳到第一帧"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setStepIndex(prev => Math.max(0, prev - 1));
            }}
            disabled={stepIndex === 0}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition"
            title="上一帧"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 transition shadow-md shadow-indigo-600/30"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> 暂停
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" /> 播放
              </>
            )}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setStepIndex(prev => Math.min(activeScenario.steps.length - 1, prev + 1));
            }}
            disabled={stepIndex >= activeScenario.steps.length - 1}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition"
            title="下一帧"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <span className="text-xs font-mono text-slate-400 pl-2">
            帧: <strong className="text-indigo-400">{stepIndex + 1}</strong> / {activeScenario.steps.length}
          </span>
        </div>

        {/* 进度滑块 */}
        <div className="flex-1 max-w-xs mx-2 flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={activeScenario.steps.length - 1}
            value={stepIndex}
            onChange={e => {
              setIsPlaying(false);
              setStepIndex(parseInt(e.target.value, 10));
            }}
            className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* 速度切换 */}
        <div className="flex items-center gap-1 text-[11px] font-mono">
          <span className="text-slate-500 mr-1">速度:</span>
          {[
            { label: '0.5x', ms: 1600 },
            { label: '1x', ms: 1000 },
            { label: '2x', ms: 500 },
          ].map(s => (
            <button
              key={s.label}
              onClick={() => setSpeedMs(s.ms)}
              className={`px-1.5 py-0.5 rounded transition ${
                speedMs === s.ms
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* 核心演进画布三栏：当前行说明 / 数组与指针堆视图 / JVM 栈帧与变量表 */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-[#090d18] to-[#04060c]">
        {/* 步骤语义说明 */}
        <div className="p-3 bg-slate-900/70 border border-indigo-500/20 rounded-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
              #{currentStep.step}
            </span>
            <span className="text-xs sm:text-sm text-slate-100 font-medium">
              {currentStep.description}
            </span>
          </div>
          <span className="text-xs font-mono text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-800/40 shrink-0">
            行 {currentStep.line}
          </span>
        </div>

        {/* 1. 堆内存与数组指针视图 (Array & Pointer Pointers) */}
        {arrayNames.length > 0 && (
          <div className="p-3.5 bg-slate-900/50 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>堆内存对象与数组指针视图 (Heap & Arrays)</span>
            </div>

            <div className="space-y-4">
              {arrayNames.map(arrName => {
                const arr = currentStep.arrays[arrName] || [];
                const activeSpec = currentStep.activeArrayIndices?.find(
                  a => a.arrayName === arrName
                );
                return (
                  <div key={arrName} className="space-y-1.5">
                    <div className="text-xs font-mono text-slate-400">
                      <span className="text-emerald-400">{arrName}</span> [{arr.length}]
                    </div>

                    {/* 数组格子横向排布 */}
                    <div className="flex items-start gap-1.5 overflow-x-auto pb-6 pt-1">
                      {arr.map((val, idx) => {
                        const isActive = activeSpec?.indices.includes(idx);
                        const status = activeSpec?.status;
                        const cellColor = isActive
                          ? status === 'found'
                            ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                            : status === 'swap'
                              ? 'bg-purple-950/80 border-purple-400 text-purple-200'
                              : 'bg-amber-950/80 border-amber-400 text-amber-200'
                          : 'bg-slate-950 border-slate-800 text-slate-200';

                        // 查找指向当前下标的游标指针
                        const matchedPointers = currentStep.pointers.filter(
                          p => p.target === arrName && p.index === idx
                        );

                        return (
                          <div key={idx} className="relative flex flex-col items-center">
                            {/* 数组下标 */}
                            <span className="text-[10px] font-mono text-slate-500 mb-0.5">
                              [{idx}]
                            </span>
                            {/* 元素方块 */}
                            <div
                              className={`w-11 h-11 rounded-lg border-2 flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${cellColor}`}
                            >
                              {String(val)}
                            </div>
                            {/* 下方游标徽章 */}
                            {matchedPointers.length > 0 && (
                              <div className="absolute top-16 flex flex-col items-center gap-0.5">
                                {matchedPointers.map((p, pIdx) => (
                                  <span
                                    key={pIdx}
                                    style={{
                                      backgroundColor: p.color || '#38bdf8',
                                      color: '#020617',
                                    }}
                                    className="px-1.5 py-0.2 rounded text-[10px] font-mono font-black shadow-md uppercase tracking-wider"
                                  >
                                    ↑ {p.name}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. JVM 调用栈帧与局部变量表 (Call Stack & Locals) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* JVM 调用栈 */}
          <div className="p-3.5 bg-slate-900/50 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-2 mb-2.5 text-xs font-bold text-slate-300">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>JVM 线程调用栈帧 (Call Stack - 深度 {currentStep.callStack.length})</span>
            </div>

            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {currentStep.callStack.map((frame, fIdx) => {
                const isTop = fIdx === currentStep.callStack.length - 1;
                return (
                  <div
                    key={fIdx}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
                      isTop
                        ? 'bg-sky-950/40 border-sky-500/40 text-sky-200 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500">[{fIdx}]</span>
                      <span>{frame.name}</span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {isTop ? 'TOP' : `行 ${frame.line}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 局部变量表 */}
          <div className="p-3.5 bg-slate-900/50 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-2 mb-2.5 text-xs font-bold text-slate-300">
              <Table className="w-3.5 h-3.5 text-emerald-400" />
              <span>局部变量表 (Local Variables)</span>
            </div>

            {variableEntries.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto pr-1">
                {variableEntries.map(([k, v]) => (
                  <div
                    key={k}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex flex-col justify-between"
                  >
                    <span className="text-[11px] font-mono text-slate-400">{k}</span>
                    <span className="text-xs font-mono font-bold text-emerald-300 truncate">
                      {String(v)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-500 py-6 text-center">当前暂无标量变量</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
