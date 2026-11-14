'use client';

import React, { useEffect, useId, useState, type ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

export interface VisualizerEntry {
  subtopic: string;
  levelIndex: 1 | 2;
  levelTitle: string;
  component: ComponentType;
}

export function createStageLookup(entries: VisualizerEntry[]) {
  return (subtopicName: string, levelTitle?: string, levelIndex?: number): ComponentType | null => {
    if (levelTitle) {
      const byTitle = entries.find((e) => e.subtopic === subtopicName && e.levelTitle === levelTitle);
      if (byTitle) return byTitle.component;
    }
    if (levelIndex !== undefined) {
      const byIndex = entries.find((e) => e.subtopic === subtopicName && e.levelIndex === levelIndex);
      if (byIndex) return byIndex.component;
    }
    const first = entries.find((e) => e.subtopic === subtopicName);
    return first ? first.component : null;
  };
}

export type VisualizerTone = 'cyan' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'slate';

export const TONE_COLORS: Record<
  VisualizerTone,
  { stroke: string; fill: string; soft: string; text: string; badge: string }
> = {
  cyan: {
    stroke: '#22d3ee',
    fill: 'rgba(34, 211, 238, 0.16)',
    soft: 'rgba(34, 211, 238, 0.45)',
    text: 'text-cyan-300',
    badge: 'border-cyan-500/30 bg-cyan-950/50 text-cyan-200',
  },
  indigo: {
    stroke: '#818cf8',
    fill: 'rgba(129, 140, 248, 0.18)',
    soft: 'rgba(129, 140, 248, 0.45)',
    text: 'text-indigo-300',
    badge: 'border-indigo-500/30 bg-indigo-950/50 text-indigo-200',
  },
  emerald: {
    stroke: '#34d399',
    fill: 'rgba(52, 211, 153, 0.16)',
    soft: 'rgba(52, 211, 153, 0.45)',
    text: 'text-emerald-300',
    badge: 'border-emerald-500/30 bg-emerald-950/50 text-emerald-200',
  },
  amber: {
    stroke: '#fbbf24',
    fill: 'rgba(251, 191, 36, 0.16)',
    soft: 'rgba(251, 191, 36, 0.45)',
    text: 'text-amber-300',
    badge: 'border-amber-500/30 bg-amber-950/50 text-amber-200',
  },
  rose: {
    stroke: '#fb7185',
    fill: 'rgba(251, 113, 133, 0.18)',
    soft: 'rgba(251, 113, 133, 0.45)',
    text: 'text-rose-300',
    badge: 'border-rose-500/30 bg-rose-950/50 text-rose-200',
  },
  slate: {
    stroke: '#64748b',
    fill: 'rgba(100, 116, 139, 0.14)',
    soft: 'rgba(100, 116, 139, 0.35)',
    text: 'text-slate-300',
    badge: 'border-slate-700/60 bg-slate-900/70 text-slate-300',
  },
};

export interface SliderControl {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  displayValue?: string;
  onChange: (value: number) => void;
}

export interface MetricItem {
  label: string;
  value: string;
  tone?: VisualizerTone;
}

export interface ScenarioTab {
  label: string;
  summary?: string;
}

interface VisualizerFrameProps {
  title: string;
  subtitle?: string;
  badge?: string;
  scenarios?: ScenarioTab[];
  activeScenario?: number;
  onScenarioChange?: (idx: number) => void;
  autoPlayIntervalMs?: number;
  sliders?: SliderControl[];
  metrics?: MetricItem[];
  caption?: React.ReactNode;
  children: React.ReactNode;
}

export function VisualizerFrame({
  title,
  subtitle,
  badge,
  scenarios,
  activeScenario = 0,
  onScenarioChange,
  autoPlayIntervalMs = 2200,
  sliders,
  metrics,
  caption,
  children,
}: VisualizerFrameProps) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || !scenarios || scenarios.length <= 1 || !onScenarioChange) return;
    const timer = setInterval(() => {
      onScenarioChange((activeScenario + 1) % scenarios.length);
    }, autoPlayIntervalMs);
    return () => clearInterval(timer);
  }, [playing, scenarios, activeScenario, onScenarioChange, autoPlayIntervalMs]);

  useEffect(() => {
    setPlaying(false);
  }, [title]);

  return (
    <section
      aria-label={title}
      className="min-w-0 w-full rounded-2xl border border-indigo-500/25 bg-gradient-to-b from-slate-900/80 via-[#070b18]/90 to-[#04060f] p-4 sm:p-5 shadow-[0_12px_36px_rgba(3,7,18,0.65)] backdrop-blur-md space-y-3.5"
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold text-slate-100 tracking-tight truncate">{title}</h3>
          </div>
          {subtitle && <p className="text-xs text-slate-400 leading-relaxed">{subtitle}</p>}
        </div>
        {badge && (
          <span className="shrink-0 rounded-full border border-indigo-400/25 bg-indigo-950/60 px-2.5 py-0.5 text-[10px] font-mono text-indigo-300">
            {badge}
          </span>
        )}
      </div>

      {/* Scenario Switcher + Auto-Play */}
      {scenarios && scenarios.length > 0 && onScenarioChange && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="交互场景切换">
            {scenarios.map((sc, idx) => {
              const isActive = idx === activeScenario;
              return (
                <button
                  key={`${sc.label}-${idx}`}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setPlaying(false);
                    onScenarioChange(idx);
                  }}
                  className={`rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-all ${
                    isActive
                      ? 'border-cyan-400/60 bg-cyan-500/15 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.18)]'
                      : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {sc.label}
                </button>
              );
            })}
          </div>
          {scenarios.length > 1 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950/80 px-2 py-1 text-[10px] text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition"
                title={playing ? '暂停自动推演' : '自动步进推演'}
              >
                {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{playing ? '暂停' : '演示'}</span>
              </button>
              {activeScenario !== 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setPlaying(false);
                    onScenarioChange(0);
                  }}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-1 text-slate-400 hover:text-slate-200 transition"
                  title="回到初始状态"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Main SVG Canvas */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800/90 bg-[#040712] p-2.5 sm:p-3 shadow-inner">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.28) 1px, transparent 0)',
            backgroundSize: '18px 18px',
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>

      {/* Sliders */}
      {sliders && sliders.length > 0 && (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {sliders.map((s) => (
            <label
              key={s.label}
              className="flex flex-col gap-1 rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-2 text-[11px]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-400">{s.label}</span>
                <span className="font-mono font-semibold text-cyan-300">
                  {s.displayValue ?? s.value}
                </span>
              </div>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={s.step ?? 0.1}
                value={s.value}
                onChange={(e) => s.onChange(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-cyan-400"
              />
            </label>
          ))}
        </div>
      )}

      {/* Metrics */}
      {metrics && metrics.length > 0 && (
        <div
          className={`grid gap-2 ${
            metrics.length === 1
              ? 'grid-cols-1'
              : metrics.length === 2
              ? 'grid-cols-2'
              : metrics.length === 3
              ? 'grid-cols-3'
              : 'grid-cols-2 sm:grid-cols-4'
          }`}
        >
          {metrics.map((m) => {
            const tone = TONE_COLORS[m.tone ?? 'cyan'];
            return (
              <div
                key={m.label}
                className="rounded-xl border border-slate-800/80 bg-slate-950/75 px-2.5 py-2 flex flex-col gap-0.5 min-w-0"
              >
                <span className="text-[10px] text-slate-400 truncate">{m.label}</span>
                <span className={`font-mono text-xs font-bold truncate ${tone.text}`}>{m.value}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Dynamic Caption */}
      {(caption || scenarios?.[activeScenario]?.summary) && (
        <div
          aria-live="polite"
          className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 px-3 py-2 text-xs leading-relaxed text-slate-300"
        >
          {caption ?? scenarios?.[activeScenario]?.summary}
        </div>
      )}
    </section>
  );
}

// ============================================================================
// 家族 1: InteractiveVectorCanvas — 2D 几何、向量、超平面、聚簇画布
// ============================================================================

export interface VectorArrow {
  id: string;
  from?: [number, number];
  to: [number, number];
  label?: string;
  tone?: VisualizerTone;
  dashed?: boolean;
  width?: number;
}

export interface VectorPoint {
  x: number;
  y: number;
  label?: string;
  tone?: VisualizerTone;
  radius?: number;
  ring?: boolean;
  hollow?: boolean;
}

export interface VectorSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tone?: VisualizerTone;
  dashed?: boolean;
  label?: string;
  width?: number;
}

export interface VectorCircle {
  cx: number;
  cy: number;
  r: number; // in data units
  tone?: VisualizerTone;
  dashed?: boolean;
  label?: string;
}

export interface VectorPolygon {
  points: [number, number][];
  tone?: VisualizerTone;
  label?: string;
}

export interface InteractiveVectorCanvasProps {
  domainX?: [number, number];
  domainY?: [number, number];
  gridStep?: number;
  xLabel?: string;
  yLabel?: string;
  vectors?: VectorArrow[];
  segments?: VectorSegment[];
  points?: VectorPoint[];
  circles?: VectorCircle[];
  polygons?: VectorPolygon[];
  angleArc?: {
    fromAngleRad: number;
    toAngleRad: number;
    radius?: number;
    label?: string;
    tone?: VisualizerTone;
  };
  ariaLabel?: string;
  height?: number;
}

export function InteractiveVectorCanvas({
  domainX = [-5, 5],
  domainY = [-4, 4],
  gridStep = 1,
  xLabel = 'x',
  yLabel = 'y',
  vectors = [],
  segments = [],
  points = [],
  circles = [],
  polygons = [],
  angleArc,
  ariaLabel = '二维几何与向量坐标系',
  height = 240,
}: InteractiveVectorCanvasProps) {
  const uid = useId().replace(/:/g, '');
  const W = 400;
  const H = height;
  const pad = 28;

  const mapX = (x: number) =>
    pad + ((x - domainX[0]) / Math.max(1e-6, domainX[1] - domainX[0])) * (W - pad * 2);
  const mapY = (y: number) =>
    H - pad - ((y - domainY[0]) / Math.max(1e-6, domainY[1] - domainY[0])) * (H - pad * 2);

  const scaleX = (W - pad * 2) / Math.max(1e-6, domainX[1] - domainX[0]);
  const scaleY = (H - pad * 2) / Math.max(1e-6, domainY[1] - domainY[0]);

  const ox = mapX(Math.max(domainX[0], Math.min(domainX[1], 0)));
  const oy = mapY(Math.max(domainY[0], Math.min(domainY[1], 0)));

  const xTicks: number[] = [];
  for (let t = Math.ceil(domainX[0] / gridStep) * gridStep; t <= domainX[1] + 1e-9; t += gridStep) {
    xTicks.push(Number(t.toFixed(2)));
  }
  const yTicks: number[] = [];
  for (let t = Math.ceil(domainY[0] / gridStep) * gridStep; t <= domainY[1] + 1e-9; t += gridStep) {
    yTicks.push(Number(t.toFixed(2)));
  }

  const tones: VisualizerTone[] = ['cyan', 'indigo', 'emerald', 'amber', 'rose', 'slate'];

  const renderArc = () => {
    if (!angleArc) return null;
    const rPx = (angleArc.radius ?? 1.1) * Math.min(scaleX, scaleY);
    const x1 = ox + rPx * Math.cos(angleArc.fromAngleRad);
    const y1 = oy - rPx * Math.sin(angleArc.fromAngleRad);
    const x2 = ox + rPx * Math.cos(angleArc.toAngleRad);
    const y2 = oy - rPx * Math.sin(angleArc.toAngleRad);
    let diff = angleArc.toAngleRad - angleArc.fromAngleRad;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    const sweep = diff >= 0 ? 0 : 1;
    const mid = angleArc.fromAngleRad + diff / 2;
    const lx = ox + (rPx + 13) * Math.cos(mid);
    const ly = oy - (rPx + 13) * Math.sin(mid);
    const color = TONE_COLORS[angleArc.tone ?? 'amber'].stroke;
    return (
      <g>
        <path
          d={`M ${ox} ${oy} L ${x1} ${y1} A ${rPx} ${rPx} 0 0 ${sweep} ${x2} ${y2} Z`}
          fill={TONE_COLORS[angleArc.tone ?? 'amber'].fill}
          stroke={color}
          strokeWidth={1.2}
          strokeDasharray="3 2"
        />
        {angleArc.label && (
          <text x={lx} y={ly} textAnchor="middle" dominantBaseline="central" fill={color} fontSize="10" fontFamily="monospace">
            {angleArc.label}
          </text>
        )}
      </g>
    );
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" role="img" aria-label={ariaLabel}>
      <defs>
        {tones.map((tone) => (
          <marker
            key={tone}
            id={`vec-arrow-${uid}-${tone}`}
            markerWidth="8"
            markerHeight="8"
            refX="6.5"
            refY="3.5"
            orient="auto"
          >
            <path d="M0,0.5 L7,3.5 L0,6.5 z" fill={TONE_COLORS[tone].stroke} />
          </marker>
        ))}
      </defs>

      {/* Grid lines */}
      {xTicks.map((x) => (
        <line
          key={`gx-${x}`}
          x1={mapX(x)}
          y1={pad}
          x2={mapX(x)}
          y2={H - pad}
          stroke={x === 0 ? 'rgba(148,163,184,0.35)' : 'rgba(148,163,184,0.08)'}
          strokeWidth={x === 0 ? 1.4 : 1}
        />
      ))}
      {yTicks.map((y) => (
        <line
          key={`gy-${y}`}
          x1={pad}
          y1={mapY(y)}
          x2={W - pad}
          y2={mapY(y)}
          stroke={y === 0 ? 'rgba(148,163,184,0.35)' : 'rgba(148,163,184,0.08)'}
          strokeWidth={y === 0 ? 1.4 : 1}
        />
      ))}

      {/* Axis Labels */}
      <text x={W - pad + 6} y={oy + 3} fill="#94a3b8" fontSize="10" fontFamily="monospace">
        {xLabel}
      </text>
      <text x={ox + 5} y={pad - 8} fill="#94a3b8" fontSize="10" fontFamily="monospace">
        {yLabel}
      </text>

      {/* Polygons */}
      {polygons.map((poly, i) => {
        const tone = TONE_COLORS[poly.tone ?? 'indigo'];
        const pts = poly.points.map(([x, y]) => `${mapX(x)},${mapY(y)}`).join(' ');
        const cx = poly.points.reduce((acc, p) => acc + mapX(p[0]), 0) / Math.max(1, poly.points.length);
        const cy = poly.points.reduce((acc, p) => acc + mapY(p[1]), 0) / Math.max(1, poly.points.length);
        return (
          <g key={`poly-${i}`}>
            <motion.polygon
              points={pts}
              animate={{ points: pts }}
              transition={{ duration: 0.25 }}
              fill={tone.fill}
              stroke={tone.stroke}
              strokeWidth={1.5}
            />
            {poly.label && (
              <text x={cx} y={cy} textAnchor="middle" fill={tone.stroke} fontSize="10" fontFamily="monospace">
                {poly.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Circles */}
      {circles.map((c, i) => {
        const tone = TONE_COLORS[c.tone ?? 'cyan'];
        return (
          <g key={`circle-${i}`}>
            <motion.ellipse
              cx={mapX(c.cx)}
              cy={mapY(c.cy)}
              rx={c.r * scaleX}
              ry={c.r * scaleY}
              animate={{ cx: mapX(c.cx), cy: mapY(c.cy), rx: c.r * scaleX, ry: c.r * scaleY }}
              transition={{ duration: 0.25 }}
              fill={tone.fill}
              stroke={tone.stroke}
              strokeWidth={1.5}
              strokeDasharray={c.dashed ? '4 3' : undefined}
            />
            {c.label && (
              <text x={mapX(c.cx)} y={mapY(c.cy) - c.r * scaleY - 5} textAnchor="middle" fill={tone.stroke} fontSize="10">
                {c.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Angle Arc */}
      {renderArc()}

      {/* Segments / Lines */}
      {segments.map((seg, i) => {
        const tone = TONE_COLORS[seg.tone ?? 'slate'];
        const mx = (mapX(seg.x1) + mapX(seg.x2)) / 2;
        const my = (mapY(seg.y1) + mapY(seg.y2)) / 2;
        return (
          <g key={`seg-${i}`}>
            <motion.line
              x1={mapX(seg.x1)}
              y1={mapY(seg.y1)}
              x2={mapX(seg.x2)}
              y2={mapY(seg.y2)}
              animate={{ x1: mapX(seg.x1), y1: mapY(seg.y1), x2: mapX(seg.x2), y2: mapY(seg.y2) }}
              transition={{ duration: 0.22 }}
              stroke={tone.stroke}
              strokeWidth={seg.width ?? 1.6}
              strokeDasharray={seg.dashed ? '5 4' : undefined}
            />
            {seg.label && (
              <text x={mx} y={my - 6} textAnchor="middle" fill={tone.stroke} fontSize="10" fontFamily="monospace">
                {seg.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Vectors */}
      {vectors.map((v) => {
        const toneName = v.tone ?? 'cyan';
        const tone = TONE_COLORS[toneName];
        const [fx, fy] = v.from ?? [0, 0];
        const [tx, ty] = v.to;
        const x1 = mapX(fx);
        const y1 = mapY(fy);
        const x2 = mapX(tx);
        const y2 = mapY(ty);
        return (
          <g key={v.id}>
            <motion.line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              animate={{ x1, y1, x2, y2 }}
              transition={{ duration: 0.25 }}
              stroke={tone.stroke}
              strokeWidth={v.width ?? 2.4}
              strokeDasharray={v.dashed ? '4 3' : undefined}
              markerEnd={`url(#vec-arrow-${uid}-${toneName})`}
            />
            {v.label && (
              <motion.text
                x={x2 + (tx >= fx ? 8 : -8)}
                y={y2 + (ty >= fy ? -8 : 12)}
                animate={{ x: x2 + (tx >= fx ? 8 : -8), y: y2 + (ty >= fy ? -8 : 12) }}
                transition={{ duration: 0.25 }}
                textAnchor={tx >= fx ? 'start' : 'end'}
                fill={tone.stroke}
                fontSize="11"
                fontWeight="600"
                fontFamily="monospace"
              >
                {v.label}
              </motion.text>
            )}
          </g>
        );
      })}

      {/* Scatter Points */}
      {points.map((pt, i) => {
        const tone = TONE_COLORS[pt.tone ?? 'cyan'];
        const px = mapX(pt.x);
        const py = mapY(pt.y);
        const r = pt.radius ?? 5;
        return (
          <g key={`pt-${i}`}>
            {pt.ring && (
              <motion.circle
                cx={px}
                cy={py}
                r={r + 4.5}
                animate={{ cx: px, cy: py }}
                fill="none"
                stroke={tone.stroke}
                strokeWidth={1.4}
                strokeDasharray="3 2"
              />
            )}
            <motion.circle
              cx={px}
              cy={py}
              r={r}
              animate={{ cx: px, cy: py }}
              transition={{ duration: 0.22 }}
              fill={pt.hollow ? '#040712' : tone.stroke}
              stroke={tone.stroke}
              strokeWidth={pt.hollow ? 2 : 1.5}
            />
            {pt.label && (
              <text x={px} y={py - r - 5} textAnchor="middle" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace">
                {pt.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================================
// 家族 2: InteractiveCurveCanvas — 连续函数、概率分布、优化轨迹画布
// ============================================================================

export interface CurveSeries {
  id: string;
  points: Array<[number, number]>;
  label?: string;
  tone?: VisualizerTone;
  dashed?: boolean;
  fillArea?: boolean;
  width?: number;
}

export interface CurveMarker {
  x: number;
  y: number;
  label?: string;
  tone?: VisualizerTone;
  radius?: number;
}

export interface InteractiveCurveCanvasProps {
  domainX: [number, number];
  domainY: [number, number];
  xLabel?: string;
  yLabel?: string;
  curves: CurveSeries[];
  markers?: CurveMarker[];
  tracePoints?: Array<[number, number]>;
  traceTone?: VisualizerTone;
  vLines?: Array<{ x: number; label?: string; tone?: VisualizerTone }>;
  hLines?: Array<{ y: number; label?: string; tone?: VisualizerTone }>;
  highlightBandX?: { x1: number; x2: number; label?: string; tone?: VisualizerTone };
  ariaLabel?: string;
  height?: number;
}

export function InteractiveCurveCanvas({
  domainX,
  domainY,
  xLabel = 'x',
  yLabel = 'y',
  curves,
  markers = [],
  tracePoints = [],
  traceTone = 'amber',
  vLines = [],
  hLines = [],
  highlightBandX,
  ariaLabel = '函数曲线与轨迹图',
  height = 220,
}: InteractiveCurveCanvasProps) {
  const W = 400;
  const H = height;
  const padL = 38;
  const padR = 18;
  const padT = 18;
  const padB = 28;

  const mapX = (x: number) =>
    padL + ((x - domainX[0]) / Math.max(1e-6, domainX[1] - domainX[0])) * (W - padL - padR);
  const mapY = (y: number) =>
    H - padB - ((y - domainY[0]) / Math.max(1e-6, domainY[1] - domainY[0])) * (H - padT - padB);

  const clampY = (y: number) => Math.max(domainY[0], Math.min(domainY[1], y));

  const zeroY = mapY(clampY(0));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" role="img" aria-label={ariaLabel}>
      {/* Grid */}
      {[0.25, 0.5, 0.75].map((f) => {
        const y = padT + f * (H - padT - padB);
        const x = padL + f * (W - padL - padR);
        return (
          <g key={f}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="rgba(148,163,184,0.09)" />
            <line x1={x} y1={padT} x2={x} y2={H - padB} stroke="rgba(148,163,184,0.09)" />
          </g>
        );
      })}

      {/* Highlight Band */}
      {highlightBandX && (
        <g>
          <rect
            x={mapX(Math.min(highlightBandX.x1, highlightBandX.x2))}
            y={padT}
            width={Math.abs(mapX(highlightBandX.x2) - mapX(highlightBandX.x1))}
            height={H - padT - padB}
            fill={TONE_COLORS[highlightBandX.tone ?? 'indigo'].fill}
          />
          {highlightBandX.label && (
            <text
              x={(mapX(highlightBandX.x1) + mapX(highlightBandX.x2)) / 2}
              y={padT + 12}
              textAnchor="middle"
              fill={TONE_COLORS[highlightBandX.tone ?? 'indigo'].stroke}
              fontSize="9.5"
              fontFamily="monospace"
            >
              {highlightBandX.label}
            </text>
          )}
        </g>
      )}

      {/* Axes */}
      <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="rgba(148,163,184,0.4)" />
      <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="rgba(148,163,184,0.4)" />
      {domainY[0] <= 0 && domainY[1] >= 0 && (
        <line x1={padL} y1={zeroY} x2={W - padR} y2={zeroY} stroke="rgba(148,163,184,0.22)" strokeDasharray="3 3" />
      )}

      {/* Axis Tick Ends */}
      <text x={padL - 4} y={padT + 6} textAnchor="end" fill="#64748b" fontSize="9" fontFamily="monospace">
        {domainY[1]}
      </text>
      <text x={padL - 4} y={H - padB} textAnchor="end" fill="#64748b" fontSize="9" fontFamily="monospace">
        {domainY[0]}
      </text>
      <text x={padL} y={H - 10} fill="#64748b" fontSize="9" fontFamily="monospace">
        {domainX[0]}
      </text>
      <text x={W - padR} y={H - 10} textAnchor="end" fill="#64748b" fontSize="9" fontFamily="monospace">
        {domainX[1]} ({xLabel})
      </text>
      <text x={padL + 6} y={padT + 8} fill="#94a3b8" fontSize="9.5" fontFamily="monospace">
        {yLabel}
      </text>

      {/* Reference Lines */}
      {vLines.map((vl, idx) => {
        const vx = mapX(vl.x);
        const color = TONE_COLORS[vl.tone ?? 'amber'].stroke;
        return (
          <g key={`vl-${idx}`}>
            <line x1={vx} y1={padT} x2={vx} y2={H - padB} stroke={color} strokeDasharray="4 3" strokeWidth={1.3} />
            {vl.label && (
              <text x={vx + 3} y={padT + 11} fill={color} fontSize="9.5" fontFamily="monospace">
                {vl.label}
              </text>
            )}
          </g>
        );
      })}
      {hLines.map((hl, idx) => {
        const hy = mapY(clampY(hl.y));
        const color = TONE_COLORS[hl.tone ?? 'amber'].stroke;
        return (
          <g key={`hl-${idx}`}>
            <line x1={padL} y1={hy} x2={W - padR} y2={hy} stroke={color} strokeDasharray="4 3" strokeWidth={1.3} />
            {hl.label && (
              <text x={W - padR - 4} y={hy - 4} textAnchor="end" fill={color} fontSize="9.5" fontFamily="monospace">
                {hl.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Curves */}
      {curves.map((c) => {
        if (c.points.length === 0) return null;
        const tone = TONE_COLORS[c.tone ?? 'cyan'];
        const d = c.points
          .map(([x, y], idx) => `${idx === 0 ? 'M' : 'L'} ${mapX(x).toFixed(1)} ${mapY(clampY(y)).toFixed(1)}`)
          .join(' ');
        const areaD = `${d} L ${mapX(c.points[c.points.length - 1][0]).toFixed(1)} ${zeroY.toFixed(1)} L ${mapX(
          c.points[0][0]
        ).toFixed(1)} ${zeroY.toFixed(1)} Z`;

        return (
          <g key={c.id}>
            {c.fillArea && <path d={areaD} fill={tone.fill} />}
            <motion.path
              d={d}
              animate={{ d }}
              transition={{ duration: 0.25 }}
              fill="none"
              stroke={tone.stroke}
              strokeWidth={c.width ?? 2.3}
              strokeDasharray={c.dashed ? '5 4' : undefined}
            />
          </g>
        );
      })}

      {/* Trace Path & Step Points */}
      {tracePoints.length > 1 && (
        <polyline
          points={tracePoints.map(([x, y]) => `${mapX(x).toFixed(1)},${mapY(clampY(y)).toFixed(1)}`).join(' ')}
          fill="none"
          stroke={TONE_COLORS[traceTone].stroke}
          strokeWidth={1.6}
          strokeDasharray="3 2"
        />
      )}
      {tracePoints.map(([x, y], idx) => {
        const isLast = idx === tracePoints.length - 1;
        const color = TONE_COLORS[traceTone].stroke;
        return (
          <motion.circle
            key={`tp-${idx}`}
            cx={mapX(x)}
            cy={mapY(clampY(y))}
            r={isLast ? 5.5 : 3}
            animate={{ cx: mapX(x), cy: mapY(clampY(y)) }}
            fill={isLast ? color : '#040712'}
            stroke={color}
            strokeWidth={1.6}
          />
        );
      })}

      {/* Markers */}
      {markers.map((m, idx) => {
        const color = TONE_COLORS[m.tone ?? 'emerald'].stroke;
        const mx = mapX(m.x);
        const my = mapY(clampY(m.y));
        return (
          <g key={`mk-${idx}`}>
            <motion.circle
              cx={mx}
              cy={my}
              r={m.radius ?? 5}
              animate={{ cx: mx, cy: my }}
              fill={color}
              stroke="#040712"
              strokeWidth={1.5}
            />
            {m.label && (
              <text x={mx} y={my - 9} textAnchor="middle" fill={color} fontSize="10" fontFamily="monospace">
                {m.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Legend */}
      <g transform={`translate(${W - padR - 4}, ${padT + 8})`}>
        {curves
          .filter((c) => c.label)
          .map((c, idx) => (
            <text
              key={`leg-${c.id}`}
              x={0}
              y={idx * 13}
              textAnchor="end"
              fill={TONE_COLORS[c.tone ?? 'cyan'].stroke}
              fontSize="9.5"
              fontFamily="monospace"
            >
              ● {c.label}
            </text>
          ))}
      </g>
    </svg>
  );
}

// ============================================================================
// 家族 3: InteractiveMatrixCanvas — 矩阵、热力图、卷积滑动窗口画布
// ============================================================================

export interface MatrixCell {
  value: string | number;
  highlight?: VisualizerTone | 'none';
  intensity?: number; // 0..1 heatmap
}

export interface MatrixPanel {
  title: string;
  rows: MatrixCell[][];
  rowLabels?: string[];
  colLabels?: string[];
  highlightRect?: { r: number; c: number; h: number; w: number; tone?: VisualizerTone };
}

export interface InteractiveMatrixCanvasProps {
  left: MatrixPanel;
  operatorLabel?: string;
  middle?: MatrixPanel;
  right?: MatrixPanel;
  ariaLabel?: string;
}

export function InteractiveMatrixCanvas({
  left,
  operatorLabel,
  middle,
  right,
  ariaLabel = '矩阵与滑动窗口计算画布',
}: InteractiveMatrixCanvasProps) {
  const renderGrid = (panel: MatrixPanel, offsetX: number, cellSize: number) => {
    const rCount = panel.rows.length;
    const cCount = panel.rows[0]?.length ?? 0;
    const labelOffset = panel.rowLabels ? 44 : 0;
    const topOffset = panel.colLabels ? 36 : 22;

    return (
      <g transform={`translate(${offsetX}, 0)`}>
        <text
          x={labelOffset + (cCount * cellSize) / 2}
          y={13}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="10"
          fontWeight="600"
        >
          {panel.title}
        </text>
        {panel.colLabels?.map((cl, c) => (
          <text
            key={`cl-${c}`}
            x={labelOffset + c * cellSize + cellSize / 2}
            y={29}
            textAnchor="middle"
            fill="#64748b"
            fontSize="9"
            fontFamily="monospace"
          >
            {cl}
          </text>
        ))}
        {panel.rows.map((row, r) => (
          <g key={`row-${r}`}>
            {panel.rowLabels?.[r] && (
              <text
                x={labelOffset - 6}
                y={topOffset + r * cellSize + cellSize / 2}
                textAnchor="end"
                dominantBaseline="central"
                fill="#94a3b8"
                fontSize="9"
                fontFamily="monospace"
              >
                {panel.rowLabels[r]}
              </text>
            )}
            {row.map((cell, c) => {
              const x = labelOffset + c * cellSize;
              const y = topOffset + r * cellSize;
              const hl = cell.highlight && cell.highlight !== 'none' ? TONE_COLORS[cell.highlight] : null;
              const heatAlpha =
                cell.intensity !== undefined ? Math.max(0.06, Math.min(0.85, cell.intensity * 0.78)) : 0;
              return (
                <g key={`cell-${r}-${c}`}>
                  <rect
                    x={x + 1.5}
                    y={y + 1.5}
                    width={cellSize - 3}
                    height={cellSize - 3}
                    rx={5}
                    fill={
                      hl
                        ? hl.fill
                        : cell.intensity !== undefined
                        ? `rgba(34, 211, 238, ${heatAlpha.toFixed(2)})`
                        : 'rgba(15, 23, 42, 0.85)'
                    }
                    stroke={hl ? hl.stroke : 'rgba(51, 65, 85, 0.75)'}
                    strokeWidth={hl ? 1.5 : 1}
                  />
                  <text
                    x={x + cellSize / 2}
                    y={y + cellSize / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={hl ? '#f8fafc' : cell.intensity && cell.intensity > 0.55 ? '#082f49' : '#cbd5e1'}
                    fontSize={cellSize >= 32 ? '11' : '9.5'}
                    fontFamily="monospace"
                    fontWeight={hl ? '700' : '500'}
                  >
                    {cell.value}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
        {panel.highlightRect && (
          <motion.rect
            x={labelOffset + panel.highlightRect.c * cellSize}
            y={topOffset + panel.highlightRect.r * cellSize}
            width={panel.highlightRect.w * cellSize}
            height={panel.highlightRect.h * cellSize}
            rx={6}
            animate={{
              x: labelOffset + panel.highlightRect.c * cellSize,
              y: topOffset + panel.highlightRect.r * cellSize,
            }}
            transition={{ duration: 0.25 }}
            fill="none"
            stroke={TONE_COLORS[panel.highlightRect.tone ?? 'cyan'].stroke}
            strokeWidth={2.2}
          />
        )}
        <text x={labelOffset} y={topOffset + rCount * cellSize + 10} fill="transparent" fontSize="1">
          .
        </text>
      </g>
    );
  };

  const panels = [left, middle, right].filter(Boolean) as MatrixPanel[];
  const maxCols = Math.max(...panels.map((p) => p.rows[0]?.length ?? 1));
  const maxRows = Math.max(...panels.map((p) => p.rows.length));
  const cellSize = maxCols >= 6 ? 28 : 34;

  const panelWidth = (p: MatrixPanel) => (p.rowLabels ? 44 : 0) + (p.rows[0]?.length ?? 1) * cellSize;
  const gap = 32;
  let cursor = 10;
  const offsets: number[] = [];
  for (const p of panels) {
    offsets.push(cursor);
    cursor += panelWidth(p) + gap;
  }
  const totalW = Math.max(320, cursor - gap + 10);
  const totalH = Math.max(150, (panels.some((p) => p.colLabels) ? 44 : 30) + maxRows * cellSize + 14);

  return (
    <svg viewBox={`0 0 ${totalW} ${totalH}`} className="w-full h-auto select-none" role="img" aria-label={ariaLabel}>
      {panels.map((p, idx) => (
        <g key={`mp-${idx}`}>
          {renderGrid(p, offsets[idx], cellSize)}
          {idx === 0 && panels.length > 1 && (
            <g transform={`translate(${offsets[0] + panelWidth(p) + gap / 2}, ${totalH / 2})`}>
              <text x={0} y={-6} textAnchor="middle" fill="#818cf8" fontSize="14" fontWeight="700">
                →
              </text>
              {operatorLabel && (
                <text x={0} y={10} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                  {operatorLabel}
                </text>
              )}
            </g>
          )}
          {idx === 1 && panels.length > 2 && (
            <g transform={`translate(${offsets[1] + panelWidth(p) + gap / 2}, ${totalH / 2})`}>
              <text x={0} y={0} textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="700">
                =
              </text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}

// ============================================================================
// 家族 4: InteractiveGraphCanvas — 有向拓扑 / 计算图 / 决策树 / 工作流
// ============================================================================

export interface GraphNode {
  id: string;
  x: number; // 0..400
  y: number; // 0..height
  label: string;
  sublabel?: string;
  tone?: VisualizerTone;
  active?: boolean;
  shape?: 'circle' | 'pill';
  radius?: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  label?: string;
  tone?: VisualizerTone;
  dashed?: boolean;
  animated?: boolean;
  curveOffset?: number;
}

export interface InteractiveGraphCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  height?: number;
  ariaLabel?: string;
}

export function InteractiveGraphCanvas({
  nodes,
  edges,
  height = 210,
  ariaLabel = '拓扑与计算图画布',
}: InteractiveGraphCanvasProps) {
  const uid = useId().replace(/:/g, '');
  const W = 400;
  const H = height;
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const tones: VisualizerTone[] = ['cyan', 'indigo', 'emerald', 'amber', 'rose', 'slate'];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" role="img" aria-label={ariaLabel}>
      <defs>
        {tones.map((tone) => (
          <marker
            key={tone}
            id={`graph-arrow-${uid}-${tone}`}
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <path d="M0,0.5 L6.5,3.5 L0,6.5 z" fill={TONE_COLORS[tone].stroke} />
          </marker>
        ))}
      </defs>

      {/* Edges */}
      {edges.map((e, idx) => {
        const a = nodeMap.get(e.from);
        const b = nodeMap.get(e.to);
        if (!a || !b) return null;
        const toneName = e.tone ?? 'slate';
        const color = TONE_COLORS[toneName].stroke;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 1;
        const rA = a.shape === 'pill' ? 32 : a.radius ?? 18;
        const rB = b.shape === 'pill' ? 34 : (b.radius ?? 18) + 4;
        const sx = a.x + (dx / dist) * Math.min(rA, dist * 0.4);
        const sy = a.y + (dy / dist) * Math.min(a.shape === 'pill' ? 14 : rA, dist * 0.4);
        const ex = b.x - (dx / dist) * Math.min(rB, dist * 0.4);
        const ey = b.y - (dy / dist) * Math.min(b.shape === 'pill' ? 16 : rB, dist * 0.4);

        const cOff = e.curveOffset ?? 0;
        const mx = (sx + ex) / 2 - (dy / dist) * cOff;
        const my = (sy + ey) / 2 + (dx / dist) * cOff;
        const pathD = `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;

        return (
          <g key={`edge-${idx}`}>
            <path
              d={pathD}
              fill="none"
              stroke={color}
              strokeWidth={e.animated ? 2.1 : 1.5}
              strokeDasharray={e.dashed || e.animated ? '5 4' : undefined}
              markerEnd={`url(#graph-arrow-${uid}-${toneName})`}
              opacity={e.tone === 'slate' ? 0.55 : 0.92}
            >
              {e.animated && (
                <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.1s" repeatCount="indefinite" />
              )}
            </path>
            {e.label && (
              <g transform={`translate(${mx}, ${my - 6})`}>
                <rect x={-22} y={-8} width={44} height={14} rx={4} fill="#040712" opacity={0.88} />
                <text x={0} y={2} textAnchor="middle" fill={color} fontSize="8.5" fontFamily="monospace">
                  {e.label}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((n) => {
        const tone = TONE_COLORS[n.tone ?? 'cyan'];
        const isPill = n.shape === 'pill';
        const r = n.radius ?? 18;
        const w = Math.max(62, n.label.length * 8 + 18);
        return (
          <g key={n.id}>
            {n.active &&
              (isPill ? (
                <rect
                  x={n.x - w / 2 - 4}
                  y={n.y - 18}
                  width={w + 8}
                  height={36}
                  rx={12}
                  fill="none"
                  stroke={tone.stroke}
                  strokeWidth={1.2}
                  strokeDasharray="3 2"
                  opacity={0.7}
                />
              ) : (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={r + 5}
                  fill="none"
                  stroke={tone.stroke}
                  strokeWidth={1.3}
                  strokeDasharray="3 2"
                  opacity={0.75}
                />
              ))}

            {isPill ? (
              <rect
                x={n.x - w / 2}
                y={n.y - 14}
                width={w}
                height={28}
                rx={9}
                fill={n.active ? tone.fill : '#090f1f'}
                stroke={tone.stroke}
                strokeWidth={n.active ? 2 : 1.4}
              />
            ) : (
              <circle
                cx={n.x}
                cy={n.y}
                r={r}
                fill={n.active ? tone.fill : '#090f1f'}
                stroke={tone.stroke}
                strokeWidth={n.active ? 2.2 : 1.5}
              />
            )}
            <text
              x={n.x}
              y={n.sublabel ? n.y - 3 : n.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#f1f5f9"
              fontSize="10"
              fontWeight="600"
              fontFamily="monospace"
            >
              {n.label}
            </text>
            {n.sublabel && (
              <text
                x={n.x}
                y={n.y + (isPill ? 23 : r + 11)}
                textAnchor="middle"
                fill={tone.stroke}
                fontSize="8.5"
                fontFamily="monospace"
              >
                {n.sublabel}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================================
// 家族 5: InteractiveMemoryCanvas — 内存槽位、位域编码、指针与区间标尺
// ============================================================================

export interface MemorySlot {
  label: string;
  sublabel?: string;
  tone?: VisualizerTone;
  pointer?: string;
}

export interface MemoryTrack {
  name: string;
  slots: MemorySlot[];
}

export interface InteractiveMemoryCanvasProps {
  tracks: MemoryTrack[];
  ariaLabel?: string;
}

export function InteractiveMemoryCanvas({
  tracks,
  ariaLabel = '内存槽位与位域状态画布',
}: InteractiveMemoryCanvasProps) {
  const W = 400;
  const rowH = 52;
  const H = Math.max(92, tracks.length * rowH + 20);
  const labelW = 74;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" role="img" aria-label={ariaLabel}>
      {tracks.map((track, tIdx) => {
        const y = 18 + tIdx * rowH;
        const count = Math.max(1, track.slots.length);
        const availW = W - labelW - 14;
        const slotW = Math.min(72, Math.max(26, (availW - (count - 1) * 5) / count));
        const gap = 5;

        return (
          <g key={`${track.name}-${tIdx}`}>
            <text
              x={labelW - 8}
              y={y + 15}
              textAnchor="end"
              dominantBaseline="central"
              fill="#94a3b8"
              fontSize="10"
              fontWeight="600"
            >
              {track.name}
            </text>

            {track.slots.map((slot, sIdx) => {
              const x = labelW + sIdx * (slotW + gap);
              const tone = TONE_COLORS[slot.tone ?? 'cyan'];
              return (
                <g key={`sl-${sIdx}`}>
                  {slot.pointer && (
                    <g>
                      <text
                        x={x + slotW / 2}
                        y={y - 5}
                        textAnchor="middle"
                        fill={tone.stroke}
                        fontSize="8.5"
                        fontFamily="monospace"
                        fontWeight="700"
                      >
                        ↓ {slot.pointer}
                      </text>
                    </g>
                  )}
                  <motion.rect
                    x={x}
                    y={y}
                    width={slotW}
                    height={30}
                    rx={6}
                    animate={{ x, y, width: slotW }}
                    transition={{ duration: 0.2 }}
                    fill={tone.fill}
                    stroke={tone.stroke}
                    strokeWidth={1.4}
                  />
                  <text
                    x={x + slotW / 2}
                    y={slot.sublabel ? y + 11 : y + 15}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#f8fafc"
                    fontSize={slot.label.length > 7 ? '8.5' : '10'}
                    fontFamily="monospace"
                    fontWeight="600"
                  >
                    {slot.label}
                  </text>
                  {slot.sublabel && (
                    <text
                      x={x + slotW / 2}
                      y={y + 23}
                      textAnchor="middle"
                      fill={tone.stroke}
                      fontSize="7.5"
                      fontFamily="monospace"
                    >
                      {slot.sublabel}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================================
// 家族 6: InteractiveTimelineCanvas — 流水线、并发调度甘特图与配额阈值
// ============================================================================

export interface TimelineBlock {
  start: number;
  end: number;
  label: string;
  tone?: VisualizerTone;
}

export interface TimelineLane {
  name: string;
  blocks: TimelineBlock[];
}

export interface InteractiveTimelineCanvasProps {
  lanes: TimelineLane[];
  maxTime: number;
  unit?: string;
  thresholds?: Array<{ value: number; label: string; tone?: VisualizerTone }>;
  ariaLabel?: string;
}

export function InteractiveTimelineCanvas({
  lanes,
  maxTime,
  unit = '',
  thresholds = [],
  ariaLabel = '系统时序与甘特图画布',
}: InteractiveTimelineCanvasProps) {
  const W = 400;
  const laneH = 38;
  const padT = 20;
  const padB = 26;
  const H = padT + lanes.length * laneH + padB;
  const labelW = 84;
  const chartW = W - labelW - 18;
  const mapX = (v: number) => labelW + (Math.max(0, Math.min(maxTime, v)) / Math.max(1e-6, maxTime)) * chartW;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" role="img" aria-label={ariaLabel}>
      {/* Grid ticks */}
      {[0, 0.25, 0.5, 0.75, 1].map((f) => {
        const val = Math.round(maxTime * f * 10) / 10;
        const x = mapX(val);
        return (
          <g key={f}>
            <line x1={x} y1={padT} x2={x} y2={H - padB} stroke="rgba(148,163,184,0.1)" />
            <text x={x} y={H - 9} textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
              {val}
              {unit}
            </text>
          </g>
        );
      })}

      {/* Lanes */}
      {lanes.map((lane, lIdx) => {
        const y = padT + lIdx * laneH;
        return (
          <g key={`${lane.name}-${lIdx}`}>
            <text
              x={labelW - 8}
              y={y + 15}
              textAnchor="end"
              dominantBaseline="central"
              fill="#cbd5e1"
              fontSize="10"
            >
              {lane.name}
            </text>
            <rect
              x={labelW}
              y={y + 3}
              width={chartW}
              height={24}
              rx={5}
              fill="rgba(15, 23, 42, 0.8)"
              stroke="rgba(51, 65, 85, 0.5)"
            />
            {lane.blocks.map((blk, bIdx) => {
              const x1 = mapX(blk.start);
              const x2 = mapX(blk.end);
              const bw = Math.max(6, x2 - x1);
              const tone = TONE_COLORS[blk.tone ?? 'cyan'];
              return (
                <g key={`blk-${bIdx}`}>
                  <motion.rect
                    x={x1}
                    y={y + 5}
                    width={bw}
                    height={20}
                    rx={4}
                    animate={{ x: x1, width: bw }}
                    transition={{ duration: 0.25 }}
                    fill={tone.fill}
                    stroke={tone.stroke}
                    strokeWidth={1.4}
                  />
                  {bw >= 24 && (
                    <text
                      x={x1 + bw / 2}
                      y={y + 15}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#f8fafc"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {blk.label}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Threshold Lines */}
      {thresholds.map((th, idx) => {
        const tx = mapX(th.value);
        const color = TONE_COLORS[th.tone ?? 'amber'].stroke;
        return (
          <g key={`th-${idx}`}>
            <line x1={tx} y1={padT - 3} x2={tx} y2={H - padB + 3} stroke={color} strokeDasharray="4 3" strokeWidth={1.6} />
            <text x={tx} y={padT - 7} textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace">
              {th.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
