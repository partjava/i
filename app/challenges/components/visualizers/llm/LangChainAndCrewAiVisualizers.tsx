'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：LangChain/CrewAI

// L1: LangChain 链式工作流
export const LangChainDagWorkflowVisualizer: React.FC = () => {
  const [step, setStep] = useState(2);
  const stages = ['Prompt', 'LLM 生成', 'OutputParser'];
  return (
    <VisualizerFrame
      title="LCEL 管道运算符串联链式工作流 (Prompt | Model | Parser)"
      subtitle="标准化 Runnable 接口组合可复用节点，统一支持 invoke / batch / stream"
      badge="chain_workflow"
      scenarios={stages.map((s, i) => ({ label: s, summary: `管道执行至 ${s} 阶段。` }))}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[{ label: '当前执行阶段', value: stages[step], tone: 'emerald' }]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={stages.map((s, i) => ({
          id: `lc${i}`,
          x: 72 + i * 128,
          y: 82,
          label: s,
          tone: i <= step ? (i === 2 ? 'emerald' : 'cyan') : 'slate',
          shape: 'pill',
          active: i === step,
        }))}
        edges={[0, 1].map((i) => ({ from: `lc${i}`, to: `lc${i + 1}`, label: '|', tone: i < step ? 'emerald' : 'slate', animated: i < step }))}
      />
    </VisualizerFrame>
  );
};

// L2: Agent 记忆模块
export const AgentMemoryWindowVisualizer: React.FC = () => {
  const [strategy, setStrategy] = useState(1);
  return (
    <VisualizerFrame
      title="Agent 长对话记忆管理：滑动窗口 vs 摘要压缩"
      subtitle="无限拼接历史将爆上下文窗；保留近 N 轮热记忆并把远期历史折叠为紧凑摘要"
      badge="AgentMemory"
      scenarios={[
        { label: '纯滑窗截断 (丢远期设定)', summary: '仅保留最近 2 轮，用户最初提出的约束被窗口挤出遗忘！' },
        { label: '摘要 + 近窗双层记忆 ✓', summary: '远期轮次摘要驻留系统栏 + 最近 N 轮原文保持精准细节！' },
      ]}
      activeScenario={strategy}
      onScenarioChange={setStrategy}
      metrics={[{ label: '远期事实保留', value: strategy ? 'Summary 锚定保留 ✓' : '已截断丢失 ✗', tone: strategy ? 'emerald' : 'rose' }]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'Context 窗口',
            slots: [
              strategy
                ? { label: '远期摘要', sublabel: '用户=架构师', tone: 'emerald' }
                : { label: '[被挤出丢失]', sublabel: 'T1-T4', tone: 'rose' },
              { label: 'T5', sublabel: '热上下文', tone: 'cyan' },
              { label: 'T6 (最新)', sublabel: '热上下文', tone: 'indigo', pointer: 'NOW' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};
