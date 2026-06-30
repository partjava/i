'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const basicPGCode = `import numpy as np
import matplotlib.pyplot as plt

class PolicyGradient:
    def __init__(self, states, actions, learning_rate=0.1):
        """
        初始化策略梯度算法
        states: 状态空间大小
        actions: 动作空间大小
        learning_rate: 学习率
        """
        self.states = states
        self.actions = actions
        self.learning_rate = learning_rate
        self.policy = np.random.rand(states, actions)
        self.policy = self.policy / np.sum(self.policy, axis=1, keepdims=True)

    def choose_action(self, state):
        """
        根据策略选择动作
        state: 当前状态
        """
        return np.random.choice(self.actions, p=self.policy[state])

    def update_policy(self, state, action, reward):
        """
        更新策略
        state: 当前状态
        action: 执行的动作
        reward: 获得的奖励
        """
        self.policy[state, action] += self.learning_rate * reward

    def plot_policy(self):
        """
        可视化策略
        """
        plt.figure(figsize=(10, 6))
        plt.imshow(self.policy, cmap='viridis')
        plt.colorbar(label='Policy Value')
        plt.title('Policy Table')
        plt.xlabel('Actions')
        plt.ylabel('States')
        plt.show()`

const pgControlCode = `import numpy as np
import matplotlib.pyplot as plt

class PolicyGradientControl:
    def __init__(self, env, learning_rate=0.1):
        """
        初始化策略梯度控制算法
        env: 环境对象
        learning_rate: 学习率
        """
        self.env = env
        self.learning_rate = learning_rate
        self.policy = np.random.rand(env.observation_space.n, env.action_space.n)
        self.policy = self.policy / np.sum(self.policy, axis=1, keepdims=True)

    def choose_action(self, state):
        """
        根据策略选择动作
        state: 当前状态
        """
        return np.random.choice(self.env.action_space.n, p=self.policy[state])

    def update_policy(self, state, action, reward):
        """
        更新策略
        state: 当前状态
        action: 执行的动作
        reward: 获得的奖励
        """
        self.policy[state, action] += self.learning_rate * reward

    def train(self, num_episodes=1000):
        """
        训练过程
        num_episodes: 训练回合数
        """
        rewards = []
        for episode in range(num_episodes):
            state = self.env.reset()
            total_reward = 0
            done = False

            while not done:
                action = self.choose_action(state)
                next_state, reward, done, _ = self.env.step(action)
                self.update_policy(state, action, reward)
                state = next_state
                total_reward += reward

            rewards.append(total_reward)

        return rewards

    def plot_learning_curve(self, rewards):
        """
        绘制学习曲线
        rewards: 每个回合的总奖励
        """
        plt.figure(figsize=(10, 6))
        plt.plot(rewards)
        plt.title('Learning Curve')
        plt.xlabel('Episode')
        plt.ylabel('Total Reward')
        plt.show()`

const mazePGCode = `import numpy as np
import matplotlib.pyplot as plt

class MazePolicyGradient:
    def __init__(self, maze_size, learning_rate=0.1):
        """
        初始化迷宫策略梯度
        maze_size: 迷宫大小
        learning_rate: 学习率
        """
        self.maze_size = maze_size
        self.learning_rate = learning_rate
        self.policy = np.random.rand(maze_size, maze_size, 4)  # 4个动作：上、右、下、左
        self.policy = self.policy / np.sum(self.policy, axis=2, keepdims=True)

    def choose_action(self, state):
        """
        根据策略选择动作
        state: 当前状态坐标
        """
        return np.random.choice(4, p=self.policy[state[0], state[1]])

    def get_next_state(self, state, action):
        """
        获取下一个状态
        state: 当前状态坐标
        action: 选择的动作
        """
        next_state = list(state)
        if action == 0:  # 上
            next_state[0] = max(0, state[0] - 1)
        elif action == 1:  # 右
            next_state[1] = min(self.maze_size - 1, state[1] + 1)
        elif action == 2:  # 下
            next_state[0] = min(self.maze_size - 1, state[0] + 1)
        else:  # 左
            next_state[1] = max(0, state[1] - 1)
        return tuple(next_state)

    def get_reward(self, state, next_state):
        """
        计算奖励
        state: 当前状态
        next_state: 下一个状态
        """
        if next_state == (self.maze_size-1, self.maze_size-1):
            return 1  # 到达终点
        return 0

    def update_policy(self, state, action, reward):
        """
        更新策略
        state: 当前状态
        action: 执行的动作
        reward: 获得的奖励
        """
        self.policy[state[0], state[1], action] += self.learning_rate * reward

    def train(self, num_episodes=1000):
        """
        训练过程
        num_episodes: 训练回合数
        """
        rewards = []
        for episode in range(num_episodes):
            state = (0, 0)  # 起点
            total_reward = 0
            done = False

            while not done:
                action = self.choose_action(state)
                next_state = self.get_next_state(state, action)
                reward = self.get_reward(state, next_state)
                self.update_policy(state, action, reward)
                state = next_state
                total_reward += reward

                if state == (self.maze_size-1, self.maze_size-1):
                    done = True

            rewards.append(total_reward)

        return rewards

    def plot_maze(self):
        """
        可视化迷宫和最优路径
        """
        plt.figure(figsize=(8, 8))
        plt.imshow(np.max(self.policy, axis=2), cmap='viridis')
        plt.colorbar(label='Policy Value')
        plt.title('Maze Policy')
        plt.show()

