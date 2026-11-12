"use client";

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { UserOutlined } from '@ant-design/icons';
import StitchLogo from './StitchLogo';
import mobileStyles from './AiChat.mobile.module.css';
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
  const pathname = usePathname();
  const isStudyPage = pathname ? pathname.startsWith('/study') : false;
  const ai = useAiChat();
  const [open, setOpen] = useState(false);
  const [studyRoomOpen, setStudyRoomOpen] = useState(false);
  useEffect(() => {
    const onVisibility = (event: Event) => setStudyRoomOpen(Boolean((event as CustomEvent<boolean>).detail));
    window.addEventListener('study-room-visibility', onVisibility);
    return () => window.removeEventListener('study-room-visibility', onVisibility);
  }, []);

  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const posRef = useRef(pos);
  const draggingRef = useRef(false);
  const pendingDragRef = useRef(false);

  // 获取默认展开位置：对齐顶栏搜索中岛的左侧（与第二张图一致，top: 76px）
  const getDefaultPos = () => {
    if (typeof window === 'undefined') return { x: 220, y: 76 };
    if (window.innerWidth < 768) {
      const width = Math.min(360, window.innerWidth - 24);
      return { x: Math.max(12, Math.floor((window.innerWidth - width) / 2)), y: 76 };
    }
    const searchIsland =
      (document.querySelector('.liquid-glass-search')?.closest('.max-w-lg') as HTMLElement | null) ||
      (document.querySelector('.liquid-glass-search')?.parentElement as HTMLElement | null) ||
      (document.querySelector('.liquid-glass-search') as HTMLElement | null);
    if (searchIsland) {
      const rect = searchIsland.getBoundingClientRect();
      const left = Math.max(16, Math.min(window.innerWidth - 376, Math.floor(rect.left)));
      return { x: left, y: 76 };
    }
    const fallbackLeft = Math.max(16, Math.min(window.innerWidth - 376, Math.floor((window.innerWidth - 360) / 2)));
    return { x: fallbackLeft, y: 76 };
  };

  const getMobileFloatingPos = () => {
    if (typeof window === 'undefined') return { x: 20, y: 100 };
    return {
      x: window.innerWidth - 56 - 16,
      y: window.innerHeight - 56 - 104,
    };
  };

  // 监听来自顶部导航栏史迪仔按钮或禾桔伴学气泡的唤起事件
  useEffect(() => {
    const handleToggle = (ev: Event) => {
      const customEv = ev as CustomEvent<{ prompt?: string; forceOpen?: boolean }>;
      const promptText = customEv?.detail?.prompt;
      const forceOpen = customEv?.detail?.forceOpen;
      setOpen((prev) => {
        const next = forceOpen || promptText ? true : !prev;
        if (next && !posRef.current) {
          setPos(getDefaultPos());
        }
        return next;
      });
      setShowHint(false);
      if (promptText) {
        setTimeout(() => {
          void ai.sendMessage(promptText);
        }, 120);
      }
    };
    window.addEventListener('toggle-ai-chat', handleToggle);
    return () => window.removeEventListener('toggle-ai-chat', handleToggle);
  }, [ai]);
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

  // 手机端尺寸自适应
  useEffect(() => {
    const fitMobile = () => {
      if (window.innerWidth >= 768) return;
      const width = Math.min(open ? 360 : 56, window.innerWidth - 24);
      const height = open ? Math.min(480, window.innerHeight - 180) : 56;
      setPos(previous => ({
        x: Math.max(12, Math.min(previous?.x ?? Math.floor((window.innerWidth - width) / 2), window.innerWidth - width - 12)),
        y: Math.max(76, Math.min(previous?.y ?? 76, window.innerHeight - height - 104)),
      }));
    };
    if (open) {
      fitMobile();
      window.addEventListener('resize', fitMobile);
      return () => window.removeEventListener('resize', fitMobile);
    }
  }, [open]);


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
            const rect = containerRef.current?.getBoundingClientRect();
            const curPos = posRef.current || (rect ? { x: rect.left, y: rect.top } : getDefaultPos());
            dragStartRef.current = { mx, my, ox: curPos.x, oy: curPos.y };
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
      const mobile = window.innerWidth < 768;
      const rect = containerRef.current?.getBoundingClientRect();
      const nx = Math.max(8, Math.min(window.innerWidth - (mobile ? (rect?.width || 56) + 8 : 40), ox + (mx - startMx)));
      const ny = Math.max(8, Math.min(window.innerHeight - (mobile ? (rect?.height || 56) + 96 : 40), oy + (my - startMy)));
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

  if (studyRoomOpen) return null;

  const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 768 : true;
  // 桌面端在未打开时不渲染任何浮动节点，彻底杜绝右下角残留或露出的问题
  if (!open && isDesktop) return null;

  const activePos = pos || (open ? getDefaultPos() : getMobileFloatingPos());

  const panel = (
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          zIndex: 2147483647,
          left: activePos.x,
          top: activePos.y,
          width: open ? 360 : 56,
          height: open ? 480 : 56,
        }}
      >
      {!open && (
        <div className="md:hidden" style={{ position: 'relative' }}>
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
              background: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.22) 55%, rgba(186, 230, 253, 0.32) 100%)',
              backdropFilter: 'blur(16px) saturate(180%)',
              WebkitBackdropFilter: 'blur(16px) saturate(180%)',
              border: '1.5px solid rgba(255, 255, 255, 0.85)',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12), inset 0 2px 4px rgba(255, 255, 255, 0.95), inset 0 -2px 6px rgba(56, 189, 248, 0.25)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <StitchLogo size={36} />
          </button>
        </div>
      )}

      {open && (
        <div
          className={mobileStyles.panel}
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
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              background: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.2) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <StitchLogo size={24} />
            </div>
            <div style={{ marginLeft: 8, fontWeight: 700 }}>AI助手</div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                onClick={() => { if (window.confirm('确定清空当前对话？')) ai.clearConversation(); }}
                disabled={ai.loading}
                title="清空对话"
                style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', width: 26, height: 26, borderRadius: 6, cursor: 'pointer', fontSize: 12 }}
              >
                🧹
              </button>
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
              <button onClick={() => { setOpen(false); setPos(null); }} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
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

      {/* 笔记预览编辑模态 */}
      {ai.showPreview && ai.previewNote && (
        <NotePreviewModal
          note={ai.previewNote}
          onChange={ai.setPreviewNote}
          onClose={ai.closePreview}
          onSave={() => ai.savePreviewNote(ai.previewNote)}
          loading={ai.loading}
        />
      )}
    </div>
  );

  return createPortal(panel, document.body);
}
