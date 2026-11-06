import { NextRequest } from 'next/server';
import { resolveDeepSeekApiKey } from './lib';
import { runAgentStream } from './agent-engine';

export const dynamic = 'force-dynamic';

const FASTAPI_URL = process.env.FASTAPI_AGENT_URL || 'http://127.0.0.1:8000';

const SSE_HEADERS = {
  'Content-Type': 'text/event-stream; charset=utf-8',
  'Cache-Control': 'no-cache, no-transform',
  Connection: 'keep-alive',
};

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  // 1. 优先转发给 Python FastAPI Agent 服务 (http://127.0.0.1:8000/api/ai/agent/stream)
  // 仅对连接建立阶段设置 4 秒超时，连接成功后清除定时器，避免长耗时 SSE 流在中途被掐断
  const connectController = new AbortController();
  const connectTimeout = setTimeout(() => connectController.abort(), 4000);
  try {
    const fastApiResp = await fetch(`${FASTAPI_URL}/api/ai/agent/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: connectController.signal,
    });
    clearTimeout(connectTimeout);
    if (fastApiResp.ok && fastApiResp.body) {
      return new Response(fastApiResp.body, { headers: SSE_HEADERS });
    }
  } catch {
    clearTimeout(connectTimeout);
    // FastAPI 未启动时，自动切换至本地 Function Calling Agent 引擎
  }

  // 2. 本地 Agent 引擎（与 Python 端行为同构，双链路冗余）
  const apiKey = resolveDeepSeekApiKey();
  const stream = runAgentStream(
    {
      message: body.message || '',
      history: Array.isArray(body.history) ? body.history : [],
      pageContext: body.pageContext || '',
      currentPathname: body.currentPathname || '',
      enableWebSearch: !!body.enableWebSearch,
      explicitAgent: body.explicitAgent,
    },
    apiKey
  );

  return new Response(stream, { headers: SSE_HEADERS });
}
