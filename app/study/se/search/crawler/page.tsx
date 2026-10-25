'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '爬虫与数据采集',
  chapterNumber: 2,
  totalChapters: 6,
  subjectHref: '/study/se/search',
  prevChapter: { label: '搜索引擎基础', href: '/study/se/search/basic' },
  nextChapter: { label: '索引构建', href: '/study/se/search/index' },
  theme: THEMES.software,
}

const SPREADS = [
{ label: "先约定采集范围", left: (<div className="space-y-4">
<PageTitle>先约定采集范围</PageTitle>
<BookParagraph>课程搜索的数据可以来自自家数据库、公开接口或获准采集的网页。优先使用结构化接口，能减少页面布局变化带来的故障。网页采集的目标是生成稳定、可追踪的课程记录，而不是抓取尽可能多的链接。本章以本站公开课程为范围，不访问登录后的私人内容。</BookParagraph>
<BookParagraph>例如本站课程的主键可以直接来自内容库，外部文档则需要来源地址与抓取策略。先用十篇固定样本验证标题、正文和删除语义，再扩到更多链接；否则数量扩大后，重复导航和错误页也会一起被放大。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>设计采集流水线</PageTitle>
<BookParagraph>把发现链接、调度、下载、正文提取、去重和入库拆开。每条记录保留原始 URL、业务主键、内容摘要、抓取时间和来源版本，出错时才能定位。下载成功也不代表正文有效：登录页、验证码页和错误提示可能返回正常状态码。</BookParagraph>
<BookParagraph>每阶段输出都应可检查。下载器保存响应状态，提取器报告正文是否为空，去重器标记重复依据，写入器记录业务ID与版本。这样一篇文章丢失时，能确认是没下载到、提取失败，还是被错误去重。</BookParagraph>
<BookList items={["发现：从课程目录或站点地图获取种子链接。", "下载：设置超时、大小上限与每站点并发限制。", "提取：优先选择正文容器，移除导航和广告。", "入库：按稳定主键更新，记录失败原因。"]} />
</div>) },
{ label: "相对链接和站点限制", left: (<div className="space-y-4">
<PageTitle>相对链接和站点限制</PageTitle>
<BookParagraph>下面是 Python 3 的链接处理函数，可独立运行；它只处理 URL，不发出网络请求。允许列表按精确 hostname 比较，防止外链混入。去掉 fragment 可以合并同页不同锚点；保留 query，因为课程分页或语言参数可能改变正文，不能全部粗暴删除。</BookParagraph>
<BookCode language="python" code={"from urllib.parse import urljoin, urlsplit, urlunsplit\n\ndef normalize(base, href):\n    p = urlsplit(urljoin(base, href))\n    if p.scheme != \"https\" or p.hostname != \"learn.example\":\n        return None\n    if p.username or p.password or p.port not in (None, 443):\n        return None\n    return urlunsplit((\"https\", \"learn.example\",\n                       p.path or \"/\", p.query, \"\"))\n\nbase = \"https://learn.example/course/\"\nprint(normalize(base, \"java?id=1#intro\"))\nprint(normalize(base, \"https://other.example/java\"))"} />
</div>), right: (<div className="space-y-4">
<PageTitle>理解示例的边界</PageTitle>
<BookParagraph>运行后第一行是 https://learn.example/course/java?id=1，第二行是 None。真实抓取还要处理格式错误的 URL，并在每次重定向后重新检查目标。此函数也不解决域名解析到内网的问题；服务端采集器应结合网络访问限制，避免把任意用户 URL 直接交给下载器。</BookParagraph>
<BookParagraph>例如站内链接发生一次跳转后落到另一个域名，初始URL检查通过也不代表最终目标允许采集。生产下载器还应限制响应字节和读取时间，避免单个资源耗尽工作进程。URL解析与请求执行需要协同约束。</BookParagraph>
</div>) },
{ label: "调度、失败与礼貌访问", left: (<div className="space-y-4">
<PageTitle>调度、失败与礼貌访问</PageTitle>
<BookParagraph>针对每个站点读取并遵守 robots.txt，识别自己的 User-Agent，控制频率。robots 规则表达抓取偏好，不提供内容授权。遇到限流按 Retry-After 等响应信号退避；网络暂时失败可以有限重试，明确不存在的页面应记录状态。不要用无限循环重试把失败放大。</BookParagraph>
<BookParagraph>定时任务应该带总量预算，并能暂停单个来源。若一个站点持续出现大量解析错误，先隔离它而不影响已验证的来源。调度器同时观察站点负载与自己机器资源，不能仅以CPU空闲判断是否可以继续增加请求。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>增量更新与删除同步</PageTitle>
<BookParagraph>用 ETag 或 Last-Modified 进行条件请求，可减少未变化内容的传输；页面未提供这些标记时，可比较清洗后正文的哈希。新增、更新、删除都需要同步。一次抓取失败不能证明文档已删除，可通过业务删除事件或连续确认状态更新索引，并保留审计记录。</BookParagraph>
<BookParagraph>同步还要区分任务时间与内容时间：今天重新抓取的旧文章，并不代表今天发布。若把抓取时间当发布时间，搜索的时间排序和趋势统计都会失真，因此这几类时间字段应单独保存。</BookParagraph>
<BookList items={["幂等写入：同一主键重复处理不会新增重复记录。", "断点续跑：队列状态与成功结果持久化。", "可观测：记录成功率、正文为空比例和最近同步时间。"]} />
</div>) },
{ label: "先选数据入口，再选抓取工具", left: (<div className="space-y-4">
<PageTitle>先选数据入口，再选抓取工具</PageTitle>
<BookParagraph>同一课程既能通过自家数据库读取，也能从渲染后的网页提取。数据库或内容 API 能提供稳定主键、权限与删除状态，通常更适合本站索引；网页只适合确有需要且允许采集的来源。若网页依赖脚本渲染，直接下载 HTML 可能只有空容器；此时先寻找受支持接口，再评估浏览器渲染成本。</BookParagraph>
<SectionTitle>入口对比</SectionTitle>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">来源</th><th className="border-b p-2 text-left">优势</th><th className="border-b p-2 text-left">必须解决的问题</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">数据库或导出</td><td className="border-b p-2 align-top">主键与结构清晰</td><td className="border-b p-2 align-top">一致性快照、权限与增量</td></tr><tr><td className="border-b p-2 align-top">内容API</td><td className="border-b p-2 align-top">接口契约相对稳定</td><td className="border-b p-2 align-top">分页、限流与版本</td></tr><tr><td className="border-b p-2 align-top">公开HTML</td><td className="border-b p-2 align-top">能覆盖页面内容</td><td className="border-b p-2 align-top">正文提取、模板变化与访问范围</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>队列状态如何避免重复抓取</PageTitle>
<BookParagraph>把每个待采 URL 看成任务，具有待处理、处理中、成功和待重试等状态。认领任务要有租约，工作进程宕机后租约过期才重新入队。成功记录绑定内容版本，不能因为消息被重复投递就再插入一份文章。这里依靠的是可重试与幂等，不是声称网络世界里绝不会重复执行。</BookParagraph>
<SectionTitle>一次任务的生命周期</SectionTitle>
<BookCode language="text" showLineNumbers code={"pending → leased → fetched → parsed → stored\n               ↘ timeout → retry_at → pending\n               ↘ gone    → 待确认删除状态\n租约过期：未确认完成的任务重新调度\n成功确认：在内容持久化后再提交任务结果"} />
</div>) },
{ label: "用离线片段练习正文提取", left: (<div className="space-y-4">
<PageTitle>用离线片段练习正文提取</PageTitle>
<BookParagraph>下面 Python 3 标准库例子只为教学，提取带 main 标签的纯文本，不联网也不运行脚本。先忽略导航，再连接正文，预期输出 Java guide Read transaction lessons.。真实 HTML 允许省略标签、复杂嵌套和动态内容，需要成熟解析器与站点规则；不要把这个最小实现当通用爬虫。</BookParagraph>
<SectionTitle>可独立运行</SectionTitle>
<BookCode language="python" showLineNumbers code={"from html.parser import HTMLParser\nclass MainText(HTMLParser):\n    def __init__(self):\n        super().__init__(); self.depth = 0; self.parts = []\n    def handle_starttag(self, tag, attrs):\n        if tag == \"main\": self.depth += 1\n    def handle_endtag(self, tag):\n        if tag == \"main\": self.depth = max(0, self.depth - 1)\n    def handle_data(self, data):\n        if self.depth and data.strip(): self.parts.append(data.strip())\np = MainText()\np.feed(\"<nav>Menu</nav><main><h1>Java guide</h1>\"\n       \"<p>Read transaction lessons.</p></main>\")\nprint(\" \".join(p.parts))"} />
</div>), right: (<div className="space-y-4">
<PageTitle>正文去重与URL去重不是一回事</PageTitle>
<BookParagraph>同一个 URL 的内容可能更新，多个 URL 也可能指向相同正文。先按规范化 URL 管理下载任务，再按业务 ID 或正文哈希识别内容。哈希前应只消除明确无意义的空白，不能随意删标点、数字或代码缩进。正文一致也不意味着所有元信息一致；标题、权限、来源和更新时间仍要保留。</BookParagraph>
<SectionTitle>Python 3内容指纹</SectionTitle>
<BookCode language="python" showLineNumbers code={"from hashlib import sha256\n\ndef fingerprint(text):\n    normalized = \" \".join(text.split())\n    return sha256(normalized.encode(\"utf-8\")).hexdigest()\na = \"Java   transaction\\nintro\"\nb = \"Java transaction intro\"\nprint(fingerprint(a) == fingerprint(b))  # True\nprint(fingerprint(b) == fingerprint(b + \" v2\"))  # False"} />
</div>) },
{ label: "条件请求如何节省传输", left: (<div className="space-y-4">
<PageTitle>条件请求如何节省传输</PageTitle>
<BookParagraph>初次请求取得正文与服务器给出的 ETag，把两者一起保存。下次带 If-None-Match，若服务器返回 304 就复用旧正文，不把空响应写成空文章；返回新正文时同时更新标记和内容。ETag 是不透明验证标记，不要假设它一定等于 MD5。最后抓取时间和最后内容变更时间应分开记录。</BookParagraph>
<SectionTitle>请求与响应推演</SectionTitle>
<BookCode language="text" showLineNumbers code={"第一次：GET /lessons/7\n响应：200，ETag: \"revision-12\"，正文A\n第二次：If-None-Match: \"revision-12\"\n响应：304，无新正文 → 继续保存A\n第三次：If-None-Match: \"revision-12\"\n响应：200，ETag: \"revision-13\"，正文B → 替换为B"} />
</div>), right: (<div className="space-y-4">
<PageTitle>重试必须区分错误原因</PageTitle>
<BookParagraph>超时或短暂网关故障可能适合重试，解析规则失效则重试同一响应也不会变好。限流时降低并发并遵守服务器提示；解析失败保存有限的脱敏样本供排查。重试次数、退避时间、失败隔离队列都要有边界，以免一个坏页面拖住整个批次。抓取速率应按站点管理，而不是每个进程各自无限并发。</BookParagraph>
<SectionTitle>错误处理比较</SectionTitle>
<BookList items={["暂时网络故障：有限重试并加随机抖动。", "内容模板变化：隔离样本，修订提取规则。", "登录页替代正文：停止入库并检查访问范围。", "明确删除信号：记录并按删除政策确认，不无限重试。"]} />
</div>) },
{ label: "从数量指标走向质量指标", left: (<div className="space-y-4">
<PageTitle>从数量指标走向质量指标</PageTitle>
<BookParagraph>本轮抓到一千页不代表新增一千篇有效课程。报告至少区分发现 URL 数、成功下载数、有效正文数、去重后文档数和更新数。若下载成功率正常而正文平均长度突然下降，可能是模板改版；若去重比突然升高，可能抓到了统一登录页。指标之间的变化比单个总量更有诊断价值。</BookParagraph>
<SectionTitle>练习数据推演</SectionTitle>
<BookParagraph>假设发现100个URL，下载90个，正文有效80个，其中10个重复，另有5个已有课程发生变化。请区分候选有效记录70条与实际新增数量；缺少已有ID总量时不能直接推断新增65条。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>把增量流水线做成可回放过程</PageTitle>
<BookParagraph>保留输入批次、提取规则版本和写入摘要，可以让一次模板修复只重处理受影响页面。练习中为每篇课程记录来源、内容指纹、状态与版本，重复运行同一批输入时结果不变。然后只修改一个文件，期望只有相应课程版本变化，而不是把全部抓取时间误当内容更新时间。</BookParagraph>
<SectionTitle>参考依据</SectionTitle>
<BookList items={[<a key="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Conditional_requests" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Conditional_requests" target="_blank" rel="noopener noreferrer" className="underline">MDN：条件请求</a>, <a key="https://docs.python.org/3/library/html.parser.html" href="https://docs.python.org/3/library/html.parser.html" target="_blank" rel="noopener noreferrer" className="underline">Python：HTMLParser</a>]} />
</div>) },
{ label: "练习：构建离线采集样本", left: (<div className="space-y-4">
<PageTitle>练习：构建离线采集样本</PageTitle>
<BookParagraph>准备三个本地 HTML 文件：正常课程、带重复导航的课程和错误提示页。先写出每页应提取的标题与正文，再实现提取函数。把正常课程复制成另一 URL，并修改一处正文，分别观察内容去重和版本更新。离线完成后再接入获准访问的站点。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>验收与参考</PageTitle>
<BookParagraph>合格结果应排除导航和错误页，相同内容不会重复入库，正文变更能够更新旧记录。恢复运行时只重试未完成任务；删除同步要有明确依据。URL 处理可以查 Python 官方文档，robots 匹配和错误处理以 RFC 9309 为准。</BookParagraph>
<BookList items={[<a key="https://www.rfc-editor.org/rfc/rfc9309.html" href="https://www.rfc-editor.org/rfc/rfc9309.html" target="_blank" rel="noopener noreferrer">RFC 9309：Robots Exclusion Protocol</a>, <a key="https://docs.python.org/3/library/urllib.parse.html" href="https://docs.python.org/3/library/urllib.parse.html" target="_blank" rel="noopener noreferrer">Python：urllib.parse</a>]} />
</div>) }
]

export default function SearchCrawlerPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
