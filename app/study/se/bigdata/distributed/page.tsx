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
</div>), right: (<div className="space-y-4">
<PageTitle>{"什么操作需要shuffle"}</PageTitle>
<BookParagraph>{"单条事件的字段转换可在原分区执行，但按course_id统计播放数时，同课程记录必须汇合。shuffle将数据重新分发给负责该键的任务，涉及网络、序列化和磁盘。连接两张大表、排序及分组都可能产生此类成本。优化前先确认输出正确，再查看执行计划与任务指标，识别真正的数据交换环节。"}</BookParagraph>
</div>) },
{ label: "数据与可复现实验", left: (<div className="space-y-4">
<PageTitle>{"本地理解两阶段聚合"}</PageTitle>
<BookParagraph>{"以下仅依赖Python 3，用两个列表模拟两个分区，先局部计数再合并，不是Spark作业。预期打印“[(c1, 3), (c2, 2)]”对应的Python字符串表示。可合并的计数、总和适合局部预聚合；全局去重人数不能直接相加，因为同一用户可能出现在两个分区。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"from collections import Counter\npartitions = [['c1', 'c1', 'c2'], ['c1', 'c2']]\npartials = [Counter(part) for part in partitions]\nresult = Counter()\nfor partial in partials:\n    result.update(partial)\nprint(sorted(result.items()))"} />
</div>), right: (<div className="space-y-4">
<PageTitle>{"小文件为何拖慢查询"}</PageTitle>
<BookParagraph>{"假设每天每分钟写一份文件，一个月就有四万多份，即便总数据不大，列目录、打开文件和调度任务也有成本。应按时间与业务查询组织文件，定期合并过小文件。不能简单把所有数据合成一个文件：那可能降低并行度，甚至让一个任务承担全部写入。文件大小与分区数应结合实际输入规模和测量结果调整。"}</BookParagraph>
</div>) },
{ label: "工程方法与边界", left: (<div className="space-y-4">
<PageTitle>{"倾斜：平均值掩盖慢任务"}</PageTitle>
<BookParagraph>{"若九成事件属于热门课程c1，按课程分发后会有一个任务远大于其他任务，总耗时取决于最慢者。先统计键频率和任务耗时分布，再选择局部聚合、拆分热点或单独处理。对于求和，可给热点增加临时盐值分散计算，再按原键合并；对于精确去重，合并集合与相加数量的语义不同，不能照搬。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"连接维表与资源边界"}</PageTitle>
<BookParagraph>{"课程名称等小维表可在满足内存预算时广播给执行器，避免把大量事件重新分发；但表“小”必须用实际序列化大小评估。维表course_id若不唯一，会把一条事件连接成多行，指标膨胀，此时增加内存毫无帮助。先检查连接键唯一性、缺失匹配和连接前后行数，再讨论广播或其他连接策略。"}</BookParagraph>
</div>) },
{ label: "排错、练习与参考", left: (<div className="space-y-4">
<PageTitle>{"从执行计划找到证据"}</PageTitle>
<BookParagraph>{"Spark的explain可帮助观察扫描、过滤、聚合和交换，UI可比较任务耗时、shuffle量与溢写。不要无依据地把分区数设成一个固定“最佳值”：过少会限制并行，过多会增加调度成本。先记录基线，在同一输入上仅改变一个条件，同时比较正确性、运行时间、输出文件数和资源消耗。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"练习：证明优化有效"}</PageTitle>
<BookParagraph>{"生成两个分区，各包含同一个用户对c1的播放，先计算播放次数，再计算全局去重人数。验收：播放次数为2，用户数为1，解释局部人数求和为何错误。再构造九成数据属于c1的键分布，提交热点诊断与两阶段计数方案。参考思路：可合并聚合先局部归约；性能结论需基线和同输入对照，不能仅凭代码更短。"}</BookParagraph>
<BookList items={[<a key="https://spark.apache.org/docs/latest/sql-performance-tuning.html" href="https://spark.apache.org/docs/latest/sql-performance-tuning.html" target="_blank" rel="noreferrer" className="underline">Spark SQL性能调优：分区、连接与倾斜</a>]} />
</div>) }
]

export default function DistributedPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
