'use client';

import React, { useState } from 'react';

export default function RLBasic() {
  const [activeTab, setActiveTab] = useState('theory');
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">强化学习基础</h1>
      
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
            <h2 className="text-2xl font-bold mb-4">强化学习（Reinforcement Learning）概述</h2>
            
            {/* 基本概念 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">基本概念</h3>
              <p className="text-gray-700 mb-4">
                强化学习是机器学习的一个重要分支，它通过让智能体（Agent）在与环境（Environment）的交互中学习最优策略。
                智能体通过尝试不同的动作（Action），观察环境的状态（State）和获得的奖励（Reward），逐步学习如何最大化长期累积奖励。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>核心思想：</strong>通过"试错"（Trial and Error）的方式学习，从经验中不断改进策略。
                </p>
              </div>
              
              {/* 强化学习交互过程图 */}
              <div className="my-8">
                <svg className="w-full max-w-3xl mx-auto" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                  {/* 背景 */}
                  <rect x="0" y="0" width="800" height="400" fill="#f8fafc" />
                  
                  {/* 智能体 */}
                  <circle cx="200" cy="200" r="60" fill="#3b82f6" opacity="0.2" />
                  <text x="200" y="200" textAnchor="middle" dominantBaseline="middle" className="text-lg font-semibold">智能体</text>
                  
                  {/* 环境 */}
                  <rect x="500" y="100" width="200" height="200" fill="#10b981" opacity="0.2" />
                  <text x="600" y="200" textAnchor="middle" dominantBaseline="middle" className="text-lg font-semibold">环境</text>
                  
                  {/* 交互箭头 */}
                  <path d="M260 200 L500 200" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <text x="380" y="190" textAnchor="middle" className="text-sm">动作</text>
                  
                  <path d="M500 200 L260 200" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <text x="380" y="230" textAnchor="middle" className="text-sm">状态和奖励</text>
                  
                  {/* 箭头标记定义 */}
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>

            {/* 核心要素 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">核心要素</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 智能体（Agent）</h4>
                  <p className="text-gray-600">学习的主体，负责做出决策和执行动作</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 环境（Environment）</h4>
                  <p className="text-gray-600">智能体所处的世界，提供状态和奖励信息</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 状态（State）</h4>
                  <p className="text-gray-600">环境在某一时刻的完整描述</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4. 动作（Action）</h4>
                  <p className="text-gray-600">智能体可以执行的操作</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">5. 奖励（Reward）</h4>
                  <p className="text-gray-600">环境对智能体动作的反馈信号</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">6. 策略（Policy）</h4>
                  <p className="text-gray-600">智能体的决策规则，决定在给定状态下选择什么动作</p>
                </div>
              </div>

              {/* 强化学习循环图 */}
              <div className="my-8">
                <svg className="w-full max-w-3xl mx-auto" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                  {/* 背景 */}
                  <rect x="0" y="0" width="800" height="400" fill="#f8fafc" />
                  
                  {/* 循环箭头 */}
                  <path d="M400 100 C600 100, 600 300, 400 300 C200 300, 200 100, 400 100" 
                        stroke="#3b82f6" strokeWidth="3" fill="none" />
                  
                  {/* 节点 */}
                  <circle cx="400" cy="100" r="30" fill="#3b82f6" />
                  <text x="400" y="100" textAnchor="middle" dominantBaseline="middle" fill="white">状态</text>
                  
                  <circle cx="600" cy="200" r="30" fill="#3b82f6" />
                  <text x="600" y="200" textAnchor="middle" dominantBaseline="middle" fill="white">动作</text>
                  
                  <circle cx="400" cy="300" r="30" fill="#3b82f6" />
                  <text x="400" y="300" textAnchor="middle" dominantBaseline="middle" fill="white">奖励</text>
                  
                  <circle cx="200" cy="200" r="30" fill="#3b82f6" />
                  <text x="200" y="200" textAnchor="middle" dominantBaseline="middle" fill="white">策略</text>
                  
                  {/* 箭头标记定义 */}
                  <defs>
                    <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>

            {/* 主要特点 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">主要特点</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>延迟奖励：动作的后果可能在未来才能体现</li>
                <li>探索与利用：需要在尝试新动作和利用已知好动作之间平衡</li>
                <li>序列决策：当前决策会影响未来的状态和奖励</li>
                <li>在线学习：通过与环境交互实时学习</li>
              </ul>

              {/* 探索与利用平衡图 */}
              <div className="my-8">
                <svg className="w-full max-w-3xl mx-auto" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                  {/* 背景 */}
                  <rect x="0" y="0" width="800" height="400" fill="#f8fafc" />
                  
                  {/* 坐标轴 */}
                  <line x1="100" y1="300" x2="700" y2="300" stroke="#64748b" strokeWidth="2" />
                  <line x1="100" y1="300" x2="100" y2="100" stroke="#64748b" strokeWidth="2" />
                  
                  {/* 探索曲线 */}
                  <path d="M100 300 Q400 100 700 200" 
                        stroke="#3b82f6" strokeWidth="3" fill="none" />
                  <text x="400" y="80" textAnchor="middle" className="text-sm">探索</text>
                  
                  {/* 利用曲线 */}
                  <path d="M100 300 Q400 250 700 150" 
                        stroke="#10b981" strokeWidth="3" fill="none" />
                  <text x="400" y="270" textAnchor="middle" className="text-sm">利用</text>
                  
                  {/* 平衡点 */}
                  <circle cx="400" cy="175" r="5" fill="#ef4444" />
                  <text x="420" y="175" className="text-sm">平衡点</text>
                </svg>
              </div>
            </div>

            {/* 应用场景 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">应用场景</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">游戏AI</h4>
                  <p className="text-gray-600">如AlphaGo、星际争霸AI等</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">机器人控制</h4>
                  <p className="text-gray-600">如机械臂操作、机器人导航等</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">自动驾驶</h4>
                  <p className="text-gray-600">如路径规划、决策控制等</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">资源调度</h4>
                  <p className="text-gray-600">如网络资源分配、能源管理等</p>
                </div>
              </div>

              {/* 应用场景图 */}
              <div className="my-8">
                <svg className="w-full max-w-3xl mx-auto" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                  {/* 背景 */}
                  <rect x="0" y="0" width="800" height="400" fill="#f8fafc" />
                  
                  {/* 中心圆 */}
                  <circle cx="400" cy="200" r="100" fill="#3b82f6" opacity="0.1" />
                  <text x="400" y="200" textAnchor="middle" dominantBaseline="middle" className="text-lg font-semibold">强化学习</text>
                  
                  {/* 应用场景连接线 */}
                  <line x1="400" y1="100" x2="400" y2="50" stroke="#64748b" strokeWidth="2" />
                  <text x="400" y="40" textAnchor="middle" className="text-sm">游戏AI</text>
                  
                  <line x1="500" y1="200" x2="600" y2="200" stroke="#64748b" strokeWidth="2" />
                  <text x="650" y="200" textAnchor="middle" className="text-sm">机器人控制</text>
                  
                  <line x1="400" y1="300" x2="400" y2="350" stroke="#64748b" strokeWidth="2" />
                  <text x="400" y="370" textAnchor="middle" className="text-sm">自动驾驶</text>
                  
                  <line x1="300" y1="200" x2="200" y2="200" stroke="#64748b" strokeWidth="2" />
                  <text x="150" y="200" textAnchor="middle" className="text-sm">资源调度</text>
                </svg>
              </div>
            </div>

            {/* 学习建议 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">学习建议</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>先掌握概率论、线性代数等数学基础</li>
                  <li>理解马尔可夫决策过程（MDP）的基本概念</li>
                  <li>从简单的表格型方法开始学习</li>
                  <li>逐步过渡到深度强化学习</li>
                  <li>多动手实践，从简单的环境开始</li>
                </ul>
              </div>

              {/* 学习路径图 */}
              <div className="my-8">
                <svg className="w-full max-w-3xl mx-auto" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                  {/* 背景 */}
                  <rect x="0" y="0" width="800" height="400" fill="#f8fafc" />
                  
                  {/* 学习路径 */}
                  <path d="M100 200 L300 200 L500 200 L700 200" 
                        stroke="#3b82f6" strokeWidth="3" fill="none" />
                  
                  {/* 节点 */}
                  <circle cx="100" cy="200" r="30" fill="#3b82f6" />
                  <text x="100" y="200" textAnchor="middle" dominantBaseline="middle" fill="white">数学基础</text>
                  
                  <circle cx="300" cy="200" r="30" fill="#3b82f6" />
                  <text x="300" y="200" textAnchor="middle" dominantBaseline="middle" fill="white">MDP</text>
                  
                  <circle cx="500" cy="200" r="30" fill="#3b82f6" />
                  <text x="500" y="200" textAnchor="middle" dominantBaseline="middle" fill="white">表格方法</text>
                  
                  <circle cx="700" cy="200" r="30" fill="#3b82f6" />
                  <text x="700" y="200" textAnchor="middle" dominantBaseline="middle" fill="white">深度RL</text>
                  
                  {/* 箭头标记定义 */}
                  <defs>
                    <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                    </marker>
                  </defs>
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
              {/* 练习1：简单环境探索 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习1：简单环境探索</h3>
                <p className="text-gray-700 mb-4">
                  使用Python和Gym库实现一个简单的强化学习环境，让智能体学习如何在一个简单的网格世界中导航。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现一个2x2网格世界</li>
                      <li>智能体需要从起点到达终点</li>
                      <li>使用Q-learning算法进行学习</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">代码框架</h4>
                    <pre className="bg-gray-100 p-3 rounded-lg text-sm">
{`import gym
import numpy as np

class SimpleGridWorld(gym.Env):
    def __init__(self):
        self.grid_size = 2
        self.action_space = gym.spaces.Discrete(4)
        self.observation_space = gym.spaces.Discrete(4)
        
    def step(self, action):
        # 实现环境交互逻辑
        pass
        
    def reset(self):
        # 重置环境
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
    V = np.zeros(env.nS)
    while True:
        delta = 0
        for s in range(env.nS):
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
          </div>
        )}

        {/* 例题练习部分 */}
        {activeTab === 'examples' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">例题练习</h2>
            
            <div className="space-y-8">
              {/* 例题1 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">例题1：马尔可夫决策过程</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-gray-700 mb-4">
                      考虑一个简单的网格世界，智能体可以向上、下、左、右移动。每个动作有0.8的概率按预期方向移动，
                      0.1的概率向左偏转，0.1的概率向右偏转。如果撞墙则停留在原地。奖励函数为：到达目标状态获得+1，
                      其他状态获得-0.1。
                    </p>
                    <div className="space-y-2">
                      <p className="font-semibold">问题：</p>
                      <ol className="list-decimal list-inside text-gray-600">
                        <li>写出这个问题的状态空间、动作空间和转移概率</li>
                        <li>计算最优策略下的状态价值函数</li>
                        <li>分析不同折扣因子对最优策略的影响</li>
                      </ol>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">参考答案</h4>
                    <div className="space-y-2 text-gray-600">
                      <p>1. 状态空间：S = {"{(0,0), (0,1), (1,0), (1,1)}"}</p>
                      <p>动作空间：A = ["上", "下", "左", "右"]</p>
                      <p>转移概率：P(s'|s,a) = 0.8 如果s'是预期方向</p>
                      <p>P(s'|s,a) = 0.1 如果s'是左偏转方向</p>
                      <p>P(s'|s,a) = 0.1 如果s'是右偏转方向</p>
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

class GridWorld:
    def __init__(self, size=2):
        self.size = size
        self.n_states = size * size
        self.n_actions = 4  # 上、下、左、右
        self.P = self._build_transition_matrix()
        self.R = self._build_reward_matrix()
        
    def _build_transition_matrix(self):
        # 构建转移概率矩阵 P[s][a][s'] = P(s'|s,a)
        P = np.zeros((self.n_states, self.n_actions, self.n_states))
        
        # 对于每个状态和动作
        for s in range(self.n_states):
            for a in range(self.n_actions):
                # 预期方向
                next_state = self._get_next_state(s, a)
                P[s][a][next_state] = 0.8
                
                # 左偏转
                left_state = self._get_next_state(s, (a-1)%4)
                P[s][a][left_state] = 0.1
                
                # 右偏转
                right_state = self._get_next_state(s, (a+1)%4)
                P[s][a][right_state] = 0.1
                
        return P
    
    def _get_next_state(self, state, action):
        # 获取下一个状态
        x, y = state // self.size, state % self.size
        
        if action == 0:  # 上
            x = max(0, x-1)
        elif action == 1:  # 下
            x = min(self.size-1, x+1)
        elif action == 2:  # 左
            y = max(0, y-1)
        elif action == 3:  # 右
            y = min(self.size-1, y+1)
            
        return x * self.size + y
    
    def _build_reward_matrix(self):
        # 构建奖励矩阵
        R = np.full((self.n_states, self.n_actions), -0.1)
        # 目标状态(1,1)的奖励为1
        R[-1] = 1.0
        return R

# 使用示例
env = GridWorld()
print("转移概率矩阵形状:", env.P.shape)
print("奖励矩阵形状:", env.R.shape)`}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 例题2 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">例题2：Q-learning算法</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-gray-700 mb-4">
                      在一个简单的2x2网格世界中，使用Q-learning算法学习最优策略。学习率α=0.1，折扣因子γ=0.9，
                      探索率ε=0.1。初始Q值都设为0。
                    </p>
                    <div className="space-y-2">
                      <p className="font-semibold">问题：</p>
                      <ol className="list-decimal list-inside text-gray-600">
                        <li>写出Q-learning的更新公式</li>
                        <li>分析探索率ε对学习过程的影响</li>
                        <li>讨论如何设计奖励函数以加快学习速度</li>
                      </ol>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">参考答案</h4>
                    <div className="space-y-2 text-gray-600">
                      <p>1. Q(s,a) ← Q(s,a) + α[r + γ max Q(s',a') - Q(s,a)]</p>
                      <p>2. 较大的ε值增加探索，较小的ε值增加利用</p>
                      <p>3. 可以使用稀疏奖励、密集奖励或奖励塑形</p>
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

class QLearning:
    def __init__(self, n_states, n_actions, alpha=0.1, gamma=0.9, epsilon=0.1):
        self.n_states = n_states
        self.n_actions = n_actions
        self.alpha = alpha  # 学习率
        self.gamma = gamma  # 折扣因子
        self.epsilon = epsilon  # 探索率
        self.Q = np.zeros((n_states, n_actions))  # Q值表
        
    def choose_action(self, state):
        # ε-贪婪策略选择动作
        if np.random.random() < self.epsilon:
            return np.random.randint(self.n_actions)  # 探索
        else:
            return np.argmax(self.Q[state])  # 利用
            
    def learn(self, state, action, reward, next_state):
        # Q-learning更新
        old_value = self.Q[state, action]
        next_max = np.max(self.Q[next_state])
        new_value = old_value + self.alpha * (reward + self.gamma * next_max - old_value)
        self.Q[state, action] = new_value
        
    def get_policy(self):
        # 获取最优策略
        return np.argmax(self.Q, axis=1)

# 使用示例
n_states = 4  # 2x2网格
n_actions = 4  # 上、下、左、右
agent = QLearning(n_states, n_actions)

# 训练过程
for episode in range(1000):
    state = 0  # 起始状态
    done = False
    
    while not done:
        action = agent.choose_action(state)
        # 执行动作，获取下一个状态和奖励
        next_state = env.step(action)
        reward = env.R[state, action]
        
        # 更新Q值
        agent.learn(state, action, reward, next_state)
        
        state = next_state
        if state == 3:  # 到达目标状态
            done = True

# 获取最优策略
optimal_policy = agent.get_policy()
print("最优策略:", optimal_policy)`}
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
          <div className="flex justify-end items-center">
            <a href="/study/ai/rl/mdp" className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors">
              下一章：马尔可夫决策过程
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