'use client';

import { Flow, Lanes } from './ConceptDiagram';
import { ScenarioVisualizer } from './ScenarioVisualizer';

export function EncodingLevel1() {
  return (
    <ScenarioVisualizer
      title="日志编码异常探测器"
      description="先严格解码，再检查是否包含替换字符。"
      diagramOnly
      renderDiagram={active => <Flow nodes={[["E4 B8 AD", "FF", "EF BF BD"][active], "UTF-8", [["中", "cyan"], ["解码失败", "amber"], ["�", "amber"]][active] as [string, "cyan" | "amber"]]} />}
      scenarios={[
        { label: "正常字节", steps: ["E4 B8 AD", "UTF-8 解码为「中」", "正常文本"] },
        { label: "非法字节", steps: ["FF", "严格 UTF-8 解码失败", "INVALID_UTF8"] },
        { label: "替换字符", steps: ["EF BF BD", "解码成功，得到 �", "SUSPECT_REPLACEMENT"] },
      ]}
    />
  );
}

export function EncodingLevel2() {
  return (
    <ScenarioVisualizer
      title="Base64 编码解码器"
      description="观察每 3 个字节如何编码为 4 个字符。"
      diagramOnly
      renderDiagram={active => <Lanes rows={[["原字节", ...["4D", "61", "6E"].slice(0, 3 - active)], ["6 位一组", ...[["010011", "010110", "000101", "101110"], ["010011", "010110", "000100"], ["010011", "010000"]][active]], ["Base64", ...["TWFu", "TWE=", "TQ=="][active].split("").map((char): [string, "amber" | "violet"] => [char, char === "=" ? "amber" : "violet"])] ]} />}
      scenarios={[
        { label: "3 字节", steps: ["Man → 4D 61 6E", "拆成四组 6 位", "TWFu"] },
        { label: "2 字节", steps: ["Ma → 4D 61", "第三组补零", "TWE="] },
        { label: "1 字节", steps: ["M → 4D", "第二组补零", "TQ=="] },
      ]}
    />
  );
}
