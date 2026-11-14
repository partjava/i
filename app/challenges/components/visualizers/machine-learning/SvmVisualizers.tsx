'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveCurveCanvas,
} from '../shared/VisualizerEngine';

// 标准化二维点集 (便于真实计算 Hinge Loss 与 Margin)
const POS_SAMPLES: Array<[number, number]> = [
  [1.2, 2.2],
  [2.3, 2.8],
  [2.9, 1.5],
  [3.4, 3.1],
];
const NEG_SAMPLES: Array<[number, number]> = [
  [-2.6, -1.8],
  [-1.9, -2.6],
  [-1.1, -0.7],
  [-0.3, -2.1],
];

export const SvmHingeVisualizer: React.FC = () => {
  const [slope, setSlope] = useState<number>(-0.9);
  const [bias, setBias] = useState<number>(0.2);
  const [marginHalfWidth, setMarginHalfWidth] = useState<number>(1.0); // 1 / ||w||

  // 法向量 w 使得直线斜率为 slope: slope*x - y + bias/scale = 0 => 归一化法向量
  // 我们把超平面表示为 w_x * x + w_y * y + b = 0, 其中 w_y = -1, w_x = slope
  const rawNorm = Math.hypot(slope, -1);
  const scale = 1 / (marginHalfWidth * rawNorm);
  const wx = slope * scale;
  const wy = -1 * scale;
  const bNorm = bias * scale;

  const evalScore = (x: number, y: number) => wx * x + wy * y + bNorm;
  const hinge = (x: number, y: number, label: 1 | -1) => Math.max(0, 1 - label * evalScore(x, y));

  // 超平面与边界点计算: y = slope * x + bias +/- offsetY
  const offsetY = marginHalfWidth * rawNorm;
  const xMin = -4.2;
  const xMax = 4.2;

  const allPoints = [
    ...POS_SAMPLES.map(([x, y], i) => {
      const h = hinge(x, y, 1);
      const isSV = Math.abs(evalScore(x, y) - 1) < 0.35 || h > 0;
      return {
        x,
        y,
        label: h > 0.05 ? `ξ=${h.toFixed(1)}` : i === 0 ? '+1' : undefined,
        tone: (h > 0.05 ? 'amber' : 'cyan') as 'amber' | 'cyan',
        ring: isSV,
        radius: 5.5,
      };
    }),
    ...NEG_SAMPLES.map(([x, y], i) => {
      const h = hinge(x, y, -1);
      const isSV = Math.abs(evalScore(x, y) + 1) < 0.35 || h > 0;
      return {
        x,
        y,
        label: h > 0.05 ? `ξ=${h.toFixed(1)}` : i === 0 ? '-1' : undefined,
        tone: (h > 0.05 ? 'amber' : 'rose') as 'amber' | 'rose',
        ring: isSV,
        radius: 5.5,
      };
    }),
  ];

  const totalHinge =
    POS_SAMPLES.reduce((acc, [x, y]) => acc + hinge(x, y, 1), 0) +
    NEG_SAMPLES.reduce((acc, [x, y]) => acc + hinge(x, y, -1), 0);

  const svCount = allPoints.filter((p) => p.ring).length;

  return (
    <VisualizerFrame
      title="线性 SVM 超平面、间隔与 Hinge Loss"
      subtitle="调节斜率、截距与间隔宽度，观察支持向量（虚线外环）与越界松弛惩罚 ξ = max(0, 1 - y(w·x+b))。"
      badge="2D 几何坐标系"
      sliders={[
        {
          label: '超平面斜率 (Slope)',
          value: slope,
          min: -2.0,
          max: 0.2,
          step: 0.1,
          displayValue: slope.toFixed(1),
          onChange: setSlope,
        },
        {
          label: '偏置截距 (Bias b)',
          value: bias,
          min: -1.6,
          max: 1.6,
          step: 0.1,
          displayValue: bias.toFixed(1),
          onChange: setBias,
        },
        {
          label: '几何半间隔 (1 / ||w||)',
          value: marginHalfWidth,
          min: 0.4,
          max: 2.0,
          step: 0.1,
          displayValue: marginHalfWidth.toFixed(1),
          onChange: setMarginHalfWidth,
        },
      ]}
      metrics={[
        { label: '总 Hinge Loss', value: totalHinge.toFixed(2), tone: totalHinge === 0 ? 'emerald' : 'amber' },
        { label: '正则项 ½||w||²', value: (0.5 * (wx * wx + wy * wy)).toFixed(2), tone: 'indigo' },
        { label: '边界/越界样本', value: `${svCount} 个`, tone: 'cyan' },
      ]}
      caption={
        totalHinge === 0
          ? '所有样本均位于各自间隔边界外侧（Hinge Loss = 0），达到完美线性可分！'
          : '带有黄色标注的点侵犯了安全间隔或被错分，正在产生非零松弛惩罚 ξ。'
      }
    >
      <InteractiveVectorCanvas
        domainX={[-4, 4]}
        domainY={[-3.5, 3.5]}
        xLabel="x₁"
        yLabel="x₂"
        segments={[
          {
            x1: xMin,
            y1: slope * xMin + bias,
            x2: xMax,
            y2: slope * xMax + bias,
            tone: 'indigo',
            width: 2.4,
            label: 'w·x+b=0',
          },
          {
            x1: xMin,
            y1: slope * xMin + bias + offsetY,
            x2: xMax,
            y2: slope * xMax + bias + offsetY,
            tone: 'cyan',
            dashed: true,
          },
          {
            x1: xMin,
            y1: slope * xMin + bias - offsetY,
            x2: xMax,
            y2: slope * xMax + bias - offsetY,
            tone: 'rose',
            dashed: true,
          },
        ]}
        points={allPoints}
      />
    </VisualizerFrame>
  );
};

