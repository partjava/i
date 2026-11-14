'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

export function LinuxCommandsLevel1() {
  const [active, setActive] = useState(0);
  const scenarios = [
    {
      label: '普通文件名',
      filename: 'app.log',
      risk: 'SAFE',
      summary: '参数数组明确边界，grep 将 app.log 视为目标文件路径。',
    },
    {
      label: '包含空格',
      filename: 'app one.log',
      risk: 'SAFE (无拆分)',
      summary: '不经过 Shell 字符串拼接时，空格不会导致文件名被拆成两个参数。',
    },
    {
      label: '以横杠开头 (-notes.log)',
      filename: '-notes.log',
      risk: '需 -- 隔离',
      summary: '在参数列表中添加 "--" 终止选项解析，防止 -notes.log 被误解析为 CLI 开关。',
    },
  ];
  const cur = scenarios[active];

  return (
    <VisualizerFrame
      title="安全批处理命令参数隔离器"
      subtitle="展示 execve argv[] 槽位边界与 '--' 选项终止符如何防止参数注入。"
      badge="argv[] 内存槽位"
      scenarios={scenarios.map((s) => ({ label: s.label, summary: s.summary }))}
      activeScenario={active}
      onScenarioChange={setActive}
      metrics={[
        { label: '目标文件名', value: cur.filename, tone: 'cyan' },
        { label: '注入风险评估', value: cur.risk, tone: active === 2 ? 'amber' : 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'argv[] 向量',
            slots: [
              { label: 'grep', sublabel: 'argv[0]', tone: 'indigo' },
              { label: '-e', sublabel: 'argv[1]', tone: 'cyan' },
              { label: 'ERROR', sublabel: 'argv[2]', tone: 'cyan' },
              { label: '--', sublabel: '终止标志', tone: 'amber', pointer: 'SEP' },
              { label: cur.filename, sublabel: '纯路径', tone: 'emerald' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
}

export function LinuxCommandsLevel2() {
  const [active, setActive] = useState(0);
  const modes = [
    {
      label: '仅匹配 *.log',
      pattern: '*.log',
      keyword: '(无内容过滤)',
      appMatch: true,
      dbMatch: true,
      summary: '文件名通配符阶段筛选出 app.log 和 db.log，跳过 notes.txt。',
    },
    {
      label: '搜索 ERROR',
      pattern: '*.log',
      keyword: 'ERROR',
      appMatch: true,
      dbMatch: false,
      summary: '双阶段管道：先按 *.log 过滤文件，再扫描内部文本，仅 app.log 命中 ERROR。',
    },
    {
      label: '搜索 DEBUG (空结果)',
      pattern: '*.log',
      keyword: 'DEBUG',
      appMatch: false,
      dbMatch: false,
      summary: '没有任何日志文件包含 DEBUG，最终管道返回空列表。',
    },
  ];
  const cur = modes[active];

  return (
    <VisualizerFrame
      title="批量文件与内容检索管道"
      subtitle="双阶段过滤拓扑：Stage 1 文件名通配符筛选 → Stage 2 文本内容匹配。"
      badge="双阶段过滤 DAG"
      scenarios={modes.map((m) => ({ label: m.label, summary: m.summary }))}
      activeScenario={active}
      onScenarioChange={setActive}
      metrics={[
        { label: '文件名模式', value: cur.pattern, tone: 'cyan' },
        { label: '关键字过滤', value: cur.keyword, tone: 'indigo' },
        {
          label: '命中文件数',
          value: `${(cur.appMatch ? 1 : 0) + (cur.dbMatch ? 1 : 0)} 个`,
          tone: cur.appMatch || cur.dbMatch ? 'emerald' : 'amber',
        },
      ]}
    >
      <InteractiveGraphCanvas
        height={175}
        nodes={[
          { id: 'f1', x: 64, y: 40, label: 'app.log', shape: 'pill', tone: 'cyan', active: true },
          { id: 'f2', x: 64, y: 92, label: 'notes.txt', shape: 'pill', tone: 'slate' },
          { id: 'f3', x: 64, y: 144, label: 'db.log', shape: 'pill', tone: 'cyan', active: true },
          { id: 'glob', x: 200, y: 92, label: '*.log', sublabel: 'Stage 1', shape: 'pill', tone: 'indigo', active: true },
          {
            id: 'r1',
            x: 334,
            y: 52,
            label: cur.appMatch ? 'app.log ✓' : 'app.log ✗',
            shape: 'pill',
            tone: cur.appMatch ? 'emerald' : 'slate',
            active: cur.appMatch,
          },
          {
            id: 'r2',
            x: 334,
            y: 132,
            label: cur.dbMatch ? 'db.log ✓' : 'db.log ✗',
            shape: 'pill',
            tone: cur.dbMatch ? 'emerald' : 'slate',
            active: cur.dbMatch,
          },
        ]}
        edges={[
          { from: 'f1', to: 'glob', tone: 'cyan', animated: true },
          { from: 'f2', to: 'glob', tone: 'slate', dashed: true },
          { from: 'f3', to: 'glob', tone: 'cyan', animated: true },
          { from: 'glob', to: 'r1', label: cur.keyword, tone: cur.appMatch ? 'emerald' : 'slate', animated: cur.appMatch },
          { from: 'glob', to: 'r2', label: cur.keyword, tone: cur.dbMatch ? 'emerald' : 'slate', animated: cur.dbMatch },
        ]}
      />
    </VisualizerFrame>
  );
}
