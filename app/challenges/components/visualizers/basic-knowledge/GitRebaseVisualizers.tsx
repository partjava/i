'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Intervals } from './ConceptDiagram';
import { VisualizerFrame } from '../shared/VisualizerEngine';

const replayedCommits = [[], ['C′'], ['C′', 'D′']];

export function GitRebaseLevel1() {
  const [active, setActive] = useState(0);
  const scenarios = [
    { label: '1. 原始分叉', summary: '共同祖先 A 之后，main 推进至 B，feature 分叉出 C → D。' },
    { label: '2. 重放 C → C′', summary: '将 C 的补丁提取并重新应用在 main(B) 之上，生成新提交 C′。' },
    { label: '3. 重放 D → D′', summary: '继续将 D 重放至 C′ 之上，得到线性历史 A → B → C′ → D′。' },
  ];

  return (
    <VisualizerFrame
      title="Git Rebase 提交历史重放模拟器"
      subtitle="把 feature 分支的差异补丁依次重放（Replay）到新基底 B 之上，拉直分支历史。"
      badge="DAG 提交重放"
      scenarios={scenarios}
      activeScenario={active}
      onScenarioChange={setActive}
      metrics={[
        { label: '目标新基底', value: 'main (B)', tone: 'cyan' },
        { label: '当前已重放', value: active === 0 ? '0 个' : replayedCommits[active].join(', '), tone: 'indigo' },
        { label: '拓扑形态', value: active === 2 ? '纯线性历史' : '分叉重放中', tone: active === 2 ? 'emerald' : 'amber' },
      ]}
    >
      <svg viewBox="0 0 380 130" className="w-full h-auto select-none" role="img" aria-label="Git Rebase 提交图重放">
        <path d="M40 46 H130 M40 46 L130 92 H220" fill="none" stroke="#475569" strokeWidth="2" />
        {active > 0 && (
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            d={`M130 46 H${130 + 90 * active}`}
            stroke="#818cf8"
            strokeWidth="2.4"
          />
        )}
        {replayedCommits[active].map((name, index) => (
          <motion.path
            key={name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            d={`M${130 + 90 * index} 92 Q${175 + 90 * index} 92 ${220 + 90 * index} 46`}
            fill="none"
            stroke="#22d3ee"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
        ))}
        {[
          { name: 'A', x: 40, y: 46, color: '#94a3b8' },
          { name: 'B', x: 130, y: 46, color: '#22d3ee' },
          { name: 'C', x: 130, y: 92, color: '#64748b' },
          { name: 'D', x: 220, y: 92, color: '#64748b' },
          ...replayedCommits[active].map((name, index) => ({
            name,
            x: 220 + 90 * index,
            y: 46,
            color: '#a78bfa',
          })),
        ].map(({ name, x, y, color }) => (
          <g key={name}>
            <circle cx={x} cy={y} r="14" fill="#070b18" stroke={color} strokeWidth="2.2" />
            <text x={x} y={y} dy=".35em" textAnchor="middle" fill={color} fontSize="11" fontWeight="700" fontFamily="monospace">
              {name}
            </text>
          </g>
        ))}
        <text x="130" y="18" textAnchor="middle" fill="#22d3ee" fontSize="10.5" fontFamily="monospace">main</text>
        {active > 0 && (
          <text x={130 + 90 * active} y="18" textAnchor="middle" fill="#a78bfa" fontSize="10.5" fontFamily="monospace">
            feature (新)
          </text>
        )}
        <text x="175" y="120" textAnchor="middle" fill="#64748b" fontSize="10">原分叉提交（重放后回收）</text>
      </svg>
    </VisualizerFrame>
  );
}

export function GitRebaseLevel2() {
  const [active, setActive] = useState(0);
  const cases = [
    { label: '重放 C (不同文件)', ranges: [[10, 20], [10, 15]] as [[number, number], [number, number]], shared: false, result: 'CLEAN', summary: '提交 C 修改 reader.ts，与目标分支改动 parser.ts 无交集，顺畅通过。' },
    { label: '重放 D (重叠冲突)', ranges: [[10, 20], [18, 25]] as [[number, number], [number, number]], shared: true, result: 'CONFLICT (L18-20)', summary: '提交 D 改动 parser.ts 18–25 行，与目标分支 10–20 行重叠，需暂停手工解冲突。' },
    { label: '重放 E (错开行号)', ranges: [[10, 20], [30, 35]] as [[number, number], [number, number]], shared: true, result: 'CLEAN', summary: '同一文件但改动尾部 30–35 行，区间无重叠，可自动重放。' },
  ];
  const cur = cases[active];

  return (
    <VisualizerFrame
      title="Rebase 逐提交冲突预测器"
      subtitle="按重放队列顺序逐个比对每个待重放提交与目标分支累计改动的文件行区间。"
      badge="逐提交区间检测"
      scenarios={cases.map((c) => ({ label: c.label, summary: c.summary }))}
      activeScenario={active}
      onScenarioChange={setActive}
      metrics={[
        { label: '当前检测提交', value: cur.label.split(' ')[0] + ' ' + cur.label.split(' ')[1], tone: 'cyan' },
        { label: '预测结果', value: cur.result, tone: active === 1 ? 'rose' : 'emerald' },
      ]}
    >
      <Intervals ranges={cur.ranges} sharedFile={cur.shared} />
    </VisualizerFrame>
  );
}
