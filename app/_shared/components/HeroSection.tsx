'use client';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import BrandLogo from './BrandLogo';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-[520px] flex items-center justify-center overflow-hidden">
      {/* 素笺 / 墨砚统一背景 */}
      <div className="absolute inset-0 bg-surface-page" />

      {/* 内容区域 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        <div className={`transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {/* 印章装饰 - 八个不同颜色边框的斜置方块，两组之间拉开距离 */}
          <div className="mb-6 flex justify-center items-center gap-2.5 md:gap-4">
            {[
              { ch: '好', c: '#6366f1', r: -8 },
              { ch: '好', c: '#0ea5e9', r: 6 },
              { ch: '学', c: '#10b981', r: -5 },
              { ch: '习', c: '#f59e0b', r: 8 },
            ].map((it, i) => (
              <span
                key={'a' + i}
                className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 border-2 rounded-sm select-none font-bold text-lg md:text-2xl"
                style={{ fontFamily: 'serif', borderColor: it.c, color: it.c, transform: `rotate(${it.r}deg)` }}
              >
                {it.ch}
              </span>
            ))}
            <span className="w-6 md:w-12" aria-hidden="true" />
            {[
              { ch: '天', c: '#ef4444', r: -7 },
              { ch: '天', c: '#8b5cf6', r: 5 },
              { ch: '向', c: '#ec4899', r: -6 },
              { ch: '上', c: '#14b8a6', r: 7 },
            ].map((it, i) => (
              <span
                key={'b' + i}
                className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 border-2 rounded-sm select-none font-bold text-lg md:text-2xl"
                style={{ fontFamily: 'serif', borderColor: it.c, color: it.c, transform: `rotate(${it.r}deg)` }}
              >
                {it.ch}
              </span>
            ))}
          </div>

          {/* 主标题 - 飞逸水墨毛笔字 (使用原生透明无损 PNG 实现完美水墨渲染) */}
          <div className="flex justify-center mb-4">
            {mounted && (
              <BrandLogo
                variant="full"
                priority
                className="h-24 md:h-32 w-auto pointer-events-none select-none animate-[fadeIn_1.2s_ease-out]"
              />
            )}
          </div>

          {/* 动态打字效果（固定高度防抖动，垂直居中） */}
          <div className="text-2xl md:text-4xl font-semibold text-gray-600 mb-6 h-12 md:h-14 flex items-center justify-center">
            {mounted && (
              <TypeAnimation
                sequence={[
                  '让编程学习更有趣 🎮',
                  2000,
                  '让知识管理更高效 📚',
                  2000,
                  '让技能提升更快速 🚀',
                  2000,
                  '让AI助你成长 🤖',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            )}
          </div>

          {/* 描述文字 */}
          <p className={`text-lg md:text-xl text-gray-500 mb-8 max-w-3xl mx-auto transition-opacity duration-800 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            集成笔记管理、学习路径、编程挑战和AI助手的一站式学习平台
            <br />
            <span className="text-gray-700 font-semibold">让每一次学习都充满成就感</span>
          </p>

          {/* CTA按钮 */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-800 delay-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <Link
              href="/study"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              开始学习之旅 🚀
            </Link>
            <Link
              href="/challenges"
              className="px-8 py-4 bg-white/60 backdrop-blur-sm text-gray-700 rounded-full font-semibold text-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-gray-300 hover:border-indigo-500 hover:text-indigo-600"
            >
              挑战自我 💪
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
