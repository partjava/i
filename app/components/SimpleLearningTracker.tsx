'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function SimpleLearningTracker() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [todayTotal, setTodayTotal] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const lastActivityRef = useRef<number>(Date.now());

  // 获取今天的存储key
  const getTodayKey = () => {
    const today = new Date().toISOString().split('T')[0];
    return `learning_${session?.user?.id}_${today}`;
  };

  // 初始化 - 从localStorage恢复今日总时长
  useEffect(() => {
    if (!session?.user?.id) return;
    
    try {
      const saved = localStorage.getItem(getTodayKey());
      if (saved) {
        setTodayTotal(parseInt(saved) || 0);
      }
      
      // 恢复最小化状态
      const minimized = localStorage.getItem('learning_tracker_minimized');
      setIsMinimized(minimized === 'true');
    } catch (error) {
      console.error('恢复数据失败:', error);
    }
  }, [session]);

  // 主计时器 - 每秒更新
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTimeRef.current) / 1000);
      setSeconds(elapsed);

      // 检查是否还活跃（30秒内有活动）
      const timeSinceActivity = now - lastActivityRef.current;
      setIsActive(timeSinceActivity < 30000);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 保存学习时间到数据库 - 带重试机制
  const saveToDatabase = async (minutes: number, retries: number = 3) => {
    if (!session?.user?.id || minutes < 1) return;

    // 更新今日总时长（无论API是否成功）
    const newTotal = todayTotal + minutes;
    setTodayTotal(newTotal);
    localStorage.setItem(getTodayKey(), newTotal.toString());

    // 只在学习时间超过3分钟时才调用API
    if (minutes < 3) {
      startTimeRef.current = Date.now();
      setSeconds(0);
      return;
    }

    // 重试机制
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch('/api/user/track-learning', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            activity: `学习${minutes}分钟`,
            points: Math.floor(minutes / 5), // 每5分钟1积分
            category: getPageCategory(pathname),
          }),
        });

        if (response.ok) {
          console.log('学习记录保存成功');
          break;
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.warn(`保存学习记录失败 (尝试 ${attempt}/${retries}):`, errorData.error || '未知错误');
          
          if (attempt < retries) {
            // 等待后重试
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }
        }
      } catch (error) {
        console.error(`保存学习记录失败 (尝试 ${attempt}/${retries}):`, error);
        
        if (attempt < retries) {
          // 等待后重试
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }

    // 重置计时器
    startTimeRef.current = Date.now();
    setSeconds(0);
  };

  // 自动保存 - 每5分钟，减少频率
  useEffect(() => {
    const saveTimer = setInterval(() => {
      if (isActive && seconds >= 300) { // 5分钟才保存
        const minutes = Math.floor(seconds / 60);
        saveToDatabase(minutes);
      }
    }, 300000); // 5分钟

    return () => clearInterval(saveTimer);
  }, [isActive, seconds, todayTotal]);

  // 获取页面类别
  const getPageCategory = (path: string): string => {
    if (path.includes('/study/')) {
      const parts = path.split('/');
      return parts[2] || 'study';
    }
    if (path.includes('/notes')) return 'notes';
    if (path.includes('/profile')) return 'profile';
    return 'general';
  };

  // 活动检测
  const handleActivity = () => {
    lastActivityRef.current = Date.now();
    setIsActive(true);
  };

  // 格式化时间
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 页面切换时保存
  useEffect(() => {
    return () => {
      if (isActive && seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        saveToDatabase(minutes);
      }
    };
  }, [pathname]);

  // 设置事件监听
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    const handleUnload = () => {
      if (isActive && seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        // 同步保存（可能不完全可靠，但尽力而为）
        navigator.sendBeacon('/api/user/track-learning', JSON.stringify({
          duration: minutes,
          category: getPageCategory(pathname),
          page_url: pathname,
        }));
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [isActive, seconds, pathname]);

  // 切换最小化状态
  const toggleMinimized = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    localStorage.setItem('learning_tracker_minimized', newState.toString());
    if (newState) {
      setIsExpanded(false);
    }
  };

  // 只在登录时显示
  if (!session?.user?.id) return null;

  const currentMinutes = Math.floor(seconds / 60);
  const displayTotal = todayTotal + currentMinutes;

  // 完全隐藏状态
  if (isMinimized) {
    return (
      <button
        onClick={toggleMinimized}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-200"
        title="显示学习追踪"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* 简化版 */}
      {!isExpanded && (
        <div 
          className="bg-blue-500 text-white rounded-lg shadow-lg cursor-pointer hover:bg-blue-600 transition-all duration-200"
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex items-center gap-2 px-3 py-2">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-mono">{formatTime(seconds)}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMinimized();
              }}
              className="text-blue-200 hover:text-white ml-1"
              title="隐藏"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 展开版 */}
      {isExpanded && (
        <div className="bg-blue-500 text-white rounded-lg shadow-lg min-w-[160px]">
          <div className="px-3 py-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm font-mono">本次: {formatTime(seconds)}</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-blue-200 hover:text-white"
                  title="折叠"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={toggleMinimized}
                  className="text-blue-200 hover:text-white"
                  title="隐藏"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="text-xs text-blue-100">
              今日: {displayTotal}分钟 · {getPageCategory(pathname)}
            </div>
            <div className="text-xs text-blue-200 mt-1">
              {isActive ? '学习中' : '暂停中'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 