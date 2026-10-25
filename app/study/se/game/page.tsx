'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'

const CHAPTERS = [
  { number: 1,  title: '动画基础',     description: '时间步长、插值、精灵动画与暂停恢复',         href: '/study/se/game/animation' },
  { number: 2,  title: '游戏设计',      description: '核心循环、原型验证、风险收益与规则迭代',     href: '/study/se/game/design' },
  { number: 3,  title: '游戏开发',      description: '输入与规则分离、碰撞结算与资源生命周期',     href: '/study/se/game/development' },
  { number: 4,  title: '游戏测试',      description: '状态边界、确定性重放、故障注入与性能证据',     href: '/study/se/game/testing' },
  { number: 5,  title: '游戏发布',      description: '平台导出、干净环境验证、存档与回退',     href: '/study/se/game/release' },
  { number: 6,  title: '实战案例与项目', description: '躲避小游戏的纵向切片、结算与重试',     href: '/study/se/game/projects' },
  { number: 7,  title: '游戏引擎',      description: '节点生命周期、坐标系统与物理移动',     href: '/study/se/game/engine' },
  { number: 8,  title: '游戏美术',      description: '视觉层级、图集锚点、纹理预算与导入',     href: '/study/se/game/art' },
  { number: 9,  title: '游戏音效',      description: '音频总线、包络、混音并发与场景清理',     href: '/study/se/game/sound' },
  { number: 10, title: '游戏策划',      description: '可执行规则、数值曲线、排期与变更评审',     href: '/study/se/game/planning' },
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
