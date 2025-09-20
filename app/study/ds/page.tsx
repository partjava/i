"use client";

import { Card, Progress, Button, Tag } from "antd";
import { BookOutlined, RocketOutlined, TrophyOutlined, CodeOutlined, BulbOutlined, SafetyOutlined, ThunderboltOutlined, TeamOutlined, CheckCircleOutlined, PlayCircleOutlined, FileTextOutlined, ExperimentOutlined } from "@ant-design/icons";
import Link from "next/link";

const dsCourses = [
  { name: "基础与复杂度分析", href: "/study/ds/basic", duration: "40分钟" },
  { name: "线性表", href: "/study/ds/linear", duration: "60分钟" },
  { name: "字符串与算法", href: "/study/ds/string", duration: "60分钟" },
  { name: "树与二叉树", href: "/study/ds/tree", duration: "90分钟" },
  { name: "图与图算法", href: "/study/ds/graph", duration: "90分钟" },
  { name: "排序与查找", href: "/study/ds/sort", duration: "60分钟" },
  { name: "哈希表与集合", href: "/study/ds/hash", duration: "60分钟" },
  { name: "递归与分治", href: "/study/ds/recursion", duration: "60分钟" },
  { name: "动态规划", href: "/study/ds/dp", duration: "90分钟" },
  { name: "面试题与实战", href: "/study/ds/interview", duration: "120分钟" }
];

const learningPath = [
  {
    title: "第一阶段：基础与线性结构",
    description: "掌握数据结构基础和线性表相关内容",
    items: [dsCourses[0], dsCourses[1]],
  },
  {
    title: "第二阶段：字符串与树结构",
    description: "学习字符串算法和树结构相关内容",
    items: [dsCourses[2], dsCourses[3]],
  },
  {
    title: "第三阶段：图与高级算法",
    description: "掌握图结构及其算法，学习排序、查找等高级内容",
    items: [dsCourses[4], dsCourses[5], dsCourses[6]],
  },
  {
    title: "第四阶段：递归与动态规划",
    description: "深入理解递归、分治和动态规划思想",
    items: [dsCourses[7], dsCourses[8]],
  },
  {
    title: "第五阶段：面试与实战",
    description: "综合应用所学知识，解决实际问题",
    items: [dsCourses[9]],
  },
];

const dsFeatures = [
  {
    icon: <ThunderboltOutlined className="text-3xl text-blue-500" />,
    title: "算法基础",
    description: "打好编程算法基础，提升解题能力"
  },
  {
    icon: <SafetyOutlined className="text-3xl text-green-500" />,
    title: "结构多样",
    description: "涵盖线性、树、图等多种数据结构"
  },
  {
    icon: <CodeOutlined className="text-3xl text-purple-500" />,
    title: "面试必备",
    description: "各大厂面试高频考点"
  },
  {
    icon: <BulbOutlined className="text-3xl text-orange-500" />,
    title: "实战导向",
    description: "理论结合实践，提升工程能力"
  },
  {
    icon: <TeamOutlined className="text-3xl text-red-500" />,
    title: "应用广泛",
    description: "广泛应用于各类开发和工程场景"
  },
  {
    icon: <RocketOutlined className="text-3xl text-indigo-500" />,
    title: "思维训练",
    description: "提升抽象思维和问题分解能力"
  }
];

const careerPaths = [
  {
    title: "算法工程师",
    description: "算法设计与优化，解决实际问题",
    skills: ["算法设计", "数据结构", "复杂度分析", "优化技巧"]
  },
  {
    title: "后端开发工程师",
    description: "高性能服务与数据处理",
    skills: ["高并发", "数据库", "缓存", "分布式"]
  },
  {
    title: "前端开发工程师",
    description: "前端数据结构与算法应用",
    skills: ["算法可视化", "数据处理", "性能优化", "工程实践"]
  },
  {
    title: "大数据开发工程师",
    description: "大数据平台与分布式计算",
    skills: ["分布式算法", "数据挖掘", "数据分析", "性能调优"]
  }
];

export default function DsLearningPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 课程概述 */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium">
              数据结构与算法
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            掌握数据结构与算法
            <span className="block text-3xl text-green-600 mt-2">从基础到实战</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            数据结构与算法是编程的核心基础，广泛应用于各类开发、面试和工程实践。
            本课程将带你系统学习数据结构与算法，提升编程能力和思维水平。
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/study/ds/basic">
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
            <p className="text-3xl font-bold text-gray-700">10</p>
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
            <p className="text-3xl font-bold text-gray-700">8</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么学习数据结构与算法？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dsFeatures.map((feature, index) => (
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
          <p className="text-gray-600 text-center mb-8">系统掌握数据结构与算法技能</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dsCourses.map((course, index) => (
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
                  <span>多阅读经典书籍和优秀开源项目</span>
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
                  <span>关注算法复杂度和性能优化</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>积极参与社区讨论，获取最新资源</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>尝试用算法解决实际问题，提升实战能力</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 开始学习按钮 */}
        <div className="text-center mt-12">
          <Link href="/study/ds/basic">
            <Button type="primary" size="large" className="h-12 px-8 text-lg">
              立即开始数据结构与算法学习之旅
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 