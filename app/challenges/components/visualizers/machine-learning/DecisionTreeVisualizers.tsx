'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveCurveCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：决策树

// L1: 决策树信息增益分裂器
export const DecisionTreeEntropyVisualizer: React.FC = () => {
  const [p, setP] = useState(0.5);
  const safeH = (prob: number) => {
    if (prob <= 0.001 || prob >= 0.999) return 0;
    return -(prob * Math.log2(prob) + (1 - prob) * Math.log2(1 - prob));
  };
  const ent = safeH(p);
  const gini = 2 * p * (1 - p);
  return (
    <VisualizerFrame
      title="香农信息熵 H(p) 与基尼不纯度曲线"
      subtitle="节点中正负类各半 (p=0.5) 时不确定性最大，纯节点时归零"
      badge="entropy"
      sliders={[
        { label: '节点正样本比例 p', value: p, min: 0.02, max: 0.98, step: 0.02, displayValue: p.toFixed(2), onChange: setP },
      ]}
      metrics={[
        { label: '信息熵 H(p)', value: ent.toFixed(3), tone: 'cyan' },
        { label: '基尼指数 2p(1-p)', value: gini.toFixed(3), tone: 'indigo' },
        { label: '纯度评价', value: ent < 0.35 ? '高纯度叶子' : '需继续分裂', tone: ent < 0.35 ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0, 1]}
        domainY={[0, 1.05]}
        xLabel="正样本比例 p"
        yLabel="不纯度"
        curves={[
          {
            id: 'entropy',
            label: '信息熵 H(p)',
            tone: 'cyan',
            points: Array.from({ length: 41 }, (_, i) => {
              const x = i / 40;
              return [x, safeH(x)];
            }),
          },
          {
            id: 'gini',
            label: 'Gini(p)',
            tone: 'indigo',
            dashed: true,
            points: Array.from({ length: 41 }, (_, i) => {
              const x = i / 40;
              return [x, 2 * x * (1 - x)];
            }),
          },
        ]}
        markers={[{ x: p, y: ent, label: `H=${ent.toFixed(2)}`, tone: 'emerald', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};

// L2: 决策树回归器
export const DecisionTreeMseSplitVisualizer: React.FC = () => {
  const [cutX, setCutX] = useState(0);
  const data = [
    { x: -3, y: 1.0 },
    { x: -1.5, y: 1.2 },
    { x: 1.2, y: 3.1 },
    { x: 3.0, y: 3.3 },
  ];
  const left = data.filter((d) => d.x <= cutX);
  const right = data.filter((d) => d.x > cutX);
  const mseOf = (arr: typeof data) => {
    if (!arr.length) return 0;
    const mean = arr.reduce((a, b) => a + b.y, 0) / arr.length;
    return arr.reduce((a, b) => a + (b.y - mean) ** 2, 0) / arr.length;
  };
  const weightedMse = (left.length * mseOf(left) + right.length * mseOf(right)) / data.length;
  const meanL = left.length ? left.reduce((a, b) => a + b.y, 0) / left.length : 0;
  const meanR = right.length ? right.reduce((a, b) => a + b.y, 0) / right.length : 0;
  return (
    <VisualizerFrame
      title="回归树最优划分阈值搜索 (MSE 方差缩减)"
      subtitle="左右叶子分别取均值作为分段常数预测，使加权 MSE 最小"
      badge="mse_split"
      sliders={[
        { label: '候选分裂点阈值 t', value: cutX, min: -2.5, max: 2.5, step: 0.25, displayValue: `x ≤ ${cutX.toFixed(2)}`, onChange: setCutX },
      ]}
      metrics={[
        { label: '左叶均值 ŷ_L', value: meanL.toFixed(2), tone: 'cyan' },
        { label: '右叶均值 ŷ_R', value: meanR.toFixed(2), tone: 'indigo' },
        { label: '加权方差 MSE', value: weightedMse.toFixed(3), tone: weightedMse < 0.05 ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-4, 4]}
        domainY={[0, 4.2]}
        height={210}
        segments={[
          { x1: cutX, y1: 0, x2: cutX, y2: 4.2, tone: 'amber', dashed: true, label: `分裂 x=${cutX.toFixed(1)}` },
          ...(left.length ? [{ x1: -4, y1: meanL, x2: cutX, y2: meanL, tone: 'cyan' as VisualizerTone, width: 2.5 }] : []),
          ...(right.length ? [{ x1: cutX, y1: meanR, x2: 4, y2: meanR, tone: 'indigo' as VisualizerTone, width: 2.5 }] : []),
        ]}
        points={data.map((d) => ({ x: d.x, y: d.y, tone: d.x <= cutX ? 'cyan' : 'indigo', radius: 5 }))}
      />
    </VisualizerFrame>
  );
};
