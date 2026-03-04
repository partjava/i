'use client';
import { useState } from 'react';

interface FlipCardProps {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  url: string;
  desc: string;
  color: string;
}

export default function FlipCard({ name, icon: Icon, url, desc, color }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // 移动端点击翻转，桌面端悬停翻转
  const handleInteraction = () => {
    if (window.innerWidth < 768) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      className="h-32"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => window.innerWidth >= 768 && setIsFlipped(true)}
      onMouseLeave={() => window.innerWidth >= 768 && setIsFlipped(false)}
      onClick={handleInteraction}
    >
      <div
        className="relative w-full h-full transition-transform duration-600"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* 正面 */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            // 移动端：如果卡片未翻转，先翻转而不跳转
            if (window.innerWidth < 768 && !isFlipped) {
              e.preventDefault();
            }
          }}
          className="absolute inset-0 flex items-center bg-white rounded-xl shadow-md hover:shadow-2xl transition-all p-4 border border-gray-100"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderTop: `3px solid ${color}`,
            zIndex: isFlipped ? 0 : 1
          }}
        >
          <Icon className="text-3xl mr-3 flex-shrink-0" style={{ color }} />
          <div className="min-w-0 flex-1">
            <div className="text-lg font-semibold mb-1 truncate" style={{ color }}>
              {name}
            </div>
            <div className="text-gray-600 text-sm line-clamp-2">{desc}</div>
          </div>
        </a>

        {/* 背面 - 也是可点击的链接 */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-2xl p-4 text-white"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            zIndex: isFlipped ? 1 : 0
          }}
        >
          <Icon className="text-5xl mb-3" style={{ color: 'white' }} />
          <div className="text-xl font-bold mb-2">{name}</div>
          <div className="text-sm text-center opacity-90 line-clamp-2">{desc}</div>
          <div className="mt-3 px-4 py-2 bg-white/20 rounded-full text-xs font-semibold">
            点击访问官网 →
          </div>
        </a>
      </div>
    </div>
  );
}
