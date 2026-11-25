'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export default function PWAProvider() {
  const pathname = usePathname();
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
      // 本次访问或历史上已关闭过就不再弹出
      if (
        sessionStorage.getItem('pwa_install_dismissed') === '1' ||
        localStorage.getItem('pwa_install_dismissed') === '1'
      ) return;
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

  const isFocusedWorkspace = Boolean(
    pathname?.startsWith('/study') ||
    pathname?.startsWith('/code') ||
    pathname?.startsWith('/challenges') ||
    pathname?.startsWith('/admin')
  );

  return (
    <>
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white text-center py-2 text-sm">
          网络连接中断，正在离线模式运行
        </div>
      )}

      {isInstallable && !isFocusedWorkspace && (
        <div className="fixed bottom-6 right-6 md:w-80 z-[60]">
          <div className="bg-surface-raised text-content-primary rounded-2xl shadow-xl border border-line-strong p-4">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-sm font-semibold text-content-primary">安装桌面应用</h3>
              <button
                onClick={() => {
                  setIsInstallable(false);
                  try {
                    sessionStorage.setItem('pwa_install_dismissed', '1');
                    localStorage.setItem('pwa_install_dismissed', '1');
                  } catch {}
                }}
                className="text-content-muted hover:text-content-primary p-1 rounded-lg transition-colors"
                aria-label="关闭安装提示"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-content-secondary mb-3">将 禾硙 Unolgy 添加到主屏幕，获得沉浸学习体验</p>
            <button onClick={installPWA} className="w-full text-xs font-semibold bg-brand-primary text-content-inverse px-3 py-2 rounded-xl hover:bg-brand-hover transition-[transform,background-color] duration-150 active:scale-[0.97]">
              立即安装
            </button>
          </div>
        </div>
      )}

      {showNotifyPrompt && !isFocusedWorkspace && (
        <div className="fixed bottom-6 right-6 md:w-80 z-50">
          <div className="bg-surface-raised text-content-primary rounded-2xl shadow-xl border border-line-strong p-4">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-sm font-semibold text-content-primary">开启学习提醒</h3>
              <button onClick={() => { setShowNotifyPrompt(false); localStorage.setItem('notify_prompt_dismissed', '1'); }} className="text-content-muted hover:text-content-primary p-1 rounded-lg transition-colors" aria-label="关闭通知提示">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-content-secondary mb-3">接收打卡提醒与关卡评测通知</p>
            <div className="flex space-x-2">
              <button onClick={requestNotificationPermission} className="flex-1 text-xs font-semibold bg-brand-primary text-content-inverse px-3 py-2 rounded-xl hover:bg-brand-hover transition-[transform,background-color] duration-150 active:scale-[0.97]">
                允许
              </button>
              <button onClick={() => { setShowNotifyPrompt(false); localStorage.setItem('notify_prompt_dismissed', '1'); }} className="text-xs font-medium bg-surface-muted text-content-secondary px-3 py-2 rounded-xl hover:text-content-primary transition-colors">
                稍后
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