export function SvmKernelVisualizer() {
  const [gamma, setGamma] = useState(0.8);
  const [position, setPosition] = useState(0.35);

  const negCenter = -1.2;
  const posCenter = 1.2;

  const negSim = Math.exp(-gamma * (position - negCenter) ** 2);
  const posSim = Math.exp(-gamma * (position - posCenter) ** 2);
  const dualScore = posSim - negSim;

  const xs = Array.from({ length: 81 }, (_, i) => -3 + i * 0.075);
  const posCurve: Array<[number, number]> = xs.map((x) => [x, Math.exp(-gamma * (x - posCenter) ** 2)]);
  const negCurve: Array<[number, number]> = xs.map((x) => [x, -Math.exp(-gamma * (x - negCenter) ** 2)]);
  const decisionCurve: Array<[number, number]> = xs.map((x) => [
    x,
    Math.exp(-gamma * (x - posCenter) ** 2) - Math.exp(-gamma * (x - negCenter) ** 2),
  ]);

  return (
    <VisualizerFrame
      title="RBF 核函数高斯响应与对偶得分"
      subtitle="移动待测点 x* 并调节核宽度 γ，观察高斯相似度曲线如何叠加形成非线性决策边界。"
      badge="RBF 高斯核响应"
      sliders={[
        {
          label: '待分类点位置 x*',
          value: position,
          min: -2.6,
          max: 2.6,
          step: 0.05,
          displayValue: position.toFixed(2),
          onChange: setPosition,
        },
        {
          label: '核带宽参数 γ',
          value: gamma,
          min: 0.2,
          max: 3.0,
          step: 0.1,
          displayValue: gamma.toFixed(1),
          onChange: setGamma,
        },
      ]}
      metrics={[
        { label: '正支持向量核相似度', value: posSim.toFixed(3), tone: 'cyan' },
        { label: '负支持向量核相似度', value: negSim.toFixed(3), tone: 'rose' },
        {
          label: '对偶判别得分 f(x*)',
          value: `${dualScore.toFixed(3)} (${dualScore >= 0 ? '+1 类' : '-1 类'})`,
          tone: dualScore >= 0 ? 'emerald' : 'amber',
        },
      ]}
      caption="γ 越大，每个支持向量的高斯钟形影响范围越窄；当 γ 过小时影响过于平坦，过大时则容易过拟合局部点。"
    >
      <InteractiveCurveCanvas
        domainX={[-3, 3]}
        domainY={[-1.15, 1.15]}
        xLabel="x"
        yLabel="f(x)"
        vLines={[{ x: position, label: `x*=${position.toFixed(2)}`, tone: 'amber' }]}
        curves={[
          { id: 'pos', points: posCurve, label: '+1 核贡献', tone: 'cyan', dashed: true, width: 1.5 },
          { id: 'neg', points: negCurve, label: '-1 核贡献', tone: 'rose', dashed: true, width: 1.5 },
          { id: 'sum', points: decisionCurve, label: '合成决策函数 f(x)', tone: 'indigo', fillArea: true, width: 2.5 },
        ]}
        markers={[
          { x: posCenter, y: 0, label: 'SV(+1)', tone: 'cyan', radius: 4.5 },
          { x: negCenter, y: 0, label: 'SV(-1)', tone: 'rose', radius: 4.5 },
          { x: position, y: dualScore, label: 'f(x*)', tone: 'amber', radius: 5.5 },
        ]}
      />
    </VisualizerFrame>
  );
}
