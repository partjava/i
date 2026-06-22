'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const pidCode = `class PID:
    def __init__(self, kp, ki, kd):
        self.kp=kp; self.ki=ki; self.kd=kd
        self.prev_err=0; self.integral=0
    def compute(self, target, current, dt):
        err = target - current
        self.integral += err * dt
        deriv = (err - self.prev_err) / dt
        self.prev_err = err
        return self.kp*err + self.ki*self.integral + self.kd*deriv`

const META: LessonMeta = {
  subject: '智能机器人', chapterTitle: '机器人控制', chapterNumber: 4, totalChapters: 12,
  subjectHref: '/study/ai/robot',
  prevChapter: { label: '路径规划', href: '/study/ai/robot/path-planning' },
  nextChapter: { label: '传感器与感知', href: '/study/ai/robot/sensors' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: '基础控制', left: (<div className="space-y-4"><PageTitle>基础控制</PageTitle><SectionTitle>PID控制</SectionTitle><BookParagraph>比例P减少当前误差，积分I消除稳态误差，微分D抑制振荡抑制。参数整定常用Ziegler-Nichols法或试凑法。</BookParagraph><SectionTitle>计算力矩控制</SectionTitle><BookParagraph>基于动力学模型的前馈+反馈控制系统。通过逆动力学计算驱动力矩，实现精确轨迹跟踪。对模型精度要求高。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>PID实现</SectionTitle><BookCode language="python" code={pidCode} /></div>) },
  { label: '高级控制', left: (<div className="space-y-4"><PageTitle>高级控制</PageTitle><SectionTitle>自适应控制</SectionTitle><BookParagraph>实时估计动力学参数，在线调整控制器参数。适应负载变化、摩擦变化等不确定因素。模型参考自适应控制(MRAC)是常用方法。</BookParagraph><SectionTitle>鲁棒控制</SectionTitle><BookParagraph>针对模型不确定性和外部扰动设计控制器。H∞控制通过最小化扰动到输出的传递函数提高鲁棒性。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>阻抗控制</SectionTitle><BookParagraph>调节机器人末端力与位置之间的动态关系（质量-阻尼-刚度），实现柔顺交互。适用于装配、打磨等力控场景。</BookParagraph></div>) },
  { label: '实际应用', left: (<div className="space-y-4"><PageTitle>实际应用</PageTitle><BookList items={['工业机械臂：轨迹跟踪、力控装配','移动机器人：轮式/履带运动控制','无人机：姿态控制、位置控制','人形机器人：步态控制、平衡控制']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RobotControlPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
