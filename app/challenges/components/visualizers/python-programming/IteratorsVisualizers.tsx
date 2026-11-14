'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：迭代器

// L1: 分页迭代器
export const PaginatedIteratorVisualizer: React.FC = () => {
  const [page, setPage] = useState(0);
  const pages = [
    ['item1', 'item2', 'item3'],
    ['item4', 'item5', 'item6'],
    ['item7'],
  ];
  return (
    <VisualizerFrame
      title="分页迭代器 __iter__ / __next__ 游标推进"
      subtitle="每次 next(it) 仅切片返回一页数据，末页耗尽抛出 StopIteration"
      badge="PaginatedIterator"
      scenarios={[0, 1, 2].map((p) => ({
        label: `next() → 第 ${p + 1} 页`,
        summary: `cursor=[${p * 3}:${p * 3 + pages[p].length}]，下次调用${p === 2 ? '将触发 StopIteration' : '继续推进'}。`,
      }))}
      activeScenario={page}
      onScenarioChange={setPage}
      metrics={[
        { label: '当前页码', value: `${page + 1} / 3`, tone: 'cyan' },
        { label: '返回切片', value: `[${pages[page].join(', ')}]`, tone: 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '数据页',
            slots: pages[page].map((v, i) => ({
              label: v,
              sublabel: `idx=${page * 3 + i}`,
              tone: 'cyan',
              pointer: i === 0 ? 'HEAD' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 范围迭代器
export const RangeIteratorVisualizer: React.FC = () => {
  const [step, setStep] = useState(2);
  const [curIdx, setCurIdx] = useState(1);
  const seq = Array.from({ length: 5 }, (_, i) => i * step);
  return (
    <VisualizerFrame
      title="RangeIterator 惰性步进状态保持"
      subtitle="不预先构造完整 list，仅在对象内保存 current 与 step"
      badge="RangeIterator"
      sliders={[
        { label: '步长 step', value: step, min: 1, max: 5, step: 1, onChange: setStep },
        { label: '已调用 next 次数', value: curIdx, min: 0, max: 4, step: 1, onChange: setCurIdx },
      ]}
      metrics={[
        { label: '当前产出值', value: `${seq[curIdx]}`, tone: 'emerald' },
        { label: '内存占用', value: 'O(1) 仅3个整数', tone: 'cyan' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '按需序列',
            slots: seq.map((v, i) => ({
              label: `${v}`,
              sublabel: i < curIdx ? '已消耗' : i === curIdx ? '当前产出' : '未计算',
              tone: i === curIdx ? 'emerald' : i < curIdx ? 'indigo' : 'slate',
              pointer: i === curIdx ? 'CUR' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
