'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@shared/hooks/useAuth';
import { usePathname } from 'next/navigation';

interface LearningSession {
  startTime: number;
  totalToday: number;
  lastSaved: number;
  lastActivity: number;
  currentCategory: string;
}

export default function PersistentLearningTracker() {
  const { data: session } = useAuth();
  const pathname = usePathname();
  const isActiveRef = useRef<boolean>(true);
  const [sessionData, setSessionData] = useState<LearningSession | null>(null);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  //
  const getTodayKey = () => {
    return new Date().toISOString().split('T')[0];
  };

  //
  useEffect(() => {
    if (!session?.user?.id) return;

    const todayKey = getTodayKey();
    const storageKey = `learning_session_${session.user.id}_${todayKey}`;
    
    try {
      const saved = localStorage.getItem(storageKey);
      const now = Date.now();
      
      if (saved) {
        const data = JSON.parse(saved) as LearningSession;
        //
        if (now - data.lastActivity < 12 * 60 * 60 * 1000) {
          setSessionData({
            ...data,
            //
            currentCategory: getPageCategory(pathname)
          });
          setIsVisible(true);
        } else {
          //
          createNewSession(now);
        }
      } else {
        //
        createNewSession(now);
      }
    } catch (error) {
      //
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

  //
  const saveSession = (data: LearningSession) => {
    if (!session?.user?.id) return;
    
    const todayKey = getTodayKey();
    const storageKey = `learning_session_${session.user.id}_${todayKey}`;
    
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      //
    }
  };

  //
  useEffect(() => {
    if (!sessionData) return;

    const timer = setInterval(() => {
      if (isActiveRef.current && sessionData) {
        const now = Date.now();
        const elapsed = Math.floor((now - sessionData.startTime) / 1000);
        setCurrentSeconds(elapsed);

        const updatedSession = {
          ...sessionData,
          lastActivity: now,
          currentCategory: getPageCategory(pathname)
        };
        setSessionData(updatedSession);
        saveSession(updatedSession);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionData]);

  const recordLearningTime = async (duration: number, category?: string) => {
    if (!session?.user?.id || duration < 60) return;

    try {
      const response = await fetch('/api/study/sync-time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          time: Math.floor(duration / 60),
          category: category || getPageCategory(pathname),
          page_url: pathname,
          session_id: `persistent_${session.user.id}_${getTodayKey()}`,
        }),
      });

      if (response.ok && sessionData) {
        const newTotal = sessionData.totalToday + Math.floor(duration / 60);
        const updatedSession = {
          ...sessionData,
          totalToday: newTotal,
          lastSaved: Date.now(),
        };
        setSessionData(updatedSession);
        saveSession(updatedSession);
        setCurrentSeconds(0);
      }
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
    isActiveRef.current = true;
  };

  //
  const checkIfActive = () => {
    if (!sessionData) return;
    
    const now = Date.now();
    //
    if (now - sessionData.lastActivity > 30000) {
      isActiveRef.current = false;
    }
  };

  //
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  //
  useEffect(() => {
    if (!sessionData) return;

    const handleBeforeUnload = () => {
      if (isActiveRef.current && currentSeconds > 60) {
        recordLearningTime(currentSeconds);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        //
        if (isActiveRef.current && currentSeconds > 60) {
          recordLearningTime(currentSeconds);
        }
      } else {
        //
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

    //
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, detectActivity, true);
    });

    //
    const activityInterval = setInterval(checkIfActive, 5000);
    
    //
    const saveInterval = setInterval(() => {
      if (isActiveRef.current && currentSeconds > 60) {
        recordLearningTime(currentSeconds);
      }
    }, 60000);

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

  //
  if (!session?.user?.id || !isVisible || !sessionData) {
    return null;
  }

  const totalTodayMinutes = sessionData.totalToday + Math.floor(currentSeconds / 60);

  return (
    <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-lg shadow-lg z-50 min-w-[140px]">
      <div className="flex items-center gap-2 text-sm">
        <div className={`w-2 h-2 rounded-full ${isActiveRef.current ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
        <span className="font-mono">{formatTime(currentSeconds)}</span>
      </div>
      <div className="text-xs text-blue-100 mt-1">
        今日: {totalTodayMinutes}分钟
      </div>
      <div className="text-xs text-blue-200">
        {getPageCategory(pathname)}
      </div>
    </div>
  );
} 

