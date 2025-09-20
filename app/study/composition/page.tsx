"use client";

import { Card, Progress, Button, Tag } from "antd";
import { BookOutlined, RocketOutlined, TrophyOutlined, CodeOutlined, BulbOutlined, SafetyOutlined, ThunderboltOutlined, TeamOutlined, CheckCircleOutlined, PlayCircleOutlined, FileTextOutlined, ExperimentOutlined } from "@ant-design/icons";
import Link from "next/link";

const compositionCourses = [
  { name: "绪论与发展简史", href: "/study/composition/intro", duration: "30分钟" },
  { name: "系统结构概述", href: "/study/composition/structure", duration: "40分钟" },
  { name: "数据的表示与运算", href: "/study/composition/data", duration: "40分钟" },
  { name: "存储系统", href: "/study/composition/storage", duration: "40分钟" },
  { name: "运算器", href: "/study/composition/alu", duration: "40分钟" },
  { name: "控制器", href: "/study/composition/controller", duration: "40分钟" },
  { name: "总线与输入输出", href: "/study/composition/io", duration: "40分钟" },
  { name: "中央处理器", href: "/study/composition/cpu", duration: "40分钟" },
  { name: "系统性能与优化", href: "/study/composition/performance", duration: "40分钟" },
  { name: "学习建议与资源", href: "/study/composition/resources", duration: "30分钟" }
];

const learningPath = [
  {
    title: "第一阶段：基础与结构",
    description: "了解计算机组成的基本概念和系统结构",
    items: [compositionCourses[0], compositionCourses[1]],
  },
  {
    title: "第二阶段：数据与存储",
    description: "学习数据表示、运算和存储系统",
    items: [compositionCourses[2], compositionCourses[3]],
  },
  {
    title: "第三阶段：运算与控制",
    description: "掌握运算器、控制器和输入输出系统",
    items: [compositionCourses[4], compositionCourses[5], compositionCourses[6]],
  },
  {
    title: "第四阶段：CPU与性能优化",
    description: "深入理解CPU结构和系统性能优化",
    items: [compositionCourses[7], compositionCourses[8]],
  },
  {
    title: "第五阶段：学习建议与资源",
    description: "获取学习建议和拓展资源",
    items: [compositionCourses[9]],
  },
];

const compositionFeatures = [
  {
    icon: <ThunderboltOutlined className="text-3xl text-blue-500" />,
    title: "硬件基础",
    description: "深入理解计算机硬件的组成与原理"
  },
  {
    icon: <SafetyOutlined className="text-3xl text-green-500" />,
    title: "系统结构",
    description: "掌握冯诺依曼体系、总线结构等核心概念"
  },
  {
    icon: <CodeOutlined className="text-3xl text-purple-500" />,
    title: "性能优化",
    description: "理解系统瓶颈与优化方法"
  },
  {
    icon: <BulbOutlined className="text-3xl text-orange-500" />,
    title: "理论结合实践",
    description: "理论知识与工程实践紧密结合"
  },
  {
    icon: <TeamOutlined className="text-3xl text-red-500" />,
    title: "面试高频",
    description: "各大厂面试常考知识点"
  },
  {
    icon: <RocketOutlined className="text-3xl text-indigo-500" />,
    title: "工程素养",
    description: "提升系统级思维和工程能力"
  }
];

const careerPaths = [
  {
    title: "嵌入式开发工程师",
    description: "嵌入式系统与底层开发",
    skills: ["单片机", "硬件接口", "驱动开发", "系统移植"]
  },
  {
    title: "芯片设计工程师",
    description: "芯片架构与设计优化",
    skills: ["数字电路", "Verilog/VHDL", "性能优化", "测试验证"]
  },
  {
    title: "系统架构师",
    description: "系统结构设计与优化",
    skills: ["系统设计", "性能分析", "安全性", "工程实践"]
  },
  {
    title: "硬件研发工程师",
    description: "硬件产品研发与测试",
    skills: ["PCB设计", "硬件调试", "测试仪器", "产品开发"]
  }
];

export default function CompositionLearningPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 课程概述 */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-400 to-gray-700 text-white px-6 py-2 rounded-full text-sm font-medium">
              计算机组成原理
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            掌握计算机组成原理
            <span className="block text-3xl text-blue-600 mt-2">从基础到实战</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            计算机组成原理是理解计算机系统和底层开发的基础。
            本课程将带你系统学习硬件结构、数据运算、性能优化等内容，提升系统级工程能力。
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/study/composition/intro">
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
            <p className="text-3xl font-bold text-gray-700">10</p>
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
            <p className="text-3xl font-bold text-gray-700">7</p>
            <p className="text-sm text-gray-500">小时学习</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <ExperimentOutlined className="text-4xl text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">实践项目</h3>
            <p className="text-3xl font-bold text-gray-700">2+</p>
            <p className="text-sm text-gray-500">个实战项目</p>
          </Card>
        </div>

        {/* 特色功能 */}
        <Card className="mb-12 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么学习计算机组成原理？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compositionFeatures.map((feature, index) => (
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
          <p className="text-gray-600 text-center mb-8">系统掌握计算机组成原理技能</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {compositionCourses.map((course, index) => (
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
                  <span>多阅读经典书籍和优秀开源项目</span>
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
                  <span>关注系统性能和安全性</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>积极参与社区讨论，获取最新资源</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>尝试用硬件知识解决实际问题，提升实战能力</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 开始学习按钮 */}
        <div className="text-center mt-12">
          <Link href="/study/composition/intro">
            <Button type="primary" size="large" className="h-12 px-8 text-lg">
              立即开始计算机组成原理学习之旅
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 