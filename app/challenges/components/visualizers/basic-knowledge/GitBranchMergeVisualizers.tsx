'use client';

import { ScenarioVisualizer } from './ScenarioVisualizer';

export function GitBranchMergeLevel1() {
  return (
    <ScenarioVisualizer
      title="分支合并冲突风险评估器"
      description="同文件且行范围重叠时标记高风险。"
      scenarios={[
        { label: "不同文件", steps: ["A 改 parser.ts 10–20", "B 改 reader.ts 15–25", "无同文件重叠"] },
        { label: "同文件不同区间", steps: ["A 改 parser.ts 10–20", "B 改 parser.ts 21–25", "区间不重叠"] },
        { label: "同文件重叠", steps: ["A 改 parser.ts 10–20", "B 改 parser.ts 15–25", "重叠 15–20，高风险"] },
      ]}
    />
  );
}

export function GitBranchMergeLevel2() {
  return (
    <ScenarioVisualizer
      title="合并冲突自动解决器"
      description="对比两侧相对于共同基底的修改。"
      scenarios={[
        { label: "修改不同区域", steps: ["基底：标题 A，正文 B", "左改标题 A′，右改正文 B′", "合并得到 A′ 和 B′"] },
        { label: "修改结果相同", steps: ["基底：颜色 blue", "两侧均改为 green", "采用共同结果 green"] },
        { label: "修改互相冲突", steps: ["基底：颜色 blue", "左改 green，右改 purple", "保留冲突待选择"] },
      ]}
    />
  );
}
