'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function RealTimeLearningTracker() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const isActiveRef = useRef<boolean>(true);
  const lastActivityRef = useRef<number>(Date.now());
  const sessionIdRef = useRef<string>('');
  const [currentSessionSeconds, setCurrentSessionSeconds] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // 生成会话ID
  useEffect(() => {
    sessionIdRef.current = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // 实时更新计时器
  useEffect(() => {
    const timer = setInterval(() => {
      if (isActiveRef.current) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setCurrentSessionSeconds(elapsed);
        setIsVisible(elapsed > 5); // 5秒后显示计时器
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 记录学习时间到数据库
  const recordLearningTime = async (duration: number, category?: string) => {
    if (!session?.user?.id || duration < 60) return; // 少于1分钟不记录

    try {
      await fetch('/api/user/track-learning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          duration: Math.floor(duration / 60), // 转换为分钟
          category: category || getPageCategory(pathname),
          page_url: pathname,
          session_id: sessionIdRef.current,
        }),
      });
    } catch (error) {
      console.error('记录学习时间失败:', error);
    }
  };

  // 根据路径判断学习类别
  const getPageCategory = (path: string): string => {
    if (path.includes('/study/')) {
      const parts = path.split('/');
      if (parts[2]) return parts[2]; // 返回学习类别，如 cpp, java, ai 等
    }
    if (path.includes('/notes')) return 'notes';
    if (path.includes('/profile')) return 'profile';
    return 'general';
  };

  // 检测用户活动
  const detectActivity = () => {
    lastActivityRef.current = Date.now();
    isActiveRef.current = true;
  };

  // 检查用户是否活跃
  const checkIfActive = () => {
    const now = Date.now();
    // 如果超过30秒没有活动，认为用户不活跃
    if (now - lastActivityRef.current > 30000) {
      isActiveRef.current = false;
    }
  };

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 页面变化时记录之前页面的学习时间
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isActiveRef.current) {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        recordLearningTime(duration);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // 页面隐藏时记录时间
        if (isActiveRef.current) {
          const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
          recordLearningTime(duration);
        }
      } else {
        // 页面显示时重新开始计时
        startTimeRef.current = Date.now();
        lastActivityRef.current = Date.now();
        isActiveRef.current = true;
        setCurrentSessionSeconds(0);
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
      if (isActiveRef.current) {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        if (duration > 60) { // 至少1分钟才保存
          recordLearningTime(duration);
          startTimeRef.current = Date.now(); // 重新开始计时
          setCurrentSessionSeconds(0);
        }
      }
    }, 120000); // 2分钟

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      // 清理
      events.forEach(event => {
        document.removeEventListener(event, detectActivity, true);
      });
      clearInterval(activityInterval);
      clearInterval(saveInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // 组件卸载时记录时间
      if (isActiveRef.current) {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        recordLearningTime(duration);
      }
    };
  }, [pathname, session]);

  // 路径变化时记录之前的学习时间并重新开始
  useEffect(() => {
    if (isActiveRef.current) {
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (duration > 60) { // 超过1分钟才记录
        recordLearningTime(duration);
      }
    }
    startTimeRef.current = Date.now();
    lastActivityRef.current = Date.now();
    isActiveRef.current = true;
    setCurrentSessionSeconds(0);
  }, [pathname]);

  // 只在登录状态下显示
  if (!session?.user?.id || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-lg shadow-lg z-50">
      <div className="flex items-center gap-2 text-sm">
        <div className={`w-2 h-2 rounded-full ${isActiveRef.current ? 'bg-green-400' : 'bg-gray-400'}`}></div>
        <span>学习中: {formatTime(currentSessionSeconds)}</span>
      </div>
      <div className="text-xs text-blue-100 mt-1">
        {getPageCategory(pathname)} · {isActiveRef.current ? '活跃' : '暂停'}
      </div>
    </div>
  );
} 