'use client';

import { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMatrixCanvas,
  InteractiveTimelineCanvas,
  type MatrixCell,
} from '../shared/VisualizerEngine';

// 章节：SVD奇异值分解

// L1: SVD 图像压缩模拟器
export function SvdCompressionViz() {
  const [k, setK] = useState(2);
  const sigmas = [14.2, 6.8, 2.4, 0.7];
  const totalEnergy = sigmas.reduce((s, v) => s + v * v, 0);
  const keptEnergy = sigmas.slice(0, k).reduce((s, v) => s + v * v, 0);
  const ratio = ((keptEnergy / totalEnergy) * 100).toFixed(1);

  const fullRows: MatrixCell[][] = [
    [12, 11, 4, 2],
    [10, 12, 3, 2],
    [3, 2, 8, 7],
    [2, 3, 7, 9],
  ].map((r) => r.map((v) => ({ value: v, intensity: v / 14 })));

  const reconGrid = [
    [12 - (4 - k) * 0.8, 11 - (4 - k) * 0.6, 4 - (4 - k) * 0.5, 2],
    [10 - (4 - k) * 0.7, 12 - (4 - k) * 0.8, 3, 2],
    [3, 2, 8 - (4 - k) * 0.9, 7 - (4 - k) * 0.6],
    [2, 3, 7 - (4 - k) * 0.5, 9 - (4 - k) * 0.8],
  ].map((r) => r.map((v) => ({ value: Math.max(0, v).toFixed(0), intensity: Math.max(0, v) / 14 })));

  return (
    <VisualizerFrame
      title="SVD 低秩截断图像压缩模拟器"
      subtitle="选择保留前 k 个最大奇异值重构矩阵 Aₖ = ∑ᵢ₌₁ᵏ σᵢ uᵢ vᵢᵀ，权衡压缩率与能量保真度。"
      badge="低秩近似重构"
      sliders={[
        { label: '保留奇异值个数 k', value: k, min: 1, max: 4, step: 1, displayValue: `k = ${k} / 4`, onChange: setK },
      ]}
      metrics={[
        { label: '保留奇异值', value: sigmas.slice(0, k).map((s) => s.toFixed(1)).join(', '), tone: 'cyan' },
        { label: '能量留存率', value: `${ratio}%`, tone: Number(ratio) > 90 ? 'emerald' : 'amber' },
        { label: '参数存储量', value: `${k * 9} vs 16`, tone: 'indigo' },
      ]}
    >
      <InteractiveMatrixCanvas
        left={{ title: '原始矩阵 A', rows: fullRows }}
        operatorLabel={`Rank-${k}`}
        right={{ title: `SVD 重构 A${k}`, rows: reconGrid }}
      />
    </VisualizerFrame>
  );
}

// L2: SVD 与矩阵秩
export function SvdRankViz() {
  const [tol, setTol] = useState(1.0);
  const sigmas = [9.5, 5.2, 1.8, 0.35, 0.04];
  const rank = sigmas.filter((s) => s > tol).length;

  return (
    <VisualizerFrame
      title="奇异值谱与数值有效秩 (Effective Rank)"
      subtitle="调节噪声截断阈值 tol，统计严格大于阈值的非零奇异值个数即为矩阵数值秩。"
      badge="奇异值衰减谱"
      sliders={[
        { label: '截断阈值 tol', value: tol, min: 0.1, max: 6.0, step: 0.2, displayValue: tol.toFixed(1), onChange: setTol },
      ]}
      metrics={[
        { label: '数值秩 Rank(A)', value: `${rank} / 5`, tone: 'emerald' },
        { label: '条件数 σ₁/σₙ', value: (sigmas[0] / sigmas[4]).toFixed(1), tone: 'amber' },
      ]}
    >
      <InteractiveTimelineCanvas
        maxTime={10.5}
        thresholds={[{ value: tol, label: `tol=${tol.toFixed(1)}`, tone: 'amber' }]}
        lanes={sigmas.map((s, idx) => ({
          name: `σ${idx + 1}`,
          blocks: [{ start: 0, end: s, label: s.toFixed(2), tone: s > tol ? 'cyan' : 'rose' }],
        }))}
      />
    </VisualizerFrame>
  );
}
