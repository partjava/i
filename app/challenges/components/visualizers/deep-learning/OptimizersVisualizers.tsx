'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveCurveCanvas,
} from '../shared/VisualizerEngine';

// 章节：SGD与Adam优化器

// L1: SGD/Adam 优化器实现
export const SgdVsAdamVisualizer: React.FC = () => {
  const [opt, setOpt] = useState(1);
  const sgdTrace: Array<[number, number]> = [
    [-2.6, 2.2],
    [-2.0, -1.7],
    [-1.4, 1.3],
    [-0.9, -0.9],
    [-0.5, 0.5],
  ];
  const adamTrace: Array<[number, number]> = [
    [-2.6, 2.2],
    [-1.7, 1.0],
    [-0.9, 0.3],
    [-0.3, 0.05],
    [0, 0],
  ];
  const trace = opt === 0 ? sgdTrace : adamTrace;
  return (
    <VisualizerFrame
      title="SGD vs Adam 自适应矩估计椭圆谷地收敛轨迹"
      subtitle="峡谷函数在纵轴曲率极大；纯 SGD 剧烈之字震荡，Adam 用 √v 缩放各维步长直奔极小点"
      badge="Optimizer"
      scenarios={[
        { label: 'Vanilla SGD (剧烈震荡)', summary: '固定标量学习率导致垂直方向来回反弹，水平推进缓慢。' },
        { label: 'Adam (m_t / √v_t 自适应)', summary: '一阶动量稳方向、二阶均方根自适应归一化各轴梯度，5步抵达最优 (0,0) ✓。' },
      ]}
      activeScenario={opt}
      onScenarioChange={setOpt}
      metrics={[
        { label: '第 5 步终点位置', value: `(${trace[4][0]}, ${trace[4][1]})`, tone: opt === 1 ? 'emerald' : 'amber' },
        { label: '震荡抑制', value: opt === 1 ? '自适应缩放 ✓' : '高曲率震荡', tone: opt === 1 ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-3.2, 1.2]}
        domainY={[-2.5, 2.6]}
        height={215}
        circles={[{ cx: 0, cy: 0, r: 0.35, tone: 'emerald', label: '极小值 (0,0)' }]}
        segments={trace.slice(0, -1).map((p, i) => ({
          x1: p[0],
          y1: p[1],
          x2: trace[i + 1][0],
          y2: trace[i + 1][1],
          tone: opt === 1 ? 'emerald' : 'rose',
          width: 2.2,
        }))}
        points={trace.map((p, i) => ({
          x: p[0],
          y: p[1],
          tone: i === 4 ? 'emerald' : opt === 1 ? 'cyan' : 'rose',
          radius: i === 4 ? 6 : 4,
        }))}
      />
    </VisualizerFrame>
  );
};

// L2: SGD 动量对比实验
export const MomentumRosenbrockVisualizer: React.FC = () => {
  const [beta, setBeta] = useState(0.9);
  const effectiveSpeed = (1 / (1 - beta)).toFixed(1);
  return (
    <VisualizerFrame
      title="SGD Momentum 指数加权速度积累 (v = βv - η∇L)"
      subtitle="在一致梯度方向加速冲出平坦区，同时抵消高频上下抖动分量"
      badge="rosenbrock_momentum"
      sliders={[{ label: '动量衰减系数 β', value: beta, min: 0.0, max: 0.95, step: 0.05, displayValue: beta.toFixed(2), onChange: setBeta }]}
      metrics={[
        { label: '稳态加速倍率 1/(1-β)', value: `${effectiveSpeed}x`, tone: beta >= 0.8 ? 'emerald' : 'cyan' },
        { label: '历史梯度窗口记忆', value: `约 ${effectiveSpeed} 步`, tone: 'indigo' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0, 12]}
        domainY={[0, 10]}
        xLabel="优化步数"
        yLabel="沿峡谷推进速度"
        curves={[
          {
            id: 'vel',
            label: `动量速度响应 (β=${beta.toFixed(2)})`,
            tone: 'cyan',
            fillArea: true,
            points: Array.from({ length: 13 }, (_, t) => [t, (1 - beta ** t) / Math.max(0.05, 1 - beta)]),
          },
        ]}
        markers={[{ x: 12, y: (1 - beta ** 12) / Math.max(0.05, 1 - beta), label: `${effectiveSpeed}x`, tone: 'emerald', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};
