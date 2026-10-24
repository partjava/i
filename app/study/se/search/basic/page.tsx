'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '搜索引擎基础',
  chapterNumber: 1,
  totalChapters: 6,
  subjectHref: '/study/se/search',
  nextChapter: { label: '爬虫与数据采集', href: '/study/se/search/crawler' },
  theme: THEMES.software,
}

const SPREADS = [
{ label: "从站内搜索认识系统", left: (<div className="space-y-4">
<PageTitle>从站内搜索认识系统</PageTitle>
<BookParagraph>假设学习平台已有三千篇课程，用户输入“Java 事务”，希望先看到相关课程，再按方向、难度筛选。搜索系统需要把作者写的内容转换成可检索的数据，并在用户输入后尽快返回有用结果。学习本章后，你应能画出数据到结果的流程，并用小程序解释倒排索引。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>四个阶段各做什么</PageTitle>
<BookParagraph>采集阶段取得课程标题、正文与权限；索引阶段分析文本并建立词项到文档的关联；查询阶段理解输入、筛选候选；排序阶段把更相关的内容排到前面。展示页还需摘要、分页和空结果引导。数据库仍保存原始业务记录，搜索索引作为可重建的派生数据。</BookParagraph>
<BookList items={["文档：一篇课程及其标识、标题、正文和分类。", "词项：分析文本后得到的检索单元，不一定等于一个汉字。", "倒排表：某个词项出现在哪些文档中。"]} />
</div>) },
{ label: "亲手建立倒排表", left: (<div className="space-y-4">
<PageTitle>亲手建立倒排表</PageTitle>
<BookParagraph>下面程序只用 Python 3 标准库，可直接保存为 search_demo.py 运行。为观察算法，使用空格分词的英文课程标签；它没有中文分词能力。set 去掉同篇文档内的重复词，避免把出现次数误认为不同文档数。</BookParagraph>
<BookCode language="python" code={"from collections import defaultdict\n\ndocs = {1: \"java transaction\", 2: \"java thread\",\n        3: \"python transaction\"}\nindex = defaultdict(set)\nfor doc_id, text in docs.items():\n    for term in set(text.lower().split()):\n        index[term].add(doc_id)\nterms = \"Java transaction\".lower().split()\nhits = set(docs)\nfor term in terms:\n    hits &= index.get(term, set())\nprint(sorted(hits))  # [1]"} />
</div>), right: (<div className="space-y-4">
<PageTitle>为什么能找到文档一</PageTitle>
<BookParagraph>java 的倒排集合是一和二，transaction 的集合是一和三，取交集只剩一。这对应所有查询词都要出现的策略。改成交集以外的并集会返回三个候选，随后需要排序。注意未知词应返回空集合；若直接跳过未知词，用户搜索不存在的术语也可能收到不相关结果。</BookParagraph>
</div>) },
{ label: "从匹配走向排序", left: (<div className="space-y-4">
<PageTitle>从匹配走向排序</PageTitle>
<BookParagraph>包含查询词只是第一步。标题里出现“事务”的课程通常比页脚偶然提到事务更值得展示。可以考虑标题权重、词在文档中的频次和文档长度。BM25 是常见词法评分方法，但分数不是正确率，也不能跨完全不同的查询直接比较。先解释相关性，再考虑人为加权。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>中文与更新的边界</PageTitle>
<BookParagraph>“数据库事务”如何分词，会影响“事务”能否召回该课程。索引与查询需要兼容的分析策略，不能简单依赖 Python split。文章修改后要同步索引，删除或改为私密也必须及时反映；只补新增数据会让搜索结果长期落后于业务状态。</BookParagraph>
<BookList items={["诊断零结果：先检查文档存在，再检查分词和过滤条件。", "诊断重复结果：检查业务主键与重复采集。", "诊断旧摘要：比较数据库更新时间和索引版本。"]} />
</div>) },
{ label: "练习：写出检索预期", left: (<div className="space-y-4">
<PageTitle>练习：写出检索预期</PageTitle>
<BookParagraph>沿用程序，分别搜索 java、transaction 和 kotlin，先写预期结果再运行。把策略改为任意词匹配，比较 java transaction 的结果。最后新增文档四“java transaction rollback”，重新建索引，说明为什么查询结果变成一和四，而不是覆盖文档一。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>验收与继续阅读</PageTitle>
<BookParagraph>验收时应得到 java 对应一和二，transaction 对应一和三，kotlin 对应空列表；并集策略返回一、二、三。能说清候选集合与排序的差别，才算理解基础。下一章将把手写文档替换成可追踪的数据采集流程。</BookParagraph>
<BookList items={[<a key="https://www.elastic.co/docs/solutions/search/full-text/search-with-full-text-queries" href="https://www.elastic.co/docs/solutions/search/full-text/search-with-full-text-queries" target="_blank" rel="noopener noreferrer">Elastic：全文检索</a>]} />
</div>) }
]

export default function SearchBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
