'use client';

import React, { useState } from 'react';

export default function MultiAgentRLPage() {
  const [activeTab, setActiveTab] = useState('theory');
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">多智能体强化学习</h1>
      
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
            <h2 className="text-2xl font-bold mb-4">多智能体强化学习概述</h2>
            
            {/* 基本概念 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">基本概念</h3>
              <p className="text-gray-700 mb-4">
                多智能体强化学习(MARL)研究多个智能体在共享环境中如何通过交互学习最优策略。
                每个智能体都需要考虑其他智能体的行为，这使得问题变得更加复杂和有趣。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>核心特点：</strong>智能体之间的交互、合作与竞争、环境动态性、部分可观察性。
                </p>
              </div>
              <div className="flex justify-center my-4">
                <svg width="600" height="300" viewBox="0 0 600 300">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                    </marker>
                  </defs>
                  {/* 环境 */}
                  <rect x="50" y="50" width="500" height="200" fill="#f3f4f6" stroke="#666" strokeWidth="2"/>
                  <text x="300" y="30" textAnchor="middle" fill="black">共享环境</text>
                  
                  {/* 智能体1 */}
                  <circle cx="150" cy="150" r="40" fill="#93c5fd" stroke="#2563eb" strokeWidth="2"/>
                  <text x="150" y="150" textAnchor="middle" dominantBaseline="middle" fill="black">智能体1</text>
                  
                  {/* 智能体2 */}
                  <circle cx="300" cy="150" r="40" fill="#fca5a5" stroke="#dc2626" strokeWidth="2"/>
                  <text x="300" y="150" textAnchor="middle" dominantBaseline="middle" fill="black">智能体2</text>
                  
                  {/* 智能体3 */}
                  <circle cx="450" cy="150" r="40" fill="#86efac" stroke="#16a34a" strokeWidth="2"/>
                  <text x="450" y="150" textAnchor="middle" dominantBaseline="middle" fill="black">智能体3</text>
                  
                  {/* 交互箭头 */}
                  <path d="M190 150 L260 150" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <path d="M340 150 L410 150" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <path d="M150 190 L300 190" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <path d="M300 190 L450 190" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                </svg>
              </div>
            </div>

            {/* 主要算法 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">主要算法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. MADDPG (Multi-Agent DDPG)</h4>
                  <p className="text-gray-600">集中式训练、分布式执行的Actor-Critic算法</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. COMA (Counterfactual Multi-Agent)</h4>
                  <p className="text-gray-600">基于反事实推理的多智能体算法</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. QMIX</h4>
                  <p className="text-gray-600">基于单调性约束的混合Q值算法</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4. MAPPO (Multi-Agent PPO)</h4>
                  <p className="text-gray-600">多智能体版本的近端策略优化算法</p>
                </div>
              </div>
              <div className="flex justify-center my-4">
                <svg width="600" height="250" viewBox="0 0 600 250">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                    </marker>
                  </defs>
                  {/* 集中式训练 */}
                  <rect x="50" y="50" width="200" height="150" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="150" y="125" textAnchor="middle" dominantBaseline="middle" fill="black">集中式训练</text>
                  
                  {/* 分布式执行 */}
                  <rect x="350" y="50" width="200" height="150" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="450" y="125" textAnchor="middle" dominantBaseline="middle" fill="black">分布式执行</text>
                  
                  {/* 连接箭头 */}
                  <path d="M250 125 L350 125" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  {/* 智能体图标 */}
                  <circle cx="450" cy="75" r="15" fill="#93c5fd"/>
                  <circle cx="450" cy="125" r="15" fill="#fca5a5"/>
                  <circle cx="450" cy="175" r="15" fill="#86efac"/>
                </svg>
              </div>
            </div>

            {/* 关键技术 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">关键技术</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 通信机制</h4>
                  <p className="text-gray-600">智能体间的信息交换与协调</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 信用分配</h4>
                  <p className="text-gray-600">评估每个智能体的贡献度</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 非平稳性处理</h4>
                  <p className="text-gray-600">处理环境动态变化</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4. 部分可观察性</h4>
                  <p className="text-gray-600">处理不完全信息</p>
                </div>
              </div>
            </div>

            {/* 应用场景 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">应用场景</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">多机器人协作</h4>
                  <p className="text-gray-600">多机器人协同完成任务</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">交通控制</h4>
                  <p className="text-gray-600">智能交通信号灯控制</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">游戏AI</h4>
                  <p className="text-gray-600">多智能体游戏策略</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">资源分配</h4>
                  <p className="text-gray-600">分布式资源优化</p>
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
              {/* 练习1：MADDPG实现 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习1：MADDPG实现</h3>
                <p className="text-gray-700 mb-4">
                  实现MADDPG算法，用于多智能体环境中的连续动作空间。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现集中式训练机制</li>
                      <li>实现分布式执行策略</li>
                      <li>实现多智能体交互</li>
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
{`import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from collections import deque
import random

class Actor(nn.Module):
    def __init__(self, state_size, action_size):
        super(Actor, self).__init__()
        self.fc1 = nn.Linear(state_size, 256)
        self.fc2 = nn.Linear(256, 256)
        self.fc3 = nn.Linear(256, action_size)
        
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        return torch.tanh(self.fc3(x))

class Critic(nn.Module):
    def __init__(self, state_size, action_size, n_agents):
        super(Critic, self).__init__()
        self.fc1 = nn.Linear(state_size * n_agents + action_size * n_agents, 256)
        self.fc2 = nn.Linear(256, 256)
        self.fc3 = nn.Linear(256, 1)
        
    def forward(self, states, actions):
        x = torch.cat([states, actions], dim=1)
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        return self.fc3(x)

class MADDPGAgent:
    def __init__(self, state_size, action_size, n_agents):
        self.state_size = state_size
        self.action_size = action_size
        self.n_agents = n_agents
        self.memory = deque(maxlen=1000000)
        self.gamma = 0.99
        self.tau = 0.01
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        self.actor = Actor(state_size, action_size).to(self.device)
        self.actor_target = Actor(state_size, action_size).to(self.device)
        self.actor_target.load_state_dict(self.actor.state_dict())
        
        self.critic = Critic(state_size, action_size, n_agents).to(self.device)
        self.critic_target = Critic(state_size, action_size, n_agents).to(self.device)
        self.critic_target.load_state_dict(self.critic.state_dict())
        
        self.actor_optimizer = optim.Adam(self.actor.parameters(), lr=1e-4)
        self.critic_optimizer = optim.Adam(self.critic.parameters(), lr=1e-3)
        
    def act(self, state, noise=0.0):
        state = torch.FloatTensor(state).unsqueeze(0).to(self.device)
        action = self.actor(state).cpu().data.numpy()[0]
        action = action + noise * np.random.randn(self.action_size)
        return np.clip(action, -1, 1)
        
    def train(self, agents, batch_size):
        if len(self.memory) < batch_size:
            return
            
        batch = random.sample(self.memory, batch_size)
        states, actions, rewards, next_states, dones = zip(*batch)
        
        states = torch.FloatTensor(states).to(self.device)
        actions = torch.FloatTensor(actions).to(self.device)
        rewards = torch.FloatTensor(rewards).to(self.device)
        next_states = torch.FloatTensor(next_states).to(self.device)
        dones = torch.FloatTensor(dones).to(self.device)
        
        # Update Critic
        next_actions = []
        for i, agent in enumerate(agents):
            next_actions.append(agent.actor_target(next_states[:, i]))
        next_actions = torch.cat(next_actions, dim=1)
        
        target_q = self.critic_target(next_states.view(batch_size, -1), next_actions)
        target_q = rewards + (1 - dones) * self.gamma * target_q
        
        current_q = self.critic(states.view(batch_size, -1), actions.view(batch_size, -1))
        critic_loss = nn.MSELoss()(current_q, target_q.detach())
        
        self.critic_optimizer.zero_grad()
        critic_loss.backward()
        self.critic_optimizer.step()
        
        # Update Actor
        current_actions = []
        for i, agent in enumerate(agents):
            if agent == self:
                current_actions.append(self.actor(states[:, i]))
            else:
                current_actions.append(actions[:, i].detach())
        current_actions = torch.cat(current_actions, dim=1)
        
        actor_loss = -self.critic(states.view(batch_size, -1), current_actions).mean()
        
        self.actor_optimizer.zero_grad()
        actor_loss.backward()
        self.actor_optimizer.step()
        
        # Update target networks
        for target_param, param in zip(self.actor_target.parameters(), self.actor.parameters()):
            target_param.data.copy_(self.tau * param.data + (1 - self.tau) * target_param.data)
            
        for target_param, param in zip(self.critic_target.parameters(), self.critic.parameters()):
            target_param.data.copy_(self.tau * param.data + (1 - self.tau) * target_param.data)`}
                      </pre>
                    )}
                  </div>
                </div>
              </div>

              {/* 练习2：QMIX实现 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习2：QMIX实现</h3>
                <p className="text-gray-700 mb-4">
                  实现QMIX算法，用于多智能体环境中的混合Q值学习。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现单调性混合网络</li>
                      <li>实现集中式训练</li>
                      <li>实现分布式执行</li>
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
{`import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from collections import deque
import random

class QMIXAgent:
    def __init__(self, state_size, action_size, n_agents):
        self.state_size = state_size
        self.action_size = action_size
        self.n_agents = n_agents
        self.memory = deque(maxlen=1000000)
        self.gamma = 0.99
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        # 个体Q网络
        self.q_network = nn.Sequential(
            nn.Linear(state_size, 64),
            nn.ReLU(),
            nn.Linear(64, 64),
            nn.ReLU(),
            nn.Linear(64, action_size)
        ).to(self.device)
        
        # 混合网络
        self.mixing_network = QMixingNetwork(n_agents, state_size).to(self.device)
        
        self.optimizer = optim.Adam(list(self.q_network.parameters()) + 
                                  list(self.mixing_network.parameters()), lr=1e-3)
        
    def act(self, state, epsilon=0.0):
        if random.random() < epsilon:
            return random.randrange(self.action_size)
            
        with torch.no_grad():
            state = torch.FloatTensor(state).unsqueeze(0).to(self.device)
            q_values = self.q_network(state)
            return q_values.argmax().item()
            
    def train(self, batch_size):
        if len(self.memory) < batch_size:
            return
            
        batch = random.sample(self.memory, batch_size)
        states, actions, rewards, next_states, dones = zip(*batch)
        
        states = torch.FloatTensor(states).to(self.device)
        actions = torch.LongTensor(actions).to(self.device)
        rewards = torch.FloatTensor(rewards).to(self.device)
        next_states = torch.FloatTensor(next_states).to(self.device)
        dones = torch.FloatTensor(dones).to(self.device)
        
        # 计算当前Q值
        current_q_values = self.q_network(states).gather(1, actions.unsqueeze(1))
        
        # 计算目标Q值
        with torch.no_grad():
            next_q_values = self.q_network(next_states).max(1)[0]
            target_q_values = rewards + (1 - dones) * self.gamma * next_q_values
            
        # 计算混合Q值
        mixed_q_values = self.mixing_network(current_q_values, states)
        mixed_target_q_values = self.mixing_network(target_q_values, next_states)
        
        # 计算损失
        loss = nn.MSELoss()(mixed_q_values, mixed_target_q_values)
        
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()

class QMixingNetwork(nn.Module):
    def __init__(self, n_agents, state_size):
        super(QMixingNetwork, self).__init__()
        self.n_agents = n_agents
        
        # 超网络
        self.hyper_w1 = nn.Sequential(
            nn.Linear(state_size, 64),
            nn.ReLU(),
            nn.Linear(64, n_agents * 64)
        )
        
        self.hyper_w2 = nn.Sequential(
            nn.Linear(state_size, 64),
            nn.ReLU(),
            nn.Linear(64, 64)
        )
        
        self.hyper_b1 = nn.Linear(state_size, 64)
        self.hyper_b2 = nn.Sequential(
            nn.Linear(state_size, 32),
            nn.ReLU(),
            nn.Linear(32, 1)
        )
        
    def forward(self, q_values, states):
        batch_size = q_values.size(0)
        
        # 计算权重
        w1 = torch.abs(self.hyper_w1(states)).view(-1, self.n_agents, 64)
        w2 = torch.abs(self.hyper_w2(states)).view(-1, 64, 1)
        b1 = self.hyper_b1(states).view(-1, 1, 64)
        b2 = self.hyper_b2(states).view(-1, 1, 1)
        
        # 混合Q值
        hidden = torch.bmm(q_values.view(-1, 1, self.n_agents), w1) + b1
        hidden = torch.relu(hidden)
        q_total = torch.bmm(hidden, w2) + b2
        
        return q_total.view(batch_size, -1)`}
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
            
            {/* 例题1：多智能体捕食者-猎物问题 */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h3 className="text-xl font-semibold">例题1：多智能体捕食者-猎物问题</h3>
              <div className="space-y-2">
                <h4 className="font-medium">问题描述</h4>
                <p className="text-gray-700">
                  实现一个多智能体环境，包含多个捕食者和猎物。捕食者需要协作捕获猎物，
                  而猎物需要躲避捕食者。使用MADDPG算法训练智能体。
                </p>
                
                <h4 className="font-medium mt-4">解题思路</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>设计环境状态和动作空间</li>
                  <li>实现MADDPG算法</li>
                  <li>设计奖励函数</li>
                  <li>训练和评估模型</li>
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
import torch
import torch.nn as nn
import torch.optim as optim
from collections import deque
import random
import matplotlib.pyplot as plt

class PredatorPreyEnv:
    def __init__(self, n_predators=2, n_prey=1, world_size=10):
        self.n_predators = n_predators
        self.n_prey = n_prey
        self.world_size = world_size
        self.reset()
        
    def reset(self):
        self.predator_pos = np.random.rand(self.n_predators, 2) * self.world_size
        self.prey_pos = np.random.rand(self.n_prey, 2) * self.world_size
        return self._get_state()
        
    def step(self, predator_actions):
        # 更新捕食者位置
        for i in range(self.n_predators):
            self.predator_pos[i] += predator_actions[i] * 0.5
            self.predator_pos[i] = np.clip(self.predator_pos[i], 0, self.world_size)
            
        # 更新猎物位置（随机移动）
        for i in range(self.n_prey):
            self.prey_pos[i] += np.random.randn(2) * 0.3
            self.prey_pos[i] = np.clip(self.prey_pos[i], 0, self.world_size)
            
        # 计算奖励
        rewards = np.zeros(self.n_predators)
        done = False
        
        for i in range(self.n_predators):
            for j in range(self.n_prey):
                dist = np.linalg.norm(self.predator_pos[i] - self.prey_pos[j])
                if dist < 1.0:
                    rewards[i] += 10.0
                    done = True
                else:
                    rewards[i] -= 0.1 * dist
                    
        return self._get_state(), rewards, done
        
    def _get_state(self):
        state = []
        for i in range(self.n_predators):
            agent_state = []
            # 自身位置
            agent_state.extend(self.predator_pos[i])
            # 其他捕食者位置
            for j in range(self.n_predators):
                if i != j:
                    agent_state.extend(self.predator_pos[j])
            # 猎物位置
            for j in range(self.n_prey):
                agent_state.extend(self.prey_pos[j])
            state.append(agent_state)
        return np.array(state)

def train_predator_prey():
    env = PredatorPreyEnv()
    n_agents = env.n_predators
    state_size = 2 + (n_agents-1)*2 + env.n_prey*2
    action_size = 2
    
    agents = [MADDPGAgent(state_size, action_size, n_agents) for _ in range(n_agents)]
    episodes = 1000
    batch_size = 64
    
    scores = []
    for episode in range(episodes):
        state = env.reset()
        episode_reward = 0
        done = False
        
        while not done:
            actions = []
            for i, agent in enumerate(agents):
                action = agent.act(state[i])
                actions.append(action)
                
            next_state, rewards, done = env.step(actions)
            
            for i, agent in enumerate(agents):
                agent.memory.append((state[i], actions[i], rewards[i], next_state[i], done))
                if len(agent.memory) > batch_size:
                    agent.train(agents, batch_size)
                    
            state = next_state
            episode_reward += np.mean(rewards)
            
        scores.append(episode_reward)
        print(f"Episode: {episode}, Score: {episode_reward:.2f}")
        
    return scores

if __name__ == "__main__":
    scores = train_predator_prey()
    plt.figure(figsize=(10, 6))
    plt.plot(scores)
    plt.title('Predator-Prey MADDPG Training')
    plt.xlabel('Episode')
    plt.ylabel('Score')
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
            <a href="/study/ai/rl/deep-rl" className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center hover:bg-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              上一章：深度强化学习
            </a>
            <a href="/study/ai/rl/frameworks" className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors">
              下一章：强化学习框架
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