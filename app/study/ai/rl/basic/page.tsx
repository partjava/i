'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const gridWorldCode = `import gym
import numpy as np

class SimpleGridWorld(gym.Env):
    def __init__(self):
        self.grid_size = 2
        self.action_space = gym.spaces.Discrete(4)
        self.observation_space = gym.spaces.Discrete(4)

    def step(self, action):
        # 实现环境交互逻辑
        pass

    def reset(self):
        # 重置环境
        pass`

const policyEvalCode = `def policy_evaluation(env, policy, gamma=0.9, theta=1e-6):
    V = np.zeros(env.nS)
    while True:
        delta = 0
        for s in range(env.nS):
            v = V[s]
            # 实现策略评估逻辑
            delta = max(delta, abs(v - V[s]))
        if delta < theta:
            break
    return V`

const mdpGridCode = `import numpy as np

class GridWorld:
    def __init__(self, size=2):
        self.size = size
        self.n_states = size * size
        self.n_actions = 4  # 上、下、左、右
        self.P = self._build_transition_matrix()
        self.R = self._build_reward_matrix()

    def _build_transition_matrix(self):
        # 构建转移概率矩阵 P[s][a][s'] = P(s'|s,a)
        P = np.zeros((self.n_states, self.n_actions, self.n_states))

        # 对于每个状态和动作
        for s in range(self.n_states):
            for a in range(self.n_actions):
                # 预期方向
                next_state = self._get_next_state(s, a)
                P[s][a][next_state] = 0.8

                # 左偏转
                left_state = self._get_next_state(s, (a-1)%4)
                P[s][a][left_state] = 0.1

                # 右偏转
                right_state = self._get_next_state(s, (a+1)%4)
                P[s][a][right_state] = 0.1

        return P

    def _get_next_state(self, state, action):
        # 获取下一个状态
        x, y = state // self.size, state % self.size

        if action == 0:  # 上
            x = max(0, x-1)
        elif action == 1:  # 下
            x = min(self.size-1, x+1)
        elif action == 2:  # 左
            y = max(0, y-1)
        elif action == 3:  # 右
            y = min(self.size-1, y+1)

        return x * self.size + y

    def _build_reward_matrix(self):
        # 构建奖励矩阵
        R = np.full((self.n_states, self.n_actions), -0.1)
        # 目标状态(1,1)的奖励为1
        R[-1] = 1.0
        return R

# 使用示例
env = GridWorld()
print("转移概率矩阵形状:", env.P.shape)
print("奖励矩阵形状:", env.R.shape)`

const qlearningCode = `import numpy as np

class QLearning:
    def __init__(self, n_states, n_actions, alpha=0.1, gamma=0.9, epsilon=0.1):
        self.n_states = n_states
        self.n_actions = n_actions
        self.alpha = alpha  # 学习率
        self.gamma = gamma  # 折扣因子
        self.epsilon = epsilon  # 探索率
        self.Q = np.zeros((n_states, n_actions))  # Q值表

    def choose_action(self, state):
        # ε-贪婪策略选择动作
        if np.random.random() < self.epsilon:
            return np.random.randint(self.n_actions)  # 探索
        else:
            return np.argmax(self.Q[state])  # 利用

    def learn(self, state, action, reward, next_state):
        # Q-learning更新
        old_value = self.Q[state, action]
        next_max = np.max(self.Q[next_state])
        new_value = old_value + self.alpha * (reward + self.gamma * next_max - old_value)
        self.Q[state, action] = new_value

    def get_policy(self):
        # 获取最优策略
        return np.argmax(self.Q, axis=1)

# 使用示例
n_states = 4  # 2x2网格
n_actions = 4  # 上、下、左、右
agent = QLearning(n_states, n_actions)

# 训练过程
for episode in range(1000):
    state = 0  # 起始状态
    done = False

    while not done:
        action = agent.choose_action(state)
        # 执行动作，获取下一个状态和奖励
        next_state = env.step(action)
        reward = env.R[state, action]

        # 更新Q值
        agent.learn(state, action, reward, next_state)

        state = next_state
        if state == 3:  # 到达目标状态
            done = True

