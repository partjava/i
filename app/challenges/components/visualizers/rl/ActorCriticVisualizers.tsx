'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

// 章节：AC双网络架构

// L1: Actor-Critic 双网络
export const ActorCriticDualVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <VisualizerFrame
      title="Actor-Critic 演员（策略 π_θ）与评论家（价值 V_φ）双头协同"
      subtitle="Critic 计算优势 TD 误差 A_t = R + γV(s') - V(s) 作为低方差信号指导 Actor 强化或抑制动作"
      badge="actor_critic"
      scenarios={[
        { label: '1. 前向采样与估值', summary: 'Actor 选出动作 a_t；Critic 评估状态基线价值 V(s_t)=4.2。' },
        { label: '2. TD 优势梯度回传 ✓', summary: '收到超预期好结果 (A_t = +1.8 > 0)，Actor 提高该动作对数概率；Critic 同步缩小误差。' },
      ]}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: '优势信号 A_t', value: '+1.8 (优于平均预期 ✓)', tone: 'emerald' },
        { label: '联合架构', value: 'Policy + Value 双网络', tone: 'cyan' },
      ]}
    >
      <InteractiveGraphCanvas
        height={175}
        nodes={[
          { id: 'state', x: 65, y: 88, label: 'State s_t', tone: 'indigo', shape: 'pill', active: true },
          { id: 'act', x: 195, y: 45, label: 'Actor π_θ(a|s)', tone: 'cyan', shape: 'pill', active: true },
          { id: 'cri', x: 195, y: 128, label: 'Critic V_φ(s)', tone: 'amber', shape: 'pill', active: true },
          { id: 'adv', x: 335, y: 88, label: 'Advantage A_t=+1.8', tone: 'emerald', shape: 'pill', active: step === 1 },
        ]}
        edges={[
          { from: 'state', to: 'act', tone: 'cyan', animated: true },
          { from: 'state', to: 'cri', tone: 'amber', animated: true },
          { from: 'cri', to: 'adv', label: 'δ=r+γV\'-V', tone: 'amber', animated: step === 1 },
          { from: 'adv', to: 'act', label: 'A·∇logπ', tone: 'emerald', animated: step === 1 },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 连续动作 Actor-Critic
export const ContinuousActorGaussianVisualizer: React.FC = () => {
  const [mu, setMu] = useState(0.5);
  const [sigma, setSigma] = useState(0.7);
  const gaussian = (x: number) => Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma)) / (sigma * Math.sqrt(2 * Math.PI));
  return (
    <VisualizerFrame
      title="连续动作空间高斯策略输出 π_θ(a|s) ~ N(μ, σ²)"
      subtitle="机械臂力矩/舵机转角无法枚举 Softmax，由 Actor 直接回归均值 μ 与探索方差 σ"
      badge="continuous_ac"
      sliders={[
        { label: '均值动作中心 μ', value: mu, min: -1.5, max: 1.5, step: 0.25, displayValue: mu.toFixed(2), onChange: setMu },
        { label: '探索标准差 σ', value: sigma, min: 0.3, max: 1.4, step: 0.1, displayValue: sigma.toFixed(1), onChange: setSigma },
      ]}
      metrics={[
        { label: '确定性均值控制', value: `a = ${mu.toFixed(2)}`, tone: 'cyan' },
        { label: '高斯峰值密度', value: gaussian(mu).toFixed(2), tone: 'emerald' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[-3, 3]}
        domainY={[0, 1.5]}
        xLabel="连续动作 a (力矩/转角)"
        yLabel="概率密度 π(a|s)"
        curves={[
          {
            id: 'gauss',
            label: `N(${mu.toFixed(1)}, ${sigma.toFixed(1)}²)`,
            tone: 'emerald',
            fillArea: true,
            points: Array.from({ length: 41 }, (_, i) => {
              const x = -3 + i * 0.15;
              return [x, gaussian(x)];
            }),
          },
        ]}
        markers={[{ x: mu, y: gaussian(mu), label: `μ=${mu.toFixed(1)}`, tone: 'cyan', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};
