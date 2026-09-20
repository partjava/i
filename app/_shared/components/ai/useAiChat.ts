'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const STORAGE_KEY = 'ai_chat_messages_v1';

const WELCOME_MESSAGE: Message[] = [
  { id: 'welcome', role: 'assistant', content: '你好！我是PartJava AI助手，有什么我可以帮你的？' },
];

function loadInitialMessages(): Message[] {
  if (typeof window === 'undefined') return WELCOME_MESSAGE;
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed.every((m: any) => m && typeof m.content === 'string')) {
        return parsed;
      }
    }
  } catch {}
  return WELCOME_MESSAGE;
}

export function useAiChat() {
  const [messages, setMessages] = useState<Message[]>(loadInitialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewNote, setPreviewNote] = useState<any>(null);

  const persist = (msgs: Message[]) => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs)); } catch {}
  };

  const appendMessage = useCallback((msg: Message) => {
    setMessages(prev => {
      const next = [...prev, msg];
      persist(next);
      return next;
    });
  }, []);

  const collectPageContent = (): string => {
    if (typeof document === 'undefined') return '';
    const pathname = window.location.pathname;
    const h = document.querySelector('main h1, main h2');
    const title = h?.textContent?.trim() || '';
    if (!title && !pathname.startsWith('/study/')) return '';
    const mainEl = document.querySelector('main');
    const fullText = mainEl?.textContent || '';
    const cleaned = fullText.replace(/\s{3,}/g, '\n').trim();
    const body = cleaned.length > 6000 ? cleaned.slice(0, 6000) + '\n...(内容过长已截断)' : cleaned;
    const activeTab = document.querySelector('.ant-tabs-tab-active, button.bg-blue-500, .border-blue-500[class*="text-blue"], [class*="border-blue"][class*="text-blue"]');
    const tabLabel = activeTab?.textContent?.trim() || '';
    return `[当前学习页面]\n标题: ${title}${tabLabel ? '\n当前小节: ' + tabLabel : ''}\n路径: ${pathname}\n\n页面内容:\n${body}`;
  };

  const collectConversationText = () => {
    return messages.map(m => `${m.role === 'user' ? '我' : 'AI助手'}: ${m.content}`).join('\n');
  };

  const sendMessage = async (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    appendMessage(userMsg);
    if (textOverride === undefined) setInput('');
    setLoading(true);
    try {
      const pageCtx = collectPageContent();
      const body: any = { message: text };
      if (pageCtx) body.pageContext = pageCtx;
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('请求失败');
      const data = await res.json();
      const reply = data?.reply || data?.answer || (typeof data === 'string' ? data : '抱歉，未收到回复');
      appendMessage({ id: Date.now().toString() + '-ai', role: 'assistant', content: reply });
    } catch (e) {
      appendMessage({ id: 'err-' + Date.now(), role: 'assistant', content: '请求失败，请稍后重试' });
    } finally {
      setLoading(false);
    }
  };

  // 调用 AI 生成笔记（期望返回 JSON 包含 title 和 content），失败则直接用原文
  const summarizeAndCreateNote = async () => {
    const conversationText = collectConversationText();
    const pageContent = collectPageContent();
    const text = conversationText.trim() || pageContent;
    if (!text) {
      appendMessage({ id: 'sys-' + Date.now(), role: 'assistant', content: '当前没有对话内容，也没有检测到学习页面内容，无法生成笔记' });
      return;
    }

    setLoading(true);
    try {
      const contextHint = pageContent && conversationText.trim() ? `\n\n当前页面参考信息（优先基于对话内容总结，页面信息作为背景补充）:\n${pageContent}` : '';
      const contentKind = conversationText.trim() ? (
        conversationText.trim() && pageContent ? '以下对话和页面内容' : '以下对话内容'
      ) : '当前页面内容';
      const prompt = `你是学习笔记助手。请把${contentKind}整理为一条高质量的学习笔记，使用 Markdown 格式，返回严格的JSON对象（不要包含\`\`\`json标记）。

JSON字段要求：
- title: 精准简短的标题（不超过30字）
- content: 结构清晰的笔记正文（Markdown：用标题##分节、用列表、用代码块\`\`\`、用加粗强调重点）
- category: 分类（如：算法、前端、后端、数据库、AI、工具、安全）
- technology: 涉及的技术（如：React, Java, Python, SQL）
- subcategory: 子分类（可选，留空字符串也行）
- tags: 标签数组（如：["算法","动态规划"]）
- isPublic: 是否公开（true或false）

只返回一个JSON对象，不要extra文字。

${contentKind}：
${text}${contextHint}`;
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt }),
      });

      if (!res.ok) throw new Error('摘要请求失败');
      const data = await res.json();
      const reply = data?.reply || '';

      // 解析 JSON，多重容错策略
      let parsed: any = null;
      const tryParseJson = (s: string): any => {
        // 1) 去掉 ```json ... ``` 包裹
        let clean = s;
        const mdJson = s.match(/```(?:json)?\s*\n?([\s\S]*?)```/);
        if (mdJson) clean = mdJson[1].trim();

        // 2) 找到最外层 { 的配对 }
        const start = clean.indexOf('{');
        if (start >= 0) {
          let depth = 0, inStr = false, esc = false;
          for (let i = start; i < clean.length; i++) {
            const ch = clean[i];
            if (esc) { esc = false; continue; }
            if (ch === '\\') { esc = true; continue; }
            if (ch === '"') { inStr = !inStr; continue; }
            if (inStr) continue;
            if (ch === '{') depth++;
            else if (ch === '}') { depth--; if (depth === 0) { clean = clean.slice(start, i + 1); break; } }
          }
        }

        // 3) 尝试直接 parse
        try { return JSON.parse(clean); } catch {}

        // 4) 替换中文引号再试
        try { return JSON.parse(clean.replace(/“/g, '"').replace(/”/g, '"')); } catch {}

        // 5) 修复常见 JSON 瑕疵：尾部多余逗号、未转义换行
        try {
          const fixed = clean
            .replace(/,\s*}/g, '}')
            .replace(/,\s*]/g, ']')
            .replace(/\n/g, '\\n');
          return JSON.parse(fixed);
        } catch {}

        throw new Error('all parse strategies failed');
      };

      try {
        parsed = tryParseJson(reply);
      } catch {
        // 最终兜底：用正则从原始回复中摘字段
        const getStr = (key: string) => {
          const m = reply.match(new RegExp(`"${key}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
          return m ? m[1].replace(/\\"/g, '"').replace(/\\n/g, '\n') : '';
        };
        const getBool = (key: string) => {
          const m = reply.match(new RegExp(`"${key}"\\s*:\\s*(true|false)`));
          return m ? m[1] === 'true' : false;
        };
        const getArr = (key: string) => {
          const m = reply.match(new RegExp(`"${key}"\\s*:\\s*\\[([^\\]]*)\\]`));
          if (!m) return [];
          return m[1].split(',').map((s: string) => s.replace(/["\s]/g, '')).filter(Boolean);
        };
        parsed = {
          title: getStr('title') || `笔记-${new Date().toLocaleString()}`,
          content: getStr('content') || reply,
          category: getStr('category') || '',
          technology: getStr('technology') || '',
          subcategory: getStr('subcategory') || '',
          tags: getArr('tags'),
          isPublic: getBool('isPublic'),
        };
      }

      // 填充默认字段并规范化
      const notePayload = {
        title: (parsed.title && String(parsed.title).trim()) || `笔记-${new Date().toLocaleString()}`,
        content: parsed.content || reply,
        category: parsed.category || '',
        technology: parsed.technology || '',
        subcategory: parsed.subcategory || '',
        tags: Array.isArray(parsed.tags) ? parsed.tags.map(String) : (parsed.tags ? String(parsed.tags).split(/[，,\s]+/).filter(Boolean) : []),
        isPublic: typeof parsed.isPublic === 'boolean' ? parsed.isPublic : (parsed.is_public === true || parsed.isPublic === 'true')
      };

      setPreviewNote(notePayload);
      setShowPreview(true);
      return;
    } catch (err: any) {
      appendMessage({ id: 'sys-' + Date.now(), role: 'assistant', content: `笔记创建失败：${err?.message || String(err)}` });
    } finally {
      setLoading(false);
    }
  };

  // 直接把当前对话原文作为笔记创建
  const createNoteFromConversation = async () => {
    const conversationText = collectConversationText();
    const pageContent = collectPageContent();
    const text = conversationText.trim() || pageContent;
    if (!text) {
      appendMessage({ id: 'sys-' + Date.now(), role: 'assistant', content: '当前没有对话内容，也没有检测到学习页面内容，无法创建笔记' });
      return;
    }

    setLoading(true);
    try {
      const fullText = conversationText.trim() && pageContent
        ? `${conversationText}\n\n---\n当前页面内容:\n${pageContent}`
        : text;
      const payload = {
        title: `笔记 - ${new Date().toLocaleString()}`,
        content: fullText
      };

      setPreviewNote(payload);
      setShowPreview(true);
      return;
    } catch (err: any) {
      appendMessage({ id: 'sys-' + Date.now(), role: 'assistant', content: `笔记创建失败：${err?.message || String(err)}` });
    } finally {
      setLoading(false);
    }
  };

  const closePreview = () => {
    setShowPreview(false);
    setPreviewNote(null);
  };

  const savePreviewNote = async (note: any) => {
    setLoading(true);
    try {
      const payload = {
        title: note.title || `笔记 - ${new Date().toLocaleString()}`,
        content: note.content || '',
        category: note.category || '',
        technology: note.technology || '',
        subcategory: note.subcategory || '',
        tags: Array.isArray(note.tags) ? note.tags : (typeof note.tags === 'string' ? note.tags.split(/[,，\s]+/).filter(Boolean) : []),
        isPublic: !!note.isPublic
      };

      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || '创建笔记失败');
      }

      appendMessage({ id: 'sys-' + Date.now(), role: 'assistant', content: '笔记已创建成功' });
      closePreview();
    } catch (err: any) {
      appendMessage({ id: 'sys-' + Date.now(), role: 'assistant', content: `笔记创建失败：${err?.message || err}` });
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    loading,
    sendMessage,
    showPreview,
    previewNote,
    setPreviewNote,
    closePreview,
    savePreviewNote,
    summarizeAndCreateNote,
    createNoteFromConversation,
  };
}
