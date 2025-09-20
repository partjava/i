'use client';

import React from 'react';
import { Card, Row, Col, Typography, Button, Statistic } from 'antd';
import { BookOutlined, CodeOutlined, RocketOutlined, TrophyOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function CVHomePage() {
  const courses = [
    { title: '计算机视觉基础', description: 'CV基本概念、历史和应用领域', href: '/study/ai/cv/basic' },
    { title: '图像处理基础', description: '图像滤波、增强、变换等基础操作', href: '/study/ai/cv/image-processing' },
    { title: '特征提取与匹配', description: 'SIFT、SURF、ORB等特征检测算法', href: '/study/ai/cv/feature-extraction' },
    { title: '目标检测', description: 'YOLO、R-CNN等目标检测算法', href: '/study/ai/cv/object-detection' },
    { title: '图像分割', description: '语义分割、实例分割等分割技术', href: '/study/ai/cv/image-segmentation' },
    { title: '人脸识别', description: '人脸检测、识别和验证技术', href: '/study/ai/cv/face-recognition' },
    { title: '姿态估计', description: '人体姿态估计和动作识别', href: '/study/ai/cv/pose-estimation' },
    { title: '视频分析', description: '视频目标跟踪和行为识别', href: '/study/ai/cv/video-analysis' },
    { title: '3D视觉', description: '立体视觉、SLAM等3D技术', href: '/study/ai/cv/3d-vision' },
    { title: '视觉框架与工具', description: 'OpenCV、PyTorch Vision等工具', href: '/study/ai/cv/frameworks' },
    { title: '计算机视觉实战', description: '真实项目的CV应用开发', href: '/study/ai/cv/cases' },
    { title: '计算机视觉面试题', description: 'CV面试高频问题解析', href: '/study/ai/cv/interview' },
    { title: '进阶与前沿', description: '最新研究动态和前沿技术', href: '/study/ai/cv/advanced' }
  ];

  const learningPath = [
    {
      phase: '第一阶段：基础入门',
      description: '掌握计算机视觉基础理论和图像处理',
      courses: [
        { name: '计算机视觉基础', href: '/study/ai/cv/basic', duration: '45分钟' },
        { name: '图像处理基础', href: '/study/ai/cv/image-processing', duration: '60分钟' }
      ]
    },
    {
      phase: '第二阶段：特征学习',
      description: '学习图像特征提取和匹配技术',
      courses: [
        { name: '特征提取与匹配', href: '/study/ai/cv/feature-extraction', duration: '70分钟' },
        { name: '视觉框架与工具', href: '/study/ai/cv/frameworks', duration: '50分钟' }
      ]
    },
    {
      phase: '第三阶段：核心算法',
      description: '掌握主流的计算机视觉算法',
      courses: [
        { name: '目标检测', href: '/study/ai/cv/object-detection', duration: '90分钟' },
        { name: '图像分割', href: '/study/ai/cv/image-segmentation', duration: '80分钟' },
        { name: '人脸识别', href: '/study/ai/cv/face-recognition', duration: '70分钟' }
      ]
    },
    {
      phase: '第四阶段：高级应用',
      description: '学习复杂的视觉分析技术',
      courses: [
        { name: '姿态估计', href: '/study/ai/cv/pose-estimation', duration: '75分钟' },
        { name: '视频分析', href: '/study/ai/cv/video-analysis', duration: '85分钟' },
        { name: '3D视觉', href: '/study/ai/cv/3d-vision', duration: '100分钟' }
      ]
    },
    {
      phase: '第五阶段：实战进阶',
      description: '完成项目实战，掌握前沿技术',
      courses: [
        { name: '计算机视觉实战', href: '/study/ai/cv/cases', duration: '120分钟' },
        { name: '计算机视觉面试题', href: '/study/ai/cv/interview', duration: '50分钟' },
        { name: '进阶与前沿', href: '/study/ai/cv/advanced', duration: '70分钟' }
      ]
    }
  ];

  const features = [
    { icon: <EyeOutlined />, title: '视觉感知', description: '让机器拥有人类般的视觉能力' },
    { icon: <RocketOutlined />, title: '应用丰富', description: '自动驾驶、医疗影像、安防监控' },
    { icon: <TrophyOutlined />, title: '技术成熟', description: '深度学习推动CV技术快速发展' },
    { icon: <BookOutlined />, title: '理论完善', description: '从传统算法到深度网络全覆盖' }
  ];

  const careerPaths = [
    { title: '计算机视觉工程师', description: '专注图像识别和视觉算法开发' },
    { title: '自动驾驶工程师', description: '开发自动驾驶视觉感知系统' },
    { title: '医疗影像算法工程师', description: '医疗图像分析和诊断系统' },
    { title: '机器人视觉工程师', description: '机器人视觉导航和操作系统' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 头部介绍 */}
        <div className="text-center mb-12">
          <Title level={1} className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            计算机视觉
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
            计算机视觉让机器拥有"看见"和"理解"图像的能力，是人工智能最重要的分支之一。
            从图像识别到自动驾驶，CV技术正在重塑我们的世界。
          </Paragraph>
          <div className="mt-8">
            <Link href="/study/ai/cv/basic">
              <Button type="primary" size="large" className="bg-purple-600 hover:bg-purple-700 border-purple-600 mr-4">
                开始学习
              </Button>
            </Link>
            <Button size="large" ghost className="border-purple-600 text-purple-600 hover:border-purple-700 hover:text-purple-700">
              了解更多
            </Button>
          </div>
        </div>

        {/* 统计数据 */}
        <Row gutter={[24, 24]} className="mb-12">
          <Col xs={24} sm={6}>
            <Card className="text-center border-purple-200 hover:shadow-lg transition-shadow">
              <Statistic title="课程模块" value={13} suffix="个" valueStyle={{ color: '#9333ea' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-purple-200 hover:shadow-lg transition-shadow">
              <Statistic title="算法技术" value={60} suffix="+" valueStyle={{ color: '#9333ea' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-purple-200 hover:shadow-lg transition-shadow">
              <Statistic title="学习时长" value={200} suffix="小时" valueStyle={{ color: '#9333ea' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-purple-200 hover:shadow-lg transition-shadow">
              <Statistic title="难度等级" value={4} suffix="/5" valueStyle={{ color: '#9333ea' }} />
            </Card>
          </Col>
        </Row>

        {/* 课程大纲 */}
        <Card className="mb-12 border-purple-200" title={
          <span className="text-purple-700 text-xl font-semibold flex items-center">
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
                    className="h-full border-purple-100 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer"
                    hoverable
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <Text strong className="text-purple-700">{course.title}</Text>
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
              <Card key={phaseIndex} className="shadow-md hover:shadow-lg transition-shadow border-purple-200">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium mr-4">
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
                        className="transition-all duration-200 bg-white hover:shadow-md border-purple-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium text-purple-700">{course.name}</h4>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{course.duration}</span>
                          <Button type="primary" size="small" className="bg-purple-600 hover:bg-purple-700 border-purple-600">
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
        <Card className="mb-12 border-purple-200" title={
          <span className="text-purple-700 text-xl font-semibold">技术特色</span>
        }>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <div className="text-center">
                  <div className="text-4xl text-purple-600 mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 职业方向 */}
        <Card className="border-purple-200" title={
          <span className="text-purple-700 text-xl font-semibold">职业方向</span>
        }>
          <Row gutter={[16, 16]}>
            {careerPaths.map((career, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card size="small" className="border-purple-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
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