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
  chapterTitle: '游戏音效',
  chapterNumber: 9,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  prevChapter: { label: '游戏美术', href: '/study/se/game/art' },
  nextChapter: { label: '游戏策划', href: '/study/se/game/planning' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '游戏音效',
    left: (
      <div className="space-y-4">
        <PageTitle>游戏音效概述</PageTitle>
        <BookList items={[
          '游戏音效的定义与作用：通过音频增强游戏氛围和交互反馈',
          '游戏音效的基本组成：背景音乐、角色语音、环境音效、UI音效',
          '游戏音效的工作流程：需求分析 → 音效录制/制作 → 音频集成 → 混音调试',
        ]} />
        <BookAlert type="info" message="优质的音效设计能让玩家身临其境，是游戏沉浸感不可或缺的重要组成部分" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>游戏音效示例</PageTitle>
        <BookCode language="javascript" showLineNumbers code={`class GameSound {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  getInfo() {
    return \`Sound: \${this.name}, Type: \${this.type}\`;
  }
}

const sound = new GameSound('战斗BGM', '背景音乐');
console.log(sound.getInfo());`} />
      </div>
    ),
  },
]

export default function GameSoundPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
