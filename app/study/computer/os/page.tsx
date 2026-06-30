'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1,  title: '操作系统概述',       description: '了解操作系统的基本概念和发展历程',     href: '/study/computer/os/intro' },
  { number: 2,  title: '进程与线程管理',       description: '掌握进程、线程的定义与管理机制',       href: '/study/computer/os/process' },
  { number: 3,  title: '内存管理',             description: '掌握内存分配、页面置换等核心机制',     href: '/study/computer/os/memory' },
  { number: 4,  title: '文件系统',             description: '了解文件系统结构与分配方式',           href: '/study/computer/os/file' },
  { number: 5,  title: '输入输出与设备管理',   description: '掌握I/O系统结构与设备管理原理',        href: '/study/computer/os/io' },
  { number: 6,  title: '调度算法',             description: '深入理解各种调度算法的原理与对比',     href: '/study/computer/os/schedule' },
  { number: 7,  title: '进程同步与互斥',       description: '掌握同步互斥机制与经典问题',           href: '/study/computer/os/sync' },
  { number: 8,  title: '死锁与避免',           description: '理解死锁的四个必要条件与应对策略',     href: '/study/computer/os/deadlock' },
  { number: 9,  title: '操作系统安全',         description: '了解安全目标、认证与防护机制',         href: '/study/computer/os/security' },
  { number: 10, title: '实战与面试',           description: '综合运用OS知识解决实际与面试问题',     href: '/study/computer/os/projects' },
]

const osFeatures = [
  { title: '系统核心', desc: '操作系统是计算机系统的核心软件' },
  { title: '资源管理', desc: '高效管理CPU、内存、设备等资源' },
  { title: '并发与同步', desc: '支持多进程、多线程并发与同步' },
  { title: '安全保障', desc: '提供系统安全与访问控制机制' },
  { title: '面试高频', desc: '各大厂面试必考知识点' },
  { title: '实战导向', desc: '理论结合实践，提升系统开发能力' },
]

const learningPath = [
  { title: '第一阶段：操作系统基础', desc: '了解操作系统的基本概念和发展', items: [CHAPTERS[0]] },
  { title: '第二阶段：进程与内存管理', desc: '掌握进程、线程和内存管理机制', items: [CHAPTERS[1], CHAPTERS[2]] },
  { title: '第三阶段：文件与设备管理', desc: '学习文件系统和设备管理原理', items: [CHAPTERS[3], CHAPTERS[4]] },
  { title: '第四阶段：调度与同步', desc: '深入理解调度算法、同步与死锁', items: [CHAPTERS[5], CHAPTERS[6], CHAPTERS[7]] },
  { title: '第五阶段：安全与实战', desc: '关注安全问题，提升实战能力', items: [CHAPTERS[8], CHAPTERS[9]] },
]

const careerPaths = [
  { title: '系统开发工程师', desc: '操作系统、驱动开发与优化', skills: ['内核开发', '驱动编程', '性能调优', '系统移植'] },
  { title: '运维工程师', desc: '系统部署、维护与安全', skills: ['自动化运维', '安全加固', '监控报警', '故障排查'] },
  { title: '嵌入式开发工程师', desc: '嵌入式系统与实时操作系统开发', skills: ['嵌入式C', 'RTOS', '硬件接口', '系统裁剪'] },
  { title: '面试与算法岗', desc: '系统原理与算法面试高频考点', skills: ['进程调度', '内存管理', '死锁分析', '系统设计'] },
]

export default function OsLearningPage() {
  const theme = THEMES.computer

  return (
    <div>
      <BookCover
        title="操作系统"
        subtitle="Operating System"
        description="操作系统是计算机系统的核心，负责资源管理、进程调度、内存分配等关键任务。本课程将带你系统学习操作系统原理，提升系统开发与运维能力。"
        chapterCount={CHAPTERS.length}
        totalHours={8}
        chapters={CHAPTERS}
        icon="⚙️"
        startHref="/study/computer/os/intro"
        theme={theme}
      />

      {/* 课程特点 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>为什么学习操作系统？</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {osFeatures.map((f, i) => (
              <div
                key={i}
                className="rounded-lg p-5 text-center transition-shadow hover:shadow-md"
                style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm opacity-70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 学习路径 */}
      <div className="py-12 sm:py-16" style={{ background: '#f8f6f1' }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>学习路径</h2>
          <div className="space-y-6">
            {learningPath.map((phase, i) => (
              <div
                key={i}
                className="rounded-lg p-6 transition-shadow hover:shadow-md"
                style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{ background: `${theme.accent}15`, color: theme.accent }}
                  >
                    阶段 {i + 1}
                  </span>
                  <h3 className="text-lg font-bold">{phase.title}</h3>
                </div>
                <p className="text-sm opacity-70 mb-4">{phase.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {phase.items.map((item, j) => (
                    <Link
                      key={j}
                      href={item.href}
                      className="text-sm px-3 py-1.5 rounded-md transition-colors hover:opacity-80"
                      style={{ background: `${theme.accent}0D`, color: theme.accent }}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 职业发展 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>职业发展方向</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {careerPaths.map((career, i) => (
              <div
                key={i}
                className="rounded-lg p-6 transition-shadow hover:shadow-md"
                style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <h3 className="text-lg font-semibold mb-1" style={{ color: theme.accent }}>{career.title}</h3>
                <p className="text-sm opacity-70 mb-4">{career.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ background: `${theme.accent}10`, color: theme.accent }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 学习建议 */}
      <div className="py-12 sm:py-16" style={{ background: '#f8f6f1' }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>学习建议</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.accent }}>学习方法</h3>
              <ul className="space-y-3">
                {['按照推荐的学习路径循序渐进，打好基础', '多动手实践，理论结合实际', '遇到不懂的概念可以随时回顾之前的内容', '多阅读经典书籍和优秀开源项目'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircleOutlined className="mt-0.5" style={{ color: '#22c55e' }} />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.accent }}>注意事项</h3>
              <ul className="space-y-3">
                {['定期复习和总结，巩固所学知识', '关注系统安全和性能优化', '积极参与社区讨论，获取最新资源', '尝试用操作系统知识解决实际问题，提升实战能力'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircleOutlined className="mt-0.5" style={{ color: '#22c55e' }} />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
