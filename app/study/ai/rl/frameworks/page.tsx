'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const sb3PpoCode = `# 导入必要的库
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
        obs = env.reset()`

const rllibDqnCode = `# 导入必要的库
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
ray.shutdown()`

const tfA2CCode = `# 导入必要的库
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

print(f"Evaluation reward: {total_reward}")`

const META: LessonMeta = {
  subject: '强化学习',
  chapterTitle: '强化学习框架',
  chapterNumber: 11,
  totalChapters: 14,
  subjectHref: '/study/ai/rl',
  prevChapter: { label: '多智能体强化学习', href: '/study/ai/rl/multi-agent' },
  nextChapter: { label: '强化学习实战', href: '/study/ai/rl/cases' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>强化学习框架概述</PageTitle>

        <SectionTitle>主流框架介绍</SectionTitle>
        <BookParagraph>
          强化学习框架是开发和部署强化学习算法的重要工具。目前主流的框架包括：TensorFlow、PyTorch、Stable Baselines3、RLlib等。这些框架提供了丰富的API和工具，大大简化了强化学习算法的实现过程。
        </BookParagraph>

        <SectionTitle>框架特性对比</SectionTitle>
        <BookParagraph><b>1. TensorFlow</b></BookParagraph>
        <BookList items={[
          '完整的生态系统',
          '丰富的预训练模型',
          '强大的分布式训练支持',
          'TF-Agents专用RL库',
        ]} />
        <BookParagraph><b>2. PyTorch</b></BookParagraph>
        <BookList items={[
          '动态计算图',
          '灵活的调试能力',
          '活跃的社区支持',
          '与Python深度集成',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph><b>3. Stable Baselines3</b></BookParagraph>
        <BookList items={[
          '高质量算法实现',
          '简单易用的API',
          '完善的文档支持',
          '丰富的训练工具',
        ]} />
        <BookParagraph><b>4. RLlib</b></BookParagraph>
        <BookList items={[
          '分布式训练支持',
          '多智能体算法',
          '可扩展性强',
          '与Ray框架集成',
        ]} />
      </div>
    ),
  },
  {
    label: '实战练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>练习1：使用Stable Baselines3实现PPO</SectionTitle>
        <BookParagraph>
          使用Stable Baselines3框架实现PPO算法，并在CartPole环境中进行训练。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '环境配置与安装',
          'PPO算法实现',
          '模型训练与评估',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={sb3PpoCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习2：使用RLlib实现DQN</SectionTitle>
        <BookParagraph>
          使用RLlib框架实现DQN算法，并在LunarLander环境中进行训练。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          'RLlib环境配置',
          'DQN算法实现',
          '分布式训练设置',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={rllibDqnCode} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题练习</PageTitle>

        <SectionTitle>例题1：使用TensorFlow实现A2C</SectionTitle>
        <BookParagraph>
          使用TensorFlow框架实现A2C（Advantage Actor-Critic）算法，并在Acrobot环境中进行训练。要求实现完整的训练和评估流程。
        </BookParagraph>
        <BookParagraph><b>解题思路：</b></BookParagraph>
        <BookList items={[
          '环境配置与数据预处理',
          'A2C网络架构设计',
          '训练循环实现',
          '模型评估与可视化',
        ]} />
        <BookParagraph><b>完整代码</b></BookParagraph>
        <BookCode language="python" code={tfA2CCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>概念总结</SectionTitle>
        <BookParagraph>
          选择一个合适的强化学习框架需要综合考虑项目需求、团队技术栈、生态系统的成熟度等因素。对于研究和快速原型开发，PyTorch和Stable Baselines3是很好的选择；对于大规模分布式训练和产品部署，TensorFlow和RLlib更具优势。
        </BookParagraph>
      </div>
    ),
  },
]

export default function DlFrameworksPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
