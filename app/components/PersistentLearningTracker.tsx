'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

interface LearningSession {
  startTime: number;
  totalToday: number;
  lastSaved: number;
  lastActivity: number;
  currentCategory: string;
}

export default function PersistentLearningTracker() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isActiveRef = useRef<boolean>(true);
  const [sessionData, setSessionData] = useState<LearningSession | null>(null);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // 获取今天的日期字符串
  const getTodayKey = () => {
    return new Date().toISOString().split('T')[0];
  };

  // 初始化或恢复学习会话
  useEffect(() => {
    if (!session?.user?.id) return;

    const todayKey = getTodayKey();
    const storageKey = `learning_session_${session.user.id}_${todayKey}`;
    
    try {
      const saved = localStorage.getItem(storageKey);
      const now = Date.now();
      
      if (saved) {
        const data = JSON.parse(saved) as LearningSession;
        // 检查是否是今天的数据且在合理时间内（不超过12小时无活动）
        if (now - data.lastActivity < 12 * 60 * 60 * 1000) {
          setSessionData({
            ...data,
            startTime: now, // 重新开始当前会话计时
            lastActivity: now,
            currentCategory: getPageCategory(pathname)
          });
          setIsVisible(true);
        } else {
          // 创建新的会话
          createNewSession(now);
        }
      } else {
        // 创建新的会话
        createNewSession(now);
      }
    } catch (error) {
      console.error('恢复学习会话失败:', error);
      createNewSession(Date.now());
    }
  }, [session, pathname]);

  const createNewSession = (now: number) => {
    const newSession: LearningSession = {
      startTime: now,
      totalToday: 0,
      lastSaved: now,
      lastActivity: now,
      currentCategory: getPageCategory(pathname)
    };
    setSessionData(newSession);
    setIsVisible(true);
  };

  // 保存会话数据到localStorage
  const saveSession = (data: LearningSession) => {
    if (!session?.user?.id) return;
    
    const todayKey = getTodayKey();
    const storageKey = `learning_session_${session.user.id}_${todayKey}`;
    
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('保存学习会话失败:', error);
    }
  };

  // 实时更新计时器
  useEffect(() => {
    if (!sessionData) return;

    const timer = setInterval(() => {
      if (isActiveRef.current && sessionData) {
        const now = Date.now();
        const elapsed = Math.floor((now - sessionData.startTime) / 1000);
        setCurrentSeconds(elapsed);

        // 只在必要时更新会话数据（避免过度更新）
        if (elapsed % 10 === 0) { // 每10秒更新一次localStorage
          const updatedSession = {
            ...sessionData,
            lastActivity: now,
            currentCategory: getPageCategory(pathname)
          };
          setSessionData(updatedSession);
          saveSession(updatedSession);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionData?.startTime, pathname]); // 只依赖startTime，避免无限更新

  // 记录学习时间到数据库
  const recordLearningTime = async (duration: number, category?: string) => {
    if (!session?.user?.id || duration < 60) return;

    try {
      const response = await fetch('/api/user/track-learning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          duration: Math.floor(duration / 60), // 转换为分钟
          category: category || getPageCategory(pathname),
          page_url: pathname,
          session_id: `persistent_${session.user.id}_${getTodayKey()}`,
        }),
      });

      if (response.ok && sessionData) {
        // 更新今日总时长
        const newTotal = sessionData.totalToday + Math.floor(duration / 60);
        const updatedSession = {
          ...sessionData,
          totalToday: newTotal,
          lastSaved: Date.now(),
          startTime: Date.now() // 重新开始计时
        };
        setSessionData(updatedSession);
        saveSession(updatedSession);
        setCurrentSeconds(0);
      }
    } catch (error) {
      console.error('记录学习时间失败:', error);
    }
  };

  // 根据路径判断学习类别
  const getPageCategory = (path: string): string => {
    if (path.includes('/study/')) {
      const parts = path.split('/');
      if (parts[2]) return parts[2];
    }
    if (path.includes('/notes')) return 'notes';
    if (path.includes('/profile')) return 'profile';
    return 'general';
  };

  // 检测用户活动
  const detectActivity = () => {
    isActiveRef.current = true;
    // 不在这里更新sessionData，只在定时器中更新
  };

  // 检查用户是否活跃
  const checkIfActive = () => {
    if (!sessionData) return;
    
    const now = Date.now();
    // 如果超过30秒没有活动，认为用户不活跃
    if (now - sessionData.lastActivity > 30000) {
      isActiveRef.current = false;
    }
  };

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 设置事件监听器
  useEffect(() => {
    if (!sessionData) return;

    const handleBeforeUnload = () => {
      if (isActiveRef.current && currentSeconds > 60) {
        recordLearningTime(currentSeconds);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // 页面隐藏时记录时间
        if (isActiveRef.current && currentSeconds > 60) {
          recordLearningTime(currentSeconds);
        }
      } else {
        // 页面显示时更新活动时间
        isActiveRef.current = true;
        if (sessionData) {
          const updatedSession = {
            ...sessionData,
            lastActivity: Date.now()
          };
          setSessionData(updatedSession);
          saveSession(updatedSession);
        }
      }
    };

    // 监听活动事件
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, detectActivity, true);
    });

    // 定期检查活跃状态
    const activityInterval = setInterval(checkIfActive, 5000);
    
    // 定期保存学习进度（每2分钟）
    const saveInterval = setInterval(() => {
      if (isActiveRef.current && currentSeconds > 60) {
        recordLearningTime(currentSeconds);
      }
    }, 120000); // 2分钟

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, detectActivity, true);
      });
      clearInterval(activityInterval);
      clearInterval(saveInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [sessionData, currentSeconds]);

  // 只在登录状态下显示
  if (!session?.user?.id || !isVisible || !sessionData) {
    return null;
  }

  const totalTodayMinutes = sessionData.totalToday + Math.floor(currentSeconds / 60);

  return (
    <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-lg shadow-lg z-50 min-w-[140px]">
      <div className="flex items-center gap-2 text-sm">
        <div className={`w-2 h-2 rounded-full ${isActiveRef.current ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
        <span>本次: {formatTime(currentSeconds)}</span>
      </div>
      <div className="text-xs text-blue-100 mt-1">
        今日: {totalTodayMinutes}分钟 · {sessionData.currentCategory}
      </div>
      <div className="text-xs text-blue-200">
        {isActiveRef.current ? '学习中' : '暂停'}
      </div>
    </div>
  );
} 