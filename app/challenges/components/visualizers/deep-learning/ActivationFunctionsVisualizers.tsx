'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
} from '../shared/VisualizerEngine';

// 章节：激活函数与梯度消失

// L1: 激活函数梯度分析器
export const ActivationGradientVisualizer: React.FC = () => {
  const [z, setZ] = useState(0);
  const sig = (x: number) => 1 / (1 + Math.exp(-x));
  const dSig = (x: number) => {
    const s = sig(x);
    return s * (1 - s);
  };
  const dTanh = (x: number) => 1 - Math.tanh(x) ** 2;
  return (
    <VisualizerFrame
      title="激活函数导数分析与深层梯度消失 (σ'(z) ≤ 0.25)"
      subtitle="Sigmoid 两端饱和区导数趋近于 0，5 层连乘后梯度衰减至 0.25⁵ ≈ 0.00097"
      badge="activation_grad"
      sliders={[{ label: '输入预激活值 z', value: z, min: -5, max: 5, step: 0.25, displayValue: z.toFixed(2), onChange: setZ }]}
      metrics={[
        { label: "Sigmoid'(z)", value: dSig(z).toFixed(4), tone: dSig(z) < 0.08 ? 'rose' : 'cyan' },
        { label: "Tanh'(z)", value: dTanh(z).toFixed(4), tone: 'indigo' },
        { label: "ReLU'(z>0)", value: z > 0 ? '1.0000 ✓' : '0.0000 (Dead)', tone: z > 0 ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[-5, 5]}
        domainY={[0, 1.1]}
        xLabel="z"
        yLabel="一阶导数 f'(z)"
        curves={[
          {
            id: 'dsig',
            label: "Sigmoid'(z) (max=0.25)",
            tone: 'rose',
            points: Array.from({ length: 41 }, (_, i) => {
              const x = -5 + i * 0.25;
              return [x, dSig(x)];
            }),
          },
          {
            id: 'dtanh',
            label: "Tanh'(z) (max=1.0)",
            tone: 'cyan',
            points: Array.from({ length: 41 }, (_, i) => {
              const x = -5 + i * 0.25;
              return [x, dTanh(x)];
            }),
          },
          {
            id: 'drelu',
            label: "ReLU'(z)",
            tone: 'emerald',
            points: [
              [-5, 0],
              [0, 0],
              [0.01, 1],
              [5, 1],
            ],
          },
        ]}
        markers={[{ x: z, y: dSig(z), label: `σ'=${dSig(z).toFixed(2)}`, tone: 'amber', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};

// L2: ReLU 变体对比
export const ReluVariantsVisualizer: React.FC = () => {
  const [alpha, setAlpha] = useState(0.15);
  const gelu = (x: number) => 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * x ** 3)));
  return (
    <VisualizerFrame
      title="ReLU / LeakyReLU / GELU 现代激活函数家族"
      subtitle="LeakyReLU 为负半轴保留小斜率 α 避免神经元死亡；GELU 在 0 处光滑可微（LLM 默认）"
      badge="relu_variants"
      sliders={[{ label: 'LeakyReLU 负轴斜率 α', value: alpha, min: 0.0, max: 0.35, step: 0.05, displayValue: alpha.toFixed(2), onChange: setAlpha }]}
      metrics={[
        { label: 'f(-2.0) LeakyReLU', value: (-2 * alpha).toFixed(2), tone: alpha > 0 ? 'cyan' : 'rose' },
        { label: 'f(-0.5) GELU', value: gelu(-0.5).toFixed(2), tone: 'emerald' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[-3, 3]}
        domainY={[-1, 3]}
        xLabel="z"
        yLabel="f(z)"
        curves={[
          {
            id: 'leaky',
            label: `LeakyReLU (α=${alpha.toFixed(2)})`,
            tone: 'cyan',
            points: [
              [-3, -3 * alpha],
              [0, 0],
              [3, 3],
            ],
          },
          {
            id: 'gelu',
            label: 'GELU (平滑高斯加权)',
            tone: 'emerald',
            points: Array.from({ length: 31 }, (_, i) => {
              const x = -3 + i * 0.2;
              return [x, gelu(x)];
            }),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
