'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'

const CHAPTERS = [
  { number: 1, title: 'PHP编程入门', description: '语言简介与开发环境', href: '/study/computer/php/intro' },
  { number: 2, title: '开发环境配置', description: '安装与IDE工具', href: '/study/computer/php/setup' },
  { number: 3, title: '基础语法与数据类型', description: '语法、变量与类型', href: '/study/computer/php/basic' },
  { number: 4, title: '数据类型与变量', description: '类型详解与作用域', href: '/study/computer/php/datatypes' },
  { number: 5, title: '控制流程与函数', description: '条件、循环与函数', href: '/study/computer/php/control-functions' },
  { number: 6, title: '数组与字符串', description: '数组操作与字符串函数', href: '/study/computer/php/arrays-strings' },
  { number: 7, title: '面向对象编程', description: '类、继承、接口与trait', href: '/study/computer/php/oop' },
  { number: 8, title: '文件与异常处理', description: '文件操作与异常机制', href: '/study/computer/php/file-exception' },
  { number: 9, title: 'Web开发基础', description: '表单、Session与安全', href: '/study/computer/php/web' },
  { number: 10, title: '数据库操作', description: 'MySQLi与PDO操作', href: '/study/computer/php/db' },
  { number: 11, title: '会话管理与Cookie', description: 'Session与Cookie安全', href: '/study/computer/php/session-cookie' },
  { number: 12, title: '表单处理与数据验证', description: '验证与安全防护', href: '/study/computer/php/forms-validation' },
  { number: 13, title: '常用扩展与包管理', description: 'GD、cURL与Composer', href: '/study/computer/php/extensions-composer' },
  { number: 14, title: '安全与性能优化', description: '安全策略与缓存优化', href: '/study/computer/php/security-performance' },
  { number: 15, title: '测试与调试', description: 'PHPUnit、Xdebug与日志', href: '/study/computer/php/testing-debugging' },
  { number: 16, title: '框架与项目实战', description: 'Laravel、ThinkPHP', href: '/study/computer/php/frameworks-projects' },
  { number: 17, title: '高级特性与底层原理', description: 'Zend引擎与垃圾回收', href: '/study/computer/php/advanced-internals' },
  { number: 18, title: '并发与异步编程', description: '多进程、协程与ReactPHP', href: '/study/computer/php/concurrency-async' },
  { number: 19, title: 'Swoole与高性能开发', description: 'Swoole协程服务器', href: '/study/computer/php/swoole-highperf' },
  { number: 20, title: '自动化部署与CI/CD', description: 'CI/CD流水线', href: '/study/computer/php/devops-cicd' },
  { number: 21, title: '云原生与容器化', description: 'Docker与Kubernetes', href: '/study/computer/php/cloud-docker' },
  { number: 22, title: '常见问题与面试题', description: '面试题与算法', href: '/study/computer/php/faq' },
]

export default function PhpHomePage() {
  return (
    <div>
      <BookCover
        title="PHP"
        subtitle="PHP: Hypertext Preprocessor"
        description="系统学习PHP开发技术，从基础语法到Laravel框架，掌握Web后端开发全栈技能"
        chapterCount={CHAPTERS.length}
        totalHours={12}
        chapters={CHAPTERS}
        icon="🐘"
        startHref="/study/computer/php/intro"
        theme={THEMES.computer}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么选择PHP？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Web主力', desc: '全球超70%网站使用PHP' },
              { title: '生态丰富', desc: 'WordPress、Laravel等成熟生态' },
              { title: '易学易用', desc: '语法简单，上手快速' },
              { title: '部署灵活', desc: '兼容Apache/Nginx，部署方便' },
              { title: '高性能', desc: 'PHP 8 + JIT大幅提升性能' },
              { title: '工程化', desc: 'Composer、PSR规范完善' },
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
            { phase: '第一阶段：基础入门', desc: '掌握PHP语法基础', items: ['PHP编程入门', '开发环境配置', '基础语法与数据类型', '数据类型与变量', '控制流程与函数', '数组与字符串'] },
            { phase: '第二阶段：进阶编程', desc: '面向对象与Web开发', items: ['面向对象编程', '文件与异常处理', 'Web开发基础', '数据库操作', '会话管理'] },
            { phase: '第三阶段：工程实践', desc: '安全、测试与框架', items: ['表单处理', '扩展与包管理', '安全与性能', '测试与调试', '框架与项目实战'] },
            { phase: '第四阶段：高级特性', desc: '底层原理与高性能', items: ['高级特性与底层原理', '并发与异步', 'Swoole高性能开发'] },
            { phase: '第五阶段：运维与部署', desc: 'CI/CD与容器化', items: ['自动化部署', '云原生与容器化', '常见问题与面试题'] },
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
              { title: 'Web后端开发工程师', desc: 'PHP应用与API开发', skills: ['PHP', 'MySQL', 'Laravel', 'RESTful'] },
              { title: '全栈开发工程师', desc: '前后端全栈开发', skills: ['PHP', 'JavaScript', 'Vue/React', 'Linux'] },
              { title: '运维开发工程师', desc: 'CI/CD与云原生运维', skills: ['Docker', 'K8s', 'CI/CD', '监控'] },
              { title: '架构师', desc: '系统架构与性能优化', skills: ['架构设计', '高并发', '微服务', '团队管理'] },
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
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>关注PHP安全和性能优化</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>积极参与社区讨论，获取最新资源</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>尝试用PHP技术解决实际问题，提升实战能力</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
