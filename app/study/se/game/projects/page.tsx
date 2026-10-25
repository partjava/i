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
  chapterTitle: '实战案例与项目',
  chapterNumber: 6,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  prevChapter: { label: '游戏发布', href: '/study/se/game/release' },
  nextChapter: { label: '游戏引擎', href: '/study/se/game/engine' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: "从案例到交付物",
    left: (
      <div className="space-y-4">
        <PageTitle>从案例到交付物</PageTitle>
        <BookParagraph>实战项目要完成从规则到交付的闭环。这里选择一分钟躲避游戏：玩家在固定区域移动，敌人从边缘进入，碰撞结束，生存六十秒胜利。它能覆盖输入、循环、碰撞、生成、音画反馈和结算，范围又小到可以完整回归。先不加入联网、装备和程序化地图。</BookParagraph>
        <BookParagraph>这个项目的难点在模块相遇的地方：计时决定难度，难度影响生成，生成决定碰撞，碰撞又可能结束计时。先定义唯一规则状态和每步处理顺序，再把图像与声音接上去，才能避免各模块各自宣布本局结束。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>限定可玩范围</PageTitle>
        <BookParagraph>需求写成能验收的行为：方向输入控制角色，角色不出边界；每隔一段时间产生敌人；暂停停止计时与生成；失败显示生存时间；重试从相同初始条件开始。明确计分用有效游戏时间，加载和暂停时间都不计入，避免界面与规则各自维护一套时钟。</BookParagraph>
        <SectionTitle>实施顺序</SectionTitle>
        <BookList ordered items={["用占位素材完成整局，再按纵向切片增加生成、难度和反馈。", "每次集成都测试结束与重试，记录对象数和计时器是否归零。"]} />
      </div>
    ),
  },
  {
    label: "拆分纵向切片",
    left: (
      <div className="space-y-4">
        <PageTitle>拆分纵向切片</PageTitle>
        <BookParagraph>按可演示的纵向切片推进。第一片是方块移动到失败再重试，第二片是敌人生成与回收，第三片是计时、难度与胜利，最后才替换素材和加音效。每片都能运行完整短局，若某片卡住，可减少内容数量而不破坏已有流程。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>生成难度曲线</PageTitle>
        <BookParagraph>难度可由生成间隔与敌人速度控制，但应先固定速度，只缩短间隔。下面将有效时间映射到有上下限的参数；随机位置仍要有种子以便复现。生成时检查玩家安全距离，并给出有限尝试次数，找不到位置时延迟生成，不能无限循环阻塞主线程。</BookParagraph>
        <BookParagraph>JavaScript 参数函数可直接运行；生成调度为需接入场景的伪代码。</BookParagraph>
        <BookCode language="javascript" showLineNumbers code={"// JavaScript：浏览器控制台或 Node.js\nfunction difficulty(elapsedSeconds) {\n  const t = Math.max(0, Math.min(60, elapsedSeconds));\n  return {\n    interval: Math.max(0.35, 1.2 - t * 0.012),\n    enemySpeed: 90 // 第一轮调参固定速度，单位像素/秒\n  };\n}\nfor (const t of [0, 30, 60, 90]) {\n  console.log(t, difficulty(t));\n}\n// 生成调度伪代码：\n// playing时累计有效dt；累计>=间隔时生成并扣除间隔\n// 每帧限制追赶次数；结束、重试时重置累计器"} />
      </div>
    ),
  },
  {
    label: "整合与回归",
    left: (
      <div className="space-y-4">
        <PageTitle>整合与回归</PageTitle>
        <BookParagraph>集成时最容易漏掉跨模块生命周期：结算后生成器仍运行，旧音效回调在新局触发，失败界面遮住了重试按钮。定义单一结束入口并使它幂等；只有从playing转换到结束的第一次调用才能发结算事件。所有计时与监听在离开场景时清理。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>用证据复盘</PageTitle>
        <BookParagraph>复盘比较目标与证据：哪条规则没有按时完成、哪次测试发现了隐藏依赖、哪个性能热点来自资源尺寸。记录取舍和下一步优先级，不把“学到了很多”当成结论。保留一个可运行版本与清晰启动说明，让另一个人能够重复你的验收过程。</BookParagraph>
        <SectionTitle>常见错误</SectionTitle>
        <BookList items={["先完成大量素材与菜单，最后才发现碰撞和重试无法形成完整一局。", "敌人从不回收，以为前十秒流畅就代表一分钟负载也能通过。"]} />
      </div>
    ),
  },
  { label: "先画模块接口", left: (<div className="space-y-4"><PageTitle>先画模块接口</PageTitle><BookParagraph>规则核拥有阶段、有效时间、玩家与敌人；输入层只提供方向和菜单动作；生成器根据规则时间提出出生请求；视图消费状态；音频消费事件。模块接口先用小数据对象说明单位与字段，避免一个模块用毫秒、另一个用秒。</BookParagraph>
<BookParagraph>例如生成器输出敌人编号、出生位置、速度向量与半径。规则核校验安全距离后接纳，之后才通知视图创建图像。如果先创建图像再判断是否合法，拒绝出生时容易留下没有规则实体的幽灵敌人。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>纵向切片为何先做结算</PageTitle><BookParagraph>第一片只用一个固定障碍就能检查完整状态转换。失败后再开始一局，可以暴露计时、输入和场景清理问题；只把移动做得很精致，却不做结束，许多生命周期问题会延迟到项目最后才出现。每片的完成标准应是可从入口走到出口。</BookParagraph><div className="overflow-x-auto my-4"><table className="w-full text-sm border-collapse"><thead><tr className="border-b-2"><th className="text-left p-2 font-semibold">切片</th><th className="text-left p-2 font-semibold">可玩的闭环</th><th className="text-left p-2 font-semibold">暂时使用的替代品</th></tr></thead><tbody><tr className="border-b"><td className="p-2">移动与失败</td><td className="p-2">开始、触边、碰撞、重试</td><td className="p-2">方块代替角色与敌人</td></tr><tr className="border-b"><td className="p-2">生成与难度</td><td className="p-2">敌人进入、移动、离场</td><td className="p-2">固定出生点代替随机</td></tr><tr className="border-b"><td className="p-2">音画与交付</td><td className="p-2">反馈、暂停、完整短局</td><td className="p-2">简单提示声与纯色界面</td></tr></tbody></table></div></div>) },
  { label: "生成器的空间与时间约束", left: (<div className="space-y-4"><PageTitle>生成器的空间与时间约束</PageTitle><BookParagraph>在四条边缘随机选择出生点时，先把角色周围一定范围排除，再检查出生点是否立即处于屏幕可见危险区。安全距离只保证出生瞬间，若敌人速度很高还需预告或反应窗口；不能把距离约束等同于长期一定可躲。</BookParagraph>
<BookParagraph>有限尝试例如最多八次，全部失败就推迟到下一次调度。这个上限保证密集场景不会因无限寻找空位卡住。拒绝生成要记录原因和次数，便于区分难度曲线过密、区域过小或安全距离配置错误。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>推演一次生成节奏</PageTitle><BookParagraph>假设间隔一秒，本步开始累计零点九秒，再前进零点三秒，则生成一次并剩零点二秒。若直接把累计器归零，每次超出的零点二秒都丢失，实际间隔会越来越长。暂停时不累积有效时间，恢复才不会瞬间补出一波敌人。</BookParagraph>
<BookParagraph>难度间隔随时间变化时，应明确使用当前间隔还是预先排定下一次出生时刻。两种方式会产生不同节奏；小原型先选一种固定方案并记录，再增加难度变化，避免把调度差异误认为随机数问题。</BookParagraph></div>) },
  { label: "胜负同一步如何裁定", left: (<div className="space-y-4"><PageTitle>胜负同一步如何裁定</PageTitle><BookParagraph>角色在第六十秒同时接触敌人，必须提前规定胜负优先级。本案例扩展采用先碰撞后胜利：该步命中就失败，未命中且时间达到六十秒才胜利。其他规则也可以成立，但界面、重放与测试必须使用同一个裁定入口。</BookParagraph>
<BookParagraph>结束函数第一次改变阶段时才发出事件，后续调用返回已结束状态。这样多个敌人同一步碰撞不会创建多个结算面板，也不会重复统计成绩。动画可以延迟显示结果，规则时间却应在首次结束时立即冻结。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>把裁定做成小函数</PageTitle><BookParagraph>下面输入当前阶段、是否碰撞和有效秒数，输出下一阶段。三行调用展示同一步碰撞优先、无碰撞时胜利以及结束后保持结果。真实项目还要把输出事件交给界面，不能在此函数中直接创建节点或播放声音。</BookParagraph><BookParagraph>JavaScript；浏览器控制台或 Node.js 独立运行。输入与预期输出见注释。</BookParagraph><BookCode language="javascript" showLineNumbers code={"// 输入：已排序事件；同一步先结算碰撞，再检查胜利\nfunction finishStep(phase, collided, elapsed) {\n  if (phase !== 'playing') return phase;\n  if (collided) return 'lost';\n  return elapsed >= 60 ? 'won' : 'playing';\n}\nconsole.log(finishStep('playing', true, 60)); // lost\nconsole.log(finishStep('playing', false, 60)); // won\nconsole.log(finishStep('lost', false, 61)); // lost"} /></div>) },
  { label: "敌人回收与数量上界", left: (<div className="space-y-4"><PageTitle>敌人回收与数量上界</PageTitle><BookParagraph>敌人完全离开扩展屏幕边界后回收，而不是圆心刚过边缘就删除，避免半个图像突然消失。若屏幕宽六百像素，敌人半径十像素，可以在边缘之外再留小缓冲区；回收判定与图像锚点应采用相同坐标空间。</BookParagraph>
<BookParagraph>粗估在场敌人数，可用每秒出生数乘平均停留秒数。例如每秒两只、平均停留五秒，稳定阶段约十只；轨迹与随机分布会造成波动。若实测远高于估算，先查离场回收、重复生成器与暂停恢复追赶。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>把集成错误做成复盘案例</PageTitle><BookParagraph>连续重试后敌人翻倍，通常先查是否有两个生成任务；只有第二局开始位置异常，检查输入与初始状态是否重建；界面已结算却仍听见循环声，检查音源归属。每个现象对应一条可检验假设，避免一次重写所有模块。</BookParagraph>
<BookParagraph>最终演示应能从冷启动进入短局，展示暂停、失败和胜利两条结局。可将调试局长设为五秒快速验证胜利，再恢复正式六十秒配置。调试参数与正式参数需明确区分，避免将缩短局长误带进交付包。</BookParagraph></div>) },
  {
    label: "练习：一分钟躲避",
    left: (
      <div className="space-y-4">
        <PageTitle>练习：一分钟躲避</PageTitle>
        <BookParagraph>独立完成一分钟躲避原型，画面可用纯色几何图形。提交源文件、启动说明、状态转换图、三次固定输入重放结果和一张资源清单。项目重点是完整性，允许只有一种敌人和一个关卡，但开始、暂停、结束、重试必须全部可用。</BookParagraph>
        <BookAlert type="info" message={"实现完整原型并提交四项生命周期验收与一次性能记录，禁止用新增玩法替代缺失的重试流程。"} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收与资料</PageTitle>
        <BookParagraph>验收暂停十秒后游戏计时不变；连续重试十次没有额外生成器；到六十秒只结算一次；敌人离开扩展边界后回收。报告目标设备与峰值敌人数下的帧耗时，并说明一个真实缺陷的复现、修复和回归证据。</BookParagraph>
        <SectionTitle>参考思路</SectionTitle>
        <BookParagraph>参考思路：用sessionId标识每一局，异步返回时检查当前局；统一reset函数重建计时、敌人、分数和输入。</BookParagraph>
        <SectionTitle>官方资料</SectionTitle>
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html" target="_blank" rel="noreferrer">Godot：首个完整2D游戏</a></BookParagraph>
        <BookParagraph><a href="https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_breakout_game_pure_JavaScript" target="_blank" rel="noreferrer">MDN：打砖块分步实战</a></BookParagraph>
      </div>
    ),
  },
]

export default function GameProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
