'use client';

import { ScenarioVisualizer } from './ScenarioVisualizer';

const cacheSnapshots = [
  [[], ['A']],
  [['A'], ['A', 'B']],
  [['A', 'B'], ['B', 'A']],
  [['B', 'A'], ['A', 'C']],
];

const allocationSnapshots = [
  [[8, 4, 10], [5, 4, 10]],
  [[8, 4, 10], [8, 1, 10]],
  [[3, 3], [8]],
];

export function OperatingSystemLevel1() {
  return (
    <ScenarioVisualizer
      title="内存页缓存压力模拟器"
      description="缓存容量为 2，左侧页面最久未使用。"
      renderDiagram={active => (
        <div className="space-y-3">
          {cacheSnapshots[active].map((pages, row) => (
            <div key={row} className="grid grid-cols-[4rem_1fr_1fr] items-center gap-2 text-xs">
              <span className="text-slate-400">{row === 0 ? '访问前' : '访问后'}</span>
              {[0, 1].map(slot => (
                <span key={slot} className={`rounded-lg border py-3 text-center font-mono ${pages[slot] ? 'border-cyan-800 bg-cyan-950/60 text-cyan-200' : 'border-dashed border-slate-700 text-slate-500'}`}>
                  {pages[slot] ?? '空'}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
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
      renderDiagram={active => (
        <div className="space-y-3">
          {allocationSnapshots[active].map((blocks, row) => (
            <div key={row} className="space-y-1.5 text-xs">
              <p className="text-slate-400">{row === 0 ? '操作前的空闲块' : '操作后的空闲块'}</p>
              <div className="flex gap-1">
                {blocks.map((size, index) => (
                  <span key={index} style={{ flexGrow: size, flexBasis: 0 }} className="min-w-5 rounded bg-indigo-500/30 py-2 text-center font-mono text-indigo-100">{size}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      scenarios={[
        { label: "首次适应", steps: ["空闲块大小 [8, 4, 10]", "申请 3，取第一个够大的块", "剩余 [5, 4, 10]"] },
        { label: "最佳适应", steps: ["空闲块大小 [8, 4, 10]", "申请 3，取最小够用的块", "剩余 [8, 1, 10]"] },
        { label: "释放后合并", steps: ["空闲 [0, 3) 与 [5, 8)", "释放 [3, 5)", "合并为空闲 [0, 8)"] },
      ]}
    />
  );
}
