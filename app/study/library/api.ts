import { getAuthHeaders } from '@shared/lib/auth-client';

export interface PdfBookItem {
  id: number;
  userId: number;
  title: string;
  originalFilename: string;
  storedFilename: string;
  fileSize: number;
  pageCount: number;
  lastPage: number;
  category: string;
  coverData?: string | null;
  readingSeconds: number;
  lastReadAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  annotationCount?: number;
  bookmarkCount?: number;
}

export type PinColor = 'amber' | 'blue' | 'emerald' | 'rose' | 'violet';

export interface PdfAnnotationItem {
  id: number;
  bookId: number;
  userId: number;
  pageNumber: number;
  type: 'pin' | 'page_note';
  xPct?: number | null;
  yPct?: number | null;
  color: PinColor;
  noteContent: string;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface PdfBookmarkItem {
  id: number;
  bookId: number;
  userId: number;
  pageNumber: number;
  label?: string | null;
  createdAt?: string | null;
}

export interface PdfBookDetail {
  book: PdfBookItem;
  annotations: PdfAnnotationItem[];
  bookmarks: PdfBookmarkItem[];
}

export const PDF_CATEGORIES = ['计算机', '人工智能', '网络安全', '软件工程', '论文', '未分类'] as const;

export const PIN_COLOR_META: Record<PinColor, { label: string; bg: string; ring: string; dot: string }> = {
  amber: { label: '琥珀金', bg: '#D4AD72', ring: 'rgba(212,173,114,0.35)', dot: '#B45309' },
  blue: { label: '钴蓝', bg: '#3B82F6', ring: 'rgba(59,130,246,0.32)', dot: '#1D4ED8' },
  emerald: { label: '翡翠绿', bg: '#10B981', ring: 'rgba(16,185,129,0.32)', dot: '#047857' },
  rose: { label: '胭脂红', bg: '#F43F5E', ring: 'rgba(244,63,94,0.32)', dot: '#BE123C' },
  violet: { label: '紫罗兰', bg: '#8B5CF6', ring: 'rgba(139,92,246,0.32)', dot: '#6D28D9' },
};

async function parseApiJson<T>(res: Response): Promise<T> {
  const json = await res.json().catch(() => null);
  if (!res.ok || (json && json.success === false)) {
    const msg = json?.message || json?.error || `请求失败 (${res.status})`;
    throw new Error(msg);
  }
  return (json?.data ?? json) as T;
}

export function notifyPdfLibraryUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('pdf-library-updated'));
  }
}

export async function listPdfBooks(category?: string, q?: string): Promise<PdfBookItem[]> {
  const params = new URLSearchParams();
  if (category && category !== '全部') params.set('category', category);
  if (q && q.trim()) params.set('q', q.trim());
  const qs = params.toString();
  const res = await fetch(`/api/pdf-books${qs ? `?${qs}` : ''}`, {
    headers: { ...getAuthHeaders() },
    cache: 'no-store',
  });
  return parseApiJson<PdfBookItem[]>(res);
}

export async function uploadPdfBook(
  file: File,
  meta: { title?: string; category?: string; pageCount?: number; coverData?: string }
): Promise<PdfBookItem> {
  const form = new FormData();
  form.append('file', file);
  if (meta.title) form.append('title', meta.title);
  if (meta.category) form.append('category', meta.category);
  if (meta.pageCount && meta.pageCount > 0) form.append('pageCount', String(meta.pageCount));
  if (meta.coverData) form.append('coverData', meta.coverData);

  const res = await fetch('/api/pdf-books', {
    method: 'POST',
    headers: { ...getAuthHeaders() },
    body: form,
  });
  const saved = await parseApiJson<PdfBookItem>(res);
  notifyPdfLibraryUpdated();
  return saved;
}

export async function getPdfBookDetail(bookId: number | string): Promise<PdfBookDetail> {
  const res = await fetch(`/api/pdf-books/${bookId}`, {
    headers: { ...getAuthHeaders() },
    cache: 'no-store',
  });
  return parseApiJson<PdfBookDetail>(res);
}

export async function fetchPdfBinary(bookId: number | string): Promise<ArrayBuffer> {
  const res = await fetch(`/api/pdf-books/${bookId}/file`, {
    headers: { ...getAuthHeaders() },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`加载 PDF 原文件失败 (${res.status})`);
  }
  return res.arrayBuffer();
}

