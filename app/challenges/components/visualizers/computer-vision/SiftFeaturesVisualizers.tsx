'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveMatrixCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：SIFT特征提取

// L1: SIFT 特征检测与匹配模拟器
export const SiftDogKeypointsVisualizer: React.FC = () => {
  const [octave, setOctave] = useState(1);
  const sigmas = ['σ = 1.0 (局部精细角)', 'σ = 1.6 (跨层 DoG 极值✓)', 'σ = 2.6 (大尺度轮廓)'];
  return (
    <VisualizerFrame
      title="SIFT 高斯差分金字塔 (DoG) 尺度不变极值检测"
      subtitle="对比邻近 3 层共 26 个 3D 邻域像素，定位兼具空间与尺度不变性的关键点"
      badge="sift_detect"
      scenarios={sigmas.map((s, i) => ({
        label: `Octave #${i + 1}`,
        summary: i === 1 ? '在当前层 DoG(x,y,σ) 击败上下层及周围共 26 个邻居，锁定真实尺度特征！' : s,
      }))}
      activeScenario={octave}
      onScenarioChange={setOctave}
      metrics={[
        { label: '尺度参数', value: sigmas[octave], tone: octave === 1 ? 'emerald' : 'cyan' },
        { label: '描述子维度', value: '4×4×8 = 128 维梯度直方图', tone: 'indigo' },
      ]}
    >
      <InteractiveMatrixCanvas
        operatorLabel="−"
        left={{
          title: `G(x,y,k·σ) 层${octave + 1}`,
          rows: [
            [{ value: 18 }, { value: 24 }, { value: 19 }],
            [{ value: 22 }, { value: 94, highlight: octave === 1 ? 'emerald' : 'cyan' }, { value: 25 }],
            [{ value: 17 }, { value: 20 }, { value: 18 }],
          ],
        }}
        right={{
          title: 'DoG 3D 极值核',
          rows: [
            [{ value: 2 }, { value: 5 }, { value: 3 }],
            [{ value: 4 }, { value: octave === 1 ? 68 : 21, highlight: octave === 1 ? 'emerald' : 'amber' }, { value: 5 }],
            [{ value: 1 }, { value: 3 }, { value: 2 }],
          ],
        }}
      />
    </VisualizerFrame>
  );
};

// L2: Harris 角点检测
export const HarrisCornerEigenVisualizer: React.FC = () => {
  const [l1, setL1] = useState(4.2);
  const [l2, setL2] = useState(3.8);
  const k = 0.04;
  const R = l1 * l2 - k * (l1 + l2) ** 2;
  const kind = R > 4 ? '角点 Corner ✓' : Math.abs(l1 - l2) > 2.5 ? '边缘 Edge' : '平坦区 Flat';
  const tone: VisualizerTone = R > 4 ? 'emerald' : Math.abs(l1 - l2) > 2.5 ? 'amber' : 'slate';
  return (
    <VisualizerFrame
      title="Harris 结构张量特征值 (λ₁, λ₂) 与角点响应 R"
      subtitle="λ₁, λ₂ 均大时任意方向窗口移动均有剧烈变化（角点）；仅单方向大时为边缘"
      badge="harris_corner"
      sliders={[
        { label: 'X方向梯度特征值 λ₁', value: l1, min: 0.2, max: 5.0, step: 0.4, displayValue: l1.toFixed(1), onChange: setL1 },
        { label: 'Y方向梯度特征值 λ₂', value: l2, min: 0.2, max: 5.0, step: 0.4, displayValue: l2.toFixed(1), onChange: setL2 },
      ]}
      metrics={[
        { label: '响应值 R = det - k·tr²', value: R.toFixed(2), tone },
        { label: '像素分类', value: kind, tone },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[0, 5.5]}
        domainY={[0, 5.5]}
        xLabel="λ₁"
        yLabel="λ₂"
        height={210}
        polygons={[
          { points: [[2.5, 2.5], [5.5, 2.5], [5.5, 5.5], [2.5, 5.5]], tone: 'emerald', label: '角点区 (λ₁,λ₂均大)' },
        ]}
        points={[{ x: l1, y: l2, tone, radius: 6, label: `(${l1.toFixed(1)}, ${l2.toFixed(1)})` }]}
      />
    </VisualizerFrame>
  );
};
