'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '强化学习',
  chapterTitle: '进阶与前沿',
  chapterNumber: 14,
  totalChapters: 14,
  subjectHref: '/study/ai/rl',
  prevChapter: { label: '强化学习面试题', href: '/study/ai/rl/interview' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '最新研究',
    left: (
      <div className="space-y-4">
        <PageTitle>最新研究进展</PageTitle>

        <SectionTitle>1. 多智能体强化学习</SectionTitle>
        <BookParagraph>
          多智能体强化学习是当前研究的热点领域，主要关注多个智能体之间的协作与竞争。
        </BookParagraph>
        <BookParagraph><b>主要研究方向：</b></BookParagraph>
        <BookList items={[
          '基于博弈论的协作机制',
          '去中心化训练方法',
          '通信与信息共享',
          '群体智能与涌现行为',
        ]} />
        <BookParagraph><b>最新突破：</b></BookParagraph>
        <BookList items={[
          'AlphaStar：星际争霸2中的多智能体协作',
          'OpenAI Five：Dota2中的团队协作',
          'MARL算法在机器人集群控制中的应用',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4"><br />
        <SectionTitle>2. 元学习与迁移学习</SectionTitle>
        <BookParagraph>
          元学习和迁移学习致力于提高强化学习算法的泛化能力和学习效率。
        </BookParagraph>
        <BookParagraph><b>研究重点：</b></BookParagraph>
        <BookList items={[
          '快速适应新环境的能力',
          '知识迁移与复用',
          '少样本学习',
          '终身学习',
        ]} />
        <BookParagraph><b>最新进展：</b></BookParagraph>
        <BookList items={[
          'MAML（Model-Agnostic Meta-Learning）',
          'RL2（Reinforcement Learning with Recurrent Neural Networks）',
          'PEARL（Probabilistic Embeddings for Actor-Critic RL）',
        ]} />
      </div>
    ),
  },
  {
    label: '前沿技术',
    left: (
      <div className="space-y-4">
        <PageTitle>前沿技术</PageTitle>

        <SectionTitle>1. 深度强化学习新技术</SectionTitle>
        <BookParagraph>
          深度强化学习领域不断涌现新的技术和方法，推动着整个领域的发展。
        </BookParagraph>
        <BookParagraph><b>主要技术：</b></BookParagraph>
        <BookList items={[
          '分布式训练框架',
          '混合精度训练',
          '模型压缩与加速',
          '自监督学习',
        ]} />
        <BookParagraph><b>应用案例：</b></BookParagraph>
        <BookList items={[
          '大规模并行训练系统',
          '边缘设备部署优化',
          '实时决策系统',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4"><br />
        <SectionTitle>2. 强化学习框架与工具</SectionTitle>
        <BookParagraph>
          强化学习框架和工具的发展极大地促进了研究和应用的进展。
        </BookParagraph>
        <BookParagraph><b>主流框架：</b></BookParagraph>
        <BookList items={[
          'Stable Baselines3',
          'RLlib',
          'Acme',
          'CleanRL',
        ]} />
        <BookParagraph><b>开发工具：</b></BookParagraph>
        <BookList items={[
          '环境模拟器',
          '可视化工具',
          '实验管理平台',
          '性能分析工具',
        ]} />
      </div>
    ),
  },
  {
    label: '发展方向',
    left: (
      <div className="space-y-4">
        <PageTitle>未来发展方向</PageTitle>

        <SectionTitle>1. 理论研究方向</SectionTitle>
        <BookParagraph>
          强化学习的理论研究将继续深入，为算法发展提供理论基础。
        </BookParagraph>
        <BookParagraph><b>主要方向：</b></BookParagraph>
        <BookList items={[
          '样本效率理论',
          '泛化性分析',
          '收敛性证明',
          '鲁棒性研究',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 应用领域拓展</SectionTitle>
        <BookParagraph>
          强化学习将在更多领域发挥重要作用，推动技术创新。
        </BookParagraph>
        <BookParagraph><b>重点领域：</b></BookParagraph>
        <BookList items={[
          '自动驾驶',
          '机器人控制',
          '医疗诊断',
          '金融交易',
          '能源管理',
        ]} />

        <SectionTitle>3. 技术融合创新</SectionTitle>
        <BookParagraph>
          强化学习将与其他技术深度融合，产生新的突破。
        </BookParagraph>
        <BookParagraph><b>融合方向：</b></BookParagraph>
        <BookList items={[
          '与因果推理结合',
          '与知识图谱融合',
          '与量子计算结合',
          '与脑科学交叉',
        ]} />
      </div>
    ),
  },
]

export default function RlAdvancedPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