if __name__ == '__main__':
    maze = MazePolicyGradient(maze_size=5)
    rewards = maze.train()
    maze.plot_maze()

    plt.figure(figsize=(10, 6))
    plt.plot(rewards)
    plt.title('Learning Curve')
    plt.xlabel('Episode')
    plt.ylabel('Total Reward')
    plt.show()`

const META: LessonMeta = {
  subject: '强化学习',
  chapterTitle: '策略梯度',
  chapterNumber: 7,
  totalChapters: 14,
  subjectHref: '/study/ai/rl',
  prevChapter: { label: 'Q-Learning', href: '/study/ai/rl/q-learning' },
  nextChapter: { label: 'Actor-Critic算法', href: '/study/ai/rl/actor-critic' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>策略梯度概述</PageTitle>

        <SectionTitle>基本概念</SectionTitle>
        <BookParagraph>
          策略梯度是一种直接优化策略的方法，通过梯度上升来最大化期望回报。它适用于连续动作空间和离散动作空间。
        </BookParagraph>
        <BookParagraph>
          <b>核心思想：</b>通过梯度上升来优化策略，以最大化期望回报。
        </BookParagraph>

        <div className="flex justify-center">
          <svg width="100%" height="160" viewBox="0 0 500 160">
            <rect x="50" y="40" width="80" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="90" y="62" textAnchor="middle" fill="black" fontSize="12">策略π</text>
            <path d="M130 57 L150 57" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_pg1)"/>
            <rect x="150" y="40" width="80" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="190" y="62" textAnchor="middle" fill="black" fontSize="12">动作a</text>
            <path d="M230 57 L250 57" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_pg1)"/>
            <rect x="250" y="40" width="80" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="290" y="62" textAnchor="middle" fill="black" fontSize="12">奖励r</text>
            <path d="M190 75 L190 95" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_pg1)"/>
            <rect x="150" y="95" width="80" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="190" y="117" textAnchor="middle" fill="black" fontSize="12">梯度更新</text>
            <defs>
              <marker id="arrowhead_pg1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
              </marker>
            </defs>
          </svg>
        </div>

        <SectionTitle>算法原理</SectionTitle>
        <BookList items={[
          '策略梯度公式：∇J(θ) = E[∇log(π(a|s)) * R]',
          '参数说明：θ(策略参数)，R(回报)',
          '探索策略：使用随机策略进行探索',
          '收敛性：在满足条件下保证收敛到最优策略',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <div className="flex justify-center">
          <svg width="100%" height="160" viewBox="0 0 500 160">
            <circle cx="80" cy="80" r="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="80" y="80" textAnchor="middle" dominantBaseline="middle" fill="black" fontSize="11">选择动作</text>
            <path d="M115 80 L135 80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_pg2)"/>
            <circle cx="170" cy="80" r="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="170" y="80" textAnchor="middle" dominantBaseline="middle" fill="black" fontSize="11">执行动作</text>
            <path d="M205 80 L225 80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_pg2)"/>
            <circle cx="260" cy="80" r="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="260" y="80" textAnchor="middle" dominantBaseline="middle" fill="black" fontSize="11">观察奖励</text>
            <path d="M295 80 L315 80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_pg2)"/>
            <circle cx="350" cy="80" r="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="350" y="80" textAnchor="middle" dominantBaseline="middle" fill="black" fontSize="11">更新策略</text>
            <defs>
              <marker id="arrowhead_pg2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
              </marker>
            </defs>
          </svg>
        </div>

        <SectionTitle>应用场景</SectionTitle>
        <BookList items={[
          '游戏AI：如Atari游戏、棋类游戏等',
          '机器人控制：路径规划、动作控制',
          '资源调度：任务分配、负载均衡',
          '推荐系统：个性化推荐、广告投放',
        ]} />
      </div>
    ),
  },
  {
    label: '实战练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>练习1：基础策略梯度实现</SectionTitle>
        <BookParagraph>
          实现基本的策略梯度算法，包括策略更新和梯度计算。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现策略梯度核心算法',
          '实现梯度计算',
          '可视化学习过程',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={basicPGCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习2：策略梯度控制</SectionTitle>
        <BookParagraph>
          实现策略梯度控制算法，学习最优策略。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现策略梯度控制算法',
          '实现策略改进',
          '可视化学习过程',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={pgControlCode} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题练习</PageTitle>

        <SectionTitle>例题1：迷宫策略梯度</SectionTitle>
        <BookParagraph>
          在一个迷宫中，智能体需要从起点到达终点。迷宫中有障碍物和奖励点，智能体需要学习最优路径以最大化累积奖励。
        </BookParagraph>
        <BookParagraph><b>解题思路：</b></BookParagraph>
        <BookList items={[
          '使用策略梯度算法学习最优策略',
          '定义状态空间和动作空间',
          '实现奖励函数',
          '使用随机策略进行探索',
        ]} />
        <BookParagraph><b>完整代码</b></BookParagraph>
        <BookCode language="python" code={mazePGCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>思路分析</SectionTitle>
        <BookParagraph>
          策略梯度迷宫的核心是直接对策略进行参数化，通过梯度上升来最大化期望回报。与Q-Learning不同，策略梯度不使用Q值表，而是直接维护一个策略矩阵，根据策略概率选择动作。
        </BookParagraph>
        <BookList items={[
          '策略矩阵：每个状态下的动作概率分布',
          '更新方式：使用奖励信号直接调整策略',
          '探索机制：通过随机策略自然实现探索',
          '收敛特点：可能收敛到局部最优',
        ]} />
      </div>
    ),
  },
]

export default function RlPolicyGradientPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
