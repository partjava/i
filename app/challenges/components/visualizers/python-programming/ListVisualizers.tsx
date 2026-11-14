'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMatrixCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：List 列表

// L1: 滑动窗口统计分析器
export const SlidingWindowStatsVisualizer: React.FC = () => {
  const arr = [12, 18, 14, 25, 30, 19, 22];
  const [winStart, setWinStart] = useState(1);
  const k = 3;
  const slice = arr.slice(winStart, winStart + k);
  const avg = (slice.reduce((a, b) => a + b, 0) / k).toFixed(1);
  const maxV = Math.max(...slice);
  return (
    <VisualizerFrame
      title="List 固定滑动窗口统计分析"
      subtitle="增量维护窗口下标 [i : i+k] 的均值与峰值"
      badge="sliding_window_stats"
      sliders={[
        { label: '窗口起点 start', value: winStart, min: 0, max: arr.length - k, step: 1, onChange: setWinStart },
      ]}
      metrics={[
        { label: '窗口切片', value: `[${slice.join(', ')}]`, tone: 'cyan' },
        { label: '窗口均值', value: avg, tone: 'emerald' },
        { label: '窗口峰值', value: `${maxV}`, tone: 'amber' },
      ]}
    >
      <InteractiveMatrixCanvas
        left={{
          title: `nums[0..6] (k=${k})`,
          colLabels: arr.map((_, i) => `[${i}]`),
          rows: [
            arr.map((v, i) => ({
              value: v,
              highlight: i >= winStart && i < winStart + k ? 'cyan' : 'none',
            })),
          ],
          highlightRect: { r: 0, c: winStart, h: 1, w: k, tone: 'cyan' },
        }}
      />
    </VisualizerFrame>
  );
};

// L2: 数组旋转
export const ArrayRotateVisualizer: React.FC = () => {
  const [phase, setPhase] = useState(0);
  const phases = [
    { arr: [1, 2, 3, 4, 5, 6, 7], label: '原始数组', summary: '目标右移 k=3 步：利用三次原地翻转 (Reverse) 达成 O(1) 空间旋转。', hi: [0, 6] },
    { arr: [7, 6, 5, 4, 3, 2, 1], label: '1. 全翻转', summary: 'Step 1: 翻转整个数组 [0..6] → [7,6,5,4,3,2,1]。', hi: [0, 6] },
    { arr: [5, 6, 7, 4, 3, 2, 1], label: '2. 翻前k个', summary: 'Step 2: 翻转前 k=3 个元素 [0..2] → [5,6,7]。', hi: [0, 2] },
    { arr: [5, 6, 7, 1, 2, 3, 4], label: '3. 翻后n-k', summary: 'Step 3: 翻转剩余区间 [3..6] → [5,6,7,1,2,3,4]，完成右移！', hi: [3, 6] },
  ];
  const cur = phases[phase];
  return (
    <VisualizerFrame
      title="三次原地反转实现数组循环右移"
      subtitle="O(n) 时间与 O(1) 额外空间的经典列表翻转技巧 (k=3)"
      badge="rotate"
      scenarios={phases.map((p) => ({ label: p.label, summary: p.summary }))}
      activeScenario={phase}
      onScenarioChange={setPhase}
      metrics={[
        { label: '翻转区间', value: `[${cur.hi[0]}..${cur.hi[1]}]`, tone: 'indigo' },
        { label: '空间复杂度', value: 'O(1) 原地', tone: 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '列表内存',
            slots: cur.arr.map((v, i) => ({
              label: `${v}`,
              sublabel: `[${i}]`,
              tone: phase > 0 && i >= cur.hi[0] && i <= cur.hi[1] ? 'cyan' : phase === 3 ? 'emerald' : 'slate',
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
