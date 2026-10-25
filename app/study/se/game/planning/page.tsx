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
        <BookParagraph>策划文档既约束实现，也保存决策原因。例如局长六十秒来自碎片时间目标，失败立即重试服务反复练习；这些理由能帮助团队判断后续新增内容是否相容。只有规则没有意图，容易机械执行；只有愿景没有边界，又无法落地。</BookParagraph>
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
  { label: "让一条规则可被执行", left: (<div className="space-y-4"><PageTitle>让一条规则可被执行</PageTitle><BookParagraph>“角色移动灵敏”无法直接实现，可拆为输入方式、最大速度、加速度、停止响应、边界行为和反馈。对于课程原型，可以明确方向输入即时达到一百八十像素每秒、松开立即停止、斜向速度归一化，先得到可验证基线再讨论手感。</BookParagraph>
<BookParagraph>需求还需写例外：暂停时忽略移动，结束后仅接受重试，输入设备断开时清空方向。将正常路径与例外放在同一条目附近，能防止实现者只完成演示路径。未决定的规则标记为问题并指定决策时点，不用含糊形容词暂时掩盖。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>用例子暴露规则歧义</PageTitle><BookParagraph>同一步到达六十秒且受到致命伤，是胜利还是失败？拾取回血与受伤同时发生，先处理哪一个？给出具体初始值、事件顺序与最终结果，比单独列术语更快发现分歧。策划负责确定裁定，程序负责实现，测试据此构造边界。</BookParagraph><div className="overflow-x-auto my-4"><table className="w-full text-sm border-collapse"><thead><tr className="border-b-2"><th className="text-left p-2 font-semibold">文档对象</th><th className="text-left p-2 font-semibold">需要写清</th><th className="text-left p-2 font-semibold">对应产物</th></tr></thead><tbody><tr className="border-b"><td className="p-2">规则条目</td><td className="p-2">触发、前置、结果、例外</td><td className="p-2">状态转换与测试用例</td></tr><tr className="border-b"><td className="p-2">数值参数</td><td className="p-2">单位、范围、曲线、设计意图</td><td className="p-2">关键采样点与试玩记录</td></tr><tr className="border-b"><td className="p-2">任务计划</td><td className="p-2">依赖、负责人、可检查完成标准</td><td className="p-2">可演示切片与集成版本</td></tr></tbody></table></div></div>) },
  { label: "曲线的形状就是体验节奏", left: (<div className="space-y-4"><PageTitle>曲线的形状就是体验节奏</PageTitle><BookParagraph>线性增长每段增加相同绝对量，指数增长每段乘相同比例，分段曲线允许教学、提升与平台期。曲线选择应服务单局长度和玩家学习过程。若一分钟小游戏采用长期指数增长，后半段可能很快超出设备负载与玩家反应能力。</BookParagraph>
<BookParagraph>生成间隔减少不等于数量线性增加。间隔从一点二秒减到零点六秒，每秒出生数翻倍；再减到零点四秒又增加一半。评审时同时列间隔、每分钟出生量与预估在场数量，才能理解参数变化对体验和性能的双重影响。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>边界、封顶与累计量</PageTitle><BookParagraph>参数需要初值、适用时间和上下限。线性间隔不设下限，后续可能成为零或负数，调度器就可能无限追赶。即使局长固定六十秒，也应规定越界时间输入如何处理，保证调试和复用时仍得到有意义结果。</BookParagraph>
<BookParagraph>经验需求应区分本级升下一级所需量与累计经验。若前三级需求为一百、一百二十五、一百五十七，从一级升到四级累计需要三百八十二，而不是只需一百五十七。把两列并排试算，能避免界面进度和升级判断采用不同口径。</BookParagraph></div>) },
  { label: "把参数变成可讨论证据", left: (<div className="space-y-4"><PageTitle>把参数变成可讨论证据</PageTitle><BookParagraph>下面曲线从一点二秒逐步降到零点四秒，并在四十秒后保持。五个采样点能看见早期变化与封顶位置，但还不足以证明难度合理；需要接入原型观察实际存活时间、失败原因及玩家是否理解预告。</BookParagraph>
<BookParagraph>若一次调整同时改变敌人速度、生成率与碰撞半径，就无法知道胜率变化来自哪里。先固定其他因素，只修改一个主要变量；对于相互依赖的变量，用小型参数组合表记录每组条件，不要凭印象比较不同试玩。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>用出生频率解释间隔</PageTitle><BookParagraph>输入为非负有效秒数，输出以秒为单位的间隔，表中同时给出按当前频率推算的每分钟数量。这个数表示瞬时生成率的换算，不是前一分钟实际累计出生数；累计数量还需要对随时间变化的调度过程逐步计算。</BookParagraph><BookParagraph>JavaScript；浏览器控制台或 Node.js 独立运行。输入与预期输出见注释。</BookParagraph><BookCode language="javascript" showLineNumbers code={"// 输入：有效游戏时间，单位秒；输出：生成间隔秒数\n// 本例为试算曲线，最短间隔0.4秒，不是已验证的平衡方案\nfunction intervalAt(t) {\n  return Math.max(0.4, 1.2 - 0.02 * Math.max(0, t));\n}\nconsole.table([0, 10, 20, 40, 60].map(t => ({\n  seconds: t, interval: intervalAt(t).toFixed(2),\n  perMinute: (60 / intervalAt(t)).toFixed(1)\n})));\n// 0秒：1.20秒/只、50只/分钟；40秒起封顶150只/分钟"} /></div>) },
  { label: "排期围绕依赖和风险", left: (<div className="space-y-4"><PageTitle>排期围绕依赖和风险</PageTitle><BookParagraph>两人五天不能简单等同十个任意互换的人日。角色控制需要输入约定，动画集成需要资产规格，发布需要可运行切片；这些前后依赖限制可并行工作。先把关键依赖画成顺序，再安排不依赖它们的素材或文档工作。</BookParagraph>
<BookParagraph>高风险工作应尽早做小验证，例如目标平台音频启动、存档写入位置或相机坐标转换。给风险写触发条件、验证时间和降级方案：若复杂触摸手势第一天无法验证，就改为固定方向按钮，而不是到最后一天才发现无可交付。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>变更影响要追踪到规则之外</PageTitle><BookParagraph>新增护盾道具至少影响拾取规则、无敌时间、图标、音效、教程、存档和测试。变更单记录新增价值、成本、依赖与需要删减的范围，再决定是否进入当前版本。只写“加一个护盾”会把集成成本隐藏到后续环节。</BookParagraph>
<BookParagraph>决策记录应保存采用方案、理由和未解决风险。试玩显示新手误解护盾闪烁时，下一步可以验证提示方式，而不是重新争论是否需要护盾。把反馈关联到规则版本与参数版本，才能知道证据针对的是哪个实际方案。</BookParagraph></div>) },
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
