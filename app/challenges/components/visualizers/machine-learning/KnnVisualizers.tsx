'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveCurveCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：KNN

// L1: K 近邻分类器
export const KnnClassifierVisualizer: React.FC = () => {
  const [k, setK] = useState(3);
  const query: [number, number] = [0.2, 0.2];
  const samples: Array<{ x: number; y: number; cls: 'A' | 'B'; dist: number }> = [
    { x: -0.6, y: 0.4, cls: 'A' as const },
    { x: 0.9, y: -0.3, cls: 'A' as const },
    { x: 0.1, y: 1.4, cls: 'B' as const },
    { x: -1.4, y: -0.9, cls: 'A' as const },
    { x: 1.8, y: 1.6, cls: 'B' as const },
    { x: 2.3, y: -1.5, cls: 'B' as const },
  ]
    .map((s) => ({ ...s, dist: Math.hypot(s.x - query[0], s.y - query[1]) }))
    .sort((a, b) => a.dist - b.dist);

  const radius = samples[k - 1].dist;
  const kSlice = samples.slice(0, k);
  const votesA = kSlice.filter((s) => s.cls === 'A').length;
  const pred = votesA >= k - votesA ? 'A 类 (cyan)' : 'B 类 (rose)';
  return (
    <VisualizerFrame
      title="KNN 欧氏距离度量与 K 近邻投票圆"
      subtitle="半径自适应扩大至刚好包络最近的 K 个训练点进行多数投票"
      badge="euclidean_distance"
      sliders={[{ label: '近邻数 K', value: k, min: 1, max: 5, step: 2, onChange: setK }]}
      metrics={[
        { label: `前 ${k} 近邻投票`, value: `A:${votesA} vs B:${k - votesA}`, tone: 'cyan' },
        { label: '搜索半径 R_K', value: radius.toFixed(2), tone: 'indigo' },
        { label: '预测类别', value: pred, tone: votesA >= k - votesA ? 'cyan' : 'rose' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-3, 3]}
        domainY={[-2.5, 2.5]}
        height={220}
        circles={[{ cx: query[0], cy: query[1], r: radius, tone: 'amber', dashed: true, label: `K=${k} 边界` }]}
        segments={kSlice.map((s) => ({ x1: query[0], y1: query[1], x2: s.x, y2: s.y, tone: 'slate', dashed: true }))}
        points={[
          ...samples.map((s, i) => ({
            x: s.x,
            y: s.y,
            tone: (s.cls === 'A' ? 'cyan' : 'rose') as VisualizerTone,
            radius: i < k ? 5.5 : 4,
            ring: i < k,
          })),
          { x: query[0], y: query[1], tone: 'emerald', radius: 6, label: '待测点 q' },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: KNN 回归与超参调优
export const KnnRegressionTuningVisualizer: React.FC = () => {
  const [k, setK] = useState(3);
  const trainY = [1.2, 2.8, 1.5, 3.6, 2.4, 2.9];
  const curve = Array.from({ length: 6 }, (_, i) => {
    const kk = i + 1;
    const biasVar = 0.08 * kk + 1.1 / kk;
    return [kk, biasVar] as [number, number];
  });
  return (
    <VisualizerFrame
      title="KNN 回归均值平滑与偏置-方差 U 型曲线"
      subtitle="K=1 时极易受单点噪声影响（过拟合）；随 K 增大预测趋于平滑但偏差上升"
      badge="knn_regression"
      sliders={[{ label: '超参数 K', value: k, min: 1, max: 6, step: 1, onChange: setK }]}
      metrics={[
        { label: `前 ${k} 近邻均值预测`, value: (trainY.slice(0, k).reduce((a, b) => a + b, 0) / k).toFixed(2), tone: 'cyan' },
        { label: '验证集误差估计', value: (0.08 * k + 1.1 / k).toFixed(2), tone: k === 3 || k === 4 ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[1, 6]}
        domainY={[0, 1.5]}
        xLabel="近邻数 K"
        yLabel="验证集 MSE"
        curves={[{ id: 'val', label: '验证误差 U 型曲线', tone: 'cyan', fillArea: true, points: curve }]}
        markers={[{ x: k, y: 0.08 * k + 1.1 / k, label: `K=${k}`, tone: 'emerald', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};
