'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookCode,
  BookAlert,
  BookList,
} from '@/app/components/ui/book/BookContent'

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
    label: '游戏策划',
    left: (
      <div className="space-y-4">
        <PageTitle>游戏策划概述</PageTitle>
        <BookList items={[
          '游戏策划的定义与作用：从市场与玩家视角规划游戏产品方向',
          '游戏策划的基本组成：市场调研、玩法设计、数值平衡、商业化设计',
          '游戏策划的工作流程：立项分析 → 策划案撰写 → 原型验证 → 数据调优',
        ]} />
        <BookAlert type="info" message="游戏策划是游戏开发的蓝图，优秀的策划能准确把握玩家需求与市场趋势" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>游戏策划示例</PageTitle>
        <BookCode language="javascript" showLineNumbers code={`class GamePlanning {
  constructor(name, genre) {
    this.name = name;
    this.genre = genre;
  }
  getInfo() {
    return \`Planning: \${this.name}, Genre: \${this.genre}\`;
  }
}

const plan = new GamePlanning('我的世界', '沙盒');
console.log(plan.getInfo());`} />
      </div>
    ),
  },
]

export default function GamePlanningPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
