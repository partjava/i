'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const maddpgCode = `import torch
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
            target_param.data.copy_(self.tau * param.data + (1 - self.tau) * target_param.data)`

const qmixCode = `import torch
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

        return q_total.view(batch_size, -1)`

const predatorPreyCode = `import numpy as np
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
    plt.show()`

const META: LessonMeta = {
  subject: '强化学习',
  chapterTitle: '多智能体强化学习',
  chapterNumber: 10,
  totalChapters: 14,
  subjectHref: '/study/ai/rl',
  prevChapter: { label: '深度强化学习', href: '/study/ai/rl/deep-rl' },
  nextChapter: { label: '强化学习框架', href: '/study/ai/rl/frameworks' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>多智能体强化学习概述</PageTitle>

        <SectionTitle>基本概念</SectionTitle>
        <BookParagraph>
          多智能体强化学习(MARL)研究多个智能体在共享环境中如何通过交互学习最优策略。每个智能体都需要考虑其他智能体的行为，这使得问题变得更加复杂和有趣。
        </BookParagraph>
        <BookParagraph>
          <b>核心特点：</b>智能体之间的交互、合作与竞争、环境动态性、部分可观察性。
        </BookParagraph>

        <SectionTitle>主要算法</SectionTitle>
        <BookList items={[
          'MADDPG (Multi-Agent DDPG)：集中式训练、分布式执行的Actor-Critic算法',
          'COMA (Counterfactual Multi-Agent)：基于反事实推理的多智能体算法',
          'QMIX：基于单调性约束的混合Q值算法',
          'MAPPO (Multi-Agent PPO)：多智能体版本的近端策略优化算法',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>关键技术</SectionTitle>
        <BookList items={[
          '通信机制：智能体间的信息交换与协调',
          '信用分配：评估每个智能体的贡献度',
          '非平稳性处理：处理环境动态变化',
          '部分可观察性：处理不完全信息',
        ]} />

        <SectionTitle>应用场景</SectionTitle>
        <BookList items={[
          '多机器人协作：多机器人协同完成任务',
          '交通控制：智能交通信号灯控制',
          '游戏AI：多智能体游戏策略',
          '资源分配：分布式资源优化',
        ]} />
      </div>
    ),
  },
  {
    label: '实战练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>练习1：MADDPG实现</SectionTitle>
        <BookParagraph>
          实现MADDPG算法，用于多智能体环境中的连续动作空间。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现集中式训练机制',
          '实现分布式执行策略',
          '实现多智能体交互',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={maddpgCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习2：QMIX实现</SectionTitle>
        <BookParagraph>
          实现QMIX算法，用于多智能体环境中的混合Q值学习。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '实现单调性混合网络',
          '实现集中式训练',
          '实现分布式执行',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={qmixCode} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题练习</PageTitle>

        <SectionTitle>例题1：多智能体捕食者-猎物问题</SectionTitle>
        <BookParagraph>
          实现一个多智能体环境，包含多个捕食者和猎物。捕食者需要协作捕获猎物，而猎物需要躲避捕食者。使用MADDPG算法训练智能体。
        </BookParagraph>
        <BookParagraph><b>解题思路：</b></BookParagraph>
        <BookList items={[
          '设计环境状态和动作空间',
          '实现MADDPG算法',
          '设计奖励函数',
          '训练和评估模型',
        ]} />
        <BookParagraph><b>完整代码</b></BookParagraph>
        <BookCode language="python" code={predatorPreyCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>思路分析</SectionTitle>
        <BookParagraph>
          捕食者-猎物问题的核心在于多个智能体需要协作完成捕获任务。每个捕食者只能看到局部状态，但Critic可以访问全局信息（集中式训练），训练完成后每个Actor可以独立决策（分布式执行）。
        </BookParagraph>
        <BookList items={[
          '状态空间：每个智能体的位置 + 其他智能体位置 + 猎物位置',
          '动作空间：连续空间，控制移动方向和速度',
          '奖励设计：捕获+10，距离惩罚-0.1×距离',
          '训练目标：最大化团队总奖励',
        ]} />
      </div>
    ),
  },
]

export default function DlMultiAgentPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
