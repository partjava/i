'use client';

import { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
} from '../shared/VisualizerEngine';

// 章节：高斯/伯努利分布

// L1: 概率分布统计模拟器
export function GaussianPdfViz() {
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1.0);
  const xs = Array.from({ length: 81 }, (_, i) => -4 + i * 0.1);
  const pts: Array<[number, number]> = xs.map((x) => [
    x,
    Math.exp(-0.5 * ((x - mu) / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI)),
  ]);

  return (
    <VisualizerFrame
      title="高斯正态分布密度曲线 N(μ, σ²)"
      subtitle="调节均值 μ（平移中心）与标准差 σ（控制钟形展宽与峰值高度）。"
      badge="连续概率密度"
      sliders={[
        { label: '均值 μ', value: mu, min: -2, max: 2, step: 0.2, displayValue: mu.toFixed(1), onChange: setMu },
        { label: '标准差 σ', value: sigma, min: 0.5, max: 2.0, step: 0.1, displayValue: sigma.toFixed(1), onChange: setSigma },
      ]}
      metrics={[
        { label: '峰值密度 f(μ)', value: (1 / (sigma * Math.sqrt(2 * Math.PI))).toFixed(3), tone: 'cyan' },
        { label: '68.2% 置信区间', value: `[${(mu - sigma).toFixed(1)}, ${(mu + sigma).toFixed(1)}]`, tone: 'indigo' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[-4, 4]}
        domainY={[0, 0.85]}
        xLabel="x"
        yLabel="PDF"
        highlightBandX={{ x1: Math.max(-4, mu - sigma), x2: Math.min(4, mu + sigma), label: '±1σ (68.2%)', tone: 'indigo' }}
        vLines={[{ x: mu, label: `μ=${mu.toFixed(1)}`, tone: 'cyan' }]}
        curves={[{ id: 'pdf', points: pts, label: 'N(μ, σ²)', tone: 'cyan', fillArea: true }]}
      />
    </VisualizerFrame>
  );
}

// L2: 中心极限定理模拟
export function CltSimulationViz() {
  const [n, setN] = useState(10);
  const stdMean = 1 / Math.sqrt(n);
  const xs = Array.from({ length: 81 }, (_, i) => -2 + i * 0.05);
  const pts: Array<[number, number]> = xs.map((x) => {
    if (n === 1) return [x, Math.abs(x) <= 1 ? 0.5 : 0];
    return [x, Math.min(2.2, Math.exp(-0.5 * (x / stdMean) ** 2) / (stdMean * Math.sqrt(2 * Math.PI)))];
  });

  return (
    <VisualizerFrame
      title="中心极限定理 (CLT) 样本均值收敛"
      subtitle="无论原始分布（如 n=1 均匀矩形）形态如何，随着样本量 n 增大，样本均值分布迅速收敛为窄正态钟形曲线。"
      badge="极限分布收敛"
      sliders={[
        { label: '单次抽样容量 n', value: n, min: 1, max: 30, step: 1, displayValue: `n = ${n}`, onChange: setN },
      ]}
      metrics={[
        { label: '均值标准误 σ/√n', value: stdMean.toFixed(3), tone: 'emerald' },
        { label: '分布形态', value: n === 1 ? '原始均匀分布' : '正态逼近', tone: 'cyan' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[-2, 2]}
        domainY={[0, 2.3]}
        xLabel="X̄"
        yLabel="密度"
        curves={[{ id: 'clt', points: pts, label: `n=${n}`, tone: n === 1 ? 'amber' : 'emerald', fillArea: true }]}
      />
    </VisualizerFrame>
  );
}
