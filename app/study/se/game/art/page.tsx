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
  chapterTitle: '游戏美术',
  chapterNumber: 8,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  prevChapter: { label: '游戏引擎', href: '/study/se/game/engine' },
  nextChapter: { label: '游戏音效', href: '/study/se/game/sound' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '游戏美术',
    left: (
      <div className="space-y-4">
        <PageTitle>游戏美术概述</PageTitle>
        <BookList items={[
          '游戏美术的定义与作用：通过视觉设计塑造游戏的世界观和氛围',
          '游戏美术的基本组成：角色设计、场景设计、UI界面、特效制作',
          '游戏美术的工作流程：概念草图 → 模型制作 → 贴图绘制 → 动画绑定 → 场景整合',
        ]} />
        <BookAlert type="info" message="游戏美术决定了游戏的第一印象，风格统一且精美的美术能显著提升产品品质" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>游戏美术示例</PageTitle>
        <BookCode language="javascript" showLineNumbers code={`class GameArt {
  constructor(name, style) {
    this.name = name;
    this.style = style;
  }
  getInfo() {
    return \`Art: \${this.name}, Style: \${this.style}\`;
  }
}

const art = new GameArt('角色模型', '卡通渲染');
console.log(art.getInfo());`} />
      </div>
    ),
  },
]

export default function GameArtPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
