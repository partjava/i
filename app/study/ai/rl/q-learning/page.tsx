'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const basicQLCode = `import numpy as np
import matplotlib.pyplot as plt

class QLearning:
    def __init__(self, states, actions, learning_rate=0.1, discount_factor=0.9, epsilon=0.1):
        """
        初始化Q-Learning算法
        states: 状态空间大小
        actions: 动作空间大小
        learning_rate: 学习率
        discount_factor: 折扣因子
        epsilon: 探索概率
        """
        self.states = states
        self.actions = actions
        self.learning_rate = learning_rate
        self.discount_factor = discount_factor
        self.epsilon = epsilon
        self.q_table = np.zeros((states, actions))

    def choose_action(self, state):
        """
        使用ε-贪婪策略选择动作
        state: 当前状态
        """
        if np.random.random() < self.epsilon:
            return np.random.choice(self.actions)
        return np.argmax(self.q_table[state])

    def learn(self, state, action, reward, next_state):
        """
        更新Q值
        state: 当前状态
        action: 执行的动作
        reward: 获得的奖励
        next_state: 下一个状态
        """
        old_value = self.q_table[state, action]
        next_max = np.max(self.q_table[next_state])
        new_value = (1 - self.learning_rate) * old_value + \\
                    self.learning_rate * (reward + self.discount_factor * next_max)
        self.q_table[state, action] = new_value

    def plot_q_values(self):
        """
        可视化Q值
        """
        plt.figure(figsize=(10, 6))
        plt.imshow(self.q_table, cmap='viridis')
        plt.colorbar(label='Q Value')
        plt.title('Q-Value Table')
        plt.xlabel('Actions')
        plt.ylabel('States')
        plt.show()`

const qlControlCode = `import numpy as np
import matplotlib.pyplot as plt

class QLearningControl:
    def __init__(self, env, learning_rate=0.1, discount_factor=0.9, epsilon=0.1):
        """
        初始化Q-Learning控制算法
        env: 环境对象
        learning_rate: 学习率
        discount_factor: 折扣因子
        epsilon: 探索概率
        """
        self.env = env
        self.learning_rate = learning_rate
        self.discount_factor = discount_factor
        self.epsilon = epsilon
        self.q_table = np.zeros((env.observation_space.n, env.action_space.n))

    def choose_action(self, state):
        """
        使用ε-贪婪策略选择动作
        state: 当前状态
        """
        if np.random.random() < self.epsilon:
            return self.env.action_space.sample()
        return np.argmax(self.q_table[state])

    def learn(self, state, action, reward, next_state):
        """
        更新Q值
        state: 当前状态
        action: 执行的动作
        reward: 获得的奖励
        next_state: 下一个状态
        """
        old_value = self.q_table[state, action]
        next_max = np.max(self.q_table[next_state])
        new_value = (1 - self.learning_rate) * old_value + \\
                    self.learning_rate * (reward + self.discount_factor * next_max)
        self.q_table[state, action] = new_value

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
                self.learn(state, action, reward, next_state)
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

