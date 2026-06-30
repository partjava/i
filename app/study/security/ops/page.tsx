'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1, title: '安全运维基础', description: '了解安全运维核心概念与体系', href: '/study/security/ops/basic' },
  { number: 2, title: '系统加固', description: '掌握系统安全加固技术', href: '/study/security/ops/hardening' },
  { number: 3, title: '安全监控', description: '学习安全监控体系搭建', href: '/study/security/ops/monitor' },
  { number: 4, title: '日志分析', description: '掌握日志收集与分析技术', href: '/study/security/ops/log' },
  { number: 5, title: '漏洞管理', description: '了解漏洞全生命周期管理', href: '/study/security/ops/vulnerability' },
  { number: 6, title: '补丁管理', description: '掌握补丁评估与部署流程', href: '/study/security/ops/patch' },
  { number: 7, title: '配置管理', description: '学习安全配置管理最佳实践', href: '/study/security/ops/config' },
  { number: 8, title: '应急响应', description: '掌握应急响应流程与技术', href: '/study/security/ops/incident' },
  { number: 9, title: '灾难恢复', description: '了解灾难恢复规划与实施', href: '/study/security/ops/recovery' },
  { number: 10, title: '安全评估', description: '学习安全评估方法与标准', href: '/study/security/ops/assessment' },
]

const features = [
  { title: '系统加固', desc: '全面的系统安全加固方案' },
  { title: '监控分析', desc: '7×24安全监控与分析' },
  { title: '应急响应', desc: '快速安全事件响应机制' },
  { title: '自动化', desc: '安全运维自动化工具' },
]

const learningPath = [
  { title: '基础建设', desc: '打好安全运维根基，掌握核心概念', items: [CHAPTERS[0], CHAPTERS[1], CHAPTERS[2]] },
  { title: '运营管理', desc: '深入学习日志、漏洞、补丁与配置管理', items: [CHAPTERS[3], CHAPTERS[4], CHAPTERS[5], CHAPTERS[6]] },
  { title: '应急响应', desc: '掌握应急响应、灾难恢复与安全评估', items: [CHAPTERS[7], CHAPTERS[8], CHAPTERS[9]] },
]

const careerPaths = [
  { title: '安全运维工程师', desc: '企业安全运维专家', skills: ['系统加固', '安全监控', '漏洞管理', '自动化运维'] },
  { title: '安全运营专家', desc: 'SOC安全运营中心', skills: ['日志分析', '安全监控', '事件分析', '安全编排'] },
  { title: '应急响应专家', desc: '安全事件响应处理', skills: ['应急响应', '灾难恢复', '取证分析', '安全评估'] },
]

export default function SecurityOpsLearningPage() {
  const theme = THEMES.security

  return (
    <div>
      <BookCover
        title="安全运维"
        subtitle="Security Operations"
        description="掌握系统加固、安全监控、应急响应等安全运维核心技能，保障企业信息系统的安全稳定运行"
        chapterCount={CHAPTERS.length}
        totalHours={35}
        chapters={CHAPTERS}
        icon="⚙️"
        startHref="/study/security/ops/basic"
        theme={theme}
      />

      {/* 课程特色 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>为什么学习安全运维？</h2>
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
      <div className="py-12 sm:py-16" style={{ background: '#f4f4f6' }}>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
      <div className="py-12 sm:py-16" style={{ background: '#f4f4f6' }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>学习建议</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.accent }}>先修知识</h3>
              <ul className="space-y-3">
                {['熟悉操作系统和网络基础知识', '了解常见的安全威胁与攻击类型', '掌握基本命令行操作和脚本编写', '具备一定的系统管理经验'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircleOutlined className="mt-0.5" style={{ color: '#22c55e' }} /><span className="text-sm">{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.accent }}>核心技能</h3>
              <ul className="space-y-3">
                {['系统安全加固与防护', '安全监控与日志分析', '漏洞补丁全生命周期管理', '应急事件响应与处置'].map((item, i) => (
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
