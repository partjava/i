'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '可视化与BI',
  chapterNumber: 6,
  totalChapters: 8,
  subjectHref: '/study/se/bigdata',
  prevChapter: { label: '数据分析与挖掘', href: '/study/se/bigdata/analysis' },
  nextChapter: { label: '大数据安全与运维', href: '/study/se/bigdata/security' },
  theme: THEMES.software,
}

const SPREADS = [
{ label: "问题与概念", left: (<div className="space-y-4">
<PageTitle>{"看板首先服务一个决策"}</PageTitle>
<BookParagraph>{"学习平台运营每天需要判断哪门课程需要检查内容，因此看板应同时展示课程曝光、有效播放人数、练习提交转化与数据更新时间。只有播放总量会把热门课程排到前面，却无法说明转化问题。每张图注明统计范围、时区、过滤条件与更新时间，读者才能区分真实下降、迟到修正和接入中断。"}</BookParagraph>
<BookParagraph>{"明确使用者下一步会采取什么行动，例如调整课程入口或核查数据断流。若没有对应决策，即使信息很多也可能只是装饰性大屏。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"维度、粒度与可加性"}</PageTitle>
<BookParagraph>{"维度是观察角度，如日期、课程和客户端；粒度决定每行的唯一含义。播放次数通常可跨课程相加，去重用户数不能，因为同一个学生可能学习多门课程。比例也不能简单取平均：一门课程一人中一人提交，另一门九人中无人提交，总体转化是十分之一，而不是两个百分比的平均值。"}</BookParagraph>
<BookParagraph>{"增加一个维度后分组更细，原来可求和的指标也要确认是否重复。钻取路径必须保持单位、时间范围和人群筛选的一致含义。"}</BookParagraph>
</div>) },
{ label: "数据与可复现实验", left: (<div className="space-y-4">
<PageTitle>{"图表由问题决定"}</PageTitle>
<BookParagraph>{"按天观察活跃趋势适合折线图，比较课程规模适合排序条形图，查看学习时长分布适合直方图或箱线图，展示两变量关系可用散点图。漏斗应有明确的先后行为和同一人群约束。不要为了好看把互斥条件不成立的类别画成占比饼图，也不要用双轴缩放制造两个指标高度相关的视觉印象。"}</BookParagraph>
<BookParagraph>{"图表轴标注单位与完整时间范围，颜色含义保持固定。用相同尺度比较课程，避免自动缩放让很小差异看起来像显著变化。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"可复现：正确计算总体比例"}</PageTitle>
<BookParagraph>{"以下Python 3示例没有外部依赖，两门课程的样本量分别为1和9。预期打印10.0%，随后打印错误的简单平均50.0%。对业务展示时应明确百分比的分子和分母；若用户跨课程重复，此处汇总只能解释为课程人次口径，全平台去重用户转化必须回到用户集合重新计算。"}</BookParagraph>
<BookParagraph>{"同时展示分子分母便于人工检查权重。若读者要比较课程而非总体，应保留各组比例，不用一个全站数字掩盖差异。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"courses = [(1, 1), (9, 0)]  # eligible, submitted\neligible = sum(n for n, _ in courses)\nsubmitted = sum(k for _, k in courses)\nprint(f'{submitted / eligible:.1%}')\nwrong = sum(k / n for n, k in courses) / len(courses)\nprint(f'{wrong:.1%}')"} />
</div>) },
{ label: "工程方法与边界", left: (<div className="space-y-4">
<PageTitle>{"过滤器也是口径的一部分"}</PageTitle>
<BookParagraph>{"用户选择课程后，分子和分母都必须应用同样的课程条件；比较本周和上周要保证天数相同，避免把未结束的本周与完整上周比较。新增课程应与同龄课程比较，不能直接拿首日转化和成熟课程累计值排名。保存筛选条件与查询版本，才能复现某次截图中的结果。"}</BookParagraph>
<BookParagraph>{"过滤器变动后应更新标题或口径摘要，导出文件也携带筛选条件。缓存键必须覆盖这些条件和授权范围，避免返回不匹配结果。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"空值、零值与暂定值"}</PageTitle>
<BookParagraph>{"没有接收到数据应显示缺失或延迟，不能一律补零；确实收齐数据且无人播放才能显示零。昨天的数据仍处于迟到补算窗口时应标记暂定。比例分母为零显示“无样本”，不要显示百分之零暗示表现差。样本量很小时同时展示人数，防止一名用户变化被解读为显著趋势。"}</BookParagraph>
<BookParagraph>{"接口应明确区分无数据、真实零与尚未完成计算。前端只靠空数组猜状态，会把断流或失败隐藏成正常业务下降。"}</BookParagraph>
</div>) },
{ label: "从决策反推视觉编码",
left: (<div className="space-y-4">
<PageTitle>{"从决策反推视觉编码"}</PageTitle>
<BookParagraph>{"例一：运营想定位哪个环节流失，应该显示阶段人数和相邻转化，而不是一个全站播放总量。想看时间变化，适合统一间隔的折线；想比较课程，使用按同一指标排序的条形图；想看两变量关系，可用散点并显示样本大小。"}</BookParagraph>
<BookParagraph>{"图表选择要考虑数据结构和读者任务。双纵轴可能让无关趋势看似一致，截断条形图纵轴会夸大差距，过多颜色难以区分。先用一张简明图说明核心关系，再允许读者查看明细与口径，而不是把所有字段堆进同一屏。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"层级汇总中的不可加指标"}</PageTitle>
<BookParagraph>{"课程甲玩家为u1、u2，乙为u2、u3，课程人数之和为四，全站人数却为三。看板从课程钻到全站时，需要重新计算去重，不能把明细卡片相加。若只剩汇总人数就无法推断交集，数据模型必须在设计阶段支持目标查询。"}</BookParagraph>
<BookParagraph>{"下表比较总次数、人数、平均时长与转化率。可加性决定缓存和汇总表能保留哪些信息，也决定前端能否自行计算。把复杂指标定义集中在语义层或受控接口，避免每张图各写一份口径，随着迭代逐渐偏离。"}</BookParagraph>
<div className="overflow-x-auto"><table className="min-w-[480px] w-full text-sm border-collapse"><thead><tr><th className="border border-paper-300/80 p-2 text-left">指标</th><th className="border border-paper-300/80 p-2 text-left">汇总所需</th><th className="border border-paper-300/80 p-2 text-left">展示提示</th></tr></thead><tbody><tr><td className="border border-paper-300/80 p-2">总播放次数</td><td className="border border-paper-300/80 p-2">不重叠事件数</td><td className="border border-paper-300/80 p-2">定义有效播放</td></tr><tr><td className="border border-paper-300/80 p-2">去重用户</td><td className="border border-paper-300/80 p-2">跨组去重状态</td><td className="border border-paper-300/80 p-2">不直接相加</td></tr><tr><td className="border border-paper-300/80 p-2">转化率</td><td className="border border-paper-300/80 p-2">分子、分母与范围</td><td className="border border-paper-300/80 p-2">显示样本量和空分母</td></tr></tbody></table></div>
</div>),
},
{ label: "总转化率必须保留权重",
left: (<div className="space-y-4">
<PageTitle>{"总转化率必须保留权重"}</PageTitle>
<BookParagraph>{"例二：课程甲一百播放用户、十人转化，乙十人播放、九人转化。两课比例分别百分之十与百分之九十，直接平均得百分之五十；按共同口径汇总分子分母后为十九除一百一十，约百分之十七点三。"}</BookParagraph>
<BookParagraph>{"Python 3输出17.3%，表示按人数权重的总体比例。只有分母相同等特定条件下，比例平均才可能等价。看板导出也应提供分子分母和时间范围，避免使用者拿显示百分数再次平均；但跨课程全站用户还涉及去重，不能机械相加分母。"}</BookParagraph>
<BookCode language="python" code={"groups = [(10, 100), (9, 10)]\nconverted = sum(x for x, _ in groups)\nplayers = sum(n for _, n in groups)\nprint(f\"{converted / players:.1%}\")"} />
</div>),
right: (<div className="space-y-4">
<PageTitle>{"Top N不能偷偷改变分母"}</PageTitle>
<BookParagraph>{"例三：十门课程总播放一千次，只显示前三门合计六百次。若图题是“全站课程播放占比”，分母应是一千，并显示其余四百为其他；若分母改为六百，必须标明“前三课程内部占比”。两种图都可用，但回答的问题不同。"}</BookParagraph>
<BookParagraph>{"过滤后分母是否变化同样需要定义。例如日期筛选通常同时影响分子分母，用户层级筛选可能改变人群。图表标题、悬浮信息与导出应保持一致，防止同一数值在不同交互状态下含义改变却没有提示。"}</BookParagraph>
</div>),
},
{ label: "空白、零和未定稿的显示",
left: (<div className="space-y-4">
<PageTitle>{"空白、零和未定稿的显示"}</PageTitle>
<BookParagraph>{"没有任何播放和数据尚未到达都可能让汇总表没有行，但不能显示成同一个零。查询接口应返回状态与新鲜度：完整且零事件可以显示0，输入未齐显示待更新，部分到达显示暂定值并标明截止时间。"}</BookParagraph>
<BookParagraph>{"下面Python 3根据状态选择展示，输出0、待更新、12（暂定）。仅把空值转零会使断流看起来像业务突然没有用户。看板还要处理时区、自然日边界与数据延迟，让用户能看出当前数字是否适合用于比较或正式报告。"}</BookParagraph>
<BookCode language="python" code={"def display(state, value=None):\n    if state == \"missing\":\n        return \"待更新\"\n    if state == \"provisional\":\n        return f\"{value}（暂定）\"\n    return str(value)\nfor state, value in [(\"complete\", 0), (\"missing\", None), (\"provisional\", 12)]:\n    print(display(state, value))"} />
</div>),
right: (<div className="space-y-4">
<PageTitle>{"舍入规则也会改变理解"}</PageTitle>
<BookParagraph>{"比例展示可保留一位小数，但计算应尽量使用原始分子分母，避免层层舍入。三组各显示百分之三十三点三，加起来只有百分之九十九点九，不应为了凑一百而悄悄改变某组实际值；必要时说明舍入误差。"}</BookParagraph>
<BookParagraph>{"极小样本中一人变化产生巨大百分比时，应同时显示人数，避免百分比看起来像稳定趋势。货币等精度敏感数据需采用合适数值类型和统一舍入规则，图表负责表达这些规则，而不是把数值格式化当作纯装饰问题。"}</BookParagraph>
</div>),
},
{ label: "查询性能先减少无用工作",
left: (<div className="space-y-4">
<PageTitle>{"查询性能先减少无用工作"}</PageTitle>
<BookParagraph>{"若看板只查某月与某课程，后端应尽可能下推日期、课程过滤并选择需要字段，避免取回全年全站明细到浏览器再聚合。汇总表可以提高速度，但需与明细对账，并记录适用粒度、刷新时间和口径版本。"}</BookParagraph>
<BookParagraph>{"案例：缓存没有把用户机构范围放进键，可能把上一位用户的结果返回给另一机构，性能优化由此变成数据泄漏。缓存键应包含影响结果与授权的必要上下文，失效策略联系数据定稿和更正流程，不能仅按固定时间盲目复用。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"用三个问题验收看板"}</PageTitle>
<BookParagraph>{"让没有参与实现的人回答：这个数统计谁、截至什么时候、为什么与昨天不同。若必须由作者口头解释，标题、口径或状态信息仍不充分。再让测试者切换日期和课程，核对每张图是否使用相同的筛选语义。"}</BookParagraph>
<BookParagraph>{"用人工样本检查重复用户、零分母、缺失分区、跨时区边界和迟到补数，确认图上变化与底层数据一致。可读性和可信度需要一起验收：颜色清楚但分母错误仍是错误报表，数字正确但隐去暂定状态也可能导致错误决策。"}</BookParagraph>
</div>),
},
{ label: "排错、练习与参考", left: (<div className="space-y-4">
<PageTitle>{"性能与一致性检查"}</PageTitle>
<BookParagraph>{"大屏不宜每次刷新都扫描全年原始事件，可读取按课程日汇总的服务表；但全站去重人数不能从各课程人数直接累加。缓存需要记录刷新时间和失效规则。核对指标时固定日期、过滤器和数据版本，用少量明细手算；若图上数字与SQL不同，先检查筛选、时区和缓存，再怀疑图表组件。"}</BookParagraph>
<BookParagraph>{"同一看板多图最好使用一致的发布版本，避免一张图读新版而另一张仍读旧版。性能测试同时核对版本、新鲜度与权限。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"练习：设计可读且可信的看板"}</PageTitle>
<BookParagraph>{"为运营设计三张图：近七天活跃趋势、课程提交转化排序、学习时长分布，写明选择理由。验收：图上有单位和时间范围，转化图带分母，小样本有提示，缺失数据不伪装成零；给出一个跨课程重复用户的例子，证明课程人数相加不等于全站人数。参考思路：为每张图附一条指标定义和一组可手算数据。"}</BookParagraph>
<BookParagraph>{"让测试者根据图题复述分母、时区和截止时间，再用金样本核对筛选结果；能够独立理解与得到正确结果都属于验收。"}</BookParagraph>
<BookList items={[<a key="https://www.postgresql.org/docs/current/tutorial-agg.html" href="https://www.postgresql.org/docs/current/tutorial-agg.html" target="_blank" rel="noreferrer" className="underline">PostgreSQL聚合与分组</a>]} />
</div>) }
]

export default function BiPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
