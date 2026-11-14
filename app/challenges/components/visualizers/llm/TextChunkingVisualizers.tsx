'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：文本切分与清洗

// L1: 文档切片引擎
export const FixedOverlapChunkerVisualizer: React.FC = () => {
  const [overlap, setOverlap] = useState(2);
  const chunkSize = 5;
  const stride = chunkSize - overlap;
  const tokens = Array.from({ length: 10 }, (_, i) => `W${i}`);
  return (
    <VisualizerFrame
      title="滑动窗口文档切片与 Overlap 上下文保护"
      subtitle="相邻文本块保留一段 overlap 重叠区，防止关键主谓或实体刚好被切片边界腰斩"
      badge="chunk_text"
      sliders={[{ label: '块间重叠 Overlap', value: overlap, min: 0, max: 3, step: 1, onChange: setOverlap }]}
      metrics={[
        { label: 'Chunk #1 范围', value: `[0 : ${chunkSize}]`, tone: 'cyan' },
        { label: 'Chunk #2 范围', value: `[${stride} : ${stride + chunkSize}]`, tone: 'indigo' },
        { label: '语义连续重叠', value: `${overlap} tokens`, tone: overlap > 0 ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'Chunk 1 & 2',
            slots: tokens.slice(0, stride + chunkSize).map((t, i) => {
              const in1 = i < chunkSize;
              const in2 = i >= stride;
              const both = in1 && in2;
              return {
                label: t,
                sublabel: both ? 'Overlap 重叠' : in1 ? 'C1' : 'C2',
                tone: both ? 'emerald' : in1 ? 'cyan' : 'indigo',
              };
            }),
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 智能切片器
export const SmartSemanticChunkerVisualizer: React.FC = () => {
  const [mode, setMode] = useState(1);
  return (
    <VisualizerFrame
      title="递归分隔符感知切片 (Markdown 标题 > 段落 > 句子)"
      subtitle="优先沿自然篇章边界（## 标题、\\n\\n、句号）切分，避免硬切破坏句子语义完整性"
      badge="smart_chunk"
      scenarios={[
        { label: '固定字符硬切 ✗', summary: '在词语或公式中间截断，破坏向量 Embedding 完整语义。' },
        { label: 'RecursiveCharacter 语义保完整 ✓', summary: '沿 \\n\\n 与句号边界自适应合并，每块语义自洽！' },
      ]}
      activeScenario={mode}
      onScenarioChange={setMode}
      metrics={[{ label: '分隔符优先级', value: '# 标题 → \\n\\n 段落 → 。句子', tone: 'emerald' }]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '智能分块结果',
            slots: mode
              ? [
                  { label: '## 架构概述', sublabel: '完整小节 1', tone: 'emerald' },
                  { label: '第一段核心机制。', sublabel: '完整段落 2', tone: 'cyan' },
                ]
              : [
                  { label: '## 架构概', sublabel: '被截断!', tone: 'rose' },
                  { label: '述 第一段核', sublabel: '语义残缺!', tone: 'rose' },
                  { label: '心机制。', sublabel: '碎片块', tone: 'amber' },
                ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};
