'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ClusteringPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'basic', label: '基本概念' },
    { id: 'algorithms', label: '算法实现' },
    { id: 'applications', label: '实际应用' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">聚类分析</h1>
      
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
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">聚类分析基本概念</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 基本定义</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      聚类分析是一种无监督学习方法，用于将相似的数据对象分组。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 基本概念
1. 聚类（Clustering）
   - 将数据分组为簇
   - 簇内相似度高
   - 簇间相似度低

2. 距离度量
   - 欧氏距离
   - 曼哈顿距离
   - 余弦相似度

3. 评估指标
   - 轮廓系数
   - 戴维斯-波尔丁指数
   - 卡林斯基-哈拉巴斯指数

# 示例
数据集：
X = [
    [1, 2],
    [2, 1],
    [8, 9],
    [9, 8]
]

聚类结果：
簇1: [[1, 2], [2, 1]]
簇2: [[8, 9], [9, 8]]`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 聚类类型</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      聚类算法可以根据不同的特征进行分类。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 聚类类型
1. 基于划分
   - K-means
   - K-medoids
   - PAM算法

2. 基于层次
   - 凝聚层次聚类
   - 分裂层次聚类
   - BIRCH算法

3. 基于密度
   - DBSCAN
   - OPTICS
   - DENCLUE

4. 基于模型
   - 高斯混合模型
   - 自组织映射
   - 谱聚类

# 特点比较
1. K-means
   - 优点：简单、高效
   - 缺点：需要指定簇数

2. 层次聚类
   - 优点：不需要指定簇数
   - 缺点：计算复杂度高

3. DBSCAN
   - 优点：可以发现任意形状
   - 缺点：对参数敏感`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 应用场景</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      聚类分析在各个领域都有广泛的应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 应用场景
1. 客户分群
   - 市场细分
   - 个性化推荐
   - 精准营销

2. 图像分割
   - 目标检测
   - 场景理解
   - 图像压缩

3. 异常检测
   - 欺诈检测
   - 入侵检测
   - 故障诊断

4. 文本分析
   - 文档聚类
   - 主题发现
   - 情感分析

# 实际案例
1. 电商用户分群
   - 基于购买行为
   - 基于浏览历史
   - 基于人口统计

2. 医疗诊断
   - 疾病分类
   - 症状聚类
   - 治疗方案`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'algorithms' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">聚类算法实现</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. K-means算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      K-means是最经典的聚类算法之一。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# K-means算法实现
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

class KMeansClustering:
    def __init__(self, n_clusters=3, max_iter=100):
        self.n_clusters = n_clusters
        self.max_iter = max_iter
        self.centroids = None
        self.labels = None
    
    def fit(self, X):
        # 初始化质心
        n_samples = X.shape[0]
        self.centroids = X[np.random.choice(n_samples, self.n_clusters, replace=False)]
        
        for _ in range(self.max_iter):
            # 分配样本到最近的质心
            distances = np.sqrt(((X - self.centroids[:, np.newaxis])**2).sum(axis=2))
            self.labels = np.argmin(distances, axis=0)
            
            # 更新质心
            new_centroids = np.array([X[self.labels == k].mean(axis=0) 
                                    for k in range(self.n_clusters)])
            
            # 检查收敛
            if np.all(self.centroids == new_centroids):
                break
                
            self.centroids = new_centroids
    
    def predict(self, X):
        distances = np.sqrt(((X - self.centroids[:, np.newaxis])**2).sum(axis=2))
        return np.argmin(distances, axis=0)
    
    def plot_clusters(self, X):
        plt.figure(figsize=(10, 6))
        plt.scatter(X[:, 0], X[:, 1], c=self.labels, cmap='viridis')
        plt.scatter(self.centroids[:, 0], self.centroids[:, 1], 
                   c='red', marker='x', s=200, linewidths=3)
        plt.title('K-means聚类结果')
        plt.show()

# 使用示例
X = np.random.randn(100, 2)
kmeans = KMeansClustering(n_clusters=3)
kmeans.fit(X)
kmeans.plot_clusters(X)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. DBSCAN算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      DBSCAN是一种基于密度的聚类算法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# DBSCAN算法实现
import numpy as np
from sklearn.cluster import DBSCAN
import matplotlib.pyplot as plt

class DBSCANClustering:
    def __init__(self, eps=0.5, min_samples=5):
        self.eps = eps
        self.min_samples = min_samples
        self.labels = None
    
    def fit(self, X):
        # 计算距离矩阵
        n_samples = X.shape[0]
        distances = np.zeros((n_samples, n_samples))
        for i in range(n_samples):
            distances[i] = np.sqrt(((X - X[i])**2).sum(axis=1))
        
        # 初始化标签
        self.labels = np.zeros(n_samples, dtype=int)
        cluster_id = 0
        
        # 遍历所有样本
        for i in range(n_samples):
            if self.labels[i] != 0:
                continue
            
            # 获取邻域样本
            neighbors = np.where(distances[i] <= self.eps)[0]
            
            if len(neighbors) < self.min_samples:
                self.labels[i] = -1  # 标记为噪声
                continue
            
            # 开始新的簇
            cluster_id += 1
            self.labels[i] = cluster_id
            
            # 扩展簇
            self._expand_cluster(X, distances, neighbors, cluster_id)
    
    def _expand_cluster(self, X, distances, neighbors, cluster_id):
        # 处理所有邻域样本
        i = 0
        while i < len(neighbors):
            point = neighbors[i]
            
            if self.labels[point] == -1:
                self.labels[point] = cluster_id
            elif self.labels[point] == 0:
                self.labels[point] = cluster_id
                
                # 获取新的邻域样本
                new_neighbors = np.where(distances[point] <= self.eps)[0]
                
                if len(new_neighbors) >= self.min_samples:
                    neighbors = np.append(neighbors, new_neighbors)
            
            i += 1
    
    def plot_clusters(self, X):
        plt.figure(figsize=(10, 6))
        plt.scatter(X[:, 0], X[:, 1], c=self.labels, cmap='viridis')
        plt.title('DBSCAN聚类结果')
        plt.show()

# 使用示例
X = np.random.randn(100, 2)
dbscan = DBSCANClustering(eps=0.3, min_samples=5)
dbscan.fit(X)
dbscan.plot_clusters(X)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 层次聚类算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      层次聚类是一种自底向上或自顶向下的聚类方法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 层次聚类算法实现
import numpy as np
from scipy.cluster.hierarchy import dendrogram, linkage
import matplotlib.pyplot as plt

class HierarchicalClustering:
    def __init__(self, n_clusters=3):
        self.n_clusters = n_clusters
        self.labels = None
        self.linkage_matrix = None
    
    def fit(self, X):
        # 计算链接矩阵
        self.linkage_matrix = linkage(X, method='ward')
        
        # 获取聚类标签
        from scipy.cluster.hierarchy import fcluster
        self.labels = fcluster(self.linkage_matrix, 
                             self.n_clusters, 
                             criterion='maxclust')
    
    def plot_dendrogram(self):
        plt.figure(figsize=(10, 6))
        dendrogram(self.linkage_matrix)
        plt.title('层次聚类树状图')
        plt.xlabel('样本索引')
        plt.ylabel('距离')
        plt.show()
    
    def plot_clusters(self, X):
        plt.figure(figsize=(10, 6))
        plt.scatter(X[:, 0], X[:, 1], c=self.labels, cmap='viridis')
        plt.title('层次聚类结果')
        plt.show()

# 使用示例
X = np.random.randn(100, 2)
hierarchical = HierarchicalClustering(n_clusters=3)
hierarchical.fit(X)
hierarchical.plot_dendrogram()
hierarchical.plot_clusters(X)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">实际应用</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 客户分群</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      聚类分析在客户分群中有重要应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 客户分群应用
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# 加载客户数据
def load_customer_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 数据预处理
def preprocess_customer_data(df):
    # 选择特征
    features = ['age', 'income', 'spending_score']
    X = df[features].values
    
    # 标准化
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, features

# 客户分群
def customer_segmentation(X, n_clusters=5):
    # 使用K-means聚类
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    labels = kmeans.fit_predict(X)
    
    return labels, kmeans.cluster_centers_

# 可视化结果
def plot_customer_segments(X, labels, features):
    plt.figure(figsize=(12, 8))
    
    # 绘制散点图
    scatter = plt.scatter(X[:, 0], X[:, 1], 
                         c=labels, cmap='viridis')
    
    plt.xlabel(features[0])
    plt.ylabel(features[1])
    plt.title('客户分群结果')
    
    # 添加图例
    legend1 = plt.legend(*scatter.legend_elements(),
                        title="客户群")
    plt.add_artist(legend1)
    
    plt.show()

# 应用示例
def customer_analysis(file_path):
    # 加载数据
    df = load_customer_data(file_path)
    
    # 数据预处理
    X, features = preprocess_customer_data(df)
    
    # 客户分群
    labels, centers = customer_segmentation(X)
    
    # 可视化结果
    plot_customer_segments(X, labels, features)
    
    # 分析每个客户群的特征
    analyze_customer_segments(df, labels)

# 分析客户群特征
def analyze_customer_segments(df, labels):
    df['cluster'] = labels
    
    # 计算每个群的平均特征
    segment_analysis = df.groupby('cluster').mean()
    
    print("\\n客户群特征分析：")
    print(segment_analysis)
    
    # 生成营销建议
    generate_marketing_suggestions(segment_analysis)

# 生成营销建议
def generate_marketing_suggestions(segment_analysis):
    print("\\n营销建议：")
    for cluster in segment_analysis.index:
        print(f"\\n客户群 {cluster}:")
        if segment_analysis.loc[cluster, 'spending_score'] > 0:
            print("- 提供高端产品和服务")
            print("- 个性化推荐")
        else:
            print("- 提供促销活动")
            print("- 提高客户忠诚度")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 图像分割</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      聚类分析在图像分割中有重要应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 图像分割应用
import numpy as np
import cv2
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# 加载图像
def load_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    return img

# 图像预处理
def preprocess_image(img):
    # 重塑图像
    h, w, d = img.shape
    img_array = img.reshape(h * w, d)
    
    return img_array, (h, w)

# 图像分割
def segment_image(img_array, n_clusters=3):
    # 使用K-means聚类
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    labels = kmeans.fit_predict(img_array)
    
    return labels, kmeans.cluster_centers_

# 可视化结果
def plot_segmentation(img, labels, shape):
    h, w = shape
    
    # 重塑标签
    segmented = labels.reshape(h, w)
    
    plt.figure(figsize=(12, 8))
    
    # 显示原始图像
    plt.subplot(1, 2, 1)
    plt.imshow(img)
    plt.title('原始图像')
    
    # 显示分割结果
    plt.subplot(1, 2, 2)
    plt.imshow(segmented, cmap='viridis')
    plt.title('分割结果')
    
    plt.show()

# 应用示例
def image_analysis(image_path):
    # 加载图像
    img = load_image(image_path)
    
    # 图像预处理
    img_array, shape = preprocess_image(img)
    
    # 图像分割
    labels, centers = segment_image(img_array)
    
    # 可视化结果
    plot_segmentation(img, labels, shape)
    
    # 分析分割结果
    analyze_segmentation(img, labels, shape)

# 分析分割结果
def analyze_segmentation(img, labels, shape):
    h, w = shape
    segmented = labels.reshape(h, w)
    
    # 计算每个区域的特征
    regions = {}
    for i in range(len(np.unique(labels))):
        mask = segmented == i
        region = img[mask]
        
        # 计算区域特征
        regions[i] = {
            'size': np.sum(mask),
            'mean_color': np.mean(region, axis=0),
            'std_color': np.std(region, axis=0)
        }
    
    print("\\n区域分析：")
    for i, features in regions.items():
        print(f"\\n区域 {i}:")
        print(f"大小: {features['size']}")
        print(f"平均颜色: {features['mean_color']}")
        print(f"颜色标准差: {features['std_color']}")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 异常检测</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      聚类分析在异常检测中有重要应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 异常检测应用
import numpy as np
from sklearn.cluster import DBSCAN
import matplotlib.pyplot as plt

# 加载数据
def load_data(file_path):
    data = np.load(file_path)
    return data

# 数据预处理
def preprocess_data(data):
    # 标准化
    mean = np.mean(data, axis=0)
    std = np.std(data, axis=0)
    data_scaled = (data - mean) / std
    
    return data_scaled

# 异常检测
def detect_anomalies(data, eps=0.5, min_samples=5):
    # 使用DBSCAN聚类
    dbscan = DBSCAN(eps=eps, min_samples=min_samples)
    labels = dbscan.fit_predict(data)
    
    # 标记异常点
    anomalies = labels == -1
    
    return anomalies, labels

# 可视化结果
def plot_anomalies(data, anomalies, labels):
    plt.figure(figsize=(12, 8))
    
    # 绘制正常点
    normal = data[~anomalies]
    plt.scatter(normal[:, 0], normal[:, 1], 
               c=labels[~anomalies], cmap='viridis',
               label='正常点')
    
    # 绘制异常点
    if np.any(anomalies):
        plt.scatter(data[anomalies, 0], data[anomalies, 1],
                   c='red', marker='x', s=100,
                   label='异常点')
    
    plt.title('异常检测结果')
    plt.legend()
    plt.show()

# 应用示例
def anomaly_analysis(file_path):
    # 加载数据
    data = load_data(file_path)
    
    # 数据预处理
    data_scaled = preprocess_data(data)
    
    # 异常检测
    anomalies, labels = detect_anomalies(data_scaled)
    
    # 可视化结果
    plot_anomalies(data, anomalies, labels)
    
    # 分析异常点
    analyze_anomalies(data, anomalies)

# 分析异常点
def analyze_anomalies(data, anomalies):
    if np.any(anomalies):
        print("\\n异常点分析：")
        print(f"异常点数量: {np.sum(anomalies)}")
        print(f"异常点比例: {np.sum(anomalies) / len(data):.2%}")
        
        # 计算异常点特征
        anomaly_features = data[anomalies]
        print("\\n异常点特征统计：")
        print(f"平均值: {np.mean(anomaly_features, axis=0)}")
        print(f"标准差: {np.std(anomaly_features, axis=0)}")
        print(f"最小值: {np.min(anomaly_features, axis=0)}")
        print(f"最大值: {np.max(anomaly_features, axis=0)}")
    else:
        print("未检测到异常点")`}
                      </pre>
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
          href="/study/ai/datamining/association"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回关联规则
        </Link>
        <Link 
          href="/study/ai/datamining/classification"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          分类预测 →
        </Link>
      </div>
    </div>
  );
} 