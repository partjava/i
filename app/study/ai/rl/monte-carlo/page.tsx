'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const mcPredictionCode = `import numpy as np
import matplotlib.pyplot as plt

def first_visit_mc_prediction(env, policy, num_episodes=1000, gamma=0.9):
    """
    首次访问MC预测算法
    env: 环境对象
    policy: 策略函数
    num_episodes: 采样回合数
    gamma: 折扣因子
    """
    V = np.zeros(env.observation_space.n)  # 初始化价值函数
    returns_count = np.zeros(env.observation_space.n)  # 访问计数
    returns_sum = np.zeros(env.observation_space.n)  # 回报总和

    for _ in range(num_episodes):
        # 生成回合
        episode = []
        state = env.reset()
        done = False
        while not done:
            action = policy(state)
            next_state, reward, done, _ = env.step(action)
            episode.append((state, action, reward))
            state = next_state

        # 计算回报并更新价值函数
        G = 0
        states_seen = set()
        for t in range(len(episode)-1, -1, -1):
            state, _, reward = episode[t]
            G = gamma * G + reward

            if state not in states_seen:
                states_seen.add(state)
                returns_sum[state] += G
                returns_count[state] += 1
                V[state] = returns_sum[state] / returns_count[state]

    return V

def plot_value_function(V, env_shape=(4,4)):
    """
    可视化价值函数
    V: 价值函数
    env_shape: 环境形状
    """
    plt.figure(figsize=(8,6))
    plt.imshow(V.reshape(env_shape), cmap='viridis')
    plt.colorbar(label='Value')
    plt.title('State Value Function')
    for i in range(env_shape[0]):
        for j in range(env_shape[1]):
            plt.text(j, i, f'{V[i*env_shape[1]+j]:.2f}',
                    ha='center', va='center', color='white')
    plt.show()`

const mcControlCode = `import numpy as np
import matplotlib.pyplot as plt

def epsilon_greedy_policy(Q, state, epsilon=0.1):
    """
    ε-贪婪策略
    Q: 动作价值函数
    state: 当前状态
    epsilon: 探索概率
    """
    if np.random.random() < epsilon:
        return np.random.choice(len(Q[state]))
    else:
        return np.argmax(Q[state])

def mc_control(env, num_episodes=1000, gamma=0.9, epsilon=0.1):
    """
    蒙特卡洛控制算法
    env: 环境对象
    num_episodes: 采样回合数
    gamma: 折扣因子
    epsilon: 探索概率
    """
    Q = np.zeros((env.observation_space.n, env.action_space.n))
    returns_count = np.zeros_like(Q)
    returns_sum = np.zeros_like(Q)

    for _ in range(num_episodes):
        # 生成回合
        episode = []
        state = env.reset()
        done = False
        while not done:
            action = epsilon_greedy_policy(Q, state, epsilon)
            next_state, reward, done, _ = env.step(action)
            episode.append((state, action, reward))
            state = next_state

        # 计算回报并更新Q值
        G = 0
        state_action_pairs = set()
        for t in range(len(episode)-1, -1, -1):
            state, action, reward = episode[t]
            G = gamma * G + reward

            if (state, action) not in state_action_pairs:
                state_action_pairs.add((state, action))
                returns_sum[state][action] += G
                returns_count[state][action] += 1
                Q[state][action] = returns_sum[state][action] / returns_count[state][action]

    # 导出确定性策略
    policy = np.argmax(Q, axis=1)
    return Q, policy

