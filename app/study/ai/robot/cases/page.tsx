'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = { subject: '智能机器人', chapterTitle: '机器人实战', chapterNumber: 10, totalChapters: 12, subjectHref: '/study/ai/robot', prevChapter: { label: '人机交互', href: '/study/ai/robot/hci' }, nextChapter: { label: '机器人面试题', href: '/study/ai/robot/interview' }, theme: THEMES.ai }

const SPREADS = [
  { label: '工业应用', left: (<div className="space-y-4"><PageTitle>工业机器人应用</PageTitle><SectionTitle>焊接机器人</SectionTitle><BookParagraph>使用工业机械臂进行自动焊接，通过视觉引导定位焊缝，实时跟踪焊接路径。涉及轨迹规划、力控制、视觉伺服等技术。</BookParagraph><SectionTitle>装配机器人</SectionTitle><BookParagraph>自动化装配生产线中，机器人完成零件抓取、定位、装配等操作。需要高精度力控制和视觉定位。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>轨迹规划示例</SectionTitle><BookCode language="python" code={`import numpy as np\ndef linear_interp(start, end, steps):\n    t = np.linspace(0, 1, steps)\n    return start + t[:, np.newaxis] * (end - start)\n\nstart = np.array([0, 0, 0])\nend = np.array([1, 1, 1])\ntraj = linear_interp(start, end, 100)\nprint(f"轨迹点数: {len(traj)}")`} /></div>) },
  { label: '服务机器人', left: (<div className="space-y-4"><PageTitle>服务机器人</PageTitle><SectionTitle>配送机器人</SectionTitle><BookParagraph>室内配送机器人通过SLAM建图、定位导航自主移动到目标位置，完成物品配送任务。适用于餐厅、酒店、医院等场景。</BookParagraph><SectionTitle>清洁机器人</SectionTitle><BookParagraph>自动规划清扫路径，覆盖全部区域。通过传感器检测障碍物，实现自主避障和回充。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>全覆盖路径规划</SectionTitle><BookCode language="python" code={`def boustrophedon(width, height, step):\n    path = []\n    for y in range(0, height, step):\n        if y % 2 == 0:\n            path.extend([(x, y) for x in range(0, width, step)])\n        else:\n            path.extend([(x, y) for x in range(width-1, -1, -step)])\n    return path\n\nprint(boustrophedon(10, 10, 2)[:5])`} /></div>) },
  { label: '自动驾驶', left: (<div className="space-y-4"><PageTitle>自动驾驶</PageTitle><BookParagraph>自动驾驶是机器人在交通领域的应用。包括感知（目标检测、车道线识别）、规划（路径规划、行为决策）和控制（横纵向控制）三大模块。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>纯追踪控制</SectionTitle><BookCode language="python" code={`import math\ndef pure_pursuit(robot, goal, Ld):\n    alpha = math.atan2(goal[1]-robot[1], goal[0]-robot[0]) - robot[2]\n    delta = math.atan2(2 * Ld * math.sin(alpha), 1.0)\n    return delta\n\n# 使用\nsteer = pure_pursuit((0,0,0), (1,1), 0.5)`} /></div>) },
  { label: '研究案例', left: (<div className="space-y-4"><PageTitle>研究案例</PageTitle><BookList items={['Atlas：人形机器人动态行走','Spot：四足机器人巡检','PR2：个人机器人研究平台','UR5：协作机器人应用']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RobotCasesPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
