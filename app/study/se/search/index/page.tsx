'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '索引构建',
  chapterNumber: 3,
  totalChapters: 6,
  subjectHref: '/study/se/search',
  prevChapter: { label: '爬虫与数据采集', href: '/study/se/search/crawler' },
  nextChapter: { label: '查询处理', href: '/study/se/search/query' },
  theme: THEMES.software,
}

const SPREADS = [
{ label: "先设计搜索文档", left: (<div className="space-y-4">
<PageTitle>先设计搜索文档</PageTitle>
<BookParagraph>索引不是把整张数据库表原样复制。面向课程搜索，可以保留 lesson_id、title、body、category、published_at 和 visibility。以业务主键作为文档 ID，重复同步会替换同一记录。避免把密码、内部备注等无关字段送入搜索系统；展示需要的数据也应经过权限审查。</BookParagraph>
<BookParagraph>先列出用户实际需要的查询：搜标题、筛方向、按时间排序、点击回到原课程。每个字段说明业务来源和更新频率，尤其是权限与发布状态。这样可以避免写入大量无用字段，也能知道哪种业务变更必须触发同步。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>字段类型决定行为</PageTitle>
<BookParagraph>标题和正文通常作为 text 参与全文分析，课程分类和状态作为 keyword 精确筛选，发布时间用 date，阅读数用整数。某些标题同时需要全文检索和排序，可以增加 keyword 子字段。动态推断方便试验，但首条数据的偶然格式可能把后续字段类型带偏。</BookParagraph>
<BookParagraph>类型选择应从问题反推。分类需要精确等值，标题需要词项匹配，时间需要范围比较；如果把阅读数存成字符串，字典序就可能让一百排在二十前面。映射既是存储契约，也是查询语义的一部分。</BookParagraph>
<BookList items={["text：检索分析后的词项。", "keyword：按完整值筛选、聚合或排序。", "date：执行时间范围查询与时间排序。", "object 与 nested：有数组对象时先确认是否需要保持对象内部关联。"]} />
</div>) },
{ label: "显式映射示例", left: (<div className="space-y-4">
<PageTitle>显式映射示例</PageTitle>
<BookParagraph>下面是 Elasticsearch Dev Tools 的建索引请求，适用于现代无类型映射接口。它使用独立的课程演示索引，不修改已有索引。dynamic strict 会拒绝未声明字段，便于在接入阶段及早发现拼写错误；如果业务允许扩展属性，应另行设计模板或受控字段。</BookParagraph>
<BookCode language="text" code={"PUT lessons_schema_demo\n{\n  \"mappings\": {\n    \"dynamic\": \"strict\",\n    \"properties\": {\n      \"lesson_id\": {\"type\": \"keyword\"},\n      \"title\": {\"type\": \"text\"},\n      \"body\": {\"type\": \"text\"},\n      \"category\": {\"type\": \"keyword\"},\n      \"published_at\": {\"type\": \"date\"},\n      \"visibility\": {\"type\": \"keyword\"}\n    }\n  }\n}"} />
</div>), right: (<div className="space-y-4">
<PageTitle>分析器需要实测</PageTitle>
<BookParagraph>分词结果直接决定倒排词项。先使用 _analyze API 对真实课程标题和用户查询做实验，再决定分析器；不要看到中文就假设默认分析器能理解专业词。索引时丢掉的信息无法靠查询恢复。修改已有字段的分析方式通常需要新建索引并重新写入数据。</BookParagraph>
<BookParagraph>先准备一组“应命中”和“不应命中”的标题查询对，例如 Java 与 JavaScript、事务与回滚、版本八与版本十一。查看分析结果后，再用这些对照验证检索，防止一个术语改善却破坏其他重要词项。</BookParagraph>
</div>) },
{ label: "写入成功与可检索", left: (<div className="space-y-4">
<PageTitle>写入成功与可检索</PageTitle>
<BookParagraph>写入响应成功后，搜索结果可能暂时看不到新数据，这是刷新可见性问题。交互演示可用 refresh=wait_for 等待搜索可见，批量导入不宜每条都强制刷新。刷新不等于备份，也不等于整个集群已经完成容灾；持久化、复制和恢复要分别设计。</BookParagraph>
<BookParagraph>可以把一次编辑分为业务提交、索引写入和搜索可见三个时间点。用户刚保存后立即搜索的体验要求与批量历史导入不同，前者可能需要等待可见，后者优先吞吐；应按交互需求选择策略。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>批量导入与迁移</PageTitle>
<BookParagraph>Bulk 使用动作行和数据行交替的 NDJSON，末尾保留换行。整个请求收到响应仍要逐条检查 items 中的错误，只重试可重试项。映射调整时可创建新索引、回填并验证，再切换业务别名；迁移期间的新写入还需补齐，不能只做一次静态复制。</BookParagraph>
<BookParagraph>迁移方案还需要说明失败边界。如果新索引完成了百分之九十就中断，恢复时应该知道最后处理位点和哪些文档已成功，不能重复累积统计或跳过未写入的记录。稳定ID与分批对账是基本工具。</BookParagraph>
<BookList items={["稳定 ID 防止重试造成重复。", "对账总量、关键样本和更新时间，不能只看 HTTP 状态。", "保留旧索引一段时间用于回退，切换前说明回退期间的数据同步方式。"]} />
</div>) },
{ label: "一份文档对应几种数据结构", left: (<div className="space-y-4">
<PageTitle>一份文档对应几种数据结构</PageTitle>
<BookParagraph>写入标题后，引擎不只保存原始 JSON：全文字段产生倒排词项，原始内容用于取回展示，适合排序聚合的字段还可能有面向列的访问结构。查询正文与统计分类的访问模式不同，字段设计因此不只是选择字符串或数字。不要为了节省一点映射工作就把所有内容塞进同一 text 字段。</BookParagraph>
<SectionTitle>按读取方式选结构</SectionTitle>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">用途</th><th className="border-b p-2 text-left">主要问题</th><th className="border-b p-2 text-left">课程字段例子</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">全文匹配</td><td className="border-b p-2 align-top">哪个词在哪些文档里</td><td className="border-b p-2 align-top">title、body</td></tr><tr><td className="border-b p-2 align-top">返回原始内容</td><td className="border-b p-2 align-top">如何展示命中文档</td><td className="border-b p-2 align-top">原始字段内容</td></tr><tr><td className="border-b p-2 align-top">排序与聚合</td><td className="border-b p-2 align-top">如何遍历同一字段的值</td><td className="border-b p-2 align-top">category、published_at</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>分析链如何改变词项</PageTitle>
<BookParagraph>分析过程可以包含字符处理、切词和词项过滤。对 Java TRANSACTION basics 使用标准分析器，可观察小写化后的 java、transaction、basics。分析器的名字不是业务效果保证，应对中文术语、版本号和代码标识符分别实验。这里在 Dev Tools 执行请求，不需要额外中文插件；观察 tokens 数组中的 term 与 position。</BookParagraph>
<SectionTitle>分析请求</SectionTitle>
<BookCode language="text" showLineNumbers code={"POST _analyze\n{\n  \"analyzer\": \"standard\",\n  \"text\": \"Java TRANSACTION basics\"\n}\n\n// 观察词项：java、transaction、basics\n// 观察位置：0、1、2"} />
</div>) },
{ label: "同一标题的全文与精确用途", left: (<div className="space-y-4">
<PageTitle>同一标题的全文与精确用途</PageTitle>
<BookParagraph>如果既要搜索标题中的词，又要按完整标题排序，可以把 title 定义为 text，并添加 raw keyword 子字段。查询 title 与对 title.raw 做精确筛选是两条不同路径。即使主字段分析后变成小写，raw 子字段仍保存完整值，精确条件应考虑大小写与空白规则。以下是新建独立演示索引的映射。</BookParagraph>
<SectionTitle>Dev Tools映射片段</SectionTitle>
<BookCode language="text" showLineNumbers code={"PUT lessons_fields_demo\n{\n  \"mappings\": {\"properties\": {\n    \"title\": {\n      \"type\": \"text\",\n      \"fields\": {\"raw\": {\"type\": \"keyword\"}}\n    }\n  }}\n}\n// 对 title 使用 match；对 title.raw 使用 term 或排序。"} />
</div>), right: (<div className="space-y-4">
<PageTitle>批量写入的成功是逐条判断的</PageTitle>
<BookParagraph>Bulk 格式里动作行说明要操作哪个 ID，下一行才是正文。下面是 NDJSON 请求体，末尾必须有换行；不是一个包住所有记录的 JSON 数组。响应的 errors 为真时，需要查看每项状态与原因。例如第二条字段格式不合法，第一条仍可能成功；全量重试时要使用稳定 ID，并避免盲目重试永久格式错误。</BookParagraph>
<SectionTitle>Dev Tools批量格式</SectionTitle>
<BookCode language="text" showLineNumbers code={"POST lessons_fields_demo/_bulk?refresh=wait_for\n{\"index\":{\"_id\":\"lesson-1\"}}\n{\"title\":\"Java transaction\"}\n{\"index\":{\"_id\":\"lesson-2\"}}\n{\"title\":\"Python transaction\"}\n\n// 检查响应 errors 与 items 中每条操作的状态。"} />
</div>) },
{ label: "更新为什么要考虑乱序", left: (<div className="space-y-4">
<PageTitle>更新为什么要考虑乱序</PageTitle>
<BookParagraph>一个课程的版本十二先到，版本十一后到，如果按到达顺序覆盖，索引就回退了。可以在消费者读数据库最新状态、使用单主键有序队列或采用引擎支持的版本控制；不同方案的前提不同。仅在文档正文放一个 version 字段但从不比较，并不能自动阻止旧任务写入。</BookParagraph>
<SectionTitle>按版本拒绝陈旧任务的概念例子</SectionTitle>
<BookCode language="python" showLineNumbers code={"# Python 3：模拟消费者的版本门禁，不是跨进程原子实现\nsaved = {}\nfor incoming in [(7, 12, \"new\"), (7, 11, \"old\"), (7, 12, \"new\")]:\n    doc_id, version, body = incoming\n    current = saved.get(doc_id)\n    if current is None or version > current[0]:\n        saved[doc_id] = (version, body)\nprint(saved[7])  # (12, 'new')"} />
</div>), right: (<div className="space-y-4">
<PageTitle>分片和副本的取舍</PageTitle>
<BookParagraph>分片把一个逻辑索引拆成可分布处理的部分，副本为故障恢复和读取提供更多副本。分片过多会增加管理与查询协调成本；过少也可能限制容量或并行度。课程练习不需要模仿大公司的分片数量，应记录数据大小、写入速度、查询延迟和恢复时间，再决定配置。单节点上的未分配副本也不能提供跨节点容灾。</BookParagraph>
<SectionTitle>容量推理</SectionTitle>
<BookParagraph>若原始数据翻倍，不能直接假定总磁盘只翻倍：索引、原始字段、副本与迁移期间的新旧两份数据都会占空间。为重建留临时容量，并用实际样本估算放大比例。</BookParagraph>
</div>) },
{ label: "重建索引的时间窗口", left: (<div className="space-y-4">
<PageTitle>重建索引的时间窗口</PageTitle>
<BookParagraph>为新分析器创建新索引后，先记录起始版本或同步位点，再导入历史数据、追平增量并对账，最后切换查询别名。需要说明哪些写入在切换期间发生、失败后回到哪里。只比记录数不够：两份同数量数据也可能内容不同，应抽查关键 ID、权限和更新时间。</BookParagraph>
<SectionTitle>流程图</SectionTitle>
<BookCode language="text" showLineNumbers code={"旧索引继续提供查询\n  → 创建新映射 → 历史回填 → 增量追平\n  → 校验数量/样本/权限 → 切换读取别名\n  → 观察错误与延迟 → 按保留策略回收旧索引\n失败：暂停切换，继续查询旧索引并保留同步位点"} />
</div>), right: (<div className="space-y-4">
<PageTitle>索引设计练习的参考推导</PageTitle>
<BookParagraph>为一个课程标题建立 text 与 raw 双用途后，解释“Java Basics”和“java basics”在哪些查询里相同、哪些查询里不同。再让两条同步任务乱序到达，写出防回退方案及其并发前提。答案应从实际分析结果和版本比较推导，不能只说“用了消息队列就不会丢数据”。</BookParagraph>
<SectionTitle>官方延伸</SectionTitle>
<BookList items={[<a key="https://www.elastic.co/docs/reference/text-analysis/analysis-standard-analyzer" href="https://www.elastic.co/docs/reference/text-analysis/analysis-standard-analyzer" target="_blank" rel="noopener noreferrer" className="underline">Elastic：标准分析器</a>, <a key="https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-bulk" href="https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-bulk" target="_blank" rel="noopener noreferrer" className="underline">Elastic：Bulk API</a>]} />
</div>) },
{ label: "练习：验证字段约束", left: (<div className="space-y-4">
<PageTitle>练习：验证字段约束</PageTitle>
<BookParagraph>建立演示映射后写入一条课程，把 category 设为 java，再尝试添加未声明字段 categorry。比较两次响应。接着写入非法日期并解释失败原因。最后画出一次标题分析器变更的迁移流程，明确旧数据、增量数据与查询别名分别怎么处理。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>验收与参考</PageTitle>
<BookParagraph>正确样本能写入，拼错字段和非法日期应被拒绝；失败文档不应被当作同步成功。迁移方案须覆盖回填、校验、追平增量、切换与回退。能够区分“搜索暂不可见”和“写入失败”，比记住一条建索引命令更重要。</BookParagraph>
<BookList items={[<a key="https://www.elastic.co/docs/manage-data/data-store/mapping" href="https://www.elastic.co/docs/manage-data/data-store/mapping" target="_blank" rel="noopener noreferrer">Elastic：Mapping</a>, <a key="https://www.elastic.co/docs/reference/elasticsearch/rest-apis/refresh-parameter" href="https://www.elastic.co/docs/reference/elasticsearch/rest-apis/refresh-parameter" target="_blank" rel="noopener noreferrer">Elastic：refresh 参数</a>]} />
</div>) }
]

export default function SearchIndexPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
