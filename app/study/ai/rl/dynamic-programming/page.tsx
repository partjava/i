'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const policyEvalCode = `import numpy as np
import matplotlib.pyplot as plt

def policy_evaluation(env, policy, gamma=0.9, theta=1e-6):
    """
    策略评估算法
    env: 环境对象
    policy: 策略矩阵，shape=(nS, nA)
    gamma: 折扣因子
    theta: 收敛阈值
    """
    V = np.zeros(env.nS)  # 初始化价值函数
    history = []  # 记录价值函数变化

    while True:
        delta = 0
        for s in range(env.nS):
            v = V[s]
            # 计算当前策略下的动作值
            action_values = np.zeros(env.nA)
            for a in range(env.nA):
                for prob, next_state, reward, done in env.P[s][a]:
                    action_values[a] += prob * (reward + gamma * V[next_state])

            # 更新价值函数
            V[s] = np.sum(policy[s] * action_values)
            delta = max(delta, abs(v - V[s]))

        history.append(V.copy())
        if delta < theta:
            break

    return V, history

def visualize_value_function(V, env_size=(4, 4)):
    """
    可视化价值函数
    V: 价值函数
    env_size: 环境大小
    """
    plt.figure(figsize=(8, 6))
    V_reshaped = V.reshape(env_size)
    plt.imshow(V_reshaped, cmap='viridis')
    plt.colorbar(label='Value')
    plt.title('State Value Function')

    # 添加数值标签
    for i in range(env_size[0]):
        for j in range(env_size[1]):
            plt.text(j, i, f'{V_reshaped[i,j]:.2f}',
                    ha='center', va='center', color='white')

    plt.show()

def visualize_value_history(history, env_size=(4, 4)):
    """
    可视化价值函数的变化过程
    history: 价值函数历史记录
    env_size: 环境大小
    """
    plt.figure(figsize=(12, 4))
    for i, V in enumerate(history):
        plt.subplot(1, len(history), i+1)
        V_reshaped = V.reshape(env_size)
        plt.imshow(V_reshaped, cmap='viridis')
        plt.title(f'Iteration {i+1}')
        plt.colorbar()
    plt.tight_layout()
    plt.show()

# 使用示例
if __name__ == "__main__":
    # 创建简单的网格世界环境
    class GridWorld:
        def __init__(self, size=4):
            self.nS = size * size
            self.nA = 4  # 上下左右
            self.size = size
            self.P = self._create_transitions()

        def _create_transitions(self):
            P = {}
            for s in range(self.nS):
                P[s] = {}
                for a in range(self.nA):
                    P[s][a] = self._get_transition(s, a)
            return P

        def _get_transition(self, s, a):
            # 实现状态转移逻辑
            # 返回 (概率, 下一状态, 奖励, 是否结束)
            return [(1.0, s, -1, False)]  # 简化版本

    # 创建环境和随机策略
    env = GridWorld()
    policy = np.ones([env.nS, env.nA]) / env.nA

    # 运行策略评估
    V, history = policy_evaluation(env, policy)

    # 可视化结果
    visualize_value_function(V)
    visualize_value_history(history)`

const valueIterCode = `import numpy as np
import matplotlib.pyplot as plt

def value_iteration(env, gamma=0.9, theta=1e-6):
    """
    价值迭代算法
    env: 环境对象
    gamma: 折扣因子
    theta: 收敛阈值
    """
    V = np.zeros(env.nS)  # 初始化价值函数
    history = []  # 记录价值函数变化

    while True:
        delta = 0
        for s in range(env.nS):
            v = V[s]
            # 计算所有动作的值
            action_values = np.zeros(env.nA)
            for a in range(env.nA):
                for prob, next_state, reward, done in env.P[s][a]:
                    action_values[a] += prob * (reward + gamma * V[next_state])

            # 更新价值函数
            V[s] = np.max(action_values)
            delta = max(delta, abs(v - V[s]))

        history.append(V.copy())
        if delta < theta:
            break

    # 从最优价值函数导出最优策略
    policy = np.zeros([env.nS, env.nA])
    for s in range(env.nS):
        action_values = np.zeros(env.nA)
        for a in range(env.nA):
            for prob, next_state, reward, done in env.P[s][a]:
                action_values[a] += prob * (reward + gamma * V[next_state])
        best_action = np.argmax(action_values)
        policy[s] = np.eye(env.nA)[best_action]

    return policy, V, history

