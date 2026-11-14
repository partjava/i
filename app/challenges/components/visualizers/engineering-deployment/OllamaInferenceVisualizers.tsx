'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：Ollama本地推理

// L1: Ollama 模型管理 CLI
export const OllamaLifecycleVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  const steps = ['ollama pull (拉取 GGUF 分片)', '加载至显存/统一内存 + mmap', '本地 REST 11434 流式生成 ✓'];
  return (
    <VisualizerFrame
      title="Ollama 本地模型管理生命周期与 GGUF 分片加载"
      subtitle="通过 Modelfile 配置系统提示词与温度参数，一条命令在本地开箱运行开源大模型"
      badge="ollama_cli"
      scenarios={steps.map((s, i) => ({ label: `Step ${i + 1}`, summary: s }))}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[{ label: '本地兼容端点', value: 'http://localhost:11434/api/chat', tone: 'cyan' }]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={steps.map((s, i) => ({
          id: `o${i}`,
          x: 72 + i * 128,
          y: 82,
          label: `阶段 ${i + 1}`,
          sublabel: s.slice(0, 14),
          tone: i <= step ? (i === 2 ? 'emerald' : 'cyan') : 'slate',
          shape: 'pill',
          active: i === step,
        }))}
        edges={[0, 1].map((i) => ({ from: `o${i}`, to: `o${i + 1}`, tone: i < step ? 'emerald' : 'slate', animated: i < step }))}
      />
    </VisualizerFrame>
  );
};

// L2: 模型量化推理
export const QuantizationBitWidthVisualizer: React.FC = () => {
  const [qIdx, setQIdx] = useState(2);
  const presets = [
    { name: 'FP16 (16-bit 半精度)', vram: '14.0 GB', ppl: '100% 基准精度', tone: 'amber' as VisualizerTone },
    { name: 'Q8_0 (8-bit 整型)', vram: '7.4 GB', ppl: '99.8% 近无损 ✓', tone: 'cyan' as VisualizerTone },
    { name: 'Q4_K_M (4-bit 分组量化)', vram: '4.1 GB', ppl: '98.5% 消费卡甜蜜点 ✓', tone: 'emerald' as VisualizerTone },
  ];
  const cur = presets[qIdx];
  return (
    <VisualizerFrame
      title="7B 模型量化位宽权衡 (FP16 → Q8_0 → Q4_K_M)"
      subtitle="按分组缩放因子量化浮点权重大幅降低显存带宽瓶颈，消费级 8GB 显卡即可流畅跑通"
      badge="model_quantization"
      scenarios={presets.map((p) => ({ label: p.name.split(' ')[0], summary: `${p.name}：显存 ${p.vram}，质量 ${p.ppl}` }))}
      activeScenario={qIdx}
      onScenarioChange={setQIdx}
      metrics={[
        { label: '7B 权重显存占用', value: cur.vram, tone: cur.tone },
        { label: '语义保真度', value: cur.ppl, tone: cur.tone },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '单权重参数存储宽度',
            slots: [
              { label: qIdx === 0 ? '16 bits' : qIdx === 1 ? '8 bits' : '4 bits (k-quants)', sublabel: cur.vram, tone: cur.tone, pointer: cur.name.split(' ')[0] },
              { label: '8GB 消费显卡', sublabel: qIdx === 0 ? 'OOM 爆显存 ✗' : '流畅加载 ✓', tone: qIdx === 0 ? 'rose' : 'emerald' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};
