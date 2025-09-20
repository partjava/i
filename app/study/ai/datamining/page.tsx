'use client';

import React from 'react';
import { Card, Row, Col, Typography, Button, Statistic } from 'antd';
import { BookOutlined, CodeOutlined, RocketOutlined, TrophyOutlined, DatabaseOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function DataMiningHomePage() {
  const courses = [
    { title: '数据挖掘基础', description: '数据挖掘概念、流程和应用领域', href: '/study/ai/datamining/basic' },
    { title: '数据预处理', description: '数据清洗、转换和质量评估', href: '/study/ai/datamining/preprocessing' },
    { title: '特征工程', description: '特征选择、提取和构造技术', href: '/study/ai/datamining/feature-engineering' },
    { title: '关联规则挖掘', description: 'Apriori、FP-Growth等关联算法', href: '/study/ai/datamining/association' },
    { title: '聚类分析', description: 'K-means、层次聚类等聚类方法', href: '/study/ai/datamining/clustering' },
    { title: '分类与预测', description: '决策树、随机森林等分类算法', href: '/study/ai/datamining/classification' },
    { title: '异常检测', description: '孤立森林、LOF等异常检测技术', href: '/study/ai/datamining/anomaly' },
    { title: '数据可视化', description: '数据探索和结果可视化技术', href: '/study/ai/datamining/visualization' },
    { title: '数据挖掘实战', description: '真实业务场景的数据挖掘项目', href: '/study/ai/datamining/practice' },
    { title: '面试题与前沿', description: '数据挖掘面试和前沿技术', href: '/study/ai/datamining/interview' }
  ];

  const learningPath = [
    {
      phase: '第一阶段：基础理论',
      description: '掌握数据挖掘基本概念和数据预处理',
      courses: [
        { name: '数据挖掘基础', href: '/study/ai/datamining/basic', duration: '50分钟' },
        { name: '数据预处理', href: '/study/ai/datamining/preprocessing', duration: '70分钟' }
      ]
    },
    {
      phase: '第二阶段：特征工程',
      description: '学习特征工程和关联规则挖掘',
      courses: [
        { name: '特征工程', href: '/study/ai/datamining/feature-engineering', duration: '80分钟' },
        { name: '关联规则挖掘', href: '/study/ai/datamining/association', duration: '60分钟' }
      ]
    },
    {
      phase: '第三阶段：核心算法',
      description: '掌握聚类、分类和异常检测算法',
      courses: [
        { name: '聚类分析', href: '/study/ai/datamining/clustering', duration: '75分钟' },
        { name: '分类与预测', href: '/study/ai/datamining/classification', duration: '85分钟' },
        { name: '异常检测', href: '/study/ai/datamining/anomaly', duration: '65分钟' }
      ]
    },
    {
      phase: '第四阶段：可视化分析',
      description: '学习数据可视化和探索性分析',
      courses: [
        { name: '数据可视化', href: '/study/ai/datamining/visualization', duration: '60分钟' }
      ]
    },
    {
      phase: '第五阶段：实战进阶',
      description: '完成项目实战，掌握前沿技术',
      courses: [
        { name: '数据挖掘实战', href: '/study/ai/datamining/practice', duration: '120分钟' },
        { name: '面试题与前沿', href: '/study/ai/datamining/interview', duration: '50分钟' }
      ]
    }
  ];

  const features = [
    { icon: <DatabaseOutlined />, title: '数据洞察', description: '从海量数据中发现有价值的模式' },
    { icon: <RocketOutlined />, title: '业务驱动', description: '解决实际业务问题的数据分析' },
    { icon: <TrophyOutlined />, title: '算法丰富', description: '涵盖监督和无监督学习算法' },
    { icon: <BookOutlined />, title: '实用性强', description: '理论与实践相结合的学习方式' }
  ];

  const careerPaths = [
    { title: '数据挖掘工程师', description: '专注数据挖掘算法和模型开发' },
    { title: '数据分析师', description: '从数据中提取商业洞察和价值' },
    { title: '商业智能分析师', description: '企业BI系统和数据报表开发' },
    { title: '数据科学家', description: '跨领域的数据科学研究和应用' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 头部介绍 */}
        <div className="text-center mb-12">
          <Title level={1} className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            数据挖掘
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
            数据挖掘是从大量数据中提取有用信息和知识的过程。通过各种算法和技术，
            发现数据中隐藏的模式、关系和趋势，为决策提供科学依据。
          </Paragraph>
          <div className="mt-8">
            <Link href="/study/ai/datamining/basic">
              <Button type="primary" size="large" className="bg-indigo-600 hover:bg-indigo-700 border-indigo-600 mr-4">
                开始学习
              </Button>
            </Link>
            <Button size="large" ghost className="border-indigo-600 text-indigo-600 hover:border-indigo-700 hover:text-indigo-700">
              了解更多
            </Button>
          </div>
        </div>

        {/* 统计数据 */}
        <Row gutter={[24, 24]} className="mb-12">
          <Col xs={24} sm={6}>
            <Card className="text-center border-indigo-200 hover:shadow-lg transition-shadow">
              <Statistic title="课程模块" value={10} suffix="个" valueStyle={{ color: '#4f46e5' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-indigo-200 hover:shadow-lg transition-shadow">
              <Statistic title="算法技术" value={40} suffix="+" valueStyle={{ color: '#4f46e5' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-indigo-200 hover:shadow-lg transition-shadow">
              <Statistic title="学习时长" value={120} suffix="小时" valueStyle={{ color: '#4f46e5' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-indigo-200 hover:shadow-lg transition-shadow">
              <Statistic title="难度等级" value={3} suffix="/5" valueStyle={{ color: '#4f46e5' }} />
            </Card>
          </Col>
        </Row>

        {/* 课程大纲 */}
        <Card className="mb-12 border-indigo-200" title={
          <span className="text-indigo-700 text-xl font-semibold flex items-center">
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
                    className="h-full border-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                    hoverable
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <Text strong className="text-indigo-700">{course.title}</Text>
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
              <Card key={phaseIndex} className="shadow-md hover:shadow-lg transition-shadow border-indigo-200">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium mr-4">
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
                        className="transition-all duration-200 bg-white hover:shadow-md border-indigo-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium text-indigo-700">{course.name}</h4>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{course.duration}</span>
                          <Button type="primary" size="small" className="bg-indigo-600 hover:bg-indigo-700 border-indigo-600">
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
        <Card className="mb-12 border-indigo-200" title={
          <span className="text-indigo-700 text-xl font-semibold">技术特色</span>
        }>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <div className="text-center">
                  <div className="text-4xl text-indigo-600 mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 职业方向 */}
        <Card className="border-indigo-200" title={
          <span className="text-indigo-700 text-xl font-semibold">职业方向</span>
        }>
          <Row gutter={[16, 16]}>
            {careerPaths.map((career, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card size="small" className="border-indigo-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center">
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