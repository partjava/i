'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface NotePreviewModalProps {
  note: any;
  onChange: (note: any) => void;
  onClose: () => void;
  onSave: () => void;
  loading: boolean;
}

export default function NotePreviewModal({ note, onChange, onClose, onSave, loading }: NotePreviewModalProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ mx: 0, my: 0, ox: 0, oy: 0 });
  const posRef = useRef(pos);

  useEffect(() => { posRef.current = pos; }, [pos]);

  useEffect(() => {
    fetch('/api/notes/categories')
      .then(r => r.json())
      .then(d => setCategories(d.categories || []))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const onMove = (e: any) => {
      if (!draggingRef.current) return;
      let mx: number, my: number;
      if (e.touches) {
        e.preventDefault();
        mx = e.touches[0].clientX;
        my = e.touches[0].clientY;
      } else {
        mx = (e as MouseEvent).clientX;
        my = (e as MouseEvent).clientY;
      }
      const { mx: smx, my: smy, ox, oy } = dragStartRef.current;
      const w = typeof window !== 'undefined' ? window.innerWidth : 0;
      const h = typeof window !== 'undefined' ? window.innerHeight : 0;
      const pw = 900;
      const nx = Math.max(0, Math.min(w - pw, ox + (mx - smx)));
      const ny = Math.max(0, Math.min(h - 600, oy + (my - smy)));
      setPos({ x: nx, y: ny });
    };
    const onUp = () => { draggingRef.current = false; };
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

  const startDrag = (clientX: number, clientY: number, ox: number, oy: number) => {
    draggingRef.current = true;
    dragStartRef.current = { mx: clientX, my: clientY, ox, oy };
  };

  const renderFormFields = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500, color: '#333' }}>标题</label>
        <input
          value={note.title}
          onChange={(e) => onChange({ ...note, title: e.target.value })}
          placeholder="输入笔记标题"
          style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 14, boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500, color: '#333' }}>分类</label>
          <select
            value={note.category || ''}
            onChange={(e) => onChange({ ...note, category: e.target.value })}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 14, boxSizing: 'border-box', background: '#fff', cursor: 'pointer' }}
          >
            <option value="">-- 请选择分类 --</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="__custom__">✏️ 自定义...</option>
          </select>
          {note.category === '__custom__' && (
            <input
              value=""
              onChange={(e) => onChange({ ...note, category: e.target.value })}
              placeholder="输入自定义分类"
              autoFocus
              style={{ width: '100%', marginTop: 8, padding: '10px 14px', borderRadius: 8, border: '1px solid #4f8cff', fontSize: 14, boxSizing: 'border-box' }}
            />
          )}
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500, color: '#333' }}>技术</label>
          <input
            value={note.technology || ''}
            onChange={(e) => onChange({ ...note, technology: e.target.value })}
            placeholder="例如：React, Java, Python"
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500, color: '#333' }}>子分类</label>
          <input
            value={note.subcategory || ''}
            onChange={(e) => onChange({ ...note, subcategory: e.target.value })}
            placeholder="子分类（可选）"
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500, color: '#333' }}>标签</label>
          <input
            value={Array.isArray(note.tags) ? note.tags.join(',') : (note.tags || '')}
            onChange={(e) => onChange({ ...note, tags: e.target.value })}
            placeholder="多个标签用逗号分隔"
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input
          type="checkbox"
          checked={!!note.isPublic}
          onChange={(e) => onChange({ ...note, isPublic: e.target.checked })}
          style={{ width: 18, height: 18 }}
        />
        <label style={{ fontSize: 14, color: '#333' }}>设为公开笔记（其他用户可见）</label>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500, color: '#333' }}>笔记内容</label>
        <textarea
          value={note.content}
          onChange={(e) => onChange({ ...note, content: e.target.value })}
          placeholder="输入笔记内容..."
          style={{ width: '100%', minHeight: 300, padding: '12px 14px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 14, resize: 'vertical', boxSizing: 'border-box', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
        />
      </div>
    </div>
  );

  return createPortal(
    <div
      onClick={(e) => { if (pos && e.target === e.currentTarget) setPos(null); }}
      style={pos ? {
        position: 'fixed',
        left: pos.x,
        top: pos.y,
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
      {pos ? (
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const p = posRef.current;
              if (!p) return;
              startDrag(e.clientX, e.clientY, p.x, p.y);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              const p = posRef.current;
              if (!p) return;
              const t = e.touches[0];
              startDrag(t.clientX, t.clientY, p.x, p.y);
            }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'linear-gradient(90deg,#4f8cff,#33d2ff)', color: '#fff', cursor: 'grab', flexShrink: 0 }}
          >
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>保存为笔记 — 预览与编辑（拖动标题栏可移动）</h3>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button onClick={() => setPos(null)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>↩ 居中</button>
              <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '6px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>✕</button>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
            {renderFormFields()}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '16px 20px', borderTop: '1px solid #eee', background: '#fafafa', flexShrink: 0 }}>
            <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s' }}>取消</button>
            <button onClick={onSave} disabled={loading} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#4f8cff', color: '#fff', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', opacity: loading ? 0.7 : 1 }}>
              {loading ? '保存中...' : '保存笔记'}
            </button>
          </div>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', width: '100%', maxWidth: 900, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
              startDrag(e.clientX, e.clientY, rect.left, rect.top);
              setPos({ x: rect.left, y: rect.top });
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
              startDrag(e.touches[0].clientX, e.touches[0].clientY, rect.left, rect.top);
              setPos({ x: rect.left, y: rect.top });
            }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'linear-gradient(90deg,#4f8cff,#33d2ff)', color: '#fff', cursor: 'grab', flexShrink: 0 }}
          >
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>保存为笔记 — 预览与编辑（拖动标题栏可移动）</h3>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '6px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>✕</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
            {renderFormFields()}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '16px 20px', borderTop: '1px solid #eee', background: '#fafafa' }}>
            <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s' }}>取消</button>
            <button onClick={onSave} disabled={loading} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#4f8cff', color: '#fff', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', opacity: loading ? 0.7 : 1 }}>
              {loading ? '保存中...' : '保存笔记'}
            </button>
          </div>
        </div>
      )}
    </div>, document.body);
}
