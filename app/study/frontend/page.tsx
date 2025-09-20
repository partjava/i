"use client";

import { Card, Progress, Button, Tag } from "antd";
import { BookOutlined, RocketOutlined, TrophyOutlined, CodeOutlined, BulbOutlined, SafetyOutlined, ThunderboltOutlined, TeamOutlined, CheckCircleOutlined, PlayCircleOutlined, FileTextOutlined, ExperimentOutlined } from "@ant-design/icons";
import Link from "next/link";

const frontendCourses = [
  { name: "HTML基础", href: "/study/frontend/html", duration: "30分钟" },
  { name: "表单与语义化", href: "/study/frontend/html-forms", duration: "30分钟" },
  { name: "CSS基础", href: "/study/frontend/css", duration: "40分钟" },
  { name: "CSS布局", href: "/study/frontend/css-layout", duration: "40分钟" },
  { name: "CSS动画与过渡", href: "/study/frontend/css-animation", duration: "30分钟" },
  { name: "CSS高级与预处理器", href: "/study/frontend/css-advanced", duration: "30分钟" },
  { name: "响应式设计", href: "/study/frontend/responsive", duration: "30分钟" },
  { name: "JavaScript基础", href: "/study/frontend/js", duration: "60分钟" },
  { name: "ES6+新特性", href: "/study/frontend/es6", duration: "40分钟" },
  { name: "DOM与事件", href: "/study/frontend/dom", duration: "40分钟" },
  { name: "异步与Promise", href: "/study/frontend/async", duration: "30分钟" },
  { name: "前端安全", href: "/study/frontend/security", duration: "30分钟" },
  { name: "前端工程化", href: "/study/frontend/engineering", duration: "30分钟" },
  { name: "包管理与构建工具", href: "/study/frontend/build-tools", duration: "30分钟" },
  { name: "性能优化", href: "/study/frontend/performance", duration: "30分钟" },
  { name: "React基础", href: "/study/frontend/react", duration: "40分钟" },
  { name: "React进阶", href: "/study/frontend/react-advanced", duration: "40分钟" },
  { name: "Vue基础", href: "/study/frontend/vue", duration: "40分钟" },
  { name: "Vue进阶", href: "/study/frontend/vue-advanced", duration: "40分钟" },
  { name: "前端项目实战", href: "/study/frontend/projects", duration: "60分钟" }
];

const learningPath = [
  {
    title: "第一阶段：HTML与CSS基础",
    description: "掌握网页结构与样式基础",
    items: [frontendCourses[0], frontendCourses[1], frontendCourses[2], frontendCourses[3], frontendCourses[4], frontendCourses[5], frontendCourses[6]],
  },
  {
    title: "第二阶段：JavaScript与ES6",
    description: "学习JS基础、ES6新特性和DOM操作",
    items: [frontendCourses[7], frontendCourses[8], frontendCourses[9], frontendCourses[10]],
  },
  {
    title: "第三阶段：工程化与安全",
    description: "掌握前端工程化、构建工具与安全",
    items: [frontendCourses[11], frontendCourses[12], frontendCourses[13], frontendCourses[14]],
  },
  {
    title: "第四阶段：主流框架",
    description: "深入学习React和Vue两大主流框架",
    items: [frontendCourses[15], frontendCourses[16], frontendCourses[17], frontendCourses[18]],
  },
  {
    title: "第五阶段：项目实战",
    description: "综合应用所学知识，完成实战项目",
    items: [frontendCourses[19]],
  },
];

const frontendFeatures = [
  {
    icon: <ThunderboltOutlined className="text-3xl text-blue-500" />,
    title: "用户体验",
    description: "打造高效、流畅的用户界面"
  },
  {
    icon: <SafetyOutlined className="text-3xl text-green-500" />,
    title: "工程化",
    description: "现代前端工程化体系完善"
  },
  {
    icon: <CodeOutlined className="text-3xl text-purple-500" />,
    title: "生态丰富",
    description: "框架、库、工具链极其丰富"
  },
  {
    icon: <BulbOutlined className="text-3xl text-orange-500" />,
    title: "响应式设计",
    description: "适配多终端，提升可用性"
  },
  {
    icon: <TeamOutlined className="text-3xl text-red-500" />,
    title: "社区活跃",
    description: "全球开发者社区支持，资源丰富"
  },
  {
    icon: <RocketOutlined className="text-3xl text-indigo-500" />,
    title: "高薪热门",
    description: "前端开发岗位需求大，薪资高"
  }
];

