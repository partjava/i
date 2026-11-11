type Tone = 'cyan' | 'violet' | 'amber' | 'muted';
type Cell = string | [string, Tone];
type Lane = [string, ...Cell[]];
type Meter = [string, number, number, Tone?];

const tones: Record<Tone, string> = {
  cyan: 'border-cyan-800 bg-cyan-950/70 text-cyan-100',
  violet: 'border-violet-700 bg-violet-950/70 text-violet-100',
  amber: 'border-amber-700 bg-amber-950/70 text-amber-100',
  muted: 'border-slate-700 bg-slate-900 text-slate-400',
};

export function Lanes({ rows }: { rows: Lane[] }) {
  return (
    <div className="space-y-3" aria-live="polite">
      {rows.map(([label, ...cells]) => (
        <div key={label} className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <span className="w-20 shrink-0 text-xs text-slate-400">{label}</span>
          {cells.map((cell, index) => {
            const [value, tone] = typeof cell === 'string' ? [cell, 'cyan' as const] : cell;
            return (
              <span key={index} className={`min-w-0 rounded-md border px-2 py-1.5 text-xs [overflow-wrap:anywhere] ${tones[tone]}`}>
                {value}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function Meters({ rows }: { rows: Meter[] }) {
  return (
    <div className="space-y-3" aria-live="polite">
      {rows.map(([label, value, limit, tone = 'cyan']) => (
        <div key={label}>
          <div className="mb-1 flex justify-between gap-2 text-xs text-slate-300">
            <span>{label}</span><span className="font-mono">{value} / {limit}</span>
          </div>
          <div className="h-4 overflow-hidden rounded bg-slate-800">
            <div className={`h-full rounded border ${tones[tone]}`} style={{ width: `${Math.min(value / limit, 1) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Flow({ nodes }: { nodes: Cell[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2" aria-live="polite">
      {nodes.map((node, index) => {
        const [label, tone] = typeof node === 'string' ? [node, 'cyan' as const] : node;
        return (
          <div key={index} className="flex min-w-0 items-center gap-2">
            {index > 0 && <span aria-hidden="true" className="text-violet-400">→</span>}
            <span className={`min-w-0 rounded-lg border px-2.5 py-2 text-xs [overflow-wrap:anywhere] ${tones[tone]}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function Intervals({ ranges, sharedFile }: { ranges: [[number, number], [number, number]]; sharedFile: boolean }) {
  const start = Math.max(ranges[0][0], ranges[1][0]);
  const end = Math.min(ranges[0][1], ranges[1][1]);
  const x = (line: number) => 60 + (line - 10) * 9;
  return (
    <svg viewBox="0 0 320 112" className="w-full" role="img" aria-label={sharedFile && start <= end ? `重叠行 ${start} 到 ${end}` : '没有同文件行范围重叠'}>
      {sharedFile && start <= end && <rect x={x(start)} y="10" width={x(end + 1) - x(start)} height="76" fill="#78350f" opacity=".6" />}
      {ranges.map(([first, last], index) => (
        <g key={index}>
          <text x="9" y={34 + 36 * index} fill="#cbd5e1" fontSize="12">{index === 0 ? '基准' : '变更'}</text>
          <rect x={x(first)} y={18 + 36 * index} width={x(last + 1) - x(first)} height="23" rx="4" fill={index === 0 ? '#155e75' : '#6d28d9'} />
          <text x={x(first) + 5} y={34 + 36 * index} fill="#f8fafc" fontSize="11">{first}–{last}</text>
        </g>
      ))}
      {[10, 20, 30, 35].map(line => <text key={line} x={x(line)} y="103" fill="#94a3b8" fontSize="10">{line}</text>)}
    </svg>
  );
}
