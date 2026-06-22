'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1, title: '网络基础安全', description: '网络安全概述、协议安全、设备安全', href: '/study/security/network' },
  { number: 2, title: '安全防护', description: '访问控制、防火墙、入侵检测与防御', href: '/study/security/protection' },
  { number: 3, title: '渗透测试', description: '漏洞发现、利用与安全评估', href: '/study/security/penetration' },
  { number: 4, title: '密码学', description: '对称/非对称加密、哈希、数字签名', href: '/study/security/crypto' },
  { number: 5, title: '前端安全', description: 'XSS、CSRF、点击劫持、安全编码', href: '/study/security/frontend' },
  { number: 6, title: '逆向工程', description: '反汇编、调试、漏洞挖掘、恶意代码分析', href: '/study/security/reverse' },
  { number: 7, title: '安全开发', description: '安全编码、代码审计、DevSecOps', href: '/study/security/dev' },
  { number: 8, title: '安全运维', description: '系统加固、监控、应急响应', href: '/study/security/ops' },
  { number: 9, title: '区块链安全', description: '共识安全、智能合约审计、钱包安全', href: '/study/security/blockchain' },
]

const categories = [
  {
    icon: '🛡️',
    title: '网络基础安全',
    desc: '网络安全概述、协议安全、设备安全',
    href: '/study/security/network',
  },
  {
    icon: '🔒',
    title: '安全防护',
    desc: '访问控制、防火墙、入侵检测与防御',
    href: '/study/security/protection',
  },
  {
    icon: '🎯',
    title: '渗透测试',
    desc: '漏洞发现、利用与安全评估',
    href: '/study/security/penetration',
  },
  {
    icon: '🔐',
    title: '密码学',
    desc: '对称/非对称加密、哈希、数字签名',
    href: '/study/security/crypto',
  },
  {
    icon: '🌐',
    title: '前端安全',
    desc: 'XSS、CSRF、点击劫持、安全编码',
    href: '/study/security/frontend',
  },
  {
    icon: '🔍',
    title: '逆向工程',
    desc: '反汇编、调试、漏洞挖掘、恶意代码分析',
    href: '/study/security/reverse',
  },
  {
    icon: '📝',
    title: '安全开发',
    desc: '安全编码、代码审计、DevSecOps',
    href: '/study/security/dev',
  },
  {
    icon: '⚙️',
    title: '安全运维',
    desc: '系统加固、监控、应急响应',
    href: '/study/security/ops',
  },
  {
    icon: '🔗',
    title: '区块链安全',
    desc: '共识安全、智能合约审计、钱包安全',
    href: '/study/security/blockchain',
  },
]

const features = [
  { icon: '🏗️', title: '完整体系', desc: '涵盖从网络基础到区块链安全的完整知识框架' },
  { icon: '⚔️', title: '攻防结合', desc: '既学习攻击原理，也掌握防御技术，知行合一' },
  { icon: '🛠️', title: '实战导向', desc: '结合真实案例与工具使用，培养动手能力' },
  { icon: '📈', title: '持续更新', desc: '紧跟安全行业最新趋势与技术发展' },
]

const roadmap = [
  {
    phase: '基础入门',
    topics: ['网络基础安全', '安全防护', '密码学'],
    duration: '4-6周',
  },
  {
    phase: '技能提升',
    topics: ['前端安全', '渗透测试', '安全运维'],
    duration: '6-8周',
  },
  {
    phase: '专业方向',
    topics: ['逆向工程', '安全开发', '区块链安全'],
    duration: '8-12周',
  },
]

const careerPaths = [
  { title: '安全工程师', desc: '负责企业安全架构设计与运维' },
  { title: '渗透测试工程师', desc: '专业安全评估与漏洞挖掘' },
  { title: '安全研究员', desc: '前沿安全技术研究与分析' },
]

export default function SecurityHomePage() {
  const theme = THEMES.security

  return (
    <div>
      <BookCover
        title="网络安全"
        subtitle="Network Security"
        description="全面学习网络安全知识体系，涵盖网络基础、密码学、渗透测试、逆向工程、安全开发与运维等核心领域，从入门到精通打造全面的安全技术栈"
        chapterCount={CHAPTERS.length}
        totalHours={280}
        chapters={CHAPTERS}
        icon="🛡️"
        theme={theme}
      />

      {/* 子方向导航 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>📂 学习方向</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href={cat.href}
                className="rounded-lg p-5 transition-shadow hover:shadow-md block"
                style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{cat.title}</h3>
                    <p className="text-sm opacity-70">{cat.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 课程特色 */}
      <div className="py-12 sm:py-16" style={{ background: theme.paperCard || theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>🌟 课程特色</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="rounded-lg p-5 text-center transition-shadow hover:shadow-md" style={{ background: theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm opacity-70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 学习路径 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
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
                <div className="ml-12 flex flex-wrap gap-2">
                  {phase.topics.map((topic, tIndex) => (
                    <span key={tIndex} className="text-sm rounded px-3 py-1" style={{ background: 'rgba(0,0,0,0.04)' }}>
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 先修知识与职业方向 */}
      <div className="py-12 sm:py-16" style={{ background: theme.paperCard || theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg p-6" style={{ background: theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme.accent }}>📚 先修知识</h3>
            <ul className="space-y-2">
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>计算机网络基础</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>操作系统原理</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>编程基础（Python/Java）</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>Linux 基础操作</li>
            </ul>
          </div>
          <div className="rounded-lg p-6" style={{ background: theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme.accent }}>💼 职业方向</h3>
            <div className="space-y-3">
              {careerPaths.map((career, i) => (
                <div key={i} className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <div className="font-medium">{career.title}</div>
                  <div className="text-sm opacity-70">{career.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
