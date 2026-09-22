'use client';
import { useState } from 'react';

interface ToolCardProps {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  url: string;
  desc: string;
  color: string;
}

/* 有机流体形状（border-radius 百分比组合），悬停时在两组形状间流动变形 */
const BLOB_REST = '58% 42% 46% 54% / 46% 58% 42% 54%';
const BLOB_HOVER = '44% 56% 58% 42% / 56% 44% 56% 44%';
const BLOB_BACK = '50% 50% 44% 56% / 54% 46% 58% 42%';

export default function ToolCard({ name, icon: Icon, url, desc, color }: ToolCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleInteraction = () => {
    if (window.innerWidth < 768) {
      setIsFlipped(!isFlipped);
    }
  };

  const frontRadius = hovered ? BLOB_HOVER : BLOB_REST;

  return (
    <div
      className="w-full aspect-square"
      style={{ perspective: '800px' }}
      onMouseEnter={() => { if (window.innerWidth >= 768) { setIsFlipped(true); setHovered(true); } }}
      onMouseLeave={() => { setIsFlipped(false); setHovered(false); }}
      onClick={handleInteraction}
      title={desc}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* 正面 - 流体 blob（浅色），固定尺寸（148px），所有文件夹图标大小一致 */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (window.innerWidth < 768 && !isFlipped) {
              e.preventDefault();
            }
          }}
          className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-1"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: frontRadius,
            background: `radial-gradient(circle at 72% 18%, ${color}1f, transparent 52%), linear-gradient(155deg, #ffffff 0%, #f3f6fb 100%)`,
            border: '1px solid rgba(15,23,42,0.06)',
            boxShadow: hovered
              ? `0 10px 28px ${color}33, 0 2px 6px rgba(15,23,42,0.06)`
              : '0 3px 12px rgba(15,23,42,0.07)',
            gap: '8px',
            zIndex: isFlipped ? 0 : 1
          }}
        >
          <div
            className="w-12 h-12 flex items-center justify-center transition-transform duration-500"
            style={{
              borderRadius: '50%',
              background: `${color}1a`,
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            <Icon style={{ color, fontSize: 26 }} />
          </div>
          <span
            className="font-semibold text-gray-800 truncate w-full text-center px-2 text-[13px]"
          >
            {name}
          </span>
        </a>

        {/* 背面 - 水墨深色 blob */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex flex-col items-center justify-center text-white overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: BLOB_BACK,
            background: 'linear-gradient(215deg, #0C1F3D 0%, #1a2d4a 55%, #0C1F3D 100%)',
            boxShadow: '0 6px 20px rgba(12,31,61,0.35)',
            gap: '6px',
            zIndex: isFlipped ? 1 : 0
          }}
        >
          <svg className="absolute bottom-0 left-0 w-full h-2/5 opacity-20" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 100 L0 70 Q30 30 60 50 Q90 70 110 40 Q135 60 160 35 Q185 50 200 55 L200 100 Z" fill="white" />
          </svg>
          <Icon className="relative" style={{ color: 'white', fontSize: 30 }} />
          <span
            className="relative font-bold truncate w-full text-center px-2 text-[13px]"
          >
            {name}
          </span>
          <span
            className="relative bg-white/15 rounded-full border border-white/20 whitespace-nowrap text-xs"
            style={{ padding: '0.3em 0.9em' }}
          >
            访问官网 →
          </span>
        </a>
      </div>
    </div>
  );
}
