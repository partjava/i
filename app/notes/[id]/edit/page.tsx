'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';

interface Note {
  _id: string;
  title: string;
  content: string;
  category: string;
  technology: string;
  subcategory: string;
  tags: string[];
  isPublic: boolean;
}

export default function EditNotePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // 检查登录状态
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // 获取笔记数据
  useEffect(() => {
    if (session && params.id) {
      fetchNote();
    }
  }, [session, params.id]);

  const fetchNote = async () => {
    try {
      const response = await fetch(`/api/notes/${params.id}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const noteData = await response.json();
        setNote(noteData.note); // 修复：API返回的是{note: ...}格式
      } else {
        setError('笔记不存在或无权限访问');
      }
    } catch (error) {
      setError('获取笔记失败');
      console.error('获取笔记失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note) return;

    setSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/notes/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(note),
      });

      if (response.ok) {
        router.push('/notes');
      } else {
        const data = await response.json();
        setError(data.error || '保存失败');
      }
    } catch (error) {
      setError('保存失败，请稍后重试');
      console.error('保存失败:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateNote = (field: keyof Note, value: any) => {
    if (!note) return;
    setNote({ ...note, [field]: value });
  };

  if (status === 'loading' || loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (error && !note) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={() => router.push('/notes')}
          className="mt-4 text-indigo-600 hover:text-indigo-800"
        >
          返回笔记列表
        </button>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="p-8">
        <div className="text-center text-gray-500">笔记不存在</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">编辑笔记</h1>
          <button
            onClick={() => router.push('/notes')}
            className="text-gray-600 hover:text-gray-800"
          >
            返回列表
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            {/* 标题 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                标题 *
              </label>
              <input
                type="text"
                required
                value={note.title}
                onChange={(e) => updateNote('title', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="请输入笔记标题"
              />
            </div>

            {/* 分类信息 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分类
                </label>
                <input
                  type="text"
                  value={note.category}
                  onChange={(e) => updateNote('category', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="如：计算机"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  技术
                </label>
                <input
                  type="text"
                  value={note.technology}
                  onChange={(e) => updateNote('technology', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="如：Python"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  子分类
                </label>
                <input
                  type="text"
                  value={note.subcategory}
                  onChange={(e) => updateNote('subcategory', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="如：基础语法"
                />
              </div>
            </div>

            {/* 标签 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                标签 (用逗号分隔)
              </label>
              <input
                type="text"
                value={(note.tags || []).join(', ')}
                onChange={(e) => updateNote('tags', e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="如：基础, 语法, 入门"
              />
            </div>

            {/* 内容 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                内容 *
              </label>
              <textarea
                required
                rows={15}
                value={note.content}
                onChange={(e) => updateNote('content', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="请输入笔记内容..."
              />
            </div>

            {/* 公开设置 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublic"
                checked={note.isPublic}
                onChange={(e) => updateNote('isPublic', e.target.checked)}
                className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublic" className="text-sm font-medium text-gray-700">
                公开笔记（其他用户可以查看）
              </label>
            </div>

            {/* 操作按钮 */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.push('/notes')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {saving ? '保存中...' : '保存修改'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}