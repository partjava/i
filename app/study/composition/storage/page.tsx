'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function CompositionStoragePage() {
  const [activeTab, setActiveTab] = useState('知识讲解');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">存储系统</h1>

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
          {/* 存储器分类与层次结构 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">存储器分类与层次结构</h2>
            <ul className="list-disc pl-6 mb-2">
              <li><strong>主存储器（内存）：</strong> 直接与CPU交换数据，速度快，容量有限，断电丢失数据（如DRAM、SRAM）。</li>
              <li><strong>辅存储器：</strong> 容量大，速度慢，断电不丢失（如硬盘、SSD、U盘、光盘等）。</li>
              <li><strong>高速缓冲存储器（Cache）：</strong> 位于CPU与主存之间，速度接近CPU，容量小，用于缓解"瓶颈效应"。</li>
              <li><strong>虚拟存储器：</strong> 利用磁盘空间扩展主存容量，实现"以小博大"，支持多任务。</li>
            </ul>
            <h3 className="font-semibold mb-2">存储层次结构</h3>
            <ul className="list-disc pl-6 mb-2">
              <li>寄存器 &gt; Cache &gt; 主存 &gt; 辅存，速度递减，容量递增，成本递减。</li>
              <li>多级Cache（L1/L2/L3）进一步提升系统性能。</li>
            </ul>
          </div>
          {/* 存储系统原理与性能指标 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">存储系统原理与性能指标</h2>
            <ul className="list-disc pl-6 mb-2">
              <li><strong>存储容量：</strong> 存储器能存储的信息总量，单位为字节（B）、千字节（KB）、兆字节（MB）等。</li>
              <li><strong>存取速度：</strong> 包括存取周期、存取时间、带宽等。</li>
              <li><strong>命中率：</strong> Cache/虚拟存储中，CPU访问命中Cache/主存的概率，命中率高则性能好。</li>
              <li><strong>平均访问时间：</strong> 结合命中率和各级存储速度计算。</li>
            </ul>
            <h3 className="font-semibold mb-2">Cache工作原理</h3>
            <ul className="list-disc pl-6 mb-2">
              <li>采用"局部性原理"（时间局部性、空间局部性）提升命中率。</li>
              <li>常见映射方式：直接映射、全相联、组相联。</li>
              <li>替换算法：LRU、FIFO、随机等。</li>
            </ul>
            <h3 className="font-semibold mb-2">虚拟存储器原理</h3>
            <ul className="list-disc pl-6 mb-2">
              <li>采用分页、分段或段页式管理，支持进程隔离和内存扩展。</li>
              <li>缺页中断、页面置换算法（如LRU、FIFO）。</li>
            </ul>
          </div>
        </div>
      )}

      {/* 例题解析 */}
      {activeTab === '例题解析' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">例题1：Cache命中率与平均访问时间</h2>
            <p className="mb-2">某系统主存访问时间为100ns，Cache访问时间为10ns，命中率为90%。求平均访问时间。</p>
            <p><strong>解答：</strong></p>
            <ul className="list-disc pl-6">
              <li>平均访问时间 = 命中率×Cache时间 + (1-命中率)×主存时间</li>
              <li>即 0.9×10ns + 0.1×100ns = 9ns + 10ns = <strong>19ns</strong></li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">例题2：虚拟存储器页面置换</h2>
            <p className="mb-2">简述虚拟存储器中页面置换的常见算法，并举例说明LRU算法。</p>
            <p><strong>解答：</strong></p>
            <ul className="list-disc pl-6">
              <li>常见算法：LRU（最近最少使用）、FIFO（先进先出）、LFU（最少使用）、随机置换等。</li>
              <li>LRU算法：每次淘汰最近最久未被访问的页面。例如页面访问序列1,2,3,4,1,2,5，内存3页，淘汰顺序为3→4→5。</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">例题3：存储层次结构分析</h2>
            <p className="mb-2">请分析寄存器、Cache、主存、辅存的速度、容量和作用。</p>
            <p><strong>解答：</strong></p>
            <ul className="list-disc pl-6">
              <li>寄存器：速度最快，容量最小，直接为CPU服务。</li>
              <li>Cache：速度次之，容量小，缓解CPU与主存速度差。</li>
              <li>主存：容量较大，速度较慢，存放正在运行程序和数据。</li>
              <li>辅存：容量最大，速度最慢，长期保存数据。</li>
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
              <li>掌握存储系统的层次结构和各类存储器特点</li>
              <li>理解Cache和虚拟存储器的工作原理</li>
              <li>熟悉常见性能指标和优化方法</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">思考题</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>简述主存、Cache和虚拟存储器的主要区别和联系。</li>
              <li>举例说明局部性原理在存储系统中的应用。</li>
              <li>请写出平均访问时间的计算公式，并举例计算。</li>
            </ol>
          </div>
        </div>
      )}

      {/* 底部导航 */}
      <div className="flex justify-between mt-8">
        <Link href="/study/composition/data" className="text-blue-500 hover:underline">上一页：数据的表示与运算</Link>
        <Link href="/study/composition/alu" className="text-blue-500 hover:underline">下一页：运算器</Link>
      </div>
    </div>
  );
} 