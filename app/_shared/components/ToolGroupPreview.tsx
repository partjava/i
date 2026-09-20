'use client';
import { useEffect } from 'react';
import FlipCard from './FlipCard';

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
  onClose: () => void;
}

export default function ToolGroupPreview({ group, items, brandColors, onClose }: ToolGroupPreviewProps) {
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
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-surface-page dark:bg-page-dark rounded-2xl shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line-strong bg-white dark:bg-gray-800 flex-shrink-0">
          <div>
            <h3 className="text-lg font-bold text-content-primary">{group}</h3>
            <p className="text-xs text-content-muted mt-0.5">共 {items.length} 个工具 · 悬停翻转查看详情 · 点击访问官网</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-content-secondary text-xl flex items-center justify-center transition-colors"
            aria-label="关闭"
          >
            ✕
          </button>
        </div>

        {/* 工具大卡片网格 */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {items.map(item => {
              const Icon = item.icon;
              return (
                <FlipCard
                  key={item.name}
                  name={item.name}
                  icon={Icon}
                  url={item.url}
                  desc={item.desc}
                  color={brandColors[item.name] || '#3B82F6'}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
