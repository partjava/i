'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveTimelineCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：多Agent协同工作流

// L1: 多 Agent 会议安排系统
export const MultiAgentMeetingSchedulerVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <VisualizerFrame
      title="多 Agent 会议时间冲突协商与交集时段求解"
      subtitle="Alice/Bob/Carol 三个日程 Agent 各自上报忙碌区间，Coordinator 求取全员共同空闲窗口"
      badge="meeting_scheduler"
      scenarios={[
        { label: '各 Agent 日历独立占满', summary: 'Alice(9-11忙), Bob(10-12忙), Carol(13-14忙) 互不重合。' },
        { label: '求取空闲补集交集 ✓', summary: '14:00 - 16:00 同时在所有 Agent 空闲区中，协同会议成功锁定！' },
      ]}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[{ label: '最终锁定共同窗口', value: step ? '14:00 ~ 16:00 ✓' : '待交集求解', tone: step ? 'emerald' : 'amber' }]}
    >
      <InteractiveTimelineCanvas
        maxTime={17}
        unit="h"
        lanes={[
          { name: 'Alice', blocks: [{ start: 9, end: 11, label: '忙碌', tone: 'rose' }] },
          { name: 'Bob', blocks: [{ start: 10, end: 12, label: '忙碌', tone: 'rose' }] },
          { name: 'Carol', blocks: [{ start: 13, end: 14, label: '忙碌', tone: 'rose' }, ...(step ? [{ start: 14, end: 16, label: '全员可用 ✓', tone: 'emerald' as VisualizerTone }] : [])] },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 任务分解与分配
export const TaskDagDecompositionVisualizer: React.FC = () => {
  const [phase, setPhase] = useState(2);
  return (
    <VisualizerFrame
      title="主控 Planner DAG 依赖拆解与专职 Worker 并行派发"
      subtitle="先分析子任务拓扑依赖关系：无依赖子任务并发执行，汇总节点汇聚验收"
      badge="task_decomposition"
      scenarios={[
        { label: '1. 主目标分解为 DAG', summary: '拆解为“检索竞品”和“分析日志”两个独立分支。' },
        { label: '2. 并行派发执行 Worker', summary: 'Researcher 与 Coder 同时并发开展工作，耗时减半。' },
        { label: '3. Critic/Writer 汇总交付 ✓', summary: '双路结果汇合后统一校验格式并生成最终方案报告。' },
      ]}
      activeScenario={phase}
      onScenarioChange={setPhase}
      metrics={[{ label: '执行效率', value: '拓扑并发调度 ✓', tone: 'emerald' }]}
    >
      <InteractiveGraphCanvas
        height={175}
        nodes={[
          { id: 'plan', x: 70, y: 88, label: 'Planner', tone: 'indigo', shape: 'pill', active: true },
          { id: 'w1', x: 200, y: 45, label: 'Worker A (检索)', tone: phase >= 1 ? 'cyan' : 'slate', shape: 'pill', active: phase >= 1 },
          { id: 'w2', x: 200, y: 128, label: 'Worker B (代码)', tone: phase >= 1 ? 'amber' : 'slate', shape: 'pill', active: phase >= 1 },
          { id: 'rev', x: 335, y: 88, label: '汇总交付 ✓', tone: phase >= 2 ? 'emerald' : 'slate', shape: 'pill', active: phase >= 2 },
        ]}
        edges={[
          { from: 'plan', to: 'w1', tone: 'cyan', animated: phase >= 1 },
          { from: 'plan', to: 'w2', tone: 'amber', animated: phase >= 1 },
          { from: 'w1', to: 'rev', tone: phase >= 2 ? 'emerald' : 'slate', animated: phase >= 2 },
          { from: 'w2', to: 'rev', tone: phase >= 2 ? 'emerald' : 'slate', animated: phase >= 2 },
        ]}
      />
    </VisualizerFrame>
  );
};
