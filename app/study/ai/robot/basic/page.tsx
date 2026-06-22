'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '智能机器人', chapterTitle: '机器人学基础', chapterNumber: 1, totalChapters: 12,
  subjectHref: '/study/ai/robot',
  nextChapter: { label: '运动学与动力学', href: '/study/ai/robot/kinematics' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>机器人学概述</PageTitle><BookParagraph>机器人学是研究机器人设计、制造、控制和应用的科学与技术。它融合了机械工程、电子工程、计算机科学、控制理论、人工智能等多个学科的知识。</BookParagraph><SectionTitle>机器人的基本组成</SectionTitle><BookList items={['机械本体：机器人的物理结构','驱动系统：电机、液压、气动等','传感系统：内外部传感器','控制系统：控制器和算法','交互系统：人机交互界面']} /><SectionTitle>应用领域</SectionTitle><BookList items={['工业制造：焊接、装配、搬运','医疗健康：手术机器人、康复机器人','服务领域：清洁、配送、导览','特种作业：勘探、救援、军事']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>正运动学示例</SectionTitle><BookCode language="python" code={`import numpy as np\ndef fk(theta1, theta2, l1, l2):\n    x = l1*np.cos(theta1) + l2*np.cos(theta1+theta2)\n    y = l1*np.sin(theta1) + l2*np.sin(theta1+theta2)\n    return x, y\n\n# 示例：计算关节角30°, 45°时的末端位置\nprint(fk(np.radians(30), np.radians(45), 1.0, 0.8))`} /></div>),
  },
  {
    label: '运动学基础', left: (<div className="space-y-4"><PageTitle>运动学基础</PageTitle><SectionTitle>正运动学</SectionTitle><BookParagraph>已知关节角度，计算末端执行器的位置和姿态。使用齐次变换矩阵和DH参数法进行建模。</BookParagraph><SectionTitle>逆运动学</SectionTitle><BookParagraph>已知末端执行器的目标位姿，求解各关节的角度。存在多解、奇异解等问题，常用数值解法。</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>雅可比矩阵</SectionTitle><BookParagraph>描述关节速度与末端速度之间的映射关系，用于运动控制和力控制。</BookParagraph></div>),
  },
  {
    label: '动力学基础', left: (<div className="space-y-4"><PageTitle>动力学基础</PageTitle><SectionTitle>牛顿-欧拉法</SectionTitle><BookParagraph>基于牛顿第二定律和欧拉方程，递推计算各连杆的力和力矩。计算效率高，适合实时控制。</BookParagraph><SectionTitle>拉格朗日法</SectionTitle><BookParagraph>基于能量法，通过拉格朗日方程推导动力学方程。形式简洁，适合理论分析。</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>动力学模型应用</SectionTitle><BookList items={['力矩计算：前馈控制','仿真模拟：动力学仿真','参数辨识：模型标定']} /></div>),
  },
  {
    label: '控制基础', left: (<div className="space-y-4"><PageTitle>控制基础</PageTitle><SectionTitle>PID控制</SectionTitle><BookParagraph>比例-积分-微分控制，是最常用的机器人控制方法。P项减少误差，I项消除稳态误差，D项抑制振荡。</BookParagraph><SectionTitle>计算力矩控制</SectionTitle><BookParagraph>基于动力学模型的前馈+反馈控制，通过逆动力学计算驱动力矩，实现精确的轨迹跟踪。</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>自适应控制</SectionTitle><BookParagraph>在线估计模型参数，适应机器人动力学参数的变化。适用于负载变化、摩擦变化等场景。</BookParagraph></div>),
  },
]

export default function RobotBasicPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
