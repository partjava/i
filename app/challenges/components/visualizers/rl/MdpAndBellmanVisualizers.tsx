'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMatrixCanvas,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

// 章节：马尔可夫决策(MDP)

// L1: MDP 价值迭代求解器
export const MdpValueIterationVisualizer: React.FC = () => {
  const [iter, setIter] = useState(2);
  const gamma = 0.9;
  const vGoal = 10;
  const vMid = Number(((gamma * vGoal) * (iter / 3)).toFixed(1));
  const vStart = Number((gamma * vMid).toFixed(1));
  return (
    <VisualizerFrame
      title="MDP 网格价值迭代 (Value Iteration) 向后传播"
      subtitle="终点目标奖励 +10 沿折扣因子 γ=0.9 逐轮向周围状态格子扩散收敛"
      badge="value_iteration"
      sliders={[{ label: 'Bellman 迭代轮数 k', value: iter, min: 0, max: 3, step: 1, onChange: setIter }]}
      metrics={[
        { label: '起点价值 V(S0)', value: `${vStart}`, tone: 'cyan' },
        { label: '相邻终点态 V(S2)', value: `${vMid}`, tone: 'emerald' },
        { label: '目标态奖励 R(Goal)', value: `+${vGoal}`, tone: 'amber' },
      ]}
    >
      <InteractiveMatrixCanvas
        left={{
          title: `2×2 网格 V_${iter}(s)`,
          rows: [
            [{ value: vStart, highlight: 'cyan' }, { value: vMid, highlight: 'indigo' }],
            [{ value: vMid, highlight: 'indigo' }, { value: `+${vGoal}`, highlight: 'emerald' }],
          ],
        }}
      />
    </VisualizerFrame>
  );
};

// L2: Bellman 方程求解
export const BellmanEquationVisualizer: React.FC = () => {
  const [gamma, setGamma] = useState(0.9);
  const reward = 1.0;
  const nextBest = 8.0;
  const v = reward + gamma * nextBest;
  return (
    <VisualizerFrame
      title="Bellman 最优方程期望分解：V*(s) = R + γ · max V*(s')"
      subtitle="调节远视折扣因子 γ 观察未来长期收益在当前估值中的权重比重"
      badge="bellman_solver"
      sliders={[{ label: '折扣因子 γ (远视程度)', value: gamma, min: 0.1, max: 0.99, step: 0.05, displayValue: gamma.toFixed(2), onChange: setGamma }]}
      metrics={[
        { label: '即时奖励 R', value: `${reward.toFixed(1)}`, tone: 'cyan' },
        { label: '折扣未来 γ·V(s\')', value: (gamma * nextBest).toFixed(2), tone: 'indigo' },
        { label: '当前价值 V(s)', value: v.toFixed(2), tone: 'emerald' },
      ]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={[
          { id: 's', x: 75, y: 82, label: `State s (V=${v.toFixed(1)})`, tone: 'emerald', shape: 'pill', active: true },
          { id: 'r', x: 215, y: 45, label: `即时 R = ${reward}`, tone: 'cyan', shape: 'pill', active: true },
          { id: 'nx', x: 215, y: 122, label: `未来 max V(s') = ${nextBest}`, tone: 'indigo', shape: 'pill', active: true },
          { id: 'sum', x: 345, y: 82, label: `Sum=${v.toFixed(1)}`, tone: 'emerald', shape: 'pill', active: true },
        ]}
        edges={[
          { from: 's', to: 'r', tone: 'cyan', animated: true },
          { from: 's', to: 'nx', label: `×γ(${gamma.toFixed(2)})`, tone: 'indigo', animated: true },
          { from: 'r', to: 'sum', tone: 'emerald' },
          { from: 'nx', to: 'sum', tone: 'emerald' },
        ]}
      />
    </VisualizerFrame>
  );
};
