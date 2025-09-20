 'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ImageProcessingPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'basic', label: '基础概念' },
    { id: 'operations', label: '基本操作' },
    { id: 'filters', label: '滤波处理' },
    { id: 'transforms', label: '图像变换' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">图像处理基础</h1>
      
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
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">图像的基本概念</h3>
              <div className="prose max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-2">数字图像</h4>
                    <p className="mb-4">
                      数字图像是由像素（Pixel）组成的二维矩阵，每个像素包含颜色信息。
                      在计算机中，图像通常以数字形式存储和处理。
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>分辨率：图像中像素的数量</li>
                      <li>位深度：每个像素使用的位数</li>
                      <li>颜色空间：RGB、HSV、灰度等</li>
                    </ul>
                  </div>
                  <div className="relative h-48">
                    <svg viewBox="0 0 300 200" className="w-full h-full">
                      {/* 数字图像示意图 */}
                      <rect x="50" y="50" width="200" height="100" fill="#f0f0f0" stroke="#333" strokeWidth="2"/>
                      <rect x="60" y="60" width="20" height="20" fill="#ff0000"/>
                      <rect x="80" y="60" width="20" height="20" fill="#00ff00"/>
                      <rect x="100" y="60" width="20" height="20" fill="#0000ff"/>
                      <text x="70" y="90" className="text-sm">像素</text>
                      <text x="90" y="90" className="text-sm">矩阵</text>
                      <text x="110" y="90" className="text-sm">RGB</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">颜色空间</h3>
              <button
                onClick={() => toggleContent('colorspace')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看详情</span>
                <span>{expandedContent === 'colorspace' ? '▼' : '▶'}</span>
              </button>
              {expandedContent === 'colorspace' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">RGB颜色空间</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>红（Red）、绿（Green）、蓝（Blue）三原色</li>
                        <li>每个通道取值范围：0-255</li>
                        <li>适用于显示设备</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">HSV颜色空间</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>色调（Hue）、饱和度（Saturation）、明度（Value）</li>
                        <li>更符合人类视觉感知</li>
                        <li>适用于颜色分割</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4">
                    <svg viewBox="0 0 400 200" className="w-full h-48">
                      {/* 颜色空间示意图 */}
                      <rect x="50" y="50" width="100" height="100" fill="url(#rgb-gradient)"/>
                      <text x="75" y="170" className="text-sm">RGB</text>
                      <rect x="250" y="50" width="100" height="100" fill="url(#hsv-gradient)"/>
                      <text x="275" y="170" className="text-sm">HSV</text>
                      <defs>
                        <linearGradient id="rgb-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#ff0000'}}/>
                          <stop offset="50%" style={{stopColor: '#00ff00'}}/>
                          <stop offset="100%" style={{stopColor: '#0000ff'}}/>
                        </linearGradient>
                        <linearGradient id="hsv-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#ff0000'}}/>
                          <stop offset="50%" style={{stopColor: '#ffff00'}}/>
                          <stop offset="100%" style={{stopColor: '#00ff00'}}/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'operations' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">基本图像操作</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">像素操作</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>亮度调整：增加或减少像素值</li>
                    <li>对比度调整：拉伸或压缩像素值范围</li>
                    <li>阈值处理：二值化图像</li>
                  </ul>
                  <div className="mt-4">
                    <svg viewBox="0 0 300 150" className="w-full h-32">
                      {/* 像素操作示意图 */}
                      <rect x="50" y="50" width="50" height="50" fill="#808080"/>
                      <text x="60" y="90" className="text-sm">原图</text>
                      <rect x="150" y="50" width="50" height="50" fill="#a0a0a0"/>
                      <text x="160" y="90" className="text-sm">亮度+</text>
                      <rect x="250" y="50" width="50" height="50" fill="#404040"/>
                      <text x="260" y="90" className="text-sm">亮度-</text>
                    </svg>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">几何操作</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>缩放：改变图像尺寸</li>
                    <li>旋转：改变图像方向</li>
                    <li>平移：移动图像位置</li>
                  </ul>
                  <div className="mt-4">
                    <svg viewBox="0 0 300 150" className="w-full h-32">
                      {/* 几何操作示意图 */}
                      <rect x="50" y="50" width="40" height="40" fill="#4a90e2"/>
                      <text x="55" y="90" className="text-sm">原图</text>
                      <rect x="150" y="50" width="60" height="60" fill="#4a90e2"/>
                      <text x="155" y="90" className="text-sm">放大</text>
                      <rect x="250" y="50" width="40" height="40" fill="#4a90e2" transform="rotate(45 270 70)"/>
                      <text x="255" y="90" className="text-sm">旋转</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'filters' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">图像滤波</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">空间域滤波</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>均值滤波：去除噪声</li>
                    <li>中值滤波：去除椒盐噪声</li>
                    <li>高斯滤波：平滑处理</li>
                  </ul>
                  <div className="mt-4">
                    <svg viewBox="0 0 300 150" className="w-full h-32">
                      {/* 空间域滤波示意图 */}
                      <rect x="50" y="50" width="40" height="40" fill="#4a90e2"/>
                      <circle cx="70" cy="70" r="2" fill="#000"/>
                      <circle cx="65" cy="65" r="2" fill="#000"/>
                      <text x="55" y="90" className="text-sm">原图</text>
                      <rect x="150" y="50" width="40" height="40" fill="#4a90e2"/>
                      <text x="155" y="90" className="text-sm">均值滤波</text>
                      <rect x="250" y="50" width="40" height="40" fill="#4a90e2"/>
                      <text x="255" y="90" className="text-sm">高斯滤波</text>
                    </svg>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">频域滤波</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>傅里叶变换</li>
                    <li>低通滤波：去除高频噪声</li>
                    <li>高通滤波：增强边缘</li>
                  </ul>
                  <div className="mt-4">
                    <svg viewBox="0 0 300 150" className="w-full h-32">
                      {/* 频域滤波示意图 */}
                      <rect x="50" y="50" width="40" height="40" fill="#4a90e2"/>
                      <text x="55" y="90" className="text-sm">原图</text>
                      <rect x="150" y="50" width="40" height="40" fill="#4a90e2"/>
                      <text x="155" y="90" className="text-sm">低通滤波</text>
                      <rect x="250" y="50" width="40" height="40" fill="#4a90e2"/>
                      <text x="255" y="90" className="text-sm">高通滤波</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transforms' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">图像变换</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">几何变换</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>仿射变换：平移、旋转、缩放</li>
                    <li>透视变换：视角校正</li>
                    <li>投影变换：3D到2D映射</li>
                  </ul>
                  <div className="mt-4">
                    <svg viewBox="0 0 300 150" className="w-full h-32">
                      {/* 几何变换示意图 */}
                      <rect x="50" y="50" width="40" height="40" fill="#4a90e2"/>
                      <text x="55" y="90" className="text-sm">原图</text>
                      <rect x="150" y="50" width="40" height="40" fill="#4a90e2" transform="rotate(45 170 70)"/>
                      <text x="155" y="90" className="text-sm">旋转</text>
                      <polygon points="250,50 290,50 270,90 230,90" fill="#4a90e2"/>
                      <text x="255" y="90" className="text-sm">透视</text>
                    </svg>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">颜色变换</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>颜色空间转换</li>
                    <li>直方图均衡化</li>
                    <li>颜色映射</li>
                  </ul>
                  <div className="mt-4">
                    <svg viewBox="0 0 300 150" className="w-full h-32">
                      {/* 颜色变换示意图 */}
                      <rect x="50" y="50" width="40" height="40" fill="#4a90e2"/>
                      <text x="55" y="90" className="text-sm">原图</text>
                      <rect x="150" y="50" width="40" height="40" fill="#e24a90"/>
                      <text x="155" y="90" className="text-sm">颜色空间</text>
                      <rect x="250" y="50" width="40" height="40" fill="#90e24a"/>
                      <text x="255" y="90" className="text-sm">映射</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/cv/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回计算机视觉基础
        </Link>
        <Link 
          href="/study/ai/cv/feature-extraction"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          特征提取与匹配 →
        </Link>
      </div>
    </div>
  );
}