'use client';

import React, { useState } from 'react';

export default function DynamicProgramming() {
  const [activeTab, setActiveTab] = useState('theory');
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">动态规划</h1>
      
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
            <h2 className="text-2xl font-bold mb-4">动态规划（Dynamic Programming）概述</h2>
            
            {/* 基本概念 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">基本概念</h3>
              <p className="text-gray-700 mb-4">
                动态规划是解决强化学习问题的一种重要方法，它通过将复杂问题分解为子问题，并存储子问题的解来避免重复计算。
                在强化学习中，动态规划主要用于计算最优策略和最优价值函数。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>核心思想：</strong>通过"分而治之"的方式，将复杂问题分解为更小的子问题，并利用子问题的解来构建原问题的解。
                </p>
              </div>
              <div className="flex justify-center my-4">
                <svg width="400" height="200" viewBox="0 0 400 200">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                    </marker>
                  </defs>
                  <rect x="50" y="50" width="300" height="100" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="200" y="70" textAnchor="middle" fill="black">原问题</text>
                  <path d="M200 100 L200 120" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="50" y="130" width="140" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="120" y="150" textAnchor="middle" fill="black">子问题1</text>
                  <rect x="210" y="130" width="140" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="280" y="150" textAnchor="middle" fill="black">子问题2</text>
                </svg>
              </div>
            </div>

            {/* 主要算法 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">主要算法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 策略评估（Policy Evaluation）</h4>
                  <p className="text-gray-600">计算给定策略下的状态价值函数</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 策略改进（Policy Improvement）</h4>
                  <p className="text-gray-600">基于当前价值函数改进策略</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 策略迭代（Policy Iteration）</h4>
                  <p className="text-gray-600">交替进行策略评估和改进</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4. 价值迭代（Value Iteration）</h4>
                  <p className="text-gray-600">直接迭代计算最优价值函数</p>
                </div>
              </div>
              <div className="flex justify-center my-4">
                <svg width="500" height="200" viewBox="0 0 500 200">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                    </marker>
                  </defs>
                  <rect x="50" y="50" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="100" y="70" textAnchor="middle" fill="black">策略评估</text>
                  <path d="M150 70 L170 70" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="170" y="50" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="220" y="70" textAnchor="middle" fill="black">策略改进</text>
                  <path d="M270 70 L290 70" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="290" y="50" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="340" y="70" textAnchor="middle" fill="black">价值迭代</text>
                  <path d="M100 100 L400 100" stroke="#666" strokeWidth="2" strokeDasharray="5,5"/>
                  <text x="250" y="120" textAnchor="middle" fill="black">策略迭代</text>
                </svg>
              </div>
            </div>

            {/* 算法流程 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">算法流程</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">策略迭代</h4>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2">
                    <li>初始化策略π</li>
                    <li>策略评估：计算Vπ</li>
                    <li>策略改进：基于Vπ更新策略</li>
                    <li>重复步骤2-3直到策略稳定</li>
                  </ol>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">价值迭代</h4>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2">
                    <li>初始化价值函数V</li>
                    <li>对每个状态s更新V(s)</li>
                    <li>重复步骤2直到收敛</li>
                    <li>从V导出最优策略</li>
                  </ol>
                </div>
              </div>
              <div className="flex justify-center my-4">
                <svg width="600" height="200" viewBox="0 0 600 200">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                    </marker>
                  </defs>
                  <rect x="50" y="50" width="120" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="110" y="70" textAnchor="middle" fill="black">初始化</text>
                  <path d="M170 70 L190 70" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="190" y="50" width="120" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="250" y="70" textAnchor="middle" fill="black">迭代更新</text>
                  <path d="M310 70 L330 70" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="330" y="50" width="120" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="390" y="70" textAnchor="middle" fill="black">收敛检查</text>
                  <path d="M450 70 L470 70" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="470" y="50" width="120" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="530" y="70" textAnchor="middle" fill="black">导出策略</text>
                  <path d="M250 100 L250 120" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <path d="M250 120 L190 120" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <text x="220" y="140" textAnchor="middle" fill="black">未收敛</text>
                </svg>
              </div>
            </div>

            {/* 应用场景 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">应用场景</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">小型MDP问题</h4>
                  <p className="text-gray-600">状态空间和动作空间较小的决策问题</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">最优控制</h4>
                  <p className="text-gray-600">如机器人路径规划、资源分配等</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">游戏AI</h4>
                  <p className="text-gray-600">如简单的棋盘游戏、迷宫问题等</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">资源调度</h4>
                  <p className="text-gray-600">如任务调度、库存管理等</p>
                </div>
              </div>
              <div className="flex justify-center my-4">
                <svg width="500" height="200" viewBox="0 0 500 200">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                    </marker>
                  </defs>
                  <circle cx="100" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">MDP</text>
                  <path d="M140 100 L160 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <circle cx="200" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="200" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">控制</text>
                  <path d="M240 100 L260 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <circle cx="300" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="300" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">游戏</text>
                  <path d="M340 100 L360 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <circle cx="400" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="400" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">调度</text>
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* 实战练习部分 */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">实战练习</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 练习1：策略评估 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习1：策略评估</h3>
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
                    <h4 className="font-semibold mb-2">环境示例</h4>
                    <div className="flex justify-center mb-4">
                      <svg width="200" height="200" viewBox="0 0 200 200">
                        <rect x="10" y="10" width="180" height="180" fill="none" stroke="black" strokeWidth="2"/>
                        <rect x="50" y="50" width="100" height="100" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <circle cx="100" cy="100" r="30" fill="#3b82f6" opacity="0.5"/>
                        <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">S</text>
                        <text x="50" y="30" textAnchor="middle" fill="black">状态空间</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">代码实现</h4>
                    <pre className="bg-gray-100 p-3 rounded-lg text-sm">
{`import numpy as np
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
    visualize_value_history(history)`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 练习2：价值迭代 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习2：价值迭代</h3>
                <p className="text-gray-700 mb-4">
                  实现价值迭代算法，计算最优价值函数和最优策略。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现价值迭代算法</li>
                      <li>计算最优价值函数</li>
                      <li>导出最优策略</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">算法流程</h4>
                    <div className="flex justify-center mb-4">
                      <svg width="300" height="200" viewBox="0 0 300 200">
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                          </marker>
                        </defs>
                        <rect x="20" y="80" width="80" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="60" y="100" textAnchor="middle" dominantBaseline="middle">初始化V</text>
                        <path d="M100 100 L120 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <rect x="120" y="80" width="80" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="160" y="100" textAnchor="middle" dominantBaseline="middle">更新V</text>
                        <path d="M200 100 L220 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <rect x="220" y="80" width="80" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="260" y="100" textAnchor="middle" dominantBaseline="middle">导出π</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">代码实现</h4>
                    <pre className="bg-gray-100 p-3 rounded-lg text-sm">
{`import numpy as np
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
    visualize_value_history(history)`}
                    </pre>
                  </div>
                </div>
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
                <h3 className="text-xl font-semibold mb-3">例题1：简单网格世界</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-gray-700 mb-4">
                      考虑一个2x2的网格世界，智能体可以向上、下、左、右移动。每个动作有0.8的概率按预期方向移动，
                      0.1的概率向左偏转，0.1的概率向右偏转。如果撞墙则停留在原地。奖励函数为：到达目标状态获得+1，
                      其他状态获得-0.1。
                    </p>
                    <div className="flex justify-center my-4">
                      <svg width="300" height="300" viewBox="0 0 300 300">
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                          </marker>
                        </defs>
                        <rect x="50" y="50" width="200" height="200" fill="none" stroke="black" strokeWidth="2"/>
                        <line x1="150" y1="50" x2="150" y2="250" stroke="black" strokeWidth="2"/>
                        <line x1="50" y1="150" x2="250" y2="150" stroke="black" strokeWidth="2"/>
                        <circle cx="100" cy="100" r="20" fill="#3b82f6" opacity="0.5"/>
                        <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">S0</text>
                        <circle cx="200" cy="100" r="20" fill="#3b82f6" opacity="0.5"/>
                        <text x="200" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">S1</text>
                        <circle cx="100" cy="200" r="20" fill="#3b82f6" opacity="0.5"/>
                        <text x="100" y="200" textAnchor="middle" dominantBaseline="middle" fill="black">S2</text>
                        <circle cx="200" cy="200" r="20" fill="#10b981" opacity="0.5"/>
                        <text x="200" y="200" textAnchor="middle" dominantBaseline="middle" fill="black">G</text>
                        <path d="M100 100 L120 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <path d="M100 100 L100 120" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <path d="M200 100 L180 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <path d="M200 100 L200 120" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <path d="M100 200 L120 200" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <path d="M100 200 L100 180" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <path d="M200 200 L180 200" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <path d="M200 200 L200 180" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">问题：</p>
                      <ol className="list-decimal list-inside text-gray-600">
                        <li>使用策略迭代算法求解最优策略</li>
                        <li>使用价值迭代算法求解最优策略</li>
                        <li>比较两种方法的结果和效率</li>
                      </ol>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">参考答案</h4>
                    <div className="space-y-2 text-gray-600">
                      <p>1. 策略迭代：需要多次策略评估和改进</p>
                      <p>2. 价值迭代：直接迭代计算最优价值函数</p>
                      <p>3. 两种方法最终得到相同的最优策略</p>
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
    
    return policy, V`}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 例题2 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">例题2：资源分配问题</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-gray-700 mb-4">
                      考虑一个资源分配问题，有N个任务需要分配给M个处理器。每个任务在不同处理器上的执行时间不同，
                      目标是最小化总执行时间。
                    </p>
                    <div className="flex justify-center my-4">
                      <svg width="400" height="200" viewBox="0 0 400 200">
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                          </marker>
                        </defs>
                        <rect x="50" y="50" width="100" height="100" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">任务</text>
                        <path d="M150 100 L170 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <rect x="170" y="50" width="100" height="100" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="220" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">处理器1</text>
                        <path d="M270 100 L290 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <rect x="290" y="50" width="100" height="100" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="340" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">处理器2</text>
                        <path d="M100 150 L100 170" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <path d="M220 150 L220 170" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <path d="M340 150 L340 170" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <text x="100" y="190" textAnchor="middle" fill="black">任务1</text>
                        <text x="220" y="190" textAnchor="middle" fill="black">任务2</text>
                        <text x="340" y="190" textAnchor="middle" fill="black">任务3</text>
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">问题：</p>
                      <ol className="list-decimal list-inside text-gray-600">
                        <li>将该问题建模为MDP</li>
                        <li>使用动态规划求解最优分配策略</li>
                        <li>分析算法的时间复杂度</li>
                      </ol>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">参考答案</h4>
                    <div className="space-y-2 text-gray-600">
                      <p>1. 状态：已分配的任务集合</p>
                      <p>2. 动作：为下一个任务选择处理器</p>
                      <p>3. 奖励：负的总执行时间</p>
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
{`import numpy as np

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
print("最优价值:", V)`}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 底部导航栏 */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <a href="/study/ai/rl/mdp" className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center hover:bg-gray-600 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              上一章：马尔可夫决策过程
            </a>
            <a href="/study/ai/rl/monte-carlo" className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors">
              下一章：蒙特卡洛方法
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 