'use client';

import React from 'react';
import { Card, Row, Col, Typography, Button, Statistic } from 'antd';
import { BookOutlined, CodeOutlined, RocketOutlined, TrophyOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function AIProgrammingHomePage() {
  const courses = [
    { title: '开发环境配置', description: 'AI开发环境搭建和工具配置', href: '/study/ai/programming/environment' },
    { title: 'Python基础', description: 'AI开发必备的Python编程基础', href: '/study/ai/programming/python' },
    { title: 'AI编程规范', description: 'AI项目编程规范和最佳实践', href: '/study/ai/programming/coding-standards' },
    { title: 'AI项目开发流程', description: 'AI项目的完整开发流程和管理', href: '/study/ai/programming/workflow' },
    { title: 'AI系统架构设计', description: 'AI系统的架构设计和技术选型', href: '/study/ai/programming/architecture' },
    { title: '模型部署与优化', description: 'AI模型的部署、监控和性能优化', href: '/study/ai/programming/deployment' },
    { title: 'AI项目实战', description: '端到端AI项目开发实战案例', href: '/study/ai/programming/project' },
    { title: '常见问题与面试题', description: 'AI开发常见问题和面试准备', href: '/study/ai/programming/interview' }
  ];

  const learningPath = [
    {
      phase: '第一阶段：基础环境',
      description: '搭建AI开发环境，掌握Python编程',
      courses: [
        { name: '开发环境配置', href: '/study/ai/programming/environment', duration: '40分钟' },
        { name: 'Python基础', href: '/study/ai/programming/python', duration: '80分钟' }
      ]
    },
    {
      phase: '第二阶段：编程规范',
      description: '学习AI编程规范和开发流程',
      courses: [
        { name: 'AI编程规范', href: '/study/ai/programming/coding-standards', duration: '50分钟' },
        { name: 'AI项目开发流程', href: '/study/ai/programming/workflow', duration: '70分钟' }
      ]
    },
    {
      phase: '第三阶段：系统设计',
      description: '掌握AI系统架构设计和部署',
      courses: [
        { name: 'AI系统架构设计', href: '/study/ai/programming/architecture', duration: '90分钟' },
        { name: '模型部署与优化', href: '/study/ai/programming/deployment', duration: '100分钟' }
      ]
    },
    {
      phase: '第四阶段：项目实战',
      description: '完成完整的AI项目开发',
      courses: [
        { name: 'AI项目实战', href: '/study/ai/programming/project', duration: '150分钟' },
        { name: '常见问题与面试题', href: '/study/ai/programming/interview', duration: '60分钟' }
      ]
    }
  ];

  const features = [
    { icon: <CodeOutlined />, title: '工程化实践', description: '将AI算法转化为可部署的工程项目' },
    { icon: <RocketOutlined />, title: '端到端开发', description: '从模型训练到生产部署的完整流程' },
    { icon: <TrophyOutlined />, title: '最佳实践', description: '业界先进的AI开发规范和方法' },
    { icon: <SettingOutlined />, title: '系统优化', description: '性能调优和系统监控的工程技巧' }
  ];

  const careerPaths = [
    { title: 'AI工程师', description: '负责AI系统的开发和部署' },
    { title: 'MLOps工程师', description: '专注机器学习系统的运维和优化' },
    { title: '算法工程师', description: '算法研发和工程化实现' },
    { title: 'AI架构师', description: 'AI系统的整体架构设计' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 头部介绍 */}
        <div className="text-center mb-12">
          <Title level={1} className="mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            人工智能程序设计
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
            掌握AI程序设计是将算法转化为实际应用的关键技能。从环境搭建到项目部署，
            全面学习AI工程化开发的完整流程和最佳实践。
          </Paragraph>
          <div className="mt-8">
            <Link href="/study/ai/programming/environment">
              <Button type="primary" size="large" className="bg-teal-600 hover:bg-teal-700 border-teal-600 mr-4">
                开始学习
              </Button>
            </Link>
            <Button size="large" ghost className="border-teal-600 text-teal-600 hover:border-teal-700 hover:text-teal-700">
              了解更多
            </Button>
          </div>
        </div>

        {/* 统计数据 */}
        <Row gutter={[24, 24]} className="mb-12">
          <Col xs={24} sm={6}>
            <Card className="text-center border-teal-200 hover:shadow-lg transition-shadow">
              <Statistic title="课程模块" value={8} suffix="个" valueStyle={{ color: '#0d9488' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-teal-200 hover:shadow-lg transition-shadow">
              <Statistic title="技术栈" value={20} suffix="+" valueStyle={{ color: '#0d9488' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-teal-200 hover:shadow-lg transition-shadow">
              <Statistic title="学习时长" value={100} suffix="小时" valueStyle={{ color: '#0d9488' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-teal-200 hover:shadow-lg transition-shadow">
              <Statistic title="难度等级" value={3} suffix="/5" valueStyle={{ color: '#0d9488' }} />
            </Card>
          </Col>
        </Row>

        {/* 课程大纲 */}
        <Card className="mb-12 border-teal-200" title={
          <span className="text-teal-700 text-xl font-semibold flex items-center">
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
                    className="h-full border-teal-100 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer"
                    hoverable
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-teal-100 text-teal-600 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <Text strong className="text-teal-700">{course.title}</Text>
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
              <Card key={phaseIndex} className="shadow-md hover:shadow-lg transition-shadow border-teal-200">
                <div className="flex items-center mb-4">
                  <div className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full text-sm font-medium mr-4">
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
                        className="transition-all duration-200 bg-white hover:shadow-md border-teal-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium text-teal-700">{course.name}</h4>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{course.duration}</span>
                          <Button type="primary" size="small" className="bg-teal-600 hover:bg-teal-700 border-teal-600">
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
        <Card className="mb-12 border-teal-200" title={
          <span className="text-teal-700 text-xl font-semibold">技术特色</span>
        }>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <div className="text-center">
                  <div className="text-4xl text-teal-600 mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 职业方向 */}
        <Card className="border-teal-200" title={
          <span className="text-teal-700 text-xl font-semibold">职业方向</span>
        }>
          <Row gutter={[16, 16]}>
            {careerPaths.map((career, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card size="small" className="border-teal-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="bg-teal-100 text-teal-600 w-10 h-10 rounded-full flex items-center justify-center">
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