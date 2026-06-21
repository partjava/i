'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'

const CHAPTERS = [
  { number: 1, title: 'Go语言入门', description: '语言简介与学习路线', href: '/study/computer/go/intro' },
  { number: 2, title: '开发环境配置', description: '安装与IDE配置', href: '/study/computer/go/setup' },
  { number: 3, title: '基础语法', description: '程序结构与变量', href: '/study/computer/go/basic' },
  { number: 4, title: '数据类型', description: '基本类型与复合类型', href: '/study/computer/go/datatypes' },
  { number: 5, title: '控制流程', description: '条件、循环与switch', href: '/study/computer/go/control' },
  { number: 6, title: '函数与方法', description: '函数定义与接收者', href: '/study/computer/go/functions' },
  { number: 7, title: '数组与切片', description: '数组、切片与操作', href: '/study/computer/go/arrays-slices' },
  { number: 8, title: 'Map与结构体', description: '映射与自定义类型', href: '/study/computer/go/map-struct' },
  { number: 9, title: '接口与类型系统', description: '接口、断言与泛型', href: '/study/computer/go/interfaces' },
  { number: 10, title: '并发编程', description: 'goroutine与channel', href: '/study/computer/go/concurrency' },
  { number: 11, title: 'Channel与Goroutine', description: '高级并发模式', href: '/study/computer/go/channels' },
  { number: 12, title: '错误处理', description: 'error、panic与defer', href: '/study/computer/go/error-handling' },
  { number: 13, title: '包管理与模块', description: 'go mod与依赖', href: '/study/computer/go/packages' },
  { number: 14, title: '标准库使用', description: '常用标准库包', href: '/study/computer/go/stdlib' },
  { number: 15, title: '文件操作', description: '文件读写与目录', href: '/study/computer/go/file-io' },
  { number: 16, title: '网络编程', description: 'TCP/UDP/HTTP', href: '/study/computer/go/networking' },
  { number: 17, title: 'HTTP服务开发', description: '路由、中间件与安全', href: '/study/computer/go/http' },
  { number: 18, title: 'RESTful API开发', description: 'REST设计与JSON', href: '/study/computer/go/rest' },
  { number: 19, title: '数据库操作', description: 'MySQL与GORM', href: '/study/computer/go/database' },
  { number: 20, title: '测试与性能优化', description: '单元测试与pprof', href: '/study/computer/go/testing' },
  { number: 21, title: '微服务开发', description: 'gRPC与服务治理', href: '/study/computer/go/microservices' },
  { number: 22, title: '容器化部署', description: 'Docker与K8s', href: '/study/computer/go/docker' },
  { number: 23, title: '项目实战', description: '综合实战项目', href: '/study/computer/go/projects' },
]

export default function GoHomePage() {
  return (
    <div>
      <BookCover
        title="Go"
        subtitle="Go Programming Language"
        description="系统学习Go语言开发，从基础语法到并发编程，掌握微服务与云原生开发技能"
        chapterCount={CHAPTERS.length}
        totalHours={12}
        chapters={CHAPTERS}
        icon="🔵"
        startHref="/study/computer/go/intro"
        theme={THEMES.computer}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么选择Go？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '简洁高效', desc: '语法简洁，学习曲线平缓' },
              { title: '并发原生', desc: 'goroutine+channel轻量并发' },
              { title: '性能卓越', desc: '编译型语言，执行速度快' },
              { title: '云原生首选', desc: 'Docker/K8s等用Go开发' },
              { title: '跨平台', desc: '支持主流操作系统' },
              { title: '生态活跃', desc: '丰富的标准库和第三方包' },
            ].map((f, i) => (
              <div key={i} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">学习路径</h2>
        <div className="space-y-6">
          {[
            { phase: '第一阶段：基础入门', desc: '熟悉Go语法', items: ['Go语言入门', '开发环境配置', '基础语法', '数据类型', '控制流程'] },
            { phase: '第二阶段：核心编程', desc: '掌握函数与数据结构', items: ['函数与方法', '数组与切片', 'Map与结构体', '接口与类型系统'] },
            { phase: '第三阶段：并发与网络', desc: '高并发与网络编程', items: ['并发编程', 'Channel与Goroutine', '错误处理', '网络编程', 'HTTP服务'] },
            { phase: '第四阶段：工程实践', desc: '包管理与数据库', items: ['包管理与模块', '标准库', '文件操作', 'RESTful API', '数据库操作'] },
            { phase: '第五阶段：进阶与实战', desc: '测试、微服务与部署', items: ['测试与优化', '微服务开发', '容器化部署', '项目实战'] },
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mr-4">阶段 {i + 1}</div>
                <h3 className="text-xl font-bold text-gray-900">{p.phase}</h3>
              </div>
              <p className="text-gray-600 mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">{p.items.map((item, j) => (<span key={j} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">{item}</span>))}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">职业发展方向</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: '后端开发工程师', desc: 'Go后端服务开发', skills: ['Go', 'MySQL', 'gRPC', 'Docker'] },
              { title: '云原生工程师', desc: '云原生应用开发', skills: ['K8s', 'Docker', 'Service Mesh', 'Go'] },
              { title: '系统开发工程师', desc: '基础组件与中间件', skills: ['Go', '分布式', '网络', '存储'] },
              { title: 'DevOps工程师', desc: '自动化与运维开发', skills: ['CI/CD', 'Docker', 'K8s', 'Go'] },
            ].map((c, i) => (
              <div key={i} className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{c.title}</h3>
                <p className="text-gray-600 mb-4">{c.desc}</p>
                <div className="flex flex-wrap gap-2">{c.skills.map((s, j) => (<span key={j} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">{s}</span>))}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">学习建议</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-600">学习方法</h4>
              <ul className="space-y-3">
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>按照推荐的学习路径循序渐进，打好基础</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>多动手实践，理论结合实际</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>遇到不懂的概念可以随时回顾之前的内容</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>多阅读官方文档和优秀开源项目</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-600">注意事项</h4>
              <ul className="space-y-3">
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>定期复习和总结，巩固所学知识</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>关注Go并发安全和性能优化</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>积极参与社区讨论，获取最新资源</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>尝试用Go技术解决实际问题，提升实战能力</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
