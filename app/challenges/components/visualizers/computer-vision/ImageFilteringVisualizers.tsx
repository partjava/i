'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
  InteractiveMatrixCanvas,
} from '../shared/VisualizerEngine';

// 章节：图像滤波与增强

// L1: 图像卷积滤波引擎
export const ImageConvolutionEngineVisualizer: React.FC = () => {
  const [filterIdx, setFilterIdx] = useState(0);
  const filters = [
    {
      name: 'Sobel 竖直边缘核',
      kernel: [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1],
      ],
      outCenter: 200,
      summary: '检测水平强度突变（左边 10，右边 60）产生强正响应 200。',
    },
    {
      name: '均值模糊平滑核',
      kernel: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ],
      outCenter: 35,
      summary: '邻域像素取均值 35，有效压低高频椒盐噪点。',
    },
    {
      name: '锐化拉普拉斯核',
      kernel: [
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0],
      ],
      outCenter: 45,
      summary: '强化中心像素与四邻域反差，突出图像纹理细节。',
    },
  ];
  const cur = filters[filterIdx];
  const img = [
    [10, 10, 60],
    [10, 15, 60],
    [10, 10, 60],
  ];
  return (
    <VisualizerFrame
      title="2D 空间滤波卷积核响应对比 (Sobel / Blur / Sharpen)"
      subtitle="不同 3×3 卷积核对左暗右亮垂直阶跃边界的像素级响应输出"
      badge="conv2d_filter"
      scenarios={filters.map((f) => ({ label: f.name, summary: f.summary }))}
      activeScenario={filterIdx}
      onScenarioChange={setFilterIdx}
      metrics={[
        { label: '当前滤波核', value: cur.name, tone: 'cyan' },
        { label: '中心输出响应', value: `${cur.outCenter}`, tone: cur.outCenter > 100 ? 'emerald' : 'indigo' },
      ]}
    >
      <InteractiveMatrixCanvas
        operatorLabel="⊛"
        left={{
          title: '灰阶区域 3×3',
          rows: img.map((r) => r.map((v) => ({ value: v, intensity: v / 80 }))),
        }}
        middle={{
          title: '滤波器核',
          rows: cur.kernel.map((r) => r.map((v) => ({ value: v, highlight: v > 0 ? 'cyan' : v < 0 ? 'rose' : 'none' }))),
        }}
        right={{
          title: '响应结果',
          rows: [[{ value: cur.outCenter, highlight: 'emerald' }]],
        }}
      />
    </VisualizerFrame>
  );
};

// L2: 直方图均衡化
export const HistogramEqualizationVisualizer: React.FC = () => {
  const [phase, setPhase] = useState(1);
  const rawBins = [
    [1, 15],
    [2, 55],
    [3, 85],
    [4, 40],
    [5, 5],
    [6, 0],
    [7, 0],
  ] as Array<[number, number]>;
  const eqBins = [
    [1, 20],
    [2, 32],
    [3, 35],
    [4, 30],
    [5, 34],
    [6, 28],
    [7, 21],
  ] as Array<[number, number]>;
  return (
    <VisualizerFrame
      title="直方图均衡化 (CDF 映射拉伸灰阶动态范围)"
      subtitle="利用累积分布函数 CDF 将挤在暗部的像素均匀拉开至 [0, 255] 全动态范围"
      badge="hist_equalize"
      scenarios={[
        { label: '均衡化前 (低对比过暗)', summary: '像素高度集中在灰阶桶 2-3，画面发灰欠曝。' },
        { label: 'CDF 均衡化后 (对比度增强)', summary: '累积分布映射拉伸至桶 1-7 均匀铺开，明暗层次分明！' },
      ]}
      activeScenario={phase}
      onScenarioChange={setPhase}
      metrics={[
        { label: '有效灰阶跨度', value: phase ? '1 ~ 7 全宽 ✓' : '2 ~ 4 窄带', tone: phase ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[1, 7]}
        domainY={[0, 95]}
        xLabel="灰阶桶"
        yLabel="像素频数"
        curves={[
          {
            id: 'hist',
            label: phase ? '均衡化后分布' : '原始偏暗分布',
            tone: phase ? 'emerald' : 'amber',
            fillArea: true,
            points: phase ? eqBins : rawBins,
          },
        ]}
      />
    </VisualizerFrame>
  );
};
