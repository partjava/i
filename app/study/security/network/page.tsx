'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1,  title: '网络安全概述',     description: '了解网络安全的基本概念与发展历程',     href: '/study/security/network/intro' },
  { number: 2,  title: '网络基础架构',       description: '掌握网络协议模型与基础架构',           href: '/study/security/network/architecture' },
  { number: 3,  title: '安全模型与框架',     description: '深入理解CIA三元组与安全框架',          href: '/study/security/network/framework' },
  { number: 4,  title: '物理层安全',         description: '掌握物理层安全原理与防护措施',          href: '/study/security/network/physical' },
  { number: 5,  title: '数据链路层安全',     description: '理解交换机安全与ARP防护',              href: '/study/security/network/datalink' },
  { number: 6,  title: '网络层安全',         description: '掌握IP协议安全与路由防护',             href: '/study/security/network/network' },
  { number: 7,  title: '传输层安全',         description: '学习TCP/UDP安全与TLS加密',            href: '/study/security/network/transport' },
  { number: 8,  title: '应用层安全',         description: '掌握Web应用安全与攻击防护',            href: '/study/security/network/application' },
  { number: 9,  title: '网络协议分析',       description: '学习抓包工具与协议分析方法',           href: '/study/security/network/protocol' },
  { number: 10, title: '网络设备安全',       description: '了解路由器/交换机等设备安全配置',       href: '/study/security/network/device' },
]

const features = [
  { icon: '🛡️', title: '全面覆盖', desc: '从OSI七层模型全面讲解网络安全' },
  { icon: '🔍', title: '协议分析', desc: '深入理解网络协议安全机制' },
  { icon: '⚡', title: '实战导向', desc: '结合真实网络环境进行安全分析' },
  { icon: '🎯', title: '基础强化', desc: '为后续专业安全技术打好基础' },
]

const roadmap = [
  {
    phase: '基础阶段',
    topics: ['网络安全概述', '网络基础架构', '安全模型与框架'],
    duration: '2周',
  },
  {
    phase: '协议安全',
    topics: ['物理层安全', '数据链路层安全', '网络层安全', '传输层安全'],
    duration: '3周',
  },
  {
    phase: '应用实践',
    topics: ['应用层安全', '网络协议分析', '网络设备安全'],
    duration: '3周',
  },
]

const topicLinks: { [key: string]: string } = {
  '网络安全概述': '/study/security/network/intro',
  '网络基础架构': '/study/security/network/architecture',
  '安全模型与框架': '/study/security/network/framework',
  '物理层安全': '/study/security/network/physical',
  '数据链路层安全': '/study/security/network/datalink',
  '网络层安全': '/study/security/network/network',
  '传输层安全': '/study/security/network/transport',
  '应用层安全': '/study/security/network/application',
  '网络协议分析': '/study/security/network/protocol',
  '网络设备安全': '/study/security/network/device',
}

export default function NetworkSecurityPage() {
  const theme = THEMES.security

  return (
    <div>
      <BookCover
        title="网络基础安全"
        subtitle="Network Security Fundamentals"
        description="深入学习网络安全基础知识，掌握网络协议安全机制，理解网络架构安全设计，为网络安全专业发展打下坚实基础"
        chapterCount={CHAPTERS.length}
        totalHours={30}
        chapters={CHAPTERS}
        icon="🛡️"
        startHref="/study/security/network/intro"
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
                <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-2">
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
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>计算机网络基础</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>TCP/IP协议栈</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>Linux基础操作</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>信息安全概念</li>
            </ul>
          </div>
          <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme.accent }}>💼 职业方向</h3>
            <div className="space-y-3">
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <div className="font-medium">网络安全工程师</div>
                <div className="text-sm opacity-70">负责网络安全架构设计与维护</div>
              </div>
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <div className="font-medium">安全架构师</div>
                <div className="text-sm opacity-70">设计企业级安全解决方案</div>
              </div>
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <div className="font-medium">网络运维工程师</div>
                <div className="text-sm opacity-70">维护网络设备和安全策略</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
