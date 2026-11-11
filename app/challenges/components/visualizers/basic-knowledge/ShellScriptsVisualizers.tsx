'use client';

import { ScenarioVisualizer } from './ScenarioVisualizer';

export function ShellScriptsLevel1() {
  return (
    <ScenarioVisualizer
      title="Shell 管道失败保护器"
      description="退出码从左到右对应管道各步骤。"
      scenarios={[
        { label: "普通模式", steps: ["退出码 [2, 1, 0]", "取末尾退出码", "返回 0"] },
        { label: "启用 pipefail", steps: ["退出码 [2, 1, 0]", "从右往左找到 1", "返回 1"] },
        { label: "全成功", steps: ["退出码 [0, 0, 0]", "没有非零状态", "返回 0"] },
      ]}
    />
  );
}

export function ShellScriptsLevel2() {
  return (
    <ScenarioVisualizer
      title="日志轮转脚本模拟器"
      description="以 100 MiB 为轮转阈值，最多保留两份归档。"
      scenarios={[
        { label: "未达到阈值", steps: ["app.log 60 MiB", "继续写当前日志", "无新归档"] },
        { label: "触发轮转", steps: ["app.log 120 MiB", "归档旧日志，创建空日志", "得到 app.log.1"] },
        { label: "归档已满", steps: ["已有 .1、.2，再轮转一次", "旧 .2 淘汰，旧 .1 变 .2", "仍保留两份"] },
      ]}
    />
  );
}
