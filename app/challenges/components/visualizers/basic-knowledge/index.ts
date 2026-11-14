import { createStageLookup, type VisualizerEntry } from '../shared/VisualizerEngine';
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

const ENTRIES: VisualizerEntry[] = [
  { subtopic: '计算机组成原理', levelIndex: 1, levelTitle: '流水线性能瓶颈分析器', component: ComputerArchitectureLevel1 },
  { subtopic: '计算机组成原理', levelIndex: 2, levelTitle: '缓存命中率分析器', component: ComputerArchitectureLevel2 },
  { subtopic: '操作系统', levelIndex: 1, levelTitle: '内存页缓存压力模拟器', component: OperatingSystemLevel1 },
  { subtopic: '操作系统', levelIndex: 2, levelTitle: '内存分配器模拟', component: OperatingSystemLevel2 },
  { subtopic: '计算机网络', levelIndex: 1, levelTitle: '路由表最长前缀匹配引擎', component: ComputerNetworkLevel1 },
  { subtopic: '计算机网络', levelIndex: 2, levelTitle: '子网划分计算器', component: ComputerNetworkLevel2 },
  { subtopic: '编码系统', levelIndex: 1, levelTitle: '日志编码异常探测器', component: EncodingLevel1 },
  { subtopic: '编码系统', levelIndex: 2, levelTitle: 'Base64 编码解码器', component: EncodingLevel2 },
  { subtopic: '常用命令', levelIndex: 1, levelTitle: '安全批处理命令生成器', component: LinuxCommandsLevel1 },
  { subtopic: '常用命令', levelIndex: 2, levelTitle: '批量文件搜索工具', component: LinuxCommandsLevel2 },
  { subtopic: '文件系统', levelIndex: 1, levelTitle: '小文件存储容量规划器', component: FileSystemLevel1 },
  { subtopic: '文件系统', levelIndex: 2, levelTitle: '磁盘配额分析器', component: FileSystemLevel2 },
  { subtopic: '权限管理', levelIndex: 1, levelTitle: '权限策略审计器', component: PermissionsLevel1 },
  { subtopic: '权限管理', levelIndex: 2, levelTitle: 'sudo 权限审计器', component: PermissionsLevel2 },
  { subtopic: '进程管理', levelIndex: 1, levelTitle: '进程状态异常探测器', component: ProcessManagementLevel1 },
  { subtopic: '进程管理', levelIndex: 2, levelTitle: '进程优先级调度器', component: ProcessManagementLevel2 },
  { subtopic: 'Shell脚本', levelIndex: 1, levelTitle: 'Shell 管道失败保护器', component: ShellScriptsLevel1 },
  { subtopic: 'Shell脚本', levelIndex: 2, levelTitle: '日志轮转脚本模拟器', component: ShellScriptsLevel2 },
  { subtopic: 'init/clone', levelIndex: 1, levelTitle: '仓库初始化健康检查器', component: GitInitCloneLevel1 },
  { subtopic: 'init/clone', levelIndex: 2, levelTitle: '分支清理工具', component: GitInitCloneLevel2 },
  { subtopic: 'add/commit/push', levelIndex: 1, levelTitle: '提交批次规划器', component: GitCommitPushLevel1 },
  { subtopic: 'add/commit/push', levelIndex: 2, levelTitle: '提交压缩整理器', component: GitCommitPushLevel2 },
  { subtopic: 'branch/merge', levelIndex: 1, levelTitle: '分支合并冲突风险评估器', component: GitBranchMergeLevel1 },
  { subtopic: 'branch/merge', levelIndex: 2, levelTitle: '合并冲突自动解决器', component: GitBranchMergeLevel2 },
  { subtopic: 'rebase', levelIndex: 1, levelTitle: '提交历史重放模拟器', component: GitRebaseLevel1 },
  { subtopic: 'rebase', levelIndex: 2, levelTitle: 'Rebase 冲突预测器', component: GitRebaseLevel2 },
  { subtopic: 'conflict解决', levelIndex: 1, levelTitle: '冲突标记解析器', component: GitConflictLevel1 },
  { subtopic: 'conflict解决', levelIndex: 2, levelTitle: '合并策略选择器', component: GitConflictLevel2 },
];

export const findBasicKnowledgeVisualizer = createStageLookup(ENTRIES);
