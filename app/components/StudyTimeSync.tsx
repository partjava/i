'use client';

import { useEffect, useState } from 'react';
import { message } from 'antd';
import { useSession } from 'next-auth/react';

/**
 * 学习时间同步组件
 * 用于监听页面上的学习时间，并同步到数据库
 */
export default function StudyTimeSync() {
  const { status } = useSession();
  const [syncing, setSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(0);
  
  // 定期同步学习时间
  useEffect(() => {
    if (status !== 'authenticated') return;
    
    // 初次加载时同步一次
    syncStudyTime();
    
    // 设置定时器，每15秒同步一次
    const timer = setInterval(() => {
      syncStudyTime();
    }, 15000);
    
    // 监听DOM变化，当学习时间更新时同步
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          // 检查是否有时间显示变化
          const timeElements = document.querySelectorAll('.study-time, .timer-display');
          if (timeElements && timeElements.length > 0) {
            syncStudyTime();
            break;
          }
        }
      }
    });
    
    // 开始观察文档变化
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
    
    // 页面关闭前同步一次
    window.addEventListener('beforeunload', syncStudyTime);
    
    return () => {
      clearInterval(timer);
      observer.disconnect();
      window.removeEventListener('beforeunload', syncStudyTime);
    };
  }, [status]);
  
  // 同步学习时间
  const syncStudyTime = async () => {
    if (syncing) return;
    
    try {
      setSyncing(true);
      
      // 尝试多种方式获取学习时间
      let currentMinutes = 0;
      
      // 方法1：查找特定的时间显示元素
      const timeElements = document.querySelectorAll('.study-time, .timer-display');
      // 使用Array.from转换NodeList为数组，避免TypeScript错误
      Array.from(timeElements).forEach(element => {
        const timeText = element.textContent || '';
        
        // 尝试匹配时间格式 (HH:MM:SS 或 MM:SS 或 XX分钟)
        const hourMinSecMatch = timeText.match(/(\d+):(\d+):(\d+)/);
        const minSecMatch = timeText.match(/(\d+):(\d+)/);
        const minutesMatch = timeText.match(/(\d+)\s*分钟/);
        
        if (hourMinSecMatch) {
          const hours = parseInt(hourMinSecMatch[1], 10);
          const minutes = parseInt(hourMinSecMatch[2], 10);
          const seconds = parseInt(hourMinSecMatch[3], 10);
          currentMinutes = hours * 60 + minutes + (seconds >= 30 ? 1 : 0); // 超过30秒算一分钟
          return false; // 相当于break
        } else if (minSecMatch) {
          const minutes = parseInt(minSecMatch[1], 10);
          const seconds = parseInt(minSecMatch[2], 10);
          currentMinutes = minutes + (seconds >= 30 ? 1 : 0); // 超过30秒算一分钟
          return false; // 相当于break
        } else if (minutesMatch) {
          currentMinutes = parseInt(minutesMatch[1], 10);
          return false; // 相当于break
        }
      });
      
      // 方法2：查找学习时间计时器
      if (currentMinutes === 0) {
        const timerElements = document.querySelectorAll('[data-study-time], [data-timer]');
        Array.from(timerElements).forEach(element => {
          const minutes = parseInt(element.getAttribute('data-study-time') || element.getAttribute('data-timer') || '0', 10);
          if (!isNaN(minutes) && minutes > 0) {
            currentMinutes = minutes;
            return false; // 相当于break
          }
        });
      }
      
      // 方法3：从文本内容中提取时间信息
      if (currentMinutes === 0) {
        const pageContent = document.body.textContent || '';
        
        // 尝试匹配"总学习时间：XX分钟"或"学习了XX分钟"
        const studyTimeMatch = pageContent.match(/总学习时间[：:]\s*(\d+)\s*分钟/) || 
                              pageContent.match(/学习了\s*(\d+)\s*分钟/);
        
        if (studyTimeMatch && studyTimeMatch[1]) {
          currentMinutes = parseInt(studyTimeMatch[1], 10);
        }
        
        // 尝试匹配"本次：HH:MM"格式
        const currentSessionMatch = pageContent.match(/本次[：:]\s*(\d+):(\d+)/);
        if (currentSessionMatch) {
          const minutes = parseInt(currentSessionMatch[1], 10);
          const seconds = parseInt(currentSessionMatch[2], 10);
          currentMinutes = minutes + (seconds >= 30 ? 1 : 0);
        }
      }
      
      // 方法4：查找计时器显示
      if (currentMinutes === 0) {
        const timerDisplays = document.querySelectorAll('.ant-statistic-content, .timer');
        Array.from(timerDisplays).forEach(display => {
          const timeText = display.textContent || '';
          const timeMatch = timeText.match(/(\d+):(\d+)/);
          if (timeMatch) {
            const minutes = parseInt(timeMatch[1], 10);
            const seconds = parseInt(timeMatch[2], 10);
            currentMinutes = minutes + (seconds >= 30 ? 1 : 0);
            return false; // 相当于break
          }
        });
      }
      
      // 如果找到了学习时间，同步到数据库
      // 任何超过5秒的学习时间都视为有效
      if (currentMinutes > 0 || (window as any).studyTimeSeconds > 5) {
        // 如果有秒数计时器但没有分钟，转换秒数为分钟
        if (currentMinutes === 0 && (window as any).studyTimeSeconds > 5) {
          currentMinutes = Math.ceil((window as any).studyTimeSeconds / 60);
        }
        
        // 确保至少有1分钟
        currentMinutes = Math.max(1, currentMinutes);
        
        // 只有当时间有变化时才同步
        if (currentMinutes > lastSyncTime) {
          console.log(`检测到${currentMinutes}分钟学习时间，同步到数据库...`);
          
          const response = await fetch('/api/study/sync-time', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              currentTime: currentMinutes
            }),
            credentials: 'include',
            cache: 'no-store'
          });
          
          if (!response.ok) {
            throw new Error(`同步学习时间失败: ${response.status}`);
          }
          
          const result = await response.json();
          console.log('同步学习时间结果:', result);
          
          if (result.added > 0) {
            message.success(`已同步${result.added}分钟学习时间`);
            setLastSyncTime(currentMinutes);
          }
        }
      }
    } catch (error) {
      console.error('同步学习时间失败:', error);
    } finally {
      setSyncing(false);
    }
  };
  
  // 此组件不渲染任何内容，只是在后台工作
  return null;
}