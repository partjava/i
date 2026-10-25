'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

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
<BookParagraph>学习时沿着同一组课程样本前进：先手算候选集合，再理解字段评分，最后讨论更新与权限。这样每个名词都能对应一项具体操作，而不是把采集、索引和排序背成彼此独立的定义。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>四个阶段各做什么</PageTitle>
<BookParagraph>采集阶段取得课程标题、正文与权限；索引阶段分析文本并建立词项到文档的关联；查询阶段理解输入、筛选候选；排序阶段把更相关的内容排到前面。展示页还需摘要、分页和空结果引导。数据库仍保存原始业务记录，搜索索引作为可重建的派生数据。</BookParagraph>
<BookParagraph>这四个阶段可以分别失败。例如采集没取得正文，后面再好的排序也无法补回；正文已写入但权限字段错误，可能出现不该展示的结果。排查时先找出错误发生在哪一层，再选择工具。</BookParagraph>
<BookList items={["文档：一篇课程及其标识、标题、正文和分类。", "词项：分析文本后得到的检索单元，不一定等于一个汉字。", "倒排表：某个词项出现在哪些文档中。"]} />
</div>) },
{ label: "亲手建立倒排表", left: (<div className="space-y-4">
<PageTitle>亲手建立倒排表</PageTitle>
<BookParagraph>下面程序只用 Python 3 标准库，可直接保存为 search_demo.py 运行。为观察算法，使用空格分词的英文课程标签；它没有中文分词能力。set 去掉同篇文档内的重复词，避免把出现次数误认为不同文档数。</BookParagraph>
<BookCode language="python" code={"from collections import defaultdict\n\ndocs = {1: \"java transaction\", 2: \"java thread\",\n        3: \"python transaction\"}\nindex = defaultdict(set)\nfor doc_id, text in docs.items():\n    for term in set(text.lower().split()):\n        index[term].add(doc_id)\nterms = \"Java transaction\".lower().split()\nhits = set(docs)\nfor term in terms:\n    hits &= index.get(term, set())\nprint(sorted(hits))  # [1]"} />
</div>), right: (<div className="space-y-4">
<PageTitle>为什么能找到文档一</PageTitle>
<BookParagraph>java 的倒排集合是一和二，transaction 的集合是一和三，取交集只剩一。这对应所有查询词都要出现的策略。改成交集以外的并集会返回三个候选，随后需要排序。注意未知词应返回空集合；若直接跳过未知词，用户搜索不存在的术语也可能收到不相关结果。</BookParagraph>
<BookParagraph>集合操作还隐含一个前提：查询与文档使用兼容的归一化规则。示例统一转小写，所以 Java 能匹配 java；若只在写入或查询一侧转小写，相同概念就可能被视为不同词项。</BookParagraph>
</div>) },
{ label: "从匹配走向排序", left: (<div className="space-y-4">
<PageTitle>从匹配走向排序</PageTitle>
<BookParagraph>包含查询词只是第一步。标题里出现“事务”的课程通常比页脚偶然提到事务更值得展示。可以考虑标题权重、词在文档中的频次和文档长度。BM25 是常见词法评分方法，但分数不是正确率，也不能跨完全不同的查询直接比较。先解释相关性，再考虑人为加权。</BookParagraph>
<BookParagraph>可以把排序看成在候选中回答“哪一篇更适合当前问题”。用户输入事务，并不一定更想看最热门课程；若热度完全盖过相关性，入门课程也可能被无关热门文章挤下去，因此业务加权要有上限与评估证据。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>中文与更新的边界</PageTitle>
<BookParagraph>“数据库事务”如何分词，会影响“事务”能否召回该课程。索引与查询需要兼容的分析策略，不能简单依赖 Python split。文章修改后要同步索引，删除或改为私密也必须及时反映；只补新增数据会让搜索结果长期落后于业务状态。</BookParagraph>
<BookParagraph>对于 C++、.NET、版本号和异常类名，还应保留原样检索能力，避免归一化时删掉有意义符号。中文学习网站通常同时含自然语言与代码术语，应分别准备样本检验，而非只测试几个普通中文词。</BookParagraph>
<BookList items={["诊断零结果：先检查文档存在，再检查分词和过滤条件。", "诊断重复结果：检查业务主键与重复采集。", "诊断旧摘要：比较数据库更新时间和索引版本。"]} />
</div>) },
{ label: "从顺序扫描算起", left: (<div className="space-y-4">
<PageTitle>从顺序扫描算起</PageTitle>
<BookParagraph>先看不建索引的成本。假设十万篇课程平均各五千字符，每个查询都逐篇读取正文，相当于检查约五亿字符；并发查询还会重复做同样工作。倒排索引把分析成本提前到写入阶段，查询只读取相关词项的候选列表。这个换时间的办法也引入空间、同步和重建成本，不能理解为免费的加速。</BookParagraph>
<SectionTitle>对比两种读取路径</SectionTitle>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">方案</th><th className="border-b p-2 text-left">写入时工作</th><th className="border-b p-2 text-left">查询时工作</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">逐篇扫描</td><td className="border-b p-2 align-top">保存原文</td><td className="border-b p-2 align-top">检查每篇正文</td></tr><tr><td className="border-b p-2 align-top">倒排检索</td><td className="border-b p-2 align-top">分析并维护词项表</td><td className="border-b p-2 align-top">定位词项并合并候选</td></tr><tr><td className="border-b p-2 align-top">业务数据库查询</td><td className="border-b p-2 align-top">按业务索引维护记录</td><td className="border-b p-2 align-top">执行结构化条件查询</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>按倒排表手算一次查询</PageTitle>
<BookParagraph>令文档一为 java transaction rollback，二为 java thread，三为 python transaction，四为 java transaction。处理 java transaction 时，可先取较短的 transaction 表，再与 java 表求交，得到一和四。若查询采用任意词匹配，并集是一、二、三、四；二和三只覆盖一个词，应由排序阶段区分相关性。</BookParagraph>
<SectionTitle>集合变化</SectionTitle>
<BookCode language="text" showLineNumbers code={"java        → [1, 2, 4]\ntransaction → [1, 3, 4]\nrollback    → [1]\nAND: [1, 3, 4] ∩ [1, 2, 4] = [1, 4]\nOR : [1, 3, 4] ∪ [1, 2, 4] = [1, 2, 3, 4]"} />
</div>) },
{ label: "词频、位置为什么不能混为一谈", left: (<div className="space-y-4">
<PageTitle>词频、位置为什么不能混为一谈</PageTitle>
<BookParagraph>只有文档编号的倒排表能判断是否出现，却无法直接判断“事务回滚”是不是连续短语。加入词频可以估计主题强度，加入位置才能判断相邻关系。例如一篇标题是 java transaction，另一篇是 transaction in java，它们包含同样的词，但短语查询的结果可能不同。位置、字段和词项共同决定匹配语义。</BookParagraph>
<SectionTitle>从位置推导短语</SectionTitle>
<BookCode language="python" showLineNumbers code={"positions = {\n    1: {\"java\": [0], \"transaction\": [1]},\n    2: {\"java\": [2], \"transaction\": [0]}\n}\nphrase_hits = []\nfor doc_id, terms in positions.items():\n    if any(p + 1 in terms[\"transaction\"] for p in terms[\"java\"]):\n        phrase_hits.append(doc_id)\nprint(phrase_hits)  # [1]"} />
</div>), right: (<div className="space-y-4">
<PageTitle>先理解一个简化评分器</PageTitle>
<BookParagraph>下面给标题命中每词两分、正文每词一分，只展示字段加权，不是 BM25 实现。文档一虽然标题命中 java，文档二标题命中两个词，最后二更靠前。代码用集合计分意味着重复堆词不会加分；真实评分还要考虑词在语料中的普遍程度、文档长度和词频饱和，不能把线性堆词当成可靠相关性。</BookParagraph>
<SectionTitle>Python 3独立例子</SectionTitle>
<BookCode language="python" showLineNumbers code={"query = {\"java\", \"transaction\"}\ndocs = {\n    1: (\"java guide\", \"transaction intro\"),\n    2: (\"java transaction\", \"rollback\"),\n    3: (\"python\", \"transaction\")\n}\nscores = {}\nfor doc_id, (title, body) in docs.items():\n    scores[doc_id] = (2 * len(query & set(title.split()))\n                     + len(query & set(body.split())))\nprint(sorted(scores.items(), key=lambda x: (-x[1], x[0])))\n# [(2, 4), (1, 3), (3, 1)]"} />
</div>) },
{ label: "召回不足与排序不好分开诊断", left: (<div className="space-y-4">
<PageTitle>召回不足与排序不好分开诊断</PageTitle>
<BookParagraph>用户想学“事务回滚”，正确课程完全没有进入候选集合，调排序权重也救不回来；这时检查采集范围、分析词项、权限过滤和同义表达。若正确课程已经在第二十名，再研究字段权重与评分。排查时保存查询条件、候选文档和最终排序，避免只凭第一页截图猜问题。</BookParagraph>
<SectionTitle>两种问题的证据</SectionTitle>
<BookList items={["召回问题：已知相关文档不在候选中，先检查索引与匹配。", "排序问题：相关文档在候选中但靠后，再检查评分与权重。", "展示问题：排序正确却摘要误导，单独检查摘要生成与原文定位。"]} />
</div>), right: (<div className="space-y-4">
<PageTitle>设计索引同步的事实链</PageTitle>
<BookParagraph>原文是业务事实，索引是派生副本。文章编辑后，可以在事务提交后发送带文档 ID 和版本的更新任务；消费者重复收到同一版本也应得到同一结果。若旧任务晚到，不能覆盖新内容。删除和权限变更通常比普通文字更新更敏感，应有明确时效、重试和对账机制。</BookParagraph>
<SectionTitle>同步步骤</SectionTitle>
<BookCode language="text" showLineNumbers code={"数据库提交版本 12\n    → 记录待同步任务 (lesson-7, version=12)\n    → 消费者读取最新可见内容\n    → 更新同一搜索文档 ID\n    → 确认写入结果并记录版本\n    → 定期核对数据库与索引的差异"} />
</div>) },
{ label: "同一个需求不一定都用搜索引擎", left: (<div className="space-y-4">
<PageTitle>同一个需求不一定都用搜索引擎</PageTitle>
<BookParagraph>按课程编号取一篇文章、按用户找自己的进度，数据库主键和结构化索引通常更直接。跨大量自然语言正文检索，才更能体现全文索引价值。引入搜索服务意味着要维护容量、更新链路和故障处理；先证明现有方案在哪个指标上不够，再选择系统，避免为简单列表页增加一条不必要的同步链。</BookParagraph>
<SectionTitle>选择依据</SectionTitle>
<BookList items={["查唯一编号：优先业务数据库。", "按类别分页：先评估数据库索引与实际数据量。", "自然语言正文、相关性排序：评估全文引擎。"]} />
</div>), right: (<div className="space-y-4">
<PageTitle>把概念串成一次请求</PageTitle>
<BookParagraph>课程发布后先进入采集和索引链路，用户查询再经历分析、候选生成、权限过滤、排序与摘要展示。每个阶段都要有可核对的数据：原始记录 ID、词项、候选 ID、分数与最终 URL。用这些证据解释“为什么搜不到”，比一次性改分词器、权重和缓存更有效。</BookParagraph>
<SectionTitle>本章补充练习</SectionTitle>
<BookParagraph>在四篇手算文档中新增一篇长正文，只出现一次 transaction。先预测简化评分器结果，再说明为什么真实引擎可能改变次序；答案应谈及长度、稀有词及字段，而不是把真实分数当成固定常数。</BookParagraph>
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
