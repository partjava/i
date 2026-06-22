'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const rlCode = `import gym
import numpy as np

env = gym.make('FetchReach-v2')
obs = env.reset()
for step in range(100):
    # 随机策略生成动作
    action = env.action_space.sample()
    obs, reward, done, info = env.step(action)
    if done: break`

const META: LessonMeta = { subject: '智能机器人', chapterTitle: '进阶与前沿', chapterNumber: 12, totalChapters: 12, subjectHref: '/study/ai/robot', prevChapter: { label: '机器人面试题', href: '/study/ai/robot/interview' }, theme: THEMES.ai }

const SPREADS = [
  { label: '研究进展', left: (<div className="space-y-4"><PageTitle>研究进展</PageTitle><SectionTitle>灵巧操作</SectionTitle><BookParagraph>机器人灵巧手通过多指协调实现复杂操作任务。结合触觉传感和力控制，实现精细操作如抓取鸡蛋、穿针引线等。</BookParagraph><SectionTitle>软体机器人</SectionTitle><BookParagraph>使用柔性材料制造的机器人，具有高适应性和安全性。适用于医疗、搜救等需要安全交互的场景。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>灵巧手控制</SectionTitle><BookCode language="python" code={`class GreedyGrasp:\n    def __init__(self):\n        self.fingers = [0.0, 0.0, 0.0]\n    def grasp(self, object_pos):\n        for i in range(3):\n            self.fingers[i] = min(self.fingers[i] + 0.1, 1.0)\n        return self.fingers`} /></div>) },
  { label: '前沿技术', left: (<div className="space-y-4"><PageTitle>前沿技术</PageTitle><SectionTitle>学习型机器人</SectionTitle><BookParagraph>深度强化学习使机器人从交互中自主学习复杂技能。模仿学习通过示教数据学习策略，减少试错成本。</BookParagraph><SectionTitle>群体机器人</SectionTitle><BookParagraph>多机器人协同完成复杂任务，如编队飞行、协同搬运等。受群体智能启发，通过局部交互实现全局行为。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>强化学习示例</SectionTitle><BookCode language="python" code={rlCode} /></div>) },
  { label: '发展趋势', left: (<div className="space-y-4"><PageTitle>发展趋势</PageTitle><BookList items={['人机共融：安全自然的人机协作','具身智能：与环境交互中学习','通用机器人：通用任务执行']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '技术挑战', left: (<div className="space-y-4"><PageTitle>技术挑战</PageTitle><BookList items={['感知泛化：应对未知环境','操作灵巧：精细操作能力','自主决策：复杂场景决策','安全可靠：系统可靠性']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RobotAdvancedPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
