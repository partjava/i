'use client';

import { Intervals } from './ConceptDiagram';
import { ScenarioVisualizer } from './ScenarioVisualizer';

const replayedCommits = [[], ['C′'], ['C′', 'D′']];

export function GitRebaseLevel1() {
  return (
    <ScenarioVisualizer
      title="提交历史重放模拟器"
      description="依次把功能提交重放到新的基底。"
      diagramOnly
      renderDiagram={active => (
        <svg viewBox="0 0 320 112" className="w-full" role="img" aria-label={active === 0 ? 'A 分出主分支 B 和功能分支 C、D' : `新历史：A、B、${replayedCommits[active].join('、')}`}>
          <path d="M32 38 H108 M32 38 L108 78 H182" fill="none" stroke="#64748b" strokeWidth="2" />
          {active > 0 && <path d={`M108 38 H${108 + 75 * active}`} stroke="#a78bfa" strokeWidth="2" />}
          {replayedCommits[active].map((name, index) => (
            <path key={name} d={`M${108 + 74 * index} 78 Q${156 + 75 * index} 78 ${183 + 75 * index} 38`} fill="none" stroke="#a78bfa" strokeDasharray="4 4" />
          ))}
          {[
            { name: 'A', x: 32, y: 38, color: '#94a3b8' },
            { name: 'B', x: 108, y: 38, color: '#22d3ee' },
            { name: 'C', x: 108, y: 78, color: '#94a3b8' },
            { name: 'D', x: 182, y: 78, color: '#94a3b8' },
            ...replayedCommits[active].map((name, index) => ({ name, x: 183 + 75 * index, y: 38, color: '#a78bfa' })),
          ].map(({ name, x, y, color }) => (
            <g key={name}>
              <circle cx={x} cy={y} r="12" fill="#0f172a" stroke={color} strokeWidth="2" />
              <text x={x} y={y} dy=".35em" textAnchor="middle" fill={color} fontSize="11">{name}</text>
            </g>
          ))}
          <text x="108" y="15" textAnchor="middle" fill="#67e8f9" fontSize="11">main</text>
          {active > 0 && <text x={108 + 75 * active} y="15" textAnchor="middle" fill="#c4b5fd" fontSize="11">新 feature</text>}
          <text x="108" y="105" textAnchor="middle" fill="#94a3b8" fontSize="11">原 feature 路径</text>
        </svg>
      )}
      scenarios={[
        { label: "分支分叉", steps: ["共同提交 A", "main：A → B", "feature：A → C → D"] },
        { label: "重放 C", steps: ["新基底 A → B", "应用 C 的变更", "A → B → rebased-C"] },
        { label: "重放 D", steps: ["当前末尾 rebased-C", "应用 D 的变更", "A → B → rebased-C → rebased-D"] },
      ]}
    />
  );
}

export function GitRebaseLevel2() {
  return (
    <ScenarioVisualizer
      title="Rebase 冲突预测器"
      description="按每个功能提交检查目标分支上的变更。"
      diagramOnly
      renderDiagram={active => <Intervals ranges={[[10, 20], [[10, 15], [18, 25], [30, 35]][active] as [number, number]]} sharedFile={active !== 0} />}
      scenarios={[
        { label: "首个提交", steps: ["目标分支改 parser.ts 10–20", "功能提交 C 改 reader.ts", "无同文件重叠"] },
        { label: "下一提交", steps: ["目标分支仍改 parser.ts 10–20", "功能提交 D 改 parser.ts 18–25", "重叠 18–20，可能需要解决"] },
        { label: "范围错开", steps: ["目标分支改 parser.ts 10–20", "功能提交改 parser.ts 30–35", "没有检测到行范围重叠"] },
      ]}
    />
  );
}
