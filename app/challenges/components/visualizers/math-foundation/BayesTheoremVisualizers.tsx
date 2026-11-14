'use client';

import { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveTimelineCanvas,
} from '../shared/VisualizerEngine';

// 章节：贝意斯公式

// L1: 朴素贝叶斯垃圾邮件分类器
export function NaiveBayesSpamViz() {
  const [preset, setPreset] = useState(0);
  const emails = [
    { label: '含「免费 + 领取」', words: ['免费', '领取'], pSpam: 0.94, summary: '高频垃圾词同时出现，后验垃圾邮件概率跃升至 94%。' },
    { label: '含「会议 + 日程」', words: ['会议', '日程'], pSpam: 0.04, summary: '正常办公词汇拉低似然比，判定为正常邮件 (96% 正常)。' },
    { label: '混合词「免费 + 会议」', words: ['免费', '会议'], pSpam: 0.56, summary: '正负词汇相互抵消，需平滑参数与先验共同裁决。' },
  ];
  const cur = emails[preset];

  return (
    <VisualizerFrame
      title="朴素贝叶斯词袋后验推理"
      subtitle="假设词项条件独立，将先验 P(Spam) 与各词条件似然 P(wᵢ|Spam) 累乘对比。"
      badge="条件独立概率图"
      scenarios={emails.map((e) => ({ label: e.label, summary: e.summary }))}
      activeScenario={preset}
      onScenarioChange={setPreset}
      metrics={[
        { label: 'P(Spam | X)', value: `${(cur.pSpam * 100).toFixed(0)}%`, tone: cur.pSpam > 0.5 ? 'rose' : 'emerald' },
        { label: 'P(Ham | X)', value: `${((1 - cur.pSpam) * 100).toFixed(0)}%`, tone: cur.pSpam > 0.5 ? 'slate' : 'cyan' },
      ]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={[
          { id: 'prior', x: 70, y: 82, label: '先验 P(Y)', shape: 'pill', tone: 'indigo', active: true },
          { id: 'w1', x: 200, y: 46, label: `词: ${cur.words[0]}`, shape: 'pill', tone: 'cyan', active: true },
          { id: 'w2', x: 200, y: 118, label: `词: ${cur.words[1]}`, shape: 'pill', tone: 'cyan', active: true },
          { id: 'out', x: 332, y: 82, label: cur.pSpam > 0.5 ? '判定: Spam' : '判定: Ham', shape: 'pill', tone: cur.pSpam > 0.5 ? 'rose' : 'emerald', active: true },
        ]}
        edges={[
          { from: 'prior', to: 'w1', tone: 'indigo', animated: true },
          { from: 'prior', to: 'w2', tone: 'indigo', animated: true },
          { from: 'w1', to: 'out', tone: 'cyan', animated: true },
          { from: 'w2', to: 'out', tone: 'cyan', animated: true },
        ]}
      />
    </VisualizerFrame>
  );
}

// L2: 贝叶斯定理计算器
export function BayesTheoremViz() {
  const [priorPct, setPriorPct] = useState(1.0);
  const [fpPct, setFpPct] = useState(5.0);
  const sens = 0.99;
  const p = priorPct / 100;
  const fp = fpPct / 100;
  const tp = p * sens;
  const falseP = (1 - p) * fp;
  const posterior = tp / (tp + falseP);

  return (
    <VisualizerFrame
      title="贝叶斯定理与基础率谬误 (PPV)"
      subtitle="即便检测灵敏度高达 99%，当基础患病率（先验）极低时，假阳性总数仍可能压倒真阳性。"
      badge="后验概率拆解"
      sliders={[
        { label: '先验概率 P(D)', value: priorPct, min: 0.5, max: 20, step: 0.5, displayValue: `${priorPct.toFixed(1)}%`, onChange: setPriorPct },
        { label: '误报率 P(+|¬D)', value: fpPct, min: 1, max: 15, step: 1, displayValue: `${fpPct.toFixed(0)}%`, onChange: setFpPct },
      ]}
      metrics={[
        { label: '真阳性占比 P(+,D)', value: `${(tp * 100).toFixed(2)}%`, tone: 'emerald' },
        { label: '假阳性占比 P(+,¬D)', value: `${(falseP * 100).toFixed(2)}%`, tone: 'rose' },
        { label: '真实患病率 P(D|+)', value: `${(posterior * 100).toFixed(1)}%`, tone: 'cyan' },
      ]}
    >
      <InteractiveTimelineCanvas
        maxTime={100}
        unit="%"
        lanes={[
          {
            name: '阳性样本构成',
            blocks: [
              { start: 0, end: posterior * 100, label: `真阳性 ${(posterior * 100).toFixed(0)}%`, tone: 'emerald' },
              { start: posterior * 100, end: 100, label: `假阳性 ${((1 - posterior) * 100).toFixed(0)}%`, tone: 'rose' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
}
