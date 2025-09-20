'use client';

import React from 'react';
import { Card, Row, Col, Typography, Button, Statistic } from 'antd';
import { BookOutlined, CodeOutlined, RocketOutlined, TrophyOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function RecSysHomePage() {
  const courses = [
    { title: '推荐系统基础', description: '推荐系统概念、分类和应用场景', href: '/study/ai/recsys/basic' },
    { title: '协同过滤', description: '基于用户和物品的协同过滤算法', href: '/study/ai/recsys/collaborative-filtering' },
    { title: '基于内容的推荐', description: '内容特征提取和相似度计算', href: '/study/ai/recsys/content-based' },
    { title: '矩阵分解', description: 'SVD、NMF等矩阵分解技术', href: '/study/ai/recsys/matrix-factorization' },
    { title: '深度学习推荐', description: '神经网络在推荐系统中的应用', href: '/study/ai/recsys/deep-learning' },
    { title: '推荐系统评估', description: '评估指标和离线在线评估方法', href: '/study/ai/recsys/evaluation' },
    { title: '冷启动问题', description: '新用户新物品的推荐策略', href: '/study/ai/recsys/cold-start' },
    { title: '实时推荐', description: '流式处理和实时推荐架构', href: '/study/ai/recsys/real-time' },
    { title: '推荐系统架构', description: '大规模推荐系统设计与实现', href: '/study/ai/recsys/architecture' },
    { title: '推荐系统实战', description: '完整推荐系统项目开发', href: '/study/ai/recsys/cases' },
    { title: '推荐系统面试题', description: '推荐算法面试高频问题', href: '/study/ai/recsys/interview' },
    { title: '进阶与前沿', description: '多目标优化、强化学习推荐', href: '/study/ai/recsys/advanced' }
  ];

  const learningPath = [
    {
      phase: '第一阶段：基础理论',
      description: '掌握推荐系统基本概念和经典算法',
      courses: [
        { name: '推荐系统基础', href: '/study/ai/recsys/basic', duration: '50分钟' },
        { name: '协同过滤', href: '/study/ai/recsys/collaborative-filtering', duration: '70分钟' },
        { name: '基于内容的推荐', href: '/study/ai/recsys/content-based', duration: '60分钟' }
      ]
    },
    {
      phase: '第二阶段：进阶算法',
      description: '学习矩阵分解和深度学习方法',
      courses: [
        { name: '矩阵分解', href: '/study/ai/recsys/matrix-factorization', duration: '80分钟' },
        { name: '深度学习推荐', href: '/study/ai/recsys/deep-learning', duration: '90分钟' }
      ]
    },
    {
      phase: '第三阶段：评估优化',
      description: '掌握推荐系统评估和优化方法',
      courses: [
        { name: '推荐系统评估', href: '/study/ai/recsys/evaluation', duration: '60分钟' },
        { name: '冷启动问题', href: '/study/ai/recsys/cold-start', duration: '55分钟' }
      ]
    },
    {
      phase: '第四阶段：工程实践',
      description: '学习推荐系统工程化和架构设计',
      courses: [
        { name: '实时推荐', href: '/study/ai/recsys/real-time', duration: '75分钟' },
        { name: '推荐系统架构', href: '/study/ai/recsys/architecture', duration: '100分钟' }
      ]
    },
    {
      phase: '第五阶段：实战进阶',
      description: '完成项目实战，掌握前沿技术',
      courses: [
        { name: '推荐系统实战', href: '/study/ai/recsys/cases', duration: '150分钟' },
        { name: '推荐系统面试题', href: '/study/ai/recsys/interview', duration: '50分钟' },
        { name: '进阶与前沿', href: '/study/ai/recsys/advanced', duration: '80分钟' }
      ]
    }
  ];

  const features = [
    { icon: <StarOutlined />, title: '个性化体验', description: '为每个用户提供个性化内容推荐' },
    { icon: <RocketOutlined />, title: '商业价值高', description: '直接影响用户留存和业务收入' },
    { icon: <TrophyOutlined />, title: '技术门槛高', description: '需要算法、工程、产品多方面能力' },
    { icon: <BookOutlined />, title: '应用广泛', description: '电商、内容、社交等各行业必备' }
  ];

  const careerPaths = [
    { title: '推荐算法工程师', description: '专注推荐算法研发和优化' },
    { title: '数据挖掘工程师', description: '用户行为分析和特征工程' },
    { title: '机器学习工程师', description: '推荐模型训练和部署' },
    { title: '产品数据分析师', description: '推荐效果分析和产品优化' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 头部介绍 */}
        <div className="text-center mb-12">
          <Title level={1} className="mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            推荐系统
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
            推荐系统是信息过载时代的核心技术，通过理解用户偏好和物品特征，为用户推荐感兴趣的内容。
            从电商到短视频，推荐算法正在塑造数字时代的用户体验。
          </Paragraph>
          <div className="mt-8">
            <Link href="/study/ai/recsys/basic">
              <Button type="primary" size="large" className="bg-orange-600 hover:bg-orange-700 border-orange-600 mr-4">
                开始学习
              </Button>
            </Link>
            <Button size="large" ghost className="border-orange-600 text-orange-600 hover:border-orange-700 hover:text-orange-700">
              了解更多
            </Button>
          </div>
        </div>

        {/* 统计数据 */}
        <Row gutter={[24, 24]} className="mb-12">
          <Col xs={24} sm={6}>
            <Card className="text-center border-orange-200 hover:shadow-lg transition-shadow">
              <Statistic title="课程模块" value={12} suffix="个" valueStyle={{ color: '#ea580c' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-orange-200 hover:shadow-lg transition-shadow">
              <Statistic title="算法技术" value={30} suffix="+" valueStyle={{ color: '#ea580c' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-orange-200 hover:shadow-lg transition-shadow">
              <Statistic title="学习时长" value={160} suffix="小时" valueStyle={{ color: '#ea580c' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-orange-200 hover:shadow-lg transition-shadow">
              <Statistic title="难度等级" value={4} suffix="/5" valueStyle={{ color: '#ea580c' }} />
            </Card>
          </Col>
        </Row>

        {/* 课程大纲 */}
        <Card className="mb-12 border-orange-200" title={
          <span className="text-orange-700 text-xl font-semibold flex items-center">
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
                    className="h-full border-orange-100 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer"
                    hoverable
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <Text strong className="text-orange-700">{course.title}</Text>
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
              <Card key={phaseIndex} className="shadow-md hover:shadow-lg transition-shadow border-orange-200">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium mr-4">
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
                        className="transition-all duration-200 bg-white hover:shadow-md border-orange-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium text-orange-700">{course.name}</h4>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{course.duration}</span>
                          <Button type="primary" size="small" className="bg-orange-600 hover:bg-orange-700 border-orange-600">
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
        <Card className="mb-12 border-orange-200" title={
          <span className="text-orange-700 text-xl font-semibold">技术特色</span>
        }>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <div className="text-center">
                  <div className="text-4xl text-orange-600 mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 职业方向 */}
        <Card className="border-orange-200" title={
          <span className="text-orange-700 text-xl font-semibold">职业方向</span>
        }>
          <Row gutter={[16, 16]}>
            {careerPaths.map((career, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card size="small" className="border-orange-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 text-orange-600 w-10 h-10 rounded-full flex items-center justify-center">
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