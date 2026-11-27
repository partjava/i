'use client';

import styles from '../AI3DRobot.module.css';
import type { AgentStepItem } from './types';

/**
 * Agent 执行轨迹面板：plan（💭）→ act（⚡）→ observe（✓）时间线
 * 支持素笺浅色（.paperTheme）与墨砚深色双态高对比度显示
 */
export default function TracePanel({ steps, offline }: { steps: AgentStepItem[]; offline?: boolean }) {
  if (!steps || steps.length === 0) return null;
  return (
    <div className={`rounded-xl border shadow-sm overflow-hidden ${styles.tracePanel}`}>
      <div className={`px-2.5 py-1.5 text-[11px] font-semibold flex items-center gap-1.5 ${styles.traceHeader}`}>
        <span>🧠 执行轨迹</span>
        <span className={`font-normal ${styles.traceSub}`}>
          自主决策 · {steps.length} 步
        </span>
        {offline && (
          <span className={`ml-auto px-1.5 py-0.5 rounded text-[10px] border ${styles.traceOfflineBadge}`}>
            离线降级模式
          </span>
        )}
      </div>
      <div className="px-2.5 py-1.5 space-y-1.5 max-h-32 overflow-y-auto custom-scrollbar">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-1.5 text-[11px] leading-snug">
            <span
              className={
                step.phase === 'plan'
                  ? styles.traceIconPlan
                  : step.phase === 'act'
                  ? step.status === 'running'
                    ? `${styles.traceIconAct} animate-pulse`
                    : styles.traceIconAct
                  : styles.traceIconObserve
              }
            >
              {step.phase === 'plan' ? '💭' : step.phase === 'act' ? '⚡' : '✓'}
            </span>
            <span className={`font-semibold flex-shrink-0 ${styles.traceLabel}`}>{step.label}</span>
            {step.detail && (
              <span className={`truncate ${styles.traceDetail}`}>{step.detail}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
