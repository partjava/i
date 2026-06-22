'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const basicAcCode = `import numpy as np
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
    plt.show()`

const contAcCode = `import numpy as np
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
    plt.show()`

const cartpoleAcCode = `import numpy as np
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
    env.close()`

const META: LessonMeta = {
  subject: '强化学习',
  chapterTitle: 'Actor-Critic算法',
  chapterNumber: 8,
  totalChapters: 14,
  subjectHref: '/study/ai/rl',
  prevChapter: { label: '策略梯度', href: '/study/ai/rl/policy-gradient' },
  nextChapter: { label: '深度强化学习', href: '/study/ai/rl/deep-rl' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>Actor-Critic算法概述</PageTitle>

        <SectionTitle>基本概念</SectionTitle>
        <BookParagraph>
          Actor-Critic算法是一种结合了策略梯度和值函数估计的强化学习方法。它由两个主要组件组成：Actor（演员）负责选择动作，Critic（评论家）负责评估动作的价值。这种架构结合了策略梯度的优势（直接优化策略）和值函数方法的优势（减少方差）。
        </BookParagraph>
        <BookParagraph>
          <b>核心思想：</b>Actor-Critic算法通过分离策略（Actor）和价值评估（Critic）来同时获得策略梯度的直接性和值函数方法的稳定性。
        </BookParagraph>

        <SectionTitle>算法原理</SectionTitle>
        <BookList items={[
          'Actor-Critic架构：Actor(策略网络π(a|s,θ))，Critic(值函数网络V(s,ω))',
          '优势函数：A(s,a) = Q(s,a) - V(s) = r + γV(s\') - V(s)',
          '策略梯度更新：∇θJ(θ) = E[∇θlog(π(a|s,θ)) * A(s,a)]',
          '值函数更新：TD误差: δ = r + γV(s\') - V(s)',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>优势与特点</SectionTitle>
        <BookList items={[
          '减少方差：通过Critic提供的基线减少策略梯度的方差',
          '在线学习：可以实时更新，不需要等待整个回合结束',
          '连续动作空间：特别适合处理连续动作空间的问题',
          '样本效率：相比纯策略梯度方法，样本效率更高',
        ]} />

        <SectionTitle>应用场景</SectionTitle>
        <BookList items={[
          '机器人控制：连续动作空间的机器人控制任务',
          '游戏AI：复杂游戏环境中的决策制定',
          '自动驾驶：车辆控制、路径规划等任务',
          '资源调度：复杂环境下的资源分配和调度',
        ]} />
      </div>
    ),
  },
  {
    label: '实战练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>练习1：基础Actor-Critic实现</SectionTitle>
        <BookParagraph>
          实现基本的Actor-Critic算法，包括Actor网络和Critic网络的构建与更新。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现Actor网络（策略网络）',
          '实现Critic网络（值函数网络）',
          '实现优势函数计算',
          '实现网络更新逻辑',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={basicAcCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习2：连续动作空间的Actor-Critic</SectionTitle>
        <BookParagraph>
          实现适用于连续动作空间的Actor-Critic算法，使用高斯策略。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现连续动作空间的Actor网络',
          '实现高斯策略',
          '实现连续动作的采样',
          '实现策略梯度更新',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={contAcCode} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题练习</PageTitle>

        <SectionTitle>例题1：倒立摆控制问题</SectionTitle>
        <BookParagraph>
          倒立摆是一个经典的控制问题，目标是通过施加力使摆杆保持直立。这是一个连续动作空间的问题，适合使用Actor-Critic算法解决。
        </BookParagraph>
        <BookParagraph><b>解题思路：</b></BookParagraph>
        <BookList items={[
          '使用连续动作空间的Actor-Critic算法',
          '定义状态空间（角度、角速度等）和动作空间（施加的力）',
          '实现奖励函数（基于角度和角速度）',
          '使用高斯策略进行动作采样',
        ]} />
        <BookParagraph><b>完整代码</b></BookParagraph>
        <BookCode language="python" code={cartpoleAcCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>思路分析</SectionTitle>
        <BookParagraph>
          CartPole问题的核心是通过Actor-Critic算法学习一个从状态到动作的映射。Actor网络负责根据状态选择动作，Critic网络评估动作的好坏，通过TD误差来指导Actor和Critic的更新。
        </BookParagraph>
        <BookList items={[
          '状态空间：小车位置、速度、杆子角度、角速度',
          '动作空间：向左或向右移动小车',
          '奖励设计：每一步保持直立获得+1',
          '训练目标：最大化累积奖励',
        ]} />
      </div>
    ),
  },
]

export default function DlActorCriticPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
