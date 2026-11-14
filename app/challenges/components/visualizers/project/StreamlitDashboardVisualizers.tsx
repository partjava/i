'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
  InteractiveTimelineCanvas,
} from '../shared/VisualizerEngine';

// 章节：Streamlit数据看板

// L1: Streamlit 数据监控看板
export const StreamlitRerunCacheVisualizer: React.FC = () => {
  const [cached, setCached] = useState(1);
  return (
    <VisualizerFrame
      title="Streamlit 自顶向下全脚本重跑 (Rerun) 与 @st.cache_resource"
      subtitle="每次滑块交互都会触发整个脚本重新执行；必须用装饰器缓存大模型权重避免每次重跑重新加载"
      badge="streamlit_dashboard"
      scenarios={[
        { label: '未加缓存：滑一下卡 15 秒 ✗', summary: '改动过滤日期后整个脚本从头重跑，2GB 模型或大 CSV 被迫重读！' },
        { label: '@st.cache_data / resource ✓', summary: '大对象驻留内存全局单例，交互重跑毫秒响应仅刷新图表区！' },
      ]}
      activeScenario={cached}
      onScenarioChange={setCached}
      metrics={[{ label: '交互刷新耗时', value: cached ? '12 ms ⚡' : '15,000 ms (重载)', tone: cached ? 'emerald' : 'rose' }]}
    >
      <InteractiveTimelineCanvas
        maxTime={100}
        unit="ms"
        lanes={[
          {
            name: cached ? 'Cached Rerun' : 'Uncached Rerun',
            blocks: cached
              ? [
                  { start: 0, end: 5, label: '命中模型缓存', tone: 'emerald' },
                  { start: 6, end: 15, label: '重绘图表 ✓', tone: 'cyan' },
                ]
              : [
                  { start: 0, end: 80, label: '重复加载 2GB 模型权重!!', tone: 'rose' },
                  { start: 81, end: 95, label: '绘制图表', tone: 'amber' },
                ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: ML 训练监控看板
export const MlTrainingMonitorVisualizer: React.FC = () => {
  const [epoch, setEpoch] = useState(8);
  const trainLoss = (e: number) => 2.2 * Math.exp(-0.32 * e) + 0.08;
  const valLoss = (e: number) => 2.2 * Math.exp(-0.3 * e) + 0.16 + Math.max(0, e - 5) * 0.07;
  const overfit = epoch > 6;
  return (
    <VisualizerFrame
      title="ML 训练监控看板：Training vs Validation 曲线早停检测"
      subtitle="实时追踪 Epoch 损失曲线：当训练损失继续下降而验证损失抬头反弹时立即触发 EarlyStopping"
      badge="ml_monitor"
      sliders={[{ label: '当前观察 Epoch', value: epoch, min: 1, max: 10, step: 1, onChange: setEpoch }]}
      metrics={[
        { label: 'Train Loss', value: trainLoss(epoch).toFixed(3), tone: 'cyan' },
        { label: 'Val Loss', value: valLoss(epoch).toFixed(3), tone: overfit ? 'rose' : 'emerald' },
        { label: '监控告警', value: overfit ? '过拟合拐点 ⚠️ 建议早停' : '健康收敛 ✓', tone: overfit ? 'rose' : 'emerald' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[1, 10]}
        domainY={[0, 2.2]}
        xLabel="Epoch"
        yLabel="Loss"
        curves={[
          {
            id: 'tr',
            label: 'Train Loss',
            tone: 'cyan',
            points: Array.from({ length: 10 }, (_, i) => [i + 1, trainLoss(i + 1)]),
          },
          {
            id: 'val',
            label: 'Val Loss',
            tone: overfit ? 'rose' : 'emerald',
            points: Array.from({ length: 10 }, (_, i) => [i + 1, valLoss(i + 1)]),
          },
        ]}
        vLines={[{ x: 6, label: '最优早停点 E=6', tone: 'emerald' }]}
        markers={[{ x: epoch, y: valLoss(epoch), label: `Val=${valLoss(epoch).toFixed(2)}`, tone: overfit ? 'rose' : 'emerald', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};
