'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1, title: '前端安全基础', description: '了解前端安全核心概念', href: '/study/security/frontend/basic' },
  { number: 2, title: 'XSS攻击防护', description: '掌握XSS攻击原理与防御', href: '/study/security/frontend/xss' },
  { number: 3, title: 'CSRF攻击防护', description: '学习CSRF攻击原理与防护', href: '/study/security/frontend/csrf' },
  { number: 4, title: '点击劫持防护', description: '了解点击劫持原理与防御', href: '/study/security/frontend/clickjacking' },
  { number: 5, title: 'SQL注入防护', description: '掌握SQL注入原理与防护', href: '/study/security/frontend/sql' },
  { number: 6, title: '文件上传安全', description: '学习文件上传安全防护', href: '/study/security/frontend/upload' },
  { number: 7, title: '敏感信息保护', description: '掌握敏感信息保护方法', href: '/study/security/frontend/sensitive' },
  { number: 8, title: '前端加密', description: '了解前端加密技术应用', href: '/study/security/frontend/encryption' },
  { number: 9, title: '安全编码实践', description: '学习安全编码最佳实践', href: '/study/security/frontend/coding' },
  { number: 10, title: '安全测试方法', description: '掌握前端安全测试方法', href: '/study/security/frontend/testing' },
]

const features = [
  { icon: '🌐', title: 'Web安全', desc: '全面的Web前端安全防护' },
  { icon: '🔒', title: '漏洞防护', desc: '常见Web漏洞防护技术' },
  { icon: '🛠️', title: '工具使用', desc: '安全检测工具实际应用' },
  { icon: '📋', title: '最佳实践', desc: '安全编码规范与实践' },
]

const roadmap = [
  {
    phase: '基础防护',
    topics: ['前端安全基础', 'XSS攻击防护', 'CSRF攻击防护'],
    duration: '3周',
  },
  {
    phase: '高级防护',
    topics: ['点击劫持防护', 'SQL注入防护', '文件上传安全', '敏感信息保护'],
    duration: '3周',
  },
  {
    phase: '安全实践',
    topics: ['前端加密', '安全编码实践', '安全测试方法'],
    duration: '2周',
  },
]

const topicLinks: { [key: string]: string } = {
  '前端安全基础': '/study/security/frontend/basic',
  'XSS攻击防护': '/study/security/frontend/xss',
  'CSRF攻击防护': '/study/security/frontend/csrf',
  '点击劫持防护': '/study/security/frontend/clickjacking',
  'SQL注入防护': '/study/security/frontend/sql',
  '文件上传安全': '/study/security/frontend/upload',
  '敏感信息保护': '/study/security/frontend/sensitive',
  '前端加密': '/study/security/frontend/encryption',
  '安全编码实践': '/study/security/frontend/coding',
  '安全测试方法': '/study/security/frontend/testing',
}

export default function FrontendSecurityPage() {
  const theme = THEMES.security

  return (
    <div>
      <BookCover
        title="前端安全"
        subtitle="Frontend Security"
        description="掌握前端安全防护技术，学习XSS、CSRF、点击劫持等攻击的原理与防御方法"
        chapterCount={CHAPTERS.length}
        totalHours={30}
        chapters={CHAPTERS}
        icon="🌐"
        startHref="/study/security/frontend/basic"
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
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>HTML/CSS/JavaScript基础</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>HTTP协议基础</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>Web应用开发经验</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>信息安全基本概念</li>
            </ul>
          </div>
          <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme.accent }}>💼 职业方向</h3>
            <div className="space-y-3">
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <div className="font-medium">前端安全工程师</div>
                <div className="text-sm opacity-70">专注前端应用安全防护</div>
              </div>
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <div className="font-medium">Web安全专家</div>
                <div className="text-sm opacity-70">Web应用安全咨询与审计</div>
              </div>
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <div className="font-medium">全栈安全开发</div>
                <div className="text-sm opacity-70">安全开发全栈解决方案</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
