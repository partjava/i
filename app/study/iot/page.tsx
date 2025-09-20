"use client";

import { Card, Progress, Button, Tag } from "antd";
import { BookOutlined, RocketOutlined, TrophyOutlined, CodeOutlined, BulbOutlined, SafetyOutlined, ThunderboltOutlined, TeamOutlined, CheckCircleOutlined, PlayCircleOutlined, FileTextOutlined, ExperimentOutlined } from "@ant-design/icons";
import Link from "next/link";

const iotCourses = [
  { name: "物联网基础", href: "/study/iot/intro", duration: "30分钟" },
  { name: "通信技术", href: "/study/iot/communication", duration: "40分钟" },
  { name: "传感器技术", href: "/study/iot/sensors", duration: "40分钟" },
  { name: "数据处理", href: "/study/iot/data-processing", duration: "40分钟" },
  { name: "安全防护", href: "/study/iot/security", duration: "30分钟" },
  { name: "应用场景", href: "/study/iot/applications", duration: "30分钟" },
  { name: "开发平台", href: "/study/iot/platforms", duration: "30分钟" },
  { name: "项目实战", href: "/study/iot/projects", duration: "60分钟" }
];

const learningPath = [
  {
    title: "第一阶段：物联网基础",
    description: "了解物联网的基本概念和发展",
    items: [iotCourses[0]],
  },
  {
    title: "第二阶段：通信与传感技术",
    description: "掌握物联网通信和传感器技术",
    items: [iotCourses[1], iotCourses[2]],
  },
  {
    title: "第三阶段：数据与安全",
    description: "学习数据处理与安全防护",
    items: [iotCourses[3], iotCourses[4]],
  },
  {
    title: "第四阶段：应用与平台",
    description: "了解物联网应用场景和开发平台",
    items: [iotCourses[5], iotCourses[6]],
  },
  {
    title: "第五阶段：项目实战",
    description: "综合应用所学知识，完成实战项目",
    items: [iotCourses[7]],
  },
];

const iotFeatures = [
  {
    icon: <ThunderboltOutlined className="text-3xl text-blue-500" />,
    title: "万物互联",
    description: "实现设备、系统与人的智能互联"
  },
  {
    icon: <SafetyOutlined className="text-3xl text-green-500" />,
    title: "跨界融合",
    description: "融合通信、传感、数据、AI等多领域"
  },
  {
    icon: <CodeOutlined className="text-3xl text-purple-500" />,
    title: "应用广泛",
    description: "智慧城市、工业、医疗、家居等场景"
  },
  {
    icon: <BulbOutlined className="text-3xl text-orange-500" />,
    title: "创新驱动",
    description: "推动新兴产业和智能社会发展"
  },
  {
    icon: <TeamOutlined className="text-3xl text-red-500" />,
    title: "生态丰富",
    description: "软硬件平台、开发工具多样"
  },
  {
    icon: <RocketOutlined className="text-3xl text-indigo-500" />,
    title: "前景广阔",
    description: "物联网人才需求持续增长"
  }
];

const careerPaths = [
  {
    title: "物联网开发工程师",
    description: "物联网系统与应用开发",
    skills: ["嵌入式开发", "通信协议", "平台集成", "数据处理"]
  },
  {
    title: "嵌入式工程师",
    description: "嵌入式设备与传感器开发",
    skills: ["单片机", "传感器", "硬件接口", "驱动开发"]
  },
  {
    title: "物联网架构师",
    description: "系统架构设计与优化",
    skills: ["系统设计", "安全防护", "平台选型", "大数据"]
  },
  {
    title: "行业解决方案专家",
    description: "智慧城市、工业、医疗等行业方案",
    skills: ["行业应用", "项目管理", "需求分析", "集成实施"]
  }
];

export default function IotLearningPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 课程概述 */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-400 to-green-500 text-white px-6 py-2 rounded-full text-sm font-medium">
              物联网
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            掌握物联网开发
            <span className="block text-3xl text-blue-600 mt-2">从基础到实战</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            物联网是新一代信息技术的重要方向，广泛应用于智慧城市、工业、医疗、家居等领域。
            本课程将带你系统学习物联网开发，提升跨界工程能力。
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/study/iot/intro">
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
            <p className="text-3xl font-bold text-gray-700">8</p>
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
            <p className="text-3xl font-bold text-gray-700">5</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么选择物联网？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {iotFeatures.map((feature, index) => (
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
          <p className="text-gray-600 text-center mb-8">系统掌握物联网开发技能</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {iotCourses.map((course, index) => (
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
                  <span>关注物联网安全和性能优化</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>积极参与社区讨论，获取最新资源</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>尝试用物联网技术解决实际问题，提升实战能力</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 开始学习按钮 */}
        <div className="text-center mt-12">
          <Link href="/study/iot/intro">
            <Button type="primary" size="large" className="h-12 px-8 text-lg">
              立即开始物联网学习之旅
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 