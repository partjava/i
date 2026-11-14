'use client';

import { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
} from '../shared/VisualizerEngine';

// 章节：泰勒展开式

// L1: 泰勒展开近似计算器
export function TaylorExpViz() {
  const [order, setOrder] = useState(2);
  const xs = Array.from({ length: 61 }, (_, i) => -2 + i * 0.066);
  const truePts: Array<[number, number]> = xs.map((x) => [x, Math.exp(x)]);
  const approx = (x: number, n: number) => {
    let sum = 0;
    let fact = 1;
    for (let k = 0; k <= n; k++) {
      if (k > 0) fact *= k;
      sum += x ** k / fact;
    }
    return sum;
  };
  const approxPts: Array<[number, number]> = xs.map((x) => [x, approx(x, order)]);
  const errAt15 = Math.abs(Math.exp(1.5) - approx(1.5, order));

  return (
    <VisualizerFrame
      title="泰勒展开高阶多项式逼近 (eˣ 在 x=0 展开)"
      subtitle="提高展开阶数 n，观察多项式拟合曲线在更大区间内贴近真实指数函数 eˣ。"
      badge="泰勒多项式拟合"
      sliders={[
        { label: '展开最高阶数 Order', value: order, min: 0, max: 5, step: 1, displayValue: `n = ${order} 阶`, onChange: setOrder },
      ]}
      metrics={[
        { label: '在 x=1.5 处的误差', value: errAt15.toFixed(4), tone: errAt15 < 0.1 ? 'emerald' : 'amber' },
        { label: '二阶常见近似', value: '1 + x + x²/2', tone: 'indigo' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[-2, 2]}
        domainY={[-0.5, 7.5]}
        xLabel="x"
        yLabel="y"
        vLines={[{ x: 0, label: '展开点 a=0', tone: 'slate' }]}
        curves={[
          { id: 'true', points: truePts, label: '真实 eˣ', tone: 'cyan' },
          { id: 'tay', points: approxPts, label: `${order} 阶泰勒逼近`, tone: 'amber', dashed: true },
        ]}
      />
    </VisualizerFrame>
  );
}

// L2: 泰勒展开误差分析
export function TaylorLnErrorViz() {
  const [order, setOrder] = useState(3);
  const xs = Array.from({ length: 45 }, (_, i) => -0.6 + i * 0.032);
  const approxLn = (x: number, n: number) => {
    let s = 0;
    for (let k = 1; k <= n; k++) {
      s += ((-1) ** (k + 1) * x ** k) / k;
    }
    return s;
  };
  const truePts: Array<[number, number]> = xs.map((x) => [x, Math.log(1 + x)]);
  const tayPts: Array<[number, number]> = xs.map((x) => [x, approxLn(x, order)]);
  const err06 = Math.abs(Math.log(1.6) - approxLn(0.6, order));

  return (
    <VisualizerFrame
      title="ln(1+x) 泰勒截断余项误差分析"
      subtitle="在收敛半径 |x| < 1 内提升展开阶数，体会交替级数奇偶阶对真实曲线的包夹收敛。"
      badge="收敛半径与余项"
      sliders={[
        { label: '展开阶数 n', value: order, min: 1, max: 6, step: 1, displayValue: `n = ${order}`, onChange: setOrder },
      ]}
      metrics={[
        { label: 'x=0.6 处绝对误差', value: err06.toFixed(4), tone: err06 < 0.05 ? 'emerald' : 'rose' },
        { label: '收敛区间', value: '(-1, 1]', tone: 'indigo' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[-0.7, 0.9]}
        domainY={[-1.2, 0.8]}
        xLabel="x"
        yLabel="ln(1+x)"
        curves={[
          { id: 'ln', points: truePts, label: 'ln(1+x)', tone: 'emerald' },
          { id: 'approx', points: tayPts, label: `T_${order}(x)`, tone: 'cyan', dashed: true },
        ]}
      />
    </VisualizerFrame>
  );
}
