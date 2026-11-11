'use client';

import { ScenarioVisualizer } from './ScenarioVisualizer';

export function ComputerArchitectureLevel1() {
  return (
    <ScenarioVisualizer
      title="流水线性能瓶颈分析器"
      description="观察额外停顿如何改变瓶颈。"
      scenarios={[
        { label: "顺序执行", steps: ["整数 100 条 × 1 周期", "加载 50 条 × 1 周期", "150 周期"] },
        { label: "缓存未命中", steps: ["整数 100 周期", "加载 50 + 80 停顿", "230 周期，加载贡献最多停顿"] },
        { label: "提高频率", steps: ["总周期仍为 230", "频率 2 GHz", "耗时 115 ns"] },
      ]}
    />
  );
}

export function ComputerArchitectureLevel2() {
  return (
    <ScenarioVisualizer
      title="缓存命中率分析器"
      description="比较单条缓存行上的访问。"
      scenarios={[
        { label: "顺序访问", steps: ["地址 0 → 1 → 2 → 3", "块大小 4，均属块 0", "1 次未命中，3 次命中"] },
        { label: "跨块访问", steps: ["地址 0 → 4 → 8 → 12", "映射块 0 → 1 → 2 → 3", "4 次未命中，0 次命中"] },
      ]}
    />
  );
}
