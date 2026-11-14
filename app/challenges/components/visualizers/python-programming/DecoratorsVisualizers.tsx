'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveTimelineCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：装饰器

// L1: 自动重试装饰器
export const RetryDecoratorVisualizer: React.FC = () => {
  const [maxRetries, setMaxRetries] = useState(3);
  const [succeedAt, setSucceedAt] = useState(3);
  const ok = succeedAt <= maxRetries;
  const blocks = Array.from({ length: Math.min(maxRetries, succeedAt) }, (_, i) => {
    const attempt = i + 1;
    const pass = attempt === succeedAt && ok;
    return {
      start: i * 10,
      end: i * 10 + 7,
      label: pass ? `尝试#${attempt} 成功✓` : `尝试#${attempt} 异常`,
      tone: (pass ? 'emerald' : 'rose') as VisualizerTone,
    };
  });
  return (
    <VisualizerFrame
      title="@retry 异常拦截与指数退避重试环"
      subtitle="不改动原业务函数代码，在 wrapper 外壳中捕获异常并自动重试"
      badge="retry"
      sliders={[
        { label: '最大重试次数 max_retries', value: maxRetries, min: 1, max: 4, step: 1, onChange: setMaxRetries },
        { label: '第几次调用恢复正常', value: succeedAt, min: 1, max: 4, step: 1, onChange: setSucceedAt },
      ]}
      metrics={[
        { label: '最终状态', value: ok ? `第 ${succeedAt} 次成功返回` : '耗尽重试抛出异常 ✗', tone: ok ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveTimelineCanvas
        maxTime={42}
        unit="次"
        lanes={[{ name: 'Wrapper 重试', blocks }]}
      />
    </VisualizerFrame>
  );
};

// L2: 函数计时装饰器
export const TimerDecoratorVisualizer: React.FC = () => {
  const [fnMs, setFnMs] = useState(42);
  return (
    <VisualizerFrame
      title="@timer 切面耗时打点器 (AOP 包装)"
      subtitle="使用 functools.wraps 保留原函数元信息，前后夹击统计 perf_counter 差值"
      badge="timer"
      sliders={[{ label: '内部核心耗时 (ms)', value: fnMs, min: 10, max: 90, step: 5, displayValue: `${fnMs} ms`, onChange: setFnMs }]}
      metrics={[
        { label: '总耗时', value: `${fnMs + 4} ms`, tone: 'cyan' },
        { label: '切面开销', value: '4 ms', tone: 'indigo' },
      ]}
    >
      <InteractiveTimelineCanvas
        maxTime={100}
        unit="ms"
        lanes={[
          {
            name: 'wrapper()',
            blocks: [
              { start: 0, end: 2, label: 't0', tone: 'indigo' },
              { start: 2, end: 2 + fnMs, label: `func() ${fnMs}ms`, tone: 'emerald' },
              { start: 2 + fnMs, end: 4 + fnMs, label: 't1-t0', tone: 'cyan' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};
