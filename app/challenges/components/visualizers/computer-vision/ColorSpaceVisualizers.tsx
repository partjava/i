'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：色彩空间转换

// L1: 色彩空间转换器
export const ColorSpaceConverterVisualizer: React.FC = () => {
  const [hueRatio, setHueRatio] = useState(0.5);
  const r = Math.round(Math.max(0, 1 - hueRatio * 1.5) * 255);
  const g = Math.round(Math.min(1, 1 - Math.abs(hueRatio - 0.5) * 2) * 255);
  const b = Math.round(Math.max(0, (hueRatio - 0.3) * 1.4) * 255);
  const maxC = Math.max(r, g, b);
  const minC = Math.min(r, g, b);
  const v = ((maxC / 255) * 100).toFixed(0);
  const s = maxC === 0 ? '0' : (((maxC - minC) / maxC) * 100).toFixed(0);
  return (
    <VisualizerFrame
      title="RGB 立方体 ↔ HSV 柱坐标解耦 (色调 / 饱和度 / 明度)"
      subtitle="将亮度和颜色信息分离到 H 与 V 通道，便于跨光照条件进行稳定阈值抠图"
      badge="rgb_to_hsv"
      sliders={[{ label: '色谱相位偏移', value: hueRatio, min: 0.0, max: 1.0, step: 0.1, onChange: setHueRatio }]}
      metrics={[
        { label: 'RGB (0-255)', value: `(${r}, ${g}, ${b})`, tone: 'cyan' },
        { label: 'HSV (H°, S%, V%)', value: `(${Math.round(hueRatio * 240)}°, ${s}%, ${v}%)`, tone: 'emerald' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'RGB 通道',
            slots: [
              { label: `R: ${r}`, sublabel: '红光分量', tone: 'rose' },
              { label: `G: ${g}`, sublabel: '绿光分量', tone: 'emerald' },
              { label: `B: ${b}`, sublabel: '蓝光分量', tone: 'cyan' },
            ],
          },
          {
            name: 'HSV 解耦',
            slots: [
              { label: `H: ${Math.round(hueRatio * 240)}°`, sublabel: '色相角', tone: 'amber' },
              { label: `S: ${s}%`, sublabel: '纯度', tone: 'indigo' },
              { label: `V: ${v}%`, sublabel: '明度 max(RGB)', tone: 'slate' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 颜色迁移算法
export const ColorTransferLabVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <VisualizerFrame
      title="L*a*b* 统计均值方差对齐颜色迁移 (Reinhard)"
      subtitle="在感知均匀 Lab 空间分别匹配源图与目标风光的 μ 和 σ，实现电影色调一键迁移"
      badge="color_transfer"
      scenarios={[
        { label: '原图 (冷蓝阴天)', summary: 'a*b* 均值为 (-18, -22)，标准差偏窄。' },
        { label: 'Lab 迁移后 (暖金落日)', summary: '计算 (X_src - μ_s) * (σ_t / σ_s) + μ_t 后迁移至暖金风格！' },
      ]}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: '统计迁移式', value: '(x-μ_s)·(σ_t/σ_s)+μ_t', tone: 'cyan' },
        { label: '当前色调重心 (a*,b*)', value: step ? '(+24, +32) 暖金✓' : '(-18, -22) 冷青', tone: step ? 'amber' : 'cyan' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-40, 40]}
        domainY={[-40, 40]}
        xLabel="a* (绿↔红)"
        yLabel="b* (蓝↔黄)"
        height={205}
        circles={[
          { cx: -18, cy: -22, r: 9, tone: 'cyan', dashed: true, label: '源图分布' },
          { cx: 24, cy: 30, r: 11, tone: 'amber', label: '参考风格' },
        ]}
        vectors={step ? [{ id: 'move', from: [-18, -22], to: [24, 30], tone: 'emerald', label: 'μ/σ 仿射迁移' }] : []}
      />
    </VisualizerFrame>
  );
};
