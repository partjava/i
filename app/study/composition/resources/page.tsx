'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function CompositionResourcesPage() {
  const [activeTab, setActiveTab] = useState('学习建议');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">学习建议与资源</h1>

      {/* 顶部Tab栏 */}
      <div className="flex space-x-4 mb-8">
        {['学习建议', '推荐书籍与资料', '常见问题与答疑'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 学习建议 */}
      {activeTab === '学习建议' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">高效学习方法</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>结合教材与实际案例，理解原理与应用的联系</li>
              <li>多做思考题和实验，提升动手能力</li>
              <li>整理知识结构图，形成系统认知</li>
              <li>定期复习与自测，查漏补缺</li>
              <li>关注新技术发展，拓展视野</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">刷题与实验建议</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>优先做课后习题和经典真题，掌握常考点</li>
              <li>动手搭建简易CPU/存储/总线等仿真实验，加深理解</li>
              <li>参与开源项目或竞赛，提升综合能力</li>
            </ul>
          </div>
        </div>
      )}

      {/* 推荐书籍与资料 */}
      {activeTab === '推荐书籍与资料' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">推荐教材与参考书</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>《计算机组成原理》（唐朔飞）——国内经典教材，内容系统全面</li>
              <li>《Computer Organization and Design》（Patterson & Hennessy）——国际权威教材，英文原版</li>
              <li>《计算机系统要点》（Bryant & O'Hallaron）——深入理解计算机系统</li>
              <li>《深入理解计算机系统》（CSAPP）——硬核进阶读物</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">优质网站与视频课程</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><a href="https://www.icourse163.org/course/BIT-1001870001" className="text-blue-500 underline" target="_blank">中国大学MOOC-计算机组成原理</a></li>
              <li><a href="https://csapp.cs.cmu.edu/" className="text-blue-500 underline" target="_blank">CMU CS:APP 官方网站</a></li>
              <li><a href="https://www.bilibili.com/video/BV1JE411d7Fs" className="text-blue-500 underline" target="_blank">B站-王道计算机组成原理课程</a></li>
              <li><a href="https://www.bilibili.com/video/BV1hE411d7mT" className="text-blue-500 underline" target="_blank">B站-哈工大计算机组成原理</a></li>
            </ul>
          </div>
        </div>
      )}

      {/* 常见问题与答疑 */}
      {activeTab === '常见问题与答疑' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">常见问题解答</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Q:</strong> 计算机组成原理和计算机体系结构有什么区别？<br/><strong>A:</strong> 组成原理关注硬件实现细节，体系结构更偏向整体设计与性能优化。</li>
              <li><strong>Q:</strong> 如何高效记忆各类结构和原理？<br/><strong>A:</strong> 多画结构图、流程图，结合例题和实验加深理解。</li>
              <li><strong>Q:</strong> 需要掌握哪些数学基础？<br/><strong>A:</strong> 主要涉及二进制、逻辑代数、简单概率等。</li>
              <li><strong>Q:</strong> 适合哪些竞赛或项目实践？<br/><strong>A:</strong> 蓝桥杯、计算机设计大赛、CPU仿真、FPGA开发等。</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">学习路线建议</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>先打好基础，逐步深入（先理解组成原理，再拓展体系结构/操作系统等）</li>
              <li>理论结合实践，注重动手能力培养</li>
              <li>多与同学、老师交流，参与讨论和答疑</li>
            </ul>
          </div>
        </div>
      )}

      {/* 底部导航 */}
      <div className="flex justify-between mt-8">
        <Link href="/study/composition/performance" className="text-blue-500 hover:underline">上一页：系统性能与优化</Link>
        <Link href="/study/composition/intro" className="text-blue-500 hover:underline">返回本章开头</Link>
      </div>
    </div>
  );
} 