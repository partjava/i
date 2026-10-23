'use client';
import { useState } from 'react';

interface ToolCardProps {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  url: string;
  desc: string;
  color: string;
}

export default function ToolCard({ name, icon: Icon, url, desc, color }: ToolCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleInteraction = () => {
    if (window.innerWidth < 768) {
      setIsFlipped(!isFlipped);
    }
  };

  // 纯黑/极深色图标在深灰金背景上自动提亮为暖银白，其余保持图标原本色彩，底座完全透明
  const isVeryDark = /^#(000000|181717|0A0A23|0F2B46|1C3C3C|02303A|03234B|1B1464|2C2C2C|2C2255|372923)$/i.test(color);
  const iconColor = isVeryDark ? '#F2E9DC' : color;

  return (
    <div
      className={`relative w-full aspect-square select-none ${isFlipped ? 'z-30' : 'z-10'}`}
      style={{ perspective: '950px' }}
      onMouseEnter={() => {
        if (window.innerWidth >= 768) {
          setIsFlipped(true);
        }
      }}
      onMouseLeave={() => {
        setIsFlipped(false);
      }}
      onClick={handleInteraction}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.48s cubic-bezier(0.22, 1, 0.36, 1)',
          transform: isFlipped
            ? 'rotateY(180deg) scale(1.15) translateY(-4px)'
            : 'rotateY(0deg) scale(1) translateY(0px)',
        }}
      >
        {/* 正面：透明玻璃质感底座 + 原色通透图标 + 名字 */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (window.innerWidth < 768 && !isFlipped) {
              e.preventDefault();
            }
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-2.5 py-3"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: '22px',
            background:
              'radial-gradient(circle at 50% 32%, rgba(212, 173, 114, 0.07) 0%, transparent 68%), linear-gradient(155deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%)',
            border: '1px solid rgba(242, 233, 220, 0.09)',
            boxShadow:
              '0 8px 20px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            gap: '10px',
            zIndex: isFlipped ? 0 : 1,
          }}
        >
          {/* 透明磨砂玻璃图标框（去掉彩色实心块） */}
          <div
            className="w-13 h-13 flex items-center justify-center flex-shrink-0"
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(242, 233, 220, 0.08)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
            }}
          >
            <Icon
              style={{
                color: iconColor,
                fontSize: 28,
                filter: `drop-shadow(0 2px 8px ${iconColor}40)`,
              }}
            />
          </div>

          {/* 软件名称 */}
          <span
            className="font-semibold text-[13px] leading-tight text-center truncate w-full px-1"
            style={{ color: '#F2E9DC' }}
          >
            {name}
          </span>
        </a>

        {/* 背面：翻转放大后的灰金正方形小窗口（浮在当前 App 上方，完整展示详细内容） */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex flex-col justify-between overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '20px',
            background: 'linear-gradient(165deg, #222834 0%, #151921 100%)',
            border: '1.5px solid rgba(212, 173, 114, 0.78)',
            boxShadow:
              '0 20px 42px rgba(0, 0, 0, 0.72), 0 0 22px rgba(212, 173, 114, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
            zIndex: isFlipped ? 1 : 0,
          }}
        >
          {/* 小窗口顶部标题栏 */}
          <div
            className="flex items-center justify-between px-2.5 py-1.5 border-b"
            style={{
              background: 'rgba(12, 15, 20, 0.65)',
              borderColor: 'rgba(242, 233, 220, 0.08)',
            }}
          >
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-400/85" />
              <span className="w-2 h-2 rounded-full bg-amber-400/85" />
              <span className="w-2 h-2 rounded-full bg-emerald-400/85" />
            </div>
            <span
              className="text-[10px] font-mono tracking-wider uppercase"
              style={{ color: '#67D9D2' }}
            >
              OPEN
            </span>
          </div>

          {/* 小窗口中部：软件名 + 完整详细内容 */}
          <div className="flex-1 flex flex-col items-center justify-center px-2.5 py-1 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1 w-full">
              <Icon className="flex-shrink-0" style={{ color: iconColor, fontSize: 15 }} />
              <span
                className="font-bold text-[13px] truncate"
                style={{ color: '#D4AD72' }}
              >
                {name}
              </span>
            </div>
            <p
              className="text-[11.5px] leading-[1.35] break-words line-clamp-3"
              style={{ color: '#F2E9DC' }}
            >
              {desc}
            </p>
          </div>

          {/* 小窗口底部：金色访问官网按钮 */}
          <div className="px-2.5 pb-2 flex justify-center">
            <span
              className="w-full py-1 rounded-full text-center font-semibold text-[11px] tracking-wide"
              style={{
                background: 'linear-gradient(135deg, #DFB980 0%, #C29656 100%)',
                color: '#121417',
                boxShadow: '0 4px 12px rgba(212, 173, 114, 0.35)',
              }}
            >
              访问官网 →
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
