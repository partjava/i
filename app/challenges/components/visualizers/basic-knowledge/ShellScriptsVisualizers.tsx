'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

export function ShellScriptsLevel1() {
  const [active, setActive] = useState(0);
  const modes = [
    {
      label: '默认模式 (无 pipefail)',
      codes: [2, 1, 0],
      finalCode: 0,
      pipefail: false,
      summary: '普通模式仅返回管道最右端 wc 命令的退出码 0，掩盖了上游 cat 和 grep 的失败。',
    },
    {
      label: '开启 set -o pipefail',
      codes: [2, 1, 0],
      finalCode: 1,
      pipefail: true,
      summary: '开启 pipefail 后，从右往左扫描第一个非零退出码（grep 返回 1），精准暴露故障。',
    },
    {
      label: '全管道成功',
      codes: [0, 0, 0],
      finalCode: 0,
      pipefail: true,
      summary: '所有阶段均返回 0，无论是否开启 pipefail 最终退出码都为 0。',
    },
  ];
  const cur = modes[active];

  return (
    <VisualizerFrame
      title="Shell 管道退出码与 pipefail 保护"
      subtitle="观察命令链 cat | grep | wc 中各环节退出码在普通模式与 pipefail 下的传递规则。"
      badge="Pipeline 退出码流"
      scenarios={modes.map((m) => ({ label: m.label, summary: m.summary }))}
      activeScenario={active}
      onScenarioChange={setActive}
      metrics={[
        { label: '各阶段 Exit Code', value: `[${cur.codes.join(', ')}]`, tone: 'cyan' },
        { label: 'pipefail 开关', value: cur.pipefail ? 'ON' : 'OFF', tone: 'indigo' },
        { label: '脚本最终返回码', value: `${cur.finalCode}`, tone: cur.finalCode === 0 ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveGraphCanvas
        height={138}
        nodes={[
          { id: 'c1', x: 58, y: 68, label: 'cat', sublabel: `exit ${cur.codes[0]}`, shape: 'pill', tone: cur.codes[0] ? 'amber' : 'emerald', active: cur.codes[0] !== 0 },
          { id: 'c2', x: 162, y: 68, label: 'grep', sublabel: `exit ${cur.codes[1]}`, shape: 'pill', tone: cur.codes[1] ? 'rose' : 'emerald', active: cur.pipefail && cur.codes[1] !== 0 },
          { id: 'c3', x: 264, y: 68, label: 'wc', sublabel: `exit ${cur.codes[2]}`, shape: 'pill', tone: cur.codes[2] ? 'rose' : 'cyan', active: !cur.pipefail },
          { id: 'res', x: 356, y: 68, label: `=> ${cur.finalCode}`, sublabel: '返回码', shape: 'circle', radius: 22, tone: cur.finalCode === 0 ? 'emerald' : 'rose', active: true },
        ]}
        edges={[
          { from: 'c1', to: 'c2', label: 'stdout', tone: 'cyan', animated: true },
          { from: 'c2', to: 'c3', label: 'stdout', tone: 'cyan', animated: true },
          { from: 'c3', to: 'res', tone: cur.finalCode === 0 ? 'emerald' : 'rose', animated: true },
        ]}
      />
    </VisualizerFrame>
  );
}

export function ShellScriptsLevel2() {
  const [step, setStep] = useState(0);
  const states = [
    {
      label: '写入中 (60 MiB < 100 MiB)',
      current: { label: 'app.log (60M)', sublabel: '未超阈值', tone: 'cyan' as const },
      archives: [{ label: 'app.log.1 (旧)', sublabel: '保留', tone: 'indigo' as const }],
      action: '继续追加当前文件，不触发轮转',
    },
    {
      label: '超阈值 (120 MiB → 触发轮转)',
      current: { label: '新 app.log (0M)', sublabel: '重新创建', tone: 'emerald' as const, pointer: 'NEW' },
      archives: [
        { label: 'app.log.1', sublabel: '原 app.log', tone: 'cyan' as const },
        { label: 'app.log.2', sublabel: '原 .1 顺延', tone: 'indigo' as const },
      ],
      action: '旧 .1 后移为 .2，原 app.log 归档为 .1 并新建空日志',
    },
    {
      label: '归档上限淘汰 (最多保留 2 份)',
      current: { label: '新 app.log (0M)', sublabel: '重新创建', tone: 'emerald' as const },
      archives: [
        { label: 'app.log.1', sublabel: '原 app.log', tone: 'cyan' as const },
        { label: 'app.log.2', sublabel: '原 .1 顺延', tone: 'indigo' as const },
        { label: '旧 .2 已删除', sublabel: '超出 max=2', tone: 'rose' as const, pointer: 'DROP' },
      ],
      action: '超过最大归档数 2 份，最旧归档 .2 被清理淘汰',
    },
  ];
  const cur = states[step];

  return (
    <VisualizerFrame
      title="日志轮转 (Logrotate) 滚动队列"
      subtitle="轮转阈值 100 MiB，最多保留 2 份历史归档，演示索引顺延与最旧归档淘汰。"
      badge="滚动归档槽位"
      scenarios={states.map((s) => ({ label: s.label.split(' ')[0], summary: s.action }))}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: '轮转阈值', value: '100 MiB', tone: 'amber' },
        { label: '最大保留份数', value: '2 份', tone: 'indigo' },
        { label: '当前状态', value: cur.label.split(' ')[0], tone: 'cyan' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          { name: '活跃写入文件', slots: [cur.current] },
          { name: '历史归档链', slots: cur.archives },
        ]}
      />
    </VisualizerFrame>
  );
}
