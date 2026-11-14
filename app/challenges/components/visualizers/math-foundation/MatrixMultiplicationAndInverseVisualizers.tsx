'use client';

import { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
} from '../shared/VisualizerEngine';

// 章节：矩阵乘法与逆

// L1: 线性方程组求解器
export function LinearSystemViz() {
  const [slope2, setSlope2] = useState(-0.8);
  // Eq1: y = 0.6x + 0.8 -> -0.6x + y = 0.8
  // Eq2: y = slope2 * x + 2.2
  const det = 1 * (-slope2) - (-0.6) * 1; // -slope2 + 0.6 => 0.6 - slope2
  const singular = Math.abs(det) < 0.08;
  const xSol = singular ? 0 : (2.2 - 0.8) / (0.6 - slope2);
  const ySol = singular ? 0 : 0.6 * xSol + 0.8;

  return (
    <VisualizerFrame
      title="线性方程组 Ax = b 几何求交"
      subtitle="调节第二条直线的斜率，观察两直线相交（唯一解）与平行重合（det(A)=0 不可逆）的临界态。"
      badge="2×2 线性交点"
      sliders={[
        {
          label: '方程 2 斜率 (-a₂₁/a₂₂)',
          value: slope2,
          min: -1.5,
          max: 1.2,
          step: 0.1,
          displayValue: slope2.toFixed(1),
          onChange: setSlope2,
        },
      ]}
      metrics={[
        { label: '系数矩阵行列式 det(A)', value: (0.6 - slope2).toFixed(2), tone: singular ? 'rose' : 'indigo' },
        { label: '求解状态', value: singular ? '奇异矩阵 (None)' : '唯一解', tone: singular ? 'rose' : 'emerald' },
        { label: '交点解 x*', value: singular ? '无唯一解' : `(${xSol.toFixed(2)}, ${ySol.toFixed(2)})`, tone: 'cyan' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-4, 4]}
        domainY={[-3, 4]}
        segments={[
          { x1: -4, y1: 0.6 * -4 + 0.8, x2: 4, y2: 0.6 * 4 + 0.8, tone: 'cyan', width: 2.2, label: 'L1' },
          { x1: -4, y1: slope2 * -4 + 2.2, x2: 4, y2: slope2 * 4 + 2.2, tone: singular ? 'rose' : 'indigo', width: 2.2, label: 'L2' },
        ]}
        points={!singular && Math.abs(xSol) <= 4 ? [{ x: xSol, y: ySol, label: 'x*', tone: 'emerald', ring: true, radius: 5.5 }] : []}
      />
    </VisualizerFrame>
  );
}

// L2: 矩阵行列式与逆矩阵
export function MatrixDetViz() {
  const [shear, setShear] = useState(0.8);
  const [scaleY, setScaleY] = useState(1.4);
  // A = [[1.5, shear], [0.4, scaleY]]
  const a11 = 1.5;
  const a21 = 0.4;
  const det = a11 * scaleY - shear * a21;
  const invertible = Math.abs(det) > 0.08;

  return (
    <VisualizerFrame
      title="线性变换行列式与面积缩放 |det(A)|"
      subtitle="矩阵 A 将单位正方形变换为平行四边形，面积缩放倍数等于 |det(A)|；面积坍缩为 0 时矩阵不可逆。"
      badge="空间面积变形"
      sliders={[
        { label: '剪切项 A₁₂', value: shear, min: -1.5, max: 3.5, step: 0.25, displayValue: shear.toFixed(2), onChange: setShear },
        { label: '纵轴缩放 A₂₂', value: scaleY, min: -0.5, max: 2.0, step: 0.1, displayValue: scaleY.toFixed(1), onChange: setScaleY },
      ]}
      metrics={[
        { label: 'det(A)', value: det.toFixed(2), tone: invertible ? 'cyan' : 'rose' },
        { label: '可逆性判定', value: invertible ? '可逆 (∃ A⁻¹)' : '奇异不可逆', tone: invertible ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-2, 5]}
        domainY={[-1.5, 3.5]}
        polygons={[
          { points: [[0, 0], [1, 0], [1, 1], [0, 1]], tone: 'slate', label: '单位面积=1' },
          {
            points: [
              [0, 0],
              [a11, a21],
              [a11 + shear, a21 + scaleY],
              [shear, scaleY],
            ],
            tone: invertible ? 'cyan' : 'rose',
            label: `面积=${Math.abs(det).toFixed(2)}`,
          },
        ]}
        vectors={[
          { id: 'c1', to: [a11, a21], label: 'Ae₁', tone: 'indigo', width: 2 },
          { id: 'c2', to: [shear, scaleY], label: 'Ae₂', tone: 'emerald', width: 2 },
        ]}
      />
    </VisualizerFrame>
  );
}
