'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '概述',
  chapterNumber: 1,
  totalChapters: 8,
  subjectHref: '/study/se/bigdata',
  nextChapter: { label: '大数据平台与生态', href: '/study/se/bigdata/platform' },
  theme: THEMES.software,
}

const SPREADS = [
{ label: "问题与概念", left: (<div className="space-y-4">
<PageTitle>{"从业务问题开始"}</PageTitle>
<BookParagraph>{"本方向贯穿一个在线学习平台：每天产生课程浏览、视频播放和练习提交事件，运营希望知道哪些课程吸引用户、哪些环节发生流失。先把问题改写成可计算的定义，例如“某日有至少一次有效播放的去重用户数”。如果连有效播放是否排除自动预览都没约定，换成分布式集群只会更快地产生不一致的答案。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"规模不是唯一判断条件"}</PageTitle>
<BookParagraph>{"假设每天一千万条事件，每条约五百字节，原始载荷约五GB，全年约一点八TB，尚未计算副本、索引和中间结果。容量规划要同时考虑保留时间、峰值写入和查询延迟。小样本先用单机验证口径；当容量、吞吐或恢复时间超过单机预算，再引入分布式处理，不能仅因数据被称为“大数据”就搭建复杂平台。"}</BookParagraph>
</div>) },
{ label: "数据与可复现实验", left: (<div className="space-y-4">
<PageTitle>{"一条事件的最小契约"}</PageTitle>
<BookParagraph>{"一条记录代表一次发生的行为，而不是一名学生或一门课程。event_id由生产端稳定生成，重试保持不变；user_id使用内部标识；course_id连接课程维表；event_type限定枚举；event_time记录发生时刻，ingest_time记录到达时刻；schema_version标识契约版本。时间必须约定时区，金额、时长必须说明单位，否则两个合法数字也可能不可比较。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"无需集群的第一段分析"}</PageTitle>
<BookParagraph>{"以下代码仅依赖Python 3标准库，保存为intro.py后执行python3 intro.py。输入写在列表中，同一事件e1重复送达，用户u1又产生另一事件。程序先按事件编号消除传输重复，再统计有效播放用户；预期输出为“3 2”，分别代表有效事件数与用户数。真实业务还要验证重复编号对应的载荷是否冲突。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"events = [\n    ('e1', 'u1', 'play'),\n    ('e1', 'u1', 'play'),\n    ('e2', 'u1', 'play'),\n    ('e3', 'u2', 'play'),\n]\nunique = {event[0]: event for event in events}\nplayers = {u for _, u, kind in unique.values() if kind == 'play'}\nprint(len(unique), len(players))"} />
</div>) },
{ label: "工程方法与边界", left: (<div className="space-y-4">
<PageTitle>{"从原始数据走向指标"}</PageTitle>
<BookParagraph>{"原始层保存收到的事实及来源，便于审计和重放；清洗层统一类型、去重并隔离坏记录；汇总层按日期和课程输出指标。每层都有自己的粒度和质量条件：原始层允许重复送达，清洗层要求事件编号唯一，日汇总要求日期与课程组成唯一键。下游指标变动时，应能追溯到哪批输入、哪版代码和哪份口径。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"时效与正确性的取舍"}</PageTitle>
<BookParagraph>{"实时大屏可以先显示暂定值，日报在允许的迟到窗口后定稿。比如23:59的播放到次日00:03才到达，应按事件发生日期归属，不能简单算进到达当天。批处理适合定时完整重算，流处理适合持续更新，两者仍需共享定义和校验规则。所谓端到端正确，包含接收、计算和结果写入，不能只看计算框架的宣传术语。"}</BookParagraph>
</div>) },
{ label: "排错、练习与参考", left: (<div className="space-y-4">
<PageTitle>{"常见错误与检查顺序"}</PageTitle>
<BookParagraph>{"把事件条数当人数会放大活跃；把重复投递当真实行为会抬高播放；把空用户都替换成同一个编号会让访客数失真。排查时先抽取十条可人工核对的样本，再比较接收量、隔离量、去重后数量与输出量，最后调查资源瓶颈。这样能区分业务口径错误、数据丢失和计算性能问题。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"练习：写出可验收的数据契约"}</PageTitle>
<BookParagraph>{"为“课程日活”写一页契约，补充一条重复事件、一条跨日迟到事件和一条缺少用户的事件。验收要求：明确统计日期时区、匿名用户策略、去重键、重算范围，列出每条输入是否计入以及最终人数。参考思路：先画一行一事件的人工明细，再执行本章代码；匿名身份没有可信标识时可隔离并单独报告，不能猜测人数。"}</BookParagraph>
<BookList items={[<a key="https://spark.apache.org/docs/latest/sql-getting-started.html" href="https://spark.apache.org/docs/latest/sql-getting-started.html" target="_blank" rel="noreferrer" className="underline">Spark SQL入门：DataFrame与SQL</a>]} />
</div>) }
]

export default function IntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
