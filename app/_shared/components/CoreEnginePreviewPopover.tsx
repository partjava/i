'use client';

import React from 'react';
import { CheckCircle2, Play, Sparkles, Network } from 'lucide-react';
import { UI_DICT, type Locale } from '../lib/i18n';

export type EnginePreviewKind = 'challenges' | 'visualizer' | 'galaxy';

interface CoreEnginePreviewPopoverProps {
  kind: EnginePreviewKind;
  locale: Locale;
  align?: 'left' | 'center' | 'right';
}

export default function CoreEnginePreviewPopover({
  kind,
  locale,
  align = 'center',
}: CoreEnginePreviewPopoverProps) {
  const t = UI_DICT[locale].engines;

  const alignClass =
    align === 'left'
      ? 'left-0 origin-bottom-left'
      : align === 'right'
      ? 'right-0 origin-bottom-right'
      : 'left-1/2 -translate-x-1/2 origin-bottom';

  const arrowClass =
    align === 'left'
      ? 'left-12'
      : align === 'right'
      ? 'right-12'
      : 'left-1/2 -translate-x-1/2';

  const meta =
    kind === 'challenges'
      ? { url: 'unolgy.com/challenges', title: t.previewChallengesTitle }
      : kind === 'visualizer'
      ? { url: 'unolgy.com/code/editor?tab=visualizer', title: t.previewVisualizerTitle }
      : { url: 'unolgy.com/knowledge-graph', title: t.previewGalaxyTitle };

  return (
    <div
      data-engine-preview={kind}
      className={`pointer-events-none hidden md:block absolute bottom-[calc(100%+14px)] ${alignClass} z-40 w-[348px] rounded-2xl bg-[#0F131B] border border-[#D4AD72]/50 shadow-[0_26px_64px_-12px_rgba(9,13,22,0.78),0_0_24px_rgba(212,173,114,0.18)] overflow-hidden text-[#F2EDE4] pv-pop`}
    >
      <style>{`
        @keyframes previewPopIn {
          from { opacity: 0; transform: translateY(6px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .pv-pop { animation: previewPopIn 0.18s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
        @keyframes previewScan {
          0%, 100% { transform: translateY(0px); opacity: 0.85; }
          50% { transform: translateY(34px); opacity: 1; }
        }
        @keyframes previewBarPulse1 { 0%, 100% { height: 22px; } 50% { height: 42px; } }
        @keyframes previewBarPulse2 { 0%, 100% { height: 46px; } 50% { height: 26px; } }
        @keyframes previewBarPulse3 { 0%, 100% { height: 34px; } 50% { height: 50px; } }
        @keyframes previewPageWave {
          0%, 100% { transform: perspective(400px) rotateY(0deg); }
          50% { transform: perspective(400px) rotateY(-24deg); }
        }
        @keyframes previewOrbitDash {
          to { stroke-dashoffset: -36; }
        }
        .pv-scan { animation: previewScan 2.2s ease-in-out infinite; }
        .pv-bar-1 { animation: previewBarPulse1 1.6s ease-in-out infinite; }
        .pv-bar-2 { animation: previewBarPulse2 1.6s ease-in-out infinite; }
        .pv-bar-3 { animation: previewBarPulse3 1.9s ease-in-out infinite; }
        .pv-page { transform-origin: left center; animation: previewPageWave 2.6s ease-in-out infinite; }
        .pv-orbit { stroke-dasharray: 4 4; animation: previewOrbitDash 2.6s linear infinite; }
      `}</style>

      {/* 微缩浏览器顶栏 */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 bg-[#161B26] border-b border-white/10">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-rose-400/80 shrink-0" />
          <span className="w-2 h-2 rounded-full bg-amber-400/80 shrink-0" />
          <span className="w-2 h-2 rounded-full bg-emerald-400/80 shrink-0" />
          <span className="ml-1 font-code text-[10px] text-[#C5CBD6]/85 truncate min-w-0">
            {meta.url}
          </span>
        </div>
        <span className="px-1.5 py-0.5 rounded bg-[#D4AD72]/15 text-[#D4AD72] border border-[#D4AD72]/35 text-[9px] font-code tracking-wider uppercase whitespace-nowrap shrink-0">
          {t.previewLabel}
        </span>
      </div>

      {/* 专属页面实时动画区 */}
      <div className="p-3 bg-gradient-to-b from-[#0E121A] to-[#121722]">
        <div className="text-[11px] font-semibold text-[#D4AD72] mb-2 flex items-center justify-between">
          <span>{meta.title}</span>
          <Sparkles className="w-3 h-3 text-[#D4AD72]" />
        </div>

        {kind === 'challenges' && (
          <div className="grid grid-cols-12 gap-2.5 h-[108px]">
            {/* 左侧微缩星图关卡节点 */}
            <div className="col-span-6 rounded-xl bg-[#0B0E14] border border-white/10 p-2 relative overflow-hidden">
              <svg viewBox="0 0 140 86" className="w-full h-full" fill="none">
                <path
                  d="M22 64 C46 50, 62 34, 84 42 C102 48, 114 24, 124 20"
                  stroke="#D4AD72"
                  strokeOpacity="0.65"
                  strokeWidth="1.4"
                  className="pv-orbit"
                />
                <circle cx="22" cy="64" r="5" fill="#1F7A5C" />
                <circle cx="58" cy="44" r="4.5" fill="#D4AD72" />
                <circle cx="84" cy="42" r="7" fill="#D4AD72" fillOpacity="0.22" stroke="#D4AD72" strokeWidth="1.2" />
                <circle cx="84" cy="42" r="3" fill="#F2EDE4" />
                <circle cx="122" cy="20" r="4" fill="#64748B" />
              </svg>
              <span className="absolute bottom-1.5 left-2 font-code text-[9px] text-[#C5CBD6]">
                11 STAGES
              </span>
            </div>

            {/* 右侧微缩编码字节探测器 + 评测通过标志 */}
            <div className="col-span-6 rounded-xl bg-[#151B26] border border-white/10 p-2 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-1">
                {['0xE4', '0xB8', '0xAD'].map((byte, i) => (
                  <span
                    key={byte}
                    className={`flex-1 py-1 rounded text-center font-code text-[9px] border ${
                      i === 1
                        ? 'bg-[#D4AD72]/20 border-[#D4AD72] text-[#D4AD72]'
                        : 'bg-white/[0.04] border-white/10 text-[#C5CBD6]'
                    }`}
                  >
                    {byte}
                  </span>
                ))}
              </div>
              <div className="rounded-md bg-[#0B0E14] px-2 py-1 font-code text-[9px] text-[#C5CBD6] border border-white/5">
                Decode: 中 (U+4E2D)
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="inline-flex items-center gap-1 text-emerald-400 font-code font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  PASS 4/4
                </span>
                <span className="text-[#D4AD72] font-code">10 XP</span>
              </div>
            </div>
          </div>
        )}

        {kind === 'visualizer' && (
          <div className="grid grid-cols-12 gap-2.5 h-[108px]">
            {/* 左侧代码流扫描线 */}
            <div className="col-span-6 rounded-xl bg-[#0B0E14] border border-white/10 p-2 font-code text-[9px] text-[#94A3B8] relative overflow-hidden space-y-1">
              <div className="pv-scan absolute inset-x-1.5 top-2 h-3.5 rounded bg-[#D4AD72]/18 border-l-2 border-[#D4AD72]" />
              <div className="text-[#D4AD72]">int mid = (l+r)&gt;&gt;1;</div>
              <div>if (a[mid] == t)</div>
              <div className="pl-2 text-emerald-400">return mid;</div>
              <div>else if (a[mid]&lt;t)</div>
              <div className="pl-2">l = mid + 1;</div>
            </div>

            {/* 右侧 3D 算法柱状动态交换推演 */}
            <div className="col-span-6 rounded-xl bg-[#151B26] border border-white/10 p-2 flex flex-col justify-between">
              <div className="flex items-end justify-between gap-1.5 h-[62px] px-1">
                <span className="w-4 rounded-t bg-[#3B5998] h-7" />
                <span className="pv-bar-1 w-4 rounded-t bg-[#D4AD72]" />
                <span className="pv-bar-2 w-4 rounded-t bg-[#34D399]" />
                <span className="pv-bar-3 w-4 rounded-t bg-[#D4AD72]" />
                <span className="w-4 rounded-t bg-[#475569] h-9" />
              </div>
              <div className="flex items-center justify-between text-[9px] font-code text-[#C5CBD6]">
                <span>37 · 3D Scene</span>
                <span className="inline-flex items-center gap-0.5 text-[#D4AD72]">
                  <Play className="w-2.5 h-2.5 fill-current" /> 60 FPS
                </span>
              </div>
            </div>
          </div>
        )}

        {kind === 'galaxy' && (
          <div className="grid grid-cols-12 gap-2.5 h-[108px]">
            {/* 左侧辐射知识图谱星系 */}
            <div className="col-span-5 rounded-xl bg-[#0B0E14] border border-white/10 p-2 relative flex flex-col justify-between">
              <svg viewBox="0 0 100 68" className="w-full h-16" fill="none">
                <line x1="50" y1="34" x2="20" y2="16" stroke="#D4AD72" strokeOpacity="0.45" className="pv-orbit" />
                <line x1="50" y1="34" x2="82" y2="18" stroke="#8AB4F8" strokeOpacity="0.45" className="pv-orbit" />
                <line x1="50" y1="34" x2="24" y2="54" stroke="#34D399" strokeOpacity="0.45" className="pv-orbit" />
                <line x1="50" y1="34" x2="80" y2="54" stroke="#D4AD72" strokeOpacity="0.45" className="pv-orbit" />
                <circle cx="50" cy="34" r="6" fill="#1B3B6F" stroke="#D4AD72" strokeWidth="1.4" />
                <circle cx="20" cy="16" r="3.5" fill="#D4AD72" />
                <circle cx="82" cy="18" r="3.5" fill="#8AB4F8" />
                <circle cx="24" cy="54" r="3.5" fill="#34D399" />
                <circle cx="80" cy="54" r="3.5" fill="#D4AD72" />
              </svg>
              <span className="inline-flex items-center gap-1 font-code text-[9px] text-[#C5CBD6]">
                <Network className="w-2.5 h-2.5 text-[#D4AD72]" /> 467 Nodes
              </span>
            </div>

            {/* 右侧厚精装双页翻书动态效果 */}
            <div className="col-span-7 rounded-xl bg-[#20293A] border border-[#D4AD72]/35 p-2 flex flex-col justify-center">
              <div className="relative h-[74px] rounded bg-[#18202E] p-1 border border-[#D4AD72]/30 flex shadow-inner">
                <div className="flex-1 rounded-l-sm bg-[#EDF0F5] p-1.5 border-r border-slate-300 space-y-1">
                  <div className="h-1.5 w-10 rounded bg-[#1B3B6F]/70" />
                  <div className="h-1 w-full rounded bg-slate-300" />
                  <div className="h-1 w-4/5 rounded bg-slate-300" />
                  <div className="h-5 w-full rounded bg-slate-200/80 mt-1" />
                </div>
                <div className="pv-page flex-1 rounded-r-sm bg-[#F4F6FA] p-1.5 space-y-1 shadow-sm">
                  <div className="h-1.5 w-8 rounded bg-[#B88A44]" />
                  <div className="h-1 w-full rounded bg-slate-300" />
                  <div className="h-1 w-3/4 rounded bg-slate-300" />
                  <div className="h-5 w-full rounded bg-[#1E2430] mt-1" />
                </div>
                <div className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-[#D4AD72] rounded-b-sm" />
              </div>
              <div className="h-1.5 mx-1 rounded-b bg-[#cfd6e3] border-t border-black/20" />
            </div>
          </div>
        )}
      </div>

      {/* 底部指向对应卡片的三角锚点 */}
      <span
        aria-hidden="true"
        className={`absolute -bottom-1.5 ${arrowClass} w-3 h-3 rotate-45 bg-[#121722] border-r border-b border-[#D4AD72]/45`}
      />
    </div>
  );
}
