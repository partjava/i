'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const dqnCode = `import numpy as np
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
        self.target_net.load_state_dict(self.policy_net.state_dict())`

const ddpgCode = `import torch
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
            target_param.data.copy_(self.tau * param.data + (1 - self.tau) * target_param.data)`

const cartpoleDqnCode = `import gym
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
    plt.show()`

const META: LessonMeta = {
  subject: '强化学习',
  chapterTitle: '深度强化学习',
  chapterNumber: 9,
  totalChapters: 14,
  subjectHref: '/study/ai/rl',
  prevChapter: { label: 'Actor-Critic算法', href: '/study/ai/rl/actor-critic' },
  nextChapter: { label: '多智能体强化学习', href: '/study/ai/rl/multi-agent' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>深度强化学习概述</PageTitle>

        <SectionTitle>基本概念</SectionTitle>
        <BookParagraph>
          深度强化学习是深度学习和强化学习的结合，它使用深度神经网络来近似值函数或策略函数，从而解决高维状态空间和动作空间的强化学习问题。
        </BookParagraph>
        <BookParagraph>
          <b>核心思想：</b>利用深度神经网络的强大表达能力来近似复杂的值函数或策略函数。
        </BookParagraph>

        <SectionTitle>主要算法</SectionTitle>
        <BookList items={[
          'DQN (Deep Q-Network)：使用深度神经网络近似Q值函数',
          'DDPG (Deep Deterministic Policy Gradient)：用于连续动作空间的深度确定性策略梯度',
          'A3C (Asynchronous Advantage Actor-Critic)：异步优势演员-评论家算法',
          'PPO (Proximal Policy Optimization)：近端策略优化算法',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>关键技术</SectionTitle>
        <BookList items={[
          '经验回放：存储和重用过去的经验，打破样本相关性',
          '目标网络：使用独立的目标网络提高训练稳定性',
          '双网络架构：分离策略网络和价值网络',
          '优先经验回放：根据TD误差大小对经验进行采样',
        ]} />

        <SectionTitle>应用场景</SectionTitle>
        <BookList items={[
          '游戏AI：如AlphaGo、Atari游戏等',
          '机器人控制：复杂动作控制、运动规划',
          '自动驾驶：决策规划、路径优化',
          '资源调度：数据中心资源分配、任务调度',
        ]} />
      </div>
    ),
  },
  {
    label: '实战练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>练习1：DQN实现</SectionTitle>
        <BookParagraph>
          实现Deep Q-Network算法，包括经验回放和目标网络。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现DQN核心算法',
          '实现经验回放机制',
          '实现目标网络更新',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={dqnCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习2：DDPG实现</SectionTitle>
        <BookParagraph>
          实现Deep Deterministic Policy Gradient算法，用于连续动作空间。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现Actor网络',
          '实现Critic网络',
          '实现DDPG训练流程',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={ddpgCode} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题练习</PageTitle>

        <SectionTitle>例题1：CartPole DQN</SectionTitle>
        <BookParagraph>
          使用DQN算法解决CartPole平衡问题。CartPole是一个经典的强化学习环境，目标是控制小车左右移动以保持杆子直立。
        </BookParagraph>
        <BookParagraph><b>解题思路：</b></BookParagraph>
        <BookList items={[
          '设计DQN网络结构',
          '实现经验回放机制',
          '实现目标网络更新',
          '训练和评估模型',
        ]} />
        <BookParagraph><b>完整代码</b></BookParagraph>
        <BookCode language="python" code={cartpoleDqnCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>思路分析</SectionTitle>
        <BookParagraph>
          CartPole问题的核心是通过DQN学习一个从状态到动作的映射。状态由小车位置、速度、杆子角度和角速度组成，动作是向左或向右移动小车。通过经验回放和目标网络，DQN能够稳定地学习到有效的控制策略。
        </BookParagraph>
        <BookList items={[
          '状态空间：4维连续空间（位置、速度、角度、角速度）',
          '动作空间：2个离散动作（左、右）',
          '奖励设计：每一步保持直立+1',
          '训练目标：最大化累积奖励',
        ]} />
      </div>
    ),
  },
]

export default function DlDeepRlPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
