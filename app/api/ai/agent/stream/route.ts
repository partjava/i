import { NextRequest } from 'next/server';
import {
  DEEPSEEK_BASE_URL,
  MODEL_FLASH,
  MODEL_PRO,
  MAX_TOOL_STEPS,
  resolveDeepSeekApiKey,
  matchSiteRoutes,
  searchSitePages,
  TOOL_LABELS,
  TOOL_AGENT_BADGE,
  TOOL_SCHEMAS,
  AGENCY_INSTRUCTIONS,
  parseToolArguments,
  summarizeToolResult,
  executeTool,
} from './lib';

export const dynamic = 'force-dynamic';

const FASTAPI_URL = process.env.FASTAPI_AGENT_URL || 'http://127.0.0.1:8000';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  // 1. 优先转发给 Python FastAPI 四大智能体微服务 (http://127.0.0.1:8000/api/ai/agent/stream)
  try {
    const fastApiResp = await fetch(`${FASTAPI_URL}/api/ai/agent/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(4000),
    });
    if (fastApiResp.ok && fastApiResp.body) {
      return new Response(fastApiResp.body, {
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
        },
      });
    }
  } catch {
    // FastAPI 尚未启动时，自动切换至本地 Function Calling Agent 引擎
  }

  const apiKey = resolveDeepSeekApiKey();
  const encoder = new TextEncoder();
  const sendSSE = (controller: ReadableStreamDefaultController, event: string, data: any) => {
    controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
  };

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const message: string = (body.message || '').trim();
        const pageContext: string = body.pageContext || '';
        const currentPathname: string = body.currentPathname || '';
        const enableWebSearch: boolean = !!body.enableWebSearch;
        const explicitAgent: string | undefined = body.explicitAgent;
        const history: Array<{ role: string; content: string }> = Array.isArray(body.history) ? body.history : [];

        const msgLower = message.toLowerCase();
        // 【智能体三】基线神态（确定性关键词，被 set_companion_state 工具覆盖）
        let baseReaction: { mood: string; action: string; posture: string | null } = {
          mood: 'normal',
          action: 'talk',
          posture: null,
        };
        if (['站起来', '爬起来', '站姿'].some((k) => msgLower.includes(k))) {
          baseReaction = { mood: 'happy', action: 'jump', posture: 'crouching' };
        } else if (['坐下', '蹲下', '坐姿'].some((k) => msgLower.includes(k))) {
          baseReaction = { mood: 'happy', action: 'jump', posture: 'standing' };
        } else if (['你好', '摸摸', '可爱', '谢谢', '棒', '笔记', '跳'].some((k) => msgLower.includes(k))) {
          baseReaction = { mood: 'happy', action: 'jump', posture: null };
        } else if (['为什么', '怎么', '原理', '搜', '哪', '?'].some((k) => msgLower.includes(k))) {
          baseReaction = { mood: 'curious', action: 'tilt_head', posture: null };
        }

        const state = {
          siteLinks: [] as any[],
          citations: [] as any[],
          ragFragments: [] as string[],
          noteDraft: null as any,
          reaction: null as any,
        };
        const ctx = {
          message,
          history,
          pageContext,
          apiKey,
          sendSSE: (event: string, data: any) => sendSSE(controller, event, data),
          state,
        };

        const activeAgents: string[] = ['🐾 3D 伴侣', '🧭 站内检索'];
        let currentModel = MODEL_FLASH;
        const badgeTool = (toolName: string) => {
          const badge = TOOL_AGENT_BADGE[toolName];
          if (badge && !activeAgents.includes(badge)) activeAgents.push(badge);
        };
        const mergedReaction = () => state.reaction || baseReaction;

        // 【智能体一】零成本本地领航：RAG 检索站内页面（低置信回落关键词）
        const siteLinks = searchSitePages(message, currentPathname, 4);
        if (siteLinks.length > 0) {
          state.siteLinks = siteLinks;
          sendSSE(controller, 'site_links', { links: siteLinks });
        }

        // ============ 离线降级模式（未配置 Key） ============
        if (!apiKey) {
          sendSSE(controller, 'agent_meta', {
            reaction: mergedReaction(),
            activeAgents: activeAgents,
            model: 'offline-smart-fallback',
            offline: true,
          });
          const isNoteKw =
            explicitAgent === 'note' ||
            ['写笔记', '生成笔记', '保存笔记', '总结成笔记', '总结本页', '记笔记', '存为笔记'].some((k) => msgLower.includes(k));
          const isSearchKw =
            enableWebSearch ||
            explicitAgent === 'search' ||
            ['联网', '搜索', '上网查', '官网链接', '专业网站', '权威网站', '外部链接', '最新文档'].some((k) => msgLower.includes(k));
          const offlineJobs: Array<[string, Record<string, any>, string]> = [];
          if (isSearchKw) offlineJobs.push(['web_search', { query: message }, '联网深搜（离线精选权威索引）']);
          if (isNoteKw) offlineJobs.push(['draft_note', { topic: message }, '提炼写笔记（本地结构化提炼）']);
          for (const [fname, fargs, reason] of offlineJobs) {
            const meta = TOOL_LABELS[fname] || { label: fname, desc: '' };
            sendSSE(controller, 'agent_step', { phase: 'act', tool: fname, label: meta.label, detail: reason, status: 'running' });
            await executeTool(fname, fargs, ctx);
            badgeTool(fname);
            if (fname === 'web_search') currentModel = MODEL_PRO;
            sendSSE(controller, 'agent_meta', {
              reaction: mergedReaction(),
              activeAgents: activeAgents,
              model: currentModel,
              offline: true,
            });
            sendSSE(controller, 'agent_step', { phase: 'observe', tool: fname, label: meta.label, detail: '离线降级完成', status: 'done' });
          }
          let replyText = '';
          if (state.noteDraft) {
            replyText =
              `喵呜~ 🐾 **【笔记提炼】** 已经把对话与当前页面提炼成结构化 Markdown 笔记啦！\n\n` +
              `你可以直接点击气泡下方的 **「⚡ 一键存入我的笔记」** 写入数据库，或者点 **「✏️ 预览与编辑」** 微调后再保存哦！`;
          } else if (state.citations.length > 0) {
            replyText =
              `喵~ 🐾 **【联网深搜】** 已围绕「**${message}**」检索并抓取了 ${state.citations.length} 篇专业权威技术资料：\n\n` +
              state.citations
                .map((c: any) => `- **[${c.index}] ${c.title}** (\`${c.domain}\`)\n  > ${c.snippet}`)
                .join('\n') +
              `\n\n点击气泡底部的 **🌐 权威网站外链卡片** 即可直接访问对应官方文档！`;
          } else {
            replyText =
              `喵呜~ 我是温暖书房的 3D 像素绒毛黑猫 **禾桔** 🐾！关于「**${message}**」，已为你匹配了站内相关课程与知识点，快看看下方的直达胶囊吧！`;
          }
          for (let i = 0; i < replyText.length; i += 5) {
            sendSSE(controller, 'token', { text: replyText.slice(i, i + 5) });
            await new Promise((r) => setTimeout(r, 30));
          }
          sendSSE(controller, 'done', { ok: true, offline: true });
          return;
        }

        // ============ 在线 Function Calling Agent 循环 ============
        sendSSE(controller, 'agent_meta', {
          reaction: mergedReaction(),
          activeAgents: activeAgents,
          model: currentModel,
          offline: false,
        });

        const sysParts = [
          '你是 PartJava 温暖书房里的 3D 灵动像素绒毛黑猫助教，名字叫「禾桔」🐾。请用条理清晰、亲切专业的风格回答（善用 Markdown 列表、加粗与代码块）。',
          AGENCY_INSTRUCTIONS,
        ];
        if (siteLinks.length > 0) {
          sysParts.push(
            '【站内匹配课程路由】:\n' + siteLinks.map((l) => `- [${l.name}](${l.href})`).join('\n')
          );
        }
        if (pageContext) {
          sysParts.push(`【用户当前浏览页面内容】:\n${pageContext.slice(0, 8000)}`);
        }

        const llmMessages: Array<Record<string, any>> = [
          { role: 'system', content: sysParts.join('\n\n') },
          ...history.slice(-6).map((h) => ({
            role: h.role === 'assistant' || h.role === 'ai' ? 'assistant' : 'user',
            content: h.content,
          })),
          { role: 'user', content: message },
        ];

        let streamedAny = false;

        // 用户显式操作 → 确定性直调工具
        const forcedCalls: Array<[string, Record<string, any>]> = [];
        if (explicitAgent === 'note') forcedCalls.push(['draft_note', { topic: message }]);
        if (enableWebSearch || explicitAgent === 'search') forcedCalls.push(['web_search', { query: message }]);
        if (forcedCalls.length > 0) {
          const synthesized = forcedCalls.map(([fname, fargs], idx) => ({
            id: `forced-${idx}`,
            type: 'function',
            function: { name: fname, arguments: JSON.stringify(fargs) },
          }));
          const toolMsgs: Array<Record<string, any>> = [];
          for (let i = 0; i < forcedCalls.length; i++) {
            const [fname, fargs] = forcedCalls[i];
            const meta = TOOL_LABELS[fname] || { label: fname, desc: '' };
            sendSSE(controller, 'agent_step', {
              phase: 'act',
              tool: fname,
              label: meta.label,
              detail: '用户显式指令，直接执行',
              status: 'running',
            });
            const result = await executeTool(fname, fargs, ctx);
            badgeTool(fname);
            if (fname === 'web_search') currentModel = MODEL_PRO;
            sendSSE(controller, 'agent_meta', {
              reaction: mergedReaction(),
              activeAgents: activeAgents,
              model: currentModel,
              offline: false,
            });
            sendSSE(controller, 'agent_step', {
              phase: 'observe',
              tool: fname,
              label: meta.label,
              detail: summarizeToolResult(fname, result),
              status: 'done',
            });
            toolMsgs.push({
              role: 'tool',
              tool_call_id: `forced-${i}`,
              content: JSON.stringify(result).slice(0, 4000),
            });
          }
          llmMessages.push({ role: 'assistant', content: '', tool_calls: synthesized }, ...toolMsgs);
        }

        // plan → act → observe 循环
        let toolsEnabled = true;
        for (let step = 0; step < MAX_TOOL_STEPS; step++) {
          const payload: any = {
            model: MODEL_FLASH,
            messages: llmMessages,
            stream: false,
            temperature: 0.3,
          };
          if (toolsEnabled) {
            payload.tools = TOOL_SCHEMAS;
            payload.tool_choice = 'auto';
          }
          const resp = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(45000),
          });
          if (!resp.ok) {
            if (toolsEnabled) {
              toolsEnabled = false; // 可能不支持 function calling，去掉 tools 重试
              continue;
            }
            break;
          }
          const msg = (await resp.json())?.choices?.[0]?.message || {};
          const toolCalls = msg.tool_calls || [];
          if (!toolCalls.length) break; // 信息充分，进入最终流式回答

          llmMessages.push({ role: 'assistant', content: msg.content || '', tool_calls: toolCalls });
          if (msg.content) {
            sendSSE(controller, 'agent_step', {
              phase: 'plan',
              label: '💭 分析任务',
              detail: String(msg.content).slice(0, 160),
              status: 'done',
            });
          }
          for (const tc of toolCalls) {
            const fname = tc?.function?.name || '';
            const fargs = parseToolArguments(tc?.function?.arguments);
            const meta = TOOL_LABELS[fname] || { label: fname, desc: '' };
            sendSSE(controller, 'agent_step', {
              phase: 'act',
              tool: fname,
              label: meta.label,
              detail: String(fargs.query || fargs.topic || meta.desc || '').slice(0, 120),
              status: 'running',
            });
            const result = await executeTool(fname, fargs, ctx);
            badgeTool(fname);
            if (fname === 'web_search') currentModel = MODEL_PRO;
            sendSSE(controller, 'agent_meta', {
              reaction: mergedReaction(),
              activeAgents: activeAgents,
              model: currentModel,
              offline: false,
            });
            sendSSE(controller, 'agent_step', {
              phase: 'observe',
              tool: fname,
              label: meta.label,
              detail: summarizeToolResult(fname, result),
              status: 'done',
            });
            llmMessages.push({
              role: 'tool',
              tool_call_id: tc.id || `call-${step}`,
              content: JSON.stringify(result).slice(0, 4000),
            });
          }
        }

        // 最终流式回答（不携带 tools）
        const finalModel = state.citations.length > 0 ? MODEL_PRO : MODEL_FLASH;
        try {
          const llmResp = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: finalModel,
              messages: llmMessages,
              stream: true,
            }),
            signal: AbortSignal.timeout(45000),
          });
          if (llmResp.ok && llmResp.body) {
            const reader = llmResp.body.getReader();
            const dec = new TextDecoder('utf-8');
            let buf = '';
            while (true) {
              const { value, done } = await reader.read();
              if (done) break;
              buf += dec.decode(value, { stream: true });
              const lines = buf.split('\n');
              buf = lines.pop() || '';
              for (const ln of lines) {
                const trimmed = ln.trim();
                if (!trimmed.startsWith('data:')) continue;
                const dStr = trimmed.slice(5).trim();
                if (dStr === '[DONE]') break;
                try {
                  const parsed = JSON.parse(dStr);
                  const delta = parsed?.choices?.[0]?.delta?.content || '';
                  if (delta) {
                    streamedAny = true;
                    sendSSE(controller, 'token', { text: delta });
                  }
                } catch {}
              }
            }
          }
        } catch {}

        // 兜底：融合工具结果的本地智能回复（打字机推送保持猫嘴同步）
        if (!streamedAny) {
          sendSSE(controller, 'agent_meta', {
            reaction: mergedReaction(),
            activeAgents: activeAgents,
            model: 'offline-smart-fallback',
            offline: true,
          });
          let replyText = '';
          if (state.noteDraft) {
            replyText =
              `喵呜~ 🐾 **【笔记提炼】** 已经把对话与当前页面提炼成结构化 Markdown 笔记啦！\n\n` +
              `你可以直接点击气泡下方的 **「⚡ 一键存入我的笔记」** 写入数据库，或者点 **「✏️ 预览与编辑」** 微调后再保存哦！`;
          } else if (state.citations.length > 0) {
            replyText =
              `喵~ 🐾 **【联网深搜】** 已围绕「**${message}**」检索并抓取了 ${state.citations.length} 篇专业权威技术资料：\n\n` +
              state.citations
                .map((c: any) => `- **[${c.index}] ${c.title}** (\`${c.domain}\`)\n  > ${c.snippet}`)
                .join('\n') +
              `\n\n点击气泡底部的 **🌐 权威网站外链卡片** 即可直接访问官方文档！`;
          } else {
            replyText =
              `喵呜~ 我是温暖书房的 3D 像素绒毛黑猫 **禾桔** 🐾！关于「**${message}**」，已为你匹配了站内相关课程与知识点，快看看下方的直达胶囊吧！`;
          }
          for (let i = 0; i < replyText.length; i += 5) {
            sendSSE(controller, 'token', { text: replyText.slice(i, i + 5) });
            await new Promise((r) => setTimeout(r, 30));
          }
        }

        sendSSE(controller, 'done', { ok: true });
      } catch (e: any) {
        sendSSE(controller, 'token', { text: `喵~ 禾桔刚刚打了个盹：${e?.message || '请稍后再试'}` });
        sendSSE(controller, 'done', { ok: false });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
