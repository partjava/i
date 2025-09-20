'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RecommendationEvaluationPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'metrics', label: '评估指标' },
    { id: 'methods', label: '评估方法' },
    { id: 'practice', label: '实践案例' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">推荐系统评估</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">推荐系统评估简介</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  推荐系统评估是衡量推荐系统性能和质量的关键环节，它通过多个维度的指标和方法来全面评估推荐系统的效果。
                  良好的评估体系能够帮助我们发现系统问题，指导系统优化，提升用户体验。
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">评估的主要目标</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>衡量推荐准确性</li>
                    <li>评估用户满意度</li>
                    <li>分析系统性能</li>
                    <li>指导系统优化</li>
                    <li>验证业务价值</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">评估维度</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">主要维度</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>准确性：预测值与实际值的接近程度</li>
                    <li>多样性：推荐结果的丰富程度</li>
                    <li>新颖性：推荐结果的创新程度</li>
                    <li>实时性：系统响应速度</li>
                    <li>可扩展性：系统处理能力</li>
                  </ul>
                </div>

                {/* 评估维度图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">评估维度示意图</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.8}} />
                      </linearGradient>
                    </defs>
                    {/* 中心圆 */}
                    <circle cx="400" cy="150" r="100" fill="url(#grad1)" />
                    <text x="400" y="150" textAnchor="middle" fill="white" className="font-medium">推荐系统</text>
                    
                    {/* 维度标签 */}
                    <text x="400" y="30" textAnchor="middle" fill="#374151" className="font-medium">准确性</text>
                    <text x="700" y="150" textAnchor="middle" fill="#374151" className="font-medium">多样性</text>
                    <text x="400" y="270" textAnchor="middle" fill="#374151" className="font-medium">新颖性</text>
                    <text x="100" y="150" textAnchor="middle" fill="#374151" className="font-medium">实时性</text>
                    
                    {/* 连接线 */}
                    <line x1="400" y1="50" x2="400" y2="250" stroke="#4B5563" strokeWidth="2" />
                    <line x1="200" y1="150" x2="600" y2="150" stroke="#4B5563" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">评估流程</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基本流程</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>确定评估目标</li>
                    <li>选择评估指标</li>
                    <li>收集评估数据</li>
                    <li>执行评估分析</li>
                    <li>总结评估结果</li>
                    <li>提出改进建议</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">评估指标</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">准确性指标</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      准确性指标用于衡量推荐系统预测的准确程度，主要包括：
                    </p>
                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                      <pre>{`# 均方根误差（RMSE）
def rmse(predictions, targets):
    return np.sqrt(np.mean((predictions - targets) ** 2))

# 平均绝对误差（MAE）
def mae(predictions, targets):
    return np.mean(np.abs(predictions - targets))

# 准确率（Precision）
def precision(recommended_items, relevant_items):
    return len(set(recommended_items) & set(relevant_items)) / len(recommended_items)

# 召回率（Recall）
def recall(recommended_items, relevant_items):
    return len(set(recommended_items) & set(relevant_items)) / len(relevant_items)

# F1分数
def f1_score(precision, recall):
    return 2 * (precision * recall) / (precision + recall)`}</pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">多样性指标</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      多样性指标用于衡量推荐结果的丰富程度，主要包括：
                    </p>
                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                      <pre>{`# 类别覆盖率
def category_coverage(recommended_items, categories):
    return len(set(categories[item] for item in recommended_items)) / len(set(categories.values()))

# 推荐列表多样性
def diversity(recommended_items, similarity_matrix):
    n = len(recommended_items)
    if n < 2:
        return 1.0
    
    total_similarity = 0
    count = 0
    for i in range(n):
        for j in range(i+1, n):
            total_similarity += similarity_matrix[recommended_items[i]][recommended_items[j]]
            count += 1
    
    return 1 - (total_similarity / count)`}</pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">新颖性指标</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      新颖性指标用于衡量推荐结果的创新程度，主要包括：
                    </p>
                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                      <pre>{`# 平均流行度
def average_popularity(recommended_items, popularity_scores):
    return np.mean([popularity_scores[item] for item in recommended_items])

# 长尾覆盖率
def long_tail_coverage(recommended_items, popularity_scores, threshold):
    long_tail_items = [item for item in recommended_items if popularity_scores[item] < threshold]
    return len(long_tail_items) / len(recommended_items)

# 新颖性分数
def novelty_score(recommended_items, user_history):
    new_items = set(recommended_items) - set(user_history)
    return len(new_items) / len(recommended_items)`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'methods' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">评估方法</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">离线评估</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      离线评估使用历史数据对推荐系统进行评估，主要包括：
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>交叉验证</li>
                      <li>留一法评估</li>
                      <li>时间序列评估</li>
                      <li>冷启动评估</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">在线评估</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      在线评估通过实际用户交互对推荐系统进行评估，主要包括：
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>A/B测试</li>
                      <li>多臂老虎机测试</li>
                      <li>用户反馈分析</li>
                      <li>实时监控</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">用户研究</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      用户研究通过直接与用户交互来评估推荐系统，主要包括：
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>用户访谈</li>
                      <li>问卷调查</li>
                      <li>眼动追踪</li>
                      <li>用户行为分析</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">实践案例</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">电商推荐评估</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      电商推荐系统的评估重点关注：
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>点击率（CTR）</li>
                      <li>转化率（CVR）</li>
                      <li>客单价</li>
                      <li>复购率</li>
                      <li>用户留存率</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">视频推荐评估</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      视频推荐系统的评估重点关注：
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>观看时长</li>
                      <li>完播率</li>
                      <li>互动率</li>
                      <li>用户活跃度</li>
                      <li>内容多样性</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">新闻推荐评估</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      新闻推荐系统的评估重点关注：
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>阅读深度</li>
                      <li>停留时间</li>
                      <li>分享率</li>
                      <li>评论率</li>
                      <li>内容时效性</li>
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
          href="/study/ai/recsys/deep-learning"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回深度学习推荐
        </Link>
        <Link 
          href="/study/ai/recsys/cold-start"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          冷启动问题 →
        </Link>
      </div>
    </div>
  );
} 