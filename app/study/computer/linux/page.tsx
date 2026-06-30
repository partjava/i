'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'

const CHAPTERS = [
  { number: 1,  title: '基础入门',            description: '了解Linux历史、发行版与环境搭建',  href: '/study/computer/linux/intro' },
  { number: 2,  title: '文件与目录管理',      description: '掌握Linux文件系统与常用命令',      href: '/study/computer/linux/file' },
  { number: 3,  title: '用户与权限管理',      description: '学习用户管理、权限与安全机制',      href: '/study/computer/linux/user' },
  { number: 4,  title: '软件与包管理',        description: '掌握软件安装、包管理与编译',        href: '/study/computer/linux/package' },
  { number: 5,  title: '进程与服务管理',      description: '学习进程、systemd与服务管理',        href: '/study/computer/linux/process' },
  { number: 6,  title: 'Shell与脚本编程',     description: '掌握Shell命令与Bash脚本编写',       href: '/study/computer/linux/shell' },
  { number: 7,  title: '网络与安全',          description: '学习网络配置与安全防护',            href: '/study/computer/linux/network' },
  { number: 8,  title: '性能监控与日志管理',  description: '掌握系统监控、分析与日志管理',      href: '/study/computer/linux/monitor' },
  { number: 9,  title: '实战与面试',          description: '综合演练与面试高频问题',            href: '/study/computer/linux/practice' },
]

const features = [
  { title: '开源自由', desc: 'Linux是最流行的开源操作系统' },
  { title: '高效稳定', desc: '广泛应用于服务器、嵌入式等领域' },
  { title: '命令行强大', desc: 'Shell脚本和命令行工具极为丰富' },
  { title: '安全可靠', desc: '权限管理和安全机制完善' },
  { title: '社区活跃', desc: '全球开发者社区支持，资源丰富' },
  { title: '实用性强', desc: '广泛应用于开发、运维、云计算等场景' },
]

const learningPath = [
  { title: '第一阶段：基础与文件管理', desc: '掌握Linux基础和文件目录操作', items: [CHAPTERS[0], CHAPTERS[1]] },
  { title: '第二阶段：用户与权限管理', desc: '学习用户、权限和安全管理', items: [CHAPTERS[2]] },
  { title: '第三阶段：软件与进程管理', desc: '掌握软件包、进程与服务管理', items: [CHAPTERS[3], CHAPTERS[4]] },
  { title: '第四阶段：脚本与网络', desc: '学习Shell脚本和网络安全', items: [CHAPTERS[5], CHAPTERS[6]] },
  { title: '第五阶段：性能与实战', desc: '掌握性能监控和实战技巧', items: [CHAPTERS[7], CHAPTERS[8]] },
]

const careerPaths = [
  { title: '运维工程师', desc: 'Linux服务器部署与维护', skills: ['自动化运维', '脚本编程', '监控报警', '安全加固'] },
  { title: '后端开发工程师', desc: '基于Linux的后端开发', skills: ['服务部署', '性能优化', '数据库', '网络编程'] },
  { title: '嵌入式开发工程师', desc: '嵌入式Linux系统开发', skills: ['驱动开发', '交叉编译', '硬件接口', '系统裁剪'] },
  { title: '安全工程师', desc: '系统安全与渗透测试', skills: ['权限管理', '漏洞扫描', '安全加固', '日志分析'] },
]

export default function LinuxLearningPage() {
  const theme = THEMES.computer

  return (
    <div>
      <BookCover
        title="Linux 系统"
        subtitle="Linux System"
        description="Linux是最流行的开源操作系统，广泛应用于服务器、嵌入式、云计算等领域。本课程将带你系统学习Linux，提升开发与运维能力。"
        chapterCount={CHAPTERS.length}
        totalHours={7}
        chapters={CHAPTERS}
        icon="🐧"
        startHref="/study/computer/linux/intro"
        theme={theme}
      />

      {/* 课程特点 */}
      <div className="py-12 sm:py-16 transition-colors duration-300" style={{ background: theme.paperBg }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: theme.accent }}>为什么学习Linux？</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
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
                {['按照推荐的学习路径循序渐进，打好基础', '多动手实践，理论结合实际', '遇到不懂的概念可以随时回顾之前的内容', '多阅读官方文档和优秀开源项目'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircleOutlined className="mt-0.5" style={{ color: '#22c55e' }} /><span className="text-sm">{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg p-6" style={{ background: theme.paperCard || theme.paperBg, border: '1px solid rgba(0,0,0,0.06)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.accent }}>注意事项</h3>
              <ul className="space-y-3">
                {['定期复习和总结，巩固所学知识', '关注系统安全性和权限管理', '积极参与社区讨论，获取最新资源', '尝试用Linux解决实际问题，提升实战能力'].map((item, i) => (
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
