'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
} from '../shared/VisualizerEngine';

// 章节：损失函数

// L1: 损失函数计算与对比
export const LossComparisonVisualizer: React.FC = () => {
  const [pred, setPred] = useState(0.35);
  const mse = (1 - pred) ** 2;
  const bce = -Math.log(Math.max(0.02, pred));
  return (
    <VisualizerFrame
      title="分类交叉熵 BCE vs 回归均方误差 MSE (y=1)"
      subtitle="当预测概率接近 0 却强行断言为错时，BCE 给出陡峭对数惩罚以提供强劲初始梯度"
      badge="mse_loss"
      sliders={[{ label: '正类预测概率 p̂', value: pred, min: 0.05, max: 0.98, step: 0.05, displayValue: pred.toFixed(2), onChange: setPred }]}
      metrics={[
        { label: 'MSE (1 - p̂)²', value: mse.toFixed(3), tone: 'amber' },
        { label: 'Cross-Entropy -log(p̂)', value: bce.toFixed(3), tone: bce > 1.0 ? 'rose' : 'emerald' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0.05, 1]}
        domainY={[0, 3.2]}
        xLabel="正类概率 p̂ (真实 y=1)"
        yLabel="Loss 损失值"
        curves={[
          {
            id: 'bce',
            label: 'Binary Cross-Entropy',
            tone: 'rose',
            points: Array.from({ length: 20 }, (_, i) => {
              const p = 0.05 + i * 0.05;
              return [p, -Math.log(p)];
            }),
          },
          {
            id: 'mse',
            label: 'MSE Loss',
            tone: 'cyan',
            dashed: true,
            points: Array.from({ length: 20 }, (_, i) => {
              const p = 0.05 + i * 0.05;
              return [p, (1 - p) ** 2];
            }),
          },
        ]}
        markers={[
          { x: pred, y: bce, label: `BCE=${bce.toFixed(2)}`, tone: 'rose', radius: 5 },
          { x: pred, y: mse, label: `MSE=${mse.toFixed(2)}`, tone: 'cyan', radius: 4 },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: Focal Loss 实现
export const FocalLossVisualizer: React.FC = () => {
  const [gamma, setGamma] = useState(2.0);
  const easyP = 0.9;
  const hardP = 0.2;
  const focal = (p: number, g: number) => -((1 - p) ** g) * Math.log(p);
  return (
    <VisualizerFrame
      title="Focal Loss 聚焦调制因子 (1 - p_t)^γ"
      subtitle="增大聚焦参数 γ 可指数级压低海量易分背景样本损失，迫使模型专注难例"
      badge="focal_loss"
      sliders={[{ label: '聚焦指数 γ (gamma)', value: gamma, min: 0, max: 4, step: 0.5, displayValue: gamma.toFixed(1), onChange: setGamma }]}
      metrics={[
        { label: '易分样本 p=0.9 损失', value: focal(easyP, gamma).toFixed(4), tone: 'emerald' },
        { label: '难例样本 p=0.2 损失', value: focal(hardP, gamma).toFixed(3), tone: 'rose' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0.05, 0.98]}
        domainY={[0, 3.0]}
        xLabel="正确类概率 p_t"
        yLabel="Focal Loss"
        curves={[
          {
            id: 'ce',
            label: '标准 CE (γ=0)',
            tone: 'slate',
            dashed: true,
            points: Array.from({ length: 20 }, (_, i) => {
              const p = 0.05 + i * 0.048;
              return [p, -Math.log(p)];
            }),
          },
          {
            id: 'fl',
            label: `Focal (γ=${gamma.toFixed(1)})`,
            tone: 'cyan',
            fillArea: true,
            points: Array.from({ length: 20 }, (_, i) => {
              const p = 0.05 + i * 0.048;
              return [p, focal(p, gamma)];
            }),
          },
        ]}
        markers={[{ x: easyP, y: focal(easyP, gamma), label: `易例压低为 ${focal(easyP, gamma).toFixed(3)}`, tone: 'emerald', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};
