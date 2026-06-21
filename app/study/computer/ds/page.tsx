'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1,  title: '基础与复杂度分析', description: '掌握数据结构基础和算法复杂度分析方法',     href: '/study/computer/ds/basic' },
  { number: 2,  title: '线性表',           description: '学习线性表的顺序存储与链式存储实现',       href: '/study/computer/ds/linear' },
  { number: 3,  title: '字符串与算法',     description: '掌握字符串匹配与常用字符串算法',           href: '/study/computer/ds/string' },
  { number: 4,  title: '树与二叉树',       description: '深入理解树结构与二叉树遍历算法',           href: '/study/computer/ds/tree' },
  { number: 5,  title: '图与图算法',       description: '掌握图结构及其遍历、最短路径等算法',       href: '/study/computer/ds/graph' },
  { number: 6,  title: '排序与查找',       description: '学习经典排序算法与查找算法',               href: '/study/computer/ds/sort' },
  { number: 7,  title: '哈希表与集合',     description: '理解哈希表原理与集合操作',                 href: '/study/computer/ds/hash' },
  { number: 8,  title: '递归与分治',       description: '深入理解递归思想与分治算法',               href: '/study/computer/ds/recursion' },
  { number: 9,  title: '动态规划',         description: '掌握动态规划核心思想与经典问题',           href: '/study/computer/ds/dp' },
  { number: 10, title: '面试题与实战',     description: '综合运用数据结构与算法解决实际问题',       href: '/study/computer/ds/interview' },
]

const dsFeatures = [
  { title: '算法基础',     desc: '打好编程算法基础，提升解题能力' },
  { title: '结构多样',     desc: '涵盖线性、树、图等多种数据结构' },
  { title: '面试必备',     desc: '各大厂面试高频考点' },
  { title: '实战导向',     desc: '理论结合实践，提升工程能力' },
  { title: '应用广泛',     desc: '广泛应用于各类开发和工程场景' },
  { title: '思维训练',     desc: '提升抽象思维和问题分解能力' },
]

const learningPath = [
  { title: '第一阶段：基础与线性结构',   desc: '掌握数据结构基础和线性表相关内容',     items: [CHAPTERS[0], CHAPTERS[1]] },
  { title: '第二阶段：字符串与树结构',   desc: '学习字符串算法和树结构相关内容',        items: [CHAPTERS[2], CHAPTERS[3]] },
  { title: '第三阶段：图与高级算法',     desc: '掌握图结构及其算法，学习排序、查找等',  items: [CHAPTERS[4], CHAPTERS[5], CHAPTERS[6]] },
  { title: '第四阶段：递归与动态规划',   desc: '深入理解递归、分治和动态规划思想',      items: [CHAPTERS[7], CHAPTERS[8]] },
  { title: '第五阶段：面试与实战',       desc: '综合应用所学知识，解决实际问题',         items: [CHAPTERS[9]] },
]

const careerPaths = [
  { title: '算法工程师',           desc: '算法设计与优化，解决实际问题',     skills: ['算法设计', '数据结构', '复杂度分析', '优化技巧'] },
  { title: '后端开发工程师',       desc: '高性能服务与数据处理',             skills: ['高并发', '数据库', '缓存', '分布式'] },
  { title: '前端开发工程师',       desc: '前端数据结构与算法应用',           skills: ['算法可视化', '数据处理', '性能优化', '工程实践'] },
  { title: '大数据开发工程师',     desc: '大数据平台与分布式计算',           skills: ['分布式算法', '数据挖掘', '数据分析', '性能调优'] },
]

export default function DsLearningPage() {
  const theme = THEMES.computer

  return (
    <div>
      <BookCover
        title="数据结构与算法"
        subtitle="Data Structures & Algorithms"
        description="数据结构与算法是编程的核心基础，广泛应用于各类开发、面试和工程实践。本课程将带你系统学习数据结构与算法，提升编程能力和思维水平。"
        chapterCount={CHAPTERS.length}
        totalHours={8}
        chapters={CHAPTERS}
        icon="📊"
        startHref="/study/computer/ds/basic"
        theme={theme}
      />

      {/* 课程特点 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>为什么学习数据结构与算法？</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dsFeatures.map((f, i) => (
              <div key={i} className="rounded-lg p-5 text-center transition-shadow hover:shadow-md" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm opacity-70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 完整课程列表 */}
      <div className="py-12 sm:py-16" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>完整课程大纲</h2>
          <p className="text-center text-sm opacity-70 mb-8">系统掌握数据结构与算法技能</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHAPTERS.map((course, index) => (
              <Link key={index} href={course.href}>
                <div className="rounded-lg p-4 text-center transition-shadow hover:shadow-md cursor-pointer" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded" style={{ background: `${theme.accent}15`, color: theme.accent }}>{index + 1}</span>
                  </div>
                  <h4 className="text-sm font-medium">{course.title}</h4>
                </div>
              </Link>
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
                    <Link key={j} href={item.href} className="text-sm px-3 py-1.5 rounded-md transition-colors hover:opacity-80" style={{ background: `${theme.accent}0D`, color: theme.accent }}>{item.title}</Link>
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
                {['按照推荐的学习路径循序渐进，打好基础', '多动手实践，理论结合实际', '遇到不懂的概念可以随时回顾之前的内容', '多阅读经典书籍和优秀开源项目'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircleOutlined className="mt-0.5" style={{ color: '#22c55e' }} /><span className="text-sm">{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.accent }}>注意事项</h3>
              <ul className="space-y-3">
                {['定期复习和总结，巩固所学知识', '关注算法复杂度和性能优化', '积极参与社区讨论，获取最新资源', '尝试用算法解决实际问题，提升实战能力'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircleOutlined className="mt-0.5" style={{ color: '#22c55e' }} /><span className="text-sm">{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
