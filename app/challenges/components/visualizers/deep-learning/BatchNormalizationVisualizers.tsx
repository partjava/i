'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

// 章节：Batch Normalization

// L1: Batch Normalization 训练与推理
export const BnTrainVsEvalVisualizer: React.FC = () => {
  const [mode, setMode] = useState(0);
  return (
    <VisualizerFrame
      title="BatchNorm Train vs Eval 双模式统计量切换"
      subtitle="训练期统计当前 Mini-batch 并更新滑动均值 running_mean；推理期冻结滑动均值支持 batch_size=1"
      badge="BatchNorm"
      scenarios={[
        { label: 'Train 模式 (model.train())', summary: '使用当前批 μ_batch=3.2, σ²_batch=1.4 归一，并按 0.9·running + 0.1·batch 更新缓存。' },
        { label: 'Eval 推理模式 (model.eval())', summary: '直接读取冻结的 running_mean 与 running_var，消除输入批次间依赖！' },
      ]}
      activeScenario={mode}
      onScenarioChange={setMode}
      metrics={[
        { label: '均值来源', value: mode === 0 ? 'Batch 实时 μ_B' : 'Frozen running_mean', tone: mode === 0 ? 'cyan' : 'emerald' },
        { label: '单样本推理安全', value: mode === 0 ? 'Batch=1 方差为0 ✗' : '完全确定性 ✓', tone: mode === 0 ? 'rose' : 'emerald' },
      ]}
    >
      <InteractiveGraphCanvas
        height={175}
        nodes={[
          { id: 'x', x: 65, y: 88, label: 'Batch X', tone: 'indigo', shape: 'pill', active: true },
          { id: 'stat', x: 195, y: 48, label: 'Batch 统计 (μ_B, σ_B²)', tone: mode === 0 ? 'cyan' : 'slate', shape: 'pill', active: mode === 0 },
          { id: 'run', x: 195, y: 128, label: 'Running 缓存 (滑动平均)', tone: mode === 1 ? 'emerald' : 'amber', shape: 'pill', active: mode === 1 },
          { id: 'out', x: 335, y: 88, label: 'y = γx̂ + β', tone: 'emerald', shape: 'pill', active: true },
        ]}
        edges={
          mode === 0
            ? [
                { from: 'x', to: 'stat', tone: 'cyan', animated: true },
                { from: 'stat', to: 'run', label: 'EMA 更新', tone: 'amber', dashed: true },
                { from: 'stat', to: 'out', tone: 'cyan', animated: true },
              ]
            : [
                { from: 'x', to: 'run', label: '直接归一化', tone: 'emerald', animated: true },
                { from: 'run', to: 'out', tone: 'emerald', animated: true },
              ]
        }
      />
    </VisualizerFrame>
  );
};

// L2: BN 训练与推理模式对比
export const BnStatisticsShiftVisualizer: React.FC = () => {
  const [momentum, setMomentum] = useState(0.1);
  const runningAfter5 = (1 - (1 - momentum) ** 5) * 100;
  return (
    <VisualizerFrame
      title="Running Mean 滑动指数平均收敛速度"
      subtitle="running_mean = (1 - m) * running + m * batch_mean"
      badge="bn_momentum"
      sliders={[{ label: 'PyTorch momentum (更新步幅)', value: momentum, min: 0.05, max: 0.5, step: 0.05, displayValue: momentum.toFixed(2), onChange: setMomentum }]}
      metrics={[
        { label: '5 个 Batch 后跟踪进度', value: `${runningAfter5.toFixed(1)}%`, tone: 'cyan' },
        { label: '旧统计保留率 (1-m)', value: (1 - momentum).toFixed(2), tone: 'indigo' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0, 15]}
        domainY={[0, 1.05]}
        xLabel="训练 Batch 步数"
        yLabel="Running 均值追踪比例"
        curves={[
          {
            id: 'ema',
            label: `m=${momentum.toFixed(2)}`,
            tone: 'emerald',
            fillArea: true,
            points: Array.from({ length: 16 }, (_, t) => [t, 1 - (1 - momentum) ** t]),
          },
        ]}
        markers={[{ x: 5, y: runningAfter5 / 100, label: `${runningAfter5.toFixed(0)}%`, tone: 'cyan', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};
