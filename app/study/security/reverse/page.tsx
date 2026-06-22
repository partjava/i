'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1,  title: '逆向工程基础',   description: '了解逆向工程基本概念与流程',           href: '/study/security/reverse/basic' },
  { number: 2,  title: '汇编语言基础',    description: '掌握汇编语言基础知识',                  href: '/study/security/reverse/assembly' },
  { number: 3,  title: 'PE文件分析',      description: '学习PE文件结构与分析方法',              href: '/study/security/reverse/pe' },
  { number: 4,  title: 'ELF文件分析',     description: '掌握ELF文件格式与分析技术',            href: '/study/security/reverse/elf' },
  { number: 5,  title: '动态分析技术',    description: '学习动态调试与行为分析技术',           href: '/study/security/reverse/dynamic' },
  { number: 6,  title: '静态分析技术',    description: '掌握静态反汇编与代码分析',             href: '/study/security/reverse/static' },
  { number: 7,  title: '反调试技术',      description: '了解反调试原理与绕过技术',             href: '/study/security/reverse/anti-debug' },
  { number: 8,  title: '加壳脱壳',        description: '掌握PE加壳与脱壳技术',                 href: '/study/security/reverse/pack' },
  { number: 9,  title: '漏洞挖掘',        description: '学习软件漏洞挖掘方法与工具',           href: '/study/security/reverse/vulnerability' },
  { number: 10, title: '恶意代码分析',    description: '深入分析恶意代码行为与特征',           href: '/study/security/reverse/malware' },
]

const features = [
  { icon: '🔍', title: '深度分析', desc: '深入理解程序内部结构' },
  { icon: '⚙️', title: '工具精通', desc: '掌握专业逆向分析工具' },
  { icon: '🛡️', title: '安全研究', desc: '漏洞挖掘与恶意代码分析' },
  { icon: '🧠', title: '思维训练', desc: '培养逆向思维和分析能力' },
]

const roadmap = [
  {
    phase: '基础理论',
    topics: ['逆向工程基础', '汇编语言基础', 'PE文件分析', 'ELF文件分析'],
    duration: '5周',
  },
  {
    phase: '分析技术',
    topics: ['动态分析技术', '静态分析技术', '反调试技术'],
    duration: '4周',
  },
  {
    phase: '高级应用',
    topics: ['加壳脱壳', '漏洞挖掘', '恶意代码分析'],
    duration: '6周',
  },
]

const topicLinks: { [key: string]: string } = {
  '逆向工程基础': '/study/security/reverse/basic',
  '汇编语言基础': '/study/security/reverse/assembly',
  'PE文件分析': '/study/security/reverse/pe',
  'ELF文件分析': '/study/security/reverse/elf',
  '动态分析技术': '/study/security/reverse/dynamic',
  '静态分析技术': '/study/security/reverse/static',
  '反调试技术': '/study/security/reverse/anti-debug',
  '加壳脱壳': '/study/security/reverse/pack',
  '漏洞挖掘': '/study/security/reverse/vulnerability',
  '恶意代码分析': '/study/security/reverse/malware',
}

export default function ReverseEngineeringPage() {
  const theme = THEMES.security

  return (
    <div>
      <BookCover
        title="逆向工程"
        subtitle="Reverse Engineering"
        description="掌握逆向工程核心技术，学习汇编语言、程序分析、漏洞挖掘等技能，成为软件安全研究专家"
        chapterCount={CHAPTERS.length}
        totalHours={40}
        chapters={CHAPTERS}
        icon="🔍"
        startHref="/study/security/reverse/basic"
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
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>C/C++编程基础</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>操作系统原理</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>计算机体系结构</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>强烈的学习动机</li>
            </ul>
          </div>
          <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme.accent }}>💼 职业方向</h3>
            <div className="space-y-3">
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <div className="font-medium">逆向工程师</div>
                <div className="text-sm opacity-70">软件逆向分析专家</div>
              </div>
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <div className="font-medium">安全研究员</div>
                <div className="text-sm opacity-70">漏洞研究与挖掘</div>
              </div>
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <div className="font-medium">恶意代码分析师</div>
                <div className="text-sm opacity-70">恶意软件分析与防护</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
