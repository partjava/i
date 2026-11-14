'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveTimelineCanvas,
} from '../shared/VisualizerEngine';

export function ProcessManagementLevel1() {
  const [totalProcs, setTotalProcs] = useState(10);
  const [zombies, setZombies] = useState(2);

  const ratioPct = (zombies / totalProcs) * 100;
  const countAlert = zombies >= 3;
  const ratioAlert = ratioPct > 20;
  const alert = countAlert || ratioAlert;

  return (
    <VisualizerFrame
      title="僵尸进程双阈值探测器"
      subtitle="调节采样总进程数与 Z 状态僵尸进程数，验证绝对数量（≥3）或比例（>20%）告警触发条件。"
      badge="双条件异常检测"
      sliders={[
        {
          label: '总进程数 (Total)',
          value: totalProcs,
          min: 4,
          max: 25,
          step: 1,
          displayValue: `${totalProcs} 个`,
          onChange: (v) => {
            setTotalProcs(v);
            if (zombies > v) setZombies(v);
          },
        },
        {
          label: '僵尸进程数 (Z)',
          value: zombies,
          min: 0,
          max: Math.min(8, totalProcs),
          step: 1,
          displayValue: `${zombies} 个`,
          onChange: setZombies,
        },
      ]}
      metrics={[
        { label: '僵尸数量 (阈值 ≥ 3)', value: `${zombies} 个`, tone: countAlert ? 'rose' : 'cyan' },
        { label: '僵尸占比 (阈值 > 20%)', value: `${ratioPct.toFixed(1)}%`, tone: ratioAlert ? 'amber' : 'indigo' },
        { label: '系统告警状态', value: alert ? 'ALERT 触发' : 'NORMAL 正常', tone: alert ? 'rose' : 'emerald' },
      ]}
      caption={
        alert
          ? `触发告警：${countAlert ? '数量达到 3 个上限' : ''}${countAlert && ratioAlert ? '且' : ''}${ratioAlert ? `比例 ${ratioPct.toFixed(1)}% 超过 20%` : ''}。`
          : '数量与占比均在安全阈值以内，进程表健康。'
      }
    >
      <InteractiveTimelineCanvas
        maxTime={100}
        unit="%"
        thresholds={[{ value: 20, label: '比例线 20%', tone: 'amber' }]}
        lanes={[
          {
            name: '僵尸比例',
            blocks: [
              { start: 0, end: ratioPct, label: `${ratioPct.toFixed(0)}%`, tone: ratioAlert ? 'rose' : 'cyan' },
            ],
          },
          {
            name: '数量比(×10%)',
            blocks: [
              { start: 0, end: Math.min(100, (zombies / 6) * 100), label: `${zombies}/3`, tone: countAlert ? 'rose' : 'indigo' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
}

export function ProcessManagementLevel2() {
  const [niceA, setNiceA] = useState(-5);
  const weightA = Math.round(1024 * Math.pow(1.25, -niceA));
  const weightB = 1024; // nice = 0
  const deltaVruntimeA = Number(((10 * 1024) / weightA).toFixed(2));
  const deltaVruntimeB = 10.0;
  const nextPick = deltaVruntimeA <= deltaVruntimeB ? '进程 A (vruntime 增长更慢)' : '进程 B (vruntime 更小)';

  return (
    <VisualizerFrame
      title="CFS 进程优先级与 vruntime 调度器"
      subtitle="Nice 值越低，调度权重越高，相同物理时间下虚拟运行时间 (vruntime) 增长越慢，从而抢占更多 CPU。"
      badge="CFS 虚拟时钟"
      sliders={[
        {
          label: '进程 A Nice 值 (B 固定为 0)',
          value: niceA,
          min: -10,
          max: 10,
          step: 1,
          displayValue: `nice ${niceA >= 0 ? `+${niceA}` : niceA}`,
          onChange: setNiceA,
        },
      ]}
      metrics={[
        { label: 'A 权重 / B 权重', value: `${weightA} / ${weightB}`, tone: 'cyan' },
        { label: '10ms 后 Δvruntime (A)', value: `${deltaVruntimeA}`, tone: deltaVruntimeA < 10 ? 'emerald' : 'amber' },
        { label: '下一轮优先调度', value: nextPick.split(' ')[1], tone: 'indigo' },
      ]}
    >
      <InteractiveTimelineCanvas
        maxTime={35}
        unit=" vt"
        lanes={[
          {
            name: `进程 A (n=${niceA})`,
            blocks: [{ start: 0, end: Math.min(34, deltaVruntimeA), label: `+${deltaVruntimeA}`, tone: deltaVruntimeA <= 10 ? 'emerald' : 'amber' }],
          },
          {
            name: '进程 B (n=0)',
            blocks: [{ start: 0, end: deltaVruntimeB, label: `+${deltaVruntimeB}`, tone: 'cyan' }],
          },
        ]}
      />
    </VisualizerFrame>
  );
}
