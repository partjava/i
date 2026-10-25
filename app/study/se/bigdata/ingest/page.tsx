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
<BookParagraph>{"接入确认也要定义：收到请求、写入缓冲和持久保存不是同一时刻。生产者应知道成功响应代表哪一步，并在超时重试时保持同一事件编号。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"校验和隔离，而非静默丢弃"}</PageTitle>
<BookParagraph>{"先校验JSON能否解析，再校验必填字段、类型、枚举及合理范围。无法解析的记录保存原始内容、来源位置和失败原因到隔离区；正常记录继续流动。缺失用户、负数播放时长、未来数天的事件时间属于不同问题，应分别计数。错误比例超过约定阈值时停止发布，否则报表可能看似正常却系统性漏掉某个客户端版本。"}</BookParagraph>
<BookParagraph>{"隔离区不是永久垃圾箱，应有处理负责人、数量监控与保留期限；修正规则后按来源位置定向重放，再比较修正前后的质量账。"}</BookParagraph>
</div>) },
{ label: "数据与可复现实验", left: (<div className="space-y-4">
<PageTitle>{"重试与去重是两回事"}</PageTitle>
<BookParagraph>{"移动网络失败后生产者可能重复发送，接收两次不一定发生两次。去重依据应是稳定event_id，不能仅依赖用户和秒级时间，因为用户在同一秒可提交两次不同练习。若同编号载荷不同，要保存冲突并追查生产端。下例采用“相同编号且内容一致则忽略”的简化策略，仅模拟单次批次，跨批次需持久化去重状态。"}</BookParagraph>
<BookParagraph>{"去重必须先校验稳定字段，否则非法记录可能抢占合法事件编号。对于冲突保留两个来源摘要，不按到达先后悄悄覆盖。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"可复现：检测重复与冲突"}</PageTitle>
<BookParagraph>{"仅需Python 3。输入在内存中，第三行重复第一行；预期输出为“2 1”。把第三行的play改成submit，会触发冲突断言。这里保留整个字典用于易读演示，生产系统通常比较规范化后的关键字段或内容摘要，且需为坏记录保留追踪编号。"}</BookParagraph>
<BookParagraph>{"可以再加入e3以验证唯一计数增加，或改动重复记录的内容触发冲突。对同编号两种载荷的拒绝路径，与正常去重同样重要。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"rows = [\n    {'event_id': 'e1', 'kind': 'play'},\n    {'event_id': 'e2', 'kind': 'submit'},\n    {'event_id': 'e1', 'kind': 'play'},\n]\nseen = {}\nduplicates = 0\nfor row in rows:\n    key = row['event_id']\n    if key in seen:\n        assert seen[key] == row, 'conflicting event'\n        duplicates += 1\n    else:\n        seen[key] = row\nprint(len(seen), duplicates)"} />
</div>) },
{ label: "工程方法与边界", left: (<div className="space-y-4">
<PageTitle>{"事件时间、到达时间与迟到"}</PageTitle>
<BookParagraph>{"用户在23:59离线观看视频，次日00:10恢复网络才上传。按事件时间计算课程日活，它属于前一天；按到达时间监控接入吞吐，它属于后一天。两种时间都要保留。日报可约定次日补算前两天分区，并标记定稿时间；超过补算范围的数据进入修正流程，避免悄悄修改已经被业务引用的数字。"}</BookParagraph>
<BookParagraph>{"按到达时间分区便于运维追踪，按事件时间分组便于业务分析；两种用途可并存，但输出字段名应明确，避免下游用错日期。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"水位线不是永不丢失的承诺"}</PageTitle>
<BookParagraph>{"流处理维护窗口和去重状态需要内存，水位线用于在允许的迟到范围与状态成本之间取舍。超过阈值的数据不保证仍被聚合处理，不能把“十分钟水位”解释成每十分钟出一次结果。具体语义取决于算子和输出模式。学习阶段先用批处理保存全部输入，再用人工样本模拟允许迟到范围，确认产品能接受这种边界。"}</BookParagraph>
<BookParagraph>{"允许迟到时长会影响状态保留和结果更新成本。设置前统计实际迟到分布，再明确超窗记录进入补算还是隔离，而非把阈值当自然规律。"}</BookParagraph>
</div>) },
{ label: "类型规范化应保留失败原因",
left: (<div className="space-y-4">
<PageTitle>{"类型规范化应保留失败原因"}</PageTitle>
<BookParagraph>{"例一：客户端传来播放时长“12.5”，有的版本用秒，有的用毫秒，单纯转成浮点数不能消除单位歧义。契约要同时说明字段类型、单位和范围，对旧版本按已知规则转换；无法确定含义的记录应隔离，不用猜测修补。"}</BookParagraph>
<BookParagraph>{"清洗步骤可以依次为解析、版本识别、类型转换、业务范围校验和规范化输出，每步记录失败原因与来源位置。这样发现某客户端版本错误时，能定位特定隔离记录再重放，而不必重新下载所有正常数据。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"分类处理坏记录与暂时失败"}</PageTitle>
<BookParagraph>{"格式错误需要生产端或规则修复，网络中断可能重试，权限拒绝需要授权排查，数据重复需要去重。把所有失败交给无限重试会使永久错误反复占用资源，也会隐藏有效吞吐下降。"}</BookParagraph>
<BookParagraph>{"下表把处理动作与保留证据列出。重试采用有限次数和退避，超出阈值进入有负责人处理的队列；隔离记录要包含来源批次、偏移或文件位置，但不能在错误日志中直接打印完整私人载荷。处理规则也需要版本。"}</BookParagraph>
<div className="overflow-x-auto"><table className="min-w-[480px] w-full text-sm border-collapse"><thead><tr><th className="border border-paper-300/80 p-2 text-left">失败类型</th><th className="border border-paper-300/80 p-2 text-left">主要动作</th><th className="border border-paper-300/80 p-2 text-left">证据</th></tr></thead><tbody><tr><td className="border border-paper-300/80 p-2">格式或版本错误</td><td className="border border-paper-300/80 p-2">隔离，修正规则后重放</td><td className="border border-paper-300/80 p-2">来源位置与契约版本</td></tr><tr><td className="border border-paper-300/80 p-2">暂时网络失败</td><td className="border border-paper-300/80 p-2">有限退避重试</td><td className="border border-paper-300/80 p-2">次数与最后错误</td></tr><tr><td className="border border-paper-300/80 p-2">同编号内容冲突</td><td className="border border-paper-300/80 p-2">阻断或隔离调查</td><td className="border border-paper-300/80 p-2">两个载荷的安全摘要</td></tr></tbody></table></div>
</div>),
},
{ label: "时间标准化的本地演示",
left: (<div className="space-y-4">
<PageTitle>{"时间标准化的本地演示"}</PageTitle>
<BookParagraph>{"例二：北京时间十月二日零点十分的事件，转为UTC属于十月一日十六点十分。若日报规定按UTC日期分组，不能直接截取客户端日期字符串。必须先解析带偏移时间，再转换为约定时区，最后提取日期。"}</BookParagraph>
<BookParagraph>{"下面Python 3使用标准库datetime处理固定教学输入，输出2026-10-01；不依赖系统当前时区。没有偏移的时间字符串应由契约明确来源时区，不能由运行机器的设置猜测。夏令时地区还可能出现重复或不存在的本地时间，需要额外规则。"}</BookParagraph>
<BookCode language="python" code={"from datetime import datetime, timezone\nevent = datetime.fromisoformat(\"2026-10-02T00:10:00+08:00\")\nprint(event.astimezone(timezone.utc).date())"} />
</div>),
right: (<div className="space-y-4">
<PageTitle>{"积压为何在高峰后仍增长"}</PageTitle>
<BookParagraph>{"设高峰每秒进入一千二百条，消费者每秒处理一千条，持续十分钟积压十二万条。高峰结束后流入降到八百条，净消化速度只有每秒二百条，仍需十分钟才能清空；若处理能力等于流入量，积压不会下降。"}</BookParagraph>
<BookParagraph>{"这说明“机器现在不忙”之外还要看积压与最老未处理事件年龄。临时扩容需要确认下游写入容量，不能把队列压力直接转给数据库。接入端也应有速率限制和明确重试提示，防止生产者超时后同时重发造成更大峰值。"}</BookParagraph>
</div>),
},
{ label: "去重状态有保留边界",
left: (<div className="space-y-4">
<PageTitle>{"去重状态有保留边界"}</PageTitle>
<BookParagraph>{"若event_id去重状态只保留七天，第八天重放同一事件时可能再次被接受。保留窗口应覆盖生产者重试、离线迟到和业务重算范围，超窗数据走特殊对账流程。无限保留全部事件编号又会持续占用状态和备份成本。"}</BookParagraph>
<BookParagraph>{"下面Python 3模拟接收两个相同事件，只追加一次结果并输出1。示例把已处理编号与输出放在同一内存过程，不提供真实崩溃原子性；持久化系统必须让去重登记和业务写入形成可靠协议，否则中间崩溃仍会重复或丢失。"}</BookParagraph>
<BookCode language="python" code={"seen, output = set(), []\nfor event_id in [\"e1\", \"e1\"]:\n    if event_id not in seen:\n        output.append(event_id)\n        seen.add(event_id)\nprint(len(output))"} />
</div>),
right: (<div className="space-y-4">
<PageTitle>{"检查点与外部写入的裂缝"}</PageTitle>
<BookParagraph>{"例三：计算已写入日报，进程却在提交消费位置前崩溃，重启后会再次读取相同输入。若结果是简单追加，重复计数就发生；若以日期与课程为唯一键替换相同批次结果，重放可能保持一致。"}</BookParagraph>
<BookParagraph>{"反过来先提交位置再写结果，崩溃可能导致该批输入永远被跳过。所谓端到端一次效果需要覆盖来源、状态、输出和提交边界，不能只看引擎是否支持检查点。使用幂等写入时还要防止旧批次覆盖更晚结果，必要时比较版本或批次顺序。"}</BookParagraph>
</div>),
},
{ label: "迟到数据的三种处置",
left: (<div className="space-y-4">
<PageTitle>{"迟到数据的三种处置"}</PageTitle>
<BookParagraph>{"同一条前天发生的播放今天到达，可以在允许窗口内更新原分区，也可以先隔离等待人工修正，或者按明确业务规则不计入已定稿指标。三种方式都有代价，关键是公开约定、统计迟到量并保留可追踪事实，而不是静默丢弃。"}</BookParagraph>
<BookParagraph>{"假设日报在次日中午定稿，十点到达的前一天事件可纳入当次修正；三天后到达则进入补报流程。看板应显示暂定或已定稿，补报应有版本记录。水位线是计算如何推进状态的一种机制，不能替代这份业务迟到政策。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"契约演进中的兼容检查"}</PageTitle>
<BookParagraph>{"新增可空字段通常允许旧消费者继续读取，改变字段类型或含义则可能破坏下游。比如把duration从秒改为毫秒，即使仍是数字，所有依赖它的指标都可能变化；应使用新字段或新版本并经过迁移验证。"}</BookParagraph>
<BookParagraph>{"建立生产者与消费者样本契约：每个支持版本至少有正常、缺字段、非法枚举和边界时间样本。新版本发布前验证旧消费者如何处理未知字段，消费者更新后保留旧事件重放用例。兼容性要通过记录级测试证明，不能只以JSON能够解析作为验收。"}</BookParagraph>
</div>),
},
{ label: "排错、练习与参考", left: (<div className="space-y-4">
<PageTitle>{"交付语义与幂等写入"}</PageTitle>
<BookParagraph>{"消息队列确认成功只说明某个环节已接收，不能自动证明报表只更新一次。若数据库写入成功但确认响应丢失，消费者重启可能重放；结果表应使用业务唯一键或事务化批次发布。接入还要设定重放起点、保留期限和权限，避免误删偏移后无法恢复，或从最早位置重放造成重复累计。"}</BookParagraph>
<BookParagraph>{"要特别测试写入成功后进程崩溃的情况。若消费位置尚未提交，重读同批事件时应保持同一最终结果，而不是再次追加。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"练习：跨日重放验收"}</PageTitle>
<BookParagraph>{"构造六条输入：两条正常、一条重复、一条冲突、一条缺字段和一条跨日迟到。输出分类计数和每条归属日期。验收：重复不增加指标，冲突及缺字段可追溯，迟到事件在既定补算范围内修正前一天，整批重跑结果不变。参考思路：先校验和冲突隔离，再去重，再按事件时间分区；为重跑保存批次和输出版本。"}</BookParagraph>
<BookParagraph>{"验收至少包括同编号重试、冲突、跨日迟到和超窗事件，逐项核对输入、隔离与发布版本，确保所有记录都有可解释去向。"}</BookParagraph>
<BookList items={[<a key="https://spark.apache.org/docs/latest/streaming/apis-on-dataframes-and-datasets.html" href="https://spark.apache.org/docs/latest/streaming/apis-on-dataframes-and-datasets.html" target="_blank" rel="noreferrer" className="underline">Spark Structured Streaming：事件时间与去重</a>]} />
</div>) }
]

export default function IngestPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
