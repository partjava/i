'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：Dropout正则化

// L1: Dropout 正则化实现
export const InvertedDropoutVisualizer: React.FC = () => {
  const [p, setP] = useState(0.5);
  const keepProb = 1 - p;
  const scale = 1 / Math.max(0.1, keepProb);
  const rawActs = [2.0, 1.0, 3.0, 2.0];
  const dropped = [true, p >= 0.4, true, p >= 0.6];
  return (
    <VisualizerFrame
      title="Inverted Dropout 训练随机失活与 1/(1-p) 尺度补偿"
      subtitle="存活神经元激活乘以 1/(1-p)，从而使测试时无需再做任何权重缩放"
      badge="dropout_forward"
      sliders={[{ label: '失活丢弃率 p', value: p, min: 0.1, max: 0.7, step: 0.1, displayValue: p.toFixed(1), onChange: setP }]}
      metrics={[
        { label: '保留概率 (1-p)', value: keepProb.toFixed(1), tone: 'cyan' },
        { label: 'Inverted 放大倍数', value: `${scale.toFixed(2)}x`, tone: 'amber' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '隐藏层激活',
            slots: rawActs.map((v, i) => {
              const isDropped = dropped[i] && i % 2 === 1;
              return {
                label: isDropped ? '0.00' : (v * scale).toFixed(2),
                sublabel: isDropped ? 'MASK=0 丢弃' : `原=${v} ×${scale.toFixed(1)}`,
                tone: isDropped ? 'rose' : 'emerald',
                pointer: isDropped ? 'DROP' : 'KEEP',
              };
            }),
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: Dropout 变体与 MC Dropout
export const McDropoutUncertaintyVisualizer: React.FC = () => {
  const [mode, setMode] = useState(1);
  const samples = [0.62, 0.88, 0.45, 0.79, 0.51];
  const mean = (samples.reduce((a, b) => a + b, 0) / samples.length).toFixed(2);
  return (
    <VisualizerFrame
      title="MC Dropout 推理多次采样估计预测不确定度"
      subtitle="推理阶段保持 Dropout 开启并运行 T 次前向，通过输出分布方差度量模型认知不确定性"
      badge="mc_dropout"
      scenarios={[
        { label: '标准 Eval (单次确定预测)', summary: '关闭 Dropout 只前向 1 次，无法感知输入是否属于域外未知样本。' },
        { label: 'MC Dropout (T=5 次随机前向)', summary: '开启不同失活掩码前向 5 次，方差 σ² 越大代表模型越不确定！' },
      ]}
      activeScenario={mode}
      onScenarioChange={setMode}
      metrics={[
        { label: '集成均值 E[ŷ]', value: mode ? mean : '0.65 (单点)', tone: 'emerald' },
        { label: '不确定度 σ', value: mode ? '0.16 (高方差预警)' : '未知 (N/A)', tone: mode ? 'amber' : 'slate' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: mode ? 'T=5 次推理分布' : '确定性单次',
            slots: (mode ? samples : [0.65]).map((s, i) => ({
              label: `${s.toFixed(2)}`,
              sublabel: mode ? `Pass #${i + 1}` : 'Eval Fixed',
              tone: s > 0.7 ? 'cyan' : s < 0.5 ? 'rose' : 'indigo',
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
