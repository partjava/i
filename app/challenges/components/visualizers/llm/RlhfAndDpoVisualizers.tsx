'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

// 章节：RLHF对齐

// L1: RLHF 奖励模型模拟器
export const RlhfRewardModelVisualizer: React.FC = () => {
  const [margin, setMargin] = useState(1.8);
  const sig = 1 / (1 + Math.exp(-margin));
  const loss = -Math.log(sig);
  return (
    <VisualizerFrame
      title="RLHF Bradley-Terry 成对偏好奖励模型 Loss"
      subtitle="最大化胜出回答与败出回答的奖励差值 r(x, y_w) - r(x, y_l)，Loss = -log σ(Δr)"
      badge="rlhf_reward"
      sliders={[{ label: '奖励差 Δr = r_win - r_lose', value: margin, min: -2, max: 4, step: 0.4, displayValue: margin.toFixed(1), onChange: setMargin }]}
      metrics={[
        { label: '模型偏好概率 σ(Δr)', value: `${(sig * 100).toFixed(1)}%`, tone: sig > 0.7 ? 'emerald' : 'rose' },
        { label: 'Pairwise Loss', value: loss.toFixed(3), tone: loss < 0.4 ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[-2, 4]}
        domainY={[0, 2.5]}
        xLabel="奖励间隔 Δr"
        yLabel="-log σ(Δr)"
        curves={[
          {
            id: 'bt',
            label: 'Pairwise Ranking Loss',
            tone: 'cyan',
            fillArea: true,
            points: Array.from({ length: 16 }, (_, i) => {
              const d = -2 + i * 0.4;
              return [d, -Math.log(1 / (1 + Math.exp(-d)))];
            }),
          },
        ]}
        markers={[{ x: margin, y: loss, label: `Loss=${loss.toFixed(2)}`, tone: 'emerald', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};

// L2: DPO 偏好优化
export const DpoAlignmentVisualizer: React.FC = () => {
  const [beta, setBeta] = useState(0.2);
  return (
    <VisualizerFrame
      title="DPO (Direct Preference Optimization) 免奖励模型直接对齐"
      subtitle="利用隐式奖励与参考模型 KL 约束 β，直接用交叉熵推高优选回答似然、压低劣质回答似然"
      badge="dpo_loss"
      sliders={[{ label: 'KL 偏离惩罚系数 β', value: beta, min: 0.05, max: 0.5, step: 0.05, displayValue: beta.toFixed(2), onChange: setBeta }]}
      metrics={[
        { label: '省去组件', value: '无需单独训练 Reward Model & PPO ✓', tone: 'emerald' },
        { label: '参考约束', value: `β=${beta.toFixed(2)} · log(π_θ / π_ref)`, tone: 'cyan' },
      ]}
    >
      <InteractiveGraphCanvas
        height={170}
        nodes={[
          { id: 'win', x: 75, y: 48, label: 'Chosen y_w', tone: 'emerald', shape: 'pill', active: true },
          { id: 'lose', x: 75, y: 125, label: 'Rejected y_l', tone: 'rose', shape: 'pill', active: true },
          { id: 'pol', x: 215, y: 85, label: 'Policy π_θ vs π_ref', sublabel: `β=${beta.toFixed(2)}`, tone: 'cyan', shape: 'pill', active: true },
          { id: 'out', x: 345, y: 85, label: 'L_DPO 梯度上升', tone: 'emerald', shape: 'pill', active: true },
        ]}
        edges={[
          { from: 'win', to: 'pol', label: '↑ 提高对数比', tone: 'emerald', animated: true },
          { from: 'lose', to: 'pol', label: '↓ 压低对数比', tone: 'rose', animated: true },
          { from: 'pol', to: 'out', tone: 'cyan', animated: true },
        ]}
      />
    </VisualizerFrame>
  );
};
