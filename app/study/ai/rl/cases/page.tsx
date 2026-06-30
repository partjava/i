'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const sacDrivingCode = `# 导入必要的库
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

        return self.state, reward, done, {}`

const td3RobotCode = `# 导入必要的库
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
                    target_param.data.copy_(tau * param.data + (1 - tau) * target_param.data)`

const ppoSnakeCode = `# 导入必要的库
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
    train_ppo()`

const META: LessonMeta = {
  subject: '强化学习',
  chapterTitle: '强化学习实战',
  chapterNumber: 12,
  totalChapters: 14,
  subjectHref: '/study/ai/rl',
  prevChapter: { label: '强化学习框架', href: '/study/ai/rl/frameworks' },
  nextChapter: { label: '强化学习面试题', href: '/study/ai/rl/interview' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>强化学习实战理论基础</PageTitle>

        <SectionTitle>实战环境配置</SectionTitle>
        <BookParagraph>
          在进行强化学习实战之前，需要正确配置开发环境，包括Python环境、深度学习框架、强化学习库等。本节将介绍完整的环境配置流程和常见问题解决方案。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实战项目流程</SectionTitle>
        <BookParagraph><b>1. 问题定义与分析</b></BookParagraph>
        <BookList items={['明确任务目标', '分析环境特征', '确定评估指标', '设计奖励机制']} />
        <BookParagraph><b>2. 算法选择与设计</b></BookParagraph>
        <BookList items={['基于任务特点选择算法', '设计网络架构', '确定超参数', '实现关键组件']} />
        <BookParagraph><b>3. 训练与调优</b></BookParagraph>
        <BookList items={['数据收集与预处理', '模型训练与监控', '性能评估与分析', '参数调优与优化']} />
        <BookParagraph><b>4. 部署与应用</b></BookParagraph>
        <BookList items={['模型导出与转换', '环境集成', '性能优化', '监控与维护']} />
      </div>
    ),
  },
  {
    label: '实战练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>练习1：自动驾驶场景模拟</SectionTitle>
        <BookParagraph>
          使用强化学习实现一个简单的自动驾驶场景，包括车道保持、避障等基本功能。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '环境建模与状态设计',
          '动作空间定义',
          '奖励函数设计',
          'SAC算法实现',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={sacDrivingCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习2：智能机器人导航</SectionTitle>
        <BookParagraph>
          实现一个基于TD3算法的智能机器人导航系统，能够在复杂环境中规划路径并避障。
        </BookParagraph>
        <BookParagraph><b>任务目标</b></BookParagraph>
        <BookList items={[
          '环境建模',
          'TD3算法实现',
          '路径规划',
          '避障策略',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={td3RobotCode} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题练习</PageTitle>

        <SectionTitle>例题：游戏AI开发</SectionTitle>
        <BookParagraph>
          使用PPO算法开发一个游戏AI，能够自动学习游戏规则并达到较高的游戏水平。以简单的贪吃蛇游戏为例，实现AI自动控制蛇的移动。
        </BookParagraph>
        <BookParagraph><b>解题思路：</b></BookParagraph>
        <BookList items={[
          '设计游戏环境',
          '实现PPO算法',
          '设计奖励函数',
          '训练与评估AI',
        ]} />
        <BookParagraph><b>代码实现</b></BookParagraph>
        <BookCode language="python" code={ppoSnakeCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>思路分析</SectionTitle>
        <BookParagraph>
          贪吃蛇AI的核心是通过PPO算法学习一个从游戏状态到动作的映射。状态空间为网格的扁平化表示，动作空间为三种（直行、左转、右转）。通过精心设计的奖励函数（吃到食物+1，撞墙或撞自己-1），AI能够逐步学习到有效的游戏策略。
        </BookParagraph>
        <BookList items={[
          '状态空间：10x10网格的扁平化表示',
          '动作空间：直行、左转、右转',
          '奖励设计：吃食物+1，撞墙/撞自己-1',
          '训练目标：最大化游戏得分',
        ]} />
      </div>
    ),
  },
  {
    label: '学习资源',
    left: (
      <div className="space-y-4">
        <PageTitle>学习资源</PageTitle>

        <SectionTitle>推荐书籍</SectionTitle>
        <BookParagraph><b>《强化学习导论》</b></BookParagraph>
        <BookParagraph>
          Richard S. Sutton 和 Andrew G. Barto 的经典著作，全面介绍强化学习的基础理论和算法。
        </BookParagraph>
        <BookParagraph><b>《深度强化学习》</b></BookParagraph>
        <BookParagraph>
          结合深度学习和强化学习的前沿技术，包含大量实战案例和代码实现。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>在线课程</SectionTitle>
        <BookParagraph><b>Coursera - 强化学习专项课程</b></BookParagraph>
        <BookParagraph>由阿尔伯塔大学提供的系列课程，从基础到进阶，包含大量实践项目。</BookParagraph>
        <BookParagraph><b>Udacity - 深度强化学习纳米学位</b></BookParagraph>
        <BookParagraph>专注于深度强化学习的实践应用，包含多个实战项目。</BookParagraph>

        <SectionTitle>开源项目</SectionTitle>
        <BookParagraph><b>Stable Baselines3</b> — 基于PyTorch的强化学习算法实现库，提供了多种主流算法的实现。</BookParagraph>
        <BookParagraph><b>RLlib</b> — Ray框架的强化学习库，支持分布式训练和多种算法实现。</BookParagraph>

        <SectionTitle>学习社区</SectionTitle>
        <BookParagraph><b>Reddit r/reinforcementlearning</b> — 活跃的强化学习讨论社区，分享最新研究进展和实践经验。</BookParagraph>
        <BookParagraph><b>GitHub Discussions</b> — 各大强化学习框架的GitHub讨论区，可以获取技术支持和交流经验。</BookParagraph>
      </div>
    ),
  },
]

export default function DlCasesPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
