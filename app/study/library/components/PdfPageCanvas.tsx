'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Trash2, Check, X } from 'lucide-react';
import { PIN_COLOR_META, type PdfAnnotationItem, type PinColor } from '../api';
import type { PdfPageRenderCache, CachedPageBitmap } from './pdfPageCache';

interface PdfPageCanvasProps {
  pdfDoc: any | null;
  pageCache?: PdfPageRenderCache | null;
  pageNumber: number | null;
  scale?: number;
  pins: PdfAnnotationItem[];
  showPins: boolean;
  pinMode: boolean;
  highlightedPinId?: number | null;
  interactive?: boolean;
  onWidthMeasured?: (width: number) => void;
  onCreatePin?: (pageNumber: number, xPct: number, yPct: number, color: PinColor, content: string) => Promise<void>;
  onUpdatePin?: (annId: number, content: string, color: PinColor) => Promise<void>;
  onDeletePin?: (annId: number) => Promise<void>;
}

const PIN_COLORS: PinColor[] = ['amber', 'blue', 'emerald', 'rose', 'violet'];

export default function PdfPageCanvas({
  pdfDoc,
  pageCache,
  pageNumber,
  scale = 1,
  pins,
  showPins,
  pinMode,
  highlightedPinId,
  interactive = true,
  onWidthMeasured,
  onCreatePin,
  onUpdatePin,
  onDeletePin,
}: PdfPageCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rendering, setRendering] = useState(false);
  const [cacheHit, setCacheHit] = useState(false);
  const [containerWidth, setContainerWidth] = useState(460);

  const [draftPin, setDraftPin] = useState<{
    xPct: number;
    yPct: number;
    color: PinColor;
    content: string;
  } | null>(null);
  const [savingDraft, setSavingDraft] = useState(false);

  const [editingPinId, setEditingPinId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [editingColor, setEditingColor] = useState<PinColor>('amber');

  // 监听纸面可用宽度以实现高清自适应渲染（首帧同步测量避免按默认宽度白费渲染）
  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const updateWidth = () => {
      const w = Math.round(el.clientWidth);
      if (w > 120) {
        setContainerWidth(w);
        onWidthMeasured?.(w);
      }
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, [onWidthMeasured]);

  // 将预渲染好的位图贴到可视 Canvas 上（< 1ms 零闪烁）
  const blitBitmap = (bitmap: CachedPageBitmap) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = bitmap.canvas.width;
    canvas.height = bitmap.canvas.height;
    canvas.style.width = `${bitmap.cssWidth}px`;
    canvas.style.height = `${bitmap.cssHeight}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(bitmap.canvas, 0, 0);
    }
  };

  // 渲染当前 PDF 页到 Canvas（优先命中预渲染缓存，未命中则异步渲染并写入缓存）
  useEffect(() => {
    let cancelled = false;
    let renderTask: any = null;

    if (!pdfDoc || !pageNumber || pageNumber < 1 || pageNumber > pdfDoc.numPages) {
      return;
    }

    const cssTargetWidth = Math.max(200, Math.round(containerWidth * scale));
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    const syncHit = pageCache?.getSync(pageNumber, cssTargetWidth, dpr);
    if (syncHit) {
      blitBitmap(syncHit);
      setCacheHit(true);
      setRendering(false);
      return;
    }

    setCacheHit(false);

    const renderPage = async () => {
      setRendering(true);
      try {
        if (pageCache) {
          const bitmap = await pageCache.renderPage(pageNumber, cssTargetWidth, dpr);
          if (!cancelled) {
            blitBitmap(bitmap);
          }
          return;
        }

        const page = await pdfDoc.getPage(pageNumber);
        if (cancelled) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const cssScale = cssTargetWidth / Math.max(1, baseViewport.width);
        const renderViewport = page.getViewport({ scale: cssScale * dpr });
        const displayViewport = page.getViewport({ scale: cssScale });

        canvas.width = Math.max(1, Math.round(renderViewport.width));
        canvas.height = Math.max(1, Math.round(renderViewport.height));
        canvas.style.width = `${Math.round(displayViewport.width)}px`;
        canvas.style.height = `${Math.round(displayViewport.height)}px`;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        renderTask = page.render({ canvasContext: ctx, viewport: renderViewport, canvas });
        await renderTask.promise;
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          // 忽略取消外的瞬时中断
        }
      } finally {
        if (!cancelled) setRendering(false);
      }
    };

    renderPage();
    return () => {
      cancelled = true;
      try {
        renderTask?.cancel();
      } catch {}
    };
  }, [pdfDoc, pageCache, pageNumber, containerWidth, scale]);

  useEffect(() => {
    setDraftPin(null);
    setEditingPinId(null);
  }, [pageNumber]);

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !pageNumber || !onCreatePin) return;
    if (!pinMode && !e.altKey) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const xPct = Math.max(3, Math.min(97, ((e.clientX - rect.left) / rect.width) * 100));
    const yPct = Math.max(3, Math.min(97, ((e.clientY - rect.top) / rect.height) * 100));
    setEditingPinId(null);
    setDraftPin({
      xPct: Number(xPct.toFixed(2)),
      yPct: Number(yPct.toFixed(2)),
      color: 'amber',
      content: '',
    });
  };

  if (!pageNumber) {
    return (
      <div className="w-full h-full min-h-[480px] flex flex-col items-center justify-center text-xs text-slate-400 select-none">
        <span>本书已至末页</span>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full h-full flex flex-col justify-start ${
        scale > 1 ? 'items-start' : 'items-center'
      }`}
    >
      <div
        onClick={handleStageClick}
        data-pdf-page-surface={pageNumber}
        data-pdf-cache-hit={cacheHit ? '1' : '0'}
        className={`relative inline-block shadow-[0_6px_20px_rgba(15,23,42,0.08)] rounded-[2px] bg-white ${
          scale > 1 ? 'mx-auto' : 'max-w-full'
        } ${interactive && pinMode ? 'cursor-crosshair' : ''}`}
      >
        <canvas
          ref={canvasRef}
          className={`block rounded-[2px] ${scale > 1 ? '' : 'max-w-full h-auto'}`}
        />

        {rendering && (
          <div className="pointer-events-none absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-900/70 text-[#F2EDE4] text-[10px]">
            渲染中...
          </div>
        )}

        {/* 图钉坐标批注叠加层 */}
        {showPins &&
          pins
            .filter((p) => p.type === 'pin' && p.xPct != null && p.yPct != null)
            .map((pin, idx) => {
              const meta = PIN_COLOR_META[pin.color] || PIN_COLOR_META.amber;
              const isHighlighted = highlightedPinId === pin.id;
              const isEditing = editingPinId === pin.id;
              const leftPct = Number(pin.xPct);
              const topPct = Number(pin.yPct);

              return (
                <div
                  key={pin.id}
                  data-pdf-pin-id={pin.id}
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  onClick={(ev) => ev.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (!interactive) return;
                      setDraftPin(null);
                      if (isEditing) {
                        setEditingPinId(null);
                      } else {
                        setEditingPinId(pin.id);
                        setEditingContent(pin.noteContent);
                        setEditingColor(pin.color || 'amber');
                      }
                    }}
                    title={pin.noteContent}
                    className={`w-6 h-6 rounded-full text-[11px] font-bold text-white shadow-md flex items-center justify-center transition-transform hover:scale-110 ${
                      isHighlighted ? 'scale-125 ring-4' : 'ring-2 ring-white'
                    }`}
                    style={{
                      backgroundColor: meta.dot,
                      boxShadow: `0 4px 12px ${meta.ring}`,
                    }}
                  >
                    {idx + 1}
                  </button>

                  {interactive && isEditing && (
                    <div
                      className={`mt-2 w-60 rounded-xl bg-[#192231] text-[#F2EDE4] p-3 shadow-2xl border border-[#D4AD72]/40 z-30 ${
                        leftPct > 65 ? '-translate-x-48' : '-translate-x-6'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          {PIN_COLORS.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setEditingColor(c)}
                              className={`w-4 h-4 rounded-full transition-transform ${
                                editingColor === c ? 'scale-125 ring-2 ring-white' : 'opacity-70'
                              }`}
                              style={{ backgroundColor: PIN_COLOR_META[c].dot }}
                              aria-label={PIN_COLOR_META[c].label}
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditingPinId(null)}
                          className="text-slate-400 hover:text-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={3}
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="w-full rounded-lg bg-white/10 border border-white/15 px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#D4AD72]"
                      />
                      <div className="mt-2 flex items-center justify-between">
                        {onDeletePin && (
                          <button
                            type="button"
                            onClick={async () => {
                              await onDeletePin(pin.id);
                              setEditingPinId(null);
                            }}
                            className="inline-flex items-center gap-1 text-[11px] text-rose-300 hover:text-rose-200"
                          >
                            <Trash2 className="w-3 h-3" /> 删除
                          </button>
                        )}
                        {onUpdatePin && (
                          <button
                            type="button"
                            onClick={async () => {
                              if (!editingContent.trim()) return;
                              await onUpdatePin(pin.id, editingContent.trim(), editingColor);
                              setEditingPinId(null);
                            }}
                            className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#D4AD72] text-[#192231] text-[11px] font-semibold"
                          >
                            <Check className="w-3 h-3" /> 保存
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

        {/* 新增图钉浮层 */}
        {interactive && draftPin && (
          <div
            style={{ left: `${draftPin.xPct}%`, top: `${draftPin.yPct}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
            onClick={(ev) => ev.stopPropagation()}
          >
            <div
              className="w-6 h-6 rounded-full text-[11px] font-bold text-white shadow-md flex items-center justify-center ring-2 ring-white animate-pulse"
              style={{ backgroundColor: PIN_COLOR_META[draftPin.color].dot }}
            >
              +
            </div>
            <div
              className={`mt-2 w-64 rounded-xl bg-[#192231] text-[#F2EDE4] p-3 shadow-2xl border border-[#D4AD72]/50 ${
                draftPin.xPct > 65 ? '-translate-x-52' : '-translate-x-6'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-[#D4AD72]">
                  第 {pageNumber} 页图钉批注
                </span>
                <div className="flex items-center gap-1.5">
                  {PIN_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setDraftPin((prev) => (prev ? { ...prev, color: c } : prev))}
                      className={`w-3.5 h-3.5 rounded-full ${
                        draftPin.color === c ? 'scale-125 ring-2 ring-white' : 'opacity-70'
                      }`}
                      style={{ backgroundColor: PIN_COLOR_META[c].dot }}
                      aria-label={PIN_COLOR_META[c].label}
                    />
                  ))}
                </div>
              </div>
              <textarea
                rows={3}
                autoFocus
                data-pin-draft-input
                value={draftPin.content}
                onChange={(e) =>
                  setDraftPin((prev) => (prev ? { ...prev, content: e.target.value } : prev))
                }
                placeholder="输入对此处公式、图表或段落的笔记..."
                className="w-full rounded-lg bg-white/10 border border-white/15 px-2.5 py-1.5 text-xs text-white placeholder:text-slate-400 outline-none focus:border-[#D4AD72]"
              />
              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDraftPin(null)}
                  className="px-2.5 py-1 rounded-md text-[11px] text-slate-300 hover:text-white"
                >
                  取消
                </button>
                <button
                  type="button"
                  disabled={savingDraft || !draftPin.content.trim()}
                  data-pin-draft-save
                  onClick={async () => {
                    if (!onCreatePin || !draftPin.content.trim()) return;
                    setSavingDraft(true);
                    try {
                      await onCreatePin(
                        pageNumber,
                        draftPin.xPct,
                        draftPin.yPct,
                        draftPin.color,
                        draftPin.content.trim()
                      );
                      setDraftPin(null);
                    } finally {
                      setSavingDraft(false);
                    }
                  }}
                  className="px-3 py-1 rounded-md bg-[#D4AD72] text-[#192231] text-[11px] font-semibold disabled:opacity-50"
                >
                  {savingDraft ? '保存中...' : '落钉保存'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
