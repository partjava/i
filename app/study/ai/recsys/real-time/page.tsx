'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RealTimeRecommendationPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'architecture', label: '系统架构' },
    { id: 'implementation', label: '实现方法' },
    { id: 'optimization', label: '性能优化' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">实时推荐</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">实时推荐简介</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  实时推荐系统能够根据用户的最新行为和上下文信息，快速生成个性化推荐结果。
                  它要求系统具备低延迟、高吞吐量和实时更新的能力。
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">主要特点</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>实时性：毫秒级响应</li>
                    <li>个性化：基于实时上下文</li>
                    <li>可扩展：支持高并发</li>
                    <li>可靠性：保证服务质量</li>
                    <li>灵活性：支持动态调整</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">应用场景</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">典型场景</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>电商实时推荐</li>
                    <li>视频流推荐</li>
                    <li>新闻资讯推荐</li>
                    <li>社交网络推荐</li>
                    <li>广告实时投放</li>
                  </ul>
                </div>

                {/* 实时推荐流程图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">实时推荐流程</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.8}} />
                      </linearGradient>
                    </defs>
                    {/* 数据收集 */}
                    <rect x="50" y="50" width="150" height="200" rx="5" fill="url(#grad1)" />
                    <text x="125" y="150" textAnchor="middle" fill="white" className="font-medium">数据收集</text>
                    
                    {/* 实时处理 */}
                    <rect x="250" y="50" width="150" height="200" rx="5" fill="url(#grad1)" />
                    <text x="325" y="150" textAnchor="middle" fill="white" className="font-medium">实时处理</text>
                    
                    {/* 模型预测 */}
                    <rect x="450" y="50" width="150" height="200" rx="5" fill="url(#grad1)" />
                    <text x="525" y="150" textAnchor="middle" fill="white" className="font-medium">模型预测</text>
                    
                    {/* 结果输出 */}
                    <rect x="650" y="50" width="100" height="200" rx="5" fill="url(#grad1)" />
                    <text x="700" y="150" textAnchor="middle" fill="white" className="font-medium">输出</text>
                    
                    {/* 连接线 */}
                    <line x1="200" y1="150" x2="250" y2="150" stroke="#4B5563" strokeWidth="2" />
                    <line x1="400" y1="150" x2="450" y2="150" stroke="#4B5563" strokeWidth="2" />
                    <line x1="600" y1="150" x2="650" y2="150" stroke="#4B5563" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">技术挑战</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">主要挑战</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>低延迟要求</li>
                    <li>高并发处理</li>
                    <li>数据一致性</li>
                    <li>系统可扩展性</li>
                    <li>资源利用率</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">系统架构</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">整体架构</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>数据采集层</li>
                      <li>实时处理层</li>
                      <li>特征工程层</li>
                      <li>模型服务层</li>
                      <li>结果输出层</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">关键技术组件</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>消息队列：Kafka/RabbitMQ</li>
                      <li>流处理：Flink/Spark Streaming</li>
                      <li>特征存储：Redis/HBase</li>
                      <li>模型服务：TensorFlow Serving</li>
                      <li>负载均衡：Nginx/HAProxy</li>
                    </ul>
                  </div>
                </div>

                {/* 系统架构图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">系统架构图</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.8}} />
                      </linearGradient>
                    </defs>
                    {/* 数据采集 */}
                    <rect x="50" y="50" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="125" y="80" textAnchor="middle" fill="white" className="font-medium">数据采集</text>
                    
                    {/* 实时处理 */}
                    <rect x="50" y="120" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="125" y="150" textAnchor="middle" fill="white" className="font-medium">实时处理</text>
                    
                    {/* 特征工程 */}
                    <rect x="50" y="190" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="125" y="220" textAnchor="middle" fill="white" className="font-medium">特征工程</text>
                    
                    {/* 模型服务 */}
                    <rect x="300" y="120" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="375" y="150" textAnchor="middle" fill="white" className="font-medium">模型服务</text>
                    
                    {/* 结果输出 */}
                    <rect x="550" y="120" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="625" y="150" textAnchor="middle" fill="white" className="font-medium">结果输出</text>
                    
                    {/* 连接线 */}
                    <line x1="200" y1="75" x2="200" y2="145" stroke="#4B5563" strokeWidth="2" />
                    <line x1="200" y1="145" x2="200" y2="215" stroke="#4B5563" strokeWidth="2" />
                    <line x1="200" y1="145" x2="300" y2="145" stroke="#4B5563" strokeWidth="2" />
                    <line x1="450" y1="145" x2="550" y2="145" stroke="#4B5563" strokeWidth="2" />
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
                  <h4 className="font-semibold mb-2">实时特征处理</h4>
                  <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    <pre>{`def process_realtime_features(user_id, event_data):
    # 获取用户实时特征
    user_features = get_user_features(user_id)
    
    # 处理事件数据
    event_features = extract_event_features(event_data)
    
    # 特征组合
    combined_features = combine_features(user_features, event_features)
    
    # 特征归一化
    normalized_features = normalize_features(combined_features)
    
    return normalized_features`}</pre>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">实时预测服务</h4>
                  <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    <pre>{`class RealtimePredictionService:
    def __init__(self):
        self.model = load_model()
        self.feature_processor = FeatureProcessor()
        self.cache = Cache()
    
    async def predict(self, user_id, context):
        # 获取特征
        features = await self.feature_processor.get_features(user_id, context)
        
        # 模型预测
        prediction = self.model.predict(features)
        
        # 结果处理
        result = self.post_process(prediction)
        
        return result`}</pre>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">实时更新机制</h4>
                  <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    <pre>{`class RealtimeUpdater:
    def __init__(self):
        self.message_queue = MessageQueue()
        self.feature_store = FeatureStore()
    
    async def update_features(self, event):
        # 处理事件
        features = self.extract_features(event)
        
        # 更新特征存储
        await self.feature_store.update(event.user_id, features)
        
        # 触发模型更新
        self.trigger_model_update(event.user_id)`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'optimization' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">性能优化</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">系统优化</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>数据预处理优化</li>
                      <li>特征计算优化</li>
                      <li>模型推理优化</li>
                      <li>缓存策略优化</li>
                      <li>并发处理优化</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">监控指标</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>响应时间</li>
                      <li>吞吐量</li>
                      <li>错误率</li>
                      <li>资源利用率</li>
                      <li>系统延迟</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">优化策略</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>数据批处理</li>
                      <li>特征预计算</li>
                      <li>模型量化</li>
                      <li>分布式部署</li>
                      <li>负载均衡</li>
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
          href="/study/ai/recsys/cold-start"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回冷启动问题
        </Link>
        <Link 
          href="/study/ai/recsys/architecture"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          推荐系统架构 →
        </Link>
      </div>
    </div>
  );
} 