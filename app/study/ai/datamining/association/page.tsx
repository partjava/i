'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const aprioriCode = `from mlxtend.frequent_patterns import apriori, association_rules
import pandas as pd

# 事务数据
data = pd.DataFrame({
    'milk': [1,0,1,1,0], 'bread': [1,1,1,0,1],
    'eggs': [0,1,1,1,1], 'butter': [1,0,0,1,0]
})

# 挖掘频繁项集
frequent = apriori(data, min_support=0.3, use_colnames=True)

# 生成关联规则
rules = association_rules(frequent, metric="lift", min_threshold=1.0)
print(rules[['antecedents', 'consequents', 'support', 'confidence', 'lift']])`

const META: LessonMeta = { subject: '数据挖掘', chapterTitle: '关联规则挖掘', chapterNumber: 4, totalChapters: 10, subjectHref: '/study/ai/datamining', prevChapter: { label: '特征工程', href: '/study/ai/datamining/feature-engineering' }, nextChapter: { label: '聚类分析', href: '/study/ai/datamining/clustering' }, theme: THEMES.ai }

const SPREADS = [
  { label: '基本概念', left: (<div className="space-y-4"><PageTitle>关联规则挖掘</PageTitle><BookParagraph>关联规则挖掘发现数据项之间的有趣关系，最经典的例子是购物篮分析。核心概念包括支持度、置信度和提升度。</BookParagraph><SectionTitle>核心概念</SectionTitle><BookList items={['支持度(Support)：项集出现的频率','置信度(Confidence)：A出现时B出现的条件概率','提升度(Lift)：A对B的提升效果']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '算法实现', left: (<div className="space-y-4"><PageTitle>算法实现</PageTitle><SectionTitle>Apriori算法</SectionTitle><BookParagraph>Apriori算法通过迭代搜索频繁项集，利用先验性质剪枝。先生成频繁1项集，再逐步生成更高维的频繁项集。</BookParagraph><BookCode language="python" code={aprioriCode} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '实际应用', left: (<div className="space-y-4"><PageTitle>实际应用</PageTitle><SectionTitle>FP-Growth</SectionTitle><BookParagraph>FP-Growth使用FP树压缩事务数据库，避免生成候选集，效率比Apriori高。</BookParagraph><BookList items={['购物篮分析：交叉销售','推荐系统：商品关联推荐','网页挖掘：用户行为分析']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function DmAssociationPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
