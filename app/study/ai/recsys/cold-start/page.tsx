'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ColdStartPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'solutions', label: '解决方案' },
    { id: 'implementation', label: '实现方法' },
    { id: 'cases', label: '实践案例' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">冷启动问题</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">冷启动问题简介</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  冷启动问题是推荐系统面临的重要挑战之一，指系统在缺乏足够用户行为数据时难以做出准确推荐的情况。
                  主要包括用户冷启动、物品冷启动和系统冷启动三种类型。
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">冷启动类型</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>用户冷启动：新用户缺乏历史行为数据</li>
                    <li>物品冷启动：新物品缺乏用户交互数据</li>
                    <li>系统冷启动：全新推荐系统缺乏任何数据</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">问题影响</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">主要影响</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>推荐准确性下降</li>
                    <li>用户体验不佳</li>
                    <li>用户留存率降低</li>
                    <li>系统效果难以评估</li>
                    <li>商业价值受损</li>
                  </ul>
                </div>

                {/* 冷启动问题示意图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">冷启动问题示意图</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.8}} />
                      </linearGradient>
                    </defs>
                    {/* 用户冷启动 */}
                    <rect x="50" y="50" width="200" height="200" rx="5" fill="url(#grad1)" />
                    <text x="150" y="150" textAnchor="middle" fill="white" className="font-medium">用户冷启动</text>
                    
                    {/* 物品冷启动 */}
                    <rect x="300" y="50" width="200" height="200" rx="5" fill="url(#grad1)" />
                    <text x="400" y="150" textAnchor="middle" fill="white" className="font-medium">物品冷启动</text>
                    
                    {/* 系统冷启动 */}
                    <rect x="550" y="50" width="200" height="200" rx="5" fill="url(#grad1)" />
                    <text x="650" y="150" textAnchor="middle" fill="white" className="font-medium">系统冷启动</text>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">挑战分析</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">主要挑战</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>数据稀疏性</li>
                    <li>特征提取困难</li>
                    <li>模型训练受限</li>
                    <li>评估指标缺失</li>
                    <li>解决方案复杂</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'solutions' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">解决方案</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">用户冷启动解决方案</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>用户注册信息利用</li>
                      <li>兴趣标签收集</li>
                      <li>社交网络数据</li>
                      <li>人口统计学特征</li>
                      <li>引导式交互</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">物品冷启动解决方案</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>物品内容特征提取</li>
                      <li>物品相似度计算</li>
                      <li>物品分类体系</li>
                      <li>物品属性分析</li>
                      <li>物品流行度预测</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">系统冷启动解决方案</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>数据迁移</li>
                      <li>规则引擎</li>
                      <li>专家系统</li>
                      <li>混合推荐策略</li>
                      <li>渐进式学习</li>
                    </ul>
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
                  <h4 className="font-semibold mb-2">基于内容的推荐</h4>
                  <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    <pre>{`def content_based_recommendation(user_profile, items):
    # 计算用户兴趣与物品的相似度
    recommendations = []
    for item in items:
        similarity = calculate_similarity(user_profile, item.features)
        recommendations.append((item, similarity))
    
    # 按相似度排序
    recommendations.sort(key=lambda x: x[1], reverse=True)
    return recommendations

def calculate_similarity(user_profile, item_features):
    # 使用余弦相似度计算用户兴趣与物品特征的匹配程度
    return cosine_similarity(user_profile, item_features)`}</pre>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基于规则的推荐</h4>
                  <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    <pre>{`def rule_based_recommendation(user, items):
    recommendations = []
    for item in items:
        score = 0
        # 应用规则计算推荐分数
        if item.category in user.preferred_categories:
            score += 1
        if item.popularity > threshold:
            score += 1
        if item.price <= user.price_range:
            score += 1
        recommendations.append((item, score))
    
    return sorted(recommendations, key=lambda x: x[1], reverse=True)`}</pre>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">混合推荐策略</h4>
                  <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    <pre>{`def hybrid_recommendation(user, items):
    # 结合多种推荐策略
    content_scores = content_based_recommendation(user, items)
    rule_scores = rule_based_recommendation(user, items)
    
    # 加权融合
    final_scores = {}
    for item in items:
        content_score = content_scores.get(item, 0)
        rule_score = rule_scores.get(item, 0)
        final_scores[item] = 0.6 * content_score + 0.4 * rule_score
    
    return sorted(final_scores.items(), key=lambda x: x[1], reverse=True)`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">实践案例</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">电商平台案例</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      电商平台冷启动解决方案：
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>用户注册信息收集</li>
                      <li>商品分类体系</li>
                      <li>热门商品推荐</li>
                      <li>相似商品推荐</li>
                      <li>个性化首页定制</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">视频平台案例</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      视频平台冷启动解决方案：
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>用户兴趣标签</li>
                      <li>视频内容分析</li>
                      <li>热门视频推荐</li>
                      <li>相似视频推荐</li>
                      <li>引导式观看</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">新闻平台案例</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      新闻平台冷启动解决方案：
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>用户地理位置</li>
                      <li>新闻分类体系</li>
                      <li>热点新闻推荐</li>
                      <li>相似新闻推荐</li>
                      <li>个性化推送</li>
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
          href="/study/ai/recsys/evaluation"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回推荐系统评估
        </Link>
        <Link 
          href="/study/ai/recsys/real-time"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          实时推荐 →
        </Link>
      </div>
    </div>
  );
} 