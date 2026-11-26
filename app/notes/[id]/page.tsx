'use client';
import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { useAuth } from '@shared/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import html2canvas from 'html2canvas';
import 'katex/dist/katex.min.css';
import CommentSection from '@shared/components/CommentSection';
import NoteKnowledgeStudio from '@shared/components/NoteKnowledgeStudio';
import { normalizeNoteMarkdown } from '@shared/lib/note-knowledge-extractor';
import QRCode from 'qrcode';
import { useUser } from '@shared/providers/UserProvider';
import SiteFooter from '@shared/components/SiteFooter';
import { message } from 'antd';
import {
  extractHeadings,
  preprocessWikilinks,
  calcReadingStats,
  downloadMarkdownFile,
} from '../utils';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Plus,
  GripVertical,
  FolderOutput,
  Download,
  ListTree,
  Link2,
  X,
} from 'lucide-react';

const PreBlockContext = createContext(false);

function extractTextFromReactNode(node: any): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractTextFromReactNode).join('');
  if (typeof node === 'object' && node.props) {
    return extractTextFromReactNode(node.props.children);
  }
  return '';
}

function NoteCodeBlock({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const rawText = useMemo(() => extractTextFromReactNode(children).replace(/\n$/, ''), [children]);
  const trimmed = rawText.trim();
  const lines = trimmed ? trimmed.split(/\r?\n/) : [''];
  const langMatch = /language-([a-zA-Z0-9_-]+)/.exec(className || '');
  const lang = langMatch ? langMatch[1].toLowerCase() : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  // 单行极短标识（兜底保护：若未带语言且只有简短词组，使用紧凑内联胶囊样式）
  const isFormulaBanner =
    lines.length <= 2 &&
    !lang &&
    trimmed.length > 0 &&
    trimmed.length <= 120 &&
    (/[=≈≠≤≥∑Σ∏∫γλθπ]|max_|min_|arg\s*max/i.test(trimmed) ||
      (trimmed.includes('=') && !trimmed.endsWith(';') && !trimmed.endsWith('{') && !trimmed.endsWith(':')));

  if (lines.length === 1 && !lang && trimmed.length <= 26 && !isFormulaBanner) {
    return (
      <span className="not-prose inline-flex items-center px-2 py-0.5 my-0.5 rounded-md bg-indigo-50/90 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-200 border border-indigo-200/80 dark:border-indigo-400/30 font-mono text-[13px] font-medium">
        {trimmed}
      </span>
    );
  }

  // 核心公式横幅卡片（替代原先黑底套白底的厚重双层 pre 框）
  if (isFormulaBanner) {
    return (
      <div className="not-prose my-2.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-50/90 via-slate-50 to-sky-50/80 dark:from-[#1B2233] dark:via-[#151B28] dark:to-[#182436] border border-indigo-200/80 dark:border-indigo-400/30 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0 overflow-x-auto">
          <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-400/30 text-[11px] font-bold tracking-wide">
            ∑ 公式
          </span>
          <code className="font-mono text-[13.5px] font-semibold text-indigo-950 dark:text-indigo-100 whitespace-pre">
            {trimmed}
          </code>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 px-2 py-1 rounded-md text-[11px] font-medium text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100/80 dark:hover:bg-white/10 transition-colors"
        >
          {copied ? '✓ 已复制' : '复制'}
        </button>
      </div>
    );
  }

  // 标准多行代码块：纤薄现代 IDE 卡片（无外层黑框，紧凑顶栏 + 一键复制）
  return (
    <div className="not-prose my-3 rounded-xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-[#f8fafc] dark:bg-[#0D1117] shadow-sm">
      <div className="h-8 px-3.5 bg-slate-100/90 dark:bg-[#161B22] border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-400/80" />
            <span className="w-2 h-2 rounded-full bg-amber-400/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
          </span>
          <span className="ml-1 px-1.5 py-0.5 rounded bg-white dark:bg-[#21262D] text-slate-600 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 font-mono text-[10px] font-semibold uppercase tracking-wider">
            {lang || 'code'}
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            {lines.length} {lines.length > 1 ? 'lines' : 'line'}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-[#D4AD72] hover:bg-white dark:hover:bg-white/10 border border-transparent hover:border-slate-200/80 dark:hover:border-white/15 transition-all"
        >
          {copied ? '✓ 已复制' : '复制代码'}
        </button>
      </div>
      <pre className="m-0 px-4 py-3 overflow-x-auto bg-[#f8fafc] dark:bg-[#0D1117] text-[13px] leading-[1.6] font-mono text-slate-800 dark:text-[#E6EDF3]">
        <code
          className={className}
          style={{ background: 'transparent', padding: 0, color: 'inherit', fontSize: 'inherit' }}
        >
          {children}
        </code>
      </pre>
    </div>
  );
}

interface Note {
  _id: string;
  title: string;
  content: string;
  category: string;
  technology: string;
  subcategory: string;
  tags: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  author_name?: string;
  author_id?: number;
  authorId?: number;
  liked?: boolean;
  bookmarked?: boolean;
  likeCount?: number;
  bookmarkCount?: number;
  parentId?: number | null;
  sortOrder?: number;
  isPinned?: boolean;
}

interface TreeChapter {
  id: number;
  title: string;
  parentId?: number | null;
  sortOrder: number;
  depth: number;
  category?: string;
  isPublic?: boolean;
}

interface NoteTreeData {
  root: {
    id: number;
    title: string;
    category?: string;
    technology?: string;
    isPublic?: boolean;
    authorId?: number;
  };
  chapters: TreeChapter[];
  currentId: number;
}

interface BacklinkItem {
  id: number;
  title: string;
  category?: string;
  updatedAt?: string;
  excerpt?: string;
}

export default function NoteDetailPage() {
  const { data: session, status } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const params = useParams();
  const noteId = params.id as string;
  
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copyTip, setCopyTip] = useState('');
  const [cloning, setCloning] = useState(false);
  const [showKnowledgeStudio, setShowKnowledgeStudio] = useState(true);
  const [studioTab, setStudioTab] = useState<'graph' | 'flashcards'>('graph');
  const [readProgress, setReadProgress] = useState(0);
  const [noteTree, setNoteTree] = useState<NoteTreeData | null>(null);
  const [backlinks, setBacklinks] = useState<BacklinkItem[]>([]);
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [creatingChapter, setCreatingChapter] = useState(false);
  const [draggingChapterId, setDraggingChapterId] = useState<number | null>(null);
  const [exportingBook, setExportingBook] = useState(false);

  // 从知识图谱节点或闪卡一键定位并高亮笔记原文对应章节
  const handleScrollToSection = (sectionHeading: string) => {
    const container = document.getElementById('note-content-area');
    if (!container || !sectionHeading) return;
    const normalizedTarget = sectionHeading.trim().toLowerCase();
    const candidates = Array.from(
      container.querySelectorAll('h1, h2, h3, h4, strong, p, li')
    );
    const matchedEl =
      candidates.find(el =>
        (el.textContent || '').trim().toLowerCase().includes(normalizedTarget)
      ) || container;

    matchedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (matchedEl instanceof HTMLElement && matchedEl !== container) {
      const prevTransition = matchedEl.style.transition;
      const prevBg = matchedEl.style.backgroundColor;
      const prevRadius = matchedEl.style.borderRadius;
      matchedEl.style.transition = 'background-color 0.4s ease';
      matchedEl.style.backgroundColor = 'rgba(99, 102, 241, 0.18)';
      matchedEl.style.borderRadius = '6px';
      setTimeout(() => {
        matchedEl.style.backgroundColor = prevBg;
        matchedEl.style.borderRadius = prevRadius;
        matchedEl.style.transition = prevTransition;
      }, 2200);
    }
  };

  // 一键复用笔记（进阶 VIP 专属）
  const handleClone = async () => {
    if (!session) { message.warning('请先登录'); return; }
    if (!user?.vipLevel || user.vipLevel < 2) {
      message.warning('🌟 该功能需要进阶 VIP（¥9.99）或以上会员，请先升级！');
      return;
    }
    setCloning(true);
    try {
      const res = await fetch(`/api/notes/${noteId}/clone`, { method: 'POST' });
      const json = await res.json();
      if (json.success && json.data) {
        message.success('✅ 笔记已复用');
        setTimeout(() => router.push(`/notes/${json.data.id}`), 1200);
      } else {
        message.error(json.message || '复用失败');
      }
    } catch {
      message.error('网络错误，请稍后再试');
    } finally {
      setCloning(false);
    }
  };

  // 导出 Markdown
  const handleExportMd = () => {
    if (!note) return;
    const blob = new Blob([note.content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 导出 PDF（通过浏览器打印，使用已渲染的HTML而非原始Markdown）
  const handleExportPdf = () => {
    if (!note) return;
    const contentEl = document.getElementById('note-content-area');
    const renderedHtml = contentEl?.innerHTML || note.content
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const printWin = window.open('', '_blank', 'width=800,height=600');
    if (!printWin) return;
    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${note.title}</title>
<style>
  @page { size: A4; margin: 20mm; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.8; color: #111; max-width: 700px; margin: 0 auto; padding: 20px; }
  h1 { font-size: 28px; border-bottom: 3px solid #6b7d99; padding-bottom: 10px; margin-bottom: 20px; }
  h2 { font-size: 22px; margin-top: 28px; margin-bottom: 12px; color: #0C1F3D; border-bottom: 1px solid #b8bfcc; padding-bottom: 6px; }
  h3 { font-size: 18px; margin-top: 22px; margin-bottom: 10px; }
  h4 { font-size: 16px; margin-top: 18px; margin-bottom: 8px; }
  p { margin: 10px 0; }
  pre { background: #f4f4f4; padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 13px; white-space: pre-wrap; word-break: break-word; }
  code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
  pre code { background: none; padding: 0; }
  table { border-collapse: collapse; width: 100%; margin: 12px 0; }
  th, td { border: 1px solid #b8bfcc; padding: 8px 12px; text-align: left; }
  th { background: #EDF0F5; font-weight: 600; }
  ul, ol { margin: 10px 0; padding-left: 24px; }
  li { margin: 4px 0; }
  blockquote { border-left: 4px solid #b8bfcc; padding-left: 16px; margin: 12px 0; color: #0C1F3D; }
  img { max-width: 100%; }
  .meta { color: #888; font-size: 13px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #d1d6e0; }
  strong { font-weight: 600; }
  a { color: #6b7d99; }
  @media print { body { padding: 0; } }
</style></head>
<body>
  <h1>${note.title.replace(/</g, '&lt;')}</h1>
  <div class="meta">
    ${note.category ? '分类: ' + note.category + ' | ' : ''}${note.technology ? '技术: ' + note.technology + ' | ' : ''}${new Date(note.createdAt).toLocaleDateString('zh-CN')}
  </div>
  <div>${renderedHtml}</div>
</body></html>`;
    printWin.document.write(html);
    printWin.document.close();
    printWin.onload = () => setTimeout(() => { printWin.print(); }, 500);
  };
  const handleExportTxt = () => {
    if (!note) return;
    const text = `${note.title}\n${'='.repeat(note.title.length)}\n\n${note.content}`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 截图保存为 PNG
  const handleScreenshot = async () => {
    if (!note) return;
    const el = document.getElementById('note-content-area');
    if (!el) return;
    try {
      const canvas = await html2canvas(el, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${note.title}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch {
      // fallback
    }
  };

  // 打开分享弹窗
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/notes/${noteId}`;
    const dataUrl = await QRCode.toDataURL(shareUrl, { width: 200, margin: 2 });
    setQrDataUrl(dataUrl);
    setShowShareModal(true);
  };

  // 复制链接
  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/notes/${noteId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopyTip('已复制！');
      setTimeout(() => setCopyTip(''), 2000);
    });
  };

  // 获取笔记详情
  const fetchNote = async () => {
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const json = await response.json();
        const noteData = json.data;
        if (!noteData) throw new Error('笔记不存在');
        setNote({ ...noteData, _id: String(noteData.id) });
        setLiked(noteData.liked || false);
        setBookmarked(noteData.bookmarked || false);
        setLikeCount(noteData.likeCount || 0);
        setBookmarkCount(noteData.bookmarkCount || 0);
      } else if (response.status === 404) {
        router.push('/notes');
      }
    } catch (error) {
      console.error('获取笔记失败:', error);
      router.push('/notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (noteId) {
      fetchNote();
      fetchTreeAndBacklinks();
    }
  }, [noteId]);

  const fetchTreeAndBacklinks = async () => {
    try {
      const [treeRes, blRes] = await Promise.allSettled([
        fetch(`/api/notes/${noteId}/tree`, { credentials: 'include' }).then((r) => r.json()),
        fetch(`/api/notes/${noteId}/backlinks`, { credentials: 'include' }).then((r) => r.json()),
      ]);
      if (treeRes.status === 'fulfilled' && treeRes.value?.data) {
        setNoteTree(treeRes.value.data);
      }
      if (blRes.status === 'fulfilled' && Array.isArray(blRes.value?.data)) {
        setBacklinks(blRes.value.data);
      }
    } catch {}
  };

  // 顶部阅读进度条监听
  useEffect(() => {
    const mainEl = document.querySelector('main') as HTMLElement | null;
    const calcProgress = () => {
      const scrollTop = mainEl ? mainEl.scrollTop : window.scrollY;
      const scrollHeight = mainEl ? mainEl.scrollHeight : document.documentElement.scrollHeight;
      const clientHeight = mainEl ? mainEl.clientHeight : window.innerHeight;
      const total = Math.max(1, scrollHeight - clientHeight);
      setReadProgress(Math.min(100, Math.max(0, (scrollTop / total) * 100)));
    };
    calcProgress();
    const target = mainEl || window;
    target.addEventListener('scroll', calcProgress, { passive: true });
    window.addEventListener('resize', calcProgress, { passive: true });
    return () => {
      target.removeEventListener('scroll', calcProgress);
      window.removeEventListener('resize', calcProgress);
    };
  }, [noteId, loading]);

  const handleQuickCreateChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapterTitle.trim() || !note) return;
    const rootId = noteTree?.root?.id || Number(noteId);
    setCreatingChapter(true);
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: newChapterTitle.trim(),
          content: `## ${newChapterTitle.trim()}\n\n在此编写本章节核心内容...\n`,
          category: note.category || '',
          technology: note.technology || '',
          subcategory: note.subcategory || '',
          tags: note.tags || [],
          isPublic: Boolean(note.isPublic),
          parentId: rootId,
        }),
      });
      const json = await res.json();
      if (res.ok && json?.data?.id) {
        message.success('子章节创建成功');
        setNewChapterTitle('');
        setShowAddChapter(false);
        await fetchTreeAndBacklinks();
        router.push(`/notes/${json.data.id}`);
      } else {
        message.error(json?.message || '创建子章节失败');
      }
    } catch {
      message.error('网络错误，创建失败');
    } finally {
      setCreatingChapter(false);
    }
  };

  const handleReorderDrop = async (targetChapterId: number) => {
    if (!noteTree || draggingChapterId == null || draggingChapterId === targetChapterId) return;
    const list = [...noteTree.chapters];
    const fromIdx = list.findIndex((c) => c.id === draggingChapterId);
    const toIdx = list.findIndex((c) => c.id === targetChapterId);
    if (fromIdx < 0 || toIdx < 0) return;
    const [moved] = list.splice(fromIdx, 1);
    list.splice(toIdx, 0, moved);
    setNoteTree({ ...noteTree, chapters: list });
    setDraggingChapterId(null);

    try {
      await fetch('/api/notes/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          parentId: noteTree.root.id,
          orderedIds: list.map((c) => c.id),
        }),
      });
      message.success('章节顺序已更新');
    } catch {
      message.error('调整排序失败');
    }
  };

  const handleRemoveFromCollection = async (targetId: number) => {
    try {
      const res = await fetch(`/api/notes/${targetId}/move`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ clearParent: true }),
      });
      if (res.ok) {
        message.success('已移出合集');
        await fetchTreeAndBacklinks();
      }
    } catch {
      message.error('操作失败');
    }
  };

  const handleExportWholeCollection = async () => {
    if (!noteTree) return;
    setExportingBook(true);
    try {
      const ids = [noteTree.root.id, ...noteTree.chapters.map((c) => c.id)];
      const fetched = await Promise.all(
        ids.map((id) =>
          fetch(`/api/notes/${id}`, { credentials: 'include' })
            .then((r) => r.json())
            .then((j) => j?.data)
            .catch(() => null)
        )
      );
      const md = fetched
        .filter(Boolean)
        .map((item, idx) =>
          idx === 0
            ? `# ${item.title}\n\n${item.content || ''}\n`
            : `\n---\n\n# 第 ${idx} 章：${item.title}\n\n${item.content || ''}\n`
        )
        .join('\n');
      downloadMarkdownFile(`${noteTree.root.title}_全书合集.md`, md);
      message.success('整本合集已导出为 Markdown');
    } catch {
      message.error('导出合集失败');
    } finally {
      setExportingBook(false);
    }
  };

  const handleWikilinkClick = async (rawTitle: string) => {
    const clean = decodeURIComponent(rawTitle).trim();
    try {
      const res = await fetch(`/api/notes/search?q=${encodeURIComponent(clean)}`, {
        credentials: 'include',
      });
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      const exact =
        list.find((n: any) => (n.title || '').trim().toLowerCase() === clean.toLowerCase()) ||
        list[0];
      if (exact?.id) {
        router.push(`/notes/${exact.id}`);
        return;
      }
      message.info(`未找到名为「${clean}」的笔记，可在笔记库中新建`);
    } catch {
      message.error('双链跳转查询失败');
    }
  };

  // 检查登录状态 - 只有访问非公开笔记时才需要登录
  useEffect(() => {
    // 获取笔记后再检查权限，而不是立即重定向
    if (status === 'unauthenticated' && note && !note.isPublic) {
      router.push('/auth/login');
    }
  }, [status, router, note]);

  // 点赞功能
  const handleLike = async () => {
    if (!session) return;
    
    try {
      const response = await fetch(`/api/notes/${noteId}/like`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setLiked(!liked);
        setLikeCount(prev => liked ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error('点赞操作失败:', error);
    }
  };

  // 收藏功能
  const handleBookmark = async () => {
    if (!session) return;
    
    try {
      const response = await fetch(`/api/notes/${noteId}/bookmark`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setBookmarked(!bookmarked);
        setBookmarkCount(prev => bookmarked ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error('收藏操作失败:', error);
    }
  };

  const headings = useMemo(() => extractHeadings(note?.content || ''), [note?.content]);
  const readingStats = useMemo(() => calcReadingStats(note?.content || ''), [note?.content]);
  const renderedMarkdown = useMemo(
    () => preprocessWikilinks(normalizeNoteMarkdown(note?.content || '')),
    [note?.content]
  );

  // 合集前后章导航计算
  const orderedBookNodes = useMemo(() => {
    if (!noteTree) return [];
    return [
      { id: noteTree.root.id, title: noteTree.root.title, isRoot: true },
      ...noteTree.chapters.map((c) => ({ id: c.id, title: c.title, isRoot: false })),
    ];
  }, [noteTree]);

  if (status === 'loading' || loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  // 允许未登录用户查看公开笔记
  if (!note) {
    return null;
  }
  
  // 未登录用户只能查看公开笔记
  if (!session && (!note.isPublic)) {
    router.push('/auth/login');
    return null;
  }

  const isOwner = session?.user?.id === String(note.authorId ?? '');
  const currentBookIdx = orderedBookNodes.findIndex((x) => x.id === Number(noteId));
  const prevChapter = currentBookIdx > 0 ? orderedBookNodes[currentBookIdx - 1] : null;
  const nextChapter =
    currentBookIdx >= 0 && currentBookIdx < orderedBookNodes.length - 1
      ? orderedBookNodes[currentBookIdx + 1]
      : null;

  return (
    <div className="min-h-[calc(100vh-70px)] bg-surface-page flex flex-col relative">
      {/* 顶部极简鎏金阅读进度条 */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#1B3B6F] via-[#D4AD72] to-emerald-500 transition-[width] duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>
      <div className="flex flex-1">
      {/* 左侧导航栏（固定吸顶 sticky，向上滑动长笔记时始终保持在屏幕左侧完整显示） */}
      <div
        className={`${
          sidebarCollapsed ? 'w-12' : 'w-72'
        } bg-gray-50 border-r border-gray-200 dark:border-white/10 transition-all duration-300 flex-shrink-0 relative sticky top-0 self-start h-[calc(100vh-72px)] overflow-y-auto custom-scrollbar z-20`}
      >
        {/* 收缩/展开按钮 */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-16 z-30 w-6 h-6 bg-white dark:bg-[#1E2430] border border-gray-300 dark:border-white/15 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-[#273142] transition-colors"
          title={sidebarCollapsed ? '展开侧边栏' : '收缩侧边栏'}
        >
          <svg className={`w-3 h-3 text-gray-600 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {!sidebarCollapsed && (
          <div className="p-4 sm:p-5">
            <div className="mt-8">
              <button
                onClick={() => router.back()}
                className="text-blue-600 dark:text-[#8AB4F8] hover:text-blue-800 dark:hover:text-[#D4AD72] flex items-center mb-4 text-base font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回笔记列表
              </button>
            </div>

            {/* 多章节合集书册目录树 */}
            {noteTree && (noteTree.chapters.length > 0 || noteTree.root.id !== Number(noteId)) ? (
              <div className="mb-4 rounded-xl border border-line-subtle bg-surface-raised p-3 shadow-xs">
                <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-line-subtle">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-content-primary min-w-0">
                    <BookOpen className="w-3.5 h-3.5 text-[#D4AD72] shrink-0" />
                    <span className="truncate">合集书册目录</span>
                  </div>
                  {isOwner && (
                    <button
                      type="button"
                      onClick={() => setShowAddChapter((v) => !v)}
                      title="添加子章节"
                      className="p-1 rounded-md text-[#1B3B6F] dark:text-[#D4AD72] hover:bg-surface-muted transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* 合集封面根节点 */}
                <Link
                  href={`/notes/${noteTree.root.id}`}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold mb-1 transition-colors ${
                    Number(noteId) === noteTree.root.id
                      ? 'bg-[#0F1D33] text-white dark:bg-[#D4AD72] dark:text-[#0F1D33]'
                      : 'text-content-primary hover:bg-surface-muted'
                  }`}
                >
                  <span className="text-[10px] font-mono opacity-80">导言</span>
                  <span className="truncate">{noteTree.root.title}</span>
                </Link>

                {/* 有序子章节列表（支持拖拽重排） */}
                <div className="space-y-1 max-h-60 overflow-y-auto custom-scrollbar">
                  {noteTree.chapters.map((ch, idx) => {
                    const active = Number(noteId) === ch.id;
                    return (
                      <div
                        key={ch.id}
                        draggable={isOwner}
                        onDragStart={() => setDraggingChapterId(ch.id)}
                        onDragOver={(e) => isOwner && e.preventDefault()}
                        onDrop={() => isOwner && handleReorderDrop(ch.id)}
                        className={`group flex items-center justify-between gap-1 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                          active
                            ? 'bg-brand-soft text-brand-primary dark:text-[#D4AD72] font-semibold'
                            : 'text-content-secondary hover:bg-surface-muted hover:text-content-primary'
                        }`}
                      >
                        <Link href={`/notes/${ch.id}`} className="flex items-center gap-1.5 min-w-0 flex-1">
                          {isOwner && <GripVertical className="w-3 h-3 text-content-muted/50 shrink-0 cursor-grab" />}
                          <span className="font-mono text-[10px] text-[#9A7234] dark:text-[#D4AD72] shrink-0">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="truncate">{ch.title}</span>
                        </Link>
                        {isOwner && (
                          <button
                            type="button"
                            onClick={() => handleRemoveFromCollection(ch.id)}
                            title="移出合集（恢复为独立笔记）"
                            className="opacity-0 group-hover:opacity-100 p-0.5 text-content-muted hover:text-amber-600 transition-opacity"
                          >
                            <FolderOutput className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {isOwner && showAddChapter && (
                  <form onSubmit={handleQuickCreateChapter} className="mt-2 pt-2 border-t border-line-subtle flex items-center gap-1.5">
                    <input
                      type="text"
                      value={newChapterTitle}
                      onChange={(e) => setNewChapterTitle(e.target.value)}
                      placeholder="新章节标题..."
                      className="flex-1 min-w-0 px-2 py-1 rounded-md border border-line-strong bg-surface-page text-xs text-content-primary focus:outline-none focus:border-[#D4AD72]"
                    />
                    <button
                      type="submit"
                      disabled={creatingChapter}
                      className="px-2 py-1 rounded-md bg-[#0F1D33] dark:bg-[#D4AD72] text-white dark:text-[#0F1D33] text-xs font-semibold shrink-0"
                    >
                      {creatingChapter ? '...' : '添加'}
                    </button>
                  </form>
                )}

                <button
                  type="button"
                  disabled={exportingBook}
                  onClick={handleExportWholeCollection}
                  className="mt-2.5 w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-line-subtle bg-surface-page hover:bg-surface-muted text-[11px] font-medium text-content-secondary hover:text-content-primary transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>{exportingBook ? '打包中...' : '导出整本合集 (.md)'}</span>
                </button>
              </div>
            ) : (
              isOwner && (
                <div className="mb-4">
                  {!showAddChapter ? (
                    <button
                      type="button"
                      onClick={() => setShowAddChapter(true)}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-line-strong text-xs font-medium text-content-secondary hover:border-[#D4AD72] hover:text-content-primary transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#D4AD72]" />
                      <span>添加子章节（升级为合集）</span>
                    </button>
                  ) : (
                    <form onSubmit={handleQuickCreateChapter} className="rounded-xl border border-line-subtle bg-surface-raised p-2.5 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-content-primary">
                        <span>新增第 1 章</span>
                        <button type="button" onClick={() => setShowAddChapter(false)} className="text-content-muted">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={newChapterTitle}
                        onChange={(e) => setNewChapterTitle(e.target.value)}
                        placeholder="输入子章节标题..."
                        className="w-full px-2.5 py-1.5 rounded-lg border border-line-strong bg-surface-page text-xs text-content-primary"
                      />
                      <button
                        type="submit"
                        disabled={creatingChapter}
                        className="w-full py-1.5 rounded-lg bg-[#0F1D33] dark:bg-[#D4AD72] text-white dark:text-[#0F1D33] text-xs font-semibold"
                      >
                        {creatingChapter ? '创建中...' : '确认创建并进入'}
                      </button>
                    </form>
                  )}
                </div>
              )
            )}

            {/* 自动提取文档段落 TOC 大纲 */}
            {headings.length > 0 && (
              <div className="mb-4 rounded-xl border border-line-subtle bg-surface-raised p-3 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-content-primary pb-2 mb-2 border-b border-line-subtle">
                  <ListTree className="w-3.5 h-3.5 text-sky-500" />
                  <span>本页段落大纲</span>
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                  {headings.map((h) => (
                    <button
                      key={`${h.index}-${h.text}`}
                      type="button"
                      onClick={() => handleScrollToSection(h.text)}
                      style={{ paddingLeft: `${(h.level - 1) * 10 + 8}px` }}
                      className="w-full text-left py-1 pr-2 rounded-md text-xs text-content-secondary hover:text-content-primary hover:bg-surface-muted truncate transition-colors"
                    >
                      {h.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* 操作按钮 */}
            {session && (
              <div className="space-y-2.5 mt-3">
                <button onClick={handleLike} className={`w-full flex items-center justify-center space-x-2 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${liked ? 'bg-red-100 text-red-700 border border-red-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30' : 'bg-white text-gray-700 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'}`}>
                  <svg className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  <span>{liked ? '已点赞' : '点赞'}</span>
                  {likeCount > 0 && <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs">{likeCount}</span>}
                </button>

                <button onClick={handleBookmark} className={`w-full flex items-center justify-center space-x-2 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${bookmarked ? 'bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30' : 'bg-white text-gray-700 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'}`}>
                  <svg className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                  <span>{bookmarked ? '已收藏' : '收藏'}</span>
                  {bookmarkCount > 0 && <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs">{bookmarkCount}</span>}
                </button>

                {/* 分享按钮 */}
                <button onClick={handleShare} className="w-full flex items-center justify-center space-x-2 px-3.5 py-2.5 rounded-lg text-sm font-medium bg-white text-gray-700 hover:bg-blue-50 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-[#8AB4F8] border border-gray-200 dark:border-white/10 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  <span>分享</span>
                </button>

                {/* 一键复用（进阶 VIP 专属，不能复用自己的笔记） */}
                {note?.isPublic && note?.author_id !== parseInt((session?.user as any)?.id || '0') && (
                  <button
                    onClick={handleClone}
                    disabled={cloning}
                    className={`w-full flex items-center justify-center space-x-2 px-3.5 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200
                      ${(user?.vipLevel ?? 0) >= 2
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white border-transparent hover:opacity-90 hover:scale-102 shadow-md shadow-purple-500/20'
                        : 'bg-purple-50 dark:bg-purple-500/15 text-purple-400 dark:text-purple-200 border-purple-200 dark:border-purple-400/30 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-500/25'
                      }
                    `}
                    title={(user?.vipLevel ?? 0) >= 2 ? '一键复用此笔记到我的笔记库' : '进阶 VIP 专属功能'}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>{cloning ? '复用中...' : (user?.vipLevel ?? 0) >= 2 ? '🌟 一键复用' : '🌟 复用（进阶VIP）'}</span>
                  </button>
                )}

                {/* 导出按钮组 */}
                <div className="border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden bg-white shadow-xs">
                  <div className="px-3 py-2 bg-gray-50/90 dark:bg-[#1E2430] text-xs text-gray-500 dark:text-slate-300 font-semibold border-b border-gray-100 dark:border-white/10">导出笔记</div>
                  <button onClick={handleScreenshot} className="w-full flex items-center space-x-2 px-3.5 py-2 text-xs text-gray-700 hover:bg-gray-50 dark:hover:bg-white/[0.06] transition-colors">
                    <span>📸</span><span>截图保存</span>
                  </button>
                  <button onClick={handleExportPdf} className="w-full flex items-center space-x-2 px-3.5 py-2 text-xs text-gray-700 hover:bg-gray-50 dark:hover:bg-white/[0.06] transition-colors border-t border-gray-100 dark:border-white/10">
                    <span>📕</span><span>导出 PDF</span>
                  </button>
                  <button onClick={handleExportMd} className="w-full flex items-center space-x-2 px-3.5 py-2 text-xs text-gray-700 hover:bg-gray-50 dark:hover:bg-white/[0.06] transition-colors border-t border-gray-100 dark:border-white/10">
                    <span>📄</span><span>导出 Markdown</span>
                  </button>
                  <button onClick={handleExportTxt} className="w-full flex items-center space-x-2 px-3.5 py-2 text-xs text-gray-700 hover:bg-gray-50 dark:hover:bg-white/[0.06] transition-colors border-t border-gray-100 dark:border-white/10">
                    <span>📝</span><span>导出纯文本</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 收缩状态下显示图标 */}
        {sidebarCollapsed && session && (
          <div className="flex flex-col items-center pt-20 space-y-4 px-1">
            <button
              onClick={handleLike}
              className={`p-2 rounded-lg transition-colors ${liked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
              title={liked ? '已点赞' : '点赞'}
            >
              <svg className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-lg transition-colors ${bookmarked ? 'text-yellow-600' : 'text-gray-500 hover:text-yellow-600'}`}
              title={bookmarked ? '已收藏' : '收藏'}
            >
              <svg className="w-5 h-5" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 p-8">

      {/* 笔记内容 */}
      <article className="bg-white rounded-lg shadow-sm border border-gray-200 dark:border-white/10 p-8">
            {/* 标题和元信息 */}
        <header className="mb-6">
          <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{note.title}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setStudioTab('graph');
                  setShowKnowledgeStudio(prev => (studioTab === 'graph' ? !prev : true));
                }}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 border transition-all ${
                  showKnowledgeStudio && studioTab === 'graph'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 dark:bg-indigo-500/15 dark:text-indigo-200 dark:border-indigo-400/30 dark:hover:bg-indigo-500/25'
                }`}
              >
                <span>🌌</span>
                <span>{showKnowledgeStudio && studioTab === 'graph' ? '收起知识图谱' : 'AI 知识图谱'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStudioTab('flashcards');
                  setShowKnowledgeStudio(prev => (studioTab === 'flashcards' ? !prev : true));
                }}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 border transition-all ${
                  showKnowledgeStudio && studioTab === 'flashcards'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-400/30 dark:hover:bg-emerald-500/25'
                }`}
              >
                <span>🃏</span>
                <span>3D 闪卡自测</span>
              </button>

              {isOwner && (
                <Link
                  href={`/notes/${noteId}/edit`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-semibold"
                >
                  编辑
                </Link>
              )}
            </div>
          </div>

          {/* 元信息 */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-slate-400 mb-4">
            {(note.author_name || note.authorId) && (
              <span>作者: {note.author_name || `用户 #${note.authorId}`}</span>
            )}
            <span>创建: {new Date(note.createdAt).toLocaleString()}</span>
            {note.updatedAt !== note.createdAt && (
              <span>更新: {new Date(note.updatedAt).toLocaleString()}</span>
            )}
            <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10">
              {readingStats.words} 字 · 预计 {readingStats.minutes} 分钟读完
            </span>
          </div>

          {/* 标签和分类 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {note.category && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {note.category}
              </span>
            )}
            {note.technology && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {note.technology}
              </span>
            )}
            {note.subcategory && (
              <span className="bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                {note.subcategory}
              </span>
            )}
            {note.isPublic && (
              <span className="bg-yellow-100 dark:bg-amber-500/20 text-yellow-800 dark:text-amber-200 px-3 py-1 rounded-full text-sm">
                公开
              </span>
            )}
          </div>

          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-slate-200 px-2 py-1 rounded text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* 创新功能 5：可视化知识图谱（力导向星系网络 + 层级思维导图） & 3D 翻转记忆闪卡 */}
        {showKnowledgeStudio && (
          <NoteKnowledgeStudio
            key={studioTab}
            noteId={noteId}
            title={note.title}
            content={note.content}
            category={note.category}
            technology={note.technology}
            tags={note.tags}
            defaultTab={studioTab}
            onScrollToSection={handleScrollToSection}
          />
        )}



        {/* 笔记内容 - 紧凑现代技术文档排版 */}
        <div
          id="note-content-area"
          className="mt-6 pt-6 border-t border-slate-100 dark:border-white/10 text-[15px] leading-7 text-slate-700 dark:text-[#D5DCE6]"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeHighlight]}
            components={{
              pre({ children }) {
                return (
                  <PreBlockContext.Provider value={true}>
                    {children}
                  </PreBlockContext.Provider>
                );
              },
              code({ className, children, ...props }: any) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const isInsidePre = useContext(PreBlockContext);
                if (isInsidePre) {
                  return <NoteCodeBlock className={className}>{children}</NoteCodeBlock>;
                }
                // 行内代码：精致胶囊样式，绝不破坏行内排版流
                return (
                  <code
                    className="inline px-1.5 py-0.5 mx-0.5 rounded-md bg-indigo-50/90 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-200 border border-indigo-200/75 dark:border-indigo-400/30 font-mono text-[0.86em] font-medium align-baseline before:content-none after:content-none"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              h1({ children }) {
                return (
                  <h1 className="text-xl font-extrabold text-slate-900 dark:text-[#F2EDE4] mt-6 mb-3 pb-2 border-b border-slate-200/80 dark:border-white/10 flex items-center gap-2.5">
                    <span className="w-1.5 h-5 rounded-full bg-indigo-600 dark:bg-[#D4AD72] shrink-0" />
                    <span>{children}</span>
                  </h1>
                );
              },
              h2({ children }) {
                return (
                  <h2 className="text-lg font-bold text-slate-900 dark:text-[#F2EDE4] mt-5 mb-2.5 pb-1.5 border-b border-slate-100 dark:border-white/10 flex items-center gap-2">
                    <span className="w-1.5 h-4 rounded-full bg-indigo-500 dark:bg-[#8AB4F8] shrink-0" />
                    <span>{children}</span>
                  </h2>
                );
              },
              h3({ children }) {
                return (
                  <h3 className="text-[15px] font-bold text-slate-800 dark:text-[#E6ECF5] mt-4 mb-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                    <span>{children}</span>
                  </h3>
                );
              },
              p({ children }) {
                return <p className="my-2 leading-7 text-slate-700 dark:text-[#D5DCE6]">{children}</p>;
              },
              strong({ children }) {
                return <strong className="font-semibold text-slate-900 dark:text-[#F2EDE4]">{children}</strong>;
              },
              a({ href, children }) {
                if (href && href.startsWith('#wikilink:')) {
                  const rawTarget = href.slice('#wikilink:'.length);
                  return (
                    <button
                      type="button"
                      onClick={() => handleWikilinkClick(rawTarget)}
                      className="inline-flex items-center gap-1 px-1.5 py-0.2 mx-0.5 rounded-md bg-[#D4AD72]/15 text-[#9A7234] dark:text-[#E8CA96] border border-[#D4AD72]/35 hover:bg-[#D4AD72]/25 font-medium text-[0.94em] transition-colors"
                      title={`双链跳转到笔记：${decodeURIComponent(rawTarget)}`}
                    >
                      <Link2 className="w-3 h-3 shrink-0" />
                      <span>{children}</span>
                    </button>
                  );
                }
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-[#8AB4F8] underline decoration-indigo-300/60 dark:decoration-[#8AB4F8]/50 hover:text-indigo-800 dark:hover:text-[#D4AD72]"
                  >
                    {children}
                  </a>
                );
              },
              ul({ children }) {
                return <ul className="my-2 space-y-1.5 pl-5 list-disc marker:text-indigo-500 dark:marker:text-[#D4AD72]">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="my-2 space-y-1.5 pl-5 list-decimal marker:text-indigo-600 dark:marker:text-[#D4AD72] marker:font-semibold">{children}</ol>;
              },
              li({ children }) {
                return <li className="leading-7 text-slate-700 dark:text-[#D5DCE6] pl-1">{children}</li>;
              },
              blockquote({ children }) {
                return (
                  <blockquote className="my-3 pl-3.5 pr-3 py-2 rounded-r-xl border-l-4 border-indigo-500 dark:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/10 text-slate-700 dark:text-slate-200 text-sm">
                    {children}
                  </blockquote>
                );
              },
              hr() {
                return <hr className="my-5 border-slate-200/80 dark:border-white/10" />;
              },
              table({ children }) {
                return (
                  <div className="my-3 overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-white/10">
                      {children}
                    </table>
                  </div>
                );
              },
              th({ children }) {
                return (
                  <th className="px-3.5 py-2 bg-slate-50 dark:bg-[#1E2430] text-left text-xs font-semibold text-slate-600 dark:text-slate-200 uppercase tracking-wider border-b border-slate-200 dark:border-white/10">
                    {children}
                  </th>
                );
              },
              td({ children }) {
                return (
                  <td className="px-3.5 py-2 text-sm text-slate-800 dark:text-[#D5DCE6] border-b border-slate-100 dark:border-white/10">
                    {children}
                  </td>
                );
              },
            }}
          >
            {renderedMarkdown}
          </ReactMarkdown>
        </div>

        {/* 上一章 / 下一章 书册导航 */}
        {(prevChapter || nextChapter) && (
          <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prevChapter ? (
              <Link
                href={`/notes/${prevChapter.id}`}
                className="group p-3.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-[#D4AD72] bg-slate-50/70 dark:bg-white/[0.03] flex items-center gap-3 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-[#D4AD72] shrink-0" />
                <div className="min-w-0">
                  <div className="text-[11px] text-slate-400 font-mono">上一章</div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-[#F2EDE4] truncate">{prevChapter.title}</div>
                </div>
              </Link>
            ) : <div />}

            {nextChapter ? (
              <Link
                href={`/notes/${nextChapter.id}`}
                className="group p-3.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-[#D4AD72] bg-slate-50/70 dark:bg-white/[0.03] flex items-center justify-end gap-3 text-right transition-all"
              >
                <div className="min-w-0">
                  <div className="text-[11px] text-slate-400 font-mono">下一章</div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-[#F2EDE4] truncate">{nextChapter.title}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#D4AD72] shrink-0" />
              </Link>
            ) : <div />}
          </div>
        )}

        {/* 双向链接 · 反向引用 */}
        {backlinks.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-white/10">
            <h3 className="text-sm font-bold text-slate-800 dark:text-[#F2EDE4] mb-3 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-[#D4AD72]" />
              <span>双向链接 · 被 {backlinks.length} 篇笔记引用</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {backlinks.map((bl) => (
                <Link
                  key={bl.id}
                  href={`/notes/${bl.id}`}
                  className="p-3 rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03] hover:border-[#D4AD72]/60 transition-all"
                >
                  <div className="text-sm font-semibold text-indigo-700 dark:text-[#8AB4F8] truncate">
                    {bl.title}
                  </div>
                  {bl.excerpt && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      ...{bl.excerpt}...
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

        {/* 评论区域 - 公开笔记或作者本人都可以看到 */}
        {(note.isPublic || isOwner) && (
          <CommentSection noteId={noteId} isPublic={note.isPublic} />
        )}
      </div>
      </div>

      {/* 分享弹窗 */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white dark:bg-[#151921] border border-transparent dark:border-white/15 rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">分享笔记</h3>
              <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* 二维码 */}
            {qrDataUrl && (
              <div className="flex flex-col items-center mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrDataUrl} alt="分享二维码" className="w-44 h-44 rounded-lg border border-gray-100" />
                <p className="text-xs text-gray-400 mt-2">扫码访问笔记</p>
              </div>
            )}

            {/* 链接复制 */}
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#1A202C] rounded-lg px-3 py-2 border border-gray-200 dark:border-white/15">
              <span className="flex-1 text-sm text-gray-600 dark:text-[#F2EDE4] truncate">{typeof window !== 'undefined' ? `${window.location.origin}/notes/${noteId}` : ''}</span>
              <button onClick={handleCopyLink} className="shrink-0 text-sm font-medium text-blue-600 dark:text-[#D4AD72] hover:text-blue-700 dark:hover:text-[#E0BD86] transition-colors">
                {copyTip || '复制'}
              </button>
            </div>

            {note.isPublic ? (
              <p className="text-xs text-green-600 mt-2 text-center">✓ 此笔记已公开，任何人都可以访问</p>
            ) : (
              <p className="text-xs text-orange-500 mt-2 text-center">⚠ 此笔记未公开，仅登录用户可见</p>
            )}
          </div>
        </div>
      )}
      <SiteFooter className="mt-auto" />
    </div>
  );
}