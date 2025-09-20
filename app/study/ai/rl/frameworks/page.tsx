'use client';

import React, { useState } from 'react';

export default function RLFrameworksPage() {
  const [activeTab, setActiveTab] = useState('theory');
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">强化学习框架</h1>
      
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
            <h2 className="text-2xl font-bold mb-4">强化学习框架概述</h2>
            
            {/* 主流框架介绍 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">主流框架介绍</h3>
              <p className="text-gray-700 mb-4">
                强化学习框架是开发和部署强化学习算法的重要工具。目前主流的框架包括：
                TensorFlow、PyTorch、Stable Baselines3、RLlib等。这些框架提供了丰富的API和工具，
                大大简化了强化学习算法的实现过程。
              </p>
              <div className="flex justify-center my-4">
                <svg width="600" height="300" viewBox="0 0 600 300">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                    </marker>
                  </defs>
                  {/* 框架架构图 */}
                  <rect x="50" y="50" width="500" height="200" fill="#f3f4f6" stroke="#666" strokeWidth="2"/>
                  <text x="300" y="30" textAnchor="middle" fill="black">强化学习框架架构</text>
                  
                  {/* 核心组件 */}
                  <rect x="100" y="100" width="120" height="60" fill="#93c5fd" stroke="#2563eb" strokeWidth="2"/>
                  <text x="160" y="135" textAnchor="middle" dominantBaseline="middle" fill="black">环境接口</text>
                  
                  <rect x="240" y="100" width="120" height="60" fill="#fca5a5" stroke="#dc2626" strokeWidth="2"/>
                  <text x="300" y="135" textAnchor="middle" dominantBaseline="middle" fill="black">算法实现</text>
                  
                  <rect x="380" y="100" width="120" height="60" fill="#86efac" stroke="#16a34a" strokeWidth="2"/>
                  <text x="440" y="135" textAnchor="middle" dominantBaseline="middle" fill="black">训练管理</text>
                  
                  {/* 连接线 */}
                  <path d="M220 130 L240 130" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <path d="M360 130 L380 130" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  {/* 功能模块 */}
                  <rect x="100" y="200" width="400" height="30" fill="#e5e7eb" stroke="#666" strokeWidth="2"/>
                  <text x="300" y="215" textAnchor="middle" dominantBaseline="middle" fill="black">数据管理、可视化、评估、部署</text>
                </svg>
              </div>
            </div>

            {/* 框架特性对比 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">框架特性对比</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. TensorFlow</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>完整的生态系统</li>
                    <li>丰富的预训练模型</li>
                    <li>强大的分布式训练支持</li>
                    <li>TF-Agents专用RL库</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. PyTorch</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>动态计算图</li>
                    <li>灵活的调试能力</li>
                    <li>活跃的社区支持</li>
                    <li>与Python深度集成</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. Stable Baselines3</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>高质量算法实现</li>
                    <li>简单易用的API</li>
                    <li>完善的文档支持</li>
                    <li>丰富的训练工具</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4. RLlib</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>分布式训练支持</li>
                    <li>多智能体算法</li>
                    <li>可扩展性强</li>
                    <li>与Ray框架集成</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 框架选择指南 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">框架选择指南</h3>
              <div className="flex justify-center my-4">
                <svg width="600" height="300" viewBox="0 0 600 300">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                    </marker>
                  </defs>
                  {/* 决策树 */}
                  <rect x="250" y="50" width="100" height="40" fill="#93c5fd" stroke="#2563eb" strokeWidth="2"/>
                  <text x="300" y="70" textAnchor="middle" dominantBaseline="middle" fill="black">项目需求</text>
                  
                  <path d="M300 90 L300 120" stroke="#666" strokeWidth="2"/>
                  
                  <rect x="100" y="120" width="100" height="40" fill="#fca5a5" stroke="#dc2626" strokeWidth="2"/>
                  <text x="150" y="140" textAnchor="middle" dominantBaseline="middle" fill="black">研究实验</text>
                  
                  <rect x="300" y="120" width="100" height="40" fill="#86efac" stroke="#16a34a" strokeWidth="2"/>
                  <text x="350" y="140" textAnchor="middle" dominantBaseline="middle" fill="black">生产部署</text>
                  
                  <rect x="400" y="120" width="100" height="40" fill="#fcd34d" stroke="#d97706" strokeWidth="2"/>
                  <text x="450" y="140" textAnchor="middle" dominantBaseline="middle" fill="black">快速原型</text>
                  
                  <path d="M150 160 L150 190" stroke="#666" strokeWidth="2"/>
                  <path d="M350 160 L350 190" stroke="#666" strokeWidth="2"/>
                  <path d="M450 160 L450 190" stroke="#666" strokeWidth="2"/>
                  
                  <rect x="50" y="190" width="100" height="40" fill="#93c5fd" stroke="#2563eb" strokeWidth="2"/>
                  <text x="100" y="210" textAnchor="middle" dominantBaseline="middle" fill="black">PyTorch</text>
                  
                  <rect x="250" y="190" width="100" height="40" fill="#93c5fd" stroke="#2563eb" strokeWidth="2"/>
                  <text x="300" y="210" textAnchor="middle" dominantBaseline="middle" fill="black">TensorFlow</text>
                  
                  <rect x="400" y="190" width="100" height="40" fill="#93c5fd" stroke="#2563eb" strokeWidth="2"/>
                  <text x="450" y="210" textAnchor="middle" dominantBaseline="middle" fill="black">Stable Baselines3</text>
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
              {/* 练习1：使用Stable Baselines3实现PPO */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习1：使用Stable Baselines3实现PPO</h3>
                <p className="text-gray-700 mb-4">
                  使用Stable Baselines3框架实现PPO算法，并在CartPole环境中进行训练。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>环境配置与安装</li>
                      <li>PPO算法实现</li>
                      <li>模型训练与评估</li>
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
from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import DummyVecEnv
from stable_baselines3.common.evaluation import evaluate_policy

# 创建环境
env = gym.make('CartPole-v1')
env = DummyVecEnv([lambda: env])

# 创建PPO模型
model = PPO(
    policy='MlpPolicy',  # 使用MLP策略网络
    env=env,
    learning_rate=3e-4,  # 学习率
    n_steps=2048,        # 每次更新的步数
    batch_size=64,       # 批次大小
    n_epochs=10,         # 每次更新的轮数
    gamma=0.99,          # 折扣因子
    gae_lambda=0.95,     # GAE参数
    clip_range=0.2,      # PPO裁剪范围
    verbose=1            # 显示训练信息
)

# 训练模型
model.learn(total_timesteps=100000)

# 评估模型
mean_reward, std_reward = evaluate_policy(
    model, 
    env, 
    n_eval_episodes=10
)
print(f"Mean reward: {mean_reward:.2f} +/- {std_reward:.2f}")

# 保存模型
model.save("ppo_cartpole")

# 加载模型
loaded_model = PPO.load("ppo_cartpole")

# 测试模型
obs = env.reset()
for i in range(1000):
    action, _states = loaded_model.predict(obs)
    obs, rewards, dones, info = env.step(action)
    env.render()
    if dones:
        obs = env.reset()`}
                      </pre>
                    )}
                  </div>
                </div>
              </div>

              {/* 练习2：使用RLlib实现DQN */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">练习2：使用RLlib实现DQN</h3>
                <p className="text-gray-700 mb-4">
                  使用RLlib框架实现DQN算法，并在LunarLander环境中进行训练。
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">任务目标</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>RLlib环境配置</li>
                      <li>DQN算法实现</li>
                      <li>分布式训练设置</li>
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
import ray
from ray import tune
from ray.rllib.agents.dqn import DQNTrainer
from ray.tune.logger import pretty_print

# 初始化Ray
ray.init()

# 配置DQN训练器
config = {
    "env": "LunarLander-v2",
    "framework": "torch",
    "num_workers": 4,
    "num_gpus": 0,
    "train_batch_size": 1000,
    "gamma": 0.99,
    "lr": 1e-4,
    "target_network_update_freq": 500,
    "exploration_config": {
        "type": "EpsilonGreedy",
        "initial_epsilon": 1.0,
        "final_epsilon": 0.02,
        "epsilon_timesteps": 10000
    }
}

# 创建训练器
trainer = DQNTrainer(config=config)

# 训练模型
for i in range(100):
    result = trainer.train()
    print(pretty_print(result))
    
    if i % 10 == 0:
        checkpoint = trainer.save()
        print(f"Checkpoint saved at {checkpoint}")

# 评估模型
env = gym.make("LunarLander-v2")
obs = env.reset()
done = False
total_reward = 0

while not done:
    action = trainer.compute_single_action(obs)
    obs, reward, done, info = env.step(action)
    total_reward += reward
    env.render()

print(f"Total reward: {total_reward}")

# 关闭Ray
ray.shutdown()`}
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
            
            {/* 例题1：使用TensorFlow实现A2C */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h3 className="text-xl font-semibold">例题1：使用TensorFlow实现A2C</h3>
              <div className="space-y-2">
                <h4 className="font-medium">问题描述</h4>
                <p className="text-gray-700">
                  使用TensorFlow框架实现A2C（Advantage Actor-Critic）算法，
                  并在Acrobot环境中进行训练。要求实现完整的训练和评估流程。
                </p>
                
                <h4 className="font-medium mt-4">解题思路</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>环境配置与数据预处理</li>
                  <li>A2C网络架构设计</li>
                  <li>训练循环实现</li>
                  <li>模型评估与可视化</li>
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
{`# 导入必要的库
import tensorflow as tf
import gym
import numpy as np
from collections import deque
import matplotlib.pyplot as plt

# 创建环境
env = gym.make('Acrobot-v1')
state_size = env.observation_space.shape[0]
action_size = env.action_space.n

# 定义A2C网络
class A2CNetwork(tf.keras.Model):
    def __init__(self, state_size, action_size):
        super(A2CNetwork, self).__init__()
        self.actor = tf.keras.Sequential([
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(action_size, activation='softmax')
        ])
        self.critic = tf.keras.Sequential([
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(1)
        ])
        
    def call(self, state):
        return self.actor(state), self.critic(state)

# 创建优化器
optimizer = tf.keras.optimizers.Adam(learning_rate=0.001)

# 创建网络
network = A2CNetwork(state_size, action_size)

# 训练参数
gamma = 0.99
episodes = 1000
max_steps = 500

# 训练循环
rewards_history = []

for episode in range(episodes):
    state = env.reset()
    episode_reward = 0
    
    for step in range(max_steps):
        with tf.GradientTape() as tape:
            # 获取动作概率和状态值
            state_tensor = tf.convert_to_tensor(state.reshape(1, -1), dtype=tf.float32)
            action_probs, state_value = network(state_tensor)
            
            # 选择动作
            action = tf.random.categorical(tf.math.log(action_probs), 1)[0, 0]
            
            # 执行动作
            next_state, reward, done, _ = env.step(action)
            episode_reward += reward
            
            # 计算优势
            next_state_tensor = tf.convert_to_tensor(next_state.reshape(1, -1), dtype=tf.float32)
            _, next_state_value = network(next_state_tensor)
            advantage = reward + gamma * next_state_value * (1 - done) - state_value
            
            # 计算损失
            actor_loss = -tf.math.log(action_probs[0, action]) * advantage
            critic_loss = tf.square(advantage)
            total_loss = actor_loss + 0.5 * critic_loss
            
        # 更新网络
        grads = tape.gradient(total_loss, network.trainable_variables)
        optimizer.apply_gradients(zip(grads, network.trainable_variables))
        
        state = next_state
        if done:
            break
            
    rewards_history.append(episode_reward)
    print(f"Episode: {episode}, Reward: {episode_reward}")
    
    # 每100个episode保存一次模型
    if episode % 100 == 0:
        network.save_weights(f"a2c_acrobot_{episode}.h5")

# 绘制训练曲线
plt.figure(figsize=(10, 6))
plt.plot(rewards_history)
plt.title('A2C Training on Acrobot')
plt.xlabel('Episode')
plt.ylabel('Total Reward')
plt.show()

# 评估模型
state = env.reset()
done = False
total_reward = 0

while not done:
    state_tensor = tf.convert_to_tensor(state.reshape(1, -1), dtype=tf.float32)
    action_probs, _ = network(state_tensor)
    action = tf.argmax(action_probs[0]).numpy()
    state, reward, done, _ = env.step(action)
    total_reward += reward
    env.render()

print(f"Evaluation reward: {total_reward}")`}
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
            <a href="/study/ai/rl/multi-agent" className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center hover:bg-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              上一章：多智能体强化学习
            </a>
            <a href="/study/ai/rl/cases" className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors">
              下一章：强化学习实战
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