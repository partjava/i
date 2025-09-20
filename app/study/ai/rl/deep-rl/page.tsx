'use client';

import React, { useState } from 'react';

export default function DeepRLPage() {
  const [activeTab, setActiveTab] = useState('theory');
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">深度强化学习</h1>
      
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
            <h2 className="text-2xl font-bold mb-4">深度强化学习概述</h2>
            
            {/* 基本概念 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">基本概念</h3>
              <p className="text-gray-700 mb-4">
                深度强化学习是深度学习和强化学习的结合，它使用深度神经网络来近似值函数或策略函数，
                从而解决高维状态空间和动作空间的强化学习问题。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>核心思想：</strong>利用深度神经网络的强大表达能力来近似复杂的值函数或策略函数。
                </p>
              </div>
              <div className="flex justify-center my-4">
                <svg width="600" height="250" viewBox="0 0 600 250">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                    </marker>
                  </defs>
                  {/* 输入层 */}
                  <rect x="50" y="50" width="120" height="60" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="110" y="85" textAnchor="middle" fill="black">状态输入</text>
                  <path d="M170 80 L190 80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  {/* 隐藏层 */}
                  <rect x="190" y="50" width="120" height="60" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="250" y="85" textAnchor="middle" fill="black">深度网络</text>
                  <path d="M310 80 L330 80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  {/* 输出层 */}
                  <rect x="330" y="50" width="120" height="60" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="390" y="85" textAnchor="middle" fill="black">动作输出</text>
                  
                  {/* 反馈循环 */}
                  <path d="M390 110 L390 150 L110 150 L110 110" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <text x="250" y="170" textAnchor="middle" fill="black">奖励反馈</text>
                </svg>
              </div>
            </div>

            {/* 主要算法 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">主要算法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. DQN (Deep Q-Network)</h4>
                  <p className="text-gray-600">使用深度神经网络近似Q值函数</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. DDPG (Deep Deterministic Policy Gradient)</h4>
                  <p className="text-gray-600">用于连续动作空间的深度确定性策略梯度</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. A3C (Asynchronous Advantage Actor-Critic)</h4>
                  <p className="text-gray-600">异步优势演员-评论家算法</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4. PPO (Proximal Policy Optimization)</h4>
                  <p className="text-gray-600">近端策略优化算法</p>
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
                  <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">经验回放</text>
                  <path d="M140 100 L160 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  <circle cx="200" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="200" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">目标网络</text>
                  <path d="M240 100 L260 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  <circle cx="300" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="300" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">策略网络</text>
                  <path d="M340 100 L360 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  <circle cx="400" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="400" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">价值网络</text>
                </svg>
              </div>
            </div>

            {/* 关键技术 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">关键技术</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 经验回放</h4>
                  <p className="text-gray-600">存储和重用过去的经验，打破样本相关性</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 目标网络</h4>
                  <p className="text-gray-600">使用独立的目标网络提高训练稳定性</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 双网络架构</h4>
                  <p className="text-gray-600">分离策略网络和价值网络</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4. 优先经验回放</h4>
                  <p className="text-gray-600">根据TD误差大小对经验进行采样</p>
                </div>
              </div>
            </div>

            {/* 应用场景 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">应用场景</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">游戏AI</h4>
                  <p className="text-gray-600">如AlphaGo、Atari游戏等</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">机器人控制</h4>
                  <p className="text-gray-600">复杂动作控制、运动规划</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">自动驾驶</h4>
                  <p className="text-gray-600">决策规划、路径优化</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">资源调度</h4>
                  <p className="text-gray-600">数据中心资源分配、任务调度</p>
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
              {/* 练习1：DQN实现 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习1：DQN实现</h3>
                <p className="text-gray-700 mb-4">
                  实现Deep Q-Network算法，包括经验回放和目标网络。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现DQN核心算法</li>
                      <li>实现经验回放机制</li>
                      <li>实现目标网络更新</li>
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
import torch
import torch.nn as nn
import torch.optim as optim
import random
from collections import deque

class DQN(nn.Module):
    def __init__(self, input_size, output_size):
        super(DQN, self).__init__()
        self.fc1 = nn.Linear(input_size, 128)
        self.fc2 = nn.Linear(128, 128)
        self.fc3 = nn.Linear(128, output_size)
        
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        return self.fc3(x)

class ReplayBuffer:
    def __init__(self, capacity):
        self.buffer = deque(maxlen=capacity)
        
    def push(self, state, action, reward, next_state, done):
        self.buffer.append((state, action, reward, next_state, done))
        
    def sample(self, batch_size):
        return random.sample(self.buffer, batch_size)
        
    def __len__(self):
        return len(self.buffer)

class DQNAgent:
    def __init__(self, state_size, action_size):
        self.state_size = state_size
        self.action_size = action_size
        self.memory = ReplayBuffer(10000)
        self.gamma = 0.99
        self.epsilon = 1.0
        self.epsilon_min = 0.01
        self.epsilon_decay = 0.995
        self.learning_rate = 0.001
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        self.policy_net = DQN(state_size, action_size).to(self.device)
        self.target_net = DQN(state_size, action_size).to(self.device)
        self.target_net.load_state_dict(self.policy_net.state_dict())
        
        self.optimizer = optim.Adam(self.policy_net.parameters(), lr=self.learning_rate)
        
    def act(self, state):
        if random.random() < self.epsilon:
            return random.randrange(self.action_size)
        
        with torch.no_grad():
            state = torch.FloatTensor(state).unsqueeze(0).to(self.device)
            q_values = self.policy_net(state)
            return q_values.argmax().item()
            
    def replay(self, batch_size):
        if len(self.memory) < batch_size:
            return
            
        batch = self.memory.sample(batch_size)
        states, actions, rewards, next_states, dones = zip(*batch)
        
        states = torch.FloatTensor(states).to(self.device)
        actions = torch.LongTensor(actions).to(self.device)
        rewards = torch.FloatTensor(rewards).to(self.device)
        next_states = torch.FloatTensor(next_states).to(self.device)
        dones = torch.FloatTensor(dones).to(self.device)
        
        current_q_values = self.policy_net(states).gather(1, actions.unsqueeze(1))
        next_q_values = self.target_net(next_states).max(1)[0].detach()
        target_q_values = rewards + (1 - dones) * self.gamma * next_q_values
        
        loss = nn.MSELoss()(current_q_values.squeeze(), target_q_values)
        
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()
        
        if self.epsilon > self.epsilon_min:
            self.epsilon *= self.epsilon_decay
            
    def update_target_network(self):
        self.target_net.load_state_dict(self.policy_net.state_dict())`}
                      </pre>
                    )}
                  </div>
                </div>
              </div>

              {/* 练习2：DDPG实现 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习2：DDPG实现</h3>
                <p className="text-gray-700 mb-4">
                  实现Deep Deterministic Policy Gradient算法，用于连续动作空间。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现Actor网络</li>
                      <li>实现Critic网络</li>
                      <li>实现DDPG训练流程</li>
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

class Actor(nn.Module):
    def __init__(self, state_size, action_size):
        super(Actor, self).__init__()
        self.fc1 = nn.Linear(state_size, 400)
        self.fc2 = nn.Linear(400, 300)
        self.fc3 = nn.Linear(300, action_size)
        
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        return torch.tanh(self.fc3(x))

class Critic(nn.Module):
    def __init__(self, state_size, action_size):
        super(Critic, self).__init__()
        self.fc1 = nn.Linear(state_size + action_size, 400)
        self.fc2 = nn.Linear(400, 300)
        self.fc3 = nn.Linear(300, 1)
        
    def forward(self, state, action):
        x = torch.cat([state, action], dim=1)
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        return self.fc3(x)

class DDPGAgent:
    def __init__(self, state_size, action_size):
        self.state_size = state_size
        self.action_size = action_size
        self.memory = deque(maxlen=10000)
        self.gamma = 0.99
        self.tau = 0.001
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        self.actor = Actor(state_size, action_size).to(self.device)
        self.actor_target = Actor(state_size, action_size).to(self.device)
        self.actor_target.load_state_dict(self.actor.state_dict())
        
        self.critic = Critic(state_size, action_size).to(self.device)
        self.critic_target = Critic(state_size, action_size).to(self.device)
        self.critic_target.load_state_dict(self.critic.state_dict())
        
        self.actor_optimizer = optim.Adam(self.actor.parameters(), lr=1e-4)
        self.critic_optimizer = optim.Adam(self.critic.parameters(), lr=1e-3)
        
    def act(self, state, noise=0.0):
        state = torch.FloatTensor(state).unsqueeze(0).to(self.device)
        action = self.actor(state).cpu().data.numpy()[0]
        action = action + noise * np.random.randn(self.action_size)
        return np.clip(action, -1, 1)
        
    def replay(self, batch_size):
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
        next_actions = self.actor_target(next_states)
        target_q = self.critic_target(next_states, next_actions)
        target_q = rewards + (1 - dones) * self.gamma * target_q
        
        current_q = self.critic(states, actions)
        critic_loss = nn.MSELoss()(current_q, target_q.detach())
        
        self.critic_optimizer.zero_grad()
        critic_loss.backward()
        self.critic_optimizer.step()
        
        # Update Actor
        actor_loss = -self.critic(states, self.actor(states)).mean()
        
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
            </div>
          </div>
        )}

        {/* 例题练习部分 */}
        {activeTab === 'examples' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">例题练习</h2>
            
            {/* 例题1：CartPole DQN */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h3 className="text-xl font-semibold">例题1：CartPole DQN</h3>
              <div className="space-y-2">
                <h4 className="font-medium">问题描述</h4>
                <p className="text-gray-700">
                  使用DQN算法解决CartPole平衡问题。CartPole是一个经典的强化学习环境，
                  目标是控制小车左右移动以保持杆子直立。
                </p>
                
                <h4 className="font-medium mt-4">解题思路</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>设计DQN网络结构</li>
                  <li>实现经验回放机制</li>
                  <li>实现目标网络更新</li>
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
{`import gym
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from collections import deque
import random
import matplotlib.pyplot as plt

class DQN(nn.Module):
    def __init__(self, input_size, output_size):
        super(DQN, self).__init__()
        self.fc1 = nn.Linear(input_size, 24)
        self.fc2 = nn.Linear(24, 24)
        self.fc3 = nn.Linear(24, output_size)
        
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        return self.fc3(x)

class DQNAgent:
    def __init__(self, state_size, action_size):
        self.state_size = state_size
        self.action_size = action_size
        self.memory = deque(maxlen=2000)
        self.gamma = 0.95
        self.epsilon = 1.0
        self.epsilon_min = 0.01
        self.epsilon_decay = 0.995
        self.learning_rate = 0.001
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        self.policy_net = DQN(state_size, action_size).to(self.device)
        self.target_net = DQN(state_size, action_size).to(self.device)
        self.target_net.load_state_dict(self.policy_net.state_dict())
        
        self.optimizer = optim.Adam(self.policy_net.parameters(), lr=self.learning_rate)
        
    def remember(self, state, action, reward, next_state, done):
        self.memory.append((state, action, reward, next_state, done))
        
    def act(self, state):
        if random.random() < self.epsilon:
            return random.randrange(self.action_size)
        
        with torch.no_grad():
            state = torch.FloatTensor(state).unsqueeze(0).to(self.device)
            q_values = self.policy_net(state)
            return q_values.argmax().item()
            
    def replay(self, batch_size):
        if len(self.memory) < batch_size:
            return
            
        batch = random.sample(self.memory, batch_size)
        states, actions, rewards, next_states, dones = zip(*batch)
        
        states = torch.FloatTensor(states).to(self.device)
        actions = torch.LongTensor(actions).to(self.device)
        rewards = torch.FloatTensor(rewards).to(self.device)
        next_states = torch.FloatTensor(next_states).to(self.device)
        dones = torch.FloatTensor(dones).to(self.device)
        
        current_q_values = self.policy_net(states).gather(1, actions.unsqueeze(1))
        next_q_values = self.target_net(next_states).max(1)[0].detach()
        target_q_values = rewards + (1 - dones) * self.gamma * next_q_values
        
        loss = nn.MSELoss()(current_q_values.squeeze(), target_q_values)
        
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()
        
        if self.epsilon > self.epsilon_min:
            self.epsilon *= self.epsilon_decay
            
    def update_target_network(self):
        self.target_net.load_state_dict(self.policy_net.state_dict())

def train_cartpole():
    env = gym.make('CartPole-v1')
    state_size = env.observation_space.shape[0]
    action_size = env.action_space.n
    agent = DQNAgent(state_size, action_size)
    batch_size = 32
    episodes = 500
    
    scores = []
    for episode in range(episodes):
        state = env.reset()
        score = 0
        done = False
        
        while not done:
            action = agent.act(state)
            next_state, reward, done, _ = env.step(action)
            agent.remember(state, action, reward, next_state, done)
            state = next_state
            score += reward
            
            if len(agent.memory) > batch_size:
                agent.replay(batch_size)
                
        if episode % 10 == 0:
            agent.update_target_network()
            
        scores.append(score)
        print(f"Episode: {episode}, Score: {score}, Epsilon: {agent.epsilon:.2f}")
        
    return scores

if __name__ == "__main__":
    scores = train_cartpole()
    plt.figure(figsize=(10, 6))
    plt.plot(scores)
    plt.title('CartPole DQN Training')
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
            <a href="/study/ai/rl/actor-critic" className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center hover:bg-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              上一章：Actor-Critic算法
            </a>
            <a href="/study/ai/rl/multi-agent" className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors">
              下一章：多智能体强化学习
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