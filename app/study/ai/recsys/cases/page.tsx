'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RecommendationCasesPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'ecommerce', label: '电商推荐' },
    { id: 'video', label: '视频推荐' },
    { id: 'news', label: '新闻推荐' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">推荐系统实践</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">实践概述</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  推荐系统实践涵盖了从系统设计到部署运维的全过程，需要综合考虑业务需求、技术实现和用户体验等多个方面。
                  本节将介绍不同场景下的推荐系统实践案例和最佳实践。
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">实践要点</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>业务场景分析</li>
                    <li>技术方案设计</li>
                    <li>系统实现部署</li>
                    <li>效果评估优化</li>
                    <li>运维监控保障</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">实践流程</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">主要步骤</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>需求分析与场景定义</li>
                    <li>数据收集与预处理</li>
                    <li>特征工程与模型选择</li>
                    <li>系统实现与测试</li>
                    <li>部署上线与监控</li>
                    <li>效果评估与优化</li>
                  </ul>
                </div>

                {/* 实践流程图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">实践流程图</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.8}} />
                      </linearGradient>
                    </defs>
                    {/* 需求分析 */}
                    <rect x="50" y="50" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="125" y="80" textAnchor="middle" fill="white" className="font-medium">需求分析</text>
                    
                    {/* 数据收集 */}
                    <rect x="250" y="50" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="325" y="80" textAnchor="middle" fill="white" className="font-medium">数据收集</text>
                    
                    {/* 特征工程 */}
                    <rect x="450" y="50" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="525" y="80" textAnchor="middle" fill="white" className="font-medium">特征工程</text>
                    
                    {/* 模型训练 */}
                    <rect x="650" y="50" width="100" height="50" rx="5" fill="url(#grad1)" />
                    <text x="700" y="80" textAnchor="middle" fill="white" className="font-medium">模型训练</text>
                    
                    {/* 系统实现 */}
                    <rect x="50" y="120" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="125" y="150" textAnchor="middle" fill="white" className="font-medium">系统实现</text>
                    
                    {/* 测试评估 */}
                    <rect x="250" y="120" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="325" y="150" textAnchor="middle" fill="white" className="font-medium">测试评估</text>
                    
                    {/* 部署上线 */}
                    <rect x="450" y="120" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="525" y="150" textAnchor="middle" fill="white" className="font-medium">部署上线</text>
                    
                    {/* 监控优化 */}
                    <rect x="650" y="120" width="100" height="50" rx="5" fill="url(#grad1)" />
                    <text x="700" y="150" textAnchor="middle" fill="white" className="font-medium">监控优化</text>
                    
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

            <div>
              <h3 className="text-xl font-semibold mb-3">最佳实践</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">关键实践</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>数据质量保证</li>
                    <li>特征工程优化</li>
                    <li>模型选择与调优</li>
                    <li>系统性能优化</li>
                    <li>用户体验提升</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ecommerce' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">电商推荐实践</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">场景特点</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>商品品类丰富</li>
                      <li>用户行为多样</li>
                      <li>实时性要求高</li>
                      <li>个性化需求强</li>
                      <li>商业价值显著</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">技术方案</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>多路召回策略</li>
                      <li>实时特征工程</li>
                      <li>深度学习模型</li>
                      <li>A/B测试框架</li>
                      <li>效果评估体系</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">实现示例</h4>
                  <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    <pre>{`class EcommerceRecommender:
    def __init__(self):
        self.recall_models = {
            'item_cf': ItemCFModel(),
            'content_based': ContentBasedModel(),
            'deep_model': DeepModel()
        }
        self.rank_model = RankModel()
    
    def recommend(self, user_id, context):
        # 多路召回
        candidates = []
        for model in self.recall_models.values():
            candidates.extend(model.recall(user_id, context))
        
        # 特征工程
        features = self.extract_features(user_id, candidates, context)
        
        # 排序
        scores = self.rank_model.predict(features)
        
        # 结果处理
        recommendations = self.post_process(candidates, scores)
        
        return recommendations`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'video' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">视频推荐实践</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">场景特点</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>内容理解复杂</li>
                      <li>用户兴趣多变</li>
                      <li>实时性要求高</li>
                      <li>多样性需求强</li>
                      <li>冷启动问题突出</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">技术方案</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>视频内容理解</li>
                      <li>用户兴趣建模</li>
                      <li>实时推荐系统</li>
                      <li>多样性优化</li>
                      <li>冷启动解决方案</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">实现示例</h4>
                  <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    <pre>{`class VideoRecommender:
    def __init__(self):
        self.content_analyzer = ContentAnalyzer()
        self.user_model = UserModel()
        self.rec_model = RecommendationModel()
    
    def recommend(self, user_id, context):
        # 内容分析
        video_features = self.content_analyzer.analyze(context.videos)
        
        # 用户建模
        user_interest = self.user_model.get_interest(user_id)
        
        # 推荐生成
        recommendations = self.rec_model.predict(
            user_interest,
            video_features,
            context
        )
        
        # 多样性优化
        final_recommendations = self.diversity_optimize(recommendations)
        
        return final_recommendations`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">新闻推荐实践</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">场景特点</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>时效性要求高</li>
                      <li>内容更新快</li>
                      <li>用户兴趣广泛</li>
                      <li>多样性需求强</li>
                      <li>冷启动问题突出</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">技术方案</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>实时内容处理</li>
                      <li>用户兴趣建模</li>
                      <li>时效性优化</li>
                      <li>多样性保证</li>
                      <li>冷启动解决方案</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">实现示例</h4>
                  <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    <pre>{`class NewsRecommender:
    def __init__(self):
        self.content_processor = ContentProcessor()
        self.user_model = UserModel()
        self.rec_model = RecommendationModel()
    
    def recommend(self, user_id, context):
        # 内容处理
        news_features = self.content_processor.process(context.news)
        
        # 用户建模
        user_interest = self.user_model.get_interest(user_id)
        
        # 推荐生成
        recommendations = self.rec_model.predict(
            user_interest,
            news_features,
            context
        )
        
        # 时效性优化
        final_recommendations = self.timeliness_optimize(recommendations)
        
        return final_recommendations`}</pre>
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
          href="/study/ai/recsys/architecture"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回推荐系统架构
        </Link>
        <Link 
          href="/study/ai/recsys/interview"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          推荐系统面试题 →
        </Link>
      </div>
    </div>
  );
} 