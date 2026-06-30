'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1, title: '密码学基础', description: '了解密码学基本概念与发展', href: '/study/security/crypto/basic' },
  { number: 2, title: '对称加密', description: '掌握对称加密算法与应用', href: '/study/security/crypto/symmetric' },
  { number: 3, title: '非对称加密', description: '学习非对称加密原理', href: '/study/security/crypto/asymmetric' },
  { number: 4, title: '哈希函数', description: '掌握哈希函数原理与应用', href: '/study/security/crypto/hash' },
  { number: 5, title: '数字签名', description: '学习数字签名技术与应用', href: '/study/security/crypto/signature' },
  { number: 6, title: '密钥管理', description: '了解密钥生命周期管理', href: '/study/security/crypto/key' },
  { number: 7, title: '公钥基础设施', description: '掌握PKI体系架构', href: '/study/security/crypto/pki' },
  { number: 8, title: '密码协议', description: '学习常见密码协议', href: '/study/security/crypto/protocol' },
  { number: 9, title: '密码分析', description: '了解密码分析方法与技术', href: '/study/security/crypto/analysis' },
  { number: 10, title: '密码学应用', description: '掌握密码学实际应用场景', href: '/study/security/crypto/application' },
]

const features = [
  { icon: '🔐', title: '理论扎实', desc: '深入理解密码学数学基础' },
  { icon: '🧮', title: '算法详解', desc: '主流加密算法原理与实现' },
  { icon: '🛡️', title: '安全应用', desc: '密码学在实际系统中的应用' },
  { icon: '🔍', title: '漏洞分析', desc: '密码系统安全性分析方法' },
]

const roadmap = [
  {
    phase: '基础理论',
    topics: ['密码学基础', '对称加密', '非对称加密'],
    duration: '3周',
  },
  {
    phase: '核心技术',
    topics: ['哈希函数', '数字签名', '密钥管理', '公钥基础设施'],
    duration: '4周',
  },
  {
    phase: '高级应用',
    topics: ['密码协议', '密码分析', '密码学应用'],
    duration: '3周',
  },
]

const topicLinks: { [key: string]: string } = {
  '密码学基础': '/study/security/crypto/basic',
  '对称加密': '/study/security/crypto/symmetric',
  '非对称加密': '/study/security/crypto/asymmetric',
  '哈希函数': '/study/security/crypto/hash',
  '数字签名': '/study/security/crypto/signature',
  '密钥管理': '/study/security/crypto/key',
  '公钥基础设施': '/study/security/crypto/pki',
  '密码协议': '/study/security/crypto/protocol',
  '密码分析': '/study/security/crypto/analysis',
  '密码学应用': '/study/security/crypto/application',
}

export default function CryptographyPage() {
  const theme = THEMES.security

  return (
    <div>
      <BookCover
        title="密码学"
        subtitle="Cryptography"
        description="掌握现代密码学核心理论与技术，学习加密算法、数字签名、密钥管理等关键技术，为信息安全提供坚实理论基础"
        chapterCount={CHAPTERS.length}
        totalHours={35}
        chapters={CHAPTERS}
        icon="🔐"
        startHref="/study/security/crypto/basic"
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
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>数论基础</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>群论与有限域</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>概率论基础</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3" style={{ background: theme.accent }}></span>复杂度理论</li>
            </ul>
          </div>
          <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme.accent }}>💼 职业方向</h3>
            <div className="space-y-3">
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <div className="font-medium">密码学研究员</div>
                <div className="text-sm opacity-70">密码算法设计与分析</div>
              </div>
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <div className="font-medium">安全架构师</div>
                <div className="text-sm opacity-70">密码系统架构设计</div>
              </div>
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <div className="font-medium">区块链开发工程师</div>
                <div className="text-sm opacity-70">区块链密码学应用</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
