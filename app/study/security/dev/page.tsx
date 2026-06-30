'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1, title: '安全开发基础', description: '了解安全开发核心概念与流程', href: '/study/security/dev/basic' },
  { number: 2, title: '安全编码规范', description: '掌握安全编码标准与规范', href: '/study/security/dev/coding' },
  { number: 3, title: '安全设计模式', description: '学习安全设计模式与架构', href: '/study/security/dev/patterns' },
  { number: 4, title: '安全测试方法', description: '掌握安全测试技术与方法', href: '/study/security/dev/testing' },
  { number: 5, title: '代码审计', description: '学习代码审计流程与技术', href: '/study/security/dev/audit' },
  { number: 6, title: '安全工具使用', description: '掌握常用安全开发工具', href: '/study/security/dev/tools' },
  { number: 7, title: '漏洞修复', description: '学习漏洞修复策略与方法', href: '/study/security/dev/fix' },
  { number: 8, title: '安全部署', description: '掌握安全部署流程与实践', href: '/study/security/dev/deploy' },
  { number: 9, title: '安全运维', description: '了解安全运维核心任务', href: '/study/security/dev/ops' },
  { number: 10, title: '安全项目管理', description: '学习安全项目全生命周期管理', href: '/study/security/dev/project' },
]

const features = [
  { title: '开发实践', desc: '安全开发生命周期管理' },
  { title: '代码安全', desc: '安全编码规范与审计' },
  { title: '漏洞管理', desc: '漏洞发现、修复与防护' },
  { title: 'DevSecOps', desc: '安全融入开发运维流程' },
]

const learningPath = [
  { title: '基础建设', desc: '掌握安全开发基础、编码规范与设计模式', items: [CHAPTERS[0], CHAPTERS[1], CHAPTERS[2]], duration: '3周' },
  { title: '质量保障', desc: '深入安全测试、代码审计、工具使用与漏洞修复', items: [CHAPTERS[3], CHAPTERS[4], CHAPTERS[5], CHAPTERS[6]], duration: '4周' },
  { title: '运营实施', desc: '学习安全部署、安全运维与安全项目管理', items: [CHAPTERS[7], CHAPTERS[8], CHAPTERS[9]], duration: '3周' },
]

const prerequisites = [
  '掌握至少一门编程语言的基础语法',
  '了解基本网络通信原理',
  '熟悉软件开发流程与版本控制',
  '具备基本的操作系统使用经验',
]

const coreSkills = [
  '安全编码实践',
  '代码安全审计',
  '漏洞发现修复',
  'DevSecOps实践',
]

const careerPaths = [
  { title: '安全开发工程师', desc: '安全软件开发专家' },
  { title: 'DevSecOps工程师', desc: '安全融入DevOps流程' },
  { title: '应用安全架构师', desc: '应用安全架构设计' },
]

export default function SecurityDevelopmentPage() {
  const theme = THEMES.security

  return (
    <div>
      <BookCover
        title="安全开发"
        subtitle="Secure Development"
        description="学习安全开发全流程，掌握安全编码、代码审计、漏洞修复等关键技能，构建安全可靠的软件系统"
        chapterCount={CHAPTERS.length}
        totalHours={35}
        chapters={CHAPTERS}
        icon="🛡️"
        startHref="/study/security/dev/basic"
        theme={theme}
      />

      {/* 课程特色 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>课程特色</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="py-12 sm:py-16" style={{ background: '#f5f4f6' }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>学习路径</h2>
          <div className="space-y-6">
            {learningPath.map((phase, i) => (
              <div key={i} className="rounded-lg p-6 transition-shadow hover:shadow-md" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: `${theme.accent}15`, color: theme.accent }}>阶段 {i + 1}</span>
                  <h3 className="text-lg font-bold">{phase.title}</h3>
                  <span className="ml-auto text-xs opacity-60">{phase.duration}</span>
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

      {/* 先修知识与核心技能 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>先修知识与核心技能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.accent }}>先修知识</h3>
              <ul className="space-y-3">
                {prerequisites.map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircleOutlined className="mt-0.5" style={{ color: '#22c55e' }} /><span className="text-sm">{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.accent }}>核心技能</h3>
              <ul className="space-y-3">
                {coreSkills.map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircleOutlined className="mt-0.5" style={{ color: '#22c55e' }} /><span className="text-sm">{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 职业方向 */}
      <div className="py-12 sm:py-16" style={{ background: '#f5f4f6' }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>职业发展方向</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {careerPaths.map((career, i) => (
              <div key={i} className="rounded-lg p-6 text-center transition-shadow hover:shadow-md" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 className="text-lg font-semibold mb-1" style={{ color: theme.accent }}>{career.title}</h3>
                <p className="text-sm opacity-70 mb-4">{career.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
