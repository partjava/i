'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaBrain, FaChartLine, FaCode, FaLightbulb, FaNetworkWired, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiScikitlearn, SiPandas, SiNumpy } from 'react-icons/si';

export default function UnsupervisedLearningPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">无监督学习算法</h1>
      
      {/* 进度条 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
      </div>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('theory')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'theory'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          理论知识
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'practice'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          代码实践
        </button>
        <button
          onClick={() => setActiveTab('exercise')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'exercise'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          例题练习
        </button>
      </div>

      {activeTab === 'theory' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">无监督学习概述</h2>
            <p className="text-gray-700 mb-4">
              无监督学习是机器学习中不需要标签数据的学习方法，主要用于发现数据中的隐藏模式和结构。主要包括聚类、降维和关联规则学习等。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">聚类分析</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>目标：发现数据分组</li>
                  <li>应用：客户分群、图像分割</li>
                  <li>算法：K-means、DBSCAN</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">降维技术</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>目标：减少特征维度</li>
                  <li>应用：数据可视化、特征提取</li>
                  <li>算法：PCA、t-SNE</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">关联规则</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>目标：发现数据关联</li>
                  <li>应用：推荐系统、购物篮分析</li>
                  <li>算法：Apriori、FP-Growth</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">常用算法详解</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full mt-1">
                  <FaChartLine className="text-blue-500 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">1. K-means聚类</h3>
                  <p className="text-gray-700">通过迭代优化将数据点分配到最近的聚类中心</p>
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                      {/* 数据点 */}
                      <circle cx="100" cy="100" r="3" fill="#3B82F6" />
                      <circle cx="120" cy="90" r="3" fill="#3B82F6" />
                      <circle cx="90" cy="110" r="3" fill="#3B82F6" />
                      <circle cx="300" cy="100" r="3" fill="#EF4444" />
                      <circle cx="280" cy="90" r="3" fill="#EF4444" />
                      <circle cx="310" cy="110" r="3" fill="#EF4444" />
                      {/* 聚类中心 */}
                      <circle cx="100" cy="100" r="8" fill="none" stroke="#1E40AF" strokeWidth="2" />
                      <circle cx="300" cy="100" r="8" fill="none" stroke="#991B1B" strokeWidth="2" />
                      {/* 连接线 */}
                      <line x1="100" y1="100" x2="120" y2="90" stroke="#93C5FD" strokeWidth="1" />
                      <line x1="100" y1="100" x2="90" y2="110" stroke="#93C5FD" strokeWidth="1" />
                      <line x1="300" y1="100" x2="280" y2="90" stroke="#FCA5A5" strokeWidth="1" />
                      <line x1="300" y1="100" x2="310" y2="110" stroke="#FCA5A5" strokeWidth="1" />
                    </svg>
                  </div>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>原理：最小化类内距离</li>
                    <li>优点：简单高效、可扩展性强</li>
                    <li>缺点：需要预先指定K值</li>
                    <li>应用：客户分群、图像分割</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full mt-1">
                  <FaBrain className="text-green-500 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">2. 主成分分析(PCA)</h3>
                  <p className="text-gray-700">通过线性变换将高维数据投影到低维空间</p>
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                      {/* 原始数据点 */}
                      <circle cx="100" cy="100" r="3" fill="#10B981" />
                      <circle cx="120" cy="90" r="3" fill="#10B981" />
                      <circle cx="90" cy="110" r="3" fill="#10B981" />
                      {/* 投影线 */}
                      <line x1="50" y1="50" x2="350" y2="150" stroke="#059669" strokeWidth="2" />
                      {/* 投影点 */}
                      <circle cx="100" cy="100" r="3" fill="#34D399" />
                      <circle cx="120" cy="90" r="3" fill="#34D399" />
                      <circle cx="90" cy="110" r="3" fill="#34D399" />
                      {/* 连接线 */}
                      <line x1="100" y1="100" x2="100" y2="100" stroke="#6EE7B7" strokeWidth="1" />
                      <line x1="120" y1="90" x2="120" y2="90" stroke="#6EE7B7" strokeWidth="1" />
                      <line x1="90" y1="110" x2="90" y2="110" stroke="#6EE7B7" strokeWidth="1" />
                    </svg>
                  </div>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>原理：最大化方差</li>
                    <li>优点：降维效果好、可解释性强</li>
                    <li>缺点：只能处理线性关系</li>
                    <li>应用：特征提取、数据可视化</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full mt-1">
                  <FaNetworkWired className="text-purple-500 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">3. DBSCAN聚类</h3>
                  <p className="text-gray-700">基于密度的聚类算法，可以发现任意形状的聚类</p>
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                      {/* 密集区域 */}
                      <circle cx="100" cy="100" r="3" fill="#8B5CF6" />
                      <circle cx="120" cy="90" r="3" fill="#8B5CF6" />
                      <circle cx="90" cy="110" r="3" fill="#8B5CF6" />
                      <circle cx="110" cy="95" r="3" fill="#8B5CF6" />
                      {/* 稀疏区域 */}
                      <circle cx="300" cy="100" r="3" fill="#A78BFA" />
                      <circle cx="280" cy="90" r="3" fill="#A78BFA" />
                      {/* 噪声点 */}
                      <circle cx="200" cy="50" r="3" fill="#C4B5FD" />
                      {/* 密度连接 */}
                      <line x1="100" y1="100" x2="120" y2="90" stroke="#DDD6FE" strokeWidth="1" />
                      <line x1="120" y1="90" x2="110" y2="95" stroke="#DDD6FE" strokeWidth="1" />
                      <line x1="110" y1="95" x2="90" y2="110" stroke="#DDD6FE" strokeWidth="1" />
                    </svg>
                  </div>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>原理：基于密度可达性</li>
                    <li>优点：无需指定聚类数、可发现噪声</li>
                    <li>缺点：对参数敏感</li>
                    <li>应用：异常检测、空间数据分析</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : activeTab === 'practice' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">算法实现示例</h2>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <pre className="overflow-x-auto text-gray-800">
                <code>{`import numpy as np
import pandas as pd
from sklearn.cluster import KMeans, DBSCAN
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# 1. K-means聚类示例
def kmeans_example():
    # 生成示例数据
    X = np.random.randn(100, 2)
    
    # 数据标准化
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # 模型训练
    kmeans = KMeans(n_clusters=3, random_state=42)
    clusters = kmeans.fit_predict(X_scaled)
    
    # 可视化结果
    plt.figure(figsize=(10, 6))
    plt.scatter(X_scaled[:, 0], X_scaled[:, 1], c=clusters, cmap='viridis')
    plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1],
                marker='x', s=200, linewidths=3, color='r', label='聚类中心')
    plt.title('K-means聚类结果')
    plt.legend()
    plt.show()

# 2. PCA降维示例
def pca_example():
    # 生成高维数据
    X = np.random.randn(100, 10)
    
    # 数据标准化
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # PCA降维
    pca = PCA(n_components=2)
    X_pca = pca.fit_transform(X_scaled)
    
    # 可视化结果
    plt.figure(figsize=(10, 6))
    plt.scatter(X_pca[:, 0], X_pca[:, 1])
    plt.title('PCA降维结果')
    plt.xlabel('第一主成分')
    plt.ylabel('第二主成分')
    plt.show()
    
    # 打印解释方差比
    print(f"解释方差比: {pca.explained_variance_ratio_}")

# 3. DBSCAN聚类示例
def dbscan_example():
    # 生成示例数据
    X = np.random.randn(100, 2)
    
    # 数据标准化
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # 模型训练
    dbscan = DBSCAN(eps=0.3, min_samples=5)
    clusters = dbscan.fit_predict(X_scaled)
    
    # 可视化结果
    plt.figure(figsize=(10, 6))
    plt.scatter(X_scaled[:, 0], X_scaled[:, 1], c=clusters, cmap='viridis')
    plt.title('DBSCAN聚类结果')
    plt.show()

# 运行所有示例
if __name__ == "__main__":
    print("运行无监督学习算法示例...")
    kmeans_example()
    pca_example()
    dbscan_example()`}</code>
              </pre>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">例题1：客户分群</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">问题描述</h3>
                <p className="text-gray-700">
                  根据客户的消费行为数据，将客户分为不同的群体，以便进行精准营销。
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">数据集</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 示例数据
客户ID  消费金额  购买频率  最近购买  会员等级
001     5000     12       30       3
002     2000     5        60       2
003     8000     20       15       4
004     1000     2        90       1
...`}</code>
                </pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">解决方案</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 1. 数据预处理
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

# 加载数据
df = pd.read_csv('customer_data.csv')

# 特征标准化
scaler = StandardScaler()
X = scaler.fit_transform(df[['消费金额', '购买频率', '最近购买', '会员等级']])

# 2. 模型训练
kmeans = KMeans(n_clusters=4, random_state=42)
clusters = kmeans.fit_predict(X)

# 3. 分析结果
df['客户群体'] = clusters
cluster_analysis = df.groupby('客户群体').agg({
    '消费金额': 'mean',
    '购买频率': 'mean',
    '最近购买': 'mean',
    '会员等级': 'mean'
})
print("\\n各群体特征：")
print(cluster_analysis)`}</code>
                </pre>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">例题2：异常检测</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">问题描述</h3>
                <p className="text-gray-700">
                  使用DBSCAN算法检测网络流量数据中的异常行为。
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">数据集</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 示例数据
时间戳  数据包大小  数据包数量  连接时长  目标端口
1       1500      100        5         80
2       500       1000       60        443
3       100       5000       120       22
4       2000      50         2         3389
...`}</code>
                </pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">解决方案</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 1. 数据预处理
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN

# 加载数据
df = pd.read_csv('network_traffic.csv')

# 特征标准化
scaler = StandardScaler()
X = scaler.fit_transform(df[['数据包大小', '数据包数量', '连接时长', '目标端口']])

# 2. 异常检测
dbscan = DBSCAN(eps=0.3, min_samples=5)
clusters = dbscan.fit_predict(X)

# 3. 分析结果
df['异常标记'] = clusters
anomalies = df[df['异常标记'] == -1]
print(f"\\n检测到 {len(anomalies)} 个异常行为")
print("\\n异常行为详情：")
print(anomalies)`}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 导航链接 */}
      <div className="flex justify-between mt-8">
        <Link 
          href="/study/ai/ml/supervised"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：监督学习算法
        </Link>
        <Link 
          href="/study/ai/ml/evaluation"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：模型评估与选择
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 