'use client';

import React from 'react';
import { Card, Row, Col, Typography, Button, Statistic, Tag } from 'antd';
import { BookOutlined, CodeOutlined, RocketOutlined, TrophyOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function NLPHomePage() {
  const courses = [
    { title: 'NLP基础', description: '自然语言处理基本概念和原理', href: '/study/ai/nlp/basic' },
    { title: '文本预处理', description: '文本清洗、分词、标注等预处理技术', href: '/study/ai/nlp/preprocessing' },
    { title: '词向量与词嵌入', description: 'Word2Vec、GloVe、FastText等词向量技术', href: '/study/ai/nlp/word-embeddings' },
    { title: '文本分类', description: '情感分析、主题分类等文本分类任务', href: '/study/ai/nlp/text-classification' },
    { title: '命名实体识别', description: 'NER任务及其实现方法', href: '/study/ai/nlp/ner' },
    { title: '机器翻译', description: '统计机器翻译和神经机器翻译', href: '/study/ai/nlp/machine-translation' },
    { title: '文本生成', description: '自动文本生成和语言模型', href: '/study/ai/nlp/text-generation' },
    { title: '情感分析', description: '情感分析技术和应用', href: '/study/ai/nlp/sentiment-analysis' },
    { title: '问答系统', description: '智能问答系统设计与实现', href: '/study/ai/nlp/qa' },
    { title: '对话系统', description: '聊天机器人和对话管理', href: '/study/ai/nlp/dialogue' },
    { title: 'NLP框架与工具', description: 'spaCy、NLTK、Transformers等工具', href: '/study/ai/nlp/frameworks' },
    { title: 'NLP实战案例', description: '真实业务场景的NLP应用', href: '/study/ai/nlp/cases' },
    { title: 'NLP面试题', description: 'NLP面试高频问题', href: '/study/ai/nlp/interview' },
    { title: '进阶与前沿', description: '最新技术发展和研究方向', href: '/study/ai/nlp/advanced' }
  ];

  const learningPath = [
    {
      phase: '第一阶段：基础入门',
      description: '掌握NLP基本概念和文本处理技术',
      courses: [
        { name: 'NLP基础', href: '/study/ai/nlp/basic', duration: '40分钟' },
        { name: '文本预处理', href: '/study/ai/nlp/preprocessing', duration: '45分钟' }
      ]
    },
    {
      phase: '第二阶段：核心技术',
      description: '学习词向量和基础NLP任务',
      courses: [
        { name: '词向量与词嵌入', href: '/study/ai/nlp/word-embeddings', duration: '50分钟' },
        { name: '文本分类', href: '/study/ai/nlp/text-classification', duration: '60分钟' },
        { name: '命名实体识别', href: '/study/ai/nlp/ner', duration: '45分钟' }
      ]
    },
    {
      phase: '第三阶段：高级应用',
      description: '掌握复杂NLP任务和生成技术',
      courses: [
        { name: '机器翻译', href: '/study/ai/nlp/machine-translation', duration: '70分钟' },
        { name: '文本生成', href: '/study/ai/nlp/text-generation', duration: '60分钟' },
        { name: '情感分析', href: '/study/ai/nlp/sentiment-analysis', duration: '40分钟' }
      ]
    },
    {
      phase: '第四阶段：系统开发',
      description: '构建完整的NLP应用系统',
      courses: [
        { name: '问答系统', href: '/study/ai/nlp/qa', duration: '80分钟' },
        { name: '对话系统', href: '/study/ai/nlp/dialogue', duration: '90分钟' },
        { name: 'NLP框架与工具', href: '/study/ai/nlp/frameworks', duration: '50分钟' }
      ]
    },
    {
      phase: '第五阶段：实战进阶',
      description: '完成项目实战，掌握前沿技术',
      courses: [
        { name: 'NLP实战案例', href: '/study/ai/nlp/cases', duration: '100分钟' },
        { name: 'NLP面试题', href: '/study/ai/nlp/interview', duration: '45分钟' },
        { name: '进阶与前沿', href: '/study/ai/nlp/advanced', duration: '60分钟' }
      ]
    }
  ];

  const features = [
    { icon: <MessageOutlined />, title: '语言理解', description: '让机器理解人类语言的含义' },
    { icon: <RocketOutlined />, title: '应用广泛', description: '搜索、翻译、客服等各个领域' },
    { icon: <TrophyOutlined />, title: '前景广阔', description: 'ChatGPT引领的AI语言革命' },
    { icon: <BookOutlined />, title: '技术丰富', description: '从传统方法到深度学习全覆盖' }
  ];

  const careerPaths = [
    { title: 'NLP算法工程师', description: '专注自然语言处理算法研发' },
    { title: '对话系统工程师', description: '开发智能客服和聊天机器人' },
    { title: '文本挖掘工程师', description: '从文本数据中挖掘有价值信息' },
    { title: 'AI产品经理', description: '规划和管理NLP相关产品' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 头部介绍 */}
        <div className="text-center mb-12">
          <Title level={1} className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            自然语言处理
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
            自然语言处理（NLP）让计算机理解和生成人类语言，是人工智能最具挑战性的领域之一。
            从机器翻译到智能对话，NLP技术正在改变我们与机器交互的方式。
          </Paragraph>
          <div className="mt-8">
            <Link href="/study/ai/nlp/basic">
              <Button type="primary" size="large" className="bg-blue-600 hover:bg-blue-700 border-blue-600 mr-4">
                开始学习
              </Button>
            </Link>
            <Button size="large" ghost className="border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700">
              了解更多
            </Button>
          </div>
        </div>

        {/* 统计数据 */}
        <Row gutter={[24, 24]} className="mb-12">
          <Col xs={24} sm={6}>
            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
              <Statistic title="课程模块" value={14} suffix="个" valueStyle={{ color: '#2563eb' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
              <Statistic title="技术点" value={80} suffix="+" valueStyle={{ color: '#2563eb' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
              <Statistic title="学习时长" value={180} suffix="小时" valueStyle={{ color: '#2563eb' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
              <Statistic title="难度等级" value={4} suffix="/5" valueStyle={{ color: '#2563eb' }} />
            </Card>
          </Col>
        </Row>

        {/* 课程大纲 */}
        <Card className="mb-12 border-blue-200" title={
          <span className="text-blue-700 text-xl font-semibold flex items-center">
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
                    className="h-full border-blue-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                    hoverable
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <Text strong className="text-blue-700">{course.title}</Text>
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
              <Card key={phaseIndex} className="shadow-md hover:shadow-lg transition-shadow border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mr-4">
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
                        className="transition-all duration-200 bg-white hover:shadow-md border-blue-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium text-blue-700">{course.name}</h4>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{course.duration}</span>
                          <Button type="primary" size="small" className="bg-blue-600 hover:bg-blue-700 border-blue-600">
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
        <Card className="mb-12 border-blue-200" title={
          <span className="text-blue-700 text-xl font-semibold">技术特色</span>
        }>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <div className="text-center">
                  <div className="text-4xl text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 职业方向 */}
        <Card className="border-blue-200" title={
          <span className="text-blue-700 text-xl font-semibold">职业方向</span>
        }>
          <Row gutter={[16, 16]}>
            {careerPaths.map((career, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card size="small" className="border-blue-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
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