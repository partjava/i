'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function CompositionCPUPage() {
  const [activeTab, setActiveTab] = useState('知识讲解');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">中央处理器（CPU）</h1>

      {/* 顶部Tab栏 */}
      <div className="flex space-x-4 mb-8">
        {['知识讲解', '例题解析', '小结与思考题'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 知识讲解 */}
      {activeTab === '知识讲解' && (
        <div className="space-y-6">
          {/* CPU结构与功能 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">CPU结构与功能</h2>
            <div className="flex flex-col md:flex-row items-center md:space-x-8">
              {/* SVG结构图 */}
              <svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 md:mb-0">
                {/* 控制器 */}
                <rect x="40" y="40" width="80" height="60" fill="#FEF9C3" stroke="#F59E42" strokeWidth="2"/>
                <text x="80" y="75" textAnchor="middle" fontSize="16" fill="#B45309">控制器</text>
                {/* 运算器 */}
                <rect x="160" y="40" width="80" height="60" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2"/>
                <text x="200" y="75" textAnchor="middle" fontSize="16" fill="#3730A3">运算器</text>
                {/* 寄存器组 */}
                <rect x="280" y="40" width="80" height="60" fill="#F0FDF4" stroke="#22C55E" strokeWidth="2"/>
                <text x="320" y="75" textAnchor="middle" fontSize="16" fill="#166534">寄存器组</text>
                {/* 总线 */}
                <rect x="100" y="120" width="220" height="10" fill="#A7F3D0" stroke="#059669" strokeWidth="2"/>
                <text x="210" y="115" textAnchor="middle" fontSize="12" fill="#059669">内部总线</text>
                {/* 连接线 */}
                <line x1="120" y1="70" x2="160" y2="70" stroke="#2563EB" strokeWidth="2"/>
                <line x1="240" y1="70" x2="280" y2="70" stroke="#2563EB" strokeWidth="2"/>
                <line x1="200" y1="100" x2="200" y2="120" stroke="#059669" strokeWidth="2"/>
                <line x1="320" y1="100" x2="320" y2="120" stroke="#059669" strokeWidth="2"/>
                <line x1="80" y1="100" x2="80" y2="120" stroke="#059669" strokeWidth="2"/>
              </svg>
              {/* 结构说明 */}
              <div className="flex-1">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>控制器：</strong> 负责指令译码、发出控制信号，协调各部件工作。</li>
                  <li><strong>运算器：</strong> 执行算术和逻辑运算。</li>
                  <li><strong>寄存器组：</strong> 存放操作数、中间结果和控制信息。</li>
                  <li><strong>内部总线：</strong> 连接各部件，实现数据和信号的传递。</li>
                </ul>
              </div>
            </div>
          </div>
          {/* 指令周期与流水线 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">指令周期与流水线原理</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>指令周期：</strong> 包括取指、译码、执行、访存、写回等阶段。</li>
              <li><strong>流水线：</strong> 将指令周期各阶段重叠，提高CPU吞吐率。</li>
              <li>典型五级流水线：取指（IF）、译码（ID）、执行（EX）、访存（MEM）、写回（WB）。</li>
              <li>流水线的瓶颈：结构冒险、数据冒险、控制冒险。</li>
            </ul>
          </div>
        </div>
      )}

      {/* 例题解析 */}
      {activeTab === '例题解析' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">例题1：CPU结构分析</h2>
            <p className="mb-2">请简述CPU的基本组成及各部分的主要功能。</p>
            <p><strong>解答：</strong> CPU由控制器、运算器、寄存器组和内部总线组成。控制器负责指令控制，运算器执行运算，寄存器组存储数据和中间结果，总线实现数据传递。</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">例题2：流水线效率</h2>
            <p className="mb-2">简述流水线的优点和常见瓶颈。</p>
            <p><strong>解答：</strong> 流水线可提高CPU吞吐率，但会遇到结构冒险、数据冒险和控制冒险等瓶颈，需要通过硬件和编译器优化解决。</p>
          </div>
        </div>
      )}

      {/* 小结与思考题 */}
      {activeTab === '小结与思考题' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">小结</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>掌握CPU的基本组成及各部件功能</li>
              <li>理解指令周期和流水线的基本原理</li>
              <li>熟悉流水线的优势与常见瓶颈</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">思考题</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>请画出CPU内部结构示意图，并简要说明各部件作用。</li>
              <li>简述流水线的五个阶段及其作用。</li>
              <li>举例说明数据冒险和控制冒险的产生原因及解决方法。</li>
            </ol>
          </div>
        </div>
      )}

      {/* 底部导航 */}
      <div className="flex justify-between mt-8">
        <Link href="/study/composition/io" className="text-blue-500 hover:underline">上一页：总线与输入输出</Link>
        <Link href="/study/composition/performance" className="text-blue-500 hover:underline">下一页：系统性能与优化</Link>
      </div>
    </div>
  );
} 