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
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="rounded-3xl shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #1b2029 0%, #13171e 100%)',
          border: '1px solid rgba(212, 173, 114, 0.35)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.75)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{
            background: 'rgba(15, 18, 24, 0.85)',
            borderColor: 'rgba(242, 233, 220, 0.1)',
          }}
        >
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg font-bold" style={{ color: '#F2E9DC' }}>{group}</h3>
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{
                  color: '#D4AD72',
                  background: 'rgba(212, 173, 114, 0.16)',
                  border: '1px solid rgba(212, 173, 114, 0.35)',
                }}
              >
                {items.length}
              </span>
            </div>
            <p className="text-xs mt-1" style={{ color: 'rgba(242, 233, 220, 0.55)' }}>
              共 {items.length} 个工具 · 鼠标悬停翻转放大预览小窗口 · 点击访问官网
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full text-lg flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ color: '#F2E9DC' }}
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
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
