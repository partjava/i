'use client';

import React from 'react';
import { Card, Row, Col, Typography, Button, Statistic, Tag, Timeline } from 'antd';
import { BookOutlined, CodeOutlined, RocketOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function MLHomePage() {
  const courses = [
    { title: '机器学习基础', description: '机器学习概念、原理和数学基础', href: '/study/ai/ml/basic' },
    { title: '项目流程', description: '完整的机器学习项目开发流程', href: '/study/ai/ml/workflow' },
    { title: '监督学习算法', description: '分类、回归等监督学习方法', href: '/study/ai/ml/supervised' },
    { title: '无监督学习算法', description: '聚类、降维等无监督学习方法', href: '/study/ai/ml/unsupervised' },
    { title: '模型评估与选择', description: '模型性能评估和选择策略', href: '/study/ai/ml/evaluation' },
    { title: '特征工程', description: '特征选择、提取和构造', href: '/study/ai/ml/feature-engineering' },
    { title: '集成学习', description: 'Bagging、Boosting、Stacking', href: '/study/ai/ml/ensemble' },
    { title: '实战案例', description: '真实业务场景的机器学习应用', href: '/study/ai/ml/cases' },
    { title: '模型部署与优化', description: '模型上线和性能优化', href: '/study/ai/ml/deployment' },
    { title: '面试题', description: '机器学习面试高频问题', href: '/study/ai/ml/interview' },
    { title: '进阶与前沿', description: '最新技术发展和研究方向', href: '/study/ai/ml/advanced' }
  ];

  const learningPath = [
    {
      phase: '第一阶段：基础与理论',
      description: '掌握机器学习基本概念和数学基础',
      courses: [
        { name: '机器学习基础', href: '/study/ai/ml/basic', duration: '40分钟' },
        { name: '机器学习项目流程', href: '/study/ai/ml/workflow', duration: '30分钟' }
      ]
    },
    {
      phase: '第二阶段：核心算法',
      description: '学习各种监督和无监督学习算法',
      courses: [
        { name: '监督学习算法', href: '/study/ai/ml/supervised', duration: '60分钟' },
        { name: '无监督学习算法', href: '/study/ai/ml/unsupervised', duration: '50分钟' }
      ]
    },
    {
      phase: '第三阶段：工程实践',
      description: '掌握特征工程和模型评估技能',
      courses: [
        { name: '模型评估与选择', href: '/study/ai/ml/evaluation', duration: '40分钟' },
        { name: '特征工程', href: '/study/ai/ml/feature-engineering', duration: '50分钟' },
        { name: '集成学习', href: '/study/ai/ml/ensemble', duration: '45分钟' }
      ]
    },
    {
      phase: '第四阶段：应用实战',
      description: '完成真实项目，积累实战经验',
      courses: [
        { name: '机器学习实战案例', href: '/study/ai/ml/cases', duration: '90分钟' },
        { name: '模型部署与优化', href: '/study/ai/ml/deployment', duration: '60分钟' }
      ]
    },
    {
      phase: '第五阶段：进阶提升',
      description: '探索前沿技术，成为领域专家',
      courses: [
        { name: '机器学习面试题', href: '/study/ai/ml/interview', duration: '45分钟' },
        { name: '进阶与前沿', href: '/study/ai/ml/advanced', duration: '60分钟' }
      ]
    }
  ];

  const features = [
    { icon: <CodeOutlined />, title: '理论扎实', description: '严谨的数学理论和算法基础' },
    { icon: <RocketOutlined />, title: '应用广泛', description: '覆盖各行各业的实际问题' },
    { icon: <TrophyOutlined />, title: '前景光明', description: 'AI时代的核心技术需求' },
    { icon: <BookOutlined />, title: '体系完整', description: '从基础到前沿的完整知识体系' }
  ];

  const careerPaths = [
    { title: '机器学习工程师', description: '负责模型开发和算法优化' },
    { title: '数据科学家', description: '通过数据分析解决业务问题' },
    { title: 'AI算法工程师', description: '专注人工智能算法研发' },
    { title: '研究科学家', description: '从事前沿技术研究和创新' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 头部介绍 */}
        <div className="text-center mb-12">
          <Title level={1} className="mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            机器学习
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
            机器学习是人工智能的核心分支，让计算机具备从数据中学习和预测的能力。
            掌握机器学习技术，开启智能时代的大门，成为AI领域的专业人才。
          </Paragraph>
          <div className="mt-8">
            <Link href="/study/ai/ml/basic">
              <Button type="primary" size="large" className="bg-green-600 hover:bg-green-700 border-green-600 mr-4">
                开始学习
              </Button>
            </Link>
            <Button size="large" ghost className="border-green-600 text-green-600 hover:border-green-700 hover:text-green-700">
              了解更多
            </Button>
          </div>
        </div>

        {/* 统计数据 */}
        <Row gutter={[24, 24]} className="mb-12">
          <Col xs={24} sm={6}>
            <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
              <Statistic title="课程模块" value={11} suffix="个" valueStyle={{ color: '#059669' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
              <Statistic title="算法数量" value={50} suffix="+" valueStyle={{ color: '#059669' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
              <Statistic title="学习时长" value={150} suffix="小时" valueStyle={{ color: '#059669' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
              <Statistic title="难度等级" value={4} suffix="/5" valueStyle={{ color: '#059669' }} />
            </Card>
          </Col>
        </Row>

        {/* 课程大纲 */}
        <Card className="mb-12 border-green-200" title={
          <span className="text-green-700 text-xl font-semibold flex items-center">
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
                    className="h-full border-green-100 hover:border-green-300 hover:shadow-md transition-all cursor-pointer"
                    hoverable
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <Text strong className="text-green-700">{course.title}</Text>
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
              <Card key={phaseIndex} className="shadow-md hover:shadow-lg transition-shadow border-green-200">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium mr-4">
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
                        className="transition-all duration-200 bg-white hover:shadow-md border-green-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium text-green-700">{course.name}</h4>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{course.duration}</span>
                          <Button type="primary" size="small" className="bg-green-600 hover:bg-green-700 border-green-600">
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

        {/* 核心特色 */}
        <Card className="mb-12 border-green-200" title={
          <span className="text-green-700 text-xl font-semibold flex items-center">
            <TrophyOutlined className="mr-2" />
            学科特色
          </span>
        }>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <div className="text-center">
                  <div className="text-green-600 text-4xl mb-4">{feature.icon}</div>
                  <Title level={4} className="text-green-700">{feature.title}</Title>
                  <Paragraph className="text-gray-600">{feature.description}</Paragraph>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 职业发展 */}
        <Card className="mb-12 border-green-200" title={
          <span className="text-green-700 text-xl font-semibold flex items-center">
            <UserOutlined className="mr-2" />
            职业发展方向
          </span>
        }>
          <Row gutter={[16, 16]}>
            {careerPaths.map((career, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card size="small" className="border-green-100 hover:border-green-300 transition-colors">
                  <Text strong className="text-green-700">{career.title}</Text>
                  <div className="text-gray-600 mt-2">{career.description}</div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 学习建议 */}
        <Card className="border-green-200" title={
          <span className="text-green-700 text-xl font-semibold">
            学习建议
          </span>
        }>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Title level={4} className="text-green-700">📚 学习方法</Title>
              <ul className="text-gray-600 space-y-2">
                <li>• 重视数学基础，理解算法原理</li>
                <li>• 理论与实践相结合，多做项目</li>
                <li>• 关注业界最新发展和技术趋势</li>
                <li>• 培养数据思维和问题分析能力</li>
              </ul>
            </Col>
            <Col xs={24} lg={12}>
              <Title level={4} className="text-green-700">🎯 重点关注</Title>
              <ul className="text-gray-600 space-y-2">
                <li>• 掌握核心算法的数学原理</li>
                <li>• 学会特征工程和数据预处理</li>
                <li>• 理解模型评估和调优技巧</li>
                <li>• 关注模型部署和工程实践</li>
              </ul>
            </Col>
          </Row>
          <div className="mt-8 p-6 bg-green-50 rounded-lg">
            <Text className="text-green-700 font-medium">
              💡 小贴士：机器学习是一个实践性很强的学科，建议在掌握理论基础的同时，
              多参与实际项目，通过解决真实问题来提升技能水平。
            </Text>
          </div>
          <div className="mt-6 text-center">
            <Link href="/study/ai/ml/basic">
              <Button type="primary" size="large" className="bg-green-600 hover:bg-green-700 border-green-600">
                立即开始学习之旅
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
} 