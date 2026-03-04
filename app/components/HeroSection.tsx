'use client';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 渐变背景动画 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-gradient-shift"></div>
      
      {/* 内容区域 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className={`transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {/* 主标题 */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              PartJava
            </span>
          </h1>
          
          {/* 动态打字效果 */}
          <div className="text-2xl md:text-4xl font-semibold text-gray-700 mb-8 h-20">
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
          <p className={`text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto transition-opacity duration-800 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            集成笔记管理、学习路径、编程挑战和AI助手的一站式学习平台
            <br />
            <span className="text-purple-600 font-semibold">让每一次学习都充满成就感</span>
          </p>
          
          {/* CTA按钮 */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-800 delay-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <Link
              href="/study"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              开始学习之旅 🚀
            </Link>
            <Link
              href="/challenges"
              className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-purple-600"
            >
              挑战自我 💪
            </Link>
          </div>
        </div>
        
        {/* 装饰元素 */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
}
