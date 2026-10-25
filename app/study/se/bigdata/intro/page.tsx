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
<BookParagraph>{"定义还要说明排除项，例如机器人访问、测试账号与失败播放是否计入；将这些规则写成带输入和预期的样本，才能在不同引擎间保持一致。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"规模不是唯一判断条件"}</PageTitle>
<BookParagraph>{"假设每天一千万条事件，每条约五百字节，原始载荷约五GB，全年约一点八TB，尚未计算副本、索引和中间结果。容量规划要同时考虑保留时间、峰值写入和查询延迟。小样本先用单机验证口径；当容量、吞吐或恢复时间超过单机预算，再引入分布式处理，不能仅因数据被称为“大数据”就搭建复杂平台。"}</BookParagraph>
<BookParagraph>{"容量模型应注明压缩前后与保留天数。若查询只需最近七天，可以将活跃查询层与长期归档层分开，避免所有历史数据都维持同等访问成本。"}</BookParagraph>
</div>) },
{ label: "数据与可复现实验", left: (<div className="space-y-4">
<PageTitle>{"一条事件的最小契约"}</PageTitle>
<BookParagraph>{"一条记录代表一次发生的行为，而不是一名学生或一门课程。event_id由生产端稳定生成，重试保持不变；user_id使用内部标识；course_id连接课程维表；event_type限定枚举；event_time记录发生时刻，ingest_time记录到达时刻；schema_version标识契约版本。时间必须约定时区，金额、时长必须说明单位，否则两个合法数字也可能不可比较。"}</BookParagraph>
<BookParagraph>{"可用一条正常事件和一条缺少时区的事件做契约检查：前者规范化入库，后者隔离并说明原因；不能默认使用服务器所在地补齐时间含义。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"无需集群的第一段分析"}</PageTitle>
<BookParagraph>{"以下代码仅依赖Python 3标准库，保存为intro.py后执行python3 intro.py。输入写在列表中，同一事件e1重复送达，用户u1又产生另一事件。程序先按事件编号消除传输重复，再统计有效播放用户；预期输出为“3 2”，分别代表有效事件数与用户数。真实业务还要验证重复编号对应的载荷是否冲突。"}</BookParagraph>
<BookParagraph>{"这里事件唯一与用户唯一是两个不同集合。将e2改成新用户后，事件数量不变而人数增加，能帮助检查代码究竟在统计什么。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"events = [\n    ('e1', 'u1', 'play'),\n    ('e1', 'u1', 'play'),\n    ('e2', 'u1', 'play'),\n    ('e3', 'u2', 'play'),\n]\nunique = {event[0]: event for event in events}\nplayers = {u for _, u, kind in unique.values() if kind == 'play'}\nprint(len(unique), len(players))"} />
</div>) },
{ label: "工程方法与边界", left: (<div className="space-y-4">
<PageTitle>{"从原始数据走向指标"}</PageTitle>
<BookParagraph>{"原始层保存收到的事实及来源，便于审计和重放；清洗层统一类型、去重并隔离坏记录；汇总层按日期和课程输出指标。每层都有自己的粒度和质量条件：原始层允许重复送达，清洗层要求事件编号唯一，日汇总要求日期与课程组成唯一键。下游指标变动时，应能追溯到哪批输入、哪版代码和哪份口径。"}</BookParagraph>
<BookParagraph>{"每层的完成状态也需显式记录。原始文件写完不代表清洗通过，汇总生成不代表消费者已切换版本，链路上应有独立质量与发布信号。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"时效与正确性的取舍"}</PageTitle>
<BookParagraph>{"实时大屏可以先显示暂定值，日报在允许的迟到窗口后定稿。比如23:59的播放到次日00:03才到达，应按事件发生日期归属，不能简单算进到达当天。批处理适合定时完整重算，流处理适合持续更新，两者仍需共享定义和校验规则。所谓端到端正确，包含接收、计算和结果写入，不能只看计算框架的宣传术语。"}</BookParagraph>
<BookParagraph>{"为实时暂定值与正式日报安排对账，比较同一时间范围和定义。出现差异先分解迟到、去重与过滤原因，不直接把其中一份当成错误。"}</BookParagraph>
</div>) },
{ label: "事件、用户与会话的三种粒度",
left: (<div className="space-y-4">
<PageTitle>{"事件、用户与会话的三种粒度"}</PageTitle>
<BookParagraph>{"例一：用户u1上午播放同一课程三次、下午又播放一次，用户u2播放一次。事件数为五，播放人数为二；若规定三十分钟无活动即新会话，还需要时间顺序才能计算会话数。三个数字回答不同问题，不应都标成“访问量”。"}</BookParagraph>
<BookParagraph>{"在写代码前声明每行粒度与唯一键。原始事件以event_id识别，用户日汇总以日期与用户识别，课程日报以日期与课程识别。连接不同粒度的数据时，先判断是否一对多，否则一次事件可能在连接后变成多行，汇总结果随之膨胀。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"从粒度推导指标能否相加"}</PageTitle>
<BookParagraph>{"若课程甲有三名用户，课程乙有四名，其中两名同时学习两课，全站用户数是五而不是七。播放次数可以按互不重叠事件求和，去重人数必须重新求集合并集；比例通常需要分子分母分别汇总后相除。"}</BookParagraph>
<BookParagraph>{"下表将指标所需状态与可加性放在一起。它也解释为什么一张只保留课程人数的汇总表不能准确还原全站人数：交集信息已丢失。若查询需求包含跨维度去重，应保留合适明细或设计明确误差界限的估计方案。"}</BookParagraph>
<div className="overflow-x-auto"><table className="min-w-[480px] w-full text-sm border-collapse"><thead><tr><th className="border border-paper-300/80 p-2 text-left">指标</th><th className="border border-paper-300/80 p-2 text-left">合并状态</th><th className="border border-paper-300/80 p-2 text-left">可直接相加吗</th></tr></thead><tbody><tr><td className="border border-paper-300/80 p-2">事件次数</td><td className="border border-paper-300/80 p-2">不重叠事件计数</td><td className="border border-paper-300/80 p-2">通常可以</td></tr><tr><td className="border border-paper-300/80 p-2">去重人数</td><td className="border border-paper-300/80 p-2">用户集合或受控估计状态</td><td className="border border-paper-300/80 p-2">不可以，存在交集</td></tr><tr><td className="border border-paper-300/80 p-2">平均时长</td><td className="border border-paper-300/80 p-2">总时长与样本数</td><td className="border border-paper-300/80 p-2">不可以平均均值</td></tr></tbody></table></div>
</div>),
},
{ label: "容量计算先统一单位",
left: (<div className="space-y-4">
<PageTitle>{"容量计算先统一单位"}</PageTitle>
<BookParagraph>{"例二：每日一千万条、每条五百字节，按十进制约五GB；保留九十天约四百五十GB。若复制三份且清洗中间结果占原始数据一份，总量可粗估为一千八百GB，尚未包含索引与元数据。每个乘数都必须有业务或实现依据。"}</BookParagraph>
<BookParagraph>{"下面Python 3输出5.0、450.0与1800.0，单位为十进制GB。不要把GB和GiB混写，压缩率也应实测而非承诺固定倍数。规划时另看峰值接入速度和恢复重算时间：容量装得下，不代表一小时内能完成全部扫描。"}</BookParagraph>
<BookCode language="python" code={"daily_gb = 10_000_000 * 500 / 1_000_000_000\nraw = daily_gb * 90\nprint(daily_gb, raw, raw * (3 + 1))"} />
</div>),
right: (<div className="space-y-4">
<PageTitle>{"实时与批量来自不同时间预算"}</PageTitle>
<BookParagraph>{"例三：每秒接收一百事件，作业每分钟启动一次，则一条刚错过批次的事件至少要等到下次调度，再加计算和发布时间。所谓“每分钟运行”不等于用户看到的结果永远只落后一分钟，排队与失败重试还会继续增加延迟。"}</BookParagraph>
<BookParagraph>{"实时流程持续更新可以降低等待，但要管理乱序、状态与重复写入。对运营看板可以先提供暂定值，对结算或正式日报保留校正流程。把生成时间、最大已处理事件时间和定稿状态一并输出，使用者才知道数字适合什么决策。"}</BookParagraph>
</div>),
},
{ label: "把业务定义转成集合运算",
left: (<div className="space-y-4">
<PageTitle>{"把业务定义转成集合运算"}</PageTitle>
<BookParagraph>{"假设当日播放者为u1、u2、u3，提交者为u2、u3、u4。若定义“播放者中的提交比例”，分子是交集两人，分母是三人，结果约百分之六十六点七；把所有提交者三人当分子会错误得到百分之百。"}</BookParagraph>
<BookParagraph>{"下面Python 3直接展示集合输入，输出2、3和66.7%。它不声称播放导致提交，只按约定计算关联。扩展为分课程或分日统计时，必须在各自组内建集合，不能用全站分子除某门课程的分母；空分母应单独标识而非假装为零转化。"}</BookParagraph>
<BookCode language="python" code={"players = {\"u1\", \"u2\", \"u3\"}\nsubmitters = {\"u2\", \"u3\", \"u4\"}\nconverted = players & submitters\nprint(len(converted), len(players), f\"{len(converted) / len(players):.1%}\")"} />
</div>),
right: (<div className="space-y-4">
<PageTitle>{"更正数据不该改写来源"}</PageTitle>
<BookParagraph>{"如果客户端后来发现播放时长单位填错，原始数据仍应能追溯到收到时的载荷与版本。清洗层记录修正规则及版本，重算受影响分区，在结果发布说明中给出变化范围，避免直接覆盖原始事实让事故无法调查。"}</BookParagraph>
<BookParagraph>{"重算前比较旧版和新版结果：哪些日期、课程变化，变化是否符合修正预期，是否出现不该受影响的用户。保留输入批次和代码标识，使同一结果可以重现。这样历史数字的变化是可解释的修正，而不是某次作业悄悄改变口径。"}</BookParagraph>
</div>),
},
{ label: "质量指标也需要分母",
left: (<div className="space-y-4">
<PageTitle>{"质量指标也需要分母"}</PageTitle>
<BookParagraph>{"接入一千条，格式错误二十条、重复三十条，有效九百五十条，质量账应满足守恒。坏记录率为二十除一千，而不是二十除清洗后的九百五十；重复率同样需要明确分母。若总量下降，也要排查某来源是否停止发送。"}</BookParagraph>
<BookParagraph>{"案例：坏记录率从百分之二降到零，看似质量改善，实际新版本客户端完全没有接入。应联看来源覆盖、事件量与新鲜度，不能只看比例。质量规则需要对应故障假设，避免用一个漂亮数字掩盖整段数据链路中断。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"什么时候才引入分布式"}</PageTitle>
<BookParagraph>{"先在本地得到正确口径、样本和可重复结果，再测内存、运行时间和恢复时间。如果一天数据在单机十分钟完成且符合时效预算，复杂集群未必值得；若重算九十天需要数日且业务只能等两小时，则需要分区、并行和增量策略。"}</BookParagraph>
<BookParagraph>{"选择分布式后仍保留小样本基准作为语义参照，确保优化没有改变结果。性能目标包括吞吐、长尾任务、成本与失败后重做范围。对“大数据”的理解应落到规模与约束产生的工程机制，而不是文件越大工具名单越长。"}</BookParagraph>
</div>),
},
{ label: "排错、练习与参考", left: (<div className="space-y-4">
<PageTitle>{"常见错误与检查顺序"}</PageTitle>
<BookParagraph>{"把事件条数当人数会放大活跃；把重复投递当真实行为会抬高播放；把空用户都替换成同一个编号会让访客数失真。排查时先抽取十条可人工核对的样本，再比较接收量、隔离量、去重后数量与输出量，最后调查资源瓶颈。这样能区分业务口径错误、数据丢失和计算性能问题。"}</BookParagraph>
<BookParagraph>{"排查时保存输入批次和错误来源，再从日期、课程和客户端版本逐步缩小范围；只重跑同一程序而不改变原因，通常会重复同样问题。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"练习：写出可验收的数据契约"}</PageTitle>
<BookParagraph>{"为“课程日活”写一页契约，补充一条重复事件、一条跨日迟到事件和一条缺少用户的事件。验收要求：明确统计日期时区、匿名用户策略、去重键、重算范围，列出每条输入是否计入以及最终人数。参考思路：先画一行一事件的人工明细，再执行本章代码；匿名身份没有可信标识时可隔离并单独报告，不能猜测人数。"}</BookParagraph>
<BookParagraph>{"参考答案应包含字段示例、合法范围、时区、唯一键、迟到政策与版本。验收由另一人据此判断五条边界记录，若仍需口头补充，契约就不完整。"}</BookParagraph>
<BookList items={[<a key="https://spark.apache.org/docs/latest/sql-getting-started.html" href="https://spark.apache.org/docs/latest/sql-getting-started.html" target="_blank" rel="noreferrer" className="underline">Spark SQL入门：DataFrame与SQL</a>]} />
</div>) }
]

export default function IntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
