'use client';

import React from 'react';
import { Card, Row, Col, Typography, Button, Statistic } from 'antd';
import { BookOutlined, CodeOutlined, RocketOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function DLHomePage() {
  const courses = [
    { title: '深度学习基础', description: '深度学习原理、发展历史和基础概念', href: '/study/ai/dl/basic' },
    { title: '神经网络基础', description: '感知机、多层神经网络、反向传播', href: '/study/ai/dl/neural-networks' },
    { title: '卷积神经网络', description: 'CNN结构、卷积层、池化层应用', href: '/study/ai/dl/cnn' },
    { title: '循环神经网络', description: 'RNN、LSTM、GRU时序建模', href: '/study/ai/dl/rnn' },
    { title: '注意力机制', description: 'Attention机制原理和应用', href: '/study/ai/dl/attention' },
    { title: 'Transformer架构', description: 'Transformer模型结构和原理', href: '/study/ai/dl/transformer' },
    { title: '生成对抗网络', description: 'GAN原理、变种和应用场景', href: '/study/ai/dl/gan' },
    { title: '自编码器', description: 'AutoEncoder、VAE降维和生成', href: '/study/ai/dl/autoencoder' },
    { title: '迁移学习', description: '预训练模型、微调和领域适应', href: '/study/ai/dl/transfer-learning' },
    { title: '深度学习框架', description: 'PyTorch、TensorFlow实战', href: '/study/ai/dl/frameworks' },
    { title: '模型压缩与优化', description: '模型剪枝、量化、蒸馏技术', href: '/study/ai/dl/optimization' },
    { title: '实战案例', description: '图像、语音、文本等实际项目', href: '/study/ai/dl/cases' },
    { title: '面试题', description: '深度学习面试高频问题', href: '/study/ai/dl/interview' },
    { title: '进阶与前沿', description: '最新技术发展和研究前沿', href: '/study/ai/dl/advanced' }
  ];

  const learningPath = [
    {
      phase: '第一阶段：基础理论',
      description: '掌握神经网络基本原理和数学基础',
      courses: [
        { name: '深度学习基础', href: '/study/ai/dl/basic', duration: '50分钟' },
        { name: '神经网络基础', href: '/study/ai/dl/neural-networks', duration: '60分钟' }
      ]
    },
    {
      phase: '第二阶段：核心架构',
      description: '学习各种神经网络架构和应用',
      courses: [
        { name: '卷积神经网络', href: '/study/ai/dl/cnn', duration: '70分钟' },
        { name: '循环神经网络', href: '/study/ai/dl/rnn', duration: '65分钟' },
        { name: '注意力机制', href: '/study/ai/dl/attention', duration: '60分钟' }
      ]
    },
    {
      phase: '第三阶段：前沿技术',
      description: '掌握最新的深度学习技术',
      courses: [
        { name: 'Transformer架构', href: '/study/ai/dl/transformer', duration: '80分钟' },
        { name: '生成对抗网络', href: '/study/ai/dl/gan', duration: '75分钟' },
        { name: '自编码器', href: '/study/ai/dl/autoencoder', duration: '55分钟' }
      ]
    },
    {
      phase: '第四阶段：实战应用',
      description: '掌握深度学习框架实战技能',
      courses: [
        { name: '迁移学习', href: '/study/ai/dl/transfer-learning', duration: '65分钟' },
        { name: '深度学习框架', href: '/study/ai/dl/frameworks', duration: '90分钟' },
        { name: '模型压缩与优化', href: '/study/ai/dl/optimization', duration: '70分钟' }
      ]
    },
    {
      phase: '第五阶段：进阶提升',
      description: '完成实际项目和前沿技术探索',
      courses: [
        { name: '实战案例', href: '/study/ai/dl/cases', duration: '120分钟' },
        { name: '面试题', href: '/study/ai/dl/interview', duration: '50分钟' },
        { name: '进阶与前沿', href: '/study/ai/dl/advanced', duration: '80分钟' }
      ]
    }
  ];

  const features = [
    { icon: <CodeOutlined />, title: '表征学习', description: '自动学习数据的高级表征' },
    { icon: <RocketOutlined />, title: '端到端', description: '从原始数据到最终输出的统一建模' },
    { icon: <TrophyOutlined />, title: '性能卓越', description: '在多个任务上达到人类水平' },
    { icon: <BookOutlined />, title: '应用广泛', description: '计算机视觉、NLP、语音等领域' }
  ];

  const careerPaths = [
    { title: '深度学习工程师', description: '专注深度学习算法研发和应用' },
    { title: '计算机视觉工程师', description: '图像识别、目标检测等视觉任务' },
    { title: 'NLP算法工程师', description: '自然语言处理和理解技术' },
    { title: 'AI研究员', description: '前沿深度学习技术研究' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 头部介绍 */}
        <div className="text-center mb-12">
          <Title level={1} className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            深度学习
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
            深度学习是机器学习的重要分支，通过多层神经网络模拟人脑学习过程。
            它在图像识别、自然语言处理、语音识别等领域取得了突破性进展，是现代AI的核心技术。
          </Paragraph>
          <div className="mt-8">
            <Link href="/study/ai/dl/basic">
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
              <Statistic title="课程模块" value={14} suffix="个" valueStyle={{ color: '#4f46e5' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-indigo-200 hover:shadow-lg transition-shadow">
              <Statistic title="网络架构" value={30} suffix="+" valueStyle={{ color: '#4f46e5' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-indigo-200 hover:shadow-lg transition-shadow">
              <Statistic title="学习时长" value={200} suffix="小时" valueStyle={{ color: '#4f46e5' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-indigo-200 hover:shadow-lg transition-shadow">
              <Statistic title="难度等级" value={5} suffix="/5" valueStyle={{ color: '#4f46e5' }} />
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

        {/* 核心特色 */}
        <Card className="mb-12 border-indigo-200" title={
          <span className="text-indigo-700 text-xl font-semibold flex items-center">
            <TrophyOutlined className="mr-2" />
            学科特色
          </span>
        }>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <div className="text-center">
                  <div className="text-indigo-600 text-4xl mb-4">{feature.icon}</div>
                  <Title level={4} className="text-indigo-700">{feature.title}</Title>
                  <Paragraph className="text-gray-600">{feature.description}</Paragraph>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 职业发展 */}
        <Card className="mb-12 border-indigo-200" title={
          <span className="text-indigo-700 text-xl font-semibold flex items-center">
            <UserOutlined className="mr-2" />
            职业发展方向
          </span>
        }>
          <Row gutter={[16, 16]}>
            {careerPaths.map((career, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card size="small" className="border-indigo-100 hover:border-indigo-300 transition-colors">
                  <Text strong className="text-indigo-700">{career.title}</Text>
                  <div className="text-gray-600 mt-2">{career.description}</div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 学习建议 */}
        <Card className="border-indigo-200" title={
          <span className="text-indigo-700 text-xl font-semibold">
            学习建议
          </span>
        }>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Title level={4} className="text-indigo-700">📚 学习方法</Title>
              <ul className="text-gray-600 space-y-2">
                <li>• 扎实掌握线性代数和微积分基础</li>
                <li>• 从简单网络开始，逐步学习复杂架构</li>
                <li>• 多动手实践，熟练使用深度学习框架</li>
                <li>• 关注最新论文和技术发展</li>
              </ul>
            </Col>
            <Col xs={24} lg={12}>
              <Title level={4} className="text-indigo-700">🎯 重点关注</Title>
              <ul className="text-gray-600 space-y-2">
                <li>• 理解反向传播和梯度下降原理</li>
                <li>• 掌握CNN、RNN、Transformer架构</li>
                <li>• 学会调参技巧和正则化方法</li>
                <li>• 关注模型解释性和伦理问题</li>
              </ul>
            </Col>
          </Row>
          <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
            <Text className="text-indigo-700 font-medium">
              💡 小贴士：深度学习需要大量的计算资源和数据，建议先从小规模问题开始练习，
              逐步积累经验。同时要保持对新技术的敏感度，这是一个快速发展的领域。
            </Text>
          </div>
          <div className="mt-6 text-center">
            <Link href="/study/ai/dl/basic">
              <Button type="primary" size="large" className="bg-indigo-600 hover:bg-indigo-700 border-indigo-600">
                立即开始学习之旅
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
} 