'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：AI客服代理

// L1: AI 客服工单分类器
export const SupportTicketRouterVisualizer: React.FC = () => {
  const [ticket, setTicket] = useState(0);
  const cases = [
    { label: '紧急退款工单', text: '“重复扣款两次，急需退回！”', route: '财务退单队列 (P0 加急)', tone: 'rose' as VisualizerTone },
    { label: '技术 API 故障', text: '“Webhook 返回 502 Bad Gateway”', route: '技术 SRE 排查组 (P1)', tone: 'amber' as VisualizerTone },
    { label: '常规账号咨询', text: '“如何修改绑定邮箱地址？”', route: 'RAG 自动解答 ✓', tone: 'emerald' as VisualizerTone },
  ];
  const cur = cases[ticket];
  return (
    <VisualizerFrame
      title="AI 客服工单意图分类与 SLA 自动路由引擎"
      subtitle="识别工单意图、紧迫度与业务领域，实现常规问题秒回与紧急单精准升级"
      badge="ticket_classifier"
      scenarios={cases.map((c) => ({ label: c.label, summary: `输入：${c.text} → 路由至 ${c.route}` }))}
      activeScenario={ticket}
      onScenarioChange={setTicket}
      metrics={[
        { label: '分类输入', value: cur.text, tone: 'slate' },
        { label: '目标处置路由', value: cur.route, tone: cur.tone },
      ]}
    >
      <InteractiveGraphCanvas
        height={170}
        nodes={[
          { id: 'in', x: 75, y: 85, label: '用户工单文本', tone: 'indigo', shape: 'pill', active: true },
          { id: 'cls', x: 205, y: 85, label: '意图 + 优先级识别', tone: 'cyan', shape: 'pill', active: true },
          { id: 'out', x: 335, y: 85, label: cur.route.split(' ')[0], tone: cur.tone, shape: 'pill', active: true },
        ]}
        edges={[
          { from: 'in', to: 'cls', tone: 'cyan', animated: true },
          { from: 'cls', to: 'out', tone: cur.tone, animated: true },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 情感分析管道
export const SentimentPipelineVisualizer: React.FC = () => {
  const [score, setScore] = useState(-0.75);
  const label = score >= 0.3 ? '正向满意' : score <= -0.4 ? '强烈愤怒 🚨' : '中性客观';
  const tone: VisualizerTone = score >= 0.3 ? 'emerald' : score <= -0.4 ? 'rose' : 'cyan';
  return (
    <VisualizerFrame
      title="多级情感极性打分与自动危机预警管道"
      subtitle="连续极性分 ∈ [-1, +1] 联动工单紧急升级策略，极负情感跳过机器人直接转接人工主管"
      badge="sentiment_pipeline"
      sliders={[{ label: '情感极性得分 polarity', value: score, min: -1, max: 1, step: 0.25, displayValue: score.toFixed(2), onChange: setScore }]}
      metrics={[
        { label: '情感定级', value: label, tone },
        { label: '客服策略动作', value: score <= -0.4 ? '触发转人工兜底 ✓' : 'AI 常规辅助', tone },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '情感极性刻度',
            slots: [
              { label: '-1.0 愤怒', tone: score <= -0.4 ? 'rose' : 'slate', pointer: score <= -0.4 ? 'CUR' : undefined },
              { label: '0.0 中性', tone: score > -0.4 && score < 0.3 ? 'cyan' : 'slate', pointer: score > -0.4 && score < 0.3 ? 'CUR' : undefined },
              { label: '+1.0 满意', tone: score >= 0.3 ? 'emerald' : 'slate', pointer: score >= 0.3 ? 'CUR' : undefined },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};
