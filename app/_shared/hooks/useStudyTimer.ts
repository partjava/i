'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@shared/hooks/useAuth';
import { message } from 'antd';

interface StudyTimerOptions {
  autoStart?: boolean;
  //
  category?: string;
  technology?: string;
}

interface StudyTimerResult {
  isActive: boolean;
  seconds: number;
  minutes: number;
  hours: number;
  totalSeconds: number;
  formattedTime: string;
  start: () => void;
  pause: () => void;
  reset: () => void;
  recordStudyTime: () => Promise<boolean>;
}

/**
 * 瀛︿範璁℃椂鍣℉ook
 * 鐢ㄤ簬璁板綍鐢ㄦ埛瀛︿範鏃堕棿
 */
export function useStudyTimer({
  autoStart = true,
  category = '',
  technology = ''
}: StudyTimerOptions = {}): StudyTimerResult {
  const { data: session } = useAuth();
  const [isActive, setIsActive] = useState(autoStart);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [lastRecordedTime, setLastRecordedTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const minRecordTime = 60;       // at least 1 minute before recording
  const autoRecordInterval = 60;  // auto-save every 60 seconds
  
  //
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  //
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  //
  const start = () => {
    if (!isActive) {
      setIsActive(true);
    }
  };
  
  //
  const pause = () => {
    if (isActive) {
      setIsActive(false);
    }
  };
  
  //
  const reset = () => {
    setIsActive(false);
    setTotalSeconds(0);
    setLastRecordedTime(0);
  };
  
  //
  const recordStudyTime = async (): Promise<boolean> => {
    //
    const unrecordedSeconds = totalSeconds - lastRecordedTime;
    const unrecordedMinutes = Math.floor(unrecordedSeconds / 60);
    
    //
    if (unrecordedSeconds < minRecordTime) {
      return false;
    }
    
    //
    if (!session?.user) {
      return false;
    }
    
    try {
      //
      let currentCategory = category;
      let currentTechnology = technology;
      let description = '';
      
      //
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        
        //
        if (path.includes('code-editor')) {
          //
          
          //
          const editorLanguage = localStorage.getItem('editor_language');
          if (editorLanguage && !currentTechnology) {
            currentTechnology = editorLanguage;
          }
        } else if (path.includes('notes')) {
          //
        } else if (path.includes('tutorial')) {
          //
        } else if (path.includes('challenge')) {
          //
        }
      }
      
      //
      if (!currentTechnology) currentTechnology = 'JavaScript';
      //
      
      //
      const response = await fetch('/api/study/sync-time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //
          category: currentCategory,
          technology: currentTechnology,
          description
        }),
      });
      
      if (!response.ok) {
        return false;
      }

      const data = await response.json();

      if (data.success) {
        setLastRecordedTime(totalSeconds);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  //
  useEffect(() => {
    //
    
    if (totalSeconds > 0 && totalSeconds % autoRecordInterval === 0 && totalSeconds > lastRecordedTime) {
      recordStudyTime().then(success => {
        if (success) {
        }
      });
    }
  }, [totalSeconds, lastRecordedTime]);
  
  //
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (totalSeconds > lastRecordedTime && totalSeconds - lastRecordedTime >= minRecordTime) {
        //
        const unrecordedSeconds = totalSeconds - lastRecordedTime;
        const unrecordedMinutes = Math.floor(unrecordedSeconds / 60);
        
        //
        //
        const currentCategory = category;
        let currentTechnology = technology || 'JavaScript';
        //

        //
        if (typeof window !== 'undefined') {
          const path = window.location.pathname;

          //
          if (path.includes('code-editor')) {
            //
            const editorLanguage = localStorage.getItem('editor_language');
            if (editorLanguage) currentTechnology = editorLanguage;
          }
        }

        //
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/study/sync-time', JSON.stringify({
            time: unrecordedMinutes > 0 ? unrecordedMinutes : 1,
            category: currentCategory,
            technology: currentTechnology,
            description: ''
          }));
        }
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      //
      recordStudyTime();
    };
  }, [totalSeconds, lastRecordedTime]);
  
  //
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds(prev => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);
  
  return {
    isActive,
    seconds,
    minutes,
    hours,
    totalSeconds,
    formattedTime,
    start,
    pause,
    reset,
    recordStudyTime
  };
}

