'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveCurveCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：线性回归

// L1: 线性回归闭式求解器
export const LinearRegressionNormalVisualizer: React.FC = () => {
  const [w, setW] = useState(0.85);
  const [b, setB] = useState(0.3);
  const pts: Array<[number, number]> = [
    [-3, -2.1],
    [-1.5, -1.0],
    [0, 0.4],
    [1.5, 1.5],
    [3, 2.9],
  ];
  const mse = pts.reduce((acc, [x, y]) => acc + (w * x + b - y) ** 2, 0) / pts.length;
  return (
    <VisualizerFrame
      title="最小二乘闭式求解器与残差垂直投影"
      subtitle="调节斜率 w 与截距 b 观察预测直线与各样本误差线段的平方和收敛"
      badge="fit_normal_equation"
      sliders={[
        { label: '权重斜率 w', value: w, min: 0.2, max: 1.5, step: 0.05, displayValue: w.toFixed(2), onChange: setW },
        { label: '偏置截距 b', value: b, min: -1.0, max: 1.5, step: 0.1, displayValue: b.toFixed(1), onChange: setB },
      ]}
      metrics={[
        { label: '回归方程', value: `ŷ = ${w.toFixed(2)}x + ${b.toFixed(1)}`, tone: 'cyan' },
        { label: 'MSE 均方误差', value: mse.toFixed(3), tone: mse < 0.08 ? 'emerald' : 'amber' },
        { label: '最优解参考', value: 'w≈0.83, b≈0.34', tone: 'indigo' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-4, 4]}
        domainY={[-3.5, 4]}
        height={220}
        segments={[
          { x1: -4, y1: w * -4 + b, x2: 4, y2: w * 4 + b, tone: 'cyan', width: 2.5, label: '拟合线' },
          ...pts.map(([x, y]) => ({ x1: x, y1: y, x2: x, y2: w * x + b, tone: 'rose' as VisualizerTone, dashed: true, width: 1.4 })),
        ]}
        points={pts.map(([x, y], i) => ({ x, y, tone: 'emerald', radius: 4.5, label: i === 2 ? '(0,0.4)' : undefined }))}
      />
    </VisualizerFrame>
  );
};

// L2: 岭回归闭式解
export const RidgeRegressionVisualizer: React.FC = () => {
  const [alpha, setAlpha] = useState(1.0);
  const olsW = 2.4;
  const ridgeW = olsW / (1 + 0.35 * alpha);
  const normSq = ridgeW * ridgeW;
  const mse = 0.08 + 0.04 * (olsW - ridgeW) ** 2;
  const loss = mse + alpha * normSq * 0.15;
  return (
    <VisualizerFrame
      title="Ridge (L2) 正则化权重收缩路径"
      subtitle="随着 λ 增大，(XᵀX + λI)⁻¹ 对奇异方向施加岭惩罚，抑制过拟合权重膨胀"
      badge="fit_ridge"
      sliders={[
        { label: 'L2 正则系数 λ (alpha)', value: alpha, min: 0, max: 10, step: 0.5, displayValue: alpha.toFixed(1), onChange: setAlpha },
      ]}
      metrics={[
        { label: '收缩后斜率 w', value: ridgeW.toFixed(2), tone: 'cyan' },
        { label: '权重 L2 范数 ||w||²', value: normSq.toFixed(2), tone: 'indigo' },
        { label: '总目标 Loss', value: loss.toFixed(3), tone: 'emerald' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0, 10]}
        domainY={[0, 2.8]}
        xLabel="λ 正则强度"
        yLabel="参数/损失"
        curves={[
          {
            id: 'wpath',
            label: '||w(λ)|| 权重衰减',
            tone: 'cyan',
            points: Array.from({ length: 21 }, (_, i) => {
              const a = i * 0.5;
              return [a, olsW / (1 + 0.35 * a)];
            }),
          },
          {
            id: 'msepath',
            label: '拟合偏差 Bias',
            tone: 'amber',
            dashed: true,
            points: Array.from({ length: 21 }, (_, i) => {
              const a = i * 0.5;
              const rw = olsW / (1 + 0.35 * a);
              return [a, 0.25 + 0.35 * (olsW - rw) ** 2];
            }),
          },
        ]}
        vLines={[{ x: alpha, label: `λ=${alpha.toFixed(1)}`, tone: 'emerald' }]}
        markers={[{ x: alpha, y: ridgeW, label: `w=${ridgeW.toFixed(2)}`, tone: 'cyan', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};
