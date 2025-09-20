'use client';

import { Card, Progress, Button, Tag, Divider, Timeline } from 'antd';
import { 
  BookOutlined, 
  RocketOutlined, 
  TrophyOutlined, 
  CodeOutlined,
  BulbOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined,
  FileTextOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import Link from 'next/link';

const cppCourses = [
  { name: '开发环境配置', href: '/study/cpp/setup', duration: '30分钟' },
  { name: '基础语法', href: '/study/cpp/syntax', duration: '45分钟' },
  { name: '变量和数据类型', href: '/study/cpp/variables', duration: '60分钟' },
  { name: '运算符', href: '/study/cpp/operators', duration: '45分钟' },
  { name: '控制流程', href: '/study/cpp/control', duration: '60分钟' },
  { name: '函数', href: '/study/cpp/functions', duration: '90分钟' },
  { name: '数组和字符串', href: '/study/cpp/arrays', duration: '75分钟' },
  { name: '指针', href: '/study/cpp/pointers', duration: '120分钟' },
  { name: '引用', href: '/study/cpp/references', duration: '60分钟' },
  { name: '结构体和类', href: '/study/cpp/structs', duration: '90分钟' },
  { name: '面向对象编程', href: '/study/cpp/oop', duration: '120分钟' },
  { name: '模板编程', href: '/study/cpp/templates', duration: '150分钟' },
  { name: 'STL标准库', href: '/study/cpp/stl', duration: '180分钟' },
  { name: '文件操作', href: '/study/cpp/file-io', duration: '90分钟' },
  { name: '异常处理', href: '/study/cpp/exceptions', duration: '75分钟' },
  { name: '智能指针', href: '/study/cpp/smart-pointers', duration: '90分钟' },
  { name: '多线程编程', href: '/study/cpp/multithreading', duration: '120分钟' },
  { name: '网络编程', href: '/study/cpp/networking', duration: '150分钟' },
  { name: '项目实战', href: '/study/cpp/projects', duration: '240分钟' },
  { name: 'C++常用头文件', href: '/study/cpp/headers', duration: '60分钟' }
];

const learningPath = [
  {
    title: '第一阶段：基础语法',
    description: '掌握C++基本语法和编程思维',
    items: [
      { name: '开发环境配置', href: '/study/cpp/setup', completed: false, duration: '30分钟' },
      { name: '基础语法', href: '/study/cpp/syntax', completed: false, duration: '45分钟' },
      { name: '变量和数据类型', href: '/study/cpp/variables', completed: false, duration: '60分钟' },
      { name: '运算符', href: '/study/cpp/operators', completed: false, duration: '45分钟' },
      { name: '控制流程', href: '/study/cpp/control', completed: false, duration: '60分钟' }
    ]
  },
  {
    title: '第二阶段：函数与数据结构',
    description: '学习函数编程和基础数据结构',
    items: [
      { name: '函数', href: '/study/cpp/functions', completed: false, duration: '90分钟' },
      { name: '数组和字符串', href: '/study/cpp/arrays', completed: false, duration: '75分钟' },
      { name: '指针', href: '/study/cpp/pointers', completed: false, duration: '120分钟' },
      { name: '引用', href: '/study/cpp/references', completed: false, duration: '60分钟' }
    ]
  },
  {
    title: '第三阶段：面向对象编程',
    description: '深入理解OOP编程范式',
    items: [
      { name: '结构体和类', href: '/study/cpp/structs', completed: false, duration: '90分钟' },
      { name: '面向对象编程', href: '/study/cpp/oop', completed: false, duration: '120分钟' }
    ]
  },
  {
    title: '第四阶段：高级特性',
    description: '掌握C++高级编程技巧',
    items: [
      { name: '模板编程', href: '/study/cpp/templates', completed: false, duration: '150分钟' },
      { name: 'STL标准库', href: '/study/cpp/stl', completed: false, duration: '180分钟' },
      { name: '文件操作', href: '/study/cpp/file-io', completed: false, duration: '90分钟' },
      { name: '异常处理', href: '/study/cpp/exceptions', completed: false, duration: '75分钟' },
      { name: '智能指针', href: '/study/cpp/smart-pointers', completed: false, duration: '90分钟' }
    ]
  },
  {
    title: '第五阶段：实战应用',
    description: '项目实战和综合应用',
    items: [
      { name: '多线程编程', href: '/study/cpp/multithreading', completed: false, duration: '120分钟' },
      { name: '网络编程', href: '/study/cpp/networking', completed: false, duration: '150分钟' },
      { name: '项目实战', href: '/study/cpp/projects', completed: false, duration: '240分钟' },
      { name: 'C++常用头文件', href: '/study/cpp/headers', completed: false, duration: '60分钟' }
    ]
  }
];

const cppFeatures = [
  {
    icon: <ThunderboltOutlined className="text-3xl text-blue-500" />,
    title: '高性能',
    description: 'C++以其接近硬件的执行效率著称，是系统级编程的首选语言'
  },
  {
    icon: <SafetyOutlined className="text-3xl text-green-500" />,
    title: '内存安全',
    description: '通过智能指针、RAII等技术，提供强大的内存管理能力'
  },
  {
    icon: <CodeOutlined className="text-3xl text-purple-500" />,
    title: '面向对象',
    description: '支持封装、继承、多态等面向对象编程特性'
  },
  {
    icon: <BulbOutlined className="text-3xl text-orange-500" />,
    title: '模板编程',
    description: '泛型编程能力，提高代码复用性和类型安全性'
  },
  {
    icon: <TeamOutlined className="text-3xl text-red-500" />,
    title: '标准库',
    description: '丰富的STL标准库，提供容器、算法、迭代器等工具'
  },
  {
    icon: <RocketOutlined className="text-3xl text-indigo-500" />,
    title: '跨平台',
    description: '一次编写，多平台运行，支持Windows、Linux、macOS'
  }
];

const careerPaths = [
  {
    title: '系统开发工程师',
    description: '操作系统、驱动程序、嵌入式系统开发',
    skills: ['系统编程', '内存管理', '多线程', '网络编程']
  },
  {
    title: '游戏开发工程师',
    description: '游戏引擎、图形渲染、性能优化',
    skills: ['图形编程', '物理引擎', '音频处理', '性能优化']
  },
  {
    title: '算法工程师',
    description: '算法实现、数据结构、性能优化',
    skills: ['算法设计', '数据结构', '复杂度分析', '优化技巧']
  },
  {
    title: '金融量化工程师',
    description: '高频交易、风险控制、量化分析',
    skills: ['数值计算', '统计分析', '实时处理', '风险管理']
  }
];

export default function CppLearningPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 课程概述 */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium">
              C++ 编程语言
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            掌握C++编程
            <span className="block text-3xl text-blue-600 mt-2">从入门到精通</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            C++是一门强大的编程语言，广泛应用于系统开发、游戏开发、金融科技等领域。
            本课程将带你从零开始，系统性地学习C++编程，掌握现代C++开发技能。
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/study/cpp/setup">
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
            <p className="text-3xl font-bold text-gray-700">18</p>
            <p className="text-sm text-gray-500">个学习模块</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <RocketOutlined className="text-4xl text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">当前进度</h3>
            <Progress percent={0} strokeColor="#10B981" />
            <p className="text-sm text-gray-500 mt-2">0% 已完成</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <TrophyOutlined className="text-4xl text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">预计时长</h3>
            <p className="text-3xl font-bold text-gray-700">18</p>
            <p className="text-sm text-gray-500">小时学习</p>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <ExperimentOutlined className="text-4xl text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">实践项目</h3>
            <p className="text-3xl font-bold text-gray-700">5+</p>
            <p className="text-sm text-gray-500">个实战项目</p>
          </Card>
        </div>

        {/* C++特色功能 */}
        <Card className="mb-12 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么选择C++？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cppFeatures.map((feature, index) => (
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
          <p className="text-gray-600 text-center mb-8">按照学习顺序，系统掌握C++编程技能</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cppCourses.map((course, index) => (
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {phase.items.map((item, itemIndex) => (
                    <Link key={itemIndex} href={item.href}>
                      <Card
                        hoverable
                        className={`transition-all duration-200 ${
                          item.completed ? 'bg-green-50 border-green-200' : 'bg-white hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium">{item.name}</h4>
                          {item.completed && <CheckCircleOutlined className="text-green-500" />}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{item.duration}</span>
                          <Button type="primary" size="small">
                            {item.completed ? '复习' : '开始学习'}
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
                  <span>每个主题都配有理论讲解和实践练习，建议两者结合</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>遇到不懂的概念可以随时回顾之前的内容</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>动手实践很重要，每个主题都要完成配套的练习</span>
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
                  <span>关注内存管理和指针使用，这是C++的重点</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>多阅读优秀的C++代码，学习最佳实践</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mr-3 mt-1" />
                  <span>参与开源项目，提升实战能力</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 开始学习按钮 */}
        <div className="text-center mt-12">
          <Link href="/study/cpp/setup">
            <Button type="primary" size="large" className="h-12 px-8 text-lg">
              立即开始C++学习之旅
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 