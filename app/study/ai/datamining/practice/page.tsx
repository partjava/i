'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const pipeCode = `from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.decomposition import PCA\nfrom sklearn.ensemble import RandomForestClassifier\n\npipe = Pipeline([\n    ('scaler', StandardScaler()),\n    ('pca', PCA(n_components=0.95)),\n    ('clf', RandomForestClassifier())\n])\npipe.fit(X_train, y_train)\nprint(f"Score: {pipe.score(X_test, y_test):.4f}")`

const META: LessonMeta = { subject: '数据挖掘', chapterTitle: '数据挖掘实战', chapterNumber: 9, totalChapters: 10, subjectHref: '/study/ai/datamining', prevChapter: { label: '数据可视化', href: '/study/ai/datamining/visualization' }, nextChapter: { label: '面试题与前沿', href: '/study/ai/datamining/interview' }, theme: THEMES.ai }

const SPREADS = [
  { label: '项目案例', left: (<div className="space-y-4"><PageTitle>数据挖掘实战</PageTitle><SectionTitle>完整的分类项目</SectionTitle><BookParagraph>从数据加载、探索性分析、特征工程到模型训练和评估的完整流程。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>Pipeline示例</SectionTitle><BookCode language="python" code={pipeCode} /></div>) },
  { label: '开发流程', left: (<div className="space-y-4"><PageTitle>开发流程</PageTitle><BookList items={['数据探索：统计摘要和可视化','特征工程：特征构建和选择','模型训练：多模型对比','模型评估：交叉验证','模型部署：API服务']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '最佳实践', left: (<div className="space-y-4"><PageTitle>最佳实践</PageTitle><BookList items={['数据质量检查优先','特征工程决定上限','模型集成提升性能','交叉验证评估泛化']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '开发工具', left: (<div className="space-y-4"><PageTitle>开发工具</PageTitle><BookList items={['Jupyter Notebook：交互式分析','Pandas Profiling：EDA自动化','MLflow：实验管理','DVC：数据版本控制']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function DmPracticePage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
