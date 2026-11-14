'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：Class类

// L1: 简易数据库连接池
export const ConnectionPoolVisualizer: React.FC = () => {
  const [inUse, setInUse] = useState(2);
  const maxPool = 4;
  return (
    <VisualizerFrame
      title="数据库连接池资源复用与借还槽"
      subtitle="维护空闲队列与活跃连接数上限，防止无限新建 TCP 连接"
      badge="ConnectionPool"
      sliders={[{ label: '当前借出活跃连接数', value: inUse, min: 0, max: maxPool, step: 1, onChange: setInUse }]}
      metrics={[
        { label: '使用中 (In-Use)', value: `${inUse}`, tone: inUse === maxPool ? 'amber' : 'cyan' },
        { label: '空闲可复用 (Idle)', value: `${maxPool - inUse}`, tone: 'emerald' },
        { label: '池状态', value: inUse === maxPool ? '已满 (需排队)' : '可立即获取', tone: inUse === maxPool ? 'rose' : 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: `Pool(max=${maxPool})`,
            slots: Array.from({ length: maxPool }, (_, i) => ({
              label: `Conn #${i + 1}`,
              sublabel: i < inUse ? 'BUSY' : 'IDLE',
              tone: i < inUse ? 'amber' : 'emerald',
              pointer: i < inUse ? 'LEASED' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 栈计算器
export const StackCalculatorVisualizer: React.FC = () => {
  const [step, setStep] = useState(2);
  const steps = [
    { token: '3', stack: ['3'], op: 'push(3)' },
    { token: '4', stack: ['3', '4'], op: 'push(4)' },
    { token: '+', stack: ['7'], op: 'pop 4,3 → 3+4=7' },
    { token: '2', stack: ['7', '2'], op: 'push(2)' },
    { token: '*', stack: ['14'], op: 'pop 2,7 → 7*2=14' },
  ];
  const cur = steps[step];
  return (
    <VisualizerFrame
      title="Calculator 类内部操作数栈执行推演"
      subtitle="通过 self._stack 状态封装实现后缀表达式求值 (3 4 + 2 *)"
      badge="Calculator"
      scenarios={steps.map((s, i) => ({
        label: `${i + 1}. token='${s.token}'`,
        summary: `执行 ${s.op}，当前 self._stack = [${s.stack.join(', ')}]。`,
      }))}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: '当前动作', value: cur.op, tone: 'cyan' },
        { label: '栈顶值', value: cur.stack[cur.stack.length - 1], tone: 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'self._stack',
            slots: cur.stack.map((v, i, a) => ({
              label: v,
              sublabel: i === a.length - 1 ? 'TOP' : `#${i}`,
              tone: i === a.length - 1 ? 'emerald' : 'indigo',
              pointer: i === a.length - 1 ? 'TOP' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
