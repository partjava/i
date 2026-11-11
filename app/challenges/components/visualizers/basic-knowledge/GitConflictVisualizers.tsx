'use client';

import { ScenarioVisualizer } from './ScenarioVisualizer';

export function GitConflictLevel1() {
  return (
    <ScenarioVisualizer
      title="冲突标记解析器"
      description="按标记读取两侧内容。"
      scenarios={[
        { label: "进入当前分支", steps: ["<<<<<<< HEAD", "color = blue", "收集为 ours"] },
        { label: "切换到传入分支", steps: ["=======", "color = green", "收集为 theirs"] },
        { label: "结束冲突块", steps: [">>>>>>> feature", "ours = blue，theirs = green", "计数加 1"] },
      ]}
    />
  );
}

export function GitConflictLevel2() {
  return (
    <ScenarioVisualizer
      title="合并策略选择器"
      description="按目标比较合并策略。"
      scenarios={[
        { label: "常规双分支", steps: ["两边都需要合入", "普通三方合并", "保留不冲突修改，冲突需解决"] },
        { label: "保留当前树", steps: ["需要记录合并关系并保留当前内容", "ours 策略", "合并结果的树沿用当前分支"] },
        { label: "同时合入多支", steps: ["三条分支修改互不冲突", "octopus 策略", "一次记录多个父提交"] },
      ]}
    />
  );
}
