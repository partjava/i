'use client';

import { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
} from '../shared/VisualizerEngine';

// 章节：最大似然估计(MLE)

// L1: 最大似然估计参数求解器
export function GaussianMleViz() {
  const [candMu, setCandMu] = useState(1.2);
  const samples = [1.8, 2.1, 2.3, 1.9, 2.4];
  const sampleMean = samples.reduce((a, b) => a + b, 0) / samples.length; // 2.1
  const xs = Array.from({ length: 61 }, (_, i) => 0.5 + i * 0.05);
  const logLik = (m: number) => -samples.reduce((acc, x) => acc + (x - m) ** 2, 0);
  const pts: Array<[number, number]> = xs.map((m) => [m, logLik(m)]);

  return (
    <VisualizerFrame
      title="最大似然估计 (Gaussian MLE) 对数似然曲线"
      subtitle="拖动候选均值 μ，寻找使对数似然函数 ℓ(μ) 取得最大值的点，恰好落在样本均值 x̄ = 2.1。"
      badge="似然峰寻优"
      sliders={[
        { label: '候选参数 μ', value: candMu, min: 0.6, max: 3.4, step: 0.1, displayValue: candMu.toFixed(1), onChange: setCandMu },
      ]}
      metrics={[
        { label: '当前 ℓ(μ)', value: logLik(candMu).toFixed(2), tone: Math.abs(candMu - sampleMean) < 0.15 ? 'emerald' : 'amber' },
        { label: '解析 MLE μ*', value: `${sampleMean.toFixed(2)} (样本均值)`, tone: 'cyan' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0.5, 3.5]}
        domainY={[-12, 0.5]}
        xLabel="μ"
        yLabel="ℓ(μ)"
        vLines={[{ x: sampleMean, label: 'MLE μ*', tone: 'emerald' }]}
        curves={[{ id: 'll', points: pts, label: '对数似然 ℓ(μ)', tone: 'indigo', fillArea: true }]}
        markers={[{ x: candMu, y: logLik(candMu), label: `μ=${candMu.toFixed(1)}`, tone: 'cyan' }]}
      />
    </VisualizerFrame>
  );
}

// L2: MLE 参数估计
export function BernoulliMleViz() {
  const [heads, setHeads] = useState(7);
  const n = 10;
  const pHat = heads / n;
  const xs = Array.from({ length: 49 }, (_, i) => 0.04 + i * 0.019);
  const logLik = (p: number) => heads * Math.log(p) + (n - heads) * Math.log(1 - p);
  const pts: Array<[number, number]> = xs.map((p) => [p, logLik(p)]);

  return (
    <VisualizerFrame
      title="伯努利试验 MLE 参数估计 p̂ = k / n"
      subtitle="抛硬币 10 次观测到 k 次正面，对数似然曲线的最高点对应频率派直观估计 k/n。"
      badge="二项似然函数"
      sliders={[
        { label: '正面次数 k (共 10 次)', value: heads, min: 1, max: 9, step: 1, displayValue: `${heads} / 10`, onChange: setHeads },
      ]}
      metrics={[
        { label: 'MLE 估计 p̂', value: pHat.toFixed(2), tone: 'emerald' },
        { label: '最大对数似然 ℓ(p̂)', value: logLik(pHat).toFixed(2), tone: 'cyan' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0, 1]}
        domainY={[-22, -1]}
        xLabel="p"
        yLabel="ℓ(p)"
        vLines={[{ x: pHat, label: `p̂=${pHat.toFixed(1)}`, tone: 'emerald' }]}
        curves={[{ id: 'bll', points: pts, label: 'ℓ(p)', tone: 'cyan', fillArea: true }]}
        markers={[{ x: pHat, y: logLik(pHat), label: 'Max', tone: 'emerald' }]}
      />
    </VisualizerFrame>
  );
}
