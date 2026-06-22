'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'

const CHAPTERS = [
  { number: 1,  title: '动画基础',     description: '动画的定义、组成与工作流程',         href: '/study/se/game/animation' },
  { number: 2,  title: '游戏设计',      description: '游戏设计的定义、组成与工作流程',     href: '/study/se/game/design' },
  { number: 3,  title: '游戏开发',      description: '游戏开发的定义、组成与工作流程',     href: '/study/se/game/development' },
  { number: 4,  title: '游戏测试',      description: '游戏测试的定义、组成与工作流程',     href: '/study/se/game/testing' },
  { number: 5,  title: '游戏发布',      description: '游戏发布的定义、组成与工作流程',     href: '/study/se/game/release' },
  { number: 6,  title: '实战案例与项目', description: '实战案例的定义、组成与工作流程',     href: '/study/se/game/projects' },
  { number: 7,  title: '游戏引擎',      description: '游戏引擎的定义、组成与工作流程',     href: '/study/se/game/engine' },
  { number: 8,  title: '游戏美术',      description: '游戏美术的定义、组成与工作流程',     href: '/study/se/game/art' },
  { number: 9,  title: '游戏音效',      description: '游戏音效的定义、组成与工作流程',     href: '/study/se/game/sound' },
  { number: 10, title: '游戏策划',      description: '游戏策划的定义、组成与工作流程',     href: '/study/se/game/planning' },
]

export default function GamePage() {
  return (
    <BookCover
      title="动画与游戏设计"
      subtitle="Animation & Game Design"
      description="掌握游戏开发全流程，从创意设计到技术实现，打造引人入胜的游戏作品"
      chapterCount={CHAPTERS.length}
      totalHours={35}
      chapters={CHAPTERS}
      icon="🎮"
      startHref="/study/se/game/animation"
      theme={THEMES.software}
    />
  )
}
