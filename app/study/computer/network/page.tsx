'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1,  title: '网络基础与入门',       description: '了解计算机网络的基本概念与发展历程',     href: '/study/computer/network/intro' },
  { number: 2,  title: '网络通信原理',           description: '掌握数据通信的核心技术',                href: '/study/computer/network/comm-principle' },
  { number: 3,  title: 'OSI与TCPIP模型',        description: '深入理解网络分层模型',                 href: '/study/computer/network/model' },
  { number: 4,  title: '物理层与数据链路层',     description: '掌握物理传输与链路层协议',              href: '/study/computer/network/link' },
  { number: 5,  title: 'IP与路由',               description: '理解IP协议与路由选择算法',             href: '/study/computer/network/ip-routing' },
  { number: 6,  title: 'TCP与UDP',               description: '掌握传输层协议原理与应用',             href: '/study/computer/network/tcp-udp' },
  { number: 7,  title: '应用层协议',             description: '学习HTTP/DNS等应用层协议',             href: '/study/computer/network/application' },
  { number: 8,  title: '局域网与广域网',         description: '了解LAN/WAN技术与组网',               href: '/study/computer/network/lan-wan' },
  { number: 9,  title: '无线与移动网络',         description: '掌握无线通信与移动网络技术',            href: '/study/computer/network/wireless-mobile' },
  { number: 10, title: 'VPN与代理技术',          description: '了解VPN原理与代理服务',                href: '/study/computer/network/vpn-proxy' },
  { number: 11, title: '网络安全基础',           description: '掌握网络安全的基本机制与防护',          href: '/study/computer/network/security' },
  { number: 12, title: '云网络与新技术',         description: '了解云网络与前沿网络技术',             href: '/study/computer/network/cloud-newtech' },
  { number: 13, title: '网络抓包与协议分析',     description: '掌握tcpdump等抓包分析技能',           href: '/study/computer/network/sniff-analyze' },
  { number: 14, title: '网络配置与管理',         description: '学习网络设备配置与管理方法',           href: '/study/computer/network/config-manage' },
  { number: 15, title: '网络项目实战',           description: '综合运用网络知识完成实战项目',          href: '/study/computer/network/projects' },
  { number: 16, title: '面试题与答疑',           description: '高频面试题与知识点答疑',               href: '/study/computer/network/interview' },
  { number: 17, title: '网络进阶与拓展',         description: '前沿网络技术与进阶学习',               href: '/study/computer/network/advanced' },
]

const networkFeatures = [
  { title: '分层架构', desc: 'OSI/TCPIP分层模型，结构清晰' },
  { title: '协议丰富', desc: '涵盖主流网络协议与应用' },
  { title: '安全保障', desc: '网络安全与防护机制完善' },
  { title: '实战导向', desc: '抓包分析、项目实战贴近实际' },
  { title: '应用广泛', desc: '互联网、企业、云计算等领域必备' },
  { title: '面试高频', desc: '各大厂面试常考知识点' },
]

const learningPath = [
  { title: '第一阶段：网络基础', desc: '掌握网络基本原理和通信模型', items: [CHAPTERS[0], CHAPTERS[1], CHAPTERS[2]] },
  { title: '第二阶段：分层与协议', desc: '学习物理层、链路层、IP、TCP/UDP等协议', items: [CHAPTERS[3], CHAPTERS[4], CHAPTERS[5]] },
  { title: '第三阶段：应用与安全', desc: '掌握应用层协议、网络安全与新技术', items: [CHAPTERS[6], CHAPTERS[7], CHAPTERS[8], CHAPTERS[9], CHAPTERS[10], CHAPTERS[11]] },
  { title: '第四阶段：抓包与管理', desc: '学习抓包分析、网络配置与管理', items: [CHAPTERS[12], CHAPTERS[13]] },
  { title: '第五阶段：实战与进阶', desc: '项目实战、面试与进阶拓展', items: [CHAPTERS[14], CHAPTERS[15], CHAPTERS[16]] },
]

const careerPaths = [
  { title: '网络工程师', desc: '网络架构设计与维护', skills: ['网络配置', '协议分析', '安全防护', '故障排查'] },
  { title: '后端开发工程师', desc: '网络通信与服务开发', skills: ['Socket编程', 'API设计', '高并发', '协议实现'] },
  { title: '安全工程师', desc: '网络安全与渗透测试', skills: ['漏洞扫描', '抓包分析', '防火墙', '加密认证'] },
  { title: '云计算工程师', desc: '云网络与新技术应用', skills: ['云平台', '虚拟化', 'SDN', '网络自动化'] },
]

export default function NetworkLearningPage() {
  const theme = THEMES.computer

  return (
    <div>
      <BookCover
        title="计算机网络"
        subtitle="Computer Networks"
        description="计算机网络是现代信息社会的基础，涵盖协议、通信、安全等核心内容。本课程将带你系统学习网络原理，提升开发与运维能力。"
        chapterCount={CHAPTERS.length}
        totalHours={12}
        chapters={CHAPTERS}
        icon="🌐"
        startHref="/study/computer/network/intro"
        theme={theme}
      />

      {/* 课程特点 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>为什么学习计算机网络？</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {networkFeatures.map((f, i) => (
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
                {['按照推荐的学习路径循序渐进，打好基础', '多动手实践，理论结合实际', '遇到不懂的概念可以随时回顾之前的内容', '多阅读官方文档和优秀开源项目'].map((item, i) => (
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
                {['定期复习和总结，巩固所学知识', '关注网络安全和性能优化', '积极参与社区讨论，获取最新资源', '尝试用网络知识解决实际问题，提升实战能力'].map((item, i) => (
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