def plot_policy(policy, env_shape=(4,4)):
    """
    可视化策略
    policy: 策略数组
    env_shape: 环境形状
    """
    plt.figure(figsize=(8,6))
    policy_grid = policy.reshape(env_shape)
    plt.imshow(policy_grid, cmap='viridis')

    # 添加箭头表示动作
    for i in range(env_shape[0]):
        for j in range(env_shape[1]):
            action = policy_grid[i,j]
            if action == 0:  # 上
                plt.arrow(j, i, 0, -0.3, head_width=0.1, head_length=0.1, fc='white', ec='white')
            elif action == 1:  # 右
                plt.arrow(j, i, 0.3, 0, head_width=0.1, head_length=0.1, fc='white', ec='white')
            elif action == 2:  # 下
                plt.arrow(j, i, 0, 0.3, head_width=0.1, head_length=0.1, fc='white', ec='white')
            else:  # 左
                plt.arrow(j, i, -0.3, 0, head_width=0.1, head_length=0.1, fc='white', ec='white')

    plt.colorbar(label='Action')
    plt.title('Policy')
    plt.show()`

const banditCode = `import numpy as np
import random
import matplotlib.pyplot as plt

class Bandit:
    def __init__(self, k):
        # k为老虎机臂数
        self.k = k
        # 每个臂的真实均值奖励，正态分布生成
        self.q_true = np.random.normal(0, 1, k)
        # 每个臂的价值估计
        self.q_est = np.zeros(k)
        # 每个臂被拉动的次数
        self.action_count = np.zeros(k)

    def step(self, action):
        # 根据真实均值生成奖励
        reward = np.random.normal(self.q_true[action], 1)
        # 更新动作计数
        self.action_count[action] += 1
        # 增量式更新价值估计
        self.q_est[action] += (reward - self.q_est[action]) / self.action_count[action]
        return reward

def epsilon_greedy(q_est, epsilon):
    """
    ε-贪婪策略：以epsilon概率随机探索，否则选择当前价值最高的动作
    q_est: 各动作的价值估计
    epsilon: 探索概率
    """
    if random.random() < epsilon:
        # 探索：随机选择一个动作
        return random.randint(0, len(q_est) - 1)
    # 利用：选择当前价值最高的动作
    return np.argmax(q_est)

def run_bandit(k=10, steps=1000, epsilon=0.1):
    """
    运行多臂赌博机实验
    k: 臂数
    steps: 总步数
    epsilon: 探索概率
    """
    bandit = Bandit(k)
    rewards = []
    for _ in range(steps):
        action = epsilon_greedy(bandit.q_est, epsilon)
        reward = bandit.step(action)
        rewards.append(reward)
    return rewards, bandit.q_est

if __name__ == '__main__':
    rewards, q_est = run_bandit()
    # 绘制平均奖励曲线
    plt.plot(np.cumsum(rewards) / (np.arange(len(rewards)) + 1))
    plt.xlabel('步数')
    plt.ylabel('平均奖励')
    plt.title('多臂赌博机-ε贪婪策略')
    plt.show()`

const gridworldMCCode = `import numpy as np
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

def epsilon_greedy(Q, state, epsilon=0.1):
    """
    ε-贪婪策略：以epsilon概率随机探索，否则选择当前Q值最大的动作
    Q: 状态-动作价值表
    state: 当前状态
    epsilon: 探索概率
    """
    if random.random() < epsilon:
        # 探索
        return random.choice(range(len(Q[state])))
    # 利用
    return np.argmax(Q[state])

def mc_control(env, num_episodes=500, gamma=0.9, epsilon=0.1):
    """
    蒙特卡洛控制算法，学习最优策略
    env: 环境对象
    num_episodes: 采样回合数
    gamma: 折扣因子
    epsilon: 探索概率
    """
    Q = np.zeros((env.n, len(env.action_space)))
    returns_count = np.zeros_like(Q)
    returns_sum = np.zeros_like(Q)
    for _ in range(num_episodes):
        episode = []
        state = env.reset()
        done = False
        while not done:
            action = epsilon_greedy(Q, state, epsilon)
            next_state, reward, done, _ = env.step(action)
            episode.append((state, action, reward))
            state = next_state
        G = 0
        state_action_pairs = set()
        for t in range(len(episode)-1, -1, -1):
            state, action, reward = episode[t]
            G = gamma * G + reward
            if (state, action) not in state_action_pairs:
                state_action_pairs.add((state, action))
                returns_sum[state][action] += G
                returns_count[state][action] += 1
                Q[state][action] = returns_sum[state][action] / returns_count[state][action]
    policy = np.argmax(Q, axis=1)
    return Q, policy

