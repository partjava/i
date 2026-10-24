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
  chapterTitle: '动画基础',
  chapterNumber: 1,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  nextChapter: { label: '游戏设计', href: '/study/se/game/design' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: "时间决定运动",
    left: (
      <div className="space-y-4">
        <PageTitle>时间决定运动</PageTitle>
        <BookParagraph>动画由离散画面构成，但游戏里的位置必须由时间驱动。若每次刷新移动两像素，刷新率翻倍就会跑得更快；正确量纲是速度乘秒数。先区分物理状态、动画播放时间和最终显示位置，避免用某一张精灵图来决定角色是否已经受伤。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>从帧到状态</PageTitle>
        <BookParagraph>关键帧规定动作的重要姿态，中间帧连接这些姿态。跑步可以循环，死亡通常只播一次。动画状态机应依据速度、落地和生命值选择动作，并明确死亡高于受击、受击高于跑步的优先级；不要在每帧都重新从第一帧播放同一动作。</BookParagraph>
        <SectionTitle>实施顺序</SectionTitle>
        <BookList ordered items={["准备固定步长、累计器和上一位置，速度统一用像素每秒。", "每次先模拟，再读取插值后的只读位置；暂停恢复重置时间戳。"]} />
      </div>
    ),
  },
  {
    label: "固定步长循环",
    left: (
      <div className="space-y-4">
        <PageTitle>固定步长循环</PageTitle>
        <BookParagraph>浏览器的回调提供时间戳，先把毫秒换为秒，再累计到固定步长。每次模拟前保留旧位置，积累时间足够才推进一次模拟。示例限制单次时间差，避免切回后台时追赶大量步骤；这是交互演示的丢时策略，不适合直接作为联网同步规则。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>插值只影响显示</PageTitle>
        <BookParagraph>显示位置在上一状态与当前状态之间插值，比例是剩余累计时间除以步长。渲染不写回物理位置，否则碰撞计算会受刷新率影响。这种插值通常引入约一个模拟步长的显示延迟；镜头和角色若使用不同时间基准，也会出现相对抖动。</BookParagraph>
        <BookParagraph>浏览器 JavaScript；示例只演示循环，暂停与碰撞由练习补齐。</BookParagraph>
        <BookCode language="javascript" showLineNumbers code={"// 浏览器控制台运行；创建独立画布演示\nconst canvas = document.createElement('canvas');\ncanvas.width = 600; canvas.height = 100;\ndocument.body.append(canvas);\nconst ctx = canvas.getContext('2d');\nconst step = 1 / 60;\nlet x = 0, previous = 0, lag = 0, last;\nfunction frame(now) {\n  if (last === undefined) last = now;\n  lag += Math.min((now - last) / 1000, 0.1);\n  last = now;\n  while (lag >= step) {\n    previous = x; x += 60 * step; lag -= step;\n  }\n  const shown = previous + (x - previous) * lag / step;\n  ctx.clearRect(0, 0, 600, 100);\n  ctx.fillRect(shown % 580, 40, 20, 20);\n  requestAnimationFrame(frame);\n}\nrequestAnimationFrame(frame);"} />
      </div>
    ),
  },
  {
    label: "精灵帧与事件",
    left: (
      <div className="space-y-4">
        <PageTitle>精灵帧与事件</PageTitle>
        <BookParagraph>精灵表中的帧号可由播放秒数乘动画帧率后取整，再对总帧数取余。四帧每秒八帧的循环持续半秒。脚步声应在跨过指定动画时刻时触发一次，而不是只要停留在那张图就触发；跳帧时也要检查被跨过的事件区间。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>排查抖动</PageTitle>
        <BookParagraph>先记录模拟位置、显示位置、时间差和当前动作，再判断问题来自时间还是资源。动画边缘跳动可能是各帧锚点不同；速度偶尔突增可能是时间单位混用；暂停恢复后跳跃则要检查累计时间的重置。调试时用十字线画出统一脚底锚点比凭感觉改图更可靠。</BookParagraph>
        <SectionTitle>常见错误</SectionTitle>
        <BookList items={["把动画帧率等同于显示刷新率，导致不同设备动作速度不同。", "在渲染函数修改角色坐标，破坏固定模拟结果；取模环绕也会在屏幕边缘产生跳变。"]} />
      </div>
    ),
  },
  {
    label: "练习：稳定的小球",
    left: (
      <div className="space-y-4">
        <PageTitle>练习：稳定的小球</PageTitle>
        <BookParagraph>制作一个水平匀速运动的小球，允许暂停与恢复，并显示模拟位置和渲染位置。先使用矩形完成运动，再换为四帧精灵；把逻辑运动频率和精灵帧率分别设为六十与八，观察两种频率各自控制什么。</BookParagraph>
        <BookAlert type="info" message={"为示例补充暂停按钮和左右边界反弹，提交三种绘制频率下的同时间位置对照。"} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收与资料</PageTitle>
        <BookParagraph>验收时分别模拟三十、六十、一百二十次每秒的绘制节奏：在相同有效模拟时间后位置应一致，暂停期间位置与动画时间不变，恢复后没有巨大位移。边界碰撞只由模拟位置判断，并保存一段时间差日志解释插值比例。</BookParagraph>
        <SectionTitle>参考思路</SectionTitle>
        <BookParagraph>参考思路：把反弹写进固定步长更新，暂停时跳过累计与动画计时；恢复时清空上一时间戳。</BookParagraph>
        <SectionTitle>官方资料</SectionTitle>
        <BookParagraph><a href="https://developer.mozilla.org/en-US/docs/Games/Anatomy" target="_blank" rel="noreferrer">MDN：游戏循环</a></BookParagraph>
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/tutorials/2d/2d_sprite_animation.html" target="_blank" rel="noreferrer">Godot：精灵动画</a></BookParagraph>
      </div>
    ),
  },
]

export default function AnimationBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
