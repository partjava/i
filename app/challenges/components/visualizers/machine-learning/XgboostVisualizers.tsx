'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
} from '../shared/VisualizerEngine';

// 章节：XGBoost

// L1: XGBoost 梯度提升模拟器
export const XgboostResidualVisualizer: React.FC = () => {
  const [lr, setLr] = useState(0.5);
  const [rounds, setRounds] = useState(3);
  const trueY = 10.0;
  const history = [4.0];
  for (let r = 0; r < rounds; r++) {
    const prev = history[history.length - 1];
    history.push(prev + lr * (trueY - prev));
  }
  const residual = trueY - history[history.length - 1];
  return (
    <VisualizerFrame
      title="GBDT / XGBoost 加法模型残差逐步逼近"
      subtitle="每轮新树拟合并削减当前负梯度残差 r_i = y - ŷ，经学习率 η 收缩"
      badge="fit_gbdt"
      sliders={[
        { label: '收缩学习率 η (learning_rate)', value: lr, min: 0.1, max: 0.9, step: 0.1, displayValue: lr.toFixed(1), onChange: setLr },
        { label: 'Boosting 迭代轮数 M', value: rounds, min: 1, max: 6, step: 1, onChange: setRounds },
      ]}
      metrics={[
        { label: '最终预测 ŷ', value: history[history.length - 1].toFixed(2), tone: 'cyan' },
        { label: '剩余残差 |y-ŷ|', value: Math.abs(residual).toFixed(2), tone: Math.abs(residual) < 1.2 ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0, 6]}
        domainY={[3, 11]}
        xLabel="Boosting 轮次"
        yLabel="预测值 ŷ"
        curves={[
          {
            id: 'pred',
            label: '累计预测 ŷ_m',
            tone: 'cyan',
            fillArea: true,
            points: history.map((v, i) => [i, v]),
          },
        ]}
        hLines={[{ y: trueY, label: '真实目标 y=10', tone: 'emerald' }]}
        markers={history.map((v, i) => ({ x: i, y: v, tone: i === rounds ? 'emerald' : 'indigo', radius: 4 }))}
      />
    </VisualizerFrame>
  );
};

// L2: XGBoost 回归训练器
export const XgboostNewtonGainVisualizer: React.FC = () => {
  const [regLambda, setRegLambda] = useState(1.0);
  const G = 4.0;
  const H = 2.0;
  const leafWeight = -G / (H + regLambda);
  const gainTerm = (G * G) / (H + regLambda);
  return (
    <VisualizerFrame
      title="XGBoost 二阶泰勒叶权重 w* 与结构增益"
      subtitle="同时利用一阶梯度 G 与二阶海森曲率 H，结合 L2 λ 防分裂过深"
      badge="xgboost_gain"
      sliders={[{ label: '叶权重惩罚项 λ', value: regLambda, min: 0.0, max: 6.0, step: 0.5, displayValue: regLambda.toFixed(1), onChange: setRegLambda }]}
      metrics={[
        { label: '最优叶权 w* = -G/(H+λ)', value: leafWeight.toFixed(2), tone: 'cyan' },
        { label: '结构得分 G²/(H+λ)', value: gainTerm.toFixed(2), tone: 'emerald' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0, 6]}
        domainY={[0, 8.5]}
        xLabel="L2 正则项 λ"
        yLabel="增益得分"
        curves={[
          {
            id: 'gain',
            label: 'G² / (H + λ)',
            tone: 'emerald',
            fillArea: true,
            points: Array.from({ length: 25 }, (_, i) => {
              const l = i * 0.25;
              return [l, (G * G) / (H + l)];
            }),
          },
        ]}
        markers={[{ x: regLambda, y: gainTerm, label: `${gainTerm.toFixed(2)}`, tone: 'cyan', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};
