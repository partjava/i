'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：Qwen开源大模型

// L1: Qwen API 调用封装器
export const QwenApiWrapperVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <VisualizerFrame
      title="Qwen API 鉴权、重试退避与 Token 计费封装"
      subtitle="结构化装配 Messages，对 429 限流/5xx 错误指数退避，解析 usage 计数"
      badge="qwen_client"
      scenarios={[
        { label: '触发 429 限流自动退避', summary: '捕获 RateLimitError → 休眠 2^retry + jitter 秒后无损重试。' },
        { label: '200 OK 结构化返回 usage ✓', summary: '提取 content 与 prompt_tokens / completion_tokens 监控成本。' },
      ]}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: 'Prompt Tokens', value: '128', tone: 'cyan' },
        { label: 'Completion Tokens', value: '64', tone: 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'API 请求生命周期',
            slots: [
              { label: 'Messages[]', sublabel: 'ChatML', tone: 'indigo' },
              { label: step ? '200 OK' : '429 Backoff', sublabel: step ? '完成推理' : '退避重试', tone: step ? 'emerald' : 'amber' },
              { label: 'Usage: 192 tok', sublabel: '成本统计', tone: 'cyan' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: KV Cache 实现
export const KvCacheInferenceVisualizer: React.FC = () => {
  const [seqLen, setSeqLen] = useState(6);
  return (
    <VisualizerFrame
      title="KV Cache 自回归推理增量加速 (O(N²) → O(N))"
      subtitle="缓存前序所有 Token 的 Key/Value 投影，每一步只需对最新 Token 计算 Q_new 并拼接"
      badge="kv_cache"
      sliders={[{ label: '当前已生成序列长度 t', value: seqLen, min: 2, max: 10, step: 1, onChange: setSeqLen }]}
      metrics={[
        { label: '本步需算 Q 的 Token 数', value: '1 个 (仅最新)', tone: 'emerald' },
        { label: '复用缓存 KV 长度', value: `${seqLen - 1} tokens ⚡`, tone: 'cyan' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'K_cache 显存槽',
            slots: Array.from({ length: seqLen }, (_, i) => ({
              label: `K_${i}`,
              sublabel: i === seqLen - 1 ? '新拼接' : '缓存命中',
              tone: i === seqLen - 1 ? 'emerald' : 'indigo',
              pointer: i === seqLen - 1 ? 'NEW' : undefined,
            })),
          },
          {
            name: 'V_cache 显存槽',
            slots: Array.from({ length: seqLen }, (_, i) => ({
              label: `V_${i}`,
              sublabel: i === seqLen - 1 ? '新拼接' : '缓存命中',
              tone: i === seqLen - 1 ? 'emerald' : 'cyan',
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
