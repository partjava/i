'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RecommendationInterviewPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'basic', label: '基础问题' },
    { id: 'advanced', label: '进阶问题' },
    { id: 'system', label: '系统设计' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">推荐系统面试题</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">面试概述</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  推荐系统面试主要考察候选人对推荐系统基础理论、算法实现、系统架构和工程实践的理解。
                  本节将介绍常见的面试问题和解答思路。
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">面试重点</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>基础算法理解</li>
                    <li>系统架构设计</li>
                    <li>工程实现能力</li>
                    <li>问题解决思路</li>
                    <li>实践经验分享</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">面试准备</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">准备要点</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>理论基础扎实</li>
                    <li>算法实现熟练</li>
                    <li>系统设计清晰</li>
                    <li>实践经验丰富</li>
                    <li>表达能力良好</li>
                  </ul>
                </div>

                {/* 面试准备图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">面试准备图</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.8}} />
                      </linearGradient>
                    </defs>
                    {/* 理论基础 */}
                    <rect x="50" y="50" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="125" y="80" textAnchor="middle" fill="white" className="font-medium">理论基础</text>
                    
                    {/* 算法实现 */}
                    <rect x="250" y="50" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="325" y="80" textAnchor="middle" fill="white" className="font-medium">算法实现</text>
                    
                    {/* 系统设计 */}
                    <rect x="450" y="50" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="525" y="80" textAnchor="middle" fill="white" className="font-medium">系统设计</text>
                    
                    {/* 实践经验 */}
                    <rect x="650" y="50" width="100" height="50" rx="5" fill="url(#grad1)" />
                    <text x="700" y="80" textAnchor="middle" fill="white" className="font-medium">实践经验</text>
                    
                    {/* 表达能力 */}
                    <rect x="50" y="120" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="125" y="150" textAnchor="middle" fill="white" className="font-medium">表达能力</text>
                    
                    {/* 问题解决 */}
                    <rect x="250" y="120" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="325" y="150" textAnchor="middle" fill="white" className="font-medium">问题解决</text>
                    
                    {/* 项目经验 */}
                    <rect x="450" y="120" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="525" y="150" textAnchor="middle" fill="white" className="font-medium">项目经验</text>
                    
                    {/* 技术视野 */}
                    <rect x="650" y="120" width="100" height="50" rx="5" fill="url(#grad1)" />
                    <text x="700" y="150" textAnchor="middle" fill="white" className="font-medium">技术视野</text>
                    
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
              <h3 className="text-xl font-semibold mb-3">面试技巧</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">关键技巧</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>理解问题本质</li>
                    <li>清晰表达思路</li>
                    <li>结合实际案例</li>
                    <li>展示技术深度</li>
                    <li>突出个人特色</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">基础问题</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 什么是推荐系统？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      推荐系统是一种信息过滤系统，用于预测用户对物品的偏好，并向用户推荐可能感兴趣的物品。
                      主要解决信息过载问题，提高用户体验和商业价值。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">关键点：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>信息过滤</li>
                        <li>个性化推荐</li>
                        <li>用户体验</li>
                        <li>商业价值</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 推荐系统的主要类型有哪些？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      推荐系统主要分为基于内容的推荐、协同过滤推荐、混合推荐等类型。
                      每种类型都有其特点和适用场景。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">主要类型：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>基于内容的推荐</li>
                        <li>协同过滤推荐</li>
                        <li>混合推荐</li>
                        <li>深度学习推荐</li>
                        <li>知识图谱推荐</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 什么是冷启动问题？如何解决？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      冷启动问题指系统在缺乏足够用户行为数据时难以做出准确推荐的情况。
                      主要包括用户冷启动、物品冷启动和系统冷启动。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">解决方案：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>基于内容的推荐</li>
                        <li>基于规则的推荐</li>
                        <li>混合推荐策略</li>
                        <li>引导式交互</li>
                        <li>数据迁移</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">进阶问题</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 如何解决推荐系统的多样性问题？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      推荐系统的多样性问题指推荐结果过于单一，缺乏多样性。
                      需要从多个维度进行优化。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">解决方案：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>多路召回策略</li>
                        <li>多样性重排序</li>
                        <li>探索与利用平衡</li>
                        <li>上下文感知</li>
                        <li>用户兴趣建模</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 如何评估推荐系统的效果？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      推荐系统评估需要从多个维度进行，包括准确性、多样性、新颖性等。
                      同时需要考虑离线评估和在线评估。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">评估指标：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>准确率指标：RMSE、MAE、Precision、Recall</li>
                        <li>多样性指标：覆盖率、多样性</li>
                        <li>新颖性指标：平均流行度、新颖性分数</li>
                        <li>用户满意度：点击率、转化率、留存率</li>
                        <li>系统性能：响应时间、吞吐量</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 如何实现实时推荐系统？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      实时推荐系统需要处理实时数据流，快速更新模型，及时响应用户请求。
                      需要综合考虑系统架构、数据处理和性能优化。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">关键技术：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>流处理框架：Flink、Spark Streaming</li>
                        <li>实时特征工程</li>
                        <li>模型在线更新</li>
                        <li>缓存策略优化</li>
                        <li>分布式部署</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">系统设计问题</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 如何设计一个高并发的推荐系统？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      高并发推荐系统需要从架构设计、性能优化、资源调度等多个方面进行考虑。
                      确保系统能够稳定、高效地处理大量请求。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">设计要点：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>分布式架构</li>
                        <li>负载均衡</li>
                        <li>缓存策略</li>
                        <li>异步处理</li>
                        <li>限流降级</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 如何设计一个可扩展的推荐系统？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      可扩展的推荐系统需要支持业务增长，能够灵活应对数据量增加和功能扩展。
                      需要从架构设计、数据存储、服务治理等方面进行考虑。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">设计要点：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>微服务架构</li>
                        <li>数据分片</li>
                        <li>服务发现</li>
                        <li>配置中心</li>
                        <li>监控告警</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 如何设计一个高可用的推荐系统？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      高可用的推荐系统需要保证服务的连续性和稳定性，能够应对各种故障和异常情况。
                      需要从架构设计、容错机制、监控运维等方面进行考虑。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">设计要点：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>多活架构</li>
                        <li>故障转移</li>
                        <li>数据备份</li>
                        <li>熔断降级</li>
                        <li>灾备方案</li>
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
          href="/study/ai/recsys/cases"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回推荐系统实践
        </Link>
        <Link 
          href="/study/ai/recsys/advanced"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          推荐系统进阶与前沿 →
        </Link>
      </div>
    </div>
  );
} 