'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

export function GitConflictLevel1() {
  const [step, setStep] = useState(0);
  const states = [
    {
      label: '遇到 <<<<<<< HEAD',
      state: 'IN_OURS',
      ours: 'color = blue',
      theirs: '(等待读取)',
      count: 0,
      summary: '状态机切换为 IN_OURS，后续行累计收入当前分支 ours 缓冲区。',
    },
    {
      label: '遇到 =======',
      state: 'IN_THEIRS',
      ours: 'color = blue',
      theirs: 'color = green',
      count: 0,
      summary: '分隔符触发状态转移为 IN_THEIRS，开始收集传入分支 theirs 变更内容。',
    },
    {
      label: '遇到 >>>>>>> feature',
      state: 'OUTSIDE (闭合)',
      ours: 'color = blue',
      theirs: 'color = green',
      count: 1,
      summary: '冲突块闭合，保存一组结构化 {ours, theirs} 冲突记录并将冲突计数 +1。',
    },
  ];
  const cur = states[step];

  return (
    <VisualizerFrame
      title="Git 冲突标记状态机解析器"
      subtitle="按行扫描冲突标记 <<<<<<< / ======= / >>>>>>>，驱动状态机精准提取两侧代码块。"
      badge="词法状态机"
      scenarios={states.map((s) => ({ label: s.label, summary: s.summary }))}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: '当前解析状态', value: cur.state, tone: step === 2 ? 'emerald' : 'cyan' },
        { label: '已闭合冲突块数', value: `${cur.count}`, tone: 'indigo' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '行标记流',
            slots: [
              { label: '<<<<<<< HEAD', tone: step === 0 ? 'cyan' : 'slate', pointer: step === 0 ? 'CUR' : undefined },
              { label: '=======', tone: step === 1 ? 'indigo' : 'slate', pointer: step === 1 ? 'CUR' : undefined },
              { label: '>>>>>>> feat', tone: step === 2 ? 'emerald' : 'slate', pointer: step === 2 ? 'CUR' : undefined },
            ],
          },
          {
            name: '解析缓冲区',
            slots: [
              { label: `ours: ${cur.ours}`, tone: step >= 0 ? 'cyan' : 'slate' },
              { label: `theirs: ${cur.theirs}`, tone: step >= 1 ? 'indigo' : 'slate' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
}

export function GitConflictLevel2() {
  const [active, setActive] = useState(0);
  const strategies = [
    {
      label: '普通三方合并 (recursive/ort)',
      input: 'main + feature',
      tree: '融合双侧改动（冲突需解）',
      parents: '2 个父提交',
      summary: '标准双分支合入：保留互不冲突的双方修改，遇重叠行停下来让开发者手工裁决。',
    },
    {
      label: 'ours 策略 (-s ours)',
      input: 'main + feature',
      tree: '完全沿用 main 文件树',
      parents: '2 个父提交 (记录合并)',
      summary: '在提交历史中标记已合并，但文件内容 100% 保持当前分支不变（常用于废弃分支归档）。',
    },
    {
      label: 'octopus 策略 (多支合入)',
      input: 'main + B + C',
      tree: '一次性合入多分支无冲突改',
      parents: '3+ 个父提交',
      summary: '适合一次性合并多个彼此不冲突的并行功能分支，生成多父提交节点。',
    },
  ];
  const cur = strategies[active];

  return (
    <VisualizerFrame
      title="Git 合并策略路由器"
      subtitle="根据分支数量与文件内容保留需求，选择 ort、ours 或 octopus 合并拓扑策略。"
      badge="合并拓扑策略"
      scenarios={strategies.map((s) => ({ label: s.label.split(' ')[0], summary: s.summary }))}
      activeScenario={active}
      onScenarioChange={setActive}
      metrics={[
        { label: '输入分支', value: cur.input, tone: 'cyan' },
        { label: '父提交数', value: cur.parents, tone: 'indigo' },
        { label: '最终文件树', value: cur.tree, tone: 'emerald' },
      ]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={[
          { id: 'main', x: 64, y: 42, label: 'main', shape: 'pill', tone: 'cyan', active: true },
          { id: 'b', x: 64, y: 88, label: active === 2 ? 'branch B' : 'feature', shape: 'pill', tone: 'indigo', active: true },
          ...(active === 2 ? [{ id: 'c', x: 64, y: 134, label: 'branch C', shape: 'pill' as const, tone: 'amber' as const, active: true }] : []),
          { id: 'strat', x: 196, y: 88, label: active === 0 ? 'ort' : active === 1 ? 'ours' : 'octopus', shape: 'pill', tone: 'indigo', active: true },
          { id: 'out', x: 332, y: 88, label: active === 1 ? '保留 main 树' : '新合并节点', shape: 'pill', tone: 'emerald', active: true },
        ]}
        edges={[
          { from: 'main', to: 'strat', tone: 'cyan', animated: true },
          { from: 'b', to: 'strat', tone: active === 1 ? 'slate' : 'indigo', dashed: active === 1, animated: active !== 1 },
          ...(active === 2 ? [{ from: 'c', to: 'strat', tone: 'amber' as const, animated: true }] : []),
          { from: 'strat', to: 'out', tone: 'emerald', animated: true },
        ]}
      />
    </VisualizerFrame>
  );
}
