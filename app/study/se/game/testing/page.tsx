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
  chapterTitle: '游戏测试',
  chapterNumber: 4,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  prevChapter: { label: '游戏开发', href: '/study/se/game/development' },
  nextChapter: { label: '游戏发布', href: '/study/se/game/release' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: "把体验拆成可验证行为",
    left: (
      <div className="space-y-4">
        <PageTitle>把体验拆成可验证行为</PageTitle>
        <BookParagraph>游戏测试既检验规则正确性，也检查操作、画面、声音和性能能否共同完成一局。先把“能正常玩”拆成开始后可控制、暂停后世界停止、死亡后仅结算一次、重试后状态清空等断言。每条断言明确初始条件、输入和预期结果，才有重复执行的价值。</BookParagraph>
        <BookParagraph>测试需要区分规则错误与体验问题。生命值降到负数是明确的状态错误；危险提示太晚则要结合目标设备、预告时间与玩家行为判断。前者适合自动断言，后者需要可重复场景与观察记录，两种证据共同覆盖游戏质量。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>状态机与边界</PageTitle>
        <BookParagraph>用状态机组织用例：菜单到游戏、游戏到暂停、暂停到游戏、游戏到结束、结束到重试。除了合法路径，还要试结束后继续受伤、暂停时拾取、加载中连按开始等非法动作。时间边界尤其重要：无敌结束前一毫秒、正好到期、刚过期应分别验证。</BookParagraph>
        <SectionTitle>实施顺序</SectionTitle>
        <BookList ordered items={["先列状态转换表和不变量，再选择单元、集成或人工检查层。", "保存复现所需的输入与种子；修复后验证测试能识别原错误。"]} />
      </div>
    ),
  },
  {
    label: "构造稳定复现",
    left: (
      <div className="space-y-4">
        <PageTitle>构造稳定复现</PageTitle>
        <BookParagraph>随机游戏需要保存种子、动作序列和时间步长；否则“偶尔穿墙”很难再次观察。缺陷记录应包含版本、设备、关卡、前置状态、最短步骤和证据。先用固定敌人位置复现，再恢复随机生成，能区分碰撞算法错误与随机内容配置错误。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>自动断言规则</PageTitle>
        <BookParagraph>下面测试同一次攻击不能重复扣血，以及生命值不能低于零。使用严格断言，运行失败就抛出异常。被结束阶段忽略的事件应保持原状态；这样即使碰撞回调在同帧到达两次，也不会重复发奖或重复展示结算面板。</BookParagraph>
        <BookParagraph>Node.js CommonJS，无外部测试框架；攻击编号是本次攻击实例标识。</BookParagraph>
        <BookCode language="javascript" showLineNumbers code={"// 保存为 damage.cjs，使用 Node.js 运行\nconst assert = require('node:assert/strict');\nfunction hit(s, attackId) {\n  if (s.phase !== 'playing' || s.seen.includes(attackId)) return s;\n  const hp = Math.max(0, s.hp - 1);\n  return { hp, phase: hp === 0 ? 'over' : 'playing',\n    seen: [...s.seen, attackId] };\n}\nconst start = { hp: 1, phase: 'playing', seen: [] };\nconst dead = hit(start, 'sword-1');\nassert.equal(dead.hp, 0);\nassert.equal(dead.phase, 'over');\nassert.deepEqual(hit(dead, 'sword-1'), dead);\nassert.deepEqual(hit(dead, 'sword-2'), dead);\nassert.equal(start.hp, 1);\nconsole.log('damage boundary checks passed');"} />
      </div>
    ),
  },
  {
    label: "性能与兼容性",
    left: (
      <div className="space-y-4">
        <PageTitle>性能与兼容性</PageTitle>
        <BookParagraph>性能测试要描述负载：敌人数、粒子数、音效并发、持续时长和目标设备。平均帧率可能掩盖加载尖峰，需观察帧时间分布与最差卡顿。兼容性覆盖窗口缩放、失焦、切回应用、音频未授权、控制器断开和低存储空间，不只是另一台电脑能打开。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>缺陷与回归</PageTitle>
        <BookParagraph>严重程度描述影响，优先级描述修复顺序，两者不应混用。存档损坏即使罕见也可能阻止发布；轻微纹理闪烁可记录后处理。修复完成后先重跑原复现步骤，再回归关联规则：改无敌时间后，还需检查暂停、死亡和连续攻击。</BookParagraph>
        <SectionTitle>常见错误</SectionTitle>
        <BookList items={["只走通主流程，遗漏暂停、死亡、重试之间的非法输入。", "测试和实现用同样错误的公式计算预期，导致两者一起错也通过。"]} />
      </div>
    ),
  },
  { label: "用等价类压缩用例", left: (<div className="space-y-4"><PageTitle>用等价类压缩用例</PageTitle><BookParagraph>输入空间很大，但同一规则下许多输入行为相似。生命值可分正数、零、非法负数；存档可分正常、缺字段、类型错误、未来版本。每类选择代表值后，再补充边界点，比随机点击一百次更容易说明覆盖范围。</BookParagraph>
<BookParagraph>等价类来自规则，不是机械套表。若不同攻击类型有不同免疫机制，就不能把所有攻击看作一类。同一攻击重复命中、不同攻击同时命中、攻击在无敌到期时命中，应分别列出初始状态和预期生命值。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>避免守卫掩盖测试缺口</PageTitle><BookParagraph>原示例从一点生命开始，第一次命中立即死亡；后面的重复攻击被结束状态拦住，无法单独证明攻击去重有效。增加三点生命的场景，同编号命中两次仍剩两点，再用新编号降到一点，才能隔离两条守卫各自的效果。</BookParagraph><div className="overflow-x-auto my-4"><table className="w-full text-sm border-collapse"><thead><tr className="border-b-2"><th className="text-left p-2 font-semibold">测试层次</th><th className="text-left p-2 font-semibold">代表输入</th><th className="text-left p-2 font-semibold">能回答的问题</th></tr></thead><tbody><tr className="border-b"><td className="p-2">规则单元</td><td className="p-2">状态对象与动作序列</td><td className="p-2">扣血、计分与去重是否正确</td></tr><tr className="border-b"><td className="p-2">场景集成</td><td className="p-2">加载、切场景、重试</td><td className="p-2">模块之间是否残留回调</td></tr><tr className="border-b"><td className="p-2">目标设备体验</td><td className="p-2">真实输入与密集音画</td><td className="p-2">可读性、延迟与卡顿是否可接受</td></tr></tbody></table></div></div>) },
  { label: "重放需要完整的外部输入", left: (<div className="space-y-4"><PageTitle>重放需要完整的外部输入</PageTitle><BookParagraph>只保存随机种子不足以保证重放。若调用随机数的顺序改变，或者碰撞遍历顺序不同，后续结果就可能分叉。记录固定步长、规则版本、初始配置、每步动作及所有外部结果，重放时避免读取当前日期或真实网络响应。</BookParagraph>
<BookParagraph>相同种子在不同运行环境也不自动保证浮点运算与引擎物理完全一致。课程原型可先在相同版本同一运行环境验证逐步一致，再讨论跨设备要求。不要把“我本机两次相同”扩大为所有平台都确定。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>找出第一个分叉步骤</PageTitle><BookParagraph>比较重放结果时，最终分数不同只能说明发生了偏差。更有效的是每隔若干步保存规范化状态摘要，定位第一个不同区间，再逐步比较玩家位置、敌人编号与随机调用次数。实体先按编号排序，排除数组顺序造成的无意义差别。</BookParagraph>
<BookParagraph>最短复现应保留触发缺陷所需的最少条件。把一局两分钟缩短到第三百步的两枚敌人相撞，能显著缩短修复迭代。删去无关粒子和声音时应确认缺陷仍存在，避免把真正的时序条件一起删掉。</BookParagraph></div>) },
  { label: "时间边界怎样选择", left: (<div className="space-y-4"><PageTitle>时间边界怎样选择</PageTitle><BookParagraph>无敌期若截止在第一千毫秒，就需要明确等于截止值时能否受伤。先写出比较符号，再测九百九十九、一千、一千零一三个时刻。浮点秒数的近似可能让手工输入刚好边界不稳定，规则测试可采用整数步号或整数毫秒。</BookParagraph>
<BookParagraph>暂停时若有效游戏时钟不前进，无敌剩余时间也应不变；若产品规定现实时间护盾，则应反向验证它确实继续流逝。测试不是替规则做决定，而是把决定固化为可重复的证据，含糊处先记录为规则问题。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>独立运行边界样例</PageTitle><BookParagraph>下面只验证到期比较，不依赖真实等待和计时器。用传入的时间值能立即覆盖三个边界，也不会因为机器繁忙偶尔失败。接入游戏后还需另测暂停时钟和碰撞结算顺序，不能用单元结果替代整个场景。</BookParagraph><BookParagraph>JavaScript；浏览器控制台或 Node.js 独立运行。输入与预期输出见注释。</BookParagraph><BookCode language="javascript" showLineNumbers code={"// 时间单位：整数毫秒；到期时刻起允许再次受伤\nfunction canDamage(nowMs, immuneUntilMs) {\n  return nowMs >= immuneUntilMs;\n}\nconst cases = [[999, false], [1000, true], [1001, true]];\nfor (const [now, expected] of cases) {\n  if (canDamage(now, 1000) !== expected) throw Error('boundary');\n}\nconsole.log('3 immunity boundaries passed');"} /></div>) },
  { label: "性能证据与压力模型", left: (<div className="space-y-4"><PageTitle>性能证据与压力模型</PageTitle><BookParagraph>一千帧中有九百九十帧耗十毫秒，十帧耗二百毫秒，平均值约十一点九毫秒，看起来低于六十帧预算，却仍有明显停顿。报告中同时列中位数、高分位帧时间、最大值及卡顿发生阶段，说明统计区间是否包含加载。</BookParagraph>
<BookParagraph>压力场景要固定敌人数、粒子数、分辨率和音源数。先热身，再记录稳定运行区间；另外单独观察首次加载与首次播放。重复场景若内存持续上涨，检查是否仍有活对象和监听器，而不只看释放按钮是否被调用。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>故障注入让恢复路径可见</PageTitle><BookParagraph>主动让一张纹理加载失败、音频解码失败或存档内容截断，观察能否显示占位、保持规则继续运行或保护旧档。注入点应可控且可关闭，日志包含阶段与资源标识，这比等待线上偶发失败更容易验证恢复设计。</BookParagraph>
<BookParagraph>修复后先重跑原始缺陷，再选择共享机制的相邻场景。比如修复重试监听重复后，应测菜单返回、连续重开和加载中退出；只检查正常第一局没有问题，无法证明生命周期漏洞已经关闭。</BookParagraph></div>) },
  {
    label: "练习：击穿结算边界",
    left: (
      <div className="space-y-4">
        <PageTitle>练习：击穿结算边界</PageTitle>
        <BookParagraph>为三点生命值的角色写测试清单：同一攻击重复、两种攻击同帧、暂停受伤、最后一点生命值被命中、死亡后再次被命中、重试后再次受伤。先写预期，再执行；若规则对同帧攻击尚无定义，先记录待确认问题。</BookParagraph>
        <BookAlert type="info" message={"增加暂停守卫、重试和一次攻击重复过滤的边界断言，并进行一次故障注入验证。"} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收与资料</PageTitle>
        <BookParagraph>验收至少八条可重复用例，并含三条非法状态转换；自动断言运行成功后，再故意删掉重复攻击过滤，确认对应测试会失败。交付一条完整缺陷单和修复后的回归记录，不能只提交“已测通过”的截图。</BookParagraph>
        <SectionTitle>参考思路</SectionTitle>
        <BookParagraph>参考思路：补一例hp为二的重复攻击，确保测试没有被死亡守卫掩盖；攻击记录应按攻击生命周期清理，避免无限增长。</BookParagraph>
        <SectionTitle>官方资料</SectionTitle>
        <BookParagraph><a href="https://nodejs.org/api/assert.html" target="_blank" rel="noreferrer">Node.js：严格断言</a></BookParagraph>
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/tutorials/performance/general_optimization.html" target="_blank" rel="noreferrer">Godot：性能定位</a></BookParagraph>
      </div>
    ),
  },
]

export default function GameTestingPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
