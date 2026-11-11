'use client';

import { ScenarioVisualizer } from './ScenarioVisualizer';

export function GitInitCloneLevel1() {
  return (
    <ScenarioVisualizer
      title="仓库初始化健康检查器"
      description="检查仓库能否参与团队协作。"
      scenarios={[
        { label: "正常", steps: ["有 .git 和 origin", "默认分支 main，HEAD 在分支", "通过"] },
        { label: "缺少远端", steps: ["有 .git，默认分支 main", "没有 origin", "报告缺少远端"] },
        { label: "游离 HEAD", steps: ["有 .git 和 origin", "HEAD 指向提交而非分支", "报告 detached HEAD"] },
      ]}
    />
  );
}

export function GitInitCloneLevel2() {
  return (
    <ScenarioVisualizer
      title="分支清理工具"
      description="先比较是否合并，再看是否受保护。"
      scenarios={[
        { label: "已合并", steps: ["feature-old 已进入 main", "普通分支", "可列为清理候选"] },
        { label: "未合并", steps: ["feature-new 有独有提交", "普通分支", "保留待审核"] },
        { label: "受保护", steps: ["main 已合并", "默认分支", "保留"] },
      ]}
    />
  );
}
