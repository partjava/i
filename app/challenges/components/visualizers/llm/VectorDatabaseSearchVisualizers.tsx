'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

// 章节：向量数据库检索

// L1: 向量数据库 ANN 检索器
export const VectorAnnIvfVisualizer: React.FC = () => {
  const [nprobe, setNprobe] = useState(1);
  return (
    <VisualizerFrame
      title="IVF-Flat 倒排桶 (Voronoi 分区) 与 nprobe 召回率权衡"
      subtitle="仅探测距离 Query 最近的 nprobe 个 Voronoi 聚类桶，避免全库暴力扫描"
      badge="ann_search"
      sliders={[{ label: '探测桶数 nprobe (总计 4 桶)', value: nprobe, min: 1, max: 3, step: 1, onChange: setNprobe }]}
      metrics={[
        { label: '跳过向量比例', value: `${Math.round(((4 - nprobe) / 4) * 100)}% 剪枝加速`, tone: 'cyan' },
        { label: '预估 Recall@10', value: nprobe === 1 ? '82%' : nprobe === 2 ? '95% ✓' : '99% ✓', tone: nprobe >= 2 ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-3, 3]}
        domainY={[-2.5, 2.5]}
        height={205}
        circles={[
          { cx: -1.4, cy: 1.0, r: 1.2, tone: 'emerald', label: '桶#1 (探测)' },
          { cx: 1.4, cy: 1.0, r: 1.2, tone: nprobe >= 2 ? 'cyan' : 'slate', dashed: nprobe < 2, label: '桶#2' },
          { cx: -1.4, cy: -1.0, r: 1.2, tone: nprobe >= 3 ? 'indigo' : 'slate', dashed: nprobe < 3, label: '桶#3' },
          { cx: 1.4, cy: -1.0, r: 1.2, tone: 'slate', dashed: true, label: '桶#4 (跳过)' },
        ]}
        points={[{ x: -0.5, y: 0.7, tone: 'amber', radius: 6, label: 'Query q' }]}
      />
    </VisualizerFrame>
  );
};

// L2: HNSW 索引模拟
export const HnswLayerGraphVisualizer: React.FC = () => {
  const [layer, setLayer] = useState(2);
  const layers = [
    { label: 'Layer 2 (高速公路长跳)', desc: '稀疏长距离跳跃，瞬间跨越搜索空间进入目标大致区域。' },
    { label: 'Layer 1 (中等邻域逼近)', desc: '逐步缩小步长，精确定位候选近邻区域。' },
    { label: 'Layer 0 (全量密集精细贪心) ✓', desc: '全量节点底层图中收敛到全局 Top-K 最近邻，毫秒百万级检索！' },
  ];
  return (
    <VisualizerFrame
      title="HNSW 分层可导航小世界图 (Hierarchical NSW)"
      subtitle="上层稀疏高速跳表快速路由，逐层降落到底层密集图完成局部精搜"
      badge="hnsw_index"
      scenarios={layers}
      activeScenario={layer}
      onScenarioChange={setLayer}
      metrics={[{ label: '搜索复杂度', value: 'O(log N) 毫秒级', tone: 'emerald' }]}
    >
      <InteractiveGraphCanvas
        height={180}
        nodes={[
          { id: 'l2a', x: 75, y: 36, label: 'Entry (L2)', tone: 'cyan', radius: 14, active: layer === 0 },
          { id: 'l2b', x: 310, y: 36, label: 'Jump (L2)', tone: 'cyan', radius: 14, active: layer === 0 },
          { id: 'l1b', x: 205, y: 92, label: 'Mid (L1)', tone: 'indigo', radius: 14, active: layer === 1 },
          { id: 'l1c', x: 310, y: 92, label: 'Near (L1)', tone: 'indigo', radius: 14, active: layer === 1 },
          { id: 'l0t', x: 345, y: 148, label: 'Target (L0)', tone: 'emerald', shape: 'pill', active: layer === 2 },
        ]}
        edges={[
          { from: 'l2a', to: 'l2b', label: '长跳', tone: 'cyan', animated: layer === 0 },
          { from: 'l2b', to: 'l1c', label: '降层', tone: 'indigo', animated: layer === 1 },
          { from: 'l1c', to: 'l0t', label: '精细收敛', tone: 'emerald', animated: layer === 2 },
        ]}
      />
    </VisualizerFrame>
  );
};
