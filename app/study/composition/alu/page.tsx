'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function CompositionALUPage() {
  const [activeTab, setActiveTab] = useState('知识讲解');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">运算器（ALU）</h1>

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
          {/* 运算器结构图与讲解 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">运算器基本结构</h2>
            <div className="flex flex-col md:flex-row items-center md:space-x-8">
              {/* SVG结构图 */}
              <svg width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 md:mb-0">
                {/* 寄存器组 */}
                <rect x="20" y="60" width="60" height="60" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2"/>
                <text x="50" y="95" textAnchor="middle" fontSize="16" fill="#3730A3">寄存器组</text>
                {/* 算术逻辑单元ALU */}
                <rect x="120" y="60" width="80" height="60" fill="#FEF9C3" stroke="#F59E42" strokeWidth="2"/>
                <text x="160" y="95" textAnchor="middle" fontSize="16" fill="#B45309">ALU</text>
                {/* 数据通路箭头 */}
                <line x1="80" y1="90" x2="120" y2="90" stroke="#2563EB" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                <line x1="200" y1="90" x2="260" y2="90" stroke="#2563EB" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                {/* 输出寄存器 */}
                <rect x="260" y="60" width="40" height="60" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2"/>
                <text x="280" y="95" textAnchor="middle" fontSize="14" fill="#166534">输出</text>
                {/* 箭头定义 */}
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                    <polygon points="0,0 8,4 0,8" fill="#2563EB" />
                  </marker>
                </defs>
              </svg>
              {/* 结构说明 */}
              <div className="flex-1">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>寄存器组：</strong> 存放操作数和中间结果，支持高速读写。</li>
                  <li><strong>算术逻辑单元（ALU）：</strong> 执行加减乘除、逻辑运算等核心操作。</li>
                  <li><strong>数据通路：</strong> 连接寄存器组与ALU，实现数据的输入、处理和输出。</li>
                  <li><strong>输出寄存器：</strong> 存放ALU运算结果，供后续使用。</li>
                </ul>
              </div>
            </div>
          </div>
          {/* 数据流示意图 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">典型数据流示意</h2>
            <svg width="320" height="80" viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 输入A、B */}
              <rect x="10" y="30" width="40" height="20" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="2"/>
              <text x="30" y="45" textAnchor="middle" fontSize="14" fill="#0369A1">A</text>
              <rect x="10" y="60" width="40" height="20" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="2"/>
              <text x="30" y="75" textAnchor="middle" fontSize="14" fill="#0369A1">B</text>
              {/* 箭头到ALU */}
              <line x1="50" y1="40" x2="100" y2="40" stroke="#0EA5E9" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
              <line x1="50" y1="70" x2="100" y2="70" stroke="#0EA5E9" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
              {/* ALU */}
              <rect x="100" y="30" width="60" height="40" fill="#FEF9C3" stroke="#F59E42" strokeWidth="2"/>
              <text x="130" y="55" textAnchor="middle" fontSize="16" fill="#B45309">ALU</text>
              {/* 箭头到输出 */}
              <line x1="160" y1="50" x2="210" y2="50" stroke="#0EA5E9" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
              {/* 输出 */}
              <rect x="210" y="40" width="40" height="20" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2"/>
              <text x="230" y="55" textAnchor="middle" fontSize="14" fill="#166534">输出</text>
              <defs>
                <marker id="arrowhead2" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                  <polygon points="0,0 8,4 0,8" fill="#0EA5E9" />
                </marker>
              </defs>
            </svg>
            <p className="mt-4">如上图，输入A、B经数据通路送入ALU，ALU完成运算后输出结果。</p>
          </div>
          {/* 主要功能与原理 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">ALU的主要功能与原理</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>算术运算：加、减、乘、除等基本运算。</li>
              <li>逻辑运算：与、或、非、异或等。</li>
              <li>移位操作：算术移位、逻辑移位、循环移位。</li>
              <li>状态标志：如零标志、进位标志、溢出标志等。</li>
            </ul>
          </div>
        </div>
      )}

      {/* 例题解析 */}
      {activeTab === '例题解析' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">例题1：ALU的功能</h2>
            <p className="mb-2">简述ALU的主要功能及其在CPU中的作用。</p>
            <p><strong>解答：</strong> ALU负责执行算术和逻辑运算，是CPU的核心部件之一。它通过与寄存器组协作，实现数据的高速处理和结果输出。</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">例题2：数据流分析</h2>
            <p className="mb-2">分析数据从寄存器组到ALU再到输出的流动过程。</p>
            <p><strong>解答：</strong> 操作数首先从寄存器组读取，经数据通路送入ALU，ALU完成运算后将结果写回输出寄存器或寄存器组。</p>
          </div>
        </div>
      )}

      {/* 小结与思考题 */}
      {activeTab === '小结与思考题' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">小结</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>掌握ALU的结构、功能及其与寄存器组的协作关系</li>
              <li>理解数据流在运算器中的流动过程</li>
              <li>熟悉常见的算术、逻辑运算及状态标志</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">思考题</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>请画出ALU与寄存器组的数据流示意图，并简要说明。</li>
              <li>ALU的零标志和溢出标志分别在什么情况下被置位？</li>
              <li>举例说明ALU如何实现加法和逻辑与运算。</li>
            </ol>
          </div>
        </div>
      )}

      {/* 底部导航 */}
      <div className="flex justify-between mt-8">
        <Link href="/study/composition/storage" className="text-blue-500 hover:underline">上一页：存储系统</Link>
        <Link href="/study/composition/controller" className="text-blue-500 hover:underline">下一页：控制器</Link>
      </div>
    </div>
  );
} 