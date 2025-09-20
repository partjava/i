'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function CompositionControllerPage() {
  const [activeTab, setActiveTab] = useState('知识讲解');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">控制器</h1>

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
          {/* 控制器结构图与讲解 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">控制器基本结构与分类</h2>
            <div className="flex flex-col md:flex-row items-center md:space-x-8">
              {/* SVG结构图 */}
              <svg width="340" height="160" viewBox="0 0 340 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 md:mb-0">
                {/* 指令寄存器IR */}
                <rect x="20" y="60" width="60" height="40" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2"/>
                <text x="50" y="85" textAnchor="middle" fontSize="14" fill="#3730A3">IR</text>
                {/* 控制器本体 */}
                <rect x="120" y="40" width="100" height="80" fill="#FEF9C3" stroke="#F59E42" strokeWidth="2"/>
                <text x="170" y="80" textAnchor="middle" fontSize="16" fill="#B45309">控制器</text>
                {/* 信号输出箭头 */}
                <line x1="220" y1="80" x2="300" y2="80" stroke="#2563EB" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                <text x="260" y="70" fontSize="12" fill="#2563EB">控制信号</text>
                {/* IR到控制器箭头 */}
                <line x1="80" y1="80" x2="120" y2="80" stroke="#0EA5E9" strokeWidth="3" markerEnd="url(#arrowhead2)"/>
                <text x="100" y="70" fontSize="12" fill="#0EA5E9">指令</text>
                {/* 箭头定义 */}
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                    <polygon points="0,0 8,4 0,8" fill="#2563EB" />
                  </marker>
                  <marker id="arrowhead2" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                    <polygon points="0,0 8,4 0,8" fill="#0EA5E9" />
                  </marker>
                </defs>
              </svg>
              {/* 结构说明 */}
              <div className="flex-1">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>指令寄存器（IR）：</strong> 存放当前执行的指令。</li>
                  <li><strong>控制器：</strong> 解析指令，产生各种控制信号，协调各部件工作。</li>
                  <li><strong>控制信号：</strong> 控制运算器、存储器、I/O等部件的操作。</li>
                </ul>
              </div>
            </div>
            <h3 className="font-semibold mt-4 mb-2">控制器分类</h3>
            <ul className="list-disc pl-6 mb-2">
              <li><strong>硬布线控制器：</strong> 采用逻辑电路实现，速度快，结构固定，适合RISC。</li>
              <li><strong>微程序控制器：</strong> 采用微指令存储器，灵活易扩展，适合CISC。</li>
            </ul>
          </div>
          {/* 工作原理与流程 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">控制器的工作原理与流程</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>从指令寄存器IR获取指令，进行译码。</li>
              <li>根据指令类型产生相应的控制信号。</li>
              <li>协调运算器、存储器、I/O等部件完成操作。</li>
              <li>硬布线控制：用组合/时序逻辑直接生成控制信号。</li>
              <li>微程序控制：通过查表方式执行微指令序列。</li>
            </ul>
          </div>
        </div>
      )}

      {/* 例题解析 */}
      {activeTab === '例题解析' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">例题1：硬布线与微程序控制器对比</h2>
            <p className="mb-2">简述硬布线控制器与微程序控制器的主要区别及各自优缺点。</p>
            <p><strong>解答：</strong></p>
            <ul className="list-disc pl-6">
              <li>硬布线控制器：速度快，结构固定，修改困难，适合指令集简单的RISC。</li>
              <li>微程序控制器：灵活易扩展，便于修改，速度较慢，适合复杂指令集CISC。</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">例题2：控制信号生成流程</h2>
            <p className="mb-2">请简述控制器生成控制信号的基本流程。</p>
            <p><strong>解答：</strong> 控制器从IR获取指令，译码后根据指令类型和时序，产生相应的控制信号，驱动各部件协同完成操作。</p>
          </div>
        </div>
      )}

      {/* 小结与思考题 */}
      {activeTab === '小结与思考题' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">小结</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>掌握控制器的结构、分类及其工作原理</li>
              <li>理解硬布线与微程序控制的区别</li>
              <li>熟悉控制信号的生成与作用</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">思考题</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>请画出控制器与运算器、存储器、I/O的信号连接示意图，并简要说明。</li>
              <li>硬布线控制器和微程序控制器各适用于什么场景？</li>
              <li>简述控制器生成控制信号的基本流程。</li>
            </ol>
          </div>
        </div>
      )}

      {/* 底部导航 */}
      <div className="flex justify-between mt-8">
        <Link href="/study/composition/alu" className="text-blue-500 hover:underline">上一页：运算器</Link>
        <Link href="/study/composition/io" className="text-blue-500 hover:underline">下一页：总线与输入输出</Link>
      </div>
    </div>
  );
} 