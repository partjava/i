'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '机器学习',
  chapterTitle: '无监督学习算法',
  chapterNumber: 4,
  totalChapters: 11,
  subjectHref: '/study/ai/ml',
  prevChapter: { label: '监督学习算法', href: '/study/ai/ml/supervised' },
  nextChapter: { label: '模型评估与选择', href: '/study/ai/ml/evaluation' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>无监督学习算法</PageTitle>

        <SectionTitle>无监督学习概述</SectionTitle>
        <BookParagraph>
          无监督学习是机器学习的重要分支，它从未标记的数据中发现隐藏的模式和结构。
          与监督学习不同，无监督学习不需要人工标注的标签，而是通过数据本身的特征和分布来学习。
          主要任务包括聚类分析、降维技术和关联规则挖掘。
        </BookParagraph>

        <div className="grid grid-cols-3 gap-2">
          {['聚类分析', '降维技术', '关联规则'].map((item) => (
            <span key={item} className="px-3 py-2 bg-amber/5 text-amber-dark text-xs rounded-md text-center border border-amber/10">
              {item}
            </span>
          ))}
        </div>

        <SectionTitle>常用算法详解</SectionTitle>

        <h4 className="text-xs font-medium text-ink mt-4 mb-2">K-Means聚类算法</h4>
        <BookParagraph>
          K-Means是最经典的聚类算法之一，它将数据划分为K个簇，每个簇由其质心代表。
          算法通过迭代分配数据点到最近的质心，并更新质心位置，直到收敛。
          适用于球形簇，需要预先设定K值，对初始质心选择敏感。
        </BookParagraph>

        <svg width="100%" height="180" viewBox="0 0 400 180" className="my-3">
          <circle cx="100" cy="90" r="3" fill="#3B82F6" />
          <circle cx="120" cy="80" r="3" fill="#3B82F6" />
          <circle cx="90" cy="100" r="3" fill="#3B82F6" />
          <circle cx="300" cy="90" r="3" fill="#EF4444" />
          <circle cx="280" cy="80" r="3" fill="#EF4444" />
          <circle cx="310" cy="100" r="3" fill="#EF4444" />
          <circle cx="100" cy="90" r="10" fill="none" stroke="#1E40AF" strokeWidth="2" />
          <circle cx="300" cy="90" r="10" fill="none" stroke="#991B1B" strokeWidth="2" />
          <line x1="100" y1="90" x2="120" y2="80" stroke="#93C5FD" strokeWidth="1" />
          <line x1="100" y1="90" x2="90" y2="100" stroke="#93C5FD" strokeWidth="1" />
          <line x1="300" y1="90" x2="280" y2="80" stroke="#FCA5A5" strokeWidth="1" />
          <line x1="300" y1="90" x2="310" y2="100" stroke="#FCA5A5" strokeWidth="1" />
        </svg>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h4 className="text-xs font-medium text-ink mt-3 mb-2">PCA主成分分析</h4>
        <BookParagraph>
          PCA（主成分分析）是一种常用的降维技术，通过线性变换将高维数据映射到低维空间，
          保留数据中方差最大的方向。主成分是原始特征的线性组合，彼此正交。
          常用于数据可视化、降噪和特征提取。
        </BookParagraph>

        <svg width="100%" height="180" viewBox="0 0 400 180" className="my-3">
          <line x1="50" y1="140" x2="350" y2="40" stroke="#10B981" strokeWidth="2" strokeDasharray="5,3" />
          <circle cx="80" cy="120" r="3" fill="#059669" />
          <circle cx="130" cy="95" r="3" fill="#059669" />
          <circle cx="170" cy="75" r="3" fill="#059669" />
          <circle cx="220" cy="55" r="3" fill="#059669" />
          <circle cx="280" cy="60" r="3" fill="#059669" />
          <circle cx="320" cy="50" r="3" fill="#059669" />
          <line x1="80" y1="120" x2="90" y2="108" stroke="#A7F3D0" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="130" y1="95" x2="132" y2="78" stroke="#A7F3D0" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="170" y1="75" x2="168" y2="60" stroke="#A7F3D0" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="220" y1="55" x2="212" y2="42" stroke="#A7F3D0" strokeWidth="1" strokeDasharray="2,2" />
          <text x="200" y="25" textAnchor="middle" fill="#10B981" fontSize="10">第一主成分方向</text>
        </svg>

        <h4 className="text-xs font-medium text-ink mt-4 mb-2">DBSCAN聚类算法</h4>
        <BookParagraph>
          DBSCAN（基于密度的空间聚类算法）可以发现任意形状的簇，并自动识别噪声点。
          核心思想：在指定半径(eps)内包含足够多(min_samples)数据点的区域被视为密集区域。
          无需预设簇数，能处理非球形簇，对噪声鲁棒。
        </BookParagraph>

        <svg width="100%" height="180" viewBox="0 0 400 180" className="my-3">
          <circle cx="90" cy="80" r="3" fill="#3B82F6" />
          <circle cx="100" cy="75" r="3" fill="#3B82F6" />
          <circle cx="85" cy="90" r="3" fill="#3B82F6" />
          <circle cx="105" cy="88" r="3" fill="#3B82F6" />
          <circle cx="95" cy="70" r="3" fill="#3B82F6" />
          <circle cx="110" cy="78" r="3" fill="#3B82F6" />
          <circle cx="280" cy="85" r="3" fill="#EF4444" />
          <circle cx="270" cy="78" r="3" fill="#EF4444" />
          <circle cx="290" cy="80" r="3" fill="#EF4444" />
          <circle cx="285" cy="95" r="3" fill="#EF4444" />
          <circle cx="275" cy="92" r="3" fill="#EF4444" />
          <circle cx="295" cy="88" r="3" fill="#EF4444" />
          <circle cx="200" cy="140" r="3" fill="#6B7280" opacity="0.5" />
          <circle cx="50" cy="30" r="3" fill="#6B7280" opacity="0.5" />
          <text x="95" y="115" textAnchor="middle" fill="#3B82F6" fontSize="9">簇A</text>
          <text x="280" y="115" textAnchor="middle" fill="#EF4444" fontSize="9">簇B</text>
          <text x="200" y="155" textAnchor="middle" fill="#6B7280" fontSize="9">噪声点</text>
        </svg>

        <TagGrid items={['K-Means', 'PCA', 'DBSCAN', '聚类', '降维', '关联规则']} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>无监督学习代码实践</PageTitle>
        <BookParagraph>
          以下代码展示了K-Means聚类、PCA降维和DBSCAN聚类的完整实现，
          包括数据预处理、模型训练和结果可视化。
        </BookParagraph>
        <BookCode language="python" code={`import numpy as np
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
    dbscan_example()`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>代码说明</SectionTitle>
        <BookParagraph>
          <b>K-Means聚类：</b>使用sklearn的KMeans实现，设置3个簇，
          通过fit_predict得到聚类标签，可视化显示不同颜色的簇和聚类中心。
        </BookParagraph>
        <BookParagraph>
          <b>PCA降维：</b>将10维数据降至2维，通过fit_transform完成转换，
          可视化2维投影，并输出各主成分的解释方差比。
        </BookParagraph>
        <BookParagraph>
          <b>DBSCAN聚类：</b>使用DBSCAN算法，设置eps=0.3、min_samples=5，
          自动识别簇和噪声点（标签为-1的点）。
        </BookParagraph>
        <TagGrid items={['K-Means', 'PCA', 'DBSCAN', 'sklearn', 'matplotlib']} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题练习</PageTitle>

        <SectionTitle>例题1：客户分群</SectionTitle>
        <BookParagraph>
          某电商平台希望通过用户行为数据对客户进行分群，以便制定精准营销策略。
          现有客户的消费金额、购买频率、最近购买天数和会员等级数据，
          请使用K-Means聚类算法对客户进行分群分析。
        </BookParagraph>

        <h4 className="text-xs font-medium text-ink mt-3 mb-2">数据集</h4>
        <BookCode language="python" code={`# 示例数据
客户ID  消费金额  购买频率  最近购买  会员等级
001     5000     12       30       3
002     2000     5        60       2
003     8000     20       15       4
004     1000     2        90       1
005     6000     15       20       3
006     3000     8        45       2
007     9000     25       10       4
008     1500     3        75       1`} />

        <h4 className="text-xs font-medium text-ink mt-3 mb-2">解决方案</h4>
        <BookCode language="python" code={`# 1. 数据预处理
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
print(cluster_analysis)`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>例题2：异常检测</SectionTitle>
        <BookParagraph>
          某网络安全团队需要从网络流量数据中检测异常行为。
          现有数据包括数据包大小、数据包数量、连接时长和目标端口，
          请使用DBSCAN算法识别异常的网络行为。
        </BookParagraph>

        <h4 className="text-xs font-medium text-ink mt-3 mb-2">数据集</h4>
        <BookCode language="python" code={`# 示例数据
时间戳  数据包大小  数据包数量  连接时长  目标端口
1       1500      100        5         80
2       500       1000       60        443
3       100       5000       120       22
4       2000      50         2         3389
5       800       800        30        80
6       300       3000       90        443
7       1800      80         4         80
8       1200      200        15        8080`} />

        <h4 className="text-xs font-medium text-ink mt-3 mb-2">解决方案</h4>
        <BookCode language="python" code={`# 1. 数据预处理
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
print(anomalies)`} />

        <TagGrid items={['K-Means', 'DBSCAN', '客户分群', '异常检测', '聚类分析']} />
      </div>
    ),
  },
]

export default function MlUnsupervisedPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
