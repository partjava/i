'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：随机森林

// L1: 随机森林 Bagging 集成
export const RandomForestBaggingVisualizer: React.FC = () => {
  const [treeCount, setTreeCount] = useState(3);
  const votes = ['正类', '正类', '负类', '正类', '正类'].slice(0, treeCount);
  const posVotes = votes.filter((v) => v === '正类').length;
  return (
    <VisualizerFrame
      title="随机森林 Bagging 有放回采样与多数投票"
      subtitle="多棵无剪枝基树在 Bootstrap 子集上各自独立训练并聚合输出"
      badge="bootstrap_sample"
      sliders={[{ label: '参与投票树数量', value: treeCount, min: 1, max: 5, step: 1, onChange: setTreeCount }]}
      metrics={[
        { label: '正类票数', value: `${posVotes} / ${treeCount}`, tone: 'emerald' },
        { label: '集成决策', value: posVotes >= treeCount / 2 ? '正类 (降低方差)' : '负类', tone: 'cyan' },
      ]}
    >
      <InteractiveGraphCanvas
        height={175}
        nodes={[
          { id: 'bag', x: 70, y: 88, label: 'Bootstrap 数据', tone: 'indigo', shape: 'pill', active: true },
          ...votes.map((v, i) => ({
            id: `t${i}`,
            x: 205,
            y: 26 + i * 31,
            label: `Tree #${i + 1}: ${v}`,
            tone: (v === '正类' ? 'cyan' : 'rose') as VisualizerTone,
            shape: 'pill' as const,
            active: true,
          })),
          { id: 'vote', x: 335, y: 88, label: `多数投票: ${posVotes > treeCount / 2 ? '正' : '平/负'}`, tone: 'emerald', shape: 'pill', active: true },
        ]}
        edges={[
          ...votes.map((_, i) => ({ from: 'bag', to: `t${i}`, tone: 'indigo' as VisualizerTone })),
          ...votes.map((v, i) => ({
            from: `t${i}`,
            to: 'vote',
            tone: (v === '正类' ? 'emerald' : 'rose') as VisualizerTone,
            animated: v === '正类',
          })),
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 随机森林袋外评估
export const RandomForestOobVisualizer: React.FC = () => {
  const [treeIdx, setTreeIdx] = useState(0);
  const masks = [
    [true, true, false, true, false, true],
    [true, false, true, false, true, true],
    [false, true, true, true, true, false],
  ];
  const mask = masks[treeIdx];
  const oobCount = mask.filter((m) => !m).length;
  return (
    <VisualizerFrame
      title="袋外样本 (OOB ≈ 36.8%) 免验证集交叉评估"
      subtitle="每次有放回抽样约有 e⁻¹ ≈ 36.8% 的样本未被抽中，天然充当该树的验证样本"
      badge="oob_score"
      scenarios={masks.map((_, i) => ({
        label: `第 ${i + 1} 棵树采样分布`,
        summary: `Tree #${i + 1} 未被抽中的 ${oobCount} 个样本直接用于评估泛化误差。`,
      }))}
      activeScenario={treeIdx}
      onScenarioChange={setTreeIdx}
      metrics={[
        { label: 'In-Bag 训练样本', value: `${mask.length - oobCount}`, tone: 'cyan' },
        { label: 'OOB 袋外验证样本', value: `${oobCount} (占比 ${Math.round((oobCount / mask.length) * 100)}%)`, tone: 'amber' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '样本池 [0..5]',
            slots: mask.map((inBag, i) => ({
              label: `样本 #${i}`,
              sublabel: inBag ? 'In-Bag 训练' : 'OOB 验证',
              tone: inBag ? 'cyan' : 'amber',
              pointer: !inBag ? 'OOB' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};
