'use client';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import InkWashDecoration from './InkWashDecoration';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-[560px] flex items-center justify-center overflow-hidden">
      {/* 水墨宣纸底色 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0e8] via-[#f0ebe0] to-[#ebe5d8]" />

      {/* 远山层叠 - 极淡 */}
      <div className="absolute inset-0 opacity-20">
        <InkWashDecoration variant="landscape" height={560} className="absolute inset-0 w-full h-full" />
      </div>

      {/* 云雾缭绕 */}
      <div className="absolute inset-0 opacity-15">
        <InkWashDecoration variant="mist" height={560} className="absolute inset-0 w-full h-full" />
      </div>

      {/* 飞鸟点缀 */}
      <div className="absolute top-10 right-0 w-1/3 opacity-25">
        <InkWashDecoration variant="birds" height={200} />
      </div>

      {/* 墨竹侧边 */}
      <div className="absolute left-0 top-0 bottom-0 w-24 opacity-15">
        <InkWashDecoration variant="bamboo" height={560} />
      </div>

      {/* 内容区域 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className={`transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {/* 印章装饰 */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 border-2 border-red-700/60 rounded-sm flex items-center justify-center rotate-6">
              <span className="text-red-700/70 text-2xl font-bold font-serif" style={{ fontFamily: 'serif' }}>学</span>
            </div>
          </div>

          {/* 主标题 - 水墨黑金 */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide">
            <span className="text-gray-800">
              Part
              <span className="text-red-700">Java</span>
            </span>
          </h1>

          {/* 动态打字效果 */}
          <div className="text-2xl md:text-4xl font-semibold text-gray-600 mb-8 h-20">
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
          <p className={`text-lg md:text-xl text-gray-500 mb-10 max-w-3xl mx-auto transition-opacity duration-800 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            集成笔记管理、学习路径、编程挑战和AI助手的一站式学习平台
            <br />
            <span className="text-gray-700 font-semibold">让每一次学习都充满成就感</span>
          </p>

          {/* CTA按钮 - 水墨风格 */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-800 delay-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <Link
              href="/study"
              className="px-8 py-4 bg-gray-800 text-[#f0ebe0] rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-gray-700 border border-gray-600"
            >
              开始学习之旅 🚀
            </Link>
            <Link
              href="/challenges"
              className="px-8 py-4 bg-transparent text-gray-700 rounded-full font-semibold text-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-gray-400 hover:border-gray-600"
            >
              挑战自我 💪
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