def visualize_policy(policy, env_size=(4, 4)):
    """
    可视化策略
    policy: 策略矩阵
    env_size: 环境大小
    """
    plt.figure(figsize=(8, 6))
    policy_reshaped = policy.reshape(env_size + (4,))

    # 绘制网格
    for i in range(env_size[0] + 1):
        plt.axhline(y=i, color='gray', linestyle='-', alpha=0.3)
    for j in range(env_size[1] + 1):
        plt.axvline(x=j, color='gray', linestyle='-', alpha=0.3)

    # 绘制动作箭头
    for i in range(env_size[0]):
        for j in range(env_size[1]):
            state = i * env_size[1] + j
            best_action = np.argmax(policy[state])

            # 箭头方向
            if best_action == 0:  # 上
                plt.arrow(j+0.5, i+0.5, 0, -0.3, head_width=0.1, head_length=0.1, fc='blue', ec='blue')
            elif best_action == 1:  # 下
                plt.arrow(j+0.5, i+0.5, 0, 0.3, head_width=0.1, head_length=0.1, fc='blue', ec='blue')
            elif best_action == 2:  # 左
                plt.arrow(j+0.5, i+0.5, -0.3, 0, head_width=0.1, head_length=0.1, fc='blue', ec='blue')
            else:  # 右
                plt.arrow(j+0.5, i+0.5, 0.3, 0, head_width=0.1, head_length=0.1, fc='blue', ec='blue')

    plt.xlim(0, env_size[1])
    plt.ylim(0, env_size[0])
    plt.title('Optimal Policy')
    plt.show()

def visualize_value_history(history, env_size=(4, 4)):
    """
    可视化价值函数的变化过程
    history: 价值函数历史记录
    env_size: 环境大小
    """
    plt.figure(figsize=(12, 4))
    for i, V in enumerate(history):
        plt.subplot(1, len(history), i+1)
        V_reshaped = V.reshape(env_size)
        plt.imshow(V_reshaped, cmap='viridis')
        plt.title(f'Iteration {i+1}')
        plt.colorbar()
    plt.tight_layout()
    plt.show()

# 使用示例
if __name__ == "__main__":
    # 创建简单的网格世界环境
    class GridWorld:
        def __init__(self, size=4):
            self.nS = size * size
            self.nA = 4  # 上下左右
            self.size = size
            self.P = self._create_transitions()

        def _create_transitions(self):
            P = {}
            for s in range(self.nS):
                P[s] = {}
                for a in range(self.nA):
                    P[s][a] = self._get_transition(s, a)
            return P

        def _get_transition(self, s, a):
            # 实现状态转移逻辑
            # 返回 (概率, 下一状态, 奖励, 是否结束)
            return [(1.0, s, -1, False)]  # 简化版本

    # 创建环境
    env = GridWorld()

    # 运行价值迭代
    policy, V, history = value_iteration(env)

    # 可视化结果
    visualize_policy(policy)
    visualize_value_history(history)`

const policyIterCode = `import numpy as np

def policy_iteration(env, gamma=0.9, theta=1e-6):
    # 初始化随机策略
    policy = np.ones([env.nS, env.nA]) / env.nA

    while True:
        # 策略评估
        V = policy_evaluation(env, policy, gamma, theta)

        # 策略改进
        policy_stable = True
        for s in range(env.nS):
            old_action = np.argmax(policy[s])

            # 计算新的动作值
            action_values = np.zeros(env.nA)
            for a in range(env.nA):
                for prob, next_state, reward, done in env.P[s][a]:
                    action_values[a] += prob * (reward + gamma * V[next_state])

            # 更新策略
            best_action = np.argmax(action_values)
            policy[s] = np.eye(env.nA)[best_action]

            if old_action != best_action:
                policy_stable = False

        if policy_stable:
            break

    return policy, V

def value_iteration(env, gamma=0.9, theta=1e-6):
    V = np.zeros(env.nS)

    while True:
        delta = 0
        for s in range(env.nS):
            v = V[s]

            # 计算所有动作的值
            action_values = np.zeros(env.nA)
            for a in range(env.nA):
                for prob, next_state, reward, done in env.P[s][a]:
                    action_values[a] += prob * (reward + gamma * V[next_state])

            # 更新价值函数
            V[s] = np.max(action_values)
            delta = max(delta, abs(v - V[s]))

        if delta < theta:
            break

    # 从最优价值函数导出最优策略
    policy = np.zeros([env.nS, env.nA])
    for s in range(env.nS):
        action_values = np.zeros(env.nA)
        for a in range(env.nA):
            for prob, next_state, reward, done in env.P[s][a]:
                action_values[a] += prob * (reward + gamma * V[next_state])
        best_action = np.argmax(action_values)
        policy[s] = np.eye(env.nA)[best_action]

    return policy, V`

const resourceAllocCode = `import numpy as np

