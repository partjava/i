'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '数据采集与预处理',
  chapterNumber: 3,
  totalChapters: 8,
  subjectHref: '/study/se/bigdata',
  prevChapter: { label: '大数据平台与生态', href: '/study/se/bigdata/platform' },
  nextChapter: { label: '分布式存储与计算', href: '/study/se/bigdata/distributed' },
  theme: THEMES.software,
}

const SPREADS = [
{ label: "问题与概念", left: (<div className="space-y-4">
<PageTitle>{"事件接入是一份数据契约"}</PageTitle>
<BookParagraph>{"接入端必须知道正在接收什么：event_id为稳定唯一标识，user_id为内部用户号，course_id为课程号，event_type来自约定枚举，event_time是带时区的发生时间，ingest_time由服务端赋值。不要直接信任客户端生成的金额、时间或任意新增字段。新增可空字段通常较容易兼容，改变字段含义则应升级版本并通知消费者。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"校验和隔离，而非静默丢弃"}</PageTitle>
<BookParagraph>{"先校验JSON能否解析，再校验必填字段、类型、枚举及合理范围。无法解析的记录保存原始内容、来源位置和失败原因到隔离区；正常记录继续流动。缺失用户、负数播放时长、未来数天的事件时间属于不同问题，应分别计数。错误比例超过约定阈值时停止发布，否则报表可能看似正常却系统性漏掉某个客户端版本。"}</BookParagraph>
</div>) },
{ label: "数据与可复现实验", left: (<div className="space-y-4">
<PageTitle>{"重试与去重是两回事"}</PageTitle>
<BookParagraph>{"移动网络失败后生产者可能重复发送，接收两次不一定发生两次。去重依据应是稳定event_id，不能仅依赖用户和秒级时间，因为用户在同一秒可提交两次不同练习。若同编号载荷不同，要保存冲突并追查生产端。下例采用“相同编号且内容一致则忽略”的简化策略，仅模拟单次批次，跨批次需持久化去重状态。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"可复现：检测重复与冲突"}</PageTitle>
<BookParagraph>{"仅需Python 3。输入在内存中，第三行重复第一行；预期输出为“2 1”。把第三行的play改成submit，会触发冲突断言。这里保留整个字典用于易读演示，生产系统通常比较规范化后的关键字段或内容摘要，且需为坏记录保留追踪编号。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"rows = [\n    {'event_id': 'e1', 'kind': 'play'},\n    {'event_id': 'e2', 'kind': 'submit'},\n    {'event_id': 'e1', 'kind': 'play'},\n]\nseen = {}\nduplicates = 0\nfor row in rows:\n    key = row['event_id']\n    if key in seen:\n        assert seen[key] == row, 'conflicting event'\n        duplicates += 1\n    else:\n        seen[key] = row\nprint(len(seen), duplicates)"} />
</div>) },
{ label: "工程方法与边界", left: (<div className="space-y-4">
<PageTitle>{"事件时间、到达时间与迟到"}</PageTitle>
<BookParagraph>{"用户在23:59离线观看视频，次日00:10恢复网络才上传。按事件时间计算课程日活，它属于前一天；按到达时间监控接入吞吐，它属于后一天。两种时间都要保留。日报可约定次日补算前两天分区，并标记定稿时间；超过补算范围的数据进入修正流程，避免悄悄修改已经被业务引用的数字。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"水位线不是永不丢失的承诺"}</PageTitle>
<BookParagraph>{"流处理维护窗口和去重状态需要内存，水位线用于在允许的迟到范围与状态成本之间取舍。超过阈值的数据不保证仍被聚合处理，不能把“十分钟水位”解释成每十分钟出一次结果。具体语义取决于算子和输出模式。学习阶段先用批处理保存全部输入，再用人工样本模拟允许迟到范围，确认产品能接受这种边界。"}</BookParagraph>
</div>) },
{ label: "排错、练习与参考", left: (<div className="space-y-4">
<PageTitle>{"交付语义与幂等写入"}</PageTitle>
<BookParagraph>{"消息队列确认成功只说明某个环节已接收，不能自动证明报表只更新一次。若数据库写入成功但确认响应丢失，消费者重启可能重放；结果表应使用业务唯一键或事务化批次发布。接入还要设定重放起点、保留期限和权限，避免误删偏移后无法恢复，或从最早位置重放造成重复累计。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"练习：跨日重放验收"}</PageTitle>
<BookParagraph>{"构造六条输入：两条正常、一条重复、一条冲突、一条缺字段和一条跨日迟到。输出分类计数和每条归属日期。验收：重复不增加指标，冲突及缺字段可追溯，迟到事件在既定补算范围内修正前一天，整批重跑结果不变。参考思路：先校验和冲突隔离，再去重，再按事件时间分区；为重跑保存批次和输出版本。"}</BookParagraph>
<BookList items={[<a key="https://spark.apache.org/docs/latest/streaming/apis-on-dataframes-and-datasets.html" href="https://spark.apache.org/docs/latest/streaming/apis-on-dataframes-and-datasets.html" target="_blank" rel="noreferrer" className="underline">Spark Structured Streaming：事件时间与去重</a>]} />
</div>) }
]

export default function IngestPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
