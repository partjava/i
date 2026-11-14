'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

export function GitCommitPushLevel1() {
  const [active, setActive] = useState(0);
  const files = [
    { file: 'src/parser.test.ts', bucket: 'test', summary: '命中 *.test.* 模式 → 归入单元测试提交批次。' },
    { file: 'docs/setup.md', bucket: 'docs', summary: '位于 docs/ 目录 → 归入文档更新提交批次。' },
    { file: 'package.json', bucket: 'config', summary: '工程元数据文件 → 归入依赖配置提交批次。' },
    { file: 'src/parser.ts', bucket: 'code', summary: '核心源码逻辑 → 归入业务功能提交批次。' },
  ];
  const cur = files[active];

  return (
    <VisualizerFrame
      title="原子提交批次路由规划器"
      subtitle="按路径与扩展名规则将混杂工作区改动自动分流至语义独立的原子 Commit 批次。"
      badge="变更路由 DAG"
      scenarios={files.map((f) => ({ label: f.bucket.toUpperCase(), summary: f.summary }))}
      activeScenario={active}
      onScenarioChange={setActive}
      metrics={[
        { label: '当前变更文件', value: cur.file, tone: 'cyan' },
        { label: '分配提交批次', value: `chore/feat(${cur.bucket})`, tone: 'emerald' },
      ]}
    >
      <InteractiveGraphCanvas
        height={175}
        nodes={[
          { id: 'in', x: 74, y: 86, label: cur.file, shape: 'pill', tone: 'cyan', active: true },
          { id: 'b0', x: 312, y: 30, label: 'batch: test', shape: 'pill', tone: active === 0 ? 'emerald' : 'slate', active: active === 0 },
          { id: 'b1', x: 312, y: 68, label: 'batch: docs', shape: 'pill', tone: active === 1 ? 'emerald' : 'slate', active: active === 1 },
          { id: 'b2', x: 312, y: 106, label: 'batch: config', shape: 'pill', tone: active === 2 ? 'emerald' : 'slate', active: active === 2 },
          { id: 'b3', x: 312, y: 144, label: 'batch: code', shape: 'pill', tone: active === 3 ? 'emerald' : 'slate', active: active === 3 },
        ]}
        edges={[
          { from: 'in', to: 'b0', label: '*.test.*', tone: active === 0 ? 'emerald' : 'slate', animated: active === 0 },
          { from: 'in', to: 'b1', label: 'docs/*', tone: active === 1 ? 'emerald' : 'slate', animated: active === 1 },
          { from: 'in', to: 'b2', label: '*.json', tone: active === 2 ? 'emerald' : 'slate', animated: active === 2 },
          { from: 'in', to: 'b3', label: 'default', tone: active === 3 ? 'emerald' : 'slate', animated: active === 3 },
        ]}
      />
    </VisualizerFrame>
  );
}

export function GitCommitPushLevel2() {
  const [squashed, setSquashed] = useState(0);

  return (
    <VisualizerFrame
      title="Git Squash 提交历史压缩整理器"
      subtitle="对比压缩前后 DAG 链条变化：合并 B+C 生成新哈希 BC，并触发后续提交 D 重算父哈希为 D′。"
      badge="提交链表重组"
      scenarios={[
        { label: '压缩前 (4 个提交)', summary: '原始历史包含碎提交 B（写解析）和 C（修笔误），父提交链为 A ← B ← C ← D。' },
        { label: 'Squash B+C 后 (3 个提交)', summary: 'B 与 C 合并为干净的 BC；由于父提交 SHA-1 改变，D 也会重新生成新提交 D′。' },
      ]}
      activeScenario={squashed}
      onScenarioChange={setSquashed}
      metrics={[
        { label: '压缩前后提交数', value: squashed ? '4 → 3 个' : '4 个', tone: 'cyan' },
        { label: 'D 的父提交哈希', value: squashed ? 'BC (已重算 D′)' : 'C (原始 D)', tone: squashed ? 'indigo' : 'slate' },
      ]}
    >
      <InteractiveGraphCanvas
        height={160}
        nodes={
          squashed === 0
            ? [
                { id: 'A', x: 54, y: 80, label: 'A', sublabel: 'init', shape: 'circle', radius: 18, tone: 'cyan' },
                { id: 'B', x: 148, y: 80, label: 'B', sublabel: 'wip', shape: 'circle', radius: 18, tone: 'amber', active: true },
                { id: 'C', x: 242, y: 80, label: 'C', sublabel: 'fix', shape: 'circle', radius: 18, tone: 'amber', active: true },
                { id: 'D', x: 338, y: 80, label: 'D', sublabel: 'docs', shape: 'circle', radius: 18, tone: 'indigo' },
              ]
            : [
                { id: 'A', x: 64, y: 80, label: 'A', sublabel: 'init', shape: 'circle', radius: 18, tone: 'cyan' },
                { id: 'BC', x: 196, y: 80, label: 'BC', sublabel: 'squash', shape: 'circle', radius: 22, tone: 'emerald', active: true },
                { id: 'Dp', x: 328, y: 80, label: 'D′', sublabel: 're-parent', shape: 'circle', radius: 18, tone: 'indigo', active: true },
              ]
        }
        edges={
          squashed === 0
            ? [
                { from: 'A', to: 'B', tone: 'cyan' },
                { from: 'B', to: 'C', tone: 'amber', animated: true },
                { from: 'C', to: 'D', tone: 'indigo' },
              ]
            : [
                { from: 'A', to: 'BC', tone: 'cyan', animated: true },
                { from: 'BC', to: 'Dp', tone: 'emerald', animated: true },
              ]
        }
      />
    </VisualizerFrame>
  );
}
