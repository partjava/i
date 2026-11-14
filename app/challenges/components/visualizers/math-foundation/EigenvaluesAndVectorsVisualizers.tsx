'use client';

import { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

// 章节：特征值与特征向量

// L1: 特征值分解与网页排名模拟
export function EigenPageRankViz() {
  const [iter, setIter] = useState(0);
  const steps = [
    { label: 't=0 (均匀初始)', ranks: [0.25, 0.25, 0.25, 0.25] },
    { label: 't=1 (一次转移)', ranks: [0.32, 0.22, 0.28, 0.18] },
    { label: 't=5 (主特征向量收敛)', ranks: [0.38, 0.20, 0.29, 0.13] },
  ];
  const cur = steps[iter];

  return (
    <VisualizerFrame
      title="特征分解与 PageRank 稳态幂迭代"
      subtitle="网页转移矩阵的主特征向量（λ=1）对应平稳访问概率分布，迭代越多越趋近真实权威度。"
      badge="Markov 转移图"
      scenarios={steps.map((s) => ({ label: s.label, summary: `当前节点权重分布: [${s.ranks.join(', ')}]` }))}
      activeScenario={iter}
      onScenarioChange={setIter}
      metrics={[
        { label: '最高权重节点', value: `Page A (${cur.ranks[0].toFixed(2)})`, tone: 'emerald' },
        { label: '主特征值 λ₁', value: '1.00', tone: 'indigo' },
      ]}
    >
      <InteractiveGraphCanvas
        height={170}
        nodes={[
          { id: 'A', x: 96, y: 46, label: 'Page A', sublabel: `PR=${cur.ranks[0]}`, shape: 'circle', radius: 22, tone: 'emerald', active: true },
          { id: 'B', x: 304, y: 46, label: 'Page B', sublabel: `PR=${cur.ranks[1]}`, shape: 'circle', radius: 20, tone: 'cyan' },
          { id: 'C', x: 304, y: 132, label: 'Page C', sublabel: `PR=${cur.ranks[2]}`, shape: 'circle', radius: 21, tone: 'indigo', active: iter === 2 },
          { id: 'D', x: 96, y: 132, label: 'Page D', sublabel: `PR=${cur.ranks[3]}`, shape: 'circle', radius: 18, tone: 'slate' },
        ]}
        edges={[
          { from: 'B', to: 'A', tone: 'emerald', animated: true },
          { from: 'C', to: 'A', tone: 'emerald', animated: true },
          { from: 'A', to: 'C', tone: 'indigo', curveOffset: 16 },
          { from: 'D', to: 'C', tone: 'cyan' },
          { from: 'A', to: 'B', tone: 'cyan' },
        ]}
      />
    </VisualizerFrame>
  );
}

// L2: 特征分解与对角化
export function EigenVectorActionViz() {
  const [angleDeg, setAngleDeg] = useState(45);
  // A = [[2, 1], [1, 2]] -> eigenvectors along 45 deg (lambda=3) and 135 deg (lambda=1)
  const rad = (angleDeg * Math.PI) / 180;
  const vx = 1.6 * Math.cos(rad);
  const vy = 1.6 * Math.sin(rad);
  const avx = 2 * vx + 1 * vy;
  const avy = 1 * vx + 2 * vy;
  const cross = Math.abs(vx * avy - vy * avx);
  const isEigen = cross < 0.28;

  return (
    <VisualizerFrame
      title="特征向量的几何不变性 Av = λv"
      subtitle="旋转输入向量 v，观察仅当 v 落在 45° (λ=3) 或 135° (λ=1) 特征方向上时，Av 不偏转方向。"
      badge="特征方向不变性"
      sliders={[
        { label: '输入向量方向角', value: angleDeg, min: 0, max: 180, step: 5, displayValue: `${angleDeg}°`, onChange: setAngleDeg },
      ]}
      metrics={[
        { label: '是否共线 (特征向量)', value: isEigen ? '是！Av // v' : '否 (发生偏转)', tone: isEigen ? 'emerald' : 'amber' },
        { label: '伸缩倍数 ||Av||/||v||', value: (Math.hypot(avx, avy) / 1.6).toFixed(2), tone: 'cyan' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-4.5, 4.5]}
        domainY={[-1.5, 4.8]}
        segments={[
          { x1: -3.5, y1: -3.5, x2: 3.5, y2: 3.5, tone: 'emerald', dashed: true, label: 'λ₁=3' },
          { x1: 3.5, y1: -3.5, x2: -3.5, y2: 3.5, tone: 'indigo', dashed: true, label: 'λ₂=1' },
        ]}
        vectors={[
          { id: 'v', to: [vx, vy], label: 'v', tone: 'cyan', width: 2.5 },
          { id: 'av', to: [avx, avy], label: 'Av', tone: isEigen ? 'emerald' : 'amber', width: 2.5 },
        ]}
      />
    </VisualizerFrame>
  );
}
