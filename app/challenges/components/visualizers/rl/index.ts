import { createStageLookup, type VisualizerEntry } from '../shared/VisualizerEngine';
import { MdpValueIterationVisualizer, BellmanEquationVisualizer } from './MdpAndBellmanVisualizers';
import { QLearningOffPolicyVisualizer, EpsilonGreedyDecayVisualizer } from './QLearningVisualizers';
import { SarsaCliffWalkVisualizer, SarsaLambdaTraceVisualizer } from './SarsaVisualizers';
import { DqnReplayTargetVisualizer, DoubleDqnOverestimationVisualizer } from './DqnVisualizers';
import { PpoClipRatioVisualizer, GaeAdvantageVisualizer } from './PpoOptimizationVisualizers';
import { ActorCriticDualVisualizer, ContinuousActorGaussianVisualizer } from './ActorCriticVisualizers';

const ENTRIES: VisualizerEntry[] = [
  { subtopic: '马尔可夫决策(MDP)', levelIndex: 1, levelTitle: 'MDP 价值迭代求解器', component: MdpValueIterationVisualizer },
  { subtopic: '马尔可夫决策(MDP)', levelIndex: 2, levelTitle: 'Bellman 方程求解', component: BellmanEquationVisualizer },
  { subtopic: 'Q-Learning', levelIndex: 1, levelTitle: 'Q-Learning 离线学习器', component: QLearningOffPolicyVisualizer },
  { subtopic: 'Q-Learning', levelIndex: 2, levelTitle: 'ε 贪心与衰减策略', component: EpsilonGreedyDecayVisualizer },
  { subtopic: 'SARSA', levelIndex: 1, levelTitle: 'SARSA On-Policy 控制器', component: SarsaCliffWalkVisualizer },
  { subtopic: 'SARSA', levelIndex: 2, levelTitle: 'SARSA(λ) 资格迹', component: SarsaLambdaTraceVisualizer },
  { subtopic: 'DQN算法', levelIndex: 1, levelTitle: 'DQN 深度 Q 网络', component: DqnReplayTargetVisualizer },
  { subtopic: 'DQN算法', levelIndex: 2, levelTitle: 'Double DQN', component: DoubleDqnOverestimationVisualizer },
  { subtopic: 'PPO优化', levelIndex: 1, levelTitle: 'PPO 裁剪策略优化', component: PpoClipRatioVisualizer },
  { subtopic: 'PPO优化', levelIndex: 2, levelTitle: 'GAE 优势估计', component: GaeAdvantageVisualizer },
  { subtopic: 'AC双网络架构', levelIndex: 1, levelTitle: 'Actor-Critic 双网络', component: ActorCriticDualVisualizer },
  { subtopic: 'AC双网络架构', levelIndex: 2, levelTitle: '连续动作 Actor-Critic', component: ContinuousActorGaussianVisualizer },
];

export const findRlVisualizer = createStageLookup(ENTRIES);
