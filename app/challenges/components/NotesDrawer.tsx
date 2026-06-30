'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Plus, Save, FileText, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface NotesDrawerProps {
  onClose: () => void;
}

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export const NotesDrawer: React.FC<NotesDrawerProps> = ({ onClose }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedNoteId, setExpandedNoteId] = useState<number | null>(null);

  // 弹出编辑框相关状态
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [previewNote, setPreviewNote] = useState<any>(null);
  const [previewPos, setPreviewPos] = useState<{ x: number; y: number } | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [modalLoading, setModalLoading] = useState<boolean>(false);

  const previewDraggingRef = useRef(false);
  const previewDragStartRef = useRef({ mx: 0, my: 0, ox: 0, oy: 0 });
  const previewPosRef = useRef(previewPos);

  useEffect(() => {
    previewPosRef.current = previewPos;
  }, [previewPos]);

  // 1. 获取已保存笔记
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/notes?limit=30');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setNotes(data.data);
      } else if (data.success && data.data && data.data.notes) {
        setNotes(data.data.notes);
      }
    } catch (e) {
      console.error('获取笔记列表失败:', e);
    } finally {
      setLoading(false);
    }
  };

  // 2. 获取笔记类别
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/notes/categories');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (e) {
      console.error('获取类别失败:', e);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, []);

  // 3. 全局拖动鼠标事件
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!previewDraggingRef.current) return;
      const start = previewDragStartRef.current;
      setPreviewPos({
        x: start.ox + (e.clientX - start.mx),
        y: start.oy + (e.clientY - start.my)
      });
    };

    const handleGlobalMouseUp = () => {
      previewDraggingRef.current = false;
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  const openNewNoteModal = () => {
    setPreviewNote({
      title: '',
      content: '',
      category: '编程挑战',
      technology: 'Python',
      subcategory: '算法调试',
      tags: '',
      isPublic: false
    });
    setPreviewPos(null); // 居中打开
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setPreviewNote(null);
    setPreviewPos(null);
  };

  // 4. 保存模态框中编辑的笔记
  const savePreviewNote = async () => {
    if (!previewNote) return;
    if (!previewNote.title.trim() || !previewNote.content.trim()) return;

    setModalLoading(true);
    try {
      const payload = {
        title: previewNote.title,
        content: previewNote.content,
        category: previewNote.category,
        technology: previewNote.technology,
        subcategory: previewNote.subcategory,
        tags: typeof previewNote.tags === 'string' ? previewNote.tags.split(/[,，\s]+/).filter(Boolean) : [],
        isPublic: !!previewNote.isPublic
      };

      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        closePreview();
        fetchNotes(); // 刷新侧边栏列表
      }
    } catch (e) {
      console.error('保存笔记失败:', e);
    } finally {
      setModalLoading(false);
    }
  };

  // 渲染表单字段 (一致复用原本 Monaco / AiChat 的样式)
  const renderFormFields = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500, color: '#333' }}>标题</label>
        <input
          value={previewNote.title}
          onChange={(e) => setPreviewNote((p: any) => ({ ...p, title: e.target.value }))}
          placeholder="输入笔记标题..."
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
            <option value="编程挑战">编程挑战</option>
          </select>
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
            value={previewNote.tags || ''}
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
          placeholder="支持 Markdown 格式..."
          style={{ width: '100%', height: 260, padding: '12px 14px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 14, boxSizing: 'border-box', resize: 'none', fontFamily: 'monospace' }}
        />
      </div>
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute top-0 right-16 h-full w-[360px] bg-slate-950/95 border-l border-slate-900 backdrop-blur-xl z-20 shadow-2xl flex flex-col overflow-hidden font-sans"
      >
        {/* Drawer 头部 */}
        <div className="h-14 border-b border-slate-900 px-5 flex justify-between items-center bg-slate-950 shrink-0">
          <h3 className="text-xs font-bold tracking-wider text-slate-200 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-indigo-400" />
            我的随堂笔记 (Notes)
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-950 text-slate-500 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 笔记主内容区 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin select-text">
          {/* 点击弹出新建笔记模态框 */}
          <button
            onClick={openNewNoteModal}
            className="w-full py-2.5 border border-dashed border-slate-800 hover:border-indigo-500/60 bg-slate-900/10 hover:bg-slate-900/30 rounded-xl text-xs text-slate-400 hover:text-indigo-400 transition flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            新建一笔关卡记录
          </button>

          {/* 笔记列表加载与显示 */}
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 text-xs text-slate-500">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
              正在加载您的笔记...
            </div>
          ) : notes.length === 0 ? (
            <div className="py-16 text-center text-xs text-slate-600 leading-relaxed">
              暂无历史随堂笔记，<br />点击上方新建笔记，记录你的算法总结吧！
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => {
                const isExpanded = expandedNoteId === note.id;
                return (
                  <div 
                    key={note.id}
                    className="bg-slate-900/30 border border-slate-900 hover:border-slate-850 rounded-xl p-3.5 transition duration-150"
                  >
                    <div 
                      onClick={() => setExpandedNoteId(isExpanded ? null : note.id)}
                      className="flex justify-between items-start cursor-pointer group"
                    >
                      <h4 className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition">
                        {note.title}
                      </h4>
                      <span className="text-[10px] text-slate-600 shrink-0 font-mono">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-slate-900 prose prose-invert prose-xs max-w-none text-slate-400 leading-relaxed space-y-2">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeHighlight]}
                        >
                          {note.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      {/* 🚀 可拖动、居中的新建编辑模态框 (完全复用原有 Monaco / AiChat 面板逻辑) */}
      {showPreview && previewNote && typeof document !== 'undefined' && createPortal(
        <div
          onClick={(e) => { if (previewPos && e.target === e.currentTarget) setPreviewPos(null); }}
          style={previewPos ? {
            position: 'fixed',
            left: previewPos.x,
            top: previewPos.y,
            zIndex: 10000,
            width: 880,
            maxWidth: '95vw',
            maxHeight: '92vh',
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
          }}
        >
          {previewPos ? (
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
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'linear-gradient(90deg,#4f8cff,#33d2ff)', color: '#fff', cursor: 'grab', flexShrink: 0 }}
              >
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>保存为笔记 — 预览与编辑 (拖动标题栏可移动)</h3>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <button onClick={() => setPreviewPos(null)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>居中</button>
                  <button onClick={closePreview} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '6px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>✕</button>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
                {renderFormFields()}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '16px 20px', borderTop: '1px solid #eee', background: '#fafafa', flexShrink: 0 }}>
                <button onClick={closePreview} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 13, cursor: 'pointer' }}>取消</button>
                <button 
                  onClick={savePreviewNote} 
                  disabled={modalLoading || !previewNote.title.trim() || !previewNote.content.trim()} 
                  style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: '#4f8cff', color: '#fff', fontSize: 13, cursor: 'pointer', opacity: modalLoading ? 0.7 : 1 }}
                >
                  {modalLoading ? '保存中...' : '保存笔记'}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', width: '100%', maxWidth: 880, maxHeight: '92vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
                  previewDraggingRef.current = true;
                  previewDragStartRef.current = { mx: e.clientX, my: e.clientY, ox: rect.left, oy: rect.top };
                  setPreviewPos({ x: rect.left, y: rect.top });
                }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'linear-gradient(90deg,#4f8cff,#33d2ff)', color: '#fff', cursor: 'grab', flexShrink: 0 }}
              >
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>保存为笔记 — 预览与编辑 (拖动标题栏可移动)</h3>
                <button onClick={closePreview} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '6px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>✕</button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
                {renderFormFields()}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '16px 20px', borderTop: '1px solid #eee', background: '#fafafa' }}>
                <button onClick={closePreview} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 13, cursor: 'pointer' }}>取消</button>
                <button 
                  onClick={savePreviewNote} 
                  disabled={modalLoading || !previewNote.title.trim() || !previewNote.content.trim()} 
                  style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: '#4f8cff', color: '#fff', fontSize: 13, cursor: 'pointer', opacity: modalLoading ? 0.7 : 1 }}
                >
                  {modalLoading ? '保存中...' : '保存笔记'}
                </button>
              </div>
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
};
