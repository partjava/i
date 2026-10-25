'use client';

import type { AgentStepItem } from './types';

/**
 * Agent 执行轨迹面板：plan（💭）→ act（⚡）→ observe（✓）时间线
 */
export default function TracePanel({ steps, offline }: { steps: AgentStepItem[]; offline?: boolean }) {
  if (!steps || steps.length === 0) return null;
  return (
    <div className="rounded-xl bg-black/30 border border-[#d4a36a]/25 overflow-hidden">
      <div className="px-2.5 py-1.5 text-[10px] font-semibold text-[#d4a36a] flex items-center gap-1.5 bg-[#d4a36a]/10">
        <span>🧠 执行轨迹</span>
        <span className="opacity-60 font-normal">
          自主决策 · {steps.length} 步
        </span>
        {offline && (
          <span className="ml-auto px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40">
            离线降级模式
          </span>
        )}
      </div>
      <div className="px-2.5 py-1.5 space-y-1 max-h-28 overflow-y-auto custom-scrollbar">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-1.5 text-[11px] leading-snug">
            <span
              className={
                step.phase === 'plan'
                  ? 'text-[#b8a4e8]'
                  : step.phase === 'act'
                  ? step.status === 'running'
                    ? 'text-[#f3c687] animate-pulse'
                    : 'text-[#f3c687]'
                  : 'text-emerald-400'
              }
            >
              {step.phase === 'plan' ? '💭' : step.phase === 'act' ? '⚡' : '✓'}
            </span>
            <span className="text-[#e8dcc8] font-medium flex-shrink-0">{step.label}</span>
            {step.detail && (
              <span className="text-gray-400/90 truncate">{step.detail}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
