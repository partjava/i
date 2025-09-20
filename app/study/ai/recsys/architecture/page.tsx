'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RecommendationArchitecturePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'components', label: '核心组件' },
    { id: 'patterns', label: '架构模式' },
    { id: 'deployment', label: '部署方案' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">推荐系统架构</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">架构概述</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  推荐系统架构是支撑整个推荐系统运行的基础设施，它需要处理数据采集、特征工程、模型训练、在线服务等多个环节。
                  良好的架构设计能够确保系统的可扩展性、可靠性和性能。
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">架构设计原则</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>高可用性</li>
                    <li>可扩展性</li>
                    <li>可维护性</li>
                    <li>性能优化</li>
                    <li>成本效益</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">系统层次</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">主要层次</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>数据层：数据采集和存储</li>
                    <li>计算层：特征工程和模型训练</li>
                    <li>服务层：在线预测和推荐</li>
                    <li>应用层：业务逻辑和展示</li>
                  </ul>
                </div>

                {/* 系统层次图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">系统层次图</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.8}} />
                      </linearGradient>
                    </defs>
                    {/* 应用层 */}
                    <rect x="50" y="50" width="700" height="50" rx="5" fill="url(#grad1)" />
                    <text x="400" y="80" textAnchor="middle" fill="white" className="font-medium">应用层</text>
                    
                    {/* 服务层 */}
                    <rect x="50" y="110" width="700" height="50" rx="5" fill="url(#grad1)" />
                    <text x="400" y="140" textAnchor="middle" fill="white" className="font-medium">服务层</text>
                    
                    {/* 计算层 */}
                    <rect x="50" y="170" width="700" height="50" rx="5" fill="url(#grad1)" />
                    <text x="400" y="200" textAnchor="middle" fill="white" className="font-medium">计算层</text>
                    
                    {/* 数据层 */}
                    <rect x="50" y="230" width="700" height="50" rx="5" fill="url(#grad1)" />
                    <text x="400" y="260" textAnchor="middle" fill="white" className="font-medium">数据层</text>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">技术选型</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">关键技术</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>数据存储：HDFS/HBase/Redis</li>
                    <li>计算框架：Spark/Flink</li>
                    <li>机器学习：TensorFlow/PyTorch</li>
                    <li>服务框架：Spring Boot/Flask</li>
                    <li>消息队列：Kafka/RabbitMQ</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'components' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">核心组件</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">数据采集组件</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>用户行为采集</li>
                      <li>物品特征采集</li>
                      <li>上下文信息采集</li>
                      <li>数据清洗转换</li>
                      <li>数据质量控制</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">特征工程组件</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>特征提取</li>
                      <li>特征转换</li>
                      <li>特征选择</li>
                      <li>特征存储</li>
                      <li>特征更新</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">模型训练组件</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>数据预处理</li>
                      <li>模型训练</li>
                      <li>模型评估</li>
                      <li>模型部署</li>
                      <li>模型监控</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">在线服务组件</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>请求处理</li>
                      <li>特征获取</li>
                      <li>模型预测</li>
                      <li>结果排序</li>
                      <li>结果过滤</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">架构模式</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">微服务架构</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      将推荐系统拆分为多个独立的微服务，每个服务负责特定的功能：
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>用户服务</li>
                      <li>物品服务</li>
                      <li>特征服务</li>
                      <li>模型服务</li>
                      <li>推荐服务</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">事件驱动架构</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      基于事件驱动的架构模式，实现系统组件间的解耦：
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>事件发布</li>
                      <li>事件订阅</li>
                      <li>事件处理</li>
                      <li>状态同步</li>
                      <li>数据一致性</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">分层架构</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      采用分层架构，实现关注点分离：
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>表现层</li>
                      <li>业务层</li>
                      <li>持久层</li>
                      <li>基础设施层</li>
                      <li>跨层服务</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deployment' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">部署方案</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">容器化部署</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Docker容器</li>
                      <li>Kubernetes编排</li>
                      <li>服务发现</li>
                      <li>负载均衡</li>
                      <li>自动扩缩容</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">云原生部署</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>云服务利用</li>
                      <li>弹性计算</li>
                      <li>分布式存储</li>
                      <li>微服务治理</li>
                      <li>DevOps实践</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">监控运维</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>系统监控</li>
                      <li>性能监控</li>
                      <li>日志管理</li>
                      <li>告警系统</li>
                      <li>故障恢复</li>
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
          href="/study/ai/recsys/real-time"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回实时推荐
        </Link>
        <Link 
          href="/study/ai/recsys/frameworks"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          推荐系统框架 →
        </Link>
      </div>
    </div>
  );
} 