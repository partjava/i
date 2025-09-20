'use client';

import React, { useState } from 'react';

export default function RLMDP() {
  const [activeTab, setActiveTab] = useState('theory');
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">马尔可夫决策过程</h1>
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-8">
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'theory' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('theory')}
        >
          理论知识
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'practice' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('practice')}
        >
          实战练习
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'examples' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('examples')}
        >
          例题练习
        </button>
      </div>

      {/* 主要内容区域 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* 理论知识部分 */}
        {activeTab === 'theory' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">马尔可夫决策过程（MDP）概述</h2>
            
            {/* 基本概念 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">基本概念</h3>
              <p className="text-gray-700 mb-4">
                马尔可夫决策过程是强化学习的基础数学模型，它描述了一个智能体在具有马尔可夫性质的环境中如何进行决策。
                MDP由状态空间、动作空间、转移概率、奖励函数和折扣因子五个要素组成。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>马尔可夫性质：</strong>下一个状态只依赖于当前状态和动作，与历史状态无关。
                </p>
              </div>
            </div>

            {/* 核心要素 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">核心要素</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 状态空间（S）</h4>
                  <p className="text-gray-600">所有可能状态的集合</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 动作空间（A）</h4>
                  <p className="text-gray-600">智能体可以执行的所有可能动作的集合</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 转移概率（P）</h4>
                  <p className="text-gray-600">P(s'|s,a)表示在状态s下执行动作a后转移到状态s'的概率</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4. 奖励函数（R）</h4>
                  <p className="text-gray-600">R(s,a,s')表示在状态s下执行动作a后转移到状态s'获得的奖励</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">5. 折扣因子（γ）</h4>
                  <p className="text-gray-600">用于平衡即时奖励和未来奖励的重要性，γ∈[0,1]</p>
                </div>
              </div>
            </div>

            {/* 价值函数 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">价值函数</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">状态价值函数 V(s)</h4>
                  <p className="text-gray-600">表示从状态s开始，按照策略π执行动作所获得的期望累积奖励</p>
                  <p className="text-gray-600 mt-2">V(s) = E[∑(γ^t * R_t) | s_0 = s]</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">动作价值函数 Q(s,a)</h4>
                  <p className="text-gray-600">表示在状态s下执行动作a，然后按照策略π执行动作所获得的期望累积奖励</p>
                  <p className="text-gray-600 mt-2">Q(s,a) = E[∑(γ^t * R_t) | s_0 = s, a_0 = a]</p>
                </div>
              </div>
            </div>

            {/* 最优策略 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">最优策略</h3>
              <p className="text-gray-700 mb-4">
                最优策略π*是在所有可能策略中，能够获得最大期望累积奖励的策略。
                对于每个状态s，最优策略选择能够获得最大动作价值函数的动作。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  π*(s) = argmax_a Q*(s,a)
                </p>
              </div>
            </div>

            {/* 底部导航 */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <a href="/study/ai/rl/basic" className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  上一章：强化学习基础
                </a>
                <a href="/study/ai/rl/dynamic-programming" className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors">
                  下一章：动态规划
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 实战练习部分 */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">实战练习</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 练习1：MDP环境实现 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习1：MDP环境实现</h3>
                <p className="text-gray-700 mb-4">
                  实现一个简单的MDP环境，包括状态转移和奖励计算。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现状态转移概率矩阵</li>
                      <li>实现奖励函数</li>
                      <li>实现环境重置和步进功能</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">代码框架</h4>
                    <pre className="bg-gray-100 p-3 rounded-lg text-sm">
{`class MDPEnvironment:
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
        pass`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 练习2：策略评估 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习2：策略评估</h3>
                <p className="text-gray-700 mb-4">
                  实现策略评估算法，计算给定策略下的状态价值函数。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现迭代策略评估</li>
                      <li>计算状态价值函数</li>
                      <li>可视化价值函数变化</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">代码框架</h4>
                    <pre className="bg-gray-100 p-3 rounded-lg text-sm">
{`def policy_evaluation(env, policy, gamma=0.9, theta=1e-6):
    V = np.zeros(env.n_states)
    while True:
        delta = 0
        for s in range(env.n_states):
            v = V[s]
            # 实现策略评估逻辑
            delta = max(delta, abs(v - V[s]))
        if delta < theta:
            break
    return V`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部导航 */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <a href="/study/ai/rl/basic" className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  上一章：强化学习基础
                </a>
                <a href="/study/ai/rl/dynamic-programming" className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors">
                  下一章：动态规划
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 例题练习部分 */}
        {activeTab === 'examples' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">例题练习</h2>
            
            <div className="space-y-8">
              {/* 例题1 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">例题1：简单MDP问题</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-gray-700 mb-4">
                      考虑一个简单的MDP问题，状态空间S=[0,1,2]，动作空间A=[0,1]。
                      转移概率和奖励如下：
                      - 在状态0：动作0有0.7概率转移到状态1，0.3概率转移到状态2
                      - 在状态1：动作0有0.8概率转移到状态2，0.2概率转移到状态0
                      - 在状态2：动作1有1.0概率转移到状态0
                      奖励函数：R(0,0,1)=1, R(0,0,2)=-1, R(1,0,2)=2, R(1,0,0)=-1, R(2,1,0)=0
                    </p>
                    <div className="space-y-2">
                      <p className="font-semibold">问题：</p>
                      <ol className="list-decimal list-inside text-gray-600">
                        <li>写出这个MDP的转移概率矩阵和奖励矩阵</li>
                        <li>计算最优策略下的状态价值函数</li>
                        <li>分析不同折扣因子的影响</li>
                      </ol>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">参考答案</h4>
                    <div className="space-y-2 text-gray-600">
                      <p>1. 转移概率矩阵：</p>
                      <p>P[0][0] = [0, 0.7, 0.3]</p>
                      <p>P[1][0] = [0.2, 0, 0.8]</p>
                      <p>P[2][1] = [1.0, 0, 0]</p>
                      <p>奖励矩阵：</p>
                      <p>R[0][0] = [0, 1, -1]</p>
                      <p>R[1][0] = [-1, 0, 2]</p>
                      <p>R[2][1] = [0, 0, 0]</p>
                    </div>
                    <div className="mt-4">
                      <button 
                        onClick={() => setShowCode1(!showCode1)}
                        className="flex items-center text-blue-500 hover:text-blue-700 mb-2"
                      >
                        <svg 
                          className={`w-4 h-4 mr-2 transform transition-transform ${showCode1 ? 'rotate-90' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        {showCode1 ? '隐藏代码' : '显示代码'}
                      </button>
                      {showCode1 && (
                        <pre className="bg-gray-100 p-3 rounded-lg text-sm">
{`import numpy as np

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
print("最优状态价值函数:", V)`}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 例题2 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">例题2：策略迭代</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-gray-700 mb-4">
                      使用策略迭代算法求解上一个例题中的MDP问题。策略迭代包括两个步骤：
                      1. 策略评估：计算当前策略下的状态价值函数
                      2. 策略改进：根据状态价值函数更新策略
                    </p>
                    <div className="space-y-2">
                      <p className="font-semibold">问题：</p>
                      <ol className="list-decimal list-inside text-gray-600">
                        <li>实现策略评估步骤</li>
                        <li>实现策略改进步骤</li>
                        <li>分析策略迭代的收敛性</li>
                      </ol>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">参考答案</h4>
                    <div className="space-y-2 text-gray-600">
                      <p>1. 策略评估：使用贝尔曼方程迭代计算状态价值函数</p>
                      <p>2. 策略改进：使用贪婪策略更新动作选择</p>
                      <p>3. 策略迭代保证收敛到最优策略</p>
                    </div>
                    <div className="mt-4">
                      <button 
                        onClick={() => setShowCode2(!showCode2)}
                        className="flex items-center text-blue-500 hover:text-blue-700 mb-2"
                      >
                        <svg 
                          className={`w-4 h-4 mr-2 transform transition-transform ${showCode2 ? 'rotate-90' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        {showCode2 ? '隐藏代码' : '显示代码'}
                      </button>
                      {showCode2 && (
                        <pre className="bg-gray-100 p-3 rounded-lg text-sm">
{`def policy_evaluation(mdp, policy, gamma=0.9, theta=1e-6):
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
print("最优状态价值函数:", V)`}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部导航 */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <a href="/study/ai/rl/basic" className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  上一章：强化学习基础
                </a>
                <a href="/study/ai/rl/dynamic-programming" className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors">
                  下一章：动态规划
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 