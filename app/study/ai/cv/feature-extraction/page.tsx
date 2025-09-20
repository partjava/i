'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FeatureExtractionPage() {
  const [activeTab, setActiveTab] = useState('traditional');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'traditional', label: '传统特征' },
    { id: 'deep', label: '深度特征' },
    { id: 'matching', label: '特征匹配' },
    { id: 'applications', label: '应用案例' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">特征提取与匹配</h1>
      
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
        {activeTab === 'traditional' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">传统特征提取方法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">SIFT特征</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>尺度不变特征变换</li>
                    <li>对旋转、缩放、亮度变化具有不变性</li>
                    <li>提取步骤：
                      <ul className="list-disc pl-6 mt-2">
                        <li>尺度空间极值检测</li>
                        <li>关键点定位</li>
                        <li>方向分配</li>
                        <li>特征描述子生成</li>
                      </ul>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <svg viewBox="0 0 300 150" className="w-full h-32">
                      {/* SIFT特征示意图 */}
                      <rect x="50" y="50" width="40" height="40" fill="#4a90e2"/>
                      <circle cx="70" cy="70" r="3" fill="#ff0000"/>
                      <text x="55" y="90" className="text-sm">关键点</text>
                      <rect x="150" y="50" width="40" height="40" fill="#4a90e2"/>
                      <circle cx="170" cy="70" r="3" fill="#ff0000"/>
                      <line x1="170" y1="70" x2="190" y2="70" stroke="#ff0000"/>
                      <text x="155" y="90" className="text-sm">方向</text>
                      <rect x="250" y="50" width="40" height="40" fill="#4a90e2"/>
                      <circle cx="270" cy="70" r="3" fill="#ff0000"/>
                      <text x="255" y="90" className="text-sm">描述子</text>
                    </svg>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">HOG特征</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>方向梯度直方图</li>
                    <li>用于目标检测和行人检测</li>
                    <li>提取步骤：
                      <ul className="list-disc pl-6 mt-2">
                        <li>图像梯度计算</li>
                        <li>单元直方图统计</li>
                        <li>块归一化</li>
                        <li>特征向量连接</li>
                      </ul>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <svg viewBox="0 0 300 150" className="w-full h-32">
                      {/* HOG特征示意图 */}
                      <rect x="50" y="50" width="40" height="40" fill="#4a90e2"/>
                      <line x1="60" y1="60" x2="80" y2="80" stroke="#ff0000"/>
                      <text x="55" y="90" className="text-sm">梯度</text>
                      <rect x="150" y="50" width="40" height="40" fill="#4a90e2"/>
                      <rect x="160" y="60" width="20" height="20" fill="#ff0000" opacity="0.5"/>
                      <text x="155" y="90" className="text-sm">单元</text>
                      <rect x="250" y="50" width="40" height="40" fill="#4a90e2"/>
                      <rect x="260" y="60" width="20" height="20" fill="#ff0000" opacity="0.5"/>
                      <text x="255" y="90" className="text-sm">直方图</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">其他传统特征</h3>
              <button
                onClick={() => toggleContent('other-features')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看详情</span>
                <span>{expandedContent === 'other-features' ? '▼' : '▶'}</span>
              </button>
              {expandedContent === 'other-features' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">LBP特征</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>局部二值模式</li>
                        <li>对纹理特征进行编码</li>
                        <li>计算简单，对光照变化鲁棒</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Haar特征</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>用于人脸检测</li>
                        <li>计算相邻矩形区域的像素差</li>
                        <li>计算快速，适合实时应用</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'deep' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">深度特征提取</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">CNN特征</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>卷积神经网络提取的特征</li>
                    <li>层次化特征表示：
                      <ul className="list-disc pl-6 mt-2">
                        <li>浅层：边缘、纹理</li>
                        <li>中层：部件、形状</li>
                        <li>深层：语义、类别</li>
                      </ul>
                    </li>
                    <li>常用网络：
                      <ul className="list-disc pl-6 mt-2">
                        <li>VGG</li>
                        <li>ResNet</li>
                        <li>DenseNet</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">注意力特征</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>自注意力机制</li>
                    <li>关注重要区域：
                      <ul className="list-disc pl-6 mt-2">
                        <li>通道注意力</li>
                        <li>空间注意力</li>
                        <li>时间注意力</li>
                      </ul>
                    </li>
                    <li>应用场景：
                      <ul className="list-disc pl-6 mt-2">
                        <li>目标检测</li>
                        <li>图像分割</li>
                        <li>视频理解</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">特征融合</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>多尺度特征融合
                    <ul className="list-disc pl-6 mt-2">
                      <li>FPN（特征金字塔网络）</li>
                      <li>U-Net结构</li>
                      <li>多尺度特征聚合</li>
                    </ul>
                  </li>
                  <li>多模态特征融合
                    <ul className="list-disc pl-6 mt-2">
                      <li>图像-文本特征</li>
                      <li>RGB-D特征</li>
                      <li>多传感器融合</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'matching' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">特征匹配方法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">传统匹配方法</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>最近邻匹配
                      <ul className="list-disc pl-6 mt-2">
                        <li>欧氏距离</li>
                        <li>余弦相似度</li>
                        <li>汉明距离</li>
                      </ul>
                    </li>
                    <li>比率测试
                      <ul className="list-disc pl-6 mt-2">
                        <li>最近邻/次近邻比值</li>
                        <li>阈值筛选</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">深度匹配方法</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>孪生网络
                      <ul className="list-disc pl-6 mt-2">
                        <li>共享权重</li>
                        <li>对比损失</li>
                      </ul>
                    </li>
                    <li>图匹配网络
                      <ul className="list-disc pl-6 mt-2">
                        <li>图结构表示</li>
                        <li>消息传递机制</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">匹配优化</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>RANSAC算法
                    <ul className="list-disc pl-6 mt-2">
                      <li>随机采样一致性</li>
                      <li>外点剔除</li>
                      <li>模型估计</li>
                    </ul>
                  </li>
                  <li>几何验证
                    <ul className="list-disc pl-6 mt-2">
                      <li>单应性矩阵</li>
                      <li>基础矩阵</li>
                      <li>本质矩阵</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">应用案例</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">图像拼接</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>特征点检测与匹配</li>
                    <li>图像对齐</li>
                    <li>接缝融合</li>
                    <li>应用场景：
                      <ul className="list-disc pl-6 mt-2">
                        <li>全景图像</li>
                        <li>卫星图像</li>
                        <li>医学图像</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">目标跟踪</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>特征提取与匹配</li>
                    <li>运动估计</li>
                    <li>目标定位</li>
                    <li>应用场景：
                      <ul className="list-disc pl-6 mt-2">
                        <li>视频监控</li>
                        <li>自动驾驶</li>
                        <li>增强现实</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">实践建议</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>特征选择
                    <ul className="list-disc pl-6 mt-2">
                      <li>根据任务特点选择特征</li>
                      <li>考虑计算效率</li>
                      <li>权衡精度和速度</li>
                    </ul>
                  </li>
                  <li>匹配策略
                    <ul className="list-disc pl-6 mt-2">
                      <li>选择合适的距离度量</li>
                      <li>设置合理的阈值</li>
                      <li>使用多阶段验证</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/cv/image-processing"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回图像处理基础
        </Link>
        <Link 
          href="/study/ai/cv/object-detection"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          目标检测 →
        </Link>
      </div>
    </div>
  );
} 