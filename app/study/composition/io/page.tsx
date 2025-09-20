'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function CompositionIOPage() {
  const [activeTab, setActiveTab] = useState('知识讲解');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">总线与输入输出</h1>

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
          {/* 总线结构与分类 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">总线结构与分类</h2>
            <div className="flex flex-col md:flex-row items-center md:space-x-8">
              {/* SVG结构图 */}
              <svg width="400" height="120" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 md:mb-0">
                {/* CPU */}
                <rect x="20" y="40" width="60" height="40" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2"/>
                <text x="50" y="65" textAnchor="middle" fontSize="16" fill="#3730A3">CPU</text>
                {/* 存储器 */}
                <rect x="320" y="40" width="60" height="40" fill="#F0FDF4" stroke="#22C55E" strokeWidth="2"/>
                <text x="350" y="65" textAnchor="middle" fontSize="16" fill="#166534">存储器</text>
                {/* I/O设备 */}
                <rect x="170" y="80" width="60" height="30" fill="#FEF9C3" stroke="#F59E42" strokeWidth="2"/>
                <text x="200" y="100" textAnchor="middle" fontSize="14" fill="#B45309">I/O设备</text>
                {/* 总线 */}
                <rect x="100" y="55" width="200" height="10" fill="#A7F3D0" stroke="#059669" strokeWidth="2"/>
                <text x="200" y="52" textAnchor="middle" fontSize="12" fill="#059669">系统总线</text>
                {/* 连接线 */}
                <line x1="80" y1="60" x2="100" y2="60" stroke="#2563EB" strokeWidth="2"/>
                <line x1="300" y1="60" x2="320" y2="60" stroke="#2563EB" strokeWidth="2"/>
                <line x1="200" y1="65" x2="200" y2="80" stroke="#F59E42" strokeWidth="2"/>
              </svg>
              {/* 结构说明 */}
              <div className="flex-1">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>数据总线：</strong> 传输数据，宽度影响一次可传输的数据位数。</li>
                  <li><strong>地址总线：</strong> 指定数据传输的源和目的地，宽度决定寻址空间。</li>
                  <li><strong>控制总线：</strong> 传递控制信号（如读/写、时钟、中断等）。</li>
                  <li>系统总线连接CPU、存储器和I/O设备，实现信息交换。</li>
                </ul>
              </div>
            </div>
          </div>
          {/* I/O系统原理与方式 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">I/O系统原理与常见方式</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>程序查询方式：</strong> CPU主动轮询I/O设备状态，效率低。</li>
              <li><strong>中断方式：</strong> I/O设备准备好后发中断信号，CPU响应后处理数据，效率高。</li>
              <li><strong>DMA方式：</strong> 直接内存访问，数据在I/O设备与内存间直接传输，CPU只需发起和结束时参与。</li>
              <li>现代系统常采用多级中断、DMA等方式提升I/O效率。</li>
            </ul>
          </div>
        </div>
      )}

      {/* 例题解析 */}
      {activeTab === '例题解析' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">例题1：总线宽度与性能</h2>
            <p className="mb-2">某系统数据总线宽度为32位，主存带宽为100MB/s，问一次最多可传输多少字节？</p>
            <p><strong>解答：</strong> 32位=4字节，一次最多可传输4字节。带宽受总线宽度和时钟频率共同影响。</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">例题2：I/O方式对比</h2>
            <p className="mb-2">简述程序查询、中断、DMA三种I/O方式的优缺点。</p>
            <p><strong>解答：</strong></p>
            <ul className="list-disc pl-6">
              <li>程序查询：实现简单但CPU利用率低。</li>
              <li>中断：效率高，适合响应型I/O，但需中断管理。</li>
              <li>DMA：CPU负担最小，适合大批量数据传输，但硬件复杂度高。</li>
            </ul>
          </div>
        </div>
      )}

      {/* 小结与思考题 */}
      {activeTab === '小结与思考题' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">小结</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>掌握总线的分类、结构与作用</li>
              <li>理解I/O系统的三种常见方式及其优缺点</li>
              <li>熟悉总线宽度、带宽等性能指标</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">思考题</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>简述数据总线、地址总线、控制总线的作用与区别。</li>
              <li>举例说明DMA方式的优点及应用场景。</li>
              <li>请画出CPU、存储器、I/O设备与总线的连接示意图。</li>
            </ol>
          </div>
        </div>
      )}

      {/* 底部导航 */}
      <div className="flex justify-between mt-8">
        <Link href="/study/composition/controller" className="text-blue-500 hover:underline">上一页：控制器</Link>
        <Link href="/study/composition/cpu" className="text-blue-500 hover:underline">下一页：中央处理器</Link>
      </div>
    </div>
  );
} 