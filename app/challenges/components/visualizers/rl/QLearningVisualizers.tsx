'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：Q-Learning

// L1: Q-Learning 离线学习器
export const QLearningOffPolicyVisualizer: React.FC = () => {
  const [alpha, setAlpha] = useState(0.5);
  const oldQ = 2.0;
  const tdTarget = 1.0 + 0.9 * 8.0; // 8.2
  const newQ = oldQ + alpha * (tdTarget - oldQ);
  return (
    <VisualizerFrame
      title="Q-Learning 离策略 (Off-Policy) TD 误差单步更新"
      subtitle="无论下一刻实际探索什么动作，目标始终乐观取 max_a' Q(s', a') 进行更新"
      badge="q_learning"
      sliders={[{ label: '学习步长 α', value: alpha, min: 0.1, max: 1.0, step: 0.1, displayValue: alpha.toFixed(1), onChange: setAlpha }]}
      metrics={[
        { label: 'TD 目标 R + γ·maxQ', value: tdTarget.toFixed(1), tone: 'amber' },
        { label: 'TD Error δ', value: (tdTarget - oldQ).toFixed(1), tone: 'cyan' },
        { label: '更新后 Q(s,a)', value: newQ.toFixed(2), tone: 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'TD 备份链',
            slots: [
              { label: `旧 Q=${oldQ.toFixed(1)}`, sublabel: '估计值', tone: 'slate' },
              { label: `目标=${tdTarget.toFixed(1)}`, sublabel: '贪心 max_a', tone: 'amber' },
              { label: `新 Q=${newQ.toFixed(2)}`, sublabel: `α=${alpha.toFixed(1)}`, tone: 'emerald', pointer: 'UPDATED' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: ε 贪心与衰减策略
export const EpsilonGreedyDecayVisualizer: React.FC = () => {
  const [decay, setDecay] = useState(0.92);
  const epsAt = (ep: number) => Math.max(0.05, 1.0 * Math.pow(decay, ep));
  return (
    <VisualizerFrame
      title="ε-Greedy 探索与利用平衡及指数退火衰减"
      subtitle="初期高 ε 广泛摸索环境状态空间，随训练轮次收敛到低 ε 稳定利用最优策略"
      badge="epsilon_decay"
      sliders={[{ label: '每轮衰减率 decay', value: decay, min: 0.75, max: 0.98, step: 0.03, displayValue: decay.toFixed(2), onChange: setDecay }]}
      metrics={[
        { label: '第 10 轮探索率 ε', value: `${(epsAt(10) * 100).toFixed(1)}%`, tone: 'cyan' },
        { label: '第 30 轮探索率 ε', value: `${(epsAt(30) * 100).toFixed(1)}%`, tone: 'emerald' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0, 40]}
        domainY={[0, 1.05]}
        xLabel="Episode 轮次"
        yLabel="随机探索率 ε"
        curves={[
          {
            id: 'eps',
            label: `ε(t) (decay=${decay.toFixed(2)})`,
            tone: 'cyan',
            fillArea: true,
            points: Array.from({ length: 21 }, (_, i) => [i * 2, epsAt(i * 2)]),
          },
        ]}
        hLines={[{ y: 0.05, label: '底线 ε_min=0.05', tone: 'amber' }]}
      />
    </VisualizerFrame>
  );
};
