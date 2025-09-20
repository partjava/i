'use client';

import React, { useState } from 'react';

export default function MonteCarlo() {
  const [activeTab, setActiveTab] = useState('theory');
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">蒙特卡洛方法</h1>
      
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
            <h2 className="text-2xl font-bold mb-4">蒙特卡洛方法概述</h2>
            
            {/* 基本概念 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">基本概念</h3>
              <p className="text-gray-700 mb-4">
                蒙特卡洛方法是一类通过采样和统计来解决问题的方法。在强化学习中，蒙特卡洛方法通过采样完整的状态-动作序列
                来学习价值函数和最优策略，不需要环境模型的完整知识。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>核心思想：</strong>通过大量随机采样和实际经验来估计期望值和概率分布。
                </p>
              </div>
              <div className="flex justify-center my-4">
                <svg width="500" height="200" viewBox="0 0 500 200">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                    </marker>
                  </defs>
                  <rect x="50" y="50" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="100" y="70" textAnchor="middle" fill="black">状态</text>
                  <path d="M150 70 L170 70" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="170" y="50" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="220" y="70" textAnchor="middle" fill="black">动作</text>
                  <path d="M270 70 L290 70" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="290" y="50" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="340" y="70" textAnchor="middle" fill="black">奖励</text>
                  <path d="M220 90 L220 110" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="170" y="110" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="220" y="130" textAnchor="middle" fill="black">采样</text>
                </svg>
              </div>
            </div>

            {/* 主要方法 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">主要方法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 首次访问MC方法</h4>
                  <p className="text-gray-600">只考虑每个回合中状态或状态-动作对的首次出现</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 每次访问MC方法</h4>
                  <p className="text-gray-600">考虑每个回合中状态或状态-动作对的所有出现</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 探索起始MC方法</h4>
                  <p className="text-gray-600">通过随机选择初始状态-动作对来保证探索</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4. 离线MC控制</h4>
                  <p className="text-gray-600">基于完整回合数据进行策略评估和改进</p>
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
                  <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">采样</text>
                  <path d="M140 100 L160 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <circle cx="200" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="200" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">评估</text>
                  <path d="M240 100 L260 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <circle cx="300" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="300" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">改进</text>
                  <path d="M340 100 L360 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <circle cx="400" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="400" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">收敛</text>
                </svg>
              </div>
            </div>

            {/* 算法流程 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">算法流程</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">首次访问MC预测</h4>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2">
                    <li>初始化价值函数和回报计数器</li>
                    <li>生成一个回合的经验</li>
                    <li>对回合中首次出现的每个状态</li>
                    <li>计算该状态后续的回报</li>
                    <li>更新价值函数估计</li>
                  </ol>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">MC控制</h4>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2">
                    <li>初始化Q函数和策略</li>
                    <li>生成回合经验</li>
                    <li>对每个状态-动作对更新Q值</li>
                    <li>改进策略（ε-贪婪）</li>
                    <li>重复直到收敛</li>
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
                  <text x="250" y="70" textAnchor="middle" fill="black">采样回合</text>
                  <path d="M310 70 L330 70" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="330" y="50" width="120" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="390" y="70" textAnchor="middle" fill="black">更新估计</text>
                  <path d="M450 70 L470 70" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="470" y="50" width="120" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="530" y="70" textAnchor="middle" fill="black">策略改进</text>
                  <path d="M250 90 L250 120" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <text x="250" y="140" textAnchor="middle" fill="black">重复</text>
                </svg>
              </div>
            </div>

            {/* 应用场景 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">应用场景</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">博弈游戏</h4>
                  <p className="text-gray-600">如围棋、国际象棋等回合制游戏</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">金融市场</h4>
                  <p className="text-gray-600">投资组合优化、风险评估</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">机器人控制</h4>
                  <p className="text-gray-600">路径规划、动作序列学习</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">推荐系统</h4>
                  <p className="text-gray-600">用户行为序列分析</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 实战练习部分 */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">实战练习</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 练习1：首次访问MC预测 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习1：首次访问MC预测</h3>
                <p className="text-gray-700 mb-4">
                  实现首次访问蒙特卡洛方法来估计给定策略下的状态价值函数。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现首次访问MC预测算法</li>
                      <li>计算状态价值函数</li>
                      <li>可视化价值函数变化</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">算法流程图</h4>
                    <div className="flex justify-center mb-4">
                      <svg width="400" height="300" viewBox="0 0 400 300">
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                          </marker>
                        </defs>
                        <rect x="150" y="20" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="40" textAnchor="middle" dominantBaseline="middle">开始回合</text>
                        <path d="M200 60 L200 80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="80" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="100" textAnchor="middle" dominantBaseline="middle">状态s</text>
                        <path d="M200 120 L200 140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="140" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="160" textAnchor="middle" dominantBaseline="middle">首次访问?</text>
                        <path d="M250 160 L300 160" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <text x="320" y="160" textAnchor="start" dominantBaseline="middle">否</text>
                        
                        <path d="M200 180 L200 200" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <text x="180" y="190" textAnchor="end" dominantBaseline="middle">是</text>
                        
                        <rect x="150" y="200" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="220" textAnchor="middle" dominantBaseline="middle">更新V(s)</text>
                        <path d="M200 240 L200 260" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="260" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="280" textAnchor="middle" dominantBaseline="middle">下一状态</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">代码实现</h4>
                    <pre className="bg-gray-100 p-3 rounded-lg text-sm">
{`import numpy as np
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
    plt.show()`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 练习2：MC控制 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习2：MC控制</h3>
                <p className="text-gray-700 mb-4">
                  实现蒙特卡洛控制算法，学习最优策略。使用ε-贪婪策略进行探索。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现MC控制算法</li>
                      <li>实现ε-贪婪策略</li>
                      <li>可视化Q函数和策略</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">算法流程图</h4>
                    <div className="flex justify-center mb-4">
                      <svg width="400" height="300" viewBox="0 0 400 300">
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                          </marker>
                        </defs>
                        <rect x="150" y="20" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="40" textAnchor="middle" dominantBaseline="middle">初始化Q,π</text>
                        <path d="M200 60 L200 80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="80" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="100" textAnchor="middle" dominantBaseline="middle">生成回合</text>
                        <path d="M200 120 L200 140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="140" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="160" textAnchor="middle" dominantBaseline="middle">更新Q值</text>
                        <path d="M200 180 L200 200" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="200" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="220" textAnchor="middle" dominantBaseline="middle">改进策略</text>
                        
                        <path d="M150 220 L100 220" stroke="#666" strokeWidth="2"/>
                        <path d="M100 220 L100 100" stroke="#666" strokeWidth="2"/>
                        <path d="M100 100 L150 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <text x="80" y="160" textAnchor="middle" dominantBaseline="middle">重复</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">代码实现</h4>
                    <pre className="bg-gray-100 p-3 rounded-lg text-sm">
{`import numpy as np
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
    plt.show()`}
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
            
            {/* 赌博机问题 */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h3 className="text-xl font-semibold">例题1：多臂赌博机问题</h3>
              <div className="space-y-2">
                <h4 className="font-medium">问题描述</h4>
                <p className="text-gray-700">
                  有k个不同的老虎机（赌博机），每个老虎机有不同的奖励分布。玩家每次只能选择一个老虎机拉动，
                  目标是在有限次数的尝试中最大化总收益。这是探索与利用权衡的经典问题。
                </p>
                
                <h4 className="font-medium mt-4">解题思路</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>使用ε-贪婪策略进行动作选择</li>
                  <li>维护每个老虎机的价值估计</li>
                  <li>根据实际收益更新价值估计</li>
                  <li>平衡探索新的老虎机和利用已知的高收益老虎机</li>
                </ol>

                <div className="bg-white p-4 rounded-lg mt-4">
                  <h4 className="font-medium">完整代码</h4>
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
                    <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-x-auto">
{`import numpy as np
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
    plt.show()`}
                    </pre>
                  )}
                </div>
              </div>
            </div>

            {/* 网格世界导航 */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h3 className="text-xl font-semibold">例题2：网格世界导航</h3>
              <div className="space-y-2">
                <h4 className="font-medium">问题描述</h4>
                <p className="text-gray-700">
                  在一个网格世界中，智能体需要从起点导航到终点。网格中有障碍物和奖励点，
                  智能体需要学习最优路径以最大化累积奖励。
                </p>

                <h4 className="font-medium mt-4">解题思路</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>使用MC控制算法学习最优策略</li>
                  <li>采样完整的导航回合</li>
                  <li>更新状态-动作值函数</li>
                  <li>使用ε-贪婪策略进行改进</li>
                </ol>

                <div className="bg-white p-4 rounded-lg mt-4">
                  <h4 className="font-medium">完整代码</h4>
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
                    <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-x-auto">
{`import numpy as np
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
    plot_policy(policy)
`}
                    </pre>
                  )}
                </div>
              </div>
            </div>

            {/* 黑杰克游戏 */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h3 className="text-xl font-semibold">例题3：黑杰克游戏</h3>
              <div className="space-y-2">
                <h4 className="font-medium">问题描述</h4>
                <p className="text-gray-700">
                  在黑杰克游戏中，玩家需要决定是继续要牌还是停止。目标是使手中牌的点数尽可能接近21点但不超过21点。
                  这是一个经典的MC方法应用场景。
                </p>

                <h4 className="font-medium mt-4">解题思路</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>使用MC预测评估当前策略</li>
                  <li>考虑玩家手牌和庄家明牌</li>
                  <li>计算不同状态下的价值函数</li>
                  <li>通过大量模拟优化策略</li>
                </ol>

                <div className="bg-white p-4 rounded-lg mt-4">
                  <h4 className="font-medium">完整代码</h4>
                  <button 
                    onClick={() => setShowCode3(!showCode3)}
                    className="flex items-center text-blue-500 hover:text-blue-700 mb-2"
                  >
                    <svg 
                      className={`w-4 h-4 mr-2 transform transition-transform ${showCode3 ? 'rotate-90' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    {showCode3 ? '隐藏代码' : '显示代码'}
                  </button>
                  {showCode3 && (
                    <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-x-auto">
{`import numpy as np
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
        print(f'{k}: {V[k]:.2f}')
`}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 底部导航栏 */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <a href="/study/ai/rl/dynamic-programming" className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center hover:bg-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              上一章：动态规划
            </a>
            <a href="/study/ai/rl/temporal-difference" className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors">
              下一章：时序差分学习
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