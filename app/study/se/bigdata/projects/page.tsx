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
</div>), right: (<div className="space-y-4">
<PageTitle>{"确定验收用例再编写流程"}</PageTitle>
<BookParagraph>{"样本至少包含正常播放、同编号重试、无用户记录、跨日迟到，以及同用户学习两门课程。规定日报按UTC日期统计，匿名记录隔离，重试不重复计数；提交转化仅统计当日播放者中的当日提交者。列出人工预期值，保证程序每次改动都能检查语义，而不只是确认进程没有报错。"}</BookParagraph>
</div>) },
{ label: "数据与可复现实验", left: (<div className="space-y-4">
<PageTitle>{"本地闭环：构造并清洗事件"}</PageTitle>
<BookParagraph>{"本项目仅依赖Python 3标准库。将本页与右页代码顺序保存在同一个project.py执行，不需要文件、数据库或Spark。这里所有日期均代表UTC事件日期，已省略完整时间解析；真实接入须保留带时区时间并验证schema。输入中的e1是重复投递，e4是没有身份的坏记录，清洗后保留三条有效事件。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"rows = [\n ('e1','2026-10-01','c1','u1','play'),\n ('e1','2026-10-01','c1','u1','play'),\n ('e2','2026-10-01','c1','u2','play'),\n ('e3','2026-10-01','c1','u1','submit'),\n ('e4','2026-10-01','c1',None,'play'),\n]\nvalid = {}\nfor row in rows:\n    if row[3] is not None:\n        key = row[0]\n        assert key not in valid or valid[key] == row\n        valid[key] = row"} />
</div>), right: (<div className="space-y-4">
<PageTitle>{"汇总与人工预期对照"}</PageTitle>
<BookParagraph>{"继续执行下面代码，预期输出“2 2 50.0%”。分子用播放集合与提交集合的交集，防止只提交而没有播放的用户扩大转化率。示例只统计一个日期和课程；扩展时以日期、课程作为分组键，为每组分别维护集合，再用相同人工样本验收，不能把所有课程混成一个分母。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"group = [r for r in valid.values()\n         if r[1:3] == ('2026-10-01', 'c1')]\nplays = [r for r in group if r[4] == 'play']\nplayers = {r[3] for r in plays}\nsubmitters = {r[3] for r in group if r[4] == 'submit'}\nconverted = players & submitters\nrate = len(converted) / len(players) if players else None\nassert len(plays) == 2 and len(players) == 2\nassert rate == 0.5\nprint(len(plays), len(players), f'{rate:.1%}')"} />
</div>) },
{ label: "工程方法与边界", left: (<div className="space-y-4">
<PageTitle>{"从脚本扩展为可恢复作业"}</PageTitle>
<BookParagraph>{"把输入拆成带批次号的只读文件，输出按日期与课程唯一发布。每次保存输入数量、坏记录数、重复数和有效数，并记录代码版本。新到一条前一天事件时，重新计算受影响日期，而非在旧用户数上加一，因为用户可能已经计入。发布前检查行数、唯一键和守恒量，失败时保留旧版本供报表继续使用。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"扩展到Spark前的证据"}</PageTitle>
<BookParagraph>{"当真实数据使单机处理超过窗口，再迁移到显式schema的DataFrame、分区过滤和分组聚合。Spark需要兼容的Python、Java和PySpark运行环境，本项目代码没有此依赖，也不是可直接替换为Spark的模板。迁移时保持同一份小样本与预期值，比较分布式结果，再测shuffle、热点键及输出文件数，避免把规模扩展误当业务正确。"}</BookParagraph>
</div>) },
{ label: "排错、练习与参考", left: (<div className="space-y-4">
<PageTitle>{"监控与发布演练"}</PageTitle>
<BookParagraph>{"为日报定义截止时间，例如每日UTC两点前发布前一天暂定结果，三天后定稿；这是练习约定而非通用标准。监控最后处理的事件时间、坏记录比例、任务耗时和发布版本。演练输出写到一半失败、同批次重放和迟到补算，验证旧结果仍可读取、恢复后不重复累计，并在看板标记修订时间。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"综合练习与评分依据"}</PageTitle>
<BookParagraph>{"扩展两门课程、两天数据，加入一个仅提交用户与一个跨课程用户，输出日报及全站去重日活。验收：重复重跑结果完全一致，课程人数相加与全站去重的区别被解释，迟到事件修正正确日期，坏记录有原因，运营导出不含身份字段。参考思路：先写人工集合，再按日期课程分组；提交README说明运行命令、预期输出、限制与恢复步骤。"}</BookParagraph>
<BookList items={[<a key="https://spark.apache.org/docs/latest/sql-getting-started.html" href="https://spark.apache.org/docs/latest/sql-getting-started.html" target="_blank" rel="noreferrer" className="underline">Spark SQL入门</a>,<a key="https://spark.apache.org/docs/latest/monitoring.html" href="https://spark.apache.org/docs/latest/monitoring.html" target="_blank" rel="noreferrer" className="underline">Spark监控与作业诊断</a>]} />
</div>) }
]

export default function ProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
