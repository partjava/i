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
  chapterTitle: '动画基础',
  chapterNumber: 1,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  nextChapter: { label: '游戏设计', href: '/study/se/game/design' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '动画基础',
    left: (
      <div className="space-y-4">
        <PageTitle>动画概述</PageTitle>
        <BookList items={[
          '动画的定义与作用：通过连续播放一系列静态图像产生运动视觉效果',
          '动画的基本组成：帧、时间线、补间动画、关键帧',
          '动画的工作流程：概念设计 → 原画绘制 → 中间帧生成 → 后期合成',
        ]} />
        <BookAlert type="info" message="动画是游戏开发的基础，连贯的动画效果能极大提升游戏体验和沉浸感" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>动画示例</PageTitle>
        <BookCode language="javascript" showLineNumbers code={`class Animation {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }
  play() {
    return \`Playing \${this.name} for \${this.duration} seconds\`;
  }
}

const runAnim = new Animation('跑步', 2);
console.log(runAnim.play());`} />
      </div>
    ),
  },
]

export default function AnimationBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
