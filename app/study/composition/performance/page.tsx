'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function CompositionPerformancePage() {
  const [activeTab, setActiveTab] = useState('知识讲解');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">系统性能与优化</h1>

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
          {/* 性能指标与分析 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">系统性能指标与分析</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>主频（时钟频率）：</strong> CPU每秒振荡次数，单位Hz，主频越高，理论速度越快。</li>
              <li><strong>CPI（每条指令时钟周期数）：</strong> 衡量指令执行效率，CPI越低越好。</li>
              <li><strong>MIPS（每秒百万条指令）：</strong> 衡量CPU执行指令的能力。</li>
              <li><strong>吞吐率：</strong> 单位时间内系统能处理的任务数量。</li>
              <li><strong>响应时间：</strong> 用户发出请求到系统响应的时间。</li>
            </ul>
            {/* 性能公式图示 */}
            <div className="mt-4">
              <svg width="380" height="60" viewBox="0 0 380 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="10" y="30" fontSize="18" fill="#2563EB">CPU执行时间 = 指令数 × CPI × 时钟周期</text>
                <text x="10" y="55" fontSize="16" fill="#059669">MIPS = 指令数 / (执行时间 × 10⁶)</text>
              </svg>
            </div>
          </div>
          {/* 影响性能的因素与优化方法 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">影响性能的主要因素与优化方法</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>存储层次结构：</strong> 多级Cache、主存、辅存，优化数据访问速度。</li>
              <li><strong>流水线技术：</strong> 提高指令吞吐率，减少空闲周期。</li>
              <li><strong>分支预测与乱序执行：</strong> 提高指令流效率，减少等待。</li>
              <li><strong>指令集优化：</strong> 精简指令集（RISC）、复杂指令集（CISC）各有优势。</li>
              <li><strong>软件优化：</strong> 编译器优化、算法优化、并行化处理。</li>
            </ul>
            {/* 优化思路图示 */}
            <div className="mt-4">
              <svg width="380" height="60" viewBox="0 0 380 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="80" height="40" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2"/>
                <text x="50" y="35" textAnchor="middle" fontSize="14" fill="#3730A3">硬件优化</text>
                <rect x="110" y="10" width="80" height="40" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2"/>
                <text x="150" y="35" textAnchor="middle" fontSize="14" fill="#166534">软件优化</text>
                <rect x="210" y="10" width="80" height="40" fill="#FEF9C3" stroke="#F59E42" strokeWidth="2"/>
                <text x="250" y="35" textAnchor="middle" fontSize="14" fill="#B45309">系统优化</text>
                <line x1="90" y1="30" x2="110" y2="30" stroke="#2563EB" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <line x1="190" y1="30" x2="210" y2="30" stroke="#2563EB" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                    <polygon points="0,0 8,4 0,8" fill="#2563EB" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* 例题解析 */}
      {activeTab === '例题解析' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">例题1：CPI与CPU执行时间</h2>
            <p className="mb-2">某CPU主频为2GHz，CPI为1.5，执行6000万条指令，求CPU执行时间。</p>
            <p><strong>解答：</strong></p>
            <ul className="list-disc pl-6">
              <li>CPU执行时间 = 指令数 × CPI × 时钟周期</li>
              <li>时钟周期 = 1 / 主频 = 0.5ns</li>
              <li>执行时间 = 6000万 × 1.5 × 0.5ns = 45ms</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">例题2：优化措施分析</h2>
            <p className="mb-2">简述提升系统性能的常见硬件和软件优化措施。</p>
            <p><strong>解答：</strong></p>
            <ul className="list-disc pl-6">
              <li>硬件：增加Cache、提升主频、优化流水线、采用多核等。</li>
              <li>软件：编译器优化、算法优化、并行化处理等。</li>
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
              <li>掌握系统性能的主要指标及其计算方法</li>
              <li>理解影响性能的主要因素与优化思路</li>
              <li>熟悉常见的硬件与软件优化措施</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">思考题</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>简述CPI、MIPS、吞吐率等性能指标的含义及计算方法。</li>
              <li>举例说明存储层次结构对系统性能的影响。</li>
              <li>请列举三种常见的系统优化措施并简要说明。</li>
            </ol>
          </div>
        </div>
      )}

      {/* 底部导航 */}
      <div className="flex justify-between mt-8">
        <Link href="/study/composition/cpu" className="text-blue-500 hover:underline">上一页：中央处理器</Link>
        <Link href="/study/composition/resources" className="text-blue-500 hover:underline">下一页：学习建议与资源</Link>
      </div>
    </div>
  );
} 