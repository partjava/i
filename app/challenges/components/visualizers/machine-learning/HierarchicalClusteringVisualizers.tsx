'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveGraphCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：层次聚类

// L1: 层次聚类与树状图
export const HierarchicalDendrogramVisualizer: React.FC = () => {
  const [cutHeight, setCutHeight] = useState(2.2);
  const clusters = cutHeight >= 3.2 ? 1 : cutHeight >= 1.8 ? 2 : 3;
  return (
    <VisualizerFrame
      title="凝聚层次聚类树状图 (Dendrogram) 与水平截断"
      subtitle="从底部 N 个单点簇开始自底向上合并最近簇对，沿不同高度横切即得 K 个簇"
      badge="agglomerative"
      sliders={[{ label: '树状图截断高度 h', value: cutHeight, min: 0.8, max: 3.8, step: 0.2, displayValue: cutHeight.toFixed(1), onChange: setCutHeight }]}
      metrics={[
        { label: '当前切分簇数 K', value: `${clusters} 个簇`, tone: clusters === 2 ? 'emerald' : 'cyan' },
        { label: '连接度准则', value: 'Ward / Average', tone: 'indigo' },
      ]}
    >
      <InteractiveGraphCanvas
        height={185}
        nodes={[
          { id: 'r', x: 200, y: 28, label: 'Root Merge (h=3.2)', tone: cutHeight < 3.2 ? 'slate' : 'emerald', shape: 'pill', active: cutHeight >= 3.2 },
          { id: 'ab', x: 115, y: 88, label: '簇 {A, B} (h=1.8)', tone: cutHeight >= 1.8 && cutHeight < 3.2 ? 'emerald' : 'cyan', shape: 'pill', active: cutHeight >= 1.8 && cutHeight < 3.2 },
          { id: 'cd', x: 285, y: 88, label: '簇 {C, D} (h=2.0)', tone: cutHeight >= 2.0 && cutHeight < 3.2 ? 'emerald' : 'indigo', shape: 'pill', active: cutHeight >= 2.0 && cutHeight < 3.2 },
          { id: 'a', x: 65, y: 152, label: 'A', tone: 'cyan', radius: 14 },
          { id: 'b', x: 155, y: 152, label: 'B', tone: 'cyan', radius: 14 },
          { id: 'c', x: 245, y: 152, label: 'C', tone: 'indigo', radius: 14 },
          { id: 'd', x: 335, y: 152, label: 'D', tone: 'indigo', radius: 14 },
        ]}
        edges={[
          { from: 'r', to: 'ab', tone: cutHeight < 3.2 ? 'slate' : 'emerald', dashed: cutHeight < 3.2 },
          { from: 'r', to: 'cd', tone: cutHeight < 3.2 ? 'slate' : 'emerald', dashed: cutHeight < 3.2 },
          { from: 'ab', to: 'a', tone: cutHeight < 1.8 ? 'slate' : 'cyan', dashed: cutHeight < 1.8 },
          { from: 'ab', to: 'b', tone: cutHeight < 1.8 ? 'slate' : 'cyan', dashed: cutHeight < 1.8 },
          { from: 'cd', to: 'c', tone: cutHeight < 2.0 ? 'slate' : 'indigo', dashed: cutHeight < 2.0 },
          { from: 'cd', to: 'd', tone: cutHeight < 2.0 ? 'slate' : 'indigo', dashed: cutHeight < 2.0 },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 层次聚类与树状图截断
export const HierarchicalLinkageCutVisualizer: React.FC = () => {
  const [linkage, setLinkage] = useState(0);
  const links = [
    { name: 'Single Linkage (最短距离)', desc: '易产生链式拉伸簇 (chaining effect)。', dist: 'min d(a,b) = 0.8', tone: 'amber' as VisualizerTone },
    { name: 'Complete Linkage (最远距离)', desc: '倾向构造直径紧凑均等的球状簇。', dist: 'max d(a,b) = 2.9', tone: 'cyan' as VisualizerTone },
    { name: 'Ward 最小方差增量', desc: '合并使总簇内平方和 SSE 增量最小的对。', dist: 'ΔSSE = 1.4', tone: 'emerald' as VisualizerTone },
  ];
  const cur = links[linkage];
  return (
    <VisualizerFrame
      title="层次聚类簇间距离度量 (Linkage) 对比"
      subtitle="不同 Linkage 准则决定层次融合顺序与最终聚类形状"
      badge="linkage_matrix"
      scenarios={links.map((l) => ({ label: l.name.split(' ')[0], summary: l.desc }))}
      activeScenario={linkage}
      onScenarioChange={setLinkage}
      metrics={[
        { label: '当前准则', value: cur.name.split(' ')[0], tone: cur.tone },
        { label: '簇间度量', value: cur.dist, tone: cur.tone },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-3.5, 3.5]}
        domainY={[-2, 2]}
        height={200}
        segments={[
          linkage === 0
            ? { x1: -0.9, y1: 0, x2: 0.9, y2: 0, tone: 'amber', width: 2.5, label: 'min d' }
            : linkage === 1
            ? { x1: -2.4, y1: 0.7, x2: 2.5, y2: -0.6, tone: 'cyan', width: 2.5, label: 'max d' }
            : { x1: -1.7, y1: 0.2, x2: 1.7, y2: -0.2, tone: 'emerald', width: 2.5, label: '质心 Ward' },
        ]}
        points={[
          { x: -2.4, y: 0.7, tone: 'cyan', radius: 5 },
          { x: -1.5, y: -0.2, tone: 'cyan', radius: 5 },
          { x: -0.9, y: 0, tone: 'cyan', radius: 5 },
          { x: 0.9, y: 0, tone: 'indigo', radius: 5 },
          { x: 1.8, y: 0.3, tone: 'indigo', radius: 5 },
          { x: 2.5, y: -0.6, tone: 'indigo', radius: 5 },
        ]}
      />
    </VisualizerFrame>
  );
};
