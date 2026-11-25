'use client';
import { useEffect } from 'react';
import ToolCard from './ToolCard';

interface ToolItem {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  url: string;
  desc: string;
}

interface ToolGroupPreviewProps {
  group: string;
  items: ToolItem[];
  brandColors: Record<string, string>;
  isDark?: boolean;
  onVisit?: (name: string) => void;
  onClose: () => void;
}

export default function ToolGroupPreview({ group, items, brandColors, isDark = true, onVisit, onClose }: ToolGroupPreviewProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      data-tool-group-modal
      className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 backdrop-blur-md ${
        isDark ? 'bg-black/70' : 'bg-[#0F1D33]/40'
      }`}
      onClick={onClose}
    >
      <div
        className="rounded-3xl shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col overflow-hidden transition-colors"
        style={{
          background: isDark
            ? 'linear-gradient(160deg, #1b2029 0%, #13171e 100%)'
            : 'linear-gradient(160deg, #FFFFFF 0%, #F4F6FA 100%)',
          border: isDark
            ? '1px solid rgba(212, 173, 114, 0.35)'
            : '1px solid rgba(15, 29, 51, 0.14)',
          boxShadow: isDark
            ? '0 24px 64px rgba(0, 0, 0, 0.75)'
            : '0 24px 64px rgba(15, 29, 51, 0.18)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{
            background: isDark ? 'rgba(15, 18, 24, 0.85)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: isDark ? 'rgba(242, 233, 220, 0.1)' : 'rgba(15, 29, 51, 0.08)',
          }}
        >
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg font-bold" style={{ color: isDark ? '#F2E9DC' : '#0F1D33' }}>{group}</h3>
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{
                  color: isDark ? '#D4AD72' : '#1B3B6F',
                  background: isDark ? 'rgba(212, 173, 114, 0.16)' : '#EEF2F8',
                  border: isDark ? '1px solid rgba(212, 173, 114, 0.35)' : '1px solid rgba(27, 59, 111, 0.18)',
                }}
              >
                {items.length}
              </span>
            </div>
            <p className="text-xs mt-1" style={{ color: isDark ? 'rgba(242, 233, 220, 0.6)' : '#42526B' }}>
              共 {items.length} 个工具 · 鼠标悬停翻转放大预览小窗口 · 点击访问官网
            </p>
          </div>
          <button
            onClick={onClose}
            className={`w-9 h-9 rounded-full text-lg flex items-center justify-center transition-colors ${
              isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
            }`}
            style={{ color: isDark ? '#F2E9DC' : '#0F1D33' }}
            aria-label="关闭"
          >
            ✕
          </button>
        </div>

        {/* 桌面图标网格 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {items.map(item => {
              const Icon = item.icon;
              return (
                <ToolCard
                  key={item.name}
                  name={item.name}
                  icon={Icon}
                  url={item.url}
                  desc={item.desc}
                  color={brandColors[item.name] || '#3B82F6'}
                  isDark={isDark}
                  onVisit={onVisit}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
