'use client';

import { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

interface SanctuaryHeroProps {
  /** 是否以紧凑嵌入式 3D 视窗形态呈现在首页右侧卡片中 */
  embedded?: boolean;
}

export default function SanctuaryHero({ embedded = false }: SanctuaryHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getScrollParent = (el: HTMLElement | null): HTMLElement | Window => {
      let curr = el?.parentElement || null;
      while (curr) {
        const style = window.getComputedStyle(curr);
        if (/(auto|scroll)/.test(style.overflowY)) {
          return curr;
        }
        curr = curr.parentElement;
      }
      return window;
    };

    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'object') return;

      if (event.data.type === 'SANCTUARY_SCROLL_DOWN') {
        const scrollParent = getScrollParent(container);
        if (scrollParent instanceof Window) {
          window.scrollBy({ top: window.innerHeight * 0.75, behavior: 'smooth' });
        } else {
          scrollParent.scrollBy({ top: scrollParent.clientHeight * 0.75, behavior: 'smooth' });
        }
      } else if (event.data.type === 'SANCTUARY_WHEEL' && typeof event.data.deltaY === 'number') {
        const scrollParent = getScrollParent(container);
        if (scrollParent instanceof Window) {
          window.scrollBy({ top: event.data.deltaY, behavior: 'auto' });
        } else {
          scrollParent.scrollTop += event.data.deltaY;
        }
      }
    };

    window.addEventListener('message', handleMessage);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            { type: 'SANCTUARY_VISIBILITY', visible: entry.isIntersecting && !fullscreenOpen },
            '*'
          );
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      window.removeEventListener('message', handleMessage);
      observer.disconnect();
    };
  }, [fullscreenOpen]);

  useEffect(() => {
    if (!fullscreenOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreenOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [fullscreenOpen]);

  if (!embedded) {
    return (
      <section
        ref={containerRef}
        className="relative w-full h-[calc(100vh-56px)] min-h-[580px] bg-[#0E1116] overflow-hidden select-none"
        aria-label="禾硙 3D 数字书房首屏"
      >
        <iframe
          ref={iframeRef}
          src="/sanctuary/index.html"
          title="禾硙 3D 数字书房与技术架构空间"
          className="w-full h-full border-0 block"
          allow="autoplay"
        />
      </section>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-[280px] sm:h-[320px] lg:h-[clamp(290px,calc(100vh-472px),510px)] rounded-2xl overflow-hidden bg-[#0E1116] border border-[#D4AD72]/35 shadow-[0_24px_54px_-12px_rgba(11,18,30,0.34)] select-none group"
        aria-label="禾硙 3D 数字书房视窗"
      >
        <iframe
          ref={iframeRef}
          src="/sanctuary/index.html?embedded=1"
          title="禾硙 3D 交互书房视窗"
          className="w-full h-full border-0 block"
          allow="autoplay"
        />

        {/* 左上角轻量提示标签 */}
        <div className="pointer-events-none absolute top-3 left-3 z-20 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0E1116]/75 backdrop-blur-md border border-[#D4AD72]/30 text-[11px] font-mono text-[#F2EDE4]/90">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AD72]" />
          <span>3D 书房 · 点击屏幕或书本直接互动</span>
        </div>

        {/* 右上角全屏体验入口 */}
        <button
          type="button"
          onClick={() => setFullscreenOpen(true)}
          className="absolute top-3 left-auto right-24 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E1116]/80 hover:bg-[#1B2230] backdrop-blur-md border border-[#D4AD72]/35 text-[11px] font-medium text-[#D4AD72] hover:text-[#F2EDE4] transition-all shadow-md"
          title="全屏沉浸式浏览 3D 数字书房"
        >
          <Maximize2 className="w-3 h-3" />
          <span>全屏浏览</span>
        </button>
      </div>

      {/* 全屏沉浸 3D 书房模态层 */}
      {fullscreenOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[#0E1116] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="禾硙全屏 3D 数字书房"
        >
          <button
            type="button"
            onClick={() => setFullscreenOpen(false)}
            className="fixed top-5 right-5 z-[110] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E1116]/85 hover:bg-[#1B2230] border border-[#D4AD72]/40 text-xs text-[#F2EDE4] shadow-xl backdrop-blur-md transition-all"
          >
            <X className="w-3.5 h-3.5 text-[#D4AD72]" />
            <span>退出全屏 (ESC)</span>
          </button>
          <iframe
            src="/sanctuary/index.html"
            title="禾硙全屏 3D 数字书房"
            className="w-full h-full border-0 block"
            allow="autoplay"
          />
        </div>
      )}
    </>
  );
}
