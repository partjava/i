'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：目标检测 (YOLO)

// L1: YOLO 锚框与 IoU 计算器
export const YoloIouAnchorVisualizer: React.FC = () => {
  const [shiftX, setShiftX] = useState(0.8);
  const w = 2.0,
    h = 2.0;
  const interW = Math.max(0, w - Math.abs(shiftX));
  const interArea = interW * h;
  const unionArea = 2 * (w * h) - interArea;
  const iou = interArea / unionArea;
  return (
    <VisualizerFrame
      title="YOLO 锚框交并比 (IoU = Intersection / Union) 几何计算"
      subtitle="水平滑动预测框查看重叠面积变化与 NMS 抑制阈值 0.50 判定"
      badge="yolo_iou"
      sliders={[{ label: '预测框水平偏移 Δx', value: shiftX, min: 0, max: 2.2, step: 0.2, displayValue: shiftX.toFixed(1), onChange: setShiftX }]}
      metrics={[
        { label: '交集面积', value: interArea.toFixed(2), tone: 'cyan' },
        { label: '并集面积', value: unionArea.toFixed(2), tone: 'indigo' },
        { label: 'IoU 交并比', value: iou.toFixed(2), tone: iou >= 0.5 ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-2.5, 4.0]}
        domainY={[-2, 2.5]}
        height={210}
        polygons={[
          { points: [[-1, -1], [1, -1], [1, 1], [-1, 1]], tone: 'emerald', label: 'GT 真值框' },
          { points: [[-1 + shiftX, -1], [1 + shiftX, -1], [1 + shiftX, 1], [-1 + shiftX, 1]], tone: iou >= 0.5 ? 'cyan' : 'rose', label: '预测锚框' },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: YOLO 损失函数
export const YoloMultiTaskLossVisualizer: React.FC = () => {
  const [coordW, setCoordW] = useState(5.0);
  const boxLoss = 0.18 * coordW;
  const objLoss = 0.25;
  const clsLoss = 0.12;
  return (
    <VisualizerFrame
      title="YOLO 多任务损失权重平衡 (λ_coord · Box + Obj + Cls)"
      subtitle="由于图像中大量网格不含目标，需提升 λ_coord 权重放大定位回归损失避免梯度被背景淹没"
      badge="yolo_loss"
      sliders={[{ label: '坐标权重系数 λ_coord', value: coordW, min: 1.0, max: 8.0, step: 1.0, displayValue: coordW.toFixed(1), onChange: setCoordW }]}
      metrics={[
        { label: '加权定位框损失', value: boxLoss.toFixed(2), tone: 'cyan' },
        { label: '总损失 Total Loss', value: (boxLoss + objLoss + clsLoss).toFixed(2), tone: 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'Loss 组成比例',
            slots: [
              { label: `Box ×${coordW}: ${boxLoss.toFixed(2)}`, sublabel: 'xywh/CIoU', tone: 'cyan' },
              { label: `Obj: ${objLoss.toFixed(2)}`, sublabel: '置信度 BCE', tone: 'indigo' },
              { label: `Cls: ${clsLoss.toFixed(2)}`, sublabel: '多类别 BCE', tone: 'emerald' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};
