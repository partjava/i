'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MatrixFactorizationPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'algorithms', label: '算法原理' },
    { id: 'optimization', label: '优化方法' },
    { id: 'implementation', label: '实现方法' },
    { id: 'applications', label: '应用实践' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">矩阵分解</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">矩阵分解简介</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  矩阵分解是推荐系统中一种重要的协同过滤方法，它通过将用户-物品评分矩阵分解为低维矩阵的乘积，
                  从而学习用户和物品的潜在特征表示。这种方法能够有效处理数据稀疏性问题，并提供更好的推荐效果。
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">矩阵分解的主要特点</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>能够学习用户和物品的潜在特征</li>
                    <li>可以处理大规模稀疏数据</li>
                    <li>具有良好的可扩展性</li>
                    <li>支持增量学习和在线更新</li>
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
                    <li>将用户-物品评分矩阵分解为两个低维矩阵</li>
                    <li>用户矩阵表示用户的潜在特征</li>
                    <li>物品矩阵表示物品的潜在特征</li>
                    <li>通过矩阵乘法预测缺失的评分</li>
                  </ul>
                </div>

                {/* 矩阵分解原理图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">矩阵分解原理示意图</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.8}} />
                      </linearGradient>
                    </defs>
                    {/* 原始矩阵 */}
                    <rect x="50" y="50" width="200" height="200" rx="5" fill="url(#grad1)" />
                    <text x="150" y="150" textAnchor="middle" fill="white" className="font-medium">R</text>
                    
                    {/* 等号 */}
                    <text x="300" y="150" textAnchor="middle" fill="#374151" className="text-2xl">=</text>
                    
                    {/* 用户矩阵 */}
                    <rect x="350" y="50" width="150" height="200" rx="5" fill="url(#grad1)" />
                    <text x="425" y="150" textAnchor="middle" fill="white" className="font-medium">P</text>
                    
                    {/* 乘号 */}
                    <text x="550" y="150" textAnchor="middle" fill="#374151" className="text-2xl">×</text>
                    
                    {/* 物品矩阵 */}
                    <rect x="600" y="50" width="150" height="200" rx="5" fill="url(#grad1)" />
                    <text x="675" y="150" textAnchor="middle" fill="white" className="font-medium">Q</text>
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
                    <li>电影推荐</li>
                    <li>音乐推荐</li>
                    <li>商品推荐</li>
                    <li>新闻推荐</li>
                    <li>社交网络推荐</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">适用条件</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>用户-物品交互数据稀疏</li>
                    <li>需要发现潜在特征</li>
                    <li>数据规模较大</li>
                    <li>需要增量更新</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'algorithms' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">算法原理</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基本矩阵分解</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      基本矩阵分解的目标是将用户-物品评分矩阵R分解为两个低维矩阵P和Q的乘积：
                      R ≈ P × Q^T，其中P是用户特征矩阵，Q是物品特征矩阵。
                    </p>
                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                      <pre>{`# 目标函数
min_{P,Q} Σ(r_ui - p_u^T q_i)^2 + λ(||P||^2 + ||Q||^2)

# 其中：
# r_ui: 用户u对物品i的实际评分
# p_u: 用户u的特征向量
# q_i: 物品i的特征向量
# λ: 正则化参数`}</pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">SVD分解</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      奇异值分解（SVD）是一种特殊的矩阵分解方法，它将矩阵分解为三个矩阵的乘积：
                      R = U × Σ × V^T，其中U和V是正交矩阵，Σ是对角矩阵。
                    </p>
                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                      <pre>{`# SVD分解
R = U × Σ × V^T

# 降维后的近似
R ≈ U_k × Σ_k × V_k^T

# 其中k是保留的奇异值数量`}</pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">非负矩阵分解</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      非负矩阵分解（NMF）要求分解后的矩阵元素都是非负的，这使得分解结果具有更好的可解释性。
                    </p>
                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                      <pre>{`# NMF目标函数
min_{P,Q} ||R - P × Q^T||^2
s.t. P ≥ 0, Q ≥ 0

# 更新规则
P = P * (R × Q) / (P × Q^T × Q)
Q = Q * (R^T × P) / (Q × P^T × P)`}</pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">概率矩阵分解</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      概率矩阵分解（PMF）从概率的角度建模用户-物品评分，假设评分服从高斯分布。
                    </p>
                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                      <pre>{`# PMF模型
p(R|P,Q,σ^2) = Π N(r_ui|p_u^T q_i,σ^2)
p(P|σ_P^2) = Π N(p_u|0,σ_P^2 I)
p(Q|σ_Q^2) = Π N(q_i|0,σ_Q^2 I)

# 最大后验估计
max_{P,Q} log p(P,Q|R,σ^2,σ_P^2,σ_Q^2)`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'optimization' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">优化方法</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">随机梯度下降</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      随机梯度下降（SGD）是最常用的优化方法，它通过随机采样训练样本进行参数更新。
                    </p>
                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                      <pre>{`# SGD更新规则
p_u = p_u + α * (e_ui * q_i - λ * p_u)
q_i = q_i + α * (e_ui * p_u - λ * q_i)

# 其中：
# e_ui = r_ui - p_u^T q_i
# α: 学习率
# λ: 正则化参数`}</pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">交替最小二乘</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      交替最小二乘（ALS）通过固定一个矩阵，优化另一个矩阵的方式交替进行优化。
                    </p>
                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                      <pre>{`# ALS更新规则
# 固定Q，更新P
p_u = (Q^T Q + λI)^(-1) Q^T r_u

# 固定P，更新Q
q_i = (P^T P + λI)^(-1) P^T r_i`}</pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">并行优化</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      为了处理大规模数据，可以采用并行优化方法，如分布式SGD和分布式ALS。
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>数据并行：将数据分片到不同机器</li>
                      <li>模型并行：将模型参数分片到不同机器</li>
                      <li>参数服务器：集中管理模型参数</li>
                      <li>异步更新：允许参数异步更新</li>
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
                  <h4 className="font-semibold mb-2">Python实现示例</h4>
                  <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    <pre>{`import numpy as np
from scipy.sparse import csr_matrix
from sklearn.metrics import mean_squared_error

class MatrixFactorization:
    def __init__(self, n_factors=100, learning_rate=0.01, 
                 regularization=0.02, n_iterations=20):
        self.n_factors = n_factors
        self.learning_rate = learning_rate
        self.regularization = regularization
        self.n_iterations = n_iterations
        
    def fit(self, ratings):
        # 初始化用户和物品特征矩阵
        n_users, n_items = ratings.shape
        self.user_features = np.random.normal(0, 0.1, (n_users, self.n_factors))
        self.item_features = np.random.normal(0, 0.1, (n_items, self.n_factors))
        
        # 转换为稀疏矩阵
        ratings = csr_matrix(ratings)
        
        # 训练模型
        for _ in range(self.n_iterations):
            for u, i, r in zip(ratings.row, ratings.col, ratings.data):
                # 计算预测误差
                prediction = np.dot(self.user_features[u], self.item_features[i])
                error = r - prediction
                
                # 更新特征
                self.user_features[u] += self.learning_rate * (
                    error * self.item_features[i] - 
                    self.regularization * self.user_features[u]
                )
                self.item_features[i] += self.learning_rate * (
                    error * self.user_features[u] - 
                    self.regularization * self.item_features[i]
                )
    
    def predict(self, user_id, item_id):
        return np.dot(self.user_features[user_id], self.item_features[item_id])
    
    def evaluate(self, test_ratings):
        predictions = []
        actuals = []
        
        for u, i, r in zip(test_ratings.row, test_ratings.col, test_ratings.data):
            pred = self.predict(u, i)
            predictions.append(pred)
            actuals.append(r)
            
        return mean_squared_error(actuals, predictions)`}</pre>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">性能优化</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>使用稀疏矩阵存储</li>
                    <li>向量化计算</li>
                    <li>并行处理</li>
                    <li>GPU加速</li>
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

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">应用实践</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">实际应用案例</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Netflix电影推荐</li>
                    <li>Amazon商品推荐</li>
                    <li>Spotify音乐推荐</li>
                    <li>LinkedIn职业推荐</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">最佳实践</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>数据质量保证</li>
                    <li>模型选择与调优</li>
                    <li>评估指标选择</li>
                    <li>系统架构设计</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">常见问题与解决方案</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>冷启动问题</li>
                    <li>数据稀疏性</li>
                    <li>计算效率</li>
                    <li>模型更新</li>
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
          href="/study/ai/recsys/content-based"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回基于内容的推荐
        </Link>
        <Link 
          href="/study/ai/recsys/deep-learning"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          深度学习推荐 →
        </Link>
      </div>
    </div>
  );
} 