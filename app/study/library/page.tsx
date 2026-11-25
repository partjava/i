'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Library,
  Upload,
  Search,
  BookOpen,
  Trash2,
  Pencil,
  Bookmark,
  MessageSquareText,
  Clock,
  FileText,
  X,
  Check,
  Loader2,
  LogIn,
} from 'lucide-react';
import { useAuth } from '@shared/hooks/useAuth';
import {
  listPdfBooks,
  uploadPdfBook,
  updatePdfBook,
  deletePdfBook,
  extractPdfMetaAndCover,
  formatFileSize,
  PDF_CATEGORIES,
  type PdfBookItem,
} from './api';

interface UploadTaskState {
  name: string;
  status: 'parsing' | 'uploading' | 'done' | 'error';
  message?: string;
}

export default function PdfLibraryPage() {
  const { status } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [books, setBooks] = useState<PdfBookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [uploadCategory, setUploadCategory] = useState<string>('计算机');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [uploadTasks, setUploadTasks] = useState<UploadTaskState[]>([]);

  const [editingBook, setEditingBook] = useState<PdfBookItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('未分类');
  const [savingEdit, setSavingEdit] = useState(false);

  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const loadBooks = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await listPdfBooks();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setErrorMsg(err?.message || '加载书架失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      loadBooks();
    } else if (status === 'unauthenticated') {
      setLoading(false);
      setBooks([]);
    }
  }, [status]);

  const handleFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter(
      (f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
    );
    if (files.length === 0) {
      setErrorMsg('请选择有效的 `.pdf` 文件');
      return;
    }

    setErrorMsg(null);
    setUploadTasks(files.map((f) => ({ name: f.name, status: 'parsing' })));

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadTasks((prev) =>
        prev.map((t, idx) => (idx === i ? { ...t, status: 'parsing' } : t))
      );
      try {
        const meta = await extractPdfMetaAndCover(file);
        setUploadTasks((prev) =>
          prev.map((t, idx) => (idx === i ? { ...t, status: 'uploading' } : t))
        );
        const title = file.name.replace(/\.pdf$/i, '');
        const created = await uploadPdfBook(file, {
          title,
          category: uploadCategory || '未分类',
          pageCount: meta.pageCount,
          coverData: meta.coverData,
        });
        setBooks((prev) => [created, ...prev.filter((b) => b.id !== created.id)]);
        setUploadTasks((prev) =>
          prev.map((t, idx) => (idx === i ? { ...t, status: 'done' } : t))
        );
      } catch (err: any) {
        setUploadTasks((prev) =>
          prev.map((t, idx) =>
            idx === i ? { ...t, status: 'error', message: err?.message || '上传失败' } : t
          )
        );
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!editingBook || !editTitle.trim()) return;
    setSavingEdit(true);
    try {
      const updated = await updatePdfBook(editingBook.id, {
        title: editTitle.trim(),
        category: editCategory,
      });
      setBooks((prev) =>
        prev.map((b) => (b.id === updated.id ? { ...b, title: updated.title, category: updated.category } : b))
      );
      setEditingBook(null);
    } catch (err: any) {
      setErrorMsg(err?.message || '保存修改失败');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (bookId: number) => {
    try {
      await deletePdfBook(bookId);
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
      setConfirmDeleteId(null);
    } catch (err: any) {
      setErrorMsg(err?.message || '删除失败');
    }
  };

  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return books.filter((b) => {
      if (selectedCategory !== '全部' && b.category !== selectedCategory) return false;
      if (!q) return true;
      return (
        b.title.toLowerCase().includes(q) ||
        b.originalFilename.toLowerCase().includes(q) ||
        (b.category || '').toLowerCase().includes(q)
      );
    });
  }, [books, selectedCategory, searchQuery]);

  if (status === 'unauthenticated') {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex w-16 h-16 rounded-2xl bg-[#D4AD72]/15 text-[#D4AD72] items-center justify-center mb-5 ring-1 ring-[#D4AD72]/30">
          <Library className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-content-primary mb-3">我的书架</h1>
        <p className="text-sm text-content-secondary max-w-md mx-auto mb-8 leading-relaxed">
          导入本地教材、论文或技术文档 PDF，以实体翻书体验沉浸阅读；支持自动续读上次页码、图钉坐标批注、书签与局部 AI 伴读同步。登录后你的书架与批注将安全保存到数据库。
        </p>
        <Link
          href="/auth/login?callbackUrl=/study/library"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#192231] text-[#F2EDE4] text-sm font-medium border border-[#D4AD72]/40 hover:bg-[#232E40] transition-colors shadow-sm"
        >
          <LogIn className="w-4 h-4 text-[#D4AD72]" />
          登录后开启我的书架
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-7">
      {/* 顶部标题与操作栏 */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#B8862E] dark:text-[#D4AD72] mb-1">
            <Library className="w-3.5 h-3.5" />
            <span>个人 PDF 藏书与批注工作台</span>
          </div>
          <h1 className="text-2xl font-bold text-content-primary tracking-tight">我的书架</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={uploadCategory}
            onChange={(e) => setUploadCategory(e.target.value)}
            aria-label="导入书籍默认分类"
            className="px-3 py-2 text-xs rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-content-primary outline-none"
          >
            {PDF_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                导入分类：{cat}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            data-pdf-upload-trigger
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#192231] text-[#F2EDE4] text-sm font-medium border border-[#D4AD72]/40 hover:bg-[#232E40] transition-colors shadow-sm"
          >
            <Upload className="w-4 h-4 text-[#D4AD72]" />
            <span>批量导入 PDF</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            multiple
            className="hidden"
            data-pdf-file-input
            onChange={(e) => {
              if (e.target.files?.length) handleFiles(e.target.files);
              e.target.value = '';
            }}
          />
        </div>
      </div>

      {/* 拖拽上传区 */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggingOver(false);
          if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`mb-6 rounded-2xl border-2 border-dashed px-6 py-5 cursor-pointer transition-all flex flex-wrap items-center justify-between gap-4 ${
          isDraggingOver
            ? 'border-[#D4AD72] bg-[#D4AD72]/10'
            : 'border-slate-300/80 dark:border-white/15 bg-white/55 dark:bg-slate-900/45 hover:border-[#D4AD72]/70'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#D4AD72]/15 text-[#B8862E] dark:text-[#D4AD72] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-content-primary">
              拖拽单个或多个 PDF 到此处，或点击选择文件上传
            </p>
            <p className="text-xs text-content-secondary mt-0.5">
              自动提取第 1 页作精装封面与总页数 · 支持扫描版与双栏论文 · 实时记忆上次阅读页码
            </p>
          </div>
        </div>
        <span className="text-xs text-content-secondary px-3 py-1 rounded-full bg-slate-900/[0.04] dark:bg-white/[0.06]">
          单文件最大 100MB
        </span>
      </div>

      {/* 批量上传进度 */}
      {uploadTasks.length > 0 && (
        <div className="mb-5 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-content-primary">
            <span>导入任务队列（{uploadTasks.filter((t) => t.status === 'done').length}/{uploadTasks.length}）</span>
            <button
              type="button"
              onClick={() => setUploadTasks([])}
              className="text-content-secondary hover:text-content-primary"
            >
              收起
            </button>
          </div>
          {uploadTasks.map((task, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3 text-xs">
              <span className="truncate text-content-primary">{task.name}</span>
              <span className="shrink-0 flex items-center gap-1.5">
                {task.status === 'parsing' && (
                  <span className="text-amber-600 dark:text-amber-300 flex items-center gap-1">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> 解析封面中
                  </span>
                )}
                {task.status === 'uploading' && (
                  <span className="text-blue-600 dark:text-blue-300 flex items-center gap-1">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> 入库保存中
                  </span>
                )}
                {task.status === 'done' && (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 已入库
                  </span>
                )}
                {task.status === 'error' && (
                  <span className="text-rose-500">{task.message || '失败'}</span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}

      {errorMsg && (
        <div className="mb-5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 px-4 py-2.5 text-xs flex items-center justify-between">
          <span>{errorMsg}</span>
          <button type="button" onClick={() => setErrorMsg(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 分类过滤 + 搜索框 */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-1.5">
          {['全部', ...PDF_CATEGORIES].map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  active
                    ? 'bg-[#192231] text-[#F2EDE4] shadow-sm ring-1 ring-[#D4AD72]/45'
                    : 'bg-white/70 dark:bg-white/[0.06] text-content-secondary hover:text-content-primary border border-slate-200/80 dark:border-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-content-secondary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索书名或文件名..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-full bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 text-content-primary outline-none focus:border-[#D4AD72]"
          />
        </div>
      </div>

      {/* 书籍网格 */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-72 rounded-2xl bg-white/50 dark:bg-white/[0.04] animate-pulse border border-slate-200/60 dark:border-white/10"
            />
          ))}
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 py-16 px-6 text-center">
          <BookOpen className="w-10 h-10 text-content-secondary/60 mx-auto mb-3" />
          <p className="text-sm font-medium text-content-primary mb-1">
            {books.length === 0 ? '书架还没有书籍' : '没有匹配的书籍'}
          </p>
          <p className="text-xs text-content-secondary">
            {books.length === 0 ? '点击上方「批量导入 PDF」即可开始沉浸翻书与批注' : '试试切换分类或清空搜索关键词'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredBooks.map((book) => {
            const total = Math.max(1, book.pageCount || 1);
            const last = Math.max(1, Math.min(book.lastPage || 1, total));
            const pct = Math.min(100, Math.round((last / total) * 100));

            return (
              <div
                key={book.id}
                data-pdf-book-card={book.id}
                className="group relative rounded-2xl bg-white/85 dark:bg-slate-900/75 border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#D4AD72]/50 transition-all overflow-hidden flex flex-col"
              >
                {/* 封面区 */}
                <div
                  onClick={() => router.push(`/study/library/${book.id}`)}
                  className="relative h-48 bg-gradient-to-br from-[#273347] via-[#192231] to-[#232E40] p-4 flex items-center justify-center cursor-pointer overflow-hidden"
                >
                  <div className="absolute left-0 inset-y-0 w-2 bg-gradient-to-r from-black/40 to-transparent" />
                  {book.coverData ? (
                    <img
                      src={book.coverData}
                      alt={book.title}
                      className="h-full w-auto max-w-[82%] object-contain rounded-[4px] shadow-[0_12px_28px_rgba(0,0,0,0.45)] group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-28 h-36 rounded-[4px] bg-gradient-to-br from-slate-700 to-slate-800 border border-[#D4AD72]/40 p-3 flex flex-col justify-between shadow-lg">
                      <span className="text-[10px] text-[#D4AD72] uppercase tracking-wider">PDF</span>
                      <span className="text-xs font-semibold text-[#F2EDE4] line-clamp-3 leading-snug">
                        {book.title}
                      </span>
                      <span className="text-[10px] text-slate-400">{total} 页</span>
                    </div>
                  )}
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/55 text-[#F2EDE4] backdrop-blur-sm border border-white/10">
                    {book.category || '未分类'}
                  </span>
                </div>

                {/* 信息区 */}
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <Link
                      href={`/study/library/${book.id}`}
                      className="block text-sm font-semibold text-content-primary hover:text-[#B8862E] dark:hover:text-[#D4AD72] line-clamp-2 transition-colors"
                    >
                      {book.title}
                    </Link>
                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-content-secondary">
                      <span>{formatFileSize(book.fileSize)}</span>
                      <span className="inline-flex items-center gap-1">
                        <MessageSquareText className="w-3 h-3" /> {book.annotationCount ?? 0}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Bookmark className="w-3 h-3" /> {book.bookmarkCount ?? 0}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] text-content-secondary mb-1.5">
                      <span className="inline-flex items-center gap-1 font-medium text-content-primary">
                        <Clock className="w-3 h-3 text-[#D4AD72]" />
                        上次看到第 {last} / {total} 页
                      </span>
                      <span className="tabular-nums">{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#B8862E] to-[#D4AD72] transition-all"
                        style={{ width: `${Math.max(4, pct)}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between gap-2">
                    <Link
                      href={`/study/library/${book.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#192231] text-[#F2EDE4] text-xs font-medium hover:bg-[#232E40] transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#D4AD72]" />
                      {last > 1 ? '继续阅读' : '开始阅读'}
                    </Link>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingBook(book);
                          setEditTitle(book.title);
                          setEditCategory(book.category || '未分类');
                        }}
                        title="重命名或修改分类"
                        className="p-1.5 rounded-lg text-content-secondary hover:text-content-primary hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      {confirmDeleteId === book.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleDelete(book.id)}
                            className="px-2 py-1 rounded-md bg-rose-600 text-white text-[11px] font-medium"
                          >
                            确认
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-1.5 py-1 rounded-md text-[11px] text-content-secondary"
                          >
                            取消
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(book.id)}
                          title="从书架删除"
                          className="p-1.5 rounded-lg text-content-secondary hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 重命名 / 改分类弹窗 */}
      {editingBook && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-content-primary">编辑书籍信息</h3>
              <button
                type="button"
                onClick={() => setEditingBook(null)}
                className="p-1 rounded-lg text-content-secondary hover:text-content-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-content-secondary mb-1">书名</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-content-primary outline-none focus:border-[#D4AD72]"
                />
              </div>
              <div>
                <label className="block text-xs text-content-secondary mb-1">分类</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-content-primary outline-none focus:border-[#D4AD72]"
                >
                  {PDF_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingBook(null)}
                className="px-4 py-1.5 rounded-xl text-xs font-medium text-content-secondary hover:bg-slate-100 dark:hover:bg-white/10"
              >
                取消
              </button>
              <button
                type="button"
                disabled={savingEdit}
                onClick={handleSaveEdit}
                className="px-4 py-1.5 rounded-xl text-xs font-medium bg-[#192231] text-[#F2EDE4] border border-[#D4AD72]/40 hover:bg-[#232E40] disabled:opacity-50"
              >
                {savingEdit ? '保存中...' : '保存'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