# 获取最优策略
optimal_policy = agent.get_policy()
print("最优策略:", optimal_policy)`

const META: LessonMeta = {
  subject: '强化学习',
  chapterTitle: '强化学习基础',
  chapterNumber: 1,
  totalChapters: 14,
  subjectHref: '/study/ai/rl',
  nextChapter: { label: '马尔可夫决策过程', href: '/study/ai/rl/mdp' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识(1)',
    left: (
      <div className="space-y-4">
        <PageTitle>强化学习（Reinforcement Learning）概述</PageTitle>

        <SectionTitle>基本概念</SectionTitle>
        <BookParagraph>
          强化学习是机器学习的一个重要分支，它通过让智能体（Agent）在与环境（Environment）的交互中学习最优策略。智能体通过尝试不同的动作（Action），观察环境的状态（State）和获得的奖励（Reward），逐步学习如何最大化长期累积奖励。
        </BookParagraph>
        <BookParagraph>
          <b>核心思想：</b>通过「试错」（Trial and Error）的方式学习，从经验中不断改进策略。
        </BookParagraph>

        {/* 强化学习交互过程图 */}
        <div className="flex justify-center">
          <svg width="100%" height="260" viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="600" height="260" fill="#f8fafc" />
            <circle cx="150" cy="130" r="50" fill="#3b82f6" opacity="0.2" />
            <text x="150" y="130" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">智能体</text>
            <rect x="380" y="60" width="160" height="140" fill="#10b981" opacity="0.2" rx="10" />
            <text x="460" y="130" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">环境</text>
            <path d="M200 130 L380 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead_rl)" />
            <text x="290" y="120" textAnchor="middle" fontSize="12">动作</text>
            <path d="M380 130 L200 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead_rl)" />
            <text x="290" y="155" textAnchor="middle" fontSize="12">状态和奖励</text>
            <defs>
              <marker id="arrowhead_rl" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>核心要素</SectionTitle>
        <BookList items={[
          '智能体（Agent）：学习的主体，负责做出决策和执行动作',
          '环境（Environment）：智能体所处的世界，提供状态和奖励信息',
          '状态（State）：环境在某一时刻的完整描述',
          '动作（Action）：智能体可以执行的操作',
          '奖励（Reward）：环境对智能体动作的反馈信号',
          '策略（Policy）：智能体的决策规则，决定在给定状态下选择什么动作',
        ]} />

        {/* 强化学习循环图 */}
        <div className="flex justify-center">
          <svg width="100%" height="260" viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="500" height="260" fill="#f8fafc" />
            <path d="M250 60 C400 60, 400 200, 250 200 C100 200, 100 60, 250 60" stroke="#3b82f6" strokeWidth="3" fill="none" />
            <circle cx="250" cy="60" r="25" fill="#3b82f6" />
            <text x="250" y="60" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12">状态</text>
            <circle cx="400" cy="130" r="25" fill="#3b82f6" />
            <text x="400" y="130" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12">动作</text>
            <circle cx="250" cy="200" r="25" fill="#3b82f6" />
            <text x="250" y="200" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12">奖励</text>
            <circle cx="100" cy="130" r="25" fill="#3b82f6" />
            <text x="100" y="130" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12">策略</text>
          </svg>
        </div>

        <SectionTitle>主要特点</SectionTitle>
        <BookList items={[
          '延迟奖励：动作的后果可能在未来才能体现',
          '探索与利用：需要在尝试新动作和利用已知好动作之间平衡',
          '序列决策：当前决策会影响未来的状态和奖励',
          '在线学习：通过与环境交互实时学习',
        ]} />
      </div>
    ),
  },
  {
    label: '理论知识(2)',
    left: (
      <div className="space-y-4">
        <SectionTitle>探索与利用平衡</SectionTitle>
        <div className="flex justify-center">
          <svg width="100%" height="260" viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="600" height="260" fill="#f8fafc" />
            <line x1="60" y1="200" x2="540" y2="200" stroke="#64748b" strokeWidth="2" />
            <line x1="60" y1="200" x2="60" y2="60" stroke="#64748b" strokeWidth="2" />
            <path d="M60 200 Q300 40 540 120" stroke="#3b82f6" strokeWidth="3" fill="none" />
            <text x="300" y="40" textAnchor="middle" fontSize="12">探索</text>
            <path d="M60 200 Q300 160 540 80" stroke="#10b981" strokeWidth="3" fill="none" />
            <text x="300" y="180" textAnchor="middle" fontSize="12">利用</text>
            <circle cx="300" cy="115" r="5" fill="#ef4444" />
            <text x="320" y="115" fontSize="12">平衡点</text>
          </svg>
        </div>

        <SectionTitle>应用场景</SectionTitle>
        <BookList items={[
          '游戏AI：如AlphaGo、星际争霸AI等',
          '机器人控制：如机械臂操作、机器人导航等',
          '自动驾驶：如路径规划、决策控制等',
          '资源调度：如网络资源分配、能源管理等',
        ]} />

        <div className="flex justify-center">
          <svg width="100%" height="260" viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="600" height="260" fill="#f8fafc" />
            <circle cx="300" cy="130" r="70" fill="#3b82f6" opacity="0.1" />
            <text x="300" y="130" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">强化学习</text>
            <line x1="300" y1="60" x2="300" y2="20" stroke="#64748b" strokeWidth="2" />
            <text x="300" y="15" textAnchor="middle" fontSize="11">游戏AI</text>
            <line x1="370" y1="130" x2="450" y2="130" stroke="#64748b" strokeWidth="2" />
            <text x="490" y="130" textAnchor="middle" fontSize="11">机器人控制</text>
            <line x1="300" y1="200" x2="300" y2="240" stroke="#64748b" strokeWidth="2" />
            <text x="300" y="250" textAnchor="middle" fontSize="11">自动驾驶</text>
            <line x1="230" y1="130" x2="150" y2="130" stroke="#64748b" strokeWidth="2" />
            <text x="110" y="130" textAnchor="middle" fontSize="11">资源调度</text>
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>学习建议</SectionTitle>
        <BookList items={[
          '先掌握概率论、线性代数等数学基础',
          '理解马尔可夫决策过程（MDP）的基本概念',
          '从简单的表格型方法开始学习',
          '逐步过渡到深度强化学习',
          '多动手实践，从简单的环境开始',
        ]} />

        <div className="flex justify-center">
          <svg width="100%" height="260" viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="600" height="260" fill="#f8fafc" />
            <path d="M75 130 L225 130 L375 130 L525 130" stroke="#3b82f6" strokeWidth="3" fill="none" />
            <circle cx="75" cy="130" r="30" fill="#3b82f6" />
            <text x="75" y="130" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="11">数学基础</text>
            <circle cx="225" cy="130" r="30" fill="#3b82f6" />
            <text x="225" y="130" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="11">MDP</text>
            <circle cx="375" cy="130" r="30" fill="#3b82f6" />
            <text x="375" y="130" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="11">表格方法</text>
            <circle cx="525" cy="130" r="30" fill="#3b82f6" />
            <text x="525" y="130" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="11">深度RL</text>
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '实战练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>练习1：简单环境探索</SectionTitle>
        <BookParagraph>
          使用Python和Gym库实现一个简单的强化学习环境，让智能体学习如何在一个简单的网格世界中导航。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现一个2x2网格世界',
          '智能体需要从起点到达终点',
          '使用Q-learning算法进行学习',
        ]} />
        <BookParagraph><b>代码框架</b></BookParagraph>
        <BookCode language="python" code={gridWorldCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习2：策略评估</SectionTitle>
        <BookParagraph>
          实现策略评估算法，计算给定策略下的状态价值函数。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现迭代策略评估',
          '计算状态价值函数',
          '可视化价值函数变化',
        ]} />
        <BookParagraph><b>代码框架</b></BookParagraph>
        <BookCode language="python" code={policyEvalCode} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题练习</PageTitle>

        <SectionTitle>例题1：马尔可夫决策过程</SectionTitle>
        <BookParagraph>
          考虑一个简单的网格世界，智能体可以向上、下、左、右移动。每个动作有0.8的概率按预期方向移动，0.1的概率向左偏转，0.1的概率向右偏转。如果撞墙则停留在原地。奖励函数为：到达目标状态获得+1，其他状态获得-0.1。
        </BookParagraph>
        <BookParagraph><b>问题：</b></BookParagraph>
        <BookList items={[
          '写出这个问题的状态空间、动作空间和转移概率',
          '计算最优策略下的状态价值函数',
          '分析不同折扣因子对最优策略的影响',
        ]} />
        <BookParagraph><b>参考答案</b></BookParagraph>
        <BookParagraph>
          1. 状态空间：S = {'{(0,0), (0,1), (1,0), (1,1)}'}<br />
          动作空间：A = [上, 下, 左, 右]<br />
          转移概率：P(s'|s,a) = 0.8 如果s'是预期方向<br />
          P(s'|s,a) = 0.1 如果s'是左偏转方向<br />
          P(s'|s,a) = 0.1 如果s'是右偏转方向
        </BookParagraph>
        <BookCode language="python" code={mdpGridCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>例题2：Q-learning算法</SectionTitle>
        <BookParagraph>
          在一个简单的2x2网格世界中，使用Q-learning算法学习最优策略。学习率α=0.1，折扣因子γ=0.9，探索率ε=0.1。初始Q值都设为0。
        </BookParagraph>
        <BookParagraph><b>问题：</b></BookParagraph>
        <BookList items={[
          '写出Q-learning的更新公式',
          '分析探索率ε对学习过程的影响',
          '讨论如何设计奖励函数以加快学习速度',
        ]} />
        <BookParagraph><b>参考答案</b></BookParagraph>
        <BookParagraph>
          1. Q(s,a) ← Q(s,a) + α[r + γ max Q(s',a') - Q(s,a)]<br />
          2. 较大的ε值增加探索，较小的ε值增加利用<br />
          3. 可以使用稀疏奖励、密集奖励或奖励塑形
        </BookParagraph>
        <BookCode language="python" code={qlearningCode} />
      </div>
    ),
  },
]

export default function RlBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
