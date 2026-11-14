'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：编码与解码器

// L1: Seq2Seq 翻译模型
export const Seq2SeqTranslationVisualizer: React.FC = () => {
  const [step, setStep] = useState(2);
  const src = ['I', 'love', 'NLP'];
  const tgt = ['<BOS>', '我', '爱', '自然语言处理'];
  return (
    <VisualizerFrame
      title="Seq2Seq 自回归编码-解码生成管道"
      subtitle="编码器一次并行处理源句产生上下文；解码器每一步把上步生成 Token 喂回输入自回归推进"
      badge="seq2seq_translate"
      scenarios={[1, 2, 3].map((s) => ({
        label: `解码步 t=${s}: 生成 "${tgt[s]}"`,
        summary: `给定已生成前序 [${tgt.slice(0, s).join(' ')}]，输出下一词 "${tgt[s]}"。`,
      }))}
      activeScenario={step - 1}
      onScenarioChange={(idx) => setStep(idx + 1)}
      metrics={[
        { label: '源句 (Encoder)', value: src.join(' '), tone: 'indigo' },
        { label: '已解码前缀', value: tgt.slice(1, step + 1).join(' '), tone: 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          { name: 'Encoder Src', slots: src.map((w) => ({ label: w, tone: 'indigo' })) },
          {
            name: 'Decoder Out',
            slots: tgt.slice(0, step + 1).map((w, i) => ({
              label: w,
              sublabel: i === step ? '新生成' : '历史上下文',
              tone: i === step ? 'emerald' : 'cyan',
              pointer: i === step ? 'NEW' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: Beam Search 解码
export const BeamSearchTreeVisualizer: React.FC = () => {
  const [beamW, setBeamW] = useState(2);
  return (
    <VisualizerFrame
      title={`Beam Search (集束宽度 B=${beamW}) 对数概率序列寻优`}
      subtitle="贪心 (B=1) 可能错失全局更高累积概率句；Beam=2 保留两条高分路径防止局部最优陷阱"
      badge="beam_search"
      sliders={[{ label: '集束宽度 Beam Size', value: beamW, min: 1, max: 3, step: 1, onChange: setBeamW }]}
      metrics={[
        { label: '贪心路径 (B=1)', value: 'A → C (-0.51 - 0.90 = -1.41)', tone: beamW === 1 ? 'amber' : 'slate' },
        { label: '全局最优路径 ✓', value: 'B → D (-0.69 - 0.10 = -0.79)', tone: beamW >= 2 ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveGraphCanvas
        height={180}
        nodes={[
          { id: 'bos', x: 60, y: 90, label: '<BOS>', tone: 'indigo', shape: 'pill', active: true },
          { id: 'a', x: 185, y: 45, label: 'A (p=0.6)', sublabel: 'log=-0.51', tone: 'amber', shape: 'pill', active: true },
          { id: 'b', x: 185, y: 135, label: 'B (p=0.5)', sublabel: 'log=-0.69', tone: beamW >= 2 ? 'emerald' : 'slate', shape: 'pill', active: beamW >= 2 },
          { id: 'c', x: 325, y: 45, label: 'C (score -1.41)', tone: beamW === 1 ? 'amber' : 'slate', shape: 'pill' },
          { id: 'd', x: 325, y: 135, label: 'D (score -0.79 ✓)', tone: beamW >= 2 ? 'emerald' : 'slate', shape: 'pill', active: beamW >= 2 },
        ]}
        edges={[
          { from: 'bos', to: 'a', tone: 'amber' },
          { from: 'bos', to: 'b', tone: beamW >= 2 ? 'emerald' : 'slate', dashed: beamW === 1 },
          { from: 'a', to: 'c', label: '0.4', tone: 'slate' },
          { from: 'b', to: 'd', label: '0.9', tone: beamW >= 2 ? 'emerald' : 'slate', animated: beamW >= 2 },
        ]}
      />
    </VisualizerFrame>
  );
};
