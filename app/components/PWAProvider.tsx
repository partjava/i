'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

export default function PWAProvider() {
  const [isOnline, setIsOnline] = useState(true);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showNotifyPrompt, setShowNotifyPrompt] = useState(false);
  const deferredRef = useRef<any>(null);

  const installPWA = useCallback(async () => {
    const prompt = deferredRef.current;
    if (prompt) {
      prompt.prompt();
      await prompt.userChoice;
      deferredRef.current = null;
      setIsInstallable(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (process.env.NODE_ENV === 'production') {
        navigator.serviceWorker.register('/sw.js')
          .catch(() => {});
      } else {
        navigator.serviceWorker.getRegistrations().then(regs => {
          regs.forEach(reg => reg.unregister());
        });
      }
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredRef.current = e;
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      deferredRef.current = null;
      setIsInstallable(false);
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    const handleManualInstall = () => {
      if (deferredRef.current) {
        installPWA();
      } else if (window.matchMedia('(display-mode: standalone)').matches) {
        alert('应用已安装，可以直接从桌面打开');
      } else {
        alert('您的浏览器暂不支持一键安装，请使用浏览器菜单中的"添加到主屏幕"功能');
      }
    };
    window.addEventListener('pwa-install-request', handleManualInstall);

    // 延迟显示通知提示
    const savedNotify = localStorage.getItem('notify_prompt_dismissed');
    if (!savedNotify && 'Notification' in window && Notification.permission === 'default') {
      setTimeout(() => setShowNotifyPrompt(true), 5000);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('pwa-install-request', handleManualInstall);
    };
  }, [installPWA]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };

  return (
    <>
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white text-center py-2 text-sm">
          网络连接中断，正在离线模式运行
        </div>
      )}

      {isInstallable && (
        <div className="fixed bottom-6 right-6 md:w-80 z-[60]">
          <div className="bg-white rounded-lg shadow-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900">安装到桌面</h3>
              <button onClick={() => setIsInstallable(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-3">将应用添加到主屏幕，获得更好的体验</p>
            <button onClick={installPWA} className="w-full text-sm bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors">
              安装
            </button>
          </div>
        </div>
      )}

      {showNotifyPrompt && (
        <div className="fixed bottom-6 right-6 md:w-80 z-50">
          <div className="bg-white rounded-lg shadow-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900">开启通知</h3>
              <button onClick={() => { setShowNotifyPrompt(false); localStorage.setItem('notify_prompt_dismissed', '1'); }} className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-3">接收学习提醒和重要通知</p>
            <div className="flex space-x-2">
              <button onClick={requestNotificationPermission} className="flex-1 text-sm bg-yellow-600 text-white px-3 py-2 rounded-md hover:bg-yellow-700 transition-colors">
                允许
              </button>
              <button onClick={() => { setShowNotifyPrompt(false); localStorage.setItem('notify_prompt_dismissed', '1'); }} className="text-sm bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors">
                稍后
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
