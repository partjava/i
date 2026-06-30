'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '强化学习',
  chapterTitle: '强化学习面试题',
  chapterNumber: 13,
  totalChapters: 14,
  subjectHref: '/study/ai/rl',
  prevChapter: { label: '强化学习实战', href: '/study/ai/rl/cases' },
  nextChapter: { label: '进阶与前沿', href: '/study/ai/rl/advanced' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>理论知识面试题</PageTitle>

        <SectionTitle>问题1：什么是强化学习？它与监督学习和无监督学习有什么区别？</SectionTitle>
        <BookParagraph>
          强化学习是一种通过与环境交互来学习最优策略的机器学习方法。智能体通过执行动作、观察环境反馈（奖励）来学习如何最大化长期累积奖励。
        </BookParagraph>
        <BookParagraph><b>主要区别：</b></BookParagraph>
        <BookList items={[
          '监督学习：需要标记的训练数据，直接学习输入到输出的映射',
          '无监督学习：不需要标记数据，主要发现数据中的模式和结构',
          '强化学习：通过试错和反馈来学习，目标是最大化长期奖励',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4"><br />
        <SectionTitle>问题2：解释马尔可夫决策过程（MDP）的核心概念。</SectionTitle>
        <BookParagraph>
          MDP是强化学习问题的数学框架，包含以下核心概念：
        </BookParagraph>
        <BookList items={[
          '状态空间（S）：环境可能的所有状态集合',
          '动作空间（A）：智能体可以执行的所有动作集合',
          '转移概率（P）：执行动作后状态转移的概率分布',
          '奖励函数（R）：状态转移后获得的即时奖励',
          '折扣因子（γ）：用于平衡即时奖励和未来奖励的重要性',
        ]} />
        <BookParagraph>
          这些概念共同构成了一个完整的决策过程，智能体的目标是在这个框架下找到最优策略。
        </BookParagraph>
      </div>
    ),
  },
  {
    label: '算法实现',
    left: (
      <div className="space-y-4">
        <PageTitle>算法实现面试题</PageTitle>

        <SectionTitle>问题3：解释Q-Learning算法的核心思想和实现步骤。</SectionTitle>
        <BookParagraph>
          Q-Learning是一种基于值迭代的强化学习算法，用于学习状态-动作值函数。
        </BookParagraph>
        <BookParagraph><b>核心思想：</b></BookParagraph>
        <BookList items={[
          '维护一个Q表，记录每个状态-动作对的价值估计',
          '使用时序差分学习更新Q值',
          '通过探索和利用的平衡来学习最优策略',
        ]} />
        <BookParagraph><b>实现步骤：</b></BookParagraph>
        <BookList items={[
          '初始化Q表',
          '选择动作（ε-贪婪策略）',
          '执行动作，观察奖励和下一状态',
          '更新Q值：Q(s,a) ← Q(s,a) + α[r + γ max Q(s\',a\') - Q(s,a)]',
          '重复步骤2-4直到收敛',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4"><br />
        <SectionTitle>问题4：解释策略梯度算法的原理和实现方法。</SectionTitle>
        <BookParagraph>
          策略梯度算法直接优化策略函数，通过梯度上升来最大化期望回报。
        </BookParagraph>
        <BookParagraph><b>核心原理：</b></BookParagraph>
        <BookList items={[
          '参数化策略函数π(a|s;θ)',
          '目标函数：最大化期望回报J(θ)',
          '策略梯度定理：∇J(θ) = E[∇log π(a|s;θ) * R]',
        ]} />
        <BookParagraph><b>实现方法：</b></BookParagraph>
        <BookList items={[
          '定义策略网络结构',
          '收集轨迹数据',
          '计算策略梯度',
          '更新策略参数',
          '使用基线减少方差',
        ]} />
      </div>
    ),
  },
  {
    label: '实战应用',
    left: (
      <div className="space-y-4">
        <PageTitle>实战应用面试题</PageTitle>

        <SectionTitle>问题5：如何设计一个强化学习系统来解决实际问题？请详细说明设计步骤和注意事项。</SectionTitle>
        <BookParagraph>
          设计强化学习系统需要综合考虑问题特点、算法选择和实现细节。
        </BookParagraph>
        <BookParagraph><b>设计步骤：</b></BookParagraph>
        <BookList items={[
          '问题定义与分析：明确任务目标、分析环境特征、确定评估指标',
          '环境建模：状态空间设计、动作空间定义、奖励函数设计',
          '算法选择与实现：基于问题特点选择算法、实现核心组件、设计训练流程',
          '系统优化与部署：性能调优、稳定性改进、部署与监控',
        ]} />
        <BookParagraph><b>注意事项：</b></BookParagraph>
        <BookList items={[
          '奖励函数设计要合理，避免稀疏奖励问题',
          '状态表示要包含足够信息，但避免维度灾难',
          '探索与利用的平衡',
          '训练稳定性与收敛性',
          '实际部署时的实时性要求',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>问题6：如何处理强化学习中的常见问题，如探索与利用的平衡、奖励稀疏性等？</SectionTitle>
        <BookParagraph>
          强化学习中的常见问题需要针对性的解决方案。
        </BookParagraph>
        <BookParagraph><b>探索与利用平衡：</b></BookParagraph>
        <BookList items={[
          'ε-贪婪策略：以ε概率随机探索',
          'UCB算法：基于置信上界选择动作',
          'Thompson采样：基于后验分布采样',
          '熵正则化：鼓励策略的多样性',
        ]} />
        <BookParagraph><b>奖励稀疏性：</b></BookParagraph>
        <BookList items={[
          '奖励塑形：设计中间奖励',
          '课程学习：从简单任务开始',
          '模仿学习：从专家示范中学习',
          '分层强化学习：分解复杂任务',
        ]} />
        <BookParagraph><b>其他常见问题：</b></BookParagraph>
        <BookList items={[
          '样本效率：使用经验回放、优先采样',
          '过拟合：使用正则化、早停',
          '训练不稳定：使用目标网络、梯度裁剪',
          '维度灾难：使用函数近似、特征工程',
        ]} />
      </div>
    ),
  },
]

export default function RlInterviewPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
