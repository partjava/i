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
<BookParagraph>{"粒度不明确会造成连接倍增，例如用户表接多条播放后再平均年龄，会给活跃用户更高权重。分析前先确定统计单位和目标人群。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"活跃、转化与留存的口径"}</PageTitle>
<BookParagraph>{"日活是统计日期内发生有效行为的去重用户数；提交转化率可定义为当天播放者中当天提交练习的人数占比，分子必须是分母集合的子集。次日留存则比较某日首次学习用户与下一日返回者。它们的时间窗和人群不同，不能把总提交次数除以总播放次数后称为“用户转化率”。"}</BookParagraph>
<BookParagraph>{"“转化”还需规定先后顺序和观察窗口。只统计同一天既播放又提交的人，与统计播放后七天内提交的人，是两个不同指标。"}</BookParagraph>
</div>) },
{ label: "数据与可复现实验", left: (<div className="space-y-4">
<PageTitle>{"可复现：课程人数与次数"}</PageTitle>
<BookParagraph>{"下面使用Python 3自带SQLite，不依赖Spark或数据库服务。输入三条播放，c1由同一用户播放两次，c2由另一用户播放一次。查询显式区分事件数和去重人数，预期输出c1的2与1、c2的1与1。这里假设上游已按event_id去重，且所有输入都属于同一统计日。"}</BookParagraph>
<BookParagraph>{"输出时同时保留分组键、样本量与时间范围。人数变化后再查看事件总数，可区分用户减少还是同一用户行为频率改变。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"import sqlite3\ndb = sqlite3.connect(':memory:')\ndb.execute('CREATE TABLE events(course_id TEXT, user_id TEXT)')\ndb.executemany('INSERT INTO events VALUES (?, ?)',\n               [('c1', 'u1'), ('c1', 'u1'), ('c2', 'u2')])\nquery = '''SELECT course_id, count(*), count(DISTINCT user_id)\n           FROM events GROUP BY course_id ORDER BY course_id'''\nprint(db.execute(query).fetchall())"} />
</div>), right: (<div className="space-y-4">
<PageTitle>{"探索分析先检查分布"}</PageTitle>
<BookParagraph>{"均值学习时长升高可能来自少数超长挂机，而不是多数用户学得更久。先查看空值、重复、零值、分位数及按客户端拆分的分布，再解释趋势。异常值不能全部直接删除：六小时播放可能是后台挂机，也可能是合理的长课程，应结合事件序列和业务规则判定，并保留清洗前后对照结果。"}</BookParagraph>
<BookParagraph>{"异常值先区分真实长尾和采集错误，再决定保留或修正。清洗规则应能解释，不能依据哪种处理能得到更漂亮结论来选择。"}</BookParagraph>
</div>) },
{ label: "工程方法与边界", left: (<div className="space-y-4">
<PageTitle>{"预测问题与特征时点"}</PageTitle>
<BookParagraph>{"若要预测用户未来七天是否停止学习，先定义预测时点T、观察窗口和标签窗口。特征只能来自T之前，例如过去七天学习天数；标签来自T之后。把未来是否提交作业、最终课程完成率放入特征会产生数据泄露，离线成绩看似极好，上线却无法取得这些信息。每个特征都应记录可用时间而非只有事件时间。"}</BookParagraph>
<BookParagraph>{"先声明预测在何时做、标签在何时可观察，再检查每个字段当时是否可用。离线表中存在一个字段，不代表上线预测时也能取得。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"训练、验证与测试分割"}</PageTitle>
<BookParagraph>{"时间相关任务先用较早日期训练、较晚日期验证，最后保留未参与调参的测试期。同一用户多条记录要考虑分组隔离，避免身份特征泄露；是否允许训练期见过用户，应匹配上线场景。缺失值填补、标准化和类别词典只在训练集拟合，再应用到验证和测试，不能先对全量数据拟合后再切分。"}</BookParagraph>
<BookParagraph>{"按时间或用户划分后，检查各集合的分布差异。训练集拟合的预处理参数再应用到其他集合，避免全量拟合造成信息泄漏。"}</BookParagraph>
</div>) },
{ label: "分布先于平均值",
left: (<div className="space-y-4">
<PageTitle>{"分布先于平均值"}</PageTitle>
<BookParagraph>{"例一：五名用户学习时长为1、2、3、4、190分钟，平均40分钟，中位数3分钟。平均值被极端长时长拉高，不能描述典型用户。先看样本量、分位数、缺失比例与异常来源，再决定用何种摘要回答问题。"}</BookParagraph>
<BookParagraph>{"长时长可能是真实深度学习，也可能是客户端没有上报暂停。不能为了报表好看直接删除，应制定可解释规则并保留原始值。按客户端版本或课程分组检查异常，比只在全站套一个阈值更容易找到采集缺陷。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"缺失与零有不同含义"}</PageTitle>
<BookParagraph>{"播放时长为零可能表示打开后立即退出，缺失则可能根本没采集到。将缺失统一填零会降低平均时长，还可能使某个客户端版本看似更不活跃。清洗时保留缺失标记，并说明哪些统计排除缺失、哪些以已知事实为分母。"}</BookParagraph>
<BookParagraph>{"下面Python 3分别计算已观测均值与错误填零均值，输出15.0和10.0。这个小例说明预处理决定结论。下表对比次数、去重人数、均值和比例的所需状态；分析单要写出每个分母，并标注统计中的未知量。"}</BookParagraph>
<div className="overflow-x-auto"><table className="min-w-[480px] w-full text-sm border-collapse"><thead><tr><th className="border border-paper-300/80 p-2 text-left">指标</th><th className="border border-paper-300/80 p-2 text-left">必备信息</th><th className="border border-paper-300/80 p-2 text-left">常见错误</th></tr></thead><tbody><tr><td className="border border-paper-300/80 p-2">次数</td><td className="border border-paper-300/80 p-2">事件定义与去重键</td><td className="border border-paper-300/80 p-2">重试重复计数</td></tr><tr><td className="border border-paper-300/80 p-2">均值</td><td className="border border-paper-300/80 p-2">总量与观测数</td><td className="border border-paper-300/80 p-2">缺失直接填零</td></tr><tr><td className="border border-paper-300/80 p-2">转化率</td><td className="border border-paper-300/80 p-2">同一人群分子分母</td><td className="border border-paper-300/80 p-2">总体比例误解为因果</td></tr></tbody></table></div>
<BookCode language="python" code={"values = [10, None, 20]\nknown = [x for x in values if x is not None]\nprint(sum(known) / len(known))\nprint(sum(x if x is not None else 0 for x in values) / len(values))"} />
</div>),
},
{ label: "转化比较要检查人群结构",
left: (<div className="space-y-4">
<PageTitle>{"转化比较要检查人群结构"}</PageTitle>
<BookParagraph>{"例二：课程甲新用户九十人、转化九人，老用户十人、转化八人；乙新用户十人、转化零人，老用户九十人、转化六十三人。甲在新老两组都更高，总体却只有百分之十七，低于乙的百分之六十三，因为两课人群构成不同。"}</BookParagraph>
<BookParagraph>{"这类结构差异说明总体比例不能直接解释课程效果。先按关键混杂因素分层，必要时用同一权重标准化，再说明剩余差异。即使观察到相关，也不能直接声称课程改动造成转化提升；因果判断需要更可靠的实验或识别设计。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"留存先固定入组日与观察窗"}</PageTitle>
<BookParagraph>{"例三：十月一日首次播放的四名用户，十月二日有两名再次播放，则这批用户次日留存为百分之五十；十月二日新来的用户不进入该分母。若当天数据尚未完整，次日留存应标记未成熟，而不是算作零。"}</BookParagraph>
<BookParagraph>{"代码用Python 3内存集合输出2、4和50.0%，只演示已完整观察的窗口。真实流程还需固定首次行为的定义、时区与去重规则。将所有日期活跃用户混在一起算“留存”，会把新增流量与用户回访混淆，难以指导产品改进。"}</BookParagraph>
<BookCode language="python" code={"cohort = {\"u1\", \"u2\", \"u3\", \"u4\"}\nnext_day = {\"u1\", \"u3\", \"u5\"}\nretained = cohort & next_day\nprint(len(retained), len(cohort), f\"{len(retained) / len(cohort):.1%}\")"} />
</div>),
},
{ label: "预测特征必须早于标签",
left: (<div className="space-y-4">
<PageTitle>{"预测特征必须早于标签"}</PageTitle>
<BookParagraph>{"设任务是在用户本周开始时预测本周是否流失，特征只能来自预测时刻之前。把本周最后一次登录时间或事后退款状态放进去，会泄漏未来信息，离线分数很高但上线无法获得同样输入。"}</BookParagraph>
<BookParagraph>{"先画时间线：特征截止时点、预测时点、标签观察窗与数据可用时间。迟到数据也会造成隐性泄漏，例如离线修正记录在当时并未可用。训练与验证应模拟真实可获得信息，记录特征产生逻辑与版本，避免仅检查字段名称就判断没有泄漏。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"类别不平衡下的评估"}</PageTitle>
<BookParagraph>{"若一千用户中只有十人流失，模型永远预测“不流失”也有百分之九十九准确率，却完全没有发现目标用户。对业务关注的正类应同时看查准率、召回率和误报成本，必要时比较不同阈值下的取舍。"}</BookParagraph>
<BookParagraph>{"教学混淆计数为真阳性八、假阳性十二、假阴性二，查准率百分之四十、召回率百分之八十。Python 3输出0.4和0.8。对运营干预而言，误报会浪费触达资源，漏报会错失干预机会，因此阈值应联系成本而不只追求单一分数。"}</BookParagraph>
<BookCode language="python" code={"tp, fp, fn = 8, 12, 2\nprecision = tp / (tp + fp)\nrecall = tp / (tp + fn)\nprint(precision, recall)"} />
</div>),
},
{ label: "训练划分如何匹配上线",
left: (<div className="space-y-4">
<PageTitle>{"训练划分如何匹配上线"}</PageTitle>
<BookParagraph>{"随机拆分事件可能让同一用户同时出现在训练和测试，模型利用用户特征记忆而获得偏高分数。若上线面对未来时间，应采用时间顺序验证；若目标是新用户，需按用户分组划分，防止同一主体跨集合泄漏。"}</BookParagraph>
<BookParagraph>{"划分后还要检查类别比例、课程覆盖和特征分布。预处理参数如均值、标准化尺度或类别字典，应只在训练集拟合，再应用到验证与测试；提前用全量数据计算参数，也会把未来信息带进训练过程。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"结果报告承认不确定性"}</PageTitle>
<BookParagraph>{"样本只有十人时，一人变化就使比例改变十个百分点，不能用小数点后两位制造精确感。报告样本量、观察窗口、缺失处理、分层条件与不确定性，区分探索发现和已经验证的稳定结论。"}</BookParagraph>
<BookParagraph>{"对分析或模型提出可执行下一步：补采哪个字段、扩大哪类样本、设计什么对照、验证哪项假设。失败或无显著差异也有价值，只要过程可审查。不要为了得到漂亮结论反复更换分母、删除异常或挑选最有利日期。"}</BookParagraph>
</div>),
},
{ label: "排错、练习与参考", left: (<div className="space-y-4">
<PageTitle>{"模型评估不只看准确率"}</PageTitle>
<BookParagraph>{"若只有百分之五用户流失，永远预测不流失也有百分之九十五准确率，却找不到任何需要帮助的人。应同时报告混淆矩阵、精确率、召回率，并结合干预成本选择阈值。先比较简单基线，再尝试模型。相关关系不能证明因果：高练习量用户完成率更高，可能源于学习动机，而非练习本身造成提升。"}</BookParagraph>
<BookParagraph>{"阈值变化会同时改变误报和漏报，评估报告应连接到干预成本。样本量小或类别不平衡时，单个准确率尤其容易误导。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"练习：完成可审查的分析单"}</PageTitle>
<BookParagraph>{"给出两门课程各自播放用户集合和提交用户集合，计算集合交集定义的提交转化率，分母为零时标记无样本。再列出三项T前特征、两项泄露特征与时间切分日期。验收：人数不大于次数，分子不大于分母，所有特征有可用时点，测试期未参与阈值选择。参考思路：先手算小集合，再写SQL核对，报告口径与局限。"}</BookParagraph>
<BookParagraph>{"报告中应区分数据事实、计算定义与推测原因。把每个结论连接到可复现查询或样本，并列出仍需要实验验证的假设。"}</BookParagraph>
<BookList items={[<a key="https://www.postgresql.org/docs/current/tutorial-agg.html" href="https://www.postgresql.org/docs/current/tutorial-agg.html" target="_blank" rel="noreferrer" className="underline">PostgreSQL聚合函数</a>,<a key="https://spark.apache.org/docs/latest/ml-pipeline.html" href="https://spark.apache.org/docs/latest/ml-pipeline.html" target="_blank" rel="noreferrer" className="underline">Spark ML Pipeline：拟合与转换</a>]} />
</div>) }
]

export default function AnalysisPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
