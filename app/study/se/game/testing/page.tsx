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
    label: '游戏测试',
    left: (
      <div className="space-y-4">
        <PageTitle>游戏测试概述</PageTitle>
        <BookList items={[
          '游戏测试的定义与作用：发现游戏缺陷，确保产品质量和用户体验',
          '游戏测试的基本组成：功能测试、性能测试、兼容性测试、用户体验测试',
          '游戏测试的工作流程：测试计划 → 用例设计 → 执行测试 → 缺陷跟踪 → 回归验证',
        ]} />
        <BookAlert type="info" message="游戏测试不仅要发现 Bug，还需关注平衡性、流畅度和玩家体验的完整性" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>游戏测试示例</PageTitle>
        <BookCode language="javascript" showLineNumbers code={`class Game {
  constructor(name, genre) {
    this.name = name;
    this.genre = genre;
  }
  getInfo() {
    return \`Game: \${this.name}, Genre: \${this.genre}\`;
  }
}

const testGame = new Game('跑酷达人', '休闲');
console.log(testGame.getInfo());`} />
      </div>
    ),
  },
]

export default function GameTestingPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
