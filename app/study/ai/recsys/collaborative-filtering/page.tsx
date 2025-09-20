'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CollaborativeFilteringPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'user-based', label: '基于用户' },
    { id: 'item-based', label: '基于物品' },
    { id: 'model-based', label: '基于模型' },
    { id: 'implementation', label: '实现方法' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">协同过滤推荐</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">协同过滤简介</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  协同过滤是一种基于用户行为数据的推荐方法，它通过分析用户之间的相似性或物品之间的相似性来生成推荐。
                  协同过滤不需要物品的内容特征，只需要用户的历史行为数据，因此具有很好的通用性。
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">协同过滤的主要特点</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>基于用户行为数据，不需要物品内容特征</li>
                    <li>可以发现用户的潜在兴趣</li>
                    <li>能够推荐新颖的物品</li>
                    <li>具有较好的可扩展性</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">协同过滤的基本原理</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">核心思想</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>相似的用户可能对相似的物品感兴趣</li>
                    <li>相似的物品可能被相似的用户喜欢</li>
                    <li>基于历史行为数据预测用户偏好</li>
                    <li>利用群体智慧进行个性化推荐</li>
                  </ul>
                </div>

                {/* 协同过滤原理图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">协同过滤原理示意图</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.2}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.2}} />
                      </linearGradient>
                    </defs>
                    {/* 用户-物品矩阵 */}
                    <rect x="50" y="50" width="700" height="200" rx="5" fill="url(#grad1)" stroke="#6B7280" />
                    
                    {/* 用户行 */}
                    <text x="30" y="100" textAnchor="end" fill="#4B5563" className="text-sm">用户A</text>
                    <text x="30" y="150" textAnchor="end" fill="#4B5563" className="text-sm">用户B</text>
                    <text x="30" y="200" textAnchor="end" fill="#4B5563" className="text-sm">用户C</text>
                    
                    {/* 物品列 */}
                    <text x="100" y="30" textAnchor="middle" fill="#4B5563" className="text-sm">物品1</text>
                    <text x="200" y="30" textAnchor="middle" fill="#4B5563" className="text-sm">物品2</text>
                    <text x="300" y="30" textAnchor="middle" fill="#4B5563" className="text-sm">物品3</text>
                    <text x="400" y="30" textAnchor="middle" fill="#4B5563" className="text-sm">物品4</text>
                    <text x="500" y="30" textAnchor="middle" fill="#4B5563" className="text-sm">物品5</text>
                    
                    {/* 评分点 */}
                    <circle cx="100" cy="100" r="4" fill="#4F46E5" />
                    <circle cx="200" cy="100" r="4" fill="#4F46E5" />
                    <circle cx="300" cy="150" r="4" fill="#4F46E5" />
                    <circle cx="400" cy="150" r="4" fill="#4F46E5" />
                    <circle cx="500" cy="200" r="4" fill="#4F46E5" />
                    
                    {/* 相似度连线 */}
                    <path d="M100,100 L300,150" stroke="#4F46E5" strokeWidth="1" strokeDasharray="5,5" />
                    <path d="M200,100 L400,150" stroke="#4F46E5" strokeWidth="1" strokeDasharray="5,5" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">协同过滤的分类</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基于用户的协同过滤</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>找到与目标用户相似的用户群体</li>
                    <li>基于相似用户的行为进行推荐</li>
                    <li>适合用户数量较少的场景</li>
                    <li>计算复杂度随用户数量增长</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基于物品的协同过滤</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>计算物品之间的相似度</li>
                    <li>基于用户历史行为推荐相似物品</li>
                    <li>适合物品数量较少的场景</li>
                    <li>计算复杂度随物品数量增长</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基于模型的协同过滤</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>使用机器学习模型学习用户偏好</li>
                    <li>包括矩阵分解、深度学习等方法</li>
                    <li>可以处理大规模数据</li>
                    <li>需要更多的计算资源</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'user-based' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">基于用户的协同过滤</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">算法步骤</h4>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>构建用户-物品评分矩阵</li>
                    <li>计算用户之间的相似度</li>
                    <li>选择最相似的K个用户</li>
                    <li>基于相似用户的评分预测目标用户的评分</li>
                    <li>生成推荐列表</li>
                  </ol>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">相似度计算方法</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>余弦相似度（Cosine Similarity）</li>
                    <li>皮尔逊相关系数（Pearson Correlation）</li>
                    <li>欧氏距离（Euclidean Distance）</li>
                    <li>Jaccard相似度</li>
                  </ul>
                </div>

                {/* 基于用户的协同过滤流程图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">基于用户的协同过滤流程</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                      </marker>
                    </defs>
                    {/* 流程框 */}
                    <rect x="50" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="125" y="85" textAnchor="middle" fill="#374151">用户评分矩阵</text>
                    
                    <rect x="250" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="325" y="85" textAnchor="middle" fill="#374151">计算用户相似度</text>
                    
                    <rect x="450" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="525" y="85" textAnchor="middle" fill="#374151">选择相似用户</text>
                    
                    <rect x="650" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="725" y="85" textAnchor="middle" fill="#374151">生成推荐</text>
                    
                    {/* 连接线 */}
                    <line x1="200" y1="80" x2="250" y2="80" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="400" y1="80" x2="450" y2="80" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="600" y1="80" x2="650" y2="80" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  </svg>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">优缺点分析</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">优点</h5>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>能够发现用户的潜在兴趣</li>
                        <li>不需要物品的内容特征</li>
                        <li>可以推荐新颖的物品</li>
                        <li>实现相对简单</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">缺点</h5>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>计算复杂度高</li>
                        <li>数据稀疏性问题</li>
                        <li>冷启动问题</li>
                        <li>可扩展性受限</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'item-based' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">基于物品的协同过滤</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">算法步骤</h4>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>构建物品-物品相似度矩阵</li>
                    <li>计算物品之间的相似度</li>
                    <li>基于用户历史行为选择相似物品</li>
                    <li>预测用户对物品的评分</li>
                    <li>生成推荐列表</li>
                  </ol>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">相似度计算方法</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>余弦相似度</li>
                    <li>调整余弦相似度</li>
                    <li>皮尔逊相关系数</li>
                    <li>条件概率</li>
                  </ul>
                </div>

                {/* 基于物品的协同过滤流程图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">基于物品的协同过滤流程</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                      </marker>
                    </defs>
                    {/* 流程框 */}
                    <rect x="50" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="125" y="85" textAnchor="middle" fill="#374151">物品相似度矩阵</text>
                    
                    <rect x="250" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="325" y="85" textAnchor="middle" fill="#374151">计算物品相似度</text>
                    
                    <rect x="450" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="525" y="85" textAnchor="middle" fill="#374151">选择相似物品</text>
                    
                    <rect x="650" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="725" y="85" textAnchor="middle" fill="#374151">生成推荐</text>
                    
                    {/* 连接线 */}
                    <line x1="200" y1="80" x2="250" y2="80" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead2)" />
                    <line x1="400" y1="80" x2="450" y2="80" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead2)" />
                    <line x1="600" y1="80" x2="650" y2="80" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead2)" />
                  </svg>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">优缺点分析</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">优点</h5>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>物品相似度相对稳定</li>
                        <li>可以预计算物品相似度</li>
                        <li>推荐结果更稳定</li>
                        <li>适合物品数量较少的场景</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">缺点</h5>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>难以发现用户的潜在兴趣</li>
                        <li>推荐结果可能过于相似</li>
                        <li>需要定期更新相似度矩阵</li>
                        <li>冷启动问题仍然存在</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'model-based' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">基于模型的协同过滤</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">主要方法</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>矩阵分解（Matrix Factorization）</li>
                    <li>深度学习模型</li>
                    <li>概率图模型</li>
                    <li>集成学习方法</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">矩阵分解</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SVD（奇异值分解）</li>
                    <li>NMF（非负矩阵分解）</li>
                    <li>PMF（概率矩阵分解）</li>
                    <li>BPR（贝叶斯个性化排序）</li>
                  </ul>
                </div>

                {/* 矩阵分解示意图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">矩阵分解示意图</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.8}} />
                      </linearGradient>
                    </defs>
                    {/* 原始矩阵 */}
                    <rect x="50" y="50" width="200" height="200" rx="5" fill="url(#grad3)" />
                    <text x="150" y="150" textAnchor="middle" fill="white" className="font-medium">R</text>
                    
                    {/* 等号 */}
                    <text x="300" y="150" textAnchor="middle" fill="#374151" className="text-2xl">=</text>
                    
                    {/* 用户矩阵 */}
                    <rect x="350" y="50" width="150" height="200" rx="5" fill="url(#grad3)" />
                    <text x="425" y="150" textAnchor="middle" fill="white" className="font-medium">P</text>
                    
                    {/* 乘号 */}
                    <text x="550" y="150" textAnchor="middle" fill="#374151" className="text-2xl">×</text>
                    
                    {/* 物品矩阵 */}
                    <rect x="600" y="50" width="150" height="200" rx="5" fill="url(#grad3)" />
                    <text x="675" y="150" textAnchor="middle" fill="white" className="font-medium">Q</text>
                  </svg>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">优缺点分析</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">优点</h5>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>可以处理大规模数据</li>
                        <li>能够学习潜在特征</li>
                        <li>预测精度较高</li>
                        <li>可以处理稀疏数据</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">缺点</h5>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>需要大量训练数据</li>
                        <li>计算资源消耗大</li>
                        <li>模型解释性较差</li>
                        <li>需要定期重新训练</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'implementation' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">实现方法</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Python实现示例</h4>
                  <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    {`import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class UserBasedCF:
    def __init__(self, n_neighbors=20):
        self.n_neighbors = n_neighbors
        self.user_similarity = None
        
    def fit(self, ratings):
        # 计算用户相似度矩阵
        self.user_similarity = cosine_similarity(ratings)
        
    def predict(self, user_id, item_id, ratings):
        # 获取相似用户
        similar_users = np.argsort(self.user_similarity[user_id])[-self.n_neighbors:]
        
        # 计算预测评分
        prediction = 0
        similarity_sum = 0
        
        for similar_user in similar_users:
            if ratings[similar_user, item_id] > 0:
                prediction += self.user_similarity[user_id, similar_user] * ratings[similar_user, item_id]
                similarity_sum += self.user_similarity[user_id, similar_user]
                
        return prediction / similarity_sum if similarity_sum > 0 else 0`}
                  </pre>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">性能优化</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>使用稀疏矩阵存储</li>
                    <li>预计算相似度矩阵</li>
                    <li>使用近似最近邻搜索</li>
                    <li>分布式计算</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">工程实践</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>数据预处理和清洗</li>
                    <li>特征工程和选择</li>
                    <li>模型评估和调优</li>
                    <li>在线服务部署</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/recsys/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回基础概念
        </Link>
        <Link 
          href="/study/ai/recsys/content-based"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          基于内容的推荐 →
        </Link>
      </div>
    </div>
  );
} 