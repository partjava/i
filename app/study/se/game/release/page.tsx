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
  chapterTitle: '游戏发布',
  chapterNumber: 5,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  prevChapter: { label: '游戏测试', href: '/study/se/game/testing' },
  nextChapter: { label: '实战案例与项目', href: '/study/se/game/projects' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '游戏发布',
    left: (
      <div className="space-y-4">
        <PageTitle>游戏发布概述</PageTitle>
        <BookList items={[
          '游戏发布的定义与作用：将游戏产品推向目标玩家和市场',
          '游戏发布的基本组成：平台选择、版本管理、分发渠道、营销推广',
          '游戏发布的工作流程：最终测试 → 打包构建 → 上架审核 → 上线运营 → 持续更新',
        ]} />
        <BookAlert type="info" message="游戏发布不是终点，上线后的数据分析和版本迭代同样重要" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>游戏发布示例</PageTitle>
        <BookCode language="javascript" showLineNumbers code={`class Game {
  constructor(name, genre) {
    this.name = name;
    this.genre = genre;
  }
  getInfo() {
    return \`Game: \${this.name}, Genre: \${this.genre}\`;
  }
}

const releaseGame = new Game('方块世界', '沙盒');
console.log(releaseGame.getInfo());`} />
      </div>
    ),
  },
]

export default function GameReleasePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
