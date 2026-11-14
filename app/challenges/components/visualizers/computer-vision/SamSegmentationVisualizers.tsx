'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveGraphCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：SAM分割大模型

// L1: SAM 提示分割模拟器
export const SamPromptSegmentVisualizer: React.FC = () => {
  const [promptMode, setPromptMode] = useState(0);
  const modes = [
    { label: '正向点击 (Positive Point)', summary: '输入前景点 (x, y, label=1)，掩码解码器锁定局部目标区域。' },
    { label: '正点 + 负点排斥 (Negative)', summary: '增加背景负样本点 (label=0)，精确剔除旁边误连通区域。' },
    { label: '边界框 Box Prompt', summary: '给定 [x1, y1, x2, y2] 框约束，一次性给出最高歧义消解精度掩码。' },
  ];
  return (
    <VisualizerFrame
      title="SAM (Segment Anything) 交互式点/框提示消歧"
      subtitle="重图像编码器 (ViT-H) 只需预计算 1 次；轻量化提示解码器在 50ms 内实时响应提示点击"
      badge="sam_prompt"
      scenarios={modes}
      activeScenario={promptMode}
      onScenarioChange={setPromptMode}
      metrics={[
        { label: '编码器计算', value: '预缓存 1 次图像嵌入', tone: 'indigo' },
        { label: '多粒度输出', value: '3 级子掩码 + IoU 排序', tone: 'emerald' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-3, 3]}
        domainY={[-2.5, 2.5]}
        height={210}
        circles={[{ cx: 0, cy: 0, r: 1.4, tone: 'emerald', label: '分割目标 Mask' }]}
        polygons={
          promptMode === 2 ? [{ points: [[-1.7, -1.6], [1.7, -1.6], [1.7, 1.6], [-1.7, 1.6]], tone: 'cyan', label: 'Box 提示' }] : []
        }
        points={[
          { x: 0.2, y: 0.1, tone: 'emerald', radius: 6, label: '前景点 (+)' },
          ...(promptMode === 1 ? [{ x: 2.1, y: 1.0, tone: 'rose' as VisualizerTone, radius: 6, label: '排斥点 (-)' }] : []),
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 嵌入提取与掩码解码
export const SamMaskDecoderArchVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <VisualizerFrame
      title="SAM Image Embedding × Prompt Tokens 双向交叉注意力解码"
      subtitle="输出 Mask Token 与上采样特征图逐像素点积生成二值掩码并预测置信 IoU"
      badge="sam_decoder"
      scenarios={[
        { label: '1. 提取 256×64×64 图像嵌入', summary: 'ViT 骨干把高清图压缩为稠密空间语义张量（可跨多次点击复用）。' },
        { label: '2. 双向交叉注意力解码 ✓', summary: 'Prompt Tokens 查询 Image Embedding 更新状态，逐像素内积得出高质量 Mask！' },
      ]}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[{ label: '解码耗时', value: '< 50 ms (CPU/WebGPU)', tone: 'emerald' }]}
    >
      <InteractiveGraphCanvas
        height={175}
        nodes={[
          { id: 'img', x: 75, y: 50, label: 'Image Encoder', sublabel: '64×64×256', tone: 'indigo', shape: 'pill', active: true },
          { id: 'prm', x: 75, y: 128, label: 'Prompt Encoder', sublabel: 'Point / Box Token', tone: 'cyan', shape: 'pill', active: true },
          { id: 'ca', x: 215, y: 88, label: 'Two-Way Cross-Attn', tone: step ? 'amber' : 'slate', shape: 'pill', active: step === 1 },
          { id: 'mask', x: 340, y: 88, label: 'Mask + IoU Head', tone: step ? 'emerald' : 'slate', shape: 'pill', active: step === 1 },
        ]}
        edges={[
          { from: 'img', to: 'ca', tone: 'indigo', animated: true },
          { from: 'prm', to: 'ca', tone: 'cyan', animated: true },
          { from: 'ca', to: 'mask', label: '点积投影', tone: step ? 'emerald' : 'slate', animated: step === 1 },
        ]}
      />
    </VisualizerFrame>
  );
};
