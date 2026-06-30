'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1,  title: '绪论与发展简史',    description: '了解计算机发展历程与学科概要',        href: '/study/computer/composition/intro' },
  { number: 2,  title: '系统结构概述',        description: '掌握冯诺依曼体系与系统结构',          href: '/study/computer/composition/structure' },
  { number: 3,  title: '数据的表示与运算',    description: '学习数据编码、运算方法与实现',        href: '/study/computer/composition/data' },
  { number: 4,  title: '存储系统',            description: '理解层次化存储结构与缓存原理',        href: '/study/computer/composition/storage' },
  { number: 5,  title: '运算器',              description: '掌握ALU结构与算术逻辑运算',           href: '/study/computer/composition/alu' },
  { number: 6,  title: '控制器',              description: '理解指令执行与控制单元设计',          href: '/study/computer/composition/controller' },
  { number: 7,  title: '总线与输入输出',      description: '学习总线结构与各类I/O控制方式',       href: '/study/computer/composition/io' },
  { number: 8,  title: '中央处理器',          description: '深入CPU结构与流水线技术',             href: '/study/computer/composition/cpu' },
  { number: 9,  title: '系统性能与优化',      description: '掌握性能分析方法与优化策略',          href: '/study/computer/composition/performance' },
  { number: 10, title: '学习建议与资源',      description: '获取学习建议与拓展资源',              href: '/study/computer/composition/resources' },
]

const features = [
  { title: '硬件基础', desc: '深入理解计算机硬件的组成与原理' },
  { title: '系统结构', desc: '掌握冯诺依曼体系、总线结构等核心概念' },
  { title: '性能优化', desc: '理解系统瓶颈与优化方法' },
  { title: '理论结合实践', desc: '理论知识与工程实践紧密结合' },
  { title: '面试高频', desc: '各大厂面试常考知识点' },
  { title: '工程素养', desc: '提升系统级思维和工程能力' },
]

const learningPath = [
  { title: '第一阶段：基础与结构', desc: '了解计算机组成的基本概念和系统结构', items: [CHAPTERS[0], CHAPTERS[1]] },
  { title: '第二阶段：数据与存储', desc: '学习数据表示、运算和存储系统', items: [CHAPTERS[2], CHAPTERS[3]] },
  { title: '第三阶段：运算与控制', desc: '掌握运算器、控制器和输入输出系统', items: [CHAPTERS[4], CHAPTERS[5], CHAPTERS[6]] },
  { title: '第四阶段：CPU与性能优化', desc: '深入理解CPU结构和系统性能优化', items: [CHAPTERS[7], CHAPTERS[8]] },
  { title: '第五阶段：学习建议与资源', desc: '获取学习建议和拓展资源', items: [CHAPTERS[9]] },
]

const careerPaths = [
  { title: '嵌入式开发工程师', desc: '嵌入式系统与底层开发', skills: ['单片机', '硬件接口', '驱动开发', '系统移植'] },
  { title: '芯片设计工程师', desc: '芯片架构与设计优化', skills: ['数字电路', 'Verilog/VHDL', '性能优化', '测试验证'] },
  { title: '系统架构师', desc: '系统结构设计与优化', skills: ['系统设计', '性能分析', '安全性', '工程实践'] },
  { title: '硬件研发工程师', desc: '硬件产品研发与测试', skills: ['PCB设计', '硬件调试', '测试仪器', '产品开发'] },
]

export default function CompositionLearningPage() {
  const theme = THEMES.computer

  return (
    <div>
      <BookCover
        title="计算机组成原理"
        subtitle="Computer Organization"
        description="计算机组成原理是理解计算机系统和底层开发的基础。本课程将带你系统学习硬件结构、数据运算、性能优化等内容，提升系统级工程能力。"
        chapterCount={CHAPTERS.length}
        totalHours={7}
        chapters={CHAPTERS}
        icon="🖥️"
        startHref="/study/computer/composition/intro"
        theme={theme}
      />

      {/* 课程特点 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>为什么学习计算机组成原理？</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="rounded-lg p-5 text-center transition-shadow hover:shadow-md" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
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
              <div key={i} className="rounded-lg p-6 transition-shadow hover:shadow-md" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: `${theme.accent}15`, color: theme.accent }}>阶段 {i + 1}</span>
                  <h3 className="text-lg font-bold">{phase.title}</h3>
                </div>
                <p className="text-sm opacity-70 mb-4">{phase.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {phase.items.map((item, j) => (
                    <Link key={j} href={item.href} className="text-sm px-3 py-1.5 rounded-md transition-colors hover:opacity-80" style={{ background: `${theme.accent}0D`, color: theme.accent }}>{item.title}</Link>
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
              <div key={i} className="rounded-lg p-6 transition-shadow hover:shadow-md" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 className="text-lg font-semibold mb-1" style={{ color: theme.accent }}>{career.title}</h3>
                <p className="text-sm opacity-70 mb-4">{career.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 rounded" style={{ background: `${theme.accent}10`, color: theme.accent }}>{skill}</span>
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
                  <li key={i} className="flex items-start gap-2"><CheckCircleOutlined className="mt-0.5" style={{ color: '#22c55e' }} /><span className="text-sm">{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.accent }}>注意事项</h3>
              <ul className="space-y-3">
                {['定期复习和总结，巩固所学知识', '关注系统性能和安全性', '积极参与社区讨论，获取最新资源', '尝试用硬件知识解决实际问题'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircleOutlined className="mt-0.5" style={{ color: '#22c55e' }} /><span className="text-sm">{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