def plot_policy(policy, shape=(4,4)):
    """
    可视化策略
    policy: 策略数组
    shape: 网格形状
    """
    plt.figure(figsize=(6,6))
    grid = np.array(policy).reshape(shape)
    plt.imshow(grid, cmap='viridis')
    for i in range(shape[0]):
        for j in range(shape[1]):
            plt.text(j, i, str(grid[i,j]), ha='center', va='center', color='white')
    plt.title('最优策略')
    plt.show()

if __name__ == '__main__':
    env = GridWorld()
    Q, policy = mc_control(env)
    plot_policy(policy)`

const blackjackCode = `import numpy as np
import random
from collections import defaultdict

class Blackjack:
    def __init__(self):
        # 初始化玩家和庄家手牌
        self.reset()
    def reset(self):
        # 玩家点数12~21，庄家明牌1~10
        self.player = random.randint(12, 21)
        self.dealer = random.randint(1, 10)
        return (self.player, self.dealer)
    def step(self, action):
        # action=0: 停止，action=1: 要牌
        if action == 0:  # 停止
            done = True
            # 玩家点数大于庄家且不爆牌则胜利
            reward = 1 if self.player > self.dealer and self.player <= 21 else -1
        else:  # 要牌
            self.player += random.randint(1, 10)
            if self.player > 21:
                done = True
                reward = -1  # 爆牌
            else:
                done = False
                reward = 0
        return (self.player, self.dealer), reward, done, {}

def policy(state):
    # 简单策略：点数20及以上停止，否则要牌
    player, dealer = state
    return 0 if player >= 20 else 1

def mc_prediction(env, policy, num_episodes=500, gamma=1.0):
    """
    蒙特卡洛预测，评估策略下的状态价值
    env: 环境对象
    policy: 策略函数
    num_episodes: 回合数
    gamma: 折扣因子
    """
    returns = defaultdict(list)
    V = defaultdict(float)
    for _ in range(num_episodes):
        episode = []
        state = env.reset()
        done = False
        while not done:
            action = policy(state)
            next_state, reward, done, _ = env.step(action)
            episode.append((state, reward))
            state = next_state
        G = 0
        states_visited = set()
        for t in range(len(episode)-1, -1, -1):
            state, reward = episode[t]
            G = gamma * G + reward
            if state not in states_visited:
                returns[state].append(G)
                V[state] = np.mean(returns[state])
                states_visited.add(state)
    return V

