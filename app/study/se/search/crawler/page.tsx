'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

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
</div>), right: (<div className="space-y-4">
<PageTitle>设计采集流水线</PageTitle>
<BookParagraph>把发现链接、调度、下载、正文提取、去重和入库拆开。每条记录保留原始 URL、业务主键、内容摘要、抓取时间和来源版本，出错时才能定位。下载成功也不代表正文有效：登录页、验证码页和错误提示可能返回正常状态码。</BookParagraph>
<BookList items={["发现：从课程目录或站点地图获取种子链接。", "下载：设置超时、大小上限与每站点并发限制。", "提取：优先选择正文容器，移除导航和广告。", "入库：按稳定主键更新，记录失败原因。"]} />
</div>) },
{ label: "相对链接和站点限制", left: (<div className="space-y-4">
<PageTitle>相对链接和站点限制</PageTitle>
<BookParagraph>下面是 Python 3 的链接处理函数，可独立运行；它只处理 URL，不发出网络请求。允许列表按精确 hostname 比较，防止外链混入。去掉 fragment 可以合并同页不同锚点；保留 query，因为课程分页或语言参数可能改变正文，不能全部粗暴删除。</BookParagraph>
<BookCode language="python" code={"from urllib.parse import urljoin, urlsplit, urlunsplit\n\ndef normalize(base, href):\n    p = urlsplit(urljoin(base, href))\n    if p.scheme != \"https\" or p.hostname != \"learn.example\":\n        return None\n    if p.username or p.password or p.port not in (None, 443):\n        return None\n    return urlunsplit((\"https\", \"learn.example\",\n                       p.path or \"/\", p.query, \"\"))\n\nbase = \"https://learn.example/course/\"\nprint(normalize(base, \"java?id=1#intro\"))\nprint(normalize(base, \"https://other.example/java\"))"} />
</div>), right: (<div className="space-y-4">
<PageTitle>理解示例的边界</PageTitle>
<BookParagraph>运行后第一行是 https://learn.example/course/java?id=1，第二行是 None。真实抓取还要处理格式错误的 URL，并在每次重定向后重新检查目标。此函数也不解决域名解析到内网的问题；服务端采集器应结合网络访问限制，避免把任意用户 URL 直接交给下载器。</BookParagraph>
</div>) },
{ label: "调度、失败与礼貌访问", left: (<div className="space-y-4">
<PageTitle>调度、失败与礼貌访问</PageTitle>
<BookParagraph>针对每个站点读取并遵守 robots.txt，识别自己的 User-Agent，控制频率。robots 规则表达抓取偏好，不提供内容授权。遇到限流按 Retry-After 等响应信号退避；网络暂时失败可以有限重试，明确不存在的页面应记录状态。不要用无限循环重试把失败放大。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>增量更新与删除同步</PageTitle>
<BookParagraph>用 ETag 或 Last-Modified 进行条件请求，可减少未变化内容的传输；页面未提供这些标记时，可比较清洗后正文的哈希。新增、更新、删除都需要同步。一次抓取失败不能证明文档已删除，可通过业务删除事件或连续确认状态更新索引，并保留审计记录。</BookParagraph>
<BookList items={["幂等写入：同一主键重复处理不会新增重复记录。", "断点续跑：队列状态与成功结果持久化。", "可观测：记录成功率、正文为空比例和最近同步时间。"]} />
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
