'use client';

import React from 'react';
import { Card, Row, Col, Typography, Button, Statistic, Tag, Timeline } from 'antd';
import { BookOutlined, CodeOutlined, RocketOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function RLHomePage() {
  const courses = [
    { title: '强化学习基础', description: '强化学习基本概念和理论框架', href: '/study/ai/rl/basic' },
    { title: '马尔可夫决策过程', description: 'MDP数学基础和状态转移', href: '/study/ai/rl/mdp' },
    { title: '动态规划', description: '值迭代和策略迭代算法', href: '/study/ai/rl/dynamic-programming' },
    { title: '蒙特卡洛方法', description: '基于采样的价值函数估计', href: '/study/ai/rl/monte-carlo' },
    { title: '时序差分学习', description: 'TD学习和n步引导方法', href: '/study/ai/rl/temporal-difference' },
    { title: 'Q-Learning', description: 'Q学习算法和价值函数逼近', href: '/study/ai/rl/q-learning' },
    { title: '策略梯度', description: '直接优化策略的梯度方法', href: '/study/ai/rl/policy-gradient' },
    { title: 'Actor-Critic算法', description: '结合价值和策略的混合方法', href: '/study/ai/rl/actor-critic' },
    { title: '深度强化学习', description: 'DQN、A3C、PPO等深度方法', href: '/study/ai/rl/deep-rl' },
    { title: '多智能体强化学习', description: '多智能体环境下的学习策略', href: '/study/ai/rl/multi-agent' },
    { title: '强化学习框架', description: 'OpenAI Gym、Stable Baselines', href: '/study/ai/rl/frameworks' },
    { title: '实战案例', description: '游戏AI、机器人控制等应用', href: '/study/ai/rl/cases' },
    { title: '面试题', description: '强化学习面试高频问题', href: '/study/ai/rl/interview' },
    { title: '进阶与前沿', description: '最新算法和研究方向', href: '/study/ai/rl/advanced' }
  ];

  const learningPath = [
    {
      phase: '第一阶段：理论基础',
      description: '掌握MDP和强化学习基本理论',
      courses: [
        { name: '强化学习基础', href: '/study/ai/rl/basic', duration: '45分钟' },
        { name: '马尔可夫决策过程', href: '/study/ai/rl/mdp', duration: '50分钟' },
        { name: '动态规划', href: '/study/ai/rl/dynamic-programming', duration: '40分钟' }
      ]
    },
    {
      phase: '第二阶段：经典算法',
      description: '学习经典强化学习算法',
      courses: [
        { name: '蒙特卡洛方法', href: '/study/ai/rl/monte-carlo', duration: '45分钟' },
        { name: '时序差分学习', href: '/study/ai/rl/temporal-difference', duration: '50分钟' },
        { name: 'Q-Learning', href: '/study/ai/rl/q-learning', duration: '55分钟' }
      ]
    },
    {
      phase: '第三阶段：策略方法',
      description: '深入理解策略优化方法',
      courses: [
        { name: '策略梯度', href: '/study/ai/rl/policy-gradient', duration: '60分钟' },
        { name: 'Actor-Critic算法', href: '/study/ai/rl/actor-critic', duration: '65分钟' }
      ]
    },
    {
      phase: '第四阶段：深度强化学习',
      description: '掌握深度强化学习方法和技巧',
      courses: [
        { name: '深度强化学习', href: '/study/ai/rl/deep-rl', duration: '90分钟' },
        { name: '多智能体强化学习', href: '/study/ai/rl/multi-agent', duration: '70分钟' },
        { name: '强化学习框架', href: '/study/ai/rl/frameworks', duration: '40分钟' }
      ]
    },
    {
      phase: '第五阶段：实战应用',
      description: '游戏、机器人等实际应用和前沿研究',
      courses: [
        { name: '强化学习实战', href: '/study/ai/rl/cases', duration: '120分钟' },
        { name: '强化学习面试题', href: '/study/ai/rl/interview', duration: '45分钟' },
        { name: '进阶与前沿', href: '/study/ai/rl/advanced', duration: '60分钟' }
      ]
    }
  ];

  const features = [
    { icon: <CodeOutlined />, title: '自主学习', description: '智能体通过试错自主学习策略' },
    { icon: <RocketOutlined />, title: '延迟奖励', description: '处理长期目标和延迟反馈' },
    { icon: <TrophyOutlined />, title: '决策优化', description: '在不确定环境中做出最优决策' },
    { icon: <BookOutlined />, title: '通用框架', description: '适用于各种序列决策问题' }
  ];

  const careerPaths = [
    { title: '强化学习研究员', description: '专注强化学习算法研究和创新' },
    { title: '游戏AI工程师', description: '开发智能游戏AI和策略算法' },
    { title: '机器人算法工程师', description: '机器人控制和自主导航算法' },
    { title: '量化交易工程师', description: '金融市场的算法交易策略' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 头部介绍 */}
        <div className="text-center mb-12">
          <Title level={1} className="mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            强化学习
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
            强化学习是机器学习的重要分支，通过智能体与环境的交互学习最优策略。
            它在游戏AI、机器人控制、自动驾驶等领域展现出强大的能力，是实现通用人工智能的重要途径。
          </Paragraph>
          <div className="mt-8">
            <Link href="/study/ai/rl/basic">
              <Button type="primary" size="large" className="bg-red-600 hover:bg-red-700 border-red-600 mr-4">
                开始学习
              </Button>
            </Link>
            <Button size="large" ghost className="border-red-600 text-red-600 hover:border-red-700 hover:text-red-700">
              了解更多
            </Button>
          </div>
        </div>

        {/* 统计数据 */}
        <Row gutter={[24, 24]} className="mb-12">
          <Col xs={24} sm={6}>
            <Card className="text-center border-red-200 hover:shadow-lg transition-shadow">
              <Statistic title="课程模块" value={14} suffix="个" valueStyle={{ color: '#dc2626' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-red-200 hover:shadow-lg transition-shadow">
              <Statistic title="算法数量" value={25} suffix="+" valueStyle={{ color: '#dc2626' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-red-200 hover:shadow-lg transition-shadow">
              <Statistic title="学习时长" value={180} suffix="小时" valueStyle={{ color: '#dc2626' }} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center border-red-200 hover:shadow-lg transition-shadow">
              <Statistic title="难度等级" value={5} suffix="/5" valueStyle={{ color: '#dc2626' }} />
            </Card>
          </Col>
        </Row>

        {/* 课程大纲 */}
        <Card className="mb-12 border-red-200" title={
          <span className="text-red-700 text-xl font-semibold flex items-center">
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
                    className="h-full border-red-100 hover:border-red-300 hover:shadow-md transition-all cursor-pointer"
                    hoverable
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-red-100 text-red-600 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <Text strong className="text-red-700">{course.title}</Text>
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
              <Card key={phaseIndex} className="shadow-md hover:shadow-lg transition-shadow border-red-200">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium mr-4">
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
                        className="transition-all duration-200 bg-white hover:shadow-md border-red-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium text-red-700">{course.name}</h4>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{course.duration}</span>
                          <Button type="primary" size="small" className="bg-red-600 hover:bg-red-700 border-red-600">
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
        <Card className="mb-12 border-red-200" title={
          <span className="text-red-700 text-xl font-semibold flex items-center">
            <TrophyOutlined className="mr-2" />
            学科特色
          </span>
        }>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <div className="text-center">
                  <div className="text-red-600 text-4xl mb-4">{feature.icon}</div>
                  <Title level={4} className="text-red-700">{feature.title}</Title>
                  <Paragraph className="text-gray-600">{feature.description}</Paragraph>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 职业发展 */}
        <Card className="mb-12 border-red-200" title={
          <span className="text-red-700 text-xl font-semibold flex items-center">
            <UserOutlined className="mr-2" />
            职业发展方向
          </span>
        }>
          <Row gutter={[16, 16]}>
            {careerPaths.map((career, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card size="small" className="border-red-100 hover:border-red-300 transition-colors">
                  <Text strong className="text-red-700">{career.title}</Text>
                  <div className="text-gray-600 mt-2">{career.description}</div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 学习建议 */}
        <Card className="border-red-200" title={
          <span className="text-red-700 text-xl font-semibold">
            学习建议
          </span>
        }>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Title level={4} className="text-red-700">📚 学习方法</Title>
              <ul className="text-gray-600 space-y-2">
                <li>• 重视数学基础，特别是概率论和优化</li>
                <li>• 从简单环境开始，逐步挑战复杂任务</li>
                <li>• 多做编程实验，观察智能体学习过程</li>
                <li>• 理解探索与利用的平衡原理</li>
              </ul>
            </Col>
            <Col xs={24} lg={12}>
              <Title level={4} className="text-red-700">🎯 重点关注</Title>
              <ul className="text-gray-600 space-y-2">
                <li>• 深刻理解MDP和贝尔曼方程</li>
                <li>• 掌握价值函数和策略梯度方法</li>
                <li>• 学会设计奖励函数和环境建模</li>
                <li>• 关注样本效率和稳定性问题</li>
              </ul>
            </Col>
          </Row>
          <div className="mt-8 p-6 bg-red-50 rounded-lg">
            <Text className="text-red-700 font-medium">
              💡 小贴士：强化学习的学习曲线较陡峭，需要耐心和坚持。建议先掌握理论基础，
              再通过简单的游戏环境练习，逐步理解智能体的学习过程。
            </Text>
          </div>
          <div className="mt-6 text-center">
            <Link href="/study/ai/rl/basic">
              <Button type="primary" size="large" className="bg-red-600 hover:bg-red-700 border-red-600">
                立即开始学习之旅
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
} 