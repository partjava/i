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
  chapterTitle: '游戏设计',
  chapterNumber: 2,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  prevChapter: { label: '动画基础', href: '/study/se/game/animation' },
  nextChapter: { label: '游戏开发', href: '/study/se/game/development' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '游戏设计',
    left: (
      <div className="space-y-4">
        <PageTitle>游戏设计概述</PageTitle>
        <BookList items={[
          '游戏设计的定义与作用：构建游戏规则、玩法与用户体验',
          '游戏设计的基本组成：游戏机制、关卡设计、叙事、交互反馈',
          '游戏设计的工作流程：创意构思 → 原型设计 → 迭代测试 → 完善优化',
        ]} />
        <BookAlert type="info" message="好的游戏设计能以简单规则创造深度玩法，让玩家在挑战中获得乐趣" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>游戏设计示例</PageTitle>
        <BookCode language="javascript" showLineNumbers code={`class Game {
  constructor(name, genre) {
    this.name = name;
    this.genre = genre;
  }
  getInfo() {
    return \`Game: \${this.name}, Genre: \${this.genre}\`;
  }
}

const myGame = new Game('冒险岛', 'RPG');
console.log(myGame.getInfo());`} />
      </div>
    ),
  },
]

export default function GameDesignPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
