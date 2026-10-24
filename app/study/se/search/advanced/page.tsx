'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '高级搜索特性',
  chapterNumber: 6,
  totalChapters: 6,
  subjectHref: '/study/se/search',
  prevChapter: { label: 'Elasticsearch示例', href: '/study/se/search/elasticsearch' },
  theme: THEMES.software,
}

const SPREADS = [
{ label: "先定义搜索质量", left: (<div className="space-y-4">
<PageTitle>先定义搜索质量</PageTitle>
<BookParagraph>高级搜索首先要能证明改动有用。以课程检索为例，收集真实但脱敏的查询，标注哪些课程相关，并按术语查询、自然语言提问和拼写错误分组。留出独立评估集，不能一边用同一批查询调权重，一边用它宣布效果提升。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>准确率、召回率与首条结果</PageTitle>
<BookParagraph>Precision@K 衡量前 K 条有多少相关结果；Recall@K 衡量已知相关文档中找回多少；MRR 关注首条相关结果的位置。已知相关集合不完整时，召回率只能按当前标注集合估计。平均数还应按查询类型拆开，避免热门词掩盖少见术语的退步。</BookParagraph>
<BookList items={["前五条中三条相关：Precision@5 为 3/5。", "已标注四条相关，前五条找到三条：Recall@5 为 3/4。", "第一条相关排第三：该查询的倒数排名为 1/3。"]} />
</div>) },
{ label: "用小程序比较排序", left: (<div className="space-y-4">
<PageTitle>用小程序比较排序</PageTitle>
<BookParagraph>下面 Python 3 程序计算二元相关性下的 MRR。分数为每个查询首条相关结果倒数的平均值，无相关命中计零。示例没有调用模型，适合先验证指标实现；正式评估还应记录样本数、相关性标注规则和查询分布。</BookParagraph>
<BookCode language="python" code={"def reciprocal_rank(results, relevant):\n    for rank, doc_id in enumerate(results, 1):\n        if doc_id in relevant:\n            return 1 / rank\n    return 0.0\n\nlabels = [{\"a\"}, {\"b\"}]\nbefore = [[\"x\", \"a\"], [\"x\", \"y\"]]\nafter = [[\"a\", \"x\"], [\"x\", \"b\"]]\nfor runs in (before, after):\n    mrr = sum(reciprocal_rank(r, y)\n              for r, y in zip(runs, labels)) / len(labels)\n    print(mrr)  # 0.25，再输出 0.75"} />
</div>), right: (<div className="space-y-4">
<PageTitle>同义词和纠错的取舍</PageTitle>
<BookParagraph>“数据库”和“DB”可能是同义表达，但 Java 与 JavaScript 不能因为前缀相近就视为同义。纠错应保留原查询并给用户选择，特别是类名、错误码和版本号。先在查询日志中找到高频零结果模式，再小范围加入规则，检查是否引入无关召回。</BookParagraph>
</div>) },
{ label: "词法与语义可以互补", left: (<div className="space-y-4">
<PageTitle>词法与语义可以互补</PageTitle>
<BookParagraph>词法检索擅长精确术语和标识符，向量检索更容易覆盖自然语言表达。可分别召回候选，再用 RRF 按排名融合；直接相加原始分数往往缺乏可比尺度。融合只能重排已召回的文档，任一分支遗漏的相关内容仍可能找不到，需要同时检查候选池。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>上线还要考虑代价</PageTitle>
<BookParagraph>向量模型、索引版本、延迟和计算成本都应记录。任何分支都必须应用同样的权限约束，融合后再检查也不能让私密内容进入摘要或模型上下文。高亮片段只是文本匹配提示；生成回答时应保留可访问的原文链接，并允许用户核对出处。</BookParagraph>
<BookList items={["对比基线：相关性指标、零结果率和 P95 响应时间。", "更新策略：模型变更时评估是否重建全部向量。", "故障降级：向量服务失败时保留可用的词法查询。"]} />
</div>) },
{ label: "练习：设计一次改进实验", left: (<div className="space-y-4">
<PageTitle>练习：设计一次改进实验</PageTitle>
<BookParagraph>选二十条课程查询，人工标注相关文档，并拆成调参与评估两组。只改变一项策略，例如标题权重或增加同义词；保存两份排名，计算 MRR 和 Precision@5，逐条检查变好与变差的查询。样本很小时应描述观察，不把偶然提升当作普遍结论。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>验收与参考</PageTitle>
<BookParagraph>程序应输出 0.25 和 0.75；实验报告需包含基线、改动、固定评估集、失败案例及延迟代价。能解释“为什么更好”和“哪些查询变差”，才能决定是否上线。RRF 的具体接口与可用条件随部署版本变化，接入前对照所用版本文档。</BookParagraph>
<BookList items={[<a key="https://www.elastic.co/docs/reference/elasticsearch/rest-apis/retrievers/rrf-retriever" href="https://www.elastic.co/docs/reference/elasticsearch/rest-apis/retrievers/rrf-retriever" target="_blank" rel="noopener noreferrer">Elastic：RRF retriever</a>, <a key="https://www.elastic.co/docs/solutions/search/full-text/search-with-full-text-queries" href="https://www.elastic.co/docs/solutions/search/full-text/search-with-full-text-queries" target="_blank" rel="noopener noreferrer">Elastic：全文检索</a>]} />
</div>) }
]

export default function SearchAdvancedPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
