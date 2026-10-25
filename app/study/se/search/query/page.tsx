'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

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
<BookParagraph>课程难度、分类和时间最好作为明确筛选项呈现；自然语言猜出的条件应让用户看得懂并能取消。查询解释清晰，不仅利于排错，也能减少用户误以为“网站没有这门课程”的情况。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>匹配、过滤和加分</PageTitle>
<BookParagraph>match 会分析查询文本，适合标题正文；term 对照索引中的精确词项，适合 keyword 分类。bool 的 must 要求命中且参与评分，filter 限定资格但不贡献相关性分数，must_not 排除，should 可以提供加分或必选候选。必须明确 minimum_should_match 的语义。</BookParagraph>
<BookParagraph>例如只想优先显示标题命中的内容，可以把标题条件用作加分；若要求标题必须出现，就应成为必要条件。两种设计可能在样本第一页看起来相同，但一旦候选扩大，结果集合差异会暴露出来。</BookParagraph>
<BookList items={["有 must 或 filter 时，should 默认可以一个都不满足。", "若“至少匹配一个可选条件”是需求，显式设置 minimum_should_match 为 1。", "不要对自然语言标题直接用 term 期待自动分词。"]} />
</div>) },
{ label: "可解释的查询请求", left: (<div className="space-y-4">
<PageTitle>可解释的查询请求</PageTitle>
<BookParagraph>在 Elasticsearch Dev Tools 执行以下请求。Java 分类与公开状态必须同时满足；标题或正文至少一个字段命中 transaction。标题权重更高，但具体排名仍受词频、长度等影响。演示时间下界是固定值，实际产品应按明确的业务时区计算最近时间。</BookParagraph>
<BookCode language="text" code={"GET lessons_schema_demo/_search\n{\n  \"size\": 10,\n  \"query\": {\n    \"bool\": {\n      \"must\": [{\"multi_match\": {\n        \"query\": \"transaction\", \"fields\": [\"title^2\", \"body\"]\n      }}],\n      \"filter\": [\n        {\"term\": {\"category\": \"java\"}},\n        {\"term\": {\"visibility\": \"public\"}},\n        {\"range\": {\"published_at\": {\"gte\": \"2026-01-01\"}}}\n      ]\n    }\n  }\n}"} />
</div>), right: (<div className="space-y-4">
<PageTitle>构造可预判的样本</PageTitle>
<BookParagraph>准备四篇含 transaction 的课程：一是新发布的公开 Java 课程；二是同日期的 Python 课程；三是私密 Java 课程；四是旧日期的公开 Java 课程。该查询只能返回第一篇。先用这种最小样本验证过滤，再加入大量内容评估排序，定位问题会更清楚。</BookParagraph>
<BookParagraph>四条样本应共用可比较的字段与日期格式，避免同时引入分词、时区和数据缺失等干扰。每次只放开一个条件，记录新增哪篇文章，能直接证明该过滤是否真正生效。</BookParagraph>
</div>) },
{ label: "排序和分页的代价", left: (<div className="space-y-4">
<PageTitle>排序和分页的代价</PageTitle>
<BookParagraph>相关性检索默认按分数排序；按发布时间排序会改变“最相关”的体验，应在界面明确。浅分页可用 from 和 size，深分页会让各分片保留大量中间结果。连续浏览可考虑 search_after，沿用上一页最后一条记录返回的 sort 值，并保持查询条件不变。</BookParagraph>
<BookParagraph>用户若从按相关性切换为按时间，之前的分页游标就不能继续复用。后端应把排序模式、过滤和游标视为同一查询上下文，拒绝混用，而不是把上一页的sort值直接套到另一套排序上。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>让分页与权限稳定</PageTitle>
<BookParagraph>持续更新的索引可能让前后页重复或遗漏，严格分页可结合 point in time 保持读取视图，并及时关闭。排序必须有确定的并列处理规则。权限过滤应由后端按照当前用户生成；不能依赖前端隐藏结果，也不能接受浏览器传来的任意 visibility 条件。</BookParagraph>
<BookParagraph>如果采用结果缓存，缓存键必须包含足够的用户或权限范围，并在权限变化后失效。仅把关键词作为缓存键，可能把某个用户能看的课程摘要复用给另一个用户；权限不是一次查询结束后就可以忘记的条件。</BookParagraph>
<BookList items={["空查询：约定显示推荐课程还是提示输入。", "零结果：给出取消过滤或修正术语的入口。", "超时：返回明确状态并限制重试，不伪装成零结果。"]} />
</div>) },
{ label: "从自然语言走到查询计划", left: (<div className="space-y-4">
<PageTitle>从自然语言走到查询计划</PageTitle>
<BookParagraph>先把“Java事务入门”拆成意图：Java 是分类还是正文词，入门是难度还是标题词，事务是否允许同义表达。产品层要定义这些规则，再映射为查询条件。不要把一句输入无条件拆成所有字段的 AND，否则容易漏掉用户想找的内容；也不能全部 OR，让任何沾边文章都进入结果。</BookParagraph>
<SectionTitle>条件归类对照</SectionTitle>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">输入意图</th><th className="border-b p-2 text-left">字段类型</th><th className="border-b p-2 text-left">处理方式</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">课程讲事务</td><td className="border-b p-2 align-top">text</td><td className="border-b p-2 align-top">全文匹配并计算相关性</td></tr><tr><td className="border-b p-2 align-top">只看java方向</td><td className="border-b p-2 align-top">keyword</td><td className="border-b p-2 align-top">精确过滤</td></tr><tr><td className="border-b p-2 align-top">今年发布</td><td className="border-b p-2 align-top">date</td><td className="border-b p-2 align-top">范围过滤</td></tr><tr><td className="border-b p-2 align-top">必须标题出现</td><td className="border-b p-2 align-top">text</td><td className="border-b p-2 align-top">指定字段匹配</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>默认OR和显式AND的不同</PageTitle>
<BookParagraph>对于普通 text 字段，match 会先分析输入，再组合词项。使用示例英文词时，默认 OR 可返回只含其中一词的文档；operator and 要求两个词都匹配，但仍不是要求相邻或顺序一致。若要表达短语，应选择短语查询并理解词位置。以下请求在上一章演示索引上执行，便于观察语义而非背接口名称。</BookParagraph>
<SectionTitle>Dev Tools两次对照</SectionTitle>
<BookCode language="text" showLineNumbers code={"GET lessons_schema_demo/_search\n{\"query\":{\"match\":{\"title\":{\"query\":\"java transaction\"}}}}\n\nGET lessons_schema_demo/_search\n{\"query\":{\"match\":{\"title\":{\n  \"query\":\"java transaction\", \"operator\":\"and\"\n}}}}\n\n// AND可以命中 transaction in java，不能代替短语查询。"} />
</div>) },
{ label: "用四条记录推导布尔结果", left: (<div className="space-y-4">
<PageTitle>用四条记录推导布尔结果</PageTitle>
<BookParagraph>假设 A 是公开 Java 事务课，B 是公开 Python 事务课，C 是私密 Java 事务课，D 是公开 Java 线程课。事务 must 首先留下 A、B、C，分类 filter 去掉 B，权限 filter 去掉 C，结果为 A。若把事务写成 should 且已有两个 filter，默认可能把 D 也留下；这解释了为什么“加了关键词反而没筛掉无关课程”。</BookParagraph>
<SectionTitle>手算结果表</SectionTitle>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">文档</th><th className="border-b p-2 text-left">事务must</th><th className="border-b p-2 text-left">java且公开filter</th><th className="border-b p-2 text-left">最终</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">A</td><td className="border-b p-2 align-top">通过</td><td className="border-b p-2 align-top">通过</td><td className="border-b p-2 align-top">保留</td></tr><tr><td className="border-b p-2 align-top">B</td><td className="border-b p-2 align-top">通过</td><td className="border-b p-2 align-top">分类不符</td><td className="border-b p-2 align-top">排除</td></tr><tr><td className="border-b p-2 align-top">C</td><td className="border-b p-2 align-top">通过</td><td className="border-b p-2 align-top">权限不符</td><td className="border-b p-2 align-top">排除</td></tr><tr><td className="border-b p-2 align-top">D</td><td className="border-b p-2 align-top">不通过</td><td className="border-b p-2 align-top">通过</td><td className="border-b p-2 align-top">排除</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>后端查询参数也需要契约</PageTitle>
<BookParagraph>限制关键词长度、分类枚举、每页条数和排序模式，可以减少误用并保持可预测开销。权限由后端基于认证用户产生，而非接收浏览器完整 DSL。下面 Python 3 例子只是参数归一化；它不会发查询，也不是完整鉴权。页数非法要明确拒绝，不应该把负数默默带入请求。</BookParagraph>
<SectionTitle>独立验证参数</SectionTitle>
<BookCode language="python" showLineNumbers code={"def params(q, size, category):\n    q = q.strip()\n    if not 1 <= len(q) <= 80:\n        raise ValueError(\"关键词长度不合法\")\n    if type(size) is not int or not 1 <= size <= 50:\n        raise ValueError(\"每页数量不合法\")\n    if category not in {\"java\", \"python\"}:\n        raise ValueError(\"分类不合法\")\n    return {\"q\": q, \"size\": size, \"category\": category}\nprint(params(\" transaction \", 10, \"java\"))\n# {'q': 'transaction', 'size': 10, 'category': 'java'}"} />
</div>) },
{ label: "查询响应不能只判断HTTP成功", left: (<div className="space-y-4">
<PageTitle>查询响应不能只判断HTTP成功</PageTitle>
<BookParagraph>搜索接口可能返回超时标记或分片失败信息；只有部分结果时应按产品约定提示，而不是当作完整空列表。还要区分 hits 总数是精确值还是带关系的下界。页面展示某个“总页数”前，先确认总量口径。出现结果减少时，结合响应中的 timed_out、_shards 和查询条件排查。</BookParagraph>
<SectionTitle>检查顺序</SectionTitle>
<BookList items={["先检查请求是否被接受，再检查引擎响应中的错误或部分失败。", "读取命中文档后核对权限、字段与摘要，不把异常内容直接当HTML渲染。", "分别记录网络耗时和引擎执行时间，避免把全部延迟归咎于分词。"]} />
</div>), right: (<div className="space-y-4">
<PageTitle>分页的一个具体例子</PageTitle>
<BookParagraph>按发布时间降序查两条，第一批是十点、九点。此时新加入十一点课程，如果下一页继续用 from=2，九点可能重复。search_after 用上一页的排序值继续向后，能避免这类偏移变化；但记录修改排序字段仍会影响读取，所以要求稳定快照时再结合 PIT，并保留唯一并列键。</BookParagraph>
<SectionTitle>排序值推演</SectionTitle>
<BookCode language="text" showLineNumbers code={"第一次排序：A(10:00), B(09:00), C(08:00)\n新增X(11:00)后：X, A, B, C\n偏移下一页 from=2 → B, C（B重复）\n游标下一页 after=(09:00, B) → C\n若还要求内容冻结：采用PIT并正确关闭读取视图"} />
</div>) },
{ label: "性能诊断先从可重复条件开始", left: (<div className="space-y-4">
<PageTitle>性能诊断先从可重复条件开始</PageTitle>
<BookParagraph>慢查询比较需要固定索引版本、输入查询、并发与缓存状态。先限制返回字段和页大小，再查看过滤、排序和评分开销。Profile 适合定位内部执行热点，但会增加开销，也不覆盖网络与全部排队时间。不要把开启 profile 后的延迟直接当作日常线上延迟。</BookParagraph>
<SectionTitle>Dev Tools定位示例</SectionTitle>
<BookCode language="text" showLineNumbers code={"GET lessons_schema_demo/_search\n{\n  \"profile\": true,\n  \"size\": 5,\n  \"_source\": [\"lesson_id\", \"title\"],\n  \"query\": {\"match\": {\"title\": \"transaction\"}}\n}\n// 比较各组件耗时；压测时关闭profile并独立测端到端耗时。"} />
</div>), right: (<div className="space-y-4">
<PageTitle>以响应解释完成查询闭环</PageTitle>
<BookParagraph>拿同一份四篇样本，分别执行事务 must、事务 should 与 AND 文本查询，写出预期集合后再运行。若结果不符，依次检查字段类型、分析词项、布尔默认值和权限规则。这个顺序能把语义错误与性能问题分开；只有先确定返回内容正确，优化耗时才有意义。</BookParagraph>
<SectionTitle>官方延伸</SectionTitle>
<BookList items={[<a key="https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-match-query" href="https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-match-query" target="_blank" rel="noopener noreferrer" className="underline">Elastic：match语义</a>, <a key="https://www.elastic.co/docs/reference/elasticsearch/rest-apis/search-profile" href="https://www.elastic.co/docs/reference/elasticsearch/rest-apis/search-profile" target="_blank" rel="noopener noreferrer" className="underline">Elastic：查询Profile</a>]} />
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
