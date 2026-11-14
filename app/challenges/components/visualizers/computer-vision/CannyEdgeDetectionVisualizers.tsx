'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
  InteractiveGraphCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：边缘检测 (Canny)

// L1: Canny 边缘检测管道
export const CannyPipelineVisualizer: React.FC = () => {
  const [stage, setStage] = useState(2);
  const stages = [
    { label: '1. 高斯去噪', desc: '消除微弱高频孤立噪点。', tone: 'slate' as VisualizerTone },
    { label: '2. Sobel 梯度 G', desc: '计算横向 Gx、纵向 Gy 得出梯度幅值与方向。', tone: 'indigo' as VisualizerTone },
    { label: '3. NMS 非极大抑制', desc: '沿梯度方向仅保留局部峰值，将宽边细化为 1px 单像素骨架。', tone: 'cyan' as VisualizerTone },
    { label: '4. 双阈值滞后连接', desc: '保留强边缘 (>high)，仅保留连通到强边缘的弱边缘 (low~high)。', tone: 'emerald' as VisualizerTone },
  ];
  return (
    <VisualizerFrame
      title="Canny 边缘检测四阶段精密流水线"
      subtitle="从平滑滤波、梯度求导、单像素脊线细化到双阈值滞后连通"
      badge="canny_edge"
      scenarios={stages.map((s) => ({ label: s.label, summary: s.desc }))}
      activeScenario={stage}
      onScenarioChange={setStage}
      metrics={[
        { label: '当前阶段', value: stages[stage].label, tone: stages[stage].tone },
        { label: '核心作用', value: stages[stage].desc.slice(0, 14) + '…', tone: 'cyan' },
      ]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={stages.map((s, i) => ({
          id: `s${i}`,
          x: 52 + i * 98,
          y: 82,
          label: s.label.split(' ')[1],
          sublabel: `Step ${i + 1}`,
          tone: i <= stage ? s.tone : 'slate',
          shape: 'pill',
          active: i === stage,
        }))}
        edges={[0, 1, 2].map((i) => ({
          from: `s${i}`,
          to: `s${i + 1}`,
          tone: i < stage ? 'emerald' : 'slate',
          animated: i === stage - 1,
        }))}
      />
    </VisualizerFrame>
  );
};

// L2: 霍夫变换直线检测
export const HoughTransformVisualizer: React.FC = () => {
  const [thetaDeg, setThetaDeg] = useState(45);
  const rad = (thetaDeg * Math.PI) / 180;
  const pts: Array<[number, number]> = [
    [1, 1],
    [2, 2],
    [3, 3],
  ];
  const rhos = pts.map(([x, y]) => x * Math.cos(rad) + y * Math.sin(rad));
  const aligned = Math.abs(thetaDeg - 135) <= 5;
  return (
    <VisualizerFrame
      title="霍夫变换对偶空间累加器投票 (ρ = x·cosθ + y·sinθ)"
      subtitle="图像空间中共线的多个边缘点，在极坐标 (θ, ρ) 参数空间里正弦曲线会交汇于同一峰值桶"
      badge="hough_lines"
      sliders={[{ label: '扫描法线倾角 θ (°)', value: thetaDeg, min: 0, max: 180, step: 15, displayValue: `${thetaDeg}°`, onChange: setThetaDeg }]}
      metrics={[
        { label: '三点 ρ 投票值', value: rhos.map((r) => r.toFixed(1)).join(', '), tone: aligned ? 'emerald' : 'cyan' },
        { label: 'Accumulator 峰值', value: aligned ? '3 票同桶汇交 ✓' : '分散未对齐', tone: aligned ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0, 180]}
        domainY={[-4.5, 4.5]}
        xLabel="角度 θ (°)"
        yLabel="距离 ρ"
        curves={pts.map(([x, y], i) => ({
          id: `p${i}`,
          label: `点(${x},${y})`,
          tone: (['cyan', 'indigo', 'emerald'] as VisualizerTone[])[i],
          points: Array.from({ length: 19 }, (_, k) => {
            const th = k * 10;
            const r = (th * Math.PI) / 180;
            return [th, x * Math.cos(r) + y * Math.sin(r)];
          }),
        }))}
        vLines={[{ x: thetaDeg, label: `θ=${thetaDeg}°`, tone: aligned ? 'emerald' : 'amber' }]}
        markers={[{ x: 135, y: 0, label: '共线交点 (135°, 0)', tone: 'emerald', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};
