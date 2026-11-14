'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

// 章节：工具调用 (Tool Use)

// L1: 工具调用执行器
export const ToolUseExecutorVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <VisualizerFrame
      title="LLM JSON Tool Use 参数提取与多轮补全闭环"
      subtitle="模型输出确定性 JSON 函数调用请求，本地运行时执行并把工具回执拼入对话历史"
      badge="tool_use"
      scenarios={[
        { label: '1. 模型输出工具调用意图', summary: '{"name":"calc_tax","args":{"income":15000}}' },
        { label: '2. 回传 ToolMessage 生成终答 ✓', summary: '注入 {"tax": 790} 后，模型回答用户真实税后结果。' },
      ]}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[{ label: '幻觉抑制', value: '外部事实精准落地 ✓', tone: 'emerald' }]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={[
          { id: 'u', x: 65, y: 82, label: 'User Query', tone: 'indigo', shape: 'pill', active: true },
          { id: 'm', x: 195, y: 50, label: 'LLM ToolCall', tone: 'cyan', shape: 'pill', active: true },
          { id: 't', x: 195, y: 125, label: 'calc_tax()=790', tone: 'amber', shape: 'pill', active: step === 1 },
          { id: 'a', x: 335, y: 82, label: 'Final Answer', tone: step ? 'emerald' : 'slate', shape: 'pill', active: step === 1 },
        ]}
        edges={[
          { from: 'u', to: 'm', tone: 'indigo', animated: true },
          { from: 'm', to: 't', label: 'Args', tone: 'amber', animated: step === 1 },
          { from: 't', to: 'a', label: 'Observation', tone: 'emerald', animated: step === 1 },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: RAG 检索增强生成
export const RagPipelineVisualizer: React.FC = () => {
  const [topK, setTopK] = useState(3);
  return (
    <VisualizerFrame
      title="RAG (检索增强生成) 双阶段 Recall + Context Grounding"
      subtitle="用实时检索到的私有企业文档锚定上下文，抑制静态预训练知识的过时与编造"
      badge="rag_pipeline"
      sliders={[{ label: '注入参考文档块 Top-K', value: topK, min: 1, max: 5, step: 1, onChange: setTopK }]}
      metrics={[
        { label: '召回片段数', value: `${topK} Chunks`, tone: 'cyan' },
        { label: '有据可依引用率', value: '100% Grounded ✓', tone: 'emerald' },
      ]}
    >
      <InteractiveGraphCanvas
        height={170}
        nodes={[
          { id: 'q', x: 65, y: 85, label: 'Query 向量', tone: 'cyan', shape: 'pill', active: true },
          { id: 'vdb', x: 185, y: 48, label: `VectorDB Top-${topK}`, tone: 'indigo', shape: 'pill', active: true },
          { id: 'ctx', x: 185, y: 125, label: 'Prompt 上下文组装', tone: 'amber', shape: 'pill', active: true },
          { id: 'gen', x: 330, y: 85, label: '带引用回答 ✓', tone: 'emerald', shape: 'pill', active: true },
        ]}
        edges={[
          { from: 'q', to: 'vdb', label: 'ANN 检索', tone: 'cyan', animated: true },
          { from: 'vdb', to: 'ctx', label: `${topK} 块`, tone: 'indigo', animated: true },
          { from: 'ctx', to: 'gen', label: 'Grounded 生成', tone: 'emerald', animated: true },
        ]}
      />
    </VisualizerFrame>
  );
};
