'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '实战案例与项目',
  chapterNumber: 8,
  totalChapters: 8,
  subjectHref: '/study/se/bigdata',
  prevChapter: { label: '大数据安全与运维', href: '/study/se/bigdata/security' },
  theme: THEMES.software,
}

const SPREADS = [
{ label: "问题与概念", left: (<div className="space-y-4">
<PageTitle>{"项目目标与交付边界"}</PageTitle>
<BookParagraph>{"实现一份可信的课程日报：按事件发生日期和课程统计有效播放次数、播放用户数及提交转化率。先用十条以内的虚构事件完成本地闭环，后续再讨论分布式扩展。交付物应包括数据契约、样本、清洗脚本、指标定义、质量报告和恢复说明，不能只交一张截图或一个缺少输入来源的Spark片段。"}</BookParagraph>
<BookParagraph>{"项目边界还应声明哪些是本地模拟、哪些尚未接入真实平台。把语义正确性、可恢复性和容量测试分开评估，避免一次小样本成功代表所有目标完成。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"确定验收用例再编写流程"}</PageTitle>
<BookParagraph>{"样本至少包含正常播放、同编号重试、无用户记录、跨日迟到，以及同用户学习两门课程。规定日报按UTC日期统计，匿名记录隔离，重试不重复计数；提交转化仅统计当日播放者中的当日提交者。列出人工预期值，保证程序每次改动都能检查语义，而不只是确认进程没有报错。"}</BookParagraph>
<BookParagraph>{"为每条样本记录明确保留、隔离或去重的原因。改变其中一条输入后手工推导结果，再检查程序差异，可证明验收没有只记住固定数字。"}</BookParagraph>
</div>) },
{ label: "数据与可复现实验", left: (<div className="space-y-4">
<PageTitle>{"本地闭环：构造并清洗事件"}</PageTitle>
<BookParagraph>{"本项目仅依赖Python 3标准库。将本页与右页代码顺序保存在同一个project.py执行，不需要文件、数据库或Spark。这里所有日期均代表UTC事件日期，已省略完整时间解析；真实接入须保留带时区时间并验证schema。输入中的e1是重复投递，e4是没有身份的坏记录，清洗后保留三条有效事件。"}</BookParagraph>
<BookParagraph>{"处理顺序应保持稳定，先验证必要字段，再检查编号冲突与重试。对坏记录保存安全来源标识，使之后能定向修正而非重新猜测。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"rows = [\n ('e1','2026-10-01','c1','u1','play'),\n ('e1','2026-10-01','c1','u1','play'),\n ('e2','2026-10-01','c1','u2','play'),\n ('e3','2026-10-01','c1','u1','submit'),\n ('e4','2026-10-01','c1',None,'play'),\n]\nvalid = {}\nfor row in rows:\n    if row[3] is not None:\n        key = row[0]\n        assert key not in valid or valid[key] == row\n        valid[key] = row"} />
</div>), right: (<div className="space-y-4">
<PageTitle>{"汇总与人工预期对照"}</PageTitle>
<BookParagraph>{"继续执行下面代码，预期输出“2 2 50.0%”。分子用播放集合与提交集合的交集，防止只提交而没有播放的用户扩大转化率。示例只统计一个日期和课程；扩展时以日期、课程作为分组键，为每组分别维护集合，再用相同人工样本验收，不能把所有课程混成一个分母。"}</BookParagraph>
<BookParagraph>{"除打印结果外，断言分组键、播放次数、人数和比例，确保修改代码后自动发现变化。空分母和跨课程重复用户也要另设样本。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"group = [r for r in valid.values()\n         if r[1:3] == ('2026-10-01', 'c1')]\nplays = [r for r in group if r[4] == 'play']\nplayers = {r[3] for r in plays}\nsubmitters = {r[3] for r in group if r[4] == 'submit'}\nconverted = players & submitters\nrate = len(converted) / len(players) if players else None\nassert len(plays) == 2 and len(players) == 2\nassert rate == 0.5\nprint(len(plays), len(players), f'{rate:.1%}')"} />
</div>) },
{ label: "工程方法与边界", left: (<div className="space-y-4">
<PageTitle>{"从脚本扩展为可恢复作业"}</PageTitle>
<BookParagraph>{"把输入拆成带批次号的只读文件，输出按日期与课程唯一发布。每次保存输入数量、坏记录数、重复数和有效数，并记录代码版本。新到一条前一天事件时，重新计算受影响日期，而非在旧用户数上加一，因为用户可能已经计入。发布前检查行数、唯一键和守恒量，失败时保留旧版本供报表继续使用。"}</BookParagraph>
<BookParagraph>{"持久化扩展时保留输入清单、代码版本和输出版本。每个失败点都写明应从哪步重试以及如何避免重复，形成真正可执行的运行手册。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"扩展到Spark前的证据"}</PageTitle>
<BookParagraph>{"当真实数据使单机处理超过窗口，再迁移到显式schema的DataFrame、分区过滤和分组聚合。Spark需要兼容的Python、Java和PySpark运行环境，本项目代码没有此依赖，也不是可直接替换为Spark的模板。迁移时保持同一份小样本与预期值，比较分布式结果，再测shuffle、热点键及输出文件数，避免把规模扩展误当业务正确。"}</BookParagraph>
<BookParagraph>{"迁移到并行引擎前先量化瓶颈是扫描、计算、连接还是输出。保持金样本不变，再按同口径核对结果，防止性能改造改掉业务定义。"}</BookParagraph>
</div>) },
{ label: "项目样本先覆盖失败路径",
left: (<div className="space-y-4">
<PageTitle>{"项目样本先覆盖失败路径"}</PageTitle>
<BookParagraph>{"例一：构造两个日期、两门课程和三名用户的事件，加入重试、无用户记录、同编号冲突和迟到事件。为每条写明预期处理，再计算每个日期课程的播放次数、人数与转化分子，形成后续实现的金样本。"}</BookParagraph>
<BookParagraph>{"样本小是为了人工能核对，不是因为真实系统没有复杂性。覆盖关键边界比随机生成大量正常记录更能发现语义错误；正确性基准形成后，再扩大数据量测试性能。下表把样本类型、预期动作与检查证据一一对应。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"按阶段记录质量账"}</PageTitle>
<BookParagraph>{"接收、隔离、去重与有效输出分别计数，输入条数应等于被解释的几类结果之和。转换成课程日报后行数会变少，此时应检查播放总次数等守恒指标，而不是继续要求明细行数等于汇总行数。"}</BookParagraph>
<BookParagraph>{"例如输入十条，格式错误一条、重复两条、有效七条；有效事件中五条播放、两条提交，日报播放次数之和应为五。若只输出“作业成功”，无法判断缺失的一条是有意隔离还是代码无声丢弃，发布前需要这份可对账记录。"}</BookParagraph>
<div className="overflow-x-auto"><table className="min-w-[480px] w-full text-sm border-collapse"><thead><tr><th className="border border-paper-300/80 p-2 text-left">样本</th><th className="border border-paper-300/80 p-2 text-left">预期动作</th><th className="border border-paper-300/80 p-2 text-left">验收证据</th></tr></thead><tbody><tr><td className="border border-paper-300/80 p-2">同编号同内容</td><td className="border border-paper-300/80 p-2">仅保留一次</td><td className="border border-paper-300/80 p-2">计数不膨胀</td></tr><tr><td className="border border-paper-300/80 p-2">同编号不同内容</td><td className="border border-paper-300/80 p-2">隔离或阻断</td><td className="border border-paper-300/80 p-2">冲突编号可追溯</td></tr><tr><td className="border border-paper-300/80 p-2">跨日迟到</td><td className="border border-paper-300/80 p-2">按政策更正原日期</td><td className="border border-paper-300/80 p-2">结果版本及更新时间</td></tr></tbody></table></div>
</div>),
},
{ label: "多分组汇总的完整键",
left: (<div className="space-y-4">
<PageTitle>{"多分组汇总的完整键"}</PageTitle>
<BookParagraph>{"例二：u1在十月一日学习c1和c2，u2只学习c1。按课程统计c1两人、c2一人，全站仍只有两人。若用课程号作为唯一分组键，会把不同日期混在一起；应使用日期与课程组成的键，并为每组维护自己的集合。"}</BookParagraph>
<BookParagraph>{"下面Python 3在内存构造三个播放，输出两个课程组及各自人数2和1。随后检查全站集合人数为2。这个对照能发现“先聚合再错误相加”导致的跨课程重复，是把课程日报扩展成全站报表时很有价值的回归用例。"}</BookParagraph>
<BookCode language="python" code={"from collections import defaultdict\nrows = [(\"2026-10-01\", \"c1\", \"u1\"),\n        (\"2026-10-01\", \"c1\", \"u2\"),\n        (\"2026-10-01\", \"c2\", \"u1\")]\nplayers = defaultdict(set)\nfor day, course, user in rows:\n    players[(day, course)].add(user)\nprint([(key, len(users)) for key, users in sorted(players.items())])\nassert len({u for _, _, u in rows}) == 2"} />
</div>),
right: (<div className="space-y-4">
<PageTitle>{"重复编号冲突必须停下来"}</PageTitle>
<BookParagraph>{"同编号同内容可作为重试去重，同编号不同内容则无法同时代表同一个事实。不要简单保留最后一行，因为输入顺序改变会改变结果；也不要只按用户和时间去重，用户可能在同一秒进行两次合法操作。"}</BookParagraph>
<BookParagraph>{"示例：e1原来是播放，后来同编号变为提交。应隔离或阻断冲突并追查生产端，而不是把它计算为一次提交。将冲突数量独立监控，在修正规则确定后重放相关记录，并保留原始来源，使报表变化可以解释。"}</BookParagraph>
</div>),
},
{ label: "迟到更正与分区替换",
left: (<div className="space-y-4">
<PageTitle>{"迟到更正与分区替换"}</PageTitle>
<BookParagraph>{"例三：十月一日的日报已经发布，十月三日收到一条属于十月一日的新播放。若政策允许两天内更正，可重算十月一日分区并发布新版本；若仅追加一行旧分区汇总，可能让消费方同时读到旧版和修正版，重复计数。"}</BookParagraph>
<BookParagraph>{"下面Python 3模拟按日期课程键替换结果，再重复同样替换，最终仍为3，说明相同批次重试不累计扩大。它只是内存幂等模型，真实存储还需检查原子可见性、并发版本和失败恢复，不能把字典赋值直接当跨系统事务。"}</BookParagraph>
<BookCode language="python" code={"report = {(\"2026-10-01\", \"c1\"): 2}\nreplacement = {(\"2026-10-01\", \"c1\"): 3}\nfor _ in range(2):\n    report.update(replacement)\nprint(report[(\"2026-10-01\", \"c1\")])"} />
</div>),
right: (<div className="space-y-4">
<PageTitle>{"发布前后各有一个校验点"}</PageTitle>
<BookParagraph>{"发布前检查数据完整性、质量阈值和金样本结果，发布后验证消费者能读取新版本、权限正确且新鲜度更新。前者阻止错误结果进入服务，后者发现入口、缓存或配置问题，两者不能互相替代。"}</BookParagraph>
<BookParagraph>{"若发布失败，旧版本应仍可用并明确显示旧截止时间；如果新版本已可见但客户端仍缓存旧结果，要核对缓存键与失效方式。每次发布保存输入清单、代码标识、口径版本和输出版本，形成从报表数字回到原始事件的追踪链。"}</BookParagraph>
</div>),
},
{ label: "设计一次可解释故障演练",
left: (<div className="space-y-4">
<PageTitle>{"设计一次可解释故障演练"}</PageTitle>
<BookParagraph>{"让作业在生成部分输出后模拟失败，观察消费者是否仍只看到旧版本；随后用同一输入重跑，核对没有重复、没有丢失。再故意引入一条不合法事件，确认质量报告能指出原因且发布按规则阻断或隔离。"}</BookParagraph>
<BookParagraph>{"最后模拟来源停止发送，看新鲜度监控是否报警。三个演练分别检验发布原子性、数据质量和链路及时性。记录触发条件、预期、实际结果和恢复动作，若失败应保留问题与修复计划，而不是删掉失败用例换一张成功截图。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"从本地脚本迈向生产职责"}</PageTitle>
<BookParagraph>{"本地项目已经证明指标和样本正确，扩展时需要调度、持久状态、权限、监控、重放与容量规划。将这些职责逐项映射到现有平台或明确实现，不必一次引入所有工具，但不能假定计算引擎会自动补齐整条链路。"}</BookParagraph>
<BookParagraph>{"评审时让另一人从某个课程人数追到输入事件，并解释重试、迟到和删除分别如何处理。再用同一金样本验证替换后的引擎，确保性能升级没有改变业务含义。项目的核心成果应是可恢复、可解释且受控的数据产品，而不只是运行过一次分布式命令。"}</BookParagraph>
</div>),
},
{ label: "排错、练习与参考", left: (<div className="space-y-4">
<PageTitle>{"监控与发布演练"}</PageTitle>
<BookParagraph>{"为日报定义截止时间，例如每日UTC两点前发布前一天暂定结果，三天后定稿；这是练习约定而非通用标准。监控最后处理的事件时间、坏记录比例、任务耗时和发布版本。演练输出写到一半失败、同批次重放和迟到补算，验证旧结果仍可读取、恢复后不重复累计，并在看板标记修订时间。"}</BookParagraph>
<BookParagraph>{"演练不只让进程崩溃，还要模拟输入不齐和迟到更正。观察消费者是否看到旧版、暂定版或新版，并确认状态提示与事实一致。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"综合练习与评分依据"}</PageTitle>
<BookParagraph>{"扩展两门课程、两天数据，加入一个仅提交用户与一个跨课程用户，输出日报及全站去重日活。验收：重复重跑结果完全一致，课程人数相加与全站去重的区别被解释，迟到事件修正正确日期，坏记录有原因，运营导出不含身份字段。参考思路：先写人工集合，再按日期课程分组；提交README说明运行命令、预期输出、限制与恢复步骤。"}</BookParagraph>
<BookParagraph>{"评分关注结果为何可信、失败如何恢复、权限如何受控。完整来源和清晰假设比工具数量更重要，未验证项目应明确列为剩余工作。"}</BookParagraph>
<BookList items={[<a key="https://spark.apache.org/docs/latest/sql-getting-started.html" href="https://spark.apache.org/docs/latest/sql-getting-started.html" target="_blank" rel="noreferrer" className="underline">Spark SQL入门</a>,<a key="https://spark.apache.org/docs/latest/monitoring.html" href="https://spark.apache.org/docs/latest/monitoring.html" target="_blank" rel="noreferrer" className="underline">Spark监控与作业诊断</a>]} />
</div>) }
]

export default function ProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
