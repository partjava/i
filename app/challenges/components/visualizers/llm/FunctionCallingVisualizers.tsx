'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：Function Calling

// L1: Function Calling 调度器
export const FunctionCallingSchemaVisualizer: React.FC = () => {
  const [valid, setValid] = useState(1);
  return (
    <VisualizerFrame
      title="JSON Schema 强约束与参数自动校验"
      subtitle="使用 Pydantic / JSON Schema 描述参数类型与枚举值，阻断非法幻觉参数进入业务后端"
      badge="function_calling"
      scenarios={[
        { label: '模型参数类型漂移 ✗', summary: '模型错误传回 count="ten"，Schema 校验拦截并要求重新生成整数！' },
        { label: 'Schema 类型校验通过 ✓', summary: '校验通过：city="Shanghai"(str), days=3(int) 安全执行。' },
      ]}
      activeScenario={valid}
      onScenarioChange={setValid}
      metrics={[{ label: 'Schema 状态', value: valid ? 'VALID 200 ✓' : 'ValidationError ✗', tone: valid ? 'emerald' : 'rose' }]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'Schema 校验字段',
            slots: [
              { label: 'city: str', sublabel: '"Shanghai"', tone: 'emerald' },
              { label: 'days: int', sublabel: valid ? '3' : '"ten" (非法str)', tone: valid ? 'emerald' : 'rose', pointer: valid ? 'PASS' : 'FAIL' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 流式输出解析器
export const SseStreamParserVisualizer: React.FC = () => {
  const [chunkIdx, setChunkIdx] = useState(2);
  const chunks = ['data: {"delta":"你"}', 'data: {"delta":"好"}', 'data: [DONE]'];
  return (
    <VisualizerFrame
      title="Server-Sent Events (SSE) 增量 Chunk 缓冲区状态机"
      subtitle="解析跨 TCP 包到达的 data: 前缀碎片，实时渲染打字机流并在 [DONE] 优雅落幕"
      badge="stream_parser"
      scenarios={chunks.map((c, i) => ({ label: `Chunk #${i + 1}`, summary: `收到分片：${c}` }))}
      activeScenario={chunkIdx}
      onScenarioChange={setChunkIdx}
      metrics={[
        { label: '累计已输出文本', value: chunkIdx === 0 ? '你' : '你好', tone: 'cyan' },
        { label: '流终止标志', value: chunkIdx === 2 ? '[DONE] 已关闭' : 'Streaming...', tone: chunkIdx === 2 ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'SSE 帧序列',
            slots: chunks.map((c, i) => ({
              label: c.replace('data: ', ''),
              sublabel: i <= chunkIdx ? '已消费' : '缓冲中',
              tone: i === chunkIdx ? (i === 2 ? 'emerald' : 'cyan') : i < chunkIdx ? 'indigo' : 'slate',
              pointer: i === chunkIdx ? 'HEAD' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
