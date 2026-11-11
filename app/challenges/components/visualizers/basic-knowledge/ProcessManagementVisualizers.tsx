'use client';

import { ScenarioVisualizer } from './ScenarioVisualizer';

export function ProcessManagementLevel1() {
  return (
    <ScenarioVisualizer
      title="进程状态异常探测器"
      description="阈值为 3 个，或比例严格超过 20%。"
      scenarios={[
        { label: "正常", steps: ["采样 10 个进程", "1 个 Z 状态，占 10%", "不告警"] },
        { label: "数量触发", steps: ["采样 20 个进程", "3 个 Z 状态，占 15%", "达到数量阈值"] },
        { label: "比例触发", steps: ["采样 5 个进程", "2 个 Z 状态，占 40%", "超过比例阈值"] },
      ]}
    />
  );
}

export function ProcessManagementLevel2() {
  return (
    <ScenarioVisualizer
      title="进程优先级调度器"
      description="比较 nice 与虚拟运行时间的作用。"
      scenarios={[
        { label: "相同用时", steps: ["进程 A nice −5，B nice +5", "A 权重更大", "A 的虚拟运行时间增长更慢"] },
        { label: "选择下一个", steps: ["A vruntime 8，B vruntime 12", "两者都可运行", "优先选择 A"] },
        { label: "状态变化", steps: ["A 进入睡眠，B 仍可运行", "只在可运行队列中选择", "选 B"] },
      ]}
    />
  );
}
