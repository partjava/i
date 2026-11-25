'use client';

import React from 'react';
import { useLocale, UI_DICT } from '../lib/i18n';

export default function SiteFooter({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const brand = UI_DICT[locale].footer.brand;
  return (
    <footer
      className={`w-full py-6 px-4 text-center text-xs text-content-muted select-none ${className}`}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {/* 版权信息 */}
        <span>© {new Date().getFullYear()} {brand}</span>
        <span className="hidden sm:inline text-line-strong">|</span>

        {/* 工信部 ICP 备案 */}
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-brand-primary transition-colors underline-offset-4 hover:underline"
        >
          鄂ICP备2025101495号-4
        </a>
        <span className="hidden sm:inline text-line-strong">|</span>

        {/* 全国公安机关互联网站安全管理服务平台备案 */}
        <a
          href="https://beian.mps.gov.cn/#/query/webSearch?code=42110002000517"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-brand-primary transition-colors underline-offset-4 hover:underline"
        >
          <img
            src="/images/beian-icon.png"
            alt="全国公安机关网络安全管理服务平台"
            className="w-4 h-4 object-contain shrink-0"
          />
          <span>鄂公网安备42110002000517号</span>
        </a>
      </div>
    </footer>
  );
}
