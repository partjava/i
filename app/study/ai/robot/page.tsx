'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'

const CHAPTERS = [
  { number: 1, title: '机器人学基础', description: '机器人概念、分类和发展历史', href: '/study/ai/robot/basic' },
  { number: 2, title: '运动学与动力学', description: '机器人运动建模和动力学分析', href: '/study/ai/robot/kinematics' },
  { number: 3, title: '路径规划', description: '全局和局部路径规划算法', href: '/study/ai/robot/path-planning' },
  { number: 4, title: '机器人控制', description: 'PID控制、自适应控制等控制方法', href: '/study/ai/robot/control' },
  { number: 5, title: '传感器与感知', description: '激光雷达、视觉、IMU等传感器', href: '/study/ai/robot/sensors' },
  { number: 6, title: '机器人操作系统', description: 'ROS框架和机器人软件开发', href: '/study/ai/robot/ros' },
  { number: 7, title: '机器人视觉', description: '视觉SLAM和物体识别', href: '/study/ai/robot/vision' },
  { number: 8, title: '机器人导航', description: '自主导航和定位技术', href: '/study/ai/robot/navigation' },
  { number: 9, title: '人机交互', description: '语音交互和自然交互技术', href: '/study/ai/robot/hci' },
  { number: 10, title: '机器人实战', description: '完整机器人项目开发', href: '/study/ai/robot/cases' },
  { number: 11, title: '机器人面试题', description: '机器人算法面试高频问题', href: '/study/ai/robot/interview' },
  { number: 12, title: '进阶与前沿', description: '最新技术发展和研究方向', href: '/study/ai/robot/advanced' },
]

export default function RobotHomePage() {
  return (
    <div className="space-y-8">
      <BookCover
        title="智能机器人"
        subtitle="Intelligent Robotics"
        description="机器人学是研究机器人的设计、制造和应用的综合学科。从工业机械臂到自主移动机器人，机器人技术正在深刻改变生产和生活方式。"
        chapterCount={CHAPTERS.length}
        totalHours={180}
        chapters={CHAPTERS}
        icon="🤖"
        startHref="/study/ai/robot/basic"
        theme={THEMES.ai}
      />
    </div>
  )
}
