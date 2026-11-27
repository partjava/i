'use client';
import mobileStyles from './mobile-notes.module.css';
import NoteCard from './components/NoteCard';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useAuth } from '@shared/hooks/useAuth';
import { useRouter } from 'next/navigation';
import MarkdownEditor from '@shared/components/MarkdownEditor';
import SiteFooter from '@shared/components/SiteFooter';
import { message } from 'antd';
import {
  Plus,
  BookOpen,
  Upload,
  CheckSquare,
  Trash2,
  Download,
  Search,
  LayoutGrid,
  List as ListIcon,
  FolderOpen,
  Globe,
  User,
  Pin,
  Layers,
  Tag,
  Sparkles,
  X,
  ArrowUpDown,
} from 'lucide-react';
import { NOTE_TEMPLATES, calcReadingStats, downloadMarkdownFile } from './utils';

export interface ChildChapterSummary {
  id: number;
  title: string;
  sortOrder?: number;
  category?: string;
  isPublic?: boolean;
  updatedAt?: string;
}

export interface Note {
  id?: string | number;
  _id?: string;
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
  likeCount?: number;
  bookmarkCount?: number;
  commentCount?: number;
  like_count?: number;
  bookmark_count?: number;
  comment_count?: number;
  liked?: boolean;
  bookmarked?: boolean;
  parentId?: number | null;
  parentTitle?: string;
  sortOrder?: number;
  isPinned?: boolean;
  childCount?: number;
  children?: ChildChapterSummary[];
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

type ViewScope = 'my' | 'collections' | 'public';
type SortKey = 'updated' | 'likes' | 'bookmarks' | 'words' | 'title';
type QuickFilter = 'all' | 'pinned' | 'collections' | 'public' | 'private';

export default function NotesPage() {
  const { data: session, status } = useAuth();
  const router = useRouter();

  const [notes, setNotes] = useState<Note[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const c = sessionStorage.getItem('notes_cache_my') || sessionStorage.getItem('notes_cache_public');
      if (c) return JSON.parse(c).notes || [];
    } catch {}
    return [];
  });
  const [pagination, setPagination] = useState<Pagination>(() => {
    if (typeof window === 'undefined') return { page: 1, limit: 20, total: 0, totalPages: 0, hasNext: false, hasPrev: false };
    try {
      const c = sessionStorage.getItem('notes_cache_my') || sessionStorage.getItem('notes_cache_public');
      if (c) return JSON.parse(c).pagination || { page: 1, limit: 20, total: 0, totalPages: 0, hasNext: false, hasPrev: false };
    } catch {}
    return { page: 1, limit: 20, total: 0, totalPages: 0, hasNext: false, hasPrev: false };
  });
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const c = sessionStorage.getItem('notes_cache_my') || sessionStorage.getItem('notes_cache_public');
      return !c;
    } catch {}
    return true;
  });

  const [viewMode, setViewMode] = useState<'my' | 'public'>('public');
  const [viewScope, setViewScope] = useState<ViewScope>('public');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortKey>('updated');
  const [quickFilter, setQuickFilter] = useState<QuickFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Note[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const isRestoringScroll = useRef(false);
  const importInputRef = useRef<HTMLInputElement>(null);

  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<{ [key: string]: boolean }>({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [importingMd, setImportingMd] = useState(false);

  // 拖拽整理（拖到另一张笔记卡合成多章节、拖到左侧分类改分类）
  const [draggingNoteId, setDraggingNoteId] = useState<string | null>(null);
  const [dragOverNoteId, setDragOverNoteId] = useState<string | null>(null);
  const [dragOverCategory, setDragOverCategory] = useState<string | null>(null);

  // 移入合集 / 改分类弹窗
  const [moveTargetNote, setMoveTargetNote] = useState<Note | null>(null);
  const [moveParentId, setMoveParentId] = useState<string>('');
  const [moveCategoryValue, setMoveCategoryValue] = useState<string>('');
  const [movingNote, setMovingNote] = useState(false);

  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: '',
    technology: '',
    subcategory: '',
    tags: '',
    isPublic: false,
    parentId: '' as string,
  });
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [createDraftSavedAt, setCreateDraftSavedAt] = useState<string | null>(null);
  const [pendingCreateDraft, setPendingCreateDraft] = useState<(typeof newNote & { savedAt?: string }) | null>(null);

  useEffect(() => {
    setAutoSaveEnabled(localStorage.getItem('autoSave') !== 'false');
    const onSettingsChange = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, any>>).detail || {};
      if (typeof detail.autoSave === 'boolean') {
        setAutoSaveEnabled(detail.autoSave);
      }
    };
    window.addEventListener('partjava-settings-change', onSettingsChange);
    return () => window.removeEventListener('partjava-settings-change', onSettingsChange);
  }, []);

  useEffect(() => {
    if (!showCreateForm) return;
    try {
      const raw = localStorage.getItem('note_draft_create');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && (parsed.title?.trim() || parsed.content?.trim())) {
          setPendingCreateDraft(parsed);
        } else {
          setPendingCreateDraft(null);
        }
      } else {
        setPendingCreateDraft(null);
      }
    } catch {
      setPendingCreateDraft(null);
    }
  }, [showCreateForm]);

  useEffect(() => {
    if (!showCreateForm || !autoSaveEnabled) return;
    if (!newNote.title.trim() && !newNote.content.trim()) return;
    const timer = setTimeout(() => {
      try {
        const savedAt = new Date().toLocaleTimeString('zh-CN', { hour12: false });
        localStorage.setItem('note_draft_create', JSON.stringify({ ...newNote, savedAt }));
        setCreateDraftSavedAt(savedAt);
      } catch {}
    }, 800);
    return () => clearTimeout(timer);
  }, [showCreateForm, autoSaveEnabled, newNote]);

  const doScrollRestore = (noteId: string | null, y: number) => {
    const container = document.querySelector('main') as HTMLElement | null;
    const scrollToY = (top: number) => {
      if (container) container.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
      else window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
    };
    const tryAnchor = () => {
      if (!noteId) return false;
      const el = document.getElementById(`note-${noteId}`);
      if (!el) return false;
      el.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
      scrollToY(Math.max(0, (container ? container.scrollTop : window.scrollY) - 24));
      return true;
    };
    requestAnimationFrame(() => {
      if (!tryAnchor()) scrollToY(y);
      setTimeout(() => {
        if (!tryAnchor()) scrollToY(y);
      }, 150);
      setTimeout(() => {
        if (!tryAnchor()) scrollToY(y);
        isRestoringScroll.current = false;
      }, 500);
    });
  };

  const fetchNotesWithMode = useCallback(async (mode: 'my' | 'public', page: number = 1) => {
    try {
      setLoading(true);
      const limit = 20;
      const url =
        mode === 'public' || status !== 'authenticated'
          ? `/api/notes?isPublic=true&page=${page}&limit=${limit}&_t=${Date.now()}`
          : `/api/notes?page=${page}&limit=${limit}&_t=${Date.now()}`;
      const response = await fetch(url, { credentials: 'include', cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        let notesData: Note[] = [];
        let paginationData = { page, limit, total: 0, totalPages: 0, hasNext: false, hasPrev: false };
        if (data?.success && Array.isArray(data?.data)) {
          notesData = data.data;
        } else if (data?.data?.notes) {
          notesData = data.data.notes;
          paginationData = data.data.pagination || paginationData;
        } else if (data?.notes) {
          notesData = data.notes;
          paginationData = data.pagination || paginationData;
        } else if (Array.isArray(data)) {
          notesData = data;
        }
        setNotes(notesData);
        setPagination(paginationData);
        if (page === 1) {
          sessionStorage.setItem(`notes_cache_${mode}`, JSON.stringify({ notes: notesData, pagination: paginationData }));
        }
      } else {
        setNotes([]);
      }
    } catch {
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (status === 'loading') return;

    let targetMode: 'my' | 'public' = 'public';
    if (status === 'unauthenticated') {
      targetMode = 'public';
    } else if (status === 'authenticated' && session?.user) {
      const savedMode = sessionStorage.getItem('notes_view_mode') as 'my' | 'public' | null;
      if (savedMode) sessionStorage.removeItem('notes_view_mode');
      targetMode = savedMode || 'my';
    }

    setViewMode(targetMode);
    setViewScope(targetMode);

    const savedNoteId = sessionStorage.getItem(`notes_last_note_id_${targetMode}`);
    const savedY = sessionStorage.getItem(`notes_scroll_y_${targetMode}`);
    const savedPage = sessionStorage.getItem(`notes_page_${targetMode}`);
    if (savedNoteId || savedY) {
      isRestoringScroll.current = true;
      const y = savedY ? parseInt(savedY) : 0;
      const page = savedPage ? parseInt(savedPage) : 1;
      if (savedNoteId) sessionStorage.removeItem(`notes_last_note_id_${targetMode}`);
      if (savedY) sessionStorage.removeItem(`notes_scroll_y_${targetMode}`);
      if (savedPage) sessionStorage.removeItem(`notes_page_${targetMode}`);

      const cacheKeyForMode = `notes_cache_${targetMode}`;
      const cached = page === 1 ? sessionStorage.getItem(cacheKeyForMode) : null;
      if (cached) {
        try {
          const { notes: cachedNotes, pagination: cachedPagination } = JSON.parse(cached);
          setNotes(cachedNotes);
          setPagination(cachedPagination);
          setLoading(false);
          doScrollRestore(savedNoteId, y);
        } catch {
          fetchNotesWithMode(targetMode, page).then(() => doScrollRestore(savedNoteId, y));
        }
      } else {
        fetchNotesWithMode(targetMode, page).then(() => doScrollRestore(savedNoteId, y));
      }
    } else {
      isRestoringScroll.current = false;
      fetchNotesWithMode(targetMode, 1);
    }
  }, [status, session, fetchNotesWithMode]);

  const cacheKey = `notes_cache_${viewMode}`;

  const rememberListPosition = useCallback(
    (noteId?: string | number) => {
      try {
        const container = document.querySelector('main') as HTMLElement | null;
        const y = container ? container.scrollTop : window.scrollY;
        sessionStorage.setItem(`notes_scroll_y_${viewMode}`, String(y));
        sessionStorage.setItem('notes_view_mode', viewMode);
        sessionStorage.setItem(`notes_page_${viewMode}`, String(pagination?.page || 1));
        if (noteId !== undefined && noteId !== null && String(noteId).length > 0) {
          sessionStorage.setItem(`notes_last_note_id_${viewMode}`, String(noteId));
        }
      } catch {}
    },
    [viewMode, pagination?.page]
  );

  const fetchNotes = useCallback(
    async (page: number = pagination?.page || 1, ignoreCache: boolean = false) => {
      if (page === 1 && !ignoreCache) {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          try {
            const { notes: cachedNotes, pagination: cachedPagination } = JSON.parse(cached);
            setNotes(cachedNotes);
            setPagination(cachedPagination);
            setLoading(false);
            return;
          } catch {}
        }
      }
      await fetchNotesWithMode(viewMode, page);
    },
    [cacheKey, fetchNotesWithMode, pagination?.page, viewMode]
  );

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }
      if (query.length < 2) return;

      const searchPublic = true;
      const searchPersonal = status === 'authenticated' && viewMode === 'my';
      setIsSearching(true);
      try {
        let searchParams = `q=${encodeURIComponent(query)}&searchPublic=${searchPublic}`;
        if (searchPersonal) searchParams += '&searchPersonal=true';
        searchParams += `&_t=${Date.now()}`;

        const response = await fetch(`/api/notes/search?${searchParams}`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          let searchData: Note[] = [];
          if (data?.success && Array.isArray(data?.data)) searchData = data.data;
          else if (data?.notes && Array.isArray(data.notes)) searchData = data.notes;
          else if (Array.isArray(data)) searchData = data;
          setSearchResults(searchData);
        }
      } catch (error) {
        console.error('搜索出错:', error);
      } finally {
        setIsSearching(false);
      }
    },
    [status, viewMode]
  );

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    if (searchQuery.trim().length < 2) return;
    if (viewMode === 'my' && status !== 'authenticated') return;

    const timer = setTimeout(() => handleSearch(searchQuery), 550);
    return () => clearTimeout(timer);
  }, [searchQuery, viewMode, status, handleSearch]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title.trim()) {
      message.warning('请填写标题');
      return;
    }
    if (!newNote.content.trim()) {
      message.warning('请填写内容');
      return;
    }
    try {
      const payload: Record<string, any> = {
        title: newNote.title.trim(),
        content: newNote.content,
        category: newNote.category.trim(),
        technology: newNote.technology.trim(),
        subcategory: newNote.subcategory.trim(),
        isPublic: newNote.isPublic,
        tags: newNote.tags
          .split(/[,，]/)
          .map((t) => t.trim())
          .filter(Boolean),
      };
      if (newNote.parentId) {
        payload.parentId = Number(newNote.parentId);
      }

      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        localStorage.removeItem('note_draft_create');
        setCreateDraftSavedAt(null);
        setPendingCreateDraft(null);
        setShowCreateForm(false);
        setNewNote({
          title: '',
          content: '',
          category: '',
          technology: '',
          subcategory: '',
          tags: '',
          isPublic: false,
          parentId: '',
        });
        await fetchNotes(1, true);
        message.success('笔记创建成功');
      } else {
        const errorData = await response.json().catch(() => ({}));
        message.error(`创建失败: ${errorData.error || errorData.message || '未知错误'}`);
      }
    } catch {
      message.error('创建笔记时发生错误，请重试');
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('确定要删除这个笔记吗？若该笔记为合集封面，其子章节将安全保留为独立笔记。')) return;
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        await fetchNotes(pagination.page, true);
        message.success('笔记已删除');
      } else {
        const errorData = await response.json().catch(() => ({}));
        message.error(`删除失败: ${errorData.error || errorData.message || '未知错误'}`);
      }
    } catch {
      message.error('删除笔记时发生错误');
    }
  };

  const handleBatchDeleteNotes = async () => {
    try {
      setIsDeleting(true);
      const noteIdsToDelete = Object.entries(selectedNotes)
        .filter(([, isSelected]) => isSelected)
        .map(([id]) => id);
      if (noteIdsToDelete.length === 0) {
        message.warning('请选择要删除的笔记');
        return;
      }
      const response = await fetch('/api/notes/batch-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ids: noteIdsToDelete }),
      });
      if (response.ok) {
        const result = await response.json();
        setSelectedNotes({});
        setIsMultiSelectMode(false);
        await fetchNotes(pagination.page, true);
        message.success(`成功删除 ${result.data?.deleted || noteIdsToDelete.length} 篇笔记`);
      } else {
        const errorData = await response.json().catch(() => ({}));
        message.error(`删除失败: ${errorData.error || '未知错误'}`);
      }
    } catch {
      message.error('批量删除时发生错误');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBatchExportMd = () => {
    const picked = notes.filter((n) => selectedNotes[String(n.id || n._id || '')]);
    if (picked.length === 0) {
      message.warning('请先勾选要导出的笔记');
      return;
    }
    const merged = picked
      .map((n) => `# ${n.title}\n\n${n.content || ''}\n`)
      .join('\n---\n\n');
    downloadMarkdownFile(`禾硙笔记批量导出_${picked.length}篇.md`, merged);
    message.success(`已打包导出 ${picked.length} 篇 Markdown`);
  };

  // 拖拽/弹窗核心操作：移动归属合集或更改分类
  const moveNoteToTarget = async (
    sourceNoteId: string,
    payload: { parentId?: number; clearParent?: boolean; category?: string }
  ) => {
    try {
      const res = await fetch(`/api/notes/${sourceNoteId}/move`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success !== false) {
        await fetchNotes(1, true);
        if (payload.parentId) {
          message.success('已收纳为多章节合集的子章节');
        } else if (payload.clearParent) {
          message.success('已移出合集，恢复为独立顶层笔记');
        } else if (payload.category !== undefined) {
          message.success(`已调整分类至「${payload.category || '未分类'}」`);
        }
      } else {
        message.error(json.message || '移动失败');
      }
    } catch {
      message.error('网络错误，移动失败');
    }
  };

  const handleTogglePin = async (noteId: string) => {
    try {
      const res = await fetch(`/api/notes/${noteId}/pin`, {
        method: 'POST',
        credentials: 'include',
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success !== false) {
        await fetchNotes(1, true);
        message.success(json.data?.isPinned ? '已置顶该笔记' : '已取消置顶');
      } else {
        message.error(json.message || '置顶操作失败');
      }
    } catch {
      message.error('置顶操作失败');
    }
  };

  // 导入本地 .md 文件（单文件直接新建；多文件自动打包成多章节合集）
  const handleImportMarkdownFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(e.target.files || []);
    e.target.value = '';
    if (fileList.length === 0) return;

    setImportingMd(true);
    try {
      if (fileList.length === 1) {
        const file = fileList[0];
        const text = await file.text();
        const title = file.name.replace(/\.(md|markdown|txt)$/i, '');
        const res = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            title,
            content: text || `# ${title}\n`,
            category: selectedCategory !== 'all' ? selectedCategory : '导入笔记',
            technology: '',
            subcategory: '',
            tags: ['Markdown导入'],
            isPublic: false,
          }),
        });
        if (!res.ok) throw new Error('导入失败');
        message.success(`已导入笔记《${title}》`);
      } else {
        // 多文件：自动创建一个合集目录 + 按文件名排序挂载子章节
        const sortedFiles = [...fileList].sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
        const bookTitle = `导入合集（${sortedFiles.length} 篇）`;
        const toc = sortedFiles
          .map((f, idx) => `${idx + 1}. ${f.name.replace(/\.(md|markdown|txt)$/i, '')}`)
          .join('\n');
        const parentRes = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            title: bookTitle,
            content: `## 合集目录\n\n由本地 ${sortedFiles.length} 个 Markdown 文件批量导入创建：\n\n${toc}`,
            category: selectedCategory !== 'all' ? selectedCategory : '专栏合集',
            technology: '',
            subcategory: '批量导入',
            tags: ['合集', 'Markdown导入'],
            isPublic: false,
          }),
        });
        const parentJson = await parentRes.json();
        const parentId = parentJson?.data?.id;
        if (!parentId) throw new Error('创建合集主笔记失败');

        for (let i = 0; i < sortedFiles.length; i++) {
          const f = sortedFiles[i];
          const text = await f.text();
          const chTitle = f.name.replace(/\.(md|markdown|txt)$/i, '');
          await fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              title: chTitle,
              content: text || `# ${chTitle}\n`,
              category: selectedCategory !== 'all' ? selectedCategory : '专栏合集',
              technology: '',
              subcategory: '',
              tags: ['章节'],
              isPublic: false,
              parentId,
              sortOrder: i,
            }),
          });
        }
        message.success(`已批量导入为多章节合集《${bookTitle}》`);
      }
      await fetchNotes(1, true);
    } catch {
      message.error('导入 Markdown 失败，请确认已登录并检查文件编码');
    } finally {
      setImportingMd(false);
    }
  };

  // HTML5 拖放处理
  const handleDragStartNote = (noteId: string, e: React.DragEvent) => {
    setDraggingNoteId(noteId);
    e.dataTransfer.setData('text/plain', noteId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEndNote = () => {
    setDraggingNoteId(null);
    setDragOverNoteId(null);
    setDragOverCategory(null);
  };

  const handleDragOverNote = (noteId: string, e: React.DragEvent) => {
    if (!draggingNoteId || draggingNoteId === noteId) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverNoteId !== noteId) setDragOverNoteId(noteId);
  };

  const handleDropOnNote = async (targetNoteId: string, e: React.DragEvent) => {
    e.preventDefault();
    const sourceId = draggingNoteId || e.dataTransfer.getData('text/plain');
    setDragOverNoteId(null);
    setDraggingNoteId(null);
    if (!sourceId || sourceId === targetNoteId) return;
    await moveNoteToTarget(sourceId, { parentId: Number(targetNoteId) });
  };

  const handleDropOnCategory = async (categoryName: string, e: React.DragEvent) => {
    e.preventDefault();
    const sourceId = draggingNoteId || e.dataTransfer.getData('text/plain');
    setDragOverCategory(null);
    setDraggingNoteId(null);
    if (!sourceId) return;
    await moveNoteToTarget(sourceId, { category: categoryName === 'all' ? '' : categoryName });
  };

  const canManageNotes = status === 'authenticated' && viewMode === 'my';

  // 统计与侧栏数据
  const noteIdSet = useMemo(
    () => new Set(notes.map((n) => String(n.id || n._id || ''))),
    [notes]
  );

  // 非搜索状态下：如果子笔记的父合集已在列表中，则收纳进父卡展示；搜索时全量命中展示
  const topLevelNotes = useMemo(() => {
    const base = searchQuery.trim() ? searchResults : notes;
    if (searchQuery.trim()) return base;
    return base.filter((n) => !n.parentId || !noteIdSet.has(String(n.parentId)));
  }, [notes, searchResults, searchQuery, noteIdSet]);

  const allCategories = useMemo(
    () => Array.from(new Set(notes.map((n) => n.category).filter(Boolean))),
    [notes]
  );

  const popularTags = useMemo(() => {
    const map = new Map<string, number>();
    notes.forEach((n) => {
      (n.tags || []).forEach((t) => {
        if (t) map.set(t, (map.get(t) || 0) + 1);
      });
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 16);
  }, [notes]);

  const collectionsCount = useMemo(
    () => notes.filter((n) => (n.childCount || n.children?.length || 0) > 0).length,
    [notes]
  );

  const publicCount = useMemo(
    () => notes.filter((n) => n.isPublic).length,
    [notes]
  );

  // 应用视图过滤 + 分类 + 标签 + 排序
  const displayNotes = useMemo(() => {
    let list = [...topLevelNotes];

    if (viewScope === 'collections') {
      list = list.filter((n) => (n.childCount || n.children?.length || 0) > 0);
    }

    if (selectedCategory !== 'all') {
      list = list.filter((n) => n.category === selectedCategory);
    }

    if (selectedTag !== 'all') {
      list = list.filter((n) => (n.tags || []).includes(selectedTag));
    }

    if (quickFilter === 'pinned') list = list.filter((n) => n.isPinned);
    else if (quickFilter === 'collections')
      list = list.filter((n) => (n.childCount || n.children?.length || 0) > 0);
    else if (quickFilter === 'public') list = list.filter((n) => n.isPublic);
    else if (quickFilter === 'private') list = list.filter((n) => !n.isPublic);

    list.sort((a, b) => {
      const pinDiff = Number(Boolean(b.isPinned)) - Number(Boolean(a.isPinned));
      if (pinDiff !== 0) return pinDiff;
      if (sortBy === 'likes') {
        return (b.likeCount ?? b.like_count ?? 0) - (a.likeCount ?? a.like_count ?? 0);
      }
      if (sortBy === 'bookmarks') {
        return (b.bookmarkCount ?? b.bookmark_count ?? 0) - (a.bookmarkCount ?? a.bookmark_count ?? 0);
      }
      if (sortBy === 'words') {
        return calcReadingStats(b.content).words - calcReadingStats(a.content).words;
      }
      if (sortBy === 'title') {
        return (a.title || '').localeCompare(b.title || '', 'zh-CN');
      }
      return (
        new Date(b.updatedAt || b.createdAt).getTime() -
        new Date(a.updatedAt || a.createdAt).getTime()
      );
    });

    return list;
  }, [topLevelNotes, viewScope, selectedCategory, selectedTag, quickFilter, sortBy]);

  if (status === 'loading' || (loading && notes.length === 0)) {
    return (
      <div className="min-h-[calc(100vh-70px)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#1B3B6F] dark:border-[#D4AD72] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-content-muted">正在加载知识库工作台...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${mobileStyles.page} min-h-[calc(100vh-70px)] flex flex-col`}>
      {/* 隐藏的本地 Markdown 导入控件 */}
      <input
        ref={importInputRef}
        type="file"
        accept=".md,.markdown,.txt"
        multiple
        className="hidden"
        onChange={handleImportMarkdownFiles}
      />

      <div className={`${mobileStyles.layout} flex-1 max-w-[1440px] w-full mx-auto flex px-4 sm:px-6 lg:px-8 py-6 gap-6`}>
        {/* 左侧知识库导航侧边栏（支持拖拽到分类改归属） */}
        <aside className="hidden lg:block w-64 flex-shrink-0 space-y-4">
          <div className="rounded-2xl border border-line-subtle bg-surface-raised p-4 shadow-sm sticky top-6 space-y-5">
            {/* 空间切换 */}
            <div>
              <h3 className="text-[11px] font-mono font-semibold text-content-muted uppercase tracking-wider mb-2.5 px-2">
                知识空间
              </h3>
              <div className="space-y-1">
                {status === 'authenticated' && session?.user && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setViewMode('my');
                        setViewScope('my');
                        setIsMultiSelectMode(false);
                        setSelectedNotes({});
                        setSelectedCategory('all');
                        setSelectedTag('all');
                        fetchNotesWithMode('my', 1);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        viewScope === 'my'
                          ? 'bg-[#0F1D33] text-white dark:bg-[#D4AD72] dark:text-[#0F1D33] shadow-sm'
                          : 'text-content-secondary hover:bg-surface-muted hover:text-content-primary'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>我的笔记</span>
                      </span>
                      {viewMode === 'my' && (
                        <span className="text-xs font-mono opacity-80">{notes.length}</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (viewMode !== 'my') {
                          setViewMode('my');
                          fetchNotesWithMode('my', 1);
                        }
                        setViewScope('collections');
                        setSelectedCategory('all');
                        setSelectedTag('all');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        viewScope === 'collections'
                          ? 'bg-[#0F1D33] text-white dark:bg-[#D4AD72] dark:text-[#0F1D33] shadow-sm'
                          : 'text-content-secondary hover:bg-surface-muted hover:text-content-primary'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>多章合集</span>
                      </span>
                      {viewMode === 'my' && (
                        <span className="text-xs font-mono opacity-80">{collectionsCount}</span>
                      )}
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setViewMode('public');
                    setViewScope('public');
                    setIsMultiSelectMode(false);
                    setSelectedNotes({});
                    setSelectedCategory('all');
                    setSelectedTag('all');
                    fetchNotesWithMode('public', 1);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    viewScope === 'public'
                      ? 'bg-[#0F1D33] text-white dark:bg-[#D4AD72] dark:text-[#0F1D33] shadow-sm'
                      : 'text-content-secondary hover:bg-surface-muted hover:text-content-primary'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>公开笔记广场</span>
                  </span>
                  {viewMode === 'public' && (
                    <span className="text-xs font-mono opacity-80">{notes.length}</span>
                  )}
                </button>
              </div>
            </div>

            {/* 分类目录（同时作为 HTML5 拖放目标） */}
            <div className="pt-4 border-t border-line-subtle">
              <div className="flex items-center justify-between px-2 mb-2.5">
                <h3 className="text-[11px] font-mono font-semibold text-content-muted uppercase tracking-wider">
                  分类目录
                </h3>
                {canManageNotes && (
                  <span className="text-[10px] text-content-muted">支持拖入改分类</span>
                )}
              </div>

              <div className="space-y-1 max-h-64 overflow-y-auto pr-0.5 custom-scrollbar">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  onDragOver={(e) => {
                    if (!canManageNotes || !draggingNoteId) return;
                    e.preventDefault();
                    setDragOverCategory('all');
                  }}
                  onDragLeave={() => setDragOverCategory(null)}
                  onDrop={(e) => canManageNotes && handleDropOnCategory('all', e)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${
                    dragOverCategory === 'all'
                      ? 'border border-dashed border-[#D4AD72] bg-[#D4AD72]/15 text-content-primary font-semibold'
                      : selectedCategory === 'all'
                      ? 'bg-brand-soft text-content-primary font-semibold'
                      : 'text-content-secondary hover:bg-surface-muted hover:text-content-primary'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <FolderOpen className="w-3.5 h-3.5 shrink-0 text-[#D4AD72]" />
                    <span className="truncate">全部分类</span>
                  </span>
                  <span className="text-xs font-mono text-content-muted">{topLevelNotes.length}</span>
                </button>

                {allCategories.map((cat) => {
                  const count = topLevelNotes.filter((n) => n.category === cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      onDragOver={(e) => {
                        if (!canManageNotes || !draggingNoteId) return;
                        e.preventDefault();
                        setDragOverCategory(cat);
                      }}
                      onDragLeave={() => setDragOverCategory(null)}
                      onDrop={(e) => canManageNotes && handleDropOnCategory(cat, e)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${
                        dragOverCategory === cat
                          ? 'border border-dashed border-[#D4AD72] bg-[#D4AD72]/15 text-content-primary font-semibold'
                          : selectedCategory === cat
                          ? 'bg-brand-soft text-content-primary font-semibold'
                          : 'text-content-secondary hover:bg-surface-muted hover:text-content-primary'
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      <span className="text-xs font-mono text-content-muted">{count}</span>
                    </button>
                  );
                })}
              </div>
              {allCategories.length === 0 && (
                <p className="mt-2 px-2 text-xs text-content-muted">暂无分类，创建笔记或拖拽归类</p>
              )}
            </div>

            {/* 热门标签云 */}
            {popularTags.length > 0 && (
              <div className="pt-4 border-t border-line-subtle">
                <div className="flex items-center justify-between px-2 mb-2.5">
                  <h3 className="text-[11px] font-mono font-semibold text-content-muted uppercase tracking-wider flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    标签索引
                  </h3>
                  {selectedTag !== 'all' && (
                    <button
                      type="button"
                      onClick={() => setSelectedTag('all')}
                      className="text-[11px] text-brand-primary dark:text-[#D4AD72] hover:underline"
                    >
                      清除
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {popularTags.map(([tag, cnt]) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedTag((prev) => (prev === tag ? 'all' : tag))}
                      className={`px-2 py-1 rounded-lg text-xs transition-colors ${
                        selectedTag === tag
                          ? 'bg-[#1B3B6F] text-white dark:bg-[#D4AD72] dark:text-[#0F1D33] font-semibold'
                          : 'bg-surface-page text-content-secondary border border-line-subtle hover:border-[#D4AD72]/50'
                      }`}
                    >
                      #{tag} <span className="opacity-65 font-mono">{cnt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* 右侧主工作台 */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* 顶部工作台横幅 */}
          <div className="rounded-2xl bg-surface-raised border border-line-subtle shadow-sm p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-primary dark:text-[#D4AD72] mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D4AD72]" />
                  <span>UNOLGY · KNOWLEDGE WORKBENCH</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-content-primary tracking-tight">
                  {viewScope === 'collections'
                    ? '多章节专栏合集'
                    : viewMode === 'my'
                    ? '我的知识笔记库'
                    : '公开笔记广场'}
                </h1>
                <p className="text-xs sm:text-sm text-content-muted mt-1">
                  共 {notes.length} 篇笔记 · {collectionsCount} 个多章节合集 · {publicCount} 篇已公开
                  {canManageNotes && ' · 支持拖拽笔记卡片叠加成多章节合集，或双链 [[笔记标题]] 关联'}
                </p>
              </div>

              {/* 移动端空间切换 + 创作工具 */}
              <div className="flex flex-wrap items-center gap-2">
                {status === 'authenticated' && session?.user && (
                  <div className="lg:hidden inline-flex rounded-xl border border-line-subtle bg-surface-page p-1 mr-1">
                    <button
                      type="button"
                      onClick={() => {
                        setViewMode('my');
                        setViewScope('my');
                        fetchNotesWithMode('my', 1);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        viewMode === 'my'
                          ? 'bg-[#0F1D33] text-white dark:bg-[#D4AD72] dark:text-[#0F1D33]'
                          : 'text-content-secondary'
                      }`}
                    >
                      我的
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setViewMode('public');
                        setViewScope('public');
                        fetchNotesWithMode('public', 1);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        viewMode === 'public'
                          ? 'bg-[#0F1D33] text-white dark:bg-[#D4AD72] dark:text-[#0F1D33]'
                          : 'text-content-secondary'
                      }`}
                    >
                      广场
                    </button>
                  </div>
                )}

                {canManageNotes && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setNewNote({
                          title: '',
                          content: '',
                          category: selectedCategory !== 'all' ? selectedCategory : '',
                          technology: '',
                          subcategory: '',
                          tags: '',
                          isPublic: false,
                          parentId: '',
                        });
                        setShowCreateForm(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F1D33] hover:bg-[#1B3B6F] dark:bg-[#D4AD72] dark:hover:bg-[#E2BE84] text-white dark:text-[#0F1D33] text-sm font-semibold shadow-sm transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>新建笔记</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const tpl = NOTE_TEMPLATES.find((t) => t.id === 'collection')!;
                        setNewNote({
                          title: tpl.titlePrefix || '',
                          content: tpl.content,
                          category: selectedCategory !== 'all' ? selectedCategory : tpl.category,
                          technology: tpl.technology,
                          subcategory: tpl.subcategory,
                          tags: tpl.tags,
                          isPublic: false,
                          parentId: '',
                        });
                        setShowCreateForm(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-page hover:bg-surface-muted border border-line-subtle text-content-primary text-sm font-medium transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-[#D4AD72]" />
                      <span className="hidden sm:inline">新建合集</span>
                    </button>

                    <button
                      type="button"
                      disabled={importingMd}
                      onClick={() => importInputRef.current?.click()}
                      title="单选导入 1 篇笔记；多选将自动合并为多章节合集"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-page hover:bg-surface-muted border border-line-subtle text-content-primary text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      <Upload className="w-4 h-4 text-sky-500" />
                      <span className="hidden sm:inline">{importingMd ? '导入中...' : '导入 .md'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsMultiSelectMode(!isMultiSelectMode);
                        setSelectedNotes({});
                      }}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm font-medium transition-colors ${
                        isMultiSelectMode
                          ? 'bg-[#1B3B6F] text-white border-[#1B3B6F] dark:bg-[#D4AD72] dark:text-[#0F1D33]'
                          : 'bg-surface-page hover:bg-surface-muted border-line-subtle text-content-secondary hover:text-content-primary'
                      }`}
                    >
                      <CheckSquare className="w-4 h-4" />
                      <span className="hidden sm:inline">{isMultiSelectMode ? '退出批量' : '批量管理'}</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* 第二行：搜索 + 快捷筛选 + 排序 + 视图切换 */}
            <div className="mt-5 pt-4 border-t border-line-subtle flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[220px] max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
                <input
                  type="text"
                  placeholder="搜索笔记标题、正文或 [[双链]] 关键词..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-8 py-2 rounded-xl bg-surface-page border border-line-subtle focus:outline-none focus:border-[#D4AD72] text-sm text-content-primary placeholder-content-muted transition-colors"
                />
                {isSearching && (
                  <div className="absolute right-3 top-2.5 animate-spin h-4 w-4 border-2 border-line-strong border-t-[#D4AD72] rounded-full" />
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* 快捷筛选胶囊 */}
                <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-surface-page border border-line-subtle">
                  {(
                    [
                      ['all', '全部'],
                      ['pinned', '已置顶'],
                      ['collections', '仅合集'],
                      ['public', '公开'],
                      ...(canManageNotes ? [['private', '私密']] : []),
                    ] as Array<[QuickFilter, string]>
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setQuickFilter(key)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                        quickFilter === key
                          ? 'bg-surface-raised text-content-primary shadow-sm'
                          : 'text-content-muted hover:text-content-primary'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* 排序选择 */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface-page border border-line-subtle text-xs text-content-secondary">
                  <ArrowUpDown className="w-3.5 h-3.5 text-content-muted" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortKey)}
                    className="bg-transparent focus:outline-none text-content-primary font-medium cursor-pointer"
                  >
                    <option value="updated">最新更新</option>
                    <option value="likes">最多点赞</option>
                    <option value="bookmarks">最多收藏</option>
                    <option value="words">字数最多</option>
                    <option value="title">标题排序</option>
                  </select>
                </div>

                {/* 网格 / 列表切换 */}
                <div className="inline-flex p-1 rounded-xl bg-surface-page border border-line-subtle">
                  <button
                    type="button"
                    onClick={() => setLayoutMode('grid')}
                    title="卡片网格视图"
                    className={`p-1.5 rounded-lg transition-colors ${
                      layoutMode === 'grid'
                        ? 'bg-surface-raised text-content-primary shadow-sm'
                        : 'text-content-muted hover:text-content-primary'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayoutMode('list')}
                    title="紧凑列表视图"
                    className={`p-1.5 rounded-lg transition-colors ${
                      layoutMode === 'list'
                        ? 'bg-surface-raised text-content-primary shadow-sm'
                        : 'text-content-muted hover:text-content-primary'
                    }`}
                  >
                    <ListIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 批量操作条 */}
          {isMultiSelectMode && canManageNotes && (
            <div className="rounded-xl bg-[#0F1D33] text-white dark:bg-[#1E2430] border border-[#D4AD72]/40 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3 text-sm">
                <span>
                  已选{' '}
                  <strong className="text-[#D4AD72] font-mono">
                    {Object.values(selectedNotes).filter(Boolean).length}
                  </strong>{' '}
                  篇笔记
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const allSelected =
                      displayNotes.length > 0 &&
                      displayNotes.every((n) => selectedNotes[String(n.id || n._id || '')]);
                    if (allSelected) {
                      setSelectedNotes({});
                    } else {
                      const next: Record<string, boolean> = {};
                      displayNotes.forEach((n) => {
                        const id = String(n.id || n._id || '');
                        if (id) next[id] = true;
                      });
                      setSelectedNotes(next);
                    }
                  }}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  全选当前视图
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleBatchExportMd}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  批量导出 .md
                </button>
                <button
                  type="button"
                  disabled={isDeleting || Object.values(selectedNotes).filter(Boolean).length === 0}
                  onClick={() => {
                    const cnt = Object.values(selectedNotes).filter(Boolean).length;
                    if (confirm(`确定要删除选中的 ${cnt} 篇笔记吗？`)) {
                      handleBatchDeleteNotes();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-45 text-xs font-semibold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {isDeleting ? '删除中...' : '批量删除'}
                </button>
              </div>
            </div>
          )}

          {/* 拖拽引导提示条 */}
          {draggingNoteId && (
            <div className="rounded-xl border border-dashed border-[#D4AD72] bg-[#D4AD72]/12 px-4 py-2.5 text-xs font-medium text-[#9A7234] dark:text-[#E8CA96] flex items-center gap-2">
              <Layers className="w-4 h-4 shrink-0" />
              <span>
                拖拽中：松手到任意另一张笔记卡片上可收纳为子章节；松手到左侧任意分类目录可跨类目调整归属
              </span>
            </div>
          )}

          {/* 笔记卡片列表 */}
          {!displayNotes || displayNotes.length === 0 ? (
            <div className="rounded-2xl bg-surface-raised border border-line-subtle py-16 px-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-surface-page border border-line-subtle flex items-center justify-center text-[#D4AD72]">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-lg font-semibold text-content-primary">
                {searchQuery.trim()
                  ? '没有找到匹配的笔记'
                  : viewScope === 'collections'
                  ? '还没有多章节合集'
                  : viewMode === 'my' && status === 'authenticated'
                  ? '这里还没有笔记'
                  : '暂时没有公开笔记'}
              </p>
              <p className="text-sm text-content-muted mt-1.5 max-w-md mx-auto">
                {viewScope === 'collections'
                  ? '将任意笔记卡片拖拽到另一篇笔记上，或点击「新建合集」即可快速组建带目录的知识专栏'
                  : canManageNotes
                  ? '点击右上角「新建笔记」或直接导入本地 Markdown 文件开始沉淀知识'
                  : '切换分类或稍后再来看看公开笔记广场的最新分享'}
              </p>
            </div>
          ) : (
            <div
              className={
                layoutMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5'
                  : 'flex flex-col gap-3.5'
              }
            >
              {displayNotes.map((note) => {
                const nid = String(note.id || note._id || '');
                return (
                  <NoteCard
                    key={nid}
                    note={note}
                    layoutMode={layoutMode}
                    canManage={canManageNotes}
                    isMultiSelectMode={isMultiSelectMode}
                    isSelected={Boolean(selectedNotes[nid])}
                    isDragOverTarget={dragOverNoteId === nid}
                    isDraggingSelf={draggingNoteId === nid}
                    onToggleSelect={(noteId, checked) =>
                      setSelectedNotes((prev) => ({ ...prev, [noteId]: checked }))
                    }
                    onOpen={(noteId) => {
                      rememberListPosition(noteId);
                      router.push(`/notes/${noteId}`);
                    }}
                    onEdit={(noteId) => rememberListPosition(noteId)}
                    onDelete={handleDeleteNote}
                    onDragStartNote={handleDragStartNote}
                    onDragEndNote={handleDragEndNote}
                    onDragOverNote={handleDragOverNote}
                    onDropOnNote={handleDropOnNote}
                    onTogglePin={handleTogglePin}
                    onOpenMoveModal={(target) => {
                      setMoveTargetNote(target);
                      setMoveParentId(target.parentId ? String(target.parentId) : '');
                      setMoveCategoryValue(target.category || '');
                    }}
                    onAddChildChapter={(parentNote) => {
                      setNewNote({
                        title: '',
                        content: '',
                        category: parentNote.category || '',
                        technology: parentNote.technology || '',
                        subcategory: '',
                        tags: (parentNote.tags || []).join(', '),
                        isPublic: Boolean(parentNote.isPublic),
                        parentId: String(parentNote.id || parentNote._id || ''),
                      });
                      setShowCreateForm(true);
                    }}
                    onRemoveFromParent={(noteId) => moveNoteToTarget(noteId, { clearParent: true })}
                    onExportMd={(n) => downloadMarkdownFile(n.title, `# ${n.title}\n\n${n.content || ''}`)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 移入合集 / 调整分类弹窗 */}
      {moveTargetNote && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={() => setMoveTargetNote(null)}
        >
          <div
            className="bg-surface-raised border border-line-subtle rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-content-primary">归类与合集调整</h3>
              <button
                type="button"
                onClick={() => setMoveTargetNote(null)}
                className="text-content-muted hover:text-content-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-content-muted">
              当前笔记：<strong className="text-content-primary">{moveTargetNote.title}</strong>
            </p>

            <div>
              <label className="block text-xs font-semibold text-content-secondary mb-1.5">
                归属父级笔记（成为其子章节）
              </label>
              <select
                value={moveParentId}
                onChange={(e) => setMoveParentId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-line-strong bg-surface-page text-sm text-content-primary focus:outline-none focus:border-[#D4AD72]"
              >
                <option value="">独立顶层笔记（不隶属任何合集）</option>
                {notes
                  .filter(
                    (n) =>
                      String(n.id || n._id) !== String(moveTargetNote.id || moveTargetNote._id) &&
                      !n.parentId
                  )
                  .map((candidate) => (
                    <option key={candidate.id} value={String(candidate.id)}>
                      {candidate.title}
                      {candidate.category ? `（${candidate.category}）` : ''}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-content-secondary mb-1.5">
                所属分类
              </label>
              <input
                type="text"
                value={moveCategoryValue}
                onChange={(e) => setMoveCategoryValue(e.target.value)}
                placeholder="输入新分类或留空"
                className="w-full px-3 py-2 rounded-xl border border-line-strong bg-surface-page text-sm text-content-primary focus:outline-none focus:border-[#D4AD72]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setMoveTargetNote(null)}
                className="px-4 py-2 rounded-xl border border-line-subtle text-sm text-content-secondary hover:bg-surface-muted"
              >
                取消
              </button>
              <button
                type="button"
                disabled={movingNote}
                onClick={async () => {
                  setMovingNote(true);
                  const id = String(moveTargetNote.id || moveTargetNote._id || '');
                  await moveNoteToTarget(id, {
                    parentId: moveParentId ? Number(moveParentId) : undefined,
                    clearParent: !moveParentId,
                    category: moveCategoryValue,
                  });
                  setMovingNote(false);
                  setMoveTargetNote(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#0F1D33] dark:bg-[#D4AD72] text-white dark:text-[#0F1D33] text-sm font-semibold"
              >
                {movingNote ? '保存中...' : '确认调整'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 创建新笔记弹窗 */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-surface-raised border border-line-subtle rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-line-subtle">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-content-primary">
                    {newNote.parentId ? '添加子章节笔记' : '创建新笔记'}
                  </h2>
                  {autoSaveEnabled && createDraftSavedAt && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ 已自动保存草稿 {createDraftSavedAt}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="text-content-muted hover:text-content-primary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {pendingCreateDraft && (
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-300/70 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-600/40 px-3.5 py-2.5 text-xs text-amber-800 dark:text-amber-200">
                  <span>
                    检测到上次未提交的本地草稿{pendingCreateDraft.savedAt ? `（${pendingCreateDraft.savedAt}）` : ''}，是否恢复？
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setNewNote({
                          title: pendingCreateDraft.title || '',
                          content: pendingCreateDraft.content || '',
                          category: pendingCreateDraft.category || '',
                          technology: pendingCreateDraft.technology || '',
                          subcategory: pendingCreateDraft.subcategory || '',
                          tags: pendingCreateDraft.tags || '',
                          isPublic: Boolean(pendingCreateDraft.isPublic),
                          parentId: pendingCreateDraft.parentId || '',
                        });
                        setPendingCreateDraft(null);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-600 text-white hover:bg-amber-700 font-medium"
                    >
                      恢复草稿
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem('note_draft_create');
                        setPendingCreateDraft(null);
                      }}
                      className="px-2 py-1 rounded-lg border border-amber-400/60 hover:bg-amber-100 dark:hover:bg-amber-900/40"
                    >
                      忽略
                    </button>
                  </div>
                </div>
              )}

              {/* 快捷写作模板 */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-content-muted uppercase tracking-wider mb-2">
                  快捷笔记模板（点击一键套用骨架）
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {NOTE_TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() =>
                        setNewNote((prev) => ({
                          ...prev,
                          title: prev.title || tpl.titlePrefix || '',
                          category: prev.category || tpl.category,
                          technology: tpl.technology || prev.technology,
                          subcategory: tpl.subcategory,
                          tags: tpl.tags,
                          content: tpl.content,
                        }))
                      }
                      className="text-left p-2.5 rounded-xl border border-line-subtle bg-surface-page hover:border-[#D4AD72] hover:bg-surface-muted transition-all"
                    >
                      <div className="text-xs font-bold text-content-primary">{tpl.label}</div>
                      <div className="text-[10px] text-content-muted mt-0.5 line-clamp-1">{tpl.shortDesc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleCreateNote} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-content-secondary mb-1.5">标题 *</label>
                    <input
                      type="text"
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                      placeholder="输入笔记或合集标题"
                      className="w-full px-3.5 py-2 border border-line-strong rounded-xl bg-surface-page text-content-primary focus:outline-none focus:border-[#D4AD72]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-content-secondary mb-1.5">
                      所属合集（可选）
                    </label>
                    <select
                      value={newNote.parentId}
                      onChange={(e) => setNewNote({ ...newNote, parentId: e.target.value })}
                      className="w-full px-3 py-2 border border-line-strong rounded-xl bg-surface-page text-sm text-content-primary focus:outline-none focus:border-[#D4AD72]"
                    >
                      <option value="">独立顶层笔记</option>
                      {notes
                        .filter((n) => !n.parentId)
                        .map((p) => (
                          <option key={p.id} value={String(p.id)}>
                            {p.title}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-content-secondary mb-1.5">分类</label>
                    <input
                      type="text"
                      value={newNote.category}
                      onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                      placeholder="如：计算机"
                      className="w-full px-3.5 py-2 border border-line-strong rounded-xl bg-surface-page text-content-primary focus:outline-none focus:border-[#D4AD72]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-content-secondary mb-1.5">技术栈</label>
                    <input
                      type="text"
                      value={newNote.technology}
                      onChange={(e) => setNewNote({ ...newNote, technology: e.target.value })}
                      placeholder="如：Java / React"
                      className="w-full px-3.5 py-2 border border-line-strong rounded-xl bg-surface-page text-content-primary focus:outline-none focus:border-[#D4AD72]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-content-secondary mb-1.5">标签（逗号分隔）</label>
                    <input
                      type="text"
                      value={newNote.tags}
                      onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                      placeholder="例如：源码, 并发"
                      className="w-full px-3.5 py-2 border border-line-strong rounded-xl bg-surface-page text-content-primary focus:outline-none focus:border-[#D4AD72]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-content-secondary mb-1.5">
                    正文内容 * <span className="font-normal text-content-muted">（支持 Markdown、公式与 [[笔记标题]] 双向链接）</span>
                  </label>
                  <MarkdownEditor
                    value={newNote.content}
                    onChange={(value) => setNewNote({ ...newNote, content: value })}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="inline-flex items-center gap-2 text-sm text-content-primary cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newNote.isPublic}
                      onChange={(e) => setNewNote({ ...newNote, isPublic: e.target.checked })}
                      className="h-4 w-4 text-[#1B3B6F] focus:ring-[#D4AD72] border-line-subtle rounded"
                    />
                    <span>公开笔记（其他学习者可在广场阅读）</span>
                  </label>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-4 py-2 rounded-xl border border-line-subtle text-sm text-content-secondary hover:bg-surface-muted"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#0F1D33] dark:bg-[#D4AD72] text-white dark:text-[#0F1D33] text-sm font-semibold shadow-sm"
                    >
                      创建笔记
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <SiteFooter className="mt-auto" />
    </div>
  );
}
