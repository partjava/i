"use client";

import { Card, Progress, Button, Tag } from "antd";
import { BookOutlined, RocketOutlined, TrophyOutlined, CodeOutlined, BulbOutlined, SafetyOutlined, ThunderboltOutlined, TeamOutlined, CheckCircleOutlined, PlayCircleOutlined, FileTextOutlined, ExperimentOutlined } from "@ant-design/icons";
import Link from "next/link";

const goCourses = [
  { name: "Go语言入门", href: "/study/go/intro", duration: "30分钟" },
  { name: "开发环境配置", href: "/study/go/setup", duration: "30分钟" },
  { name: "基础语法", href: "/study/go/basic", duration: "40分钟" },
  { name: "数据类型", href: "/study/go/datatypes", duration: "40分钟" },
  { name: "控制流程", href: "/study/go/control", duration: "40分钟" },
  { name: "函数与方法", href: "/study/go/functions", duration: "40分钟" },
  { name: "数组与切片", href: "/study/go/arrays-slices", duration: "40分钟" },
  { name: "Map与结构体", href: "/study/go/map-struct", duration: "40分钟" },
  { name: "接口与类型系统", href: "/study/go/interfaces", duration: "40分钟" },
  { name: "并发编程", href: "/study/go/concurrency", duration: "60分钟" },
  { name: "Channel与Goroutine", href: "/study/go/channels", duration: "40分钟" },
  { name: "错误处理", href: "/study/go/error-handling", duration: "30分钟" },
  { name: "包管理与模块", href: "/study/go/packages", duration: "30分钟" },
  { name: "标准库使用", href: "/study/go/stdlib", duration: "30分钟" },
  { name: "文件操作", href: "/study/go/file-io", duration: "30分钟" },
  { name: "网络编程", href: "/study/go/networking", duration: "40分钟" },
  { name: "HTTP服务开发", href: "/study/go/http", duration: "40分钟" },
  { name: "RESTful API开发", href: "/study/go/rest", duration: "40分钟" },
  { name: "数据库操作", href: "/study/go/database", duration: "40分钟" },
  { name: "测试与性能优化", href: "/study/go/testing", duration: "30分钟" },
  { name: "微服务开发", href: "/study/go/microservices", duration: "40分钟" },
  { name: "容器化部署", href: "/study/go/docker", duration: "40分钟" },
  { name: "项目实战", href: "/study/go/projects", duration: "60分钟" }
];

const learningPath = [
  {
    title: "第一阶段：Go基础入门",
    description: "掌握Go语言基础语法和开发环境",
    items: [goCourses[0], goCourses[1], goCourses[2], goCourses[3], goCourses[4]],
  },
  {
    title: "第二阶段：函数与数据结构",
    description: "学习函数、数组、切片、Map与结构体",
    items: [goCourses[5], goCourses[6], goCourses[7]],
  },
  {
    title: "第三阶段：接口与并发编程",
    description: "掌握接口、类型系统和Go并发模型",
    items: [goCourses[8], goCourses[9], goCourses[10]],
  },
  {
    title: "第四阶段：工程实践",
    description: "学习错误处理、包管理、标准库、文件和网络编程",
    items: [goCourses[11], goCourses[12], goCourses[13], goCourses[14], goCourses[15], goCourses[16], goCourses[17], goCourses[18], goCourses[19]],
  },
  {
    title: "第五阶段：微服务与项目实战",
    description: "微服务、容器化与项目实战",
    items: [goCourses[20], goCourses[21], goCourses[22]],
  },
];

const goFeatures = [
  {
    icon: <ThunderboltOutlined className="text-3xl text-blue-500" />,
    title: "高性能",
    description: "Go语言以高并发和高性能著称"
  },
  {
    icon: <SafetyOutlined className="text-3xl text-green-500" />,
    title: "简洁易学",
    description: "语法简洁，易于上手"
  },
  {
    icon: <CodeOutlined className="text-3xl text-purple-500" />,
    title: "并发原生",
    description: "Goroutine和Channel支持高效并发"
  },
  {
    icon: <BulbOutlined className="text-3xl text-orange-500" />,
    title: "云原生友好",
    description: "广泛应用于云计算、微服务等领域"
  },
  {
    icon: <TeamOutlined className="text-3xl text-red-500" />,
    title: "部署便捷",
    description: "编译生成静态二进制，部署简单"
  },
  {
    icon: <RocketOutlined className="text-3xl text-indigo-500" />,
    title: "生态完善",
    description: "拥有丰富的第三方库和工具"
  }
];

const careerPaths = [
  {
    title: "后端开发工程师",
    description: "高性能Web服务与API开发",
    skills: ["Gin", "Echo", "RESTful API", "数据库"]
  },
  {
    title: "云原生工程师",
    description: "云计算、微服务与容器化开发",
    skills: ["Kubernetes", "Docker", "微服务架构", "DevOps"]
  },
  {
    title: "区块链开发工程师",
    description: "区块链底层与智能合约开发",
    skills: ["以太坊", "智能合约", "分布式账本", "安全"]
  },
  {
    title: "运维开发工程师",
    description: "自动化运维与工具开发",
    skills: ["脚本编写", "监控报警", "自动化部署", "性能优化"]
  }
];

export default function GoLearningPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 课程概述 */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-400 to-green-500 text-white px-6 py-2 rounded-full text-sm font-medium">
              Go 语言
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            掌握Go开发
            <span className="block text-3xl text-blue-600 mt-2">从基础到实战</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Go语言以高性能、高并发和云原生友好著称，广泛应用于后端、云计算、区块链等领域。
            本课程将带你系统学习Go开发，提升工程能力。
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/study/go/intro">
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
            <BookOutlined className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">课程总数</h3>
            <p className="text-3xl font-bold text-gray-700">23</p>
            <p className="text-sm text-gray-500">个学习模块</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <RocketOutlined className="text-4xl text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">当前进度</h3>
            <Progress percent={0} strokeColor="#3B82F6" />
            <p className="text-sm text-gray-500 mt-2">0% 已完成</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <TrophyOutlined className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">预计时长</h3>
            <p className="text-3xl font-bold text-gray-700">15</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么选择Go？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goFeatures.map((feature, index) => (
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
          <p className="text-gray-600 text-center mb-8">系统掌握Go开发技能</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goCourses.map((course, index) => (
              <Link key={index} href={course.href}>
                <Card
                  hoverable
                  className="text-center transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
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
                  <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mr-4">
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
              <div key={index} className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{career.title}</h3>
                <p className="text-gray-600 mb-4">{career.description}</p>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, skillIndex) => (
                    <Tag key={skillIndex} color="blue">{skill}</Tag>
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
              <h4 className="text-lg font-semibold mb-4 text-blue-600">学习方法</h4>
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
              <h4 className="text-lg font-semibold mb-4 text-blue-600">注意事项</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>定期复习和总结，巩固所学知识</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>关注Go并发和性能优化</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>积极参与社区讨论，获取最新资源</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>尝试用Go解决实际问题，提升实战能力</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 开始学习按钮 */}
        <div className="text-center mt-12">
          <Link href="/study/go/intro">
            <Button type="primary" size="large" className="h-12 px-8 text-lg">
              立即开始Go学习之旅
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 