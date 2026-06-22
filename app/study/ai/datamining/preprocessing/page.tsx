'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const META: LessonMeta = { subject: '数据挖掘', chapterTitle: '数据预处理', chapterNumber: 2, totalChapters: 10, subjectHref: '/study/ai/datamining', prevChapter: { label: '数据挖掘基础', href: '/study/ai/datamining/basic' }, nextChapter: { label: '特征工程', href: '/study/ai/datamining/feature-engineering' }, theme: THEMES.ai }

const SPREADS = [
  { label: '数据清洗', left: (<div className="space-y-4"><PageTitle>数据清洗</PageTitle><SectionTitle>缺失值处理</SectionTitle><BookCode language="python" code={`import pandas as pd\ndf = pd.read_csv("data.csv")\ndf.dropna()  # 删除缺失值\ndf.fillna(df.mean())  # 均值填充\ndf.fillna(method='ffill')  # 前向填充`} /><SectionTitle>异常值处理</SectionTitle><BookCode language="python" code={`# Z-score方法\nfrom scipy import stats\nz = np.abs(stats.zscore(df))\ndf = df[(z < 3).all(axis=1)]\n\n# IQR方法\nQ1, Q3 = df.quantile(0.25), df.quantile(0.75)\nIQR = Q3 - Q1\ndf = df[~((df < Q1-1.5*IQR) | (df > Q3+1.5*IQR)).any(axis=1)]`} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '数据转换', left: (<div className="space-y-4"><PageTitle>数据转换</PageTitle><SectionTitle>标准化和归一化</SectionTitle><BookCode language="python" code={`from sklearn.preprocessing import StandardScaler, MinMaxScaler\n\n# Z-score标准化\nscaler = StandardScaler()\ndf_scaled = scaler.fit_transform(df)\n\n# 最大最小归一化\nminmax = MinMaxScaler()\ndf_norm = minmax.fit_transform(df)`} /><SectionTitle>编码</SectionTitle><BookCode language="python" code={`# One-Hot编码\ndf = pd.get_dummies(df, columns=['category'])\n\n# 标签编码\nfrom sklearn.preprocessing import LabelEncoder\ndf['label'] = LabelEncoder().fit_transform(df['label'])`} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '特征工程', left: (<div className="space-y-4"><PageTitle>特征工程</PageTitle><SectionTitle>特征提取</SectionTitle><BookList items={['数值特征：统计特征、比例特征','类别特征：计数特征、目标编码','文本特征：TF-IDF、词向量','时间特征：年、月、日、星期']} /><SectionTitle>特征选择</SectionTitle><BookList items={['方差选择：去除低方差特征','互信息：特征与目标相关性','卡方检验：分类特征选择','递归特征消除：RFE']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function DmPreprocessingPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
