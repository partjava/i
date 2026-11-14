'use client';

import React, { useState, useId } from 'react';
import { motion } from 'framer-motion';
import { VisualizerFrame } from '../shared/VisualizerEngine';

const cacheSnapshots = [
  { pages: [] as string[], next: ['A'], req: 'A', hit: false, evicted: null as string | null },
  { pages: ['A'], next: ['A', 'B'], req: 'B', hit: false, evicted: null },
  { pages: ['A', 'B'], next: ['B', 'A'], req: 'A', hit: true, evicted: null },
  { pages: ['B', 'A'], next: ['A', 'C'], req: 'C', hit: false, evicted: 'B' },
];

export function OperatingSystemLevel1() {
  const [step, setStep] = useState(0);
  const markerId = useId();
  const snap = cacheSnapshots[step];
  const color = snap.hit ? '#34d399' : '#22d3ee';
  const slotX = (index: number) => 102 + index * 124;
  const dest = slotX(snap.next.indexOf(snap.req));
  const src = snap.hit ? slotX(snap.pages.indexOf(snap.req)) : 344;
  const srcY = snap.hit ? 88 : 135;

  const hitsSoFar = cacheSnapshots.slice(0, step + 1).filter((s) => s.hit).length;
  const missesSoFar = step + 1 - hitsSoFar;

  return (
    <VisualizerFrame
      title="内存页缓存压力模拟器 (LRU)"
      subtitle="缓存容量为 2，左侧槽位最久未使用（LRU），右侧最近使用（MRU）。"
      badge="LRU 槽位状态"
      scenarios={[
        { label: 't1: 读 A', summary: '缓存为空，装入页面 A（缺页）。' },
        { label: 't2: 读 B', summary: '缓存未满，将页面 B 放入 MRU 端（缺页）。' },
        { label: 't3: 再读 A', summary: '页面 A 命中！从 LRU 端提升至 MRU 端。' },
        { label: 't4: 读 C', summary: '缓存已满，淘汰最久未使用的 B，装入 C（缺页）。' },
      ]}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: '当前请求', value: `Page ${snap.req}`, tone: 'cyan' },
        { label: '本次判定', value: snap.hit ? 'CACHE HIT' : 'PAGE FAULT', tone: snap.hit ? 'emerald' : 'amber' },
        { label: '累计命中率', value: `${((hitsSoFar / (step + 1)) * 100).toFixed(1)}% (${hitsSoFar}/${hitsSoFar + missesSoFar})`, tone: 'indigo' },
      ]}
    >
      <svg viewBox="0 0 392 232" className="w-full h-auto select-none" role="img" aria-label="LRU 页面缓存槽位状态">
        <defs>
          <marker id={markerId} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0 0 L7 3.5 L0 7 Z" fill={color} />
          </marker>
        </defs>
        <text x="102" y="22" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">最久未使用 (LRU)</text>
        <text x="226" y="22" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">最近使用 (MRU)</text>
        <path d="M102 30 H226" stroke="#334155" strokeDasharray="3 3" />

        {[snap.pages, snap.next].map((pages, row) => (
          <g key={row} transform={`translate(0 ${row * 110})`}>
            <text x="10" y="68" fill="#94a3b8" fontSize="11">{row === 0 ? '之前' : '之后'}</text>
            {[0, 1].map((index) => {
              const value = pages[index];
              const highlighted = value === snap.req;
              const removed = row === 0 && snap.evicted && value === snap.evicted;
              return (
                <g key={index}>
                  <motion.rect
                    x={slotX(index) - 46}
                    y="46"
                    width="92"
                    height="40"
                    rx="8"
                    animate={{
                      fill: highlighted ? 'rgba(34,211,238,0.18)' : removed ? 'rgba(251,113,133,0.18)' : '#090f1f',
                      stroke: highlighted ? color : removed ? '#fb7185' : '#334155',
                    }}
                    strokeWidth={1.6}
                    strokeDasharray={value ? undefined : '4 4'}
                  />
                  <text x={slotX(index)} y="71" textAnchor="middle" fill={value ? '#f8fafc' : '#64748b'} fontSize="14" fontFamily="monospace" fontWeight="700">
                    {value ?? '空槽'}
                  </text>
                </g>
              );
            })}
          </g>
        ))}

        <rect x="300" y="92" width="86" height="36" rx="8" fill="rgba(129,140,248,0.18)" stroke={color} strokeWidth={1.5} />
        <text x="343" y="114" textAnchor="middle" fill={color} fontSize="12" fontFamily="monospace">读取 {snap.req}</text>
        <motion.path
          d={`M${src} ${srcY} C${src} 145 ${dest} 112 ${dest} 154`}
          animate={{ d: `M${src} ${srcY} C${src} 145 ${dest} 112 ${dest} 154` }}
          transition={{ duration: 0.3 }}
          fill="none"
          stroke={color}
          strokeWidth="2"
          markerEnd={`url(#${markerId})`}
        />
        {snap.evicted && <text x="102" y="106" textAnchor="middle" fill="#fb7185" fontSize="11" fontFamily="monospace">淘汰 {snap.evicted}</text>}
      </svg>
    </VisualizerFrame>
  );
}