class ResourceAllocationMDP:
    def __init__(self, n_tasks, n_processors, execution_times):
        self.n_tasks = n_tasks
        self.n_processors = n_processors
        self.execution_times = execution_times  # shape: (n_tasks, n_processors)

    def get_states(self):
        # 返回所有可能的状态（已分配任务的组合）
        return range(2**self.n_tasks)

    def get_actions(self, state):
        # 返回当前状态下的可用动作（处理器选择）
        return range(self.n_processors)

    def get_transition(self, state, action):
        # 返回转移概率和下一个状态
        # 在这个确定性环境中，转移概率为1
        next_state = state | (1 << self._get_next_task(state))
        return [(1.0, next_state, -self._get_execution_time(state, action), False)]

    def _get_next_task(self, state):
        # 获取下一个未分配的任务
        for task in range(self.n_tasks):
            if not (state & (1 << task)):
                return task
        return None

    def _get_execution_time(self, state, action):
        # 计算当前分配下的执行时间
        total_time = 0
        for task in range(self.n_tasks):
            if state & (1 << task):
                total_time += self.execution_times[task][action]
        return total_time

def solve_resource_allocation(n_tasks, n_processors, execution_times):
    # 创建MDP环境
    env = ResourceAllocationMDP(n_tasks, n_processors, execution_times)

    # 使用价值迭代求解
    V = np.zeros(2**n_tasks)
    policy = np.zeros(2**n_tasks, dtype=int)

    while True:
        delta = 0
        for state in env.get_states():
            v = V[state]

            # 计算所有动作的值
            action_values = np.zeros(n_processors)
            for action in env.get_actions(state):
                for prob, next_state, reward, _ in env.get_transition(state, action):
                    action_values[action] += prob * (reward + V[next_state])

            # 更新价值函数和策略
            V[state] = np.max(action_values)
            policy[state] = np.argmax(action_values)

            delta = max(delta, abs(v - V[state]))

        if delta < 1e-6:
            break

    return policy, V

# 使用示例
n_tasks = 3
n_processors = 2
execution_times = np.array([
    [2, 3],  # 任务0在不同处理器上的执行时间
    [3, 2],  # 任务1在不同处理器上的执行时间
    [1, 4]   # 任务2在不同处理器上的执行时间
])

