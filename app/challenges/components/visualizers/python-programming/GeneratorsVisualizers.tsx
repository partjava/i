'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

// 章节：生成器

// L1: 日志行解析生成器
export const GeneratorLogStreamVisualizer: React.FC = () => {
  const [idx, setIdx] = useState(1);
  const stages = [
    { label: 'yield 解析第1条', cur: '200 GET /api', mem: '1 行' },
    { label: '挂起恢复 → 第2条', cur: '502 POST /pay', mem: '1 行' },
    { label: '挂起恢复 → 第3条', cur: '200 GET /home', mem: '1 行' },
  ];
  return (
    <VisualizerFrame
      title="yield 生成器协程挂起与恢复 (Lazy Stream)"
      subtitle="每次 yield 交还控制权并冻结局部栈帧，处理 GB 级日志也保持 O(1) 内存"
      badge="parse_log_lines"
      scenarios={stages.map((s) => ({ label: s.label, summary: `产出对象：${s.cur}，驻留内存始终 ${s.mem}。` }))}
      activeScenario={idx}
      onScenarioChange={setIdx}
      metrics={[
        { label: '当前 yield', value: stages[idx].cur, tone: 'emerald' },
        { label: '驻留内存', value: stages[idx].mem, tone: 'cyan' },
      ]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={[
          { id: 'gen', x: 90, y: 82, label: 'parse_log_lines', sublabel: '栈帧冻结/恢复', tone: 'indigo', shape: 'pill', active: true },
          { id: 'y', x: 215, y: 82, label: `yield #${idx + 1}`, tone: 'amber', shape: 'pill', active: true },
          { id: 'con', x: 330, y: 82, label: stages[idx].cur, tone: 'emerald', shape: 'pill', active: true },
        ]}
        edges={[
          { from: 'gen', to: 'y', label: 'yield', tone: 'amber', animated: true },
          { from: 'y', to: 'con', label: 'next()', tone: 'emerald', animated: true },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 斐波那契生成器
export const FibonacciGeneratorVisualizer: React.FC = () => {
  const [n, setN] = useState(6);
  const seq: number[] = [];
  let a = 0,
    b = 1;
  for (let i = 0; i <= n; i++) {
    seq.push(a);
    [a, b] = [b, a + b];
  }
  return (
    <VisualizerFrame
      title="Fibonacci 双变量滚动生成器 (a, b = b, a + b)"
      subtitle="无递归栈溢出风险，按需生成第 n 项斐波那契数"
      badge="fibonacci"
      sliders={[{ label: '迭代步数 N', value: n, min: 3, max: 9, step: 1, onChange: setN }]}
      metrics={[
        { label: `F(${n})`, value: `${seq[seq.length - 1]}`, tone: 'emerald' },
        { label: '状态寄存器', value: `(a=${seq[seq.length - 2]}, b=${seq[seq.length - 1]})`, tone: 'cyan' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0, 9]}
        domainY={[0, Math.max(25, seq[seq.length - 1] + 4)]}
        xLabel="n"
        yLabel="F(n)"
        curves={[
          {
            id: 'fib',
            points: seq.map((v, i) => [i, v]),
            label: 'F(n)',
            tone: 'cyan',
            fillArea: true,
          },
        ]}
        markers={[{ x: n, y: seq[seq.length - 1], label: `F(${n})=${seq[seq.length - 1]}`, tone: 'emerald', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};
