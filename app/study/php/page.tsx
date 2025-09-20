"use client";

import { Card, Progress, Button, Tag } from "antd";
import { BookOutlined, RocketOutlined, TrophyOutlined, CodeOutlined, BulbOutlined, SafetyOutlined, ThunderboltOutlined, TeamOutlined, CheckCircleOutlined, PlayCircleOutlined, FileTextOutlined, ExperimentOutlined } from "@ant-design/icons";
import Link from "next/link";

const phpCourses = [
  { name: "PHP编程入门", href: "/study/php/intro", duration: "30分钟" },
  { name: "开发环境配置", href: "/study/php/setup", duration: "30分钟" },
  { name: "基础语法与数据类型", href: "/study/php/basic", duration: "40分钟" },
  { name: "数据类型与变量", href: "/study/php/datatypes", duration: "40分钟" },
  { name: "控制流程与函数", href: "/study/php/control-functions", duration: "40分钟" },
  { name: "数组与字符串", href: "/study/php/arrays-strings", duration: "40分钟" },
  { name: "面向对象编程", href: "/study/php/oop", duration: "40分钟" },
  { name: "文件与异常处理", href: "/study/php/file-exception", duration: "40分钟" },
  { name: "Web开发基础", href: "/study/php/web", duration: "40分钟" },
  { name: "数据库操作", href: "/study/php/db", duration: "40分钟" },
  { name: "会话管理与Cookie", href: "/study/php/session-cookie", duration: "30分钟" },
  { name: "表单处理与数据验证", href: "/study/php/forms-validation", duration: "30分钟" },
  { name: "常用扩展与包管理", href: "/study/php/extensions-composer", duration: "30分钟" },
  { name: "安全与性能优化", href: "/study/php/security-performance", duration: "30分钟" },
  { name: "测试与调试", href: "/study/php/testing-debugging", duration: "30分钟" },
  { name: "框架与项目实战", href: "/study/php/frameworks-projects", duration: "40分钟" },
  { name: "高级特性与底层原理", href: "/study/php/advanced-internals", duration: "40分钟" },
  { name: "并发与异步编程", href: "/study/php/concurrency-async", duration: "30分钟" },
  { name: "Swoole与高性能开发", href: "/study/php/swoole-highperf", duration: "30分钟" },
  { name: "自动化部署与CI/CD", href: "/study/php/devops-cicd", duration: "30分钟" },
  { name: "云原生与容器化", href: "/study/php/cloud-docker", duration: "30分钟" },
  { name: "常见问题与面试题", href: "/study/php/faq", duration: "30分钟" }
];

const learningPath = [
  {
    title: "第一阶段：PHP基础入门",
    description: "掌握PHP基础语法和开发环境",
    items: [phpCourses[0], phpCourses[1], phpCourses[2], phpCourses[3], phpCourses[4]],
  },
  {
    title: "第二阶段：数组、字符串与OOP",
    description: "学习数组、字符串和面向对象编程",
    items: [phpCourses[5], phpCourses[6]],
  },
  {
    title: "第三阶段：文件、Web与数据库",
    description: "掌握文件操作、Web开发和数据库集成",
    items: [phpCourses[7], phpCourses[8], phpCourses[9]],
  },
  {
    title: "第四阶段：会话、安全与工程化",
    description: "学习会话管理、安全、测试与工程化",
    items: [phpCourses[10], phpCourses[11], phpCourses[12], phpCourses[13], phpCourses[14]],
  },
  {
    title: "第五阶段：框架、进阶与实战",
    description: "框架应用、高级特性与项目实战",
    items: [phpCourses[15], phpCourses[16], phpCourses[17], phpCourses[18], phpCourses[19], phpCourses[20], phpCourses[21]],
  },
];

