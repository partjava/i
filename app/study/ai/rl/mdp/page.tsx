'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const mdpEnvCode = `class MDPEnvironment:
    def __init__(self):
        self.n_states = 4
        self.n_actions = 2
        self.P = self._build_transition_matrix()
        self.R = self._build_reward_matrix()

    def _build_transition_matrix(self):
        # 实现转移概率矩阵
        pass

    def _build_reward_matrix(self):
        # 实现奖励矩阵
        pass

    def reset(self):
        # 重置环境
        pass

    def step(self, action):
        # 执行动作并返回下一个状态和奖励
        pass`

const policyEvalCode2 = `def policy_evaluation(env, policy, gamma=0.9, theta=1e-6):
    V = np.zeros(env.n_states)
    while True:
        delta = 0
        for s in range(env.n_states):
            v = V[s]
            # 实现策略评估逻辑
            delta = max(delta, abs(v - V[s]))
        if delta < theta:
            break
    return V`

const simpleMdpCode = `import numpy as np

class SimpleMDP:
    def __init__(self):
        self.n_states = 3
        self.n_actions = 2
        self.P = self._build_transition_matrix()
        self.R = self._build_reward_matrix()

    def _build_transition_matrix(self):
        P = np.zeros((self.n_states, self.n_actions, self.n_states))

        # 状态0的转移概率
        P[0,0] = [0, 0.7, 0.3]

        # 状态1的转移概率
        P[1,0] = [0.2, 0, 0.8]

        # 状态2的转移概率
        P[2,1] = [1.0, 0, 0]

        return P

    def _build_reward_matrix(self):
        R = np.zeros((self.n_states, self.n_actions, self.n_states))

        # 状态0的奖励
        R[0,0] = [0, 1, -1]

        # 状态1的奖励
        R[1,0] = [-1, 0, 2]

        # 状态2的奖励
        R[2,1] = [0, 0, 0]

        return R

def value_iteration(mdp, gamma=0.9, theta=1e-6):
    V = np.zeros(mdp.n_states)
    while True:
        delta = 0
        for s in range(mdp.n_states):
            v = V[s]
            # 计算状态s的价值
            v_new = 0
            for a in range(mdp.n_actions):
                if np.any(mdp.P[s,a] > 0):  # 如果动作a在状态s下有效
                    v_a = 0
                    for s_next in range(mdp.n_states):
                        v_a += mdp.P[s,a,s_next] * (mdp.R[s,a,s_next] + gamma * V[s_next])
                    v_new = max(v_new, v_a)
            V[s] = v_new
            delta = max(delta, abs(v - V[s]))
        if delta < theta:
            break
    return V

# 使用示例
mdp = SimpleMDP()
V = value_iteration(mdp)
print("最优状态价值函数:", V)`

const policyIterCode = `def policy_evaluation(mdp, policy, gamma=0.9, theta=1e-6):
    V = np.zeros(mdp.n_states)
    while True:
        delta = 0
        for s in range(mdp.n_states):
            v = V[s]
            a = policy[s]
            v_new = 0
            for s_next in range(mdp.n_states):
                v_new += mdp.P[s,a,s_next] * (mdp.R[s,a,s_next] + gamma * V[s_next])
            V[s] = v_new
            delta = max(delta, abs(v - V[s]))
        if delta < theta:
            break
    return V

def policy_improvement(mdp, V, gamma=0.9):
    policy = np.zeros(mdp.n_states, dtype=int)
    for s in range(mdp.n_states):
        # 计算每个动作的价值
        action_values = np.zeros(mdp.n_actions)
        for a in range(mdp.n_actions):
            if np.any(mdp.P[s,a] > 0):  # 如果动作a在状态s下有效
                for s_next in range(mdp.n_states):
                    action_values[a] += mdp.P[s,a,s_next] * (mdp.R[s,a,s_next] + gamma * V[s_next])
        # 选择价值最大的动作
        policy[s] = np.argmax(action_values)
    return policy

def policy_iteration(mdp, gamma=0.9, theta=1e-6):
    # 初始化随机策略
    policy = np.zeros(mdp.n_states, dtype=int)
    while True:
        # 策略评估
        V = policy_evaluation(mdp, policy, gamma, theta)
        # 策略改进
        new_policy = policy_improvement(mdp, V, gamma)
        # 检查策略是否稳定
        if np.array_equal(policy, new_policy):
            break
        policy = new_policy
    return policy, V

