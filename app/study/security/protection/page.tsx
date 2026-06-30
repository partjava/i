'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1, title: '访问控制', description: '了解访问控制原理与模型', href: '/study/security/protection/access' },
  { number: 2, title: '身份认证', description: '掌握身份认证技术', href: '/study/security/protection/auth' },
  { number: 3, title: '加密技术', description: '学习加密技术原理与应用', href: '/study/security/protection/encryption' },
  { number: 4, title: '防火墙技术', description: '掌握防火墙配置与管理', href: '/study/security/protection/firewall' },
  { number: 5, title: '入侵检测', description: '了解入侵检测系统原理', href: '/study/security/protection/ids' },
  { number: 6, title: '入侵防御', description: '学习入侵防御技术', href: '/study/security/protection/ips' },
  { number: 7, title: 'VPN技术', description: '掌握VPN原理与配置', href: '/study/security/protection/vpn' },
  { number: 8, title: '安全审计', description: '了解安全审计方法与流程', href: '/study/security/protection/audit' },
  { number: 9, title: '安全监控', description: '学习安全监控体系搭建', href: '/study/security/protection/monitor' },
  { number: 10, title: '应急响应', description: '掌握应急响应流程与技术', href: '/study/security/protection/response' },
]

const features = [
  { title: '多层防护', desc: '构建深度防御安全体系' },
  { title: '实时检测', desc: '24/7实时威胁监控与响应' },
  { title: '工具实战', desc: '掌握主流安全防护工具使用' },
  { title: '可视化', desc: '安全态势感知与可视化分析' },
]

const learningPath = [
  { title: '第一阶段：身份与访问', desc: '掌握访问控制、身份认证与加密技术', items: [CHAPTERS[0], CHAPTERS[1], CHAPTERS[2]] },
  { title: '第二阶段：防护技术', desc: '学习防火墙配置、入侵检测与防御、VPN技术', items: [CHAPTERS[3], CHAPTERS[4], CHAPTERS[5], CHAPTERS[6]] },
  { title: '第三阶段：监控与响应', desc: '掌握安全审计、安全监控与应急响应', items: [CHAPTERS[7], CHAPTERS[8], CHAPTERS[9]] },
]

const careerPaths = [
  { title: '安全防护专家', desc: '设计和维护企业安全防护体系', skills: ['访问控制', '防火墙', '安全加固', '应急响应'] },
  { title: 'SOC分析师', desc: '安全运营中心威胁分析', skills: ['入侵检测', '日志分析', '威胁研判', '安全监控'] },
  { title: '网络安全顾问', desc: '为企业提供安全咨询服务', skills: ['安全审计', '风险评估', '合规评估', '方案设计'] },
]

export default function SecurityProtectionPage() {
  const theme = THEMES.security

  return (
    <div>
      <BookCover
        title="安全防护"
        subtitle="Security Protection"
        description="系统学习安全防护核心技术，掌握访问控制、防火墙、入侵检测等关键防护手段"
        chapterCount={CHAPTERS.length}
        totalHours={35}
        chapters={CHAPTERS}
        icon="🔒"
        startHref="/study/security/protection/access"
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
      <div className="py-12 sm:py-16" style={{ background: theme.paperCard || theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>学习路径</h2>
          <div className="space-y-6">
            {learningPath.map((phase, i) => (
              <div key={i} className="rounded-lg p-6 transition-shadow hover:shadow-md" style={{ background: theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
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

      {/* 先修知识与职业发展 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 先修知识 */}
          <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme.accent }}>📚 先修知识</h3>
            <ul className="space-y-3">
              {['计算机网络基础', '操作系统原理', '编程基础（Python/Java）', 'Linux 基础操作'].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircleOutlined style={{ color: '#22c55e' }} />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* 职业方向 */}
          <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme.accent }}>💼 职业方向</h3>
            <div className="space-y-3">
              {careerPaths.map((career, i) => (
                <div key={i} className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <div className="font-medium">{career.title}</div>
                  <div className="text-sm opacity-70 mb-2">{career.desc}</div>
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
      </div>

      {/* 学习建议 */}
      <div className="py-12 sm:py-16" style={{ background: theme.paperCard || theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>学习建议</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg p-6" style={{ background: theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.accent }}>学习方法</h3>
              <ul className="space-y-3">
                {['按照推荐的学习路径循序渐进，打好基础', '多动手实践，理论结合实际', '搭建实验环境，模拟真实攻击与防御场景', '多关注实际安全事件，培养威胁分析思维'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircleOutlined className="mt-0.5" style={{ color: '#22c55e' }} />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg p-6" style={{ background: theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.accent }}>注意事项</h3>
              <ul className="space-y-3">
                {['定期复习和总结，巩固所学知识', '关注最新安全漏洞与防护技术动态', '积极参与CTF和社区讨论，提升实战能力', '在合法授权范围内进行安全测试与实验'].map((item, i) => (
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
