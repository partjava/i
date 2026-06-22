'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'

const CHAPTERS = [
  { number: 1, title: '强化学习基础', description: '概念、要素与流程', href: '/study/ai/rl/basic' },
  { number: 2, title: '马尔可夫决策过程', description: 'MDP与价值函数', href: '/study/ai/rl/mdp' },
  { number: 3, title: '动态规划', description: '策略迭代与值迭代', href: '/study/ai/rl/dynamic-programming' },
  { number: 4, title: '蒙特卡洛方法', description: 'MC预测与控制', href: '/study/ai/rl/monte-carlo' },
  { number: 5, title: '时序差分学习', description: 'TD、SARSA与Q-Learning', href: '/study/ai/rl/temporal-difference' },
  { number: 6, title: 'Q-Learning', description: '离策略学习算法', href: '/study/ai/rl/q-learning' },
  { number: 7, title: '策略梯度', description: '直接优化策略', href: '/study/ai/rl/policy-gradient' },
  { number: 8, title: 'Actor-Critic算法', description: '策略与价值结合', href: '/study/ai/rl/actor-critic' },
  { number: 9, title: '深度强化学习', description: 'DQN、DDPG、PPO', href: '/study/ai/rl/deep-rl' },
  { number: 10, title: '多智能体强化学习', description: 'MADDPG与QMIX', href: '/study/ai/rl/multi-agent' },
  { number: 11, title: '强化学习框架', description: 'Stable Baselines与RLlib', href: '/study/ai/rl/frameworks' },
  { number: 12, title: '强化学习实战', description: '完整项目案例', href: '/study/ai/rl/cases' },
  { number: 13, title: '强化学习面试题', description: '高频面试与解答', href: '/study/ai/rl/interview' },
  { number: 14, title: '进阶与前沿', description: '前沿研究与方向', href: '/study/ai/rl/advanced' },
]

export default function RlHomePage() {
  return (
    <div>
      <BookCover
        title="强化学习"
        subtitle="Reinforcement Learning"
        description="系统学习强化学习理论与实战，从MDP到深度强化学习，掌握智能决策核心技术"
        chapterCount={CHAPTERS.length}
        totalHours={180}
        chapters={CHAPTERS}
        icon="🎮"
        startHref="/study/ai/rl/basic"
        theme={THEMES.ai}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么选择强化学习？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: '自主学习', desc: '从交互中学习最优策略' },
              { title: '延迟奖励', desc: '处理长期回报的决策问题' },
              { title: '决策优化', desc: '序列决策的全局优化' },
              { title: '通用框架', desc: '游戏/机器人/自动驾驶全覆盖' },
            ].map((f, i) => (
              <div key={i} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">学习路径</h2>
        <div className="space-y-6">
          {[
            { phase: '第一阶段：理论基础', desc: '理解RL核心概念', items: ['强化学习基础', '马尔可夫决策过程', '动态规划'] },
            { phase: '第二阶段：经典算法', desc: '掌握基础RL算法', items: ['蒙特卡洛方法', '时序差分学习', 'Q-Learning', '策略梯度'] },
            { phase: '第三阶段：进阶算法', desc: '高效RL算法', items: ['Actor-Critic算法', '深度强化学习', '多智能体强化学习'] },
            { phase: '第四阶段：实践应用', desc: '框架与项目', items: ['强化学习框架', '强化学习实战'] },
            { phase: '第五阶段：面试与前沿', desc: '面试准备与前沿', items: ['强化学习面试题', '进阶与前沿'] },
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium mr-4">阶段 {i + 1}</div>
                <h3 className="text-xl font-bold text-gray-900">{p.phase}</h3>
              </div>
              <p className="text-gray-600 mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">{p.items.map((item, j) => (<span key={j} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">{item}</span>))}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">职业发展方向</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: '强化学习研究员', desc: 'RL算法研究与创新', skills: ['数学', 'RL算法', 'PyTorch', '论文'] },
              { title: '游戏AI工程师', desc: '游戏智能体开发', skills: ['RL', 'Game', '模拟器', '分布式'] },
              { title: '机器人算法工程师', desc: '机器人控制算法', skills: ['RL', 'ROS', '控制论', '仿真'] },
              { title: '量化交易工程师', desc: '金融交易策略', skills: ['RL', '金融', '数据分析', '回测'] },
            ].map((c, i) => (
              <div key={i} className="p-6 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-green-600">{c.title}</h3>
                <p className="text-gray-600 mb-4">{c.desc}</p>
                <div className="flex flex-wrap gap-2">{c.skills.map((s, j) => (<span key={j} className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">{s}</span>))}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">学习建议</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-600">学习方法</h4>
              <ul className="space-y-3">
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>从经典算法入手，逐步深入前沿</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>动手实现每个算法，理解细节</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>使用Gym等环境做实验对比</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>多读经典论文和代码实现</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-600">注意事项</h4>
              <ul className="space-y-3">
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>重视数学基础：概率论、优化理论</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>理解探索与利用的平衡</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>注意训练稳定性和复现性</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>关注算力效率，避免资源浪费</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
