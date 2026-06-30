'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1,  title: '数据库基础与环境',    description: '了解MySQL数据库的基本概念与环境配置',  href: '/study/computer/sql/intro' },
  { number: 2,  title: '基本查询（SELECT）',  description: '掌握SQL基本查询语法与常用技巧',       href: '/study/computer/sql/select' },
  { number: 3,  title: '条件与排序',           description: '掌握SQL条件筛选与结果排序方法',        href: '/study/computer/sql/where-order' },
  { number: 4,  title: '多表查询与连接',       description: '掌握多表连接、复杂查询与优化技巧',    href: '/study/computer/sql/join' },
  { number: 5,  title: '数据增删改',           description: '掌握数据插入、批量更新与安全删除技巧',  href: '/study/computer/sql/crud' },
  { number: 6,  title: '聚合与分组',           description: '掌握分组统计、分组过滤与窗口函数应用',  href: '/study/computer/sql/group' },
  { number: 7,  title: '子查询与视图',         description: '掌握复杂子查询、视图设计与权限控制',  href: '/study/computer/sql/subquery-view' },
  { number: 8,  title: '索引与性能优化',       description: '掌握索引原理、SQL优化与事务锁机制',   href: '/study/computer/sql/index-optimize' },
  { number: 9,  title: '实战练习',             description: '综合运用SQL技能解决实际业务与面试问题', href: '/study/computer/sql/projects' },
]

const sqlFeatures = [
  { title: '通用性强', desc: 'SQL是关系型数据库的通用查询语言' },
  { title: '易学易用', desc: '语法简洁，易于上手' },
  { title: '高效查询', desc: '支持复杂数据操作和高效检索' },
  { title: '广泛应用', desc: '被各类数据库和企业广泛采用' },
  { title: '生态丰富', desc: '配套工具和资源丰富' },
  { title: '职业必备', desc: '数据分析、开发、运维等岗位必备技能' },
]

const learningPath = [
  { title: '第一阶段：基础入门', desc: '掌握SQL基础语法和数据库环境', items: [CHAPTERS[0], CHAPTERS[1], CHAPTERS[2]] },
  { title: '第二阶段：多表与数据操作', desc: '学习多表查询、数据增删改', items: [CHAPTERS[3], CHAPTERS[4]] },
  { title: '第三阶段：聚合与分组', desc: '掌握聚合函数和分组操作', items: [CHAPTERS[5]] },
  { title: '第四阶段：进阶与优化', desc: '学习子查询、视图、索引与性能优化', items: [CHAPTERS[6], CHAPTERS[7]] },
  { title: '第五阶段：实战应用', desc: '综合应用所学知识，完成实战练习', items: [CHAPTERS[8]] },
]

const careerPaths = [
  { title: '数据库开发工程师', desc: '数据库设计、开发与优化', skills: ['SQL优化', '数据库设计', '性能调优', '数据建模'] },
  { title: '数据分析师', desc: '数据查询、分析与可视化', skills: ['数据分析', '可视化', '数据挖掘', '报表开发'] },
  { title: '后端开发工程师', desc: 'Web后端与数据接口开发', skills: ['API设计', 'ORM', '数据库集成', '性能优化'] },
  { title: '运维工程师', desc: '数据库运维与安全管理', skills: ['备份恢复', '权限管理', '监控报警', '安全加固'] },
]

export default function SqlLearningPage() {
  const theme = THEMES.computer

  return (
    <div>
      <BookCover
        title="SQL 学习"
        subtitle="Structured Query Language"
        description="SQL是关系型数据库的标准查询语言，广泛应用于数据分析、开发、运维等领域。本课程将带你系统学习SQL，助力成为数据高手。"
        chapterCount={CHAPTERS.length}
        totalHours={7}
        chapters={CHAPTERS}
        icon="🗄️"
        startHref="/study/computer/sql/intro"
        theme={theme}
      />

      {/* 课程特点 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>为什么选择SQL？</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sqlFeatures.map((f, i) => (
              <div
                key={i}
                className="rounded-lg p-5 text-center transition-shadow hover:shadow-md"
                style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}
              >
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
              <div
                key={i}
                className="rounded-lg p-6 transition-shadow hover:shadow-md"
                style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{ background: `${theme.accent}15`, color: theme.accent }}
                  >
                    阶段 {i + 1}
                  </span>
                  <h3 className="text-lg font-bold">{phase.title}</h3>
                </div>
                <p className="text-sm opacity-70 mb-4">{phase.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {phase.items.map((item, j) => (
                    <Link
                      key={j}
                      href={item.href}
                      className="text-sm px-3 py-1.5 rounded-md transition-colors hover:opacity-80"
                      style={{ background: `${theme.accent}0D`, color: theme.accent }}
                    >
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
              <div
                key={i}
                className="rounded-lg p-6 transition-shadow hover:shadow-md"
                style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <h3 className="text-lg font-semibold mb-1" style={{ color: theme.accent }}>{career.title}</h3>
                <p className="text-sm opacity-70 mb-4">{career.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ background: `${theme.accent}10`, color: theme.accent }}
                    >
                      {skill}
                    </span>
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
                {['定期复习和总结，巩固所学知识', '关注SQL规范和性能优化', '积极参与社区讨论，获取最新资源', '尝试用SQL解决实际问题，提升实战能力'].map((item, i) => (
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
