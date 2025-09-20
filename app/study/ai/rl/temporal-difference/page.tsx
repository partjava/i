'use client';

import React, { useState } from 'react';

export default function TemporalDifference() {
  const [activeTab, setActiveTab] = useState('theory');
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">时序差分学习（Temporal Difference Learning）</h1>
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-8">
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'theory' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('theory')}
        >理论知识</button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'practice' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('practice')}
        >实战练习</button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'examples' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('examples')}
        >例题练习</button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* 理论知识部分 */}
        {activeTab === 'theory' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">时序差分学习概述</h2>
            {/* 基本概念 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">基本概念</h3>
              <p className="text-gray-700 mb-4">
                时序差分（TD）学习是一类结合了动态规划和蒙特卡洛思想的强化学习方法。它通过当前状态和下一个状态的估计来更新价值函数，无需完整回合即可学习。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>核心思想：</strong> 通过"当前估计"与"下一个估计"之间的差值（TD误差）来修正价值。
                </p>
              </div>
              <div className="flex justify-center my-4">
                {/* TD方法状态-动作-奖励流转SVG */}
                <svg width="500" height="120" viewBox="0 0 500 120">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                    </marker>
                  </defs>
                  <rect x="40" y="40" width="80" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="80" y="65" textAnchor="middle" fill="black">状态s</text>
                  <path d="M120 60 L180 60" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="180" y="40" width="80" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="220" y="65" textAnchor="middle" fill="black">动作a</text>
                  <path d="M260 60 L320 60" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="320" y="40" width="80" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="360" y="65" textAnchor="middle" fill="black">奖励r</text>
                  <path d="M400 60 L460 60" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="460" y="40" width="80" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="500" y="65" textAnchor="middle" fill="black">下状态s'</text>
                </svg>
              </div>
            </div>
            {/* 主要类型 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">主要类型与算法流程</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. TD(0)预测</h4>
                  <p className="text-gray-600">利用一步时序差分更新状态价值函数</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. SARSA</h4>
                  <p className="text-gray-600">基于当前策略的在线控制方法</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. Q-Learning</h4>
                  <p className="text-gray-600">基于最优动作的离线控制方法</p>
                </div>
              </div>
              <div className="flex justify-center my-4">
                {/* TD(0)算法流程SVG */}
                <svg width="600" height="120" viewBox="0 0 600 120">
                  <defs>
                    <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                    </marker>
                  </defs>
                  <rect x="40" y="40" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="90" y="65" textAnchor="middle" fill="black">初始化V</text>
                  <path d="M140 60 L200 60" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                  <rect x="200" y="40" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="250" y="65" textAnchor="middle" fill="black">采样(s,a,r,s')</text>
                  <path d="M300 60 L360 60" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                  <rect x="360" y="40" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="410" y="65" textAnchor="middle" fill="black">TD更新</text>
                  <path d="M460 60 L520 60" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                  <rect x="520" y="40" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="570" y="65" textAnchor="middle" fill="black">下一个回合</text>
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
                  <h4 className="font-semibold mb-2">机器人控制</h4>
                  <p className="text-gray-600">路径规划、动作序列学习</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">推荐系统</h4>
                  <p className="text-gray-600">用户行为序列分析</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">金融市场</h4>
                  <p className="text-gray-600">投资组合优化、风险评估</p>
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
              {/* 练习1：TD(0)预测 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习1：TD(0)预测</h3>
                <p className="text-gray-700 mb-4">
                  实现TD(0)方法来估计给定策略下的状态价值函数。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现TD(0)预测算法</li>
                      <li>计算状态价值函数</li>
                      <li>可视化价值函数变化</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">算法流程图</h4>
                    <div className="flex justify-center mb-4">
                      <svg width="400" height="120" viewBox="0 0 400 120">
                        <defs>
                          <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                          </marker>
                        </defs>
                        <rect x="40" y="40" width="80" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="80" y="65" textAnchor="middle" fill="black">采样(s,a,r,s')</text>
                        <path d="M120 60 L200 60" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
                        <rect x="200" y="40" width="80" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="240" y="65" textAnchor="middle" fill="black">TD更新</text>
                        <path d="M280 60 L360 60" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
                        <rect x="360" y="40" width="80" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="400" y="65" textAnchor="middle" fill="black">下一个回合</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">完整代码</h4>
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
    plt.show()`}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
              {/* 练习2：Q-Learning控制 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习2：Q-Learning控制</h3>
                <p className="text-gray-700 mb-4">
                  实现Q-Learning算法，学习最优策略。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现Q-Learning算法</li>
                      <li>实现ε-贪婪策略</li>
                      <li>可视化Q函数和策略</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">算法流程图</h4>
                    <div className="flex justify-center mb-4">
                      <svg width="400" height="120" viewBox="0 0 400 120">
                        <defs>
                          <marker id="arrowhead4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                          </marker>
                        </defs>
                        <rect x="40" y="40" width="80" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="80" y="65" textAnchor="middle" fill="black">采样(s,a,r,s')</text>
                        <path d="M120 60 L200 60" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead4)"/>
                        <rect x="200" y="40" width="80" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="240" y="65" textAnchor="middle" fill="black">Q值更新</text>
                        <path d="M280 60 L360 60" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead4)"/>
                        <rect x="360" y="40" width="80" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="400" y="65" textAnchor="middle" fill="black">策略改进</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">完整代码</h4>
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
    plt.show()`}
                      </pre>
                    )}
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
            {/* 例题1：网格世界TD(0)预测 */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h3 className="text-xl font-semibold">例题1：网格世界TD(0)预测</h3>
              <div className="space-y-2">
                <h4 className="font-medium">问题描述</h4>
                <p className="text-gray-700">
                  在4x4网格世界中，使用TD(0)方法估计每个状态的价值。
                </p>
                <h4 className="font-medium mt-4">解题思路</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>定义网格世界环境</li>
                  <li>实现TD(0)预测算法</li>
                  <li>可视化状态价值函数</li>
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
    plt.show()
`}
                    </pre>
                  )}
                </div>
              </div>
            </div>
            {/* 例题2：Q-Learning走迷宫 */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h3 className="text-xl font-semibold">例题2：Q-Learning走迷宫</h3>
              <div className="space-y-2">
                <h4 className="font-medium">问题描述</h4>
                <p className="text-gray-700">
                  在一个迷宫环境中，使用Q-Learning算法学习最优路径。
                </p>
                <h4 className="font-medium mt-4">解题思路</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>定义迷宫环境</li>
                  <li>实现Q-Learning算法</li>
                  <li>可视化最优策略</li>
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
{`# 这里可参考上面Q-Learning代码，略。`}
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
            <a href="/study/ai/rl/monte-carlo" className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center hover:bg-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              上一章：蒙特卡洛方法
            </a>
            <a href="/study/ai/rl/q-learning" className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600">
              下一章：Q-Learning
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