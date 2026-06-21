"use client";

import { Card, Progress, Button, Tag } from "antd";
import { BookOutlined, RocketOutlined, TrophyOutlined, CodeOutlined, BulbOutlined, SafetyOutlined, ThunderboltOutlined, TeamOutlined, CheckCircleOutlined, PlayCircleOutlined, FileTextOutlined, ExperimentOutlined } from "@ant-design/icons";
import Link from "next/link";

const osCourses = [
  { name: "操作系统概述", href: "/study/os/intro", duration: "30分钟" },
  { name: "进程与线程管理", href: "/study/os/process", duration: "60分钟" },
  { name: "内存管理", href: "/study/os/memory", duration: "60分钟" },
  { name: "文件系统", href: "/study/os/file", duration: "60分钟" },
  { name: "输入输出与设备管理", href: "/study/os/io", duration: "45分钟" },
  { name: "调度算法", href: "/study/os/schedule", duration: "60分钟" },
  { name: "进程同步与互斥", href: "/study/os/sync", duration: "60分钟" },
  { name: "死锁与避免", href: "/study/os/deadlock", duration: "45分钟" },
  { name: "操作系统安全", href: "/study/os/security", duration: "45分钟" },
  { name: "实战与面试", href: "/study/os/projects", duration: "90分钟" }
];

const learningPath = [
  {
    title: "第一阶段：操作系统基础",
    description: "了解操作系统的基本概念和发展",
    items: [osCourses[0]],
  },
  {
    title: "第二阶段：进程与内存管理",
    description: "掌握进程、线程和内存管理机制",
    items: [osCourses[1], osCourses[2]],
  },
  {
    title: "第三阶段：文件与设备管理",
    description: "学习文件系统和设备管理原理",
    items: [osCourses[3], osCourses[4]],
  },
  {
    title: "第四阶段：调度与同步",
    description: "深入理解调度算法、同步与死锁",
    items: [osCourses[5], osCourses[6], osCourses[7]],
  },
  {
    title: "第五阶段：安全与实战",
    description: "关注安全问题，提升实战能力",
    items: [osCourses[8], osCourses[9]],
  },
];

const osFeatures = [
  {
    icon: <ThunderboltOutlined className="text-3xl text-blue-500" />,
    title: "系统核心",
    description: "操作系统是计算机系统的核心软件"
  },
  {
    icon: <SafetyOutlined className="text-3xl text-green-500" />,
    title: "资源管理",
    description: "高效管理CPU、内存、设备等资源"
  },
  {
    icon: <CodeOutlined className="text-3xl text-purple-500" />,
    title: "并发与同步",
    description: "支持多进程、多线程并发与同步"
  },
  {
    icon: <BulbOutlined className="text-3xl text-orange-500" />,
    title: "安全保障",
    description: "提供系统安全与访问控制机制"
  },
  {
    icon: <TeamOutlined className="text-3xl text-red-500" />,
    title: "面试高频",
    description: "各大厂面试必考知识点"
  },
  {
    icon: <RocketOutlined className="text-3xl text-indigo-500" />,
    title: "实战导向",
    description: "理论结合实践，提升系统开发能力"
  }
];

const careerPaths = [
  {
    title: "系统开发工程师",
    description: "操作系统、驱动开发与优化",
    skills: ["内核开发", "驱动编程", "性能调优", "系统移植"]
  },
  {
    title: "运维工程师",
    description: "系统部署、维护与安全",
    skills: ["自动化运维", "安全加固", "监控报警", "故障排查"]
  },
  {
    title: "嵌入式开发工程师",
    description: "嵌入式系统与实时操作系统开发",
    skills: ["嵌入式C", "RTOS", "硬件接口", "系统裁剪"]
  },
  {
    title: "面试与算法岗",
    description: "系统原理与算法面试高频考点",
    skills: ["进程调度", "内存管理", "死锁分析", "系统设计"]
  }
];

export default function OsLearningPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 课程概述 */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-gray-400 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium">
              操作系统
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            掌握操作系统原理
            <span className="block text-3xl text-gray-600 mt-2">从基础到实战</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            操作系统是计算机系统的核心，负责资源管理、进程调度、内存分配等关键任务。
            本课程将带你系统学习操作系统原理，提升系统开发与运维能力。
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/study/os/intro">
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
            <BookOutlined className="text-4xl text-gray-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">课程总数</h3>
            <p className="text-3xl font-bold text-gray-700">10</p>
            <p className="text-sm text-gray-500">个学习模块</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <RocketOutlined className="text-4xl text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">当前进度</h3>
            <Progress percent={0} strokeColor="#64748B" />
            <p className="text-sm text-gray-500 mt-2">0% 已完成</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <TrophyOutlined className="text-4xl text-gray-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">预计时长</h3>
            <p className="text-3xl font-bold text-gray-700">8</p>
            <p className="text-sm text-gray-500">小时学习</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <ExperimentOutlined className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">实践项目</h3>
            <p className="text-3xl font-bold text-gray-700">2+</p>
            <p className="text-sm text-gray-500">个实战项目</p>
          </Card>
        </div>

        {/* 特色功能 */}
        <Card className="mb-12 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么学习操作系统？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {osFeatures.map((feature, index) => (
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
          <p className="text-gray-600 text-center mb-8">系统掌握操作系统原理</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {osCourses.map((course, index) => (
              <Link key={index} href={course.href}>
                <Card
                  hoverable
                  className="text-center transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
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
                  <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mr-4">
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
              <div key={index} className="p-6 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-gray-600">{career.title}</h3>
                <p className="text-gray-600 mb-4">{career.description}</p>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, skillIndex) => (
                    <Tag key={skillIndex} color="default">{skill}</Tag>
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
              <h4 className="text-lg font-semibold mb-4 text-gray-600">学习方法</h4>
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
              <h4 className="text-lg font-semibold mb-4 text-gray-600">注意事项</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>定期复习和总结，巩固所学知识</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>关注系统安全和性能优化</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>积极参与社区讨论，获取最新资源</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>尝试用操作系统知识解决实际问题，提升实战能力</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 开始学习按钮 */}
        <div className="text-center mt-12">
          <Link href="/study/os/intro">
            <Button type="primary" size="large" className="h-12 px-8 text-lg">
              立即开始操作系统学习之旅
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 