policy, V = solve_resource_allocation(n_tasks, n_processors, execution_times)
print("最优策略:", policy)
print("最优价值:", V)`

const META: LessonMeta = {
  subject: '强化学习',
  chapterTitle: '动态规划',
  chapterNumber: 3,
  totalChapters: 14,
  subjectHref: '/study/ai/rl',
  prevChapter: { label: '马尔可夫决策过程', href: '/study/ai/rl/mdp' },
  nextChapter: { label: '蒙特卡洛方法', href: '/study/ai/rl/monte-carlo' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>动态规划（Dynamic Programming）概述</PageTitle>

        <SectionTitle>基本概念</SectionTitle>
        <BookParagraph>
          动态规划是解决强化学习问题的一种重要方法，它通过将复杂问题分解为子问题，并存储子问题的解来避免重复计算。在强化学习中，动态规划主要用于计算最优策略和最优价值函数。
        </BookParagraph>
        <BookParagraph>
          <b>核心思想：</b>通过「分而治之」的方式，将复杂问题分解为更小的子问题，并利用子问题的解来构建原问题的解。
        </BookParagraph>

        <div className="flex justify-center">
          <svg width="100%" height="160" viewBox="0 0 400 160">
            <rect x="50" y="40" width="240" height="80" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="170" y="55" textAnchor="middle" fill="black" fontSize="13">原问题</text>
            <line x1="170" y1="80" x2="170" y2="95" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_dp)"/>
            <rect x="50" y="105" width="110" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="105" y="125" textAnchor="middle" fill="black" fontSize="11">子问题1</text>
            <rect x="180" y="105" width="110" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="235" y="125" textAnchor="middle" fill="black" fontSize="11">子问题2</text>
            <defs>
              <marker id="arrowhead_dp" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
              </marker>
            </defs>
          </svg>
        </div>

        <SectionTitle>主要算法</SectionTitle>
        <BookList items={[
          '策略评估（Policy Evaluation）：计算给定策略下的状态价值函数',
          '策略改进（Policy Improvement）：基于当前价值函数改进策略',
          '策略迭代（Policy Iteration）：交替进行策略评估和改进',
          '价值迭代（Value Iteration）：直接迭代计算最优价值函数',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <div className="flex justify-center">
          <svg width="100%" height="160" viewBox="0 0 500 160">
            <rect x="40" y="40" width="80" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="80" y="62" textAnchor="middle" fill="black" fontSize="11">策略评估</text>
            <path d="M120 57 L140 57" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_dp2)"/>
            <rect x="140" y="40" width="80" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="180" y="62" textAnchor="middle" fill="black" fontSize="11">策略改进</text>
            <path d="M220 57 L240 57" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_dp2)"/>
            <rect x="240" y="40" width="80" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="280" y="62" textAnchor="middle" fill="black" fontSize="11">价值迭代</text>
            <line x1="80" y1="75" x2="320" y2="75" stroke="#666" strokeWidth="2" strokeDasharray="5,5"/>
            <text x="200" y="95" textAnchor="middle" fill="black" fontSize="11">策略迭代</text>
            <defs>
              <marker id="arrowhead_dp2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
              </marker>
            </defs>
          </svg>
        </div>

        <SectionTitle>算法流程</SectionTitle>
        <BookParagraph><b>策略迭代</b></BookParagraph>
        <BookList items={[
          '初始化策略π',
          '策略评估：计算Vπ',
          '策略改进：基于Vπ更新策略',
          '重复步骤2-3直到策略稳定',
        ]} />
        <BookParagraph><b>价值迭代</b></BookParagraph>
        <BookList items={[
          '初始化价值函数V',
          '对每个状态s更新V(s)',
          '重复步骤2直到收敛',
          '从V导出最优策略',
        ]} />

        <div className="flex justify-center">
          <svg width="100%" height="140" viewBox="0 0 600 140">
            <rect x="40" y="35" width="90" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="85" y="57" textAnchor="middle" fill="black" fontSize="11">初始化</text>
            <path d="M130 52 L150 52" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_dp3)"/>
            <rect x="150" y="35" width="90" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="195" y="57" textAnchor="middle" fill="black" fontSize="11">迭代更新</text>
            <path d="M240 52 L260 52" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_dp3)"/>
            <rect x="260" y="35" width="90" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="305" y="57" textAnchor="middle" fill="black" fontSize="11">收敛检查</text>
            <path d="M350 52 L370 52" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_dp3)"/>
            <rect x="370" y="35" width="90" height="35" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
            <text x="415" y="57" textAnchor="middle" fill="black" fontSize="11">导出策略</text>
            <path d="M195 70 L195 85" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_dp3)"/>
            <path d="M195 85 L145 85" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_dp3)"/>
            <text x="170" y="100" textAnchor="middle" fill="black" fontSize="11">未收敛</text>
            <defs>
              <marker id="arrowhead_dp3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
              </marker>
            </defs>
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

        <SectionTitle>练习1：策略评估</SectionTitle>
        <BookParagraph>
          实现策略评估算法，计算给定策略下的状态价值函数。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现迭代策略评估',
          '计算状态价值函数',
          '可视化价值函数变化',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={policyEvalCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习2：价值迭代</SectionTitle>
        <BookParagraph>
          实现价值迭代算法，计算最优价值函数和最优策略。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现价值迭代算法',
          '计算最优价值函数',
          '导出最优策略',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={valueIterCode} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题练习</PageTitle>

        <SectionTitle>例题1：简单网格世界</SectionTitle>
        <BookParagraph>
          考虑一个2x2的网格世界，智能体可以向上、下、左、右移动。每个动作有0.8的概率按预期方向移动，0.1的概率向左偏转，0.1的概率向右偏转。如果撞墙则停留在原地。奖励函数为：到达目标状态获得+1，其他状态获得-0.1。
        </BookParagraph>
        <BookParagraph><b>问题：</b></BookParagraph>
        <BookList items={[
          '使用策略迭代算法求解最优策略',
          '使用价值迭代算法求解最优策略',
          '比较两种方法的结果和效率',
        ]} />
        <BookParagraph><b>参考答案</b></BookParagraph>
        <BookParagraph>
          1. 策略迭代：需要多次策略评估和改进<br />
          2. 价值迭代：直接迭代计算最优价值函数<br />
          3. 两种方法最终得到相同的最优策略
        </BookParagraph>
        <BookCode language="python" code={policyIterCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>例题2：资源分配问题</SectionTitle>
        <BookParagraph>
          考虑一个资源分配问题，有N个任务需要分配给M个处理器。每个任务在不同处理器上的执行时间不同，目标是最小化总执行时间。
        </BookParagraph>
        <BookParagraph><b>问题：</b></BookParagraph>
        <BookList items={[
          '将该问题建模为MDP',
          '使用动态规划求解最优分配策略',
          '分析算法的时间复杂度',
        ]} />
        <BookParagraph><b>参考答案</b></BookParagraph>
        <BookParagraph>
          1. 状态：已分配的任务集合<br />
          2. 动作：为下一个任务选择处理器<br />
          3. 奖励：负的总执行时间
        </BookParagraph>
        <BookCode language="python" code={resourceAllocCode} />
      </div>
    ),
  },
]

export default function DlDynamicProgrammingPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
