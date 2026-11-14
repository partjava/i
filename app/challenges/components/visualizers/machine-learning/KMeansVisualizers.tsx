'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：K-Means聚类

// L1: K-Means 聚类引擎
export const KMeansIterationVisualizer: React.FC = () => {
  const [iter, setIter] = useState(1);
  const ptsA: Array<[number, number]> = [
    [-2.4, 1.8],
    [-1.8, 2.5],
    [-2.8, 1.2],
  ];
  const ptsB: Array<[number, number]> = [
    [2.1, -1.2],
    [1.6, -2.0],
    [2.6, -1.7],
  ];
  const steps = [
    { c1: [-0.4, -0.4] as [number, number], c2: [0.5, 0.8] as [number, number], label: 'Iter 0: 随机初始质心', summary: '质心位于原点附近，需按最近质心重分配簇标签。' },
    { c1: [-1.7, 1.3] as [number, number], c2: [1.5, -1.1] as [number, number], label: 'Iter 1: E-step 分配 + 更新', summary: '点被指派给较近质心后，各质心朝族均值移动。' },
    { c1: [-2.33, 1.83] as [number, number], c2: [2.1, -1.63] as [number, number], label: 'Iter 2: EM 收敛稳定', summary: '质心停在两团样本几何中心，簇划分不再变化。' },
  ];
  const cur = steps[iter];
  return (
    <VisualizerFrame
      title="K-Means 交替优化：分配 (E) 与质心更新 (M)"
      subtitle="逐步演示 EM 迭代使簇内平方和 (SSE / Inertia) 单调收敛"
      badge="initialize_centroids"
      scenarios={steps.map((s) => ({ label: s.label, summary: s.summary }))}
      activeScenario={iter}
      onScenarioChange={setIter}
      metrics={[
        { label: '质心 μ₁', value: `(${cur.c1[0].toFixed(1)}, ${cur.c1[1].toFixed(1)})`, tone: 'cyan' },
        { label: '质心 μ₂', value: `(${cur.c2[0].toFixed(1)}, ${cur.c2[1].toFixed(1)})`, tone: 'amber' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-3.5, 3.5]}
        domainY={[-3, 3.2]}
        height={220}
        segments={[
          ...ptsA.map((p) => ({ x1: p[0], y1: p[1], x2: cur.c1[0], y2: cur.c1[1], tone: 'cyan' as VisualizerTone, dashed: true })),
          ...ptsB.map((p) => ({ x1: p[0], y1: p[1], x2: cur.c2[0], y2: cur.c2[1], tone: 'amber' as VisualizerTone, dashed: true })),
        ]}
        points={[
          ...ptsA.map((p) => ({ x: p[0], y: p[1], tone: 'cyan' as VisualizerTone, radius: 4.5 })),
          ...ptsB.map((p) => ({ x: p[0], y: p[1], tone: 'amber' as VisualizerTone, radius: 4.5 })),
          { x: cur.c1[0], y: cur.c1[1], tone: 'emerald', radius: 6.5, ring: true, label: 'μ₁' },
          { x: cur.c2[0], y: cur.c2[1], tone: 'rose', radius: 6.5, ring: true, label: 'μ₂' },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: K-Means++ 初始化
export const KMeansPlusPlusVisualizer: React.FC = () => {
  const [phase, setPhase] = useState(1);
  return (
    <VisualizerFrame
      title="K-Means++ 按距离平方 D(x)² 概率加权初始化"
      subtitle="已选第一个质心 μ₁ 后，距离 μ₁ 越远的点拥有越高的 D(x)² 被选为下个质心"
      badge="kmeans_plusplus_init"
      scenarios={[
        { label: '1. 随机选出 μ₁', summary: '仅选中左团中心 μ₁(-2.2, 1.5)。' },
        { label: '2. 计算 D(x)² 权重选 μ₂', summary: '右下方簇距离较远，D(x)² 概率占比超 85%，极大避免初始质心挤在一起。' },
      ]}
      activeScenario={phase}
      onScenarioChange={setPhase}
      metrics={[
        { label: '近处点概率', value: '3%', tone: 'slate' },
        { label: '远处团概率 D(x)²', value: '91%', tone: 'emerald' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-3.5, 3.5]}
        domainY={[-3, 3]}
        height={210}
        circles={phase === 1 ? [{ cx: -2.2, cy: 1.5, r: 4.6, tone: 'amber', dashed: true, label: 'D(x)² 最大处' }] : []}
        points={[
          { x: -2.2, y: 1.5, tone: 'emerald', radius: 7, ring: true, label: 'μ₁ (已选)' },
          { x: -1.8, y: 2.1, tone: 'slate', radius: 4 },
          { x: 2.3, y: -1.6, tone: phase === 1 ? 'amber' : 'cyan', radius: phase === 1 ? 7 : 4.5, ring: phase === 1, label: phase === 1 ? '候选 μ₂ (高概率)' : undefined },
          { x: 2.6, y: -1.1, tone: 'cyan', radius: 4.5 },
        ]}
      />
    </VisualizerFrame>
  );
};
