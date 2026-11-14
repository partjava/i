'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：Lambda表达式

// L1: 多维度数据排序工具
export const LambdaSortUsersVisualizer: React.FC = () => {
  const [keyIdx, setKeyIdx] = useState(0);
  const users = [
    { name: 'Eva', score: 92, age: 24 },
    { name: 'Bob', score: 85, age: 19 },
    { name: 'Ada', score: 98, age: 27 },
  ];
  const sorted = [...users].sort((a, b) => (keyIdx === 0 ? b.score - a.score : a.age - b.age));
  return (
    <VisualizerFrame
      title="Lambda 匿名函数注入排序键 (sorted key=)"
      subtitle="动态传入单行匿名投影函数，灵活切换高维排序维度"
      badge="sort_users"
      scenarios={[
        { label: 'lambda u: -u["score"]', summary: '按得分从高到低：Ada(98) → Eva(92) → Bob(85)。' },
        { label: 'lambda u: u["age"]', summary: '按年龄从低到高：Bob(19) → Eva(24) → Ada(27)。' },
      ]}
      activeScenario={keyIdx}
      onScenarioChange={setKeyIdx}
      metrics={[{ label: '队首用户', value: `${sorted[0].name} (score=${sorted[0].score}, age=${sorted[0].age})`, tone: 'emerald' }]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '排序结果',
            slots: sorted.map((u, i) => ({
              label: `${u.name}`,
              sublabel: `s=${u.score}, a=${u.age}`,
              tone: i === 0 ? 'emerald' : 'cyan',
              pointer: `#${i + 1}`,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 自定义排序
export const LambdaSortWordsVisualizer: React.FC = () => {
  const [mode, setMode] = useState(0);
  const words = ['apple', 'go', 'python', 'ai'];
  const sorted = [...words].sort((a, b) =>
    mode === 0 ? a.length - b.length || a.localeCompare(b) : a.localeCompare(b)
  );
  return (
    <VisualizerFrame
      title="自定义多标准 Lambda 字符串排序"
      subtitle="结合 (len(w), w) 先按长度升序，再按字典序消除同长度冲突"
      badge="sort_words"
      scenarios={[
        { label: 'lambda w: (len(w), w)', summary: '长度为2的 ai 与 go 同长，二次键字典序排为 ai → go。' },
        { label: '字典序 w', summary: '纯字典序：ai → apple → go → python。' },
      ]}
      activeScenario={mode}
      onScenarioChange={setMode}
      metrics={[{ label: '排序序列', value: sorted.join(' → '), tone: 'cyan' }]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '输出顺序',
            slots: sorted.map((w, i) => ({
              label: w,
              sublabel: `len=${w.length}`,
              tone: i % 2 === 0 ? 'cyan' : 'indigo',
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
