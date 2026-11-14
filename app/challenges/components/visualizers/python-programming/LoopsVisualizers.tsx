'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
  InteractiveTimelineCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：循环

// L1: 分批任务调度器
export const BatchTaskSchedulerVisualizer: React.FC = () => {
  const [batchSize, setBatchSize] = useState(3);
  const totalTasks = 8;
  const batches = Math.ceil(totalTasks / batchSize);
  const blocks = Array.from({ length: batches }, (_, i) => {
    const start = i * batchSize;
    const end = Math.min(totalTasks, start + batchSize);
    return {
      start: i * 10,
      end: i * 10 + (end - start) * 2.8,
      label: `B${i + 1}: [${start}..${end - 1}]`,
      tone: (i % 2 === 0 ? 'cyan' : 'indigo') as VisualizerTone,
    };
  });
  return (
    <VisualizerFrame
      title="分批循环切片与调度时序"
      subtitle="使用 range(0, len(tasks), batch_size) 切分微批执行"
      badge="run_batches"
      sliders={[
        { label: '批次大小 batch_size', value: batchSize, min: 1, max: 5, step: 1, onChange: setBatchSize },
      ]}
      metrics={[
        { label: '总任务数', value: `${totalTasks}`, tone: 'slate' },
        { label: '批次数', value: `${batches} batches`, tone: 'cyan' },
        { label: '尾批大小', value: `${totalTasks % batchSize || batchSize}`, tone: 'emerald' },
      ]}
    >
      <InteractiveTimelineCanvas
        maxTime={batches * 10}
        unit="t"
        lanes={[{ name: 'Batch 执行', blocks }]}
      />
    </VisualizerFrame>
  );
};

// L2: 两数之和
export const TwoSumHashVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  const nums = [2, 7, 11, 15];
  const target = 9;
  const steps = [
    { idx: 0, seen: [] as string[], hit: false, summary: 'i=0, num=2, need=7 不在字典 -> seen[2]=0。' },
    { idx: 1, seen: ['2:0'], hit: true, summary: 'i=1, num=7, need=2 命中字典！返回 [0, 1]，O(n) 完成。' },
  ];
  const cur = steps[step];
  return (
    <VisualizerFrame
      title="两数之和哈希表一次遍历查找"
      subtitle="用 O(1) 字典查找 target - num 替代 O(n²) 双层嵌套循环"
      badge="two_sum"
      scenarios={steps.map((s, i) => ({ label: `步骤 ${i + 1}: num=${nums[s.idx]}`, summary: s.summary }))}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: 'Target', value: `${target}`, tone: 'indigo' },
        { label: '当前差值', value: `${target - nums[cur.idx]}`, tone: 'amber' },
        { label: '查找结果', value: cur.hit ? 'HIT [0, 1]' : 'MISS → 写入', tone: cur.hit ? 'emerald' : 'cyan' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'nums数组',
            slots: nums.map((v, i) => ({
              label: `${v}`,
              sublabel: `idx=${i}`,
              tone: i === cur.idx ? (cur.hit ? 'emerald' : 'cyan') : cur.hit && i === 0 ? 'emerald' : 'slate',
              pointer: i === cur.idx ? 'CUR' : undefined,
            })),
          },
          {
            name: 'seen字典',
            slots: cur.seen.length
              ? cur.seen.map((s) => ({ label: s, sublabel: 'val→idx', tone: cur.hit ? 'emerald' : 'indigo' }))
              : [{ label: '{} 空', sublabel: '等待写入', tone: 'slate' }],
          },
        ]}
      />
    </VisualizerFrame>
  );
};
