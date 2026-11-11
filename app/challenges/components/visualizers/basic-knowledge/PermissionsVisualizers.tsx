'use client';

import { Flow, Lanes } from './ConceptDiagram';
import { ScenarioVisualizer } from './ScenarioVisualizer';

export function PermissionsLevel1() {
  return (
    <ScenarioVisualizer
      title="权限策略审计器"
      description="对照 owner、group、others 三组权限。"
      diagramOnly
      renderDiagram={active => <Lanes rows={["owner", "group", "others"].map((label, index) => { const bits = [[6, 4, 4], [6, 6, 4], [7, 5, 7]][active][index]; return [label, ...[["r", 4], ["w", 2], ["x", 1]].map(([flag, mask]): [string, "cyan" | "amber" | "muted"] => [String(flag), bits & Number(mask) ? flag === "w" && ((active === 1 && index === 1) || (active === 2 && index === 2)) ? "amber" : "cyan" : "muted"])]; })} />}
      scenarios={[
        { label: "配置 644", steps: ["owner rw-，group r--，others r--", "组与其他用户不可写", "通过"] },
        { label: "配置 664", steps: ["owner rw-，group rw-，others r--", "group 有写权限", "违反配置策略"] },
        { label: "脚本 757", steps: ["owner rwx，group r-x，others rwx", "others 有写权限", "违反脚本策略"] },
      ]}
    />
  );
}

export function PermissionsLevel2() {
  return (
    <ScenarioVisualizer
      title="sudo 权限审计器"
      description="对比授权范围，识别需要审计的条目。"
      diagramOnly
      renderDiagram={active => <Flow nodes={[["viewer", "operator", "admin"][active], "sudo 策略", [["拒绝", "muted"], ["指定查询命令", "cyan"], ["所有命令", "amber"]][active] as [string, "muted" | "cyan" | "amber"]]} />}
      scenarios={[
        { label: "无授权", steps: ["用户 viewer", "无匹配规则", "没有 sudo 权限"] },
        { label: "单命令授权", steps: ["用户 operator", "仅允许指定状态查询命令", "检查该命令的授权范围"] },
        { label: "全命令授权", steps: ["用户 admin", "允许所有命令", "标记为高权限并复核"] },
      ]}
    />
  );
}
