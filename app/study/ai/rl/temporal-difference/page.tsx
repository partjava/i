'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const td0Code = `import numpy as np
import matplotlib.pyplot as plt

def td0_prediction(env, policy, alpha=0.1, gamma=0.9, episodes=500):
    """
    TD(0)预测算法
    env: 环境对象
    policy: 策略函数
    alpha: 学习率
    gamma: 折扣因子
    episodes: 训练回合数
    """
    V = np.zeros(env.observation_space.n)
    for _ in range(episodes):
        state = env.reset()
        done = False
        while not done:
            action = policy(state)
            next_state, reward, done, _ = env.step(action)
            # TD(0)更新
            V[state] += alpha * (reward + gamma * V[next_state] - V[state])
            state = next_state
    return V

def plot_value(V, shape=(4,4)):
    plt.figure(figsize=(6,6))
    plt.imshow(V.reshape(shape), cmap='viridis')
    plt.colorbar(label='Value')
    plt.title('状态价值函数')
    plt.show()`

const qlCode = `import numpy as np
import matplotlib.pyplot as plt

def epsilon_greedy(Q, state, epsilon=0.1):
    """
    ε-贪婪策略
    Q: 状态-动作价值表
    state: 当前状态
    epsilon: 探索概率
    """
    if np.random.rand() < epsilon:
        return np.random.choice(len(Q[state]))
    return np.argmax(Q[state])

def q_learning(env, episodes=500, alpha=0.1, gamma=0.9, epsilon=0.1):
    """
    Q-Learning算法
    env: 环境对象
    episodes: 训练回合数
    alpha: 学习率
    gamma: 折扣因子
    epsilon: 探索概率
    """
    Q = np.zeros((env.observation_space.n, env.action_space.n))
    for _ in range(episodes):
        state = env.reset()
        done = False
        while not done:
            action = epsilon_greedy(Q, state, epsilon)
            next_state, reward, done, _ = env.step(action)
            # Q-Learning更新
            Q[state][action] += alpha * (reward + gamma * np.max(Q[next_state]) - Q[state][action])
            state = next_state
    policy = np.argmax(Q, axis=1)
    return Q, policy

def plot_policy(policy, shape=(4,4)):
    plt.figure(figsize=(6,6))
    grid = np.array(policy).reshape(shape)
    plt.imshow(grid, cmap='viridis')
    for i in range(shape[0]):
        for j in range(shape[1]):
            plt.text(j, i, str(grid[i,j]), ha='center', va='center', color='white')
    plt.title('最优策略')
    plt.show()`

const tdGridworldCode = `import numpy as np
import random
import matplotlib.pyplot as plt

class GridWorld:
    def __init__(self, shape=(4,4), terminal_states=[0,15], obstacles=[]):
        # shape: 网格世界的行列数
        # terminal_states: 终止状态列表
        # obstacles: 障碍格子列表
        self.shape = shape
        self.terminal_states = terminal_states
        self.obstacles = obstacles
        self.n = shape[0] * shape[1]
        self.action_space = [0,1,2,3]  # 0上 1右 2下 3左
        self.reset()
    def reset(self):
        # 重置到起点
        self.state = 0
        return self.state
    def step(self, action):
        # 计算下一个状态
        row, col = divmod(self.state, self.shape[1])
        if action == 0 and row > 0: row -= 1
        elif action == 1 and col < self.shape[1]-1: col += 1
        elif action == 2 and row < self.shape[0]-1: row += 1
        elif action == 3 and col > 0: col -= 1
        next_state = row * self.shape[1] + col
        # 遇到障碍则原地不动
        if next_state in self.obstacles:
            next_state = self.state
        # 到达终点奖励为1，否则为0
        reward = 1 if next_state == self.terminal_states[1] else 0
        done = next_state in self.terminal_states
        self.state = next_state
        return next_state, reward, done, {}

def random_policy(state):
    # 随机策略
    return random.choice([0,1,2,3])

def td0_prediction(env, policy, alpha=0.1, gamma=0.9, episodes=500):
    """
    TD(0)预测算法
    env: 环境对象
    policy: 策略函数
    alpha: 学习率
    gamma: 折扣因子
    episodes: 训练回合数
    """
    V = np.zeros(env.n)
    for _ in range(episodes):
        state = env.reset()
        done = False
        while not done:
            action = policy(state)
            next_state, reward, done, _ = env.step(action)
            # TD(0)更新
            V[state] += alpha * (reward + gamma * V[next_state] - V[state])
            state = next_state
    return V

