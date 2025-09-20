"use client";

import { Card, Progress, Button, Tag } from "antd";
import { BookOutlined, RocketOutlined, TrophyOutlined, CodeOutlined, BulbOutlined, SafetyOutlined, ThunderboltOutlined, TeamOutlined, CheckCircleOutlined, PlayCircleOutlined, FileTextOutlined, ExperimentOutlined } from "@ant-design/icons";
import Link from "next/link";

const linuxCourses = [
  { name: "基础入门", href: "/study/linux/intro", duration: "30分钟" },
  { name: "文件与目录管理", href: "/study/linux/file", duration: "45分钟" },
  { name: "用户与权限管理", href: "/study/linux/user", duration: "45分钟" },
  { name: "软件与包管理", href: "/study/linux/package", duration: "45分钟" },
  { name: "进程与服务管理", href: "/study/linux/process", duration: "45分钟" },
  { name: "Shell与脚本编程", href: "/study/linux/shell", duration: "60分钟" },
  { name: "网络与安全", href: "/study/linux/network", duration: "45分钟" },
  { name: "性能监控与日志管理", href: "/study/linux/monitor", duration: "45分钟" },
  { name: "实战与面试", href: "/study/linux/practice", duration: "60分钟" }
];

const learningPath = [
  {
    title: "第一阶段：基础与文件管理",
    description: "掌握Linux基础和文件目录操作",
    items: [linuxCourses[0], linuxCourses[1]],
  },
  {
    title: "第二阶段：用户与权限管理",
    description: "学习用户、权限和安全管理",
    items: [linuxCourses[2]],
  },
  {
    title: "第三阶段：软件与进程管理",
    description: "掌握软件包、进程与服务管理",
    items: [linuxCourses[3], linuxCourses[4]],
  },
  {
    title: "第四阶段：脚本与网络",
    description: "学习Shell脚本和网络安全",
    items: [linuxCourses[5], linuxCourses[6]],
  },
  {
    title: "第五阶段：性能与实战",
    description: "掌握性能监控和实战技巧",
    items: [linuxCourses[7], linuxCourses[8]],
  },
];

const linuxFeatures = [
  {
    icon: <ThunderboltOutlined className="text-3xl text-blue-500" />,
    title: "开源自由",
    description: "Linux是最流行的开源操作系统"
  },
  {
    icon: <SafetyOutlined className="text-3xl text-green-500" />,
    title: "高效稳定",
    description: "广泛应用于服务器、嵌入式等领域"
  },
  {
    icon: <CodeOutlined className="text-3xl text-purple-500" />,
    title: "命令行强大",
    description: "Shell脚本和命令行工具极为丰富"
  },
  {
    icon: <BulbOutlined className="text-3xl text-orange-500" />,
    title: "安全可靠",
    description: "权限管理和安全机制完善"
  },
  {
    icon: <TeamOutlined className="text-3xl text-red-500" />,
    title: "社区活跃",
    description: "全球开发者社区支持，资源丰富"
  },
  {
    icon: <RocketOutlined className="text-3xl text-indigo-500" />,
    title: "实用性强",
    description: "广泛应用于开发、运维、云计算等场景"
  }
];

const careerPaths = [
  {
    title: "运维工程师",
    description: "Linux服务器部署与维护",
    skills: ["自动化运维", "脚本编程", "监控报警", "安全加固"]
  },
  {
    title: "后端开发工程师",
    description: "基于Linux的后端开发",
    skills: ["服务部署", "性能优化", "数据库", "网络编程"]
  },
  {
    title: "嵌入式开发工程师",
    description: "嵌入式Linux系统开发",
    skills: ["驱动开发", "交叉编译", "硬件接口", "系统裁剪"]
  },
  {
    title: "安全工程师",
    description: "系统安全与渗透测试",
    skills: ["权限管理", "漏洞扫描", "安全加固", "日志分析"]
  }
];

export default function LinuxLearningPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 课程概述 */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-green-400 to-gray-700 text-white px-6 py-2 rounded-full text-sm font-medium">
              Linux 系统
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            掌握Linux系统
            <span className="block text-3xl text-green-600 mt-2">从基础到实战</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Linux是最流行的开源操作系统，广泛应用于服务器、嵌入式、云计算等领域。
            本课程将带你系统学习Linux，提升开发与运维能力。
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/study/linux/intro">
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
            <BookOutlined className="text-4xl text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">课程总数</h3>
            <p className="text-3xl font-bold text-gray-700">9</p>
            <p className="text-sm text-gray-500">个学习模块</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <RocketOutlined className="text-4xl text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">当前进度</h3>
            <Progress percent={0} strokeColor="#22C55E" />
            <p className="text-sm text-gray-500 mt-2">0% 已完成</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <TrophyOutlined className="text-4xl text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">预计时长</h3>
            <p className="text-3xl font-bold text-gray-700">7</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么选择Linux？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {linuxFeatures.map((feature, index) => (
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
          <p className="text-gray-600 text-center mb-8">系统掌握Linux技能</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {linuxCourses.map((course, index) => (
              <Link key={index} href={course.href}>
                <Card
                  hoverable
                  className="text-center transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">
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
                  <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium mr-4">
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
              <div key={index} className="p-6 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-green-600">{career.title}</h3>
                <p className="text-gray-600 mb-4">{career.description}</p>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, skillIndex) => (
                    <Tag key={skillIndex} color="green">{skill}</Tag>
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
              <h4 className="text-lg font-semibold mb-4 text-green-600">学习方法</h4>
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
              <h4 className="text-lg font-semibold mb-4 text-green-600">注意事项</h4>
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
                  <span>尝试用Linux解决实际问题，提升实战能力</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 开始学习按钮 */}
        <div className="text-center mt-12">
          <Link href="/study/linux/intro">
            <Button type="primary" size="large" className="h-12 px-8 text-lg">
              立即开始Linux学习之旅
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 