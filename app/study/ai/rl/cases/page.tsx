'use client';

import React, { useState } from 'react';

export default function RLCasesPage() {
  const [activeTab, setActiveTab] = useState('theory');
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);
  const [showCode4, setShowCode4] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">强化学习实战</h1>
      
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
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'resources' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('resources')}
        >
          学习资源
        </button>
      </div>

      {/* 主要内容区域 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* 理论知识部分 */}
        {activeTab === 'theory' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">强化学习实战理论基础</h2>
            
            {/* 实战环境配置 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">实战环境配置</h3>
              <p className="text-gray-700 mb-4">
                在进行强化学习实战之前，需要正确配置开发环境，包括Python环境、深度学习框架、
                强化学习库等。本节将介绍完整的环境配置流程和常见问题解决方案。
              </p>
              <div className="flex justify-center my-4">
                <svg width="600" height="300" viewBox="0 0 600 300">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                    </marker>
                  </defs>
                  {/* 环境配置流程图 */}
                  <rect x="50" y="50" width="500" height="200" fill="#f3f4f6" stroke="#666" strokeWidth="2"/>
                  <text x="300" y="30" textAnchor="middle" fill="black">强化学习实战环境配置流程</text>
                  
                  {/* 配置步骤 */}
                  <rect x="100" y="80" width="120" height="40" fill="#93c5fd" stroke="#2563eb" strokeWidth="2"/>
                  <text x="160" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">Python环境</text>
                  
                  <rect x="240" y="80" width="120" height="40" fill="#fca5a5" stroke="#dc2626" strokeWidth="2"/>
                  <text x="300" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">深度学习框架</text>
                  
                  <rect x="380" y="80" width="120" height="40" fill="#86efac" stroke="#16a34a" strokeWidth="2"/>
                  <text x="440" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">强化学习库</text>
                  
                  {/* 连接线 */}
                  <path d="M220 100 L240 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <path d="M360 100 L380 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  {/* 环境检查 */}
                  <rect x="100" y="160" width="400" height="40" fill="#e5e7eb" stroke="#666" strokeWidth="2"/>
                  <text x="300" y="180" textAnchor="middle" dominantBaseline="middle" fill="black">环境检查与验证</text>
                </svg>
              </div>
            </div>

            {/* 实战项目流程 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">实战项目流程</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 问题定义与分析</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>明确任务目标</li>
                    <li>分析环境特征</li>
                    <li>确定评估指标</li>
                    <li>设计奖励机制</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 算法选择与设计</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>基于任务特点选择算法</li>
                    <li>设计网络架构</li>
                    <li>确定超参数</li>
                    <li>实现关键组件</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 训练与调优</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>数据收集与预处理</li>
                    <li>模型训练与监控</li>
                    <li>性能评估与分析</li>
                    <li>参数调优与优化</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4. 部署与应用</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>模型导出与转换</li>
                    <li>环境集成</li>
                    <li>性能优化</li>
                    <li>监控与维护</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 实战技巧与注意事项 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">实战技巧与注意事项</h3>
              <div className="flex justify-center my-4">
                <svg width="600" height="300" viewBox="0 0 600 300">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                    </marker>
                  </defs>
                  {/* 技巧图示 */}
                  <rect x="50" y="50" width="500" height="200" fill="#f3f4f6" stroke="#666" strokeWidth="2"/>
                  <text x="300" y="30" textAnchor="middle" fill="black">强化学习实战要点</text>
                  
                  {/* 核心要点 */}
                  <rect x="100" y="80" width="100" height="60" fill="#93c5fd" stroke="#2563eb" strokeWidth="2"/>
                  <text x="150" y="110" textAnchor="middle" dominantBaseline="middle" fill="black">奖励设计</text>
                  
                  <rect x="250" y="80" width="100" height="60" fill="#fca5a5" stroke="#dc2626" strokeWidth="2"/>
                  <text x="300" y="110" textAnchor="middle" dominantBaseline="middle" fill="black">探索策略</text>
                  
                  <rect x="400" y="80" width="100" height="60" fill="#86efac" stroke="#16a34a" strokeWidth="2"/>
                  <text x="450" y="110" textAnchor="middle" dominantBaseline="middle" fill="black">经验回放</text>
                  
                  {/* 连接线 */}
                  <path d="M200 110 L250 110" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <path d="M350 110 L400 110" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  {/* 注意事项 */}
                  <rect x="100" y="180" width="400" height="40" fill="#e5e7eb" stroke="#666" strokeWidth="2"/>
                  <text x="300" y="200" textAnchor="middle" dominantBaseline="middle" fill="black">稳定性、可扩展性、效率优化</text>
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
              {/* 练习1：自动驾驶场景模拟 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习1：自动驾驶场景模拟</h3>
                <p className="text-gray-700 mb-4">
                  使用强化学习实现一个简单的自动驾驶场景，包括车道保持、避障等基本功能。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>环境建模与状态设计</li>
                      <li>动作空间定义</li>
                      <li>奖励函数设计</li>
                      <li>SAC算法实现</li>
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
{`# 导入必要的库
import gym
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.distributions import Normal

# 定义SAC网络
class SACNetwork(nn.Module):
    def __init__(self, state_dim, action_dim):
        super(SACNetwork, self).__init__()
        # 策略网络
        self.policy = nn.Sequential(
            nn.Linear(state_dim, 256),
            nn.ReLU(),
            nn.Linear(256, 256),
            nn.ReLU(),
            nn.Linear(256, action_dim * 2)  # 均值和标准差
        )
        
        # Q网络
        self.q1 = nn.Sequential(
            nn.Linear(state_dim + action_dim, 256),
            nn.ReLU(),
            nn.Linear(256, 256),
            nn.ReLU(),
            nn.Linear(256, 1)
        )
        
        self.q2 = nn.Sequential(
            nn.Linear(state_dim + action_dim, 256),
            nn.ReLU(),
            nn.Linear(256, 256),
            nn.ReLU(),
            nn.Linear(256, 1)
        )
        
    def forward(self, state):
        # 策略网络输出
        policy_out = self.policy(state)
        mean, log_std = torch.chunk(policy_out, 2, dim=-1)
        log_std = torch.clamp(log_std, -20, 2)
        std = log_std.exp()
        
        # 采样动作
        normal = Normal(mean, std)
        x = normal.rsample()
        action = torch.tanh(x)
        log_prob = normal.log_prob(x)
        
        # 计算log_prob
        log_prob = log_prob - torch.log(1 - action.pow(2) + 1e-6)
        log_prob = log_prob.sum(-1, keepdim=True)
        
        return action, log_prob

# 自动驾驶环境
class DrivingEnv(gym.Env):
    def __init__(self):
        super(DrivingEnv, self).__init__()
        self.observation_space = gym.spaces.Box(
            low=-np.inf, high=np.inf, shape=(6,)
        )
        self.action_space = gym.spaces.Box(
            low=-1, high=1, shape=(2,)
        )
        
    def reset(self):
        # 初始化状态：[x, y, 速度, 方向, 到车道中心距离, 到障碍物距离]
        self.state = np.array([0, 0, 0, 0, 0, 10])
        return self.state
        
    def step(self, action):
        # 更新状态
        steering, acceleration = action
        self.state[0] += self.state[2] * np.cos(self.state[3])
        self.state[1] += self.state[2] * np.sin(self.state[3])
        self.state[2] += acceleration
        self.state[3] += steering
        
        # 计算奖励
        lane_reward = -abs(self.state[4])  # 车道保持奖励
        obstacle_reward = -1 if self.state[5] < 2 else 0  # 避障奖励
        speed_reward = -abs(self.state[2] - 1)  # 速度控制奖励
        
        reward = lane_reward + obstacle_reward + speed_reward
        done = bool(self.state[5] < 1 or abs(self.state[4]) > 2)
        
        return self.state, reward, done, {}`}
                      </pre>
                    )}
                  </div>
                </div>
              </div>

              {/* 练习2：智能机器人导航 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习2：智能机器人导航</h3>
                <p className="text-gray-700 mb-4">
                  实现一个基于TD3算法的智能机器人导航系统，能够在复杂环境中规划路径并避障。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>环境建模</li>
                      <li>TD3算法实现</li>
                      <li>路径规划</li>
                      <li>避障策略</li>
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
{`# 导入必要的库
import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np

# TD3 Actor网络
class Actor(nn.Module):
    def __init__(self, state_dim, action_dim, max_action):
        super(Actor, self).__init__()
        self.l1 = nn.Linear(state_dim, 400)
        self.l2 = nn.Linear(400, 300)
        self.l3 = nn.Linear(300, action_dim)
        self.max_action = max_action
        
    def forward(self, state):
        a = F.relu(self.l1(state))
        a = F.relu(self.l2(a))
        return self.max_action * torch.tanh(self.l3(a))

# TD3 Critic网络
class Critic(nn.Module):
    def __init__(self, state_dim, action_dim):
        super(Critic, self).__init__()
        # Q1
        self.l1 = nn.Linear(state_dim + action_dim, 400)
        self.l2 = nn.Linear(400, 300)
        self.l3 = nn.Linear(300, 1)
        
        # Q2
        self.l4 = nn.Linear(state_dim + action_dim, 400)
        self.l5 = nn.Linear(400, 300)
        self.l6 = nn.Linear(300, 1)
        
    def forward(self, state, action):
        sa = torch.cat([state, action], 1)
        
        q1 = F.relu(self.l1(sa))
        q1 = F.relu(self.l2(q1))
        q1 = self.l3(q1)
        
        q2 = F.relu(self.l4(sa))
        q2 = F.relu(self.l5(q2))
        q2 = self.l6(q2)
        return q1, q2

# TD3算法实现
class TD3:
    def __init__(self, state_dim, action_dim, max_action):
        self.actor = Actor(state_dim, action_dim, max_action)
        self.actor_target = Actor(state_dim, action_dim, max_action)
        self.actor_target.load_state_dict(self.actor.state_dict())
        self.actor_optimizer = torch.optim.Adam(self.actor.parameters())
        
        self.critic = Critic(state_dim, action_dim)
        self.critic_target = Critic(state_dim, action_dim)
        self.critic_target.load_state_dict(self.critic.state_dict())
        self.critic_optimizer = torch.optim.Adam(self.critic.parameters())
        
        self.max_action = max_action
        
    def select_action(self, state):
        state = torch.FloatTensor(state.reshape(1, -1))
        return self.actor(state).cpu().data.numpy().flatten()
        
    def train(self, replay_buffer, iterations, batch_size=100, discount=0.99,
             tau=0.005, policy_noise=0.2, noise_clip=0.5, policy_freq=2):
        
        for it in range(iterations):
            # 从经验回放中采样
            state, action, next_state, reward, done = replay_buffer.sample(batch_size)
            
            # 选择动作
            noise = torch.randn_like(action) * policy_noise
            noise = noise.clamp(-noise_clip, noise_clip)
            
            next_action = (
                self.actor_target(next_state) + noise
            ).clamp(-self.max_action, self.max_action)
            
            # 计算目标Q值
            target_Q1, target_Q2 = self.critic_target(next_state, next_action)
            target_Q = torch.min(target_Q1, target_Q2)
            target_Q = reward + (1 - done) * discount * target_Q
            
            # 获取当前Q值
            current_Q1, current_Q2 = self.critic(state, action)
            
            # 计算Critic损失
            critic_loss = F.mse_loss(current_Q1, target_Q) + F.mse_loss(current_Q2, target_Q)
            
            # 优化Critic
            self.critic_optimizer.zero_grad()
            critic_loss.backward()
            self.critic_optimizer.step()
            
            # 延迟策略更新
            if it % policy_freq == 0:
                # 计算Actor损失
                actor_loss = -self.critic.Q1(state, self.actor(state)).mean()
                
                # 优化Actor
                self.actor_optimizer.zero_grad()
                actor_loss.backward()
                self.actor_optimizer.step()
                
                # 更新目标网络
                for param, target_param in zip(self.critic.parameters(), self.critic_target.parameters()):
                    target_param.data.copy_(tau * param.data + (1 - tau) * target_param.data)
                    
                for param, target_param in zip(self.actor.parameters(), self.actor_target.parameters()):
                    target_param.data.copy_(tau * param.data + (1 - tau) * target_param.data)`}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 学习资源部分 */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">学习资源</h2>
            
            {/* 推荐书籍 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">推荐书籍</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">《强化学习导论》</h4>
                  <p className="text-gray-600">
                    Richard S. Sutton 和 Andrew G. Barto 的经典著作，全面介绍强化学习的基础理论和算法。
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">《深度强化学习》</h4>
                  <p className="text-gray-600">
                    结合深度学习和强化学习的前沿技术，包含大量实战案例和代码实现。
                  </p>
                </div>
              </div>
            </div>

            {/* 在线课程 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">在线课程</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Coursera - 强化学习专项课程</h4>
                  <p className="text-gray-600">
                    由阿尔伯塔大学提供的系列课程，从基础到进阶，包含大量实践项目。
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Udacity - 深度强化学习纳米学位</h4>
                  <p className="text-gray-600">
                    专注于深度强化学习的实践应用，包含多个实战项目。
                  </p>
                </div>
              </div>
            </div>

            {/* 开源项目 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">开源项目</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Stable Baselines3</h4>
                  <p className="text-gray-600">
                    基于PyTorch的强化学习算法实现库，提供了多种主流算法的实现。
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">RLlib</h4>
                  <p className="text-gray-600">
                    Ray框架的强化学习库，支持分布式训练和多种算法实现。
                  </p>
                </div>
              </div>
            </div>

            {/* 学习社区 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">学习社区</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Reddit r/reinforcementlearning</h4>
                  <p className="text-gray-600">
                    活跃的强化学习讨论社区，分享最新研究进展和实践经验。
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">GitHub Discussions</h4>
                  <p className="text-gray-600">
                    各大强化学习框架的GitHub讨论区，可以获取技术支持和交流经验。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 例题练习部分 - 继续添加更多例题 */}
        {activeTab === 'examples' && (
          <div className="space-y-6">
            {/* 例题2：游戏AI */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4 mb-6">
              <h3 className="text-xl font-semibold">例题2：游戏AI开发</h3>
              <div className="space-y-2">
                <h4 className="font-medium">问题描述</h4>
                <p className="text-gray-700">
                  使用PPO算法开发一个游戏AI，能够自动学习游戏规则并达到较高的游戏水平。
                  以简单的贪吃蛇游戏为例，实现AI自动控制蛇的移动。
                </p>
                
                <h4 className="font-medium mt-4">解题思路</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>设计游戏环境</li>
                  <li>实现PPO算法</li>
                  <li>设计奖励函数</li>
                  <li>训练与评估AI</li>
                </ol>

                <div className="bg-white p-4 rounded-lg mt-4">
                  <h4 className="font-medium">代码实现</h4>
                  <button 
                    onClick={() => setShowCode4(!showCode4)}
                    className="flex items-center text-blue-500 hover:text-blue-700 mb-2"
                  >
                    <svg 
                      className={`w-4 h-4 mr-2 transform transition-transform ${showCode4 ? 'rotate-90' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    {showCode4 ? '隐藏代码' : '显示代码'}
                  </button>
                  {showCode4 && (
                    <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-x-auto">
{`# 导入必要的库
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.distributions import Categorical

# 定义PPO网络
class PPONetwork(nn.Module):
    def __init__(self, state_dim, action_dim):
        super(PPONetwork, self).__init__()
        self.actor = nn.Sequential(
            nn.Linear(state_dim, 64),
            nn.ReLU(),
            nn.Linear(64, 64),
            nn.ReLU(),
            nn.Linear(64, action_dim),
            nn.Softmax(dim=-1)
        )
        
        self.critic = nn.Sequential(
            nn.Linear(state_dim, 64),
            nn.ReLU(),
            nn.Linear(64, 64),
            nn.ReLU(),
            nn.Linear(64, 1)
        )
        
    def forward(self, state):
        return self.actor(state), self.critic(state)

# 贪吃蛇环境
class SnakeEnv:
    def __init__(self, size=10):
        self.size = size
        self.reset()
        
    def reset(self):
        self.snake = [(self.size//2, self.size//2)]
        self.direction = np.random.randint(0, 4)
        self.food = self._place_food()
        self.score = 0
        return self._get_state()
        
    def _place_food(self):
        while True:
            food = (np.random.randint(0, self.size),
                   np.random.randint(0, self.size))
            if food not in self.snake:
                return food
                
    def _get_state(self):
        state = np.zeros((self.size, self.size))
        for x, y in self.snake:
            state[x, y] = 1
        state[self.food] = 2
        return state.flatten()
        
    def step(self, action):
        # 0: 直行, 1: 左转, 2: 右转
        if action == 1:
            self.direction = (self.direction - 1) % 4
        elif action == 2:
            self.direction = (self.direction + 1) % 4
            
        # 移动蛇
        head = self.snake[0]
        if self.direction == 0:  # 上
            new_head = (head[0] - 1, head[1])
        elif self.direction == 1:  # 右
            new_head = (head[0], head[1] + 1)
        elif self.direction == 2:  # 下
            new_head = (head[0] + 1, head[1])
        else:  # 左
            new_head = (head[0], head[1] - 1)
            
        # 检查是否撞墙
        if (new_head[0] < 0 or new_head[0] >= self.size or
            new_head[1] < 0 or new_head[1] >= self.size):
            return self._get_state(), -1, True, {}
            
        # 检查是否撞到自己
        if new_head in self.snake:
            return self._get_state(), -1, True, {}
            
        self.snake.insert(0, new_head)
        
        # 检查是否吃到食物
        if new_head == self.food:
            self.score += 1
            self.food = self._place_food()
            reward = 1
        else:
            self.snake.pop()
            reward = 0
            
        return self._get_state(), reward, False, {}

# PPO算法实现
class PPO:
    def __init__(self, state_dim, action_dim):
        self.network = PPONetwork(state_dim, action_dim)
        self.optimizer = optim.Adam(self.network.parameters())
        
    def select_action(self, state):
        state = torch.FloatTensor(state)
        probs, value = self.network(state)
        dist = Categorical(probs)
        action = dist.sample()
        return action.item(), dist.log_prob(action), value
        
    def update(self, states, actions, old_log_probs, returns, advantages):
        states = torch.FloatTensor(states)
        actions = torch.LongTensor(actions)
        old_log_probs = torch.FloatTensor(old_log_probs)
        returns = torch.FloatTensor(returns)
        advantages = torch.FloatTensor(advantages)
        
        probs, values = self.network(states)
        dist = Categorical(probs)
        new_log_probs = dist.log_prob(actions)
        entropy = dist.entropy().mean()
        
        ratio = torch.exp(new_log_probs - old_log_probs)
        surr1 = ratio * advantages
        surr2 = torch.clamp(ratio, 0.8, 1.2) * advantages
        actor_loss = -torch.min(surr1, surr2).mean()
        
        critic_loss = 0.5 * (returns - values.squeeze()).pow(2).mean()
        
        loss = actor_loss + 0.5 * critic_loss - 0.01 * entropy
        
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()
        
        return actor_loss.item(), critic_loss.item()

# 训练过程
def train_ppo():
    env = SnakeEnv()
    state_dim = env.size * env.size
    action_dim = 3
    
    ppo = PPO(state_dim, action_dim)
    episodes = 1000
    max_steps = 100
    
    for episode in range(episodes):
        state = env.reset()
        episode_reward = 0
        states = []
        actions = []
        log_probs = []
        values = []
        rewards = []
        
        for step in range(max_steps):
            action, log_prob, value = ppo.select_action(state)
            next_state, reward, done, _ = env.step(action)
            
            states.append(state)
            actions.append(action)
            log_probs.append(log_prob)
            values.append(value)
            rewards.append(reward)
            
            state = next_state
            episode_reward += reward
            
            if done:
                break
                
        # 计算回报和优势
        returns = []
        advantages = []
        R = 0
        for r in rewards[::-1]:
            R = r + 0.99 * R
            returns.insert(0, R)
            
        returns = torch.FloatTensor(returns)
        values = torch.FloatTensor(values)
        advantages = returns - values.squeeze()
        
        # 更新网络
        actor_loss, critic_loss = ppo.update(
            states, actions, log_probs, returns, advantages
        )
        
        print(f"Episode {episode}, Reward: {episode_reward}, "
              f"Actor Loss: {actor_loss:.2f}, Critic Loss: {critic_loss:.2f}")

if __name__ == "__main__":
    train_ppo()`}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航栏 */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <a 
            href="/study/ai/rl/frameworks" 
            className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center hover:bg-gray-600"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M15 19l-7-7 7-7"
              />
            </svg>
            上一章：强化学习框架
          </a>
          <a 
            href="/study/ai/rl/interview" 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors"
          >
            下一章：强化学习面试题
            <svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 