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
</div>), right: (<div className="space-y-4">
<PageTitle>{"分清计算与存储职责"}</PageTitle>
<BookParagraph>{"Spark是计算引擎，读取JSON或Parquet后执行转换和聚合；它不是天然保存所有业务数据的数据库。驱动程序组织任务，执行器运行分区上的计算。文件目录保存数据，元数据描述字段和分区，调度器安排作业依赖。初学阶段用本机Python和文件模拟这些边界，理解失败从何处恢复，比一次安装整套生态更有价值。"}</BookParagraph>
</div>) },
{ label: "数据与可复现实验", left: (<div className="space-y-4">
<PageTitle>{"原始、清洗、服务三层"}</PageTitle>
<BookParagraph>{"设原始批次batch_042收到一百条记录，其中两条格式错误、三条为重复投递，则清洗层应有九十五条。服务层可能只剩五条课程日汇总，记录数减少并不意味着丢数。为每个批次保存输入数、坏记录数、重复数和有效数，并检验输入数等于后三者之和；聚合以后则比较总播放次数等守恒量。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"本地模拟作业闸门"}</PageTitle>
<BookParagraph>{"以下Python 3代码不读取外部文件，模拟一次批次质量检查。把这些计数写入作业日志即可形成最小质量闸门，输出应为ready。故意把valid改成94会触发断言，说明作业虽然跑完，数据仍不能发布。实际系统还应检查字段完整率、主键冲突及相对历史的异常波动。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"batch = {'received': 100, 'invalid': 2, 'duplicate': 3, 'valid': 95}\naccounted = batch['invalid'] + batch['duplicate'] + batch['valid']\nassert batch['received'] == accounted\nassert batch['valid'] > 0\nprint('ready')"} />
</div>) },
{ label: "工程方法与边界", left: (<div className="space-y-4">
<PageTitle>{"依赖、重试与发布"}</PageTitle>
<BookParagraph>{"日报作业应依赖对应日期的清洗分区就绪，而非只在固定时刻盲目执行。输出先写临时位置，通过完整性检查后再切换可见版本；同一批次重跑应覆盖该批次或进行有唯一键的合并，不能无限追加。失败重试需区分暂时网络故障与永久schema错误，前者退避重试，后者隔离输入并报警。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"监控要连接用户目标"}</PageTitle>
<BookParagraph>{"作业监控至少关注是否成功、最后成功处理的事件时间、处理速率、错误数和结果新鲜度。Spark UI中的任务耗时、shuffle读写、内存溢写能帮助定位计算瓶颈，事件日志支持事后查看。告警应说明受影响日期、落后时长、最近发布版本及恢复入口；“CPU高”本身不足以解释用户为何看不到日报。"}</BookParagraph>
</div>) },
{ label: "排错、练习与参考", left: (<div className="space-y-4">
<PageTitle>{"常见错误：工具堆叠掩盖故障"}</PageTitle>
<BookParagraph>{"增加队列、计算引擎和数据库会增加网络、权限和版本边界。若日数据只有几十MB且允许隔天出报表，定时脚本加数据库可能已经满足需求。不要把所有异常都归结为资源不足：输入目录写错、分区未就绪、指标检查失败都可能产生“成功但无数据”的任务。平台可靠性依赖可观测性和可重放性，而非工具数量。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"练习：设计一次故障演练"}</PageTitle>
<BookParagraph>{"为学习平台写出从接收到报表的五步流程，标明每一步的输入、输出和负责人。模拟清洗成功但服务层写入失败，说明如何恢复。验收：重跑后课程日汇总只有一个有效版本，原始输入保留，计数账本平衡，告警能指出受影响分区。参考思路：用批次编号绑定输入和产物，检查通过后发布，避免下游读取半份结果。"}</BookParagraph>
<BookList items={[<a key="https://spark.apache.org/docs/latest/monitoring.html" href="https://spark.apache.org/docs/latest/monitoring.html" target="_blank" rel="noreferrer" className="underline">Spark官方监控与事件日志</a>]} />
</div>) }
]

export default function PlatformPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
