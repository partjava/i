'use client';

import { ScenarioVisualizer } from './ScenarioVisualizer';

export function FileSystemLevel1() {
  return (
    <ScenarioVisualizer
      title="小文件存储容量规划器"
      description="假定块为 4 KiB，可用 12 个块与 8 个 inode。"
      scenarios={[
        { label: "8 个小文件", steps: ["每个 1 KiB → 占 1 块", "消耗 8 块、8 inode", "inode 首先耗尽"] },
        { label: "6 个较大文件", steps: ["每个 5 KiB → 占 2 块", "消耗 12 块、6 inode", "磁盘块首先耗尽"] },
        { label: "同时用尽", steps: ["8 个文件，其中 4 个各占 2 块", "消耗 12 块、8 inode", "两项资源同时耗尽"] },
      ]}
    />
  );
}

export function FileSystemLevel2() {
  return (
    <ScenarioVisualizer
      title="磁盘配额分析器"
      description="软限制 80 MiB，硬限制 100 MiB。"
      scenarios={[
        { label: "正常", steps: ["使用 70 MiB", "低于软限制", "可继续写入"] },
        { label: "软限制", steps: ["使用 90 MiB", "已超过软限制", "发出警告"] },
        { label: "硬限制", steps: ["已用 95 MiB，申请再写 10 MiB", "预计 105 MiB", "拒绝这次写入"] },
      ]}
    />
  );
}
