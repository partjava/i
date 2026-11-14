'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveGraphCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：Word2Vec词向量

// L1: Word2Vec CBOW 嵌入训练器
export const Word2VecCbowVisualizer: React.FC = () => {
  const [win, setWin] = useState(1);
  return (
    <VisualizerFrame
      title="Word2Vec CBOW：上下文向量求和平均预测中心词"
      subtitle="分布式假设——由前后窗口语义向量平均投射预测空缺中心词概率"
      badge="cbow_train"
      sliders={[{ label: '上下文窗口半径 window', value: win, min: 1, max: 2, step: 1, onChange: setWin }]}
      metrics={[
        { label: '输入上下文词数', value: `${win * 2} 个词`, tone: 'cyan' },
        { label: '目标预测词', value: 'learning', tone: 'emerald' },
      ]}
    >
      <InteractiveGraphCanvas
        height={175}
        nodes={[
          ...(win === 2 ? [{ id: 'c0', x: 68, y: 26, label: 'fast', tone: 'slate' as VisualizerTone, shape: 'pill' as const }] : []),
          { id: 'c1', x: 68, y: 65, label: 'deep', tone: 'cyan', shape: 'pill', active: true },
          { id: 'c2', x: 68, y: 118, label: 'models', tone: 'cyan', shape: 'pill', active: true },
          ...(win === 2 ? [{ id: 'c3', x: 68, y: 155, label: 'shine', tone: 'slate' as VisualizerTone, shape: 'pill' as const }] : []),
          { id: 'avg', x: 200, y: 92, label: 'Mean Pooling', sublabel: '向量平均 h', tone: 'indigo', shape: 'pill', active: true },
          { id: 'tgt', x: 332, y: 92, label: 'learning', sublabel: 'Softmax', tone: 'emerald', shape: 'pill', active: true },
        ]}
        edges={[
          ...(win === 2 ? [{ from: 'c0', to: 'avg', tone: 'slate' as VisualizerTone }] : []),
          { from: 'c1', to: 'avg', tone: 'cyan', animated: true },
          { from: 'c2', to: 'avg', tone: 'cyan', animated: true },
          ...(win === 2 ? [{ from: 'c3', to: 'avg', tone: 'slate' as VisualizerTone }] : []),
          { from: 'avg', to: 'tgt', label: 'W_out', tone: 'emerald', animated: true },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: Skip-Gram 训练器
export const Word2VecSkipGramVisualizer: React.FC = () => {
  const [phase, setPhase] = useState(1);
  return (
    <VisualizerFrame
      title="Skip-Gram 词向量代数拓扑：king - man + woman ≈ queen"
      subtitle="中心词预测上下文使语义相似与类比关系在嵌入向量空间中显现平行四边形几何结构"
      badge="skip_gram"
      scenarios={[
        { label: '基准词向量空间', summary: '展示王室与性别两个正交方向张成的语义词嵌入平面。' },
        { label: '语义线性类比平移 ✓', summary: 'vec(king) - vec(man) + vec(woman) 精准落入 vec(queen) 邻域！' },
      ]}
      activeScenario={phase}
      onScenarioChange={setPhase}
      metrics={[{ label: '余弦相似度 cos(ans, queen)', value: '0.94', tone: 'emerald' }]}
    >
      <InteractiveVectorCanvas
        domainX={[-1, 5]}
        domainY={[-1, 4.5]}
        height={210}
        vectors={[
          { id: 'v1', from: [0, 0], to: [1.5, 1.0], tone: 'slate', label: 'man' },
          { id: 'v2', from: [0, 0], to: [2.0, 3.3], tone: 'cyan', label: 'king' },
          { id: 'v3', from: [0, 0], to: [3.2, 1.0], tone: 'amber', label: 'woman' },
          ...(phase ? [{ id: 'v4', from: [0, 0] as [number, number], to: [3.7, 3.3] as [number, number], tone: 'emerald' as VisualizerTone, label: 'queen (类比结果)' }] : []),
        ]}
        segments={phase ? [{ x1: 1.5, y1: 1.0, x2: 3.2, y2: 1.0, tone: 'indigo', dashed: true }, { x1: 2.0, y1: 3.3, x2: 3.7, y2: 3.3, tone: 'emerald', dashed: true }] : []}
      />
    </VisualizerFrame>
  );
};