# 使用示例
mdp = SimpleMDP()
policy, V = policy_iteration(mdp)
print("最优策略:", policy)
print("最优状态价值函数:", V)`

const META: LessonMeta = {
  subject: '强化学习',
  chapterTitle: '马尔可夫决策过程',
  chapterNumber: 2,
  totalChapters: 14,
  subjectHref: '/study/ai/rl',
  prevChapter: { label: '强化学习基础', href: '/study/ai/rl/basic' },
  nextChapter: { label: '动态规划', href: '/study/ai/rl/dynamic-programming' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>马尔可夫决策过程（MDP）概述</PageTitle>

        <SectionTitle>基本概念</SectionTitle>
        <BookParagraph>
          马尔可夫决策过程是强化学习的基础数学模型，它描述了一个智能体在具有马尔可夫性质的环境中如何进行决策。MDP由状态空间、动作空间、转移概率、奖励函数和折扣因子五个要素组成。
        </BookParagraph>
        <BookParagraph>
          <b>马尔可夫性质：</b>下一个状态只依赖于当前状态和动作，与历史状态无关。
        </BookParagraph>

        <SectionTitle>核心要素</SectionTitle>
        <BookList items={[
          '状态空间（S）：所有可能状态的集合',
          '动作空间（A）：智能体可以执行的所有可能动作的集合',
          '转移概率（P）：P(s\'|s,a)表示在状态s下执行动作a后转移到状态s\'的概率',
          '奖励函数（R）：R(s,a,s\')表示在状态s下执行动作a后转移到状态s\'获得的奖励',
          '折扣因子（γ）：用于平衡即时奖励和未来奖励的重要性，γ∈[0,1]',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>价值函数</SectionTitle>
        <BookParagraph>
          <b>状态价值函数 V(s)</b> — 表示从状态s开始，按照策略π执行动作所获得的期望累积奖励<br />
          V(s) = E[∑(γ^t * R_t) | s_0 = s]
        </BookParagraph>
        <BookParagraph>
          <b>动作价值函数 Q(s,a)</b> — 表示在状态s下执行动作a，然后按照策略π执行动作所获得的期望累积奖励<br />
          Q(s,a) = E[∑(γ^t * R_t) | s_0 = s, a_0 = a]
        </BookParagraph>

        <SectionTitle>最优策略</SectionTitle>
        <BookParagraph>
          最优策略π*是在所有可能策略中，能够获得最大期望累积奖励的策略。对于每个状态s，最优策略选择能够获得最大动作价值函数的动作。
        </BookParagraph>
        <BookParagraph>
          π*(s) = argmax_a Q*(s,a)
        </BookParagraph>
      </div>
    ),
  },
  {
    label: '实战练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>练习1：MDP环境实现</SectionTitle>
        <BookParagraph>
          实现一个简单的MDP环境，包括状态转移和奖励计算。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现状态转移概率矩阵',
          '实现奖励函数',
          '实现环境重置和步进功能',
        ]} />
        <BookParagraph><b>代码框架</b></BookParagraph>
        <BookCode language="python" code={mdpEnvCode} />
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
        <BookCode language="python" code={policyEvalCode2} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题练习</PageTitle>

        <SectionTitle>例题1：简单MDP问题</SectionTitle>
        <BookParagraph>
          考虑一个简单的MDP问题，状态空间S=[0,1,2]，动作空间A=[0,1]。转移概率和奖励如下：
        </BookParagraph>
        <BookList items={[
          '在状态0：动作0有0.7概率转移到状态1，0.3概率转移到状态2',
          '在状态1：动作0有0.8概率转移到状态2，0.2概率转移到状态0',
          '在状态2：动作1有1.0概率转移到状态0',
          '奖励函数：R(0,0,1)=1, R(0,0,2)=-1, R(1,0,2)=2, R(1,0,0)=-1, R(2,1,0)=0',
        ]} />
        <BookParagraph><b>问题：</b></BookParagraph>
        <BookList items={[
          '写出这个MDP的转移概率矩阵和奖励矩阵',
          '计算最优策略下的状态价值函数',
          '分析不同折扣因子的影响',
        ]} />
        <BookParagraph><b>参考答案</b></BookParagraph>
        <BookParagraph>
          1. 转移概率矩阵：<br />
          P[0][0] = [0, 0.7, 0.3]<br />
          P[1][0] = [0.2, 0, 0.8]<br />
          P[2][1] = [1.0, 0, 0]<br />
          奖励矩阵：<br />
          R[0][0] = [0, 1, -1]<br />
          R[1][0] = [-1, 0, 2]<br />
          R[2][1] = [0, 0, 0]
        </BookParagraph>
        <BookCode language="python" code={simpleMdpCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>例题2：策略迭代</SectionTitle>
        <BookParagraph>
          使用策略迭代算法求解上一个例题中的MDP问题。策略迭代包括两个步骤：1. 策略评估：计算当前策略下的状态价值函数 2. 策略改进：根据状态价值函数更新策略
        </BookParagraph>
        <BookParagraph><b>问题：</b></BookParagraph>
        <BookList items={[
          '实现策略评估步骤',
          '实现策略改进步骤',
          '分析策略迭代的收敛性',
        ]} />
        <BookParagraph><b>参考答案</b></BookParagraph>
        <BookParagraph>
          1. 策略评估：使用贝尔曼方程迭代计算状态价值函数<br />
          2. 策略改进：使用贪婪策略更新动作选择<br />
          3. 策略迭代保证收敛到最优策略
        </BookParagraph>
        <BookCode language="python" code={policyIterCode} />
      </div>
    ),
  },
]

export default function RlMdpPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
