'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
} from '../shared/VisualizerEngine';

// 章节：PPO优化

// L1: PPO 裁剪策略优化
export const PpoClipRatioVisualizer: React.FC = () => {
  const [eps, setEps] = useState(0.2);
  const [ratio, setRatio] = useState(1.25);
  const adv = 1.0;
  const clipped = Math.min(Math.max(ratio, 1 - eps), 1 + eps);
  const obj = Math.min(ratio * adv, clipped * adv);
  return (
    <VisualizerFrame
      title="PPO Clipped Surrogate 信赖域截断目标 (A > 0)"
      subtitle="当策略新旧概率比 r_t 超过 1+ε 时强制截断梯度，防止单步更新幅度过大导致策略崩溃"
      badge="ppo_clip"
      sliders={[
        { label: '信赖域裁剪边界 ε', value: eps, min: 0.1, max: 0.35, step: 0.05, displayValue: eps.toFixed(2), onChange: setEps },
        { label: '策略概率比 r_t = π_new / π_old', value: ratio, min: 0.6, max: 1.5, step: 0.05, displayValue: ratio.toFixed(2), onChange: setRatio },
      ]}
      metrics={[
        { label: '截断后比值 clip(r, 1±ε)', value: clipped.toFixed(2), tone: ratio > 1 + eps ? 'amber' : 'cyan' },
        { label: 'PPO 目标 L_CLIP', value: obj.toFixed(2), tone: 'emerald' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0.5, 1.6]}
        domainY={[0.5, 1.5]}
        xLabel="新旧概率比 r_t"
        yLabel="裁剪目标 (A=+1)"
        highlightBandX={{ x1: 1 - eps, x2: 1 + eps, label: `Trust Region [1-ε, 1+ε]`, tone: 'emerald' }}
        curves={[
          {
            id: 'ppoclip',
            label: 'min(r·A, clip(r)·A)',
            tone: 'cyan',
            points: [
              [0.5, 0.5],
              [1 + eps, 1 + eps],
              [1.6, 1 + eps],
            ],
          },
        ]}
        markers={[{ x: ratio, y: obj, label: ratio > 1 + eps ? '平顶零梯度✓' : '安全更新区', tone: 'emerald', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};

// L2: GAE 优势估计
export const GaeAdvantageVisualizer: React.FC = () => {
  const [gaeLambda, setGaeLambda] = useState(0.95);
  return (
    <VisualizerFrame
      title="GAE (广义优势估计) λ 平滑偏置与方差权衡"
      subtitle="λ=0 退化为低方差单步 TD(0)；λ=1 退化为无偏高方差 Monte-Carlo；0.95 兼得两者优势"
      badge="gae_advantage"
      sliders={[{ label: 'GAE 平滑系数 λ', value: gaeLambda, min: 0.0, max: 1.0, step: 0.05, displayValue: gaeLambda.toFixed(2), onChange: setGaeLambda }]}
      metrics={[
        { label: '方差特征', value: gaeLambda > 0.9 ? '低偏高方差近MC' : gaeLambda < 0.2 ? '低方差有偏TD(0)' : '黄金平衡点 ✓', tone: 'emerald' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0, 1]}
        domainY={[0, 1]}
        xLabel="GAE 参数 λ"
        yLabel="误差指标"
        curves={[
          { id: 'bias', label: '偏差 Bias ↓', tone: 'cyan', points: Array.from({ length: 11 }, (_, i) => [i / 10, (1 - i / 10) ** 1.5]) },
          { id: 'var', label: '方差 Variance ↑', tone: 'amber', points: Array.from({ length: 11 }, (_, i) => [i / 10, (i / 10) ** 1.5]) },
        ]}
        markers={[{ x: gaeLambda, y: (gaeLambda) ** 1.5, label: `λ=${gaeLambda.toFixed(2)}`, tone: 'emerald', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};
