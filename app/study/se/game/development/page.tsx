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
  chapterTitle: '游戏开发',
  chapterNumber: 3,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  prevChapter: { label: '游戏设计', href: '/study/se/game/design' },
  nextChapter: { label: '游戏测试', href: '/study/se/game/testing' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: "把规则变成系统",
    left: (
      <div className="space-y-4">
        <PageTitle>把规则变成系统</PageTitle>
        <BookParagraph>游戏开发把设计规则变成可执行状态变化。输入采集、规则更新、渲染和音效有不同职责：按键表示玩家意图，规则决定是否合法，视图读取结果，音效消费事件。让它们都修改同一批全局变量，常会造成暂停仍扣血或重新开局残留敌人的问题。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>隔离输入与规则</PageTitle>
        <BookParagraph>先列最小状态：阶段、玩家位置、生命值、分数、敌人列表和随机种子。输入层把键盘或手柄转换为向左、确认等动作；规则层只接收动作，不直接读设备。这样更换操作方式不必重写规则，测试也能用固定动作序列重放同一局。</BookParagraph>
        <SectionTitle>实施顺序</SectionTitle>
        <BookList ordered items={["先确定规则状态和动作，再独立实现更新函数。", "接入画面后覆盖开始、结束、暂停与重试，不只演示正常移动。"]} />
      </div>
    ),
  },
  {
    label: "碰撞与结算",
    left: (
      <div className="space-y-4">
        <PageTitle>碰撞与结算</PageTitle>
        <BookParagraph>碰撞检测只回答对象是否接触，伤害系统负责无敌时间、阵营和一次攻击的重复过滤。结算顺序应事先规定：本帧死亡与拾取同时发生时，先扣血还是先回血？在单个更新函数中统一处理比散落在动画、音效回调里更容易解释。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>纯函数示例</PageTitle>
        <BookParagraph>下面用回合制拾取展示数据到数据的更新，在浏览器控制台或 Node.js 可运行。收集后删除金币位置，防止等待或重复点击刷分；结束后拒绝移动。它刻意没有真实时间与画面依赖，可作为引擎脚本调用的规则核，而不是完整游戏。</BookParagraph>
        <BookParagraph>浏览器 JavaScript 或 Node.js；一维回合规则核，无外部依赖。</BookParagraph>
        <BookCode language="javascript" showLineNumbers code={"// JavaScript：浏览器控制台或 Node.js\nfunction advance(state, action) {\n  if (state.phase !== 'playing') return state;\n  const dx = { left: -1, right: 1, wait: 0 }[action];\n  if (dx === undefined) return state;\n  const x = Math.max(0, Math.min(4, state.x + dx));\n  const collected = state.coins.includes(x);\n  const coins = state.coins.filter(c => c !== x);\n  return { ...state, x, coins,\n    score: state.score + Number(collected),\n    phase: coins.length === 0 ? 'won' : 'playing' };\n}\nconst initial = { phase: 'playing', x: 0, score: 0, coins: [2, 4] };\nconsole.log(advance(advance(initial, 'right'), 'right'));\n// x: 2，score: 1，coins: [4]"} />
      </div>
    ),
  },
  {
    label: "资源与场景集成",
    left: (
      <div className="space-y-4">
        <PageTitle>资源与场景集成</PageTitle>
        <BookParagraph>资源集成先用占位图走通主菜单、开始、失败和重试，再替换成美术与音效。资源按所属场景组织，公共素材才放共享目录。加载失败需要可见的占位或报错；场景退出时取消计时器、监听和异步回调，避免旧关卡继续产生敌人。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>管理帧预算</PageTitle>
        <BookParagraph>六十帧每秒约有十六点七毫秒处理一帧，这是目标预算而非所有设备承诺。先测更新、绘制、资源加载分别耗时，再优化最重部分。不要在每帧解码图片、解析配置或遍历所有关卡资源；昂贵工作应前移到加载期或分批完成。</BookParagraph>
        <SectionTitle>常见错误</SectionTitle>
        <BookList items={["音效播放完成才更新生命值，导致规则取决于资源加载与播放状态。", "只清空画面不重置监听、计时器和规则状态，第二局出现重复事件。"]} />
      </div>
    ),
  },
  {
    label: "练习：可重玩的回合",
    left: (
      <div className="space-y-4">
        <PageTitle>练习：可重玩的回合</PageTitle>
        <BookParagraph>补齐五格收集小游戏：从零号格出发，移动或等待，拿完金币胜利，越界动作无效。提供开始、暂停、继续、重试四种入口，并把规则函数与显示代码分开，重试时重建完整初始状态。</BookParagraph>
        <BookAlert type="info" message={"基于规则核加入暂停与重试；用相同动作脚本比较两次运行的最终状态。"} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收与资料</PageTitle>
        <BookParagraph>验收同一动作序列运行两次必须得到同样分数；同一金币只加分一次；暂停不接受移动；结束后仍可重试且分数、位置、计时全部归零。额外交付一次帧耗时记录，说明测量设备、场景对象数和发现的主要开销。</BookParagraph>
        <SectionTitle>参考思路</SectionTitle>
        <BookParagraph>参考思路：初始化函数每次返回新数组；暂停作为阶段守卫；视图只订阅新状态，不直接修改金币数组。</BookParagraph>
        <SectionTitle>官方资料</SectionTitle>
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/tutorials/best_practices/project_organization.html" target="_blank" rel="noreferrer">Godot：项目组织</a></BookParagraph>
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/tutorials/performance/general_optimization.html" target="_blank" rel="noreferrer">Godot：性能优化原则</a></BookParagraph>
      </div>
    ),
  },
]

export default function GameDevelopmentPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
