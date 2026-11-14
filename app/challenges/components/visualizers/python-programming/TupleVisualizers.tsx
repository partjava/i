'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
  InteractiveTimelineCanvas,
} from '../shared/VisualizerEngine';

// 章节：Tuple 元组

// L1: 多字段排序引擎
export const MultiFieldSortVisualizer: React.FC = () => {
  const [descScore, setDescScore] = useState(1);
  const rows = [
    { name: 'Alice', score: 95, age: 22 },
    { name: 'Bob', score: 95, age: 19 },
    { name: 'Carol', score: 88, age: 21 },
  ];
  const sorted = [...rows].sort((a, b) =>
    descScore ? b.score - a.score || a.age - b.age : a.score - b.score || a.age - b.age
  );
  return (
    <VisualizerFrame
      title="元组主键 (score, age) 多字段词典序排序"
      subtitle="Python 比较元组 (key1, key2) 时逐位从左向右打破平局"
      badge="multi_field_sort"
      scenarios={[
        { label: 'score 升序, age 升序', summary: 'key=lambda x: (x.score, x.age)：低分在前，同分按年龄小者优先。' },
        { label: 'score 降序, age 升序', summary: 'key=lambda x: (-x.score, x.age)：95分同分时 Bob(19) 排在 Alice(22) 之前。' },
      ]}
      activeScenario={descScore}
      onScenarioChange={setDescScore}
      metrics={[
        { label: '排序键元组', value: descScore ? '(-score, age)' : '(score, age)', tone: 'cyan' },
        { label: '榜首记录', value: `${sorted[0].name} (${sorted[0].score}分/${sorted[0].age}岁)`, tone: 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={sorted.map((r, i) => ({
          name: `Rank #${i + 1}`,
          slots: [
            { label: r.name, sublabel: '姓名', tone: i === 0 ? 'emerald' : 'slate' },
            { label: `${descScore ? -r.score : r.score}`, sublabel: '第1键 score', tone: 'cyan' },
            { label: `${r.age}`, sublabel: '第2键 age', tone: 'indigo' },
          ],
        }))}
      />
    </VisualizerFrame>
  );
};

// L2: 区间合并
export const MergeIntervalsVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  const summaryList = [
    { label: '1. 按起点排序', summary: '先按区间起点 tuple[0] 升序排列：[1,3], [2,6], [8,10], [15,18]。' },
    { label: '2. 合并重叠区间', summary: '[1,3] 与 [2,6] 满足 2 <= 3，合并更新右端为 max(3,6)=6 → [1,6]。' },
  ];
  return (
    <VisualizerFrame
      title="区间排序与贪心合并时间轴"
      subtitle="若下一区间起点 ≤ 当前右端，则吞并更新 end = max(end, next_end)"
      badge="merge_intervals"
      scenarios={summaryList}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: '输入区间数', value: '4', tone: 'slate' },
        { label: '合并后区间数', value: step === 0 ? '4 (未合并)' : '3', tone: step === 1 ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveTimelineCanvas
        maxTime={20}
        lanes={
          step === 0
            ? [
                { name: '区间 A', blocks: [{ start: 1, end: 3, label: '[1,3]', tone: 'cyan' }] },
                { name: '区间 B', blocks: [{ start: 2, end: 6, label: '[2,6]', tone: 'amber' }] },
                { name: '区间 C', blocks: [{ start: 8, end: 10, label: '[8,10]', tone: 'indigo' }] },
                { name: '区间 D', blocks: [{ start: 15, end: 18, label: '[15,18]', tone: 'slate' }] },
              ]
            : [
                {
                  name: '合并结果',
                  blocks: [
                    { start: 1, end: 6, label: '[1,6] 合并', tone: 'emerald' },
                    { start: 8, end: 10, label: '[8,10]', tone: 'indigo' },
                    { start: 15, end: 18, label: '[15,18]', tone: 'cyan' },
                  ],
                },
              ]
        }
      />
    </VisualizerFrame>
  );
};
