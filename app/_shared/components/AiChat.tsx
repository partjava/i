"use client";

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { UserOutlined } from '@ant-design/icons';
import StitchLogo from './StitchLogo';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useStudyContentPage } from './StudyContentPageContext';
import { useAiChat } from './ai/useAiChat';
import NotePreviewModal from './ai/NotePreviewModal';

export default function AiChat() {
  const { isContentPage } = useStudyContentPage();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // 学习内容页由右栏 AiChatPanel 承载，隐藏悬浮球
  const likelyContentPage = !!pathname && pathname.startsWith('/study/') && pathname.split('/').length >= 5;
  if (!mounted || isContentPage || likelyContentPage) return null;

  return <FloatingAiChat />;
}

function FloatingAiChat() {
  const ai = useAiChat();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const posRef = useRef(pos);
  const draggingRef = useRef(false);
  const pendingDragRef = useRef(false);
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef<{ mx: number; my: number; ox: number; oy: number }>({ mx: 0, my: 0, ox: 0, oy: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const DRAG_THRESHOLD = 5;

  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('ai_hint_dismissed');
    if (!dismissed) {
      const t = setTimeout(() => setShowHint(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => { posRef.current = pos; }, [pos]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ai.messages, open]);

  // 初始化位置（当第一次打开时，把固定位置转换为 left/top，这样之后可以拖动）
  useEffect(() => {
    if (!pos) {
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const w = open ? 360 : 56;
      const h = open ? 480 : 56;
      const left = Math.max(8, winW - 20 - w);
      const top = Math.max(8, winH - 24 - h);
      setPos({ x: left, y: top });
    }
  }, [open, pos]);

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

  const startDrag = (clientX: number, clientY: number) => {
    pendingDragRef.current = true;
    dragStartPosRef.current = { x: clientX, y: clientY };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      ai.sendMessage();
    }
  };

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
              <div style={{ color: '#d1d5db', fontSize: 12, lineHeight: 1.6 }}>
                💬 问我任何编程问题<br />
                📝 对话总结 → 创建笔记<br />
                📄 识别当前页面内容
              </div>
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
                onClick={ai.summarizeAndCreateNote}
                disabled={ai.loading}
                title="总结并保存为笔记"
                style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}
              >
                总结并保存
              </button>
              <button
                onClick={ai.createNoteFromConversation}
                disabled={ai.loading}
                title="直接保存为笔记"
                style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}
              >
                保存为笔记
              </button>
              <button onClick={() => setOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
            </div>
          </div>
          <div style={{ padding: 12, height: 360, overflowY: 'auto', background: '#f7fafc' }}>
            {ai.messages.map((m) => (
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
                value={ai.input}
                onChange={(e) => ai.setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入你的问题..."
                style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: '1px solid #e6e6e6' }}
                disabled={ai.loading}
              />
              <button onClick={() => ai.sendMessage()} disabled={ai.loading || !ai.input.trim()} style={{ padding: '8px 12px', borderRadius: 8, background: '#4f8cff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                发送
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return createPortal(panel, document.body);
}
