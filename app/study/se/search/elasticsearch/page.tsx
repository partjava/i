'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: 'Elasticsearch示例',
  chapterNumber: 5,
  totalChapters: 6,
  subjectHref: '/study/se/search',
  prevChapter: { label: '查询处理', href: '/study/se/search/query' },
  nextChapter: { label: '高级搜索特性', href: '/study/se/search/advanced' },
  theme: THEMES.software,
}

const SPREADS = [
{ label: "实验目标与环境", left: (<div className="space-y-4">
<PageTitle>实验目标与环境</PageTitle>
<BookParagraph>本章完成一个两篇课程的可复现实验：连接服务、建索引、写入文档、执行搜索并解释结果。命令使用 Bash、curl 和 Elasticsearch 8.x 的 REST 接口。准备一个本机开发实例及其生成的密码、HTTP CA 证书；安装步骤见末页官方指南，勿把演示凭据写进仓库。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>建立可信连接</PageTitle>
<BookParagraph>使用启用认证与 HTTPS 的开发实例。把服务生成的 CA 证书放在当前目录，设置下面的终端变量；read 的输入不进入命令历史。密码只留在当前终端环境中。若使用云端实例，应改用其端点、CA 与合适的访问凭据，不要为了连通而关闭证书验证。</BookParagraph>
<BookCode language="bash" code={"export ES_URL=\"https://localhost:9200\"\nexport ES_CA=\"$PWD/http_ca.crt\"\nread -rsp \"Elastic password: \" ELASTIC_PASSWORD; echo\nexport ELASTIC_PASSWORD\ncurl --cacert \"$ES_CA\" \\\n  -u \"elastic:$ELASTIC_PASSWORD\" \"$ES_URL\""} />
</div>) },
{ label: "创建独立演示索引", left: (<div className="space-y-4">
<PageTitle>创建独立演示索引</PageTitle>
<BookParagraph>依次运行命令；索引名已存在时先查看其用途，不要直接删除重来。示例只声明标题与分类，保持结构简洁。使用管理员账号仅用于本机教学，真实应用应使用仅能访问所需索引的账号或 API key。</BookParagraph>
<BookCode language="bash" code={"curl --cacert \"$ES_CA\" -u \"elastic:$ELASTIC_PASSWORD\" \\\n  -X PUT \"$ES_URL/lessons_lab\" \\\n  -H 'Content-Type: application/json' -d '{\n  \"mappings\": {\"properties\": {\n    \"title\": {\"type\": \"text\"},\n    \"category\": {\"type\": \"keyword\"}\n  }}\n}'\n"} />
</div>), right: (<div className="space-y-4">
<PageTitle>写入两篇文档</PageTitle>
<BookParagraph>为便于复现，标题采用英文，用固定 ID 避免重复运行时生成重复课程。第二条写入等待刷新；它与第一条处于同一演示索引。每条响应都应检查是否出现 error；若创建索引失败，先解决原因，再继续执行后续步骤。</BookParagraph>
<BookCode language="bash" code={"curl --cacert \"$ES_CA\" -u \"elastic:$ELASTIC_PASSWORD\" \\\n -X PUT \"$ES_URL/lessons_lab/_doc/1?refresh=wait_for\" \\\n -H 'Content-Type: application/json' \\\n -d '{\"title\":\"Java transaction basics\",\"category\":\"java\"}'\ncurl --cacert \"$ES_CA\" -u \"elastic:$ELASTIC_PASSWORD\" \\\n -X PUT \"$ES_URL/lessons_lab/_doc/2?refresh=wait_for\" \\\n -H 'Content-Type: application/json' \\\n -d '{\"title\":\"Python transaction basics\",\"category\":\"python\"}' "} />
</div>) },
{ label: "组合全文与分类查询", left: (<div className="space-y-4">
<PageTitle>组合全文与分类查询</PageTitle>
<BookParagraph>查询 transaction 应能召回两篇，但分类过滤要求 java，因此最终只有文档一。观察 hits.hits 中的 _id、_source 和 _score，区分原始字段与引擎计算结果。该最小实验只验证匹配和过滤，不足以证明排序质量。</BookParagraph>
<BookCode language="bash" code={"curl --cacert \"$ES_CA\" -u \"elastic:$ELASTIC_PASSWORD\" \\\n \"$ES_URL/lessons_lab/_search?pretty\" \\\n -H 'Content-Type: application/json' -d '{\n \"query\": {\"bool\": {\n   \"must\": [{\"match\": {\"title\": \"transaction\"}}],\n   \"filter\": [{\"term\": {\"category\": \"java\"}}]\n }}\n}' "} />
</div>), right: (<div className="space-y-4">
<PageTitle>按层排查错误</PageTitle>
<BookParagraph>连接被拒绝先检查实例与端口；证书错误先检查 CA 和主机名；认证失败检查账号与密码；映射错误查看响应的具体字段。搜索零结果时，先查询全部文档确认写入，再单独验证全文条件和分类条件。不要用重建整个服务解决普通查询问题。</BookParagraph>
<BookList items={["写入成功但暂时搜不到：核对 refresh 与查询索引。", "重复运行数量增加：检查是否遗漏固定文档 ID。", "标题能搜索而分类不能筛选：检查 keyword 映射及大小写。"]} />
</div>) },
{ label: "练习：更新与对照", left: (<div className="space-y-4">
<PageTitle>练习：更新与对照</PageTitle>
<BookParagraph>把文档一的标题更新为 Java concurrency basics，等待刷新后再次搜索 transaction，预期零结果。去掉分类过滤，预期只剩文档二。重新写回原始文档一，核对总量仍为两篇。用这一过程说明固定 ID 更新、搜索可见性与过滤条件的关系。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>验收与参考</PageTitle>
<BookParagraph>实验通过的标志是两篇文档可重复写入且不增加数量，原查询只返回一，更新后结果按预期变化。停止实验后清除当前终端的密码变量。生产环境还需最小权限、备份、容量与监控，本章的单机练习不能替代这些配置。</BookParagraph>
<BookList items={[<a key="https://www.elastic.co/docs/deploy-manage/deploy/self-managed/install-elasticsearch-docker-basic" href="https://www.elastic.co/docs/deploy-manage/deploy/self-managed/install-elasticsearch-docker-basic" target="_blank" rel="noopener noreferrer">Elastic：Docker 单节点开发环境</a>, <a key="https://www.elastic.co/docs/reference/elasticsearch/rest-apis/refresh-parameter" href="https://www.elastic.co/docs/reference/elasticsearch/rest-apis/refresh-parameter" target="_blank" rel="noopener noreferrer">Elastic：refresh 参数</a>]} />
</div>) }
]

export default function SearchElasticsearchPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
