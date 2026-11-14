'use client';

import React, { useState } from 'react';
import { Intervals } from './ConceptDiagram';
import { VisualizerFrame, InteractiveGraphCanvas } from '../shared/VisualizerEngine';

export function GitBranchMergeLevel1() {
  const [active, setActive] = useState(0);
  const scenarios = [
    { label: '不同文件 (零风险)', ranges: [[10, 20], [15, 25]] as [[number, number], [number, number]], shared: false, risk: 'LOW (自动合并)', summary: '两分支修改不同文件路径，即使行号区间有重合也不会冲突。' },
    { label: '同文件错开区间 (安全)', ranges: [[10, 20], [21, 25]] as [[number, number], [number, number]], shared: true, risk: 'LOW (区间相邻)', summary: '同改 parser.ts，但 10–20 行与 21–25 行完全不相交，Git 可干净合入。' },
    { label: '同文件区间重叠 (冲突)', ranges: [[10, 20], [15, 25]] as [[number, number], [number, number]], shared: true, risk: 'HIGH (冲突 15–20)', summary: '同文件且 15–20 行重叠，双方都改动了同一段代码，必报合并冲突。' },
  ];
  const cur = scenarios[active];

  return (
    <VisualizerFrame
      title="分支合并行区间冲突评估器"
      subtitle="结合「文件路径是否相同」与「修改行号区间是否交叠」二维条件预测冲突风险。"
      badge="行区间交叠标尺"
      scenarios={scenarios.map((s) => ({ label: s.label.split(' ')[0], summary: s.summary }))}
      activeScenario={active}
      onScenarioChange={setActive}
      metrics={[
        { label: '同文件修改', value: cur.shared ? '是 (parser.ts)' : '否 (不同文件)', tone: cur.shared ? 'indigo' : 'emerald' },
        { label: '冲突风险评估', value: cur.risk, tone: active === 2 ? 'rose' : 'emerald' },
      ]}
    >
      <Intervals ranges={cur.ranges} sharedFile={cur.shared} />
    </VisualizerFrame>
  );
}

export function GitBranchMergeLevel2() {
  const [active, setActive] = useState(0);
  const cases = [
    {
      label: '改不同字段 (自动合并)',
      base: 'A · B',
      ours: 'A′ · B',
      theirs: 'A · B′',
      merged: 'A′ · B′',
      tone: 'emerald' as const,
      summary: '相对于共同基底 A·B，左分支改 A→A′，右分支改 B→B′，三方合并取各自非空变更。',
    },
    {
      label: '两侧改法完全一致',
      base: 'blue',
      ours: 'green',
      theirs: 'green',
      merged: 'green (幂等)',
      tone: 'cyan' as const,
      summary: '双方虽修改同一位置，但最终目标值均为 green，自动达成一致。',
    },
    {
      label: '双侧互斥修改 (冲突)',
      base: 'blue',
      ours: 'green',
      theirs: 'purple',
      merged: 'CONFLICT!',
      tone: 'rose' as const,
      summary: '左分支改为 green、右分支改为 purple 且均偏离基底 blue，无法自动裁决。',
    },
  ];
  const cur = cases[active];

  return (
    <VisualizerFrame
      title="三方合并 (3-Way Merge) 自动求解器"
      subtitle="同时比对 Base、Ours 与 Theirs 三个版本的节点差异，决定自动合入或抛出冲突。"
      badge="三方 Diff 求解"
      scenarios={cases.map((c) => ({ label: c.label.split(' ')[0], summary: c.summary }))}
      activeScenario={active}
      onScenarioChange={setActive}
      metrics={[
        { label: '共同基底 (Base)', value: cur.base, tone: 'slate' },
        { label: '合并结果', value: cur.merged, tone: cur.tone },
      ]}
    >
      <InteractiveGraphCanvas
        height={170}
        nodes={[
          { id: 'base', x: 66, y: 85, label: `Base: ${cur.base}`, shape: 'pill', tone: 'slate', active: true },
          { id: 'ours', x: 200, y: 40, label: `Ours: ${cur.ours}`, shape: 'pill', tone: 'cyan', active: true },
          { id: 'theirs', x: 200, y: 130, label: `Theirs: ${cur.theirs}`, shape: 'pill', tone: 'indigo', active: true },
          { id: 'out', x: 334, y: 85, label: cur.merged, shape: 'pill', tone: cur.tone, active: true },
        ]}
        edges={[
          { from: 'base', to: 'ours', tone: 'cyan' },
          { from: 'base', to: 'theirs', tone: 'indigo' },
          { from: 'ours', to: 'out', tone: cur.tone, animated: true },
          { from: 'theirs', to: 'out', tone: cur.tone, animated: true },
        ]}
      />
    </VisualizerFrame>
  );
}
