'use client';

import { useEffect, useState } from 'react';

export default function PWAProvider() {
  const [isOnline, setIsOnline] = useState(true);
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (process.env.NODE_ENV === 'production') {
        navigator.serviceWorker.register('/sw.js')
          .then(reg => console.log('Service Worker 注册成功:', reg))
          .catch(err => console.error('Service Worker 注册失败:', err));
      } else {
        // 开发环境中注销所有 Service Worker，防止旧缓存干扰
        navigator.serviceWorker.getRegistrations().then(regs => {
          regs.forEach(reg => reg.unregister());
          console.log('开发环境 - 已注销所有 Service Worker');
        });
      }
    }

    // 监听网络状态变化
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 初始化网络状态
    setIsOnline(navigator.onLine);

    // 监听PWA安装提示
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 监听PWA安装成功
    const handleAppInstalled = () => {
      console.log('PWA 安装成功');
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // 显示更新通知
  const showUpdateNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('应用更新', {
        body: '有新版本可用，请刷新页面获取最新功能',
        icon: '/icons/icon-192x192.png',
      });
    }
  };

  // 安装PWA
  const installPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('用户选择:', outcome);
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  // 请求通知权限
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };

  return (
    <>
      {/* 网络状态指示器 */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white text-center py-2 text-sm">
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728" />
            </svg>
            网络连接中断，正在离线模式运行
          </div>
        </div>
      )}

      {/* PWA安装提示 */}
      {isInstallable && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50">
          <div className="bg-white rounded-lg shadow-lg border p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-gray-900">
                  安装到桌面
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  将应用添加到主屏幕，获得更好的体验
                </p>
                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={installPWA}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    安装
                  </button>
                  <button
                    onClick={() => setIsInstallable(false)}
                    className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 通知权限请求 */}
      {typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default' && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-40">
          <div className="bg-white rounded-lg shadow-lg border p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 19l-7-7 7-7m0 14V5" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-gray-900">
                  开启通知
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  接收学习提醒和重要通知
                </p>
                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={requestNotificationPermission}
                    className="text-sm bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700 transition-colors"
                  >
                    允许
                  </button>
                  <button
                    onClick={() => {/* 隐藏通知 */}}
                    className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    稍后
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 