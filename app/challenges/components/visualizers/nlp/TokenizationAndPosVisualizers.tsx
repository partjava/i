'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：分词与词性标注

// L1: 分词与词性标注器
export const TokenizerPosVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  const tokens = [
    { word: '深度', pos: 'NN', tone: 'cyan' as VisualizerTone },
    { word: '学习', pos: 'VV', tone: 'emerald' as VisualizerTone },
    { word: '驱动', pos: 'VV', tone: 'indigo' as VisualizerTone },
    { word: '未来', pos: 'NN', tone: 'amber' as VisualizerTone },
  ];
  return (
    <VisualizerFrame
      title="FMM 最大正向匹配分词与词性标注 (POS Tagging)"
      subtitle="按词典窗口贪心切分中文词组，并映射名词 (NN) / 动词 (VV) 等句法标签"
      badge="tokenize_pos"
      scenarios={[
        { label: '原始连续汉字串', summary: '未经分词的字符流：“深度学习驱动未来”。' },
        { label: '分词 + 词性标注 ✓', summary: '词表最大匹配切出 4 个词元并标注 NN / VV。' },
      ]}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[{ label: '词元数', value: step ? '4 Tokens' : '8 Chars', tone: 'cyan' }]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          step === 0
            ? {
                name: '输入字符流',
                slots: '深度学习驱动未来'.split('').map((c) => ({ label: c, tone: 'slate' })),
              }
            : {
                name: 'Token + POS',
                slots: tokens.map((t) => ({ label: t.word, sublabel: t.pos, tone: t.tone })),
              },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: BPE 分词器
export const BpeMergeVisualizer: React.FC = () => {
  const [mergeStep, setMergeStep] = useState(2);
  const merges = [
    { label: '0. 字符初始切分', slots: ['l', 'o', 'w', 'e', 'r'], pair: 'e+r (最高频)', summary: '拆成基础字节/单字，统计相邻字对频率。' },
    { label: '1. 合并 (e, r) → er', slots: ['l', 'o', 'w', 'er'], pair: 'l+o → lo', summary: '合并高频字对 e+r 为新子词 er。' },
    { label: '2. 合并 (l, o) → lo ✓', slots: ['lo', 'w', 'er'], pair: '最终词表命中', summary: '不断合并最高频相邻对，兼顾 OOV 泛化与短序列效率！' },
  ];
  const cur = merges[mergeStep];
  return (
    <VisualizerFrame
      title="BPE (Byte-Pair Encoding) 自底向上高频子词合并"
      subtitle="GPT / LLaMA 词表核心算法：高频组合合并为整词，生僻词优雅退回子词"
      badge="bpe_tokenizer"
      scenarios={merges.map((m) => ({ label: m.label, summary: m.summary }))}
      activeScenario={mergeStep}
      onScenarioChange={setMergeStep}
      metrics={[
        { label: '下步/当前规则', value: cur.pair, tone: 'cyan' },
        { label: 'Token 压缩长度', value: `${cur.slots.length} tokens`, tone: 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '子词序列',
            slots: cur.slots.map((s, i) => ({
              label: s,
              sublabel: s.length > 1 ? '已合并子词' : '单字符',
              tone: s.length > 1 ? 'emerald' : 'indigo',
              pointer: i === 0 ? 'BPE' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
