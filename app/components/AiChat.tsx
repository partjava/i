"use client";

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { UserOutlined } from '@ant-design/icons';
import StitchLogo from './StitchLogo';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewNote, setPreviewNote] = useState<any>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [previewPos, setPreviewPos] = useState<{ x: number; y: number } | null>(null);
  const previewDraggingRef = useRef(false);
  const previewDragStartRef = useRef({ mx: 0, my: 0, ox: 0, oy: 0 });
  const previewPosRef = useRef(previewPos);
  const draggingRef = useRef(false);
  const pendingDragRef = useRef(false);
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef<{ mx: number; my: number; ox: number; oy: number }>({ mx: 0, my: 0, ox: 0, oy: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef(pos);
  const DRAG_THRESHOLD = 5;

  const [showHint, setShowHint] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const dismissed = localStorage.getItem('ai_hint_dismissed');
    if (!dismissed) {
      const t = setTimeout(() => setShowHint(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => { posRef.current = pos; }, [pos]);

  useEffect(() => { previewPosRef.current = previewPos; }, [previewPos]);

  useEffect(() => {
    if (showPreview) {
      fetch('/api/notes/categories')
        .then(r => r.json())
        .then(d => setCategories(d.categories || []))
        .catch(() => setCategories([]));
    }
  }, [showPreview]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: 'welcome', role: 'assistant', content: '你好！我是PartJava AI助手，有什么我可以帮你的？' }]);
    }
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  // 初始化位置（当第一次打开时，把固定位置转换为 left/top，这样之后可以拖动）
  useEffect(() => {
    if (!mounted) return;
    if (!pos) {
      const winW = typeof window !== 'undefined' ? window.innerWidth : 0;
      const winH = typeof window !== 'undefined' ? window.innerHeight : 0;
      const w = open ? 360 : 56;
      const h = open ? 480 : 56;
      const left = Math.max(8, winW - 20 - w);
      const top = Math.max(8, winH - 24 - h);
      setPos({ x: left, y: top });
    }
  }, [open, mounted, pos]);

  useEffect(() => {
    const onMove = (e: any) => {
      if (!draggingRef.current) {
        if (pendingDragRef.current) {
          let mx: number;
          let my: number;
          if (e.touches) {
            e.preventDefault();
            mx = e.touches[0].clientX;
            my = e.touches[0].clientY;
          } else {
            mx = (e as MouseEvent).clientX;
            my = (e as MouseEvent).clientY;
          }
          const dx = mx - dragStartPosRef.current.x;
          const dy = my - dragStartPosRef.current.y;
          if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
            pendingDragRef.current = false;
            draggingRef.current = true;
            document.body.style.userSelect = 'none';
            const curPos = posRef.current;
            dragStartRef.current = { mx, my, ox: curPos?.x || 0, oy: curPos?.y || 0 };
          }
        }
        return;
      }
      let mx: number;
      let my: number;
      if (e.touches) {
        e.preventDefault();
        const t = e.touches[0];
        mx = t.clientX;
        my = t.clientY;
      } else {
        mx = (e as MouseEvent).clientX;
        my = (e as MouseEvent).clientY;
      }
      const { mx: startMx, my: startMy, ox, oy } = dragStartRef.current;
      const nx = Math.max(8, Math.min(window.innerWidth - 40, ox + (mx - startMx)));
      const ny = Math.max(8, Math.min(window.innerHeight - 40, oy + (my - startMy)));
      setPos({ x: nx, y: ny });
    };

    const onUp = () => {
      draggingRef.current = false;
      pendingDragRef.current = false;
      document.body.style.userSelect = '';
    };

    window.addEventListener('mousemove', onMove as any);
    window.addEventListener('touchmove', onMove as any, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove as any);
      window.removeEventListener('touchmove', onMove as any);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  useEffect(() => {
    if (!showPreview) return;
    const onMove = (e: any) => {
      if (!previewDraggingRef.current) return;
      let mx: number, my: number;
      if (e.touches) {
        e.preventDefault();
        mx = e.touches[0].clientX;
        my = e.touches[0].clientY;
      } else {
        mx = (e as MouseEvent).clientX;
        my = (e as MouseEvent).clientY;
      }
      const { mx: smx, my: smy, ox, oy } = previewDragStartRef.current;
      const w = typeof window !== 'undefined' ? window.innerWidth : 0;
      const h = typeof window !== 'undefined' ? window.innerHeight : 0;
      const pw = 900;
      const nx = Math.max(0, Math.min(w - pw, ox + (mx - smx)));
      const ny = Math.max(0, Math.min(h - 600, oy + (my - smy)));
      setPreviewPos({ x: nx, y: ny });
    };
    const onUp = () => { previewDraggingRef.current = false; };
    window.addEventListener('mousemove', onMove as any);
    window.addEventListener('touchmove', onMove as any, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove as any);
      window.removeEventListener('touchmove', onMove as any);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [showPreview]);

  const startDrag = (clientX: number, clientY: number) => {
    draggingRef.current = true;
    document.body.style.userSelect = 'none';
    dragStartRef.current = { mx: clientX, my: clientY, ox: pos?.x || 0, oy: pos?.y || 0 };
  };

  const collectPageContent = (): string => {
    if (typeof document === 'undefined') return '';
    const pathname = window.location.pathname;
    const h1 = document.querySelector('main h1');
    const title = h1?.textContent?.trim() || '';
    if (!title && !pathname.startsWith('/study/')) return '';
    const mainEl = document.querySelector('main');
    const fullText = mainEl?.textContent || '';
    const cleaned = fullText.replace(/\s{3,}/g, '\n').trim();
    const body = cleaned.length > 6000 ? cleaned.slice(0, 6000) + '\n...(内容过长已截断)' : cleaned;
    const activeTab = document.querySelector('.ant-tabs-tab-active, button.bg-blue-500, .border-blue-500[class*="text-blue"], [class*="border-blue"][class*="text-blue"]');
    const tabLabel = activeTab?.textContent?.trim() || '';
    return `[当前学习页面]\n标题: ${title}${tabLabel ? '\n当前小节: ' + tabLabel : ''}\n路径: ${pathname}\n\n页面内容:\n${body}`;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
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
      const aiMsg: Message = { id: Date.now().toString() + '-ai', role: 'assistant', content: reply };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { id: 'err-' + Date.now(), role: 'assistant', content: '请求失败，请稍后重试' }]);
    } finally {
      setLoading(false);
    }
  };

  // 将当前对话内容拼成文本，作为摘要/笔记的输入
  const collectConversationText = () => {
    return messages.map(m => `${m.role === 'user' ? '我' : 'AI助手'}: ${m.content}`).join('\n');
  };

  // 调用 AI 生成笔记（期望返回 JSON 包含 title 和 content），失败则直接用原文
  const summarizeAndCreateNote = async () => {
    const conversationText = collectConversationText();
    const pageContent = collectPageContent();
    const text = conversationText.trim() || pageContent;
    if (!text) {
      setMessages(prev => [...prev, { id: 'sys-' + Date.now(), role: 'assistant', content: '当前没有对话内容，也没有检测到学习页面内容，无法生成笔记' }]);
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
        try { return JSON.parse(clean.replace(/\u201c/g, '"').replace(/\u201d/g, '"')); } catch {}

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

      // 打开预览编辑模态，允许用户确认或修改字段后保存
      setPreviewNote(notePayload);
      setShowPreview(true);
      return;
    } catch (err: any) {
      setMessages(prev => [...prev, { id: 'sys-' + Date.now(), role: 'assistant', content: `笔记创建失败：${err?.message || String(err)}` }]);
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
      setMessages(prev => [...prev, { id: 'sys-' + Date.now(), role: 'assistant', content: '当前没有对话内容，也没有检测到学习页面内容，无法创建笔记' }]);
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

      // 打开预览编辑模态，允许用户确认或修改字段后保存
      setPreviewNote(payload);
      setShowPreview(true);
      return;
    } catch (err: any) {
      setMessages(prev => [...prev, { id: 'sys-' + Date.now(), role: 'assistant', content: `笔记创建失败：${err?.message || String(err)}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const closePreview = () => {
    setShowPreview(false);
    setPreviewNote(null);
    setPreviewPos(null);
  };

  const savePreviewNote = async () => {
    if (!previewNote) return;
    setLoading(true);
    try {
      const payload = {
        title: previewNote.title || `笔记 - ${new Date().toLocaleString()}`,
        content: previewNote.content || '',
        category: previewNote.category || '',
        technology: previewNote.technology || '',
        subcategory: previewNote.subcategory || '',
        tags: Array.isArray(previewNote.tags) ? previewNote.tags : (typeof previewNote.tags === 'string' ? previewNote.tags.split(/[,，\s]+/).filter(Boolean) : []),
        isPublic: !!previewNote.isPublic
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

      setMessages(prev => [...prev, { id: 'sys-' + Date.now(), role: 'assistant', content: '笔记已创建成功' }]);
      closePreview();
    } catch (err: any) {
      setMessages(prev => [...prev, { id: 'sys-' + Date.now(), role: 'assistant', content: `笔记创建失败：${err?.message || err}` }]);
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500, color: '#333' }}>标题</label>
        <input
          value={previewNote.title}
          onChange={(e) => setPreviewNote((p: any) => ({ ...p, title: e.target.value }))}
          placeholder="输入笔记标题"
          style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 14, boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500, color: '#333' }}>分类</label>
          <select
            value={previewNote.category || ''}
            onChange={(e) => setPreviewNote((p: any) => ({ ...p, category: e.target.value }))}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 14, boxSizing: 'border-box', background: '#fff', cursor: 'pointer' }}
          >
            <option value="">-- 请选择分类 --</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="__custom__">✏️ 自定义...</option>
          </select>
          {previewNote.category === '__custom__' && (
            <input
              value=""
              onChange={(e) => setPreviewNote((p: any) => ({ ...p, category: e.target.value }))}
              placeholder="输入自定义分类"
              autoFocus
              style={{ width: '100%', marginTop: 8, padding: '10px 14px', borderRadius: 8, border: '1px solid #4f8cff', fontSize: 14, boxSizing: 'border-box' }}
            />
          )}
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500, color: '#333' }}>技术</label>
          <input
            value={previewNote.technology || ''}
            onChange={(e) => setPreviewNote((p: any) => ({ ...p, technology: e.target.value }))}
            placeholder="例如：React, Java, Python"
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500, color: '#333' }}>子分类</label>
          <input
            value={previewNote.subcategory || ''}
            onChange={(e) => setPreviewNote((p: any) => ({ ...p, subcategory: e.target.value }))}
            placeholder="子分类（可选）"
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500, color: '#333' }}>标签</label>
          <input
            value={Array.isArray(previewNote.tags) ? previewNote.tags.join(',') : (previewNote.tags || '')}
            onChange={(e) => setPreviewNote((p: any) => ({ ...p, tags: e.target.value }))}
            placeholder="多个标签用逗号分隔"
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input
          type="checkbox"
          checked={!!previewNote.isPublic}
          onChange={(e) => setPreviewNote((p: any) => ({ ...p, isPublic: e.target.checked }))}
          style={{ width: 18, height: 18 }}
        />
        <label style={{ fontSize: 14, color: '#333' }}>设为公开笔记（其他用户可见）</label>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500, color: '#333' }}>笔记内容</label>
        <textarea
          value={previewNote.content}
          onChange={(e) => setPreviewNote((p: any) => ({ ...p, content: e.target.value }))}
          placeholder="输入笔记内容..."
          style={{ width: '100%', minHeight: 300, padding: '12px 14px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 14, resize: 'vertical', boxSizing: 'border-box', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
        />
      </div>
    </div>
  );

  const panel = (
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          zIndex: 2147483647,
          left: pos ? pos.x : undefined,
          top: pos ? pos.y : undefined,
          right: pos ? undefined : 20,
          bottom: pos ? undefined : 24,
        }}
      >
      {!open && (
        <div style={{ position: 'relative' }}>
          {showHint && (
            <div style={{
              position: 'absolute', bottom: 64, right: 0, width: 180,
              background: '#1f2937', color: '#fff', borderRadius: 10,
              padding: '10px 14px', fontSize: 13, lineHeight: 1.5,
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              animation: 'aiHintFade 0.4s ease',
              zIndex: 11001,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <StitchLogo size={20} />
                <span style={{ fontWeight: 600 }}>AI 学习助手</span>
              </div>
              <div style={{ color: '#d1d5db' }}>点击我可帮你总结页面内容、创建笔记、解答问题</div>
              <button
                onClick={() => { setShowHint(false); localStorage.setItem('ai_hint_dismissed', '1'); }}
                style={{ marginTop: 6, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#9ca3af', fontSize: 11, padding: '3px 8px', borderRadius: 4, cursor: 'pointer' }}
              >知道了</button>
            </div>
          )}
        <button
          onClick={() => { setOpen(true); setShowHint(false); localStorage.setItem('ai_hint_dismissed', '1'); }}
          aria-label="打开AI助手"
          onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
          onTouchStart={(e) => {
            const t = e.touches[0];
            startDrag(t.clientX, t.clientY);
          }}
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            background: 'linear-gradient(90deg,#4f8cff,#33d2ff)',
            color: '#fff',
            border: 'none',
            boxShadow: '0 6px 18px rgba(79,140,255,0.28)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <StitchLogo size={28} />
        </button>
        </div>
      )}

      {open && (
        <div
          onMouseDown={(e) => {
            const t = e.target as HTMLElement;
            if (['INPUT', 'TEXTAREA', 'BUTTON', 'A', 'SELECT', 'OPTION', 'LABEL'].includes(t.tagName)) return;
            pendingDragRef.current = true;
            dragStartPosRef.current = { x: e.clientX, y: e.clientY };
          }}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            const t = e.target as HTMLElement;
            if (['INPUT', 'TEXTAREA', 'BUTTON', 'A', 'SELECT', 'OPTION', 'LABEL'].includes(t.tagName)) return;
            pendingDragRef.current = true;
            dragStartPosRef.current = { x: touch.clientX, y: touch.clientY };
          }}
          style={{ width: 360, height: 480, borderRadius: 12, overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.25)', background: '#fff' }}
        >
          <div
            onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
            onTouchStart={(e) => {
              const t = e.touches[0];
              startDrag(t.clientX, t.clientY);
            }}
            style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', background: 'linear-gradient(90deg,#4f8cff,#33d2ff)', color: '#fff', cursor: 'grab' }}
          >
            <div style={{ width: 28, height: 28 }}>
              <StitchLogo size={28} />
            </div>
            <div style={{ marginLeft: 8, fontWeight: 700 }}>AI助手</div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                onClick={summarizeAndCreateNote}
                disabled={loading}
                title="总结并保存为笔记"
                style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}
              >
                总结并保存
              </button>
              <button
                onClick={createNoteFromConversation}
                disabled={loading}
                title="直接保存为笔记"
                style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}
              >
                保存为笔记
              </button>
              <button onClick={() => setOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
            </div>
          </div>
          <div style={{ padding: 12, height: 360, overflowY: 'auto', background: '#f7fafc' }}>
            {messages.map((m) => (
              <div key={m.id} style={{ display: 'flex', marginBottom: 10, justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '78%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 14, background: m.role === 'assistant' ? '#4f8cff' : '#6a11cb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', [m.role === 'user' ? 'marginLeft' : 'marginRight']: 8 }}>
                      {m.role === 'assistant' ? <StitchLogo size={18} /> : <UserOutlined />}
                    </div>
                    <div style={{ fontSize: 12, color: '#666' }}>{m.role === 'assistant' ? 'AI助手' : '我'}</div>
                  </div>
                  <div style={{ background: m.role === 'assistant' ? '#fff' : '#4f8cff', color: m.role === 'assistant' ? '#111' : '#fff', padding: '10px 12px', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                    {m.role === 'assistant' ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                        {m.content}
                      </ReactMarkdown>
                    ) : (
                      <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div style={{ padding: 10, borderTop: '1px solid #eee', background: '#fff' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入你的问题..."
                style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: '1px solid #e6e6e6' }}
                disabled={loading}
              />
              <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ padding: '8px 12px', borderRadius: 8, background: '#4f8cff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                发送
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 可拖动的预览编辑模态框 */}
      {showPreview && previewNote && createPortal(
        <div
          onClick={(e) => { if (previewPos && e.target === e.currentTarget) setPreviewPos(null); }}
          style={previewPos ? {
            position: 'fixed',
            left: previewPos.x,
            top: previewPos.y,
            zIndex: 10000,
            width: 900,
            maxWidth: '95vw',
            maxHeight: '90vh',
            boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
            borderRadius: 12,
            background: '#fff',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'default',
          } : {
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}>
          {previewPos ? (
            <>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <div
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const p = previewPosRef.current;
                    if (!p) return;
                    previewDraggingRef.current = true;
                    previewDragStartRef.current = { mx: e.clientX, my: e.clientY, ox: p.x, oy: p.y };
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    const p = previewPosRef.current;
                    if (!p) return;
                    const t = e.touches[0];
                    previewDraggingRef.current = true;
                    previewDragStartRef.current = { mx: t.clientX, my: t.clientY, ox: p.x, oy: p.y };
                  }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'linear-gradient(90deg,#4f8cff,#33d2ff)', color: '#fff', cursor: 'grab', flexShrink: 0 }}
                >
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>保存为笔记 — 预览与编辑（拖动标题栏可移动）</h3>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button onClick={() => setPreviewPos(null)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>↩ 居中</button>
                    <button onClick={closePreview} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '6px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>✕</button>
                  </div>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
                  {renderFormFields()}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '16px 20px', borderTop: '1px solid #eee', background: '#fafafa', flexShrink: 0 }}>
                  <button onClick={closePreview} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s' }}>取消</button>
                  <button onClick={savePreviewNote} disabled={loading} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#4f8cff', color: '#fff', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', opacity: loading ? 0.7 : 1 }}>
                    {loading ? '保存中...' : '保存笔记'}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', width: '100%', maxWidth: 900, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
                  previewDraggingRef.current = true;
                  previewDragStartRef.current = { mx: e.clientX, my: e.clientY, ox: rect.left, oy: rect.top };
                  setPreviewPos({ x: rect.left, y: rect.top });
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
                  previewDraggingRef.current = true;
                  const t = e.touches[0];
                  previewDragStartRef.current = { mx: t.clientX, my: t.clientY, ox: rect.left, oy: rect.top };
                  setPreviewPos({ x: rect.left, y: rect.top });
                }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'linear-gradient(90deg,#4f8cff,#33d2ff)', color: '#fff', cursor: 'grab', flexShrink: 0 }}
              >
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>保存为笔记 — 预览与编辑（拖动标题栏可移动）</h3>
                <button onClick={closePreview} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '6px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>✕</button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
                {renderFormFields()}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '16px 20px', borderTop: '1px solid #eee', background: '#fafafa' }}>
                <button onClick={closePreview} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s' }}>取消</button>
                <button onClick={savePreviewNote} disabled={loading} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#4f8cff', color: '#fff', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', opacity: loading ? 0.7 : 1 }}>
                  {loading ? '保存中...' : '保存笔记'}
                </button>
              </div>
            </div>
          )}
        </div>, document.body)}
    </div>
  );

  if (!mounted || typeof document === 'undefined') return null;
  return createPortal(panel, document.body);
}
