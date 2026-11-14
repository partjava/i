'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
} from '../shared/VisualizerEngine';

// 章节：向量Embedding

// L1: 文本向量嵌入器
export const TextEmbeddingVectorVisualizer: React.FC = () => {
  const [queryIdx, setQueryIdx] = useState(0);
  const queries = [
    { label: '查询：“如何给模型加速？”', cosSim: '0.93 (与推理优化极近 ✓)', q: [2.2, 1.9] as [number, number] },
    { label: '查询：“晚饭吃什么菜？”', cosSim: '0.18 (分布正交无关)', q: [-2.0, 2.1] as [number, number] },
  ];
  const cur = queries[queryIdx];
  return (
    <VisualizerFrame
      title="稠密文本嵌入 (Embedding) 与余弦相似度检索几何"
      subtitle="同语义句无论字面用词是否重合，在共享嵌入超球面上夹角余弦 cos θ 均接近 1"
      badge="text_embedding"
      scenarios={queries.map((q) => ({ label: q.label, summary: q.cosSim }))}
      activeScenario={queryIdx}
      onScenarioChange={setQueryIdx}
      metrics={[{ label: 'cos(Query, 知识库文档)', value: cur.cosSim, tone: queryIdx === 0 ? 'emerald' : 'amber' }]}
    >
      <InteractiveVectorCanvas
        domainX={[-3, 3.5]}
        domainY={[-1, 3]}
        height={205}
        vectors={[
          { id: 'doc', to: [2.4, 1.7], tone: 'emerald', label: 'Doc: "vLLM PagedAttention 加速"' },
          { id: 'q', to: cur.q, tone: queryIdx === 0 ? 'cyan' : 'rose', label: 'Query 向量' },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 向量对齐评估
export const EmbeddingAlignmentContrastiveVisualizer: React.FC = () => {
  const [temp, setTemp] = useState(0.2);
  return (
    <VisualizerFrame
      title="InfoNCE 对比学习：拉近正样本 (Alignment) + 推开负样本 (Uniformity)"
      subtitle="对比损失在超球面内部把锚点与正例拉拢，同时均匀推散大量负样本防止表征坍塌"
      badge="alignment_eval"
      sliders={[{ label: '对比温度系数 τ', value: temp, min: 0.05, max: 0.6, step: 0.05, displayValue: temp.toFixed(2), onChange: setTemp }]}
      metrics={[
        { label: '正例对齐度 (Cos Sim ↑)', value: (0.95 - temp * 0.3).toFixed(2), tone: 'emerald' },
        { label: '负例分散均匀度', value: 'Uniform ✓', tone: 'cyan' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-2.5, 2.5]}
        domainY={[-2.2, 2.2]}
        height={200}
        circles={[{ cx: 0, cy: 0, r: 1.6, tone: 'slate', dashed: true, label: 'L2 归一化单位球' }]}
        points={[
          { x: 1.1, y: 1.15, tone: 'emerald', radius: 6, label: 'Anchor x' },
          { x: 1.28, y: 0.96, tone: 'cyan', radius: 5.5, label: 'Positive x+' },
          { x: -1.3, y: 0.9, tone: 'rose', radius: 5, label: 'Neg 1' },
          { x: -0.6, y: -1.48, tone: 'rose', radius: 5, label: 'Neg 2' },
        ]}
      />
    </VisualizerFrame>
  );
};
