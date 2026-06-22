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
  chapterTitle: '游戏引擎',
  chapterNumber: 7,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  prevChapter: { label: '实战案例与项目', href: '/study/se/game/projects' },
  nextChapter: { label: '游戏美术', href: '/study/se/game/art' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '游戏引擎',
    left: (
      <div className="space-y-4">
        <PageTitle>游戏引擎概述</PageTitle>
        <BookList items={[
          '游戏引擎的定义与作用：为游戏开发提供底层框架和工具集',
          '游戏引擎的基本组成：渲染引擎、物理引擎、音频系统、脚本系统、资源管理',
          '游戏引擎的工作流程：场景搭建 → 组件配置 → 脚本编写 → 运行调试',
        ]} />
        <BookAlert type="info" message="选择合适的游戏引擎能大幅提升开发效率，Unity 和 Unreal Engine 是当前主流选择" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>游戏引擎示例</PageTitle>
        <BookCode language="javascript" showLineNumbers code={`class GameEngine {
  constructor(name, version) {
    this.name = name;
    this.version = version;
  }
  getInfo() {
    return \`Engine: \${this.name}, Version: \${this.version}\`;
  }
}

const engine = new GameEngine('Unity', '2022.3');
console.log(engine.getInfo());`} />
      </div>
    ),
  },
]

export default function GameEnginePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
