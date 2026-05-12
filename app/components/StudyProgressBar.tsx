'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

function useStudyCompletion() {
  const [completed, setCompleted] = useState(false);
  const [categoryProgress, setCategoryProgress] = useState({ total: 0, done: 0 });
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const loadFromServer = useCallback(async () => {
    const path = pathname;
    if (!path) return;
    try {
      const res = await fetch('/api/study/progress');
      if (!res.ok) return;
      const data = await res.json();
      const progress: Record<string, boolean> = data.progress || {};
      setCompleted(!!progress[path]);

      Object.entries(progress).forEach(([key, val]) => {
        if (val) localStorage.setItem('study_completed_' + key, '1');
        else localStorage.removeItem('study_completed_' + key);
      });

      const category = path.split('/study/')[1]?.split('/')[0];
      if (category) {
        const prefix = '/study/' + category + '/';
        const keys = Object.keys(progress).filter(k => k.startsWith(prefix));
        const done = keys.filter(k => progress[k]).length;
        setCategoryProgress({ total: keys.length, done });
      }
    } catch {}
  }, [pathname]);

  // 每次路由变化时重新加载
  useEffect(() => {
    setCompleted(false);
    setCategoryProgress({ total: 0, done: 0 });
    loadFromServer();
  }, [loadFromServer]);

  const toggleComplete = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const newCompleted = !completed;
    setCompleted(newCompleted);
    if (newCompleted) {
      localStorage.setItem('study_completed_' + pathname, '1');
      setCategoryProgress(prev => ({ ...prev, done: prev.done + 1 }));
    } else {
      localStorage.removeItem('study_completed_' + pathname);
      setCategoryProgress(prev => ({ ...prev, done: Math.max(0, prev.done - 1) }));
    }
    try {
      await fetch('/api/study/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pagePath: pathname, completed: newCompleted }),
      });
    } catch {}
    setLoading(false);
  }, [completed, loading, pathname]);

  return { completed, toggleComplete, categoryProgress };
}

export function StudyProgressBar() {
  const { completed, toggleComplete, categoryProgress } = useStudyCompletion();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-30">
      {collapsed ? (
        <button
          onClick={() => setCollapsed(false)}
          className="bg-white rounded-full shadow-lg border border-gray-200 w-11 h-11 flex items-center justify-center hover:shadow-xl transition-shadow"
          title="学习进度"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </button>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex flex-col gap-3 min-w-[200px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">学习进度</span>
            <button onClick={() => setCollapsed(true)} className="text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        <button
          onClick={toggleComplete}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
            completed
              ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
              : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
          }`}
        >
          {completed ? (
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span>{completed ? '已完成' : '标记完成'}</span>
        </button>

        {categoryProgress.total > 0 && (
          <div className="px-1">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>当前分类进度</span>
              <span>{categoryProgress.done}/{categoryProgress.total}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-400 rounded-full transition-all duration-500"
                style={{ width: `${categoryProgress.total > 0 ? Math.round((categoryProgress.done / categoryProgress.total) * 100) : 0}%` }}
              />
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
}
