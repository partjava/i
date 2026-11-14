'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

// 章节：图像分割 (U-Net)

// L1: U-Net 图像分割模拟器
export const UnetSkipEncoderDecoderVisualizer: React.FC = () => {
  const [level, setLevel] = useState(2);
  return (
    <VisualizerFrame
      title="U-Net 编码器-解码器对称 U 型与高分辨率特征拼接"
      subtitle="编码下采样提取全局上下文语义，跳跃 Concat 把浅层空间边界精准传回解码端"
      badge="unet_segment"
      scenarios={[
        { label: 'Encoder 逐层下采样', summary: '抽取高语义低分辨率瓶颈特征，识别“是什么”。' },
        { label: 'Bottleneck 语义浓缩', summary: '感受野覆盖整图。' },
        { label: 'Decoder + Skip Concat ✓', summary: '上采样逐级拼接对应浅层特征，精确对齐像素分割轮廓！' },
      ]}
      activeScenario={level}
      onScenarioChange={setLevel}
      metrics={[{ label: '融合方式', value: 'Channel-wise Concat (C₁ + C₂)', tone: 'emerald' }]}
    >
      <InteractiveGraphCanvas
        height={185}
        nodes={[
          { id: 'e1', x: 70, y: 40, label: 'Enc L1 (H×W)', tone: 'cyan', shape: 'pill', active: level >= 0 },
          { id: 'e2', x: 115, y: 95, label: 'Enc L2 (H/2)', tone: 'indigo', shape: 'pill', active: level >= 0 },
          { id: 'bot', x: 200, y: 148, label: 'Bottleneck (H/4)', tone: 'amber', shape: 'pill', active: level >= 1 },
          { id: 'd2', x: 285, y: 95, label: 'Dec L2 + Skip', tone: 'emerald', shape: 'pill', active: level >= 2 },
          { id: 'd1', x: 330, y: 40, label: 'Mask (H×W)', tone: 'emerald', shape: 'pill', active: level >= 2 },
        ]}
        edges={[
          { from: 'e1', to: 'e2', tone: 'cyan' },
          { from: 'e2', to: 'bot', tone: 'indigo' },
          { from: 'bot', to: 'd2', tone: 'emerald', animated: level >= 2 },
          { from: 'd2', to: 'd1', tone: 'emerald', animated: level >= 2 },
          { from: 'e1', to: 'd1', label: 'Skip Concat', tone: 'emerald', dashed: true, animated: level >= 2 },
          { from: 'e2', to: 'd2', label: 'Skip Concat', tone: 'emerald', dashed: true, animated: level >= 2 },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: Dice 与 IoU 评估
export const DiceVsIouMetricsVisualizer: React.FC = () => {
  const [tp, setTp] = useState(6);
  const fp = 2,
    fn = 2;
  const dice = (2 * tp) / (2 * tp + fp + fn);
  const iou = tp / (tp + fp + fn);
  return (
    <VisualizerFrame
      title="语义分割 Dice 系数 vs IoU (Jaccard) 与类别不平衡鲁棒性"
      subtitle="前景目标极小时 Cross-Entropy 易被背景主导；Dice = 2|A∩B|/(|A|+|B|) 直接优化重叠度"
      badge="dice_iou"
      sliders={[{ label: '前景预测交集像素 TP', value: tp, min: 1, max: 10, step: 1, onChange: setTp }]}
      metrics={[
        { label: 'Dice Score (F1)', value: dice.toFixed(3), tone: 'emerald' },
        { label: 'IoU (Jaccard)', value: iou.toFixed(3), tone: 'cyan' },
        { label: '关系验证', value: 'Dice ≥ IoU 恒成立 ✓', tone: 'indigo' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[1, 10]}
        domainY={[0, 1]}
        xLabel="正确前景交集 TP"
        yLabel="分割得分"
        curves={[
          { id: 'dice', label: 'Dice = 2TP/(2TP+FP+FN)', tone: 'emerald', points: Array.from({ length: 10 }, (_, i) => [i + 1, (2 * (i + 1)) / (2 * (i + 1) + fp + fn)]) },
          { id: 'iou', label: 'IoU = TP/(TP+FP+FN)', tone: 'cyan', points: Array.from({ length: 10 }, (_, i) => [i + 1, (i + 1) / (i + 1 + fp + fn)]) },
        ]}
        markers={[
          { x: tp, y: dice, label: `Dice=${dice.toFixed(2)}`, tone: 'emerald', radius: 5 },
          { x: tp, y: iou, label: `IoU=${iou.toFixed(2)}`, tone: 'cyan', radius: 4 },
        ]}
      />
    </VisualizerFrame>
  );
};
