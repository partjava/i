'use client';

import { useState } from 'react';
import { Button, message, Popconfirm } from 'antd';
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';

export default function DevTools() {
  const [visible, setVisible] = useState(false);
  
  // 只在开发环境显示
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const clearAllCache = async () => {
    try {
      // 1. 清除 localStorage
      localStorage.clear();
      console.log('✅ localStorage 已清除');
      
      // 2. 清除 sessionStorage
      sessionStorage.clear();
      console.log('✅ sessionStorage 已清除');
      
      // 3. 清除所有 cookies
      document.cookie.split(";").forEach(function(c) {
        const cookieName = c.split('=')[0].trim();
        document.cookie = cookieName + "=;expires=" + new Date().toUTCString() + ";path=/";
      });
      console.log('✅ Cookies 已清除');
      
      // 4. 清除 Service Worker 缓存
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
        console.log('✅ Service Worker 已清除');
      }
      
      // 5. 清除 Cache Storage
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        console.log('✅ Cache Storage 已清除');
      }
      
      message.success('所有缓存已清除！页面将在3秒后刷新...');
      
      // 延迟刷新，让用户看到消息
      setTimeout(() => {
        window.location.href = window.location.href + '?nocache=' + Date.now();
      }, 3000);
      
    } catch (error) {
      console.error('清除缓存失败:', error);
      message.error('清除缓存失败，请手动刷新页面');
    }
  };

  const hardReload = () => {
    // 强制刷新（绕过缓存）
    window.location.href = window.location.href + '?t=' + Date.now();
  };

  return (
    <div 
      className="fixed bottom-20 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border-2 border-yellow-400"
      style={{ display: visible ? 'block' : 'none' }}
    >
      <div className="text-xs font-bold text-yellow-600 mb-2">🛠️ 开发工具</div>
      <div className="flex flex-col gap-2">
        <Popconfirm
          title="确定要清除所有缓存吗？"
          description="这将清除 localStorage、cookies、Service Worker 等所有缓存"
          onConfirm={clearAllCache}
          okText="确定"
          cancelText="取消"
        >
          <Button 
            size="small" 
            danger 
            icon={<DeleteOutlined />}
            block
          >
            清除所有缓存
          </Button>
        </Popconfirm>
        
        <Button 
          size="small" 
          icon={<ReloadOutlined />}
          onClick={hardReload}
          block
        >
          强制刷新
        </Button>
        
        <Button 
          size="small" 
          onClick={() => setVisible(false)}
          block
        >
          关闭
        </Button>
      </div>
    </div>
  );
}

// 添加快捷键触发
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  let keySequence = '';
  let timeout: NodeJS.Timeout;
  
  window.addEventListener('keydown', (e) => {
    clearTimeout(timeout);
    keySequence += e.key;
    
    // 输入 "dev" 显示开发工具
    if (keySequence.includes('dev')) {
      const devTools = document.querySelector('[data-dev-tools]') as HTMLElement;
      if (devTools) {
        devTools.style.display = devTools.style.display === 'none' ? 'block' : 'none';
      }
      keySequence = '';
    }
    
    // 2秒后重置
    timeout = setTimeout(() => {
      keySequence = '';
    }, 2000);
  });
}