const phpFeatures = [
  {
    icon: <ThunderboltOutlined className="text-3xl text-blue-500" />,
    title: "Web主力",
    description: "PHP是最流行的Web后端开发语言之一"
  },
  {
    icon: <SafetyOutlined className="text-3xl text-green-500" />,
    title: "生态丰富",
    description: "拥有大量框架、扩展和社区资源"
  },
  {
    icon: <CodeOutlined className="text-3xl text-purple-500" />,
    title: "易学易用",
    description: "语法简单，开发效率高"
  },
  {
    icon: <BulbOutlined className="text-3xl text-orange-500" />,
    title: "部署灵活",
    description: "支持多平台，部署便捷"
  },
  {
    icon: <TeamOutlined className="text-3xl text-red-500" />,
    title: "高性能",
    description: "Swoole等扩展支持高并发场景"
  },
  {
    icon: <RocketOutlined className="text-3xl text-indigo-500" />,
    title: "工程化",
    description: "支持自动化测试、CI/CD等现代工程实践"
  }
];

const careerPaths = [
  {
    title: "Web后端开发工程师",
    description: "网站与API开发、维护",
    skills: ["PHP", "MySQL", "Laravel", "API设计"]
  },
  {
    title: "全栈开发工程师",
    description: "前后端一体化开发",
    skills: ["PHP", "JavaScript", "Vue/React", "DevOps"]
  },
  {
    title: "运维开发工程师",
    description: "自动化运维与工具开发",
    skills: ["脚本编写", "监控报警", "自动化部署", "性能优化"]
  },
  {
    title: "架构师",
    description: "系统架构设计与优化",
    skills: ["高并发", "分布式", "安全性", "系统设计"]
  }
];

export default function PhpLearningPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 课程概述 */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-indigo-400 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium">
              PHP 开发
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            掌握PHP开发
            <span className="block text-3xl text-indigo-600 mt-2">从基础到实战</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            PHP是Web开发的主力语言，广泛应用于网站、API、自动化等领域。
            本课程将带你系统学习PHP开发，提升工程能力。
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/study/php/intro">
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
            <BookOutlined className="text-4xl text-indigo-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">课程总数</h3>
            <p className="text-3xl font-bold text-gray-700">22</p>
            <p className="text-sm text-gray-500">个学习模块</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <RocketOutlined className="text-4xl text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">当前进度</h3>
            <Progress percent={0} strokeColor="#6366F1" />
            <p className="text-sm text-gray-500 mt-2">0% 已完成</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <TrophyOutlined className="text-4xl text-indigo-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">预计时长</h3>
            <p className="text-3xl font-bold text-gray-700">12</p>
            <p className="text-sm text-gray-500">小时学习</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <ExperimentOutlined className="text-4xl text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">实践项目</h3>
            <p className="text-3xl font-bold text-gray-700">3+</p>
            <p className="text-sm text-gray-500">个实战项目</p>
          </Card>
        </div>

        {/* 特色功能 */}
        <Card className="mb-12 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么选择PHP？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phpFeatures.map((feature, index) => (
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
          <p className="text-gray-600 text-center mb-8">系统掌握PHP开发技能</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {phpCourses.map((course, index) => (
              <Link key={index} href={course.href}>
                <Card
                  hoverable
                  className="text-center transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-xs font-medium">
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
                  <div className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium mr-4">
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
              <div key={index} className="p-6 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-indigo-600">{career.title}</h3>
                <p className="text-gray-600 mb-4">{career.description}</p>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, skillIndex) => (
                    <Tag key={skillIndex} color="geekblue">{skill}</Tag>
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
              <h4 className="text-lg font-semibold mb-4 text-indigo-600">学习方法</h4>
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
              <h4 className="text-lg font-semibold mb-4 text-indigo-600">注意事项</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>定期复习和总结，巩固所学知识</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>关注PHP安全和性能优化</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>积极参与社区讨论，获取最新资源</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>尝试用PHP解决实际问题，提升实战能力</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 开始学习按钮 */}
        <div className="text-center mt-12">
          <Link href="/study/php/intro">
            <Button type="primary" size="large" className="h-12 px-8 text-lg">
              立即开始PHP学习之旅
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 