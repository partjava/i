'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

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
</div>), right: (<div className="space-y-4">
<PageTitle>字段类型决定行为</PageTitle>
<BookParagraph>标题和正文通常作为 text 参与全文分析，课程分类和状态作为 keyword 精确筛选，发布时间用 date，阅读数用整数。某些标题同时需要全文检索和排序，可以增加 keyword 子字段。动态推断方便试验，但首条数据的偶然格式可能把后续字段类型带偏。</BookParagraph>
<BookList items={["text：检索分析后的词项。", "keyword：按完整值筛选、聚合或排序。", "date：执行时间范围查询与时间排序。", "object 与 nested：有数组对象时先确认是否需要保持对象内部关联。"]} />
</div>) },
{ label: "显式映射示例", left: (<div className="space-y-4">
<PageTitle>显式映射示例</PageTitle>
<BookParagraph>下面是 Elasticsearch Dev Tools 的建索引请求，适用于现代无类型映射接口。它使用独立的课程演示索引，不修改已有索引。dynamic strict 会拒绝未声明字段，便于在接入阶段及早发现拼写错误；如果业务允许扩展属性，应另行设计模板或受控字段。</BookParagraph>
<BookCode language="text" code={"PUT lessons_schema_demo\n{\n  \"mappings\": {\n    \"dynamic\": \"strict\",\n    \"properties\": {\n      \"lesson_id\": {\"type\": \"keyword\"},\n      \"title\": {\"type\": \"text\"},\n      \"body\": {\"type\": \"text\"},\n      \"category\": {\"type\": \"keyword\"},\n      \"published_at\": {\"type\": \"date\"},\n      \"visibility\": {\"type\": \"keyword\"}\n    }\n  }\n}"} />
</div>), right: (<div className="space-y-4">
<PageTitle>分析器需要实测</PageTitle>
<BookParagraph>分词结果直接决定倒排词项。先使用 _analyze API 对真实课程标题和用户查询做实验，再决定分析器；不要看到中文就假设默认分析器能理解专业词。索引时丢掉的信息无法靠查询恢复。修改已有字段的分析方式通常需要新建索引并重新写入数据。</BookParagraph>
</div>) },
{ label: "写入成功与可检索", left: (<div className="space-y-4">
<PageTitle>写入成功与可检索</PageTitle>
<BookParagraph>写入响应成功后，搜索结果可能暂时看不到新数据，这是刷新可见性问题。交互演示可用 refresh=wait_for 等待搜索可见，批量导入不宜每条都强制刷新。刷新不等于备份，也不等于整个集群已经完成容灾；持久化、复制和恢复要分别设计。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>批量导入与迁移</PageTitle>
<BookParagraph>Bulk 使用动作行和数据行交替的 NDJSON，末尾保留换行。整个请求收到响应仍要逐条检查 items 中的错误，只重试可重试项。映射调整时可创建新索引、回填并验证，再切换业务别名；迁移期间的新写入还需补齐，不能只做一次静态复制。</BookParagraph>
<BookList items={["稳定 ID 防止重试造成重复。", "对账总量、关键样本和更新时间，不能只看 HTTP 状态。", "保留旧索引一段时间用于回退，切换前说明回退期间的数据同步方式。"]} />
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
