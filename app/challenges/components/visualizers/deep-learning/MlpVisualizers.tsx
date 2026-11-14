'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMatrixCanvas,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

// 章节：MLP多层感知机

// L1: 多层感知机前向传播
export const MlpForwardVisualizer: React.FC = () => {
  const [x1, setX1] = useState(1.2);
  const [wScale, setWScale] = useState(1.0);
  const h1 = Math.max(0, x1 * 0.8 * wScale + 0.2);
  const h2 = Math.max(0, x1 * -0.4 * wScale + 0.9);
  const out = (h1 * 1.1 + h2 * 0.7 - 0.3).toFixed(2);
  return (
    <VisualizerFrame
      title="MLP 多层感知机前向线性变换与 ReLU 激活"
      subtitle="z = Wx + b 经过非线性 ReLU 激活传递到输出头"
      badge="linear_forward"
      sliders={[
        { label: '输入特征 x₁', value: x1, min: -2, max: 2.5, step: 0.2, displayValue: x1.toFixed(1), onChange: setX1 },
        { label: '隐藏层权重缩放', value: wScale, min: 0.4, max: 1.8, step: 0.2, displayValue: wScale.toFixed(1), onChange: setWScale },
      ]}
      metrics={[
        { label: '隐藏元 h₁ (ReLU)', value: h1.toFixed(2), tone: h1 > 0 ? 'emerald' : 'slate' },
        { label: '隐藏元 h₂ (ReLU)', value: h2.toFixed(2), tone: h2 > 0 ? 'emerald' : 'slate' },
        { label: '输出层 ŷ', value: out, tone: 'cyan' },
      ]}
    >
      <InteractiveGraphCanvas
        height={185}
        nodes={[
          { id: 'x1', x: 70, y: 55, label: `x₁=${x1.toFixed(1)}`, tone: 'cyan', radius: 18, active: true },
          { id: 'x2', x: 70, y: 130, label: 'b=1.0', tone: 'slate', radius: 16 },
          { id: 'h1', x: 200, y: 55, label: `h₁=${h1.toFixed(1)}`, tone: h1 > 0 ? 'emerald' : 'slate', shape: 'pill', active: h1 > 0 },
          { id: 'h2', x: 200, y: 130, label: `h₂=${h2.toFixed(1)}`, tone: h2 > 0 ? 'emerald' : 'slate', shape: 'pill', active: h2 > 0 },
          { id: 'y', x: 330, y: 92, label: `ŷ=${out}`, tone: 'cyan', shape: 'pill', active: true },
        ]}
        edges={[
          { from: 'x1', to: 'h1', tone: 'cyan', animated: h1 > 0 },
          { from: 'x1', to: 'h2', tone: 'indigo', animated: h2 > 0 },
          { from: 'x2', to: 'h1', tone: 'slate', dashed: true },
          { from: 'x2', to: 'h2', tone: 'slate', dashed: true },
          { from: 'h1', to: 'y', tone: h1 > 0 ? 'emerald' : 'slate', animated: h1 > 0 },
          { from: 'h2', to: 'y', tone: h2 > 0 ? 'emerald' : 'slate', animated: h2 > 0 },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: CNN 卷积前向传播
export const CnnConv2dForwardVisualizer: React.FC = () => {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const img = [
    [1, 2, 0, 1],
    [0, 1, 3, 2],
    [2, 1, 1, 0],
    [1, 0, 2, 4],
  ];
  const kernel = [
    [1, 0],
    [-1, 1],
  ];
  const convAt = (r: number, c: number) =>
    img[r][c] * kernel[0][0] + img[r][c + 1] * kernel[0][1] + img[r + 1][c] * kernel[1][0] + img[r + 1][c + 1] * kernel[1][1];
  const currentVal = convAt(row, col);
  return (
    <VisualizerFrame
      title="CNN 2D 卷积核滑动感受野内积 (conv2d_forward)"
      subtitle="2×2 卷积核在 4×4 特征图上以 stride=1 滑窗，生成 3×3 输出特征"
      badge="conv2d_forward"
      sliders={[
        { label: '感受野起始行 r', value: row, min: 0, max: 2, step: 1, onChange: setRow },
        { label: '感受野起始列 c', value: col, min: 0, max: 2, step: 1, onChange: setCol },
      ]}
      metrics={[
        { label: `窗口位置 (${row},${col})`, value: `2×2 局部感受野`, tone: 'cyan' },
        { label: `卷积核加权和 Out[${row},${col}]`, value: `${currentVal}`, tone: 'emerald' },
      ]}
    >
      <InteractiveMatrixCanvas
        operatorLabel="⊛"
        left={{
          title: '输入图像 4×4',
          rows: img.map((rArr, r) =>
            rArr.map((v, c) => ({
              value: v,
              highlight: r >= row && r < row + 2 && c >= col && c < col + 2 ? 'cyan' : 'none',
            }))
          ),
          highlightRect: { r: row, c: col, h: 2, w: 2, tone: 'cyan' },
        }}
        middle={{
          title: '2×2 核',
          rows: kernel.map((rArr) => rArr.map((v) => ({ value: v, highlight: 'amber' }))),
        }}
        right={{
          title: '输出特征 3×3',
          rows: [0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => ({
              value: convAt(r, c),
              highlight: r === row && c === col ? 'emerald' : 'none',
            }))
          ),
        }}
      />
    </VisualizerFrame>
  );
};
