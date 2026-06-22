'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1, title: '软件架构基础', description: '理解软件架构的定义、作用与核心设计原则', href: '/study/se/architecture-design/basic' },
  { number: 2, title: '主流架构风格', description: '掌握分层、微服务、事件驱动等主流架构风格', href: '/study/se/architecture-design/styles' },
  { number: 3, title: '常用设计模式', description: '深入学习23种经典设计模式及其应用场景', href: '/study/se/architecture-design/patterns' },
  { number: 4, title: '架构与设计模式实战', description: '通过电商、支付、日志等案例进行实战演练', href: '/study/se/architecture-design/practice' },
  { number: 5, title: '常见面试题与答疑', description: '汇总架构设计与设计模式高频面试题', href: '/study/se/architecture-design/interview' },
]

const features = [
  { icon: '🏗️', title: '系统架构', desc: '掌握软件系统架构设计原理' },
  { icon: '🎯', title: '设计模式', desc: '深入理解23种经典设计模式' },
  { icon: '⚡', title: '实战导向', desc: '结合真实项目案例学习' },
  { icon: '💡', title: '面试指导', desc: '常见架构设计面试题解析' },
]

const roadmap = [
  {
    phase: '基础架构',
    topics: ['软件架构基础'],
    duration: '2周',
  },
  {
    phase: '架构风格',
    topics: ['主流架构风格'],
    duration: '2周',
  },
  {
    phase: '设计模式',
    topics: ['常用设计模式'],
    duration: '2周',
  },
  {
    phase: '实战应用',
    topics: ['架构与设计模式实战', '常见面试题与答疑'],
    duration: '2周',
  },
]

const topicLinks: { [key: string]: string } = {
  '软件架构基础': '/study/se/architecture-design/basic',
  '主流架构风格': '/study/se/architecture-design/styles',
  '常用设计模式': '/study/se/architecture-design/patterns',
  '架构与设计模式实战': '/study/se/architecture-design/practice',
  '常见面试题与答疑': '/study/se/architecture-design/interview',
}

export default function ArchitectureDesignPage() {
  const theme = THEMES.software

  return (
    <div>
      <BookCover
        title="架构与设计模式"
        subtitle="Architecture & Design Patterns"
        description="系统学习软件架构设计核心理念与经典设计模式，从分层架构到微服务，从创建型模式到行为型模式，全面提升系统设计能力"
        chapterCount={CHAPTERS.length}
        totalHours={20}
        chapters={CHAPTERS}
        icon="🏗️"
        startHref="/study/se/architecture-design/basic"
        theme={theme}
      />

      {/* 课程特色 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>🌟 课程特色</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="rounded-lg p-5 text-center transition-shadow hover:shadow-md" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm opacity-70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 学习路径 */}
      <div className="py-12 sm:py-16" style={{ background: theme.paperCard || theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>🗺️ 学习路径</h2>
          <div className="space-y-6">
            {roadmap.map((phase, index) => (
              <div key={index} className="relative">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 text-white" style={{ background: theme.accent }}>
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold">{phase.phase}</h3>
                  <span className="ml-auto text-sm opacity-60">{phase.duration}</span>
                </div>
                <div className="ml-12 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {phase.topics.map((topic, topicIndex) => (
                    <Link
                      key={topicIndex}
                      href={topicLinks[topic] || '#'}
                      className="text-sm rounded px-3 py-1 transition-colors"
                      style={{ background: 'rgba(0,0,0,0.04)', color: 'inherit' }}
                    >
                      {topic}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 先修知识与职业方向 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme.accent }}>📚 先修知识</h3>
            <ul className="space-y-2">
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>面向对象编程基础</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>常用编程语言（Java/Python）</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>数据结构与算法</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>数据库基础</li>
            </ul>
          </div>
          <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme.accent }}>💼 职业方向</h3>
            <div className="space-y-3">
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <div className="font-medium">软件架构师</div>
                <div className="text-sm opacity-70">系统架构设计与规划</div>
              </div>
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <div className="font-medium">技术总监</div>
                <div className="text-sm opacity-70">技术团队管理与决策</div>
              </div>
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <div className="font-medium">高级开发工程师</div>
                <div className="text-sm opacity-70">复杂系统设计开发</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