if __name__ == '__main__':
    env = Blackjack()
    V = mc_prediction(env, policy)
    print('部分状态价值：')
    for k in list(V.keys())[:10]:
        print(f'{k}: {V[k]:.2f}')`

const META: LessonMeta = {
  subject: '强化学习',
  chapterTitle: '蒙特卡洛方法',
  chapterNumber: 4,
  totalChapters: 14,
  subjectHref: '/study/ai/rl',
  prevChapter: { label: '动态规划', href: '/study/ai/rl/dynamic-programming' },
  nextChapter: { label: '时序差分学习', href: '/study/ai/rl/temporal-difference' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>蒙特卡洛方法概述</PageTitle>

        <SectionTitle>基本概念</SectionTitle>
        <BookParagraph>
          蒙特卡洛方法是一类通过采样和统计来解决问题的方法。在强化学习中，蒙特卡洛方法通过采样完整的状态-动作序列来学习价值函数和最优策略，不需要环境模型的完整知识。
        </BookParagraph>
        <BookParagraph>
          <b>核心思想：</b>通过大量随机采样和实际经验来估计期望值和概率分布。
        </BookParagraph>

        <SectionTitle>主要方法</SectionTitle>
        <BookList items={[
          '首次访问MC方法：只考虑每个回合中状态或状态-动作对的首次出现',
          '每次访问MC方法：考虑每个回合中状态或状态-动作对的所有出现',
          '探索起始MC方法：通过随机选择初始状态-动作对来保证探索',
          '离线MC控制：基于完整回合数据进行策略评估和改进',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>算法流程</SectionTitle>
        <BookParagraph><b>首次访问MC预测</b></BookParagraph>
        <BookList items={[
          '初始化价值函数和回报计数器',
          '生成一个回合的经验',
          '对回合中首次出现的每个状态',
          '计算该状态后续的回报',
          '更新价值函数估计',
        ]} />
        <BookParagraph><b>MC控制</b></BookParagraph>
        <BookList items={[
          '初始化Q函数和策略',
          '生成回合经验',
          '对每个状态-动作对更新Q值',
          '改进策略（ε-贪婪）',
          '重复直到收敛',
        ]} />

        <SectionTitle>应用场景</SectionTitle>
        <BookList items={[
          '博弈游戏：如围棋、国际象棋等回合制游戏',
          '金融市场：投资组合优化、风险评估',
          '机器人控制：路径规划、动作序列学习',
          '推荐系统：用户行为序列分析',
        ]} />
      </div>
    ),
  },
  {
    label: '实战练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>练习1：首次访问MC预测</SectionTitle>
        <BookParagraph>
          实现首次访问蒙特卡洛方法来估计给定策略下的状态价值函数。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现首次访问MC预测算法',
          '计算状态价值函数',
          '可视化价值函数变化',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={mcPredictionCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习2：MC控制</SectionTitle>
        <BookParagraph>
          实现蒙特卡洛控制算法，学习最优策略。使用ε-贪婪策略进行探索。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现MC控制算法',
          '实现ε-贪婪策略',
          '可视化Q函数和策略',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={mcControlCode} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题练习</PageTitle>

        <SectionTitle>例题1：多臂赌博机问题</SectionTitle>
        <BookParagraph>
          有k个不同的老虎机（赌博机），每个老虎机有不同的奖励分布。玩家每次只能选择一个老虎机拉动，目标是在有限次数的尝试中最大化总收益。这是探索与利用权衡的经典问题。
        </BookParagraph>
        <BookParagraph><b>解题思路：</b></BookParagraph>
        <BookList items={[
          '使用ε-贪婪策略进行动作选择',
          '维护每个老虎机的价值估计',
          '根据实际收益更新价值估计',
          '平衡探索新的老虎机和利用已知的高收益老虎机',
        ]} />
        <BookParagraph><b>完整代码</b></BookParagraph>
        <BookCode language="python" code={banditCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>例题2：网格世界导航</SectionTitle>
        <BookParagraph>
          在一个网格世界中，智能体需要从起点导航到终点。网格中有障碍物和奖励点，智能体需要学习最优路径以最大化累积奖励。
        </BookParagraph>
        <BookParagraph><b>解题思路：</b></BookParagraph>
        <BookList items={[
          '使用MC控制算法学习最优策略',
          '采样完整的导航回合',
          '更新状态-动作值函数',
          '使用ε-贪婪策略进行改进',
        ]} />
        <BookParagraph><b>完整代码</b></BookParagraph>
        <BookCode language="python" code={gridworldMCCode} />

        <SectionTitle>例题3：黑杰克游戏</SectionTitle>
        <BookParagraph>
          在黑杰克游戏中，玩家需要决定是继续要牌还是停止。目标是使手中牌的点数尽可能接近21点但不超过21点。这是一个经典的MC方法应用场景。
        </BookParagraph>
        <BookParagraph><b>解题思路：</b></BookParagraph>
        <BookList items={[
          '使用MC预测评估当前策略',
          '考虑玩家手牌和庄家明牌',
          '计算不同状态下的价值函数',
          '通过大量模拟优化策略',
        ]} />
        <BookParagraph><b>完整代码</b></BookParagraph>
        <BookCode language="python" code={blackjackCode} />
      </div>
    ),
  },
]

export default function DlMonteCarloPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
