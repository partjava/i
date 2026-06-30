'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
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
    label: '游戏开发',
    left: (
      <div className="space-y-4">
        <PageTitle>游戏开发概述</PageTitle>
        <BookList items={[
          '游戏开发的定义与作用：将设计转化为可运行的游戏软件',
          '游戏开发的基本组成：引擎选择、架构设计、编码实现、资源集成',
          '游戏开发的工作流程：需求分析 → 技术选型 → 迭代开发 → 集成测试',
        ]} />
        <BookAlert type="info" message="游戏开发需要综合运用编程、美术、音效等多学科知识，团队协作是关键" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>游戏开发示例</PageTitle>
        <BookCode language="javascript" showLineNumbers code={`class Game {
  constructor(name, genre) {
    this.name = name;
    this.genre = genre;
  }
  getInfo() {
    return \`Game: \${this.name}, Genre: \${this.genre}\`;
  }
}

const newGame = new Game('太空探险', 'ACT');
console.log(newGame.getInfo());`} />
      </div>
    ),
  },
]

export default function GameDevelopmentPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
