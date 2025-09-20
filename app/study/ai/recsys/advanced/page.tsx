'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RecommendationAdvancedPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'research', label: '研究进展' },
    { id: 'trends', label: '技术趋势' },
    { id: 'challenges', label: '挑战与展望' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">推荐系统进阶与前沿</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">前沿概述</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  推荐系统领域正在快速发展，涌现出许多新的研究方向和技术突破。
                  本节将介绍推荐系统的最新研究进展、技术趋势以及未来发展方向。
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">主要方向</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>深度学习与推荐系统融合</li>
                    <li>多模态推荐技术</li>
                    <li>因果推理与推荐</li>
                    <li>联邦学习与隐私保护</li>
                    <li>可解释性推荐</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">发展趋势</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">技术演进</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>从传统算法到深度学习</li>
                    <li>从单一模态到多模态融合</li>
                    <li>从静态推荐到动态适应</li>
                    <li>从集中式到分布式学习</li>
                    <li>从黑盒模型到可解释推荐</li>
                  </ul>
                </div>

                {/* 发展趋势图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">发展趋势图</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.8}} />
                      </linearGradient>
                    </defs>
                    {/* 传统算法 */}
                    <rect x="50" y="50" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="125" y="80" textAnchor="middle" fill="white" className="font-medium">传统算法</text>
                    
                    {/* 深度学习 */}
                    <rect x="250" y="50" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="325" y="80" textAnchor="middle" fill="white" className="font-medium">深度学习</text>
                    
                    {/* 多模态融合 */}
                    <rect x="450" y="50" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="525" y="80" textAnchor="middle" fill="white" className="font-medium">多模态融合</text>
                    
                    {/* 可解释推荐 */}
                    <rect x="650" y="50" width="100" height="50" rx="5" fill="url(#grad1)" />
                    <text x="700" y="80" textAnchor="middle" fill="white" className="font-medium">可解释推荐</text>
                    
                    {/* 联邦学习 */}
                    <rect x="50" y="120" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="125" y="150" textAnchor="middle" fill="white" className="font-medium">联邦学习</text>
                    
                    {/* 因果推理 */}
                    <rect x="250" y="120" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="325" y="150" textAnchor="middle" fill="white" className="font-medium">因果推理</text>
                    
                    {/* 动态适应 */}
                    <rect x="450" y="120" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="525" y="150" textAnchor="middle" fill="white" className="font-medium">动态适应</text>
                    
                    {/* 隐私保护 */}
                    <rect x="650" y="120" width="100" height="50" rx="5" fill="url(#grad1)" />
                    <text x="700" y="150" textAnchor="middle" fill="white" className="font-medium">隐私保护</text>
                    
                    {/* 连接线 */}
                    <line x1="200" y1="75" x2="250" y2="75" stroke="#4B5563" strokeWidth="2" />
                    <line x1="400" y1="75" x2="450" y2="75" stroke="#4B5563" strokeWidth="2" />
                    <line x1="600" y1="75" x2="650" y2="75" stroke="#4B5563" strokeWidth="2" />
                    <line x1="200" y1="145" x2="250" y2="145" stroke="#4B5563" strokeWidth="2" />
                    <line x1="400" y1="145" x2="450" y2="145" stroke="#4B5563" strokeWidth="2" />
                    <line x1="600" y1="145" x2="650" y2="145" stroke="#4B5563" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'research' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">最新研究进展</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 多模态推荐</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      多模态推荐系统利用文本、图像、视频等多种模态的信息进行推荐，
                      能够更全面地理解用户兴趣和物品特征。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">关键技术：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>跨模态特征提取</li>
                        <li>多模态融合策略</li>
                        <li>模态对齐与迁移</li>
                        <li>多模态预训练</li>
                        <li>跨模态检索</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 因果推理推荐</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      因果推理推荐系统通过建立用户行为与推荐结果之间的因果关系，
                      提高推荐的准确性和可解释性。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">研究方向：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>因果图构建</li>
                        <li>反事实推理</li>
                        <li>干预效应估计</li>
                        <li>因果发现</li>
                        <li>因果解释</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 联邦学习推荐</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      联邦学习推荐系统在保护用户隐私的前提下，实现分布式模型训练和推荐。
                      是解决数据隐私问题的重要技术方向。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">研究重点：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>联邦学习算法</li>
                        <li>隐私保护机制</li>
                        <li>通信效率优化</li>
                        <li>模型聚合策略</li>
                        <li>安全与防御</li>
                      </ul>
                    </div>
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
                  <h4 className="font-semibold mb-2">1. 大模型与推荐系统</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      大型语言模型和预训练模型在推荐系统中的应用，为个性化推荐带来新的机遇和挑战。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">发展趋势：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>预训练模型迁移</li>
                        <li>知识增强推荐</li>
                        <li>多任务学习</li>
                        <li>零样本推荐</li>
                        <li>模型压缩与部署</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 实时与动态推荐</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      实时推荐系统需要快速响应用户行为变化，动态调整推荐策略。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">技术方向：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>流式处理</li>
                        <li>增量学习</li>
                        <li>在线学习</li>
                        <li>实时特征工程</li>
                        <li>动态排序策略</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 可解释性推荐</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      可解释性推荐系统通过提供推荐理由，增强用户信任和系统透明度。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">发展方向：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>可解释性模型</li>
                        <li>推荐理由生成</li>
                        <li>用户反馈机制</li>
                        <li>透明度评估</li>
                        <li>公平性保证</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">挑战与展望</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 技术挑战</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      推荐系统面临多方面的技术挑战，需要持续创新和突破。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">主要挑战：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>数据稀疏性</li>
                        <li>冷启动问题</li>
                        <li>实时性要求</li>
                        <li>可扩展性</li>
                        <li>模型复杂度</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 伦理与隐私</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      推荐系统需要平衡个性化推荐与用户隐私保护，确保公平性和透明度。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">关注重点：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>隐私保护</li>
                        <li>算法公平性</li>
                        <li>用户权益</li>
                        <li>数据安全</li>
                        <li>伦理规范</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 未来展望</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      推荐系统的未来发展将更加注重智能化、个性化和人性化。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">发展方向：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>智能交互</li>
                        <li>多模态融合</li>
                        <li>知识驱动</li>
                        <li>场景适配</li>
                        <li>人机协同</li>
                      </ul>
                    </div>
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
          href="/study/ai/recsys/interview"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回推荐系统面试题
        </Link>
        <Link 
          href="/study/ai/recsys/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          返回推荐系统基础 →
        </Link>
      </div>
    </div>
  );
} 