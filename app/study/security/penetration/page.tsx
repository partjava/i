'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1, title: '渗透测试基础', description: '了解渗透测试基本概念与流程', href: '/study/security/penetration/basic' },
  { number: 2, title: '信息收集', description: '掌握目标信息收集技术', href: '/study/security/penetration/recon' },
  { number: 3, title: '漏洞扫描', description: '学习漏洞扫描工具与方法', href: '/study/security/penetration/scan' },
  { number: 4, title: '漏洞利用', description: '掌握漏洞利用技术', href: '/study/security/penetration/exploit' },
  { number: 5, title: '后渗透测试', description: '了解后渗透测试技术', href: '/study/security/penetration/post' },
  { number: 6, title: 'Web应用测试', description: '学习Web应用渗透测试', href: '/study/security/penetration/web' },
  { number: 7, title: '移动应用测试', description: '了解移动应用渗透测试', href: '/study/security/penetration/mobile' },
  { number: 8, title: '无线网络测试', description: '掌握无线网络安全测试', href: '/study/security/penetration/wireless' },
  { number: 9, title: '社会工程学', description: '了解社会工程学攻击方法', href: '/study/security/penetration/social' },
  { number: 10, title: '渗透测试报告', description: '学习渗透测试报告编写', href: '/study/security/penetration/report' },
]

const penetrationFeatures = [
  { title: '实战为王', desc: '真实环境动手实战演练' },
  { title: '全面覆盖', desc: 'Web、移动、无线全方位测试' },
  { title: '攻防兼备', desc: '从攻击者视角理解安全' },
  { title: '规范化', desc: '专业测试流程和报告编写' },
]

const learningPath = [
  { title: '第一阶段：基础准备', desc: '渗透测试基础、信息收集、漏洞扫描', items: [CHAPTERS[0], CHAPTERS[1], CHAPTERS[2]] },
  { title: '第二阶段：攻击实施', desc: '漏洞利用、后渗透测试、Web应用测试', items: [CHAPTERS[3], CHAPTERS[4], CHAPTERS[5]] },
  { title: '第三阶段：专项测试', desc: '移动应用测试、无线网络测试、社会工程学、渗透测试报告', items: [CHAPTERS[6], CHAPTERS[7], CHAPTERS[8], CHAPTERS[9]] },
]

const prerequisites = [
  { title: '网络基础', items: ['TCP/IP协议', 'HTTP/HTTPS', '网络拓扑结构'] },
  { title: '操作系统', items: ['Linux基础命令', 'Windows系统管理', '文件系统权限'] },
  { title: '编程基础', items: ['Python/JavaScript', 'SQL基础查询', 'Shell脚本'] },
]

const careerPaths = [
  { title: '渗透测试工程师', desc: '专业渗透测试服务提供', skills: ['漏洞挖掘', '渗透工具', '报告编写', '安全评估'] },
  { title: '安全顾问', desc: '企业安全咨询与评估', skills: ['安全架构', '风险评估', '合规审计', '应急响应'] },
  { title: '红队成员', desc: '企业红蓝对抗演练', skills: ['攻击模拟', '绕过技术', '武器化', '团队协作'] },
]

export default function PenetrationTestingPage() {
  const theme = THEMES.security

  return (
    <div>
      <BookCover
        title="渗透测试"
        subtitle="Penetration Testing"
        description="学习渗透测试全流程，掌握信息收集、漏洞扫描、漏洞利用等核心技术"
        chapterCount={CHAPTERS.length}
        totalHours={40}
        chapters={CHAPTERS}
        icon="🎯"
        startHref="/study/security/penetration/basic"
        theme={theme}
      />

      {/* 课程特色 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>🌟 课程特色</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {penetrationFeatures.map((f, i) => (
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
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>🗺️ 学习路径</h2>
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
                    <Link key={j} href={item.href} className="text-sm px-3 py-1.5 rounded-md transition-colors hover:opacity-80" style={{ background: `${theme.accent}0D`, color: theme.accent }}>
                      {item.title}
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
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 先修知识 */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: theme.accent }}>📋 先修知识</h2>
              <div className="space-y-4">
                {prerequisites.map((prereq, i) => (
                  <div key={i} className="rounded-lg p-5" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
                    <h3 className="text-base font-semibold mb-3" style={{ color: theme.accent }}>{prereq.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {prereq.items.map((item, j) => (
                        <span key={j} className="text-xs px-2.5 py-1 rounded" style={{ background: `${theme.accent}10`, color: theme.accent }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 职业方向 */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: theme.accent }}>💼 职业方向</h2>
              <div className="grid grid-cols-1 gap-4">
                {careerPaths.map((career, i) => (
                  <div key={i} className="rounded-lg p-5 transition-shadow hover:shadow-md" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: theme.accent }}>{career.title}</h3>
                    <p className="text-sm opacity-70 mb-3">{career.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((skill, j) => (
                        <span key={j} className="text-xs px-2 py-0.5 rounded" style={{ background: `${theme.accent}10`, color: theme.accent }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 重要提醒 */}
      <div className="py-12 sm:py-16" style={{ background: '#f8f6f1' }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>⚠️ 重要提醒</h2>
          <div className="rounded-lg p-6 max-w-3xl mx-auto" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
            <ul className="space-y-4">
              {[
                { icon: '🔒', text: '仅在授权环境中进行测试' },
                { icon: '⚖️', text: '遵守法律法规和职业道德' },
                { icon: '🛡️', text: '以防御为目的学习攻击技术' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 学习建议 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>学习建议</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.accent }}>学习方法</h3>
              <ul className="space-y-3">
                {['建立扎实的网络和操作系统基础', '在合法授权环境中反复实践', '关注最新漏洞公告和安全动态', '多参与CTF竞赛和漏洞赏金计划'].map((item, i) => (
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
                {['始终保持测试的合法性和道德性', '做好详细的测试记录和报告', '定期复习和总结，巩固所学知识', '尊重他人隐私和数据安全'].map((item, i) => (
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
