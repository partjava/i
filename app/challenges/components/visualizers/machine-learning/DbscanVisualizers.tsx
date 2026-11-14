'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveCurveCanvas,
} from '../shared/VisualizerEngine';

// 章节：DBSCAN

// L1: DBSCAN 密度聚类器
export const DbscanDensityVisualizer: React.FC = () => {
  const [eps, setEps] = useState(1.2);
  const pts: Array<{ x: number; y: number; name: string }> = [
    { x: -1.5, y: 0.4, name: 'P1' },
    { x: -0.7, y: 0.6, name: 'P2' },
    { x: -1.1, y: -0.3, name: 'P3' },
    { x: -0.2, y: 0.1, name: '边界点' },
    { x: 2.5, y: 1.6, name: '噪声 Noise' },
  ];
  const minPts = 3;
  const counts = pts.map((p) => pts.filter((q) => Math.hypot(p.x - q.x, p.y - q.y) <= eps).length);
  return (
    <VisualizerFrame
      title="DBSCAN 邻域密度与核心/边界/噪声分类"
      subtitle={`固定 MinPts = ${minPts}，调节半径 ε 实时重算各点邻域点数`}
      badge="dbscan"
      sliders={[{ label: '邻域半径 ε (eps)', value: eps, min: 0.5, max: 2.2, step: 0.1, displayValue: eps.toFixed(1), onChange: setEps }]}
      metrics={[
        { label: '核心点 (≥3邻)', value: `${counts.filter((c) => c >= minPts).length}`, tone: 'emerald' },
        { label: '离群噪声点 (-1)', value: `${counts[4] < minPts ? 1 : 0}`, tone: counts[4] < minPts ? 'rose' : 'amber' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-3, 3.5]}
        domainY={[-2, 2.5]}
        height={210}
        circles={[{ cx: -1.1, cy: 0.3, r: eps, tone: 'cyan', dashed: true, label: `ε=${eps.toFixed(1)}` }]}
        points={pts.map((p, i) => ({
          x: p.x,
          y: p.y,
          label: i >= 3 ? p.name : undefined,
          tone: counts[i] >= minPts ? 'emerald' : i === 4 ? 'rose' : 'amber',
          radius: counts[i] >= minPts ? 6 : 4.5,
          ring: counts[i] >= minPts,
        }))}
      />
    </VisualizerFrame>
  );
};

// L2: DBSCAN eps 参数调优
export const DbscanEpsElbowVisualizer: React.FC = () => {
  const [epsCut, setEpsCut] = useState(1.1);
  const kDistCurve: Array<[number, number]> = [
    [1, 0.25],
    [2, 0.32],
    [3, 0.45],
    [4, 0.65],
    [5, 1.05],
    [6, 2.3],
    [7, 2.9],
  ];
  return (
    <VisualizerFrame
      title="K-Distance 肘部曲线定位最优 DBSCAN ε"
      subtitle="将每个点的第 K 近邻距离排序绘图，陡峭拐点位置即密度簇与离群噪声的天然边界"
      badge="region_query"
      sliders={[{ label: '截断半径 ε', value: epsCut, min: 0.3, max: 2.8, step: 0.1, displayValue: epsCut.toFixed(1), onChange: setEpsCut }]}
      metrics={[
        { label: '当前 ε', value: epsCut.toFixed(1), tone: 'cyan' },
        { label: '肘部区间评价', value: epsCut >= 0.8 && epsCut <= 1.3 ? '最优拐点区 ✓' : epsCut < 0.8 ? '过小 (碎簇)' : '过大 (吞并噪声)', tone: epsCut >= 0.8 && epsCut <= 1.3 ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[1, 7]}
        domainY={[0, 3.2]}
        xLabel="排序点索引"
        yLabel="K-近邻距离"
        curves={[{ id: 'kdist', label: 'K-Distance 升序', tone: 'cyan', fillArea: true, points: kDistCurve }]}
        hLines={[{ y: epsCut, label: `ε=${epsCut.toFixed(1)}`, tone: 'amber' }]}
        markers={[{ x: 5, y: 1.05, label: '肘部拐点', tone: 'emerald', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};
