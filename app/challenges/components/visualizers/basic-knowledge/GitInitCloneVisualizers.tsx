'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

export function GitInitCloneLevel1() {
  const [active, setActive] = useState(0);
  const cases = [
    {
      label: '健康仓库',
      hasRemote: true,
      detached: false,
      result: 'HEALTHY',
      summary: '目录存在 .git、已关联远端 origin 且 HEAD 指向 main 分支指针。',
    },
    {
      label: '缺失远端 origin',
      hasRemote: false,
      detached: false,
      result: 'MISSING_REMOTE',
      summary: '本地虽有 .git 和分支，但尚未绑定远端仓库地址，无法 push/pull 协作。',
    },
    {
      label: '游离 HEAD (Detached)',
      hasRemote: true,
      detached: true,
      result: 'DETACHED_HEAD',
      summary: 'HEAD 直接指向某次历史提交哈希而非分支名，新提交容易变成悬空孤儿提交。',
    },
  ];
  const cur = cases[active];

  return (
    <VisualizerFrame
      title="Git 仓库初始化健康检查器"
      subtitle="追踪 HEAD 引用、分支指针与远端 origin 之间的拓扑关系，识别孤立状态。"
      badge="Git 引用拓扑"
      scenarios={cases.map((c) => ({ label: c.label, summary: c.summary }))}
      activeScenario={active}
      onScenarioChange={setActive}
      metrics={[
        { label: '远端 origin', value: cur.hasRemote ? '已配置' : '缺失', tone: cur.hasRemote ? 'emerald' : 'amber' },
        { label: 'HEAD 状态', value: cur.detached ? '游离指向 Commit' : '指向 refs/heads/main', tone: cur.detached ? 'rose' : 'cyan' },
        { label: '健康检查结果', value: cur.result, tone: active === 0 ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={[
          { id: 'head', x: 66, y: 50, label: 'HEAD', shape: 'pill', tone: cur.detached ? 'rose' : 'cyan', active: true },
          { id: 'main', x: 188, y: 50, label: 'main', shape: 'pill', tone: 'indigo', active: !cur.detached },
          { id: 'commit', x: 188, y: 126, label: 'c1a2f3', sublabel: 'Commit', shape: 'circle', radius: 22, tone: 'cyan', active: true },
          { id: 'origin', x: 326, y: 50, label: cur.hasRemote ? 'origin/main' : '无远端', shape: 'pill', tone: cur.hasRemote ? 'emerald' : 'rose', active: cur.hasRemote },
        ]}
        edges={[
          cur.detached
            ? { from: 'head', to: 'commit', label: '直接指向', tone: 'rose', animated: true, curveOffset: -24 }
            : { from: 'head', to: 'main', label: 'ref', tone: 'cyan', animated: true },
          { from: 'main', to: 'commit', tone: 'indigo' },
          { from: 'main', to: 'origin', label: cur.hasRemote ? 'track' : '缺失', tone: cur.hasRemote ? 'emerald' : 'rose', dashed: !cur.hasRemote },
        ]}
      />
    </VisualizerFrame>
  );
}

export function GitInitCloneLevel2() {
  const [active, setActive] = useState(0);
  const branches = [
    {
      label: '已合并分支 (feature-old)',
      merged: true,
      protected: false,
      action: '可安全清理 (git branch -d)',
      tone: 'emerald' as const,
      summary: '分支的所有提交已并入 main，且非受保护分支，可列入安全清理名单。',
    },
    {
      label: '未合并分支 (feature-wip)',
      merged: false,
      protected: false,
      action: '保留 (含独有未合入提交)',
      tone: 'amber' as const,
      summary: '分支先端存在尚未进入 main 的提交，清理将造成工作成果丢失。',
    },
    {
      label: '受保护主干 (main / release)',
      merged: true,
      protected: true,
      action: '强制保留 (受保护)',
      tone: 'indigo' as const,
      summary: '核心保护分支即使合并计数满足条件也绝不允许自动删除。',
    },
  ];
  const cur = branches[active];

  return (
    <VisualizerFrame
      title="Git 过期分支安全清理决策图"
      subtitle="按「是否全部合入主干 → 是否命中保护白名单」双层规则判断分支可否删除。"
      badge="清理决策拓扑"
      scenarios={branches.map((b) => ({ label: b.label, summary: b.summary }))}
      activeScenario={active}
      onScenarioChange={setActive}
      metrics={[
        { label: '合入状态', value: cur.merged ? '已合入 main' : '有独有提交', tone: cur.merged ? 'cyan' : 'amber' },
        { label: '保护规则', value: cur.protected ? '受保护' : '普通分支', tone: cur.protected ? 'indigo' : 'slate' },
        { label: '最终决策', value: cur.action, tone: cur.tone },
      ]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={[
          { id: 'br', x: 72, y: 82, label: cur.label.split(' ')[0], shape: 'pill', tone: 'cyan', active: true },
          { id: 'm', x: 196, y: 82, label: cur.merged ? '已合并 ✓' : '未合并 ✗', shape: 'pill', tone: cur.merged ? 'indigo' : 'amber', active: true },
          { id: 'del', x: 326, y: 46, label: '安全清理', shape: 'pill', tone: active === 0 ? 'emerald' : 'slate', active: active === 0 },
          { id: 'keep', x: 326, y: 120, label: '保留分支', shape: 'pill', tone: active !== 0 ? cur.tone : 'slate', active: active !== 0 },
        ]}
        edges={[
          { from: 'br', to: 'm', tone: 'cyan', animated: true },
          { from: 'm', to: 'del', label: '非保护', tone: active === 0 ? 'emerald' : 'slate', animated: active === 0 },
          { from: 'm', to: 'keep', label: cur.protected ? '受保护' : '未合并', tone: active !== 0 ? cur.tone : 'slate', animated: active !== 0 },
        ]}
      />
    </VisualizerFrame>
  );
}
