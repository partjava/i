'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：Few-shot提示

// L1: Few-shot 示例选择器
export const FewShotSelectorVisualizer: React.FC = () => {
  const [kShots, setKShots] = useState(2);
  const pool = [
    { name: '例1: SQL语法纠错', sim: 0.92 },
    { name: '例2: Join性能优化', sim: 0.85 },
    { name: '例3: 正则抽取', sim: 0.41 },
    { name: '例4: 诗词翻译', sim: 0.12 },
  ];
  return (
    <VisualizerFrame
      title="动态相似性 Few-Shot 示例检索器"
      subtitle="计算 Query 与示例库向量相似度，仅按 Top-K 注入最相关的示范样例控制上下文预算"
      badge="few_shot_select"
      sliders={[{ label: '动态注入示例数 K', value: kShots, min: 1, max: 3, step: 1, onChange: setKShots }]}
      metrics={[
        { label: '已选样例', value: pool.slice(0, kShots).map((p) => p.name.split(':')[0]).join(', '), tone: 'emerald' },
        { label: '最低入选相似度', value: pool[kShots - 1].sim.toFixed(2), tone: 'cyan' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '示例池 (按相似度排序)',
            slots: pool.map((p, i) => ({
              label: p.name.split(': ')[1],
              sublabel: `sim=${p.sim.toFixed(2)}`,
              tone: i < kShots ? 'emerald' : 'slate',
              pointer: i < kShots ? 'PROMPT' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: Prompt 模板引擎
export const PromptTemplateEngineVisualizer: React.FC = () => {
  const [strict, setStrict] = useState(1);
  return (
    <VisualizerFrame
      title="安全 Prompt 模板插值与占位符契约校验"
      subtitle="检测未绑定变量与潜在大括号注入，在构造系统/用户消息前保证变量契约完整"
      badge="prompt_template"
      scenarios={[
        { label: '缺少变量 {context}', summary: '模板需要 ["role", "context"]，缺参直接抛出 KeyError 拦截脏请求！' },
        { label: '完整安全渲染 ✓', summary: '变量转义并填充进模板槽位，生成结构化 Messages 数组。' },
      ]}
      activeScenario={strict}
      onScenarioChange={setStrict}
      metrics={[
        { label: '模板契约状态', value: strict ? 'PASS 完整渲染 ✓' : 'MISSING {context} ✗', tone: strict ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '模板插值槽',
            slots: [
              { label: '{role}', sublabel: '="架构师"', tone: 'cyan' },
              { label: '{context}', sublabel: strict ? '="微服务鉴权"' : 'MISSING!', tone: strict ? 'emerald' : 'rose', pointer: strict ? 'OK' : 'ERR' },
              { label: 'Messages[]', sublabel: strict ? '发送给 LLM' : '已阻断', tone: strict ? 'indigo' : 'rose' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};
