'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMatrixCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：数据归一化

// L1: 批量归一化层模拟器
export const BatchNormForwardVisualizer: React.FC = () => {
  const [gamma, setGamma] = useState(1.2);
  const [beta, setBeta] = useState(0.5);
  const raw = [2, 4, 6, 8];
  const mean = 5;
  const std = Math.sqrt(5);
  const out = raw.map((x) => gamma * ((x - mean) / std) + beta);
  return (
    <VisualizerFrame
      title="BatchNorm 零均值标准化与仿射重参数 (γx̂ + β)"
      subtitle="先跨 Batch 消除内部协变量偏移，再用可学习 γ/β 恢复网络表达能力"
      badge="batch_norm_forward"
      sliders={[
        { label: '可学习缩放参数 γ', value: gamma, min: 0.2, max: 2.5, step: 0.1, displayValue: gamma.toFixed(1), onChange: setGamma },
        { label: '可学习平移参数 β', value: beta, min: -1.5, max: 1.5, step: 0.25, displayValue: beta.toFixed(2), onChange: setBeta },
      ]}
      metrics={[
        { label: '输出均值 E[y]', value: beta.toFixed(2), tone: 'cyan' },
        { label: '输出标准差 Std[y]', value: gamma.toFixed(2), tone: 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          { name: '输入 X', slots: raw.map((x) => ({ label: `${x}`, tone: 'slate' })) },
          { name: '归一化 x̂', slots: raw.map((x) => ({ label: ((x - mean) / std).toFixed(2), tone: 'indigo' })) },
          { name: 'γx̂ + β 输出', slots: out.map((y) => ({ label: y.toFixed(2), tone: 'emerald', pointer: 'BN' })) },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 层归一化与批归一化对比
export const BnVsLnAxisVisualizer: React.FC = () => {
  const [mode, setMode] = useState(0);
  return (
    <VisualizerFrame
      title="BatchNorm vs LayerNorm 张量归一化维度切片"
      subtitle="行代表样本 (Batch)，列代表特征通道 (Feature/Token)"
      badge="batch_vs_layer_norm"
      scenarios={[
        { label: 'BatchNorm (跨样本列归一)', summary: '沿 Batch 轴跨所有样本对同一特征列求均值与方差（CV/CNN 首选）。' },
        { label: 'LayerNorm (单样本行归一)', summary: '沿 Feature 轴在单个样本/Token 内部归一化，不依赖 BatchSize（Transformer 首选）。' },
      ]}
      activeScenario={mode}
      onScenarioChange={setMode}
      metrics={[
        { label: '统计维度', value: mode === 0 ? 'axis=0 (同一列跨样本)' : 'axis=1 (同一行跨特征)', tone: mode === 0 ? 'cyan' : 'emerald' },
      ]}
    >
      <InteractiveMatrixCanvas
        left={{
          title: mode === 0 ? 'BatchNorm 竖向归一' : 'LayerNorm 横向归一',
          rowLabels: ['S0', 'S1', 'S2'],
          colLabels: ['F0', 'F1', 'F2'],
          rows: [
            [{ value: '1.2', highlight: 'emerald' }, { value: '0.4', highlight: mode === 1 ? 'emerald' : 'none' }, { value: '-0.8', highlight: mode === 1 ? 'emerald' : 'none' }],
            [{ value: '0.9', highlight: mode === 0 ? 'emerald' : 'none' }, { value: '1.1' }, { value: '0.3' }],
            [{ value: '-0.5', highlight: mode === 0 ? 'emerald' : 'none' }, { value: '0.2' }, { value: '1.7' }],
          ],
          highlightRect: mode === 0 ? { r: 0, c: 0, h: 3, w: 1, tone: 'cyan' } : { r: 0, c: 0, h: 1, w: 3, tone: 'emerald' },
        }}
      />
    </VisualizerFrame>
  );
};
