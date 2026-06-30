'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'

const CHAPTERS = [
  { number: 1, title: 'HTML基础', description: '文档结构与常用标签', href: '/study/computer/frontend/html' },
  { number: 2, title: '表单与语义化', description: '表单控件与语义化标签', href: '/study/computer/frontend/html-forms' },
  { number: 3, title: 'CSS基础', description: '选择器、盒模型与布局', href: '/study/computer/frontend/css' },
  { number: 4, title: 'CSS布局', description: 'Flex、Grid与定位', href: '/study/computer/frontend/css-layout' },
  { number: 5, title: 'CSS动画与过渡', description: 'Transition与Keyframes', href: '/study/computer/frontend/css-animation' },
  { number: 6, title: 'CSS高级与预处理器', description: 'Sass/Less与现代CSS', href: '/study/computer/frontend/css-advanced' },
  { number: 7, title: '响应式设计', description: '媒体查询与移动优先', href: '/study/computer/frontend/responsive' },
  { number: 8, title: 'JavaScript基础', description: '变量、函数与作用域', href: '/study/computer/frontend/js' },
  { number: 9, title: 'ES6+新特性', description: '箭头函数、Promise与模块', href: '/study/computer/frontend/es6' },
  { number: 10, title: 'DOM与事件', description: '节点操作与事件机制', href: '/study/computer/frontend/dom' },
  { number: 11, title: '异步与Promise', description: '异步编程与async/await', href: '/study/computer/frontend/async' },
  { number: 12, title: '前端安全', description: 'XSS、CSRF与安全防护', href: '/study/computer/frontend/security' },
  { number: 13, title: '前端工程化', description: '模块化、构建与自动化', href: '/study/computer/frontend/engineering' },
  { number: 14, title: '包管理与构建工具', description: 'npm、Webpack与Vite', href: '/study/computer/frontend/build-tools' },
  { number: 15, title: '性能优化', description: '加载、渲染与缓存优化', href: '/study/computer/frontend/performance' },
  { number: 16, title: 'React基础', description: '组件、JSX与Hooks', href: '/study/computer/frontend/react' },
  { number: 17, title: 'React进阶', description: 'HOC、状态管理与路由', href: '/study/computer/frontend/react-advanced' },
  { number: 18, title: 'Vue基础', description: '模板语法、指令与组件', href: '/study/computer/frontend/vue' },
  { number: 19, title: 'Vue进阶', description: '组合式API、Pinia与路由', href: '/study/computer/frontend/vue-advanced' },
  { number: 20, title: '前端项目实战', description: '完整项目开发流程', href: '/study/computer/frontend/projects' },
]

export default function FrontendHomePage() {
  return (
    <div>
      <BookCover
        title="Web前端开发"
        subtitle="Frontend Web Development"
        description="系统学习Web前端开发技术，从HTML/CSS到React/Vue，掌握完整的前端工程化技能"
        chapterCount={CHAPTERS.length}
        totalHours={15}
        chapters={CHAPTERS}
        icon="🌐"
        startHref="/study/computer/frontend/html"
        theme={THEMES.computer}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么选择Web前端开发？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '用户体验', desc: '打造美观流畅的交互界面' },
              { title: '工程化', desc: '模块化、自动化构建与部署' },
              { title: '生态丰富', desc: '框架、工具与社区资源丰富' },
              { title: '响应式设计', desc: '适配多端多设备的界面' },
              { title: '社区活跃', desc: '开源生态与技术更新快速' },
              { title: '高薪热门', desc: '市场需求大，职业前景广阔' },
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
            { phase: '第一阶段：HTML与CSS基础', desc: '掌握网页结构与样式', items: ['HTML基础', '表单与语义化', 'CSS基础', 'CSS布局', 'CSS动画与过渡', 'CSS高级与预处理器', '响应式设计'] },
            { phase: '第二阶段：JavaScript与ES6', desc: '掌握编程语言核心', items: ['JavaScript基础', 'ES6+新特性', 'DOM与事件', '异步与Promise'] },
            { phase: '第三阶段：工程化与安全', desc: '构建工具与安全防护', items: ['前端安全', '前端工程化', '包管理与构建工具', '性能优化'] },
            { phase: '第四阶段：主流框架', desc: '学习React与Vue', items: ['React基础', 'React进阶', 'Vue基础', 'Vue进阶'] },
            { phase: '第五阶段：项目实战', desc: '综合应用完成实战项目', items: ['前端项目实战'] },
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mr-4">阶段 {i + 1}</div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">职业发展方向</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: '前端开发工程师', desc: 'Web前端应用开发', skills: ['HTML/CSS', 'JavaScript', 'React/Vue', '工程化'] },
              { title: '全栈开发工程师', desc: '前后端全栈开发', skills: ['Node.js', '数据库', '前端框架', '部署运维'] },
              { title: '移动端开发工程师', desc: '移动端与跨平台开发', skills: ['React Native', 'Flutter', '小程序', 'Hybrid'] },
              { title: '前端架构师', desc: '前端架构设计与优化', skills: ['架构设计', '性能优化', '团队管理', '技术选型'] },
            ].map((c, i) => (
              <div key={i} className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{c.title}</h3>
                <p className="text-gray-600 mb-4">{c.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {c.skills.map((s, j) => (
                    <span key={j} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">{s}</span>
                  ))}
                </div>
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
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>关注前端安全和性能优化</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>积极参与社区讨论，获取最新资源</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>尝试用前端技术解决实际问题，提升实战能力</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
