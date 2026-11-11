'use client';

import { Flow, Lanes } from './ConceptDiagram';
import { ScenarioVisualizer } from './ScenarioVisualizer';

export function GitCommitPushLevel1() {
  return (
    <ScenarioVisualizer
      title="提交批次规划器"
      description="按文件角色把变更分到对应提交。"
      diagramOnly
      renderDiagram={active => <Flow nodes={[["src/parser.test.ts", "docs/setup.md", "package.json", "src/parser.ts"][active], "分类规则", [["test", "docs", "config", "code"][active], "violet"]]} />}
      scenarios={[
        { label: "测试", steps: ["src/parser.test.ts", "识别 .test 文件", "test 批次"] },
        { label: "文档", steps: ["docs/setup.md", "识别文档路径或扩展名", "docs 批次"] },
        { label: "配置", steps: ["package.json", "识别项目配置", "config 批次"] },
        { label: "功能", steps: ["src/parser.ts", "未匹配其他规则", "code 批次"] },
      ]}
    />
  );
}

export function GitCommitPushLevel2() {
  return (
    <ScenarioVisualizer
      title="提交压缩整理器"
      description="观察压缩相邻提交前后的历史。"
      diagramOnly
      renderDiagram={active => <Lanes rows={[["原历史", "A", ["B", "violet"], ["C", "violet"], "D"], ["整理后", "A", ...(active === 0 ? ["B", "C", "D"] : [["BC", "violet"] as [string, "violet"], "D′"])]]} />}
      scenarios={[
        { label: "原始", steps: ["A 初始化", "B 添加解析器 → C 修正解析器", "D 更新文档"] },
        { label: "选择 B、C", steps: ["保留 A", "把 B 与 C 的变更合在一个新提交 BC", "保留 D 的文档变更"] },
        { label: "整理后", steps: ["A 初始化", "BC 完整解析器", "D′ 更新文档，父提交变了"] },
      ]}
    />
  );
}
