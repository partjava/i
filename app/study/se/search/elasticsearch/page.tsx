'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

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
<BookParagraph>实验先只使用英文课程标题，目的是把映射、写入和过滤的行为看清楚。中文分词与复杂排序留待单独样本验证，这样连接失败或字段类型错误时，不会与语言处理问题混在一起。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>建立可信连接</PageTitle>
<BookParagraph>使用启用认证与 HTTPS 的开发实例。把服务生成的 CA 证书放在当前目录，设置下面的终端变量；read 的输入不进入命令历史。密码只留在当前终端环境中。若使用云端实例，应改用其端点、CA 与合适的访问凭据，不要为了连通而关闭证书验证。</BookParagraph>
<BookParagraph>先检查根响应是否包含实例信息，再继续建索引。证书文件不存在、主机名不匹配和密码错误会产生不同响应；记录错误类别即可，排障截图不应暴露真实密码。终端变量只是本机教学的简化做法。</BookParagraph>
<BookCode language="bash" code={"export ES_URL=\"https://localhost:9200\"\nexport ES_CA=\"$PWD/http_ca.crt\"\nread -rsp \"Elastic password: \" ELASTIC_PASSWORD; echo\nexport ELASTIC_PASSWORD\ncurl --cacert \"$ES_CA\" \\\n  -u \"elastic:$ELASTIC_PASSWORD\" \"$ES_URL\""} />
</div>) },
{ label: "创建独立演示索引", left: (<div className="space-y-4">
<PageTitle>创建独立演示索引</PageTitle>
<BookParagraph>依次运行命令；索引名已存在时先查看其用途，不要直接删除重来。示例只声明标题与分类，保持结构简洁。使用管理员账号仅用于本机教学，真实应用应使用仅能访问所需索引的账号或 API key。</BookParagraph>
<BookParagraph>创建返回成功后再读取映射核对字段。若同名索引之前由其他实验建立，返回已存在错误不代表当前结构正确；可改用新的专用名称，并同步替换后续命令中的索引名，保持整个实验一致。</BookParagraph>
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
<BookParagraph>如果全文条件可以返回两篇，而加入分类后零结果，优先核对分类原值与大小写，不要先调整服务内存。排查记录应写出每一步排除了什么原因，让别人能够复现，而非仅给出最后“重试成功”的结论。</BookParagraph>
<BookList items={["写入成功但暂时搜不到：核对 refresh 与查询索引。", "重复运行数量增加：检查是否遗漏固定文档 ID。", "标题能搜索而分类不能筛选：检查 keyword 映射及大小写。"]} />
</div>) },
{ label: "先理解节点和索引边界", left: (<div className="space-y-4">
<PageTitle>先理解节点和索引边界</PageTitle>
<BookParagraph>节点运行服务，索引组织一类文档，文档 ID 标识单条记录。不要把数据库表、索引、分片和节点机械一一对应：一个索引可能跨多个分片和节点，单节点也能容纳多个索引。实验用 lessons_lab 隔离数据，应用访问时应固定允许的索引或别名，避免浏览器参数决定整个集群的读取范围。</BookParagraph>
<SectionTitle>概念与本实验</SectionTitle>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">概念</th><th className="border-b p-2 text-left">本实验角色</th><th className="border-b p-2 text-left">常见误解</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">节点</td><td className="border-b p-2 align-top">本地开发服务</td><td className="border-b p-2 align-top">一个索引必须一个进程</td></tr><tr><td className="border-b p-2 align-top">索引</td><td className="border-b p-2 align-top">lessons_lab</td><td className="border-b p-2 align-top">文档正文等于索引全部存储</td></tr><tr><td className="border-b p-2 align-top">文档ID</td><td className="border-b p-2 align-top">1与2</td><td className="border-b p-2 align-top">每次写入都应新建随机ID</td></tr><tr><td className="border-b p-2 align-top">字段映射</td><td className="border-b p-2 align-top">title和category</td><td className="border-b p-2 align-top">所有字符串都按相同语义检索</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>先查看映射，再诊断查询</PageTitle>
<BookParagraph>在完成原有建索引步骤后运行下面请求，先看字段定义，再看少量文档内容。category 应为 keyword，title 应为 text；如果早先误建了索引，后续 PUT 创建失败不能当作成功继续。映射与实际数据不同步时，要修正实验流程或换新的专用索引，不要清空正在使用的业务索引。</BookParagraph>
<SectionTitle>Bash检查命令</SectionTitle>
<BookCode language="bash" showLineNumbers code={"curl --cacert \"$ES_CA\" -u \"elastic:$ELASTIC_PASSWORD\" \\\n \"$ES_URL/lessons_lab/_mapping?pretty\"\ncurl --cacert \"$ES_CA\" -u \"elastic:$ELASTIC_PASSWORD\" \\\n \"$ES_URL/lessons_lab/_search?pretty\" \\\n -H 'Content-Type: application/json' \\\n -d '{\"size\":5,\"query\":{\"match_all\":{}}}' "} />
</div>) },
{ label: "观察分析器的实际输出", left: (<div className="space-y-4">
<PageTitle>观察分析器的实际输出</PageTitle>
<BookParagraph>以下命令直接分析混合大小写的英文标题。预期 tokens 中包含 java、transaction、basics；不要仅看请求成功，要读 token、position 与偏移。将 Java 改为专业类名，再试中文课程标题，观察词项如何变化。此步骤是理解“文档存在却搜不到”的关键，不需要先安装新插件。</BookParagraph>
<SectionTitle>Bash分析命令</SectionTitle>
<BookCode language="bash" showLineNumbers code={"curl --cacert \"$ES_CA\" -u \"elastic:$ELASTIC_PASSWORD\" \\\n \"$ES_URL/lessons_lab/_analyze?pretty\" \\\n -H 'Content-Type: application/json' -d '{\n \"analyzer\":\"standard\",\n \"text\":\"Java TRANSACTION basics\"\n}' "} />
</div>), right: (<div className="space-y-4">
<PageTitle>精确筛选与全文匹配对照</PageTitle>
<BookParagraph>原始文档一的 category 是小写 java。对 keyword 字段使用 term java 能命中，用 Java 通常不能；对 title 使用 match Java 会经过分析，能匹配已索引的 java。这不是接口随机忽略大小写，而是两个字段的分析与保存方式不同。通过对照同一文档，可把映射与查询行为真正连起来。</BookParagraph>
<SectionTitle>Dev Tools执行两次</SectionTitle>
<BookCode language="text" showLineNumbers code={"GET lessons_lab/_search\n{\"query\":{\"term\":{\"category\":\"Java\"}}}\n// 本实验：0条，category原值是java。\n\nGET lessons_lab/_search\n{\"query\":{\"match\":{\"title\":\"Java\"}}}\n// 本实验：文档1，title标准分析后有java词项。"} />
</div>) },
{ label: "用固定ID完成一次幂等更新", left: (<div className="space-y-4">
<PageTitle>用固定ID完成一次幂等更新</PageTitle>
<BookParagraph>将文档一再次写入相同 ID 是替换该文档，而不是自动把新增字段与旧正文合并。若只发送 title 而忘记 category，完整替换后分类会消失。只更新部分字段有专门接口，但也需要考虑并发与版本。课堂练习先始终发送完整文档，比较更新前后字段和总量，理解“替换”与“追加”的区别。</BookParagraph>
<SectionTitle>更新结果的人工检查</SectionTitle>
<BookList items={["重复PUT相同ID：总文档数仍是2。", "完整替换只发送title：旧category不会自动保留。", "使用随机新ID：可能把一次编辑变成另一篇记录。"]} />
</div>), right: (<div className="space-y-4">
<PageTitle>实验失败的最小证据</PageTitle>
<BookParagraph>一段“连接失败”不足以定位原因。保留命令类型、目标索引、HTTP 状态和脱敏后的错误字段；密码、Authorization 头及完整用户内容不要加入报告。先访问根端点验证 TLS 和认证，再查映射，最后执行最小查询。这样能区分网络、身份、数据结构和查询四层问题，避免同时修改多个配置。</BookParagraph>
<SectionTitle>分层排查表</SectionTitle>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">现象</th><th className="border-b p-2 text-left">先验证</th><th className="border-b p-2 text-left">再处理</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">TLS失败</td><td className="border-b p-2 align-top">CA、端点主机名</td><td className="border-b p-2 align-top">修正证书信任，不跳过验证</td></tr><tr><td className="border-b p-2 align-top">401/403</td><td className="border-b p-2 align-top">账号及索引权限</td><td className="border-b p-2 align-top">区别身份错误与权限不足</td></tr><tr><td className="border-b p-2 align-top">映射异常</td><td className="border-b p-2 align-top">字段类型与请求正文</td><td className="border-b p-2 align-top">修正数据或新建演示映射</td></tr><tr><td className="border-b p-2 align-top">零结果</td><td className="border-b p-2 align-top">数据、词项、过滤</td><td className="border-b p-2 align-top">逐项对照最小样本</td></tr></tbody></table></div>
</div>) },
{ label: "把命令组织成可复核实验", left: (<div className="space-y-4">
<PageTitle>把命令组织成可复核实验</PageTitle>
<BookParagraph>把准备、建索引、两条写入、查询、更新与恢复分成明确步骤，并给每步写预期结果。脚本执行时需要逐条检查失败，不能最后一条成功就认定全流程通过。这里提供的 curl 命令依赖已运行的实例和证书，不是启动服务器的替代；教学记录要同时注明服务版本与环境。</BookParagraph>
<SectionTitle>离线结果检查的Python例子</SectionTitle>
<BookCode language="python" showLineNumbers code={"# Python 3：模拟解析已保存的搜索响应，不连接服务\nresponse = {\n    \"timed_out\": False,\n    \"_shards\": {\"failed\": 0},\n    \"hits\": {\"hits\": [{\"_id\": \"1\", \"_source\": {\"category\": \"java\"}}]}\n}\nassert not response[\"timed_out\"]\nassert response[\"_shards\"][\"failed\"] == 0\nassert [h[\"_id\"] for h in response[\"hits\"][\"hits\"]] == [\"1\"]\nprint(\"expected lesson returned\")"} />
</div>), right: (<div className="space-y-4">
<PageTitle>从本地实验到应用接口</PageTitle>
<BookParagraph>应用后端应把有限的查询参数转换为受控 DSL，使用最小权限凭据，设置合理超时并记录脱敏诊断。浏览器不应该直连带管理员凭据的引擎。完成两篇课程实验后，再用真实授权样本验证中文分析、权限与摘要；别在初次联通后立刻宣称具备生产可靠性。</BookParagraph>
<SectionTitle>扩展验收</SectionTitle>
<BookParagraph>补一份四行的实验报告：服务版本、映射摘要、预期命中文档、失败排查过程。若没有运行真实服务，应明确标记为命令审阅，不能把离线响应断言写成已通过端到端查询。</BookParagraph>
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
