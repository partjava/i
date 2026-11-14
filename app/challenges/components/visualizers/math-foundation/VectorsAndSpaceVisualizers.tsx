'use client';

import { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
} from '../shared/VisualizerEngine';

// 章节：向量与空间

// L1: 向量投影与正交分解器
export function VectorProjectionViz() {
  const [angleDeg, setAngleDeg] = useState(52);
  const [lenV, setLenV] = useState(3.6);

  const u: [number, number] = [3.2, 1.0];
  const radU = Math.atan2(u[1], u[0]);
  const radV = (angleDeg * Math.PI) / 180;
  const v: [number, number] = [lenV * Math.cos(radV), lenV * Math.sin(radV)];

  const uDotU = u[0] * u[0] + u[1] * u[1];
  const vDotU = v[0] * u[0] + v[1] * u[1];
  const scalar = vDotU / uDotU;
  const proj: [number, number] = [scalar * u[0], scalar * u[1]];
  const orth: [number, number] = [v[0] - proj[0], v[1] - proj[1]];
  const orthNorm = Math.hypot(orth[0], orth[1]);

  return (
    <VisualizerFrame
      title="向量投影与正交分解 (v = proj_u(v) + v⊥)"
      subtitle="调节向量 v 的倾角与模长，观察它向基准方向 u 的平行投影与正交垂直分量。"
      badge="2D 几何坐标系"
      sliders={[
        {
          label: '向量 v 角度 θv',
          value: angleDeg,
          min: -60,
          max: 165,
          step: 2,
          displayValue: `${angleDeg}°`,
          onChange: setAngleDeg,
        },
        {
          label: '向量 v 模长 ||v||',
          value: lenV,
          min: 1.5,
          max: 4.2,
          step: 0.1,
          displayValue: lenV.toFixed(1),
          onChange: setLenV,
        },
      ]}
      metrics={[
        { label: '点积 v · u', value: vDotU.toFixed(2), tone: vDotU >= 0 ? 'cyan' : 'rose' },
        { label: '投影长度 ||proj||', value: Math.hypot(proj[0], proj[1]).toFixed(2), tone: 'emerald' },
        { label: '正交分量 ||v⊥||', value: orthNorm.toFixed(2), tone: 'amber' },
      ]}
      caption="绿色投影 proj_u(v) 始终共线于 u，橙色垂线 v⊥ 与 u 保持严格 90° 正交（v⊥ · u = 0）。"
    >
      <InteractiveVectorCanvas
        domainX={[-4.5, 4.5]}
        domainY={[-3.5, 4.2]}
        xLabel="x₁"
        yLabel="x₂"
        angleArc={{ fromAngleRad: radU, toAngleRad: radV, radius: 0.9, label: 'Δθ', tone: 'indigo' }}
        segments={[
          { x1: -4, y1: (-4 * u[1]) / u[0], x2: 4, y2: (4 * u[1]) / u[0], tone: 'slate', dashed: true },
          { x1: proj[0], y1: proj[1], x2: v[0], y2: v[1], tone: 'amber', dashed: true, label: 'v⊥' },
        ]}
        vectors={[
          { id: 'u', to: u, label: 'u', tone: 'indigo', width: 2.2 },
          { id: 'v', to: v, label: 'v', tone: 'cyan', width: 2.6 },
          { id: 'proj', to: proj, label: 'proj', tone: 'emerald', width: 2.8 },
        ]}
        points={[{ x: proj[0], y: proj[1], tone: 'emerald', radius: 3.5 }]}
      />
    </VisualizerFrame>
  );
}

// L2: 柯西-施瓦茨不等式验证
export function CauchySchwarzViz() {
  const [thetaDeg, setThetaDeg] = useState(45);
  const normA = 3.0;
  const normB = 2.6;
  const rad = (thetaDeg * Math.PI) / 180;
  const a: [number, number] = [normA, 0];
  const b: [number, number] = [normB * Math.cos(rad), normB * Math.sin(rad)];
  const dotAbs = Math.abs(a[0] * b[0] + a[1] * b[1]);
  const prod = normA * normB;
  const gap = prod - dotAbs;
  const isEqual = gap < 0.08;

  return (
    <VisualizerFrame
      title="柯西–施瓦茨不等式 |a · b| ≤ ||a|| ||b||"
      subtitle="旋转向量 b 改变夹角 θ，验证当且仅当两向量共线（θ=0° 或 180°）时不等式取等。"
      badge="几何夹角取等"
      sliders={[
        {
          label: '向量夹角 θ',
          value: thetaDeg,
          min: 0,
          max: 180,
          step: 3,
          displayValue: `${thetaDeg}°`,
          onChange: setThetaDeg,
        },
      ]}
      metrics={[
        { label: '|a · b|', value: dotAbs.toFixed(2), tone: isEqual ? 'emerald' : 'cyan' },
        { label: '||a|| × ||b||', value: prod.toFixed(2), tone: 'indigo' },
        { label: 'cos(θ) 比例', value: `${Math.cos(rad).toFixed(2)}`, tone: isEqual ? 'emerald' : 'amber' },
      ]}
      caption={
        isEqual
          ? '夹角为 0° 或 180°（两向量完全共线），|a · b| = ||a|| ||b|| 精确取等！'
          : thetaDeg === 90
          ? '夹角为 90°（正交），点积绝对值跌至最小值 0。'
          : `余弦衰减因子 |cos ${thetaDeg}°| = ${Math.abs(Math.cos(rad)).toFixed(2)}，故内积严格小于模长之积。`
      }
    >
      <InteractiveVectorCanvas
        domainX={[-3.5, 3.8]}
        domainY={[-1.2, 3.4]}
        angleArc={{ fromAngleRad: 0, toAngleRad: rad, radius: 1.0, label: `${thetaDeg}°`, tone: 'amber' }}
        segments={[
          { x1: b[0], y1: 0, x2: b[0], y2: b[1], tone: 'slate', dashed: true },
          { x1: 0, y1: -0.35, x2: b[0], y2: -0.35, tone: 'emerald', width: 2.6, label: '|a·b|/||a||' },
        ]}
        vectors={[
          { id: 'a', to: a, label: 'a', tone: 'indigo', width: 2.4 },
          { id: 'b', to: b, label: 'b', tone: 'cyan', width: 2.6 },
        ]}
      />
    </VisualizerFrame>
  );
}
