'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：CoT链式思维

// L1: Chain-of-Thought 推理器
export const CotReasoningVisualizer: React.FC = () => {
  const [step, setStep] = useState(2);
  const steps = ['已知 A=12', '推导 B = 2×A = 24', '计算 A + B = 36 ✓'];
  return (
    <VisualizerFrame
      title="Chain-of-Thought (CoT) 显式中间推导状态链"
      subtitle="引导模型把多跳算术拆分为逐步可见 Token 推导，显著降低单步心算幻觉率"
      badge="cot_reason"
      scenarios={steps.map((s, i) => ({ label: `推理步 ${i + 1}`, summary: s }))}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: '当前推理进度', value: `${step + 1} / 3 步`, tone: 'cyan' },
        { label: '最终置信结论', value: step === 2 ? '36 ✓' : '推导中…', tone: step === 2 ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={steps.map((s, i) => ({
          id: `c${i}`,
          x: 70 + i * 130,
          y: 82,
          label: `Step ${i + 1}`,
          sublabel: s,
          tone: i <= step ? (i === 2 ? 'emerald' : 'cyan') : 'slate',
          shape: 'pill',
          active: i === step,
        }))}
        edges={[0, 1].map((i) => ({ from: `c${i}`, to: `c${i + 1}`, tone: i < step ? 'emerald' : 'slate', animated: i < step }))}
      />
    </VisualizerFrame>
  );
};

// L2: CoT 验证器
export const CotSelfConsistencyVisualizer: React.FC = () => {
  const [samples, setSamples] = useState(5);
  const paths = ['答案: 36', '答案: 36', '答案: 42', '答案: 36', '答案: 36'].slice(0, samples);
  const majority = paths.filter((p) => p.includes('36')).length;
  return (
    <VisualizerFrame
      title="CoT 验证与 Self-Consistency 多路径多数投票"
      subtitle="高温采样生成 N 条独立推理轨迹，校验格式前提并取多数一致结果淘汰偶发算错路径"
      badge="cot_verify"
      sliders={[{ label: '独立推理路径采样数 N', value: samples, min: 3, max: 5, step: 1, onChange: setSamples }]}
      metrics={[
        { label: '答案 36 得票率', value: `${majority} / ${samples}`, tone: 'emerald' },
        { label: '幻觉路径拦截', value: `${samples - majority} 条算错`, tone: 'rose' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '多路 CoT 轨迹',
            slots: paths.map((p, i) => ({
              label: p,
              sublabel: p.includes('36') ? '校验通过' : '算术错觉',
              tone: p.includes('36') ? 'emerald' : 'rose',
              pointer: i === 0 ? 'VOTE' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
