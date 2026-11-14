'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：Gradio模型演示

// L1: Gradio 演示界面构建器
export const GradioInterfaceFlowVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <VisualizerFrame
      title="Gradio gr.Interface 声明式组件映射机制"
      subtitle="三元声明 (fn, inputs, outputs) 自动生成前后端 WebUI 表单、JSON API 与交互样例队列"
      badge="gradio_interface"
      scenarios={[
        { label: '前端组件序列化输入', summary: 'gr.Textbox + gr.Slider 值自动解包为 Python fn 位置参数。' },
        { label: '返回值渲染至 Output ✓', summary: '推理结果按 outputs=[gr.Label, gr.Image] 实时映射渲染。' },
      ]}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[{ label: '核心三元组', value: '(fn, inputs[], outputs[])', tone: 'cyan' }]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={[
          { id: 'in', x: 70, y: 82, label: 'gr.Textbox / Slider', tone: 'cyan', shape: 'pill', active: true },
          { id: 'fn', x: 205, y: 82, label: 'predict(text, temp)', tone: 'indigo', shape: 'pill', active: true },
          { id: 'out', x: 340, y: 82, label: 'gr.Label / Gallery', tone: step ? 'emerald' : 'slate', shape: 'pill', active: step === 1 },
        ]}
        edges={[
          { from: 'in', to: 'fn', label: '*args', tone: 'cyan', animated: true },
          { from: 'fn', to: 'out', label: 'render', tone: step ? 'emerald' : 'slate', animated: step === 1 },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 交互式模型演示
export const GradioInteractiveBlocksVisualizer: React.FC = () => {
  const [queueMode, setQueueMode] = useState(1);
  return (
    <VisualizerFrame
      title="Gradio Blocks 多控件事件流与 .queue() 并发限流保护"
      subtitle="btn.click(fn, inputs, outputs) 精细绑定复杂页面；开启 queue() 防止 GPU 推理被多用户瞬间挤爆"
      badge="gradio_blocks"
      scenarios={[
        { label: '直连高并发风险 ✗', summary: '50 个用户同时点击生成直接触发 GPU OOM 崩溃！' },
        { label: 'demo.queue() + yield 流式 ✓', summary: 'WebSocket 队列平滑排队逐批处理，GPU 显存稳如泰山！' },
      ]}
      activeScenario={queueMode}
      onScenarioChange={setQueueMode}
      metrics={[{ label: '显存稳定性', value: queueMode ? '队列排队 0 OOM ✓' : '极高并发崩溃风险', tone: queueMode ? 'emerald' : 'rose' }]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: queueMode ? 'WebSocket 请求队列' : '无队列直冲 GPU',
            slots: [
              { label: 'Req #1', sublabel: 'GPU 推理中', tone: 'emerald' },
              { label: 'Req #2', sublabel: queueMode ? '排队第1位' : '强行抢显存!', tone: queueMode ? 'cyan' : 'rose' },
              { label: 'Req #3', sublabel: queueMode ? '排队第2位' : 'OOM 崩溃!', tone: queueMode ? 'indigo' : 'rose' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};
