'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMatrixCanvas,
  InteractiveGraphCanvas,
  type MatrixCell,
} from '../shared/VisualizerEngine';

export function PermissionsLevel1() {
  const [active, setActive] = useState(0);
  const presets = [
    { label: '644 (安全配置)', bits: [6, 4, 4], result: 'PASS', desc: '仅 owner 可读写，group 与 others 只读。' },
    { label: '664 (组可写风险)', bits: [6, 6, 4], result: 'VIOLATION (group +w)', desc: 'group 具备写权限 (w)，违反配置文件只读策略。' },
    { label: '757 (全局可写危)', bits: [7, 5, 7], result: 'VIOLATION (others +w)', desc: 'others 同时具备 rwx 全部权限，存在越权篡改高危风险。' },
  ];
  const cur = presets[active];

  const rows: MatrixCell[][] = cur.bits.map((val, roleIdx) =>
    [4, 2, 1].map((mask) => {
      const hasBit = (val & mask) !== 0;
      const risky = hasBit && mask === 2 && roleIdx > 0;
      return {
        value: hasBit ? '1' : '0',
        highlight: risky ? 'rose' : hasBit ? 'cyan' : 'none',
      };
    })
  );

  return (
    <VisualizerFrame
      title="Unix 9-Bit 权限策略审计矩阵"
      subtitle="按 owner / group / others 三组权限位 (r=4, w=2, x=1) 逐位审计越权写权限。"
      badge="9-bit 权限矩阵"
      scenarios={presets.map((p) => ({ label: p.label, summary: p.desc }))}
      activeScenario={active}
      onScenarioChange={setActive}
      metrics={[
        { label: '八进制模式', value: cur.bits.join(''), tone: 'cyan' },
        { label: '审计判定', value: cur.result, tone: active === 0 ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveMatrixCanvas
        left={{
          title: '权限比特矩阵 (r / w / x)',
          rowLabels: ['owner', 'group', 'others'],
          colLabels: ['r (4)', 'w (2)', 'x (1)'],
          rows,
        }}
      />
    </VisualizerFrame>
  );
}

export function PermissionsLevel2() {
  const [active, setActive] = useState(0);
  const roles = [
    {
      label: 'viewer (无授权)',
      scope: 'DENY',
      risk: '安全',
      summary: 'viewer 不在 sudoers 规则列表内，提权请求直接被拒绝。',
    },
    {
      label: 'operator (最小权限)',
      scope: '仅状态查询',
      risk: '低风险 (受控)',
      summary: '仅放行只读监控命令（如 systemctl status），符合最小权限原则。',
    },
    {
      label: 'admin (ALL=(ALL) ALL)',
      scope: '任意 root 命令',
      risk: '高风险 (需审计)',
      summary: '拥有全命令无限制 sudo 权限，属于高危条目需重点审计。',
    },
  ];
  const cur = roles[active];

  return (
    <VisualizerFrame
      title="sudo 权限策略树状审计"
      subtitle="追踪不同用户角色经过 sudoers 匹配规则后的命令放行边界与审计等级。"
      badge="权限决策路径"
      scenarios={roles.map((r) => ({ label: r.label, summary: r.summary }))}
      activeScenario={active}
      onScenarioChange={setActive}
      metrics={[
        { label: '授权命令范围', value: cur.scope, tone: active === 2 ? 'amber' : active === 1 ? 'cyan' : 'slate' },
        { label: '审计等级', value: cur.risk, tone: active === 2 ? 'rose' : 'emerald' },
      ]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={[
          { id: 'u', x: 64, y: 82, label: cur.label.split(' ')[0], shape: 'pill', tone: 'cyan', active: true },
          { id: 'rule', x: 196, y: 82, label: 'sudoers 策略', shape: 'pill', tone: 'indigo', active: true },
          { id: 'out1', x: 334, y: 36, label: 'DENY', shape: 'pill', tone: active === 0 ? 'amber' : 'slate', active: active === 0 },
          { id: 'out2', x: 334, y: 82, label: '指定只读命令', shape: 'pill', tone: active === 1 ? 'emerald' : 'slate', active: active === 1 },
          { id: 'out3', x: 334, y: 128, label: 'ALL (高危审计)', shape: 'pill', tone: active === 2 ? 'rose' : 'slate', active: active === 2 },
        ]}
        edges={[
          { from: 'u', to: 'rule', tone: 'cyan', animated: true },
          { from: 'rule', to: 'out1', tone: active === 0 ? 'amber' : 'slate', animated: active === 0 },
          { from: 'rule', to: 'out2', tone: active === 1 ? 'emerald' : 'slate', animated: active === 1 },
          { from: 'rule', to: 'out3', tone: active === 2 ? 'rose' : 'slate', animated: active === 2 },
        ]}
      />
    </VisualizerFrame>
  );
}
