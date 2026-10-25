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
        <BookParagraph>以拾取金币为例，键盘层只产生向右动作，规则层计算新位置并删除金币，最后发出收集事件，界面与音效分别响应。即使声音加载失败，金币仍只会收集一次。这种单向数据流让错误能被定位到具体步骤，也让规则可以脱离画面执行。</BookParagraph>
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
        <BookCode language="javascript" showLineNumbers code={"// JavaScript：浏览器控制台或 Node.js\nfunction advance(state, action) {\n  if (state.phase !== 'playing') return state;\n  const dx = { left: -1, right: 1, wait: 0 }[action];\n  if (dx === undefined) return state;\n  const x = state.x + dx;\n  if (x < 0 || x > 4) return state;\n  const collected = state.coins.includes(x);\n  const coins = state.coins.filter(c => c !== x);\n  return { ...state, x, coins,\n    score: state.score + Number(collected),\n    phase: coins.length === 0 ? 'won' : 'playing' };\n}\nconst initial = { phase: 'playing', x: 0, score: 0, coins: [2, 4] };\nconsole.log(advance(advance(initial, 'right'), 'right'));\n// x: 2，score: 1，coins: [4]"} />
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
  { label: "输入的持续量与瞬时量", left: (<div className="space-y-4"><PageTitle>输入的持续量与瞬时量</PageTitle><BookParagraph>向右移动是持续意图，确认开始是一次命令。若把开始按钮按住状态直接用于创建场景，一次长按可能创建几十局；若只在按下事件移动一次，角色又无法连续行走。输入适配层应分别保留当前轴值与本步消费的一次性动作。</BookParagraph>
<BookParagraph>失焦时可能收不到按键抬起，因此切出窗口要清空方向状态或进入暂停。手柄断开也需回到中性输入。多种设备应映射到相同动作名，规则层无需知道向左来自方向键、触摸区还是摇杆。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>在边界固定处理顺序</PageTitle><BookParagraph>每步可按采样动作、计算意图、移动与碰撞、结算事件、提交状态的顺序运行。绘制只读取已提交状态，避免生命已经归零但界面仍显示可操作。对高频输入，说明一个物理步内多个点击是合并、排队还是只取最后一个。</BookParagraph><div className="overflow-x-auto my-4"><table className="w-full text-sm border-collapse"><thead><tr className="border-b-2"><th className="text-left p-2 font-semibold">处理阶段</th><th className="text-left p-2 font-semibold">读取内容</th><th className="text-left p-2 font-semibold">产生内容</th></tr></thead><tbody><tr className="border-b"><td className="p-2">输入采样</td><td className="p-2">设备按下与抬起</td><td className="p-2">动作快照或一次性命令</td></tr><tr className="border-b"><td className="p-2">规则更新</td><td className="p-2">旧状态与动作</td><td className="p-2">新状态和领域事件</td></tr><tr className="border-b"><td className="p-2">表现消费</td><td className="p-2">新状态与事件</td><td className="p-2">画面、音效、界面反馈</td></tr></tbody></table></div></div>) },
  { label: "对象身份和事件身份", left: (<div className="space-y-4"><PageTitle>对象身份和事件身份</PageTitle><BookParagraph>位置不是可靠身份：两个敌人可以在同一位置，一枚金币也可能在旧位置重生。为实体分配稳定编号，为一次攻击分配攻击编号，去重时使用编号组合。集合中记录的是哪一轮攻击已经命中哪一个目标，而不是永久禁止该敌人再次受伤。</BookParagraph>
<BookParagraph>碰撞期间不宜一边遍历数组一边删除任意元素。可以先记录待删除编号，完成检测后统一过滤；新增敌人也放入待加入队列。这让本步参与计算的对象集合固定，避免索引前移造成漏检，以及刚生成的对象在同一步被处理两次。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>配置与运行状态分离</PageTitle><BookParagraph>敌人模板保存速度、半径、掉落类型等默认值，实例保存当前生命、位置和冷却。若所有实例共享一个可变生命字段，击中一个敌人就会影响全部敌人。创建实例时复制需要独立的数据；大型只读纹理与配置则可以共享。</BookParagraph>
<BookParagraph>规则函数输出事件列表时，事件只描述已发生事实，例如金币编号和新增分数。表现层不得通过修改事件来回写规则；需要延迟执行的动作应重新作为下一步输入，并检查当前阶段，防止旧动画完成回调复活已销毁对象。</BookParagraph></div>) },
  { label: "碰撞形状与高速运动", left: (<div className="space-y-4"><PageTitle>碰撞形状与高速运动</PageTitle><BookParagraph>圆形碰撞比较圆心距离与半径和，平方比较可省去开方。矩形碰撞则比较横纵区间是否同时重叠。形状是玩法近似：角色帽子与飘带未必需要伤害盒，但可交互范围必须和画面提示保持一致，并明确恰好接触是否算命中。</BookParagraph>
<BookParagraph>离散检测仅看两个时刻，速度过快时物体可能从墙左侧跳到右侧，两端都没有重叠。缩小步长、对快速物体做扫掠检测或使用引擎连续碰撞方案各有成本；扩大碰撞盒只能掩盖部分问题，也会改变正常碰撞距离。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>两个圆的边界推演</PageTitle><BookParagraph>示例中半径和为五，圆心距离也为五，所以返回真；距离变为六则返回假。先用这些手算数据检查量纲与边界，再接入真实角色坐标。视觉缩放后若半径仍采用旧单位，算法正确也会产生错误结果。</BookParagraph><BookParagraph>JavaScript；浏览器控制台或 Node.js 独立运行。输入与预期输出见注释。</BookParagraph><BookCode language="javascript" showLineNumbers code={"// 输入：玩家圆、敌人圆；坐标与半径使用相同单位\n// 输出：是否相交；本例约定恰好接触也算碰撞\nfunction circlesTouch(a, b) {\n  const dx = a.x - b.x, dy = a.y - b.y;\n  return dx * dx + dy * dy <= (a.r + b.r) ** 2;\n}\nconst p = { x: 0, y: 0, r: 2 };\nconsole.log(circlesTouch(p, { x: 5, y: 0, r: 3 })); // true\nconsole.log(circlesTouch(p, { x: 6, y: 0, r: 3 })); // false"} /></div>) },
  { label: "异步加载如何归属本局", left: (<div className="space-y-4"><PageTitle>异步加载如何归属本局</PageTitle><BookParagraph>场景一请求地图后，玩家立刻返回菜单并开始场景二；旧请求稍后完成，不能把第一张地图塞进第二局。可以给每次场景启动分配会话编号，异步返回时同时检查编号和阶段，过期结果只释放资源而不修改当前世界。</BookParagraph>
<BookParagraph>资源缓存解决重复加载，不能替代生命周期管理。缓存纹理可保留，旧场景的监听器、循环计时器和临时音源仍应由所属场景清理。把创建与销毁成对写在同一模块，比依赖全局重置函数猜测清理范围更稳妥。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>先定位预算再优化结构</PageTitle><BookParagraph>假设一帧更新花两毫秒、绘制花十二毫秒，优化输入函数节省零点一毫秒并不能解决主要瓶颈。记录对象数量、绘制批次与资源尺寸，做一次只关闭粒子或只隐藏背景的实验，再判断成本来自逻辑还是图形。</BookParagraph>
<BookParagraph>对象池适合频繁创建销毁且已测得分配压力的对象，但复用时必须重置速度、生命、回调和活动标记。若漏掉其中一项，第二次出生的敌人会带着上一轮状态。先保证状态可完整重建，再考虑复用内存。</BookParagraph></div>) },
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
