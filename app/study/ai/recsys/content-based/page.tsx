'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContentBasedPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'feature-extraction', label: '特征提取' },
    { id: 'user-profile', label: '用户画像' },
    { id: 'recommendation', label: '推荐生成' },
    { id: 'implementation', label: '实现方法' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">基于内容的推荐</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">基于内容的推荐简介</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  基于内容的推荐是一种通过分析物品的内容特征和用户的兴趣特征来生成推荐的方法。
                  它主要依赖于物品的内容特征和用户的历史行为数据，通过计算物品特征与用户兴趣的匹配度来进行推荐。
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基于内容的推荐的主要特点</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>基于物品的内容特征</li>
                    <li>不需要其他用户的数据</li>
                    <li>可以推荐新物品</li>
                    <li>推荐结果可解释性强</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">基本原理</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">核心思想</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>分析物品的内容特征</li>
                    <li>构建用户兴趣模型</li>
                    <li>计算物品与用户兴趣的相似度</li>
                    <li>推荐最相似的物品</li>
                  </ul>
                </div>

                {/* 基于内容的推荐原理图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">基于内容的推荐原理示意图</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.2}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.2}} />
                      </linearGradient>
                    </defs>
                    {/* 物品特征 */}
                    <rect x="50" y="50" width="200" height="100" rx="5" fill="url(#grad1)" stroke="#6B7280" />
                    <text x="150" y="100" textAnchor="middle" fill="#374151" className="font-medium">物品特征</text>
                    
                    {/* 用户兴趣 */}
                    <rect x="550" y="50" width="200" height="100" rx="5" fill="url(#grad1)" stroke="#6B7280" />
                    <text x="650" y="100" textAnchor="middle" fill="#374151" className="font-medium">用户兴趣</text>
                    
                    {/* 相似度计算 */}
                    <rect x="300" y="150" width="200" height="100" rx="5" fill="url(#grad1)" stroke="#6B7280" />
                    <text x="400" y="200" textAnchor="middle" fill="#374151" className="font-medium">相似度计算</text>
                    
                    {/* 连接线 */}
                    <path d="M250,100 L300,200" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <path d="M550,100 L500,200" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">应用场景</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">典型应用</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>新闻推荐</li>
                    <li>视频推荐</li>
                    <li>音乐推荐</li>
                    <li>商品推荐</li>
                    <li>文章推荐</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">适用条件</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>物品具有丰富的特征信息</li>
                    <li>用户有明确的内容偏好</li>
                    <li>物品特征可以准确提取</li>
                    <li>用户兴趣可以建模</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'feature-extraction' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">特征提取方法</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">文本特征</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>TF-IDF</li>
                    <li>词向量（Word2Vec, GloVe）</li>
                    <li>主题模型（LDA）</li>
                    <li>BERT等预训练模型</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">图像特征</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>颜色直方图</li>
                    <li>纹理特征</li>
                    <li>CNN特征</li>
                    <li>预训练模型特征</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">音频特征</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>MFCC特征</li>
                    <li>频谱特征</li>
                    <li>节奏特征</li>
                    <li>音色特征</li>
                  </ul>
                </div>

                {/* 特征提取流程图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">特征提取流程</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                      </marker>
                    </defs>
                    {/* 流程框 */}
                    <rect x="50" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="125" y="85" textAnchor="middle" fill="#374151">原始内容</text>
                    
                    <rect x="250" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="325" y="85" textAnchor="middle" fill="#374151">特征提取</text>
                    
                    <rect x="450" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="525" y="85" textAnchor="middle" fill="#374151">特征表示</text>
                    
                    <rect x="650" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="725" y="85" textAnchor="middle" fill="#374151">特征向量</text>
                    
                    {/* 连接线 */}
                    <line x1="200" y1="80" x2="250" y2="80" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="400" y1="80" x2="450" y2="80" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="600" y1="80" x2="650" y2="80" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'user-profile' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">用户画像构建</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">用户兴趣特征</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>显式反馈（评分、收藏）</li>
                    <li>隐式反馈（浏览、点击）</li>
                    <li>时间衰减</li>
                    <li>兴趣权重</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">用户画像更新</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>实时更新</li>
                    <li>定期更新</li>
                    <li>增量更新</li>
                    <li>全量更新</li>
                  </ul>
                </div>

                {/* 用户画像示意图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">用户画像示意图</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.2}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.2}} />
                      </linearGradient>
                    </defs>
                    {/* 用户画像雷达图 */}
                    <polygon points="400,50 500,150 450,300 350,300 300,150" fill="url(#grad2)" stroke="#6B7280" />
                    <polygon points="400,100 450,175 425,250 375,250 350,175" fill="url(#grad2)" stroke="#6B7280" />
                    <polygon points="400,150 425,200 400,225 375,200" fill="url(#grad2)" stroke="#6B7280" />
                    
                    {/* 兴趣点 */}
                    <circle cx="400" cy="50" r="4" fill="#4F46E5" />
                    <circle cx="500" cy="150" r="4" fill="#4F46E5" />
                    <circle cx="450" cy="300" r="4" fill="#4F46E5" />
                    <circle cx="350" cy="300" r="4" fill="#4F46E5" />
                    <circle cx="300" cy="150" r="4" fill="#4F46E5" />
                    
                    {/* 标签 */}
                    <text x="400" y="30" textAnchor="middle" fill="#4B5563" className="text-sm">兴趣1</text>
                    <text x="520" y="150" textAnchor="start" fill="#4B5563" className="text-sm">兴趣2</text>
                    <text x="450" y="320" textAnchor="middle" fill="#4B5563" className="text-sm">兴趣3</text>
                    <text x="350" y="320" textAnchor="middle" fill="#4B5563" className="text-sm">兴趣4</text>
                    <text x="280" y="150" textAnchor="end" fill="#4B5563" className="text-sm">兴趣5</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recommendation' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">推荐生成</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">相似度计算</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>余弦相似度</li>
                    <li>欧氏距离</li>
                    <li>Jaccard相似度</li>
                    <li>KL散度</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">推荐策略</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>基于相似度排序</li>
                    <li>基于分类预测</li>
                    <li>基于规则过滤</li>
                    <li>多样性优化</li>
                  </ul>
                </div>

                {/* 推荐生成流程图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">推荐生成流程</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                      </marker>
                    </defs>
                    {/* 流程框 */}
                    <rect x="50" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="125" y="85" textAnchor="middle" fill="#374151">物品特征</text>
                    
                    <rect x="250" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="325" y="85" textAnchor="middle" fill="#374151">用户兴趣</text>
                    
                    <rect x="450" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="525" y="85" textAnchor="middle" fill="#374151">相似度计算</text>
                    
                    <rect x="650" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="725" y="85" textAnchor="middle" fill="#374151">推荐结果</text>
                    
                    {/* 连接线 */}
                    <line x1="200" y1="80" x2="250" y2="80" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead3)" />
                    <line x1="400" y1="80" x2="450" y2="80" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead3)" />
                    <line x1="600" y1="80" x2="650" y2="80" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead3)" />
                  </svg>
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
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class ContentBasedRecommender:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
        self.item_features = None
        self.user_profiles = {}
        
    def fit(self, items, user_interactions):
        # 提取物品特征
        self.item_features = self.vectorizer.fit_transform(items)
        
        # 构建用户画像
        for user_id, interactions in user_interactions.items():
            user_items = [items[i] for i in interactions]
            user_features = self.vectorizer.transform(user_items)
            self.user_profiles[user_id] = user_features.mean(axis=0)
            
    def recommend(self, user_id, n_recommendations=5):
        # 计算用户兴趣与物品的相似度
        user_profile = self.user_profiles[user_id]
        similarities = cosine_similarity(user_profile, self.item_features)
        
        # 获取推荐结果
        item_indices = np.argsort(similarities[0])[-n_recommendations:][::-1]
        return item_indices`}
                  </pre>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">性能优化</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>特征降维</li>
                    <li>相似度预计算</li>
                    <li>索引优化</li>
                    <li>缓存机制</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">工程实践</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>特征工程</li>
                    <li>模型评估</li>
                    <li>在线服务</li>
                    <li>监控告警</li>
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
          href="/study/ai/recsys/collaborative-filtering"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回协同过滤
        </Link>
        <Link 
          href="/study/ai/recsys/matrix-factorization"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          矩阵分解 →
        </Link>
      </div>
    </div>
  );
} 