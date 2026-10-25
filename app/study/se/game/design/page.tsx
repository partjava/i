'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '游戏设计',
  chapterNumber: 2,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  prevChapter: { label: '动画基础', href: '/study/se/game/animation' },
  nextChapter: { label: '游戏开发', href: '/study/se/game/development' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: "规则如何产生选择",
    left: (
      <div className="space-y-4">
        <PageTitle>规则如何产生选择</PageTitle>
        <BookParagraph>游戏设计先回答玩家反复做什么、为何值得做、失败会损失什么。核心循环可写为观察障碍、选择路线、执行移动、获得分数、面对更难障碍。每个环节都要有输入与可观察反馈；世界观和画面能加强体验，却不能替代有意义的规则选择。</BookParagraph>
        <BookParagraph>设计讨论应能落到玩家的一次选择：他看到了什么线索，可以采取什么行动，承担什么代价，又如何知道结果。例如贴近障碍拾取金币，关键不是金币数量，而是玩家能否看清安全路线并理解自己为何成功或失败。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>写清核心循环</PageTitle>
        <BookParagraph>以躲避游戏为例，玩家只有移动，敌人从边缘进入，存活时间形成分数。若所有位置同样安全，就没有路线选择；若敌人完全无法预判，失败又缺乏可学习原因。设计者要把行动成本、风险、奖励和信息可见性写成规则，而不是写成“刺激好玩”。</BookParagraph>
        <SectionTitle>实施顺序</SectionTitle>
        <BookList ordered items={["先写玩家动词与胜负条件，再画状态与资源变化。", "把设计判断变成可观察假设，预先规定记录指标和修改范围。"]} />
      </div>
    ),
  },
  {
    label: "纸面原型",
    left: (
      <div className="space-y-4">
        <PageTitle>纸面原型</PageTitle>
        <BookParagraph>纸面原型用方格纸、棋子和回合代替引擎。每回合玩家移动一格，障碍按箭头前进两格，碰到即结束。先确定移动顺序、碰撞发生时机、能否斜走与场外处理，再进行三次短局；这些细节会显著改变玩家可行策略，必须让不同测试者得到同样裁定。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>一次只改一个变量</PageTitle>
        <BookParagraph>原型的目的是验证假设，例如“提前一回合显示障碍路线，会让失败更容易理解”。对照两套规则时保持棋盘、局长和障碍序列一致，只改变预警。记录玩家采取什么行动及原因，不用设计者不断提示正确玩法；口头说明越多，越难发现真实的信息缺口。</BookParagraph>
        <BookParagraph>纸笔与回合制伪代码；原型不依赖游戏引擎。</BookParagraph>
        <BookCode language="text" showLineNumbers code={"纸面规则伪代码（不是引擎 API）\n每回合：\n  展示本回合危险与下一回合预警\n  接收一次行动：上、下、左、右、等待\n  若目标越界：留在原格，仍消耗本回合\n  更新玩家位置\n  若进入危险格：本局结束\n  若格内有金币：收取一次，分数加一\n  推进危险序列；三回合后结算\n对照试验：固定危险序列，只关闭或开启预警"} />
      </div>
    ),
  },
  {
    label: "挑战与反馈",
    left: (
      <div className="space-y-4">
        <PageTitle>挑战与反馈</PageTitle>
        <BookParagraph>反馈应连接原因和结果。被击中时短暂闪烁、明确扣血、暂停输入片刻，让玩家知道哪件事发生了；但不能把关键危险仅用红绿色区分，也不能只靠声音通知。挑战可以通过增加障碍数量或改变路线提升，两者同时加快会让调参难以归因。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>测试设计假设</PageTitle>
        <BookParagraph>平衡性不是所有选项数值相同，而是不同情境存在可解释的权衡。若加速没有消耗、没有危险且始终更优，普通移动便成了多余选项。测试表应记录首次理解时间、失败位置、使用策略和重新尝试意愿，再选择一条证据最强的规则做修改。</BookParagraph>
        <SectionTitle>常见错误</SectionTitle>
        <BookList items={["一次改敌人速度、奖励和生命值，无法判断效果来自哪个变量。", "把玩家困惑归因于不会玩，却没有检查预警、碰撞和反馈是否明确。"]} />
      </div>
    ),
  },
  { label: "把核心循环展开", left: (<div className="space-y-4"><PageTitle>把核心循环展开</PageTitle><BookParagraph>核心循环可以写成观察局势、选择路线、执行移动、获得反馈、重新观察。每一环都需要具体对象：障碍位置是信息，左右移动是动作，生存与得分是结果。如果只写探索、成长、挑战，团队仍不知道第一分钟应制作什么交互。</BookParagraph>
<BookParagraph>一分钟躲避游戏中，外围循环还包含失败、回看成绩、重试。若失败后等待十秒且没有新信息，重试动力会被打断。先画一次完整短局的事件顺序，再决定成长系统是否真的服务这个循环，而不是为了凑功能列表。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>建立可证伪的设计假设</PageTitle><BookParagraph>把“更刺激”改成“有预告的高速障碍让玩家提前选择路线”。原型只保留移动、预告、障碍与受击，先排除美术品质和升级奖励干扰。若玩家仍说看不懂，就需要修改信息呈现，而不是增加更多种敌人。</BookParagraph><div className="overflow-x-auto my-4"><table className="w-full text-sm border-collapse"><thead><tr className="border-b-2"><th className="text-left p-2 font-semibold">原型问题</th><th className="text-left p-2 font-semibold">只改变的条件</th><th className="text-left p-2 font-semibold">可观察证据</th></tr></thead><tbody><tr className="border-b"><td className="p-2">风险是否可读</td><td className="p-2">危险预告时长</td><td className="p-2">首次受击前是否主动避让</td></tr><tr className="border-b"><td className="p-2">奖励是否值得冒险</td><td className="p-2">金币位置或分值</td><td className="p-2">选择危险路线的比例与理由</td></tr><tr className="border-b"><td className="p-2">重试是否顺畅</td><td className="p-2">失败到可操作的间隔</td><td className="p-2">是否愿意立即再玩一局</td></tr></tbody></table></div></div>) },
  { label: "挑战来自决策空间", left: (<div className="space-y-4"><PageTitle>挑战来自决策空间</PageTitle><BookParagraph>速度越快并不必然越有挑战。若两条路线总有一条完全安全，玩家可能只需机械躲闪；若所有路线都不可达，则结果由运气决定。设计应在玩家移动能力和障碍布局之间留出可选择的安全窗口，让失误能够被解释。</BookParagraph>
<BookParagraph>例如角色横移一百八十像素每秒，障碍预告后零点五秒到达，理论可横移九十像素。目标路线若相隔一百二十像素，就算瞬间响应也无法完成。先扣除人的反应时间和输入延迟，再设置通路距离，才是在设计可实现的动作。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>教学如何逐步增加信息</PageTitle><BookParagraph>第一轮只出现静止障碍，让玩家学会移动；第二轮引入移动方向清晰的敌人；第三轮再要求边躲避边拾取。每次仅增加一个主要信息维度，玩家能把失败归因到新规则。直接叠加速度、数量和方向会让学习目标模糊。</BookParagraph>
<BookParagraph>教学可以通过安全情境让玩家尝试，而不一定依赖大段文字。先给宽阔空间练习，再让同一规则出现在轻微压力中。观察玩家是否在提示消失后仍会操作，才能区分记住按钮与理解规则。</BookParagraph></div>) },
  { label: "风险收益不只看均值", left: (<div className="space-y-4"><PageTitle>风险收益不只看均值</PageTitle><BookParagraph>安全路线得十分，危险路线得三十分但可能损失已有分数，可以先算期望收益作为讨论起点。概率是假设而不是事实；熟练玩家成功率可能更高，新手可能根本看不懂风险。把不同水平玩家分开观察，平均成功率才不至于掩盖两极结果。</BookParagraph>
<BookParagraph>同样期望值的选项，波动也可能完全不同。稳定得分适合保守玩家，大额随机奖励可能吸引冒险者，但不能据此断言后者更好。需要同时说明可见信息、失败代价和玩家是否能通过练习改善结果。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>对照三个选择条件</PageTitle><BookParagraph>下面以一次行动的简化分数模型比较条件。危险路线失败概率从四成升到七成，期望值就从正变负；若实际试玩中玩家仍选择它，可能是奖励展示、概率认知或娱乐体验起作用，应通过追问原因继续调查。</BookParagraph><BookParagraph>JavaScript；浏览器控制台或 Node.js 独立运行。输入与预期输出见注释。</BookParagraph><BookCode language="javascript" showLineNumbers code={"// 简化单次选择：收益单位是分数，失败概率由设计假设给出\n// 真实设计还要看失败损失、信息与玩家对风险的偏好\nfunction expectedScore(reward, failChance, loss) {\n  return (1 - failChance) * reward - failChance * loss;\n}\nconsole.log(expectedScore(10, 0.1, 20)); // 7\nconsole.log(expectedScore(30, 0.4, 20)); // 10\nconsole.log(expectedScore(30, 0.7, 20)); // -5"} /></div>) },
  { label: "反馈让规则可理解", left: (<div className="space-y-4"><PageTitle>反馈让规则可理解</PageTitle><BookParagraph>受击反馈至少交代来源、发生时刻和后果。闪白提示命中，击退显示方向，生命值变化表达代价，短暂无敌提示保护期。如果只播放强烈震屏却不显示生命变化，玩家可能无法区分擦碰、受伤和死亡。反馈强度也应与事件重要性一致。</BookParagraph>
<BookParagraph>评价失败公平性时，可暂停在受击前一瞬，问玩家能否指出危险来源和可用逃生路线。若路线存在但不可读，改画面和预告；若路线根本不存在，改生成规则；若路线清楚但操作未生效，再查输入系统。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>试玩记录怎样支持迭代</PageTitle><BookParagraph>记录具体事件：第几次遭遇、当时位置、采取什么动作、结果如何。把“太难了”还原成“第三次障碍在屏外生成，进入画面时只剩零点一秒”，才能提出可验证的改动。先保留观察，再写解释，避免把设计者猜测当玩家原话。</BookParagraph>
<BookParagraph>每轮只验证少数关键假设，保存原参数与新参数及取舍理由。缩小障碍碰撞盒可能提高宽容度，也可能让视觉接触缺乏后果；延长预告可能改善可读性，也会降低节奏。记录这类代价，迭代才不会循环改回原处。</BookParagraph></div>) },
  {
    label: "练习：三回合原型",
    left: (
      <div className="space-y-4">
        <PageTitle>练习：三回合原型</PageTitle>
        <BookParagraph>设计一个三回合收集游戏：每回合只能移动或等待，金币会增加分数，但靠近金币的格子存在下一回合危险。用纸笔让两位没有听过规则的人各玩三局，记录他们是否能在不提示的情况下说明失败原因。</BookParagraph>
        <BookAlert type="info" message={"设计并测试“等待”有策略价值的三回合游戏，提交原规则、对照记录及修改版。"} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收与资料</PageTitle>
        <BookParagraph>验收交付一页规则、核心循环、六局记录与一个修改前后对照。必须包含移动顺序、胜负、计分、边界和并发事件裁定。参考方案并不要求胜率相等，而要求记录显示玩家至少两次在安全路线与收益路线之间作出不同选择。</BookParagraph>
        <SectionTitle>参考思路</SectionTitle>
        <BookParagraph>参考思路：让危险有规律地轮换，等待可避开下一格风险，但牺牲一次收集机会；先验证等待并非总是劣势。</BookParagraph>
        <SectionTitle>官方资料</SectionTitle>
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html" target="_blank" rel="noreferrer">Godot：首个2D游戏的规则与实现</a></BookParagraph>
        <BookParagraph><a href="https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_breakout_game_pure_JavaScript" target="_blank" rel="noreferrer">MDN：打砖块完整案例</a></BookParagraph>
      </div>
    ),
  },
]

export default function GameDesignPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
