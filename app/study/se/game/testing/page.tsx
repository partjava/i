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
