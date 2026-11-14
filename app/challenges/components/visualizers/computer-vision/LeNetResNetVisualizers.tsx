'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

// 章节：LeNet/ResNet分类

// L1: CNN 卷积分类器
export const CnnClassifierArchVisualizer: React.FC = () => {
  const [step, setStep] = useState(2);
  const shapes = [
    { layer: '输入 RGB', shape: '3×32×32', desc: '空间高分辨率纹理像素。' },
    { layer: 'Conv + MaxPool ×2', shape: '64×8×8', desc: '下采样缩小空间尺寸同时翻倍语义通道数。' },
    { layer: 'GAP + Linear', shape: '10 Logits', desc: '全局平均池化展平输出 10 类得分。' },
  ];
  return (
    <VisualizerFrame
      title="CNN 层次化特征金字塔维度演进"
      subtitle="空间长宽逐步压缩、语义通道逐层加厚，从边缘纹理抽象到物体语义"
      badge="cnn_classifier"
      scenarios={shapes.map((s) => ({ label: s.layer, summary: `${s.shape}：${s.desc}` }))}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[{ label: '当前张量形状', value: shapes[step].shape, tone: 'cyan' }]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={shapes.map((s, i) => ({
          id: `n${i}`,
          x: 68 + i * 130,
          y: 82,
          label: s.layer,
          sublabel: s.shape,
          tone: i === step ? 'emerald' : i < step ? 'cyan' : 'slate',
          shape: 'pill',
          active: i <= step,
        }))}
        edges={[0, 1].map((i) => ({ from: `n${i}`, to: `n${i + 1}`, tone: i < step ? 'emerald' : 'slate', animated: i < step }))}
      />
    </VisualizerFrame>
  );
};

// L2: ResNet 残差块
export const ResNetSkipConnectionVisualizer: React.FC = () => {
  const [depth, setDepth] = useState(50);
  const plainGrad = Math.pow(0.82, depth / 5).toFixed(3);
  const resGrad = (1.0 + Math.pow(0.82, depth / 5) * 0.4).toFixed(3);
  return (
    <VisualizerFrame
      title="ResNet 恒等跳跃连接 (y = F(x) + x) 梯度高速公路"
      subtitle="由于 ∂(F(x)+x)/∂x = ∂F/∂x + I，反向梯度可通过恒等项 1 无损直达浅层"
      badge="ResidualBlock"
      sliders={[{ label: '网络总深度 (Layers)', value: depth, min: 18, max: 152, step: 16, onChange: setDepth }]}
      metrics={[
        { label: 'Plain 无残差回传梯度', value: plainGrad, tone: Number(plainGrad) < 0.2 ? 'rose' : 'amber' },
        { label: 'ResNet 有跳连梯度', value: `${resGrad} (不退化 ✓)`, tone: 'emerald' },
      ]}
    >
      <InteractiveGraphCanvas
        height={175}
        nodes={[
          { id: 'x', x: 65, y: 90, label: '输入 x', tone: 'cyan', shape: 'pill', active: true },
          { id: 'f1', x: 165, y: 120, label: 'Conv 3×3', tone: 'indigo', shape: 'pill' },
          { id: 'f2', x: 265, y: 120, label: 'Conv 3×3', sublabel: 'F(x)', tone: 'indigo', shape: 'pill' },
          { id: 'add', x: 350, y: 90, label: 'F(x) + x', sublabel: '∂/∂x 包含 +1', tone: 'emerald', shape: 'pill', active: true },
        ]}
        edges={[
          { from: 'x', to: 'f1', tone: 'indigo' },
          { from: 'f1', to: 'f2', tone: 'indigo' },
          { from: 'f2', to: 'add', tone: 'indigo' },
          { from: 'x', to: 'add', label: 'Identity +x (梯度直通)', tone: 'emerald', animated: true, curveOffset: -48 },
        ]}
      />
    </VisualizerFrame>
  );
};
