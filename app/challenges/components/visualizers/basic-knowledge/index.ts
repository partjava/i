import type { ComponentType } from 'react';
import { ComputerArchitectureLevel1, ComputerArchitectureLevel2 } from './ComputerArchitectureVisualizers';
import { OperatingSystemLevel1, OperatingSystemLevel2 } from './OperatingSystemVisualizers';
import { ComputerNetworkLevel1, ComputerNetworkLevel2 } from './ComputerNetworkVisualizers';
import { EncodingLevel1, EncodingLevel2 } from './EncodingVisualizers';
import { LinuxCommandsLevel1, LinuxCommandsLevel2 } from './LinuxCommandsVisualizers';
import { FileSystemLevel1, FileSystemLevel2 } from './FileSystemVisualizers';
import { PermissionsLevel1, PermissionsLevel2 } from './PermissionsVisualizers';
import { ProcessManagementLevel1, ProcessManagementLevel2 } from './ProcessManagementVisualizers';
import { ShellScriptsLevel1, ShellScriptsLevel2 } from './ShellScriptsVisualizers';
import { GitInitCloneLevel1, GitInitCloneLevel2 } from './GitInitCloneVisualizers';
import { GitCommitPushLevel1, GitCommitPushLevel2 } from './GitCommitPushVisualizers';
import { GitBranchMergeLevel1, GitBranchMergeLevel2 } from './GitBranchMergeVisualizers';
import { GitRebaseLevel1, GitRebaseLevel2 } from './GitRebaseVisualizers';
import { GitConflictLevel1, GitConflictLevel2 } from './GitConflictVisualizers';

const visualizers: [string, string, ComponentType][] = [
  ["计算机组成原理", "流水线性能瓶颈分析器", ComputerArchitectureLevel1],
  ["计算机组成原理", "缓存命中率分析器", ComputerArchitectureLevel2],
  ["操作系统", "内存页缓存压力模拟器", OperatingSystemLevel1],
  ["操作系统", "内存分配器模拟", OperatingSystemLevel2],
  ["计算机网络", "路由表最长前缀匹配引擎", ComputerNetworkLevel1],
  ["计算机网络", "子网划分计算器", ComputerNetworkLevel2],
  ["编码系统", "日志编码异常探测器", EncodingLevel1],
  ["编码系统", "Base64 编码解码器", EncodingLevel2],
  ["常用命令", "安全批处理命令生成器", LinuxCommandsLevel1],
  ["常用命令", "批量文件搜索工具", LinuxCommandsLevel2],
  ["文件系统", "小文件存储容量规划器", FileSystemLevel1],
  ["文件系统", "磁盘配额分析器", FileSystemLevel2],
  ["权限管理", "权限策略审计器", PermissionsLevel1],
  ["权限管理", "sudo 权限审计器", PermissionsLevel2],
  ["进程管理", "进程状态异常探测器", ProcessManagementLevel1],
  ["进程管理", "进程优先级调度器", ProcessManagementLevel2],
  ["Shell脚本", "Shell 管道失败保护器", ShellScriptsLevel1],
  ["Shell脚本", "日志轮转脚本模拟器", ShellScriptsLevel2],
  ["init/clone", "仓库初始化健康检查器", GitInitCloneLevel1],
  ["init/clone", "分支清理工具", GitInitCloneLevel2],
  ["add/commit/push", "提交批次规划器", GitCommitPushLevel1],
  ["add/commit/push", "提交压缩整理器", GitCommitPushLevel2],
  ["branch/merge", "分支合并冲突风险评估器", GitBranchMergeLevel1],
  ["branch/merge", "合并冲突自动解决器", GitBranchMergeLevel2],
  ["rebase", "提交历史重放模拟器", GitRebaseLevel1],
  ["rebase", "Rebase 冲突预测器", GitRebaseLevel2],
  ["conflict解决", "冲突标记解析器", GitConflictLevel1],
  ["conflict解决", "合并策略选择器", GitConflictLevel2],
];

export function findBasicKnowledgeVisualizer(chapter: string, title?: string) {
  return visualizers.find(([name, level]) => name === chapter && level === title)?.[2];
}
