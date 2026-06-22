'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'

const CHAPTERS = [
  { number: 1, title: '开发环境配置', description: 'AI开发环境搭建和工具配置', href: '/study/ai/programming/environment' },
  { number: 2, title: 'Python基础', description: 'AI开发必备的Python编程基础', href: '/study/ai/programming/python' },
  { number: 3, title: 'AI编程规范', description: 'AI项目编程规范和最佳实践', href: '/study/ai/programming/coding-standards' },
  { number: 4, title: 'AI项目开发流程', description: 'AI项目的完整开发流程和管理', href: '/study/ai/programming/workflow' },
  { number: 5, title: 'AI系统架构设计', description: 'AI系统的架构设计和技术选型', href: '/study/ai/programming/architecture' },
  { number: 6, title: '模型部署与优化', description: 'AI模型的部署、监控和性能优化', href: '/study/ai/programming/deployment' },
  { number: 7, title: 'AI项目实战', description: '端到端AI项目开发实战案例', href: '/study/ai/programming/project' },
  { number: 8, title: '常见问题与面试题', description: 'AI开发常见问题和面试准备', href: '/study/ai/programming/interview' },
]

export default function ProgrammingHomePage() {
  return (
    <div className="space-y-8">
      <BookCover
        title="人工智能程序设计"
        subtitle="AI Programming"
        description="掌握人工智能开发所需的编程技能和工程实践，从环境搭建到项目部署的全流程知识。"
        chapterCount={CHAPTERS.length}
        totalHours={200}
        chapters={CHAPTERS}
        icon="💻"
        startHref="/study/ai/programming/environment"
        theme={THEMES.ai}
      />
    </div>
  )
}
