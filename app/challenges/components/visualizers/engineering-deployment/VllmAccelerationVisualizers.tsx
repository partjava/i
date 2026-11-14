'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
  InteractiveTimelineCanvas,
} from '../shared/VisualizerEngine';

// 章节：vLLM加速部署

// L1: vLLM 推理加速器
export const VllmPagedAttentionVisualizer: React.FC = () => {
  const [paged, setPaged] = useState(1);
  return (
    <VisualizerFrame
      title="vLLM PagedAttention 虚拟分页显存管理"
      subtitle="像 OS 虚拟内存一样把 KV Cache 切分为固定大小的 Block，消除碎片预留，吞吐量飙升 2-4 倍"
      badge="vllm_paged_attn"
      scenarios={[
        { label: '传统连续预分配 (碎片浪费 ~65%) ✗', summary: '必须按 max_seq_len=4096 一次性预留连续大片显存，实际只用一点造成极高浪费。' },
        { label: 'PagedAttention 非连续按需分页 ✓', summary: '通过 Block Table 逻辑映射到分散物理块，写满才申请下一块，零预留浪费！' },
      ]}
      activeScenario={paged}
      onScenarioChange={setPaged}
      metrics={[
        { label: '有效显存利用率', value: paged ? '96% ✓' : '32% (大量空洞碎片)', tone: paged ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: paged ? '物理 KV Blocks (非连续映射)' : '连续预分配大块',
            slots: paged
              ? [
                  { label: 'Blk#0: ReqA', tone: 'cyan' },
                  { label: 'Blk#1: ReqB', tone: 'indigo' },
                  { label: 'Blk#2: ReqA', tone: 'cyan' },
                  { label: 'Blk#3: Free', sublabel: '共享可用', tone: 'emerald' },
                ]
              : [
                  { label: 'ReqA 已用', tone: 'cyan' },
                  { label: '空洞保留 (浪费)', tone: 'rose' },
                  { label: 'ReqB 已用', tone: 'indigo' },
                  { label: '空洞保留 (浪费)', tone: 'rose' },
                ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: Continuous Batching
export const ContinuousBatchingVisualizer: React.FC = () => {
  const [continuous, setContinuous] = useState(1);
  return (
    <VisualizerFrame
      title="Continuous Batching (迭代级调度) vs Static Batching"
      subtitle="静态批必须等最长样本输出 EOS 才空出槽位；连续批每迭代一个 Token 后立即插空补进新请求"
      badge="continuous_batching"
      scenarios={[
        { label: 'Static Batching (GPU 大量空等泡泡)', summary: '短句生成完后 Slot #1 空转等待 Slot #2 长句结束，显卡算力白白浪费！' },
        { label: 'Continuous Batching (无泡泡满载 ✓)', summary: 'Req1 一结束 EOS 立即在下一个 iteration 接手新到的 Req3！' },
      ]}
      activeScenario={continuous}
      onScenarioChange={setContinuous}
      metrics={[
        { label: 'GPU 算力利用率', value: continuous ? '95% 无空闲 ✓' : '58% (尾效应浪费)', tone: continuous ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveTimelineCanvas
        maxTime={100}
        unit="step"
        lanes={[
          {
            name: 'Slot 1',
            blocks: continuous
              ? [
                  { start: 0, end: 35, label: 'Req1 (短)', tone: 'cyan' },
                  { start: 36, end: 98, label: 'Req3 立刻插队补位 ✓', tone: 'emerald' },
                ]
              : [
                  { start: 0, end: 35, label: 'Req1', tone: 'cyan' },
                  { start: 36, end: 95, label: 'IDLE 空等冒泡!', tone: 'rose' },
                ],
          },
          {
            name: 'Slot 2',
            blocks: [{ start: 0, end: 95, label: 'Req2 (长文本生成)', tone: 'indigo' }],
          },
        ]}
      />
    </VisualizerFrame>
  );
};
