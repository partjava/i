'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'

const CHAPTERS = [
  { number: 1, title: '软件建模基础', description: '基本概念与建模方法', href: '/study/se/modeling/basic' },
  { number: 2, title: 'UML建模', description: '统一建模语言', href: '/study/se/modeling/uml' },
  { number: 3, title: '设计模式', description: '常见设计模式及应用', href: '/study/se/modeling/patterns' },
  { number: 4, title: '架构设计', description: '软件架构设计原理', href: '/study/se/modeling/architecture' },
  { number: 5, title: '实战案例与项目', description: '真实项目案例分析', href: '/study/se/modeling/cases' },
  { number: 6, title: '软件测试', description: '测试方法与策略', href: '/study/se/modeling/testing' },
  { number: 7, title: '软件维护', description: '软件维护与演化', href: '/study/se/modeling/maintenance' },
]

const FEATURES = [
  { title: '建模技术', desc: '完整的软件建模方法体系' },
  { title: 'UML设计', desc: '统一建模语言实战应用' },
  { title: '架构设计', desc: '软件架构设计原理与实践' },
  { title: '工程实践', desc: '软件工程最佳实践' },
]

const ROADMAP = [
  { phase: '第一阶段：建模基础', desc: '掌握软件建模基本概念与UML语言', items: ['软件建模基础', 'UML建模'] },
  { phase: '第二阶段：设计模式', desc: '学习设计模式与架构设计方法', items: ['设计模式', '架构设计'] },
  { phase: '第三阶段：实战应用', desc: '通过真实案例掌握工程实践', items: ['实战案例与项目'] },
  { phase: '第四阶段：质量保证', desc: '测试方法与维护策略', items: ['软件测试', '软件维护'] },
]

const CAREERS = [
  { title: '系统分析师', desc: '需求分析与系统设计', skills: ['UML', '需求分析', '系统设计', '架构'] },
  { title: '软件设计师', desc: '软件架构与详细设计', skills: ['设计模式', '架构设计', 'UML', '领域建模'] },
  { title: '技术主管', desc: '技术团队管理与指导', skills: ['项目管理', '技术选型', '架构评审', '团队协作'] },
  { title: '质量工程师', desc: '软件质量保障', skills: ['软件测试', 'CI/CD', '代码审查', '自动化'] },
]

const STUDY_TIPS = {
  methods: [
    '理论与实践结合，动手绘制UML图',
    '从基础建模开始，逐步深入架构设计',
    '多参与开源项目，积累工程实践经验',
    '阅读经典设计模式书籍，理解设计思想',
  ],
  cautions: [
    '避免过度设计，保持架构简洁',
    '重视需求分析，确保建模准确性',
    '关注设计模式的使用场景而非滥用',
    '注重测试驱动开发，保证代码质量',
  ],
}

export default function ModelingPage() {
  return (
    <div>
      <BookCover
        title="软件建模与设计"
        subtitle="Software Modeling & Design"
        description="掌握软件建模与设计核心技术，从UML建模到架构设计，提升软件工程实践能力"
        chapterCount={CHAPTERS.length}
        totalHours={25}
        chapters={CHAPTERS}
        icon="📐"
        startHref="/study/se/modeling/basic"
        theme={THEMES.software}
      />

      {/* 核心特点 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">课程特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 学习路径 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">学习路径</h2>
        <div className="space-y-6">
          {ROADMAP.map((p, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full text-sm font-medium mr-4">阶段 {i + 1}</div>
                <h3 className="text-xl font-bold text-gray-900">{p.phase}</h3>
              </div>
              <p className="text-gray-600 mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.items.map((item, j) => (
                  <span key={j} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 职业方向 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">职业发展方向</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAREERS.map((c, i) => (
              <div key={i} className="p-6 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-teal-600">{c.title}</h3>
                <p className="text-gray-600 mb-4">{c.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {c.skills.map((s, j) => (
                    <span key={j} className="bg-teal-100 text-teal-600 px-2 py-1 rounded text-xs font-medium">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 学习建议 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">学习建议</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-teal-600">学习方法</h4>
              <ul className="space-y-3">
                {STUDY_TIPS.methods.map((tip, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircleOutlined className="text-teal-500 mr-3 mt-1" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-teal-600">注意事项</h4>
              <ul className="space-y-3">
                {STUDY_TIPS.cautions.map((tip, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircleOutlined className="text-teal-500 mr-3 mt-1" />
                    <span>{tip}</span>
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
