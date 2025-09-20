'use client';

import React, { useState } from 'react';

export default function QLearningPage() {
  const [activeTab, setActiveTab] = useState('theory');
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Q-Learning算法</h1>
      
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
            <h2 className="text-2xl font-bold mb-4">Q-Learning算法概述</h2>
            
            {/* 基本概念 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">基本概念</h3>
              <p className="text-gray-700 mb-4">
                Q-Learning是一种基于值迭代的强化学习算法，它通过不断更新状态-动作值函数（Q函数）来学习最优策略。
                Q-Learning是一种无模型（model-free）的算法，不需要环境模型，可以直接从经验中学习。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>核心思想：</strong>通过时序差分学习更新Q值，逐步逼近最优策略。
                </p>
              </div>
              <div className="flex justify-center my-4">
                <svg width="600" height="250" viewBox="0 0 600 250">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                    </marker>
                  </defs>
                  {/* 状态部分 */}
                  <rect x="50" y="50" width="120" height="60" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="110" y="85" textAnchor="middle" fill="black">状态s</text>
                  <path d="M170 80 L190 80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  {/* 动作部分 */}
                  <rect x="190" y="50" width="120" height="60" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="250" y="85" textAnchor="middle" fill="black">动作a</text>
                  <path d="M310 80 L330 80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  {/* 奖励部分 */}
                  <rect x="330" y="50" width="120" height="60" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="390" y="85" textAnchor="middle" fill="black">奖励r</text>
                  
                  {/* Q值更新 */}
                  <path d="M390 110 L390 150 L110 150 L110 110" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <text x="250" y="170" textAnchor="middle" fill="black">Q值更新</text>
                </svg>
              </div>
            </div>

            {/* 算法原理 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">算法原理</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. Q值更新公式</h4>
                  <p className="text-gray-600">Q(s,a) ← Q(s,a) + α[r + γ·max(Q(s',a')) - Q(s,a)]</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 参数说明</h4>
                  <p className="text-gray-600">α: 学习率，γ: 折扣因子，r: 即时奖励</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 探索策略</h4>
                  <p className="text-gray-600">ε-贪婪策略平衡探索与利用</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4. 收敛性</h4>
                  <p className="text-gray-600">在满足条件下保证收敛到最优策略</p>
                </div>
              </div>
              <div className="flex justify-center my-4">
                <svg width="600" height="200" viewBox="0 0 600 200">
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
                  <text x="400" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">更新Q值</text>
                </svg>
              </div>
            </div>

            {/* 优势与特点 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">优势与特点</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 无模型学习</h4>
                  <p className="text-gray-600">不需要环境模型，直接从经验中学习</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 离线学习</h4>
                  <p className="text-gray-600">可以使用历史数据进行学习</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 收敛性保证</h4>
                  <p className="text-gray-600">在适当条件下保证收敛到最优策略</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4. 简单实现</h4>
                  <p className="text-gray-600">算法简单，易于理解和实现</p>
                </div>
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
              {/* 练习1：基础Q-Learning实现 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习1：基础Q-Learning实现</h3>
                <p className="text-gray-700 mb-4">
                  实现基本的Q-Learning算法，包括Q值更新和ε-贪婪策略。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现Q-Learning核心算法</li>
                      <li>实现ε-贪婪策略</li>
                      <li>可视化学习过程</li>
                    </ul>
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
                  实现Q-Learning控制算法，学习最优策略。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现Q-Learning控制算法</li>
                      <li>实现策略改进</li>
                      <li>可视化学习过程</li>
                    </ul>
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
            
            {/* 迷宫Q-Learning */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h3 className="text-xl font-semibold">例题1：迷宫Q-Learning</h3>
              <div className="space-y-2">
                <h4 className="font-medium">问题描述</h4>
                <p className="text-gray-700">
                  在一个迷宫中，智能体需要从起点到达终点。迷宫中有障碍物和奖励点，
                  智能体需要学习最优路径以最大化累积奖励。
                </p>
                
                <h4 className="font-medium mt-4">解题思路</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>使用Q-Learning算法学习最优策略</li>
                  <li>定义状态空间和动作空间</li>
                  <li>实现奖励函数</li>
                  <li>使用ε-贪婪策略进行探索</li>
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
            <a href="/study/ai/rl/temporal-difference" className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center hover:bg-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              上一章：时序差分学习
            </a>
            <a href="/study/ai/rl/policy-gradient" className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors">
              下一章：策略梯度
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
