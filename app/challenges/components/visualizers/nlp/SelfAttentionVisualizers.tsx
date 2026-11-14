'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMatrixCanvas,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

// 章节：Self-Attention自注意力

// L1: Self-Attention 自注意力计算器
export const SelfAttentionHeatmapVisualizer: React.FC = () => {
  const [scaleD, setScaleD] = useState(8);
  const rawScores = [2.4, 0.8, 3.6];
  const scaled = rawScores.map((s) => s / Math.sqrt(scaleD));
  const exps = scaled.map((s) => Math.exp(s));
  const sum = exps.reduce((a, b) => a + b, 0);
  const weights = exps.map((e) => Number((e / sum).toFixed(2)));
  return (
    <VisualizerFrame
      title="Scaled Dot-Product Attention 权重热力图 softmax(QKᵀ / √d_k)"
      subtitle="除以 √d_k 抑制大维度点积方差爆炸，避免推入 Softmax 梯度为零的饱和区"
      badge="self_attention"
      sliders={[{ label: '注意力头维度 d_k', value: scaleD, min: 1, max: 64, step: 7, displayValue: `d_k=${scaleD} (÷${Math.sqrt(scaleD).toFixed(1)})`, onChange: setScaleD }]}
      metrics={[
        { label: '最大注意力焦点', value: `权重 ${Math.max(...weights).toFixed(2)}`, tone: 'emerald' },
        { label: '方差稳定因子', value: `√${scaleD} = ${Math.sqrt(scaleD).toFixed(2)}`, tone: 'cyan' },
      ]}
    >
      <InteractiveMatrixCanvas
        left={{
          title: 'Token 注意力权重矩阵',
          rowLabels: ['"猫"', '"追"', '"鼠"'],
          colLabels: ['"猫"', '"追"', '"鼠"'],
          rows: [
            [{ value: weights[0], intensity: weights[0], highlight: 'cyan' }, { value: weights[1], intensity: weights[1] }, { value: weights[2], intensity: weights[2], highlight: 'emerald' }],
            [{ value: 0.41, intensity: 0.41 }, { value: 0.35, intensity: 0.35 }, { value: 0.24, intensity: 0.24 }],
            [{ value: weights[2], intensity: weights[2], highlight: 'emerald' }, { value: 0.22, intensity: 0.22 }, { value: 0.15, intensity: 0.15 }],
          ],
        }}
      />
    </VisualizerFrame>
  );
};

// L2: 交叉注意力
export const CrossAttentionBridgeVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <VisualizerFrame
      title="Cross-Attention 跨模态 / 编解码器 Query-KV 桥接"
      subtitle="Decoder/文本出 Query 主动检索 Encoder/图像产生的 Key 与 Value 信息"
      badge="cross_attention"
      scenarios={[
        { label: '对齐阶段: Q_dec · K_encᵀ', summary: '译文当前待生成词 Query 计算与源句各词 Key 的相关性矩阵。' },
        { label: '值聚合: Weights · V_enc ✓', summary: '加权读取源句对应实体的语义 Value，融合生成准确上下文特征。' },
      ]}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: 'Query 来源', value: 'Decoder / Target 模态', tone: 'cyan' },
        { label: 'Key & Value 来源', value: 'Encoder / Source 模态', tone: 'emerald' },
      ]}
    >
      <InteractiveGraphCanvas
        height={175}
        nodes={[
          { id: 'dec', x: 75, y: 50, label: 'Decoder State', sublabel: '提供 Query', tone: 'cyan', shape: 'pill', active: true },
          { id: 'enc', x: 75, y: 128, label: 'Encoder Context', sublabel: '提供 Key, Value', tone: 'indigo', shape: 'pill', active: true },
          { id: 'attn', x: 225, y: 88, label: 'Cross-Attention', sublabel: 'softmax(Q·Kᵀ/√d)V', tone: 'emerald', shape: 'pill', active: step === 1 },
          { id: 'out', x: 345, y: 88, label: '语义对齐输出', tone: 'amber', shape: 'pill', active: step === 1 },
        ]}
        edges={[
          { from: 'dec', to: 'attn', label: 'Q', tone: 'cyan', animated: true },
          { from: 'enc', to: 'attn', label: 'K, V', tone: 'indigo', animated: true },
          { from: 'attn', to: 'out', tone: 'emerald', animated: step === 1 },
        ]}
      />
    </VisualizerFrame>
  );
};
