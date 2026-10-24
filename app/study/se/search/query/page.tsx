'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '查询处理',
  chapterNumber: 4,
  totalChapters: 6,
  subjectHref: '/study/se/search',
  prevChapter: { label: '索引构建', href: '/study/se/search/index' },
  nextChapter: { label: 'Elasticsearch示例', href: '/study/se/search/elasticsearch' },
  theme: THEMES.software,
}

const SPREADS = [
{ label: "把用户问题拆成条件", left: (<div className="space-y-4">
<PageTitle>把用户问题拆成条件</PageTitle>
<BookParagraph>用户想找“最近发布的 Java 事务课程”，其中“事务”是全文内容，“Java”是课程分类，“最近”是时间范围。先区分文本相关性和硬性资格，查询才容易解释。下面示例沿用上一章的映射，使用英文标题观察分词，不依赖额外中文分析插件。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>匹配、过滤和加分</PageTitle>
<BookParagraph>match 会分析查询文本，适合标题正文；term 对照索引中的精确词项，适合 keyword 分类。bool 的 must 要求命中且参与评分，filter 限定资格但不贡献相关性分数，must_not 排除，should 可以提供加分或必选候选。必须明确 minimum_should_match 的语义。</BookParagraph>
<BookList items={["有 must 或 filter 时，should 默认可以一个都不满足。", "若“至少匹配一个可选条件”是需求，显式设置 minimum_should_match 为 1。", "不要对自然语言标题直接用 term 期待自动分词。"]} />
</div>) },
{ label: "可解释的查询请求", left: (<div className="space-y-4">
<PageTitle>可解释的查询请求</PageTitle>
<BookParagraph>在 Elasticsearch Dev Tools 执行以下请求。Java 分类与公开状态必须同时满足；标题或正文至少一个字段命中 transaction。标题权重更高，但具体排名仍受词频、长度等影响。演示时间下界是固定值，实际产品应按明确的业务时区计算最近时间。</BookParagraph>
<BookCode language="text" code={"GET lessons_schema_demo/_search\n{\n  \"size\": 10,\n  \"query\": {\n    \"bool\": {\n      \"must\": [{\"multi_match\": {\n        \"query\": \"transaction\", \"fields\": [\"title^2\", \"body\"]\n      }}],\n      \"filter\": [\n        {\"term\": {\"category\": \"java\"}},\n        {\"term\": {\"visibility\": \"public\"}},\n        {\"range\": {\"published_at\": {\"gte\": \"2026-01-01\"}}}\n      ]\n    }\n  }\n}"} />
</div>), right: (<div className="space-y-4">
<PageTitle>构造可预判的样本</PageTitle>
<BookParagraph>准备四篇含 transaction 的课程：一是新发布的公开 Java 课程；二是同日期的 Python 课程；三是私密 Java 课程；四是旧日期的公开 Java 课程。该查询只能返回第一篇。先用这种最小样本验证过滤，再加入大量内容评估排序，定位问题会更清楚。</BookParagraph>
</div>) },
{ label: "排序和分页的代价", left: (<div className="space-y-4">
<PageTitle>排序和分页的代价</PageTitle>
<BookParagraph>相关性检索默认按分数排序；按发布时间排序会改变“最相关”的体验，应在界面明确。浅分页可用 from 和 size，深分页会让各分片保留大量中间结果。连续浏览可考虑 search_after，沿用上一页最后一条记录返回的 sort 值，并保持查询条件不变。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>让分页与权限稳定</PageTitle>
<BookParagraph>持续更新的索引可能让前后页重复或遗漏，严格分页可结合 point in time 保持读取视图，并及时关闭。排序必须有确定的并列处理规则。权限过滤应由后端按照当前用户生成；不能依赖前端隐藏结果，也不能接受浏览器传来的任意 visibility 条件。</BookParagraph>
<BookList items={["空查询：约定显示推荐课程还是提示输入。", "零结果：给出取消过滤或修正术语的入口。", "超时：返回明确状态并限制重试，不伪装成零结果。"]} />
</div>) },
{ label: "练习：先预测再执行", left: (<div className="space-y-4">
<PageTitle>练习：先预测再执行</PageTitle>
<BookParagraph>在前述四篇课程基础上，去掉分类过滤，写出新增命中的记录；去掉状态过滤，判断哪条私密记录会暴露。再添加 should 标题匹配却不设置 minimum_should_match，观察它是否缩小结果范围。把“资格变化”和“顺序变化”分别记录。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>验收与参考</PageTitle>
<BookParagraph>应能解释每篇文档被保留或排除的原因；标题加分可以改变顺序，但在已有 must/filter 时，默认 should 不会强制命中。对分页的验收应覆盖同分文档与查询期间新增文档，不能只检查第一页数量。</BookParagraph>
<BookList items={[<a key="https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-bool-query" href="https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-bool-query" target="_blank" rel="noopener noreferrer">Elastic：Boolean query</a>, <a key="https://www.elastic.co/docs/reference/elasticsearch/rest-apis/paginate-search-results" href="https://www.elastic.co/docs/reference/elasticsearch/rest-apis/paginate-search-results" target="_blank" rel="noopener noreferrer">Elastic：分页查询</a>]} />
</div>) }
]

export default function SearchQueryPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