const freeBlocks = [
  { start: 0, size: 8 },
  { start: 10, size: 4 },
  { start: 16, size: 10 },
];

const allocationScenes = [
  {
    label: '首次适应 (First-Fit)',
    before: freeBlocks,
    after: [{ start: 3, size: 5 }, ...freeBlocks.slice(1)],
    changed: { start: 0, size: 3 },
    desc: '按地址顺序找到第一块足够大的空闲区 [0,8)，切出 [0,3)。',
    frag: '3 块碎片',
  },
  {
    label: '最佳适应 (Best-Fit)',
    before: freeBlocks,
    after: [freeBlocks[0], { start: 13, size: 1 }, freeBlocks[2]],
    changed: { start: 10, size: 3 },
    desc: '遍历全部空闲块，选择容量最贴近需求 3 的块 [10,14)，留下 1 单位小碎片。',
    frag: '3 块（含极小碎片）',
  },
  {
    label: '释放与相邻合并',
    before: [{ start: 0, size: 3 }, { start: 5, size: 3 }],
    after: [{ start: 0, size: 8 }],
    changed: { start: 3, size: 2 },
    desc: '释放中间已占用的 [3,5) 区间，与左右相邻空闲块合并为连续 [0,8)。',
    frag: '1 块连续区',
  },
];

export function OperatingSystemLevel2() {
  const [active, setActive] = useState(0);
  const scene = allocationScenes[active];
  const release = active === 2;
  const extent = release ? 8 : 26;
  const x = (address: number) => 66 + (address * 308) / extent;

  return (
    <VisualizerFrame
      title="内存分配器与碎片合并模拟"
      subtitle="对比首次适应、最佳适应分配策略与释放时的相邻空闲块合并过程。"
      badge="物理地址区间"
      scenarios={allocationScenes.map((s) => ({ label: s.label, summary: s.desc }))}
      activeScenario={active}
      onScenarioChange={setActive}
      metrics={[
        { label: '策略/操作', value: scene.label.split(' ')[0], tone: 'cyan' },
        { label: '目标区间', value: `[${scene.changed.start}, ${scene.changed.start + scene.changed.size})`, tone: 'indigo' },
        { label: '空闲块数量', value: scene.frag, tone: 'emerald' },
      ]}
    >
      <svg viewBox="0 0 390 132" className="w-full h-auto select-none" role="img" aria-label={scene.desc}>
        {[scene.before, scene.after].map((blocks, row) => (
          <g key={row} transform={`translate(0 ${row * 50})`}>
            <text x="10" y="38" fill="#cbd5e1" fontSize="11">{row === 0 ? '操作前' : '操作后'}</text>
            <rect x="66" y="18" width="308" height="30" rx="5" fill="#0f172a" stroke="#334155" />
            {blocks.map(({ start, size }) => (
              <g key={start}>
                <motion.rect
                  x={x(start)}
                  y="18"
                  width={x(size) - x(0)}
                  height="30"
                  rx="3"
                  animate={{ x: x(start), width: x(size) - x(0) }}
                  fill="rgba(34, 211, 238, 0.2)"
                  stroke="#22d3ee"
                  strokeWidth={1.4}
                />
                {size > 0 && (
                  <text x={x(start + size / 2)} y="37" textAnchor="middle" fill="#cffafe" fontSize="11" fontFamily="monospace">
                    {size}
                  </text>
                )}
              </g>
            ))}
            {row === (release ? 0 : 1) && (
              <motion.rect
                x={x(scene.changed.start)}
                y="18"
                width={x(scene.changed.size) - x(0)}
                height="30"
                rx="3"
                animate={{ x: x(scene.changed.start), width: x(scene.changed.size) - x(0) }}
                fill="rgba(129, 140, 248, 0.35)"
                stroke="#818cf8"
                strokeWidth={1.6}
              />
            )}
          </g>
        ))}
        <text x="66" y="118" fill="#64748b" fontSize="10" fontFamily="monospace">Addr 0</text>
        <text x="374" y="118" textAnchor="end" fill="#64748b" fontSize="10" fontFamily="monospace">Addr {extent}</text>
      </svg>
    </VisualizerFrame>
  );
}
