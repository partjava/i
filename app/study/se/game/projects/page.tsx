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
