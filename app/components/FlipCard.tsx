'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  url: string;
  desc: string;
  color: string;
}

export default function FlipCard({ name, icon: Icon, url, desc, color }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 h-32"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 正面 */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center bg-white rounded-xl shadow-md hover:shadow-2xl transition-all p-4 border border-gray-100"
          style={{ 
            backfaceVisibility: 'hidden',
            borderTop: `3px solid ${color}`
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

        {/* 背面 */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-2xl p-4 text-white"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <Icon className="text-5xl mb-3" style={{ color: 'white' }} />
          <div className="text-xl font-bold mb-2">{name}</div>
          <div className="text-sm text-center opacity-90">{desc}</div>
          <div className="mt-3 px-4 py-2 bg-white/20 rounded-full text-xs font-semibold">
            点击访问官网
          </div>
        </div>
      </motion.div>
    </div>
  );
}
