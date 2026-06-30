'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@shared/hooks/useAuth';
import { usePathname } from 'next/navigation';

export default function LearningTracker() {
  const { data: session } = useAuth();
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const isActiveRef = useRef<boolean>(true);
  const lastActivityRef = useRef<number>(Date.now());
  const sessionIdRef = useRef<string>('');

  //
  useEffect(() => {
    sessionIdRef.current = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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

  // 页面切换时重置计时
  useEffect(() => {
    if (isActiveRef.current) {
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
    }
    startTimeRef.current = Date.now();
    lastActivityRef.current = Date.now();
    isActiveRef.current = true;
  }, [pathname]);
}

