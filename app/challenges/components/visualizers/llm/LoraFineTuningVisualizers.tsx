'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMatrixCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：LoRA轻量化微调

// L1: LoRA 矩阵分解模拟器
export const LoraRankDecompositionVisualizer: React.FC = () => {
  const [rank, setRank] = useState(8);
  const d = 4096;
  const fullParams = d * d;
  const loraParams = 2 * d * rank;
  const ratio = ((loraParams / fullParams) * 100).toFixed(2);
  return (
    <VisualizerFrame
      title="LoRA 低秩旁路分解 W' = W₀ + (α/r) · B·A"
      subtitle="冻结全量预训练权重 W₀，仅训练 d×r 与 r×d 两块极瘦低秩旁路矩阵"
      badge="lora_decompose"
      sliders={[{ label: '旁路低秩 r (rank)', value: rank, min: 4, max: 64, step: 4, displayValue: `r=${rank}`, onChange: setRank }]}
      metrics={[
        { label: '原始矩阵参数 W₀', value: `${(fullParams / 1e6).toFixed(1)}M (冻结)`, tone: 'slate' },
        { label: '可训练 LoRA 参数', value: `${(loraParams / 1e3).toFixed(1)}K`, tone: 'emerald' },
        { label: '可训练参数占比', value: `${ratio}%`, tone: 'cyan' },
      ]}
    >
      <InteractiveMatrixCanvas
        operatorLabel="+"
        left={{
          title: '冻结 W₀ (4096×4096)',
          rows: [
            [{ value: 'Frozen', highlight: 'slate' }, { value: 'Frozen', highlight: 'slate' }],
            [{ value: 'Frozen', highlight: 'slate' }, { value: 'Frozen', highlight: 'slate' }],
          ],
        }}
        middle={{
          title: `B (d×${rank})`,
          rows: [
            [{ value: 'Δb₁', highlight: 'emerald' }],
            [{ value: 'Δb₂', highlight: 'emerald' }],
          ],
        }}
        right={{
          title: `A (${rank}×d)`,
          rows: [[{ value: 'Δa₁', highlight: 'cyan' }, { value: 'Δa₂', highlight: 'cyan' }]],
        }}
      />
    </VisualizerFrame>
  );
};

// L2: QLoRA 量化模拟
export const QloraNf4QuantizationVisualizer: React.FC = () => {
  const [bits, setBits] = useState(4);
  const b7Gb = ((7 * bits) / 8).toFixed(1);
  return (
    <VisualizerFrame
      title="QLoRA NF4 分位量化 + 双重量化显存压缩对比"
      subtitle="将冻结底座权重按正态分布分位量化为 4-bit NormalFloat，使 7B/70B 模型在单卡微调"
      badge="qlora_quant"
      sliders={[{ label: '底座量化比特数', value: bits, min: 4, max: 16, step: 4, displayValue: `${bits}-bit`, onChange: setBits }]}
      metrics={[
        { label: '7B 模型底座显存', value: `${b7Gb} GB`, tone: bits === 4 ? 'emerald' : bits === 8 ? 'cyan' : 'amber' },
        { label: 'LoRA 适配器精度', value: 'BF16 反量化高精度计算', tone: 'indigo' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '7B 模型微调显存解剖',
            slots: [
              { label: `${b7Gb} GB 底座`, sublabel: bits === 4 ? 'NF4 + 双量化' : `${bits}-bit 存储`, tone: bits === 4 ? 'emerald' : 'amber' },
              { label: '0.2 GB LoRA', sublabel: 'BF16 旁路', tone: 'cyan' },
              { label: '0.5 GB 激活值', sublabel: 'Paged Opt', tone: 'indigo' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};
