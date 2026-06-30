'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '智能机器人', chapterTitle: '机器人面试题', chapterNumber: 11, totalChapters: 12,
  subjectHref: '/study/ai/robot',
  prevChapter: { label: '机器人实战', href: '/study/ai/robot/cases' },
  nextChapter: { label: '进阶与前沿', href: '/study/ai/robot/advanced' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: '基础知识', left: (<div className="space-y-4"><PageTitle>基础知识</PageTitle><SectionTitle>1. DH参数法的意义？</SectionTitle><BookParagraph>DH参数使用四个参数（θ, d, a, α）描述相邻连杆的相对位姿，标准化机器人运动学建模过程。</BookParagraph><SectionTitle>2. 正逆运动学的区别？</SectionTitle><BookParagraph>正运动学已知关节角求末端位姿，解唯一；逆运动学已知位姿求关节角，解不唯一。</BookParagraph></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '算法题', left: (<div className="space-y-4"><PageTitle>算法题</PageTitle><SectionTitle>1. 实现PID控制器</SectionTitle><BookCode language="python" code={`class PID:\n    def __init__(self, kp, ki, kd):\n        self.kp=kp; self.ki=ki; self.kd=kd\n        self.prev_error=0; self.integral=0\n    def compute(self, target, current, dt):\n        error = target - current\n        self.integral += error * dt\n        derivative = (error - self.prev_error) / dt\n        self.prev_error = error\n        return self.kp*error + self.ki*self.integral + self.kd*derivative`} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '系统设计', left: (<div className="space-y-4"><PageTitle>系统设计</PageTitle><SectionTitle>设计一个室内配送机器人系统</SectionTitle><BookParagraph>硬件：激光雷达+IMU+轮式底盘+工控机。软件：ROS2框架，Cartographer建图，AMCL定位，Nav2导航，DWA规划。流程：建图→定位→路径规划→运动控制→避障。</BookParagraph></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '项目经验', left: (<div className="space-y-4"><PageTitle>项目经验</PageTitle><SectionTitle>常见问题</SectionTitle><BookList items={['SLAM建图漂移：闭环检测优化','定位丢失：重定位策略','路径堵塞：动态重规划','控制抖动：参数整定']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RobotInterviewPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
