'use client';
import React from 'react';
import Link from 'next/link';

export default function CompositionIntroPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">绪论与发展简史</h1>

      {/* 学科简介 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">学科简介</h2>
        <p>计算机组成原理是计算机科学与技术专业的核心基础课程，主要研究计算机系统的基本结构、工作原理及其实现方法。通过本课程的学习，能够理解计算机硬件的基本组成、各部件的功能及其协作方式，为后续的系统设计、编程和优化打下坚实基础。</p>
      </div>

      {/* 研究内容与意义 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">研究内容与意义</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>掌握计算机的基本组成（运算器、控制器、存储器、输入/输出设备）</li>
          <li>理解数据的表示、运算和传输方式</li>
          <li>了解指令系统、CPU结构、存储系统、I/O系统等核心内容</li>
          <li>为软硬件结合、系统优化和新技术学习打基础</li>
        </ul>
      </div>

      {/* 计算机发展简史 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">计算机发展简史</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>第一代（1940s-1950s）：</strong> 电子管计算机，体积大、功耗高、速度慢，代表如ENIAC。</li>
          <li><strong>第二代（1950s-1960s）：</strong> 晶体管计算机，体积减小、速度提升、可靠性增强。</li>
          <li><strong>第三代（1960s-1970s）：</strong> 集成电路计算机，出现小型机和微型机，计算机逐步普及。</li>
          <li><strong>第四代（1970s-至今）：</strong> 大规模集成电路，个人计算机和互联网兴起，计算机进入千家万户。</li>
          <li><strong>第五代（未来）：</strong> 人工智能、量子计算等新型计算机不断发展，智能化和多样化趋势明显。</li>
        </ol>
      </div>

      {/* 现代发展趋势 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">现代计算机发展趋势</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>多核与并行计算</li>
          <li>云计算与大数据</li>
          <li>人工智能与专用加速芯片</li>
          <li>物联网与边缘计算</li>
          <li>绿色计算与节能优化</li>
        </ul>
      </div>

      {/* 学习建议 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">学习建议</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>结合教材与实际案例，理解原理与应用的联系</li>
          <li>多做思考题和实验，提升动手能力</li>
          <li>关注新技术发展，拓展视野</li>
          <li>推荐教材：《计算机组成原理》（唐朔飞）、《Computer Organization and Design》（Patterson & Hennessy）</li>
        </ul>
      </div>

      {/* 底部导航 */}
      <div className="flex justify-end mt-8">
        <Link href="/study/composition/structure" className="text-blue-500 hover:underline">下一页：系统结构概述</Link>
      </div>
    </div>
  );
} 