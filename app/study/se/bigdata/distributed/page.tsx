'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '分布式存储与计算',
  chapterNumber: 4,
  totalChapters: 8,
  subjectHref: '/study/se/bigdata',
  prevChapter: { label: '数据采集与预处理', href: '/study/se/bigdata/ingest' },
  nextChapter: { label: '数据分析与挖掘', href: '/study/se/bigdata/analysis' },
  theme: THEMES.software,
}

const SPREADS = [
{ label: "问题与概念", left: (<div className="space-y-4">
<PageTitle>{"分区让数据能并行处理"}</PageTitle>
<BookParagraph>{"当事件无法由一个进程高效处理时，可以切成多个分区并行读取与转换。存储分区与计算分区并不相同：目录date=某日用于减少扫描范围，运行时的任务分区决定同时处理多少份数据。按日期查询应尽早过滤分区；按user_id建立大量目录则可能制造海量小文件，目录越细并不总是越快。"}</BookParagraph>
<BookParagraph>{"并行速度受最慢任务限制，而非只取决于机器总数。先确认分区是否均衡，再观察序列化、网络与磁盘开销，避免把并行度直接当加速倍数。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"什么操作需要shuffle"}</PageTitle>
<BookParagraph>{"单条事件的字段转换可在原分区执行，但按course_id统计播放数时，同课程记录必须汇合。shuffle将数据重新分发给负责该键的任务，涉及网络、序列化和磁盘。连接两张大表、排序及分组都可能产生此类成本。优化前先确认输出正确，再查看执行计划与任务指标，识别真正的数据交换环节。"}</BookParagraph>
<BookParagraph>{"过滤与逐行字段转换通常可在原分区完成，按不同键分组往往需要重新分布。提前丢弃无用字段能减少后续移动的数据量。"}</BookParagraph>
</div>) },
{ label: "数据与可复现实验", left: (<div className="space-y-4">
<PageTitle>{"本地理解两阶段聚合"}</PageTitle>
<BookParagraph>{"以下仅依赖Python 3，用两个列表模拟两个分区，先局部计数再合并，不是Spark作业。预期打印“[(c1, 3), (c2, 2)]”对应的Python字符串表示。可合并的计数、总和适合局部预聚合；全局去重人数不能直接相加，因为同一用户可能出现在两个分区。"}</BookParagraph>
<BookParagraph>{"本地模型应同时检查中间状态与最终输出。局部计数总和不等于最终去重人数，因此优化前先判断聚合所需的可合并信息。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"from collections import Counter\npartitions = [['c1', 'c1', 'c2'], ['c1', 'c2']]\npartials = [Counter(part) for part in partitions]\nresult = Counter()\nfor partial in partials:\n    result.update(partial)\nprint(sorted(result.items()))"} />
</div>), right: (<div className="space-y-4">
<PageTitle>{"小文件为何拖慢查询"}</PageTitle>
<BookParagraph>{"假设每天每分钟写一份文件，一个月就有四万多份，即便总数据不大，列目录、打开文件和调度任务也有成本。应按时间与业务查询组织文件，定期合并过小文件。不能简单把所有数据合成一个文件：那可能降低并行度，甚至让一个任务承担全部写入。文件大小与分区数应结合实际输入规模和测量结果调整。"}</BookParagraph>
<BookParagraph>{"小文件会增加列举、打开与任务调度开销。合并文件时应维持分区含义和发布完整性，不能为减少文件数把不同权限范围混在一起。"}</BookParagraph>
</div>) },
{ label: "工程方法与边界", left: (<div className="space-y-4">
<PageTitle>{"倾斜：平均值掩盖慢任务"}</PageTitle>
<BookParagraph>{"若九成事件属于热门课程c1，按课程分发后会有一个任务远大于其他任务，总耗时取决于最慢者。先统计键频率和任务耗时分布，再选择局部聚合、拆分热点或单独处理。对于求和，可给热点增加临时盐值分散计算，再按原键合并；对于精确去重，合并集合与相加数量的语义不同，不能照搬。"}</BookParagraph>
<BookParagraph>{"可对比最大分区与中位分区大小，并关联最慢任务。热门键之外，空键或默认值也可能集中大量记录，应先查数据质量原因。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"连接维表与资源边界"}</PageTitle>
<BookParagraph>{"课程名称等小维表可在满足内存预算时广播给执行器，避免把大量事件重新分发；但表“小”必须用实际序列化大小评估。维表course_id若不唯一，会把一条事件连接成多行，指标膨胀，此时增加内存毫无帮助。先检查连接键唯一性、缺失匹配和连接前后行数，再讨论广播或其他连接策略。"}</BookParagraph>
<BookParagraph>{"连接前检查键类型及维表唯一性，连接后核对事实主键和计数。资源优化不能掩盖一对多膨胀产生的错误结果。"}</BookParagraph>
</div>) },
{ label: "分区内聚合怎样减少传输",
left: (<div className="space-y-4">
<PageTitle>{"分区内聚合怎样减少传输"}</PageTitle>
<BookParagraph>{"例一：四个分区各有一万条课程播放，课程编号只有十种。若直接把四万条事件按课程重新分组，需要移动大量明细；先在各分区统计十个局部计数，再合并最多四十个部分结果，通常能显著减少网络传输。"}</BookParagraph>
<BookParagraph>{"这种优化依赖聚合能拆成可合并状态。求和可合并部分和，平均值应传部分和与计数，不能平均各分区平均值。去重人数需要合并集合或明确定义的估计状态，不能简单把局部人数相加。减少数据移动时仍要保护业务语义。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"平均值的正确合并状态"}</PageTitle>
<BookParagraph>{"分区甲包含1和9，平均5；分区乙只有100，平均100。直接平均两个均值得52.5，实际三项平均为110除3，约36.67。问题来自分区大小不同，必须保留每个分区的总和与条数。"}</BookParagraph>
<BookParagraph>{"Python 3演示局部状态再合并，输出110、3和36.67。示例在本地运行，用来理解分布式代数，不需要Spark。下表比较几种聚合需要保留的状态，帮助判断哪些操作能局部提前计算、哪些操作需要更大的状态或额外误差约束。"}</BookParagraph>
<div className="overflow-x-auto"><table className="min-w-[480px] w-full text-sm border-collapse"><thead><tr><th className="border border-paper-300/80 p-2 text-left">聚合</th><th className="border border-paper-300/80 p-2 text-left">局部状态</th><th className="border border-paper-300/80 p-2 text-left">合并方式</th></tr></thead><tbody><tr><td className="border border-paper-300/80 p-2">求和</td><td className="border border-paper-300/80 p-2">部分和</td><td className="border border-paper-300/80 p-2">部分和相加</td></tr><tr><td className="border border-paper-300/80 p-2">均值</td><td className="border border-paper-300/80 p-2">部分和、计数</td><td className="border border-paper-300/80 p-2">先分别相加再相除</td></tr><tr><td className="border border-paper-300/80 p-2">精确去重</td><td className="border border-paper-300/80 p-2">集合等精确状态</td><td className="border border-paper-300/80 p-2">集合并集，关注内存</td></tr></tbody></table></div>
<BookCode language="python" code={"partitions = [[1, 9], [100]]\nstates = [(sum(values), len(values)) for values in partitions]\ntotal = sum(s for s, _ in states)\ncount = sum(n for _, n in states)\nprint(total, count, round(total / count, 2))"} />
</div>),
},
{ label: "键倾斜从任务尾部识别",
left: (<div className="space-y-4">
<PageTitle>{"键倾斜从任务尾部识别"}</PageTitle>
<BookParagraph>{"例二：一百个课程中，热门课占全部事件的百分之六十，按课程哈希后它仍只能进入一个目标分区。其他任务很快结束，最后一个任务持续很久；增加总分区数不必然把同一个键拆开。应观察分区大小与任务耗时分布。"}</BookParagraph>
<BookParagraph>{"对可结合的计数，可将热门键临时加盐分散到多个子键，先局部计数再去盐合并。盐的引入和移除必须对应，遗漏去盐会改变结果粒度。对连接或去重，处理方式更复杂，不能照搬计数方案；先确认输出等价，再比较尾部耗时。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"连接膨胀先看维表唯一性"}</PageTitle>
<BookParagraph>{"事实表一条课程播放，维表却含同课程两个版本，按course_id直接连接会得到两行，播放数翻倍。若维表是历史版本表，需要按事件时间选取有效版本；若本应唯一，则重复是质量错误，应在连接前阻断或修复。"}</BookParagraph>
<BookParagraph>{"下面Python 3构造一条事实与两条维记录，输出2，直观看到一对多扩张。增加机器只会更快得到错误数字。连接前后比较事实主键唯一性、行数及守恒指标，既能发现业务错误，也能避免意外放大shuffle与内存需求。"}</BookParagraph>
<BookCode language="python" code={"facts = [{\"course\": \"c1\", \"event\": \"e1\"}]\ndimension = [{\"course\": \"c1\", \"version\": 1},\n             {\"course\": \"c1\", \"version\": 2}]\njoined = [(f, d) for f in facts for d in dimension\n          if f[\"course\"] == d[\"course\"]]\nprint(len(joined))"} />
</div>),
},
{ label: "广播连接的内存账",
left: (<div className="space-y-4">
<PageTitle>{"广播连接的内存账"}</PageTitle>
<BookParagraph>{"例三：小维表序列化后几十MB，看起来适合复制到各执行进程，但解码后的对象和哈希索引可能更大；每个进程都持有副本，整体内存随进程数增长。是否广播应依据实际大小、可用内存与执行计划，而不是文件名包含small。"}</BookParagraph>
<BookParagraph>{"如果维表逐渐增长，原本稳定的作业可能突然溢出。记录维表行数、实际内存与执行计划变化，设置容量阈值并保留普通分区连接方案。广播减少某些数据重分布，但不能解决维表重复、过滤错误或连接键类型不一致等语义问题。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"分区数为何有合理区间"}</PageTitle>
<BookParagraph>{"分区过少使并行度不足，单任务数据太大容易溢写；分区过多则增加任务调度、文件打开和元数据成本。教学估算：一百GB输入若目标每分区二百五十MB，大约四百分区，但实际值还需根据压缩、算子和资源调整。"}</BookParagraph>
<BookParagraph>{"按日期分目录解决读取范围，执行分区解决任务并行，两者不是同一概念。读取一个日期仍可包含多个执行分区，写出过多小文件也可能拖慢下次查询。优化时分别观察扫描量、任务数、shuffle、溢写和输出文件大小。"}</BookParagraph>
</div>),
},
{ label: "失败重试与确定性结果",
left: (<div className="space-y-4">
<PageTitle>{"失败重试与确定性结果"}</PageTitle>
<BookParagraph>{"一个分区任务失败后重新执行，如果转换逻辑依赖当前时间、外部可变接口或随机数，重试可能产生不同结果。需要冻结输入、固定必要随机种子，并避免在可重试变换中直接执行不可幂等的外部副作用。"}</BookParagraph>
<BookParagraph>{"例如每处理一条事件就调用积分接口，任务重试可能重复加分；更稳妥的设计是生成带稳定业务编号的结果，再由可去重写入协议提交。引擎能重算分区，不等于外部系统自动撤销此前已执行动作，失败边界必须沿输出链检查。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"用对照实验证明优化"}</PageTitle>
<BookParagraph>{"保留同一输入快照和业务输出，先测基线扫描字节、耗时、资源峰值与费用，再单独改变一个因素，例如提前过滤或预聚合。比较输出主键、计数和关键汇总一致后，再看性能是否改善，避免同时改多个配置后无法解释收益。"}</BookParagraph>
<BookParagraph>{"案例：总耗时由十分钟降到七分钟，但资源翻倍，可能不符合成本目标；尾部任务从五分钟降到一分钟，则可能更有利于恢复与时效。把结果、资源与代价一起记录，性能优化才是工程取舍，而不只是选择更大的集群。"}</BookParagraph>
</div>),
},
{ label: "排错、练习与参考", left: (<div className="space-y-4">
<PageTitle>{"从执行计划找到证据"}</PageTitle>
<BookParagraph>{"Spark的explain可帮助观察扫描、过滤、聚合和交换，UI可比较任务耗时、shuffle量与溢写。不要无依据地把分区数设成一个固定“最佳值”：过少会限制并行，过多会增加调度成本。先记录基线，在同一输入上仅改变一个条件，同时比较正确性、运行时间、输出文件数和资源消耗。"}</BookParagraph>
<BookParagraph>{"执行计划说明引擎准备如何做，运行指标说明实际发生什么；同时查看扫描、移动与溢写证据，才能避免根据单个耗时猜瓶颈。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"练习：证明优化有效"}</PageTitle>
<BookParagraph>{"生成两个分区，各包含同一个用户对c1的播放，先计算播放次数，再计算全局去重人数。验收：播放次数为2，用户数为1，解释局部人数求和为何错误。再构造九成数据属于c1的键分布，提交热点诊断与两阶段计数方案。参考思路：可合并聚合先局部归约；性能结论需基线和同输入对照，不能仅凭代码更短。"}</BookParagraph>
<BookParagraph>{"保持输入快照不变，先验证结果等价，再比较耗时、资源峰值与成本。若只记录最快一次运行，缓存和资源波动可能被误认为优化收益。"}</BookParagraph>
<BookList items={[<a key="https://spark.apache.org/docs/latest/sql-performance-tuning.html" href="https://spark.apache.org/docs/latest/sql-performance-tuning.html" target="_blank" rel="noreferrer" className="underline">Spark SQL性能调优：分区、连接与倾斜</a>]} />
</div>) }
]

export default function DistributedPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
