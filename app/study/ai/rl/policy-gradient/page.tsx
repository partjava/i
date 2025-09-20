'use client';

import React, { useState } from 'react';

export default function PolicyGradientPage() {
  const [activeTab, setActiveTab] = useState('theory');
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">策略梯度</h1>
      
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
            <h2 className="text-2xl font-bold mb-4">策略梯度概述</h2>
            
            {/* 基本概念 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">基本概念</h3>
              <p className="text-gray-700 mb-4">
                策略梯度是一种直接优化策略的方法，通过梯度上升来最大化期望回报。
                它适用于连续动作空间和离散动作空间。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>核心思想：</strong>通过梯度上升来优化策略，以最大化期望回报。
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
                  <text x="100" y="70" textAnchor="middle" fill="black">策略π</text>
                  <path d="M150 70 L170 70" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="170" y="50" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="220" y="70" textAnchor="middle" fill="black">动作a</text>
                  <path d="M270 70 L290 70" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="290" y="50" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="340" y="70" textAnchor="middle" fill="black">奖励r</text>
                  <path d="M220 90 L220 110" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <rect x="170" y="110" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="220" y="130" textAnchor="middle" fill="black">梯度更新</text>
                </svg>
              </div>
            </div>

            {/* 算法原理 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">算法原理</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 策略梯度公式</h4>
                  <p className="text-gray-600">∇J(θ) = E[∇log(π(a|s)) * R]</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 参数说明</h4>
                  <p className="text-gray-600">θ: 策略参数，R: 回报</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 探索策略</h4>
                  <p className="text-gray-600">使用随机策略进行探索</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4. 收敛性</h4>
                  <p className="text-gray-600">在满足条件下保证收敛到最优策略</p>
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
                  <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">选择动作</text>
                  <path d="M140 100 L160 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <circle cx="200" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="200" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">执行动作</text>
                  <path d="M240 100 L260 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <circle cx="300" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="300" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">观察奖励</text>
                  <path d="M340 100 L360 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <circle cx="400" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="400" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">更新策略</text>
                </svg>
              </div>
            </div>

            {/* 应用场景 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">应用场景</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">游戏AI</h4>
                  <p className="text-gray-600">如Atari游戏、棋类游戏等</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">机器人控制</h4>
                  <p className="text-gray-600">路径规划、动作控制</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">资源调度</h4>
                  <p className="text-gray-600">任务分配、负载均衡</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">推荐系统</h4>
                  <p className="text-gray-600">个性化推荐、广告投放</p>
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
              {/* 练习1：基础策略梯度实现 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习1：基础策略梯度实现</h3>
                <p className="text-gray-700 mb-4">
                  实现基本的策略梯度算法，包括策略更新和梯度计算。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现策略梯度核心算法</li>
                      <li>实现梯度计算</li>
                      <li>可视化学习过程</li>
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
                        <text x="200" y="40" textAnchor="middle" dominantBaseline="middle">初始化策略</text>
                        <path d="M200 60 L200 80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="80" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="100" textAnchor="middle" dominantBaseline="middle">选择动作</text>
                        <path d="M200 120 L200 140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="140" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="160" textAnchor="middle" dominantBaseline="middle">执行动作</text>
                        <path d="M200 180 L200 200" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="200" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="220" textAnchor="middle" dominantBaseline="middle">更新策略</text>
                        <path d="M200 240 L200 260" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="260" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="280" textAnchor="middle" dominantBaseline="middle">下一状态</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">代码实现</h4>
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
        plt.show()`}
                      </pre>
                    )}
                  </div>
                </div>
              </div>

              {/* 练习2：策略梯度控制 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习2：策略梯度控制</h3>
                <p className="text-gray-700 mb-4">
                  实现策略梯度控制算法，学习最优策略。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现策略梯度控制算法</li>
                      <li>实现策略改进</li>
                      <li>可视化学习过程</li>
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
                        <text x="200" y="40" textAnchor="middle" dominantBaseline="middle">初始化策略</text>
                        <path d="M200 60 L200 80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="80" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="100" textAnchor="middle" dominantBaseline="middle">选择动作</text>
                        <path d="M200 120 L200 140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="140" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="160" textAnchor="middle" dominantBaseline="middle">执行动作</text>
                        <path d="M200 180 L200 200" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="200" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="220" textAnchor="middle" dominantBaseline="middle">更新策略</text>
                        <path d="M200 240 L200 260" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="260" width="100" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="200" y="280" textAnchor="middle" dominantBaseline="middle">下一状态</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">代码实现</h4>
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
            
            {/* 迷宫策略梯度 */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h3 className="text-xl font-semibold">例题1：迷宫策略梯度</h3>
              <div className="space-y-2">
                <h4 className="font-medium">问题描述</h4>
                <p className="text-gray-700">
                  在一个迷宫中，智能体需要从起点到达终点。迷宫中有障碍物和奖励点，
                  智能体需要学习最优路径以最大化累积奖励。
                </p>
                
                <h4 className="font-medium mt-4">解题思路</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>使用策略梯度算法学习最优策略</li>
                  <li>定义状态空间和动作空间</li>
                  <li>实现奖励函数</li>
                  <li>使用随机策略进行探索</li>
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
    plt.show()`}
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
            <a href="/study/ai/rl/q-learning" className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center hover:bg-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              上一章：Q-Learning
            </a>
            <a href="/study/ai/rl/actor-critic" className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors">
              下一章：Actor-Critic算法
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