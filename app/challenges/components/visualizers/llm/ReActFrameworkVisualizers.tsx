'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：ReAct框架

// L1: ReAct 推理-行动框架
export const ReactLoopVisualizer: React.FC = () => {
  const [phase, setPhase] = useState(2);
  const phases = [
    { name: 'Thought', desc: '模型分析：“需要查询今天北京气温才能穿衣建议。”' },
    { name: 'Action', desc: '生成结构化工具调用：get_weather(city="Beijing")' },
    { name: 'Observation', desc: '外部环境返回：{"temp": 18, "sky": "晴"}，注入上下文继续推理！' },
  ];
  return (
    <VisualizerFrame
      title="ReAct (Thought → Action → Observation) 闭环智能体"
      subtitle="交替产生内部语言思考与外部工具动作，把真实世界反馈写入轨迹再决定最终回答"
      badge="react_agent"
      scenarios={phases.map((p) => ({ label: p.name, summary: p.desc }))}
      activeScenario={phase}
      onScenarioChange={setPhase}
      metrics={[{ label: '当前循环阶段', value: phases[phase].name, tone: 'cyan' }]}
    >
      <InteractiveGraphCanvas
        height={175}
        nodes={[
          { id: 't', x: 95, y: 50, label: 'Thought (思考)', tone: phase === 0 ? 'cyan' : 'indigo', shape: 'pill', active: phase === 0 },
          { id: 'a', x: 300, y: 50, label: 'Action (调用工具)', tone: phase === 1 ? 'amber' : 'indigo', shape: 'pill', active: phase === 1 },
          { id: 'o', x: 200, y: 135, label: 'Observation (工具结果)', tone: phase === 2 ? 'emerald' : 'slate', shape: 'pill', active: phase === 2 },
        ]}
        edges={[
          { from: 't', to: 'a', label: '调用指令', tone: 'amber', animated: phase === 1 },
          { from: 'a', to: 'o', label: '执行返回', tone: 'emerald', animated: phase === 2 },
          { from: 'o', to: 't', label: '追加上下文', tone: 'cyan', animated: phase === 0 },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 工具调度执行器
export const ToolDispatcherVisualizer: React.FC = () => {
  const [toolIdx, setToolIdx] = useState(0);
  const tools = ['search_kb (知识库检索)', 'run_python (沙箱计算)', 'sql_query (订单查询)'];
  return (
    <VisualizerFrame
      title="Agent 工具注册路由与白名单沙箱分发"
      subtitle="校验工具名是否在注册表且参数符合 Schema 后路由给对应执行句柄"
      badge="tool_dispatcher"
      scenarios={tools.map((t) => ({ label: t.split(' ')[0], summary: `路由至 ${t} 沙箱执行器并返回 JSON Result。` }))}
      activeScenario={toolIdx}
      onScenarioChange={setToolIdx}
      metrics={[{ label: '命中 Handler', value: tools[toolIdx], tone: 'emerald' }]}
    >
      <InteractiveGraphCanvas
        height={170}
        nodes={[
          { id: 'llm', x: 75, y: 85, label: 'LLM Dispatch', sublabel: '校验注册表', tone: 'indigo', shape: 'pill', active: true },
          ...tools.map((t, i) => ({
            id: `t${i}`,
            x: 295,
            y: 35 + i * 50,
            label: t,
            tone: (i === toolIdx ? 'emerald' : 'slate') as VisualizerTone,
            shape: 'pill' as const,
            active: i === toolIdx,
          })),
        ]}
        edges={tools.map((_, i) => ({
          from: 'llm',
          to: `t${i}`,
          tone: (i === toolIdx ? 'emerald' : 'slate') as VisualizerTone,
          animated: i === toolIdx,
        }))}
      />
    </VisualizerFrame>
  );
};
