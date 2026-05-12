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
        {/* 正面 - 宣纸风格 */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (window.innerWidth < 768 && !isFlipped) {
              e.preventDefault();
            }
          }}
          className="absolute inset-0 flex items-center rounded-xl shadow-md hover:shadow-2xl transition-all p-4 border border-[#d4c8b8]"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #faf6f0 0%, #f5efe6 30%, #faf6f0 60%, #f3ede2 100%)',
            borderTop: `3px solid ${color}`,
            zIndex: isFlipped ? 0 : 1
          }}
        >
          {/* 宣纸纹理 */}
          <div 
            className="absolute inset-0 rounded-xl opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='12' cy='18' r='0.6'/%3E%3Ccircle cx='35' cy='42' r='0.5'/%3E%3Ccircle cx='8' cy='55' r='0.4'/%3E%3Ccircle cx='48' cy='12' r='0.5'/%3E%3Ccircle cx='28' cy='30' r='0.6'/%3E%3Ccircle cx='52' cy='38' r='0.4'/%3E%3Ccircle cx='18' cy='8' r='0.5'/%3E%3Ccircle cx='42' cy='55' r='0.6'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '120px 120px',
            }}
          />
          <Icon className="text-3xl mr-3 flex-shrink-0 relative z-10" style={{ color }} />
          <div className="min-w-0 flex-1 relative z-10">
            <div className="text-lg font-semibold mb-1 truncate text-gray-800">
              {name}
            </div>
            <div className="text-gray-500 text-sm line-clamp-2">{desc}</div>
          </div>
        </a>

        {/* 背面 - 水墨山水风格 */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl shadow-2xl p-4 text-white overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #5c4033 0%, #4a3728 50%, #3d2e20 100%)',
            zIndex: isFlipped ? 1 : 0
          }}
        >
          {/* 背面水墨山峰装饰 */}
          <svg className="absolute bottom-0 left-0 w-full h-2/5 opacity-20" viewBox="0 0 200 100" preserveAspectRatio="none">
            <path d="M0 100 L0 70 Q30 30 60 50 Q90 70 110 40 Q135 60 160 35 Q185 50 200 55 L200 100 Z" fill="white" />
          </svg>
          <Icon className="text-5xl mb-3 relative z-10" style={{ color: 'white' }} />
          <div className="text-xl font-bold mb-2 relative z-10">{name}</div>
          <div className="text-sm text-center opacity-90 line-clamp-2 relative z-10">{desc}</div>
          <div className="mt-3 px-4 py-2 bg-white/15 rounded-full text-xs font-semibold relative z-10 border border-white/20">
            点击访问官网 →
          </div>
        </a>
      </div>
    </div>
  );
}
