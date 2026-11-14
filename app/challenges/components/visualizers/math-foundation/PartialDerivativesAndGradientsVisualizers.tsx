'use client';

import { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveCurveCanvas,
} from '../shared/VisualizerEngine';

// 章节：偏导数与梯度

// L1: 数值梯度检查器
export function NumericalGradViz() {
  const [h, setH] = useState(0.5);
  const x0 = 1.0;
  // f(x) = x^3, f'(1) = 3
  const exact = 3.0;
  const forward = ((x0 + h) ** 3 - x0 ** 3) / h;
  const central = ((x0 + h) ** 3 - (x0 - h) ** 3) / (2 * h);
  const xs = Array.from({ length: 45 }, (_, i) => 0 + i * 0.045);
  const pts: Array<[number, number]> = xs.map((x) => [x, x ** 3]);

  return (
    <VisualizerFrame
      title="数值梯度中心差分 vs 前向差分"
      subtitle="在 x=1 处对比步长 h 对斜率逼近精度的影响：中心差分误差为 O(h²)，显著优于前向差分 O(h)。"
      badge="差分切线逼近"
      sliders={[
        { label: '差分步长 h', value: h, min: 0.05, max: 0.8, step: 0.05, displayValue: h.toFixed(2), onChange: setH },
      ]}
      metrics={[
        { label: '解析真值 f′(1)', value: exact.toFixed(4), tone: 'emerald' },
        { label: '中心差分误差', value: Math.abs(central - exact).toFixed(4), tone: 'cyan' },
        { label: '前向差分误差', value: Math.abs(forward - exact).toFixed(4), tone: 'rose' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0, 2]}
        domainY={[0, 6]}
        xLabel="x"
        yLabel="x³"
        curves={[
          { id: 'fn', points: pts, label: 'f(x)=x³', tone: 'indigo' },
          { id: 'cen', points: [[x0 - h, (x0 - h) ** 3], [x0 + h, (x0 + h) ** 3]], label: '中心割线', tone: 'cyan', dashed: true },
          { id: 'fwd', points: [[x0, x0 ** 3], [x0 + h, (x0 + h) ** 3]], label: '前向割线', tone: 'rose', dashed: true },
        ]}
        markers={[{ x: x0, y: 1, label: 'x₀=1', tone: 'emerald' }]}
      />
    </VisualizerFrame>
  );
}

// L2: 多元函数梯度计算
export function MultiVarGradientViz() {
  const [px, setPx] = useState(1.6);
  const [py, setPy] = useState(1.2);
  // f(x,y) = x^2 + 2y^2 -> grad = (2x, 4y)
  const gx = 2 * px;
  const gy = 4 * py;
  const norm = Math.hypot(gx, gy);
  const scale = norm > 1e-4 ? Math.min(1.6, norm) / norm : 0;

  return (
    <VisualizerFrame
      title="多元函数等高线与梯度方向 ∇f(x, y)"
      subtitle="对于 f(x,y) = x² + 2y²，梯度向量 (2x, 4y) 永远垂直于当前等高椭圆并指向函数上升最快的方向。"
      badge="2D 梯度场"
      sliders={[
        { label: '位置 x', value: px, min: -2.2, max: 2.2, step: 0.2, displayValue: px.toFixed(1), onChange: setPx },
        { label: '位置 y', value: py, min: -1.6, max: 1.6, step: 0.2, displayValue: py.toFixed(1), onChange: setPy },
      ]}
      metrics={[
        { label: '梯度 ∇f', value: `(${gx.toFixed(1)}, ${gy.toFixed(1)})`, tone: 'cyan' },
        { label: '下降方向 -∇f', value: `(${(-gx).toFixed(1)}, ${(-gy).toFixed(1)})`, tone: 'emerald' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-3.5, 3.5]}
        domainY={[-2.6, 2.6]}
        circles={[
          { cx: 0, cy: 0, r: 1.0, tone: 'slate', dashed: true },
          { cx: 0, cy: 0, r: Math.hypot(px, py * 1.414), tone: 'indigo', dashed: true, label: '等值线' },
        ]}
        vectors={[
          { id: 'grad', from: [px, py], to: [px + gx * scale, py + gy * scale], label: '+∇f', tone: 'rose' },
          { id: 'desc', from: [px, py], to: [px - gx * scale, py - gy * scale], label: '-∇f', tone: 'emerald' },
        ]}
        points={[{ x: px, y: py, label: 'P', tone: 'cyan', radius: 5 }]}
      />
    </VisualizerFrame>
  );
}
