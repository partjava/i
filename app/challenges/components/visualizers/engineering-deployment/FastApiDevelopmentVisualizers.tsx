'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveTimelineCanvas,
} from '../shared/VisualizerEngine';

// 章节：FastAPI开发

// L1: FastAPI REST 服务构建器
export const FastApiPipelineVisualizer: React.FC = () => {
  const [valid, setValid] = useState(1);
  return (
    <VisualizerFrame
      title="FastAPI Pydantic 类型校验 → 路由处理器 → OpenAPI 响应"
      subtitle="请求到达业务逻辑之前由 Pydantic 自动完成反序列化、范围检验并生成标准化 422 报错"
      badge="fastapi_route"
      scenarios={[
        { label: '非法请求体 (422 Unprocessable)', summary: '传入负数 age=-5 被 Pydantic Field(gt=0) 在网关层瞬间拦截。' },
        { label: '校验通过 (200 JSON) ✓', summary: '请求参数转为强类型模型传入路由并返回结构化模型响应！' },
      ]}
      activeScenario={valid}
      onScenarioChange={setValid}
      metrics={[
        { label: 'HTTP 状态码', value: valid ? '200 OK ✓' : '422 Validation Error', tone: valid ? 'emerald' : 'rose' },
        { label: '文档生成', value: '自动 /docs OpenAPI 3.1', tone: 'cyan' },
      ]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={[
          { id: 'req', x: 65, y: 82, label: 'JSON Request', tone: 'indigo', shape: 'pill', active: true },
          { id: 'pyd', x: 195, y: 82, label: 'Pydantic 校验', sublabel: valid ? 'Type ✓' : 'gt=0 失败!', tone: valid ? 'emerald' : 'rose', shape: 'pill', active: true },
          { id: 'hdl', x: 335, y: 82, label: valid ? 'Endpoint 处理 → 200' : '直接返回 422', tone: valid ? 'emerald' : 'rose', shape: 'pill', active: true },
        ]}
        edges={[
          { from: 'req', to: 'pyd', tone: 'indigo', animated: true },
          { from: 'pyd', to: 'hdl', tone: valid ? 'emerald' : 'rose', animated: true },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 异步请求处理器
export const FastApiAsyncEventLoopVisualizer: React.FC = () => {
  const [mode, setMode] = useState(1);
  return (
    <VisualizerFrame
      title="FastAPI async/await 非阻塞 I/O 事件循环高并发对比"
      subtitle="阻塞 def 在等待数据库/上游 AI 返回时卡死 Worker；async def await 挂起让出 CPU 处理其他请求"
      badge="async_handler"
      scenarios={[
        { label: '同步阻塞串联 (耗时长)', summary: '3 个各需 30ms I/O 的请求串行排队阻塞 Worker，总耗时 90ms。' },
        { label: 'asyncio 事件循环并发 ✓', summary: '发起 I/O 后立即 await 让出协程切换，3 个请求重叠等待总耗时仅 34ms！' },
      ]}
      activeScenario={mode}
      onScenarioChange={setMode}
      metrics={[
        { label: '3 并发请求总耗时', value: mode ? '34 ms (2.6x 吞吐提升 ✓)' : '90 ms (串行堵塞)', tone: mode ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveTimelineCanvas
        maxTime={95}
        unit="ms"
        lanes={
          mode === 0
            ? [
                {
                  name: 'Sync 串行',
                  blocks: [
                    { start: 0, end: 30, label: 'Req1 IO', tone: 'rose' },
                    { start: 30, end: 60, label: 'Req2 IO', tone: 'rose' },
                    { start: 60, end: 90, label: 'Req3 IO', tone: 'rose' },
                  ],
                },
              ]
            : [
                { name: 'Task 1', blocks: [{ start: 0, end: 30, label: 'await IO1', tone: 'emerald' }] },
                { name: 'Task 2', blocks: [{ start: 2, end: 32, label: 'await IO2', tone: 'cyan' }] },
                { name: 'Task 3', blocks: [{ start: 4, end: 34, label: 'await IO3', tone: 'indigo' }] },
              ]
        }
      />
    </VisualizerFrame>
  );
};
