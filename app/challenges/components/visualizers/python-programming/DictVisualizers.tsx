'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：Dict 字典

// L1: 嵌套字典深度合并器
export const DeepMergeDictVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  const scenarios = [
    { label: '浅层覆盖错误', summary: '直接 a.update(b) 会让 b["db"] 整个覆盖 a["db"]，丢失 host="localhost"。' },
    { label: '递归深合并 ✓', summary: '检测到双方 value 均为 dict 时递归进入 merge(a["db"], b["db"])，保留 host 并更新 port。' },
  ];
  return (
    <VisualizerFrame
      title="嵌套字典递归深度合并树"
      subtitle="区分标量直接覆盖与子字典递归下降合并"
      badge="deep_merge"
      scenarios={scenarios}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: 'db.host', value: step === 1 ? 'localhost ✓' : '被误删 ✗', tone: step === 1 ? 'emerald' : 'rose' },
        { label: 'db.port', value: '5433 (来自 B)', tone: 'cyan' },
      ]}
    >
      <InteractiveGraphCanvas
        height={180}
        nodes={[
          { id: 'root', x: 75, y: 90, label: 'merged', tone: 'indigo', shape: 'pill', active: true },
          { id: 'db', x: 185, y: 55, label: 'key: "db"', sublabel: '都是 dict → 递归', tone: 'cyan', shape: 'pill', active: true },
          { id: 'host', x: 320, y: 35, label: step === 1 ? 'host: localhost' : 'host: [丢失]', tone: step === 1 ? 'emerald' : 'rose', shape: 'pill' },
          { id: 'port', x: 320, y: 82, label: 'port: 5433', tone: 'emerald', shape: 'pill', active: true },
          { id: 'debug', x: 205, y: 140, label: 'debug: True', sublabel: '标量覆盖', tone: 'amber', shape: 'pill' },
        ]}
        edges={[
          { from: 'root', to: 'db', tone: 'cyan', animated: true },
          { from: 'root', to: 'debug', tone: 'amber' },
          { from: 'db', to: 'host', tone: step === 1 ? 'emerald' : 'rose', dashed: step === 0 },
          { from: 'db', to: 'port', tone: 'emerald', animated: true },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 单词频率统计 Top-K
export const TopKFrequentVisualizer: React.FC = () => {
  const [k, setK] = useState(2);
  const counts = [
    { word: 'python', cnt: 5 },
    { word: 'ai', cnt: 4 },
    { word: 'code', cnt: 2 },
    { word: 'bug', cnt: 1 },
  ];
  return (
    <VisualizerFrame
      title="Counter 词频统计与 Top-K 选优"
      subtitle="先用 dict/Counter 线性统计频次，再按 (-count, word) 取前 K 项"
      badge="top_k_frequent"
      sliders={[{ label: '提取前 K 个高频词', value: k, min: 1, max: 4, step: 1, onChange: setK }]}
      metrics={[
        { label: '入选词数', value: `Top ${k}`, tone: 'emerald' },
        { label: '入选词组', value: counts.slice(0, k).map((c) => c.word).join(', '), tone: 'cyan' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '频次降序桶',
            slots: counts.map((c, i) => ({
              label: `${c.word} (${c.cnt})`,
              sublabel: i < k ? `Top #${i + 1}` : '舍弃',
              tone: i < k ? 'emerald' : 'slate',
              pointer: i < k ? 'KEEP' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
