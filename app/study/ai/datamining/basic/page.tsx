'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = { subject: '数据挖掘', chapterTitle: '数据挖掘基础', chapterNumber: 1, totalChapters: 10, subjectHref: '/study/ai/datamining', nextChapter: { label: '数据预处理', href: '/study/ai/datamining/preprocessing' }, theme: THEMES.ai }

const SPREADS = [
  { label: '数据挖掘概述', left: (<div className="space-y-4"><PageTitle>数据挖掘概述</PageTitle><BookParagraph>数据挖掘是从大量数据中挖掘出隐含的、先前未知的、具有潜在价值的信息和知识的过程。它融合了统计学、机器学习、数据库技术等多个学科。</BookParagraph><SectionTitle>数据挖掘流程</SectionTitle><BookList items={['业务理解：明确目标和需求','数据理解：收集和探索数据','数据准备：清洗和预处理','建模：选择和训练模型','评估：验证模型效果','部署：上线和监控']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '基本概念', left: (<div className="space-y-4"><PageTitle>基本概念</PageTitle><SectionTitle>数据类型</SectionTitle><BookList items={['结构化数据：表格数据','半结构化数据：JSON、XML','非结构化数据：文本、图像','时序数据：时间序列']} /><SectionTitle>数据挖掘任务</SectionTitle><BookList items={['分类：预测类别标签','回归：预测连续值','聚类：发现数据分组','关联规则：发现项间关系','异常检测：识别异常点']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '应用场景', left: (<div className="space-y-4"><PageTitle>应用场景</PageTitle><BookList items={['电商推荐：用户行为分析和商品推荐','金融风控：欺诈检测和信用评估','医疗诊断：疾病预测和医学影像','社交网络：社区发现和影响力分析']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '工具介绍', left: (<div className="space-y-4"><PageTitle>工具介绍</PageTitle><SectionTitle>Python数据挖掘工具</SectionTitle><BookCode language="python" code={`import pandas as pd\nimport numpy as np\nfrom sklearn import preprocessing, model_selection\nimport matplotlib.pyplot as plt\nimport seaborn as sns`} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function DmBasicPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
