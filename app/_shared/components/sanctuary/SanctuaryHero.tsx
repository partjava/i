'use client';

import { useEffect, useRef } from 'react';

export default function SanctuaryHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 找出外层可滚动的 main 容器（RootLayoutClient 中的 <main className="... overflow-auto">）
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

    // 监听来自 3D 书房内部的滚轮与「向下滚动浏览平台」按钮事件
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'object') return;

      if (event.data.type === 'SANCTUARY_SCROLL_DOWN') {
        const nextSection = container.nextElementSibling as HTMLElement | null;
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          const scrollParent = getScrollParent(container);
          if (scrollParent instanceof Window) {
            window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
          } else {
            scrollParent.scrollBy({ top: scrollParent.clientHeight * 0.85, behavior: 'smooth' });
          }
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

    // 监听首屏可见性，滚出视口时自动通知 3D 书房暂停 WebGL 渲染以节省 GPU
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            { type: 'SANCTUARY_VISIBILITY', visible: entry.isIntersecting },
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
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[calc(100vh-56px)] min-h-[580px] bg-[#111418] overflow-hidden select-none"
      aria-label="PartJava 3D 数字书房首屏"
    >
      <iframe
        ref={iframeRef}
        src="/sanctuary/index.html"
        title="PartJava 沉浸式 3D 数字书房与技术架构空间"
        className="w-full h-full border-0 block"
        allow="autoplay"
      />
    </section>
  );
}
