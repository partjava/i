'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveMemoryCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：Set 集合

// L1: 权限交集与越权检测器
export const PermissionSetDiffVisualizer: React.FC = () => {
  const [op, setOp] = useState(0);
  const ops = [
    { label: '交集 (&) 合规权限', desc: '实际拥有 ∩ 角色允许 = {read, write}', tone: 'emerald' as VisualizerTone, hi: 'both' },
    { label: '差集 (-) 越权风险', desc: '实际拥有 - 角色允许 = {drop_db} 🚨', tone: 'rose' as VisualizerTone, hi: 'left' },
    { label: '差集 (-) 缺失权限', desc: '角色允许 - 实际拥有 = {export}', tone: 'amber' as VisualizerTone, hi: 'right' },
  ];
  const cur = ops[op];
  return (
    <VisualizerFrame
      title="Set 集合维恩图与越权权限审计"
      subtitle="O(1) 哈希集合运算快速定位越权项 (user - allowed)"
      badge="analyze_permissions"
      scenarios={ops.map((o) => ({ label: o.label, summary: o.desc }))}
      activeScenario={op}
      onScenarioChange={setOp}
      metrics={[
        { label: '集合表达式', value: op === 0 ? 'user & allowed' : op === 1 ? 'user - allowed' : 'allowed - user', tone: cur.tone },
        { label: '审计结论', value: cur.desc.split('= ')[1], tone: cur.tone },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-4, 4]}
        domainY={[-2.5, 2.5]}
        height={195}
        circles={[
          { cx: -1.0, cy: 0, r: 1.85, tone: cur.hi === 'left' ? 'rose' : 'cyan', label: '实际拥有 User' },
          { cx: 1.0, cy: 0, r: 1.85, tone: cur.hi === 'right' ? 'amber' : 'indigo', label: '角色允许 Allowed' },
        ]}
        points={[
          { x: -2.0, y: 0.2, label: 'drop_db', tone: cur.hi === 'left' ? 'rose' : 'slate', radius: 6 },
          { x: 0, y: 0.3, label: 'read', tone: cur.hi === 'both' ? 'emerald' : 'slate', radius: 6 },
          { x: 0, y: -0.4, label: 'write', tone: cur.hi === 'both' ? 'emerald' : 'slate', radius: 6 },
          { x: 2.0, y: 0, label: 'export', tone: cur.hi === 'right' ? 'amber' : 'slate', radius: 6 },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 集合运算
export const SetOperationsVisualizer: React.FC = () => {
  const [op, setOp] = useState(0);
  const A = [1, 2, 3];
  const B = [2, 3, 4];
  const ops = [
    { name: '并集 A | B', res: [1, 2, 3, 4], tone: 'cyan' as VisualizerTone },
    { name: '交集 A & B', res: [2, 3], tone: 'emerald' as VisualizerTone },
    { name: '对称差 A ^ B', res: [1, 4], tone: 'amber' as VisualizerTone },
  ];
  const cur = ops[op];
  return (
    <VisualizerFrame
      title="Set 基本集合运算代数对比"
      subtitle="演示无序去重集合的并集、交集与对称差"
      badge="set_operations"
      scenarios={ops.map((o) => ({ label: o.name, summary: `${o.name} = {${o.res.join(', ')}}` }))}
      activeScenario={op}
      onScenarioChange={setOp}
      metrics={[{ label: cur.name, value: `{${cur.res.join(', ')}}`, tone: cur.tone }]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          { name: '集合 A', slots: A.map((x) => ({ label: `${x}`, tone: 'cyan' })) },
          { name: '集合 B', slots: B.map((x) => ({ label: `${x}`, tone: 'indigo' })) },
          { name: '结果集', slots: cur.res.map((x) => ({ label: `${x}`, tone: cur.tone, pointer: 'RES' })) },
        ]}
      />
    </VisualizerFrame>
  );
};
