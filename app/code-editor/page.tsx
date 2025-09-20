'use client';

import React from 'react';
import { Card } from 'antd';
import MonacoCodeEditor from '../components/MonacoCodeEditor';
import StudyTimeTracker from '../components/StudyTimeTracker';

export default function CodeEditorPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
            PartJava 在线代码编辑器
          </h1>
          <p className="text-base md:text-xl text-gray-600">
            专业级代码编辑器，支持语法高亮、智能补全、多主题
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* 学习时间追踪器 */}
          <div className="lg:col-span-1">
            <StudyTimeTracker 
              category="编程" 
              technology="代码编辑器" 
              autoStart={true}
              showControls={true}
              className="mb-4 sticky top-20"
            />
          </div>
          
          {/* PartJava 代码编辑器 */}
          <div className="lg:col-span-3">
            <MonacoCodeEditor height={typeof window !== 'undefined' && window.innerWidth < 768 ? "500px" : "700px"} />
          </div>
        </div>

        {/* 功能说明 */}
        <div className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          <Card className="text-center p-3 md:p-4">
            <div className="text-2xl md:text-3xl mb-2 md:mb-4">🎨</div>
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">语法高亮</h3>
            <p className="text-xs md:text-sm text-gray-600">
              VS Code 级别的语法高亮，支持多种编程语言
            </p>
          </Card>
          
          <Card className="text-center p-3 md:p-4">
            <div className="text-2xl md:text-3xl mb-2 md:mb-4">⚡</div>
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">智能补全</h3>
            <p className="text-xs md:text-sm text-gray-600">
              代码自动补全、错误检测、智能提示
            </p>
          </Card>
          
          <Card className="text-center p-3 md:p-4">
            <div className="text-2xl md:text-3xl mb-2 md:mb-4">🎯</div>
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">快捷键</h3>
            <p className="text-xs md:text-sm text-gray-600">
              Ctrl+Enter 运行、Ctrl+S 保存等快捷操作
            </p>
          </Card>
          
          <Card className="text-center p-3 md:p-4">
            <div className="text-2xl md:text-3xl mb-2 md:mb-4">💾</div>
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">多种操作</h3>
            <p className="text-xs md:text-sm text-gray-600">
              保存笔记、下载文件、复制分享、模板加载
            </p>
          </Card>
        </div>

        {/* 支持的语言 */}
        <div className="mt-6 md:mt-8">
          <Card className="p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-center">支持的编程语言</h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 text-center">
              {[
                { name: 'Python', icon: '🐍' },
                { name: 'JavaScript', icon: '🟨' },
                { name: 'Java', icon: '☕' },
                { name: 'C++', icon: '⚙️' },
                { name: 'Go', icon: '🐹' },
                { name: 'Rust', icon: '🦀' },
                { name: 'PHP', icon: '🐘' },
                { name: 'C#', icon: '🔷' },
                { name: 'TypeScript', icon: '🔷' },
                { name: 'C', icon: '⚡' }
              ].map((lang, index) => (
                <div key={index} className="p-2 md:p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg md:text-2xl mb-1 md:mb-2">{lang.icon}</div>
                  <div className="font-medium text-xs md:text-sm">{lang.name}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}