'use client';

import React from 'react';
import { Card, Row, Col, Typography, Button, Statistic } from 'antd';
import { BookOutlined, CodeOutlined, RocketOutlined, TrophyOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function RobotHomePage() {
  const courses = [
    { title: '机器人学基础', description: '机器人概念、分类和发展历史', href: '/study/ai/robot/basic' },
    { title: '运动学与动力学', description: '机器人运动建模和动力学分析', href: '/study/ai/robot/kinematics' },
    { title: '路径规划', description: '全局和局部路径规划算法', href: '/study/ai/robot/path-planning' },
    { title: '机器人控制', description: 'PID控制、自适应控制等控制方法', href: '/study/ai/robot/control' },
    { title: '传感器与感知', description: '激光雷达、视觉、IMU等传感器', href: '/study/ai/robot/sensors' },
    { title: '机器人操作系统', description: 'ROS框架和机器人软件开发', href: '/study/ai/robot/ros' },
    { title: '机器人视觉', description: '视觉SLAM和物体识别', href: '/study/ai/robot/vision' },
    { title: '机器人学习', description: '强化学习在机器人中的应用', href: '/study/ai/robot/learning' },
    { title: '人机交互', description: '语音交互和自然交互技术', href: '/study/ai/robot/interaction' },
    { title: '机器人仿真', description: 'Gazebo、PyBullet等仿真环境', href: '/study/ai/robot/simulation' },
    { title: '机器人实战', description: '完整机器人项目开发', href: '/study/ai/robot/cases' },
    { title: '机器人面试题', description: '机器人学面试高频问题', href: '/study/ai/robot/interview' },
    { title: '进阶与前沿', description: '仿生机器人、群体机器人', href: '/study/ai/robot/advanced' }
  ];

  const learningPath = [
    {
      phase: '第一阶段：理论基础',
      description: '掌握机器人学基本理论和数学基础',
      courses: [
        { name: '机器人学基础', href: '/study/ai/robot/basic', duration: '50分钟' },
        { name: '运动学与动力学', href: '/study/ai/robot/kinematics', duration: '90分钟' }
      ]
    },
    {
      phase: '第二阶段：控制与规划',
      description: '学习机器人控制和路径规划技术',
      courses: [
        { name: '路径规划', href: '/study/ai/robot/path-planning', duration: '80分钟' },
        { name: '机器人控制', href: '/study/ai/robot/control', duration: '85分钟' }
      ]
    },
    {
      phase: '第三阶段：感知与认知',
      description: '掌握机器人感知和认知技术',
      courses: [
        { name: '传感器与感知', href: '/study/ai/robot/sensors', duration: '70分钟' },
        { name: '机器人视觉', href: '/study/ai/robot/vision', duration: '100分钟' },
        { name: '机器人学习', href: '/study/ai/robot/learning', duration: '90分钟' }
      ]
    },
    {
      phase: '第四阶段：系统开发',
      description: '学习机器人系统开发和人机交互',
      courses: [
        { name: '机器人操作系统', href: '/study/ai/robot/ros', duration: '120分钟' },
        { name: '人机交互', href: '/study/ai/robot/interaction', duration: '60分钟' },
        { name: '机器人仿真', href: '/study/ai/robot/simulation', duration: '80分钟' }
      ]
    },
    {
      phase: '第五阶段：实战进阶',
      description: '完成项目实战，掌握前沿技术',
      courses: [
        { name: '机器人实战', href: '/study/ai/robot/cases', duration: '180分钟' },
        { name: '机器人面试题', href: '/study/ai/robot/interview', duration: '60分钟' },
        { name: '进阶与前沿', href: '/study/ai/robot/advanced', duration: '90分钟' }
      ]
    }
  ];

  const features = [
    { icon: <RobotOutlined />, title: '物理交互', description: '机器人能够与真实世界物理交互' },
    { icon: <RocketOutlined />, title: '应用广泛', description: '工业、服务、医疗、军事等领域' },
    { icon: <TrophyOutlined />, title: '技术融合', description: '融合AI、控制、机械等多学科技术' },
    { icon: <BookOutlined />, title: '发展迅速', description: '从工业机器人到智能服务机器人' }
  ];

  const careerPaths = [
    { title: '机器人算法工程师', description: '专注机器人算法研发和优化' },
    { title: '机器人系统工程师', description: '机器人整体系统设计和集成' },
    { title: '自动化工程师', description: '工业自动化和机器人应用' },
    { title: '机器人产品经理', description: '机器人产品规划和管理' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 头部介绍 */}
        <div className="text-center mb-12">
          <Title level={1} className="mb-4 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            智能机器人
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
            智能机器人是人工智能技术的物理化身，融合了感知、认知、决策和执行等多项技术。
            从工业自动化到服务机器人，机器人技术正在改变我们的生产和生活方式。
          </Paragraph>
          <div className="mt-8">
            <Link href="/study/ai/robot/basic">
              <Button type="primary" size="large" className="bg-gray-600 hover:bg-gray-700 border-gray-600 mr-4">
                开始学习
              </Button>
            </Link>
            <Button size="large" ghost className="border-gray-600 text-gray-600 hover:border-gray-700 hover:text-gray-700">
              了解更多
            </Button>
          </div>
        </div>

        {/* 统计数据 */}
        <Row gutter={[24, 24]} className="mb-12">
          <Col xs={24} sm={6}>
            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <Statistic title="课程模块" value={13} suffix="个" valueStyle={{ color: '#4b5563' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <Statistic title="技术领域" value={50} suffix="+" valueStyle={{ color: '#4b5563' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <Statistic title="学习时长" value={220} suffix="小时" valueStyle={{ color: '#4b5563' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <Statistic title="难度等级" value={5} suffix="/5" valueStyle={{ color: '#4b5563' }} />
            </Card>
          </Col>
        </Row>

        {/* 课程大纲 */}
        <Card className="mb-12 border-gray-200" title={
          <span className="text-gray-700 text-xl font-semibold flex items-center">
            <BookOutlined className="mr-2" />
            课程大纲
          </span>
        }>
          <Row gutter={[16, 16]}>
            {courses.map((course, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Link href={course.href}>
                  <Card 
                    size="small" 
                    className="h-full border-gray-100 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
                    hoverable
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-gray-100 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <Text strong className="text-gray-700">{course.title}</Text>
                        <div className="text-gray-600 text-sm mt-1">{course.description}</div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 学习路径 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">学习路径</h2>
          <div className="space-y-8">
            {learningPath.map((phase, phaseIndex) => (
              <Card key={phaseIndex} className="shadow-md hover:shadow-lg transition-shadow border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mr-4">
                    阶段 {phaseIndex + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{phase.phase}</h3>
                </div>
                <p className="text-gray-600 mb-6">{phase.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phase.courses.map((course, courseIndex) => (
                    <Link key={courseIndex} href={course.href}>
                      <Card
                        hoverable
                        className="transition-all duration-200 bg-white hover:shadow-md border-gray-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium text-gray-700">{course.name}</h4>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{course.duration}</span>
                          <Button type="primary" size="small" className="bg-gray-600 hover:bg-gray-700 border-gray-600">
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

        {/* 技术特色 */}
        <Card className="mb-12 border-gray-200" title={
          <span className="text-gray-700 text-xl font-semibold">技术特色</span>
        }>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <div className="text-center">
                  <div className="text-4xl text-gray-600 mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 职业方向 */}
        <Card className="border-gray-200" title={
          <span className="text-gray-700 text-xl font-semibold">职业方向</span>
        }>
          <Row gutter={[16, 16]}>
            {careerPaths.map((career, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card size="small" className="border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-100 text-gray-600 w-10 h-10 rounded-full flex items-center justify-center">
                      <UserOutlined />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{career.title}</h4>
                      <p className="text-gray-600 text-sm">{career.description}</p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </div>
    </div>
  );
} 