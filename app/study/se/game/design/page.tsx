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