const mazeQLCode = `import numpy as np
import matplotlib.pyplot as plt

class MazeQLearning:
    def __init__(self, maze_size, learning_rate=0.1, discount_factor=0.9, epsilon=0.1):
        """
        初始化迷宫Q-Learning
        maze_size: 迷宫大小
        learning_rate: 学习率
        discount_factor: 折扣因子
        epsilon: 探索概率
        """
        self.maze_size = maze_size
        self.learning_rate = learning_rate
        self.discount_factor = discount_factor
        self.epsilon = epsilon
        self.q_table = np.zeros((maze_size, maze_size, 4))  # 4个动作：上、右、下、左

    def choose_action(self, state):
        """
        使用ε-贪婪策略选择动作
        state: 当前状态坐标
        """
        if np.random.random() < self.epsilon:
            return np.random.choice(4)
        return np.argmax(self.q_table[state[0], state[1]])

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

    def learn(self, state, action, reward, next_state):
        """
        更新Q值
        state: 当前状态
        action: 执行的动作
        reward: 获得的奖励
        next_state: 下一个状态
        """
        old_value = self.q_table[state[0], state[1], action]
        next_max = np.max(self.q_table[next_state[0], next_state[1]])
        new_value = (1 - self.learning_rate) * old_value + \\
                    self.learning_rate * (reward + self.discount_factor * next_max)
        self.q_table[state[0], state[1], action] = new_value

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
                self.learn(state, action, reward, next_state)
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
        plt.imshow(np.max(self.q_table, axis=2), cmap='viridis')
        plt.colorbar(label='Q Value')
        plt.title('Maze Q-Values')
        plt.show()

if __name__ == '__main__':
    maze = MazeQLearning(maze_size=5)
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
  chapterTitle: 'Q-Learning算法',
  chapterNumber: 6,
  totalChapters: 14,
  subjectHref: '/study/ai/rl',
  prevChapter: { label: '时序差分学习', href: '/study/ai/rl/temporal-difference' },
  nextChapter: { label: '策略梯度', href: '/study/ai/rl/policy-gradient' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>Q-Learning算法概述</PageTitle>

        <SectionTitle>基本概念</SectionTitle>
        <BookParagraph>
          Q-Learning是一种基于值迭代的强化学习算法，它通过不断更新状态-动作值函数（Q函数）来学习最优策略。Q-Learning是一种无模型（model-free）的算法，不需要环境模型，可以直接从经验中学习。
        </BookParagraph>
        <BookParagraph>
          <b>核心思想：</b>通过时序差分学习更新Q值，逐步逼近最优策略。
        </BookParagraph>

        <div className="flex justify-center">
          <svg width="100%" height="180" viewBox="0 0 600 180">
            <defs>
              <marker id="arrowhead_ql1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
              </marker>
            </defs>
            <rect x="50" y="40" width="100" height="50" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="100" y="70" textAnchor="middle" fill="black" fontSize="13">状态s</text>
            <path d="M150 65 L180 65" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_ql1)"/>
            <rect x="180" y="40" width="100" height="50" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="230" y="70" textAnchor="middle" fill="black" fontSize="13">动作a</text>
            <path d="M280 65 L310 65" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_ql1)"/>
            <rect x="310" y="40" width="100" height="50" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="360" y="70" textAnchor="middle" fill="black" fontSize="13">奖励r</text>
            <path d="M360 90 L360 130 L100 130 L100 90" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_ql1)"/>
            <text x="230" y="155" textAnchor="middle" fill="black" fontSize="13">Q值更新</text>
          </svg>
        </div>

        <SectionTitle>算法原理</SectionTitle>
        <BookList items={[
          'Q值更新公式：Q(s,a) ← Q(s,a) + α[r + γ·max(Q(s\',a\')) - Q(s,a)]',
          '参数说明：α(学习率)，γ(折扣因子)，r(即时奖励)',
          '探索策略：ε-贪婪策略平衡探索与利用',
          '收敛性：在满足条件下保证收敛到最优策略',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <div className="flex justify-center">
          <svg width="100%" height="160" viewBox="0 0 600 160">
            <circle cx="100" cy="80" r="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="100" y="80" textAnchor="middle" dominantBaseline="middle" fill="black" fontSize="12">选择动作</text>
            <line x1="135" y1="80" x2="160" y2="80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_ql2)"/>
            <circle cx="200" cy="80" r="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="200" y="80" textAnchor="middle" dominantBaseline="middle" fill="black" fontSize="12">执行动作</text>
            <line x1="235" y1="80" x2="260" y2="80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_ql2)"/>
            <circle cx="300" cy="80" r="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="300" y="80" textAnchor="middle" dominantBaseline="middle" fill="black" fontSize="12">观察奖励</text>
            <line x1="335" y1="80" x2="360" y2="80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_ql2)"/>
            <circle cx="400" cy="80" r="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="400" y="80" textAnchor="middle" dominantBaseline="middle" fill="black" fontSize="12">更新Q值</text>
            <defs>
              <marker id="arrowhead_ql2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
              </marker>
            </defs>
          </svg>
        </div>

        <SectionTitle>优势与特点</SectionTitle>
        <BookList items={[
          '无模型学习：不需要环境模型，直接从经验中学习',
          '离线学习：可以使用历史数据进行学习',
          '收敛性保证：在适当条件下保证收敛到最优策略',
          '简单实现：算法简单，易于理解和实现',
        ]} />

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

        <SectionTitle>练习1：基础Q-Learning实现</SectionTitle>
        <BookParagraph>
          实现基本的Q-Learning算法，包括Q值更新和ε-贪婪策略。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现Q-Learning核心算法',
          '实现ε-贪婪策略',
          '可视化学习过程',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={basicQLCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习2：Q-Learning控制</SectionTitle>
        <BookParagraph>
          实现Q-Learning控制算法，学习最优策略。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现Q-Learning控制算法',
          '实现策略改进',
          '可视化学习过程',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={qlControlCode} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题练习</PageTitle>

        <SectionTitle>例题1：迷宫Q-Learning</SectionTitle>
        <BookParagraph>
          在一个迷宫中，智能体需要从起点到达终点。迷宫中有障碍物和奖励点，智能体需要学习最优路径以最大化累积奖励。
        </BookParagraph>
        <BookParagraph><b>解题思路：</b></BookParagraph>
        <BookList items={[
          '使用Q-Learning算法学习最优策略',
          '定义状态空间和动作空间',
          '实现奖励函数',
          '使用ε-贪婪策略进行探索',
        ]} />
        <BookParagraph><b>完整代码</b></BookParagraph>
        <BookCode language="python" code={mazeQLCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>思路分析</SectionTitle>
        <BookParagraph>
          迷宫Q-Learning的核心是构建一个Q表，其中每个状态-动作对都对应一个Q值。智能体通过不断地在迷宫中探索，更新Q值表，最终学习到从起点到终点的最优路径。
        </BookParagraph>
        <BookList items={[
          '状态空间：迷宫中的每个格子坐标(x,y)',
          '动作空间：上、右、下、左四个方向',
          '奖励设计：到达终点获+1，其他为0',
          '策略优化：通过Q值迭代逐步收敛到最优',
        ]} />
      </div>
    ),
  },
]

export default function RlQLearningPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
