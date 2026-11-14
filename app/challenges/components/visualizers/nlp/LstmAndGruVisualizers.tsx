'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：LSTM/GRU序列建模

// L1: LSTM 序列情感分类器
export const LstmGatesSentimentVisualizer: React.FC = () => {
  const [forgetGate, setForgetGate] = useState(0.9);
  return (
    <VisualizerFrame
      title="LSTM 三重门控与细胞状态 C_t 长程记忆高速公路"
      subtitle="遗忘门 f_t ≈ 1 时细胞状态 C_t 沿加法主干近似恒等传导，缓解 RNN 梯度消失"
      badge="lstm_sentiment"
      sliders={[{ label: '遗忘门保留率 f_t', value: forgetGate, min: 0.1, max: 1.0, step: 0.1, displayValue: forgetGate.toFixed(1), onChange: setForgetGate }]}
      metrics={[
        { label: '细胞传送带保留', value: `${Math.round(forgetGate * 100)}% C_{t-1}`, tone: forgetGate >= 0.7 ? 'emerald' : 'amber' },
        { label: '句末情感判决', value: forgetGate >= 0.6 ? '保留前文“极其精彩” ✓' : '记忆已遗忘 ✗', tone: forgetGate >= 0.6 ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveGraphCanvas
        height={175}
        nodes={[
          { id: 'c_prev', x: 65, y: 45, label: 'C_{t-1}', tone: 'cyan', shape: 'pill', active: true },
          { id: 'f', x: 185, y: 45, label: `遗忘门 ×${forgetGate.toFixed(1)}`, tone: forgetGate >= 0.6 ? 'emerald' : 'rose', shape: 'pill', active: true },
          { id: 'i', x: 185, y: 125, label: '输入门 + 候选', tone: 'indigo', shape: 'pill' },
          { id: 'c_cur', x: 330, y: 45, label: 'C_t (新状态)', tone: 'emerald', shape: 'pill', active: true },
          { id: 'o', x: 330, y: 125, label: '输出门 h_t', tone: 'amber', shape: 'pill' },
        ]}
        edges={[
          { from: 'c_prev', to: 'f', tone: 'cyan', animated: true },
          { from: 'f', to: 'c_cur', tone: 'emerald', animated: true },
          { from: 'i', to: 'c_cur', label: '加法注入', tone: 'indigo', animated: true },
          { from: 'c_cur', to: 'o', tone: 'amber' },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: GRU 序列分类器
export const GruResetUpdateVisualizer: React.FC = () => {
  const [zGate, setZGate] = useState(0.75);
  return (
    <VisualizerFrame
      title="GRU 双门控插值更新：h_t = (1-z)·h_{t-1} + z·h̃_t"
      subtitle="将 LSTM 的遗忘门与输入门合二为一为单一更新门 z_t，参数减少 25% 依然捕捉长依赖"
      badge="gru_classifier"
      sliders={[{ label: '更新门激活 z_t', value: zGate, min: 0, max: 1, step: 0.05, displayValue: zGate.toFixed(2), onChange: setZGate }]}
      metrics={[
        { label: '保留旧状态权重 (1-z)', value: `${((1 - zGate) * 100).toFixed(0)}%`, tone: 'cyan' },
        { label: '写入新状态权重 z', value: `${(zGate * 100).toFixed(0)}%`, tone: 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'GRU 凸组合权重',
            slots: [
              { label: `${(1 - zGate).toFixed(2)} × h_{t-1}`, sublabel: '历史保留', tone: 'cyan' },
              { label: '+', sublabel: '和恒等于 1', tone: 'slate' },
              { label: `${zGate.toFixed(2)} × h̃_t`, sublabel: '新候选取入', tone: 'emerald' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};
