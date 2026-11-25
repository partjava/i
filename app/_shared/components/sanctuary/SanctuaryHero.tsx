'use client';

import { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

export type SanctuaryFocusTarget = 'monitor' | 'book' | 'lamp' | null;

interface SanctuaryHeroProps {
  /** 是否以紧凑嵌入式 3D 视窗形态呈现在首页右侧卡片中 */
  embedded?: boolean;
  /** 来自首页左侧按钮/核心引擎卡片的悬停联动目标 */
  focusTarget?: SanctuaryFocusTarget;
}

/** 统一的非对称有机流线廓形（与 1000x600 SVG 描边严格同源，消除生硬矩形边框感） */
const ORGANIC_CLIP_PATH_NORMALIZED =
  'M 0.055 0.018 C 0.320 0.003 0.680 0.005 0.885 0.016 C 0.955 0.020 0.990 0.058 0.992 0.145 C 0.997 0.420 0.995 0.680 0.986 0.845 C 0.978 0.938 0.936 0.986 0.845 0.990 C 0.600 0.997 0.300 0.994 0.105 0.985 C 0.032 0.980 0.006 0.932 0.008 0.835 C 0.012 0.560 0.005 0.280 0.014 0.130 C 0.020 0.050 0.032 0.022 0.055 0.018 Z';

const ORGANIC_STROKE_PATH_VIEWBOX =
  'M 55 10.8 C 320 1.8 680 3.0 885 9.6 C 955 12.0 990 34.8 992 87.0 C 997 252.0 995 408.0 986 507.0 C 978 562.8 936 591.6 845 594.0 C 600 598.2 300 596.4 105 591.0 C 32 588.0 6 559.2 8 501.0 C 12 336.0 5 168.0 14 78.0 C 20 30.0 32 13.2 55 10.8 Z';

export default function SanctuaryHero({
  embedded = false,
  focusTarget = null,
}: SanctuaryHeroProps) {
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

  // 首页左侧悬停联动：同步焦点物体通知嵌入式 3D 书房内部镜头与物件高光
  useEffect(() => {
    if (!embedded || fullscreenOpen) return;
    iframeRef.current?.contentWindow?.postMessage(
      { type: 'SANCTUARY_HOVER_FOCUS', target: focusTarget },
      '*'
    );
  }, [embedded, focusTarget, fullscreenOpen]);

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
        data-sanctuary-organic-stage
        className="relative w-full h-[280px] sm:h-[320px] lg:h-[clamp(290px,calc(100vh-472px),510px)] select-none group"
        aria-label="禾硙 3D 数字书房视窗"
      >
        {/* SVG 有机曲线裁剪定义（objectBoundingBox 自适应任意宽高比） */}
        <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
          <defs>
            <clipPath id="sanctuary-organic-clip" clipPathUnits="objectBoundingBox">
              <path d={ORGANIC_CLIP_PATH_NORMALIZED} />
            </clipPath>
          </defs>
        </svg>

        {/* 有机轮廓背后的柔和环境氛围光晕（随首页悬停联动呼应） */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-3 rounded-[48px] blur-2xl transition-opacity duration-500 ${
            focusTarget ? 'opacity-90' : 'opacity-65 group-hover:opacity-85'
          }`}
          style={{
            background:
              'radial-gradient(65% 65% at 52% 48%, rgba(212, 173, 114, 0.24) 0%, rgba(27, 59, 111, 0.22) 52%, transparent 82%)',
          }}
        />

        {/* 被有机非对称曲线裁切的 3D 交互空间容器 */}
        <div
          data-sanctuary-clipped-viewport
          className="relative w-full h-full bg-[#0E1116] overflow-hidden"
          style={{
            clipPath: 'url(#sanctuary-organic-clip)',
            WebkitClipPath: 'url(#sanctuary-organic-clip)',
          }}
        >
          <iframe
            ref={iframeRef}
            src="/sanctuary/index.html?embedded=1"
            title="禾硙 3D 交互书房视窗"
            className="w-full h-full border-0 block"
            allow="autoplay"
          />

          {/* 内部柔和暗角过渡，让 3D 空间自然融入异形边线 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(88% 84% at 50% 50%, transparent 66%, rgba(10, 13, 19, 0.58) 100%)',
            }}
          />

          {/* 左上角轻量提示标签（置于安全曲线区内） */}
          <div className="pointer-events-none absolute top-4 left-7 z-20 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0E1116]/75 backdrop-blur-md border border-[#D4AD72]/35 text-[11px] font-code text-[#F2EDE4]/90">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-transform duration-300 ${
                focusTarget ? 'bg-[#F2EDE4] scale-125' : 'bg-[#D4AD72]'
              }`}
            />
            <span>
              {focusTarget === 'monitor'
                ? '3D 书房 · 聚焦代码监视器'
                : focusTarget === 'book'
                ? '3D 书房 · 聚焦全息技术手稿'
                : focusTarget === 'lamp'
                ? '3D 书房 · 激活架构光域'
                : '3D 书房 · 点击屏幕或书本直接互动'}
            </span>
          </div>

          {/* 右上角全屏体验入口 */}
          <button
            type="button"
            onClick={() => setFullscreenOpen(true)}
            className="absolute top-4 left-auto right-24 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E1116]/80 hover:bg-[#1B2230] backdrop-blur-md border border-[#D4AD72]/40 text-[11px] font-medium text-[#D4AD72] hover:text-[#F2EDE4] transition-[transform,background-color,color] duration-150 active:scale-[0.96] shadow-md"
            title="全屏沉浸式浏览 3D 数字书房"
          >
            <Maximize2 className="w-3 h-3" />
            <span>全屏浏览</span>
          </button>
        </div>

        {/* 与裁剪廓形严格重合的麦穗金流线描边装饰层 */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 w-full h-full z-30"
        >
          <defs>
            <linearGradient id="sanctuary-gold-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AD72" stopOpacity={focusTarget ? '0.82' : '0.58'} />
              <stop offset="45%" stopColor="#F2EDE4" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#D4AD72" stopOpacity={focusTarget ? '0.78' : '0.52'} />
            </linearGradient>
          </defs>
          <path
            d={ORGANIC_STROKE_PATH_VIEWBOX}
            fill="none"
            stroke="url(#sanctuary-gold-stroke)"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
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
            className="fixed top-5 right-5 z-[110] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E1116]/85 hover:bg-[#1B2230] border border-[#D4AD72]/40 text-xs text-[#F2EDE4] shadow-xl backdrop-blur-md transition-[transform,background-color] duration-150 active:scale-[0.96]"
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
