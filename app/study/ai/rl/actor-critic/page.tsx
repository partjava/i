'use client';

import React, { useState } from 'react';

export default function ActorCriticPage() {
  const [activeTab, setActiveTab] = useState('theory');
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Actor-Critic算法</h1>
      
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
            <h2 className="text-2xl font-bold mb-4">Actor-Critic算法概述</h2>
            
            {/* 基本概念 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">基本概念</h3>
              <p className="text-gray-700 mb-4">
                Actor-Critic算法是一种结合了策略梯度和值函数估计的强化学习方法。它由两个主要组件组成：
                Actor（演员）负责选择动作，Critic（评论家）负责评估动作的价值。
                这种架构结合了策略梯度的优势（直接优化策略）和值函数方法的优势（减少方差）。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>核心思想：</strong>Actor-Critic算法通过分离策略（Actor）和价值评估（Critic）来同时获得策略梯度的直接性和值函数方法的稳定性。
                </p>
              </div>
              <div className="flex justify-center my-4">
                <svg width="600" height="250" viewBox="0 0 600 250">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                    </marker>
                  </defs>
                  {/* Actor部分 */}
                  <rect x="50" y="50" width="120" height="60" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="110" y="85" textAnchor="middle" fill="black">Actor (策略网络)</text>
                  <path d="M170 80 L190 80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  {/* 环境部分 */}
                  <rect x="190" y="50" width="120" height="60" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="250" y="85" textAnchor="middle" fill="black">环境</text>
                  <path d="M310 80 L330 80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  {/* Critic部分 */}
                  <rect x="330" y="50" width="120" height="60" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="390" y="85" textAnchor="middle" fill="black">Critic (值函数网络)</text>
                  
                  {/* 反馈循环 */}
                  <path d="M390 110 L390 150 L110 150 L110 110" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <text x="250" y="170" textAnchor="middle" fill="black">TD误差反馈</text>
                  
                  {/* 状态和动作标签 */}
                  <text x="180" y="40" textAnchor="middle" fill="black">动作a</text>
                  <text x="320" y="40" textAnchor="middle" fill="black">状态s和奖励r</text>
                </svg>
              </div>
            </div>

            {/* 算法原理 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">算法原理</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. Actor-Critic架构</h4>
                  <p className="text-gray-600">Actor: 策略网络 π(a|s,θ)，Critic: 值函数网络 V(s,ω)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 优势函数</h4>
                  <p className="text-gray-600">A(s,a) = Q(s,a) - V(s) = r + γV(s') - V(s)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 策略梯度更新</h4>
                  <p className="text-gray-600">∇θJ(θ) = E[∇θlog(π(a|s,θ)) * A(s,a)]</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4. 值函数更新</h4>
                  <p className="text-gray-600">TD误差: δ = r + γV(s') - V(s)</p>
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
                  <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">观察状态</text>
                  <path d="M140 100 L160 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  <circle cx="200" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="200" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">Actor选择动作</text>
                  <path d="M240 100 L260 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  <circle cx="300" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="300" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">执行动作</text>
                  <path d="M340 100 L360 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  <circle cx="400" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="400" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">Critic评估</text>
                  <path d="M440 100 L460 100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  <circle cx="500" cy="100" r="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                  <text x="500" y="100" textAnchor="middle" dominantBaseline="middle" fill="black">更新网络</text>
                </svg>
              </div>
            </div>

            {/* 优势与特点 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">优势与特点</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 减少方差</h4>
                  <p className="text-gray-600">通过Critic提供的基线减少策略梯度的方差</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 在线学习</h4>
                  <p className="text-gray-600">可以实时更新，不需要等待整个回合结束</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 连续动作空间</h4>
                  <p className="text-gray-600">特别适合处理连续动作空间的问题</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4. 样本效率</h4>
                  <p className="text-gray-600">相比纯策略梯度方法，样本效率更高</p>
                </div>
              </div>
            </div>

            {/* 应用场景 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">应用场景</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">机器人控制</h4>
                  <p className="text-gray-600">连续动作空间的机器人控制任务</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">游戏AI</h4>
                  <p className="text-gray-600">复杂游戏环境中的决策制定</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">自动驾驶</h4>
                  <p className="text-gray-600">车辆控制、路径规划等任务</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">资源调度</h4>
                  <p className="text-gray-600">复杂环境下的资源分配和调度</p>
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
              {/* 练习1：基础Actor-Critic实现 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习1：基础Actor-Critic实现</h3>
                <p className="text-gray-700 mb-4">
                  实现基本的Actor-Critic算法，包括Actor网络和Critic网络的构建与更新。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现Actor网络（策略网络）</li>
                      <li>实现Critic网络（值函数网络）</li>
                      <li>实现优势函数计算</li>
                      <li>实现网络更新逻辑</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">算法流程图</h4>
                    <div className="flex justify-center mb-4">
                      <svg width="500" height="300" viewBox="0 0 500 300">
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                          </marker>
                        </defs>
                        <rect x="150" y="20" width="200" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="250" y="40" textAnchor="middle" dominantBaseline="middle">初始化Actor和Critic网络</text>
                        <path d="M250 60 L250 80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="80" width="200" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="250" y="100" textAnchor="middle" dominantBaseline="middle">Actor选择动作</text>
                        <path d="M250 120 L250 140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="140" width="200" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="250" y="160" textAnchor="middle" dominantBaseline="middle">执行动作获取奖励</text>
                        <path d="M250 180 L250 200" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="200" width="200" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="250" y="220" textAnchor="middle" dominantBaseline="middle">Critic计算TD误差</text>
                        <path d="M250 240 L250 260" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="260" width="200" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="250" y="280" textAnchor="middle" dominantBaseline="middle">更新Actor和Critic网络</text>
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
import torch
import torch.nn as nn
import torch.optim as optim
import matplotlib.pyplot as plt

# Actor网络（策略网络）
class Actor(nn.Module):
    def __init__(self, state_dim, action_dim):
        super(Actor, self).__init__()
        self.fc1 = nn.Linear(state_dim, 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, action_dim)
        self.softmax = nn.Softmax(dim=-1)
        
    def forward(self, state):
        x = torch.relu(self.fc1(state))
        x = torch.relu(self.fc2(x))
        x = self.softmax(self.fc3(x))
        return x

# Critic网络（值函数网络）
class Critic(nn.Module):
    def __init__(self, state_dim):
        super(Critic, self).__init__()
        self.fc1 = nn.Linear(state_dim, 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, 1)
        
    def forward(self, state):
        x = torch.relu(self.fc1(state))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x)
        return x

class ActorCritic:
    def __init__(self, state_dim, action_dim, lr_actor=0.001, lr_critic=0.001, gamma=0.99):
        self.actor = Actor(state_dim, action_dim)
        self.critic = Critic(state_dim)
        self.actor_optimizer = optim.Adam(self.actor.parameters(), lr=lr_actor)
        self.critic_optimizer = optim.Adam(self.critic.parameters(), lr=lr_critic)
        self.gamma = gamma
        
    def select_action(self, state):
        state = torch.FloatTensor(state)
        probs = self.actor(state)
        action = torch.multinomial(probs, 1).item()
        return action, probs[action].item()
    
    def update(self, state, action, reward, next_state, done):
        state = torch.FloatTensor(state)
        next_state = torch.FloatTensor(next_state)
        
        # 计算TD误差
        value = self.critic(state)
        next_value = self.critic(next_state)
        td_error = reward + self.gamma * next_value * (1 - done) - value
        
        # 更新Critic
        critic_loss = td_error.pow(2)
        self.critic_optimizer.zero_grad()
        critic_loss.backward()
        self.critic_optimizer.step()
        
        # 更新Actor
        probs = self.actor(state)
        action_probs = probs[action]
        actor_loss = -torch.log(action_probs) * td_error.detach()
        self.actor_optimizer.zero_grad()
        actor_loss.backward()
        self.actor_optimizer.step()
        
        return td_error.item(), actor_loss.item(), critic_loss.item()
    
    def save(self, path):
        torch.save({
            'actor_state_dict': self.actor.state_dict(),
            'critic_state_dict': self.critic.state_dict(),
            'actor_optimizer_state_dict': self.actor_optimizer.state_dict(),
            'critic_optimizer_state_dict': self.critic_optimizer.state_dict()
        }, path)
    
    def load(self, path):
        checkpoint = torch.load(path)
        self.actor.load_state_dict(checkpoint['actor_state_dict'])
        self.critic.load_state_dict(checkpoint['critic_state_dict'])
        self.actor_optimizer.load_state_dict(checkpoint['actor_optimizer_state_dict'])
        self.critic_optimizer.load_state_dict(checkpoint['critic_optimizer_state_dict'])

def plot_learning_curve(rewards, actor_losses, critic_losses):
    plt.figure(figsize=(15, 5))
    
    plt.subplot(1, 3, 1)
    plt.plot(rewards)
    plt.title('Rewards')
    plt.xlabel('Episode')
    plt.ylabel('Total Reward')
    
    plt.subplot(1, 3, 2)
    plt.plot(actor_losses)
    plt.title('Actor Loss')
    plt.xlabel('Update Step')
    plt.ylabel('Loss')
    
    plt.subplot(1, 3, 3)
    plt.plot(critic_losses)
    plt.title('Critic Loss')
    plt.xlabel('Update Step')
    plt.ylabel('Loss')
    
    plt.tight_layout()
    plt.show()`}
                      </pre>
                    )}
                  </div>
                </div>
              </div>

              {/* 练习2：连续动作空间的Actor-Critic */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习2：连续动作空间的Actor-Critic</h3>
                <p className="text-gray-700 mb-4">
                  实现适用于连续动作空间的Actor-Critic算法，使用高斯策略。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>实现连续动作空间的Actor网络</li>
                      <li>实现高斯策略</li>
                      <li>实现连续动作的采样</li>
                      <li>实现策略梯度更新</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">算法流程图</h4>
                    <div className="flex justify-center mb-4">
                      <svg width="500" height="300" viewBox="0 0 500 300">
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                          </marker>
                        </defs>
                        <rect x="150" y="20" width="200" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="250" y="40" textAnchor="middle" dominantBaseline="middle">初始化高斯策略网络</text>
                        <path d="M250 60 L250 80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="80" width="200" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="250" y="100" textAnchor="middle" dominantBaseline="middle">采样连续动作</text>
                        <path d="M250 120 L250 140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="140" width="200" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="250" y="160" textAnchor="middle" dominantBaseline="middle">执行动作获取奖励</text>
                        <path d="M250 180 L250 200" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="200" width="200" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="250" y="220" textAnchor="middle" dominantBaseline="middle">计算策略梯度</text>
                        <path d="M250 240 L250 260" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        
                        <rect x="150" y="260" width="200" height="40" fill="#e5e7eb" stroke="black" strokeWidth="2"/>
                        <text x="250" y="280" textAnchor="middle" dominantBaseline="middle">更新网络参数</text>
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
import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
import matplotlib.pyplot as plt

# 连续动作空间的Actor网络（高斯策略）
class GaussianActor(nn.Module):
    def __init__(self, state_dim, action_dim):
        super(GaussianActor, self).__init__()
        self.fc1 = nn.Linear(state_dim, 64)
        self.fc2 = nn.Linear(64, 32)
        self.mean = nn.Linear(32, action_dim)
        self.log_std = nn.Linear(32, action_dim)
        
    def forward(self, state):
        x = torch.relu(self.fc1(state))
        x = torch.relu(self.fc2(x))
        mean = self.mean(x)
        log_std = self.log_std(x)
        log_std = torch.clamp(log_std, -20, 2)  # 限制标准差范围
        return mean, log_std
    
    def sample_action(self, state):
        mean, log_std = self.forward(state)
        std = torch.exp(log_std)
        normal = torch.distributions.Normal(mean, std)
        action = normal.rsample()  # 重参数化采样
        log_prob = normal.log_prob(action).sum(dim=-1)
        return action, log_prob

# Critic网络（值函数网络）
class Critic(nn.Module):
    def __init__(self, state_dim):
        super(Critic, self).__init__()
        self.fc1 = nn.Linear(state_dim, 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, 1)
        
    def forward(self, state):
        x = torch.relu(self.fc1(state))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x)
        return x

class ContinuousActorCritic:
    def __init__(self, state_dim, action_dim, lr_actor=0.001, lr_critic=0.001, gamma=0.99):
        self.actor = GaussianActor(state_dim, action_dim)
        self.critic = Critic(state_dim)
        self.actor_optimizer = optim.Adam(self.actor.parameters(), lr=lr_actor)
        self.critic_optimizer = optim.Adam(self.critic.parameters(), lr=lr_critic)
        self.gamma = gamma
        
    def select_action(self, state):
        state = torch.FloatTensor(state)
        action, log_prob = self.actor.sample_action(state)
        return action.detach().numpy(), log_prob.item()
    
    def update(self, state, action, reward, next_state, done):
        state = torch.FloatTensor(state)
        next_state = torch.FloatTensor(next_state)
        action = torch.FloatTensor(action)
        
        # 计算TD误差
        value = self.critic(state)
        next_value = self.critic(next_state)
        td_error = reward + self.gamma * next_value * (1 - done) - value
        
        # 更新Critic
        critic_loss = td_error.pow(2)
        self.critic_optimizer.zero_grad()
        critic_loss.backward()
        self.critic_optimizer.step()
        
        # 更新Actor
        _, log_prob = self.actor.sample_action(state)
        actor_loss = -log_prob * td_error.detach()
        self.actor_optimizer.zero_grad()
        actor_loss.backward()
        self.actor_optimizer.step()
        
        return td_error.item(), actor_loss.item(), critic_loss.item()
    
    def save(self, path):
        torch.save({
            'actor_state_dict': self.actor.state_dict(),
            'critic_state_dict': self.critic.state_dict(),
            'actor_optimizer_state_dict': self.actor_optimizer.state_dict(),
            'critic_optimizer_state_dict': self.critic_optimizer.state_dict()
        }, path)
    
    def load(self, path):
        checkpoint = torch.load(path)
        self.actor.load_state_dict(checkpoint['actor_state_dict'])
        self.critic.load_state_dict(checkpoint['critic_state_dict'])
        self.actor_optimizer.load_state_dict(checkpoint['actor_optimizer_state_dict'])
        self.critic_optimizer.load_state_dict(checkpoint['critic_optimizer_state_dict'])

def plot_learning_curve(rewards, actor_losses, critic_losses):
    plt.figure(figsize=(15, 5))
    
    plt.subplot(1, 3, 1)
    plt.plot(rewards)
    plt.title('Rewards')
    plt.xlabel('Episode')
    plt.ylabel('Total Reward')
    
    plt.subplot(1, 3, 2)
    plt.plot(actor_losses)
    plt.title('Actor Loss')
    plt.xlabel('Update Step')
    plt.ylabel('Loss')
    
    plt.subplot(1, 3, 3)
    plt.plot(critic_losses)
    plt.title('Critic Loss')
    plt.xlabel('Update Step')
    plt.ylabel('Loss')
    
    plt.tight_layout()
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
            
            {/* 倒立摆控制问题 */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h3 className="text-xl font-semibold">例题1：倒立摆控制问题</h3>
              <div className="space-y-2">
                <h4 className="font-medium">问题描述</h4>
                <p className="text-gray-700">
                  倒立摆是一个经典的控制问题，目标是通过施加力使摆杆保持直立。
                  这是一个连续动作空间的问题，适合使用Actor-Critic算法解决。
                </p>
                
                <h4 className="font-medium mt-4">解题思路</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>使用连续动作空间的Actor-Critic算法</li>
                  <li>定义状态空间（角度、角速度等）和动作空间（施加的力）</li>
                  <li>实现奖励函数（基于角度和角速度）</li>
                  <li>使用高斯策略进行动作采样</li>
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
import gym
import matplotlib.pyplot as plt

# 倒立摆环境
env = gym.make('CartPole-v1')

# 状态和动作维度
state_dim = env.observation_space.shape[0]
action_dim = env.action_space.n

# Actor-Critic网络
class Actor(nn.Module):
    def __init__(self, state_dim, action_dim):
        super(Actor, self).__init__()
        self.fc1 = nn.Linear(state_dim, 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, action_dim)
        self.softmax = nn.Softmax(dim=-1)
        
    def forward(self, state):
        x = torch.relu(self.fc1(state))
        x = torch.relu(self.fc2(x))
        x = self.softmax(self.fc3(x))
        return x

class Critic(nn.Module):
    def __init__(self, state_dim):
        super(Critic, self).__init__()
        self.fc1 = nn.Linear(state_dim, 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, 1)
        
    def forward(self, state):
        x = torch.relu(self.fc1(state))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x)
        return x

# Actor-Critic算法
class ActorCritic:
    def __init__(self, state_dim, action_dim, lr_actor=0.001, lr_critic=0.001, gamma=0.99):
        self.actor = Actor(state_dim, action_dim)
        self.critic = Critic(state_dim)
        self.actor_optimizer = optim.Adam(self.actor.parameters(), lr=lr_actor)
        self.critic_optimizer = optim.Adam(self.critic.parameters(), lr=lr_critic)
        self.gamma = gamma
        
    def select_action(self, state):
        state = torch.FloatTensor(state)
        probs = self.actor(state)
        action = torch.multinomial(probs, 1).item()
        return action, probs[action].item()
    
    def update(self, state, action, reward, next_state, done):
        state = torch.FloatTensor(state)
        next_state = torch.FloatTensor(next_state)
        
        # 计算TD误差
        value = self.critic(state)
        next_value = self.critic(next_state)
        td_error = reward + self.gamma * next_value * (1 - done) - value
        
        # 更新Critic
        critic_loss = td_error.pow(2)
        self.critic_optimizer.zero_grad()
        critic_loss.backward()
        self.critic_optimizer.step()
        
        # 更新Actor
        probs = self.actor(state)
        action_probs = probs[action]
        actor_loss = -torch.log(action_probs) * td_error.detach()
        self.actor_optimizer.zero_grad()
        actor_loss.backward()
        self.actor_optimizer.step()
        
        return td_error.item(), actor_loss.item(), critic_loss.item()

# 训练过程
def train(env, agent, num_episodes=1000):
    rewards = []
    actor_losses = []
    critic_losses = []
    
    for episode in range(num_episodes):
        state = env.reset()
        total_reward = 0
        episode_actor_losses = []
        episode_critic_losses = []
        done = False
        
        while not done:
            action, _ = agent.select_action(state)
            next_state, reward, done, _ = env.step(action)
            
            td_error, actor_loss, critic_loss = agent.update(state, action, reward, next_state, done)
            
            state = next_state
            total_reward += reward
            episode_actor_losses.append(actor_loss)
            episode_critic_losses.append(critic_loss)
        
        rewards.append(total_reward)
        actor_losses.append(np.mean(episode_actor_losses))
        critic_losses.append(np.mean(episode_critic_losses))
        
        if (episode + 1) % 10 == 0:
            print(f"Episode {episode+1}, Reward: {total_reward}")
    
    return rewards, actor_losses, critic_losses

# 主函数
if __name__ == "__main__":
    # 创建环境和智能体
    env = gym.make('CartPole-v1')
    agent = ActorCritic(state_dim, action_dim)
    
    # 训练
    rewards, actor_losses, critic_losses = train(env, agent)
    
    # 绘制学习曲线
    plt.figure(figsize=(15, 5))
    
    plt.subplot(1, 3, 1)
    plt.plot(rewards)
    plt.title('Rewards')
    plt.xlabel('Episode')
    plt.ylabel('Total Reward')
    
    plt.subplot(1, 3, 2)
    plt.plot(actor_losses)
    plt.title('Actor Loss')
    plt.xlabel('Episode')
    plt.ylabel('Loss')
    
    plt.subplot(1, 3, 3)
    plt.plot(critic_losses)
    plt.title('Critic Loss')
    plt.xlabel('Episode')
    plt.ylabel('Loss')
    
    plt.tight_layout()
    plt.show()
    
    # 测试
    state = env.reset()
    done = False
    total_reward = 0
    
    while not done:
        env.render()
        action, _ = agent.select_action(state)
        state, reward, done, _ = env.step(action)
        total_reward += reward
    
    print(f"Test Reward: {total_reward}")
    env.close()`}
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
            <a href="/study/ai/rl/policy-gradient" className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center hover:bg-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              上一章：策略梯度
            </a>
            <a href="/study/ai/rl/deep-rl" className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors">
              下一章：深度强化学习
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