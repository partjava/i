'use client';

import { Lanes } from './ConceptDiagram';
import { ScenarioVisualizer } from './ScenarioVisualizer';

export function ComputerNetworkLevel1() {
  return (
    <ScenarioVisualizer
      title="路由表最长前缀匹配引擎"
      description="目标地址变化时，观察获胜的路由。"
      diagramOnly
      renderDiagram={active => <Lanes rows={["/0", "/8", "/16", "/24"].map((prefix, index) => { const winner = [3, 2, 0][active]; return [prefix, [index === winner ? "采用" : index < winner ? "匹配" : "不匹配", index === winner ? "violet" : index < winner ? "cyan" : "muted"]]; })} />}
      scenarios={[
        { label: "目标 10.1.2.33", steps: ["10.0.0.0/8", "10.1.0.0/16", "10.1.2.0/24 最具体"] },
        { label: "目标 10.1.9.33", steps: ["10.0.0.0/8", "10.1.0.0/16", "选择 /16，/24 不匹配"] },
        { label: "目标 192.0.2.1", steps: ["三条 10 开头的路由均不匹配", "0.0.0.0/0", "选择默认路由"] },
      ]}
    />
  );
}

export function ComputerNetworkLevel2() {
  return (
    <ScenarioVisualizer
      title="子网划分计算器"
      description="把 192.0.2.0/24 等分，比较第一个子网。"
      diagramOnly
      renderDiagram={active => <Lanes rows={Array.from({ length: 2 ** (active + 1) }, (_, index) => { const size = 128 >> active; return [`子网 ${index + 1}`, [`.${index * size}`, "violet"], `.${index * size + 1}–.${(index + 1) * size - 2}`, [`.${(index + 1) * size - 1}`, "amber"]]; })} />}
      scenarios={[
        { label: "2 个子网", steps: ["借 1 位 → /25", "网络 .0，广播 .127", "可用主机 .1–.126"] },
        { label: "4 个子网", steps: ["借 2 位 → /26", "网络 .0，广播 .63", "可用主机 .1–.62"] },
        { label: "8 个子网", steps: ["借 3 位 → /27", "网络 .0，广播 .31", "可用主机 .1–.30"] },
      ]}
    />
  );
}
