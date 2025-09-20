'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BasicPage() {
  const [activeTab, setActiveTab] = useState('concept');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'concept', label: '基础概念' },
    { id: 'elements', label: '核心要素' },
    { id: 'types', label: '系统类型' },
    { id: 'metrics', label: '评估指标' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">推荐系统基础</h1>
      
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
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">什么是推荐系统？</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  推荐系统是一种信息过滤系统，它能够预测用户对物品的偏好，并向用户推荐可能感兴趣的物品。
                  推荐系统已经成为现代互联网应用的重要组成部分，广泛应用于电商、视频、音乐、新闻等领域。
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">推荐系统的目标</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>帮助用户发现感兴趣的内容</li>
                    <li>提高用户满意度和参与度</li>
                    <li>增加平台活跃度和转化率</li>
                    <li>优化用户体验和商业价值</li>
                  </ul>
                </div>
                {/* 推荐系统架构图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">推荐系统架构</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 400">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                    {/* 数据层 */}
                    <rect x="50" y="50" width="700" height="80" rx="10" fill="#F3F4F6" stroke="#9CA3AF" />
                    <text x="400" y="90" textAnchor="middle" fill="#374151" className="font-medium">数据层</text>
                    <text x="150" y="120" textAnchor="middle" fill="#4B5563" className="text-sm">用户数据</text>
                    <text x="400" y="120" textAnchor="middle" fill="#4B5563" className="text-sm">物品数据</text>
                    <text x="650" y="120" textAnchor="middle" fill="#4B5563" className="text-sm">交互数据</text>
                    
                    {/* 算法层 */}
                    <rect x="50" y="150" width="700" height="80" rx="10" fill="#F3F4F6" stroke="#9CA3AF" />
                    <text x="400" y="190" textAnchor="middle" fill="#374151" className="font-medium">算法层</text>
                    <text x="200" y="220" textAnchor="middle" fill="#4B5563" className="text-sm">召回算法</text>
                    <text x="400" y="220" textAnchor="middle" fill="#4B5563" className="text-sm">排序算法</text>
                    <text x="600" y="220" textAnchor="middle" fill="#4B5563" className="text-sm">过滤算法</text>
                    
                    {/* 应用层 */}
                    <rect x="50" y="250" width="700" height="80" rx="10" fill="#F3F4F6" stroke="#9CA3AF" />
                    <text x="400" y="290" textAnchor="middle" fill="#374151" className="font-medium">应用层</text>
                    <text x="200" y="320" textAnchor="middle" fill="#4B5563" className="text-sm">个性化展示</text>
                    <text x="400" y="320" textAnchor="middle" fill="#4B5563" className="text-sm">实时更新</text>
                    <text x="600" y="320" textAnchor="middle" fill="#4B5563" className="text-sm">效果评估</text>
                    
                    {/* 连接线 */}
                    <path d="M400 130 L400 150" stroke="#9CA3AF" strokeWidth="2" />
                    <path d="M400 230 L400 250" stroke="#9CA3AF" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">推荐系统的基本流程</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">数据收集</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>用户行为数据（点击、浏览、购买等）</li>
                    <li>用户属性数据（人口统计学特征）</li>
                    <li>物品特征数据（内容、属性、标签等）</li>
                    <li>上下文数据（时间、地点、设备等）</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">推荐生成</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>特征提取和表示</li>
                    <li>相似度计算</li>
                    <li>候选集生成</li>
                    <li>排序和过滤</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">结果展示</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>个性化展示</li>
                    <li>多样性保证</li>
                    <li>实时更新</li>
                    <li>用户反馈收集</li>
                  </ul>
                </div>
                {/* 推荐流程时序图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">推荐流程时序图</h4>
                  <svg className="w-full h-48" viewBox="0 0 800 300">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                      </marker>
                    </defs>
                    {/* 时间轴 */}
                    <line x1="50" y1="150" x2="750" y2="150" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <text x="400" y="180" textAnchor="middle" fill="#4B5563" className="text-sm">时间</text>
                    
                    {/* 流程节点 */}
                    <circle cx="100" cy="150" r="20" fill="#4F46E5" />
                    <text x="100" y="150" textAnchor="middle" fill="white" className="text-sm">数据收集</text>
                    
                    <circle cx="300" cy="150" r="20" fill="#7C3AED" />
                    <text x="300" y="150" textAnchor="middle" fill="white" className="text-sm">特征提取</text>
                    
                    <circle cx="500" cy="150" r="20" fill="#4F46E5" />
                    <text x="500" y="150" textAnchor="middle" fill="white" className="text-sm">推荐生成</text>
                    
                    <circle cx="700" cy="150" r="20" fill="#7C3AED" />
                    <text x="700" y="150" textAnchor="middle" fill="white" className="text-sm">结果展示</text>
                    
                    {/* 连接线 */}
                    <line x1="120" y1="150" x2="280" y2="150" stroke="#6B7280" strokeWidth="2" />
                    <line x1="320" y1="150" x2="480" y2="150" stroke="#6B7280" strokeWidth="2" />
                    <line x1="520" y1="150" x2="680" y2="150" stroke="#6B7280" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'elements' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">用户建模</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">用户特征</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>人口统计学特征（年龄、性别、地域等）</li>
                    <li>行为特征（浏览、点击、购买等）</li>
                    <li>兴趣特征（偏好、标签等）</li>
                    <li>社交特征（社交关系、互动等）</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">用户画像</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>静态画像（长期特征）</li>
                    <li>动态画像（实时特征）</li>
                    <li>兴趣画像（偏好特征）</li>
                    <li>行为画像（交互特征）</li>
                  </ul>
                </div>
                {/* 用户画像雷达图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">用户画像雷达图</h4>
                  <svg className="w-full h-64" viewBox="0 0 400 400">
                    <defs>
                      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.2}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.2}} />
                      </linearGradient>
                    </defs>
                    {/* 雷达图背景 */}
                    <polygon points="200,50 300,150 250,300 150,300 100,150" fill="url(#grad2)" stroke="#6B7280" />
                    <polygon points="200,100 250,175 225,250 175,250 150,175" fill="url(#grad2)" stroke="#6B7280" />
                    <polygon points="200,150 225,200 200,225 175,200" fill="url(#grad2)" stroke="#6B7280" />
                    
                    {/* 用户特征点 */}
                    <circle cx="200" cy="50" r="4" fill="#4F46E5" />
                    <circle cx="300" cy="150" r="4" fill="#4F46E5" />
                    <circle cx="250" cy="300" r="4" fill="#4F46E5" />
                    <circle cx="150" cy="300" r="4" fill="#4F46E5" />
                    <circle cx="100" cy="150" r="4" fill="#4F46E5" />
                    
                    {/* 特征标签 */}
                    <text x="200" y="30" textAnchor="middle" fill="#4B5563" className="text-sm">兴趣</text>
                    <text x="320" y="150" textAnchor="start" fill="#4B5563" className="text-sm">行为</text>
                    <text x="250" y="320" textAnchor="middle" fill="#4B5563" className="text-sm">社交</text>
                    <text x="150" y="320" textAnchor="middle" fill="#4B5563" className="text-sm">属性</text>
                    <text x="80" y="150" textAnchor="end" fill="#4B5563" className="text-sm">偏好</text>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">物品建模</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">物品特征</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>内容特征（文本、图像、视频等）</li>
                    <li>属性特征（类别、标签、价格等）</li>
                    <li>统计特征（热度、评分等）</li>
                    <li>上下文特征（时间、场景等）</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">物品表示</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>向量表示</li>
                    <li>图结构表示</li>
                    <li>序列表示</li>
                    <li>多模态表示</li>
                  </ul>
                </div>
                {/* 物品特征向量图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">物品特征向量表示</h4>
                  <svg className="w-full h-48" viewBox="0 0 600 200">
                    <defs>
                      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.8}} />
                      </linearGradient>
                    </defs>
                    {/* 特征向量 */}
                    <rect x="50" y="50" width="500" height="100" rx="5" fill="url(#grad3)" />
                    <text x="300" y="100" textAnchor="middle" fill="white" className="font-medium">物品特征向量</text>
                    
                    {/* 特征维度 */}
                    <line x1="50" y1="150" x2="550" y2="150" stroke="#6B7280" strokeWidth="2" />
                    <text x="50" y="170" textAnchor="middle" fill="#4B5563" className="text-sm">0</text>
                    <text x="150" y="170" textAnchor="middle" fill="#4B5563" className="text-sm">1</text>
                    <text x="250" y="170" textAnchor="middle" fill="#4B5563" className="text-sm">2</text>
                    <text x="350" y="170" textAnchor="middle" fill="#4B5563" className="text-sm">3</text>
                    <text x="450" y="170" textAnchor="middle" fill="#4B5563" className="text-sm">4</text>
                    <text x="550" y="170" textAnchor="middle" fill="#4B5563" className="text-sm">5</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">基于内容的推荐</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基本原理</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>分析物品内容特征</li>
                    <li>提取用户兴趣特征</li>
                    <li>计算内容相似度</li>
                    <li>推荐相似物品</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">应用场景</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>新闻推荐</li>
                    <li>视频推荐</li>
                    <li>音乐推荐</li>
                    <li>商品推荐</li>
                  </ul>
                </div>
                {/* 基于内容的推荐流程图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">基于内容的推荐流程</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                      </marker>
                    </defs>
                    {/* 流程框 */}
                    <rect x="50" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="125" y="85" textAnchor="middle" fill="#374151">物品特征</text>
                    
                    <rect x="250" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="325" y="85" textAnchor="middle" fill="#374151">特征提取</text>
                    
                    <rect x="450" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="525" y="85" textAnchor="middle" fill="#374151">相似度计算</text>
                    
                    <rect x="650" y="50" width="150" height="60" rx="5" fill="#F3F4F6" stroke="#6B7280" />
                    <text x="725" y="85" textAnchor="middle" fill="#374151">推荐结果</text>
                    
                    {/* 连接线 */}
                    <line x1="200" y1="80" x2="250" y2="80" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead2)" />
                    <line x1="400" y1="80" x2="450" y2="80" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead2)" />
                    <line x1="600" y1="80" x2="650" y2="80" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead2)" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">协同过滤推荐</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基于用户的协同过滤</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>找到相似用户</li>
                    <li>基于相似用户的行为推荐</li>
                    <li>考虑用户相似度权重</li>
                    <li>生成推荐列表</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基于物品的协同过滤</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>计算物品相似度</li>
                    <li>基于用户历史行为</li>
                    <li>推荐相似物品</li>
                    <li>考虑物品相似度权重</li>
                  </ul>
                </div>
                {/* 协同过滤示意图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">协同过滤示意图</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.2}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.2}} />
                      </linearGradient>
                    </defs>
                    {/* 用户-物品矩阵 */}
                    <rect x="50" y="50" width="700" height="200" rx="5" fill="url(#grad4)" stroke="#6B7280" />
                    
                    {/* 用户行 */}
                    <text x="30" y="100" textAnchor="end" fill="#4B5563" className="text-sm">用户1</text>
                    <text x="30" y="150" textAnchor="end" fill="#4B5563" className="text-sm">用户2</text>
                    <text x="30" y="200" textAnchor="end" fill="#4B5563" className="text-sm">用户3</text>
                    
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
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">离线评估指标</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">准确率指标</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>准确率（Precision）</li>
                    <li>召回率（Recall）</li>
                    <li>F1分数</li>
                    <li>AUC-ROC</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">排序指标</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>NDCG（归一化折损累积增益）</li>
                    <li>MAP（平均精度均值）</li>
                    <li>MRR（平均倒数排名）</li>
                    <li>Hit Rate（命中率）</li>
                  </ul>
                </div>
                {/* 评估指标对比图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">评估指标对比</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.8}} />
                      </linearGradient>
                    </defs>
                    {/* 坐标轴 */}
                    <line x1="50" y1="250" x2="750" y2="250" stroke="#6B7280" strokeWidth="2" />
                    <line x1="50" y1="50" x2="50" y2="250" stroke="#6B7280" strokeWidth="2" />
                    
                    {/* 柱状图 */}
                    <rect x="100" y="150" width="60" height="100" fill="url(#grad5)" />
                    <rect x="200" y="100" width="60" height="150" fill="url(#grad5)" />
                    <rect x="300" y="80" width="60" height="170" fill="url(#grad5)" />
                    <rect x="400" y="120" width="60" height="130" fill="url(#grad5)" />
                    <rect x="500" y="90" width="60" height="160" fill="url(#grad5)" />
                    <rect x="600" y="70" width="60" height="180" fill="url(#grad5)" />
                    
                    {/* 标签 */}
                    <text x="130" y="270" textAnchor="middle" fill="#4B5563" className="text-sm">Precision</text>
                    <text x="230" y="270" textAnchor="middle" fill="#4B5563" className="text-sm">Recall</text>
                    <text x="330" y="270" textAnchor="middle" fill="#4B5563" className="text-sm">F1</text>
                    <text x="430" y="270" textAnchor="middle" fill="#4B5563" className="text-sm">NDCG</text>
                    <text x="530" y="270" textAnchor="middle" fill="#4B5563" className="text-sm">MAP</text>
                    <text x="630" y="270" textAnchor="middle" fill="#4B5563" className="text-sm">MRR</text>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">在线评估指标</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">用户行为指标</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>点击率（CTR）</li>
                    <li>转化率（CVR）</li>
                    <li>停留时间</li>
                    <li>用户活跃度</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">业务指标</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>GMV（总交易额）</li>
                    <li>ARPU（平均用户收入）</li>
                    <li>留存率</li>
                    <li>用户满意度</li>
                  </ul>
                </div>
                {/* 在线指标趋势图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">在线指标趋势</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad6" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.2}} />
                        <stop offset="100%" style={{stopColor: '#4F46E5', stopOpacity: 0}} />
                      </linearGradient>
                    </defs>
                    {/* 坐标轴 */}
                    <line x1="50" y1="250" x2="750" y2="250" stroke="#6B7280" strokeWidth="2" />
                    <line x1="50" y1="50" x2="50" y2="250" stroke="#6B7280" strokeWidth="2" />
                    
                    {/* 趋势线 */}
                    <path d="M50,200 L150,180 L250,150 L350,120 L450,100 L550,80 L650,60 L750,50" 
                          fill="none" stroke="#4F46E5" strokeWidth="2" />
                    <path d="M50,200 L150,180 L250,150 L350,120 L450,100 L550,80 L650,60 L750,50 L750,250 L50,250 Z" 
                          fill="url(#grad6)" />
                    
                    {/* 数据点 */}
                    <circle cx="50" cy="200" r="4" fill="#4F46E5" />
                    <circle cx="150" cy="180" r="4" fill="#4F46E5" />
                    <circle cx="250" cy="150" r="4" fill="#4F46E5" />
                    <circle cx="350" cy="120" r="4" fill="#4F46E5" />
                    <circle cx="450" cy="100" r="4" fill="#4F46E5" />
                    <circle cx="550" cy="80" r="4" fill="#4F46E5" />
                    <circle cx="650" cy="60" r="4" fill="#4F46E5" />
                    <circle cx="750" cy="50" r="4" fill="#4F46E5" />
                    
                    {/* 标签 */}
                    <text x="400" y="270" textAnchor="middle" fill="#4B5563" className="text-sm">时间</text>
                    <text x="30" y="150" textAnchor="middle" fill="#4B5563" className="text-sm">指标值</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/recsys"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回推荐系统
        </Link>
        <Link 
          href="/study/ai/recsys/collaborative-filtering"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          协同过滤 →
        </Link>
      </div>
    </div>
  );
} 