export async function updatePdfBook(
  bookId: number | string,
  payload: {
    title?: string;
    category?: string;
    lastPage?: number;
    pageCount?: number;
    coverData?: string;
    readingSecondsIncrement?: number;
  }
): Promise<PdfBookItem> {
  const res = await fetch(`/api/pdf-books/${bookId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });
  return parseApiJson<PdfBookItem>(res);
}

export async function deletePdfBook(bookId: number | string): Promise<void> {
  const res = await fetch(`/api/pdf-books/${bookId}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders() },
  });
  await parseApiJson<null>(res);
  notifyPdfLibraryUpdated();
}

export async function addPdfAnnotation(
  bookId: number | string,
  payload: {
    pageNumber: number;
    type: 'pin' | 'page_note';
    xPct?: number;
    yPct?: number;
    color?: PinColor;
    noteContent: string;
  }
): Promise<PdfAnnotationItem> {
  const res = await fetch(`/api/pdf-books/${bookId}/annotations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });
  return parseApiJson<PdfAnnotationItem>(res);
}

export async function updatePdfAnnotation(
  bookId: number | string,
  annId: number,
  payload: {
    noteContent?: string;
    color?: PinColor;
    xPct?: number;
    yPct?: number;
  }
): Promise<PdfAnnotationItem> {
  const res = await fetch(`/api/pdf-books/${bookId}/annotations/${annId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });
  return parseApiJson<PdfAnnotationItem>(res);
}

export async function deletePdfAnnotation(bookId: number | string, annId: number): Promise<void> {
  const res = await fetch(`/api/pdf-books/${bookId}/annotations/${annId}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders() },
  });
  await parseApiJson<null>(res);
}

export async function savePdfBookmark(
  bookId: number | string,
  pageNumber: number,
  label?: string
): Promise<PdfBookmarkItem> {
  const res = await fetch(`/api/pdf-books/${bookId}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ pageNumber, label }),
  });
  return parseApiJson<PdfBookmarkItem>(res);
}

export async function deletePdfBookmark(bookId: number | string, pageNumber: number): Promise<void> {
  const res = await fetch(`/api/pdf-books/${bookId}/bookmarks/${pageNumber}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders() },
  });
  await parseApiJson<null>(res);
}

/**
 * 解析页码表达式，例如 "1-3, 5, 8-10"，按升序去重返回有效页码。
 */
export function parsePageSelection(expr: string, maxPage: number): number[] {
  const safeMax = Math.max(1, maxPage);
  const pages = new Set<number>();
  const parts = expr
    .split(/[,\uff0c;\s]+/)
    .map((p) => p.trim())
    .filter(Boolean);

  for (const part of parts) {
    const rangeMatch = part.match(/^(\d+)\s*[-~—–到至]\s*(\d+)$/);
    if (rangeMatch) {
      const a = Math.max(1, Math.min(Number(rangeMatch[1]), safeMax));
      const b = Math.max(1, Math.min(Number(rangeMatch[2]), safeMax));
      const start = Math.min(a, b);
      const end = Math.max(a, b);
      for (let p = start; p <= end && pages.size < 300; p++) {
        pages.add(p);
      }
      continue;
    }
    if (/^\d+$/.test(part)) {
      const n = Number(part);
      if (n >= 1 && n <= safeMax) {
        pages.add(n);
      }
    }
  }
  return Array.from(pages).sort((a, b) => a - b);
}

export function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * 在浏览器端解析 PDF 总页数并渲染第 1 页作为书架封面缩略图（失败时优雅降级）。
 */
export async function extractPdfMetaAndCover(
  file: File
): Promise<{ pageCount: number; coverData?: string }> {
  try {
    const pdfjs = await import('pdfjs-dist');
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
    const data = new Uint8Array(await file.arrayBuffer());
    const loadingTask = pdfjs.getDocument({ data });
    const pdf = await loadingTask.promise;
    const pageCount = pdf.numPages || 1;
    let coverData: string | undefined;
    try {
      const page1 = await pdf.getPage(1);
      const baseViewport = page1.getViewport({ scale: 1 });
      const targetWidth = 320;
      const scale = Math.min(1.5, targetWidth / Math.max(1, baseViewport.width));
      const viewport = page1.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(viewport.width));
      canvas.height = Math.max(1, Math.round(viewport.height));
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page1.render({ canvasContext: ctx, viewport, canvas }).promise;
        coverData = canvas.toDataURL('image/jpeg', 0.8);
      }
      page1.cleanup();
    } catch {}
    await pdf.destroy();
    return { pageCount, coverData };
  } catch {
    return { pageCount: 1 };
  }
}
