'use client';

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
  useMemo,
} from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Bookmark,
  Pin,
  Eye,
  EyeOff,
  Columns2,
  Square,
  ZoomIn,
  ZoomOut,
  Download,
  FilePlus2,
  ListTree,
  MessageSquareText,
  Share2,
  Sparkles,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  Check,
} from 'lucide-react';
import { getAuthHeaders } from '@shared/lib/auth-client';
import AiChatPanel from '@shared/components/ai/AiChatPanel';
import StudyScreenshot from '@shared/components/StudyScreenshot';
import PdfPageCanvas from './PdfPageCanvas';
import {
  fetchPdfBinary,
  getPdfBookDetail,
  updatePdfBook,
  addPdfAnnotation,
  updatePdfAnnotation,
  deletePdfAnnotation,
  savePdfBookmark,
  deletePdfBookmark,
  parsePageSelection,
  notifyPdfLibraryUpdated,
  PIN_COLOR_META,
  type PdfBookItem,
  type PdfAnnotationItem,
  type PdfBookmarkItem,
  type PinColor,
} from '../api';

interface OutlineEntry {
  title: string;
  pageNumber: number | null;
  level: number;
}

interface ActiveFlip {
  from: number; // spread index (0-based)
  to: number;
  direction: 'forward' | 'back';
  mode: 'animating' | 'dragging';
  lockedHeight: number;
}

interface PendingAnimation {
  direction: 'forward' | 'back';
  startProgress: number;
  endProgress: number;
  durationMs: number;
  useEaseOut: boolean;
  onComplete: () => void;
}

const easePaperTurn = (t: number) => 1 - Math.pow(1 - t, 2.6);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function flattenOutline(
  items: any[],
  level = 0,
  acc: Array<{ title: string; dest: any; level: number }> = []
) {
  for (const item of items) {
    acc.push({ title: String(item.title || '未命名目录'), dest: item.dest, level });
    if (Array.isArray(item.items) && item.items.length > 0 && acc.length < 150) {
      flattenOutline(item.items, level + 1, acc);
    }
  }
  return acc;
}

