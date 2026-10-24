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
  chapterTitle: '游戏策划',
  chapterNumber: 10,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  prevChapter: { label: '游戏音效', href: '/study/se/game/sound' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: "策划把想法变成约定",
    left: (
      <div className="space-y-4">
        <PageTitle>策划把想法变成约定</PageTitle>
        <BookParagraph>游戏策划把目标玩家、使用场景、核心玩法、内容范围和成功标准写成团队可以执行的约定。以碎片时间躲避游戏为例，先明确单局一分钟、键盘或触摸移动、失败可立即重试。目标越具体，越容易判断是否应加入长剧情、联网匹配或复杂装备。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>可执行的需求条目</PageTitle>
        <BookParagraph>需求条目同时包含触发、规则、反馈和验收。例如“玩家生命值降到零时停止生成敌人，只结算一次，显示生存秒数并提供重试”。这比“完善死亡系统”更容易拆分与测试。规则有歧义时列开放问题，不让程序、美术和测试各自猜测。</BookParagraph>
        <SectionTitle>实施顺序</SectionTitle>
        <BookList ordered items={["先写玩家与单局目标，随后将规则拆成含验收条件的需求。", "先试算数值关键点与边界，再排依赖与风险；每次变更同步资源和测试。"]} />
      </div>
    ),
  },
  {
    label: "数值不是凭感觉",
    left: (
      <div className="space-y-4">
        <PageTitle>数值不是凭感觉</PageTitle>
        <BookParagraph>数值设计先定义单位和意图。敌人速度是像素每秒，生成间隔是秒，生命值是离散次数；把每帧伤害和每秒伤害混用会让平衡随设备变化。成长曲线应说明初始值、变化速率、上下限和适用区间，并用若干关键时间点检查，而不是只提交一个公式。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验证成长曲线</PageTitle>
        <BookParagraph>示例用指数增长计算升级需求，每级向上取整。它只是可运行的数值试算，不代表合理平衡。若每局固定获得一百经验，后期升级所需局数会随需求上升；策划应把这一结果转成玩家可感知的时间成本，再通过原型验证是否符合目标节奏。</BookParagraph>
        <BookParagraph>浏览器 JavaScript 或 Node.js；纯数值试算，参数必须通过目标玩家原型验证。</BookParagraph>
        <BookCode language="javascript" showLineNumbers code={"// JavaScript：浏览器控制台或 Node.js，经验曲线试算\nfunction xpForLevel(level) {\n  if (!Number.isInteger(level) || level < 1 || level > 20) {\n    throw Error('level must be 1..20');\n  }\n  return Math.ceil(100 * 1.25 ** (level - 1));\n}\nconsole.table([1, 2, 5, 10, 20].map(level => ({\n  level,\n  xp: xpForLevel(level),\n  roundsAt100Xp: Math.ceil(xpForLevel(level) / 100)\n})));\n// 这里xp表示本级升下一级所需量，非累计总经验。"} />
      </div>
    ),
  },
  {
    label: "排期与范围控制",
    left: (
      <div className="space-y-4">
        <PageTitle>排期与范围控制</PageTitle>
        <BookParagraph>排期按风险与依赖拆分：先验证移动和碰撞，再制作可玩切片，最后增加内容与润色。每项任务写负责人、产物、前置条件和完成标准。预留集成与回归时间；进度落后时优先减少敌人种类或关卡数，不能直接删除存档保护与关键测试。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>评审与变更</PageTitle>
        <BookParagraph>变更记录说明为什么改、改了哪些规则、影响哪些资源与用例。新增道具不仅需要图标，还会影响掉落表、存档、数值、教程和测试。评审时用原型、试算表和试玩记录支持判断；少量玩家数据只能提供线索，不应包装成对所有玩家的结论。</BookParagraph>
        <SectionTitle>常见错误</SectionTitle>
        <BookList items={["策划案只有世界观和功能名称，没有触发条件、单位与完成标准。", "用平均值掩盖前期卡点，或把少量试玩反馈直接当成市场结论。"]} />
      </div>
    ),
  },
  {
    label: "练习：一页策划案",
    left: (
      <div className="space-y-4">
        <PageTitle>练习：一页策划案</PageTitle>
        <BookParagraph>为一分钟躲避游戏写一页策划案，包含目标玩家、核心循环、四个状态、敌人生成曲线、结束规则和本轮不做的内容。再列一个两人五天的任务计划，每项都有可检查产物，并识别一个最可能导致延期的技术风险。</BookParagraph>
        <BookAlert type="info" message={"提交一页可执行策划案、五点数值试算和两人五天计划，并写一次道具新增的影响分析。"} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收与资料</PageTitle>
        <BookParagraph>验收另一位开发者无需口头补充即可实现移动、生成、暂停与结算；至少五个数值采样点有单位、边界和解释；任务计划包含集成与回归；提交一条变更的影响分析。参考答案可有不同难度曲线，但规则必须内部一致且可被测试。</BookParagraph>
        <SectionTitle>参考思路</SectionTitle>
        <BookParagraph>参考思路：先做完整短局，把存档和素材授权列为交付依赖；延期时缩内容数量，保留闭环与回归。</BookParagraph>
        <SectionTitle>官方资料</SectionTitle>
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html" target="_blank" rel="noreferrer">Godot：完整小游戏范围示例</a></BookParagraph>
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/tutorials/best_practices/project_organization.html" target="_blank" rel="noreferrer">Godot：项目组织与协作基础</a></BookParagraph>
      </div>
    ),
  },
]

export default function GamePlanningPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
