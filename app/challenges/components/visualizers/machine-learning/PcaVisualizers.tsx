'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：PCA主成分分析

// L1: PCA 降维与重建
export const PcaProjectionVisualizer: React.FC = () => {
  const [angleDeg, setAngleDeg] = useState(35);
  const rad = (angleDeg * Math.PI) / 180;
  const ux = Math.cos(rad);
  const uy = Math.sin(rad);
  const samples: Array<[number, number]> = [
    [-2.2, -1.3],
    [-1.0, -0.8],
    [0.8, 0.7],
    [2.1, 1.4],
  ];
  const projections = samples.map(([x, y]) => {
    const dot = x * ux + y * uy;
    return { x, y, px: dot * ux, py: dot * uy, dot };
  });
  const projVar = projections.reduce((acc, p) => acc + p.dot * p.dot, 0) / samples.length;
  return (
    <VisualizerFrame
      title="PCA 最大方差主轴投影与重建误差"
      subtitle="旋转投影轴 u 观察保留方差与垂直正交残差（虚线）的消长"
      badge="pca_fit"
      sliders={[{ label: '主成分方向角 θ (°)', value: angleDeg, min: -45, max: 90, step: 5, displayValue: `${angleDeg}°`, onChange: setAngleDeg }]}
      metrics={[
        { label: '投影方差 Σ(uᵀx)²/n', value: projVar.toFixed(2), tone: projVar > 2.8 ? 'emerald' : 'cyan' },
        { label: '最优第一主轴 PC1', value: '≈ 35° (最大方差)', tone: 'indigo' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-3.2, 3.2]}
        domainY={[-2.5, 2.5]}
        height={220}
        segments={[
          { x1: -3 * ux, y1: -3 * uy, x2: 3 * ux, y2: 3 * uy, tone: 'amber', width: 2, label: '主轴 u' },
          ...projections.map((p) => ({ x1: p.x, y1: p.y, x2: p.px, y2: p.py, tone: 'rose' as VisualizerTone, dashed: true })),
        ]}
        vectors={[{ id: 'pc1', to: [ux * 1.6, uy * 1.6], tone: 'emerald', label: 'u₁' }]}
        points={[
          ...projections.map((p) => ({ x: p.x, y: p.y, tone: 'cyan' as VisualizerTone, radius: 5 })),
          ...projections.map((p) => ({ x: p.px, y: p.py, tone: 'emerald' as VisualizerTone, radius: 3.5 })),
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: PCA 白化与重建误差
export const PcaWhiteningVisualizer: React.FC = () => {
  const [whiten, setWhiten] = useState(1);
  const rawPts: Array<[number, number]> = [
    [-2.5, -0.4],
    [-1.2, 0.3],
    [1.3, -0.2],
    [2.4, 0.3],
  ];
  const whitenedPts: Array<[number, number]> = [
    [-1.2, -1.1],
    [-0.7, 0.9],
    [0.7, -0.8],
    [1.2, 1.0],
  ];
  const pts = whiten ? whitenedPts : rawPts;
  return (
    <VisualizerFrame
      title="PCA 白化 (Whitening) 协方差单位球面化"
      subtitle="在主成分投影基础上再除以 √λ_i，使各个正交特征维度均拥有单位方差 1"
      badge="pca_whitening"
      scenarios={[
        { label: '各向异性原始投影', summary: '水平轴方差远大于竖直轴 (λ₁ ≫ λ₂)，协方差呈扁椭圆。' },
        { label: 'ZCA/PCA 白化输出', summary: '各维除以 √λ 后协方差变成单位阵 I，散点呈各向同性圆形！' },
      ]}
      activeScenario={whiten}
      onScenarioChange={setWhiten}
      metrics={[
        { label: '协方差矩阵 Cov(Z)', value: whiten ? '[[1, 0], [0, 1]] ✓' : '[[3.8, 0], [0, 0.12]]', tone: whiten ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-3.2, 3.2]}
        domainY={[-2.2, 2.2]}
        height={200}
        circles={[
          whiten
            ? { cx: 0, cy: 0, r: 1.4, tone: 'emerald', dashed: true, label: '单位方差圆' }
            : { cx: 0, cy: 0, r: 2.5, tone: 'amber', dashed: true },
        ]}
        points={pts.map((p) => ({ x: p[0], y: p[1], tone: whiten ? 'emerald' : 'cyan', radius: 5 }))}
      />
    </VisualizerFrame>
  );
};
