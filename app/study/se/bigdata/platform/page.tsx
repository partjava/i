'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '大数据平台与生态',
  chapterNumber: 2,
  totalChapters: 8,
  subjectHref: '/study/se/bigdata',
  prevChapter: { label: '概述', href: '/study/se/bigdata/intro' },
  nextChapter: { label: '数据采集与预处理', href: '/study/se/bigdata/ingest' },
  theme: THEMES.software,
}

const SPREADS = [
{ label: "问题与概念", left: (<div className="space-y-4">
<PageTitle>{"先画数据路径，再选工具"}</PageTitle>
<BookParagraph>{"学习平台的基本路径是客户端发送事件、接入服务校验、持久层留存、计算作业清洗汇总、查询层服务报表。消息队列缓冲突发流量并支持一定范围的重放，但不能替代所有长期存储；对象存储适合大规模文件，关系数据库适合小规模交互查询。先确定每天的数据量、允许延迟和重放期限，再把工具放进具体职责中。"}</BookParagraph>
<BookParagraph>{"例如日报查询慢不一定要换计算引擎，也可能只是未按日期选择输入；先画出读取范围与结果消费者，再定位延迟来自哪个职责。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"分清计算与存储职责"}</PageTitle>
<BookParagraph>{"Spark是计算引擎，读取JSON或Parquet后执行转换和聚合；它不是天然保存所有业务数据的数据库。驱动程序组织任务，执行器运行分区上的计算。文件目录保存数据，元数据描述字段和分区，调度器安排作业依赖。初学阶段用本机Python和文件模拟这些边界，理解失败从何处恢复，比一次安装整套生态更有价值。"}</BookParagraph>
<BookParagraph>{"计算结束后是否仍能查询结果取决于输出是否持久化。驱动进程关闭不会自动保存内存集合，因此每层都应声明哪些状态可以重建。"}</BookParagraph>
</div>) },
{ label: "数据与可复现实验", left: (<div className="space-y-4">
<PageTitle>{"原始、清洗、服务三层"}</PageTitle>
<BookParagraph>{"设原始批次batch_042收到一百条记录，其中两条格式错误、三条为重复投递，则清洗层应有九十五条。服务层可能只剩五条课程日汇总，记录数减少并不意味着丢数。为每个批次保存输入数、坏记录数、重复数和有效数，并检验输入数等于后三者之和；聚合以后则比较总播放次数等守恒量。"}</BookParagraph>
<BookParagraph>{"重复与坏记录计数应互斥且穷尽，先定义处理顺序；同一条既重复又格式非法时归哪一类，必须有固定规则才能稳定对账。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"本地模拟作业闸门"}</PageTitle>
<BookParagraph>{"以下Python 3代码不读取外部文件，模拟一次批次质量检查。把这些计数写入作业日志即可形成最小质量闸门，输出应为ready。故意把valid改成94会触发断言，说明作业虽然跑完，数据仍不能发布。实际系统还应检查字段完整率、主键冲突及相对历史的异常波动。"}</BookParagraph>
<BookParagraph>{"把计数相加守恒只是第一道门槛，还可检查关键字段完整率。即使数量相等，如果用户编号都为空，播放人数仍然不能发布。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"batch = {'received': 100, 'invalid': 2, 'duplicate': 3, 'valid': 95}\naccounted = batch['invalid'] + batch['duplicate'] + batch['valid']\nassert batch['received'] == accounted\nassert batch['valid'] > 0\nprint('ready')"} />
</div>) },
{ label: "工程方法与边界", left: (<div className="space-y-4">
<PageTitle>{"依赖、重试与发布"}</PageTitle>
<BookParagraph>{"日报作业应依赖对应日期的清洗分区就绪，而非只在固定时刻盲目执行。输出先写临时位置，通过完整性检查后再切换可见版本；同一批次重跑应覆盖该批次或进行有唯一键的合并，不能无限追加。失败重试需区分暂时网络故障与永久schema错误，前者退避重试，后者隔离输入并报警。"}</BookParagraph>
<BookParagraph>{"重试应携带同一批次标识，避免重复创建不同输出。对永久错误设置停止条件，并保存修正后应从哪一个恢复点继续的说明。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"监控要连接用户目标"}</PageTitle>
<BookParagraph>{"作业监控至少关注是否成功、最后成功处理的事件时间、处理速率、错误数和结果新鲜度。Spark UI中的任务耗时、shuffle读写、内存溢写能帮助定位计算瓶颈，事件日志支持事后查看。告警应说明受影响日期、落后时长、最近发布版本及恢复入口；“CPU高”本身不足以解释用户为何看不到日报。"}</BookParagraph>
<BookParagraph>{"新鲜度应以事件截止时间和发布时刻共同表达。作业每分钟成功处理旧文件，成功率很高却没有及时数据，因此两类监控不能替代。"}</BookParagraph>
</div>) },
{ label: "控制流与数据流分开画",
left: (<div className="space-y-4">
<PageTitle>{"控制流与数据流分开画"}</PageTitle>
<BookParagraph>{"例一：事件文件先到达，清洗作业验证后生成可用分区，日报作业再读取分区。数据流描述记录经过哪些层，控制流描述什么条件满足后允许执行下一步。把两者分开才能解释“任务成功但日报为空”是输入缺失还是依赖判断错误。"}</BookParagraph>
<BookParagraph>{"调度器可以负责重试和依赖，但不会自动知道文件是否完整。需要明确就绪信号、批次清单与质量结果；若只按时间启动，下游可能读到写了一半的文件。每个节点还应记录代码、输入版本与输出位置，便于定位失败和精确重跑。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"把组件职责写成契约"}</PageTitle>
<BookParagraph>{"队列承担缓冲和一定范围重放，存储承担保留，计算引擎承担转换，元数据目录描述字段与位置，查询服务承担可控读取。一个工具可能具备多个能力，但设计仍需写清每项能力由谁提供、数据保留多久以及失败时如何替代。"}</BookParagraph>
<BookParagraph>{"例如队列只保留七天，而审计要求重算三个月，原始层就必须有更长期的可恢复副本。反过来，只有对象文件并不自动提供低延迟逐条消费能力。下表以输入输出和失效影响比较角色，帮助避免把所有问题都交给同一个产品。"}</BookParagraph>
<div className="overflow-x-auto"><table className="min-w-[480px] w-full text-sm border-collapse"><thead><tr><th className="border border-paper-300/80 p-2 text-left">组件职责</th><th className="border border-paper-300/80 p-2 text-left">输入输出</th><th className="border border-paper-300/80 p-2 text-left">失效影响</th></tr></thead><tbody><tr><td className="border border-paper-300/80 p-2">队列</td><td className="border border-paper-300/80 p-2">接入事件→消费位置</td><td className="border border-paper-300/80 p-2">积压与实时延迟</td></tr><tr><td className="border border-paper-300/80 p-2">持久存储</td><td className="border border-paper-300/80 p-2">批次→可恢复输入</td><td className="border border-paper-300/80 p-2">无法重放或审计</td></tr><tr><td className="border border-paper-300/80 p-2">计算与发布</td><td className="border border-paper-300/80 p-2">输入版本→结果版本</td><td className="border border-paper-300/80 p-2">错误或过期报表</td></tr></tbody></table></div>
</div>),
},
{ label: "批次清单让输入可以冻结",
left: (<div className="space-y-4">
<PageTitle>{"批次清单让输入可以冻结"}</PageTitle>
<BookParagraph>{"例二：日报读取batch-042的两个文件，分别含六十和四十条。清单记录文件标识、条数、摘要与契约版本，作业只读这一组输入，而不是扫描正在继续变化的目录。这样重试面对相同输入，可以比较结果差异来自代码还是来源。"}</BookParagraph>
<BookParagraph>{"下面Python 3模拟清单核对，输出100；把任何文件条数改掉就不能通过预期计数。真实摘要还可发现同名文件内容变化。清单需要受控发布，不能由任意下游修改，否则“已冻结”只是一个没有约束力的约定。"}</BookParagraph>
<BookCode language="python" code={"manifest = {\"f1\": 60, \"f2\": 40}\nactual = {\"f1\": 60, \"f2\": 40}\nassert actual == manifest\nassert sum(actual.values()) == 100\nprint(sum(actual.values()))"} />
</div>),
right: (<div className="space-y-4">
<PageTitle>{"分区裁剪如何减少工作"}</PageTitle>
<BookParagraph>{"假设原始层按日期分九十个分区，每个五GB，统计某一天时只读该日理论上扫描五GB，读全部则四百五十GB。分区裁剪把业务过滤条件转为文件范围选择；若日期藏在复杂转换表达式里，引擎未必能同样有效地推导读取范围。"}</BookParagraph>
<BookParagraph>{"不要把分区数量越多当优化目标。每用户每分钟建小目录会带来大量小文件和元数据操作，调度成本可能超过处理本身。按常见过滤条件、单分区大小和迟到修正范围选择布局，再用读取文件数和扫描字节验证效果。"}</BookParagraph>
</div>),
},
{ label: "幂等发布的一次状态变化",
left: (<div className="space-y-4">
<PageTitle>{"幂等发布的一次状态变化"}</PageTitle>
<BookParagraph>{"作业输出先在不可见的临时位置生成，完成质量校验后，再用存储系统支持的受控方式切换已发布版本。消费者只读取已发布版本，避免看到半份结果。不要假定所有对象存储都具有目录级原子重命名能力，应依据实际接口设计。"}</BookParagraph>
<BookParagraph>{"下面Python 3以内存字典模拟“失败前仍看见旧版、通过后切换新版”，输出old和new。它只说明发布协议的状态，不是跨系统原子性实现。实际方案还需处理切换后进程崩溃、重复请求与旧版本回收，并保留可追踪发布编号。"}</BookParagraph>
<BookCode language="python" code={"versions = {\"old\": [1, 2], \"new\": [1, 2, 3]}\npublished = \"old\"\nprint(published)\nassert len(versions[\"new\"]) == 3\npublished = \"new\"\nprint(published)"} />
</div>),
right: (<div className="space-y-4">
<PageTitle>{"重跑的边界决定恢复成本"}</PageTitle>
<BookParagraph>{"日报汇总失败时，如果已有清洗分区通过校验，可以只重跑服务层；若发现清洗规则有误，则必须重算受影响日期并重新校验所有下游。层次化存储的价值之一是保留适当恢复点，减少每次故障都从最原始数据开始。"}</BookParagraph>
<BookParagraph>{"恢复点也有成本：过多中间层增加存储、权限和保留管理。对稳定可快速重建的临时结果，可以缩短保留；对昂贵且难重建的规范化明细，需要更谨慎。按恢复时间和重建代价决定，而不机械地复制三层架构名称。"}</BookParagraph>
</div>),
},
{ label: "追踪一次迟到日报",
left: (<div className="space-y-4">
<PageTitle>{"追踪一次迟到日报"}</PageTitle>
<BookParagraph>{"案例：调度显示全部任务绿色，但用户看到昨天之前的数据。先查服务层已发布版本与最大事件时间，再追到输入清单和接入新鲜度；若今天的源数据没有到达，重跑计算只会再次成功处理旧数据。"}</BookParagraph>
<BookParagraph>{"监控要包含来源最后到达时间、待处理积压、最后成功输入与结果新鲜度。告警应联系业务日期与消费者影响，例如“课程日报落后两小时”，并给出批次编号和恢复入口。任务成功是局部技术状态，结果及时可用才是用户目标。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"自建与托管的总工作量"}</PageTitle>
<BookParagraph>{"自建平台能控制插件、版本与资源策略，也需要维护安全补丁、调度、日志、容量和故障响应；托管平台减少部分基础工作，但有费用、配额、接口与数据导出约束。比较时按实际责任和团队时间列账，不把托管理解为无需运维。"}</BookParagraph>
<BookParagraph>{"对教学项目先使用本机脚本与明确数据契约完成闭环，再用可测瓶颈决定引擎。若未来迁移到Spark等工具，保持输入契约与金样本结果不变，把平台替换限制在计算实现层，便于验证新环境没有悄悄改掉业务含义。"}</BookParagraph>
</div>),
},
{ label: "排错、练习与参考", left: (<div className="space-y-4">
<PageTitle>{"常见错误：工具堆叠掩盖故障"}</PageTitle>
<BookParagraph>{"增加队列、计算引擎和数据库会增加网络、权限和版本边界。若日数据只有几十MB且允许隔天出报表，定时脚本加数据库可能已经满足需求。不要把所有异常都归结为资源不足：输入目录写错、分区未就绪、指标检查失败都可能产生“成功但无数据”的任务。平台可靠性依赖可观测性和可重放性，而非工具数量。"}</BookParagraph>
<BookParagraph>{"将工具故障映射到用户症状，例如队列积压影响实时看板，归档不可读影响历史重算；这能帮助确定恢复优先级和降级方式。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"练习：设计一次故障演练"}</PageTitle>
<BookParagraph>{"为学习平台写出从接收到报表的五步流程，标明每一步的输入、输出和负责人。模拟清洗成功但服务层写入失败，说明如何恢复。验收：重跑后课程日汇总只有一个有效版本，原始输入保留，计数账本平衡，告警能指出受影响分区。参考思路：用批次编号绑定输入和产物，检查通过后发布，避免下游读取半份结果。"}</BookParagraph>
<BookParagraph>{"演练时区分进程失败、坏数据与上游断流，分别核对重试、隔离和新鲜度告警；只模拟一种故障不能证明整条链路可恢复。"}</BookParagraph>
<BookList items={[<a key="https://spark.apache.org/docs/latest/monitoring.html" href="https://spark.apache.org/docs/latest/monitoring.html" target="_blank" rel="noreferrer" className="underline">Spark官方监控与事件日志</a>]} />
</div>) }
]

export default function PlatformPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
