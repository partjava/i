'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：多头注意力机制

// L1: 多头注意力聚合器
export const MultiHeadSplitConcatVisualizer: React.FC = () => {
  const [heads, setHeads] = useState(4);
  const dModel = 64;
  return (
    <VisualizerFrame
      title="Multi-Head Attention 投影切分 → 并行子空间 → Concat(W_O)"
      subtitle={`将 d_model=${dModel} 等分为 h=${heads} 个头，每头维度 d_k=${dModel / heads}，总算力开销与单头相近`}
      badge="multi_head_attn"
      sliders={[{ label: '注意力头数 num_heads', value: heads, min: 2, max: 8, step: 2, displayValue: `${heads} Heads`, onChange: setHeads }]}
      metrics={[
        { label: '单头子空间 d_k', value: `${dModel / heads} 维`, tone: 'cyan' },
        { label: '拼接恢复维度', value: `${heads} × ${dModel / heads} = ${dModel}`, tone: 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '并行头子空间',
            slots: Array.from({ length: heads }, (_, i) => ({
              label: `Head #${i + 1}`,
              sublabel: i === 0 ? '语法依存' : i === 1 ? '指代消解' : `子空间 d_k=${dModel / heads}`,
              tone: (['cyan', 'indigo', 'emerald', 'amber'] as VisualizerTone[])[i % 4],
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 多头注意力
export const MultiHeadSubspaceFocusVisualizer: React.FC = () => {
  const [focusHead, setFocusHead] = useState(0);
  const heads = [
    { name: 'Head 1: 指代追踪', attn: '“它” → “AI模型” (0.86)', tone: 'cyan' as VisualizerTone },
    { name: 'Head 2: 动宾修饰', attn: '“解析” → “数据” (0.79)', tone: 'emerald' as VisualizerTone },
    { name: 'Head 3: 局部邻近', attn: '相邻词偏移 -1 (0.74)', tone: 'amber' as VisualizerTone },
  ];
  return (
    <VisualizerFrame
      title="多头注意力异构特征关注分工对比"
      subtitle="独立映射矩阵 W_Q^i, W_K^i, W_V^i 让不同头各自学习语法、指代或局部语义关系"
      badge="mha_projection"
      scenarios={heads.map((h) => ({ label: h.name, summary: h.attn }))}
      activeScenario={focusHead}
      onScenarioChange={setFocusHead}
      metrics={[{ label: '当前子空间强关注对', value: heads[focusHead].attn, tone: heads[focusHead].tone }]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={[
          { id: 'tok1', x: 75, y: 48, label: 'AI模型', tone: 'cyan', shape: 'pill', active: focusHead === 0 },
          { id: 'tok2', x: 75, y: 120, label: '它 / 解析', tone: 'indigo', shape: 'pill', active: true },
          { id: 'mha', x: 215, y: 84, label: heads[focusHead].name, tone: heads[focusHead].tone, shape: 'pill', active: true },
          { id: 'wo', x: 340, y: 84, label: 'Linear(W_O)', tone: 'emerald', shape: 'pill', active: true },
        ]}
        edges={[
          { from: 'tok1', to: 'mha', tone: 'cyan', animated: focusHead === 0 },
          { from: 'tok2', to: 'mha', tone: 'indigo', animated: true },
          { from: 'mha', to: 'wo', tone: heads[focusHead].tone, animated: true },
        ]}
      />
    </VisualizerFrame>
  );
};
