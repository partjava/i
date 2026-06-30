'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'

const CHAPTERS = [
  { number: 1, title: '区块链安全基础', description: '了解区块链安全核心概念', href: '/study/security/blockchain/basic' },
  { number: 2, title: '共识机制安全', description: '掌握共识算法安全分析', href: '/study/security/blockchain/consensus' },
  { number: 3, title: '智能合约安全', description: '学习智能合约漏洞与防护', href: '/study/security/blockchain/smart-contract' },
  { number: 4, title: '密码学应用', description: '深入学习区块链密码学技术', href: '/study/security/blockchain/crypto' },
  { number: 5, title: '钱包安全', description: '掌握数字钱包安全防护', href: '/study/security/blockchain/wallet' },
  { number: 6, title: '交易所安全', description: '了解交易所安全架构与防护', href: '/study/security/blockchain/exchange' },
  { number: 7, title: '挖矿安全', description: '学习挖矿安全威胁与防护', href: '/study/security/blockchain/mining' },
  { number: 8, title: '51%攻击防护', description: '掌握51%攻击原理与防御', href: '/study/security/blockchain/51-attack' },
  { number: 9, title: '双花攻击防护', description: '了解双花攻击原理与防护', href: '/study/security/blockchain/double-spend' },
  { number: 10, title: '区块链审计', description: '学习区块链安全审计方法', href: '/study/security/blockchain/audit' },
]

const roadmap = [
  {
    phase: '基础理论',
    topics: ['区块链安全基础', '共识机制安全', '密码学应用'],
    duration: '4周'
  },
  {
    phase: '应用安全',
    topics: ['智能合约安全', '钱包安全', '交易所安全', '挖矿安全'],
    duration: '4周'
  },
  {
    phase: '攻击防护',
    topics: ['51%攻击防护', '双花攻击防护', '区块链审计'],
    duration: '4周'
  }
]

const topicLinks: Record<string, string> = {
  '区块链安全基础': '/study/security/blockchain/basic',
  '共识机制安全': '/study/security/blockchain/consensus',
  '智能合约安全': '/study/security/blockchain/smart-contract',
  '密码学应用': '/study/security/blockchain/crypto',
  '钱包安全': '/study/security/blockchain/wallet',
  '交易所安全': '/study/security/blockchain/exchange',
  '挖矿安全': '/study/security/blockchain/mining',
  '51%攻击防护': '/study/security/blockchain/51-attack',
  '双花攻击防护': '/study/security/blockchain/double-spend',
  '区块链审计': '/study/security/blockchain/audit'
}

const features = [
  { icon: '⛓️', title: '区块链技术', desc: '深入理解区块链核心技术' },
  { icon: '🔐', title: '智能合约', desc: '智能合约安全开发与审计' },
  { icon: '💰', title: '数字资产', desc: '数字资产安全管理' },
  { icon: '🛡️', title: '攻击防护', desc: '区块链攻击手段与防护' }
]

const careers = [
  { title: '区块链安全工程师', desc: '区块链项目安全专家', bg: 'from-blue-50 to-blue-100', text: 'blue' },
  { title: '智能合约审计师', desc: '智能合约安全审计', bg: 'from-indigo-50 to-indigo-100', text: 'indigo' },
  { title: 'DeFi安全专家', desc: '去中心化金融安全', bg: 'from-purple-50 to-purple-100', text: 'purple' }
]

export default function BlockchainSecurityPage() {
  const t = THEMES.security

  return (
    <div>
      <BookCover
        title="区块链安全"
        subtitle="Blockchain Security"
        description="深入学习区块链安全机制，掌握智能合约审计、共识安全、密码学应用等核心技能"
        chapterCount={CHAPTERS.length}
        totalHours={40}
        chapters={CHAPTERS}
        icon="🔗"
        startHref="/study/security/blockchain/basic"
        theme={t}
      />

      {/* 课程特色 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🌟 课程特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 学习路径 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🗺️ 学习路径</h2>
        <div className="space-y-6">
          {roadmap.map((phase, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div
                  className="text-white px-3 py-1 rounded-full text-sm font-medium mr-4"
                  style={{ backgroundColor: t.accent }}
                >
                  阶段 {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{phase.phase}</h3>
                <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {phase.topics.map((topic, topicIndex) => (
                  <a
                    key={topicIndex}
                    href={topicLinks[topic] || '#'}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-opacity-80 transition-colors cursor-pointer"
                  >
                    {topic}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 先修知识 */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📚 先修知识</h3>
            <ul className="space-y-3">
              {['区块链基础技术', '密码学基础', '编程基础(Solidity)', '网络安全基础'].map((item, i) => (
                <li key={i} className="flex items-center text-gray-600">
                  <span
                    className="w-2 h-2 rounded-full mr-3"
                    style={{ backgroundColor: t.accent }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 职业方向 */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">💼 职业方向</h3>
            <div className="space-y-3">
              {careers.map((c, i) => (
                <div key={i} className={`bg-gradient-to-r ${c.bg} rounded-lg p-4`}>
                  <div className={`font-medium text-${c.text}-900`}>{c.title}</div>
                  <div className={`text-sm text-${c.text}-700`}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
