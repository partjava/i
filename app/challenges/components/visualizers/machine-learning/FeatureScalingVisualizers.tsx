'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：特征标准化

// L1: 特征标准化与归一化器
export const FeatureScalerVisualizer: React.FC = () => {
  const [mode, setMode] = useState(0);
  const raw = [10, 20, 30, 40];
  const zScore = raw.map((v) => ((v - 25) / 11.18).toFixed(2));
  const minMax = raw.map((v) => ((v - 10) / 30).toFixed(2));
  const cur = mode === 0 ? zScore : minMax;
  return (
    <VisualizerFrame
      title="StandardScaler (Z-Score) vs MinMaxScaler 分布变换"
      subtitle="消除不同物理量纲差异（如身高 1.7m vs 薪资 20000），加速梯度下降收敛"
      badge="FeatureScaler"
      scenarios={[
        { label: 'Standard (x-μ)/σ', summary: '变换后均值为 0、标准差为 1，无严格上下界。' },
        { label: 'MinMax (x-min)/(max-min)', summary: '严格压缩进 [0, 1] 闭合区间。' },
      ]}
      activeScenario={mode}
      onScenarioChange={setMode}
      metrics={[
        { label: '原始极差', value: '[10, 40]', tone: 'slate' },
        { label: '缩放后边界', value: mode === 0 ? `[-1.34, +1.34]` : `[0.00, 1.00]`, tone: 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          { name: '原始特征 X', slots: raw.map((v) => ({ label: `${v}`, tone: 'slate' })) },
          {
            name: mode === 0 ? 'Z-Score' : 'MinMax',
            slots: cur.map((v) => ({ label: v, sublabel: mode === 0 ? 'μ=0,σ=1' : '∈[0,1]', tone: 'cyan' })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 鲁棒缩放与分位数变换
export const RobustScalerVisualizer: React.FC = () => {
  const [outlier, setOutlier] = useState(120);
  const base = [10, 12, 14, 16];
  const all = [...base, outlier];
  const mean = all.reduce((a, b) => a + b, 0) / all.length;
  const std = Math.sqrt(all.reduce((a, b) => a + (b - mean) ** 2, 0) / all.length);
  const median = 14;
  const iqr = 4;
  return (
    <VisualizerFrame
      title="RobustScaler (中位数 + IQR) 抗极端异常点冲击"
      subtitle="拖动极端异常点值，比较传统均值/标准差与中位数/IQR 缩放的抗干扰稳定性"
      badge="RobustScaler"
      sliders={[{ label: '极端离群点数值', value: outlier, min: 20, max: 300, step: 20, onChange: setOutlier }]}
      metrics={[
        { label: 'Standard μ / σ', value: `${mean.toFixed(1)} / ${std.toFixed(1)}`, tone: 'rose' },
        { label: 'Robust Median / IQR', value: `${median} / ${iqr} (稳如磐石✓)`, tone: 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'Z-Score (受污染)',
            slots: all.map((v, i) => ({
              label: ((v - mean) / std).toFixed(2),
              sublabel: i === 4 ? `异常点(${outlier})` : `原=${v}`,
              tone: i === 4 ? 'rose' : 'amber',
            })),
          },
          {
            name: 'Robust (IQR抗噪)',
            slots: all.map((v, i) => ({
              label: ((v - median) / iqr).toFixed(2),
              sublabel: i === 4 ? '不破坏主分布' : '正常分布保持',
              tone: i === 4 ? 'indigo' : 'emerald',
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
