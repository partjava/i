'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveTimelineCanvas,
  InteractiveMatrixCanvas,
  type MatrixCell,
} from '../shared/VisualizerEngine';

export function ComputerArchitectureLevel1() {
  const [stallPerLoad, setStallPerLoad] = useState(2.0);
  const [freqGhz, setFreqGhz] = useState(2.0);

  const loadBase = 1000 * 1.0;
  const loadStall = 1000 * stallPerLoad;
  const aluBase = 3000 * 1.0;
  const aluStall = 3000 * 0.1;
  const totalCycles = loadBase + loadStall + aluBase + aluStall;
  const timeMs = (totalCycles / (freqGhz * 1e9)) * 1000;
  const bottleneck = loadStall >= aluStall ? 'load' : 'alu';

  return (
    <VisualizerFrame
      title="流水线性能瓶颈分析器"
      subtitle="调节 Load 停顿周期与主频，观察总执行周期与瓶颈指令类型变化。"
      badge="流水线瀑布"
      sliders={[
        {
          label: 'Load 平均停顿 (stall)',
          value: stallPerLoad,
          min: 0,
          max: 5,
          step: 0.2,
          displayValue: `${stallPerLoad.toFixed(1)} cycles`,
          onChange: setStallPerLoad,
        },
        {
          label: 'CPU 主频 (Frequency)',
          value: freqGhz,
          min: 1.0,
          max: 4.5,
          step: 0.5,
          displayValue: `${freqGhz.toFixed(1)} GHz`,
          onChange: setFreqGhz,
        },
      ]}
      metrics={[
        { label: '总周期 Cycles', value: `${Math.round(totalCycles)}`, tone: 'cyan' },
        { label: '执行耗时', value: `${timeMs.toFixed(6)} ms`, tone: 'indigo' },
        {
          label: '最大停顿瓶颈',
          value: bottleneck,
          tone: bottleneck === 'load' ? 'amber' : 'emerald',
        },
      ]}
      caption={`Load 停顿总计 ${Math.round(loadStall)} 周期 vs ALU 停顿 ${Math.round(aluStall)} 周期；主频翻倍可缩短物理耗时，但无法降低 CPI 停顿比例。`}
    >
      <InteractiveTimelineCanvas
        maxTime={Math.max(4000, Math.round(loadBase + loadStall))}
        unit=" cyc"
        lanes={[
          {
            name: 'Load (×1000)',
            blocks: [
              { start: 0, end: loadBase, label: `基础 ${loadBase}`, tone: 'cyan' },
              ...(loadStall > 0
                ? [{ start: loadBase, end: loadBase + loadStall, label: `停顿 ${Math.round(loadStall)}`, tone: 'amber' as const }]
                : []),
            ],
          },
          {
            name: 'ALU (×3000)',
            blocks: [
              { start: 0, end: aluBase, label: `基础 ${aluBase}`, tone: 'indigo' },
              { start: aluBase, end: aluBase + aluStall, label: `停顿 ${Math.round(aluStall)}`, tone: 'rose' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
}

export function ComputerArchitectureLevel2() {
  const [mode, setMode] = useState(0);
  const seq = mode === 0 ? [0, 1, 2, 3] : [0, 4, 8, 12];
  const blockSize = 4;
  const hits = seq.filter((addr, idx) => idx > 0 && Math.floor(addr / blockSize) === Math.floor(seq[0] / blockSize)).length;
  const hitRate = hits / seq.length;

  const addrCells: MatrixCell[][] = [
    seq.map((addr) => ({ value: `0x${addr.toString(16).toUpperCase()}`, highlight: 'cyan' })),
  ];
  const blockCells: MatrixCell[][] = [
    seq.map((addr) => ({
      value: `B${Math.floor(addr / blockSize)}`,
      highlight: Math.floor(addr / blockSize) === 0 ? 'indigo' : 'amber',
    })),
  ];
  const statusCells: MatrixCell[][] = [
    seq.map((addr, i) => {
      const isHit = i > 0 && Math.floor(addr / blockSize) === 0 && mode === 0;
      return {
        value: isHit ? 'HIT' : 'MISS',
        highlight: isHit ? 'emerald' : 'rose',
      };
    }),
  ];

  return (
    <VisualizerFrame
      title="缓存命中率分析器"
      subtitle="块大小 Block = 4 字节，对比空间局部性访问与跨步跳跃访问的缓存行命中。"
      badge="缓存行矩阵"
      scenarios={[
        { label: '顺序步长 +1 (局部性优)', summary: '地址 0, 1, 2, 3 同属缓存块 B0，首次冷缺页后连续命中 3 次。' },
        { label: '跨步 +4 (缓存抖动)', summary: '每次跨步跨越 4 字节边界，4 次访问落在 4 个不同缓存块，全部 MISS。' },
      ]}
      activeScenario={mode}
      onScenarioChange={setMode}
      metrics={[
        { label: '命中次数 Hits', value: `${hits}`, tone: 'emerald' },
        { label: '缺页次数 Misses', value: `${seq.length - hits}`, tone: 'rose' },
        { label: '命中率 Hit Rate', value: `${(hitRate * 100).toFixed(0)}%`, tone: 'cyan' },
      ]}
    >
      <InteractiveMatrixCanvas
        left={{ title: '内存请求地址', rows: addrCells, colLabels: ['t1', 't2', 't3', 't4'] }}
        operatorLabel="÷ 4"
        middle={{ title: '映射缓存块号', rows: blockCells, colLabels: ['B?', 'B?', 'B?', 'B?'] }}
        right={{ title: '缓存判定', rows: statusCells, colLabels: ['结果', '结果', '结果', '结果'] }}
      />
    </VisualizerFrame>
  );
}
