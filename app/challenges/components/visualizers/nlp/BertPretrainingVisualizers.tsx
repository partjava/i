'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：BERT预训练模型

// L1: BERT MLM 预训练模拟器
export const BertMlmSimulatorVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  const words = ['[CLS]', 'AI', '[MASK]', '改变', '世界', '[SEP]'];
  return (
    <VisualizerFrame
      title="BERT 双向掩码语言模型 (MLM) 80/10/10 策略"
      subtitle="同时读取左右双向上下文特征还原 [MASK] 位置的“正在”，只对被掩盖位点计算 CE 损失"
      badge="bert_mlm"
      scenarios={[
        { label: '遮蔽输入序列', summary: '15% Token 被选中用于预测，其中 80% 替换为 [MASK]。' },
        { label: '双向编码输出还原 ✓', summary: '融合左“AI”与右“改变世界”上下文，最高概率填回“正在”！' },
      ]}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: 'Mask 位置预测', value: step ? '"正在" (p=0.91)' : '[MASK]', tone: step ? 'emerald' : 'amber' },
        { label: 'Loss 计算位点', value: '仅位置 #2 [MASK]', tone: 'cyan' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'Token 序列',
            slots: words.map((w, i) => ({
              label: i === 2 && step ? '正在 ✓' : w,
              sublabel: i === 2 ? 'MLM 目标位' : '双向可见',
              tone: i === 2 ? (step ? 'emerald' : 'amber') : 'indigo',
              pointer: i === 2 ? 'PRED' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: BERT MLM 实现
export const BertMlmMaskRatioVisualizer: React.FC = () => {
  const [prob, setProb] = useState(0.7);
  const ce = -Math.log(prob);
  return (
    <VisualizerFrame
      title="BERT MLM 交叉熵梯度与 80/10/10 减噪防偏置"
      subtitle="10% 随机词替换 + 10% 保持原词，确保微调下游任务时不会因缺少 [MASK] 而产生分布偏移"
      badge="mlm_loss"
      sliders={[{ label: '真实词预测概率 p(y|[MASK])', value: prob, min: 0.1, max: 0.98, step: 0.05, displayValue: prob.toFixed(2), onChange: setProb }]}
      metrics={[
        { label: '掩码策略配比', value: '80% [MASK] / 10% 随机 / 10% 原词', tone: 'indigo' },
        { label: '单点 MLM Loss', value: ce.toFixed(3), tone: ce < 0.5 ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0.08, 1]}
        domainY={[0, 2.8]}
        xLabel="正确词预测概率 p"
        yLabel="-log(p) Loss"
        curves={[
          {
            id: 'mlm',
            label: 'MLM Cross-Entropy',
            tone: 'cyan',
            fillArea: true,
            points: Array.from({ length: 19 }, (_, i) => {
              const p = 0.08 + i * 0.05;
              return [p, -Math.log(p)];
            }),
          },
        ]}
        markers={[{ x: prob, y: ce, label: `Loss=${ce.toFixed(2)}`, tone: 'emerald', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};
