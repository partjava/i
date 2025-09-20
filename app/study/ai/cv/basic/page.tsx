'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CVBasicPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'history', label: '发展历史' },
    { id: 'applications', label: '应用领域' },
    { id: 'fundamentals', label: '基础知识' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">计算机视觉基础</h1>
      
      {/* 标签导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">什么是计算机视觉？</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  计算机视觉是人工智能的一个重要分支，它致力于让计算机能够"看见"并理解视觉世界。
                  通过模拟人类视觉系统，计算机视觉使机器能够从图像或视频中获取信息，理解场景内容，
                  并做出相应的决策。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="relative h-64">
                    <svg viewBox="0 0 400 300" className="w-full h-full">
                      {/* 计算机视觉系统示意图 */}
                      <rect x="50" y="50" width="300" height="200" fill="#f0f0f0" stroke="#333" strokeWidth="2"/>
                      <circle cx="100" cy="100" r="20" fill="#4a90e2"/>
                      <text x="90" y="105" className="text-sm">相机</text>
                      <path d="M120 100 L180 100" stroke="#333" strokeWidth="2"/>
                      <rect x="180" y="80" width="60" height="40" fill="#e2e2e2" stroke="#333" strokeWidth="2"/>
                      <text x="190" y="105" className="text-sm">处理</text>
                      <path d="M240 100 L300 100" stroke="#333" strokeWidth="2"/>
                      <rect x="300" y="80" width="40" height="40" fill="#4a90e2" stroke="#333" strokeWidth="2"/>
                      <text x="305" y="105" className="text-sm">输出</text>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">计算机视觉系统的基本组成：</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>图像获取：通过相机等设备捕获图像</li>
                      <li>预处理：图像增强、去噪等</li>
                      <li>特征提取：提取图像中的关键信息</li>
                      <li>模式识别：识别图像中的对象和场景</li>
                      <li>理解与决策：理解场景并做出相应决策</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">计算机视觉的核心任务</h3>
              <button
                onClick={() => toggleContent('tasks')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看详情</span>
                <span>{expandedContent === 'tasks' ? '▼' : '▶'}</span>
              </button>
              {expandedContent === 'tasks' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">基础任务：</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>图像分类：识别图像中的主要对象</li>
                        <li>目标检测：定位和识别图像中的多个对象</li>
                        <li>图像分割：将图像分割成多个区域</li>
                        <li>特征匹配：在不同图像间找到对应点</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">高级任务：</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>场景理解：理解图像中的场景和上下文</li>
                        <li>姿态估计：估计物体的3D姿态</li>
                        <li>动作识别：识别视频中的动作</li>
                        <li>3D重建：从2D图像重建3D场景</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">计算机视觉的发展历程</h3>
              <div className="prose max-w-none">
                <div className="relative h-96 mb-4">
                  <svg viewBox="0 0 800 400" className="w-full h-full">
                    {/* 时间线 */}
                    <line x1="50" y1="200" x2="750" y2="200" stroke="#333" strokeWidth="2"/>
                    {/* 早期发展 */}
                    <circle cx="150" cy="200" r="5" fill="#4a90e2"/>
                    <text x="100" y="180" className="text-sm">1960-1980</text>
                    <text x="80" y="220" className="text-sm">早期发展</text>
                    {/* 快速发展期 */}
                    <circle cx="400" cy="200" r="5" fill="#4a90e2"/>
                    <text x="350" y="180" className="text-sm">1990-2010</text>
                    <text x="330" y="220" className="text-sm">快速发展</text>
                    {/* 深度学习时代 */}
                    <circle cx="650" cy="200" r="5" fill="#4a90e2"/>
                    <text x="600" y="180" className="text-sm">2012-至今</text>
                    <text x="580" y="220" className="text-sm">深度学习</text>
                  </svg>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">早期发展（1960-1980）</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>1966年：MIT的"Summer Vision Project"</li>
                      <li>1970年代：边缘检测和特征提取算法</li>
                      <li>1980年代：早期图像处理技术</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold">快速发展期（1990-2010）</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>1990年代：机器学习方法的应用</li>
                      <li>2000年代：特征工程和传统机器学习</li>
                      <li>2010年代初期：深度学习开始兴起</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold">深度学习时代（2012-至今）</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>2012年：AlexNet在ImageNet竞赛中取得突破</li>
                      <li>2014年：R-CNN目标检测算法</li>
                      <li>2015年：ResNet和U-Net架构</li>
                      <li>2017年：Transformer架构引入</li>
                      <li>2020年至今：自监督学习和多模态融合</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">计算机视觉的应用领域</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">工业应用</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>工业检测：产品质量检测</li>
                      <li>机器人视觉：工业机器人导航</li>
                      <li>自动化生产：生产线监控</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">医疗健康</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>医学影像分析</li>
                      <li>疾病诊断辅助</li>
                      <li>手术导航</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">安防监控</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>人脸识别</li>
                      <li>行为分析</li>
                      <li>异常检测</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">智能交通</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>自动驾驶</li>
                      <li>交通监控</li>
                      <li>车牌识别</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fundamentals' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">图像处理基础</h3>
              <div className="prose max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-2">图像表示</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>像素：图像的基本单位</li>
                      <li>颜色空间：RGB、HSV、灰度等</li>
                      <li>图像格式：位图、矢量图</li>
                    </ul>
                  </div>
                  <div className="relative h-48">
                    <svg viewBox="0 0 300 200" className="w-full h-full">
                      {/* 图像表示示意图 */}
                      <rect x="50" y="50" width="200" height="100" fill="#f0f0f0" stroke="#333" strokeWidth="2"/>
                      <rect x="60" y="60" width="20" height="20" fill="#ff0000"/>
                      <rect x="80" y="60" width="20" height="20" fill="#00ff00"/>
                      <rect x="100" y="60" width="20" height="20" fill="#0000ff"/>
                      <text x="70" y="90" className="text-sm">RGB</text>
                      <text x="90" y="90" className="text-sm">像素</text>
                      <text x="110" y="90" className="text-sm">矩阵</text>
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">基本操作</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>几何变换：缩放、旋转、平移</li>
                    <li>颜色处理：亮度调整、对比度增强</li>
                    <li>滤波操作：平滑、锐化、边缘检测</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">特征提取</h3>
              <button
                onClick={() => toggleContent('features')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看详情</span>
                <span>{expandedContent === 'features' ? '▼' : '▶'}</span>
              </button>
              {expandedContent === 'features' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">传统特征：</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>SIFT：尺度不变特征变换</li>
                        <li>HOG：方向梯度直方图</li>
                        <li>LBP：局部二值模式</li>
                        <li>Haar特征</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">深度特征：</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>CNN特征</li>
                        <li>注意力特征</li>
                        <li>多尺度特征</li>
                        <li>语义特征</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/nlp/advanced"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回NLP进阶与前沿
        </Link>
        <Link 
          href="/study/ai/cv/image-processing"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          图像处理基础 →
        </Link>
      </div>
    </div>
  );
} 