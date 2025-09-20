"use client";

import { Card, Progress, Button, Tag } from "antd";
import { BookOutlined, RocketOutlined, TrophyOutlined, CodeOutlined, BulbOutlined, SafetyOutlined, ThunderboltOutlined, TeamOutlined, CheckCircleOutlined, PlayCircleOutlined, FileTextOutlined, ExperimentOutlined } from "@ant-design/icons";
import Link from "next/link";

const networkCourses = [
  { name: "网络基础与入门", href: "/study/network/intro", duration: "30分钟" },
  { name: "网络通信原理", href: "/study/network/comm-principle", duration: "45分钟" },
  { name: "OSI与TCPIP模型", href: "/study/network/model", duration: "45分钟" },
  { name: "物理层与数据链路层", href: "/study/network/link", duration: "45分钟" },
  { name: "IP与路由", href: "/study/network/ip-routing", duration: "45分钟" },
  { name: "TCP与UDP", href: "/study/network/tcp-udp", duration: "45分钟" },
  { name: "应用层协议", href: "/study/network/application", duration: "45分钟" },
  { name: "局域网与广域网", href: "/study/network/lan-wan", duration: "45分钟" },
  { name: "无线与移动网络", href: "/study/network/wireless-mobile", duration: "45分钟" },
  { name: "VPN与代理技术", href: "/study/network/vpn-proxy", duration: "45分钟" },
  { name: "网络安全基础", href: "/study/network/security", duration: "45分钟" },
  { name: "云网络与新技术", href: "/study/network/cloud-newtech", duration: "45分钟" },
  { name: "网络抓包与协议分析", href: "/study/network/sniff-analyze", duration: "45分钟" },
  { name: "网络配置与管理", href: "/study/network/config-manage", duration: "45分钟" },
  { name: "网络项目实战", href: "/study/network/projects", duration: "60分钟" },
  { name: "面试题与答疑", href: "/study/network/interview", duration: "60分钟" },
  { name: "网络进阶与拓展", href: "/study/network/advanced", duration: "60分钟" }
];

const learningPath = [
  {
    title: "第一阶段：网络基础",
    description: "掌握网络基本原理和通信模型",
    items: [networkCourses[0], networkCourses[1], networkCourses[2]],
  },
  {
    title: "第二阶段：分层与协议",
    description: "学习物理层、链路层、IP、TCP/UDP等协议",
    items: [networkCourses[3], networkCourses[4], networkCourses[5]],
  },
  {
    title: "第三阶段：应用与安全",
    description: "掌握应用层协议、网络安全与新技术",
    items: [networkCourses[6], networkCourses[7], networkCourses[8], networkCourses[9], networkCourses[10], networkCourses[11]],
  },
  {
    title: "第四阶段：抓包与管理",
    description: "学习抓包分析、网络配置与管理",
    items: [networkCourses[12], networkCourses[13]],
  },
  {
    title: "第五阶段：实战与进阶",
    description: "项目实战、面试与进阶拓展",
    items: [networkCourses[14], networkCourses[15], networkCourses[16]],
  },
];

const networkFeatures = [
  {
    icon: <ThunderboltOutlined className="text-3xl text-blue-500" />,
    title: "分层架构",
    description: "OSI/TCPIP分层模型，结构清晰"
  },
  {
    icon: <SafetyOutlined className="text-3xl text-green-500" />,
    title: "协议丰富",
    description: "涵盖主流网络协议与应用"
  },
  {
    icon: <CodeOutlined className="text-3xl text-purple-500" />,
    title: "安全保障",
    description: "网络安全与防护机制完善"
  },
  {
    icon: <BulbOutlined className="text-3xl text-orange-500" />,
    title: "实战导向",
    description: "抓包分析、项目实战贴近实际"
  },
  {
    icon: <TeamOutlined className="text-3xl text-red-500" />,
    title: "应用广泛",
    description: "互联网、企业、云计算等领域必备"
  },
  {
    icon: <RocketOutlined className="text-3xl text-indigo-500" />,
    title: "面试高频",
    description: "各大厂面试常考知识点"
  }
];

const careerPaths = [
  {
    title: "网络工程师",
    description: "网络架构设计与维护",
    skills: ["网络配置", "协议分析", "安全防护", "故障排查"]
  },
  {
    title: "后端开发工程师",
    description: "网络通信与服务开发",
    skills: ["Socket编程", "API设计", "高并发", "协议实现"]
  },
  {
    title: "安全工程师",
    description: "网络安全与渗透测试",
    skills: ["漏洞扫描", "抓包分析", "防火墙", "加密认证"]
  },
  {
    title: "云计算工程师",
    description: "云网络与新技术应用",
    skills: ["云平台", "虚拟化", "SDN", "网络自动化"]
  }
];

export default function NetworkLearningPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 课程概述 */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-6 py-2 rounded-full text-sm font-medium">
              计算机网络
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            掌握计算机网络
            <span className="block text-3xl text-blue-600 mt-2">从基础到实战</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            计算机网络是现代信息社会的基础，涵盖协议、通信、安全等核心内容。
            本课程将带你系统学习网络原理，提升开发与运维能力。
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/study/network/intro">
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
            <p className="text-3xl font-bold text-gray-700">17</p>
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
            <p className="text-3xl font-bold text-gray-700">12</p>
            <p className="text-sm text-gray-500">小时学习</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <ExperimentOutlined className="text-4xl text-indigo-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">实践项目</h3>
            <p className="text-3xl font-bold text-gray-700">3+</p>
            <p className="text-sm text-gray-500">个实战项目</p>
          </Card>
        </div>

        {/* 特色功能 */}
        <Card className="mb-12 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么学习计算机网络？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {networkFeatures.map((feature, index) => (
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
          <p className="text-gray-600 text-center mb-8">系统掌握网络原理与实战技能</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {networkCourses.map((course, index) => (
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
                  <span>关注网络安全和性能优化</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>积极参与社区讨论，获取最新资源</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>尝试用网络知识解决实际问题，提升实战能力</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 开始学习按钮 */}
        <div className="text-center mt-12">
          <Link href="/study/network/intro">
            <Button type="primary" size="large" className="h-12 px-8 text-lg">
              立即开始计算机网络学习之旅
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 