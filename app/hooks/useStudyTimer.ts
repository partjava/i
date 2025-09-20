'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { message } from 'antd';

interface StudyTimerOptions {
  autoStart?: boolean;
  minRecordTime?: number; // 最小记录时间（秒）
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
 * 学习计时器Hook
 * 用于记录用户学习时间
 */
export function useStudyTimer({
  autoStart = true,
  minRecordTime = 60, // 默认最小记录时间为60秒
  category = '',
  technology = ''
}: StudyTimerOptions = {}): StudyTimerResult {
  const { data: session } = useSession();
  const [isActive, setIsActive] = useState(autoStart);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [lastRecordedTime, setLastRecordedTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // 计算时、分、秒
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  // 格式化时间显示
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // 开始计时
  const start = () => {
    if (!isActive) {
      setIsActive(true);
    }
  };
  
  // 暂停计时
  const pause = () => {
    if (isActive) {
      setIsActive(false);
    }
  };
  
  // 重置计时器
  const reset = () => {
    setIsActive(false);
    setTotalSeconds(0);
    setLastRecordedTime(0);
  };
  
  // 记录学习时间到服务器
  const recordStudyTime = async (): Promise<boolean> => {
    // 计算未记录的时间（分钟）
    const unrecordedSeconds = totalSeconds - lastRecordedTime;
    const unrecordedMinutes = Math.floor(unrecordedSeconds / 60);
    
    // 如果未记录的时间小于最小记录时间，则不记录
    if (unrecordedSeconds < minRecordTime) {
      console.log(`学习时间太短（${unrecordedSeconds}秒），不记录`);
      return false;
    }
    
    // 如果没有登录，则不记录
    if (!session?.user) {
      console.log('用户未登录，不记录学习时间');
      return false;
    }
    
    try {
      // 获取当前页面的信息作为学习内容
      let currentCategory = category;
      let currentTechnology = technology;
      let description = '';
      
      // 尝试从URL获取更多上下文
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        
        // 根据路径确定学习内容
        if (path.includes('code-editor')) {
          description = '使用代码编辑器';
          
          // 尝试获取当前编辑器的语言
          const editorLanguage = localStorage.getItem('editor_language');
          if (editorLanguage && !currentTechnology) {
            currentTechnology = editorLanguage;
          }
        } else if (path.includes('notes')) {
          description = '学习笔记';
        } else if (path.includes('tutorial')) {
          description = '学习教程';
        } else if (path.includes('challenge')) {
          description = '编程挑战';
        }
      }
      
      if (!currentCategory) currentCategory = '编程';
      if (!currentTechnology) currentTechnology = 'JavaScript';
      if (!description) description = `在线学习 ${currentTechnology || currentCategory}`;
      
      // 调用API记录学习时间
      const response = await fetch('/api/study/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studyTime: unrecordedMinutes > 0 ? unrecordedMinutes : 1, // 至少记录1分钟
          category: currentCategory,
          technology: currentTechnology,
          description
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API错误: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // 更新最后记录的时间
        setLastRecordedTime(totalSeconds);
        console.log(`成功记录学习时间: ${unrecordedMinutes}分钟`);
        return true;
      } else {
        throw new Error(data.error || '记录失败');
      }
    } catch (error) {
      console.error('记录学习时间失败:', error);
      message.error('记录学习时间失败，请稍后再试');
      return false;
    }
  };
  
  // 定期记录学习时间（每10分钟）
  useEffect(() => {
    const autoRecordInterval = 10 * 60; // 10分钟
    
    if (totalSeconds > 0 && totalSeconds % autoRecordInterval === 0 && totalSeconds > lastRecordedTime) {
      recordStudyTime().then(success => {
        if (success) {
          console.log('自动记录学习时间成功');
        }
      });
    }
  }, [totalSeconds, lastRecordedTime]);
  
  // 页面卸载前记录学习时间
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (totalSeconds > lastRecordedTime && totalSeconds - lastRecordedTime >= minRecordTime) {
        // 在页面卸载前同步记录学习时间
        const unrecordedSeconds = totalSeconds - lastRecordedTime;
        const unrecordedMinutes = Math.floor(unrecordedSeconds / 60);
        
        // 获取当前页面的信息作为学习内容
        let currentCategory = category || '编程';
        let currentTechnology = technology || 'JavaScript';
        let description = `在线学习 ${currentTechnology || currentCategory}`;
        
        // 尝试从URL获取更多上下文
        if (typeof window !== 'undefined') {
          const path = window.location.pathname;
          
          // 根据路径确定学习内容
          if (path.includes('code-editor')) {
            description = '使用代码编辑器';
            const editorLanguage = localStorage.getItem('editor_language');
            if (editorLanguage) currentTechnology = editorLanguage;
          }
        }
        
        // 使用同步的navigator.sendBeacon API
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/study/record', JSON.stringify({
            studyTime: unrecordedMinutes > 0 ? unrecordedMinutes : 1,
            category: currentCategory,
            technology: currentTechnology,
            description
          }));
        }
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // 组件卸载时也记录学习时间
      recordStudyTime();
    };
  }, [totalSeconds, lastRecordedTime]);
  
  // 计时器逻辑
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
