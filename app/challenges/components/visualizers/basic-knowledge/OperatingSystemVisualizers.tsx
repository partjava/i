'use client';

import { useId } from 'react';
import { ScenarioVisualizer } from './ScenarioVisualizer';

const cacheSnapshots = [
  [[], ['A']],
  [['A'], ['A', 'B']],
  [['A', 'B'], ['B', 'A']],
  [['B', 'A'], ['A', 'C']],
];
const requests = ['A', 'B', 'A', 'C'];

function CacheDiagram({ active }: { active: number }) {
  const markerId = useId();
  const [before, after] = cacheSnapshots[active];
  const page = requests[active];
  const hit = before.includes(page);
  const evicted = before.find(value => !after.includes(value));
  const slotX = (index: number) => 102 + index * 124;
  const destination = slotX(after.indexOf(page));
  const source = hit ? slotX(before.indexOf(page)) : 344;
  const sourceY = hit ? 88 : 135;
  const color = hit ? '#67e8f9' : '#c4b5fd';
  return (
    <figure aria-live="polite">
      <svg viewBox="0 0 392 245" className="w-full" role="img" aria-label={`读取 ${page}，${hit ? '命中' : '缺页'}，${evicted ? `淘汰 ${evicted}，` : ''}缓存变为 ${after.join('、')}`}>
        <defs>
          <marker id={markerId} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0 0 L7 3.5 L0 7 Z" fill={color} />
          </marker>
        </defs>
        <text x="102" y="23" textAnchor="middle" fill="#94a3b8" fontSize="13">最久未使用</text>
        <text x="226" y="23" textAnchor="middle" fill="#94a3b8" fontSize="13">最近使用</text>
        <path d="M102 32 H226" stroke="#334155" />
        {[before, after].map((pages, row) => (
          <g key={row} transform={`translate(0 ${row * 118})`}>
            <text x="10" y="70" fill="#94a3b8" fontSize="12">{row === 0 ? '之前' : '之后'}</text>
            {[0, 1].map(index => {
              const value = pages[index];
              const highlighted = value === page;
              const removed = row === 0 && evicted && value === evicted;
              return (
                <g key={index}>
                  <rect x={slotX(index) - 46} y="47" width="92" height="41" rx="8" fill={highlighted ? '#164e63' : removed ? '#4c0519' : '#0f172a'} stroke={highlighted ? color : removed ? '#fb7185' : '#334155'} strokeDasharray={value ? undefined : '4 4'} />
                  <text x={slotX(index)} y="73" textAnchor="middle" fill={value ? '#e2e8f0' : '#64748b'} fontSize="15">{value ?? '空'}</text>
                </g>
              );
            })}
          </g>
        ))}
        <rect x="300" y="96" width="88" height="38" rx="8" fill="#1e1b4b" stroke={color} />
        <text x="344" y="120" textAnchor="middle" fill={color} fontSize="13">读取 {page}</text>
        <path d={`M${source} ${sourceY} C${source} 151 ${destination} 115 ${destination} 163`} fill="none" stroke={color} strokeWidth="2" markerEnd={`url(#${markerId})`} />
        {evicted && <text x="102" y="111" textAnchor="middle" fill="#fda4af" fontSize="12">{evicted} 被淘汰</text>}
        <text x="164" y="231" textAnchor="middle" fill={color} fontSize="13">{hit ? '命中 · 移到最近使用端' : '缺页 · 装入请求页'}</text>
      </svg>
    </figure>
  );
}

const freeBlocks = [{ start: 0, size: 8 }, { start: 10, size: 4 }, { start: 16, size: 10 }];
const allocationScenes = [
  { before: freeBlocks, after: [{ start: 3, size: 5 }, ...freeBlocks.slice(1)], changed: { start: 0, size: 3 }, label: '从第一块空闲区分配 3 个单位' },
  { before: freeBlocks, after: [freeBlocks[0], { start: 13, size: 1 }, freeBlocks[2]], changed: { start: 10, size: 3 }, label: '从最小的可用空闲区分配 3 个单位' },
  { before: [{ start: 0, size: 3 }, { start: 5, size: 3 }], after: [{ start: 0, size: 8 }], changed: { start: 3, size: 2 }, label: '释放中间 2 个单位，合并成一块' },
];

function AllocationDiagram({ active }: { active: number }) {
  const { before, after, changed, label } = allocationScenes[active];
  const release = active === 2;
  const extent = release ? 8 : 26;
  const x = (address: number) => 62 + address * 300 / extent;
  return (
    <figure aria-live="polite">
      <svg viewBox="0 0 384 142" className="w-full" role="img" aria-label={label}>
        {[before, after].map((blocks, row) => (
          <g key={row} transform={`translate(0 ${row * 55})`}>
            <text x="8" y="41" fill="#cbd5e1" fontSize="13">{row === 0 ? '操作前' : '操作后'}</text>
            <rect x="62" y="20" width="300" height="32" rx="4" fill="#334155" />
            {blocks.map(({ start, size }) => (
              <g key={start}>
                <rect x={x(start)} y="20" width={x(size) - x(0)} height="32" fill="#164e63" stroke="#22d3ee" />
                {size > 1 && <text x={x(start + size / 2)} y="41" textAnchor="middle" fill="#cffafe" fontSize="13">{size}</text>}
              </g>
            ))}
            {row === (release ? 0 : 1) && (
              <rect x={x(changed.start)} y="20" width={x(changed.size) - x(0)} height="32" fill="#7c3aed" stroke="#c4b5fd" />
            )}
          </g>
        ))}
        <text x="62" y="126" fill="#94a3b8" fontSize="12">0</text>
        <text x="362" y="126" textAnchor="end" fill="#94a3b8" fontSize="12">{extent}</text>
      </svg>
      <figcaption className="text-xs leading-relaxed text-slate-300">
        {label}。<span className="text-cyan-300">青色为空闲</span>，<span className="text-violet-300">紫色标出{release ? '释放' : '新分配'}的区间</span>。
      </figcaption>
    </figure>
  );
}

export function OperatingSystemLevel1() {
  return (
    <ScenarioVisualizer
      title="内存页缓存压力模拟器"
      description="缓存容量为 2，左侧页面最久未使用。"
      diagramOnly
      renderDiagram={active => <CacheDiagram active={active} />}
      scenarios={[
        { label: "读 A", steps: ["空缓存", "装入 A", "缺页，缓存 [A]"] },
        { label: "读 B", steps: ["[A]", "装入 B", "缺页，缓存 [A, B]"] },
        { label: "再读 A", steps: ["[A, B]", "A 变为最近使用", "命中，缓存 [B, A]"] },
        { label: "读 C", steps: ["[B, A]", "淘汰 B", "缺页，缓存 [A, C]"] },
      ]}
    />
  );
}

export function OperatingSystemLevel2() {
  return (
    <ScenarioVisualizer
      title="内存分配器模拟"
      description="同一组空闲块对比不同分配策略。"
      diagramOnly
      renderDiagram={active => <AllocationDiagram active={active} />}
      scenarios={[
        { label: "首次适应", steps: ["空闲块大小 [8, 4, 10]", "申请 3，取第一个够大的块", "剩余 [5, 4, 10]"] },
        { label: "最佳适应", steps: ["空闲块大小 [8, 4, 10]", "申请 3，取最小够用的块", "剩余 [8, 1, 10]"] },
        { label: "释放后合并", steps: ["空闲 [0, 3) 与 [5, 8)", "释放 [3, 5)", "合并为空闲 [0, 8)"] },
      ]}
    />
  );
}
