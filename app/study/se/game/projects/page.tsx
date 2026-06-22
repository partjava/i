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
  chapterTitle: '实战案例与项目',
  chapterNumber: 6,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  prevChapter: { label: '游戏发布', href: '/study/se/game/release' },
  nextChapter: { label: '游戏引擎', href: '/study/se/game/engine' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '实战案例与项目',
    left: (
      <div className="space-y-4">
        <PageTitle>实战案例概述</PageTitle>
        <BookList items={[
          '实战案例的定义与作用：通过真实项目巩固所学知识与技能',
          '实战案例的基本组成：需求分析、架构设计、编码实现、测试部署',
          '实战案例的工作流程：项目规划 → 分步实现 → 调试优化 → 总结复盘',
        ]} />
        <BookAlert type="info" message="动手实践是掌握游戏开发最有效的方式，每个案例都是能力提升的阶梯" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实战案例示例</PageTitle>
        <BookCode language="javascript" showLineNumbers code={`class Game {
  constructor(name, genre) {
    this.name = name;
    this.genre = genre;
  }
  getInfo() {
    return \`Game: \${this.name}, Genre: \${this.genre}\`;
  }
}

const projectGame = new Game('迷宫逃脱', '解谜');
console.log(projectGame.getInfo());`} />
      </div>
    ),
  },
]

export default function GameProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
