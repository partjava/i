'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@shared/components/ui/book/BookContent'

const kmeansCode = `from sklearn.cluster import KMeans\nimport matplotlib.pyplot as plt\n\nkmeans = KMeans(n_clusters=3, random_state=42)\nkmeans.fit(X)\nlabels = kmeans.labels_\ncentroids = kmeans.cluster_centers_\n\nplt.scatter(X[:,0], X[:,1], c=labels, cmap='viridis')\nplt.scatter(centroids[:,0], centroids[:,1], marker='x', s=200)`

const dbscanCode = `from sklearn.cluster import DBSCAN\ndb = DBSCAN(eps=0.3, min_samples=5)\ndb.fit(X)\nprint(f"聚类数: {len(set(db.labels_)) - (1 if -1 in db.labels_ else 0)}")`

const META: LessonMeta = { subject: '数据挖掘', chapterTitle: '聚类分析', chapterNumber: 5, totalChapters: 10, subjectHref: '/study/ai/datamining', prevChapter: { label: '关联规则挖掘', href: '/study/ai/datamining/association' }, nextChapter: { label: '分类与预测', href: '/study/ai/datamining/classification' }, theme: THEMES.ai }

const SPREADS = [
  { label: '基本概念', left: (<div className="space-y-4"><PageTitle>聚类分析</PageTitle><BookParagraph>聚类是将数据集中的样本划分为若干个不相交的子集（簇），使得簇内样本相似度高，簇间样本相似度低。</BookParagraph><SectionTitle>聚类类型</SectionTitle><BookList items={['划分聚类：K-Means、K-Medoids','层次聚类：AGNES、DIANA','密度聚类：DBSCAN、OPTICS','模型聚类：高斯混合模型']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '算法实现', left: (<div className="space-y-4"><PageTitle>算法实现</PageTitle><SectionTitle>K-Means</SectionTitle><BookCode language="python" code={kmeansCode} /><SectionTitle>DBSCAN</SectionTitle><BookCode language="python" code={dbscanCode} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '实际应用', left: (<div className="space-y-4"><PageTitle>实际应用</PageTitle><BookList items={['客户分群：RFM分析','图像分割：像素聚类','异常检测：离群点识别','文档聚类：主题发现']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function DmClusteringPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
