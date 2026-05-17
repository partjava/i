"use client";

import { useState, useRef, useCallback } from 'react';

type Tool = 'none' | 'pen' | 'rect' | 'arrow' | 'text';

interface Annotation {
  tool: Tool;
  color: string;
  width: number;
  points: { x: number; y: number }[];
  text?: string;
}

export default function StudyScreenshot() {
  const [capturing, setCapturing] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [baseImage, setBaseImage] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<Tool>('none');
  const [toolColor, setToolColor] = useState('#e74c3c');
  const [toolWidth, setToolWidth] = useState(3);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [redoStack, setRedoStack] = useState<Annotation[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [currentAnno, setCurrentAnno] = useState<Annotation | null>(null);
  const [cropMode, setCropMode] = useState(false);
  const [cropStart, setCropStart] = useState<{ x: number; y: number } | null>(null);
  const [cropRect, setCropRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [textInput, setTextInput] = useState<{ x: number; y: number; visible: boolean }>({ x: 0, y: 0, visible: false });
  const [textValue, setTextValue] = useState('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const baseImageRef = useRef<HTMLImageElement | null>(null);
  const displayScaleRef = useRef(1);

  const handleCapture = async () => {
    setCapturing(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const mainEl = document.querySelector('main');
      if (!mainEl) return;
      const canvas = await html2canvas(mainEl as HTMLElement, {
        useCORS: true, allowTaint: true, scale: 2,
        backgroundColor: '#faf6f0', logging: false,
      });
      setBaseImage(canvas.toDataURL('image/png'));
      setEditorOpen(true);
    } catch (e) {
      console.error('截图失败:', e);
    } finally {
      setCapturing(false);
    }
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setBaseImage(null);
    setAnnotations([]);
    setRedoStack([]);
    setActiveTool('none');
    setCropMode(false);
    setCropRect(null);
    setCropStart(null);
    setTextInput({ x: 0, y: 0, visible: false });
    setTextValue('');
  };

  const drawAnnotations = useCallback(() => {
    const canvas = canvasRef.current;
    const img = baseImageRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = displayScaleRef.current;
    const w = Math.round(img.naturalWidth * scale);
    const h = Math.round(img.naturalHeight * scale);
    canvas.width = w;
    canvas.height = h;

    ctx.clearRect(0, 0, w, h);

    for (const anno of annotations) {
      if (anno.points.length < 1) continue;
      ctx.strokeStyle = anno.color;
      ctx.fillStyle = anno.color;
      ctx.lineWidth = anno.width * scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const pts = anno.points.map(p => ({ x: p.x * scale, y: p.y * scale }));

      if (anno.tool === 'pen') {
        if (pts.length < 2) continue;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.stroke();
      } else if (anno.tool === 'rect') {
        const start = pts[0];
        const end = pts[pts.length - 1];
        const rx = Math.min(start.x, end.x);
        const ry = Math.min(start.y, end.y);
        const rw = Math.abs(end.x - start.x);
        const rh = Math.abs(end.y - start.y);
        ctx.strokeRect(rx, ry, rw, rh);
      } else if (anno.tool === 'arrow') {
        if (pts.length < 2) continue;
        const arrowA = pts[0];
        const arrowB = pts[pts.length - 1];
        const arrowAngle = Math.atan2(arrowB.y - arrowA.y, arrowB.x - arrowA.x);
        const headLen = 12 * scale;
        ctx.beginPath();
        ctx.moveTo(arrowA.x, arrowA.y);
        ctx.lineTo(arrowB.x, arrowB.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(arrowB.x, arrowB.y);
        ctx.lineTo(
          arrowB.x - headLen * Math.cos(arrowAngle - Math.PI / 6),
          arrowB.y - headLen * Math.sin(arrowAngle - Math.PI / 6)
        );
        ctx.moveTo(arrowB.x, arrowB.y);
        ctx.lineTo(
          arrowB.x - headLen * Math.cos(arrowAngle + Math.PI / 6),
          arrowB.y - headLen * Math.sin(arrowAngle + Math.PI / 6)
        );
        ctx.stroke();
      } else if (anno.tool === 'text') {
        if (!anno.text) continue;
        const fontSize = 14 * scale;
        ctx.font = fontSize + 'px -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif';
        ctx.fillText(anno.text, pts[0].x, pts[0].y);
      }
    }

    if (currentAnno && currentAnno.points.length >= 1) {
      ctx.strokeStyle = currentAnno.color;
      ctx.fillStyle = currentAnno.color;
      ctx.lineWidth = currentAnno.width * scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      const pts = currentAnno.points.map(p => ({ x: p.x * scale, y: p.y * scale }));
      if (currentAnno.tool === 'pen') {
        if (pts.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
      } else if (currentAnno.tool === 'rect') {
        const start = pts[0];
        const end = pts[pts.length - 1];
        ctx.strokeRect(Math.min(start.x, end.x), Math.min(start.y, end.y), Math.abs(end.x - start.x), Math.abs(end.y - start.y));
      } else if (currentAnno.tool === 'arrow') {
        if (pts.length < 2) return;
        const arrowA = pts[0];
        const arrowB = pts[pts.length - 1];
        const arrowAngle = Math.atan2(arrowB.y - arrowA.y, arrowB.x - arrowA.x);
        const headLen = 12 * scale;
        ctx.beginPath(); ctx.moveTo(arrowA.x, arrowA.y); ctx.lineTo(arrowB.x, arrowB.y); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(arrowB.x, arrowB.y);
        ctx.lineTo(arrowB.x - headLen * Math.cos(arrowAngle - Math.PI / 6), arrowB.y - headLen * Math.sin(arrowAngle - Math.PI / 6));
        ctx.moveTo(arrowB.x, arrowB.y);
        ctx.lineTo(arrowB.x - headLen * Math.cos(arrowAngle + Math.PI / 6), arrowB.y - headLen * Math.sin(arrowAngle + Math.PI / 6));
        ctx.stroke();
      }
    }
  }, [annotations, currentAnno]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onImageLoad = (img: HTMLImageElement) => {
    baseImageRef.current = img;
    const maxW = window.innerWidth * 0.9;
    const maxH = window.innerHeight * 0.75;
    const scaleW = maxW / img.naturalWidth;
    const scaleH = maxH / img.naturalHeight;
    displayScaleRef.current = Math.min(scaleW, scaleH, 1);
    drawAnnotations();
  };

  const getEventPos = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const scale = displayScaleRef.current;
    return {
      x: (clientX - rect.left) / scale,
      y: (clientY - rect.top) / scale,
    };
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (activeTool === 'none') return;
    const pos = getEventPos(e);
    e.preventDefault();
    if (activeTool === 'text') {
      setTextInput({ x: pos.x, y: pos.y, visible: true });
      setTextValue('');
      return;
    }
    setDrawing(true);
    setCurrentAnno({ tool: activeTool, color: toolColor, width: toolWidth, points: [pos] });
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing || !currentAnno) return;
    const pos = getEventPos(e);
    e.preventDefault();
    const pts = currentAnno.tool === 'pen'
      ? [...currentAnno.points, pos]
      : [currentAnno.points[0], pos];
    setCurrentAnno({ ...currentAnno, points: pts });
  };

  const handlePointerUp = () => {
    if (!drawing || !currentAnno) return;
    setDrawing(false);
    if (currentAnno.points.length >= 2) {
      setAnnotations(prev => [...prev, { ...currentAnno }]);
      setRedoStack([]);
    }
    setCurrentAnno(null);
  };

  const confirmText = () => {
    if (!textValue.trim()) {
      setTextInput({ x: 0, y: 0, visible: false });
      return;
    }
    setAnnotations(prev => [...prev, {
      tool: 'text' as Tool, color: toolColor, width: toolWidth,
      points: [{ x: textInput.x, y: textInput.y }],
      text: textValue.trim(),
    }]);
    setRedoStack([]);
    setTextInput({ x: 0, y: 0, visible: false });
    setTextValue('');
  };

  const undo = () => {
    if (annotations.length === 0) return;
    const last = annotations[annotations.length - 1];
    setAnnotations(prev => prev.slice(0, -1));
    setRedoStack(prev => [...prev, last]);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, -1));
    setAnnotations(prev => [...prev, next]);
  };

  const handleCropDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!cropMode) return;
    const pos = getEventPos(e);
    e.preventDefault();
    setCropStart(pos);
    setCropRect({ x: pos.x, y: pos.y, w: 0, h: 0 });
  };

  const handleCropMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!cropMode || !cropStart) return;
    const pos = getEventPos(e);
    e.preventDefault();
    setCropRect({
      x: Math.min(cropStart.x, pos.x),
      y: Math.min(cropStart.y, pos.y),
      w: Math.abs(pos.x - cropStart.x),
      h: Math.abs(pos.y - cropStart.y),
    });
  };

  const handleCropUp = () => {
    if (!cropMode) return;
    setCropStart(null);
  };

  const confirmCrop = () => {
    if (!cropRect || cropRect.w < 10 || cropRect.h < 10 || !baseImageRef.current) return;
    const img = baseImageRef.current;
    const offCanvas = document.createElement('canvas');
    offCanvas.width = Math.round(cropRect.w * 2);
    offCanvas.height = Math.round(cropRect.h * 2);
    const ctx = offCanvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, cropRect.x, cropRect.y, cropRect.w, cropRect.h, 0, 0, offCanvas.width, offCanvas.height);
    const newSrc = offCanvas.toDataURL('image/png');
    setBaseImage(newSrc);
    setAnnotations([]);
    setRedoStack([]);
    setCropMode(false);
    setCropRect(null);
    displayScaleRef.current = 0;
    baseImageRef.current.src = newSrc;
  };

  const downloadImage = () => {
    const img = baseImageRef.current;
    if (!img) return;
    const outCanvas = document.createElement('canvas');
    outCanvas.width = img.naturalWidth;
    outCanvas.height = img.naturalHeight;
    const ctx = outCanvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0);

    for (const anno of annotations) {
      ctx.strokeStyle = anno.color;
      ctx.fillStyle = anno.color;
      ctx.lineWidth = anno.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      const pts = anno.points;
      if (anno.tool === 'pen' && pts.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
      } else if (anno.tool === 'rect' && pts.length >= 2) {
        const s = pts[0];
        const e = pts[pts.length - 1];
        ctx.strokeRect(Math.min(s.x, e.x), Math.min(s.y, e.y), Math.abs(e.x - s.x), Math.abs(e.y - s.y));
      } else if (anno.tool === 'arrow' && pts.length >= 2) {
        const aa = pts[0];
        const ab = pts[pts.length - 1];
        const aAngle = Math.atan2(ab.y - aa.y, ab.x - aa.x);
        const hLen = 12;
        ctx.beginPath(); ctx.moveTo(aa.x, aa.y); ctx.lineTo(ab.x, ab.y); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ab.x, ab.y);
        ctx.lineTo(ab.x - hLen * Math.cos(aAngle - Math.PI / 6), ab.y - hLen * Math.sin(aAngle - Math.PI / 6));
        ctx.moveTo(ab.x, ab.y);
        ctx.lineTo(ab.x - hLen * Math.cos(aAngle + Math.PI / 6), ab.y - hLen * Math.sin(aAngle + Math.PI / 6));
        ctx.stroke();
      } else if (anno.tool === 'text' && anno.text) {
        ctx.font = '14px -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif';
        ctx.fillText(anno.text, pts[0].x, pts[0].y);
      }
    }

    const h1 = document.querySelector('main h1');
    const title = h1?.textContent?.trim().replace(/[\\/:*?"<>|]/g, '-') || 'study-screenshot';
    const link = document.createElement('a');
    link.download = title + '.png';
    link.href = outCanvas.toDataURL('image/png');
    link.click();
  };

  // ────────── 关闭状态：右下角浮动按钮 ──────────
  if (!editorOpen) {
    return (
      <button
        onClick={handleCapture}
        disabled={capturing}
        title="截取并编辑当前学习内容"
        style={{
          position: 'fixed', bottom: 96, right: 24, zIndex: 25,
          width: 44, height: 44, borderRadius: 22,
          background: capturing ? '#a0a0a0' : 'linear-gradient(135deg, #8b7355, #6b5640)',
          color: '#fff', border: 'none',
          boxShadow: '0 4px 14px rgba(107,86,64,0.35)',
          cursor: capturing ? 'wait' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, transition: 'all 0.2s', opacity: capturing ? 0.7 : 1,
        }}
      >
        {capturing ? (
          <span style={{ animation: 'spin 0.8s linear infinite' }}>⏳</span>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        )}
      </button>
    );
  }

  // ────────── 编辑状态：全屏编辑器 ──────────
  const btnBase: React.CSSProperties = {
    padding: '6px 10px', borderRadius: 6, border: 'none',
    cursor: 'pointer', fontSize: 13, fontWeight: 500,
    display: 'flex', alignItems: 'center', gap: 4,
    transition: 'all 0.15s', whiteSpace: 'nowrap',
  };

  const colorPresets = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#ffffff', '#000000'];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column' }}>
      {/* 工具栏 */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', padding: '8px 14px', background: '#2c2c2c', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.3)', userSelect: 'none' }}>
          <button onClick={closeEditor} style={{ ...btnBase, background: '#e74c3c', color: '#fff' }}>✕ 关闭</button>

          <div style={{ width: 1, height: 24, background: '#555', margin: '0 4px' }} />

          <button onClick={() => setActiveTool('none')} style={{ ...btnBase, background: activeTool === 'none' ? '#4f8cff' : '#444', color: '#fff' }}>🖐 无</button>
          <button onClick={() => { setActiveTool('pen'); setCropMode(false); }} style={{ ...btnBase, background: activeTool === 'pen' ? '#4f8cff' : '#444', color: '#fff' }}>✏️ 画笔</button>
          <button onClick={() => { setActiveTool('rect'); setCropMode(false); }} style={{ ...btnBase, background: activeTool === 'rect' ? '#4f8cff' : '#444', color: '#fff' }}>⬜ 方框</button>
          <button onClick={() => { setActiveTool('arrow'); setCropMode(false); }} style={{ ...btnBase, background: activeTool === 'arrow' ? '#4f8cff' : '#444', color: '#fff' }}>➡️ 箭头</button>
          <button onClick={() => { setActiveTool('text'); setCropMode(false); }} style={{ ...btnBase, background: activeTool === 'text' ? '#4f8cff' : '#444', color: '#fff' }}>T 文字</button>

          <div style={{ width: 1, height: 24, background: '#555', margin: '0 4px' }} />

          <button onClick={() => { setCropMode(true); setActiveTool('none'); setCropRect(null); setCropStart(null); }} style={{ ...btnBase, background: cropMode ? '#e67e22' : '#444', color: '#fff' }}>✂️ 裁剪</button>
          {cropMode && (
            <>
              <button onClick={confirmCrop} disabled={!cropRect || cropRect.w < 10} style={{ ...btnBase, background: '#2ecc71', color: '#fff' }}>✓ 确认</button>
              <button onClick={() => { setCropMode(false); setCropRect(null); setCropStart(null); }} style={{ ...btnBase, background: '#666', color: '#fff' }}>取消</button>
            </>
          )}

          <div style={{ width: 1, height: 24, background: '#555', margin: '0 4px' }} />

          <button onClick={undo} disabled={annotations.length === 0} style={{ ...btnBase, background: '#555', color: '#ccc', opacity: annotations.length ? 1 : 0.4 }}>↩ 撤回</button>
          <button onClick={redo} disabled={redoStack.length === 0} style={{ ...btnBase, background: '#555', color: '#ccc', opacity: redoStack.length ? 1 : 0.4 }}>↪ 重做</button>

          <div style={{ width: 1, height: 24, background: '#555', margin: '0 4px' }} />

          <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            {colorPresets.map(c => (
              <button key={c} onClick={() => setToolColor(c)} style={{
                width: 22, height: 22, borderRadius: 11,
                border: toolColor === c ? '2px solid #fff' : '2px solid #555',
                background: c, cursor: 'pointer',
                boxShadow: toolColor === c ? '0 0 6px rgba(255,255,255,0.5)' : 'none',
              }} />
            ))}
          </div>

          <div style={{ width: 1, height: 24, background: '#555', margin: '0 4px' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#aaa', fontSize: 12 }}>粗细</span>
            <input type="range" min={1} max={10} value={toolWidth} onChange={e => setToolWidth(Number(e.target.value))} style={{ width: 60 }} />
            <span style={{ color: '#fff', fontSize: 12, minWidth: 16 }}>{toolWidth}</span>
          </div>

          <div style={{ width: 1, height: 24, background: '#555', margin: '0 4px' }} />

          <button onClick={downloadImage} style={{ ...btnBase, background: '#2ecc71', color: '#fff' }}>⬇ 下载</button>

          {annotations.length > 0 && (
            <button onClick={() => { setAnnotations([]); setRedoStack([]); }} style={{ ...btnBase, background: '#555', color: '#e74c3c' }}>🗑 清除标注</button>
          )}
        </div>
      </div>

      {/* 编辑区 */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', padding: 20 }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {baseImage && (
            <img
              src={baseImage}
              alt="screenshot"
              onLoad={e => onImageLoad(e.currentTarget)}
              style={{ display: 'block', maxWidth: '90vw', maxHeight: '75vh' }}
              draggable={false}
            />
          )}
          <canvas
            ref={canvasRef}
            onMouseDown={cropMode ? handleCropDown : handlePointerDown}
            onMouseMove={cropMode ? handleCropMove : handlePointerMove}
            onMouseUp={cropMode ? handleCropUp : handlePointerUp}
            onMouseLeave={cropMode ? handleCropUp : handlePointerUp}
            onTouchStart={cropMode ? handleCropDown : handlePointerDown}
            onTouchMove={cropMode ? handleCropMove : handlePointerMove}
            onTouchEnd={cropMode ? handleCropUp : handlePointerUp}
            style={{
              position: 'absolute', top: 0, left: 0,
              cursor: cropMode ? 'crosshair' : activeTool === 'text' ? 'text' : activeTool === 'none' ? 'default' : 'crosshair',
            }}
          />

          {/* 裁剪遮罩 */}
          {cropMode && cropRect && (
            <>
              <div style={{ position: 'absolute', top: 0, left: 0, width: cropRect.x, height: '100%', background: 'rgba(0,0,0,0.5)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 0, left: cropRect.x + cropRect.w, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 0, left: cropRect.x, width: cropRect.w, height: cropRect.y, background: 'rgba(0,0,0,0.5)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: cropRect.y + cropRect.h, left: cropRect.x, width: cropRect.w, height: '100%', background: 'rgba(0,0,0,0.5)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: cropRect.y, left: cropRect.x, width: cropRect.w, height: cropRect.h, border: '2px dashed #e67e22', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: cropRect.y + cropRect.h / 2, left: cropRect.x + cropRect.w / 2, transform: 'translate(-50%, -50%)', color: '#fff', fontSize: 12, background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: 4, pointerEvents: 'none' }}>
                {Math.round(cropRect.w)} × {Math.round(cropRect.h)}
              </div>
            </>
          )}

          {/* 文字输入框 */}
          {textInput.visible && (
            <div style={{ position: 'absolute', left: textInput.x * displayScaleRef.current, top: textInput.y * displayScaleRef.current - 30, zIndex: 10 }}>
              <input
                autoFocus
                value={textValue}
                onChange={e => setTextValue(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') confirmText(); if (e.key === 'Escape') setTextInput({ x: 0, y: 0, visible: false }); }}
                placeholder="输入文字后回车"
                style={{ padding: '4px 8px', borderRadius: 4, border: '2px solid ' + toolColor, fontSize: 14, outline: 'none', minWidth: 120, background: 'rgba(0,0,0,0.7)', color: '#fff' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* 底部状态栏 */}
      <div style={{ textAlign: 'center', padding: '6px', color: '#888', fontSize: 12 }}>
        {cropMode ? '拖拽选区确认裁剪范围 → 点击"确认"完成裁剪' :
          activeTool === 'pen' ? '按住拖动画笔标注' :
          activeTool === 'rect' ? '按住拖动画方框' :
          activeTool === 'arrow' ? '按住拖动画箭头' :
          activeTool === 'text' ? '点击图片任意位置放置文字' :
          '选择上方工具开始编辑'}
      </div>
    </div>
  );
}