def plot_value(V, shape=(4,4)):
    # 可视化状态价值函数
    plt.figure(figsize=(6,6))
    plt.imshow(V.reshape(shape), cmap='viridis')
    plt.colorbar(label='Value')
    plt.title('状态价值函数')
    plt.show()`

const META: LessonMeta = {
  subject: '强化学习',
  chapterTitle: '时序差分学习',
  chapterNumber: 5,
  totalChapters: 14,
  subjectHref: '/study/ai/rl',
  prevChapter: { label: '蒙特卡洛方法', href: '/study/ai/rl/monte-carlo' },
  nextChapter: { label: 'Q-Learning', href: '/study/ai/rl/q-learning' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>时序差分学习概述</PageTitle>

        <SectionTitle>基本概念</SectionTitle>
        <BookParagraph>
          时序差分（TD）学习是一类结合了动态规划和蒙特卡洛思想的强化学习方法。它通过当前状态和下一个状态的估计来更新价值函数，无需完整回合即可学习。
        </BookParagraph>
        <BookParagraph>
          <b>核心思想：</b>通过「当前估计」与「下一个估计」之间的差值（TD误差）来修正价值。
        </BookParagraph>

        <div className="flex justify-center">
          <svg width="100%" height="100" viewBox="0 0 500 100">
            <rect x="40" y="30" width="70" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="75" y="52" textAnchor="middle" fill="black" fontSize="12">状态s</text>
            <path d="M110 47 L160 47" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_td)"/>
            <rect x="160" y="30" width="70" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="195" y="52" textAnchor="middle" fill="black" fontSize="12">动作a</text>
            <path d="M230 47 L280 47" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_td)"/>
            <rect x="280" y="30" width="70" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="315" y="52" textAnchor="middle" fill="black" fontSize="12">奖励r</text>
            <path d="M350 47 L400 47" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_td)"/>
            <rect x="400" y="30" width="70" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="435" y="52" textAnchor="middle" fill="black" fontSize="12">下状态s'</text>
            <defs>
              <marker id="arrowhead_td" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
              </marker>
            </defs>
          </svg>
        </div>

        <SectionTitle>主要类型与算法流程</SectionTitle>
        <BookList items={[
          'TD(0)预测：利用一步时序差分更新状态价值函数',
          'SARSA：基于当前策略的在线控制方法',
          'Q-Learning：基于最优动作的离线控制方法',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <div className="flex justify-center">
          <svg width="100%" height="100" viewBox="0 0 600 100">
            <rect x="30" y="30" width="80" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="70" y="52" textAnchor="middle" fill="black" fontSize="11">初始化V</text>
            <path d="M110 47 L170 47" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_td2)"/>
            <rect x="170" y="30" width="100" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="220" y="52" textAnchor="middle" fill="black" fontSize="11">采样(s,a,r,s')</text>
            <path d="M270 47 L330 47" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_td2)"/>
            <rect x="330" y="30" width="80" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="370" y="52" textAnchor="middle" fill="black" fontSize="11">TD更新</text>
            <path d="M410 47 L470 47" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_td2)"/>
            <rect x="470" y="30" width="100" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="520" y="52" textAnchor="middle" fill="black" fontSize="11">下一个回合</text>
            <defs>
              <marker id="arrowhead_td2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
              </marker>
            </defs>
          </svg>
        </div>

        <SectionTitle>应用场景</SectionTitle>
        <BookList items={[
          '博弈游戏：如围棋、国际象棋等回合制游戏',
          '机器人控制：路径规划、动作序列学习',
          '推荐系统：用户行为序列分析',
          '金融市场：投资组合优化、风险评估',
        ]} />
      </div>
    ),
  },
  {
    label: '实战练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>练习1：TD(0)预测</SectionTitle>
        <BookParagraph>
          实现TD(0)方法来估计给定策略下的状态价值函数。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现TD(0)预测算法',
          '计算状态价值函数',
          '可视化价值函数变化',
        ]} />
        <BookParagraph><b>完整代码</b></BookParagraph>
        <BookCode language="python" code={td0Code} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习2：Q-Learning控制</SectionTitle>
        <BookParagraph>
          实现Q-Learning算法，学习最优策略。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现Q-Learning算法',
          '实现ε-贪婪策略',
          '可视化Q函数和策略',
        ]} />
        <BookParagraph><b>完整代码</b></BookParagraph>
        <BookCode language="python" code={qlCode} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题练习</PageTitle>

        <SectionTitle>例题1：网格世界TD(0)预测</SectionTitle>
        <BookParagraph>
          在4x4网格世界中，使用TD(0)方法估计每个状态的价值。
        </BookParagraph>
        <BookParagraph><b>解题思路：</b></BookParagraph>
        <BookList items={[
          '定义网格世界环境',
          '实现TD(0)预测算法',
          '可视化状态价值函数',
        ]} />
        <BookParagraph><b>完整代码</b></BookParagraph>
        <BookCode language="python" code={tdGridworldCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>例题2：Q-Learning走迷宫</SectionTitle>
        <BookParagraph>
          在一个迷宫环境中，使用Q-Learning算法学习最优路径。
        </BookParagraph>
        <BookParagraph><b>解题思路：</b></BookParagraph>
        <BookList items={[
          '定义迷宫环境',
          '实现Q-Learning算法',
          '可视化最优策略',
        ]} />
        <BookParagraph><b>参考代码</b></BookParagraph>
        <BookParagraph>
          这里可参考上面Q-Learning代码。
        </BookParagraph>
      </div>
    ),
  },
]

export default function DlTemporalDifferencePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