export default function PdfBookReader({ bookId }: { bookId: number }) {
  const [book, setBook] = useState<PdfBookItem | null>(null);
  const [annotations, setAnnotations] = useState<PdfAnnotationItem[]>([]);
  const [bookmarks, setBookmarks] = useState<PdfBookmarkItem[]>([]);
  const [pdfDoc, setPdfDoc] = useState<any | null>(null);
  const [numPages, setNumPages] = useState(1);
  const [outline, setOutline] = useState<OutlineEntry[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // 阅读视图控制
  const [layoutMode, setLayoutMode] = useState<'double' | 'single'>('double');
  const [isMobile, setIsMobile] = useState(false);
  const effectiveMode: 'double' | 'single' = isMobile ? 'single' : layoutMode;

  const [currentSpread, setCurrentSpread] = useState(0);
  const [displayedSpread, setDisplayedSpread] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pinMode, setPinMode] = useState(false);
  const [showPins, setShowPins] = useState(true);
  const [highlightedPinId, setHighlightedPinId] = useState<number | null>(null);
  const [pageInput, setPageInput] = useState('1');

  // 右侧栏标签与状态
  const [sideTab, setSideTab] = useState<'outline' | 'notes' | 'export'>('notes');
  const [notesFilter, setNotesFilter] = useState<'visible' | 'all'>('visible');
  const [pageNoteDraft, setPageNoteDraft] = useState('');
  const [pageNoteTarget, setPageNoteTarget] = useState<'left' | 'right'>('left');
  const [savingPageNote, setSavingPageNote] = useState(false);

  // AI 识别范围控制
  const [aiScopeMode, setAiScopeMode] = useState<'current' | 'custom'>('current');
  const [aiCustomExpr, setAiCustomExpr] = useState('1-2');
  const [pageTextCache, setPageTextCache] = useState<Record<number, string>>({});
  const textCacheRef = useRef<Map<number, string>>(new Map());

  // 导出与同步状态
  const [exportScope, setExportScope] = useState<'current_spread' | 'current_page' | 'annotated' | 'custom'>('current_spread');
  const [exportCustomExpr, setExportCustomExpr] = useState('1-4');
  const [includeExcerpt, setIncludeExcerpt] = useState(true);
  const [syncingNote, setSyncingNote] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState<{ noteId?: number; msg: string } | null>(null);

  // 3D 翻页引用（纯 GPU 合成层，零帧间 setState）
  const [activeFlip, setActiveFlip] = useState<ActiveFlip | null>(null);
  const activeFlipRef = useRef<ActiveFlip | null>(null);
  activeFlipRef.current = activeFlip;
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const pendingAnimRef = useRef<PendingAnimation | null>(null);
  const spreadStageRef = useRef<HTMLDivElement | null>(null);
  const leafRef = useRef<HTMLDivElement | null>(null);
  const leafFrontRef = useRef<HTMLDivElement | null>(null);
  const leafBackRef = useRef<HTMLDivElement | null>(null);
  const leafShadowRef = useRef<HTMLDivElement | null>(null);
  const frontShadeRef = useRef<HTMLDivElement | null>(null);
  const backShadeRef = useRef<HTMLDivElement | null>(null);
  const underShadowRef = useRef<HTMLDivElement | null>(null);
  const landShadowRef = useRef<HTMLDivElement | null>(null);

  // 进度保存防抖
  const savePageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestSavedPageRef = useRef<number>(1);
  const pendingLastPageRef = useRef<number | null>(null);
  const hasInitializedSpreadRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const totalSpreads = useMemo(
    () => (effectiveMode === 'double' ? Math.max(1, Math.ceil(numPages / 2)) : Math.max(1, numPages)),
    [effectiveMode, numPages]
  );

  const spreadPages = useCallback(
    (spreadIdx: number): { left: number | null; right: number | null } => {
      if (effectiveMode === 'single') {
        const p = Math.max(1, Math.min(spreadIdx + 1, numPages));
        return { left: p, right: null };
      }
      const left = spreadIdx * 2 + 1;
      const right = left + 1 <= numPages ? left + 1 : null;
      return { left: left <= numPages ? left : null, right };
    },
    [effectiveMode, numPages]
  );

  // 初始加载书籍详情 + PDF 文档实例
  useEffect(() => {
    let cancelled = false;
    let loadedDoc: any = null;

    const init = async () => {
      setLoading(true);
      setLoadError(null);
      hasInitializedSpreadRef.current = false;
      textCacheRef.current.clear();
      setPageTextCache({});

      try {
        const [detail, binary] = await Promise.all([
          getPdfBookDetail(bookId),
          fetchPdfBinary(bookId),
        ]);
        if (cancelled) return;

        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
        const doc = await pdfjs.getDocument({ data: new Uint8Array(binary) }).promise;
        loadedDoc = doc;
        if (cancelled) {
          await doc.destroy();
          return;
        }

        const total = Math.max(1, doc.numPages || detail.book.pageCount || 1);
        const restoredPage = Math.max(1, Math.min(detail.book.lastPage || 1, total));
        latestSavedPageRef.current = restoredPage;

        setBook(detail.book);
        setAnnotations(Array.isArray(detail.annotations) ? detail.annotations : []);
        setBookmarks(Array.isArray(detail.bookmarks) ? detail.bookmarks : []);
        setNumPages(total);
        setPdfDoc(doc);

        const initialSpread =
          window.innerWidth < 768
            ? restoredPage - 1
            : Math.floor((restoredPage - 1) / 2);
        setCurrentSpread(initialSpread);
        setDisplayedSpread(initialSpread);
        setPageInput(String(restoredPage));
        hasInitializedSpreadRef.current = true;

        // 若后端总页数与真实 PDF 不一致，顺手校准
        if (detail.book.pageCount !== total) {
          updatePdfBook(bookId, { pageCount: total }).catch(() => {});
        }

        // 异步解析 PDF 原生目录大纲
        try {
          const rawOutline = await doc.getOutline();
          if (!cancelled && Array.isArray(rawOutline) && rawOutline.length > 0) {
            const flat = flattenOutline(rawOutline);
            const entries: OutlineEntry[] = [];
            for (const entry of flat) {
              let pageNumber: number | null = null;
              try {
                let dest = entry.dest;
                if (typeof dest === 'string') {
                  dest = await doc.getDestination(dest);
                }
                if (Array.isArray(dest) && dest[0]) {
                  const idx = await doc.getPageIndex(dest[0]);
                  pageNumber = idx + 1;
                }
              } catch {}
              entries.push({ title: entry.title, pageNumber, level: entry.level });
            }
            if (!cancelled) setOutline(entries);
          }
        } catch {}
      } catch (err: any) {
        if (!cancelled) {
          setLoadError(err?.message || '无法加载书籍内容');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    init();

    return () => {
      cancelled = true;
      try {
        loadedDoc?.destroy();
      } catch {}
    };
  }, [bookId]);

  // 离开前冲洗待保存页码与阅读时长
  useEffect(() => {
    const startMs = Date.now();
    const flushOnUnload = () => {
      const pendingPage = pendingLastPageRef.current;
      const elapsedSec = Math.round((Date.now() - startMs) / 1000);
      if (pendingPage != null || elapsedSec >= 5) {
        try {
          fetch(`/api/pdf-books/${bookId}`, {
            method: 'PUT',
            keepalive: true,
            headers: {
              'Content-Type': 'application/json',
              ...getAuthHeaders(),
            },
            body: JSON.stringify({
              ...(pendingPage != null ? { lastPage: pendingPage } : {}),
              ...(elapsedSec >= 5 ? { readingSecondsIncrement: Math.min(elapsedSec, 3600) } : {}),
            }),
          }).catch(() => {});
        } catch {}
      }
    };
    window.addEventListener('beforeunload', flushOnUnload);
    return () => {
      window.removeEventListener('beforeunload', flushOnUnload);
      if (savePageTimerRef.current) clearTimeout(savePageTimerRef.current);
      flushOnUnload();
    };
  }, [bookId]);

  // 翻页时实时同步页码输入框并防抖持久化 lastPage 到 MySQL
  useEffect(() => {
    if (!hasInitializedSpreadRef.current || !book) return;
    const { left } = spreadPages(currentSpread);
    if (!left) return;

    setPageInput(String(left));
    if (left === latestSavedPageRef.current) return;
    pendingLastPageRef.current = left;

    if (savePageTimerRef.current) clearTimeout(savePageTimerRef.current);
    savePageTimerRef.current = setTimeout(async () => {
      try {
        await updatePdfBook(bookId, { lastPage: left });
        latestSavedPageRef.current = left;
        pendingLastPageRef.current = null;
        setBook((prev) => (prev ? { ...prev, lastPage: left } : prev));
        notifyPdfLibraryUpdated();
      } catch {}
    }, 350);
  }, [currentSpread, bookId, book, spreadPages]);

  // 3D 翻页动画引擎（完全复用 BookSpread 的无重绘 GPU 物理逻辑）
  const cancelAnimation = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    pendingAnimRef.current = null;
  }, []);

  useEffect(() => () => cancelAnimation(), [cancelAnimation]);

  const applyFlipFrame = useCallback((p: number, dir: 'forward' | 'back') => {
    progressRef.current = p;
    const deg = dir === 'forward' ? -p * 180 : p * 180;
    const sin = Math.sin(p * Math.PI);

    if (leafRef.current) {
      leafRef.current.style.transform = `translateZ(4px) rotateY(${deg.toFixed(3)}deg)`;
      leafRef.current.dataset.flipProgress = p.toFixed(3);
    }
    if (leafFrontRef.current) leafFrontRef.current.style.opacity = p < 0.5 ? '1' : '0';
    if (leafBackRef.current) leafBackRef.current.style.opacity = p >= 0.5 ? '1' : '0';
    if (leafShadowRef.current) leafShadowRef.current.style.opacity = (0.12 + sin * 0.78).toFixed(3);
    if (frontShadeRef.current) frontShadeRef.current.style.opacity = Math.min(1, p * 1.45).toFixed(3);
    if (backShadeRef.current) backShadeRef.current.style.opacity = Math.max(0, (1 - p) * 1.5).toFixed(3);
    if (underShadowRef.current) underShadowRef.current.style.opacity = Math.max(0, 1 - p * 1.45).toFixed(3);
    if (landShadowRef.current) {
      landShadowRef.current.style.opacity =
        p > 0.45 ? Math.min(1, ((p - 0.45) / 0.55) * 0.9).toFixed(3) : '0';
    }
  }, []);

  const runRefAnimation = useCallback(
    (anim: PendingAnimation) => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      const easeFn = anim.useEaseOut ? easeOutCubic : easePaperTurn;
      let startTime: number | null = null;

      const tick = (now: number) => {
        if (startTime === null) startTime = now;
        const rawT = Math.min(1, (now - startTime) / Math.max(1, anim.durationMs));
        const eased = easeFn(rawT);
        const nextP = anim.startProgress + (anim.endProgress - anim.startProgress) * eased;
        applyFlipFrame(nextP, anim.direction);
        if (rawT < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = null;
          anim.onComplete();
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    },
    [applyFlipFrame]
  );

  useLayoutEffect(() => {
    if (!activeFlip) return;
    applyFlipFrame(progressRef.current, activeFlip.direction);
    const pending = pendingAnimRef.current;
    if (pending) {
      pendingAnimRef.current = null;
      runRefAnimation(pending);
    }
  }, [activeFlip, applyFlipFrame, runRefAnimation]);

  const goToSpread = useCallback(
    (target: number) => {
      const clamped = Math.max(0, Math.min(target, totalSpreads - 1));
      let activeFrom = displayedSpread;
      if (activeFlipRef.current) {
        cancelAnimation();
        activeFrom = activeFlipRef.current.to;
        activeFlipRef.current = null;
        setDisplayedSpread(activeFrom);
        setCurrentSpread(activeFrom);
        setActiveFlip(null);
      }
      if (clamped === activeFrom) return;

      const reducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (effectiveMode === 'single' || reducedMotion) {
        setDisplayedSpread(clamped);
        setCurrentSpread(clamped);
        setActiveFlip(null);
        return;
      }

      const dir: 'forward' | 'back' = clamped > activeFrom ? 'forward' : 'back';
      const lockedHeight = Math.max(spreadStageRef.current?.offsetHeight || 580, 580);
      progressRef.current = 0;
      pendingAnimRef.current = {
        direction: dir,
        startProgress: 0,
        endProgress: 1,
        durationMs: 520,
        useEaseOut: false,
        onComplete: () => {
          activeFlipRef.current = null;
          pendingAnimRef.current = null;
          setDisplayedSpread(clamped);
          setCurrentSpread(clamped);
          setActiveFlip(null);
        },
      };
      setCurrentSpread(clamped);
      const session: ActiveFlip = {
        from: activeFrom,
        to: clamped,
        direction: dir,
        mode: 'animating',
        lockedHeight,
      };
      activeFlipRef.current = session;
      setActiveFlip(session);
    },
    [displayedSpread, totalSpreads, cancelAnimation, effectiveMode]
  );

  const jumpToPage = useCallback(
    (pageNum: number) => {
      const clampedPage = Math.max(1, Math.min(pageNum, numPages));
      const targetSpread =
        effectiveMode === 'single' ? clampedPage - 1 : Math.floor((clampedPage - 1) / 2);
      goToSpread(targetSpread);
    },
    [effectiveMode, numPages, goToSpread]
  );

  const handleToggleLayoutMode = () => {
    const visible = spreadPages(displayedSpread);
    const anchorPage = visible.left || 1;
    const nextMode = layoutMode === 'double' ? 'single' : 'double';
    cancelAnimation();
    setActiveFlip(null);
    setLayoutMode(nextMode);
    const nextSpread = nextMode === 'single' ? anchorPage - 1 : Math.floor((anchorPage - 1) / 2);
    setCurrentSpread(nextSpread);
    setDisplayedSpread(nextSpread);
  };

  const goPrev = useCallback(
    () => goToSpread((activeFlipRef.current ? activeFlipRef.current.to : displayedSpread) - 1),
    [goToSpread, displayedSpread]
  );
  const goNext = useCallback(
    () => goToSpread((activeFlipRef.current ? activeFlipRef.current.to : displayedSpread) + 1),
    [goToSpread, displayedSpread]
  );

  // 键盘左右键翻页
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      ) {
        return;
      }
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  // 书角实时拖拽搓动翻页
  const handleCornerPointerDown = useCallback(
    (dir: 'forward' | 'back', e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      if (effectiveMode !== 'double') return;
      const fromIdx = activeFlipRef.current ? activeFlipRef.current.to : displayedSpread;
      const toIdx = dir === 'forward' ? fromIdx + 1 : fromIdx - 1;
      if (toIdx < 0 || toIdx >= totalSpreads) return;

      e.preventDefault();
      e.stopPropagation();
      cancelAnimation();

      const stageWidth = Math.max(spreadStageRef.current?.clientWidth || 720, 400);
      const lockedHeight = Math.max(spreadStageRef.current?.offsetHeight || 580, 580);
      const startX = e.clientX;
      let lastX = e.clientX;
      let moved = false;

      progressRef.current = 0;
      const dragSession: ActiveFlip = {
        from: fromIdx,
        to: toIdx,
        direction: dir,
        mode: 'dragging',
        lockedHeight,
      };
      activeFlipRef.current = dragSession;
      setActiveFlip(dragSession);

      const handleMove = (ev: PointerEvent) => {
        lastX = ev.clientX;
        const delta = dir === 'forward' ? startX - ev.clientX : ev.clientX - startX;
        if (Math.abs(delta) > 4) moved = true;
        const p = Math.max(0.01, Math.min(0.99, delta / (stageWidth * 0.45)));
        applyFlipFrame(p, dir);
      };

      const finish = () => {
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', finish);
        window.removeEventListener('pointercancel', finish);

        const delta = dir === 'forward' ? startX - lastX : lastX - startX;
        if (!moved) {
          const anim: PendingAnimation = {
            direction: dir,
            startProgress: Math.max(0.02, progressRef.current),
            endProgress: 1,
            durationMs: 500,
            useEaseOut: false,
            onComplete: () => {
              activeFlipRef.current = null;
              setDisplayedSpread(toIdx);
              setCurrentSpread(toIdx);
              setActiveFlip(null);
            },
          };
          setCurrentSpread(toIdx);
          runRefAnimation(anim);
          return;
        }

        const p = Math.max(0.01, Math.min(0.99, delta / (stageWidth * 0.45)));
        const shouldComplete = p >= 0.32;
        const targetIdx = shouldComplete ? toIdx : fromIdx;
        if (shouldComplete) setCurrentSpread(targetIdx);
        runRefAnimation({
          direction: dir,
          startProgress: p,
          endProgress: shouldComplete ? 1 : 0,
          durationMs: Math.max(160, Math.round(340 * (shouldComplete ? 1 - p : p))),
          useEaseOut: true,
          onComplete: () => {
            activeFlipRef.current = null;
            setDisplayedSpread(targetIdx);
            setCurrentSpread(targetIdx);
            setActiveFlip(null);
          },
        });
      };

      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', finish);
      window.addEventListener('pointercancel', finish);
    },
    [effectiveMode, displayedSpread, totalSpreads, cancelAnimation, applyFlipFrame, runRefAnimation]
  );

  // 当前可见页 & 书签状态
  const visible = spreadPages(displayedSpread);
  const visiblePagesList = useMemo(
    () => [visible.left, visible.right].filter((p): p is number => p != null),
    [visible.left, visible.right]
  );

  const activeBookmark = useMemo(
    () => bookmarks.find((b) => visiblePagesList.includes(b.pageNumber)) || null,
    [bookmarks, visiblePagesList]
  );

  const handleToggleBookmark = async () => {
    if (!visible.left) return;
    try {
      if (activeBookmark) {
        await deletePdfBookmark(bookId, activeBookmark.pageNumber);
        setBookmarks((prev) => prev.filter((b) => b.pageNumber !== activeBookmark.pageNumber));
      } else {
        const created = await savePdfBookmark(bookId, visible.left, `第 ${visible.left} 页`);
        setBookmarks((prev) =>
          [...prev.filter((b) => b.pageNumber !== created.pageNumber), created].sort(
            (a, b) => a.pageNumber - b.pageNumber
          )
        );
      }
    } catch {}
  };

  // 提取指定页文本并缓存（供 AI 局部伴读与导出）
  const ensurePagesTextExtracted = useCallback(
    async (pages: number[]) => {
      if (!pdfDoc || pages.length === 0) return;
      const missing = pages.filter((p) => p >= 1 && p <= numPages && !textCacheRef.current.has(p));
      if (missing.length === 0) return;

      const updated: Record<number, string> = {};
      for (const p of missing) {
        try {
          const page = await pdfDoc.getPage(p);
          const tc = await page.getTextContent();
          const text = (tc.items || [])
            .map((it: any) => (typeof it?.str === 'string' ? it.str : ''))
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
          textCacheRef.current.set(p, text);
          updated[p] = text;
        } catch {
          textCacheRef.current.set(p, '');
          updated[p] = '';
        }
      }
      setPageTextCache((prev) => ({ ...prev, ...updated }));
    },
    [pdfDoc, numPages]
  );

  const aiTargetPages = useMemo(() => {
    if (aiScopeMode === 'current') return visiblePagesList;
    const parsed = parsePageSelection(aiCustomExpr, numPages).slice(0, 10);
    return parsed.length > 0 ? parsed : visiblePagesList;
  }, [aiScopeMode, aiCustomExpr, numPages, visiblePagesList]);

  useEffect(() => {
    ensurePagesTextExtracted(aiTargetPages);
  }, [aiTargetPages, ensurePagesTextExtracted]);

  // 实时暴露局部页面文本 + 对应批注给禾硙 AiChatPanel
  const aiContextStats = useMemo(() => {
    if (!book) return { text: '', charCount: 0 };
    const sections: string[] = [];
    for (const p of aiTargetPages) {
      const pageTxt = pageTextCache[p] ?? textCacheRef.current.get(p) ?? '';
      const pageAnns = annotations.filter((a) => a.pageNumber === p);
      const annBlock =
        pageAnns.length > 0
          ? `\n【第 ${p} 页读者批注】\n${pageAnns
              .map((a, idx) => `- (${a.type === 'pin' ? `图钉#${idx + 1}` : '整页笔记'}) ${a.noteContent}`)
              .join('\n')}`
          : '';
      sections.push(
        `--- 第 ${p} 页 ---\n${pageTxt || '(本页为扫描图片或暂无可提取文本，可结合图钉批注或截图分析)'}${annBlock}`
      );
    }
    const rawBody = sections.join('\n\n');
    const body =
      rawBody.length > 8000 ? rawBody.slice(0, 8000) + '\n...(已按 8000 字上限截断)' : rawBody;
    const scopeTitle =
      aiTargetPages.length > 0 ? `第 ${aiTargetPages.join(', ')} 页` : '当前页';
    const fullContext = `[我的书架 · PDF 伴读]\n书名: ${book.title}\n分类: ${book.category || '未分类'}\n识别范围: ${scopeTitle}（全书共 ${numPages} 页）\n\n${body}`;
    return { text: fullContext, charCount: body.replace(/\(本页为扫描图片.*?\)/g, '').trim().length };
  }, [book, aiTargetPages, pageTextCache, annotations, numPages]);

  useEffect(() => {
    const w = window as unknown as {
      __PARTJAVA_AI_PAGE_CONTEXT__?: () => { title?: string; contextText: string } | null;
    };
    w.__PARTJAVA_AI_PAGE_CONTEXT__ = () =>
      aiContextStats.text
        ? { title: book?.title, contextText: aiContextStats.text }
        : null;
    return () => {
      delete w.__PARTJAVA_AI_PAGE_CONTEXT__;
    };
  }, [aiContextStats.text, book?.title]);

  // Pin & Note CRUD
  const handleCreatePin = async (
    pageNumber: number,
    xPct: number,
    yPct: number,
    color: PinColor,
    content: string
  ) => {
    const created = await addPdfAnnotation(bookId, {
      pageNumber,
      type: 'pin',
      xPct,
      yPct,
      color,
      noteContent: content,
    });
    setAnnotations((prev) =>
      [...prev, created].sort((a, b) => a.pageNumber - b.pageNumber || a.id - b.id)
    );
  };

  const handleUpdatePin = async (annId: number, content: string, color: PinColor) => {
    const updated = await updatePdfAnnotation(bookId, annId, { noteContent: content, color });
    setAnnotations((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  const handleDeleteAnnotation = async (annId: number) => {
    await deletePdfAnnotation(bookId, annId);
    setAnnotations((prev) => prev.filter((a) => a.id !== annId));
  };

  const handleAddPageNote = async () => {
    if (!pageNoteDraft.trim()) return;
    const targetPage =
      pageNoteTarget === 'right' && visible.right ? visible.right : visible.left || 1;
    setSavingPageNote(true);
    try {
      const created = await addPdfAnnotation(bookId, {
        pageNumber: targetPage,
        type: 'page_note',
        color: 'amber',
        noteContent: pageNoteDraft.trim(),
      });
      setAnnotations((prev) =>
        [...prev, created].sort((a, b) => a.pageNumber - b.pageNumber || a.id - b.id)
      );
      setPageNoteDraft('');
    } finally {
      setSavingPageNote(false);
    }
  };

  // 计算导出/同步的选定页码并生成 Markdown
  const selectedExportPages = useMemo(() => {
    if (exportScope === 'current_spread') return visiblePagesList;
    if (exportScope === 'current_page') return visible.left ? [visible.left] : [1];
    if (exportScope === 'annotated') {
      const pages = Array.from(new Set(annotations.map((a) => a.pageNumber))).sort((a, b) => a - b);
      return pages.length > 0 ? pages : visiblePagesList;
    }
    const parsed = parsePageSelection(exportCustomExpr, numPages);
    return parsed.length > 0 ? parsed : visiblePagesList;
  }, [exportScope, exportCustomExpr, visiblePagesList, visible.left, annotations, numPages]);

  const buildScopedMarkdown = async (): Promise<{ title: string; markdown: string; rangeLabel: string }> => {
    const pages = selectedExportPages;
    if (includeExcerpt) {
      await ensurePagesTextExtracted(pages);
    }
    const rangeLabel =
      pages.length <= 4 ? `P${pages.join(',')}` : `P${pages[0]}-${pages[pages.length - 1]}(${pages.length}页)`;
    const lines: string[] = [
      `# ${book?.title || 'PDF 读书笔记'}（${rangeLabel}）`,
      '',
      `> 分类：${book?.category || '未分类'} · 进度：第 ${visible.left || 1} / ${numPages} 页 · 导出范围：第 ${pages.join(', ')} 页`,
      '',
    ];

    for (const p of pages) {
      const pageAnns = annotations.filter((a) => a.pageNumber === p);
      const excerpt = includeExcerpt ? (textCacheRef.current.get(p) || '').trim() : '';
      lines.push(`## 第 ${p} 页`);
      lines.push('');
      if (pageAnns.length > 0) {
        lines.push('### 我的批注');
        pageAnns.forEach((ann, i) => {
          const tag =
            ann.type === 'pin'
              ? `图钉#${i + 1} (${Math.round(Number(ann.xPct ?? 0))}%, ${Math.round(Number(ann.yPct ?? 0))}%)`
              : '页内笔记';
          lines.push(`- **[${tag}]** ${ann.noteContent}`);
        });
        lines.push('');
      } else {
        lines.push('- （本页暂无个人批注）');
        lines.push('');
      }
      if (includeExcerpt && excerpt) {
        lines.push('### 原文摘录');
        lines.push('');
        lines.push(excerpt.length > 1500 ? excerpt.slice(0, 1500) + '...' : excerpt);
        lines.push('');
      }
    }

    return {
      title: `${book?.title || 'PDF 笔记'} · ${rangeLabel}`,
      markdown: lines.join('\n'),
      rangeLabel,
    };
  };

  const handleExportMarkdown = async () => {
    const { markdown, rangeLabel } = await buildScopedMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(book?.title || 'book').replace(/[\\/:*?"<>|]/g, '_')}_${rangeLabel}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleSyncToMyNotes = async () => {
    setSyncingNote(true);
    setSyncSuccess(null);
    try {
      const { title, markdown } = await buildScopedMarkdown();
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          title: title.slice(0, 80),
          content: markdown,
          category: book?.category || '读书笔记',
          technology: 'PDF 书架',
          subcategory: book?.title || '',
          tags: ['我的书架', book?.category || 'PDF'].filter(Boolean),
          isPublic: false,
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || (json && json.success === false)) {
        throw new Error(json?.message || '同步笔记失败');
      }
      const createdId = json?.data?.id ?? json?.id;
      setSyncSuccess({ noteId: createdId, msg: '已同步到「我的笔记」' });
    } catch (err: any) {
      setSyncSuccess({ msg: `同步失败：${err?.message || '请先登录'}` });
    } finally {
      setSyncingNote(false);
    }
  };

  // 基础图层展示索引（静止 vs 翻页）
  const baseLeftSpreadIdx = activeFlip
    ? activeFlip.direction === 'forward'
      ? activeFlip.from
      : activeFlip.to
    : displayedSpread;
  const baseRightSpreadIdx = activeFlip
    ? activeFlip.direction === 'forward'
      ? activeFlip.to
      : activeFlip.from
    : displayedSpread;

  const progressRatio = totalSpreads > 1 ? currentSpread / (totalSpreads - 1) : 0.5;
  const leftStackWidth = Math.round(3 + progressRatio * 11);
  const rightStackWidth = Math.round(14 - progressRatio * 11);

  const displayedAnnotations = useMemo(() => {
    const list =
      notesFilter === 'visible'
        ? annotations.filter((a) => visiblePagesList.includes(a.pageNumber))
        : annotations;
    return list;
  }, [annotations, notesFilter, visiblePagesList]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-content-secondary">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AD72]" />
        <p className="text-sm">正在装订书页并加载 PDF 内容...</p>
      </div>
    );
  }

  if (loadError || !book) {
    return (
      <div className="max-w-lg mx-auto my-20 p-6 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-rose-500/30 text-center space-y-3">
        <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
        <h2 className="text-base font-semibold text-content-primary">打开书籍失败</h2>
        <p className="text-xs text-content-secondary">{loadError || '请确认已登录且书籍存在'}</p>
        <Link
          href="/study/library"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#192231] text-[#F2EDE4] text-xs font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> 返回我的书架
        </Link>
      </div>
    );
  }

  const canTurnPrev = displayedSpread > 0;
  const canTurnNext = displayedSpread < totalSpreads - 1;
  const baseLeftPages = spreadPages(baseLeftSpreadIdx);
  const baseRightPages = spreadPages(baseRightSpreadIdx);
  const flipFromPages = activeFlip ? spreadPages(activeFlip.from) : null;
  const flipToPages = activeFlip ? spreadPages(activeFlip.to) : null;

  const renderPageWithHeader = (pageNumber: number | null, side: 'left' | 'right', interactive: boolean) => (
    <div
      className={`relative h-full min-h-[580px] flex flex-col overflow-hidden ${
        side === 'left' ? 'rounded-l-sm' : 'rounded-r-sm'
      }`}
      style={{
        color: '#1E293B',
        background:
          side === 'left'
            ? 'linear-gradient(90deg, #E5EBF3 0%, #EEF2F7 10%, #F4F7FA 74%, #E2E8F2 100%)'
            : 'linear-gradient(270deg, #E5EBF3 0%, #EEF2F7 10%, #F4F7FA 74%, #E2E8F2 100%)',
        boxShadow:
          side === 'left'
            ? 'inset -22px 0 28px -18px rgba(15, 23, 42, 0.16), inset 2px 0 3px rgba(255, 255, 255, 0.7)'
            : 'inset 22px 0 28px -18px rgba(15, 23, 42, 0.16), inset -2px 0 3px rgba(255, 255, 255, 0.7)',
      }}
    >
      <div className="flex-shrink-0 flex items-center gap-2 px-6 pt-4 pb-2 select-none">
        <span className="h-px flex-1 bg-slate-300/60" />
        <span className="text-[10px] tracking-[0.18em] text-slate-500 font-medium">
          {pageNumber ? `— 第 ${pageNumber} / ${numPages} 页 —` : '— 末页空白 —'}
        </span>
        <span className="h-px flex-1 bg-slate-300/60" />
      </div>
      <div data-book-page-content className="flex-1 px-4 pb-5 overflow-y-auto">
        <PdfPageCanvas
          pdfDoc={pdfDoc}
          pageNumber={pageNumber}
          scale={zoom}
          pins={annotations.filter((a) => a.pageNumber === pageNumber)}
          showPins={showPins}
          pinMode={pinMode}
          highlightedPinId={highlightedPinId}
          interactive={interactive}
          onCreatePin={interactive ? handleCreatePin : undefined}
          onUpdatePin={interactive ? handleUpdatePin : undefined}
          onDeletePin={interactive ? handleDeleteAnnotation : undefined}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[1920px] mx-auto px-3 py-4 sm:px-6 sm:py-5 flex items-start gap-5">
      <div className="flex-1 min-w-0">
        {/* 顶部工具栏 */}
        <div className="flex flex-wrap items-center gap-2 mb-3.5 px-1">
          <Link
            href="/study/library"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-content-secondary hover:text-content-primary bg-white/70 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>我的书架</span>
          </Link>

          <h1 className="text-sm font-semibold text-content-primary truncate max-w-[260px] sm:max-w-[380px]">
            {book.title}
          </h1>

          <div className="ml-auto flex flex-wrap items-center gap-1.5">
            {/* 图钉批注模式 */}
            <button
              type="button"
              data-pin-mode-toggle
              onClick={() => setPinMode((v) => !v)}
              title="开启后点击书页任意位置打图钉做笔记（也可随时按住 Alt+点击）"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                pinMode
                  ? 'bg-[#D4AD72] text-[#192231] border-[#D4AD72] shadow-sm'
                  : 'bg-white/75 dark:bg-white/[0.06] text-content-secondary hover:text-content-primary border-slate-200/80 dark:border-white/10'
              }`}
            >
              <Pin className="w-3.5 h-3.5" />
              <span>{pinMode ? '图钉批注中' : '图钉批注'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowPins((v) => !v)}
              title={showPins ? '隐藏页面图钉' : '显示页面图钉'}
              className="p-1.5 rounded-lg bg-white/75 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 text-content-secondary hover:text-content-primary"
            >
              {showPins ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>

            {/* 双页/单页切换 */}
            {!isMobile && (
              <button
                type="button"
                onClick={handleToggleLayoutMode}
                title={layoutMode === 'double' ? '切换单页模式（适合宽幅双栏或细读）' : '切换双页对开模式'}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/75 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 text-content-secondary hover:text-content-primary"
              >
                {layoutMode === 'double' ? (
                  <>
                    <Columns2 className="w-3.5 h-3.5 text-[#D4AD72]" />
                    <span>双页</span>
                  </>
                ) : (
                  <>
                    <Square className="w-3.5 h-3.5 text-[#D4AD72]" />
                    <span>单页</span>
                  </>
                )}
              </button>
            )}

            {/* 缩放控制 */}
            <div className="hidden sm:flex items-center rounded-lg bg-white/75 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 overflow-hidden">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.75, Number((z - 0.15).toFixed(2))))}
                className="p-1.5 text-content-secondary hover:text-content-primary"
                aria-label="缩小页面"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoom(1)}
                className="px-1.5 text-[11px] font-medium text-content-primary tabular-nums"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.6, Number((z + 0.15).toFixed(2))))}
                className="p-1.5 text-content-secondary hover:text-content-primary"
                aria-label="放大页面"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 页码直达 */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const target = Number(pageInput);
                if (!Number.isNaN(target) && target >= 1) jumpToPage(target);
              }}
              className="flex items-center gap-1 bg-white/75 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 rounded-lg px-2 py-1"
            >
              <input
                type="number"
                min={1}
                max={numPages}
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                aria-label="跳转页码"
                className="w-10 text-center text-xs bg-transparent text-content-primary outline-none tabular-nums"
              />
              <span className="text-[11px] text-content-secondary tabular-nums">/ {numPages}</span>
            </form>

            <StudyScreenshot compact />
          </div>
        </div>

        {/* 实体精装书籍容器（复用 BookSpread 3D 单页物理翻书） */}
        <div id="study-book-root" className="rounded-lg p-2 sm:p-4">
          <div className="relative" data-physical-book-shell>
            <div
              className="pointer-events-none absolute -bottom-3 inset-x-4 h-7 rounded-full blur-xl opacity-45"
              style={{
                background: 'radial-gradient(60% 100% at 50% 50%, rgba(15, 23, 42, 0.45), transparent 85%)',
              }}
            />

            <div
              className="relative rounded-[12px] p-2 sm:p-2.5 pb-3 sm:pb-3.5 shadow-[0_22px_48px_-14px_rgba(15,23,42,0.34)] ring-1 ring-[#D4AD72]/35"
              style={{
                background: 'linear-gradient(160deg, #273347 0%, #192231 52%, #232E40 100%)',
              }}
            >
              <div className="relative">
                {/* 可点击的麦穗金缎面丝带书签 */}
                <button
                  type="button"
                  data-pdf-bookmark-toggle
                  onClick={handleToggleBookmark}
                  title={
                    activeBookmark
                      ? `取消第 ${activeBookmark.pageNumber} 页书签`
                      : `将第 ${visible.left || 1} 页加入书签`
                  }
                  className="hidden md:flex absolute -top-2.5 left-1/2 -translate-x-1/2 z-40 w-4 h-8 items-start justify-center pt-1 shadow-md transition-transform hover:scale-110"
                  style={{
                    background: activeBookmark
                      ? 'linear-gradient(180deg, #F6D88C 0%, #D4AD72 100%)'
                      : 'linear-gradient(180deg, rgba(212,173,114,0.45) 0%, rgba(140,108,58,0.55) 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)',
                  }}
                >
                  {activeBookmark && <span className="w-1.5 h-1.5 rounded-full bg-[#192231]" />}
                </button>

                <div className="relative flex items-stretch">
                  {/* 左纸垛 */}
                  <div aria-hidden="true" className="hidden md:flex w-4 shrink-0 justify-end">
                    <div
                      data-book-stack="left"
                      className="h-full rounded-l-[3px] border-r border-black/10 transition-[width] duration-200 ease-out"
                      style={{
                        width: `${leftStackWidth}px`,
                        background:
                          'repeating-linear-gradient(to right, #cfd6e3 0px, #cfd6e3 1.5px, #eef2f7 1.5px, #eef2f7 3px)',
                        boxShadow: 'inset -3px 0 6px rgba(15, 29, 51, 0.16)',
                      }}
                    />
                  </div>

                  {/* 3D 舞台 */}
                  <div
                    ref={spreadStageRef}
                    className="relative flex-1 min-w-0 min-h-[580px]"
                    style={
                      activeFlip
                        ? { perspective: '2400px', transformStyle: 'preserve-3d' }
                        : undefined
                    }
                  >
                    <div
                      data-book-base-spread
                      className={`relative grid items-stretch gap-0 min-h-[580px] rounded-[2px] overflow-hidden shadow-[inset_0_0_0_1px_rgba(15,29,51,0.06)] ${
                        effectiveMode === 'double' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                      }`}
                      style={
                        activeFlip
                          ? { height: `${activeFlip.lockedHeight}px`, transform: 'translateZ(0px)' }
                          : undefined
                      }
                    >
                      {effectiveMode === 'double' && (
                        <div
                          aria-hidden="true"
                          className="pointer-events-none hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 z-20"
                          style={{
                            background:
                              'linear-gradient(to right, transparent 0%, rgba(15,23,42,0.05) 26%, rgba(15,23,42,0.16) 49%, rgba(255,255,255,0.45) 50%, rgba(15,23,42,0.15) 51%, rgba(15,23,42,0.04) 74%, transparent 100%)',
                          }}
                        />
                      )}

                      {/* 基础左页（或单页模式唯一页） */}
                      <div className="relative h-full overflow-hidden">
                        {renderPageWithHeader(baseLeftPages.left, 'left', !activeFlip)}
                        {activeFlip && activeFlip.direction === 'forward' && (
                          <div
                            ref={landShadowRef}
                            aria-hidden="true"
                            className="pointer-events-none hidden md:block absolute inset-0 z-10"
                            style={{
                              opacity: 0,
                              willChange: 'opacity',
                              background:
                                'linear-gradient(to left, rgba(15,23,42,0.22) 0%, rgba(15,23,42,0.08) 38%, transparent 82%)',
                            }}
                          />
                        )}
                        {activeFlip && activeFlip.direction === 'back' && (
                          <div
                            ref={underShadowRef}
                            aria-hidden="true"
                            className="pointer-events-none hidden md:block absolute inset-0 z-10"
                            style={{
                              opacity: 1,
                              willChange: 'opacity',
                              background:
                                'linear-gradient(to left, rgba(15,23,42,0.34) 0%, rgba(15,23,42,0.14) 36%, transparent 78%)',
                            }}
                          />
                        )}
                      </div>

                      {/* 基础右页（仅双页模式） */}
                      {effectiveMode === 'double' && (
                        <div className="relative h-full overflow-hidden">
                          {renderPageWithHeader(baseRightPages.right, 'right', !activeFlip)}
                          {activeFlip && activeFlip.direction === 'forward' && (
                            <div
                              ref={underShadowRef}
                              aria-hidden="true"
                              className="pointer-events-none hidden md:block absolute inset-0 z-10"
                              style={{
                                opacity: 1,
                                willChange: 'opacity',
                                background:
                                  'linear-gradient(to right, rgba(15,23,42,0.34) 0%, rgba(15,23,42,0.14) 36%, transparent 78%)',
                              }}
                            />
                          )}
                          {activeFlip && activeFlip.direction === 'back' && (
                            <div
                              ref={landShadowRef}
                              aria-hidden="true"
                              className="pointer-events-none hidden md:block absolute inset-0 z-10"
                              style={{
                                opacity: 0,
                                willChange: 'opacity',
                                background:
                                  'linear-gradient(to right, rgba(15,23,42,0.22) 0%, rgba(15,23,42,0.08) 38%, transparent 82%)',
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>

                    {/* 3D 双面立体活动纸页 */}
                    {activeFlip && effectiveMode === 'double' && flipFromPages && flipToPages && (
                      <div
                        ref={leafRef}
                        data-book-flip-leaf
                        className="pointer-events-none hidden md:block absolute top-0 z-30"
                        style={{
                          left: activeFlip.direction === 'forward' ? '50%' : '0%',
                          width: '50%',
                          height: `${activeFlip.lockedHeight}px`,
                          transformOrigin:
                            activeFlip.direction === 'forward' ? 'left center' : 'right center',
                          transformStyle: 'preserve-3d',
                          willChange: 'transform',
                          transform: 'translateZ(4px) rotateY(0deg)',
                        }}
                      >
                        <div
                          ref={leafShadowRef}
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-sm"
                          style={{
                            opacity: 0.12,
                            willChange: 'opacity',
                            boxShadow: '0 22px 44px rgba(15, 23, 42, 0.36)',
                          }}
                        />

                        <div
                          ref={leafFrontRef}
                          className={`absolute inset-0 overflow-hidden ${
                            activeFlip.direction === 'forward'
                              ? 'rounded-r-sm border-r border-white/80'
                              : 'rounded-l-sm border-l border-white/80'
                          }`}
                          style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'translateZ(0.5px) rotateY(0deg)',
                            opacity: 1,
                            willChange: 'opacity',
                          }}
                        >
                          {renderPageWithHeader(
                            activeFlip.direction === 'forward' ? flipFromPages.right : flipFromPages.left,
                            activeFlip.direction === 'forward' ? 'right' : 'left',
                            false
                          )}
                          <div
                            ref={frontShadeRef}
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0"
                            style={{
                              opacity: 0,
                              willChange: 'opacity',
                              background:
                                activeFlip.direction === 'forward'
                                  ? 'linear-gradient(to left, rgba(255,255,255,0.22) 0%, rgba(15,23,42,0.14) 55%, rgba(15,23,42,0.28) 100%)'
                                  : 'linear-gradient(to right, rgba(255,255,255,0.22) 0%, rgba(15,23,42,0.14) 55%, rgba(15,23,42,0.28) 100%)',
                            }}
                          />
                        </div>

                        <div
                          ref={leafBackRef}
                          className={`absolute inset-0 overflow-hidden ${
                            activeFlip.direction === 'forward'
                              ? 'rounded-l-sm border-l border-white/80'
                              : 'rounded-r-sm border-r border-white/80'
                          }`}
                          style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg) translateZ(0.5px)',
                            opacity: 0,
                            willChange: 'opacity',
                          }}
                        >
                          {renderPageWithHeader(
                            activeFlip.direction === 'forward' ? flipToPages.left : flipToPages.right,
                            activeFlip.direction === 'forward' ? 'left' : 'right',
                            false
                          )}
                          <div
                            ref={backShadeRef}
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0"
                            style={{
                              opacity: 1,
                              willChange: 'opacity',
                              background:
                                activeFlip.direction === 'forward'
                                  ? 'linear-gradient(to right, rgba(255,255,255,0.18) 0%, rgba(15,23,42,0.28) 100%)'
                                  : 'linear-gradient(to left, rgba(255,255,255,0.18) 0%, rgba(15,23,42,0.28) 100%)',
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* 左下角翻上一页热区 */}
                    {canTurnPrev && effectiveMode === 'double' && (
                      <div
                        data-page-corner="prev"
                        onPointerDown={(e) => handleCornerPointerDown('back', e)}
                        title="点击或向右拖拽翻上一页"
                        className="group hidden md:block absolute bottom-0 left-0 w-20 h-20 z-30 cursor-grab active:cursor-grabbing select-none"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 w-[18px] h-[18px] group-hover:w-[46px] group-hover:h-[46px] transition-all duration-200"
                          style={{
                            clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
                            background: 'linear-gradient(225deg, rgba(15,23,42,0.16) 0%, #D9E0EC 42%, #EEF2F7 100%)',
                          }}
                        />
                        <div
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 w-[18px] h-[18px] group-hover:w-[46px] group-hover:h-[46px] transition-all duration-200"
                          style={{
                            clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                            background: 'linear-gradient(225deg, #FFFFFF 0%, #F4F6FA 48%, #D4DCE8 100%)',
                          }}
                        />
                      </div>
                    )}

                    {/* 右下角翻下一页热区 */}
                    {canTurnNext && effectiveMode === 'double' && (
                      <div
                        data-page-corner="next"
                        onPointerDown={(e) => handleCornerPointerDown('forward', e)}
                        title="点击或向左拖拽翻下一页"
                        className="group hidden md:block absolute bottom-0 right-0 w-20 h-20 z-30 cursor-grab active:cursor-grabbing select-none"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute bottom-0 right-0 w-[18px] h-[18px] group-hover:w-[46px] group-hover:h-[46px] transition-all duration-200"
                          style={{
                            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                            background: 'linear-gradient(135deg, rgba(15,23,42,0.16) 0%, #D9E0EC 42%, #EEF2F7 100%)',
                          }}
                        />
                        <div
                          aria-hidden="true"
                          className="absolute bottom-0 right-0 w-[18px] h-[18px] group-hover:w-[46px] group-hover:h-[46px] transition-all duration-200"
                          style={{
                            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                            background: 'linear-gradient(135deg, #FFFFFF 0%, #F4F6FA 48%, #D4DCE8 100%)',
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* 右纸垛 */}
                  <div aria-hidden="true" className="hidden md:flex w-4 shrink-0 justify-start">
                    <div
                      data-book-stack="right"
                      className="h-full rounded-r-[3px] border-l border-black/10 transition-[width] duration-200 ease-out"
                      style={{
                        width: `${rightStackWidth}px`,
                        background:
                          'repeating-linear-gradient(to left, #cfd6e3 0px, #cfd6e3 1.5px, #eef2f7 1.5px, #eef2f7 3px)',
                        boxShadow: 'inset 3px 0 6px rgba(15, 29, 51, 0.16)',
                      }}
                    />
                  </div>
                </div>

                {/* 底部厚纸垛切口 */}
                <div className="relative mx-0 md:mx-4 h-4 sm:h-5 rounded-b-[4px] overflow-hidden border-t border-black/10">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'repeating-linear-gradient(to bottom, #eef2f7 0px, #eef2f7 2px, #cfd6e3 2px, #cfd6e3 3.5px)',
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to right, rgba(15,23,42,0.12) 0%, rgba(255,255,255,0.22) 25%, rgba(15,23,42,0.06) 44%, rgba(15,23,42,0.26) 50%, rgba(15,23,42,0.06) 56%, rgba(255,255,255,0.22) 75%, rgba(15,23,42,0.14) 100%)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-5 h-full bg-[#192231]/80 border-x border-[#D4AD72]/35"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 底部翻页控制条 */}
          <div className="mt-4 flex items-center justify-between select-none px-2">
            <button
              type="button"
              data-pdf-prev
              onClick={goPrev}
              disabled={!canTurnPrev}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-content-secondary hover:text-content-primary hover:bg-white/60 dark:hover:bg-white/10 disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> 上一页
            </button>

            <span className="text-xs text-content-secondary tabular-nums">
              {effectiveMode === 'double' && visible.right
                ? `第 ${visible.left} - ${visible.right} 页 · 共 ${numPages} 页`
                : `第 ${visible.left || 1} 页 · 共 ${numPages} 页`}
            </span>

            <button
              type="button"
              data-pdf-next
              onClick={goNext}
              disabled={!canTurnNext}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-content-secondary hover:text-content-primary hover:bg-white/60 dark:hover:bg-white/10 disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
            >
              下一页 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ===== 右侧边栏：目录/批注/局部导出 + 局部 AI 伴读 ===== */}
      <aside className="hidden xl:flex flex-col gap-3 w-[320px] 2xl:w-[350px] shrink-0 sticky top-4 h-[calc(100vh-5.5rem)]">
        {/* 上半卡：目录书签 / 批注 / 导出同步 */}
        <div className="shrink-0 max-h-[46%] flex flex-col bg-white/95 dark:bg-slate-900/90 rounded-xl border border-black/5 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="grid grid-cols-3 border-b border-black/5 dark:border-white/10 p-1 gap-1 bg-slate-50/70 dark:bg-white/[0.03]">
            {[
              { id: 'notes' as const, label: `批注 (${annotations.length})`, Icon: MessageSquareText },
              { id: 'outline' as const, label: `目录 (${bookmarks.length})`, Icon: ListTree },
              { id: 'export' as const, label: '导出/同步', Icon: Share2 },
            ].map(({ id, label, Icon }) => {
              const active = sideTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  data-pdf-side-tab={id}
                  onClick={() => setSideTab(id)}
                  className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                    active
                      ? 'bg-[#192231] text-[#F2EDE4] shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3 h-3 text-[#D4AD72]" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs">
            {/* TAB 1: 批注管理 */}
            {sideTab === 'notes' && (
              <>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/10 rounded-full p-0.5">
                    <button
                      type="button"
                      onClick={() => setNotesFilter('visible')}
                      className={`px-2.5 py-0.5 rounded-full text-[11px] ${
                        notesFilter === 'visible'
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium shadow-sm'
                          : 'text-slate-500 dark:text-slate-300'
                      }`}
                    >
                      当前页
                    </button>
                    <button
                      type="button"
                      onClick={() => setNotesFilter('all')}
                      className={`px-2.5 py-0.5 rounded-full text-[11px] ${
                        notesFilter === 'all'
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium shadow-sm'
                          : 'text-slate-500 dark:text-slate-300'
                      }`}
                    >
                      全书 ({annotations.length})
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400">可开图钉直标页面</span>
                </div>

                {/* 添加整页笔记 */}
                <div className="space-y-1.5 bg-slate-50 dark:bg-white/[0.04] rounded-lg p-2 border border-slate-200/70 dark:border-white/10">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>添加整页心得</span>
                    {visible.right && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setPageNoteTarget('left')}
                          className={`px-1.5 py-0.5 rounded ${
                            pageNoteTarget === 'left' ? 'bg-[#D4AD72]/25 text-[#B45309] dark:text-[#D4AD72] font-medium' : ''
                          }`}
                        >
                          P.{visible.left}
                        </button>
                        <button
                          type="button"
                          onClick={() => setPageNoteTarget('right')}
                          className={`px-1.5 py-0.5 rounded ${
                            pageNoteTarget === 'right' ? 'bg-[#D4AD72]/25 text-[#B45309] dark:text-[#D4AD72] font-medium' : ''
                          }`}
                        >
                          P.{visible.right}
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={pageNoteDraft}
                      onChange={(e) => setPageNoteDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddPageNote();
                      }}
                      placeholder={`记一条第 ${
                        pageNoteTarget === 'right' && visible.right ? visible.right : visible.left || 1
                      } 页笔记...`}
                      className="flex-1 min-w-0 px-2.5 py-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs text-slate-800 dark:text-slate-100 outline-none focus:border-[#D4AD72]"
                    />
                    <button
                      type="button"
                      disabled={savingPageNote || !pageNoteDraft.trim()}
                      onClick={handleAddPageNote}
                      className="px-2.5 py-1.5 rounded-md bg-[#192231] text-[#F2EDE4] text-[11px] font-medium disabled:opacity-45"
                    >
                      保存
                    </button>
                  </div>
                </div>

                {displayedAnnotations.length === 0 ? (
                  <p className="text-[11px] text-slate-400 text-center py-4">
                    当前范围暂无批注，点击上方「图钉批注」可在书页上落钉记录
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {displayedAnnotations.map((ann) => {
                      const colorMeta = PIN_COLOR_META[ann.color] || PIN_COLOR_META.amber;
                      return (
                        <div
                          key={ann.id}
                          onClick={() => {
                            jumpToPage(ann.pageNumber);
                            setHighlightedPinId(ann.id);
                          }}
                          className="group p-2 rounded-lg bg-slate-50/90 dark:bg-white/[0.04] hover:bg-amber-50/70 dark:hover:bg-white/[0.08] border border-slate-200/70 dark:border-white/10 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: colorMeta.dot }}
                              />
                              P.{ann.pageNumber} · {ann.type === 'pin' ? '图钉' : '页内笔记'}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAnnotation(ann.id);
                              }}
                              className="opacity-60 hover:opacity-100 text-slate-400 hover:text-rose-500"
                              aria-label="删除批注"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed break-words">
                            {ann.noteContent}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* TAB 2: PDF 目录与书签 */}
            {sideTab === 'outline' && (
              <>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                    <span>黄金丝带书签</span>
                    <button
                      type="button"
                      onClick={handleToggleBookmark}
                      className="text-[11px] text-[#B8862E] dark:text-[#D4AD72] hover:underline"
                    >
                      {activeBookmark ? '移除当前页' : `+ 收藏 P.${visible.left || 1}`}
                    </button>
                  </div>
                  {bookmarks.length === 0 ? (
                    <p className="text-[11px] text-slate-400 py-1.5">
                      暂无书签，点击书脊顶部的金丝带即可标记页码
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {bookmarks.map((bm) => (
                        <div
                          key={bm.id}
                          onClick={() => jumpToPage(bm.pageNumber)}
                          className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-md bg-amber-50/70 dark:bg-amber-500/10 border border-amber-200/70 dark:border-amber-500/20 cursor-pointer"
                        >
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-800 dark:text-amber-200 truncate">
                            <Bookmark className="w-3 h-3 text-[#D4AD72] shrink-0" />
                            第 {bm.pageNumber} 页
                          </span>
                          <button
                            type="button"
                            onClick={async (e) => {
                              e.stopPropagation();
                              await deletePdfBookmark(bookId, bm.pageNumber);
                              setBookmarks((prev) =>
                                prev.filter((item) => item.pageNumber !== bm.pageNumber)
                              );
                            }}
                            className="text-slate-400 hover:text-rose-500"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200/70 dark:border-white/10">
                  <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    PDF 章节目录
                  </p>
                  {outline.length === 0 ? (
                    <p className="text-[11px] text-slate-400">该 PDF 未嵌入电子目录</p>
                  ) : (
                    <div className="space-y-0.5">
                      {outline.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          disabled={!item.pageNumber}
                          onClick={() => item.pageNumber && jumpToPage(item.pageNumber)}
                          style={{ paddingLeft: `${8 + Math.min(item.level, 3) * 10}px` }}
                          className="w-full flex items-center justify-between gap-2 py-1 pr-2 rounded-md text-left text-[11px] text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5"
                        >
                          <span className="truncate">{item.title}</span>
                          {item.pageNumber && (
                            <span className="text-[10px] text-slate-400 shrink-0 tabular-nums">
                              P.{item.pageNumber}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* TAB 3: 选定范围导出 Markdown 与同步「我的笔记」 */}
            {sideTab === 'export' && (
              <div className="space-y-3">
                <div>
                  <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    选择导出 / 同步页码范围
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'current_spread' as const, label: '当前两页' },
                      { id: 'current_page' as const, label: `当前单页 (P.${visible.left || 1})` },
                      { id: 'annotated' as const, label: '仅含批注页' },
                      { id: 'custom' as const, label: '自选页码' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setExportScope(opt.id)}
                        className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${
                          exportScope === opt.id
                            ? 'bg-[#192231] text-[#F2EDE4] border-[#D4AD72]/50'
                            : 'bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {exportScope === 'custom' && (
                    <input
                      type="text"
                      value={exportCustomExpr}
                      onChange={(e) => setExportCustomExpr(e.target.value)}
                      placeholder="例如: 1-3, 5, 8"
                      className="mt-2 w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs text-slate-800 dark:text-slate-100 outline-none focus:border-[#D4AD72]"
                    />
                  )}
                  <p className="mt-1.5 text-[10px] text-slate-400">
                    本次将汇总第 {selectedExportPages.join(', ')} 页（避免整本过长冗余）
                  </p>
                </div>

                <label className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeExcerpt}
                    onChange={(e) => setIncludeExcerpt(e.target.checked)}
                    className="rounded border-slate-300 text-[#D4AD72]"
                  />
                  <span>附带选中页的 PDF 正文摘录</span>
                </label>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    data-pdf-export-md
                    onClick={handleExportMarkdown}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white text-[11px] font-medium hover:bg-slate-200 dark:hover:bg-white/15 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#B8862E] dark:text-[#D4AD72]" />
                    导出 Markdown
                  </button>
                  <button
                    type="button"
                    data-pdf-sync-note
                    disabled={syncingNote}
                    onClick={handleSyncToMyNotes}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#192231] text-[#F2EDE4] text-[11px] font-medium border border-[#D4AD72]/40 hover:bg-[#232E40] disabled:opacity-50"
                  >
                    <FilePlus2 className="w-3.5 h-3.5 text-[#D4AD72]" />
                    {syncingNote ? '同步中...' : '同步我的笔记'}
                  </button>
                </div>

                {syncSuccess && (
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-700 dark:text-emerald-300 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 shrink-0" /> {syncSuccess.msg}
                    </span>
                    {syncSuccess.noteId && (
                      <Link
                        href={`/notes/${syncSuccess.noteId}`}
                        className="underline font-medium shrink-0"
                      >
                        查看
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 下半卡：AI 局部识页选择器 + 禾硙 AI 助手 */}
        <div className="flex-1 min-h-[340px] flex flex-col bg-white/95 dark:bg-slate-900/90 rounded-xl border border-black/5 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="shrink-0 px-3 py-2 border-b border-black/5 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03] space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-800 dark:text-slate-100">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AD72]" />
                AI 识页范围
              </span>
              <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-white/10 rounded-full p-0.5 text-[10px]">
                <button
                  type="button"
                  data-ai-scope-current
                  onClick={() => setAiScopeMode('current')}
                  className={`px-2 py-0.5 rounded-full transition-colors ${
                    aiScopeMode === 'current'
                      ? 'bg-[#192231] text-[#F2EDE4] font-medium'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  当前两页
                </button>
                <button
                  type="button"
                  data-ai-scope-custom
                  onClick={() => setAiScopeMode('custom')}
                  className={`px-2 py-0.5 rounded-full transition-colors ${
                    aiScopeMode === 'custom'
                      ? 'bg-[#192231] text-[#F2EDE4] font-medium'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  自选页码
                </button>
              </div>
            </div>

            {aiScopeMode === 'custom' && (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  data-ai-scope-input
                  value={aiCustomExpr}
                  onChange={(e) => setAiCustomExpr(e.target.value)}
                  placeholder="输入页码如 1-3, 5（最多 10 页）"
                  className="flex-1 px-2 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-[11px] text-slate-800 dark:text-slate-100 outline-none focus:border-[#D4AD72]"
                />
              </div>
            )}

            <p data-ai-scope-status className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {aiContextStats.charCount > 0
                ? `已同步第 ${aiTargetPages.join(', ')} 页正文 (${aiContextStats.charCount} 字) + 批注`
                : `已选中第 ${aiTargetPages.join(', ')} 页（纯扫描图无文字层时，可用截图/图钉协助 AI）`}
            </p>
          </div>

          <div className="flex-1 min-h-0">
            <AiChatPanel />
          </div>
        </div>
      </aside>
    </div>
  );
}
