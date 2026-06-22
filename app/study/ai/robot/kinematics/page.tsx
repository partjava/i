'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '智能机器人', chapterTitle: '运动学与动力学', chapterNumber: 2, totalChapters: 12,
  subjectHref: '/study/ai/robot',
  prevChapter: { label: '机器人学基础', href: '/study/ai/robot/basic' },
  nextChapter: { label: '路径规划', href: '/study/ai/robot/path-planning' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: '运动学', left: (<div className="space-y-4"><PageTitle>运动学</PageTitle><SectionTitle>正运动学</SectionTitle><BookParagraph>已知各关节角度，计算机器人末端执行器的位置和姿态。常用DH参数法建立连杆坐标系，通过齐次变换矩阵的连乘得到末端位姿。6自由度机器人有封闭解。</BookParagraph><SectionTitle>逆运动学</SectionTitle><BookParagraph>已知末端目标位姿，求解各关节角度。存在多解、无解和奇异解问题。解析法适用于特定结构，数值法通用但计算量大。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>速度运动学</SectionTitle><BookParagraph>雅可比矩阵建立关节速度与末端速度的映射关系。可用于分析机器人的奇异性、灵巧度和可操作性。</BookParagraph></div>) },
  { label: '动力学', left: (<div className="space-y-4"><PageTitle>动力学</PageTitle><SectionTitle>牛顿-欧拉法</SectionTitle><BookParagraph>基于牛顿第二定律和欧拉方程，递推计算各连杆的力和力矩。计算效率O(n)，适合实时控制应用。</BookParagraph><SectionTitle>拉格朗日法</SectionTitle><BookParagraph>基于系统能量（动能-势能）通过拉格朗日方程推导。形式简洁，便于分析和理解动力学特性。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>动力学应用</SectionTitle><BookList items={['前馈控制：基于动力学模型补偿','仿真：动力学仿真验证算法','参数辨识：标定动力学参数']} /><BookCode language="python" code={`import numpy as np\ndef gravity_compensation(g, m, l, theta):\n    # 重力补偿力矩计算\n    tau = m * g * l * np.cos(theta)\n    return tau`} /></div>) },
  { label: '高级主题', left: (<div className="space-y-4"><PageTitle>高级主题</PageTitle><SectionTitle>柔性关节动力学</SectionTitle><BookParagraph>考虑关节柔性（谐波减速器等）的动力学建模，包括电机侧和连杆侧的动力耦合。</BookParagraph><SectionTitle>接触力控制</SectionTitle><BookParagraph>机器人与环境接触时的力/位混合控制，阻抗控制通过调节机械阻抗实现柔顺控制。</BookParagraph></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RobotKinematicsPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
