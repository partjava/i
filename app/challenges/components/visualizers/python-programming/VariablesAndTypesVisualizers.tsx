'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：变量与数据类型

// L1: 带类型校验的配置值解析器
export const ConfigTypeParserVisualizer: React.FC = () => {
  const [step, setStep] = useState(0);
  const cases = [
    {
      raw: '"true"',
      target: 'bool',
      stages: ['strip()', 'lower() == "true"', 'True'],
      outType: 'bool',
      tone: 'emerald' as VisualizerTone,
      summary: '字符串 "true"/"1"/"yes" 经规范化清理后安全转换为布尔 True。',
    },
    {
      raw: '"4200"',
      target: 'int',
      stages: ['strip()', 'int("4200")', '4200'],
      outType: 'int',
      tone: 'cyan' as VisualizerTone,
      summary: '整数校验先检查负号与纯数字字符，再调用 int() 构造整型对象。',
    },
    {
      raw: '"3.14f"',
      target: 'float',
      stages: ['strip()', 'ValueError!', 'Fallback: default'],
      outType: 'float?',
      tone: 'rose' as VisualizerTone,
      summary: '含非法后缀 "f" 触发 ValueError，捕获异常并回退安全默认值。',
    },
  ];
  const cur = cases[step];
  return (
    <VisualizerFrame
      title="配置值类型解析状态槽"
      subtitle="从原始文本到 Python 运行时强类型对象的校验转换链"
      badge="parse_config_value"
      scenarios={cases.map((c) => ({ label: `${c.raw} → ${c.target}`, summary: c.summary }))}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: '输入字面量', value: cur.raw, tone: 'slate' },
        { label: '目标类型', value: cur.target, tone: 'indigo' },
        { label: '解析输出', value: `${cur.stages[2]} (${cur.outType})`, tone: cur.tone },
      ]}
    >
      <InteractiveMemoryCanvas
        ariaLabel="配置类型解析阶段图"
        tracks={[
          {
            name: '解析流水线',
            slots: [
              { label: cur.raw, sublabel: 'str 输入', tone: 'slate' },
              { label: cur.stages[0], sublabel: '去空白', tone: 'indigo' },
              { label: cur.stages[1], sublabel: '校验/转换', tone: cur.tone },
              { label: cur.stages[2], sublabel: cur.outType, tone: cur.tone, pointer: 'OUT' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 括号匹配校验器
export const BracketMatchVisualizer: React.FC = () => {
  const [step, setStep] = useState(0);
  const expr = '({[]})';
  const trace = [
    { stack: ['('], ch: '(', action: '入栈 (', tone: 'cyan' as VisualizerTone, idx: 0 },
    { stack: ['(', '{'], ch: '{', action: '入栈 {', tone: 'indigo' as VisualizerTone, idx: 1 },
    { stack: ['(', '{', '['], ch: '[', action: '入栈 [', tone: 'amber' as VisualizerTone, idx: 2 },
    { stack: ['(', '{'], ch: ']', action: '匹配 [ 弹出', tone: 'emerald' as VisualizerTone, idx: 3 },
    { stack: ['('], ch: '}', action: '匹配 { 弹出', tone: 'emerald' as VisualizerTone, idx: 4 },
    { stack: [], ch: ')', action: '匹配 ( 栈空✓', tone: 'emerald' as VisualizerTone, idx: 5 },
  ];
  const cur = trace[step];
  return (
    <VisualizerFrame
      title="LIFO 栈括号匹配动态推演"
      subtitle="左括号压栈，右括号校验栈顶配对并弹出"
      badge="is_valid"
      scenarios={trace.map((t, i) => ({
        label: `第${i + 1}步 '${t.ch}'`,
        summary: `读取字符 '${t.ch}'：${t.action}，当前栈深度 ${t.stack.length}。`,
      }))}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: '当前字符', value: `'${cur.ch}' (idx=${cur.idx})`, tone: 'cyan' },
        { label: '栈操作', value: cur.action, tone: cur.tone },
        { label: '栈深度', value: `${cur.stack.length}`, tone: 'indigo' },
      ]}
    >
      <InteractiveMemoryCanvas
        ariaLabel="括号匹配栈内存槽"
        tracks={[
          {
            name: '输入串',
            slots: expr.split('').map((c, i) => ({
              label: c,
              sublabel: `[${i}]`,
              tone: i === cur.idx ? 'cyan' : i < cur.idx ? 'emerald' : 'slate',
              pointer: i === cur.idx ? 'PTR' : undefined,
            })),
          },
          {
            name: 'Stack栈',
            slots:
              cur.stack.length > 0
                ? cur.stack.map((s, i) => ({
                    label: s,
                    sublabel: i === cur.stack.length - 1 ? 'TOP' : `#${i}`,
                    tone: i === cur.stack.length - 1 ? 'amber' : 'indigo',
                    pointer: i === cur.stack.length - 1 ? 'TOP' : undefined,
                  }))
                : [{ label: 'EMPTY', sublabel: '全匹配完成', tone: 'emerald' }],
          },
        ]}
      />
    </VisualizerFrame>
  );
};