const careerPaths = [
  {
    title: "前端开发工程师",
    description: "Web应用开发与优化",
    skills: ["HTML/CSS/JS", "React/Vue", "性能优化", "工程化"]
  },
  {
    title: "全栈开发工程师",
    description: "前后端一体化开发",
    skills: ["Node.js", "API设计", "数据库", "DevOps"]
  },
  {
    title: "移动端开发工程师",
    description: "H5、混合App开发",
    skills: ["响应式", "跨端适配", "移动框架", "UI设计"]
  },
  {
    title: "前端架构师",
    description: "大型项目架构设计与管理",
    skills: ["架构设计", "组件化", "性能调优", "安全防护"]
  }
];

export default function FrontendLearningPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 课程概述 */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-pink-400 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium">
              Web前端开发
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            掌握Web前端开发
            <span className="block text-3xl text-pink-600 mt-2">从基础到实战</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Web前端开发是互联网产品的核心，涵盖HTML、CSS、JavaScript及主流框架等内容。
            本课程将带你系统学习前端开发，提升项目实战与工程能力。
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/study/frontend/html">
              <Button type="primary" size="large" icon={<PlayCircleOutlined />}>
                开始学习
              </Button>
            </Link>
            <Button size="large" icon={<FileTextOutlined />}>
              查看大纲
            </Button>
          </div>
        </div>

        {/* 学习统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <BookOutlined className="text-4xl text-pink-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">课程总数</h3>
            <p className="text-3xl font-bold text-gray-700">20</p>
            <p className="text-sm text-gray-500">个学习模块</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <RocketOutlined className="text-4xl text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">当前进度</h3>
            <Progress percent={0} strokeColor="#EC4899" />
            <p className="text-sm text-gray-500 mt-2">0% 已完成</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <TrophyOutlined className="text-4xl text-pink-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">预计时长</h3>
            <p className="text-3xl font-bold text-gray-700">15</p>
            <p className="text-sm text-gray-500">小时学习</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <ExperimentOutlined className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">实践项目</h3>
            <p className="text-3xl font-bold text-gray-700">3+</p>
            <p className="text-sm text-gray-500">个实战项目</p>
          </Card>
        </div>

        {/* 特色功能 */}
        <Card className="mb-12 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么选择Web前端开发？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frontendFeatures.map((feature, index) => (
              <div key={index} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* 完整课程列表 */}
        <Card className="mb-12 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">完整课程大纲</h2>
          <p className="text-gray-600 text-center mb-8">系统掌握前端开发技能</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {frontendCourses.map((course, index) => (
              <Link key={index} href={course.href}>
                <Card
                  hoverable
                  className="text-center transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded text-xs font-medium">
                      {index + 1}
                    </span>
                    <span className="text-xs text-gray-500">{course.duration}</span>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900">{course.name}</h4>
                </Card>
              </Link>
            ))}
          </div>
        </Card>

        {/* 学习路径 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">学习路径</h2>
          <div className="space-y-8">
            {learningPath.map((phase, phaseIndex) => (
              <Card key={phaseIndex} className="shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium mr-4">
                    阶段 {phaseIndex + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{phase.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phase.items.map((item, itemIndex) => (
                    <Link key={itemIndex} href={item.href}>
                      <Card
                        hoverable
                        className="transition-all duration-200 bg-white hover:shadow-md"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium">{item.name}</h4>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{item.duration}</span>
                          <Button type="primary" size="small">
                            开始学习
                          </Button>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 职业发展 */}
        <Card className="mb-12 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">职业发展方向</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerPaths.map((career, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg hover:border-pink-300 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-pink-600">{career.title}</h3>
                <p className="text-gray-600 mb-4">{career.description}</p>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, skillIndex) => (
                    <Tag key={skillIndex} color="pink">{skill}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 学习建议 */}
        <Card className="shadow-md">
          <h3 className="text-2xl font-bold mb-6 text-center">学习建议</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-pink-600">学习方法</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>按照推荐的学习路径循序渐进，打好基础</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>多动手实践，理论结合实际</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>遇到不懂的概念可以随时回顾之前的内容</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>多阅读官方文档和优秀开源项目</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-pink-600">注意事项</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>定期复习和总结，巩固所学知识</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>关注前端安全和性能优化</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>积极参与社区讨论，获取最新资源</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>尝试用前端技术解决实际问题，提升实战能力</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 开始学习按钮 */}
        <div className="text-center mt-12">
          <Link href="/study/frontend/html">
            <Button type="primary" size="large" className="h-12 px-8 text-lg">
              立即开始Web前端开发学习之旅
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 