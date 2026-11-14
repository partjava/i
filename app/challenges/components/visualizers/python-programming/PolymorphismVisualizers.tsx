'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：多态

// L1: 多态日志格式化器
export const PolymorphicLogFormatterVisualizer: React.FC = () => {
  const [fmt, setFmt] = useState(0);
  const formats = [
    { name: 'PlainFormatter', out: '[WARN] Disk 90%', tone: 'cyan' as VisualizerTone },
    { name: 'JsonFormatter', out: '{"lvl":"WARN","msg":"Disk 90%"}', tone: 'emerald' as VisualizerTone },
  ];
  const cur = formats[fmt];
  return (
    <VisualizerFrame
      title="多态日志格式化器动态分派 (format)"
      subtitle="调用方只依赖统一的 formatter.format(record)，运行时多态分派不同输出形态"
      badge="LogRecord"
      scenarios={formats.map((f) => ({ label: f.name, summary: `输出效果：${f.out}` }))}
      activeScenario={fmt}
      onScenarioChange={setFmt}
      metrics={[{ label: '动态分派结果', value: cur.out, tone: cur.tone }]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={[
          { id: 'rec', x: 75, y: 82, label: 'LogRecord', sublabel: 'WARN | Disk 90%', tone: 'indigo', shape: 'pill', active: true },
          { id: 'call', x: 200, y: 82, label: 'formatter.format()', sublabel: '多态绑定', tone: 'amber', shape: 'pill', active: true },
          { id: 'p', x: 330, y: 45, label: 'Plain Text', tone: fmt === 0 ? 'cyan' : 'slate', shape: 'pill', active: fmt === 0 },
          { id: 'j', x: 330, y: 120, label: 'JSON Object', tone: fmt === 1 ? 'emerald' : 'slate', shape: 'pill', active: fmt === 1 },
        ]}
        edges={[
          { from: 'rec', to: 'call', tone: 'indigo', animated: true },
          { from: 'call', to: 'p', tone: fmt === 0 ? 'cyan' : 'slate', animated: fmt === 0 },
          { from: 'call', to: 'j', tone: fmt === 1 ? 'emerald' : 'slate', animated: fmt === 1 },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 日志写入器
export const LoggerWriterDuckTypingVisualizer: React.FC = () => {
  const [sink, setSink] = useState(0);
  const sinks = ['ConsoleWriter (stdout)', 'MemoryWriter (list)', 'FileWriter (disk)'];
  return (
    <VisualizerFrame
      title="Logger 鸭子类型输出端插拔"
      subtitle="只要对象实现 write(text) 接口，Logger 即可无缝替换日志目标"
      badge="Logger"
      scenarios={sinks.map((s) => ({ label: s, summary: `Logger.log("ok") 自动调用 ${s}.write(...)。` }))}
      activeScenario={sink}
      onScenarioChange={setSink}
      metrics={[{ label: '激活 Writer', value: sinks[sink], tone: 'emerald' }]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'write() 目标',
            slots: sinks.map((s, i) => ({
              label: s.split(' ')[0],
              sublabel: i === sink ? '已注入生效' : '待命',
              tone: i === sink ? 'emerald' : 'slate',
              pointer: i === sink ? 'ACTIVE' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
