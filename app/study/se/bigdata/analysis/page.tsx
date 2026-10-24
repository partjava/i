'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '数据分析与挖掘',
  chapterNumber: 5,
  totalChapters: 8,
  subjectHref: '/study/se/bigdata',
  prevChapter: { label: '分布式存储与计算', href: '/study/se/bigdata/distributed' },
  nextChapter: { label: '可视化与BI', href: '/study/se/bigdata/bi' },
  theme: THEMES.software,
}

const SPREADS = [
{ label: "问题与概念", left: (<div className="space-y-4">
<PageTitle>{"先确定一行代表什么"}</PageTitle>
<BookParagraph>{"学习事件表是一行一次行为，课程维表是一行一门课程，课程日报是一行一天一门课程。把课程表直接连接到一对多的标签表会复制事实行，导致播放量翻倍。分析前写出每张表的粒度、主键和连接关系；聚合后检查总数与明细一致。指标名称相同但过滤条件不同，也不能直接比较。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"活跃、转化与留存的口径"}</PageTitle>
<BookParagraph>{"日活是统计日期内发生有效行为的去重用户数；提交转化率可定义为当天播放者中当天提交练习的人数占比，分子必须是分母集合的子集。次日留存则比较某日首次学习用户与下一日返回者。它们的时间窗和人群不同，不能把总提交次数除以总播放次数后称为“用户转化率”。"}</BookParagraph>
</div>) },
{ label: "数据与可复现实验", left: (<div className="space-y-4">
<PageTitle>{"可复现：课程人数与次数"}</PageTitle>
<BookParagraph>{"下面使用Python 3自带SQLite，不依赖Spark或数据库服务。输入三条播放，c1由同一用户播放两次，c2由另一用户播放一次。查询显式区分事件数和去重人数，预期输出c1的2与1、c2的1与1。这里假设上游已按event_id去重，且所有输入都属于同一统计日。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"import sqlite3\ndb = sqlite3.connect(':memory:')\ndb.execute('CREATE TABLE events(course_id TEXT, user_id TEXT)')\ndb.executemany('INSERT INTO events VALUES (?, ?)',\n               [('c1', 'u1'), ('c1', 'u1'), ('c2', 'u2')])\nquery = '''SELECT course_id, count(*), count(DISTINCT user_id)\n           FROM events GROUP BY course_id ORDER BY course_id'''\nprint(db.execute(query).fetchall())"} />
</div>), right: (<div className="space-y-4">
<PageTitle>{"探索分析先检查分布"}</PageTitle>
<BookParagraph>{"均值学习时长升高可能来自少数超长挂机，而不是多数用户学得更久。先查看空值、重复、零值、分位数及按客户端拆分的分布，再解释趋势。异常值不能全部直接删除：六小时播放可能是后台挂机，也可能是合理的长课程，应结合事件序列和业务规则判定，并保留清洗前后对照结果。"}</BookParagraph>
</div>) },
{ label: "工程方法与边界", left: (<div className="space-y-4">
<PageTitle>{"预测问题与特征时点"}</PageTitle>
<BookParagraph>{"若要预测用户未来七天是否停止学习，先定义预测时点T、观察窗口和标签窗口。特征只能来自T之前，例如过去七天学习天数；标签来自T之后。把未来是否提交作业、最终课程完成率放入特征会产生数据泄露，离线成绩看似极好，上线却无法取得这些信息。每个特征都应记录可用时间而非只有事件时间。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"训练、验证与测试分割"}</PageTitle>
<BookParagraph>{"时间相关任务先用较早日期训练、较晚日期验证，最后保留未参与调参的测试期。同一用户多条记录要考虑分组隔离，避免身份特征泄露；是否允许训练期见过用户，应匹配上线场景。缺失值填补、标准化和类别词典只在训练集拟合，再应用到验证和测试，不能先对全量数据拟合后再切分。"}</BookParagraph>
</div>) },
{ label: "排错、练习与参考", left: (<div className="space-y-4">
<PageTitle>{"模型评估不只看准确率"}</PageTitle>
<BookParagraph>{"若只有百分之五用户流失，永远预测不流失也有百分之九十五准确率，却找不到任何需要帮助的人。应同时报告混淆矩阵、精确率、召回率，并结合干预成本选择阈值。先比较简单基线，再尝试模型。相关关系不能证明因果：高练习量用户完成率更高，可能源于学习动机，而非练习本身造成提升。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"练习：完成可审查的分析单"}</PageTitle>
<BookParagraph>{"给出两门课程各自播放用户集合和提交用户集合，计算集合交集定义的提交转化率，分母为零时标记无样本。再列出三项T前特征、两项泄露特征与时间切分日期。验收：人数不大于次数，分子不大于分母，所有特征有可用时点，测试期未参与阈值选择。参考思路：先手算小集合，再写SQL核对，报告口径与局限。"}</BookParagraph>
<BookList items={[<a key="https://www.postgresql.org/docs/current/tutorial-agg.html" href="https://www.postgresql.org/docs/current/tutorial-agg.html" target="_blank" rel="noreferrer" className="underline">PostgreSQL聚合函数</a>,<a key="https://spark.apache.org/docs/latest/ml-pipeline.html" href="https://spark.apache.org/docs/latest/ml-pipeline.html" target="_blank" rel="noreferrer" className="underline">Spark ML Pipeline：拟合与转换</a>]} />
</div>) }
]

export default function AnalysisPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
