'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MarkdownEditor from '@/app/components/MarkdownEditor';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import NotesSync from '@/app/components/NotesSync';

interface Note {
  id?: string | number; // 后端返回的可能是数字id
  _id?: string; // 兼容可能使用_id的情况
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
  likeCount?: number;
  bookmarkCount?: number;
  commentCount?: number;
  like_count?: number; // 后端可能用的字段名
  bookmark_count?: number; // 后端可能用的字段名
  comment_count?: number; // 后端可能用的字段名
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function NotesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Note[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [viewMode, setViewMode] = useState<'my' | 'public'>('public');
  // 多选相关状态
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<{[key: string]: boolean}>({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: '',
    technology: '',
    subcategory: '',
    tags: '',
    isPublic: false,
  });

  // 检查登录状态 - 允许未登录用户查看公开笔记
  useEffect(() => {
    if (status === 'unauthenticated') {
      // 未登录用户强制设置为公开模式
      setViewMode('public');
    } else if (status === 'authenticated' && session?.user) {
      // 已登录用户默认查看"我的笔记"
      setViewMode('my');
      // 确保会话有效
      checkSession();
    }
    // status === 'loading' 时不改变 viewMode，保持当前状态
  }, [status, session]); // 添加 session 依赖
  
  // 检查会话状态
  const checkSession = async () => {
    try {
      const response = await fetch('/api/auth/session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store'
      });
      
      if (!response.ok) {
        console.log('会话已过期，重新刷新会话');
        // 尝试刷新会话
        const refreshResponse = await fetch('/api/auth/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          cache: 'no-store'
        });
        
        if (!refreshResponse.ok) {
          console.log('无法刷新会话，设置为公开模式');
          setViewMode('public');
        }
      }
    } catch (error) {
      console.error('会话检查失败:', error);
    }
  };

  // 获取笔记列表
  useEffect(() => {
    // 无论登录状态如何，都尝试获取笔记，并强制忽略缓存
    fetchNotes(1, true);
  }, [status]);
  
  // 当视图模式切换时获取笔记
  useEffect(() => {
    if (status !== 'loading') {
      fetchNotes(1, true);
    }
  }, [viewMode]);

  // 获取笔记列表 - 简化版本
  const fetchNotes = useCallback(async (page: number = pagination?.page || 1, ignoreCache: boolean = false) => {
    try {
      setLoading(true);
      const limit = pagination?.limit || 10; // 使用默认值10，避免undefined
      
      
      // 统一使用一个API端点
      let url = `/api/notes?page=${page}&limit=${limit}`;
      
      // 如果是公开模式或未登录，使用公开API
      if (viewMode === 'public' || status !== 'authenticated') {
        url = `/api/public-notes?page=${page}&limit=${limit}`;
      }
      
      // 始终添加时间戳以避免缓存问题
      url += `&_t=${new Date().getTime()}`;
      
      // 设置正确的凭证和请求头
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        credentials: 'include', // 包含凭证
        cache: 'no-store' // 禁用缓存
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // 灵活处理不同格式的数据
        let notesData = [];
        let paginationData = {
          page: page,
          limit: limit,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false
        };
        
        if (data && data.data && Array.isArray(data.data.notes)) {
          // 格式: { success: true, data: { notes: [], pagination: {} } }
          notesData = data.data.notes;
          paginationData = data.data.pagination || paginationData;
        } else if (data && Array.isArray(data.notes)) {
          // 格式: { notes: [], pagination: {} }
          notesData = data.notes;
          paginationData = data.pagination || paginationData;
        } else if (data && Array.isArray(data)) {
          // 格式: [...]
          notesData = data;
        }
        
        setNotes(notesData);
        setPagination(paginationData || {
          page: page,
          limit: limit,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false
        });
      } else {
        // 错误时设置空数据
        setNotes([]);
        setPagination({
          page: page,
          limit: limit,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false
        });
      }
    } catch (error) {
      // 错误时设置空数据
      setNotes([]);
      setPagination({
        page: page,
        limit: pagination?.limit || 10,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
      });
    } finally {
      setLoading(false);
    }
  }, [status, viewMode, pagination?.limit]);

  // 分页处理
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
      fetchNotes(newPage);
    }
  };

  // 搜索功能 - 优化版本，支持未登录用户搜索公开笔记
  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    if (query.length < 2) {
      return;
    }

    // 始终允许搜索公开笔记，无论在哪个视图下
    // 如果用户已登录且在"我的笔记"视图，则同时搜索个人笔记
    const searchPublic = true; // 始终搜索公开笔记
    const searchPersonal = status === 'authenticated' && viewMode === 'my';

    setIsSearching(true);
    try {
      // 构建搜索参数
      let searchParams = `q=${encodeURIComponent(query)}&searchPublic=${searchPublic}`;
      if (searchPersonal) {
        searchParams += '&searchPersonal=true';
      }
      
      // 添加时间戳避免缓存问题
      searchParams += `&_t=${new Date().getTime()}`;
      
      const response = await fetch(`/api/notes/search?${searchParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.notes && Array.isArray(data.notes)) {
          setSearchResults(data.notes);
        } else {
          setSearchResults([]);
        }
      } else {
        console.error('搜索请求失败:', response.status);
        // 尝试读取错误信息
        try {
          const errorData = await response.json();
          console.error('搜索错误:', errorData);
        } catch (e) {
          console.error('无法解析错误响应');
        }
      }
    } catch (error) {
      console.error('搜索出错:', error);
    } finally {
      setIsSearching(false);
    }
  }, [status, viewMode]);

  // 搜索输入处理 - 优化防抖，支持未登录用户搜索公开笔记
  useEffect(() => {
    // 如果搜索词为空，清空搜索结果
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    // 搜索词长度至少为2
    if (searchQuery.trim().length < 2) {
      return;
    }
    
    // 如果是"我的笔记"视图但用户未登录，不执行搜索
    if (viewMode === 'my' && status !== 'authenticated') {
      return;
    }
    
    // 设置防抖定时器
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 800); // 增加防抖时间到800ms

    return () => clearTimeout(timer);
    
  }, [searchQuery, viewMode, status, handleSearch]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 先检查会话状态
    try {
      const sessionResponse = await fetch('/api/auth/session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store'
      });
      
      if (!sessionResponse.ok) {
        alert('会话已过期，请重新登录');
        router.push('/login');
        return;
      }
      
      const sessionData = await sessionResponse.json();
      if (!sessionData.authenticated) {
        alert('请先登录再创建笔记');
        router.push('/login');
        return;
      }
      
      // 会话有效，继续创建笔记
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...newNote,
          tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('创建笔记成功:', data);
        
        setShowCreateForm(false);
        setNewNote({
          title: '',
          content: '',
          category: '',
          technology: '',
          subcategory: '',
          tags: '',
          isPublic: false,
        });
        
        // 重新获取第一页笔记
        fetchNotes(1, true); // 传入true表示忽略缓存
        
        // 显示成功消息
        alert('笔记创建成功！');
      } else {
        const errorData = await response.json();
        console.error('创建笔记失败:', errorData);
        alert(`创建笔记失败: ${errorData.message || '未知错误'}`);
      }
    } catch (error) {
      console.error('创建笔记错误:', error);
      alert('创建笔记时发生错误，请重试');
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (confirm('确定要删除这个笔记吗？')) {
      try {
        console.log('尝试删除笔记:', noteId);
        
        const response = await fetch(`/api/notes/${noteId}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (response.ok) {
          console.log('笔记删除成功');
          fetchNotes(pagination.page); // 重新获取当前页笔记
          // 显示成功消息
          alert('笔记已成功删除');
        } else {
          // 删除失败时显示错误信息
          const errorData = await response.json();
          console.error('删除笔记失败:', errorData);
          alert(`删除失败: ${errorData.error || '未知错误'}`);
        }
      } catch (error) {
        console.error('删除笔记错误:', error);
        alert('删除笔记时发生错误，请重试');
      }
    }
  };
  
  // 批量删除笔记
  const handleBatchDeleteNotes = async () => {
    try {
      setIsDeleting(true);
      
      // 获取所有选中的笔记ID
      const noteIdsToDelete = Object.entries(selectedNotes)
        .filter(([_, isSelected]) => isSelected)
        .map(([noteId, _]) => noteId);
      
      if (noteIdsToDelete.length === 0) {
        alert('请选择要删除的笔记');
        setIsDeleting(false);
        return;
      }
      
      console.log('尝试批量删除笔记:', noteIdsToDelete);
      
      const response = await fetch('/api/notes/batch-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ noteIds: noteIdsToDelete }),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('批量删除成功:', result);
        
        // 清除选择状态
        setSelectedNotes({});
        // 关闭多选模式
        setIsMultiSelectMode(false);
        // 重新获取笔记列表
        fetchNotes(pagination.page);
        
        alert(`成功删除 ${result.data.deletedCount} 篇笔记`);
      } else {
        const errorData = await response.json();
        console.error('批量删除失败:', errorData);
        alert(`删除失败: ${errorData.error || '未知错误'}`);
      }
    } catch (error) {
      console.error('批量删除错误:', error);
      alert('批量删除时发生错误，请重试');
    } finally {
      setIsDeleting(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  // 允许未登录用户查看公开笔记
  // 不再需要session检查，因为我们已经在useEffect中处理了未登录状态

  // 显示的笔记列表（搜索结果或全部笔记）
  const displayNotes = searchQuery.trim() ? searchResults : notes;

  return (
    <div className="p-8">
      {/* 添加笔记同步组件 */}
      <NotesSync />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {viewMode === 'my' ? '我的笔记' : '公开笔记'}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-200 rounded-lg p-1" style={{ marginTop: '50px' }}>
            {/* 只有登录用户才能看到"我的笔记"按钮 */}
            {status === 'authenticated' && session?.user && (
              <button
                onClick={() => {
                  setViewMode('my');
                  // 切换视图时清除选择状态
                  setIsMultiSelectMode(false);
                  setSelectedNotes({});
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'my'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                我的笔记
              </button>
            )}
            <button
              onClick={() => {
                setViewMode('public');
                // 切换到公开笔记时关闭多选模式
                setIsMultiSelectMode(false);
                setSelectedNotes({});
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'public'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              公开笔记
            </button>
          </div>
          {viewMode === 'my' && status === 'authenticated' && session?.user && (
            <div className="flex space-x-2" style={{ marginTop: '50px' }}>
              <button
                onClick={() => {
                  if (status === 'authenticated' && session?.user) {
                    setShowCreateForm(true);
                  } else {
                    alert('请先登录');
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                新建笔记
              </button>
              <button
                onClick={() => {
                  setIsMultiSelectMode(!isMultiSelectMode);
                  setSelectedNotes({});
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isMultiSelectMode 
                    ? 'bg-gray-600 text-white hover:bg-gray-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isMultiSelectMode ? '取消多选' : '多选'}
              </button>
              {isMultiSelectMode && Object.keys(selectedNotes).filter(id => selectedNotes[id]).length > 0 && (
                <button
                  onClick={() => {
                    const selectedCount = Object.keys(selectedNotes).filter(id => selectedNotes[id]).length;
                    if (confirm(`确定要删除选中的 ${selectedCount} 篇笔记吗？`)) {
                      handleBatchDeleteNotes();
                    }
                  }}
                  disabled={isDeleting}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? '删除中...' : '删除所选'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 搜索框 */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索笔记..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {isSearching && (
            <div className="absolute right-3 top-2.5">
              <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      {/* 显示笔记统计信息 */}
      {!searchQuery.trim() && pagination?.total > 0 && (
        <div className="mb-4 text-sm text-gray-600 note-count" data-notes-count={pagination?.total || 0} data-view-mode={viewMode}>
          共 {pagination?.total || 0} 篇{viewMode === 'my' ? '我的' : '公开'}笔记，第 {pagination?.page || 1} / {pagination?.totalPages || 1} 页
        </div>
      )}

      {/* 笔记列表 */}

      <div className="grid gap-6">
        {!displayNotes || displayNotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchQuery.trim() ? '没有找到相关笔记' : 
                viewMode === 'my' && status === 'authenticated' ? 
                  '还没有笔记，快去创建一个吧！' : 
                  '暂时没有公开笔记可以查看'
              }
            </p>
          </div>
        ) : (
          displayNotes.map((note) => (
            <div key={note.id || note._id} className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
              isMultiSelectMode && viewMode === 'my' ? 'border-2 ' + (selectedNotes[note.id || note._id || ''] ? 'border-blue-500' : 'border-transparent') : ''
            }`}>
              <div className="flex justify-between items-start mb-4">
                {isMultiSelectMode && viewMode === 'my' && (
                  <div className="mr-3 mt-1">
                    <input
                      type="checkbox"
                      checked={!!selectedNotes[note.id || note._id || '']}
                      onChange={(e) => {
                        const noteId = note.id || note._id || '';
                        setSelectedNotes(prev => ({
                          ...prev,
                          [noteId]: e.target.checked
                        }));
                      }}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link href={`/notes/${note.id || note._id}`} className="text-blue-600 hover:text-blue-800">
                      {note.title}
                    </Link>
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                    {note.category && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {note.category}
                      </span>
                    )}
                    {note.technology && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        {note.technology}
                      </span>
                    )}
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                    {note.author_name && (
                      <span>作者：{note.author_name}</span>
                    )}
                  </div>
                </div>
                {viewMode === 'my' && !isMultiSelectMode && (
                  <div className="flex space-x-2">
                    <Link 
                      href={`/notes/${note.id || note._id}/edit`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      编辑
                    </Link>
                    <button
                      onClick={() => {
                        // 优先使用数字ID，因为API期望数字ID
                        const numericId = note.id || (note._id ? parseInt(note._id.toString(), 10) : null);
                        if (numericId) {
                          handleDeleteNote(numericId.toString());
                        } else {
                          alert('无法删除笔记：无效的笔记ID');
                        }
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      删除
                    </button>
                  </div>
                )}
              </div>
              
              <div className="prose max-w-none mb-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {note.content.length > 200 ? note.content.substring(0, 200) + '...' : note.content}
                </ReactMarkdown>
              </div>

              {/* 标签 */}
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* 统计信息 */}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>👍 {note.likeCount || note.like_count || 0}</span>
                <span>🔖 {note.bookmarkCount || note.bookmark_count || 0}</span>
                <span>💬 {note.commentCount || note.comment_count || 0}</span>
                {note.isPublic && <span className="text-green-600">公开</span>}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 分页控件 */}
      {!searchQuery.trim() && (pagination?.totalPages || 0) > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange((pagination?.page || 1) - 1)}
            disabled={!(pagination?.hasPrev || false)}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              (pagination?.hasPrev || false)
                ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            上一页
          </button>
          
          {/* 页码 */}
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, pagination?.totalPages || 1) }, (_, i) => {
              let pageNum;
              const page = pagination?.page || 1;
              const totalPages = pagination?.totalPages || 1;
              
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pageNum === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => handlePageChange((pagination?.page || 1) + 1)}
            disabled={!(pagination?.hasNext || false)}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              (pagination?.hasNext || false)
                ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            下一页
          </button>
        </div>
      )}

      {/* 创建笔记表单模态框 */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">创建新笔记</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateNote} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
                  <input
                    type="text"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
                    <input
                      type="text"
                      value={newNote.category}
                      onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">技术栈</label>
                    <input
                      type="text"
                      value={newNote.technology}
                      onChange={(e) => setNewNote({ ...newNote, technology: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">子分类</label>
                  <input
                    type="text"
                    value={newNote.subcategory}
                    onChange={(e) => setNewNote({ ...newNote, subcategory: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">标签（用逗号分隔）</label>
                  <input
                    type="text"
                    value={newNote.tags}
                    onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    placeholder="例如：JavaScript, React, 前端"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">内容</label>
                  <MarkdownEditor
                    value={newNote.content}
                    onChange={(value) => setNewNote({ ...newNote, content: value })}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={newNote.isPublic}
                    onChange={(e) => setNewNote({ ...newNote, isPublic: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white"
                  />
                  <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-900">
                    公开笔记（其他用户可以查看）
                  </label>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    创建笔记
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}