'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1,  title: 'JavaEE概述',              description: '了解JavaEE的定义、发展历程和平台架构',                        href: '/study/se/javaee/intro' },
  { number: 2,  title: 'JavaEE核心组件',          description: '掌握Servlet、JSP、EJB、JPA等核心组件',                         href: '/study/se/javaee/components' },
  { number: 3,  title: 'Web开发基础',             description: '掌握Servlet基础、JSP技术和过滤器监听器',                         href: '/study/se/javaee/web' },
  { number: 4,  title: '数据库访问技术',           description: '掌握JDBC、JPA、Hibernate等数据持久化技术',                      href: '/study/se/javaee/db' },
  { number: 5,  title: '企业级服务',               description: '掌握事务管理、安全认证、消息服务和定时任务',                     href: '/study/se/javaee/enterprise' },
  { number: 6,  title: '安全与权限管理',           description: '掌握认证授权、安全注解、web.xml配置和常见安全防护',              href: '/study/se/javaee/security' },
  { number: 7,  title: 'Web服务',                  description: '掌握JAX-WS、JAX-RS和JSON/XML数据处理',                         href: '/study/se/javaee/webservice' },
  { number: 8,  title: 'JavaEE框架',              description: '掌握Spring、Struts、Hibernate、MyBatis等主流框架',               href: '/study/se/javaee/frameworks' },
  { number: 9,  title: '异步处理与并发',           description: '掌握线程池、异步Servlet、消息驱动Bean和并发工具类',              href: '/study/se/javaee/async' },
  { number: 10, title: '微服务架构',               description: '掌握Spring Cloud、服务注册发现、配置中心等微服务核心技术',        href: '/study/se/javaee/microservice' },
  { number: 11, title: '实战项目开发',             description: '掌握企业级项目开发流程、模块设计和部署运维',                      href: '/study/se/javaee/project' },
  { number: 12, title: '开发工具与环境',           description: '掌握主流IDE、构建工具、调试测试和常见问题排查',                   href: '/study/se/javaee/tools' },
  { number: 13, title: '性能调优与监控',           description: '掌握JVM调优、SQL优化、代码优化和监控工具',                       href: '/study/se/javaee/performance' },
  { number: 14, title: '容器化与云服务',           description: '掌握Docker容器化、Kubernetes编排和云服务部署',                   href: '/study/se/javaee/cloud' },
  { number: 15, title: 'DevOps与CI/CD',           description: '掌握Jenkins、GitLab CI、自动化测试和CI/CD流程',                 href: '/study/se/javaee/devops' },
  { number: 16, title: '前沿技术趋势',             description: '了解云原生、Service Mesh、AIOps和架构演进趋势',                   href: '/study/se/javaee/trend' },
  { number: 17, title: '学习建议',                 description: '获取学习路线、实践方法和资源推荐',                                href: '/study/se/javaee/suggestion' },
]

const features = [
  { icon: '☕', title: '企业级开发', desc: '完整的Java EE企业级应用开发' },
  { icon: '🌐', title: 'Web技术栈', desc: '全面的Web开发技术体系' },
  { icon: '🏗️', title: '微服务架构', desc: '现代微服务架构设计与实现' },
  { icon: '🚀', title: '云原生', desc: '容器化与云服务部署实践' },
]

const learningPath = [
  { title: '第一阶段：基础入门', desc: '了解JavaEE体系，掌握核心组件', items: [CHAPTERS[0], CHAPTERS[1], CHAPTERS[11]] },
  { title: '第二阶段：Web开发', desc: '学习Web开发、数据库和Web服务', items: [CHAPTERS[2], CHAPTERS[3], CHAPTERS[6]] },
  { title: '第三阶段：企业级应用', desc: '掌握企业级服务和安全框架', items: [CHAPTERS[4], CHAPTERS[5], CHAPTERS[7]] },
  { title: '第四阶段：高级特性', desc: '学习异步处理、微服务和性能调优', items: [CHAPTERS[8], CHAPTERS[9], CHAPTERS[12]] },
  { title: '第五阶段：现代化开发', desc: '掌握容器化、CI/CD和前沿技术', items: [CHAPTERS[10], CHAPTERS[13], CHAPTERS[14], CHAPTERS[15], CHAPTERS[16]] },
]

const careerPaths = [
  { title: 'Java后端工程师', desc: '企业级Java应用开发', skills: ['Servlet/JSP', 'Spring', 'MyBatis', '微服务'] },
  { title: '架构师', desc: '系统架构设计与技术选型', skills: ['架构设计', '微服务', '云原生', '性能优化'] },
  { title: '全栈工程师', desc: '前后端全栈开发', skills: ['JavaEE', 'Web开发', '数据库', 'DevOps'] },
  { title: '运维开发工程师', desc: '系统运维与CI/CD', skills: ['Docker', 'K8s', 'Jenkins', '监控'] },
]

export default function JavaEELearningPage() {
  const theme = THEMES.software

  return (
    <div>
      <BookCover
        title="Java EE"
        subtitle="Java Enterprise Edition"
        description="JavaEE是构建大型企业级应用的成熟平台，从Servlet/JSP到Spring Cloud微服务，涵盖完整的Web开发、企业级服务、安全权限、性能调优等技术栈。本课程带你系统掌握Java企业级开发，成为企业级Java开发专家。"
        chapterCount={CHAPTERS.length}
        totalHours={40}
        chapters={CHAPTERS}
        icon="☕"
        startHref="/study/se/javaee/intro"
        theme={theme}
      />

      {/* 课程特色 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>课程特色</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="rounded-lg p-5 text-center transition-shadow hover:shadow-md"
                style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm opacity-70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 学习路径 */}
      <div className="py-12 sm:py-16" style={{ background: '#f6f4ef' }}>
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
      <div className="py-12 sm:py-16" style={{ background: '#f6f4ef' }}>
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
                {['定期复习和总结，巩固所学知识', '关注JavaEE规范和框架更新', '积极参与社区讨论，获取最新资源', '尝试用JavaEE解决实际问题，提升实战能力'].map((item, i) => (
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
