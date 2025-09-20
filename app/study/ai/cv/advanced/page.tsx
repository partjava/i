'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdvancedPage() {
  const [activeTab, setActiveTab] = useState('frontier');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'frontier', label: '前沿技术' },
    { id: 'trends', label: '发展趋势' },
    { id: 'research', label: '研究热点' },
    { id: 'future', label: '未来展望' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">计算机视觉进阶与前沿</h1>
      
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
        {activeTab === 'frontier' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Transformer架构</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Vision Transformer (ViT)</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>将图像分割为固定大小的patch</li>
                      <li>使用位置编码保持空间信息</li>
                      <li>自注意力机制处理全局关系</li>
                      <li>在大规模数据集上表现优异</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Swin Transformer</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>层次化设计</li>
                      <li>滑动窗口注意力机制</li>
                      <li>多尺度特征提取</li>
                      <li>计算效率更高</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">自监督学习</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">对比学习</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>SimCLR：端到端对比学习</li>
                      <li>MoCo：动量对比学习</li>
                      <li>BYOL：自监督表示学习</li>
                      <li>无需标注数据</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">掩码图像建模</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>MAE：掩码自编码器</li>
                      <li>BEiT：双向编码器</li>
                      <li>自监督预训练</li>
                      <li>迁移学习效果好</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">技术趋势</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">多模态融合</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>视觉-语言预训练</li>
                      <li>跨模态理解</li>
                      <li>多模态生成</li>
                      <li>统一表示学习</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">小样本学习</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>元学习</li>
                      <li>迁移学习</li>
                      <li>数据增强</li>
                      <li>少样本适应</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">应用趋势</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">边缘计算</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>模型轻量化</li>
                      <li>实时推理</li>
                      <li>低功耗设计</li>
                      <li>分布式部署</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">可解释性</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>注意力可视化</li>
                      <li>决策解释</li>
                      <li>可信AI</li>
                      <li>公平性分析</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'research' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">基础研究</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">表示学习</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>自监督预训练</li>
                      <li>对比学习</li>
                      <li>知识蒸馏</li>
                      <li>特征解耦</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">模型架构</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>注意力机制</li>
                      <li>动态网络</li>
                      <li>神经架构搜索</li>
                      <li>混合架构</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">应用研究</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3D视觉</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>点云处理</li>
                      <li>3D重建</li>
                      <li>深度估计</li>
                      <li>场景理解</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">视频理解</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>时序建模</li>
                      <li>动作识别</li>
                      <li>视频生成</li>
                      <li>多视角学习</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'future' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">技术展望</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">通用视觉模型</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>统一架构</li>
                      <li>多任务学习</li>
                      <li>持续学习</li>
                      <li>知识迁移</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">认知智能</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>场景理解</li>
                      <li>因果推理</li>
                      <li>常识推理</li>
                      <li>多模态交互</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">应用展望</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">智能交互</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>AR/VR应用</li>
                      <li>人机协作</li>
                      <li>智能助手</li>
                      <li>情感交互</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">产业升级</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>智能制造</li>
                      <li>智慧城市</li>
                      <li>医疗健康</li>
                      <li>自动驾驶</li>
                    </ul>
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
          href="/study/ai/cv/interview"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回计算机视觉面试题
        </Link>
      </div>
    </div>
  );
} 