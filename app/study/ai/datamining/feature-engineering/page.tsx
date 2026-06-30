'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@shared/components/ui/book/BookContent'

const polyCode = `from sklearn.preprocessing import PolynomialFeatures\npoly = PolynomialFeatures(degree=2, interaction_only=True)\nX_poly = poly.fit_transform(X)`

const pcaCode = `from sklearn.decomposition import PCA\npca = PCA(n_components=0.95)  # 保留95%方差\nX_pca = pca.fit_transform(X)\nprint(f"降维: {X.shape[1]} -> {X_pca.shape[1]}")`

const META: LessonMeta = { subject: '数据挖掘', chapterTitle: '特征工程', chapterNumber: 3, totalChapters: 10, subjectHref: '/study/ai/datamining', prevChapter: { label: '数据预处理', href: '/study/ai/datamining/preprocessing' }, nextChapter: { label: '关联规则挖掘', href: '/study/ai/datamining/association' }, theme: THEMES.ai }

const SPREADS = [
  { label: '特征选择', left: (<div className="space-y-4"><PageTitle>特征选择</PageTitle><SectionTitle>过滤法</SectionTitle><BookCode language="python" code={`from sklearn.feature_selection import SelectKBest, chi2, f_classif\n# 卡方检验\nskb = SelectKBest(chi2, k=10)\nX_selected = skb.fit_transform(X, y)\n# 方差分析\nskb = SelectKBest(f_classif, k=10)`} /><SectionTitle>包装法</SectionTitle><BookCode language="python" code={`from sklearn.feature_selection import RFE\nfrom sklearn.svm import SVC\nrfe = RFE(estimator=SVC(), n_features_to_select=10)\nrfe.fit(X, y)\nprint(rfe.support_)`} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '特征构建', left: (<div className="space-y-4"><PageTitle>特征构建</PageTitle><SectionTitle>多项式特征</SectionTitle><BookCode language="python" code={polyCode} /><SectionTitle>聚合特征</SectionTitle><BookCode language="python" code={`# 分组聚合特征\ndf.groupby('user_id').agg({\n    'amount': ['mean', 'sum', 'std'],\n    'time': ['count', 'nunique']\n})`} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '特征降维', left: (<div className="space-y-4"><PageTitle>特征降维</PageTitle><SectionTitle>PCA主成分分析</SectionTitle><BookCode language="python" code={pcaCode} /><SectionTitle>t-SNE</SectionTitle><BookCode language="python" code={`from sklearn.manifold import TSNE\nimport matplotlib.pyplot as plt\ntsne = TSNE(n_components=2, random_state=42)\nX_tsne = tsne.fit_transform(X)\nplt.scatter(X_tsne[:,0], X_tsne[:,1], c=y)`} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function DmFeatureEngineeringPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
