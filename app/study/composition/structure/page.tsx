'use client';
import React from 'react';
import Link from 'next/link';

export default function CompositionStructurePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">系统结构概述</h1>

      {/* 系统层次结构 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">计算机系统层次结构</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>硬件层：物理设备，包括CPU、内存、I/O等</li>
          <li>系统软件层：操作系统、驱动程序等</li>
          <li>支撑软件层：数据库、中间件等</li>
          <li>应用软件层：各种应用程序</li>
          <li>用户层：最终使用者</li>
        </ul>
        <p className="mt-2">各层次之间通过接口和协议协同工作，实现复杂的计算任务。</p>
      </div>

      {/* 冯·诺依曼结构与哈佛结构 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">冯·诺依曼结构与哈佛结构</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>冯·诺依曼结构：</strong> 程序存储和数据存储在同一存储器，采用统一的总线进行数据和指令的传输，结构简单、成本低，是现代通用计算机的基础。</li>
          <li><strong>哈佛结构：</strong> 指令和数据分别存储在不同的存储器，分别有独立的总线，常用于嵌入式和信号处理等领域，具有更高的并行性和效率。</li>
        </ul>
      </div>

      {/* 典型系统结构文字描述 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">典型系统结构描述</h2>
        <p>典型的冯·诺依曼结构包括：输入设备、输出设备、存储器、运算器、控制器五大部件，通过总线互联。CPU（运算器+控制器）从存储器中读取指令和数据，进行处理后输出结果。</p>
        <p>哈佛结构则将指令流和数据流分开，分别有独立的存储和通路，适合高性能场景。</p>
      </div>

      {/* 系统结构的演变与发展 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">系统结构的演变与发展</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>从单核到多核、分布式系统</li>
          <li>从集中式到云计算、边缘计算</li>
          <li>专用加速器（如GPU、TPU等）与异构计算</li>
        </ul>
        <p className="mt-2">现代计算机系统结构不断演进，以适应大数据、人工智能等新应用需求。</p>
      </div>

      {/* 小结与学习建议 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">小结与学习建议</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>理解系统层次结构有助于把握计算机整体工作原理</li>
          <li>掌握冯·诺依曼与哈佛结构的区别及应用场景</li>
          <li>关注系统结构的新发展，拓展知识面</li>
        </ul>
      </div>

      {/* 底部导航 */}
      <div className="flex justify-between mt-8">
        <Link href="/study/composition/intro" className="text-blue-500 hover:underline">上一页：绪论与发展简史</Link>
        <Link href="/study/composition/data" className="text-blue-500 hover:underline">下一页：数据的表示与运算</Link>
      </div>
    </div>
  );
} 