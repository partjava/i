'use client';

import { useEffect, useState } from 'react';
import { message } from 'antd';
import { useSession } from 'next-auth/react';

/**
 * 笔记同步组件
 * 用于监听页面上的笔记数量，并同步到数据库
 */
export default function NotesSync() {
  const { status } = useSession();
  const [syncing, setSyncing] = useState(false);
  
  // 定期检查笔记数量并同步
  useEffect(() => {
    if (status !== 'authenticated') return;
    
    // 初次加载时同步一次
    syncNotesCount();
    
    // 设置定时器，每30秒同步一次
    const timer = setInterval(() => {
      syncNotesCount();
    }, 30000);
    
    // 监听DOM变化，当有新笔记添加时同步
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          // 检查是否有笔记数量变化
          const noteItems = document.querySelectorAll('.note-item');
          if (noteItems && noteItems.length > 0) {
            syncNotesCount();
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
    
    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [status]);
  
  // 同步笔记数量
  const syncNotesCount = async () => {
    if (syncing) return;
    
    try {
      setSyncing(true);
      
      // 尝试多种方式获取笔记数量
      let notesCount = 0;
      
      // 方法1：查找特定的笔记数量元素，但仅在"我的笔记"视图下
      const notesCountElement = document.querySelector('.note-count');
      if (notesCountElement) {
        // 检查是否在"我的笔记"视图
        const viewMode = notesCountElement.getAttribute('data-view-mode');
        if (viewMode === 'my') {
          const count = parseInt(notesCountElement.textContent || '0', 10);
          if (!isNaN(count) && count > 0) {
            notesCount = count;
          }
        } else {
          console.log('当前不是"我的笔记"视图，跳过从note-count元素提取笔记数量');
        }
      }
      
      // 方法2：计算笔记元素的数量
      if (notesCount === 0) {
        const noteItems = document.querySelectorAll('.note-item');
        if (noteItems && noteItems.length > 0) {
          notesCount = noteItems.length;
        }
      }
      
      // 方法3：从文本内容中提取笔记数量 - 但仅在"我的笔记"视图下
      if (notesCount === 0) {
        // 检查当前是否在"我的笔记"视图
        const isMyNotesView = document.querySelector('h1')?.textContent?.includes('我的笔记') || false;
        
        // 只有在"我的笔记"视图下才从文本中提取数量
        if (isMyNotesView) {
          const pageContent = document.body.textContent || '';
          const match = pageContent.match(/共\s*(\d+)\s*篇笔记/);
          if (match && match[1]) {
            const count = parseInt(match[1], 10);
            if (!isNaN(count) && count > 0) {
              notesCount = count;
            }
          }
        } else {
          console.log('当前不是"我的笔记"视图，跳过从文本中提取笔记数量');
        }
      }
      
      // 如果找到了笔记数量，同步到数据库
      if (notesCount > 0) {
        console.log(`检测到${notesCount}条笔记，同步到数据库...`);
        
        const response = await fetch('/api/user/sync-notes-count', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            totalNotes: notesCount
          }),
          credentials: 'include',
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error(`同步笔记数量失败: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('同步笔记数量结果:', result);
        
        if (result.added > 0) {
          message.success(`已同步${result.added}条笔记数据`);
        }
      }
    } catch (error) {
      console.error('同步笔记数量失败:', error);
    } finally {
      setSyncing(false);
    }
  };
  
  // 此组件不渲染任何内容，只是在后台工作
  return null;
}
