'use client';

import { ScenarioVisualizer } from './ScenarioVisualizer';

export function LinuxCommandsLevel1() {
  return (
    <ScenarioVisualizer
      title="安全批处理命令生成器"
      description="查看参数数组如何保留文件名边界。"
      scenarios={[
        { label: "普通文件", steps: ["关键词 ERROR", "文件 app.log", "[grep, -e, ERROR, --, app.log]"] },
        { label: "含空格", steps: ["关键词 ERROR", "文件 app one.log", "app one.log 仍是一个参数"] },
        { label: "像选项的名称", steps: ["关键词 ERROR", "文件 -notes.log", "-- 后按文件名处理"] },
      ]}
    />
  );
}

export function LinuxCommandsLevel2() {
  return (
    <ScenarioVisualizer
      title="批量文件搜索工具"
      description="分别查看文件名过滤与内容匹配。"
      scenarios={[
        { label: "找日志", steps: ["文件 app.log、notes.txt、db.log", "模式 *.log", "app.log、db.log"] },
        { label: "搜 ERROR", steps: ["app.log 含 ERROR，db.log 含 INFO", "先筛 *.log，再搜内容", "仅 app.log"] },
        { label: "无结果", steps: ["在 *.log 内搜 DEBUG", "没有内容匹配", "返回空列表"] },
      ]}
    />
  );
}
