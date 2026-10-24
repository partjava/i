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
</div>), right: (<div className="space-y-4">
<PageTitle>{"维度、粒度与可加性"}</PageTitle>
<BookParagraph>{"维度是观察角度，如日期、课程和客户端；粒度决定每行的唯一含义。播放次数通常可跨课程相加，去重用户数不能，因为同一个学生可能学习多门课程。比例也不能简单取平均：一门课程一人中一人提交，另一门九人中无人提交，总体转化是十分之一，而不是两个百分比的平均值。"}</BookParagraph>
</div>) },
{ label: "数据与可复现实验", left: (<div className="space-y-4">
<PageTitle>{"图表由问题决定"}</PageTitle>
<BookParagraph>{"按天观察活跃趋势适合折线图，比较课程规模适合排序条形图，查看学习时长分布适合直方图或箱线图，展示两变量关系可用散点图。漏斗应有明确的先后行为和同一人群约束。不要为了好看把互斥条件不成立的类别画成占比饼图，也不要用双轴缩放制造两个指标高度相关的视觉印象。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"可复现：正确计算总体比例"}</PageTitle>
<BookParagraph>{"以下Python 3示例没有外部依赖，两门课程的样本量分别为1和9。预期打印10.0%，随后打印错误的简单平均50.0%。对业务展示时应明确百分比的分子和分母；若用户跨课程重复，此处汇总只能解释为课程人次口径，全平台去重用户转化必须回到用户集合重新计算。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"courses = [(1, 1), (9, 0)]  # eligible, submitted\neligible = sum(n for n, _ in courses)\nsubmitted = sum(k for _, k in courses)\nprint(f'{submitted / eligible:.1%}')\nwrong = sum(k / n for n, k in courses) / len(courses)\nprint(f'{wrong:.1%}')"} />
</div>) },
{ label: "工程方法与边界", left: (<div className="space-y-4">
<PageTitle>{"过滤器也是口径的一部分"}</PageTitle>
<BookParagraph>{"用户选择课程后，分子和分母都必须应用同样的课程条件；比较本周和上周要保证天数相同，避免把未结束的本周与完整上周比较。新增课程应与同龄课程比较，不能直接拿首日转化和成熟课程累计值排名。保存筛选条件与查询版本，才能复现某次截图中的结果。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"空值、零值与暂定值"}</PageTitle>
<BookParagraph>{"没有接收到数据应显示缺失或延迟，不能一律补零；确实收齐数据且无人播放才能显示零。昨天的数据仍处于迟到补算窗口时应标记暂定。比例分母为零显示“无样本”，不要显示百分之零暗示表现差。样本量很小时同时展示人数，防止一名用户变化被解读为显著趋势。"}</BookParagraph>
</div>) },
{ label: "排错、练习与参考", left: (<div className="space-y-4">
<PageTitle>{"性能与一致性检查"}</PageTitle>
<BookParagraph>{"大屏不宜每次刷新都扫描全年原始事件，可读取按课程日汇总的服务表；但全站去重人数不能从各课程人数直接累加。缓存需要记录刷新时间和失效规则。核对指标时固定日期、过滤器和数据版本，用少量明细手算；若图上数字与SQL不同，先检查筛选、时区和缓存，再怀疑图表组件。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"练习：设计可读且可信的看板"}</PageTitle>
<BookParagraph>{"为运营设计三张图：近七天活跃趋势、课程提交转化排序、学习时长分布，写明选择理由。验收：图上有单位和时间范围，转化图带分母，小样本有提示，缺失数据不伪装成零；给出一个跨课程重复用户的例子，证明课程人数相加不等于全站人数。参考思路：为每张图附一条指标定义和一组可手算数据。"}</BookParagraph>
<BookList items={[<a key="https://www.postgresql.org/docs/current/tutorial-agg.html" href="https://www.postgresql.org/docs/current/tutorial-agg.html" target="_blank" rel="noreferrer" className="underline">PostgreSQL聚合与分组</a>]} />
</div>) }
]

export default function BiPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
