'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMatrixCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：SARSA

// L1: SARSA On-Policy 控制器
export const SarsaCliffWalkVisualizer: React.FC = () => {
  const [algo, setAlgo] = useState(0);
  return (
    <VisualizerFrame
      title="SARSA (On-Policy 安全绕路) vs Q-Learning (贴悬崖最优)"
      subtitle="SARSA 把“探索跌落悬崖的惩罚”也纳入 Q(s', a') 评价，因此自动学会远离危险边界"
      badge="sarsa_cliff"
      scenarios={[
        { label: 'SARSA (On-Policy 安全高绕)', summary: '沿上方安全格子行进，虽然多两步，但探索跌落悬崖风险为零！' },
        { label: 'Q-Learning (Off-Policy 紧贴崖边)', summary: '按最优贪心策略学出紧贴悬崖最短路，但训练带 ε 探索时常失足掉崖。' },
      ]}
      activeScenario={algo}
      onScenarioChange={setAlgo}
      metrics={[
        { label: '选择轨迹', value: algo === 0 ? '安全走廊路线 ✓' : '贴近悬崖最短路', tone: algo === 0 ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveMatrixCanvas
        left={{
          title: algo === 0 ? 'SARSA 安全路径' : 'Q-Learning 崖边路径',
          rows: [
            [
              { value: '↑', highlight: algo === 0 ? 'emerald' : 'none' },
              { value: '→', highlight: algo === 0 ? 'emerald' : 'none' },
              { value: '→', highlight: algo === 0 ? 'emerald' : 'none' },
              { value: '↓', highlight: algo === 0 ? 'emerald' : 'none' },
            ],
            [
              { value: 'Start', highlight: 'cyan' },
              { value: algo === 1 ? '→' : '·', highlight: algo === 1 ? 'amber' : 'none' },
              { value: algo === 1 ? '→' : '·', highlight: algo === 1 ? 'amber' : 'none' },
              { value: 'Goal', highlight: 'emerald' },
            ],
            [
              { value: 'SAFE', highlight: 'none' },
              { value: 'CLIFF -100', highlight: 'rose' },
              { value: 'CLIFF -100', highlight: 'rose' },
              { value: 'Goal', highlight: 'none' },
            ],
          ],
        }}
      />
    </VisualizerFrame>
  );
};

// L2: SARSA(λ) 资格迹
export const SarsaLambdaTraceVisualizer: React.FC = () => {
  const [lambda, setLambda] = useState(0.7);
  const credits = [0, 1, 2, 3].map((k) => Math.pow(lambda, k));
  return (
    <VisualizerFrame
      title="SARSA(λ) 资格迹 (Eligibility Traces) 跨步信用分配"
      subtitle="获得终点奖励后按 λ^k 把功劳指数回溯分摊给刚刚走过的一串历史状态-动作对"
      badge="sarsa_lambda"
      sliders={[{ label: '迹衰减系数 λ', value: lambda, min: 0.0, max: 0.95, step: 0.1, displayValue: lambda.toFixed(2), onChange: setLambda }]}
      metrics={[
        { label: '当前步 (t-0) 分配权重', value: '1.00', tone: 'emerald' },
        { label: '3 步前 (t-3) 分配权重', value: credits[3].toFixed(2), tone: 'cyan' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '历史状态资格迹 E(s,a)',
            slots: [...credits].reverse().map((c, idx) => ({
              label: `λ^${3 - idx} = ${c.toFixed(2)}`,
              sublabel: `第 t-${3 - idx} 步`,
              tone: idx === 3 ? 'emerald' : c > 0.3 ? 'cyan' : 'slate',
              pointer: idx === 3 ? 'REWARD' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
