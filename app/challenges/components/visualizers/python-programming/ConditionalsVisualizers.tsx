'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：条件语句

// L1: 日志级别过滤器
export const LogLevelFilterVisualizer: React.FC = () => {
  const [minLevel, setMinLevel] = useState(2);
  const levels = ['DEBUG (1)', 'INFO (2)', 'WARN (3)', 'ERROR (4)'];
  const logs = [
    { msg: 'cache hit', lvl: 1 },
    { msg: 'server start', lvl: 2 },
    { msg: 'slow query', lvl: 3 },
    { msg: 'db timeout', lvl: 4 },
  ];
  const kept = logs.filter((l) => l.lvl >= minLevel).length;
  return (
    <VisualizerFrame
      title="日志级别阈值过滤决策管线"
      subtitle="按严重度映射权重过滤低于阈值的噪声日志"
      badge="filter_logs"
      sliders={[
        {
          label: '最小放行级别阈值',
          value: minLevel,
          min: 1,
          max: 4,
          step: 1,
          displayValue: levels[minLevel - 1],
          onChange: setMinLevel,
        },
      ]}
      metrics={[
        { label: '当前阈值', value: levels[minLevel - 1], tone: 'indigo' },
        { label: '放行数量', value: `${kept} / ${logs.length}`, tone: 'emerald' },
        { label: '丢弃比例', value: `${Math.round(((logs.length - kept) / logs.length) * 100)}%`, tone: 'rose' },
      ]}
    >
      <InteractiveGraphCanvas
        height={175}
        nodes={[
          ...logs.map((l, i) => ({
            id: `l${i}`,
            x: 80,
            y: 28 + i * 38,
            label: `${levels[l.lvl - 1].split(' ')[0]}: ${l.msg}`,
            tone: (l.lvl >= minLevel ? 'emerald' : 'slate') as VisualizerTone,
            shape: 'pill' as const,
            active: l.lvl >= minLevel,
          })),
          {
            id: 'gate',
            x: 230,
            y: 85,
            label: `level ≥ ${minLevel}`,
            sublabel: '条件分支',
            tone: 'cyan',
            shape: 'pill',
            active: true,
          },
          {
            id: 'out',
            x: 345,
            y: 55,
            label: `保留 (${kept})`,
            tone: 'emerald',
            shape: 'pill',
            active: true,
          },
          {
            id: 'drop',
            x: 345,
            y: 125,
            label: `过滤 (${logs.length - kept})`,
            tone: 'rose',
            shape: 'pill',
          },
        ]}
        edges={[
          ...logs.map((l, i) => ({
            from: `l${i}`,
            to: 'gate',
            tone: (l.lvl >= minLevel ? 'cyan' : 'slate') as VisualizerTone,
            dashed: l.lvl < minLevel,
            animated: l.lvl >= minLevel,
          })),
          { from: 'gate', to: 'out', label: 'True', tone: 'emerald', animated: true },
          { from: 'gate', to: 'drop', label: 'False', tone: 'rose', dashed: true },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: FizzBuzz
export const FizzBuzzVisualizer: React.FC = () => {
  const [n, setN] = useState(15);
  const items = Array.from({ length: 6 }, (_, i) => {
    const val = n - 5 + i;
    const mod3 = val % 3 === 0;
    const mod5 = val % 5 === 0;
    const out = mod3 && mod5 ? 'FizzBuzz' : mod3 ? 'Fizz' : mod5 ? 'Buzz' : String(val);
    const tone: VisualizerTone = mod3 && mod5 ? 'amber' : mod3 ? 'cyan' : mod5 ? 'indigo' : 'slate';
    return { val, out, tone };
  });
  const active = items[items.length - 1];
  return (
    <VisualizerFrame
      title="模运算分支优先级序列 (FizzBuzz)"
      subtitle="先判 n % 15 == 0，防止被单条件 % 3 或 % 5 提前截断"
      badge="fizzbuzz"
      sliders={[
        { label: '当前检查整数 N', value: n, min: 6, max: 30, step: 1, onChange: setN },
      ]}
      metrics={[
        { label: 'n % 3', value: `${n % 3}`, tone: n % 3 === 0 ? 'cyan' : 'slate' },
        { label: 'n % 5', value: `${n % 5}`, tone: n % 5 === 0 ? 'indigo' : 'slate' },
        { label: '分支输出', value: active.out, tone: active.tone },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '滑动输出窗口',
            slots: items.map((it, idx) => ({
              label: it.out,
              sublabel: `n=${it.val}`,
              tone: it.tone,
              pointer: idx === items.length - 1 ? 'CUR' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
