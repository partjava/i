'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：Logistic回归

// L1: Logistic 回归分类器
export const LogisticSigmoidVisualizer: React.FC = () => {
  const [zScale, setZScale] = useState(1.2);
  const [sampleZ, setSampleZ] = useState(1.0);
  const sig = (x: number) => 1 / (1 + Math.exp(-zScale * x));
  const p = sig(sampleZ);
  return (
    <VisualizerFrame
      title="Sigmoid 概率映射与对数几率决策边界"
      subtitle="调节权重尺度 k 决定 S 曲线陡峭度，p ≥ 0.5 划分为正类"
      badge="sigmoid"
      sliders={[
        { label: '尺度斜率 w', value: zScale, min: 0.4, max: 3.0, step: 0.2, displayValue: zScale.toFixed(1), onChange: setZScale },
        { label: '探测样本 z 值', value: sampleZ, min: -4, max: 4, step: 0.25, displayValue: sampleZ.toFixed(2), onChange: setSampleZ },
      ]}
      metrics={[
        { label: '预测概率 σ(wz)', value: `${(p * 100).toFixed(1)}%`, tone: p >= 0.5 ? 'emerald' : 'rose' },
        { label: '分类预测', value: p >= 0.5 ? '正类 (y=1)' : '负类 (y=0)', tone: p >= 0.5 ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[-5, 5]}
        domainY={[0, 1]}
        xLabel="线性响应 z"
        yLabel="概率 p"
        curves={[
          {
            id: 'sig',
            label: 'σ(w·z)',
            tone: 'cyan',
            fillArea: true,
            points: Array.from({ length: 41 }, (_, i) => {
              const x = -5 + i * 0.25;
              return [x, sig(x)];
            }),
          },
        ]}
        hLines={[{ y: 0.5, label: '阈值 p=0.5', tone: 'amber' }]}
        markers={[{ x: sampleZ, y: p, label: `p=${p.toFixed(2)}`, tone: p >= 0.5 ? 'emerald' : 'rose', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};

// L2: Softmax 多分类器
export const SoftmaxTemperatureVisualizer: React.FC = () => {
  const [temp, setTemp] = useState(1.0);
  const logits = [2.6, 1.4, 0.2];
  const exps = logits.map((v) => Math.exp(v / temp));
  const sum = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map((e) => e / sum);
  return (
    <VisualizerFrame
      title="Softmax 多分类归一化与温度系数 T"
      subtitle="减去 max(logits) 防数值上溢，温度 T 越低分布越尖锐（winner-take-all）"
      badge="softmax"
      sliders={[
        { label: '温度系数 T', value: temp, min: 0.3, max: 3.0, step: 0.1, displayValue: temp.toFixed(1), onChange: setTemp },
      ]}
      metrics={[
        { label: 'Class A (z=2.6)', value: `${(probs[0] * 100).toFixed(1)}%`, tone: 'emerald' },
        { label: 'Class B (z=1.4)', value: `${(probs[1] * 100).toFixed(1)}%`, tone: 'cyan' },
        { label: 'Class C (z=0.2)', value: `${(probs[2] * 100).toFixed(1)}%`, tone: 'indigo' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'Logits',
            slots: logits.map((z, i) => ({ label: `z=${z}`, sublabel: `Class ${['A', 'B', 'C'][i]}`, tone: 'slate' })),
          },
          {
            name: `Softmax (T=${temp.toFixed(1)})`,
            slots: probs.map((p, i) => ({
              label: `${(p * 100).toFixed(1)}%`,
              sublabel: i === 0 ? 'Argmax 胜出' : '次优概率',
              tone: i === 0 ? 'emerald' : i === 1 ? 'cyan' : 'indigo',
              pointer: i === 0 ? 'TOP' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
