'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：DQN算法

// L1: DQN 深度 Q 网络
export const DqnReplayTargetVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <VisualizerFrame
      title="DQN 两大支柱：经验回放 (Replay Buffer) + 目标网络 (Target Net)"
      subtitle="随机采样 Buffer 打破相邻帧时间相关性；冻结 θ⁻ 每隔 C 步同步消除移动靶震荡"
      badge="dqn_network"
      scenarios={[
        { label: '无技巧容易发散 ✗', summary: '连续强相关帧在线更新且 y_target 自身每步漂移，训练剧烈震荡！' },
        { label: 'DQN 双稳定机制 ✓', summary: '均匀打乱 Batch + 延迟更新 Target Net θ⁻ 保证监督回归目标平稳。' },
      ]}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[{ label: 'Target 网络参数', value: step ? '定期硬/软更新 θ⁻ ✓' : '实时抖动', tone: step ? 'emerald' : 'rose' }]}
    >
      <InteractiveGraphCanvas
        height={170}
        nodes={[
          { id: 'env', x: 65, y: 85, label: 'Env 交互帧', tone: 'indigo', shape: 'pill', active: true },
          { id: 'buf', x: 185, y: 48, label: 'Replay Buffer', sublabel: '随机打乱采样', tone: 'cyan', shape: 'pill', active: step === 1 },
          { id: 'tgt', x: 185, y: 125, label: 'Target Net θ⁻', sublabel: '固定 TD Target', tone: 'amber', shape: 'pill', active: step === 1 },
          { id: 'qnet', x: 330, y: 85, label: 'Online Q(s,a; θ)', tone: 'emerald', shape: 'pill', active: true },
        ]}
        edges={[
          { from: 'env', to: 'buf', tone: 'cyan', animated: true },
          { from: 'buf', to: 'qnet', label: 'Mini-batch', tone: 'cyan', animated: step === 1 },
          { from: 'tgt', to: 'qnet', label: 'Loss 目标', tone: 'amber', animated: step === 1 },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: Double DQN
export const DoubleDqnOverestimationVisualizer: React.FC = () => {
  const [useDouble, setUseDouble] = useState(1);
  return (
    <VisualizerFrame
      title="Double DQN 解耦选动作与估值，消除 Q 值正偏估计"
      subtitle="标准 DQN 对同一网络取 max 易挑出带有正噪声的虚高动作；Double DQN 用 θ 选最优动作、用 θ⁻ 给它打分"
      badge="double_dqn"
      scenarios={[
        { label: 'Standard DQN (易高估噪声)', summary: 'max Q(s\', a\'; θ⁻) 对噪声估计取最大产生正向过估计偏差 (y_est = 9.4)。' },
        { label: 'Double DQN 解耦估值 ✓', summary: 'a* = argmax Q_online(s\', a\'), 再计算 Q_target(s\', a*) = 7.9 真实无偏！' },
      ]}
      activeScenario={useDouble}
      onScenarioChange={setUseDouble}
      metrics={[
        { label: '目标公式', value: useDouble ? 'Q_target(s\', argmax Q_online)' : 'max_a Q_target(s\', a)', tone: useDouble ? 'emerald' : 'amber' },
        { label: '估计 Q 值偏差', value: useDouble ? '7.9 (准确收敛 ✓)' : '9.4 (+1.5 虚高膨胀)', tone: useDouble ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '动作候选价值估计',
            slots: [
              { label: 'a1: 7.9', sublabel: useDouble ? 'Online选出此真实优解' : '真实值', tone: useDouble ? 'emerald' : 'indigo', pointer: useDouble ? 'PICK' : undefined },
              { label: 'a2: 9.4 (含+2噪声)', sublabel: useDouble ? 'Target校验仅7.2' : '被max误选!', tone: useDouble ? 'slate' : 'rose', pointer: !useDouble ? 'MAX!' : undefined },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};
