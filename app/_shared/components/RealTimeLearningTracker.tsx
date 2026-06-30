'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@shared/hooks/useAuth';
import { usePathname } from 'next/navigation';

export default function RealTimeLearningTracker() {
  const { data: session } = useAuth();
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const isActiveRef = useRef<boolean>(true);
  const lastActivityRef = useRef<number>(Date.now());
  const sessionIdRef = useRef<string>('');
  const [currentSessionSeconds, setCurrentSessionSeconds] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  //
  useEffect(() => {
    sessionIdRef.current = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // 计时器 - 每秒更新当前会话时间
  useEffect(() => {
    const timer = setInterval(() => {
      if (isActiveRef.current) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setCurrentSessionSeconds(elapsed);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  //
  const recordLearningTime = async (duration: number, category?: string) => {
    //
    try {
      await fetch('/api/study/sync-time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          time: Math.floor(duration / 60),
          category: category || getPageCategory(pathname),
          page_url: pathname,
          session_id: sessionIdRef.current,
        }),
      });
    } catch (error) {
      //
    }
  };

  //
  const getPageCategory = (path: string): string => {
    if (path.includes('/study/')) {
      const parts = path.split('/');
      if (parts[2]) return parts[2];
    }
    if (path.includes('/notes')) return 'notes';
    if (path.includes('/profile')) return 'profile';
    return 'general';
  };

  //
  const detectActivity = () => {
    lastActivityRef.current = Date.now();
    isActiveRef.current = true;
  };

  //
  const checkIfActive = () => {
    const now = Date.now();
    //
    if (now - lastActivityRef.current > 30000) {
      isActiveRef.current = false;
    }
  };

  //
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  //
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isActiveRef.current) {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        recordLearningTime(duration);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        //
        if (isActiveRef.current) {
          const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
          recordLearningTime(duration);
        }
      } else {
        //
        lastActivityRef.current = Date.now();
        isActiveRef.current = true;
        setCurrentSessionSeconds(0);
      }
    };

    //
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, detectActivity, true);
    });

    //
    const activityInterval = setInterval(checkIfActive, 5000);
    
    //
    const saveInterval = setInterval(() => {
      if (isActiveRef.current) {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        recordLearningTime(duration);
      }
    }, 60000);

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      //
      events.forEach(event => {
        document.removeEventListener(event, detectActivity, true);
      });
      clearInterval(activityInterval);
      clearInterval(saveInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      //
      if (isActiveRef.current) {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        recordLearningTime(duration);
      }
    };
  }, [pathname, session]);

  //
  useEffect(() => {
    if (isActiveRef.current) {
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
    }
    startTimeRef.current = Date.now();
    lastActivityRef.current = Date.now();
    isActiveRef.current = true;
    setCurrentSessionSeconds(0);
  }, [pathname]);

  //
  if (!session?.user?.id || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-lg shadow-lg z-50">
      <div className="flex items-center gap-2 text-sm">
        <div className={`w-2 h-2 rounded-full ${isActiveRef.current ? 'bg-green-400' : 'bg-gray-400'}`}></div>
        <span className="font-mono">{formatTime(currentSessionSeconds)}</span>
      </div>
      <div className="text-xs text-blue-100 mt-1">
        {getPageCategory(pathname)}
      </div>
    </div>
  );
} 

