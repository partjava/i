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
        <BookParagraph>例如同样每秒移动六十像素，三十次刷新应每次前进两像素，一百二十次刷新应前进半像素。小数坐标可以保存在逻辑状态里，只有绘制阶段才按画面风格决定是否取整。时间、空间和动作各自拥有独立变量，才能解释慢动作、暂停与不同设备上的一致性。</BookParagraph>
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
  { label: "拆开三条时间轴", left: (<div className="space-y-4"><PageTitle>拆开三条时间轴</PageTitle><BookParagraph>物理每次推进六十分之一秒，动画每秒切八张图，显示器每秒刷新一百二十次，三者可以同时成立。一次绘制可能没有新的物理步，也可能已经推进两步。代码应把模拟计数、动画秒数和回调时间戳分别命名，而不是都叫frame。</BookParagraph>
<BookParagraph>假设某次累计时间为四十毫秒，步长约十六点七毫秒，则推进两步，剩余约六点七毫秒，插值比例约零点四。下一次绘制只需继续累计剩余量；若每帧清空余量，就会持续少算时间，运动逐渐变慢。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>暂停与慢动作的归属</PageTitle><BookParagraph>暂停菜单的闪烁可以使用界面时钟，角色运动与受击计时则使用游戏时钟。慢动作只缩放游戏时间时，按钮仍能正常响应。先决定倒计时属于哪条时钟，再选择变量，避免暂停后护盾过期或菜单停止动画。</BookParagraph><div className="overflow-x-auto my-4"><table className="w-full text-sm border-collapse"><thead><tr className="border-b-2"><th className="text-left p-2 font-semibold">时间机制</th><th className="text-left p-2 font-semibold">控制对象</th><th className="text-left p-2 font-semibold">容易混淆的结果</th></tr></thead><tbody><tr className="border-b"><td className="p-2">固定模拟步</td><td className="p-2">位置、速度、碰撞</td><td className="p-2">不是精灵每秒显示几张图</td></tr><tr className="border-b"><td className="p-2">动画播放时间</td><td className="p-2">动作帧与脚步事件</td><td className="p-2">暂停时是否继续需明确</td></tr><tr className="border-b"><td className="p-2">渲染间隔</td><td className="p-2">屏幕何时刷新</td><td className="p-2">不能直接决定游戏速度</td></tr></tbody></table></div></div>) },
  { label: "从姿态到可读动作", left: (<div className="space-y-4"><PageTitle>从姿态到可读动作</PageTitle><BookParagraph>关键姿态不仅表示位置，也帮助玩家预测结果。一次挥击可以分为前摇、有效攻击、后摇：前摇提示危险，有效阶段开放伤害检测，后摇限制连续行动。美术帧可以替换，规则窗口仍以逻辑时间为准，避免换皮后攻击范围突然改变。</BookParagraph>
<BookParagraph>例如攻击总长零点六秒，前零点二秒蓄力，中间零点一秒有效，剩余恢复。若玩家在零点二五秒被打断，规则必须说明已命中的伤害是否保留、后续窗口是否关闭；这属于战斗规则，不能交给动画最后一帧碰巧决定。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>插值曲线与运动含义</PageTitle><BookParagraph>线性插值适合匀速从起点到终点；缓入缓出使界面移动柔和，但若用于真实弹道会改变速度。对于固定时长过渡，可先将经过时间除以总时长并限制在零到一，再把该比例送入曲线，最后计算显示值。</BookParagraph>
<BookParagraph>每帧把当前位置向目标靠近固定百分比，是另一类指数趋近，通常不会在有限帧内精确抵达。若要跨刷新率保持一致，需要让比例依赖时间差；若要求零点三秒准时结束，则应记录起始时间和起终点。</BookParagraph></div>) },
  { label: "跳帧也不能丢事件", left: (<div className="space-y-4"><PageTitle>跳帧也不能丢事件</PageTitle><BookParagraph>脚步点设在循环的零点二五秒，周期半秒。从零点一跳到零点九秒时，跨过零点二五和零点七五两个事件，不能只检查当前帧号。用单调增长的播放时间统计跨过的事件，再取模选择图片，可以把事件完整性与显示帧分开。</BookParagraph>
<BookParagraph>区间约定为左开右闭：前一次已经处理到零点二五秒，下一段从这里开始就不能再触发同一个脚步。循环回卷、反向播放和跳转进度需要另外定义规则；直接把所有变化都当正常前进会误播一串音效。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>用数字检查事件区间</PageTitle><BookParagraph>下面的函数假定时间单调前进、周期为正且事件点位于一个周期内。输出是区间内事件数量，调用方再决定播放、合并或丢弃过多脚步声。它展示数学计数，不包含音频设备与资源加载，便于独立验证。</BookParagraph><BookParagraph>JavaScript；浏览器控制台或 Node.js 独立运行。输入与预期输出见注释。</BookParagraph><BookCode language="javascript" showLineNumbers code={"// 输入：上一动画时刻、当前时刻、周期、周期内事件点\n// 只统计 (from, to]，避免连续两次重复触发边界事件\nfunction countEvents(from, to, period, eventAt) {\n  return Math.floor((to - eventAt) / period)\n       - Math.floor((from - eventAt) / period);\n}\nconsole.log(countEvents(0.10, 0.90, 0.5, 0.25)); // 2\nconsole.log(countEvents(0.25, 0.75, 0.5, 0.25)); // 1"} /></div>) },
  { label: "锚点和根运动", left: (<div className="space-y-4"><PageTitle>锚点和根运动</PageTitle><BookParagraph>角色脚底是稳定参考点，武器尖端则是随动作变化的挂点。四张画面里的脚底若分别位于不同高度，即使逻辑坐标完全不变也会抖动。应在导出规格中标记锚点，用叠图与十字线检查，而不是给每帧临时加补偿常数。</BookParagraph>
<BookParagraph>根运动指动画本身携带角色位移。如果物理速度又同时推进相同位移，就会走两次。采用根运动时，应把动画提出的位移交给碰撞系统处理，再反馈实际移动结果；普通二维精灵则通常让规则负责位移，图像仅表达动作。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>从异常反推责任层</PageTitle><BookParagraph>同一时间下逻辑位置不同，先查时间累计和步长；逻辑位置一致而画面跳动，查插值、相机和锚点；动作完整却脚步缺失，查事件区间。分别把这三类数据画成日志，可以用证据定位责任层，不必同时改速度、帧率和素材。</BookParagraph>
<BookParagraph>进一步尝试在后台停留五秒后恢复：记录采取清空余量、限步追赶还是暂停世界的策略。三种选择各有用途，应描述玩家看到的结果及被舍弃的时间，而不是把时间上限误称为精确模拟。</BookParagraph></div>) },
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
