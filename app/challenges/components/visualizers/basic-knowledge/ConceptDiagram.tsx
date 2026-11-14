'use client';

import { motion } from 'framer-motion';
import {
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
  InteractiveTimelineCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

type Tone = 'cyan' | 'violet' | 'amber' | 'muted';
type Cell = string | [string, Tone];
type Lane = [string, ...Cell[]];
type Meter = [string, number, number, Tone?];

const mapTone = (t?: Tone): VisualizerTone => {
  if (t === 'violet') return 'indigo';
  if (t === 'amber') return 'amber';
  if (t === 'muted') return 'slate';
  return 'cyan';
};

export function Lanes({ rows }: { rows: Lane[] }) {
  return (
    <InteractiveMemoryCanvas
      tracks={rows.map(([name, ...cells]) => ({
        name,
        slots: cells.map((cell) => {
          const [label, t] = typeof cell === 'string' ? [cell, 'cyan' as const] : cell;
          return { label, tone: mapTone(t) };
        }),
      }))}
    />
  );
}

export function Meters({ rows }: { rows: Meter[] }) {
  const maxTime = Math.max(1, ...rows.map(([, val, limit]) => Math.max(val, limit) * 1.15));
  return (
    <InteractiveTimelineCanvas
      maxTime={Math.round(maxTime * 10) / 10}
      lanes={rows.map(([label, value, limit, t = 'cyan']) => ({
        name: label,
        blocks: [
          {
            start: 0,
            end: Math.max(0.01, value),
            label: `${value}/${limit}`,
            tone: mapTone(t),
          },
        ],
      }))}
      thresholds={
        rows[0]
          ? [
              {
                value: rows[0][2],
                label: `阈值 ${rows[0][2]}`,
                tone: 'amber',
              },
            ]
          : []
      }
    />
  );
}

export function Flow({ nodes }: { nodes: Cell[] }) {
  const count = Math.max(1, nodes.length);
  const startX = 56;
  const endX = 344;
  const stepX = count > 1 ? (endX - startX) / (count - 1) : 0;

  const graphNodes = nodes.map((node, index) => {
    const [label, t] = typeof node === 'string' ? [node, 'cyan' as const] : node;
    return {
      id: `n-${index}`,
      x: count === 1 ? 200 : startX + index * stepX,
      y: 65,
      label,
      shape: 'pill' as const,
      tone: mapTone(t),
      active: index === count - 1,
    };
  });

  const graphEdges = graphNodes.slice(0, -1).map((n, index) => ({
    from: n.id,
    to: graphNodes[index + 1].id,
    tone: graphNodes[index + 1].tone,
    animated: true,
  }));

  return <InteractiveGraphCanvas nodes={graphNodes} edges={graphEdges} height={130} />;
}

export function Intervals({
  ranges,
  sharedFile,
}: {
  ranges: [[number, number], [number, number]];
  sharedFile: boolean;
}) {
  const start = Math.max(ranges[0][0], ranges[1][0]);
  const end = Math.min(ranges[0][1], ranges[1][1]);
  const hasOverlap = sharedFile && start <= end;
  const x = (line: number) => 66 + (line - 8) * 9.8;

  return (
    <svg
      viewBox="0 0 380 124"
      className="w-full h-auto select-none"
      role="img"
      aria-label={hasOverlap ? `重叠行 ${start} 到 ${end}` : '没有同文件行范围重叠'}
    >
      {/* Grid ticks */}
      {[10, 15, 20, 25, 30, 35].map((line) => (
        <g key={line}>
          <line x1={x(line)} y1={14} x2={x(line)} y2={96} stroke="rgba(148,163,184,0.12)" />
          <text x={x(line)} y={112} textAnchor="middle" fill="#64748b" fontSize="9.5" fontFamily="monospace">
            L{line}
          </text>
        </g>
      ))}

      {/* Conflict Overlap Band */}
      {hasOverlap && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect
            x={x(start)}
            y={14}
            width={Math.max(4, x(end + 1) - x(start))}
            height={82}
            rx={4}
            fill="rgba(251, 113, 133, 0.18)"
            stroke="#fb7185"
            strokeDasharray="3 2"
          />
          <text
            x={(x(start) + x(end + 1)) / 2}
            y={10}
            textAnchor="middle"
            fill="#fda4af"
            fontSize="9"
            fontFamily="monospace"
          >
            冲突区 {start}–{end}
          </text>
        </motion.g>
      )}

      {ranges.map(([first, last], index) => {
        const y = 24 + index * 38;
        const color = index === 0 ? '#22d3ee' : '#818cf8';
        const fill = index === 0 ? 'rgba(34,211,238,0.2)' : 'rgba(129,140,248,0.22)';
        const w = Math.max(20, x(last + 1) - x(first));
        return (
          <g key={index}>
            <text x={10} y={y + 16} fill="#cbd5e1" fontSize="10.5" fontWeight="600">
              {index === 0 ? '基准分支' : '待合提交'}
            </text>
            <motion.rect
              x={x(first)}
              y={y}
              width={w}
              height={24}
              rx={5}
              animate={{ x: x(first), width: w }}
              transition={{ duration: 0.25 }}
              fill={fill}
              stroke={color}
              strokeWidth={1.5}
            />
            <text
              x={x(first) + w / 2}
              y={y + 15}
              textAnchor="middle"
              fill="#f8fafc"
              fontSize="10"
              fontFamily="monospace"
            >
              {first}–{last} 行
            </text>
          </g>
        );
      })}
    </svg>
  );
}
