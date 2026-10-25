/**
 * Agent 流式接口端到端测试（mock LLM 服务器）
 * ============================================================
 * 用 node:http 起一个假冒 DeepSeek 的本地服务，真实调用 agent-engine.ts 引擎本体（无 Next 依赖，可直接导入），验证：
 * - Function Calling 循环：planning(tool_calls) → 工具执行 → 最终流式
 * - SSE 事件序列：agent_meta / agent_step(act/observe) / site_links / token / done
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import type { AddressInfo } from 'node:net';

const callLog: Array<{ hasTools: boolean; stream: boolean; nMsgs: number }> = [];

function readBody(req: IncomingMessage): Promise<any> {
  return new Promise(resolve => {
    let raw = '';
    req.on('data', c => (raw += c));
    req.on('end', () => resolve(raw ? JSON.parse(raw) : {}));
  });
}

const mockServer = createServer(async (req, res) => {
  const body = await readBody(req);
  callLog.push({
    hasTools: 'tools' in body,
    stream: !!body.stream,
    nMsgs: Array.isArray(body.messages) ? body.messages.length : 0,
  });

  if (body.stream) {
    // 最终流式回答
    res.writeHead(200, { 'Content-Type': 'text/event-stream' });
    for (const chunk of ['找到了 ', 'Java · 多线程与并发', ' 课程！']) {
      res.write(`data: ${JSON.stringify({ choices: [{ delta: { content: chunk } }] })}\n\n`);
    }
    res.write('data: [DONE]\n\n');
    res.end();
    return;
  }

  if ('tools' in body) {
    const planningRound = callLog.slice(0, -1).filter(c => c.hasTools).length;
    if (planningRound === 0) {
      // 第一轮：LLM 自主决定检索站内课程
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          choices: [
            {
              message: {
                role: 'assistant',
                content: '我先检索站内课程',
                tool_calls: [
                  {
                    id: 'call-1',
                    type: 'function',
                    function: { name: 'search_site_pages', arguments: '{"query": "java 多线程"}' },
                  },
                ],
              },
            },
          ],
        })
      );
      return;
    }
    // 第二轮：信息充分，直接作答（content 无 tool_calls → 跳出循环）
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      choices: [{ message: { role: 'assistant', content: '信息足够，开始作答' } }],
    })
  );
});

function parseSSE(text: string): Array<{ event: string; data: any }> {
  const events: Array<{ event: string; data: any }> = [];
  for (const block of text.split('\n\n')) {
    let ev = 'message';
    let raw = '';
    for (const ln of block.split('\n')) {
      if (ln.startsWith('event:')) ev = ln.slice(6).trim();
      else if (ln.startsWith('data:')) raw += ln.slice(5).trim();
    }
    if (raw) {
      try {
        events.push({ event: ev, data: JSON.parse(raw) });
      } catch {
        /* 忽略坏块 */
      }
    }
  }
  return events;
}

describe('Agent 流式接口（mock LLM 端到端）', () => {
  beforeAll(async () => {
    await new Promise<void>(resolve => mockServer.listen(0, '127.0.0.1', resolve));
    const port = (mockServer.address() as AddressInfo).port;
    process.env.DEEPSEEK_BASE_URL = `http://127.0.0.1:${port}`;
    process.env.DEEPSEEK_API_KEY = 'sk-mock-for-test';
  });

  afterAll(async () => {
    await new Promise<void>(resolve => mockServer.close(() => resolve()));
  });

  it('Function Calling 循环：工具执行 → 执行轨迹 → 最终流式回答', async () => {
    callLog.length = 0;
    const { runAgentStream } = await import('./agent-engine');

    const body = {
      message: '帮我找 java 多线程的课程',
      history: [],
      pageContext: '',
      currentPathname: '/study',
      enableWebSearch: false,
    };

    const stream = runAgentStream(body, 'sk-mock-for-test');

    const text = await new Promise<string>(resolve => {
      const reader = stream.getReader();
      const dec = new TextDecoder();
      let out = '';
      const pump = () =>
        reader.read().then(({ value, done }) => {
          if (done) return resolve(out);
          out += dec.decode(value, { stream: true });
          pump();
        });
      pump();
    });

    const events = parseSSE(text);
    const names = events.map(e => e.event);

    // 1) SSE 事件序列完整
    expect(names).toContain('agent_meta');
    expect(names).toContain('agent_step');
    expect(names).toContain('site_links');
    expect(names).toContain('token');
    expect(names).toContain('done');

    // 2) 执行轨迹含 act 与 observe 两阶段
    const steps = events.filter(e => e.event === 'agent_step').map(e => e.data);
    expect(steps.some(s => s.phase === 'act' && s.tool === 'search_site_pages')).toBe(true);
    expect(steps.some(s => s.phase === 'observe')).toBe(true);

    // 3) 工具真实执行：站内检索命中多线程课程
    const links = events.find(e => e.event === 'site_links')?.data?.links || [];
    expect(links.length).toBeGreaterThan(0);
    expect(links.some((l: any) => l.href.includes('/java/'))).toBe(true);

    // 4) 最终流式 token 拼接正确
    const tokens = events.filter(e => e.event === 'token').map(e => e.data.text).join('');
    expect(tokens).toBe('找到了 Java · 多线程与并发 课程！');

    // 5) 调用序列：planning×2（含 tools）+ 最终流式×1（无 tools）
    const planning = callLog.filter(c => !c.stream && c.hasTools);
    const streaming = callLog.filter(c => c.stream);
    expect(planning.length).toBe(2);
    expect(streaming.length).toBe(1);
    // 第二轮 planning 的消息链应包含 assistant(tool_calls) + tool 结果
    expect(planning[1].nMsgs).toBeGreaterThanOrEqual(4);

    // 6) 不应进入离线模式
    const metas = events.filter(e => e.event === 'agent_meta').map(e => e.data);
    expect(metas.every(m => !m.offline)).toBe(true);
  }, 30000);
});
