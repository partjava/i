'use client';

import { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
} from '../shared/VisualizerEngine';

// 章节：梯度下降算法

// L1: 梯度下降优化器
export function GradientDescentTraceViz() {
  const [lr, setLr] = useState(0.25);
  const trace: Array<[number, number]> = [];
  let x = 3.2;
  for (let i = 0; i < 8; i++) {
    trace.push([x, x * x]);
    x = x - lr * (2 * x);
    if (Math.abs(x) > 5) break;
  }
  const finalX = trace[trace.length - 1][0];
  const xs = Array.from({ length: 81 }, (_, i) => -4 + i * 0.1);
  const curve: Array<[number, number]> = xs.map((v) => [v, v * v]);

  const status = lr > 1.0 ? '发散 (Diverge)' : lr > 0.5 ? '跨谷震荡 (Oscillate)' : '平稳收敛';

  return (
    <VisualizerFrame
      title="梯度下降迭代轨迹 xₜ₊₁ = xₜ - η·2xₜ"
      subtitle="调节学习率 η，观察小球沿抛物线 f(x)=x² 下降 7 步后的收敛、震荡或发散行为。"
      badge="优化轨迹"
      sliders={[
        { label: '学习率 η (Learning Rate)', value: lr, min: 0.05, max: 1.08, step: 0.03, displayValue: lr.toFixed(2), onChange: setLr },
      ]}
      metrics={[
        { label: '7 步后坐标 x*', value: finalX.toFixed(3), tone: Math.abs(finalX) < 0.2 ? 'emerald' : 'amber' },
        { label: '收敛状态判定', value: status, tone: lr > 1.0 ? 'rose' : lr > 0.5 ? 'amber' : 'emerald' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[-4, 4]}
        domainY={[0, 14]}
        xLabel="x"
        yLabel="f(x)=x²"
        curves={[{ id: 'parabola', points: curve, label: '目标函数 f(x)', tone: 'indigo' }]}
        tracePoints={trace}
        traceTone={lr > 1.0 ? 'rose' : 'cyan'}
      />
    </VisualizerFrame>
  );
}

// L2: 梯度下降收敛分析
export function GdConvergenceViz() {
  const [preset, setPreset] = useState(0);
  const lrs = [
    { label: 'η = 0.05 (过小慢爬)', lr: 0.05, tone: 'amber' as const, summary: '每步步长太小，迭代 12 轮后仍距离最低点很远。' },
    { label: 'η = 0.30 (理想收敛)', lr: 0.3, tone: 'emerald' as const, summary: '单调且迅速地指数收敛到全局极小值 0。' },
    { label: 'η = 0.92 (剧烈震荡)', lr: 0.92, tone: 'rose' as const, summary: '每次跨过对称谷底两侧来回跳跃，衰减极其缓慢。' },
  ];
  const cur = lrs[preset];
  const makeLoss = (eta: number) => {
    const arr: Array<[number, number]> = [];
    let x = 3.0;
    for (let t = 0; t <= 12; t++) {
      arr.push([t, x * x]);
      x = x * (1 - 2 * eta);
    }
    return arr;
  };

  return (
    <VisualizerFrame
      title="不同学习率下的 Loss 收敛速率对比"
      subtitle="比较小学习率、适中学习率与接近稳定性临界值 η=1.0 时损失函数的下降曲线。"
      badge="Loss 收敛曲线"
      scenarios={lrs.map((l) => ({ label: l.label.split(' ')[0] + ' ' + l.label.split(' ')[1], summary: l.summary }))}
      activeScenario={preset}
      onScenarioChange={setPreset}
      metrics={[
        { label: '当前学习率 η', value: cur.lr.toFixed(2), tone: cur.tone },
        { label: '收敛倍数因子 |1-2η|', value: Math.abs(1 - 2 * cur.lr).toFixed(2), tone: 'cyan' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0, 12]}
        domainY={[0, 10]}
        xLabel="Epoch"
        yLabel="Loss"
        curves={[
          { id: 'opt', points: makeLoss(0.3), label: '参考最优 (0.3)', tone: 'slate', dashed: true },
          { id: 'cur', points: makeLoss(cur.lr), label: `当前 η=${cur.lr}`, tone: cur.tone, fillArea: true },
        ]}
      />
    </VisualizerFrame>
  );
}
